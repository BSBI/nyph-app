// MainController
// Controller for app 'homepage' including the top level form settings followed by a list of occurrences
// probably as an accordion (collapsible list, e.g. https://getbootstrap.com/docs/4.3/components/collapse/#accordion-example)
// that should target the detailed view of the occurrence into either a full screen (on mobile) or a right-hand panel.

import {AppController} from './AppController';
import {NotFoundError} from "../utils/exceptions/NotFoundError";
import {Occurrence} from "../models/Occurrence";
import {InternalAppError} from "../utils/exceptions/InternalAppError";

export class MainController extends AppController {
    route = '/list/:action/:id';

    static EVENT_SELECT_OCCURRENCE = 'selectoccurrence';
    static EVENT_SELECT_SURVEY_SECTION = 'selectsurveysection';
    static EVENT_NEW_RECORD = 'newrecord';
    static EVENT_DELETE_OCCURRENCE = 'deleteoccurrence';
    static EVENT_BACK = 'back';

    /**
     * event fired on and by view when 'next section' button has been click, leading to the records section
     * this will expand the list of records, or if none exist, add a first one and open it
     *
     * @type {string}
     */
    static EVENT_NEXT_TO_RECORDS = 'nexttorecords';

    title = 'BSBI New Year Plant Hunt homepage';

    /**
     * @type {NyphApp}
     */
    app;

    /**
     *
     * @type {MainView}
     */
    view;

    /**
     * @type {string}
     */
    #currentOccurrenceId = '';

    /**
     * set if the view needs full layout rendering
     * @todo this should possibly be a view rather than controller property
     * @type {boolean}
     */
    needsFullRefresh = true;

    /**
     * set if the currently displayed occurrence needs revision
     * @todo this should possibly be a view rather than controller property
     * @type {boolean}
     */
    needRightPanelRefresh = true;

    /**
     *
     * @type {string}
     */
    viewSubcontext = '';

    /**
     * Currently displayed survey subsection
     *
     * @type {string|null}
     */
    surveySection;

    /**
     * this is the route that the 'back button' in a right-hand panel view should resolve to
     * @type {string}
     */
    leftPanelBaseRoute = '';

    /**
     * ultimately this getter might be the point at which to apply filters
     *
     * @returns {Map.<string,Occurrence>}
     */
    get occurrences() {
        return this.app.occurrences;
    }

    /**
     *
     * @returns {null|Occurrence}
     */
    get currentOccurrence() {
        if (this.#currentOccurrenceId) {
            if (this.app.occurrences.has(this.#currentOccurrenceId)) {
                return this.app.occurrences.get(this.#currentOccurrenceId);
            } else {
                throw new NotFoundError(`Record id '${this.#currentOccurrenceId}' was not found.`);
            }
        } else {
            return null;
        }
    }

    /**
     *
     * @returns {string}
     */
    get currentOccurrenceId() {
        return this.#currentOccurrenceId;
    }

    /**
     *
     * @param {string} occurrenceId
     */
    set currentOccurrenceId(occurrenceId) {
        // if (this.#currentOccurrenceId && this.#currentOccurrenceId !== occurrenceId) {
        //     if (this.#currentOccurrenceModifiedEventHandle) {
        //         this.#currentOccurrenceModifiedEventHandle = this.currentOccurrence.removeListener(Occurrence.EVENT_MODIFIED, this.#currentOccurrenceModifiedEventHandle);
        //     }
        // }

        this.#currentOccurrenceId = occurrenceId;
        // if (occurrenceId) {
        //     this.#currentOccurrenceModifiedEventHandle = this.currentOccurrence.addListener(Occurrence.EVENT_MODIFIED, this, this.currentOccurrenceModifiedHandler);
        // }
    }

    /**
     *
     * @returns {Survey}
     */
    get survey() {
        return this.app.currentSurvey;
    }

    /**
     *
     * @param {MainView} view
     */
    constructor (view) {
        super();

        this.view = view;
        view.controller = this;

        this.handle = AppController.nextHandle;

        view.addListener(MainController.EVENT_SELECT_OCCURRENCE, this, this.occurrenceSelectionHandler);
        view.addListener(MainController.EVENT_SELECT_SURVEY_SECTION, this, this.surveyPartSelectionHandler);
        view.addListener(MainController.EVENT_NEW_RECORD, this, this.newRecordHandler);
        view.addListener(MainController.EVENT_DELETE_OCCURRENCE, this, this.deleteOccurrenceHandler);

        view.addListener(MainController.EVENT_BACK, this, this.backHandler);
        view.addListener(MainController.EVENT_NEXT_TO_RECORDS, this, this.nextTransitionToRecordsHandler);
    }

    /**
     * handler for event fired on and by view when 'next section' button has been click, leading to the records section
     * this will expand the list of records, or if none exist, add a first one and open it
     */
    nextTransitionToRecordsHandler() {
        console.log('in nextTransitionToRecordsHandler()');

        if (this.app.haveExtantOccurrences()) {
            this.app.router.navigate('/list/record/');
        } else {
            this.newRecordHandler();
        }
    }

    /**
     *
     * @param {MainController} context
     * @param {string} eventName
     * @param {string} occurrenceId
     */
    deleteOccurrenceHandler(context, eventName, occurrenceId) {
        console.log({deleting : occurrenceId});

        const occurrence = this.app.occurrences.get(occurrenceId);
        if (!occurrence) {
            throw new InternalAppError(`Occurrence id '${occurrenceId}' not found when trying to delete.`);
        }

        occurrence.delete();
        if (this.currentOccurrenceId === occurrenceId) {
            //this.currentOccurrenceId = '';
            this.app.router.navigate(`/list/record/`);
        }
    }

    /**
     *
     * @param {MainController} context
     * @param {string} eventName
     * @param {{sectionKey : string}} params
     */
    surveyPartSelectionHandler (context, eventName, params) {
        console.log('In surveyPartSelectionHandler');
        console.log({context, eventName, params});

        if (params.sectionKey === 'record') {
            this.app.router.navigate(`/list/record/`);
        } else if (params.sectionKey) {
            this.app.router.navigate(`/list/survey/${params.sectionKey}`);
        } else {
            this.app.router.navigate(`/list/`);
        }
    }

    /**
     * may be invoked directly or in response to the Add New Record event
     * therefore assume that the method receives no event parameters
     */
    newRecordHandler() {
        const occurrence = this.app.addNewOccurrence();

        this.app.router.navigate(`/list/record/${occurrence.id}`);
    }

    /**
     *
     * @param {MainController} context
     * @param {string} eventName
     * @param {{occurrenceId : string}} params
     */
    occurrenceSelectionHandler (context, eventName, params) {
        console.log({'In occurrenceSelectionHandler' : {context, eventName, params}});

        if (this.currentOccurrenceId && params.occurrenceId && this.currentOccurrenceId === params.occurrenceId) {
            console.log(`ignoring spurious navigation event for '${params.occurrenceId}'`);
        } else {
            this.app.router.navigate(`/list/record/${params.occurrenceId}`);
        }
    }

    /**
     * registers the default route from this.route
     * or alternatively is overridden in a child class
     *
     * @param {Navigo} router
     */
    registerRoute(router) {
        router.on(
            '/list',
            this.mainRouteHandler.bind(this, 'list', '', ''),
            {
                before : this.beforeRouteHandler ? this.beforeRouteHandler.bind(this) : null,
                after : this.afterRouteHandler ? this.afterRouteHandler.bind(this) : null,
                leave : this.leaveRouteHandler ? this.leaveRouteHandler.bind(this) : null,
                already : this.alreadyRouteHandler ? this.alreadyRouteHandler.bind(this) : null
            }
        );

        router.on(
            '/list/help',
            this.mainRouteHandler.bind(this, 'list', '', 'help')
        );

        router.on(
            '/list/record/',
            this.mainRouteHandler.bind(this, 'list', 'record', ''),
            {
                before : this.beforeRouteHandler ? this.beforeRouteHandler.bind(this) : null,
                after : this.afterRouteHandler ? this.afterRouteHandler.bind(this) : null,
                leave : this.leaveRouteHandler ? this.leaveRouteHandler.bind(this) : null,
                already : this.alreadyRouteHandler ? this.alreadyRouteHandler.bind(this) : null
            }
        );

        router.on(
            '/list/record/help',
            this.mainRouteHandler.bind(this, 'list', 'record', 'help')
        );

        router.on(
            '/list/record/:id',
            this.mainRouteHandler.bind(this, 'list', 'record', 'form'),
            {
                before : this.beforeRouteHandler ? this.beforeRouteHandler.bind(this) : null,
                after : this.afterRouteHandler ? this.afterRouteHandler.bind(this) : null,
                leave : this.leaveRouteHandler ? this.leaveRouteHandler.bind(this) : null,
                already : this.alreadyRouteHandler ? this.alreadyRouteHandler.bind(this) : null
            }
        );

        router.on(
            '/list/survey/:section',
            this.mainRouteHandler.bind(this, 'list', 'survey', ''),
            {
                before : this.beforeRouteHandler ? this.beforeRouteHandler.bind(this) : null,
                after : this.afterRouteHandler ? this.afterRouteHandler.bind(this) : null,
                leave : this.leaveRouteHandler ? this.leaveRouteHandler.bind(this) : null,
                already : this.alreadyRouteHandler ? this.alreadyRouteHandler.bind(this) : null
            }
        );

        router.on(
            '/list/survey/:section/help',
            this.mainRouteHandler.bind(this, 'list', 'survey', 'help')
        );
    }

    /**
     *
     * @param {string} context typically 'list'
     * @param {('record'|'survey')} subcontext record|survey
     * @param {(''|'help')} rhs
     * @param {Object.<string, string>} queryParameters
     */
    mainRouteHandler(context, subcontext, rhs, queryParameters) {
        console.log("reached special route handler for MainController.js");
        console.log({context: context, params: subcontext, query: queryParameters});

        this.app.saveRoute();

        try {
            this.viewSubcontext = subcontext;

            if (subcontext) {
                this.viewContexts[subcontext].call(this, queryParameters);
            }

            if (this.app.currentControllerHandle !== this.handle) {
                // need a complete refresh of the page (the list and any occurrence panel)

                // console.log(`currentControllerHandle = ${this.app.currentControllerHandle}, handle = ${this.handle}`);

                this.needsFullRefresh = true;
                this.needRightPanelRefresh = true;

                this.app.currentControllerHandle = this.handle;
            }

            this.view.panelKey = rhs;
            this.view.display();
            this.needsFullRefresh = false;
        } catch (error) {
            this.error = error;

            console.log({error});

            // attempt to carry on regardless to some extent (error should be reported in the view)
            // but wrap in a further try just in case

            try {
                this.needsFullRefresh = true;
                this.view.display();
            } catch (rethrownError) {
                console.log({rethrownError});
                document.body.innerHTML = `<h2>Internal error</h2><p>Please report this problem:</p><p>${rethrownError.message}</p>`;
            }
        }
    }

    viewContexts = {
        /**
         * @this {MainController}
         * @param {({[id] : string}|null)} queryParameters
         */
        record (queryParameters) {
            // if (queryParameters && queryParameters.id) {
            //     console.log(`in record id ${queryParameters.id}`);
            // }
            // console.log({scope: this});
            this.surveySection = null; // No current survey form section, all should be closed

            if (!queryParameters) {
                // query parameters can be missing
                // force a refresh as it cheap to refresh static content and more difficult to detect
                // if strictly needed.
                // May have reached this point following deletion of the current record.

                this.currentOccurrenceId = '';
                this.needRightPanelRefresh = true;
            } else if (this.#currentOccurrenceId !== queryParameters.id) {
                this.needRightPanelRefresh = true;

                this.currentOccurrenceId = queryParameters.id ?
                     queryParameters.id
                    :
                    '';

            } else {
                this.needRightPanelRefresh = false;
            }

            this.leftPanelBaseRoute = '/list/record';
        },

        /**
         * @this {MainController}
         * @param {{[section]: string}} queryParameters
         */
        survey(queryParameters) {
            console.log(`in survey section ${queryParameters.section}`);
            this.currentOccurrenceId = '';
            this.needRightPanelRefresh = true;
            this.surveySection = queryParameters.section;

            this.leftPanelBaseRoute = `/list/survey/${queryParameters.section}`;
        }
    };

    backHandler() {
       if (this.app.routeHistory.length >= 2 && this.app.routeHistory[this.app.routeHistory.length - 2].url === this.leftPanelBaseRoute) {
            this.app.routeHistory.length -= 1;
            console.log('using standard back navigation');
            window.history.back();
            //console.log('fell through back!');
        } else {
            console.log(`navigating back using base address '${this.leftPanelBaseRoute}'`);
            this.app.router.navigate(this.leftPanelBaseRoute);
        }
    }
}
