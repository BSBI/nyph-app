export class EventHarness {
    #eventListeners = [];

    static STOP_PROPAGATION = 'STOP_PROPAGATION';
    
    /**
     *
     * @param {string} eventName
     * @param {Object} obj
     * @param {string|Function} method
     * @param {*=} constructionParam
     * @return {number} handle
     */
    addListener (eventName, obj, method, constructionParam) {
        this.#eventListeners = this.#eventListeners || [];
        
        const handlerFunction = (typeof method === 'string') ?
            (function(context, eventName, invocationParam) {
                return obj[method](context, eventName, invocationParam, constructionParam);
            })
            :
            (function(context, eventName, invocationParam) {
                return method.call(obj, context, eventName, invocationParam, constructionParam);
            });


        if (this.#eventListeners[eventName]) {
            return (this.#eventListeners[eventName].push(handlerFunction))-1;
        } else {
            this.#eventListeners[eventName] = [handlerFunction];
            return 0; // first element in array
        }
    };

    /**
     *
     * @param {string} eventName
     * @param {number} handle
     * @returns undefined
     */
    removeListener(eventName, handle) {
        if (this.#eventListeners[eventName] && this.#eventListeners[eventName][handle]) {
            delete this.#eventListeners[eventName][handle];
        } else {
            console.log('trying to remove non-existent event handler, event = ' + eventName + ' handle = ' + handle);
        }
        return undefined;
    };

    /**
     *
     */
    destructor() {
        this.#eventListeners = null;
    };

    /**
     *
     * @param {string} eventName
     * @param {Object=} param optional parameter to pass on to listener
     * @return void
     */
    fireEvent (eventName, param) {
        //console.log('fire event "' + eventName + '" called by '+this.fire_event.caller.caller+' invoked by '+this.fire_event.caller.caller.caller+' instigated by '+this.fire_event.caller.caller.caller.caller);

        if (this.#eventListeners) {
            for (let f in this.#eventListeners[eventName]) {
                if (this.#eventListeners[eventName].hasOwnProperty(f)) {
                    if (this.#eventListeners[eventName][f](this, eventName, arguments[1]) === EventHarness.STOP_PROPAGATION) {
                        break;
                    }
                }
            }
        }
    };
}