// App.js
// base class for single page application
// allows binding of controllers and routes

// import {Page} from "../views/Page";
import {NotFoundView} from "../views/NotFoundView";
import {EventHarness} from "./EventHarness";

export class App extends EventHarness {
    /**
     * @type {Navigo}
     */
    #router;

    /**
     * @type {HTMLElement}
     */
    #containerEl;

    /**
     *
     * @type {Array.<AppController>}
     */
    controllers = [];

    /**
     * tracks the handle of the current page controller
     * updating this is the responsibility of the controller
     *
     * @type {number|boolean}
     */
    currentControllerHandle = false;

    /**
     *
     * @type {Array.<{url : string}>}
     */
    routeHistory = [];

    /**
     * keyed by occurrence id (a UUID string)
     *
     * @type {Map.<string,Occurrence>}
     */
    occurrences;

    /**
     * keyed by survey id (a UUID string)
     *
     * @type {Map.<string,Survey>}
     */
    surveys;

    /**
     * @type {Survey}
     */
    currentSurvey;

    /**
     * @type {Layout}
     */
    layout;

    /**
     * Event fired when user requests a new blank survey
     * @type {string}
     */
    static EVENT_ADD_SURVEY_USER_REQUEST = 'useraddsurveyrequest';

    /**
     * Event fired when user requests a reset (local clearance) of all surveys
     * @type {string}
     */
    static EVENT_RESET_SURVEYS = 'userresetsurveys';

    constructor() {
        super();
        this.reset();
    }

    reset() {
        this.surveys = new Map();
        this.clearCurrentSurvey();
    }

    /**
     * unset the current survey and its associated list of occurrences
     * called when switching surveys and during startup
     */
    clearCurrentSurvey() {
        this.occurrences = new Map();
        this.currentSurvey = null;
    }

    /**
     * see https://github.com/krasimir/navigo
     * @param {PatchedNavigo} router
     */
    set router(router) {
        this.#router = router;
    }

    get router() {
        return this.#router;
    }

    set containerId(containerId) {
        const el = document.getElementById(containerId);
        if (!el) {
            throw new Error(`App container '${containerId}' not found.`);
        } else {
            this.#containerEl = el;
        }
    }

    get container() {
        return this.#containerEl;
    }

    /**
     *
     * @param {AppController} controller
     */
    registerController(controller) {
        controller.handle = this.controllers.length;
        this.controllers[this.controllers.length] = controller;

        controller.app = this;
        controller.registerRoute(this.#router);
    }

    initialise() {
        //Page.initialise_layout(this.#containerEl);
        this.layout.initialise();

        this.#router.notFound((query) => {
            // called when there is path specified but
            // there is no route matching

            console.log(`no route found for '${query}'`);
            //this.#router.navigate('/list');

            const view = new NotFoundView();
            view.display();
        });

        //default homepage
        this.#router.on(() => {
            // special-case redirect (replacing in history) from '/' to '/list' without updating browser history

            console.log("redirecting from '/' to '/list'");

            this.#router.pause();
            if (this.clearCurrentSurvey && this.currentSurvey.isPristine) {
                this.#router.navigate('/list/survey/welcome').resume();
            } else {
                this.#router.navigate('/list').resume();
            }
            this.#router.resolve();
        });

        for (let controller of this.controllers) {
            controller.initialise();
        }
    }

    display() {
        console.log('App display');
        this.#router.resolve();
    }

    saveRoute() {
        const lastRoute = this.#router.lastRouteResolved();
        if (this.routeHistory.length) {
            if (this.routeHistory[this.routeHistory.length - 1] !== lastRoute) {
                this.routeHistory[this.routeHistory.length] = lastRoute;
            }
        } else {
            this.routeHistory[0] = lastRoute;
        }
    }

    /**
     * mark the current survey and its constituent records as subject to validation checks (not pristine)
     */
    markAllNotPristine() {
        for (let occurrenceTuple of this.occurrences) {
            occurrenceTuple[1].isPristine = false;
        }
    }

    /**
     *
     * @param {Layout} layout
     */
    setLayout(layout) {
        this.layout = layout;
        layout.setApp(this);
    }
}

