// SurveyPickerController
//

import {AppController} from './AppController';
import {NotFoundError} from "../utils/exceptions/NotFoundError";
//import {InternalAppError} from "../utils/exceptions/InternalAppError";
import {UUID_REGEX} from "../models/Model";
import {Layout} from "../views/layout/Layout";
import {App} from "../framework/App";

export class SurveyPickerController extends AppController {
    route = '/survey/:action/:id';

    static EVENT_BACK = 'back';

    title = 'Plant Alert survey picker';

    /**
     * @type {PlantAlertApp}
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

        // view.addListener(MainController.EVENT_SELECT_OCCURRENCE, this, this.occurrenceSelectionHandler);
        // view.addListener(MainController.EVENT_SELECT_SURVEY_SECTION, this, this.surveyPartSelectionHandler);
        // view.addListener(MainController.EVENT_NEW_RECORD, this, this.newRecordHandler);
        // view.addListener(MainController.EVENT_DELETE_OCCURRENCE, this, this.deleteOccurrenceHandler);
        //
        // view.addListener(MainController.EVENT_BACK, this, this.backHandler);
        // view.addListener(MainController.EVENT_NEXT_TO_RECORDS, this, this.nextTransitionToRecordsHandler);
    }

    // /**
    //  * handler for event fired on and by view when 'next section' button has been click, leading to the records section
    //  * this will expand the list of records, or if none exist, add a first one and open it
    //  */
    // nextTransitionToRecordsHandler() {
    //     console.log('in nextTransitionToRecordsHandler()');
    //
    //     if (this.app.haveExtantOccurrences()) {
    //         this.app.router.navigate('/list/record/');
    //     } else {
    //         this.newRecordHandler();
    //     }
    // }

    // /**
    //  *
    //  * @param {MainController} context
    //  * @param {string} eventName
    //  * @param {string} occurrenceId
    //  */
    // deleteOccurrenceHandler(context, eventName, occurrenceId) {
    //     console.log({deleting : occurrenceId});
    //
    //     const occurrence = this.app.occurrences.get(occurrenceId);
    //     if (!occurrence) {
    //         throw new InternalAppError(`Occurrence id '${occurrenceId}' not found when trying to delete.`);
    //     }
    //
    //     occurrence.delete();
    //     if (this.currentOccurrenceId === occurrenceId) {
    //         //this.currentOccurrenceId = '';
    //         this.app.router.navigate(`/list/record/`);
    //     }
    // }

    // /**
    //  *
    //  * @param {MainController} context
    //  * @param {string} eventName
    //  * @param {{sectionKey : string}} params
    //  */
    // surveyPartSelectionHandler (context, eventName, params) {
    //     console.log('In surveyPartSelectionHandler');
    //     console.log({context, eventName, params});
    //
    //     if (params.sectionKey === 'record') {
    //         this.app.router.navigate(`/list/record/`);
    //     } else if (params.sectionKey) {
    //         this.app.router.navigate(`/list/survey/${params.sectionKey}`);
    //     } else {
    //         this.app.router.navigate(`/list/`);
    //     }
    // }

    // /**
    //  * may be invoked directly or in response to the Add New Record event
    //  * therefore assume that the method receives no event parameters
    //  */
    // newRecordHandler() {
    //     const occurrence = this.app.addNewOccurrence();
    //
    //     this.app.router.navigate(`/list/record/${occurrence.id}`);
    // }

    /**
     * registers the default route from this.route
     * or alternatively is overridden in a child class
     *
     * @param {Navigo} router
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

        this.app.addListener(App.EVENT_ADD_SURVEY_USER_REQUEST, this, this.addNewSurveyHandler);
        this.app.addListener(App.EVENT_RESET_SURVEYS, this, this.resetSurveysHandler);
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

        // this.app.saveRoute();
        //
        // switch(subcontext) {
        //     case 'add':
        //
        //         break;
        //
        //     case '':
        //         break;
        //
        //     default:
        //         throw new NotFoundError(`Unrecognised context '${subcontext}'`);
        // }
        //
        // try {
        //     this.viewSubcontext = subcontext;
        //
        //
        //
        //     if (this.app.currentControllerHandle !== this.handle) {
        //         // need a complete refresh of the page
        //
        //         this.needsFullRefresh = true;
        //         this.app.currentControllerHandle = this.handle;
        //     }
        //
        //     this.view.display();
        //     this.needsFullRefresh = false;
        // } catch (error) {
        //     this.error = error;
        //     console.log({error});
        //
        //     // attempt to carry on regardless to some extent (error should be reported in the view)
        //     // but wrap in a further try just in case
        //
        //     try {
        //         this.needsFullRefresh = true;
        //         this.view.display();
        //     } catch (rethrownError) {
        //         console.log({rethrownError});
        //         document.body.innerHTML = `<h2>Internal error</h2><p>Please report this problem:</p><p>${rethrownError.message}</p>`;
        //     }
        // }
    }

    // backHandler() {
    //     console.log({'leftPanelBaseRoute' : this.leftPanelBaseRoute});
    //     console.log({'local navigation cache' : this.app.routeHistory});
    //
    //     if (this.app.routeHistory.length >= 2 && this.app.routeHistory[this.app.routeHistory.length - 2].url === this.leftPanelBaseRoute) {
    //         this.app.routeHistory.length -= 1;
    //         console.log('using standard back navigation');
    //         window.history.back();
    //         //console.log('fell through back!');
    //     } else {
    //         console.log(`navigating back using base address '${this.leftPanelBaseRoute}'`);
    //         this.app.router.navigate(this.leftPanelBaseRoute);
    //     }
    // }
}
