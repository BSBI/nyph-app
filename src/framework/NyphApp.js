import {App} from "bsbi-app-framework";

export const PROJECT_ID_NYPH = 2;

export class NyphApp extends App {
    /**
     * @type {number}
     */
    projectId = PROJECT_ID_NYPH;

    static forageName = 'Nyph App';

    //static LOAD_SURVEYS_ENDPOINT = '/loadsurveys.php';

    //static EVENT_OCCURRENCE_ADDED = 'occurrenceadded';
    //static EVENT_SURVEYS_CHANGED = 'surveyschanged';

    /**
     *
     * @type {boolean}
     */
    static devMode = false;

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
}
