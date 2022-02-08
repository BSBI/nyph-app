var commonjsGlobal$1 = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

var modal = {exports: {}};

var eventHandler = {exports: {}};

/*!
  * Bootstrap event-handler.js v5.1.3 (https://getbootstrap.com/)
  * Copyright 2011-2021 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
  */

(function (module, exports) {
(function (global, factory) {
  module.exports = factory() ;
})(commonjsGlobal$1, (function () {
  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v5.1.3): util/index.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
   * --------------------------------------------------------------------------
   */

  const getjQuery = () => {
    const {
      jQuery
    } = window;

    if (jQuery && !document.body.hasAttribute('data-bs-no-jquery')) {
      return jQuery;
    }

    return null;
  };

  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v5.1.3): dom/event-handler.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
   * --------------------------------------------------------------------------
   */
  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  const namespaceRegex = /[^.]*(?=\..*)\.|.*/;
  const stripNameRegex = /\..*/;
  const stripUidRegex = /::\d+$/;
  const eventRegistry = {}; // Events storage

  let uidEvent = 1;
  const customEvents = {
    mouseenter: 'mouseover',
    mouseleave: 'mouseout'
  };
  const customEventsRegex = /^(mouseenter|mouseleave)/i;
  const nativeEvents = new Set(['click', 'dblclick', 'mouseup', 'mousedown', 'contextmenu', 'mousewheel', 'DOMMouseScroll', 'mouseover', 'mouseout', 'mousemove', 'selectstart', 'selectend', 'keydown', 'keypress', 'keyup', 'orientationchange', 'touchstart', 'touchmove', 'touchend', 'touchcancel', 'pointerdown', 'pointermove', 'pointerup', 'pointerleave', 'pointercancel', 'gesturestart', 'gesturechange', 'gestureend', 'focus', 'blur', 'change', 'reset', 'select', 'submit', 'focusin', 'focusout', 'load', 'unload', 'beforeunload', 'resize', 'move', 'DOMContentLoaded', 'readystatechange', 'error', 'abort', 'scroll']);
  /**
   * ------------------------------------------------------------------------
   * Private methods
   * ------------------------------------------------------------------------
   */

  function getUidEvent(element, uid) {
    return uid && `${uid}::${uidEvent++}` || element.uidEvent || uidEvent++;
  }

  function getEvent(element) {
    const uid = getUidEvent(element);
    element.uidEvent = uid;
    eventRegistry[uid] = eventRegistry[uid] || {};
    return eventRegistry[uid];
  }

  function bootstrapHandler(element, fn) {
    return function handler(event) {
      event.delegateTarget = element;

      if (handler.oneOff) {
        EventHandler.off(element, event.type, fn);
      }

      return fn.apply(element, [event]);
    };
  }

  function bootstrapDelegationHandler(element, selector, fn) {
    return function handler(event) {
      const domElements = element.querySelectorAll(selector);

      for (let {
        target
      } = event; target && target !== this; target = target.parentNode) {
        for (let i = domElements.length; i--;) {
          if (domElements[i] === target) {
            event.delegateTarget = target;

            if (handler.oneOff) {
              EventHandler.off(element, event.type, selector, fn);
            }

            return fn.apply(target, [event]);
          }
        }
      } // To please ESLint


      return null;
    };
  }

  function findHandler(events, handler, delegationSelector = null) {
    const uidEventList = Object.keys(events);

    for (let i = 0, len = uidEventList.length; i < len; i++) {
      const event = events[uidEventList[i]];

      if (event.originalHandler === handler && event.delegationSelector === delegationSelector) {
        return event;
      }
    }

    return null;
  }

  function normalizeParams(originalTypeEvent, handler, delegationFn) {
    const delegation = typeof handler === 'string';
    const originalHandler = delegation ? delegationFn : handler;
    let typeEvent = getTypeEvent(originalTypeEvent);
    const isNative = nativeEvents.has(typeEvent);

    if (!isNative) {
      typeEvent = originalTypeEvent;
    }

    return [delegation, originalHandler, typeEvent];
  }

  function addHandler(element, originalTypeEvent, handler, delegationFn, oneOff) {
    if (typeof originalTypeEvent !== 'string' || !element) {
      return;
    }

    if (!handler) {
      handler = delegationFn;
      delegationFn = null;
    } // in case of mouseenter or mouseleave wrap the handler within a function that checks for its DOM position
    // this prevents the handler from being dispatched the same way as mouseover or mouseout does


    if (customEventsRegex.test(originalTypeEvent)) {
      const wrapFn = fn => {
        return function (event) {
          if (!event.relatedTarget || event.relatedTarget !== event.delegateTarget && !event.delegateTarget.contains(event.relatedTarget)) {
            return fn.call(this, event);
          }
        };
      };

      if (delegationFn) {
        delegationFn = wrapFn(delegationFn);
      } else {
        handler = wrapFn(handler);
      }
    }

    const [delegation, originalHandler, typeEvent] = normalizeParams(originalTypeEvent, handler, delegationFn);
    const events = getEvent(element);
    const handlers = events[typeEvent] || (events[typeEvent] = {});
    const previousFn = findHandler(handlers, originalHandler, delegation ? handler : null);

    if (previousFn) {
      previousFn.oneOff = previousFn.oneOff && oneOff;
      return;
    }

    const uid = getUidEvent(originalHandler, originalTypeEvent.replace(namespaceRegex, ''));
    const fn = delegation ? bootstrapDelegationHandler(element, handler, delegationFn) : bootstrapHandler(element, handler);
    fn.delegationSelector = delegation ? handler : null;
    fn.originalHandler = originalHandler;
    fn.oneOff = oneOff;
    fn.uidEvent = uid;
    handlers[uid] = fn;
    element.addEventListener(typeEvent, fn, delegation);
  }

  function removeHandler(element, events, typeEvent, handler, delegationSelector) {
    const fn = findHandler(events[typeEvent], handler, delegationSelector);

    if (!fn) {
      return;
    }

    element.removeEventListener(typeEvent, fn, Boolean(delegationSelector));
    delete events[typeEvent][fn.uidEvent];
  }

  function removeNamespacedHandlers(element, events, typeEvent, namespace) {
    const storeElementEvent = events[typeEvent] || {};
    Object.keys(storeElementEvent).forEach(handlerKey => {
      if (handlerKey.includes(namespace)) {
        const event = storeElementEvent[handlerKey];
        removeHandler(element, events, typeEvent, event.originalHandler, event.delegationSelector);
      }
    });
  }

  function getTypeEvent(event) {
    // allow to get the native events from namespaced events ('click.bs.button' --> 'click')
    event = event.replace(stripNameRegex, '');
    return customEvents[event] || event;
  }

  const EventHandler = {
    on(element, event, handler, delegationFn) {
      addHandler(element, event, handler, delegationFn, false);
    },

    one(element, event, handler, delegationFn) {
      addHandler(element, event, handler, delegationFn, true);
    },

    off(element, originalTypeEvent, handler, delegationFn) {
      if (typeof originalTypeEvent !== 'string' || !element) {
        return;
      }

      const [delegation, originalHandler, typeEvent] = normalizeParams(originalTypeEvent, handler, delegationFn);
      const inNamespace = typeEvent !== originalTypeEvent;
      const events = getEvent(element);
      const isNamespace = originalTypeEvent.startsWith('.');

      if (typeof originalHandler !== 'undefined') {
        // Simplest case: handler is passed, remove that listener ONLY.
        if (!events || !events[typeEvent]) {
          return;
        }

        removeHandler(element, events, typeEvent, originalHandler, delegation ? handler : null);
        return;
      }

      if (isNamespace) {
        Object.keys(events).forEach(elementEvent => {
          removeNamespacedHandlers(element, events, elementEvent, originalTypeEvent.slice(1));
        });
      }

      const storeElementEvent = events[typeEvent] || {};
      Object.keys(storeElementEvent).forEach(keyHandlers => {
        const handlerKey = keyHandlers.replace(stripUidRegex, '');

        if (!inNamespace || originalTypeEvent.includes(handlerKey)) {
          const event = storeElementEvent[keyHandlers];
          removeHandler(element, events, typeEvent, event.originalHandler, event.delegationSelector);
        }
      });
    },

    trigger(element, event, args) {
      if (typeof event !== 'string' || !element) {
        return null;
      }

      const $ = getjQuery();
      const typeEvent = getTypeEvent(event);
      const inNamespace = event !== typeEvent;
      const isNative = nativeEvents.has(typeEvent);
      let jQueryEvent;
      let bubbles = true;
      let nativeDispatch = true;
      let defaultPrevented = false;
      let evt = null;

      if (inNamespace && $) {
        jQueryEvent = $.Event(event, args);
        $(element).trigger(jQueryEvent);
        bubbles = !jQueryEvent.isPropagationStopped();
        nativeDispatch = !jQueryEvent.isImmediatePropagationStopped();
        defaultPrevented = jQueryEvent.isDefaultPrevented();
      }

      if (isNative) {
        evt = document.createEvent('HTMLEvents');
        evt.initEvent(typeEvent, bubbles, true);
      } else {
        evt = new CustomEvent(event, {
          bubbles,
          cancelable: true
        });
      } // merge custom information in our event


      if (typeof args !== 'undefined') {
        Object.keys(args).forEach(key => {
          Object.defineProperty(evt, key, {
            get() {
              return args[key];
            }

          });
        });
      }

      if (defaultPrevented) {
        evt.preventDefault();
      }

      if (nativeDispatch) {
        element.dispatchEvent(evt);
      }

      if (evt.defaultPrevented && typeof jQueryEvent !== 'undefined') {
        jQueryEvent.preventDefault();
      }

      return evt;
    }

  };

  return EventHandler;

}));

}(eventHandler));

var manipulator = {exports: {}};

/*!
  * Bootstrap manipulator.js v5.1.3 (https://getbootstrap.com/)
  * Copyright 2011-2021 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
  */

(function (module, exports) {
(function (global, factory) {
  module.exports = factory() ;
})(commonjsGlobal$1, (function () {
  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v5.1.3): dom/manipulator.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
   * --------------------------------------------------------------------------
   */
  function normalizeData(val) {
    if (val === 'true') {
      return true;
    }

    if (val === 'false') {
      return false;
    }

    if (val === Number(val).toString()) {
      return Number(val);
    }

    if (val === '' || val === 'null') {
      return null;
    }

    return val;
  }

  function normalizeDataKey(key) {
    return key.replace(/[A-Z]/g, chr => `-${chr.toLowerCase()}`);
  }

  const Manipulator = {
    setDataAttribute(element, key, value) {
      element.setAttribute(`data-bs-${normalizeDataKey(key)}`, value);
    },

    removeDataAttribute(element, key) {
      element.removeAttribute(`data-bs-${normalizeDataKey(key)}`);
    },

    getDataAttributes(element) {
      if (!element) {
        return {};
      }

      const attributes = {};
      Object.keys(element.dataset).filter(key => key.startsWith('bs')).forEach(key => {
        let pureKey = key.replace(/^bs/, '');
        pureKey = pureKey.charAt(0).toLowerCase() + pureKey.slice(1, pureKey.length);
        attributes[pureKey] = normalizeData(element.dataset[key]);
      });
      return attributes;
    },

    getDataAttribute(element, key) {
      return normalizeData(element.getAttribute(`data-bs-${normalizeDataKey(key)}`));
    },

    offset(element) {
      const rect = element.getBoundingClientRect();
      return {
        top: rect.top + window.pageYOffset,
        left: rect.left + window.pageXOffset
      };
    },

    position(element) {
      return {
        top: element.offsetTop,
        left: element.offsetLeft
      };
    }

  };

  return Manipulator;

}));

}(manipulator));

var selectorEngine = {exports: {}};

/*!
  * Bootstrap selector-engine.js v5.1.3 (https://getbootstrap.com/)
  * Copyright 2011-2021 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
  */

(function (module, exports) {
(function (global, factory) {
  module.exports = factory() ;
})(commonjsGlobal$1, (function () {
  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v5.1.3): util/index.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
   * --------------------------------------------------------------------------
   */

  const isElement = obj => {
    if (!obj || typeof obj !== 'object') {
      return false;
    }

    if (typeof obj.jquery !== 'undefined') {
      obj = obj[0];
    }

    return typeof obj.nodeType !== 'undefined';
  };

  const isVisible = element => {
    if (!isElement(element) || element.getClientRects().length === 0) {
      return false;
    }

    return getComputedStyle(element).getPropertyValue('visibility') === 'visible';
  };

  const isDisabled = element => {
    if (!element || element.nodeType !== Node.ELEMENT_NODE) {
      return true;
    }

    if (element.classList.contains('disabled')) {
      return true;
    }

    if (typeof element.disabled !== 'undefined') {
      return element.disabled;
    }

    return element.hasAttribute('disabled') && element.getAttribute('disabled') !== 'false';
  };

  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v5.1.3): dom/selector-engine.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
   * --------------------------------------------------------------------------
   */
  const NODE_TEXT = 3;
  const SelectorEngine = {
    find(selector, element = document.documentElement) {
      return [].concat(...Element.prototype.querySelectorAll.call(element, selector));
    },

    findOne(selector, element = document.documentElement) {
      return Element.prototype.querySelector.call(element, selector);
    },

    children(element, selector) {
      return [].concat(...element.children).filter(child => child.matches(selector));
    },

    parents(element, selector) {
      const parents = [];
      let ancestor = element.parentNode;

      while (ancestor && ancestor.nodeType === Node.ELEMENT_NODE && ancestor.nodeType !== NODE_TEXT) {
        if (ancestor.matches(selector)) {
          parents.push(ancestor);
        }

        ancestor = ancestor.parentNode;
      }

      return parents;
    },

    prev(element, selector) {
      let previous = element.previousElementSibling;

      while (previous) {
        if (previous.matches(selector)) {
          return [previous];
        }

        previous = previous.previousElementSibling;
      }

      return [];
    },

    next(element, selector) {
      let next = element.nextElementSibling;

      while (next) {
        if (next.matches(selector)) {
          return [next];
        }

        next = next.nextElementSibling;
      }

      return [];
    },

    focusableChildren(element) {
      const focusables = ['a', 'button', 'input', 'textarea', 'select', 'details', '[tabindex]', '[contenteditable="true"]'].map(selector => `${selector}:not([tabindex^="-"])`).join(', ');
      return this.find(focusables, element).filter(el => !isDisabled(el) && isVisible(el));
    }

  };

  return SelectorEngine;

}));

}(selectorEngine));

var baseComponent = {exports: {}};

var data = {exports: {}};

/*!
  * Bootstrap data.js v5.1.3 (https://getbootstrap.com/)
  * Copyright 2011-2021 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
  */

(function (module, exports) {
(function (global, factory) {
  module.exports = factory() ;
})(commonjsGlobal$1, (function () {
  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v5.1.3): dom/data.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
   * --------------------------------------------------------------------------
   */

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */
  const elementMap = new Map();
  const data = {
    set(element, key, instance) {
      if (!elementMap.has(element)) {
        elementMap.set(element, new Map());
      }

      const instanceMap = elementMap.get(element); // make it clear we only want one instance per element
      // can be removed later when multiple key/instances are fine to be used

      if (!instanceMap.has(key) && instanceMap.size !== 0) {
        // eslint-disable-next-line no-console
        console.error(`Bootstrap doesn't allow more than one instance per element. Bound instance: ${Array.from(instanceMap.keys())[0]}.`);
        return;
      }

      instanceMap.set(key, instance);
    },

    get(element, key) {
      if (elementMap.has(element)) {
        return elementMap.get(element).get(key) || null;
      }

      return null;
    },

    remove(element, key) {
      if (!elementMap.has(element)) {
        return;
      }

      const instanceMap = elementMap.get(element);
      instanceMap.delete(key); // free up element references if there are no instances left for an element

      if (instanceMap.size === 0) {
        elementMap.delete(element);
      }
    }

  };

  return data;

}));

}(data));

/*!
  * Bootstrap base-component.js v5.1.3 (https://getbootstrap.com/)
  * Copyright 2011-2021 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
  */

(function (module, exports) {
(function (global, factory) {
  module.exports = factory(data.exports, eventHandler.exports) ;
})(commonjsGlobal$1, (function (Data, EventHandler) {
  const _interopDefaultLegacy = e => e && typeof e === 'object' && 'default' in e ? e : { default: e };

  const Data__default = /*#__PURE__*/_interopDefaultLegacy(Data);
  const EventHandler__default = /*#__PURE__*/_interopDefaultLegacy(EventHandler);

  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v5.1.3): util/index.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
   * --------------------------------------------------------------------------
   */
  const MILLISECONDS_MULTIPLIER = 1000;
  const TRANSITION_END = 'transitionend'; // Shoutout AngusCroll (https://goo.gl/pxwQGp)

  const getTransitionDurationFromElement = element => {
    if (!element) {
      return 0;
    } // Get transition-duration of the element


    let {
      transitionDuration,
      transitionDelay
    } = window.getComputedStyle(element);
    const floatTransitionDuration = Number.parseFloat(transitionDuration);
    const floatTransitionDelay = Number.parseFloat(transitionDelay); // Return 0 if element or transition duration is not found

    if (!floatTransitionDuration && !floatTransitionDelay) {
      return 0;
    } // If multiple durations are defined, take the first


    transitionDuration = transitionDuration.split(',')[0];
    transitionDelay = transitionDelay.split(',')[0];
    return (Number.parseFloat(transitionDuration) + Number.parseFloat(transitionDelay)) * MILLISECONDS_MULTIPLIER;
  };

  const triggerTransitionEnd = element => {
    element.dispatchEvent(new Event(TRANSITION_END));
  };

  const isElement = obj => {
    if (!obj || typeof obj !== 'object') {
      return false;
    }

    if (typeof obj.jquery !== 'undefined') {
      obj = obj[0];
    }

    return typeof obj.nodeType !== 'undefined';
  };

  const getElement = obj => {
    if (isElement(obj)) {
      // it's a jQuery object or a node element
      return obj.jquery ? obj[0] : obj;
    }

    if (typeof obj === 'string' && obj.length > 0) {
      return document.querySelector(obj);
    }

    return null;
  };

  const execute = callback => {
    if (typeof callback === 'function') {
      callback();
    }
  };

  const executeAfterTransition = (callback, transitionElement, waitForTransition = true) => {
    if (!waitForTransition) {
      execute(callback);
      return;
    }

    const durationPadding = 5;
    const emulatedDuration = getTransitionDurationFromElement(transitionElement) + durationPadding;
    let called = false;

    const handler = ({
      target
    }) => {
      if (target !== transitionElement) {
        return;
      }

      called = true;
      transitionElement.removeEventListener(TRANSITION_END, handler);
      execute(callback);
    };

    transitionElement.addEventListener(TRANSITION_END, handler);
    setTimeout(() => {
      if (!called) {
        triggerTransitionEnd(transitionElement);
      }
    }, emulatedDuration);
  };

  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v5.1.3): base-component.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
   * --------------------------------------------------------------------------
   */
  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  const VERSION = '5.1.3';

  class BaseComponent {
    constructor(element) {
      element = getElement(element);

      if (!element) {
        return;
      }

      this._element = element;
      Data__default.default.set(this._element, this.constructor.DATA_KEY, this);
    }

    dispose() {
      Data__default.default.remove(this._element, this.constructor.DATA_KEY);
      EventHandler__default.default.off(this._element, this.constructor.EVENT_KEY);
      Object.getOwnPropertyNames(this).forEach(propertyName => {
        this[propertyName] = null;
      });
    }

    _queueCallback(callback, element, isAnimated = true) {
      executeAfterTransition(callback, element, isAnimated);
    }
    /** Static */


    static getInstance(element) {
      return Data__default.default.get(getElement(element), this.DATA_KEY);
    }

    static getOrCreateInstance(element, config = {}) {
      return this.getInstance(element) || new this(element, typeof config === 'object' ? config : null);
    }

    static get VERSION() {
      return VERSION;
    }

    static get NAME() {
      throw new Error('You have to implement the static method "NAME", for each component!');
    }

    static get DATA_KEY() {
      return `bs.${this.NAME}`;
    }

    static get EVENT_KEY() {
      return `.${this.DATA_KEY}`;
    }

  }

  return BaseComponent;

}));

}(baseComponent));

/*!
  * Bootstrap modal.js v5.1.3 (https://getbootstrap.com/)
  * Copyright 2011-2021 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
  */

(function (module, exports) {
(function (global, factory) {
  module.exports = factory(eventHandler.exports, manipulator.exports, selectorEngine.exports, baseComponent.exports) ;
})(commonjsGlobal$1, (function (EventHandler, Manipulator, SelectorEngine, BaseComponent) {
  const _interopDefaultLegacy = e => e && typeof e === 'object' && 'default' in e ? e : { default: e };

  const EventHandler__default = /*#__PURE__*/_interopDefaultLegacy(EventHandler);
  const Manipulator__default = /*#__PURE__*/_interopDefaultLegacy(Manipulator);
  const SelectorEngine__default = /*#__PURE__*/_interopDefaultLegacy(SelectorEngine);
  const BaseComponent__default = /*#__PURE__*/_interopDefaultLegacy(BaseComponent);

  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v5.1.3): util/index.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
   * --------------------------------------------------------------------------
   */
  const MILLISECONDS_MULTIPLIER = 1000;
  const TRANSITION_END = 'transitionend'; // Shoutout AngusCroll (https://goo.gl/pxwQGp)

  const toType = obj => {
    if (obj === null || obj === undefined) {
      return `${obj}`;
    }

    return {}.toString.call(obj).match(/\s([a-z]+)/i)[1].toLowerCase();
  };

  const getSelector = element => {
    let selector = element.getAttribute('data-bs-target');

    if (!selector || selector === '#') {
      let hrefAttr = element.getAttribute('href'); // The only valid content that could double as a selector are IDs or classes,
      // so everything starting with `#` or `.`. If a "real" URL is used as the selector,
      // `document.querySelector` will rightfully complain it is invalid.
      // See https://github.com/twbs/bootstrap/issues/32273

      if (!hrefAttr || !hrefAttr.includes('#') && !hrefAttr.startsWith('.')) {
        return null;
      } // Just in case some CMS puts out a full URL with the anchor appended


      if (hrefAttr.includes('#') && !hrefAttr.startsWith('#')) {
        hrefAttr = `#${hrefAttr.split('#')[1]}`;
      }

      selector = hrefAttr && hrefAttr !== '#' ? hrefAttr.trim() : null;
    }

    return selector;
  };

  const getElementFromSelector = element => {
    const selector = getSelector(element);
    return selector ? document.querySelector(selector) : null;
  };

  const getTransitionDurationFromElement = element => {
    if (!element) {
      return 0;
    } // Get transition-duration of the element


    let {
      transitionDuration,
      transitionDelay
    } = window.getComputedStyle(element);
    const floatTransitionDuration = Number.parseFloat(transitionDuration);
    const floatTransitionDelay = Number.parseFloat(transitionDelay); // Return 0 if element or transition duration is not found

    if (!floatTransitionDuration && !floatTransitionDelay) {
      return 0;
    } // If multiple durations are defined, take the first


    transitionDuration = transitionDuration.split(',')[0];
    transitionDelay = transitionDelay.split(',')[0];
    return (Number.parseFloat(transitionDuration) + Number.parseFloat(transitionDelay)) * MILLISECONDS_MULTIPLIER;
  };

  const triggerTransitionEnd = element => {
    element.dispatchEvent(new Event(TRANSITION_END));
  };

  const isElement = obj => {
    if (!obj || typeof obj !== 'object') {
      return false;
    }

    if (typeof obj.jquery !== 'undefined') {
      obj = obj[0];
    }

    return typeof obj.nodeType !== 'undefined';
  };

  const getElement = obj => {
    if (isElement(obj)) {
      // it's a jQuery object or a node element
      return obj.jquery ? obj[0] : obj;
    }

    if (typeof obj === 'string' && obj.length > 0) {
      return document.querySelector(obj);
    }

    return null;
  };

  const typeCheckConfig = (componentName, config, configTypes) => {
    Object.keys(configTypes).forEach(property => {
      const expectedTypes = configTypes[property];
      const value = config[property];
      const valueType = value && isElement(value) ? 'element' : toType(value);

      if (!new RegExp(expectedTypes).test(valueType)) {
        throw new TypeError(`${componentName.toUpperCase()}: Option "${property}" provided type "${valueType}" but expected type "${expectedTypes}".`);
      }
    });
  };

  const isVisible = element => {
    if (!isElement(element) || element.getClientRects().length === 0) {
      return false;
    }

    return getComputedStyle(element).getPropertyValue('visibility') === 'visible';
  };

  const isDisabled = element => {
    if (!element || element.nodeType !== Node.ELEMENT_NODE) {
      return true;
    }

    if (element.classList.contains('disabled')) {
      return true;
    }

    if (typeof element.disabled !== 'undefined') {
      return element.disabled;
    }

    return element.hasAttribute('disabled') && element.getAttribute('disabled') !== 'false';
  };
  /**
   * Trick to restart an element's animation
   *
   * @param {HTMLElement} element
   * @return void
   *
   * @see https://www.charistheo.io/blog/2021/02/restart-a-css-animation-with-javascript/#restarting-a-css-animation
   */


  const reflow = element => {
    // eslint-disable-next-line no-unused-expressions
    element.offsetHeight;
  };

  const getjQuery = () => {
    const {
      jQuery
    } = window;

    if (jQuery && !document.body.hasAttribute('data-bs-no-jquery')) {
      return jQuery;
    }

    return null;
  };

  const DOMContentLoadedCallbacks = [];

  const onDOMContentLoaded = callback => {
    if (document.readyState === 'loading') {
      // add listener on the first call when the document is in loading state
      if (!DOMContentLoadedCallbacks.length) {
        document.addEventListener('DOMContentLoaded', () => {
          DOMContentLoadedCallbacks.forEach(callback => callback());
        });
      }

      DOMContentLoadedCallbacks.push(callback);
    } else {
      callback();
    }
  };

  const isRTL = () => document.documentElement.dir === 'rtl';

  const defineJQueryPlugin = plugin => {
    onDOMContentLoaded(() => {
      const $ = getjQuery();
      /* istanbul ignore if */

      if ($) {
        const name = plugin.NAME;
        const JQUERY_NO_CONFLICT = $.fn[name];
        $.fn[name] = plugin.jQueryInterface;
        $.fn[name].Constructor = plugin;

        $.fn[name].noConflict = () => {
          $.fn[name] = JQUERY_NO_CONFLICT;
          return plugin.jQueryInterface;
        };
      }
    });
  };

  const execute = callback => {
    if (typeof callback === 'function') {
      callback();
    }
  };

  const executeAfterTransition = (callback, transitionElement, waitForTransition = true) => {
    if (!waitForTransition) {
      execute(callback);
      return;
    }

    const durationPadding = 5;
    const emulatedDuration = getTransitionDurationFromElement(transitionElement) + durationPadding;
    let called = false;

    const handler = ({
      target
    }) => {
      if (target !== transitionElement) {
        return;
      }

      called = true;
      transitionElement.removeEventListener(TRANSITION_END, handler);
      execute(callback);
    };

    transitionElement.addEventListener(TRANSITION_END, handler);
    setTimeout(() => {
      if (!called) {
        triggerTransitionEnd(transitionElement);
      }
    }, emulatedDuration);
  };

  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v5.1.3): util/scrollBar.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
   * --------------------------------------------------------------------------
   */
  const SELECTOR_FIXED_CONTENT = '.fixed-top, .fixed-bottom, .is-fixed, .sticky-top';
  const SELECTOR_STICKY_CONTENT = '.sticky-top';

  class ScrollBarHelper {
    constructor() {
      this._element = document.body;
    }

    getWidth() {
      // https://developer.mozilla.org/en-US/docs/Web/API/Window/innerWidth#usage_notes
      const documentWidth = document.documentElement.clientWidth;
      return Math.abs(window.innerWidth - documentWidth);
    }

    hide() {
      const width = this.getWidth();

      this._disableOverFlow(); // give padding to element to balance the hidden scrollbar width


      this._setElementAttributes(this._element, 'paddingRight', calculatedValue => calculatedValue + width); // trick: We adjust positive paddingRight and negative marginRight to sticky-top elements to keep showing fullwidth


      this._setElementAttributes(SELECTOR_FIXED_CONTENT, 'paddingRight', calculatedValue => calculatedValue + width);

      this._setElementAttributes(SELECTOR_STICKY_CONTENT, 'marginRight', calculatedValue => calculatedValue - width);
    }

    _disableOverFlow() {
      this._saveInitialAttribute(this._element, 'overflow');

      this._element.style.overflow = 'hidden';
    }

    _setElementAttributes(selector, styleProp, callback) {
      const scrollbarWidth = this.getWidth();

      const manipulationCallBack = element => {
        if (element !== this._element && window.innerWidth > element.clientWidth + scrollbarWidth) {
          return;
        }

        this._saveInitialAttribute(element, styleProp);

        const calculatedValue = window.getComputedStyle(element)[styleProp];
        element.style[styleProp] = `${callback(Number.parseFloat(calculatedValue))}px`;
      };

      this._applyManipulationCallback(selector, manipulationCallBack);
    }

    reset() {
      this._resetElementAttributes(this._element, 'overflow');

      this._resetElementAttributes(this._element, 'paddingRight');

      this._resetElementAttributes(SELECTOR_FIXED_CONTENT, 'paddingRight');

      this._resetElementAttributes(SELECTOR_STICKY_CONTENT, 'marginRight');
    }

    _saveInitialAttribute(element, styleProp) {
      const actualValue = element.style[styleProp];

      if (actualValue) {
        Manipulator__default.default.setDataAttribute(element, styleProp, actualValue);
      }
    }

    _resetElementAttributes(selector, styleProp) {
      const manipulationCallBack = element => {
        const value = Manipulator__default.default.getDataAttribute(element, styleProp);

        if (typeof value === 'undefined') {
          element.style.removeProperty(styleProp);
        } else {
          Manipulator__default.default.removeDataAttribute(element, styleProp);
          element.style[styleProp] = value;
        }
      };

      this._applyManipulationCallback(selector, manipulationCallBack);
    }

    _applyManipulationCallback(selector, callBack) {
      if (isElement(selector)) {
        callBack(selector);
      } else {
        SelectorEngine__default.default.find(selector, this._element).forEach(callBack);
      }
    }

    isOverflowing() {
      return this.getWidth() > 0;
    }

  }

  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v5.1.3): util/backdrop.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
   * --------------------------------------------------------------------------
   */
  const Default$2 = {
    className: 'modal-backdrop',
    isVisible: true,
    // if false, we use the backdrop helper without adding any element to the dom
    isAnimated: false,
    rootElement: 'body',
    // give the choice to place backdrop under different elements
    clickCallback: null
  };
  const DefaultType$2 = {
    className: 'string',
    isVisible: 'boolean',
    isAnimated: 'boolean',
    rootElement: '(element|string)',
    clickCallback: '(function|null)'
  };
  const NAME$2 = 'backdrop';
  const CLASS_NAME_FADE$1 = 'fade';
  const CLASS_NAME_SHOW$1 = 'show';
  const EVENT_MOUSEDOWN = `mousedown.bs.${NAME$2}`;

  class Backdrop {
    constructor(config) {
      this._config = this._getConfig(config);
      this._isAppended = false;
      this._element = null;
    }

    show(callback) {
      if (!this._config.isVisible) {
        execute(callback);
        return;
      }

      this._append();

      if (this._config.isAnimated) {
        reflow(this._getElement());
      }

      this._getElement().classList.add(CLASS_NAME_SHOW$1);

      this._emulateAnimation(() => {
        execute(callback);
      });
    }

    hide(callback) {
      if (!this._config.isVisible) {
        execute(callback);
        return;
      }

      this._getElement().classList.remove(CLASS_NAME_SHOW$1);

      this._emulateAnimation(() => {
        this.dispose();
        execute(callback);
      });
    } // Private


    _getElement() {
      if (!this._element) {
        const backdrop = document.createElement('div');
        backdrop.className = this._config.className;

        if (this._config.isAnimated) {
          backdrop.classList.add(CLASS_NAME_FADE$1);
        }

        this._element = backdrop;
      }

      return this._element;
    }

    _getConfig(config) {
      config = { ...Default$2,
        ...(typeof config === 'object' ? config : {})
      }; // use getElement() with the default "body" to get a fresh Element on each instantiation

      config.rootElement = getElement(config.rootElement);
      typeCheckConfig(NAME$2, config, DefaultType$2);
      return config;
    }

    _append() {
      if (this._isAppended) {
        return;
      }

      this._config.rootElement.append(this._getElement());

      EventHandler__default.default.on(this._getElement(), EVENT_MOUSEDOWN, () => {
        execute(this._config.clickCallback);
      });
      this._isAppended = true;
    }

    dispose() {
      if (!this._isAppended) {
        return;
      }

      EventHandler__default.default.off(this._element, EVENT_MOUSEDOWN);

      this._element.remove();

      this._isAppended = false;
    }

    _emulateAnimation(callback) {
      executeAfterTransition(callback, this._getElement(), this._config.isAnimated);
    }

  }

  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v5.1.3): util/focustrap.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
   * --------------------------------------------------------------------------
   */
  const Default$1 = {
    trapElement: null,
    // The element to trap focus inside of
    autofocus: true
  };
  const DefaultType$1 = {
    trapElement: 'element',
    autofocus: 'boolean'
  };
  const NAME$1 = 'focustrap';
  const DATA_KEY$1 = 'bs.focustrap';
  const EVENT_KEY$1 = `.${DATA_KEY$1}`;
  const EVENT_FOCUSIN = `focusin${EVENT_KEY$1}`;
  const EVENT_KEYDOWN_TAB = `keydown.tab${EVENT_KEY$1}`;
  const TAB_KEY = 'Tab';
  const TAB_NAV_FORWARD = 'forward';
  const TAB_NAV_BACKWARD = 'backward';

  class FocusTrap {
    constructor(config) {
      this._config = this._getConfig(config);
      this._isActive = false;
      this._lastTabNavDirection = null;
    }

    activate() {
      const {
        trapElement,
        autofocus
      } = this._config;

      if (this._isActive) {
        return;
      }

      if (autofocus) {
        trapElement.focus();
      }

      EventHandler__default.default.off(document, EVENT_KEY$1); // guard against infinite focus loop

      EventHandler__default.default.on(document, EVENT_FOCUSIN, event => this._handleFocusin(event));
      EventHandler__default.default.on(document, EVENT_KEYDOWN_TAB, event => this._handleKeydown(event));
      this._isActive = true;
    }

    deactivate() {
      if (!this._isActive) {
        return;
      }

      this._isActive = false;
      EventHandler__default.default.off(document, EVENT_KEY$1);
    } // Private


    _handleFocusin(event) {
      const {
        target
      } = event;
      const {
        trapElement
      } = this._config;

      if (target === document || target === trapElement || trapElement.contains(target)) {
        return;
      }

      const elements = SelectorEngine__default.default.focusableChildren(trapElement);

      if (elements.length === 0) {
        trapElement.focus();
      } else if (this._lastTabNavDirection === TAB_NAV_BACKWARD) {
        elements[elements.length - 1].focus();
      } else {
        elements[0].focus();
      }
    }

    _handleKeydown(event) {
      if (event.key !== TAB_KEY) {
        return;
      }

      this._lastTabNavDirection = event.shiftKey ? TAB_NAV_BACKWARD : TAB_NAV_FORWARD;
    }

    _getConfig(config) {
      config = { ...Default$1,
        ...(typeof config === 'object' ? config : {})
      };
      typeCheckConfig(NAME$1, config, DefaultType$1);
      return config;
    }

  }

  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v5.1.3): util/component-functions.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
   * --------------------------------------------------------------------------
   */

  const enableDismissTrigger = (component, method = 'hide') => {
    const clickEvent = `click.dismiss${component.EVENT_KEY}`;
    const name = component.NAME;
    EventHandler__default.default.on(document, clickEvent, `[data-bs-dismiss="${name}"]`, function (event) {
      if (['A', 'AREA'].includes(this.tagName)) {
        event.preventDefault();
      }

      if (isDisabled(this)) {
        return;
      }

      const target = getElementFromSelector(this) || this.closest(`.${name}`);
      const instance = component.getOrCreateInstance(target); // Method argument is left, for Alert and only, as it doesn't implement the 'hide' method

      instance[method]();
    });
  };

  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v5.1.3): modal.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
   * --------------------------------------------------------------------------
   */
  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  const NAME = 'modal';
  const DATA_KEY = 'bs.modal';
  const EVENT_KEY = `.${DATA_KEY}`;
  const DATA_API_KEY = '.data-api';
  const ESCAPE_KEY = 'Escape';
  const Default = {
    backdrop: true,
    keyboard: true,
    focus: true
  };
  const DefaultType = {
    backdrop: '(boolean|string)',
    keyboard: 'boolean',
    focus: 'boolean'
  };
  const EVENT_HIDE = `hide${EVENT_KEY}`;
  const EVENT_HIDE_PREVENTED = `hidePrevented${EVENT_KEY}`;
  const EVENT_HIDDEN = `hidden${EVENT_KEY}`;
  const EVENT_SHOW = `show${EVENT_KEY}`;
  const EVENT_SHOWN = `shown${EVENT_KEY}`;
  const EVENT_RESIZE = `resize${EVENT_KEY}`;
  const EVENT_CLICK_DISMISS = `click.dismiss${EVENT_KEY}`;
  const EVENT_KEYDOWN_DISMISS = `keydown.dismiss${EVENT_KEY}`;
  const EVENT_MOUSEUP_DISMISS = `mouseup.dismiss${EVENT_KEY}`;
  const EVENT_MOUSEDOWN_DISMISS = `mousedown.dismiss${EVENT_KEY}`;
  const EVENT_CLICK_DATA_API = `click${EVENT_KEY}${DATA_API_KEY}`;
  const CLASS_NAME_OPEN = 'modal-open';
  const CLASS_NAME_FADE = 'fade';
  const CLASS_NAME_SHOW = 'show';
  const CLASS_NAME_STATIC = 'modal-static';
  const OPEN_SELECTOR = '.modal.show';
  const SELECTOR_DIALOG = '.modal-dialog';
  const SELECTOR_MODAL_BODY = '.modal-body';
  const SELECTOR_DATA_TOGGLE = '[data-bs-toggle="modal"]';
  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */

  class Modal extends BaseComponent__default.default {
    constructor(element, config) {
      super(element);
      this._config = this._getConfig(config);
      this._dialog = SelectorEngine__default.default.findOne(SELECTOR_DIALOG, this._element);
      this._backdrop = this._initializeBackDrop();
      this._focustrap = this._initializeFocusTrap();
      this._isShown = false;
      this._ignoreBackdropClick = false;
      this._isTransitioning = false;
      this._scrollBar = new ScrollBarHelper();
    } // Getters


    static get Default() {
      return Default;
    }

    static get NAME() {
      return NAME;
    } // Public


    toggle(relatedTarget) {
      return this._isShown ? this.hide() : this.show(relatedTarget);
    }

    show(relatedTarget) {
      if (this._isShown || this._isTransitioning) {
        return;
      }

      const showEvent = EventHandler__default.default.trigger(this._element, EVENT_SHOW, {
        relatedTarget
      });

      if (showEvent.defaultPrevented) {
        return;
      }

      this._isShown = true;

      if (this._isAnimated()) {
        this._isTransitioning = true;
      }

      this._scrollBar.hide();

      document.body.classList.add(CLASS_NAME_OPEN);

      this._adjustDialog();

      this._setEscapeEvent();

      this._setResizeEvent();

      EventHandler__default.default.on(this._dialog, EVENT_MOUSEDOWN_DISMISS, () => {
        EventHandler__default.default.one(this._element, EVENT_MOUSEUP_DISMISS, event => {
          if (event.target === this._element) {
            this._ignoreBackdropClick = true;
          }
        });
      });

      this._showBackdrop(() => this._showElement(relatedTarget));
    }

    hide() {
      if (!this._isShown || this._isTransitioning) {
        return;
      }

      const hideEvent = EventHandler__default.default.trigger(this._element, EVENT_HIDE);

      if (hideEvent.defaultPrevented) {
        return;
      }

      this._isShown = false;

      const isAnimated = this._isAnimated();

      if (isAnimated) {
        this._isTransitioning = true;
      }

      this._setEscapeEvent();

      this._setResizeEvent();

      this._focustrap.deactivate();

      this._element.classList.remove(CLASS_NAME_SHOW);

      EventHandler__default.default.off(this._element, EVENT_CLICK_DISMISS);
      EventHandler__default.default.off(this._dialog, EVENT_MOUSEDOWN_DISMISS);

      this._queueCallback(() => this._hideModal(), this._element, isAnimated);
    }

    dispose() {
      [window, this._dialog].forEach(htmlElement => EventHandler__default.default.off(htmlElement, EVENT_KEY));

      this._backdrop.dispose();

      this._focustrap.deactivate();

      super.dispose();
    }

    handleUpdate() {
      this._adjustDialog();
    } // Private


    _initializeBackDrop() {
      return new Backdrop({
        isVisible: Boolean(this._config.backdrop),
        // 'static' option will be translated to true, and booleans will keep their value
        isAnimated: this._isAnimated()
      });
    }

    _initializeFocusTrap() {
      return new FocusTrap({
        trapElement: this._element
      });
    }

    _getConfig(config) {
      config = { ...Default,
        ...Manipulator__default.default.getDataAttributes(this._element),
        ...(typeof config === 'object' ? config : {})
      };
      typeCheckConfig(NAME, config, DefaultType);
      return config;
    }

    _showElement(relatedTarget) {
      const isAnimated = this._isAnimated();

      const modalBody = SelectorEngine__default.default.findOne(SELECTOR_MODAL_BODY, this._dialog);

      if (!this._element.parentNode || this._element.parentNode.nodeType !== Node.ELEMENT_NODE) {
        // Don't move modal's DOM position
        document.body.append(this._element);
      }

      this._element.style.display = 'block';

      this._element.removeAttribute('aria-hidden');

      this._element.setAttribute('aria-modal', true);

      this._element.setAttribute('role', 'dialog');

      this._element.scrollTop = 0;

      if (modalBody) {
        modalBody.scrollTop = 0;
      }

      if (isAnimated) {
        reflow(this._element);
      }

      this._element.classList.add(CLASS_NAME_SHOW);

      const transitionComplete = () => {
        if (this._config.focus) {
          this._focustrap.activate();
        }

        this._isTransitioning = false;
        EventHandler__default.default.trigger(this._element, EVENT_SHOWN, {
          relatedTarget
        });
      };

      this._queueCallback(transitionComplete, this._dialog, isAnimated);
    }

    _setEscapeEvent() {
      if (this._isShown) {
        EventHandler__default.default.on(this._element, EVENT_KEYDOWN_DISMISS, event => {
          if (this._config.keyboard && event.key === ESCAPE_KEY) {
            event.preventDefault();
            this.hide();
          } else if (!this._config.keyboard && event.key === ESCAPE_KEY) {
            this._triggerBackdropTransition();
          }
        });
      } else {
        EventHandler__default.default.off(this._element, EVENT_KEYDOWN_DISMISS);
      }
    }

    _setResizeEvent() {
      if (this._isShown) {
        EventHandler__default.default.on(window, EVENT_RESIZE, () => this._adjustDialog());
      } else {
        EventHandler__default.default.off(window, EVENT_RESIZE);
      }
    }

    _hideModal() {
      this._element.style.display = 'none';

      this._element.setAttribute('aria-hidden', true);

      this._element.removeAttribute('aria-modal');

      this._element.removeAttribute('role');

      this._isTransitioning = false;

      this._backdrop.hide(() => {
        document.body.classList.remove(CLASS_NAME_OPEN);

        this._resetAdjustments();

        this._scrollBar.reset();

        EventHandler__default.default.trigger(this._element, EVENT_HIDDEN);
      });
    }

    _showBackdrop(callback) {
      EventHandler__default.default.on(this._element, EVENT_CLICK_DISMISS, event => {
        if (this._ignoreBackdropClick) {
          this._ignoreBackdropClick = false;
          return;
        }

        if (event.target !== event.currentTarget) {
          return;
        }

        if (this._config.backdrop === true) {
          this.hide();
        } else if (this._config.backdrop === 'static') {
          this._triggerBackdropTransition();
        }
      });

      this._backdrop.show(callback);
    }

    _isAnimated() {
      return this._element.classList.contains(CLASS_NAME_FADE);
    }

    _triggerBackdropTransition() {
      const hideEvent = EventHandler__default.default.trigger(this._element, EVENT_HIDE_PREVENTED);

      if (hideEvent.defaultPrevented) {
        return;
      }

      const {
        classList,
        scrollHeight,
        style
      } = this._element;
      const isModalOverflowing = scrollHeight > document.documentElement.clientHeight; // return if the following background transition hasn't yet completed

      if (!isModalOverflowing && style.overflowY === 'hidden' || classList.contains(CLASS_NAME_STATIC)) {
        return;
      }

      if (!isModalOverflowing) {
        style.overflowY = 'hidden';
      }

      classList.add(CLASS_NAME_STATIC);

      this._queueCallback(() => {
        classList.remove(CLASS_NAME_STATIC);

        if (!isModalOverflowing) {
          this._queueCallback(() => {
            style.overflowY = '';
          }, this._dialog);
        }
      }, this._dialog);

      this._element.focus();
    } // ----------------------------------------------------------------------
    // the following methods are used to handle overflowing modals
    // ----------------------------------------------------------------------


    _adjustDialog() {
      const isModalOverflowing = this._element.scrollHeight > document.documentElement.clientHeight;

      const scrollbarWidth = this._scrollBar.getWidth();

      const isBodyOverflowing = scrollbarWidth > 0;

      if (!isBodyOverflowing && isModalOverflowing && !isRTL() || isBodyOverflowing && !isModalOverflowing && isRTL()) {
        this._element.style.paddingLeft = `${scrollbarWidth}px`;
      }

      if (isBodyOverflowing && !isModalOverflowing && !isRTL() || !isBodyOverflowing && isModalOverflowing && isRTL()) {
        this._element.style.paddingRight = `${scrollbarWidth}px`;
      }
    }

    _resetAdjustments() {
      this._element.style.paddingLeft = '';
      this._element.style.paddingRight = '';
    } // Static


    static jQueryInterface(config, relatedTarget) {
      return this.each(function () {
        const data = Modal.getOrCreateInstance(this, config);

        if (typeof config !== 'string') {
          return;
        }

        if (typeof data[config] === 'undefined') {
          throw new TypeError(`No method named "${config}"`);
        }

        data[config](relatedTarget);
      });
    }

  }
  /**
   * ------------------------------------------------------------------------
   * Data Api implementation
   * ------------------------------------------------------------------------
   */


  EventHandler__default.default.on(document, EVENT_CLICK_DATA_API, SELECTOR_DATA_TOGGLE, function (event) {
    const target = getElementFromSelector(this);

    if (['A', 'AREA'].includes(this.tagName)) {
      event.preventDefault();
    }

    EventHandler__default.default.one(target, EVENT_SHOW, showEvent => {
      if (showEvent.defaultPrevented) {
        // only register focus restorer if modal will actually get shown
        return;
      }

      EventHandler__default.default.one(target, EVENT_HIDDEN, () => {
        if (isVisible(this)) {
          this.focus();
        }
      });
    }); // avoid conflict when clicking moddal toggler while another one is open

    const allReadyOpen = SelectorEngine__default.default.findOne(OPEN_SELECTOR);

    if (allReadyOpen) {
      Modal.getInstance(allReadyOpen).hide();
    }

    const data = Modal.getOrCreateInstance(target);
    data.toggle(this);
  });
  enableDismissTrigger(Modal);
  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   * add .Modal to jQuery only if jQuery is present
   */

  defineJQueryPlugin(Modal);

  return Modal;

}));

}(modal));

class EventHarness {
    /**
     *
     * @type {*[]}
     */
    #eventListeners = [];

    static STOP_PROPAGATION = 'STOP_PROPAGATION';

    /**
     *
     * @param {string} eventName
     * @param {Object} obj
     * @param {Function} method
     * @param {*=} constructionParam
     * @deprecated use addListener instead
     * @return {number} handle
     */
    bindListener (eventName, obj, method, constructionParam) {
        this.#eventListeners = this.#eventListeners || [];

        const handlerFunction =
            function(context, eventName, invocationParam) {
                return method.call(obj, context, eventName, invocationParam, constructionParam);
            };

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
     * @param {Function} handler
     * @param {*=} constructionParam
     * @return {number} handle
     */
    addListener (eventName, handler, constructionParam = {}) {
        this.#eventListeners = this.#eventListeners || [];

        const handlerFunction =
            function(context, eventName, invocationParam = {}) {
                return handler({context, eventName, ...invocationParam, ...constructionParam});
            };

        if (this.#eventListeners[eventName]) {
            return (this.#eventListeners[eventName].push(handlerFunction)) - 1;
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

var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

function commonjsRequire (path) {
	throw new Error('Could not dynamically require "' + path + '". Please configure the dynamicRequireTargets or/and ignoreDynamicRequires option of @rollup/plugin-commonjs appropriately for this require call to work.');
}

var localforage$1 = {exports: {}};

/*!
    localForage -- Offline Storage, Improved
    Version 1.10.0
    https://localforage.github.io/localForage
    (c) 2013-2017 Mozilla, Apache License 2.0
*/

(function (module, exports) {
(function(f){{module.exports=f();}})(function(){return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof commonjsRequire=="function"&&commonjsRequire;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw (f.code="MODULE_NOT_FOUND", f)}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r);}return n[o].exports}var i=typeof commonjsRequire=="function"&&commonjsRequire;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(_dereq_,module,exports){
(function (global){
var Mutation = global.MutationObserver || global.WebKitMutationObserver;

var scheduleDrain;

{
  if (Mutation) {
    var called = 0;
    var observer = new Mutation(nextTick);
    var element = global.document.createTextNode('');
    observer.observe(element, {
      characterData: true
    });
    scheduleDrain = function () {
      element.data = (called = ++called % 2);
    };
  } else if (!global.setImmediate && typeof global.MessageChannel !== 'undefined') {
    var channel = new global.MessageChannel();
    channel.port1.onmessage = nextTick;
    scheduleDrain = function () {
      channel.port2.postMessage(0);
    };
  } else if ('document' in global && 'onreadystatechange' in global.document.createElement('script')) {
    scheduleDrain = function () {

      // Create a <script> element; its readystatechange event will be fired asynchronously once it is inserted
      // into the document. Do so, thus queuing up the task. Remember to clean up once it's been called.
      var scriptEl = global.document.createElement('script');
      scriptEl.onreadystatechange = function () {
        nextTick();

        scriptEl.onreadystatechange = null;
        scriptEl.parentNode.removeChild(scriptEl);
        scriptEl = null;
      };
      global.document.documentElement.appendChild(scriptEl);
    };
  } else {
    scheduleDrain = function () {
      setTimeout(nextTick, 0);
    };
  }
}

var draining;
var queue = [];
//named nextTick for less confusing stack traces
function nextTick() {
  draining = true;
  var i, oldQueue;
  var len = queue.length;
  while (len) {
    oldQueue = queue;
    queue = [];
    i = -1;
    while (++i < len) {
      oldQueue[i]();
    }
    len = queue.length;
  }
  draining = false;
}

module.exports = immediate;
function immediate(task) {
  if (queue.push(task) === 1 && !draining) {
    scheduleDrain();
  }
}

}).call(this,typeof commonjsGlobal !== "undefined" ? commonjsGlobal : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {});
},{}],2:[function(_dereq_,module,exports){
var immediate = _dereq_(1);

/* istanbul ignore next */
function INTERNAL() {}

var handlers = {};

var REJECTED = ['REJECTED'];
var FULFILLED = ['FULFILLED'];
var PENDING = ['PENDING'];

module.exports = Promise;

function Promise(resolver) {
  if (typeof resolver !== 'function') {
    throw new TypeError('resolver must be a function');
  }
  this.state = PENDING;
  this.queue = [];
  this.outcome = void 0;
  if (resolver !== INTERNAL) {
    safelyResolveThenable(this, resolver);
  }
}

Promise.prototype["catch"] = function (onRejected) {
  return this.then(null, onRejected);
};
Promise.prototype.then = function (onFulfilled, onRejected) {
  if (typeof onFulfilled !== 'function' && this.state === FULFILLED ||
    typeof onRejected !== 'function' && this.state === REJECTED) {
    return this;
  }
  var promise = new this.constructor(INTERNAL);
  if (this.state !== PENDING) {
    var resolver = this.state === FULFILLED ? onFulfilled : onRejected;
    unwrap(promise, resolver, this.outcome);
  } else {
    this.queue.push(new QueueItem(promise, onFulfilled, onRejected));
  }

  return promise;
};
function QueueItem(promise, onFulfilled, onRejected) {
  this.promise = promise;
  if (typeof onFulfilled === 'function') {
    this.onFulfilled = onFulfilled;
    this.callFulfilled = this.otherCallFulfilled;
  }
  if (typeof onRejected === 'function') {
    this.onRejected = onRejected;
    this.callRejected = this.otherCallRejected;
  }
}
QueueItem.prototype.callFulfilled = function (value) {
  handlers.resolve(this.promise, value);
};
QueueItem.prototype.otherCallFulfilled = function (value) {
  unwrap(this.promise, this.onFulfilled, value);
};
QueueItem.prototype.callRejected = function (value) {
  handlers.reject(this.promise, value);
};
QueueItem.prototype.otherCallRejected = function (value) {
  unwrap(this.promise, this.onRejected, value);
};

function unwrap(promise, func, value) {
  immediate(function () {
    var returnValue;
    try {
      returnValue = func(value);
    } catch (e) {
      return handlers.reject(promise, e);
    }
    if (returnValue === promise) {
      handlers.reject(promise, new TypeError('Cannot resolve promise with itself'));
    } else {
      handlers.resolve(promise, returnValue);
    }
  });
}

handlers.resolve = function (self, value) {
  var result = tryCatch(getThen, value);
  if (result.status === 'error') {
    return handlers.reject(self, result.value);
  }
  var thenable = result.value;

  if (thenable) {
    safelyResolveThenable(self, thenable);
  } else {
    self.state = FULFILLED;
    self.outcome = value;
    var i = -1;
    var len = self.queue.length;
    while (++i < len) {
      self.queue[i].callFulfilled(value);
    }
  }
  return self;
};
handlers.reject = function (self, error) {
  self.state = REJECTED;
  self.outcome = error;
  var i = -1;
  var len = self.queue.length;
  while (++i < len) {
    self.queue[i].callRejected(error);
  }
  return self;
};

function getThen(obj) {
  // Make sure we only access the accessor once as required by the spec
  var then = obj && obj.then;
  if (obj && (typeof obj === 'object' || typeof obj === 'function') && typeof then === 'function') {
    return function appyThen() {
      then.apply(obj, arguments);
    };
  }
}

function safelyResolveThenable(self, thenable) {
  // Either fulfill, reject or reject with error
  var called = false;
  function onError(value) {
    if (called) {
      return;
    }
    called = true;
    handlers.reject(self, value);
  }

  function onSuccess(value) {
    if (called) {
      return;
    }
    called = true;
    handlers.resolve(self, value);
  }

  function tryToUnwrap() {
    thenable(onSuccess, onError);
  }

  var result = tryCatch(tryToUnwrap);
  if (result.status === 'error') {
    onError(result.value);
  }
}

function tryCatch(func, value) {
  var out = {};
  try {
    out.value = func(value);
    out.status = 'success';
  } catch (e) {
    out.status = 'error';
    out.value = e;
  }
  return out;
}

Promise.resolve = resolve;
function resolve(value) {
  if (value instanceof this) {
    return value;
  }
  return handlers.resolve(new this(INTERNAL), value);
}

Promise.reject = reject;
function reject(reason) {
  var promise = new this(INTERNAL);
  return handlers.reject(promise, reason);
}

Promise.all = all;
function all(iterable) {
  var self = this;
  if (Object.prototype.toString.call(iterable) !== '[object Array]') {
    return this.reject(new TypeError('must be an array'));
  }

  var len = iterable.length;
  var called = false;
  if (!len) {
    return this.resolve([]);
  }

  var values = new Array(len);
  var resolved = 0;
  var i = -1;
  var promise = new this(INTERNAL);

  while (++i < len) {
    allResolver(iterable[i], i);
  }
  return promise;
  function allResolver(value, i) {
    self.resolve(value).then(resolveFromAll, function (error) {
      if (!called) {
        called = true;
        handlers.reject(promise, error);
      }
    });
    function resolveFromAll(outValue) {
      values[i] = outValue;
      if (++resolved === len && !called) {
        called = true;
        handlers.resolve(promise, values);
      }
    }
  }
}

Promise.race = race;
function race(iterable) {
  var self = this;
  if (Object.prototype.toString.call(iterable) !== '[object Array]') {
    return this.reject(new TypeError('must be an array'));
  }

  var len = iterable.length;
  var called = false;
  if (!len) {
    return this.resolve([]);
  }

  var i = -1;
  var promise = new this(INTERNAL);

  while (++i < len) {
    resolver(iterable[i]);
  }
  return promise;
  function resolver(value) {
    self.resolve(value).then(function (response) {
      if (!called) {
        called = true;
        handlers.resolve(promise, response);
      }
    }, function (error) {
      if (!called) {
        called = true;
        handlers.reject(promise, error);
      }
    });
  }
}

},{"1":1}],3:[function(_dereq_,module,exports){
(function (global){
if (typeof global.Promise !== 'function') {
  global.Promise = _dereq_(2);
}

}).call(this,typeof commonjsGlobal !== "undefined" ? commonjsGlobal : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {});
},{"2":2}],4:[function(_dereq_,module,exports){

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function getIDB() {
    /* global indexedDB,webkitIndexedDB,mozIndexedDB,OIndexedDB,msIndexedDB */
    try {
        if (typeof indexedDB !== 'undefined') {
            return indexedDB;
        }
        if (typeof webkitIndexedDB !== 'undefined') {
            return webkitIndexedDB;
        }
        if (typeof mozIndexedDB !== 'undefined') {
            return mozIndexedDB;
        }
        if (typeof OIndexedDB !== 'undefined') {
            return OIndexedDB;
        }
        if (typeof msIndexedDB !== 'undefined') {
            return msIndexedDB;
        }
    } catch (e) {
        return;
    }
}

var idb = getIDB();

function isIndexedDBValid() {
    try {
        // Initialize IndexedDB; fall back to vendor-prefixed versions
        // if needed.
        if (!idb || !idb.open) {
            return false;
        }
        // We mimic PouchDB here;
        //
        // We test for openDatabase because IE Mobile identifies itself
        // as Safari. Oh the lulz...
        var isSafari = typeof openDatabase !== 'undefined' && /(Safari|iPhone|iPad|iPod)/.test(navigator.userAgent) && !/Chrome/.test(navigator.userAgent) && !/BlackBerry/.test(navigator.platform);

        var hasFetch = typeof fetch === 'function' && fetch.toString().indexOf('[native code') !== -1;

        // Safari <10.1 does not meet our requirements for IDB support
        // (see: https://github.com/pouchdb/pouchdb/issues/5572).
        // Safari 10.1 shipped with fetch, we can use that to detect it.
        // Note: this creates issues with `window.fetch` polyfills and
        // overrides; see:
        // https://github.com/localForage/localForage/issues/856
        return (!isSafari || hasFetch) && typeof indexedDB !== 'undefined' &&
        // some outdated implementations of IDB that appear on Samsung
        // and HTC Android devices <4.4 are missing IDBKeyRange
        // See: https://github.com/mozilla/localForage/issues/128
        // See: https://github.com/mozilla/localForage/issues/272
        typeof IDBKeyRange !== 'undefined';
    } catch (e) {
        return false;
    }
}

// Abstracts constructing a Blob object, so it also works in older
// browsers that don't support the native Blob constructor. (i.e.
// old QtWebKit versions, at least).
// Abstracts constructing a Blob object, so it also works in older
// browsers that don't support the native Blob constructor. (i.e.
// old QtWebKit versions, at least).
function createBlob(parts, properties) {
    /* global BlobBuilder,MSBlobBuilder,MozBlobBuilder,WebKitBlobBuilder */
    parts = parts || [];
    properties = properties || {};
    try {
        return new Blob(parts, properties);
    } catch (e) {
        if (e.name !== 'TypeError') {
            throw e;
        }
        var Builder = typeof BlobBuilder !== 'undefined' ? BlobBuilder : typeof MSBlobBuilder !== 'undefined' ? MSBlobBuilder : typeof MozBlobBuilder !== 'undefined' ? MozBlobBuilder : WebKitBlobBuilder;
        var builder = new Builder();
        for (var i = 0; i < parts.length; i += 1) {
            builder.append(parts[i]);
        }
        return builder.getBlob(properties.type);
    }
}

// This is CommonJS because lie is an external dependency, so Rollup
// can just ignore it.
if (typeof Promise === 'undefined') {
    // In the "nopromises" build this will just throw if you don't have
    // a global promise object, but it would throw anyway later.
    _dereq_(3);
}
var Promise$1 = Promise;

function executeCallback(promise, callback) {
    if (callback) {
        promise.then(function (result) {
            callback(null, result);
        }, function (error) {
            callback(error);
        });
    }
}

function executeTwoCallbacks(promise, callback, errorCallback) {
    if (typeof callback === 'function') {
        promise.then(callback);
    }

    if (typeof errorCallback === 'function') {
        promise["catch"](errorCallback);
    }
}

function normalizeKey(key) {
    // Cast the key to a string, as that's all we can set as a key.
    if (typeof key !== 'string') {
        console.warn(key + ' used as a key, but it is not a string.');
        key = String(key);
    }

    return key;
}

function getCallback() {
    if (arguments.length && typeof arguments[arguments.length - 1] === 'function') {
        return arguments[arguments.length - 1];
    }
}

// Some code originally from async_storage.js in
// [Gaia](https://github.com/mozilla-b2g/gaia).

var DETECT_BLOB_SUPPORT_STORE = 'local-forage-detect-blob-support';
var supportsBlobs = void 0;
var dbContexts = {};
var toString = Object.prototype.toString;

// Transaction Modes
var READ_ONLY = 'readonly';
var READ_WRITE = 'readwrite';

// Transform a binary string to an array buffer, because otherwise
// weird stuff happens when you try to work with the binary string directly.
// It is known.
// From http://stackoverflow.com/questions/14967647/ (continues on next line)
// encode-decode-image-with-base64-breaks-image (2013-04-21)
function _binStringToArrayBuffer(bin) {
    var length = bin.length;
    var buf = new ArrayBuffer(length);
    var arr = new Uint8Array(buf);
    for (var i = 0; i < length; i++) {
        arr[i] = bin.charCodeAt(i);
    }
    return buf;
}

//
// Blobs are not supported in all versions of IndexedDB, notably
// Chrome <37 and Android <5. In those versions, storing a blob will throw.
//
// Various other blob bugs exist in Chrome v37-42 (inclusive).
// Detecting them is expensive and confusing to users, and Chrome 37-42
// is at very low usage worldwide, so we do a hacky userAgent check instead.
//
// content-type bug: https://code.google.com/p/chromium/issues/detail?id=408120
// 404 bug: https://code.google.com/p/chromium/issues/detail?id=447916
// FileReader bug: https://code.google.com/p/chromium/issues/detail?id=447836
//
// Code borrowed from PouchDB. See:
// https://github.com/pouchdb/pouchdb/blob/master/packages/node_modules/pouchdb-adapter-idb/src/blobSupport.js
//
function _checkBlobSupportWithoutCaching(idb) {
    return new Promise$1(function (resolve) {
        var txn = idb.transaction(DETECT_BLOB_SUPPORT_STORE, READ_WRITE);
        var blob = createBlob(['']);
        txn.objectStore(DETECT_BLOB_SUPPORT_STORE).put(blob, 'key');

        txn.onabort = function (e) {
            // If the transaction aborts now its due to not being able to
            // write to the database, likely due to the disk being full
            e.preventDefault();
            e.stopPropagation();
            resolve(false);
        };

        txn.oncomplete = function () {
            var matchedChrome = navigator.userAgent.match(/Chrome\/(\d+)/);
            var matchedEdge = navigator.userAgent.match(/Edge\//);
            // MS Edge pretends to be Chrome 42:
            // https://msdn.microsoft.com/en-us/library/hh869301%28v=vs.85%29.aspx
            resolve(matchedEdge || !matchedChrome || parseInt(matchedChrome[1], 10) >= 43);
        };
    })["catch"](function () {
        return false; // error, so assume unsupported
    });
}

function _checkBlobSupport(idb) {
    if (typeof supportsBlobs === 'boolean') {
        return Promise$1.resolve(supportsBlobs);
    }
    return _checkBlobSupportWithoutCaching(idb).then(function (value) {
        supportsBlobs = value;
        return supportsBlobs;
    });
}

function _deferReadiness(dbInfo) {
    var dbContext = dbContexts[dbInfo.name];

    // Create a deferred object representing the current database operation.
    var deferredOperation = {};

    deferredOperation.promise = new Promise$1(function (resolve, reject) {
        deferredOperation.resolve = resolve;
        deferredOperation.reject = reject;
    });

    // Enqueue the deferred operation.
    dbContext.deferredOperations.push(deferredOperation);

    // Chain its promise to the database readiness.
    if (!dbContext.dbReady) {
        dbContext.dbReady = deferredOperation.promise;
    } else {
        dbContext.dbReady = dbContext.dbReady.then(function () {
            return deferredOperation.promise;
        });
    }
}

function _advanceReadiness(dbInfo) {
    var dbContext = dbContexts[dbInfo.name];

    // Dequeue a deferred operation.
    var deferredOperation = dbContext.deferredOperations.pop();

    // Resolve its promise (which is part of the database readiness
    // chain of promises).
    if (deferredOperation) {
        deferredOperation.resolve();
        return deferredOperation.promise;
    }
}

function _rejectReadiness(dbInfo, err) {
    var dbContext = dbContexts[dbInfo.name];

    // Dequeue a deferred operation.
    var deferredOperation = dbContext.deferredOperations.pop();

    // Reject its promise (which is part of the database readiness
    // chain of promises).
    if (deferredOperation) {
        deferredOperation.reject(err);
        return deferredOperation.promise;
    }
}

function _getConnection(dbInfo, upgradeNeeded) {
    return new Promise$1(function (resolve, reject) {
        dbContexts[dbInfo.name] = dbContexts[dbInfo.name] || createDbContext();

        if (dbInfo.db) {
            if (upgradeNeeded) {
                _deferReadiness(dbInfo);
                dbInfo.db.close();
            } else {
                return resolve(dbInfo.db);
            }
        }

        var dbArgs = [dbInfo.name];

        if (upgradeNeeded) {
            dbArgs.push(dbInfo.version);
        }

        var openreq = idb.open.apply(idb, dbArgs);

        if (upgradeNeeded) {
            openreq.onupgradeneeded = function (e) {
                var db = openreq.result;
                try {
                    db.createObjectStore(dbInfo.storeName);
                    if (e.oldVersion <= 1) {
                        // Added when support for blob shims was added
                        db.createObjectStore(DETECT_BLOB_SUPPORT_STORE);
                    }
                } catch (ex) {
                    if (ex.name === 'ConstraintError') {
                        console.warn('The database "' + dbInfo.name + '"' + ' has been upgraded from version ' + e.oldVersion + ' to version ' + e.newVersion + ', but the storage "' + dbInfo.storeName + '" already exists.');
                    } else {
                        throw ex;
                    }
                }
            };
        }

        openreq.onerror = function (e) {
            e.preventDefault();
            reject(openreq.error);
        };

        openreq.onsuccess = function () {
            var db = openreq.result;
            db.onversionchange = function (e) {
                // Triggered when the database is modified (e.g. adding an objectStore) or
                // deleted (even when initiated by other sessions in different tabs).
                // Closing the connection here prevents those operations from being blocked.
                // If the database is accessed again later by this instance, the connection
                // will be reopened or the database recreated as needed.
                e.target.close();
            };
            resolve(db);
            _advanceReadiness(dbInfo);
        };
    });
}

function _getOriginalConnection(dbInfo) {
    return _getConnection(dbInfo, false);
}

function _getUpgradedConnection(dbInfo) {
    return _getConnection(dbInfo, true);
}

function _isUpgradeNeeded(dbInfo, defaultVersion) {
    if (!dbInfo.db) {
        return true;
    }

    var isNewStore = !dbInfo.db.objectStoreNames.contains(dbInfo.storeName);
    var isDowngrade = dbInfo.version < dbInfo.db.version;
    var isUpgrade = dbInfo.version > dbInfo.db.version;

    if (isDowngrade) {
        // If the version is not the default one
        // then warn for impossible downgrade.
        if (dbInfo.version !== defaultVersion) {
            console.warn('The database "' + dbInfo.name + '"' + " can't be downgraded from version " + dbInfo.db.version + ' to version ' + dbInfo.version + '.');
        }
        // Align the versions to prevent errors.
        dbInfo.version = dbInfo.db.version;
    }

    if (isUpgrade || isNewStore) {
        // If the store is new then increment the version (if needed).
        // This will trigger an "upgradeneeded" event which is required
        // for creating a store.
        if (isNewStore) {
            var incVersion = dbInfo.db.version + 1;
            if (incVersion > dbInfo.version) {
                dbInfo.version = incVersion;
            }
        }

        return true;
    }

    return false;
}

// encode a blob for indexeddb engines that don't support blobs
function _encodeBlob(blob) {
    return new Promise$1(function (resolve, reject) {
        var reader = new FileReader();
        reader.onerror = reject;
        reader.onloadend = function (e) {
            var base64 = btoa(e.target.result || '');
            resolve({
                __local_forage_encoded_blob: true,
                data: base64,
                type: blob.type
            });
        };
        reader.readAsBinaryString(blob);
    });
}

// decode an encoded blob
function _decodeBlob(encodedBlob) {
    var arrayBuff = _binStringToArrayBuffer(atob(encodedBlob.data));
    return createBlob([arrayBuff], { type: encodedBlob.type });
}

// is this one of our fancy encoded blobs?
function _isEncodedBlob(value) {
    return value && value.__local_forage_encoded_blob;
}

// Specialize the default `ready()` function by making it dependent
// on the current database operations. Thus, the driver will be actually
// ready when it's been initialized (default) *and* there are no pending
// operations on the database (initiated by some other instances).
function _fullyReady(callback) {
    var self = this;

    var promise = self._initReady().then(function () {
        var dbContext = dbContexts[self._dbInfo.name];

        if (dbContext && dbContext.dbReady) {
            return dbContext.dbReady;
        }
    });

    executeTwoCallbacks(promise, callback, callback);
    return promise;
}

// Try to establish a new db connection to replace the
// current one which is broken (i.e. experiencing
// InvalidStateError while creating a transaction).
function _tryReconnect(dbInfo) {
    _deferReadiness(dbInfo);

    var dbContext = dbContexts[dbInfo.name];
    var forages = dbContext.forages;

    for (var i = 0; i < forages.length; i++) {
        var forage = forages[i];
        if (forage._dbInfo.db) {
            forage._dbInfo.db.close();
            forage._dbInfo.db = null;
        }
    }
    dbInfo.db = null;

    return _getOriginalConnection(dbInfo).then(function (db) {
        dbInfo.db = db;
        if (_isUpgradeNeeded(dbInfo)) {
            // Reopen the database for upgrading.
            return _getUpgradedConnection(dbInfo);
        }
        return db;
    }).then(function (db) {
        // store the latest db reference
        // in case the db was upgraded
        dbInfo.db = dbContext.db = db;
        for (var i = 0; i < forages.length; i++) {
            forages[i]._dbInfo.db = db;
        }
    })["catch"](function (err) {
        _rejectReadiness(dbInfo, err);
        throw err;
    });
}

// FF doesn't like Promises (micro-tasks) and IDDB store operations,
// so we have to do it with callbacks
function createTransaction(dbInfo, mode, callback, retries) {
    if (retries === undefined) {
        retries = 1;
    }

    try {
        var tx = dbInfo.db.transaction(dbInfo.storeName, mode);
        callback(null, tx);
    } catch (err) {
        if (retries > 0 && (!dbInfo.db || err.name === 'InvalidStateError' || err.name === 'NotFoundError')) {
            return Promise$1.resolve().then(function () {
                if (!dbInfo.db || err.name === 'NotFoundError' && !dbInfo.db.objectStoreNames.contains(dbInfo.storeName) && dbInfo.version <= dbInfo.db.version) {
                    // increase the db version, to create the new ObjectStore
                    if (dbInfo.db) {
                        dbInfo.version = dbInfo.db.version + 1;
                    }
                    // Reopen the database for upgrading.
                    return _getUpgradedConnection(dbInfo);
                }
            }).then(function () {
                return _tryReconnect(dbInfo).then(function () {
                    createTransaction(dbInfo, mode, callback, retries - 1);
                });
            })["catch"](callback);
        }

        callback(err);
    }
}

function createDbContext() {
    return {
        // Running localForages sharing a database.
        forages: [],
        // Shared database.
        db: null,
        // Database readiness (promise).
        dbReady: null,
        // Deferred operations on the database.
        deferredOperations: []
    };
}

// Open the IndexedDB database (automatically creates one if one didn't
// previously exist), using any options set in the config.
function _initStorage(options) {
    var self = this;
    var dbInfo = {
        db: null
    };

    if (options) {
        for (var i in options) {
            dbInfo[i] = options[i];
        }
    }

    // Get the current context of the database;
    var dbContext = dbContexts[dbInfo.name];

    // ...or create a new context.
    if (!dbContext) {
        dbContext = createDbContext();
        // Register the new context in the global container.
        dbContexts[dbInfo.name] = dbContext;
    }

    // Register itself as a running localForage in the current context.
    dbContext.forages.push(self);

    // Replace the default `ready()` function with the specialized one.
    if (!self._initReady) {
        self._initReady = self.ready;
        self.ready = _fullyReady;
    }

    // Create an array of initialization states of the related localForages.
    var initPromises = [];

    function ignoreErrors() {
        // Don't handle errors here,
        // just makes sure related localForages aren't pending.
        return Promise$1.resolve();
    }

    for (var j = 0; j < dbContext.forages.length; j++) {
        var forage = dbContext.forages[j];
        if (forage !== self) {
            // Don't wait for itself...
            initPromises.push(forage._initReady()["catch"](ignoreErrors));
        }
    }

    // Take a snapshot of the related localForages.
    var forages = dbContext.forages.slice(0);

    // Initialize the connection process only when
    // all the related localForages aren't pending.
    return Promise$1.all(initPromises).then(function () {
        dbInfo.db = dbContext.db;
        // Get the connection or open a new one without upgrade.
        return _getOriginalConnection(dbInfo);
    }).then(function (db) {
        dbInfo.db = db;
        if (_isUpgradeNeeded(dbInfo, self._defaultConfig.version)) {
            // Reopen the database for upgrading.
            return _getUpgradedConnection(dbInfo);
        }
        return db;
    }).then(function (db) {
        dbInfo.db = dbContext.db = db;
        self._dbInfo = dbInfo;
        // Share the final connection amongst related localForages.
        for (var k = 0; k < forages.length; k++) {
            var forage = forages[k];
            if (forage !== self) {
                // Self is already up-to-date.
                forage._dbInfo.db = dbInfo.db;
                forage._dbInfo.version = dbInfo.version;
            }
        }
    });
}

function getItem(key, callback) {
    var self = this;

    key = normalizeKey(key);

    var promise = new Promise$1(function (resolve, reject) {
        self.ready().then(function () {
            createTransaction(self._dbInfo, READ_ONLY, function (err, transaction) {
                if (err) {
                    return reject(err);
                }

                try {
                    var store = transaction.objectStore(self._dbInfo.storeName);
                    var req = store.get(key);

                    req.onsuccess = function () {
                        var value = req.result;
                        if (value === undefined) {
                            value = null;
                        }
                        if (_isEncodedBlob(value)) {
                            value = _decodeBlob(value);
                        }
                        resolve(value);
                    };

                    req.onerror = function () {
                        reject(req.error);
                    };
                } catch (e) {
                    reject(e);
                }
            });
        })["catch"](reject);
    });

    executeCallback(promise, callback);
    return promise;
}

// Iterate over all items stored in database.
function iterate(iterator, callback) {
    var self = this;

    var promise = new Promise$1(function (resolve, reject) {
        self.ready().then(function () {
            createTransaction(self._dbInfo, READ_ONLY, function (err, transaction) {
                if (err) {
                    return reject(err);
                }

                try {
                    var store = transaction.objectStore(self._dbInfo.storeName);
                    var req = store.openCursor();
                    var iterationNumber = 1;

                    req.onsuccess = function () {
                        var cursor = req.result;

                        if (cursor) {
                            var value = cursor.value;
                            if (_isEncodedBlob(value)) {
                                value = _decodeBlob(value);
                            }
                            var result = iterator(value, cursor.key, iterationNumber++);

                            // when the iterator callback returns any
                            // (non-`undefined`) value, then we stop
                            // the iteration immediately
                            if (result !== void 0) {
                                resolve(result);
                            } else {
                                cursor["continue"]();
                            }
                        } else {
                            resolve();
                        }
                    };

                    req.onerror = function () {
                        reject(req.error);
                    };
                } catch (e) {
                    reject(e);
                }
            });
        })["catch"](reject);
    });

    executeCallback(promise, callback);

    return promise;
}

function setItem(key, value, callback) {
    var self = this;

    key = normalizeKey(key);

    var promise = new Promise$1(function (resolve, reject) {
        var dbInfo;
        self.ready().then(function () {
            dbInfo = self._dbInfo;
            if (toString.call(value) === '[object Blob]') {
                return _checkBlobSupport(dbInfo.db).then(function (blobSupport) {
                    if (blobSupport) {
                        return value;
                    }
                    return _encodeBlob(value);
                });
            }
            return value;
        }).then(function (value) {
            createTransaction(self._dbInfo, READ_WRITE, function (err, transaction) {
                if (err) {
                    return reject(err);
                }

                try {
                    var store = transaction.objectStore(self._dbInfo.storeName);

                    // The reason we don't _save_ null is because IE 10 does
                    // not support saving the `null` type in IndexedDB. How
                    // ironic, given the bug below!
                    // See: https://github.com/mozilla/localForage/issues/161
                    if (value === null) {
                        value = undefined;
                    }

                    var req = store.put(value, key);

                    transaction.oncomplete = function () {
                        // Cast to undefined so the value passed to
                        // callback/promise is the same as what one would get out
                        // of `getItem()` later. This leads to some weirdness
                        // (setItem('foo', undefined) will return `null`), but
                        // it's not my fault localStorage is our baseline and that
                        // it's weird.
                        if (value === undefined) {
                            value = null;
                        }

                        resolve(value);
                    };
                    transaction.onabort = transaction.onerror = function () {
                        var err = req.error ? req.error : req.transaction.error;
                        reject(err);
                    };
                } catch (e) {
                    reject(e);
                }
            });
        })["catch"](reject);
    });

    executeCallback(promise, callback);
    return promise;
}

function removeItem(key, callback) {
    var self = this;

    key = normalizeKey(key);

    var promise = new Promise$1(function (resolve, reject) {
        self.ready().then(function () {
            createTransaction(self._dbInfo, READ_WRITE, function (err, transaction) {
                if (err) {
                    return reject(err);
                }

                try {
                    var store = transaction.objectStore(self._dbInfo.storeName);
                    // We use a Grunt task to make this safe for IE and some
                    // versions of Android (including those used by Cordova).
                    // Normally IE won't like `.delete()` and will insist on
                    // using `['delete']()`, but we have a build step that
                    // fixes this for us now.
                    var req = store["delete"](key);
                    transaction.oncomplete = function () {
                        resolve();
                    };

                    transaction.onerror = function () {
                        reject(req.error);
                    };

                    // The request will be also be aborted if we've exceeded our storage
                    // space.
                    transaction.onabort = function () {
                        var err = req.error ? req.error : req.transaction.error;
                        reject(err);
                    };
                } catch (e) {
                    reject(e);
                }
            });
        })["catch"](reject);
    });

    executeCallback(promise, callback);
    return promise;
}

function clear(callback) {
    var self = this;

    var promise = new Promise$1(function (resolve, reject) {
        self.ready().then(function () {
            createTransaction(self._dbInfo, READ_WRITE, function (err, transaction) {
                if (err) {
                    return reject(err);
                }

                try {
                    var store = transaction.objectStore(self._dbInfo.storeName);
                    var req = store.clear();

                    transaction.oncomplete = function () {
                        resolve();
                    };

                    transaction.onabort = transaction.onerror = function () {
                        var err = req.error ? req.error : req.transaction.error;
                        reject(err);
                    };
                } catch (e) {
                    reject(e);
                }
            });
        })["catch"](reject);
    });

    executeCallback(promise, callback);
    return promise;
}

function length(callback) {
    var self = this;

    var promise = new Promise$1(function (resolve, reject) {
        self.ready().then(function () {
            createTransaction(self._dbInfo, READ_ONLY, function (err, transaction) {
                if (err) {
                    return reject(err);
                }

                try {
                    var store = transaction.objectStore(self._dbInfo.storeName);
                    var req = store.count();

                    req.onsuccess = function () {
                        resolve(req.result);
                    };

                    req.onerror = function () {
                        reject(req.error);
                    };
                } catch (e) {
                    reject(e);
                }
            });
        })["catch"](reject);
    });

    executeCallback(promise, callback);
    return promise;
}

function key(n, callback) {
    var self = this;

    var promise = new Promise$1(function (resolve, reject) {
        if (n < 0) {
            resolve(null);

            return;
        }

        self.ready().then(function () {
            createTransaction(self._dbInfo, READ_ONLY, function (err, transaction) {
                if (err) {
                    return reject(err);
                }

                try {
                    var store = transaction.objectStore(self._dbInfo.storeName);
                    var advanced = false;
                    var req = store.openKeyCursor();

                    req.onsuccess = function () {
                        var cursor = req.result;
                        if (!cursor) {
                            // this means there weren't enough keys
                            resolve(null);

                            return;
                        }

                        if (n === 0) {
                            // We have the first key, return it if that's what they
                            // wanted.
                            resolve(cursor.key);
                        } else {
                            if (!advanced) {
                                // Otherwise, ask the cursor to skip ahead n
                                // records.
                                advanced = true;
                                cursor.advance(n);
                            } else {
                                // When we get here, we've got the nth key.
                                resolve(cursor.key);
                            }
                        }
                    };

                    req.onerror = function () {
                        reject(req.error);
                    };
                } catch (e) {
                    reject(e);
                }
            });
        })["catch"](reject);
    });

    executeCallback(promise, callback);
    return promise;
}

function keys(callback) {
    var self = this;

    var promise = new Promise$1(function (resolve, reject) {
        self.ready().then(function () {
            createTransaction(self._dbInfo, READ_ONLY, function (err, transaction) {
                if (err) {
                    return reject(err);
                }

                try {
                    var store = transaction.objectStore(self._dbInfo.storeName);
                    var req = store.openKeyCursor();
                    var keys = [];

                    req.onsuccess = function () {
                        var cursor = req.result;

                        if (!cursor) {
                            resolve(keys);
                            return;
                        }

                        keys.push(cursor.key);
                        cursor["continue"]();
                    };

                    req.onerror = function () {
                        reject(req.error);
                    };
                } catch (e) {
                    reject(e);
                }
            });
        })["catch"](reject);
    });

    executeCallback(promise, callback);
    return promise;
}

function dropInstance(options, callback) {
    callback = getCallback.apply(this, arguments);

    var currentConfig = this.config();
    options = typeof options !== 'function' && options || {};
    if (!options.name) {
        options.name = options.name || currentConfig.name;
        options.storeName = options.storeName || currentConfig.storeName;
    }

    var self = this;
    var promise;
    if (!options.name) {
        promise = Promise$1.reject('Invalid arguments');
    } else {
        var isCurrentDb = options.name === currentConfig.name && self._dbInfo.db;

        var dbPromise = isCurrentDb ? Promise$1.resolve(self._dbInfo.db) : _getOriginalConnection(options).then(function (db) {
            var dbContext = dbContexts[options.name];
            var forages = dbContext.forages;
            dbContext.db = db;
            for (var i = 0; i < forages.length; i++) {
                forages[i]._dbInfo.db = db;
            }
            return db;
        });

        if (!options.storeName) {
            promise = dbPromise.then(function (db) {
                _deferReadiness(options);

                var dbContext = dbContexts[options.name];
                var forages = dbContext.forages;

                db.close();
                for (var i = 0; i < forages.length; i++) {
                    var forage = forages[i];
                    forage._dbInfo.db = null;
                }

                var dropDBPromise = new Promise$1(function (resolve, reject) {
                    var req = idb.deleteDatabase(options.name);

                    req.onerror = function () {
                        var db = req.result;
                        if (db) {
                            db.close();
                        }
                        reject(req.error);
                    };

                    req.onblocked = function () {
                        // Closing all open connections in onversionchange handler should prevent this situation, but if
                        // we do get here, it just means the request remains pending - eventually it will succeed or error
                        console.warn('dropInstance blocked for database "' + options.name + '" until all open connections are closed');
                    };

                    req.onsuccess = function () {
                        var db = req.result;
                        if (db) {
                            db.close();
                        }
                        resolve(db);
                    };
                });

                return dropDBPromise.then(function (db) {
                    dbContext.db = db;
                    for (var i = 0; i < forages.length; i++) {
                        var _forage = forages[i];
                        _advanceReadiness(_forage._dbInfo);
                    }
                })["catch"](function (err) {
                    (_rejectReadiness(options, err) || Promise$1.resolve())["catch"](function () {});
                    throw err;
                });
            });
        } else {
            promise = dbPromise.then(function (db) {
                if (!db.objectStoreNames.contains(options.storeName)) {
                    return;
                }

                var newVersion = db.version + 1;

                _deferReadiness(options);

                var dbContext = dbContexts[options.name];
                var forages = dbContext.forages;

                db.close();
                for (var i = 0; i < forages.length; i++) {
                    var forage = forages[i];
                    forage._dbInfo.db = null;
                    forage._dbInfo.version = newVersion;
                }

                var dropObjectPromise = new Promise$1(function (resolve, reject) {
                    var req = idb.open(options.name, newVersion);

                    req.onerror = function (err) {
                        var db = req.result;
                        db.close();
                        reject(err);
                    };

                    req.onupgradeneeded = function () {
                        var db = req.result;
                        db.deleteObjectStore(options.storeName);
                    };

                    req.onsuccess = function () {
                        var db = req.result;
                        db.close();
                        resolve(db);
                    };
                });

                return dropObjectPromise.then(function (db) {
                    dbContext.db = db;
                    for (var j = 0; j < forages.length; j++) {
                        var _forage2 = forages[j];
                        _forage2._dbInfo.db = db;
                        _advanceReadiness(_forage2._dbInfo);
                    }
                })["catch"](function (err) {
                    (_rejectReadiness(options, err) || Promise$1.resolve())["catch"](function () {});
                    throw err;
                });
            });
        }
    }

    executeCallback(promise, callback);
    return promise;
}

var asyncStorage = {
    _driver: 'asyncStorage',
    _initStorage: _initStorage,
    _support: isIndexedDBValid(),
    iterate: iterate,
    getItem: getItem,
    setItem: setItem,
    removeItem: removeItem,
    clear: clear,
    length: length,
    key: key,
    keys: keys,
    dropInstance: dropInstance
};

function isWebSQLValid() {
    return typeof openDatabase === 'function';
}

// Sadly, the best way to save binary data in WebSQL/localStorage is serializing
// it to Base64, so this is how we store it to prevent very strange errors with less
// verbose ways of binary <-> string data storage.
var BASE_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';

var BLOB_TYPE_PREFIX = '~~local_forage_type~';
var BLOB_TYPE_PREFIX_REGEX = /^~~local_forage_type~([^~]+)~/;

var SERIALIZED_MARKER = '__lfsc__:';
var SERIALIZED_MARKER_LENGTH = SERIALIZED_MARKER.length;

// OMG the serializations!
var TYPE_ARRAYBUFFER = 'arbf';
var TYPE_BLOB = 'blob';
var TYPE_INT8ARRAY = 'si08';
var TYPE_UINT8ARRAY = 'ui08';
var TYPE_UINT8CLAMPEDARRAY = 'uic8';
var TYPE_INT16ARRAY = 'si16';
var TYPE_INT32ARRAY = 'si32';
var TYPE_UINT16ARRAY = 'ur16';
var TYPE_UINT32ARRAY = 'ui32';
var TYPE_FLOAT32ARRAY = 'fl32';
var TYPE_FLOAT64ARRAY = 'fl64';
var TYPE_SERIALIZED_MARKER_LENGTH = SERIALIZED_MARKER_LENGTH + TYPE_ARRAYBUFFER.length;

var toString$1 = Object.prototype.toString;

function stringToBuffer(serializedString) {
    // Fill the string into a ArrayBuffer.
    var bufferLength = serializedString.length * 0.75;
    var len = serializedString.length;
    var i;
    var p = 0;
    var encoded1, encoded2, encoded3, encoded4;

    if (serializedString[serializedString.length - 1] === '=') {
        bufferLength--;
        if (serializedString[serializedString.length - 2] === '=') {
            bufferLength--;
        }
    }

    var buffer = new ArrayBuffer(bufferLength);
    var bytes = new Uint8Array(buffer);

    for (i = 0; i < len; i += 4) {
        encoded1 = BASE_CHARS.indexOf(serializedString[i]);
        encoded2 = BASE_CHARS.indexOf(serializedString[i + 1]);
        encoded3 = BASE_CHARS.indexOf(serializedString[i + 2]);
        encoded4 = BASE_CHARS.indexOf(serializedString[i + 3]);

        /*jslint bitwise: true */
        bytes[p++] = encoded1 << 2 | encoded2 >> 4;
        bytes[p++] = (encoded2 & 15) << 4 | encoded3 >> 2;
        bytes[p++] = (encoded3 & 3) << 6 | encoded4 & 63;
    }
    return buffer;
}

// Converts a buffer to a string to store, serialized, in the backend
// storage library.
function bufferToString(buffer) {
    // base64-arraybuffer
    var bytes = new Uint8Array(buffer);
    var base64String = '';
    var i;

    for (i = 0; i < bytes.length; i += 3) {
        /*jslint bitwise: true */
        base64String += BASE_CHARS[bytes[i] >> 2];
        base64String += BASE_CHARS[(bytes[i] & 3) << 4 | bytes[i + 1] >> 4];
        base64String += BASE_CHARS[(bytes[i + 1] & 15) << 2 | bytes[i + 2] >> 6];
        base64String += BASE_CHARS[bytes[i + 2] & 63];
    }

    if (bytes.length % 3 === 2) {
        base64String = base64String.substring(0, base64String.length - 1) + '=';
    } else if (bytes.length % 3 === 1) {
        base64String = base64String.substring(0, base64String.length - 2) + '==';
    }

    return base64String;
}

// Serialize a value, afterwards executing a callback (which usually
// instructs the `setItem()` callback/promise to be executed). This is how
// we store binary data with localStorage.
function serialize(value, callback) {
    var valueType = '';
    if (value) {
        valueType = toString$1.call(value);
    }

    // Cannot use `value instanceof ArrayBuffer` or such here, as these
    // checks fail when running the tests using casper.js...
    //
    // TODO: See why those tests fail and use a better solution.
    if (value && (valueType === '[object ArrayBuffer]' || value.buffer && toString$1.call(value.buffer) === '[object ArrayBuffer]')) {
        // Convert binary arrays to a string and prefix the string with
        // a special marker.
        var buffer;
        var marker = SERIALIZED_MARKER;

        if (value instanceof ArrayBuffer) {
            buffer = value;
            marker += TYPE_ARRAYBUFFER;
        } else {
            buffer = value.buffer;

            if (valueType === '[object Int8Array]') {
                marker += TYPE_INT8ARRAY;
            } else if (valueType === '[object Uint8Array]') {
                marker += TYPE_UINT8ARRAY;
            } else if (valueType === '[object Uint8ClampedArray]') {
                marker += TYPE_UINT8CLAMPEDARRAY;
            } else if (valueType === '[object Int16Array]') {
                marker += TYPE_INT16ARRAY;
            } else if (valueType === '[object Uint16Array]') {
                marker += TYPE_UINT16ARRAY;
            } else if (valueType === '[object Int32Array]') {
                marker += TYPE_INT32ARRAY;
            } else if (valueType === '[object Uint32Array]') {
                marker += TYPE_UINT32ARRAY;
            } else if (valueType === '[object Float32Array]') {
                marker += TYPE_FLOAT32ARRAY;
            } else if (valueType === '[object Float64Array]') {
                marker += TYPE_FLOAT64ARRAY;
            } else {
                callback(new Error('Failed to get type for BinaryArray'));
            }
        }

        callback(marker + bufferToString(buffer));
    } else if (valueType === '[object Blob]') {
        // Conver the blob to a binaryArray and then to a string.
        var fileReader = new FileReader();

        fileReader.onload = function () {
            // Backwards-compatible prefix for the blob type.
            var str = BLOB_TYPE_PREFIX + value.type + '~' + bufferToString(this.result);

            callback(SERIALIZED_MARKER + TYPE_BLOB + str);
        };

        fileReader.readAsArrayBuffer(value);
    } else {
        try {
            callback(JSON.stringify(value));
        } catch (e) {
            console.error("Couldn't convert value into a JSON string: ", value);

            callback(null, e);
        }
    }
}

// Deserialize data we've inserted into a value column/field. We place
// special markers into our strings to mark them as encoded; this isn't
// as nice as a meta field, but it's the only sane thing we can do whilst
// keeping localStorage support intact.
//
// Oftentimes this will just deserialize JSON content, but if we have a
// special marker (SERIALIZED_MARKER, defined above), we will extract
// some kind of arraybuffer/binary data/typed array out of the string.
function deserialize(value) {
    // If we haven't marked this string as being specially serialized (i.e.
    // something other than serialized JSON), we can just return it and be
    // done with it.
    if (value.substring(0, SERIALIZED_MARKER_LENGTH) !== SERIALIZED_MARKER) {
        return JSON.parse(value);
    }

    // The following code deals with deserializing some kind of Blob or
    // TypedArray. First we separate out the type of data we're dealing
    // with from the data itself.
    var serializedString = value.substring(TYPE_SERIALIZED_MARKER_LENGTH);
    var type = value.substring(SERIALIZED_MARKER_LENGTH, TYPE_SERIALIZED_MARKER_LENGTH);

    var blobType;
    // Backwards-compatible blob type serialization strategy.
    // DBs created with older versions of localForage will simply not have the blob type.
    if (type === TYPE_BLOB && BLOB_TYPE_PREFIX_REGEX.test(serializedString)) {
        var matcher = serializedString.match(BLOB_TYPE_PREFIX_REGEX);
        blobType = matcher[1];
        serializedString = serializedString.substring(matcher[0].length);
    }
    var buffer = stringToBuffer(serializedString);

    // Return the right type based on the code/type set during
    // serialization.
    switch (type) {
        case TYPE_ARRAYBUFFER:
            return buffer;
        case TYPE_BLOB:
            return createBlob([buffer], { type: blobType });
        case TYPE_INT8ARRAY:
            return new Int8Array(buffer);
        case TYPE_UINT8ARRAY:
            return new Uint8Array(buffer);
        case TYPE_UINT8CLAMPEDARRAY:
            return new Uint8ClampedArray(buffer);
        case TYPE_INT16ARRAY:
            return new Int16Array(buffer);
        case TYPE_UINT16ARRAY:
            return new Uint16Array(buffer);
        case TYPE_INT32ARRAY:
            return new Int32Array(buffer);
        case TYPE_UINT32ARRAY:
            return new Uint32Array(buffer);
        case TYPE_FLOAT32ARRAY:
            return new Float32Array(buffer);
        case TYPE_FLOAT64ARRAY:
            return new Float64Array(buffer);
        default:
            throw new Error('Unkown type: ' + type);
    }
}

var localforageSerializer = {
    serialize: serialize,
    deserialize: deserialize,
    stringToBuffer: stringToBuffer,
    bufferToString: bufferToString
};

/*
 * Includes code from:
 *
 * base64-arraybuffer
 * https://github.com/niklasvh/base64-arraybuffer
 *
 * Copyright (c) 2012 Niklas von Hertzen
 * Licensed under the MIT license.
 */

function createDbTable(t, dbInfo, callback, errorCallback) {
    t.executeSql('CREATE TABLE IF NOT EXISTS ' + dbInfo.storeName + ' ' + '(id INTEGER PRIMARY KEY, key unique, value)', [], callback, errorCallback);
}

// Open the WebSQL database (automatically creates one if one didn't
// previously exist), using any options set in the config.
function _initStorage$1(options) {
    var self = this;
    var dbInfo = {
        db: null
    };

    if (options) {
        for (var i in options) {
            dbInfo[i] = typeof options[i] !== 'string' ? options[i].toString() : options[i];
        }
    }

    var dbInfoPromise = new Promise$1(function (resolve, reject) {
        // Open the database; the openDatabase API will automatically
        // create it for us if it doesn't exist.
        try {
            dbInfo.db = openDatabase(dbInfo.name, String(dbInfo.version), dbInfo.description, dbInfo.size);
        } catch (e) {
            return reject(e);
        }

        // Create our key/value table if it doesn't exist.
        dbInfo.db.transaction(function (t) {
            createDbTable(t, dbInfo, function () {
                self._dbInfo = dbInfo;
                resolve();
            }, function (t, error) {
                reject(error);
            });
        }, reject);
    });

    dbInfo.serializer = localforageSerializer;
    return dbInfoPromise;
}

function tryExecuteSql(t, dbInfo, sqlStatement, args, callback, errorCallback) {
    t.executeSql(sqlStatement, args, callback, function (t, error) {
        if (error.code === error.SYNTAX_ERR) {
            t.executeSql('SELECT name FROM sqlite_master ' + "WHERE type='table' AND name = ?", [dbInfo.storeName], function (t, results) {
                if (!results.rows.length) {
                    // if the table is missing (was deleted)
                    // re-create it table and retry
                    createDbTable(t, dbInfo, function () {
                        t.executeSql(sqlStatement, args, callback, errorCallback);
                    }, errorCallback);
                } else {
                    errorCallback(t, error);
                }
            }, errorCallback);
        } else {
            errorCallback(t, error);
        }
    }, errorCallback);
}

function getItem$1(key, callback) {
    var self = this;

    key = normalizeKey(key);

    var promise = new Promise$1(function (resolve, reject) {
        self.ready().then(function () {
            var dbInfo = self._dbInfo;
            dbInfo.db.transaction(function (t) {
                tryExecuteSql(t, dbInfo, 'SELECT * FROM ' + dbInfo.storeName + ' WHERE key = ? LIMIT 1', [key], function (t, results) {
                    var result = results.rows.length ? results.rows.item(0).value : null;

                    // Check to see if this is serialized content we need to
                    // unpack.
                    if (result) {
                        result = dbInfo.serializer.deserialize(result);
                    }

                    resolve(result);
                }, function (t, error) {
                    reject(error);
                });
            });
        })["catch"](reject);
    });

    executeCallback(promise, callback);
    return promise;
}

function iterate$1(iterator, callback) {
    var self = this;

    var promise = new Promise$1(function (resolve, reject) {
        self.ready().then(function () {
            var dbInfo = self._dbInfo;

            dbInfo.db.transaction(function (t) {
                tryExecuteSql(t, dbInfo, 'SELECT * FROM ' + dbInfo.storeName, [], function (t, results) {
                    var rows = results.rows;
                    var length = rows.length;

                    for (var i = 0; i < length; i++) {
                        var item = rows.item(i);
                        var result = item.value;

                        // Check to see if this is serialized content
                        // we need to unpack.
                        if (result) {
                            result = dbInfo.serializer.deserialize(result);
                        }

                        result = iterator(result, item.key, i + 1);

                        // void(0) prevents problems with redefinition
                        // of `undefined`.
                        if (result !== void 0) {
                            resolve(result);
                            return;
                        }
                    }

                    resolve();
                }, function (t, error) {
                    reject(error);
                });
            });
        })["catch"](reject);
    });

    executeCallback(promise, callback);
    return promise;
}

function _setItem(key, value, callback, retriesLeft) {
    var self = this;

    key = normalizeKey(key);

    var promise = new Promise$1(function (resolve, reject) {
        self.ready().then(function () {
            // The localStorage API doesn't return undefined values in an
            // "expected" way, so undefined is always cast to null in all
            // drivers. See: https://github.com/mozilla/localForage/pull/42
            if (value === undefined) {
                value = null;
            }

            // Save the original value to pass to the callback.
            var originalValue = value;

            var dbInfo = self._dbInfo;
            dbInfo.serializer.serialize(value, function (value, error) {
                if (error) {
                    reject(error);
                } else {
                    dbInfo.db.transaction(function (t) {
                        tryExecuteSql(t, dbInfo, 'INSERT OR REPLACE INTO ' + dbInfo.storeName + ' ' + '(key, value) VALUES (?, ?)', [key, value], function () {
                            resolve(originalValue);
                        }, function (t, error) {
                            reject(error);
                        });
                    }, function (sqlError) {
                        // The transaction failed; check
                        // to see if it's a quota error.
                        if (sqlError.code === sqlError.QUOTA_ERR) {
                            // We reject the callback outright for now, but
                            // it's worth trying to re-run the transaction.
                            // Even if the user accepts the prompt to use
                            // more storage on Safari, this error will
                            // be called.
                            //
                            // Try to re-run the transaction.
                            if (retriesLeft > 0) {
                                resolve(_setItem.apply(self, [key, originalValue, callback, retriesLeft - 1]));
                                return;
                            }
                            reject(sqlError);
                        }
                    });
                }
            });
        })["catch"](reject);
    });

    executeCallback(promise, callback);
    return promise;
}

function setItem$1(key, value, callback) {
    return _setItem.apply(this, [key, value, callback, 1]);
}

function removeItem$1(key, callback) {
    var self = this;

    key = normalizeKey(key);

    var promise = new Promise$1(function (resolve, reject) {
        self.ready().then(function () {
            var dbInfo = self._dbInfo;
            dbInfo.db.transaction(function (t) {
                tryExecuteSql(t, dbInfo, 'DELETE FROM ' + dbInfo.storeName + ' WHERE key = ?', [key], function () {
                    resolve();
                }, function (t, error) {
                    reject(error);
                });
            });
        })["catch"](reject);
    });

    executeCallback(promise, callback);
    return promise;
}

// Deletes every item in the table.
// TODO: Find out if this resets the AUTO_INCREMENT number.
function clear$1(callback) {
    var self = this;

    var promise = new Promise$1(function (resolve, reject) {
        self.ready().then(function () {
            var dbInfo = self._dbInfo;
            dbInfo.db.transaction(function (t) {
                tryExecuteSql(t, dbInfo, 'DELETE FROM ' + dbInfo.storeName, [], function () {
                    resolve();
                }, function (t, error) {
                    reject(error);
                });
            });
        })["catch"](reject);
    });

    executeCallback(promise, callback);
    return promise;
}

// Does a simple `COUNT(key)` to get the number of items stored in
// localForage.
function length$1(callback) {
    var self = this;

    var promise = new Promise$1(function (resolve, reject) {
        self.ready().then(function () {
            var dbInfo = self._dbInfo;
            dbInfo.db.transaction(function (t) {
                // Ahhh, SQL makes this one soooooo easy.
                tryExecuteSql(t, dbInfo, 'SELECT COUNT(key) as c FROM ' + dbInfo.storeName, [], function (t, results) {
                    var result = results.rows.item(0).c;
                    resolve(result);
                }, function (t, error) {
                    reject(error);
                });
            });
        })["catch"](reject);
    });

    executeCallback(promise, callback);
    return promise;
}

// Return the key located at key index X; essentially gets the key from a
// `WHERE id = ?`. This is the most efficient way I can think to implement
// this rarely-used (in my experience) part of the API, but it can seem
// inconsistent, because we do `INSERT OR REPLACE INTO` on `setItem()`, so
// the ID of each key will change every time it's updated. Perhaps a stored
// procedure for the `setItem()` SQL would solve this problem?
// TODO: Don't change ID on `setItem()`.
function key$1(n, callback) {
    var self = this;

    var promise = new Promise$1(function (resolve, reject) {
        self.ready().then(function () {
            var dbInfo = self._dbInfo;
            dbInfo.db.transaction(function (t) {
                tryExecuteSql(t, dbInfo, 'SELECT key FROM ' + dbInfo.storeName + ' WHERE id = ? LIMIT 1', [n + 1], function (t, results) {
                    var result = results.rows.length ? results.rows.item(0).key : null;
                    resolve(result);
                }, function (t, error) {
                    reject(error);
                });
            });
        })["catch"](reject);
    });

    executeCallback(promise, callback);
    return promise;
}

function keys$1(callback) {
    var self = this;

    var promise = new Promise$1(function (resolve, reject) {
        self.ready().then(function () {
            var dbInfo = self._dbInfo;
            dbInfo.db.transaction(function (t) {
                tryExecuteSql(t, dbInfo, 'SELECT key FROM ' + dbInfo.storeName, [], function (t, results) {
                    var keys = [];

                    for (var i = 0; i < results.rows.length; i++) {
                        keys.push(results.rows.item(i).key);
                    }

                    resolve(keys);
                }, function (t, error) {
                    reject(error);
                });
            });
        })["catch"](reject);
    });

    executeCallback(promise, callback);
    return promise;
}

// https://www.w3.org/TR/webdatabase/#databases
// > There is no way to enumerate or delete the databases available for an origin from this API.
function getAllStoreNames(db) {
    return new Promise$1(function (resolve, reject) {
        db.transaction(function (t) {
            t.executeSql('SELECT name FROM sqlite_master ' + "WHERE type='table' AND name <> '__WebKitDatabaseInfoTable__'", [], function (t, results) {
                var storeNames = [];

                for (var i = 0; i < results.rows.length; i++) {
                    storeNames.push(results.rows.item(i).name);
                }

                resolve({
                    db: db,
                    storeNames: storeNames
                });
            }, function (t, error) {
                reject(error);
            });
        }, function (sqlError) {
            reject(sqlError);
        });
    });
}

function dropInstance$1(options, callback) {
    callback = getCallback.apply(this, arguments);

    var currentConfig = this.config();
    options = typeof options !== 'function' && options || {};
    if (!options.name) {
        options.name = options.name || currentConfig.name;
        options.storeName = options.storeName || currentConfig.storeName;
    }

    var self = this;
    var promise;
    if (!options.name) {
        promise = Promise$1.reject('Invalid arguments');
    } else {
        promise = new Promise$1(function (resolve) {
            var db;
            if (options.name === currentConfig.name) {
                // use the db reference of the current instance
                db = self._dbInfo.db;
            } else {
                db = openDatabase(options.name, '', '', 0);
            }

            if (!options.storeName) {
                // drop all database tables
                resolve(getAllStoreNames(db));
            } else {
                resolve({
                    db: db,
                    storeNames: [options.storeName]
                });
            }
        }).then(function (operationInfo) {
            return new Promise$1(function (resolve, reject) {
                operationInfo.db.transaction(function (t) {
                    function dropTable(storeName) {
                        return new Promise$1(function (resolve, reject) {
                            t.executeSql('DROP TABLE IF EXISTS ' + storeName, [], function () {
                                resolve();
                            }, function (t, error) {
                                reject(error);
                            });
                        });
                    }

                    var operations = [];
                    for (var i = 0, len = operationInfo.storeNames.length; i < len; i++) {
                        operations.push(dropTable(operationInfo.storeNames[i]));
                    }

                    Promise$1.all(operations).then(function () {
                        resolve();
                    })["catch"](function (e) {
                        reject(e);
                    });
                }, function (sqlError) {
                    reject(sqlError);
                });
            });
        });
    }

    executeCallback(promise, callback);
    return promise;
}

var webSQLStorage = {
    _driver: 'webSQLStorage',
    _initStorage: _initStorage$1,
    _support: isWebSQLValid(),
    iterate: iterate$1,
    getItem: getItem$1,
    setItem: setItem$1,
    removeItem: removeItem$1,
    clear: clear$1,
    length: length$1,
    key: key$1,
    keys: keys$1,
    dropInstance: dropInstance$1
};

function isLocalStorageValid() {
    try {
        return typeof localStorage !== 'undefined' && 'setItem' in localStorage &&
        // in IE8 typeof localStorage.setItem === 'object'
        !!localStorage.setItem;
    } catch (e) {
        return false;
    }
}

function _getKeyPrefix(options, defaultConfig) {
    var keyPrefix = options.name + '/';

    if (options.storeName !== defaultConfig.storeName) {
        keyPrefix += options.storeName + '/';
    }
    return keyPrefix;
}

// Check if localStorage throws when saving an item
function checkIfLocalStorageThrows() {
    var localStorageTestKey = '_localforage_support_test';

    try {
        localStorage.setItem(localStorageTestKey, true);
        localStorage.removeItem(localStorageTestKey);

        return false;
    } catch (e) {
        return true;
    }
}

// Check if localStorage is usable and allows to save an item
// This method checks if localStorage is usable in Safari Private Browsing
// mode, or in any other case where the available quota for localStorage
// is 0 and there wasn't any saved items yet.
function _isLocalStorageUsable() {
    return !checkIfLocalStorageThrows() || localStorage.length > 0;
}

// Config the localStorage backend, using options set in the config.
function _initStorage$2(options) {
    var self = this;
    var dbInfo = {};
    if (options) {
        for (var i in options) {
            dbInfo[i] = options[i];
        }
    }

    dbInfo.keyPrefix = _getKeyPrefix(options, self._defaultConfig);

    if (!_isLocalStorageUsable()) {
        return Promise$1.reject();
    }

    self._dbInfo = dbInfo;
    dbInfo.serializer = localforageSerializer;

    return Promise$1.resolve();
}

// Remove all keys from the datastore, effectively destroying all data in
// the app's key/value store!
function clear$2(callback) {
    var self = this;
    var promise = self.ready().then(function () {
        var keyPrefix = self._dbInfo.keyPrefix;

        for (var i = localStorage.length - 1; i >= 0; i--) {
            var key = localStorage.key(i);

            if (key.indexOf(keyPrefix) === 0) {
                localStorage.removeItem(key);
            }
        }
    });

    executeCallback(promise, callback);
    return promise;
}

// Retrieve an item from the store. Unlike the original async_storage
// library in Gaia, we don't modify return values at all. If a key's value
// is `undefined`, we pass that value to the callback function.
function getItem$2(key, callback) {
    var self = this;

    key = normalizeKey(key);

    var promise = self.ready().then(function () {
        var dbInfo = self._dbInfo;
        var result = localStorage.getItem(dbInfo.keyPrefix + key);

        // If a result was found, parse it from the serialized
        // string into a JS object. If result isn't truthy, the key
        // is likely undefined and we'll pass it straight to the
        // callback.
        if (result) {
            result = dbInfo.serializer.deserialize(result);
        }

        return result;
    });

    executeCallback(promise, callback);
    return promise;
}

// Iterate over all items in the store.
function iterate$2(iterator, callback) {
    var self = this;

    var promise = self.ready().then(function () {
        var dbInfo = self._dbInfo;
        var keyPrefix = dbInfo.keyPrefix;
        var keyPrefixLength = keyPrefix.length;
        var length = localStorage.length;

        // We use a dedicated iterator instead of the `i` variable below
        // so other keys we fetch in localStorage aren't counted in
        // the `iterationNumber` argument passed to the `iterate()`
        // callback.
        //
        // See: github.com/mozilla/localForage/pull/435#discussion_r38061530
        var iterationNumber = 1;

        for (var i = 0; i < length; i++) {
            var key = localStorage.key(i);
            if (key.indexOf(keyPrefix) !== 0) {
                continue;
            }
            var value = localStorage.getItem(key);

            // If a result was found, parse it from the serialized
            // string into a JS object. If result isn't truthy, the
            // key is likely undefined and we'll pass it straight
            // to the iterator.
            if (value) {
                value = dbInfo.serializer.deserialize(value);
            }

            value = iterator(value, key.substring(keyPrefixLength), iterationNumber++);

            if (value !== void 0) {
                return value;
            }
        }
    });

    executeCallback(promise, callback);
    return promise;
}

// Same as localStorage's key() method, except takes a callback.
function key$2(n, callback) {
    var self = this;
    var promise = self.ready().then(function () {
        var dbInfo = self._dbInfo;
        var result;
        try {
            result = localStorage.key(n);
        } catch (error) {
            result = null;
        }

        // Remove the prefix from the key, if a key is found.
        if (result) {
            result = result.substring(dbInfo.keyPrefix.length);
        }

        return result;
    });

    executeCallback(promise, callback);
    return promise;
}

function keys$2(callback) {
    var self = this;
    var promise = self.ready().then(function () {
        var dbInfo = self._dbInfo;
        var length = localStorage.length;
        var keys = [];

        for (var i = 0; i < length; i++) {
            var itemKey = localStorage.key(i);
            if (itemKey.indexOf(dbInfo.keyPrefix) === 0) {
                keys.push(itemKey.substring(dbInfo.keyPrefix.length));
            }
        }

        return keys;
    });

    executeCallback(promise, callback);
    return promise;
}

// Supply the number of keys in the datastore to the callback function.
function length$2(callback) {
    var self = this;
    var promise = self.keys().then(function (keys) {
        return keys.length;
    });

    executeCallback(promise, callback);
    return promise;
}

// Remove an item from the store, nice and simple.
function removeItem$2(key, callback) {
    var self = this;

    key = normalizeKey(key);

    var promise = self.ready().then(function () {
        var dbInfo = self._dbInfo;
        localStorage.removeItem(dbInfo.keyPrefix + key);
    });

    executeCallback(promise, callback);
    return promise;
}

// Set a key's value and run an optional callback once the value is set.
// Unlike Gaia's implementation, the callback function is passed the value,
// in case you want to operate on that value only after you're sure it
// saved, or something like that.
function setItem$2(key, value, callback) {
    var self = this;

    key = normalizeKey(key);

    var promise = self.ready().then(function () {
        // Convert undefined values to null.
        // https://github.com/mozilla/localForage/pull/42
        if (value === undefined) {
            value = null;
        }

        // Save the original value to pass to the callback.
        var originalValue = value;

        return new Promise$1(function (resolve, reject) {
            var dbInfo = self._dbInfo;
            dbInfo.serializer.serialize(value, function (value, error) {
                if (error) {
                    reject(error);
                } else {
                    try {
                        localStorage.setItem(dbInfo.keyPrefix + key, value);
                        resolve(originalValue);
                    } catch (e) {
                        // localStorage capacity exceeded.
                        // TODO: Make this a specific error/event.
                        if (e.name === 'QuotaExceededError' || e.name === 'NS_ERROR_DOM_QUOTA_REACHED') {
                            reject(e);
                        }
                        reject(e);
                    }
                }
            });
        });
    });

    executeCallback(promise, callback);
    return promise;
}

function dropInstance$2(options, callback) {
    callback = getCallback.apply(this, arguments);

    options = typeof options !== 'function' && options || {};
    if (!options.name) {
        var currentConfig = this.config();
        options.name = options.name || currentConfig.name;
        options.storeName = options.storeName || currentConfig.storeName;
    }

    var self = this;
    var promise;
    if (!options.name) {
        promise = Promise$1.reject('Invalid arguments');
    } else {
        promise = new Promise$1(function (resolve) {
            if (!options.storeName) {
                resolve(options.name + '/');
            } else {
                resolve(_getKeyPrefix(options, self._defaultConfig));
            }
        }).then(function (keyPrefix) {
            for (var i = localStorage.length - 1; i >= 0; i--) {
                var key = localStorage.key(i);

                if (key.indexOf(keyPrefix) === 0) {
                    localStorage.removeItem(key);
                }
            }
        });
    }

    executeCallback(promise, callback);
    return promise;
}

var localStorageWrapper = {
    _driver: 'localStorageWrapper',
    _initStorage: _initStorage$2,
    _support: isLocalStorageValid(),
    iterate: iterate$2,
    getItem: getItem$2,
    setItem: setItem$2,
    removeItem: removeItem$2,
    clear: clear$2,
    length: length$2,
    key: key$2,
    keys: keys$2,
    dropInstance: dropInstance$2
};

var sameValue = function sameValue(x, y) {
    return x === y || typeof x === 'number' && typeof y === 'number' && isNaN(x) && isNaN(y);
};

var includes = function includes(array, searchElement) {
    var len = array.length;
    var i = 0;
    while (i < len) {
        if (sameValue(array[i], searchElement)) {
            return true;
        }
        i++;
    }

    return false;
};

var isArray = Array.isArray || function (arg) {
    return Object.prototype.toString.call(arg) === '[object Array]';
};

// Drivers are stored here when `defineDriver()` is called.
// They are shared across all instances of localForage.
var DefinedDrivers = {};

var DriverSupport = {};

var DefaultDrivers = {
    INDEXEDDB: asyncStorage,
    WEBSQL: webSQLStorage,
    LOCALSTORAGE: localStorageWrapper
};

var DefaultDriverOrder = [DefaultDrivers.INDEXEDDB._driver, DefaultDrivers.WEBSQL._driver, DefaultDrivers.LOCALSTORAGE._driver];

var OptionalDriverMethods = ['dropInstance'];

var LibraryMethods = ['clear', 'getItem', 'iterate', 'key', 'keys', 'length', 'removeItem', 'setItem'].concat(OptionalDriverMethods);

var DefaultConfig = {
    description: '',
    driver: DefaultDriverOrder.slice(),
    name: 'localforage',
    // Default DB size is _JUST UNDER_ 5MB, as it's the highest size
    // we can use without a prompt.
    size: 4980736,
    storeName: 'keyvaluepairs',
    version: 1.0
};

function callWhenReady(localForageInstance, libraryMethod) {
    localForageInstance[libraryMethod] = function () {
        var _args = arguments;
        return localForageInstance.ready().then(function () {
            return localForageInstance[libraryMethod].apply(localForageInstance, _args);
        });
    };
}

function extend() {
    for (var i = 1; i < arguments.length; i++) {
        var arg = arguments[i];

        if (arg) {
            for (var _key in arg) {
                if (arg.hasOwnProperty(_key)) {
                    if (isArray(arg[_key])) {
                        arguments[0][_key] = arg[_key].slice();
                    } else {
                        arguments[0][_key] = arg[_key];
                    }
                }
            }
        }
    }

    return arguments[0];
}

var LocalForage = function () {
    function LocalForage(options) {
        _classCallCheck(this, LocalForage);

        for (var driverTypeKey in DefaultDrivers) {
            if (DefaultDrivers.hasOwnProperty(driverTypeKey)) {
                var driver = DefaultDrivers[driverTypeKey];
                var driverName = driver._driver;
                this[driverTypeKey] = driverName;

                if (!DefinedDrivers[driverName]) {
                    // we don't need to wait for the promise,
                    // since the default drivers can be defined
                    // in a blocking manner
                    this.defineDriver(driver);
                }
            }
        }

        this._defaultConfig = extend({}, DefaultConfig);
        this._config = extend({}, this._defaultConfig, options);
        this._driverSet = null;
        this._initDriver = null;
        this._ready = false;
        this._dbInfo = null;

        this._wrapLibraryMethodsWithReady();
        this.setDriver(this._config.driver)["catch"](function () {});
    }

    // Set any config values for localForage; can be called anytime before
    // the first API call (e.g. `getItem`, `setItem`).
    // We loop through options so we don't overwrite existing config
    // values.


    LocalForage.prototype.config = function config(options) {
        // If the options argument is an object, we use it to set values.
        // Otherwise, we return either a specified config value or all
        // config values.
        if ((typeof options === 'undefined' ? 'undefined' : _typeof(options)) === 'object') {
            // If localforage is ready and fully initialized, we can't set
            // any new configuration values. Instead, we return an error.
            if (this._ready) {
                return new Error("Can't call config() after localforage " + 'has been used.');
            }

            for (var i in options) {
                if (i === 'storeName') {
                    options[i] = options[i].replace(/\W/g, '_');
                }

                if (i === 'version' && typeof options[i] !== 'number') {
                    return new Error('Database version must be a number.');
                }

                this._config[i] = options[i];
            }

            // after all config options are set and
            // the driver option is used, try setting it
            if ('driver' in options && options.driver) {
                return this.setDriver(this._config.driver);
            }

            return true;
        } else if (typeof options === 'string') {
            return this._config[options];
        } else {
            return this._config;
        }
    };

    // Used to define a custom driver, shared across all instances of
    // localForage.


    LocalForage.prototype.defineDriver = function defineDriver(driverObject, callback, errorCallback) {
        var promise = new Promise$1(function (resolve, reject) {
            try {
                var driverName = driverObject._driver;
                var complianceError = new Error('Custom driver not compliant; see ' + 'https://mozilla.github.io/localForage/#definedriver');

                // A driver name should be defined and not overlap with the
                // library-defined, default drivers.
                if (!driverObject._driver) {
                    reject(complianceError);
                    return;
                }

                var driverMethods = LibraryMethods.concat('_initStorage');
                for (var i = 0, len = driverMethods.length; i < len; i++) {
                    var driverMethodName = driverMethods[i];

                    // when the property is there,
                    // it should be a method even when optional
                    var isRequired = !includes(OptionalDriverMethods, driverMethodName);
                    if ((isRequired || driverObject[driverMethodName]) && typeof driverObject[driverMethodName] !== 'function') {
                        reject(complianceError);
                        return;
                    }
                }

                var configureMissingMethods = function configureMissingMethods() {
                    var methodNotImplementedFactory = function methodNotImplementedFactory(methodName) {
                        return function () {
                            var error = new Error('Method ' + methodName + ' is not implemented by the current driver');
                            var promise = Promise$1.reject(error);
                            executeCallback(promise, arguments[arguments.length - 1]);
                            return promise;
                        };
                    };

                    for (var _i = 0, _len = OptionalDriverMethods.length; _i < _len; _i++) {
                        var optionalDriverMethod = OptionalDriverMethods[_i];
                        if (!driverObject[optionalDriverMethod]) {
                            driverObject[optionalDriverMethod] = methodNotImplementedFactory(optionalDriverMethod);
                        }
                    }
                };

                configureMissingMethods();

                var setDriverSupport = function setDriverSupport(support) {
                    if (DefinedDrivers[driverName]) {
                        console.info('Redefining LocalForage driver: ' + driverName);
                    }
                    DefinedDrivers[driverName] = driverObject;
                    DriverSupport[driverName] = support;
                    // don't use a then, so that we can define
                    // drivers that have simple _support methods
                    // in a blocking manner
                    resolve();
                };

                if ('_support' in driverObject) {
                    if (driverObject._support && typeof driverObject._support === 'function') {
                        driverObject._support().then(setDriverSupport, reject);
                    } else {
                        setDriverSupport(!!driverObject._support);
                    }
                } else {
                    setDriverSupport(true);
                }
            } catch (e) {
                reject(e);
            }
        });

        executeTwoCallbacks(promise, callback, errorCallback);
        return promise;
    };

    LocalForage.prototype.driver = function driver() {
        return this._driver || null;
    };

    LocalForage.prototype.getDriver = function getDriver(driverName, callback, errorCallback) {
        var getDriverPromise = DefinedDrivers[driverName] ? Promise$1.resolve(DefinedDrivers[driverName]) : Promise$1.reject(new Error('Driver not found.'));

        executeTwoCallbacks(getDriverPromise, callback, errorCallback);
        return getDriverPromise;
    };

    LocalForage.prototype.getSerializer = function getSerializer(callback) {
        var serializerPromise = Promise$1.resolve(localforageSerializer);
        executeTwoCallbacks(serializerPromise, callback);
        return serializerPromise;
    };

    LocalForage.prototype.ready = function ready(callback) {
        var self = this;

        var promise = self._driverSet.then(function () {
            if (self._ready === null) {
                self._ready = self._initDriver();
            }

            return self._ready;
        });

        executeTwoCallbacks(promise, callback, callback);
        return promise;
    };

    LocalForage.prototype.setDriver = function setDriver(drivers, callback, errorCallback) {
        var self = this;

        if (!isArray(drivers)) {
            drivers = [drivers];
        }

        var supportedDrivers = this._getSupportedDrivers(drivers);

        function setDriverToConfig() {
            self._config.driver = self.driver();
        }

        function extendSelfWithDriver(driver) {
            self._extend(driver);
            setDriverToConfig();

            self._ready = self._initStorage(self._config);
            return self._ready;
        }

        function initDriver(supportedDrivers) {
            return function () {
                var currentDriverIndex = 0;

                function driverPromiseLoop() {
                    while (currentDriverIndex < supportedDrivers.length) {
                        var driverName = supportedDrivers[currentDriverIndex];
                        currentDriverIndex++;

                        self._dbInfo = null;
                        self._ready = null;

                        return self.getDriver(driverName).then(extendSelfWithDriver)["catch"](driverPromiseLoop);
                    }

                    setDriverToConfig();
                    var error = new Error('No available storage method found.');
                    self._driverSet = Promise$1.reject(error);
                    return self._driverSet;
                }

                return driverPromiseLoop();
            };
        }

        // There might be a driver initialization in progress
        // so wait for it to finish in order to avoid a possible
        // race condition to set _dbInfo
        var oldDriverSetDone = this._driverSet !== null ? this._driverSet["catch"](function () {
            return Promise$1.resolve();
        }) : Promise$1.resolve();

        this._driverSet = oldDriverSetDone.then(function () {
            var driverName = supportedDrivers[0];
            self._dbInfo = null;
            self._ready = null;

            return self.getDriver(driverName).then(function (driver) {
                self._driver = driver._driver;
                setDriverToConfig();
                self._wrapLibraryMethodsWithReady();
                self._initDriver = initDriver(supportedDrivers);
            });
        })["catch"](function () {
            setDriverToConfig();
            var error = new Error('No available storage method found.');
            self._driverSet = Promise$1.reject(error);
            return self._driverSet;
        });

        executeTwoCallbacks(this._driverSet, callback, errorCallback);
        return this._driverSet;
    };

    LocalForage.prototype.supports = function supports(driverName) {
        return !!DriverSupport[driverName];
    };

    LocalForage.prototype._extend = function _extend(libraryMethodsAndProperties) {
        extend(this, libraryMethodsAndProperties);
    };

    LocalForage.prototype._getSupportedDrivers = function _getSupportedDrivers(drivers) {
        var supportedDrivers = [];
        for (var i = 0, len = drivers.length; i < len; i++) {
            var driverName = drivers[i];
            if (this.supports(driverName)) {
                supportedDrivers.push(driverName);
            }
        }
        return supportedDrivers;
    };

    LocalForage.prototype._wrapLibraryMethodsWithReady = function _wrapLibraryMethodsWithReady() {
        // Add a stub for each driver API method that delays the call to the
        // corresponding driver method until localForage is ready. These stubs
        // will be replaced by the driver methods as soon as the driver is
        // loaded, so there is no performance impact.
        for (var i = 0, len = LibraryMethods.length; i < len; i++) {
            callWhenReady(this, LibraryMethods[i]);
        }
    };

    LocalForage.prototype.createInstance = function createInstance(options) {
        return new LocalForage(options);
    };

    return LocalForage;
}();

// The actual localForage object that we expose as a module or via a
// global. It's extended by pulling in one of our other libraries.


var localforage_js = new LocalForage();

module.exports = localforage_js;

},{"3":3}]},{},[4])(4)
});
}(localforage$1));

var localforage = localforage$1.exports;

function uuid(a){return a?(a^Math.random()*16>>a/4).toString(16):([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g,uuid)}

const SAVE_STATE_LOCAL = 'SAVED_LOCALLY';
const SAVE_STATE_SERVER = 'SAVED_TO_SERVER';

class Model extends EventHarness {
    /**
     * @type {string}
     */
    _id;

    /**
     * set if the object has been posted to the server
     *
     * @type {boolean}
     */
    _savedRemotely = false;

    static EVENT_SAVED_REMOTELY = 'savedremotely';

    /**
     *
     * @param {Boolean} savedFlag
     */
    set savedRemotely(savedFlag) {
        if (this._savedRemotely !== savedFlag) {
            this._savedRemotely = !!savedFlag;

            if (this._savedRemotely) {
                this.fireEvent(Model.EVENT_SAVED_REMOTELY, {id : this.id});
            }
        }
    }

    /**
     * set if the object has been added to a temporary store (e.g. indexedDb)
     *
     * @type {boolean}
     */
    _savedLocally = false;

    /**
     *
     * @type {boolean}
     */
    deleted = false;

    /**
     * unix timestamp
     * Provided that the created stamp is < the modified stamp then the externally assigned creation stamp will be used
     *
     * @type {number}
     */
    createdStamp;

    /**
     * unix timestamp
     * modified stamp is generally server assigned - rather than using a potentially discrepant client clock
     * this may increase synchrony and trust between distributed clients
     *
     * @type {number}
     */
    modifiedStamp;

    /**
     * DDb AppProject id
     *
     * @type {number}
     */
    projectId;

    /**
     * paired with isNew this marks records that have never been edited
     *
     * @type {boolean}
     */
    isPristine = false;

    constructor() {
        super();

        this.createdStamp = Math.floor(Date.now() / 1000);
    }

    /**
     * returns true if either remote or local copy is missing
     *
     * @returns {boolean}
     */
    unsaved() {
        return !(this._savedLocally && this._savedRemotely);
    }

    /**
     * string
     */
    get id() {
        if (!this._id) {
            this._id = uuid();
        } else if (this._id === 'undefined') {
            console.error("id is literal 'undefined', am forcing new id");
            this._id = uuid();
        }

        return this._id;
    }

    /**
     *
     * @param {string} newId
     */
    set id(newId) {
        // only allow an id to be set if not present already

        if (this._id && newId !== this._id) {
            throw new Error(`Occurrence id has already been set, when trying to set new id '${newId}'.`);
        }
        this._id = newId;
    }

    /**
     *
     * @type {Array.<function>}
     * @private
     */
    static _tasks = [];

    /**
     * Add a post request to the queue
     * Requests run in sequence.
     * Returns a promise that resolves once the queued request completes
     *
     * The queue reduces the chance of requests being sent to the server out-of-order (which can lead to race conditions)
     *
     * @param formData
     * @returns {Promise}
     */
    queuePost(formData) {
        return new Promise((resolve, reject) => {
            /**
             * @returns {Promise}
             */
            const task = () => {
                console.log({'posting form data': formData});
                return this.post(formData).then(resolve, reject);
            };

            Model._tasks.push(task);

            if (Model._tasks.length > 1) {
                console.log(`Added post request to the queue.`);
            } else {
                console.log(`No pending tasks, starting post request immediately.`);
                task().finally(Model._next);
            }
        });
    }

    /**
     *
     * @returns {Promise}
     * @private
     */
    static _next() {
        Model._tasks.shift(); // save is done

        if (Model._tasks.length) {
            // run the next task
            console.log('Running the next task.');
            return Model._tasks[0]().finally(Model._next);
        }
    }

    /**
     * if not securely saved then makes a post to /save<object>
     *
     * this may be intercepted by a service worker, which could write the image to indexdb
     * a successful save will result in a json response containing the uri from which the image may be retrieved
     * and also the state of persistence (whether or not the image was intercepted by a service worker while offline)
     *
     * if saving fails then the expectation is that there is no service worker, in which case should attempt to write
     * the image directly to indexdb
     *
     * must test indexdb for this eventuality after the save has returned
     *
     * @param {FormData} formData
     * @returns {Promise}
     */
    post(formData) {
        return fetch(this.SAVE_ENDPOINT, {
            method: 'POST',
            body: formData
        }).then(response => {
            if (response.ok) {
                // need to find out whether this was a local store in indexedDb by the service worker
                // or a server-side save

                // to do that need to decode the json response
                // which can only be done once, so need to clone first
                const clonedResponse = response.clone();
                return clonedResponse.json().then((responseData) => {
                    /** @param {{saveState : string, created : number, modified : number}} responseData */

                    console.log({'returned to client after save' : responseData});

                    switch (responseData.saveState) {
                        case SAVE_STATE_SERVER:
                            this._savedLocally = true;
                            //this._savedRemotely = true;
                            this.savedRemotely = true;
                            break;

                        case SAVE_STATE_LOCAL:
                            this._savedLocally = true;
                            //this._savedRemotely = false;
                            this.savedRemotely = false;
                            break;

                        default:
                            console.log(`Unrecognised save state '${responseData.saveState}'`);
                    }

                    this.createdStamp = parseInt(responseData.created, 10);
                    this.modifiedStamp = parseInt(responseData.modified, 10);

                    // return the json version of the original response as a promise
                    return response.json(); // assign appropriate JSON type to the response
                });
            } else {
                // try instead to write the data to local storage

                console.log('Save failed, presumably service worker is missing and there is no network connection. Should write to IndexedDb here.');
                return Promise.reject('IndexedDb storage not yet implemented');
            }
        });
    }

    /**
     *
     * @param {string} id
     * @param {(Survey|Occurrence|OccurrenceImage)} modelObject
     * @returns {Promise}
     */
    static retrieveFromLocal(id, modelObject) {
        return localforage.getItem(`${modelObject.TYPE}.${id}`)
            .then((descriptor) => {
                if (descriptor) {
                    modelObject.id = id;
                    modelObject._parseDescriptor(descriptor);

                    return modelObject;
                } else {
                    return Promise.reject(`Failed to retrieve ${modelObject.TYPE}.${id} locally`);
                }
            });
    }

    /**
     *
     * @param {{id : string, saveState: string, attributes: Object.<string, *>, deleted: boolean|string, created: (number|string), modified: (number|string), projectId: (number|string)}} descriptor
     */
    _parseDescriptor(descriptor) {
        this._parseAttributes(descriptor.attributes);
        this._parseSavedState(descriptor.saveState);
        this.deleted = (descriptor.deleted === true) || (descriptor.deleted === 'true'); // cast stringified boolean to true boolean
        this.createdStamp = parseInt(descriptor.created, 10);
        //this.modifiedStamp = descriptor.modified ? parseInt(descriptor.modified, 10) : this.createdStamp; // avoids NaN
        this.modifiedStamp = descriptor.modified ? parseInt(descriptor.modified, 10) : 0; // avoids NaN
        this.projectId = parseInt(descriptor.projectId, 10);
    }

    /**
     *
     * @param {Object.<string, {}>|string|Array} attributes
     */
    _parseAttributes(attributes) {
        if (typeof attributes === 'string') {
            attributes = JSON.parse(attributes);
        }

        if (Array.isArray(attributes)) {
            // problematic bug, where empty attributes come back as an array rather than as an object

            console.log('Attributes were spuriously represented as an array rather than as an empty object');
            this.attributes = {};
        } else {
            this.attributes = attributes;
        }
    }

    /**
     *
     * @param {string} saveState
     */
    _parseSavedState(saveState) {
        switch (saveState) {
            case SAVE_STATE_LOCAL:
                //this._savedRemotely = false;
                this.savedRemotely = false;
                this._savedLocally = true;
                break;

            case SAVE_STATE_SERVER:
                //this._savedRemotely = true;
                this.savedRemotely = true;
                this._savedLocally = true;
                break;

            default:
                throw new Error(`Unrecognised saved state '${saveState}`);
        }
    }

    /**
     * update modified stamp to current time
     */
    touch() {
        this.modifiedStamp = Math.floor(Date.now() / 1000);

        if (this.isPristine) {
            this.isPristine = false;
            this.createdStamp = this.modifiedStamp;
        }

        this._savedLocally = false;
        //this._savedRemotely = false;
        this.savedRemotely = false;
    }

    /**
     *
     * @param {{}} formSectionProperties
     * @return {{requiredFieldsPresent: boolean, validity: Object.<string, boolean>}}
     */
    evaluateCompletionStatus(formSectionProperties) {
        const validity = {};
        let requiredFieldsPresent = true;

        for (let key in formSectionProperties) {
            if (formSectionProperties.hasOwnProperty(key)) {
                let property = formSectionProperties[key];

                validity[key] = property.validator ?
                    property.validator(key, property, this.attributes)
                    :
                    property.field.isValid(key, property, this.attributes);

                if (null !== validity[key]) {
                    // validity can be 'null' in which case field was optional and not assessed
                    requiredFieldsPresent = requiredFieldsPresent && validity[key];
                }
            }
        }

        return {
            requiredFieldsPresent,
            validity
        };
    }
}

class TaxonError extends Error {

}

/**
 *
 * @param text
 * @returns {string}
 */
function escapeHTML(text) {
    try {
        // IE (even v 11) sometimes fails here with 'Unknown runtime error', see http://blog.rakeshpai.me/2007/02/ies-unknown-runtime-error-when-using.html
        const textArea = document.createElement('textarea');
        textArea.innerHTML = text;
        return textArea.innerHTML.replace(/"/g, '&quot;');
    } catch (e) {
        const pre = document.createElement('pre');
        pre.appendChild(document.createTextNode(text));
        return pre.innerHTML.replace(/"/g, '&quot;');
    }
}

//import BsbiDb from "BsbiDb";

/**
 * @external BsbiDb
 */

class Taxon {
    /**
     * @typedef RawTaxon
     * @type {array}
     * @property {string} 0 - nameString
     * @property {(string|number)} 1 - canonical
     * @property {string} 2 hybridCanonical, raw entry is 0 if canonical == hybridCanonical
     * @property {(string|number)} 3 acceptedEntityId or 0 if name is accepted
     * @property {string} 4 qualifier
     * @property {string} 5 authority
     * @property {string} 6 vernacular
     * @property {string} 7 vernacularRoot
     * @property {number} 8 used
     * @property {number} 9 sortOrder
     * @property {Array.<string>} 10 parentIds
     */

    /**
     *
     * @type {Object.<string, RawTaxon>}
     */
    static rawTaxa; // = BsbiDb.TaxonNames;

    /**
     * @type {string}
     */
    id;

    /**
     *
     * @type {string}
     */
    nameString = '';

    /**
     *
     * @type {string}
     */
    canonical = '';

    /**
     *
     * @type {string}
     */
    hybridCanonical = '';

    /**
     *
     * @type {string}
     */
    acceptedEntityId = '';

    /**
     *
     * @type {string}
     */
    qualifier = '';

    /**
     *
     * @type {string}
     */
    authority = '';

    /**
     *
     * @type {string}
     */
    vernacular = '';

    /**
     *
     * @type {string}
     */
    vernacularRoot = '';

    /**
     * @type {boolean}
     */
    used;

    /**
     * @type {number}
     */
    sortOrder;

    /**
     *
     * @type {Array.<string>}
     */
    parentIds = [];

    /**
     *
     * @type {boolean}
     */
    static showVernacular = true;

    /**
     *
     * @param {string} id
     * @returns {Taxon}
     * @throws {TaxonError}
     */
    static fromId (id) {
        if (!Taxon.rawTaxa) {
            // may not yet have been initialised due to deferred loading

            if (BsbiDb.TaxonNames) {
                Taxon.rawTaxa = BsbiDb.TaxonNames;
            } else {
                throw new TaxonError(`Taxon.fromId() called before taxon list has loaded.`);
            }
        }

        if (!Taxon.rawTaxa.hasOwnProperty(id)) {
            throw new TaxonError(`Taxon id '${id}' not found.`);
        }

        const raw = Taxon.rawTaxa[id];

        const taxon = new Taxon;

        taxon.id = id;
        taxon.nameString = raw[0];
        taxon.canonical = raw[1] || raw[0]; // raw entry is blank if namesString == canonical
        taxon.hybridCanonical = raw[2] || taxon.canonical; // raw entry is blank if canonical == hybridCanonical
        taxon.acceptedEntityId = raw[3] || id;
        taxon.qualifier = raw[4];
        taxon.authority = raw[5];
        taxon.vernacular = raw[6];
        taxon.vernacularRoot = raw[7];
        taxon.used = raw[8];
        taxon.sortOrder = raw[9];
        taxon.parentIds = raw[10];

        return taxon;
    }

    /**
     *
     * @param {boolean} vernacularMatched
     * @returns {string}
     */
    formattedHTML(vernacularMatched) {
        let acceptedTaxon;
        if (this.id !== this.acceptedEntityId) {
            acceptedTaxon = Taxon.fromId(this.acceptedEntityId);
        }

        {
            if (vernacularMatched) {
                return (acceptedTaxon) ?
                    `<q class="taxon-vernacular">${escapeHTML(this.vernacular)}</q><wbr> <span class="italictaxon">${this.nameString}${this.qualifier ? ` <span class="taxon-qualifier">${this.qualifier}</span>` : ''}</span> <span class="taxauthority">${escapeHTML(this.authority)}</span>` +
                        ` = <span class="italictaxon">${acceptedTaxon.nameString}${acceptedTaxon.qualifier ? ` <span class="taxon-qualifier">${acceptedTaxon.qualifier}</span>` : ''}</span> <span class="taxauthority">${escapeHTML(acceptedTaxon.authority)}</span>`
                    :
                    `<q class="taxon-vernacular">${escapeHTML(this.vernacular)}</q><wbr> <span class="italictaxon">${this.nameString}${this.qualifier ? ` <span class="taxon-qualifier">${this.qualifier}</span>` : ''}</span> <span class="taxauthority">${escapeHTML(this.authority)}</span>`
                    ;
            } else {
                return (acceptedTaxon) ?
                    `<span class="italictaxon">${this.nameString}${this.qualifier ? ` <span class="taxon-qualifier">${this.qualifier}</span>` : ''}</span> <span class="taxauthority">${this.authority}</span>${this.vernacular ? ` <wbr><q class="taxon-vernacular">${escapeHTML(this.vernacular)}</q>` : ''
                        } = <span class="italictaxon">${acceptedTaxon.nameString}${acceptedTaxon.qualifier ? ` <span class="taxon-qualifier">${acceptedTaxon.qualifier}</span>` : ''}</span> <span class="taxauthority">${escapeHTML(acceptedTaxon.authority)}</span>`
                    :
                    `<span class="italictaxon">${this.nameString}${this.qualifier ? ` <span class="taxon-qualifier">${this.qualifier}</span>` : ''}</span> <span class="taxauthority">${escapeHTML(this.authority)}</span>${this.vernacular ? ` <wbr><q class="taxon-vernacular">${escapeHTML(this.vernacular)}</q>` : ''}`
                    ;
            }
        }
    }
}

class FormField extends EventHarness {

    _value = null;

    /**
     * overall wrapped field element (not necessarily the form element itself)
     *
     * @type {HTMLElement}
     */
    _fieldEl;

    /**
     *
     * @type {string}
     */
    label = 'field label';

    /**
     *
     * @type {string}
     */
    helpText = '';

    /**
     * validation message - displayed if field is not valid
     * HTML string
     *
     * @type {string}
     */
    validationMessage = '';

    /**
     *
     * @type {string}
     */
    static COMPLETION_COMPULSORY = 'compulsory';
    static COMPLETION_DESIRED = 'desired';
    static COMPLETION_OPTIONAL = 'optional';

    /**
     *
     * @type {string}
     */
    completion = FormField.COMPLETION_OPTIONAL;

    static #fieldIdIndex = 1;

    static EVENT_CHANGE = 'fieldChange';

    /**
     *
     * @param {{[label] : string, [helpText]: string, [validationMessage]: string, [completion]: string}} [params]
     */
    constructor (params) {
        super();

        if (params) {
            if (params.label) {
                this.label = params.label;
            }

            if (params.helpText) {
                this.helpText = params.helpText;
            }

            if (params.validationMessage) {
                this.validationMessage = params.validationMessage;
            }

            if (params.completion) {
                // @see COMPLETION_COMPULSORY, COMPLETION_DESIRED, COMPLETION_OPTIONAL
                this.completion = params.completion;
            }
        }
    }

    static get nextId() {
        return `field${FormField.#fieldIdIndex++}`;
    }

    get value() {
        return this._value;
    }

    /**
     * @abstract
     * @param value
     */
    set value(value) {

    }

    get fieldElement() {
        if (!this._fieldEl) {
            this.buildField();
        }

        return this._fieldEl;
    }

    /**
     * @type {Form}
     */
    parentForm;

    /**
     * @type {string}
     */
    attributeName;

    /**
     *
     * @param {HTMLElement} contentContainer
     */
    addField(contentContainer) {
        // const formEl = this.parentForm.formElement;
        //
        // formEl.appendChild(this.fieldElement);

        contentContainer.appendChild(this.fieldElement);
    }

    /**
     *
     * @param {boolean} isValid
     */
    markValidity(isValid) {

    }

    /**
     *
     * @param {HTMLInputElement} inputElement
     * @returns {string}
     */
    static cleanRawInput(inputElement) {
        return inputElement.value.trim().replace(/\s\s+/g, ' ');
    }

    /**
     *
     * @param {string} text
     * @returns {string}
     */
    static cleanRawString(text) {
        return text.trim().replace(/\s\s+/g, ' ');
    }

    /**
     *
     * @param value
     * @returns {boolean}
     */
    static isEmpty(value) {
        return value === '' || value === undefined || value === null;
    }

    /**
     *
     * @param {string} key
     * @param property properties of the form descriptor
     * @param attributes attributes of the model object
     * @return {(boolean|null)} returns null if validity was not assessed
     */
    static isValid(key, property, attributes) {
        //console.log(`FormField isValid for '${key}'`);

        if (property.attributes.completion &&
            (property.attributes.completion === FormField.COMPLETION_COMPULSORY || property.attributes.completion === FormField.COMPLETION_DESIRED)
        ) {
            // test whether required field is missing
            return !(!attributes.hasOwnProperty(key) ||
                property.field.isEmpty(attributes[key])
            );
        }
        // field is present or optional
        // report as valid unless content is corrupt

        return null; // field not assessed
    }

    /**
     *
     * @param {string} key
     * @param {{field : typeof FormField, [summary] : {}}} property properties of the form descriptor
     * @param attributes attributes of the model object
     * @return {string}
     */
    static summarise(key, property, attributes) {
        if (property.summary && (!property.summary.hasOwnProperty('summarise') || true === property.summary.summarise)) {
            // test is that summary spec object exists and doesn't have the summarise flag set to false
            // return property.field.summariseImpl(key, property, attributes);

            if (property.summarise) {
                return property.summarise(key, property, attributes);
            } else {
                return property.field.summariseImpl(key, property, attributes);
            }
        } else {
            return '';
        }
    }

    /**
     * by the time summariseImpl has been called have already checked that summary is wanted
     *
     * @param {string} key
     * @param {{field : FormField, [attributes]: {}, summary : {}}} property properties of the form descriptor
     * @param {{}} attributes attributes of the model object
     * @returns {string}
     */
    static summariseImpl(key, property, attributes) {
        return '';
    }
}

class Form extends EventHarness {

    static CHANGE_EVENT = 'change';

    /**
     * Fired instead of EVENT_INITIALISED for a newly created entry
     * @type {string}
     */
    static EVENT_INITIALISE_NEW = 'initialisenew';

    /**
     * Fired after the model content has been applied to a form
     * @type {string}
     */
    static EVENT_INITIALISED = 'initialised';

    static EVENT_CAMERA = 'cameraimage';

    /**
     * @type {HTMLElement}
     */
    #formEl;

    /**
     *
     * @type {number}
     */
    static #formSerial = 0;

    /**
     *
     * @protected
     * @type {string}
     */
    _formId;

    /**
     * container into which field contents should be inserted
     *
     * @protected
     * @type {HTMLElement}
     */
    _formContentContainer;

    /**
     * @type {Object.<string, FormField>}
     */
    fields;

    /**
     * if set then form should be validated whenever it changes
     *
     * @type {boolean}
     */
    liveValidation = false;

    /**
     * set if all required form fields are complete and valid
     * (starting point is null while form is empty - so that the first validation check results in a validation change event firing)
     *
     * @type {(boolean|null)}
     */
    isValid = null;

    /**
     *
     * @type {string|null}
     */
    nextButtonId = null;

    /**
     *
     * @type {boolean}
     * @protected
     */
    _formFieldsBuilt = false;

    static EVENT_VALIDATION_STATE_CHANGE = 'validationstatechange';

    /**
     *
     * @returns {HTMLElement}
     */
    get formElement() {
        if (!this.#formEl) {
            this.#formEl = document.createElement('form');
            this.#formEl.id = this._formId = `form${Form.#formSerial++}`;
            this.#formEl.noValidate = true; // bootstrap overrides browser-based validation

            if (this.liveValidation) {
                this.#formEl.className = 'needs-validation';
            }

            this.buildContentContainer(this.#formEl);
            //this._formContentContainer = this.#formEl; // currently the form doesn't have any inner liner elements

            this.#formEl.addEventListener('change', (event) => {
                this.changeHandler(event);
            }, {capture: false});
        }

        return this.#formEl;
    }

    /**
     * sets this._formContentContainer to the container that should contain the form fields
     *
     * if no wrapper then can re-use the outer container id (this.#formEl
     */
    buildContentContainer(outerContainer) {
        this._formContentContainer = outerContainer; // default form doesn't have any inner liner elements

        return this._formContentContainer
    }

    changeHandler(params) {
        console.log({'form change event' : params});
    }

    destructor() {
        super.destructor();
        this.#formEl = null;
    }

    static #idIndex = 0;

    static get nextId() {
        return `id${Form.#idIndex++}`;
    }

    static COMPLETION_STATUS_UNSTARTED = 'unstarted';
    static COMPLETION_STATUS_COMPLETE = 'complete';
    static COMPLETION_STATUS_IN_PROGRESS = 'inProgress';

    /**
     *
     */
    buildFormFields() {
        this.initialiseFormFields();

        for (let key in this.fields) {
            if (this.fields.hasOwnProperty(key)) {
                let field = this.fields[key];

                field.parentForm = this;
                field.attributeName = key;
                //this._formContentContainer.appendChild(field.fieldElement);

                field.addField(this._formContentContainer);

                field.addListener(FormField.EVENT_CHANGE, this.changeHandler.bind(this));
            }
        }

        this._formFieldsBuilt = true;
    }

    /**
     * called after a form change once the model has been updated
     * validation is only applied if the form is subject to live validation
     */
    conditionallyValidateForm() {
        console.log('called conditionallyValidateForm');

        if (this.liveValidation) {
            console.log('doing validation conditionallyValidateForm');
            this.validateForm();
        }
    }

    /**
     * similar to validateForm but does not update form validity UI
     * @returns {boolean}
     */
    testRequiredComplete() {
        const validityResult =  this.model.evaluateCompletionStatus(this.getFormSectionProperties()).requiredFieldsPresent;

        if (this.isValid !== validityResult) {
            this.isValid = validityResult;

            this.fireEvent(Form.EVENT_VALIDATION_STATE_CHANGE, {isValid : this.isValid});
        }

        return validityResult;
    }

    /**
     *
     * @returns {boolean}
     */
    validateForm() {
        if (this.liveValidation) {
            this.formElement.classList.add('needs-validation'); // add a bootstrap class marking that the form should be subject to validation
        }
        const validationResult = this.model.evaluateCompletionStatus(this.getFormSectionProperties());

        for (let key in this.fields) {
            if (this.fields.hasOwnProperty(key)) {
                let field = this.fields[key];

                field.markValidity(validationResult.validity[key]);
            }
        }

        if (this.isValid !== validationResult.requiredFieldsPresent) {
            this.isValid = validationResult.requiredFieldsPresent;

            this.fireEvent(Form.EVENT_VALIDATION_STATE_CHANGE, {isValid : this.isValid});
        }
        return validationResult.requiredFieldsPresent;
    }

    /**
     * fills in the form fields based on the model
     */
    populateFormContent() {
        if (this._formFieldsBuilt) {
            // throw new Error("populateFormContent shouldn't be called until fields have been initialised");

            const model = this.model;
            for (let key in this.fields) {
                if (this.fields.hasOwnProperty(key)) {
                    let field = this.fields[key];
                    field.value = model.attributes[key]; // value setter will update the field
                }
            }

            this.conditionallyValidateForm();
        }
    }

    /**
     * @abstract
     */
    updateModelFromContent() {

    }
}

class Occurrence extends Model {

    /**
     *
     * @type {Object.<string, *>}
     */
    attributes = {
        // taxon: {
        //     taxonId: '',
        //     taxonName: '',
        //     vernacularMatch: false
        // }
    };

    // /**
    //  * set if the image has been posted to the server
    //  * (a local copy might still exist, which may have been reduced to thumbnail resolution)
    //  *
    //  * @type {boolean}
    //  */
    // _savedRemotely = false;

    // /**
    //  * set if the image has been added to a temporary store (e.g. indexedDb)
    //  *
    //  * @type {boolean}
    //  */
    // _savedLocally = false;

    SAVE_ENDPOINT = '/saveoccurrence.php';

    TYPE = 'occurrence';

    /**
     * fired from Occurrence when the object's contents have been modified
     *
     * @type {string}
     */
    static EVENT_MODIFIED = 'modified';

    /**
     * set if this is a new entry (before user has moved on to the next entry)
     * influences whether form validation errors are displayed
     *
     * @type {boolean}
     */
    isNew = false;

    /**
     *
     * @returns {(Taxon|null)} returns null for unmatched taxa specified by name
     */
    get taxon() {
        return this.attributes.taxon && this.attributes.taxon.taxonId ? Taxon.fromId(this.attributes.taxon.taxonId) : null;
    };

    /**
     *
     * @param {OccurrenceForm} form
     * @returns {OccurrenceForm}
     */
    setForm(form) {
        form.addListener(Form.CHANGE_EVENT, this.formChangedHandler.bind(this));

        if (!this.isNew) {
            form.liveValidation = true;
        }
        return form;
    }

    /**
     * called after the form has changed, before the values have been read back in to the occurrence
     *
     * @param {{form: Form}} params
     */
    formChangedHandler(params) {
        console.log('Occurrence change handler invoked.');

        // read new values
        // then fire it's own change event (Occurrence.EVENT_MODIFIED)
        params.form.updateModelFromContent();

        // refresh the form's validation state
        params.form.conditionallyValidateForm();

        this.touch();
        this.fireEvent(Occurrence.EVENT_MODIFIED, {occurrenceId : this.id});
    }

    delete() {
        if (!this.deleted) {
            this.touch();
            this.deleted = true;

            this.fireEvent(Occurrence.EVENT_MODIFIED, {occurrenceId : this.id});
        }
    }

    /**
     * if not securely saved then makes a post to /saveoccurrence.php
     *
     * this may be intercepted by a service worker, which could write the image to indexdb
     * a successful save will result in a json response containing the uri from which the image may be retrieved
     * and also the state of persistence (whether or not the image was intercepted by a service worker while offline)
     *
     * if saving fails then the expectation is that there is no service worker, in which case should attempt to write
     * the image directly to indexdb
     *
     * must test indexdb for this eventuality after the save has returned
     *
     * @param {string} surveyId
     * @returns {Promise}
     */
    save(surveyId) {
        if (!this._savedRemotely) {
            const formData = new FormData;

            if (!surveyId && this.surveyId) {
                surveyId = this.surveyId;
            }

            formData.append('type', this.TYPE);
            formData.append('surveyId', surveyId);
            formData.append('occurrenceId', this.id);
            formData.append('id', this.id);
            formData.append('projectId', this.projectId.toString());
            formData.append('attributes', JSON.stringify(this.attributes));
            formData.append('deleted', this.deleted.toString());
            formData.append('created', this.createdStamp.toString());

            console.log('queueing occurrence post');
            return this.queuePost(formData);
        } else {
            return Promise.reject(`${this.id} has already been saved.`);
        }
    }

    /**
     *
     * @param {{id : string, saveState: string, attributes: Object.<string, *>, deleted: boolean|string, created: number, modified: number, projectId: number, surveyId: string}} descriptor
     */
    _parseDescriptor(descriptor) {
        super._parseDescriptor(descriptor);
        this.surveyId = descriptor.surveyId;
    }
}

/**
 *
 */
class InternalAppError extends Error {

}

// Page

class Page extends EventHarness {

    /**
     * @type {AppController}
     */
    controller;

    /**
     * called once during late-stage app initialisation
     * (NB this may not be the current view when called)
     *
     * an opportunity to register listeners on this.controller.app
     */
    initialise() {

    }

    // /**
    //  *
    //  * @param {HTMLElement} containerEl
    //  */
    // static initialise_layout(containerEl) {
    //
    // }

    display() {
        console.log('got to view display');

        // these serve as hook points for child classes
        this.refreshHeader();
        this.body();
    }

    refreshHeader() {

    }

    body() {

    }

    /**
     *
     * @param {{}} descriptor
     * @param {string} descriptor.cardId
     * @param {string} descriptor.cardHeadingId
     * @param {boolean} descriptor.collapsed
     * @param {string} descriptor.headingButtonId
     * @param {string} descriptor.headingHTML
     * @param {string} [descriptor.headingNonbuttonHTML]
     * @param {string} descriptor.cardDescriptionId
     * @param {string} descriptor.parentContainerId
     * @param {string} descriptor.buttonStyleString
     * @param {HTMLElement} descriptor.bodyContentElement
     * @param {{string, string}} descriptor.dataAttributes
     * @param {string} descriptor.headingValidationWarningHTML
     *
     * @returns {HTMLDivElement}
     */
    accordionItem(descriptor) {
        let cardContainer = document.createElement('div');
        cardContainer.id = descriptor.cardId;
        cardContainer.className = 'accordion-item';

        let cardHeadingEl = cardContainer.appendChild(document.createElement('div'));
        cardHeadingEl.className = 'accordion-header pointer';
        if (descriptor.cardHeadingId) {
            cardHeadingEl.id = descriptor.cardHeadingId;
        }

        let headingEl = cardHeadingEl.appendChild(document.createElement('h2'));
        headingEl.className = 'mb-0';

        let buttonEl = headingEl.appendChild(document.createElement('button'));
        //buttonEl.className = `btn btn-link${(descriptor.collapsed ? ' collapsed' : '')}`;
        buttonEl.className = `accordion-button${(descriptor.collapsed ? ' collapsed' : '')}`;

        buttonEl.setAttribute('data-bs-toggle', 'collapse');
        //buttonEl.setAttribute('data-bs-target', `#${descriptor.cardDescriptionId}`);

        if (descriptor.headingButtonId) {
            buttonEl.id = descriptor.headingButtonId;
        }

        buttonEl.type = 'button';
        //buttonEl.setAttribute('data-bs-toggle', 'collapse');

        if (descriptor.buttonStyleString) {
            buttonEl.style.cssText = descriptor.buttonStyleString;
        }

        if (descriptor.cardDescriptionId) {
            buttonEl.setAttribute('data-bs-target', `#${descriptor.cardDescriptionId}`);
            buttonEl.setAttribute('aria-controls', descriptor.cardDescriptionId);
        }

        buttonEl.setAttribute('aria-expanded', descriptor.collapsed ? 'false' : 'true');
        buttonEl.innerHTML = `<div class="material-icons icon-show-collapsed">expand_more</div><div class="material-icons icon-hide-collapsed">unfold_less</div>${descriptor.headingHTML}`;

        if (descriptor.headingNonbuttonHTML) {
            const extraHeadingElement = buttonEl.appendChild(document.createElement('span'));
            extraHeadingElement.style.display = 'flex';
            extraHeadingElement.innerHTML = descriptor.headingNonbuttonHTML;
        }

        if (descriptor.headingValidationWarningHTML) {
            const headerValidationWarning = cardHeadingEl.appendChild(document.createElement('div'));
            headerValidationWarning.className = 'card-invalid-feedback';
            headerValidationWarning.innerHTML = `<small>${descriptor.headingValidationWarningHTML}</small>`;
        }

        let cardDescriptionEl = cardContainer.appendChild(document.createElement('div'));
        if (descriptor.cardDescriptionId) {
            cardDescriptionEl.id = descriptor.cardDescriptionId;
        }
        cardDescriptionEl.className = `accordion-collapse collapse${(descriptor.collapsed ? '' : ' show')}`;
        if (descriptor.cardHeadingId) {
            cardDescriptionEl.setAttribute('aria-labelledby', descriptor.cardHeadingId);
        }

        cardDescriptionEl.setAttribute('data-bs-parent', `#${descriptor.parentContainerId}`);

        if (descriptor.dataAttributes) {
            for (let key in descriptor.dataAttributes) {
                if (descriptor.dataAttributes.hasOwnProperty(key)) {
                    cardDescriptionEl.setAttribute(`data-${key}`, descriptor.dataAttributes[key]);
                }
            }
        }

        let cardBodyEl = cardDescriptionEl.appendChild(document.createElement('div'));
        cardBodyEl.className = 'accordion-body ps-2 pe-2 ps-md-3 pe-md-3';
        cardBodyEl.appendChild(descriptor.bodyContentElement);

        return cardContainer;
    }

    /**
     *
     * @param {{}} descriptor
     * @param {string} descriptor.cardId
     * @param {string} descriptor.cardHeadingId
     * @param {boolean} descriptor.collapsed
     * @param {string} descriptor.headingButtonId
     * @param {string} descriptor.headingHTML
     * @param {string} [descriptor.headingNonbuttonHTML]
     * @param {string} descriptor.cardDescriptionId
     * @param {string} descriptor.parentContainerId
     * @param {string} descriptor.buttonStyleString
     * @param {HTMLElement} descriptor.bodyContentElement
     * @param {{string, string}} descriptor.dataAttributes
     * @param {string} descriptor.headingValidationWarningHTML
     *
     * @returns {HTMLDivElement}
     */
    card(descriptor) {
        let cardContainer = document.createElement('div');
        cardContainer.id = descriptor.cardId;
        cardContainer.className = 'card';

        let cardHeadingEl = cardContainer.appendChild(document.createElement('div'));
        cardHeadingEl.className = 'card-header pointer';
        if (descriptor.cardHeadingId) {
            cardHeadingEl.id = descriptor.cardHeadingId;
        }
        cardHeadingEl.setAttribute('data-bs-toggle', 'collapse');
        cardHeadingEl.setAttribute('data-bs-target', `#${descriptor.cardDescriptionId}`);


        let headingEl = cardHeadingEl.appendChild(document.createElement('h2'));
        headingEl.className = 'mb-0';

        let buttonEl = headingEl.appendChild(document.createElement('button'));
        buttonEl.className = `btn btn-link${(descriptor.collapsed ? ' collapsed' : '')}`;

        if (descriptor.headingButtonId) {
            buttonEl.id = descriptor.headingButtonId;
        }

        buttonEl.type = 'button';
        buttonEl.setAttribute('data-bs-toggle', 'collapse');

        if (descriptor.buttonStyleString) {
            buttonEl.style.cssText = descriptor.buttonStyleString;
        }

        if (descriptor.cardDescriptionId) {
            buttonEl.setAttribute('data-bs-target', `#${descriptor.cardDescriptionId}`);
            buttonEl.setAttribute('aria-controls', descriptor.cardDescriptionId);
        }

        buttonEl.setAttribute('aria-expanded', descriptor.collapsed ? 'false' : 'true');
        buttonEl.innerHTML = `<div class="material-icons icon-show-collapsed">expand_more</div><div class="material-icons icon-hide-collapsed">unfold_less</div>${descriptor.headingHTML}`;

        if (descriptor.headingNonbuttonHTML) {
            const extraHeadingElement = headingEl.appendChild(document.createElement('span'));
            extraHeadingElement.style.display = 'inline-block';
            extraHeadingElement.innerHTML = descriptor.headingNonbuttonHTML;
        }

        if (descriptor.headingValidationWarningHTML) {
            const headerValidationWarning = cardHeadingEl.appendChild(document.createElement('div'));
            headerValidationWarning.className = 'card-invalid-feedback';
            headerValidationWarning.innerHTML = `<small>${descriptor.headingValidationWarningHTML}</small>`;
        }

        let cardDescriptionEl = cardContainer.appendChild(document.createElement('div'));
        if (descriptor.cardDescriptionId) {
            cardDescriptionEl.id = descriptor.cardDescriptionId;
        }
        cardDescriptionEl.className = `collapse${(descriptor.collapsed ? '' : ' show')}`;
        if (descriptor.cardHeadingId) {
            cardDescriptionEl.setAttribute('aria-labelledby', descriptor.cardHeadingId);
        }

        cardDescriptionEl.setAttribute('data-parent', `#${descriptor.parentContainerId}`);

        if (descriptor.dataAttributes) {
            for (let key in descriptor.dataAttributes) {
                if (descriptor.dataAttributes.hasOwnProperty(key)) {
                    cardDescriptionEl.setAttribute(`data-${key}`, descriptor.dataAttributes[key]);
                }
            }
        }

        let cardBodyEl = cardDescriptionEl.appendChild(document.createElement('div'));
        cardBodyEl.className = 'card-body ps-2 pe-2 ps-md-3 pe-md-3';
        cardBodyEl.appendChild(descriptor.bodyContentElement);

        return cardContainer;

    //         `<div class="card-header" id="heading_${occurrence.id}">
    //   <h2 class="mb-0">
    //     <button class="btn btn-link${(this.controller.currentOccurrenceId === occurrence.id ? '' : ' collapsed')}" id="headingbutton_${occurrence.id}" type="button" data-bs-toggle="collapse" data-bs-target="#description_${occurrence.id}" aria-expanded="true" aria-controls="description_${occurrence.id}">
    //       Heading for (${occurrence.id}, ${taxon.canonical})
    //     </button>
    //   </h2>
    // </div>
    //
    // <div id="description_${occurrence.id}" class="collapse${(this.controller.currentOccurrenceId === occurrence.id ? ' show' : '')}" aria-labelledby="heading_${occurrence.id}" data-parent="#occurrenceslist" data-occurrenceId="${occurrence.id}">
    //   <div class="card-body">
    //     Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.
    //   </div>
    // </div>`;
    }
}

// not found view

class NotFoundView extends Page {
    body() {
        // at this point the entire content of #body should be safe to replace

        let pathPrefix = window.location.pathname.split('/')[1];

        const bodyEl = document.getElementById('body');
        bodyEl.innerHTML = `<h2>Page not found</h2><p><a href="/${pathPrefix}/list">Return to the homepage.</a>`;
    }
}

class S{static tetradOffsets={E:[0,8e3],J:[2e3,8e3],P:[4e3,8e3],U:[6e3,8e3],Z:[8e3,8e3],D:[0,6e3],I:[2e3,6e3],N:[4e3,6e3],T:[6e3,6e3],Y:[8e3,6e3],C:[0,4e3],H:[2e3,4e3],M:[4e3,4e3],S:[6e3,4e3],X:[8e3,4e3],B:[0,2e3],G:[2e3,2e3],L:[4e3,2e3],R:[6e3,2e3],W:[8e3,2e3],A:[0,0],F:[2e3,0],K:[4e3,0],Q:[6e3,0],V:[8e3,0]};static quadrantOffsets={NW:[0,5e3],NE:[5e3,5e3],SW:[0,0],SE:[5e3,0]};static letterMapping={A:0,B:1,C:2,D:3,E:4,F:5,G:6,H:7,J:8,K:9,L:10,M:11,N:12,O:13,P:14,Q:15,R:16,S:17,T:18,U:19,V:20,W:21,X:22,Y:23,Z:24};static tetradLetters="ABCDEFGHIJKLMNPQRSTUVWXYZ";preciseGridRef="";length=0;hectad="";tetrad="";tetradLetter="";quadrant="";quadrantCode="";gridCoords=null;error=!1;errorMessage="";set_tetrad(){if(this.tetradLetter=S.tetradLetters.substr(5*(Math.floor(this.gridCoords.x%1e4/1e3)>>1)+(Math.floor(this.gridCoords.y%1e4/1e3)>>1),1),!this.tetradLetter)throw new Error("Failed to get tetrad letter when processing '"+this.preciseGridRef+"', easting="+this.gridCoords.x+" northing="+this.gridCoords.y);this.tetrad=this.hectad+this.tetradLetter;}static get_normalized_precision(S,N){return S>2e3?1e4:S>1e3?2e3:S>100?1e3:S>10?100:S>1?10:N||1}}const N=Math.PI/180,t=180/Math.PI;class e{lat;lng;constructor(S,N){this.lat=S,this.lng=N;}static _transform(S,t,T,s,r,a,h,i,o,n,d,M,H,O){const l=1e-6*O;let J=T/Math.sqrt(1-s*(Math.sin(S)*Math.sin(S)));const c=(J+r)*Math.cos(S)*Math.cos(t),g=(J+r)*Math.cos(S)*Math.sin(t),U=((1-s)*J+r)*Math.sin(S),L=d/3600*N,u=M/3600*N,C=H/3600*N,Y=c+c*l-g*C+U*u+i,f=c*C+g+g*l-U*L+o,P=-1*c*u+g*L+U+U*l+n;t=Math.atan(f/Y);const D=Math.sqrt(Y*Y+f*f);S=Math.atan(P/(D*(1-h))),J=a/Math.sqrt(1-h*(Math.sin(S)*Math.sin(S)));let K=1,X=0;for(;K>.001;)X=Math.atan((P+h*J*Math.sin(S))/D),K=Math.abs(X-S),S=X;return new e(S,t)}static _Marc(S,N,t,e){return S*((1+N+5/4*(N*N)+5/4*(N*N*N))*(e-t)-(3*N+N*N*3+21/8*(N*N*N))*Math.sin(e-t)*Math.cos(e+t)+(15/8*(N*N)+15/8*(N*N*N))*Math.sin(2*(e-t))*Math.cos(2*(e+t))-35/24*(N*N*N)*Math.sin(3*(e-t))*Math.cos(3*(e+t)))}}class T extends e{constructor(S,N){super(S,N);}}class s extends e{constructor(S,N){super(S,N);}to_WGS84(){let S=6377563.396,e=.00667054007;const s=this.lat*N,r=Math.sin(s),a=this.lng*N,h=S/Math.sqrt(1-e*(r*r)),i=h*Math.cos(s)*Math.cos(a),o=h*Math.cos(s)*Math.sin(a),n=(1-e)*h*r,d=-204894e-10,M=7.28190110241429e-7,H=119748977294801e-20,O=446.448+i*(1+d)+-M*o+H*n,l=408261589226812e-20*i-124.157+o*(1+d)+-M*n,J=542.06+-H*i+M*o+n*(1+d);S=6378137,e=.00669438003;const c=Math.sqrt(O*O+l*l);let g=Math.atan(J/(c*(1-e)));for(let N=1;N<10;++N){let N=Math.sin(g);g=Math.atan((J+e*(S/Math.sqrt(1-e*(N*N)))*N)/c);}return new T(t*g,t*Math.atan(l/O))}static from_wgs84(S){const e=S.lat*N,T=S.lng*N,r=.00669438037928458,a=.0066705397616,h=20.4894*1e-6;let i=6378137/Math.sqrt(1-r*Math.sin(e)*Math.sin(e));const o=(i+0)*Math.cos(e)*Math.cos(T),n=(i+0)*Math.cos(e)*Math.sin(T),d=((1-r)*i+0)*Math.sin(e),M=-.1502/3600*N,H=-.247/3600*N,O=-.8421/3600*N,l=o+o*h-n*O+d*H-446.448,J=o*O+n+n*h-d*M+125.157,c=-1*o*H+n*M+d+d*h+-542.06,g=Math.atan(J/l),U=Math.sqrt(l*l+J*J);let L=Math.atan(c/(U*(1-a)));i=6377563.396/Math.sqrt(1-a*(Math.sin(L)*Math.sin(L)));let u=1,C=0;for(;u>.001;)C=Math.atan((c+a*i*Math.sin(L))/U),u=Math.abs(C-L),L=C;return new s(L*t,g*t)}}class r extends e{constructor(S,N){super(S,N);}static from_wgs84(S){const T=S.lat*N,s=S.lng*N,a=e._transform(T,s,6378137,.00669438037928458,0,6378388,.0067226700223333,83.901,98.127,118.635,0,0,0,0);return new r(a.lat*t,a.lng*t)}}class a extends e{constructor(S,N){super(S,N);}to_WGS84(){const S=e._transform(this.lat*N,this.lng*N,6377340.189,.00667054015,0,6378137,.00669438037928458,482.53,-130.596,564.557,-1.042,-.214,-.631,-8.15);return new T(S.lat*t,S.lng*t)}static from_wgs84(S){const T=S.lat*N,s=S.lng*N,r=e._transform(T,s,6378137,.00669438037928458,0,6377340.189,.00667054015,-482.53,130.596,-564.557,1.042,.214,.631,8.15);return new a(r.lat*t,r.lng*t)}}class h{x;y;constructor(){}to_latLng(){}to_gridref(S){}static tetradLetters="ABCDEFGHIJKLMNPQRSTUVWXYZ";static tetradLettersRowFirst="AFKQVBGLRWCHMSXDINTYEJPUZ";static from_latlng(S,N){if(N>=-8.74&&S>49.88){let t=new s.from_wgs84(new T(S,N)).to_os_coords();if(t.x>=0&&t.is_gb_hectad())return t}if(N<-5.3&&S>51.34&&N>-11&&S<55.73){let t=new a.from_wgs84(new T(S,N)).to_os_coords();return t.x<0||t.y<0?null:t}{let t=new r.from_wgs84(new T(S,N)).to_os_coords();if(t.x>=5e5&&t.x<6e5&&t.y>=54e5&&t.y<56e5)return t}return null}static calculate_tetrad(S,N){return S>=0&&N>=0?h.tetradLetters.charAt(5*Math.floor(S%1e4/2e3)+Math.floor(N%1e4/2e3)):""}toString(){return this.x+","+this.y}}const i=function(S,N,t,e){let T="00000"+Math.floor(N),s="00000"+Math.floor(t);if(2e3===e)return S+T.charAt(T.length-5)+s.charAt(s.length-5)+h.calculate_tetrad(N,t);if(1e5===e)return S;{5e3===e&&(e=1e4);let N=Math.round(Math.log10(e));return S+(N?T.slice(-5,-N)+s.slice(-5,-N):T.slice(-5)+s.slice(-5))}};class o extends h{country="CI";constructor(S,N){super(),this.x=S,this.y=N;}to_latLng(){var S=.9996,N=.0067226700223333,e=6378388*S,s=6356911.946*S,r=this.x-5e5,a=d(this.y,0,e,0,.0016863406508729017,s),h=e/Math.sqrt(1-N*(Math.sin(a)*Math.sin(a))),i=h*(1-N)/(1-N*Math.sin(a)*Math.sin(a)),o=h/i-1,M=Math.tan(a)*Math.tan(a),H=Math.pow(Math.tan(a),4),O=Math.pow(Math.tan(a),6),l=Math.pow(Math.cos(a),-1),J=Math.tan(a)/(2*i*h),c=Math.tan(a)/(24*i*(h*h*h))*(5+3*M+o-9*o*M),g=Math.tan(a)/(720*i*Math.pow(h,5))*(61+90*M+45*H),U=a-r*r*J+Math.pow(r,4)*c-Math.pow(r,6)*g,L=Math.pow(Math.cos(a),-1)/h,u=l/(h*h*h*6)*(h/i+2*M),C=l/(120*Math.pow(h,5))*(5+28*M+24*H),Y=l/(5040*Math.pow(h,7))*(61+662*M+1320*H+720*O),f=r*L-.0523598775598-r*r*r*u+Math.pow(r,5)*C-Math.pow(r,7)*Y,P=n(U,f);return new T(P.lat*t,P.lng*t)}to_gridref(S){return this.y>=55e5?i("WA",this.x-5e5,this.y-55e5,S||1):this.y<55e5?i("WV",this.x-5e5,this.y-54e5,S||1):null}to_hectad(){return this.y>55e5?"WA"+this.x.toString().substring(1,2)+this.y.toString().substring(2,3):this.y<55e5?"WV"+this.x.toString().substring(1,2)+this.y.toString().substring(2,3):null}}const n=function(S,N){return e._transform(S,N,6378388,.0067226700223333,10,6378137,.00669438037928458,-83.901,-98.127,-118.635,0,0,0,0)},d=function(S,N,t,T,s,r){for(var a=(S-N)/t+T,h=e._Marc(r,s,T,a),i=(S-N-h)/t+a,o=0;Math.abs(S-N-h)>1e-5&&o<20;)o+=1,i=(S-N-h)/t+a,h=e._Marc(r,s,T,i),a=i;return i};class M extends S{country="CI";GridCoords=o;gridCoords=null;constructor(){super(),this.parse_well_formed=this.from_string;}from_string(N){let t,e=N.replace(/[\[\]\s\t.\/-]+/g,"").toUpperCase(),T="";/[ABCDEFGHIJKLMNPQRSTUVWXYZ]$/.test(e)&&(S.quadrantOffsets.hasOwnProperty(e.substr(e.length-2))?(this.quadrantCode=e.substr(e.length-2),e=e.substr(0,e.length-2)):(T=e.substr(e.length-1),e=e.substr(0,e.length-1))),/^(W[AV](?:\d\d){1,5})$/.test(e)?(t=M.gridref_string_to_e_n_l(e))?(this.length=t.length,this.gridCoords=new o(t.e,t.n),this.hectad=this.gridCoords.to_gridref(1e4),1e4===this.length&&(T||this.quadrantCode)?T?(this.preciseGridRef=e+T,this.tetrad=this.hectad+T,this.tetradLetter=T,this.length=2e3,this.gridCoords.x+=S.tetradOffsets[T][0],this.gridCoords.y+=S.tetradOffsets[T][1]):(this.preciseGridRef=e+this.quadrantCode,this.tetradLetter="",this.tetrad="",this.quadrant=this.preciseGridRef,this.length=5e3,this.gridCoords.x+=S.quadrantOffsets[this.quadrantCode][0],this.gridCoords.y+=S.quadrantOffsets[this.quadrantCode][1]):(this.preciseGridRef=e,this.length<=1e3&&this.set_tetrad())):(this.error=!0,this.errorMessage="Grid reference format not understood (odd length)."):(this.error=!0,this.errorMessage="Channel Island grid reference format not understood. ('"+N+"')");}static gridref_string_to_e_n_l(S){let N,t,e,T,s=S.substr(0,2);if("WA"===s)N=55e5;else {if("WV"!==s)return console.log("Bad Channel Island grid letters: '"+s+"'"),!1;N=54e5;}let r=S.substr(2);switch(r.length){case 2:t=1e4*r.charAt(0),e=1e4*r.charAt(1),T=1e4;break;case 4:t=1e3*r.substr(0,2),e=1e3*r.substr(2),T=1e3;break;case 6:t=100*r.substr(0,3),e=100*r.substr(3),T=100;break;case 8:t=10*r.substr(0,4),e=10*r.substr(4),T=10;break;case 10:t=parseInt(r.substr(0,5),10),e=parseInt(r.substr(5),10),T=1;break;default:return console.log("Bad length for Channel Island grid ref '"+S+"'"),!1}return {e:t+5e5,n:e+N,length:T}}}class H extends h{gridCoords=null;constructor(S,N){super(),this.x=S,this.y=N;}country="GB";static gbHectads="SV80SV81SV90SV91SW32SW33SW42SW43SW44SW52SW53SW54SW61SW62SW63SW64SW65SW71SW72SW73SW74SW75SW76SW81SW82SW83SW84SW85SW86SW87SW95SW96SW97SS10SS11SS20SS21SS30SW83SW84SW85SW93SW94SW95SW96SW97SW98SX03SX04SX05SX06SX07SX08SX09SX14SX15SX16SX17SX18SX19SX25SX26SX27SX28SX29SX35SX36SX37SX38SX39SX44SX45SX46SX47SS70SS80SS81SS90SS91ST00ST01ST10ST11ST20ST21ST30SX37SX44SX45SX46SX47SX48SX54SX55SX56SX57SX58SX63SX64SX65SX66SX67SX68SX69SX73SX74SX75SX76SX77SX78SX79SX83SX84SX85SX86SX87SX88SX89SX94SX95SX96SX97SX98SX99SY07SY08SY09SY18SY19SY28SY29SY38SY39SS14SS20SS21SS22SS30SS31SS32SS40SS41SS42SS43SS44SS50SS51SS52SS53SS54SS60SS61SS62SS63SS64SS70SS71SS72SS73SS74SS75SS80SS81SS82SS83SS91SS92ST01ST02SX28SX29SX37SX38SX39SX48SX49SX58SX59SX68SX69SX79SS73SS74SS82SS83SS84SS92SS93SS94ST01ST02ST03ST04ST11ST12ST13ST14ST20ST21ST22ST23ST24ST25ST30ST31ST32ST33ST34ST40ST41ST42ST50ST51ST52ST61ST62ST71ST72ST24ST25ST26ST32ST33ST34ST35ST36ST37ST42ST43ST44ST45ST46ST47ST52ST53ST54ST55ST56ST57ST62ST63ST64ST65ST66ST67ST72ST73ST74ST75ST76ST77ST83ST84ST85ST86SP00SP10ST76ST77ST85ST86ST87ST88ST89ST96ST97ST98ST99SU06SU07SU08SU09SU16SU17SU18SU19SU26SU27SU28SU29SU36SU37ST73ST74ST75ST76ST82ST83ST84ST85ST86ST91ST92ST93ST94ST95ST96SU01SU02SU03SU04SU05SU06SU11SU12SU13SU14SU15SU16SU21SU22SU23SU24SU25SU26SU31SU32SU34SU35SU36ST20ST30ST40ST50ST51ST60ST61ST70ST71ST72ST73ST80ST81ST82ST83ST90ST91ST92SU00SU01SU02SU10SU11SY39SY48SY49SY58SY59SY66SY67SY68SY69SY77SY78SY79SY87SY88SY89SY97SY98SY99SZ07SZ08SZ09SZ28SZ38SZ39SZ47SZ48SZ49SZ57SZ58SZ59SZ68SZ69SU00SU01SU02SU10SU11SU12SU20SU21SU22SU23SU30SU31SU32SU33SU40SU41SU42SU43SU50SU51SU52SU60SU61SU62SU70SU71SU72SZ08SZ09SZ19SZ29SZ38SZ39SZ49SZ59SZ69SZ79SU23SU24SU25SU33SU34SU35SU36SU42SU43SU44SU45SU46SU52SU53SU54SU55SU56SU62SU63SU64SU65SU66SU72SU73SU74SU75SU76SU82SU83SU84SU85SU86SU70SU71SU72SU80SU81SU82SU83SU90SU91SU92SU93SZ79SZ89SZ99TQ00TQ01TQ02TQ03TQ10TQ11TQ12TQ13TQ20TQ21TQ22TQ23TQ30TQ31TQ32TQ20TQ21TQ22TQ23TQ30TQ31TQ32TQ33TQ40TQ41TQ42TQ43TQ44TQ50TQ51TQ52TQ53TQ54TQ60TQ61TQ62TQ63TQ70TQ71TQ72TQ80TQ81TQ82TQ91TQ92TV49TV59TV69TQ65TQ72TQ73TQ74TQ75TQ76TQ77TQ82TQ83TQ84TQ85TQ86TQ87TQ91TQ92TQ93TQ94TQ95TQ96TQ97TR01TR02TR03TR04TR05TR06TR07TR12TR13TR14TR15TR16TR23TR24TR25TR26TR27TR33TR34TR35TR36TR37TR46TR47TQ35TQ36TQ37TQ38TQ43TQ44TQ45TQ46TQ47TQ48TQ53TQ54TQ55TQ56TQ57TQ58TQ63TQ64TQ65TQ66TQ67TQ72TQ73TQ74TQ75TQ76TQ77TQ78TQ87TQ88TQ97SU83SU84SU85SU86SU93SU94SU95SU96SU97TQ03TQ04TQ05TQ06TQ07TQ13TQ14TQ15TQ16TQ17TQ23TQ24TQ25TQ26TQ27TQ33TQ34TQ35TQ36TQ37TQ38TQ43TQ44TQ45TL30TL40TL50TL60TL70TL80TL90TM00TQ38TQ39TQ47TQ48TQ49TQ57TQ58TQ59TQ67TQ68TQ69TQ77TQ78TQ79TQ88TQ89TQ98TQ99TR08TR09TR19TL30TL31TL34TL40TL41TL42TL43TL44TL50TL51TL52TL53TL54TL60TL61TL62TL63TL64TL70TL71TL72TL73TL74TL80TL81TL82TL83TL84TL90TL91TL92TL93TM01TM02TM03TM11TM12TM13TM21TM22TM23TQ49SP81SP90SP91TL00TL01TL02TL10TL11TL12TL13TL20TL21TL22TL23TL24TL30TL31TL32TL33TL34TL41TL42TL43TL44TL51TL52TQ09TQ19TQ29TQ39TL20TL30TQ06TQ07TQ08TQ09TQ16TQ17TQ18TQ19TQ27TQ28TQ29TQ37TQ38TQ39SP20SP30SP40SP41SP50SU19SU26SU27SU28SU29SU36SU37SU38SU39SU46SU47SU48SU49SU56SU57SU58SU59SU66SU67SU68SU69SU76SU77SU78SU86SU87SU88SU96SU97SU98SP10SP20SP21SP22SP23SP30SP31SP32SP33SP34SP40SP41SP42SP43SP44SP45SP50SP51SP52SP53SP54SP60SP61SP62SP63SP70SU29SU39SU49SU57SU58SU59SU67SU68SU69SU77SU78SU79SP51SP53SP60SP61SP62SP63SP64SP70SP71SP72SP73SP74SP80SP81SP82SP83SP84SP85SP90SP91SP92SP93SP94SP95SU78SU79SU88SU89SU97SU98SU99TL00TL01TQ07TQ08TQ09TG40TG50TM03TM04TM05TM06TM07TM13TM14TM15TM16TM17TM23TM24TM25TM26TM27TM28TM33TM34TM35TM36TM37TM38TM39TM44TM45TM46TM47TM48TM49TM57TM58TM59TL64TL65TL66TL67TL68TL74TL75TL76TL77TL78TL83TL84TL85TL86TL87TL88TL93TL94TL95TL96TL97TL98TM03TM04TM05TM06TM07TM08TG00TG01TG02TG03TG04TG10TG11TG12TG13TG14TG20TG21TG22TG23TG24TG30TG31TG32TG33TG40TG41TG42TG50TG51TM07TM08TM09TM17TM18TM19TM27TM28TM29TM38TM39TM49TM59TF40TF41TF42TF50TF51TF52TF53TF60TF61TF62TF63TF64TF70TF71TF72TF73TF74TF80TF81TF82TF83TF84TF90TF91TF92TF93TF94TG00TG01TG02TG03TG04TL49TL59TL68TL69TL78TL79TL87TL88TL89TL98TL99TM07TM08TM09TF20TF30TF31TF40TF41TF50TL15TL19TL23TL24TL25TL26TL28TL29TL33TL34TL35TL36TL37TL38TL39TL44TL45TL46TL47TL48TL49TL54TL55TL56TL57TL58TL59TL63TL64TL65TL66TL67TL68TL69TL75TL76SP91SP92SP93SP94SP95SP96TL01TL02TL03TL04TL05TL06TL07TL11TL12TL13TL14TL15TL16TL23TL24TL25TL06TL07TL08TL09TL15TL16TL17TL18TL19TL25TL26TL27TL28TL29TL36TL37TL38TL39SK90SP43SP44SP45SP46SP53SP54SP55SP56SP57SP58SP63SP64SP65SP66SP67SP68SP73SP74SP75SP76SP77SP78SP79SP84SP85SP86SP87SP88SP89SP95SP96SP97SP98SP99TF00TF10TF20TL06TL07TL08TL09TL18TL19TL29SO70SO71SO80SO81SO82SO83SO90SO91SO92SO93SO94SP00SP01SP02SP03SP04SP10SP11SP12SP13SP14SP15SP20SP21SP22SP23SP24SP25ST99SU09SU19SU29SO50SO51SO60SO61SO62SO63SO70SO71SO72SO73SO80SO81SO82SO83SO90ST57ST58ST59ST66ST67ST68ST69ST76ST77ST78ST79ST87ST88ST89ST98ST99SO10SO11SO20SO21SO22SO23SO30SO31SO32SO40SO41SO42SO50SO51ST18ST19ST27ST28ST29ST37ST38ST39ST47ST48ST49ST58ST59SO22SO23SO24SO25SO26SO32SO33SO34SO35SO36SO37SO41SO42SO43SO44SO45SO46SO47SO51SO52SO53SO54SO55SO56SO57SO61SO62SO63SO64SO65SO66SO73SO74SO75SO76SO56SO64SO65SO66SO67SO72SO73SO74SO75SO76SO77SO78SO82SO83SO84SO85SO86SO87SO88SO93SO94SO95SO96SO97SO98SO99SP03SP04SP05SP06SP07SP08SP13SP14SP16SP17SP18SK10SK20SK30SP04SP05SP06SP07SP08SP09SP14SP15SP16SP17SP18SP19SP22SP23SP24SP25SP26SP27SP28SP29SP33SP34SP35SP36SP37SP38SP39SP44SP45SP46SP47SP48SP49SP55SP56SP57SP58SJ63SJ70SJ71SJ72SJ73SJ74SJ75SJ80SJ81SJ82SJ83SJ84SJ85SJ86SJ90SJ91SJ92SJ93SJ94SJ95SJ96SK00SK01SK02SK03SK04SK05SK06SK10SK11SK12SK13SK14SK15SK16SK20SK21SK22SO77SO78SO79SO88SO89SO98SO99SP08SP09SP19SP29SJ20SJ21SJ22SJ23SJ30SJ31SJ32SJ33SJ34SJ40SJ41SJ42SJ43SJ50SJ51SJ52SJ53SJ54SJ60SJ61SJ62SJ63SJ64SJ70SJ71SJ72SJ73SJ74SJ80SO17SO18SO27SO28SO29SO37SO38SO39SO46SO47SO48SO49SO56SO57SO58SO59SO66SO67SO68SO69SO77SO78SO79SO88SO89SN50SN60SN61SN70SN71SN80SN81SN90SO00SO01SO10SO11SS38SS39SS48SS49SS58SS59SS68SS69SS77SS78SS79SS87SS88SS89SS96SS97SS98SS99ST06ST07ST08ST09ST16ST17ST18ST19ST26ST27ST28SN70SN71SN74SN80SN81SN82SN83SN84SN85SN86SN90SN91SN92SN93SN94SN95SN96SO00SO01SO02SO03SO04SO05SO06SO10SO11SO12SO13SO14SO21SO22SO23SO24SN86SN87SN96SN97SO04SO05SO06SO07SO08SO13SO14SO15SO16SO17SO18SO24SO25SO26SO27SO36SO37SN01SN02SN10SN11SN12SN20SN21SN22SN23SN24SN30SN31SN32SN33SN34SN40SN41SN42SN43SN44SN50SN51SN52SN53SN54SN60SN61SN62SN63SN64SN65SN71SN72SN73SN74SN75SN81SN82SN83SN84SS39SS49SS59SM50SM62SM70SM71SM72SM73SM80SM81SM82SM83SM84SM90SM91SM92SM93SM94SN00SN01SN02SN03SN04SN10SN11SN12SN13SN14SN22SN23SN24SR89SR99SS09SS19SN14SN15SN24SN25SN33SN34SN35SN36SN44SN45SN46SN54SN55SN56SN57SN58SN64SN65SN66SN67SN68SN69SN74SN75SN76SN77SN78SN79SN84SN85SN86SN87SN88SN89SH70SH71SH80SH81SH90SH91SH92SJ00SJ01SJ02SJ03SJ10SJ11SJ12SJ20SJ21SJ22SJ31SN69SN78SN79SN87SN88SN89SN97SN98SN99SO07SO08SO09SO18SO19SO28SO29SO39SH50SH51SH52SH53SH54SH60SH61SH62SH63SH64SH70SH71SH72SH73SH74SH80SH81SH82SH83SH84SH91SH92SH93SH94SH95SJ03SJ04SJ05SJ13SJ14SN59SN69SN79SH12SH13SH22SH23SH24SH32SH33SH34SH43SH44SH45SH46SH53SH54SH55SH56SH57SH64SH65SH66SH67SH74SH75SH76SH77SH78SH84SH85SH86SH87SH88SH74SH75SH76SH77SH84SH85SH86SH87SH88SH94SH95SH96SH97SH98SJ02SJ03SJ04SJ05SJ06SJ07SJ08SJ12SJ13SJ14SJ15SJ16SJ17SJ22SJ23SJ24SJ25SJ26SJ33SJ34SJ35SJ43SJ44SJ45SJ53SJ54SH97SH98SJ06SJ07SJ08SJ15SJ16SJ17SJ18SJ25SJ26SJ27SJ35SJ36SJ37SH27SH28SH29SH36SH37SH38SH39SH46SH47SH48SH49SH56SH57SH58SH59SH67SH68SK81SK82SK83SK84SK85SK86SK87SK90SK91SK92SK93SK94SK95SK96SK97TF00TF01TF02TF03TF04TF05TF06TF07TF10TF11TF12TF13TF14TF15TF16TF17TF20TF21TF22TF23TF24TF25TF30TF31TF32TF33TF34TF41TF42TF43TF44TF52SE60SE70SE71SE80SE81SE82SE90SE91SE92SK78SK79SK87SK88SK89SK97SK98SK99TA00TA01TA02TA10TA11TA12TA20TA21TA30TA31TA40TF07TF08TF09TF15TF16TF17TF18TF19TF24TF25TF26TF27TF28TF29TF33TF34TF35TF36TF37TF38TF39TF43TF44TF45TF46TF47TF48TF49TF54TF55TF56TF57TF58SK20SK21SK30SK31SK32SK40SK41SK42SK43SK50SK51SK52SK60SK61SK62SK70SK71SK72SK73SK74SK80SK81SK82SK83SK84SK90SK91SP39SP48SP49SP57SP58SP59SP68SP69SP78SP79SP89SP99TF00TF01SE60SE70SK42SK43SK44SK45SK46SK52SK53SK54SK55SK56SK57SK58SK59SK62SK63SK64SK65SK66SK67SK68SK69SK72SK73SK74SK75SK76SK77SK78SK79SK84SK85SK86SK87SK88SK89SK97SJ98SJ99SK03SK06SK07SK08SK09SK11SK12SK13SK14SK15SK16SK17SK18SK19SK21SK22SK23SK24SK25SK26SK27SK28SK31SK32SK33SK34SK35SK36SK37SK38SK42SK43SK44SK45SK46SK47SK48SK53SK56SK57SD90SE00SE10SJ18SJ19SJ27SJ28SJ29SJ35SJ36SJ37SJ38SJ39SJ44SJ45SJ46SJ47SJ48SJ54SJ55SJ56SJ57SJ58SJ63SJ64SJ65SJ66SJ67SJ68SJ69SJ74SJ75SJ76SJ77SJ78SJ79SJ85SJ86SJ87SJ88SJ89SJ96SJ97SJ98SJ99SK06SK07SK08SK09SK19SD20SD21SD22SD30SD31SD32SD40SD41SD42SD50SD51SD52SD53SD60SD61SD62SD63SD70SD71SD72SD73SD74SD80SD81SD82SD83SD84SD90SD91SD92SD93SD94SJ29SJ38SJ39SJ48SJ49SJ58SJ59SJ68SJ69SJ79SJ88SJ89SJ99SD22SD23SD32SD33SD34SD35SD36SD42SD43SD44SD45SD46SD47SD52SD53SD54SD55SD56SD57SD63SD64SD65SD66SD67SD68SD73SD78SE53SE54SE62SE63SE64SE65SE72SE73SE74SE75SE76SE82SE83SE84SE85SE86SE87SE92SE93SE94SE95SE96SE97SE98TA02TA03TA04TA05TA06TA07TA08TA12TA13TA14TA15TA16TA17TA18TA21TA22TA23TA24TA26TA27TA31TA32TA33TA41TA42NZ30NZ31NZ40NZ41NZ42NZ50NZ51NZ52NZ60NZ61NZ62NZ70NZ71NZ72NZ80NZ81NZ90NZ91SE37SE38SE39SE46SE47SE48SE49SE55SE56SE57SE58SE59SE64SE65SE66SE67SE68SE69SE75SE76SE77SE78SE79SE86SE87SE88SE89SE97SE98SE99TA08TA09TA18SD84SD90SD91SD92SD93SD94SD95SE00SE01SE02SE03SE04SE10SE11SE12SE13SE14SE20SE21SE22SE23SE30SE31SE32SE33SE40SE41SE42SE50SE51SE52SE60SE61SE62SE70SE71SE72SE81SE82SK18SK19SK28SK29SK38SK39SK47SK48SK49SK57SK58SK59SK69SD54SD55SD64SD65SD66SD67SD68SD73SD74SD75SD76SD77SD78SD84SD85SD86SD87SD88SD94SD95SD96SD97SD98SE04SE05SE06SE07SE13SE14SE15SE16SE17SE23SE24SE25SE26SE27SE32SE33SE34SE35SE36SE37SE42SE43SE44SE45SE46SE52SE53SE54SE55SE56SE62SE63SE64SE65SE72NY72NY80NY81NY82NY90NY91NY92NZ00NZ01NZ02NZ10NZ11NZ20NZ21NZ30NZ31SD68SD69SD78SD79SD88SD89SD97SD98SD99SE07SE08SE09SE17SE18SE19SE27SE28SE29SE36SE37SE38SE39SE46SE47NY73NY74NY82NY83NY84NY92NY93NY94NY95NZ01NZ02NZ03NZ04NZ05NZ11NZ12NZ13NZ14NZ15NZ16NZ20NZ21NZ22NZ23NZ24NZ25NZ26NZ30NZ31NZ32NZ33NZ34NZ35NZ36NZ41NZ42NZ43NZ44NZ45NZ46NZ52NZ53NT60NT70NT80NT90NU00NU10NU20NY58NY59NY64NY65NY66NY67NY68NY69NY74NY75NY76NY77NY78NY79NY84NY85NY86NY87NY88NY89NY94NY95NY96NY97NY98NY99NZ04NZ05NZ06NZ07NZ08NZ09NZ15NZ16NZ17NZ18NZ19NZ26NZ27NZ28NZ29NZ36NZ37NZ38NZ39NT70NT71NT73NT80NT81NT82NT83NT84NT90NT91NT92NT93NT94NT95NU00NU01NU02NU03NU04NU05NU10NU11NU12NU13NU14NU20NU21NU22NU23NZ09NZ19NY20NY21NY30NY31NY40NY41NY42NY50NY51NY52NY53NY60NY61NY62NY63NY70NY71NY72NY73NY80NY81NY82NY83SD16SD17SD18SD19SD26SD27SD28SD29SD36SD37SD38SD39SD46SD47SD48SD49SD57SD58SD59SD67SD68SD69SD78SD79SD89NX90NX91NX92NX93NY00NY01NY02NY03NY04NY05NY10NY11NY12NY13NY14NY15NY16NY20NY21NY22NY23NY24NY25NY26NY31NY32NY33NY34NY35NY36NY37NY41NY42NY43NY44NY45NY46NY47NY48NY52NY53NY54NY55NY56NY57NY58NY62NY63NY64NY65NY66NY67NY68NY73NY74NY75NY84SD08SD09SD17SD18SD19SD28SD29NX30NX40SC16SC17SC26SC27SC28SC36SC37SC38SC39SC47SC48SC49NS60NS61NS70NS71NS72NS80NS81NS90NT00NT01NT10NT11NT20NT21NT30NX69NX78NX79NX88NX89NX96NX97NX98NX99NY05NY06NY07NY08NY09NY16NY17NY18NY19NY26NY27NY28NY29NY36NY37NY38NY39NY47NY48NY49NS50NS60NX36NX37NX38NX45NX46NX47NX48NX49NX54NX55NX56NX57NX58NX59NX64NX65NX66NX67NX68NX69NX74NX75NX76NX77NX78NX79NX84NX85NX86NX87NX88NX95NX96NX97NX98NY05NY06NW95NW96NW97NX03NX04NX05NX06NX07NX13NX14NX15NX16NX17NX24NX25NX26NX27NX33NX34NX35NX36NX37NX43NX44NX45NX46NS00NS10NS14NS15NS16NS20NS21NS23NS24NS25NS26NS30NS31NS32NS33NS34NS35NS36NS40NS41NS42NS43NS44NS45NS50NS51NS52NS53NS54NS55NS60NS61NS62NS63NS64NS71NS72NS73NX07NX08NX09NX17NX18NX19NX27NX28NX29NX37NX38NX39NX48NX49NX59NS16NS17NS26NS27NS35NS36NS37NS44NS45NS46NS47NS54NS55NS56NS64NS65NS66NS53NS54NS55NS56NS57NS63NS64NS65NS66NS67NS71NS72NS73NS74NS75NS76NS77NS80NS81NS82NS83NS84NS85NS86NS87NS90NS91NS92NS93NS94NS95NS96NT00NT01NT02NT03NT04NT05NT14NT01NT02NT03NT04NT05NT11NT12NT13NT14NT15NT21NT22NT23NT24NT25NT32NT33NT34NT10NT11NT20NT21NT22NT23NT30NT31NT32NT33NT34NT41NT42NT43NT44NT53NT20NT30NT31NT40NT41NT42NT43NT44NT50NT51NT52NT53NT54NT60NT61NT62NT63NT64NT70NT71NT72NT73NT74NT81NT82NT83NY39NY47NY48NY49NY58NY59NY69NT44NT45NT46NT53NT54NT55NT56NT63NT64NT65NT66NT73NT74NT75NT76NT77NT83NT84NT85NT86NT87NT94NT95NT96NT36NT37NT45NT46NT47NT48NT55NT56NT57NT58NT65NT66NT67NT68NT76NT77NS95NS96NT05NT06NT15NT16NT17NT24NT25NT26NT27NT34NT35NT36NT37NT43NT44NT45NT46NS86NS87NS95NS96NS97NS98NT06NT07NT08NT16NT17NO00NO01NO10NO11NO20NO21NO22NO30NO31NO32NO40NO41NO42NO50NO51NO52NO60NO61NS99NT08NT09NT18NT19NT28NT29NT39NT49NT59NT69NN30NN31NN40NN41NS38NS39NS47NS48NS49NS57NS58NS59NS67NS68NS69NS77NS78NS79NS86NS87NS88NS89NS97NS98NN21NN22NN30NN31NN32NN40NN41NN42NN50NN51NN52NN60NN61NN70NN71NN80NN81NN90NN91NO00NS49NS59NS69NS79NS88NS89NS98NS99NT08NT09NN22NN23NN32NN33NN34NN35NN42NN43NN44NN45NN46NN47NN51NN52NN53NN54NN55NN56NN57NN61NN62NN63NN64NN65NN66NN67NN71NN72NN73NN74NN75NN76NN77NN81NN82NN83NN84NN85NN86NN90NN91NN92NN93NN94NN95NN96NO00NO01NO02NO03NO04NO11NO12NO13NO21NN56NN57NN66NN67NN68NN76NN77NN78NN86NN87NN88NN94NN95NN96NN97NN98NO02NO03NO04NO05NO06NO07NO08NO11NO12NO13NO14NO15NO16NO17NO21NO22NO23NO24NO25NO32NO33NO34NO15NO16NO17NO23NO24NO25NO26NO27NO28NO32NO33NO34NO35NO36NO37NO38NO42NO43NO44NO45NO46NO47NO48NO53NO54NO55NO56NO57NO58NO63NO64NO65NO66NO67NO74NO75NO76NJ60NJ70NJ80NJ90NO57NO58NO66NO67NO68NO69NO76NO77NO78NO79NO86NO87NO88NO89NO99NH90NJ00NJ10NJ11NJ20NJ21NJ30NJ31NJ32NJ40NJ41NJ42NJ50NJ51NJ52NJ60NJ61NJ62NJ70NJ71NJ72NJ80NJ81NJ82NJ90NJ91NJ92NK02NN98NN99NO07NO08NO09NO17NO18NO19NO27NO28NO29NO37NO38NO39NO48NO49NO58NO59NO68NO69NO79NO89NJ31NJ32NJ33NJ34NJ42NJ43NJ44NJ52NJ53NJ54NJ55NJ62NJ63NJ64NJ65NJ72NJ73NJ74NJ75NJ76NJ82NJ83NJ84NJ85NJ86NJ92NJ93NJ94NJ95NJ96NK02NK03NK04NK05NK06NK13NK14NK15NH90NJ00NJ01NJ10NJ11NJ12NJ13NJ14NJ21NJ22NJ23NJ24NJ25NJ32NJ33NJ34NJ35NJ36NJ42NJ43NJ44NJ45NJ46NJ54NJ55NJ56NJ64NJ65NJ66NJ74NJ75NJ76NJ86NN99NH72NH81NH82NH91NH92NH93NH94NH95NH96NJ00NJ01NJ02NJ03NJ04NJ05NJ06NJ11NJ12NJ13NJ14NJ15NJ16NJ17NJ23NJ24NJ25NJ26NJ27NJ34NJ35NJ36NJ45NH01NH02NH10NH11NH12NH13NH14NH20NH21NH22NH23NH24NH30NH31NH32NH33NH34NH40NH41NH42NH43NH44NH50NH51NH52NH53NH54NH60NH61NH62NH63NH64NH70NH71NH72NH73NH74NH75NH80NH81NH82NH83NH84NH85NH90NH91NH92NH93NH94NH95NH96NJ00NJ01NN39NN46NN47NN48NN49NN56NN57NN58NN59NN67NN68NN69NN77NN78NN79NN88NN89NN98NN99NG60NG70NG71NG72NG80NG81NG82NG90NG91NH00NH01NH10NH20NH30NM46NM47NM54NM55NM56NM57NM64NM65NM66NM67NM68NM69NM74NM75NM76NM77NM78NM79NM84NM85NM86NM87NM88NM89NM95NM96NM97NM98NM99NN05NN06NN07NN08NN09NN16NN17NN18NN19NN26NN27NN28NN29NN35NN36NN37NN38NN39NN46NN47NN48NN49NN57NN58NN59NM70NM71NM72NM73NM80NM81NM82NM83NM84NM90NM91NM92NM93NM94NM95NN00NN01NN02NN03NN04NN05NN10NN11NN12NN13NN14NN15NN16NN20NN21NN22NN23NN24NN25NN26NN30NN33NN34NN35NN36NN44NN45NN46NR79NR88NR89NR96NR97NR98NR99NS06NS07NS08NS09NS16NS17NS18NS19NS28NS29NN20NN21NN30NN31NS28NS29NS37NS38NS39NS46NS47NS48NS56NS57NR82NR83NR84NR92NR93NR94NR95NR96NR97NS01NS02NS03NS04NS05NS06NS07NS15NS16NR50NR51NR60NR61NR62NR63NR64NR65NR67NR68NR70NR71NR72NR73NR74NR75NR76NR77NR78NR79NR83NR84NR85NR86NR87NR88NR89NR95NR96NM40NM60NM61NM70NM71NR15NR16NR24NR25NR26NR27NR34NR35NR36NR37NR38NR39NR44NR45NR46NR47NR48NR49NR56NR57NR58NR59NR67NR68NR69NR79NL93NL94NM04NM05NM15NM16NM21NM22NM23NM24NM25NM26NM31NM32NM33NM34NM35NM41NM42NM43NM44NM45NM51NM52NM53NM54NM55NM61NM62NM63NM64NM72NM73NG13NG14NG15NG20NG23NG24NG25NG26NG30NG31NG32NG33NG34NG35NG36NG37NG38NG40NG41NG42NG43NG44NG45NG46NG47NG50NG51NG52NG53NG54NG55NG56NG60NG61NG62NG63NG64NG65NG66NG71NG72NG82NM19NM29NM37NM38NM39NM47NM48NM49NM59NB90NB91NC00NC01NC10NC11NC20NC21NG63NG64NG65NG72NG73NG74NG75NG76NG77NG78NG79NG82NG83NG84NG85NG86NG87NG88NG89NG91NG92NG93NG94NG95NG96NG97NG98NG99NH00NH01NH02NH03NH04NH05NH06NH07NH08NH09NH10NH11NH15NH16NH17NH18NH19NH27NH28NH29NC10NC20NC21NC30NC31NC40NH02NH03NH04NH05NH06NH07NH12NH13NH14NH15NH16NH17NH19NH23NH24NH25NH26NH27NH28NH29NH34NH35NH36NH37NH38NH39NH44NH45NH46NH47NH48NH49NH54NH55NH56NH57NH58NH59NH64NH65NH66NH67NH68NH69NH75NH76NH77NH78NH86NH87NH88NH97NH98NC22NC30NC31NC32NC33NC40NC41NC42NC43NC50NC51NC52NC60NC61NC62NC63NC70NC71NC72NC73NC74NC80NC81NC82NC83NC84NC90NC91NC92NC93ND01ND02NH49NH59NH68NH69NH78NH79NH88NH89NC01NC02NC03NC10NC11NC12NC13NC14NC15NC16NC20NC21NC22NC23NC24NC25NC26NC27NC31NC32NC33NC34NC35NC36NC37NC42NC43NC44NC45NC46NC52NC53NC54NC55NC56NC62NC63NC64NC65NC66NC73NC74NC75NC76NC83NC84NC85NC86NC93NC94NC95NC96NC92NC93NC94NC95NC96ND01ND02ND03ND04ND05ND06ND07ND12ND13ND14ND15ND16ND17ND23ND24ND25ND26ND27ND33ND34ND35ND36ND37ND47HW63HW83HX62NA00NA10NA64NA74NA81NA90NA91NA92NA93NB00NB01NB02NB03NB10NB11NB12NB13NB14NB20NB21NB22NB23NB24NB30NB31NB32NB33NB34NB35NB40NB41NB42NB43NB44NB45NB46NB52NB53NB54NB55NB56NF09NF19NF56NF58NF60NF61NF66NF67NF68NF70NF71NF72NF73NF74NF75NF76NF77NF80NF81NF82NF83NF84NF85NF86NF87NF88NF89NF95NF96NF97NF98NF99NG07NG08NG09NG18NG19NG29NG49NL57NL58NL68NL69NL79HY10HY20HY21HY22HY23HY30HY31HY32HY33HY34HY35HY40HY41HY42HY43HY44HY45HY50HY51HY52HY53HY54HY55HY60HY61HY62HY63HY64HY73HY74HY75ND19ND28ND29ND38ND39ND47ND48ND49ND59HP40HP50HP51HP60HP61HT93HT94HU14HU15HU16HU24HU25HU26HU27HU28HU30HU31HU32HU33HU34HU35HU36HU37HU38HU39HU40HU41HU42HU43HU44HU45HU46HU47HU48HU49HU53HU54HU55HU56HU57HU58HU59HU66HU67HU68HU69HZ16HZ17HZ26HZ27";to_gridref(S){const N=this.x/1e5|0,t=this.y/1e5|0;let e;e=t<5?N<5?"S":"T":t<10?N<5?"N":"O":N<5?"H":"J";let T=65+5*(4-t%5)+N%5;T>=73&&T++;const s=String.fromCharCode(T);return i(e+s,this.x-1e5*N,this.y-1e5*t,S||1)}to_hectad(){const S=this.x/1e5|0,N=this.y/1e5|0;let t;t=N<5?S<5?"S":"T":N<10?S<5?"N":"O":S<5?"H":"J";let e=65+5*(4-N%5)+S%5;return e>=73&&e++,t+String.fromCharCode(e)+((this.x-1e5*S)/1e4|0)+((this.y-1e5*N)/1e4|0)}is_gb_hectad(){return -1!==H.gbHectads.indexOf(this.to_hectad())}to_latLng(){const S=4e5,N=.85521133347722,e=6377563.396,T=.00667054007,r=this.x,a=this.y,h=.0016732203289875;let i,o=(a+1e5)/(.9996012717*e)+N;do{i=a+1e5-6353722.489*(1.0016767257674*(o-N)-.00502807228247412*Math.sin(o-N)*Math.cos(o+N)+(1.875*h*h+1.875*h*h*h)*Math.sin(2*(o-N))*Math.cos(2*(o+N))-35/24*h*h*h*Math.sin(3*(o-N))*Math.cos(3*(o+N))),o+=i/6375020.48098897;}while(i>=.001);const n=Math.sin(o)*Math.sin(o),d=Math.tan(o)*Math.tan(o),M=1/Math.cos(o),H=.9996012717*e*Math.pow(1-T*n,-.5),O=6332495.651423464*Math.pow(1-T*n,-1.5),l=H/O-1,J=Math.tan(o)/(2*O*H),c=Math.tan(o)/(24*O*Math.pow(H,3))*(5+3*d+l-9*d*l),g=Math.tan(o)/(720*O*Math.pow(H,5))*(61+90*d+45*d*d),U=M/H,L=M/(6*H*H*H)*(H/O+2*d),u=M/(120*Math.pow(H,5))*(5+28*d+24*d*d),C=M/(5040*Math.pow(H,7))*(61+662*d+1320*d*d+720*d*d*d),Y=o-J*Math.pow(r-S,2)+c*Math.pow(r-S,4)-g*Math.pow(r-S,6),f=U*(r-S)-.034906585039887-L*Math.pow(r-S,3)+u*Math.pow(r-S,5)-C*Math.pow(r-S,7);return new s(t*Y,t*f).to_WGS84()}}class O extends S{country="GB";GridCoords=H;gridCoords=null;constructor(){super();}parse_well_formed(N){N.length>=5&&/^[A-Z]/.test(N.charAt(4))&&(S.quadrantOffsets.hasOwnProperty(N.substr(N.length-2))?this.quadrantCode=N.substr(N.length-2):this.tetradLetter=N.charAt(4),N=N.substr(0,4)),this.parse_wellformed_gb_gr_string_no_tetrads(N),this.tetradLetter||this.quadrantCode?this.tetradLetter?(this.preciseGridRef=this.tetrad=this.hectad+this.tetradLetter,this.length=2e3,this.gridCoords.x+=S.tetradOffsets[this.tetradLetter][0],this.gridCoords.y+=S.tetradOffsets[this.tetradLetter][1]):(this.preciseGridRef=this.quadrant=N+this.quadrantCode,this.length=5e3,this.gridCoords.x+=S.quadrantOffsets[this.quadrantCode][0],this.gridCoords.y+=S.quadrantOffsets[this.quadrantCode][1]):(this.preciseGridRef=N,this.length<=1e3&&this.set_tetrad());}from_string(N){let t,e=N.replace(/[\[\]\s\t.-]+/g,"").toUpperCase(),T="";if(/[ABCDEFGHIJKLMNPQRSTUVWXYZ]$/.test(e)&&(S.quadrantOffsets.hasOwnProperty(e.substr(e.length-2))?(this.quadrantCode=e.substr(e.length-2),e=e.substr(0,e.length-2)):(T=e.substr(e.length-1),e=e.substr(0,e.length-1))),e===parseInt(e,10).toString()?e=e.substr(0,2)+"/"+e.substr(2):e.length>3&&"/"===e.charAt(2)&&/^[A-Z]{2}$/.test(e.substr(0,2))&&(e=e.replace("/","")),"VC"===e.substr(0,2))this.error=!0,this.errorMessage="Misplaced vice-county code in grid-reference field. ('"+e+"')",this.gridCoords=null,this.length=0;else if(null!==(t=e.match(/^([HJNOST][ABCDEFGHJKLMNOPQRSTUVWXYZ](?:\d\d){1,5})$/)))e=t[0],this.parse_wellformed_gb_gr_string_no_tetrads(e),this.length>0?1e4===this.length&&(T||this.quadrantCode)?T?(this.preciseGridRef=e+T,this.tetradLetter=T,this.tetrad=this.hectad+T,this.length=2e3,this.gridCoords.x+=S.tetradOffsets[T][0],this.gridCoords.y+=S.tetradOffsets[T][1]):(this.preciseGridRef=e+this.quadrantCode,this.tetradLetter="",this.tetrad="",this.quadrant=this.preciseGridRef,this.length=5e3,this.gridCoords.x+=S.quadrantOffsets[this.quadrantCode][0],this.gridCoords.y+=S.quadrantOffsets[this.quadrantCode][1]):(this.preciseGridRef=e,this.length<=1e3&&this.set_tetrad()):(this.error=!0,this.errorMessage="GB grid reference format not understood (strange length).");else if(/^([\d]{2})\/((?:\d\d){1,5})$/.test(e)){switch(this.parse_gr_string_without_tetrads(e),this.length){case 1e4:e=this.gridCoords.to_gridref(1e4),this.hectad=e,T?(e+=T,this.tetradLetter=T,this.tetrad=this.hectad+T,this.length=2e3,this.gridCoords.x+=S.tetradOffsets[T][0],this.gridCoords.y+=S.tetradOffsets[T][1]):this.quadrantCode&&(e+=this.quadrantCode,this.quadrant=e,this.length=5e3,this.gridCoords.x+=S.quadrantOffsets[this.quadrantCode][0],this.gridCoords.y+=S.quadrantOffsets[this.quadrantCode][1]);break;case 1e3:case 100:case 10:case 1:e=this.gridCoords.to_gridref(this.length),this.hectad=this.gridCoords.to_gridref(1e4),this.set_tetrad();break;default:this.error=!0,this.errorMessage="Bad grid square dimension ("+this.length+" m).",this.gridCoords=null,this.length=0;}this.preciseGridRef=e;}else this.gridCoords=null,this.length=0,this.error=!0,this.errorMessage="Grid reference format not understood. ('"+N+"')";}parse_gr_string_without_tetrads(N){let t,e,T,s;if(null!==(t=N.match(/^(\d{2})\/((?:\d\d){1,5})$/))){switch(t[1]){case"57":e=3e5,T=1e6;break;case"67":e=4e5,T=1e6;break;case"58":e=3e5,T=11e5;break;case"68":e=4e5,T=11e5;break;case"69":e=4e5,T=12e5;break;default:e=1e5*N.charAt(0),T=1e5*N.charAt(1);}s=t[2];}else {if(!S.letterMapping.hasOwnProperty(N.charAt(0))||!S.letterMapping.hasOwnProperty(N.charAt(1)))return this.length=0,void(this.gridCoords=null);let t=S.letterMapping[N.charAt(0)],r=S.letterMapping[N.charAt(1)];s=N.substr(2),e=t%5*5e5+r%5*1e5-1e6,T=5e5*-Math.floor(t/5)-1e5*Math.floor(r/5)+19e5;}switch(s.length){case 2:this.gridCoords=new H(e+1e4*s.charAt(0),T+1e4*s.charAt(1)),this.length=1e4;break;case 4:this.gridCoords=new H(e+1e3*Math.floor(s/100),T+s%100*1e3),this.length=1e3;break;case 6:this.gridCoords=new H(e+100*Math.floor(s/1e3),T+s%1e3*100),this.length=100;break;case 8:this.gridCoords=new H(e+10*Math.floor(s/1e4),T+s%1e4*10),this.length=10;break;case 10:this.gridCoords=new H(e+Math.floor(s/1e5),T+s%1e5),this.length=1;break;default:console.log("Bad grid ref length, ref="+N),this.gridCoords=null,this.length=0;}}parse_wellformed_gb_gr_string_no_tetrads(N){let t,e,T,s,r;switch(t=S.letterMapping[N.charAt(0)],e=S.letterMapping[N.charAt(1)],T=N.substr(2),s=t%5*5e5+e%5*1e5-1e6,r=5e5*-Math.floor(t/5)-1e5*Math.floor(e/5)+19e5,T.length){case 2:this.gridCoords=new H(s+1e4*T.charAt(0),r+1e4*T.charAt(1)),this.length=1e4,this.hectad=N;break;case 4:this.gridCoords=new H(s+1e3*Math.floor(T/100),r+T%100*1e3),this.length=1e3,this.hectad=N.substr(0,3)+N.substr(4,1);break;case 6:this.gridCoords=new H(s+100*Math.floor(T/1e3),r+T%1e3*100),this.length=100,this.hectad=N.substr(0,3)+N.substr(5,1);break;case 8:this.gridCoords=new H(s+10*Math.floor(T/1e4),r+T%1e4*10),this.length=10,this.hectad=N.substr(0,3)+N.substr(6,1);break;case 10:this.gridCoords=new H(s+Math.floor(T/1e5),r+T%1e5),this.length=1,this.hectad=N.substr(0,3)+N.substr(7,1);break;default:throw this.gridCoords=null,new Error("Bad grid ref length when parsing supposedly well-formed ref, ref='"+N+"'")}}}class l extends h{country="IE";gridCoords=null;constructor(S,N){super(),this.x=S,this.y=N;}static irishGrid={0:["V","Q","L","F","A"],1:["W","R","M","G","B"],2:["X","S","N","H","C"],3:["Y","T","O","J","D"]};to_latLng(){const S=1.000035,N=6377340.189,e=.0066705402933363,T=.0016732203841521,s=this.x-2e5,r=.0067153352074207,h=(5929615.3530033+(this.y-25e4)/S)/6366691.7742864415,i=h+.002509826623715886*Math.sin(2*h)+36745487490091978e-22*Math.sin(4*h)+151*T*T*T/96*Math.sin(6*h),o=N/Math.sqrt(1-e*Math.sin(i)*Math.sin(i)),n=Math.tan(i)*Math.tan(i),d=r*Math.cos(i)*Math.cos(i),M=N*(1-e)/Math.pow(1-e*Math.sin(i)*Math.sin(i),1.5),H=s/(o*S);let O=i-o*Math.tan(i)/M*(H*H/2-(5+3*n+10*d-4*d*d-9*r)*H*H*H*H/24+(61+90*n+298*d+45*n*n-1.6922644722700164-3*d*d)*H*H*H*H*H*H/720);O*=t;let l=(H-(1+2*n+d)*H*H*H/6+(5-2*d+28*n-3*d*d+8*r+24*n*n)*H*H*H*H*H/120)/Math.cos(i);return l=l*t-8,new a(O,l).to_WGS84()}to_gridref(S){const N=Math.floor(this.x/1e5),t=Math.floor(this.y/1e5);return l.irishGrid[N]&&l.irishGrid[N][t]?i(l.irishGrid[N][t],this.x-1e5*N,this.y-1e5*t,S||1):null}to_hectad(){const S=Math.floor(this.x/1e5),N=Math.floor(this.y/1e5);return l.irishGrid[S]&&l.irishGrid[S][N]?l.irishGrid[S][N]+Math.floor(this.x%1e5/1e4)+Math.floor(this.y%1e5/1e4):""}}class J extends S{constructor(){super(),this.parse_well_formed=this.from_string;}country="IE";GridCoords=l;gridCoords=null;static gridLetter={A:[0,4],B:[1,4],C:[2,4],D:[3,4],F:[0,3],G:[1,3],H:[2,3],J:[3,3],L:[0,2],M:[1,2],N:[2,2],O:[3,2],Q:[0,1],R:[1,1],S:[2,1],T:[3,1],V:[0,0],W:[1,0],X:[2,0],Y:[3,0]};from_string(S){let N=S.replace(/[\[\]\s\t.-]+/g,"").toUpperCase();/[ABCDEFGHIJKLMNPQRSTUVWXYZ]$/.test(N)&&(J.quadrantOffsets.hasOwnProperty(N.substr(N.length-2))?(this.quadrantCode=N.substr(N.length-2),N=N.substr(0,N.length-2)):(this.tetradLetter=N.substr(N.length-1),N=N.substr(0,N.length-1))),this.parse_gr_string_without_tetrads(N),this.length>0?this.tetradLetter||this.quadrantCode?this.tetradLetter?(this.preciseGridRef=this.hectad+this.tetradLetter,this.tetrad=this.preciseGridRef,this.length=2e3,this.gridCoords.x+=J.tetradOffsets[this.tetradLetter][0],this.gridCoords.y+=J.tetradOffsets[this.tetradLetter][1]):(this.preciseGridRef=this.hectad+this.quadrantCode,this.quadrant=this.preciseGridRef,this.length=5e3,this.gridCoords.x+=J.quadrantOffsets[this.quadrantCode][0],this.gridCoords.y+=J.quadrantOffsets[this.quadrantCode][1]):(this.preciseGridRef=N,this.length<=1e3&&this.set_tetrad()):(this.error=!0,this.errorMessage="Irish grid reference format not understood. ('"+S+"')");}static _IE_GRID_LETTERS="VQLFAWRMGBXSNHCYTOJD";parse_gr_string_without_tetrads(S){let N,t,e,T;if(/^\d{2}\/(?:\d\d){1,5}$/.test(S)){if(N=parseInt(S.charAt(0),10),t=parseInt(S.charAt(1),10),N>3||t>4)return console.log("bad grid square, ref='"+S+"' (Ireland)"),this.length=0,!1;e=S.substr(3),T=J._IE_GRID_LETTERS.charAt(5*N+t),N*=1e5,t*=1e5;}else {if(S=S.replace("/",""),!/^[ABCDFGHJLMNOQRSTVWXY](?:\d\d){1,5}$/.test(S))return this.length=0,this.gridCoords=null,!1;if(!S)return console.log("Bad (empty) Irish grid ref"),this.length=0,this.gridCoords=null,!1;{T=S.charAt(0);let e=J._IE_GRID_LETTERS.indexOf(T);if(-1===e)return console.log("Bad grid ref grid-letter, ref='"+S+"' (Ireland)"),this.length=0,this.gridCoords=null,!1;N=1e5*Math.floor(e/5),t=e%5*1e5;}e=S.substr(1);}switch(e.length){case 2:this.gridCoords=new l(N+1e4*e.charAt(0),t+1e4*e.charAt(1)),this.length=1e4,this.hectad=T+e;break;case 4:this.gridCoords=new l(N+1e3*Math.floor(e/100),t+e%100*1e3),this.length=1e3,this.hectad=T+e.charAt(0)+e.charAt(2);break;case 6:this.gridCoords=new l(N+100*Math.floor(e/1e3),t+e%1e3*100),this.length=100,this.hectad=T+e.charAt(0)+e.charAt(3);break;case 8:this.gridCoords=new l(N+10*Math.floor(e/1e4),t+e%1e4*10),this.length=10,this.hectad=T+e.charAt(0)+e.charAt(4);break;case 10:this.gridCoords=new l(N+Math.floor(e/1e5),t+e%1e5),this.length=1,this.hectad=T+e.charAt(0)+e.charAt(5);break;default:return console.log("Bad grid ref length, ref='"+S+"' (Ireland)"),this.length=0,this.gridCoords=null,!1}return !0}}S.from_string=function(S){let N,t=S.replace(/\s+/g,"").toUpperCase();if(!t)return !1;if(/^(?:[BCDFGHJLMNOQRSTVWXY]|[HJNOST][ABCDEFGHJKLMNOPQRSTUVWXYZ]|W[VA])\d{2}(?:[A-Z]|[NS][EW]|(?:\d{2}){0,4})?$/.test(t))return N=/^.\d/.test(t)?new J:"W"===t.charAt(0)?new M:new O,N.parse_well_formed(t),!(!N.length||N.error)&&N;if(N=new O,N.from_string(t),N.length&&!N.error)return N;if("W"===t.charAt(0)){if(N=new M,N.from_string(t),N.length&&!N.error)return N}else if(N=new J,N.from_string(t),N.length&&!N.error)return N;return !1};const c=H;(s.prototype.to_os_coords=function(){var S=this.lat*N,t=this.lng*N,T=.9996012717,s=.0066705397616,r=6377563.396*T,a=6356256.91*T,h=Math.sin(S)*Math.sin(S),i=r/Math.sqrt(1-s*h),o=i*(1-s)/(1-s*h),n=i/o-1,d=t- -.03490658503988659,M=i*Math.cos(S),H=Math.pow(Math.cos(S),3),O=Math.tan(S)*Math.tan(S),l=i/6*H*(i/o-O),J=Math.pow(Math.cos(S),5),g=Math.pow(Math.tan(S),4),U=i/120*J*(5-18*O+g+14*n-58*O*n),L=4e5+d*M+Math.pow(d,3)*l+Math.pow(d,5)*U,u=e._Marc(a,.0016732202503250907,.8552113334772214,S)+-1e5,C=i/2*Math.sin(S)*Math.cos(S),Y=i/24*Math.sin(S)*Math.pow(Math.cos(S),3)*(5-Math.pow(Math.tan(S),2)+9*n),f=i/720*Math.sin(S)*J*(61-58*O+g),P=u+d*d*C+Math.pow(d,4)*Y+Math.pow(d,6)*f;return new c(Math.round(L),Math.round(P))},s);const U=l;(a.prototype.to_os_coords=function(){var S=this.lat*N,t=this.lng*N,T=1.000035,s=.00667054015,r=6377340.189*T,a=6356034.447*T,h=Math.sin(S)*Math.sin(S),i=r/Math.sqrt(1-s*h),o=i*(1-s)/(1-s*h),n=i/o-1,d=t- -.13962634015954636,M=i*Math.cos(S),H=Math.pow(Math.cos(S),3),O=Math.tan(S)*Math.tan(S),l=i/6*H*(i/o-O),J=Math.pow(Math.cos(S),5),c=Math.pow(Math.tan(S),4),g=i/120*J*(5-18*O+c+14*n-58*O*n),L=2e5+d*M+Math.pow(d,3)*l+Math.pow(d,5)*g,u=e._Marc(a,.0016732203841520518,.9337511498169663,S)+25e4,C=i/2*Math.sin(S)*Math.cos(S),Y=i/24*Math.sin(S)*Math.pow(Math.cos(S),3)*(5-Math.pow(Math.tan(S),2)+9*n),f=i/720*Math.sin(S)*J*(61-58*O+c),P=u+d*d*C+Math.pow(d,4)*Y+Math.pow(d,6)*f;return new U(Math.round(L),Math.round(P))},a);const u=o;(r.prototype.to_os_coords=function(){var S=this.lat*N,t=this.lng*N,T=.9996,s=.0067226700223333,r=6378388*T,a=6356911.946*T,h=Math.sin(S)*Math.sin(S),i=r/Math.sqrt(1-s*h),o=i*(1-s)/(1-s*h),n=i/o-1,d=t- -.0523598775598,M=i*Math.cos(S),H=Math.pow(Math.cos(S),3),O=Math.tan(S)*Math.tan(S),l=i/6*H*(i/o-O),J=Math.pow(Math.cos(S),5),c=Math.pow(Math.tan(S),4),g=i/120*J*(5-18*O+c+14*n-58*O*n),U=5e5+d*M+Math.pow(d,3)*l+Math.pow(d,5)*g,L=e._Marc(a,.0016863406508729017,0,S)+0,C=i/2*Math.sin(S)*Math.cos(S),Y=i/24*Math.sin(S)*Math.pow(Math.cos(S),3)*(5-Math.pow(Math.tan(S),2)+9*n),f=i/720*Math.sin(S)*J*(61-58*O+c),P=L+d*d*C+Math.pow(d,4)*Y+Math.pow(d,6)*f;return new u(Math.round(U),Math.round(P))},r);

/**
 * Wrapper for GPS access, including support for user-interface nudges
 */
class GPSRequest extends EventHarness {

    static DEVICE_TYPE_UNKNOWN = 'unknown';
    static DEVICE_TYPE_UNCHECKED = 'unchecked';
    static DEVICE_TYPE_MOBILE = 'mobile';
    static DEVICE_TYPE_IMMOBILE = 'immobile';

    static EVENT_GPS_PERMISSION_CHANGE = 'gpspermissionchange';

    /**
     * global flag affecting behaviour of some GPS functionality
     * e.g. on a non-mobile device, don't automatically seek GPS locality for new records
     *
     * @type {string}
     */
    static _deviceType = GPSRequest.DEVICE_TYPE_UNCHECKED;

    /**
     * @returns {string}
     */
    static getDeviceType() {
        if (GPSRequest._deviceType === GPSRequest.DEVICE_TYPE_UNCHECKED) {
            if (navigator.userAgentData) {
                GPSRequest._deviceType = navigator.userAgentData.mobile ?
                    GPSRequest.DEVICE_TYPE_MOBILE : GPSRequest.DEVICE_TYPE_IMMOBILE;
                console.log(`Evaluated device using mobile flag, result: ${GPSRequest._deviceType}`);
            } else if (/Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent)) {
                // see https://javascript.plainenglish.io/how-to-detect-a-mobile-device-with-javascript-1c26e0002b31
                console.log(`Detected mobile via use-agent string: ${navigator.userAgent}`);
                GPSRequest._deviceType = GPSRequest.DEVICE_TYPE_MOBILE;
            } else {
                console.log('Flagging device type as unknown.');
                GPSRequest._deviceType = GPSRequest.DEVICE_TYPE_UNKNOWN;
            }
        }

        return GPSRequest._deviceType;
    }

    static GPS_PERMISSION_UNKNOWN = 'unknown';
    static GPS_PERMISSION_UNCHECKED = 'unchecked';
    static GPS_PERMISSION_GRANTED = 'granted';
    static GPS_PERMISSION_DENIED = 'denied';
    static GPS_PERMISSION_PROMPT = 'prompt';

    static _gpsPermission = GPSRequest.GPS_PERMISSION_UNCHECKED;

    /**
     * @type {GPSRequest}
     */
    static gpsEventObject;

    /**
     * @returns {string} GPSRequest.GPS_PERMISSION_
     */
    static async haveGPSPermission() {
        if (GPSRequest._gpsPermission === GPSRequest.GPS_PERMISSION_UNCHECKED) {
            GPSRequest._gpsPermission = GPSRequest.GPS_PERMISSION_UNKNOWN; // make unknown while checking to avoid any race condition
            GPSRequest.gpsEventObject = new GPSRequest();

            if (navigator.permissions && navigator.permissions.query) {
                await navigator.permissions.query({name: 'geolocation'}).then(function (permissionStatus) {
                    permissionStatus.onchange = function () {
                        console.log('geolocation permission status has changed to ', this.state);
                        GPSRequest._gpsPermission = this.state;
                        GPSRequest.gpsEventObject.fireEvent(GPSRequest.EVENT_GPS_PERMISSION_CHANGE, GPSRequest._gpsPermission);
                    };

                    //console.log({'GPS permission state': permissionStatus.state});
                    GPSRequest._gpsPermission = permissionStatus.state;
                });
            } else {
                GPSRequest._gpsPermission = GPSRequest.GPS_PERMISSION_UNKNOWN;
            }
        }

        return GPSRequest._gpsPermission;
    }

    /**
     * returns a promise with GPSRequest.GPS_PERMISSION_ parameter
     *
     * @returns {Promise<string>} GPSRequest.GPS_PERMISSION_
     */
    static haveGPSPermissionPromise() {
        if (GPSRequest._gpsPermission === GPSRequest.GPS_PERMISSION_UNCHECKED) {
            GPSRequest._gpsPermission = GPSRequest.GPS_PERMISSION_UNKNOWN; // make unknown while checking to avoid any race condition

            GPSRequest.gpsEventObject = new GPSRequest();

            if (navigator.permissions && navigator.permissions.query) {
                return navigator.permissions.query({name: 'geolocation'}).then(function (permissionStatus) {
                    permissionStatus.onchange = function () {
                        console.log('geolocation permission status has changed to ', this.state);
                        GPSRequest._gpsPermission = this.state;
                        GPSRequest.gpsEventObject.fireEvent(GPSRequest.EVENT_GPS_PERMISSION_CHANGE, GPSRequest._gpsPermission);
                    };

                    //console.log({'GPS permission state': permissionStatus.state});
                    GPSRequest._gpsPermission = permissionStatus.state;
                    return GPSRequest._gpsPermission;
                })
            } else {
                GPSRequest._gpsPermission = GPSRequest.GPS_PERMISSION_UNKNOWN;

                return new Promise(() => GPSRequest._gpsPermission);
            }
        } else {
            return new Promise(() => GPSRequest._gpsPermission);
        }
    }

    static _setGPSPermission(state) {
        if (GPSRequest._gpsPermission !== state) {
            GPSRequest._gpsPermission = state;

            if (GPSRequest.gpsEventObject) {
                GPSRequest.gpsEventObject.fireEvent(GPSRequest.EVENT_GPS_PERMISSION_CHANGE, GPSRequest._gpsPermission);
            }
        }
    }

    /**
     *
     * @param {string=} gpsPromptBannerId
     * @return Promise
     */
    static seekGPS (gpsPromptBannerId) {
        GPSRequest.haveGPSPermission(); // ensures that GPSRequest._gpsPermission is initialised

        // for delayed prompt see Google's UI advice here: https://developers.google.com/web/fundamentals/native-hardware/user-location
        let nudge = gpsPromptBannerId ? document.getElementById(gpsPromptBannerId) : null;

        let showNudgeBanner = nudge ? function() {
            nudge.style.display = "block";
        } : function() {};

        let hideNudgeBanner = nudge ? function() {
            nudge.style.display = "none";
        } : function() {};

        let nudgeTimeoutId;

        if (nudge && GPSRequest._gpsPermission !== GPSRequest.GPS_PERMISSION_GRANTED) {
            nudgeTimeoutId = setTimeout(showNudgeBanner, 5000);
        } else {
            nudgeTimeoutId = null;
        }

        return new Promise((resolve, reject) =>
            navigator.geolocation.getCurrentPosition(resolve, reject, {
                enableHighAccuracy : true,
                timeout : 30 * 1000, // 30 second timeout
                maximumAge : 20 * 1000, // can use a cached response from up to 20s ago
            })
        ).then((position) => {
            // const latitude  = position.coords.latitude;
            // const longitude = position.coords.longitude;

            //
            //
            // const gridCoords = GridCoords.from_latlng(latitude, longitude);
            // const gridRef = gridCoords.to_gridref(1000);
            //
            // console.log(`Got grid-ref: ${gridRef}`);
            // this.value = gridRef;
            // this.fireEvent(FormField.EVENT_CHANGE);

            const latitude  = position.coords.latitude;
            const longitude = position.coords.longitude;

            console.log(`Got GPS fix ${latitude} , ${longitude}`);
            //@todo maybe should prevent use of readings if speed is too great (which might imply use of GPS in a moving vehicle)

            // this.processLatLngPosition(
            //     position.coords.latitude,
            //     position.coords.longitude,
            //     position.coords.accuracy * 2
            // );

            if (nudge) {
                clearTimeout(nudgeTimeoutId);
                hideNudgeBanner();
            }

            // unsure if this should be set as permission may only have been one-off
            //GPSRequest._gpsPermission = GPSRequest.GPS_PERMISSION_GRANTED;
            GPSRequest._setGPSPermission(GPSRequest.GPS_PERMISSION_GRANTED);

            return position;
        }, (error) => {
            console.log({'gps look-up failed' : error});

            switch(error.code) {
                case error.TIMEOUT:
                case error.PERMISSION_DENIED:
                    // The user didn't accept the callout
                    nudge && showNudgeBanner();
                    break;
            }

            return null;
        });
    }
}

/**
 *
 * @param {MouseEvent} event
 * @returns {boolean}
 */
function doubleClickIntercepted(event) {
    if (event.detail && event.detail > 1) {
        event.preventDefault();
        event.stopPropagation();
        return true;
    }

    return false;
}

class TextGeorefField extends FormField {

    /**
     * @type {string}
     */
    _inputId;

    /**
     * @type {string}
     */
    containerId;

    /**
     * set if map has a well-defined zoom and centre
     * (i.e. has been initialised from a typed grid-ref, a manual re-centre or user-click)
     *
     * @type {boolean}
     */
    mapPositionIsCurrent = false;

    /**
     *
     * @type {{
     * rawString: string,
     * precision: number|null,
     * source: string,
     * gridRef: string,
     * latLng: ({lat:number,lng:number}|null)
     * }}
     * @private
     */
    _value = {
        gridRef: '',
        rawString: '', // what was provided by the user to generate this grid-ref (might be a postcode or placename)
        source: TextGeorefField.GEOREF_SOURCE_UNKNOWN,
        latLng: null,
        precision: null
    };

    static GEOREF_SOURCE_UNKNOWN = 'unknown';
    static GEOREF_SOURCE_GRIDREF = 'gridref';
    static GEOREF_SOURCE_MAP = 'map';
    static GEOREF_SOURCE_GPS = 'gps';
    static GEOREF_SOURCE_POSTCODE = 'postcode';
    static GEOREF_SOURCE_PLACE = 'place';

    /**
     *
     * @type {string}
     * @private
     */
    _inputType = 'text';

    /**
     *
     * @type {string}
     */
    _autocomplete = '';

    /**
     * the maximum precision to use for geocoded results
     *
     * @type {?int}
     */
    baseSquareResolution = null;

    /**
     * minimum (least precise) precision (m diameter) to allow
     *
     * @type {number}
     */
    minResolution = 2000;

    /**
     * maximum (most precise) precision (m diameter) to allow
     * @type {number}
     */
    maxResolution = 10;

    /**
     * if set then as well as labelling the GPS button with a symbol, also include text 'GPS'
     * @type {boolean}
     */
    gpsTextLabel = false;

    /**
     *
     * @type {string}
     */
    gpsPermissionsPromptText = '<p class="gps-nudge">Allowing access to GPS will save you time by allowing the app to locate your records automatically.</p>';

    /**
     *
     * @type {boolean}
     */
    initialiseFromDefaultSurveyGeoref = false;

    /**
     *
     * @type {boolean}
     */
    showGPSEnableLinkIfNotActiveOnMobile = true;

    // /**
    //  * if set (default false) then the field's placeholder changes dynamically, e.g. depending on the surveys base georef.
    //  *
    //  * @type {boolean}
    //  */
    // dynamicPlaceholderFlag = false;

    /**
     *
     * @type {null|string}
     * @private
     */
    _gpsPermissionsPromptId = null;

    /**
     *
     * @param {{
     * [label] : string,
     * [helpText]: string,
     * [options]: {},
     * [placeholder]: string,
     * [type]: string,
     * [autocomplete]: string,
     * [baseSquareResolution]: ?number,
     * [maxResolution]: ?number,
     * [minResolution]: ?number,
     * [gpsPermissionPromptText]: string,
     * [initialiseFromDefaultSurveyGeoref] : boolean,
     * [gpsTextLabel] : boolean,
     * [showGPSEnableLinkIfNotActiveOnMobile] : boolean,
     * }} [params]
     */
    constructor (params) {
        super(params);

        if (params) {
            if (params.type) {
                this._inputType = params.type;
            }

            if (params.placeholder) {
                this.placeholder = params.placeholder;
            }

            // if (params.dynamicPlaceholder) {
            //     this.dynamicPlaceholder = params.dynamicPlaceholder;
            // }

            if (params.autocomplete) {
                this._autocomplete = params.autocomplete;
            }

            if (params.baseSquareResolution) {
                this.baseSquareResolution = params.baseSquareResolution;
            }

            if (params.maxResolution) {
                this.maxResolution = params.maxResolution;
            }

            if (params.minResolution) {
                this.minResolution = params.minResolution;
            }

            if (params.gpsPermissionPromptText) {
                this.gpsPermissionsPromptText = params.gpsPermissionPromptText;
            }

            if (params.gpsTextLabel) {
                this.gpsTextLabel = params.gpsTextLabel;
            }

            if (params.hasOwnProperty('initialiseFromDefaultSurveyGeoref')) {
                this.initialiseFromDefaultSurveyGeoref = params.initialiseFromDefaultSurveyGeoref;
            }

            if (params.hasOwnProperty('showGPSEnableLinkIfNotActiveOnMobile')) {
                this.showGPSEnableLinkIfNotActiveOnMobile = params.showGPSEnableLinkIfNotActiveOnMobile;
            }
        }
    }

    /**
     *
     * @param {({rawString: string, precision: number|null, source: string|null, gridRef: string, latLng: Array|null}|string|null)} georefSpec
     */
    set value(georefSpec) {
        //this._value = (undefined === textContent || null == textContent) ? '' : textContent.trim();

        if (georefSpec) {
            if (typeof (georefSpec) === 'string') {
                // backward compatible string gridref
                this._value = {
                    gridRef: georefSpec,
                    rawString: georefSpec, // what was provided by the user to generate this grid-ref (might be a postcode or placename)
                    source: TextGeorefField.GEOREF_SOURCE_UNKNOWN,
                    latLng: null,
                    precision: null
                };
            } else {
                this._value = georefSpec;
            }
        } else {
            this._value = {
                gridRef: '',
                rawString: '', // what was provided by the user to generate this grid-ref (might be a postcode or placename)
                source: null,
                latLng: null,
                precision: null
            };
        }

        this.updateView();
    }

    /**
     *
     * @returns {{rawString: string, precision: number|null, source: string|null, gridRef: string, latLng: Array|null}}
     */
    get value() {
        return this._value;
    }

    updateView() {
        if (this._fieldEl) {
            // do nothing until the view has been constructed

            const inputEl = document.getElementById(this._inputId);
            inputEl.value = FormField.cleanRawString(this._value.gridRef);
        }
    }

    /**
     * initialises this._fieldEl
     *
     * @returns {void}
     */
    buildField() {
        // <div class="form-group">
        //     <label for="{baseId}gridref">Postcode or grid-reference</label>
        //     <input type="text" class="form-control" id="{baseId}gridref" aria-describedby="{baseId}grHelp" placeholder="Grid-reference or postcode">
        //     <small id="{baseId}grHelp" class="form-text text-muted">We need to be able to put your survey on our map. Detailed locations won't be made public.</small>
        // </div>

        // <div class="form-group">
        //     <label for="{baseId}gridref">Postcode or grid-reference</label>
        //     <div class="input-group">
        //         <input id="{baseId}gridref" aria-describedby="{baseId}grHelp" type="text" class="form-control" placeholder="Grid-reference or postcode" autocomplete="postal-code" required>
        //         <span class="input-group-btn">
        //             <button id="gps" type="button" class="btn btn-outline-secondary btn-sm" title="use GPS">
        //                 <span class="material-icons">gps_not_fixed</span>
        //             </button>
        //         </span>
        //     </div>
        //     <small id="{baseId}grHelp" class="form-text text-muted">We need to be able to put your survey on our map. Detailed locations won't be made public.</small>
        // </div>

        const container = document.createElement('div');
        container.className = 'form-group';
        this.containerId = container.id = FormField.nextId;

        this._inputId = FormField.nextId;

        if (navigator.geolocation && this.showGPSEnableLinkIfNotActiveOnMobile && GPSRequest.getDeviceType() === GPSRequest.DEVICE_TYPE_MOBILE) {
            // if on a mobile device and GPS is not turned on

            const gpsEnabledLinkEl = document.createElement('a');
            gpsEnabledLinkEl.className = 'no-gps-link-prompt'; // will be visible only if document body doesn't have a 'gps-enabled' class
            gpsEnabledLinkEl.href = '#';
            gpsEnabledLinkEl.innerText = 'Please enable GPS';
            container.appendChild(gpsEnabledLinkEl);

            gpsEnabledLinkEl.addEventListener('click', this.gpsButtonClickHandler.bind(this));
        }

        const labelEl = container.appendChild(document.createElement('label'));
        labelEl.htmlFor = this._inputId;
        labelEl.textContent = this.label;

        const inputGroupEl = container.appendChild(document.createElement('div'));
        inputGroupEl.className = 'input-group';

        const inputField = inputGroupEl.appendChild(document.createElement('input'));
        inputField.className = "form-control";
        inputField.id = this._inputId;
        inputField.type = 'text';

        if (this.placeholder) {
            inputField.placeholder = this.placeholder;
        }

        if (this._autocomplete) {
            inputField.autocomplete = this._autocomplete;

            if ('off' === this._autocomplete) {
                // browsers tend to ignore autocomplete off, so also assign a random 'name' value
                inputField.name = uuid();
            }
        }

        const buttonContainerEl = inputGroupEl.appendChild(document.createElement('span'));
        buttonContainerEl.className = 'input-group-btn';

        if (navigator.geolocation) {
            const gpsButton = buttonContainerEl.appendChild(document.createElement('button'));
            gpsButton.id = FormField.nextId;
            gpsButton.type = 'button';
            gpsButton.className = 'btn btn-outline-secondary btn-sm';
            gpsButton.title = 'use GPS';

            if (this.gpsTextLabel) {
                const gpsTextLabel = gpsButton.appendChild(document.createElement('span'));
                gpsTextLabel.style.verticalAlign = 'middle';
                gpsTextLabel.innerText = 'GPS ';
            }

            const buttonIconEl = gpsButton.appendChild(document.createElement('span'));
            buttonIconEl.className = 'material-icons';
            buttonIconEl.innerText = 'gps_not_fixed';

            if (this.gpsTextLabel) {
                buttonIconEl.style.verticalAlign = 'middle';
            }

            gpsButton.addEventListener('click', this.gpsButtonClickHandler.bind(this));
        }

        if (this.completion === FormField.COMPLETION_COMPULSORY) {
            inputField.required = true;
        }

        if (this.validationMessage) {
            const validationMessageElement = container.appendChild(document.createElement('div'));
            validationMessageElement.className = 'invalid-feedback';
            validationMessageElement.innerHTML = this.validationMessage;
        }

        if (this.gpsPermissionsPromptText && navigator.geolocation) {
            const gpsPermissionsPromptField = container.appendChild(document.createElement('small'));
            this._gpsPermissionsPromptId = gpsPermissionsPromptField.id = FormField.nextId;
            gpsPermissionsPromptField.style.display = 'none'; // hidden initially
            gpsPermissionsPromptField.innerHTML = this.gpsPermissionsPromptText;
        }

        if (this.helpText) {
            const helpTextField = container.appendChild(document.createElement('small'));
            helpTextField.innerHTML = this.helpText;
        }

        inputField.addEventListener('change', this.inputChangeHandler.bind(this));

        this._fieldEl = container;
    }

    /**
     *
     * @param {(boolean|null)} isValid
     */
    markValidity(isValid) {
        const el = document.getElementById(this._inputId);

        if (null === isValid) {
            el.classList.remove('is-invalid', 'is-valid');
        } else {
            el.classList.remove(isValid ? 'is-invalid' : 'is-valid');
            el.classList.add(isValid ? 'is-valid' : 'is-invalid');
        }
    }

    inputChangeHandler (event) {
        event.stopPropagation(); // don't allow the change event to reach the form-level event handler (will handle it here instead)

        //console.log('got input field change event');

        let rawValue = FormField.cleanRawString(document.getElementById(this._inputId).value);
        const gridRefParser = S.from_string(rawValue);

        this.mapPositionIsCurrent = false; // any linked map ought to be re-centred & zoomed

        if (gridRefParser) {
            this.value = {
                gridRef: gridRefParser.preciseGridRef,
                rawString: rawValue, // what was provided by the user to generate this grid-ref (might be a postcode or placename)
                source: TextGeorefField.GEOREF_SOURCE_GRIDREF,
                latLng: null,
                precision: null
            };
        } else {
            // should try geo-coding the value

            this.value = {
                gridRef: '',
                rawString: rawValue, // what was provided by the user to generate this grid-ref (might be a postcode or placename)
                source: TextGeorefField.GEOREF_SOURCE_UNKNOWN,
                latLng: null,
                precision: null
            };
        }

        this.fireEvent(FormField.EVENT_CHANGE);
    }

    // /**
    //  *
    //  * @param {MouseEvent} event
    //  */
    // gpsButtonClickHandler (event) {
    //     console.log('got gps button click event');
    //
    //     navigator.geolocation.getCurrentPosition((position) => {
    //         const latitude  = position.coords.latitude;
    //         const longitude = position.coords.longitude;
    //
    //         console.log(`Got GPS fix ${latitude} , ${longitude}`);
    //
    //         // const latLng = new LatLngWGS84(latitude, longitude);
    //         const gridCoords = GridCoords.from_latlng(latitude, longitude);
    //         const gridRef = gridCoords.to_gridref(1000);
    //
    //         console.log(`Got grid-ref: ${gridRef}`);
    //         this.value = gridRef;
    //         this.fireEvent(FormField.EVENT_CHANGE);
    //     }, (error) => {
    //         console.log('gps look-up failed');
    //         console.log(error);
    //     });
    // }

    /**
     *
     * @param {MouseEvent} event
     */
    gpsButtonClickHandler (event) {
        if (doubleClickIntercepted(event)) {
            return;
        }

        let containerEl = document.getElementById(this.containerId);

        containerEl.classList.add('gps-active');
        this.seekGPS().catch((error) => {
            console.log({'gps look-up failed, error' : error});
        }).finally(() => {
            containerEl.classList.remove('gps-active');
        });

        event.preventDefault();
        event.stopPropagation();
    }

    _seekingGPS = false;

    /**
     *
     * @returns {Promise<unknown>}
     */
    seekGPS() {

        if (this._seekingGPS) {
            // a GPS request is already in progress
            // don't allow concurrent GPS seek requests
            return Promise.reject();
        } else {
            this._seekingGPS = true;

            return GPSRequest.seekGPS(this._gpsPermissionsPromptId).then((position) => {
                this._seekingGPS = false;
                // const latitude  = position.coords.latitude;
                // const longitude = position.coords.longitude;

                // console.log(`Got GPS fix ${latitude} , ${longitude}`);
                //
                // const gridCoords = GridCoords.from_latlng(latitude, longitude);
                // const gridRef = gridCoords.to_gridref(1000);
                //
                // console.log(`Got grid-ref: ${gridRef}`);
                // this.value = gridRef;
                // this.fireEvent(FormField.EVENT_CHANGE);

                //@todo maybe should prevent use of readings if speed is too great (which might imply use of GPS in a moving vehicle)

                console.log({'gps position': position});
                let accuracy = position.coords.accuracy * 2;

                this.mapPositionIsCurrent = false; // force zoom and re-centre

                this.processLatLngPosition(
                    position.coords.latitude,
                    position.coords.longitude,
                    accuracy,
                    TextGeorefField.GEOREF_SOURCE_GPS
                );
            }, (error) => {
                this._seekingGPS = false;
                return error;
            });
        }
    }

    /**
     *
     * @param {number} latitude
     * @param {number} longitude
     * @param {number} precision diameter in metres
     * @param {string} source
     * @param {string} rawString
     */
    processLatLngPosition(latitude, longitude, precision, source, rawString = '') {
        const gridCoords = h.from_latlng(latitude, longitude);

        let scaledPrecision = S.get_normalized_precision(precision);
        if (this.maxResolution && scaledPrecision < this.maxResolution) {
            scaledPrecision = this.maxResolution;
        }

        if (this.minResolution && scaledPrecision > this.minResolution) {
            scaledPrecision = this.minResolution;
        }

        const gridRef = gridCoords.to_gridref(scaledPrecision);

        console.log(`Got grid-ref: ${gridRef}`);
        //this.value = gridRef;
        this.value = {
            gridRef: gridRef,
            rawString: rawString,
            source: source,
            latLng: {lat:latitude,lng:longitude},
            precision: precision
        };

        this.fireEvent(FormField.EVENT_CHANGE);
    }

    /**
     * by the time summariseImpl has been called have already checked that summary is wanted
     *
     * @param {string} key
     * @param {{
     *          field : TextGeorefField,
     *          attributes : {options : Object.<string, {label : string}>},
     *          summary : {summaryPrefix: string}
     *          }} property properties of the form descriptor
     * @param {Object.<string, {}>} attributes attributes of the model object
     * @return {string}
     */
    static summariseImpl(key, property, attributes) {
        return (attributes[key] !== '' && attributes[key] !== null && attributes[key] !== undefined && attributes[key].gridRef) ?
            `<span>grid-reference <span class="gridref-summary">${escapeHTML(attributes[key].gridRef.trim())}</span></span>`
            : '';
    }

    /**
     *
     * @param value
     * @returns {boolean}
     */
    static isEmpty(value) {
        return !(value && value.gridRef);
    }

    /**
     *
     *
     * @param {string} key
     * @param property
     * @param attributes
     * @returns {null|boolean}
     */
    static isValid(key, property, attributes) {
        //console.log("in TextGeorefField isValid");

        if (property.attributes.completion &&
            (property.attributes.completion === FormField.COMPLETION_COMPULSORY || property.attributes.completion === FormField.COMPLETION_DESIRED)
        ) {
            // test whether required field is missing
            if (!attributes.hasOwnProperty(key) || property.field.isEmpty(attributes[key])) {
                return false;
            } else {
                // check if grid-ref is set
                let geoRef = attributes[key];

                console.log({"testing gr validity" : geoRef});

                return !!(geoRef && geoRef.gridRef);
            }
        }
        // field is present or optional
        // report as valid unless content is corrupt

        return null; // field not assessed
    }
}

// a Survey captures the currentSurvey meta data

class Survey extends Model {

    /**
     * fired from Survey when the object's contents have been modified
     *
     * @type {string}
     */
    static EVENT_MODIFIED = 'modified';

    SAVE_ENDPOINT = '/savesurvey.php';

    TYPE = 'survey';

    /**
     *
     * @type {Object.<string, *>}
     */
    attributes = {

    };

    /**
     * if set then provide default values (e.g. GPS look-up of current geo-reference)
     *
     * @type {boolean}
     */
    isNew = false;

    /**
     * kludge to flag once the App singleton has set up a listner for changes on the survey
     * @type {boolean}
     */
    hasAppModifiedListener = false;

    /**
     *
     * @returns {({rawString: string, precision: number|null, source: string|null, gridRef: string, latLng: ({lat: number, lng: number}|null)}|null)}
     */
    get geoReference() {
        return this.attributes.georef || {
            gridRef: '',
            rawString: '', // what was provided by the user to generate this grid-ref (might be a postcode or placename)
            source: TextGeorefField.GEOREF_SOURCE_UNKNOWN,
            latLng: null,
            precision: null
        };
    };

    get date() {
        return this.attributes.date || '';
    }

    get place() {
        return this.attributes.place || '';
    }

    /**
     * called after the form has changed, before the values have been read back in to the occurrence
     *
     * @param {{form: SurveyForm}} params
     */
    formChangedHandler(params) {
        console.log('Survey change handler invoked.');

        // read new values
        // then fire its own change event (Occurrence.EVENT_MODIFIED)
        params.form.updateModelFromContent();

        console.log('Survey calling conditional validation.');

        // refresh the form's validation state
        params.form.conditionallyValidateForm();

        this.touch();
        this.fireEvent(Survey.EVENT_MODIFIED, {surveyId : this.id});
    }

    /**
     * Used for special-case setting of a custom attribute
     * (i.e. not usually one linked to a form)
     * e.g. used for updating the NYPH null-list flag
     *
     * @param attributeName
     * @param value
     */
    setAttribute(attributeName, value) {
        if (this.attributes[attributeName] !== value) {
            this.attributes[attributeName] = value;

            this.touch();
            this.fireEvent(Survey.EVENT_MODIFIED, {surveyId : this.id});
        }
    }

    /**
     *
     * @param {SurveyForm} form
     */
    registerForm(form) {
        form.model = this;
        form.addListener(Form.CHANGE_EVENT, this.formChangedHandler.bind(this));

        if (this.isNew) {
            form.fireEvent(Form.EVENT_INITIALISE_NEW, {}); // allows first-time initialisation of dynamic default data, e.g. starting a GPS fix
            form.liveValidation = false;
        } else {
            form.liveValidation = true;
        }
    }

    /**
     * if not securely saved then makes a post to /savesurvey.php
     *
     * this may be intercepted by a service worker, which could write the image to indexdb
     * a successful save will result in a json response containing the uri from which the image may be retrieved
     * and also the state of persistence (whether or not the image was intercepted by a service worker while offline)
     *
     * if saving fails then the expectation is that there is no service worker, in which case should attempt to write
     * the image directly to indexdb
     *
     * must test indexdb for this eventuality after the save has returned
     *
     * @returns {Promise}
     */
    save() {
        if (!this._savedRemotely) {
            const formData = new FormData;

            formData.append('type', this.TYPE);
            formData.append('surveyId', this.id);
            formData.append('id', this.id);
            formData.append('projectId', this.projectId.toString());
            formData.append('attributes', JSON.stringify(this.attributes));
            formData.append('deleted', this.deleted.toString());
            formData.append('created', this.createdStamp.toString());

            console.log('queueing survey post');
            return this.queuePost(formData);
        } else {
            return Promise.reject(`${this.id} has already been saved.`);
        }
    }

    /**
     *
     * @returns {string} an html-safe string based on the locality and creation date
     */
    generateSurveyName() {
        let place = (this.attributes.place || (this.attributes.georef && this.attributes.georef.gridRef) || '(unlocalised)').trim();

        const userDate = this.date;
        let dateString;

        if (userDate) {
            dateString = userDate;
        } else {
            const createdDate = new Date(this.createdStamp * 1000);

            try {
                // 'default' locale fails on Edge
                dateString = createdDate.toLocaleString('default', {year: 'numeric', month: 'long', day: 'numeric'});
            } catch (e) {
                dateString = createdDate.toLocaleString('en-GB', {year: 'numeric', month: 'long', day: 'numeric'});
            }
        }

        return `${escapeHTML(place)} ${dateString}`;
    }
}

class OccurrenceImage extends Model {

    /**
     * raw file object retrieved from a file upload image element
     *
     * @type {File}
     */
    file;

    /**
     *
     * @type {Map.<string, OccurrenceImage>}
     */
    static imageCache = new Map;

    TYPE = 'image';

    /**
     * fetches a url of the image
     * this might be a remote url (or one intercepted by a service worker)
     * or a data url of the raw image, (not yet uploaded)
     *
     * @returns {string}
     */
    getUrl () {

    }

    SAVE_ENDPOINT = '/saveimage.php';

    /**
     *
     * @param {File} file
     */
    static fromFile(file) {
        const image = new OccurrenceImage;
        image.file = file;

        return image;
    }

    /**
     * if not securely saved then makes a post to /saveimage.php
     *
     * this may be intercepted by a service worker, which could write the image to indexdb
     * a successful save will result in a json response containing the uri from which the image may be retrieved
     * and also the state of persistence (whether or not the image was intercepted by a service worker while offline)
     *
     * if saving fails then the expectation is that there is no service worker, in which case should attempt to write
     * the image directly to indexdb
     *
     * must test indexdb for this eventuality after the save has returned
     *
     * @param {string} surveyId
     * @param {string} occurrenceId
     * @param {number} projectId
     * @returns {Promise}
     */
    save(surveyId, occurrenceId, projectId) {
        if (!this._savedRemotely) {

            const formData = new FormData;
            formData.append('type', this.TYPE);
            formData.append('surveyId', surveyId ? surveyId : ''); // avoid 'undefined'
            formData.append('occurrenceId', occurrenceId ? occurrenceId : this.occurrenceId); // avoid 'undefined'
            formData.append('projectId', projectId ? projectId.toString() : '');
            formData.append('imageId', this.id);
            formData.append('id', this.id);
            formData.append('image', this.file);
            formData.append('deleted', this.deleted.toString());

            console.log(`queueing image post, image id ${this.id}`);
            return this.queuePost(formData);
        } else {
            return Promise.reject(`${this.id} has already been saved.`);
        }
    }

    /**
     * fired from Occurrence when the object's contents have been modified
     *
     * @type {string}
     */
    static EVENT_MODIFIED = 'modified';

    /**
     *
     * @param id
     * @returns {OccurrenceImage}
     */
    static placeholder(id) {
        let placeholderObject = new OccurrenceImage;
        placeholderObject._id = id;

        OccurrenceImage.imageCache.set(id, placeholderObject);

        return placeholderObject;
    }

    /**
     *
     * @param {{surveyId: string, occurrenceId: string, [image]: File}} descriptor
     * @private
     */
    _parseDescriptor(descriptor) {
        super._parseDescriptor(descriptor);
        this.surveyId = descriptor.surveyId; // note lower case
        this.occurrenceId = descriptor.occurrenceId; // note lower case
        this.file = descriptor.image;
    }

    /**
     *
     * @param {string} id
     * @param {(number|null)} width
     * @param {(number|null)} height
     * @param {{[className] : string}} [attributes]
     * @return {string}
     */
    static imageLink(id, width, height, attributes) {
        width = width || 0;
        height = height || 0;

        let attributesString = '';

        if (attributes.className) {
            attributesString += ` class="${attributes.className}"`;
        }

        const renderingConstraint = (width > height) ?
            `width="${width}"`
            :
            `height="${height}"`;

        return `<picture><source srcset="/image.php?imageid=${id}&amp;height=128&amp;format=webp" type="image/webp"><img${attributesString} src="/image.php?imageid=${id}&amp;width=${width}&amp;height=${height}&amp;format=jpeg" ${renderingConstraint} alt="photo"></picture>`;
    }
}

// App.js

class App extends EventHarness {
    /**
     * @type {PatchedNavigo}
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
     * @type {?Survey}
     */
    _currentSurvey = null;

    /**
     *
     * @param {?Survey} survey
     */
    set currentSurvey(survey) {
        if (this._currentSurvey !== survey) {
            this._currentSurvey = survey || null;

            let surveyId = survey ? survey.id : null;
            localforage.setItem(App.CURRENT_SURVEY_KEY_NAME, surveyId);
        }
    }

    /**
     *
     * @returns {?Survey}
     */
    get currentSurvey() {
        return this._currentSurvey;
    }

    /**
     *
     * @returns {Promise<string | null>}
     */
    getLastSurveyId() {
        return localforage.getItem(App.CURRENT_SURVEY_KEY_NAME)
            .catch((error) => {
                console.log({'Error retrieving last survey id' : error});
                return Promise.resolve(null);
            });
    }

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

    /**
     * Fired after App.currentSurvey has been set to a new blank survey
     * the survey will be accessible in App.currentSurvey
     *
     * @type {string}
     */
    static EVENT_NEW_SURVEY = 'newsurvey';

    static LOAD_SURVEYS_ENDPOINT = '/loadsurveys.php';

    static EVENT_OCCURRENCE_ADDED = 'occurrenceadded';

    /**
     * Fired if the surveys list might need updating (as a survey has been added, removed or changed)
     *
     * @type {string}
     */
    static EVENT_SURVEYS_CHANGED = 'surveyschanged';

    /**
     * Fired after fully-successful sync-all
     * (or if sync-all resolved with nothing to send)
     *
     * @type {string}
     */
    static EVENT_ALL_SYNCED_TO_SERVER = 'allsyncedtoserver';

    /**
     * fired if sync-all called, but one or more objects failed to be saved to the server
     *
     * @type {string}
     */
    static EVENT_SYNC_ALL_FAILED = 'syncallfailed';

    /**
     * IndexedDb key used for storing id of current (last accessed) survey (or null)
     *
     * @type {string}
     */
    static CURRENT_SURVEY_KEY_NAME = 'currentsurvey';

    /**
     *
     * @type {boolean}
     */
    static devMode = false;

    constructor() {
        super();
        this.reset();
    }

    /**
     *
     * @param {string} name
     */
    setLocalForageName(name) {
        localforage.config({
            name: name
        });
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

    /**
     *
     * @returns {PatchedNavigo}
     */
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
            //if (this.clearCurrentSurvey && this.currentSurvey.isPristine) { // this appears to be a bug 'this.clearCurrentSurvey'
            // rather than 'this.clearCurrentSurvey()' is nonsensical
            // and if clearCurrentSurvey() was actually called then the isPristine test would fail (called on null)
            if (this.currentSurvey && this.currentSurvey.isPristine) {
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

        // it's opportune at this point to try to ping the server again to save anything left outstanding
        this.syncAll();
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

    /**
     *
     * @param {Survey} survey
     */
    addSurvey(survey) {
        if (survey.projectId !== this.projectId) {
            throw new Error(`Survey project id '${survey.projectId} does not match with current project ('${this.projectId}')`);
        }

        //if (!this.surveys.has(survey.id)) {
        if (!survey.hasAppModifiedListener) {
            survey.hasAppModifiedListener = true;

            console.log("setting survey's modified/save handler");
            survey.addListener(
                Survey.EVENT_MODIFIED,
                () => {
                    this.fireEvent(App.EVENT_SURVEYS_CHANGED);
                    return survey.save();
                }
            );
        }

        this.surveys.set(survey.id, survey);
        this.fireEvent(App.EVENT_SURVEYS_CHANGED);
    }

    /**
     * tests whether occurrences have been defined, excluding any that have been deleted
     *
     * @returns {boolean}
     */
    haveExtantOccurrences() {
        for (let occurrence of this.occurrences) {
            if (!occurrence.deleted) {
                return true;
            }
        }
        return false;
    }

    /**
     *
     * @param {Occurrence} occurrence
     */
    addOccurrence(occurrence) {
        if (!occurrence.surveyId) {
            throw new InternalAppError('Survey id must set prior to registering occurrence.');
        }

        if (this.occurrences.size === 0) {
            // this is the first occurrence added, set the survey creation stamp to match
            // this avoids anomalies where a 'stale' survey created when the form was first opened but not used sits around
            // for a protracted period

            const survey = this.surveys.get(occurrence.surveyId);
            survey.createdStamp = occurrence.createdStamp;
        }
        console.log(`in addOccurrence setting id '${occurrence.id}'`);
        this.occurrences.set(occurrence.id, occurrence);

        occurrence.addListener(Occurrence.EVENT_MODIFIED,
            // possibly this should be async, with await on the survey and occurrence save
            () => {
                const survey = this.surveys.get(occurrence.surveyId);
                if (!survey) {
                    throw new Error(`Failed to look up survey id ${occurrence.surveyId}`);
                } else {
                    survey.isPristine = false;

                    // need to ensure that currentSurvey is saved before occurrence
                    // rather than using a promise chain here, instead rely on enforced queuing of post requests in Model
                    // otherwise there are problems with queue-jumping (e.g. when an image needs to be saved after both previous requests)
                    if (survey.unsaved()) {
                        // noinspection JSIgnoredPromiseFromCall
                        survey.save();
                    }
                    occurrence.save(survey.id);
                }
            });
    }

    /**
     * attempts to refresh the state of local storage for the specified survey ids
     * if fetch fails then return a failed promise
     *
     * updates local copy of surveys and occurrences
     *
     * no service worker interception of this call - passed through and not cached
     *
     * @param {Array.<string>} surveyIds
     * @return {Promise}
     */
    refreshFromServer(surveyIds) {
        console.log({'Refresh from server, ids' : surveyIds});
        const formData = new FormData;

        let n = 0;
        for (let key of surveyIds) {
            if (key && key !== 'undefined') {
                formData.append(`surveyId[${n++}]`, key);
            }
        }

        return fetch(App.LOAD_SURVEYS_ENDPOINT, {
            method: 'POST',
            body: formData
        }).then(response => {
            if (response.ok) {
                return response.json();
            } else {
                return Promise.reject(`Invalid response from server when refreshing survey ids`);
            }
        }).then((jsonResponse) => {
            /** @param {{survey : Array.<object>, occurrence: Array.<object>, image: Array.<object>}} jsonResponse */

            console.log({'refresh from server json response' : jsonResponse});

            // if external objects newer than local version then place in local storage
            const promises = [];

            for (let type in jsonResponse) {
                if (jsonResponse.hasOwnProperty(type)) {
                    for (let object of jsonResponse[type]) {
                        promises.push(this._conditionallyReplaceObject(object));
                    }
                }
            }


            return Promise.all(promises);
        });
    }

    /**
     * compare modified stamp of indexeddb and external objects and write external version locally if more recent
     *
     * @param {{id : string, type : string, modified : number, created : number, saveState : string, deleted : boolean}} externalVersion
     * @returns {Promise}
     * @private
     */
    _conditionallyReplaceObject(externalVersion) {
        const objectType = externalVersion.type;
        const id = externalVersion.id;
        const key = `${objectType}.${id}`;

        return localforage.getItem(key)
            .then((localVersion) => {
                if (localVersion) {
                    // compare stamps

                    // if (externalVersion.deleted) {
                    //     // if the external copy is deleted then remove the local copy
                    //     return localforage.removeItem(key);
                    // }

                    if (!externalVersion.deleted && localVersion.modified >= externalVersion.modified) {
                        console.log(`Local copy of ${key} is the same or newer than the server copy. (${localVersion.modified} >= ${externalVersion.modified}) `);
                        return Promise.resolve();
                    }
                }

                // no local copy or stale copy
                // so store response locally
                console.log(`Adding or replacing local copy of ${key}`);
                return localforage.setItem(key, externalVersion);
            });
    }

    /**
     * retrieve the full set of keys from local storage (IndexedDb)
     *
     * @param {{survey: Array.<string>, occurrence : Array.<string>, image: Array.<string>}} storedObjectKeys
     * @returns {Promise}
     */
    seekKeys(storedObjectKeys) {
        console.log('starting seekKeys');
        return localforage.keys().then((keys) => {
            console.log({"in seekKeys: local forage keys" : keys});

            for (let key of keys) {
                if (key !== App.CURRENT_SURVEY_KEY_NAME) {
                    let type, id;

                    [type, id] = key.split('.', 2);

                    if (storedObjectKeys.hasOwnProperty(type)) {
                        if (!storedObjectKeys[type].includes(id)) {
                            storedObjectKeys[type].push(id);
                        }
                    } else {
                        console.log(`Unrecognised stored key type '${type}.`);
                    }
                }
            }

            return storedObjectKeys;
        });
    }

    /**
     * @returns {Promise}
     */
    syncAll() {
        const storedObjectKeys = {
            survey : [],
            occurrence : [],
            image : []
        };

        return this.seekKeys(storedObjectKeys)
            .then((storedObjectKeys) => {
                return this._syncLocalUnsaved(storedObjectKeys)
                    .then((result) => {
                        this.fireEvent(App.EVENT_ALL_SYNCED_TO_SERVER);

                        return result;
                    });
            }, (failedResult) => {
                console.log(`Failed to sync all: ${failedResult}`);
                this.fireEvent(App.EVENT_SYNC_ALL_FAILED);
                return false;
            });
    }

    /**
     *
     * @param storedObjectKeys
     * @returns {Promise}
     * @private
     */
    _syncLocalUnsaved(storedObjectKeys) {
        // synchronises surveys first, then occurrences, then images from indexedDb

        const promises = [];
        for(let surveyKey of storedObjectKeys.survey) {
            promises.push(Survey.retrieveFromLocal(surveyKey, new Survey)
                .then((survey) => {
                    if (survey.unsaved()) {
                        return survey.save();
                    }
                })
            );
        }

        for(let occurrenceKey of storedObjectKeys.occurrence) {
            promises.push(Occurrence.retrieveFromLocal(occurrenceKey, new Occurrence)
                .then((occurrence) => {
                    if (occurrence.unsaved()) {
                        return occurrence.save();
                    }
                })
            );
        }

        for(let imageKey of storedObjectKeys.image) {
            promises.push(OccurrenceImage.retrieveFromLocal(imageKey, new OccurrenceImage)
                .then((image) => {
                    if (image.unsaved()) {
                        return image.save();
                    }
                })
            );
        }

        return Promise.all(promises).catch((result) => {
            console.log(`Save failure: ${result}`);
            return Promise.reject(result); // pass on the failed save (catch was only for logging, not to allow subsequent success)
        });
    }

    /**
     * restore previous state, pulling back from local and external store
     * @todo this needs a save phase, so that local changes are saved back to the server
     *
     * @param {string} [targetSurveyId] if specified then select this id as the current survey
     * @return {Promise}
     */
    restoreOccurrences(targetSurveyId = '') {

        console.log(`Invoked restoreOccurrences, target survey id: ${targetSurveyId}`);

        if (targetSurveyId === 'undefined') {
            console.error(`Attempt to restore occurrences for literal 'undefined' survey id.`);
            targetSurveyId = '';
        }

        return (targetSurveyId) ?
            this._restoreOccurrenceImp(targetSurveyId)
            :
            this.getLastSurveyId().then(
                (lastSurveyId) => {
                    console.log(`Retrieved last used survey id '${lastSurveyId}'`);

                    return this._restoreOccurrenceImp(lastSurveyId).catch(() => {
                        console.log(`Failed to retrieve lastSurveyId ${lastSurveyId}. Resetting current survey and retrying.`);

                        this.currentSurvey = null;
                        return this._restoreOccurrenceImp();
                    });
                },
                () => this._restoreOccurrenceImp()
            );
    }

    _restoreOccurrenceImp(targetSurveyId) {
        // need to check for a special case where restoring a survey that has never been saved even locally
        // i.e. new and unmodified
        // only present in current App.surveys
        // this occurs if user creates a new survey, makes no changes, switches away from it then switches back
        if (targetSurveyId && this.surveys.has(targetSurveyId)) {
            const localSurvey = this.surveys.get(targetSurveyId);

            if (localSurvey.isPristine) {
                this.clearCurrentSurvey(); // clear occurrences from the previous survey

                this.currentSurvey = localSurvey;
                this.fireEvent(App.EVENT_SURVEYS_CHANGED); // current survey should be set now, so menu needs refresh
                return Promise.resolve();
            }
        }

        const storedObjectKeys = {
            survey: [],
            occurrence: [],
            image: []
        };

        if (targetSurveyId) {
            storedObjectKeys.survey[0] = targetSurveyId;
        }

        return this.seekKeys(storedObjectKeys).then((storedObjectKeys) => {
            if (storedObjectKeys.survey.length) {
                return this.refreshFromServer(storedObjectKeys.survey).finally(() => {
                    // re-seek keys from indexed db, to take account of any new occurrences received from the server
                    return this.seekKeys(storedObjectKeys);
                });
            } else {
                return null;
            }
        }).finally(() => {
            // called regardless of whether a server refresh was successful
            // storedObjectKeys and indexed db should be as up-to-date as possible

            console.log({storedObjectKeys});

            if (storedObjectKeys && storedObjectKeys.survey && storedObjectKeys.survey.length) {

                const surveyFetchingPromises = [];
                let n = 0;

                for (let surveyKey of storedObjectKeys.survey) {
                    // arbitrarily set first survey key as current if a target id hasn't been specified

                    surveyFetchingPromises.push(
                        this._restoreSurveyFromLocal(surveyKey, storedObjectKeys, (targetSurveyId === surveyKey) || (!targetSurveyId && n++ === 0))
                    );
                }

                return Promise.all(surveyFetchingPromises)
                    .finally(() => {
                        //this.currentSurvey = this.surveys.get(storedObjectKeys.survey[0]);

                        if (!this.currentSurvey) {
                            // survey doesn't actually exist
                            // this could have happened in an invalid survey id was provided as a targetSurveyId
                            console.log(`Failed to retrieve survey id '${targetSurveyId}'`);
                            return Promise.reject(new Error(`Failed to retrieve survey id '${targetSurveyId}'`));
                        }

                        if (this.currentSurvey.deleted) {
                            // unusual case where survey is deleted
                            // substitute a new one

                            // this should probably never happen, as items deleted on the server ought to have been
                            // removed locally
                            this.setNewSurvey();
                        } else {
                            this.fireEvent(App.EVENT_SURVEYS_CHANGED); // current survey should be set now, so menu needs refresh
                        }
                        return Promise.resolve();
                    });
            } else {
                console.log('no pre-existing surveys, so creating a new one');
                // no pre-existing surveys, so create a new one
                this.setNewSurvey();

                return Promise.resolve();
            }
        });
    }

    setNewSurvey() {
        this.currentSurvey = new Survey();
        this.currentSurvey.projectId = this.projectId;
        this.currentSurvey.isPristine = true;
        this.currentSurvey.isNew = true;

        this.fireEvent(App.EVENT_NEW_SURVEY);

        this.addSurvey(this.currentSurvey);
    }

    /**
     * @return {Occurrence}
     */
    addNewOccurrence() {
        const occurrence = new Occurrence();
        occurrence.surveyId = this.currentSurvey.id;
        occurrence.projectId = this.projectId;

        occurrence.isNew = true;
        occurrence.isPristine = true;

        this.addOccurrence(occurrence);

        this.fireEvent(App.EVENT_OCCURRENCE_ADDED, {occurrenceId: occurrence.id, surveyId: occurrence.surveyId});

        return occurrence;
    }

    /**
     *
     * @param {string} surveyId
     * @param {{survey: Array, occurrence: Array, image: Array}} storedObjectKeys
     * @param {boolean} setAsCurrent
     * @returns {Promise}
     * @private
     */
    _restoreSurveyFromLocal(surveyId, storedObjectKeys, setAsCurrent) {
        // retrieve surveys first, then occurrences, then images from indexedDb

        let promise = Survey.retrieveFromLocal(surveyId, new Survey).then((survey) => {
            console.log(`retrieving local survey ${surveyId}`);

            if (setAsCurrent) {
                // the apps occurrences should only relate to the current survey
                // (the reset are remote or in IndexedDb)
                this.clearCurrentSurvey();

                this.addSurvey(survey);
                const occurrenceFetchingPromises = [];

                for (let occurrenceKey of storedObjectKeys.occurrence) {
                    occurrenceFetchingPromises.push(Occurrence.retrieveFromLocal(occurrenceKey, new Occurrence)
                        .then((occurrence) => {
                            if (occurrence.surveyId === surveyId) {
                                console.log(`adding occurrence ${occurrenceKey}`);
                                this.addOccurrence(occurrence);
                            }
                        }));
                }

                return Promise.all(occurrenceFetchingPromises);
            } else {
                // not the current survey, so just add it but don't load occurrences
                this.addSurvey(survey);
            }
        });

        if (setAsCurrent) {
            promise.finally(() => {
                //console.log('Reached image fetching part');
                const imageFetchingPromises = [];

                for (let occurrenceImageKey of storedObjectKeys.image) {
                    imageFetchingPromises.push(OccurrenceImage.retrieveFromLocal(occurrenceImageKey, new OccurrenceImage)
                        .then((occurrenceImage) => {
                            console.log(`restoring image id '${occurrenceImageKey}'`);

                            if (occurrenceImage.surveyId === surveyId) {
                                OccurrenceImage.imageCache.set(occurrenceImageKey, occurrenceImage);
                            }
                        }, (reason) => {
                            console.log(`Failed to retrieve an image: ${reason}`);
                        }));
                }

                this.currentSurvey = this.surveys.get(storedObjectKeys.survey[0]);

                return Promise.all(imageFetchingPromises);
            });
        }

        return promise;
    }

    /**
     *
     * @returns {Promise<void>}
     */
    clearLocalForage() {
        return localforage.clear();
    }
}

class ResponseFactory {
    static responses = {};

    /**
     *
     * @param {FormData} formData
     * @returns {LocalResponse}
     */
    static fromPostedData(formData) {
        /**
         * the object that will be saved to IndexedDb
         *
         * this needs to be in scope for several stages of the promise chain
         * @type {{[saved]: string, [type]: string, [imageId]: string, [surveyId]: string, [occurrenceId]: string, [image]: file, [projectId]: number, saveState: string }}
         */
        const toSaveLocally = {
            saveState: SAVE_STATE_LOCAL // mark as not saved externally
        };

        for(let pair of formData.entries()) {
            toSaveLocally[pair[0]] = pair[1];
        }

        if (!toSaveLocally.type) {
            throw new Error('Missing type in form data.');
        }

        if (ResponseFactory.responses.hasOwnProperty(toSaveLocally.type)) {
            return new ResponseFactory.responses[toSaveLocally.type](toSaveLocally, {});
        } else {
            throw new Error(`Unrecognised post type '${toSaveLocally.type}'`);
        }
    }

    /**
     *
     * @param {{}} returnedToClient
     */
    static fromPostResponse(returnedToClient) {
        if (!returnedToClient) {
            throw new Error('Invalid empty post response.');
        }

        if (!returnedToClient.type) {
            throw new Error('Missing type in returned response.');
        }

        if (ResponseFactory.responses.hasOwnProperty(returnedToClient.type)) {
            console.log(`in fromPostResponse returning a ${returnedToClient.type}`);
            return new ResponseFactory.responses[returnedToClient.type]({}, returnedToClient);
        } else {
            throw new Error(`Unrecognised post type '${returnedToClient.type}'`);
        }
    }
}

function packageClientResponse (returnedToClient) {
    const headers = new Headers;
    headers.set('Content-Type', 'application/json');

    return new Response(
        JSON.stringify(returnedToClient),
        {
            status: returnedToClient.error ? 500 : 200,
            headers
        });
}

class LocalResponse {
    toSaveLocally;
    returnedToClient;

    /**
     * @type {Response}
     */
    prebuiltResponse;

    failureErrorMessage = 'Failed to save a local copy on your device.';
    failureErrorHelp = 'Your internet connection may have failed (or there could be a problem with the server). ' +
        'It wasn\'t possible to save a temporary copy on your device. Perhaps there is insufficient space? ' +
        'Please try to re-establish a network connection and try again.';

    constructor(toSaveLocally, returnedToClient) {
        this.toSaveLocally = toSaveLocally;
        this.returnedToClient = returnedToClient;
    }

    /**
     *
     * @param {Response} prebuiltResponse
     * @returns this
     */
    setPrebuiltResponse(prebuiltResponse) {
        this.prebuiltResponse = prebuiltResponse;
        return this;
    }

    /**
     *
     * @returns {Promise<Response>}
     */
    storeLocally() {
        return localforage.setItem(this.localKey(), this.toSaveLocally).then(() => {
                console.log(`Stored object ${this.localKey()} locally`);
                return this.prebuiltResponse ? this.prebuiltResponse : packageClientResponse(this.returnedToClient);
            },
            (reason) => {
                console.log(`Failed to store object ${this.localKey()} locally`);
                console.log({reason});
                this.returnedToClient.error = this.failureErrorMessage;
                this.returnedToClient.errorHelp = this.failureErrorHelp;

                return packageClientResponse(this.returnedToClient);
            }
        )
    }

    /**
     * @return {string}
     */
    localKey () {
        throw new Error(`LocalKey must be implemented in a subclass for ${this.toSaveLocally.type}`);
    }

    /**
     * called to build the response to the post that is returned to the client
     * in the absence of the remote server
     *
     * @returns {this}
     * @abstract
     */
    populateClientResponse() {
    }
}

class ImageResponse extends LocalResponse {
    failureErrorMessage = 'Failed to store image.';
    failureErrorHelp = 'Your internet connection may have failed (or there could be a problem with the server). ' +
        'It wasn\'t possible to save a temporary copy on your device. Perhaps there is insufficient space? ' +
        'Please try to re-establish a network connection and try again.';

    /**
     * called to build the response to the post that is returned to the client
     * in the absence of the remote server
     *
     * @returns {this}
     */
    populateClientResponse() {
        this.returnedToClient.id = this.toSaveLocally.imageId ? this.toSaveLocally.imageId : this.toSaveLocally.id;
        this.returnedToClient.imageId = this.toSaveLocally.imageId ? this.toSaveLocally.imageId : this.toSaveLocally.id;
        this.returnedToClient.type = 'image';
        this.returnedToClient.surveyId = this.toSaveLocally.surveyId;
        this.returnedToClient.occurrenceId = this.toSaveLocally.occurrenceId;
        this.returnedToClient.created = parseInt(this.toSaveLocally.created, 10); // stamps from server always take precedence
        this.returnedToClient.modified = parseInt(this.toSaveLocally.modified, 10);
        this.returnedToClient.saveState = SAVE_STATE_LOCAL;
        this.returnedToClient.deleted = this.toSaveLocally.deleted;
        this.returnedToClient.projectId = parseInt(this.toSaveLocally.projectId, 10);

        return this;
    }

    /**
     * called to mirror a response from the server locally
     *
     * @returns {this}
     */
    populateLocalSave() {
        this.toSaveLocally.surveyId = this.returnedToClient.surveyId;
        this.toSaveLocally.type = 'image';
        this.toSaveLocally.occurrenceId = this.returnedToClient.occurrenceId;
        this.toSaveLocally.imageId = this.returnedToClient.id ? this.returnedToClient.id : this.returnedToClient.imageId; // hedging
        this.toSaveLocally.id = this.returnedToClient.id ? this.returnedToClient.id : this.returnedToClient.imageId; // hedging
        this.toSaveLocally.created = parseInt(this.returnedToClient.created, 10); // stamps from server always take precedence
        this.toSaveLocally.modified = parseInt(this.returnedToClient.modified, 10);
        this.toSaveLocally.saveState = SAVE_STATE_SERVER;
        this.toSaveLocally.deleted = (this.returnedToClient.deleted === true || this.returnedToClient.deleted === 'true');
        this.toSaveLocally.projectId = parseInt(this.returnedToClient.projectId, 10);

        return this;
    }

    /**
     *
     * @returns {string}
     */
    localKey() {
        return `image.${this.toSaveLocally.imageId}`;
    }

    static register() {
        ResponseFactory.responses.image = ImageResponse;
    }
}

class SurveyResponse extends LocalResponse {
    failureErrorMessage = 'Failed to store survey.';
    failureErrorHelp = 'Your internet connection may have failed (or there could be a problem with the server). ' +
        'It wasn\'t possible to save a temporary copy on your device. Perhaps there is insufficient space? ' +
        'Please try to re-establish a network connection and try again.';

    /**
     * called to build the response to the post that is returned to the client
     * in the absence of the remote server
     *
     * @returns {this}
     */
    populateClientResponse() {
        this.toSaveLocally.surveyId = this.returnedToClient.id ? this.returnedToClient.id : this.returnedToClient.surveyId; // hedging
        this.toSaveLocally.id = this.returnedToClient.id ? this.returnedToClient.id : this.returnedToClient.surveyId; // hedging
        this.returnedToClient.type = 'survey';
        this.returnedToClient.attributes = this.toSaveLocally.attributes;
        this.returnedToClient.created = this.toSaveLocally.created; // stamps from server always take precedence
        this.returnedToClient.modified = this.toSaveLocally.modified;
        this.returnedToClient.saveState = SAVE_STATE_LOCAL;
        this.returnedToClient.deleted = this.toSaveLocally.deleted;
        this.returnedToClient.projectId = this.toSaveLocally.projectId;

        return this;
    }

    /**
     * called to mirror a response from the server locally
     *
     * @returns {this}
     */
    populateLocalSave() {
        this.toSaveLocally.surveyId = this.returnedToClient.id ? this.returnedToClient.id : this.returnedToClient.surveyId;
        this.toSaveLocally.id = this.returnedToClient.id ? this.returnedToClient.id : this.returnedToClient.surveyId;
        this.toSaveLocally.type = 'survey';
        this.toSaveLocally.attributes = this.returnedToClient.attributes;
        this.toSaveLocally.created = parseInt(this.returnedToClient.created, 10); // stamps from server always take precedence
        this.toSaveLocally.modified = parseInt(this.returnedToClient.modified, 10);
        this.toSaveLocally.saveState = SAVE_STATE_SERVER;
        this.toSaveLocally.deleted = this.returnedToClient.deleted;
        this.toSaveLocally.projectId = parseInt(this.returnedToClient.projectId, 10);

        return this;
    }

    /**
     *
     * @returns {string}
     */
    localKey() {
        return `survey.${this.toSaveLocally.surveyId}`;
    }

    static register() {
        ResponseFactory.responses.survey = SurveyResponse;
    }
}

class OccurrenceResponse extends LocalResponse {
    failureErrorMessage = 'Failed to store occurrence.';
    failureErrorHelp = 'Your internet connection may have failed (or there could be a problem with the server). ' +
        'It wasn\'t possible to save a temporary copy on your device. Perhaps there is insufficient space? ' +
        'Please try to re-establish a network connection and try again.';

    /**
     * called to build the response to the post that is returned to the client
     * in the absence of the remote server
     *
     * @returns {this}
     */
    populateClientResponse() {
        this.returnedToClient.id = this.toSaveLocally.occurrenceId ? this.toSaveLocally.occurrenceId : this.toSaveLocally.id;
        this.returnedToClient.occurrenceId = this.toSaveLocally.occurrenceId ? this.toSaveLocally.occurrenceId : this.toSaveLocally.id;
        this.returnedToClient.type = 'occurrence';
        this.returnedToClient.surveyId = this.toSaveLocally.surveyId;
        this.returnedToClient.attributes = this.toSaveLocally.attributes;
        this.returnedToClient.created = parseInt(this.toSaveLocally.created, 10); // stamps from server always take precedence
        this.returnedToClient.modified = parseInt(this.toSaveLocally.modified, 10);
        this.returnedToClient.saveState = SAVE_STATE_LOCAL;
        this.returnedToClient.deleted = this.toSaveLocally.deleted;
        this.returnedToClient.projectId = parseInt(this.toSaveLocally.projectId, 10);
        return this;
    }

    /**
     * called to mirror a response from the server locally
     *
     * @returns {this}
     */
    populateLocalSave() {
        this.toSaveLocally.occurrenceId = this.returnedToClient.id ? this.returnedToClient.id : this.returnedToClient.occurrenceId; // hedging
        this.toSaveLocally.id = this.returnedToClient.id ? this.returnedToClient.id : this.returnedToClient.occurrenceId; // hedging
        this.toSaveLocally.type = 'occurrence';
        this.toSaveLocally.surveyId = this.returnedToClient.surveyId;
        this.toSaveLocally.attributes = this.returnedToClient.attributes;
        this.toSaveLocally.created = parseInt(this.returnedToClient.created, 10); // stamps from server always take precedence
        this.toSaveLocally.modified = parseInt(this.returnedToClient.modified, 10);
        this.toSaveLocally.saveState = SAVE_STATE_SERVER;
        this.toSaveLocally.deleted = (this.returnedToClient.deleted === true || this.returnedToClient.deleted === 'true');
        this.toSaveLocally.projectId = parseInt(this.returnedToClient.projectId, 10);

        return this;
    }

    /**
     *
     * @returns {string}
     */
    localKey() {
        return `occurrence.${this.toSaveLocally.occurrenceId}`;
    }

    static register() {
        ResponseFactory.responses.occurrence = OccurrenceResponse;
    }
}

// service worker for BSBI app

class BSBIServiceWorker {

    /**
     * @var {Array.<string>}
     */
    URL_CACHE_SET;

    /**
     *
     * @param {{
     *  forageName : string,
     *  postPassThroughWhitelist : RegExp,
     *  postImageUrlMatch : RegExp,
     *  getImageUrlMatch : RegExp,
     *  interceptUrlMatches : RegExp,
     *  ignoreUrlMatches : RegExp,
     *  passThroughNoCache : RegExp,
     *  indexUrl : string,
     *  urlCacheSet : Array.<string>,
     *  version : string
     * }} configuration
     */
    initialise(configuration) {
        if (!Promise.prototype.finally) {
            Promise.prototype.finally = function (callback) { // must use 'function' here rather than arrow, due to this binding requirement
                return this.then(callback)
                    .catch(callback);
            };
        }

        ImageResponse.register();
        SurveyResponse.register();
        OccurrenceResponse.register();

        this.CACHE_VERSION = `version-1.0.3.1644334048-${configuration.version}`;

        const POST_PASS_THROUGH_WHITELIST = configuration.postPassThroughWhitelist;
        const POST_IMAGE_URL_MATCH = configuration.postImageUrlMatch;
        const GET_IMAGE_URL_MATCH = configuration.getImageUrlMatch;
        const SERVICE_WORKER_INTERCEPT_URL_MATCHES = configuration.interceptUrlMatches;
        const SERVICE_WORKER_IGNORE_URL_MATCHES = configuration.ignoreUrlMatches;
        const SERVICE_WORKER_PASS_THROUGH_NO_CACHE = configuration.passThroughNoCache;
        const INDEX_URL = configuration.indexUrl;

        this.URL_CACHE_SET = configuration.urlCacheSet;

        localforage.config({
            name: configuration.forageName
        });

        // On install, cache some resources.
        self.addEventListener('install', (evt) => {
            console.log('BSBI app service worker is being installed.');

            // noinspection JSIgnoredPromiseFromCall
            self.skipWaiting();

            // Ask the service worker to keep installing until the returning promise
            // resolves.
            evt.waitUntil(
                this.precache()
                    // see https://serviceworke.rs/immediate-claim_service-worker_doc.html
                    // .finally(() => {
                    //     console.log("Service worker skip waiting after precache.");
                    //
                    //     return self.skipWaiting();
                    // })
            );
        });

        self.addEventListener('activate', (event) => {
            console.log({'service worker activate event' : event});

            event.waitUntil(
                self.clients.matchAll({
                    includeUncontrolled: true
                }).then((clientList) => {
                    const urls = clientList.map((client) => {
                        return client.url;
                    });
                    console.log('[ServiceWorker] Matching clients:', urls.join(', '));
                }).then(() => caches.keys())
                    .then((cacheNames) => {
                        return Promise.all(
                            cacheNames.map((cacheName) => {
                                // test for 'version' prefix to avoid deleting mapbox tiles
                                if (cacheName.startsWith('version') && cacheName !== this.CACHE_VERSION) {
                                    console.log('[ServiceWorker] Deleting old cache:', cacheName);
                                    return caches.delete(cacheName);
                                }
                            })
                        );
                    }).then(() => {
                        console.log('[ServiceWorker] Claiming clients for version', this.CACHE_VERSION);
                        return self.clients.claim();
                    })
                );
            });


        // // see https://davidwalsh.name/background-sync
        // // https://developers.google.com/web/updates/2015/12/background-sync
        // self.addEventListener('sync', function(event) {
        //
        // });

        // On fetch, use cache but update the entry with the latest contents
        // from the server.
        self.addEventListener('fetch', /** @param {FetchEvent} evt */ (evt) => {
            //console.log(`The service worker is serving: '${evt.request.url}'`);

            evt.preventDefault();

            if (evt.request.method === 'POST') {
                //console.log(`Got a post request`);

                //if (evt.request.url.match(POST_PASS_THROUGH_WHITELIST)) {
                if (POST_PASS_THROUGH_WHITELIST.test(evt.request.url)) {
                    console.log(`Passing through whitelisted post request for: ${evt.request.url}`);
                    evt.respondWith(fetch(evt.request));
                } else if (SERVICE_WORKER_PASS_THROUGH_NO_CACHE.test(evt.request.url)) {
                    console.log(`Passing through nocache list post request for: ${evt.request.url}`);
                    evt.respondWith(fetch(evt.request));
                } else {
                    //if (evt.request.url.match(POST_IMAGE_URL_MATCH)) {
                    if (POST_IMAGE_URL_MATCH.test(evt.request.url)) {
                        console.log(`Got an image post request: '${evt.request.url}'`);
                        this.handle_image_post(evt);
                    } else {
                        console.log(`Got post request: '${evt.request.url}'`);
                        this.handle_post(evt);
                    }
                }
            } else {
                // test whether this is a direct link in to a page that should be substituted by
                // the single page app

                // console.log(`about to test url '${evt.request.url}'`);

                if (SERVICE_WORKER_INTERCEPT_URL_MATCHES.test(evt.request.url) &&
                    !SERVICE_WORKER_IGNORE_URL_MATCHES.test(evt.request.url)
                ) {
                    // serving single page app instead
                    console.log(`redirecting to the root of the SPA for '${evt.request.url}'`);
                    let spaRequest = new Request(INDEX_URL);
                    evt.respondWith(this.fromCache(spaRequest));
                    evt.waitUntil(this.update(spaRequest));
                } else if (evt.request.url.match(GET_IMAGE_URL_MATCH)) {
                    console.log(`request is for an image '${evt.request.url}'`);
                    this.handleImageFetch(evt);
                } else if (SERVICE_WORKER_PASS_THROUGH_NO_CACHE.test(evt.request.url)) {
                    // typically for external content that can't/shouldn't be cached, e.g. MapBox tiles (which mapbox stores directly in the cache itself)
                    evt.respondWith(fetch(evt.request));
                } else {
                    console.log(`request is for non-image '${evt.request.url}'`);
                    // You can use `respondWith()` to answer immediately, without waiting for the
                    // network response to reach the service worker...
                    evt.respondWith(this.fromCache(evt.request));
                    // ...and `waitUntil()` to prevent the worker from being killed until the
                    // cache is updated.
                    evt.waitUntil(this.update(evt.request));
                }
            }
        });
    }


    /**
     * used to handle small posts (not images)
     * attempts remote save first then caches locally
     *
     * @param {FetchEvent} evt
     */
    handle_post(evt) {
        let clonedRequest;
        try {
            clonedRequest = evt.request.clone();
        } catch (e) {
            console.log('Failed to clone request.');
            console.log({'Cloning error': e});
        }

        evt.respondWith(fetch(evt.request)
            .then((response) => {
                // would get here if the server responds at all, but need to check that the response is ok (not a server error)
                if (response.ok) {
                    return Promise.resolve(response)
                        .then((response) => {
                            // save the response locally
                            // before returning it to the client

                            console.log('About to clone the json response.');

                            return response.clone().json();
                        })
                        .then((jsonResponseData) => {
                            console.log('Following successful remote post, about to save locally.');

                            return ResponseFactory
                                .fromPostResponse(jsonResponseData)
                                .setPrebuiltResponse(response)
                                .populateLocalSave()
                                .storeLocally();
                        })
                        .catch((error) => {
                            // for some reason local storage failed, after a successful server save
                            console.log({'local storage failed' : error});

                            return Promise.resolve(response); // pass through the server response
                        });
                } else {
                    console.log(`Failed to save, moving on to attempt IndexedDb`);
                    return Promise.reject('Failed to save to server.');
                }
            })
            .catch( (reason) => {
                    console.log({'post fetch failed (probably no network)': reason});

                    // would get here if the network is down
                    // or if got invalid response from the server

                    console.log(`post fetch failed (probably no network), (reason: ${reason})`);
                    //console.log({'post failure reason' : reason});

                    // /**
                    //  * simulated result of post, returned as JSON body
                    //  * @type {{surveyId: string, occurrenceId: string, imageId: string, saveState: string, [error]: string, [errorHelp]: string}}
                    //  */
                    // let returnedToClient = {};

                    return clonedRequest.formData()
                        .then((formData) => {
                                console.log('got to form data handler');
                                //console.log({formData});

                                return ResponseFactory
                                    .fromPostedData(formData)
                                    .populateClientResponse()
                                    .storeLocally();
                            }, (reason) => {
                                console.log({'failed to read form data locally' : reason});

                                /**
                                 * simulated result of post, returned as JSON body
                                 * @type {{[surveyId]: string, [occurrenceId]: string, [imageId]: string, [saveState]: string, [error]: string, [errorHelp]: string}}
                                 */
                                let returnedToClient = {
                                    error: 'Failed to process posted response data. (internal error)',
                                    errorHelp: 'Your internet connection may have failed (or there could be a problem with the server). ' +
                                        'It wasn\'t possible to save a temporary copy on your device. (an unexpected error occurred) ' +
                                        'Please try to re-establish a network connection and try again.'
                                };

                                return packageClientResponse(returnedToClient);
                            }
                        );
                }
            ));
    }

    /**
     * used to handle image posts, which need to respond quickly even if the network is slow
     * attempts local cache first then saves out to network
     *
     * @param {FetchEvent} event
     */
    handle_image_post(event) {
        let clonedRequest;

        console.log('posting image');

        try {
            clonedRequest = event.request.clone();
        } catch (e) {
            console.log('Failed to clone request.');
            console.log({'Cloning error': e});
        }

        // send back a quick response to the client from local storage (before the server request completes)
        event.respondWith(
            clonedRequest.formData()
                .then((formData) => {
                        console.log('got to form data handler');
                        //console.log({formData});

                        return ResponseFactory
                            .fromPostedData(formData)
                            .populateClientResponse()
                            .storeLocally()
                            .then((response) => {

                                // separately send data to the server, but response goes to client before this completes
                                // am unsure if the return from the wait until part ever reaches the client
                                event.waitUntil(fetch(event.request)
                                    .then((response) => {
                                            console.log('posting image to server in waitUntil part of fetch cycle');

                                            // would get here if the server responds at all, but need to check that the response is ok (not a server error)
                                            if (response.ok) {
                                                console.log('posted image to server in waitUntil part of fetch cycle: got OK response');

                                                return Promise.resolve(response)
                                                    .then((response) => {
                                                        // save the response locally
                                                        // before returning it to the client

                                                        return response.clone().json();
                                                    })
                                                    .then((jsonResponseData) => {
                                                        return ResponseFactory
                                                            .fromPostResponse(jsonResponseData)
                                                            .setPrebuiltResponse(response)
                                                            .populateLocalSave()
                                                            .storeLocally();
                                                    })
                                                    .catch((error) => {
                                                        // for some reason local storage failed, after a successful server save
                                                        console.log({error});

                                                        return Promise.resolve(response); // pass through the server response
                                                    });
                                            } else {
                                                console.log('posted image to server in waitUntil part of fetch cycle: got Error response');

                                                /**
                                                 * simulated result of post, returned as JSON body
                                                 * @type {{[surveyId]: string, [occurrenceId]: string, [imageId]: string, [saveState]: string, [error]: string, [errorHelp]: string}}
                                                 */
                                                let returnedToClient = {
                                                    error: 'Failed to save posted response data. (internal error)',
                                                    errorHelp: 'Your internet connection may have failed (or there could be a problem with the server). ' +
                                                        'It wasn\'t possible to save a temporary copy on your device. (an unexpected error occurred) ' +
                                                        'Please try to re-establish a network connection and try again.'
                                                };

                                                return packageClientResponse(returnedToClient);
                                            }
                                        }, () => {
                                            console.log('Rejected image post fetch from server - implies network is down');
                                        }
                                    ));

                                return response;
                            });
                    }, (reason) => {
                        console.log('failed to read form data locally');
                        console.log({reason});

                        /**
                         * simulated result of post, returned as JSON body
                         * @type {{[surveyId]: string, [occurrenceId]: string, [imageId]: string, [saveState]: string, [error]: string, [errorHelp]: string}}
                         */
                        let returnedToClient = {
                            error: 'Failed to process posted response data. (internal error)',
                            errorHelp: 'Your internet connection may have failed (or there could be a problem with the server). ' +
                                'It wasn\'t possible to save a temporary copy on your device. (an unexpected error occurred) ' +
                                'Please try to re-establish a network connection and try again.'
                        };

                        return packageClientResponse(returnedToClient);
                    }
                )
        );
    }

    /**
     * Open a cache and use `addAll()` with an array of assets to add all of them
     * to the cache. Return a promise resolving when all the assets are added.
     *
     * @returns {Promise<void>}
     */
    precache() {
        return caches.open(this.CACHE_VERSION).then((cache) => {
            return cache.addAll(this.URL_CACHE_SET);
        }).catch((error) => {
            console.log({'Precache failed result' : error});
            return Promise.resolve();
        });
    }

    /**
     * Open the cache where the assets were stored and search for the requested
     * resource. Notice that in case of no matching, the promise still resolves
     * but it does with `undefined` as value.
     *
     * @param {Request} request
     * @returns {Promise<Response | Promise<Response>>}
     */
    fromCache(request) {
        // @todo need to serve index.html in place of all Navigo-served pages
        // (an issue if someone returns to a bookmarked page within the app)

        console.log('attempting fromCache response');

        return caches.open(this.CACHE_VERSION).then((cache) => {
            console.log('cache is open');

            return cache.match(request).then((matching) => {
                console.log(matching ?
                    `cache matched ${request.url}`
                    :
                    `no cache match for ${request.url}`);

                //return matching || fetch(request); // return cache match or if not cached then go out to network
                return matching || this.update(request); // return cache match or if not cached then go out to network (and then locally cache the response)
            });
        });
    }

    /**
     * Special case response for images
     * attempt to serve from local cache first,
     * if that fails then go out to network
     * finally see if there is an image in indexeddb
     *
     * @param {FetchEvent} evt
     */
    handleImageFetch(evt) {
        evt.respondWith(this.fromCache(evt.request).then((response) => {
                console.log('In handleImageFetch promise');

                // response may be a 404
                if (response && response.ok) {
                    console.log('Responding with image from cache (or remotely if no cache).');
                    return response;
                } else {
                    // not cached and no network access
                    // try to respond from local storage

                    const url = evt.request.url;
                    console.log(`Attempting image match for '${url}'`);

                    const matches = url.match(/imageid=([a-fA-F0-9]{8}-(?:[a-fA-F0-9]{4}-){3}[a-fA-F0-9]{12})/);

                    if (matches) {
                        const imageId = matches[1];
                        console.log(`Returning image match for '${url}' from local database`);
                        return this.imageFromLocalDatabase(imageId);
                    } else {
                        console.log(`Failed to match image id in url '${url}'`);
                    }
                }
            })
                .catch((error) => {
                    const url = evt.request.url;
                    console.log({'caught' : error});
                    console.log(`In catch following failed network fetch, attempting image match for '${url}'`);

                    const matches = url.match(/imageid=([a-fA-F0-9]{8}-(?:[a-fA-F0-9]{4}-){3}[a-fA-F0-9]{12})/);

                    if (matches) {
                        const imageId = matches[1];
                        console.log(`(via catch) Returning image match for '${url}' from local database`);
                        return this.imageFromLocalDatabase(imageId);
                    } else {
                        console.log(`(via catch) Failed to match image id in url '${url}'`);
                        return Promise.reject(null);
                    }
                })
        );
    }

    /**
     *
     * @param {string} imageId
     * @returns {Promise}
     */
    imageFromLocalDatabase(imageId) {
        const image = new OccurrenceImage();

        console.log('attempting retrieval of image data from local database');

        return Model.retrieveFromLocal(imageId, image).then((image) => {
            console.log(`Retrieved image '${imageId}' from indexeddb.`);
            if (image.file) {
                const headers = new Headers();
                headers.append('Content-Type', image.file.type);

                return new Response(image.file, {
                    "status": 200,
                    "statusText": "OK image response from IndexedDb"
                });
            } else {
                console.log(`No local file object associated with retrieved image '${imageId}' from indexeddb.`);
                return Promise.reject(`No local file object associated with retrieved image '${imageId}' from indexeddb.`);
            }
        });
    }

    /**
     * Update consists in opening the cache, performing a network request and
     * storing the new response data.
     *
     * @param {Request} request
     * @returns {Promise<Response>}
     */
    update(request) {
        request = new Request(request, {mode: 'cors', credentials: 'omit'});

        console.log(`Attempting fetch and cache update of ${request.url}`);

        return caches.open(this.CACHE_VERSION).then((cache) => {
            return fetch(request, {cache: "no-cache"}).then((response) => {
                if (response.ok) {
                    console.log(`(re-)caching ${request.url}`);
                    return cache.put(request, response).then(() => {
                        return cache.match(request);
                    });
                } else {
                    console.log(`Request during cache update failed for ${request.url}`);
                    console.log({'failed cache response': response});
                    return Promise.reject('Request during cache update failed, not caching.');
                }
            }).catch((error) => {
                console.log(`Cache attempt failed for ${request.url}: error was ${error}`);
                return Promise.reject(`Cache attempt failed for ${request.url}: error was ${error}`);
            });
        });
    }
}

const PROJECT_ID_NYPH = 2;

class NyphApp extends App {
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

// service worker for Nyph app

// noinspection JSUnusedLocalSymbols
let BsbiDb$1 = BsbiDb$1 || {scriptVersions: { TaxonNames : [] } };

// mainly aiming to determine whether '/app/' or '/testapp/'
let pathPrefix = location.pathname.split('/')[1];

// kill after 2022-03-01 to prevent the app perpetuating itself
if ((new Date).toJSON().slice(0,10) >= '2022-03-01') {
    throw new Error("Built-in expiry date has passed for NYPH.");
}

const serviceWorker = new BSBIServiceWorker();
serviceWorker.initialise({
    forageName : NyphApp.forageName,

    postPassThroughWhitelist : /^https:\/\/nyph\.bsbi\.app\/loadsurveys.php/,
    postImageUrlMatch : /^https:\/\/nyph\.bsbi\.app\/saveimage.php/,
    getImageUrlMatch : /^https:\/\/nyph\.bsbi\.app\/image\.php/,
    interceptUrlMatches : new RegExp(`^https://nyph\.bsbi\.app/${pathPrefix}/|^https://nyph\.bsbi\.app/${pathPrefix}$`),
    ignoreUrlMatches : new RegExp(`^https://nyph\.bsbi\.app/${pathPrefix}/app\.js|^https://nyph\.bsbi\.app/${pathPrefix}/serviceworker\.js|^https://nyph\.bsbi\.app/${pathPrefix}/manifest\.webmanifest|^https://nyph\.bsbi\.app/${pathPrefix}/index\.html|^https://api\.mapbox\.com`),
    indexUrl : `https://nyph.bsbi.app/${pathPrefix}/index.html`,

    // postPassThroughWhitelist : /^https:\/\/nyph\.bsbi\.app\/loadsurveys.php/,
    // postImageUrlMatch : /^https:\/\/nyph\.bsbi\.app\/saveimage.php/,
    // getImageUrlMatch : /^https:\/\/nyph\.bsbi\.app\/image\.php/,
    // interceptUrlMatches : /^https:\/\/nyph\.bsbi\.app\/app\/|^https:\/\/nyph\.bsbi\.app\/app$/,
    // ignoreUrlMatches : /^https:\/\/nyph\.bsbi\.app\/app\/app\.js|^https:\/\/nyph\.bsbi\.app\/app\/serviceworker\.js|^https:\/\/nyph\.bsbi\.app\/app\/manifest\.webmanifest|^https:\/\/nyph\.bsbi\.app\/app\/index\.html|^https:\/\/api\.mapbox\.com/,
    // indexUrl : 'https://nyph.bsbi.app/app/index.html',

    urlCacheSet : [
        './index.html',
        './app.js?version=1.0.3.1644336565',
        './manifest.webmanifest',
        '/appcss/app.2021-12-16.css', // note no leading '.' - this is an absolute path
        '/appcss/theme.css',
        //'/img/gwh_logo1_tsp.png',
        '/img/icons/favicon-32x32.png',
        '/img/icons/favicon-16x16.png',
        '/img/icons/android-icon-192x192.png',
        '/img/nyph_final@2x.png',
        //'/img/icons/gwh_logo1_tsp-512x512.png',
        '/img/BSBIlong.png',
        'https://fonts.googleapis.com/icon?family=Material+Icons|Material+Icons+Round',
        'https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css',
        '/js/taxonnames.js.php',
        //'https://database.bsbi.org/js/taxonnames.js.php',
        //'https://code.jquery.com/jquery-3.3.1.slim.min.js',
        //'https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js',
        //'https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js',
        'https://fonts.googleapis.com/css2?family=Gentium+Basic&display=swap',
        // am not caching files under api.mapbox.com
        // so instead serve this locally
        //'https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-geocoder/v4.7.2/mapbox-gl-geocoder.min.js',
        '/js/mapbox-gl-geocoder-v4.7.2.min.js'
    ],
    passThroughNoCache : /^https:\/\/api\.mapbox\.com|^https:\/\/events\.mapbox\.com|^https:\/\/browser-update\.org/,
    version : '1.0.3.1644336565'
});
//# sourceMappingURL=serviceworker.mjs.map
