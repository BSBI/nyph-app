// StaticContentController

import {AppController} from './AppController';

export class StaticContentController extends AppController {
    /**
     * @type {string}
     */
    route;

    /**
     *
     * @param {Page} view
     * @param {string} route
     */
    constructor (view, route) {
        super();

        this.view = view;
        this.route = route;

        this.handle = AppController.nextHandle;
    }

    /**
     *
     * @param {object} params
     * @param {string} query
     */
    routeHandler(params, query) {
        console.log("reached route handler for StaticContentController.js");

        this.app.currentControllerHandle = this.handle;
        this.view.display();
    }
}
