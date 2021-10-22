// SurveyPickerController
//

import {App, AppController, Layout, NotFoundError, UUID_REGEX} from "bsbi-app-framework";

export class SurveyPickerController extends AppController {
    route = '/survey/:action/:id';

    static EVENT_BACK = 'back';

    title = 'NYPH survey picker';

    /**
     * @type {NyphApp}
     */
    app;

    /**
     *
     * @type {SurveyPickerView}
     */
    view;

    /**
     *
     * @returns {Survey}
     */
    get survey() {
        return this.app.currentSurvey;
    }

    /**
     *
     * @param {SurveyPickerView} view
     */
    constructor (view) {
        super();

        this.view = view;
        view.controller = this;

        this.handle = AppController.nextHandle;
    }

    /**
     * registers the default route from this.route
     * or alternatively is overridden in a child class
     *
     * @param {PatchedNavigo} router
     */
    registerRoute(router) {
        router.on(
            '/survey',
            this.mainRouteHandler.bind(this, 'survey', '', ''),
            {
                // before : this.beforeRouteHandler ? this.beforeRouteHandler.bind(this) : null,
                // after : this.afterRouteHandler ? this.afterRouteHandler.bind(this) : null,
                // leave : this.leaveRouteHandler ? this.leaveRouteHandler.bind(this) : null,
                // already : this.alreadyRouteHandler ? this.alreadyRouteHandler.bind(this) : null
            }
        );

        router.on(
            '/survey/new',
            this.newSurveyHandler.bind(this, 'survey', 'new', ''),
            {
                before : this.beforeNewHandler.bind(this)
            }
        );

        router.on(
            '/survey/reset',
            this.mainRouteHandler.bind(this, 'survey', 'reset', ''),
            {
                before : this.beforeResetHandler.bind(this)
            }
        );

        router.on(
            '/survey/save',
            this.mainRouteHandler.bind(this, 'survey', 'save', ''),
            {
                before : this.beforeSaveAllHandler.bind(this)
            }
        );

        router.on(
            '/survey/add/:surveyId',
            this.addSurveyHandler.bind(this, 'survey', 'add', '')
        );

        this.app.addListener(App.EVENT_ADD_SURVEY_USER_REQUEST, this.addNewSurveyHandler.bind(this));
        this.app.addListener(App.EVENT_RESET_SURVEYS, this.resetSurveysHandler.bind(this));
    }

    beforeNewHandler(done) {
        $(`#${Layout.NEW_SURVEY_MODAL_ID}`).modal();

        this.app.router.pause();
        window.history.back(); // this could fail if previous url was not under the single-page-app umbrella (should test)
        this.app.router.resume();

        done(false); // block navigation
    }

    beforeResetHandler(done) {
        $(`#${Layout.RESET_MODAL_ID}`).modal();

        this.app.router.pause();
        window.history.back(); // this could fail if previous url was not under the single-page-app umbrella (should test)
        this.app.router.resume();

        done(false); // block navigation
    }

    beforeSaveAllHandler(done) {
        // invoke sync of any/all unsaved data
        // show pop-ups on success and failure
        this.app.syncAll().then((result) => {
            console.log(`In save all handler, success result: ${result}`);
            $(`#${Layout.SAVE_ALL_SUCCESS_MODAL_ID}`).modal();
        }, (result) => {
            console.log(`In save all handler, failure result: ${result}`);
            $(`#${Layout.SAVE_ALL_FAILURE_MODAL_ID}`).modal();
        }).finally(() => {
            // stop the spinner

        });

        this.app.router.pause();
        window.history.back(); // this could fail if previous url was not under the single-page-app umbrella (should test)
        this.app.router.resume();

        done(false); // block navigation
    }

    /**
     *
     * @param {string} context typically 'survey'
     * @param {('new'|'')} subcontext
     * @param {(''|'help')} rhs currently not used
     * @param {Object.<string, string>} queryParameters surveyId
     */
    newSurveyHandler(context, subcontext, rhs, queryParameters) {
        // should not get here, as beforeNewHandler ought to have been invoked first
    }

    /**
     * called after user has confirmed add new survey dialog box
     */
    addNewSurveyHandler() {
        console.log("reached addNewSurveyHandler");
        this.app.currentControllerHandle = this.handle; // when navigate back need to list need to ensure full view refresh

        // the apps occurrences should only relate to the current survey
        // (the reset are remote or in IndexedDb)
        this.app.clearCurrentSurvey();

        this.app.setNewSurvey();
        this.app.router.pause();
        this.app.router.navigate('/list/survey/welcome').resume();
        this.app.router.resolve();
    }

    /**
     * called after user has confirmed reset surveys dialog box
     */
    resetSurveysHandler() {
        this.app.clearLocalForage().then(() => {
            this.app.reset();
            this.addNewSurveyHandler();
        });
    }

    /**
     *
     * @param {string} context typically 'survey'
     * @param {('add'|'')} subcontext
     * @param {(''|'help')} rhs currently not used
     * @param {Object.<string, string>} queryParameters surveyId
     */
    addSurveyHandler(context, subcontext, rhs, queryParameters) {
        console.log("reached addSurveyHandler");
        console.log({context: context, params: subcontext, query: queryParameters});

        this.app.currentControllerHandle = this.handle; // when navigate back need to list need to ensure full view refresh

        let surveyId = queryParameters.surveyId;

        if (!surveyId || !surveyId.match(UUID_REGEX)) {
            throw new NotFoundError(`Failed to match survey id '${surveyId}', the id format appears to be incorrect`);
        }

        surveyId = surveyId.toLowerCase();

        this.app.restoreOccurrences(surveyId)
            .then(() => {
                this.app.markAllNotPristine();

                this.app.router.pause();
                this.app.router.navigate('/list').resume();
                this.app.router.resolve();
            }, (error) => {
                console.log({'failed survey restoration' : error});

                // should display a modal error message
                // either the survey was not found or there was no network connection

                // should switch to displaying a list of available surveys and an option to start a new survey
            });
    }

    /**
     *
     * @param {string} context typically 'survey'
     * @param {('add'|'')} subcontext
     * @param {(''|'help')} rhs currently not used
     * @param {Object.<string, string>} queryParameters surveyId
     */
    mainRouteHandler(context, subcontext, rhs, queryParameters) {
        console.log("reached special route handler for SurveyPickerController.js");
        console.log({context: context, params: subcontext, query: queryParameters});
    }
}
