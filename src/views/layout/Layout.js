// Overall page layout

import newSurveyModal from "../../templates/newSurveyModal.html";
import resetModal from "../../templates/resetModal.html";
import saveAllSuccessModal from "../../templates/syncSuccessModal.html";
import saveAllFailureModal from "../../templates/syncFailureModal.html";
import {EventHarness} from "../../framework/EventHarness";
import {App} from "../../framework/App";

export class Layout extends EventHarness {

    /**
     * @type {App}
     */
    app;

    /**
     * @type {string}
     */
    surveysMenuId;

    static NEW_SURVEY_MODAL_ID = 'newsurveymodal';
    static RESET_MODAL_ID = 'resetmodal';
    static SAVE_ALL_SUCCESS_MODAL_ID = 'saveallsuccess';
    static SAVE_ALL_FAILURE_MODAL_ID = 'saveallfailure';

    /**
     *
     * @param {App} app
     */
    setApp(app) {
        this.app = app;
        app.addListener(App.EVENT_SURVEYS_CHANGED, this, this.surveysChangedHandler);
    }

    initialise() {
        this.refreshSurveysMenu();

        let modalContent = document.createElement('div');
        modalContent.innerHTML = newSurveyModal;
        document.body.appendChild(modalContent.getElementsByTagName('div')[0]);

        modalContent = document.createElement('div');
        modalContent.innerHTML = resetModal;
        document.body.appendChild(modalContent.getElementsByTagName('div')[0]);

        modalContent = document.createElement('div');
        modalContent.innerHTML = saveAllSuccessModal;
        document.body.appendChild(modalContent.getElementsByTagName('div')[0]);

        modalContent = document.createElement('div');
        modalContent.innerHTML = saveAllFailureModal;
        document.body.appendChild(modalContent.getElementsByTagName('div')[0]);

        // register event handlers once the content is likely to be in the DOM
        setTimeout(() => {
            document.getElementById(`${Layout.NEW_SURVEY_MODAL_ID}confirmed`).addEventListener('click', (event) => {
                this.app.fireEvent(App.EVENT_ADD_SURVEY_USER_REQUEST);
            });
            document.getElementById(`${Layout.RESET_MODAL_ID}confirmed`).addEventListener('click', (event) => {
                this.app.fireEvent(App.EVENT_RESET_SURVEYS);
            });
        }, 100);
    }

    surveysChangedHandler() {
        this.refreshSurveysMenu();
    }

    refreshSurveysMenu() {
        const surveyMenuContainer = document.getElementById(this.surveysMenuId);

        /**
         *
         * @type {Array.<string>}
         */
        const items = [];

        const currentSurveyId = this.app.currentSurvey ? this.app.currentSurvey.id : null;

        for (const surveyTuple of this.app.surveys) {
            const survey = surveyTuple[1];

            const label = survey.generateSurveyName() + (surveyTuple[0] === currentSurveyId ? ' <span style="color: green">●</span>' : '');
            items[items.length] = `<a class="dropdown-item" href="/app/survey/add/${surveyTuple[0]}" data-navigo="survey/add/${surveyTuple[0]}">${label}</a>`;
        }

        surveyMenuContainer.innerHTML = `<a class="dropdown-item" href="/app/survey/save" data-navigo="survey/save">save all</a>
    <div class="dropdown-divider"></div>
    ${items.join('')}
    <div class="dropdown-divider"></div>
    <a class="dropdown-item" href="/app/survey/new" data-navigo="survey/new">new survey</a>
    <a class="dropdown-item" href="/app/survey/reset" data-navigo="survey/reset">reset</a>`;

        this.app.router.updatePageLinks()
    }
}
