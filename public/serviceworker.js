(function () {
	'use strict';

	var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

	var check = function (it) {
	  return it && it.Math == Math && it;
	};

	// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
	var global$B =
	  // eslint-disable-next-line es/no-global-this -- safe
	  check(typeof globalThis == 'object' && globalThis) ||
	  check(typeof window == 'object' && window) ||
	  // eslint-disable-next-line no-restricted-globals -- safe
	  check(typeof self == 'object' && self) ||
	  check(typeof commonjsGlobal == 'object' && commonjsGlobal) ||
	  // eslint-disable-next-line no-new-func -- fallback
	  (function () { return this; })() || Function('return this')();

	var objectGetOwnPropertyDescriptor = {};

	var fails$i = function (exec) {
	  try {
	    return !!exec();
	  } catch (error) {
	    return true;
	  }
	};

	var fails$h = fails$i;

	// Detect IE8's incomplete defineProperty implementation
	var descriptors = !fails$h(function () {
	  // eslint-disable-next-line es/no-object-defineproperty -- required for testing
	  return Object.defineProperty({}, 1, { get: function () { return 7; } })[1] != 7;
	});

	var fails$g = fails$i;

	var functionBindNative = !fails$g(function () {
	  var test = (function () { /* empty */ }).bind();
	  // eslint-disable-next-line no-prototype-builtins -- safe
	  return typeof test != 'function' || test.hasOwnProperty('prototype');
	});

	var NATIVE_BIND$2 = functionBindNative;

	var call$9 = Function.prototype.call;

	var functionCall = NATIVE_BIND$2 ? call$9.bind(call$9) : function () {
	  return call$9.apply(call$9, arguments);
	};

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

	var createPropertyDescriptor$4 = function (bitmap, value) {
	  return {
	    enumerable: !(bitmap & 1),
	    configurable: !(bitmap & 2),
	    writable: !(bitmap & 4),
	    value: value
	  };
	};

	var NATIVE_BIND$1 = functionBindNative;

	var FunctionPrototype$2 = Function.prototype;
	var bind = FunctionPrototype$2.bind;
	var call$8 = FunctionPrototype$2.call;
	var uncurryThis$j = NATIVE_BIND$1 && bind.bind(call$8, call$8);

	var functionUncurryThis = NATIVE_BIND$1 ? function (fn) {
	  return fn && uncurryThis$j(fn);
	} : function (fn) {
	  return fn && function () {
	    return call$8.apply(fn, arguments);
	  };
	};

	var uncurryThis$i = functionUncurryThis;

	var toString$7 = uncurryThis$i({}.toString);
	var stringSlice$4 = uncurryThis$i(''.slice);

	var classofRaw$1 = function (it) {
	  return stringSlice$4(toString$7(it), 8, -1);
	};

	var global$A = global$B;
	var uncurryThis$h = functionUncurryThis;
	var fails$f = fails$i;
	var classof$8 = classofRaw$1;

	var Object$4 = global$A.Object;
	var split = uncurryThis$h(''.split);

	// fallback for non-array-like ES3 and non-enumerable old V8 strings
	var indexedObject = fails$f(function () {
	  // throws an error in rhino, see https://github.com/mozilla/rhino/issues/346
	  // eslint-disable-next-line no-prototype-builtins -- safe
	  return !Object$4('z').propertyIsEnumerable(0);
	}) ? function (it) {
	  return classof$8(it) == 'String' ? split(it, '') : Object$4(it);
	} : Object$4;

	var global$z = global$B;

	var TypeError$d = global$z.TypeError;

	// `RequireObjectCoercible` abstract operation
	// https://tc39.es/ecma262/#sec-requireobjectcoercible
	var requireObjectCoercible$4 = function (it) {
	  if (it == undefined) throw TypeError$d("Can't call method on " + it);
	  return it;
	};

	// toObject with fallback for non-array-like ES3 strings
	var IndexedObject = indexedObject;
	var requireObjectCoercible$3 = requireObjectCoercible$4;

	var toIndexedObject$5 = function (it) {
	  return IndexedObject(requireObjectCoercible$3(it));
	};

	// `IsCallable` abstract operation
	// https://tc39.es/ecma262/#sec-iscallable
	var isCallable$e = function (argument) {
	  return typeof argument == 'function';
	};

	var isCallable$d = isCallable$e;

	var isObject$b = function (it) {
	  return typeof it == 'object' ? it !== null : isCallable$d(it);
	};

	var global$y = global$B;
	var isCallable$c = isCallable$e;

	var aFunction = function (argument) {
	  return isCallable$c(argument) ? argument : undefined;
	};

	var getBuiltIn$7 = function (namespace, method) {
	  return arguments.length < 2 ? aFunction(global$y[namespace]) : global$y[namespace] && global$y[namespace][method];
	};

	var uncurryThis$g = functionUncurryThis;

	var objectIsPrototypeOf = uncurryThis$g({}.isPrototypeOf);

	var getBuiltIn$6 = getBuiltIn$7;

	var engineUserAgent = getBuiltIn$6('navigator', 'userAgent') || '';

	var global$x = global$B;
	var userAgent = engineUserAgent;

	var process = global$x.process;
	var Deno = global$x.Deno;
	var versions = process && process.versions || Deno && Deno.version;
	var v8 = versions && versions.v8;
	var match, version;

	if (v8) {
	  match = v8.split('.');
	  // in old Chrome, versions of V8 isn't V8 = Chrome / 10
	  // but their correct versions are not interesting for us
	  version = match[0] > 0 && match[0] < 4 ? 1 : +(match[0] + match[1]);
	}

	// BrowserFS NodeJS `process` polyfill incorrectly set `.v8` to `0.0`
	// so check `userAgent` even if `.v8` exists, but 0
	if (!version && userAgent) {
	  match = userAgent.match(/Edge\/(\d+)/);
	  if (!match || match[1] >= 74) {
	    match = userAgent.match(/Chrome\/(\d+)/);
	    if (match) version = +match[1];
	  }
	}

	var engineV8Version = version;

	/* eslint-disable es/no-symbol -- required for testing */

	var V8_VERSION$2 = engineV8Version;
	var fails$e = fails$i;

	// eslint-disable-next-line es/no-object-getownpropertysymbols -- required for testing
	var nativeSymbol = !!Object.getOwnPropertySymbols && !fails$e(function () {
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

	var global$w = global$B;
	var getBuiltIn$5 = getBuiltIn$7;
	var isCallable$b = isCallable$e;
	var isPrototypeOf$3 = objectIsPrototypeOf;
	var USE_SYMBOL_AS_UID$1 = useSymbolAsUid;

	var Object$3 = global$w.Object;

	var isSymbol$2 = USE_SYMBOL_AS_UID$1 ? function (it) {
	  return typeof it == 'symbol';
	} : function (it) {
	  var $Symbol = getBuiltIn$5('Symbol');
	  return isCallable$b($Symbol) && isPrototypeOf$3($Symbol.prototype, Object$3(it));
	};

	var global$v = global$B;

	var String$4 = global$v.String;

	var tryToString$2 = function (argument) {
	  try {
	    return String$4(argument);
	  } catch (error) {
	    return 'Object';
	  }
	};

	var global$u = global$B;
	var isCallable$a = isCallable$e;
	var tryToString$1 = tryToString$2;

	var TypeError$c = global$u.TypeError;

	// `Assert: IsCallable(argument) is true`
	var aCallable$1 = function (argument) {
	  if (isCallable$a(argument)) return argument;
	  throw TypeError$c(tryToString$1(argument) + ' is not a function');
	};

	var aCallable = aCallable$1;

	// `GetMethod` abstract operation
	// https://tc39.es/ecma262/#sec-getmethod
	var getMethod$2 = function (V, P) {
	  var func = V[P];
	  return func == null ? undefined : aCallable(func);
	};

	var global$t = global$B;
	var call$7 = functionCall;
	var isCallable$9 = isCallable$e;
	var isObject$a = isObject$b;

	var TypeError$b = global$t.TypeError;

	// `OrdinaryToPrimitive` abstract operation
	// https://tc39.es/ecma262/#sec-ordinarytoprimitive
	var ordinaryToPrimitive$1 = function (input, pref) {
	  var fn, val;
	  if (pref === 'string' && isCallable$9(fn = input.toString) && !isObject$a(val = call$7(fn, input))) return val;
	  if (isCallable$9(fn = input.valueOf) && !isObject$a(val = call$7(fn, input))) return val;
	  if (pref !== 'string' && isCallable$9(fn = input.toString) && !isObject$a(val = call$7(fn, input))) return val;
	  throw TypeError$b("Can't convert object to primitive value");
	};

	var shared$4 = {exports: {}};

	var global$s = global$B;

	// eslint-disable-next-line es/no-object-defineproperty -- safe
	var defineProperty$3 = Object.defineProperty;

	var setGlobal$3 = function (key, value) {
	  try {
	    defineProperty$3(global$s, key, { value: value, configurable: true, writable: true });
	  } catch (error) {
	    global$s[key] = value;
	  } return value;
	};

	var global$r = global$B;
	var setGlobal$2 = setGlobal$3;

	var SHARED = '__core-js_shared__';
	var store$3 = global$r[SHARED] || setGlobal$2(SHARED, {});

	var sharedStore = store$3;

	var store$2 = sharedStore;

	(shared$4.exports = function (key, value) {
	  return store$2[key] || (store$2[key] = value !== undefined ? value : {});
	})('versions', []).push({
	  version: '3.21.0',
	  mode: 'global',
	  copyright: '© 2014-2022 Denis Pushkarev (zloirock.ru)',
	  license: 'https://github.com/zloirock/core-js/blob/v3.21.0/LICENSE',
	  source: 'https://github.com/zloirock/core-js'
	});

	var global$q = global$B;
	var requireObjectCoercible$2 = requireObjectCoercible$4;

	var Object$2 = global$q.Object;

	// `ToObject` abstract operation
	// https://tc39.es/ecma262/#sec-toobject
	var toObject$2 = function (argument) {
	  return Object$2(requireObjectCoercible$2(argument));
	};

	var uncurryThis$f = functionUncurryThis;
	var toObject$1 = toObject$2;

	var hasOwnProperty = uncurryThis$f({}.hasOwnProperty);

	// `HasOwnProperty` abstract operation
	// https://tc39.es/ecma262/#sec-hasownproperty
	var hasOwnProperty_1 = Object.hasOwn || function hasOwn(it, key) {
	  return hasOwnProperty(toObject$1(it), key);
	};

	var uncurryThis$e = functionUncurryThis;

	var id = 0;
	var postfix = Math.random();
	var toString$6 = uncurryThis$e(1.0.toString);

	var uid$2 = function (key) {
	  return 'Symbol(' + (key === undefined ? '' : key) + ')_' + toString$6(++id + postfix, 36);
	};

	var global$p = global$B;
	var shared$3 = shared$4.exports;
	var hasOwn$8 = hasOwnProperty_1;
	var uid$1 = uid$2;
	var NATIVE_SYMBOL = nativeSymbol;
	var USE_SYMBOL_AS_UID = useSymbolAsUid;

	var WellKnownSymbolsStore = shared$3('wks');
	var Symbol$1 = global$p.Symbol;
	var symbolFor = Symbol$1 && Symbol$1['for'];
	var createWellKnownSymbol = USE_SYMBOL_AS_UID ? Symbol$1 : Symbol$1 && Symbol$1.withoutSetter || uid$1;

	var wellKnownSymbol$c = function (name) {
	  if (!hasOwn$8(WellKnownSymbolsStore, name) || !(NATIVE_SYMBOL || typeof WellKnownSymbolsStore[name] == 'string')) {
	    var description = 'Symbol.' + name;
	    if (NATIVE_SYMBOL && hasOwn$8(Symbol$1, name)) {
	      WellKnownSymbolsStore[name] = Symbol$1[name];
	    } else if (USE_SYMBOL_AS_UID && symbolFor) {
	      WellKnownSymbolsStore[name] = symbolFor(description);
	    } else {
	      WellKnownSymbolsStore[name] = createWellKnownSymbol(description);
	    }
	  } return WellKnownSymbolsStore[name];
	};

	var global$o = global$B;
	var call$6 = functionCall;
	var isObject$9 = isObject$b;
	var isSymbol$1 = isSymbol$2;
	var getMethod$1 = getMethod$2;
	var ordinaryToPrimitive = ordinaryToPrimitive$1;
	var wellKnownSymbol$b = wellKnownSymbol$c;

	var TypeError$a = global$o.TypeError;
	var TO_PRIMITIVE = wellKnownSymbol$b('toPrimitive');

	// `ToPrimitive` abstract operation
	// https://tc39.es/ecma262/#sec-toprimitive
	var toPrimitive$1 = function (input, pref) {
	  if (!isObject$9(input) || isSymbol$1(input)) return input;
	  var exoticToPrim = getMethod$1(input, TO_PRIMITIVE);
	  var result;
	  if (exoticToPrim) {
	    if (pref === undefined) pref = 'default';
	    result = call$6(exoticToPrim, input, pref);
	    if (!isObject$9(result) || isSymbol$1(result)) return result;
	    throw TypeError$a("Can't convert object to primitive value");
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
	  return isSymbol(key) ? key : key + '';
	};

	var global$n = global$B;
	var isObject$8 = isObject$b;

	var document$1 = global$n.document;
	// typeof document.createElement is 'object' in old IE
	var EXISTS$1 = isObject$8(document$1) && isObject$8(document$1.createElement);

	var documentCreateElement$1 = function (it) {
	  return EXISTS$1 ? document$1.createElement(it) : {};
	};

	var DESCRIPTORS$a = descriptors;
	var fails$d = fails$i;
	var createElement = documentCreateElement$1;

	// Thanks to IE8 for its funny defineProperty
	var ie8DomDefine = !DESCRIPTORS$a && !fails$d(function () {
	  // eslint-disable-next-line es/no-object-defineproperty -- required for testing
	  return Object.defineProperty(createElement('div'), 'a', {
	    get: function () { return 7; }
	  }).a != 7;
	});

	var DESCRIPTORS$9 = descriptors;
	var call$5 = functionCall;
	var propertyIsEnumerableModule = objectPropertyIsEnumerable;
	var createPropertyDescriptor$3 = createPropertyDescriptor$4;
	var toIndexedObject$4 = toIndexedObject$5;
	var toPropertyKey$2 = toPropertyKey$3;
	var hasOwn$7 = hasOwnProperty_1;
	var IE8_DOM_DEFINE$1 = ie8DomDefine;

	// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
	var $getOwnPropertyDescriptor$1 = Object.getOwnPropertyDescriptor;

	// `Object.getOwnPropertyDescriptor` method
	// https://tc39.es/ecma262/#sec-object.getownpropertydescriptor
	objectGetOwnPropertyDescriptor.f = DESCRIPTORS$9 ? $getOwnPropertyDescriptor$1 : function getOwnPropertyDescriptor(O, P) {
	  O = toIndexedObject$4(O);
	  P = toPropertyKey$2(P);
	  if (IE8_DOM_DEFINE$1) try {
	    return $getOwnPropertyDescriptor$1(O, P);
	  } catch (error) { /* empty */ }
	  if (hasOwn$7(O, P)) return createPropertyDescriptor$3(!call$5(propertyIsEnumerableModule.f, O, P), O[P]);
	};

	var objectDefineProperty = {};

	var DESCRIPTORS$8 = descriptors;
	var fails$c = fails$i;

	// V8 ~ Chrome 36-
	// https://bugs.chromium.org/p/v8/issues/detail?id=3334
	var v8PrototypeDefineBug = DESCRIPTORS$8 && fails$c(function () {
	  // eslint-disable-next-line es/no-object-defineproperty -- required for testing
	  return Object.defineProperty(function () { /* empty */ }, 'prototype', {
	    value: 42,
	    writable: false
	  }).prototype != 42;
	});

	var global$m = global$B;
	var isObject$7 = isObject$b;

	var String$3 = global$m.String;
	var TypeError$9 = global$m.TypeError;

	// `Assert: Type(argument) is Object`
	var anObject$a = function (argument) {
	  if (isObject$7(argument)) return argument;
	  throw TypeError$9(String$3(argument) + ' is not an object');
	};

	var global$l = global$B;
	var DESCRIPTORS$7 = descriptors;
	var IE8_DOM_DEFINE = ie8DomDefine;
	var V8_PROTOTYPE_DEFINE_BUG$1 = v8PrototypeDefineBug;
	var anObject$9 = anObject$a;
	var toPropertyKey$1 = toPropertyKey$3;

	var TypeError$8 = global$l.TypeError;
	// eslint-disable-next-line es/no-object-defineproperty -- safe
	var $defineProperty = Object.defineProperty;
	// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
	var $getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
	var ENUMERABLE = 'enumerable';
	var CONFIGURABLE$1 = 'configurable';
	var WRITABLE = 'writable';

	// `Object.defineProperty` method
	// https://tc39.es/ecma262/#sec-object.defineproperty
	objectDefineProperty.f = DESCRIPTORS$7 ? V8_PROTOTYPE_DEFINE_BUG$1 ? function defineProperty(O, P, Attributes) {
	  anObject$9(O);
	  P = toPropertyKey$1(P);
	  anObject$9(Attributes);
	  if (typeof O === 'function' && P === 'prototype' && 'value' in Attributes && WRITABLE in Attributes && !Attributes[WRITABLE]) {
	    var current = $getOwnPropertyDescriptor(O, P);
	    if (current && current[WRITABLE]) {
	      O[P] = Attributes.value;
	      Attributes = {
	        configurable: CONFIGURABLE$1 in Attributes ? Attributes[CONFIGURABLE$1] : current[CONFIGURABLE$1],
	        enumerable: ENUMERABLE in Attributes ? Attributes[ENUMERABLE] : current[ENUMERABLE],
	        writable: false
	      };
	    }
	  } return $defineProperty(O, P, Attributes);
	} : $defineProperty : function defineProperty(O, P, Attributes) {
	  anObject$9(O);
	  P = toPropertyKey$1(P);
	  anObject$9(Attributes);
	  if (IE8_DOM_DEFINE) try {
	    return $defineProperty(O, P, Attributes);
	  } catch (error) { /* empty */ }
	  if ('get' in Attributes || 'set' in Attributes) throw TypeError$8('Accessors not supported');
	  if ('value' in Attributes) O[P] = Attributes.value;
	  return O;
	};

	var DESCRIPTORS$6 = descriptors;
	var definePropertyModule$4 = objectDefineProperty;
	var createPropertyDescriptor$2 = createPropertyDescriptor$4;

	var createNonEnumerableProperty$7 = DESCRIPTORS$6 ? function (object, key, value) {
	  return definePropertyModule$4.f(object, key, createPropertyDescriptor$2(1, value));
	} : function (object, key, value) {
	  object[key] = value;
	  return object;
	};

	var redefine$4 = {exports: {}};

	var uncurryThis$d = functionUncurryThis;
	var isCallable$8 = isCallable$e;
	var store$1 = sharedStore;

	var functionToString = uncurryThis$d(Function.toString);

	// this helper broken in `core-js@3.4.1-3.4.4`, so we can't use `shared` helper
	if (!isCallable$8(store$1.inspectSource)) {
	  store$1.inspectSource = function (it) {
	    return functionToString(it);
	  };
	}

	var inspectSource$3 = store$1.inspectSource;

	var global$k = global$B;
	var isCallable$7 = isCallable$e;
	var inspectSource$2 = inspectSource$3;

	var WeakMap$1 = global$k.WeakMap;

	var nativeWeakMap = isCallable$7(WeakMap$1) && /native code/.test(inspectSource$2(WeakMap$1));

	var shared$2 = shared$4.exports;
	var uid = uid$2;

	var keys$1 = shared$2('keys');

	var sharedKey$2 = function (key) {
	  return keys$1[key] || (keys$1[key] = uid(key));
	};

	var hiddenKeys$4 = {};

	var NATIVE_WEAK_MAP = nativeWeakMap;
	var global$j = global$B;
	var uncurryThis$c = functionUncurryThis;
	var isObject$6 = isObject$b;
	var createNonEnumerableProperty$6 = createNonEnumerableProperty$7;
	var hasOwn$6 = hasOwnProperty_1;
	var shared$1 = sharedStore;
	var sharedKey$1 = sharedKey$2;
	var hiddenKeys$3 = hiddenKeys$4;

	var OBJECT_ALREADY_INITIALIZED = 'Object already initialized';
	var TypeError$7 = global$j.TypeError;
	var WeakMap = global$j.WeakMap;
	var set, get, has;

	var enforce = function (it) {
	  return has(it) ? get(it) : set(it, {});
	};

	var getterFor = function (TYPE) {
	  return function (it) {
	    var state;
	    if (!isObject$6(it) || (state = get(it)).type !== TYPE) {
	      throw TypeError$7('Incompatible receiver, ' + TYPE + ' required');
	    } return state;
	  };
	};

	if (NATIVE_WEAK_MAP || shared$1.state) {
	  var store = shared$1.state || (shared$1.state = new WeakMap());
	  var wmget = uncurryThis$c(store.get);
	  var wmhas = uncurryThis$c(store.has);
	  var wmset = uncurryThis$c(store.set);
	  set = function (it, metadata) {
	    if (wmhas(store, it)) throw new TypeError$7(OBJECT_ALREADY_INITIALIZED);
	    metadata.facade = it;
	    wmset(store, it, metadata);
	    return metadata;
	  };
	  get = function (it) {
	    return wmget(store, it) || {};
	  };
	  has = function (it) {
	    return wmhas(store, it);
	  };
	} else {
	  var STATE = sharedKey$1('state');
	  hiddenKeys$3[STATE] = true;
	  set = function (it, metadata) {
	    if (hasOwn$6(it, STATE)) throw new TypeError$7(OBJECT_ALREADY_INITIALIZED);
	    metadata.facade = it;
	    createNonEnumerableProperty$6(it, STATE, metadata);
	    return metadata;
	  };
	  get = function (it) {
	    return hasOwn$6(it, STATE) ? it[STATE] : {};
	  };
	  has = function (it) {
	    return hasOwn$6(it, STATE);
	  };
	}

	var internalState = {
	  set: set,
	  get: get,
	  has: has,
	  enforce: enforce,
	  getterFor: getterFor
	};

	var DESCRIPTORS$5 = descriptors;
	var hasOwn$5 = hasOwnProperty_1;

	var FunctionPrototype$1 = Function.prototype;
	// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
	var getDescriptor = DESCRIPTORS$5 && Object.getOwnPropertyDescriptor;

	var EXISTS = hasOwn$5(FunctionPrototype$1, 'name');
	// additional protection from minified / mangled / dropped function names
	var PROPER = EXISTS && (function something() { /* empty */ }).name === 'something';
	var CONFIGURABLE = EXISTS && (!DESCRIPTORS$5 || (DESCRIPTORS$5 && getDescriptor(FunctionPrototype$1, 'name').configurable));

	var functionName = {
	  EXISTS: EXISTS,
	  PROPER: PROPER,
	  CONFIGURABLE: CONFIGURABLE
	};

	var global$i = global$B;
	var isCallable$6 = isCallable$e;
	var hasOwn$4 = hasOwnProperty_1;
	var createNonEnumerableProperty$5 = createNonEnumerableProperty$7;
	var setGlobal$1 = setGlobal$3;
	var inspectSource$1 = inspectSource$3;
	var InternalStateModule = internalState;
	var CONFIGURABLE_FUNCTION_NAME = functionName.CONFIGURABLE;

	var getInternalState$3 = InternalStateModule.get;
	var enforceInternalState$1 = InternalStateModule.enforce;
	var TEMPLATE = String(String).split('String');

	(redefine$4.exports = function (O, key, value, options) {
	  var unsafe = options ? !!options.unsafe : false;
	  var simple = options ? !!options.enumerable : false;
	  var noTargetGet = options ? !!options.noTargetGet : false;
	  var name = options && options.name !== undefined ? options.name : key;
	  var state;
	  if (isCallable$6(value)) {
	    if (String(name).slice(0, 7) === 'Symbol(') {
	      name = '[' + String(name).replace(/^Symbol\(([^)]*)\)/, '$1') + ']';
	    }
	    if (!hasOwn$4(value, 'name') || (CONFIGURABLE_FUNCTION_NAME && value.name !== name)) {
	      createNonEnumerableProperty$5(value, 'name', name);
	    }
	    state = enforceInternalState$1(value);
	    if (!state.source) {
	      state.source = TEMPLATE.join(typeof name == 'string' ? name : '');
	    }
	  }
	  if (O === global$i) {
	    if (simple) O[key] = value;
	    else setGlobal$1(key, value);
	    return;
	  } else if (!unsafe) {
	    delete O[key];
	  } else if (!noTargetGet && O[key]) {
	    simple = true;
	  }
	  if (simple) O[key] = value;
	  else createNonEnumerableProperty$5(O, key, value);
	// add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
	})(Function.prototype, 'toString', function toString() {
	  return isCallable$6(this) && getInternalState$3(this).source || inspectSource$1(this);
	});

	var objectGetOwnPropertyNames = {};

	var ceil = Math.ceil;
	var floor = Math.floor;

	// `ToIntegerOrInfinity` abstract operation
	// https://tc39.es/ecma262/#sec-tointegerorinfinity
	var toIntegerOrInfinity$3 = function (argument) {
	  var number = +argument;
	  // eslint-disable-next-line no-self-compare -- safe
	  return number !== number || number === 0 ? 0 : (number > 0 ? floor : ceil)(number);
	};

	var toIntegerOrInfinity$2 = toIntegerOrInfinity$3;

	var max$2 = Math.max;
	var min$2 = Math.min;

	// Helper for a popular repeating case of the spec:
	// Let integer be ? ToInteger(index).
	// If integer < 0, let result be max((length + integer), 0); else let result be min(integer, length).
	var toAbsoluteIndex$3 = function (index, length) {
	  var integer = toIntegerOrInfinity$2(index);
	  return integer < 0 ? max$2(integer + length, 0) : min$2(integer, length);
	};

	var toIntegerOrInfinity$1 = toIntegerOrInfinity$3;

	var min$1 = Math.min;

	// `ToLength` abstract operation
	// https://tc39.es/ecma262/#sec-tolength
	var toLength$2 = function (argument) {
	  return argument > 0 ? min$1(toIntegerOrInfinity$1(argument), 0x1FFFFFFFFFFFFF) : 0; // 2 ** 53 - 1 == 9007199254740991
	};

	var toLength$1 = toLength$2;

	// `LengthOfArrayLike` abstract operation
	// https://tc39.es/ecma262/#sec-lengthofarraylike
	var lengthOfArrayLike$4 = function (obj) {
	  return toLength$1(obj.length);
	};

	var toIndexedObject$3 = toIndexedObject$5;
	var toAbsoluteIndex$2 = toAbsoluteIndex$3;
	var lengthOfArrayLike$3 = lengthOfArrayLike$4;

	// `Array.prototype.{ indexOf, includes }` methods implementation
	var createMethod$1 = function (IS_INCLUDES) {
	  return function ($this, el, fromIndex) {
	    var O = toIndexedObject$3($this);
	    var length = lengthOfArrayLike$3(O);
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

	var arrayIncludes = {
	  // `Array.prototype.includes` method
	  // https://tc39.es/ecma262/#sec-array.prototype.includes
	  includes: createMethod$1(true),
	  // `Array.prototype.indexOf` method
	  // https://tc39.es/ecma262/#sec-array.prototype.indexof
	  indexOf: createMethod$1(false)
	};

	var uncurryThis$b = functionUncurryThis;
	var hasOwn$3 = hasOwnProperty_1;
	var toIndexedObject$2 = toIndexedObject$5;
	var indexOf$1 = arrayIncludes.indexOf;
	var hiddenKeys$2 = hiddenKeys$4;

	var push$1 = uncurryThis$b([].push);

	var objectKeysInternal = function (object, names) {
	  var O = toIndexedObject$2(object);
	  var i = 0;
	  var result = [];
	  var key;
	  for (key in O) !hasOwn$3(hiddenKeys$2, key) && hasOwn$3(O, key) && push$1(result, key);
	  // Don't enum bug & hidden keys
	  while (names.length > i) if (hasOwn$3(O, key = names[i++])) {
	    ~indexOf$1(result, key) || push$1(result, key);
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

	var internalObjectKeys$1 = objectKeysInternal;
	var enumBugKeys$2 = enumBugKeys$3;

	var hiddenKeys$1 = enumBugKeys$2.concat('length', 'prototype');

	// `Object.getOwnPropertyNames` method
	// https://tc39.es/ecma262/#sec-object.getownpropertynames
	// eslint-disable-next-line es/no-object-getownpropertynames -- safe
	objectGetOwnPropertyNames.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
	  return internalObjectKeys$1(O, hiddenKeys$1);
	};

	var objectGetOwnPropertySymbols = {};

	// eslint-disable-next-line es/no-object-getownpropertysymbols -- safe
	objectGetOwnPropertySymbols.f = Object.getOwnPropertySymbols;

	var getBuiltIn$4 = getBuiltIn$7;
	var uncurryThis$a = functionUncurryThis;
	var getOwnPropertyNamesModule = objectGetOwnPropertyNames;
	var getOwnPropertySymbolsModule = objectGetOwnPropertySymbols;
	var anObject$8 = anObject$a;

	var concat = uncurryThis$a([].concat);

	// all object keys, includes non-enumerable and symbols
	var ownKeys$1 = getBuiltIn$4('Reflect', 'ownKeys') || function ownKeys(it) {
	  var keys = getOwnPropertyNamesModule.f(anObject$8(it));
	  var getOwnPropertySymbols = getOwnPropertySymbolsModule.f;
	  return getOwnPropertySymbols ? concat(keys, getOwnPropertySymbols(it)) : keys;
	};

	var hasOwn$2 = hasOwnProperty_1;
	var ownKeys = ownKeys$1;
	var getOwnPropertyDescriptorModule = objectGetOwnPropertyDescriptor;
	var definePropertyModule$3 = objectDefineProperty;

	var copyConstructorProperties$2 = function (target, source, exceptions) {
	  var keys = ownKeys(source);
	  var defineProperty = definePropertyModule$3.f;
	  var getOwnPropertyDescriptor = getOwnPropertyDescriptorModule.f;
	  for (var i = 0; i < keys.length; i++) {
	    var key = keys[i];
	    if (!hasOwn$2(target, key) && !(exceptions && hasOwn$2(exceptions, key))) {
	      defineProperty(target, key, getOwnPropertyDescriptor(source, key));
	    }
	  }
	};

	var fails$b = fails$i;
	var isCallable$5 = isCallable$e;

	var replacement = /#|\.prototype\./;

	var isForced$2 = function (feature, detection) {
	  var value = data[normalize(feature)];
	  return value == POLYFILL ? true
	    : value == NATIVE ? false
	    : isCallable$5(detection) ? fails$b(detection)
	    : !!detection;
	};

	var normalize = isForced$2.normalize = function (string) {
	  return String(string).replace(replacement, '.').toLowerCase();
	};

	var data = isForced$2.data = {};
	var NATIVE = isForced$2.NATIVE = 'N';
	var POLYFILL = isForced$2.POLYFILL = 'P';

	var isForced_1 = isForced$2;

	var global$h = global$B;
	var getOwnPropertyDescriptor = objectGetOwnPropertyDescriptor.f;
	var createNonEnumerableProperty$4 = createNonEnumerableProperty$7;
	var redefine$3 = redefine$4.exports;
	var setGlobal = setGlobal$3;
	var copyConstructorProperties$1 = copyConstructorProperties$2;
	var isForced$1 = isForced_1;

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
	    target = global$h;
	  } else if (STATIC) {
	    target = global$h[TARGET] || setGlobal(TARGET, {});
	  } else {
	    target = (global$h[TARGET] || {}).prototype;
	  }
	  if (target) for (key in source) {
	    sourceProperty = source[key];
	    if (options.noTargetGet) {
	      descriptor = getOwnPropertyDescriptor(target, key);
	      targetProperty = descriptor && descriptor.value;
	    } else targetProperty = target[key];
	    FORCED = isForced$1(GLOBAL ? key : TARGET + (STATIC ? '.' : '#') + key, options.forced);
	    // contained in target
	    if (!FORCED && targetProperty !== undefined) {
	      if (typeof sourceProperty == typeof targetProperty) continue;
	      copyConstructorProperties$1(sourceProperty, targetProperty);
	    }
	    // add a flag to not completely full polyfills
	    if (options.sham || (targetProperty && targetProperty.sham)) {
	      createNonEnumerableProperty$4(sourceProperty, 'sham', true);
	    }
	    // extend global
	    redefine$3(target, key, sourceProperty, options);
	  }
	};

	var wellKnownSymbol$a = wellKnownSymbol$c;

	var TO_STRING_TAG$1 = wellKnownSymbol$a('toStringTag');
	var test = {};

	test[TO_STRING_TAG$1] = 'z';

	var toStringTagSupport = String(test) === '[object z]';

	var global$g = global$B;
	var TO_STRING_TAG_SUPPORT = toStringTagSupport;
	var isCallable$4 = isCallable$e;
	var classofRaw = classofRaw$1;
	var wellKnownSymbol$9 = wellKnownSymbol$c;

	var TO_STRING_TAG = wellKnownSymbol$9('toStringTag');
	var Object$1 = global$g.Object;

	// ES3 wrong here
	var CORRECT_ARGUMENTS = classofRaw(function () { return arguments; }()) == 'Arguments';

	// fallback for IE11 Script Access Denied error
	var tryGet = function (it, key) {
	  try {
	    return it[key];
	  } catch (error) { /* empty */ }
	};

	// getting tag from ES6+ `Object.prototype.toString`
	var classof$7 = TO_STRING_TAG_SUPPORT ? classofRaw : function (it) {
	  var O, tag, result;
	  return it === undefined ? 'Undefined' : it === null ? 'Null'
	    // @@toStringTag case
	    : typeof (tag = tryGet(O = Object$1(it), TO_STRING_TAG)) == 'string' ? tag
	    // builtinTag case
	    : CORRECT_ARGUMENTS ? classofRaw(O)
	    // ES3 arguments fallback
	    : (result = classofRaw(O)) == 'Object' && isCallable$4(O.callee) ? 'Arguments' : result;
	};

	var global$f = global$B;
	var classof$6 = classof$7;

	var String$2 = global$f.String;

	var toString$5 = function (argument) {
	  if (classof$6(argument) === 'Symbol') throw TypeError('Cannot convert a Symbol value to a string');
	  return String$2(argument);
	};

	var anObject$7 = anObject$a;

	// `RegExp.prototype.flags` getter implementation
	// https://tc39.es/ecma262/#sec-get-regexp.prototype.flags
	var regexpFlags$1 = function () {
	  var that = anObject$7(this);
	  var result = '';
	  if (that.global) result += 'g';
	  if (that.ignoreCase) result += 'i';
	  if (that.multiline) result += 'm';
	  if (that.dotAll) result += 's';
	  if (that.unicode) result += 'u';
	  if (that.sticky) result += 'y';
	  return result;
	};

	var fails$a = fails$i;
	var global$e = global$B;

	// babel-minify and Closure Compiler transpiles RegExp('a', 'y') -> /a/y and it causes SyntaxError
	var $RegExp$2 = global$e.RegExp;

	var UNSUPPORTED_Y$3 = fails$a(function () {
	  var re = $RegExp$2('a', 'y');
	  re.lastIndex = 2;
	  return re.exec('abcd') != null;
	});

	// UC Browser bug
	// https://github.com/zloirock/core-js/issues/1008
	var MISSED_STICKY$2 = UNSUPPORTED_Y$3 || fails$a(function () {
	  return !$RegExp$2('a', 'y').sticky;
	});

	var BROKEN_CARET = UNSUPPORTED_Y$3 || fails$a(function () {
	  // https://bugzilla.mozilla.org/show_bug.cgi?id=773687
	  var re = $RegExp$2('^r', 'gy');
	  re.lastIndex = 2;
	  return re.exec('str') != null;
	});

	var regexpStickyHelpers = {
	  BROKEN_CARET: BROKEN_CARET,
	  MISSED_STICKY: MISSED_STICKY$2,
	  UNSUPPORTED_Y: UNSUPPORTED_Y$3
	};

	var objectDefineProperties = {};

	var internalObjectKeys = objectKeysInternal;
	var enumBugKeys$1 = enumBugKeys$3;

	// `Object.keys` method
	// https://tc39.es/ecma262/#sec-object.keys
	// eslint-disable-next-line es/no-object-keys -- safe
	var objectKeys$1 = Object.keys || function keys(O) {
	  return internalObjectKeys(O, enumBugKeys$1);
	};

	var DESCRIPTORS$4 = descriptors;
	var V8_PROTOTYPE_DEFINE_BUG = v8PrototypeDefineBug;
	var definePropertyModule$2 = objectDefineProperty;
	var anObject$6 = anObject$a;
	var toIndexedObject$1 = toIndexedObject$5;
	var objectKeys = objectKeys$1;

	// `Object.defineProperties` method
	// https://tc39.es/ecma262/#sec-object.defineproperties
	// eslint-disable-next-line es/no-object-defineproperties -- safe
	objectDefineProperties.f = DESCRIPTORS$4 && !V8_PROTOTYPE_DEFINE_BUG ? Object.defineProperties : function defineProperties(O, Properties) {
	  anObject$6(O);
	  var props = toIndexedObject$1(Properties);
	  var keys = objectKeys(Properties);
	  var length = keys.length;
	  var index = 0;
	  var key;
	  while (length > index) definePropertyModule$2.f(O, key = keys[index++], props[key]);
	  return O;
	};

	var getBuiltIn$3 = getBuiltIn$7;

	var html$1 = getBuiltIn$3('document', 'documentElement');

	/* global ActiveXObject -- old IE, WSH */

	var anObject$5 = anObject$a;
	var definePropertiesModule = objectDefineProperties;
	var enumBugKeys = enumBugKeys$3;
	var hiddenKeys = hiddenKeys$4;
	var html = html$1;
	var documentCreateElement = documentCreateElement$1;
	var sharedKey = sharedKey$2;

	var GT = '>';
	var LT = '<';
	var PROTOTYPE = 'prototype';
	var SCRIPT = 'script';
	var IE_PROTO = sharedKey('IE_PROTO');

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
	  var iframe = documentCreateElement('iframe');
	  var JS = 'java' + SCRIPT + ':';
	  var iframeDocument;
	  iframe.style.display = 'none';
	  html.appendChild(iframe);
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
	  var length = enumBugKeys.length;
	  while (length--) delete NullProtoObject[PROTOTYPE][enumBugKeys[length]];
	  return NullProtoObject();
	};

	hiddenKeys[IE_PROTO] = true;

	// `Object.create` method
	// https://tc39.es/ecma262/#sec-object.create
	var objectCreate = Object.create || function create(O, Properties) {
	  var result;
	  if (O !== null) {
	    EmptyConstructor[PROTOTYPE] = anObject$5(O);
	    result = new EmptyConstructor();
	    EmptyConstructor[PROTOTYPE] = null;
	    // add "__proto__" for Object.getPrototypeOf polyfill
	    result[IE_PROTO] = O;
	  } else result = NullProtoObject();
	  return Properties === undefined ? result : definePropertiesModule.f(result, Properties);
	};

	var fails$9 = fails$i;
	var global$d = global$B;

	// babel-minify and Closure Compiler transpiles RegExp('.', 's') -> /./s and it causes SyntaxError
	var $RegExp$1 = global$d.RegExp;

	var regexpUnsupportedDotAll = fails$9(function () {
	  var re = $RegExp$1('.', 's');
	  return !(re.dotAll && re.exec('\n') && re.flags === 's');
	});

	var fails$8 = fails$i;
	var global$c = global$B;

	// babel-minify and Closure Compiler transpiles RegExp('(?<a>b)', 'g') -> /(?<a>b)/g and it causes SyntaxError
	var $RegExp = global$c.RegExp;

	var regexpUnsupportedNcg = fails$8(function () {
	  var re = $RegExp('(?<a>b)', 'g');
	  return re.exec('b').groups.a !== 'b' ||
	    'b'.replace(re, '$<a>c') !== 'bc';
	});

	/* eslint-disable regexp/no-empty-capturing-group, regexp/no-empty-group, regexp/no-lazy-ends -- testing */
	/* eslint-disable regexp/no-useless-quantifier -- testing */
	var call$4 = functionCall;
	var uncurryThis$9 = functionUncurryThis;
	var toString$4 = toString$5;
	var regexpFlags = regexpFlags$1;
	var stickyHelpers$2 = regexpStickyHelpers;
	var shared = shared$4.exports;
	var create = objectCreate;
	var getInternalState$2 = internalState.get;
	var UNSUPPORTED_DOT_ALL$2 = regexpUnsupportedDotAll;
	var UNSUPPORTED_NCG$1 = regexpUnsupportedNcg;

	var nativeReplace = shared('native-string-replace', String.prototype.replace);
	var nativeExec = RegExp.prototype.exec;
	var patchedExec = nativeExec;
	var charAt$3 = uncurryThis$9(''.charAt);
	var indexOf = uncurryThis$9(''.indexOf);
	var replace$2 = uncurryThis$9(''.replace);
	var stringSlice$3 = uncurryThis$9(''.slice);

	var UPDATES_LAST_INDEX_WRONG = (function () {
	  var re1 = /a/;
	  var re2 = /b*/g;
	  call$4(nativeExec, re1, 'a');
	  call$4(nativeExec, re2, 'a');
	  return re1.lastIndex !== 0 || re2.lastIndex !== 0;
	})();

	var UNSUPPORTED_Y$2 = stickyHelpers$2.BROKEN_CARET;

	// nonparticipating capturing group, copied from es5-shim's String#split patch.
	var NPCG_INCLUDED = /()??/.exec('')[1] !== undefined;

	var PATCH = UPDATES_LAST_INDEX_WRONG || NPCG_INCLUDED || UNSUPPORTED_Y$2 || UNSUPPORTED_DOT_ALL$2 || UNSUPPORTED_NCG$1;

	if (PATCH) {
	  patchedExec = function exec(string) {
	    var re = this;
	    var state = getInternalState$2(re);
	    var str = toString$4(string);
	    var raw = state.raw;
	    var result, reCopy, lastIndex, match, i, object, group;

	    if (raw) {
	      raw.lastIndex = re.lastIndex;
	      result = call$4(patchedExec, raw, str);
	      re.lastIndex = raw.lastIndex;
	      return result;
	    }

	    var groups = state.groups;
	    var sticky = UNSUPPORTED_Y$2 && re.sticky;
	    var flags = call$4(regexpFlags, re);
	    var source = re.source;
	    var charsAdded = 0;
	    var strCopy = str;

	    if (sticky) {
	      flags = replace$2(flags, 'y', '');
	      if (indexOf(flags, 'g') === -1) {
	        flags += 'g';
	      }

	      strCopy = stringSlice$3(str, re.lastIndex);
	      // Support anchored sticky behavior.
	      if (re.lastIndex > 0 && (!re.multiline || re.multiline && charAt$3(str, re.lastIndex - 1) !== '\n')) {
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

	    match = call$4(nativeExec, sticky ? reCopy : re, strCopy);

	    if (sticky) {
	      if (match) {
	        match.input = stringSlice$3(match.input, charsAdded);
	        match[0] = stringSlice$3(match[0], charsAdded);
	        match.index = re.lastIndex;
	        re.lastIndex += match[0].length;
	      } else re.lastIndex = 0;
	    } else if (UPDATES_LAST_INDEX_WRONG && match) {
	      re.lastIndex = re.global ? match.index + match[0].length : lastIndex;
	    }
	    if (NPCG_INCLUDED && match && match.length > 1) {
	      // Fix browsers whose `exec` methods don't consistently return `undefined`
	      // for NPCG, like IE8. NOTE: This doesn' work for /(.?)?/
	      call$4(nativeReplace, match[0], reCopy, function () {
	        for (i = 1; i < arguments.length - 2; i++) {
	          if (arguments[i] === undefined) match[i] = undefined;
	        }
	      });
	    }

	    if (match && groups) {
	      match.groups = object = create(null);
	      for (i = 0; i < groups.length; i++) {
	        group = groups[i];
	        object[group[0]] = match[group[1]];
	      }
	    }

	    return match;
	  };
	}

	var regexpExec$3 = patchedExec;

	var $$4 = _export;
	var exec$3 = regexpExec$3;

	// `RegExp.prototype.exec` method
	// https://tc39.es/ecma262/#sec-regexp.prototype.exec
	$$4({ target: 'RegExp', proto: true, forced: /./.exec !== exec$3 }, {
	  exec: exec$3
	});

	var NATIVE_BIND = functionBindNative;

	var FunctionPrototype = Function.prototype;
	var apply$2 = FunctionPrototype.apply;
	var call$3 = FunctionPrototype.call;

	// eslint-disable-next-line es/no-reflect -- safe
	var functionApply = typeof Reflect == 'object' && Reflect.apply || (NATIVE_BIND ? call$3.bind(apply$2) : function () {
	  return call$3.apply(apply$2, arguments);
	});

	// TODO: Remove from `core-js@4` since it's moved to entry points

	var uncurryThis$8 = functionUncurryThis;
	var redefine$2 = redefine$4.exports;
	var regexpExec$2 = regexpExec$3;
	var fails$7 = fails$i;
	var wellKnownSymbol$8 = wellKnownSymbol$c;
	var createNonEnumerableProperty$3 = createNonEnumerableProperty$7;

	var SPECIES$5 = wellKnownSymbol$8('species');
	var RegExpPrototype$4 = RegExp.prototype;

	var fixRegexpWellKnownSymbolLogic = function (KEY, exec, FORCED, SHAM) {
	  var SYMBOL = wellKnownSymbol$8(KEY);

	  var DELEGATES_TO_SYMBOL = !fails$7(function () {
	    // String methods call symbol-named RegEp methods
	    var O = {};
	    O[SYMBOL] = function () { return 7; };
	    return ''[KEY](O) != 7;
	  });

	  var DELEGATES_TO_EXEC = DELEGATES_TO_SYMBOL && !fails$7(function () {
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
	      re.constructor[SPECIES$5] = function () { return re; };
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
	    var uncurriedNativeRegExpMethod = uncurryThis$8(/./[SYMBOL]);
	    var methods = exec(SYMBOL, ''[KEY], function (nativeMethod, regexp, str, arg2, forceStringMethod) {
	      var uncurriedNativeMethod = uncurryThis$8(nativeMethod);
	      var $exec = regexp.exec;
	      if ($exec === regexpExec$2 || $exec === RegExpPrototype$4.exec) {
	        if (DELEGATES_TO_SYMBOL && !forceStringMethod) {
	          // The native String method already delegates to @@method (this
	          // polyfilled function), leasing to infinite recursion.
	          // We avoid it by directly calling the native @@method method.
	          return { done: true, value: uncurriedNativeRegExpMethod(regexp, str, arg2) };
	        }
	        return { done: true, value: uncurriedNativeMethod(str, regexp, arg2) };
	      }
	      return { done: false };
	    });

	    redefine$2(String.prototype, KEY, methods[0]);
	    redefine$2(RegExpPrototype$4, SYMBOL, methods[1]);
	  }

	  if (SHAM) createNonEnumerableProperty$3(RegExpPrototype$4[SYMBOL], 'sham', true);
	};

	var isObject$5 = isObject$b;
	var classof$5 = classofRaw$1;
	var wellKnownSymbol$7 = wellKnownSymbol$c;

	var MATCH$1 = wellKnownSymbol$7('match');

	// `IsRegExp` abstract operation
	// https://tc39.es/ecma262/#sec-isregexp
	var isRegexp = function (it) {
	  var isRegExp;
	  return isObject$5(it) && ((isRegExp = it[MATCH$1]) !== undefined ? !!isRegExp : classof$5(it) == 'RegExp');
	};

	var uncurryThis$7 = functionUncurryThis;
	var fails$6 = fails$i;
	var isCallable$3 = isCallable$e;
	var classof$4 = classof$7;
	var getBuiltIn$2 = getBuiltIn$7;
	var inspectSource = inspectSource$3;

	var noop = function () { /* empty */ };
	var empty = [];
	var construct = getBuiltIn$2('Reflect', 'construct');
	var constructorRegExp = /^\s*(?:class|function)\b/;
	var exec$2 = uncurryThis$7(constructorRegExp.exec);
	var INCORRECT_TO_STRING = !constructorRegExp.exec(noop);

	var isConstructorModern = function isConstructor(argument) {
	  if (!isCallable$3(argument)) return false;
	  try {
	    construct(noop, empty, argument);
	    return true;
	  } catch (error) {
	    return false;
	  }
	};

	var isConstructorLegacy = function isConstructor(argument) {
	  if (!isCallable$3(argument)) return false;
	  switch (classof$4(argument)) {
	    case 'AsyncFunction':
	    case 'GeneratorFunction':
	    case 'AsyncGeneratorFunction': return false;
	  }
	  try {
	    // we can't check .prototype since constructors produced by .bind haven't it
	    // `Function#toString` throws on some built-it function in some legacy engines
	    // (for example, `DOMQuad` and similar in FF41-)
	    return INCORRECT_TO_STRING || !!exec$2(constructorRegExp, inspectSource(argument));
	  } catch (error) {
	    return true;
	  }
	};

	isConstructorLegacy.sham = true;

	// `IsConstructor` abstract operation
	// https://tc39.es/ecma262/#sec-isconstructor
	var isConstructor$3 = !construct || fails$6(function () {
	  var called;
	  return isConstructorModern(isConstructorModern.call)
	    || !isConstructorModern(Object)
	    || !isConstructorModern(function () { called = true; })
	    || called;
	}) ? isConstructorLegacy : isConstructorModern;

	var global$b = global$B;
	var isConstructor$2 = isConstructor$3;
	var tryToString = tryToString$2;

	var TypeError$6 = global$b.TypeError;

	// `Assert: IsConstructor(argument) is true`
	var aConstructor$1 = function (argument) {
	  if (isConstructor$2(argument)) return argument;
	  throw TypeError$6(tryToString(argument) + ' is not a constructor');
	};

	var anObject$4 = anObject$a;
	var aConstructor = aConstructor$1;
	var wellKnownSymbol$6 = wellKnownSymbol$c;

	var SPECIES$4 = wellKnownSymbol$6('species');

	// `SpeciesConstructor` abstract operation
	// https://tc39.es/ecma262/#sec-speciesconstructor
	var speciesConstructor$1 = function (O, defaultConstructor) {
	  var C = anObject$4(O).constructor;
	  var S;
	  return C === undefined || (S = anObject$4(C)[SPECIES$4]) == undefined ? defaultConstructor : aConstructor(S);
	};

	var uncurryThis$6 = functionUncurryThis;
	var toIntegerOrInfinity = toIntegerOrInfinity$3;
	var toString$3 = toString$5;
	var requireObjectCoercible$1 = requireObjectCoercible$4;

	var charAt$2 = uncurryThis$6(''.charAt);
	var charCodeAt = uncurryThis$6(''.charCodeAt);
	var stringSlice$2 = uncurryThis$6(''.slice);

	var createMethod = function (CONVERT_TO_STRING) {
	  return function ($this, pos) {
	    var S = toString$3(requireObjectCoercible$1($this));
	    var position = toIntegerOrInfinity(pos);
	    var size = S.length;
	    var first, second;
	    if (position < 0 || position >= size) return CONVERT_TO_STRING ? '' : undefined;
	    first = charCodeAt(S, position);
	    return first < 0xD800 || first > 0xDBFF || position + 1 === size
	      || (second = charCodeAt(S, position + 1)) < 0xDC00 || second > 0xDFFF
	        ? CONVERT_TO_STRING
	          ? charAt$2(S, position)
	          : first
	        : CONVERT_TO_STRING
	          ? stringSlice$2(S, position, position + 2)
	          : (first - 0xD800 << 10) + (second - 0xDC00) + 0x10000;
	  };
	};

	var stringMultibyte = {
	  // `String.prototype.codePointAt` method
	  // https://tc39.es/ecma262/#sec-string.prototype.codepointat
	  codeAt: createMethod(false),
	  // `String.prototype.at` method
	  // https://github.com/mathiasbynens/String.prototype.at
	  charAt: createMethod(true)
	};

	var charAt$1 = stringMultibyte.charAt;

	// `AdvanceStringIndex` abstract operation
	// https://tc39.es/ecma262/#sec-advancestringindex
	var advanceStringIndex$1 = function (S, index, unicode) {
	  return index + (unicode ? charAt$1(S, index).length : 1);
	};

	var toPropertyKey = toPropertyKey$3;
	var definePropertyModule$1 = objectDefineProperty;
	var createPropertyDescriptor$1 = createPropertyDescriptor$4;

	var createProperty$3 = function (object, key, value) {
	  var propertyKey = toPropertyKey(key);
	  if (propertyKey in object) definePropertyModule$1.f(object, propertyKey, createPropertyDescriptor$1(0, value));
	  else object[propertyKey] = value;
	};

	var global$a = global$B;
	var toAbsoluteIndex$1 = toAbsoluteIndex$3;
	var lengthOfArrayLike$2 = lengthOfArrayLike$4;
	var createProperty$2 = createProperty$3;

	var Array$3 = global$a.Array;
	var max$1 = Math.max;

	var arraySliceSimple = function (O, start, end) {
	  var length = lengthOfArrayLike$2(O);
	  var k = toAbsoluteIndex$1(start, length);
	  var fin = toAbsoluteIndex$1(end === undefined ? length : end, length);
	  var result = Array$3(max$1(fin - k, 0));
	  for (var n = 0; k < fin; k++, n++) createProperty$2(result, n, O[k]);
	  result.length = n;
	  return result;
	};

	var global$9 = global$B;
	var call$2 = functionCall;
	var anObject$3 = anObject$a;
	var isCallable$2 = isCallable$e;
	var classof$3 = classofRaw$1;
	var regexpExec$1 = regexpExec$3;

	var TypeError$5 = global$9.TypeError;

	// `RegExpExec` abstract operation
	// https://tc39.es/ecma262/#sec-regexpexec
	var regexpExecAbstract = function (R, S) {
	  var exec = R.exec;
	  if (isCallable$2(exec)) {
	    var result = call$2(exec, R, S);
	    if (result !== null) anObject$3(result);
	    return result;
	  }
	  if (classof$3(R) === 'RegExp') return call$2(regexpExec$1, R, S);
	  throw TypeError$5('RegExp#exec called on incompatible receiver');
	};

	var apply$1 = functionApply;
	var call$1 = functionCall;
	var uncurryThis$5 = functionUncurryThis;
	var fixRegExpWellKnownSymbolLogic = fixRegexpWellKnownSymbolLogic;
	var isRegExp$1 = isRegexp;
	var anObject$2 = anObject$a;
	var requireObjectCoercible = requireObjectCoercible$4;
	var speciesConstructor = speciesConstructor$1;
	var advanceStringIndex = advanceStringIndex$1;
	var toLength = toLength$2;
	var toString$2 = toString$5;
	var getMethod = getMethod$2;
	var arraySlice$1 = arraySliceSimple;
	var callRegExpExec = regexpExecAbstract;
	var regexpExec = regexpExec$3;
	var stickyHelpers$1 = regexpStickyHelpers;
	var fails$5 = fails$i;

	var UNSUPPORTED_Y$1 = stickyHelpers$1.UNSUPPORTED_Y;
	var MAX_UINT32 = 0xFFFFFFFF;
	var min = Math.min;
	var $push = [].push;
	var exec$1 = uncurryThis$5(/./.exec);
	var push = uncurryThis$5($push);
	var stringSlice$1 = uncurryThis$5(''.slice);

	// Chrome 51 has a buggy "split" implementation when RegExp#exec !== nativeExec
	// Weex JS has frozen built-in prototypes, so use try / catch wrapper
	var SPLIT_WORKS_WITH_OVERWRITTEN_EXEC = !fails$5(function () {
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
	      var string = toString$2(requireObjectCoercible(this));
	      var lim = limit === undefined ? MAX_UINT32 : limit >>> 0;
	      if (lim === 0) return [];
	      if (separator === undefined) return [string];
	      // If `separator` is not a regex, use native split
	      if (!isRegExp$1(separator)) {
	        return call$1(nativeSplit, string, separator, lim);
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
	      while (match = call$1(regexpExec, separatorCopy, string)) {
	        lastIndex = separatorCopy.lastIndex;
	        if (lastIndex > lastLastIndex) {
	          push(output, stringSlice$1(string, lastLastIndex, match.index));
	          if (match.length > 1 && match.index < string.length) apply$1($push, output, arraySlice$1(match, 1));
	          lastLength = match[0].length;
	          lastLastIndex = lastIndex;
	          if (output.length >= lim) break;
	        }
	        if (separatorCopy.lastIndex === match.index) separatorCopy.lastIndex++; // Avoid an infinite loop
	      }
	      if (lastLastIndex === string.length) {
	        if (lastLength || !exec$1(separatorCopy, '')) push(output, '');
	      } else push(output, stringSlice$1(string, lastLastIndex));
	      return output.length > lim ? arraySlice$1(output, 0, lim) : output;
	    };
	  // Chakra, V8
	  } else if ('0'.split(undefined, 0).length) {
	    internalSplit = function (separator, limit) {
	      return separator === undefined && limit === 0 ? [] : call$1(nativeSplit, this, separator, limit);
	    };
	  } else internalSplit = nativeSplit;

	  return [
	    // `String.prototype.split` method
	    // https://tc39.es/ecma262/#sec-string.prototype.split
	    function split(separator, limit) {
	      var O = requireObjectCoercible(this);
	      var splitter = separator == undefined ? undefined : getMethod(separator, SPLIT);
	      return splitter
	        ? call$1(splitter, separator, O, limit)
	        : call$1(internalSplit, toString$2(O), separator, limit);
	    },
	    // `RegExp.prototype[@@split]` method
	    // https://tc39.es/ecma262/#sec-regexp.prototype-@@split
	    //
	    // NOTE: This cannot be properly polyfilled in engines that don't support
	    // the 'y' flag.
	    function (string, limit) {
	      var rx = anObject$2(this);
	      var S = toString$2(string);
	      var res = maybeCallNative(internalSplit, rx, S, limit, internalSplit !== nativeSplit);

	      if (res.done) return res.value;

	      var C = speciesConstructor(rx, RegExp);

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
	        var z = callRegExpExec(splitter, UNSUPPORTED_Y$1 ? stringSlice$1(S, q) : S);
	        var e;
	        if (
	          z === null ||
	          (e = min(toLength(splitter.lastIndex + (UNSUPPORTED_Y$1 ? q : 0)), S.length)) === p
	        ) {
	          q = advanceStringIndex(S, q, unicodeMatching);
	        } else {
	          push(A, stringSlice$1(S, p, q));
	          if (A.length === lim) return A;
	          for (var i = 1; i <= z.length - 1; i++) {
	            push(A, z[i]);
	            if (A.length === lim) return A;
	          }
	          q = p = e;
	        }
	      }
	      push(A, stringSlice$1(S, p));
	      return A;
	    }
	  ];
	}, !SPLIT_WORKS_WITH_OVERWRITTEN_EXEC, UNSUPPORTED_Y$1);

	var classof$2 = classofRaw$1;

	// `IsArray` abstract operation
	// https://tc39.es/ecma262/#sec-isarray
	// eslint-disable-next-line es/no-array-isarray -- safe
	var isArray$3 = Array.isArray || function isArray(argument) {
	  return classof$2(argument) == 'Array';
	};

	var fails$4 = fails$i;
	var wellKnownSymbol$5 = wellKnownSymbol$c;
	var V8_VERSION$1 = engineV8Version;

	var SPECIES$3 = wellKnownSymbol$5('species');

	var arrayMethodHasSpeciesSupport$2 = function (METHOD_NAME) {
	  // We can't use this feature detection in V8 since it causes
	  // deoptimization and serious performance degradation
	  // https://github.com/zloirock/core-js/issues/677
	  return V8_VERSION$1 >= 51 || !fails$4(function () {
	    var array = [];
	    var constructor = array.constructor = {};
	    constructor[SPECIES$3] = function () {
	      return { foo: 1 };
	    };
	    return array[METHOD_NAME](Boolean).foo !== 1;
	  });
	};

	var uncurryThis$4 = functionUncurryThis;

	var arraySlice = uncurryThis$4([].slice);

	var $$3 = _export;
	var global$8 = global$B;
	var isArray$2 = isArray$3;
	var isConstructor$1 = isConstructor$3;
	var isObject$4 = isObject$b;
	var toAbsoluteIndex = toAbsoluteIndex$3;
	var lengthOfArrayLike$1 = lengthOfArrayLike$4;
	var toIndexedObject = toIndexedObject$5;
	var createProperty$1 = createProperty$3;
	var wellKnownSymbol$4 = wellKnownSymbol$c;
	var arrayMethodHasSpeciesSupport$1 = arrayMethodHasSpeciesSupport$2;
	var un$Slice = arraySlice;

	var HAS_SPECIES_SUPPORT = arrayMethodHasSpeciesSupport$1('slice');

	var SPECIES$2 = wellKnownSymbol$4('species');
	var Array$2 = global$8.Array;
	var max = Math.max;

	// `Array.prototype.slice` method
	// https://tc39.es/ecma262/#sec-array.prototype.slice
	// fallback for not array-like ES3 strings and DOM objects
	$$3({ target: 'Array', proto: true, forced: !HAS_SPECIES_SUPPORT }, {
	  slice: function slice(start, end) {
	    var O = toIndexedObject(this);
	    var length = lengthOfArrayLike$1(O);
	    var k = toAbsoluteIndex(start, length);
	    var fin = toAbsoluteIndex(end === undefined ? length : end, length);
	    // inline `ArraySpeciesCreate` for usage native `Array#slice` where it's possible
	    var Constructor, result, n;
	    if (isArray$2(O)) {
	      Constructor = O.constructor;
	      // cross-realm fallback
	      if (isConstructor$1(Constructor) && (Constructor === Array$2 || isArray$2(Constructor.prototype))) {
	        Constructor = undefined;
	      } else if (isObject$4(Constructor)) {
	        Constructor = Constructor[SPECIES$2];
	        if (Constructor === null) Constructor = undefined;
	      }
	      if (Constructor === Array$2 || Constructor === undefined) {
	        return un$Slice(O, k, fin);
	      }
	    }
	    result = new (Constructor === undefined ? Array$2 : Constructor)(max(fin - k, 0));
	    for (n = 0; k < fin; k++, n++) if (k in O) createProperty$1(result, n, O[k]);
	    result.length = n;
	    return result;
	  }
	});

	var $$2 = _export;
	var call = functionCall;

	// `URL.prototype.toJSON` method
	// https://url.spec.whatwg.org/#dom-url-tojson
	$$2({ target: 'URL', proto: true, enumerable: true }, {
	  toJSON: function toJSON() {
	    return call(URL.prototype.toString, this);
	  }
	});

	var global$7 = global$B;
	var isCallable$1 = isCallable$e;

	var String$1 = global$7.String;
	var TypeError$4 = global$7.TypeError;

	var aPossiblePrototype$1 = function (argument) {
	  if (typeof argument == 'object' || isCallable$1(argument)) return argument;
	  throw TypeError$4("Can't set " + String$1(argument) + ' as a prototype');
	};

	/* eslint-disable no-proto -- safe */

	var uncurryThis$3 = functionUncurryThis;
	var anObject$1 = anObject$a;
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
	    setter = uncurryThis$3(Object.getOwnPropertyDescriptor(Object.prototype, '__proto__').set);
	    setter(test, []);
	    CORRECT_SETTER = test instanceof Array;
	  } catch (error) { /* empty */ }
	  return function setPrototypeOf(O, proto) {
	    anObject$1(O);
	    aPossiblePrototype(proto);
	    if (CORRECT_SETTER) setter(O, proto);
	    else O.__proto__ = proto;
	    return O;
	  };
	}() : undefined);

	var isCallable = isCallable$e;
	var isObject$3 = isObject$b;
	var setPrototypeOf$1 = objectSetPrototypeOf;

	// makes subclassing work correct for wrapped built-ins
	var inheritIfRequired$2 = function ($this, dummy, Wrapper) {
	  var NewTarget, NewTargetPrototype;
	  if (
	    // it can work only with native `setPrototypeOf`
	    setPrototypeOf$1 &&
	    // we haven't completely correct pre-ES6 way for getting `new.target`, so use this
	    isCallable(NewTarget = dummy.constructor) &&
	    NewTarget !== Wrapper &&
	    isObject$3(NewTargetPrototype = NewTarget.prototype) &&
	    NewTargetPrototype !== Wrapper.prototype
	  ) setPrototypeOf$1($this, NewTargetPrototype);
	  return $this;
	};

	var toString$1 = toString$5;

	var normalizeStringArgument$1 = function (argument, $default) {
	  return argument === undefined ? arguments.length < 2 ? '' : $default : toString$1(argument);
	};

	var isObject$2 = isObject$b;
	var createNonEnumerableProperty$2 = createNonEnumerableProperty$7;

	// `InstallErrorCause` abstract operation
	// https://tc39.es/proposal-error-cause/#sec-errorobjects-install-error-cause
	var installErrorCause$1 = function (O, options) {
	  if (isObject$2(options) && 'cause' in options) {
	    createNonEnumerableProperty$2(O, 'cause', options.cause);
	  }
	};

	var uncurryThis$2 = functionUncurryThis;

	var replace$1 = uncurryThis$2(''.replace);

	var TEST = (function (arg) { return String(Error(arg).stack); })('zxcasd');
	var V8_OR_CHAKRA_STACK_ENTRY = /\n\s*at [^:]*:[^\n]*/;
	var IS_V8_OR_CHAKRA_STACK = V8_OR_CHAKRA_STACK_ENTRY.test(TEST);

	var clearErrorStack$1 = function (stack, dropEntries) {
	  if (IS_V8_OR_CHAKRA_STACK && typeof stack == 'string') {
	    while (dropEntries--) stack = replace$1(stack, V8_OR_CHAKRA_STACK_ENTRY, '');
	  } return stack;
	};

	var fails$3 = fails$i;
	var createPropertyDescriptor = createPropertyDescriptor$4;

	var errorStackInstallable = !fails$3(function () {
	  var error = Error('a');
	  if (!('stack' in error)) return true;
	  // eslint-disable-next-line es/no-object-defineproperty -- safe
	  Object.defineProperty(error, 'stack', createPropertyDescriptor(1, 7));
	  return error.stack !== 7;
	});

	var getBuiltIn$1 = getBuiltIn$7;
	var hasOwn$1 = hasOwnProperty_1;
	var createNonEnumerableProperty$1 = createNonEnumerableProperty$7;
	var isPrototypeOf$2 = objectIsPrototypeOf;
	var setPrototypeOf = objectSetPrototypeOf;
	var copyConstructorProperties = copyConstructorProperties$2;
	var inheritIfRequired$1 = inheritIfRequired$2;
	var normalizeStringArgument = normalizeStringArgument$1;
	var installErrorCause = installErrorCause$1;
	var clearErrorStack = clearErrorStack$1;
	var ERROR_STACK_INSTALLABLE = errorStackInstallable;

	var wrapErrorConstructorWithCause$1 = function (FULL_NAME, wrapper, FORCED, IS_AGGREGATE_ERROR) {
	  var OPTIONS_POSITION = IS_AGGREGATE_ERROR ? 2 : 1;
	  var path = FULL_NAME.split('.');
	  var ERROR_NAME = path[path.length - 1];
	  var OriginalError = getBuiltIn$1.apply(null, path);

	  if (!OriginalError) return;

	  var OriginalErrorPrototype = OriginalError.prototype;

	  // V8 9.3- bug https://bugs.chromium.org/p/v8/issues/detail?id=12006
	  if (hasOwn$1(OriginalErrorPrototype, 'cause')) delete OriginalErrorPrototype.cause;

	  if (!FORCED) return OriginalError;

	  var BaseError = getBuiltIn$1('Error');

	  var WrappedError = wrapper(function (a, b) {
	    var message = normalizeStringArgument(IS_AGGREGATE_ERROR ? b : a, undefined);
	    var result = IS_AGGREGATE_ERROR ? new OriginalError(a) : new OriginalError();
	    if (message !== undefined) createNonEnumerableProperty$1(result, 'message', message);
	    if (ERROR_STACK_INSTALLABLE) createNonEnumerableProperty$1(result, 'stack', clearErrorStack(result.stack, 2));
	    if (this && isPrototypeOf$2(OriginalErrorPrototype, this)) inheritIfRequired$1(result, this, WrappedError);
	    if (arguments.length > OPTIONS_POSITION) installErrorCause(result, arguments[OPTIONS_POSITION]);
	    return result;
	  });

	  WrappedError.prototype = OriginalErrorPrototype;

	  if (ERROR_NAME !== 'Error') {
	    if (setPrototypeOf) setPrototypeOf(WrappedError, BaseError);
	    else copyConstructorProperties(WrappedError, BaseError, { name: true });
	  }

	  copyConstructorProperties(WrappedError, OriginalError);

	  try {
	    // Safari 13- bug: WebAssembly errors does not have a proper `.name`
	    if (OriginalErrorPrototype.name !== ERROR_NAME) {
	      createNonEnumerableProperty$1(OriginalErrorPrototype, 'name', ERROR_NAME);
	    }
	    OriginalErrorPrototype.constructor = WrappedError;
	  } catch (error) { /* empty */ }

	  return WrappedError;
	};

	/* eslint-disable no-unused-vars -- required for functions `.length` */

	var $$1 = _export;
	var global$6 = global$B;
	var apply = functionApply;
	var wrapErrorConstructorWithCause = wrapErrorConstructorWithCause$1;

	var WEB_ASSEMBLY = 'WebAssembly';
	var WebAssembly = global$6[WEB_ASSEMBLY];

	var FORCED$1 = Error('e', { cause: 7 }).cause !== 7;

	var exportGlobalErrorCauseWrapper = function (ERROR_NAME, wrapper) {
	  var O = {};
	  O[ERROR_NAME] = wrapErrorConstructorWithCause(ERROR_NAME, wrapper, FORCED$1);
	  $$1({ global: true, forced: FORCED$1 }, O);
	};

	var exportWebAssemblyErrorCauseWrapper = function (ERROR_NAME, wrapper) {
	  if (WebAssembly && WebAssembly[ERROR_NAME]) {
	    var O = {};
	    O[ERROR_NAME] = wrapErrorConstructorWithCause(WEB_ASSEMBLY + '.' + ERROR_NAME, wrapper, FORCED$1);
	    $$1({ target: WEB_ASSEMBLY, stat: true, forced: FORCED$1 }, O);
	  }
	};

	// https://github.com/tc39/proposal-error-cause
	exportGlobalErrorCauseWrapper('Error', function (init) {
	  return function Error(message) { return apply(init, this, arguments); };
	});
	exportGlobalErrorCauseWrapper('EvalError', function (init) {
	  return function EvalError(message) { return apply(init, this, arguments); };
	});
	exportGlobalErrorCauseWrapper('RangeError', function (init) {
	  return function RangeError(message) { return apply(init, this, arguments); };
	});
	exportGlobalErrorCauseWrapper('ReferenceError', function (init) {
	  return function ReferenceError(message) { return apply(init, this, arguments); };
	});
	exportGlobalErrorCauseWrapper('SyntaxError', function (init) {
	  return function SyntaxError(message) { return apply(init, this, arguments); };
	});
	exportGlobalErrorCauseWrapper('TypeError', function (init) {
	  return function TypeError(message) { return apply(init, this, arguments); };
	});
	exportGlobalErrorCauseWrapper('URIError', function (init) {
	  return function URIError(message) { return apply(init, this, arguments); };
	});
	exportWebAssemblyErrorCauseWrapper('CompileError', function (init) {
	  return function CompileError(message) { return apply(init, this, arguments); };
	});
	exportWebAssemblyErrorCauseWrapper('LinkError', function (init) {
	  return function LinkError(message) { return apply(init, this, arguments); };
	});
	exportWebAssemblyErrorCauseWrapper('RuntimeError', function (init) {
	  return function RuntimeError(message) { return apply(init, this, arguments); };
	});

	var getBuiltIn = getBuiltIn$7;
	var definePropertyModule = objectDefineProperty;
	var wellKnownSymbol$3 = wellKnownSymbol$c;
	var DESCRIPTORS$3 = descriptors;

	var SPECIES$1 = wellKnownSymbol$3('species');

	var setSpecies$1 = function (CONSTRUCTOR_NAME) {
	  var Constructor = getBuiltIn(CONSTRUCTOR_NAME);
	  var defineProperty = definePropertyModule.f;

	  if (DESCRIPTORS$3 && Constructor && !Constructor[SPECIES$1]) {
	    defineProperty(Constructor, SPECIES$1, {
	      configurable: true,
	      get: function () { return this; }
	    });
	  }
	};

	var DESCRIPTORS$2 = descriptors;
	var global$5 = global$B;
	var uncurryThis$1 = functionUncurryThis;
	var isForced = isForced_1;
	var inheritIfRequired = inheritIfRequired$2;
	var createNonEnumerableProperty = createNonEnumerableProperty$7;
	var defineProperty$2 = objectDefineProperty.f;
	var getOwnPropertyNames = objectGetOwnPropertyNames.f;
	var isPrototypeOf$1 = objectIsPrototypeOf;
	var isRegExp = isRegexp;
	var toString = toString$5;
	var regExpFlags$1 = regexpFlags$1;
	var stickyHelpers = regexpStickyHelpers;
	var redefine$1 = redefine$4.exports;
	var fails$2 = fails$i;
	var hasOwn = hasOwnProperty_1;
	var enforceInternalState = internalState.enforce;
	var setSpecies = setSpecies$1;
	var wellKnownSymbol$2 = wellKnownSymbol$c;
	var UNSUPPORTED_DOT_ALL$1 = regexpUnsupportedDotAll;
	var UNSUPPORTED_NCG = regexpUnsupportedNcg;

	var MATCH = wellKnownSymbol$2('match');
	var NativeRegExp = global$5.RegExp;
	var RegExpPrototype$3 = NativeRegExp.prototype;
	var SyntaxError = global$5.SyntaxError;
	var getFlags$1 = uncurryThis$1(regExpFlags$1);
	var exec = uncurryThis$1(RegExpPrototype$3.exec);
	var charAt = uncurryThis$1(''.charAt);
	var replace = uncurryThis$1(''.replace);
	var stringIndexOf = uncurryThis$1(''.indexOf);
	var stringSlice = uncurryThis$1(''.slice);
	// TODO: Use only propper RegExpIdentifierName
	var IS_NCG = /^\?<[^\s\d!#%&*+<=>@^][^\s!#%&*+<=>@^]*>/;
	var re1 = /a/g;
	var re2 = /a/g;

	// "new" should create a new object, old webkit bug
	var CORRECT_NEW = new NativeRegExp(re1) !== re1;

	var MISSED_STICKY$1 = stickyHelpers.MISSED_STICKY;
	var UNSUPPORTED_Y = stickyHelpers.UNSUPPORTED_Y;

	var BASE_FORCED = DESCRIPTORS$2 &&
	  (!CORRECT_NEW || MISSED_STICKY$1 || UNSUPPORTED_DOT_ALL$1 || UNSUPPORTED_NCG || fails$2(function () {
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
	    chr = charAt(string, index);
	    if (chr === '\\') {
	      result += chr + charAt(string, ++index);
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
	    chr = charAt(string, index);
	    if (chr === '\\') {
	      chr = chr + charAt(string, ++index);
	    } else if (chr === ']') {
	      brackets = false;
	    } else if (!brackets) switch (true) {
	      case chr === '[':
	        brackets = true;
	        break;
	      case chr === '(':
	        if (exec(IS_NCG, stringSlice(string, index + 1))) {
	          index += 2;
	          ncg = true;
	        }
	        result += chr;
	        groupid++;
	        continue;
	      case chr === '>' && ncg:
	        if (groupname === '' || hasOwn(names, groupname)) {
	          throw new SyntaxError('Invalid capture group name');
	        }
	        names[groupname] = true;
	        named[named.length] = [groupname, groupid];
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
	if (isForced('RegExp', BASE_FORCED)) {
	  var RegExpWrapper = function RegExp(pattern, flags) {
	    var thisIsRegExp = isPrototypeOf$1(RegExpPrototype$3, this);
	    var patternIsRegExp = isRegExp(pattern);
	    var flagsAreUndefined = flags === undefined;
	    var groups = [];
	    var rawPattern = pattern;
	    var rawFlags, dotAll, sticky, handled, result, state;

	    if (!thisIsRegExp && patternIsRegExp && flagsAreUndefined && pattern.constructor === RegExpWrapper) {
	      return pattern;
	    }

	    if (patternIsRegExp || isPrototypeOf$1(RegExpPrototype$3, pattern)) {
	      pattern = pattern.source;
	      if (flagsAreUndefined) flags = 'flags' in rawPattern ? rawPattern.flags : getFlags$1(rawPattern);
	    }

	    pattern = pattern === undefined ? '' : toString(pattern);
	    flags = flags === undefined ? '' : toString(flags);
	    rawPattern = pattern;

	    if (UNSUPPORTED_DOT_ALL$1 && 'dotAll' in re1) {
	      dotAll = !!flags && stringIndexOf(flags, 's') > -1;
	      if (dotAll) flags = replace(flags, /s/g, '');
	    }

	    rawFlags = flags;

	    if (MISSED_STICKY$1 && 'sticky' in re1) {
	      sticky = !!flags && stringIndexOf(flags, 'y') > -1;
	      if (sticky && UNSUPPORTED_Y) flags = replace(flags, /y/g, '');
	    }

	    if (UNSUPPORTED_NCG) {
	      handled = handleNCG(pattern);
	      pattern = handled[0];
	      groups = handled[1];
	    }

	    result = inheritIfRequired(NativeRegExp(pattern, flags), thisIsRegExp ? this : RegExpPrototype$3, RegExpWrapper);

	    if (dotAll || sticky || groups.length) {
	      state = enforceInternalState(result);
	      if (dotAll) {
	        state.dotAll = true;
	        state.raw = RegExpWrapper(handleDotAll(pattern), rawFlags);
	      }
	      if (sticky) state.sticky = true;
	      if (groups.length) state.groups = groups;
	    }

	    if (pattern !== rawPattern) try {
	      // fails in old engines, but we have no alternatives for unsupported regex syntax
	      createNonEnumerableProperty(result, 'source', rawPattern === '' ? '(?:)' : rawPattern);
	    } catch (error) { /* empty */ }

	    return result;
	  };

	  var proxy = function (key) {
	    key in RegExpWrapper || defineProperty$2(RegExpWrapper, key, {
	      configurable: true,
	      get: function () { return NativeRegExp[key]; },
	      set: function (it) { NativeRegExp[key] = it; }
	    });
	  };

	  for (var keys = getOwnPropertyNames(NativeRegExp), index = 0; keys.length > index;) {
	    proxy(keys[index++]);
	  }

	  RegExpPrototype$3.constructor = RegExpWrapper;
	  RegExpWrapper.prototype = RegExpPrototype$3;
	  redefine$1(global$5, 'RegExp', RegExpWrapper);
	}

	// https://tc39.es/ecma262/#sec-get-regexp-@@species
	setSpecies('RegExp');

	var global$4 = global$B;
	var DESCRIPTORS$1 = descriptors;
	var UNSUPPORTED_DOT_ALL = regexpUnsupportedDotAll;
	var classof$1 = classofRaw$1;
	var defineProperty$1 = objectDefineProperty.f;
	var getInternalState$1 = internalState.get;

	var RegExpPrototype$2 = RegExp.prototype;
	var TypeError$3 = global$4.TypeError;

	// `RegExp.prototype.dotAll` getter
	// https://tc39.es/ecma262/#sec-get-regexp.prototype.dotall
	if (DESCRIPTORS$1 && UNSUPPORTED_DOT_ALL) {
	  defineProperty$1(RegExpPrototype$2, 'dotAll', {
	    configurable: true,
	    get: function () {
	      if (this === RegExpPrototype$2) return undefined;
	      // We can't use InternalStateModule.getterFor because
	      // we don't add metadata for regexps created by a literal.
	      if (classof$1(this) === 'RegExp') {
	        return !!getInternalState$1(this).dotAll;
	      }
	      throw TypeError$3('Incompatible receiver, RegExp required');
	    }
	  });
	}

	var global$3 = global$B;
	var DESCRIPTORS = descriptors;
	var MISSED_STICKY = regexpStickyHelpers.MISSED_STICKY;
	var classof = classofRaw$1;
	var defineProperty = objectDefineProperty.f;
	var getInternalState = internalState.get;

	var RegExpPrototype$1 = RegExp.prototype;
	var TypeError$2 = global$3.TypeError;

	// `RegExp.prototype.sticky` getter
	// https://tc39.es/ecma262/#sec-get-regexp.prototype.sticky
	if (DESCRIPTORS && MISSED_STICKY) {
	  defineProperty(RegExpPrototype$1, 'sticky', {
	    configurable: true,
	    get: function () {
	      if (this === RegExpPrototype$1) return undefined;
	      // We can't use InternalStateModule.getterFor because
	      // we don't add metadata for regexps created by a literal.
	      if (classof(this) === 'RegExp') {
	        return !!getInternalState(this).sticky;
	      }
	      throw TypeError$2('Incompatible receiver, RegExp required');
	    }
	  });
	}

	var uncurryThis = functionUncurryThis;
	var PROPER_FUNCTION_NAME = functionName.PROPER;
	var redefine = redefine$4.exports;
	var anObject = anObject$a;
	var isPrototypeOf = objectIsPrototypeOf;
	var $toString = toString$5;
	var fails$1 = fails$i;
	var regExpFlags = regexpFlags$1;

	var TO_STRING = 'toString';
	var RegExpPrototype = RegExp.prototype;
	var n$ToString = RegExpPrototype[TO_STRING];
	var getFlags = uncurryThis(regExpFlags);

	var NOT_GENERIC = fails$1(function () { return n$ToString.call({ source: 'a', flags: 'b' }) != '/a/b'; });
	// FF44- RegExp#toString has a wrong name
	var INCORRECT_NAME = PROPER_FUNCTION_NAME && n$ToString.name != TO_STRING;

	// `RegExp.prototype.toString` method
	// https://tc39.es/ecma262/#sec-regexp.prototype.tostring
	if (NOT_GENERIC || INCORRECT_NAME) {
	  redefine(RegExp.prototype, TO_STRING, function toString() {
	    var R = anObject(this);
	    var p = $toString(R.source);
	    var rf = R.flags;
	    var f = $toString(rf === undefined && isPrototypeOf(RegExpPrototype, R) && !('flags' in RegExpPrototype) ? getFlags(R) : rf);
	    return '/' + p + '/' + f;
	  }, { unsafe: true });
	}

	var global$2 = global$B;
	var isArray$1 = isArray$3;
	var isConstructor = isConstructor$3;
	var isObject$1 = isObject$b;
	var wellKnownSymbol$1 = wellKnownSymbol$c;

	var SPECIES = wellKnownSymbol$1('species');
	var Array$1 = global$2.Array;

	// a part of `ArraySpeciesCreate` abstract operation
	// https://tc39.es/ecma262/#sec-arrayspeciescreate
	var arraySpeciesConstructor$1 = function (originalArray) {
	  var C;
	  if (isArray$1(originalArray)) {
	    C = originalArray.constructor;
	    // cross-realm fallback
	    if (isConstructor(C) && (C === Array$1 || isArray$1(C.prototype))) C = undefined;
	    else if (isObject$1(C)) {
	      C = C[SPECIES];
	      if (C === null) C = undefined;
	    }
	  } return C === undefined ? Array$1 : C;
	};

	var arraySpeciesConstructor = arraySpeciesConstructor$1;

	// `ArraySpeciesCreate` abstract operation
	// https://tc39.es/ecma262/#sec-arrayspeciescreate
	var arraySpeciesCreate$1 = function (originalArray, length) {
	  return new (arraySpeciesConstructor(originalArray))(length === 0 ? 0 : length);
	};

	var $ = _export;
	var global$1 = global$B;
	var fails = fails$i;
	var isArray = isArray$3;
	var isObject = isObject$b;
	var toObject = toObject$2;
	var lengthOfArrayLike = lengthOfArrayLike$4;
	var createProperty = createProperty$3;
	var arraySpeciesCreate = arraySpeciesCreate$1;
	var arrayMethodHasSpeciesSupport = arrayMethodHasSpeciesSupport$2;
	var wellKnownSymbol = wellKnownSymbol$c;
	var V8_VERSION = engineV8Version;

	var IS_CONCAT_SPREADABLE = wellKnownSymbol('isConcatSpreadable');
	var MAX_SAFE_INTEGER = 0x1FFFFFFFFFFFFF;
	var MAXIMUM_ALLOWED_INDEX_EXCEEDED = 'Maximum allowed index exceeded';
	var TypeError$1 = global$1.TypeError;

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
	$({ target: 'Array', proto: true, forced: FORCED }, {
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
	        if (n + len > MAX_SAFE_INTEGER) throw TypeError$1(MAXIMUM_ALLOWED_INDEX_EXCEEDED);
	        for (k = 0; k < len; k++, n++) if (k in E) createProperty(A, n, E[k]);
	      } else {
	        if (n >= MAX_SAFE_INTEGER) throw TypeError$1(MAXIMUM_ALLOWED_INDEX_EXCEEDED);
	        createProperty(A, n++, E);
	      }
	    }
	    A.length = n;
	    return A;
	  }
	});

	class r {
	  #t = [];
	  static STOP_PROPAGATION = "STOP_PROPAGATION";

	  bindListener(e, t, r, n) {
	    this.#t = this.#t || [];

	    const o = function (e, o, i) {
	      return r.call(t, e, o, i, n);
	    };

	    return this.#t[e] ? this.#t[e].push(o) - 1 : (this.#t[e] = [o], 0);
	  }

	  addListener(e, t, r = {}) {
	    this.#t = this.#t || [];

	    const n = function (e, n, o = {}) {
	      return t({
	        context: e,
	        eventName: n,
	        ...o,
	        ...r
	      });
	    };

	    return this.#t[e] ? this.#t[e].push(n) - 1 : (this.#t[e] = [n], 0);
	  }

	  removeListener(e, t) {
	    this.#t[e] && this.#t[e][t] ? delete this.#t[e][t] : console.log("trying to remove non-existent event handler, event = " + e + " handle = " + t);
	  }

	  destructor() {
	    this.#t = null;
	  }

	  fireEvent(e, t) {
	    if (this.#t) for (let t in this.#t[e]) if (this.#t[e].hasOwnProperty(t) && this.#t[e][t](this, e, arguments[1]) === r.STOP_PROPAGATION) break;
	  }

	}

	var n = "undefined" != typeof globalThis ? globalThis : "undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self ? self : {};

	function o(e) {
	  throw new Error('Could not dynamically require "' + e + '". Please configure the dynamicRequireTargets or/and ignoreDynamicRequires option of @rollup/plugin-commonjs appropriately for this require call to work.');
	}

	var s = function e(t, r, n) {
	  function i(a, c) {
	    if (!r[a]) {
	      if (!t[a]) {
	        if (!c && o) return o(a);
	        if (s) return s(a, !0);
	        var l = new Error("Cannot find module '" + a + "'");
	        throw l.code = "MODULE_NOT_FOUND", l;
	      }

	      var u = r[a] = {
	        exports: {}
	      };
	      t[a][0].call(u.exports, function (e) {
	        var r = t[a][1][e];
	        return i(r || e);
	      }, u, u.exports, e, t, r, n);
	    }

	    return r[a].exports;
	  }

	  for (var s = o, a = 0; a < n.length; a++) i(n[a]);

	  return i;
	}({
	  1: [function (e, t, r) {
	    (function (e) {
	      var r,
	          n,
	          o = e.MutationObserver || e.WebKitMutationObserver;

	      if (o) {
	        var i = 0,
	            s = new o(u),
	            a = e.document.createTextNode("");
	        s.observe(a, {
	          characterData: !0
	        }), r = function () {
	          a.data = i = ++i % 2;
	        };
	      } else if (e.setImmediate || void 0 === e.MessageChannel) r = "document" in e && "onreadystatechange" in e.document.createElement("script") ? function () {
	        var t = e.document.createElement("script");
	        t.onreadystatechange = function () {
	          u(), t.onreadystatechange = null, t.parentNode.removeChild(t), t = null;
	        }, e.document.documentElement.appendChild(t);
	      } : function () {
	        setTimeout(u, 0);
	      };else {
	        var c = new e.MessageChannel();
	        c.port1.onmessage = u, r = function () {
	          c.port2.postMessage(0);
	        };
	      }

	      var l = [];

	      function u() {
	        var e, t;
	        n = !0;

	        for (var r = l.length; r;) {
	          for (t = l, l = [], e = -1; ++e < r;) t[e]();

	          r = l.length;
	        }

	        n = !1;
	      }

	      function d(e) {
	        1 !== l.push(e) || n || r();
	      }

	      t.exports = d;
	    }).call(this, void 0 !== n ? n : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {});
	  }, {}],
	  2: [function (e, t, r) {
	    var n = e(1);

	    function o() {}

	    var i = {},
	        s = ["REJECTED"],
	        a = ["FULFILLED"],
	        c = ["PENDING"];

	    function l(e) {
	      if ("function" != typeof e) throw new TypeError("resolver must be a function");
	      this.state = c, this.queue = [], this.outcome = void 0, e !== o && f(this, e);
	    }

	    function u(e, t, r) {
	      this.promise = e, "function" == typeof t && (this.onFulfilled = t, this.callFulfilled = this.otherCallFulfilled), "function" == typeof r && (this.onRejected = r, this.callRejected = this.otherCallRejected);
	    }

	    function d(e, t, r) {
	      n(function () {
	        var n;

	        try {
	          n = t(r);
	        } catch (t) {
	          return i.reject(e, t);
	        }

	        n === e ? i.reject(e, new TypeError("Cannot resolve promise with itself")) : i.resolve(e, n);
	      });
	    }

	    function h(e) {
	      var t = e && e.then;
	      if (e && ("object" == typeof e || "function" == typeof e) && "function" == typeof t) return function () {
	        t.apply(e, arguments);
	      };
	    }

	    function f(e, t) {
	      var r = !1;

	      function n(t) {
	        r || (r = !0, i.reject(e, t));
	      }

	      function o(t) {
	        r || (r = !0, i.resolve(e, t));
	      }

	      function s() {
	        t(o, n);
	      }

	      var a = p(s);
	      "error" === a.status && n(a.value);
	    }

	    function p(e, t) {
	      var r = {};

	      try {
	        r.value = e(t), r.status = "success";
	      } catch (e) {
	        r.status = "error", r.value = e;
	      }

	      return r;
	    }

	    function v(e) {
	      return e instanceof this ? e : i.resolve(new this(o), e);
	    }

	    function y(e) {
	      var t = new this(o);
	      return i.reject(t, e);
	    }

	    function m(e) {
	      var t = this;
	      if ("[object Array]" !== Object.prototype.toString.call(e)) return this.reject(new TypeError("must be an array"));
	      var r = e.length,
	          n = !1;
	      if (!r) return this.resolve([]);

	      for (var s = new Array(r), a = 0, c = -1, l = new this(o); ++c < r;) u(e[c], c);

	      return l;

	      function u(e, o) {
	        function c(e) {
	          s[o] = e, ++a !== r || n || (n = !0, i.resolve(l, s));
	        }

	        t.resolve(e).then(c, function (e) {
	          n || (n = !0, i.reject(l, e));
	        });
	      }
	    }

	    function g(e) {
	      var t = this;
	      if ("[object Array]" !== Object.prototype.toString.call(e)) return this.reject(new TypeError("must be an array"));
	      var r = e.length,
	          n = !1;
	      if (!r) return this.resolve([]);

	      for (var s = -1, a = new this(o); ++s < r;) c(e[s]);

	      return a;

	      function c(e) {
	        t.resolve(e).then(function (e) {
	          n || (n = !0, i.resolve(a, e));
	        }, function (e) {
	          n || (n = !0, i.reject(a, e));
	        });
	      }
	    }

	    t.exports = l, l.prototype.catch = function (e) {
	      return this.then(null, e);
	    }, l.prototype.then = function (e, t) {
	      if ("function" != typeof e && this.state === a || "function" != typeof t && this.state === s) return this;
	      var r = new this.constructor(o);
	      return this.state !== c ? d(r, this.state === a ? e : t, this.outcome) : this.queue.push(new u(r, e, t)), r;
	    }, u.prototype.callFulfilled = function (e) {
	      i.resolve(this.promise, e);
	    }, u.prototype.otherCallFulfilled = function (e) {
	      d(this.promise, this.onFulfilled, e);
	    }, u.prototype.callRejected = function (e) {
	      i.reject(this.promise, e);
	    }, u.prototype.otherCallRejected = function (e) {
	      d(this.promise, this.onRejected, e);
	    }, i.resolve = function (e, t) {
	      var r = p(h, t);
	      if ("error" === r.status) return i.reject(e, r.value);
	      var n = r.value;
	      if (n) f(e, n);else {
	        e.state = a, e.outcome = t;

	        for (var o = -1, s = e.queue.length; ++o < s;) e.queue[o].callFulfilled(t);
	      }
	      return e;
	    }, i.reject = function (e, t) {
	      e.state = s, e.outcome = t;

	      for (var r = -1, n = e.queue.length; ++r < n;) e.queue[r].callRejected(t);

	      return e;
	    }, l.resolve = v, l.reject = y, l.all = m, l.race = g;
	  }, {
	    1: 1
	  }],
	  3: [function (e, t, r) {
	    (function (t) {
	      "function" != typeof t.Promise && (t.Promise = e(2));
	    }).call(this, void 0 !== n ? n : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {});
	  }, {
	    2: 2
	  }],
	  4: [function (e, t, r) {
	    var n = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (e) {
	      return typeof e;
	    } : function (e) {
	      return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
	    };

	    function o(e, t) {
	      if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
	    }

	    function i() {
	      try {
	        if ("undefined" != typeof indexedDB) return indexedDB;
	        if ("undefined" != typeof webkitIndexedDB) return webkitIndexedDB;
	        if ("undefined" != typeof mozIndexedDB) return mozIndexedDB;
	        if ("undefined" != typeof OIndexedDB) return OIndexedDB;
	        if ("undefined" != typeof msIndexedDB) return msIndexedDB;
	      } catch (e) {
	        return;
	      }
	    }

	    var s = i();

	    function a() {
	      try {
	        if (!s || !s.open) return !1;
	        var e = "undefined" != typeof openDatabase && /(Safari|iPhone|iPad|iPod)/.test(navigator.userAgent) && !/Chrome/.test(navigator.userAgent) && !/BlackBerry/.test(navigator.platform),
	            t = "function" == typeof fetch && -1 !== fetch.toString().indexOf("[native code");
	        return (!e || t) && "undefined" != typeof indexedDB && "undefined" != typeof IDBKeyRange;
	      } catch (e) {
	        return !1;
	      }
	    }

	    function c(e, t) {
	      e = e || [], t = t || {};

	      try {
	        return new Blob(e, t);
	      } catch (o) {
	        if ("TypeError" !== o.name) throw o;

	        for (var r = new ("undefined" != typeof BlobBuilder ? BlobBuilder : "undefined" != typeof MSBlobBuilder ? MSBlobBuilder : "undefined" != typeof MozBlobBuilder ? MozBlobBuilder : WebKitBlobBuilder)(), n = 0; n < e.length; n += 1) r.append(e[n]);

	        return r.getBlob(t.type);
	      }
	    }

	    "undefined" == typeof Promise && e(3);
	    var l = Promise;

	    function u(e, t) {
	      t && e.then(function (e) {
	        t(null, e);
	      }, function (e) {
	        t(e);
	      });
	    }

	    function d(e, t, r) {
	      "function" == typeof t && e.then(t), "function" == typeof r && e.catch(r);
	    }

	    function h(e) {
	      return "string" != typeof e && (console.warn(e + " used as a key, but it is not a string."), e = String(e)), e;
	    }

	    function f() {
	      if (arguments.length && "function" == typeof arguments[arguments.length - 1]) return arguments[arguments.length - 1];
	    }

	    var p = "local-forage-detect-blob-support",
	        v = void 0,
	        y = {},
	        m = Object.prototype.toString,
	        g = "readonly",
	        b = "readwrite";

	    function S(e) {
	      for (var t = e.length, r = new ArrayBuffer(t), n = new Uint8Array(r), o = 0; o < t; o++) n[o] = e.charCodeAt(o);

	      return r;
	    }

	    function E(e) {
	      return new l(function (t) {
	        var r = e.transaction(p, b),
	            n = c([""]);
	        r.objectStore(p).put(n, "key"), r.onabort = function (e) {
	          e.preventDefault(), e.stopPropagation(), t(!1);
	        }, r.oncomplete = function () {
	          var e = navigator.userAgent.match(/Chrome\/(\d+)/),
	              r = navigator.userAgent.match(/Edge\//);
	          t(r || !e || parseInt(e[1], 10) >= 43);
	        };
	      }).catch(function () {
	        return !1;
	      });
	    }

	    function _(e) {
	      return "boolean" == typeof v ? l.resolve(v) : E(e).then(function (e) {
	        return v = e;
	      });
	    }

	    function w(e) {
	      var t = y[e.name],
	          r = {};
	      r.promise = new l(function (e, t) {
	        r.resolve = e, r.reject = t;
	      }), t.deferredOperations.push(r), t.dbReady ? t.dbReady = t.dbReady.then(function () {
	        return r.promise;
	      }) : t.dbReady = r.promise;
	    }

	    function I(e) {
	      var t = y[e.name].deferredOperations.pop();
	      if (t) return t.resolve(), t.promise;
	    }

	    function R(e, t) {
	      var r = y[e.name].deferredOperations.pop();
	      if (r) return r.reject(t), r.promise;
	    }

	    function C(e, t) {
	      return new l(function (r, n) {
	        if (y[e.name] = y[e.name] || H(), e.db) {
	          if (!t) return r(e.db);
	          w(e), e.db.close();
	        }

	        var o = [e.name];
	        t && o.push(e.version);
	        var i = s.open.apply(s, o);
	        t && (i.onupgradeneeded = function (t) {
	          var r = i.result;

	          try {
	            r.createObjectStore(e.storeName), t.oldVersion <= 1 && r.createObjectStore(p);
	          } catch (r) {
	            if ("ConstraintError" !== r.name) throw r;
	            console.warn('The database "' + e.name + '" has been upgraded from version ' + t.oldVersion + " to version " + t.newVersion + ', but the storage "' + e.storeName + '" already exists.');
	          }
	        }), i.onerror = function (e) {
	          e.preventDefault(), n(i.error);
	        }, i.onsuccess = function () {
	          var t = i.result;
	          t.onversionchange = function (e) {
	            e.target.close();
	          }, r(t), I(e);
	        };
	      });
	    }

	    function x(e) {
	      return C(e, !1);
	    }

	    function T(e) {
	      return C(e, !0);
	    }

	    function $(e, t) {
	      if (!e.db) return !0;
	      var r = !e.db.objectStoreNames.contains(e.storeName),
	          n = e.version < e.db.version,
	          o = e.version > e.db.version;

	      if (n && (e.version !== t && console.warn('The database "' + e.name + "\" can't be downgraded from version " + e.db.version + " to version " + e.version + "."), e.version = e.db.version), o || r) {
	        if (r) {
	          var i = e.db.version + 1;
	          i > e.version && (e.version = i);
	        }

	        return !0;
	      }

	      return !1;
	    }

	    function L(e) {
	      return new l(function (t, r) {
	        var n = new FileReader();
	        n.onerror = r, n.onloadend = function (r) {
	          var n = btoa(r.target.result || "");
	          t({
	            __local_forage_encoded_blob: !0,
	            data: n,
	            type: e.type
	          });
	        }, n.readAsBinaryString(e);
	      });
	    }

	    function N(e) {
	      return c([S(atob(e.data))], {
	        type: e.type
	      });
	    }

	    function O(e) {
	      return e && e.__local_forage_encoded_blob;
	    }

	    function A(e) {
	      var t = this,
	          r = t._initReady().then(function () {
	        var e = y[t._dbInfo.name];
	        if (e && e.dbReady) return e.dbReady;
	      });

	      return d(r, e, e), r;
	    }

	    function D(e) {
	      w(e);

	      for (var t = y[e.name], r = t.forages, n = 0; n < r.length; n++) {
	        var o = r[n];
	        o._dbInfo.db && (o._dbInfo.db.close(), o._dbInfo.db = null);
	      }

	      return e.db = null, x(e).then(function (t) {
	        return e.db = t, $(e) ? T(e) : t;
	      }).then(function (n) {
	        e.db = t.db = n;

	        for (var o = 0; o < r.length; o++) r[o]._dbInfo.db = n;
	      }).catch(function (t) {
	        throw R(e, t), t;
	      });
	    }

	    function P(e, t, r, n) {
	      void 0 === n && (n = 1);

	      try {
	        var o = e.db.transaction(e.storeName, t);
	        r(null, o);
	      } catch (o) {
	        if (n > 0 && (!e.db || "InvalidStateError" === o.name || "NotFoundError" === o.name)) return l.resolve().then(function () {
	          if (!e.db || "NotFoundError" === o.name && !e.db.objectStoreNames.contains(e.storeName) && e.version <= e.db.version) return e.db && (e.version = e.db.version + 1), T(e);
	        }).then(function () {
	          return D(e).then(function () {
	            P(e, t, r, n - 1);
	          });
	        }).catch(r);
	        r(o);
	      }
	    }

	    function H() {
	      return {
	        forages: [],
	        db: null,
	        dbReady: null,
	        deferredOperations: []
	      };
	    }

	    function q(e) {
	      var t = this,
	          r = {
	        db: null
	      };
	      if (e) for (var n in e) r[n] = e[n];
	      var o = y[r.name];
	      o || (o = H(), y[r.name] = o), o.forages.push(t), t._initReady || (t._initReady = t.ready, t.ready = A);
	      var i = [];

	      function s() {
	        return l.resolve();
	      }

	      for (var a = 0; a < o.forages.length; a++) {
	        var c = o.forages[a];
	        c !== t && i.push(c._initReady().catch(s));
	      }

	      var u = o.forages.slice(0);
	      return l.all(i).then(function () {
	        return r.db = o.db, x(r);
	      }).then(function (e) {
	        return r.db = e, $(r, t._defaultConfig.version) ? T(r) : e;
	      }).then(function (e) {
	        r.db = o.db = e, t._dbInfo = r;

	        for (var n = 0; n < u.length; n++) {
	          var i = u[n];
	          i !== t && (i._dbInfo.db = r.db, i._dbInfo.version = r.version);
	        }
	      });
	    }

	    function k(e, t) {
	      var r = this;
	      e = h(e);
	      var n = new l(function (t, n) {
	        r.ready().then(function () {
	          P(r._dbInfo, g, function (o, i) {
	            if (o) return n(o);

	            try {
	              var s = i.objectStore(r._dbInfo.storeName).get(e);
	              s.onsuccess = function () {
	                var e = s.result;
	                void 0 === e && (e = null), O(e) && (e = N(e)), t(e);
	              }, s.onerror = function () {
	                n(s.error);
	              };
	            } catch (e) {
	              n(e);
	            }
	          });
	        }).catch(n);
	      });
	      return u(n, t), n;
	    }

	    function j(e, t) {
	      var r = this,
	          n = new l(function (t, n) {
	        r.ready().then(function () {
	          P(r._dbInfo, g, function (o, i) {
	            if (o) return n(o);

	            try {
	              var s = i.objectStore(r._dbInfo.storeName).openCursor(),
	                  a = 1;
	              s.onsuccess = function () {
	                var r = s.result;

	                if (r) {
	                  var n = r.value;
	                  O(n) && (n = N(n));
	                  var o = e(n, r.key, a++);
	                  void 0 !== o ? t(o) : r.continue();
	                } else t();
	              }, s.onerror = function () {
	                n(s.error);
	              };
	            } catch (e) {
	              n(e);
	            }
	          });
	        }).catch(n);
	      });
	      return u(n, t), n;
	    }

	    function F(e, t, r) {
	      var n = this;
	      e = h(e);
	      var o = new l(function (r, o) {
	        var i;
	        n.ready().then(function () {
	          return i = n._dbInfo, "[object Blob]" === m.call(t) ? _(i.db).then(function (e) {
	            return e ? t : L(t);
	          }) : t;
	        }).then(function (t) {
	          P(n._dbInfo, b, function (i, s) {
	            if (i) return o(i);

	            try {
	              var a = s.objectStore(n._dbInfo.storeName);
	              null === t && (t = void 0);
	              var c = a.put(t, e);
	              s.oncomplete = function () {
	                void 0 === t && (t = null), r(t);
	              }, s.onabort = s.onerror = function () {
	                var e = c.error ? c.error : c.transaction.error;
	                o(e);
	              };
	            } catch (e) {
	              o(e);
	            }
	          });
	        }).catch(o);
	      });
	      return u(o, r), o;
	    }

	    function V(e, t) {
	      var r = this;
	      e = h(e);
	      var n = new l(function (t, n) {
	        r.ready().then(function () {
	          P(r._dbInfo, b, function (o, i) {
	            if (o) return n(o);

	            try {
	              var s = i.objectStore(r._dbInfo.storeName).delete(e);
	              i.oncomplete = function () {
	                t();
	              }, i.onerror = function () {
	                n(s.error);
	              }, i.onabort = function () {
	                var e = s.error ? s.error : s.transaction.error;
	                n(e);
	              };
	            } catch (e) {
	              n(e);
	            }
	          });
	        }).catch(n);
	      });
	      return u(n, t), n;
	    }

	    function M(e) {
	      var t = this,
	          r = new l(function (e, r) {
	        t.ready().then(function () {
	          P(t._dbInfo, b, function (n, o) {
	            if (n) return r(n);

	            try {
	              var i = o.objectStore(t._dbInfo.storeName).clear();
	              o.oncomplete = function () {
	                e();
	              }, o.onabort = o.onerror = function () {
	                var e = i.error ? i.error : i.transaction.error;
	                r(e);
	              };
	            } catch (e) {
	              r(e);
	            }
	          });
	        }).catch(r);
	      });
	      return u(r, e), r;
	    }

	    function U(e) {
	      var t = this,
	          r = new l(function (e, r) {
	        t.ready().then(function () {
	          P(t._dbInfo, g, function (n, o) {
	            if (n) return r(n);

	            try {
	              var i = o.objectStore(t._dbInfo.storeName).count();
	              i.onsuccess = function () {
	                e(i.result);
	              }, i.onerror = function () {
	                r(i.error);
	              };
	            } catch (e) {
	              r(e);
	            }
	          });
	        }).catch(r);
	      });
	      return u(r, e), r;
	    }

	    function B(e, t) {
	      var r = this,
	          n = new l(function (t, n) {
	        e < 0 ? t(null) : r.ready().then(function () {
	          P(r._dbInfo, g, function (o, i) {
	            if (o) return n(o);

	            try {
	              var s = i.objectStore(r._dbInfo.storeName),
	                  a = !1,
	                  c = s.openKeyCursor();
	              c.onsuccess = function () {
	                var r = c.result;
	                r ? 0 === e || a ? t(r.key) : (a = !0, r.advance(e)) : t(null);
	              }, c.onerror = function () {
	                n(c.error);
	              };
	            } catch (e) {
	              n(e);
	            }
	          });
	        }).catch(n);
	      });
	      return u(n, t), n;
	    }

	    function Y(e) {
	      var t = this,
	          r = new l(function (e, r) {
	        t.ready().then(function () {
	          P(t._dbInfo, g, function (n, o) {
	            if (n) return r(n);

	            try {
	              var i = o.objectStore(t._dbInfo.storeName).openKeyCursor(),
	                  s = [];
	              i.onsuccess = function () {
	                var t = i.result;
	                t ? (s.push(t.key), t.continue()) : e(s);
	              }, i.onerror = function () {
	                r(i.error);
	              };
	            } catch (e) {
	              r(e);
	            }
	          });
	        }).catch(r);
	      });
	      return u(r, e), r;
	    }

	    function K(e, t) {
	      t = f.apply(this, arguments);
	      var r = this.config();
	      (e = "function" != typeof e && e || {}).name || (e.name = e.name || r.name, e.storeName = e.storeName || r.storeName);
	      var n,
	          o = this;

	      if (e.name) {
	        var i = e.name === r.name && o._dbInfo.db ? l.resolve(o._dbInfo.db) : x(e).then(function (t) {
	          var r = y[e.name],
	              n = r.forages;
	          r.db = t;

	          for (var o = 0; o < n.length; o++) n[o]._dbInfo.db = t;

	          return t;
	        });
	        n = e.storeName ? i.then(function (t) {
	          if (t.objectStoreNames.contains(e.storeName)) {
	            var r = t.version + 1;
	            w(e);
	            var n = y[e.name],
	                o = n.forages;
	            t.close();

	            for (var i = 0; i < o.length; i++) {
	              var a = o[i];
	              a._dbInfo.db = null, a._dbInfo.version = r;
	            }

	            var c = new l(function (t, n) {
	              var o = s.open(e.name, r);
	              o.onerror = function (e) {
	                o.result.close(), n(e);
	              }, o.onupgradeneeded = function () {
	                o.result.deleteObjectStore(e.storeName);
	              }, o.onsuccess = function () {
	                var e = o.result;
	                e.close(), t(e);
	              };
	            });
	            return c.then(function (e) {
	              n.db = e;

	              for (var t = 0; t < o.length; t++) {
	                var r = o[t];
	                r._dbInfo.db = e, I(r._dbInfo);
	              }
	            }).catch(function (t) {
	              throw (R(e, t) || l.resolve()).catch(function () {}), t;
	            });
	          }
	        }) : i.then(function (t) {
	          w(e);
	          var r = y[e.name],
	              n = r.forages;
	          t.close();

	          for (var o = 0; o < n.length; o++) n[o]._dbInfo.db = null;

	          var i = new l(function (t, r) {
	            var n = s.deleteDatabase(e.name);
	            n.onerror = function () {
	              var e = n.result;
	              e && e.close(), r(n.error);
	            }, n.onblocked = function () {
	              console.warn('dropInstance blocked for database "' + e.name + '" until all open connections are closed');
	            }, n.onsuccess = function () {
	              var e = n.result;
	              e && e.close(), t(e);
	            };
	          });
	          return i.then(function (e) {
	            r.db = e;

	            for (var t = 0; t < n.length; t++) I(n[t]._dbInfo);
	          }).catch(function (t) {
	            throw (R(e, t) || l.resolve()).catch(function () {}), t;
	          });
	        });
	      } else n = l.reject("Invalid arguments");

	      return u(n, t), n;
	    }

	    var W = {
	      _driver: "asyncStorage",
	      _initStorage: q,
	      _support: a(),
	      iterate: j,
	      getItem: k,
	      setItem: F,
	      removeItem: V,
	      clear: M,
	      length: U,
	      key: B,
	      keys: Y,
	      dropInstance: K
	    };

	    function z() {
	      return "function" == typeof openDatabase;
	    }

	    var Q = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",
	        G = "~~local_forage_type~",
	        X = /^~~local_forage_type~([^~]+)~/,
	        J = "__lfsc__:",
	        Z = J.length,
	        ee = "arbf",
	        te = "blob",
	        re = "si08",
	        ne = "ui08",
	        oe = "uic8",
	        ie = "si16",
	        se = "si32",
	        ae = "ur16",
	        ce = "ui32",
	        le = "fl32",
	        ue = "fl64",
	        de = Z + ee.length,
	        he = Object.prototype.toString;

	    function fe(e) {
	      var t,
	          r,
	          n,
	          o,
	          i,
	          s = .75 * e.length,
	          a = e.length,
	          c = 0;
	      "=" === e[e.length - 1] && (s--, "=" === e[e.length - 2] && s--);
	      var l = new ArrayBuffer(s),
	          u = new Uint8Array(l);

	      for (t = 0; t < a; t += 4) r = Q.indexOf(e[t]), n = Q.indexOf(e[t + 1]), o = Q.indexOf(e[t + 2]), i = Q.indexOf(e[t + 3]), u[c++] = r << 2 | n >> 4, u[c++] = (15 & n) << 4 | o >> 2, u[c++] = (3 & o) << 6 | 63 & i;

	      return l;
	    }

	    function pe(e) {
	      var t,
	          r = new Uint8Array(e),
	          n = "";

	      for (t = 0; t < r.length; t += 3) n += Q[r[t] >> 2], n += Q[(3 & r[t]) << 4 | r[t + 1] >> 4], n += Q[(15 & r[t + 1]) << 2 | r[t + 2] >> 6], n += Q[63 & r[t + 2]];

	      return r.length % 3 == 2 ? n = n.substring(0, n.length - 1) + "=" : r.length % 3 == 1 && (n = n.substring(0, n.length - 2) + "=="), n;
	    }

	    function ve(e, t) {
	      var r = "";

	      if (e && (r = he.call(e)), e && ("[object ArrayBuffer]" === r || e.buffer && "[object ArrayBuffer]" === he.call(e.buffer))) {
	        var n,
	            o = J;
	        e instanceof ArrayBuffer ? (n = e, o += ee) : (n = e.buffer, "[object Int8Array]" === r ? o += re : "[object Uint8Array]" === r ? o += ne : "[object Uint8ClampedArray]" === r ? o += oe : "[object Int16Array]" === r ? o += ie : "[object Uint16Array]" === r ? o += ae : "[object Int32Array]" === r ? o += se : "[object Uint32Array]" === r ? o += ce : "[object Float32Array]" === r ? o += le : "[object Float64Array]" === r ? o += ue : t(new Error("Failed to get type for BinaryArray"))), t(o + pe(n));
	      } else if ("[object Blob]" === r) {
	        var i = new FileReader();
	        i.onload = function () {
	          var r = G + e.type + "~" + pe(this.result);
	          t(J + te + r);
	        }, i.readAsArrayBuffer(e);
	      } else try {
	        t(JSON.stringify(e));
	      } catch (r) {
	        console.error("Couldn't convert value into a JSON string: ", e), t(null, r);
	      }
	    }

	    function ye(e) {
	      if (e.substring(0, Z) !== J) return JSON.parse(e);
	      var t,
	          r = e.substring(de),
	          n = e.substring(Z, de);

	      if (n === te && X.test(r)) {
	        var o = r.match(X);
	        t = o[1], r = r.substring(o[0].length);
	      }

	      var i = fe(r);

	      switch (n) {
	        case ee:
	          return i;

	        case te:
	          return c([i], {
	            type: t
	          });

	        case re:
	          return new Int8Array(i);

	        case ne:
	          return new Uint8Array(i);

	        case oe:
	          return new Uint8ClampedArray(i);

	        case ie:
	          return new Int16Array(i);

	        case ae:
	          return new Uint16Array(i);

	        case se:
	          return new Int32Array(i);

	        case ce:
	          return new Uint32Array(i);

	        case le:
	          return new Float32Array(i);

	        case ue:
	          return new Float64Array(i);

	        default:
	          throw new Error("Unkown type: " + n);
	      }
	    }

	    var me = {
	      serialize: ve,
	      deserialize: ye,
	      stringToBuffer: fe,
	      bufferToString: pe
	    };

	    function ge(e, t, r, n) {
	      e.executeSql("CREATE TABLE IF NOT EXISTS " + t.storeName + " (id INTEGER PRIMARY KEY, key unique, value)", [], r, n);
	    }

	    function be(e) {
	      var t = this,
	          r = {
	        db: null
	      };
	      if (e) for (var n in e) r[n] = "string" != typeof e[n] ? e[n].toString() : e[n];
	      var o = new l(function (e, n) {
	        try {
	          r.db = openDatabase(r.name, String(r.version), r.description, r.size);
	        } catch (e) {
	          return n(e);
	        }

	        r.db.transaction(function (o) {
	          ge(o, r, function () {
	            t._dbInfo = r, e();
	          }, function (e, t) {
	            n(t);
	          });
	        }, n);
	      });
	      return r.serializer = me, o;
	    }

	    function Se(e, t, r, n, o, i) {
	      e.executeSql(r, n, o, function (e, s) {
	        s.code === s.SYNTAX_ERR ? e.executeSql("SELECT name FROM sqlite_master WHERE type='table' AND name = ?", [t.storeName], function (e, a) {
	          a.rows.length ? i(e, s) : ge(e, t, function () {
	            e.executeSql(r, n, o, i);
	          }, i);
	        }, i) : i(e, s);
	      }, i);
	    }

	    function Ee(e, t) {
	      var r = this;
	      e = h(e);
	      var n = new l(function (t, n) {
	        r.ready().then(function () {
	          var o = r._dbInfo;
	          o.db.transaction(function (r) {
	            Se(r, o, "SELECT * FROM " + o.storeName + " WHERE key = ? LIMIT 1", [e], function (e, r) {
	              var n = r.rows.length ? r.rows.item(0).value : null;
	              n && (n = o.serializer.deserialize(n)), t(n);
	            }, function (e, t) {
	              n(t);
	            });
	          });
	        }).catch(n);
	      });
	      return u(n, t), n;
	    }

	    function _e(e, t) {
	      var r = this,
	          n = new l(function (t, n) {
	        r.ready().then(function () {
	          var o = r._dbInfo;
	          o.db.transaction(function (r) {
	            Se(r, o, "SELECT * FROM " + o.storeName, [], function (r, n) {
	              for (var i = n.rows, s = i.length, a = 0; a < s; a++) {
	                var c = i.item(a),
	                    l = c.value;
	                if (l && (l = o.serializer.deserialize(l)), void 0 !== (l = e(l, c.key, a + 1))) return void t(l);
	              }

	              t();
	            }, function (e, t) {
	              n(t);
	            });
	          });
	        }).catch(n);
	      });
	      return u(n, t), n;
	    }

	    function we(e, t, r, n) {
	      var o = this;
	      e = h(e);
	      var i = new l(function (i, s) {
	        o.ready().then(function () {
	          void 0 === t && (t = null);
	          var a = t,
	              c = o._dbInfo;
	          c.serializer.serialize(t, function (t, l) {
	            l ? s(l) : c.db.transaction(function (r) {
	              Se(r, c, "INSERT OR REPLACE INTO " + c.storeName + " (key, value) VALUES (?, ?)", [e, t], function () {
	                i(a);
	              }, function (e, t) {
	                s(t);
	              });
	            }, function (t) {
	              if (t.code === t.QUOTA_ERR) {
	                if (n > 0) return void i(we.apply(o, [e, a, r, n - 1]));
	                s(t);
	              }
	            });
	          });
	        }).catch(s);
	      });
	      return u(i, r), i;
	    }

	    function Ie(e, t, r) {
	      return we.apply(this, [e, t, r, 1]);
	    }

	    function Re(e, t) {
	      var r = this;
	      e = h(e);
	      var n = new l(function (t, n) {
	        r.ready().then(function () {
	          var o = r._dbInfo;
	          o.db.transaction(function (r) {
	            Se(r, o, "DELETE FROM " + o.storeName + " WHERE key = ?", [e], function () {
	              t();
	            }, function (e, t) {
	              n(t);
	            });
	          });
	        }).catch(n);
	      });
	      return u(n, t), n;
	    }

	    function Ce(e) {
	      var t = this,
	          r = new l(function (e, r) {
	        t.ready().then(function () {
	          var n = t._dbInfo;
	          n.db.transaction(function (t) {
	            Se(t, n, "DELETE FROM " + n.storeName, [], function () {
	              e();
	            }, function (e, t) {
	              r(t);
	            });
	          });
	        }).catch(r);
	      });
	      return u(r, e), r;
	    }

	    function xe(e) {
	      var t = this,
	          r = new l(function (e, r) {
	        t.ready().then(function () {
	          var n = t._dbInfo;
	          n.db.transaction(function (t) {
	            Se(t, n, "SELECT COUNT(key) as c FROM " + n.storeName, [], function (t, r) {
	              var n = r.rows.item(0).c;
	              e(n);
	            }, function (e, t) {
	              r(t);
	            });
	          });
	        }).catch(r);
	      });
	      return u(r, e), r;
	    }

	    function Te(e, t) {
	      var r = this,
	          n = new l(function (t, n) {
	        r.ready().then(function () {
	          var o = r._dbInfo;
	          o.db.transaction(function (r) {
	            Se(r, o, "SELECT key FROM " + o.storeName + " WHERE id = ? LIMIT 1", [e + 1], function (e, r) {
	              var n = r.rows.length ? r.rows.item(0).key : null;
	              t(n);
	            }, function (e, t) {
	              n(t);
	            });
	          });
	        }).catch(n);
	      });
	      return u(n, t), n;
	    }

	    function $e(e) {
	      var t = this,
	          r = new l(function (e, r) {
	        t.ready().then(function () {
	          var n = t._dbInfo;
	          n.db.transaction(function (t) {
	            Se(t, n, "SELECT key FROM " + n.storeName, [], function (t, r) {
	              for (var n = [], o = 0; o < r.rows.length; o++) n.push(r.rows.item(o).key);

	              e(n);
	            }, function (e, t) {
	              r(t);
	            });
	          });
	        }).catch(r);
	      });
	      return u(r, e), r;
	    }

	    function Le(e) {
	      return new l(function (t, r) {
	        e.transaction(function (n) {
	          n.executeSql("SELECT name FROM sqlite_master WHERE type='table' AND name <> '__WebKitDatabaseInfoTable__'", [], function (r, n) {
	            for (var o = [], i = 0; i < n.rows.length; i++) o.push(n.rows.item(i).name);

	            t({
	              db: e,
	              storeNames: o
	            });
	          }, function (e, t) {
	            r(t);
	          });
	        }, function (e) {
	          r(e);
	        });
	      });
	    }

	    function Ne(e, t) {
	      t = f.apply(this, arguments);
	      var r = this.config();
	      (e = "function" != typeof e && e || {}).name || (e.name = e.name || r.name, e.storeName = e.storeName || r.storeName);
	      var n,
	          o = this;
	      return u(n = e.name ? new l(function (t) {
	        var n;
	        n = e.name === r.name ? o._dbInfo.db : openDatabase(e.name, "", "", 0), e.storeName ? t({
	          db: n,
	          storeNames: [e.storeName]
	        }) : t(Le(n));
	      }).then(function (e) {
	        return new l(function (t, r) {
	          e.db.transaction(function (n) {
	            function o(e) {
	              return new l(function (t, r) {
	                n.executeSql("DROP TABLE IF EXISTS " + e, [], function () {
	                  t();
	                }, function (e, t) {
	                  r(t);
	                });
	              });
	            }

	            for (var i = [], s = 0, a = e.storeNames.length; s < a; s++) i.push(o(e.storeNames[s]));

	            l.all(i).then(function () {
	              t();
	            }).catch(function (e) {
	              r(e);
	            });
	          }, function (e) {
	            r(e);
	          });
	        });
	      }) : l.reject("Invalid arguments"), t), n;
	    }

	    var Oe = {
	      _driver: "webSQLStorage",
	      _initStorage: be,
	      _support: z(),
	      iterate: _e,
	      getItem: Ee,
	      setItem: Ie,
	      removeItem: Re,
	      clear: Ce,
	      length: xe,
	      key: Te,
	      keys: $e,
	      dropInstance: Ne
	    };

	    function Ae() {
	      try {
	        return "undefined" != typeof localStorage && "setItem" in localStorage && !!localStorage.setItem;
	      } catch (e) {
	        return !1;
	      }
	    }

	    function De(e, t) {
	      var r = e.name + "/";
	      return e.storeName !== t.storeName && (r += e.storeName + "/"), r;
	    }

	    function Pe() {
	      var e = "_localforage_support_test";

	      try {
	        return localStorage.setItem(e, !0), localStorage.removeItem(e), !1;
	      } catch (e) {
	        return !0;
	      }
	    }

	    function He() {
	      return !Pe() || localStorage.length > 0;
	    }

	    function qe(e) {
	      var t = this,
	          r = {};
	      if (e) for (var n in e) r[n] = e[n];
	      return r.keyPrefix = De(e, t._defaultConfig), He() ? (t._dbInfo = r, r.serializer = me, l.resolve()) : l.reject();
	    }

	    function ke(e) {
	      var t = this,
	          r = t.ready().then(function () {
	        for (var e = t._dbInfo.keyPrefix, r = localStorage.length - 1; r >= 0; r--) {
	          var n = localStorage.key(r);
	          0 === n.indexOf(e) && localStorage.removeItem(n);
	        }
	      });
	      return u(r, e), r;
	    }

	    function je(e, t) {
	      var r = this;
	      e = h(e);
	      var n = r.ready().then(function () {
	        var t = r._dbInfo,
	            n = localStorage.getItem(t.keyPrefix + e);
	        return n && (n = t.serializer.deserialize(n)), n;
	      });
	      return u(n, t), n;
	    }

	    function Fe(e, t) {
	      var r = this,
	          n = r.ready().then(function () {
	        for (var t = r._dbInfo, n = t.keyPrefix, o = n.length, i = localStorage.length, s = 1, a = 0; a < i; a++) {
	          var c = localStorage.key(a);

	          if (0 === c.indexOf(n)) {
	            var l = localStorage.getItem(c);
	            if (l && (l = t.serializer.deserialize(l)), void 0 !== (l = e(l, c.substring(o), s++))) return l;
	          }
	        }
	      });
	      return u(n, t), n;
	    }

	    function Ve(e, t) {
	      var r = this,
	          n = r.ready().then(function () {
	        var t,
	            n = r._dbInfo;

	        try {
	          t = localStorage.key(e);
	        } catch (e) {
	          t = null;
	        }

	        return t && (t = t.substring(n.keyPrefix.length)), t;
	      });
	      return u(n, t), n;
	    }

	    function Me(e) {
	      var t = this,
	          r = t.ready().then(function () {
	        for (var e = t._dbInfo, r = localStorage.length, n = [], o = 0; o < r; o++) {
	          var i = localStorage.key(o);
	          0 === i.indexOf(e.keyPrefix) && n.push(i.substring(e.keyPrefix.length));
	        }

	        return n;
	      });
	      return u(r, e), r;
	    }

	    function Ue(e) {
	      var t = this.keys().then(function (e) {
	        return e.length;
	      });
	      return u(t, e), t;
	    }

	    function Be(e, t) {
	      var r = this;
	      e = h(e);
	      var n = r.ready().then(function () {
	        var t = r._dbInfo;
	        localStorage.removeItem(t.keyPrefix + e);
	      });
	      return u(n, t), n;
	    }

	    function Ye(e, t, r) {
	      var n = this;
	      e = h(e);
	      var o = n.ready().then(function () {
	        void 0 === t && (t = null);
	        var r = t;
	        return new l(function (o, i) {
	          var s = n._dbInfo;
	          s.serializer.serialize(t, function (t, n) {
	            if (n) i(n);else try {
	              localStorage.setItem(s.keyPrefix + e, t), o(r);
	            } catch (e) {
	              "QuotaExceededError" !== e.name && "NS_ERROR_DOM_QUOTA_REACHED" !== e.name || i(e), i(e);
	            }
	          });
	        });
	      });
	      return u(o, r), o;
	    }

	    function Ke(e, t) {
	      if (t = f.apply(this, arguments), !(e = "function" != typeof e && e || {}).name) {
	        var r = this.config();
	        e.name = e.name || r.name, e.storeName = e.storeName || r.storeName;
	      }

	      var n,
	          o = this;
	      return n = e.name ? new l(function (t) {
	        e.storeName ? t(De(e, o._defaultConfig)) : t(e.name + "/");
	      }).then(function (e) {
	        for (var t = localStorage.length - 1; t >= 0; t--) {
	          var r = localStorage.key(t);
	          0 === r.indexOf(e) && localStorage.removeItem(r);
	        }
	      }) : l.reject("Invalid arguments"), u(n, t), n;
	    }

	    var We = {
	      _driver: "localStorageWrapper",
	      _initStorage: qe,
	      _support: Ae(),
	      iterate: Fe,
	      getItem: je,
	      setItem: Ye,
	      removeItem: Be,
	      clear: ke,
	      length: Ue,
	      key: Ve,
	      keys: Me,
	      dropInstance: Ke
	    },
	        ze = function (e, t) {
	      return e === t || "number" == typeof e && "number" == typeof t && isNaN(e) && isNaN(t);
	    },
	        Qe = function (e, t) {
	      for (var r = e.length, n = 0; n < r;) {
	        if (ze(e[n], t)) return !0;
	        n++;
	      }

	      return !1;
	    },
	        Ge = Array.isArray || function (e) {
	      return "[object Array]" === Object.prototype.toString.call(e);
	    },
	        Xe = {},
	        Je = {},
	        Ze = {
	      INDEXEDDB: W,
	      WEBSQL: Oe,
	      LOCALSTORAGE: We
	    },
	        et = [Ze.INDEXEDDB._driver, Ze.WEBSQL._driver, Ze.LOCALSTORAGE._driver],
	        tt = ["dropInstance"],
	        rt = ["clear", "getItem", "iterate", "key", "keys", "length", "removeItem", "setItem"].concat(tt),
	        nt = {
	      description: "",
	      driver: et.slice(),
	      name: "localforage",
	      size: 4980736,
	      storeName: "keyvaluepairs",
	      version: 1
	    };

	    function ot(e, t) {
	      e[t] = function () {
	        var r = arguments;
	        return e.ready().then(function () {
	          return e[t].apply(e, r);
	        });
	      };
	    }

	    function it() {
	      for (var e = 1; e < arguments.length; e++) {
	        var t = arguments[e];
	        if (t) for (var r in t) t.hasOwnProperty(r) && (Ge(t[r]) ? arguments[0][r] = t[r].slice() : arguments[0][r] = t[r]);
	      }

	      return arguments[0];
	    }

	    var st = function () {
	      function e(t) {
	        for (var r in o(this, e), Ze) if (Ze.hasOwnProperty(r)) {
	          var n = Ze[r],
	              i = n._driver;
	          this[r] = i, Xe[i] || this.defineDriver(n);
	        }

	        this._defaultConfig = it({}, nt), this._config = it({}, this._defaultConfig, t), this._driverSet = null, this._initDriver = null, this._ready = !1, this._dbInfo = null, this._wrapLibraryMethodsWithReady(), this.setDriver(this._config.driver).catch(function () {});
	      }

	      return e.prototype.config = function (e) {
	        if ("object" === (void 0 === e ? "undefined" : n(e))) {
	          if (this._ready) return new Error("Can't call config() after localforage has been used.");

	          for (var t in e) {
	            if ("storeName" === t && (e[t] = e[t].replace(/\W/g, "_")), "version" === t && "number" != typeof e[t]) return new Error("Database version must be a number.");
	            this._config[t] = e[t];
	          }

	          return !("driver" in e) || !e.driver || this.setDriver(this._config.driver);
	        }

	        return "string" == typeof e ? this._config[e] : this._config;
	      }, e.prototype.defineDriver = function (e, t, r) {
	        var n = new l(function (t, r) {
	          try {
	            var n = e._driver,
	                o = new Error("Custom driver not compliant; see https://mozilla.github.io/localForage/#definedriver");
	            if (!e._driver) return void r(o);

	            for (var i = rt.concat("_initStorage"), s = 0, a = i.length; s < a; s++) {
	              var c = i[s];
	              if ((!Qe(tt, c) || e[c]) && "function" != typeof e[c]) return void r(o);
	            }

	            var d = function () {
	              for (var t = function (e) {
	                return function () {
	                  var t = new Error("Method " + e + " is not implemented by the current driver"),
	                      r = l.reject(t);
	                  return u(r, arguments[arguments.length - 1]), r;
	                };
	              }, r = 0, n = tt.length; r < n; r++) {
	                var o = tt[r];
	                e[o] || (e[o] = t(o));
	              }
	            };

	            d();

	            var h = function (r) {
	              Xe[n] && console.info("Redefining LocalForage driver: " + n), Xe[n] = e, Je[n] = r, t();
	            };

	            "_support" in e ? e._support && "function" == typeof e._support ? e._support().then(h, r) : h(!!e._support) : h(!0);
	          } catch (e) {
	            r(e);
	          }
	        });
	        return d(n, t, r), n;
	      }, e.prototype.driver = function () {
	        return this._driver || null;
	      }, e.prototype.getDriver = function (e, t, r) {
	        var n = Xe[e] ? l.resolve(Xe[e]) : l.reject(new Error("Driver not found."));
	        return d(n, t, r), n;
	      }, e.prototype.getSerializer = function (e) {
	        var t = l.resolve(me);
	        return d(t, e), t;
	      }, e.prototype.ready = function (e) {
	        var t = this,
	            r = t._driverSet.then(function () {
	          return null === t._ready && (t._ready = t._initDriver()), t._ready;
	        });

	        return d(r, e, e), r;
	      }, e.prototype.setDriver = function (e, t, r) {
	        var n = this;
	        Ge(e) || (e = [e]);

	        var o = this._getSupportedDrivers(e);

	        function i() {
	          n._config.driver = n.driver();
	        }

	        function s(e) {
	          return n._extend(e), i(), n._ready = n._initStorage(n._config), n._ready;
	        }

	        function a(e) {
	          return function () {
	            var t = 0;

	            function r() {
	              for (; t < e.length;) {
	                var o = e[t];
	                return t++, n._dbInfo = null, n._ready = null, n.getDriver(o).then(s).catch(r);
	              }

	              i();
	              var a = new Error("No available storage method found.");
	              return n._driverSet = l.reject(a), n._driverSet;
	            }

	            return r();
	          };
	        }

	        var c = null !== this._driverSet ? this._driverSet.catch(function () {
	          return l.resolve();
	        }) : l.resolve();
	        return this._driverSet = c.then(function () {
	          var e = o[0];
	          return n._dbInfo = null, n._ready = null, n.getDriver(e).then(function (e) {
	            n._driver = e._driver, i(), n._wrapLibraryMethodsWithReady(), n._initDriver = a(o);
	          });
	        }).catch(function () {
	          i();
	          var e = new Error("No available storage method found.");
	          return n._driverSet = l.reject(e), n._driverSet;
	        }), d(this._driverSet, t, r), this._driverSet;
	      }, e.prototype.supports = function (e) {
	        return !!Je[e];
	      }, e.prototype._extend = function (e) {
	        it(this, e);
	      }, e.prototype._getSupportedDrivers = function (e) {
	        for (var t = [], r = 0, n = e.length; r < n; r++) {
	          var o = e[r];
	          this.supports(o) && t.push(o);
	        }

	        return t;
	      }, e.prototype._wrapLibraryMethodsWithReady = function () {
	        for (var e = 0, t = rt.length; e < t; e++) ot(this, rt[e]);
	      }, e.prototype.createInstance = function (t) {
	        return new e(t);
	      }, e;
	    }(),
	        at = new st();

	    t.exports = at;
	  }, {
	    3: 3
	  }]
	}, {}, [4])(4);
	/*!
	    localForage -- Offline Storage, Improved
	    Version 1.10.0
	    https://localforage.github.io/localForage
	    (c) 2013-2017 Mozilla, Apache License 2.0
	*/


	function a(e) {
	  return e ? (e ^ 16 * Math.random() >> e / 4).toString(16) : ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, a);
	}

	class l extends r {
	  _id;
	  _savedRemotely = !1;
	  static EVENT_SAVED_REMOTELY = "savedremotely";

	  set savedRemotely(e) {
	    this._savedRemotely !== e && (this._savedRemotely = !!e, this._savedRemotely && this.fireEvent(l.EVENT_SAVED_REMOTELY, {
	      id: this.id
	    }));
	  }

	  _savedLocally = !1;
	  deleted = !1;
	  createdStamp;
	  modifiedStamp;
	  projectId;
	  isPristine = !1;

	  constructor() {
	    super(), this.createdStamp = Math.floor(Date.now() / 1e3);
	  }

	  unsaved() {
	    return !(this._savedLocally && this._savedRemotely);
	  }

	  get id() {
	    return this._id ? "undefined" === this._id && (console.error("id is literal 'undefined', am forcing new id"), this._id = a()) : this._id = a(), this._id;
	  }

	  set id(e) {
	    if (this._id && e !== this._id) throw new Error(`Occurrence id has already been set, when trying to set new id '${e}'.`);
	    this._id = e;
	  }

	  static _tasks = [];

	  queuePost(e) {
	    return new Promise((t, r) => {
	      const n = () => (console.log({
	        "posting form data": e
	      }), this.post(e).then(t, r));

	      l._tasks.push(n), l._tasks.length > 1 ? console.log("Added post request to the queue.") : (console.log("No pending tasks, starting post request immediately."), n().finally(l._next));
	    });
	  }

	  static _next() {
	    if (l._tasks.shift(), l._tasks.length) return console.log("Running the next task."), l._tasks[0]().finally(l._next);
	  }

	  post(e) {
	    return fetch(this.SAVE_ENDPOINT, {
	      method: "POST",
	      body: e
	    }).then(e => {
	      if (e.ok) {
	        return e.clone().json().then(t => {
	          switch (console.log({
	            "returned to client after save": t
	          }), t.saveState) {
	            case "SAVED_TO_SERVER":
	              this._savedLocally = !0, this.savedRemotely = !0;
	              break;

	            case "SAVED_LOCALLY":
	              this._savedLocally = !0, this.savedRemotely = !1;
	              break;

	            default:
	              console.log(`Unrecognised save state '${t.saveState}'`);
	          }

	          return this.createdStamp = parseInt(t.created, 10), this.modifiedStamp = parseInt(t.modified, 10), e.json();
	        });
	      }

	      return console.log("Save failed, presumably service worker is missing and there is no network connection. Should write to IndexedDb here."), Promise.reject("IndexedDb storage not yet implemented");
	    });
	  }

	  static retrieveFromLocal(e, t) {
	    return s.getItem(`${t.TYPE}.${e}`).then(r => r ? (t.id = e, t._parseDescriptor(r), t) : Promise.reject(`Failed to retrieve ${t.TYPE}.${e} locally`));
	  }

	  _parseDescriptor(e) {
	    this._parseAttributes(e.attributes), this._parseSavedState(e.saveState), this.deleted = !0 === e.deleted || "true" === e.deleted, this.createdStamp = parseInt(e.created, 10), this.modifiedStamp = e.modified ? parseInt(e.modified, 10) : 0, this.projectId = parseInt(e.projectId, 10);
	  }

	  _parseAttributes(e) {
	    "string" == typeof e && (e = JSON.parse(e)), Array.isArray(e) ? (console.log("Attributes were spuriously represented as an array rather than as an empty object"), this.attributes = {}) : this.attributes = e;
	  }

	  _parseSavedState(e) {
	    switch (e) {
	      case "SAVED_LOCALLY":
	        this.savedRemotely = !1, this._savedLocally = !0;
	        break;

	      case "SAVED_TO_SERVER":
	        this.savedRemotely = !0, this._savedLocally = !0;
	        break;

	      default:
	        throw new Error(`Unrecognised saved state '${e}`);
	    }
	  }

	  touch() {
	    this.modifiedStamp = Math.floor(Date.now() / 1e3), this.isPristine && (this.isPristine = !1, this.createdStamp = this.modifiedStamp), this._savedLocally = !1, this.savedRemotely = !1;
	  }

	  evaluateCompletionStatus(e) {
	    const t = {};
	    let r = !0;

	    for (let n in e) if (e.hasOwnProperty(n)) {
	      let o = e[n];
	      t[n] = o.validator ? o.validator(n, o, this.attributes) : o.field.isValid(n, o, this.attributes), null !== t[n] && (r = r && t[n]);
	    }

	    return {
	      requiredFieldsPresent: r,
	      validity: t
	    };
	  }

	}

	class u extends Error {}

	function d(e) {
	  try {
	    const t = document.createElement("textarea");
	    return t.innerHTML = e, t.innerHTML.replace(/"/g, "&quot;");
	  } catch (t) {
	    const r = document.createElement("pre");
	    return r.appendChild(document.createTextNode(e)), r.innerHTML.replace(/"/g, "&quot;");
	  }
	}

	class h {
	  static rawTaxa;
	  id;
	  nameString = "";
	  canonical = "";
	  hybridCanonical = "";
	  acceptedEntityId = "";
	  qualifier = "";
	  authority = "";
	  vernacular = "";
	  vernacularRoot = "";
	  used;
	  sortOrder;
	  parentIds = [];
	  static showVernacular = !0;

	  static fromId(e) {
	    if (!h.rawTaxa) {
	      if (!BsbiDb.TaxonNames) throw new u("Taxon.fromId() called before taxon list has loaded.");
	      h.rawTaxa = BsbiDb.TaxonNames;
	    }

	    if (!h.rawTaxa.hasOwnProperty(e)) throw new u(`Taxon id '${e}' not found.`);
	    const t = h.rawTaxa[e],
	          r = new h();
	    return r.id = e, r.nameString = t[0], r.canonical = t[1] || t[0], r.hybridCanonical = t[2] || r.canonical, r.acceptedEntityId = t[3] || e, r.qualifier = t[4], r.authority = t[5], r.vernacular = t[6], r.vernacularRoot = t[7], r.used = t[8], r.sortOrder = t[9], r.parentIds = t[10], r;
	  }

	  formattedHTML(e) {
	    let t;
	    return this.id !== this.acceptedEntityId && (t = h.fromId(this.acceptedEntityId)), e ? t ? `<q class="taxon-vernacular">${d(this.vernacular)}</q><wbr> <span class="italictaxon">${this.nameString}${this.qualifier ? ` <span class="taxon-qualifier">${this.qualifier}</span>` : ""}</span> <span class="taxauthority">${d(this.authority)}</span> = <span class="italictaxon">${t.nameString}${t.qualifier ? ` <span class="taxon-qualifier">${t.qualifier}</span>` : ""}</span> <span class="taxauthority">${d(t.authority)}</span>` : `<q class="taxon-vernacular">${d(this.vernacular)}</q><wbr> <span class="italictaxon">${this.nameString}${this.qualifier ? ` <span class="taxon-qualifier">${this.qualifier}</span>` : ""}</span> <span class="taxauthority">${d(this.authority)}</span>` : t ? `<span class="italictaxon">${this.nameString}${this.qualifier ? ` <span class="taxon-qualifier">${this.qualifier}</span>` : ""}</span> <span class="taxauthority">${this.authority}</span>${this.vernacular ? ` <wbr><q class="taxon-vernacular">${d(this.vernacular)}</q>` : ""} = <span class="italictaxon">${t.nameString}${t.qualifier ? ` <span class="taxon-qualifier">${t.qualifier}</span>` : ""}</span> <span class="taxauthority">${d(t.authority)}</span>` : `<span class="italictaxon">${this.nameString}${this.qualifier ? ` <span class="taxon-qualifier">${this.qualifier}</span>` : ""}</span> <span class="taxauthority">${d(this.authority)}</span>${this.vernacular ? ` <wbr><q class="taxon-vernacular">${d(this.vernacular)}</q>` : ""}` ;
	  }

	}

	class f extends l {
	  attributes = {};
	  SAVE_ENDPOINT = "/saveoccurrence.php";
	  TYPE = "occurrence";
	  static EVENT_MODIFIED = "modified";
	  isNew = !1;

	  get taxon() {
	    return this.attributes.taxon && this.attributes.taxon.taxonId ? h.fromId(this.attributes.taxon.taxonId) : null;
	  }

	  formChangedHandler(e) {
	    console.log("Occurrence change handler invoked."), e.form.updateModelFromContent(), e.form.conditionallyValidateForm(), this.touch(), this.fireEvent(f.EVENT_MODIFIED, {
	      occurrenceId: this.id
	    });
	  }

	  delete() {
	    this.deleted || (this.touch(), this.deleted = !0, this.fireEvent(f.EVENT_MODIFIED, {
	      occurrenceId: this.id
	    }));
	  }

	  save(e) {
	    if (this._savedRemotely) return Promise.reject(`${this.id} has already been saved.`);
	    {
	      const t = new FormData();
	      return !e && this.surveyId && (e = this.surveyId), t.append("type", this.TYPE), t.append("surveyId", e), t.append("occurrenceId", this.id), t.append("id", this.id), t.append("projectId", this.projectId.toString()), t.append("attributes", JSON.stringify(this.attributes)), t.append("deleted", this.deleted.toString()), t.append("created", this.createdStamp.toString()), console.log("queueing occurrence post"), this.queuePost(t);
	    }
	  }

	  _parseDescriptor(e) {
	    super._parseDescriptor(e), this.surveyId = e.surveyId;
	  }

	}

	class p extends Error {}

	class m extends l {
	  static EVENT_MODIFIED = "modified";
	  SAVE_ENDPOINT = "/savesurvey.php";
	  TYPE = "survey";
	  attributes = {};
	  isNew = !1;
	  hasAppModifiedListener = !1;

	  get geoReference() {
	    return this.attributes.georef || {
	      gridRef: "",
	      rawString: "",
	      source: "unknown",
	      latLng: null,
	      precision: null
	    };
	  }

	  get date() {
	    return this.attributes.date || "";
	  }

	  get place() {
	    return this.attributes.place || "";
	  }

	  formChangedHandler(e) {
	    console.log("Survey change handler invoked."), e.form.updateModelFromContent(), console.log("Survey calling conditional validation."), e.form.conditionallyValidateForm(), this.touch(), this.fireEvent(m.EVENT_MODIFIED, {
	      surveyId: this.id
	    });
	  }

	  setAttribute(e, t) {
	    this.attributes[e] !== t && (this.attributes[e] = t, this.touch(), this.fireEvent(m.EVENT_MODIFIED, {
	      surveyId: this.id
	    }));
	  }

	  save() {
	    if (this._savedRemotely) return Promise.reject(`${this.id} has already been saved.`);
	    {
	      const e = new FormData();
	      return e.append("type", this.TYPE), e.append("surveyId", this.id), e.append("id", this.id), e.append("projectId", this.projectId.toString()), e.append("attributes", JSON.stringify(this.attributes)), e.append("deleted", this.deleted.toString()), e.append("created", this.createdStamp.toString()), console.log("queueing survey post"), this.queuePost(e);
	    }
	  }

	  generateSurveyName() {
	    let e = (this.attributes.place || this.attributes.georef && this.attributes.georef.gridRef || "(unlocalised)").trim();
	    const t = this.date;
	    let r;
	    if (t) r = t;else {
	      const e = new Date(1e3 * this.createdStamp);

	      try {
	        r = e.toLocaleString("default", {
	          year: "numeric",
	          month: "long",
	          day: "numeric"
	        });
	      } catch (t) {
	        r = e.toLocaleString("en-GB", {
	          year: "numeric",
	          month: "long",
	          day: "numeric"
	        });
	      }
	    }
	    return `${d(e)} ${r}`;
	  }

	}

	class g extends l {
	  file;
	  static imageCache = new Map();
	  TYPE = "image";

	  getUrl() {}

	  SAVE_ENDPOINT = "/saveimage.php";

	  static fromFile(e) {
	    const t = new g();
	    return t.file = e, t;
	  }

	  save(e, t, r) {
	    if (this._savedRemotely) return Promise.reject(`${this.id} has already been saved.`);
	    {
	      const n = new FormData();
	      return n.append("type", this.TYPE), n.append("surveyId", e || ""), n.append("occurrenceId", t || this.occurrenceId), n.append("projectId", r ? r.toString() : ""), n.append("imageId", this.id), n.append("id", this.id), n.append("image", this.file), n.append("deleted", this.deleted.toString()), console.log(`queueing image post, image id ${this.id}`), this.queuePost(n);
	    }
	  }

	  static EVENT_MODIFIED = "modified";

	  static placeholder(e) {
	    let t = new g();
	    return t._id = e, g.imageCache.set(e, t), t;
	  }

	  _parseDescriptor(e) {
	    super._parseDescriptor(e), this.surveyId = e.surveyId, this.occurrenceId = e.occurrenceId, this.file = e.image;
	  }

	  static imageLink(e, t, r, n) {
	    t = t || 0, r = r || 0;
	    let o = "";
	    n.className && (o += ` class="${n.className}"`);
	    return `<picture><source srcset="/image.php?imageid=${e}&amp;height=128&amp;format=webp" type="image/webp"><img${o} src="/image.php?imageid=${e}&amp;width=${t}&amp;height=${r}&amp;format=jpeg" ${t > r ? `width="${t}"` : `height="${r}"`} alt="photo"></picture>`;
	  }

	}

	class b extends r {
	  #n;
	  #o;
	  controllers = [];
	  currentControllerHandle = !1;
	  routeHistory = [];
	  occurrences;
	  surveys;
	  _currentSurvey = null;

	  set currentSurvey(e) {
	    if (this._currentSurvey !== e) {
	      this._currentSurvey = e || null;
	      let t = e ? e.id : null;
	      s.setItem(b.CURRENT_SURVEY_KEY_NAME, t);
	    }
	  }

	  get currentSurvey() {
	    return this._currentSurvey;
	  }

	  getLastSurveyId() {
	    return s.getItem(b.CURRENT_SURVEY_KEY_NAME).catch(e => (console.log({
	      "Error retrieving last survey id": e
	    }), Promise.resolve(null)));
	  }

	  layout;
	  static EVENT_ADD_SURVEY_USER_REQUEST = "useraddsurveyrequest";
	  static EVENT_RESET_SURVEYS = "userresetsurveys";
	  static EVENT_NEW_SURVEY = "newsurvey";
	  static LOAD_SURVEYS_ENDPOINT = "/loadsurveys.php";
	  static EVENT_OCCURRENCE_ADDED = "occurrenceadded";
	  static EVENT_SURVEYS_CHANGED = "surveyschanged";
	  static EVENT_ALL_SYNCED_TO_SERVER = "allsyncedtoserver";
	  static EVENT_SYNC_ALL_FAILED = "syncallfailed";
	  static CURRENT_SURVEY_KEY_NAME = "currentsurvey";
	  static devMode = !1;

	  constructor() {
	    super(), this.reset();
	  }

	  setLocalForageName(e) {
	    s.config({
	      name: e
	    });
	  }

	  reset() {
	    this.surveys = new Map(), this.clearCurrentSurvey();
	  }

	  clearCurrentSurvey() {
	    this.occurrences = new Map(), this.currentSurvey = null;
	  }

	  set router(e) {
	    this.#n = e;
	  }

	  get router() {
	    return this.#n;
	  }

	  set containerId(e) {
	    const t = document.getElementById(e);
	    if (!t) throw new Error(`App container '${e}' not found.`);
	    this.#o = t;
	  }

	  get container() {
	    return this.#o;
	  }

	  registerController(e) {
	    e.handle = this.controllers.length, this.controllers[this.controllers.length] = e, e.app = this, e.registerRoute(this.#n);
	  }

	  initialise() {
	    this.layout.initialise(), this.#n.notFound(e => {
	      console.log(`no route found for '${e}'`), this.notFoundView();
	    }), this.#n.on(() => {
	      console.log("redirecting from '/' to '/list'"), this.#n.pause(), this.currentSurvey && this.currentSurvey.isPristine ? this.#n.navigate("/list/survey/welcome").resume() : this.#n.navigate("/list").resume(), this.#n.resolve();
	    });

	    for (let e of this.controllers) e.initialise();
	  }

	  display() {
	    console.log("App display"), this.#n.resolve(), this.syncAll();
	  }

	  saveRoute() {
	    const e = this.#n.lastRouteResolved();
	    this.routeHistory.length ? this.routeHistory[this.routeHistory.length - 1] !== e && (this.routeHistory[this.routeHistory.length] = e) : this.routeHistory[0] = e;
	  }

	  markAllNotPristine() {
	    for (let e of this.occurrences) e[1].isPristine = !1;
	  }

	  setLayout(e) {
	    this.layout = e, e.setApp(this);
	  }

	  addSurvey(e) {
	    if (e.projectId !== this.projectId) throw new Error(`Survey project id '${e.projectId} does not match with current project ('${this.projectId}')`);
	    e.hasAppModifiedListener || (e.hasAppModifiedListener = !0, console.log("setting survey's modified/save handler"), e.addListener(m.EVENT_MODIFIED, () => (this.fireEvent(b.EVENT_SURVEYS_CHANGED), e.save()))), this.surveys.set(e.id, e), this.fireEvent(b.EVENT_SURVEYS_CHANGED);
	  }

	  haveExtantOccurrences() {
	    for (let e of this.occurrences) if (!e.deleted) return !0;

	    return !1;
	  }

	  addOccurrence(e) {
	    if (!e.surveyId) throw new p("Survey id must set prior to registering occurrence.");

	    if (0 === this.occurrences.size) {
	      this.surveys.get(e.surveyId).createdStamp = e.createdStamp;
	    }

	    console.log(`in addOccurrence setting id '${e.id}'`), this.occurrences.set(e.id, e), e.addListener(f.EVENT_MODIFIED, () => {
	      const t = this.surveys.get(e.surveyId);
	      if (!t) throw new Error(`Failed to look up survey id ${e.surveyId}`);
	      t.isPristine = !1, t.unsaved() && t.save(), e.save(t.id);
	    });
	  }

	  refreshFromServer(e) {
	    console.log({
	      "Refresh from server, ids": e
	    });
	    const t = new FormData();
	    let r = 0;

	    for (let n of e) n && "undefined" !== n && t.append(`surveyId[${r++}]`, n);

	    return fetch(b.LOAD_SURVEYS_ENDPOINT, {
	      method: "POST",
	      body: t
	    }).then(e => e.ok ? e.json() : Promise.reject("Invalid response from server when refreshing survey ids")).then(e => {
	      console.log({
	        "refresh from server json response": e
	      });
	      const t = [];

	      for (let r in e) if (e.hasOwnProperty(r)) for (let n of e[r]) t.push(this._conditionallyReplaceObject(n));

	      return Promise.all(t);
	    });
	  }

	  _conditionallyReplaceObject(e) {
	    const t = `${e.type}.${e.id}`;
	    return s.getItem(t).then(r => r && !e.deleted && r.modified >= e.modified ? (console.log(`Local copy of ${t} is the same or newer than the server copy. (${r.modified} >= ${e.modified}) `), Promise.resolve()) : (console.log(`Adding or replacing local copy of ${t}`), s.setItem(t, e)));
	  }

	  seekKeys(e) {
	    return console.log("starting seekKeys"), s.keys().then(t => {
	      console.log({
	        "in seekKeys: local forage keys": t
	      });

	      for (let r of t) if (r !== b.CURRENT_SURVEY_KEY_NAME) {
	        let t, n;
	        [t, n] = r.split(".", 2), e.hasOwnProperty(t) ? e[t].includes(n) || e[t].push(n) : console.log(`Unrecognised stored key type '${t}.`);
	      }

	      return e;
	    });
	  }

	  syncAll() {
	    return this.seekKeys({
	      survey: [],
	      occurrence: [],
	      image: []
	    }).then(e => this._syncLocalUnsaved(e).then(e => (this.fireEvent(b.EVENT_ALL_SYNCED_TO_SERVER), e)), e => (console.log(`Failed to sync all: ${e}`), this.fireEvent(b.EVENT_SYNC_ALL_FAILED), !1));
	  }

	  _syncLocalUnsaved(e) {
	    const t = [];

	    for (let r of e.survey) t.push(m.retrieveFromLocal(r, new m()).then(e => {
	      if (e.unsaved()) return e.save();
	    }));

	    for (let r of e.occurrence) t.push(f.retrieveFromLocal(r, new f()).then(e => {
	      if (e.unsaved()) return e.save();
	    }));

	    for (let r of e.image) t.push(g.retrieveFromLocal(r, new g()).then(e => {
	      if (e.unsaved()) return e.save();
	    }));

	    return Promise.all(t).catch(e => (console.log(`Save failure: ${e}`), Promise.reject(e)));
	  }

	  restoreOccurrences(e = "") {
	    return console.log(`Invoked restoreOccurrences, target survey id: ${e}`), "undefined" === e && (console.error("Attempt to restore occurrences for literal 'undefined' survey id."), e = ""), e ? this._restoreOccurrenceImp(e) : this.getLastSurveyId().then(e => (console.log(`Retrieved last used survey id '${e}'`), this._restoreOccurrenceImp(e).catch(() => (console.log(`Failed to retrieve lastSurveyId ${e}. Resetting current survey and retrying.`), this.currentSurvey = null, this._restoreOccurrenceImp()))), () => this._restoreOccurrenceImp());
	  }

	  _restoreOccurrenceImp(e) {
	    if (e && this.surveys.has(e)) {
	      const t = this.surveys.get(e);
	      if (t.isPristine) return this.clearCurrentSurvey(), this.currentSurvey = t, this.fireEvent(b.EVENT_SURVEYS_CHANGED), Promise.resolve();
	    }

	    const t = {
	      survey: [],
	      occurrence: [],
	      image: []
	    };
	    return e && (t.survey[0] = e), this.seekKeys(t).then(e => e.survey.length ? this.refreshFromServer(e.survey).finally(() => this.seekKeys(e)) : null).finally(() => {
	      if (console.log({
	        storedObjectKeys: t
	      }), t && t.survey && t.survey.length) {
	        const r = [];
	        let n = 0;

	        for (let o of t.survey) r.push(this._restoreSurveyFromLocal(o, t, e === o || !e && 0 == n++));

	        return Promise.all(r).finally(() => this.currentSurvey ? (this.currentSurvey.deleted ? this.setNewSurvey() : this.fireEvent(b.EVENT_SURVEYS_CHANGED), Promise.resolve()) : (console.log(`Failed to retrieve survey id '${e}'`), Promise.reject(new Error(`Failed to retrieve survey id '${e}'`))));
	      }

	      return console.log("no pre-existing surveys, so creating a new one"), this.setNewSurvey(), Promise.resolve();
	    });
	  }

	  setNewSurvey() {
	    this.currentSurvey = new m(), this.currentSurvey.projectId = this.projectId, this.currentSurvey.isPristine = !0, this.currentSurvey.isNew = !0, this.fireEvent(b.EVENT_NEW_SURVEY), this.addSurvey(this.currentSurvey);
	  }

	  addNewOccurrence() {
	    const e = new f();
	    return e.surveyId = this.currentSurvey.id, e.projectId = this.projectId, e.isNew = !0, e.isPristine = !0, this.addOccurrence(e), this.fireEvent(b.EVENT_OCCURRENCE_ADDED, {
	      occurrenceId: e.id,
	      surveyId: e.surveyId
	    }), e;
	  }

	  _restoreSurveyFromLocal(e, t, r) {
	    let n = m.retrieveFromLocal(e, new m()).then(n => {
	      if (console.log(`retrieving local survey ${e}`), r) {
	        this.clearCurrentSurvey(), this.addSurvey(n);
	        const r = [];

	        for (let n of t.occurrence) r.push(f.retrieveFromLocal(n, new f()).then(t => {
	          t.surveyId === e && (console.log(`adding occurrence ${n}`), this.addOccurrence(t));
	        }));

	        return Promise.all(r);
	      }

	      this.addSurvey(n);
	    });
	    return r && n.finally(() => {
	      const r = [];

	      for (let n of t.image) r.push(g.retrieveFromLocal(n, new g()).then(t => {
	        console.log(`restoring image id '${n}'`), t.surveyId === e && g.imageCache.set(n, t);
	      }, e => {
	        console.log(`Failed to retrieve an image: ${e}`);
	      }));

	      return this.currentSurvey = this.surveys.get(t.survey[0]), Promise.all(r);
	    }), n;
	  }

	  clearLocalForage() {
	    return s.clear();
	  }

	}

	class E {
	  static responses = {};

	  static fromPostedData(e) {
	    const t = {
	      saveState: "SAVED_LOCALLY"
	    };

	    for (let r of e.entries()) t[r[0]] = r[1];

	    if (!t.type) throw new Error("Missing type in form data.");
	    if (E.responses.hasOwnProperty(t.type)) return new E.responses[t.type](t, {});
	    throw new Error(`Unrecognised post type '${t.type}'`);
	  }

	  static fromPostResponse(e) {
	    if (!e) throw new Error("Invalid empty post response.");
	    if (!e.type) throw new Error("Missing type in returned response.");
	    if (E.responses.hasOwnProperty(e.type)) return console.log(`in fromPostResponse returning a ${e.type}`), new E.responses[e.type]({}, e);
	    throw new Error(`Unrecognised post type '${e.type}'`);
	  }

	}

	function _(e) {
	  const t = new Headers();
	  return t.set("Content-Type", "application/json"), new Response(JSON.stringify(e), {
	    status: e.error ? 500 : 200,
	    headers: t
	  });
	}

	class w {
	  toSaveLocally;
	  returnedToClient;
	  prebuiltResponse;
	  failureErrorMessage = "Failed to save a local copy on your device.";
	  failureErrorHelp = "Your internet connection may have failed (or there could be a problem with the server). It wasn't possible to save a temporary copy on your device. Perhaps there is insufficient space? Please try to re-establish a network connection and try again.";

	  constructor(e, t) {
	    this.toSaveLocally = e, this.returnedToClient = t;
	  }

	  setPrebuiltResponse(e) {
	    return this.prebuiltResponse = e, this;
	  }

	  storeLocally() {
	    return s.setItem(this.localKey(), this.toSaveLocally).then(() => (console.log(`Stored object ${this.localKey()} locally`), this.prebuiltResponse ? this.prebuiltResponse : _(this.returnedToClient)), e => (console.log(`Failed to store object ${this.localKey()} locally`), console.log({
	      reason: e
	    }), this.returnedToClient.error = this.failureErrorMessage, this.returnedToClient.errorHelp = this.failureErrorHelp, _(this.returnedToClient)));
	  }

	  localKey() {
	    throw new Error(`LocalKey must be implemented in a subclass for ${this.toSaveLocally.type}`);
	  }

	  populateClientResponse() {}

	}

	class I extends w {
	  failureErrorMessage = "Failed to store image.";
	  failureErrorHelp = "Your internet connection may have failed (or there could be a problem with the server). It wasn't possible to save a temporary copy on your device. Perhaps there is insufficient space? Please try to re-establish a network connection and try again.";

	  populateClientResponse() {
	    return this.returnedToClient.id = this.toSaveLocally.imageId ? this.toSaveLocally.imageId : this.toSaveLocally.id, this.returnedToClient.imageId = this.toSaveLocally.imageId ? this.toSaveLocally.imageId : this.toSaveLocally.id, this.returnedToClient.type = "image", this.returnedToClient.surveyId = this.toSaveLocally.surveyId, this.returnedToClient.occurrenceId = this.toSaveLocally.occurrenceId, this.returnedToClient.created = parseInt(this.toSaveLocally.created, 10), this.returnedToClient.modified = parseInt(this.toSaveLocally.modified, 10), this.returnedToClient.saveState = "SAVED_LOCALLY", this.returnedToClient.deleted = this.toSaveLocally.deleted, this.returnedToClient.projectId = parseInt(this.toSaveLocally.projectId, 10), this;
	  }

	  populateLocalSave() {
	    return this.toSaveLocally.surveyId = this.returnedToClient.surveyId, this.toSaveLocally.type = "image", this.toSaveLocally.occurrenceId = this.returnedToClient.occurrenceId, this.toSaveLocally.imageId = this.returnedToClient.id ? this.returnedToClient.id : this.returnedToClient.imageId, this.toSaveLocally.id = this.returnedToClient.id ? this.returnedToClient.id : this.returnedToClient.imageId, this.toSaveLocally.created = parseInt(this.returnedToClient.created, 10), this.toSaveLocally.modified = parseInt(this.returnedToClient.modified, 10), this.toSaveLocally.saveState = "SAVED_TO_SERVER", this.toSaveLocally.deleted = !0 === this.returnedToClient.deleted || "true" === this.returnedToClient.deleted, this.toSaveLocally.projectId = parseInt(this.returnedToClient.projectId, 10), this;
	  }

	  localKey() {
	    return `image.${this.toSaveLocally.imageId}`;
	  }

	  static register() {
	    E.responses.image = I;
	  }

	}

	class R extends w {
	  failureErrorMessage = "Failed to store survey.";
	  failureErrorHelp = "Your internet connection may have failed (or there could be a problem with the server). It wasn't possible to save a temporary copy on your device. Perhaps there is insufficient space? Please try to re-establish a network connection and try again.";

	  populateClientResponse() {
	    return this.toSaveLocally.surveyId = this.returnedToClient.id ? this.returnedToClient.id : this.returnedToClient.surveyId, this.toSaveLocally.id = this.returnedToClient.id ? this.returnedToClient.id : this.returnedToClient.surveyId, this.returnedToClient.type = "survey", this.returnedToClient.attributes = this.toSaveLocally.attributes, this.returnedToClient.created = this.toSaveLocally.created, this.returnedToClient.modified = this.toSaveLocally.modified, this.returnedToClient.saveState = "SAVED_LOCALLY", this.returnedToClient.deleted = this.toSaveLocally.deleted, this.returnedToClient.projectId = this.toSaveLocally.projectId, this;
	  }

	  populateLocalSave() {
	    return this.toSaveLocally.surveyId = this.returnedToClient.id ? this.returnedToClient.id : this.returnedToClient.surveyId, this.toSaveLocally.id = this.returnedToClient.id ? this.returnedToClient.id : this.returnedToClient.surveyId, this.toSaveLocally.type = "survey", this.toSaveLocally.attributes = this.returnedToClient.attributes, this.toSaveLocally.created = parseInt(this.returnedToClient.created, 10), this.toSaveLocally.modified = parseInt(this.returnedToClient.modified, 10), this.toSaveLocally.saveState = "SAVED_TO_SERVER", this.toSaveLocally.deleted = this.returnedToClient.deleted, this.toSaveLocally.projectId = parseInt(this.returnedToClient.projectId, 10), this;
	  }

	  localKey() {
	    return `survey.${this.toSaveLocally.surveyId}`;
	  }

	  static register() {
	    E.responses.survey = R;
	  }

	}

	class C extends w {
	  failureErrorMessage = "Failed to store occurrence.";
	  failureErrorHelp = "Your internet connection may have failed (or there could be a problem with the server). It wasn't possible to save a temporary copy on your device. Perhaps there is insufficient space? Please try to re-establish a network connection and try again.";

	  populateClientResponse() {
	    return this.returnedToClient.id = this.toSaveLocally.occurrenceId ? this.toSaveLocally.occurrenceId : this.toSaveLocally.id, this.returnedToClient.occurrenceId = this.toSaveLocally.occurrenceId ? this.toSaveLocally.occurrenceId : this.toSaveLocally.id, this.returnedToClient.type = "occurrence", this.returnedToClient.surveyId = this.toSaveLocally.surveyId, this.returnedToClient.attributes = this.toSaveLocally.attributes, this.returnedToClient.created = parseInt(this.toSaveLocally.created, 10), this.returnedToClient.modified = parseInt(this.toSaveLocally.modified, 10), this.returnedToClient.saveState = "SAVED_LOCALLY", this.returnedToClient.deleted = this.toSaveLocally.deleted, this.returnedToClient.projectId = parseInt(this.toSaveLocally.projectId, 10), this;
	  }

	  populateLocalSave() {
	    return this.toSaveLocally.occurrenceId = this.returnedToClient.id ? this.returnedToClient.id : this.returnedToClient.occurrenceId, this.toSaveLocally.id = this.returnedToClient.id ? this.returnedToClient.id : this.returnedToClient.occurrenceId, this.toSaveLocally.type = "occurrence", this.toSaveLocally.surveyId = this.returnedToClient.surveyId, this.toSaveLocally.attributes = this.returnedToClient.attributes, this.toSaveLocally.created = parseInt(this.returnedToClient.created, 10), this.toSaveLocally.modified = parseInt(this.returnedToClient.modified, 10), this.toSaveLocally.saveState = "SAVED_TO_SERVER", this.toSaveLocally.deleted = !0 === this.returnedToClient.deleted || "true" === this.returnedToClient.deleted, this.toSaveLocally.projectId = parseInt(this.returnedToClient.projectId, 10), this;
	  }

	  localKey() {
	    return `occurrence.${this.toSaveLocally.occurrenceId}`;
	  }

	  static register() {
	    E.responses.occurrence = C;
	  }

	}

	class x {
	  URL_CACHE_SET;

	  initialise(e) {
	    Promise.prototype.finally || (Promise.prototype.finally = function (e) {
	      return this.then(e).catch(e);
	    }), I.register(), R.register(), C.register(), this.CACHE_VERSION = `version-1.0.3.1649239272-${e.version}`;
	    const t = e.postPassThroughWhitelist,
	          r = e.postImageUrlMatch,
	          n = e.getImageUrlMatch,
	          o = e.interceptUrlMatches,
	          i = e.ignoreUrlMatches,
	          a = e.passThroughNoCache,
	          c = e.indexUrl;
	    this.URL_CACHE_SET = e.urlCacheSet, s.config({
	      name: e.forageName
	    }), self.addEventListener("install", e => {
	      console.log("BSBI app service worker is being installed."), self.skipWaiting(), e.waitUntil(this.precache());
	    }), self.addEventListener("activate", e => {
	      console.log({
	        "service worker activate event": e
	      }), e.waitUntil(self.clients.matchAll({
	        includeUncontrolled: !0
	      }).then(e => {
	        const t = e.map(e => e.url);
	        console.log("[ServiceWorker] Matching clients:", t.join(", "));
	      }).then(() => caches.keys()).then(e => Promise.all(e.map(e => {
	        if (e.startsWith("version") && e !== this.CACHE_VERSION) return console.log("[ServiceWorker] Deleting old cache:", e), caches.delete(e);
	      }))).then(() => (console.log("[ServiceWorker] Claiming clients for version", this.CACHE_VERSION), self.clients.claim())));
	    }), self.addEventListener("fetch", e => {
	      if (e.preventDefault(), "POST" === e.request.method) t.test(e.request.url) ? (console.log(`Passing through whitelisted post request for: ${e.request.url}`), e.respondWith(fetch(e.request))) : a.test(e.request.url) ? (console.log(`Passing through nocache list post request for: ${e.request.url}`), e.respondWith(fetch(e.request))) : r.test(e.request.url) ? (console.log(`Got an image post request: '${e.request.url}'`), this.handle_image_post(e)) : (console.log(`Got post request: '${e.request.url}'`), this.handle_post(e));else if (o.test(e.request.url) && !i.test(e.request.url)) {
	        console.log(`redirecting to the root of the SPA for '${e.request.url}'`);
	        let t = new Request(c);
	        e.respondWith(this.fromCache(t)), e.waitUntil(this.update(t));
	      } else e.request.url.match(n) ? (console.log(`request is for an image '${e.request.url}'`), this.handleImageFetch(e)) : a.test(e.request.url) ? e.respondWith(fetch(e.request)) : (console.log(`request is for non-image '${e.request.url}'`), e.respondWith(this.fromCache(e.request)), e.waitUntil(this.update(e.request)));
	    });
	  }

	  handle_post(e) {
	    let t;

	    try {
	      t = e.request.clone();
	    } catch (e) {
	      console.log("Failed to clone request."), console.log({
	        "Cloning error": e
	      });
	    }

	    e.respondWith(fetch(e.request).then(e => e.ok ? Promise.resolve(e).then(e => (console.log("About to clone the json response."), e.clone().json())).then(t => (console.log("Following successful remote post, about to save locally."), E.fromPostResponse(t).setPrebuiltResponse(e).populateLocalSave().storeLocally())).catch(t => (console.log({
	      "local storage failed": t
	    }), Promise.resolve(e))) : (console.log("Failed to save, moving on to attempt IndexedDb"), Promise.reject("Failed to save to server."))).catch(e => (console.log({
	      "post fetch failed (probably no network)": e
	    }), console.log(`post fetch failed (probably no network), (reason: ${e})`), t.formData().then(e => (console.log("got to form data handler"), E.fromPostedData(e).populateClientResponse().storeLocally()), e => {
	      console.log({
	        "failed to read form data locally": e
	      });
	      return _({
	        error: "Failed to process posted response data. (internal error)",
	        errorHelp: "Your internet connection may have failed (or there could be a problem with the server). It wasn't possible to save a temporary copy on your device. (an unexpected error occurred) Please try to re-establish a network connection and try again."
	      });
	    }))));
	  }

	  handle_image_post(e) {
	    let t;
	    console.log("posting image");

	    try {
	      t = e.request.clone();
	    } catch (e) {
	      console.log("Failed to clone request."), console.log({
	        "Cloning error": e
	      });
	    }

	    e.respondWith(t.formData().then(t => (console.log("got to form data handler"), E.fromPostedData(t).populateClientResponse().storeLocally().then(t => (e.waitUntil(fetch(e.request).then(e => {
	      if (console.log("posting image to server in waitUntil part of fetch cycle"), e.ok) return console.log("posted image to server in waitUntil part of fetch cycle: got OK response"), Promise.resolve(e).then(e => e.clone().json()).then(t => E.fromPostResponse(t).setPrebuiltResponse(e).populateLocalSave().storeLocally()).catch(t => (console.log({
	        error: t
	      }), Promise.resolve(e)));
	      return console.log("posted image to server in waitUntil part of fetch cycle: got Error response"), _({
	        error: "Failed to save posted response data. (internal error)",
	        errorHelp: "Your internet connection may have failed (or there could be a problem with the server). It wasn't possible to save a temporary copy on your device. (an unexpected error occurred) Please try to re-establish a network connection and try again."
	      });
	    }, () => {
	      console.log("Rejected image post fetch from server - implies network is down");
	    })), t))), e => {
	      console.log("failed to read form data locally"), console.log({
	        reason: e
	      });
	      return _({
	        error: "Failed to process posted response data. (internal error)",
	        errorHelp: "Your internet connection may have failed (or there could be a problem with the server). It wasn't possible to save a temporary copy on your device. (an unexpected error occurred) Please try to re-establish a network connection and try again."
	      });
	    }));
	  }

	  precache() {
	    return caches.open(this.CACHE_VERSION).then(e => e.addAll(this.URL_CACHE_SET)).catch(e => (console.log({
	      "Precache failed result": e
	    }), Promise.resolve()));
	  }

	  fromCache(e) {
	    return console.log("attempting fromCache response"), caches.open(this.CACHE_VERSION).then(t => (console.log("cache is open"), t.match(e).then(t => (console.log(t ? `cache matched ${e.url}` : `no cache match for ${e.url}`), t || this.update(e)))));
	  }

	  handleImageFetch(e) {
	    e.respondWith(this.fromCache(e.request).then(t => {
	      if (console.log("In handleImageFetch promise"), t && t.ok) return console.log("Responding with image from cache (or remotely if no cache)."), t;
	      {
	        const t = e.request.url;
	        console.log(`Attempting image match for '${t}'`);
	        const r = t.match(/imageid=([a-fA-F0-9]{8}-(?:[a-fA-F0-9]{4}-){3}[a-fA-F0-9]{12})/);

	        if (r) {
	          const e = r[1];
	          return console.log(`Returning image match for '${t}' from local database`), this.imageFromLocalDatabase(e);
	        }

	        console.log(`Failed to match image id in url '${t}'`);
	      }
	    }).catch(t => {
	      const r = e.request.url;
	      console.log({
	        caught: t
	      }), console.log(`In catch following failed network fetch, attempting image match for '${r}'`);
	      const n = r.match(/imageid=([a-fA-F0-9]{8}-(?:[a-fA-F0-9]{4}-){3}[a-fA-F0-9]{12})/);

	      if (n) {
	        const e = n[1];
	        return console.log(`(via catch) Returning image match for '${r}' from local database`), this.imageFromLocalDatabase(e);
	      }

	      return console.log(`(via catch) Failed to match image id in url '${r}'`), Promise.reject(null);
	    }));
	  }

	  imageFromLocalDatabase(e) {
	    const t = new g();
	    return console.log("attempting retrieval of image data from local database"), l.retrieveFromLocal(e, t).then(t => {
	      if (console.log(`Retrieved image '${e}' from indexeddb.`), t.file) {
	        return new Headers().append("Content-Type", t.file.type), new Response(t.file, {
	          status: 200,
	          statusText: "OK image response from IndexedDb"
	        });
	      }

	      return console.log(`No local file object associated with retrieved image '${e}' from indexeddb.`), Promise.reject(`No local file object associated with retrieved image '${e}' from indexeddb.`);
	    });
	  }

	  update(e) {
	    return e = new Request(e, {
	      mode: "cors",
	      credentials: "omit"
	    }), console.log(`Attempting fetch and cache update of ${e.url}`), caches.open(this.CACHE_VERSION).then(t => fetch(e, {
	      cache: "no-cache"
	    }).then(r => r.ok ? (console.log(`(re-)caching ${e.url}`), t.put(e, r).then(() => t.match(e))) : (console.log(`Request during cache update failed for ${e.url}`), console.log({
	      "failed cache response": r
	    }), Promise.reject("Request during cache update failed, not caching."))).catch(t => (console.log(`Cache attempt failed for ${e.url}: error was ${t}`), Promise.reject(`Cache attempt failed for ${e.url}: error was ${t}`))));
	  }

	}

	function _classCallCheck(instance, Constructor) {
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
	  Object.defineProperty(Constructor, "prototype", {
	    writable: false
	  });
	  return Constructor;
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
	  Object.defineProperty(subClass, "prototype", {
	    writable: false
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

	function _unsupportedIterableToArray(o, minLen) {
	  if (!o) return;
	  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
	  var n = Object.prototype.toString.call(o).slice(8, -1);
	  if (n === "Object" && o.constructor) n = o.constructor.name;
	  if (n === "Map" || n === "Set") return Array.from(o);
	  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
	}

	function _arrayLikeToArray(arr, len) {
	  if (len == null || len > arr.length) len = arr.length;

	  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

	  return arr2;
	}

	function _createForOfIteratorHelper(o, allowArrayLike) {
	  var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"];

	  if (!it) {
	    if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
	      if (it) o = it;
	      var i = 0;

	      var F = function () {};

	      return {
	        s: F,
	        n: function () {
	          if (i >= o.length) return {
	            done: true
	          };
	          return {
	            done: false,
	            value: o[i++]
	          };
	        },
	        e: function (e) {
	          throw e;
	        },
	        f: F
	      };
	    }

	    throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
	  }

	  var normalCompletion = true,
	      didErr = false,
	      err;
	  return {
	    s: function () {
	      it = it.call(o);
	    },
	    n: function () {
	      var step = it.next();
	      normalCompletion = step.done;
	      return step;
	    },
	    e: function (e) {
	      didErr = true;
	      err = e;
	    },
	    f: function () {
	      try {
	        if (!normalCompletion && it.return != null) it.return();
	      } finally {
	        if (didErr) throw err;
	      }
	    }
	  };
	}

	var PROJECT_ID_NYPH = 2;
	var FORAGE_NAME = 'Nyph App';
	var NyphApp = /*#__PURE__*/function (_App) {
	  _inherits(NyphApp, _App);

	  var _super = _createSuper(NyphApp);

	  /**
	   * @type {number}
	   */
	  //static LOAD_SURVEYS_ENDPOINT = '/loadsurveys.php';
	  //static EVENT_OCCURRENCE_ADDED = 'occurrenceadded';
	  //static EVENT_SURVEYS_CHANGED = 'surveyschanged';

	  /**
	   *
	   * @type {boolean}
	   */
	  function NyphApp() {
	    var _this;

	    _classCallCheck(this, NyphApp);

	    _this = _super.call(this);

	    _defineProperty(_assertThisInitialized(_this), "projectId", PROJECT_ID_NYPH);

	    _defineProperty(_assertThisInitialized(_this), "_coreSurveyFields", ['recorder', 'email']);

	    _defineProperty(_assertThisInitialized(_this), "_coreSurveyFieldCache", []);

	    _this.initialiseSurveyFieldsMirror();

	    return _this;
	  }

	  _createClass(NyphApp, [{
	    key: "initialiseSurveyFieldsMirror",
	    value:
	    /**
	     * Sets handlers to allow certain survey fields to be duplicated from last current survey to new survey
	     * used for email address and primary recorder name
	     */
	    function initialiseSurveyFieldsMirror() {
	      var _this2 = this;

	      this.addListener(b.EVENT_NEW_SURVEY, function () {
	        console.log('Try to initialise core fields of new survey.');

	        if (_this2._coreSurveyFieldCache) {
	          console.log({
	            'Using cached survey values': _this2._coreSurveyFieldCache
	          });

	          var _iterator = _createForOfIteratorHelper(_this2._coreSurveyFields),
	              _step;

	          try {
	            for (_iterator.s(); !(_step = _iterator.n()).done;) {
	              var key = _step.value;
	              _this2.currentSurvey.attributes[key] = _this2._coreSurveyFieldCache[key];
	            }
	          } catch (err) {
	            _iterator.e(err);
	          } finally {
	            _iterator.f();
	          }
	        }
	      });
	      this.addListener(b.EVENT_SURVEYS_CHANGED, function () {
	        if (_this2.currentSurvey && !_this2.currentSurvey.isNew) {
	          var _iterator2 = _createForOfIteratorHelper(_this2._coreSurveyFields),
	              _step2;

	          try {
	            for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
	              var key = _step2.value;
	              _this2._coreSurveyFieldCache[key] = _this2.currentSurvey.attributes[key];
	            }
	          } catch (err) {
	            _iterator2.e(err);
	          } finally {
	            _iterator2.f();
	          }

	          console.log({
	            'Saved core survey fields': _this2._coreSurveyFieldCache
	          });
	        }
	      });
	      this.addListener(b.EVENT_RESET_SURVEYS, function () {
	        _this2._coreSurveyFieldCache = [];
	        console.log('Have reset core survey field cache.');
	      });
	    }
	  }, {
	    key: "notFoundView",
	    value: function notFoundView() {
	      var view = new NotFoundView();
	      view.display();
	    }
	  }]);

	  return NyphApp;
	}(b);

	_defineProperty(NyphApp, "forageName", FORAGE_NAME);

	_defineProperty(NyphApp, "devMode", false);

	// service worker for Nyph app

	var pathPrefix = location.pathname.split('/')[1]; // kill after 2022-03-01 to prevent the app perpetuating itself

	if (new Date().toJSON().slice(0, 10) >= '2022-03-01') {
	  throw new Error("Built-in expiry date has passed for NYPH.");
	}

	var serviceWorker = new x();
	serviceWorker.initialise({
	  forageName: FORAGE_NAME,
	  postPassThroughWhitelist: /^https:\/\/nyph\.bsbi\.app\/loadsurveys.php/,
	  postImageUrlMatch: /^https:\/\/nyph\.bsbi\.app\/saveimage.php/,
	  getImageUrlMatch: /^https:\/\/nyph\.bsbi\.app\/image\.php/,
	  interceptUrlMatches: new RegExp("^https://nyph.bsbi.app/".concat(pathPrefix, "/|^https://nyph.bsbi.app/").concat(pathPrefix, "$")),
	  ignoreUrlMatches: new RegExp("^https://nyph.bsbi.app/".concat(pathPrefix, "/app.js|^https://nyph.bsbi.app/").concat(pathPrefix, "/serviceworker.js|^https://nyph.bsbi.app/").concat(pathPrefix, "/manifest.webmanifest|^https://nyph.bsbi.app/").concat(pathPrefix, "/index.html|^https://api.mapbox.com")),
	  indexUrl: "https://nyph.bsbi.app/".concat(pathPrefix, "/index.html"),
	  // postPassThroughWhitelist : /^https:\/\/nyph\.bsbi\.app\/loadsurveys.php/,
	  // postImageUrlMatch : /^https:\/\/nyph\.bsbi\.app\/saveimage.php/,
	  // getImageUrlMatch : /^https:\/\/nyph\.bsbi\.app\/image\.php/,
	  // interceptUrlMatches : /^https:\/\/nyph\.bsbi\.app\/app\/|^https:\/\/nyph\.bsbi\.app\/app$/,
	  // ignoreUrlMatches : /^https:\/\/nyph\.bsbi\.app\/app\/app\.js|^https:\/\/nyph\.bsbi\.app\/app\/serviceworker\.js|^https:\/\/nyph\.bsbi\.app\/app\/manifest\.webmanifest|^https:\/\/nyph\.bsbi\.app\/app\/index\.html|^https:\/\/api\.mapbox\.com/,
	  // indexUrl : 'https://nyph.bsbi.app/app/index.html',
	  urlCacheSet: ['./index.html', './app.js?version=1.0.3.1649239755', './manifest.webmanifest', '/appcss/app.__BSBI_APP_VERSION__.css', // note no leading '.' - this is an absolute path
	  '/appcss/theme.css', //'/img/gwh_logo1_tsp.png',
	  '/img/icons/favicon-32x32.png', '/img/icons/favicon-16x16.png', '/img/icons/android-icon-192x192.png', '/img/nyph_final@2x.png', //'/img/icons/gwh_logo1_tsp-512x512.png',
	  '/img/BSBIlong.png', 'https://fonts.googleapis.com/icon?family=Material+Icons|Material+Icons+Round', //'https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css',
	  '/js/taxonnames.js.php', //'https://database.bsbi.org/js/taxonnames.js.php',
	  //'https://code.jquery.com/jquery-3.3.1.slim.min.js',
	  //'https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js',
	  //'https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js',
	  'https://fonts.googleapis.com/css2?family=Gentium+Basic&display=swap', // am not caching files under api.mapbox.com
	  // so instead serve this locally
	  //'https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-geocoder/v4.7.2/mapbox-gl-geocoder.min.js',
	  '/js/mapbox-gl-geocoder-v4.7.2.min.js'],
	  passThroughNoCache: /^https:\/\/api\.mapbox\.com|^https:\/\/events\.mapbox\.com|^https:\/\/browser-update\.org/,
	  version: '1.0.3.1649239755'
	});

})();
//# sourceMappingURL=serviceworker.js.map
