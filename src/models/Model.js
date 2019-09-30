//import uuidv3 from "uuid/v3";

import {EventHarness} from "../framework/EventHarness";
import localforage from 'localforage';

export function uuid(a){return a?(a^Math.random()*16>>a/4).toString(16):([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g,uuid)}

/**
 * regex used to validate AppObject external ids
 * (UUID form is 8 digits followed by three groups of 4 digits followed by a group of 12)
 */
export const UUID_REGEX = /^[a-fA-F0-9]{8}-(?:[a-fA-F0-9]{4}-){3}[a-fA-F0-9]{12}$/;

export const SAVE_STATE_LOCAL = 'SAVED_LOCALLY';
export const SAVE_STATE_SERVER = 'SAVED_TO_SERVER';

export class Model extends EventHarness {
    /**
     * @type {string}
     */
    _id;

    /**
     * set if the object has been posted to the server
     *
     * @type {boolean}
     */
    _savedRemotely = false;

    /**
     * set if the object has been added to a temporary store (e.g. indexedDb)
     *
     * @type {boolean}
     */
    _savedLocally = false;

    /**
     *
     * @type {boolean}
     */
    deleted = false;

    /**
     * unix timestamp
     * Provided that the created stamp is < the modified stamp then the externally assigned creation stamp will be used
     *
     * @type {number}
     */
    createdStamp;

    /**
     * unix timestamp
     * modified stamp is generally server assigned - rather than using a potentially discrepant client clock
     * this may increase synchrony and trust between distributed clients
     *
     * @type {number}
     */
    modifiedStamp;

    /**
     * DDb AppProject id
     *
     * @type {number}
     */
    projectId;

    /**
     * paired with isNew this marks records that have never been edited
     *
     * @type {boolean}
     */
    isPristine = false;

    constructor() {
        super();

        this.createdStamp = Math.floor(Date.now() / 1000);
    }

    /**
     * returns true if either remote or local copy is missing
     *
     * @returns {boolean}
     */
    unsaved() {
        return !(this._savedLocally && this._savedRemotely);
    }

    /**
     * string
     */
    get id() {
        if (!this._id) {
            this._id = uuid();
        }

        return this._id;
    }

    /**
     *
     * @param {string} newId
     */
    set id(newId) {
        // only allow an id to be set if not present already

        if (this._id && newId !== this._id) {
            throw new Error(`Occurrence id has already been set, when trying to set new id '${newId}'.`);
        }
        this._id = newId;
    }

    /**
     *
     * @type {Array.<function>}
     * @private
     */
    static _tasks = [];

    /**
     * Add a post request to the queue
     * Requests run in sequence.
     * Returns a promise that resolves once the queued request completes
     *
     * The queue reduces the chance of requests being sent to the server out-of-order (which can lead to race conditions)
     *
     * @param formData
     * @returns {Promise}
     */
    queuePost(formData) {
        return new Promise((resolve, reject) => {
            /**
             * @returns {Promise}
             */
            const task = () => {
                console.log({'posting form data': formData});
                return this.post(formData).then(resolve, reject);
            };

            Model._tasks.push(task);

            if (Model._tasks.length > 1) {
                console.log(`Added post request to the queue.`);
            } else {
                console.log(`No pending tasks, starting post request immediately.`);
                task().finally(Model._next);
            }
        });
    }

    /**
     *
     * @returns {Promise}
     * @private
     */
    static _next() {
        Model._tasks.shift(); // save is done

        if (Model._tasks.length) {
            // run the next task
            console.log('Running the next task.');
            return Model._tasks[0]().finally(Model._next);
        }
    }

    /**
     * if not securely saved then makes a post to /save<object>
     *
     * this may be intercepted by a service worker, which could write the image to indexdb
     * a successful save will result in a json response containing the uri from which the image may be retrieved
     * and also the state of persistence (whether or not the image was intercepted by a service worker while offline)
     *
     * if saving fails then the expectation is that there is no service worker, in which case should attempt to write
     * the image directly to indexdb
     *
     * must test indexdb for this eventuality after the save has returned
     *
     * @param {FormData} formData
     * @returns {Promise}
     */
    post(formData) {
        return fetch(this.SAVE_ENDPOINT, {
            method: 'POST',
            body: formData
        }).then(response => {
            if (response.ok) {
                // need to find out whether this was a local store in indexedDb by the service worker
                // or a server-side save

                // to do that need to decode the json response
                // which can only be done once, so need to clone first
                const clonedResponse = response.clone();
                return clonedResponse.json().then((responseData) => {
                    /** @param {{saveState : string, created : number, modified : number}} responseData */

                    console.log({'returned to client after save' : responseData});

                    switch (responseData.saveState) {
                        case SAVE_STATE_SERVER:
                            this._savedLocally = true;
                            this._savedRemotely = true;
                            break;

                        case SAVE_STATE_LOCAL:
                            this._savedLocally = true;
                            this._savedRemotely = false;
                            break;

                        default:
                            console.log(`Unrecognised save state '${responseData.saveState}'`);
                    }

                    this.createdStamp = responseData.created;
                    this.modifiedStamp = responseData.modified;

                    // return the json version of the original response as a promise
                    return response.json(); // assign appropriate JSON type to the response
                });
            } else {
                // try instead to write the data to local storage

                console.log('Save failed, presumably service worker is missing and there is no network connection. Should write to IndexedDb here.');
                return Promise.reject('IndexedDb storage not yet implemented');
            }
        });
    }

    /**
     *
     * @param {string} id
     * @param {(Survey|Occurrence|OccurrenceImage)} modelObject
     * @returns {Promise}
     */
    static retrieveFromLocal(id, modelObject) {
        return localforage.getItem(`${modelObject.TYPE}.${id}`)
            .then((descriptor) => {
                if (descriptor) {
                    modelObject.id = id;
                    modelObject._parseDescriptor(descriptor);

                    return modelObject;
                } else {
                    return Promise.reject(`Failed to retrieve ${modelObject.TYPE}.${id} locally`);
                }
            });
    }

    /**
     *
     * @param {{id : string, saveState: string, attributes: Object.<string, *>, deleted: boolean, created: (number|string), modified: (number|string), projectId: (number|string)}} descriptor
     */
    _parseDescriptor(descriptor) {
        this._parseAttributes(descriptor.attributes);
        this._parseSavedState(descriptor.saveState);
        this.deleted = descriptor.deleted;
        this.createdStamp = 0 + descriptor.created;
        this.modifiedStamp = 0 + descriptor.modified;
        this.projectId = 0 + descriptor.projectId;
    }

    /**
     *
     * @param {Object.<string, {}>} attributes
     */
    _parseAttributes(attributes) {
        if (Array.isArray(attributes)) {
            // problematic bug, where empty attributes come back as an array rather than as an object

            console.log('Attributes were spuriously represented as an array rather than as an empty object');
            this.attributes = {};
        } else {
            this.attributes = attributes;
        }
    }

    /**
     *
     * @param {string} saveState
     */
    _parseSavedState(saveState) {
        switch (saveState) {
            case SAVE_STATE_LOCAL:
                this._savedRemotely = false;
                this._savedLocally = true;
                break;

            case SAVE_STATE_SERVER:
                this._savedRemotely = true;
                this._savedLocally = true;
                break;

            default:
                throw new Error(`Unrecognised saved state '${saveState}`);
        }
    }

    /**
     * update modified stamp to current time
     */
    touch() {
        this.modifiedStamp = Math.floor(Date.now() / 1000);

        if (this.isPristine) {
            this.isPristine = false;
            this.createdStamp = this.modifiedStamp;
        }

        this._savedLocally = false;
        this._savedRemotely = false;
    }

    /**
     *
     * @param {{}} formSectionProperties
     * @return {{requiredFieldsPresent: boolean, validity: Object.<string, boolean>}}
     */
    evaluateCompletionStatus(formSectionProperties) {
        const validity = {};
        let requiredFieldsPresent = true;

        for (let key in formSectionProperties) {
            if (formSectionProperties.hasOwnProperty(key)) {
                let property = formSectionProperties[key];

                validity[key] = property.validator ?
                    property.validator(key, property, this.attributes)
                    :
                    property.field.isValid(key, property, this.attributes);

                if (null !== validity[key]) {
                    // validity can be 'null' in which case field was optional and not assessed
                    requiredFieldsPresent = requiredFieldsPresent && validity[key];
                }
            }
        }

        return {
            requiredFieldsPresent,
            validity
        };
    }
}
