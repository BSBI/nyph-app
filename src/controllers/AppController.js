// AppController
// Abstract super-class for page controllers

export class AppController {

    /**
     *
     * @type {(null|string)}
     */
    route = null;

    /**
     *
     * @type {Page}
     */
    view;

    title = 'untitled';

    /**
     *
     * @type {number}
     */
    handle;

    /**
     *
     * @type {App}
     */
    app;

    static #handleIndex = 0;

    static get nextHandle() {
        return AppController.#handleIndex++;
    }

    /**
     * called from App.initialise() to trigger late-stage initialisation
     */
    initialise() {
        this.view.initialise();
    }

    /**
     * registers the default route from this.route
     * or alternatively is overridden in a child class
     *
     * @param {Navigo} router
     */
    registerRoute(router) {
        if (null === this.route) {
            throw new Error(`No route set for '${this.title}' controller.`);
        }

        console.log({route : this.route});

        router.on(
            this.route,
            this.routeHandler.bind(this),
            {
                before : this.beforeRouteHandler ? this.beforeRouteHandler.bind(this) : null,
                after : this.afterRouteHandler ? this.afterRouteHandler.bind(this) : null,
                leave : this.leaveRouteHandler ? this.leaveRouteHandler.bind(this) : null,
                already : this.alreadyRouteHandler ? this.alreadyRouteHandler.bind(this) : null
            }
        );
    }

    /**
     *
     * @param {object} params
     * @param {string} query
     */
    routeHandler(params, query) {

    }
}