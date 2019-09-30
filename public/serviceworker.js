(function () {
	'use strict';

	var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

	function commonjsRequire () {
		throw new Error('Dynamic requires are not currently supported by rollup-plugin-commonjs');
	}

	function createCommonjsModule(fn, module) {
		return module = { exports: {} }, fn(module, module.exports), module.exports;
	}

	var O = 'object';
	var check = function (it) {
	  return it && it.Math == Math && it;
	};

	// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
	var global_1 =
	  // eslint-disable-next-line no-undef
	  check(typeof globalThis == O && globalThis) ||
	  check(typeof window == O && window) ||
	  check(typeof self == O && self) ||
	  check(typeof commonjsGlobal == O && commonjsGlobal) ||
	  // eslint-disable-next-line no-new-func
	  Function('return this')();

	var fails = function (exec) {
	  try {
	    return !!exec();
	  } catch (error) {
	    return true;
	  }
	};

	// Thank's IE8 for his funny defineProperty
	var descriptors = !fails(function () {
	  return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
	});

	var nativePropertyIsEnumerable = {}.propertyIsEnumerable;
	var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

	// Nashorn ~ JDK8 bug
	var NASHORN_BUG = getOwnPropertyDescriptor && !nativePropertyIsEnumerable.call({ 1: 2 }, 1);

	// `Object.prototype.propertyIsEnumerable` method implementation
	// https://tc39.github.io/ecma262/#sec-object.prototype.propertyisenumerable
	var f = NASHORN_BUG ? function propertyIsEnumerable(V) {
	  var descriptor = getOwnPropertyDescriptor(this, V);
	  return !!descriptor && descriptor.enumerable;
	} : nativePropertyIsEnumerable;

	var objectPropertyIsEnumerable = {
		f: f
	};

	var createPropertyDescriptor = function (bitmap, value) {
	  return {
	    enumerable: !(bitmap & 1),
	    configurable: !(bitmap & 2),
	    writable: !(bitmap & 4),
	    value: value
	  };
	};

	var toString = {}.toString;

	var classofRaw = function (it) {
	  return toString.call(it).slice(8, -1);
	};

	var split = ''.split;

	// fallback for non-array-like ES3 and non-enumerable old V8 strings
	var indexedObject = fails(function () {
	  // throws an error in rhino, see https://github.com/mozilla/rhino/issues/346
	  // eslint-disable-next-line no-prototype-builtins
	  return !Object('z').propertyIsEnumerable(0);
	}) ? function (it) {
	  return classofRaw(it) == 'String' ? split.call(it, '') : Object(it);
	} : Object;

	// `RequireObjectCoercible` abstract operation
	// https://tc39.github.io/ecma262/#sec-requireobjectcoercible
	var requireObjectCoercible = function (it) {
	  if (it == undefined) throw TypeError("Can't call method on " + it);
	  return it;
	};

	// toObject with fallback for non-array-like ES3 strings



	var toIndexedObject = function (it) {
	  return indexedObject(requireObjectCoercible(it));
	};

	var isObject = function (it) {
	  return typeof it === 'object' ? it !== null : typeof it === 'function';
	};

	// `ToPrimitive` abstract operation
	// https://tc39.github.io/ecma262/#sec-toprimitive
	// instead of the ES6 spec version, we didn't implement @@toPrimitive case
	// and the second argument - flag - preferred type is a string
	var toPrimitive = function (input, PREFERRED_STRING) {
	  if (!isObject(input)) return input;
	  var fn, val;
	  if (PREFERRED_STRING && typeof (fn = input.toString) == 'function' && !isObject(val = fn.call(input))) return val;
	  if (typeof (fn = input.valueOf) == 'function' && !isObject(val = fn.call(input))) return val;
	  if (!PREFERRED_STRING && typeof (fn = input.toString) == 'function' && !isObject(val = fn.call(input))) return val;
	  throw TypeError("Can't convert object to primitive value");
	};

	var hasOwnProperty = {}.hasOwnProperty;

	var has = function (it, key) {
	  return hasOwnProperty.call(it, key);
	};

	var document$1 = global_1.document;
	// typeof document.createElement is 'object' in old IE
	var EXISTS = isObject(document$1) && isObject(document$1.createElement);

	var documentCreateElement = function (it) {
	  return EXISTS ? document$1.createElement(it) : {};
	};

	// Thank's IE8 for his funny defineProperty
	var ie8DomDefine = !descriptors && !fails(function () {
	  return Object.defineProperty(documentCreateElement('div'), 'a', {
	    get: function () { return 7; }
	  }).a != 7;
	});

	var nativeGetOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

	// `Object.getOwnPropertyDescriptor` method
	// https://tc39.github.io/ecma262/#sec-object.getownpropertydescriptor
	var f$1 = descriptors ? nativeGetOwnPropertyDescriptor : function getOwnPropertyDescriptor(O, P) {
	  O = toIndexedObject(O);
	  P = toPrimitive(P, true);
	  if (ie8DomDefine) try {
	    return nativeGetOwnPropertyDescriptor(O, P);
	  } catch (error) { /* empty */ }
	  if (has(O, P)) return createPropertyDescriptor(!objectPropertyIsEnumerable.f.call(O, P), O[P]);
	};

	var objectGetOwnPropertyDescriptor = {
		f: f$1
	};

	var anObject = function (it) {
	  if (!isObject(it)) {
	    throw TypeError(String(it) + ' is not an object');
	  } return it;
	};

	var nativeDefineProperty = Object.defineProperty;

	// `Object.defineProperty` method
	// https://tc39.github.io/ecma262/#sec-object.defineproperty
	var f$2 = descriptors ? nativeDefineProperty : function defineProperty(O, P, Attributes) {
	  anObject(O);
	  P = toPrimitive(P, true);
	  anObject(Attributes);
	  if (ie8DomDefine) try {
	    return nativeDefineProperty(O, P, Attributes);
	  } catch (error) { /* empty */ }
	  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported');
	  if ('value' in Attributes) O[P] = Attributes.value;
	  return O;
	};

	var objectDefineProperty = {
		f: f$2
	};

	var hide = descriptors ? function (object, key, value) {
	  return objectDefineProperty.f(object, key, createPropertyDescriptor(1, value));
	} : function (object, key, value) {
	  object[key] = value;
	  return object;
	};

	var setGlobal = function (key, value) {
	  try {
	    hide(global_1, key, value);
	  } catch (error) {
	    global_1[key] = value;
	  } return value;
	};

	var isPure = false;

	var shared = createCommonjsModule(function (module) {
	var SHARED = '__core-js_shared__';
	var store = global_1[SHARED] || setGlobal(SHARED, {});

	(module.exports = function (key, value) {
	  return store[key] || (store[key] = value !== undefined ? value : {});
	})('versions', []).push({
	  version: '3.2.1',
	  mode:  'global',
	  copyright: '© 2019 Denis Pushkarev (zloirock.ru)'
	});
	});

	var functionToString = shared('native-function-to-string', Function.toString);

	var WeakMap$1 = global_1.WeakMap;

	var nativeWeakMap = typeof WeakMap$1 === 'function' && /native code/.test(functionToString.call(WeakMap$1));

	var id = 0;
	var postfix = Math.random();

	var uid = function (key) {
	  return 'Symbol(' + String(key === undefined ? '' : key) + ')_' + (++id + postfix).toString(36);
	};

	var keys = shared('keys');

	var sharedKey = function (key) {
	  return keys[key] || (keys[key] = uid(key));
	};

	var hiddenKeys = {};

	var WeakMap$2 = global_1.WeakMap;
	var set, get, has$1;

	var enforce = function (it) {
	  return has$1(it) ? get(it) : set(it, {});
	};

	var getterFor = function (TYPE) {
	  return function (it) {
	    var state;
	    if (!isObject(it) || (state = get(it)).type !== TYPE) {
	      throw TypeError('Incompatible receiver, ' + TYPE + ' required');
	    } return state;
	  };
	};

	if (nativeWeakMap) {
	  var store = new WeakMap$2();
	  var wmget = store.get;
	  var wmhas = store.has;
	  var wmset = store.set;
	  set = function (it, metadata) {
	    wmset.call(store, it, metadata);
	    return metadata;
	  };
	  get = function (it) {
	    return wmget.call(store, it) || {};
	  };
	  has$1 = function (it) {
	    return wmhas.call(store, it);
	  };
	} else {
	  var STATE = sharedKey('state');
	  hiddenKeys[STATE] = true;
	  set = function (it, metadata) {
	    hide(it, STATE, metadata);
	    return metadata;
	  };
	  get = function (it) {
	    return has(it, STATE) ? it[STATE] : {};
	  };
	  has$1 = function (it) {
	    return has(it, STATE);
	  };
	}

	var internalState = {
	  set: set,
	  get: get,
	  has: has$1,
	  enforce: enforce,
	  getterFor: getterFor
	};

	var redefine = createCommonjsModule(function (module) {
	var getInternalState = internalState.get;
	var enforceInternalState = internalState.enforce;
	var TEMPLATE = String(functionToString).split('toString');

	shared('inspectSource', function (it) {
	  return functionToString.call(it);
	});

	(module.exports = function (O, key, value, options) {
	  var unsafe = options ? !!options.unsafe : false;
	  var simple = options ? !!options.enumerable : false;
	  var noTargetGet = options ? !!options.noTargetGet : false;
	  if (typeof value == 'function') {
	    if (typeof key == 'string' && !has(value, 'name')) hide(value, 'name', key);
	    enforceInternalState(value).source = TEMPLATE.join(typeof key == 'string' ? key : '');
	  }
	  if (O === global_1) {
	    if (simple) O[key] = value;
	    else setGlobal(key, value);
	    return;
	  } else if (!unsafe) {
	    delete O[key];
	  } else if (!noTargetGet && O[key]) {
	    simple = true;
	  }
	  if (simple) O[key] = value;
	  else hide(O, key, value);
	// add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
	})(Function.prototype, 'toString', function toString() {
	  return typeof this == 'function' && getInternalState(this).source || functionToString.call(this);
	});
	});

	var path = global_1;

	var aFunction = function (variable) {
	  return typeof variable == 'function' ? variable : undefined;
	};

	var getBuiltIn = function (namespace, method) {
	  return arguments.length < 2 ? aFunction(path[namespace]) || aFunction(global_1[namespace])
	    : path[namespace] && path[namespace][method] || global_1[namespace] && global_1[namespace][method];
	};

	var ceil = Math.ceil;
	var floor = Math.floor;

	// `ToInteger` abstract operation
	// https://tc39.github.io/ecma262/#sec-tointeger
	var toInteger = function (argument) {
	  return isNaN(argument = +argument) ? 0 : (argument > 0 ? floor : ceil)(argument);
	};

	var min = Math.min;

	// `ToLength` abstract operation
	// https://tc39.github.io/ecma262/#sec-tolength
	var toLength = function (argument) {
	  return argument > 0 ? min(toInteger(argument), 0x1FFFFFFFFFFFFF) : 0; // 2 ** 53 - 1 == 9007199254740991
	};

	var max = Math.max;
	var min$1 = Math.min;

	// Helper for a popular repeating case of the spec:
	// Let integer be ? ToInteger(index).
	// If integer < 0, let result be max((length + integer), 0); else let result be min(length, length).
	var toAbsoluteIndex = function (index, length) {
	  var integer = toInteger(index);
	  return integer < 0 ? max(integer + length, 0) : min$1(integer, length);
	};

	// `Array.prototype.{ indexOf, includes }` methods implementation
	var createMethod = function (IS_INCLUDES) {
	  return function ($this, el, fromIndex) {
	    var O = toIndexedObject($this);
	    var length = toLength(O.length);
	    var index = toAbsoluteIndex(fromIndex, length);
	    var value;
	    // Array#includes uses SameValueZero equality algorithm
	    // eslint-disable-next-line no-self-compare
	    if (IS_INCLUDES && el != el) while (length > index) {
	      value = O[index++];
	      // eslint-disable-next-line no-self-compare
	      if (value != value) return true;
	    // Array#indexOf ignores holes, Array#includes - not
	    } else for (;length > index; index++) {
	      if ((IS_INCLUDES || index in O) && O[index] === el) return IS_INCLUDES || index || 0;
	    } return !IS_INCLUDES && -1;
	  };
	};

	var arrayIncludes = {
	  // `Array.prototype.includes` method
	  // https://tc39.github.io/ecma262/#sec-array.prototype.includes
	  includes: createMethod(true),
	  // `Array.prototype.indexOf` method
	  // https://tc39.github.io/ecma262/#sec-array.prototype.indexof
	  indexOf: createMethod(false)
	};

	var indexOf = arrayIncludes.indexOf;


	var objectKeysInternal = function (object, names) {
	  var O = toIndexedObject(object);
	  var i = 0;
	  var result = [];
	  var key;
	  for (key in O) !has(hiddenKeys, key) && has(O, key) && result.push(key);
	  // Don't enum bug & hidden keys
	  while (names.length > i) if (has(O, key = names[i++])) {
	    ~indexOf(result, key) || result.push(key);
	  }
	  return result;
	};

	// IE8- don't enum bug keys
	var enumBugKeys = [
	  'constructor',
	  'hasOwnProperty',
	  'isPrototypeOf',
	  'propertyIsEnumerable',
	  'toLocaleString',
	  'toString',
	  'valueOf'
	];

	var hiddenKeys$1 = enumBugKeys.concat('length', 'prototype');

	// `Object.getOwnPropertyNames` method
	// https://tc39.github.io/ecma262/#sec-object.getownpropertynames
	var f$3 = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
	  return objectKeysInternal(O, hiddenKeys$1);
	};

	var objectGetOwnPropertyNames = {
		f: f$3
	};

	var f$4 = Object.getOwnPropertySymbols;

	var objectGetOwnPropertySymbols = {
		f: f$4
	};

	// all object keys, includes non-enumerable and symbols
	var ownKeys = getBuiltIn('Reflect', 'ownKeys') || function ownKeys(it) {
	  var keys = objectGetOwnPropertyNames.f(anObject(it));
	  var getOwnPropertySymbols = objectGetOwnPropertySymbols.f;
	  return getOwnPropertySymbols ? keys.concat(getOwnPropertySymbols(it)) : keys;
	};

	var copyConstructorProperties = function (target, source) {
	  var keys = ownKeys(source);
	  var defineProperty = objectDefineProperty.f;
	  var getOwnPropertyDescriptor = objectGetOwnPropertyDescriptor.f;
	  for (var i = 0; i < keys.length; i++) {
	    var key = keys[i];
	    if (!has(target, key)) defineProperty(target, key, getOwnPropertyDescriptor(source, key));
	  }
	};

	var replacement = /#|\.prototype\./;

	var isForced = function (feature, detection) {
	  var value = data[normalize(feature)];
	  return value == POLYFILL ? true
	    : value == NATIVE ? false
	    : typeof detection == 'function' ? fails(detection)
	    : !!detection;
	};

	var normalize = isForced.normalize = function (string) {
	  return String(string).replace(replacement, '.').toLowerCase();
	};

	var data = isForced.data = {};
	var NATIVE = isForced.NATIVE = 'N';
	var POLYFILL = isForced.POLYFILL = 'P';

	var isForced_1 = isForced;

	var getOwnPropertyDescriptor$1 = objectGetOwnPropertyDescriptor.f;






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
	*/
	var _export = function (options, source) {
	  var TARGET = options.target;
	  var GLOBAL = options.global;
	  var STATIC = options.stat;
	  var FORCED, target, key, targetProperty, sourceProperty, descriptor;
	  if (GLOBAL) {
	    target = global_1;
	  } else if (STATIC) {
	    target = global_1[TARGET] || setGlobal(TARGET, {});
	  } else {
	    target = (global_1[TARGET] || {}).prototype;
	  }
	  if (target) for (key in source) {
	    sourceProperty = source[key];
	    if (options.noTargetGet) {
	      descriptor = getOwnPropertyDescriptor$1(target, key);
	      targetProperty = descriptor && descriptor.value;
	    } else targetProperty = target[key];
	    FORCED = isForced_1(GLOBAL ? key : TARGET + (STATIC ? '.' : '#') + key, options.forced);
	    // contained in target
	    if (!FORCED && targetProperty !== undefined) {
	      if (typeof sourceProperty === typeof targetProperty) continue;
	      copyConstructorProperties(sourceProperty, targetProperty);
	    }
	    // add a flag to not completely full polyfills
	    if (options.sham || (targetProperty && targetProperty.sham)) {
	      hide(sourceProperty, 'sham', true);
	    }
	    // extend global
	    redefine(target, key, sourceProperty, options);
	  }
	};

	// `IsArray` abstract operation
	// https://tc39.github.io/ecma262/#sec-isarray
	var isArray = Array.isArray || function isArray(arg) {
	  return classofRaw(arg) == 'Array';
	};

	// `ToObject` abstract operation
	// https://tc39.github.io/ecma262/#sec-toobject
	var toObject = function (argument) {
	  return Object(requireObjectCoercible(argument));
	};

	var createProperty = function (object, key, value) {
	  var propertyKey = toPrimitive(key);
	  if (propertyKey in object) objectDefineProperty.f(object, propertyKey, createPropertyDescriptor(0, value));
	  else object[propertyKey] = value;
	};

	var nativeSymbol = !!Object.getOwnPropertySymbols && !fails(function () {
	  // Chrome 38 Symbol has incorrect toString conversion
	  // eslint-disable-next-line no-undef
	  return !String(Symbol());
	});

	var Symbol$1 = global_1.Symbol;
	var store$1 = shared('wks');

	var wellKnownSymbol = function (name) {
	  return store$1[name] || (store$1[name] = nativeSymbol && Symbol$1[name]
	    || (nativeSymbol ? Symbol$1 : uid)('Symbol.' + name));
	};

	var SPECIES = wellKnownSymbol('species');

	// `ArraySpeciesCreate` abstract operation
	// https://tc39.github.io/ecma262/#sec-arrayspeciescreate
	var arraySpeciesCreate = function (originalArray, length) {
	  var C;
	  if (isArray(originalArray)) {
	    C = originalArray.constructor;
	    // cross-realm fallback
	    if (typeof C == 'function' && (C === Array || isArray(C.prototype))) C = undefined;
	    else if (isObject(C)) {
	      C = C[SPECIES];
	      if (C === null) C = undefined;
	    }
	  } return new (C === undefined ? Array : C)(length === 0 ? 0 : length);
	};

	var SPECIES$1 = wellKnownSymbol('species');

	var arrayMethodHasSpeciesSupport = function (METHOD_NAME) {
	  return !fails(function () {
	    var array = [];
	    var constructor = array.constructor = {};
	    constructor[SPECIES$1] = function () {
	      return { foo: 1 };
	    };
	    return array[METHOD_NAME](Boolean).foo !== 1;
	  });
	};

	var IS_CONCAT_SPREADABLE = wellKnownSymbol('isConcatSpreadable');
	var MAX_SAFE_INTEGER = 0x1FFFFFFFFFFFFF;
	var MAXIMUM_ALLOWED_INDEX_EXCEEDED = 'Maximum allowed index exceeded';

	var IS_CONCAT_SPREADABLE_SUPPORT = !fails(function () {
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
	// https://tc39.github.io/ecma262/#sec-array.prototype.concat
	// with adding support of @@isConcatSpreadable and @@species
	_export({ target: 'Array', proto: true, forced: FORCED }, {
	  concat: function concat(arg) { // eslint-disable-line no-unused-vars
	    var O = toObject(this);
	    var A = arraySpeciesCreate(O, 0);
	    var n = 0;
	    var i, k, length, len, E;
	    for (i = -1, length = arguments.length; i < length; i++) {
	      E = i === -1 ? O : arguments[i];
	      if (isConcatSpreadable(E)) {
	        len = toLength(E.length);
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

	// `Object.keys` method
	// https://tc39.github.io/ecma262/#sec-object.keys
	var objectKeys = Object.keys || function keys(O) {
	  return objectKeysInternal(O, enumBugKeys);
	};

	// `Object.defineProperties` method
	// https://tc39.github.io/ecma262/#sec-object.defineproperties
	var objectDefineProperties = descriptors ? Object.defineProperties : function defineProperties(O, Properties) {
	  anObject(O);
	  var keys = objectKeys(Properties);
	  var length = keys.length;
	  var index = 0;
	  var key;
	  while (length > index) objectDefineProperty.f(O, key = keys[index++], Properties[key]);
	  return O;
	};

	var html = getBuiltIn('document', 'documentElement');

	var IE_PROTO = sharedKey('IE_PROTO');

	var PROTOTYPE = 'prototype';
	var Empty = function () { /* empty */ };

	// Create object with fake `null` prototype: use iframe Object with cleared prototype
	var createDict = function () {
	  // Thrash, waste and sodomy: IE GC bug
	  var iframe = documentCreateElement('iframe');
	  var length = enumBugKeys.length;
	  var lt = '<';
	  var script = 'script';
	  var gt = '>';
	  var js = 'java' + script + ':';
	  var iframeDocument;
	  iframe.style.display = 'none';
	  html.appendChild(iframe);
	  iframe.src = String(js);
	  iframeDocument = iframe.contentWindow.document;
	  iframeDocument.open();
	  iframeDocument.write(lt + script + gt + 'document.F=Object' + lt + '/' + script + gt);
	  iframeDocument.close();
	  createDict = iframeDocument.F;
	  while (length--) delete createDict[PROTOTYPE][enumBugKeys[length]];
	  return createDict();
	};

	// `Object.create` method
	// https://tc39.github.io/ecma262/#sec-object.create
	var objectCreate = Object.create || function create(O, Properties) {
	  var result;
	  if (O !== null) {
	    Empty[PROTOTYPE] = anObject(O);
	    result = new Empty();
	    Empty[PROTOTYPE] = null;
	    // add "__proto__" for Object.getPrototypeOf polyfill
	    result[IE_PROTO] = O;
	  } else result = createDict();
	  return Properties === undefined ? result : objectDefineProperties(result, Properties);
	};

	hiddenKeys[IE_PROTO] = true;

	var UNSCOPABLES = wellKnownSymbol('unscopables');
	var ArrayPrototype = Array.prototype;

	// Array.prototype[@@unscopables]
	// https://tc39.github.io/ecma262/#sec-array.prototype-@@unscopables
	if (ArrayPrototype[UNSCOPABLES] == undefined) {
	  hide(ArrayPrototype, UNSCOPABLES, objectCreate(null));
	}

	// add a key to Array.prototype[@@unscopables]
	var addToUnscopables = function (key) {
	  ArrayPrototype[UNSCOPABLES][key] = true;
	};

	var iterators = {};

	var correctPrototypeGetter = !fails(function () {
	  function F() { /* empty */ }
	  F.prototype.constructor = null;
	  return Object.getPrototypeOf(new F()) !== F.prototype;
	});

	var IE_PROTO$1 = sharedKey('IE_PROTO');
	var ObjectPrototype = Object.prototype;

	// `Object.getPrototypeOf` method
	// https://tc39.github.io/ecma262/#sec-object.getprototypeof
	var objectGetPrototypeOf = correctPrototypeGetter ? Object.getPrototypeOf : function (O) {
	  O = toObject(O);
	  if (has(O, IE_PROTO$1)) return O[IE_PROTO$1];
	  if (typeof O.constructor == 'function' && O instanceof O.constructor) {
	    return O.constructor.prototype;
	  } return O instanceof Object ? ObjectPrototype : null;
	};

	var ITERATOR = wellKnownSymbol('iterator');
	var BUGGY_SAFARI_ITERATORS = false;

	var returnThis = function () { return this; };

	// `%IteratorPrototype%` object
	// https://tc39.github.io/ecma262/#sec-%iteratorprototype%-object
	var IteratorPrototype, PrototypeOfArrayIteratorPrototype, arrayIterator;

	if ([].keys) {
	  arrayIterator = [].keys();
	  // Safari 8 has buggy iterators w/o `next`
	  if (!('next' in arrayIterator)) BUGGY_SAFARI_ITERATORS = true;
	  else {
	    PrototypeOfArrayIteratorPrototype = objectGetPrototypeOf(objectGetPrototypeOf(arrayIterator));
	    if (PrototypeOfArrayIteratorPrototype !== Object.prototype) IteratorPrototype = PrototypeOfArrayIteratorPrototype;
	  }
	}

	if (IteratorPrototype == undefined) IteratorPrototype = {};

	// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
	if ( !has(IteratorPrototype, ITERATOR)) hide(IteratorPrototype, ITERATOR, returnThis);

	var iteratorsCore = {
	  IteratorPrototype: IteratorPrototype,
	  BUGGY_SAFARI_ITERATORS: BUGGY_SAFARI_ITERATORS
	};

	var defineProperty = objectDefineProperty.f;



	var TO_STRING_TAG = wellKnownSymbol('toStringTag');

	var setToStringTag = function (it, TAG, STATIC) {
	  if (it && !has(it = STATIC ? it : it.prototype, TO_STRING_TAG)) {
	    defineProperty(it, TO_STRING_TAG, { configurable: true, value: TAG });
	  }
	};

	var IteratorPrototype$1 = iteratorsCore.IteratorPrototype;





	var returnThis$1 = function () { return this; };

	var createIteratorConstructor = function (IteratorConstructor, NAME, next) {
	  var TO_STRING_TAG = NAME + ' Iterator';
	  IteratorConstructor.prototype = objectCreate(IteratorPrototype$1, { next: createPropertyDescriptor(1, next) });
	  setToStringTag(IteratorConstructor, TO_STRING_TAG, false);
	  iterators[TO_STRING_TAG] = returnThis$1;
	  return IteratorConstructor;
	};

	var aPossiblePrototype = function (it) {
	  if (!isObject(it) && it !== null) {
	    throw TypeError("Can't set " + String(it) + ' as a prototype');
	  } return it;
	};

	// `Object.setPrototypeOf` method
	// https://tc39.github.io/ecma262/#sec-object.setprototypeof
	// Works with __proto__ only. Old v8 can't work with null proto objects.
	/* eslint-disable no-proto */
	var objectSetPrototypeOf = Object.setPrototypeOf || ('__proto__' in {} ? function () {
	  var CORRECT_SETTER = false;
	  var test = {};
	  var setter;
	  try {
	    setter = Object.getOwnPropertyDescriptor(Object.prototype, '__proto__').set;
	    setter.call(test, []);
	    CORRECT_SETTER = test instanceof Array;
	  } catch (error) { /* empty */ }
	  return function setPrototypeOf(O, proto) {
	    anObject(O);
	    aPossiblePrototype(proto);
	    if (CORRECT_SETTER) setter.call(O, proto);
	    else O.__proto__ = proto;
	    return O;
	  };
	}() : undefined);

	var IteratorPrototype$2 = iteratorsCore.IteratorPrototype;
	var BUGGY_SAFARI_ITERATORS$1 = iteratorsCore.BUGGY_SAFARI_ITERATORS;
	var ITERATOR$1 = wellKnownSymbol('iterator');
	var KEYS = 'keys';
	var VALUES = 'values';
	var ENTRIES = 'entries';

	var returnThis$2 = function () { return this; };

	var defineIterator = function (Iterable, NAME, IteratorConstructor, next, DEFAULT, IS_SET, FORCED) {
	  createIteratorConstructor(IteratorConstructor, NAME, next);

	  var getIterationMethod = function (KIND) {
	    if (KIND === DEFAULT && defaultIterator) return defaultIterator;
	    if (!BUGGY_SAFARI_ITERATORS$1 && KIND in IterablePrototype) return IterablePrototype[KIND];
	    switch (KIND) {
	      case KEYS: return function keys() { return new IteratorConstructor(this, KIND); };
	      case VALUES: return function values() { return new IteratorConstructor(this, KIND); };
	      case ENTRIES: return function entries() { return new IteratorConstructor(this, KIND); };
	    } return function () { return new IteratorConstructor(this); };
	  };

	  var TO_STRING_TAG = NAME + ' Iterator';
	  var INCORRECT_VALUES_NAME = false;
	  var IterablePrototype = Iterable.prototype;
	  var nativeIterator = IterablePrototype[ITERATOR$1]
	    || IterablePrototype['@@iterator']
	    || DEFAULT && IterablePrototype[DEFAULT];
	  var defaultIterator = !BUGGY_SAFARI_ITERATORS$1 && nativeIterator || getIterationMethod(DEFAULT);
	  var anyNativeIterator = NAME == 'Array' ? IterablePrototype.entries || nativeIterator : nativeIterator;
	  var CurrentIteratorPrototype, methods, KEY;

	  // fix native
	  if (anyNativeIterator) {
	    CurrentIteratorPrototype = objectGetPrototypeOf(anyNativeIterator.call(new Iterable()));
	    if (IteratorPrototype$2 !== Object.prototype && CurrentIteratorPrototype.next) {
	      if ( objectGetPrototypeOf(CurrentIteratorPrototype) !== IteratorPrototype$2) {
	        if (objectSetPrototypeOf) {
	          objectSetPrototypeOf(CurrentIteratorPrototype, IteratorPrototype$2);
	        } else if (typeof CurrentIteratorPrototype[ITERATOR$1] != 'function') {
	          hide(CurrentIteratorPrototype, ITERATOR$1, returnThis$2);
	        }
	      }
	      // Set @@toStringTag to native iterators
	      setToStringTag(CurrentIteratorPrototype, TO_STRING_TAG, true);
	    }
	  }

	  // fix Array#{values, @@iterator}.name in V8 / FF
	  if (DEFAULT == VALUES && nativeIterator && nativeIterator.name !== VALUES) {
	    INCORRECT_VALUES_NAME = true;
	    defaultIterator = function values() { return nativeIterator.call(this); };
	  }

	  // define iterator
	  if ( IterablePrototype[ITERATOR$1] !== defaultIterator) {
	    hide(IterablePrototype, ITERATOR$1, defaultIterator);
	  }
	  iterators[NAME] = defaultIterator;

	  // export additional methods
	  if (DEFAULT) {
	    methods = {
	      values: getIterationMethod(VALUES),
	      keys: IS_SET ? defaultIterator : getIterationMethod(KEYS),
	      entries: getIterationMethod(ENTRIES)
	    };
	    if (FORCED) for (KEY in methods) {
	      if (BUGGY_SAFARI_ITERATORS$1 || INCORRECT_VALUES_NAME || !(KEY in IterablePrototype)) {
	        redefine(IterablePrototype, KEY, methods[KEY]);
	      }
	    } else _export({ target: NAME, proto: true, forced: BUGGY_SAFARI_ITERATORS$1 || INCORRECT_VALUES_NAME }, methods);
	  }

	  return methods;
	};

	var ARRAY_ITERATOR = 'Array Iterator';
	var setInternalState = internalState.set;
	var getInternalState = internalState.getterFor(ARRAY_ITERATOR);

	// `Array.prototype.entries` method
	// https://tc39.github.io/ecma262/#sec-array.prototype.entries
	// `Array.prototype.keys` method
	// https://tc39.github.io/ecma262/#sec-array.prototype.keys
	// `Array.prototype.values` method
	// https://tc39.github.io/ecma262/#sec-array.prototype.values
	// `Array.prototype[@@iterator]` method
	// https://tc39.github.io/ecma262/#sec-array.prototype-@@iterator
	// `CreateArrayIterator` internal method
	// https://tc39.github.io/ecma262/#sec-createarrayiterator
	var es_array_iterator = defineIterator(Array, 'Array', function (iterated, kind) {
	  setInternalState(this, {
	    type: ARRAY_ITERATOR,
	    target: toIndexedObject(iterated), // target
	    index: 0,                          // next index
	    kind: kind                         // kind
	  });
	// `%ArrayIteratorPrototype%.next` method
	// https://tc39.github.io/ecma262/#sec-%arrayiteratorprototype%.next
	}, function () {
	  var state = getInternalState(this);
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
	// https://tc39.github.io/ecma262/#sec-createunmappedargumentsobject
	// https://tc39.github.io/ecma262/#sec-createmappedargumentsobject
	iterators.Arguments = iterators.Array;

	// https://tc39.github.io/ecma262/#sec-array.prototype-@@unscopables
	addToUnscopables('keys');
	addToUnscopables('values');
	addToUnscopables('entries');

	var sloppyArrayMethod = function (METHOD_NAME, argument) {
	  var method = [][METHOD_NAME];
	  return !method || !fails(function () {
	    // eslint-disable-next-line no-useless-call,no-throw-literal
	    method.call(null, argument || function () { throw 1; }, 1);
	  });
	};

	var nativeJoin = [].join;

	var ES3_STRINGS = indexedObject != Object;
	var SLOPPY_METHOD = sloppyArrayMethod('join', ',');

	// `Array.prototype.join` method
	// https://tc39.github.io/ecma262/#sec-array.prototype.join
	_export({ target: 'Array', proto: true, forced: ES3_STRINGS || SLOPPY_METHOD }, {
	  join: function join(separator) {
	    return nativeJoin.call(toIndexedObject(this), separator === undefined ? ',' : separator);
	  }
	});

	var aFunction$1 = function (it) {
	  if (typeof it != 'function') {
	    throw TypeError(String(it) + ' is not a function');
	  } return it;
	};

	// optional / simple context binding
	var bindContext = function (fn, that, length) {
	  aFunction$1(fn);
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

	var push = [].push;

	// `Array.prototype.{ forEach, map, filter, some, every, find, findIndex }` methods implementation
	var createMethod$1 = function (TYPE) {
	  var IS_MAP = TYPE == 1;
	  var IS_FILTER = TYPE == 2;
	  var IS_SOME = TYPE == 3;
	  var IS_EVERY = TYPE == 4;
	  var IS_FIND_INDEX = TYPE == 6;
	  var NO_HOLES = TYPE == 5 || IS_FIND_INDEX;
	  return function ($this, callbackfn, that, specificCreate) {
	    var O = toObject($this);
	    var self = indexedObject(O);
	    var boundFunction = bindContext(callbackfn, that, 3);
	    var length = toLength(self.length);
	    var index = 0;
	    var create = specificCreate || arraySpeciesCreate;
	    var target = IS_MAP ? create($this, length) : IS_FILTER ? create($this, 0) : undefined;
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
	        } else if (IS_EVERY) return false;  // every
	      }
	    }
	    return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : target;
	  };
	};

	var arrayIteration = {
	  // `Array.prototype.forEach` method
	  // https://tc39.github.io/ecma262/#sec-array.prototype.foreach
	  forEach: createMethod$1(0),
	  // `Array.prototype.map` method
	  // https://tc39.github.io/ecma262/#sec-array.prototype.map
	  map: createMethod$1(1),
	  // `Array.prototype.filter` method
	  // https://tc39.github.io/ecma262/#sec-array.prototype.filter
	  filter: createMethod$1(2),
	  // `Array.prototype.some` method
	  // https://tc39.github.io/ecma262/#sec-array.prototype.some
	  some: createMethod$1(3),
	  // `Array.prototype.every` method
	  // https://tc39.github.io/ecma262/#sec-array.prototype.every
	  every: createMethod$1(4),
	  // `Array.prototype.find` method
	  // https://tc39.github.io/ecma262/#sec-array.prototype.find
	  find: createMethod$1(5),
	  // `Array.prototype.findIndex` method
	  // https://tc39.github.io/ecma262/#sec-array.prototype.findIndex
	  findIndex: createMethod$1(6)
	};

	var $map = arrayIteration.map;


	// `Array.prototype.map` method
	// https://tc39.github.io/ecma262/#sec-array.prototype.map
	// with adding support of @@species
	_export({ target: 'Array', proto: true, forced: !arrayMethodHasSpeciesSupport('map') }, {
	  map: function map(callbackfn /* , thisArg */) {
	    return $map(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
	  }
	});

	var TO_STRING_TAG$1 = wellKnownSymbol('toStringTag');
	// ES3 wrong here
	var CORRECT_ARGUMENTS = classofRaw(function () { return arguments; }()) == 'Arguments';

	// fallback for IE11 Script Access Denied error
	var tryGet = function (it, key) {
	  try {
	    return it[key];
	  } catch (error) { /* empty */ }
	};

	// getting tag from ES6+ `Object.prototype.toString`
	var classof = function (it) {
	  var O, tag, result;
	  return it === undefined ? 'Undefined' : it === null ? 'Null'
	    // @@toStringTag case
	    : typeof (tag = tryGet(O = Object(it), TO_STRING_TAG$1)) == 'string' ? tag
	    // builtinTag case
	    : CORRECT_ARGUMENTS ? classofRaw(O)
	    // ES3 arguments fallback
	    : (result = classofRaw(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : result;
	};

	var TO_STRING_TAG$2 = wellKnownSymbol('toStringTag');
	var test = {};

	test[TO_STRING_TAG$2] = 'z';

	// `Object.prototype.toString` method implementation
	// https://tc39.github.io/ecma262/#sec-object.prototype.tostring
	var objectToString = String(test) !== '[object z]' ? function toString() {
	  return '[object ' + classof(this) + ']';
	} : test.toString;

	var ObjectPrototype$1 = Object.prototype;

	// `Object.prototype.toString` method
	// https://tc39.github.io/ecma262/#sec-object.prototype.tostring
	if (objectToString !== ObjectPrototype$1.toString) {
	  redefine(ObjectPrototype$1, 'toString', objectToString, { unsafe: true });
	}

	var nativePromiseConstructor = global_1.Promise;

	var redefineAll = function (target, src, options) {
	  for (var key in src) redefine(target, key, src[key], options);
	  return target;
	};

	var SPECIES$2 = wellKnownSymbol('species');

	var setSpecies = function (CONSTRUCTOR_NAME) {
	  var Constructor = getBuiltIn(CONSTRUCTOR_NAME);
	  var defineProperty = objectDefineProperty.f;

	  if (descriptors && Constructor && !Constructor[SPECIES$2]) {
	    defineProperty(Constructor, SPECIES$2, {
	      configurable: true,
	      get: function () { return this; }
	    });
	  }
	};

	var anInstance = function (it, Constructor, name) {
	  if (!(it instanceof Constructor)) {
	    throw TypeError('Incorrect ' + (name ? name + ' ' : '') + 'invocation');
	  } return it;
	};

	var ITERATOR$2 = wellKnownSymbol('iterator');
	var ArrayPrototype$1 = Array.prototype;

	// check on default Array iterator
	var isArrayIteratorMethod = function (it) {
	  return it !== undefined && (iterators.Array === it || ArrayPrototype$1[ITERATOR$2] === it);
	};

	var ITERATOR$3 = wellKnownSymbol('iterator');

	var getIteratorMethod = function (it) {
	  if (it != undefined) return it[ITERATOR$3]
	    || it['@@iterator']
	    || iterators[classof(it)];
	};

	// call something on iterator step with safe closing on error
	var callWithSafeIterationClosing = function (iterator, fn, value, ENTRIES) {
	  try {
	    return ENTRIES ? fn(anObject(value)[0], value[1]) : fn(value);
	  // 7.4.6 IteratorClose(iterator, completion)
	  } catch (error) {
	    var returnMethod = iterator['return'];
	    if (returnMethod !== undefined) anObject(returnMethod.call(iterator));
	    throw error;
	  }
	};

	var iterate_1 = createCommonjsModule(function (module) {
	var Result = function (stopped, result) {
	  this.stopped = stopped;
	  this.result = result;
	};

	var iterate = module.exports = function (iterable, fn, that, AS_ENTRIES, IS_ITERATOR) {
	  var boundFunction = bindContext(fn, that, AS_ENTRIES ? 2 : 1);
	  var iterator, iterFn, index, length, result, step;

	  if (IS_ITERATOR) {
	    iterator = iterable;
	  } else {
	    iterFn = getIteratorMethod(iterable);
	    if (typeof iterFn != 'function') throw TypeError('Target is not iterable');
	    // optimisation for array iterators
	    if (isArrayIteratorMethod(iterFn)) {
	      for (index = 0, length = toLength(iterable.length); length > index; index++) {
	        result = AS_ENTRIES
	          ? boundFunction(anObject(step = iterable[index])[0], step[1])
	          : boundFunction(iterable[index]);
	        if (result && result instanceof Result) return result;
	      } return new Result(false);
	    }
	    iterator = iterFn.call(iterable);
	  }

	  while (!(step = iterator.next()).done) {
	    result = callWithSafeIterationClosing(iterator, boundFunction, step.value, AS_ENTRIES);
	    if (result && result instanceof Result) return result;
	  } return new Result(false);
	};

	iterate.stop = function (result) {
	  return new Result(true, result);
	};
	});

	var ITERATOR$4 = wellKnownSymbol('iterator');
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
	  iteratorWithReturn[ITERATOR$4] = function () {
	    return this;
	  };
	  // eslint-disable-next-line no-throw-literal
	  Array.from(iteratorWithReturn, function () { throw 2; });
	} catch (error) { /* empty */ }

	var checkCorrectnessOfIteration = function (exec, SKIP_CLOSING) {
	  if (!SKIP_CLOSING && !SAFE_CLOSING) return false;
	  var ITERATION_SUPPORT = false;
	  try {
	    var object = {};
	    object[ITERATOR$4] = function () {
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

	var SPECIES$3 = wellKnownSymbol('species');

	// `SpeciesConstructor` abstract operation
	// https://tc39.github.io/ecma262/#sec-speciesconstructor
	var speciesConstructor = function (O, defaultConstructor) {
	  var C = anObject(O).constructor;
	  var S;
	  return C === undefined || (S = anObject(C)[SPECIES$3]) == undefined ? defaultConstructor : aFunction$1(S);
	};

	var location = global_1.location;
	var set$1 = global_1.setImmediate;
	var clear = global_1.clearImmediate;
	var process = global_1.process;
	var MessageChannel = global_1.MessageChannel;
	var Dispatch = global_1.Dispatch;
	var counter = 0;
	var queue = {};
	var ONREADYSTATECHANGE = 'onreadystatechange';
	var defer, channel, port;

	var run = function (id) {
	  // eslint-disable-next-line no-prototype-builtins
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
	  global_1.postMessage(id + '', location.protocol + '//' + location.host);
	};

	// Node.js 0.9+ & IE10+ has setImmediate, otherwise:
	if (!set$1 || !clear) {
	  set$1 = function setImmediate(fn) {
	    var args = [];
	    var i = 1;
	    while (arguments.length > i) args.push(arguments[i++]);
	    queue[++counter] = function () {
	      // eslint-disable-next-line no-new-func
	      (typeof fn == 'function' ? fn : Function(fn)).apply(undefined, args);
	    };
	    defer(counter);
	    return counter;
	  };
	  clear = function clearImmediate(id) {
	    delete queue[id];
	  };
	  // Node.js 0.8-
	  if (classofRaw(process) == 'process') {
	    defer = function (id) {
	      process.nextTick(runner(id));
	    };
	  // Sphere (JS game engine) Dispatch API
	  } else if (Dispatch && Dispatch.now) {
	    defer = function (id) {
	      Dispatch.now(runner(id));
	    };
	  // Browsers with MessageChannel, includes WebWorkers
	  } else if (MessageChannel) {
	    channel = new MessageChannel();
	    port = channel.port2;
	    channel.port1.onmessage = listener;
	    defer = bindContext(port.postMessage, port, 1);
	  // Browsers with postMessage, skip WebWorkers
	  // IE8 has postMessage, but it's sync & typeof its postMessage is 'object'
	  } else if (global_1.addEventListener && typeof postMessage == 'function' && !global_1.importScripts && !fails(post)) {
	    defer = post;
	    global_1.addEventListener('message', listener, false);
	  // IE8-
	  } else if (ONREADYSTATECHANGE in documentCreateElement('script')) {
	    defer = function (id) {
	      html.appendChild(documentCreateElement('script'))[ONREADYSTATECHANGE] = function () {
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

	var task = {
	  set: set$1,
	  clear: clear
	};

	var userAgent = getBuiltIn('navigator', 'userAgent') || '';

	var getOwnPropertyDescriptor$2 = objectGetOwnPropertyDescriptor.f;

	var macrotask = task.set;


	var MutationObserver = global_1.MutationObserver || global_1.WebKitMutationObserver;
	var process$1 = global_1.process;
	var Promise$1 = global_1.Promise;
	var IS_NODE = classofRaw(process$1) == 'process';
	// Node.js 11 shows ExperimentalWarning on getting `queueMicrotask`
	var queueMicrotaskDescriptor = getOwnPropertyDescriptor$2(global_1, 'queueMicrotask');
	var queueMicrotask = queueMicrotaskDescriptor && queueMicrotaskDescriptor.value;

	var flush, head, last, notify, toggle, node, promise, then;

	// modern engines have queueMicrotask method
	if (!queueMicrotask) {
	  flush = function () {
	    var parent, fn;
	    if (IS_NODE && (parent = process$1.domain)) parent.exit();
	    while (head) {
	      fn = head.fn;
	      head = head.next;
	      try {
	        fn();
	      } catch (error) {
	        if (head) notify();
	        else last = undefined;
	        throw error;
	      }
	    } last = undefined;
	    if (parent) parent.enter();
	  };

	  // Node.js
	  if (IS_NODE) {
	    notify = function () {
	      process$1.nextTick(flush);
	    };
	  // browsers with MutationObserver, except iOS - https://github.com/zloirock/core-js/issues/339
	  } else if (MutationObserver && !/(iphone|ipod|ipad).*applewebkit/i.test(userAgent)) {
	    toggle = true;
	    node = document.createTextNode('');
	    new MutationObserver(flush).observe(node, { characterData: true }); // eslint-disable-line no-new
	    notify = function () {
	      node.data = toggle = !toggle;
	    };
	  // environments with maybe non-completely correct, but existent Promise
	  } else if (Promise$1 && Promise$1.resolve) {
	    // Promise.resolve without an argument throws an error in LG WebOS 2
	    promise = Promise$1.resolve(undefined);
	    then = promise.then;
	    notify = function () {
	      then.call(promise, flush);
	    };
	  // for other environments - macrotask based on:
	  // - setImmediate
	  // - MessageChannel
	  // - window.postMessag
	  // - onreadystatechange
	  // - setTimeout
	  } else {
	    notify = function () {
	      // strange IE + webpack dev server bug - use .call(global)
	      macrotask.call(global_1, flush);
	    };
	  }
	}

	var microtask = queueMicrotask || function (fn) {
	  var task = { fn: fn, next: undefined };
	  if (last) last.next = task;
	  if (!head) {
	    head = task;
	    notify();
	  } last = task;
	};

	var PromiseCapability = function (C) {
	  var resolve, reject;
	  this.promise = new C(function ($$resolve, $$reject) {
	    if (resolve !== undefined || reject !== undefined) throw TypeError('Bad Promise constructor');
	    resolve = $$resolve;
	    reject = $$reject;
	  });
	  this.resolve = aFunction$1(resolve);
	  this.reject = aFunction$1(reject);
	};

	// 25.4.1.5 NewPromiseCapability(C)
	var f$5 = function (C) {
	  return new PromiseCapability(C);
	};

	var newPromiseCapability = {
		f: f$5
	};

	var promiseResolve = function (C, x) {
	  anObject(C);
	  if (isObject(x) && x.constructor === C) return x;
	  var promiseCapability = newPromiseCapability.f(C);
	  var resolve = promiseCapability.resolve;
	  resolve(x);
	  return promiseCapability.promise;
	};

	var hostReportErrors = function (a, b) {
	  var console = global_1.console;
	  if (console && console.error) {
	    arguments.length === 1 ? console.error(a) : console.error(a, b);
	  }
	};

	var perform = function (exec) {
	  try {
	    return { error: false, value: exec() };
	  } catch (error) {
	    return { error: true, value: error };
	  }
	};

	var task$1 = task.set;










	var SPECIES$4 = wellKnownSymbol('species');
	var PROMISE = 'Promise';
	var getInternalState$1 = internalState.get;
	var setInternalState$1 = internalState.set;
	var getInternalPromiseState = internalState.getterFor(PROMISE);
	var PromiseConstructor = nativePromiseConstructor;
	var TypeError$1 = global_1.TypeError;
	var document$2 = global_1.document;
	var process$2 = global_1.process;
	var $fetch = global_1.fetch;
	var versions = process$2 && process$2.versions;
	var v8 = versions && versions.v8 || '';
	var newPromiseCapability$1 = newPromiseCapability.f;
	var newGenericPromiseCapability = newPromiseCapability$1;
	var IS_NODE$1 = classofRaw(process$2) == 'process';
	var DISPATCH_EVENT = !!(document$2 && document$2.createEvent && global_1.dispatchEvent);
	var UNHANDLED_REJECTION = 'unhandledrejection';
	var REJECTION_HANDLED = 'rejectionhandled';
	var PENDING = 0;
	var FULFILLED = 1;
	var REJECTED = 2;
	var HANDLED = 1;
	var UNHANDLED = 2;
	var Internal, OwnPromiseCapability, PromiseWrapper, nativeThen;

	var FORCED$1 = isForced_1(PROMISE, function () {
	  // correct subclassing with @@species support
	  var promise = PromiseConstructor.resolve(1);
	  var empty = function () { /* empty */ };
	  var FakePromise = (promise.constructor = {})[SPECIES$4] = function (exec) {
	    exec(empty, empty);
	  };
	  // unhandled rejections tracking support, NodeJS Promise without it fails @@species test
	  return !((IS_NODE$1 || typeof PromiseRejectionEvent == 'function')
	    && (!isPure || promise['finally'])
	    && promise.then(empty) instanceof FakePromise
	    // v8 6.6 (Node 10 and Chrome 66) have a bug with resolving custom thenables
	    // https://bugs.chromium.org/p/chromium/issues/detail?id=830565
	    // we can't detect it synchronously, so just check versions
	    && v8.indexOf('6.6') !== 0
	    && userAgent.indexOf('Chrome/66') === -1);
	});

	var INCORRECT_ITERATION = FORCED$1 || !checkCorrectnessOfIteration(function (iterable) {
	  PromiseConstructor.all(iterable)['catch'](function () { /* empty */ });
	});

	// helpers
	var isThenable = function (it) {
	  var then;
	  return isObject(it) && typeof (then = it.then) == 'function' ? then : false;
	};

	var notify$1 = function (promise, state, isReject) {
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
	            if (state.rejection === UNHANDLED) onHandleUnhandled(promise, state);
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
	    if (isReject && !state.rejection) onUnhandled(promise, state);
	  });
	};

	var dispatchEvent = function (name, promise, reason) {
	  var event, handler;
	  if (DISPATCH_EVENT) {
	    event = document$2.createEvent('Event');
	    event.promise = promise;
	    event.reason = reason;
	    event.initEvent(name, false, true);
	    global_1.dispatchEvent(event);
	  } else event = { promise: promise, reason: reason };
	  if (handler = global_1['on' + name]) handler(event);
	  else if (name === UNHANDLED_REJECTION) hostReportErrors('Unhandled promise rejection', reason);
	};

	var onUnhandled = function (promise, state) {
	  task$1.call(global_1, function () {
	    var value = state.value;
	    var IS_UNHANDLED = isUnhandled(state);
	    var result;
	    if (IS_UNHANDLED) {
	      result = perform(function () {
	        if (IS_NODE$1) {
	          process$2.emit('unhandledRejection', value, promise);
	        } else dispatchEvent(UNHANDLED_REJECTION, promise, value);
	      });
	      // Browsers should not trigger `rejectionHandled` event if it was handled here, NodeJS - should
	      state.rejection = IS_NODE$1 || isUnhandled(state) ? UNHANDLED : HANDLED;
	      if (result.error) throw result.value;
	    }
	  });
	};

	var isUnhandled = function (state) {
	  return state.rejection !== HANDLED && !state.parent;
	};

	var onHandleUnhandled = function (promise, state) {
	  task$1.call(global_1, function () {
	    if (IS_NODE$1) {
	      process$2.emit('rejectionHandled', promise);
	    } else dispatchEvent(REJECTION_HANDLED, promise, state.value);
	  });
	};

	var bind = function (fn, promise, state, unwrap) {
	  return function (value) {
	    fn(promise, state, value, unwrap);
	  };
	};

	var internalReject = function (promise, state, value, unwrap) {
	  if (state.done) return;
	  state.done = true;
	  if (unwrap) state = unwrap;
	  state.value = value;
	  state.state = REJECTED;
	  notify$1(promise, state, true);
	};

	var internalResolve = function (promise, state, value, unwrap) {
	  if (state.done) return;
	  state.done = true;
	  if (unwrap) state = unwrap;
	  try {
	    if (promise === value) throw TypeError$1("Promise can't be resolved itself");
	    var then = isThenable(value);
	    if (then) {
	      microtask(function () {
	        var wrapper = { done: false };
	        try {
	          then.call(value,
	            bind(internalResolve, promise, wrapper, state),
	            bind(internalReject, promise, wrapper, state)
	          );
	        } catch (error) {
	          internalReject(promise, wrapper, error, state);
	        }
	      });
	    } else {
	      state.value = value;
	      state.state = FULFILLED;
	      notify$1(promise, state, false);
	    }
	  } catch (error) {
	    internalReject(promise, { done: false }, error, state);
	  }
	};

	// constructor polyfill
	if (FORCED$1) {
	  // 25.4.3.1 Promise(executor)
	  PromiseConstructor = function Promise(executor) {
	    anInstance(this, PromiseConstructor, PROMISE);
	    aFunction$1(executor);
	    Internal.call(this);
	    var state = getInternalState$1(this);
	    try {
	      executor(bind(internalResolve, this, state), bind(internalReject, this, state));
	    } catch (error) {
	      internalReject(this, state, error);
	    }
	  };
	  // eslint-disable-next-line no-unused-vars
	  Internal = function Promise(executor) {
	    setInternalState$1(this, {
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
	  Internal.prototype = redefineAll(PromiseConstructor.prototype, {
	    // `Promise.prototype.then` method
	    // https://tc39.github.io/ecma262/#sec-promise.prototype.then
	    then: function then(onFulfilled, onRejected) {
	      var state = getInternalPromiseState(this);
	      var reaction = newPromiseCapability$1(speciesConstructor(this, PromiseConstructor));
	      reaction.ok = typeof onFulfilled == 'function' ? onFulfilled : true;
	      reaction.fail = typeof onRejected == 'function' && onRejected;
	      reaction.domain = IS_NODE$1 ? process$2.domain : undefined;
	      state.parent = true;
	      state.reactions.push(reaction);
	      if (state.state != PENDING) notify$1(this, state, false);
	      return reaction.promise;
	    },
	    // `Promise.prototype.catch` method
	    // https://tc39.github.io/ecma262/#sec-promise.prototype.catch
	    'catch': function (onRejected) {
	      return this.then(undefined, onRejected);
	    }
	  });
	  OwnPromiseCapability = function () {
	    var promise = new Internal();
	    var state = getInternalState$1(promise);
	    this.promise = promise;
	    this.resolve = bind(internalResolve, promise, state);
	    this.reject = bind(internalReject, promise, state);
	  };
	  newPromiseCapability.f = newPromiseCapability$1 = function (C) {
	    return C === PromiseConstructor || C === PromiseWrapper
	      ? new OwnPromiseCapability(C)
	      : newGenericPromiseCapability(C);
	  };

	  if ( typeof nativePromiseConstructor == 'function') {
	    nativeThen = nativePromiseConstructor.prototype.then;

	    // wrap native Promise#then for native async functions
	    redefine(nativePromiseConstructor.prototype, 'then', function then(onFulfilled, onRejected) {
	      var that = this;
	      return new PromiseConstructor(function (resolve, reject) {
	        nativeThen.call(that, resolve, reject);
	      }).then(onFulfilled, onRejected);
	    });

	    // wrap fetch result
	    if (typeof $fetch == 'function') _export({ global: true, enumerable: true, forced: true }, {
	      // eslint-disable-next-line no-unused-vars
	      fetch: function fetch(input) {
	        return promiseResolve(PromiseConstructor, $fetch.apply(global_1, arguments));
	      }
	    });
	  }
	}

	_export({ global: true, wrap: true, forced: FORCED$1 }, {
	  Promise: PromiseConstructor
	});

	setToStringTag(PromiseConstructor, PROMISE, false);
	setSpecies(PROMISE);

	PromiseWrapper = path[PROMISE];

	// statics
	_export({ target: PROMISE, stat: true, forced: FORCED$1 }, {
	  // `Promise.reject` method
	  // https://tc39.github.io/ecma262/#sec-promise.reject
	  reject: function reject(r) {
	    var capability = newPromiseCapability$1(this);
	    capability.reject.call(undefined, r);
	    return capability.promise;
	  }
	});

	_export({ target: PROMISE, stat: true, forced:  FORCED$1 }, {
	  // `Promise.resolve` method
	  // https://tc39.github.io/ecma262/#sec-promise.resolve
	  resolve: function resolve(x) {
	    return promiseResolve( this, x);
	  }
	});

	_export({ target: PROMISE, stat: true, forced: INCORRECT_ITERATION }, {
	  // `Promise.all` method
	  // https://tc39.github.io/ecma262/#sec-promise.all
	  all: function all(iterable) {
	    var C = this;
	    var capability = newPromiseCapability$1(C);
	    var resolve = capability.resolve;
	    var reject = capability.reject;
	    var result = perform(function () {
	      var $promiseResolve = aFunction$1(C.resolve);
	      var values = [];
	      var counter = 0;
	      var remaining = 1;
	      iterate_1(iterable, function (promise) {
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
	  // https://tc39.github.io/ecma262/#sec-promise.race
	  race: function race(iterable) {
	    var C = this;
	    var capability = newPromiseCapability$1(C);
	    var reject = capability.reject;
	    var result = perform(function () {
	      var $promiseResolve = aFunction$1(C.resolve);
	      iterate_1(iterable, function (promise) {
	        $promiseResolve.call(C, promise).then(capability.resolve, reject);
	      });
	    });
	    if (result.error) reject(result.value);
	    return capability.promise;
	  }
	});

	// `Promise.prototype.finally` method
	// https://tc39.github.io/ecma262/#sec-promise.prototype.finally
	_export({ target: 'Promise', proto: true, real: true }, {
	  'finally': function (onFinally) {
	    var C = speciesConstructor(this, getBuiltIn('Promise'));
	    var isFunction = typeof onFinally == 'function';
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

	// patch native Promise.prototype for native async functions
	if ( typeof nativePromiseConstructor == 'function' && !nativePromiseConstructor.prototype['finally']) {
	  redefine(nativePromiseConstructor.prototype, 'finally', getBuiltIn('Promise').prototype['finally']);
	}

	// `RegExp.prototype.flags` getter implementation
	// https://tc39.github.io/ecma262/#sec-get-regexp.prototype.flags
	var regexpFlags = function () {
	  var that = anObject(this);
	  var result = '';
	  if (that.global) result += 'g';
	  if (that.ignoreCase) result += 'i';
	  if (that.multiline) result += 'm';
	  if (that.dotAll) result += 's';
	  if (that.unicode) result += 'u';
	  if (that.sticky) result += 'y';
	  return result;
	};

	var nativeExec = RegExp.prototype.exec;
	// This always refers to the native implementation, because the
	// String#replace polyfill uses ./fix-regexp-well-known-symbol-logic.js,
	// which loads this file before patching the method.
	var nativeReplace = String.prototype.replace;

	var patchedExec = nativeExec;

	var UPDATES_LAST_INDEX_WRONG = (function () {
	  var re1 = /a/;
	  var re2 = /b*/g;
	  nativeExec.call(re1, 'a');
	  nativeExec.call(re2, 'a');
	  return re1.lastIndex !== 0 || re2.lastIndex !== 0;
	})();

	// nonparticipating capturing group, copied from es5-shim's String#split patch.
	var NPCG_INCLUDED = /()??/.exec('')[1] !== undefined;

	var PATCH = UPDATES_LAST_INDEX_WRONG || NPCG_INCLUDED;

	if (PATCH) {
	  patchedExec = function exec(str) {
	    var re = this;
	    var lastIndex, reCopy, match, i;

	    if (NPCG_INCLUDED) {
	      reCopy = new RegExp('^' + re.source + '$(?!\\s)', regexpFlags.call(re));
	    }
	    if (UPDATES_LAST_INDEX_WRONG) lastIndex = re.lastIndex;

	    match = nativeExec.call(re, str);

	    if (UPDATES_LAST_INDEX_WRONG && match) {
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

	    return match;
	  };
	}

	var regexpExec = patchedExec;

	_export({ target: 'RegExp', proto: true, forced: /./.exec !== regexpExec }, {
	  exec: regexpExec
	});

	// `String.prototype.{ codePointAt, at }` methods implementation
	var createMethod$2 = function (CONVERT_TO_STRING) {
	  return function ($this, pos) {
	    var S = String(requireObjectCoercible($this));
	    var position = toInteger(pos);
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
	  // https://tc39.github.io/ecma262/#sec-string.prototype.codepointat
	  codeAt: createMethod$2(false),
	  // `String.prototype.at` method
	  // https://github.com/mathiasbynens/String.prototype.at
	  charAt: createMethod$2(true)
	};

	var charAt = stringMultibyte.charAt;



	var STRING_ITERATOR = 'String Iterator';
	var setInternalState$2 = internalState.set;
	var getInternalState$2 = internalState.getterFor(STRING_ITERATOR);

	// `String.prototype[@@iterator]` method
	// https://tc39.github.io/ecma262/#sec-string.prototype-@@iterator
	defineIterator(String, 'String', function (iterated) {
	  setInternalState$2(this, {
	    type: STRING_ITERATOR,
	    string: String(iterated),
	    index: 0
	  });
	// `%StringIteratorPrototype%.next` method
	// https://tc39.github.io/ecma262/#sec-%stringiteratorprototype%.next
	}, function next() {
	  var state = getInternalState$2(this);
	  var string = state.string;
	  var index = state.index;
	  var point;
	  if (index >= string.length) return { value: undefined, done: true };
	  point = charAt(string, index);
	  state.index += point.length;
	  return { value: point, done: false };
	});

	var SPECIES$5 = wellKnownSymbol('species');

	var REPLACE_SUPPORTS_NAMED_GROUPS = !fails(function () {
	  // #replace needs built-in support for named groups.
	  // #match works fine because it just return the exec results, even if it has
	  // a "grops" property.
	  var re = /./;
	  re.exec = function () {
	    var result = [];
	    result.groups = { a: '7' };
	    return result;
	  };
	  return ''.replace(re, '$<a>') !== '7';
	});

	// Chrome 51 has a buggy "split" implementation when RegExp#exec !== nativeExec
	// Weex JS has frozen built-in prototypes, so use try / catch wrapper
	var SPLIT_WORKS_WITH_OVERWRITTEN_EXEC = !fails(function () {
	  var re = /(?:)/;
	  var originalExec = re.exec;
	  re.exec = function () { return originalExec.apply(this, arguments); };
	  var result = 'ab'.split(re);
	  return result.length !== 2 || result[0] !== 'a' || result[1] !== 'b';
	});

	var fixRegexpWellKnownSymbolLogic = function (KEY, length, exec, sham) {
	  var SYMBOL = wellKnownSymbol(KEY);

	  var DELEGATES_TO_SYMBOL = !fails(function () {
	    // String methods call symbol-named RegEp methods
	    var O = {};
	    O[SYMBOL] = function () { return 7; };
	    return ''[KEY](O) != 7;
	  });

	  var DELEGATES_TO_EXEC = DELEGATES_TO_SYMBOL && !fails(function () {
	    // Symbol-named RegExp methods call .exec
	    var execCalled = false;
	    var re = /a/;
	    re.exec = function () { execCalled = true; return null; };

	    if (KEY === 'split') {
	      // RegExp[@@split] doesn't call the regex's exec method, but first creates
	      // a new one. We need to return the patched regex when creating the new one.
	      re.constructor = {};
	      re.constructor[SPECIES$5] = function () { return re; };
	    }

	    re[SYMBOL]('');
	    return !execCalled;
	  });

	  if (
	    !DELEGATES_TO_SYMBOL ||
	    !DELEGATES_TO_EXEC ||
	    (KEY === 'replace' && !REPLACE_SUPPORTS_NAMED_GROUPS) ||
	    (KEY === 'split' && !SPLIT_WORKS_WITH_OVERWRITTEN_EXEC)
	  ) {
	    var nativeRegExpMethod = /./[SYMBOL];
	    var methods = exec(SYMBOL, ''[KEY], function (nativeMethod, regexp, str, arg2, forceStringMethod) {
	      if (regexp.exec === regexpExec) {
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
	    var stringMethod = methods[0];
	    var regexMethod = methods[1];

	    redefine(String.prototype, KEY, stringMethod);
	    redefine(RegExp.prototype, SYMBOL, length == 2
	      // 21.2.5.8 RegExp.prototype[@@replace](string, replaceValue)
	      // 21.2.5.11 RegExp.prototype[@@split](string, limit)
	      ? function (string, arg) { return regexMethod.call(string, this, arg); }
	      // 21.2.5.6 RegExp.prototype[@@match](string)
	      // 21.2.5.9 RegExp.prototype[@@search](string)
	      : function (string) { return regexMethod.call(string, this); }
	    );
	    if (sham) hide(RegExp.prototype[SYMBOL], 'sham', true);
	  }
	};

	var charAt$1 = stringMultibyte.charAt;

	// `AdvanceStringIndex` abstract operation
	// https://tc39.github.io/ecma262/#sec-advancestringindex
	var advanceStringIndex = function (S, index, unicode) {
	  return index + (unicode ? charAt$1(S, index).length : 1);
	};

	// `RegExpExec` abstract operation
	// https://tc39.github.io/ecma262/#sec-regexpexec
	var regexpExecAbstract = function (R, S) {
	  var exec = R.exec;
	  if (typeof exec === 'function') {
	    var result = exec.call(R, S);
	    if (typeof result !== 'object') {
	      throw TypeError('RegExp exec method returned something other than an Object or null');
	    }
	    return result;
	  }

	  if (classofRaw(R) !== 'RegExp') {
	    throw TypeError('RegExp#exec called on incompatible receiver');
	  }

	  return regexpExec.call(R, S);
	};

	// @@match logic
	fixRegexpWellKnownSymbolLogic('match', 1, function (MATCH, nativeMatch, maybeCallNative) {
	  return [
	    // `String.prototype.match` method
	    // https://tc39.github.io/ecma262/#sec-string.prototype.match
	    function match(regexp) {
	      var O = requireObjectCoercible(this);
	      var matcher = regexp == undefined ? undefined : regexp[MATCH];
	      return matcher !== undefined ? matcher.call(regexp, O) : new RegExp(regexp)[MATCH](String(O));
	    },
	    // `RegExp.prototype[@@match]` method
	    // https://tc39.github.io/ecma262/#sec-regexp.prototype-@@match
	    function (regexp) {
	      var res = maybeCallNative(nativeMatch, regexp, this);
	      if (res.done) return res.value;

	      var rx = anObject(regexp);
	      var S = String(this);

	      if (!rx.global) return regexpExecAbstract(rx, S);

	      var fullUnicode = rx.unicode;
	      rx.lastIndex = 0;
	      var A = [];
	      var n = 0;
	      var result;
	      while ((result = regexpExecAbstract(rx, S)) !== null) {
	        var matchStr = String(result[0]);
	        A[n] = matchStr;
	        if (matchStr === '') rx.lastIndex = advanceStringIndex(S, toLength(rx.lastIndex), fullUnicode);
	        n++;
	      }
	      return n === 0 ? null : A;
	    }
	  ];
	});

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

	var ITERATOR$5 = wellKnownSymbol('iterator');
	var TO_STRING_TAG$3 = wellKnownSymbol('toStringTag');
	var ArrayValues = es_array_iterator.values;

	for (var COLLECTION_NAME in domIterables) {
	  var Collection = global_1[COLLECTION_NAME];
	  var CollectionPrototype = Collection && Collection.prototype;
	  if (CollectionPrototype) {
	    // some Chrome versions have non-configurable methods on DOMTokenList
	    if (CollectionPrototype[ITERATOR$5] !== ArrayValues) try {
	      hide(CollectionPrototype, ITERATOR$5, ArrayValues);
	    } catch (error) {
	      CollectionPrototype[ITERATOR$5] = ArrayValues;
	    }
	    if (!CollectionPrototype[TO_STRING_TAG$3]) hide(CollectionPrototype, TO_STRING_TAG$3, COLLECTION_NAME);
	    if (domIterables[COLLECTION_NAME]) for (var METHOD_NAME in es_array_iterator) {
	      // some Chrome versions have non-configurable methods on DOMTokenList
	      if (CollectionPrototype[METHOD_NAME] !== es_array_iterator[METHOD_NAME]) try {
	        hide(CollectionPrototype, METHOD_NAME, es_array_iterator[METHOD_NAME]);
	      } catch (error) {
	        CollectionPrototype[METHOD_NAME] = es_array_iterator[METHOD_NAME];
	      }
	    }
	  }
	}

	var localforage = createCommonjsModule(function (module, exports) {
	/*!
	    localForage -- Offline Storage, Improved
	    Version 1.7.3
	    https://localforage.github.io/localForage
	    (c) 2013-2017 Mozilla, Apache License 2.0
	*/
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
	        if (!idb) {
	            return false;
	        }
	        // We mimic PouchDB here;
	        //
	        // We test for openDatabase because IE Mobile identifies itself
	        // as Safari. Oh the lulz...
	        var isSafari = typeof openDatabase !== 'undefined' && /(Safari|iPhone|iPad|iPod)/.test(navigator.userAgent) && !/Chrome/.test(navigator.userAgent) && !/BlackBerry/.test(navigator.platform);

	        var hasFetch = typeof fetch === 'function' && fetch.toString().indexOf('[native code') !== -1;

	        // Safari <10.1 does not meet our requirements for IDB support (#5572)
	        // since Safari 10.1 shipped with fetch, we can use that to detect it
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
	            resolve(openreq.result);
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

	                            // when the iterator callback retuns any
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
	                    var req = store.openCursor();

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
	                    var req = store.openCursor();
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

	                    req.onerror = req.onblocked = function (err) {
	                        var db = req.result;
	                        if (db) {
	                            db.close();
	                        }
	                        reject(err);
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
	});

	var nativeGetOwnPropertyNames = objectGetOwnPropertyNames.f;

	var toString$1 = {}.toString;

	var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames
	  ? Object.getOwnPropertyNames(window) : [];

	var getWindowNames = function (it) {
	  try {
	    return nativeGetOwnPropertyNames(it);
	  } catch (error) {
	    return windowNames.slice();
	  }
	};

	// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
	var f$6 = function getOwnPropertyNames(it) {
	  return windowNames && toString$1.call(it) == '[object Window]'
	    ? getWindowNames(it)
	    : nativeGetOwnPropertyNames(toIndexedObject(it));
	};

	var objectGetOwnPropertyNamesExternal = {
		f: f$6
	};

	var f$7 = wellKnownSymbol;

	var wrappedWellKnownSymbol = {
		f: f$7
	};

	var defineProperty$1 = objectDefineProperty.f;

	var defineWellKnownSymbol = function (NAME) {
	  var Symbol = path.Symbol || (path.Symbol = {});
	  if (!has(Symbol, NAME)) defineProperty$1(Symbol, NAME, {
	    value: wrappedWellKnownSymbol.f(NAME)
	  });
	};

	var $forEach = arrayIteration.forEach;

	var HIDDEN = sharedKey('hidden');
	var SYMBOL = 'Symbol';
	var PROTOTYPE$1 = 'prototype';
	var TO_PRIMITIVE = wellKnownSymbol('toPrimitive');
	var setInternalState$3 = internalState.set;
	var getInternalState$3 = internalState.getterFor(SYMBOL);
	var ObjectPrototype$2 = Object[PROTOTYPE$1];
	var $Symbol = global_1.Symbol;
	var JSON$1 = global_1.JSON;
	var nativeJSONStringify = JSON$1 && JSON$1.stringify;
	var nativeGetOwnPropertyDescriptor$1 = objectGetOwnPropertyDescriptor.f;
	var nativeDefineProperty$1 = objectDefineProperty.f;
	var nativeGetOwnPropertyNames$1 = objectGetOwnPropertyNamesExternal.f;
	var nativePropertyIsEnumerable$1 = objectPropertyIsEnumerable.f;
	var AllSymbols = shared('symbols');
	var ObjectPrototypeSymbols = shared('op-symbols');
	var StringToSymbolRegistry = shared('string-to-symbol-registry');
	var SymbolToStringRegistry = shared('symbol-to-string-registry');
	var WellKnownSymbolsStore = shared('wks');
	var QObject = global_1.QObject;
	// Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173
	var USE_SETTER = !QObject || !QObject[PROTOTYPE$1] || !QObject[PROTOTYPE$1].findChild;

	// fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
	var setSymbolDescriptor = descriptors && fails(function () {
	  return objectCreate(nativeDefineProperty$1({}, 'a', {
	    get: function () { return nativeDefineProperty$1(this, 'a', { value: 7 }).a; }
	  })).a != 7;
	}) ? function (O, P, Attributes) {
	  var ObjectPrototypeDescriptor = nativeGetOwnPropertyDescriptor$1(ObjectPrototype$2, P);
	  if (ObjectPrototypeDescriptor) delete ObjectPrototype$2[P];
	  nativeDefineProperty$1(O, P, Attributes);
	  if (ObjectPrototypeDescriptor && O !== ObjectPrototype$2) {
	    nativeDefineProperty$1(ObjectPrototype$2, P, ObjectPrototypeDescriptor);
	  }
	} : nativeDefineProperty$1;

	var wrap = function (tag, description) {
	  var symbol = AllSymbols[tag] = objectCreate($Symbol[PROTOTYPE$1]);
	  setInternalState$3(symbol, {
	    type: SYMBOL,
	    tag: tag,
	    description: description
	  });
	  if (!descriptors) symbol.description = description;
	  return symbol;
	};

	var isSymbol = nativeSymbol && typeof $Symbol.iterator == 'symbol' ? function (it) {
	  return typeof it == 'symbol';
	} : function (it) {
	  return Object(it) instanceof $Symbol;
	};

	var $defineProperty = function defineProperty(O, P, Attributes) {
	  if (O === ObjectPrototype$2) $defineProperty(ObjectPrototypeSymbols, P, Attributes);
	  anObject(O);
	  var key = toPrimitive(P, true);
	  anObject(Attributes);
	  if (has(AllSymbols, key)) {
	    if (!Attributes.enumerable) {
	      if (!has(O, HIDDEN)) nativeDefineProperty$1(O, HIDDEN, createPropertyDescriptor(1, {}));
	      O[HIDDEN][key] = true;
	    } else {
	      if (has(O, HIDDEN) && O[HIDDEN][key]) O[HIDDEN][key] = false;
	      Attributes = objectCreate(Attributes, { enumerable: createPropertyDescriptor(0, false) });
	    } return setSymbolDescriptor(O, key, Attributes);
	  } return nativeDefineProperty$1(O, key, Attributes);
	};

	var $defineProperties = function defineProperties(O, Properties) {
	  anObject(O);
	  var properties = toIndexedObject(Properties);
	  var keys = objectKeys(properties).concat($getOwnPropertySymbols(properties));
	  $forEach(keys, function (key) {
	    if (!descriptors || $propertyIsEnumerable.call(properties, key)) $defineProperty(O, key, properties[key]);
	  });
	  return O;
	};

	var $create = function create(O, Properties) {
	  return Properties === undefined ? objectCreate(O) : $defineProperties(objectCreate(O), Properties);
	};

	var $propertyIsEnumerable = function propertyIsEnumerable(V) {
	  var P = toPrimitive(V, true);
	  var enumerable = nativePropertyIsEnumerable$1.call(this, P);
	  if (this === ObjectPrototype$2 && has(AllSymbols, P) && !has(ObjectPrototypeSymbols, P)) return false;
	  return enumerable || !has(this, P) || !has(AllSymbols, P) || has(this, HIDDEN) && this[HIDDEN][P] ? enumerable : true;
	};

	var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(O, P) {
	  var it = toIndexedObject(O);
	  var key = toPrimitive(P, true);
	  if (it === ObjectPrototype$2 && has(AllSymbols, key) && !has(ObjectPrototypeSymbols, key)) return;
	  var descriptor = nativeGetOwnPropertyDescriptor$1(it, key);
	  if (descriptor && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key])) {
	    descriptor.enumerable = true;
	  }
	  return descriptor;
	};

	var $getOwnPropertyNames = function getOwnPropertyNames(O) {
	  var names = nativeGetOwnPropertyNames$1(toIndexedObject(O));
	  var result = [];
	  $forEach(names, function (key) {
	    if (!has(AllSymbols, key) && !has(hiddenKeys, key)) result.push(key);
	  });
	  return result;
	};

	var $getOwnPropertySymbols = function getOwnPropertySymbols(O) {
	  var IS_OBJECT_PROTOTYPE = O === ObjectPrototype$2;
	  var names = nativeGetOwnPropertyNames$1(IS_OBJECT_PROTOTYPE ? ObjectPrototypeSymbols : toIndexedObject(O));
	  var result = [];
	  $forEach(names, function (key) {
	    if (has(AllSymbols, key) && (!IS_OBJECT_PROTOTYPE || has(ObjectPrototype$2, key))) {
	      result.push(AllSymbols[key]);
	    }
	  });
	  return result;
	};

	// `Symbol` constructor
	// https://tc39.github.io/ecma262/#sec-symbol-constructor
	if (!nativeSymbol) {
	  $Symbol = function Symbol() {
	    if (this instanceof $Symbol) throw TypeError('Symbol is not a constructor');
	    var description = !arguments.length || arguments[0] === undefined ? undefined : String(arguments[0]);
	    var tag = uid(description);
	    var setter = function (value) {
	      if (this === ObjectPrototype$2) setter.call(ObjectPrototypeSymbols, value);
	      if (has(this, HIDDEN) && has(this[HIDDEN], tag)) this[HIDDEN][tag] = false;
	      setSymbolDescriptor(this, tag, createPropertyDescriptor(1, value));
	    };
	    if (descriptors && USE_SETTER) setSymbolDescriptor(ObjectPrototype$2, tag, { configurable: true, set: setter });
	    return wrap(tag, description);
	  };

	  redefine($Symbol[PROTOTYPE$1], 'toString', function toString() {
	    return getInternalState$3(this).tag;
	  });

	  objectPropertyIsEnumerable.f = $propertyIsEnumerable;
	  objectDefineProperty.f = $defineProperty;
	  objectGetOwnPropertyDescriptor.f = $getOwnPropertyDescriptor;
	  objectGetOwnPropertyNames.f = objectGetOwnPropertyNamesExternal.f = $getOwnPropertyNames;
	  objectGetOwnPropertySymbols.f = $getOwnPropertySymbols;

	  if (descriptors) {
	    // https://github.com/tc39/proposal-Symbol-description
	    nativeDefineProperty$1($Symbol[PROTOTYPE$1], 'description', {
	      configurable: true,
	      get: function description() {
	        return getInternalState$3(this).description;
	      }
	    });
	    {
	      redefine(ObjectPrototype$2, 'propertyIsEnumerable', $propertyIsEnumerable, { unsafe: true });
	    }
	  }

	  wrappedWellKnownSymbol.f = function (name) {
	    return wrap(wellKnownSymbol(name), name);
	  };
	}

	_export({ global: true, wrap: true, forced: !nativeSymbol, sham: !nativeSymbol }, {
	  Symbol: $Symbol
	});

	$forEach(objectKeys(WellKnownSymbolsStore), function (name) {
	  defineWellKnownSymbol(name);
	});

	_export({ target: SYMBOL, stat: true, forced: !nativeSymbol }, {
	  // `Symbol.for` method
	  // https://tc39.github.io/ecma262/#sec-symbol.for
	  'for': function (key) {
	    var string = String(key);
	    if (has(StringToSymbolRegistry, string)) return StringToSymbolRegistry[string];
	    var symbol = $Symbol(string);
	    StringToSymbolRegistry[string] = symbol;
	    SymbolToStringRegistry[symbol] = string;
	    return symbol;
	  },
	  // `Symbol.keyFor` method
	  // https://tc39.github.io/ecma262/#sec-symbol.keyfor
	  keyFor: function keyFor(sym) {
	    if (!isSymbol(sym)) throw TypeError(sym + ' is not a symbol');
	    if (has(SymbolToStringRegistry, sym)) return SymbolToStringRegistry[sym];
	  },
	  useSetter: function () { USE_SETTER = true; },
	  useSimple: function () { USE_SETTER = false; }
	});

	_export({ target: 'Object', stat: true, forced: !nativeSymbol, sham: !descriptors }, {
	  // `Object.create` method
	  // https://tc39.github.io/ecma262/#sec-object.create
	  create: $create,
	  // `Object.defineProperty` method
	  // https://tc39.github.io/ecma262/#sec-object.defineproperty
	  defineProperty: $defineProperty,
	  // `Object.defineProperties` method
	  // https://tc39.github.io/ecma262/#sec-object.defineproperties
	  defineProperties: $defineProperties,
	  // `Object.getOwnPropertyDescriptor` method
	  // https://tc39.github.io/ecma262/#sec-object.getownpropertydescriptors
	  getOwnPropertyDescriptor: $getOwnPropertyDescriptor
	});

	_export({ target: 'Object', stat: true, forced: !nativeSymbol }, {
	  // `Object.getOwnPropertyNames` method
	  // https://tc39.github.io/ecma262/#sec-object.getownpropertynames
	  getOwnPropertyNames: $getOwnPropertyNames,
	  // `Object.getOwnPropertySymbols` method
	  // https://tc39.github.io/ecma262/#sec-object.getownpropertysymbols
	  getOwnPropertySymbols: $getOwnPropertySymbols
	});

	// Chrome 38 and 39 `Object.getOwnPropertySymbols` fails on primitives
	// https://bugs.chromium.org/p/v8/issues/detail?id=3443
	_export({ target: 'Object', stat: true, forced: fails(function () { objectGetOwnPropertySymbols.f(1); }) }, {
	  getOwnPropertySymbols: function getOwnPropertySymbols(it) {
	    return objectGetOwnPropertySymbols.f(toObject(it));
	  }
	});

	// `JSON.stringify` method behavior with symbols
	// https://tc39.github.io/ecma262/#sec-json.stringify
	JSON$1 && _export({ target: 'JSON', stat: true, forced: !nativeSymbol || fails(function () {
	  var symbol = $Symbol();
	  // MS Edge converts symbol values to JSON as {}
	  return nativeJSONStringify([symbol]) != '[null]'
	    // WebKit converts symbol values to JSON as null
	    || nativeJSONStringify({ a: symbol }) != '{}'
	    // V8 throws on boxed symbols
	    || nativeJSONStringify(Object(symbol)) != '{}';
	}) }, {
	  stringify: function stringify(it) {
	    var args = [it];
	    var index = 1;
	    var replacer, $replacer;
	    while (arguments.length > index) args.push(arguments[index++]);
	    $replacer = replacer = args[1];
	    if (!isObject(replacer) && it === undefined || isSymbol(it)) return; // IE8 returns string on undefined
	    if (!isArray(replacer)) replacer = function (key, value) {
	      if (typeof $replacer == 'function') value = $replacer.call(this, key, value);
	      if (!isSymbol(value)) return value;
	    };
	    args[1] = replacer;
	    return nativeJSONStringify.apply(JSON$1, args);
	  }
	});

	// `Symbol.prototype[@@toPrimitive]` method
	// https://tc39.github.io/ecma262/#sec-symbol.prototype-@@toprimitive
	if (!$Symbol[PROTOTYPE$1][TO_PRIMITIVE]) hide($Symbol[PROTOTYPE$1], TO_PRIMITIVE, $Symbol[PROTOTYPE$1].valueOf);
	// `Symbol.prototype[@@toStringTag]` property
	// https://tc39.github.io/ecma262/#sec-symbol.prototype-@@tostringtag
	setToStringTag($Symbol, SYMBOL);

	hiddenKeys[HIDDEN] = true;

	var defineProperty$2 = objectDefineProperty.f;


	var NativeSymbol = global_1.Symbol;

	if (descriptors && typeof NativeSymbol == 'function' && (!('description' in NativeSymbol.prototype) ||
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
	  copyConstructorProperties(SymbolWrapper, NativeSymbol);
	  var symbolPrototype = SymbolWrapper.prototype = NativeSymbol.prototype;
	  symbolPrototype.constructor = SymbolWrapper;

	  var symbolToString = symbolPrototype.toString;
	  var native = String(NativeSymbol('test')) == 'Symbol(test)';
	  var regexp = /^Symbol\((.*)\)[^)]+$/;
	  defineProperty$2(symbolPrototype, 'description', {
	    configurable: true,
	    get: function description() {
	      var symbol = isObject(this) ? this.valueOf() : this;
	      var string = symbolToString.call(symbol);
	      if (has(EmptyStringDescriptionStore, symbol)) return '';
	      var desc = native ? string.slice(7, -1) : string.replace(regexp, '$1');
	      return desc === '' ? undefined : desc;
	    }
	  });

	  _export({ global: true, forced: true }, {
	    Symbol: SymbolWrapper
	  });
	}

	// `Symbol.iterator` well-known symbol
	// https://tc39.github.io/ecma262/#sec-symbol.iterator
	defineWellKnownSymbol('iterator');

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

	function _assertThisInitialized(self) {
	  if (self === void 0) {
	    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
	  }

	  return self;
	}

	function _possibleConstructorReturn(self, call) {
	  if (call && (typeof call === "object" || typeof call === "function")) {
	    return call;
	  }

	  return _assertThisInitialized(self);
	}

	function _superPropBase(object, property) {
	  while (!Object.prototype.hasOwnProperty.call(object, property)) {
	    object = _getPrototypeOf(object);
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

	function _classPrivateFieldGet(receiver, privateMap) {
	  var descriptor = privateMap.get(receiver);

	  if (!descriptor) {
	    throw new TypeError("attempted to get private field on non-instance");
	  }

	  if (descriptor.get) {
	    return descriptor.get.call(receiver);
	  }

	  return descriptor.value;
	}

	function _classPrivateFieldSet(receiver, privateMap, value) {
	  var descriptor = privateMap.get(receiver);

	  if (!descriptor) {
	    throw new TypeError("attempted to set private field on non-instance");
	  }

	  if (descriptor.set) {
	    descriptor.set.call(receiver, value);
	  } else {
	    if (!descriptor.writable) {
	      throw new TypeError("attempted to set read only private field");
	    }

	    descriptor.value = value;
	  }

	  return value;
	}

	var DatePrototype = Date.prototype;
	var INVALID_DATE = 'Invalid Date';
	var TO_STRING = 'toString';
	var nativeDateToString = DatePrototype[TO_STRING];
	var getTime = DatePrototype.getTime;

	// `Date.prototype.toString` method
	// https://tc39.github.io/ecma262/#sec-date.prototype.tostring
	if (new Date(NaN) + '' != INVALID_DATE) {
	  redefine(DatePrototype, TO_STRING, function toString() {
	    var value = getTime.call(this);
	    // eslint-disable-next-line no-self-compare
	    return value === value ? nativeDateToString.call(this) : INVALID_DATE;
	  });
	}

	var TO_STRING$1 = 'toString';
	var RegExpPrototype = RegExp.prototype;
	var nativeToString = RegExpPrototype[TO_STRING$1];

	var NOT_GENERIC = fails(function () { return nativeToString.call({ source: 'a', flags: 'b' }) != '/a/b'; });
	// FF44- RegExp#toString has a wrong name
	var INCORRECT_NAME = nativeToString.name != TO_STRING$1;

	// `RegExp.prototype.toString` method
	// https://tc39.github.io/ecma262/#sec-regexp.prototype.tostring
	if (NOT_GENERIC || INCORRECT_NAME) {
	  redefine(RegExp.prototype, TO_STRING$1, function toString() {
	    var R = anObject(this);
	    var p = String(R.source);
	    var rf = R.flags;
	    var f = String(rf === undefined && R instanceof RegExp && !('flags' in RegExpPrototype) ? regexpFlags.call(R) : rf);
	    return '/' + p + '/' + f;
	  }, { unsafe: true });
	}

	var max$1 = Math.max;
	var min$2 = Math.min;
	var floor$1 = Math.floor;
	var SUBSTITUTION_SYMBOLS = /\$([$&'`]|\d\d?|<[^>]*>)/g;
	var SUBSTITUTION_SYMBOLS_NO_NAMED = /\$([$&'`]|\d\d?)/g;

	var maybeToString = function (it) {
	  return it === undefined ? it : String(it);
	};

	// @@replace logic
	fixRegexpWellKnownSymbolLogic('replace', 2, function (REPLACE, nativeReplace, maybeCallNative) {
	  return [
	    // `String.prototype.replace` method
	    // https://tc39.github.io/ecma262/#sec-string.prototype.replace
	    function replace(searchValue, replaceValue) {
	      var O = requireObjectCoercible(this);
	      var replacer = searchValue == undefined ? undefined : searchValue[REPLACE];
	      return replacer !== undefined
	        ? replacer.call(searchValue, O, replaceValue)
	        : nativeReplace.call(String(O), searchValue, replaceValue);
	    },
	    // `RegExp.prototype[@@replace]` method
	    // https://tc39.github.io/ecma262/#sec-regexp.prototype-@@replace
	    function (regexp, replaceValue) {
	      var res = maybeCallNative(nativeReplace, regexp, this, replaceValue);
	      if (res.done) return res.value;

	      var rx = anObject(regexp);
	      var S = String(this);

	      var functionalReplace = typeof replaceValue === 'function';
	      if (!functionalReplace) replaceValue = String(replaceValue);

	      var global = rx.global;
	      if (global) {
	        var fullUnicode = rx.unicode;
	        rx.lastIndex = 0;
	      }
	      var results = [];
	      while (true) {
	        var result = regexpExecAbstract(rx, S);
	        if (result === null) break;

	        results.push(result);
	        if (!global) break;

	        var matchStr = String(result[0]);
	        if (matchStr === '') rx.lastIndex = advanceStringIndex(S, toLength(rx.lastIndex), fullUnicode);
	      }

	      var accumulatedResult = '';
	      var nextSourcePosition = 0;
	      for (var i = 0; i < results.length; i++) {
	        result = results[i];

	        var matched = String(result[0]);
	        var position = max$1(min$2(toInteger(result.index), S.length), 0);
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
	          var replacement = String(replaceValue.apply(undefined, replacerArgs));
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

	  // https://tc39.github.io/ecma262/#sec-getsubstitution
	  function getSubstitution(matched, str, position, captures, namedCaptures, replacement) {
	    var tailPos = position + matched.length;
	    var m = captures.length;
	    var symbols = SUBSTITUTION_SYMBOLS_NO_NAMED;
	    if (namedCaptures !== undefined) {
	      namedCaptures = toObject(namedCaptures);
	      symbols = SUBSTITUTION_SYMBOLS;
	    }
	    return nativeReplace.call(replacement, symbols, function (match, ch) {
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
	  }
	});

	var freezing = !fails(function () {
	  return Object.isExtensible(Object.preventExtensions({}));
	});

	var internalMetadata = createCommonjsModule(function (module) {
	var defineProperty = objectDefineProperty.f;



	var METADATA = uid('meta');
	var id = 0;

	var isExtensible = Object.isExtensible || function () {
	  return true;
	};

	var setMetadata = function (it) {
	  defineProperty(it, METADATA, { value: {
	    objectID: 'O' + ++id, // object ID
	    weakData: {}          // weak collections IDs
	  } });
	};

	var fastKey = function (it, create) {
	  // return a primitive with prefix
	  if (!isObject(it)) return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
	  if (!has(it, METADATA)) {
	    // can't set metadata to uncaught frozen object
	    if (!isExtensible(it)) return 'F';
	    // not necessary to add metadata
	    if (!create) return 'E';
	    // add missing metadata
	    setMetadata(it);
	  // return object ID
	  } return it[METADATA].objectID;
	};

	var getWeakData = function (it, create) {
	  if (!has(it, METADATA)) {
	    // can't set metadata to uncaught frozen object
	    if (!isExtensible(it)) return true;
	    // not necessary to add metadata
	    if (!create) return false;
	    // add missing metadata
	    setMetadata(it);
	  // return the store of weak collections IDs
	  } return it[METADATA].weakData;
	};

	// add metadata on freeze-family methods calling
	var onFreeze = function (it) {
	  if (freezing && meta.REQUIRED && isExtensible(it) && !has(it, METADATA)) setMetadata(it);
	  return it;
	};

	var meta = module.exports = {
	  REQUIRED: false,
	  fastKey: fastKey,
	  getWeakData: getWeakData,
	  onFreeze: onFreeze
	};

	hiddenKeys[METADATA] = true;
	});
	var internalMetadata_1 = internalMetadata.REQUIRED;
	var internalMetadata_2 = internalMetadata.fastKey;
	var internalMetadata_3 = internalMetadata.getWeakData;
	var internalMetadata_4 = internalMetadata.onFreeze;

	// makes subclassing work correct for wrapped built-ins
	var inheritIfRequired = function ($this, dummy, Wrapper) {
	  var NewTarget, NewTargetPrototype;
	  if (
	    // it can work only with native `setPrototypeOf`
	    objectSetPrototypeOf &&
	    // we haven't completely correct pre-ES6 way for getting `new.target`, so use this
	    typeof (NewTarget = dummy.constructor) == 'function' &&
	    NewTarget !== Wrapper &&
	    isObject(NewTargetPrototype = NewTarget.prototype) &&
	    NewTargetPrototype !== Wrapper.prototype
	  ) objectSetPrototypeOf($this, NewTargetPrototype);
	  return $this;
	};

	var collection = function (CONSTRUCTOR_NAME, wrapper, common, IS_MAP, IS_WEAK) {
	  var NativeConstructor = global_1[CONSTRUCTOR_NAME];
	  var NativePrototype = NativeConstructor && NativeConstructor.prototype;
	  var Constructor = NativeConstructor;
	  var ADDER = IS_MAP ? 'set' : 'add';
	  var exported = {};

	  var fixMethod = function (KEY) {
	    var nativeMethod = NativePrototype[KEY];
	    redefine(NativePrototype, KEY,
	      KEY == 'add' ? function add(value) {
	        nativeMethod.call(this, value === 0 ? 0 : value);
	        return this;
	      } : KEY == 'delete' ? function (key) {
	        return IS_WEAK && !isObject(key) ? false : nativeMethod.call(this, key === 0 ? 0 : key);
	      } : KEY == 'get' ? function get(key) {
	        return IS_WEAK && !isObject(key) ? undefined : nativeMethod.call(this, key === 0 ? 0 : key);
	      } : KEY == 'has' ? function has(key) {
	        return IS_WEAK && !isObject(key) ? false : nativeMethod.call(this, key === 0 ? 0 : key);
	      } : function set(key, value) {
	        nativeMethod.call(this, key === 0 ? 0 : key, value);
	        return this;
	      }
	    );
	  };

	  // eslint-disable-next-line max-len
	  if (isForced_1(CONSTRUCTOR_NAME, typeof NativeConstructor != 'function' || !(IS_WEAK || NativePrototype.forEach && !fails(function () {
	    new NativeConstructor().entries().next();
	  })))) {
	    // create collection constructor
	    Constructor = common.getConstructor(wrapper, CONSTRUCTOR_NAME, IS_MAP, ADDER);
	    internalMetadata.REQUIRED = true;
	  } else if (isForced_1(CONSTRUCTOR_NAME, true)) {
	    var instance = new Constructor();
	    // early implementations not supports chaining
	    var HASNT_CHAINING = instance[ADDER](IS_WEAK ? {} : -0, 1) != instance;
	    // V8 ~ Chromium 40- weak-collections throws on primitives, but should return false
	    var THROWS_ON_PRIMITIVES = fails(function () { instance.has(1); });
	    // most early implementations doesn't supports iterables, most modern - not close it correctly
	    // eslint-disable-next-line no-new
	    var ACCEPT_ITERABLES = checkCorrectnessOfIteration(function (iterable) { new NativeConstructor(iterable); });
	    // for early implementations -0 and +0 not the same
	    var BUGGY_ZERO = !IS_WEAK && fails(function () {
	      // V8 ~ Chromium 42- fails only with 5+ elements
	      var $instance = new NativeConstructor();
	      var index = 5;
	      while (index--) $instance[ADDER](index, index);
	      return !$instance.has(-0);
	    });

	    if (!ACCEPT_ITERABLES) {
	      Constructor = wrapper(function (dummy, iterable) {
	        anInstance(dummy, Constructor, CONSTRUCTOR_NAME);
	        var that = inheritIfRequired(new NativeConstructor(), dummy, Constructor);
	        if (iterable != undefined) iterate_1(iterable, that[ADDER], that, IS_MAP);
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
	  _export({ global: true, forced: Constructor != NativeConstructor }, exported);

	  setToStringTag(Constructor, CONSTRUCTOR_NAME);

	  if (!IS_WEAK) common.setStrong(Constructor, CONSTRUCTOR_NAME, IS_MAP);

	  return Constructor;
	};

	var getWeakData = internalMetadata.getWeakData;








	var setInternalState$4 = internalState.set;
	var internalStateGetterFor = internalState.getterFor;
	var find = arrayIteration.find;
	var findIndex = arrayIteration.findIndex;
	var id$1 = 0;

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

	var collectionWeak = {
	  getConstructor: function (wrapper, CONSTRUCTOR_NAME, IS_MAP, ADDER) {
	    var C = wrapper(function (that, iterable) {
	      anInstance(that, C, CONSTRUCTOR_NAME);
	      setInternalState$4(that, {
	        type: CONSTRUCTOR_NAME,
	        id: id$1++,
	        frozen: undefined
	      });
	      if (iterable != undefined) iterate_1(iterable, that[ADDER], that, IS_MAP);
	    });

	    var getInternalState = internalStateGetterFor(CONSTRUCTOR_NAME);

	    var define = function (that, key, value) {
	      var state = getInternalState(that);
	      var data = getWeakData(anObject(key), true);
	      if (data === true) uncaughtFrozenStore(state).set(key, value);
	      else data[state.id] = value;
	      return that;
	    };

	    redefineAll(C.prototype, {
	      // 23.3.3.2 WeakMap.prototype.delete(key)
	      // 23.4.3.3 WeakSet.prototype.delete(value)
	      'delete': function (key) {
	        var state = getInternalState(this);
	        if (!isObject(key)) return false;
	        var data = getWeakData(key);
	        if (data === true) return uncaughtFrozenStore(state)['delete'](key);
	        return data && has(data, state.id) && delete data[state.id];
	      },
	      // 23.3.3.4 WeakMap.prototype.has(key)
	      // 23.4.3.4 WeakSet.prototype.has(value)
	      has: function has$1(key) {
	        var state = getInternalState(this);
	        if (!isObject(key)) return false;
	        var data = getWeakData(key);
	        if (data === true) return uncaughtFrozenStore(state).has(key);
	        return data && has(data, state.id);
	      }
	    });

	    redefineAll(C.prototype, IS_MAP ? {
	      // 23.3.3.3 WeakMap.prototype.get(key)
	      get: function get(key) {
	        var state = getInternalState(this);
	        if (isObject(key)) {
	          var data = getWeakData(key);
	          if (data === true) return uncaughtFrozenStore(state).get(key);
	          return data ? data[state.id] : undefined;
	        }
	      },
	      // 23.3.3.5 WeakMap.prototype.set(key, value)
	      set: function set(key, value) {
	        return define(this, key, value);
	      }
	    } : {
	      // 23.4.3.1 WeakSet.prototype.add(value)
	      add: function add(value) {
	        return define(this, value, true);
	      }
	    });

	    return C;
	  }
	};

	var es_weakMap = createCommonjsModule(function (module) {






	var enforceIternalState = internalState.enforce;


	var IS_IE11 = !global_1.ActiveXObject && 'ActiveXObject' in global_1;
	var isExtensible = Object.isExtensible;
	var InternalWeakMap;

	var wrapper = function (get) {
	  return function WeakMap() {
	    return get(this, arguments.length ? arguments[0] : undefined);
	  };
	};

	// `WeakMap` constructor
	// https://tc39.github.io/ecma262/#sec-weakmap-constructor
	var $WeakMap = module.exports = collection('WeakMap', wrapper, collectionWeak, true, true);

	// IE11 WeakMap frozen keys fix
	// We can't use feature detection because it crash some old IE builds
	// https://github.com/zloirock/core-js/issues/485
	if (nativeWeakMap && IS_IE11) {
	  InternalWeakMap = collectionWeak.getConstructor(wrapper, 'WeakMap', true);
	  internalMetadata.REQUIRED = true;
	  var WeakMapPrototype = $WeakMap.prototype;
	  var nativeDelete = WeakMapPrototype['delete'];
	  var nativeHas = WeakMapPrototype.has;
	  var nativeGet = WeakMapPrototype.get;
	  var nativeSet = WeakMapPrototype.set;
	  redefineAll(WeakMapPrototype, {
	    'delete': function (key) {
	      if (isObject(key) && !isExtensible(key)) {
	        var state = enforceIternalState(this);
	        if (!state.frozen) state.frozen = new InternalWeakMap();
	        return nativeDelete.call(this, key) || state.frozen['delete'](key);
	      } return nativeDelete.call(this, key);
	    },
	    has: function has(key) {
	      if (isObject(key) && !isExtensible(key)) {
	        var state = enforceIternalState(this);
	        if (!state.frozen) state.frozen = new InternalWeakMap();
	        return nativeHas.call(this, key) || state.frozen.has(key);
	      } return nativeHas.call(this, key);
	    },
	    get: function get(key) {
	      if (isObject(key) && !isExtensible(key)) {
	        var state = enforceIternalState(this);
	        if (!state.frozen) state.frozen = new InternalWeakMap();
	        return nativeHas.call(this, key) ? nativeGet.call(this, key) : state.frozen.get(key);
	      } return nativeGet.call(this, key);
	    },
	    set: function set(key, value) {
	      if (isObject(key) && !isExtensible(key)) {
	        var state = enforceIternalState(this);
	        if (!state.frozen) state.frozen = new InternalWeakMap();
	        nativeHas.call(this, key) ? nativeSet.call(this, key, value) : state.frozen.set(key, value);
	      } else nativeSet.call(this, key, value);
	      return this;
	    }
	  });
	}
	});

	var EventHarness =
	/*#__PURE__*/
	function () {
	  function EventHarness() {
	    _classCallCheck(this, EventHarness);

	    _eventListeners.set(this, {
	      writable: true,
	      value: []
	    });
	  }

	  _createClass(EventHarness, [{
	    key: "addListener",

	    /**
	     *
	     * @param {string} eventName
	     * @param {Object} obj
	     * @param {string|Function} method
	     * @param {*=} constructionParam
	     * @return {number} handle
	     */
	    value: function addListener(eventName, obj, method, constructionParam) {
	      _classPrivateFieldSet(this, _eventListeners, _classPrivateFieldGet(this, _eventListeners) || []);

	      var handlerFunction = typeof method === 'string' ? function (context, eventName, invocationParam) {
	        return obj[method](context, eventName, invocationParam, constructionParam);
	      } : function (context, eventName, invocationParam) {
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
	    key: "removeListener",

	    /**
	     *
	     * @param {string} eventName
	     * @param {number} handle
	     * @returns undefined
	     */
	    value: function removeListener(eventName, handle) {
	      if (_classPrivateFieldGet(this, _eventListeners)[eventName] && _classPrivateFieldGet(this, _eventListeners)[eventName][handle]) {
	        delete _classPrivateFieldGet(this, _eventListeners)[eventName][handle];
	      } else {
	        console.log('trying to remove non-existent event handler, event = ' + eventName + ' handle = ' + handle);
	      }

	      return undefined;
	    }
	  }, {
	    key: "destructor",

	    /**
	     *
	     */
	    value: function destructor() {
	      _classPrivateFieldSet(this, _eventListeners, null);
	    }
	  }, {
	    key: "fireEvent",

	    /**
	     *
	     * @param {string} eventName
	     * @param {Object=} param optional parameter to pass on to listener
	     * @return void
	     */
	    value: function fireEvent(eventName, param) {
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

	var _eventListeners = new WeakMap();

	_defineProperty(EventHarness, "STOP_PROPAGATION", 'STOP_PROPAGATION');

	function uuid(a) {
	  return a ? (a ^ Math.random() * 16 >> a / 4).toString(16) : ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, uuid);
	}
	var SAVE_STATE_LOCAL = 'SAVED_LOCALLY';
	var SAVE_STATE_SERVER = 'SAVED_TO_SERVER';
	var Model =
	/*#__PURE__*/
	function (_EventHarness) {
	  _inherits(Model, _EventHarness);

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

	    _classCallCheck(this, Model);

	    _this = _possibleConstructorReturn(this, _getPrototypeOf(Model).call(this));

	    _defineProperty(_assertThisInitialized(_this), "_id", void 0);

	    _defineProperty(_assertThisInitialized(_this), "_savedRemotely", false);

	    _defineProperty(_assertThisInitialized(_this), "_savedLocally", false);

	    _defineProperty(_assertThisInitialized(_this), "deleted", false);

	    _defineProperty(_assertThisInitialized(_this), "createdStamp", void 0);

	    _defineProperty(_assertThisInitialized(_this), "modifiedStamp", void 0);

	    _defineProperty(_assertThisInitialized(_this), "projectId", void 0);

	    _defineProperty(_assertThisInitialized(_this), "isPristine", false);

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
	    key: "queuePost",

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
	    value: function queuePost(formData) {
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
	    value: function post(formData) {
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

	            _this3.createdStamp = responseData.created;
	            _this3.modifiedStamp = responseData.modified; // return the json version of the original response as a promise

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

	    /**
	     *
	     * @param {{id : string, saveState: string, attributes: Object.<string, *>, deleted: boolean, created: (number|string), modified: (number|string), projectId: (number|string)}} descriptor
	     */
	    value: function _parseDescriptor(descriptor) {
	      this._parseAttributes(descriptor.attributes);

	      this._parseSavedState(descriptor.saveState);

	      this.deleted = descriptor.deleted;
	      this.createdStamp = 0 + descriptor.created;
	      this.modifiedStamp = 0 + descriptor.modified;
	      this.projectId = 0 + descriptor.projectId;
	    }
	    /**
	     *
	     * @param {Object.<string, {}>} attributes
	     */

	  }, {
	    key: "_parseAttributes",
	    value: function _parseAttributes(attributes) {
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

	_defineProperty(Model, "_tasks", []);

	var ResponseFactory =
	/*#__PURE__*/
	function () {
	  function ResponseFactory() {
	    _classCallCheck(this, ResponseFactory);
	  }

	  _createClass(ResponseFactory, null, [{
	    key: "fromPostedData",

	    /**
	     *
	     * @param {FormData} formData
	     * @returns {LocalResponse}
	     */
	    value: function fromPostedData(formData) {
	      /**
	       * the object that will be saved to IndexedDb
	       *
	       * this needs to be in scope for several stages of the promise chain
	       * @type {{[saved]: string, [type]: string, [imageId]: string, [surveyId]: string, [occurrenceId]: string, [image]: file, [projectId]: number, saveState: string }}
	       */
	      var toSaveLocally = {
	        saveState: SAVE_STATE_LOCAL // mark as not saved externally

	      };
	      var _iteratorNormalCompletion = true;
	      var _didIteratorError = false;
	      var _iteratorError = undefined;

	      try {
	        for (var _iterator = formData.entries()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	          var pair = _step.value;
	          toSaveLocally[pair[0]] = pair[1];
	        }
	      } catch (err) {
	        _didIteratorError = true;
	        _iteratorError = err;
	      } finally {
	        try {
	          if (!_iteratorNormalCompletion && _iterator.return != null) {
	            _iterator.return();
	          }
	        } finally {
	          if (_didIteratorError) {
	            throw _iteratorError;
	          }
	        }
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
	        return new ResponseFactory.responses[returnedToClient.type]({}, returnedToClient);
	      } else {
	        throw new Error("Unrecognised post type '".concat(returnedToClient.type, "'"));
	      }
	    }
	  }]);

	  return ResponseFactory;
	}();

	_defineProperty(ResponseFactory, "responses", {});

	function packageClientResponse(returnedToClient) {
	  var headers = new Headers();
	  headers.set('Content-Type', 'application/json');
	  return new Response(JSON.stringify(returnedToClient), {
	    status: returnedToClient.error ? 500 : 200,
	    headers: headers
	  });
	}

	var LocalResponse =
	/*#__PURE__*/
	function () {
	  /**
	   * @type {Response}
	   */
	  function LocalResponse(toSaveLocally, returnedToClient) {
	    _classCallCheck(this, LocalResponse);

	    _defineProperty(this, "toSaveLocally", void 0);

	    _defineProperty(this, "returnedToClient", void 0);

	    _defineProperty(this, "prebuiltResponse", void 0);

	    _defineProperty(this, "failureErrorMessage", 'Failed to save a local copy on your device.');

	    _defineProperty(this, "failureErrorHelp", 'Your internet connection may have failed (or there could be a problem with the server). ' + 'It wasn\'t possible to save a temporary copy on your device. Perhaps there is insufficient space? ' + 'Please try to re-establish a network connection and try again.');

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
	        // console.log(`Stored image ${toSaveLocally.imageId} locally`);
	        return _this.prebuiltResponse ? _this.prebuiltResponse : packageClientResponse(_this.returnedToClient);
	      }, function (reason) {
	        console.log("Failed to store object ".concat(_this.toSaveLocally.imageId, " locally"));
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
	  }]);

	  return LocalResponse;
	}();

	var ImageResponse =
	/*#__PURE__*/
	function (_LocalResponse) {
	  _inherits(ImageResponse, _LocalResponse);

	  function ImageResponse() {
	    var _getPrototypeOf2;

	    var _this;

	    _classCallCheck(this, ImageResponse);

	    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
	      args[_key] = arguments[_key];
	    }

	    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(ImageResponse)).call.apply(_getPrototypeOf2, [this].concat(args)));

	    _defineProperty(_assertThisInitialized(_this), "failureErrorMessage", 'Failed to store image.');

	    _defineProperty(_assertThisInitialized(_this), "failureErrorHelp", 'Your internet connection may have failed (or there could be a problem with the server). ' + 'It wasn\'t possible to save a temporary copy on your device. Perhaps there is insufficient space? ' + 'Please try to re-establish a network connection and try again.');

	    return _this;
	  }

	  _createClass(ImageResponse, [{
	    key: "populateClientResponse",

	    /**
	     * called to build the response to the post that is returned to the client
	     * in the absence of the remote server
	     *
	     * @returns {this}
	     */
	    value: function populateClientResponse() {
	      this.returnedToClient.id = this.toSaveLocally.imageId;
	      this.returnedToClient.type = 'image';
	      this.returnedToClient.surveyId = this.toSaveLocally.surveyId;
	      this.returnedToClient.occurrenceId = this.toSaveLocally.occurrenceId;
	      this.returnedToClient.created = 0 + this.toSaveLocally.created; // stamps from server always take precedence

	      this.returnedToClient.modified = 0 + this.toSaveLocally.modified;
	      this.returnedToClient.saveState = SAVE_STATE_LOCAL;
	      this.returnedToClient.deleted = this.toSaveLocally.deleted;
	      this.returnedToClient.projectId = 0 + this.toSaveLocally.projectId;
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
	      this.toSaveLocally.imageId = this.returnedToClient.id;
	      this.toSaveLocally.created = 0 + this.returnedToClient.created; // stamps from server always take precedence

	      this.toSaveLocally.modified = 0 + this.returnedToClient.modified;
	      this.toSaveLocally.saveState = SAVE_STATE_SERVER;
	      this.toSaveLocally.deleted = this.returnedToClient.deleted;
	      this.toSaveLocally.projectId = 0 + this.returnedToClient.projectId;
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

	var SurveyResponse =
	/*#__PURE__*/
	function (_LocalResponse) {
	  _inherits(SurveyResponse, _LocalResponse);

	  function SurveyResponse() {
	    var _getPrototypeOf2;

	    var _this;

	    _classCallCheck(this, SurveyResponse);

	    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
	      args[_key] = arguments[_key];
	    }

	    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(SurveyResponse)).call.apply(_getPrototypeOf2, [this].concat(args)));

	    _defineProperty(_assertThisInitialized(_this), "failureErrorMessage", 'Failed to store survey.');

	    _defineProperty(_assertThisInitialized(_this), "failureErrorHelp", 'Your internet connection may have failed (or there could be a problem with the server). ' + 'It wasn\'t possible to save a temporary copy on your device. Perhaps there is insufficient space? ' + 'Please try to re-establish a network connection and try again.');

	    return _this;
	  }

	  _createClass(SurveyResponse, [{
	    key: "populateClientResponse",

	    /**
	     * called to build the response to the post that is returned to the client
	     * in the absence of the remote server
	     *
	     * @returns {this}
	     */
	    value: function populateClientResponse() {
	      this.returnedToClient.id = this.toSaveLocally.surveyId;
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
	      this.toSaveLocally.surveyId = this.returnedToClient.id;
	      this.toSaveLocally.type = 'survey';
	      this.toSaveLocally.attributes = this.returnedToClient.attributes;
	      this.toSaveLocally.created = 0 + this.returnedToClient.created; // stamps from server always take precedence

	      this.toSaveLocally.modified = 0 + this.returnedToClient.modified;
	      this.toSaveLocally.saveState = SAVE_STATE_SERVER;
	      this.toSaveLocally.deleted = this.returnedToClient.deleted;
	      this.toSaveLocally.projectId = 0 + this.returnedToClient.projectId;
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

	var OccurrenceResponse =
	/*#__PURE__*/
	function (_LocalResponse) {
	  _inherits(OccurrenceResponse, _LocalResponse);

	  function OccurrenceResponse() {
	    var _getPrototypeOf2;

	    var _this;

	    _classCallCheck(this, OccurrenceResponse);

	    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
	      args[_key] = arguments[_key];
	    }

	    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(OccurrenceResponse)).call.apply(_getPrototypeOf2, [this].concat(args)));

	    _defineProperty(_assertThisInitialized(_this), "failureErrorMessage", 'Failed to store occurrence.');

	    _defineProperty(_assertThisInitialized(_this), "failureErrorHelp", 'Your internet connection may have failed (or there could be a problem with the server). ' + 'It wasn\'t possible to save a temporary copy on your device. Perhaps there is insufficient space? ' + 'Please try to re-establish a network connection and try again.');

	    return _this;
	  }

	  _createClass(OccurrenceResponse, [{
	    key: "populateClientResponse",

	    /**
	     * called to build the response to the post that is returned to the client
	     * in the absence of the remote server
	     *
	     * @returns {this}
	     */
	    value: function populateClientResponse() {
	      this.returnedToClient.id = this.toSaveLocally.occurrenceId;
	      this.returnedToClient.type = 'occurrence';
	      this.returnedToClient.surveyId = this.toSaveLocally.surveyId;
	      this.returnedToClient.attributes = this.toSaveLocally.attributes;
	      this.returnedToClient.created = 0 + this.toSaveLocally.created; // stamps from server always take precedence

	      this.returnedToClient.modified = 0 + this.toSaveLocally.modified;
	      this.returnedToClient.saveState = SAVE_STATE_LOCAL;
	      this.returnedToClient.deleted = this.toSaveLocally.deleted;
	      this.returnedToClient.projectId = 0 + this.toSaveLocally.projectId;
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
	      this.toSaveLocally.occurrenceId = this.returnedToClient.id;
	      this.toSaveLocally.type = 'occurrence';
	      this.toSaveLocally.surveyId = this.returnedToClient.surveyId;
	      this.toSaveLocally.attributes = this.returnedToClient.attributes;
	      this.toSaveLocally.created = 0 + this.returnedToClient.created; // stamps from server always take precedence

	      this.toSaveLocally.modified = 0 + this.returnedToClient.modified;
	      this.toSaveLocally.saveState = SAVE_STATE_SERVER;
	      this.toSaveLocally.deleted = this.returnedToClient.deleted;
	      this.toSaveLocally.projectId = 0 + this.returnedToClient.projectId;
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

	var defineProperty$3 = objectDefineProperty.f;








	var fastKey = internalMetadata.fastKey;


	var setInternalState$5 = internalState.set;
	var internalStateGetterFor$1 = internalState.getterFor;

	var collectionStrong = {
	  getConstructor: function (wrapper, CONSTRUCTOR_NAME, IS_MAP, ADDER) {
	    var C = wrapper(function (that, iterable) {
	      anInstance(that, C, CONSTRUCTOR_NAME);
	      setInternalState$5(that, {
	        type: CONSTRUCTOR_NAME,
	        index: objectCreate(null),
	        first: undefined,
	        last: undefined,
	        size: 0
	      });
	      if (!descriptors) that.size = 0;
	      if (iterable != undefined) iterate_1(iterable, that[ADDER], that, IS_MAP);
	    });

	    var getInternalState = internalStateGetterFor$1(CONSTRUCTOR_NAME);

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
	        if (descriptors) state.size++;
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
	      // 23.1.3.1 Map.prototype.clear()
	      // 23.2.3.2 Set.prototype.clear()
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
	        if (descriptors) state.size = 0;
	        else that.size = 0;
	      },
	      // 23.1.3.3 Map.prototype.delete(key)
	      // 23.2.3.4 Set.prototype.delete(value)
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
	          if (descriptors) state.size--;
	          else that.size--;
	        } return !!entry;
	      },
	      // 23.2.3.6 Set.prototype.forEach(callbackfn, thisArg = undefined)
	      // 23.1.3.5 Map.prototype.forEach(callbackfn, thisArg = undefined)
	      forEach: function forEach(callbackfn /* , that = undefined */) {
	        var state = getInternalState(this);
	        var boundFunction = bindContext(callbackfn, arguments.length > 1 ? arguments[1] : undefined, 3);
	        var entry;
	        while (entry = entry ? entry.next : state.first) {
	          boundFunction(entry.value, entry.key, this);
	          // revert to the last existing entry
	          while (entry && entry.removed) entry = entry.previous;
	        }
	      },
	      // 23.1.3.7 Map.prototype.has(key)
	      // 23.2.3.7 Set.prototype.has(value)
	      has: function has(key) {
	        return !!getEntry(this, key);
	      }
	    });

	    redefineAll(C.prototype, IS_MAP ? {
	      // 23.1.3.6 Map.prototype.get(key)
	      get: function get(key) {
	        var entry = getEntry(this, key);
	        return entry && entry.value;
	      },
	      // 23.1.3.9 Map.prototype.set(key, value)
	      set: function set(key, value) {
	        return define(this, key === 0 ? 0 : key, value);
	      }
	    } : {
	      // 23.2.3.1 Set.prototype.add(value)
	      add: function add(value) {
	        return define(this, value = value === 0 ? 0 : value, value);
	      }
	    });
	    if (descriptors) defineProperty$3(C.prototype, 'size', {
	      get: function () {
	        return getInternalState(this).size;
	      }
	    });
	    return C;
	  },
	  setStrong: function (C, CONSTRUCTOR_NAME, IS_MAP) {
	    var ITERATOR_NAME = CONSTRUCTOR_NAME + ' Iterator';
	    var getInternalCollectionState = internalStateGetterFor$1(CONSTRUCTOR_NAME);
	    var getInternalIteratorState = internalStateGetterFor$1(ITERATOR_NAME);
	    // add .keys, .values, .entries, [@@iterator]
	    // 23.1.3.4, 23.1.3.8, 23.1.3.11, 23.1.3.12, 23.2.3.5, 23.2.3.8, 23.2.3.10, 23.2.3.11
	    defineIterator(C, CONSTRUCTOR_NAME, function (iterated, kind) {
	      setInternalState$5(this, {
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

	    // add [@@species], 23.1.2.2, 23.2.2.2
	    setSpecies(CONSTRUCTOR_NAME);
	  }
	};

	// `Map` constructor
	// https://tc39.github.io/ecma262/#sec-map-objects
	var es_map = collection('Map', function (get) {
	  return function Map() { return get(this, arguments.length ? arguments[0] : undefined); };
	}, collectionStrong, true);

	var OccurrenceImage =
	/*#__PURE__*/
	function (_Model) {
	  _inherits(OccurrenceImage, _Model);

	  function OccurrenceImage() {
	    var _getPrototypeOf2;

	    var _this;

	    _classCallCheck(this, OccurrenceImage);

	    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
	      args[_key] = arguments[_key];
	    }

	    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(OccurrenceImage)).call.apply(_getPrototypeOf2, [this].concat(args)));

	    _defineProperty(_assertThisInitialized(_this), "file", void 0);

	    _defineProperty(_assertThisInitialized(_this), "TYPE", 'image');

	    _defineProperty(_assertThisInitialized(_this), "SAVE_ENDPOINT", '/saveimage.php');

	    return _this;
	  }

	  _createClass(OccurrenceImage, [{
	    key: "getUrl",

	    /**
	     * fetches a url of the image
	     * this might be a remote url (or one intercepted by a service worker)
	     * or a data url of the raw image, (not yet uploaded)
	     *
	     * @returns {string}
	     */
	    value: function getUrl() {}
	  }, {
	    key: "save",

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
	    value: function save(surveyId, occurrenceId, projectId) {
	      if (!this._savedRemotely) {
	        var formData = new FormData();
	        formData.append('type', this.TYPE);
	        formData.append('surveyId', surveyId);
	        formData.append('occurrenceId', occurrenceId);
	        formData.append('projectId', projectId.toString());
	        formData.append('imageId', this.id);
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

	    /**
	     *
	     * @param {{surveyId: string, occurrenceId: string, [image]: File}} descriptor
	     * @private
	     */
	    value: function _parseDescriptor(descriptor) {
	      _get(_getPrototypeOf(OccurrenceImage.prototype), "_parseDescriptor", this).call(this, descriptor);

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

	    /**
	     *
	     * @param {File} file
	     */
	    value: function fromFile(file) {
	      var image = new OccurrenceImage();
	      image.file = file;
	      return image;
	    }
	  }, {
	    key: "placeholder",

	    /**
	     *
	     * @param id
	     * @returns {OccurrenceImage}
	     */
	    value: function placeholder(id) {
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

	_defineProperty(OccurrenceImage, "imageCache", new Map());

	_defineProperty(OccurrenceImage, "EVENT_MODIFIED", 'modified');

	if (!Promise.prototype.finally) {
	  Promise.prototype.finally = function (callback) {
	    return this.then(callback).catch(callback);
	  };
	}

	ImageResponse.register();
	SurveyResponse.register();
	OccurrenceResponse.register();
	var CACHE_VERSION = "version-1.0.1.1569856515";
	var POST_PASS_THROUGH_WHITELIST = /^https:\/\/nyph\.bsbi\.org\/loadsurveys.php/;
	localforage.config({
	  name: 'NYPH App'
	}); // On install, cache some resources.

	self.addEventListener('install', function (evt) {
	  console.log('The service worker is being installed.');
	  self.skipWaiting(); // Ask the service worker to keep installing until the returning promise
	  // resolves.

	  evt.waitUntil(precache() // see https://serviceworke.rs/immediate-claim_service-worker_doc.html
	  .then(function () {
	    return self.skipWaiting();
	  }));
	});
	self.addEventListener('activate', function (event) {
	  self.clients.matchAll({
	    includeUncontrolled: true
	  }).then(function (clientList) {
	    var urls = clientList.map(function (client) {
	      return client.url;
	    });
	    console.log('[ServiceWorker] Matching clients:', urls.join(', '));
	  });
	  event.waitUntil(caches.keys().then(function (cacheNames) {
	    return Promise.all(cacheNames.map(function (cacheName) {
	      if (cacheName !== CACHE_VERSION) {
	        console.log('[ServiceWorker] Deleting old cache:', cacheName);
	        return caches.delete(cacheName);
	      }
	    }));
	  }).then(function () {
	    console.log('[ServiceWorker] Claiming clients for version', CACHE_VERSION);
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
	  console.log("The service worker is serving: '".concat(evt.request.url, "'"));
	  evt.preventDefault();

	  if (evt.request.method === 'POST') {
	    console.log("Got a post request");

	    if (evt.request.url.match(POST_PASS_THROUGH_WHITELIST)) {
	      console.log("Passing through whitelisted post request for: ".concat(evt.request.url));
	      evt.respondWith(fetch(evt.request));
	    } else {
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
	          //console.log('got to form data handler');
	          //console.log({formData});
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
	  } else {
	    // test whether this is a direct link in to a page that should be substituted by
	    // the single page app
	    if (evt.request.url.match(/^https:\/\/nyph\.bsbi\.org\/app\//) && evt.request.url.match(/^https:\/\/nyph\.bsbi\.org\/app$/) && !evt.request.url.match(/^https:\/\/nyph\.bsbi\.org\/app\/nyph\.js/) && !evt.request.url.match(/^https:\/\/nyph\.bsbi\.org\/app\/serviceworker\.js/) && !evt.request.url.match(/^https:\/\/nyph\.bsbi\.org\/app\/manifest\.webmanifest/) && !evt.request.url.match(/^https:\/\/nyph\.bsbi\.org\/app\/index\.html/)) {
	      // serving single page app instead
	      console.log('redirecting to the root of the SPA');
	      var spaRequest = new Request('https://nyph.bsbi.org/app/index.html');
	      evt.respondWith(fromCache(spaRequest));
	      evt.waitUntil(update(spaRequest));
	    } else if (evt.request.url.match(/^https:\/\/nyph\.bsbi\.org\/image\.php/)) {
	      handleImageFetch(evt);
	    } else {
	      // You can use `respondWith()` to answer immediately, without waiting for the
	      // network response to reach the service worker...
	      evt.respondWith(fromCache(evt.request)); // ...and `waitUntil()` to prevent the worker from being killed until the
	      // cache is updated.

	      evt.waitUntil(update(evt.request));
	    }
	  }
	}); // Open a cache and use `addAll()` with an array of assets to add all of them
	// to the cache. Return a promise resolving when all the assets are added.

	function precache() {
	  return caches.open(CACHE_VERSION).then(function (cache) {
	    return cache.addAll(['./index.html', './manifest.webmanifest', //'./nyph.js',
	    '/appcss/app.css', // note no leading '.' - this is an absolute path
	    '/img/NyphLogo_900x431.png', '/img/icons/favicon-32x32.png', '/img/icons/favicon-16x16.png', '/img/icons/favicon-196x196.png', 'https://fonts.googleapis.com/icon?family=Material+Icons|Material+Icons+Round', 'https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css', 'https://database.bsbi.org/js/taxonnames.js.php', 'https://code.jquery.com/jquery-3.3.1.slim.min.js', 'https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js', 'https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js']);
	  });
	} // Open the cache where the assets were stored and search for the requested
	// resource. Notice that in case of no matching, the promise still resolves
	// but it does with `undefined` as value.


	function fromCache(request) {
	  // @todo need to serve index.html in place of all navigo-served pages
	  // (an issue if someone returns to a bookmarked page within the app)
	  return caches.open(CACHE_VERSION).then(function (cache) {
	    return cache.match(request).then(function (matching) {
	      console.log(matching ? "matched ".concat(request.url) : "no match for ".concat(request.url));
	      return matching || fetch(request); // return cache match or if not cached then go out to network
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


	function handleImageFetch(evt) {
	  evt.respondWith(fromCache(evt.request).then(function (response) {
	    if (response) {
	      return response;
	    } else {
	      // not cached and no network access
	      // try to respond from local storage
	      var url = evt.request.url;
	      var matches = url.match(/imageid=([a-fA-F0-9]{8}-(?:[a-fA-F0-9]{4}-){3}[a-fA-F0-9]{12})/);

	      if (matches) {
	        var imageId = matches[1];
	        return imageFromLocalDatabase(imageId);
	      } else {
	        console.log("Failed to match image id in url '".concat(url, "'"));
	      }
	    }
	  }));
	}
	/**
	 *
	 * @param {string} imageId
	 * @returns {Promise}
	 */


	function imageFromLocalDatabase(imageId) {
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
	} // Update consists in opening the cache, performing a network request and
	// storing the new response data.


	function update(request) {
	  request = new Request(request, {
	    mode: 'cors',
	    credentials: 'omit'
	  });
	  return caches.open(CACHE_VERSION).then(function (cache) {
	    return fetch(request, {
	      cache: "no-cache"
	    }).then(function (response) {
	      if (response.ok) {
	        return cache.put(request, response);
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

}());
//# sourceMappingURL=serviceworker.js.map
