(function () {
  'use strict';

  function _classCallCheck$1(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

  function _defineProperty$1(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
  }

  function _classStaticPrivateFieldSpecSet$2(receiver, classConstructor, descriptor, value) { _classCheckPrivateStaticAccess$4(receiver, classConstructor); _classCheckPrivateStaticFieldDescriptor$4(descriptor, "set"); _classApplyDescriptorSet$3(receiver, descriptor, value); return value; }

  function _classApplyDescriptorSet$3(receiver, descriptor, value) { if (descriptor.set) { descriptor.set.call(receiver, value); } else { if (!descriptor.writable) { throw new TypeError("attempted to set read only private field"); } descriptor.value = value; } }

  function _classStaticPrivateFieldSpecGet$4(receiver, classConstructor, descriptor) { _classCheckPrivateStaticAccess$4(receiver, classConstructor); _classCheckPrivateStaticFieldDescriptor$4(descriptor, "get"); return _classApplyDescriptorGet$5(receiver, descriptor); }

  function _classCheckPrivateStaticFieldDescriptor$4(descriptor, action) { if (descriptor === undefined) { throw new TypeError("attempted to " + action + " private static field before its declaration"); } }

  function _classCheckPrivateStaticAccess$4(receiver, classConstructor) { if (receiver !== classConstructor) { throw new TypeError("Private static access of wrong provenance"); } }

  function _classApplyDescriptorGet$5(receiver, descriptor) { if (descriptor.get) { return descriptor.get.call(receiver); } return descriptor.value; }

  // AppController
  // Abstract super-class for page controllers
  var AppController = /*#__PURE__*/function () {
    function AppController() {
      _classCallCheck$1(this, AppController);

      _defineProperty$1(this, "route", null);

      _defineProperty$1(this, "view", void 0);

      _defineProperty$1(this, "title", 'untitled');

      _defineProperty$1(this, "handle", void 0);

      _defineProperty$1(this, "app", void 0);
    }

    _createClass(AppController, [{
      key: "initialise",
      value:
      /**
       * called from App.initialise() to trigger late-stage initialisation
       */
      function initialise() {
        this.view.initialise();
      }
      /**
       * registers the default route from this.route
       * or alternatively is overridden in a child class
       *
       * @param {PatchedNavigo} router
       */

    }, {
      key: "registerRoute",
      value: function registerRoute(router) {
        if (null === this.route) {
          throw new Error("No route set for '".concat(this.title, "' controller."));
        }

        console.log({
          route: this.route
        });
        router.on(this.route, this.routeHandler.bind(this), {
          before: this.beforeRouteHandler ? this.beforeRouteHandler.bind(this) : null,
          after: this.afterRouteHandler ? this.afterRouteHandler.bind(this) : null,
          leave: this.leaveRouteHandler ? this.leaveRouteHandler.bind(this) : null,
          already: this.alreadyRouteHandler ? this.alreadyRouteHandler.bind(this) : null
        });
      }
      /**
       *
       * @param {object} params
       * @param {string} query
       */

    }, {
      key: "routeHandler",
      value: function routeHandler(params, query) {}
    }], [{
      key: "nextHandle",
      get: function get() {
        var _AppController$handle;

        return _classStaticPrivateFieldSpecSet$2(AppController, AppController, _handleIndex, (_AppController$handle = +_classStaticPrivateFieldSpecGet$4(AppController, AppController, _handleIndex)) + 1), _AppController$handle;
      }
    }]);

    return AppController;
  }();
  var _handleIndex = {
    writable: true,
    value: 0
  };

  var commonjsGlobal$1 = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

  function commonjsRequire (path) {
  	throw new Error('Could not dynamically require "' + path + '". Please configure the dynamicRequireTargets or/and ignoreDynamicRequires option of @rollup/plugin-commonjs appropriately for this require call to work.');
  }

  var check$1 = function (it) {
    return it && it.Math == Math && it;
  };

  // https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
  var global$t =
    // eslint-disable-next-line es/no-global-this -- safe
    check$1(typeof globalThis == 'object' && globalThis) ||
    check$1(typeof window == 'object' && window) ||
    // eslint-disable-next-line no-restricted-globals -- safe
    check$1(typeof self == 'object' && self) ||
    check$1(typeof commonjsGlobal$1 == 'object' && commonjsGlobal$1) ||
    // eslint-disable-next-line no-new-func -- fallback
    (function () { return this; })() || Function('return this')();

  var objectGetOwnPropertyDescriptor$1 = {};

  var fails$u = function (exec) {
    try {
      return !!exec();
    } catch (error) {
      return true;
    }
  };

  var fails$t = fails$u;

  // Detect IE8's incomplete defineProperty implementation
  var descriptors$1 = !fails$t(function () {
    // eslint-disable-next-line es/no-object-defineproperty -- required for testing
    return Object.defineProperty({}, 1, { get: function () { return 7; } })[1] != 7;
  });

  var objectPropertyIsEnumerable$1 = {};

  var $propertyIsEnumerable$1 = {}.propertyIsEnumerable;
  // eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
  var getOwnPropertyDescriptor$2 = Object.getOwnPropertyDescriptor;

  // Nashorn ~ JDK8 bug
  var NASHORN_BUG$1 = getOwnPropertyDescriptor$2 && !$propertyIsEnumerable$1.call({ 1: 2 }, 1);

  // `Object.prototype.propertyIsEnumerable` method implementation
  // https://tc39.es/ecma262/#sec-object.prototype.propertyisenumerable
  objectPropertyIsEnumerable$1.f = NASHORN_BUG$1 ? function propertyIsEnumerable(V) {
    var descriptor = getOwnPropertyDescriptor$2(this, V);
    return !!descriptor && descriptor.enumerable;
  } : $propertyIsEnumerable$1;

  var createPropertyDescriptor$5 = function (bitmap, value) {
    return {
      enumerable: !(bitmap & 1),
      configurable: !(bitmap & 2),
      writable: !(bitmap & 4),
      value: value
    };
  };

  var toString$e = {}.toString;

  var classofRaw$1$1 = function (it) {
    return toString$e.call(it).slice(8, -1);
  };

  var fails$s = fails$u;
  var classof$a = classofRaw$1$1;

  var split$1 = ''.split;

  // fallback for non-array-like ES3 and non-enumerable old V8 strings
  var indexedObject$1 = fails$s(function () {
    // throws an error in rhino, see https://github.com/mozilla/rhino/issues/346
    // eslint-disable-next-line no-prototype-builtins -- safe
    return !Object('z').propertyIsEnumerable(0);
  }) ? function (it) {
    return classof$a(it) == 'String' ? split$1.call(it, '') : Object(it);
  } : Object;

  // `RequireObjectCoercible` abstract operation
  // https://tc39.es/ecma262/#sec-requireobjectcoercible
  var requireObjectCoercible$9 = function (it) {
    if (it == undefined) throw TypeError("Can't call method on " + it);
    return it;
  };

  // toObject with fallback for non-array-like ES3 strings
  var IndexedObject$2 = indexedObject$1;
  var requireObjectCoercible$8 = requireObjectCoercible$9;

  var toIndexedObject$a = function (it) {
    return IndexedObject$2(requireObjectCoercible$8(it));
  };

  // `IsCallable` abstract operation
  // https://tc39.es/ecma262/#sec-iscallable
  var isCallable$o = function (argument) {
    return typeof argument === 'function';
  };

  var isCallable$n = isCallable$o;

  var isObject$k = function (it) {
    return typeof it === 'object' ? it !== null : isCallable$n(it);
  };

  var global$s = global$t;
  var isCallable$m = isCallable$o;

  var aFunction$1 = function (argument) {
    return isCallable$m(argument) ? argument : undefined;
  };

  var getBuiltIn$a = function (namespace, method) {
    return arguments.length < 2 ? aFunction$1(global$s[namespace]) : global$s[namespace] && global$s[namespace][method];
  };

  var getBuiltIn$9 = getBuiltIn$a;

  var engineUserAgent$1 = getBuiltIn$9('navigator', 'userAgent') || '';

  var global$r = global$t;
  var userAgent$5 = engineUserAgent$1;

  var process$3 = global$r.process;
  var Deno$1 = global$r.Deno;
  var versions$1 = process$3 && process$3.versions || Deno$1 && Deno$1.version;
  var v8$1 = versions$1 && versions$1.v8;
  var match$1, version$1;

  if (v8$1) {
    match$1 = v8$1.split('.');
    version$1 = match$1[0] < 4 ? 1 : match$1[0] + match$1[1];
  } else if (userAgent$5) {
    match$1 = userAgent$5.match(/Edge\/(\d+)/);
    if (!match$1 || match$1[1] >= 74) {
      match$1 = userAgent$5.match(/Chrome\/(\d+)/);
      if (match$1) version$1 = match$1[1];
    }
  }

  var engineV8Version$1 = version$1 && +version$1;

  /* eslint-disable es/no-symbol -- required for testing */

  var V8_VERSION$3 = engineV8Version$1;
  var fails$r = fails$u;

  // eslint-disable-next-line es/no-object-getownpropertysymbols -- required for testing
  var nativeSymbol$1 = !!Object.getOwnPropertySymbols && !fails$r(function () {
    var symbol = Symbol();
    // Chrome 38 Symbol has incorrect toString conversion
    // `get-own-property-symbols` polyfill symbols converted to object are not Symbol instances
    return !String(symbol) || !(Object(symbol) instanceof Symbol) ||
      // Chrome 38-40 symbols are not inherited from DOM collections prototypes to instances
      !Symbol.sham && V8_VERSION$3 && V8_VERSION$3 < 41;
  });

  /* eslint-disable es/no-symbol -- required for testing */

  var NATIVE_SYMBOL$2 = nativeSymbol$1;

  var useSymbolAsUid$1 = NATIVE_SYMBOL$2
    && !Symbol.sham
    && typeof Symbol.iterator == 'symbol';

  var isCallable$l = isCallable$o;
  var getBuiltIn$8 = getBuiltIn$a;
  var USE_SYMBOL_AS_UID$1$1 = useSymbolAsUid$1;

  var isSymbol$3 = USE_SYMBOL_AS_UID$1$1 ? function (it) {
    return typeof it == 'symbol';
  } : function (it) {
    var $Symbol = getBuiltIn$8('Symbol');
    return isCallable$l($Symbol) && Object(it) instanceof $Symbol;
  };

  var tryToString$2 = function (argument) {
    try {
      return String(argument);
    } catch (error) {
      return 'Object';
    }
  };

  var isCallable$k = isCallable$o;
  var tryToString$1$1 = tryToString$2;

  // `Assert: IsCallable(argument) is true`
  var aCallable$7 = function (argument) {
    if (isCallable$k(argument)) return argument;
    throw TypeError(tryToString$1$1(argument) + ' is not a function');
  };

  var aCallable$6 = aCallable$7;

  // `GetMethod` abstract operation
  // https://tc39.es/ecma262/#sec-getmethod
  var getMethod$7 = function (V, P) {
    var func = V[P];
    return func == null ? undefined : aCallable$6(func);
  };

  var isCallable$j = isCallable$o;
  var isObject$j = isObject$k;

  // `OrdinaryToPrimitive` abstract operation
  // https://tc39.es/ecma262/#sec-ordinarytoprimitive
  var ordinaryToPrimitive$1$1 = function (input, pref) {
    var fn, val;
    if (pref === 'string' && isCallable$j(fn = input.toString) && !isObject$j(val = fn.call(input))) return val;
    if (isCallable$j(fn = input.valueOf) && !isObject$j(val = fn.call(input))) return val;
    if (pref !== 'string' && isCallable$j(fn = input.toString) && !isObject$j(val = fn.call(input))) return val;
    throw TypeError("Can't convert object to primitive value");
  };

  var shared$5 = {exports: {}};

  var isPure = false;

  var global$q = global$t;

  var setGlobal$3$1 = function (key, value) {
    try {
      // eslint-disable-next-line es/no-object-defineproperty -- safe
      Object.defineProperty(global$q, key, { value: value, configurable: true, writable: true });
    } catch (error) {
      global$q[key] = value;
    } return value;
  };

  var global$p = global$t;
  var setGlobal$2$1 = setGlobal$3$1;

  var SHARED$1 = '__core-js_shared__';
  var store$3$1 = global$p[SHARED$1] || setGlobal$2$1(SHARED$1, {});

  var sharedStore$1 = store$3$1;

  var store$2$1 = sharedStore$1;

  (shared$5.exports = function (key, value) {
    return store$2$1[key] || (store$2$1[key] = value !== undefined ? value : {});
  })('versions', []).push({
    version: '3.18.2',
    mode: 'global',
    copyright: '© 2021 Denis Pushkarev (zloirock.ru)'
  });

  var requireObjectCoercible$7 = requireObjectCoercible$9;

  // `ToObject` abstract operation
  // https://tc39.es/ecma262/#sec-toobject
  var toObject$a = function (argument) {
    return Object(requireObjectCoercible$7(argument));
  };

  var toObject$9 = toObject$a;

  var hasOwnProperty$1 = {}.hasOwnProperty;

  // `HasOwnProperty` abstract operation
  // https://tc39.es/ecma262/#sec-hasownproperty
  var hasOwnProperty_1$1 = Object.hasOwn || function hasOwn(it, key) {
    return hasOwnProperty$1.call(toObject$9(it), key);
  };

  var id$2 = 0;
  var postfix$1 = Math.random();

  var uid$4 = function (key) {
    return 'Symbol(' + String(key === undefined ? '' : key) + ')_' + (++id$2 + postfix$1).toString(36);
  };

  var global$o = global$t;
  var shared$4 = shared$5.exports;
  var hasOwn$e = hasOwnProperty_1$1;
  var uid$3 = uid$4;
  var NATIVE_SYMBOL$1$1 = nativeSymbol$1;
  var USE_SYMBOL_AS_UID$2 = useSymbolAsUid$1;

  var WellKnownSymbolsStore$1 = shared$4('wks');
  var Symbol$1$1 = global$o.Symbol;
  var createWellKnownSymbol$1 = USE_SYMBOL_AS_UID$2 ? Symbol$1$1 : Symbol$1$1 && Symbol$1$1.withoutSetter || uid$3;

  var wellKnownSymbol$q = function (name) {
    if (!hasOwn$e(WellKnownSymbolsStore$1, name) || !(NATIVE_SYMBOL$1$1 || typeof WellKnownSymbolsStore$1[name] == 'string')) {
      if (NATIVE_SYMBOL$1$1 && hasOwn$e(Symbol$1$1, name)) {
        WellKnownSymbolsStore$1[name] = Symbol$1$1[name];
      } else {
        WellKnownSymbolsStore$1[name] = createWellKnownSymbol$1('Symbol.' + name);
      }
    } return WellKnownSymbolsStore$1[name];
  };

  var isObject$i = isObject$k;
  var isSymbol$2$1 = isSymbol$3;
  var getMethod$6 = getMethod$7;
  var ordinaryToPrimitive$2 = ordinaryToPrimitive$1$1;
  var wellKnownSymbol$p = wellKnownSymbol$q;

  var TO_PRIMITIVE$1 = wellKnownSymbol$p('toPrimitive');

  // `ToPrimitive` abstract operation
  // https://tc39.es/ecma262/#sec-toprimitive
  var toPrimitive$1$1 = function (input, pref) {
    if (!isObject$i(input) || isSymbol$2$1(input)) return input;
    var exoticToPrim = getMethod$6(input, TO_PRIMITIVE$1);
    var result;
    if (exoticToPrim) {
      if (pref === undefined) pref = 'default';
      result = exoticToPrim.call(input, pref);
      if (!isObject$i(result) || isSymbol$2$1(result)) return result;
      throw TypeError("Can't convert object to primitive value");
    }
    if (pref === undefined) pref = 'number';
    return ordinaryToPrimitive$2(input, pref);
  };

  var toPrimitive$2 = toPrimitive$1$1;
  var isSymbol$1$1 = isSymbol$3;

  // `ToPropertyKey` abstract operation
  // https://tc39.es/ecma262/#sec-topropertykey
  var toPropertyKey$4 = function (argument) {
    var key = toPrimitive$2(argument, 'string');
    return isSymbol$1$1(key) ? key : String(key);
  };

  var global$n = global$t;
  var isObject$h = isObject$k;

  var document$3 = global$n.document;
  // typeof document.createElement is 'object' in old IE
  var EXISTS$1$1 = isObject$h(document$3) && isObject$h(document$3.createElement);

  var documentCreateElement$2 = function (it) {
    return EXISTS$1$1 ? document$3.createElement(it) : {};
  };

  var DESCRIPTORS$d = descriptors$1;
  var fails$q = fails$u;
  var createElement$1 = documentCreateElement$2;

  // Thank's IE8 for his funny defineProperty
  var ie8DomDefine$1 = !DESCRIPTORS$d && !fails$q(function () {
    // eslint-disable-next-line es/no-object-defineproperty -- requied for testing
    return Object.defineProperty(createElement$1('div'), 'a', {
      get: function () { return 7; }
    }).a != 7;
  });

  var DESCRIPTORS$c = descriptors$1;
  var propertyIsEnumerableModule$1 = objectPropertyIsEnumerable$1;
  var createPropertyDescriptor$4 = createPropertyDescriptor$5;
  var toIndexedObject$9 = toIndexedObject$a;
  var toPropertyKey$3$1 = toPropertyKey$4;
  var hasOwn$d = hasOwnProperty_1$1;
  var IE8_DOM_DEFINE$1$1 = ie8DomDefine$1;

  // eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
  var $getOwnPropertyDescriptor$1 = Object.getOwnPropertyDescriptor;

  // `Object.getOwnPropertyDescriptor` method
  // https://tc39.es/ecma262/#sec-object.getownpropertydescriptor
  objectGetOwnPropertyDescriptor$1.f = DESCRIPTORS$c ? $getOwnPropertyDescriptor$1 : function getOwnPropertyDescriptor(O, P) {
    O = toIndexedObject$9(O);
    P = toPropertyKey$3$1(P);
    if (IE8_DOM_DEFINE$1$1) try {
      return $getOwnPropertyDescriptor$1(O, P);
    } catch (error) { /* empty */ }
    if (hasOwn$d(O, P)) return createPropertyDescriptor$4(!propertyIsEnumerableModule$1.f.call(O, P), O[P]);
  };

  var objectDefineProperty$1 = {};

  var isObject$g = isObject$k;

  // `Assert: Type(argument) is Object`
  var anObject$l = function (argument) {
    if (isObject$g(argument)) return argument;
    throw TypeError(String(argument) + ' is not an object');
  };

  var DESCRIPTORS$b = descriptors$1;
  var IE8_DOM_DEFINE$2 = ie8DomDefine$1;
  var anObject$k = anObject$l;
  var toPropertyKey$2$1 = toPropertyKey$4;

  // eslint-disable-next-line es/no-object-defineproperty -- safe
  var $defineProperty$1 = Object.defineProperty;

  // `Object.defineProperty` method
  // https://tc39.es/ecma262/#sec-object.defineproperty
  objectDefineProperty$1.f = DESCRIPTORS$b ? $defineProperty$1 : function defineProperty(O, P, Attributes) {
    anObject$k(O);
    P = toPropertyKey$2$1(P);
    anObject$k(Attributes);
    if (IE8_DOM_DEFINE$2) try {
      return $defineProperty$1(O, P, Attributes);
    } catch (error) { /* empty */ }
    if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported');
    if ('value' in Attributes) O[P] = Attributes.value;
    return O;
  };

  var DESCRIPTORS$a = descriptors$1;
  var definePropertyModule$6 = objectDefineProperty$1;
  var createPropertyDescriptor$3$1 = createPropertyDescriptor$5;

  var createNonEnumerableProperty$8 = DESCRIPTORS$a ? function (object, key, value) {
    return definePropertyModule$6.f(object, key, createPropertyDescriptor$3$1(1, value));
  } : function (object, key, value) {
    object[key] = value;
    return object;
  };

  var redefine$d = {exports: {}};

  var isCallable$i = isCallable$o;
  var store$1$1 = sharedStore$1;

  var functionToString$1 = Function.toString;

  // this helper broken in `core-js@3.4.1-3.4.4`, so we can't use `shared` helper
  if (!isCallable$i(store$1$1.inspectSource)) {
    store$1$1.inspectSource = function (it) {
      return functionToString$1.call(it);
    };
  }

  var inspectSource$4 = store$1$1.inspectSource;

  var global$m = global$t;
  var isCallable$h = isCallable$o;
  var inspectSource$3$1 = inspectSource$4;

  var WeakMap$2$1 = global$m.WeakMap;

  var nativeWeakMap$1 = isCallable$h(WeakMap$2$1) && /native code/.test(inspectSource$3$1(WeakMap$2$1));

  var shared$3$1 = shared$5.exports;
  var uid$2$1 = uid$4;

  var keys$1 = shared$3$1('keys');

  var sharedKey$4 = function (key) {
    return keys$1[key] || (keys$1[key] = uid$2$1(key));
  };

  var hiddenKeys$6 = {};

  var NATIVE_WEAK_MAP$1 = nativeWeakMap$1;
  var global$l = global$t;
  var isObject$f = isObject$k;
  var createNonEnumerableProperty$7 = createNonEnumerableProperty$8;
  var hasOwn$c = hasOwnProperty_1$1;
  var shared$2$1 = sharedStore$1;
  var sharedKey$3 = sharedKey$4;
  var hiddenKeys$5 = hiddenKeys$6;

  var OBJECT_ALREADY_INITIALIZED$1 = 'Object already initialized';
  var WeakMap$1$1 = global$l.WeakMap;
  var set$1, get$1, has$1;

  var enforce$1 = function (it) {
    return has$1(it) ? get$1(it) : set$1(it, {});
  };

  var getterFor$1 = function (TYPE) {
    return function (it) {
      var state;
      if (!isObject$f(it) || (state = get$1(it)).type !== TYPE) {
        throw TypeError('Incompatible receiver, ' + TYPE + ' required');
      } return state;
    };
  };

  if (NATIVE_WEAK_MAP$1 || shared$2$1.state) {
    var store$4 = shared$2$1.state || (shared$2$1.state = new WeakMap$1$1());
    var wmget$1 = store$4.get;
    var wmhas$1 = store$4.has;
    var wmset$1 = store$4.set;
    set$1 = function (it, metadata) {
      if (wmhas$1.call(store$4, it)) throw new TypeError(OBJECT_ALREADY_INITIALIZED$1);
      metadata.facade = it;
      wmset$1.call(store$4, it, metadata);
      return metadata;
    };
    get$1 = function (it) {
      return wmget$1.call(store$4, it) || {};
    };
    has$1 = function (it) {
      return wmhas$1.call(store$4, it);
    };
  } else {
    var STATE$1 = sharedKey$3('state');
    hiddenKeys$5[STATE$1] = true;
    set$1 = function (it, metadata) {
      if (hasOwn$c(it, STATE$1)) throw new TypeError(OBJECT_ALREADY_INITIALIZED$1);
      metadata.facade = it;
      createNonEnumerableProperty$7(it, STATE$1, metadata);
      return metadata;
    };
    get$1 = function (it) {
      return hasOwn$c(it, STATE$1) ? it[STATE$1] : {};
    };
    has$1 = function (it) {
      return hasOwn$c(it, STATE$1);
    };
  }

  var internalState$1 = {
    set: set$1,
    get: get$1,
    has: has$1,
    enforce: enforce$1,
    getterFor: getterFor$1
  };

  var DESCRIPTORS$9 = descriptors$1;
  var hasOwn$b = hasOwnProperty_1$1;

  var FunctionPrototype$1 = Function.prototype;
  // eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
  var getDescriptor$1 = DESCRIPTORS$9 && Object.getOwnPropertyDescriptor;

  var EXISTS$2 = hasOwn$b(FunctionPrototype$1, 'name');
  // additional protection from minified / mangled / dropped function names
  var PROPER$1 = EXISTS$2 && (function something() { /* empty */ }).name === 'something';
  var CONFIGURABLE$1 = EXISTS$2 && (!DESCRIPTORS$9 || (DESCRIPTORS$9 && getDescriptor$1(FunctionPrototype$1, 'name').configurable));

  var functionName$1 = {
    EXISTS: EXISTS$2,
    PROPER: PROPER$1,
    CONFIGURABLE: CONFIGURABLE$1
  };

  var global$k = global$t;
  var isCallable$g = isCallable$o;
  var hasOwn$a = hasOwnProperty_1$1;
  var createNonEnumerableProperty$6 = createNonEnumerableProperty$8;
  var setGlobal$1$1 = setGlobal$3$1;
  var inspectSource$2$1 = inspectSource$4;
  var InternalStateModule$7 = internalState$1;
  var CONFIGURABLE_FUNCTION_NAME$1 = functionName$1.CONFIGURABLE;

  var getInternalState$6 = InternalStateModule$7.get;
  var enforceInternalState$1 = InternalStateModule$7.enforce;
  var TEMPLATE$1 = String(String).split('String');

  (redefine$d.exports = function (O, key, value, options) {
    var unsafe = options ? !!options.unsafe : false;
    var simple = options ? !!options.enumerable : false;
    var noTargetGet = options ? !!options.noTargetGet : false;
    var name = options && options.name !== undefined ? options.name : key;
    var state;
    if (isCallable$g(value)) {
      if (String(name).slice(0, 7) === 'Symbol(') {
        name = '[' + String(name).replace(/^Symbol\(([^)]*)\)/, '$1') + ']';
      }
      if (!hasOwn$a(value, 'name') || (CONFIGURABLE_FUNCTION_NAME$1 && value.name !== name)) {
        createNonEnumerableProperty$6(value, 'name', name);
      }
      state = enforceInternalState$1(value);
      if (!state.source) {
        state.source = TEMPLATE$1.join(typeof name == 'string' ? name : '');
      }
    }
    if (O === global$k) {
      if (simple) O[key] = value;
      else setGlobal$1$1(key, value);
      return;
    } else if (!unsafe) {
      delete O[key];
    } else if (!noTargetGet && O[key]) {
      simple = true;
    }
    if (simple) O[key] = value;
    else createNonEnumerableProperty$6(O, key, value);
  // add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
  })(Function.prototype, 'toString', function toString() {
    return isCallable$g(this) && getInternalState$6(this).source || inspectSource$2$1(this);
  });

  var objectGetOwnPropertyNames$1 = {};

  var ceil$1 = Math.ceil;
  var floor$2 = Math.floor;

  // `ToIntegerOrInfinity` abstract operation
  // https://tc39.es/ecma262/#sec-tointegerorinfinity
  var toIntegerOrInfinity$5 = function (argument) {
    var number = +argument;
    // eslint-disable-next-line no-self-compare -- safe
    return number !== number || number === 0 ? 0 : (number > 0 ? floor$2 : ceil$1)(number);
  };

  var toIntegerOrInfinity$4 = toIntegerOrInfinity$5;

  var max$3 = Math.max;
  var min$4 = Math.min;

  // Helper for a popular repeating case of the spec:
  // Let integer be ? ToInteger(index).
  // If integer < 0, let result be max((length + integer), 0); else let result be min(integer, length).
  var toAbsoluteIndex$3 = function (index, length) {
    var integer = toIntegerOrInfinity$4(index);
    return integer < 0 ? max$3(integer + length, 0) : min$4(integer, length);
  };

  var toIntegerOrInfinity$3 = toIntegerOrInfinity$5;

  var min$3 = Math.min;

  // `ToLength` abstract operation
  // https://tc39.es/ecma262/#sec-tolength
  var toLength$5 = function (argument) {
    return argument > 0 ? min$3(toIntegerOrInfinity$3(argument), 0x1FFFFFFFFFFFFF) : 0; // 2 ** 53 - 1 == 9007199254740991
  };

  var toLength$4 = toLength$5;

  // `LengthOfArrayLike` abstract operation
  // https://tc39.es/ecma262/#sec-lengthofarraylike
  var lengthOfArrayLike$8 = function (obj) {
    return toLength$4(obj.length);
  };

  var toIndexedObject$8 = toIndexedObject$a;
  var toAbsoluteIndex$2 = toAbsoluteIndex$3;
  var lengthOfArrayLike$7 = lengthOfArrayLike$8;

  // `Array.prototype.{ indexOf, includes }` methods implementation
  var createMethod$3 = function (IS_INCLUDES) {
    return function ($this, el, fromIndex) {
      var O = toIndexedObject$8($this);
      var length = lengthOfArrayLike$7(O);
      var index = toAbsoluteIndex$2(fromIndex, length);
      var value;
      // Array#includes uses SameValueZero equality algorithm
      // eslint-disable-next-line no-self-compare -- NaN check
      if (IS_INCLUDES && el != el) while (length > index) {
        value = O[index++];
        // eslint-disable-next-line no-self-compare -- NaN check
        if (value != value) return true;
      // Array#indexOf ignores holes, Array#includes - not
      } else for (;length > index; index++) {
        if ((IS_INCLUDES || index in O) && O[index] === el) return IS_INCLUDES || index || 0;
      } return !IS_INCLUDES && -1;
    };
  };

  var arrayIncludes$1 = {
    // `Array.prototype.includes` method
    // https://tc39.es/ecma262/#sec-array.prototype.includes
    includes: createMethod$3(true),
    // `Array.prototype.indexOf` method
    // https://tc39.es/ecma262/#sec-array.prototype.indexof
    indexOf: createMethod$3(false)
  };

  var hasOwn$9 = hasOwnProperty_1$1;
  var toIndexedObject$7 = toIndexedObject$a;
  var indexOf$1 = arrayIncludes$1.indexOf;
  var hiddenKeys$4 = hiddenKeys$6;

  var objectKeysInternal$1 = function (object, names) {
    var O = toIndexedObject$7(object);
    var i = 0;
    var result = [];
    var key;
    for (key in O) !hasOwn$9(hiddenKeys$4, key) && hasOwn$9(O, key) && result.push(key);
    // Don't enum bug & hidden keys
    while (names.length > i) if (hasOwn$9(O, key = names[i++])) {
      ~indexOf$1(result, key) || result.push(key);
    }
    return result;
  };

  // IE8- don't enum bug keys
  var enumBugKeys$3 = [
    'constructor',
    'hasOwnProperty',
    'isPrototypeOf',
    'propertyIsEnumerable',
    'toLocaleString',
    'toString',
    'valueOf'
  ];

  var internalObjectKeys$1 = objectKeysInternal$1;
  var enumBugKeys$2 = enumBugKeys$3;

  var hiddenKeys$3$1 = enumBugKeys$2.concat('length', 'prototype');

  // `Object.getOwnPropertyNames` method
  // https://tc39.es/ecma262/#sec-object.getownpropertynames
  // eslint-disable-next-line es/no-object-getownpropertynames -- safe
  objectGetOwnPropertyNames$1.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
    return internalObjectKeys$1(O, hiddenKeys$3$1);
  };

  var objectGetOwnPropertySymbols$1 = {};

  // eslint-disable-next-line es/no-object-getownpropertysymbols -- safe
  objectGetOwnPropertySymbols$1.f = Object.getOwnPropertySymbols;

  var getBuiltIn$7 = getBuiltIn$a;
  var getOwnPropertyNamesModule$2 = objectGetOwnPropertyNames$1;
  var getOwnPropertySymbolsModule$1 = objectGetOwnPropertySymbols$1;
  var anObject$j = anObject$l;

  // all object keys, includes non-enumerable and symbols
  var ownKeys$3 = getBuiltIn$7('Reflect', 'ownKeys') || function ownKeys(it) {
    var keys = getOwnPropertyNamesModule$2.f(anObject$j(it));
    var getOwnPropertySymbols = getOwnPropertySymbolsModule$1.f;
    return getOwnPropertySymbols ? keys.concat(getOwnPropertySymbols(it)) : keys;
  };

  var hasOwn$8 = hasOwnProperty_1$1;
  var ownKeys$2 = ownKeys$3;
  var getOwnPropertyDescriptorModule$2 = objectGetOwnPropertyDescriptor$1;
  var definePropertyModule$5 = objectDefineProperty$1;

  var copyConstructorProperties$2 = function (target, source) {
    var keys = ownKeys$2(source);
    var defineProperty = definePropertyModule$5.f;
    var getOwnPropertyDescriptor = getOwnPropertyDescriptorModule$2.f;
    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      if (!hasOwn$8(target, key)) defineProperty(target, key, getOwnPropertyDescriptor(source, key));
    }
  };

  var fails$p = fails$u;
  var isCallable$f = isCallable$o;

  var replacement$1 = /#|\.prototype\./;

  var isForced$4 = function (feature, detection) {
    var value = data$1[normalize$1(feature)];
    return value == POLYFILL$1 ? true
      : value == NATIVE$1 ? false
      : isCallable$f(detection) ? fails$p(detection)
      : !!detection;
  };

  var normalize$1 = isForced$4.normalize = function (string) {
    return String(string).replace(replacement$1, '.').toLowerCase();
  };

  var data$1 = isForced$4.data = {};
  var NATIVE$1 = isForced$4.NATIVE = 'N';
  var POLYFILL$1 = isForced$4.POLYFILL = 'P';

  var isForced_1$1 = isForced$4;

  var global$j = global$t;
  var getOwnPropertyDescriptor$1$1 = objectGetOwnPropertyDescriptor$1.f;
  var createNonEnumerableProperty$5 = createNonEnumerableProperty$8;
  var redefine$c = redefine$d.exports;
  var setGlobal$4 = setGlobal$3$1;
  var copyConstructorProperties$1$1 = copyConstructorProperties$2;
  var isForced$3 = isForced_1$1;

  /*
    options.target      - name of the target object
    options.global      - target is the global object
    options.stat        - export as static methods of target
    options.proto       - export as prototype methods of target
    options.real        - real prototype method for the `pure` version
    options.forced      - export even if the native feature is available
    options.bind        - bind methods to the target, required for the `pure` version
    options.wrap        - wrap constructors to preventing global pollution, required for the `pure` version
    options.unsafe      - use the simple assignment of property instead of delete + defineProperty
    options.sham        - add a flag to not completely full polyfills
    options.enumerable  - export as enumerable property
    options.noTargetGet - prevent calling a getter on target
    options.name        - the .name of the function if it does not match the key
  */
  var _export$1 = function (options, source) {
    var TARGET = options.target;
    var GLOBAL = options.global;
    var STATIC = options.stat;
    var FORCED, target, key, targetProperty, sourceProperty, descriptor;
    if (GLOBAL) {
      target = global$j;
    } else if (STATIC) {
      target = global$j[TARGET] || setGlobal$4(TARGET, {});
    } else {
      target = (global$j[TARGET] || {}).prototype;
    }
    if (target) for (key in source) {
      sourceProperty = source[key];
      if (options.noTargetGet) {
        descriptor = getOwnPropertyDescriptor$1$1(target, key);
        targetProperty = descriptor && descriptor.value;
      } else targetProperty = target[key];
      FORCED = isForced$3(GLOBAL ? key : TARGET + (STATIC ? '.' : '#') + key, options.forced);
      // contained in target
      if (!FORCED && targetProperty !== undefined) {
        if (typeof sourceProperty === typeof targetProperty) continue;
        copyConstructorProperties$1$1(sourceProperty, targetProperty);
      }
      // add a flag to not completely full polyfills
      if (options.sham || (targetProperty && targetProperty.sham)) {
        createNonEnumerableProperty$5(sourceProperty, 'sham', true);
      }
      // extend global
      redefine$c(target, key, sourceProperty, options);
    }
  };

  var wellKnownSymbol$o = wellKnownSymbol$q;

  var TO_STRING_TAG$3 = wellKnownSymbol$o('toStringTag');
  var test$1 = {};

  test$1[TO_STRING_TAG$3] = 'z';

  var toStringTagSupport$1 = String(test$1) === '[object z]';

  var TO_STRING_TAG_SUPPORT$2 = toStringTagSupport$1;
  var isCallable$e = isCallable$o;
  var classofRaw$2 = classofRaw$1$1;
  var wellKnownSymbol$n = wellKnownSymbol$q;

  var TO_STRING_TAG$2 = wellKnownSymbol$n('toStringTag');
  // ES3 wrong here
  var CORRECT_ARGUMENTS$1 = classofRaw$2(function () { return arguments; }()) == 'Arguments';

  // fallback for IE11 Script Access Denied error
  var tryGet$1 = function (it, key) {
    try {
      return it[key];
    } catch (error) { /* empty */ }
  };

  // getting tag from ES6+ `Object.prototype.toString`
  var classof$9 = TO_STRING_TAG_SUPPORT$2 ? classofRaw$2 : function (it) {
    var O, tag, result;
    return it === undefined ? 'Undefined' : it === null ? 'Null'
      // @@toStringTag case
      : typeof (tag = tryGet$1(O = Object(it), TO_STRING_TAG$2)) == 'string' ? tag
      // builtinTag case
      : CORRECT_ARGUMENTS$1 ? classofRaw$2(O)
      // ES3 arguments fallback
      : (result = classofRaw$2(O)) == 'Object' && isCallable$e(O.callee) ? 'Arguments' : result;
  };

  var fails$o = fails$u;
  var isCallable$d = isCallable$o;
  var classof$8 = classof$9;
  var getBuiltIn$6 = getBuiltIn$a;
  var inspectSource$1$1 = inspectSource$4;

  var empty$1 = [];
  var construct$1 = getBuiltIn$6('Reflect', 'construct');
  var constructorRegExp$1 = /^\s*(?:class|function)\b/;
  var exec$1 = constructorRegExp$1.exec;
  var INCORRECT_TO_STRING$1 = !constructorRegExp$1.exec(function () { /* empty */ });

  var isConstructorModern$1 = function (argument) {
    if (!isCallable$d(argument)) return false;
    try {
      construct$1(Object, empty$1, argument);
      return true;
    } catch (error) {
      return false;
    }
  };

  var isConstructorLegacy$1 = function (argument) {
    if (!isCallable$d(argument)) return false;
    switch (classof$8(argument)) {
      case 'AsyncFunction':
      case 'GeneratorFunction':
      case 'AsyncGeneratorFunction': return false;
      // we can't check .prototype since constructors produced by .bind haven't it
    } return INCORRECT_TO_STRING$1 || !!exec$1.call(constructorRegExp$1, inspectSource$1$1(argument));
  };

  // `IsConstructor` abstract operation
  // https://tc39.es/ecma262/#sec-isconstructor
  var isConstructor$4 = !construct$1 || fails$o(function () {
    var called;
    return isConstructorModern$1(isConstructorModern$1.call)
      || !isConstructorModern$1(Object)
      || !isConstructorModern$1(function () { called = true; })
      || called;
  }) ? isConstructorLegacy$1 : isConstructorModern$1;

  var isConstructor$3 = isConstructor$4;
  var tryToString$3 = tryToString$2;

  // `Assert: IsConstructor(argument) is true`
  var aConstructor$2 = function (argument) {
    if (isConstructor$3(argument)) return argument;
    throw TypeError(tryToString$3(argument) + ' is not a constructor');
  };

  var internalObjectKeys$2 = objectKeysInternal$1;
  var enumBugKeys$1$1 = enumBugKeys$3;

  // `Object.keys` method
  // https://tc39.es/ecma262/#sec-object.keys
  // eslint-disable-next-line es/no-object-keys -- safe
  var objectKeys$2 = Object.keys || function keys(O) {
    return internalObjectKeys$2(O, enumBugKeys$1$1);
  };

  var DESCRIPTORS$8 = descriptors$1;
  var definePropertyModule$4 = objectDefineProperty$1;
  var anObject$i = anObject$l;
  var objectKeys$1 = objectKeys$2;

  // `Object.defineProperties` method
  // https://tc39.es/ecma262/#sec-object.defineproperties
  // eslint-disable-next-line es/no-object-defineproperties -- safe
  var objectDefineProperties = DESCRIPTORS$8 ? Object.defineProperties : function defineProperties(O, Properties) {
    anObject$i(O);
    var keys = objectKeys$1(Properties);
    var length = keys.length;
    var index = 0;
    var key;
    while (length > index) definePropertyModule$4.f(O, key = keys[index++], Properties[key]);
    return O;
  };

  var getBuiltIn$5 = getBuiltIn$a;

  var html$2 = getBuiltIn$5('document', 'documentElement');

  /* global ActiveXObject -- old IE, WSH */

  var anObject$h = anObject$l;
  var defineProperties = objectDefineProperties;
  var enumBugKeys$4 = enumBugKeys$3;
  var hiddenKeys$2$1 = hiddenKeys$6;
  var html$1 = html$2;
  var documentCreateElement$1 = documentCreateElement$2;
  var sharedKey$2 = sharedKey$4;

  var GT = '>';
  var LT = '<';
  var PROTOTYPE$1 = 'prototype';
  var SCRIPT = 'script';
  var IE_PROTO$1 = sharedKey$2('IE_PROTO');

  var EmptyConstructor = function () { /* empty */ };

  var scriptTag = function (content) {
    return LT + SCRIPT + GT + content + LT + '/' + SCRIPT + GT;
  };

  // Create object with fake `null` prototype: use ActiveX Object with cleared prototype
  var NullProtoObjectViaActiveX = function (activeXDocument) {
    activeXDocument.write(scriptTag(''));
    activeXDocument.close();
    var temp = activeXDocument.parentWindow.Object;
    activeXDocument = null; // avoid memory leak
    return temp;
  };

  // Create object with fake `null` prototype: use iframe Object with cleared prototype
  var NullProtoObjectViaIFrame = function () {
    // Thrash, waste and sodomy: IE GC bug
    var iframe = documentCreateElement$1('iframe');
    var JS = 'java' + SCRIPT + ':';
    var iframeDocument;
    iframe.style.display = 'none';
    html$1.appendChild(iframe);
    // https://github.com/zloirock/core-js/issues/475
    iframe.src = String(JS);
    iframeDocument = iframe.contentWindow.document;
    iframeDocument.open();
    iframeDocument.write(scriptTag('document.F=Object'));
    iframeDocument.close();
    return iframeDocument.F;
  };

  // Check for document.domain and active x support
  // No need to use active x approach when document.domain is not set
  // see https://github.com/es-shims/es5-shim/issues/150
  // variation of https://github.com/kitcambridge/es5-shim/commit/4f738ac066346
  // avoid IE GC bug
  var activeXDocument;
  var NullProtoObject = function () {
    try {
      activeXDocument = new ActiveXObject('htmlfile');
    } catch (error) { /* ignore */ }
    NullProtoObject = typeof document != 'undefined'
      ? document.domain && activeXDocument
        ? NullProtoObjectViaActiveX(activeXDocument) // old IE
        : NullProtoObjectViaIFrame()
      : NullProtoObjectViaActiveX(activeXDocument); // WSH
    var length = enumBugKeys$4.length;
    while (length--) delete NullProtoObject[PROTOTYPE$1][enumBugKeys$4[length]];
    return NullProtoObject();
  };

  hiddenKeys$2$1[IE_PROTO$1] = true;

  // `Object.create` method
  // https://tc39.es/ecma262/#sec-object.create
  var objectCreate = Object.create || function create(O, Properties) {
    var result;
    if (O !== null) {
      EmptyConstructor[PROTOTYPE$1] = anObject$h(O);
      result = new EmptyConstructor();
      EmptyConstructor[PROTOTYPE$1] = null;
      // add "__proto__" for Object.getPrototypeOf polyfill
      result[IE_PROTO$1] = O;
    } else result = NullProtoObject();
    return Properties === undefined ? result : defineProperties(result, Properties);
  };

  var aCallable$5 = aCallable$7;
  var isObject$e = isObject$k;

  var slice = [].slice;
  var factories = {};

  var construct$2 = function (C, argsLength, args) {
    if (!(argsLength in factories)) {
      for (var list = [], i = 0; i < argsLength; i++) list[i] = 'a[' + i + ']';
      // eslint-disable-next-line no-new-func -- we have no proper alternatives, IE8- only
      factories[argsLength] = Function('C,a', 'return new C(' + list.join(',') + ')');
    } return factories[argsLength](C, args);
  };

  // `Function.prototype.bind` method implementation
  // https://tc39.es/ecma262/#sec-function.prototype.bind
  var functionBind = Function.bind || function bind(that /* , ...args */) {
    var fn = aCallable$5(this);
    var partArgs = slice.call(arguments, 1);
    var boundFunction = function bound(/* args... */) {
      var args = partArgs.concat(slice.call(arguments));
      return this instanceof boundFunction ? construct$2(fn, args.length, args) : fn.apply(that, args);
    };
    if (isObject$e(fn.prototype)) boundFunction.prototype = fn.prototype;
    return boundFunction;
  };

  var $$r = _export$1;
  var getBuiltIn$4$1 = getBuiltIn$a;
  var aConstructor$1 = aConstructor$2;
  var anObject$g = anObject$l;
  var isObject$d = isObject$k;
  var create$4 = objectCreate;
  var bind$6 = functionBind;
  var fails$n = fails$u;

  var nativeConstruct = getBuiltIn$4$1('Reflect', 'construct');

  // `Reflect.construct` method
  // https://tc39.es/ecma262/#sec-reflect.construct
  // MS Edge supports only 2 arguments and argumentsList argument is optional
  // FF Nightly sets third argument as `new.target`, but does not create `this` from it
  var NEW_TARGET_BUG = fails$n(function () {
    function F() { /* empty */ }
    return !(nativeConstruct(function () { /* empty */ }, [], F) instanceof F);
  });
  var ARGS_BUG = !fails$n(function () {
    nativeConstruct(function () { /* empty */ });
  });
  var FORCED$5 = NEW_TARGET_BUG || ARGS_BUG;

  $$r({ target: 'Reflect', stat: true, forced: FORCED$5, sham: FORCED$5 }, {
    construct: function construct(Target, args /* , newTarget */) {
      aConstructor$1(Target);
      anObject$g(args);
      var newTarget = arguments.length < 3 ? Target : aConstructor$1(arguments[2]);
      if (ARGS_BUG && !NEW_TARGET_BUG) return nativeConstruct(Target, args, newTarget);
      if (Target == newTarget) {
        // w/o altered newTarget, optimization for 0-4 arguments
        switch (args.length) {
          case 0: return new Target();
          case 1: return new Target(args[0]);
          case 2: return new Target(args[0], args[1]);
          case 3: return new Target(args[0], args[1], args[2]);
          case 4: return new Target(args[0], args[1], args[2], args[3]);
        }
        // w/o altered newTarget, lot of arguments case
        var $args = [null];
        $args.push.apply($args, args);
        return new (bind$6.apply(Target, $args))();
      }
      // with altered newTarget, not support built-in constructors
      var proto = newTarget.prototype;
      var instance = create$4(isObject$d(proto) ? proto : Object.prototype);
      var result = Function.apply.call(Target, instance, args);
      return isObject$d(result) ? result : instance;
    }
  });

  function _assertThisInitialized$1(self) {
    if (self === void 0) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return self;
  }

  function _setPrototypeOf$1(o, p) {
    _setPrototypeOf$1 = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
      o.__proto__ = p;
      return o;
    };

    return _setPrototypeOf$1(o, p);
  }

  function _inherits$1(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function");
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        writable: true,
        configurable: true
      }
    });
    if (superClass) _setPrototypeOf$1(subClass, superClass);
  }

  function _typeof$1(obj) {
    "@babel/helpers - typeof";

    if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
      _typeof$1 = function _typeof(obj) {
        return typeof obj;
      };
    } else {
      _typeof$1 = function _typeof(obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
      };
    }

    return _typeof$1(obj);
  }

  function _possibleConstructorReturn$1(self, call) {
    if (call && (_typeof$1(call) === "object" || typeof call === "function")) {
      return call;
    } else if (call !== void 0) {
      throw new TypeError("Derived constructors may only return object or undefined");
    }

    return _assertThisInitialized$1(self);
  }

  function _getPrototypeOf$1(o) {
    _getPrototypeOf$1 = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
      return o.__proto__ || Object.getPrototypeOf(o);
    };
    return _getPrototypeOf$1(o);
  }

  function _classApplyDescriptorSet$2(receiver, descriptor, value) {
    if (descriptor.set) {
      descriptor.set.call(receiver, value);
    } else {
      if (!descriptor.writable) {
        throw new TypeError("attempted to set read only private field");
      }

      descriptor.value = value;
    }
  }

  function _classExtractFieldDescriptor(receiver, privateMap, action) {
    if (!privateMap.has(receiver)) {
      throw new TypeError("attempted to " + action + " private field on non-instance");
    }

    return privateMap.get(receiver);
  }

  function _classPrivateFieldSet(receiver, privateMap, value) {
    var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "set");
    _classApplyDescriptorSet$2(receiver, descriptor, value);
    return value;
  }

  function _classApplyDescriptorGet$4(receiver, descriptor) {
    if (descriptor.get) {
      return descriptor.get.call(receiver);
    }

    return descriptor.value;
  }

  function _classPrivateFieldGet(receiver, privateMap) {
    var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "get");
    return _classApplyDescriptorGet$4(receiver, descriptor);
  }

  var wellKnownSymbol$m = wellKnownSymbol$q;
  var create$3 = objectCreate;
  var definePropertyModule$3 = objectDefineProperty$1;

  var UNSCOPABLES = wellKnownSymbol$m('unscopables');
  var ArrayPrototype$1 = Array.prototype;

  // Array.prototype[@@unscopables]
  // https://tc39.es/ecma262/#sec-array.prototype-@@unscopables
  if (ArrayPrototype$1[UNSCOPABLES] == undefined) {
    definePropertyModule$3.f(ArrayPrototype$1, UNSCOPABLES, {
      configurable: true,
      value: create$3(null)
    });
  }

  // add a key to Array.prototype[@@unscopables]
  var addToUnscopables$3 = function (key) {
    ArrayPrototype$1[UNSCOPABLES][key] = true;
  };

  var iterators = {};

  var fails$m = fails$u;

  var correctPrototypeGetter = !fails$m(function () {
    function F() { /* empty */ }
    F.prototype.constructor = null;
    // eslint-disable-next-line es/no-object-getprototypeof -- required for testing
    return Object.getPrototypeOf(new F()) !== F.prototype;
  });

  var hasOwn$7 = hasOwnProperty_1$1;
  var isCallable$c = isCallable$o;
  var toObject$8 = toObject$a;
  var sharedKey$1$1 = sharedKey$4;
  var CORRECT_PROTOTYPE_GETTER = correctPrototypeGetter;

  var IE_PROTO = sharedKey$1$1('IE_PROTO');
  var ObjectPrototype$1 = Object.prototype;

  // `Object.getPrototypeOf` method
  // https://tc39.es/ecma262/#sec-object.getprototypeof
  // eslint-disable-next-line es/no-object-getprototypeof -- safe
  var objectGetPrototypeOf = CORRECT_PROTOTYPE_GETTER ? Object.getPrototypeOf : function (O) {
    var object = toObject$8(O);
    if (hasOwn$7(object, IE_PROTO)) return object[IE_PROTO];
    var constructor = object.constructor;
    if (isCallable$c(constructor) && object instanceof constructor) {
      return constructor.prototype;
    } return object instanceof Object ? ObjectPrototype$1 : null;
  };

  var fails$l = fails$u;
  var isCallable$b$1 = isCallable$o;
  var getPrototypeOf$1 = objectGetPrototypeOf;
  var redefine$b = redefine$d.exports;
  var wellKnownSymbol$l = wellKnownSymbol$q;

  var ITERATOR$5 = wellKnownSymbol$l('iterator');
  var BUGGY_SAFARI_ITERATORS$1 = false;

  // `%IteratorPrototype%` object
  // https://tc39.es/ecma262/#sec-%iteratorprototype%-object
  var IteratorPrototype$2, PrototypeOfArrayIteratorPrototype, arrayIterator;

  /* eslint-disable es/no-array-prototype-keys -- safe */
  if ([].keys) {
    arrayIterator = [].keys();
    // Safari 8 has buggy iterators w/o `next`
    if (!('next' in arrayIterator)) BUGGY_SAFARI_ITERATORS$1 = true;
    else {
      PrototypeOfArrayIteratorPrototype = getPrototypeOf$1(getPrototypeOf$1(arrayIterator));
      if (PrototypeOfArrayIteratorPrototype !== Object.prototype) IteratorPrototype$2 = PrototypeOfArrayIteratorPrototype;
    }
  }

  var NEW_ITERATOR_PROTOTYPE = IteratorPrototype$2 == undefined || fails$l(function () {
    var test = {};
    // FF44- legacy iterators case
    return IteratorPrototype$2[ITERATOR$5].call(test) !== test;
  });

  if (NEW_ITERATOR_PROTOTYPE) IteratorPrototype$2 = {};

  // `%IteratorPrototype%[@@iterator]()` method
  // https://tc39.es/ecma262/#sec-%iteratorprototype%-@@iterator
  if (!isCallable$b$1(IteratorPrototype$2[ITERATOR$5])) {
    redefine$b(IteratorPrototype$2, ITERATOR$5, function () {
      return this;
    });
  }

  var iteratorsCore = {
    IteratorPrototype: IteratorPrototype$2,
    BUGGY_SAFARI_ITERATORS: BUGGY_SAFARI_ITERATORS$1
  };

  var defineProperty$6 = objectDefineProperty$1.f;
  var hasOwn$6$1 = hasOwnProperty_1$1;
  var wellKnownSymbol$k = wellKnownSymbol$q;

  var TO_STRING_TAG$1$1 = wellKnownSymbol$k('toStringTag');

  var setToStringTag$5 = function (it, TAG, STATIC) {
    if (it && !hasOwn$6$1(it = STATIC ? it : it.prototype, TO_STRING_TAG$1$1)) {
      defineProperty$6(it, TO_STRING_TAG$1$1, { configurable: true, value: TAG });
    }
  };

  var IteratorPrototype$1 = iteratorsCore.IteratorPrototype;
  var create$2 = objectCreate;
  var createPropertyDescriptor$2$1 = createPropertyDescriptor$5;
  var setToStringTag$4 = setToStringTag$5;
  var Iterators$4 = iterators;

  var returnThis$1 = function () { return this; };

  var createIteratorConstructor$2 = function (IteratorConstructor, NAME, next) {
    var TO_STRING_TAG = NAME + ' Iterator';
    IteratorConstructor.prototype = create$2(IteratorPrototype$1, { next: createPropertyDescriptor$2$1(1, next) });
    setToStringTag$4(IteratorConstructor, TO_STRING_TAG, false);
    Iterators$4[TO_STRING_TAG] = returnThis$1;
    return IteratorConstructor;
  };

  var isCallable$a$1 = isCallable$o;

  var aPossiblePrototype$1 = function (argument) {
    if (typeof argument === 'object' || isCallable$a$1(argument)) return argument;
    throw TypeError("Can't set " + String(argument) + ' as a prototype');
  };

  /* eslint-disable no-proto -- safe */

  var anObject$f = anObject$l;
  var aPossiblePrototype = aPossiblePrototype$1;

  // `Object.setPrototypeOf` method
  // https://tc39.es/ecma262/#sec-object.setprototypeof
  // Works with __proto__ only. Old v8 can't work with null proto objects.
  // eslint-disable-next-line es/no-object-setprototypeof -- safe
  var objectSetPrototypeOf = Object.setPrototypeOf || ('__proto__' in {} ? function () {
    var CORRECT_SETTER = false;
    var test = {};
    var setter;
    try {
      // eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
      setter = Object.getOwnPropertyDescriptor(Object.prototype, '__proto__').set;
      setter.call(test, []);
      CORRECT_SETTER = test instanceof Array;
    } catch (error) { /* empty */ }
    return function setPrototypeOf(O, proto) {
      anObject$f(O);
      aPossiblePrototype(proto);
      if (CORRECT_SETTER) setter.call(O, proto);
      else O.__proto__ = proto;
      return O;
    };
  }() : undefined);

  var $$q = _export$1;
  var FunctionName = functionName$1;
  var isCallable$9$1 = isCallable$o;
  var createIteratorConstructor$1 = createIteratorConstructor$2;
  var getPrototypeOf = objectGetPrototypeOf;
  var setPrototypeOf$2 = objectSetPrototypeOf;
  var setToStringTag$3 = setToStringTag$5;
  var createNonEnumerableProperty$4 = createNonEnumerableProperty$8;
  var redefine$a = redefine$d.exports;
  var wellKnownSymbol$j = wellKnownSymbol$q;
  var Iterators$3 = iterators;
  var IteratorsCore = iteratorsCore;

  var PROPER_FUNCTION_NAME$2 = FunctionName.PROPER;
  var CONFIGURABLE_FUNCTION_NAME$2 = FunctionName.CONFIGURABLE;
  var IteratorPrototype = IteratorsCore.IteratorPrototype;
  var BUGGY_SAFARI_ITERATORS = IteratorsCore.BUGGY_SAFARI_ITERATORS;
  var ITERATOR$4 = wellKnownSymbol$j('iterator');
  var KEYS = 'keys';
  var VALUES = 'values';
  var ENTRIES = 'entries';

  var returnThis = function () { return this; };

  var defineIterator$3 = function (Iterable, NAME, IteratorConstructor, next, DEFAULT, IS_SET, FORCED) {
    createIteratorConstructor$1(IteratorConstructor, NAME, next);

    var getIterationMethod = function (KIND) {
      if (KIND === DEFAULT && defaultIterator) return defaultIterator;
      if (!BUGGY_SAFARI_ITERATORS && KIND in IterablePrototype) return IterablePrototype[KIND];
      switch (KIND) {
        case KEYS: return function keys() { return new IteratorConstructor(this, KIND); };
        case VALUES: return function values() { return new IteratorConstructor(this, KIND); };
        case ENTRIES: return function entries() { return new IteratorConstructor(this, KIND); };
      } return function () { return new IteratorConstructor(this); };
    };

    var TO_STRING_TAG = NAME + ' Iterator';
    var INCORRECT_VALUES_NAME = false;
    var IterablePrototype = Iterable.prototype;
    var nativeIterator = IterablePrototype[ITERATOR$4]
      || IterablePrototype['@@iterator']
      || DEFAULT && IterablePrototype[DEFAULT];
    var defaultIterator = !BUGGY_SAFARI_ITERATORS && nativeIterator || getIterationMethod(DEFAULT);
    var anyNativeIterator = NAME == 'Array' ? IterablePrototype.entries || nativeIterator : nativeIterator;
    var CurrentIteratorPrototype, methods, KEY;

    // fix native
    if (anyNativeIterator) {
      CurrentIteratorPrototype = getPrototypeOf(anyNativeIterator.call(new Iterable()));
      if (CurrentIteratorPrototype !== Object.prototype && CurrentIteratorPrototype.next) {
        if (getPrototypeOf(CurrentIteratorPrototype) !== IteratorPrototype) {
          if (setPrototypeOf$2) {
            setPrototypeOf$2(CurrentIteratorPrototype, IteratorPrototype);
          } else if (!isCallable$9$1(CurrentIteratorPrototype[ITERATOR$4])) {
            redefine$a(CurrentIteratorPrototype, ITERATOR$4, returnThis);
          }
        }
        // Set @@toStringTag to native iterators
        setToStringTag$3(CurrentIteratorPrototype, TO_STRING_TAG, true);
      }
    }

    // fix Array.prototype.{ values, @@iterator }.name in V8 / FF
    if (PROPER_FUNCTION_NAME$2 && DEFAULT == VALUES && nativeIterator && nativeIterator.name !== VALUES) {
      if (CONFIGURABLE_FUNCTION_NAME$2) {
        createNonEnumerableProperty$4(IterablePrototype, 'name', VALUES);
      } else {
        INCORRECT_VALUES_NAME = true;
        defaultIterator = function values() { return nativeIterator.call(this); };
      }
    }

    // export additional methods
    if (DEFAULT) {
      methods = {
        values: getIterationMethod(VALUES),
        keys: IS_SET ? defaultIterator : getIterationMethod(KEYS),
        entries: getIterationMethod(ENTRIES)
      };
      if (FORCED) for (KEY in methods) {
        if (BUGGY_SAFARI_ITERATORS || INCORRECT_VALUES_NAME || !(KEY in IterablePrototype)) {
          redefine$a(IterablePrototype, KEY, methods[KEY]);
        }
      } else $$q({ target: NAME, proto: true, forced: BUGGY_SAFARI_ITERATORS || INCORRECT_VALUES_NAME }, methods);
    }

    // define iterator
    if (IterablePrototype[ITERATOR$4] !== defaultIterator) {
      redefine$a(IterablePrototype, ITERATOR$4, defaultIterator, { name: DEFAULT });
    }
    Iterators$3[NAME] = defaultIterator;

    return methods;
  };

  var toIndexedObject$6 = toIndexedObject$a;
  var addToUnscopables$2 = addToUnscopables$3;
  var Iterators$2 = iterators;
  var InternalStateModule$6 = internalState$1;
  var defineIterator$2 = defineIterator$3;

  var ARRAY_ITERATOR = 'Array Iterator';
  var setInternalState$6 = InternalStateModule$6.set;
  var getInternalState$5 = InternalStateModule$6.getterFor(ARRAY_ITERATOR);

  // `Array.prototype.entries` method
  // https://tc39.es/ecma262/#sec-array.prototype.entries
  // `Array.prototype.keys` method
  // https://tc39.es/ecma262/#sec-array.prototype.keys
  // `Array.prototype.values` method
  // https://tc39.es/ecma262/#sec-array.prototype.values
  // `Array.prototype[@@iterator]` method
  // https://tc39.es/ecma262/#sec-array.prototype-@@iterator
  // `CreateArrayIterator` internal method
  // https://tc39.es/ecma262/#sec-createarrayiterator
  var es_array_iterator = defineIterator$2(Array, 'Array', function (iterated, kind) {
    setInternalState$6(this, {
      type: ARRAY_ITERATOR,
      target: toIndexedObject$6(iterated), // target
      index: 0,                          // next index
      kind: kind                         // kind
    });
  // `%ArrayIteratorPrototype%.next` method
  // https://tc39.es/ecma262/#sec-%arrayiteratorprototype%.next
  }, function () {
    var state = getInternalState$5(this);
    var target = state.target;
    var kind = state.kind;
    var index = state.index++;
    if (!target || index >= target.length) {
      state.target = undefined;
      return { value: undefined, done: true };
    }
    if (kind == 'keys') return { value: index, done: false };
    if (kind == 'values') return { value: target[index], done: false };
    return { value: [index, target[index]], done: false };
  }, 'values');

  // argumentsList[@@iterator] is %ArrayProto_values%
  // https://tc39.es/ecma262/#sec-createunmappedargumentsobject
  // https://tc39.es/ecma262/#sec-createmappedargumentsobject
  Iterators$2.Arguments = Iterators$2.Array;

  // https://tc39.es/ecma262/#sec-array.prototype-@@unscopables
  addToUnscopables$2('keys');
  addToUnscopables$2('values');
  addToUnscopables$2('entries');

  var TO_STRING_TAG_SUPPORT$1 = toStringTagSupport$1;
  var classof$7 = classof$9;

  // `Object.prototype.toString` method implementation
  // https://tc39.es/ecma262/#sec-object.prototype.tostring
  var objectToString = TO_STRING_TAG_SUPPORT$1 ? {}.toString : function toString() {
    return '[object ' + classof$7(this) + ']';
  };

  var TO_STRING_TAG_SUPPORT$3 = toStringTagSupport$1;
  var redefine$9 = redefine$d.exports;
  var toString$d = objectToString;

  // `Object.prototype.toString` method
  // https://tc39.es/ecma262/#sec-object.prototype.tostring
  if (!TO_STRING_TAG_SUPPORT$3) {
    redefine$9(Object.prototype, 'toString', toString$d, { unsafe: true });
  }

  var classof$6 = classof$9;

  var toString$c = function (argument) {
    if (classof$6(argument) === 'Symbol') throw TypeError('Cannot convert a Symbol value to a string');
    return String(argument);
  };

  var toIntegerOrInfinity$2$1 = toIntegerOrInfinity$5;
  var toString$b = toString$c;
  var requireObjectCoercible$6 = requireObjectCoercible$9;

  var createMethod$2 = function (CONVERT_TO_STRING) {
    return function ($this, pos) {
      var S = toString$b(requireObjectCoercible$6($this));
      var position = toIntegerOrInfinity$2$1(pos);
      var size = S.length;
      var first, second;
      if (position < 0 || position >= size) return CONVERT_TO_STRING ? '' : undefined;
      first = S.charCodeAt(position);
      return first < 0xD800 || first > 0xDBFF || position + 1 === size
        || (second = S.charCodeAt(position + 1)) < 0xDC00 || second > 0xDFFF
          ? CONVERT_TO_STRING ? S.charAt(position) : first
          : CONVERT_TO_STRING ? S.slice(position, position + 2) : (first - 0xD800 << 10) + (second - 0xDC00) + 0x10000;
    };
  };

  var stringMultibyte = {
    // `String.prototype.codePointAt` method
    // https://tc39.es/ecma262/#sec-string.prototype.codepointat
    codeAt: createMethod$2(false),
    // `String.prototype.at` method
    // https://github.com/mathiasbynens/String.prototype.at
    charAt: createMethod$2(true)
  };

  var charAt$1 = stringMultibyte.charAt;
  var toString$a = toString$c;
  var InternalStateModule$5 = internalState$1;
  var defineIterator$1 = defineIterator$3;

  var STRING_ITERATOR = 'String Iterator';
  var setInternalState$5 = InternalStateModule$5.set;
  var getInternalState$4 = InternalStateModule$5.getterFor(STRING_ITERATOR);

  // `String.prototype[@@iterator]` method
  // https://tc39.es/ecma262/#sec-string.prototype-@@iterator
  defineIterator$1(String, 'String', function (iterated) {
    setInternalState$5(this, {
      type: STRING_ITERATOR,
      string: toString$a(iterated),
      index: 0
    });
  // `%StringIteratorPrototype%.next` method
  // https://tc39.es/ecma262/#sec-%stringiteratorprototype%.next
  }, function next() {
    var state = getInternalState$4(this);
    var string = state.string;
    var index = state.index;
    var point;
    if (index >= string.length) return { value: undefined, done: true };
    point = charAt$1(string, index);
    state.index += point.length;
    return { value: point, done: false };
  });

  var redefine$8 = redefine$d.exports;

  var redefineAll$4 = function (target, src, options) {
    for (var key in src) redefine$8(target, key, src[key], options);
    return target;
  };

  var internalMetadata = {exports: {}};

  var objectGetOwnPropertyNamesExternal = {};

  /* eslint-disable es/no-object-getownpropertynames -- safe */

  var toIndexedObject$5 = toIndexedObject$a;
  var $getOwnPropertyNames$1 = objectGetOwnPropertyNames$1.f;

  var toString$9 = {}.toString;

  var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames
    ? Object.getOwnPropertyNames(window) : [];

  var getWindowNames = function (it) {
    try {
      return $getOwnPropertyNames$1(it);
    } catch (error) {
      return windowNames.slice();
    }
  };

  // fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
  objectGetOwnPropertyNamesExternal.f = function getOwnPropertyNames(it) {
    return windowNames && toString$9.call(it) == '[object Window]'
      ? getWindowNames(it)
      : $getOwnPropertyNames$1(toIndexedObject$5(it));
  };

  var fails$k = fails$u;

  var freezing = !fails$k(function () {
    // eslint-disable-next-line es/no-object-isextensible, es/no-object-preventextensions -- required for testing
    return Object.isExtensible(Object.preventExtensions({}));
  });

  var $$p = _export$1;
  var hiddenKeys$1$1 = hiddenKeys$6;
  var isObject$c = isObject$k;
  var hasOwn$5$1 = hasOwnProperty_1$1;
  var defineProperty$5 = objectDefineProperty$1.f;
  var getOwnPropertyNamesModule$1 = objectGetOwnPropertyNames$1;
  var getOwnPropertyNamesExternalModule = objectGetOwnPropertyNamesExternal;
  var uid$1$1 = uid$4;
  var FREEZING = freezing;

  var REQUIRED = false;
  var METADATA = uid$1$1('meta');
  var id$1 = 0;

  // eslint-disable-next-line es/no-object-isextensible -- safe
  var isExtensible$1 = Object.isExtensible || function () {
    return true;
  };

  var setMetadata = function (it) {
    defineProperty$5(it, METADATA, { value: {
      objectID: 'O' + id$1++, // object ID
      weakData: {}          // weak collections IDs
    } });
  };

  var fastKey$1 = function (it, create) {
    // return a primitive with prefix
    if (!isObject$c(it)) return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
    if (!hasOwn$5$1(it, METADATA)) {
      // can't set metadata to uncaught frozen object
      if (!isExtensible$1(it)) return 'F';
      // not necessary to add metadata
      if (!create) return 'E';
      // add missing metadata
      setMetadata(it);
    // return object ID
    } return it[METADATA].objectID;
  };

  var getWeakData$1 = function (it, create) {
    if (!hasOwn$5$1(it, METADATA)) {
      // can't set metadata to uncaught frozen object
      if (!isExtensible$1(it)) return true;
      // not necessary to add metadata
      if (!create) return false;
      // add missing metadata
      setMetadata(it);
    // return the store of weak collections IDs
    } return it[METADATA].weakData;
  };

  // add metadata on freeze-family methods calling
  var onFreeze = function (it) {
    if (FREEZING && REQUIRED && isExtensible$1(it) && !hasOwn$5$1(it, METADATA)) setMetadata(it);
    return it;
  };

  var enable = function () {
    meta.enable = function () { /* empty */ };
    REQUIRED = true;
    var getOwnPropertyNames = getOwnPropertyNamesModule$1.f;
    var splice = [].splice;
    var test = {};
    test[METADATA] = 1;

    // prevent exposing of metadata key
    if (getOwnPropertyNames(test).length) {
      getOwnPropertyNamesModule$1.f = function (it) {
        var result = getOwnPropertyNames(it);
        for (var i = 0, length = result.length; i < length; i++) {
          if (result[i] === METADATA) {
            splice.call(result, i, 1);
            break;
          }
        } return result;
      };

      $$p({ target: 'Object', stat: true, forced: true }, {
        getOwnPropertyNames: getOwnPropertyNamesExternalModule.f
      });
    }
  };

  var meta = internalMetadata.exports = {
    enable: enable,
    fastKey: fastKey$1,
    getWeakData: getWeakData$1,
    onFreeze: onFreeze
  };

  hiddenKeys$1$1[METADATA] = true;

  var wellKnownSymbol$i = wellKnownSymbol$q;
  var Iterators$1 = iterators;

  var ITERATOR$3 = wellKnownSymbol$i('iterator');
  var ArrayPrototype = Array.prototype;

  // check on default Array iterator
  var isArrayIteratorMethod$2 = function (it) {
    return it !== undefined && (Iterators$1.Array === it || ArrayPrototype[ITERATOR$3] === it);
  };

  var aCallable$4 = aCallable$7;

  // optional / simple context binding
  var functionBindContext = function (fn, that, length) {
    aCallable$4(fn);
    if (that === undefined) return fn;
    switch (length) {
      case 0: return function () {
        return fn.call(that);
      };
      case 1: return function (a) {
        return fn.call(that, a);
      };
      case 2: return function (a, b) {
        return fn.call(that, a, b);
      };
      case 3: return function (a, b, c) {
        return fn.call(that, a, b, c);
      };
    }
    return function (/* ...args */) {
      return fn.apply(that, arguments);
    };
  };

  var classof$5 = classof$9;
  var getMethod$5 = getMethod$7;
  var Iterators = iterators;
  var wellKnownSymbol$h = wellKnownSymbol$q;

  var ITERATOR$2 = wellKnownSymbol$h('iterator');

  var getIteratorMethod$3 = function (it) {
    if (it != undefined) return getMethod$5(it, ITERATOR$2)
      || getMethod$5(it, '@@iterator')
      || Iterators[classof$5(it)];
  };

  var aCallable$3 = aCallable$7;
  var anObject$e = anObject$l;
  var getIteratorMethod$2 = getIteratorMethod$3;

  var getIterator$2 = function (argument, usingIterator) {
    var iteratorMethod = arguments.length < 2 ? getIteratorMethod$2(argument) : usingIterator;
    if (aCallable$3(iteratorMethod)) return anObject$e(iteratorMethod.call(argument));
    throw TypeError(String(argument) + ' is not iterable');
  };

  var anObject$d = anObject$l;
  var getMethod$4 = getMethod$7;

  var iteratorClose$2 = function (iterator, kind, value) {
    var innerResult, innerError;
    anObject$d(iterator);
    try {
      innerResult = getMethod$4(iterator, 'return');
      if (!innerResult) {
        if (kind === 'throw') throw value;
        return value;
      }
      innerResult = innerResult.call(iterator);
    } catch (error) {
      innerError = true;
      innerResult = error;
    }
    if (kind === 'throw') throw value;
    if (innerError) throw innerResult;
    anObject$d(innerResult);
    return value;
  };

  var anObject$c = anObject$l;
  var isArrayIteratorMethod$1 = isArrayIteratorMethod$2;
  var lengthOfArrayLike$6 = lengthOfArrayLike$8;
  var bind$5 = functionBindContext;
  var getIterator$1 = getIterator$2;
  var getIteratorMethod$1 = getIteratorMethod$3;
  var iteratorClose$1 = iteratorClose$2;

  var Result = function (stopped, result) {
    this.stopped = stopped;
    this.result = result;
  };

  var iterate$4 = function (iterable, unboundFunction, options) {
    var that = options && options.that;
    var AS_ENTRIES = !!(options && options.AS_ENTRIES);
    var IS_ITERATOR = !!(options && options.IS_ITERATOR);
    var INTERRUPTED = !!(options && options.INTERRUPTED);
    var fn = bind$5(unboundFunction, that, 1 + AS_ENTRIES + INTERRUPTED);
    var iterator, iterFn, index, length, result, next, step;

    var stop = function (condition) {
      if (iterator) iteratorClose$1(iterator, 'normal', condition);
      return new Result(true, condition);
    };

    var callFn = function (value) {
      if (AS_ENTRIES) {
        anObject$c(value);
        return INTERRUPTED ? fn(value[0], value[1], stop) : fn(value[0], value[1]);
      } return INTERRUPTED ? fn(value, stop) : fn(value);
    };

    if (IS_ITERATOR) {
      iterator = iterable;
    } else {
      iterFn = getIteratorMethod$1(iterable);
      if (!iterFn) throw TypeError(String(iterable) + ' is not iterable');
      // optimisation for array iterators
      if (isArrayIteratorMethod$1(iterFn)) {
        for (index = 0, length = lengthOfArrayLike$6(iterable); length > index; index++) {
          result = callFn(iterable[index]);
          if (result && result instanceof Result) return result;
        } return new Result(false);
      }
      iterator = getIterator$1(iterable, iterFn);
    }

    next = iterator.next;
    while (!(step = next.call(iterator)).done) {
      try {
        result = callFn(step.value);
      } catch (error) {
        iteratorClose$1(iterator, 'throw', error);
      }
      if (typeof result == 'object' && result && result instanceof Result) return result;
    } return new Result(false);
  };

  var anInstance$4 = function (it, Constructor, name) {
    if (it instanceof Constructor) return it;
    throw TypeError('Incorrect ' + (name ? name + ' ' : '') + 'invocation');
  };

  var wellKnownSymbol$g = wellKnownSymbol$q;

  var ITERATOR$1 = wellKnownSymbol$g('iterator');
  var SAFE_CLOSING = false;

  try {
    var called = 0;
    var iteratorWithReturn = {
      next: function () {
        return { done: !!called++ };
      },
      'return': function () {
        SAFE_CLOSING = true;
      }
    };
    iteratorWithReturn[ITERATOR$1] = function () {
      return this;
    };
    // eslint-disable-next-line es/no-array-from, no-throw-literal -- required for testing
    Array.from(iteratorWithReturn, function () { throw 2; });
  } catch (error) { /* empty */ }

  var checkCorrectnessOfIteration$3 = function (exec, SKIP_CLOSING) {
    if (!SKIP_CLOSING && !SAFE_CLOSING) return false;
    var ITERATION_SUPPORT = false;
    try {
      var object = {};
      object[ITERATOR$1] = function () {
        return {
          next: function () {
            return { done: ITERATION_SUPPORT = true };
          }
        };
      };
      exec(object);
    } catch (error) { /* empty */ }
    return ITERATION_SUPPORT;
  };

  var isCallable$8$1 = isCallable$o;
  var isObject$b = isObject$k;
  var setPrototypeOf$1 = objectSetPrototypeOf;

  // makes subclassing work correct for wrapped built-ins
  var inheritIfRequired$2 = function ($this, dummy, Wrapper) {
    var NewTarget, NewTargetPrototype;
    if (
      // it can work only with native `setPrototypeOf`
      setPrototypeOf$1 &&
      // we haven't completely correct pre-ES6 way for getting `new.target`, so use this
      isCallable$8$1(NewTarget = dummy.constructor) &&
      NewTarget !== Wrapper &&
      isObject$b(NewTargetPrototype = NewTarget.prototype) &&
      NewTargetPrototype !== Wrapper.prototype
    ) setPrototypeOf$1($this, NewTargetPrototype);
    return $this;
  };

  var $$o = _export$1;
  var global$i = global$t;
  var isForced$2 = isForced_1$1;
  var redefine$7 = redefine$d.exports;
  var InternalMetadataModule$1 = internalMetadata.exports;
  var iterate$3 = iterate$4;
  var anInstance$3 = anInstance$4;
  var isCallable$7$1 = isCallable$o;
  var isObject$a = isObject$k;
  var fails$j = fails$u;
  var checkCorrectnessOfIteration$2 = checkCorrectnessOfIteration$3;
  var setToStringTag$2 = setToStringTag$5;
  var inheritIfRequired$1 = inheritIfRequired$2;

  var collection$3 = function (CONSTRUCTOR_NAME, wrapper, common) {
    var IS_MAP = CONSTRUCTOR_NAME.indexOf('Map') !== -1;
    var IS_WEAK = CONSTRUCTOR_NAME.indexOf('Weak') !== -1;
    var ADDER = IS_MAP ? 'set' : 'add';
    var NativeConstructor = global$i[CONSTRUCTOR_NAME];
    var NativePrototype = NativeConstructor && NativeConstructor.prototype;
    var Constructor = NativeConstructor;
    var exported = {};

    var fixMethod = function (KEY) {
      var nativeMethod = NativePrototype[KEY];
      redefine$7(NativePrototype, KEY,
        KEY == 'add' ? function add(value) {
          nativeMethod.call(this, value === 0 ? 0 : value);
          return this;
        } : KEY == 'delete' ? function (key) {
          return IS_WEAK && !isObject$a(key) ? false : nativeMethod.call(this, key === 0 ? 0 : key);
        } : KEY == 'get' ? function get(key) {
          return IS_WEAK && !isObject$a(key) ? undefined : nativeMethod.call(this, key === 0 ? 0 : key);
        } : KEY == 'has' ? function has(key) {
          return IS_WEAK && !isObject$a(key) ? false : nativeMethod.call(this, key === 0 ? 0 : key);
        } : function set(key, value) {
          nativeMethod.call(this, key === 0 ? 0 : key, value);
          return this;
        }
      );
    };

    var REPLACE = isForced$2(
      CONSTRUCTOR_NAME,
      !isCallable$7$1(NativeConstructor) || !(IS_WEAK || NativePrototype.forEach && !fails$j(function () {
        new NativeConstructor().entries().next();
      }))
    );

    if (REPLACE) {
      // create collection constructor
      Constructor = common.getConstructor(wrapper, CONSTRUCTOR_NAME, IS_MAP, ADDER);
      InternalMetadataModule$1.enable();
    } else if (isForced$2(CONSTRUCTOR_NAME, true)) {
      var instance = new Constructor();
      // early implementations not supports chaining
      var HASNT_CHAINING = instance[ADDER](IS_WEAK ? {} : -0, 1) != instance;
      // V8 ~ Chromium 40- weak-collections throws on primitives, but should return false
      var THROWS_ON_PRIMITIVES = fails$j(function () { instance.has(1); });
      // most early implementations doesn't supports iterables, most modern - not close it correctly
      // eslint-disable-next-line no-new -- required for testing
      var ACCEPT_ITERABLES = checkCorrectnessOfIteration$2(function (iterable) { new NativeConstructor(iterable); });
      // for early implementations -0 and +0 not the same
      var BUGGY_ZERO = !IS_WEAK && fails$j(function () {
        // V8 ~ Chromium 42- fails only with 5+ elements
        var $instance = new NativeConstructor();
        var index = 5;
        while (index--) $instance[ADDER](index, index);
        return !$instance.has(-0);
      });

      if (!ACCEPT_ITERABLES) {
        Constructor = wrapper(function (dummy, iterable) {
          anInstance$3(dummy, Constructor, CONSTRUCTOR_NAME);
          var that = inheritIfRequired$1(new NativeConstructor(), dummy, Constructor);
          if (iterable != undefined) iterate$3(iterable, that[ADDER], { that: that, AS_ENTRIES: IS_MAP });
          return that;
        });
        Constructor.prototype = NativePrototype;
        NativePrototype.constructor = Constructor;
      }

      if (THROWS_ON_PRIMITIVES || BUGGY_ZERO) {
        fixMethod('delete');
        fixMethod('has');
        IS_MAP && fixMethod('get');
      }

      if (BUGGY_ZERO || HASNT_CHAINING) fixMethod(ADDER);

      // weak collections should not contains .clear method
      if (IS_WEAK && NativePrototype.clear) delete NativePrototype.clear;
    }

    exported[CONSTRUCTOR_NAME] = Constructor;
    $$o({ global: true, forced: Constructor != NativeConstructor }, exported);

    setToStringTag$2(Constructor, CONSTRUCTOR_NAME);

    if (!IS_WEAK) common.setStrong(Constructor, CONSTRUCTOR_NAME, IS_MAP);

    return Constructor;
  };

  var classof$4 = classofRaw$1$1;

  // `IsArray` abstract operation
  // https://tc39.es/ecma262/#sec-isarray
  // eslint-disable-next-line es/no-array-isarray -- safe
  var isArray$4 = Array.isArray || function isArray(argument) {
    return classof$4(argument) == 'Array';
  };

  var isArray$3 = isArray$4;
  var isConstructor$2 = isConstructor$4;
  var isObject$9 = isObject$k;
  var wellKnownSymbol$f = wellKnownSymbol$q;

  var SPECIES$6 = wellKnownSymbol$f('species');

  // a part of `ArraySpeciesCreate` abstract operation
  // https://tc39.es/ecma262/#sec-arrayspeciescreate
  var arraySpeciesConstructor$1$1 = function (originalArray) {
    var C;
    if (isArray$3(originalArray)) {
      C = originalArray.constructor;
      // cross-realm fallback
      if (isConstructor$2(C) && (C === Array || isArray$3(C.prototype))) C = undefined;
      else if (isObject$9(C)) {
        C = C[SPECIES$6];
        if (C === null) C = undefined;
      }
    } return C === undefined ? Array : C;
  };

  var arraySpeciesConstructor$2 = arraySpeciesConstructor$1$1;

  // `ArraySpeciesCreate` abstract operation
  // https://tc39.es/ecma262/#sec-arrayspeciescreate
  var arraySpeciesCreate$3 = function (originalArray, length) {
    return new (arraySpeciesConstructor$2(originalArray))(length === 0 ? 0 : length);
  };

  var bind$4 = functionBindContext;
  var IndexedObject$1 = indexedObject$1;
  var toObject$7 = toObject$a;
  var lengthOfArrayLike$5 = lengthOfArrayLike$8;
  var arraySpeciesCreate$2 = arraySpeciesCreate$3;

  var push = [].push;

  // `Array.prototype.{ forEach, map, filter, some, every, find, findIndex, filterReject }` methods implementation
  var createMethod$1 = function (TYPE) {
    var IS_MAP = TYPE == 1;
    var IS_FILTER = TYPE == 2;
    var IS_SOME = TYPE == 3;
    var IS_EVERY = TYPE == 4;
    var IS_FIND_INDEX = TYPE == 6;
    var IS_FILTER_REJECT = TYPE == 7;
    var NO_HOLES = TYPE == 5 || IS_FIND_INDEX;
    return function ($this, callbackfn, that, specificCreate) {
      var O = toObject$7($this);
      var self = IndexedObject$1(O);
      var boundFunction = bind$4(callbackfn, that, 3);
      var length = lengthOfArrayLike$5(self);
      var index = 0;
      var create = specificCreate || arraySpeciesCreate$2;
      var target = IS_MAP ? create($this, length) : IS_FILTER || IS_FILTER_REJECT ? create($this, 0) : undefined;
      var value, result;
      for (;length > index; index++) if (NO_HOLES || index in self) {
        value = self[index];
        result = boundFunction(value, index, O);
        if (TYPE) {
          if (IS_MAP) target[index] = result; // map
          else if (result) switch (TYPE) {
            case 3: return true;              // some
            case 5: return value;             // find
            case 6: return index;             // findIndex
            case 2: push.call(target, value); // filter
          } else switch (TYPE) {
            case 4: return false;             // every
            case 7: push.call(target, value); // filterReject
          }
        }
      }
      return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : target;
    };
  };

  var arrayIteration = {
    // `Array.prototype.forEach` method
    // https://tc39.es/ecma262/#sec-array.prototype.foreach
    forEach: createMethod$1(0),
    // `Array.prototype.map` method
    // https://tc39.es/ecma262/#sec-array.prototype.map
    map: createMethod$1(1),
    // `Array.prototype.filter` method
    // https://tc39.es/ecma262/#sec-array.prototype.filter
    filter: createMethod$1(2),
    // `Array.prototype.some` method
    // https://tc39.es/ecma262/#sec-array.prototype.some
    some: createMethod$1(3),
    // `Array.prototype.every` method
    // https://tc39.es/ecma262/#sec-array.prototype.every
    every: createMethod$1(4),
    // `Array.prototype.find` method
    // https://tc39.es/ecma262/#sec-array.prototype.find
    find: createMethod$1(5),
    // `Array.prototype.findIndex` method
    // https://tc39.es/ecma262/#sec-array.prototype.findIndex
    findIndex: createMethod$1(6),
    // `Array.prototype.filterReject` method
    // https://github.com/tc39/proposal-array-filtering
    filterReject: createMethod$1(7)
  };

  var redefineAll$3 = redefineAll$4;
  var getWeakData = internalMetadata.exports.getWeakData;
  var anObject$b = anObject$l;
  var isObject$8 = isObject$k;
  var anInstance$2 = anInstance$4;
  var iterate$2 = iterate$4;
  var ArrayIterationModule = arrayIteration;
  var hasOwn$4$1 = hasOwnProperty_1$1;
  var InternalStateModule$4 = internalState$1;

  var setInternalState$4 = InternalStateModule$4.set;
  var internalStateGetterFor$1 = InternalStateModule$4.getterFor;
  var find = ArrayIterationModule.find;
  var findIndex = ArrayIterationModule.findIndex;
  var id$3 = 0;

  // fallback for uncaught frozen keys
  var uncaughtFrozenStore = function (store) {
    return store.frozen || (store.frozen = new UncaughtFrozenStore());
  };

  var UncaughtFrozenStore = function () {
    this.entries = [];
  };

  var findUncaughtFrozen = function (store, key) {
    return find(store.entries, function (it) {
      return it[0] === key;
    });
  };

  UncaughtFrozenStore.prototype = {
    get: function (key) {
      var entry = findUncaughtFrozen(this, key);
      if (entry) return entry[1];
    },
    has: function (key) {
      return !!findUncaughtFrozen(this, key);
    },
    set: function (key, value) {
      var entry = findUncaughtFrozen(this, key);
      if (entry) entry[1] = value;
      else this.entries.push([key, value]);
    },
    'delete': function (key) {
      var index = findIndex(this.entries, function (it) {
        return it[0] === key;
      });
      if (~index) this.entries.splice(index, 1);
      return !!~index;
    }
  };

  var collectionWeak$2 = {
    getConstructor: function (wrapper, CONSTRUCTOR_NAME, IS_MAP, ADDER) {
      var C = wrapper(function (that, iterable) {
        anInstance$2(that, C, CONSTRUCTOR_NAME);
        setInternalState$4(that, {
          type: CONSTRUCTOR_NAME,
          id: id$3++,
          frozen: undefined
        });
        if (iterable != undefined) iterate$2(iterable, that[ADDER], { that: that, AS_ENTRIES: IS_MAP });
      });

      var getInternalState = internalStateGetterFor$1(CONSTRUCTOR_NAME);

      var define = function (that, key, value) {
        var state = getInternalState(that);
        var data = getWeakData(anObject$b(key), true);
        if (data === true) uncaughtFrozenStore(state).set(key, value);
        else data[state.id] = value;
        return that;
      };

      redefineAll$3(C.prototype, {
        // `{ WeakMap, WeakSet }.prototype.delete(key)` methods
        // https://tc39.es/ecma262/#sec-weakmap.prototype.delete
        // https://tc39.es/ecma262/#sec-weakset.prototype.delete
        'delete': function (key) {
          var state = getInternalState(this);
          if (!isObject$8(key)) return false;
          var data = getWeakData(key);
          if (data === true) return uncaughtFrozenStore(state)['delete'](key);
          return data && hasOwn$4$1(data, state.id) && delete data[state.id];
        },
        // `{ WeakMap, WeakSet }.prototype.has(key)` methods
        // https://tc39.es/ecma262/#sec-weakmap.prototype.has
        // https://tc39.es/ecma262/#sec-weakset.prototype.has
        has: function has(key) {
          var state = getInternalState(this);
          if (!isObject$8(key)) return false;
          var data = getWeakData(key);
          if (data === true) return uncaughtFrozenStore(state).has(key);
          return data && hasOwn$4$1(data, state.id);
        }
      });

      redefineAll$3(C.prototype, IS_MAP ? {
        // `WeakMap.prototype.get(key)` method
        // https://tc39.es/ecma262/#sec-weakmap.prototype.get
        get: function get(key) {
          var state = getInternalState(this);
          if (isObject$8(key)) {
            var data = getWeakData(key);
            if (data === true) return uncaughtFrozenStore(state).get(key);
            return data ? data[state.id] : undefined;
          }
        },
        // `WeakMap.prototype.set(key, value)` method
        // https://tc39.es/ecma262/#sec-weakmap.prototype.set
        set: function set(key, value) {
          return define(this, key, value);
        }
      } : {
        // `WeakSet.prototype.add(value)` method
        // https://tc39.es/ecma262/#sec-weakset.prototype.add
        add: function add(value) {
          return define(this, value, true);
        }
      });

      return C;
    }
  };

  var global$h = global$t;
  var redefineAll$2 = redefineAll$4;
  var InternalMetadataModule = internalMetadata.exports;
  var collection$2 = collection$3;
  var collectionWeak$1 = collectionWeak$2;
  var isObject$7$1 = isObject$k;
  var enforceIternalState = internalState$1.enforce;
  var NATIVE_WEAK_MAP$2 = nativeWeakMap$1;

  var IS_IE11 = !global$h.ActiveXObject && 'ActiveXObject' in global$h;
  // eslint-disable-next-line es/no-object-isextensible -- safe
  var isExtensible = Object.isExtensible;
  var InternalWeakMap;

  var wrapper = function (init) {
    return function WeakMap() {
      return init(this, arguments.length ? arguments[0] : undefined);
    };
  };

  // `WeakMap` constructor
  // https://tc39.es/ecma262/#sec-weakmap-constructor
  var $WeakMap = collection$2('WeakMap', wrapper, collectionWeak$1);

  // IE11 WeakMap frozen keys fix
  // We can't use feature detection because it crash some old IE builds
  // https://github.com/zloirock/core-js/issues/485
  if (NATIVE_WEAK_MAP$2 && IS_IE11) {
    InternalWeakMap = collectionWeak$1.getConstructor(wrapper, 'WeakMap', true);
    InternalMetadataModule.enable();
    var WeakMapPrototype = $WeakMap.prototype;
    var nativeDelete = WeakMapPrototype['delete'];
    var nativeHas = WeakMapPrototype.has;
    var nativeGet = WeakMapPrototype.get;
    var nativeSet = WeakMapPrototype.set;
    redefineAll$2(WeakMapPrototype, {
      'delete': function (key) {
        if (isObject$7$1(key) && !isExtensible(key)) {
          var state = enforceIternalState(this);
          if (!state.frozen) state.frozen = new InternalWeakMap();
          return nativeDelete.call(this, key) || state.frozen['delete'](key);
        } return nativeDelete.call(this, key);
      },
      has: function has(key) {
        if (isObject$7$1(key) && !isExtensible(key)) {
          var state = enforceIternalState(this);
          if (!state.frozen) state.frozen = new InternalWeakMap();
          return nativeHas.call(this, key) || state.frozen.has(key);
        } return nativeHas.call(this, key);
      },
      get: function get(key) {
        if (isObject$7$1(key) && !isExtensible(key)) {
          var state = enforceIternalState(this);
          if (!state.frozen) state.frozen = new InternalWeakMap();
          return nativeHas.call(this, key) ? nativeGet.call(this, key) : state.frozen.get(key);
        } return nativeGet.call(this, key);
      },
      set: function set(key, value) {
        if (isObject$7$1(key) && !isExtensible(key)) {
          var state = enforceIternalState(this);
          if (!state.frozen) state.frozen = new InternalWeakMap();
          nativeHas.call(this, key) ? nativeSet.call(this, key, value) : state.frozen.set(key, value);
        } else nativeSet.call(this, key, value);
        return this;
      }
    });
  }

  // iterable DOM collections
  // flag - `iterable` interface - 'entries', 'keys', 'values', 'forEach' methods
  var domIterables = {
    CSSRuleList: 0,
    CSSStyleDeclaration: 0,
    CSSValueList: 0,
    ClientRectList: 0,
    DOMRectList: 0,
    DOMStringList: 0,
    DOMTokenList: 1,
    DataTransferItemList: 0,
    FileList: 0,
    HTMLAllCollection: 0,
    HTMLCollection: 0,
    HTMLFormElement: 0,
    HTMLSelectElement: 0,
    MediaList: 0,
    MimeTypeArray: 0,
    NamedNodeMap: 0,
    NodeList: 1,
    PaintRequestList: 0,
    Plugin: 0,
    PluginArray: 0,
    SVGLengthList: 0,
    SVGNumberList: 0,
    SVGPathSegList: 0,
    SVGPointList: 0,
    SVGStringList: 0,
    SVGTransformList: 0,
    SourceBufferList: 0,
    StyleSheetList: 0,
    TextTrackCueList: 0,
    TextTrackList: 0,
    TouchList: 0
  };

  // in old WebKit versions, `element.classList` is not an instance of global `DOMTokenList`
  var documentCreateElement$3 = documentCreateElement$2;

  var classList = documentCreateElement$3('span').classList;
  var DOMTokenListPrototype$2 = classList && classList.constructor && classList.constructor.prototype;

  var domTokenListPrototype = DOMTokenListPrototype$2 === Object.prototype ? undefined : DOMTokenListPrototype$2;

  var global$g = global$t;
  var DOMIterables$1 = domIterables;
  var DOMTokenListPrototype$1 = domTokenListPrototype;
  var ArrayIteratorMethods = es_array_iterator;
  var createNonEnumerableProperty$3$1 = createNonEnumerableProperty$8;
  var wellKnownSymbol$e = wellKnownSymbol$q;

  var ITERATOR = wellKnownSymbol$e('iterator');
  var TO_STRING_TAG$4 = wellKnownSymbol$e('toStringTag');
  var ArrayValues = ArrayIteratorMethods.values;

  var handlePrototype$1 = function (CollectionPrototype, COLLECTION_NAME) {
    if (CollectionPrototype) {
      // some Chrome versions have non-configurable methods on DOMTokenList
      if (CollectionPrototype[ITERATOR] !== ArrayValues) try {
        createNonEnumerableProperty$3$1(CollectionPrototype, ITERATOR, ArrayValues);
      } catch (error) {
        CollectionPrototype[ITERATOR] = ArrayValues;
      }
      if (!CollectionPrototype[TO_STRING_TAG$4]) {
        createNonEnumerableProperty$3$1(CollectionPrototype, TO_STRING_TAG$4, COLLECTION_NAME);
      }
      if (DOMIterables$1[COLLECTION_NAME]) for (var METHOD_NAME in ArrayIteratorMethods) {
        // some Chrome versions have non-configurable methods on DOMTokenList
        if (CollectionPrototype[METHOD_NAME] !== ArrayIteratorMethods[METHOD_NAME]) try {
          createNonEnumerableProperty$3$1(CollectionPrototype, METHOD_NAME, ArrayIteratorMethods[METHOD_NAME]);
        } catch (error) {
          CollectionPrototype[METHOD_NAME] = ArrayIteratorMethods[METHOD_NAME];
        }
      }
    }
  };

  for (var COLLECTION_NAME$1 in DOMIterables$1) {
    handlePrototype$1(global$g[COLLECTION_NAME$1] && global$g[COLLECTION_NAME$1].prototype, COLLECTION_NAME$1);
  }

  handlePrototype$1(DOMTokenListPrototype$1, 'DOMTokenList');

  function _isNativeFunction(fn) {
    return Function.toString.call(fn).indexOf("[native code]") !== -1;
  }

  function _isNativeReflectConstruct$v() {
    if (typeof Reflect === "undefined" || !Reflect.construct) return false;
    if (Reflect.construct.sham) return false;
    if (typeof Proxy === "function") return true;

    try {
      Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
      return true;
    } catch (e) {
      return false;
    }
  }

  function _construct(Parent, args, Class) {
    if (_isNativeReflectConstruct$v()) {
      _construct = Reflect.construct;
    } else {
      _construct = function _construct(Parent, args, Class) {
        var a = [null];
        a.push.apply(a, args);
        var Constructor = Function.bind.apply(Parent, a);
        var instance = new Constructor();
        if (Class) _setPrototypeOf$1(instance, Class.prototype);
        return instance;
      };
    }

    return _construct.apply(null, arguments);
  }

  function _wrapNativeSuper(Class) {
    var _cache = typeof Map === "function" ? new Map() : undefined;

    _wrapNativeSuper = function _wrapNativeSuper(Class) {
      if (Class === null || !_isNativeFunction(Class)) return Class;

      if (typeof Class !== "function") {
        throw new TypeError("Super expression must either be null or a function");
      }

      if (typeof _cache !== "undefined") {
        if (_cache.has(Class)) return _cache.get(Class);

        _cache.set(Class, Wrapper);
      }

      function Wrapper() {
        return _construct(Class, arguments, _getPrototypeOf$1(this).constructor);
      }

      Wrapper.prototype = Object.create(Class.prototype, {
        constructor: {
          value: Wrapper,
          enumerable: false,
          writable: true,
          configurable: true
        }
      });
      return _setPrototypeOf$1(Wrapper, Class);
    };

    return _wrapNativeSuper(Class);
  }

  function _createSuper$u(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$u(); return function _createSuperInternal() { var Super = _getPrototypeOf$1(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf$1(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn$1(this, result); }; }

  function _isNativeReflectConstruct$u() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

  var NotFoundError = /*#__PURE__*/function (_Error) {
    _inherits$1(NotFoundError, _Error);

    var _super = _createSuper$u(NotFoundError);

    function NotFoundError(message) {
      _classCallCheck$1(this, NotFoundError);

      return _super.call(this, message);
    }

    return NotFoundError;
  }( /*#__PURE__*/_wrapNativeSuper(Error));

  function _superPropBase(object, property) {
    while (!Object.prototype.hasOwnProperty.call(object, property)) {
      object = _getPrototypeOf$1(object);
      if (object === null) break;
    }

    return object;
  }

  function _get(target, property, receiver) {
    if (typeof Reflect !== "undefined" && Reflect.get) {
      _get = Reflect.get;
    } else {
      _get = function _get(target, property, receiver) {
        var base = _superPropBase(target, property);
        if (!base) return;
        var desc = Object.getOwnPropertyDescriptor(base, property);

        if (desc.get) {
          return desc.get.call(receiver);
        }

        return desc.value;
      };
    }

    return _get(target, property, receiver || target);
  }

  var toPropertyKey$1$1 = toPropertyKey$4;
  var definePropertyModule$2$1 = objectDefineProperty$1;
  var createPropertyDescriptor$1$1 = createPropertyDescriptor$5;

  var createProperty$5 = function (object, key, value) {
    var propertyKey = toPropertyKey$1$1(key);
    if (propertyKey in object) definePropertyModule$2$1.f(object, propertyKey, createPropertyDescriptor$1$1(0, value));
    else object[propertyKey] = value;
  };

  var fails$i = fails$u;
  var wellKnownSymbol$d = wellKnownSymbol$q;
  var V8_VERSION$2$1 = engineV8Version$1;

  var SPECIES$5 = wellKnownSymbol$d('species');

  var arrayMethodHasSpeciesSupport$5 = function (METHOD_NAME) {
    // We can't use this feature detection in V8 since it causes
    // deoptimization and serious performance degradation
    // https://github.com/zloirock/core-js/issues/677
    return V8_VERSION$2$1 >= 51 || !fails$i(function () {
      var array = [];
      var constructor = array.constructor = {};
      constructor[SPECIES$5] = function () {
        return { foo: 1 };
      };
      return array[METHOD_NAME](Boolean).foo !== 1;
    });
  };

  var $$n = _export$1;
  var fails$h = fails$u;
  var isArray$2$1 = isArray$4;
  var isObject$6$1 = isObject$k;
  var toObject$6 = toObject$a;
  var lengthOfArrayLike$4 = lengthOfArrayLike$8;
  var createProperty$4 = createProperty$5;
  var arraySpeciesCreate$1$1 = arraySpeciesCreate$3;
  var arrayMethodHasSpeciesSupport$4 = arrayMethodHasSpeciesSupport$5;
  var wellKnownSymbol$c = wellKnownSymbol$q;
  var V8_VERSION$1$1 = engineV8Version$1;

  var IS_CONCAT_SPREADABLE$1 = wellKnownSymbol$c('isConcatSpreadable');
  var MAX_SAFE_INTEGER$1 = 0x1FFFFFFFFFFFFF;
  var MAXIMUM_ALLOWED_INDEX_EXCEEDED$1 = 'Maximum allowed index exceeded';

  // We can't use this feature detection in V8 since it causes
  // deoptimization and serious performance degradation
  // https://github.com/zloirock/core-js/issues/679
  var IS_CONCAT_SPREADABLE_SUPPORT$1 = V8_VERSION$1$1 >= 51 || !fails$h(function () {
    var array = [];
    array[IS_CONCAT_SPREADABLE$1] = false;
    return array.concat()[0] !== array;
  });

  var SPECIES_SUPPORT$1 = arrayMethodHasSpeciesSupport$4('concat');

  var isConcatSpreadable$1 = function (O) {
    if (!isObject$6$1(O)) return false;
    var spreadable = O[IS_CONCAT_SPREADABLE$1];
    return spreadable !== undefined ? !!spreadable : isArray$2$1(O);
  };

  var FORCED$4 = !IS_CONCAT_SPREADABLE_SUPPORT$1 || !SPECIES_SUPPORT$1;

  // `Array.prototype.concat` method
  // https://tc39.es/ecma262/#sec-array.prototype.concat
  // with adding support of @@isConcatSpreadable and @@species
  $$n({ target: 'Array', proto: true, forced: FORCED$4 }, {
    // eslint-disable-next-line no-unused-vars -- required for `.length`
    concat: function concat(arg) {
      var O = toObject$6(this);
      var A = arraySpeciesCreate$1$1(O, 0);
      var n = 0;
      var i, k, length, len, E;
      for (i = -1, length = arguments.length; i < length; i++) {
        E = i === -1 ? O : arguments[i];
        if (isConcatSpreadable$1(E)) {
          len = lengthOfArrayLike$4(E);
          if (n + len > MAX_SAFE_INTEGER$1) throw TypeError(MAXIMUM_ALLOWED_INDEX_EXCEEDED$1);
          for (k = 0; k < len; k++, n++) if (k in E) createProperty$4(A, n, E[k]);
        } else {
          if (n >= MAX_SAFE_INTEGER$1) throw TypeError(MAXIMUM_ALLOWED_INDEX_EXCEEDED$1);
          createProperty$4(A, n++, E);
        }
      }
      A.length = n;
      return A;
    }
  });

  var anObject$a = anObject$l;

  // `RegExp.prototype.flags` getter implementation
  // https://tc39.es/ecma262/#sec-get-regexp.prototype.flags
  var regexpFlags$1 = function () {
    var that = anObject$a(this);
    var result = '';
    if (that.global) result += 'g';
    if (that.ignoreCase) result += 'i';
    if (that.multiline) result += 'm';
    if (that.dotAll) result += 's';
    if (that.unicode) result += 'u';
    if (that.sticky) result += 'y';
    return result;
  };

  var PROPER_FUNCTION_NAME$1 = functionName$1.PROPER;
  var redefine$6 = redefine$d.exports;
  var anObject$9 = anObject$l;
  var $toString$1 = toString$c;
  var fails$g = fails$u;
  var flags = regexpFlags$1;

  var TO_STRING = 'toString';
  var RegExpPrototype$3 = RegExp.prototype;
  var nativeToString = RegExpPrototype$3[TO_STRING];

  var NOT_GENERIC = fails$g(function () { return nativeToString.call({ source: 'a', flags: 'b' }) != '/a/b'; });
  // FF44- RegExp#toString has a wrong name
  var INCORRECT_NAME = PROPER_FUNCTION_NAME$1 && nativeToString.name != TO_STRING;

  // `RegExp.prototype.toString` method
  // https://tc39.es/ecma262/#sec-regexp.prototype.tostring
  if (NOT_GENERIC || INCORRECT_NAME) {
    redefine$6(RegExp.prototype, TO_STRING, function toString() {
      var R = anObject$9(this);
      var p = $toString$1(R.source);
      var rf = R.flags;
      var f = $toString$1(rf === undefined && R instanceof RegExp && !('flags' in RegExpPrototype$3) ? flags.call(R) : rf);
      return '/' + p + '/' + f;
    }, { unsafe: true });
  }

  var global$f = global$t;

  var nativePromiseConstructor = global$f.Promise;

  var getBuiltIn$3$1 = getBuiltIn$a;
  var definePropertyModule$1$1 = objectDefineProperty$1;
  var wellKnownSymbol$b = wellKnownSymbol$q;
  var DESCRIPTORS$7 = descriptors$1;

  var SPECIES$4 = wellKnownSymbol$b('species');

  var setSpecies$3 = function (CONSTRUCTOR_NAME) {
    var Constructor = getBuiltIn$3$1(CONSTRUCTOR_NAME);
    var defineProperty = definePropertyModule$1$1.f;

    if (DESCRIPTORS$7 && Constructor && !Constructor[SPECIES$4]) {
      defineProperty(Constructor, SPECIES$4, {
        configurable: true,
        get: function () { return this; }
      });
    }
  };

  var anObject$8 = anObject$l;
  var aConstructor = aConstructor$2;
  var wellKnownSymbol$a = wellKnownSymbol$q;

  var SPECIES$3 = wellKnownSymbol$a('species');

  // `SpeciesConstructor` abstract operation
  // https://tc39.es/ecma262/#sec-speciesconstructor
  var speciesConstructor$4 = function (O, defaultConstructor) {
    var C = anObject$8(O).constructor;
    var S;
    return C === undefined || (S = anObject$8(C)[SPECIES$3]) == undefined ? defaultConstructor : aConstructor(S);
  };

  var userAgent$4 = engineUserAgent$1;

  var engineIsIos = /(?:ipad|iphone|ipod).*applewebkit/i.test(userAgent$4);

  var classof$3$1 = classofRaw$1$1;
  var global$e = global$t;

  var engineIsNode = classof$3$1(global$e.process) == 'process';

  var global$d = global$t;
  var isCallable$6$1 = isCallable$o;
  var fails$f = fails$u;
  var bind$3 = functionBindContext;
  var html = html$2;
  var createElement$2 = documentCreateElement$2;
  var IS_IOS$1 = engineIsIos;
  var IS_NODE$2 = engineIsNode;

  var set$2 = global$d.setImmediate;
  var clear = global$d.clearImmediate;
  var process$2 = global$d.process;
  var MessageChannel = global$d.MessageChannel;
  var Dispatch = global$d.Dispatch;
  var counter = 0;
  var queue = {};
  var ONREADYSTATECHANGE = 'onreadystatechange';
  var location, defer, channel, port;

  try {
    // Deno throws a ReferenceError on `location` access without `--location` flag
    location = global$d.location;
  } catch (error) { /* empty */ }

  var run = function (id) {
    // eslint-disable-next-line no-prototype-builtins -- safe
    if (queue.hasOwnProperty(id)) {
      var fn = queue[id];
      delete queue[id];
      fn();
    }
  };

  var runner = function (id) {
    return function () {
      run(id);
    };
  };

  var listener = function (event) {
    run(event.data);
  };

  var post = function (id) {
    // old engines have not location.origin
    global$d.postMessage(String(id), location.protocol + '//' + location.host);
  };

  // Node.js 0.9+ & IE10+ has setImmediate, otherwise:
  if (!set$2 || !clear) {
    set$2 = function setImmediate(fn) {
      var args = [];
      var argumentsLength = arguments.length;
      var i = 1;
      while (argumentsLength > i) args.push(arguments[i++]);
      queue[++counter] = function () {
        // eslint-disable-next-line no-new-func -- spec requirement
        (isCallable$6$1(fn) ? fn : Function(fn)).apply(undefined, args);
      };
      defer(counter);
      return counter;
    };
    clear = function clearImmediate(id) {
      delete queue[id];
    };
    // Node.js 0.8-
    if (IS_NODE$2) {
      defer = function (id) {
        process$2.nextTick(runner(id));
      };
    // Sphere (JS game engine) Dispatch API
    } else if (Dispatch && Dispatch.now) {
      defer = function (id) {
        Dispatch.now(runner(id));
      };
    // Browsers with MessageChannel, includes WebWorkers
    // except iOS - https://github.com/zloirock/core-js/issues/624
    } else if (MessageChannel && !IS_IOS$1) {
      channel = new MessageChannel();
      port = channel.port2;
      channel.port1.onmessage = listener;
      defer = bind$3(port.postMessage, port, 1);
    // Browsers with postMessage, skip WebWorkers
    // IE8 has postMessage, but it's sync & typeof its postMessage is 'object'
    } else if (
      global$d.addEventListener &&
      isCallable$6$1(global$d.postMessage) &&
      !global$d.importScripts &&
      location && location.protocol !== 'file:' &&
      !fails$f(post)
    ) {
      defer = post;
      global$d.addEventListener('message', listener, false);
    // IE8-
    } else if (ONREADYSTATECHANGE in createElement$2('script')) {
      defer = function (id) {
        html.appendChild(createElement$2('script'))[ONREADYSTATECHANGE] = function () {
          html.removeChild(this);
          run(id);
        };
      };
    // Rest old browsers
    } else {
      defer = function (id) {
        setTimeout(runner(id), 0);
      };
    }
  }

  var task$1 = {
    set: set$2,
    clear: clear
  };

  var userAgent$3 = engineUserAgent$1;
  var global$c = global$t;

  var engineIsIosPebble = /ipad|iphone|ipod/i.test(userAgent$3) && global$c.Pebble !== undefined;

  var userAgent$2 = engineUserAgent$1;

  var engineIsWebosWebkit = /web0s(?!.*chrome)/i.test(userAgent$2);

  var global$b$1 = global$t;
  var getOwnPropertyDescriptor$3 = objectGetOwnPropertyDescriptor$1.f;
  var macrotask = task$1.set;
  var IS_IOS = engineIsIos;
  var IS_IOS_PEBBLE = engineIsIosPebble;
  var IS_WEBOS_WEBKIT = engineIsWebosWebkit;
  var IS_NODE$1 = engineIsNode;

  var MutationObserver = global$b$1.MutationObserver || global$b$1.WebKitMutationObserver;
  var document$2 = global$b$1.document;
  var process$1 = global$b$1.process;
  var Promise$1 = global$b$1.Promise;
  // Node.js 11 shows ExperimentalWarning on getting `queueMicrotask`
  var queueMicrotaskDescriptor = getOwnPropertyDescriptor$3(global$b$1, 'queueMicrotask');
  var queueMicrotask = queueMicrotaskDescriptor && queueMicrotaskDescriptor.value;

  var flush, head, last, notify$1, toggle, node, promise, then;

  // modern engines have queueMicrotask method
  if (!queueMicrotask) {
    flush = function () {
      var parent, fn;
      if (IS_NODE$1 && (parent = process$1.domain)) parent.exit();
      while (head) {
        fn = head.fn;
        head = head.next;
        try {
          fn();
        } catch (error) {
          if (head) notify$1();
          else last = undefined;
          throw error;
        }
      } last = undefined;
      if (parent) parent.enter();
    };

    // browsers with MutationObserver, except iOS - https://github.com/zloirock/core-js/issues/339
    // also except WebOS Webkit https://github.com/zloirock/core-js/issues/898
    if (!IS_IOS && !IS_NODE$1 && !IS_WEBOS_WEBKIT && MutationObserver && document$2) {
      toggle = true;
      node = document$2.createTextNode('');
      new MutationObserver(flush).observe(node, { characterData: true });
      notify$1 = function () {
        node.data = toggle = !toggle;
      };
    // environments with maybe non-completely correct, but existent Promise
    } else if (!IS_IOS_PEBBLE && Promise$1 && Promise$1.resolve) {
      // Promise.resolve without an argument throws an error in LG WebOS 2
      promise = Promise$1.resolve(undefined);
      // workaround of WebKit ~ iOS Safari 10.1 bug
      promise.constructor = Promise$1;
      then = promise.then;
      notify$1 = function () {
        then.call(promise, flush);
      };
    // Node.js without promises
    } else if (IS_NODE$1) {
      notify$1 = function () {
        process$1.nextTick(flush);
      };
    // for other environments - macrotask based on:
    // - setImmediate
    // - MessageChannel
    // - window.postMessag
    // - onreadystatechange
    // - setTimeout
    } else {
      notify$1 = function () {
        // strange IE + webpack dev server bug - use .call(global)
        macrotask.call(global$b$1, flush);
      };
    }
  }

  var microtask$1 = queueMicrotask || function (fn) {
    var task = { fn: fn, next: undefined };
    if (last) last.next = task;
    if (!head) {
      head = task;
      notify$1();
    } last = task;
  };

  var newPromiseCapability$2 = {};

  var aCallable$2 = aCallable$7;

  var PromiseCapability = function (C) {
    var resolve, reject;
    this.promise = new C(function ($$resolve, $$reject) {
      if (resolve !== undefined || reject !== undefined) throw TypeError('Bad Promise constructor');
      resolve = $$resolve;
      reject = $$reject;
    });
    this.resolve = aCallable$2(resolve);
    this.reject = aCallable$2(reject);
  };

  // `NewPromiseCapability` abstract operation
  // https://tc39.es/ecma262/#sec-newpromisecapability
  newPromiseCapability$2.f = function (C) {
    return new PromiseCapability(C);
  };

  var anObject$7 = anObject$l;
  var isObject$5$1 = isObject$k;
  var newPromiseCapability$1 = newPromiseCapability$2;

  var promiseResolve$2 = function (C, x) {
    anObject$7(C);
    if (isObject$5$1(x) && x.constructor === C) return x;
    var promiseCapability = newPromiseCapability$1.f(C);
    var resolve = promiseCapability.resolve;
    resolve(x);
    return promiseCapability.promise;
  };

  var global$a$1 = global$t;

  var hostReportErrors$1 = function (a, b) {
    var console = global$a$1.console;
    if (console && console.error) {
      arguments.length === 1 ? console.error(a) : console.error(a, b);
    }
  };

  var perform$1 = function (exec) {
    try {
      return { error: false, value: exec() };
    } catch (error) {
      return { error: true, value: error };
    }
  };

  var engineIsBrowser = typeof window == 'object';

  var $$m = _export$1;
  var global$9$1 = global$t;
  var getBuiltIn$2$1 = getBuiltIn$a;
  var NativePromise$1 = nativePromiseConstructor;
  var redefine$5 = redefine$d.exports;
  var redefineAll$1 = redefineAll$4;
  var setPrototypeOf = objectSetPrototypeOf;
  var setToStringTag$1 = setToStringTag$5;
  var setSpecies$2 = setSpecies$3;
  var aCallable$1$1 = aCallable$7;
  var isCallable$5$1 = isCallable$o;
  var isObject$4$1 = isObject$k;
  var anInstance$1 = anInstance$4;
  var inspectSource$5 = inspectSource$4;
  var iterate$1 = iterate$4;
  var checkCorrectnessOfIteration$1 = checkCorrectnessOfIteration$3;
  var speciesConstructor$3 = speciesConstructor$4;
  var task = task$1.set;
  var microtask = microtask$1;
  var promiseResolve$1 = promiseResolve$2;
  var hostReportErrors = hostReportErrors$1;
  var newPromiseCapabilityModule = newPromiseCapability$2;
  var perform = perform$1;
  var InternalStateModule$3 = internalState$1;
  var isForced$1$1 = isForced_1$1;
  var wellKnownSymbol$9 = wellKnownSymbol$q;
  var IS_BROWSER = engineIsBrowser;
  var IS_NODE = engineIsNode;
  var V8_VERSION$4 = engineV8Version$1;

  var SPECIES$2 = wellKnownSymbol$9('species');
  var PROMISE = 'Promise';
  var getInternalState$3 = InternalStateModule$3.get;
  var setInternalState$3 = InternalStateModule$3.set;
  var getInternalPromiseState = InternalStateModule$3.getterFor(PROMISE);
  var NativePromisePrototype = NativePromise$1 && NativePromise$1.prototype;
  var PromiseConstructor = NativePromise$1;
  var PromiseConstructorPrototype = NativePromisePrototype;
  var TypeError$1 = global$9$1.TypeError;
  var document$1$1 = global$9$1.document;
  var process$4 = global$9$1.process;
  var newPromiseCapability = newPromiseCapabilityModule.f;
  var newGenericPromiseCapability = newPromiseCapability;
  var DISPATCH_EVENT = !!(document$1$1 && document$1$1.createEvent && global$9$1.dispatchEvent);
  var NATIVE_REJECTION_EVENT = isCallable$5$1(global$9$1.PromiseRejectionEvent);
  var UNHANDLED_REJECTION = 'unhandledrejection';
  var REJECTION_HANDLED = 'rejectionhandled';
  var PENDING = 0;
  var FULFILLED = 1;
  var REJECTED = 2;
  var HANDLED = 1;
  var UNHANDLED = 2;
  var SUBCLASSING = false;
  var Internal, OwnPromiseCapability, PromiseWrapper, nativeThen;

  var FORCED$3 = isForced$1$1(PROMISE, function () {
    var PROMISE_CONSTRUCTOR_SOURCE = inspectSource$5(PromiseConstructor);
    var GLOBAL_CORE_JS_PROMISE = PROMISE_CONSTRUCTOR_SOURCE !== String(PromiseConstructor);
    // V8 6.6 (Node 10 and Chrome 66) have a bug with resolving custom thenables
    // https://bugs.chromium.org/p/chromium/issues/detail?id=830565
    // We can't detect it synchronously, so just check versions
    if (!GLOBAL_CORE_JS_PROMISE && V8_VERSION$4 === 66) return true;
    // We can't use @@species feature detection in V8 since it causes
    // deoptimization and performance degradation
    // https://github.com/zloirock/core-js/issues/679
    if (V8_VERSION$4 >= 51 && /native code/.test(PROMISE_CONSTRUCTOR_SOURCE)) return false;
    // Detect correctness of subclassing with @@species support
    var promise = new PromiseConstructor(function (resolve) { resolve(1); });
    var FakePromise = function (exec) {
      exec(function () { /* empty */ }, function () { /* empty */ });
    };
    var constructor = promise.constructor = {};
    constructor[SPECIES$2] = FakePromise;
    SUBCLASSING = promise.then(function () { /* empty */ }) instanceof FakePromise;
    if (!SUBCLASSING) return true;
    // Unhandled rejections tracking support, NodeJS Promise without it fails @@species test
    return !GLOBAL_CORE_JS_PROMISE && IS_BROWSER && !NATIVE_REJECTION_EVENT;
  });

  var INCORRECT_ITERATION$1 = FORCED$3 || !checkCorrectnessOfIteration$1(function (iterable) {
    PromiseConstructor.all(iterable)['catch'](function () { /* empty */ });
  });

  // helpers
  var isThenable = function (it) {
    var then;
    return isObject$4$1(it) && isCallable$5$1(then = it.then) ? then : false;
  };

  var notify = function (state, isReject) {
    if (state.notified) return;
    state.notified = true;
    var chain = state.reactions;
    microtask(function () {
      var value = state.value;
      var ok = state.state == FULFILLED;
      var index = 0;
      // variable length - can't use forEach
      while (chain.length > index) {
        var reaction = chain[index++];
        var handler = ok ? reaction.ok : reaction.fail;
        var resolve = reaction.resolve;
        var reject = reaction.reject;
        var domain = reaction.domain;
        var result, then, exited;
        try {
          if (handler) {
            if (!ok) {
              if (state.rejection === UNHANDLED) onHandleUnhandled(state);
              state.rejection = HANDLED;
            }
            if (handler === true) result = value;
            else {
              if (domain) domain.enter();
              result = handler(value); // can throw
              if (domain) {
                domain.exit();
                exited = true;
              }
            }
            if (result === reaction.promise) {
              reject(TypeError$1('Promise-chain cycle'));
            } else if (then = isThenable(result)) {
              then.call(result, resolve, reject);
            } else resolve(result);
          } else reject(value);
        } catch (error) {
          if (domain && !exited) domain.exit();
          reject(error);
        }
      }
      state.reactions = [];
      state.notified = false;
      if (isReject && !state.rejection) onUnhandled(state);
    });
  };

  var dispatchEvent = function (name, promise, reason) {
    var event, handler;
    if (DISPATCH_EVENT) {
      event = document$1$1.createEvent('Event');
      event.promise = promise;
      event.reason = reason;
      event.initEvent(name, false, true);
      global$9$1.dispatchEvent(event);
    } else event = { promise: promise, reason: reason };
    if (!NATIVE_REJECTION_EVENT && (handler = global$9$1['on' + name])) handler(event);
    else if (name === UNHANDLED_REJECTION) hostReportErrors('Unhandled promise rejection', reason);
  };

  var onUnhandled = function (state) {
    task.call(global$9$1, function () {
      var promise = state.facade;
      var value = state.value;
      var IS_UNHANDLED = isUnhandled(state);
      var result;
      if (IS_UNHANDLED) {
        result = perform(function () {
          if (IS_NODE) {
            process$4.emit('unhandledRejection', value, promise);
          } else dispatchEvent(UNHANDLED_REJECTION, promise, value);
        });
        // Browsers should not trigger `rejectionHandled` event if it was handled here, NodeJS - should
        state.rejection = IS_NODE || isUnhandled(state) ? UNHANDLED : HANDLED;
        if (result.error) throw result.value;
      }
    });
  };

  var isUnhandled = function (state) {
    return state.rejection !== HANDLED && !state.parent;
  };

  var onHandleUnhandled = function (state) {
    task.call(global$9$1, function () {
      var promise = state.facade;
      if (IS_NODE) {
        process$4.emit('rejectionHandled', promise);
      } else dispatchEvent(REJECTION_HANDLED, promise, state.value);
    });
  };

  var bind$2 = function (fn, state, unwrap) {
    return function (value) {
      fn(state, value, unwrap);
    };
  };

  var internalReject = function (state, value, unwrap) {
    if (state.done) return;
    state.done = true;
    if (unwrap) state = unwrap;
    state.value = value;
    state.state = REJECTED;
    notify(state, true);
  };

  var internalResolve = function (state, value, unwrap) {
    if (state.done) return;
    state.done = true;
    if (unwrap) state = unwrap;
    try {
      if (state.facade === value) throw TypeError$1("Promise can't be resolved itself");
      var then = isThenable(value);
      if (then) {
        microtask(function () {
          var wrapper = { done: false };
          try {
            then.call(value,
              bind$2(internalResolve, wrapper, state),
              bind$2(internalReject, wrapper, state)
            );
          } catch (error) {
            internalReject(wrapper, error, state);
          }
        });
      } else {
        state.value = value;
        state.state = FULFILLED;
        notify(state, false);
      }
    } catch (error) {
      internalReject({ done: false }, error, state);
    }
  };

  // constructor polyfill
  if (FORCED$3) {
    // 25.4.3.1 Promise(executor)
    PromiseConstructor = function Promise(executor) {
      anInstance$1(this, PromiseConstructor, PROMISE);
      aCallable$1$1(executor);
      Internal.call(this);
      var state = getInternalState$3(this);
      try {
        executor(bind$2(internalResolve, state), bind$2(internalReject, state));
      } catch (error) {
        internalReject(state, error);
      }
    };
    PromiseConstructorPrototype = PromiseConstructor.prototype;
    // eslint-disable-next-line no-unused-vars -- required for `.length`
    Internal = function Promise(executor) {
      setInternalState$3(this, {
        type: PROMISE,
        done: false,
        notified: false,
        parent: false,
        reactions: [],
        rejection: false,
        state: PENDING,
        value: undefined
      });
    };
    Internal.prototype = redefineAll$1(PromiseConstructorPrototype, {
      // `Promise.prototype.then` method
      // https://tc39.es/ecma262/#sec-promise.prototype.then
      then: function then(onFulfilled, onRejected) {
        var state = getInternalPromiseState(this);
        var reaction = newPromiseCapability(speciesConstructor$3(this, PromiseConstructor));
        reaction.ok = isCallable$5$1(onFulfilled) ? onFulfilled : true;
        reaction.fail = isCallable$5$1(onRejected) && onRejected;
        reaction.domain = IS_NODE ? process$4.domain : undefined;
        state.parent = true;
        state.reactions.push(reaction);
        if (state.state != PENDING) notify(state, false);
        return reaction.promise;
      },
      // `Promise.prototype.catch` method
      // https://tc39.es/ecma262/#sec-promise.prototype.catch
      'catch': function (onRejected) {
        return this.then(undefined, onRejected);
      }
    });
    OwnPromiseCapability = function () {
      var promise = new Internal();
      var state = getInternalState$3(promise);
      this.promise = promise;
      this.resolve = bind$2(internalResolve, state);
      this.reject = bind$2(internalReject, state);
    };
    newPromiseCapabilityModule.f = newPromiseCapability = function (C) {
      return C === PromiseConstructor || C === PromiseWrapper
        ? new OwnPromiseCapability(C)
        : newGenericPromiseCapability(C);
    };

    if (isCallable$5$1(NativePromise$1) && NativePromisePrototype !== Object.prototype) {
      nativeThen = NativePromisePrototype.then;

      if (!SUBCLASSING) {
        // make `Promise#then` return a polyfilled `Promise` for native promise-based APIs
        redefine$5(NativePromisePrototype, 'then', function then(onFulfilled, onRejected) {
          var that = this;
          return new PromiseConstructor(function (resolve, reject) {
            nativeThen.call(that, resolve, reject);
          }).then(onFulfilled, onRejected);
        // https://github.com/zloirock/core-js/issues/640
        }, { unsafe: true });

        // makes sure that native promise-based APIs `Promise#catch` properly works with patched `Promise#then`
        redefine$5(NativePromisePrototype, 'catch', PromiseConstructorPrototype['catch'], { unsafe: true });
      }

      // make `.constructor === Promise` work for native promise-based APIs
      try {
        delete NativePromisePrototype.constructor;
      } catch (error) { /* empty */ }

      // make `instanceof Promise` work for native promise-based APIs
      if (setPrototypeOf) {
        setPrototypeOf(NativePromisePrototype, PromiseConstructorPrototype);
      }
    }
  }

  $$m({ global: true, wrap: true, forced: FORCED$3 }, {
    Promise: PromiseConstructor
  });

  setToStringTag$1(PromiseConstructor, PROMISE, false);
  setSpecies$2(PROMISE);

  PromiseWrapper = getBuiltIn$2$1(PROMISE);

  // statics
  $$m({ target: PROMISE, stat: true, forced: FORCED$3 }, {
    // `Promise.reject` method
    // https://tc39.es/ecma262/#sec-promise.reject
    reject: function reject(r) {
      var capability = newPromiseCapability(this);
      capability.reject.call(undefined, r);
      return capability.promise;
    }
  });

  $$m({ target: PROMISE, stat: true, forced: FORCED$3 }, {
    // `Promise.resolve` method
    // https://tc39.es/ecma262/#sec-promise.resolve
    resolve: function resolve(x) {
      return promiseResolve$1(this, x);
    }
  });

  $$m({ target: PROMISE, stat: true, forced: INCORRECT_ITERATION$1 }, {
    // `Promise.all` method
    // https://tc39.es/ecma262/#sec-promise.all
    all: function all(iterable) {
      var C = this;
      var capability = newPromiseCapability(C);
      var resolve = capability.resolve;
      var reject = capability.reject;
      var result = perform(function () {
        var $promiseResolve = aCallable$1$1(C.resolve);
        var values = [];
        var counter = 0;
        var remaining = 1;
        iterate$1(iterable, function (promise) {
          var index = counter++;
          var alreadyCalled = false;
          values.push(undefined);
          remaining++;
          $promiseResolve.call(C, promise).then(function (value) {
            if (alreadyCalled) return;
            alreadyCalled = true;
            values[index] = value;
            --remaining || resolve(values);
          }, reject);
        });
        --remaining || resolve(values);
      });
      if (result.error) reject(result.value);
      return capability.promise;
    },
    // `Promise.race` method
    // https://tc39.es/ecma262/#sec-promise.race
    race: function race(iterable) {
      var C = this;
      var capability = newPromiseCapability(C);
      var reject = capability.reject;
      var result = perform(function () {
        var $promiseResolve = aCallable$1$1(C.resolve);
        iterate$1(iterable, function (promise) {
          $promiseResolve.call(C, promise).then(capability.resolve, reject);
        });
      });
      if (result.error) reject(result.value);
      return capability.promise;
    }
  });

  var regexpStickyHelpers = {};

  var fails$e = fails$u;
  var global$8$1 = global$t;

  // babel-minify and Closure Compiler transpiles RegExp('a', 'y') -> /a/y and it causes SyntaxError
  var $RegExp$2 = global$8$1.RegExp;

  regexpStickyHelpers.UNSUPPORTED_Y = fails$e(function () {
    var re = $RegExp$2('a', 'y');
    re.lastIndex = 2;
    return re.exec('abcd') != null;
  });

  regexpStickyHelpers.BROKEN_CARET = fails$e(function () {
    // https://bugzilla.mozilla.org/show_bug.cgi?id=773687
    var re = $RegExp$2('^r', 'gy');
    re.lastIndex = 2;
    return re.exec('str') != null;
  });

  var fails$d = fails$u;
  var global$7$1 = global$t;

  // babel-minify and Closure Compiler transpiles RegExp('.', 's') -> /./s and it causes SyntaxError
  var $RegExp$1 = global$7$1.RegExp;

  var regexpUnsupportedDotAll = fails$d(function () {
    var re = $RegExp$1('.', 's');
    return !(re.dotAll && re.exec('\n') && re.flags === 's');
  });

  var fails$c = fails$u;
  var global$6$1 = global$t;

  // babel-minify and Closure Compiler transpiles RegExp('(?<a>b)', 'g') -> /(?<a>b)/g and it causes SyntaxError
  var $RegExp = global$6$1.RegExp;

  var regexpUnsupportedNcg = fails$c(function () {
    var re = $RegExp('(?<a>b)', 'g');
    return re.exec('b').groups.a !== 'b' ||
      'b'.replace(re, '$<a>c') !== 'bc';
  });

  /* eslint-disable regexp/no-empty-capturing-group, regexp/no-empty-group, regexp/no-lazy-ends -- testing */
  /* eslint-disable regexp/no-useless-quantifier -- testing */
  var toString$8 = toString$c;
  var regexpFlags = regexpFlags$1;
  var stickyHelpers$2 = regexpStickyHelpers;
  var shared$1$1 = shared$5.exports;
  var create$1 = objectCreate;
  var getInternalState$2 = internalState$1.get;
  var UNSUPPORTED_DOT_ALL$1 = regexpUnsupportedDotAll;
  var UNSUPPORTED_NCG$1 = regexpUnsupportedNcg;

  var nativeExec = RegExp.prototype.exec;
  var nativeReplace = shared$1$1('native-string-replace', String.prototype.replace);

  var patchedExec = nativeExec;

  var UPDATES_LAST_INDEX_WRONG = (function () {
    var re1 = /a/;
    var re2 = /b*/g;
    nativeExec.call(re1, 'a');
    nativeExec.call(re2, 'a');
    return re1.lastIndex !== 0 || re2.lastIndex !== 0;
  })();

  var UNSUPPORTED_Y$2 = stickyHelpers$2.UNSUPPORTED_Y || stickyHelpers$2.BROKEN_CARET;

  // nonparticipating capturing group, copied from es5-shim's String#split patch.
  var NPCG_INCLUDED = /()??/.exec('')[1] !== undefined;

  var PATCH = UPDATES_LAST_INDEX_WRONG || NPCG_INCLUDED || UNSUPPORTED_Y$2 || UNSUPPORTED_DOT_ALL$1 || UNSUPPORTED_NCG$1;

  if (PATCH) {
    // eslint-disable-next-line max-statements -- TODO
    patchedExec = function exec(string) {
      var re = this;
      var state = getInternalState$2(re);
      var str = toString$8(string);
      var raw = state.raw;
      var result, reCopy, lastIndex, match, i, object, group;

      if (raw) {
        raw.lastIndex = re.lastIndex;
        result = patchedExec.call(raw, str);
        re.lastIndex = raw.lastIndex;
        return result;
      }

      var groups = state.groups;
      var sticky = UNSUPPORTED_Y$2 && re.sticky;
      var flags = regexpFlags.call(re);
      var source = re.source;
      var charsAdded = 0;
      var strCopy = str;

      if (sticky) {
        flags = flags.replace('y', '');
        if (flags.indexOf('g') === -1) {
          flags += 'g';
        }

        strCopy = str.slice(re.lastIndex);
        // Support anchored sticky behavior.
        if (re.lastIndex > 0 && (!re.multiline || re.multiline && str.charAt(re.lastIndex - 1) !== '\n')) {
          source = '(?: ' + source + ')';
          strCopy = ' ' + strCopy;
          charsAdded++;
        }
        // ^(? + rx + ) is needed, in combination with some str slicing, to
        // simulate the 'y' flag.
        reCopy = new RegExp('^(?:' + source + ')', flags);
      }

      if (NPCG_INCLUDED) {
        reCopy = new RegExp('^' + source + '$(?!\\s)', flags);
      }
      if (UPDATES_LAST_INDEX_WRONG) lastIndex = re.lastIndex;

      match = nativeExec.call(sticky ? reCopy : re, strCopy);

      if (sticky) {
        if (match) {
          match.input = match.input.slice(charsAdded);
          match[0] = match[0].slice(charsAdded);
          match.index = re.lastIndex;
          re.lastIndex += match[0].length;
        } else re.lastIndex = 0;
      } else if (UPDATES_LAST_INDEX_WRONG && match) {
        re.lastIndex = re.global ? match.index + match[0].length : lastIndex;
      }
      if (NPCG_INCLUDED && match && match.length > 1) {
        // Fix browsers whose `exec` methods don't consistently return `undefined`
        // for NPCG, like IE8. NOTE: This doesn' work for /(.?)?/
        nativeReplace.call(match[0], reCopy, function () {
          for (i = 1; i < arguments.length - 2; i++) {
            if (arguments[i] === undefined) match[i] = undefined;
          }
        });
      }

      if (match && groups) {
        match.groups = object = create$1(null);
        for (i = 0; i < groups.length; i++) {
          group = groups[i];
          object[group[0]] = match[group[1]];
        }
      }

      return match;
    };
  }

  var regexpExec$3 = patchedExec;

  var $$l = _export$1;
  var exec$2 = regexpExec$3;

  // `RegExp.prototype.exec` method
  // https://tc39.es/ecma262/#sec-regexp.prototype.exec
  $$l({ target: 'RegExp', proto: true, forced: /./.exec !== exec$2 }, {
    exec: exec$2
  });

  // TODO: Remove from `core-js@4` since it's moved to entry points

  var redefine$4 = redefine$d.exports;
  var regexpExec$2 = regexpExec$3;
  var fails$b = fails$u;
  var wellKnownSymbol$8 = wellKnownSymbol$q;
  var createNonEnumerableProperty$2$1 = createNonEnumerableProperty$8;

  var SPECIES$1$1 = wellKnownSymbol$8('species');
  var RegExpPrototype$2 = RegExp.prototype;

  var fixRegexpWellKnownSymbolLogic = function (KEY, exec, FORCED, SHAM) {
    var SYMBOL = wellKnownSymbol$8(KEY);

    var DELEGATES_TO_SYMBOL = !fails$b(function () {
      // String methods call symbol-named RegEp methods
      var O = {};
      O[SYMBOL] = function () { return 7; };
      return ''[KEY](O) != 7;
    });

    var DELEGATES_TO_EXEC = DELEGATES_TO_SYMBOL && !fails$b(function () {
      // Symbol-named RegExp methods call .exec
      var execCalled = false;
      var re = /a/;

      if (KEY === 'split') {
        // We can't use real regex here since it causes deoptimization
        // and serious performance degradation in V8
        // https://github.com/zloirock/core-js/issues/306
        re = {};
        // RegExp[@@split] doesn't call the regex's exec method, but first creates
        // a new one. We need to return the patched regex when creating the new one.
        re.constructor = {};
        re.constructor[SPECIES$1$1] = function () { return re; };
        re.flags = '';
        re[SYMBOL] = /./[SYMBOL];
      }

      re.exec = function () { execCalled = true; return null; };

      re[SYMBOL]('');
      return !execCalled;
    });

    if (
      !DELEGATES_TO_SYMBOL ||
      !DELEGATES_TO_EXEC ||
      FORCED
    ) {
      var nativeRegExpMethod = /./[SYMBOL];
      var methods = exec(SYMBOL, ''[KEY], function (nativeMethod, regexp, str, arg2, forceStringMethod) {
        var $exec = regexp.exec;
        if ($exec === regexpExec$2 || $exec === RegExpPrototype$2.exec) {
          if (DELEGATES_TO_SYMBOL && !forceStringMethod) {
            // The native String method already delegates to @@method (this
            // polyfilled function), leasing to infinite recursion.
            // We avoid it by directly calling the native @@method method.
            return { done: true, value: nativeRegExpMethod.call(regexp, str, arg2) };
          }
          return { done: true, value: nativeMethod.call(str, regexp, arg2) };
        }
        return { done: false };
      });

      redefine$4(String.prototype, KEY, methods[0]);
      redefine$4(RegExpPrototype$2, SYMBOL, methods[1]);
    }

    if (SHAM) createNonEnumerableProperty$2$1(RegExpPrototype$2[SYMBOL], 'sham', true);
  };

  var charAt = stringMultibyte.charAt;

  // `AdvanceStringIndex` abstract operation
  // https://tc39.es/ecma262/#sec-advancestringindex
  var advanceStringIndex$4 = function (S, index, unicode) {
    return index + (unicode ? charAt(S, index).length : 1);
  };

  var toObject$5 = toObject$a;

  var floor$1 = Math.floor;
  var replace = ''.replace;
  var SUBSTITUTION_SYMBOLS = /\$([$&'`]|\d{1,2}|<[^>]*>)/g;
  var SUBSTITUTION_SYMBOLS_NO_NAMED = /\$([$&'`]|\d{1,2})/g;

  // `GetSubstitution` abstract operation
  // https://tc39.es/ecma262/#sec-getsubstitution
  var getSubstitution$1 = function (matched, str, position, captures, namedCaptures, replacement) {
    var tailPos = position + matched.length;
    var m = captures.length;
    var symbols = SUBSTITUTION_SYMBOLS_NO_NAMED;
    if (namedCaptures !== undefined) {
      namedCaptures = toObject$5(namedCaptures);
      symbols = SUBSTITUTION_SYMBOLS;
    }
    return replace.call(replacement, symbols, function (match, ch) {
      var capture;
      switch (ch.charAt(0)) {
        case '$': return '$';
        case '&': return matched;
        case '`': return str.slice(0, position);
        case "'": return str.slice(tailPos);
        case '<':
          capture = namedCaptures[ch.slice(1, -1)];
          break;
        default: // \d\d?
          var n = +ch;
          if (n === 0) return match;
          if (n > m) {
            var f = floor$1(n / 10);
            if (f === 0) return match;
            if (f <= m) return captures[f - 1] === undefined ? ch.charAt(1) : captures[f - 1] + ch.charAt(1);
            return match;
          }
          capture = captures[n - 1];
      }
      return capture === undefined ? '' : capture;
    });
  };

  var anObject$6 = anObject$l;
  var isCallable$4$1 = isCallable$o;
  var classof$2$1 = classofRaw$1$1;
  var regexpExec$1 = regexpExec$3;

  // `RegExpExec` abstract operation
  // https://tc39.es/ecma262/#sec-regexpexec
  var regexpExecAbstract = function (R, S) {
    var exec = R.exec;
    if (isCallable$4$1(exec)) {
      var result = exec.call(R, S);
      if (result !== null) anObject$6(result);
      return result;
    }
    if (classof$2$1(R) === 'RegExp') return regexpExec$1.call(R, S);
    throw TypeError('RegExp#exec called on incompatible receiver');
  };

  var fixRegExpWellKnownSymbolLogic$2 = fixRegexpWellKnownSymbolLogic;
  var fails$a = fails$u;
  var anObject$5 = anObject$l;
  var isCallable$3$1 = isCallable$o;
  var toIntegerOrInfinity$1$1 = toIntegerOrInfinity$5;
  var toLength$3 = toLength$5;
  var toString$7 = toString$c;
  var requireObjectCoercible$5 = requireObjectCoercible$9;
  var advanceStringIndex$3 = advanceStringIndex$4;
  var getMethod$3 = getMethod$7;
  var getSubstitution = getSubstitution$1;
  var regExpExec$2 = regexpExecAbstract;
  var wellKnownSymbol$7 = wellKnownSymbol$q;

  var REPLACE = wellKnownSymbol$7('replace');
  var max$2 = Math.max;
  var min$2 = Math.min;

  var maybeToString = function (it) {
    return it === undefined ? it : String(it);
  };

  // IE <= 11 replaces $0 with the whole match, as if it was $&
  // https://stackoverflow.com/questions/6024666/getting-ie-to-replace-a-regex-with-the-literal-string-0
  var REPLACE_KEEPS_$0 = (function () {
    // eslint-disable-next-line regexp/prefer-escape-replacement-dollar-char -- required for testing
    return 'a'.replace(/./, '$0') === '$0';
  })();

  // Safari <= 13.0.3(?) substitutes nth capture where n>m with an empty string
  var REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE = (function () {
    if (/./[REPLACE]) {
      return /./[REPLACE]('a', '$0') === '';
    }
    return false;
  })();

  var REPLACE_SUPPORTS_NAMED_GROUPS = !fails$a(function () {
    var re = /./;
    re.exec = function () {
      var result = [];
      result.groups = { a: '7' };
      return result;
    };
    // eslint-disable-next-line regexp/no-useless-dollar-replacements -- false positive
    return ''.replace(re, '$<a>') !== '7';
  });

  // @@replace logic
  fixRegExpWellKnownSymbolLogic$2('replace', function (_, nativeReplace, maybeCallNative) {
    var UNSAFE_SUBSTITUTE = REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE ? '$' : '$0';

    return [
      // `String.prototype.replace` method
      // https://tc39.es/ecma262/#sec-string.prototype.replace
      function replace(searchValue, replaceValue) {
        var O = requireObjectCoercible$5(this);
        var replacer = searchValue == undefined ? undefined : getMethod$3(searchValue, REPLACE);
        return replacer
          ? replacer.call(searchValue, O, replaceValue)
          : nativeReplace.call(toString$7(O), searchValue, replaceValue);
      },
      // `RegExp.prototype[@@replace]` method
      // https://tc39.es/ecma262/#sec-regexp.prototype-@@replace
      function (string, replaceValue) {
        var rx = anObject$5(this);
        var S = toString$7(string);

        if (
          typeof replaceValue === 'string' &&
          replaceValue.indexOf(UNSAFE_SUBSTITUTE) === -1 &&
          replaceValue.indexOf('$<') === -1
        ) {
          var res = maybeCallNative(nativeReplace, rx, S, replaceValue);
          if (res.done) return res.value;
        }

        var functionalReplace = isCallable$3$1(replaceValue);
        if (!functionalReplace) replaceValue = toString$7(replaceValue);

        var global = rx.global;
        if (global) {
          var fullUnicode = rx.unicode;
          rx.lastIndex = 0;
        }
        var results = [];
        while (true) {
          var result = regExpExec$2(rx, S);
          if (result === null) break;

          results.push(result);
          if (!global) break;

          var matchStr = toString$7(result[0]);
          if (matchStr === '') rx.lastIndex = advanceStringIndex$3(S, toLength$3(rx.lastIndex), fullUnicode);
        }

        var accumulatedResult = '';
        var nextSourcePosition = 0;
        for (var i = 0; i < results.length; i++) {
          result = results[i];

          var matched = toString$7(result[0]);
          var position = max$2(min$2(toIntegerOrInfinity$1$1(result.index), S.length), 0);
          var captures = [];
          // NOTE: This is equivalent to
          //   captures = result.slice(1).map(maybeToString)
          // but for some reason `nativeSlice.call(result, 1, result.length)` (called in
          // the slice polyfill when slicing native arrays) "doesn't work" in safari 9 and
          // causes a crash (https://pastebin.com/N21QzeQA) when trying to debug it.
          for (var j = 1; j < result.length; j++) captures.push(maybeToString(result[j]));
          var namedCaptures = result.groups;
          if (functionalReplace) {
            var replacerArgs = [matched].concat(captures, position, S);
            if (namedCaptures !== undefined) replacerArgs.push(namedCaptures);
            var replacement = toString$7(replaceValue.apply(undefined, replacerArgs));
          } else {
            replacement = getSubstitution(matched, S, position, captures, namedCaptures, replaceValue);
          }
          if (position >= nextSourcePosition) {
            accumulatedResult += S.slice(nextSourcePosition, position) + replacement;
            nextSourcePosition = position + matched.length;
          }
        }
        return accumulatedResult + S.slice(nextSourcePosition);
      }
    ];
  }, !REPLACE_SUPPORTS_NAMED_GROUPS || !REPLACE_KEEPS_$0 || REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE);

  var $$k = _export$1;
  var NativePromise = nativePromiseConstructor;
  var fails$9 = fails$u;
  var getBuiltIn$1$1 = getBuiltIn$a;
  var isCallable$2$1 = isCallable$o;
  var speciesConstructor$2 = speciesConstructor$4;
  var promiseResolve = promiseResolve$2;
  var redefine$3 = redefine$d.exports;

  // Safari bug https://bugs.webkit.org/show_bug.cgi?id=200829
  var NON_GENERIC = !!NativePromise && fails$9(function () {
    NativePromise.prototype['finally'].call({ then: function () { /* empty */ } }, function () { /* empty */ });
  });

  // `Promise.prototype.finally` method
  // https://tc39.es/ecma262/#sec-promise.prototype.finally
  $$k({ target: 'Promise', proto: true, real: true, forced: NON_GENERIC }, {
    'finally': function (onFinally) {
      var C = speciesConstructor$2(this, getBuiltIn$1$1('Promise'));
      var isFunction = isCallable$2$1(onFinally);
      return this.then(
        isFunction ? function (x) {
          return promiseResolve(C, onFinally()).then(function () { return x; });
        } : onFinally,
        isFunction ? function (e) {
          return promiseResolve(C, onFinally()).then(function () { throw e; });
        } : onFinally
      );
    }
  });

  // makes sure that native promise-based APIs `Promise#finally` properly works with patched `Promise#then`
  if (isCallable$2$1(NativePromise)) {
    var method = getBuiltIn$1$1('Promise').prototype['finally'];
    if (NativePromise.prototype['finally'] !== method) {
      redefine$3(NativePromise.prototype, 'finally', method, { unsafe: true });
    }
  }

  var $$j = _export$1;
  var toObject$4 = toObject$a;
  var nativeKeys = objectKeys$2;
  var fails$8$1 = fails$u;

  var FAILS_ON_PRIMITIVES$1 = fails$8$1(function () { nativeKeys(1); });

  // `Object.keys` method
  // https://tc39.es/ecma262/#sec-object.keys
  $$j({ target: 'Object', stat: true, forced: FAILS_ON_PRIMITIVES$1 }, {
    keys: function keys(it) {
      return nativeKeys(toObject$4(it));
    }
  });

  var wellKnownSymbolWrapped = {};

  var wellKnownSymbol$6$1 = wellKnownSymbol$q;

  wellKnownSymbolWrapped.f = wellKnownSymbol$6$1;

  var global$5$1 = global$t;

  var path$1 = global$5$1;

  var path = path$1;
  var hasOwn$3$1 = hasOwnProperty_1$1;
  var wrappedWellKnownSymbolModule$1 = wellKnownSymbolWrapped;
  var defineProperty$4 = objectDefineProperty$1.f;

  var defineWellKnownSymbol$2 = function (NAME) {
    var Symbol = path.Symbol || (path.Symbol = {});
    if (!hasOwn$3$1(Symbol, NAME)) defineProperty$4(Symbol, NAME, {
      value: wrappedWellKnownSymbolModule$1.f(NAME)
    });
  };

  var $$i = _export$1;
  var global$4$1 = global$t;
  var getBuiltIn$b = getBuiltIn$a;
  var DESCRIPTORS$6 = descriptors$1;
  var NATIVE_SYMBOL$3 = nativeSymbol$1;
  var fails$7$1 = fails$u;
  var hasOwn$2$1 = hasOwnProperty_1$1;
  var isArray$1$1 = isArray$4;
  var isCallable$1$1 = isCallable$o;
  var isObject$3$1 = isObject$k;
  var isSymbol$4 = isSymbol$3;
  var anObject$4 = anObject$l;
  var toObject$3 = toObject$a;
  var toIndexedObject$4 = toIndexedObject$a;
  var toPropertyKey$5 = toPropertyKey$4;
  var $toString = toString$c;
  var createPropertyDescriptor$6 = createPropertyDescriptor$5;
  var nativeObjectCreate = objectCreate;
  var objectKeys = objectKeys$2;
  var getOwnPropertyNamesModule$3 = objectGetOwnPropertyNames$1;
  var getOwnPropertyNamesExternal = objectGetOwnPropertyNamesExternal;
  var getOwnPropertySymbolsModule$2 = objectGetOwnPropertySymbols$1;
  var getOwnPropertyDescriptorModule$1 = objectGetOwnPropertyDescriptor$1;
  var definePropertyModule$7 = objectDefineProperty$1;
  var propertyIsEnumerableModule$2 = objectPropertyIsEnumerable$1;
  var redefine$2 = redefine$d.exports;
  var shared$6 = shared$5.exports;
  var sharedKey$5 = sharedKey$4;
  var hiddenKeys$7 = hiddenKeys$6;
  var uid$5 = uid$4;
  var wellKnownSymbol$5$1 = wellKnownSymbol$q;
  var wrappedWellKnownSymbolModule = wellKnownSymbolWrapped;
  var defineWellKnownSymbol$1 = defineWellKnownSymbol$2;
  var setToStringTag = setToStringTag$5;
  var InternalStateModule$2 = internalState$1;
  var $forEach$1 = arrayIteration.forEach;

  var HIDDEN = sharedKey$5('hidden');
  var SYMBOL = 'Symbol';
  var PROTOTYPE = 'prototype';
  var TO_PRIMITIVE$2 = wellKnownSymbol$5$1('toPrimitive');
  var setInternalState$2 = InternalStateModule$2.set;
  var getInternalState$1 = InternalStateModule$2.getterFor(SYMBOL);
  var ObjectPrototype = Object[PROTOTYPE];
  var $Symbol = global$4$1.Symbol;
  var $stringify = getBuiltIn$b('JSON', 'stringify');
  var nativeGetOwnPropertyDescriptor$1 = getOwnPropertyDescriptorModule$1.f;
  var nativeDefineProperty = definePropertyModule$7.f;
  var nativeGetOwnPropertyNames = getOwnPropertyNamesExternal.f;
  var nativePropertyIsEnumerable = propertyIsEnumerableModule$2.f;
  var AllSymbols = shared$6('symbols');
  var ObjectPrototypeSymbols = shared$6('op-symbols');
  var StringToSymbolRegistry = shared$6('string-to-symbol-registry');
  var SymbolToStringRegistry = shared$6('symbol-to-string-registry');
  var WellKnownSymbolsStore$2 = shared$6('wks');
  var QObject = global$4$1.QObject;
  // Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173
  var USE_SETTER = !QObject || !QObject[PROTOTYPE] || !QObject[PROTOTYPE].findChild;

  // fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
  var setSymbolDescriptor = DESCRIPTORS$6 && fails$7$1(function () {
    return nativeObjectCreate(nativeDefineProperty({}, 'a', {
      get: function () { return nativeDefineProperty(this, 'a', { value: 7 }).a; }
    })).a != 7;
  }) ? function (O, P, Attributes) {
    var ObjectPrototypeDescriptor = nativeGetOwnPropertyDescriptor$1(ObjectPrototype, P);
    if (ObjectPrototypeDescriptor) delete ObjectPrototype[P];
    nativeDefineProperty(O, P, Attributes);
    if (ObjectPrototypeDescriptor && O !== ObjectPrototype) {
      nativeDefineProperty(ObjectPrototype, P, ObjectPrototypeDescriptor);
    }
  } : nativeDefineProperty;

  var wrap = function (tag, description) {
    var symbol = AllSymbols[tag] = nativeObjectCreate($Symbol[PROTOTYPE]);
    setInternalState$2(symbol, {
      type: SYMBOL,
      tag: tag,
      description: description
    });
    if (!DESCRIPTORS$6) symbol.description = description;
    return symbol;
  };

  var $defineProperty$2 = function defineProperty(O, P, Attributes) {
    if (O === ObjectPrototype) $defineProperty$2(ObjectPrototypeSymbols, P, Attributes);
    anObject$4(O);
    var key = toPropertyKey$5(P);
    anObject$4(Attributes);
    if (hasOwn$2$1(AllSymbols, key)) {
      if (!Attributes.enumerable) {
        if (!hasOwn$2$1(O, HIDDEN)) nativeDefineProperty(O, HIDDEN, createPropertyDescriptor$6(1, {}));
        O[HIDDEN][key] = true;
      } else {
        if (hasOwn$2$1(O, HIDDEN) && O[HIDDEN][key]) O[HIDDEN][key] = false;
        Attributes = nativeObjectCreate(Attributes, { enumerable: createPropertyDescriptor$6(0, false) });
      } return setSymbolDescriptor(O, key, Attributes);
    } return nativeDefineProperty(O, key, Attributes);
  };

  var $defineProperties = function defineProperties(O, Properties) {
    anObject$4(O);
    var properties = toIndexedObject$4(Properties);
    var keys = objectKeys(properties).concat($getOwnPropertySymbols(properties));
    $forEach$1(keys, function (key) {
      if (!DESCRIPTORS$6 || $propertyIsEnumerable$2.call(properties, key)) $defineProperty$2(O, key, properties[key]);
    });
    return O;
  };

  var $create = function create(O, Properties) {
    return Properties === undefined ? nativeObjectCreate(O) : $defineProperties(nativeObjectCreate(O), Properties);
  };

  var $propertyIsEnumerable$2 = function propertyIsEnumerable(V) {
    var P = toPropertyKey$5(V);
    var enumerable = nativePropertyIsEnumerable.call(this, P);
    if (this === ObjectPrototype && hasOwn$2$1(AllSymbols, P) && !hasOwn$2$1(ObjectPrototypeSymbols, P)) return false;
    return enumerable || !hasOwn$2$1(this, P) || !hasOwn$2$1(AllSymbols, P) || hasOwn$2$1(this, HIDDEN) && this[HIDDEN][P]
      ? enumerable : true;
  };

  var $getOwnPropertyDescriptor$2 = function getOwnPropertyDescriptor(O, P) {
    var it = toIndexedObject$4(O);
    var key = toPropertyKey$5(P);
    if (it === ObjectPrototype && hasOwn$2$1(AllSymbols, key) && !hasOwn$2$1(ObjectPrototypeSymbols, key)) return;
    var descriptor = nativeGetOwnPropertyDescriptor$1(it, key);
    if (descriptor && hasOwn$2$1(AllSymbols, key) && !(hasOwn$2$1(it, HIDDEN) && it[HIDDEN][key])) {
      descriptor.enumerable = true;
    }
    return descriptor;
  };

  var $getOwnPropertyNames = function getOwnPropertyNames(O) {
    var names = nativeGetOwnPropertyNames(toIndexedObject$4(O));
    var result = [];
    $forEach$1(names, function (key) {
      if (!hasOwn$2$1(AllSymbols, key) && !hasOwn$2$1(hiddenKeys$7, key)) result.push(key);
    });
    return result;
  };

  var $getOwnPropertySymbols = function getOwnPropertySymbols(O) {
    var IS_OBJECT_PROTOTYPE = O === ObjectPrototype;
    var names = nativeGetOwnPropertyNames(IS_OBJECT_PROTOTYPE ? ObjectPrototypeSymbols : toIndexedObject$4(O));
    var result = [];
    $forEach$1(names, function (key) {
      if (hasOwn$2$1(AllSymbols, key) && (!IS_OBJECT_PROTOTYPE || hasOwn$2$1(ObjectPrototype, key))) {
        result.push(AllSymbols[key]);
      }
    });
    return result;
  };

  // `Symbol` constructor
  // https://tc39.es/ecma262/#sec-symbol-constructor
  if (!NATIVE_SYMBOL$3) {
    $Symbol = function Symbol() {
      if (this instanceof $Symbol) throw TypeError('Symbol is not a constructor');
      var description = !arguments.length || arguments[0] === undefined ? undefined : $toString(arguments[0]);
      var tag = uid$5(description);
      var setter = function (value) {
        if (this === ObjectPrototype) setter.call(ObjectPrototypeSymbols, value);
        if (hasOwn$2$1(this, HIDDEN) && hasOwn$2$1(this[HIDDEN], tag)) this[HIDDEN][tag] = false;
        setSymbolDescriptor(this, tag, createPropertyDescriptor$6(1, value));
      };
      if (DESCRIPTORS$6 && USE_SETTER) setSymbolDescriptor(ObjectPrototype, tag, { configurable: true, set: setter });
      return wrap(tag, description);
    };

    redefine$2($Symbol[PROTOTYPE], 'toString', function toString() {
      return getInternalState$1(this).tag;
    });

    redefine$2($Symbol, 'withoutSetter', function (description) {
      return wrap(uid$5(description), description);
    });

    propertyIsEnumerableModule$2.f = $propertyIsEnumerable$2;
    definePropertyModule$7.f = $defineProperty$2;
    getOwnPropertyDescriptorModule$1.f = $getOwnPropertyDescriptor$2;
    getOwnPropertyNamesModule$3.f = getOwnPropertyNamesExternal.f = $getOwnPropertyNames;
    getOwnPropertySymbolsModule$2.f = $getOwnPropertySymbols;

    wrappedWellKnownSymbolModule.f = function (name) {
      return wrap(wellKnownSymbol$5$1(name), name);
    };

    if (DESCRIPTORS$6) {
      // https://github.com/tc39/proposal-Symbol-description
      nativeDefineProperty($Symbol[PROTOTYPE], 'description', {
        configurable: true,
        get: function description() {
          return getInternalState$1(this).description;
        }
      });
      {
        redefine$2(ObjectPrototype, 'propertyIsEnumerable', $propertyIsEnumerable$2, { unsafe: true });
      }
    }
  }

  $$i({ global: true, wrap: true, forced: !NATIVE_SYMBOL$3, sham: !NATIVE_SYMBOL$3 }, {
    Symbol: $Symbol
  });

  $forEach$1(objectKeys(WellKnownSymbolsStore$2), function (name) {
    defineWellKnownSymbol$1(name);
  });

  $$i({ target: SYMBOL, stat: true, forced: !NATIVE_SYMBOL$3 }, {
    // `Symbol.for` method
    // https://tc39.es/ecma262/#sec-symbol.for
    'for': function (key) {
      var string = $toString(key);
      if (hasOwn$2$1(StringToSymbolRegistry, string)) return StringToSymbolRegistry[string];
      var symbol = $Symbol(string);
      StringToSymbolRegistry[string] = symbol;
      SymbolToStringRegistry[symbol] = string;
      return symbol;
    },
    // `Symbol.keyFor` method
    // https://tc39.es/ecma262/#sec-symbol.keyfor
    keyFor: function keyFor(sym) {
      if (!isSymbol$4(sym)) throw TypeError(sym + ' is not a symbol');
      if (hasOwn$2$1(SymbolToStringRegistry, sym)) return SymbolToStringRegistry[sym];
    },
    useSetter: function () { USE_SETTER = true; },
    useSimple: function () { USE_SETTER = false; }
  });

  $$i({ target: 'Object', stat: true, forced: !NATIVE_SYMBOL$3, sham: !DESCRIPTORS$6 }, {
    // `Object.create` method
    // https://tc39.es/ecma262/#sec-object.create
    create: $create,
    // `Object.defineProperty` method
    // https://tc39.es/ecma262/#sec-object.defineproperty
    defineProperty: $defineProperty$2,
    // `Object.defineProperties` method
    // https://tc39.es/ecma262/#sec-object.defineproperties
    defineProperties: $defineProperties,
    // `Object.getOwnPropertyDescriptor` method
    // https://tc39.es/ecma262/#sec-object.getownpropertydescriptors
    getOwnPropertyDescriptor: $getOwnPropertyDescriptor$2
  });

  $$i({ target: 'Object', stat: true, forced: !NATIVE_SYMBOL$3 }, {
    // `Object.getOwnPropertyNames` method
    // https://tc39.es/ecma262/#sec-object.getownpropertynames
    getOwnPropertyNames: $getOwnPropertyNames,
    // `Object.getOwnPropertySymbols` method
    // https://tc39.es/ecma262/#sec-object.getownpropertysymbols
    getOwnPropertySymbols: $getOwnPropertySymbols
  });

  // Chrome 38 and 39 `Object.getOwnPropertySymbols` fails on primitives
  // https://bugs.chromium.org/p/v8/issues/detail?id=3443
  $$i({ target: 'Object', stat: true, forced: fails$7$1(function () { getOwnPropertySymbolsModule$2.f(1); }) }, {
    getOwnPropertySymbols: function getOwnPropertySymbols(it) {
      return getOwnPropertySymbolsModule$2.f(toObject$3(it));
    }
  });

  // `JSON.stringify` method behavior with symbols
  // https://tc39.es/ecma262/#sec-json.stringify
  if ($stringify) {
    var FORCED_JSON_STRINGIFY = !NATIVE_SYMBOL$3 || fails$7$1(function () {
      var symbol = $Symbol();
      // MS Edge converts symbol values to JSON as {}
      return $stringify([symbol]) != '[null]'
        // WebKit converts symbol values to JSON as null
        || $stringify({ a: symbol }) != '{}'
        // V8 throws on boxed symbols
        || $stringify(Object(symbol)) != '{}';
    });

    $$i({ target: 'JSON', stat: true, forced: FORCED_JSON_STRINGIFY }, {
      // eslint-disable-next-line no-unused-vars -- required for `.length`
      stringify: function stringify(it, replacer, space) {
        var args = [it];
        var index = 1;
        var $replacer;
        while (arguments.length > index) args.push(arguments[index++]);
        $replacer = replacer;
        if (!isObject$3$1(replacer) && it === undefined || isSymbol$4(it)) return; // IE8 returns string on undefined
        if (!isArray$1$1(replacer)) replacer = function (key, value) {
          if (isCallable$1$1($replacer)) value = $replacer.call(this, key, value);
          if (!isSymbol$4(value)) return value;
        };
        args[1] = replacer;
        return $stringify.apply(null, args);
      }
    });
  }

  // `Symbol.prototype[@@toPrimitive]` method
  // https://tc39.es/ecma262/#sec-symbol.prototype-@@toprimitive
  if (!$Symbol[PROTOTYPE][TO_PRIMITIVE$2]) {
    var valueOf = $Symbol[PROTOTYPE].valueOf;
    redefine$2($Symbol[PROTOTYPE], TO_PRIMITIVE$2, function () {
      return valueOf.apply(this, arguments);
    });
  }
  // `Symbol.prototype[@@toStringTag]` property
  // https://tc39.es/ecma262/#sec-symbol.prototype-@@tostringtag
  setToStringTag($Symbol, SYMBOL);

  hiddenKeys$7[HIDDEN] = true;

  var $$h = _export$1;
  var $filter = arrayIteration.filter;
  var arrayMethodHasSpeciesSupport$3 = arrayMethodHasSpeciesSupport$5;

  var HAS_SPECIES_SUPPORT$3 = arrayMethodHasSpeciesSupport$3('filter');

  // `Array.prototype.filter` method
  // https://tc39.es/ecma262/#sec-array.prototype.filter
  // with adding support of @@species
  $$h({ target: 'Array', proto: true, forced: !HAS_SPECIES_SUPPORT$3 }, {
    filter: function filter(callbackfn /* , thisArg */) {
      return $filter(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
    }
  });

  var $$g = _export$1;
  var fails$6$1 = fails$u;
  var toIndexedObject$3$1 = toIndexedObject$a;
  var nativeGetOwnPropertyDescriptor = objectGetOwnPropertyDescriptor$1.f;
  var DESCRIPTORS$5 = descriptors$1;

  var FAILS_ON_PRIMITIVES = fails$6$1(function () { nativeGetOwnPropertyDescriptor(1); });
  var FORCED$2 = !DESCRIPTORS$5 || FAILS_ON_PRIMITIVES;

  // `Object.getOwnPropertyDescriptor` method
  // https://tc39.es/ecma262/#sec-object.getownpropertydescriptor
  $$g({ target: 'Object', stat: true, forced: FORCED$2, sham: !DESCRIPTORS$5 }, {
    getOwnPropertyDescriptor: function getOwnPropertyDescriptor(it, key) {
      return nativeGetOwnPropertyDescriptor(toIndexedObject$3$1(it), key);
    }
  });

  var fails$5$1 = fails$u;

  var arrayMethodIsStrict$3 = function (METHOD_NAME, argument) {
    var method = [][METHOD_NAME];
    return !!method && fails$5$1(function () {
      // eslint-disable-next-line no-useless-call,no-throw-literal -- required for testing
      method.call(null, argument || function () { throw 1; }, 1);
    });
  };

  var $forEach = arrayIteration.forEach;
  var arrayMethodIsStrict$2 = arrayMethodIsStrict$3;

  var STRICT_METHOD$2 = arrayMethodIsStrict$2('forEach');

  // `Array.prototype.forEach` method implementation
  // https://tc39.es/ecma262/#sec-array.prototype.foreach
  var arrayForEach = !STRICT_METHOD$2 ? function forEach(callbackfn /* , thisArg */) {
    return $forEach(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  // eslint-disable-next-line es/no-array-prototype-foreach -- safe
  } : [].forEach;

  var global$3$1 = global$t;
  var DOMIterables = domIterables;
  var DOMTokenListPrototype = domTokenListPrototype;
  var forEach = arrayForEach;
  var createNonEnumerableProperty$1$1 = createNonEnumerableProperty$8;

  var handlePrototype = function (CollectionPrototype) {
    // some Chrome versions have non-configurable methods on DOMTokenList
    if (CollectionPrototype && CollectionPrototype.forEach !== forEach) try {
      createNonEnumerableProperty$1$1(CollectionPrototype, 'forEach', forEach);
    } catch (error) {
      CollectionPrototype.forEach = forEach;
    }
  };

  for (var COLLECTION_NAME in DOMIterables) {
    if (DOMIterables[COLLECTION_NAME]) {
      handlePrototype(global$3$1[COLLECTION_NAME] && global$3$1[COLLECTION_NAME].prototype);
    }
  }

  handlePrototype(DOMTokenListPrototype);

  var $$f = _export$1;
  var DESCRIPTORS$4$1 = descriptors$1;
  var ownKeys$1$1 = ownKeys$3;
  var toIndexedObject$2$1 = toIndexedObject$a;
  var getOwnPropertyDescriptorModule$3 = objectGetOwnPropertyDescriptor$1;
  var createProperty$3 = createProperty$5;

  // `Object.getOwnPropertyDescriptors` method
  // https://tc39.es/ecma262/#sec-object.getownpropertydescriptors
  $$f({ target: 'Object', stat: true, sham: !DESCRIPTORS$4$1 }, {
    getOwnPropertyDescriptors: function getOwnPropertyDescriptors(object) {
      var O = toIndexedObject$2$1(object);
      var getOwnPropertyDescriptor = getOwnPropertyDescriptorModule$3.f;
      var keys = ownKeys$1$1(O);
      var result = {};
      var index = 0;
      var key, descriptor;
      while (keys.length > index) {
        descriptor = getOwnPropertyDescriptor(O, key = keys[index++]);
        if (descriptor !== undefined) createProperty$3(result, key, descriptor);
      }
      return result;
    }
  });

  function ownKeys$4(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

  function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys$4(Object(source), true).forEach(function (key) { _defineProperty$1(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys$4(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

  function _classPrivateFieldInitSpec$c(obj, privateMap, value) { _checkPrivateRedeclaration$c(obj, privateMap); privateMap.set(obj, value); }

  function _checkPrivateRedeclaration$c(obj, privateCollection) { if (privateCollection.has(obj)) { throw new TypeError("Cannot initialize the same private elements twice on an object"); } }

  var _eventListeners = /*#__PURE__*/new WeakMap();

  var EventHarness = /*#__PURE__*/function () {
    function EventHarness() {
      _classCallCheck$1(this, EventHarness);

      _classPrivateFieldInitSpec$c(this, _eventListeners, {
        writable: true,
        value: []
      });
    }

    _createClass(EventHarness, [{
      key: "bindListener",
      value:
      /**
       *
       * @param {string} eventName
       * @param {Object} obj
       * @param {Function} method
       * @param {*=} constructionParam
       * @deprecated use addListener instead
       * @return {number} handle
       */
      function bindListener(eventName, obj, method, constructionParam) {
        _classPrivateFieldSet(this, _eventListeners, _classPrivateFieldGet(this, _eventListeners) || []);

        var handlerFunction = function handlerFunction(context, eventName, invocationParam) {
          return method.call(obj, context, eventName, invocationParam, constructionParam);
        };

        if (_classPrivateFieldGet(this, _eventListeners)[eventName]) {
          return _classPrivateFieldGet(this, _eventListeners)[eventName].push(handlerFunction) - 1;
        } else {
          _classPrivateFieldGet(this, _eventListeners)[eventName] = [handlerFunction];
          return 0; // first element in array
        }
      }
    }, {
      key: "addListener",
      value:
      /**
       *
       * @param {string} eventName
       * @param {Function} handler
       * @param {*=} constructionParam
       * @return {number} handle
       */
      function addListener(eventName, handler) {
        var constructionParam = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

        _classPrivateFieldSet(this, _eventListeners, _classPrivateFieldGet(this, _eventListeners) || []);

        var handlerFunction = function handlerFunction(context, eventName) {
          var invocationParam = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
          return handler(_objectSpread(_objectSpread({
            context: context,
            eventName: eventName
          }, invocationParam), constructionParam));
        };

        if (_classPrivateFieldGet(this, _eventListeners)[eventName]) {
          return _classPrivateFieldGet(this, _eventListeners)[eventName].push(handlerFunction) - 1;
        } else {
          _classPrivateFieldGet(this, _eventListeners)[eventName] = [handlerFunction];
          return 0; // first element in array
        }
      }
    }, {
      key: "removeListener",
      value:
      /**
       *
       * @param {string} eventName
       * @param {number} handle
       * @returns undefined
       */
      function removeListener(eventName, handle) {
        if (_classPrivateFieldGet(this, _eventListeners)[eventName] && _classPrivateFieldGet(this, _eventListeners)[eventName][handle]) {
          delete _classPrivateFieldGet(this, _eventListeners)[eventName][handle];
        } else {
          console.log('trying to remove non-existent event handler, event = ' + eventName + ' handle = ' + handle);
        }

        return undefined;
      }
    }, {
      key: "destructor",
      value:
      /**
       *
       */
      function destructor() {
        _classPrivateFieldSet(this, _eventListeners, null);
      }
    }, {
      key: "fireEvent",
      value:
      /**
       *
       * @param {string} eventName
       * @param {Object=} param optional parameter to pass on to listener
       * @return void
       */
      function fireEvent(eventName, param) {
        //console.log('fire event "' + eventName + '" called by '+this.fire_event.caller.caller+' invoked by '+this.fire_event.caller.caller.caller+' instigated by '+this.fire_event.caller.caller.caller.caller);
        if (_classPrivateFieldGet(this, _eventListeners)) {
          for (var f in _classPrivateFieldGet(this, _eventListeners)[eventName]) {
            if (_classPrivateFieldGet(this, _eventListeners)[eventName].hasOwnProperty(f)) {
              if (_classPrivateFieldGet(this, _eventListeners)[eventName][f](this, eventName, arguments[1]) === EventHarness.STOP_PROPAGATION) {
                break;
              }
            }
          }
        }
      }
    }]);

    return EventHarness;
  }();

  _defineProperty$1(EventHarness, "STOP_PROPAGATION", 'STOP_PROPAGATION');

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

  }).call(this,typeof commonjsGlobal$1 !== "undefined" ? commonjsGlobal$1 : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {});
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

  }).call(this,typeof commonjsGlobal$1 !== "undefined" ? commonjsGlobal$1 : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {});
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

  function _createSuper$t(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$t(); return function _createSuperInternal() { var Super = _getPrototypeOf$1(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf$1(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn$1(this, result); }; }

  function _isNativeReflectConstruct$t() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
  function uuid(a) {
    return a ? (a ^ Math.random() * 16 >> a / 4).toString(16) : ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, uuid);
  }
  /**
   * regex used to validate AppObject external ids
   * (UUID form is 8 digits followed by three groups of 4 digits followed by a group of 12)
   */

  var UUID_REGEX = /^[a-fA-F0-9]{8}-(?:[a-fA-F0-9]{4}-){3}[a-fA-F0-9]{12}$/;
  var SAVE_STATE_LOCAL = 'SAVED_LOCALLY';
  var SAVE_STATE_SERVER = 'SAVED_TO_SERVER';
  var Model = /*#__PURE__*/function (_EventHarness) {
    _inherits$1(Model, _EventHarness);

    var _super = _createSuper$t(Model);

    /**
     * @type {string}
     */

    /**
     * set if the object has been posted to the server
     *
     * @type {boolean}
     */

    /**
     * set if the object has been added to a temporary store (e.g. indexedDb)
     *
     * @type {boolean}
     */

    /**
     *
     * @type {boolean}
     */

    /**
     * unix timestamp
     * Provided that the created stamp is < the modified stamp then the externally assigned creation stamp will be used
     *
     * @type {number}
     */

    /**
     * unix timestamp
     * modified stamp is generally server assigned - rather than using a potentially discrepant client clock
     * this may increase synchrony and trust between distributed clients
     *
     * @type {number}
     */

    /**
     * DDb AppProject id
     *
     * @type {number}
     */

    /**
     * paired with isNew this marks records that have never been edited
     *
     * @type {boolean}
     */
    function Model() {
      var _this;

      _classCallCheck$1(this, Model);

      _this = _super.call(this);

      _defineProperty$1(_assertThisInitialized$1(_this), "_id", void 0);

      _defineProperty$1(_assertThisInitialized$1(_this), "_savedRemotely", false);

      _defineProperty$1(_assertThisInitialized$1(_this), "_savedLocally", false);

      _defineProperty$1(_assertThisInitialized$1(_this), "deleted", false);

      _defineProperty$1(_assertThisInitialized$1(_this), "createdStamp", void 0);

      _defineProperty$1(_assertThisInitialized$1(_this), "modifiedStamp", void 0);

      _defineProperty$1(_assertThisInitialized$1(_this), "projectId", void 0);

      _defineProperty$1(_assertThisInitialized$1(_this), "isPristine", false);

      _this.createdStamp = Math.floor(Date.now() / 1000);
      return _this;
    }
    /**
     * returns true if either remote or local copy is missing
     *
     * @returns {boolean}
     */


    _createClass(Model, [{
      key: "unsaved",
      value: function unsaved() {
        return !(this._savedLocally && this._savedRemotely);
      }
      /**
       * string
       */

    }, {
      key: "id",
      get: function get() {
        if (!this._id) {
          this._id = uuid();
        }

        return this._id;
      }
      /**
       *
       * @param {string} newId
       */
      ,
      set: function set(newId) {
        // only allow an id to be set if not present already
        if (this._id && newId !== this._id) {
          throw new Error("Occurrence id has already been set, when trying to set new id '".concat(newId, "'."));
        }

        this._id = newId;
      }
      /**
       *
       * @type {Array.<function>}
       * @private
       */

    }, {
      key: "queuePost",
      value:
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
      function queuePost(formData) {
        var _this2 = this;

        return new Promise(function (resolve, reject) {
          /**
           * @returns {Promise}
           */
          var task = function task() {
            console.log({
              'posting form data': formData
            });
            return _this2.post(formData).then(resolve, reject);
          };

          Model._tasks.push(task);

          if (Model._tasks.length > 1) {
            console.log("Added post request to the queue.");
          } else {
            console.log("No pending tasks, starting post request immediately.");
            task().finally(Model._next);
          }
        });
      }
      /**
       *
       * @returns {Promise}
       * @private
       */

    }, {
      key: "post",
      value:
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
      function post(formData) {
        var _this3 = this;

        return fetch(this.SAVE_ENDPOINT, {
          method: 'POST',
          body: formData
        }).then(function (response) {
          if (response.ok) {
            // need to find out whether this was a local store in indexedDb by the service worker
            // or a server-side save
            // to do that need to decode the json response
            // which can only be done once, so need to clone first
            var clonedResponse = response.clone();
            return clonedResponse.json().then(function (responseData) {
              /** @param {{saveState : string, created : number, modified : number}} responseData */
              console.log({
                'returned to client after save': responseData
              });

              switch (responseData.saveState) {
                case SAVE_STATE_SERVER:
                  _this3._savedLocally = true;
                  _this3._savedRemotely = true;
                  break;

                case SAVE_STATE_LOCAL:
                  _this3._savedLocally = true;
                  _this3._savedRemotely = false;
                  break;

                default:
                  console.log("Unrecognised save state '".concat(responseData.saveState, "'"));
              }

              _this3.createdStamp = parseInt(responseData.created, 10);
              _this3.modifiedStamp = parseInt(responseData.modified, 10); // return the json version of the original response as a promise

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

    }, {
      key: "_parseDescriptor",
      value:
      /**
       *
       * @param {{id : string, saveState: string, attributes: Object.<string, *>, deleted: boolean|string, created: (number|string), modified: (number|string), projectId: (number|string)}} descriptor
       */
      function _parseDescriptor(descriptor) {
        this._parseAttributes(descriptor.attributes);

        this._parseSavedState(descriptor.saveState);

        this.deleted = descriptor.deleted === true || descriptor.deleted === 'true'; // cast stringified boolean to true boolean

        this.createdStamp = parseInt(descriptor.created, 10); //this.modifiedStamp = descriptor.modified ? parseInt(descriptor.modified, 10) : this.createdStamp; // avoids NaN

        this.modifiedStamp = descriptor.modified ? parseInt(descriptor.modified, 10) : 0; // avoids NaN

        this.projectId = parseInt(descriptor.projectId, 10);
      }
      /**
       *
       * @param {Object.<string, {}>|string|Array} attributes
       */

    }, {
      key: "_parseAttributes",
      value: function _parseAttributes(attributes) {
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

    }, {
      key: "_parseSavedState",
      value: function _parseSavedState(saveState) {
        switch (saveState) {
          case SAVE_STATE_LOCAL:
            this._savedRemotely = false;
            this._savedLocally = true;
            break;

          case SAVE_STATE_SERVER:
            this._savedRemotely = true;
            this._savedLocally = true;
            break;

          default:
            throw new Error("Unrecognised saved state '".concat(saveState));
        }
      }
      /**
       * update modified stamp to current time
       */

    }, {
      key: "touch",
      value: function touch() {
        this.modifiedStamp = Math.floor(Date.now() / 1000);

        if (this.isPristine) {
          this.isPristine = false;
          this.createdStamp = this.modifiedStamp;
        }

        this._savedLocally = false;
        this._savedRemotely = false;
      }
      /**
       *
       * @param {{}} formSectionProperties
       * @return {{requiredFieldsPresent: boolean, validity: Object.<string, boolean>}}
       */

    }, {
      key: "evaluateCompletionStatus",
      value: function evaluateCompletionStatus(formSectionProperties) {
        var validity = {};
        var requiredFieldsPresent = true;

        for (var key in formSectionProperties) {
          if (formSectionProperties.hasOwnProperty(key)) {
            var property = formSectionProperties[key];
            validity[key] = property.validator ? property.validator(key, property, this.attributes) : property.field.isValid(key, property, this.attributes);

            if (null !== validity[key]) {
              // validity can be 'null' in which case field was optional and not assessed
              requiredFieldsPresent = requiredFieldsPresent && validity[key];
            }
          }
        }

        return {
          requiredFieldsPresent: requiredFieldsPresent,
          validity: validity
        };
      }
    }], [{
      key: "_next",
      value: function _next() {
        Model._tasks.shift(); // save is done


        if (Model._tasks.length) {
          // run the next task
          console.log('Running the next task.');
          return Model._tasks[0]().finally(Model._next);
        }
      }
    }, {
      key: "retrieveFromLocal",
      value: function retrieveFromLocal(id, modelObject) {
        return localforage.getItem("".concat(modelObject.TYPE, ".").concat(id)).then(function (descriptor) {
          if (descriptor) {
            modelObject.id = id;

            modelObject._parseDescriptor(descriptor);

            return modelObject;
          } else {
            return Promise.reject("Failed to retrieve ".concat(modelObject.TYPE, ".").concat(id, " locally"));
          }
        });
      }
    }]);

    return Model;
  }(EventHarness);

  _defineProperty$1(Model, "_tasks", []);

  function _createSuper$s(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$s(); return function _createSuperInternal() { var Super = _getPrototypeOf$1(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf$1(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn$1(this, result); }; }

  function _isNativeReflectConstruct$s() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

  var TaxonError = /*#__PURE__*/function (_Error) {
    _inherits$1(TaxonError, _Error);

    var _super = _createSuper$s(TaxonError);

    function TaxonError() {
      _classCallCheck$1(this, TaxonError);

      return _super.apply(this, arguments);
    }

    return TaxonError;
  }( /*#__PURE__*/_wrapNativeSuper(Error));

  /**
   *
   * @param text
   * @returns {string}
   */
  function escapeHTML(text) {
    try {
      // IE (even v 11) sometimes fails here with 'Unknown runtime error', see http://blog.rakeshpai.me/2007/02/ies-unknown-runtime-error-when-using.html
      var textArea = document.createElement('textarea');
      textArea.innerHTML = text;
      return textArea.innerHTML.replace(/"/g, '&quot;');
    } catch (e) {
      var pre = document.createElement('pre');
      pre.appendChild(document.createTextNode(text));
      return pre.innerHTML.replace(/"/g, '&quot;');
    }
  }

  /**
   * @external BsbiDb
   */

  var Taxon = /*#__PURE__*/function () {
    function Taxon() {
      _classCallCheck$1(this, Taxon);

      _defineProperty$1(this, "id", void 0);

      _defineProperty$1(this, "nameString", '');

      _defineProperty$1(this, "canonical", '');

      _defineProperty$1(this, "hybridCanonical", '');

      _defineProperty$1(this, "acceptedEntityId", '');

      _defineProperty$1(this, "qualifier", '');

      _defineProperty$1(this, "authority", '');

      _defineProperty$1(this, "vernacular", '');

      _defineProperty$1(this, "vernacularRoot", '');

      _defineProperty$1(this, "used", void 0);

      _defineProperty$1(this, "sortOrder", void 0);

      _defineProperty$1(this, "parentIds", []);
    }

    _createClass(Taxon, [{
      key: "formattedHTML",
      value:
      /**
       *
       * @param {boolean} vernacularMatched
       * @returns {string}
       */
      function formattedHTML(vernacularMatched) {
        var acceptedTaxon;

        if (this.id !== this.acceptedEntityId) {
          acceptedTaxon = Taxon.fromId(this.acceptedEntityId);
        }

        if (Taxon.showVernacular) {
          if (vernacularMatched) {
            return acceptedTaxon ? "<q><b>".concat(escapeHTML(this.vernacular), "</b></q> <span class=\"italictaxon\">").concat(this.nameString).concat(this.qualifier ? " <b>".concat(this.qualifier, "</b>") : '', "</span> <span class=\"taxauthority\">").concat(escapeHTML(this.authority), "</span>") + " = <span class=\"italictaxon\">".concat(acceptedTaxon.nameString).concat(acceptedTaxon.qualifier ? " <b>".concat(acceptedTaxon.qualifier, "</b>") : '', "</span> <span class=\"taxauthority\">").concat(escapeHTML(acceptedTaxon.authority), "</span>") : "<q><b>".concat(escapeHTML(this.vernacular), "</b></q> <span class=\"italictaxon\">").concat(this.nameString).concat(this.qualifier ? " <b>".concat(this.qualifier, "</b>") : '', "</span> <span class=\"taxauthority\">").concat(escapeHTML(this.authority), "</span>");
          } else {
            return acceptedTaxon ? "<span class=\"italictaxon\">".concat(this.nameString).concat(this.qualifier ? " <b>".concat(this.qualifier, "</b>") : '', "</span> <span class=\"taxauthority\">").concat(this.authority, "</span>").concat(this.vernacular ? " <q><b>".concat(escapeHTML(this.vernacular), "</b></q>") : '', " = <span class=\"italictaxon\">").concat(acceptedTaxon.nameString).concat(acceptedTaxon.qualifier ? " <b>".concat(acceptedTaxon.qualifier, "</b>") : '', "</span> <span class=\"taxauthority\">").concat(escapeHTML(acceptedTaxon.authority), "</span>") : "<span class=\"italictaxon\">".concat(this.nameString).concat(this.qualifier ? " <b>".concat(this.qualifier, "</b>") : '', "</span> <span class=\"taxauthority\">").concat(escapeHTML(this.authority), "</span>").concat(this.vernacular ? " <q><b>".concat(escapeHTML(this.vernacular), "</b></q>") : '');
          }
        } else {
          return acceptedTaxon ? "<span class=\"italictaxon\">".concat(this.nameString).concat(this.qualifier ? " <b>".concat(this.qualifier, "</b>") : '', "</span> <span class=\"taxauthority\">").concat(this.authority, "</span>") + " = <span class=\"italictaxon\">".concat(acceptedTaxon.nameString).concat(acceptedTaxon.qualifier ? " <b>".concat(acceptedTaxon.qualifier, "</b>") : '', "</span> <span class=\"taxauthority\">").concat(escapeHTML(acceptedTaxon.authority), "</span>") : "<span class=\"italictaxon\">".concat(this.nameString).concat(this.qualifier ? " <b>".concat(this.qualifier, "</b>") : '', "</span> <span class=\"taxauthority\">").concat(escapeHTML(this.authority), "</span>");
        }
      }
    }], [{
      key: "fromId",
      value:
      /**
       *
       * @param {string} id
       * @returns {Taxon}
       * @throws {TaxonError}
       */
      function fromId(id) {
        if (!Taxon.rawTaxa) {
          // may not yet have been initialised due to deferred loading
          if (BsbiDb.TaxonNames) {
            Taxon.rawTaxa = BsbiDb.TaxonNames;
          } else {
            throw new TaxonError("Taxon.fromId() called before taxon list has loaded.");
          }
        }

        if (!Taxon.rawTaxa.hasOwnProperty(id)) {
          throw new TaxonError("Taxon id '".concat(id, "' not found."));
        }

        var raw = Taxon.rawTaxa[id];
        var taxon = new Taxon();
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
    }]);

    return Taxon;
  }();

  _defineProperty$1(Taxon, "rawTaxa", void 0);

  _defineProperty$1(Taxon, "showVernacular", true);

  // a string of all valid unicode whitespaces
  var whitespaces$2 = '\u0009\u000A\u000B\u000C\u000D\u0020\u00A0\u1680\u2000\u2001\u2002' +
    '\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF';

  var requireObjectCoercible$4 = requireObjectCoercible$9;
  var toString$6 = toString$c;
  var whitespaces$1 = whitespaces$2;

  var whitespace = '[' + whitespaces$1 + ']';
  var ltrim = RegExp('^' + whitespace + whitespace + '*');
  var rtrim = RegExp(whitespace + whitespace + '*$');

  // `String.prototype.{ trim, trimStart, trimEnd, trimLeft, trimRight }` methods implementation
  var createMethod$4 = function (TYPE) {
    return function ($this) {
      var string = toString$6(requireObjectCoercible$4($this));
      if (TYPE & 1) string = string.replace(ltrim, '');
      if (TYPE & 2) string = string.replace(rtrim, '');
      return string;
    };
  };

  var stringTrim = {
    // `String.prototype.{ trimLeft, trimStart }` methods
    // https://tc39.es/ecma262/#sec-string.prototype.trimstart
    start: createMethod$4(1),
    // `String.prototype.{ trimRight, trimEnd }` methods
    // https://tc39.es/ecma262/#sec-string.prototype.trimend
    end: createMethod$4(2),
    // `String.prototype.trim` method
    // https://tc39.es/ecma262/#sec-string.prototype.trim
    trim: createMethod$4(3)
  };

  var PROPER_FUNCTION_NAME = functionName$1.PROPER;
  var fails$4$1 = fails$u;
  var whitespaces = whitespaces$2;

  var non = '\u200B\u0085\u180E';

  // check that a method works with the correct list
  // of whitespaces and has a correct name
  var stringTrimForced = function (METHOD_NAME) {
    return fails$4$1(function () {
      return !!whitespaces[METHOD_NAME]()
        || non[METHOD_NAME]() !== non
        || (PROPER_FUNCTION_NAME && whitespaces[METHOD_NAME].name !== METHOD_NAME);
    });
  };

  var $$e = _export$1;
  var $trim = stringTrim.trim;
  var forcedStringTrimMethod$1 = stringTrimForced;

  // `String.prototype.trim` method
  // https://tc39.es/ecma262/#sec-string.prototype.trim
  $$e({ target: 'String', proto: true, forced: forcedStringTrimMethod$1('trim') }, {
    trim: function trim() {
      return $trim(this);
    }
  });

  function _createSuper$r(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$r(); return function _createSuperInternal() { var Super = _getPrototypeOf$1(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf$1(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn$1(this, result); }; }

  function _isNativeReflectConstruct$r() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

  function _classStaticPrivateFieldSpecSet$1(receiver, classConstructor, descriptor, value) { _classCheckPrivateStaticAccess$3(receiver, classConstructor); _classCheckPrivateStaticFieldDescriptor$3(descriptor, "set"); _classApplyDescriptorSet$1(receiver, descriptor, value); return value; }

  function _classApplyDescriptorSet$1(receiver, descriptor, value) { if (descriptor.set) { descriptor.set.call(receiver, value); } else { if (!descriptor.writable) { throw new TypeError("attempted to set read only private field"); } descriptor.value = value; } }

  function _classStaticPrivateFieldSpecGet$3(receiver, classConstructor, descriptor) { _classCheckPrivateStaticAccess$3(receiver, classConstructor); _classCheckPrivateStaticFieldDescriptor$3(descriptor, "get"); return _classApplyDescriptorGet$3(receiver, descriptor); }

  function _classCheckPrivateStaticFieldDescriptor$3(descriptor, action) { if (descriptor === undefined) { throw new TypeError("attempted to " + action + " private static field before its declaration"); } }

  function _classCheckPrivateStaticAccess$3(receiver, classConstructor) { if (receiver !== classConstructor) { throw new TypeError("Private static access of wrong provenance"); } }

  function _classApplyDescriptorGet$3(receiver, descriptor) { if (descriptor.get) { return descriptor.get.call(receiver); } return descriptor.value; }
  var FormField = /*#__PURE__*/function (_EventHarness) {
    _inherits$1(FormField, _EventHarness);

    var _super = _createSuper$r(FormField);

    /**
     * overall wrapped field element (not necessarily the form element itself)
     *
     * @type {HTMLElement}
     */

    /**
     *
     * @type {string}
     */

    /**
     *
     * @type {string}
     */

    /**
     * validation message - displayed if field is not valid
     * HTML string
     *
     * @type {string}
     */

    /**
     *
     * @type {string}
     */

    /**
     *
     * @type {string}
     */

    /**
     *
     * @param {{[label] : string, [helpText]: string, [validationMessage]: string, [completion]: string}} [params]
     */
    function FormField(params) {
      var _this;

      _classCallCheck$1(this, FormField);

      _this = _super.call(this);

      _defineProperty$1(_assertThisInitialized$1(_this), "_value", void 0);

      _defineProperty$1(_assertThisInitialized$1(_this), "_fieldEl", void 0);

      _defineProperty$1(_assertThisInitialized$1(_this), "label", 'field label');

      _defineProperty$1(_assertThisInitialized$1(_this), "helpText", '');

      _defineProperty$1(_assertThisInitialized$1(_this), "validationMessage", '');

      _defineProperty$1(_assertThisInitialized$1(_this), "completion", FormField.COMPLETION_OPTIONAL);

      _defineProperty$1(_assertThisInitialized$1(_this), "parentForm", void 0);

      _defineProperty$1(_assertThisInitialized$1(_this), "attributeName", void 0);

      if (params) {
        if (params.label) {
          _this.label = params.label;
        }

        if (params.helpText) {
          _this.helpText = params.helpText;
        }

        if (params.validationMessage) {
          _this.validationMessage = params.validationMessage;
        }

        if (params.completion) {
          // @see COMPLETION_COMPULSORY, COMPLETION_DESIRED, COMPLETION_OPTIONAL
          _this.completion = params.completion;
        }
      }

      return _this;
    }

    _createClass(FormField, [{
      key: "value",
      get: function get() {
        return this._value;
      }
      /**
       * @abstract
       * @param value
       */
      ,
      set: function set(value) {}
    }, {
      key: "fieldElement",
      get: function get() {
        if (!this._fieldEl) {
          this.buildField();
        }

        return this._fieldEl;
      }
      /**
       * @type {Form}
       */

    }, {
      key: "addField",
      value: function addField() {
        var formEl = this.parentForm.formElement;
        formEl.appendChild(this.fieldElement);
      }
      /**
       *
       * @param {boolean} isValid
       */

    }, {
      key: "markValidity",
      value: function markValidity(isValid) {}
      /**
       *
       * @param {HTMLInputElement} inputElement
       * @returns {string}
       */

    }], [{
      key: "nextId",
      get: function get() {
        var _FormField$fieldIdInd;

        return "field".concat((_classStaticPrivateFieldSpecSet$1(FormField, FormField, _fieldIdIndex, (_FormField$fieldIdInd = +_classStaticPrivateFieldSpecGet$3(FormField, FormField, _fieldIdIndex)) + 1), _FormField$fieldIdInd));
      }
    }, {
      key: "cleanRawInput",
      value: function cleanRawInput(inputElement) {
        return inputElement.value.trim().replace(/\s\s+/g, ' ');
      }
      /**
       *
       * @param {string} text
       * @returns {string}
       */

    }, {
      key: "cleanRawString",
      value: function cleanRawString(text) {
        return text.trim().replace(/\s\s+/g, ' ');
      }
      /**
       *
       * @param value
       * @returns {boolean}
       */

    }, {
      key: "isEmpty",
      value: function isEmpty(value) {
        return value === '';
      }
      /**
       *
       * @param {string} key
       * @param property properties of the form descriptor
       * @param attributes attributes of the model object
       * @return {(boolean|null)} returns null if validity was not assessed
       */

    }, {
      key: "isValid",
      value: function isValid(key, property, attributes) {
        if (property.attributes.completion && (property.attributes.completion === FormField.COMPLETION_COMPULSORY || property.attributes.completion === FormField.COMPLETION_DESIRED)) {
          // test whether required field is missing
          return !(!attributes.hasOwnProperty(key) || property.field.isEmpty(attributes[key]));
        } // field is present or optional
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

    }, {
      key: "summarise",
      value: function summarise(key, property, attributes) {
        if (property.summary && (!property.summary.hasOwnProperty('summarise') || true === property.summary.summarise)) {
          // test is that summary spec object exists and doesn't have the summarise flag set to false
          return property.field.summariseImpl(key, property, attributes);
        } else {
          return '';
        }
      }
      /**
       * by the time summariseImpl has been called have already checked that summary is wanted
       *
       * @param {string} key
       * @param {{field : FormField, summary : {}}} property properties of the form descriptor
       * @param {{}} attributes attributes of the model object
       * @returns {string}
       */

    }, {
      key: "summariseImpl",
      value: function summariseImpl(key, property, attributes) {
        return '';
      }
    }]);

    return FormField;
  }(EventHarness);

  _defineProperty$1(FormField, "COMPLETION_COMPULSORY", 'compulsory');

  _defineProperty$1(FormField, "COMPLETION_DESIRED", 'desired');

  _defineProperty$1(FormField, "COMPLETION_OPTIONAL", 'optional');

  var _fieldIdIndex = {
    writable: true,
    value: 1
  };

  _defineProperty$1(FormField, "EVENT_CHANGE", 'fieldChange');

  function _createSuper$q(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$q(); return function _createSuperInternal() { var Super = _getPrototypeOf$1(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf$1(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn$1(this, result); }; }

  function _isNativeReflectConstruct$q() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

  function _classPrivateFieldInitSpec$b(obj, privateMap, value) { _checkPrivateRedeclaration$b(obj, privateMap); privateMap.set(obj, value); }

  function _checkPrivateRedeclaration$b(obj, privateCollection) { if (privateCollection.has(obj)) { throw new TypeError("Cannot initialize the same private elements twice on an object"); } }

  function _classStaticPrivateFieldSpecSet(receiver, classConstructor, descriptor, value) { _classCheckPrivateStaticAccess$2(receiver, classConstructor); _classCheckPrivateStaticFieldDescriptor$2(descriptor, "set"); _classApplyDescriptorSet(receiver, descriptor, value); return value; }

  function _classApplyDescriptorSet(receiver, descriptor, value) { if (descriptor.set) { descriptor.set.call(receiver, value); } else { if (!descriptor.writable) { throw new TypeError("attempted to set read only private field"); } descriptor.value = value; } }

  function _classStaticPrivateFieldSpecGet$2(receiver, classConstructor, descriptor) { _classCheckPrivateStaticAccess$2(receiver, classConstructor); _classCheckPrivateStaticFieldDescriptor$2(descriptor, "get"); return _classApplyDescriptorGet$2(receiver, descriptor); }

  function _classCheckPrivateStaticFieldDescriptor$2(descriptor, action) { if (descriptor === undefined) { throw new TypeError("attempted to " + action + " private static field before its declaration"); } }

  function _classCheckPrivateStaticAccess$2(receiver, classConstructor) { if (receiver !== classConstructor) { throw new TypeError("Private static access of wrong provenance"); } }

  function _classApplyDescriptorGet$2(receiver, descriptor) { if (descriptor.get) { return descriptor.get.call(receiver); } return descriptor.value; }

  var _formEl = /*#__PURE__*/new WeakMap();

  var Form = /*#__PURE__*/function (_EventHarness) {
    _inherits$1(Form, _EventHarness);

    var _super = _createSuper$q(Form);

    function Form() {
      var _this;

      _classCallCheck$1(this, Form);

      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      _this = _super.call.apply(_super, [this].concat(args));

      _classPrivateFieldInitSpec$b(_assertThisInitialized$1(_this), _formEl, {
        writable: true,
        value: void 0
      });

      _defineProperty$1(_assertThisInitialized$1(_this), "_formId", void 0);

      _defineProperty$1(_assertThisInitialized$1(_this), "_formContentContainer", void 0);

      _defineProperty$1(_assertThisInitialized$1(_this), "fields", void 0);

      _defineProperty$1(_assertThisInitialized$1(_this), "liveValidation", false);

      _defineProperty$1(_assertThisInitialized$1(_this), "isValid", null);

      _defineProperty$1(_assertThisInitialized$1(_this), "_formFieldsBuilt", false);

      return _this;
    }

    _createClass(Form, [{
      key: "formElement",
      get:
      /**
       *
       * @returns {HTMLElement}
       */
      function get() {
        var _this2 = this;

        if (!_classPrivateFieldGet(this, _formEl)) {
          var _Form$formSerial;

          _classPrivateFieldSet(this, _formEl, document.createElement('form'));

          _classPrivateFieldGet(this, _formEl).id = this._formId = "form".concat((_classStaticPrivateFieldSpecSet(Form, Form, _formSerial, (_Form$formSerial = +_classStaticPrivateFieldSpecGet$2(Form, Form, _formSerial)) + 1), _Form$formSerial));
          _classPrivateFieldGet(this, _formEl).noValidate = true; // bootstrap overrides browser-based validation

          if (this.liveValidation) {
            _classPrivateFieldGet(this, _formEl).className = 'needs-validation';
          }

          this.buildContentContainer(_classPrivateFieldGet(this, _formEl)); //this._formContentContainer = this.#formEl; // currently the form doesn't have any inner liner elements

          _classPrivateFieldGet(this, _formEl).addEventListener('change', function (event) {
            _this2.changeHandler(event);
          }, {
            capture: false
          });
        }

        return _classPrivateFieldGet(this, _formEl);
      }
      /**
       * sets this._formContentContainer to the container that should contain the form fields
       *
       * if no wrapper then can re-use the outer container id (this.#formEl
       */

    }, {
      key: "buildContentContainer",
      value: function buildContentContainer(outerContainer) {
        this._formContentContainer = outerContainer; // default form doesn't have any inner liner elements

        return this._formContentContainer;
      }
    }, {
      key: "changeHandler",
      value: function changeHandler(params) {
        console.log({
          'form change event': params
        });
      }
    }, {
      key: "destructor",
      value: function destructor() {
        _get(_getPrototypeOf$1(Form.prototype), "destructor", this).call(this);

        _classPrivateFieldSet(this, _formEl, null);
      }
    }, {
      key: "buildFormFields",
      value:
      /**
       *
       */
      function buildFormFields() {
        this.initialiseFormFields();

        for (var key in this.fields) {
          if (this.fields.hasOwnProperty(key)) {
            var field = this.fields[key];
            field.parentForm = this;
            field.attributeName = key;

            this._formContentContainer.appendChild(field.fieldElement);

            field.addListener(FormField.EVENT_CHANGE, this.changeHandler.bind(this));
          }
        }

        this._formFieldsBuilt = true;
      }
      /**
       * called after a form change once the model has been updated
       * validation is only applied if the form is subject to live validation
       */

    }, {
      key: "conditionallyValidateForm",
      value: function conditionallyValidateForm() {
        if (this.liveValidation) {
          this.validateForm();
        }
      }
      /**
       *
       * @returns {boolean}
       */

    }, {
      key: "validateForm",
      value: function validateForm() {
        this.liveValidation = true;
        this.formElement.classList.add('needs-validation'); // add a bootstrap class marking that the form should be subject to validation

        var validationResult = this.model.evaluateCompletionStatus(this.getFormSectionProperties());

        for (var key in this.fields) {
          if (this.fields.hasOwnProperty(key)) {
            var field = this.fields[key];
            field.markValidity(validationResult.validity[key]);
          }
        }

        if (this.isValid !== validationResult.requiredFieldsPresent) {
          this.isValid = validationResult.requiredFieldsPresent;
          this.fireEvent(Form.EVENT_VALIDATION_STATE_CHANGE, {
            isValid: this.isValid
          });
        }

        return validationResult.requiredFieldsPresent;
      }
      /**
       * fills in the form fields based on the model
       */

    }, {
      key: "populateFormContent",
      value: function populateFormContent() {
        if (this._formFieldsBuilt) {
          // throw new Error("populateFormContent shouldn't be called until fields have been initialised");
          var model = this.model;

          for (var key in this.fields) {
            if (this.fields.hasOwnProperty(key)) {
              var field = this.fields[key];
              field.value = model.attributes[key]; // value setter will update the field
            }
          }

          this.conditionallyValidateForm();
        }
      }
      /**
       * @abstract
       */

    }, {
      key: "updateModelFromContent",
      value: function updateModelFromContent() {}
    }], [{
      key: "nextId",
      get: function get() {
        var _Form$idIndex;

        return "id".concat((_classStaticPrivateFieldSpecSet(Form, Form, _idIndex, (_Form$idIndex = +_classStaticPrivateFieldSpecGet$2(Form, Form, _idIndex)) + 1), _Form$idIndex));
      }
    }]);

    return Form;
  }(EventHarness);

  _defineProperty$1(Form, "CHANGE_EVENT", 'change');

  var _formSerial = {
    writable: true,
    value: 0
  };

  _defineProperty$1(Form, "EVENT_VALIDATION_STATE_CHANGE", 'validationstatechange');

  var _idIndex = {
    writable: true,
    value: 0
  };

  _defineProperty$1(Form, "COMPLETION_STATUS_UNSTARTED", 'unstarted');

  _defineProperty$1(Form, "COMPLETION_STATUS_COMPLETE", 'complete');

  _defineProperty$1(Form, "COMPLETION_STATUS_IN_PROGRESS", 'inProgress');

  function _createSuper$p(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$p(); return function _createSuperInternal() { var Super = _getPrototypeOf$1(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf$1(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn$1(this, result); }; }

  function _isNativeReflectConstruct$p() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
  var Occurrence = /*#__PURE__*/function (_Model) {
    _inherits$1(Occurrence, _Model);

    var _super = _createSuper$p(Occurrence);

    function Occurrence() {
      var _this;

      _classCallCheck$1(this, Occurrence);

      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      _this = _super.call.apply(_super, [this].concat(args));

      _defineProperty$1(_assertThisInitialized$1(_this), "attributes", {// taxon: {
        //     taxonId: '',
        //     taxonName: '',
        //     vernacularMatch: false
        // }
      });

      _defineProperty$1(_assertThisInitialized$1(_this), "_savedRemotely", false);

      _defineProperty$1(_assertThisInitialized$1(_this), "_savedLocally", false);

      _defineProperty$1(_assertThisInitialized$1(_this), "SAVE_ENDPOINT", '/saveoccurrence.php');

      _defineProperty$1(_assertThisInitialized$1(_this), "TYPE", 'occurrence');

      _defineProperty$1(_assertThisInitialized$1(_this), "isNew", false);

      return _this;
    }

    _createClass(Occurrence, [{
      key: "taxon",
      get:
      /**
       *
       * @returns {(Taxon|null)} returns null for unmatched taxa specified by name
       */
      function get() {
        return this.attributes.taxon && this.attributes.taxon.taxonId ? Taxon.fromId(this.attributes.taxon.taxonId) : null;
      }
    }, {
      key: "setForm",
      value:
      /**
       *
       * @param {Form} form
       * @returns {Form}
       */
      function setForm(form) {
        if (!this.isNew) {
          form.liveValidation = true;
        }

        form.addListener(Form.CHANGE_EVENT, this.formChangedHandler.bind(this));
        return form;
      }
      /**
       * called after the form has changed, before the values have been read back in to the occurrence
       *
       * @param {{form: Form}} params
       */

    }, {
      key: "formChangedHandler",
      value: function formChangedHandler(params) {
        console.log('Occurrence change handler invoked.'); // read new values
        // then fire it's own change event (Occurrence.EVENT_MODIFIED)

        params.form.updateModelFromContent(); // refresh the form's validation state

        params.form.conditionallyValidateForm();
        this.touch();
        this.fireEvent(Occurrence.EVENT_MODIFIED, {
          occurrenceId: this.id
        });
      }
    }, {
      key: "delete",
      value: function _delete() {
        if (!this.deleted) {
          this.touch();
          this.deleted = true;
          this.fireEvent(Occurrence.EVENT_MODIFIED, {
            occurrenceId: this.id
          });
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

    }, {
      key: "save",
      value: function save(surveyId) {
        if (!this._savedRemotely) {
          var formData = new FormData();

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
          return Promise.reject("".concat(this.id, " has already been saved."));
        }
      }
      /**
       *
       * @param {{id : string, saveState: string, attributes: Object.<string, *>, deleted: boolean|string, created: number, modified: number, projectId: number, surveyId: string}} descriptor
       */

    }, {
      key: "_parseDescriptor",
      value: function _parseDescriptor(descriptor) {
        _get(_getPrototypeOf$1(Occurrence.prototype), "_parseDescriptor", this).call(this, descriptor);

        this.surveyId = descriptor.surveyId;
      }
    }]);

    return Occurrence;
  }(Model);

  _defineProperty$1(Occurrence, "EVENT_MODIFIED", 'modified');

  function _createSuper$o(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$o(); return function _createSuperInternal() { var Super = _getPrototypeOf$1(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf$1(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn$1(this, result); }; }

  function _isNativeReflectConstruct$o() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

  /**
   *
   */
  var InternalAppError = /*#__PURE__*/function (_Error) {
    _inherits$1(InternalAppError, _Error);

    var _super = _createSuper$o(InternalAppError);

    function InternalAppError() {
      _classCallCheck$1(this, InternalAppError);

      return _super.apply(this, arguments);
    }

    return InternalAppError;
  }( /*#__PURE__*/_wrapNativeSuper(Error));

  function _createSuper$n(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$n(); return function _createSuperInternal() { var Super = _getPrototypeOf$1(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf$1(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn$1(this, result); }; }

  function _isNativeReflectConstruct$n() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

  function _classPrivateFieldInitSpec$a(obj, privateMap, value) { _checkPrivateRedeclaration$a(obj, privateMap); privateMap.set(obj, value); }

  function _checkPrivateRedeclaration$a(obj, privateCollection) { if (privateCollection.has(obj)) { throw new TypeError("Cannot initialize the same private elements twice on an object"); } }

  var _currentOccurrenceId = /*#__PURE__*/new WeakMap();

  var MainController = /*#__PURE__*/function (_AppController) {
    _inherits$1(MainController, _AppController);

    var _super = _createSuper$n(MainController);

    /**
     *
     * @param {MainView} view
     */
    function MainController(view) {
      var _this;

      _classCallCheck$1(this, MainController);

      _this = _super.call(this);

      _defineProperty$1(_assertThisInitialized$1(_this), "route", '/list/:action/:id');

      _defineProperty$1(_assertThisInitialized$1(_this), "title", 'App homepage');

      _defineProperty$1(_assertThisInitialized$1(_this), "app", void 0);

      _defineProperty$1(_assertThisInitialized$1(_this), "view", void 0);

      _classPrivateFieldInitSpec$a(_assertThisInitialized$1(_this), _currentOccurrenceId, {
        writable: true,
        value: ''
      });

      _defineProperty$1(_assertThisInitialized$1(_this), "needsFullRefresh", true);

      _defineProperty$1(_assertThisInitialized$1(_this), "needRightPanelRefresh", true);

      _defineProperty$1(_assertThisInitialized$1(_this), "viewSubcontext", '');

      _defineProperty$1(_assertThisInitialized$1(_this), "surveySection", void 0);

      _defineProperty$1(_assertThisInitialized$1(_this), "leftPanelBaseRoute", '');

      _defineProperty$1(_assertThisInitialized$1(_this), "viewContexts", {
        /**
         * @this {MainController}
         * @param {({[id] : string}|null)} queryParameters
         */
        record: function record(queryParameters) {
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
          } else if (_classPrivateFieldGet(this, _currentOccurrenceId) !== queryParameters.id) {
            this.needRightPanelRefresh = true;
            this.currentOccurrenceId = queryParameters.id ? queryParameters.id : '';
          } else {
            this.needRightPanelRefresh = false;
          }

          this.leftPanelBaseRoute = '/list/record';
        },

        /**
         * @this {MainController}
         * @param {{[section]: string}} queryParameters
         */
        survey: function survey(queryParameters) {
          console.log("in survey section ".concat(queryParameters.section));
          this.currentOccurrenceId = '';
          this.needRightPanelRefresh = true;
          this.surveySection = queryParameters.section;
          this.leftPanelBaseRoute = "/list/survey/".concat(queryParameters.section);
        }
      });

      _this.view = view;
      view.controller = _assertThisInitialized$1(_this);
      _this.handle = AppController.nextHandle;
      view.addListener(MainController.EVENT_SELECT_OCCURRENCE, _this.occurrenceSelectionHandler.bind(_assertThisInitialized$1(_this)));
      view.addListener(MainController.EVENT_SELECT_SURVEY_SECTION, _this.surveyPartSelectionHandler.bind(_assertThisInitialized$1(_this)));
      view.addListener(MainController.EVENT_NEW_RECORD, _this.newRecordHandler.bind(_assertThisInitialized$1(_this)));
      view.addListener(MainController.EVENT_DELETE_OCCURRENCE, _this.deleteOccurrenceHandler.bind(_assertThisInitialized$1(_this)));
      view.addListener(MainController.EVENT_BACK, _this.backHandler.bind(_assertThisInitialized$1(_this)));
      view.addListener(MainController.EVENT_NEXT_TO_RECORDS, _this.nextTransitionToRecordsHandler.bind(_assertThisInitialized$1(_this)));
      return _this;
    }
    /**
     * handler for event fired on and by view when 'next section' button has been click, leading to the records section
     * this will expand the list of records, or if none exist, add a first one and open it
     */


    _createClass(MainController, [{
      key: "occurrences",
      get:
      /**
       * event fired on and by view when 'next section' button has been click, leading to the records section
       * this will expand the list of records, or if none exist, add a first one and open it
       *
       * @type {string}
       */

      /**
       * ? should be overridden by child class
       *
       * @type {string}
       */

      /**
       * @type {App}
       */

      /**
       *
       * @type {MainView}
       */

      /**
       * @type {string}
       */

      /**
       * set if the view needs full layout rendering
       * @todo this should possibly be a view rather than controller property
       * @type {boolean}
       */

      /**
       * set if the currently displayed occurrence needs revision
       * @todo this should possibly be a view rather than controller property
       * @type {boolean}
       */

      /**
       *
       * @type {string}
       */

      /**
       * Currently displayed survey subsection
       *
       * @type {string|null}
       */

      /**
       * this is the route that the 'back button' in a right-hand panel view should resolve to
       * @type {string}
       */

      /**
       * ultimately this getter might be the point at which to apply filters
       *
       * @returns {Map.<string,Occurrence>}
       */
      function get() {
        return this.app.occurrences;
      }
      /**
       *
       * @returns {null|Occurrence}
       */

    }, {
      key: "currentOccurrence",
      get: function get() {
        if (_classPrivateFieldGet(this, _currentOccurrenceId)) {
          if (this.app.occurrences.has(_classPrivateFieldGet(this, _currentOccurrenceId))) {
            return this.app.occurrences.get(_classPrivateFieldGet(this, _currentOccurrenceId));
          } else {
            throw new NotFoundError("Record id '".concat(_classPrivateFieldGet(this, _currentOccurrenceId), "' was not found."));
          }
        } else {
          return null;
        }
      }
      /**
       *
       * @returns {string}
       */

    }, {
      key: "currentOccurrenceId",
      get: function get() {
        return _classPrivateFieldGet(this, _currentOccurrenceId);
      }
      /**
       *
       * @param {string} occurrenceId
       */
      ,
      set: function set(occurrenceId) {
        _classPrivateFieldSet(this, _currentOccurrenceId, occurrenceId);
      }
      /**
       *
       * @returns {Survey}
       */

    }, {
      key: "survey",
      get: function get() {
        return this.app.currentSurvey;
      }
    }, {
      key: "nextTransitionToRecordsHandler",
      value: function nextTransitionToRecordsHandler() {
        console.log('in nextTransitionToRecordsHandler()');

        if (this.app.haveExtantOccurrences()) {
          this.app.router.navigate('/list/record/');
        } else {
          this.newRecordHandler();
        }
      }
      /**
       *
       * @param {{occurrenceId : string}} parameters
       */

    }, {
      key: "deleteOccurrenceHandler",
      value: function deleteOccurrenceHandler(parameters) {
        console.log({
          deleting: parameters.occurrenceId
        });
        var occurrence = this.app.occurrences.get(parameters.occurrenceId);

        if (!occurrence) {
          throw new InternalAppError("Occurrence id '".concat(parameters.occurrenceId, "' not found when trying to delete."));
        }

        occurrence.delete();

        if (this.currentOccurrenceId === parameters.occurrenceId) {
          this.app.router.navigate("/list/record/");
        }
      }
      /**
       *
       * @param {{sectionKey : string}} params
       */

    }, {
      key: "surveyPartSelectionHandler",
      value: function surveyPartSelectionHandler(params) {
        console.log({
          'In surveyPartSelectionHandler': params
        });

        if (params.sectionKey === 'record') {
          this.app.router.navigate("/list/record/");
        } else if (params.sectionKey) {
          this.app.router.navigate("/list/survey/".concat(params.sectionKey));
        } else {
          this.app.router.navigate("/list/");
        }
      }
      /**
       * may be invoked directly or in response to the Add New Record event
       * therefore assume that the method receives no event parameters
       */

    }, {
      key: "newRecordHandler",
      value: function newRecordHandler() {
        var occurrence = this.app.addNewOccurrence();
        this.app.router.navigate("/list/record/".concat(occurrence.id));
      }
      /**
       *
       * @param {{occurrenceId : string}} params
       */

    }, {
      key: "occurrenceSelectionHandler",
      value: function occurrenceSelectionHandler(params) {
        console.log({
          'In occurrenceSelectionHandler': params
        });

        if (this.currentOccurrenceId && params.occurrenceId && this.currentOccurrenceId === params.occurrenceId) {
          console.log("ignoring spurious navigation event for '".concat(params.occurrenceId, "'"));
        } else {
          this.app.router.navigate("/list/record/".concat(params.occurrenceId));
        }
      }
      /**
       * registers the default route from this.route
       * or alternatively is overridden in a child class
       *
       * @param {Navigo} router
       */

    }, {
      key: "registerRoute",
      value: function registerRoute(router) {
        router.on('/list', this.mainRouteHandler.bind(this, 'list', '', ''), {
          before: this.beforeRouteHandler ? this.beforeRouteHandler.bind(this) : null,
          after: this.afterRouteHandler ? this.afterRouteHandler.bind(this) : null,
          leave: this.leaveRouteHandler ? this.leaveRouteHandler.bind(this) : null,
          already: this.alreadyRouteHandler ? this.alreadyRouteHandler.bind(this) : null
        });
        router.on('/list/help', this.mainRouteHandler.bind(this, 'list', '', 'help'));
        router.on('/list/record/', this.mainRouteHandler.bind(this, 'list', 'record', ''), {
          before: this.beforeRouteHandler ? this.beforeRouteHandler.bind(this) : null,
          after: this.afterRouteHandler ? this.afterRouteHandler.bind(this) : null,
          leave: this.leaveRouteHandler ? this.leaveRouteHandler.bind(this) : null,
          already: this.alreadyRouteHandler ? this.alreadyRouteHandler.bind(this) : null
        });
        router.on('/list/record/help', this.mainRouteHandler.bind(this, 'list', 'record', 'help'));
        router.on('/list/record/:id', this.mainRouteHandler.bind(this, 'list', 'record', 'form'), {
          before: this.beforeRouteHandler ? this.beforeRouteHandler.bind(this) : null,
          after: this.afterRouteHandler ? this.afterRouteHandler.bind(this) : null,
          leave: this.leaveRouteHandler ? this.leaveRouteHandler.bind(this) : null,
          already: this.alreadyRouteHandler ? this.alreadyRouteHandler.bind(this) : null
        });
        router.on('/list/survey/:section', this.mainRouteHandler.bind(this, 'list', 'survey', ''), {
          before: this.beforeRouteHandler ? this.beforeRouteHandler.bind(this) : null,
          after: this.afterRouteHandler ? this.afterRouteHandler.bind(this) : null,
          leave: this.leaveRouteHandler ? this.leaveRouteHandler.bind(this) : null,
          already: this.alreadyRouteHandler ? this.alreadyRouteHandler.bind(this) : null
        });
        router.on('/list/survey/:section/help', this.mainRouteHandler.bind(this, 'list', 'survey', 'help'));
      }
      /**
       *
       * @param {string} context typically 'list'
       * @param {('record'|'survey')} subcontext record|survey
       * @param {(''|'help')} rhs
       * @param {Object.<string, string>} queryParameters
       */

    }, {
      key: "mainRouteHandler",
      value: function mainRouteHandler(context, subcontext, rhs, queryParameters) {
        console.log("reached special route handler for MainController.js");
        console.log({
          context: context,
          params: subcontext,
          query: queryParameters
        });
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
          console.log({
            error: error
          }); // attempt to carry on regardless to some extent (error should be reported in the view)
          // but wrap in a further try just in case

          try {
            this.needsFullRefresh = true;
            this.view.display();
          } catch (rethrownError) {
            console.log({
              rethrownError: rethrownError
            });
            document.body.innerHTML = "<h2>Internal error</h2><p>Please report this problem:</p><p>".concat(rethrownError.message, "</p>");
          }
        }
      }
    }, {
      key: "backHandler",
      value: function backHandler() {
        if (this.app.routeHistory.length >= 2 && this.app.routeHistory[this.app.routeHistory.length - 2].url === this.leftPanelBaseRoute) {
          this.app.routeHistory.length -= 1;
          console.log('using standard back navigation');
          window.history.back(); //console.log('fell through back!');
        } else {
          console.log("navigating back using base address '".concat(this.leftPanelBaseRoute, "'"));
          this.app.router.navigate(this.leftPanelBaseRoute);
        }
      }
    }]);

    return MainController;
  }(AppController);

  _defineProperty$1(MainController, "EVENT_SELECT_OCCURRENCE", 'selectoccurrence');

  _defineProperty$1(MainController, "EVENT_SELECT_SURVEY_SECTION", 'selectsurveysection');

  _defineProperty$1(MainController, "EVENT_NEW_RECORD", 'newrecord');

  _defineProperty$1(MainController, "EVENT_DELETE_OCCURRENCE", 'deleteoccurrence');

  _defineProperty$1(MainController, "EVENT_BACK", 'back');

  _defineProperty$1(MainController, "EVENT_NEXT_TO_RECORDS", 'nexttorecords');

  var fixRegExpWellKnownSymbolLogic$1 = fixRegexpWellKnownSymbolLogic;
  var anObject$3 = anObject$l;
  var toLength$2 = toLength$5;
  var toString$5 = toString$c;
  var requireObjectCoercible$3 = requireObjectCoercible$9;
  var getMethod$2 = getMethod$7;
  var advanceStringIndex$2 = advanceStringIndex$4;
  var regExpExec$1 = regexpExecAbstract;

  // @@match logic
  fixRegExpWellKnownSymbolLogic$1('match', function (MATCH, nativeMatch, maybeCallNative) {
    return [
      // `String.prototype.match` method
      // https://tc39.es/ecma262/#sec-string.prototype.match
      function match(regexp) {
        var O = requireObjectCoercible$3(this);
        var matcher = regexp == undefined ? undefined : getMethod$2(regexp, MATCH);
        return matcher ? matcher.call(regexp, O) : new RegExp(regexp)[MATCH](toString$5(O));
      },
      // `RegExp.prototype[@@match]` method
      // https://tc39.es/ecma262/#sec-regexp.prototype-@@match
      function (string) {
        var rx = anObject$3(this);
        var S = toString$5(string);
        var res = maybeCallNative(nativeMatch, rx, S);

        if (res.done) return res.value;

        if (!rx.global) return regExpExec$1(rx, S);

        var fullUnicode = rx.unicode;
        rx.lastIndex = 0;
        var A = [];
        var n = 0;
        var result;
        while ((result = regExpExec$1(rx, S)) !== null) {
          var matchStr = toString$5(result[0]);
          A[n] = matchStr;
          if (matchStr === '') rx.lastIndex = advanceStringIndex$2(S, toLength$2(rx.lastIndex), fullUnicode);
          n++;
        }
        return n === 0 ? null : A;
      }
    ];
  });

  var $$d = _export$1;
  var isArray$5 = isArray$4;
  var isConstructor$1$1 = isConstructor$4;
  var isObject$2$1 = isObject$k;
  var toAbsoluteIndex$1$1 = toAbsoluteIndex$3;
  var lengthOfArrayLike$3 = lengthOfArrayLike$8;
  var toIndexedObject$1$1 = toIndexedObject$a;
  var createProperty$2 = createProperty$5;
  var wellKnownSymbol$4$1 = wellKnownSymbol$q;
  var arrayMethodHasSpeciesSupport$2 = arrayMethodHasSpeciesSupport$5;

  var HAS_SPECIES_SUPPORT$2 = arrayMethodHasSpeciesSupport$2('slice');

  var SPECIES$7 = wellKnownSymbol$4$1('species');
  var nativeSlice = [].slice;
  var max$1 = Math.max;

  // `Array.prototype.slice` method
  // https://tc39.es/ecma262/#sec-array.prototype.slice
  // fallback for not array-like ES3 strings and DOM objects
  $$d({ target: 'Array', proto: true, forced: !HAS_SPECIES_SUPPORT$2 }, {
    slice: function slice(start, end) {
      var O = toIndexedObject$1$1(this);
      var length = lengthOfArrayLike$3(O);
      var k = toAbsoluteIndex$1$1(start, length);
      var fin = toAbsoluteIndex$1$1(end === undefined ? length : end, length);
      // inline `ArraySpeciesCreate` for usage native `Array#slice` where it's possible
      var Constructor, result, n;
      if (isArray$5(O)) {
        Constructor = O.constructor;
        // cross-realm fallback
        if (isConstructor$1$1(Constructor) && (Constructor === Array || isArray$5(Constructor.prototype))) {
          Constructor = undefined;
        } else if (isObject$2$1(Constructor)) {
          Constructor = Constructor[SPECIES$7];
          if (Constructor === null) Constructor = undefined;
        }
        if (Constructor === Array || Constructor === undefined) {
          return nativeSlice.call(O, k, fin);
        }
      }
      result = new (Constructor === undefined ? Array : Constructor)(max$1(fin - k, 0));
      for (n = 0; k < fin; k++, n++) if (k in O) createProperty$2(result, n, O[k]);
      result.length = n;
      return result;
    }
  });

  var DESCRIPTORS$3$1 = descriptors$1;
  var FUNCTION_NAME_EXISTS = functionName$1.EXISTS;
  var defineProperty$3 = objectDefineProperty$1.f;

  var FunctionPrototype$2 = Function.prototype;
  var FunctionPrototypeToString = FunctionPrototype$2.toString;
  var nameRE = /^\s*function ([^ (]*)/;
  var NAME = 'name';

  // Function instances `.name` property
  // https://tc39.es/ecma262/#sec-function-instances-name
  if (DESCRIPTORS$3$1 && !FUNCTION_NAME_EXISTS) {
    defineProperty$3(FunctionPrototype$2, NAME, {
      configurable: true,
      get: function () {
        try {
          return FunctionPrototypeToString.call(this).match(nameRE)[1];
        } catch (error) {
          return '';
        }
      }
    });
  }

  var anObject$2$1 = anObject$l;
  var iteratorClose = iteratorClose$2;

  // call something on iterator step with safe closing on error
  var callWithSafeIterationClosing$1 = function (iterator, fn, value, ENTRIES) {
    try {
      return ENTRIES ? fn(anObject$2$1(value)[0], value[1]) : fn(value);
    } catch (error) {
      iteratorClose(iterator, 'throw', error);
    }
  };

  var bind$1 = functionBindContext;
  var toObject$2$1 = toObject$a;
  var callWithSafeIterationClosing = callWithSafeIterationClosing$1;
  var isArrayIteratorMethod = isArrayIteratorMethod$2;
  var isConstructor$5 = isConstructor$4;
  var lengthOfArrayLike$2$1 = lengthOfArrayLike$8;
  var createProperty$1$1 = createProperty$5;
  var getIterator = getIterator$2;
  var getIteratorMethod = getIteratorMethod$3;

  // `Array.from` method implementation
  // https://tc39.es/ecma262/#sec-array.from
  var arrayFrom = function from(arrayLike /* , mapfn = undefined, thisArg = undefined */) {
    var O = toObject$2$1(arrayLike);
    var IS_CONSTRUCTOR = isConstructor$5(this);
    var argumentsLength = arguments.length;
    var mapfn = argumentsLength > 1 ? arguments[1] : undefined;
    var mapping = mapfn !== undefined;
    if (mapping) mapfn = bind$1(mapfn, argumentsLength > 2 ? arguments[2] : undefined, 2);
    var iteratorMethod = getIteratorMethod(O);
    var index = 0;
    var length, result, step, iterator, next, value;
    // if the target is not iterable or it's an array with the default iterator - use a simple case
    if (iteratorMethod && !(this == Array && isArrayIteratorMethod(iteratorMethod))) {
      iterator = getIterator(O, iteratorMethod);
      next = iterator.next;
      result = IS_CONSTRUCTOR ? new this() : [];
      for (;!(step = next.call(iterator)).done; index++) {
        value = mapping ? callWithSafeIterationClosing(iterator, mapfn, [step.value, index], true) : step.value;
        createProperty$1$1(result, index, value);
      }
    } else {
      length = lengthOfArrayLike$2$1(O);
      result = IS_CONSTRUCTOR ? new this(length) : Array(length);
      for (;length > index; index++) {
        value = mapping ? mapfn(O[index], index) : O[index];
        createProperty$1$1(result, index, value);
      }
    }
    result.length = index;
    return result;
  };

  var $$c = _export$1;
  var from = arrayFrom;
  var checkCorrectnessOfIteration = checkCorrectnessOfIteration$3;

  var INCORRECT_ITERATION = !checkCorrectnessOfIteration(function (iterable) {
    // eslint-disable-next-line es/no-array-from -- required for testing
    Array.from(iterable);
  });

  // `Array.from` method
  // https://tc39.es/ecma262/#sec-array.from
  $$c({ target: 'Array', stat: true, forced: INCORRECT_ITERATION }, {
    from: from
  });

  var $$b = _export$1;
  var DESCRIPTORS$2$1 = descriptors$1;
  var global$2$1 = global$t;
  var hasOwn$1$1 = hasOwnProperty_1$1;
  var isCallable$p = isCallable$o;
  var isObject$1$1 = isObject$k;
  var defineProperty$2 = objectDefineProperty$1.f;
  var copyConstructorProperties$3 = copyConstructorProperties$2;

  var NativeSymbol = global$2$1.Symbol;

  if (DESCRIPTORS$2$1 && isCallable$p(NativeSymbol) && (!('description' in NativeSymbol.prototype) ||
    // Safari 12 bug
    NativeSymbol().description !== undefined
  )) {
    var EmptyStringDescriptionStore = {};
    // wrap Symbol constructor for correct work with undefined description
    var SymbolWrapper = function Symbol() {
      var description = arguments.length < 1 || arguments[0] === undefined ? undefined : String(arguments[0]);
      var result = this instanceof SymbolWrapper
        ? new NativeSymbol(description)
        // in Edge 13, String(Symbol(undefined)) === 'Symbol(undefined)'
        : description === undefined ? NativeSymbol() : NativeSymbol(description);
      if (description === '') EmptyStringDescriptionStore[result] = true;
      return result;
    };
    copyConstructorProperties$3(SymbolWrapper, NativeSymbol);
    var symbolPrototype = SymbolWrapper.prototype = NativeSymbol.prototype;
    symbolPrototype.constructor = SymbolWrapper;

    var symbolToString = symbolPrototype.toString;
    var nativeSymbol$2 = String(NativeSymbol('test')) == 'Symbol(test)';
    var regexp = /^Symbol\((.*)\)[^)]+$/;
    defineProperty$2(symbolPrototype, 'description', {
      configurable: true,
      get: function description() {
        var symbol = isObject$1$1(this) ? this.valueOf() : this;
        var string = symbolToString.call(symbol);
        if (hasOwn$1$1(EmptyStringDescriptionStore, symbol)) return '';
        var desc = nativeSymbol$2 ? string.slice(7, -1) : string.replace(regexp, '$1');
        return desc === '' ? undefined : desc;
      }
    });

    $$b({ global: true, forced: true }, {
      Symbol: SymbolWrapper
    });
  }

  var defineWellKnownSymbol = defineWellKnownSymbol$2;

  // `Symbol.iterator` well-known symbol
  // https://tc39.es/ecma262/#sec-symbol.iterator
  defineWellKnownSymbol('iterator');

  var $$a = _export$1;
  var IndexedObject$3 = indexedObject$1;
  var toIndexedObject$b = toIndexedObject$a;
  var arrayMethodIsStrict$1 = arrayMethodIsStrict$3;

  var nativeJoin = [].join;

  var ES3_STRINGS = IndexedObject$3 != Object;
  var STRICT_METHOD$1 = arrayMethodIsStrict$1('join', ',');

  // `Array.prototype.join` method
  // https://tc39.es/ecma262/#sec-array.prototype.join
  $$a({ target: 'Array', proto: true, forced: ES3_STRINGS || !STRICT_METHOD$1 }, {
    join: function join(separator) {
      return nativeJoin.call(toIndexedObject$b(this), separator === undefined ? ',' : separator);
    }
  });

  var newSurveyModal = "<!-- begin: templates/newSurveyModal.html -->\r\n<div class=\"modal fade\" id=\"newsurveymodal\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"newsurveymodalTitle\" aria-hidden=\"true\">\r\n    <div class=\"modal-dialog modal-dialog-centered\" role=\"document\">\r\n        <div class=\"modal-content\">\r\n            <div class=\"modal-header\">\r\n                <h5 class=\"modal-title\" id=\"newsurveymodalTitle\">Start a new survey?</h5>\r\n                <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\">\r\n                    <span aria-hidden=\"true\">&times;</span>\r\n                </button>\r\n            </div>\r\n            <div class=\"modal-body\">\r\n                Please confirm that you wish to start a new survey. You only need to do this if you wish to send a set of records from a different locality, otherwise please add more records to your current report.\r\n            </div>\r\n            <div class=\"modal-footer\">\r\n                <button type=\"button\" class=\"btn btn-secondary\" data-dismiss=\"modal\">Back</button>\r\n                <button type=\"button\" class=\"btn btn-danger\" data-dismiss=\"modal\" id=\"newsurveymodalconfirmed\">New survey</button>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>\r\n<!-- end: templates/newSurveyModal.html -->\r\n";

  var resetModal = "<!-- begin: templates/resetModal.html -->\r\n<div class=\"modal fade\" id=\"resetmodal\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"resetmodalTitle\" aria-hidden=\"true\">\r\n    <div class=\"modal-dialog modal-dialog-centered\" role=\"document\">\r\n        <div class=\"modal-content\">\r\n            <div class=\"modal-header\">\r\n                <h5 class=\"modal-title\" id=\"resetmodalTitle\">Reset?</h5>\r\n                <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\">\r\n                    <span aria-hidden=\"true\">&times;</span>\r\n                </button>\r\n            </div>\r\n            <div class=\"modal-body\">\r\n                Please confirm that you wish to clear out your survey data.\r\n                <p>Warning: any unsaved changes will be lost.</p>\r\n            </div>\r\n            <div class=\"modal-footer\">\r\n                <button type=\"button\" class=\"btn btn-secondary\" data-dismiss=\"modal\">Back</button>\r\n                <button type=\"button\" class=\"btn btn-danger\" data-dismiss=\"modal\" id=\"resetmodalconfirmed\">Reset</button>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>\r\n<!-- end: templates/resetModal.html -->\r\n";

  var saveAllSuccessModal = "<!-- begin: templates/syncSuccessModal.html -->\r\n<div class=\"modal fade\" id=\"saveallsuccess\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"saveallsuccessTitle\" aria-hidden=\"true\">\r\n    <div class=\"modal-dialog modal-dialog-centered\" role=\"document\">\r\n        <div class=\"modal-content\">\r\n            <div class=\"modal-header\">\r\n                <h5 class=\"modal-title\" id=\"saveallsuccessTitle\">All records sent</h5>\r\n                <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\">\r\n                    <span aria-hidden=\"true\">&times;</span>\r\n                </button>\r\n            </div>\r\n            <div class=\"modal-body\">\r\n                Your data has been synchronised with the server.\r\n                <p>Thank you.</p>\r\n            </div>\r\n            <div class=\"modal-footer\">\r\n                <button type=\"button\" class=\"btn btn-secondary\" data-dismiss=\"modal\">Close</button>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>\r\n<!-- end: templates/syncSuccessModal.html -->\r\n";

  var saveAllFailureModal = "<!-- begin: templates/syncFailureModal.html -->\r\n<div class=\"modal fade\" id=\"saveallfailure\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"saveallfailureTitle\" aria-hidden=\"true\">\r\n    <div class=\"modal-dialog modal-dialog-centered\" role=\"document\">\r\n        <div class=\"modal-content\">\r\n            <div class=\"modal-header\">\r\n                <h5 class=\"modal-title\" id=\"saveallfailureTitle\">One or more records could not be saved</h5>\r\n                <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\">\r\n                    <span aria-hidden=\"true\">&times;</span>\r\n                </button>\r\n            </div>\r\n            <div class=\"modal-body\">\r\n                Please check your connection to the network and try again.\r\n            </div>\r\n            <div class=\"modal-footer\">\r\n                <button type=\"button\" class=\"btn btn-secondary\" data-dismiss=\"modal\">Close</button>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>\r\n<!-- end: templates/syncFailureModal.html -->\r\n";

  function _arrayWithHoles(arr) {
    if (Array.isArray(arr)) return arr;
  }

  function _iterableToArrayLimit(arr, i) {
    var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];

    if (_i == null) return;
    var _arr = [];
    var _n = true;
    var _d = false;

    var _s, _e;

    try {
      for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);

        if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i["return"] != null) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }

    return _arr;
  }

  function _arrayLikeToArray$8(arr, len) {
    if (len == null || len > arr.length) len = arr.length;

    for (var i = 0, arr2 = new Array(len); i < len; i++) {
      arr2[i] = arr[i];
    }

    return arr2;
  }

  function _unsupportedIterableToArray$8(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _arrayLikeToArray$8(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$8(o, minLen);
  }

  function _nonIterableRest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }

  function _slicedToArray(arr, i) {
    return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray$8(arr, i) || _nonIterableRest();
  }

  var defineProperty$1 = objectDefineProperty$1.f;
  var create = objectCreate;
  var redefineAll = redefineAll$4;
  var bind = functionBindContext;
  var anInstance = anInstance$4;
  var iterate = iterate$4;
  var defineIterator = defineIterator$3;
  var setSpecies$1 = setSpecies$3;
  var DESCRIPTORS$1$1 = descriptors$1;
  var fastKey = internalMetadata.exports.fastKey;
  var InternalStateModule$1 = internalState$1;

  var setInternalState$1 = InternalStateModule$1.set;
  var internalStateGetterFor = InternalStateModule$1.getterFor;

  var collectionStrong$1 = {
    getConstructor: function (wrapper, CONSTRUCTOR_NAME, IS_MAP, ADDER) {
      var C = wrapper(function (that, iterable) {
        anInstance(that, C, CONSTRUCTOR_NAME);
        setInternalState$1(that, {
          type: CONSTRUCTOR_NAME,
          index: create(null),
          first: undefined,
          last: undefined,
          size: 0
        });
        if (!DESCRIPTORS$1$1) that.size = 0;
        if (iterable != undefined) iterate(iterable, that[ADDER], { that: that, AS_ENTRIES: IS_MAP });
      });

      var getInternalState = internalStateGetterFor(CONSTRUCTOR_NAME);

      var define = function (that, key, value) {
        var state = getInternalState(that);
        var entry = getEntry(that, key);
        var previous, index;
        // change existing entry
        if (entry) {
          entry.value = value;
        // create new entry
        } else {
          state.last = entry = {
            index: index = fastKey(key, true),
            key: key,
            value: value,
            previous: previous = state.last,
            next: undefined,
            removed: false
          };
          if (!state.first) state.first = entry;
          if (previous) previous.next = entry;
          if (DESCRIPTORS$1$1) state.size++;
          else that.size++;
          // add to index
          if (index !== 'F') state.index[index] = entry;
        } return that;
      };

      var getEntry = function (that, key) {
        var state = getInternalState(that);
        // fast case
        var index = fastKey(key);
        var entry;
        if (index !== 'F') return state.index[index];
        // frozen object case
        for (entry = state.first; entry; entry = entry.next) {
          if (entry.key == key) return entry;
        }
      };

      redefineAll(C.prototype, {
        // `{ Map, Set }.prototype.clear()` methods
        // https://tc39.es/ecma262/#sec-map.prototype.clear
        // https://tc39.es/ecma262/#sec-set.prototype.clear
        clear: function clear() {
          var that = this;
          var state = getInternalState(that);
          var data = state.index;
          var entry = state.first;
          while (entry) {
            entry.removed = true;
            if (entry.previous) entry.previous = entry.previous.next = undefined;
            delete data[entry.index];
            entry = entry.next;
          }
          state.first = state.last = undefined;
          if (DESCRIPTORS$1$1) state.size = 0;
          else that.size = 0;
        },
        // `{ Map, Set }.prototype.delete(key)` methods
        // https://tc39.es/ecma262/#sec-map.prototype.delete
        // https://tc39.es/ecma262/#sec-set.prototype.delete
        'delete': function (key) {
          var that = this;
          var state = getInternalState(that);
          var entry = getEntry(that, key);
          if (entry) {
            var next = entry.next;
            var prev = entry.previous;
            delete state.index[entry.index];
            entry.removed = true;
            if (prev) prev.next = next;
            if (next) next.previous = prev;
            if (state.first == entry) state.first = next;
            if (state.last == entry) state.last = prev;
            if (DESCRIPTORS$1$1) state.size--;
            else that.size--;
          } return !!entry;
        },
        // `{ Map, Set }.prototype.forEach(callbackfn, thisArg = undefined)` methods
        // https://tc39.es/ecma262/#sec-map.prototype.foreach
        // https://tc39.es/ecma262/#sec-set.prototype.foreach
        forEach: function forEach(callbackfn /* , that = undefined */) {
          var state = getInternalState(this);
          var boundFunction = bind(callbackfn, arguments.length > 1 ? arguments[1] : undefined, 3);
          var entry;
          while (entry = entry ? entry.next : state.first) {
            boundFunction(entry.value, entry.key, this);
            // revert to the last existing entry
            while (entry && entry.removed) entry = entry.previous;
          }
        },
        // `{ Map, Set}.prototype.has(key)` methods
        // https://tc39.es/ecma262/#sec-map.prototype.has
        // https://tc39.es/ecma262/#sec-set.prototype.has
        has: function has(key) {
          return !!getEntry(this, key);
        }
      });

      redefineAll(C.prototype, IS_MAP ? {
        // `Map.prototype.get(key)` method
        // https://tc39.es/ecma262/#sec-map.prototype.get
        get: function get(key) {
          var entry = getEntry(this, key);
          return entry && entry.value;
        },
        // `Map.prototype.set(key, value)` method
        // https://tc39.es/ecma262/#sec-map.prototype.set
        set: function set(key, value) {
          return define(this, key === 0 ? 0 : key, value);
        }
      } : {
        // `Set.prototype.add(value)` method
        // https://tc39.es/ecma262/#sec-set.prototype.add
        add: function add(value) {
          return define(this, value = value === 0 ? 0 : value, value);
        }
      });
      if (DESCRIPTORS$1$1) defineProperty$1(C.prototype, 'size', {
        get: function () {
          return getInternalState(this).size;
        }
      });
      return C;
    },
    setStrong: function (C, CONSTRUCTOR_NAME, IS_MAP) {
      var ITERATOR_NAME = CONSTRUCTOR_NAME + ' Iterator';
      var getInternalCollectionState = internalStateGetterFor(CONSTRUCTOR_NAME);
      var getInternalIteratorState = internalStateGetterFor(ITERATOR_NAME);
      // `{ Map, Set }.prototype.{ keys, values, entries, @@iterator }()` methods
      // https://tc39.es/ecma262/#sec-map.prototype.entries
      // https://tc39.es/ecma262/#sec-map.prototype.keys
      // https://tc39.es/ecma262/#sec-map.prototype.values
      // https://tc39.es/ecma262/#sec-map.prototype-@@iterator
      // https://tc39.es/ecma262/#sec-set.prototype.entries
      // https://tc39.es/ecma262/#sec-set.prototype.keys
      // https://tc39.es/ecma262/#sec-set.prototype.values
      // https://tc39.es/ecma262/#sec-set.prototype-@@iterator
      defineIterator(C, CONSTRUCTOR_NAME, function (iterated, kind) {
        setInternalState$1(this, {
          type: ITERATOR_NAME,
          target: iterated,
          state: getInternalCollectionState(iterated),
          kind: kind,
          last: undefined
        });
      }, function () {
        var state = getInternalIteratorState(this);
        var kind = state.kind;
        var entry = state.last;
        // revert to the last existing entry
        while (entry && entry.removed) entry = entry.previous;
        // get next entry
        if (!state.target || !(state.last = entry = entry ? entry.next : state.state.first)) {
          // or finish the iteration
          state.target = undefined;
          return { value: undefined, done: true };
        }
        // return step by kind
        if (kind == 'keys') return { value: entry.key, done: false };
        if (kind == 'values') return { value: entry.value, done: false };
        return { value: [entry.key, entry.value], done: false };
      }, IS_MAP ? 'entries' : 'values', !IS_MAP, true);

      // `{ Map, Set }.prototype[@@species]` accessors
      // https://tc39.es/ecma262/#sec-get-map-@@species
      // https://tc39.es/ecma262/#sec-get-set-@@species
      setSpecies$1(CONSTRUCTOR_NAME);
    }
  };

  var collection$1 = collection$3;
  var collectionStrong = collectionStrong$1;

  // `Map` constructor
  // https://tc39.es/ecma262/#sec-map-objects
  collection$1('Map', function (init) {
    return function Map() { return init(this, arguments.length ? arguments[0] : undefined); };
  }, collectionStrong);

  var $$9 = _export$1;
  var $includes = arrayIncludes$1.includes;
  var addToUnscopables$1 = addToUnscopables$3;

  // `Array.prototype.includes` method
  // https://tc39.es/ecma262/#sec-array.prototype.includes
  $$9({ target: 'Array', proto: true }, {
    includes: function includes(el /* , fromIndex = 0 */) {
      return $includes(this, el, arguments.length > 1 ? arguments[1] : undefined);
    }
  });

  // https://tc39.es/ecma262/#sec-array.prototype-@@unscopables
  addToUnscopables$1('includes');

  var isObject$l = isObject$k;
  var classof$1$1 = classofRaw$1$1;
  var wellKnownSymbol$3$1 = wellKnownSymbol$q;

  var MATCH$2 = wellKnownSymbol$3$1('match');

  // `IsRegExp` abstract operation
  // https://tc39.es/ecma262/#sec-isregexp
  var isRegexp = function (it) {
    var isRegExp;
    return isObject$l(it) && ((isRegExp = it[MATCH$2]) !== undefined ? !!isRegExp : classof$1$1(it) == 'RegExp');
  };

  var isRegExp$3 = isRegexp;

  var notARegexp = function (it) {
    if (isRegExp$3(it)) {
      throw TypeError("The method doesn't accept regular expressions");
    } return it;
  };

  var wellKnownSymbol$2$1 = wellKnownSymbol$q;

  var MATCH$1 = wellKnownSymbol$2$1('match');

  var correctIsRegexpLogic = function (METHOD_NAME) {
    var regexp = /./;
    try {
      '/./'[METHOD_NAME](regexp);
    } catch (error1) {
      try {
        regexp[MATCH$1] = false;
        return '/./'[METHOD_NAME](regexp);
      } catch (error2) { /* empty */ }
    } return false;
  };

  var $$8 = _export$1;
  var notARegExp = notARegexp;
  var requireObjectCoercible$2$1 = requireObjectCoercible$9;
  var toString$4 = toString$c;
  var correctIsRegExpLogic = correctIsRegexpLogic;

  // `String.prototype.includes` method
  // https://tc39.es/ecma262/#sec-string.prototype.includes
  $$8({ target: 'String', proto: true, forced: !correctIsRegExpLogic('includes') }, {
    includes: function includes(searchString /* , position = 0 */) {
      return !!~toString$4(requireObjectCoercible$2$1(this))
        .indexOf(toString$4(notARegExp(searchString)), arguments.length > 1 ? arguments[1] : undefined);
    }
  });

  var fixRegExpWellKnownSymbolLogic = fixRegexpWellKnownSymbolLogic;
  var isRegExp$2 = isRegexp;
  var anObject$1$1 = anObject$l;
  var requireObjectCoercible$1$1 = requireObjectCoercible$9;
  var speciesConstructor$1 = speciesConstructor$4;
  var advanceStringIndex$1 = advanceStringIndex$4;
  var toLength$1$1 = toLength$5;
  var toString$3 = toString$c;
  var getMethod$1$1 = getMethod$7;
  var callRegExpExec = regexpExecAbstract;
  var regexpExec = regexpExec$3;
  var stickyHelpers$1 = regexpStickyHelpers;
  var fails$3$1 = fails$u;

  var UNSUPPORTED_Y$1 = stickyHelpers$1.UNSUPPORTED_Y;
  var arrayPush = [].push;
  var min$1$1 = Math.min;
  var MAX_UINT32 = 0xFFFFFFFF;

  // Chrome 51 has a buggy "split" implementation when RegExp#exec !== nativeExec
  // Weex JS has frozen built-in prototypes, so use try / catch wrapper
  var SPLIT_WORKS_WITH_OVERWRITTEN_EXEC = !fails$3$1(function () {
    // eslint-disable-next-line regexp/no-empty-group -- required for testing
    var re = /(?:)/;
    var originalExec = re.exec;
    re.exec = function () { return originalExec.apply(this, arguments); };
    var result = 'ab'.split(re);
    return result.length !== 2 || result[0] !== 'a' || result[1] !== 'b';
  });

  // @@split logic
  fixRegExpWellKnownSymbolLogic('split', function (SPLIT, nativeSplit, maybeCallNative) {
    var internalSplit;
    if (
      'abbc'.split(/(b)*/)[1] == 'c' ||
      // eslint-disable-next-line regexp/no-empty-group -- required for testing
      'test'.split(/(?:)/, -1).length != 4 ||
      'ab'.split(/(?:ab)*/).length != 2 ||
      '.'.split(/(.?)(.?)/).length != 4 ||
      // eslint-disable-next-line regexp/no-empty-capturing-group, regexp/no-empty-group -- required for testing
      '.'.split(/()()/).length > 1 ||
      ''.split(/.?/).length
    ) {
      // based on es5-shim implementation, need to rework it
      internalSplit = function (separator, limit) {
        var string = toString$3(requireObjectCoercible$1$1(this));
        var lim = limit === undefined ? MAX_UINT32 : limit >>> 0;
        if (lim === 0) return [];
        if (separator === undefined) return [string];
        // If `separator` is not a regex, use native split
        if (!isRegExp$2(separator)) {
          return nativeSplit.call(string, separator, lim);
        }
        var output = [];
        var flags = (separator.ignoreCase ? 'i' : '') +
                    (separator.multiline ? 'm' : '') +
                    (separator.unicode ? 'u' : '') +
                    (separator.sticky ? 'y' : '');
        var lastLastIndex = 0;
        // Make `global` and avoid `lastIndex` issues by working with a copy
        var separatorCopy = new RegExp(separator.source, flags + 'g');
        var match, lastIndex, lastLength;
        while (match = regexpExec.call(separatorCopy, string)) {
          lastIndex = separatorCopy.lastIndex;
          if (lastIndex > lastLastIndex) {
            output.push(string.slice(lastLastIndex, match.index));
            if (match.length > 1 && match.index < string.length) arrayPush.apply(output, match.slice(1));
            lastLength = match[0].length;
            lastLastIndex = lastIndex;
            if (output.length >= lim) break;
          }
          if (separatorCopy.lastIndex === match.index) separatorCopy.lastIndex++; // Avoid an infinite loop
        }
        if (lastLastIndex === string.length) {
          if (lastLength || !separatorCopy.test('')) output.push('');
        } else output.push(string.slice(lastLastIndex));
        return output.length > lim ? output.slice(0, lim) : output;
      };
    // Chakra, V8
    } else if ('0'.split(undefined, 0).length) {
      internalSplit = function (separator, limit) {
        return separator === undefined && limit === 0 ? [] : nativeSplit.call(this, separator, limit);
      };
    } else internalSplit = nativeSplit;

    return [
      // `String.prototype.split` method
      // https://tc39.es/ecma262/#sec-string.prototype.split
      function split(separator, limit) {
        var O = requireObjectCoercible$1$1(this);
        var splitter = separator == undefined ? undefined : getMethod$1$1(separator, SPLIT);
        return splitter
          ? splitter.call(separator, O, limit)
          : internalSplit.call(toString$3(O), separator, limit);
      },
      // `RegExp.prototype[@@split]` method
      // https://tc39.es/ecma262/#sec-regexp.prototype-@@split
      //
      // NOTE: This cannot be properly polyfilled in engines that don't support
      // the 'y' flag.
      function (string, limit) {
        var rx = anObject$1$1(this);
        var S = toString$3(string);
        var res = maybeCallNative(internalSplit, rx, S, limit, internalSplit !== nativeSplit);

        if (res.done) return res.value;

        var C = speciesConstructor$1(rx, RegExp);

        var unicodeMatching = rx.unicode;
        var flags = (rx.ignoreCase ? 'i' : '') +
                    (rx.multiline ? 'm' : '') +
                    (rx.unicode ? 'u' : '') +
                    (UNSUPPORTED_Y$1 ? 'g' : 'y');

        // ^(? + rx + ) is needed, in combination with some S slicing, to
        // simulate the 'y' flag.
        var splitter = new C(UNSUPPORTED_Y$1 ? '^(?:' + rx.source + ')' : rx, flags);
        var lim = limit === undefined ? MAX_UINT32 : limit >>> 0;
        if (lim === 0) return [];
        if (S.length === 0) return callRegExpExec(splitter, S) === null ? [S] : [];
        var p = 0;
        var q = 0;
        var A = [];
        while (q < S.length) {
          splitter.lastIndex = UNSUPPORTED_Y$1 ? 0 : q;
          var z = callRegExpExec(splitter, UNSUPPORTED_Y$1 ? S.slice(q) : S);
          var e;
          if (
            z === null ||
            (e = min$1$1(toLength$1$1(splitter.lastIndex + (UNSUPPORTED_Y$1 ? q : 0)), S.length)) === p
          ) {
            q = advanceStringIndex$1(S, q, unicodeMatching);
          } else {
            A.push(S.slice(p, q));
            if (A.length === lim) return A;
            for (var i = 1; i <= z.length - 1; i++) {
              A.push(z[i]);
              if (A.length === lim) return A;
            }
            q = p = e;
          }
        }
        A.push(S.slice(p));
        return A;
      }
    ];
  }, !SPLIT_WORKS_WITH_OVERWRITTEN_EXEC, UNSUPPORTED_Y$1);

  function _createSuper$l(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$l(); return function _createSuperInternal() { var Super = _getPrototypeOf$1(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf$1(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn$1(this, result); }; }

  function _isNativeReflectConstruct$l() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
  var Page = /*#__PURE__*/function (_EventHarness) {
    _inherits$1(Page, _EventHarness);

    var _super = _createSuper$l(Page);

    function Page() {
      var _this;

      _classCallCheck$1(this, Page);

      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      _this = _super.call.apply(_super, [this].concat(args));

      _defineProperty$1(_assertThisInitialized$1(_this), "controller", void 0);

      return _this;
    }

    _createClass(Page, [{
      key: "initialise",
      value:
      /**
       * called once during late-stage app initialisation
       * (NB this may not be the current view when called)
       *
       * an opportunity to register listeners on this.controller.app
       */
      function initialise() {} // /**
      //  *
      //  * @param {HTMLElement} containerEl
      //  */
      // static initialise_layout(containerEl) {
      //
      // }

    }, {
      key: "display",
      value: function display() {
        console.log('got to view display'); // these serve as hook points for child classes

        this.refreshHeader();
        this.body();
      }
    }, {
      key: "refreshHeader",
      value: function refreshHeader() {}
    }, {
      key: "body",
      value: function body() {}
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

    }, {
      key: "card",
      value: function card(descriptor) {
        var cardContainer = document.createElement('div');
        cardContainer.id = descriptor.cardId;
        cardContainer.className = 'card';
        var cardHeadingEl = cardContainer.appendChild(document.createElement('div'));
        cardHeadingEl.className = 'card-header pointer';

        if (descriptor.cardHeadingId) {
          cardHeadingEl.id = descriptor.cardHeadingId;
        }

        cardHeadingEl.setAttribute('data-toggle', 'collapse');
        cardHeadingEl.setAttribute('data-target', "#".concat(descriptor.cardDescriptionId));
        var headingEl = cardHeadingEl.appendChild(document.createElement('h2'));
        headingEl.className = 'mb-0';
        var buttonEl = headingEl.appendChild(document.createElement('button'));
        buttonEl.className = "btn btn-link".concat(descriptor.collapsed ? ' collapsed' : '');

        if (descriptor.headingButtonId) {
          buttonEl.id = descriptor.headingButtonId;
        }

        buttonEl.type = 'button';
        buttonEl.setAttribute('data-toggle', 'collapse');

        if (descriptor.buttonStyleString) {
          buttonEl.style.cssText = descriptor.buttonStyleString;
        }

        if (descriptor.cardDescriptionId) {
          buttonEl.setAttribute('data-target', "#".concat(descriptor.cardDescriptionId));
          buttonEl.setAttribute('aria-controls', descriptor.cardDescriptionId);
        }

        buttonEl.setAttribute('aria-expanded', descriptor.collapsed ? 'false' : 'true');
        buttonEl.innerHTML = descriptor.headingHTML;

        if (descriptor.headingNonbuttonHTML) {
          var extraHeadingElement = headingEl.appendChild(document.createElement('span'));
          extraHeadingElement.style.display = 'inline-block';
          extraHeadingElement.innerHTML = descriptor.headingNonbuttonHTML;
        }

        if (descriptor.headingValidationWarningHTML) {
          var headerValidationWarning = cardHeadingEl.appendChild(document.createElement('div'));
          headerValidationWarning.className = 'card-invalid-feedback';
          headerValidationWarning.innerHTML = "<small>".concat(descriptor.headingValidationWarningHTML, "</small>");
        }

        var cardDescriptionEl = cardContainer.appendChild(document.createElement('div'));

        if (descriptor.cardDescriptionId) {
          cardDescriptionEl.id = descriptor.cardDescriptionId;
        }

        cardDescriptionEl.className = "collapse".concat(descriptor.collapsed ? '' : ' show');

        if (descriptor.cardHeadingId) {
          cardDescriptionEl.setAttribute('aria-labelledby', descriptor.cardHeadingId);
        }

        cardDescriptionEl.setAttribute('data-parent', "#".concat(descriptor.parentContainerId));

        if (descriptor.dataAttributes) {
          for (var key in descriptor.dataAttributes) {
            if (descriptor.dataAttributes.hasOwnProperty(key)) {
              cardDescriptionEl.setAttribute("data-".concat(key), descriptor.dataAttributes[key]);
            }
          }
        }

        var cardBodyEl = cardDescriptionEl.appendChild(document.createElement('div'));
        cardBodyEl.className = 'card-body pl-2 pr-2 pl-md-3 pr-md-3';
        cardBodyEl.appendChild(descriptor.bodyContentElement);
        return cardContainer; //         `<div class="card-header" id="heading_${occurrence.id}">
        //   <h2 class="mb-0">
        //     <button class="btn btn-link${(this.controller.currentOccurrenceId === occurrence.id ? '' : ' collapsed')}" id="headingbutton_${occurrence.id}" type="button" data-toggle="collapse" data-target="#description_${occurrence.id}" aria-expanded="true" aria-controls="description_${occurrence.id}">
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
    }]);

    return Page;
  }(EventHarness);

  function _createSuper$k(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$k(); return function _createSuperInternal() { var Super = _getPrototypeOf$1(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf$1(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn$1(this, result); }; }

  function _isNativeReflectConstruct$k() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
  var NotFoundView = /*#__PURE__*/function (_Page) {
    _inherits$1(NotFoundView, _Page);

    var _super = _createSuper$k(NotFoundView);

    function NotFoundView() {
      _classCallCheck$1(this, NotFoundView);

      return _super.apply(this, arguments);
    }

    _createClass(NotFoundView, [{
      key: "body",
      value: function body() {
        // at this point the entire content of #body should be safe to replace
        var bodyEl = document.getElementById('body');
        bodyEl.innerHTML = "<h2>Page not found</h2><p><a href=\"/app/list\">Return to the homepage.</a>";
      }
    }]);

    return NotFoundView;
  }(Page);

  function _createSuper$j(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$j(); return function _createSuperInternal() { var Super = _getPrototypeOf$1(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf$1(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn$1(this, result); }; }

  function _isNativeReflectConstruct$j() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
  var SurveyForm = /*#__PURE__*/function (_Form) {
    _inherits$1(SurveyForm, _Form);

    var _super = _createSuper$j(SurveyForm);

    /**
     * sections keyed by numerical order
     *
     * @type {Array.<typeof SurveyFormSection>}
     */

    /**
     *
     * @type {Object.<string, typeof SurveyFormSection>}
     */

    /**
     * @protected
     * @type {Survey}
     */

    /**
     * @type {typeof SurveyFormSection}
     */

    /**
     *
     * @param {typeof SurveyFormSection} section
     */
    function SurveyForm(section) {
      var _this;

      _classCallCheck$1(this, SurveyForm);

      _this = _super.call(this);

      _defineProperty$1(_assertThisInitialized$1(_this), "_survey", void 0);

      _defineProperty$1(_assertThisInitialized$1(_this), "section", void 0);

      _this.section = section;
      return _this;
    }
    /**
     *
     * @returns {HTMLElement}
     */


    _createClass(SurveyForm, [{
      key: "formElement",
      get: function get() {
        var el = _get(_getPrototypeOf$1(SurveyForm.prototype), "formElement", this);

        if (!this._formFieldsBuilt) {
          this.buildFormFields();
        }

        return el;
      }
    }, {
      key: "updateModelFromContent",
      value: function updateModelFromContent() {
        console.log('updating survey from SurveyForm content');

        for (var key in this.fields) {
          if (this.fields.hasOwnProperty(key)) {
            var field = this.fields[key];
            this._survey.attributes[key] = field.value;
          }
        }

        console.log({
          survey: this._survey
        });
      }
      /**
       *
       * @param {Survey} model
       */

    }, {
      key: "model",
      get: function get() {
        return this._survey;
      }
      /**
       * the change event triggers after a field has changed, before the value has been read back into the model
       *
       * @param event
       */
      ,
      set: function set(model) {
        this._survey = model;
        this.populateFormContent();
      }
    }, {
      key: "changeHandler",
      value: function changeHandler(event) {
        console.log('survey form change event');
        console.log({
          event: event
        });
        this.fireEvent(Form.CHANGE_EVENT, {
          form: this
        });
      }
    }, {
      key: "destructor",
      value: function destructor() {
        _get(_getPrototypeOf$1(SurveyForm.prototype), "destructor", this).call(this);

        this._survey = null;
      }
      /**
       *
       * @param {typeof SurveyFormSection} formClass
       */

    }, {
      key: "initialiseFormFields",
      value:
      /**
       *
       */
      function initialiseFormFields() {
        var properties = this.section.properties;
        this.fields = {};

        for (var key in properties) {
          if (properties.hasOwnProperty(key)) {
            // noinspection JSPotentiallyInvalidConstructorUsage
            this.fields[key] = new properties[key].field(properties[key].attributes);
          }
        }
      }
      /**
       *
       * @returns {Object<string, {field: FormField, attributes: {label: string, helpText: string, placeholder: string, autocomplete: string}}>}
       */

    }, {
      key: "getFormSectionProperties",
      value: function getFormSectionProperties() {
        return this.section.properties;
      }
    }], [{
      key: "registerSection",
      value: function registerSection(formClass) {
        SurveyForm.sections[formClass.sectionSortOrder] = formClass;
        SurveyForm.sectionsByKey[formClass.sectionNavigationKey] = formClass;
      }
    }]);

    return SurveyForm;
  }(Form);

  _defineProperty$1(SurveyForm, "sections", []);

  _defineProperty$1(SurveyForm, "sectionsByKey", {});

  function _createSuper$i(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$i(); return function _createSuperInternal() { var Super = _getPrototypeOf$1(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf$1(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn$1(this, result); }; }

  function _isNativeReflectConstruct$i() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
  var Survey = /*#__PURE__*/function (_Model) {
    _inherits$1(Survey, _Model);

    var _super = _createSuper$i(Survey);

    function Survey() {
      var _this;

      _classCallCheck$1(this, Survey);

      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      _this = _super.call.apply(_super, [this].concat(args));

      _defineProperty$1(_assertThisInitialized$1(_this), "SAVE_ENDPOINT", '/savesurvey.php');

      _defineProperty$1(_assertThisInitialized$1(_this), "TYPE", 'survey');

      _defineProperty$1(_assertThisInitialized$1(_this), "attributes", {});

      return _this;
    }

    _createClass(Survey, [{
      key: "formChangedHandler",
      value:
      /**
       * called after the form has changed, before the values have been read back in to the occurrence
       *
       * @param {{form: SurveyForm}} params
       */
      function formChangedHandler(params) {
        console.log('Survey change handler invoked.'); // read new values
        // then fire it's own change event (Occurrence.EVENT_MODIFIED)

        params.form.updateModelFromContent(); // refresh the form's validation state

        params.form.conditionallyValidateForm();
        this.touch();
        this.fireEvent(Survey.EVENT_MODIFIED, {
          surveyId: this.id
        });
      }
      /**
       *
       * @param {SurveyForm} form
       */

    }, {
      key: "registerForm",
      value: function registerForm(form) {
        form.model = this;
        form.addListener(Form.CHANGE_EVENT, this.formChangedHandler.bind(this));
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

    }, {
      key: "save",
      value: function save() {
        if (!this._savedRemotely) {
          var formData = new FormData();
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
          return Promise.reject("".concat(this.id, " has already been saved."));
        }
      }
      /**
       *
       * @returns {string} an html-safe string based on the locality and creation date
       */

    }, {
      key: "generateSurveyName",
      value: function generateSurveyName() {
        var place = (this.attributes.place || this.attributes.georef || '(unlocalised)').trim();
        var createdDate = new Date(this.createdStamp * 1000);
        var dateString;

        try {
          // 'default' locale fails on Edge
          dateString = createdDate.toLocaleString('default', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          });
        } catch (e) {
          dateString = createdDate.toLocaleString('en-GB', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          });
        }

        return "".concat(escapeHTML(place), " ").concat(dateString);
      }
    }]);

    return Survey;
  }(Model);

  _defineProperty$1(Survey, "EVENT_MODIFIED", 'modified');

  function _createSuper$h(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$h(); return function _createSuperInternal() { var Super = _getPrototypeOf$1(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf$1(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn$1(this, result); }; }

  function _isNativeReflectConstruct$h() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
  var OccurrenceImage = /*#__PURE__*/function (_Model) {
    _inherits$1(OccurrenceImage, _Model);

    var _super = _createSuper$h(OccurrenceImage);

    function OccurrenceImage() {
      var _this;

      _classCallCheck$1(this, OccurrenceImage);

      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      _this = _super.call.apply(_super, [this].concat(args));

      _defineProperty$1(_assertThisInitialized$1(_this), "file", void 0);

      _defineProperty$1(_assertThisInitialized$1(_this), "TYPE", 'image');

      _defineProperty$1(_assertThisInitialized$1(_this), "SAVE_ENDPOINT", '/saveimage.php');

      return _this;
    }

    _createClass(OccurrenceImage, [{
      key: "getUrl",
      value:
      /**
       * fetches a url of the image
       * this might be a remote url (or one intercepted by a service worker)
       * or a data url of the raw image, (not yet uploaded)
       *
       * @returns {string}
       */
      function getUrl() {}
    }, {
      key: "save",
      value:
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
      function save(surveyId, occurrenceId, projectId) {
        if (!this._savedRemotely) {
          var formData = new FormData();
          formData.append('type', this.TYPE);
          formData.append('surveyId', surveyId ? surveyId : ''); // avoid 'undefined'

          formData.append('occurrenceId', occurrenceId ? occurrenceId : this.occurrenceId); // avoid 'undefined'

          formData.append('projectId', projectId ? projectId.toString() : '');
          formData.append('imageId', this.id);
          formData.append('id', this.id);
          formData.append('image', this.file);
          formData.append('deleted', this.deleted.toString());
          console.log("queueing image post, image id ".concat(this.id));
          return this.queuePost(formData);
        } else {
          return Promise.reject("".concat(this.id, " has already been saved."));
        }
      }
      /**
       * fired from Occurrence when the object's contents have been modified
       *
       * @type {string}
       */

    }, {
      key: "_parseDescriptor",
      value:
      /**
       *
       * @param {{surveyId: string, occurrenceId: string, [image]: File}} descriptor
       * @private
       */
      function _parseDescriptor(descriptor) {
        _get(_getPrototypeOf$1(OccurrenceImage.prototype), "_parseDescriptor", this).call(this, descriptor);

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

    }], [{
      key: "fromFile",
      value:
      /**
       *
       * @param {File} file
       */
      function fromFile(file) {
        var image = new OccurrenceImage();
        image.file = file;
        return image;
      }
    }, {
      key: "placeholder",
      value:
      /**
       *
       * @param id
       * @returns {OccurrenceImage}
       */
      function placeholder(id) {
        var placeholderObject = new OccurrenceImage();
        placeholderObject._id = id;
        OccurrenceImage.imageCache.set(id, placeholderObject);
        return placeholderObject;
      }
    }, {
      key: "imageLink",
      value: function imageLink(id, width, height, attributes) {
        width = width || 0;
        height = height || 0;
        var attributesString = '';

        if (attributes.className) {
          attributesString += " class=\"".concat(attributes.className, "\"");
        }

        var renderingConstraint = width > height ? "width=\"".concat(width, "\"") : "height=\"".concat(height, "\"");
        return "<picture><source srcset=\"/image.php?imageid=".concat(id, "&amp;height=128&amp;format=webp\" type=\"image/webp\"><img").concat(attributesString, " src=\"/image.php?imageid=").concat(id, "&amp;width=").concat(width, "&amp;height=").concat(height, "&amp;format=jpeg\" ").concat(renderingConstraint, " alt=\"photo\"></picture>");
      }
    }]);

    return OccurrenceImage;
  }(Model);

  _defineProperty$1(OccurrenceImage, "imageCache", new Map());

  _defineProperty$1(OccurrenceImage, "EVENT_MODIFIED", 'modified');

  function _createForOfIteratorHelper$7(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray$7(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

  function _unsupportedIterableToArray$7(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray$7(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$7(o, minLen); }

  function _arrayLikeToArray$7(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

  function _createSuper$g(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$g(); return function _createSuperInternal() { var Super = _getPrototypeOf$1(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf$1(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn$1(this, result); }; }

  function _isNativeReflectConstruct$g() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

  function _classPrivateFieldInitSpec$9(obj, privateMap, value) { _checkPrivateRedeclaration$9(obj, privateMap); privateMap.set(obj, value); }

  function _checkPrivateRedeclaration$9(obj, privateCollection) { if (privateCollection.has(obj)) { throw new TypeError("Cannot initialize the same private elements twice on an object"); } }

  var _router = /*#__PURE__*/new WeakMap();

  var _containerEl = /*#__PURE__*/new WeakMap();

  var App = /*#__PURE__*/function (_EventHarness) {
    _inherits$1(App, _EventHarness);

    var _super = _createSuper$g(App);

    /**
     * @type {PatchedNavigo}
     */

    /**
     * @type {HTMLElement}
     */

    /**
     *
     * @type {Array.<AppController>}
     */

    /**
     * tracks the handle of the current page controller
     * updating this is the responsibility of the controller
     *
     * @type {number|boolean}
     */

    /**
     *
     * @type {Array.<{url : string}>}
     */

    /**
     * keyed by occurrence id (a UUID string)
     *
     * @type {Map.<string,Occurrence>}
     */

    /**
     * keyed by survey id (a UUID string)
     *
     * @type {Map.<string,Survey>}
     */

    /**
     * @type {Survey}
     */

    /**
     * @type {Layout}
     */

    /**
     * Event fired when user requests a new blank survey
     * @type {string}
     */

    /**
     * Event fired when user requests a reset (local clearance) of all surveys
     * @type {string}
     */

    /**
     *
     * @type {boolean}
     */
    function App() {
      var _this;

      _classCallCheck$1(this, App);

      _this = _super.call(this);

      _classPrivateFieldInitSpec$9(_assertThisInitialized$1(_this), _router, {
        writable: true,
        value: void 0
      });

      _classPrivateFieldInitSpec$9(_assertThisInitialized$1(_this), _containerEl, {
        writable: true,
        value: void 0
      });

      _defineProperty$1(_assertThisInitialized$1(_this), "controllers", []);

      _defineProperty$1(_assertThisInitialized$1(_this), "currentControllerHandle", false);

      _defineProperty$1(_assertThisInitialized$1(_this), "routeHistory", []);

      _defineProperty$1(_assertThisInitialized$1(_this), "occurrences", void 0);

      _defineProperty$1(_assertThisInitialized$1(_this), "surveys", void 0);

      _defineProperty$1(_assertThisInitialized$1(_this), "currentSurvey", void 0);

      _defineProperty$1(_assertThisInitialized$1(_this), "layout", void 0);

      _this.reset();

      return _this;
    }

    _createClass(App, [{
      key: "reset",
      value: function reset() {
        this.surveys = new Map();
        this.clearCurrentSurvey();
      }
      /**
       * unset the current survey and its associated list of occurrences
       * called when switching surveys and during startup
       */

    }, {
      key: "clearCurrentSurvey",
      value: function clearCurrentSurvey() {
        this.occurrences = new Map();
        this.currentSurvey = null;
      }
      /**
       * see https://github.com/krasimir/navigo
       * @param {PatchedNavigo} router
       */

    }, {
      key: "router",
      get: function get() {
        return _classPrivateFieldGet(this, _router);
      },
      set: function set(router) {
        _classPrivateFieldSet(this, _router, router);
      }
    }, {
      key: "containerId",
      set: function set(containerId) {
        var el = document.getElementById(containerId);

        if (!el) {
          throw new Error("App container '".concat(containerId, "' not found."));
        } else {
          _classPrivateFieldSet(this, _containerEl, el);
        }
      }
    }, {
      key: "container",
      get: function get() {
        return _classPrivateFieldGet(this, _containerEl);
      }
      /**
       *
       * @param {AppController} controller
       */

    }, {
      key: "registerController",
      value: function registerController(controller) {
        controller.handle = this.controllers.length;
        this.controllers[this.controllers.length] = controller;
        controller.app = this;
        controller.registerRoute(_classPrivateFieldGet(this, _router));
      }
    }, {
      key: "initialise",
      value: function initialise() {
        var _this2 = this;

        //Page.initialise_layout(this.#containerEl);
        this.layout.initialise();

        _classPrivateFieldGet(this, _router).notFound(function (query) {
          // called when there is path specified but
          // there is no route matching
          console.log("no route found for '".concat(query, "'")); //this.#router.navigate('/list');

          var view = new NotFoundView();
          view.display();
        }); //default homepage


        _classPrivateFieldGet(this, _router).on(function () {
          // special-case redirect (replacing in history) from '/' to '/list' without updating browser history
          console.log("redirecting from '/' to '/list'");

          _classPrivateFieldGet(_this2, _router).pause(); //if (this.clearCurrentSurvey && this.currentSurvey.isPristine) { // this appears to be a bug 'this.clearCurrentSurvey'
          // rather than 'this.clearCurrentSurvey()' is nonsensical
          // and if clearCurrentSurvey() was actually called then the isPristine test would fail (called on null)


          if (_this2.currentSurvey && _this2.currentSurvey.isPristine) {
            _classPrivateFieldGet(_this2, _router).navigate('/list/survey/welcome').resume();
          } else {
            _classPrivateFieldGet(_this2, _router).navigate('/list').resume();
          }

          _classPrivateFieldGet(_this2, _router).resolve();
        });

        var _iterator = _createForOfIteratorHelper$7(this.controllers),
            _step;

        try {
          for (_iterator.s(); !(_step = _iterator.n()).done;) {
            var controller = _step.value;
            controller.initialise();
          }
        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }
      }
    }, {
      key: "display",
      value: function display() {
        console.log('App display');

        _classPrivateFieldGet(this, _router).resolve();
      }
    }, {
      key: "saveRoute",
      value: function saveRoute() {
        var lastRoute = _classPrivateFieldGet(this, _router).lastRouteResolved();

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

    }, {
      key: "markAllNotPristine",
      value: function markAllNotPristine() {
        var _iterator2 = _createForOfIteratorHelper$7(this.occurrences),
            _step2;

        try {
          for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
            var occurrenceTuple = _step2.value;
            occurrenceTuple[1].isPristine = false;
          }
        } catch (err) {
          _iterator2.e(err);
        } finally {
          _iterator2.f();
        }
      }
      /**
       *
       * @param {Layout} layout
       */

    }, {
      key: "setLayout",
      value: function setLayout(layout) {
        this.layout = layout;
        layout.setApp(this);
      }
      /**
       *
       * @param {Survey} survey
       */

    }, {
      key: "addSurvey",
      value: function addSurvey(survey) {
        var _this3 = this;

        if (survey.projectId !== this.projectId) {
          throw new Error("Survey project id '".concat(survey.projectId, " does not match with current project ('").concat(this.projectId, "')"));
        }

        if (!this.surveys.has(survey.id)) {
          console.log("setting survey's modified/save handler");
          survey.addListener(Survey.EVENT_MODIFIED, function () {
            _this3.fireEvent(App.EVENT_SURVEYS_CHANGED);

            return survey.save();
          });
        }

        this.surveys.set(survey.id, survey);
        this.fireEvent(App.EVENT_SURVEYS_CHANGED);
      }
      /**
       * tests whether occurrences have been defined, excluding any that have been deleted
       *
       * @returns {boolean}
       */

    }, {
      key: "haveExtantOccurrences",
      value: function haveExtantOccurrences() {
        var _iterator3 = _createForOfIteratorHelper$7(this.occurrences),
            _step3;

        try {
          for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
            var occurrence = _step3.value;

            if (!occurrence.deleted) {
              return true;
            }
          }
        } catch (err) {
          _iterator3.e(err);
        } finally {
          _iterator3.f();
        }

        return false;
      }
      /**
       *
       * @param {Occurrence} occurrence
       */

    }, {
      key: "addOccurrence",
      value: function addOccurrence(occurrence) {
        var _this4 = this;

        if (!occurrence.surveyId) {
          throw new InternalAppError('Survey id must set prior to registering occurrence.');
        }

        if (this.occurrences.size === 0) {
          // this is the first occurrence added, set the survey creation stamp to match
          // this avoids anomalies where a 'stale' survey created when the form was first opened but not used sits around
          // for a protracted period
          var survey = this.surveys.get(occurrence.surveyId);
          survey.createdStamp = occurrence.createdStamp;
        }

        console.log("in addOccurrence setting id '".concat(occurrence.id, "'"));
        this.occurrences.set(occurrence.id, occurrence);
        occurrence.addListener(Occurrence.EVENT_MODIFIED, function () {
          var survey = _this4.surveys.get(occurrence.surveyId);

          if (!survey) {
            throw new Error("Failed to look up survey id ".concat(occurrence.surveyId));
          } else {
            survey.isPristine = false; // need to ensure that currentSurvey is saved before occurrence
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

    }, {
      key: "refreshFromServer",
      value: function refreshFromServer(surveyIds) {
        var _this5 = this;

        console.log({
          'Refresh from server, ids': surveyIds
        });
        var formData = new FormData();
        var n = 0;

        var _iterator4 = _createForOfIteratorHelper$7(surveyIds),
            _step4;

        try {
          for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
            var key = _step4.value;
            formData.append("surveyId[".concat(n++, "]"), key);
          }
        } catch (err) {
          _iterator4.e(err);
        } finally {
          _iterator4.f();
        }

        return fetch(App.LOAD_SURVEYS_ENDPOINT, {
          method: 'POST',
          body: formData
        }).then(function (response) {
          if (response.ok) {
            return response.json();
          } else {
            return Promise.reject("Invalid response from server when refreshing survey ids");
          }
        }).then(function (jsonResponse) {
          /** @param {{survey : Array.<object>, occurrence: Array.<object>, image: Array.<object>}} jsonResponse */
          console.log({
            'refresh from server json response': jsonResponse
          }); // if external objects newer than local version then place in local storage

          var promises = [];

          for (var type in jsonResponse) {
            if (jsonResponse.hasOwnProperty(type)) {
              var _iterator5 = _createForOfIteratorHelper$7(jsonResponse[type]),
                  _step5;

              try {
                for (_iterator5.s(); !(_step5 = _iterator5.n()).done;) {
                  var object = _step5.value;
                  promises.push(_this5._conditionallyReplaceObject(object));
                }
              } catch (err) {
                _iterator5.e(err);
              } finally {
                _iterator5.f();
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

    }, {
      key: "_conditionallyReplaceObject",
      value: function _conditionallyReplaceObject(externalVersion) {
        var objectType = externalVersion.type;
        var id = externalVersion.id;
        var key = "".concat(objectType, ".").concat(id);
        return localforage.getItem(key).then(function (localVersion) {
          if (localVersion) {
            // compare stamps
            // if (externalVersion.deleted) {
            //     // if the external copy is deleted then remove the local copy
            //     return localforage.removeItem(key);
            // }
            if (!externalVersion.deleted && localVersion.modified >= externalVersion.modified) {
              console.log("Local copy of ".concat(key, " is the same or newer than the server copy. (").concat(localVersion.modified, " >= ").concat(externalVersion.modified, ") "));
              return Promise.resolve();
            }
          } // no local copy or stale copy
          // so store response locally


          console.log("Adding or replacing local copy of ".concat(key));
          return localforage.setItem(key, externalVersion);
        });
      }
      /**
       * retrieve the full set of keys from local storage (IndexedDb)
       *
       * @param {{survey: Array.<string>, occurrence : Array.<string>, image: Array.<string>}} storedObjectKeys
       * @returns {Promise}
       */

    }, {
      key: "seekKeys",
      value: function seekKeys(storedObjectKeys) {
        console.log('starting seekKeys');
        return localforage.keys().then(function (keys) {
          console.log({
            "in seekKeys: local forage keys": keys
          });

          var _iterator6 = _createForOfIteratorHelper$7(keys),
              _step6;

          try {
            for (_iterator6.s(); !(_step6 = _iterator6.n()).done;) {
              var key = _step6.value;
              var type = void 0,
                  id = void 0;

              var _key$split = key.split('.', 2);

              var _key$split2 = _slicedToArray(_key$split, 2);

              type = _key$split2[0];
              id = _key$split2[1];

              if (storedObjectKeys.hasOwnProperty(type)) {
                if (!storedObjectKeys[type].includes(id)) {
                  storedObjectKeys[type].push(id);
                }
              } else {
                console.log("Unrecognised stored key type '".concat(type, "."));
              }
            }
          } catch (err) {
            _iterator6.e(err);
          } finally {
            _iterator6.f();
          }

          return storedObjectKeys;
        });
      }
      /**
       * @returns {Promise}
       */

    }, {
      key: "syncAll",
      value: function syncAll() {
        var _this6 = this;

        var storedObjectKeys = {
          survey: [],
          occurrence: [],
          image: []
        };
        return this.seekKeys(storedObjectKeys).then(function (storedObjectKeys) {
          return _this6._syncLocalUnsaved(storedObjectKeys);
        }, function (failedResult) {
          console.log("Failed to sync all: ".concat(failedResult));
          return false;
        });
      }
      /**
       *
       * @param storedObjectKeys
       * @returns {Promise}
       * @private
       */

    }, {
      key: "_syncLocalUnsaved",
      value: function _syncLocalUnsaved(storedObjectKeys) {
        // syncs surveys first, then occurrences, then images from indexedDb
        var promises = [];

        var _iterator7 = _createForOfIteratorHelper$7(storedObjectKeys.survey),
            _step7;

        try {
          for (_iterator7.s(); !(_step7 = _iterator7.n()).done;) {
            var surveyKey = _step7.value;
            promises.push(Survey.retrieveFromLocal(surveyKey, new Survey()).then(function (survey) {
              if (survey.unsaved()) {
                return survey.save();
              }
            }));
          }
        } catch (err) {
          _iterator7.e(err);
        } finally {
          _iterator7.f();
        }

        var _iterator8 = _createForOfIteratorHelper$7(storedObjectKeys.occurrence),
            _step8;

        try {
          for (_iterator8.s(); !(_step8 = _iterator8.n()).done;) {
            var occurrenceKey = _step8.value;
            promises.push(Occurrence.retrieveFromLocal(occurrenceKey, new Occurrence()).then(function (occurrence) {
              if (occurrence.unsaved()) {
                return occurrence.save();
              }
            }));
          }
        } catch (err) {
          _iterator8.e(err);
        } finally {
          _iterator8.f();
        }

        var _iterator9 = _createForOfIteratorHelper$7(storedObjectKeys.image),
            _step9;

        try {
          for (_iterator9.s(); !(_step9 = _iterator9.n()).done;) {
            var imageKey = _step9.value;
            promises.push(OccurrenceImage.retrieveFromLocal(imageKey, new OccurrenceImage()).then(function (image) {
              if (image.unsaved()) {
                return image.save();
              }
            }));
          }
        } catch (err) {
          _iterator9.e(err);
        } finally {
          _iterator9.f();
        }

        return Promise.all(promises).catch(function (result) {
          console.log("Save failure: ".concat(result));
        });
      }
      /**
       * restore previous state, pulling back from local and external store
       * @todo this needs a save phase, so that local changes are saved back to the server
       *
       * @param {string} [targetSurveyId] if specified then select this id as the current survey
       * @return {Promise}
       */

    }, {
      key: "restoreOccurrences",
      value: function restoreOccurrences(targetSurveyId) {
        var _this7 = this;

        console.log("Invoked restoreOccurrences, target survey id: ".concat(targetSurveyId)); // need to check for a special case where restoring a survey that has never been saved even locally
        // i.e. new and unmodified
        // only present in current App.surveys
        // this occurs if user creates a new survey, makes no changes, switches away from it then switches back

        if (targetSurveyId && this.surveys.has(targetSurveyId)) {
          var localSurvey = this.surveys.get(targetSurveyId);

          if (localSurvey.isPristine) {
            this.clearCurrentSurvey(); // clear occurrences from the previous survey

            this.currentSurvey = localSurvey;
            this.fireEvent(App.EVENT_SURVEYS_CHANGED); // current survey should be set now, so menu needs refresh

            return Promise.resolve();
          }
        }

        var storedObjectKeys = {
          survey: [],
          occurrence: [],
          image: []
        };

        if (targetSurveyId) {
          storedObjectKeys.survey[0] = targetSurveyId;
        }

        return this.seekKeys(storedObjectKeys).then(function (storedObjectKeys) {
          if (storedObjectKeys.survey.length) {
            return _this7.refreshFromServer(storedObjectKeys.survey).finally(function () {
              // re-seek keys from indexed db, to take account of any new occurrences received from the server
              return _this7.seekKeys(storedObjectKeys);
            });
          } else {
            return null;
          }
        }).finally(function () {
          // called regardless of whether a server refresh was successful
          // storedObjectKeys and indexed db should be as up-to-date as possible
          console.log({
            storedObjectKeys: storedObjectKeys
          });

          if (storedObjectKeys.survey.length) {
            // arbitrarily set first survey key as current
            // this will be the specified targetSurveyId if that was set
            return _this7._restoreSurveyFromLocal(storedObjectKeys.survey[0], storedObjectKeys).finally(function () {
              _this7.currentSurvey = _this7.surveys.get(storedObjectKeys.survey[0]);

              if (!_this7.currentSurvey) {
                // survey doesn't actually exist
                // this could have happened in an invalid survey id was provided as a targetSurveyId
                console.log("Failed to retrieve survey id '".concat(targetSurveyId, "'"));
                return Promise.reject(new Error("Failed to retrieve survey id '".concat(targetSurveyId, "'")));
              }

              if (_this7.currentSurvey.deleted) {
                // unusual case where survey is deleted
                // substitute a new one
                // this should probably never happen, as items deleted on the server ought to have been
                // removed locally
                _this7.setNewSurvey();
              } else {
                _this7.fireEvent(App.EVENT_SURVEYS_CHANGED); // current survey should be set now, so menu needs refresh

              }

              return Promise.resolve();
            });
          } else {
            console.log('no pre-existing surveys, so creating a new one'); // no pre-existing surveys, so create a new one

            _this7.setNewSurvey();

            return Promise.resolve();
          }
        });
      }
    }, {
      key: "setNewSurvey",
      value: function setNewSurvey() {
        this.currentSurvey = new Survey();
        this.currentSurvey.projectId = this.projectId;
        this.currentSurvey.isPristine = true;
        this.addSurvey(this.currentSurvey);
      }
      /**
       * @return {Occurrence}
       */

    }, {
      key: "addNewOccurrence",
      value: function addNewOccurrence() {
        var occurrence = new Occurrence();
        occurrence.surveyId = this.currentSurvey.id;
        occurrence.projectId = this.projectId;
        occurrence.isNew = true;
        occurrence.isPristine = true;
        this.addOccurrence(occurrence);
        this.fireEvent(App.EVENT_OCCURRENCE_ADDED, {
          occurrenceId: occurrence.id,
          surveyId: occurrence.surveyId
        });
        return occurrence;
      }
      /**
       *
       * @param surveyId
       * @param storedObjectKeys
       * @returns {Promise}
       * @private
       */

    }, {
      key: "_restoreSurveyFromLocal",
      value: function _restoreSurveyFromLocal(surveyId, storedObjectKeys) {
        var _this8 = this;

        // retrieve surveys first, then occurrences, then images from indexedDb
        return Survey.retrieveFromLocal(surveyId, new Survey()).then(function (survey) {
          console.log("retrieving local survey ".concat(surveyId)); // the apps occurrences should only relate to the current survey
          // (the reset are remote or in IndexedDb)

          _this8.clearCurrentSurvey();

          _this8.addSurvey(survey);

          var occurrenceFetchingPromises = [];

          var _iterator10 = _createForOfIteratorHelper$7(storedObjectKeys.occurrence),
              _step10;

          try {
            var _loop = function _loop() {
              var occurrenceKey = _step10.value;
              occurrenceFetchingPromises.push(Occurrence.retrieveFromLocal(occurrenceKey, new Occurrence()).then(function (occurrence) {
                if (occurrence.surveyId === surveyId) {
                  console.log("adding occurrence ".concat(occurrenceKey));

                  _this8.addOccurrence(occurrence);
                }
              }));
            };

            for (_iterator10.s(); !(_step10 = _iterator10.n()).done;) {
              _loop();
            }
          } catch (err) {
            _iterator10.e(err);
          } finally {
            _iterator10.f();
          }

          return Promise.all(occurrenceFetchingPromises);
        }).finally(function () {
          //console.log('Reached image fetching part');
          var imageFetchingPromises = [];

          var _iterator11 = _createForOfIteratorHelper$7(storedObjectKeys.image),
              _step11;

          try {
            var _loop2 = function _loop2() {
              var occurrenceImageKey = _step11.value;
              imageFetchingPromises.push(OccurrenceImage.retrieveFromLocal(occurrenceImageKey, new OccurrenceImage()).then(function (occurrenceImage) {
                console.log("restoring image id '".concat(occurrenceImageKey, "'"));

                if (occurrenceImage.surveyId === surveyId) {
                  OccurrenceImage.imageCache.set(occurrenceImageKey, occurrenceImage);
                }
              }, function (reason) {
                console.log("Failed to retrieve an image: ".concat(reason));
              }));
            };

            for (_iterator11.s(); !(_step11 = _iterator11.n()).done;) {
              _loop2();
            }
          } catch (err) {
            _iterator11.e(err);
          } finally {
            _iterator11.f();
          }

          return Promise.all(imageFetchingPromises);
        });
      }
      /**
       *
       * @returns {Promise<void>}
       */

    }, {
      key: "clearLocalForage",
      value: function clearLocalForage() {
        return localforage.clear();
      }
    }]);

    return App;
  }(EventHarness);

  _defineProperty$1(App, "EVENT_ADD_SURVEY_USER_REQUEST", 'useraddsurveyrequest');

  _defineProperty$1(App, "EVENT_RESET_SURVEYS", 'userresetsurveys');

  _defineProperty$1(App, "LOAD_SURVEYS_ENDPOINT", '/loadsurveys.php');

  _defineProperty$1(App, "EVENT_OCCURRENCE_ADDED", 'occurrenceadded');

  _defineProperty$1(App, "EVENT_SURVEYS_CHANGED", 'surveyschanged');

  _defineProperty$1(App, "devMode", false);

  function _createForOfIteratorHelper$6(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray$6(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

  function _unsupportedIterableToArray$6(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray$6(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$6(o, minLen); }

  function _arrayLikeToArray$6(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

  function _createSuper$f(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$f(); return function _createSuperInternal() { var Super = _getPrototypeOf$1(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf$1(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn$1(this, result); }; }

  function _isNativeReflectConstruct$f() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
  var Layout = /*#__PURE__*/function (_EventHarness) {
    _inherits$1(Layout, _EventHarness);

    var _super = _createSuper$f(Layout);

    function Layout() {
      var _this;

      _classCallCheck$1(this, Layout);

      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      _this = _super.call.apply(_super, [this].concat(args));

      _defineProperty$1(_assertThisInitialized$1(_this), "app", void 0);

      _defineProperty$1(_assertThisInitialized$1(_this), "surveysMenuId", void 0);

      return _this;
    }

    _createClass(Layout, [{
      key: "setApp",
      value:
      /**
       *
       * @param {App} app
       */
      function setApp(app) {
        var _this2 = this;

        this.app = app;
        app.addListener(App.EVENT_SURVEYS_CHANGED, function () {
          _this2.refreshSurveysMenu();
        });
      }
    }, {
      key: "initialise",
      value: function initialise() {
        var _this3 = this;

        this.refreshSurveysMenu();
        var modalContent = document.createElement('div');
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
        document.body.appendChild(modalContent.getElementsByTagName('div')[0]); // register event handlers once the content is likely to be in the DOM

        setTimeout(function () {
          document.getElementById("".concat(Layout.NEW_SURVEY_MODAL_ID, "confirmed")).addEventListener('click', function (event) {
            event.stopPropagation();
            event.preventDefault();

            if (event.detail < 2) {
              // only if not a double click
              _this3.app.fireEvent(App.EVENT_ADD_SURVEY_USER_REQUEST);
            }
          });
          document.getElementById("".concat(Layout.RESET_MODAL_ID, "confirmed")).addEventListener('click', function (event) {
            event.stopPropagation();
            event.preventDefault();

            if (event.detail < 2) {
              // only if not a double click
              _this3.app.fireEvent(App.EVENT_RESET_SURVEYS);
            }
          });
        }, 100);
      }
    }, {
      key: "refreshSurveysMenu",
      value: function refreshSurveysMenu() {
        var surveyMenuContainer = document.getElementById(this.surveysMenuId);
        /**
         *
         * @type {Array.<string>}
         */

        var items = [];
        var currentSurveyId = this.app.currentSurvey ? this.app.currentSurvey.id : null;

        var _iterator = _createForOfIteratorHelper$6(this.app.surveys),
            _step;

        try {
          for (_iterator.s(); !(_step = _iterator.n()).done;) {
            var surveyTuple = _step.value;
            var survey = surveyTuple[1];
            var label = survey.generateSurveyName() + (surveyTuple[0] === currentSurveyId ? ' <span style="color: green">●</span>' : '');
            items[items.length] = "<a class=\"dropdown-item\" href=\"/app/survey/add/".concat(surveyTuple[0], "\" data-navigo=\"survey/add/").concat(surveyTuple[0], "\">").concat(label, "</a>");
          }
        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }

        surveyMenuContainer.innerHTML = "<a class=\"dropdown-item\" href=\"/app/survey/save\" data-navigo=\"survey/save\">save all</a>\n    <div class=\"dropdown-divider\"></div>\n    ".concat(items.join(''), "\n    <div class=\"dropdown-divider\"></div>\n    <a class=\"dropdown-item\" href=\"/app/survey/new\" data-navigo=\"survey/new\">new survey</a>\n    <a class=\"dropdown-item\" href=\"/app/survey/reset\" data-navigo=\"survey/reset\">reset</a>");
        this.app.router.updatePageLinks();
      }
    }]);

    return Layout;
  }(EventHarness);

  _defineProperty$1(Layout, "NEW_SURVEY_MODAL_ID", 'newsurveymodal');

  _defineProperty$1(Layout, "RESET_MODAL_ID", 'resetmodal');

  _defineProperty$1(Layout, "SAVE_ALL_SUCCESS_MODAL_ID", 'saveallsuccess');

  _defineProperty$1(Layout, "SAVE_ALL_FAILURE_MODAL_ID", 'saveallfailure');

  function _createSuper$e(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$e(); return function _createSuperInternal() { var Super = _getPrototypeOf$1(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf$1(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn$1(this, result); }; }

  function _isNativeReflectConstruct$e() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
  /**
   * @external $
   */

  var SurveyPickerController = /*#__PURE__*/function (_AppController) {
    _inherits$1(SurveyPickerController, _AppController);

    var _super = _createSuper$e(SurveyPickerController);

    /**
     *
     * @param {SurveyPickerView} view
     */
    function SurveyPickerController(view) {
      var _this;

      _classCallCheck$1(this, SurveyPickerController);

      _this = _super.call(this);

      _defineProperty$1(_assertThisInitialized$1(_this), "route", '/survey/:action/:id');

      _defineProperty$1(_assertThisInitialized$1(_this), "title", 'Survey picker');

      _defineProperty$1(_assertThisInitialized$1(_this), "app", void 0);

      _defineProperty$1(_assertThisInitialized$1(_this), "view", void 0);

      _this.view = view;
      view.controller = _assertThisInitialized$1(_this);
      _this.handle = AppController.nextHandle;
      return _this;
    }
    /**
     * registers the default route from this.route
     * or alternatively is overridden in a child class
     *
     * @param {Navigo} router
     */


    _createClass(SurveyPickerController, [{
      key: "survey",
      get:
      /**
       * @type {App}
       */

      /**
       *
       * @type {SurveyPickerView}
       */

      /**
       *
       * @returns {Survey}
       */
      function get() {
        return this.app.currentSurvey;
      }
    }, {
      key: "registerRoute",
      value: function registerRoute(router) {
        router.on('/survey', this.mainRouteHandler.bind(this, 'survey', '', ''), {// before : this.beforeRouteHandler ? this.beforeRouteHandler.bind(this) : null,
          // after : this.afterRouteHandler ? this.afterRouteHandler.bind(this) : null,
          // leave : this.leaveRouteHandler ? this.leaveRouteHandler.bind(this) : null,
          // already : this.alreadyRouteHandler ? this.alreadyRouteHandler.bind(this) : null
        });
        router.on('/survey/new', this.newSurveyHandler.bind(this, 'survey', 'new', ''), {
          before: this.beforeNewHandler.bind(this)
        });
        router.on('/survey/reset', this.mainRouteHandler.bind(this, 'survey', 'reset', ''), {
          before: this.beforeResetHandler.bind(this)
        });
        router.on('/survey/save', this.mainRouteHandler.bind(this, 'survey', 'save', ''), {
          before: this.beforeSaveAllHandler.bind(this)
        });
        router.on('/survey/add/:surveyId', this.addSurveyHandler.bind(this, 'survey', 'add', ''));
        this.app.addListener(App.EVENT_ADD_SURVEY_USER_REQUEST, this.addNewSurveyHandler.bind(this));
        this.app.addListener(App.EVENT_RESET_SURVEYS, this.resetSurveysHandler.bind(this));
      }
    }, {
      key: "beforeNewHandler",
      value: function beforeNewHandler(done) {
        $("#".concat(Layout.NEW_SURVEY_MODAL_ID)).modal();
        this.app.router.pause();
        window.history.back(); // this could fail if previous url was not under the single-page-app umbrella (should test)

        this.app.router.resume();
        done(false); // block navigation
      }
    }, {
      key: "beforeResetHandler",
      value: function beforeResetHandler(done) {
        $("#".concat(Layout.RESET_MODAL_ID)).modal();
        this.app.router.pause();
        window.history.back(); // this could fail if previous url was not under the single-page-app umbrella (should test)

        this.app.router.resume();
        done(false); // block navigation
      }
    }, {
      key: "beforeSaveAllHandler",
      value: function beforeSaveAllHandler(done) {
        // invoke sync of any/all unsaved data
        // show pop-ups on success and failure
        this.app.syncAll().then(function (result) {
          console.log("In save all handler, success result: ".concat(result));

          if (Array.isArray(result)) {
            $("#".concat(Layout.SAVE_ALL_SUCCESS_MODAL_ID)).modal();
          } else {
            $("#".concat(Layout.SAVE_ALL_FAILURE_MODAL_ID)).modal();
          }
        }, function (result) {
          console.log("In save all handler, failure result: ".concat(result));
          $("#".concat(Layout.SAVE_ALL_FAILURE_MODAL_ID)).modal();
        }).finally(function () {// stop the spinner
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

    }, {
      key: "newSurveyHandler",
      value: function newSurveyHandler(context, subcontext, rhs, queryParameters) {// should not get here, as beforeNewHandler ought to have been invoked first
      }
      /**
       * called after user has confirmed add new survey dialog box
       */

    }, {
      key: "addNewSurveyHandler",
      value: function addNewSurveyHandler() {
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

    }, {
      key: "resetSurveysHandler",
      value: function resetSurveysHandler() {
        var _this2 = this;

        this.app.clearLocalForage().then(function () {
          _this2.app.reset();

          _this2.addNewSurveyHandler();
        });
      }
      /**
       *
       * @param {string} context typically 'survey'
       * @param {('add'|'')} subcontext
       * @param {(''|'help')} rhs currently not used
       * @param {Object.<string, string>} queryParameters surveyId
       */

    }, {
      key: "addSurveyHandler",
      value: function addSurveyHandler(context, subcontext, rhs, queryParameters) {
        var _this3 = this;

        console.log("reached addSurveyHandler");
        console.log({
          context: context,
          params: subcontext,
          query: queryParameters
        });
        this.app.currentControllerHandle = this.handle; // when navigate back need to list need to ensure full view refresh

        var surveyId = queryParameters.surveyId;

        if (!surveyId || !surveyId.match(UUID_REGEX)) {
          throw new NotFoundError("Failed to match survey id '".concat(surveyId, "', the id format appears to be incorrect"));
        }

        surveyId = surveyId.toLowerCase();
        this.app.restoreOccurrences(surveyId).then(function () {
          _this3.app.markAllNotPristine();

          _this3.app.router.pause();

          _this3.app.router.navigate('/list').resume();

          _this3.app.router.resolve();
        }, function (error) {
          console.log({
            'failed survey restoration': error
          }); // should display a modal error message
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

    }, {
      key: "mainRouteHandler",
      value: function mainRouteHandler(context, subcontext, rhs, queryParameters) {
        console.log("reached special route handler for SurveyPickerController.js");
        console.log({
          context: context,
          params: subcontext,
          query: queryParameters
        });
      }
    }]);

    return SurveyPickerController;
  }(AppController);

  _defineProperty$1(SurveyPickerController, "EVENT_BACK", 'back');

  /* eslint-disable es/no-string-prototype-matchall -- safe */
  var $$7 = _export$1;
  var createIteratorConstructor = createIteratorConstructor$2;
  var requireObjectCoercible$a = requireObjectCoercible$9;
  var toLength$6 = toLength$5;
  var toString$2 = toString$c;
  var anObject$m = anObject$l;
  var classof$b = classofRaw$1$1;
  var isRegExp$1 = isRegexp;
  var getRegExpFlags = regexpFlags$1;
  var getMethod$8 = getMethod$7;
  var redefine$1$1 = redefine$d.exports;
  var fails$2$1 = fails$u;
  var wellKnownSymbol$1$1 = wellKnownSymbol$q;
  var speciesConstructor = speciesConstructor$4;
  var advanceStringIndex = advanceStringIndex$4;
  var regExpExec = regexpExecAbstract;
  var InternalStateModule$8 = internalState$1;
  var IS_PURE = isPure;

  var MATCH_ALL = wellKnownSymbol$1$1('matchAll');
  var REGEXP_STRING = 'RegExp String';
  var REGEXP_STRING_ITERATOR = REGEXP_STRING + ' Iterator';
  var setInternalState = InternalStateModule$8.set;
  var getInternalState$7 = InternalStateModule$8.getterFor(REGEXP_STRING_ITERATOR);
  var RegExpPrototype$1 = RegExp.prototype;
  var nativeMatchAll = ''.matchAll;

  var WORKS_WITH_NON_GLOBAL_REGEX = !!nativeMatchAll && !fails$2$1(function () {
    'a'.matchAll(/./);
  });

  // eslint-disable-next-line max-len -- ignore
  var $RegExpStringIterator = createIteratorConstructor(function RegExpStringIterator(regexp, string, global, fullUnicode) {
    setInternalState(this, {
      type: REGEXP_STRING_ITERATOR,
      regexp: regexp,
      string: string,
      global: global,
      unicode: fullUnicode,
      done: false
    });
  }, REGEXP_STRING, function next() {
    var state = getInternalState$7(this);
    if (state.done) return { value: undefined, done: true };
    var R = state.regexp;
    var S = state.string;
    var match = regExpExec(R, S);
    if (match === null) return { value: undefined, done: state.done = true };
    if (state.global) {
      if (toString$2(match[0]) === '') R.lastIndex = advanceStringIndex(S, toLength$6(R.lastIndex), state.unicode);
      return { value: match, done: false };
    }
    state.done = true;
    return { value: match, done: false };
  });

  var $matchAll = function (string) {
    var R = anObject$m(this);
    var S = toString$2(string);
    var C, flagsValue, flags, matcher, global, fullUnicode;
    C = speciesConstructor(R, RegExp);
    flagsValue = R.flags;
    if (flagsValue === undefined && R instanceof RegExp && !('flags' in RegExpPrototype$1)) {
      flagsValue = getRegExpFlags.call(R);
    }
    flags = flagsValue === undefined ? '' : toString$2(flagsValue);
    matcher = new C(C === RegExp ? R.source : R, flags);
    global = !!~flags.indexOf('g');
    fullUnicode = !!~flags.indexOf('u');
    matcher.lastIndex = toLength$6(R.lastIndex);
    return new $RegExpStringIterator(matcher, S, global, fullUnicode);
  };

  // `String.prototype.matchAll` method
  // https://tc39.es/ecma262/#sec-string.prototype.matchall
  $$7({ target: 'String', proto: true, forced: WORKS_WITH_NON_GLOBAL_REGEX }, {
    matchAll: function matchAll(regexp) {
      var O = requireObjectCoercible$a(this);
      var flags, S, matcher, rx;
      if (regexp != null) {
        if (isRegExp$1(regexp)) {
          flags = toString$2(requireObjectCoercible$a('flags' in RegExpPrototype$1
            ? regexp.flags
            : getRegExpFlags.call(regexp)
          ));
          if (!~flags.indexOf('g')) throw TypeError('`.matchAll` does not allow non-global regexes');
        }
        if (WORKS_WITH_NON_GLOBAL_REGEX) return nativeMatchAll.apply(O, arguments);
        matcher = getMethod$8(regexp, MATCH_ALL);
        if (matcher === undefined && IS_PURE && classof$b(regexp) == 'RegExp') matcher = $matchAll;
        if (matcher) return matcher.call(regexp, O);
      } else if (WORKS_WITH_NON_GLOBAL_REGEX) return nativeMatchAll.apply(O, arguments);
      S = toString$2(O);
      rx = new RegExp(regexp, 'g');
      return rx[MATCH_ALL](S);
    }
  });

  MATCH_ALL in RegExpPrototype$1 || redefine$1$1(RegExpPrototype$1, MATCH_ALL, $matchAll);

  var $$6 = _export$1;
  var $map = arrayIteration.map;
  var arrayMethodHasSpeciesSupport$1$1 = arrayMethodHasSpeciesSupport$5;

  var HAS_SPECIES_SUPPORT$1 = arrayMethodHasSpeciesSupport$1$1('map');

  // `Array.prototype.map` method
  // https://tc39.es/ecma262/#sec-array.prototype.map
  // with adding support of @@species
  $$6({ target: 'Array', proto: true, forced: !HAS_SPECIES_SUPPORT$1 }, {
    map: function map(callbackfn /* , thisArg */) {
      return $map(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
    }
  });

  function _createForOfIteratorHelper$5(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray$5(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

  function _unsupportedIterableToArray$5(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray$5(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$5(o, minLen); }

  function _arrayLikeToArray$5(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
  var ResponseFactory = /*#__PURE__*/function () {
    function ResponseFactory() {
      _classCallCheck$1(this, ResponseFactory);
    }

    _createClass(ResponseFactory, null, [{
      key: "fromPostedData",
      value:
      /**
       *
       * @param {FormData} formData
       * @returns {LocalResponse}
       */
      function fromPostedData(formData) {
        /**
         * the object that will be saved to IndexedDb
         *
         * this needs to be in scope for several stages of the promise chain
         * @type {{[saved]: string, [type]: string, [imageId]: string, [surveyId]: string, [occurrenceId]: string, [image]: file, [projectId]: number, saveState: string }}
         */
        var toSaveLocally = {
          saveState: SAVE_STATE_LOCAL // mark as not saved externally

        };

        var _iterator = _createForOfIteratorHelper$5(formData.entries()),
            _step;

        try {
          for (_iterator.s(); !(_step = _iterator.n()).done;) {
            var pair = _step.value;
            toSaveLocally[pair[0]] = pair[1];
          }
        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }

        if (!toSaveLocally.type) {
          throw new Error('Missing type in form data.');
        }

        if (ResponseFactory.responses.hasOwnProperty(toSaveLocally.type)) {
          return new ResponseFactory.responses[toSaveLocally.type](toSaveLocally, {});
        } else {
          throw new Error("Unrecognised post type '".concat(toSaveLocally.type, "'"));
        }
      }
      /**
       *
       * @param {{}} returnedToClient
       */

    }, {
      key: "fromPostResponse",
      value: function fromPostResponse(returnedToClient) {
        if (!returnedToClient) {
          throw new Error('Invalid empty post response.');
        }

        if (!returnedToClient.type) {
          throw new Error('Missing type in returned response.');
        }

        if (ResponseFactory.responses.hasOwnProperty(returnedToClient.type)) {
          console.log("in fromPostResponse returning a ".concat(returnedToClient.type));
          return new ResponseFactory.responses[returnedToClient.type]({}, returnedToClient);
        } else {
          throw new Error("Unrecognised post type '".concat(returnedToClient.type, "'"));
        }
      }
    }]);

    return ResponseFactory;
  }();

  _defineProperty$1(ResponseFactory, "responses", {});

  function packageClientResponse(returnedToClient) {
    var headers = new Headers();
    headers.set('Content-Type', 'application/json');
    return new Response(JSON.stringify(returnedToClient), {
      status: returnedToClient.error ? 500 : 200,
      headers: headers
    });
  }

  var LocalResponse = /*#__PURE__*/function () {
    /**
     * @type {Response}
     */
    function LocalResponse(toSaveLocally, returnedToClient) {
      _classCallCheck$1(this, LocalResponse);

      _defineProperty$1(this, "toSaveLocally", void 0);

      _defineProperty$1(this, "returnedToClient", void 0);

      _defineProperty$1(this, "prebuiltResponse", void 0);

      _defineProperty$1(this, "failureErrorMessage", 'Failed to save a local copy on your device.');

      _defineProperty$1(this, "failureErrorHelp", 'Your internet connection may have failed (or there could be a problem with the server). ' + 'It wasn\'t possible to save a temporary copy on your device. Perhaps there is insufficient space? ' + 'Please try to re-establish a network connection and try again.');

      this.toSaveLocally = toSaveLocally;
      this.returnedToClient = returnedToClient;
    }
    /**
     *
     * @param {Response} prebuiltResponse
     * @returns this
     */


    _createClass(LocalResponse, [{
      key: "setPrebuiltResponse",
      value: function setPrebuiltResponse(prebuiltResponse) {
        this.prebuiltResponse = prebuiltResponse;
        return this;
      }
      /**
       *
       * @returns {Promise<Response>}
       */

    }, {
      key: "storeLocally",
      value: function storeLocally() {
        var _this = this;

        return localforage.setItem(this.localKey(), this.toSaveLocally).then(function () {
          console.log("Stored object ".concat(_this.localKey(), " locally"));
          return _this.prebuiltResponse ? _this.prebuiltResponse : packageClientResponse(_this.returnedToClient);
        }, function (reason) {
          console.log("Failed to store object ".concat(_this.localKey(), " locally"));
          console.log({
            reason: reason
          });
          _this.returnedToClient.error = _this.failureErrorMessage;
          _this.returnedToClient.errorHelp = _this.failureErrorHelp;
          return packageClientResponse(_this.returnedToClient);
        });
      }
      /**
       * @return {string}
       */

    }, {
      key: "localKey",
      value: function localKey() {
        throw new Error("LocalKey must be implemented in a subclass for ".concat(this.toSaveLocally.type));
      }
      /**
       * called to build the response to the post that is returned to the client
       * in the absence of the remote server
       *
       * @returns {this}
       * @abstract
       */

    }, {
      key: "populateClientResponse",
      value: function populateClientResponse() {}
    }]);

    return LocalResponse;
  }();

  function _createSuper$d(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$d(); return function _createSuperInternal() { var Super = _getPrototypeOf$1(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf$1(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn$1(this, result); }; }

  function _isNativeReflectConstruct$d() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
  var ImageResponse = /*#__PURE__*/function (_LocalResponse) {
    _inherits$1(ImageResponse, _LocalResponse);

    var _super = _createSuper$d(ImageResponse);

    function ImageResponse() {
      var _this;

      _classCallCheck$1(this, ImageResponse);

      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      _this = _super.call.apply(_super, [this].concat(args));

      _defineProperty$1(_assertThisInitialized$1(_this), "failureErrorMessage", 'Failed to store image.');

      _defineProperty$1(_assertThisInitialized$1(_this), "failureErrorHelp", 'Your internet connection may have failed (or there could be a problem with the server). ' + 'It wasn\'t possible to save a temporary copy on your device. Perhaps there is insufficient space? ' + 'Please try to re-establish a network connection and try again.');

      return _this;
    }

    _createClass(ImageResponse, [{
      key: "populateClientResponse",
      value:
      /**
       * called to build the response to the post that is returned to the client
       * in the absence of the remote server
       *
       * @returns {this}
       */
      function populateClientResponse() {
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

    }, {
      key: "populateLocalSave",
      value: function populateLocalSave() {
        this.toSaveLocally.surveyId = this.returnedToClient.surveyId;
        this.toSaveLocally.type = 'image';
        this.toSaveLocally.occurrenceId = this.returnedToClient.occurrenceId;
        this.toSaveLocally.imageId = this.returnedToClient.id ? this.returnedToClient.id : this.returnedToClient.imageId; // hedging

        this.toSaveLocally.id = this.returnedToClient.id ? this.returnedToClient.id : this.returnedToClient.imageId; // hedging

        this.toSaveLocally.created = parseInt(this.returnedToClient.created, 10); // stamps from server always take precedence

        this.toSaveLocally.modified = parseInt(this.returnedToClient.modified, 10);
        this.toSaveLocally.saveState = SAVE_STATE_SERVER;
        this.toSaveLocally.deleted = this.returnedToClient.deleted === true || this.returnedToClient.deleted === 'true';
        this.toSaveLocally.projectId = parseInt(this.returnedToClient.projectId, 10);
        return this;
      }
      /**
       *
       * @returns {string}
       */

    }, {
      key: "localKey",
      value: function localKey() {
        return "image.".concat(this.toSaveLocally.imageId);
      }
    }], [{
      key: "register",
      value: function register() {
        ResponseFactory.responses.image = ImageResponse;
      }
    }]);

    return ImageResponse;
  }(LocalResponse);

  function _createSuper$c(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$c(); return function _createSuperInternal() { var Super = _getPrototypeOf$1(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf$1(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn$1(this, result); }; }

  function _isNativeReflectConstruct$c() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
  var SurveyResponse = /*#__PURE__*/function (_LocalResponse) {
    _inherits$1(SurveyResponse, _LocalResponse);

    var _super = _createSuper$c(SurveyResponse);

    function SurveyResponse() {
      var _this;

      _classCallCheck$1(this, SurveyResponse);

      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      _this = _super.call.apply(_super, [this].concat(args));

      _defineProperty$1(_assertThisInitialized$1(_this), "failureErrorMessage", 'Failed to store survey.');

      _defineProperty$1(_assertThisInitialized$1(_this), "failureErrorHelp", 'Your internet connection may have failed (or there could be a problem with the server). ' + 'It wasn\'t possible to save a temporary copy on your device. Perhaps there is insufficient space? ' + 'Please try to re-establish a network connection and try again.');

      return _this;
    }

    _createClass(SurveyResponse, [{
      key: "populateClientResponse",
      value:
      /**
       * called to build the response to the post that is returned to the client
       * in the absence of the remote server
       *
       * @returns {this}
       */
      function populateClientResponse() {
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

    }, {
      key: "populateLocalSave",
      value: function populateLocalSave() {
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

    }, {
      key: "localKey",
      value: function localKey() {
        return "survey.".concat(this.toSaveLocally.surveyId);
      }
    }], [{
      key: "register",
      value: function register() {
        ResponseFactory.responses.survey = SurveyResponse;
      }
    }]);

    return SurveyResponse;
  }(LocalResponse);

  function _createSuper$b(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$b(); return function _createSuperInternal() { var Super = _getPrototypeOf$1(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf$1(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn$1(this, result); }; }

  function _isNativeReflectConstruct$b() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
  var OccurrenceResponse = /*#__PURE__*/function (_LocalResponse) {
    _inherits$1(OccurrenceResponse, _LocalResponse);

    var _super = _createSuper$b(OccurrenceResponse);

    function OccurrenceResponse() {
      var _this;

      _classCallCheck$1(this, OccurrenceResponse);

      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      _this = _super.call.apply(_super, [this].concat(args));

      _defineProperty$1(_assertThisInitialized$1(_this), "failureErrorMessage", 'Failed to store occurrence.');

      _defineProperty$1(_assertThisInitialized$1(_this), "failureErrorHelp", 'Your internet connection may have failed (or there could be a problem with the server). ' + 'It wasn\'t possible to save a temporary copy on your device. Perhaps there is insufficient space? ' + 'Please try to re-establish a network connection and try again.');

      return _this;
    }

    _createClass(OccurrenceResponse, [{
      key: "populateClientResponse",
      value:
      /**
       * called to build the response to the post that is returned to the client
       * in the absence of the remote server
       *
       * @returns {this}
       */
      function populateClientResponse() {
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

    }, {
      key: "populateLocalSave",
      value: function populateLocalSave() {
        this.toSaveLocally.occurrenceId = this.returnedToClient.id ? this.returnedToClient.id : this.returnedToClient.occurrenceId; // hedging

        this.toSaveLocally.id = this.returnedToClient.id ? this.returnedToClient.id : this.returnedToClient.occurrenceId; // hedging

        this.toSaveLocally.type = 'occurrence';
        this.toSaveLocally.surveyId = this.returnedToClient.surveyId;
        this.toSaveLocally.attributes = this.returnedToClient.attributes;
        this.toSaveLocally.created = parseInt(this.returnedToClient.created, 10); // stamps from server always take precedence

        this.toSaveLocally.modified = parseInt(this.returnedToClient.modified, 10);
        this.toSaveLocally.saveState = SAVE_STATE_SERVER;
        this.toSaveLocally.deleted = this.returnedToClient.deleted === true || this.returnedToClient.deleted === 'true';
        this.toSaveLocally.projectId = parseInt(this.returnedToClient.projectId, 10);
        return this;
      }
      /**
       *
       * @returns {string}
       */

    }, {
      key: "localKey",
      value: function localKey() {
        return "occurrence.".concat(this.toSaveLocally.occurrenceId);
      }
    }], [{
      key: "register",
      value: function register() {
        ResponseFactory.responses.occurrence = OccurrenceResponse;
      }
    }]);

    return OccurrenceResponse;
  }(LocalResponse);

  var BSBIServiceWorker = /*#__PURE__*/function () {
    function BSBIServiceWorker() {
      _classCallCheck$1(this, BSBIServiceWorker);

      _defineProperty$1(this, "URL_CACHE_SET", void 0);
    }

    _createClass(BSBIServiceWorker, [{
      key: "initialise",
      value:
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
      function initialise(configuration) {
        var _this = this;

        if (!Promise.prototype.finally) {
          Promise.prototype.finally = function (callback) {
            // must use 'function' here rather than arrow, due to this binding requirement
            return this.then(callback).catch(callback);
          };
        }

        ImageResponse.register();
        SurveyResponse.register();
        OccurrenceResponse.register();
        this.CACHE_VERSION = "version-1.0.2.1637947720-".concat(configuration.version);
        var POST_PASS_THROUGH_WHITELIST = configuration.postPassThroughWhitelist;
        var POST_IMAGE_URL_MATCH = configuration.postImageUrlMatch;
        var GET_IMAGE_URL_MATCH = configuration.getImageUrlMatch;
        var SERVICE_WORKER_INTERCEPT_URL_MATCHES = configuration.interceptUrlMatches;
        var SERVICE_WORKER_IGNORE_URL_MATCHES = configuration.ignoreUrlMatches;
        var SERVICE_WORKER_PASS_THROUGH_NO_CACHE = configuration.passThroughNoCache;
        var INDEX_URL = configuration.indexUrl;
        this.URL_CACHE_SET = configuration.urlCacheSet;
        localforage.config({
          name: configuration.forageName
        }); // On install, cache some resources.

        self.addEventListener('install', function (evt) {
          console.log('BSBI app service worker is being installed.'); // noinspection JSIgnoredPromiseFromCall

          self.skipWaiting(); // Ask the service worker to keep installing until the returning promise
          // resolves.

          evt.waitUntil(_this.precache() // see https://serviceworke.rs/immediate-claim_service-worker_doc.html
          .then(function () {
            return self.skipWaiting();
          }));
        });
        self.addEventListener('activate', function (event) {
          event.waitUntil(self.clients.matchAll({
            includeUncontrolled: true
          }).then(function (clientList) {
            var urls = clientList.map(function (client) {
              return client.url;
            });
            console.log('[ServiceWorker] Matching clients:', urls.join(', '));
          }).then(function () {
            return caches.keys();
          }).then(function (cacheNames) {
            return Promise.all(cacheNames.map(function (cacheName) {
              if (cacheName !== _this.CACHE_VERSION) {
                console.log('[ServiceWorker] Deleting old cache:', cacheName);
                return caches.delete(cacheName);
              }
            }));
          }).then(function () {
            console.log('[ServiceWorker] Claiming clients for version', _this.CACHE_VERSION);
            return self.clients.claim();
          }));
        }); // // see https://davidwalsh.name/background-sync
        // // https://developers.google.com/web/updates/2015/12/background-sync
        // self.addEventListener('sync', function(event) {
        //
        // });
        // On fetch, use cache but update the entry with the latest contents
        // from the server.

        self.addEventListener('fetch',
        /** @param {FetchEvent} evt */
        function (evt) {
          //console.log(`The service worker is serving: '${evt.request.url}'`);
          evt.preventDefault();

          if (evt.request.method === 'POST') {
            //console.log(`Got a post request`);
            //if (evt.request.url.match(POST_PASS_THROUGH_WHITELIST)) {
            if (POST_PASS_THROUGH_WHITELIST.test(evt.request.url)) {
              console.log("Passing through whitelisted post request for: ".concat(evt.request.url));
              evt.respondWith(fetch(evt.request));
            } else if (SERVICE_WORKER_PASS_THROUGH_NO_CACHE.test(evt.request.url)) {
              console.log("Passing through nocache list post request for: ".concat(evt.request.url));
              evt.respondWith(fetch(evt.request));
            } else {
              //if (evt.request.url.match(POST_IMAGE_URL_MATCH)) {
              if (POST_IMAGE_URL_MATCH.test(evt.request.url)) {
                console.log("Got an image post request: '".concat(evt.request.url, "'"));

                _this.handle_image_post(evt);
              } else {
                console.log("Got post request: '".concat(evt.request.url, "'"));

                _this.handle_post(evt);
              }
            }
          } else {
            // test whether this is a direct link in to a page that should be substituted by
            // the single page app
            // console.log(`about to test url '${evt.request.url}'`);
            if (SERVICE_WORKER_INTERCEPT_URL_MATCHES.test(evt.request.url) && !SERVICE_WORKER_IGNORE_URL_MATCHES.test(evt.request.url)) {
              // serving single page app instead
              console.log("redirecting to the root of the SPA for '".concat(evt.request.url, "'"));
              var spaRequest = new Request(INDEX_URL);
              evt.respondWith(_this.fromCache(spaRequest));
              evt.waitUntil(_this.update(spaRequest));
            } else if (evt.request.url.match(GET_IMAGE_URL_MATCH)) {
              console.log("request is for an image '".concat(evt.request.url, "'"));

              _this.handleImageFetch(evt);
            } else if (SERVICE_WORKER_PASS_THROUGH_NO_CACHE.test(evt.request.url)) {
              // typically for external content that can't/shouldn't be cached, e.g. MapBox tiles (which mapbox stores directly in the cache itself)
              evt.respondWith(fetch(evt.request));
            } else {
              console.log("request is for non-image '".concat(evt.request.url, "'")); // You can use `respondWith()` to answer immediately, without waiting for the
              // network response to reach the service worker...

              evt.respondWith(_this.fromCache(evt.request)); // ...and `waitUntil()` to prevent the worker from being killed until the
              // cache is updated.

              evt.waitUntil(_this.update(evt.request));
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

    }, {
      key: "handle_post",
      value: function handle_post(evt) {
        var clonedRequest;

        try {
          clonedRequest = evt.request.clone();
        } catch (e) {
          console.log('Failed to clone request.');
          console.log({
            'Cloning error': e
          });
        }

        evt.respondWith(fetch(evt.request).then(function (response) {
          // would get here if the server responds at all, but need to check that the response is ok (not a server error)
          if (response.ok) {
            return Promise.resolve(response).then(function (response) {
              // save the response locally
              // before returning it to the client
              console.log('About to clone the json response.');
              return response.clone().json();
            }).then(function (jsonResponseData) {
              console.log('Following successful remote post, about to save locally.');
              return ResponseFactory.fromPostResponse(jsonResponseData).setPrebuiltResponse(response).populateLocalSave().storeLocally();
            }).catch(function (error) {
              // for some reason local storage failed, after a successful server save
              console.log({
                error: error
              });
              return Promise.resolve(response); // pass through the server response
            });
          } else {
            console.log("Failed to save, moving on to attempt IndexedDb");
            return Promise.reject('Failed to save to server.');
          }
        }).catch(function (reason) {
          // would get here if the network is down
          // or if got invalid response from the server
          console.log("post fetch failed (probably no network), (reason: ".concat(reason, ")")); //console.log({'post failure reason' : reason});
          // /**
          //  * simulated result of post, returned as JSON body
          //  * @type {{surveyId: string, occurrenceId: string, imageId: string, saveState: string, [error]: string, [errorHelp]: string}}
          //  */
          // let returnedToClient = {};

          return clonedRequest.formData().then(function (formData) {
            console.log('got to form data handler'); //console.log({formData});

            return ResponseFactory.fromPostedData(formData).populateClientResponse().storeLocally();
          }, function (reason) {
            console.log('failed to read form data locally');
            console.log({
              reason: reason
            });
            /**
             * simulated result of post, returned as JSON body
             * @type {{[surveyId]: string, [occurrenceId]: string, [imageId]: string, [saveState]: string, [error]: string, [errorHelp]: string}}
             */

            var returnedToClient = {
              error: 'Failed to process posted response data. (internal error)',
              errorHelp: 'Your internet connection may have failed (or there could be a problem with the server). ' + 'It wasn\'t possible to save a temporary copy on your device. (an unexpected error occurred) ' + 'Please try to re-establish a network connection and try again.'
            };
            return packageClientResponse(returnedToClient);
          });
        }));
      }
      /**
       * used to handle image posts, which need to respond quickly even if the network is slow
       * attempts local cache first then saves out to network
       *
       * @param {FetchEvent} event
       */

    }, {
      key: "handle_image_post",
      value: function handle_image_post(event) {
        var clonedRequest;
        console.log('posting image');

        try {
          clonedRequest = event.request.clone();
        } catch (e) {
          console.log('Failed to clone request.');
          console.log({
            'Cloning error': e
          });
        }

        event.respondWith(clonedRequest.formData().then(function (formData) {
          console.log('got to form data handler'); //console.log({formData});

          return ResponseFactory.fromPostedData(formData).populateClientResponse().storeLocally();
        }, function (reason) {
          console.log('failed to read form data locally');
          console.log({
            reason: reason
          });
          /**
           * simulated result of post, returned as JSON body
           * @type {{[surveyId]: string, [occurrenceId]: string, [imageId]: string, [saveState]: string, [error]: string, [errorHelp]: string}}
           */

          var returnedToClient = {
            error: 'Failed to process posted response data. (internal error)',
            errorHelp: 'Your internet connection may have failed (or there could be a problem with the server). ' + 'It wasn\'t possible to save a temporary copy on your device. (an unexpected error occurred) ' + 'Please try to re-establish a network connection and try again.'
          };
          return packageClientResponse(returnedToClient);
        }));
        event.waitUntil(fetch(event.request).then(function (response) {
          console.log('posted image to server in waitUntil part of fetch cycle'); // would get here if the server responds at all, but need to check that the response is ok (not a server error)

          if (response.ok) {
            console.log('posted image to server in waitUntil part of fetch cycle: got OK response');
            return Promise.resolve(response).then(function (response) {
              // save the response locally
              // before returning it to the client
              return response.clone().json();
            }).then(function (jsonResponseData) {
              return ResponseFactory.fromPostResponse(jsonResponseData).setPrebuiltResponse(response).populateLocalSave().storeLocally();
            }).catch(function (error) {
              // for some reason local storage failed, after a successful server save
              console.log({
                error: error
              });
              return Promise.resolve(response); // pass through the server response
            });
          } else {
            // console.log(`Failed to save, moving on to attempt IndexedDb`);
            // return Promise.reject('Failed to save to server.');

            /**
             * simulated result of post, returned as JSON body
             * @type {{[surveyId]: string, [occurrenceId]: string, [imageId]: string, [saveState]: string, [error]: string, [errorHelp]: string}}
             */
            var returnedToClient = {
              error: 'Failed to save posted response data. (internal error)',
              errorHelp: 'Your internet connection may have failed (or there could be a problem with the server). ' + 'It wasn\'t possible to save a temporary copy on your device. (an unexpected error occurred) ' + 'Please try to re-establish a network connection and try again.'
            };
            return packageClientResponse(returnedToClient);
          }
        }));
      }
      /**
       * Open a cache and use `addAll()` with an array of assets to add all of them
       * to the cache. Return a promise resolving when all the assets are added.
       *
       * @returns {Promise<void>}
       */

    }, {
      key: "precache",
      value: function precache() {
        var _this2 = this;

        return caches.open(this.CACHE_VERSION).then(function (cache) {
          return cache.addAll(_this2.URL_CACHE_SET);
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

    }, {
      key: "fromCache",
      value: function fromCache(request) {
        var _this3 = this;

        // @todo need to serve index.html in place of all Navigo-served pages
        // (an issue if someone returns to a bookmarked page within the app)
        console.log('attempting fromCache response');
        return caches.open(this.CACHE_VERSION).then(function (cache) {
          console.log('cache is open');
          return cache.match(request).then(function (matching) {
            console.log(matching ? "cache matched ".concat(request.url) : "no cache match for ".concat(request.url)); //return matching || fetch(request); // return cache match or if not cached then go out to network

            return matching || _this3.update(request); // return cache match or if not cached then go out to network (and then locally cache the response)
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

    }, {
      key: "handleImageFetch",
      value: function handleImageFetch(evt) {
        var _this4 = this;

        evt.respondWith(this.fromCache(evt.request).then(function (response) {
          console.log('In handleImageFetch promise'); // response may be a 404

          if (response && response.ok) {
            console.log('Responding with image from cache (or remotely if no cache).');
            return response;
          } else {
            // not cached and no network access
            // try to respond from local storage
            var url = evt.request.url;
            console.log("Attempting image match for '".concat(url, "'"));
            var matches = url.match(/imageid=([a-fA-F0-9]{8}-(?:[a-fA-F0-9]{4}-){3}[a-fA-F0-9]{12})/);

            if (matches) {
              var imageId = matches[1];
              console.log("Returning image match for '".concat(url, "' from local database"));
              return _this4.imageFromLocalDatabase(imageId);
            } else {
              console.log("Failed to match image id in url '".concat(url, "'"));
            }
          }
        }).catch(function (error) {
          var url = evt.request.url;
          console.log(error);
          console.log("caught ".concat(error));
          console.log("In catch following failed network fetch, attempting image match for '".concat(url, "'"));
          var matches = url.match(/imageid=([a-fA-F0-9]{8}-(?:[a-fA-F0-9]{4}-){3}[a-fA-F0-9]{12})/);

          if (matches) {
            var imageId = matches[1];
            console.log("(via catch) Returning image match for '".concat(url, "' from local database"));
            return _this4.imageFromLocalDatabase(imageId);
          } else {
            console.log("(via catch) Failed to match image id in url '".concat(url, "'"));
          }
        }));
      }
      /**
       *
       * @param {string} imageId
       * @returns {Promise}
       */

    }, {
      key: "imageFromLocalDatabase",
      value: function imageFromLocalDatabase(imageId) {
        var image = new OccurrenceImage();
        console.log('attempting retrieval of image data from local database');
        return Model.retrieveFromLocal(imageId, image).then(function (image) {
          console.log("Retrieved image '".concat(imageId, "' from indexeddb."));

          if (image.file) {
            var headers = new Headers();
            headers.append('Content-Type', image.file.type);
            return new Response(image.file, {
              "status": 200,
              "statusText": "OK image response from IndexedDb"
            });
          } else {
            console.log("No local file object associated with retrieved image '".concat(imageId, "' from indexeddb."));
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

    }, {
      key: "update",
      value: function update(request) {
        request = new Request(request, {
          mode: 'cors',
          credentials: 'omit'
        });
        console.log("Attempting fetch and cache update of ".concat(request.url));
        return caches.open(this.CACHE_VERSION).then(function (cache) {
          return fetch(request, {
            cache: "no-cache"
          }).then(function (response) {
            if (response.ok) {
              console.log("(re-)caching ".concat(request.url));
              return cache.put(request, response).then(function () {
                return cache.match(request);
              });
            } else {
              console.log("Request during cache update failed for ".concat(request.url));
              console.log({
                'failed cache response': response
              });
              return Promise.reject('Request during cache update failed, not caching.');
            }
          }).catch(function (error) {
            console.log("Cache attempt failed for ".concat(request.url, ": error was ").concat(error));
          });
        });
      }
    }]);

    return BSBIServiceWorker;
  }();

  var DESCRIPTORS$e = descriptors$1;
  var global$1$1 = global$t;
  var isForced$5 = isForced_1$1;
  var inheritIfRequired = inheritIfRequired$2;
  var createNonEnumerableProperty$9 = createNonEnumerableProperty$8;
  var defineProperty = objectDefineProperty$1.f;
  var getOwnPropertyNames = objectGetOwnPropertyNames$1.f;
  var isRegExp = isRegexp;
  var toString$1 = toString$c;
  var getFlags = regexpFlags$1;
  var stickyHelpers = regexpStickyHelpers;
  var redefine$e = redefine$d.exports;
  var fails$1$1 = fails$u;
  var hasOwn$f = hasOwnProperty_1$1;
  var enforceInternalState$2 = internalState$1.enforce;
  var setSpecies = setSpecies$3;
  var wellKnownSymbol$r = wellKnownSymbol$q;
  var UNSUPPORTED_DOT_ALL = regexpUnsupportedDotAll;
  var UNSUPPORTED_NCG = regexpUnsupportedNcg;

  var MATCH = wellKnownSymbol$r('match');
  var NativeRegExp = global$1$1.RegExp;
  var RegExpPrototype = NativeRegExp.prototype;
  // TODO: Use only propper RegExpIdentifierName
  var IS_NCG = /^\?<[^\s\d!#%&*+<=>@^][^\s!#%&*+<=>@^]*>/;
  var re1 = /a/g;
  var re2 = /a/g;

  // "new" should create a new object, old webkit bug
  var CORRECT_NEW = new NativeRegExp(re1) !== re1;

  var UNSUPPORTED_Y = stickyHelpers.UNSUPPORTED_Y;

  var BASE_FORCED = DESCRIPTORS$e &&
    (!CORRECT_NEW || UNSUPPORTED_Y || UNSUPPORTED_DOT_ALL || UNSUPPORTED_NCG || fails$1$1(function () {
      re2[MATCH] = false;
      // RegExp constructor can alter flags and IsRegExp works correct with @@match
      return NativeRegExp(re1) != re1 || NativeRegExp(re2) == re2 || NativeRegExp(re1, 'i') != '/a/i';
    }));

  var handleDotAll = function (string) {
    var length = string.length;
    var index = 0;
    var result = '';
    var brackets = false;
    var chr;
    for (; index <= length; index++) {
      chr = string.charAt(index);
      if (chr === '\\') {
        result += chr + string.charAt(++index);
        continue;
      }
      if (!brackets && chr === '.') {
        result += '[\\s\\S]';
      } else {
        if (chr === '[') {
          brackets = true;
        } else if (chr === ']') {
          brackets = false;
        } result += chr;
      }
    } return result;
  };

  var handleNCG = function (string) {
    var length = string.length;
    var index = 0;
    var result = '';
    var named = [];
    var names = {};
    var brackets = false;
    var ncg = false;
    var groupid = 0;
    var groupname = '';
    var chr;
    for (; index <= length; index++) {
      chr = string.charAt(index);
      if (chr === '\\') {
        chr = chr + string.charAt(++index);
      } else if (chr === ']') {
        brackets = false;
      } else if (!brackets) switch (true) {
        case chr === '[':
          brackets = true;
          break;
        case chr === '(':
          if (IS_NCG.test(string.slice(index + 1))) {
            index += 2;
            ncg = true;
          }
          result += chr;
          groupid++;
          continue;
        case chr === '>' && ncg:
          if (groupname === '' || hasOwn$f(names, groupname)) {
            throw new SyntaxError('Invalid capture group name');
          }
          names[groupname] = true;
          named.push([groupname, groupid]);
          ncg = false;
          groupname = '';
          continue;
      }
      if (ncg) groupname += chr;
      else result += chr;
    } return [result, named];
  };

  // `RegExp` constructor
  // https://tc39.es/ecma262/#sec-regexp-constructor
  if (isForced$5('RegExp', BASE_FORCED)) {
    var RegExpWrapper = function RegExp(pattern, flags) {
      var thisIsRegExp = this instanceof RegExpWrapper;
      var patternIsRegExp = isRegExp(pattern);
      var flagsAreUndefined = flags === undefined;
      var groups = [];
      var rawPattern = pattern;
      var rawFlags, dotAll, sticky, handled, result, state;

      if (!thisIsRegExp && patternIsRegExp && flagsAreUndefined && pattern.constructor === RegExpWrapper) {
        return pattern;
      }

      if (patternIsRegExp || pattern instanceof RegExpWrapper) {
        pattern = pattern.source;
        if (flagsAreUndefined) flags = 'flags' in rawPattern ? rawPattern.flags : getFlags.call(rawPattern);
      }

      pattern = pattern === undefined ? '' : toString$1(pattern);
      flags = flags === undefined ? '' : toString$1(flags);
      rawPattern = pattern;

      if (UNSUPPORTED_DOT_ALL && 'dotAll' in re1) {
        dotAll = !!flags && flags.indexOf('s') > -1;
        if (dotAll) flags = flags.replace(/s/g, '');
      }

      rawFlags = flags;

      if (UNSUPPORTED_Y && 'sticky' in re1) {
        sticky = !!flags && flags.indexOf('y') > -1;
        if (sticky) flags = flags.replace(/y/g, '');
      }

      if (UNSUPPORTED_NCG) {
        handled = handleNCG(pattern);
        pattern = handled[0];
        groups = handled[1];
      }

      result = inheritIfRequired(NativeRegExp(pattern, flags), thisIsRegExp ? this : RegExpPrototype, RegExpWrapper);

      if (dotAll || sticky || groups.length) {
        state = enforceInternalState$2(result);
        if (dotAll) {
          state.dotAll = true;
          state.raw = RegExpWrapper(handleDotAll(pattern), rawFlags);
        }
        if (sticky) state.sticky = true;
        if (groups.length) state.groups = groups;
      }

      if (pattern !== rawPattern) try {
        // fails in old engines, but we have no alternatives for unsupported regex syntax
        createNonEnumerableProperty$9(result, 'source', rawPattern === '' ? '(?:)' : rawPattern);
      } catch (error) { /* empty */ }

      return result;
    };

    var proxy = function (key) {
      key in RegExpWrapper || defineProperty(RegExpWrapper, key, {
        configurable: true,
        get: function () { return NativeRegExp[key]; },
        set: function (it) { NativeRegExp[key] = it; }
      });
    };

    for (var keys$2 = getOwnPropertyNames(NativeRegExp), index = 0; keys$2.length > index;) {
      proxy(keys$2[index++]);
    }

    RegExpPrototype.constructor = RegExpWrapper;
    RegExpWrapper.prototype = RegExpPrototype;
    redefine$e(global$1$1, 'RegExp', RegExpWrapper);
  }

  // https://tc39.es/ecma262/#sec-get-regexp-@@species
  setSpecies('RegExp');

  // TODO: use something more complex like timsort?
  var floor$3 = Math.floor;

  var mergeSort = function (array, comparefn) {
    var length = array.length;
    var middle = floor$3(length / 2);
    return length < 8 ? insertionSort(array, comparefn) : merge(
      mergeSort(array.slice(0, middle), comparefn),
      mergeSort(array.slice(middle), comparefn),
      comparefn
    );
  };

  var insertionSort = function (array, comparefn) {
    var length = array.length;
    var i = 1;
    var element, j;

    while (i < length) {
      j = i;
      element = array[i];
      while (j && comparefn(array[j - 1], element) > 0) {
        array[j] = array[--j];
      }
      if (j !== i++) array[j] = element;
    } return array;
  };

  var merge = function (left, right, comparefn) {
    var llength = left.length;
    var rlength = right.length;
    var lindex = 0;
    var rindex = 0;
    var result = [];

    while (lindex < llength || rindex < rlength) {
      if (lindex < llength && rindex < rlength) {
        result.push(comparefn(left[lindex], right[rindex]) <= 0 ? left[lindex++] : right[rindex++]);
      } else {
        result.push(lindex < llength ? left[lindex++] : right[rindex++]);
      }
    } return result;
  };

  var arraySort = mergeSort;

  var userAgent$1 = engineUserAgent$1;

  var firefox = userAgent$1.match(/firefox\/(\d+)/i);

  var engineFfVersion = !!firefox && +firefox[1];

  var UA = engineUserAgent$1;

  var engineIsIeOrEdge = /MSIE|Trident/.test(UA);

  var userAgent$6 = engineUserAgent$1;

  var webkit = userAgent$6.match(/AppleWebKit\/(\d+)\./);

  var engineWebkitVersion = !!webkit && +webkit[1];

  var $$5 = _export$1;
  var aCallable$8 = aCallable$7;
  var toObject$1$1 = toObject$a;
  var lengthOfArrayLike$1$1 = lengthOfArrayLike$8;
  var toString$f = toString$c;
  var fails$v = fails$u;
  var internalSort = arraySort;
  var arrayMethodIsStrict = arrayMethodIsStrict$3;
  var FF = engineFfVersion;
  var IE_OR_EDGE = engineIsIeOrEdge;
  var V8 = engineV8Version$1;
  var WEBKIT = engineWebkitVersion;

  var test$2 = [];
  var nativeSort = test$2.sort;

  // IE8-
  var FAILS_ON_UNDEFINED = fails$v(function () {
    test$2.sort(undefined);
  });
  // V8 bug
  var FAILS_ON_NULL = fails$v(function () {
    test$2.sort(null);
  });
  // Old WebKit
  var STRICT_METHOD = arrayMethodIsStrict('sort');

  var STABLE_SORT = !fails$v(function () {
    // feature detection can be too slow, so check engines versions
    if (V8) return V8 < 70;
    if (FF && FF > 3) return;
    if (IE_OR_EDGE) return true;
    if (WEBKIT) return WEBKIT < 603;

    var result = '';
    var code, chr, value, index;

    // generate an array with more 512 elements (Chakra and old V8 fails only in this case)
    for (code = 65; code < 76; code++) {
      chr = String.fromCharCode(code);

      switch (code) {
        case 66: case 69: case 70: case 72: value = 3; break;
        case 68: case 71: value = 4; break;
        default: value = 2;
      }

      for (index = 0; index < 47; index++) {
        test$2.push({ k: chr + index, v: value });
      }
    }

    test$2.sort(function (a, b) { return b.v - a.v; });

    for (index = 0; index < test$2.length; index++) {
      chr = test$2[index].k.charAt(0);
      if (result.charAt(result.length - 1) !== chr) result += chr;
    }

    return result !== 'DGBEFHACIJK';
  });

  var FORCED$1 = FAILS_ON_UNDEFINED || !FAILS_ON_NULL || !STRICT_METHOD || !STABLE_SORT;

  var getSortCompare = function (comparefn) {
    return function (x, y) {
      if (y === undefined) return -1;
      if (x === undefined) return 1;
      if (comparefn !== undefined) return +comparefn(x, y) || 0;
      return toString$f(x) > toString$f(y) ? 1 : -1;
    };
  };

  // `Array.prototype.sort` method
  // https://tc39.es/ecma262/#sec-array.prototype.sort
  $$5({ target: 'Array', proto: true, forced: FORCED$1 }, {
    sort: function sort(comparefn) {
      if (comparefn !== undefined) aCallable$8(comparefn);

      var array = toObject$1$1(this);

      if (STABLE_SORT) return comparefn === undefined ? nativeSort.call(array) : nativeSort.call(array, comparefn);

      var items = [];
      var arrayLength = lengthOfArrayLike$1$1(array);
      var itemsLength, index;

      for (index = 0; index < arrayLength; index++) {
        if (index in array) items.push(array[index]);
      }

      items = internalSort(items, getSortCompare(comparefn));
      itemsLength = items.length;
      index = 0;

      while (index < itemsLength) array[index] = items[index++];
      while (index < arrayLength) delete array[index++];

      return array;
    }
  });

  var $$4 = _export$1;
  var toAbsoluteIndex$4 = toAbsoluteIndex$3;
  var toIntegerOrInfinity$6 = toIntegerOrInfinity$5;
  var lengthOfArrayLike$9 = lengthOfArrayLike$8;
  var toObject$b = toObject$a;
  var arraySpeciesCreate$4 = arraySpeciesCreate$3;
  var createProperty$6 = createProperty$5;
  var arrayMethodHasSpeciesSupport$6 = arrayMethodHasSpeciesSupport$5;

  var HAS_SPECIES_SUPPORT = arrayMethodHasSpeciesSupport$6('splice');

  var max$4 = Math.max;
  var min$5 = Math.min;
  var MAX_SAFE_INTEGER$2 = 0x1FFFFFFFFFFFFF;
  var MAXIMUM_ALLOWED_LENGTH_EXCEEDED = 'Maximum allowed length exceeded';

  // `Array.prototype.splice` method
  // https://tc39.es/ecma262/#sec-array.prototype.splice
  // with adding support of @@species
  $$4({ target: 'Array', proto: true, forced: !HAS_SPECIES_SUPPORT }, {
    splice: function splice(start, deleteCount /* , ...items */) {
      var O = toObject$b(this);
      var len = lengthOfArrayLike$9(O);
      var actualStart = toAbsoluteIndex$4(start, len);
      var argumentsLength = arguments.length;
      var insertCount, actualDeleteCount, A, k, from, to;
      if (argumentsLength === 0) {
        insertCount = actualDeleteCount = 0;
      } else if (argumentsLength === 1) {
        insertCount = 0;
        actualDeleteCount = len - actualStart;
      } else {
        insertCount = argumentsLength - 2;
        actualDeleteCount = min$5(max$4(toIntegerOrInfinity$6(deleteCount), 0), len - actualStart);
      }
      if (len + insertCount - actualDeleteCount > MAX_SAFE_INTEGER$2) {
        throw TypeError(MAXIMUM_ALLOWED_LENGTH_EXCEEDED);
      }
      A = arraySpeciesCreate$4(O, actualDeleteCount);
      for (k = 0; k < actualDeleteCount; k++) {
        from = actualStart + k;
        if (from in O) createProperty$6(A, k, O[from]);
      }
      A.length = actualDeleteCount;
      if (insertCount < actualDeleteCount) {
        for (k = actualStart; k < len - actualDeleteCount; k++) {
          from = k + actualDeleteCount;
          to = k + insertCount;
          if (from in O) O[to] = O[from];
          else delete O[to];
        }
        for (k = len; k > len - actualDeleteCount + insertCount; k--) delete O[k - 1];
      } else if (insertCount > actualDeleteCount) {
        for (k = len - actualDeleteCount; k > actualStart; k--) {
          from = k + actualDeleteCount - 1;
          to = k + insertCount - 1;
          if (from in O) O[to] = O[from];
          else delete O[to];
        }
      }
      for (k = 0; k < insertCount; k++) {
        O[k + actualStart] = arguments[k + 2];
      }
      O.length = len - actualDeleteCount + insertCount;
      return A;
    }
  });

  /**
   * @external BsbiDb
   */

  var TaxonSearch = /*#__PURE__*/function () {
    /**
     * see TaxonRank::sort
     *
     * @type int|null
     */

    /**
     * if set then only taxa with records are returned
     *
     * @type boolean
     */
    // /**
    //  * if set then only taxa with records present in the specified status scheme (scheme id code)
    //  * (default null)
    //  *
    //  * @type string|null
    //  */
    // requiredStatusSchemeId = null;

    /**
     * if set then require that returned taxon names are >= 3 letters
     * and don't contain numerals
     *
     * @type boolean
     */

    /**
     * (static config setting)
     *
     * @type {boolean}
     */
    function TaxonSearch() {
      _classCallCheck$1(this, TaxonSearch);

      _defineProperty$1(this, "minimumRankSort", null);

      _defineProperty$1(this, "requireExtantDDbRecords", false);

      _defineProperty$1(this, "skipJunk", true);

      if (!Taxon.rawTaxa) {
        Taxon.rawTaxa = BsbiDb.TaxonNames;

        if (!Taxon.rawTaxa) {
          throw new Error('Taxon list has failed to load in TaxonSearch');
        }
      }
    }
    /**
     *
     * @param {object} taxonResult
     * @param {string} queryString
     * @returns {string}
     */


    _createClass(TaxonSearch, [{
      key: "lookup",
      value:
      /**
       *
       * @param {string} query
       * @returns {Array.<{entityId: string,
                          vernacular: string,
                          qname: string,
                          name: string,
                          qualifier: string,
                          authority: string,
                          uname: string,
                          vernacularMatched: boolean,
                          exact: boolean,
                          near: boolean,
                          formatted: string,
                          acceptedEntityId: string,
                          acceptedNameString: string,
                          acceptedQualifier: string,
                          acceptedAuthority: string
                          }>}
       */
      function lookup(query) {
        var results,
            taxonString,
            canonical,
            matchedIds = {},
            preferHybrids; // ignore trailing ' x' from string which would just muck up result matching

        taxonString = TaxonSearch.normaliseTaxonName(decodeURIComponent(query).trim()).replace(/\s+x$/i, '');
        preferHybrids = / x\b/.test(taxonString);

        if (taxonString !== '') {
          var abbreviatedMatches = taxonString.match(TaxonSearch.abbreviatedGenusRegex);

          if (abbreviatedMatches) {
            // matched an abbreviated genus name (or an abbreviated hybrid genus)
            var exp, nearMatchExp;

            if (abbreviatedMatches[2] === 'X' || abbreviatedMatches[2] === 'x') {
              // either have a genus name beginning 'X' or a hybrid genus
              exp = new RegExp("^(X\\s|X[a-z]+\\s+)(x )?\\b".concat(TaxonSearch.generate_hybrid_combinations_regex(abbreviatedMatches[3]), ".*"), 'i');
              nearMatchExp = exp;
            } else {
              exp = new RegExp("^(X )?".concat(TaxonSearch.escapeRegExp(abbreviatedMatches[2]), "[a-z]+ (x )?.*\\b").concat(TaxonSearch.generate_hybrid_combinations_regex(abbreviatedMatches[3]), ".*"), 'i');
              /**
               * Similar to exp but without flexibility (.*) after genus part
               * used only for result ranking (exact>near>vague)
               */

              nearMatchExp = new RegExp("^(X )?".concat(TaxonSearch.escapeRegExp(abbreviatedMatches[2]), "[a-z]+ (x )?\\b").concat(TaxonSearch.generate_hybrid_combinations_regex(abbreviatedMatches[3]), ".*"), 'i');
            }

            for (var id in Taxon.rawTaxa) {
              // noinspection JSUnfilteredForInLoop (assume is safe for rawTaxa object)
              var testTaxon = Taxon.rawTaxa[id];
              /**
               * The canonical name may be identical to the nameString in which case JSON taxon list stores
               * zero instead to save file space (and to mark that canonical name should be ignored)
               */

              canonical = testTaxon[TaxonSearch.canonicalColumn] === 0 ? testTaxon[TaxonSearch.nameStringColumn] : testTaxon[TaxonSearch.canonicalColumn];

              if (exp.test(canonical) || testTaxon[TaxonSearch.hybridCanonicalColumn] !== '' && exp.test(testTaxon[TaxonSearch.hybridCanonicalColumn])) {
                matchedIds[id] = {
                  exact: testTaxon[TaxonSearch.nameStringColumn] === taxonString,
                  near: nearMatchExp.test(testTaxon[TaxonSearch.nameStringColumn])
                };
              }
            }

            results = this.compile_results(matchedIds, preferHybrids);
          } else {
            // genus is not abbreviated
            var canonicalQuery, nearMatchRegex;
            var escapedTaxonString = TaxonSearch.escapeRegExp(taxonString);

            if (taxonString.indexOf(' ') !== -1) {
              // hybrids of the form Species x nothoname or Species nothoname should be seen as equivalent
              canonicalQuery = "".concat(TaxonSearch.escapeRegExp(taxonString.substr(0, taxonString.indexOf(' '))), " (x )?.*\\b").concat(TaxonSearch.generate_hybrid_combinations_regex(taxonString.substr(taxonString.indexOf(' ') + 1)), ".*");
              /**
               * Similar to canonicalQuery/hybridCanonicalQuery but without flexibility (.*) after genus part
               * used only for result ranking (exact>near>vague)
               */

              nearMatchRegex = new RegExp("^(?:Xs+)?".concat(TaxonSearch.escapeRegExp(taxonString.substr(0, taxonString.indexOf(' '))), " (x )?\\b").concat(TaxonSearch.generate_hybrid_combinations_regex(taxonString.substr(taxonString.indexOf(' ') + 1)), ".*"), 'i');
            } else {
              canonicalQuery = "".concat(escapedTaxonString, ".*");
              nearMatchRegex = new RegExp("^".concat(escapedTaxonString, ".*"));
            }

            var strictEscapedTaxonString = "^".concat(escapedTaxonString, ".*"); // var escapedTaxonStringRegExp = new RegExp(strictEscapedTaxonString, 'i');
            // var canonicalQueryRegExp = new RegExp('^' + canonicalQuery, 'i');
            // var hybridCanonicalQueryregExp = new RegExp('^X ' + canonicalQuery, 'i');

            var canonicalQueryRegExp = new RegExp("^(?:Xs+)?".concat(canonicalQuery), 'i');

            if (!TaxonSearch.showVernacular) {
              // no vernacular
              for (var _id in Taxon.rawTaxa) {
                // noinspection JSUnfilteredForInLoop (assume is safe for rawTaxa object)
                var _testTaxon = Taxon.rawTaxa[_id];
                canonical = _testTaxon[TaxonSearch.canonicalColumn] === 0 ? _testTaxon[TaxonSearch.nameStringColumn] : _testTaxon[TaxonSearch.canonicalColumn];

                if ( // testTaxon[TaxonSearch.nameStringColumn].search(escapedTaxonStringRegExp) !== -1 ||
                canonicalQueryRegExp.test(_testTaxon[TaxonSearch.nameStringColumn]) || canonical !== _testTaxon[TaxonSearch.nameStringColumn] && canonicalQueryRegExp.test(canonical) // testTaxon[TaxonSearch.nameStringColumn].search(hybridCanonicalQueryregExp) !== -1
                ) {
                  matchedIds[_id] = {
                    exact: _testTaxon[TaxonSearch.nameStringColumn] === taxonString
                  };
                }
              }

              results = this.compile_results(matchedIds, preferHybrids);
            } else {
              var caseInsensitiveEscapedTaxonRegex = new RegExp(strictEscapedTaxonString, 'i');

              for (var _id2 in Taxon.rawTaxa) {
                // noinspection JSUnfilteredForInLoop (assume is safe for rawTaxa object)
                var _testTaxon2 = Taxon.rawTaxa[_id2];
                canonical = _testTaxon2[TaxonSearch.canonicalColumn] === 0 ? _testTaxon2[TaxonSearch.nameStringColumn] : _testTaxon2[TaxonSearch.canonicalColumn];

                if ( // testTaxon[TaxonSearch.nameStringColumn].search(escapedTaxonStringRegExp) !== -1 ||
                canonicalQueryRegExp.test(_testTaxon2[TaxonSearch.nameStringColumn]) || canonical !== _testTaxon2[TaxonSearch.nameStringColumn] && canonicalQueryRegExp.test(canonical) // testTaxon[TaxonSearch.nameStringColumn].search(hybridCanonicalQueryregExp) !== -1
                ) {
                  matchedIds[_id2] = {
                    exact: _testTaxon2[TaxonSearch.nameStringColumn] === taxonString,
                    near: nearMatchRegex.test(_testTaxon2[TaxonSearch.nameStringColumn]) || nearMatchRegex.test(canonical)
                  };
                } else if (caseInsensitiveEscapedTaxonRegex.test(_testTaxon2[TaxonSearch.vernacularColumn]) || caseInsensitiveEscapedTaxonRegex.test(_testTaxon2[TaxonSearch.vernacularRootColumn])) {
                  matchedIds[_id2] = {
                    exact: _testTaxon2[TaxonSearch.vernacularColumn] === taxonString,
                    vernacular: true
                  };
                }
              }

              results = this.compile_results(matchedIds, preferHybrids);
              /**
               * if very few matches then retry searching using much fuzzier matching
               */

              if (results.length < 5) {
                var broadRegExp = new RegExp("\\b".concat(escapedTaxonString, ".*"), 'i'); // match anywhere in string

                for (var _id3 in Taxon.rawTaxa) {
                  // noinspection JSUnfilteredForInLoop (assume is safe for rawTaxa object)
                  if (!matchedIds.hasOwnProperty(_id3)) {
                    var _testTaxon3 = Taxon.rawTaxa[_id3];

                    if (broadRegExp.test(_testTaxon3[TaxonSearch.nameStringColumn])) {
                      matchedIds[_id3] = {
                        exact: _testTaxon3[TaxonSearch.nameStringColumn] === taxonString
                      };
                    } else if (_testTaxon3[TaxonSearch.canonicalColumn] !== 0 && broadRegExp.test(_testTaxon3[TaxonSearch.canonicalColumn]) || broadRegExp.test(_testTaxon3[TaxonSearch.vernacularColumn])) {
                      matchedIds[_id3] = {
                        exact: _testTaxon3[TaxonSearch.nameStringColumn] === taxonString,
                        vernacular: true
                      };
                    }
                  }
                }

                results = this.compile_results(matchedIds, preferHybrids);
              }
            }
          }
        } else {
          results = [];
        }

        return results;
      }
    }, {
      key: "compile_results",
      value: function compile_results(matchedIds, preferHybrids) {
        var results = [];

        for (var id in matchedIds) {
          if (matchedIds.hasOwnProperty(id)) {
            var taxon = Taxon.rawTaxa[id];

            if ((!this.requireExtantDDbRecords || this.requireExtantDDbRecords && taxon[TaxonSearch.usedColumn] === 1) && (!this.minimumRankSort || this.minimumRankSort > 0 && taxon[TaxonSearch.minRankColumn] >= this.minimumRankSort)) {
              var qname = taxon[TaxonSearch.nameStringColumn] + (taxon[TaxonSearch.qualifierColumn] ? " ".concat(taxon[TaxonSearch.qualifierColumn]) : '');
              var row = {
                entityId: id,
                vernacular: taxon[TaxonSearch.vernacularColumn],
                qname: qname,
                name: qname,
                // use qualified name for the generic name field
                qualifier: taxon[TaxonSearch.qualifierColumn],
                authority: taxon[TaxonSearch.authorityColumn],
                uname: taxon[TaxonSearch.nameStringColumn],
                vernacularMatched: matchedIds[id].hasOwnProperty('vernacular'),
                exact: matchedIds[id].hasOwnProperty('exact') && matchedIds[id].exact,
                near: matchedIds[id].hasOwnProperty('near') && matchedIds[id].near
              };
              row.formatted = TaxonSearch.formatter(row);

              if (taxon[TaxonSearch.acceptedEntityIdColumn]) {
                var acceptedTaxon = Taxon.rawTaxa[taxon[TaxonSearch.acceptedEntityIdColumn]];

                if (!acceptedTaxon) {
                  if (!Taxon.rawTaxa) {
                    throw new Error("Taxon.rawTaxa set is undefined, when trying to find taxon for accepted entity id ".concat(taxon[TaxonSearch.acceptedEntityIdColumn]));
                  } else {
                    throw new Error("Failed to find taxon for accepted entity id ".concat(taxon[TaxonSearch.acceptedEntityIdColumn]));
                  }
                }

                row.acceptedEntityId = taxon[TaxonSearch.acceptedEntityIdColumn];
                row.acceptedNameString = acceptedTaxon[TaxonSearch.nameStringColumn];
                row.acceptedQualifier = acceptedTaxon[TaxonSearch.qualifierColumn];
                row.acceptedAuthority = acceptedTaxon[TaxonSearch.authorityColumn];
              }

              results.push(row);
            }
          }
        }

        if (results.length) {
          results.sort(function (a, b) {
            // if (a.uname == 'Taraxacum \'Irish cambricum\'' || b.uname == 'Taraxacum \'Irish cambricum\'') {
            //   console.log(a.uname + " with " + b.uname);
            // }
            if (a.exact) {
              // logger('exact test a: ' + a.uname + ' vs ' + b.uname);
              // logger(b);
              if (b.exact) {
                return a.acceptedEntityId ? 1 : 0; // prefer accepted name
              }

              return -1; // return b.exact ? 0 : -1;
            } else if (b.exact) {
              // logger('exact test b: ' + b.uname);
              return 1;
            }

            if (a.near) {
              if (!b.near) {
                return -1;
              }
            } else if (b.near) {
              // logger('exact test b: ' + b.uname);
              return 1;
            }

            var aIsHybrid = a.uname.match(/\bx\b/i) !== null;
            var bIsHybrid = b.uname.match(/\bx\b/i) !== null;

            if (aIsHybrid) {
              // logger('hybrid test: ' + a.qname + ' vs ' + b.qname);
              // logger('hybrid test: ' + a.uname + ' vs ' + b.uname);
              if (bIsHybrid) {
                if (a.uname === b.uname) {
                  return a.acceptedEntityId ? 1 : 0; // prefer accepted name
                }

                return a.qname < b.qname ? -1 : 1;
              }

              return preferHybrids ? -1 : 1;
            } else if (bIsHybrid) {
              return preferHybrids ? 1 : -1;
            } else if (a.uname === b.uname) {
              if ((a.acceptedEntityId || b.acceptedEntityId) && !(a.acceptedEntityId && b.acceptedEntityId)) {
                // one of the pair is not an accepted name
                return a.acceptedEntityId ? 1 : -1; // prefer accepted name
              } else {
                // for NYPH purposes agg. and s.l. should be prioritised over
                // agg., s.l., empty, s.s.
                var aQIndex = ['s.s.', '', null, 's.l.', 'agg.'].indexOf(a.qualifier);
                var bQIndex = ['s.s.', '', null, 's.l.', 'agg.'].indexOf(b.qualifier);
                return aQIndex === bQIndex ? 0 : aQIndex < bQIndex ? 1 : -1;
              }
            }

            return a.uname < b.uname ? -1 : 1;
          }); // truncate results

          if (results.length > TaxonSearch.MAXIMUM_RESULTS) {
            results.length = TaxonSearch.MAXIMUM_RESULTS;
          }
        }

        return results;
      }
    }], [{
      key: "formatter",
      value: function formatter(taxonResult) {

        if (TaxonSearch.showVernacular) {
          if (taxonResult.vernacularMatched) {
            if (taxonResult.acceptedEntityId) {
              return "<q><b>".concat(taxonResult.vernacular, "</b></q> <span class=\"italictaxon\">").concat(taxonResult.uname).concat(taxonResult.qualifier ? " <b>".concat(taxonResult.qualifier, "</b>") : '', "</span> <span class=\"taxauthority\">").concat(taxonResult.authority, "</span>") + " = <span class=\"italictaxon\">".concat(taxonResult.acceptedNameString).concat(taxonResult.acceptedQualifier ? " <b>".concat(taxonResult.acceptedQualifier, "</b>") : '', "</span> <span class=\"taxauthority\">").concat(taxonResult.acceptedAuthority, "</span>");
            }

            return "<q><b>".concat(taxonResult.vernacular, "</b></q> <span class=\"italictaxon\">").concat(taxonResult.uname).concat(taxonResult.qualifier ? " <b>".concat(taxonResult.qualifier, "</b>") : '', "</span> <span class=\"taxauthority\">").concat(taxonResult.authority, "</span>");
          }

          if (taxonResult.acceptedEntityId) {
            return "<span class=\"italictaxon\">".concat(taxonResult.uname).concat(taxonResult.qualifier ? " <b>".concat(taxonResult.qualifier, "</b>") : '', "</span> <span class=\"taxauthority\">").concat(taxonResult.authority, "</span>").concat(taxonResult.vernacular ? " <q><b>".concat(taxonResult.vernacular, "</b></q>") : '', " = <span class=\"italictaxon\">").concat(taxonResult.acceptedNameString).concat(taxonResult.acceptedQualifier ? " <b>".concat(taxonResult.acceptedQualifier, "</b>") : '', "</span> <span class=\"taxauthority\">").concat(taxonResult.acceptedAuthority, "</span>");
          }

          return "<span class=\"italictaxon\">".concat(taxonResult.uname).concat(taxonResult.qualifier ? " <b>".concat(taxonResult.qualifier, "</b>") : '', "</span> <span class=\"taxauthority\">").concat(taxonResult.authority, "</span>").concat(taxonResult.vernacular ? " <q><b>".concat(taxonResult.vernacular, "</b></q>") : '');
        }

        if (taxonResult.acceptedEntityId) {
          return "<span class=\"italictaxon\">".concat(taxonResult.uname).concat(taxonResult.qualifier ? " <b>".concat(taxonResult.qualifier, "</b>") : '', "</span> <span class=\"taxauthority\">").concat(taxonResult.authority, "</span>") + " = <span class=\"italictaxon\">".concat(taxonResult.acceptedNameString).concat(taxonResult.acceptedQualifier ? " <b>".concat(taxonResult.acceptedQualifier, "</b>") : '', "</span> <span class=\"taxauthority\">").concat(taxonResult.acceptedAuthority, "</span>");
        }

        return "<span class=\"italictaxon\">".concat(taxonResult.uname).concat(taxonResult.qualifier ? " <b>".concat(taxonResult.qualifier, "</b>") : '', "</span> <span class=\"taxauthority\">").concat(taxonResult.authority, "</span>");
      }
    }, {
      key: "normaliseTaxonName",
      value:
      /**
       *
       * @param {string} taxonString
       * @returns {string}
       */
      function normaliseTaxonName(taxonString) {
        for (var i = 0, l = TaxonSearch.taxonRankNameSearchRegex.length; i < l; i++) {
          taxonString = taxonString.replace(TaxonSearch.taxonRankNameSearchRegex[i], TaxonSearch.taxonRankNameReplacement[i]);
        }

        for (var _i = 0, _l = TaxonSearch.taxonQualifierSearchRegex.length; _i < _l; _i++) {
          taxonString = taxonString.replace(TaxonSearch.taxonQualifierSearchRegex[_i], TaxonSearch.taxonQualifierReplacement[_i]);
        }

        return taxonString;
      }
      /**
       * from https://developer.mozilla.org/en/docs/Web/JavaScript/Guide/Regular_Expressions
       *
       * @param {string} literal
       * @return string
       */

    }, {
      key: "escapeRegExp",
      value: function escapeRegExp(literal) {
        return literal.replace(TaxonSearch.cleanRegex, '\\$&');
      }
    }, {
      key: "generate_hybrid_combinations_regex",
      value:
      /**
       * generate hybrid name permutations
       *
       * @param {string} names unescaped series of species e.g. "glandulifera" or "carex x nigra"
       * @returns {string} name permutations formatted as a regular expression
       */
      function generate_hybrid_combinations_regex(names) {
        var splitParts = TaxonSearch.escapeRegExp(names).split(/\s+x\s+/i);

        if (splitParts.length < 2) {
          return splitParts[0];
        }

        var hybridPermutations = [];
        /**
         * generate hybrid name permutations
         *
         * modified from O'Reilly PHP Cookbook
         * http://docstore.mik.ua/orelly/webprog/pcook/ch04_26.htm
         *
         * @param {Array.<string>} items
         * @param {Array.<string>} perms
         */

        var permutate = function permutate(items, perms) {
          if (items.length === 0) {
            hybridPermutations[hybridPermutations.length] = perms.join('[a-zA-Z]* x ');
          } else {
            for (var i = items.length - 1; i >= 0; --i) {
              var newItems = items.slice(0);
              var newPerms = perms.slice(0); // take copies of the array

              newPerms.unshift(newItems.splice(i, 1)[0]);
              permutate(newItems, newPerms);
            }
          }
        };

        permutate(splitParts, []);
        return "(?:".concat(hybridPermutations.join('|'), ")");
      }
    }]);

    return TaxonSearch;
  }();

  _defineProperty$1(TaxonSearch, "showVernacular", true);

  _defineProperty$1(TaxonSearch, "MIN_SEARCH_LENGTH", 2);

  _defineProperty$1(TaxonSearch, "MAXIMUM_RESULTS", 25);

  _defineProperty$1(TaxonSearch, "abbreviatedGenusRegex", /^(X\s+)?([a-z])[.\s]+(.*?)$/i);

  _defineProperty$1(TaxonSearch, "nameStringColumn", 0);

  _defineProperty$1(TaxonSearch, "canonicalColumn", 1);

  _defineProperty$1(TaxonSearch, "hybridCanonicalColumn", 2);

  _defineProperty$1(TaxonSearch, "acceptedEntityIdColumn", 3);

  _defineProperty$1(TaxonSearch, "qualifierColumn", 4);

  _defineProperty$1(TaxonSearch, "authorityColumn", 5);

  _defineProperty$1(TaxonSearch, "vernacularColumn", 6);

  _defineProperty$1(TaxonSearch, "vernacularRootColumn", 7);

  _defineProperty$1(TaxonSearch, "usedColumn", 8);

  _defineProperty$1(TaxonSearch, "minRankColumn", 9);

  _defineProperty$1(TaxonSearch, "taxonRankNameSearchRegex", [/\s+sub-?g(?:en(?:us)?)?[.\s]+/i, /\s+sect(?:ion)?[.\s]+/i, /\s+subsect(?:ion)?[.\s]+/i, /\s+ser(?:ies)?[.\s]+/i, /\s+gp[.\s]+/i, /\s+s(?:ub)?-?sp(?:ecies)?[.\s]+/i, /\s+morphotype\s+/i, /\s+var[.\s]+/i, /\s+cv[.\s]+/i, /\s+n(?:otho)?v(?:ar)?[.\s]+/i, /\s+f[.\s]+|\s+forma?\s+/i, /\s+n(?:otho)?ssp[.\s]+/i]);

  _defineProperty$1(TaxonSearch, "taxonRankNameReplacement", [' subg. ', ' sect. ', ' subsect. ', ' ser. ', ' group ', ' subsp. ', ' morph. ', ' var. ', ' cv. ', // ddb preference is for single quotes for cultivars
  ' nothovar. ', ' f. ', ' nothosubsp. ']);

  _defineProperty$1(TaxonSearch, "cleanRankNamesRegex", /\s(subfam\.|subg\.|sect\.|subsect\.|ser\.|subser\.|subsp\.|nothosubsp\.|microsp\.|praesp\.|agsp\.|race|convar\.|nm\.|microgene|f\.|subvar\.|var\.|nothovar\.|cv\.|sublusus|taxon|morph\.|group|sp\.)\s/);

  _defineProperty$1(TaxonSearch, "taxonQualifierSearchRegex", [/\s*\(?\bf\s*x\s*m or m\s*x\s*f\)?\s*$/i, /\s*\(?\bm\s*x\s*f or f\s*x\s*m\)?\s*$/i, /\s*\(?\bf\s*x\s*m\)?\s*$/i, /\s*\(?\bm\s*x\s*f\)?\s*$/i, /\s*\(?\bfemale\s*x\s*male\)?\s*$/i, /\s*\(?\bmale\s*x\s*female\)?\s*$/i, // stand-alone male/female qualifier (e.g. applied to Petasites hybridus)
  // removes single quotes
  /\s*'male'\s*$/i, /\s*'female'\s*$/i, // mid-string ss/sl qualifiers
  /\b\s*sens\.?\s*lat[.\s]+/i, /\b\s*s\.\s*lat\.?\s*\b/i, /\b\s*s\.?\s*l\.?\s+\b/i, /\b\s*sensu\s*lato\s+\b|\(\s*sensu\s*lato\s*\)/i, /\b\s*sensu\s*stricto\s+\b|\(\s*sensu\s*stricto\s*\)/i, /\b\s*sens\.?\s*strict[.\s]+/i, // '/\b\s*sens\.?\s*str\.?\s*(?=\))|\b\s*sens\.?\s*str\.?\s*\b/i', // the first look-ahead option matches before a closing-paren (\b fails between '.)' )
  /\b\s*sens\.?\s*str\.?\s*(?=\))|\b\s*sens\.?\s*str[.\s]+/i, // '/\b\s*s\.\s*str\.?\s*\b/i',
  /\b\s*s\.\s*str[.\s]+/i, /\b\s*s\.?\s*s\.?\s+\b/i, // end-of-string ss/sl qualifiers
  /\b\s*sens\.?\s*lat\.?\s*$/i, /\b\s*s\.\s*lat\.?\s*$/i, /\b\s*s\.?\s*l\.?\s*$/i, /\b\s*sensu\s*lato\s*$/i, /\b\s*sensu\s*stricto\s*$/i, /\b\s*sens\.?\s*strict\.?\s*$/i, /\b\s*sens\.?\s*str\.?\s*$/i, /\b\s*s\.\s*str\.?\s*$/i, /\b\s*s\.?\s*s\.?\s*$/i, /\b\s*agg\.?\s*$/i, /\b\s*aggregate\s*$/i, /\b\s*sp\.?\s*cultivar\s*$/i, /\b\s*sp\.?\s*cv\.?\s*$/i, /\b\s*cultivars?\s*$/i, /\b\s*cv\s+$/i, /\b\s*cv$/i, /\b\s*cf\s*$/i, /\b\s*aff\s*$/i, /\b\s*s\.?n\.?\s*$/i, /\b\s*sp\.?\s*nov\.?\s*$/i, /\b\s*auct[.\s]*$/i, /\b\s*ined[.\s]*$/i, /\b\s*nom\.?\snud[.\s]*$/i, /\b\s*p\.p[.\s?]*$/i, /\b\s*spp?\.?[\s?]*$/i, /\b\s*species\s*$/i, /\b\s*spp?\.?\s*\(/i, // catch e.g. Ulmus sp. (excluding Ulmus glabra)
  /\b\s*species\s*\(/i]);

  _defineProperty$1(TaxonSearch, "taxonQualifierReplacement", [' ', // (f x m or m x f) is the default so an explicit qualifier isn't used
  ' ', // (m x f or f x m) is the default so an explicit qualifier isn't used
  ' (f x m)', ' (m x f)', ' (f x m)', ' (m x f)', // stand-alone male/female qualifier (e.g. applied to Petasites hybridus)
  // removed single quotes
  ' male', ' female', // mid-string ss/sl qualifiers
  ' s.l. ', ' s.l. ', ' s.l. ', ' s.l. ', ' s.s. ', ' s.s. ', ' s.s. ', ' s.s. ', ' s.s. ', // end-of-string ss/sl qualifiers
  ' s.l.', ' s.l.', ' s.l.', ' s.l.', ' s.s.', ' s.s.', ' s.s.', ' s.s.', ' s.s.', ' agg.', ' agg.', ' cv. ', ' cv. ', ' cv. ', ' cv. ', ' cv. ', ' cf.', ' aff.', ' sp.nov.', ' sp.nov.', ' auct.', ' ined.', ' nom. nud.', ' pro parte', '', '', ' (', ' (']);

  _defineProperty$1(TaxonSearch, "cleanRegex", /[.*+?^${}()|[\]\\]/g);

  /**
   * @external BsbiDb
   */

  /**
   *
   */

  var TaxaLoadedHook = /*#__PURE__*/function () {
    function TaxaLoadedHook() {
      _classCallCheck$1(this, TaxaLoadedHook);
    }

    _createClass(TaxaLoadedHook, null, [{
      key: "taxaLoadedEntryPoint",
      value: function taxaLoadedEntryPoint() {
        Taxon.rawTaxa = BsbiDb.TaxonNames;

        while (TaxaLoadedHook.callbackStack.length) {
          var callback = TaxaLoadedHook.callbackStack.shift();

          try {
            callback();
          } catch (e) {
            console.log({
              'Exception after taxon load': e
            });
          }
        }
      }
      /**
       *
       * @returns {Promise<any>|Promise<void>}
       */

    }, {
      key: "onceTaxaLoaded",
      value: function onceTaxaLoaded() {
        if (BsbiDb.hasOwnProperty('TaxonNames')) {
          return Promise.resolve();
        } else {
          if (!BsbiDb.taxonNamesLoadedEntryPoint) {
            BsbiDb.taxonNamesLoadedEntryPoint = TaxaLoadedHook.taxaLoadedEntryPoint;
          }

          return new Promise(function (resolve) {
            TaxaLoadedHook.callbackStack.push(resolve);
          });
        }
      }
    }]);

    return TaxaLoadedHook;
  }();

  _defineProperty$1(TaxaLoadedHook, "callbackStack", []);

  var $$3 = _export$1;

  // `URL.prototype.toJSON` method
  // https://url.spec.whatwg.org/#dom-url-tojson
  $$3({ target: 'URL', proto: true, enumerable: true }, {
    toJSON: function toJSON() {
      return URL.prototype.toString.call(this);
    }
  });

  var collection = collection$3;
  var collectionWeak = collectionWeak$2;

  // `WeakSet` constructor
  // https://tc39.es/ecma262/#sec-weakset-constructor
  collection('WeakSet', function (init) {
    return function WeakSet() { return init(this, arguments.length ? arguments[0] : undefined); };
  }, collectionWeak);

  function _createForOfIteratorHelper$4(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray$4(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

  function _unsupportedIterableToArray$4(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray$4(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$4(o, minLen); }

  function _arrayLikeToArray$4(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

  function _createSuper$8(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$8(); return function _createSuperInternal() { var Super = _getPrototypeOf$1(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf$1(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn$1(this, result); }; }

  function _isNativeReflectConstruct$8() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

  function _classPrivateMethodInitSpec$4(obj, privateSet) { _checkPrivateRedeclaration$7(obj, privateSet); privateSet.add(obj); }

  function _classPrivateFieldInitSpec$7(obj, privateMap, value) { _checkPrivateRedeclaration$7(obj, privateMap); privateMap.set(obj, value); }

  function _checkPrivateRedeclaration$7(obj, privateCollection) { if (privateCollection.has(obj)) { throw new TypeError("Cannot initialize the same private elements twice on an object"); } }

  function _classPrivateMethodGet$4(receiver, privateSet, fn) { if (!privateSet.has(receiver)) { throw new TypeError("attempted to get private field on non-instance"); } return fn; }
  var IMAGE_MODAL_ID = 'imagemodal';
  var IMAGE_MODAL_DELETE_BUTTON_ID = 'imagemodaldelete';
  var DELETE_IMAGE_MODAL_ID = 'deleteimagemodal';
  var EVENT_DELETE_IMAGE = 'deleteimage';
  /**
   * @external $
   */

  var _inputId$2 = /*#__PURE__*/new WeakMap();

  var _containerId$6 = /*#__PURE__*/new WeakMap();

  var _statusBlockId = /*#__PURE__*/new WeakMap();

  var _addFiles = /*#__PURE__*/new WeakSet();

  var _save = /*#__PURE__*/new WeakSet();

  var ImageField = /*#__PURE__*/function (_FormField) {
    _inherits$1(ImageField, _FormField);

    var _super = _createSuper$8(ImageField);

    /**
     * @type {string}
     */

    /**
     * @type {string}
     */

    /**
     * @type {string}
     */

    /**
     * @type {OccurrenceForm}
     */

    /**
     *
     * @type {{images: Array.<OccurrenceImage>}}
     * @private
     */

    /**
     *
     * @type {boolean}
     */

    /**
     *
     * @type {string}
     */

    /**
     *
     * @param {{[label] : string, [helpText]: string, [placeholder]: string, [includeCamera]: boolean}} [params]
     */
    function ImageField(params) {
      var _this;

      _classCallCheck$1(this, ImageField);

      _this = _super.call(this, params);

      _classPrivateMethodInitSpec$4(_assertThisInitialized$1(_this), _save);

      _classPrivateMethodInitSpec$4(_assertThisInitialized$1(_this), _addFiles);

      _classPrivateFieldInitSpec$7(_assertThisInitialized$1(_this), _inputId$2, {
        writable: true,
        value: void 0
      });

      _classPrivateFieldInitSpec$7(_assertThisInitialized$1(_this), _containerId$6, {
        writable: true,
        value: void 0
      });

      _classPrivateFieldInitSpec$7(_assertThisInitialized$1(_this), _statusBlockId, {
        writable: true,
        value: void 0
      });

      _defineProperty$1(_assertThisInitialized$1(_this), "parentForm", void 0);

      _defineProperty$1(_assertThisInitialized$1(_this), "_value", {
        images: []
      });

      _defineProperty$1(_assertThisInitialized$1(_this), "includeCamera", true);

      _defineProperty$1(_assertThisInitialized$1(_this), "placeholder", '');

      if (params) {
        if (params.hasOwnProperty('includeCamera')) {
          _this.includeCamera = params.includeCamera;
        }

        if (params.placeholder) {
          _this.placeholder = params.placeholder;
        }
      }

      return _this;
    }
    /**
     * sets content as Images, not as raw files
     *
     * @param {(Array.<string>|null)} imageIds
     */


    _createClass(ImageField, [{
      key: "value",
      get:
      /**
       *
       * @returns {Array.<string>}
       */
      function get() {
        var ids = [];

        if (this._value && this._value.images) {
          var _iterator = _createForOfIteratorHelper$4(this._value.images),
              _step;

          try {
            for (_iterator.s(); !(_step = _iterator.n()).done;) {
              var image = _step.value;
              ids[ids.length] = image.id;
            }
          } catch (err) {
            _iterator.e(err);
          } finally {
            _iterator.f();
          }
        }

        return ids;
      },
      set: function set(imageIds) {
        this._value = {
          images: []
        };

        if (imageIds) {
          var _iterator2 = _createForOfIteratorHelper$4(imageIds),
              _step2;

          try {
            for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
              var id = _step2.value;

              if (OccurrenceImage.imageCache.has(id)) {
                this._value.images.push(OccurrenceImage.imageCache.get(id));
              } else {
                console.log("Creating placeholder image object '".concat(id, "'"));

                this._value.images.push(OccurrenceImage.placeholder(id));
              }
            }
          } catch (err) {
            _iterator2.e(err);
          } finally {
            _iterator2.f();
          }
        }

        this.updateView();
      }
      /**
       *
       * @param {Array.<string>} value (list of image ids or null)
       * @returns {boolean}
       */

    }, {
      key: "updateView",
      value: function updateView() {
        if (this._fieldEl) {
          // do nothing until the view has been constructed
          var idList = [];

          var _iterator3 = _createForOfIteratorHelper$4(this._value.images),
              _step3;

          try {
            for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
              var image = _step3.value;
              idList.push("<picture style=\"cursor: pointer;\" data-imageid=\"".concat(image.id, "\"><source srcset=\"/image.php?imageid=").concat(image.id, "&amp;height=128&amp;format=webp\" type=\"image/webp\"><img data-imageid=\"").concat(image.id, "\" src=\"/image.php?imageid=").concat(image.id, "&amp;height=128&amp;format=jpeg\" height=\"128\" alt=\"photo\"></picture>"));
            }
          } catch (err) {
            _iterator3.e(err);
          } finally {
            _iterator3.f();
          }

          var statusEl = document.getElementById(_classPrivateFieldGet(this, _statusBlockId));
          statusEl.innerHTML = idList.join("\n");
        }
      }
      /**
       * initialises this._fieldEl
       *
       * @returns {void}
       */

    }, {
      key: "buildField",
      value: function buildField() {
        // <div class="custom-file">
        //     <input type="file" class="custom-file-input" id="customFile">
        //     <label class="custom-file-label" for="customFile">Choose file</label>
        // </div>
        var container = document.createElement('div');
        container.className = 'form-group';

        _classPrivateFieldSet(this, _containerId$6, container.id = FormField.nextId);

        _classPrivateFieldSet(this, _inputId$2, FormField.nextId);

        var labelEl = container.appendChild(document.createElement('label'));
        labelEl.htmlFor = _classPrivateFieldGet(this, _inputId$2);
        labelEl.textContent = this.label;
        var inputGroupEl = container.appendChild(document.createElement('div'));
        inputGroupEl.className = 'input-group';
        var filePickerWrapper = document.createElement('div');
        filePickerWrapper.className = 'custom-file';
        inputGroupEl.appendChild(filePickerWrapper);
        var filePickerField = filePickerWrapper.appendChild(document.createElement('input'));
        filePickerField.type = 'file';
        filePickerField.className = "custom-file-input";
        filePickerField.id = _classPrivateFieldGet(this, _inputId$2);
        filePickerField.accept = ".jpeg, .jpg, image/png, image/jpeg";
        filePickerField.multiple = true;

        if (this.placeholder) {
          var pickerLabelEl = filePickerWrapper.appendChild(document.createElement('label'));
          pickerLabelEl.className = 'custom-file-label';
          pickerLabelEl.htmlFor = _classPrivateFieldGet(this, _inputId$2);
          pickerLabelEl.textContent = this.placeholder;
        }

        if (this.includeCamera) {
          var cameraButtonContainer = document.createElement('div');
          cameraButtonContainer.className = 'input-group-append';
          var cameraSpan = cameraButtonContainer.appendChild(document.createElement('span'));
          cameraSpan.className = 'input-group-text';
          var cameraLabel = cameraSpan.appendChild(document.createElement('label'));
          cameraLabel.className = 'pl-0 pr-0 ml-0 mr-0 mt-0 mb-0 pt-0 pb-0 material-icons';
          var cameraIcon = cameraLabel.appendChild(document.createElement('i'));
          cameraIcon.className = 'material-icons pl-0 pr-0 ml-0 mr-0 mt-0 mb-0 pt-0 pb-0';
          cameraIcon.textContent = 'add_a_photo';
          var cameraInput = cameraLabel.appendChild(document.createElement('input'));
          cameraInput.type = 'file';
          cameraInput.capture = 'environment';
          cameraInput.accept = 'image/*';
          cameraInput.style.display = 'none';
          cameraInput.id = FormField.nextId;
          inputGroupEl.appendChild(cameraButtonContainer);
          cameraInput.addEventListener('change', this.inputChangeHandler.bind(this, cameraInput.id));
        } // styling save buttons: https://www.abeautifulsite.net/whipping-file-inputs-into-shape-with-bootstrap-3
        // (partially relevant)
        // <label class="img-picker icon icon-camera">
        // <input type="file" accept="image/*" capture="environment"/>
        // </label>


        if (this.helpText) {
          var helpTextField = container.appendChild(document.createElement('small'));
          helpTextField.innerHTML = this.helpText;
        }

        var statusBlockEl = container.appendChild(document.createElement('p'));

        _classPrivateFieldSet(this, _statusBlockId, statusBlockEl.id = FormField.nextId); // register a click handler for images (to open a modal)


        statusBlockEl.addEventListener('click', this.imageClickHandler.bind(this));

        if (this.validationMessage) {
          var validationMessageElement = container.appendChild(document.createElement('div'));
          validationMessageElement.className = 'invalid-feedback';
          validationMessageElement.innerHTML = this.validationMessage;
        }

        filePickerField.addEventListener('change', this.inputChangeHandler.bind(this, filePickerField.id));
        this._fieldEl = container;
        this.parentForm.addListener(EVENT_DELETE_IMAGE, this.deleteImageHandler.bind(this));
      }
      /**
       * called after user has clicked delete button on an image
       *
       * @param {{imageId : string}} params
       */

    }, {
      key: "deleteImageHandler",
      value: function deleteImageHandler(params) {
        console.log("delete image ".concat(params.imageId));
        var image;

        for (var key in this._value.images) {
          if (this._value.images.hasOwnProperty(key)) {
            if (this._value.images[key].id === params.imageId) {
              image = this._value.images.splice(key, 1)[0];
              break;
            }
          }
        }

        if (!image) {
          console.log("Failed to find image id ".concat(params.imageId));
        } else {
          // @todo need to resave image to flag as deleted
          this.updateView();
          this.fireEvent(FormField.EVENT_CHANGE);
        }
      }
      /**
       *
       * @param {MouseEvent} event
       */

    }, {
      key: "imageClickHandler",
      value: function imageClickHandler(event) {
        var targetEl = event.target.closest('picture');

        if (!targetEl) {
          targetEl = event.target.closest('img');
        }

        console.log({
          'clicked image': targetEl
        });
        var imageId = targetEl.getAttribute('data-imageid');

        if (imageId) {
          var imageModal = document.getElementById(IMAGE_MODAL_ID);
          var pictureEl = imageModal.getElementsByTagName('picture')[0];
          pictureEl.innerHTML = "<source srcset=\"/image.php?imageid=".concat(imageId, "&amp;width=").concat(window.innerWidth, "&amp;format=webp\" type=\"image/webp\">\n                <img src=\"/image.php?imageid=").concat(imageId, "&amp;width=").concat(window.innerWidth, "&amp;format=jpeg\" width=\"auto\" style=\"max-height: 48vh; max-width: 100%;\" alt=\"photo\">");
          var deleteButton = document.getElementById(IMAGE_MODAL_DELETE_BUTTON_ID);
          deleteButton.setAttribute('data-imageid', imageId);
          $("#".concat(IMAGE_MODAL_ID)).modal({});
        }
      }
      /**
       * called with an additional bound element id parameter
       * (this allows the handler to easily distinguish between the two file pickers)
       *
       * @param {string} inputId
       * @param {Event} event
       */

    }, {
      key: "inputChangeHandler",
      value: function inputChangeHandler(inputId, event) {
        var _this2 = this;

        event.stopPropagation(); // don't allow the change event to reach the form-level event handler (will handle it here instead)

        console.log('got image field input change event');
        var imageEl = document.getElementById(inputId);

        if (imageEl.files.length) {
          _classPrivateMethodGet$4(this, _addFiles, _addFiles2).call(this, imageEl.files).then(function () {
            _this2.fireEvent(FormField.EVENT_CHANGE);
          });
        } else {
          this.fireEvent(FormField.EVENT_CHANGE);
        }
      }
      /**
       *
       * @param {FileList} fileList
       * @return {Promise<void>}
       */

    }], [{
      key: "isEmpty",
      value: function isEmpty(value) {
        return !value || value.length === 0;
      }
    }, {
      key: "licenseModal",
      value:
      /**
       *
       * @returns {HTMLDivElement}
       */
      function licenseModal() {
        // 'image license' modal
        // this pop-up is informational only
        var modalEl = document.createElement('div');
        modalEl.innerHTML = "<div class=\"modal fade\" id=\"".concat(ImageField.LICENSE_MODAL, "\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"").concat(ImageField.LICENSE_MODAL, "Title\" aria-hidden=\"true\">\n  <div class=\"modal-dialog modal-dialog-centered\" role=\"document\">\n    <div class=\"modal-content\">\n      <div class=\"modal-header\">\n        <h5 class=\"modal-title\" id=\"").concat(ImageField.LICENSE_MODAL, "Title\">Image licensing</h5>\n        <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\">\n          <span aria-hidden=\"true\">&times;</span>\n        </button>\n      </div>\n      <div class=\"modal-body\">\n        <p>By choosing to submit images with your Garden Wildflower Hunt records you agree to license the image under the terms of the Creative Common Attribution 4.0 International license (CC BY 4.0).</p>\n        <p>The following is a summary of (and not a substitute for) the <a href=\"https://creativecommons.org/licenses/by/4.0/\" target=\"_blank\">license</a>.</p>\n        <p>Licensees are free to:</p>\n        <ul class=\"license-properties\">\n<li>\n<strong>Share</strong> \u2014 copy and redistribute the material in any medium or format\n</li>\n<li>\n<strong>Adapt</strong> \u2014 remix, transform, and build upon the material for any purpose, even commercially.\n</li>\n</ul>\n<p>Licensees are most follow these term:</p>\n<ul>\n<li>\n<p>\n<strong>Attribution</strong> \u2014 licensees must give appropriate credit, provide a link to the license, and indicate if changes were made.\n</p>\n</li>\n</ul>\n<p>Full details of the license are here: <a href=\"https://creativecommons.org/licenses/by/4.0/\" target=\"_blank\">CC BY 4.0 license</a></p>\n\n      </div>\n      <div class=\"modal-footer\">\n        <button type=\"button\" class=\"btn btn-secondary\" data-dismiss=\"modal\">Close</button>\n      </div>\n    </div>\n  </div>\n</div>");
        return modalEl.firstChild;
      }
    }]);

    return ImageField;
  }(FormField);

  function _addFiles2(fileList) {
    // cannot save until parent occurrence has been saved
    // so pre-trigger a save event
    this.parentForm.pingOccurrence();
    var images = [];

    var _iterator4 = _createForOfIteratorHelper$4(fileList),
        _step4;

    try {
      for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
        var file = _step4.value;
        images.push(OccurrenceImage.fromFile(file));
      }
    } catch (err) {
      _iterator4.e(err);
    } finally {
      _iterator4.f();
    }

    return _classPrivateMethodGet$4(this, _save, _save2).call(this, images);
  }

  function _save2(images) {
    var _this3 = this;

    if (images.length) {
      var image = images.shift();
      return image.save(this.parentForm.surveyId, this.parentForm.occurrenceId, this.parentForm.projectId).then(function (jsonImageDescriptor) {
        console.log("Added image '".concat(image.id, "'"));
        console.log({
          jsonDescription: jsonImageDescriptor
        });

        _this3._value.images.push(image);

        _this3.updateView(); // excessive view updates, should do once when all promises have succeeded
        // this may break with multiple images if fileList is live and is cleared when input is cleared
        // during view update, need to test

      }, function (reason) {
        console.log("Failed to add image ".concat(image.id));
        console.log({
          "Failure reason": reason
        });
      }).finally(function () {
        return _classPrivateMethodGet$4(_this3, _save, _save2).call(_this3, images);
      });
    } else {
      return Promise.resolve();
    }
  }

  _defineProperty$1(ImageField, "LICENSE_MODAL", 'imagelicensemodal');

  /**
   *
   * @param {string} separator
   * @param {string} finalSeparator
   * @param {Array.<string>} list
   * @return string
   */
  function formattedImplode(separator, finalSeparator, list) {
    if (list.length > 2) {
      var last = list.pop();
      return "".concat(list.join(separator + ' '), " ").concat(finalSeparator, " ").concat(last);
    } else {
      return list.join(" ".concat(finalSeparator, " "));
    }
  }

  function _createForOfIteratorHelper$3(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray$3(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

  function _unsupportedIterableToArray$3(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray$3(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$3(o, minLen); }

  function _arrayLikeToArray$3(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

  function _createSuper$6(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$6(); return function _createSuperInternal() { var Super = _getPrototypeOf$1(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf$1(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn$1(this, result); }; }

  function _isNativeReflectConstruct$6() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

  function _classPrivateMethodInitSpec$3(obj, privateSet) { _checkPrivateRedeclaration$5(obj, privateSet); privateSet.add(obj); }

  function _classPrivateFieldInitSpec$5(obj, privateMap, value) { _checkPrivateRedeclaration$5(obj, privateMap); privateMap.set(obj, value); }

  function _checkPrivateRedeclaration$5(obj, privateCollection) { if (privateCollection.has(obj)) { throw new TypeError("Cannot initialize the same private elements twice on an object"); } }

  function _classPrivateMethodGet$3(receiver, privateSet, fn) { if (!privateSet.has(receiver)) { throw new TypeError("attempted to get private field on non-instance"); } return fn; }

  function _classStaticPrivateFieldSpecGet$1(receiver, classConstructor, descriptor) { _classCheckPrivateStaticAccess$1(receiver, classConstructor); _classCheckPrivateStaticFieldDescriptor$1(descriptor, "get"); return _classApplyDescriptorGet$1(receiver, descriptor); }

  function _classCheckPrivateStaticFieldDescriptor$1(descriptor, action) { if (descriptor === undefined) { throw new TypeError("attempted to " + action + " private static field before its declaration"); } }

  function _classCheckPrivateStaticAccess$1(receiver, classConstructor) { if (receiver !== classConstructor) { throw new TypeError("Private static access of wrong provenance"); } }

  function _classApplyDescriptorGet$1(receiver, descriptor) { if (descriptor.get) { return descriptor.get.call(receiver); } return descriptor.value; }
  /**
   * used for option-based selections, allowing multiple choices, with optional 'other' field that exposes a text field
   */

  var _containerId$4 = /*#__PURE__*/new WeakMap();

  var _otherTextId$1 = /*#__PURE__*/new WeakMap();

  var _buildOption$1 = /*#__PURE__*/new WeakSet();

  var OptionsField = /*#__PURE__*/function (_FormField) {
    _inherits$1(OptionsField, _FormField);

    var _super = _createSuper$6(OptionsField);

    /**
     * @type {string}
     */

    /**
     * @type {string}
     */

    /**
     *
     * @type {Object.<string, {label: string}>}
     */

    /**
     * if set then include a free-text input field alongside the 'other' option
     *
     * @type {boolean}
     */

    /**
     *
     * @type {({selection : Array.<string>, other : (string|null)}|null)}
     * @private
     */

    /**
     *
     * @param {{[label] : string, [helpText]: string, [options]: {}, [includeOtherFreeText]: boolean}} [params]
     */
    function OptionsField(params) {
      var _this;

      _classCallCheck$1(this, OptionsField);

      _this = _super.call(this, params);

      _classPrivateMethodInitSpec$3(_assertThisInitialized$1(_this), _buildOption$1);

      _classPrivateFieldInitSpec$5(_assertThisInitialized$1(_this), _containerId$4, {
        writable: true,
        value: void 0
      });

      _classPrivateFieldInitSpec$5(_assertThisInitialized$1(_this), _otherTextId$1, {
        writable: true,
        value: void 0
      });

      _defineProperty$1(_assertThisInitialized$1(_this), "options", {});

      _defineProperty$1(_assertThisInitialized$1(_this), "includeOtherFreeText", true);

      _defineProperty$1(_assertThisInitialized$1(_this), "_value", {
        selection: [],
        other: null
      });

      if (params) {
        if (params.options) {
          _this.options = params.options;
        }

        if (params.hasOwnProperty('includeOtherFreeText')) {
          _this.includeOtherFreeText = params.includeOtherFreeText;
        }
      }

      return _this;
    }
    /**
     *
     * @param {{selection : Array.<string>, other : (string|null)}} selection
     */


    _createClass(OptionsField, [{
      key: "value",
      get:
      /**
       *
       * @returns {{selection: Array.<string>, other: (string|null)}}
       */
      function get() {
        return this._value;
      },
      set: function set(selection) {
        this._value = selection || {
          selection: [],
          other: null
        };
        this.updateView();
      }
    }, {
      key: "updateView",
      value: function updateView() {
        if (this._fieldEl) {
          // do nothing until the view has been constructed
          var _iterator = _createForOfIteratorHelper$3(document.querySelectorAll("".concat(_classStaticPrivateFieldSpecGet$1(OptionsField, OptionsField, _TOP_LEVEL_ELEMENT$1), "#").concat(_classPrivateFieldGet(this, _containerId$4), " input[type=\"checkbox\"]"))),
              _step;

          try {
            for (_iterator.s(); !(_step = _iterator.n()).done;) {
              var optionEl = _step.value;

              var selected = optionEl.checked = this._value.selection.includes(optionEl.name);

              if (optionEl.name === OptionsField.KEY_OTHER && _classPrivateFieldGet(this, _otherTextId$1)) {
                var otherEl = document.getElementById(_classPrivateFieldGet(this, _otherTextId$1));
                otherEl.style.display = selected ? 'block' : 'none';
                otherEl.value = this._value.other === null ? '' : this._value.other.trim();
              }
            }
          } catch (err) {
            _iterator.e(err);
          } finally {
            _iterator.f();
          }
        }
      }
      /**
       * initialises this._fieldEl
       *
       * @returns {void}
       */

    }, {
      key: "buildField",
      value: function buildField() {
        if (!this.options) {
          throw new Error('Options have not been set before call to buildField()');
        }

        var container = document.createElement(_classStaticPrivateFieldSpecGet$1(OptionsField, OptionsField, _TOP_LEVEL_ELEMENT$1));
        container.className = 'form-group';

        _classPrivateFieldSet(this, _containerId$4, container.id = FormField.nextId);

        var labelEl = container.appendChild(document.createElement('label'));
        labelEl.style.display = 'block';
        labelEl.textContent = this.label;

        if (this.helpText) {
          var helpTextField = container.appendChild(document.createElement('small'));
          helpTextField.innerHTML = this.helpText;
        }

        for (var key in this.options) {
          if (this.options.hasOwnProperty(key)) {
            _classPrivateMethodGet$3(this, _buildOption$1, _buildOption2$1).call(this, container, key, this.options[key]);
          }
        }

        if (this.validationMessage) {
          var validationMessageElement = container.appendChild(document.createElement('div'));
          validationMessageElement.className = 'invalid-feedback';
          validationMessageElement.innerHTML = this.validationMessage;
        }

        container.addEventListener('change', this.inputChangeHandler.bind(this));
        this._fieldEl = container;
      }
      /**
       *
       * @param {HTMLElement} fieldSet
       * @param {string} key
       * @param {{label : string}} option
       */

    }, {
      key: "inputChangeHandler",
      value:
      /**
       *
       * @param {Event} event
       */
      function inputChangeHandler(event) {
        event.stopPropagation(); // don't allow the change event to reach the form-level event handler (will handle it here instead)

        var value = {
          selection: [],
          other: null
        };
        var otherSelected = false;
        var otherEl;

        if (_classPrivateFieldGet(this, _otherTextId$1)) {
          otherEl = document.getElementById(_classPrivateFieldGet(this, _otherTextId$1));
        }

        var options = document.querySelectorAll("".concat(_classStaticPrivateFieldSpecGet$1(OptionsField, OptionsField, _TOP_LEVEL_ELEMENT$1), "#").concat(_classPrivateFieldGet(this, _containerId$4), " input[type=\"checkbox\"]:checked"));

        var _iterator2 = _createForOfIteratorHelper$3(options),
            _step2;

        try {
          for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
            var option = _step2.value;
            value.selection[value.selection.length] = option.name;

            if (option.name === OptionsField.KEY_OTHER && _classPrivateFieldGet(this, _otherTextId$1)) {
              value.other = FormField.cleanRawInput(otherEl);
              otherSelected = true;
            }
          }
        } catch (err) {
          _iterator2.e(err);
        } finally {
          _iterator2.f();
        }

        this.value = value; // the setter will trigger a refresh of the view

        this.fireEvent(FormField.EVENT_CHANGE);
      }
      /**
       * by the time summariseImpl has been called have already checked that summary is wanted
       *
       * @param {string} key
       * @param {{field : typeof OptionsField, attributes : {options : Object.<string, {label : string}>}, summary : {summaryPrefix: string}}} property properties of the form descriptor
       * @param {Object.<string, {}>} attributes attributes of the model object
       * @return {string}
       */

    }], [{
      key: "summariseImpl",
      value: function summariseImpl(key, property, attributes) {
        var summaryDescriptor = property.summary;
        var methods = [];

        if (attributes[key].selection.length) {
          var _iterator3 = _createForOfIteratorHelper$3(attributes[key].selection),
              _step3;

          try {
            for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
              var attributeValue = _step3.value;

              if ('other' === attributeValue && attributes[key].other) {
                methods[methods.length] = "".concat(property.attributes.options[attributeValue].summary || property.attributes.options[attributeValue].label, " (").concat(attributes[key].other, ")");
              } else {
                methods[methods.length] = property.attributes.options[attributeValue].summary || property.attributes.options[attributeValue].label;
              }
            }
          } catch (err) {
            _iterator3.e(err);
          } finally {
            _iterator3.f();
          }

          return escapeHTML("".concat(summaryDescriptor.summaryPrefix, " ").concat(formattedImplode(',', 'or', methods)));
        } else {
          return '';
        }
      }
    }]);

    return OptionsField;
  }(FormField);

  function _buildOption2$1(fieldSet, key, option) {
    // <div class="form-check">
    //     <input class="form-check-input" type="checkbox" value="" id="defaultCheck1">
    //     <label class="form-check-label" for="defaultCheck1">
    //         Default checkbox
    //     </label>
    // </div><
    var container = fieldSet.appendChild(document.createElement('div'));
    container.className = 'form-check';
    var optionField = container.appendChild(document.createElement('input'));
    optionField.type = 'checkbox';
    optionField.className = "form-check-input";
    optionField.id = FormField.nextId;
    optionField.name = key;
    var labelEl = container.appendChild(document.createElement('label'));
    labelEl.htmlFor = optionField.id;
    labelEl.className = 'form-check-label';
    labelEl.textContent = option.label;

    if (OptionsField.KEY_OTHER === key && this.includeOtherFreeText) {
      var otherTextEl = container.appendChild(document.createElement('input'));
      otherTextEl.id = _classPrivateFieldSet(this, _otherTextId$1, FormField.nextId);
      otherTextEl.className = 'form-control';
      otherTextEl.style.display = 'none';
    }
  }

  _defineProperty$1(OptionsField, "KEY_OTHER", 'other');

  var _TOP_LEVEL_ELEMENT$1 = {
    writable: true,
    value: 'fieldset'
  };

  var $$2 = _export$1;
  var $trimStart = stringTrim.start;
  var forcedStringTrimMethod = stringTrimForced;

  var FORCED$6 = forcedStringTrimMethod('trimStart');

  var trimStart = FORCED$6 ? function trimStart() {
    return $trimStart(this);
  // eslint-disable-next-line es/no-string-prototype-trimstart-trimend -- safe
  } : ''.trimStart;

  // `String.prototype.{ trimStart, trimLeft }` methods
  // https://tc39.es/ecma262/#sec-string.prototype.trimstart
  // https://tc39.es/ecma262/#String.prototype.trimleft
  $$2({ target: 'String', proto: true, name: 'trimStart', forced: FORCED$6 }, {
    trimStart: trimStart,
    trimLeft: trimStart
  });

  var $$1$1 = _export$1;
  var $find = arrayIteration.find;
  var addToUnscopables = addToUnscopables$3;

  var FIND = 'find';
  var SKIPS_HOLES = true;

  // Shouldn't skip holes
  if (FIND in []) Array(1)[FIND](function () { SKIPS_HOLES = false; });

  // `Array.prototype.find` method
  // https://tc39.es/ecma262/#sec-array.prototype.find
  $$1$1({ target: 'Array', proto: true, forced: SKIPS_HOLES }, {
    find: function find(callbackfn /* , that = undefined */) {
      return $find(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
    }
  });

  // https://tc39.es/ecma262/#sec-array.prototype-@@unscopables
  addToUnscopables(FIND);

  function _createForOfIteratorHelper$1(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray$1(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

  function _unsupportedIterableToArray$1(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray$1(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$1(o, minLen); }

  function _arrayLikeToArray$1(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

  function _createSuper$4(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$4(); return function _createSuperInternal() { var Super = _getPrototypeOf$1(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf$1(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn$1(this, result); }; }

  function _isNativeReflectConstruct$4() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

  function _classPrivateMethodInitSpec$1(obj, privateSet) { _checkPrivateRedeclaration$3(obj, privateSet); privateSet.add(obj); }

  function _classPrivateFieldInitSpec$3(obj, privateMap, value) { _checkPrivateRedeclaration$3(obj, privateMap); privateMap.set(obj, value); }

  function _checkPrivateRedeclaration$3(obj, privateCollection) { if (privateCollection.has(obj)) { throw new TypeError("Cannot initialize the same private elements twice on an object"); } }

  function _classPrivateMethodGet$1(receiver, privateSet, fn) { if (!privateSet.has(receiver)) { throw new TypeError("attempted to get private field on non-instance"); } return fn; }

  var _inputFieldId = /*#__PURE__*/new WeakMap();

  var _dropDownListDivId = /*#__PURE__*/new WeakMap();

  var _dropDownListUlId = /*#__PURE__*/new WeakMap();

  var _containerId$2 = /*#__PURE__*/new WeakMap();

  var _taxonLookupTimeoutHandle = /*#__PURE__*/new WeakMap();

  var _changeEventTimeout = /*#__PURE__*/new WeakMap();

  var _selectedIndex = /*#__PURE__*/new WeakMap();

  var _searchResults = /*#__PURE__*/new WeakMap();

  var _triggerQuery = /*#__PURE__*/new WeakSet();

  var TaxonPickerField = /*#__PURE__*/function (_FormField) {
    _inherits$1(TaxonPickerField, _FormField);

    var _super = _createSuper$4(TaxonPickerField);

    /**
     * @type {TaxonSearch}
     */

    /**
     * @type {string}
     */

    /**
     * @type {string}
     */

    /**
     * @type {string}
     */

    /**
     *
     * @type {null|number}
     */

    /**
     *
     * @type {string}
     * @private
     */

    /**
     * @type {Array.<{entityId: string,
                        vernacular: string,
                        qname: string,
                        name: string,
                        qualifier: string,
                        authority: string,
                        uname: string,
                        vernacularMatched: boolean,
                        exact: boolean,
                        near: boolean,
                        formatted: string,
                        acceptedEntityId: string,
                        acceptedNameString: string,
                        acceptedQualifier: string,
                        acceptedAuthority: string
                        }>}
     */

    /**
     *
     * @type {{taxonName: string, taxonId: string, vernacularMatch: boolean}}
     * @private
     */

    /**
     *
     * @param {{label : string, [helpText]: string}} [params]
     */
    function TaxonPickerField(params) {
      var _this;

      _classCallCheck$1(this, TaxonPickerField);

      _this = _super.call(this, params);

      _classPrivateMethodInitSpec$1(_assertThisInitialized$1(_this), _triggerQuery);

      _defineProperty$1(_assertThisInitialized$1(_this), "taxonSearch", void 0);

      _classPrivateFieldInitSpec$3(_assertThisInitialized$1(_this), _inputFieldId, {
        writable: true,
        value: void 0
      });

      _classPrivateFieldInitSpec$3(_assertThisInitialized$1(_this), _dropDownListDivId, {
        writable: true,
        value: void 0
      });

      _classPrivateFieldInitSpec$3(_assertThisInitialized$1(_this), _dropDownListUlId, {
        writable: true,
        value: void 0
      });

      _classPrivateFieldInitSpec$3(_assertThisInitialized$1(_this), _containerId$2, {
        writable: true,
        value: void 0
      });

      _classPrivateFieldInitSpec$3(_assertThisInitialized$1(_this), _taxonLookupTimeoutHandle, {
        writable: true,
        value: null
      });

      _classPrivateFieldInitSpec$3(_assertThisInitialized$1(_this), _changeEventTimeout, {
        writable: true,
        value: null
      });

      _classPrivateFieldInitSpec$3(_assertThisInitialized$1(_this), _selectedIndex, {
        writable: true,
        value: null
      });

      _defineProperty$1(_assertThisInitialized$1(_this), "_lastInputValue", '');

      _classPrivateFieldInitSpec$3(_assertThisInitialized$1(_this), _searchResults, {
        writable: true,
        value: []
      });

      _defineProperty$1(_assertThisInitialized$1(_this), "_value", {
        taxonId: '',
        taxonName: '',
        vernacularMatch: false
      });

      _this.taxonSearch = new TaxonSearch();
      return _this;
    }
    /**
     *
     * @param {({taxonName: string, taxonId: string, vernacularMatch: boolean}|null)} taxonSpec
     */


    _createClass(TaxonPickerField, [{
      key: "value",
      get:
      /**
       *
       * @returns {{taxonName: string, taxonId: string, vernacularMatch: boolean}}
       */
      function get() {
        return this._value;
      }
      /**
       *
       * @param {({taxonName: string, taxonId: string, vernacularMatch: boolean}|null)} value
       * @returns {boolean}
       */
      ,
      set: function set(taxonSpec) {
        var taxon;

        if (taxonSpec && taxonSpec.taxonId) {
          // this will trigger an error if somehow an invalid id was supplied
          taxon = Taxon.fromId(taxonSpec.taxonId); // build the saved values from the dictionary rather than from the literal user entry (which may use different formatting)

          this._value = {
            taxonId: taxon.id,
            taxonName: taxonSpec.vernacularMatch ? taxon.vernacular : taxon.nameString,
            vernacularMatch: taxonSpec.vernacularMatch
          };
        } else {
          this._value = {
            taxonId: '',
            taxonName: taxonSpec && taxonSpec.taxonName ? taxonSpec.taxonName : '',
            vernacularMatch: null
          };
        }

        this.updateView();
      }
    }, {
      key: "updateView",
      value: function updateView() {
        if (this._fieldEl) {
          // do nothing until the view has been constructed
          var inputEl = document.getElementById(_classPrivateFieldGet(this, _inputFieldId));
          inputEl.value = this._value.taxonName;
          this._lastInputValue = this._value.taxonName; // probably not necessary
        }
      }
      /**
       *
       * @param {(boolean|null)} isValid
       */

    }, {
      key: "markValidity",
      value: function markValidity(isValid) {
        var el = document.getElementById(_classPrivateFieldGet(this, _inputFieldId));

        if (null === isValid) {
          el.classList.remove('is-invalid', 'is-valid');
        } else {
          el.classList.remove(isValid ? 'is-invalid' : 'is-valid');
          el.classList.add(isValid ? 'is-valid' : 'is-invalid');
        }
      }
      /**
       * initialises this._fieldEl
       *
       * @returns {void}
       */

    }, {
      key: "buildField",
      value: function buildField() {
        //    <div class="form-group">
        //     <label for="exampleFormControlInput1">Email address</label>
        //     <div class="dropbox-wrapper">
        //     <input type="text" class="form-control dropbox-input" id="exampleFormControlInput1" placeholder="name@example.com">
        //     <div class="dropdown-list">
        //     </div>
        //   </div>
        var container = document.createElement('div');
        container.className = 'form-group';

        _classPrivateFieldSet(this, _containerId$2, container.id = FormField.nextId);

        _classPrivateFieldSet(this, _inputFieldId, FormField.nextId);

        var labelEl = container.appendChild(document.createElement('label'));
        labelEl.htmlFor = _classPrivateFieldGet(this, _inputFieldId);
        labelEl.textContent = this.label;
        var wrapperEl = container.appendChild(document.createElement('div'));
        wrapperEl.className = 'dropdown-wrapper';
        var inputField = wrapperEl.appendChild(document.createElement('input'));
        inputField.className = "form-control dropdown-input";
        inputField.id = _classPrivateFieldGet(this, _inputFieldId);
        inputField.autocomplete = 'off';
        inputField.spellcheck = false;

        if (this.validationMessage) {
          // unfortunately the validation message has to be placed immediately after the input field
          var validationMessageElement = wrapperEl.appendChild(document.createElement('div'));
          validationMessageElement.className = 'invalid-feedback';
          validationMessageElement.innerHTML = this.validationMessage;
        }

        var dropDownList = wrapperEl.appendChild(document.createElement('div'));
        dropDownList.className = 'dropdown-list';

        _classPrivateFieldSet(this, _dropDownListDivId, dropDownList.id = FormField.nextId);

        _classPrivateFieldSet(this, _dropDownListUlId, FormField.nextId);

        if (this.helpText) {
          var helpTextField = container.appendChild(document.createElement('small'));
          helpTextField.innerHTML = this.helpText;
        }

        inputField.addEventListener('keydown', this.keydownHandler.bind(this)); //inputField.addEventListener('keyup', this.keyupHandler.bind(this)); // unfortunately keyup doesn't fire for touch keyboards

        inputField.addEventListener('input', this.inputHandler.bind(this));
        inputField.addEventListener('change', this.inputChangeHandler.bind(this));
        container.addEventListener('focusin', this.focusHandler.bind(this));
        container.addEventListener('focusout', this.blurHandler.bind(this));
        dropDownList.addEventListener('click', this.dropboxClickHandler.bind(this));
        this._fieldEl = container;
      }
      /**
       *
       * @param {KeyboardEvent} event
       * @param {HTMLInputElement} event.target
       * @return {boolean}
       */

    }, {
      key: "keydownHandler",
      value: function keydownHandler(event) {
        this._lastInputValue = event.target.value.trimLeft(); // save value for testing in InputEvent handler

        switch (event.key) {
          case 'Enter':
            event.preventDefault(); // exit if no suggestions
            // if (this.selectedIndex < 0 || !this.suggestionsCol) {
            //     return;
            // }
            // // find which one is currently selected
            // const selectedModel = this.suggestionsCol.at(this.selectedIndex);
            //
            // const species = selectedModel.toJSON();
            // delete species.selected;
            // this.trigger('taxon:selected', species, false);

            break;

          case 'ArrowUp':
            event.preventDefault(); // if (this.selectedIndex > 0) {
            //     this.suggestionsCol.at(this.selectedIndex).set('selected', false);
            //     this.selectedIndex--;
            //     this.suggestionsCol.at(this.selectedIndex).set('selected', true);
            // }

            break;

          case 'ArrowDown':
            // Down
            event.preventDefault(); // if ((this.suggestionsCol && this.suggestionsCol.length) && // initialized
            //     this.selectedIndex < this.suggestionsCol.length - 1) { // not out of boundaries
            //     this.suggestionsCol.at(this.selectedIndex).set('selected', false);
            //     this.selectedIndex++;
            //     this.suggestionsCol.at(this.selectedIndex).set('selected', true);
            // }

            break;
          // default:
          //     // Other
          //     let text = input;
          //
          //     // on keyDOWN need to add the pressed char
          //     let pressedChar = String.fromCharCode(event.key);
          //     if (event.keyCode != 8) {
          //         // http://stackoverflow.com/questions/19278037/javascript-non-unicode-char-code-to-unicode-character
          //         if (e.keyCode === 189 || e.keyCode === 109) {
          //             pressedChar = '-';
          //         }
          //         if (e.keyCode === 190) {
          //             pressedChar = '.';
          //         }
          //
          //         text += pressedChar;
          //     } else {
          //         // Backspace - remove a char
          //         text = text.slice(0, text.length - 1);
          //     }
          //
          //     // proceed if minimum length phrase was provided
          //     if ((text.replace(/\.|\s/g, '').length) >= TaxonSearch.MIN_SEARCH_LENGTH) {
          //         text = text.trim();
          //
          //         // Clear previous timeout
          //         if (this.#taxonLookupTimeoutHandle !== -1) {
          //             clearTimeout(this.#taxonLookupTimeoutHandle);
          //         }
          //
          //         // Set new timeout - don't run if user is typing
          //         this.#taxonLookupTimeoutHandle = setTimeout(function () {
          //             // let controller know
          //             that.trigger('taxon:searched', text.toLowerCase());
          //         }, 100);
          //     } else if (text.replace(/\.|\s/g, '').length === 0) {
          //         // no search text, but pass through search, so that 'Unknown sp' can be shown
          //
          //         // Clear previous timeout
          //         if (this.#taxonLookupTimeoutHandle !== -1) {
          //             clearTimeout(this.#taxonLookupTimeoutHandle);
          //         }
          //
          //         // Set new timeout - don't run if user is typing
          //         this.#taxonLookupTimeoutHandle = setTimeout(function () {
          //             // let controller know
          //             that.trigger('taxon:searched', '');
          //         }, 100);
          //     }
        }
      }
      /**
       *
       * @param {InputEvent} event
       */

    }, {
      key: "inputHandler",
      value: function inputHandler(event) {
        var currentValue = event.target.value.trimLeft(); // save value for testing in InputEvent handler

        if (currentValue !== this._lastInputValue) {
          _classPrivateMethodGet$1(this, _triggerQuery, _triggerQuery2).call(this, event.target);
        }
      }
      /**
       *
       * @param {KeyboardEvent} event
       * @return {boolean}
       */

    }, {
      key: "keyupHandler",
      value: function keyupHandler(event) {
        //console.log({'key' : event.key});
        if (event.key && (event.key.length === 1 || event.key === 'Backspace' || event.key === 'Delete')) {
          //keypress was a printable character
          _classPrivateMethodGet$1(this, _triggerQuery, _triggerQuery2).call(this, event.target); // let text = TaxonPickerField.cleanRawInput(event.target);
          //
          // // proceed if minimum length phrase was provided
          // if ((text.length) >= TaxonSearch.MIN_SEARCH_LENGTH) {
          //
          //     // Clear previous timeout
          //     if (this.#taxonLookupTimeoutHandle) {
          //         clearTimeout(this.#taxonLookupTimeoutHandle);
          //     }
          //
          //     // Set new timeout - don't run if user is typing
          //     this.#taxonLookupTimeoutHandle = setTimeout(() => {
          //         this.#searchResults = this.taxonSearch.lookup(
          //             TaxonPickerField.cleanRawInput(document.getElementById(this.#inputFieldId))
          //         );
          //
          //         console.log(this.#searchResults);
          //
          //         this.refreshSearchResultsList();
          //
          //         this.#taxonLookupTimeoutHandle = null;
          //     }, TaxonPickerField.timeoutDelay);
          // }

        }
      }
      /**
       *
       * @param {HTMLInputElement} inputEl
       */

    }, {
      key: "focusHandler",
      value:
      /**
       *
       * @param {Event} event
       */
      function focusHandler(event) {
        console.log('focused');
        var dropDownEl = document.getElementById(_classPrivateFieldGet(this, _dropDownListDivId)); //const container = document.getElementById(this.#containerId);

        if (!dropDownEl.classList.contains('dropdown-focused')) {
          // refresh dropdown list when first focused
          // focus event will re-fire after click on link in dropdown potentially disrupting subsequent click
          // it is important that the query is not re-run if already focused.
          var inputEl = document.getElementById(_classPrivateFieldGet(this, _inputFieldId));

          _classPrivateMethodGet$1(this, _triggerQuery, _triggerQuery2).call(this, inputEl);

          dropDownEl.classList.add('dropdown-focused');
        }
      }
      /**
       *
       * @param {Event} event
       */

    }, {
      key: "blurHandler",
      value: function blurHandler(event) {
        var _this2 = this;

        // clear taxon result lookup timeout
        if (_classPrivateFieldGet(this, _taxonLookupTimeoutHandle)) {
          clearTimeout(_classPrivateFieldGet(this, _taxonLookupTimeoutHandle));

          _classPrivateFieldSet(this, _taxonLookupTimeoutHandle, null);
        } // to avoid blurring before a link click has been processed, introduce a delay


        setTimeout(function () {
          var dropDownEl = document.getElementById(_classPrivateFieldGet(_this2, _dropDownListDivId));
          dropDownEl.classList.remove('dropdown-focused'); // console.log('applied blur');
        }, 500);
      }
    }, {
      key: "refreshSearchResultsList",
      value: function refreshSearchResultsList() {
        var dropdownListEl = document.getElementById(_classPrivateFieldGet(this, _dropDownListDivId));

        if (_classPrivateFieldGet(this, _searchResults).length) {
          var htmlResults = [];
          var n = 0;

          var _iterator = _createForOfIteratorHelper$1(_classPrivateFieldGet(this, _searchResults)),
              _step;

          try {
            for (_iterator.s(); !(_step = _iterator.n()).done;) {
              var result = _step.value;
              htmlResults[htmlResults.length] = "<a class=\"list-group-item list-group-item-action\" href=\"#\" data-occurrenceId=\"".concat(result.entityId, "\" data-resultnumber=\"").concat(n, "\">").concat(TaxonSearch.formatter(result), "</a>");
              ++n;
            }
          } catch (err) {
            _iterator.e(err);
          } finally {
            _iterator.f();
          }

          dropdownListEl.innerHTML = "<div class=\"list-group\" id=\"".concat(_classPrivateFieldGet(this, _dropDownListUlId), "\">").concat(htmlResults.join(''), "</div>"); // const htmlResults = [];
          //
          // let n = 0;
          // for (let result of this.#searchResults) {
          //     htmlResults[htmlResults.length] = `<li><a href="#" data-occurrenceId="${result.entityId}" data-resultnumber="${n}">${TaxonSearch.formatter(result)}</a></li>`;
          //     ++n;
          // }
          //
          // dropdownListEl.innerHTML = `<ul id="${this.#dropDownListUlId}">${htmlResults.join('')}</ul>`;
        } else {
          dropdownListEl.innerHTML = '';
        }

        _classPrivateFieldSet(this, _selectedIndex, null);
      }
    }, {
      key: "dropboxClickHandler",
      value:
      /**
       *
       * @param {MouseEvent} event
       */
      function dropboxClickHandler(event) {
        console.log('click handler');
        console.log(event);
        var targetEl = event.target.closest('a');
        console.log(targetEl);

        if (_classPrivateFieldGet(this, _changeEventTimeout)) {
          clearTimeout(_classPrivateFieldGet(this, _changeEventTimeout));

          _classPrivateFieldSet(this, _changeEventTimeout, null);

          console.log('cleared a pending change event');
        }

        if (targetEl && targetEl.dataset.occurrenceid) {
          event.preventDefault();
          console.log("got target ".concat(targetEl.dataset.occurrenceid));

          var result = _classPrivateFieldGet(this, _searchResults)[targetEl.dataset.resultnumber]; //document.getElementById(this.#inputFieldId).blur();


          this.value = {
            taxonId: result.entityId,
            taxonName: result.vernacularMatched ? result.vernacular : result.qname,
            vernacularMatch: result.vernacularMatched
          }; // setter will refresh the field but not fire a change event

          this.fireEvent(FormField.EVENT_CHANGE);
        }
      }
    }, {
      key: "inputChangeHandler",
      value: function inputChangeHandler(event) {
        var _this3 = this;

        // need to prevent race-conditions between clicks and change events
        // i.e. a click event on the dropdown list might come after a change event on the input field
        event.stopPropagation(); // don't allow the change event to reach the form-level event handler (will handle it here instead)

        console.log('got taxon field input change event');

        if (_classPrivateFieldGet(this, _changeEventTimeout)) {
          clearTimeout(_classPrivateFieldGet(this, _changeEventTimeout));
        } // avoid acting on a change immediately, in case there is a click event following


        _classPrivateFieldSet(this, _changeEventTimeout, setTimeout(function () {
          console.log('processing taxon field input change event'); // check if the dropdown list has an exact match, if so then use it

          var exactMatch = _classPrivateFieldGet(_this3, _searchResults).find(function (result) {
            return result.exact;
          });

          if (exactMatch) {
            console.log('exact match');
            _this3.value = {
              taxonId: exactMatch.entityId,
              taxonName: exactMatch.vernacularMatched ? exactMatch.vernacular : exactMatch.qname,
              vernacularMatch: exactMatch.vernacularMatched
            }; // setter will refresh the field but not fire a change event
          } else {
            console.log('no match');
            _this3.value = {
              taxonId: '',
              taxonName: document.getElementById(_classPrivateFieldGet(_this3, _inputFieldId)).value.trim(),
              vernacularMatch: null
            };
          }

          console.log(_this3._value);

          _this3.fireEvent(FormField.EVENT_CHANGE);
        }, 500));
      }
    }], [{
      key: "isEmpty",
      value: function isEmpty(value) {
        return !value || value && !value.taxonName;
      }
    }, {
      key: "cleanRawInput",
      value: function cleanRawInput(inputElement) {
        return inputElement.value.trim().replace(/\s\s+/g, ' ');
      }
    }]);

    return TaxonPickerField;
  }(FormField);

  function _triggerQuery2(inputEl) {
    var _this4 = this;

    var text = FormField.cleanRawInput(inputEl); // Clear previous timeout

    if (_classPrivateFieldGet(this, _taxonLookupTimeoutHandle)) {
      clearTimeout(_classPrivateFieldGet(this, _taxonLookupTimeoutHandle));
    } // proceed if minimum length phrase was provided


    if (text.length >= TaxonSearch.MIN_SEARCH_LENGTH) {
      // Set new timeout - don't run if user is typing
      _classPrivateFieldSet(this, _taxonLookupTimeoutHandle, setTimeout(function () {
        _classPrivateFieldSet(_this4, _searchResults, _this4.taxonSearch.lookup(FormField.cleanRawInput(document.getElementById(_classPrivateFieldGet(_this4, _inputFieldId)))));

        console.log(_classPrivateFieldGet(_this4, _searchResults));

        _this4.refreshSearchResultsList();

        _classPrivateFieldSet(_this4, _taxonLookupTimeoutHandle, null);
      }, TaxonPickerField.timeoutDelay));
    } else {
      // clear the results list
      _classPrivateFieldSet(this, _searchResults, []);

      this.refreshSearchResultsList();
    }
  }

  _defineProperty$1(TaxonPickerField, "timeoutDelay", 50);

  var GridRef =
  /*@__PURE__*/
  function () {
    /**
     * @constructor
     */
    var GridRef = function GridRef() {};
    /**
     * x,y offsets (in metres) for tetrad letter codes
     * @type {Object.<string,Array.<number>>}
     */


    GridRef.tetradOffsets = {
      E: [0, 8000],
      J: [2000, 8000],
      P: [4000, 8000],
      U: [6000, 8000],
      Z: [8000, 8000],
      D: [0, 6000],
      I: [2000, 6000],
      N: [4000, 6000],
      T: [6000, 6000],
      Y: [8000, 6000],
      C: [0, 4000],
      H: [2000, 4000],
      M: [4000, 4000],
      S: [6000, 4000],
      X: [8000, 4000],
      B: [0, 2000],
      G: [2000, 2000],
      L: [4000, 2000],
      R: [6000, 2000],
      W: [8000, 2000],
      A: [0, 0],
      F: [2000, 0],
      K: [4000, 0],
      Q: [6000, 0],
      V: [8000, 0]
    };
    /**
     * x,y offsets (in metres) for quadrant codes
     * @var array
     */

    GridRef.quadrantOffsets = {
      NW: [0, 5000],
      NE: [5000, 5000],
      SW: [0, 0],
      SE: [5000, 0]
    };
    /**
     * numerical mapping of letters to numbers
     * 'I' is omitted
     * @var array
     */

    GridRef.letterMapping = {
      A: 0,
      B: 1,
      C: 2,
      D: 3,
      E: 4,
      F: 5,
      G: 6,
      H: 7,
      J: 8,
      K: 9,
      L: 10,
      M: 11,
      N: 12,
      O: 13,
      P: 14,
      Q: 15,
      R: 16,
      S: 17,
      T: 18,
      U: 19,
      V: 20,
      W: 21,
      X: 22,
      Y: 23,
      Z: 24
    };
    /**
     * tetrad letters ordered by easting then northing (steps of 2000m)
     * i.e. (x*4) + y
     *
     * where x and y are integer of (10km remainder / 2)
     *
     * @var string
     */

    GridRef.tetradLetters = 'ABCDEFGHIJKLMNPQRSTUVWXYZ';
    /**
     *
     * @var string
     */

    GridRef.prototype.preciseGridRef = '';
    /**
     * length in m (0 marks an invalid value)
     *
     * @var number
     */

    GridRef.prototype.length = 0;
    /**
     * @var string
     */

    GridRef.prototype.hectad = '';
    /**
     * 10km ref with tetrad suffix or ''
     * e.g. SD59A
     * @var string
     */

    GridRef.prototype.tetrad = '';
    /**
     *
     * @var string
     */

    GridRef.prototype.tetradLetter = '';
    /**
     * quadrant gridref(e.g. NZ34NW)
     * only set if gridref is defined at 5km or <=1km precision
     * undefined by default so need to use getter
     *
     * read using GridRef::get_quadrant
     *
     * @var string
     */

    GridRef.prototype.quadrant = '';
    /**
     * quadrant code suffix(e.g. NW, NE, SW, SE)
     *
     * @var string
     */

    GridRef.prototype.quadrantCode = '';
    /**
     * update tetrad using Easting/Northing values (metres)
     * hectad should have been set prior to call
     */

    GridRef.prototype.set_tetrad = function () {
      this.tetradLetter = GridRef.tetradLetters.substr((Math.floor(this.gridCoords.x % 10000 / 1000) >> 1) * 5 + (Math.floor(this.gridCoords.y % 10000 / 1000) >> 1), 1);

      if (!this.tetradLetter) {
        throw new Error("Failed to get tetrad letter when processing '" + this.preciseGridRef + "', easting=" + this.gridCoords.x + " northing=" + this.gridCoords.y);
      }

      this.tetrad = this.hectad + this.tetradLetter;
    };
    /**
     *
     * @param {number} rawPrecision
     * @param {number} minPrecision
     * @returns {number}
     */


    GridRef.get_normalized_precision = function (rawPrecision, minPrecision) {
      return rawPrecision > 2000 ? 10000 : rawPrecision > 1000 ? 2000 : rawPrecision > 100 ? 1000 : rawPrecision > 10 ? 100 : rawPrecision > 1 ? 10 : minPrecision ? minPrecision : 1;
    };

    return GridRef;
  }();

  /**
   * represents lat lng as WGS84 (google map form)
   *
   * @param {number} lat
   * @param {number} lng
   * @constructor
   */
  var LatLngWGS84 = function LatLngWGS84(lat, lng) {
    this.lat = lat;
    this.lng = lng;
  };

  var deg2rad = Math.PI / 180;
  var rad2deg = 180.0 / Math.PI;

  //import { LatLng } from './LatLng';

  /**
   * represents lat lng as OSGB1936 (Ordnance Survey projection)
   *
   * @param {number} lat
   * @param {number} lng
   * @constructor
   */

  var LatLngGB = function LatLngGB(lat, lng) {
    this.lat = lat;
    this.lng = lng;
  };
  /**
   * 
   * @returns {LatLngWGS84}
   */

  LatLngGB.prototype.to_WGS84 = function () {
    //airy1830 = new RefEll(6377563.396, 6356256.909);
    var a = 6377563.396; //airy1830.maj;
    //var b        = 6356256.909; //airy1830.min;

    var eSquared = 0.00667054007; // ((maj * maj) - (min * min)) / (maj * maj); // airy1830.ecc;

    var phi = this.lat * deg2rad; // (Math.PI / 180)(this.lat);

    var sinPhi = Math.sin(phi);
    var lambda = this.lng * deg2rad; // (Math.PI / 180)(this.lng);

    var v = a / Math.sqrt(1 - eSquared * (sinPhi * sinPhi)); //H = 0; // height

    var x = v * Math.cos(phi) * Math.cos(lambda);
    var y = v * Math.cos(phi) * Math.sin(lambda);
    var z = (1 - eSquared) * v * sinPhi;
    var tx = 446.448;
    var ty = -124.157;
    var tz = 542.060;
    var s = -0.0000204894;
    var rx = 0.000000728190110241429; // (Math.PI / 180)( 0.00004172222);

    var ry = 0.000001197489772948010; // (Math.PI / 180)( 0.00006861111);

    var rz = 0.000004082615892268120; // (Math.PI / 180)( 0.00023391666);

    var xB = tx + x * (1 + s) + -rx * y + ry * z;
    var yB = ty + rz * x + y * (1 + s) + -rx * z;
    var zB = tz + -ry * x + rx * y + z * (1 + s); //wgs84 = new RefEll(6378137.000, 6356752.3141);

    a = 6378137.000; // wgs84.maj;
    //var b        = 6356752.3141; // wgs84.min;

    eSquared = 0.00669438003; // ((maj * maj) - (min * min)) / (maj * maj); //wgs84.ecc;
    //lambdaB = (180 / Math.PI)(Math.atan(yB / xB));

    var p = Math.sqrt(xB * xB + yB * yB);
    var phiN = Math.atan(zB / (p * (1 - eSquared)));

    for (var i = 1; i < 10; ++i) {
      var sinPhiN = Math.sin(phiN); // this must be in the for loop as phiN is variable

      phiN = Math.atan((zB + eSquared * (a / Math.sqrt(1 - eSquared * (sinPhiN * sinPhiN))) * sinPhiN) / p);
    } //this.lat = rad2deg * phiN;
    //this.lng = rad2deg * (Math.atan(yB / xB)); // lambdaB;


    return new LatLngWGS84(rad2deg * phiN, rad2deg * Math.atan(yB / xB));
  }; // /**
  //  * converts lat and lon (OSGB36) to OS northings and eastings
  //  *
  //  * @returns {GridCoordsGB}
  //  */
  // LatLngGB.prototype.to_os_coords = function() {
  //     var phi = this.lat * deg2rad; // convert latitude to radians
  //     var lam = this.lng * deg2rad; // convert longitude to radians
  //     var a = 6377563.396; // OSGB semi-major axis
  //     var b = 6356256.91; // OSGB semi-minor axis
  //     var e0 = 400000; // easting of false origin
  //     var n0 = -100000; // northing of false origin
  //     var f0 = 0.9996012717; // OSGB scale factor on central meridian
  //     var e2 = 0.0066705397616; // OSGB eccentricity squared
  //     var lam0 = -0.034906585039886591; // OSGB false east
  //     var phi0 = 0.85521133347722145; // OSGB false north
  //     var af0 = a * f0;
  //     var bf0 = b * f0;
  //
  //     // easting
  //     var slat2 = Math.sin(phi) * Math.sin(phi);
  //     var nu = af0 / (Math.sqrt(1 - (e2 * (slat2))));
  //     var rho = (nu * (1 - e2)) / (1 - (e2 * slat2));
  //     var eta2 = (nu / rho) - 1;
  //     var p = lam - lam0;
  //     var IV = nu * Math.cos(phi);
  //     var clat3 = Math.pow(Math.cos(phi), 3);
  //     var tlat2 = Math.tan(phi) * Math.tan(phi);
  //     var V = (nu / 6) * clat3 * ((nu / rho) - tlat2);
  //     var clat5 = Math.pow(Math.cos(phi), 5);
  //     var tlat4 = Math.pow(Math.tan(phi), 4);
  //     var VI = (nu / 120) * clat5 * ((5 - (18 * tlat2)) + tlat4 + (14 * eta2) - (58 * tlat2 * eta2));
  //     var east = e0 + (p * IV) + (Math.pow(p, 3) * V) + (Math.pow(p, 5) * VI);
  //
  //     // northing
  //     var n = (af0 - bf0) / (af0 + bf0);
  //     var M = LatLng._Marc(bf0, n, phi0, phi);
  //     var I = M + (n0);
  //     var II = (nu / 2) * Math.sin(phi) * Math.cos(phi);
  //     var III = ((nu / 24) * Math.sin(phi) * Math.pow(Math.cos(phi), 3)) * (5 - Math.pow(Math.tan(phi), 2) + (9 * eta2));
  //     var IIIA = ((nu / 720) * Math.sin(phi) * clat5) * (61 - (58 * tlat2) + tlat4);
  //     var north = I + ((p * p) * II) + (Math.pow(p, 4) * III) + (Math.pow(p, 6) * IIIA);
  //
  // 	return new GridCoordsGB(Math.round(east), Math.round(north));
  // };

  /**
   * 
   * @param {LatLngWGS84} latLngWGS84
   * @returns {LatLngGB}
   */


  LatLngGB.from_wgs84 = function (latLngWGS84) {
    //first off convert to radians
    var radWGlat = latLngWGS84.lat * deg2rad;
    var radWGlon = latLngWGS84.lng * deg2rad; //these are the values for WGS84(GRS80) to OSGB36(Airy)

    var a = 6378137; // WGS84_AXIS

    var e = 0.00669438037928458; // WGS84_ECCENTRIC
    //var h = height; // height above datum (from GPGGA sentence)

    var h = 0;
    var a2 = 6377563.396; // OSGB_AXIS

    var e2 = 0.0066705397616; // OSGB_ECCENTRIC 

    var xp = -446.448;
    var yp = 125.157;
    var zp = -542.06;
    var xr = -0.1502;
    var yr = -0.247;
    var zr = -0.8421;
    var s = 20.4894; // convert to cartesian; lat, lon are in radians

    var sf = s * 0.000001;
    var v = a / Math.sqrt(1 - e * Math.sin(radWGlat) * Math.sin(radWGlat));
    var x = (v + h) * Math.cos(radWGlat) * Math.cos(radWGlon);
    var y = (v + h) * Math.cos(radWGlat) * Math.sin(radWGlon);
    var z = ((1 - e) * v + h) * Math.sin(radWGlat); // transform cartesian

    var xrot = xr / 3600 * deg2rad;
    var yrot = yr / 3600 * deg2rad;
    var zrot = zr / 3600 * deg2rad;
    var hx = x + x * sf - y * zrot + z * yrot + xp;
    var hy = x * zrot + y + y * sf - z * xrot + yp;
    var hz = -1 * x * yrot + y * xrot + z + z * sf + zp; // Convert back to lat, lon

    var newLon = Math.atan(hy / hx);
    var p = Math.sqrt(hx * hx + hy * hy);
    var newLat = Math.atan(hz / (p * (1 - e2)));
    v = a2 / Math.sqrt(1 - e2 * (Math.sin(newLat) * Math.sin(newLat)));
    var errvalue = 1.0;
    var lat0 = 0;

    while (errvalue > 0.001) {
      lat0 = Math.atan((hz + e2 * v * Math.sin(newLat)) / p);
      errvalue = Math.abs(lat0 - newLat);
      newLat = lat0;
    }

    return new LatLngGB(newLat * rad2deg, newLon * rad2deg);
  }; // return LatLngGB;
  // })();

  var LatLng =
  /*@__PURE__*/
  function () {
    /**
     * represents lat lng
     *
     * @param {number} lat
     * @param {number} lng
     * @constructor
     */
    var LatLng =
    
    function LatLng(lat, lng) {
      this.lat = lat;
      this.lng = lng;
    };

    LatLng._transform = function (lat, lon, a, e, h, a2, e2, xp, yp, zp, xr, yr, zr, s) {
      // convert to cartesian; lat, lon are radians
      var sf = s * 0.000001;
      var v = a / Math.sqrt(1 - e * (Math.sin(lat) * Math.sin(lat)));
      var x = (v + h) * Math.cos(lat) * Math.cos(lon);
      var y = (v + h) * Math.cos(lat) * Math.sin(lon);
      var z = ((1 - e) * v + h) * Math.sin(lat); // transform cartesian

      var xrot = xr / 3600 * deg2rad;
      var yrot = yr / 3600 * deg2rad;
      var zrot = zr / 3600 * deg2rad;
      var hx = x + x * sf - y * zrot + z * yrot + xp;
      var hy = x * zrot + y + y * sf - z * xrot + yp;
      var hz = -1 * x * yrot + y * xrot + z + z * sf + zp; // Convert back to lat, lon

      lon = Math.atan(hy / hx);
      var p = Math.sqrt(hx * hx + hy * hy);
      lat = Math.atan(hz / (p * (1 - e2)));
      v = a2 / Math.sqrt(1 - e2 * (Math.sin(lat) * Math.sin(lat)));
      var errvalue = 1.0;
      var lat0 = 0;

      while (errvalue > 0.001) {
        lat0 = Math.atan((hz + e2 * v * Math.sin(lat)) / p);
        errvalue = Math.abs(lat0 - lat);
        lat = lat0;
      } //h = p / Math.cos(lat) - v;
      //var geo = { latitude: lat, longitude: lon, height: h };  // object to hold lat and lon


      return new LatLng(lat, lon);
    }; //helper


    LatLng._Marc = function (bf0, n, phi0, phi) {
      return bf0 * ((1 + n + 5 / 4 * (n * n) + 5 / 4 * (n * n * n)) * (phi - phi0) - (3 * n + 3 * (n * n) + 21 / 8 * (n * n * n)) * Math.sin(phi - phi0) * Math.cos(phi + phi0) + (15 / 8 * (n * n) + 15 / 8 * (n * n * n)) * Math.sin(2 * (phi - phi0)) * Math.cos(2 * (phi + phi0)) - 35 / 24 * (n * n * n) * Math.sin(3 * (phi - phi0)) * Math.cos(3 * (phi + phi0)));
    };

    return LatLng;
  }();

  var LatLngCI =
  /*@__PURE__*/
  function () {
    /**
     * represents lat lng as INT24 (CI grid projection)
     *
     * @constructor
     * @param {number} lat
     * @param {number} lng
     */
    var LatLngCI = function LatLngCI(lat, lng) {
      this.lat = lat;
      this.lng = lng;
    }; // /**
    //  * converts lat and lon to CI northings and eastings
    //  *
    //  * @returns GridCoordsCI
    //  */
    // LatLngCI.prototype.to_os_coords = function() {
    // 	var phi = this.lat * deg2rad; // convert latitude to radians
    // 	var lam = this.lng * deg2rad; // convert longitude to radians
    // 	var a = 6378388.000;      // OSI semi-major
    // 	var b = 6356911.946;      // OSI semi-minor
    // 	var e0 = 500000;          // OSI easting of false origin
    // 	var n0 = 0;          // OSI northing of false origin
    // 	var f0 = 0.9996;        // OSI scale factor on central meridian
    // 	var e2 = 0.0067226700223333;   // OSI eccentricity squared
    // 	var lam0 = -0.0523598775598;   // OSI false east
    // 	var phi0 = 0;    // OSI false north
    // 	var af0 = a * f0;
    // 	var bf0 = b * f0;
    //
    // 	// easting
    // 	var slat2 = Math.sin(phi) * Math.sin(phi);
    // 	var nu = af0 / (Math.sqrt(1 - (e2 * (slat2))));
    // 	var rho = (nu * (1 - e2)) / (1 - (e2 * slat2));
    // 	var eta2 = (nu / rho) - 1;
    // 	var p = lam - lam0;
    // 	var IV = nu * Math.cos(phi);
    // 	var clat3 = Math.pow(Math.cos(phi), 3);
    // 	var tlat2 = Math.tan(phi) * Math.tan(phi);
    // 	var V = (nu / 6) * clat3 * ((nu / rho) - tlat2);
    // 	var clat5 = Math.pow(Math.cos(phi), 5);
    // 	var tlat4 = Math.pow(Math.tan(phi), 4);
    // 	var VI = (nu / 120) * clat5 * ((5 - (18 * tlat2)) + tlat4 + (14 * eta2) - (58 * tlat2 * eta2));
    // 	var east = e0 + (p * IV) + (Math.pow(p, 3) * V) + (Math.pow(p, 5) * VI);
    //
    // 	// northing
    // 	var n = (af0 - bf0) / (af0 + bf0);
    // 	var M = LatLng._Marc(bf0, n, phi0, phi);
    // 	var I = M + (n0);
    // 	var II = (nu / 2) * Math.sin(phi) * Math.cos(phi);
    // 	var III = ((nu / 24) * Math.sin(phi) * Math.pow(Math.cos(phi), 3)) * (5 - Math.pow(Math.tan(phi), 2) + (9 * eta2));
    // 	var IIIA = ((nu / 720) * Math.sin(phi) * clat5) * (61 - (58 * tlat2) + tlat4);
    // 	var north = I + ((p * p) * II) + (Math.pow(p, 4) * III) + (Math.pow(p, 6) * IIIA);
    //
    // 		//return {x: Math.round(east), y: Math.round(north)};
    // 	return new GridCoordsCI(Math.round(east), Math.round(north));
    // };

    /**
     * 
     * @param {LatLngWGS84} latLngWGS84
     * @returns {LatLngCI}
     */


    LatLngCI.from_wgs84 = function (latLngWGS84) {
      var phip = latLngWGS84.lat * deg2rad;
      var lambdap = latLngWGS84.lng * deg2rad;
      var CI_AXIS = 6378388.000;
      var CI_ECCENTRIC = 0.0067226700223333;
      var WGS84_AXIS = 6378137;
      var WGS84_ECCENTRIC = 0.00669438037928458;
      /*
       * CI
       a = 6378388.000;       // INT24 ED50 semi-major
       b = 6356911.946;       // INT24 ED50 semi-minor 
       e0 = 500000;           // CI easting of false origin
       n0 = 0;                // CI northing of false origin
       f0 = 0.9996;           // INT24 ED50 scale factor on central meridian
       e2 = 0.0067226700223333;  // INT24 ED50 eccentricity squared
       lam0 = -0.0523598775598;  // CI false east
       phi0 = 0 * deg2rad;       // CI false north 
       */

      var height = 0;

      var latlng = LatLng._transform(phip, lambdap, WGS84_AXIS, WGS84_ECCENTRIC, height, CI_AXIS, CI_ECCENTRIC, 83.901, 98.127, 118.635, 0, 0, 0, 0);

      return new LatLngCI(latlng.lat * rad2deg, latlng.lng * rad2deg);
    };

    return LatLngCI;
  }();

  /**
   * represents lat lng as Modified Airy (Irish grid projection)
   *
   * @param {number} lat
   * @param {number} lng
   * @constructor
   */

  var LatLngIE = function LatLngIE(lat, lng) {
    this.lat = lat;
    this.lng = lng;
  }; // /**
  //  * converts lat and lon (modified Airy) to OSI northings and eastings
  //  *
  //  * @returns {GridCoordsIE}
  //  */
  // LatLngIE.prototype.to_os_coords = function() {
  //     //var deg2rad = Math.PI / 180;
  //     //var rad2deg = 180.0 / Math.PI;
  //
  //     var phi = this.lat * deg2rad; // convert latitude to radians
  //     var lam = this.lng * deg2rad; // convert longitude to radians
  //     var a = 6377340.189;      // OSI semi-major
  //     var b = 6356034.447;      // OSI semi-minor
  //     var e0 = 200000;          // OSI easting of false origin
  //     var n0 = 250000;          // OSI northing of false origin
  //     var f0 = 1.000035;        // OSI scale factor on central meridian
  //     var e2 = 0.00667054015;   // OSI eccentricity squared
  //     var lam0 = -0.13962634015954636615389526147909;   // OSI false east
  //     var phi0 = 0.93375114981696632365417456114141;    // OSI false north
  //     var af0 = a * f0;
  //     var bf0 = b * f0;
  //
  //     // easting
  //     var slat2 = Math.sin(phi) * Math.sin(phi);
  //     var nu = af0 / (Math.sqrt(1 - (e2 * (slat2))));
  //     var rho = (nu * (1 - e2)) / (1 - (e2 * slat2));
  //     var eta2 = (nu / rho) - 1;
  //     var p = lam - lam0;
  //     var IV = nu * Math.cos(phi);
  //     var clat3 = Math.pow(Math.cos(phi), 3);
  //     var tlat2 = Math.tan(phi) * Math.tan(phi);
  //     var V = (nu / 6) * clat3 * ((nu / rho) - tlat2);
  //     var clat5 = Math.pow(Math.cos(phi), 5);
  //     var tlat4 = Math.pow(Math.tan(phi), 4);
  //     var VI = (nu / 120) * clat5 * ((5 - (18 * tlat2)) + tlat4 + (14 * eta2) - (58 * tlat2 * eta2));
  //     var east = e0 + (p * IV) + (Math.pow(p, 3) * V) + (Math.pow(p, 5) * VI);
  //
  //     // northing
  //     var n = (af0 - bf0) / (af0 + bf0);
  //     var M = LatLng._Marc(bf0, n, phi0, phi);
  //     var I = M + (n0);
  //     var II = (nu / 2) * Math.sin(phi) * Math.cos(phi);
  //     var III = ((nu / 24) * Math.sin(phi) * Math.pow(Math.cos(phi), 3)) * (5 - Math.pow(Math.tan(phi), 2) + (9 * eta2));
  //     var IIIA = ((nu / 720) * Math.sin(phi) * clat5) * (61 - (58 * tlat2) + tlat4);
  //     var north = I + ((p * p) * II) + (Math.pow(p, 4) * III) + (Math.pow(p, 6) * IIIA);
  //
  // 	//return {x: Math.round(east), y: Math.round(north)};
  //
  // 	/*
  // 	return (east > 0 && north > 0) ?
  // 		new GridCoordsIE(Math.round(east), Math.round(north))
  // 		:
  // 		null;
  // 	*/
  //    return new GridCoordsIE(Math.round(east), Math.round(north));
  // };

  /**
   * convert Irish projection to WGS84 (for Google Maps)
   * see http://www.carabus.co.uk/ll_ngr.html
  */

  LatLngIE.prototype.to_WGS84 = function () {
    var IRISH_AXIS = 6377340.189;
    var IRISH_ECCENTRIC = 0.00667054015;
    var WGS84_AXIS = 6378137;
    var WGS84_ECCENTRIC = 0.00669438037928458;
    /* 
     * IE
    a = 6377340.189;      // OSI semi-major
    b = 6356034.447;      // OSI semi-minor
    e0 = 200000;          // OSI easting of false origin
    n0 = 250000;          // OSI northing of false origin
    f0 = 1.000035;        // OSI scale factor on central meridian
    e2 = 0.00667054015;   // OSI eccentricity squared
    lam0 = -0.13962634015954636615389526147909;   // OSI false east
    phi0 = 0.93375114981696632365417456114141;    // OSI false north
    */
    //height = 0;

    var latLngRadians = LatLng._transform(this.lat * deg2rad, this.lng * deg2rad, IRISH_AXIS, IRISH_ECCENTRIC, 0, WGS84_AXIS, WGS84_ECCENTRIC, 482.53, -130.596, 564.557, -1.042, -0.214, -0.631, -8.15);

    return new LatLngWGS84(latLngRadians.lat * rad2deg, latLngRadians.lng * rad2deg);
  };
  /**
   * 
   * @param {LatLngWGS84} latLngWGS84
   * @returns {LatLngIE}
   */


  LatLngIE.from_wgs84 = function (latLngWGS84) {
    var phip = latLngWGS84.lat * deg2rad;
    var lambdap = latLngWGS84.lng * deg2rad;
    var IRISH_AXIS = 6377340.189;
    var IRISH_ECCENTRIC = 0.00667054015;
    var WGS84_AXIS = 6378137;
    var WGS84_ECCENTRIC = 0.00669438037928458;
    /*
     * IE
    a = 6377340.189;      // OSI semi-major
       b = 6356034.447;      // OSI semi-minor
       e0 = 200000;          // OSI easting of false origin
       n0 = 250000;          // OSI northing of false origin
       f0 = 1.000035;        // OSI scale factor on central meridian
       e2 = 0.00667054015;   // OSI eccentricity squared
       lam0 = -0.13962634015954636615389526147909;   // OSI false east
       phi0 = 0.93375114981696632365417456114141;    // OSI false north
     */

    var height = 0;

    var latlng = LatLng._transform(phip, lambdap, WGS84_AXIS, WGS84_ECCENTRIC, height, IRISH_AXIS, IRISH_ECCENTRIC, -482.53, 130.596, -564.557, 1.042, 0.214, 0.631, 8.15);

    return new LatLngIE(latlng.lat * rad2deg, latlng.lng * rad2deg);
  }; // return LatLngIE;
  // })();

  /**
   * abstract representation of a gridref co-ordinate pair
   * (*not a gridref string*)
   *
   * @constructor
   * @returns {GridCoords}
   */

  var GridCoords = function GridCoords() {};
  /**
   * tetrad letters ordered by easting then northing (steps of 2000m)
   * i.e. (x*4) + y
   * 
   * where x and y are integer of (10km remainder / 2)
   * @type {string}
   */

  GridCoords.tetradLetters = 'ABCDEFGHIJKLMNPQRSTUVWXYZ';
  /**
   * tetrad letters ordered by northing then easting (steps of 2000m)
   * i.e. (y*5) + x
   * 
   * where x and y are integer of (10km remainder / 2)
   * 
   * @type {string}
   */

  GridCoords.tetradLettersRowFirst = 'AFKQVBGLRWCHMSXDINTYEJPUZ';
  /**
   * 
   * @param {number} lat
   * @param {number} lng
   * @returns {GridCoords}
   */

  GridCoords.from_latlng = function (lat, lng) {
    // test if GB
    if (lng >= -8.74 && lat > 49.88) {
      // lng extreme must accommodate St Kilda
      var os = new LatLngGB.from_wgs84(new LatLngWGS84(lat, lng)).to_os_coords();

      if (os.x >= 0 && os.is_gb_hectad()) {
        return os;
      }
    } // test if Irish


    if (lng < -5.3 && lat > 51.34 && lng > -11 && lat < 55.73) {
      var osI = new LatLngIE.from_wgs84(new LatLngWGS84(lat, lng)).to_os_coords();

      if (osI.x < 0 || osI.y < 0) {
        return null;
      } else {
        return osI;
      }
    } else {
      var osCi = new LatLngCI.from_wgs84(new LatLngWGS84(lat, lng)).to_os_coords();

      if (osCi.x >= 500000 && osCi.x < 600000 && osCi.y >= 5400000 && osCi.y < 5600000) {
        return osCi;
      }
    }

    return null; //not a valid location
  };
  /**
   * 
   * @param {number} easting
   * @param {number} northing
   * @return {string} tetrad letter
   */


  GridCoords.calculate_tetrad = function (easting, northing) {
    return easting >= 0 && northing >= 0 ? GridCoords.tetradLetters.charAt(Math.floor(easting % 10000 / 2000) * 5 + Math.floor(northing % 10000 / 2000)) : '';
  };

  GridCoords.prototype.toString = function () {
    return this.x + ',' + this.y;
  }; // return GridCoords;
  // })();

  /**
   * 
   * @param {string} letters
   * @param {number} e metres
   * @param {number} n metres
   * @param {number} precision metres
   * @returns {String}
   */


  var _e_n_to_gr = function _e_n_to_gr(letters, e, n, precision) {
    var eString = '00000' + Math.floor(e);
    var nString = '00000' + Math.floor(n);

    if (precision === 2000) {
      return letters + eString.charAt(eString.length - 5) + nString.charAt(nString.length - 5) + GridCoords.calculate_tetrad(e, n);
    } else if (precision === 100000) {
      return letters;
    } else {
      if (precision === 5000) {
        // ignore quadrant and treat as hectad
        precision = 10000;
      }

      var logPrecision = Math.round(Math.log10(precision));
      return letters + (logPrecision ? eString.slice(-5, -logPrecision) + nString.slice(-5, -logPrecision) : eString.slice(-5) + nString.slice(-5));
    }
  };

  /**
   *
   * @param {number} easting metres
   * @param {number} northing metres
   * @constructor
   * @returns {GridCoordsCI}
   */

  var GridCoordsCI = function GridCoordsCI(easting, northing) {
    this.x = easting;
    this.y = northing;
  };
  GridCoordsCI.prototype = new GridCoords();
  GridCoordsCI.prototype.constructor = GridCoordsCI;
  GridCoordsCI.prototype.country = 'CI';
  /**
   * convert easting,northing to a WGS84 lat lng
   * 
   * @returns {LatLngWGS84}
   */

  GridCoordsCI.prototype.to_latLng = function () {
    //nX = north;
    //ex = east;
    var a = 6378388.000; // INT24 ED50 semi-major

    var b = 6356911.946; // INT24 ED50 semi-minor

    var e0 = 500000; // easting of false origin

    var n0 = 0; // northing of false origin

    var f0 = 0.9996; // INT24 ED50 scale factor on central meridian

    var e2 = 0.0067226700223333; // INT24 ED50 eccentricity squared

    var lam0 = -0.0523598775598; // INT24 ED50 false east

    var phi0 = 0; //0 * deg2rad;    // INT24 ED50 false north

    var af0 = a * f0;
    var bf0 = b * f0;
    var n = (af0 - bf0) / (af0 + bf0);
    var Et = this.x - e0;

    var phid = _initial_lat(this.y, n0, af0, phi0, n, bf0);

    var nu = af0 / Math.sqrt(1 - e2 * (Math.sin(phid) * Math.sin(phid)));
    var rho = nu * (1 - e2) / (1 - e2 * Math.sin(phid) * Math.sin(phid));
    var eta2 = nu / rho - 1;
    var tlat2 = Math.tan(phid) * Math.tan(phid);
    var tlat4 = Math.pow(Math.tan(phid), 4);
    var tlat6 = Math.pow(Math.tan(phid), 6);
    var clatm1 = Math.pow(Math.cos(phid), -1);
    var VII = Math.tan(phid) / (2 * rho * nu);
    var VIII = Math.tan(phid) / (24 * rho * (nu * nu * nu)) * (5 + 3 * tlat2 + eta2 - 9 * eta2 * tlat2);
    var IX = Math.tan(phid) / (720 * rho * Math.pow(nu, 5)) * (61 + 90 * tlat2 + 45 * tlat4);
    var phip = phid - Et * Et * VII + Math.pow(Et, 4) * VIII - Math.pow(Et, 6) * IX;
    var X = Math.pow(Math.cos(phid), -1) / nu;
    var XI = clatm1 / (6 * (nu * nu * nu)) * (nu / rho + 2 * tlat2);
    var XII = clatm1 / (120 * Math.pow(nu, 5)) * (5 + 28 * tlat2 + 24 * tlat4);
    var XIIA = clatm1 / (5040 * Math.pow(nu, 7)) * (61 + 662 * tlat2 + 1320 * tlat4 + 720 * tlat6);
    var lambdap = lam0 + Et * X - Et * Et * Et * XI + Math.pow(Et, 5) * XII - Math.pow(Et, 7) * XIIA; // var WGS84_AXIS = 6378137;
    // var WGS84_ECCENTRIC = 0.00669438037928458;
    //
    // var INT24_AXIS = 6378388.000;
    // var INT24_ECCENTRIC = 0.0067226700223333;
    // var height = 10;  // dummy height
    // //var latLngRadians = LatLng._transform(phip, lambdap, INT24_AXIS, INT24_ECCENTRIC, height, WGS84_AXIS, WGS84_ECCENTRIC, -83.901, -98.127, -118.635, 0, 0, 0, 0);

    var latLngRadians = GridCoordsCI.convert_to_wgs(phip, lambdap);
    return new LatLngWGS84(latLngRadians.lat * rad2deg, latLngRadians.lng * rad2deg);
  };

  var _initial_lat = function _initial_lat(north, n0, af0, phi0, n, bf0) {
    var phi1 = (north - n0) / af0 + phi0;
    var M = GridCoordsCI.marc(bf0, n, phi0, phi1);
    var phi2 = (north - n0 - M) / af0 + phi1;
    var ind = 0;

    while (Math.abs(north - n0 - M) > 0.00001 && ind < 20) // max 20 iterations in case of error
    {
      ind += 1;
      phi2 = (north - n0 - M) / af0 + phi1;
      M = LatLng._Marc(bf0, n, phi0, phi2);
      phi1 = phi2;
    }

    return phi2;
  };
  /**
   * 
   * @param {number} precision metres
   * @returns {String}
   */


  GridCoordsCI.prototype.to_gridref = function (precision) {
    if (this.y >= 5500000) {
      return _e_n_to_gr('WA', this.x - 500000, this.y - 5500000, precision ? precision : 1);
    } else if (this.y < 5500000) {
      return _e_n_to_gr('WV', this.x - 500000, this.y - 5400000, precision ? precision : 1);
    }

    return null;
  };
  /**
   * 
   * @returns {?string}
   */


  GridCoordsCI.prototype.to_hectad = function () {
    if (this.y > 5500000) {
      return 'WA' + this.x.toString().substring(1, 2) + this.y.toString().substring(2, 3);
    } else if (this.y < 5500000) {
      return 'WV' + this.x.toString().substring(1, 2) + this.y.toString().substring(2, 3);
    }

    return null;
  }; // return GridCoordsCI;
  // })();

  var GridRefCI =
  /*@__PURE__*/
  function () {
    /**
     * @constructor
     */
    var GridRefCI = function GridRefCI() {};

    GridRefCI.prototype = new GridRef();
    GridRefCI.prototype.constructor = GridRefCI;
    GridRefCI.prototype.country = 'CI';
    GridRefCI.prototype.GridCoords = GridCoordsCI;
    /**
     *
     * @param {string} rawGridRef
     * @throws Error
     */

    GridRefCI.prototype.from_string = function (rawGridRef) {
      var trimmedLocality = rawGridRef.replace(/[\[\]\s\t\.\/-]+/g, '').toUpperCase();
      var tetradCode = '';
      var enl;

      if (/[ABCDEFGHIJKLMNPQRSTUVWXYZ]$/.test(trimmedLocality)) {
        // tetrad or quadrant
        if (GridRef.quadrantOffsets.hasOwnProperty(trimmedLocality.substr(trimmedLocality.length - 2))) {
          this.quadrantCode = trimmedLocality.substr(trimmedLocality.length - 2);
          trimmedLocality = trimmedLocality.substr(0, trimmedLocality.length - 2);
        } else {
          tetradCode = trimmedLocality.substr(trimmedLocality.length - 1);
          trimmedLocality = trimmedLocality.substr(0, trimmedLocality.length - 1);
        }
      }

      if (/^(W[AV](?:\d\d){1,5})$/.test(trimmedLocality)) {
        if (enl = GridRefCI.gridref_string_to_e_n_l(trimmedLocality)) {
          this.length = enl.length;
          this.gridCoords = new GridCoordsCI(enl.e, enl.n);
          this.hectad = this.gridCoords.to_gridref(10000);

          if (this.length === 10000 && (tetradCode || this.quadrantCode)) {
            if (tetradCode) {
              this.preciseGridRef = trimmedLocality + tetradCode;
              this.tetrad = this.hectad + tetradCode;
              this.tetradLetter = tetradCode;
              this.length = 2000; // 2km square

              this.gridCoords.x += GridRef.tetradOffsets[tetradCode][0];
              this.gridCoords.y += GridRef.tetradOffsets[tetradCode][1];
            } else {
              // quadrant
              this.preciseGridRef = trimmedLocality + this.quadrantCode;
              this.tetradLetter = '';
              this.tetrad = '';
              this.quadrant = this.preciseGridRef;
              this.length = 5000; // 5km square

              this.gridCoords.x += GridRef.quadrantOffsets[this.quadrantCode][0];
              this.gridCoords.y += GridRef.quadrantOffsets[this.quadrantCode][1];
            }
          } else {
            this.preciseGridRef = trimmedLocality;

            if (this.length <= 1000) {
              // calculate tetrad for precise gridref
              this.set_tetrad();
            }
          }
        } else {
          this.error = true;
          this.errorMessage = 'Grid reference format not understood (odd length).';
        }
      } else {
        // no match
        this.error = true;
        this.errorMessage = "Channel Island grid reference format not understood. ('" + rawGridRef + "')";
      }
    };

    GridRefCI.prototype.parse_well_formed = GridRefCI.prototype.from_string;
    /**
     *
     *
     * @param {string} gridRef plain string without tetrad or quadrant suffix
     * @return {(boolean|{e : number, n : number, length : number})}
     * returns false on error or object {'e' : easting, 'n' : northing, 'length' : length}
     */

    GridRefCI.gridref_string_to_e_n_l = function (gridRef) {
      var northOffset, x, y, length; // assume modern alphabetical sheet ref

      var chars = gridRef.substr(0, 2);

      if (chars === 'WA') {
        northOffset = 5500000;
      } else if (chars === 'WV') {
        northOffset = 5400000;
      } else {
        Logger("Bad Channel Island grid letters: '" + chars + "'");
        return false;
      }

      var ref = gridRef.substr(2);

      switch (ref.length) {
        case 2:
          x = ref.charAt(0) * 10000;
          y = ref.charAt(1) * 10000;
          length = 10000; //10 km square

          break;

        case 4:
          x = ref.substr(0, 2) * 1000;
          y = ref.substr(2) * 1000;
          length = 1000; //1 km square

          break;

        case 6:
          x = ref.substr(0, 3) * 100;
          y = ref.substr(3) * 100;
          length = 100; //100m square

          break;

        case 8:
          x = ref.substr(0, 4) * 10;
          y = ref.substr(4) * 10;
          length = 10; //10m square

          break;

        case 10:
          x = parseInt(ref.substr(0, 5), 10);
          y = parseInt(ref.substr(5), 10);
          length = 1; //1m square

          break;

        default:
          Logger("Bad length for Channel Island grid ref '" + gridRef + "'");
          return false;
      }

      return {
        e: x + 500000,
        n: y + northOffset,
        length: length
      };
    };

    return GridRefCI;
  }();

  /**
   *
   * @param {number} easting metres
   * @param {number} northing metres
   * @constructor
   * @extends GridCoords
   * @returns {GridCoordsGB}
   */

  var GridCoordsGB = function GridCoordsGB(easting, northing) {
    this.x = easting;
    this.y = northing;
  };
  GridCoordsGB.prototype = new GridCoords();
  GridCoordsGB.prototype.constructor = GridCoordsGB;
  GridCoordsGB.prototype.country = 'GB';
  GridCoordsGB.gbHectads = 'SV80SV81SV90SV91SW32SW33SW42SW43SW44SW52SW53SW54SW61SW62SW63SW64SW65SW71SW72SW73SW74SW75SW76SW81SW82SW83SW84SW85SW86SW87SW95SW96SW97SS10SS11SS20SS21SS30SW83SW84SW85SW93SW94SW95SW96SW97SW98SX03SX04SX05SX06SX07SX08SX09SX14SX15SX16SX17SX18SX19SX25SX26SX27SX28SX29SX35SX36SX37SX38SX39SX44SX45SX46SX47SS70SS80SS81SS90SS91ST00ST01ST10ST11ST20ST21ST30SX37SX44SX45SX46SX47SX48SX54SX55SX56SX57SX58SX63SX64SX65SX66SX67SX68SX69SX73SX74SX75SX76SX77SX78SX79SX83SX84SX85SX86SX87SX88SX89SX94SX95SX96SX97SX98SX99SY07SY08SY09SY18SY19SY28SY29SY38SY39SS14SS20SS21SS22SS30SS31SS32SS40SS41SS42SS43SS44SS50SS51SS52SS53SS54SS60SS61SS62SS63SS64SS70SS71SS72SS73SS74SS75SS80SS81SS82SS83SS91SS92ST01ST02SX28SX29SX37SX38SX39SX48SX49SX58SX59SX68SX69SX79SS73SS74SS82SS83SS84SS92SS93SS94ST01ST02ST03ST04ST11ST12ST13ST14ST20ST21ST22ST23ST24ST25ST30ST31ST32ST33ST34ST40ST41ST42ST50ST51ST52ST61ST62ST71ST72ST24ST25ST26ST32ST33ST34ST35ST36ST37ST42ST43ST44ST45ST46ST47ST52ST53ST54ST55ST56ST57ST62ST63ST64ST65ST66ST67ST72ST73ST74ST75ST76ST77ST83ST84ST85ST86SP00SP10ST76ST77ST85ST86ST87ST88ST89ST96ST97ST98ST99SU06SU07SU08SU09SU16SU17SU18SU19SU26SU27SU28SU29SU36SU37ST73ST74ST75ST76ST82ST83ST84ST85ST86ST91ST92ST93ST94ST95ST96SU01SU02SU03SU04SU05SU06SU11SU12SU13SU14SU15SU16SU21SU22SU23SU24SU25SU26SU31SU32SU34SU35SU36ST20ST30ST40ST50ST51ST60ST61ST70ST71ST72ST73ST80ST81ST82ST83ST90ST91ST92SU00SU01SU02SU10SU11SY39SY48SY49SY58SY59SY66SY67SY68SY69SY77SY78SY79SY87SY88SY89SY97SY98SY99SZ07SZ08SZ09SZ28SZ38SZ39SZ47SZ48SZ49SZ57SZ58SZ59SZ68SZ69SU00SU01SU02SU10SU11SU12SU20SU21SU22SU23SU30SU31SU32SU33SU40SU41SU42SU43SU50SU51SU52SU60SU61SU62SU70SU71SU72SZ08SZ09SZ19SZ29SZ38SZ39SZ49SZ59SZ69SZ79SU23SU24SU25SU33SU34SU35SU36SU42SU43SU44SU45SU46SU52SU53SU54SU55SU56SU62SU63SU64SU65SU66SU72SU73SU74SU75SU76SU82SU83SU84SU85SU86SU70SU71SU72SU80SU81SU82SU83SU90SU91SU92SU93SZ79SZ89SZ99TQ00TQ01TQ02TQ03TQ10TQ11TQ12TQ13TQ20TQ21TQ22TQ23TQ30TQ31TQ32TQ20TQ21TQ22TQ23TQ30TQ31TQ32TQ33TQ40TQ41TQ42TQ43TQ44TQ50TQ51TQ52TQ53TQ54TQ60TQ61TQ62TQ63TQ70TQ71TQ72TQ80TQ81TQ82TQ91TQ92TV49TV59TV69TQ65TQ72TQ73TQ74TQ75TQ76TQ77TQ82TQ83TQ84TQ85TQ86TQ87TQ91TQ92TQ93TQ94TQ95TQ96TQ97TR01TR02TR03TR04TR05TR06TR07TR12TR13TR14TR15TR16TR23TR24TR25TR26TR27TR33TR34TR35TR36TR37TR46TR47TQ35TQ36TQ37TQ38TQ43TQ44TQ45TQ46TQ47TQ48TQ53TQ54TQ55TQ56TQ57TQ58TQ63TQ64TQ65TQ66TQ67TQ72TQ73TQ74TQ75TQ76TQ77TQ78TQ87TQ88TQ97SU83SU84SU85SU86SU93SU94SU95SU96SU97TQ03TQ04TQ05TQ06TQ07TQ13TQ14TQ15TQ16TQ17TQ23TQ24TQ25TQ26TQ27TQ33TQ34TQ35TQ36TQ37TQ38TQ43TQ44TQ45TL30TL40TL50TL60TL70TL80TL90TM00TQ38TQ39TQ47TQ48TQ49TQ57TQ58TQ59TQ67TQ68TQ69TQ77TQ78TQ79TQ88TQ89TQ98TQ99TR08TR09TR19TL30TL31TL34TL40TL41TL42TL43TL44TL50TL51TL52TL53TL54TL60TL61TL62TL63TL64TL70TL71TL72TL73TL74TL80TL81TL82TL83TL84TL90TL91TL92TL93TM01TM02TM03TM11TM12TM13TM21TM22TM23TQ49SP81SP90SP91TL00TL01TL02TL10TL11TL12TL13TL20TL21TL22TL23TL24TL30TL31TL32TL33TL34TL41TL42TL43TL44TL51TL52TQ09TQ19TQ29TQ39TL20TL30TQ06TQ07TQ08TQ09TQ16TQ17TQ18TQ19TQ27TQ28TQ29TQ37TQ38TQ39SP20SP30SP40SP41SP50SU19SU26SU27SU28SU29SU36SU37SU38SU39SU46SU47SU48SU49SU56SU57SU58SU59SU66SU67SU68SU69SU76SU77SU78SU86SU87SU88SU96SU97SU98SP10SP20SP21SP22SP23SP30SP31SP32SP33SP34SP40SP41SP42SP43SP44SP45SP50SP51SP52SP53SP54SP60SP61SP62SP63SP70SU29SU39SU49SU57SU58SU59SU67SU68SU69SU77SU78SU79SP51SP53SP60SP61SP62SP63SP64SP70SP71SP72SP73SP74SP80SP81SP82SP83SP84SP85SP90SP91SP92SP93SP94SP95SU78SU79SU88SU89SU97SU98SU99TL00TL01TQ07TQ08TQ09TG40TG50TM03TM04TM05TM06TM07TM13TM14TM15TM16TM17TM23TM24TM25TM26TM27TM28TM33TM34TM35TM36TM37TM38TM39TM44TM45TM46TM47TM48TM49TM57TM58TM59TL64TL65TL66TL67TL68TL74TL75TL76TL77TL78TL83TL84TL85TL86TL87TL88TL93TL94TL95TL96TL97TL98TM03TM04TM05TM06TM07TM08TG00TG01TG02TG03TG04TG10TG11TG12TG13TG14TG20TG21TG22TG23TG24TG30TG31TG32TG33TG40TG41TG42TG50TG51TM07TM08TM09TM17TM18TM19TM27TM28TM29TM38TM39TM49TM59TF40TF41TF42TF50TF51TF52TF53TF60TF61TF62TF63TF64TF70TF71TF72TF73TF74TF80TF81TF82TF83TF84TF90TF91TF92TF93TF94TG00TG01TG02TG03TG04TL49TL59TL68TL69TL78TL79TL87TL88TL89TL98TL99TM07TM08TM09TF20TF30TF31TF40TF41TF50TL15TL19TL23TL24TL25TL26TL28TL29TL33TL34TL35TL36TL37TL38TL39TL44TL45TL46TL47TL48TL49TL54TL55TL56TL57TL58TL59TL63TL64TL65TL66TL67TL68TL69TL75TL76SP91SP92SP93SP94SP95SP96TL01TL02TL03TL04TL05TL06TL07TL11TL12TL13TL14TL15TL16TL23TL24TL25TL06TL07TL08TL09TL15TL16TL17TL18TL19TL25TL26TL27TL28TL29TL36TL37TL38TL39SK90SP43SP44SP45SP46SP53SP54SP55SP56SP57SP58SP63SP64SP65SP66SP67SP68SP73SP74SP75SP76SP77SP78SP79SP84SP85SP86SP87SP88SP89SP95SP96SP97SP98SP99TF00TF10TF20TL06TL07TL08TL09TL18TL19TL29SO70SO71SO80SO81SO82SO83SO90SO91SO92SO93SO94SP00SP01SP02SP03SP04SP10SP11SP12SP13SP14SP15SP20SP21SP22SP23SP24SP25ST99SU09SU19SU29SO50SO51SO60SO61SO62SO63SO70SO71SO72SO73SO80SO81SO82SO83SO90ST57ST58ST59ST66ST67ST68ST69ST76ST77ST78ST79ST87ST88ST89ST98ST99SO10SO11SO20SO21SO22SO23SO30SO31SO32SO40SO41SO42SO50SO51ST18ST19ST27ST28ST29ST37ST38ST39ST47ST48ST49ST58ST59SO22SO23SO24SO25SO26SO32SO33SO34SO35SO36SO37SO41SO42SO43SO44SO45SO46SO47SO51SO52SO53SO54SO55SO56SO57SO61SO62SO63SO64SO65SO66SO73SO74SO75SO76SO56SO64SO65SO66SO67SO72SO73SO74SO75SO76SO77SO78SO82SO83SO84SO85SO86SO87SO88SO93SO94SO95SO96SO97SO98SO99SP03SP04SP05SP06SP07SP08SP13SP14SP16SP17SP18SK10SK20SK30SP04SP05SP06SP07SP08SP09SP14SP15SP16SP17SP18SP19SP22SP23SP24SP25SP26SP27SP28SP29SP33SP34SP35SP36SP37SP38SP39SP44SP45SP46SP47SP48SP49SP55SP56SP57SP58SJ63SJ70SJ71SJ72SJ73SJ74SJ75SJ80SJ81SJ82SJ83SJ84SJ85SJ86SJ90SJ91SJ92SJ93SJ94SJ95SJ96SK00SK01SK02SK03SK04SK05SK06SK10SK11SK12SK13SK14SK15SK16SK20SK21SK22SO77SO78SO79SO88SO89SO98SO99SP08SP09SP19SP29SJ20SJ21SJ22SJ23SJ30SJ31SJ32SJ33SJ34SJ40SJ41SJ42SJ43SJ50SJ51SJ52SJ53SJ54SJ60SJ61SJ62SJ63SJ64SJ70SJ71SJ72SJ73SJ74SJ80SO17SO18SO27SO28SO29SO37SO38SO39SO46SO47SO48SO49SO56SO57SO58SO59SO66SO67SO68SO69SO77SO78SO79SO88SO89SN50SN60SN61SN70SN71SN80SN81SN90SO00SO01SO10SO11SS38SS39SS48SS49SS58SS59SS68SS69SS77SS78SS79SS87SS88SS89SS96SS97SS98SS99ST06ST07ST08ST09ST16ST17ST18ST19ST26ST27ST28SN70SN71SN74SN80SN81SN82SN83SN84SN85SN86SN90SN91SN92SN93SN94SN95SN96SO00SO01SO02SO03SO04SO05SO06SO10SO11SO12SO13SO14SO21SO22SO23SO24SN86SN87SN96SN97SO04SO05SO06SO07SO08SO13SO14SO15SO16SO17SO18SO24SO25SO26SO27SO36SO37SN01SN02SN10SN11SN12SN20SN21SN22SN23SN24SN30SN31SN32SN33SN34SN40SN41SN42SN43SN44SN50SN51SN52SN53SN54SN60SN61SN62SN63SN64SN65SN71SN72SN73SN74SN75SN81SN82SN83SN84SS39SS49SS59SM50SM62SM70SM71SM72SM73SM80SM81SM82SM83SM84SM90SM91SM92SM93SM94SN00SN01SN02SN03SN04SN10SN11SN12SN13SN14SN22SN23SN24SR89SR99SS09SS19SN14SN15SN24SN25SN33SN34SN35SN36SN44SN45SN46SN54SN55SN56SN57SN58SN64SN65SN66SN67SN68SN69SN74SN75SN76SN77SN78SN79SN84SN85SN86SN87SN88SN89SH70SH71SH80SH81SH90SH91SH92SJ00SJ01SJ02SJ03SJ10SJ11SJ12SJ20SJ21SJ22SJ31SN69SN78SN79SN87SN88SN89SN97SN98SN99SO07SO08SO09SO18SO19SO28SO29SO39SH50SH51SH52SH53SH54SH60SH61SH62SH63SH64SH70SH71SH72SH73SH74SH80SH81SH82SH83SH84SH91SH92SH93SH94SH95SJ03SJ04SJ05SJ13SJ14SN59SN69SN79SH12SH13SH22SH23SH24SH32SH33SH34SH43SH44SH45SH46SH53SH54SH55SH56SH57SH64SH65SH66SH67SH74SH75SH76SH77SH78SH84SH85SH86SH87SH88SH74SH75SH76SH77SH84SH85SH86SH87SH88SH94SH95SH96SH97SH98SJ02SJ03SJ04SJ05SJ06SJ07SJ08SJ12SJ13SJ14SJ15SJ16SJ17SJ22SJ23SJ24SJ25SJ26SJ33SJ34SJ35SJ43SJ44SJ45SJ53SJ54SH97SH98SJ06SJ07SJ08SJ15SJ16SJ17SJ18SJ25SJ26SJ27SJ35SJ36SJ37SH27SH28SH29SH36SH37SH38SH39SH46SH47SH48SH49SH56SH57SH58SH59SH67SH68SK81SK82SK83SK84SK85SK86SK87SK90SK91SK92SK93SK94SK95SK96SK97TF00TF01TF02TF03TF04TF05TF06TF07TF10TF11TF12TF13TF14TF15TF16TF17TF20TF21TF22TF23TF24TF25TF30TF31TF32TF33TF34TF41TF42TF43TF44TF52SE60SE70SE71SE80SE81SE82SE90SE91SE92SK78SK79SK87SK88SK89SK97SK98SK99TA00TA01TA02TA10TA11TA12TA20TA21TA30TA31TA40TF07TF08TF09TF15TF16TF17TF18TF19TF24TF25TF26TF27TF28TF29TF33TF34TF35TF36TF37TF38TF39TF43TF44TF45TF46TF47TF48TF49TF54TF55TF56TF57TF58SK20SK21SK30SK31SK32SK40SK41SK42SK43SK50SK51SK52SK60SK61SK62SK70SK71SK72SK73SK74SK80SK81SK82SK83SK84SK90SK91SP39SP48SP49SP57SP58SP59SP68SP69SP78SP79SP89SP99TF00TF01SE60SE70SK42SK43SK44SK45SK46SK52SK53SK54SK55SK56SK57SK58SK59SK62SK63SK64SK65SK66SK67SK68SK69SK72SK73SK74SK75SK76SK77SK78SK79SK84SK85SK86SK87SK88SK89SK97SJ98SJ99SK03SK06SK07SK08SK09SK11SK12SK13SK14SK15SK16SK17SK18SK19SK21SK22SK23SK24SK25SK26SK27SK28SK31SK32SK33SK34SK35SK36SK37SK38SK42SK43SK44SK45SK46SK47SK48SK53SK56SK57SD90SE00SE10SJ18SJ19SJ27SJ28SJ29SJ35SJ36SJ37SJ38SJ39SJ44SJ45SJ46SJ47SJ48SJ54SJ55SJ56SJ57SJ58SJ63SJ64SJ65SJ66SJ67SJ68SJ69SJ74SJ75SJ76SJ77SJ78SJ79SJ85SJ86SJ87SJ88SJ89SJ96SJ97SJ98SJ99SK06SK07SK08SK09SK19SD20SD21SD22SD30SD31SD32SD40SD41SD42SD50SD51SD52SD53SD60SD61SD62SD63SD70SD71SD72SD73SD74SD80SD81SD82SD83SD84SD90SD91SD92SD93SD94SJ29SJ38SJ39SJ48SJ49SJ58SJ59SJ68SJ69SJ79SJ88SJ89SJ99SD22SD23SD32SD33SD34SD35SD36SD42SD43SD44SD45SD46SD47SD52SD53SD54SD55SD56SD57SD63SD64SD65SD66SD67SD68SD73SD78SE53SE54SE62SE63SE64SE65SE72SE73SE74SE75SE76SE82SE83SE84SE85SE86SE87SE92SE93SE94SE95SE96SE97SE98TA02TA03TA04TA05TA06TA07TA08TA12TA13TA14TA15TA16TA17TA18TA21TA22TA23TA24TA26TA27TA31TA32TA33TA41TA42NZ30NZ31NZ40NZ41NZ42NZ50NZ51NZ52NZ60NZ61NZ62NZ70NZ71NZ72NZ80NZ81NZ90NZ91SE37SE38SE39SE46SE47SE48SE49SE55SE56SE57SE58SE59SE64SE65SE66SE67SE68SE69SE75SE76SE77SE78SE79SE86SE87SE88SE89SE97SE98SE99TA08TA09TA18SD84SD90SD91SD92SD93SD94SD95SE00SE01SE02SE03SE04SE10SE11SE12SE13SE14SE20SE21SE22SE23SE30SE31SE32SE33SE40SE41SE42SE50SE51SE52SE60SE61SE62SE70SE71SE72SE81SE82SK18SK19SK28SK29SK38SK39SK47SK48SK49SK57SK58SK59SK69SD54SD55SD64SD65SD66SD67SD68SD73SD74SD75SD76SD77SD78SD84SD85SD86SD87SD88SD94SD95SD96SD97SD98SE04SE05SE06SE07SE13SE14SE15SE16SE17SE23SE24SE25SE26SE27SE32SE33SE34SE35SE36SE37SE42SE43SE44SE45SE46SE52SE53SE54SE55SE56SE62SE63SE64SE65SE72NY72NY80NY81NY82NY90NY91NY92NZ00NZ01NZ02NZ10NZ11NZ20NZ21NZ30NZ31SD68SD69SD78SD79SD88SD89SD97SD98SD99SE07SE08SE09SE17SE18SE19SE27SE28SE29SE36SE37SE38SE39SE46SE47NY73NY74NY82NY83NY84NY92NY93NY94NY95NZ01NZ02NZ03NZ04NZ05NZ11NZ12NZ13NZ14NZ15NZ16NZ20NZ21NZ22NZ23NZ24NZ25NZ26NZ30NZ31NZ32NZ33NZ34NZ35NZ36NZ41NZ42NZ43NZ44NZ45NZ46NZ52NZ53NT60NT70NT80NT90NU00NU10NU20NY58NY59NY64NY65NY66NY67NY68NY69NY74NY75NY76NY77NY78NY79NY84NY85NY86NY87NY88NY89NY94NY95NY96NY97NY98NY99NZ04NZ05NZ06NZ07NZ08NZ09NZ15NZ16NZ17NZ18NZ19NZ26NZ27NZ28NZ29NZ36NZ37NZ38NZ39NT70NT71NT73NT80NT81NT82NT83NT84NT90NT91NT92NT93NT94NT95NU00NU01NU02NU03NU04NU05NU10NU11NU12NU13NU14NU20NU21NU22NU23NZ09NZ19NY20NY21NY30NY31NY40NY41NY42NY50NY51NY52NY53NY60NY61NY62NY63NY70NY71NY72NY73NY80NY81NY82NY83SD16SD17SD18SD19SD26SD27SD28SD29SD36SD37SD38SD39SD46SD47SD48SD49SD57SD58SD59SD67SD68SD69SD78SD79SD89NX90NX91NX92NX93NY00NY01NY02NY03NY04NY05NY10NY11NY12NY13NY14NY15NY16NY20NY21NY22NY23NY24NY25NY26NY31NY32NY33NY34NY35NY36NY37NY41NY42NY43NY44NY45NY46NY47NY48NY52NY53NY54NY55NY56NY57NY58NY62NY63NY64NY65NY66NY67NY68NY73NY74NY75NY84SD08SD09SD17SD18SD19SD28SD29NX30NX40SC16SC17SC26SC27SC28SC36SC37SC38SC39SC47SC48SC49NS60NS61NS70NS71NS72NS80NS81NS90NT00NT01NT10NT11NT20NT21NT30NX69NX78NX79NX88NX89NX96NX97NX98NX99NY05NY06NY07NY08NY09NY16NY17NY18NY19NY26NY27NY28NY29NY36NY37NY38NY39NY47NY48NY49NS50NS60NX36NX37NX38NX45NX46NX47NX48NX49NX54NX55NX56NX57NX58NX59NX64NX65NX66NX67NX68NX69NX74NX75NX76NX77NX78NX79NX84NX85NX86NX87NX88NX95NX96NX97NX98NY05NY06NW95NW96NW97NX03NX04NX05NX06NX07NX13NX14NX15NX16NX17NX24NX25NX26NX27NX33NX34NX35NX36NX37NX43NX44NX45NX46NS00NS10NS14NS15NS16NS20NS21NS23NS24NS25NS26NS30NS31NS32NS33NS34NS35NS36NS40NS41NS42NS43NS44NS45NS50NS51NS52NS53NS54NS55NS60NS61NS62NS63NS64NS71NS72NS73NX07NX08NX09NX17NX18NX19NX27NX28NX29NX37NX38NX39NX48NX49NX59NS16NS17NS26NS27NS35NS36NS37NS44NS45NS46NS47NS54NS55NS56NS64NS65NS66NS53NS54NS55NS56NS57NS63NS64NS65NS66NS67NS71NS72NS73NS74NS75NS76NS77NS80NS81NS82NS83NS84NS85NS86NS87NS90NS91NS92NS93NS94NS95NS96NT00NT01NT02NT03NT04NT05NT14NT01NT02NT03NT04NT05NT11NT12NT13NT14NT15NT21NT22NT23NT24NT25NT32NT33NT34NT10NT11NT20NT21NT22NT23NT30NT31NT32NT33NT34NT41NT42NT43NT44NT53NT20NT30NT31NT40NT41NT42NT43NT44NT50NT51NT52NT53NT54NT60NT61NT62NT63NT64NT70NT71NT72NT73NT74NT81NT82NT83NY39NY47NY48NY49NY58NY59NY69NT44NT45NT46NT53NT54NT55NT56NT63NT64NT65NT66NT73NT74NT75NT76NT77NT83NT84NT85NT86NT87NT94NT95NT96NT36NT37NT45NT46NT47NT48NT55NT56NT57NT58NT65NT66NT67NT68NT76NT77NS95NS96NT05NT06NT15NT16NT17NT24NT25NT26NT27NT34NT35NT36NT37NT43NT44NT45NT46NS86NS87NS95NS96NS97NS98NT06NT07NT08NT16NT17NO00NO01NO10NO11NO20NO21NO22NO30NO31NO32NO40NO41NO42NO50NO51NO52NO60NO61NS99NT08NT09NT18NT19NT28NT29NT39NT49NT59NT69NN30NN31NN40NN41NS38NS39NS47NS48NS49NS57NS58NS59NS67NS68NS69NS77NS78NS79NS86NS87NS88NS89NS97NS98NN21NN22NN30NN31NN32NN40NN41NN42NN50NN51NN52NN60NN61NN70NN71NN80NN81NN90NN91NO00NS49NS59NS69NS79NS88NS89NS98NS99NT08NT09NN22NN23NN32NN33NN34NN35NN42NN43NN44NN45NN46NN47NN51NN52NN53NN54NN55NN56NN57NN61NN62NN63NN64NN65NN66NN67NN71NN72NN73NN74NN75NN76NN77NN81NN82NN83NN84NN85NN86NN90NN91NN92NN93NN94NN95NN96NO00NO01NO02NO03NO04NO11NO12NO13NO21NN56NN57NN66NN67NN68NN76NN77NN78NN86NN87NN88NN94NN95NN96NN97NN98NO02NO03NO04NO05NO06NO07NO08NO11NO12NO13NO14NO15NO16NO17NO21NO22NO23NO24NO25NO32NO33NO34NO15NO16NO17NO23NO24NO25NO26NO27NO28NO32NO33NO34NO35NO36NO37NO38NO42NO43NO44NO45NO46NO47NO48NO53NO54NO55NO56NO57NO58NO63NO64NO65NO66NO67NO74NO75NO76NJ60NJ70NJ80NJ90NO57NO58NO66NO67NO68NO69NO76NO77NO78NO79NO86NO87NO88NO89NO99NH90NJ00NJ10NJ11NJ20NJ21NJ30NJ31NJ32NJ40NJ41NJ42NJ50NJ51NJ52NJ60NJ61NJ62NJ70NJ71NJ72NJ80NJ81NJ82NJ90NJ91NJ92NK02NN98NN99NO07NO08NO09NO17NO18NO19NO27NO28NO29NO37NO38NO39NO48NO49NO58NO59NO68NO69NO79NO89NJ31NJ32NJ33NJ34NJ42NJ43NJ44NJ52NJ53NJ54NJ55NJ62NJ63NJ64NJ65NJ72NJ73NJ74NJ75NJ76NJ82NJ83NJ84NJ85NJ86NJ92NJ93NJ94NJ95NJ96NK02NK03NK04NK05NK06NK13NK14NK15NH90NJ00NJ01NJ10NJ11NJ12NJ13NJ14NJ21NJ22NJ23NJ24NJ25NJ32NJ33NJ34NJ35NJ36NJ42NJ43NJ44NJ45NJ46NJ54NJ55NJ56NJ64NJ65NJ66NJ74NJ75NJ76NJ86NN99NH72NH81NH82NH91NH92NH93NH94NH95NH96NJ00NJ01NJ02NJ03NJ04NJ05NJ06NJ11NJ12NJ13NJ14NJ15NJ16NJ17NJ23NJ24NJ25NJ26NJ27NJ34NJ35NJ36NJ45NH01NH02NH10NH11NH12NH13NH14NH20NH21NH22NH23NH24NH30NH31NH32NH33NH34NH40NH41NH42NH43NH44NH50NH51NH52NH53NH54NH60NH61NH62NH63NH64NH70NH71NH72NH73NH74NH75NH80NH81NH82NH83NH84NH85NH90NH91NH92NH93NH94NH95NH96NJ00NJ01NN39NN46NN47NN48NN49NN56NN57NN58NN59NN67NN68NN69NN77NN78NN79NN88NN89NN98NN99NG60NG70NG71NG72NG80NG81NG82NG90NG91NH00NH01NH10NH20NH30NM46NM47NM54NM55NM56NM57NM64NM65NM66NM67NM68NM69NM74NM75NM76NM77NM78NM79NM84NM85NM86NM87NM88NM89NM95NM96NM97NM98NM99NN05NN06NN07NN08NN09NN16NN17NN18NN19NN26NN27NN28NN29NN35NN36NN37NN38NN39NN46NN47NN48NN49NN57NN58NN59NM70NM71NM72NM73NM80NM81NM82NM83NM84NM90NM91NM92NM93NM94NM95NN00NN01NN02NN03NN04NN05NN10NN11NN12NN13NN14NN15NN16NN20NN21NN22NN23NN24NN25NN26NN30NN33NN34NN35NN36NN44NN45NN46NR79NR88NR89NR96NR97NR98NR99NS06NS07NS08NS09NS16NS17NS18NS19NS28NS29NN20NN21NN30NN31NS28NS29NS37NS38NS39NS46NS47NS48NS56NS57NR82NR83NR84NR92NR93NR94NR95NR96NR97NS01NS02NS03NS04NS05NS06NS07NS15NS16NR50NR51NR60NR61NR62NR63NR64NR65NR67NR68NR70NR71NR72NR73NR74NR75NR76NR77NR78NR79NR83NR84NR85NR86NR87NR88NR89NR95NR96NM40NM60NM61NM70NM71NR15NR16NR24NR25NR26NR27NR34NR35NR36NR37NR38NR39NR44NR45NR46NR47NR48NR49NR56NR57NR58NR59NR67NR68NR69NR79NL93NL94NM04NM05NM15NM16NM21NM22NM23NM24NM25NM26NM31NM32NM33NM34NM35NM41NM42NM43NM44NM45NM51NM52NM53NM54NM55NM61NM62NM63NM64NM72NM73NG13NG14NG15NG20NG23NG24NG25NG26NG30NG31NG32NG33NG34NG35NG36NG37NG38NG40NG41NG42NG43NG44NG45NG46NG47NG50NG51NG52NG53NG54NG55NG56NG60NG61NG62NG63NG64NG65NG66NG71NG72NG82NM19NM29NM37NM38NM39NM47NM48NM49NM59NB90NB91NC00NC01NC10NC11NC20NC21NG63NG64NG65NG72NG73NG74NG75NG76NG77NG78NG79NG82NG83NG84NG85NG86NG87NG88NG89NG91NG92NG93NG94NG95NG96NG97NG98NG99NH00NH01NH02NH03NH04NH05NH06NH07NH08NH09NH10NH11NH15NH16NH17NH18NH19NH27NH28NH29NC10NC20NC21NC30NC31NC40NH02NH03NH04NH05NH06NH07NH12NH13NH14NH15NH16NH17NH19NH23NH24NH25NH26NH27NH28NH29NH34NH35NH36NH37NH38NH39NH44NH45NH46NH47NH48NH49NH54NH55NH56NH57NH58NH59NH64NH65NH66NH67NH68NH69NH75NH76NH77NH78NH86NH87NH88NH97NH98NC22NC30NC31NC32NC33NC40NC41NC42NC43NC50NC51NC52NC60NC61NC62NC63NC70NC71NC72NC73NC74NC80NC81NC82NC83NC84NC90NC91NC92NC93ND01ND02NH49NH59NH68NH69NH78NH79NH88NH89NC01NC02NC03NC10NC11NC12NC13NC14NC15NC16NC20NC21NC22NC23NC24NC25NC26NC27NC31NC32NC33NC34NC35NC36NC37NC42NC43NC44NC45NC46NC52NC53NC54NC55NC56NC62NC63NC64NC65NC66NC73NC74NC75NC76NC83NC84NC85NC86NC93NC94NC95NC96NC92NC93NC94NC95NC96ND01ND02ND03ND04ND05ND06ND07ND12ND13ND14ND15ND16ND17ND23ND24ND25ND26ND27ND33ND34ND35ND36ND37ND47HW63HW83HX62NA00NA10NA64NA74NA81NA90NA91NA92NA93NB00NB01NB02NB03NB10NB11NB12NB13NB14NB20NB21NB22NB23NB24NB30NB31NB32NB33NB34NB35NB40NB41NB42NB43NB44NB45NB46NB52NB53NB54NB55NB56NF09NF19NF56NF58NF60NF61NF66NF67NF68NF70NF71NF72NF73NF74NF75NF76NF77NF80NF81NF82NF83NF84NF85NF86NF87NF88NF89NF95NF96NF97NF98NF99NG07NG08NG09NG18NG19NG29NG49NL57NL58NL68NL69NL79HY10HY20HY21HY22HY23HY30HY31HY32HY33HY34HY35HY40HY41HY42HY43HY44HY45HY50HY51HY52HY53HY54HY55HY60HY61HY62HY63HY64HY73HY74HY75ND19ND28ND29ND38ND39ND47ND48ND49ND59HP40HP50HP51HP60HP61HT93HT94HU14HU15HU16HU24HU25HU26HU27HU28HU30HU31HU32HU33HU34HU35HU36HU37HU38HU39HU40HU41HU42HU43HU44HU45HU46HU47HU48HU49HU53HU54HU55HU56HU57HU58HU59HU66HU67HU68HU69HZ16HZ17HZ26HZ27';
  /**
   * 
   * @param {number} precision metres
   * @returns {String}
   */

  GridCoordsGB.prototype.to_gridref = function (precision) {
    var hundredkmE = this.x / 100000 | 0; // Math.floor(this.x / 100000);

    var hundredkmN = this.y / 100000 | 0; // Math.floor(this.y / 100000);

    var firstLetter = '';

    if (hundredkmN < 5) {
      firstLetter = hundredkmE < 5 ? 'S' : 'T';
    } else if (hundredkmN < 10) {
      firstLetter = hundredkmE < 5 ? 'N' : 'O';
    } else {
      firstLetter = hundredkmE < 5 ? 'H' : 'J';
    }

    var index = 65 + (4 - hundredkmN % 5) * 5 + hundredkmE % 5;

    if (index >= 73) {
      index++;
    }

    var secondLetter = String.fromCharCode(index);
    return _e_n_to_gr(firstLetter + secondLetter, this.x - 100000 * hundredkmE, this.y - 100000 * hundredkmN, precision ? precision : 1);
  };
  /**
   * 
   * @return {string} hectad
   */


  GridCoordsGB.prototype.to_hectad = function () {
    var hundredkmE = this.x / 100000 | 0; // Math.floor(easting / 100000);

    var hundredkmN = this.y / 100000 | 0; // Math.floor(northing / 100000);

    var firstLetter = "";

    if (hundredkmN < 5) {
      firstLetter = hundredkmE < 5 ? 'S' : 'T';
    } else if (hundredkmN < 10) {
      firstLetter = hundredkmE < 5 ? 'N' : 'O';
    } else {
      firstLetter = hundredkmE < 5 ? 'H' : 'J';
    }

    var index = 65 + (4 - hundredkmN % 5) * 5 + hundredkmE % 5;

    if (index >= 73) {
      index++;
    }

    return firstLetter + String.fromCharCode(index) + ( // secondLetter
    (this.x - 100000 * hundredkmE) / 10000 | 0) + ((this.y - 100000 * hundredkmN) / 10000 | 0);
  };
  /**
   * 
   * @returns {Boolean}
   */


  GridCoordsGB.prototype.is_gb_hectad = function () {
    return GridCoordsGB.gbHectads.indexOf(this.to_hectad()) !== -1;
  };
  /**
   * convert easting,northing to a WGS84 lat lng
   * 
   * @returns {LatLngWGS84}
   */


  GridCoordsGB.prototype.to_latLng = function () {
    //airy1830 = RefEll::airy1830(); //new RefEll(6377563.396, 6356256.909);
    //var OSGB_F0  = 0.9996012717;
    //var N0       = -100000.0;
    var E0 = 400000.0;
    var phi0 = 0.85521133347722; //deg2rad(49.0);

    var lambda0 = -0.034906585039887; //deg2rad(-2.0);

    var a = 6377563.396; // airy1830->maj;
    //var b        = 6356256.909; // airy1830->min;

    var eSquared = 0.00667054007; // ((maj * maj) - (min * min)) / (maj * maj); // airy1830->ecc;
    //var phi      = 0.0;
    //var lambda   = 0.0;

    var E = this.x;
    var N = this.y;
    var n = 0.0016732203289875; //(a - b) / (a + b);

    var M;
    var phiPrime = (N + 100000) / (a * 0.9996012717) + phi0; // 15 / 8 === 1.875
    // 5 / 4 === 1.25
    // 21 / 8 === 2.625

    do {
      M = N + 100000 - 6353722.489 // (b * OSGB_F0)
      * (1.0016767257674 // * (((1 + n + (1.25 * n * n) + (1.25 * n * n * n))
      * (phiPrime - phi0) - 0.00502807228247412 // - (((3 * n) + (3 * n * n) + (2.625 * n * n * n))
      * Math.sin(phiPrime - phi0) * Math.cos(phiPrime + phi0) + (1.875 * n * n + 1.875 * n * n * n) * Math.sin(2.0 * (phiPrime - phi0)) * Math.cos(2.0 * (phiPrime + phi0)) - 35.0 / 24.0 * n * n * n * Math.sin(3.0 * (phiPrime - phi0)) * Math.cos(3.0 * (phiPrime + phi0)));
      phiPrime += M / 6375020.48098897; // (N - N0 - M) / (a * OSGB_F0);
    } while (M >= 0.001);

    var sinphiPrime2 = Math.sin(phiPrime) * Math.sin(phiPrime);
    var tanphiPrime2 = Math.tan(phiPrime) * Math.tan(phiPrime);
    var secphiPrime = 1.0 / Math.cos(phiPrime);
    var v = a * 0.9996012717 * Math.pow(1.0 - eSquared * sinphiPrime2, -0.5);
    var rho = a * 0.9996012717 * (1.0 - eSquared) * Math.pow(1.0 - eSquared * sinphiPrime2, -1.5);
    var etaSquared = v / rho - 1.0;
    var VII = Math.tan(phiPrime) / (2 * rho * v);
    var VIII = Math.tan(phiPrime) / (24.0 * rho * Math.pow(v, 3.0)) * (5.0 + 3.0 * tanphiPrime2 + etaSquared - 9.0 * tanphiPrime2 * etaSquared);
    var IX = Math.tan(phiPrime) / (720.0 * rho * Math.pow(v, 5.0)) * (61.0 + 90.0 * tanphiPrime2 + 45.0 * tanphiPrime2 * tanphiPrime2);
    var X = secphiPrime / v;
    var XI = secphiPrime / (6.0 * v * v * v) * (v / rho + 2 * tanphiPrime2);
    var XII = secphiPrime / (120.0 * Math.pow(v, 5.0)) * (5.0 + 28.0 * tanphiPrime2 + 24.0 * tanphiPrime2 * tanphiPrime2);
    var XIIA = secphiPrime / (5040.0 * Math.pow(v, 7.0)) * (61.0 + 662.0 * tanphiPrime2 + 1320.0 * tanphiPrime2 * tanphiPrime2 + 720.0 * tanphiPrime2 * tanphiPrime2 * tanphiPrime2);
    var phi = phiPrime - VII * Math.pow(E - E0, 2.0) + VIII * Math.pow(E - E0, 4.0) - IX * Math.pow(E - E0, 6.0);
    var lambda = lambda0 + X * (E - E0) - XI * Math.pow(E - E0, 3.0) + XII * Math.pow(E - E0, 5.0) - XIIA * Math.pow(E - E0, 7.0);
    return new LatLngGB(rad2deg * phi, rad2deg * lambda).to_WGS84();
  }; //return GridCoordsGB;
  //})();

  var GridRefGB =
  /*@__PURE__*/
  function () {
    /**
     * @constructor
     */
    var GridRefGB = function GridRefGB() {};

    GridRefGB.prototype = new GridRef();
    GridRefGB.prototype.constructor = GridRefGB;
    GridRefGB.prototype.country = 'GB';
    GridRefGB.prototype.GridCoords = GridCoordsGB;
    /**
     * gridref known to have correct syntax
     * may have tetrad or quadrant suffix
     * 
     * @param {string} rawGridRef
     * @throws Error
     */

    GridRefGB.prototype.parse_well_formed = function (rawGridRef) {
      if (rawGridRef.length >= 5 && /^[A-Z]/.test(rawGridRef.charAt(4))) {
        // tetrad or quadrant
        if (GridRef.quadrantOffsets.hasOwnProperty(rawGridRef.substr(rawGridRef.length - 2))) {
          this.quadrantCode = rawGridRef.substr(rawGridRef.length - 2);
        } else {
          this.tetradLetter = rawGridRef.charAt(4);
        }

        rawGridRef = rawGridRef.substr(0, 4);
      } //this sets easting/northing, length and hectad


      this.parse_wellformed_gb_gr_string_no_tetrads(rawGridRef);

      if (this.tetradLetter || this.quadrantCode) {
        // tetrad or quadrant suffix
        if (this.tetradLetter) {
          this.preciseGridRef = this.tetrad = this.hectad + this.tetradLetter;
          this.length = 2000; // 2km square

          this.gridCoords.x += GridRef.tetradOffsets[this.tetradLetter][0];
          this.gridCoords.y += GridRef.tetradOffsets[this.tetradLetter][1];
        } else {
          // quadrant
          this.preciseGridRef = this.quadrant = rawGridRef + this.quadrantCode;
          this.length = 5000; // 5km square

          this.gridCoords.x += GridRef.quadrantOffsets[this.quadrantCode][0];
          this.gridCoords.y += GridRef.quadrantOffsets[this.quadrantCode][1];
        }
      } else {
        this.preciseGridRef = rawGridRef;

        if (this.length <= 1000) {
          // calculate tetrad for precise gridref
          this.set_tetrad();
        }
      }
    };
    /**
     * 
     * @param {string} rawGridRef
     * @throws Error
     */


    GridRefGB.prototype.from_string = function (rawGridRef) {
      // grid ref may not be in canonical format
      var trimmedLocality = rawGridRef.replace(/[\[\]\s\t\.-]+/g, '').toUpperCase();
      var tetradCode = '';
      var ref;

      if (/[ABCDEFGHIJKLMNPQRSTUVWXYZ]$/.test(trimmedLocality)) {
        // tetrad or quadrant
        if (GridRef.quadrantOffsets.hasOwnProperty(trimmedLocality.substr(trimmedLocality.length - 2))) {
          this.quadrantCode = trimmedLocality.substr(trimmedLocality.length - 2);
          trimmedLocality = trimmedLocality.substr(0, trimmedLocality.length - 2);
        } else {
          tetradCode = trimmedLocality.substr(trimmedLocality.length - 1);
          trimmedLocality = trimmedLocality.substr(0, trimmedLocality.length - 1);
        }
      } // if all numeric gridref, e.g. 38517462 then
      // split with '/', i.e. 38/517462


      if (trimmedLocality === parseInt(trimmedLocality, 10).toString()) {
        trimmedLocality = trimmedLocality.substr(0, 2) + '/' + trimmedLocality.substr(2);
      } else if (trimmedLocality.length > 3 && trimmedLocality.charAt(2) === '/' && /^[A-Z]{2}$/.test(trimmedLocality.substr(0, 2))) {
        // preprocess refs of form SD/59 to SD59
        // but at this stage want to retain old-style nn/nnnn gridrefs
        trimmedLocality = trimmedLocality.replace('/', '');
      }

      if (trimmedLocality.substr(0, 2) === 'VC') {
        // special case error, VC number entered in the wrong field
        this.error = true;
        this.errorMessage = "Misplaced vice-county code in grid-reference field. ('" + trimmedLocality + "')";
        this.gridCoords = null;
        this.length = 0;
      } else if ((ref = trimmedLocality.match(/^([A-Z]{2}(?:\d\d){1,5})$/)) !== null) {
        trimmedLocality = ref[0]; //grid reference

        this.parse_wellformed_gb_gr_string_no_tetrads(trimmedLocality);

        if (this.length > 0) {
          if (this.length === 10000 && (tetradCode || this.quadrantCode)) {
            // tetrad or quadrant suffix
            if (tetradCode) {
              this.preciseGridRef = trimmedLocality + tetradCode;
              this.tetradLetter = tetradCode;
              this.tetrad = this.hectad + tetradCode;
              this.length = 2000; // 2km square

              this.gridCoords.x += GridRef.tetradOffsets[tetradCode][0];
              this.gridCoords.y += GridRef.tetradOffsets[tetradCode][1];
            } else {
              // quadrant
              this.preciseGridRef = trimmedLocality + this.quadrantCode;
              this.tetradLetter = '';
              this.tetrad = '';
              this.quadrant = this.preciseGridRef;
              this.length = 5000; // 5km square

              this.gridCoords.x += GridRef.quadrantOffsets[this.quadrantCode][0];
              this.gridCoords.y += GridRef.quadrantOffsets[this.quadrantCode][1];
            }
          } else {
            this.preciseGridRef = trimmedLocality;

            if (this.length <= 1000) {
              // calculate tetrad for precise gridref
              this.set_tetrad();
            }
          }
        } else {
          this.error = true;
          this.errorMessage = 'GB grid reference format not understood (strange length).';
        }
      } else if (/^([\d]{2})\/((?:\d\d){1,5})$/.test(trimmedLocality)) {
        // matching old-style nn/nnnn gridrefs
        // where second-part must have even-number of digits
        this.parse_gr_string_without_tetrads(trimmedLocality);

        switch (this.length) {
          case 10000:
            trimmedLocality = this.gridCoords.to_gridref(10000);
            this.hectad = trimmedLocality;

            if (tetradCode) {
              trimmedLocality += tetradCode;
              this.tetradLetter = tetradCode;
              this.tetrad = this.hectad + tetradCode;
              this.length = 2000; // 2km square

              this.gridCoords.x += GridRef.tetradOffsets[tetradCode][0];
              this.gridCoords.y += GridRef.tetradOffsets[tetradCode][1];
            } else if (this.quadrantCode) {
              trimmedLocality += this.quadrantCode;
              this.quadrant = trimmedLocality;
              this.length = 5000; // 5km square

              this.gridCoords.x += GridRef.quadrantOffsets[this.quadrantCode][0];
              this.gridCoords.y += GridRef.quadrantOffsets[this.quadrantCode][1];
            }

            break;

          case 1000:
          case 100:
          case 10:
          case 1:
            trimmedLocality = this.gridCoords.to_gridref(this.length);
            this.hectad = this.gridCoords.to_gridref(10000);
            this.set_tetrad();
            break;

          default:
            this.error = true;
            this.errorMessage = 'Bad grid square dimension (' + this.length + ' m).';
            this.gridCoords = null;
            this.length = 0;
        }

        this.preciseGridRef = trimmedLocality;
      } else {
        // no match
        this.gridCoords = null;
        this.length = 0;
        this.error = true;
        this.errorMessage = "Grid reference format not understood. ('" + rawGridRef + "')";
      }
    };
    /**
     * sets easting, northing and length (in km)
     * source grid-reference need not be well-formed
     * 
     * @param {string} gridRef either nn/nn... or aann...
     */


    GridRefGB.prototype.parse_gr_string_without_tetrads = function (gridRef) {
      var matches, x, y, ref;

      if ((matches = gridRef.match(/^(\d{2})\/((?:\d\d){1,5})$/)) !== null) {
        // old style numerical sheet ref XY/nnnnnn
        // nnnn part must have even length
        // northern scottish islands have eccentric numbering
        switch (matches[1]) {
          case '57':
            x = 300000;
            y = 1000000;
            break;

          case '67':
            x = 400000;
            y = 1000000;
            break;

          case '58':
            x = 300000;
            y = 1100000;
            break;

          case '68':
            x = 400000;
            y = 1100000;
            break;

          case '69':
            x = 400000;
            y = 1200000;
            break;

          default:
            x = gridRef.charAt(0) * 100000;
            y = gridRef.charAt(1) * 100000;
        }

        ref = matches[2];
      } else {
        // modern alphabetical sheet ref
        if (!GridRef.letterMapping.hasOwnProperty(gridRef.charAt(0)) || !GridRef.letterMapping.hasOwnProperty(gridRef.charAt(1))) {
          // invalid
          this.length = 0;
          this.gridCoords = null;
          return;
        }

        var char1 = GridRef.letterMapping[gridRef.charAt(0)];
        var char2 = GridRef.letterMapping[gridRef.charAt(1)];
        ref = gridRef.substr(2);
        x = char1 % 5 * 500000 + char2 % 5 * 100000 - 1000000;
        y = -Math.floor(char1 / 5) * 500000 - Math.floor(char2 / 5) * 100000 + 1900000;
      }

      switch (ref.length) {
        case 2:
          this.gridCoords = new GridCoordsGB(x + ref.charAt(0) * 10000, // use first digit of ref
          y + ref.charAt(1) * 10000 // use second digit of ref
          );
          this.length = 10000; //10 km square

          break;

        case 4:
          this.gridCoords = new GridCoordsGB(x + Math.floor(ref / 100) * 1000, y + ref % 100 * 1000);
          this.length = 1000; //1 km square

          break;

        case 6:
          this.gridCoords = new GridCoordsGB(x + Math.floor(ref / 1000) * 100, y + ref % 1000 * 100);
          this.length = 100; //100m square

          break;

        case 8:
          this.gridCoords = new GridCoordsGB(x + Math.floor(ref / 10000) * 10, y + ref % 10000 * 10);
          this.length = 10; //10m square

          break;

        case 10:
          this.gridCoords = new GridCoordsGB(x + Math.floor(ref / 100000), y + ref % 100000);
          this.length = 1; //1m square

          break;

        default:
          Logger('Bad grid ref length, ref=' + gridRef);
          this.gridCoords = null;
          this.length = 0;
      }
    };
    /**
     * gridRef must be a correctly formed OS GB gridref
     * 
     * sets self::gridCoords
     * sets self::length
     * sets self::hectad
     * 
     * @param {string} gridRef modern alpha-numeric format with no suffixes
     * @throws Error
     */


    GridRefGB.prototype.parse_wellformed_gb_gr_string_no_tetrads = function (gridRef) {
      var char1, char2, ref, x, y; // modern alphabetical sheet refs only

      char1 = GridRef.letterMapping[gridRef.charAt(0)];
      char2 = GridRef.letterMapping[gridRef.charAt(1)];
      ref = gridRef.substr(2);
      x = char1 % 5 * 500000 + char2 % 5 * 100000 - 1000000;
      y = -Math.floor(char1 / 5) * 500000 - Math.floor(char2 / 5) * 100000 + 1900000;

      switch (ref.length) {
        case 2:
          this.gridCoords = new GridCoordsGB(x + ref.charAt(0) * 10000, // use first digit of ref 
          y + ref.charAt(1) * 10000 // use second digit of ref
          );
          this.length = 10000; //10 km square

          this.hectad = gridRef;
          break;

        case 4:
          this.gridCoords = new GridCoordsGB(x + Math.floor(ref / 100) * 1000, y + ref % 100 * 1000);
          this.length = 1000; //1 km square

          this.hectad = gridRef.substr(0, 3) + gridRef.substr(4, 1);
          break;

        case 6:
          this.gridCoords = new GridCoordsGB(x + Math.floor(ref / 1000) * 100, y + ref % 1000 * 100);
          this.length = 100; //100m square

          this.hectad = gridRef.substr(0, 3) + gridRef.substr(5, 1);
          break;

        case 8:
          this.gridCoords = new GridCoordsGB(x + Math.floor(ref / 10000) * 10, y + ref % 10000 * 10);
          this.length = 10; //10m square

          this.hectad = gridRef.substr(0, 3) + gridRef.substr(6, 1);
          break;

        case 10:
          this.gridCoords = new GridCoordsGB(x + Math.floor(ref / 100000), y + ref % 100000);
          this.length = 1; //1m square

          this.hectad = gridRef.substr(0, 3) + gridRef.substr(7, 1);
          break;

        default:
          this.gridCoords = null;
          throw new Error("Bad grid ref length when parsing supposedly well-formed ref, ref='" + gridRef + "'");
      }
    };

    return GridRefGB;
  }();

  var GridCoordsIE =
  /*@__PURE__*/
  function () {
    /**
     *
     * @param {number} easting metres
     * @param {number} northing metres
     * @constructor
     * @returns {GridCoordsIE}
     */
    var GridCoordsIE = function GridCoordsIE(easting, northing) {
      this.x = easting;
      this.y = northing;
    };

    GridCoordsIE.prototype = new GridCoords();
    GridCoordsIE.prototype.constructor = GridCoordsIE;
    GridCoordsIE.prototype.country = 'IE';
    GridCoordsIE.irishGrid = {
      0: ['V', 'Q', 'L', 'F', 'A'],
      1: ['W', 'R', 'M', 'G', 'B'],
      2: ['X', 'S', 'N', 'H', 'C'],
      3: ['Y', 'T', 'O', 'J', 'D']
    };
    /**
     * convert easting,northing to a WGS84 lat lng
     * 
     * @returns {LatLngWGS84}
     */

    GridCoordsIE.prototype.to_latLng = function () {
      //converts OSI coords to lat/long.
      // modified from OSGBtoLL, Equations from USGS Bulletin 1532
      //East Longitudes are positive, West longitudes are negative.
      //North latitudes are positive, South latitudes are negative
      //Lat and Long are in decimal degrees.
      //Written by Chuck Gantz- chuck.gantz@globalstar.com
      // php transliteration by TH
      //OSIENorthing = this.y;
      //OSIEEasting = this.x;
      //constants
      //PI = 3.14159265;
      //FOURTHPI = M_PI / 4.0;
      //DEG2RAD = M_PI / 180.0;
      //RAD2DEG = 180.0 / M_PI;
      // ////////////////
      var k0 = 1.000035; // scale factor
      //double a;
      //double eccPrimeSquared;
      //double N1, T1, C1, R1, D, M;

      var LongOrigin = -8.0; //LatOrigin = 53.5;
      //LatOriginRad = LatOrigin * DEG2RAD;
      //UK
      //majoraxis=6377563.396; //Airy
      //a=6377563.396;
      //minoraxis = 6356256.91; //Airy
      //IE
      //majoraxis = 6377340.189; //Airy

      var a = 6377340.189; //minoraxis = 6356034.447; //Airy
      //eccSquared = (majoraxis * majoraxis - minoraxis * minoraxis) / (majoraxis * majoraxis);

      var eccSquared = 0.0066705402933363; //e1 = (1-Math.sqrt(1-eccSquared))/(1+Math.sqrt(1-eccSquared));

      var e1 = 0.0016732203841521; //error_log("eccSquared={eccSquared} e1={e1}");
      //only calculate M0 once since it is based on the origin of the OSGB projection, which is fixed
      //M0 = a*((1	- eccSquared/4		- 3*eccSquared*eccSquared/64	- 5*eccSquared*eccSquared*eccSquared/256)*LatOriginRad
      //	- (3*eccSquared/8	+ 3*eccSquared*eccSquared/32	+ 45*eccSquared*eccSquared*eccSquared/1024)*Math.sin(2*LatOriginRad)
      //	+ (15*eccSquared*eccSquared/256 + 45*eccSquared*eccSquared*eccSquared/1024)*Math.sin(4*LatOriginRad)
      //	- (35*eccSquared*eccSquared*eccSquared/3072)*Math.sin(6*LatOriginRad));
      //error_log("M0 = {M0}");

      var M0 = 5929615.3530033; //OSGBSquareToRefCoords(OSGBZone, RefEasting, RefNorthing); // Assume supplied MapInfo northing and easting take this into account

      var x = this.x - 200000.0; //remove 400,000 meter false easting for longitude

      var y = this.y - 250000.0; //remove 100,000 meter false easting for longitude
      //eccPrimeSquared = (eccSquared)/(1.0-eccSquared);

      var eccPrimeSquared = 0.0067153352074207; //error_log("eccPrimeSquared={eccPrimeSquared}");

      var M = M0 + y / k0;
      var mu = M / (a * (1 - eccSquared / 4 - 3 * eccSquared * eccSquared / 64 - 5 * eccSquared * eccSquared * eccSquared / 256));
      var phi1Rad = mu + (3 * e1 / 2 - 27 * e1 * e1 * e1 / 32) * Math.sin(2 * mu) + (21 * e1 * e1 / 16 - 55 * e1 * e1 * e1 * e1 / 32) * Math.sin(4 * mu) + 151 * e1 * e1 * e1 / 96 * Math.sin(6 * mu); //phi1 = phi1Rad*RAD2DEG;

      var N1 = a / Math.sqrt(1 - eccSquared * Math.sin(phi1Rad) * Math.sin(phi1Rad));
      var T1 = Math.tan(phi1Rad) * Math.tan(phi1Rad);
      var C1 = eccPrimeSquared * Math.cos(phi1Rad) * Math.cos(phi1Rad);
      var R1 = a * (1 - eccSquared) / Math.pow(1 - eccSquared * Math.sin(phi1Rad) * Math.sin(phi1Rad), 1.5);
      var D = x / (N1 * k0);
      var Lat = phi1Rad - N1 * Math.tan(phi1Rad) / R1 * (D * D / 2 - (5 + 3 * T1 + 10 * C1 - 4 * C1 * C1 - 9 * eccPrimeSquared) * D * D * D * D / 24 + (61 + 90 * T1 + 298 * C1 + 45 * T1 * T1 - 252 * eccPrimeSquared - 3 * C1 * C1) * D * D * D * D * D * D / 720);
      Lat = Lat * rad2deg;
      var Long = (D - (1 + 2 * T1 + C1) * D * D * D / 6 + (5 - 2 * C1 + 28 * T1 - 3 * C1 * C1 + 8 * eccPrimeSquared + 24 * T1 * T1) * D * D * D * D * D / 120) / Math.cos(phi1Rad);
      Long = LongOrigin + Long * rad2deg; //return new LatLng(Lat, Long);
      //var ll = new LatLngIE(Lat, Long); // Irish projection (modified Airy)
      //ll.IE_to_WGS84(); // google earth uses WGS84
      //return ll;

      return new LatLngIE(Lat, Long).to_WGS84();
    };
    /**
     * 
     * @param {number} precision metres
     * @returns {String}
     */


    GridCoordsIE.prototype.to_gridref = function (precision) {
      var hundredkmE = Math.floor(this.x / 100000),
          hundredkmN = Math.floor(this.y / 100000);

      if (GridCoordsIE.irishGrid[hundredkmE] && GridCoordsIE.irishGrid[hundredkmE][hundredkmN]) {
        return _e_n_to_gr(GridCoordsIE.irishGrid[hundredkmE][hundredkmN], this.x - 100000 * hundredkmE, this.y - 100000 * hundredkmN, precision ? precision : 1);
      } else {
        return null;
      }
    };
    /**
     * 
     * @return {string} hectad
     */


    GridCoordsIE.prototype.to_hectad = function () {
      var hundredkmE = Math.floor(this.x / 100000),
          hundredkmN = Math.floor(this.y / 100000);

      if (GridCoordsIE.irishGrid[hundredkmE] && GridCoordsIE.irishGrid[hundredkmE][hundredkmN]) {
        return GridCoordsIE.irishGrid[hundredkmE][hundredkmN] + Math.floor(this.x % 100000 / 10000) + Math.floor(this.y % 100000 / 10000);
      } else {
        return '';
      }
    };

    return GridCoordsIE;
  }();

  var GridRefIE =
  /*@__PURE__*/
  function () {
    /**
     * @constructor
     */
    var GridRefIE = function GridRefIE() {};

    GridRefIE.prototype = new GridRef();
    GridRefIE.prototype.constructor = GridRefIE;
    GridRefIE.prototype.country = 'IE';
    GridRefIE.prototype.GridCoords = GridCoordsIE;
    GridRefIE.gridLetter = {
      A: [0, 4],
      B: [1, 4],
      C: [2, 4],
      D: [3, 4],
      F: [0, 3],
      G: [1, 3],
      H: [2, 3],
      J: [3, 3],
      L: [0, 2],
      M: [1, 2],
      N: [2, 2],
      O: [3, 2],
      Q: [0, 1],
      R: [1, 1],
      S: [2, 1],
      T: [3, 1],
      V: [0, 0],
      W: [1, 0],
      X: [2, 0],
      Y: [3, 0]
    };
    /**
     *
     * @param {string} rawGridRef
     * @throws Error
     */

    GridRefIE.prototype.from_string = function (rawGridRef) {
      var trimmedLocality = rawGridRef.replace(/[\[\]\s\t\.-]+/g, '').toUpperCase();

      if (/[ABCDEFGHIJKLMNPQRSTUVWXYZ]$/.test(trimmedLocality)) {
        // tetrad or quadrant
        if (GridRefIE.quadrantOffsets.hasOwnProperty(trimmedLocality.substr(trimmedLocality.length - 2))) {
          this.quadrantCode = trimmedLocality.substr(trimmedLocality.length - 2);
          trimmedLocality = trimmedLocality.substr(0, trimmedLocality.length - 2);
        } else {
          this.tetradLetter = trimmedLocality.substr(trimmedLocality.length - 1);
          trimmedLocality = trimmedLocality.substr(0, trimmedLocality.length - 1);
        }
      }

      this.parse_gr_string_without_tetrads(trimmedLocality);

      if (this.length > 0) {
        if (this.tetradLetter || this.quadrantCode) {
          // tetrad or quadrant suffix
          if (this.tetradLetter) {
            this.preciseGridRef = this.hectad + this.tetradLetter;
            this.tetrad = this.preciseGridRef;
            this.length = 2000; // 2km square

            this.gridCoords.x += GridRefIE.tetradOffsets[this.tetradLetter][0];
            this.gridCoords.y += GridRefIE.tetradOffsets[this.tetradLetter][1];
          } else {
            // quadrant
            this.preciseGridRef = this.hectad + this.quadrantCode;
            this.quadrant = this.preciseGridRef;
            this.length = 5000; // 5km square

            this.gridCoords.x += GridRefIE.quadrantOffsets[this.quadrantCode][0];
            this.gridCoords.y += GridRefIE.quadrantOffsets[this.quadrantCode][1];
          }
        } else {
          this.preciseGridRef = trimmedLocality;

          if (this.length <= 1000) {
            // calculate tetrad for precise gridref
            this.set_tetrad();
          }
        }
      } else {
        this.error = true;
        this.errorMessage = "Irish grid reference format not understood. ('" + rawGridRef + "')";
      }
    };

    GridRefIE.prototype.parse_well_formed = GridRefIE.prototype.from_string;
    GridRefIE._IE_GRID_LETTERS = 'VQLFAWRMGBXSNHCYTOJD';
    /**
     *
     * @param {string} gridRef nn/nnnn or [A-Z]nnnn or [A-Z]/nnnn (no other punctuation by this point), all upper-case
     * @return boolean
     */

    GridRefIE.prototype.parse_gr_string_without_tetrads = function (gridRef) {
      var x, y, ref, _char;

      if (/^\d{2}\/(?:\d\d){1,5}$/.test(gridRef)) {
        // nn/nnnn etc.
        // regex used to avoid matching oddly malformed refs, such as "32/SO763520"
        x = parseInt(gridRef.charAt(0), 10);
        y = parseInt(gridRef.charAt(1), 10);

        if (x > 3 || y > 4) {
          Logger("bad grid square, ref='" + gridRef + "' (Ireland)");
          this.length = 0;
          return false;
        }

        ref = gridRef.substr(3);
        _char = GridRefIE._IE_GRID_LETTERS.charAt(x * 5 + y);
        x *= 100000;
        y *= 100000;
      } else {
        // [A-Z]nnnn or [A-Z]/nnnn etc.
        gridRef = gridRef.replace('/', '');

        if (!/^[ABCDFGHJLMNOQRSTVWXY](?:\d\d){1,5}$/.test(gridRef)) {
          this.length = 0; // mark error state

          this.gridCoords = null;
          return false;
        }

        if (gridRef) {
          _char = gridRef.charAt(0);

          var p = GridRefIE._IE_GRID_LETTERS.indexOf(_char);

          if (p !== -1) {
            x = Math.floor(p / 5) * 100000;
            y = p % 5 * 100000;
          } else {
            Logger("Bad grid ref grid-letter, ref='" + gridRef + "' (Ireland)");
            this.length = 0; // mark error

            this.gridCoords = null;
            return false;
          }
        } else {
          Logger('Bad (empty) Irish grid ref');
          this.length = 0; // mark error

          this.gridCoords = null;
          return false;
        }

        ref = gridRef.substr(1);
      }

      switch (ref.length) {
        case 2:
          this.gridCoords = new GridCoordsIE(x + ref.charAt(0) * 10000, y + ref.charAt(1) * 10000);
          this.length = 10000; //10 km square

          this.hectad = _char + ref;
          break;

        case 4:
          this.gridCoords = new GridCoordsIE(x + Math.floor(ref / 100) * 1000, y + ref % 100 * 1000);
          this.length = 1000; //1 km square

          this.hectad = _char + ref.charAt(0) + ref.charAt(2);
          break;

        case 6:
          this.gridCoords = new GridCoordsIE(x + Math.floor(ref / 1000) * 100, y + ref % 1000 * 100);
          this.length = 100; // 100m square

          this.hectad = _char + ref.charAt(0) + ref.charAt(3);
          break;

        case 8:
          this.gridCoords = new GridCoordsIE(x + Math.floor(ref / 10000) * 10, y + ref % 10000 * 10);
          this.length = 10; //10m square

          this.hectad = _char + ref.charAt(0) + ref.charAt(4);
          break;

        case 10:
          this.gridCoords = new GridCoordsIE(x + Math.floor(ref / 100000), y + ref % 100000);
          this.length = 1; //1m square

          this.hectad = _char + ref.charAt(0) + ref.charAt(5);
          break;

        default:
          Logger("Bad grid ref length, ref='" + gridRef + "' (Ireland)");
          this.length = 0;
          this.gridCoords = null;
          return false;
      }

      return true;
    };

    return GridRefIE;
  }();

  /**
   * returns a GridRef (GB, IE or CI-specific parser) or false
   * crudely tries to determine the country by trying each country in turn
   * 
   * @param {string} rawGridRef
   * @return {(GridRef|boolean)}
   */

  GridRef.from_string = function (rawGridRef) {
    var parser;
    var cleanRef = rawGridRef.replace(/\s+/g, '').toUpperCase();

    if (!cleanRef) {
      return false;
    } // if canonical ref form then be more efficient


    if (/^[A-Z]{1,2}\d{2}(?:[A-Z]|[NS][EW]|(?:\d{2}){0,4})?$/.test(cleanRef)) {
      // have simple well-formed grid ref
      if (/^.\d/.test(cleanRef)) {
        parser = new GridRef.GridRefIE();
      } else {
        if (cleanRef.charAt(0) === 'W') {
          parser = new GridRefCI();
        } else {
          parser = new GridRefGB();
        }
      }

      parser.parse_well_formed(cleanRef);
      return parser.length && !parser.error ? parser : false;
    } else {
      parser = new GridRefGB();
      parser.from_string(cleanRef);

      if (parser.length && !parser.error) {
        return parser;
      }

      if (cleanRef.charAt(0) === 'W') {
        parser = new GridRefCI();
        parser.from_string(cleanRef);

        if (parser.length && !parser.error) {
          return parser;
        }
      } else {
        parser = new GridRefIE();
        parser.from_string(cleanRef);

        if (parser.length && !parser.error) {
          return parser;
        }
      }
    }

    return false;
  };

  //import {GridCoords as gridCoords} from '../GridCoords/GridCoords';

  var GridCoordsGB$1 = function () {
    return GridCoordsGB;
  }();
  (function () {
    /**
     * converts lat and lon (OSGB36) to OS northings and eastings
     *
     * @returns {GridCoordsGB}
     */
    LatLngGB.prototype.to_os_coords = function () {
      var phi = this.lat * deg2rad; // convert latitude to radians

      var lam = this.lng * deg2rad; // convert longitude to radians

      var a = 6377563.396; // OSGB semi-major axis

      var b = 6356256.91; // OSGB semi-minor axis

      var e0 = 400000; // easting of false origin

      var n0 = -100000; // northing of false origin

      var f0 = 0.9996012717; // OSGB scale factor on central meridian

      var e2 = 0.0066705397616; // OSGB eccentricity squared

      var lam0 = -0.034906585039886591; // OSGB false east

      var phi0 = 0.85521133347722145; // OSGB false north

      var af0 = a * f0;
      var bf0 = b * f0; // easting

      var slat2 = Math.sin(phi) * Math.sin(phi);
      var nu = af0 / Math.sqrt(1 - e2 * slat2);
      var rho = nu * (1 - e2) / (1 - e2 * slat2);
      var eta2 = nu / rho - 1;
      var p = lam - lam0;
      var IV = nu * Math.cos(phi);
      var clat3 = Math.pow(Math.cos(phi), 3);
      var tlat2 = Math.tan(phi) * Math.tan(phi);
      var V = nu / 6 * clat3 * (nu / rho - tlat2);
      var clat5 = Math.pow(Math.cos(phi), 5);
      var tlat4 = Math.pow(Math.tan(phi), 4);
      var VI = nu / 120 * clat5 * (5 - 18 * tlat2 + tlat4 + 14 * eta2 - 58 * tlat2 * eta2);
      var east = e0 + p * IV + Math.pow(p, 3) * V + Math.pow(p, 5) * VI; // northing

      var n = (af0 - bf0) / (af0 + bf0);

      var M = LatLng._Marc(bf0, n, phi0, phi);

      var I = M + n0;
      var II = nu / 2 * Math.sin(phi) * Math.cos(phi);
      var III = nu / 24 * Math.sin(phi) * Math.pow(Math.cos(phi), 3) * (5 - Math.pow(Math.tan(phi), 2) + 9 * eta2);
      var IIIA = nu / 720 * Math.sin(phi) * clat5 * (61 - 58 * tlat2 + tlat4);
      var north = I + p * p * II + Math.pow(p, 4) * III + Math.pow(p, 6) * IIIA;
      return new GridCoordsGB$1(Math.round(east), Math.round(north));
    };

    return LatLngGB;
  })();

  //import {GridCoords as gridCoords} from '../GridCoords/GridCoords';

  var GridCoordsIE$1 = function () {
    return GridCoordsIE;
  }();
  (function () {
    /**
     * converts lat and lon (modified Airy) to OSI northings and eastings
     *
     * @returns {GridCoordsIE}
     */
    LatLngIE.prototype.to_os_coords = function () {
      //var deg2rad = Math.PI / 180;
      //var rad2deg = 180.0 / Math.PI;
      var phi = this.lat * deg2rad; // convert latitude to radians

      var lam = this.lng * deg2rad; // convert longitude to radians

      var a = 6377340.189; // OSI semi-major

      var b = 6356034.447; // OSI semi-minor

      var e0 = 200000; // OSI easting of false origin

      var n0 = 250000; // OSI northing of false origin

      var f0 = 1.000035; // OSI scale factor on central meridian

      var e2 = 0.00667054015; // OSI eccentricity squared

      var lam0 = -0.13962634015954636615389526147909; // OSI false east

      var phi0 = 0.93375114981696632365417456114141; // OSI false north

      var af0 = a * f0;
      var bf0 = b * f0; // easting

      var slat2 = Math.sin(phi) * Math.sin(phi);
      var nu = af0 / Math.sqrt(1 - e2 * slat2);
      var rho = nu * (1 - e2) / (1 - e2 * slat2);
      var eta2 = nu / rho - 1;
      var p = lam - lam0;
      var IV = nu * Math.cos(phi);
      var clat3 = Math.pow(Math.cos(phi), 3);
      var tlat2 = Math.tan(phi) * Math.tan(phi);
      var V = nu / 6 * clat3 * (nu / rho - tlat2);
      var clat5 = Math.pow(Math.cos(phi), 5);
      var tlat4 = Math.pow(Math.tan(phi), 4);
      var VI = nu / 120 * clat5 * (5 - 18 * tlat2 + tlat4 + 14 * eta2 - 58 * tlat2 * eta2);
      var east = e0 + p * IV + Math.pow(p, 3) * V + Math.pow(p, 5) * VI; // northing

      var n = (af0 - bf0) / (af0 + bf0);

      var M = LatLng._Marc(bf0, n, phi0, phi);

      var I = M + n0;
      var II = nu / 2 * Math.sin(phi) * Math.cos(phi);
      var III = nu / 24 * Math.sin(phi) * Math.pow(Math.cos(phi), 3) * (5 - Math.pow(Math.tan(phi), 2) + 9 * eta2);
      var IIIA = nu / 720 * Math.sin(phi) * clat5 * (61 - 58 * tlat2 + tlat4);
      var north = I + p * p * II + Math.pow(p, 4) * III + Math.pow(p, 6) * IIIA; //return {x: Math.round(east), y: Math.round(north)};

      /*
      return (east > 0 && north > 0) ?
          new GridCoordsIE(Math.round(east), Math.round(north))
          :
          null;
      */

      return new GridCoordsIE$1(Math.round(east), Math.round(north));
    };

    return LatLngIE;
  })();

  //import {GridCoords as gridCoords} from '../GridCoords/GridCoords';

  var GridCoordsCI$1 = function () {
    return GridCoordsCI;
  }();
  (function () {
    /**
     * converts lat and lon to CI northings and eastings
     *
     * @returns GridCoordsCI
     */
    LatLngCI.prototype.to_os_coords = function () {
      var phi = this.lat * deg2rad; // convert latitude to radians

      var lam = this.lng * deg2rad; // convert longitude to radians

      var a = 6378388.000; // OSI semi-major

      var b = 6356911.946; // OSI semi-minor

      var e0 = 500000; // OSI easting of false origin

      var n0 = 0; // OSI northing of false origin

      var f0 = 0.9996; // OSI scale factor on central meridian

      var e2 = 0.0067226700223333; // OSI eccentricity squared

      var lam0 = -0.0523598775598; // OSI false east

      var phi0 = 0; // OSI false north

      var af0 = a * f0;
      var bf0 = b * f0; // easting

      var slat2 = Math.sin(phi) * Math.sin(phi);
      var nu = af0 / Math.sqrt(1 - e2 * slat2);
      var rho = nu * (1 - e2) / (1 - e2 * slat2);
      var eta2 = nu / rho - 1;
      var p = lam - lam0;
      var IV = nu * Math.cos(phi);
      var clat3 = Math.pow(Math.cos(phi), 3);
      var tlat2 = Math.tan(phi) * Math.tan(phi);
      var V = nu / 6 * clat3 * (nu / rho - tlat2);
      var clat5 = Math.pow(Math.cos(phi), 5);
      var tlat4 = Math.pow(Math.tan(phi), 4);
      var VI = nu / 120 * clat5 * (5 - 18 * tlat2 + tlat4 + 14 * eta2 - 58 * tlat2 * eta2);
      var east = e0 + p * IV + Math.pow(p, 3) * V + Math.pow(p, 5) * VI; // northing

      var n = (af0 - bf0) / (af0 + bf0);

      var M = LatLng._Marc(bf0, n, phi0, phi);

      var I = M + n0;
      var II = nu / 2 * Math.sin(phi) * Math.cos(phi);
      var III = nu / 24 * Math.sin(phi) * Math.pow(Math.cos(phi), 3) * (5 - Math.pow(Math.tan(phi), 2) + 9 * eta2);
      var IIIA = nu / 720 * Math.sin(phi) * clat5 * (61 - 58 * tlat2 + tlat4);
      var north = I + p * p * II + Math.pow(p, 4) * III + Math.pow(p, 6) * IIIA; //return {x: Math.round(east), y: Math.round(north)};

      return new GridCoordsCI$1(Math.round(east), Math.round(north));
    };

    return LatLngCI;
  })();

  function _createSuper$1(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$1(); return function _createSuperInternal() { var Super = _getPrototypeOf$1(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf$1(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn$1(this, result); }; }

  function _isNativeReflectConstruct$1() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
  var OccurrenceForm = /*#__PURE__*/function (_Form) {
    _inherits$1(OccurrenceForm, _Form);

    var _super = _createSuper$1(OccurrenceForm);

    /**
     * @protected
     * @type {Occurrence}
     */

    /**
     * nasty tight coupling, but is needed for saving of images
     * set by MainView immediately after the form is constructed
     *
     * @type {string}
     */

    /**
     * @abstract
     * @type {Object.<string,{field: typeof FormField, attributes: {label: string, helpText: string, placeholder: string, autocomplete: string}}>}
     */

    /**
     * @abstract
     * @type {string}
     */

    /**
     * @type {string}
     */
    function OccurrenceForm(occurrence) {
      var _this;

      _classCallCheck$1(this, OccurrenceForm);

      _this = _super.call(this);

      _defineProperty$1(_assertThisInitialized$1(_this), "_occurrence", void 0);

      _defineProperty$1(_assertThisInitialized$1(_this), "surveyId", '');

      if ((this instanceof OccurrenceForm ? this.constructor : void 0) === OccurrenceForm) {
        throw new TypeError("Cannot construct OccurrenceForm instances directly, class should be overridden.");
      }

      if (occurrence) {
        _this.model = occurrence;
      }

      return _this;
    }
    /**
     *
     * @returns {HTMLElement}
     */


    _createClass(OccurrenceForm, [{
      key: "formElement",
      get: function get() {
        var _arguments = arguments;
        console.log({
          test_constructor: this.constructor
        });

        var el = _get(_getPrototypeOf$1(OccurrenceForm.prototype), "formElement", this);

        if (!this._formFieldsBuilt) {
          this.buildFormFields();
          el.addEventListener('change', function () {
            console.log('occurrence form change event');
            console.log(_arguments);
          }, {
            capture: false
          });
        }

        return el;
      }
      /**
       * sets this._formContentContainer to the container that should contain the form fields
       *
       * if no wrapper then can re-use the outer container id (this.#formEl
       */

    }, {
      key: "buildContentContainer",
      value: function buildContentContainer(outerContainer) {
        var cardEl = outerContainer.appendChild(document.createElement('div'));
        cardEl.className = 'card mt-3 ml-0 mr-0 mb-3';
        var cardHeaderEl = cardEl.appendChild(document.createElement('div'));
        cardHeaderEl.className = 'card-header';
        cardHeaderEl.textContent = OccurrenceForm.sectionTitle;
        this._formContentContainer = cardEl.appendChild(document.createElement('div'));
        this._formContentContainer.className = 'card-body';
        return this._formContentContainer;
      }
      /**
       *
       * @returns {(string|null)}
       */

    }, {
      key: "occurrenceId",
      get: function get() {
        return this._occurrence ? this._occurrence.id : null;
      }
      /**
       *
       * @returns {(number|null)}
       */

    }, {
      key: "projectId",
      get: function get() {
        return this._occurrence ? this._occurrence.projectId : null;
      }
      /**
       *
       */

    }, {
      key: "initialiseFormFields",
      value: function initialiseFormFields() {
        var properties = this.getFormSectionProperties();
        this.fields = {};

        for (var key in properties) {
          if (properties.hasOwnProperty(key)) {
            // noinspection JSPotentiallyInvalidConstructorUsage
            this.fields[key] = new properties[key].field(properties[key].attributes);
          }
        }
      }
    }, {
      key: "updateModelFromContent",
      value: function updateModelFromContent() {
        console.log('updating occurrence from OccurrenceForm content');

        for (var key in this.fields) {
          if (this.fields.hasOwnProperty(key)) {
            var field = this.fields[key];
            this._occurrence.attributes[key] = field.value;
          }
        }

        console.log({
          occurrence: this._occurrence
        });
      }
      /**
       *
       * @param {Occurrence} model
       */

    }, {
      key: "model",
      get: function get() {
        return this._occurrence;
      },
      set: function set(model) {
        this._occurrence = model;
        this.populateFormContent();
      }
    }, {
      key: "changeHandler",
      value: function changeHandler(event) {
        console.log('occurrence form change event');
        console.log({
          event: event
        });
        this.fireEvent(Form.CHANGE_EVENT, {
          form: this
        });
      }
    }, {
      key: "pingOccurrence",
      value: function pingOccurrence() {
        if (this._occurrence.unsaved()) {
          this.fireEvent(Form.CHANGE_EVENT, {
            form: this
          });
        }
      }
    }, {
      key: "destructor",
      value: function destructor() {
        this._occurrence = null;

        _get(_getPrototypeOf$1(OccurrenceForm.prototype), "destructor", this).call(this);
      }
    }, {
      key: "getFormSectionProperties",
      value: function getFormSectionProperties() {
        return OccurrenceForm.properties;
      }
    }]);

    return OccurrenceForm;
  }(Form);

  _defineProperty$1(OccurrenceForm, "properties", void 0);

  _defineProperty$1(OccurrenceForm, "sectionTitle", 'Occurrence form');

  _defineProperty$1(OccurrenceForm, "help", 'Records help text, should normally be initialised with an imported html template');

  var SurveyFormSection = function SurveyFormSection() {
    _classCallCheck$1(this, SurveyFormSection);
  };

  _defineProperty$1(SurveyFormSection, "sectionTitle", void 0);

  _defineProperty$1(SurveyFormSection, "sectionSortOrder", void 0);

  _defineProperty$1(SurveyFormSection, "sectionNavigationKey", void 0);

  _defineProperty$1(SurveyFormSection, "help", '');

  _defineProperty$1(SurveyFormSection, "properties", void 0);

  function _arrayWithoutHoles(arr) {
    if (Array.isArray(arr)) return _arrayLikeToArray$8(arr);
  }

  function _iterableToArray(iter) {
    if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
  }

  function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }

  function _toConsumableArray(arr) {
    return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray$8(arr) || _nonIterableSpread();
  }

  var htmlLayout = "\r\n<div class=\"container-fluid\">\r\n    <div class=\"row\" style=\"height: 90vh;\">\r\n        <div class=\"col d-md-block pr-md-0 pt-3\" id=\"col1panel\" style=\"overflow-y: auto; max-height: calc(100vh - 5rem);\">\r\n        </div>\r\n        <div class=\"col d-md-none pl-0 pr-0\" id=\"ctrlpanel\" style=\"background-color: aliceblue; width: 28px; max-width: 28px; overflow-y: hidden; \">\r\n            <button class=\"navbar-light navbar-toggler pl-0 pr-0\" type=\"button\" aria-label=\"Back\" id=\"right-panel-back\">\r\n                <i class=\"material-icons-round\" style=\"color: gray;\">view_list</i>\r\n            </button>\r\n        </div>\r\n        <div class=\"col d-md-block pr-md-0\" id=\"col2panel\" style=\"overflow-y: auto; height: 100%;\">\r\n        </div>\r\n    </div>\r\n</div>\r\n";

  function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

  function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

  function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

  function _createSuper$2(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$2(); return function _createSuperInternal() { var Super = _getPrototypeOf$1(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf$1(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn$1(this, result); }; }

  function _isNativeReflectConstruct$2() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

  function _classPrivateMethodInitSpec(obj, privateSet) { _checkPrivateRedeclaration(obj, privateSet); privateSet.add(obj); }

  function _classPrivateFieldInitSpec(obj, privateMap, value) { _checkPrivateRedeclaration(obj, privateMap); privateMap.set(obj, value); }

  function _checkPrivateRedeclaration(obj, privateCollection) { if (privateCollection.has(obj)) { throw new TypeError("Cannot initialize the same private elements twice on an object"); } }

  function _classPrivateMethodGet(receiver, privateSet, fn) { if (!privateSet.has(receiver)) { throw new TypeError("attempted to get private field on non-instance"); } return fn; }
  var LEFT_PANEL_ID = 'col1panel';
  var RIGHT_PANEL_ID = 'col2panel';
  var CONTROL_PANEL_ID = 'ctrlpanel';
  var PANEL_BACK_BUTTON_ID = 'right-panel-back';
  var PANEL_LEFT = 'left';
  var PANEL_RIGHT = 'right';
  var DELETE_OCCURRENCE_MODAL_ID = 'deleteoccurrencemodal';
  var FINISH_MODAL_ID = 'finishmodal';
  var OCCURRENCE_LIST_CONTAINER_ID = 'occurrencelistcontainer'; //SurveyForm.registerSection(GardenFlowerSurveyFormAboutSection);
  //SurveyForm.registerSection(GardenFlowerSurveyFormGardenSection);

  /**
   * @external $
   */

  var _surveyFormSections = /*#__PURE__*/new WeakMap();

  var _occurrenceForm = /*#__PURE__*/new WeakMap();

  var _occurrenceChangeHandles = /*#__PURE__*/new WeakMap();

  var _refreshSurveyHelpPanel = /*#__PURE__*/new WeakSet();

  var _refreshOccurrenceEditor = /*#__PURE__*/new WeakSet();

  var _displayDefaultRightPanel = /*#__PURE__*/new WeakSet();

  var _clearOccurrenceListeners = /*#__PURE__*/new WeakSet();

  var _populateLeftPanel = /*#__PURE__*/new WeakSet();

  var _registerModals = /*#__PURE__*/new WeakSet();

  var _registerLeftPanelAccordionEvent = /*#__PURE__*/new WeakSet();

  var _appendWelcomeSection = /*#__PURE__*/new WeakSet();

  var _appendSurveyForm = /*#__PURE__*/new WeakSet();

  var _appendOccurrenceListContainer = /*#__PURE__*/new WeakSet();

  var _buildOccurrenceList = /*#__PURE__*/new WeakSet();

  var _occurrenceSummaryHTML = /*#__PURE__*/new WeakSet();

  var MainView = /*#__PURE__*/function (_Page) {
    _inherits$1(MainView, _Page);

    var _super = _createSuper$2(MainView);

    function MainView() {
      var _this;

      _classCallCheck$1(this, MainView);

      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      _this = _super.call.apply(_super, [this].concat(args));

      _classPrivateMethodInitSpec(_assertThisInitialized$1(_this), _occurrenceSummaryHTML);

      _classPrivateMethodInitSpec(_assertThisInitialized$1(_this), _buildOccurrenceList);

      _classPrivateMethodInitSpec(_assertThisInitialized$1(_this), _appendOccurrenceListContainer);

      _classPrivateMethodInitSpec(_assertThisInitialized$1(_this), _appendSurveyForm);

      _classPrivateMethodInitSpec(_assertThisInitialized$1(_this), _appendWelcomeSection);

      _classPrivateMethodInitSpec(_assertThisInitialized$1(_this), _registerLeftPanelAccordionEvent);

      _classPrivateMethodInitSpec(_assertThisInitialized$1(_this), _registerModals);

      _classPrivateMethodInitSpec(_assertThisInitialized$1(_this), _populateLeftPanel);

      _classPrivateMethodInitSpec(_assertThisInitialized$1(_this), _clearOccurrenceListeners);

      _classPrivateMethodInitSpec(_assertThisInitialized$1(_this), _displayDefaultRightPanel);

      _classPrivateMethodInitSpec(_assertThisInitialized$1(_this), _refreshOccurrenceEditor);

      _classPrivateMethodInitSpec(_assertThisInitialized$1(_this), _refreshSurveyHelpPanel);

      _defineProperty$1(_assertThisInitialized$1(_this), "controller", void 0);

      _classPrivateFieldInitSpec(_assertThisInitialized$1(_this), _surveyFormSections, {
        writable: true,
        value: {}
      });

      _classPrivateFieldInitSpec(_assertThisInitialized$1(_this), _occurrenceForm, {
        writable: true,
        value: void 0
      });

      _classPrivateFieldInitSpec(_assertThisInitialized$1(_this), _occurrenceChangeHandles, {
        writable: true,
        value: {}
      });

      _defineProperty$1(_assertThisInitialized$1(_this), "panelKey", '');

      _defineProperty$1(_assertThisInitialized$1(_this), "OCCURRENCES_ARE_LAST_SECTION", true);

      _defineProperty$1(_assertThisInitialized$1(_this), "occurrenceSummaryText", 'Placeholder occurrence summary text in MainView.js');

      _defineProperty$1(_assertThisInitialized$1(_this), "welcomeContent", 'Placeholder welcome text in MainView.js');

      _defineProperty$1(_assertThisInitialized$1(_this), "defaultRightHandSideHelp", 'Default right-hand side help text in MainView.js');

      return _this;
    }

    _createClass(MainView, [{
      key: "initialise",
      value:
      /**
       * called once during late-stage app initialisation
       * (NB this may not be the current view when called)
       *
       * an opportunity to register listeners on this.controller.app
       */
      function initialise() {
        this.controller.app.addListener(App.EVENT_OCCURRENCE_ADDED, this.occurrenceAddedHandler.bind(this));
      }
      /**
       * called before display to initialise a two-panel layout
       */

    }, {
      key: "setLayout",
      value: function setLayout() {
        var _this2 = this;

        var bodyEl = document.getElementById('body');
        bodyEl.innerHTML = htmlLayout; // register handler on right-pane back button

        document.getElementById(PANEL_BACK_BUTTON_ID).addEventListener('click', function (event) {
          event.stopPropagation();
          event.preventDefault();

          _this2.fireEvent(MainController.EVENT_BACK);
        });
      }
      /**
       * need to ensure that the open accordion sections match the url
       * do this by class tweaking, so that handlers do not fire
       */

    }, {
      key: "refreshLeftPanelAccordionState",
      value: function refreshLeftPanelAccordionState() {
        var cards = document.querySelectorAll("div#".concat(this.leftPanelAccordionId, " div[data-parent=\"#").concat(this.leftPanelAccordionId, "\"].collapse"));
        var targetMatch;

        if (this.controller.viewSubcontext) {
          targetMatch = this.controller.viewSubcontext === 'record' ? 'record' : this.controller.surveySection;
        } else {
          targetMatch = '';
        }

        var _iterator = _createForOfIteratorHelper(cards),
            _step;

        try {
          for (_iterator.s(); !(_step = _iterator.n()).done;) {
            var card = _step.value;
            var cardSection = card.getAttribute('data-sectionkey');

            if (cardSection === targetMatch) {
              card.classList.add('show');
            } else {
              card.classList.remove('show');
            }
          }
        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }

        this._refreshOccurrenceAccordionState();
      }
      /**
       * collapse open occurrence cards that don't match the current occurrence id
       *
       * @private
       */

    }, {
      key: "_refreshOccurrenceAccordionState",
      value: function _refreshOccurrenceAccordionState() {
        var occurrenceCards = document.querySelectorAll("div#".concat(OCCURRENCE_LIST_CONTAINER_ID, " div[data-parent=\"#").concat(OCCURRENCE_LIST_CONTAINER_ID, "\"].collapse"));
        var targetMatch = this.controller.currentOccurrenceId;

        var _iterator2 = _createForOfIteratorHelper(occurrenceCards),
            _step2;

        try {
          for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
            var card = _step2.value;
            var cardOccurrenceId = card.getAttribute('data-occurrenceid');

            if (cardOccurrenceId === targetMatch) {
              card.classList.add('show');
            } else {
              card.classList.remove('show');
            }
          }
        } catch (err) {
          _iterator2.e(err);
        } finally {
          _iterator2.f();
        }
      }
    }, {
      key: "display",
      value: function display() {
        if (this.controller.needsFullRefresh) {
          console.log('Full refresh triggered.');
          this.setLayout();

          _classPrivateMethodGet(this, _populateLeftPanel, _populateLeftPanel2).call(this);
        } else {
          // need to ensure that the open accordion sections match the url
          this.refreshLeftPanelAccordionState();
        }

        if (this.controller.needRightPanelRefresh) {
          // the view of the current record (in the right-hand editor pane)
          // has changed and needs rebuilding from scratch
          switch (this.controller.viewSubcontext) {
            case 'record':
              _classPrivateMethodGet(this, _refreshOccurrenceEditor, _refreshOccurrenceEditor2).call(this);

              break;

            case 'survey':
              _classPrivateMethodGet(this, _refreshSurveyHelpPanel, _refreshSurveyHelpPanel2).call(this);

              break;

            default:
              _classPrivateMethodGet(this, _displayDefaultRightPanel, _displayDefaultRightPanel2).call(this);

          }
        }

        this.setResponsivePanel('' === this.panelKey ? PANEL_LEFT : PANEL_RIGHT);
      }
    }, {
      key: "refreshOccurrenceFooterControls",
      value:
      /**
       * adds next/new and finish/close button to below right-panel occurrence editor
       * @param {HTMLElement} editorContainer
       */
      function refreshOccurrenceFooterControls(editorContainer) {
        var _this3 = this;

        var nextSection;
        var buttonContainer = editorContainer.appendChild(document.createElement('div'));
        var backButton = buttonContainer.appendChild(document.createElement('button'));
        backButton.className = 'btn btn-secondary btn-md-lg mt-2 mb-3 mr-2';
        backButton.type = 'button';
        backButton.textContent = 'back to list';
        backButton.setAttribute('data-buttonaction', 'back');

        if (this.occurrenceIsMostRecent(this.controller.currentOccurrence)) {
          var addNewButton = buttonContainer.appendChild(document.createElement('button'));
          addNewButton.className = 'btn btn-primary btn-md-lg mt-2 mb-3 mr-2';
          addNewButton.type = 'button';
          addNewButton.textContent = 'add another';
          addNewButton.setAttribute('data-buttonaction', 'new');
        }

        if (this.OCCURRENCES_ARE_LAST_SECTION) {
          var finishButton = buttonContainer.appendChild(document.createElement('button'));
          finishButton.className = 'btn btn-primary btn-md-lg mt-2 mb-3';
          finishButton.type = 'button';
          finishButton.textContent = 'finish';
          finishButton.setAttribute('data-buttonaction', 'finish');
        } else {
          var nextFormIndex = 1;
          nextSection = SurveyForm.sections[nextFormIndex];
          var nextButton = buttonContainer.appendChild(document.createElement('button'));
          nextButton.className = 'btn btn-primary btn-md-lg mt-2 mb-3';
          nextButton.type = 'button';
          nextButton.textContent = 'next »';
          nextButton.setAttribute('data-buttonaction', 'next');
          nextButton.title = nextSection.sectionTitle;
        }

        buttonContainer.addEventListener('click', function (event) {
          var buttonEl = event.target.closest('button');

          if (buttonEl && buttonEl.hasAttribute('data-buttonaction')) {
            switch (buttonEl.getAttribute('data-buttonaction')) {
              case 'new':
                _this3.fireEvent(MainController.EVENT_NEW_RECORD);

                break;

              case 'back':
                _this3.controller.app.router.navigate('/list/record/');

                break;

              case 'finish':
                _this3.controller.app.router.navigate('/list/record/'); // display the finish dialogue box


                $("#".concat(FINISH_MODAL_ID)).modal();
                break;

              case 'next':
                _this3.controller.app.router.navigate("/list/survey/".concat(nextSection.sectionNavigationKey));

                break;

              default:
                throw new Error("Unrecognised button action ".concat(buttonEl.getAttribute('data-buttonaction')));
            }
          }
        });
      }
      /**
       *
       * @param {Occurrence} occurrence
       * @returns {boolean}
       */

    }, {
      key: "occurrenceIsMostRecent",
      value: function occurrenceIsMostRecent(occurrence) {
        // loop through entries sorted by creation date, most recent first
        var _iterator3 = _createForOfIteratorHelper(this.controller.occurrences.entries()),
            _step3;

        try {
          for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
            var occurrenceTuple = _step3.value;

            if (occurrenceTuple[1].createdStamp > occurrence.createdStamp && !occurrenceTuple[1].deleted) {
              return false;
            }
          }
        } catch (err) {
          _iterator3.e(err);
        } finally {
          _iterator3.f();
        }

        return true;
      }
      /**
       *
       * @param {string} [htmlText]
       */

    }, {
      key: "newButtonClickHandler",
      value:
      /**
       * @param {MouseEvent} event
       */
      function newButtonClickHandler(event) {
        event.preventDefault();
        event.stopPropagation();
        this.fireEvent(MainController.EVENT_NEW_RECORD);
      }
      /**
       *
       */

    }, {
      key: "occurrenceAddedHandler",
      value:
      /**
       * called after the one-off addition of a new occurrence
       *
       * @param {{occurrenceId: string, surveyId: string}} params
       */
      function occurrenceAddedHandler(params) {
        var occurrenceList = document.getElementById(OCCURRENCE_LIST_CONTAINER_ID);

        if (occurrenceList) {
          var occurrence = this.controller.occurrences.get(params.occurrenceId);
          var itemCard = document.createElement('div');
          itemCard.className = 'card';
          itemCard.id = "card_".concat(occurrence.id);
          itemCard.innerHTML = _classPrivateMethodGet(this, _occurrenceSummaryHTML, _occurrenceSummaryHTML2).call(this, occurrence);
          _classPrivateFieldGet(this, _occurrenceChangeHandles)[occurrence.id] = occurrence.addListener(Occurrence.EVENT_MODIFIED, this.occurrenceChangeHandler.bind(this), {
            occurrenceId: occurrence.id
          });
          occurrenceList.insertBefore(itemCard, occurrenceList.firstChild);
        }
      }
      /**
       * sets validity flag in occurrence accordion header
       *
       * @param {Occurrence} occurrence
       */

    }, {
      key: "refreshOccurrenceValiditySummary",
      value: function refreshOccurrenceValiditySummary(occurrence) {
        var cardEl = document.getElementById("card_".concat(occurrence.id));

        if (cardEl) {
          var validity = occurrence.evaluateCompletionStatus(OccurrenceForm.properties);

          if (validity.requiredFieldsPresent) {
            cardEl.classList.remove('is-invalid');
          } else {
            cardEl.classList.add('is-invalid');
          }
        }
      }
      /**
       *
       * @param {{occurrenceId : string}} params
       */

    }, {
      key: "occurrenceChangeHandler",
      value: function occurrenceChangeHandler(params) {
        var occurrence = this.controller.occurrences.get(params.occurrenceId);
        var el = document.getElementById("card_".concat(params.occurrenceId));

        if (el) {
          if (!occurrence.deleted) {
            el.innerHTML = _classPrivateMethodGet(this, _occurrenceSummaryHTML, _occurrenceSummaryHTML2).call(this, occurrence);
            this.refreshOccurrenceValiditySummary(occurrence);
          } else {
            el.parentElement.removeChild(el); // remove the event listener

            if (_classPrivateFieldGet(this, _occurrenceChangeHandles)[params.occurrenceId]) {
              occurrence.removeListener(Occurrence.EVENT_MODIFIED, _classPrivateFieldGet(this, _occurrenceChangeHandles)[params.occurrenceId]);
              _classPrivateFieldGet(this, _occurrenceChangeHandles)[params.occurrenceId] = null;
            }
          }
        }
      }
      /**
       *
       * @param {Occurrence} occurrence
       * @returns {string}
       */

    }, {
      key: "occurrenceSummaryBodyHTML",
      value: function occurrenceSummaryBodyHTML(occurrence) {
        var html = '';

        for (var key in occurrence.attributes) {
          if (occurrence.attributes.hasOwnProperty(key) && OccurrenceForm.properties.hasOwnProperty(key) && !OccurrenceForm.properties[key].field.isEmpty(occurrence.attributes[key])) {
            var summaryHTML = OccurrenceForm.properties[key].field.summarise(key, OccurrenceForm.properties[key], occurrence.attributes);

            if (summaryHTML) {
              html += "<p class=\"ellipsed-line mb-0\">".concat(summaryHTML, "</p>");
            }
          }
        }

        if (App.devMode) {
          html += "<p class=\"mb-0\">(<i>id ".concat(occurrence.id, "</i>)</p>");
        }

        return html;
      }
      /**
       *
       * @param {Occurrence} occurrence
       * @returns {string}
       */

    }, {
      key: "occurrenceSummaryHeadingHTML",
      value: function occurrenceSummaryHeadingHTML(occurrence) {
        var html = '';

        if (occurrence.attributes.hasOwnProperty('images') && occurrence.attributes.images.length) {
          var firstImageId = occurrence.attributes.images[0];
          html += OccurrenceImage.imageLink(firstImageId, 48, 48, {
            className: 'mr-1'
          });
        }

        if (occurrence.attributes.taxon && occurrence.attributes.taxon.taxonId) {
          // have an well-formed taxon
          html += occurrence.taxon.formattedHTML(occurrence.attributes.taxon.vernacularMatch);
        } else if (occurrence.attributes.taxon && occurrence.attributes.taxon.taxonName) {
          // match with unrecognised taxon name
          html += escapeHTML(occurrence.attributes.taxon.taxonName);
        } else {
          html += '<span>(unnamed plant)</span>';
        }

        return html;
      }
      /**
       * cardHeadingEl.setAttribute('data-toggle', 'collapse');
       cardHeadingEl.setAttribute('data-target', `#${descriptor.cardDescriptionId}`);
       *
       * @param {Occurrence} occurrence
       * @return {string}
       */

    }, {
      key: "setResponsivePanel",
      value:
      /**
       *
       * @param {('left'|'right')} panel
       */
      function setResponsivePanel(panel) {
        var rightPanel = document.getElementById(RIGHT_PANEL_ID);
        var leftPanel = document.getElementById(LEFT_PANEL_ID);
        var midPanel = document.getElementById(CONTROL_PANEL_ID);

        switch (panel) {
          case PANEL_LEFT:
            leftPanel.classList.remove('d-none');
            leftPanel.classList.add('d-block');
            rightPanel.classList.remove('d-block');
            rightPanel.classList.add('d-none');
            midPanel.classList.remove('d-md-none');
            midPanel.classList.add('d-none');
            break;

          case PANEL_RIGHT:
            leftPanel.classList.remove('d-block');
            leftPanel.classList.add('d-none');
            rightPanel.classList.remove('d-none');
            rightPanel.classList.add('d-block');
            midPanel.classList.remove('d-none');
            midPanel.classList.add('d-md-none');
            break;

          default:
            throw new Error("Unrecognised panel value '".concat(panel));
        }
      }
    }]);

    return MainView;
  }(Page);

  function _refreshSurveyHelpPanel2() {
    var rightPanelContainer = document.getElementById(RIGHT_PANEL_ID);
    var sectionKey = this.controller.surveySection; // section key can be 'welcome' which is a special case that doesn't match a section form

    var help = SurveyForm.sectionsByKey[sectionKey] ? SurveyForm.sectionsByKey[sectionKey].help : '';

    if (help) {
      rightPanelContainer.innerHTML = help;
    } else if (sectionKey === 'welcome') {
      rightPanelContainer.innerHTML = this.defaultRightHandSideHelp;
    } else {
      // shouldn't get here
      rightPanelContainer.innerHTML = "<p>placeholder survey help content for '".concat(sectionKey, "'</p>");
    }
  }

  function _refreshOccurrenceEditor2() {
    try {
      var occurrence = this.controller.currentOccurrence;
      var editorContainer = document.getElementById(RIGHT_PANEL_ID);

      if (occurrence) {
        if (!_classPrivateFieldGet(this, _occurrenceForm) || _classPrivateFieldGet(this, _occurrenceForm).occurrenceId !== occurrence.id) {
          if (_classPrivateFieldGet(this, _occurrenceForm)) {
            _classPrivateFieldGet(this, _occurrenceForm).destructor();
          } // form has not been initialised or current occurrence has changed


          _classPrivateFieldSet(this, _occurrenceForm, occurrence.setForm(new OccurrenceForm(occurrence))); //this.#occurrenceForm = occurrence.getForm();


          _classPrivateFieldGet(this, _occurrenceForm).surveyId = this.controller.app.currentSurvey.id; // scroll to the top of the panel

          editorContainer.scrollTop = 0;
        }

        editorContainer.innerHTML = '';

        var formEl = _classPrivateFieldGet(this, _occurrenceForm).formElement;

        editorContainer.appendChild(formEl);

        _classPrivateFieldGet(this, _occurrenceForm).populateFormContent();

        this.refreshOccurrenceFooterControls(editorContainer); // ensures that the accordion matches the navigation state

        $("#description_".concat(occurrence.id)).collapse('show');
      } else {
        _classPrivateMethodGet(this, _displayDefaultRightPanel, _displayDefaultRightPanel2).call(this, OccurrenceForm.help);
      }
    } catch (error) {
      console.log({
        error: error
      });

      var _editorContainer = document.getElementById(RIGHT_PANEL_ID);

      if (_editorContainer) {
        _editorContainer.innerHTML = "<p>".concat(error.message, "</p>");
      } else {
        document.body.innerHTML = "<h2>Internal error</h2><p>Please report this problem:</p><p>".concat(error.message, "</p>");
      }
    }
  }

  function _displayDefaultRightPanel2(htmlText) {
    var editorContainer = document.getElementById(RIGHT_PANEL_ID);
    editorContainer.innerHTML = htmlText || this.defaultRightHandSideHelp;
  }

  function _clearOccurrenceListeners2() {
    for (var id in _classPrivateFieldGet(this, _occurrenceChangeHandles)) {
      var occurrence = this.controller.occurrences.get[id];

      if (occurrence) {
        occurrence.removeListener(Occurrence.EVENT_MODIFIED, _classPrivateFieldGet(this, _occurrenceChangeHandles)[id]);
      }
    }

    _classPrivateFieldSet(this, _occurrenceChangeHandles, {});
  }

  function _populateLeftPanel2() {
    var _this4 = this;

    var leftPanel = document.getElementById(LEFT_PANEL_ID);
    var accordionEl = leftPanel.appendChild(document.createElement('div'));
    accordionEl.className = "accordion";
    this.leftPanelAccordionId = accordionEl.id = Form.nextId;

    _classPrivateMethodGet(this, _appendWelcomeSection, _appendWelcomeSection2).call(this);

    _classPrivateMethodGet(this, _appendSurveyForm, _appendSurveyForm2).call(this, 0, accordionEl, MainView.NEXT_RECORDS); // about you


    _classPrivateMethodGet(this, _appendOccurrenceListContainer, _appendOccurrenceListContainer2).call(this); // Keep this as is useful as guide for building other app layouts
    //this.#appendSurveyForm(1, accordionEl, MainView.NEXT_IS_FINAL); // about your garden


    _classPrivateMethodGet(this, _buildOccurrenceList, _buildOccurrenceList2).call(this);
    /**
     * need to manually intercept clicks on the form help buttons
     * to prevent click also triggering an accordion toggle
     */


    accordionEl.addEventListener('click',
    /** @param {MouseEvent} event */
    function (event) {
      var targetLinkEl = event.target.closest('a');

      if (targetLinkEl && targetLinkEl.hasAttribute('data-help-link')) {
        event.preventDefault();
        event.stopPropagation();

        _this4.controller.app.router.navigate(targetLinkEl.getAttribute('data-help-link'));
      }
    });

    _classPrivateMethodGet(this, _registerLeftPanelAccordionEvent, _registerLeftPanelAccordionEvent2).call(this);

    _classPrivateMethodGet(this, _registerModals, _registerModals2).call(this);
  }

  function _registerModals2() {
    var _this5 = this;

    //const container = document.getElementById(LEFT_PANEL_ID);
    var container = document.body; // Delete record modal

    var deleteOccurrenceModalHTML = "<div class=\"modal fade\" id=\"".concat(DELETE_OCCURRENCE_MODAL_ID, "\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"").concat(DELETE_OCCURRENCE_MODAL_ID, "Title\" aria-hidden=\"true\">\n  <div class=\"modal-dialog modal-dialog-centered\" role=\"document\">\n    <div class=\"modal-content\">\n      <div class=\"modal-header\">\n        <h5 class=\"modal-title\" id=\"").concat(DELETE_OCCURRENCE_MODAL_ID, "Title\">Delete record?</h5>\n        <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\">\n          <span aria-hidden=\"true\">&times;</span>\n        </button>\n      </div>\n      <div class=\"modal-body\">\n        Please confirm that you wish to delete the record.\n      </div>\n      <div class=\"modal-footer\">\n        <button type=\"button\" class=\"btn btn-secondary\" data-dismiss=\"modal\">Back</button>\n        <button type=\"button\" class=\"btn btn-danger\" data-dismiss=\"modal\" id=\"").concat(DELETE_OCCURRENCE_MODAL_ID, "confirmed\">Delete record</button>\n      </div>\n    </div>\n  </div>\n</div>");
    var deleteOccurrenceModalEl = document.createElement('div');
    deleteOccurrenceModalEl.innerHTML = deleteOccurrenceModalHTML;
    container.appendChild(deleteOccurrenceModalEl.firstChild);
    $("#".concat(DELETE_OCCURRENCE_MODAL_ID)).on('show.bs.modal', function (event) {
      var button = $(event.relatedTarget); // Button that triggered the modal
      // button will not be valid if modal has been invoked directly from script,
      // in which case the occurrence id attribute will already have been set

      if (button && button.data('occurrenceid')) {
        var occurrenceId = button.data('occurrenceid');
        document.getElementById("".concat(DELETE_OCCURRENCE_MODAL_ID, "confirmed")).setAttribute('data-occurrenceid', occurrenceId);
      }
    });
    document.getElementById("".concat(DELETE_OCCURRENCE_MODAL_ID, "confirmed")).addEventListener('click', function (event) {
      var confirmButtonEl = event.target.closest('button');

      if (confirmButtonEl && confirmButtonEl.hasAttribute('data-occurrenceid')) {
        var occurrenceId = confirmButtonEl.getAttribute('data-occurrenceid');
        console.log("Deleting occurrence ".concat(occurrenceId, "."));

        _this5.fireEvent(MainController.EVENT_DELETE_OCCURRENCE, {
          occurrenceId: occurrenceId
        });
      }
    }); // 'finish' modal
    // this pop-up is informational only

    var finishModalEl = document.createElement('div');
    finishModalEl.innerHTML = "<div class=\"modal fade\" id=\"".concat(FINISH_MODAL_ID, "\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"").concat(FINISH_MODAL_ID, "Title\" aria-hidden=\"true\">\n  <div class=\"modal-dialog modal-dialog-centered\" role=\"document\">\n    <div class=\"modal-content\">\n      <div class=\"modal-header\">\n        <h5 class=\"modal-title\" id=\"").concat(FINISH_MODAL_ID, "Title\">Thank you</h5>\n        <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\">\n          <span aria-hidden=\"true\">&times;</span>\n        </button>\n      </div>\n      <div class=\"modal-body\">\n        <p>Thank you! Your form responses have been sent. If you wish, you can continue to make changes and edit or add further records.</p>\n        <p>If you provided an email address, then we will send you a message with a link to this form, so that you can return to it later if needed.</p>\n      </div>\n      <div class=\"modal-footer\">\n        <button type=\"button\" class=\"btn btn-secondary\" data-dismiss=\"modal\">Close</button>\n      </div>\n    </div>\n  </div>\n</div>");
    container.appendChild(finishModalEl.firstChild);
    container.appendChild(ImageField.licenseModal()); // image modal
    // includes a button to delete the image

    var imageModalEl = document.createElement('div');
    imageModalEl.innerHTML = "<div class=\"modal fade\" id=\"".concat(IMAGE_MODAL_ID, "\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"").concat(IMAGE_MODAL_ID, "Title\" aria-hidden=\"true\">\n  <div class=\"modal-dialog modal-dialog-centered\" role=\"document\">\n    <div class=\"modal-content\">\n      <div class=\"modal-header d-none d-md-flex\">\n        <h5 class=\"modal-title\" id=\"").concat(IMAGE_MODAL_ID, "Title\">Photo</h5>\n        <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\">\n          <span aria-hidden=\"true\">&times;</span>\n        </button>\n      </div>\n      <div class=\"modal-body\" style=\"position: relative;\">\n        <picture>\n        </picture>\n      </div>\n      <div class=\"modal-footer\">\n        <button type=\"button\" id=\"").concat(IMAGE_MODAL_DELETE_BUTTON_ID, "\" class=\"btn btn-outline-danger delete-occurrence-button mr-3\" data-toggle=\"modal\" data-target=\"#").concat(DELETE_IMAGE_MODAL_ID, "\" data-imageid=\"\"><i class=\"material-icons\">delete</i></button>\n        <button type=\"button\" class=\"btn btn-secondary\" data-dismiss=\"modal\">Close</button>\n      </div>\n    </div>\n  </div>\n</div>");
    container.appendChild(imageModalEl.firstChild);
    document.getElementById(IMAGE_MODAL_DELETE_BUTTON_ID).addEventListener('click', function (event) {
      var deleteButtonEl = event.target.closest('button');

      if (deleteButtonEl && deleteButtonEl.hasAttribute('data-imageid')) {
        var imageId = deleteButtonEl.getAttribute('data-imageid'); //console.log(`Deleting image ${occurrenceId}.`);

        _classPrivateFieldGet(_this5, _occurrenceForm).fireEvent(EVENT_DELETE_IMAGE, {
          imageId: imageId
        });

        $("#".concat(IMAGE_MODAL_ID)).modal('hide');
      }
    });
  }

  function _registerLeftPanelAccordionEvent2() {
    var _this6 = this;

    // console.log('Registering left panel accordion event handler.');
    $("#".concat(LEFT_PANEL_ID)).on('show.bs.collapse', function (event) {
      // this will fire for both selection events within the records list and for changes to the top-level accordion
      if (event.target.dataset.occurrenceid) {
        console.log({
          'left panel accordion show event (with occ id)': event
        });

        _this6.fireEvent(MainController.EVENT_SELECT_OCCURRENCE, {
          occurrenceId: event.target.dataset.occurrenceid
        });
      } else if (event.target.dataset.sectionkey) {
        console.log({
          'left panel accordion show event (with section key)': event
        });

        _this6.fireEvent(MainController.EVENT_SELECT_SURVEY_SECTION, {
          sectionKey: event.target.dataset.sectionkey
        });
      } else {
        console.log({
          'left panel accordion show event (other)': event
        });
      }
    }).on('hidden.bs.collapse', function (event) {
      // this will fire for both selection events within the records list and for changes to the top-level accordion
      console.log({
        'left panel accordion hide event': event
      });

      if (event.target.dataset.occurrenceid) {
        // should evaluate the validity of the individual occurrence
        var occurrence = _this6.controller.occurrences.get(event.target.dataset.occurrenceid);

        if (occurrence.isNew && !occurrence.isPristine) {
          // closing of the slider is an action suggesting that user has moved on and validation should start
          occurrence.isNew = false;

          _this6.refreshOccurrenceValiditySummary(occurrence);
        } // only trigger a navigation if the occurrence was the current one


        if (_this6.controller.currentOccurrenceId === event.target.dataset.occurrenceid) {
          _this6.fireEvent(MainController.EVENT_SELECT_OCCURRENCE, {
            occurrenceId: ''
          });
        }
      } else if (event.target.dataset.sectionkey) {
        if (event.target.dataset.sectionkey === 'record') {
          // closing the top-level occurrences list
          // need to propagate validation down to the occurrences
          // only trigger a navigation if the view context was the current one
          if (_this6.controller.viewSubcontext === 'record') {
            _this6.fireEvent(MainController.EVENT_SELECT_SURVEY_SECTION, {
              sectionKey: ''
            });
          }
        } else {
          if (_classPrivateFieldGet(_this6, _surveyFormSections)[event.target.dataset.sectionkey]) {
            var isValid = _classPrivateFieldGet(_this6, _surveyFormSections)[event.target.dataset.sectionkey].validateForm();

            console.log({
              'survey section validity': isValid
            }); // only trigger a navigation if the section was the current one

            if (_this6.controller.surveySection === event.target.dataset.sectionkey) {
              _this6.fireEvent(MainController.EVENT_SELECT_SURVEY_SECTION, {
                sectionKey: ''
              });
            }
          }
        }
      }
    });
  }

  function _appendWelcomeSection2() {
    var accordionEl = document.getElementById(this.leftPanelAccordionId); // add 'next' button to the bottom of the survey form

    var nextButton = document.createElement('button');
    nextButton.className = 'btn btn-primary';
    nextButton.type = 'button';
    nextButton.textContent = 'get started »';
    nextButton.setAttribute('data-toggle', 'collapse');
    nextButton.setAttribute('data-target', '#survey-0-about');
    var cardId = Form.nextId;
    var sectionElement = document.createElement('div');
    sectionElement.innerHTML = this.welcomeContent;
    sectionElement.appendChild(nextButton);
    var helpLink = document.createElement('span');
    helpLink.className = 'd-md-none pl-2'; // noinspection HtmlUnknownTarget

    helpLink.innerHTML = "(<a href=\"/app/list/survey/welcome/help\" data-navigo=\"list/survey/welcome/help\">more info</a>)";
    sectionElement.appendChild(helpLink);
    accordionEl.appendChild(this.card({
      cardId: cardId,
      cardHeadingId: Form.nextId,
      collapsed: this.controller.surveySection !== 'welcome',
      headingButtonId: Form.nextId,
      headingHTML: '<img src="/img/BSBIlong.png" alt="" style="float:right; max-width: 40%; max-height: 48px;">' + '<div style="float: left;">Welcome</div>',
      // was 'Welcome'
      buttonStyleString: 'width: 100%',
      headingNonbuttonHTML: '',
      // `<small class="btn d-md-none">(<a href="/app/list/survey/${sectionClass.sectionNavigationKey}/help" data-help-link="/list/survey/${sectionClass.sectionNavigationKey}/help">help</a>)</small>`,
      headingValidationWarningHTML: '',
      cardDescriptionId: "survey-welcome",
      // Form.nextId,
      parentContainerId: accordionEl.id,
      bodyContentElement: sectionElement,
      dataAttributes: {
        sectionkey: "welcome"
      }
    }));
  }

  function _appendSurveyForm2(formIndex, accordionEl, next) {
    var _this7 = this;

    var sectionClass = SurveyForm.sections[formIndex];
    var surveyFormSection = new SurveyForm(sectionClass);
    _classPrivateFieldGet(this, _surveyFormSections)[sectionClass.sectionNavigationKey] = surveyFormSection;
    var formElement = surveyFormSection.formElement; // add 'next' button to the bottom of the survey form

    var nextButton = document.createElement('button');
    nextButton.className = 'btn btn-primary';
    nextButton.type = 'button';
    nextButton.textContent = 'next »';

    switch (next) {
      case MainView.NEXT_RECORDS:
        // records section is next
        // if there are no records then clicking the button should add a new one automatically
        // the complexity of this dual action requires a click handler
        nextButton.addEventListener('click', function (event) {
          event.preventDefault();
          event.stopPropagation();

          _this7.fireEvent(MainController.EVENT_NEXT_TO_RECORDS);
        });
        break;

      case MainView.NEXT_SURVEY_SECTION:
        // there's another survey section
        var nextSection = SurveyForm.sections[formIndex + 1];
        nextButton.setAttribute('data-toggle', 'collapse');
        nextButton.setAttribute('data-target', "#survey-".concat(formIndex + 1, "-").concat(nextSection.sectionNavigationKey));
        nextButton.title = nextSection.sectionTitle;
        break;

      case MainView.NEXT_IS_FINAL:
        nextButton.textContent = 'finish';
        nextButton.className = 'btn btn-primary btn-md-lg mt-2 mb-3';
        nextButton.type = 'button';
        nextButton.addEventListener('click', function () {
          _this7.controller.app.router.navigate('/list/'); // display the finish dialogue box


          $("#".concat(FINISH_MODAL_ID)).modal();
        });
        break;

      default:
        throw new Error("Unrecognized next section keyword '".concat(next, "'"));
    }

    formElement.appendChild(nextButton);
    var cardId = Form.nextId;
    accordionEl.appendChild(this.card({
      cardId: cardId,
      cardHeadingId: Form.nextId,
      collapsed: this.controller.surveySection !== sectionClass.sectionNavigationKey,
      headingButtonId: Form.nextId,
      headingHTML: sectionClass.sectionTitle,
      headingNonbuttonHTML: "<small class=\"btn d-md-none\" style=\"margin: 0; padding: 0;\">(<a href=\"/app/list/survey/".concat(sectionClass.sectionNavigationKey, "/help\" data-help-link=\"/list/survey/").concat(sectionClass.sectionNavigationKey, "/help\">help</a>)</small>"),
      headingValidationWarningHTML: 'Please check the form for some missing responses.',
      cardDescriptionId: "survey-".concat(formIndex, "-").concat(sectionClass.sectionNavigationKey),
      // Form.nextId,
      parentContainerId: accordionEl.id,
      bodyContentElement: formElement,
      dataAttributes: {
        sectionkey: sectionClass.sectionNavigationKey
      }
    })); // cannot call registerForm until the form is part of the document

    this.controller.survey.registerForm(surveyFormSection);
    surveyFormSection.addListener(SurveyForm.EVENT_VALIDATION_STATE_CHANGE, function (params) {
      var cardEl = document.getElementById(cardId);

      if (params.isValid) {
        cardEl.classList.remove('is-invalid');
      } else {
        cardEl.classList.add('is-invalid');
      }
    });
  }

  function _appendOccurrenceListContainer2() {
    var accordionEl = document.getElementById(this.leftPanelAccordionId);
    var content = document.createDocumentFragment();
    var summaryEl = content.appendChild(document.createElement('p')); // noinspection HtmlUnknownTarget

    summaryEl.innerHTML = "".concat(this.occurrenceSummaryText, "<small class=\"d-block d-md-none\"><a href=\"/app/list/record/help\">(help)</a></small>");
    var newButtonEl = content.appendChild(document.createElement('button'));
    newButtonEl.type = 'button';
    newButtonEl.className = 'btn btn-primary btn-lg mb-2';
    newButtonEl.innerText = 'Add a plant record.';
    newButtonEl.addEventListener('click', this.newButtonClickHandler.bind(this));
    var recordListContainer = content.appendChild(document.createElement('div'));
    recordListContainer.id = OCCURRENCE_LIST_CONTAINER_ID;
    accordionEl.appendChild(this.card({
      cardId: Form.nextId,
      cardHeadingId: Form.nextId,
      collapsed: this.controller.viewSubcontext !== 'record',
      headingButtonId: Form.nextId,
      headingHTML: 'Your plant records',
      cardDescriptionId: Form.nextId,
      parentContainerId: accordionEl.id,
      bodyContentElement: content,
      dataAttributes: {
        sectionkey: 'record'
      }
    }));
  }

  function _buildOccurrenceList2() {
    var listContainer = document.getElementById(OCCURRENCE_LIST_CONTAINER_ID);

    if (!listContainer) {
      throw new InternalAppError("Failed to find list container.");
    }

    _classPrivateMethodGet(this, _clearOccurrenceListeners, _clearOccurrenceListeners2).call(this);

    var occurrencesHtml = []; // loop through entries sorted by creation date, most recent first

    var _iterator4 = _createForOfIteratorHelper(_toConsumableArray(this.controller.occurrences.entries()).sort(function (a, b) {
      return b[1].createdStamp - a[1].createdStamp;
    })),
        _step4;

    try {
      for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
        var occurrenceTuple = _step4.value;
        var occurrence = occurrenceTuple[1];
        console.log("displaying '".concat(occurrence.id, "'"));

        if (!occurrence.deleted) {
          var valid = occurrence.isNew || occurrence.evaluateCompletionStatus(OccurrenceForm.properties).requiredFieldsPresent;
          occurrencesHtml.push("<div class=\"card".concat(valid ? '' : ' is-invalid', "\" id=\"card_").concat(occurrence.id, "\">\n    ").concat(_classPrivateMethodGet(this, _occurrenceSummaryHTML, _occurrenceSummaryHTML2).call(this, occurrence), "\n</div>"));
          _classPrivateFieldGet(this, _occurrenceChangeHandles)[occurrence.id] = occurrence.addListener(Occurrence.EVENT_MODIFIED, this.occurrenceChangeHandler.bind(this), {
            occurrenceId: occurrence.id
          });
        }
      }
    } catch (err) {
      _iterator4.e(err);
    } finally {
      _iterator4.f();
    }

    listContainer.className = 'accordion';
    listContainer.innerHTML = occurrencesHtml.join('');
    /**
     * need to manually intercept clicks on the delete occurrence button
     * to prevent click also triggering an accordion toggle
     */

    listContainer.addEventListener('click',
    /** @param {MouseEvent} event */
    function (event) {
      var targetButtonEl = event.target.closest('button');

      if (targetButtonEl && targetButtonEl.hasAttribute('data-toggle') && targetButtonEl.getAttribute('data-toggle') === 'modal') {
        // annotate the delete record modal dialogue box with the occurrence id
        document.getElementById("".concat(DELETE_OCCURRENCE_MODAL_ID, "confirmed")).setAttribute('data-occurrenceid', targetButtonEl.getAttribute('data-occurrenceid')); // display the dialogue box

        $(targetButtonEl.getAttribute('data-target')).modal();
        event.preventDefault();
        event.stopPropagation();
      }
    });
  }

  function _occurrenceSummaryHTML2(occurrence) {
    return "<div class=\"card-header pointer pl-2 pr-2 pt-2 pb-2\" id=\"heading_".concat(occurrence.id, "\" data-toggle=\"collapse\" data-target=\"#description_").concat(occurrence.id, "\">\n    <div class=\"float-right\">\n        <button type=\"button\" class=\"btn btn-outline-danger delete-occurrence-button\" data-toggle=\"modal\" data-target=\"#").concat(DELETE_OCCURRENCE_MODAL_ID, "\" data-occurrenceid=\"").concat(occurrence.id, "\"><i class=\"material-icons\">delete</i></button>\n    </div>\n    <h2 class=\"mb-0 pb-0 mt-0 pt-0 pl-0 ml-0\">\n        <button class=\"btn btn-link").concat(this.controller.currentOccurrenceId === occurrence.id ? '' : ' collapsed', " pt-0 pb-0 pl-0\" id=\"headingbutton_").concat(occurrence.id, "\" type=\"button\" data-toggle=\"collapse\" data-target=\"#description_").concat(occurrence.id, "\" aria-expanded=\"").concat(this.controller.currentOccurrenceId === occurrence.id ? 'true' : 'false', "\" aria-controls=\"description_").concat(occurrence.id, "\">\n          ").concat(this.occurrenceSummaryHeadingHTML(occurrence), "\n        </button>\n    </h2>\n    <div class=\"card-invalid-feedback\">\n        <small>Please check for errors or missing details.</small>\n    </div>\n</div>\n<div id=\"description_").concat(occurrence.id, "\" class=\"collapse").concat(this.controller.currentOccurrenceId === occurrence.id ? ' show' : '', "\" aria-labelledby=\"heading_").concat(occurrence.id, "\" data-parent=\"#").concat(OCCURRENCE_LIST_CONTAINER_ID, "\" data-occurrenceid=\"").concat(occurrence.id, "\">\n  <div class=\"card-body\">\n    ").concat(this.occurrenceSummaryBodyHTML(occurrence), "\n  </div>\n</div>");
  }

  _defineProperty$1(MainView, "NEXT_RECORDS", 'records');

  _defineProperty$1(MainView, "NEXT_SURVEY_SECTION", 'survey');

  _defineProperty$1(MainView, "NEXT_IS_FINAL", 'last');

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
  }

  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function");
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        writable: true,
        configurable: true
      }
    });
    if (superClass) _setPrototypeOf(subClass, superClass);
  }

  function _getPrototypeOf(o) {
    _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
      return o.__proto__ || Object.getPrototypeOf(o);
    };
    return _getPrototypeOf(o);
  }

  function _setPrototypeOf(o, p) {
    _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
      o.__proto__ = p;
      return o;
    };

    return _setPrototypeOf(o, p);
  }

  function _isNativeReflectConstruct() {
    if (typeof Reflect === "undefined" || !Reflect.construct) return false;
    if (Reflect.construct.sham) return false;
    if (typeof Proxy === "function") return true;

    try {
      Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
      return true;
    } catch (e) {
      return false;
    }
  }

  function _assertThisInitialized(self) {
    if (self === void 0) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return self;
  }

  function _possibleConstructorReturn(self, call) {
    if (call && (typeof call === "object" || typeof call === "function")) {
      return call;
    } else if (call !== void 0) {
      throw new TypeError("Derived constructors may only return object or undefined");
    }

    return _assertThisInitialized(self);
  }

  function _createSuper(Derived) {
    var hasNativeReflectConstruct = _isNativeReflectConstruct();

    return function _createSuperInternal() {
      var Super = _getPrototypeOf(Derived),
          result;

      if (hasNativeReflectConstruct) {
        var NewTarget = _getPrototypeOf(this).constructor;

        result = Reflect.construct(Super, arguments, NewTarget);
      } else {
        result = Super.apply(this, arguments);
      }

      return _possibleConstructorReturn(this, result);
    };
  }

  var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

  var check = function (it) {
    return it && it.Math == Math && it;
  };

  // https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
  var global$b =
    // eslint-disable-next-line es/no-global-this -- safe
    check(typeof globalThis == 'object' && globalThis) ||
    check(typeof window == 'object' && window) ||
    // eslint-disable-next-line no-restricted-globals -- safe
    check(typeof self == 'object' && self) ||
    check(typeof commonjsGlobal == 'object' && commonjsGlobal) ||
    // eslint-disable-next-line no-new-func -- fallback
    (function () { return this; })() || Function('return this')();

  var objectGetOwnPropertyDescriptor = {};

  var fails$8 = function (exec) {
    try {
      return !!exec();
    } catch (error) {
      return true;
    }
  };

  var fails$7 = fails$8;

  // Detect IE8's incomplete defineProperty implementation
  var descriptors = !fails$7(function () {
    // eslint-disable-next-line es/no-object-defineproperty -- required for testing
    return Object.defineProperty({}, 1, { get: function () { return 7; } })[1] != 7;
  });

  var objectPropertyIsEnumerable = {};

  var $propertyIsEnumerable = {}.propertyIsEnumerable;
  // eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
  var getOwnPropertyDescriptor$1 = Object.getOwnPropertyDescriptor;

  // Nashorn ~ JDK8 bug
  var NASHORN_BUG = getOwnPropertyDescriptor$1 && !$propertyIsEnumerable.call({ 1: 2 }, 1);

  // `Object.prototype.propertyIsEnumerable` method implementation
  // https://tc39.es/ecma262/#sec-object.prototype.propertyisenumerable
  objectPropertyIsEnumerable.f = NASHORN_BUG ? function propertyIsEnumerable(V) {
    var descriptor = getOwnPropertyDescriptor$1(this, V);
    return !!descriptor && descriptor.enumerable;
  } : $propertyIsEnumerable;

  var createPropertyDescriptor$3 = function (bitmap, value) {
    return {
      enumerable: !(bitmap & 1),
      configurable: !(bitmap & 2),
      writable: !(bitmap & 4),
      value: value
    };
  };

  var toString = {}.toString;

  var classofRaw$1 = function (it) {
    return toString.call(it).slice(8, -1);
  };

  var fails$6 = fails$8;
  var classof$3 = classofRaw$1;

  var split = ''.split;

  // fallback for non-array-like ES3 and non-enumerable old V8 strings
  var indexedObject = fails$6(function () {
    // throws an error in rhino, see https://github.com/mozilla/rhino/issues/346
    // eslint-disable-next-line no-prototype-builtins -- safe
    return !Object('z').propertyIsEnumerable(0);
  }) ? function (it) {
    return classof$3(it) == 'String' ? split.call(it, '') : Object(it);
  } : Object;

  // `RequireObjectCoercible` abstract operation
  // https://tc39.es/ecma262/#sec-requireobjectcoercible
  var requireObjectCoercible$2 = function (it) {
    if (it == undefined) throw TypeError("Can't call method on " + it);
    return it;
  };

  // toObject with fallback for non-array-like ES3 strings
  var IndexedObject = indexedObject;
  var requireObjectCoercible$1 = requireObjectCoercible$2;

  var toIndexedObject$3 = function (it) {
    return IndexedObject(requireObjectCoercible$1(it));
  };

  // `IsCallable` abstract operation
  // https://tc39.es/ecma262/#sec-iscallable
  var isCallable$b = function (argument) {
    return typeof argument === 'function';
  };

  var isCallable$a = isCallable$b;

  var isObject$7 = function (it) {
    return typeof it === 'object' ? it !== null : isCallable$a(it);
  };

  var global$a = global$b;
  var isCallable$9 = isCallable$b;

  var aFunction = function (argument) {
    return isCallable$9(argument) ? argument : undefined;
  };

  var getBuiltIn$4 = function (namespace, method) {
    return arguments.length < 2 ? aFunction(global$a[namespace]) : global$a[namespace] && global$a[namespace][method];
  };

  var getBuiltIn$3 = getBuiltIn$4;

  var engineUserAgent = getBuiltIn$3('navigator', 'userAgent') || '';

  var global$9 = global$b;
  var userAgent = engineUserAgent;

  var process = global$9.process;
  var Deno = global$9.Deno;
  var versions = process && process.versions || Deno && Deno.version;
  var v8 = versions && versions.v8;
  var match, version;

  if (v8) {
    match = v8.split('.');
    version = match[0] < 4 ? 1 : match[0] + match[1];
  } else if (userAgent) {
    match = userAgent.match(/Edge\/(\d+)/);
    if (!match || match[1] >= 74) {
      match = userAgent.match(/Chrome\/(\d+)/);
      if (match) version = match[1];
    }
  }

  var engineV8Version = version && +version;

  /* eslint-disable es/no-symbol -- required for testing */

  var V8_VERSION$2 = engineV8Version;
  var fails$5 = fails$8;

  // eslint-disable-next-line es/no-object-getownpropertysymbols -- required for testing
  var nativeSymbol = !!Object.getOwnPropertySymbols && !fails$5(function () {
    var symbol = Symbol();
    // Chrome 38 Symbol has incorrect toString conversion
    // `get-own-property-symbols` polyfill symbols converted to object are not Symbol instances
    return !String(symbol) || !(Object(symbol) instanceof Symbol) ||
      // Chrome 38-40 symbols are not inherited from DOM collections prototypes to instances
      !Symbol.sham && V8_VERSION$2 && V8_VERSION$2 < 41;
  });

  /* eslint-disable es/no-symbol -- required for testing */

  var NATIVE_SYMBOL$1 = nativeSymbol;

  var useSymbolAsUid = NATIVE_SYMBOL$1
    && !Symbol.sham
    && typeof Symbol.iterator == 'symbol';

  var isCallable$8 = isCallable$b;
  var getBuiltIn$2 = getBuiltIn$4;
  var USE_SYMBOL_AS_UID$1 = useSymbolAsUid;

  var isSymbol$2 = USE_SYMBOL_AS_UID$1 ? function (it) {
    return typeof it == 'symbol';
  } : function (it) {
    var $Symbol = getBuiltIn$2('Symbol');
    return isCallable$8($Symbol) && Object(it) instanceof $Symbol;
  };

  var tryToString$1 = function (argument) {
    try {
      return String(argument);
    } catch (error) {
      return 'Object';
    }
  };

  var isCallable$7 = isCallable$b;
  var tryToString = tryToString$1;

  // `Assert: IsCallable(argument) is true`
  var aCallable$1 = function (argument) {
    if (isCallable$7(argument)) return argument;
    throw TypeError(tryToString(argument) + ' is not a function');
  };

  var aCallable = aCallable$1;

  // `GetMethod` abstract operation
  // https://tc39.es/ecma262/#sec-getmethod
  var getMethod$1 = function (V, P) {
    var func = V[P];
    return func == null ? undefined : aCallable(func);
  };

  var isCallable$6 = isCallable$b;
  var isObject$6 = isObject$7;

  // `OrdinaryToPrimitive` abstract operation
  // https://tc39.es/ecma262/#sec-ordinarytoprimitive
  var ordinaryToPrimitive$1 = function (input, pref) {
    var fn, val;
    if (pref === 'string' && isCallable$6(fn = input.toString) && !isObject$6(val = fn.call(input))) return val;
    if (isCallable$6(fn = input.valueOf) && !isObject$6(val = fn.call(input))) return val;
    if (pref !== 'string' && isCallable$6(fn = input.toString) && !isObject$6(val = fn.call(input))) return val;
    throw TypeError("Can't convert object to primitive value");
  };

  var shared$3 = {exports: {}};

  var global$8 = global$b;

  var setGlobal$3 = function (key, value) {
    try {
      // eslint-disable-next-line es/no-object-defineproperty -- safe
      Object.defineProperty(global$8, key, { value: value, configurable: true, writable: true });
    } catch (error) {
      global$8[key] = value;
    } return value;
  };

  var global$7 = global$b;
  var setGlobal$2 = setGlobal$3;

  var SHARED = '__core-js_shared__';
  var store$3 = global$7[SHARED] || setGlobal$2(SHARED, {});

  var sharedStore = store$3;

  var store$2 = sharedStore;

  (shared$3.exports = function (key, value) {
    return store$2[key] || (store$2[key] = value !== undefined ? value : {});
  })('versions', []).push({
    version: '3.18.3',
    mode: 'global',
    copyright: '© 2021 Denis Pushkarev (zloirock.ru)'
  });

  var requireObjectCoercible = requireObjectCoercible$2;

  // `ToObject` abstract operation
  // https://tc39.es/ecma262/#sec-toobject
  var toObject$2 = function (argument) {
    return Object(requireObjectCoercible(argument));
  };

  var toObject$1 = toObject$2;

  var hasOwnProperty = {}.hasOwnProperty;

  // `HasOwnProperty` abstract operation
  // https://tc39.es/ecma262/#sec-hasownproperty
  var hasOwnProperty_1 = Object.hasOwn || function hasOwn(it, key) {
    return hasOwnProperty.call(toObject$1(it), key);
  };

  var id = 0;
  var postfix = Math.random();

  var uid$2 = function (key) {
    return 'Symbol(' + String(key === undefined ? '' : key) + ')_' + (++id + postfix).toString(36);
  };

  var global$6 = global$b;
  var shared$2 = shared$3.exports;
  var hasOwn$6 = hasOwnProperty_1;
  var uid$1 = uid$2;
  var NATIVE_SYMBOL = nativeSymbol;
  var USE_SYMBOL_AS_UID = useSymbolAsUid;

  var WellKnownSymbolsStore = shared$2('wks');
  var Symbol$1 = global$6.Symbol;
  var createWellKnownSymbol = USE_SYMBOL_AS_UID ? Symbol$1 : Symbol$1 && Symbol$1.withoutSetter || uid$1;

  var wellKnownSymbol$6 = function (name) {
    if (!hasOwn$6(WellKnownSymbolsStore, name) || !(NATIVE_SYMBOL || typeof WellKnownSymbolsStore[name] == 'string')) {
      if (NATIVE_SYMBOL && hasOwn$6(Symbol$1, name)) {
        WellKnownSymbolsStore[name] = Symbol$1[name];
      } else {
        WellKnownSymbolsStore[name] = createWellKnownSymbol('Symbol.' + name);
      }
    } return WellKnownSymbolsStore[name];
  };

  var isObject$5 = isObject$7;
  var isSymbol$1 = isSymbol$2;
  var getMethod = getMethod$1;
  var ordinaryToPrimitive = ordinaryToPrimitive$1;
  var wellKnownSymbol$5 = wellKnownSymbol$6;

  var TO_PRIMITIVE = wellKnownSymbol$5('toPrimitive');

  // `ToPrimitive` abstract operation
  // https://tc39.es/ecma262/#sec-toprimitive
  var toPrimitive$1 = function (input, pref) {
    if (!isObject$5(input) || isSymbol$1(input)) return input;
    var exoticToPrim = getMethod(input, TO_PRIMITIVE);
    var result;
    if (exoticToPrim) {
      if (pref === undefined) pref = 'default';
      result = exoticToPrim.call(input, pref);
      if (!isObject$5(result) || isSymbol$1(result)) return result;
      throw TypeError("Can't convert object to primitive value");
    }
    if (pref === undefined) pref = 'number';
    return ordinaryToPrimitive(input, pref);
  };

  var toPrimitive = toPrimitive$1;
  var isSymbol = isSymbol$2;

  // `ToPropertyKey` abstract operation
  // https://tc39.es/ecma262/#sec-topropertykey
  var toPropertyKey$3 = function (argument) {
    var key = toPrimitive(argument, 'string');
    return isSymbol(key) ? key : String(key);
  };

  var global$5 = global$b;
  var isObject$4 = isObject$7;

  var document$1 = global$5.document;
  // typeof document.createElement is 'object' in old IE
  var EXISTS$1 = isObject$4(document$1) && isObject$4(document$1.createElement);

  var documentCreateElement = function (it) {
    return EXISTS$1 ? document$1.createElement(it) : {};
  };

  var DESCRIPTORS$4 = descriptors;
  var fails$4 = fails$8;
  var createElement = documentCreateElement;

  // Thank's IE8 for his funny defineProperty
  var ie8DomDefine = !DESCRIPTORS$4 && !fails$4(function () {
    // eslint-disable-next-line es/no-object-defineproperty -- requied for testing
    return Object.defineProperty(createElement('div'), 'a', {
      get: function () { return 7; }
    }).a != 7;
  });

  var DESCRIPTORS$3 = descriptors;
  var propertyIsEnumerableModule = objectPropertyIsEnumerable;
  var createPropertyDescriptor$2 = createPropertyDescriptor$3;
  var toIndexedObject$2 = toIndexedObject$3;
  var toPropertyKey$2 = toPropertyKey$3;
  var hasOwn$5 = hasOwnProperty_1;
  var IE8_DOM_DEFINE$1 = ie8DomDefine;

  // eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
  var $getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

  // `Object.getOwnPropertyDescriptor` method
  // https://tc39.es/ecma262/#sec-object.getownpropertydescriptor
  objectGetOwnPropertyDescriptor.f = DESCRIPTORS$3 ? $getOwnPropertyDescriptor : function getOwnPropertyDescriptor(O, P) {
    O = toIndexedObject$2(O);
    P = toPropertyKey$2(P);
    if (IE8_DOM_DEFINE$1) try {
      return $getOwnPropertyDescriptor(O, P);
    } catch (error) { /* empty */ }
    if (hasOwn$5(O, P)) return createPropertyDescriptor$2(!propertyIsEnumerableModule.f.call(O, P), O[P]);
  };

  var objectDefineProperty = {};

  var isObject$3 = isObject$7;

  // `Assert: Type(argument) is Object`
  var anObject$2 = function (argument) {
    if (isObject$3(argument)) return argument;
    throw TypeError(String(argument) + ' is not an object');
  };

  var DESCRIPTORS$2 = descriptors;
  var IE8_DOM_DEFINE = ie8DomDefine;
  var anObject$1 = anObject$2;
  var toPropertyKey$1 = toPropertyKey$3;

  // eslint-disable-next-line es/no-object-defineproperty -- safe
  var $defineProperty = Object.defineProperty;

  // `Object.defineProperty` method
  // https://tc39.es/ecma262/#sec-object.defineproperty
  objectDefineProperty.f = DESCRIPTORS$2 ? $defineProperty : function defineProperty(O, P, Attributes) {
    anObject$1(O);
    P = toPropertyKey$1(P);
    anObject$1(Attributes);
    if (IE8_DOM_DEFINE) try {
      return $defineProperty(O, P, Attributes);
    } catch (error) { /* empty */ }
    if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported');
    if ('value' in Attributes) O[P] = Attributes.value;
    return O;
  };

  var DESCRIPTORS$1 = descriptors;
  var definePropertyModule$2 = objectDefineProperty;
  var createPropertyDescriptor$1 = createPropertyDescriptor$3;

  var createNonEnumerableProperty$3 = DESCRIPTORS$1 ? function (object, key, value) {
    return definePropertyModule$2.f(object, key, createPropertyDescriptor$1(1, value));
  } : function (object, key, value) {
    object[key] = value;
    return object;
  };

  var redefine$1 = {exports: {}};

  var isCallable$5 = isCallable$b;
  var store$1 = sharedStore;

  var functionToString = Function.toString;

  // this helper broken in `core-js@3.4.1-3.4.4`, so we can't use `shared` helper
  if (!isCallable$5(store$1.inspectSource)) {
    store$1.inspectSource = function (it) {
      return functionToString.call(it);
    };
  }

  var inspectSource$3 = store$1.inspectSource;

  var global$4 = global$b;
  var isCallable$4 = isCallable$b;
  var inspectSource$2 = inspectSource$3;

  var WeakMap$2 = global$4.WeakMap;

  var nativeWeakMap = isCallable$4(WeakMap$2) && /native code/.test(inspectSource$2(WeakMap$2));

  var shared$1 = shared$3.exports;
  var uid = uid$2;

  var keys = shared$1('keys');

  var sharedKey$1 = function (key) {
    return keys[key] || (keys[key] = uid(key));
  };

  var hiddenKeys$3 = {};

  var NATIVE_WEAK_MAP = nativeWeakMap;
  var global$3 = global$b;
  var isObject$2 = isObject$7;
  var createNonEnumerableProperty$2 = createNonEnumerableProperty$3;
  var hasOwn$4 = hasOwnProperty_1;
  var shared = sharedStore;
  var sharedKey = sharedKey$1;
  var hiddenKeys$2 = hiddenKeys$3;

  var OBJECT_ALREADY_INITIALIZED = 'Object already initialized';
  var WeakMap$1 = global$3.WeakMap;
  var set, get, has;

  var enforce = function (it) {
    return has(it) ? get(it) : set(it, {});
  };

  var getterFor = function (TYPE) {
    return function (it) {
      var state;
      if (!isObject$2(it) || (state = get(it)).type !== TYPE) {
        throw TypeError('Incompatible receiver, ' + TYPE + ' required');
      } return state;
    };
  };

  if (NATIVE_WEAK_MAP || shared.state) {
    var store = shared.state || (shared.state = new WeakMap$1());
    var wmget = store.get;
    var wmhas = store.has;
    var wmset = store.set;
    set = function (it, metadata) {
      if (wmhas.call(store, it)) throw new TypeError(OBJECT_ALREADY_INITIALIZED);
      metadata.facade = it;
      wmset.call(store, it, metadata);
      return metadata;
    };
    get = function (it) {
      return wmget.call(store, it) || {};
    };
    has = function (it) {
      return wmhas.call(store, it);
    };
  } else {
    var STATE = sharedKey('state');
    hiddenKeys$2[STATE] = true;
    set = function (it, metadata) {
      if (hasOwn$4(it, STATE)) throw new TypeError(OBJECT_ALREADY_INITIALIZED);
      metadata.facade = it;
      createNonEnumerableProperty$2(it, STATE, metadata);
      return metadata;
    };
    get = function (it) {
      return hasOwn$4(it, STATE) ? it[STATE] : {};
    };
    has = function (it) {
      return hasOwn$4(it, STATE);
    };
  }

  var internalState = {
    set: set,
    get: get,
    has: has,
    enforce: enforce,
    getterFor: getterFor
  };

  var DESCRIPTORS = descriptors;
  var hasOwn$3 = hasOwnProperty_1;

  var FunctionPrototype = Function.prototype;
  // eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
  var getDescriptor = DESCRIPTORS && Object.getOwnPropertyDescriptor;

  var EXISTS = hasOwn$3(FunctionPrototype, 'name');
  // additional protection from minified / mangled / dropped function names
  var PROPER = EXISTS && (function something() { /* empty */ }).name === 'something';
  var CONFIGURABLE = EXISTS && (!DESCRIPTORS || (DESCRIPTORS && getDescriptor(FunctionPrototype, 'name').configurable));

  var functionName = {
    EXISTS: EXISTS,
    PROPER: PROPER,
    CONFIGURABLE: CONFIGURABLE
  };

  var global$2 = global$b;
  var isCallable$3 = isCallable$b;
  var hasOwn$2 = hasOwnProperty_1;
  var createNonEnumerableProperty$1 = createNonEnumerableProperty$3;
  var setGlobal$1 = setGlobal$3;
  var inspectSource$1 = inspectSource$3;
  var InternalStateModule = internalState;
  var CONFIGURABLE_FUNCTION_NAME = functionName.CONFIGURABLE;

  var getInternalState = InternalStateModule.get;
  var enforceInternalState = InternalStateModule.enforce;
  var TEMPLATE = String(String).split('String');

  (redefine$1.exports = function (O, key, value, options) {
    var unsafe = options ? !!options.unsafe : false;
    var simple = options ? !!options.enumerable : false;
    var noTargetGet = options ? !!options.noTargetGet : false;
    var name = options && options.name !== undefined ? options.name : key;
    var state;
    if (isCallable$3(value)) {
      if (String(name).slice(0, 7) === 'Symbol(') {
        name = '[' + String(name).replace(/^Symbol\(([^)]*)\)/, '$1') + ']';
      }
      if (!hasOwn$2(value, 'name') || (CONFIGURABLE_FUNCTION_NAME && value.name !== name)) {
        createNonEnumerableProperty$1(value, 'name', name);
      }
      state = enforceInternalState(value);
      if (!state.source) {
        state.source = TEMPLATE.join(typeof name == 'string' ? name : '');
      }
    }
    if (O === global$2) {
      if (simple) O[key] = value;
      else setGlobal$1(key, value);
      return;
    } else if (!unsafe) {
      delete O[key];
    } else if (!noTargetGet && O[key]) {
      simple = true;
    }
    if (simple) O[key] = value;
    else createNonEnumerableProperty$1(O, key, value);
  // add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
  })(Function.prototype, 'toString', function toString() {
    return isCallable$3(this) && getInternalState(this).source || inspectSource$1(this);
  });

  var objectGetOwnPropertyNames = {};

  var ceil = Math.ceil;
  var floor = Math.floor;

  // `ToIntegerOrInfinity` abstract operation
  // https://tc39.es/ecma262/#sec-tointegerorinfinity
  var toIntegerOrInfinity$2 = function (argument) {
    var number = +argument;
    // eslint-disable-next-line no-self-compare -- safe
    return number !== number || number === 0 ? 0 : (number > 0 ? floor : ceil)(number);
  };

  var toIntegerOrInfinity$1 = toIntegerOrInfinity$2;

  var max = Math.max;
  var min$1 = Math.min;

  // Helper for a popular repeating case of the spec:
  // Let integer be ? ToInteger(index).
  // If integer < 0, let result be max((length + integer), 0); else let result be min(integer, length).
  var toAbsoluteIndex$1 = function (index, length) {
    var integer = toIntegerOrInfinity$1(index);
    return integer < 0 ? max(integer + length, 0) : min$1(integer, length);
  };

  var toIntegerOrInfinity = toIntegerOrInfinity$2;

  var min = Math.min;

  // `ToLength` abstract operation
  // https://tc39.es/ecma262/#sec-tolength
  var toLength$1 = function (argument) {
    return argument > 0 ? min(toIntegerOrInfinity(argument), 0x1FFFFFFFFFFFFF) : 0; // 2 ** 53 - 1 == 9007199254740991
  };

  var toLength = toLength$1;

  // `LengthOfArrayLike` abstract operation
  // https://tc39.es/ecma262/#sec-lengthofarraylike
  var lengthOfArrayLike$2 = function (obj) {
    return toLength(obj.length);
  };

  var toIndexedObject$1 = toIndexedObject$3;
  var toAbsoluteIndex = toAbsoluteIndex$1;
  var lengthOfArrayLike$1 = lengthOfArrayLike$2;

  // `Array.prototype.{ indexOf, includes }` methods implementation
  var createMethod = function (IS_INCLUDES) {
    return function ($this, el, fromIndex) {
      var O = toIndexedObject$1($this);
      var length = lengthOfArrayLike$1(O);
      var index = toAbsoluteIndex(fromIndex, length);
      var value;
      // Array#includes uses SameValueZero equality algorithm
      // eslint-disable-next-line no-self-compare -- NaN check
      if (IS_INCLUDES && el != el) while (length > index) {
        value = O[index++];
        // eslint-disable-next-line no-self-compare -- NaN check
        if (value != value) return true;
      // Array#indexOf ignores holes, Array#includes - not
      } else for (;length > index; index++) {
        if ((IS_INCLUDES || index in O) && O[index] === el) return IS_INCLUDES || index || 0;
      } return !IS_INCLUDES && -1;
    };
  };

  var arrayIncludes = {
    // `Array.prototype.includes` method
    // https://tc39.es/ecma262/#sec-array.prototype.includes
    includes: createMethod(true),
    // `Array.prototype.indexOf` method
    // https://tc39.es/ecma262/#sec-array.prototype.indexof
    indexOf: createMethod(false)
  };

  var hasOwn$1 = hasOwnProperty_1;
  var toIndexedObject = toIndexedObject$3;
  var indexOf = arrayIncludes.indexOf;
  var hiddenKeys$1 = hiddenKeys$3;

  var objectKeysInternal = function (object, names) {
    var O = toIndexedObject(object);
    var i = 0;
    var result = [];
    var key;
    for (key in O) !hasOwn$1(hiddenKeys$1, key) && hasOwn$1(O, key) && result.push(key);
    // Don't enum bug & hidden keys
    while (names.length > i) if (hasOwn$1(O, key = names[i++])) {
      ~indexOf(result, key) || result.push(key);
    }
    return result;
  };

  // IE8- don't enum bug keys
  var enumBugKeys$1 = [
    'constructor',
    'hasOwnProperty',
    'isPrototypeOf',
    'propertyIsEnumerable',
    'toLocaleString',
    'toString',
    'valueOf'
  ];

  var internalObjectKeys = objectKeysInternal;
  var enumBugKeys = enumBugKeys$1;

  var hiddenKeys = enumBugKeys.concat('length', 'prototype');

  // `Object.getOwnPropertyNames` method
  // https://tc39.es/ecma262/#sec-object.getownpropertynames
  // eslint-disable-next-line es/no-object-getownpropertynames -- safe
  objectGetOwnPropertyNames.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
    return internalObjectKeys(O, hiddenKeys);
  };

  var objectGetOwnPropertySymbols = {};

  // eslint-disable-next-line es/no-object-getownpropertysymbols -- safe
  objectGetOwnPropertySymbols.f = Object.getOwnPropertySymbols;

  var getBuiltIn$1 = getBuiltIn$4;
  var getOwnPropertyNamesModule = objectGetOwnPropertyNames;
  var getOwnPropertySymbolsModule = objectGetOwnPropertySymbols;
  var anObject = anObject$2;

  // all object keys, includes non-enumerable and symbols
  var ownKeys$1 = getBuiltIn$1('Reflect', 'ownKeys') || function ownKeys(it) {
    var keys = getOwnPropertyNamesModule.f(anObject(it));
    var getOwnPropertySymbols = getOwnPropertySymbolsModule.f;
    return getOwnPropertySymbols ? keys.concat(getOwnPropertySymbols(it)) : keys;
  };

  var hasOwn = hasOwnProperty_1;
  var ownKeys = ownKeys$1;
  var getOwnPropertyDescriptorModule = objectGetOwnPropertyDescriptor;
  var definePropertyModule$1 = objectDefineProperty;

  var copyConstructorProperties$1 = function (target, source) {
    var keys = ownKeys(source);
    var defineProperty = definePropertyModule$1.f;
    var getOwnPropertyDescriptor = getOwnPropertyDescriptorModule.f;
    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      if (!hasOwn(target, key)) defineProperty(target, key, getOwnPropertyDescriptor(source, key));
    }
  };

  var fails$3 = fails$8;
  var isCallable$2 = isCallable$b;

  var replacement = /#|\.prototype\./;

  var isForced$1 = function (feature, detection) {
    var value = data[normalize(feature)];
    return value == POLYFILL ? true
      : value == NATIVE ? false
      : isCallable$2(detection) ? fails$3(detection)
      : !!detection;
  };

  var normalize = isForced$1.normalize = function (string) {
    return String(string).replace(replacement, '.').toLowerCase();
  };

  var data = isForced$1.data = {};
  var NATIVE = isForced$1.NATIVE = 'N';
  var POLYFILL = isForced$1.POLYFILL = 'P';

  var isForced_1 = isForced$1;

  var global$1 = global$b;
  var getOwnPropertyDescriptor = objectGetOwnPropertyDescriptor.f;
  var createNonEnumerableProperty = createNonEnumerableProperty$3;
  var redefine = redefine$1.exports;
  var setGlobal = setGlobal$3;
  var copyConstructorProperties = copyConstructorProperties$1;
  var isForced = isForced_1;

  /*
    options.target      - name of the target object
    options.global      - target is the global object
    options.stat        - export as static methods of target
    options.proto       - export as prototype methods of target
    options.real        - real prototype method for the `pure` version
    options.forced      - export even if the native feature is available
    options.bind        - bind methods to the target, required for the `pure` version
    options.wrap        - wrap constructors to preventing global pollution, required for the `pure` version
    options.unsafe      - use the simple assignment of property instead of delete + defineProperty
    options.sham        - add a flag to not completely full polyfills
    options.enumerable  - export as enumerable property
    options.noTargetGet - prevent calling a getter on target
    options.name        - the .name of the function if it does not match the key
  */
  var _export = function (options, source) {
    var TARGET = options.target;
    var GLOBAL = options.global;
    var STATIC = options.stat;
    var FORCED, target, key, targetProperty, sourceProperty, descriptor;
    if (GLOBAL) {
      target = global$1;
    } else if (STATIC) {
      target = global$1[TARGET] || setGlobal(TARGET, {});
    } else {
      target = (global$1[TARGET] || {}).prototype;
    }
    if (target) for (key in source) {
      sourceProperty = source[key];
      if (options.noTargetGet) {
        descriptor = getOwnPropertyDescriptor(target, key);
        targetProperty = descriptor && descriptor.value;
      } else targetProperty = target[key];
      FORCED = isForced(GLOBAL ? key : TARGET + (STATIC ? '.' : '#') + key, options.forced);
      // contained in target
      if (!FORCED && targetProperty !== undefined) {
        if (typeof sourceProperty === typeof targetProperty) continue;
        copyConstructorProperties(sourceProperty, targetProperty);
      }
      // add a flag to not completely full polyfills
      if (options.sham || (targetProperty && targetProperty.sham)) {
        createNonEnumerableProperty(sourceProperty, 'sham', true);
      }
      // extend global
      redefine(target, key, sourceProperty, options);
    }
  };

  var classof$2 = classofRaw$1;

  // `IsArray` abstract operation
  // https://tc39.es/ecma262/#sec-isarray
  // eslint-disable-next-line es/no-array-isarray -- safe
  var isArray$2 = Array.isArray || function isArray(argument) {
    return classof$2(argument) == 'Array';
  };

  var toPropertyKey = toPropertyKey$3;
  var definePropertyModule = objectDefineProperty;
  var createPropertyDescriptor = createPropertyDescriptor$3;

  var createProperty$1 = function (object, key, value) {
    var propertyKey = toPropertyKey(key);
    if (propertyKey in object) definePropertyModule.f(object, propertyKey, createPropertyDescriptor(0, value));
    else object[propertyKey] = value;
  };

  var wellKnownSymbol$4 = wellKnownSymbol$6;

  var TO_STRING_TAG$1 = wellKnownSymbol$4('toStringTag');
  var test = {};

  test[TO_STRING_TAG$1] = 'z';

  var toStringTagSupport = String(test) === '[object z]';

  var TO_STRING_TAG_SUPPORT = toStringTagSupport;
  var isCallable$1 = isCallable$b;
  var classofRaw = classofRaw$1;
  var wellKnownSymbol$3 = wellKnownSymbol$6;

  var TO_STRING_TAG = wellKnownSymbol$3('toStringTag');
  // ES3 wrong here
  var CORRECT_ARGUMENTS = classofRaw(function () { return arguments; }()) == 'Arguments';

  // fallback for IE11 Script Access Denied error
  var tryGet = function (it, key) {
    try {
      return it[key];
    } catch (error) { /* empty */ }
  };

  // getting tag from ES6+ `Object.prototype.toString`
  var classof$1 = TO_STRING_TAG_SUPPORT ? classofRaw : function (it) {
    var O, tag, result;
    return it === undefined ? 'Undefined' : it === null ? 'Null'
      // @@toStringTag case
      : typeof (tag = tryGet(O = Object(it), TO_STRING_TAG)) == 'string' ? tag
      // builtinTag case
      : CORRECT_ARGUMENTS ? classofRaw(O)
      // ES3 arguments fallback
      : (result = classofRaw(O)) == 'Object' && isCallable$1(O.callee) ? 'Arguments' : result;
  };

  var fails$2 = fails$8;
  var isCallable = isCallable$b;
  var classof = classof$1;
  var getBuiltIn = getBuiltIn$4;
  var inspectSource = inspectSource$3;

  var empty = [];
  var construct = getBuiltIn('Reflect', 'construct');
  var constructorRegExp = /^\s*(?:class|function)\b/;
  var exec = constructorRegExp.exec;
  var INCORRECT_TO_STRING = !constructorRegExp.exec(function () { /* empty */ });

  var isConstructorModern = function (argument) {
    if (!isCallable(argument)) return false;
    try {
      construct(Object, empty, argument);
      return true;
    } catch (error) {
      return false;
    }
  };

  var isConstructorLegacy = function (argument) {
    if (!isCallable(argument)) return false;
    switch (classof(argument)) {
      case 'AsyncFunction':
      case 'GeneratorFunction':
      case 'AsyncGeneratorFunction': return false;
      // we can't check .prototype since constructors produced by .bind haven't it
    } return INCORRECT_TO_STRING || !!exec.call(constructorRegExp, inspectSource(argument));
  };

  // `IsConstructor` abstract operation
  // https://tc39.es/ecma262/#sec-isconstructor
  var isConstructor$1 = !construct || fails$2(function () {
    var called;
    return isConstructorModern(isConstructorModern.call)
      || !isConstructorModern(Object)
      || !isConstructorModern(function () { called = true; })
      || called;
  }) ? isConstructorLegacy : isConstructorModern;

  var isArray$1 = isArray$2;
  var isConstructor = isConstructor$1;
  var isObject$1 = isObject$7;
  var wellKnownSymbol$2 = wellKnownSymbol$6;

  var SPECIES$1 = wellKnownSymbol$2('species');

  // a part of `ArraySpeciesCreate` abstract operation
  // https://tc39.es/ecma262/#sec-arrayspeciescreate
  var arraySpeciesConstructor$1 = function (originalArray) {
    var C;
    if (isArray$1(originalArray)) {
      C = originalArray.constructor;
      // cross-realm fallback
      if (isConstructor(C) && (C === Array || isArray$1(C.prototype))) C = undefined;
      else if (isObject$1(C)) {
        C = C[SPECIES$1];
        if (C === null) C = undefined;
      }
    } return C === undefined ? Array : C;
  };

  var arraySpeciesConstructor = arraySpeciesConstructor$1;

  // `ArraySpeciesCreate` abstract operation
  // https://tc39.es/ecma262/#sec-arrayspeciescreate
  var arraySpeciesCreate$1 = function (originalArray, length) {
    return new (arraySpeciesConstructor(originalArray))(length === 0 ? 0 : length);
  };

  var fails$1 = fails$8;
  var wellKnownSymbol$1 = wellKnownSymbol$6;
  var V8_VERSION$1 = engineV8Version;

  var SPECIES = wellKnownSymbol$1('species');

  var arrayMethodHasSpeciesSupport$1 = function (METHOD_NAME) {
    // We can't use this feature detection in V8 since it causes
    // deoptimization and serious performance degradation
    // https://github.com/zloirock/core-js/issues/677
    return V8_VERSION$1 >= 51 || !fails$1(function () {
      var array = [];
      var constructor = array.constructor = {};
      constructor[SPECIES] = function () {
        return { foo: 1 };
      };
      return array[METHOD_NAME](Boolean).foo !== 1;
    });
  };

  var $$1 = _export;
  var fails = fails$8;
  var isArray = isArray$2;
  var isObject = isObject$7;
  var toObject = toObject$2;
  var lengthOfArrayLike = lengthOfArrayLike$2;
  var createProperty = createProperty$1;
  var arraySpeciesCreate = arraySpeciesCreate$1;
  var arrayMethodHasSpeciesSupport = arrayMethodHasSpeciesSupport$1;
  var wellKnownSymbol = wellKnownSymbol$6;
  var V8_VERSION = engineV8Version;

  var IS_CONCAT_SPREADABLE = wellKnownSymbol('isConcatSpreadable');
  var MAX_SAFE_INTEGER = 0x1FFFFFFFFFFFFF;
  var MAXIMUM_ALLOWED_INDEX_EXCEEDED = 'Maximum allowed index exceeded';

  // We can't use this feature detection in V8 since it causes
  // deoptimization and serious performance degradation
  // https://github.com/zloirock/core-js/issues/679
  var IS_CONCAT_SPREADABLE_SUPPORT = V8_VERSION >= 51 || !fails(function () {
    var array = [];
    array[IS_CONCAT_SPREADABLE] = false;
    return array.concat()[0] !== array;
  });

  var SPECIES_SUPPORT = arrayMethodHasSpeciesSupport('concat');

  var isConcatSpreadable = function (O) {
    if (!isObject(O)) return false;
    var spreadable = O[IS_CONCAT_SPREADABLE];
    return spreadable !== undefined ? !!spreadable : isArray(O);
  };

  var FORCED = !IS_CONCAT_SPREADABLE_SUPPORT || !SPECIES_SUPPORT;

  // `Array.prototype.concat` method
  // https://tc39.es/ecma262/#sec-array.prototype.concat
  // with adding support of @@isConcatSpreadable and @@species
  $$1({ target: 'Array', proto: true, forced: FORCED }, {
    // eslint-disable-next-line no-unused-vars -- required for `.length`
    concat: function concat(arg) {
      var O = toObject(this);
      var A = arraySpeciesCreate(O, 0);
      var n = 0;
      var i, k, length, len, E;
      for (i = -1, length = arguments.length; i < length; i++) {
        E = i === -1 ? O : arguments[i];
        if (isConcatSpreadable(E)) {
          len = lengthOfArrayLike(E);
          if (n + len > MAX_SAFE_INTEGER) throw TypeError(MAXIMUM_ALLOWED_INDEX_EXCEEDED);
          for (k = 0; k < len; k++, n++) if (k in E) createProperty(A, n, E[k]);
        } else {
          if (n >= MAX_SAFE_INTEGER) throw TypeError(MAXIMUM_ALLOWED_INDEX_EXCEEDED);
          createProperty(A, n++, E);
        }
      }
      A.length = n;
      return A;
    }
  });

  var PROJECT_ID_NYPH = 2;
  var NyphApp = /*#__PURE__*/function (_App) {
    _inherits(NyphApp, _App);

    var _super = _createSuper(NyphApp);

    function NyphApp() {
      var _this;

      _classCallCheck(this, NyphApp);

      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      _this = _super.call.apply(_super, [this].concat(args));

      _defineProperty(_assertThisInitialized(_this), "projectId", PROJECT_ID_NYPH);

      return _this;
    } // /**
    //  *
    //  * @param {Survey} survey
    //  */
    // addSurvey(survey) {
    //     if (survey.projectId !== this.projectId) {
    //         throw new Error(`Survey project id '${survey.projectId} does not match with current project ('${this.projectId}')`);
    //     }
    //
    //     if (!this.surveys.has(survey.id)) {
    //         console.log("setting survey's modified/save handler");
    //         survey.addListener(
    //             Survey.EVENT_MODIFIED,
    //             (survey) => {
    //                 this.fireEvent(App.EVENT_SURVEYS_CHANGED);
    //                 return survey.save();
    //             }
    //             );
    //     }
    //
    //     this.surveys.set(survey.id, survey);
    //     this.fireEvent(App.EVENT_SURVEYS_CHANGED);
    // }
    // /**
    //  * tests whether occurrences have been defined, excluding any that have been deleted
    //  *
    //  * @returns {boolean}
    //  */
    // haveExtantOccurrences() {
    //     for (let occurrence of this.occurrences) {
    //         if (!occurrence.deleted) {
    //             return true;
    //         }
    //     }
    //     return false;
    // }
    // /**
    //  *
    //  * @param {Occurrence} occurrence
    //  */
    // addOccurrence(occurrence) {
    //     if (!occurrence.surveyId) {
    //         throw new InternalAppError('Survey id must set prior to registering occurrence.');
    //     }
    //
    //     if (this.occurrences.size === 0) {
    //         // this is the first occurrence added, set the survey creation stamp to match
    //         // this avoids anomalies where a 'stale' survey created when the form was first opened but not used sits around
    //         // for a protracted period
    //
    //         const survey = this.surveys.get(occurrence.surveyId);
    //         survey.createdStamp = occurrence.createdStamp;
    //     }
    //     console.log(`in addOccurrence setting id '${occurrence.id}'`);
    //     this.occurrences.set(occurrence.id, occurrence);
    //
    //     occurrence.addListener(Occurrence.EVENT_MODIFIED,
    //         () => {
    //             const survey = this.surveys.get(occurrence.surveyId);
    //             if (!survey) {
    //                 throw new Error(`Failed to look up survey id ${occurrence.surveyId}`);
    //             } else {
    //                 survey.isPristine = false;
    //
    //                 // need to ensure that currentSurvey is saved before occurrence
    //                 // rather than using a promise chain here, instead rely on enforced queuing of post requests in Model
    //                 // otherwise there are problems with queue-jumping (e.g. when an image needs to be saved after both previous requests)
    //                 if (survey.unsaved()) {
    //                     // noinspection JSIgnoredPromiseFromCall
    //                     survey.save();
    //                 }
    //                 occurrence.save(survey.id);
    //             }
    //         });
    // }
    // /**
    //  * attempts to refresh the state of local storage for the specified survey ids
    //  * if fetch fails then return a failed promise
    //  *
    //  * updates local copy of surveys and occurrences
    //  *
    //  * no service worker interception of this call - passed through and not cached
    //  *
    //  * @param {Array.<string>} surveyIds
    //  * @return {Promise}
    //  */
    // refreshFromServer(surveyIds) {
    //     const formData = new FormData;
    //
    //     let n = 0;
    //     for (let key of surveyIds) {
    //         formData.append(`surveyId[${n++}]`, key);
    //     }
    //
    //     return fetch(NyphApp.LOAD_SURVEYS_ENDPOINT, {
    //         method: 'POST',
    //         body: formData
    //     }).then(response => {
    //         if (response.ok) {
    //             return response.json();
    //         } else {
    //             return Promise.reject(`Invalid response from server when refreshing survey ids`);
    //         }
    //     }).then((jsonResponse) => {
    //         /** @param {{survey : Array.<object>, occurrence: Array.<object>, image: Array.<object>}} jsonResponse */
    //
    //         console.log({'refresh from server json response' : jsonResponse});
    //
    //         // if external objects newer than local version then place in local storage
    //         const promises = [];
    //
    //         for (let type in jsonResponse) {
    //             if (jsonResponse.hasOwnProperty(type)) {
    //                 for (let object of jsonResponse[type]) {
    //                     promises.push(this._conditionallyReplaceObject(object));
    //                 }
    //             }
    //         }
    //
    //
    //         return Promise.all(promises);
    //     });
    // }
    // /**
    //  * compare modified stamp of indexeddb and external objects and write external version locally if more recent
    //  *
    //  * @param {{id : string, type : string, modified : number, created : number, saveState : string, deleted : boolean}} externalVersion
    //  * @returns {Promise}
    //  * @private
    //  */
    // _conditionallyReplaceObject(externalVersion) {
    //     const objectType = externalVersion.type;
    //     const id = externalVersion.id;
    //     const key = `${objectType}.${id}`;
    //
    //     return localforage.getItem(key)
    //         .then((localVersion) => {
    //             if (localVersion) {
    //                 // compare stamps
    //
    //                 // if (externalVersion.deleted) {
    //                 //     // if the external copy is deleted then remove the local copy
    //                 //     return localforage.removeItem(key);
    //                 // }
    //
    //                 if (!externalVersion.deleted && localVersion.modified >= externalVersion.modified) {
    //                     console.log(`Local copy of ${key} is the same or newer than the server copy. (${localVersion.modified} >= ${externalVersion.modified}) `);
    //                     return Promise.resolve();
    //                 }
    //             }
    //
    //             // no local copy or stale copy
    //             // so store response locally
    //             console.log(`Adding or replacing local copy of ${key}`);
    //             return localforage.setItem(key, externalVersion);
    //         });
    // }
    // /**
    //  * retrieve the full set of keys from local storage (IndexedDb)
    //  *
    //  * @param {{survey: Array.<string>, occurrence : Array.<string>, image: Array.<string>}} storedObjectKeys
    //  * @returns {Promise}
    //  */
    // seekKeys(storedObjectKeys) {
    //     return localforage.keys().then((keys) => {
    //         for (let key of keys) {
    //             let type,id;
    //
    //             [type, id] = key.split('.', 2);
    //
    //             if (storedObjectKeys.hasOwnProperty(type)) {
    //                 if (!storedObjectKeys[type].includes(id)) {
    //                     storedObjectKeys[type].push(id);
    //                 }
    //             } else {
    //                 console.log(`Unrecognised stored key type '${type}.`);
    //             }
    //         }
    //
    //         return storedObjectKeys;
    //     });
    // }
    // /**
    //  * @returns {Promise}
    //  */
    // syncAll() {
    //     const storedObjectKeys = {
    //         survey : [],
    //         occurrence : [],
    //         image : []
    //     };
    //
    //     return this.seekKeys(storedObjectKeys)
    //         .then((storedObjectKeys) => {
    //             return this._syncLocalUnsaved(storedObjectKeys);
    //         }, (failedResult) => {
    //             console.log(`Failed to sync all: ${failedResult}`);
    //         });
    // }
    // /**
    //  *
    //  * @param storedObjectKeys
    //  * @returns {Promise}
    //  * @private
    //  */
    // _syncLocalUnsaved(storedObjectKeys) {
    //     // syncs surveys first, then occurrences, then images from indexedDb
    //
    //     const promises = [];
    //     for(let surveyKey of storedObjectKeys.survey) {
    //         promises.push(Survey.retrieveFromLocal(surveyKey, new Survey)
    //             .then((survey) => {
    //                 if (survey.unsaved()) {
    //                     return survey.save();
    //                 }
    //             })
    //         );
    //     }
    //
    //     for(let occurrenceKey of storedObjectKeys.occurrence) {
    //         promises.push(Occurrence.retrieveFromLocal(occurrenceKey, new Occurrence)
    //             .then((occurrence) => {
    //                 if (occurrence.unsaved()) {
    //                     return occurrence.save();
    //                 }
    //             })
    //         );
    //     }
    //
    //     for(let imageKey of storedObjectKeys.image) {
    //         promises.push(OccurrenceImage.retrieveFromLocal(imageKey, new OccurrenceImage)
    //             .then((image) => {
    //                 if (image.unsaved()) {
    //                     return image.save();
    //                 }
    //             })
    //         );
    //     }
    //
    //     return Promise.all(promises).catch((result) => {
    //         console.log(`Save failure: ${result}`);
    //     });
    // }
    // /**
    //  * restore previous state, pulling back from local and external store
    //  * @todo this needs a save phase, so that local changes are saved back to the server
    //  *
    //  * @param {string} [targetSurveyId] if specified then select this id as the current survey
    //  * @return {Promise}
    //  */
    // restoreOccurrences(targetSurveyId) {
    //
    //     // need to check for a special case where restoring a survey that has never been saved even locally
    //     // i.e. new and unmodified
    //     // only present in current App.surveys
    //     // this occurs if user creates a new survey, makes no changes, switches away from it then switches back
    //     if (this.surveys.has(targetSurveyId)) {
    //         const localSurvey = this.surveys.get(targetSurveyId);
    //
    //         if (localSurvey.isPristine) {
    //             this.currentSurvey = localSurvey;
    //             this.fireEvent(App.EVENT_SURVEYS_CHANGED); // current survey should be set now, so menu needs refresh
    //             return Promise.resolve();
    //         }
    //     }
    //
    //     const storedObjectKeys = {
    //         survey: [],
    //         occurrence: [],
    //         image: []
    //     };
    //
    //     if (targetSurveyId) {
    //         storedObjectKeys.survey[0] = targetSurveyId;
    //     }
    //
    //     return this.seekKeys(storedObjectKeys).then((storedObjectKeys) => {
    //         if (storedObjectKeys.survey.length) {
    //             return this.refreshFromServer(storedObjectKeys.survey).finally(() => {
    //                 // re-seek keys from indexed db, to take account of any new occurrences received from the server
    //                 return this.seekKeys(storedObjectKeys);
    //             });
    //         } else {
    //             return null;
    //         }
    //     }).finally(() => {
    //         // called regardless of whether a server refresh was successful
    //         // storedObjectKeys and indexed db should be as up-to-date as possible
    //
    //         if (storedObjectKeys.survey.length) {
    //
    //             // arbitrarily set first survey key as current
    //             // this will be the specified targetSurveyId if that was set
    //             return this._restoreSurveyFromLocal(storedObjectKeys.survey[0], storedObjectKeys)
    //                 .finally(() => {
    //                     this.currentSurvey = this.surveys.get(storedObjectKeys.survey[0]);
    //
    //                     if (!this.currentSurvey) {
    //                         // survey doesn't actually exist
    //                         // this could have happened in an invalid survey id was provided as a targetSurveyId
    //                         console.log(`Failed to retrieve survey id '${targetSurveyId}'`);
    //                         return Promise.reject(new Error(`Failed to retrieve survey id '${targetSurveyId}'`));
    //                     }
    //
    //                     if (this.currentSurvey.deleted) {
    //                         // unusual case where survey is deleted
    //                         // substitute a new one
    //
    //                         // this should probably never happen, as items deleted on the server ought to have been
    //                         // removed locally
    //                         this.setNewSurvey();
    //                     } else {
    //                         this.fireEvent(App.EVENT_SURVEYS_CHANGED); // current survey should be set now, so menu needs refresh
    //                     }
    //                     return Promise.resolve();
    //                 });
    //         } else {
    //             // no pre-existing surveys, so create a new one
    //             this.setNewSurvey();
    //
    //             return Promise.resolve();
    //         }
    //     });
    // }
    // setNewSurvey() {
    //     this.currentSurvey = new Survey();
    //     this.currentSurvey.projectId = this.projectId;
    //     this.currentSurvey.isPristine = true;
    //     this.addSurvey(this.currentSurvey);
    // }
    // /**
    //  * @return {Occurrence}
    //  */
    // addNewOccurrence() {
    //     const occurrence = new Occurrence();
    //     occurrence.surveyId = this.currentSurvey.id;
    //     occurrence.projectId = this.projectId;
    //
    //     occurrence.isNew = true;
    //     occurrence.isPristine = true;
    //
    //     this.addOccurrence(occurrence);
    //
    //     this.fireEvent(NyphApp.EVENT_OCCURRENCE_ADDED, {occurrenceId: occurrence.id, surveyId: occurrence.surveyId});
    //
    //     return occurrence;
    // }
    // /**
    //  *
    //  * @param surveyId
    //  * @param storedObjectKeys
    //  * @returns {Promise}
    //  * @private
    //  */
    // _restoreSurveyFromLocal(surveyId, storedObjectKeys) {
    //     // retrieve surveys first, then occurrences, then images from indexedDb
    //
    //     return Survey.retrieveFromLocal(surveyId, new Survey).then((survey) => {
    //         // the apps occurrences should only relate to the current survey
    //         // (the reset are remote or in IndexedDb)
    //         this.clearCurrentSurvey();
    //
    //         this.addSurvey(survey);
    //         const occurrenceFetchingPromises = [];
    //
    //         for(let occurrenceKey of storedObjectKeys.occurrence) {
    //             occurrenceFetchingPromises.push(Occurrence.retrieveFromLocal(occurrenceKey, new Occurrence)
    //                 .then((occurrence) => {
    //                     if (occurrence.surveyId === surveyId) {
    //                         this.addOccurrence(occurrence);
    //                     }
    //                 }));
    //         }
    //
    //         return Promise.all(occurrenceFetchingPromises);
    //     }).finally(() => {
    //         //console.log('Reached image fetching part');
    //         const imageFetchingPromises = [];
    //
    //         for(let occurrenceImageKey of storedObjectKeys.image) {
    //             imageFetchingPromises.push(OccurrenceImage.retrieveFromLocal(occurrenceImageKey, new OccurrenceImage)
    //                 .then((occurrenceImage) => {
    //                     if (occurrenceImage.surveyId === surveyId) {
    //                         OccurrenceImage.imageCache.set(occurrenceImageKey, occurrenceImage);
    //                     }
    //                 }, (reason) => {
    //                     console.log(`Failed to retrieve an image: ${reason}`);
    //                 }));
    //         }
    //
    //         return Promise.all(imageFetchingPromises);
    //     });
    // }
    // /**
    //  *
    //  * @returns {Promise<void>}
    //  */
    // clearLocalForage() {
    //     return localforage.clear();
    // }


    return NyphApp;
  }(App);

  _defineProperty(NyphApp, "forageName", 'Nyph App');

  _defineProperty(NyphApp, "devMode", false);

  // service worker for Nyph app
  var serviceWorker = new BSBIServiceWorker();
  serviceWorker.initialise({
    forageName: NyphApp.forageName,
    postPassThroughWhitelist: /^https:\/\/nyphtest\.bsbi\.org\/loadsurveys.php/,
    postImageUrlMatch: /^https:\/\/nyphtest\.bsbi\.org\/saveimage.php/,
    getImageUrlMatch: /^https:\/\/nyphtest\.bsbi\.org\/image\.php/,
    interceptUrlMatches: /^https:\/\/nyphtest\.bsbi\.org\/app\/|^https:\/\/nyphtest\.bsbi\.org\/app$/,
    ignoreUrlMatches: /^https:\/\/nyphtest\.bsbi\.org\/app\/app\.js|^https:\/\/nyphtest\.bsbi\.org\/app\/serviceworker\.js|^https:\/\/nyphtest\.bsbi\.org\/app\/manifest\.webmanifest|^https:\/\/nyphtest\.bsbi\.org\/app\/index\.html|^https:\/\/api\.mapbox\.com/,
    indexUrl: 'https://nyphtest.bsbi.org/app/index.html',
    urlCacheSet: ['./index.html', './manifest.webmanifest', '/appcss/app.css', // note no leading '.' - this is an absolute path
    '/appcss/theme.css', //'/img/gwh_logo1_tsp.png',
    '/img/icons/favicon-32x32.png', '/img/icons/favicon-16x16.png', '/img/icons/android-icon-192x192.png', //'/img/icons/gwh_logo1_tsp-512x512.png',
    '/img/BSBIlong.png', 'https://fonts.googleapis.com/icon?family=Material+Icons|Material+Icons+Round', 'https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css', 'https://database.bsbi.org/js/taxonnames.js.php', 'https://code.jquery.com/jquery-3.3.1.slim.min.js', 'https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js', 'https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/js/bootstrap.min.js', 'https://fonts.googleapis.com/css2?family=Gentium+Basic&display=swap', 'https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-geocoder/v4.7.2/mapbox-gl-geocoder.min.js'],
    passThroughNoCache: /^https:\/\/api\.mapbox\.com|^https:\/\/events\.mapbox\.com/,
    version: '1.0.1.1637948020'
  });

})();
//# sourceMappingURL=serviceworker.js.map
