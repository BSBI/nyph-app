import {App} from './App';
import {Survey} from "../models/Survey";
import {Occurrence} from "../models/Occurrence";
import {InternalAppError} from "../utils/exceptions/InternalAppError";
import localforage from 'localforage';
import {OccurrenceImage} from "../models/OccurrenceImage";

export const PROJECT_ID_NYPH = 2;

export class NyphApp extends App {
    /**
     * @type {number}
     */
    projectId = PROJECT_ID_NYPH;

    static LOAD_SURVEYS_ENDPOINT = '/loadsurveys.php';

    static EVENT_OCCURRENCE_ADDED = 'occurrenceadded';
    static EVENT_SURVEYS_CHANGED = 'surveyschanged';

    /**
     *
     * @type {boolean}
     */
    static devMode = false;

    /**
     *
     * @param {Survey} survey
     */
    addSurvey(survey) {
        if (survey.projectId !== this.projectId) {
            throw new Error(`Survey project id '${survey.projectId} does not match with current project ('${this.projectId}')`);
        }

        if (!this.surveys.has(survey.id)) {
            console.log("setting survey's modified/save handler");
            survey.addListener(
                Survey.EVENT_MODIFIED,
                this,
                (survey) => {
                    this.fireEvent(App.EVENT_SURVEYS_CHANGED);
                    return survey.save();
                }
                );
        }

        this.surveys.set(survey.id, survey);
        this.fireEvent(App.EVENT_SURVEYS_CHANGED);
    }

    /**
     * tests whether occurrences have been defined, excluding any that have been deleted
     *
     * @returns {boolean}
     */
    haveExtantOccurrences() {
        for (let occurrence of this.occurrences) {
            if (!occurrence.deleted) {
                return true;
            }
        }
        return false;
    }

    /**
     *
     * @param {Occurrence} occurrence
     */
    addOccurrence(occurrence) {
        if (!occurrence.surveyId) {
            throw new InternalAppError('Survey id must set prior to registering occurrence.');
        }

        if (this.occurrences.size === 0) {
            // this is the first occurrence added, set the survey creation stamp to match
            // this avoids anomalies where a 'stale' survey created when the form was first opened but not used sits around
            // for a protracted period

            const survey = this.surveys.get(occurrence.surveyId);
            survey.createdStamp = occurrence.createdStamp;
        }

        this.occurrences.set(occurrence.id, occurrence);

        occurrence.addListener(Occurrence.EVENT_MODIFIED, this,
            (occurrence) => {

            const survey = this.surveys.get(occurrence.surveyId);
            if (!survey) {
                throw new Error(`Failed to look up survey id ${occurrence.surveyId}`);
            } else {

                // need to ensure that currentSurvey is saved before occurrence
                // rather than using a promise chain here, instead rely on enforced queuing of post requests in Model
                // otherwise there are problems with queue-jumping (e.g. when an image needs to be saved after both previous requests)
                if (survey.unsaved()) {
                    survey.save();
                }
                occurrence.save(survey.id);
            }
        });
    }

    /**
     * attempts to refresh the state of local storage for the specified survey ids
     * if fetch fails then return a failed promise
     *
     * updates local copy of surveys and occurrences
     *
     * no service worker interception of this call - passed through and not cached
     *
     * @param {Array.<string>} surveyIds
     * @return {Promise}
     */
    refreshFromServer(surveyIds) {
        const formData = new FormData;

        let n = 0;
        for (let key of surveyIds) {
            formData.append(`surveyId[${n++}]`, key);
        }

        return fetch(NyphApp.LOAD_SURVEYS_ENDPOINT, {
            method: 'POST',
            body: formData
        }).then(response => {
            if (response.ok) {
                return response.json();
            } else {
                return Promise.reject(`Invalid response from server when refreshing survey ids`);
            }
        }).then((jsonResponse) => {
            /** @param {{survey : Array.<object>, occurrence: Array.<object>, image: Array.<object>}} jsonResponse */

            console.log({'refresh from server json response' : jsonResponse});

            // if external objects newer than local version then place in local storage
            const promises = [];

            for (let type in jsonResponse) {
                if (jsonResponse.hasOwnProperty(type)) {
                    for (let object of jsonResponse[type]) {
                        promises.push(this._conditionallyReplaceObject(object));
                    }
                }
            }


            return Promise.all(promises);
        });
    }

    /**
     * compare modified stamp of indexeddb and external objects and write external version locally if more recent
     *
     * @param {{id : string, type : string, modified : number, created : number, saveState : string, deleted : boolean}} externalVersion
     * @returns {Promise}
     * @private
     */
    _conditionallyReplaceObject(externalVersion) {
        const objectType = externalVersion.type;
        const id = externalVersion.id;
        const key = `${objectType}.${id}`;

        return localforage.getItem(key)
            .then((localVersion) => {
                if (localVersion) {
                    // compare stamps

                    // if (externalVersion.deleted) {
                    //     // if the external copy is deleted then remove the local copy
                    //     return localforage.removeItem(key);
                    // }

                    if (!externalVersion.deleted && localVersion.modified >= externalVersion.modified) {
                        console.log(`Local copy of ${key} is the same or newer than the server copy. (${localVersion.modified} >= ${externalVersion.modified}) `);
                        return Promise.resolve();
                    }
                }

                // no local copy or stale copy
                // so store response locally
                console.log(`Adding or replacing local copy of ${key}`);
                return localforage.setItem(key, externalVersion);
            });
    }

    /**
     * retrieve the full set of keys from local storage (IndexedDb)
     *
     * @param {{survey: Array.<string>, occurrence : Array.<string>, image: Array.<string>}} storedObjectKeys
     * @returns {Promise}
     */
    seekKeys(storedObjectKeys) {
        return localforage.keys().then((keys) => {
            for (let key of keys) {
                let type,id;

                [type, id] = key.split('.', 2);

                if (storedObjectKeys.hasOwnProperty(type)) {
                    if (!storedObjectKeys[type].includes(id)) {
                        storedObjectKeys[type].push(id);
                    }
                } else {
                    console.log(`Unrecognised stored key type '${type}.`);
                }
            }

            return storedObjectKeys;
        });
    }

    /**
     * @returns {Promise}
     */
    syncAll() {
        const storedObjectKeys = {
            survey : [],
            occurrence : [],
            image : []
        };

        return this.seekKeys(storedObjectKeys)
            .then((storedObjectKeys) => {
                return this._syncLocalUnsaved(storedObjectKeys);
            }, (failedResult) => {
                console.log(`Failed to sync all: ${failedResult}`);
            });
    }

    /**
     *
     * @param storedObjectKeys
     * @returns {Promise}
     * @private
     */
    _syncLocalUnsaved(storedObjectKeys) {
        // syncs surveys first, then occurrences, then images from indexedDb

        const promises = [];
        for(let surveyKey of storedObjectKeys.survey) {
            promises.push(Survey.retrieveFromLocal(surveyKey, new Survey)
                .then((survey) => {
                    if (survey.unsaved()) {
                        return survey.save();
                    }
                })
            );
        }

        for(let occurrenceKey of storedObjectKeys.occurrence) {
            promises.push(Occurrence.retrieveFromLocal(occurrenceKey, new Occurrence)
                .then((occurrence) => {
                    if (occurrence.unsaved()) {
                        return occurrence.save();
                    }
                })
            );
        }

        for(let imageKey of storedObjectKeys.image) {
            promises.push(OccurrenceImage.retrieveFromLocal(imageKey, new OccurrenceImage)
                .then((image) => {
                    if (image.unsaved()) {
                        return image.save();
                    }
                })
            );
        }

        return Promise.all(promises).catch((result) => {
            console.log(`Save failure: ${result}`);
        });
    }

    /**
     * restore previous state, pulling back from local and external store
     * @todo this needs a save phase, so that local changes are saved back to the server
     *
     * @param {string} [targetSurveyId] if specified then select this id as the current survey
     * @return {Promise}
     */
    restoreOccurrences(targetSurveyId) {

        // need to check for a special case where restoring a survey that has never been saved even locally
        // i.e. new and unmodified
        // only present in current App.surveys
        // this occurs if user creates a new survey, makes no changes, switches away from it then switches back
        if (this.surveys.has(targetSurveyId)) {
            const localSurvey = this.surveys.get(targetSurveyId);

            if (localSurvey.isPristine) {
                this.currentSurvey = localSurvey;
                this.fireEvent(App.EVENT_SURVEYS_CHANGED); // current survey should be set now, so menu needs refresh
                return Promise.resolve();
            }
        }

        const storedObjectKeys = {
            survey: [],
            occurrence: [],
            image: []
        };

        if (targetSurveyId) {
            storedObjectKeys.survey[0] = targetSurveyId;
        }

        return this.seekKeys(storedObjectKeys).then((storedObjectKeys) => {
            if (storedObjectKeys.survey.length) {
                return this.refreshFromServer(storedObjectKeys.survey).finally(() => {
                    // re-seek keys from indexed db, to take account of any new occurrences received from the server
                    return this.seekKeys(storedObjectKeys);
                });
            } else {
                return null;
            }
        }).finally(() => {
            // called regardless of whether a server refresh was successful
            // storedObjectKeys and indexed db should be as up-to-date as possible

            if (storedObjectKeys.survey.length) {

                // arbitrarily set first survey key as current
                // this will be the specified targetSurveyId if that was set
                return this._restoreSurveyFromLocal(storedObjectKeys.survey[0], storedObjectKeys)
                    .finally(() => {
                        this.currentSurvey = this.surveys.get(storedObjectKeys.survey[0]);

                        if (!this.currentSurvey) {
                            // survey doesn't actually exist
                            // this could have happened in an invalid survey id was provided as a targetSurveyId
                            console.log(`Failed to retrieve survey id '${targetSurveyId}'`);
                            return Promise.reject(new Error(`Failed to retrieve survey id '${targetSurveyId}'`));
                        }

                        if (this.currentSurvey.deleted) {
                            // unusual case where survey is deleted
                            // substitute a new one

                            // this should probably never happen, as items deleted on the server ought to have been
                            // removed locally
                            this.setNewSurvey();
                        } else {
                            this.fireEvent(App.EVENT_SURVEYS_CHANGED); // current survey should be set now, so menu needs refresh
                        }
                        return Promise.resolve();
                    });
            } else {
                // no pre-existing surveys, so create a new one
                this.setNewSurvey();

                return Promise.resolve();
            }
        });
    }

    setNewSurvey() {
        this.currentSurvey = new Survey();
        this.currentSurvey.projectId = this.projectId;
        this.currentSurvey.isPristine = true;
        this.addSurvey(this.currentSurvey);
    }

    /**
     * @return {Occurrence}
     */
    addNewOccurrence() {
        const occurrence = new Occurrence();
        occurrence.surveyId = this.currentSurvey.id;
        occurrence.projectId = this.projectId;

        occurrence.isNew = true;
        occurrence.isPristine = true;

        this.addOccurrence(occurrence);

        this.fireEvent(NyphApp.EVENT_OCCURRENCE_ADDED, {occurrenceId: occurrence.id, surveyId: occurrence.surveyId});

        return occurrence;
    }

    /**
     *
     * @param surveyId
     * @param storedObjectKeys
     * @returns {Promise}
     * @private
     */
    _restoreSurveyFromLocal(surveyId, storedObjectKeys) {
        // retrieve surveys first, then occurrences, then images from indexedDb

        return Survey.retrieveFromLocal(surveyId, new Survey).then((survey) => {
            // the apps occurrences should only relate to the current survey
            // (the reset are remote or in IndexedDb)
            this.clearCurrentSurvey();

            this.addSurvey(survey);
            const occurrenceFetchingPromises = [];

            for(let occurrenceKey of storedObjectKeys.occurrence) {
                occurrenceFetchingPromises.push(Occurrence.retrieveFromLocal(occurrenceKey, new Occurrence)
                    .then((occurrence) => {
                        if (occurrence.surveyId === surveyId) {
                            this.addOccurrence(occurrence);
                        }
                    }));
            }

            return Promise.all(occurrenceFetchingPromises);
        }).finally(() => {
            //console.log('Reached image fetching part');
            const imageFetchingPromises = [];

            for(let occurrenceImageKey of storedObjectKeys.image) {
                imageFetchingPromises.push(OccurrenceImage.retrieveFromLocal(occurrenceImageKey, new OccurrenceImage)
                    .then((occurrenceImage) => {
                        if (occurrenceImage.surveyId === surveyId) {
                            OccurrenceImage.imageCache.set(occurrenceImageKey, occurrenceImage);
                        }
                    }, (reason) => {
                        console.log(`Failed to retrieve an image: ${reason}`);
                    }));
            }

            return Promise.all(imageFetchingPromises);
        });
    }

    /**
     *
     * @returns {Promise<void>}
     */
    clearLocalForage() {
        return localforage.clear();
    }
}
