// AppController

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

function commonjsRequire(path) {
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
} (localforage$1));

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
     * unix timestamp (seconds since epoch)
     * Provided that the created stamp is < the modified stamp then the externally assigned creation stamp will be used
     *
     * @type {number}
     */
    createdStamp;

    /**
     * unix timestamp (seconds since epoch)
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

// a Survey captures the currentSurvey meta data
//import {TextGeorefField} from "../views/formfields/TextGeorefField";
//import {Form} from "../views/forms/Form";

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
            source: 'unknown', //TextGeorefField.GEOREF_SOURCE_UNKNOWN,
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

    // /**
    //  *
    //  * @param {SurveyForm} form
    //  */
    // registerForm(form) {
    //     form.model = this;
    //     form.addListener('change', this.formChangedHandler.bind(this));
    //
    //     if (this.isNew) {
    //         form.fireEvent('initialisenew', {}); // allows first-time initialisation of dynamic default data, e.g. starting a GPS fix
    //         form.liveValidation = false;
    //     } else {
    //         form.liveValidation = true;
    //     }
    // }

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
        if (this.attributes.casual) {
            // special-case treatment of surveys with 'casual' attribute (which won't have a locality or date as part of the survey)

            return this.attributes.surveyName ?
                escapeHTML(this.attributes.surveyName)
                :
                `Data-set created on ${(new Date(this.createdStamp * 1000)).toString()}`
        } else {
            let place = (this.attributes.place || (this.attributes.georef && this.attributes.georef.gridRef) || '(unlocalised)').trim();

            const userDate = this.date;
            let dateString;

            if (userDate) {
                dateString = userDate;
            } else {
                const createdDate = new Date(this.createdStamp * 1000);

                try {
                    // 'default' locale fails on Edge
                    dateString = createdDate.toLocaleString('default', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                    });
                } catch (e) {
                    dateString = createdDate.toLocaleString('en-GB', {year: 'numeric', month: 'long', day: 'numeric'});
                }
            }

            return `${escapeHTML(place)} ${dateString}`;
        }
    }
}

/**
 *
 */
class InternalAppError extends Error {

}

class TaxonError extends Error {

}

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
     * if set then the vernacular name should not be allowed for data entry
     *
     * @type {boolean}
     */
    badVernacular = false;

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

        if (raw[11]) {
            taxon.badVernacular = true;
        }

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

//import {Form} from "../views/forms/Form";

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

    // /**
    //  *
    //  * @param {OccurrenceForm} form
    //  * @returns {OccurrenceForm}
    //  */
    // setForm(form) {
    //     form.addListener(Form.CHANGE_EVENT, this.formChangedHandler.bind(this));
    //
    //     if (!this.isNew) {
    //         form.liveValidation = true;
    //     }
    //     return form;
    // }

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
     * @abstract
     * @type {number}
     */
    projectId;

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

            // const view = new NotFoundView();
            // view.display();
            this.notFoundView();
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

    /**
     *
     * @param {{}|null} [attributes]
     */
    setNewSurvey(attributes) {
        this.currentSurvey = new Survey();

        if (attributes) {
            this.currentSurvey.attributes = {...this.currentSurvey.attributes, ...attributes};
        }

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

    /**
     * @abstract
     */
    notFoundView() {
        // const view = new NotFoundView();
        // view.display();
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

        this.CACHE_VERSION = `version-1.0.3.1667211735-${configuration.version}`;

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

//import {NotFoundView} from "bsbi-app-framework-view";

const PROJECT_ID_NYPH = 2;

const FORAGE_NAME = 'Nyph App2023';

class NyphApp extends App {
    /**
     * @type {number}
     */
    projectId = PROJECT_ID_NYPH;

    static forageName = FORAGE_NAME;

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

    /**
     * A convoluted approach is used to avoid requirement to import NotFoundView
     * (as that bloats the service worker, by pulling in the full view library and bootstrap)
     *
     * @type {NotFoundView}
     */
    notFoundViewObject;

    notFoundView() {
        this.notFoundViewObject.display();
    }

    // notFoundView() {
    //     const view = new NotFoundView();
    //     view.display();
    // }
}

// service worker for Nyph app

// mainly aiming to determine whether '/app/' or '/testapp/'
let pathPrefix = location.pathname.split('/')[1];

// kill after 2023-03-01 to prevent the app perpetuating itself
if ((new Date).toJSON().slice(0,10) >= '2023-03-01') {
    throw new Error("Built-in expiry date has passed for NYPH.");
}

const serviceWorker = new BSBIServiceWorker();
serviceWorker.initialise({
    forageName : FORAGE_NAME,

    postPassThroughWhitelist : /^https:\/\/nyph\.bsbi\.app\/loadsurveys.php/,
    postImageUrlMatch : /^https:\/\/nyph\.bsbi\.app\/saveimage.php/,
    getImageUrlMatch : /^https:\/\/nyph\.bsbi\.app\/image\.php/,
    interceptUrlMatches : new RegExp(`^https://nyph\.bsbi\.app/${pathPrefix}/|^https://nyph\.bsbi\.app/${pathPrefix}$`),
    ignoreUrlMatches : new RegExp(`^https://nyph\.bsbi\.app/${pathPrefix}/app\.m?js|^https://nyph\.bsbi\.app/${pathPrefix}/serviceworker\.m?js|^https://nyph\.bsbi\.app/${pathPrefix}/manifest\.webmanifest|^https://nyph\.bsbi\.app/${pathPrefix}/index\.html|^https://api\.mapbox\.com`),
    indexUrl : `https://nyph.bsbi.app/${pathPrefix}/index.html`,

    // postPassThroughWhitelist : /^https:\/\/nyph\.bsbi\.app\/loadsurveys.php/,
    // postImageUrlMatch : /^https:\/\/nyph\.bsbi\.app\/saveimage.php/,
    // getImageUrlMatch : /^https:\/\/nyph\.bsbi\.app\/image\.php/,
    // interceptUrlMatches : /^https:\/\/nyph\.bsbi\.app\/app\/|^https:\/\/nyph\.bsbi\.app\/app$/,
    // ignoreUrlMatches : /^https:\/\/nyph\.bsbi\.app\/app\/app\.js|^https:\/\/nyph\.bsbi\.app\/app\/serviceworker\.js|^https:\/\/nyph\.bsbi\.app\/app\/manifest\.webmanifest|^https:\/\/nyph\.bsbi\.app\/app\/index\.html|^https:\/\/api\.mapbox\.com/,
    // indexUrl : 'https://nyph.bsbi.app/app/index.html',

    urlCacheSet : [
        './index.html',
        './app.mjs?version=1.0.3.1671580383',
        './manifest.webmanifest',
        '/appcss/app.__BSBI_APP_VERSION__.css', // note no leading '.' - this is an absolute path
        '/appcss/theme.css',
        //'/img/gwh_logo1_tsp.png',
        '/img/icons/favicon-32x32.png',
        '/img/icons/favicon-16x16.png',
        '/img/icons/android-icon-192x192.png',
        '/img/nyph_final@2x.png',
        //'/img/icons/gwh_logo1_tsp-512x512.png',
        //'/img/BSBIlong.png',
        'https://fonts.googleapis.com/icon?family=Material+Icons|Material+Icons+Round',
        //'https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css',
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
    version : '1.0.3.1671580383'
});
//# sourceMappingURL=serviceworker.mjs.map
