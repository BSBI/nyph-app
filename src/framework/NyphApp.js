import {App} from "bsbi-app-framework";
//import {NotFoundView} from "bsbi-app-framework-view";

export const PROJECT_ID_NYPH = 2;

export const FORAGE_NAME = 'Nyph App2024';

/**
 * @typedef {import("bsbi-app-framework-view").NotFoundView} NotFoundView
 */

export class NyphApp extends App {
    /**
     * @type {number}
     */
    projectId = PROJECT_ID_NYPH;

    static forageName = FORAGE_NAME;

    //static LOAD_SURVEYS_ENDPOINT = '/loadsurveys.php';

    //static EVENT_OCCURRENCE_ADDED = 'occurrenceadded';
    //static EVENT_SURVEYS_CHANGED = 'surveyschanged';

    /**
     *
     * @type {boolean}
     */
    static devMode = false;

    /**
     * @type {ServiceWorkerRegistration}
     */
    static serviceWorkerRegistration;

    constructor() {
        super();

        this.initialiseSurveyFieldsMirror();
    }

    _coreSurveyFields = [
        'recorder',
        'email'
    ];

    _coreSurveyFieldCache = [

    ];

    /**
     * Sets handlers to allow certain survey fields to be duplicated from last current survey to new survey
     * used for email address and primary recorder name
     */
    initialiseSurveyFieldsMirror() {
        this.addListener(App.EVENT_NEW_SURVEY, () => {
            console.log('Try to initialise core fields of new survey.');
            if (this._coreSurveyFieldCache) {
                console.log({'Using cached survey values' : this._coreSurveyFieldCache});
                for (let key of this._coreSurveyFields) {
                    this.currentSurvey.attributes[key] = this._coreSurveyFieldCache[key];
                }
            }
        });

        this.addListener(App.EVENT_SURVEYS_CHANGED, () => {
            if (this.currentSurvey && !this.currentSurvey.isNew) {
                for (let key of this._coreSurveyFields) {
                    this._coreSurveyFieldCache[key] = this.currentSurvey.attributes[key];
                }

                console.log({'Saved core survey fields' : this._coreSurveyFieldCache});
            }
        });

        this.addListener(App.EVENT_RESET_SURVEYS, () => {
            this._coreSurveyFieldCache = [];
            console.log('Have reset core survey field cache.');
        });
    }

    /**
     * A convoluted approach is used to avoid requirement to import NotFoundView
     * (as that bloats the service worker, by pulling in the full view library and bootstrap)
     *
     * @type {NotFoundView}
     */
    notFoundViewObject;

    notFoundView() {
        this.notFoundViewObject.display();
    }

    // notFoundView() {
    //     const view = new NotFoundView();
    //     view.display();
    // }
}
