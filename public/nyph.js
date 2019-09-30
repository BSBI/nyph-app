(function (BsbiDb$1, $$1) {
	'use strict';

	BsbiDb$1 = BsbiDb$1 && BsbiDb$1.hasOwnProperty('default') ? BsbiDb$1['default'] : BsbiDb$1;
	$$1 = $$1 && $$1.hasOwnProperty('default') ? $$1['default'] : $$1;

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

	var isObject = function (it) {
	  return typeof it === 'object' ? it !== null : typeof it === 'function';
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

	var anObject = function (it) {
	  if (!isObject(it)) {
	    throw TypeError(String(it) + ' is not an object');
	  } return it;
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

	var nativeDefineProperty = Object.defineProperty;

	// `Object.defineProperty` method
	// https://tc39.github.io/ecma262/#sec-object.defineproperty
	var f = descriptors ? nativeDefineProperty : function defineProperty(O, P, Attributes) {
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

	var hasOwnProperty = {}.hasOwnProperty;

	var has = function (it, key) {
	  return hasOwnProperty.call(it, key);
	};

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

	var toString = {}.toString;

	var classofRaw = function (it) {
	  return toString.call(it).slice(8, -1);
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

	var TO_STRING_TAG = wellKnownSymbol('toStringTag');
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
	    : typeof (tag = tryGet(O = Object(it), TO_STRING_TAG)) == 'string' ? tag
	    // builtinTag case
	    : CORRECT_ARGUMENTS ? classofRaw(O)
	    // ES3 arguments fallback
	    : (result = classofRaw(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : result;
	};

	var TO_STRING_TAG$1 = wellKnownSymbol('toStringTag');
	var test = {};

	test[TO_STRING_TAG$1] = 'z';

	// `Object.prototype.toString` method implementation
	// https://tc39.github.io/ecma262/#sec-object.prototype.tostring
	var objectToString = String(test) !== '[object z]' ? function toString() {
	  return '[object ' + classof(this) + ']';
	} : test.toString;

	var ObjectPrototype = Object.prototype;

	// `Object.prototype.toString` method
	// https://tc39.github.io/ecma262/#sec-object.prototype.tostring
	if (objectToString !== ObjectPrototype.toString) {
	  redefine(ObjectPrototype, 'toString', objectToString, { unsafe: true });
	}

	var nativePropertyIsEnumerable = {}.propertyIsEnumerable;
	var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

	// Nashorn ~ JDK8 bug
	var NASHORN_BUG = getOwnPropertyDescriptor && !nativePropertyIsEnumerable.call({ 1: 2 }, 1);

	// `Object.prototype.propertyIsEnumerable` method implementation
	// https://tc39.github.io/ecma262/#sec-object.prototype.propertyisenumerable
	var f$1 = NASHORN_BUG ? function propertyIsEnumerable(V) {
	  var descriptor = getOwnPropertyDescriptor(this, V);
	  return !!descriptor && descriptor.enumerable;
	} : nativePropertyIsEnumerable;

	var objectPropertyIsEnumerable = {
		f: f$1
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

	var nativeGetOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

	// `Object.getOwnPropertyDescriptor` method
	// https://tc39.github.io/ecma262/#sec-object.getownpropertydescriptor
	var f$2 = descriptors ? nativeGetOwnPropertyDescriptor : function getOwnPropertyDescriptor(O, P) {
	  O = toIndexedObject(O);
	  P = toPrimitive(P, true);
	  if (ie8DomDefine) try {
	    return nativeGetOwnPropertyDescriptor(O, P);
	  } catch (error) { /* empty */ }
	  if (has(O, P)) return createPropertyDescriptor(!objectPropertyIsEnumerable.f.call(O, P), O[P]);
	};

	var objectGetOwnPropertyDescriptor = {
		f: f$2
	};

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

	var nativePromiseConstructor = global_1.Promise;

	var redefineAll = function (target, src, options) {
	  for (var key in src) redefine(target, key, src[key], options);
	  return target;
	};

	var defineProperty = objectDefineProperty.f;



	var TO_STRING_TAG$2 = wellKnownSymbol('toStringTag');

	var setToStringTag = function (it, TAG, STATIC) {
	  if (it && !has(it = STATIC ? it : it.prototype, TO_STRING_TAG$2)) {
	    defineProperty(it, TO_STRING_TAG$2, { configurable: true, value: TAG });
	  }
	};

	var SPECIES = wellKnownSymbol('species');

	var setSpecies = function (CONSTRUCTOR_NAME) {
	  var Constructor = getBuiltIn(CONSTRUCTOR_NAME);
	  var defineProperty = objectDefineProperty.f;

	  if (descriptors && Constructor && !Constructor[SPECIES]) {
	    defineProperty(Constructor, SPECIES, {
	      configurable: true,
	      get: function () { return this; }
	    });
	  }
	};

	var aFunction$1 = function (it) {
	  if (typeof it != 'function') {
	    throw TypeError(String(it) + ' is not a function');
	  } return it;
	};

	var anInstance = function (it, Constructor, name) {
	  if (!(it instanceof Constructor)) {
	    throw TypeError('Incorrect ' + (name ? name + ' ' : '') + 'invocation');
	  } return it;
	};

	var iterators = {};

	var ITERATOR = wellKnownSymbol('iterator');
	var ArrayPrototype = Array.prototype;

	// check on default Array iterator
	var isArrayIteratorMethod = function (it) {
	  return it !== undefined && (iterators.Array === it || ArrayPrototype[ITERATOR] === it);
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

	var ITERATOR$1 = wellKnownSymbol('iterator');

	var getIteratorMethod = function (it) {
	  if (it != undefined) return it[ITERATOR$1]
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

	var ITERATOR$2 = wellKnownSymbol('iterator');
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
	  iteratorWithReturn[ITERATOR$2] = function () {
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
	    object[ITERATOR$2] = function () {
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

	var SPECIES$1 = wellKnownSymbol('species');

	// `SpeciesConstructor` abstract operation
	// https://tc39.github.io/ecma262/#sec-speciesconstructor
	var speciesConstructor = function (O, defaultConstructor) {
	  var C = anObject(O).constructor;
	  var S;
	  return C === undefined || (S = anObject(C)[SPECIES$1]) == undefined ? defaultConstructor : aFunction$1(S);
	};

	var html = getBuiltIn('document', 'documentElement');

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










	var SPECIES$2 = wellKnownSymbol('species');
	var PROMISE = 'Promise';
	var getInternalState = internalState.get;
	var setInternalState = internalState.set;
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

	var FORCED = isForced_1(PROMISE, function () {
	  // correct subclassing with @@species support
	  var promise = PromiseConstructor.resolve(1);
	  var empty = function () { /* empty */ };
	  var FakePromise = (promise.constructor = {})[SPECIES$2] = function (exec) {
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

	var INCORRECT_ITERATION = FORCED || !checkCorrectnessOfIteration(function (iterable) {
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
	if (FORCED) {
	  // 25.4.3.1 Promise(executor)
	  PromiseConstructor = function Promise(executor) {
	    anInstance(this, PromiseConstructor, PROMISE);
	    aFunction$1(executor);
	    Internal.call(this);
	    var state = getInternalState(this);
	    try {
	      executor(bind(internalResolve, this, state), bind(internalReject, this, state));
	    } catch (error) {
	      internalReject(this, state, error);
	    }
	  };
	  // eslint-disable-next-line no-unused-vars
	  Internal = function Promise(executor) {
	    setInternalState(this, {
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
	    var state = getInternalState(promise);
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

	_export({ global: true, wrap: true, forced: FORCED }, {
	  Promise: PromiseConstructor
	});

	setToStringTag(PromiseConstructor, PROMISE, false);
	setSpecies(PROMISE);

	PromiseWrapper = path[PROMISE];

	// statics
	_export({ target: PROMISE, stat: true, forced: FORCED }, {
	  // `Promise.reject` method
	  // https://tc39.github.io/ecma262/#sec-promise.reject
	  reject: function reject(r) {
	    var capability = newPromiseCapability$1(this);
	    capability.reject.call(undefined, r);
	    return capability.promise;
	  }
	});

	_export({ target: PROMISE, stat: true, forced:  FORCED }, {
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

	var SPECIES$3 = wellKnownSymbol('species');

	// `ArraySpeciesCreate` abstract operation
	// https://tc39.github.io/ecma262/#sec-arrayspeciescreate
	var arraySpeciesCreate = function (originalArray, length) {
	  var C;
	  if (isArray(originalArray)) {
	    C = originalArray.constructor;
	    // cross-realm fallback
	    if (typeof C == 'function' && (C === Array || isArray(C.prototype))) C = undefined;
	    else if (isObject(C)) {
	      C = C[SPECIES$3];
	      if (C === null) C = undefined;
	    }
	  } return new (C === undefined ? Array : C)(length === 0 ? 0 : length);
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

	var $forEach = arrayIteration.forEach;

	var HIDDEN = sharedKey('hidden');
	var SYMBOL = 'Symbol';
	var PROTOTYPE$1 = 'prototype';
	var TO_PRIMITIVE = wellKnownSymbol('toPrimitive');
	var setInternalState$1 = internalState.set;
	var getInternalState$1 = internalState.getterFor(SYMBOL);
	var ObjectPrototype$1 = Object[PROTOTYPE$1];
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
	  var ObjectPrototypeDescriptor = nativeGetOwnPropertyDescriptor$1(ObjectPrototype$1, P);
	  if (ObjectPrototypeDescriptor) delete ObjectPrototype$1[P];
	  nativeDefineProperty$1(O, P, Attributes);
	  if (ObjectPrototypeDescriptor && O !== ObjectPrototype$1) {
	    nativeDefineProperty$1(ObjectPrototype$1, P, ObjectPrototypeDescriptor);
	  }
	} : nativeDefineProperty$1;

	var wrap = function (tag, description) {
	  var symbol = AllSymbols[tag] = objectCreate($Symbol[PROTOTYPE$1]);
	  setInternalState$1(symbol, {
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
	  if (O === ObjectPrototype$1) $defineProperty(ObjectPrototypeSymbols, P, Attributes);
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
	  if (this === ObjectPrototype$1 && has(AllSymbols, P) && !has(ObjectPrototypeSymbols, P)) return false;
	  return enumerable || !has(this, P) || !has(AllSymbols, P) || has(this, HIDDEN) && this[HIDDEN][P] ? enumerable : true;
	};

	var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(O, P) {
	  var it = toIndexedObject(O);
	  var key = toPrimitive(P, true);
	  if (it === ObjectPrototype$1 && has(AllSymbols, key) && !has(ObjectPrototypeSymbols, key)) return;
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
	  var IS_OBJECT_PROTOTYPE = O === ObjectPrototype$1;
	  var names = nativeGetOwnPropertyNames$1(IS_OBJECT_PROTOTYPE ? ObjectPrototypeSymbols : toIndexedObject(O));
	  var result = [];
	  $forEach(names, function (key) {
	    if (has(AllSymbols, key) && (!IS_OBJECT_PROTOTYPE || has(ObjectPrototype$1, key))) {
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
	      if (this === ObjectPrototype$1) setter.call(ObjectPrototypeSymbols, value);
	      if (has(this, HIDDEN) && has(this[HIDDEN], tag)) this[HIDDEN][tag] = false;
	      setSymbolDescriptor(this, tag, createPropertyDescriptor(1, value));
	    };
	    if (descriptors && USE_SETTER) setSymbolDescriptor(ObjectPrototype$1, tag, { configurable: true, set: setter });
	    return wrap(tag, description);
	  };

	  redefine($Symbol[PROTOTYPE$1], 'toString', function toString() {
	    return getInternalState$1(this).tag;
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
	        return getInternalState$1(this).description;
	      }
	    });
	    {
	      redefine(ObjectPrototype$1, 'propertyIsEnumerable', $propertyIsEnumerable, { unsafe: true });
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

	var createProperty = function (object, key, value) {
	  var propertyKey = toPrimitive(key);
	  if (propertyKey in object) objectDefineProperty.f(object, propertyKey, createPropertyDescriptor(0, value));
	  else object[propertyKey] = value;
	};

	var SPECIES$4 = wellKnownSymbol('species');

	var arrayMethodHasSpeciesSupport = function (METHOD_NAME) {
	  return !fails(function () {
	    var array = [];
	    var constructor = array.constructor = {};
	    constructor[SPECIES$4] = function () {
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

	var FORCED$1 = !IS_CONCAT_SPREADABLE_SUPPORT || !SPECIES_SUPPORT;

	// `Array.prototype.concat` method
	// https://tc39.github.io/ecma262/#sec-array.prototype.concat
	// with adding support of @@isConcatSpreadable and @@species
	_export({ target: 'Array', proto: true, forced: FORCED$1 }, {
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

	var UNSCOPABLES = wellKnownSymbol('unscopables');
	var ArrayPrototype$1 = Array.prototype;

	// Array.prototype[@@unscopables]
	// https://tc39.github.io/ecma262/#sec-array.prototype-@@unscopables
	if (ArrayPrototype$1[UNSCOPABLES] == undefined) {
	  hide(ArrayPrototype$1, UNSCOPABLES, objectCreate(null));
	}

	// add a key to Array.prototype[@@unscopables]
	var addToUnscopables = function (key) {
	  ArrayPrototype$1[UNSCOPABLES][key] = true;
	};

	var $includes = arrayIncludes.includes;


	// `Array.prototype.includes` method
	// https://tc39.github.io/ecma262/#sec-array.prototype.includes
	_export({ target: 'Array', proto: true }, {
	  includes: function includes(el /* , fromIndex = 0 */) {
	    return $includes(this, el, arguments.length > 1 ? arguments[1] : undefined);
	  }
	});

	// https://tc39.github.io/ecma262/#sec-array.prototype-@@unscopables
	addToUnscopables('includes');

	var correctPrototypeGetter = !fails(function () {
	  function F() { /* empty */ }
	  F.prototype.constructor = null;
	  return Object.getPrototypeOf(new F()) !== F.prototype;
	});

	var IE_PROTO$1 = sharedKey('IE_PROTO');
	var ObjectPrototype$2 = Object.prototype;

	// `Object.getPrototypeOf` method
	// https://tc39.github.io/ecma262/#sec-object.getprototypeof
	var objectGetPrototypeOf = correctPrototypeGetter ? Object.getPrototypeOf : function (O) {
	  O = toObject(O);
	  if (has(O, IE_PROTO$1)) return O[IE_PROTO$1];
	  if (typeof O.constructor == 'function' && O instanceof O.constructor) {
	    return O.constructor.prototype;
	  } return O instanceof Object ? ObjectPrototype$2 : null;
	};

	var ITERATOR$3 = wellKnownSymbol('iterator');
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
	if ( !has(IteratorPrototype, ITERATOR$3)) hide(IteratorPrototype, ITERATOR$3, returnThis);

	var iteratorsCore = {
	  IteratorPrototype: IteratorPrototype,
	  BUGGY_SAFARI_ITERATORS: BUGGY_SAFARI_ITERATORS
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
	var ITERATOR$4 = wellKnownSymbol('iterator');
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
	  var nativeIterator = IterablePrototype[ITERATOR$4]
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
	        } else if (typeof CurrentIteratorPrototype[ITERATOR$4] != 'function') {
	          hide(CurrentIteratorPrototype, ITERATOR$4, returnThis$2);
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
	  if ( IterablePrototype[ITERATOR$4] !== defaultIterator) {
	    hide(IterablePrototype, ITERATOR$4, defaultIterator);
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
	var setInternalState$2 = internalState.set;
	var getInternalState$2 = internalState.getterFor(ARRAY_ITERATOR);

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
	  setInternalState$2(this, {
	    type: ARRAY_ITERATOR,
	    target: toIndexedObject(iterated), // target
	    index: 0,                          // next index
	    kind: kind                         // kind
	  });
	// `%ArrayIteratorPrototype%.next` method
	// https://tc39.github.io/ecma262/#sec-%arrayiteratorprototype%.next
	}, function () {
	  var state = getInternalState$2(this);
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

	var MATCH = wellKnownSymbol('match');

	// `IsRegExp` abstract operation
	// https://tc39.github.io/ecma262/#sec-isregexp
	var isRegexp = function (it) {
	  var isRegExp;
	  return isObject(it) && ((isRegExp = it[MATCH]) !== undefined ? !!isRegExp : classofRaw(it) == 'RegExp');
	};

	var notARegexp = function (it) {
	  if (isRegexp(it)) {
	    throw TypeError("The method doesn't accept regular expressions");
	  } return it;
	};

	var MATCH$1 = wellKnownSymbol('match');

	var correctIsRegexpLogic = function (METHOD_NAME) {
	  var regexp = /./;
	  try {
	    '/./'[METHOD_NAME](regexp);
	  } catch (e) {
	    try {
	      regexp[MATCH$1] = false;
	      return '/./'[METHOD_NAME](regexp);
	    } catch (f) { /* empty */ }
	  } return false;
	};

	// `String.prototype.includes` method
	// https://tc39.github.io/ecma262/#sec-string.prototype.includes
	_export({ target: 'String', proto: true, forced: !correctIsRegexpLogic('includes') }, {
	  includes: function includes(searchString /* , position = 0 */) {
	    return !!~String(requireObjectCoercible(this))
	      .indexOf(notARegexp(searchString), arguments.length > 1 ? arguments[1] : undefined);
	  }
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
	var setInternalState$3 = internalState.set;
	var getInternalState$3 = internalState.getterFor(STRING_ITERATOR);

	// `String.prototype[@@iterator]` method
	// https://tc39.github.io/ecma262/#sec-string.prototype-@@iterator
	defineIterator(String, 'String', function (iterated) {
	  setInternalState$3(this, {
	    type: STRING_ITERATOR,
	    string: String(iterated),
	    index: 0
	  });
	// `%StringIteratorPrototype%.next` method
	// https://tc39.github.io/ecma262/#sec-%stringiteratorprototype%.next
	}, function next() {
	  var state = getInternalState$3(this);
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

	var arrayPush = [].push;
	var min$2 = Math.min;
	var MAX_UINT32 = 0xFFFFFFFF;

	// babel-minify transpiles RegExp('x', 'y') -> /x/y and it causes SyntaxError
	var SUPPORTS_Y = !fails(function () { return !RegExp(MAX_UINT32, 'y'); });

	// @@split logic
	fixRegexpWellKnownSymbolLogic('split', 2, function (SPLIT, nativeSplit, maybeCallNative) {
	  var internalSplit;
	  if (
	    'abbc'.split(/(b)*/)[1] == 'c' ||
	    'test'.split(/(?:)/, -1).length != 4 ||
	    'ab'.split(/(?:ab)*/).length != 2 ||
	    '.'.split(/(.?)(.?)/).length != 4 ||
	    '.'.split(/()()/).length > 1 ||
	    ''.split(/.?/).length
	  ) {
	    // based on es5-shim implementation, need to rework it
	    internalSplit = function (separator, limit) {
	      var string = String(requireObjectCoercible(this));
	      var lim = limit === undefined ? MAX_UINT32 : limit >>> 0;
	      if (lim === 0) return [];
	      if (separator === undefined) return [string];
	      // If `separator` is not a regex, use native split
	      if (!isRegexp(separator)) {
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
	    // https://tc39.github.io/ecma262/#sec-string.prototype.split
	    function split(separator, limit) {
	      var O = requireObjectCoercible(this);
	      var splitter = separator == undefined ? undefined : separator[SPLIT];
	      return splitter !== undefined
	        ? splitter.call(separator, O, limit)
	        : internalSplit.call(String(O), separator, limit);
	    },
	    // `RegExp.prototype[@@split]` method
	    // https://tc39.github.io/ecma262/#sec-regexp.prototype-@@split
	    //
	    // NOTE: This cannot be properly polyfilled in engines that don't support
	    // the 'y' flag.
	    function (regexp, limit) {
	      var res = maybeCallNative(internalSplit, regexp, this, limit, internalSplit !== nativeSplit);
	      if (res.done) return res.value;

	      var rx = anObject(regexp);
	      var S = String(this);
	      var C = speciesConstructor(rx, RegExp);

	      var unicodeMatching = rx.unicode;
	      var flags = (rx.ignoreCase ? 'i' : '') +
	                  (rx.multiline ? 'm' : '') +
	                  (rx.unicode ? 'u' : '') +
	                  (SUPPORTS_Y ? 'y' : 'g');

	      // ^(? + rx + ) is needed, in combination with some S slicing, to
	      // simulate the 'y' flag.
	      var splitter = new C(SUPPORTS_Y ? rx : '^(?:' + rx.source + ')', flags);
	      var lim = limit === undefined ? MAX_UINT32 : limit >>> 0;
	      if (lim === 0) return [];
	      if (S.length === 0) return regexpExecAbstract(splitter, S) === null ? [S] : [];
	      var p = 0;
	      var q = 0;
	      var A = [];
	      while (q < S.length) {
	        splitter.lastIndex = SUPPORTS_Y ? q : 0;
	        var z = regexpExecAbstract(splitter, SUPPORTS_Y ? S : S.slice(q));
	        var e;
	        if (
	          z === null ||
	          (e = min$2(toLength(splitter.lastIndex + (SUPPORTS_Y ? 0 : q)), S.length)) === p
	        ) {
	          q = advanceStringIndex(S, q, unicodeMatching);
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
	}, !SUPPORTS_Y);

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

	function isNativeReflectConstruct() {
	  if (typeof Reflect === "undefined" || !Reflect.construct) return false;
	  if (Reflect.construct.sham) return false;
	  if (typeof Proxy === "function") return true;

	  try {
	    Date.prototype.toString.call(Reflect.construct(Date, [], function () {}));
	    return true;
	  } catch (e) {
	    return false;
	  }
	}

	function _construct(Parent, args, Class) {
	  if (isNativeReflectConstruct()) {
	    _construct = Reflect.construct;
	  } else {
	    _construct = function _construct(Parent, args, Class) {
	      var a = [null];
	      a.push.apply(a, args);
	      var Constructor = Function.bind.apply(Parent, a);
	      var instance = new Constructor();
	      if (Class) _setPrototypeOf(instance, Class.prototype);
	      return instance;
	    };
	  }

	  return _construct.apply(null, arguments);
	}

	function _isNativeFunction(fn) {
	  return Function.toString.call(fn).indexOf("[native code]") !== -1;
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
	      return _construct(Class, arguments, _getPrototypeOf(this).constructor);
	    }

	    Wrapper.prototype = Object.create(Class.prototype, {
	      constructor: {
	        value: Wrapper,
	        enumerable: false,
	        writable: true,
	        configurable: true
	      }
	    });
	    return _setPrototypeOf(Wrapper, Class);
	  };

	  return _wrapNativeSuper(Class);
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

	function _slicedToArray(arr, i) {
	  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest();
	}

	function _toConsumableArray(arr) {
	  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread();
	}

	function _arrayWithoutHoles(arr) {
	  if (Array.isArray(arr)) {
	    for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

	    return arr2;
	  }
	}

	function _arrayWithHoles(arr) {
	  if (Array.isArray(arr)) return arr;
	}

	function _iterableToArray(iter) {
	  if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter);
	}

	function _iterableToArrayLimit(arr, i) {
	  if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) {
	    return;
	  }

	  var _arr = [];
	  var _n = true;
	  var _d = false;
	  var _e = undefined;

	  try {
	    for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
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

	function _nonIterableSpread() {
	  throw new TypeError("Invalid attempt to spread non-iterable instance");
	}

	function _nonIterableRest() {
	  throw new TypeError("Invalid attempt to destructure non-iterable instance");
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

	function _classStaticPrivateFieldSpecGet(receiver, classConstructor, descriptor) {
	  if (receiver !== classConstructor) {
	    throw new TypeError("Private static access of wrong provenance");
	  }

	  if (descriptor.get) {
	    return descriptor.get.call(receiver);
	  }

	  return descriptor.value;
	}

	function _classStaticPrivateFieldSpecSet(receiver, classConstructor, descriptor, value) {
	  if (receiver !== classConstructor) {
	    throw new TypeError("Private static access of wrong provenance");
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

	function _classPrivateMethodGet(receiver, privateSet, fn) {
	  if (!privateSet.has(receiver)) {
	    throw new TypeError("attempted to get private field on non-instance");
	  }

	  return fn;
	}

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

	var defineProperty$3 = objectDefineProperty.f;








	var fastKey = internalMetadata.fastKey;


	var setInternalState$4 = internalState.set;
	var internalStateGetterFor = internalState.getterFor;

	var collectionStrong = {
	  getConstructor: function (wrapper, CONSTRUCTOR_NAME, IS_MAP, ADDER) {
	    var C = wrapper(function (that, iterable) {
	      anInstance(that, C, CONSTRUCTOR_NAME);
	      setInternalState$4(that, {
	        type: CONSTRUCTOR_NAME,
	        index: objectCreate(null),
	        first: undefined,
	        last: undefined,
	        size: 0
	      });
	      if (!descriptors) that.size = 0;
	      if (iterable != undefined) iterate_1(iterable, that[ADDER], that, IS_MAP);
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
	    var getInternalCollectionState = internalStateGetterFor(CONSTRUCTOR_NAME);
	    var getInternalIteratorState = internalStateGetterFor(ITERATOR_NAME);
	    // add .keys, .values, .entries, [@@iterator]
	    // 23.1.3.4, 23.1.3.8, 23.1.3.11, 23.1.3.12, 23.2.3.5, 23.2.3.8, 23.2.3.10, 23.2.3.11
	    defineIterator(C, CONSTRUCTOR_NAME, function (iterated, kind) {
	      setInternalState$4(this, {
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

	var getWeakData = internalMetadata.getWeakData;








	var setInternalState$5 = internalState.set;
	var internalStateGetterFor$1 = internalState.getterFor;
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
	      setInternalState$5(that, {
	        type: CONSTRUCTOR_NAME,
	        id: id$1++,
	        frozen: undefined
	      });
	      if (iterable != undefined) iterate_1(iterable, that[ADDER], that, IS_MAP);
	    });

	    var getInternalState = internalStateGetterFor$1(CONSTRUCTOR_NAME);

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

	var Page =
	/*#__PURE__*/
	function (_EventHarness) {
	  _inherits(Page, _EventHarness);

	  function Page() {
	    var _getPrototypeOf2;

	    var _this;

	    _classCallCheck(this, Page);

	    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
	      args[_key] = arguments[_key];
	    }

	    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(Page)).call.apply(_getPrototypeOf2, [this].concat(args)));

	    _defineProperty(_assertThisInitialized(_this), "controller", void 0);

	    return _this;
	  }

	  _createClass(Page, [{
	    key: "initialise",

	    /**
	     * called once during late-stage app initialisation
	     * (NB this may not be the current view when called)
	     *
	     * an opportunity to register listeners on this.controller.app
	     */
	    value: function initialise() {} // /**
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

	var NotFoundView =
	/*#__PURE__*/
	function (_Page) {
	  _inherits(NotFoundView, _Page);

	  function NotFoundView() {
	    _classCallCheck(this, NotFoundView);

	    return _possibleConstructorReturn(this, _getPrototypeOf(NotFoundView).apply(this, arguments));
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

	var App =
	/*#__PURE__*/
	function (_EventHarness) {
	  _inherits(App, _EventHarness);

	  /**
	   * @type {Navigo}
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
	  function App() {
	    var _this;

	    _classCallCheck(this, App);

	    _this = _possibleConstructorReturn(this, _getPrototypeOf(App).call(this));

	    _router.set(_assertThisInitialized(_this), {
	      writable: true,
	      value: void 0
	    });

	    _containerEl.set(_assertThisInitialized(_this), {
	      writable: true,
	      value: void 0
	    });

	    _defineProperty(_assertThisInitialized(_this), "controllers", []);

	    _defineProperty(_assertThisInitialized(_this), "currentControllerHandle", false);

	    _defineProperty(_assertThisInitialized(_this), "routeHistory", []);

	    _defineProperty(_assertThisInitialized(_this), "occurrences", void 0);

	    _defineProperty(_assertThisInitialized(_this), "surveys", void 0);

	    _defineProperty(_assertThisInitialized(_this), "currentSurvey", void 0);

	    _defineProperty(_assertThisInitialized(_this), "layout", void 0);

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
	    key: "registerController",

	    /**
	     *
	     * @param {AppController} controller
	     */
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

	        _classPrivateFieldGet(_this2, _router).pause();

	        if (_this2.clearCurrentSurvey && _this2.currentSurvey.isPristine) {
	          _classPrivateFieldGet(_this2, _router).navigate('/list/survey/welcome').resume();
	        } else {
	          _classPrivateFieldGet(_this2, _router).navigate('/list').resume();
	        }

	        _classPrivateFieldGet(_this2, _router).resolve();
	      });

	      var _iteratorNormalCompletion = true;
	      var _didIteratorError = false;
	      var _iteratorError = undefined;

	      try {
	        for (var _iterator = this.controllers[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	          var controller = _step.value;
	          controller.initialise();
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
	      var _iteratorNormalCompletion2 = true;
	      var _didIteratorError2 = false;
	      var _iteratorError2 = undefined;

	      try {
	        for (var _iterator2 = this.occurrences[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
	          var occurrenceTuple = _step2.value;
	          occurrenceTuple[1].isPristine = false;
	        }
	      } catch (err) {
	        _didIteratorError2 = true;
	        _iteratorError2 = err;
	      } finally {
	        try {
	          if (!_iteratorNormalCompletion2 && _iterator2.return != null) {
	            _iterator2.return();
	          }
	        } finally {
	          if (_didIteratorError2) {
	            throw _iteratorError2;
	          }
	        }
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
	  }, {
	    key: "router",
	    set: function set(router) {
	      _classPrivateFieldSet(this, _router, router);
	    },
	    get: function get() {
	      return _classPrivateFieldGet(this, _router);
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
	  }]);

	  return App;
	}(EventHarness);

	var _router = new WeakMap();

	var _containerEl = new WeakMap();

	_defineProperty(App, "EVENT_ADD_SURVEY_USER_REQUEST", 'useraddsurveyrequest');

	_defineProperty(App, "EVENT_RESET_SURVEYS", 'userresetsurveys');

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

	// a string of all valid unicode whitespaces
	// eslint-disable-next-line max-len
	var whitespaces = '\u0009\u000A\u000B\u000C\u000D\u0020\u00A0\u1680\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF';

	var whitespace = '[' + whitespaces + ']';
	var ltrim = RegExp('^' + whitespace + whitespace + '*');
	var rtrim = RegExp(whitespace + whitespace + '*$');

	// `String.prototype.{ trim, trimStart, trimEnd, trimLeft, trimRight }` methods implementation
	var createMethod$3 = function (TYPE) {
	  return function ($this) {
	    var string = String(requireObjectCoercible($this));
	    if (TYPE & 1) string = string.replace(ltrim, '');
	    if (TYPE & 2) string = string.replace(rtrim, '');
	    return string;
	  };
	};

	var stringTrim = {
	  // `String.prototype.{ trimLeft, trimStart }` methods
	  // https://tc39.github.io/ecma262/#sec-string.prototype.trimstart
	  start: createMethod$3(1),
	  // `String.prototype.{ trimRight, trimEnd }` methods
	  // https://tc39.github.io/ecma262/#sec-string.prototype.trimend
	  end: createMethod$3(2),
	  // `String.prototype.trim` method
	  // https://tc39.github.io/ecma262/#sec-string.prototype.trim
	  trim: createMethod$3(3)
	};

	var non = '\u200B\u0085\u180E';

	// check that a method works with the correct list
	// of whitespaces and has a correct name
	var forcedStringTrimMethod = function (METHOD_NAME) {
	  return fails(function () {
	    return !!whitespaces[METHOD_NAME]() || non[METHOD_NAME]() != non || whitespaces[METHOD_NAME].name !== METHOD_NAME;
	  });
	};

	var $trim = stringTrim.trim;


	// `String.prototype.trim` method
	// https://tc39.github.io/ecma262/#sec-string.prototype.trim
	_export({ target: 'String', proto: true, forced: forcedStringTrimMethod('trim') }, {
	  trim: function trim() {
	    return $trim(this);
	  }
	});

	var max$1 = Math.max;
	var min$3 = Math.min;
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
	        var position = max$1(min$3(toInteger(result.index), S.length), 0);
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

	var FormField =
	/*#__PURE__*/
	function (_EventHarness) {
	  _inherits(FormField, _EventHarness);

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

	    _classCallCheck(this, FormField);

	    _this = _possibleConstructorReturn(this, _getPrototypeOf(FormField).call(this));

	    _defineProperty(_assertThisInitialized(_this), "_value", void 0);

	    _defineProperty(_assertThisInitialized(_this), "_fieldEl", void 0);

	    _defineProperty(_assertThisInitialized(_this), "label", 'field label');

	    _defineProperty(_assertThisInitialized(_this), "helpText", '');

	    _defineProperty(_assertThisInitialized(_this), "validationMessage", '');

	    _defineProperty(_assertThisInitialized(_this), "completion", FormField.COMPLETION_OPTIONAL);

	    _defineProperty(_assertThisInitialized(_this), "parentForm", void 0);

	    _defineProperty(_assertThisInitialized(_this), "attributeName", void 0);

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

	  }, {
	    key: "value",
	    get: function get() {
	      return this._value;
	    },
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

	  }], [{
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
	     * @param {{field : typeof FormField, summary : {}}} property properties of the form descriptor
	     * @param {{}} attributes attributes of the model object
	     * @returns {string}
	     */

	  }, {
	    key: "summariseImpl",
	    value: function summariseImpl(key, property, attributes) {
	      return '';
	    }
	  }, {
	    key: "nextId",
	    get: function get() {
	      var _FormField$fieldIdInd;

	      return "field".concat((_classStaticPrivateFieldSpecSet(FormField, FormField, _fieldIdIndex, (_FormField$fieldIdInd = +_classStaticPrivateFieldSpecGet(FormField, FormField, _fieldIdIndex)) + 1), _FormField$fieldIdInd));
	    }
	  }]);

	  return FormField;
	}(EventHarness);

	_defineProperty(FormField, "COMPLETION_COMPULSORY", 'compulsory');

	_defineProperty(FormField, "COMPLETION_DESIRED", 'desired');

	_defineProperty(FormField, "COMPLETION_OPTIONAL", 'optional');

	var _fieldIdIndex = {
	  writable: true,
	  value: 1
	};

	_defineProperty(FormField, "EVENT_CHANGE", 'fieldChange');

	var Form =
	/*#__PURE__*/
	function (_EventHarness) {
	  _inherits(Form, _EventHarness);

	  function Form() {
	    var _getPrototypeOf2;

	    var _this;

	    _classCallCheck(this, Form);

	    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
	      args[_key] = arguments[_key];
	    }

	    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(Form)).call.apply(_getPrototypeOf2, [this].concat(args)));

	    _formEl.set(_assertThisInitialized(_this), {
	      writable: true,
	      value: void 0
	    });

	    _defineProperty(_assertThisInitialized(_this), "_formId", void 0);

	    _defineProperty(_assertThisInitialized(_this), "_formContentContainer", void 0);

	    _defineProperty(_assertThisInitialized(_this), "fields", void 0);

	    _defineProperty(_assertThisInitialized(_this), "liveValidation", false);

	    _defineProperty(_assertThisInitialized(_this), "isValid", null);

	    return _this;
	  }

	  _createClass(Form, [{
	    key: "buildContentContainer",

	    /**
	     * sets this._formContentContainer to the container that should contain the form fields
	     *
	     * if no wrapper then can re-use the outer container id (this.#formEl
	     */
	    value: function buildContentContainer(outerContainer) {
	      this._formContentContainer = outerContainer; // default form doesn't have any inner liner elements

	      return this._formContentContainer;
	    }
	  }, {
	    key: "changeHandler",
	    value: function changeHandler(event) {
	      console.log('form change event');
	      console.log(arguments);
	    }
	  }, {
	    key: "destructor",
	    value: function destructor() {
	      _get(_getPrototypeOf(Form.prototype), "destructor", this).call(this);

	      _classPrivateFieldSet(this, _formEl, null);
	    }
	  }, {
	    key: "buildFormFields",

	    /**
	     *
	     */
	    value: function buildFormFields() {
	      this.initialiseFormFields();

	      for (var key in this.fields) {
	        if (this.fields.hasOwnProperty(key)) {
	          var field = this.fields[key];
	          field.parentForm = this;
	          field.attributeName = key;

	          this._formContentContainer.appendChild(field.fieldElement);

	          field.addListener(FormField.EVENT_CHANGE, this, this.changeHandler);
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
	        this.fireEvent(Form.EVENT_VALIDATION_STATE_CHANGE, this.isValid);
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
	  }, {
	    key: "formElement",

	    /**
	     *
	     * @returns {HTMLElement}
	     */
	    get: function get() {
	      var _this2 = this;

	      if (!_classPrivateFieldGet(this, _formEl)) {
	        var _Form$formSerial;

	        _classPrivateFieldSet(this, _formEl, document.createElement('form'));

	        _classPrivateFieldGet(this, _formEl).id = this._formId = "form".concat((_classStaticPrivateFieldSpecSet(Form, Form, _formSerial, (_Form$formSerial = +_classStaticPrivateFieldSpecGet(Form, Form, _formSerial)) + 1), _Form$formSerial));
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
	  }], [{
	    key: "nextId",
	    get: function get() {
	      var _Form$idIndex;

	      return "id".concat((_classStaticPrivateFieldSpecSet(Form, Form, _idIndex, (_Form$idIndex = +_classStaticPrivateFieldSpecGet(Form, Form, _idIndex)) + 1), _Form$idIndex));
	    }
	  }]);

	  return Form;
	}(EventHarness);

	var _formEl = new WeakMap();

	var _formSerial = {
	  writable: true,
	  value: 0
	};

	_defineProperty(Form, "EVENT_VALIDATION_STATE_CHANGE", 'validationstatechange');

	var _idIndex = {
	  writable: true,
	  value: 0
	};

	_defineProperty(Form, "COMPLETION_STATUS_UNSTARTED", 'unstarted');

	_defineProperty(Form, "COMPLETION_STATUS_COMPLETE", 'complete');

	_defineProperty(Form, "COMPLETION_STATUS_IN_PROGRESS", 'inProgress');

	var NyphSurveyForm =
	/*#__PURE__*/
	function (_Form) {
	  _inherits(NyphSurveyForm, _Form);

	  /**
	   * sections keyed by numerical order
	   *
	   * @type {Array.<typeof NyphSurveyFormSection>}
	   */

	  /**
	   *
	   * @type {{string, typeof NyphSurveyFormSection}}
	   */

	  /**
	   * @type {Survey}
	   */

	  /**
	   * @type {typeof NyphSurveyFormSection}
	   */

	  /**
	   *
	   * @param {typeof NyphSurveyFormSection} section
	   */
	  function NyphSurveyForm(section) {
	    var _this;

	    _classCallCheck(this, NyphSurveyForm);

	    _this = _possibleConstructorReturn(this, _getPrototypeOf(NyphSurveyForm).call(this));

	    _survey.set(_assertThisInitialized(_this), {
	      writable: true,
	      value: void 0
	    });

	    _defineProperty(_assertThisInitialized(_this), "_formFieldsBuilt", false);

	    _defineProperty(_assertThisInitialized(_this), "section", void 0);

	    _this.section = section;
	    return _this;
	  }
	  /**
	   *
	   * @returns {HTMLElement}
	   */


	  _createClass(NyphSurveyForm, [{
	    key: "updateModelFromContent",
	    value: function updateModelFromContent() {
	      console.log('updating survey from NyphSurveyForm content');

	      for (var key in this.fields) {
	        if (this.fields.hasOwnProperty(key)) {
	          var field = this.fields[key];
	          _classPrivateFieldGet(this, _survey).attributes[key] = field.value;
	        }
	      }

	      console.log({
	        survey: _classPrivateFieldGet(this, _survey)
	      });
	    }
	    /**
	     *
	     * @param {Survey} model
	     */

	  }, {
	    key: "changeHandler",

	    /**
	     * the change event triggers after a field has changed, before the value has been read back into the model
	     *
	     * @param event
	     */
	    value: function changeHandler(event) {
	      console.log('survey form change event');
	      console.log({
	        event: event
	      });
	      this.fireEvent(NyphSurveyForm.CHANGE_EVENT, {
	        form: this
	      });
	    }
	  }, {
	    key: "destructor",
	    value: function destructor() {
	      _get(_getPrototypeOf(NyphSurveyForm.prototype), "destructor", this).call(this);

	      _classPrivateFieldSet(this, _survey, null);
	    }
	    /**
	     *
	     * @param {typeof NyphSurveyFormSection} formClass
	     */

	  }, {
	    key: "initialiseFormFields",

	    /**
	     *
	     */
	    value: function initialiseFormFields() {
	      var properties = this.section.properties;
	      this.fields = {};

	      for (var key in properties) {
	        if (properties.hasOwnProperty(key)) {
	          // noinspection JSPotentiallyInvalidConstructorUsage
	          this.fields[key] = new properties[key].field(properties[key].attributes);
	        }
	      }
	    }
	  }, {
	    key: "getFormSectionProperties",
	    value: function getFormSectionProperties() {
	      return this.section.properties;
	    }
	  }, {
	    key: "formElement",
	    get: function get() {
	      var el = _get(_getPrototypeOf(NyphSurveyForm.prototype), "formElement", this);

	      if (!this._formFieldsBuilt) {
	        this.buildFormFields();
	      }

	      return el;
	    }
	  }, {
	    key: "model",
	    set: function set(model) {
	      _classPrivateFieldSet(this, _survey, model);

	      this.populateFormContent();
	    },
	    get: function get() {
	      return _classPrivateFieldGet(this, _survey);
	    }
	  }], [{
	    key: "registerSection",
	    value: function registerSection(formClass) {
	      NyphSurveyForm.sections[formClass.sectionSortOrder] = formClass;
	      NyphSurveyForm.sectionsByKey[formClass.sectionNavigationKey] = formClass;
	    }
	  }]);

	  return NyphSurveyForm;
	}(Form);

	var _survey = new WeakMap();

	_defineProperty(NyphSurveyForm, "sections", []);

	_defineProperty(NyphSurveyForm, "sectionsByKey", {});

	NyphSurveyForm.CHANGE_EVENT = 'change';

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

	var Survey =
	/*#__PURE__*/
	function (_Model) {
	  _inherits(Survey, _Model);

	  function Survey() {
	    var _getPrototypeOf2;

	    var _this;

	    _classCallCheck(this, Survey);

	    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
	      args[_key] = arguments[_key];
	    }

	    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(Survey)).call.apply(_getPrototypeOf2, [this].concat(args)));

	    _defineProperty(_assertThisInitialized(_this), "SAVE_ENDPOINT", '/savesurvey.php');

	    _defineProperty(_assertThisInitialized(_this), "TYPE", 'survey');

	    _defineProperty(_assertThisInitialized(_this), "attributes", {});

	    return _this;
	  }

	  _createClass(Survey, [{
	    key: "formChangedHandler",

	    /**
	     * called after the form has changed, before the values have been read back in to the occurrence
	     *
	     * @param context
	     * @param {string} eventName
	     * @param {{form: NyphSurveyForm}} params
	     */
	    value: function formChangedHandler(context, eventName, params) {
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
	     * @param {NyphSurveyForm} form
	     */

	  }, {
	    key: "registerForm",
	    value: function registerForm(form) {
	      form.model = this;
	      form.addListener(NyphSurveyForm.CHANGE_EVENT, this, this.formChangedHandler);
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

	_defineProperty(Survey, "EVENT_MODIFIED", 'modified');

	var TaxonError =
	/*#__PURE__*/
	function (_Error) {
	  _inherits(TaxonError, _Error);

	  function TaxonError() {
	    _classCallCheck(this, TaxonError);

	    return _possibleConstructorReturn(this, _getPrototypeOf(TaxonError).apply(this, arguments));
	  }

	  return TaxonError;
	}(_wrapNativeSuper(Error));

	var Taxon =
	/*#__PURE__*/
	function () {
	  function Taxon() {
	    _classCallCheck(this, Taxon);

	    _defineProperty(this, "id", void 0);

	    _defineProperty(this, "nameString", '');

	    _defineProperty(this, "canonical", '');

	    _defineProperty(this, "hybridCanonical", '');

	    _defineProperty(this, "acceptedEntityId", '');

	    _defineProperty(this, "qualifier", '');

	    _defineProperty(this, "authority", '');

	    _defineProperty(this, "vernacular", '');

	    _defineProperty(this, "vernacularRoot", '');

	    _defineProperty(this, "used", void 0);

	    _defineProperty(this, "sortOrder", void 0);

	    _defineProperty(this, "parentIds", []);
	  }

	  _createClass(Taxon, [{
	    key: "formattedHTML",

	    /**
	     *
	     * @param {boolean} vernacularMatched
	     * @returns {string}
	     */
	    value: function formattedHTML(vernacularMatched) {
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

	    /**
	     *
	     * @param {string} id
	     * @returns {Taxon}
	     * @throws {TaxonError}
	     */
	    value: function fromId(id) {
	      if (!Taxon.rawTaxa) {
	        // may not yet have been initialised due to deferred loading
	        if (BsbiDb$1.TaxonNames) {
	          Taxon.rawTaxa = BsbiDb$1.TaxonNames;
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

	_defineProperty(Taxon, "rawTaxa", BsbiDb$1.TaxonNames);

	_defineProperty(Taxon, "showVernacular", true);

	var $find = arrayIteration.find;


	var FIND = 'find';
	var SKIPS_HOLES = true;

	// Shouldn't skip holes
	if (FIND in []) Array(1)[FIND](function () { SKIPS_HOLES = false; });

	// `Array.prototype.find` method
	// https://tc39.github.io/ecma262/#sec-array.prototype.find
	_export({ target: 'Array', proto: true, forced: SKIPS_HOLES }, {
	  find: function find(callbackfn /* , that = undefined */) {
	    return $find(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
	  }
	});

	// https://tc39.github.io/ecma262/#sec-array.prototype-@@unscopables
	addToUnscopables(FIND);

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

	var $trimStart = stringTrim.start;


	var FORCED$2 = forcedStringTrimMethod('trimStart');

	var trimStart = FORCED$2 ? function trimStart() {
	  return $trimStart(this);
	} : ''.trimStart;

	// `String.prototype.{ trimStart, trimLeft }` methods
	// https://github.com/tc39/ecmascript-string-left-right-trim
	_export({ target: 'String', proto: true, forced: FORCED$2 }, {
	  trimStart: trimStart,
	  trimLeft: trimStart
	});

	// `WeakSet` constructor
	// https://tc39.github.io/ecma262/#sec-weakset-constructor
	collection('WeakSet', function (get) {
	  return function WeakSet() { return get(this, arguments.length ? arguments[0] : undefined); };
	}, collectionWeak, false, true);

	var $indexOf = arrayIncludes.indexOf;


	var nativeIndexOf = [].indexOf;

	var NEGATIVE_ZERO = !!nativeIndexOf && 1 / [1].indexOf(1, -0) < 0;
	var SLOPPY_METHOD$1 = sloppyArrayMethod('indexOf');

	// `Array.prototype.indexOf` method
	// https://tc39.github.io/ecma262/#sec-array.prototype.indexof
	_export({ target: 'Array', proto: true, forced: NEGATIVE_ZERO || SLOPPY_METHOD$1 }, {
	  indexOf: function indexOf(searchElement /* , fromIndex = 0 */) {
	    return NEGATIVE_ZERO
	      // convert -0 to +0
	      ? nativeIndexOf.apply(this, arguments) || 0
	      : $indexOf(this, searchElement, arguments.length > 1 ? arguments[1] : undefined);
	  }
	});

	var SPECIES$6 = wellKnownSymbol('species');
	var nativeSlice = [].slice;
	var max$2 = Math.max;

	// `Array.prototype.slice` method
	// https://tc39.github.io/ecma262/#sec-array.prototype.slice
	// fallback for not array-like ES3 strings and DOM objects
	_export({ target: 'Array', proto: true, forced: !arrayMethodHasSpeciesSupport('slice') }, {
	  slice: function slice(start, end) {
	    var O = toIndexedObject(this);
	    var length = toLength(O.length);
	    var k = toAbsoluteIndex(start, length);
	    var fin = toAbsoluteIndex(end === undefined ? length : end, length);
	    // inline `ArraySpeciesCreate` for usage native `Array#slice` where it's possible
	    var Constructor, result, n;
	    if (isArray(O)) {
	      Constructor = O.constructor;
	      // cross-realm fallback
	      if (typeof Constructor == 'function' && (Constructor === Array || isArray(Constructor.prototype))) {
	        Constructor = undefined;
	      } else if (isObject(Constructor)) {
	        Constructor = Constructor[SPECIES$6];
	        if (Constructor === null) Constructor = undefined;
	      }
	      if (Constructor === Array || Constructor === undefined) {
	        return nativeSlice.call(O, k, fin);
	      }
	    }
	    result = new (Constructor === undefined ? Array : Constructor)(max$2(fin - k, 0));
	    for (n = 0; k < fin; k++, n++) if (k in O) createProperty(result, n, O[k]);
	    result.length = n;
	    return result;
	  }
	});

	var nativeSort = [].sort;
	var test$1 = [1, 2, 3];

	// IE8-
	var FAILS_ON_UNDEFINED = fails(function () {
	  test$1.sort(undefined);
	});
	// V8 bug
	var FAILS_ON_NULL = fails(function () {
	  test$1.sort(null);
	});
	// Old WebKit
	var SLOPPY_METHOD$2 = sloppyArrayMethod('sort');

	var FORCED$3 = FAILS_ON_UNDEFINED || !FAILS_ON_NULL || SLOPPY_METHOD$2;

	// `Array.prototype.sort` method
	// https://tc39.github.io/ecma262/#sec-array.prototype.sort
	_export({ target: 'Array', proto: true, forced: FORCED$3 }, {
	  sort: function sort(comparefn) {
	    return comparefn === undefined
	      ? nativeSort.call(toObject(this))
	      : nativeSort.call(toObject(this), aFunction$1(comparefn));
	  }
	});

	var max$3 = Math.max;
	var min$4 = Math.min;
	var MAX_SAFE_INTEGER$1 = 0x1FFFFFFFFFFFFF;
	var MAXIMUM_ALLOWED_LENGTH_EXCEEDED = 'Maximum allowed length exceeded';

	// `Array.prototype.splice` method
	// https://tc39.github.io/ecma262/#sec-array.prototype.splice
	// with adding support of @@species
	_export({ target: 'Array', proto: true, forced: !arrayMethodHasSpeciesSupport('splice') }, {
	  splice: function splice(start, deleteCount /* , ...items */) {
	    var O = toObject(this);
	    var len = toLength(O.length);
	    var actualStart = toAbsoluteIndex(start, len);
	    var argumentsLength = arguments.length;
	    var insertCount, actualDeleteCount, A, k, from, to;
	    if (argumentsLength === 0) {
	      insertCount = actualDeleteCount = 0;
	    } else if (argumentsLength === 1) {
	      insertCount = 0;
	      actualDeleteCount = len - actualStart;
	    } else {
	      insertCount = argumentsLength - 2;
	      actualDeleteCount = min$4(max$3(toInteger(deleteCount), 0), len - actualStart);
	    }
	    if (len + insertCount - actualDeleteCount > MAX_SAFE_INTEGER$1) {
	      throw TypeError(MAXIMUM_ALLOWED_LENGTH_EXCEEDED);
	    }
	    A = arraySpeciesCreate(O, actualDeleteCount);
	    for (k = 0; k < actualDeleteCount; k++) {
	      from = actualStart + k;
	      if (from in O) createProperty(A, k, O[from]);
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

	var defineProperty$4 = objectDefineProperty.f;
	var getOwnPropertyNames = objectGetOwnPropertyNames.f;







	var MATCH$2 = wellKnownSymbol('match');
	var NativeRegExp = global_1.RegExp;
	var RegExpPrototype$1 = NativeRegExp.prototype;
	var re1 = /a/g;
	var re2 = /a/g;

	// "new" should create a new object, old webkit bug
	var CORRECT_NEW = new NativeRegExp(re1) !== re1;

	var FORCED$4 = descriptors && isForced_1('RegExp', (!CORRECT_NEW || fails(function () {
	  re2[MATCH$2] = false;
	  // RegExp constructor can alter flags and IsRegExp works correct with @@match
	  return NativeRegExp(re1) != re1 || NativeRegExp(re2) == re2 || NativeRegExp(re1, 'i') != '/a/i';
	})));

	// `RegExp` constructor
	// https://tc39.github.io/ecma262/#sec-regexp-constructor
	if (FORCED$4) {
	  var RegExpWrapper = function RegExp(pattern, flags) {
	    var thisIsRegExp = this instanceof RegExpWrapper;
	    var patternIsRegExp = isRegexp(pattern);
	    var flagsAreUndefined = flags === undefined;
	    return !thisIsRegExp && patternIsRegExp && pattern.constructor === RegExpWrapper && flagsAreUndefined ? pattern
	      : inheritIfRequired(CORRECT_NEW
	        ? new NativeRegExp(patternIsRegExp && !flagsAreUndefined ? pattern.source : pattern, flags)
	        : NativeRegExp((patternIsRegExp = pattern instanceof RegExpWrapper)
	          ? pattern.source
	          : pattern, patternIsRegExp && flagsAreUndefined ? regexpFlags.call(pattern) : flags)
	      , thisIsRegExp ? this : RegExpPrototype$1, RegExpWrapper);
	  };
	  var proxy = function (key) {
	    key in RegExpWrapper || defineProperty$4(RegExpWrapper, key, {
	      configurable: true,
	      get: function () { return NativeRegExp[key]; },
	      set: function (it) { NativeRegExp[key] = it; }
	    });
	  };
	  var keys$1 = getOwnPropertyNames(NativeRegExp);
	  var index = 0;
	  while (keys$1.length > index) proxy(keys$1[index++]);
	  RegExpPrototype$1.constructor = RegExpWrapper;
	  RegExpWrapper.prototype = RegExpPrototype$1;
	  redefine(global_1, 'RegExp', RegExpWrapper);
	}

	// https://tc39.github.io/ecma262/#sec-get-regexp-@@species
	setSpecies('RegExp');

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

	var TaxonSearch =
	/*#__PURE__*/
	function () {
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
	    _classCallCheck(this, TaxonSearch);

	    _defineProperty(this, "minimumRankSort", null);

	    _defineProperty(this, "requireExtantDDbRecords", false);

	    _defineProperty(this, "skipJunk", true);

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
	    value: function lookup(query) {
	      // var timeStart = Date.now(); //track search time
	      var results,
	          testTaxon,
	          taxonString = TaxonSearch.normaliseTaxonName(decodeURIComponent(query).trim()),
	          canonical,
	          matchedIds = {},
	          id,
	          preferHybrids = / x\b/.test(taxonString); // ignore trailing ' x' from string which would just muck up result matching

	      taxonString = taxonString.replace(/\s+x$/i, '');

	      if (taxonString !== '') {
	        // TaxonSearch.abbreviatedGenusRegex = /^(X\s+)?([a-z])[\.\s]+(.*?)$/i;
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

	          for (id in Taxon.rawTaxa) {
	            testTaxon = Taxon.rawTaxa[id];
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
	            for (id in Taxon.rawTaxa) {
	              testTaxon = Taxon.rawTaxa[id];
	              canonical = testTaxon[TaxonSearch.canonicalColumn] === 0 ? testTaxon[TaxonSearch.nameStringColumn] : testTaxon[TaxonSearch.canonicalColumn];

	              if ( // testTaxon[TaxonSearch.nameStringColumn].search(escapedTaxonStringRegExp) !== -1 ||
	              canonicalQueryRegExp.test(testTaxon[TaxonSearch.nameStringColumn]) || canonical !== testTaxon[TaxonSearch.nameStringColumn] && canonicalQueryRegExp.test(canonical) // testTaxon[TaxonSearch.nameStringColumn].search(hybridCanonicalQueryregExp) !== -1
	              ) {
	                  matchedIds[id] = {
	                    exact: testTaxon[TaxonSearch.nameStringColumn] == taxonString
	                  };
	                }
	            }

	            results = this.compile_results(matchedIds, preferHybrids);
	          } else {
	            var caseInsensitiveEscapedTaxonRegex = new RegExp(strictEscapedTaxonString, 'i');

	            for (id in Taxon.rawTaxa) {
	              testTaxon = Taxon.rawTaxa[id];
	              canonical = testTaxon[TaxonSearch.canonicalColumn] === 0 ? testTaxon[TaxonSearch.nameStringColumn] : testTaxon[TaxonSearch.canonicalColumn];

	              if ( // testTaxon[TaxonSearch.nameStringColumn].search(escapedTaxonStringRegExp) !== -1 ||
	              canonicalQueryRegExp.test(testTaxon[TaxonSearch.nameStringColumn]) || canonical !== testTaxon[TaxonSearch.nameStringColumn] && canonicalQueryRegExp.test(canonical) // testTaxon[TaxonSearch.nameStringColumn].search(hybridCanonicalQueryregExp) !== -1
	              ) {
	                  matchedIds[id] = {
	                    exact: testTaxon[TaxonSearch.nameStringColumn] == taxonString,
	                    near: nearMatchRegex.test(testTaxon[TaxonSearch.nameStringColumn]) || nearMatchRegex.test(canonical)
	                  };
	                } else if (caseInsensitiveEscapedTaxonRegex.test(testTaxon[TaxonSearch.vernacularColumn]) || caseInsensitiveEscapedTaxonRegex.test(testTaxon[TaxonSearch.vernacularRootColumn])) {
	                matchedIds[id] = {
	                  exact: testTaxon[TaxonSearch.nameStringColumn] == taxonString,
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

	              for (id in Taxon.rawTaxa) {
	                if (!matchedIds.hasOwnProperty(id)) {
	                  testTaxon = Taxon.rawTaxa[id];

	                  if (broadRegExp.test(testTaxon[TaxonSearch.nameStringColumn])) {
	                    matchedIds[id] = {
	                      exact: testTaxon[TaxonSearch.nameStringColumn] === taxonString
	                    };
	                  } else if (testTaxon[TaxonSearch.canonicalColumn] !== 0 && broadRegExp.test(testTaxon[TaxonSearch.canonicalColumn]) || broadRegExp.test(testTaxon[TaxonSearch.vernacularColumn])) {
	                    matchedIds[id] = {
	                      exact: testTaxon[TaxonSearch.nameStringColumn] === taxonString,
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

	    /**
	     *
	     * @param {string} taxonString
	     * @returns {string}
	     */
	    value: function normaliseTaxonName(taxonString) {
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

	    /**
	     * generate hybrid name permutations
	     *
	     * @param {string} names unescaped series of species e.g. "glandulifera" or "carex x nigra"
	     * @returns {string} name permutations formatted as a regular expression
	     */
	    value: function generate_hybrid_combinations_regex(names) {
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

	_defineProperty(TaxonSearch, "showVernacular", true);

	_defineProperty(TaxonSearch, "MIN_SEARCH_LENGTH", 2);

	_defineProperty(TaxonSearch, "MAXIMUM_RESULTS", 25);

	_defineProperty(TaxonSearch, "abbreviatedGenusRegex", /^(X\s+)?([a-z])[.\s]+(.*?)$/i);

	_defineProperty(TaxonSearch, "nameStringColumn", 0);

	_defineProperty(TaxonSearch, "canonicalColumn", 1);

	_defineProperty(TaxonSearch, "hybridCanonicalColumn", 2);

	_defineProperty(TaxonSearch, "acceptedEntityIdColumn", 3);

	_defineProperty(TaxonSearch, "qualifierColumn", 4);

	_defineProperty(TaxonSearch, "authorityColumn", 5);

	_defineProperty(TaxonSearch, "vernacularColumn", 6);

	_defineProperty(TaxonSearch, "vernacularRootColumn", 7);

	_defineProperty(TaxonSearch, "usedColumn", 8);

	_defineProperty(TaxonSearch, "minRankColumn", 9);

	_defineProperty(TaxonSearch, "taxonRankNameSearchRegex", [/\s+sub-?g(?:en(?:us)?)?[.\s]+/i, /\s+sect(?:ion)?[.\s]+/i, /\s+subsect(?:ion)?[.\s]+/i, /\s+ser(?:ies)?[.\s]+/i, /\s+gp[.\s]+/i, /\s+s(?:ub)?-?sp(?:ecies)?[.\s]+/i, /\s+morphotype\s+/i, /\s+var[.\s]+/i, /\s+cv[.\s]+/i, /\s+n(?:otho)?v(?:ar)?[.\s]+/i, /\s+f[.\s]+|\s+forma?\s+/i, /\s+n(?:otho)?ssp[.\s]+/i]);

	_defineProperty(TaxonSearch, "taxonRankNameReplacement", [' subg. ', ' sect. ', ' subsect. ', ' ser. ', ' group ', ' subsp. ', ' morph. ', ' var. ', ' cv. ', // ddb preference is for single quotes for cultivars
	' nothovar. ', ' f. ', ' nothosubsp. ']);

	_defineProperty(TaxonSearch, "cleanRankNamesRegex", /\s(subfam\.|subg\.|sect\.|subsect\.|ser\.|subser\.|subsp\.|nothosubsp\.|microsp\.|praesp\.|agsp\.|race|convar\.|nm\.|microgene|f\.|subvar\.|var\.|nothovar\.|cv\.|sublusus|taxon|morph\.|group|sp\.)\s/);

	_defineProperty(TaxonSearch, "taxonQualifierSearchRegex", [/\s*\(?\bf\s*x\s*m or m\s*x\s*f\)?\s*$/i, /\s*\(?\bm\s*x\s*f or f\s*x\s*m\)?\s*$/i, // '/\b\s*\(?f\s*x\s*m\)?\s*$/i',
	// '/\b\s*\(?m\s*x\s*f\)?\s*$/i',
	/\s*\(?\bf\s*x\s*m\)?\s*$/i, /\s*\(?\bm\s*x\s*f\)?\s*$/i, // '/\b\s*\(?female\s*x\s*male\)?\s*$/i',
	// '/\b\s*\(?male\s*x\s*female\)?\s*$/i',
	/\s*\(?\bfemale\s*x\s*male\)?\s*$/i, /\s*\(?\bmale\s*x\s*female\)?\s*$/i, // stand-alone male/female qualifier (e.g. applied to Petasites hybridus)
	// removes single quotes
	/\s*'male'\s*$/i, /\s*'female'\s*$/i, // mid-string ss/sl qualifiers
	/\b\s*sens\.?\s*lat[.\s]+/i, /\b\s*s\.\s*lat\.?\s*\b/i, /\b\s*s\.?\s*l\.?\s+\b/i, /\b\s*sensu\s*lato\s+\b|\(\s*sensu\s*lato\s*\)/i, /\b\s*sensu\s*stricto\s+\b|\(\s*sensu\s*stricto\s*\)/i, /\b\s*sens\.?\s*strict[.\s]+/i, // '/\b\s*sens\.?\s*str\.?\s*(?=\))|\b\s*sens\.?\s*str\.?\s*\b/i', // the first look-ahead option matches before a closing-paren (\b fails between '.)' )
	/\b\s*sens\.?\s*str\.?\s*(?=\))|\b\s*sens\.?\s*str[.\s]+/i, // '/\b\s*s\.\s*str\.?\s*\b/i',
	/\b\s*s\.\s*str[.\s]+/i, /\b\s*s\.?\s*s\.?\s+\b/i, // end-of-string ss/sl qualifiers
	/\b\s*sens\.?\s*lat\.?\s*$/i, /\b\s*s\.\s*lat\.?\s*$/i, /\b\s*s\.?\s*l\.?\s*$/i, /\b\s*sensu\s*lato\s*$/i, /\b\s*sensu\s*stricto\s*$/i, /\b\s*sens\.?\s*strict\.?\s*$/i, /\b\s*sens\.?\s*str\.?\s*$/i, /\b\s*s\.\s*str\.?\s*$/i, /\b\s*s\.?\s*s\.?\s*$/i, /\b\s*agg\.?\s*$/i, /\b\s*aggregate\s*$/i, /\b\s*sp\.?\s*cultivar\s*$/i, /\b\s*sp\.?\s*cv\.?\s*$/i, /\b\s*cultivars?\s*$/i, /\b\s*cv\s+$/i, /\b\s*cv$/i, /\b\s*cf\s*$/i, /\b\s*aff\s*$/i, /\b\s*s\.?n\.?\s*$/i, /\b\s*sp\.?\s*nov\.?\s*$/i, /\b\s*auct[.\s]*$/i, /\b\s*ined[.\s]*$/i, /\b\s*nom\.?\snud[.\s]*$/i, /\b\s*p\.p[.\s?]*$/i, /\b\s*spp?\.?[\s?]*$/i, /\b\s*species\s*$/i, /\b\s*spp?\.?\s*\(/i, // catch e.g. Ulmus sp. (excluding Ulmus glabra)
	/\b\s*species\s*\(/i]);

	_defineProperty(TaxonSearch, "taxonQualifierReplacement", [' ', // (f x m or m x f) is the default so an explicit qualifier isn't used
	' ', // (m x f or f x m) is the default so an explicit qualifier isn't used
	' (f x m)', ' (m x f)', ' (f x m)', ' (m x f)', // stand-alone male/female qualifier (e.g. applied to Petasites hybridus)
	// removed single quotes
	' male', ' female', // mid-string ss/sl qualifiers
	' s.l. ', ' s.l. ', ' s.l. ', ' s.l. ', ' s.s. ', ' s.s. ', ' s.s. ', ' s.s. ', ' s.s. ', // end-of-string ss/sl qualifiers
	' s.l.', ' s.l.', ' s.l.', ' s.l.', ' s.s.', ' s.s.', ' s.s.', ' s.s.', ' s.s.', ' agg.', ' agg.', ' cv. ', ' cv. ', ' cv. ', ' cv. ', ' cv. ', ' cf.', ' aff.', ' sp.nov.', ' sp.nov.', ' auct.', ' ined.', ' nom. nud.', ' pro parte', '', '', ' (', ' (']);

	_defineProperty(TaxonSearch, "cleanRegex", /[.*+?^${}()|[\]\\]/g);

	var TaxonPickerField =
	/*#__PURE__*/
	function (_FormField) {
	  _inherits(TaxonPickerField, _FormField);

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

	    _classCallCheck(this, TaxonPickerField);

	    _this = _possibleConstructorReturn(this, _getPrototypeOf(TaxonPickerField).call(this, params));

	    _triggerQuery.add(_assertThisInitialized(_this));

	    _defineProperty(_assertThisInitialized(_this), "taxonSearch", void 0);

	    _inputFieldId.set(_assertThisInitialized(_this), {
	      writable: true,
	      value: void 0
	    });

	    _dropDownListDivId.set(_assertThisInitialized(_this), {
	      writable: true,
	      value: void 0
	    });

	    _dropDownListUlId.set(_assertThisInitialized(_this), {
	      writable: true,
	      value: void 0
	    });

	    _containerId.set(_assertThisInitialized(_this), {
	      writable: true,
	      value: void 0
	    });

	    _taxonLookupTimeoutHandle.set(_assertThisInitialized(_this), {
	      writable: true,
	      value: null
	    });

	    _changeEventTimeout.set(_assertThisInitialized(_this), {
	      writable: true,
	      value: null
	    });

	    _selectedIndex.set(_assertThisInitialized(_this), {
	      writable: true,
	      value: null
	    });

	    _defineProperty(_assertThisInitialized(_this), "_lastInputValue", '');

	    _searchResults.set(_assertThisInitialized(_this), {
	      writable: true,
	      value: []
	    });

	    _defineProperty(_assertThisInitialized(_this), "_value", {
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

	      _classPrivateFieldSet(this, _containerId, container.id = FormField.nextId);

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
	        _classPrivateMethodGet(this, _triggerQuery, _triggerQuery2).call(this, event.target);
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
	        _classPrivateMethodGet(this, _triggerQuery, _triggerQuery2).call(this, event.target); // let text = TaxonPickerField.cleanRawInput(event.target);
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

	    /**
	     *
	     * @param {Event} event
	     */
	    value: function focusHandler(event) {
	      console.log('focused');
	      var dropDownEl = document.getElementById(_classPrivateFieldGet(this, _dropDownListDivId)); //const container = document.getElementById(this.#containerId);

	      if (!dropDownEl.classList.contains('dropdown-focused')) {
	        // refresh dropdown list when first focused
	        // focus event will re-fire after click on link in dropdown potentially disrupting subsequent click
	        // it is important that the query is not re-run if already focused.
	        var inputEl = document.getElementById(_classPrivateFieldGet(this, _inputFieldId));

	        _classPrivateMethodGet(this, _triggerQuery, _triggerQuery2).call(this, inputEl);

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
	        var _iteratorNormalCompletion = true;
	        var _didIteratorError = false;
	        var _iteratorError = undefined;

	        try {
	          for (var _iterator = _classPrivateFieldGet(this, _searchResults)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	            var result = _step.value;
	            htmlResults[htmlResults.length] = "<a class=\"list-group-item list-group-item-action\" href=\"#\" data-occurrenceId=\"".concat(result.entityId, "\" data-resultnumber=\"").concat(n, "\">").concat(TaxonSearch.formatter(result), "</a>");
	            ++n;
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

	    /**
	     *
	     * @param {MouseEvent} event
	     */
	    value: function dropboxClickHandler(event) {
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
	  }, {
	    key: "value",
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
	    /**
	     *
	     * @returns {{taxonName: string, taxonId: string, vernacularMatch: boolean}}
	     */
	    ,
	    get: function get() {
	      return this._value;
	    }
	    /**
	     *
	     * @param {({taxonName: string, taxonId: string, vernacularMatch: boolean}|null)} value
	     * @returns {boolean}
	     */

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

	var _inputFieldId = new WeakMap();

	var _dropDownListDivId = new WeakMap();

	var _dropDownListUlId = new WeakMap();

	var _containerId = new WeakMap();

	var _taxonLookupTimeoutHandle = new WeakMap();

	var _changeEventTimeout = new WeakMap();

	var _selectedIndex = new WeakMap();

	var _searchResults = new WeakMap();

	var _triggerQuery = new WeakSet();

	_defineProperty(TaxonPickerField, "timeoutDelay", 50);

	var _triggerQuery2 = function _triggerQuery2(inputEl) {
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
	};

	var defineProperty$5 = objectDefineProperty.f;

	var FunctionPrototype = Function.prototype;
	var FunctionPrototypeToString = FunctionPrototype.toString;
	var nameRE = /^\s*function ([^ (]*)/;
	var NAME = 'name';

	// Function instances `.name` property
	// https://tc39.github.io/ecma262/#sec-function-instances-name
	if (descriptors && !(NAME in FunctionPrototype)) {
	  defineProperty$5(FunctionPrototype, NAME, {
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

	var TextAreaField =
	/*#__PURE__*/
	function (_FormField) {
	  _inherits(TextAreaField, _FormField);

	  /**
	   * @type {string}
	   */

	  /**
	   * @type {string}
	   */

	  /**
	   *
	   * @type {string}
	   * @private
	   */

	  /**
	   *
	   * @type {string}
	   * @private
	   */

	  /**
	   *
	   * @param {{[label] : string, [helpText]: string, [options]: {}, [placeholder]: string, [type]: string, [autocomplete]: string}} [params]
	   */
	  function TextAreaField(params) {
	    var _this;

	    _classCallCheck(this, TextAreaField);

	    _this = _possibleConstructorReturn(this, _getPrototypeOf(TextAreaField).call(this, params));

	    _textAreaId.set(_assertThisInitialized(_this), {
	      writable: true,
	      value: void 0
	    });

	    _containerId$1.set(_assertThisInitialized(_this), {
	      writable: true,
	      value: void 0
	    });

	    _defineProperty(_assertThisInitialized(_this), "_value", '');

	    _defineProperty(_assertThisInitialized(_this), "_autocomplete", '');

	    if (params) {
	      if (params.options) {
	        _this.options = params.options;
	      }

	      if (params.placeholder) {
	        _this.placeholder = params.placeholder;
	      }

	      if (params.autocomplete) {
	        _this._autocomplete = params.autocomplete;
	      }
	    }

	    return _this;
	  }
	  /**
	   *
	   * @param {(string|null|undefined)} textContent
	   */


	  _createClass(TextAreaField, [{
	    key: "updateView",
	    value: function updateView() {
	      if (this._fieldEl) {
	        // do nothing until the view has been constructed
	        var textAreaEl = document.getElementById(_classPrivateFieldGet(this, _textAreaId));
	        textAreaEl.value = FormField.cleanRawString(this._value);
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
	      // <div class="form-group">
	      //     <label for="exampleFormControlTextarea1">Example textarea</label>
	      //     <textarea class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
	      // </div>
	      var container = document.createElement('div');
	      container.className = 'form-group';

	      _classPrivateFieldSet(this, _containerId$1, container.id = FormField.nextId);

	      _classPrivateFieldSet(this, _textAreaId, FormField.nextId);

	      var labelEl = container.appendChild(document.createElement('label'));
	      labelEl.htmlFor = _classPrivateFieldGet(this, _textAreaId);
	      labelEl.textContent = this.label;
	      var textareaField = container.appendChild(document.createElement('textarea'));
	      textareaField.className = "form-control";
	      textareaField.id = _classPrivateFieldGet(this, _textAreaId);

	      if (this.helpText) {
	        var helpTextField = container.appendChild(document.createElement('small'));
	        helpTextField.innerHTML = this.helpText;
	      }

	      if (this._autocomplete) {
	        textareaField.autocomplete = this._autocomplete;

	        if ('off' === this._autocomplete) {
	          textareaField.name = uuid();
	        }
	      }

	      if (this.validationMessage) {
	        var validationMessageElement = container.appendChild(document.createElement('div'));
	        validationMessageElement.className = 'invalid-feedback';
	        validationMessageElement.innerHTML = this.validationMessage;
	      }

	      textareaField.addEventListener('change', this.inputChangeHandler.bind(this));
	      this._fieldEl = container;
	    }
	  }, {
	    key: "inputChangeHandler",
	    value: function inputChangeHandler(event) {
	      event.stopPropagation(); // don't allow the change event to reach the form-level event handler (will handle it here instead)

	      console.log('got text area field input change event');
	      this.value = FormField.cleanRawString(document.getElementById(_classPrivateFieldGet(this, _textAreaId)).value);
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

	  }, {
	    key: "value",
	    set: function set(textContent) {
	      this._value = undefined === textContent || null == textContent ? '' : textContent.trim();
	      this.updateView();
	    },
	    get: function get() {
	      return this._value;
	    }
	  }], [{
	    key: "summariseImpl",
	    value: function summariseImpl(key, property, attributes) {
	      return attributes[key] !== '' && attributes[key] !== null && attributes[key] !== undefined ? escapeHTML(attributes[key].trim()) : '';
	    }
	  }]);

	  return TextAreaField;
	}(FormField);

	var _textAreaId = new WeakMap();

	var _containerId$1 = new WeakMap();

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

	/**
	 * used for option-based selections, allowing multiple choices, with optional 'other' field that exposes a text field
	 */

	var OptionsField =
	/*#__PURE__*/
	function (_FormField) {
	  _inherits(OptionsField, _FormField);

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

	    _classCallCheck(this, OptionsField);

	    _this = _possibleConstructorReturn(this, _getPrototypeOf(OptionsField).call(this, params));

	    _buildOption.add(_assertThisInitialized(_this));

	    _containerId$2.set(_assertThisInitialized(_this), {
	      writable: true,
	      value: void 0
	    });

	    _otherTextId.set(_assertThisInitialized(_this), {
	      writable: true,
	      value: void 0
	    });

	    _defineProperty(_assertThisInitialized(_this), "options", {});

	    _defineProperty(_assertThisInitialized(_this), "includeOtherFreeText", true);

	    _defineProperty(_assertThisInitialized(_this), "_value", {
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
	    key: "updateView",
	    value: function updateView() {
	      if (this._fieldEl) {
	        // do nothing until the view has been constructed
	        var _iteratorNormalCompletion = true;
	        var _didIteratorError = false;
	        var _iteratorError = undefined;

	        try {
	          for (var _iterator = document.querySelectorAll("".concat(_classStaticPrivateFieldSpecGet(OptionsField, OptionsField, _TOP_LEVEL_ELEMENT), "#").concat(_classPrivateFieldGet(this, _containerId$2), " input[type=\"checkbox\"]"))[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	            var optionEl = _step.value;

	            var selected = optionEl.checked = this._value.selection.includes(optionEl.name);

	            if (optionEl.name === OptionsField.KEY_OTHER && _classPrivateFieldGet(this, _otherTextId)) {
	              var otherEl = document.getElementById(_classPrivateFieldGet(this, _otherTextId));
	              otherEl.style.display = selected ? 'block' : 'none';
	              otherEl.value = this._value.other === null ? '' : this._value.other.trim();
	            }
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

	      var container = document.createElement(_classStaticPrivateFieldSpecGet(OptionsField, OptionsField, _TOP_LEVEL_ELEMENT));
	      container.className = 'form-group';

	      _classPrivateFieldSet(this, _containerId$2, container.id = FormField.nextId);

	      var labelEl = container.appendChild(document.createElement('label'));
	      labelEl.style.display = 'block';
	      labelEl.textContent = this.label;

	      if (this.helpText) {
	        var helpTextField = container.appendChild(document.createElement('small'));
	        helpTextField.innerHTML = this.helpText;
	      }

	      for (var key in this.options) {
	        if (this.options.hasOwnProperty(key)) {
	          _classPrivateMethodGet(this, _buildOption, _buildOption2).call(this, container, key, this.options[key]);
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

	    /**
	     *
	     * @param {Event} event
	     */
	    value: function inputChangeHandler(event) {
	      event.stopPropagation(); // don't allow the change event to reach the form-level event handler (will handle it here instead)

	      var value = {
	        selection: [],
	        other: null
	      };
	      var otherSelected = false;
	      var otherEl;

	      if (_classPrivateFieldGet(this, _otherTextId)) {
	        otherEl = document.getElementById(_classPrivateFieldGet(this, _otherTextId));
	      }

	      var options = document.querySelectorAll("".concat(_classStaticPrivateFieldSpecGet(OptionsField, OptionsField, _TOP_LEVEL_ELEMENT), "#").concat(_classPrivateFieldGet(this, _containerId$2), " input[type=\"checkbox\"]:checked"));
	      var _iteratorNormalCompletion2 = true;
	      var _didIteratorError2 = false;
	      var _iteratorError2 = undefined;

	      try {
	        for (var _iterator2 = options[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
	          var option = _step2.value;
	          value.selection[value.selection.length] = option.name;

	          if (option.name === OptionsField.KEY_OTHER && _classPrivateFieldGet(this, _otherTextId)) {
	            value.other = FormField.cleanRawInput(otherEl);
	            otherSelected = true;
	          }
	        }
	      } catch (err) {
	        _didIteratorError2 = true;
	        _iteratorError2 = err;
	      } finally {
	        try {
	          if (!_iteratorNormalCompletion2 && _iterator2.return != null) {
	            _iterator2.return();
	          }
	        } finally {
	          if (_didIteratorError2) {
	            throw _iteratorError2;
	          }
	        }
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

	  }, {
	    key: "value",
	    set: function set(selection) {
	      this._value = selection || {
	        selection: [],
	        other: null
	      };
	      this.updateView();
	    }
	    /**
	     *
	     * @returns {{selection: Array.<string>, other: (string|null)}}
	     */
	    ,
	    get: function get() {
	      return this._value;
	    }
	  }], [{
	    key: "summariseImpl",
	    value: function summariseImpl(key, property, attributes) {
	      var summaryDescriptor = property.summary;
	      var methods = [];

	      if (attributes[key].selection.length) {
	        var _iteratorNormalCompletion3 = true;
	        var _didIteratorError3 = false;
	        var _iteratorError3 = undefined;

	        try {
	          for (var _iterator3 = attributes[key].selection[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
	            var attributeValue = _step3.value;

	            if ('other' === attributeValue && attributes[key].other) {
	              methods[methods.length] = "".concat(property.attributes.options[attributeValue].summary || property.attributes.options[attributeValue].label, " (").concat(attributes[key].other, ")");
	            } else {
	              methods[methods.length] = property.attributes.options[attributeValue].summary || property.attributes.options[attributeValue].label;
	            }
	          }
	        } catch (err) {
	          _didIteratorError3 = true;
	          _iteratorError3 = err;
	        } finally {
	          try {
	            if (!_iteratorNormalCompletion3 && _iterator3.return != null) {
	              _iterator3.return();
	            }
	          } finally {
	            if (_didIteratorError3) {
	              throw _iteratorError3;
	            }
	          }
	        }

	        return escapeHTML("".concat(summaryDescriptor.summaryPrefix, " ").concat(formattedImplode(',', 'or', methods)));
	      } else {
	        return '';
	      }
	    }
	  }]);

	  return OptionsField;
	}(FormField);

	var _containerId$2 = new WeakMap();

	var _otherTextId = new WeakMap();

	var _buildOption = new WeakSet();

	_defineProperty(OptionsField, "KEY_OTHER", 'other');

	var _TOP_LEVEL_ELEMENT = {
	  writable: true,
	  value: 'fieldset'
	};

	var _buildOption2 = function _buildOption2(fieldSet, key, option) {
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
	    otherTextEl.id = _classPrivateFieldSet(this, _otherTextId, FormField.nextId);
	    otherTextEl.className = 'form-control';
	    otherTextEl.style.display = 'none';
	  }
	};

	/**
	 * used for select based menus, allowing multiple choices, with optional 'other' field that exposes a text field
	 */

	var SelectField =
	/*#__PURE__*/
	function (_FormField) {
	  _inherits(SelectField, _FormField);

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
	   * @type {Object.<string, {label: string}>}
	   */

	  /**
	   * if set then include a free-text input field alongside the 'other' option
	   *
	   * @type {boolean}
	   */

	  /**
	   *
	   * @type {{selection : Array.<string>, other : (string|null)}}
	   * @private
	   */
	  // static timeoutDelay = 50;
	  //static KEY_OTHER = 'other';

	  /**
	   *
	   * @param {{[label] : string, [helpText]: string, [options]: {}, [includeOtherFreeText]: boolean}} [params]
	   */
	  function SelectField(params) {
	    var _this;

	    _classCallCheck(this, SelectField);

	    _this = _possibleConstructorReturn(this, _getPrototypeOf(SelectField).call(this, params));

	    _buildOption$1.add(_assertThisInitialized(_this));

	    _containerId$3.set(_assertThisInitialized(_this), {
	      writable: true,
	      value: void 0
	    });

	    _menuId.set(_assertThisInitialized(_this), {
	      writable: true,
	      value: void 0
	    });

	    _otherTextId$1.set(_assertThisInitialized(_this), {
	      writable: true,
	      value: void 0
	    });

	    _defineProperty(_assertThisInitialized(_this), "options", {});

	    _defineProperty(_assertThisInitialized(_this), "placeholder", '');

	    _defineProperty(_assertThisInitialized(_this), "includeOtherFreeText", true);

	    _defineProperty(_assertThisInitialized(_this), "_value", {
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

	      if (params.placeholder) {
	        _this.placeholder = params.placeholder;
	      }
	    }

	    return _this;
	  }
	  /**
	   *
	   * @param {({selection : Array.<string>, other : (string|null)}|null)} selection
	   */


	  _createClass(SelectField, [{
	    key: "markValidity",

	    /**
	     *
	     * @param {(boolean|null)} isValid
	     */
	    value: function markValidity(isValid) {
	      var el = document.getElementById(_classPrivateFieldGet(this, _menuId));

	      if (null === isValid) {
	        el.classList.remove('is-invalid', 'is-valid');
	      } else {
	        el.classList.remove(isValid ? 'is-invalid' : 'is-valid');
	        el.classList.add(isValid ? 'is-valid' : 'is-invalid');
	      }
	    }
	  }, {
	    key: "updateView",
	    value: function updateView() {
	      if (this._fieldEl) {
	        // do nothing until the view has been constructed
	        var _iteratorNormalCompletion = true;
	        var _didIteratorError = false;
	        var _iteratorError = undefined;

	        try {
	          for (var _iterator = document.querySelectorAll("select#".concat(_classPrivateFieldGet(this, _menuId), " option"))[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	            var optionEl = _step.value;

	            if (optionEl.value !== '') {
	              var selected = optionEl.selected = this._value.selection.includes(optionEl.value);

	              if (optionEl.value === OptionsField.KEY_OTHER && _classPrivateFieldGet(this, _otherTextId$1)) {
	                var otherEl = document.getElementById(_classPrivateFieldGet(this, _otherTextId$1));
	                otherEl.style.display = selected ? 'block' : 'none';
	                otherEl.value = this._value.other === null ? '' : this._value.other.trim();
	              }
	            } else {
	              // default placeholder choice
	              optionEl.selected = this._value.selection.length === 0;
	            }
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

	      var container = document.createElement(_classStaticPrivateFieldSpecGet(SelectField, SelectField, _TOP_LEVEL_ELEMENT$1));
	      container.className = 'form-group';

	      _classPrivateFieldSet(this, _containerId$3, container.id = FormField.nextId);

	      _classPrivateFieldSet(this, _menuId, FormField.nextId);

	      var labelEl = container.appendChild(document.createElement('label'));
	      labelEl.htmlFor = _classPrivateFieldGet(this, _menuId); //labelEl.className = 'form-check-label';

	      labelEl.style.display = 'block';
	      labelEl.innerHTML = this.label;
	      var selectEl = document.createElement('select');
	      selectEl.id = _classPrivateFieldGet(this, _menuId);
	      selectEl.className = 'custom-select';

	      if (this.helpText) {
	        var helpTextField = container.appendChild(document.createElement('small'));
	        helpTextField.innerHTML = this.helpText;
	      }

	      if (this.placeholder) {
	        _classPrivateMethodGet(this, _buildOption$1, _buildOption2$1).call(this, container, selectEl, '', {
	          label: this.placeholder
	        });
	      }

	      for (var key in this.options) {
	        if (this.options.hasOwnProperty(key)) {
	          _classPrivateMethodGet(this, _buildOption$1, _buildOption2$1).call(this, container, selectEl, key, this.options[key]);
	        }
	      }

	      container.appendChild(selectEl);

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
	     * @param {HTMLElement} containerEl
	     * @param {HTMLSelectElement} selectEl
	     * @param {string} key
	     * @param {{label : string}} option
	     */

	  }, {
	    key: "inputChangeHandler",

	    /**
	     *
	     * @param {Event} event
	     */
	    value: function inputChangeHandler(event) {
	      event.stopPropagation(); // don't allow the change event to reach the form-level event handler (will handle it here instead)
	      // console.log('got options change event');
	      // console.log(event);

	      var value = {
	        selection: [],
	        other: null
	      };
	      var otherSelected = false;
	      var otherEl;

	      if (_classPrivateFieldGet(this, _otherTextId$1)) {
	        otherEl = document.getElementById(_classPrivateFieldGet(this, _otherTextId$1));
	      }

	      var options = document.querySelectorAll("select#".concat(_classPrivateFieldGet(this, _menuId), " option:checked"));
	      var _iteratorNormalCompletion2 = true;
	      var _didIteratorError2 = false;
	      var _iteratorError2 = undefined;

	      try {
	        for (var _iterator2 = options[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
	          var option = _step2.value;

	          if (option.value !== '') {
	            value.selection[value.selection.length] = option.value;

	            if (option.name === OptionsField.KEY_OTHER && _classPrivateFieldGet(this, _otherTextId$1)) {
	              value.other = FormField.cleanRawInput(otherEl);
	              otherSelected = true;
	            }
	          }
	        }
	      } catch (err) {
	        _didIteratorError2 = true;
	        _iteratorError2 = err;
	      } finally {
	        try {
	          if (!_iteratorNormalCompletion2 && _iterator2.return != null) {
	            _iterator2.return();
	          }
	        } finally {
	          if (_didIteratorError2) {
	            throw _iteratorError2;
	          }
	        }
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

	  }, {
	    key: "value",
	    set: function set(selection) {
	      this._value = selection || {
	        selection: [],
	        other: null
	      };
	      this.updateView();
	    }
	    /**
	     *
	     * @returns {{selection: Array.<string>, other: (string|null)}}
	     */
	    ,
	    get: function get() {
	      return this._value;
	    }
	    /**
	     *
	     * @param value
	     * @returns {boolean}
	     */

	  }], [{
	    key: "isEmpty",
	    value: function isEmpty(value) {
	      return value.selection.length === 0 || value.selection[0] === '';
	    }
	  }, {
	    key: "summariseImpl",
	    value: function summariseImpl(key, property, attributes) {
	      var summaryDescriptor = property.summary;
	      var methods = [];

	      if (attributes[key].selection.length) {
	        var _iteratorNormalCompletion3 = true;
	        var _didIteratorError3 = false;
	        var _iteratorError3 = undefined;

	        try {
	          for (var _iterator3 = attributes[key].selection[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
	            var attributeValue = _step3.value;

	            if ('other' === attributeValue && attributes[key].other) {
	              methods[methods.length] = "".concat(property.attributes.options[attributeValue].summary || property.attributes.options[attributeValue].label, " (").concat(attributes[key].other, ")");
	            } else {
	              methods[methods.length] = property.attributes.options[attributeValue].summary || property.attributes.options[attributeValue].label;
	            }
	          }
	        } catch (err) {
	          _didIteratorError3 = true;
	          _iteratorError3 = err;
	        } finally {
	          try {
	            if (!_iteratorNormalCompletion3 && _iterator3.return != null) {
	              _iterator3.return();
	            }
	          } finally {
	            if (_didIteratorError3) {
	              throw _iteratorError3;
	            }
	          }
	        }

	        return escapeHTML("".concat(summaryDescriptor.summaryPrefix, " ").concat(formattedImplode(',', 'or', methods)));
	      } else {
	        return '';
	      }
	    }
	  }]);

	  return SelectField;
	}(FormField);

	var _containerId$3 = new WeakMap();

	var _menuId = new WeakMap();

	var _otherTextId$1 = new WeakMap();

	var _buildOption$1 = new WeakSet();

	var _TOP_LEVEL_ELEMENT$1 = {
	  writable: true,
	  value: 'fieldset'
	};

	var _buildOption2$1 = function _buildOption2(containerEl, selectEl, key, option) {
	  var optionEl = selectEl.appendChild(document.createElement('option')); //optionEl.className = ;

	  optionEl.value = key;
	  optionEl.innerText = option.label;

	  if (OptionsField.KEY_OTHER === key && this.includeOtherFreeText) {
	    var otherTextEl = containerEl.appendChild(document.createElement('input'));
	    otherTextEl.id = _classPrivateFieldSet(this, _otherTextId$1, FormField.nextId);
	    otherTextEl.className = 'form-control';
	  }
	};

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

	var IMAGE_MODAL_ID = 'imagemodal';
	var IMAGE_MODAL_DELETE_BUTTON_ID = 'imagemodaldelete';
	var DELETE_IMAGE_MODAL_ID = 'deleteimagemodal';
	var EVENT_DELETE_IMAGE = 'deleteimage';
	var ImageField =
	/*#__PURE__*/
	function (_FormField) {
	  _inherits(ImageField, _FormField);

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
	   * @type {NyphOccurrenceForm}
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

	    _classCallCheck(this, ImageField);

	    _this = _possibleConstructorReturn(this, _getPrototypeOf(ImageField).call(this, params));

	    _save.add(_assertThisInitialized(_this));

	    _addFiles.add(_assertThisInitialized(_this));

	    _inputId.set(_assertThisInitialized(_this), {
	      writable: true,
	      value: void 0
	    });

	    _containerId$4.set(_assertThisInitialized(_this), {
	      writable: true,
	      value: void 0
	    });

	    _statusBlockId.set(_assertThisInitialized(_this), {
	      writable: true,
	      value: void 0
	    });

	    _defineProperty(_assertThisInitialized(_this), "parentForm", void 0);

	    _defineProperty(_assertThisInitialized(_this), "_value", {
	      images: []
	    });

	    _defineProperty(_assertThisInitialized(_this), "includeCamera", true);

	    _defineProperty(_assertThisInitialized(_this), "placeholder", '');

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
	    key: "updateView",
	    value: function updateView() {
	      if (this._fieldEl) {
	        // do nothing until the view has been constructed
	        var idList = [];
	        var _iteratorNormalCompletion = true;
	        var _didIteratorError = false;
	        var _iteratorError = undefined;

	        try {
	          for (var _iterator = this._value.images[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	            var image = _step.value;
	            idList.push("<picture style=\"cursor: pointer;\" data-imageid=\"".concat(image.id, "\"><source srcset=\"/image.php?imageid=").concat(image.id, "&amp;height=128&amp;format=webp\" type=\"image/webp\"><img data-imageid=\"").concat(image.id, "\" src=\"/image.php?imageid=").concat(image.id, "&amp;height=128&amp;format=jpeg\" height=\"128\" alt=\"photo\"></picture>"));
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

	      _classPrivateFieldSet(this, _containerId$4, container.id = FormField.nextId);

	      _classPrivateFieldSet(this, _inputId, FormField.nextId);

	      var labelEl = container.appendChild(document.createElement('label'));
	      labelEl.htmlFor = _classPrivateFieldGet(this, _inputId);
	      labelEl.textContent = this.label;
	      var inputGroupEl = container.appendChild(document.createElement('div'));
	      inputGroupEl.className = 'input-group';
	      var filePickerWrapper = document.createElement('div');
	      filePickerWrapper.className = 'custom-file';
	      inputGroupEl.appendChild(filePickerWrapper);
	      var filePickerField = filePickerWrapper.appendChild(document.createElement('input'));
	      filePickerField.type = 'file';
	      filePickerField.className = "custom-file-input";
	      filePickerField.id = _classPrivateFieldGet(this, _inputId);
	      filePickerField.accept = "image/png, image/jpeg";
	      filePickerField.multiple = true;

	      if (this.placeholder) {
	        var pickerLabelEl = filePickerWrapper.appendChild(document.createElement('label'));
	        pickerLabelEl.className = 'custom-file-label';
	        pickerLabelEl.htmlFor = _classPrivateFieldGet(this, _inputId);
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
	      this.parentForm.addListener(EVENT_DELETE_IMAGE, this, 'deleteImageHandler');
	    }
	    /**
	     * called after user has clicked delete button on an image
	     *
	     * @param {object} context
	     * @param {string} eventName
	     * @param {string} imageId
	     */

	  }, {
	    key: "deleteImageHandler",
	    value: function deleteImageHandler(context, eventName, imageId) {
	      console.log("delete image ".concat(imageId));
	      var image;

	      for (var key in this._value.images) {
	        if (this._value.images.hasOwnProperty(key)) {
	          if (this._value.images[key].id === imageId) {
	            image = this._value.images.splice(key, 1)[0];
	            break;
	          }
	        }
	      }

	      if (!image) {
	        console.log("Failed to find image id ".concat(imageId));
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
	        _classPrivateMethodGet(this, _addFiles, _addFiles2).call(this, imageEl.files).then(function () {
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

	  }, {
	    key: "value",
	    set: function set(imageIds) {
	      this._value = {
	        images: []
	      };

	      if (imageIds) {
	        var _iteratorNormalCompletion2 = true;
	        var _didIteratorError2 = false;
	        var _iteratorError2 = undefined;

	        try {
	          for (var _iterator2 = imageIds[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
	            var id = _step2.value;

	            if (OccurrenceImage.imageCache.has(id)) {
	              this._value.images.push(OccurrenceImage.imageCache.get(id));
	            } else {
	              console.log("Creating placeholder image object '".concat(id, "'"));

	              this._value.images.push(OccurrenceImage.placeholder(id));
	            }
	          }
	        } catch (err) {
	          _didIteratorError2 = true;
	          _iteratorError2 = err;
	        } finally {
	          try {
	            if (!_iteratorNormalCompletion2 && _iterator2.return != null) {
	              _iterator2.return();
	            }
	          } finally {
	            if (_didIteratorError2) {
	              throw _iteratorError2;
	            }
	          }
	        }
	      }

	      this.updateView();
	    }
	    /**
	     *
	     * @param {Array.<string>} value (list of image ids or null)
	     * @returns {boolean}
	     */
	    ,

	    /**
	     *
	     * @returns {Array.<string>}
	     */
	    get: function get() {
	      var ids = [];

	      if (this._value && this._value.images) {
	        var _iteratorNormalCompletion3 = true;
	        var _didIteratorError3 = false;
	        var _iteratorError3 = undefined;

	        try {
	          for (var _iterator3 = this._value.images[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
	            var image = _step3.value;
	            ids[ids.length] = image.id;
	          }
	        } catch (err) {
	          _didIteratorError3 = true;
	          _iteratorError3 = err;
	        } finally {
	          try {
	            if (!_iteratorNormalCompletion3 && _iterator3.return != null) {
	              _iterator3.return();
	            }
	          } finally {
	            if (_didIteratorError3) {
	              throw _iteratorError3;
	            }
	          }
	        }
	      }

	      return ids;
	    }
	  }], [{
	    key: "isEmpty",
	    value: function isEmpty(value) {
	      return !value || value.length === 0;
	    }
	  }, {
	    key: "licenseModal",

	    /**
	     *
	     * @returns {HTMLDivElement}
	     */
	    value: function licenseModal() {
	      // 'image license' modal
	      // this pop-up is informational only
	      var modalEl = document.createElement('div');
	      modalEl.innerHTML = "<div class=\"modal fade\" id=\"".concat(ImageField.LICENSE_MODAL, "\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"").concat(ImageField.LICENSE_MODAL, "Title\" aria-hidden=\"true\">\n  <div class=\"modal-dialog modal-dialog-centered\" role=\"document\">\n    <div class=\"modal-content\">\n      <div class=\"modal-header\">\n        <h5 class=\"modal-title\" id=\"").concat(ImageField.LICENSE_MODAL, "Title\">Image licensing</h5>\n        <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\">\n          <span aria-hidden=\"true\">&times;</span>\n        </button>\n      </div>\n      <div class=\"modal-body\">\n        <p>By choosing to submit images with your plant hunt records you agree to license the image under the terms of the Creative Common Attribution 4.0 International license (CC BY 4.0).</p>\n        <p>The following is a summary of (and not a substitute for) the <a href=\"https://creativecommons.org/licenses/by/4.0/\" target=\"_blank\">license</a>.</p>\n        <p>Licensees are free to:</p>\n        <ul class=\"license-properties\">\n<li>\n<strong>Share</strong> \u2014 copy and redistribute the material in any medium or format\n</li>\n<li>\n<strong>Adapt</strong> \u2014 remix, transform, and build upon the material for any purpose, even commercially.\n</li>\n</ul>\n<p>Licensees are most follow these term:</p>\n<ul>\n<li>\n<p>\n<strong>Attribution</strong> \u2014 licensees must give appropriate credit, provide a link to the license, and indicate if changes were made.\n</p>\n</li>\n</ul>\n<p>Full details of the license are here: <a href=\"https://creativecommons.org/licenses/by/4.0/\" target=\"_blank\">CC BY 4.0 license</a></p>\n\n      </div>\n      <div class=\"modal-footer\">\n        <button type=\"button\" class=\"btn btn-secondary\" data-dismiss=\"modal\">Close</button>\n      </div>\n    </div>\n  </div>\n</div>");
	      return modalEl.firstChild;
	    }
	  }]);

	  return ImageField;
	}(FormField);

	var _inputId = new WeakMap();

	var _containerId$4 = new WeakMap();

	var _statusBlockId = new WeakMap();

	var _addFiles = new WeakSet();

	var _save = new WeakSet();

	_defineProperty(ImageField, "LICENSE_MODAL", 'imagelicensemodal');

	var _addFiles2 = function _addFiles2(fileList) {
	  // cannot save until parent occurrence has been saved
	  // so pre-trigger a save event
	  this.parentForm.pingOccurrence();
	  var images = [];
	  var _iteratorNormalCompletion4 = true;
	  var _didIteratorError4 = false;
	  var _iteratorError4 = undefined;

	  try {
	    for (var _iterator4 = fileList[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
	      var file = _step4.value;
	      images.push(OccurrenceImage.fromFile(file));
	    }
	  } catch (err) {
	    _didIteratorError4 = true;
	    _iteratorError4 = err;
	  } finally {
	    try {
	      if (!_iteratorNormalCompletion4 && _iterator4.return != null) {
	        _iterator4.return();
	      }
	    } finally {
	      if (_didIteratorError4) {
	        throw _iteratorError4;
	      }
	    }
	  }

	  return _classPrivateMethodGet(this, _save, _save2).call(this, images);
	};

	var _save2 = function _save2(images) {
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
	      return _classPrivateMethodGet(_this3, _save, _save2).call(_this3, images);
	    });
	  } else {
	    return Promise.resolve();
	  }
	};

	var helpPanelText = "<!-- begin: templates/formHelp/recordsHelp.html -->\r\n<p>In this section, please list the ornamental plants that are spreading in your\r\ngarden and are difficult to control.</p>\r\n<p> Many plants in your garden will spread and this is a sign that they are growing well. We only want to know about those that are spreading to an extent that\r\n    you have to control them to prevent them overgrowing other plants or parts of your garden where you do not want them.</p>\r\n<p>Please note in this project we are dealing with ornamental plants only (no vegetables, no weeds -\r\n    unless they are ornamentals that you now regard as weeds).</p>\r\n<div class=\"card mt-3\">\r\n    <div class=\"card-body\">\r\n        <h5 class=\"card-title\">Using the forms</h5>\r\n        <p class=\"card-text\">You can enter as many plant records as you need. To add another record click the 'Add a plant' button.</p>\r\n        <p class=\"card-text\">If you are currently online then the entries will be saved as you go, automatically. Otherwise the records\r\n            will be remembered on your device, but you will need to click '<a href=\"/app/survey/save\" data-navigo=\"survey/save\">save all</a>' (on the Surveys menu) when you have a network connection again.\r\n        </p>\r\n        <p class=\"card-text\">To delete a plant record, find it in the list and click the red 'bin' icon.\r\n        </p>\r\n    </div>\r\n</div>\r\n<div class=\"card mt-3\">\r\n    <div class=\"card-body\">\r\n        <h5 class=\"card-title\">Identifying your plants</h5>\r\n        </p>\r\n        <h6 class=\"card-subtitle mb-2 text-muted\">Plant names</h6>\r\n        <p class=\"card-text\">If possible, please enter the scientific or common name of the plant, but don't worry if you dont know the full details.\r\n            The list of suggested names includes a very wide range of both native and horticultural plants, but if the name you need\r\n            isn't on the list then you can still type it in.\r\n        </p>\r\n        <h6 class=\"card-subtitle mb-2 text-muted\">Photos</h6>\r\n        <p class=\"card-text\">Photos of the plant will help us confirm your record. Please provide a picture showing the whole plant, but it will\r\n            also help us if you can provide close-up views of the flowers and leaves.\r\n        </p>\r\n    </div>\r\n</div>\r\n<!-- begin: templates/formHelp/recordsHelp.html -->\r\n";

	var NyphOccurrenceForm =
	/*#__PURE__*/
	function (_Form) {
	  _inherits(NyphOccurrenceForm, _Form);

	  /**
	   * @type {Occurrence}
	   */

	  /**
	   * nasty tight coupling, but is needed for saving of images
	   * set by MainView immediately after the form is constructed
	   *
	   * @type {string}
	   */

	  /**
	   * @type {string}
	   */

	  /**
	   * @type {string}
	   */
	  function NyphOccurrenceForm(occurrence) {
	    var _this;

	    _classCallCheck(this, NyphOccurrenceForm);

	    _this = _possibleConstructorReturn(this, _getPrototypeOf(NyphOccurrenceForm).call(this));

	    _occurrence.set(_assertThisInitialized(_this), {
	      writable: true,
	      value: void 0
	    });

	    _defineProperty(_assertThisInitialized(_this), "_formFieldsBuilt", false);

	    _defineProperty(_assertThisInitialized(_this), "surveyId", '');

	    if (occurrence) {
	      _this.model = occurrence;
	    }

	    return _this;
	  }
	  /**
	   *
	   * @returns {HTMLElement}
	   */


	  _createClass(NyphOccurrenceForm, [{
	    key: "buildContentContainer",

	    /**
	     * sets this._formContentContainer to the container that should contain the form fields
	     *
	     * if no wrapper then can re-use the outer container id (this.#formEl
	     */
	    value: function buildContentContainer(outerContainer) {
	      var cardEl = outerContainer.appendChild(document.createElement('div'));
	      cardEl.className = 'card mt-3 ml-0 mr-0 mb-3';
	      var cardHeaderEl = cardEl.appendChild(document.createElement('div'));
	      cardHeaderEl.className = 'card-header';
	      cardHeaderEl.textContent = NyphOccurrenceForm.sectionTitle;
	      this._formContentContainer = cardEl.appendChild(document.createElement('div'));
	      this._formContentContainer.className = 'card-body';
	      return this._formContentContainer;
	    }
	    /**
	     *
	     * @returns {(string|null)}
	     */

	  }, {
	    key: "initialiseFormFields",

	    /**
	     *
	     */
	    value: function initialiseFormFields() {
	      var properties = NyphOccurrenceForm.properties;
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
	      console.log('updating occurrence from NyphOccurrenceForm content');

	      for (var key in this.fields) {
	        if (this.fields.hasOwnProperty(key)) {
	          var field = this.fields[key];
	          _classPrivateFieldGet(this, _occurrence).attributes[key] = field.value;
	        }
	      }

	      console.log({
	        occurrence: _classPrivateFieldGet(this, _occurrence)
	      });
	    }
	    /**
	     *
	     * @param {Occurrence} model
	     */

	  }, {
	    key: "changeHandler",
	    value: function changeHandler(event) {
	      console.log('occurrence form change event');
	      console.log({
	        event: event
	      });
	      this.fireEvent(NyphOccurrenceForm.CHANGE_EVENT, {
	        form: this
	      });
	    }
	  }, {
	    key: "pingOccurrence",
	    value: function pingOccurrence() {
	      if (_classPrivateFieldGet(this, _occurrence).unsaved()) {
	        this.fireEvent(NyphOccurrenceForm.CHANGE_EVENT, {
	          form: this
	        });
	      }
	    }
	  }, {
	    key: "destructor",
	    value: function destructor() {
	      _classPrivateFieldSet(this, _occurrence, null);

	      _get(_getPrototypeOf(NyphOccurrenceForm.prototype), "destructor", this).call(this);
	    }
	  }, {
	    key: "getFormSectionProperties",
	    value: function getFormSectionProperties() {
	      return NyphOccurrenceForm.properties;
	    }
	  }, {
	    key: "formElement",
	    get: function get() {
	      var _arguments = arguments;

	      var el = _get(_getPrototypeOf(NyphOccurrenceForm.prototype), "formElement", this);

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
	  }, {
	    key: "occurrenceId",
	    get: function get() {
	      return _classPrivateFieldGet(this, _occurrence) ? _classPrivateFieldGet(this, _occurrence).id : null;
	    }
	    /**
	     *
	     * @returns {(number|null)}
	     */

	  }, {
	    key: "projectId",
	    get: function get() {
	      return _classPrivateFieldGet(this, _occurrence) ? _classPrivateFieldGet(this, _occurrence).projectId : null;
	    }
	    /**
	     *
	     * @type {Object.<string,{field: typeof FormField, attributes: {label: string, helpText: string, placeholder: string, autocomplete: string}}>}
	     */

	  }, {
	    key: "model",
	    set: function set(model) {
	      _classPrivateFieldSet(this, _occurrence, model);

	      this.populateFormContent();
	    },
	    get: function get() {
	      return _classPrivateFieldGet(this, _occurrence);
	    }
	  }]);

	  return NyphOccurrenceForm;
	}(Form);

	var _occurrence = new WeakMap();

	_defineProperty(NyphOccurrenceForm, "sectionTitle", 'Details of invasive garden plant');

	_defineProperty(NyphOccurrenceForm, "help", helpPanelText);

	_defineProperty(NyphOccurrenceForm, "properties", {
	  taxon: {
	    field: TaxonPickerField,
	    attributes: {
	      label: 'plant name',
	      validationMessage: 'Please specify a taxon name or provide some photos if you cannot identify the plant.',
	      helpText: 'Type the common or scientific name of the invasive plant and, if possible, pick a suggestion from the list. If you do not know the name of the plant then please leave this blank and include some photos.'
	    },

	    /**
	     *
	     * @param {string} key
	     * @param {{}} property
	     * @param {{}} modelAttributes
	     * @return {boolean} true if valid
	     */
	    validator: function validator(key, property, modelAttributes) {
	      if (!(modelAttributes.hasOwnProperty(key) && !property.field.isEmpty(modelAttributes[key]))) {
	        // taxon field is empty, check if have an image
	        return modelAttributes.hasOwnProperty('images') && !ImageField.isEmpty(modelAttributes['images']);
	      } else {
	        return true;
	      }
	    }
	  },
	  idConfidence: {
	    field: SelectField,
	    attributes: {
	      label: 'How confident are you about your identification of this plant?',
	      helpText: '',
	      placeholder: 'please choose an option',
	      options: {
	        "1": {
	          label: "very sure"
	        },
	        "2": {
	          label: "not really sure"
	        },
	        "3": {
	          label: "could be wrong"
	        }
	      },
	      includeOtherFreeText: false,
	      completion: FormField.COMPLETION_DESIRED
	    }
	  },
	  images: {
	    field: ImageField,
	    attributes: {
	      label: 'Please provide some photos of the plant',
	      placeholder: 'photos',
	      helpText: "If the plant is unusual or if you are unsure of its identity then photos will help us check your record.<br><strong>Submitted images remain your property, but you agree to allow us to use the photos under the terms of a <a href=\"#\" title=\"Creative Commons Attribution\" data-toggle=\"modal\" data-target=\"#".concat(ImageField.LICENSE_MODAL, "\">CC BY</a> license.</strong>")
	    }
	  },
	  spread: {
	    field: OptionsField,
	    attributes: {
	      label: 'How does the plant spread in your garden?',
	      helpText: '<i>(tick all that apply)</i>',
	      options: {
	        "seeds": {
	          label: "seeds"
	        },
	        "roots": {
	          label: "roots"
	        },
	        "runners": {
	          label: "runners"
	        },
	        "bulbs": {
	          label: "bulbs"
	        },
	        "unknown": {
	          label: "don't know"
	        },
	        "other": {
	          label: "other"
	        }
	      },
	      includeOtherFreeText: true,
	      completion: FormField.COMPLETION_DESIRED
	    },
	    summary: {
	      summaryPrefix: 'Spread by'
	    }
	  },
	  control: {
	    field: OptionsField,
	    attributes: {
	      label: 'How do you control this plant?',
	      helpText: '<i>(tick all that apply)</i>',
	      options: {
	        "digging": {
	          label: "digging"
	        },
	        "pulling": {
	          label: "pulling"
	        },
	        "chemical": {
	          label: "chemical"
	        },
	        "cutting": {
	          label: "cutting"
	        },
	        "mulching": {
	          label: "mulching"
	        },
	        "other": {
	          label: "other"
	        }
	      },
	      includeOtherFreeText: true,
	      completion: FormField.COMPLETION_DESIRED
	    },
	    summary: {
	      summaryPrefix: 'Controlled by'
	    }
	  },
	  disposal: {
	    field: OptionsField,
	    attributes: {
	      label: 'Please tell us how you dispose of this plant?',
	      helpText: '<i>(tick all that apply)</i>',
	      options: {
	        "homecompost": {
	          label: "home composting"
	        },
	        "greenwaste": {
	          label: "green waste"
	        },
	        "other waste": {
	          label: "other waste collection"
	        },
	        "other": {
	          label: "other"
	        }
	      },
	      includeOtherFreeText: true,
	      completion: FormField.COMPLETION_DESIRED
	    },
	    summary: {
	      summaryPrefix: 'Disposal by'
	    }
	  },
	  problemSeverity: {
	    field: SelectField,
	    attributes: {
	      label: 'Which of the following best describes your effort to control the plant?',
	      placeholder: 'please select a response',
	      options: {
	        '1': {
	          label: 'I don\'t try to control it'
	        },
	        '2': {
	          label: 'I try to keep it confined to certain areas.'
	        },
	        '3': {
	          label: 'I am trying everything to get rid of it.'
	        },
	        '4': {
	          label: 'I have given up trying to control it.'
	        },
	        '5': {
	          label: 'I have successfully eradicated the plant.'
	        }
	      },
	      includeOtherFreeText: false,
	      completion: FormField.COMPLETION_DESIRED
	    },
	    summary: {
	      summaryPrefix: 'Severity:'
	    }
	  },
	  source: {
	    field: OptionsField,
	    attributes: {
	      label: 'Please tell us how this plant came into your garden?',
	      helpText: '<i>(tick all that apply)</i>',
	      options: {
	        "alreadypresent": {
	          label: "Was already in the garden"
	        },
	        "bought": {
	          label: "Bought the plant"
	        },
	        "seed": {
	          label: "Grown from seed"
	        },
	        "someoneelse": {
	          label: "From someone else's garden"
	        },
	        "saleswap": {
	          label: "Non-commercial sale/swap"
	        },
	        "spread": {
	          label: "Spread into my garden"
	        },
	        "other": {
	          label: "other"
	        }
	      },
	      includeOtherFreeText: true,
	      completion: FormField.COMPLETION_DESIRED
	    },
	    summary: {
	      summaryPrefix: 'Source'
	    }
	  },
	  // yearsSincePlanted: {
	  //     field: InputField,
	  //     attributes: {
	  //         label: 'How long ago did you plant (years)?',
	  //         type: 'number',
	  //         helpText: 'Please estimate in years or leave blank if unknown or not applicable',
	  //         autocomplete: 'off',
	  //     }},
	  // yearsProblem: {
	  //     field: InputField,
	  //     attributes: {
	  //         label: 'How quickly did this plant become a problem?',
	  //         placeholder: 'number of years',
	  //         type: 'number',
	  //         helpText: 'Please estimate in years or leave blank if unknown',
	  //         autocomplete: 'off',
	  //     }},
	  // distribution: {
	  //     field: OptionsField,
	  //     attributes: {
	  //         label: 'Have you given the plant away to others?',
	  //         helpText: '<i>(tick all that apply)</i>',
	  //         options: {
	  //             "neighbours" : {label: "Neighbours"},
	  //             "sale" : {label: "Plant/charity sale"},
	  //             "swap" : {label: "Plant or seed swap"},
	  //             "localfriends" : {label: "Local friends"},
	  //             "distantfriends" : {label: "Friends further away"},
	  //             "other" : {label: "other"}
	  //         },
	  //         includeOtherFreeText : true
	  //     }},
	  local: {
	    field: SelectField,
	    attributes: {
	      label: 'Is the plant growing locally outside your garden?',
	      //helpText: '(estimate)',
	      placeholder: 'please select a response',
	      options: {
	        'yes': {
	          label: 'yes'
	        },
	        'no': {
	          label: 'no'
	        },
	        'notknown': {
	          label: "I don't know"
	        }
	      },
	      includeOtherFreeText: false
	    }
	  },
	  warning: {
	    field: SelectField,
	    attributes: {
	      label: 'In your opinion, should the plant be sold with a label ' + 'warning buyers of potential control difficulties in their garden?',
	      placeholder: 'please select a response',
	      options: {
	        'yes': {
	          label: 'Yes',
	          summary: 'Plants should carry a warning'
	        },
	        'no': {
	          label: 'No',
	          summary: 'Plants need not carry a warning'
	        },
	        'unsure': {
	          label: "Don't know",
	          summary: "Don't know if plants should carry a warning"
	        }
	      },
	      includeOtherFreeText: false,
	      completion: FormField.COMPLETION_DESIRED
	    },
	    summary: {
	      summarise: true,
	      summaryPrefix: ''
	    }
	  },
	  comments: {
	    field: TextAreaField,
	    attributes: {
	      label: 'Any other comments about this plant?',
	      helpText: '',
	      autocomplete: 'off'
	    },
	    summary: {
	      summarise: true
	    }
	  }
	});

	NyphOccurrenceForm.CHANGE_EVENT = 'change';

	var Occurrence =
	/*#__PURE__*/
	function (_Model) {
	  _inherits(Occurrence, _Model);

	  function Occurrence() {
	    var _getPrototypeOf2;

	    var _this;

	    _classCallCheck(this, Occurrence);

	    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
	      args[_key] = arguments[_key];
	    }

	    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(Occurrence)).call.apply(_getPrototypeOf2, [this].concat(args)));

	    _defineProperty(_assertThisInitialized(_this), "attributes", {// taxon: {
	      //     taxonId: '',
	      //     taxonName: '',
	      //     vernacularMatch: false
	      // }
	    });

	    _defineProperty(_assertThisInitialized(_this), "_savedRemotely", false);

	    _defineProperty(_assertThisInitialized(_this), "_savedLocally", false);

	    _defineProperty(_assertThisInitialized(_this), "SAVE_ENDPOINT", '/saveoccurrence.php');

	    _defineProperty(_assertThisInitialized(_this), "TYPE", 'occurrence');

	    _defineProperty(_assertThisInitialized(_this), "isNew", false);

	    return _this;
	  }

	  _createClass(Occurrence, [{
	    key: "getForm",

	    /**
	     *
	     * @returns {NyphOccurrenceForm}
	     */
	    value: function getForm() {
	      var form = new NyphOccurrenceForm(this);

	      if (!this.isNew) {
	        form.liveValidation = true;
	      }

	      form.addListener(NyphOccurrenceForm.CHANGE_EVENT, this, this.formChangedHandler);
	      return form;
	    }
	    /**
	     * called after the form has changed, before the values have been read back in to the occurrence
	     *
	     * @param context
	     * @param {string} eventName
	     * @param {{form: NyphOccurrenceForm}} params
	     */

	  }, {
	    key: "formChangedHandler",
	    value: function formChangedHandler(context, eventName, params) {
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
	        formData.append('type', this.TYPE);
	        formData.append('surveyId', surveyId);
	        formData.append('occurrenceId', this.id);
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
	     * @param {{id : string, saveState: string, attributes: Object.<string, *>, deleted: boolean, created: number, modified: number, projectId: number, surveyId: string}} descriptor
	     */

	  }, {
	    key: "_parseDescriptor",
	    value: function _parseDescriptor(descriptor) {
	      _get(_getPrototypeOf(Occurrence.prototype), "_parseDescriptor", this).call(this, descriptor);

	      this.surveyId = descriptor.surveyId;
	    }
	  }, {
	    key: "taxon",

	    /**
	     *
	     * @returns {(Taxon|null)} returns null for unmatched taxa specified by name
	     */
	    get: function get() {
	      return this.attributes.taxon && this.attributes.taxon.taxonId ? Taxon.fromId(this.attributes.taxon.taxonId) : null;
	    }
	  }]);

	  return Occurrence;
	}(Model);

	_defineProperty(Occurrence, "EVENT_MODIFIED", 'modified');

	/**
	 *
	 */
	var InternalAppError =
	/*#__PURE__*/
	function (_Error) {
	  _inherits(InternalAppError, _Error);

	  function InternalAppError() {
	    _classCallCheck(this, InternalAppError);

	    return _possibleConstructorReturn(this, _getPrototypeOf(InternalAppError).apply(this, arguments));
	  }

	  return InternalAppError;
	}(_wrapNativeSuper(Error));

	var PROJECT_ID_NYPH = 2;
	var NyphApp =
	/*#__PURE__*/
	function (_App) {
	  _inherits(NyphApp, _App);

	  function NyphApp() {
	    var _getPrototypeOf2;

	    var _this;

	    _classCallCheck(this, NyphApp);

	    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
	      args[_key] = arguments[_key];
	    }

	    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(NyphApp)).call.apply(_getPrototypeOf2, [this].concat(args)));

	    _defineProperty(_assertThisInitialized(_this), "projectId", PROJECT_ID_NYPH);

	    return _this;
	  }

	  _createClass(NyphApp, [{
	    key: "addSurvey",

	    /**
	     *
	     * @param {Survey} survey
	     */
	    value: function addSurvey(survey) {
	      var _this2 = this;

	      if (survey.projectId !== this.projectId) {
	        throw new Error("Survey project id '".concat(survey.projectId, " does not match with current project ('").concat(this.projectId, "')"));
	      }

	      if (!this.surveys.has(survey.id)) {
	        console.log("setting survey's modified/save handler");
	        survey.addListener(Survey.EVENT_MODIFIED, this, function (survey) {
	          _this2.fireEvent(App.EVENT_SURVEYS_CHANGED);

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
	      var _iteratorNormalCompletion = true;
	      var _didIteratorError = false;
	      var _iteratorError = undefined;

	      try {
	        for (var _iterator = this.occurrences[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	          var occurrence = _step.value;

	          if (!occurrence.deleted) {
	            return true;
	          }
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

	      return false;
	    }
	    /**
	     *
	     * @param {Occurrence} occurrence
	     */

	  }, {
	    key: "addOccurrence",
	    value: function addOccurrence(occurrence) {
	      var _this3 = this;

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

	      this.occurrences.set(occurrence.id, occurrence);
	      occurrence.addListener(Occurrence.EVENT_MODIFIED, this, function (occurrence) {
	        var survey = _this3.surveys.get(occurrence.surveyId);

	        if (!survey) {
	          throw new Error("Failed to look up survey id ".concat(occurrence.surveyId));
	        } else {
	          // need to ensure that currentSurvey is saved before occurrence
	          // rather than using a promise chain here, instead rely on enforced queuing of post requests in Model
	          // otherwise there are problems with queue-jumping (e.g. when an image needs to be saved after both previous requests)
	          if (survey.unsaved()) {
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
	      var _this4 = this;

	      var formData = new FormData();
	      var n = 0;
	      var _iteratorNormalCompletion2 = true;
	      var _didIteratorError2 = false;
	      var _iteratorError2 = undefined;

	      try {
	        for (var _iterator2 = surveyIds[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
	          var key = _step2.value;
	          formData.append("surveyId[".concat(n++, "]"), key);
	        }
	      } catch (err) {
	        _didIteratorError2 = true;
	        _iteratorError2 = err;
	      } finally {
	        try {
	          if (!_iteratorNormalCompletion2 && _iterator2.return != null) {
	            _iterator2.return();
	          }
	        } finally {
	          if (_didIteratorError2) {
	            throw _iteratorError2;
	          }
	        }
	      }

	      return fetch(NyphApp.LOAD_SURVEYS_ENDPOINT, {
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
	            var _iteratorNormalCompletion3 = true;
	            var _didIteratorError3 = false;
	            var _iteratorError3 = undefined;

	            try {
	              for (var _iterator3 = jsonResponse[type][Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
	                var object = _step3.value;
	                promises.push(_this4._conditionallyReplaceObject(object));
	              }
	            } catch (err) {
	              _didIteratorError3 = true;
	              _iteratorError3 = err;
	            } finally {
	              try {
	                if (!_iteratorNormalCompletion3 && _iterator3.return != null) {
	                  _iterator3.return();
	                }
	              } finally {
	                if (_didIteratorError3) {
	                  throw _iteratorError3;
	                }
	              }
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
	      return localforage.keys().then(function (keys) {
	        var _iteratorNormalCompletion4 = true;
	        var _didIteratorError4 = false;
	        var _iteratorError4 = undefined;

	        try {
	          for (var _iterator4 = keys[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
	            var key = _step4.value;
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
	          _didIteratorError4 = true;
	          _iteratorError4 = err;
	        } finally {
	          try {
	            if (!_iteratorNormalCompletion4 && _iterator4.return != null) {
	              _iterator4.return();
	            }
	          } finally {
	            if (_didIteratorError4) {
	              throw _iteratorError4;
	            }
	          }
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
	      var _this5 = this;

	      var storedObjectKeys = {
	        survey: [],
	        occurrence: [],
	        image: []
	      };
	      return this.seekKeys(storedObjectKeys).then(function (storedObjectKeys) {
	        return _this5._syncLocalUnsaved(storedObjectKeys);
	      }, function (failedResult) {
	        console.log("Failed to sync all: ".concat(failedResult));
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
	      var _iteratorNormalCompletion5 = true;
	      var _didIteratorError5 = false;
	      var _iteratorError5 = undefined;

	      try {
	        for (var _iterator5 = storedObjectKeys.survey[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
	          var surveyKey = _step5.value;
	          promises.push(Survey.retrieveFromLocal(surveyKey, new Survey()).then(function (survey) {
	            if (survey.unsaved()) {
	              return survey.save();
	            }
	          }));
	        }
	      } catch (err) {
	        _didIteratorError5 = true;
	        _iteratorError5 = err;
	      } finally {
	        try {
	          if (!_iteratorNormalCompletion5 && _iterator5.return != null) {
	            _iterator5.return();
	          }
	        } finally {
	          if (_didIteratorError5) {
	            throw _iteratorError5;
	          }
	        }
	      }

	      var _iteratorNormalCompletion6 = true;
	      var _didIteratorError6 = false;
	      var _iteratorError6 = undefined;

	      try {
	        for (var _iterator6 = storedObjectKeys.occurrence[Symbol.iterator](), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
	          var occurrenceKey = _step6.value;
	          promises.push(Occurrence.retrieveFromLocal(occurrenceKey, new Occurrence()).then(function (occurrence) {
	            if (occurrence.unsaved()) {
	              return occurrence.save();
	            }
	          }));
	        }
	      } catch (err) {
	        _didIteratorError6 = true;
	        _iteratorError6 = err;
	      } finally {
	        try {
	          if (!_iteratorNormalCompletion6 && _iterator6.return != null) {
	            _iterator6.return();
	          }
	        } finally {
	          if (_didIteratorError6) {
	            throw _iteratorError6;
	          }
	        }
	      }

	      var _iteratorNormalCompletion7 = true;
	      var _didIteratorError7 = false;
	      var _iteratorError7 = undefined;

	      try {
	        for (var _iterator7 = storedObjectKeys.image[Symbol.iterator](), _step7; !(_iteratorNormalCompletion7 = (_step7 = _iterator7.next()).done); _iteratorNormalCompletion7 = true) {
	          var imageKey = _step7.value;
	          promises.push(OccurrenceImage.retrieveFromLocal(imageKey, new OccurrenceImage()).then(function (image) {
	            if (image.unsaved()) {
	              return image.save();
	            }
	          }));
	        }
	      } catch (err) {
	        _didIteratorError7 = true;
	        _iteratorError7 = err;
	      } finally {
	        try {
	          if (!_iteratorNormalCompletion7 && _iterator7.return != null) {
	            _iterator7.return();
	          }
	        } finally {
	          if (_didIteratorError7) {
	            throw _iteratorError7;
	          }
	        }
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
	      var _this6 = this;

	      // need to check for a special case where restoring a survey that has never been saved even locally
	      // i.e. new and unmodified
	      // only present in current App.surveys
	      // this occurs if user creates a new survey, makes no changes, switches away from it then switches back
	      if (this.surveys.has(targetSurveyId)) {
	        var localSurvey = this.surveys.get(targetSurveyId);

	        if (localSurvey.isPristine) {
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
	          return _this6.refreshFromServer(storedObjectKeys.survey).finally(function () {
	            // re-seek keys from indexed db, to take account of any new occurrences received from the server
	            return _this6.seekKeys(storedObjectKeys);
	          });
	        } else {
	          return null;
	        }
	      }).finally(function () {
	        // called regardless of whether a server refresh was successful
	        // storedObjectKeys and indexed db should be as up-to-date as possible
	        if (storedObjectKeys.survey.length) {
	          // arbitrarily set first survey key as current
	          // this will be the specified targetSurveyId if that was set
	          return _this6._restoreSurveyFromLocal(storedObjectKeys.survey[0], storedObjectKeys).finally(function () {
	            _this6.currentSurvey = _this6.surveys.get(storedObjectKeys.survey[0]);

	            if (!_this6.currentSurvey) {
	              // survey doesn't actually exist
	              // this could have happened in an invalid survey id was provided as a targetSurveyId
	              console.log("Failed to retrieve survey id '".concat(targetSurveyId, "'"));
	              return Promise.reject(new Error("Failed to retrieve survey id '".concat(targetSurveyId, "'")));
	            }

	            if (_this6.currentSurvey.deleted) {
	              // unusual case where survey is deleted
	              // substitute a new one
	              // this should probably never happen, as items deleted on the server ought to have been
	              // removed locally
	              _this6.setNewSurvey();
	            } else {
	              _this6.fireEvent(App.EVENT_SURVEYS_CHANGED); // current survey should be set now, so menu needs refresh

	            }

	            return Promise.resolve();
	          });
	        } else {
	          // no pre-existing surveys, so create a new one
	          _this6.setNewSurvey();

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
	      this.fireEvent(NyphApp.EVENT_OCCURRENCE_ADDED, {
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
	      var _this7 = this;

	      // retrieve surveys first, then occurrences, then images from indexedDb
	      return Survey.retrieveFromLocal(surveyId, new Survey()).then(function (survey) {
	        // the apps occurrences should only relate to the current survey
	        // (the reset are remote or in IndexedDb)
	        _this7.clearCurrentSurvey();

	        _this7.addSurvey(survey);

	        var occurrenceFetchingPromises = [];
	        var _iteratorNormalCompletion8 = true;
	        var _didIteratorError8 = false;
	        var _iteratorError8 = undefined;

	        try {
	          for (var _iterator8 = storedObjectKeys.occurrence[Symbol.iterator](), _step8; !(_iteratorNormalCompletion8 = (_step8 = _iterator8.next()).done); _iteratorNormalCompletion8 = true) {
	            var occurrenceKey = _step8.value;
	            occurrenceFetchingPromises.push(Occurrence.retrieveFromLocal(occurrenceKey, new Occurrence()).then(function (occurrence) {
	              if (occurrence.surveyId === surveyId) {
	                _this7.addOccurrence(occurrence);
	              }
	            }));
	          }
	        } catch (err) {
	          _didIteratorError8 = true;
	          _iteratorError8 = err;
	        } finally {
	          try {
	            if (!_iteratorNormalCompletion8 && _iterator8.return != null) {
	              _iterator8.return();
	            }
	          } finally {
	            if (_didIteratorError8) {
	              throw _iteratorError8;
	            }
	          }
	        }

	        return Promise.all(occurrenceFetchingPromises);
	      }).finally(function () {
	        //console.log('Reached image fetching part');
	        var imageFetchingPromises = [];
	        var _iteratorNormalCompletion9 = true;
	        var _didIteratorError9 = false;
	        var _iteratorError9 = undefined;

	        try {
	          var _loop = function _loop() {
	            var occurrenceImageKey = _step9.value;
	            imageFetchingPromises.push(OccurrenceImage.retrieveFromLocal(occurrenceImageKey, new OccurrenceImage()).then(function (occurrenceImage) {
	              if (occurrenceImage.surveyId === surveyId) {
	                OccurrenceImage.imageCache.set(occurrenceImageKey, occurrenceImage);
	              }
	            }, function (reason) {
	              console.log("Failed to retrieve an image: ".concat(reason));
	            }));
	          };

	          for (var _iterator9 = storedObjectKeys.image[Symbol.iterator](), _step9; !(_iteratorNormalCompletion9 = (_step9 = _iterator9.next()).done); _iteratorNormalCompletion9 = true) {
	            _loop();
	          }
	        } catch (err) {
	          _didIteratorError9 = true;
	          _iteratorError9 = err;
	        } finally {
	          try {
	            if (!_iteratorNormalCompletion9 && _iterator9.return != null) {
	              _iterator9.return();
	            }
	          } finally {
	            if (_didIteratorError9) {
	              throw _iteratorError9;
	            }
	          }
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

	  return NyphApp;
	}(App);

	_defineProperty(NyphApp, "LOAD_SURVEYS_ENDPOINT", '/loadsurveys.php');

	_defineProperty(NyphApp, "EVENT_OCCURRENCE_ADDED", 'occurrenceadded');

	_defineProperty(NyphApp, "EVENT_SURVEYS_CHANGED", 'surveyschanged');

	_defineProperty(NyphApp, "devMode", false);

	// AppController
	// Abstract super-class for page controllers
	var AppController =
	/*#__PURE__*/
	function () {
	  function AppController() {
	    _classCallCheck(this, AppController);

	    _defineProperty(this, "route", null);

	    _defineProperty(this, "view", void 0);

	    _defineProperty(this, "title", 'untitled');

	    _defineProperty(this, "handle", void 0);

	    _defineProperty(this, "app", void 0);
	  }

	  _createClass(AppController, [{
	    key: "initialise",

	    /**
	     * called from App.initialise() to trigger late-stage initialisation
	     */
	    value: function initialise() {
	      this.view.initialise();
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

	      return _classStaticPrivateFieldSpecSet(AppController, AppController, _handleIndex, (_AppController$handle = +_classStaticPrivateFieldSpecGet(AppController, AppController, _handleIndex)) + 1), _AppController$handle;
	    }
	  }]);

	  return AppController;
	}();
	var _handleIndex = {
	  writable: true,
	  value: 0
	};

	var NotFoundError =
	/*#__PURE__*/
	function (_Error) {
	  _inherits(NotFoundError, _Error);

	  function NotFoundError(message) {
	    _classCallCheck(this, NotFoundError);

	    return _possibleConstructorReturn(this, _getPrototypeOf(NotFoundError).call(this, message));
	  }

	  return NotFoundError;
	}(_wrapNativeSuper(Error));

	var MainController =
	/*#__PURE__*/
	function (_AppController) {
	  _inherits(MainController, _AppController);

	  _createClass(MainController, [{
	    key: "occurrences",

	    /**
	     * event fired on and by view when 'next section' button has been click, leading to the records section
	     * this will expand the list of records, or if none exist, add a first one and open it
	     *
	     * @type {string}
	     */

	    /**
	     * @type {NyphApp}
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
	    get: function get() {
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
	      // if (this.#currentOccurrenceId && this.#currentOccurrenceId !== occurrenceId) {
	      //     if (this.#currentOccurrenceModifiedEventHandle) {
	      //         this.#currentOccurrenceModifiedEventHandle = this.currentOccurrence.removeListener(Occurrence.EVENT_MODIFIED, this.#currentOccurrenceModifiedEventHandle);
	      //     }
	      // }
	      _classPrivateFieldSet(this, _currentOccurrenceId, occurrenceId); // if (occurrenceId) {
	      //     this.#currentOccurrenceModifiedEventHandle = this.currentOccurrence.addListener(Occurrence.EVENT_MODIFIED, this, this.currentOccurrenceModifiedHandler);
	      // }

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
	    /**
	     *
	     * @param {MainView} view
	     */

	  }]);

	  function MainController(view) {
	    var _this;

	    _classCallCheck(this, MainController);

	    _this = _possibleConstructorReturn(this, _getPrototypeOf(MainController).call(this));

	    _defineProperty(_assertThisInitialized(_this), "route", '/list/:action/:id');

	    _defineProperty(_assertThisInitialized(_this), "title", 'BSBI New Year Plant Hunt homepage');

	    _defineProperty(_assertThisInitialized(_this), "app", void 0);

	    _defineProperty(_assertThisInitialized(_this), "view", void 0);

	    _currentOccurrenceId.set(_assertThisInitialized(_this), {
	      writable: true,
	      value: ''
	    });

	    _defineProperty(_assertThisInitialized(_this), "needsFullRefresh", true);

	    _defineProperty(_assertThisInitialized(_this), "needRightPanelRefresh", true);

	    _defineProperty(_assertThisInitialized(_this), "viewSubcontext", '');

	    _defineProperty(_assertThisInitialized(_this), "surveySection", void 0);

	    _defineProperty(_assertThisInitialized(_this), "leftPanelBaseRoute", '');

	    _defineProperty(_assertThisInitialized(_this), "viewContexts", {
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
	    view.controller = _assertThisInitialized(_this);
	    _this.handle = AppController.nextHandle;
	    view.addListener(MainController.EVENT_SELECT_OCCURRENCE, _assertThisInitialized(_this), _this.occurrenceSelectionHandler);
	    view.addListener(MainController.EVENT_SELECT_SURVEY_SECTION, _assertThisInitialized(_this), _this.surveyPartSelectionHandler);
	    view.addListener(MainController.EVENT_NEW_RECORD, _assertThisInitialized(_this), _this.newRecordHandler);
	    view.addListener(MainController.EVENT_DELETE_OCCURRENCE, _assertThisInitialized(_this), _this.deleteOccurrenceHandler);
	    view.addListener(MainController.EVENT_BACK, _assertThisInitialized(_this), _this.backHandler);
	    view.addListener(MainController.EVENT_NEXT_TO_RECORDS, _assertThisInitialized(_this), _this.nextTransitionToRecordsHandler);
	    return _this;
	  }
	  /**
	   * handler for event fired on and by view when 'next section' button has been click, leading to the records section
	   * this will expand the list of records, or if none exist, add a first one and open it
	   */


	  _createClass(MainController, [{
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
	     * @param {MainController} context
	     * @param {string} eventName
	     * @param {string} occurrenceId
	     */

	  }, {
	    key: "deleteOccurrenceHandler",
	    value: function deleteOccurrenceHandler(context, eventName, occurrenceId) {
	      console.log({
	        deleting: occurrenceId
	      });
	      var occurrence = this.app.occurrences.get(occurrenceId);

	      if (!occurrence) {
	        throw new InternalAppError("Occurrence id '".concat(occurrenceId, "' not found when trying to delete."));
	      }

	      occurrence.delete();

	      if (this.currentOccurrenceId === occurrenceId) {
	        //this.currentOccurrenceId = '';
	        this.app.router.navigate("/list/record/");
	      }
	    }
	    /**
	     *
	     * @param {MainController} context
	     * @param {string} eventName
	     * @param {{sectionKey : string}} params
	     */

	  }, {
	    key: "surveyPartSelectionHandler",
	    value: function surveyPartSelectionHandler(context, eventName, params) {
	      console.log('In surveyPartSelectionHandler');
	      console.log({
	        context: context,
	        eventName: eventName,
	        params: params
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
	     * @param {MainController} context
	     * @param {string} eventName
	     * @param {{occurrenceId : string}} params
	     */

	  }, {
	    key: "occurrenceSelectionHandler",
	    value: function occurrenceSelectionHandler(context, eventName, params) {
	      console.log({
	        'In occurrenceSelectionHandler': {
	          context: context,
	          eventName: eventName,
	          params: params
	        }
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

	var _currentOccurrenceId = new WeakMap();

	_defineProperty(MainController, "EVENT_SELECT_OCCURRENCE", 'selectoccurrence');

	_defineProperty(MainController, "EVENT_SELECT_SURVEY_SECTION", 'selectsurveysection');

	_defineProperty(MainController, "EVENT_NEW_RECORD", 'newrecord');

	_defineProperty(MainController, "EVENT_DELETE_OCCURRENCE", 'deleteoccurrence');

	_defineProperty(MainController, "EVENT_BACK", 'back');

	_defineProperty(MainController, "EVENT_NEXT_TO_RECORDS", 'nexttorecords');

	var htmlLayout = "\r\n<div class=\"container-fluid\">\r\n    <div class=\"row\" style=\"height: 90vh;\">\r\n        <div class=\"col d-md-block pr-md-0 pt-3\" id=\"col1panel\" style=\"overflow-y: auto; max-height: calc(100vh - 5rem);\">\r\n        </div>\r\n        <div class=\"col d-md-none pl-0 pr-0\" id=\"ctrlpanel\" style=\"background-color: aliceblue; width: 28px; max-width: 28px; overflow-y: hidden; \">\r\n            <button class=\"navbar-light navbar-toggler pl-0 pr-0\" type=\"button\" aria-label=\"Back\" id=\"right-panel-back\">\r\n                <i class=\"material-icons-round\" style=\"color: gray;\">view_list</i>\r\n            </button>\r\n        </div>\r\n        <div class=\"col d-md-block pr-md-0\" id=\"col2panel\" style=\"overflow-y: auto; height: 100%;\">\r\n        </div>\r\n    </div>\r\n</div>\r\n";

	var welcomeContent = "<!-- begin: templates/welcome.html -->\r\n<p>Using your experience as gardener, please help us identify\r\npotentially invasive plant species in gardens before they become a problem for\r\nbiodiversity and conservation in wild situations in Britain or Ireland.</p>\r\n<p>The survey is divided into three sections and usually takes between 15 and 20 minutes to complete. You can pause and come back\r\n    later at any point.</p>\r\n<p>The information that you provide will be used by the <a href=\"https://www.coventry.ac.uk/research/areas-of-research/agroecology-water-resilience/\" target=\"_blank\" title=\"CAWR\">Centre for Agroecology, Water and Resilience</a> at Coventry University and by\r\n    <a href=\"https://bsbi.org/\" target=\"_blank\" title=\"Botanical Society of Britain and Ireland\">BSBI</a> for a\r\n    study of invasive plants. We'll include your plant records in a permanent archive held by BSBI, to help us track\r\n    long term changes in plant distribution.</p>\r\n<p>To follow up any queries about the survey we request that you please provide your name and email address. You can choose whether or not\r\n    to include your name in our archive of plant records. Your email address (if provided) will be\r\nconfidential and won't be archived.</p>\r\n<p>A summary of records will appear on the project website, but the full survey details including the exact location of your garden will only be accessible to the research team.</p>\r\n<!-- end: templates/welcome.html -->\r\n";

	var defaultRightHandSideHelp = "<!-- begin: templates/formHelp/surveyAboutHelp.html -->\r\n<h3>Background to the project</h3>\r\n<p>The majority of our ornamental plants are non-native. They contribute greatly to our enjoyment\r\nof gardens and represent a long history of plant discovery and garden design. However, some\r\nhave escaped the controlled environment of gardens, and a small minority of these are\r\nthreatening native biodiversity or are causing severe problems for infrastructure, agriculture or\r\n    forestry. Well known examples include Japanese Knotweed (<i>Reynoutria japonica</i>), <i>Rhododendron\r\n        ponticum</i> and Himalayan Balsam (<i>Impatiens glandulifera</i>).</p>\r\n<p>The period between introduction of a species and it first being noticed as a problem can be a\r\nlong one, making future control problematic. In Britain on average, this time span has been more\r\nthan one hundred years. Early detection of potentially problematic plants for further risk\r\n    assessment could greatly improve our ability to prevent plant species becoming invasive.</p>\r\n<p>This survey is based upon the assumption that it is gardeners who are most likely to notice first\r\nif a particular ornamental plant may have the potential to spread outside the garden. (Most\r\ngardeners will know which plants tend to overgrow others or tend to spread all over the\r\ngarden.) This knowledge could be invaluable in identifying potential invaders, triggering timely risk\r\n    assessment.</p>\r\n<!-- end: templates/formHelp/surveyAboutHelp.html -->\r\n";

	var InputField =
	/*#__PURE__*/
	function (_FormField) {
	  _inherits(InputField, _FormField);

	  /**
	   * @type {string}
	   */

	  /**
	   * @type {string}
	   */

	  /**
	   *
	   * @type {string}
	   * @private
	   */

	  /**
	   *
	   * @type {string}
	   * @private
	   */

	  /**
	   *
	   * @type {string}
	   * @private
	   */

	  /**
	   *
	   * @param {{[label] : string, [helpText]: string, [options]: {}, [placeholder]: string, [type]: string, [autocomplete]: string}} [params]
	   */
	  function InputField(params) {
	    var _this;

	    _classCallCheck(this, InputField);

	    _this = _possibleConstructorReturn(this, _getPrototypeOf(InputField).call(this, params));

	    _inputId$1.set(_assertThisInitialized(_this), {
	      writable: true,
	      value: void 0
	    });

	    _containerId$5.set(_assertThisInitialized(_this), {
	      writable: true,
	      value: void 0
	    });

	    _defineProperty(_assertThisInitialized(_this), "_value", '');

	    _defineProperty(_assertThisInitialized(_this), "_inputType", 'text');

	    _defineProperty(_assertThisInitialized(_this), "_autocomplete", '');

	    if (params) {
	      if (params.type) {
	        _this._inputType = params.type;
	      }

	      if (params.placeholder) {
	        _this.placeholder = params.placeholder;
	      }

	      if (params.autocomplete) {
	        _this._autocomplete = params.autocomplete;
	      }
	    }

	    return _this;
	  }
	  /**
	   *
	   * @param {(string|null|undefined)} textContent
	   */


	  _createClass(InputField, [{
	    key: "updateView",
	    value: function updateView() {
	      if (this._fieldEl) {
	        // do nothing until the view has been constructed
	        var inputEl = document.getElementById(_classPrivateFieldGet(this, _inputId$1));
	        inputEl.value = FormField.cleanRawString(this._value);
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
	      // <div class="form-group">
	      //     <label for="{baseId}gridref">Postcode or grid-reference</label>
	      //     <input type="text" class="form-control" id="{baseId}gridref" aria-describedby="grHelp" placeholder="Grid-reference or postcode">
	      //     <small id="grHelp" class="form-text text-muted">We need to be able to put your survey on our map. Detailed locations won't be made public.</small>
	      // </div>
	      var container = document.createElement('div');
	      container.className = 'form-group';

	      _classPrivateFieldSet(this, _containerId$5, container.id = FormField.nextId);

	      _classPrivateFieldSet(this, _inputId$1, FormField.nextId);

	      var labelEl = container.appendChild(document.createElement('label'));
	      labelEl.htmlFor = _classPrivateFieldGet(this, _inputId$1);
	      labelEl.textContent = this.label;
	      var inputField = container.appendChild(document.createElement('input'));
	      inputField.className = "form-control";
	      inputField.id = _classPrivateFieldGet(this, _inputId$1);
	      inputField.type = this._inputType;

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

	      if (this.completion === FormField.COMPLETION_COMPULSORY) {
	        inputField.required = true;
	      }

	      if (this.validationMessage) {
	        var validationMessageElement = container.appendChild(document.createElement('div'));
	        validationMessageElement.className = 'invalid-feedback';
	        validationMessageElement.innerHTML = this.validationMessage;
	      }

	      if (this.helpText) {
	        var helpTextField = container.appendChild(document.createElement('small'));
	        helpTextField.innerHTML = this.helpText;
	      }

	      inputField.addEventListener('change', this.inputChangeHandler.bind(this));
	      this._fieldEl = container;
	    }
	    /**
	     *
	     * @param {(boolean|null)} isValid
	     */

	  }, {
	    key: "markValidity",
	    value: function markValidity(isValid) {
	      var el = document.getElementById(_classPrivateFieldGet(this, _inputId$1));

	      if (null === isValid) {
	        el.classList.remove('is-invalid', 'is-valid');
	      } else {
	        el.classList.remove(isValid ? 'is-invalid' : 'is-valid');
	        el.classList.add(isValid ? 'is-valid' : 'is-invalid');
	      }
	    }
	  }, {
	    key: "inputChangeHandler",
	    value: function inputChangeHandler(event) {
	      event.stopPropagation(); // don't allow the change event to reach the form-level event handler (will handle it here instead)

	      console.log('got input field change event');
	      this.value = FormField.cleanRawString(document.getElementById(_classPrivateFieldGet(this, _inputId$1)).value);
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

	  }, {
	    key: "value",
	    set: function set(textContent) {
	      this._value = undefined === textContent || null == textContent ? '' : textContent.trim();
	      this.updateView();
	    }
	    /**
	     *
	     * @returns {string}
	     */
	    ,
	    get: function get() {
	      return this._value;
	    }
	  }], [{
	    key: "summariseImpl",
	    value: function summariseImpl(key, property, attributes) {
	      return attributes[key] !== '' && attributes[key] !== null && attributes[key] !== undefined ? escapeHTML(attributes[key].trim()) : '';
	    }
	  }]);

	  return InputField;
	}(FormField);

	var _inputId$1 = new WeakMap();

	var _containerId$5 = new WeakMap();

	//import {NyphSurveyForm} from "./NyphSurveyForm";
	var NyphSurveyFormSection = function NyphSurveyFormSection() {
	  _classCallCheck(this, NyphSurveyFormSection);
	};

	_defineProperty(NyphSurveyFormSection, "sectionTitle", void 0);

	_defineProperty(NyphSurveyFormSection, "sectionSortOrder", void 0);

	_defineProperty(NyphSurveyFormSection, "sectionNavigationKey", void 0);

	_defineProperty(NyphSurveyFormSection, "help", '');

	_defineProperty(NyphSurveyFormSection, "properties", void 0);

	var helpPanelText$1 = "<!-- begin: templates/formHelp/surveyGardenHelp.html -->\r\n<h2>About your garden</h2>\r\n<p>The questions in this section provide background information about the area where you live.</p>\r\n<p>Please try to answer everything, but don't worry if some details are impossible to assess.</p>\r\n<p>When you have completed this section, move on to the final part of the survey, where you can list the invasive plants in your garden.</p>\r\n<!-- end: templates/formHelp/surveyGardenHelp.html -->\r\n";

	var NyphSurveyFormGardenSection =
	/*#__PURE__*/
	function (_NyphSurveyFormSectio) {
	  _inherits(NyphSurveyFormGardenSection, _NyphSurveyFormSectio);

	  function NyphSurveyFormGardenSection() {
	    _classCallCheck(this, NyphSurveyFormGardenSection);

	    return _possibleConstructorReturn(this, _getPrototypeOf(NyphSurveyFormGardenSection).apply(this, arguments));
	  }

	  return NyphSurveyFormGardenSection;
	}(NyphSurveyFormSection);

	_defineProperty(NyphSurveyFormGardenSection, "sectionNavigationKey", 'garden');

	_defineProperty(NyphSurveyFormGardenSection, "sectionTitle", 'About your garden');

	_defineProperty(NyphSurveyFormGardenSection, "sectionSortOrder", 1);

	_defineProperty(NyphSurveyFormGardenSection, "help", helpPanelText$1);

	_defineProperty(NyphSurveyFormGardenSection, "properties", {
	  // gardenSize : {
	  //     field: SelectField,
	  //     attributes: {
	  //         label: 'What is the size of your garden?',
	  //         //helpText: '(estimate)',
	  //         placeholder : 'please estimate',
	  //         options: {
	  //             '<50' : {label: 'less than 50m²'},
	  //             '50-100' : {label: '50m² to 100m²'},
	  //             '100-200' : {label: '100m² to 200m²'},
	  //             '200-400' : {label: '200m² to 400m²'},
	  //             '400-800' : {label: '400m² to 800m²'},
	  //             '>800' : {label: 'more than 800m²'}
	  //         },
	  //         includeOtherFreeText : false,
	  //         completion: FormField.COMPLETION_DESIRED,
	  //     }},
	  // areaAge : {
	  //     field: SelectField,
	  //     attributes: {
	  //         label: 'Estimated age of the residential area your garden is located in?',
	  //         //helpText: '(estimate)',
	  //         placeholder : 'please estimate',
	  //         options: {
	  //             '<1800' : {label: 'before 1800'},
	  //             '1800-1899' : {label: '19th century'},
	  //             '1900-1959' : {label: '1900-1960'},
	  //             '1960-1989' : {label: '1960-1980s'},
	  //             '1990-' : {label: '1990s onwards'}
	  //         },
	  //         includeOtherFreeText : false
	  //     }},
	  durationAtAddress: {
	    field: InputField,
	    attributes: {
	      label: 'Roughly how long have you lived at this address?',
	      //helpText: '',
	      placeholder: 'approximate years',
	      type: 'number'
	    }
	  },
	  numberOfPlants: {
	    field: SelectField,
	    attributes: {
	      label: 'Could you please try to estimate how many different ornamental plants are growing in your garden?',
	      //helpText: '(estimate)',
	      placeholder: 'please estimate',
	      options: {
	        '<20': {
	          label: 'fewer than 20'
	        },
	        '20-50': {
	          label: 'between 20 and 50'
	        },
	        '50-100': {
	          label: 'between 50 and 100'
	        },
	        '>100': {
	          label: 'more than 100'
	        },
	        'unknown': {
	          label: 'impossible to estimate'
	        }
	      },
	      includeOtherFreeText: false,
	      completion: FormField.COMPLETION_DESIRED
	    }
	  },
	  introductions: {
	    field: InputField,
	    attributes: {
	      label: 'In the last year, how many new ornamental plant species did you plant/introduce into your garden?',
	      helpText: 'please estimate',
	      placeholder: 'number of plants',
	      autocomplete: 'off',
	      type: 'number'
	    }
	  },
	  acquisitions: {
	    field: OptionsField,
	    attributes: {
	      label: 'In the last year, where did you get these new plants or seeds?',
	      helpText: '<i>(tick all that apply)</i>',
	      options: {
	        "nursery": {
	          label: "bought from nursery"
	        },
	        "gardencentre": {
	          label: "bought at garden centre"
	        },
	        "supermarket": {
	          label: "bought at supermarket"
	        },
	        "mailorder": {
	          label: "mail-order"
	        },
	        "internetorder": {
	          label: "internet order"
	        },
	        "friendsneighbours": {
	          label: "from friends or neighbours"
	        },
	        "swap": {
	          label: "plant / seed swap"
	        },
	        "other": {
	          label: "other"
	        }
	      },
	      includeOtherFreeText: true
	    }
	  },
	  gifts: {
	    field: SelectField,
	    attributes: {
	      label: 'In the last two years, did you give plants/seeds to friends/neighbours?',
	      //helpText: '(estimate)',
	      placeholder: 'please select a response',
	      options: {
	        'yes': {
	          label: 'yes'
	        },
	        'no': {
	          label: 'no'
	        }
	      },
	      includeOtherFreeText: false
	    }
	  }
	});

	var helpPanelText$2 = "<!-- begin: templates/formHelp/surveyAboutHelp.html -->\r\n<div class=\"card mt-3\">\r\n    <div class=\"card-body\">\r\n        <h5 class=\"card-title\">Localising your records</h5>\r\n        <p class=\"card-text\">To make sense of the national coverage of the records we receive, we need to know the approximate location\r\n        of your garden. Usually a postcode works well for this, but you can provide a grid-reference if you prefer (in Ireland please use a grid-reference as we don't yet have a way to convert postcodes).\r\n            We also need a place name, as a way to double check that the postcode or grid-reference makes sense.\r\n        </p>\r\n        <p><strong>Please don't provide your full address, as we would need to remove that from our data.</strong></p>\r\n    </div>\r\n</div>\r\n<div class=\"card mt-3\">\r\n    <div class=\"card-body\">\r\n        <h5 class=\"card-title\">Your name and email</h5>\r\n        <p class=\"card-text\">Both of these are optional, but providing an email address is important if you want to return\r\n            to your survey later or to revise your records. It is also really useful for our experts to be able to contact you\r\n            if we have questions about the records that you've sent.\r\n        </p>\r\n        <p>We'd like to be able to include your name with the records in our archive, but your email address won't be stored long-term\r\n            after your plant records have been checked.</p>\r\n    </div>\r\n</div>\r\n<!-- end: templates/formHelp/surveyAboutHelp.html -->\r\n";

	var NyphSurveyFormAboutSection =
	/*#__PURE__*/
	function (_NyphSurveyFormSectio) {
	  _inherits(NyphSurveyFormAboutSection, _NyphSurveyFormSectio);

	  function NyphSurveyFormAboutSection() {
	    _classCallCheck(this, NyphSurveyFormAboutSection);

	    return _possibleConstructorReturn(this, _getPrototypeOf(NyphSurveyFormAboutSection).apply(this, arguments));
	  }

	  return NyphSurveyFormAboutSection;
	}(NyphSurveyFormSection);

	_defineProperty(NyphSurveyFormAboutSection, "sectionNavigationKey", 'about');

	_defineProperty(NyphSurveyFormAboutSection, "sectionTitle", 'About you and your survey');

	_defineProperty(NyphSurveyFormAboutSection, "sectionSortOrder", 0);

	_defineProperty(NyphSurveyFormAboutSection, "help", helpPanelText$2);

	_defineProperty(NyphSurveyFormAboutSection, "properties", {
	  place: {
	    field: InputField,
	    attributes: {
	      label: 'Where did you survey?',
	      helpText: 'e.g. town or village. Please don\'t give an address.',
	      placeholder: 'Nearest named place',
	      autocomplete: 'address-level2',
	      completion: FormField.COMPLETION_COMPULSORY
	    }
	  },
	  georef: {
	    field: InputField,
	    attributes: {
	      label: 'Postcode or grid-reference',
	      helpText: 'We need to be able to put your survey on our map. Detailed locations won\'t be made public.',
	      placeholder: 'Grid-reference or postcode',
	      autocomplete: 'postal-code',
	      completion: FormField.COMPLETION_COMPULSORY
	    }
	  },
	  recorder: {
	    field: InputField,
	    attributes: {
	      label: 'Your name',
	      helpText: '(optional) This helps us follow-up if we have any queries about your records and allows us to properly acknowledge the origin of your observations.',
	      placeholder: 'full name',
	      autocomplete: 'name'
	    }
	  },
	  namearchive: {
	    field: SelectField,
	    attributes: {
	      label: 'Can we include your name in our archive of plant records?',
	      helpText: '',
	      placeholder: 'please choose an option',
	      options: {
	        "yes": {
	          label: "yes"
	        },
	        "no": {
	          label: "no, I'd prefer my records to be anonymous"
	        }
	      },
	      includeOtherFreeText: false,
	      completion: FormField.COMPLETION_DESIRED
	    }
	  },
	  email: {
	    field: InputField,
	    attributes: {
	      label: 'Your email address',
	      helpText: '(optional) We\'ll never share your email with anyone else.',
	      autocomplete: 'email',
	      type: 'email'
	    }
	  }
	});

	var LEFT_PANEL_ID = 'col1panel';
	var RIGHT_PANEL_ID = 'col2panel'; // 'occurrenceeditorcontainer';

	var CONTROL_PANEL_ID = 'ctrlpanel';
	var PANEL_BACK_BUTTON_ID = 'right-panel-back';
	var PANEL_LEFT = 'left';
	var PANEL_RIGHT = 'right';
	var DELETE_OCCURRENCE_MODAL_ID = 'deleteoccurrencemodal';
	var FINISH_MODAL_ID = 'finishmodal';
	var OCCURRENCE_LIST_CONTAINER_ID = 'occurrencelistcontainer';
	NyphSurveyForm.registerSection(NyphSurveyFormAboutSection);
	NyphSurveyForm.registerSection(NyphSurveyFormGardenSection);
	var MainView =
	/*#__PURE__*/
	function (_Page) {
	  _inherits(MainView, _Page);

	  function MainView() {
	    var _getPrototypeOf2;

	    var _this;

	    _classCallCheck(this, MainView);

	    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
	      args[_key] = arguments[_key];
	    }

	    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(MainView)).call.apply(_getPrototypeOf2, [this].concat(args)));

	    _occurrenceSummaryHTML.add(_assertThisInitialized(_this));

	    _buildOccurrenceList.add(_assertThisInitialized(_this));

	    _appendOccurrenceListContainer.add(_assertThisInitialized(_this));

	    _appendSurveyForm.add(_assertThisInitialized(_this));

	    _appendWelcomeSection.add(_assertThisInitialized(_this));

	    _registerLeftPanelAccordionEvent.add(_assertThisInitialized(_this));

	    _registerModals.add(_assertThisInitialized(_this));

	    _populateLeftPanel.add(_assertThisInitialized(_this));

	    _clearOccurrenceListeners.add(_assertThisInitialized(_this));

	    _displayDefaultRightPanel.add(_assertThisInitialized(_this));

	    _refreshOccurrenceEditor.add(_assertThisInitialized(_this));

	    _refreshSurveyHelpPanel.add(_assertThisInitialized(_this));

	    _defineProperty(_assertThisInitialized(_this), "controller", void 0);

	    _surveyFormSections.set(_assertThisInitialized(_this), {
	      writable: true,
	      value: {}
	    });

	    _occurrenceForm.set(_assertThisInitialized(_this), {
	      writable: true,
	      value: void 0
	    });

	    _occurrenceChangeHandles.set(_assertThisInitialized(_this), {
	      writable: true,
	      value: {}
	    });

	    _defineProperty(_assertThisInitialized(_this), "panelKey", '');

	    _defineProperty(_assertThisInitialized(_this), "OCCURRENCES_ARE_LAST_SECTION", true);

	    return _this;
	  }

	  _createClass(MainView, [{
	    key: "initialise",

	    /**
	     * called once during late-stage app initialisation
	     * (NB this may not be the current view when called)
	     *
	     * an opportunity to register listeners on this.controller.app
	     */
	    value: function initialise() {
	      this.controller.app.addListener(NyphApp.EVENT_OCCURRENCE_ADDED, this, 'occurrenceAddedHandler');
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

	      var _iteratorNormalCompletion = true;
	      var _didIteratorError = false;
	      var _iteratorError = undefined;

	      try {
	        for (var _iterator = cards[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	          var card = _step.value;
	          var cardSection = card.getAttribute('data-sectionkey');

	          if (cardSection === targetMatch) {
	            card.classList.add('show');
	          } else {
	            card.classList.remove('show');
	          }
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
	      var _iteratorNormalCompletion2 = true;
	      var _didIteratorError2 = false;
	      var _iteratorError2 = undefined;

	      try {
	        for (var _iterator2 = occurrenceCards[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
	          var card = _step2.value;
	          var cardOccurrenceId = card.getAttribute('data-occurrenceid');

	          if (cardOccurrenceId === targetMatch) {
	            card.classList.add('show');
	          } else {
	            card.classList.remove('show');
	          }
	        }
	      } catch (err) {
	        _didIteratorError2 = true;
	        _iteratorError2 = err;
	      } finally {
	        try {
	          if (!_iteratorNormalCompletion2 && _iterator2.return != null) {
	            _iterator2.return();
	          }
	        } finally {
	          if (_didIteratorError2) {
	            throw _iteratorError2;
	          }
	        }
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

	    /**
	     * adds next/new and finish/close button to below right-panel occurrence editor
	     * @param {HTMLElement} editorContainer
	     */
	    value: function refreshOccurrenceFooterControls(editorContainer) {
	      var _this3 = this;

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
	        var _nextSection = NyphSurveyForm.sections[nextFormIndex];
	        var nextButton = buttonContainer.appendChild(document.createElement('button'));
	        nextButton.className = 'btn btn-primary btn-md-lg mt-2 mb-3';
	        nextButton.type = 'button';
	        nextButton.textContent = 'next »';
	        nextButton.setAttribute('data-buttonaction', 'next');
	        nextButton.title = _nextSection.sectionTitle;
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


	              $$1("#".concat(FINISH_MODAL_ID)).modal();
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
	      var _iteratorNormalCompletion3 = true;
	      var _didIteratorError3 = false;
	      var _iteratorError3 = undefined;

	      try {
	        for (var _iterator3 = this.controller.occurrences.entries()[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
	          var occurrenceTuple = _step3.value;

	          if (occurrenceTuple[1].createdStamp > occurrence.createdStamp && !occurrenceTuple[1].deleted) {
	            return false;
	          }
	        }
	      } catch (err) {
	        _didIteratorError3 = true;
	        _iteratorError3 = err;
	      } finally {
	        try {
	          if (!_iteratorNormalCompletion3 && _iterator3.return != null) {
	            _iterator3.return();
	          }
	        } finally {
	          if (_didIteratorError3) {
	            throw _iteratorError3;
	          }
	        }
	      }

	      return true;
	    }
	    /**
	     *
	     * @param {string} [htmlText]
	     */

	  }, {
	    key: "newButtonClickHandler",

	    /**
	     * @param {MouseEvent} event
	     */
	    value: function newButtonClickHandler(event) {
	      event.preventDefault();
	      event.stopPropagation();
	      this.fireEvent(MainController.EVENT_NEW_RECORD);
	    }
	    /**
	     *
	     */

	  }, {
	    key: "occurrenceAddedHandler",

	    /**
	     * called after the one-off addition of a new occurrence
	     *
	     * @param context
	     * @param {string} eventName
	     * @param {{occurrenceId: string, surveyId: string}} params
	     */
	    value: function occurrenceAddedHandler(context, eventName, params) {
	      var occurrenceList = document.getElementById(OCCURRENCE_LIST_CONTAINER_ID);

	      if (occurrenceList) {
	        var occurrence = this.controller.occurrences.get(params.occurrenceId);
	        var itemCard = document.createElement('div');
	        itemCard.className = 'card';
	        itemCard.id = "card_".concat(occurrence.id);
	        itemCard.innerHTML = _classPrivateMethodGet(this, _occurrenceSummaryHTML, _occurrenceSummaryHTML2).call(this, occurrence);
	        _classPrivateFieldGet(this, _occurrenceChangeHandles)[occurrence.id] = occurrence.addListener(Occurrence.EVENT_MODIFIED, this, this.occurrenceChangeHandler, {
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
	        var validity = occurrence.evaluateCompletionStatus(NyphOccurrenceForm.properties);

	        if (validity.requiredFieldsPresent) {
	          cardEl.classList.remove('is-invalid');
	        } else {
	          cardEl.classList.add('is-invalid');
	        }
	      }
	    }
	    /**
	     *
	     * @param context
	     * @param {string} eventName
	     * @param {{occurrenceId : string}} params
	     */

	  }, {
	    key: "occurrenceChangeHandler",
	    value: function occurrenceChangeHandler(context, eventName, params) {
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
	        if (occurrence.attributes.hasOwnProperty(key) && NyphOccurrenceForm.properties.hasOwnProperty(key) && !NyphOccurrenceForm.properties[key].field.isEmpty(occurrence.attributes[key])) {
	          var summaryHTML = NyphOccurrenceForm.properties[key].field.summarise(key, NyphOccurrenceForm.properties[key], occurrence.attributes);

	          if (summaryHTML) {
	            html += "<p class=\"ellipsed-line mb-0\">".concat(summaryHTML, "</p>");
	          }
	        }
	      }

	      if (NyphApp.devMode) {
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

	    /**
	     *
	     * @param {('left'|'right')} panel
	     */
	    value: function setResponsivePanel(panel) {
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

	var _surveyFormSections = new WeakMap();

	var _occurrenceForm = new WeakMap();

	var _occurrenceChangeHandles = new WeakMap();

	var _refreshSurveyHelpPanel = new WeakSet();

	var _refreshOccurrenceEditor = new WeakSet();

	var _displayDefaultRightPanel = new WeakSet();

	var _clearOccurrenceListeners = new WeakSet();

	var _populateLeftPanel = new WeakSet();

	var _registerModals = new WeakSet();

	var _registerLeftPanelAccordionEvent = new WeakSet();

	var _appendWelcomeSection = new WeakSet();

	var _appendSurveyForm = new WeakSet();

	var _appendOccurrenceListContainer = new WeakSet();

	var _buildOccurrenceList = new WeakSet();

	var _occurrenceSummaryHTML = new WeakSet();

	var _refreshSurveyHelpPanel2 = function _refreshSurveyHelpPanel2() {
	  var rightPanelContainer = document.getElementById(RIGHT_PANEL_ID);
	  var sectionKey = this.controller.surveySection; // section key can be 'welcome' which is a special case that doesn't match a section form

	  var help = NyphSurveyForm.sectionsByKey[sectionKey] ? NyphSurveyForm.sectionsByKey[sectionKey].help : '';

	  if (help) {
	    rightPanelContainer.innerHTML = help;
	  } else if (sectionKey === 'welcome') {
	    rightPanelContainer.innerHTML = defaultRightHandSideHelp;
	  } else {
	    // shouldn't get here
	    rightPanelContainer.innerHTML = "<p>placeholder survey help content for '".concat(sectionKey, "'</p>");
	  }
	};

	var _refreshOccurrenceEditor2 = function _refreshOccurrenceEditor2() {
	  try {
	    var occurrence = this.controller.currentOccurrence;
	    var editorContainer = document.getElementById(RIGHT_PANEL_ID);

	    if (occurrence) {
	      if (!_classPrivateFieldGet(this, _occurrenceForm) || _classPrivateFieldGet(this, _occurrenceForm).occurrenceId !== occurrence.id) {
	        if (_classPrivateFieldGet(this, _occurrenceForm)) {
	          _classPrivateFieldGet(this, _occurrenceForm).destructor();
	        } // form has not been initialised or current occurrence has changed


	        _classPrivateFieldSet(this, _occurrenceForm, occurrence.getForm());

	        _classPrivateFieldGet(this, _occurrenceForm).surveyId = this.controller.app.currentSurvey.id; // scroll to the top of the panel

	        editorContainer.scrollTop = 0;
	      }

	      editorContainer.innerHTML = '';

	      var formEl = _classPrivateFieldGet(this, _occurrenceForm).formElement;

	      editorContainer.appendChild(formEl);

	      _classPrivateFieldGet(this, _occurrenceForm).populateFormContent();

	      this.refreshOccurrenceFooterControls(editorContainer); // ensures that the accordion matches the navigation state

	      $$1("#description_".concat(occurrence.id)).collapse('show');
	    } else {
	      _classPrivateMethodGet(this, _displayDefaultRightPanel, _displayDefaultRightPanel2).call(this, NyphOccurrenceForm.help);
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
	};

	var _displayDefaultRightPanel2 = function _displayDefaultRightPanel2(htmlText) {
	  var editorContainer = document.getElementById(RIGHT_PANEL_ID);
	  editorContainer.innerHTML = htmlText || defaultRightHandSideHelp;
	};

	var _clearOccurrenceListeners2 = function _clearOccurrenceListeners2() {
	  for (var id in _classPrivateFieldGet(this, _occurrenceChangeHandles)) {
	    var occurrence = this.controller.occurrences.get[id];

	    if (occurrence) {
	      occurrence.removeListener(Occurrence.EVENT_MODIFIED, _classPrivateFieldGet(this, _occurrenceChangeHandles)[id]);
	    }
	  }

	  _classPrivateFieldSet(this, _occurrenceChangeHandles, {});
	};

	_defineProperty(MainView, "NEXT_RECORDS", 'records');

	_defineProperty(MainView, "NEXT_SURVEY_SECTION", 'survey');

	_defineProperty(MainView, "NEXT_IS_FINAL", 'last');

	var _populateLeftPanel2 = function _populateLeftPanel2() {
	  var _this4 = this;

	  var leftPanel = document.getElementById(LEFT_PANEL_ID);
	  var accordionEl = leftPanel.appendChild(document.createElement('div'));
	  accordionEl.className = "accordion";
	  this.leftPanelAccordionId = accordionEl.id = Form.nextId;

	  _classPrivateMethodGet(this, _appendWelcomeSection, _appendWelcomeSection2).call(this);

	  _classPrivateMethodGet(this, _appendSurveyForm, _appendSurveyForm2).call(this, 0, accordionEl, MainView.NEXT_RECORDS); // about you


	  _classPrivateMethodGet(this, _appendOccurrenceListContainer, _appendOccurrenceListContainer2).call(this); // Keep this as is useful as guide for building other app layouts
	  // this.#appendSurveyForm(1, accordionEl, MainView.NEXT_IS_FINAL); // about your garden


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
	};

	var _registerModals2 = function _registerModals2() {
	  var _this5 = this;

	  //const container = document.getElementById(LEFT_PANEL_ID);
	  var container = document.body; // Delete record modal

	  var deleteOccurrenceModalHTML = "<div class=\"modal fade\" id=\"".concat(DELETE_OCCURRENCE_MODAL_ID, "\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"").concat(DELETE_OCCURRENCE_MODAL_ID, "Title\" aria-hidden=\"true\">\n  <div class=\"modal-dialog modal-dialog-centered\" role=\"document\">\n    <div class=\"modal-content\">\n      <div class=\"modal-header\">\n        <h5 class=\"modal-title\" id=\"").concat(DELETE_OCCURRENCE_MODAL_ID, "Title\">Delete record?</h5>\n        <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\">\n          <span aria-hidden=\"true\">&times;</span>\n        </button>\n      </div>\n      <div class=\"modal-body\">\n        Please confirm that you wish to delete the record.\n      </div>\n      <div class=\"modal-footer\">\n        <button type=\"button\" class=\"btn btn-secondary\" data-dismiss=\"modal\">Back</button>\n        <button type=\"button\" class=\"btn btn-danger\" data-dismiss=\"modal\" id=\"").concat(DELETE_OCCURRENCE_MODAL_ID, "confirmed\">Delete record</button>\n      </div>\n    </div>\n  </div>\n</div>");
	  var deleteOccurrenceModalEl = document.createElement('div');
	  deleteOccurrenceModalEl.innerHTML = deleteOccurrenceModalHTML;
	  container.appendChild(deleteOccurrenceModalEl.firstChild);
	  $$1("#".concat(DELETE_OCCURRENCE_MODAL_ID)).on('show.bs.modal', function (event) {
	    var button = $$1(event.relatedTarget); // Button that triggered the modal
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

	      _this5.fireEvent(MainController.EVENT_DELETE_OCCURRENCE, occurrenceId);
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

	      _classPrivateFieldGet(_this5, _occurrenceForm).fireEvent(EVENT_DELETE_IMAGE, imageId);

	      $$1("#".concat(IMAGE_MODAL_ID)).modal('hide');
	    }
	  });
	};

	var _registerLeftPanelAccordionEvent2 = function _registerLeftPanelAccordionEvent2() {
	  var _this6 = this;

	  // console.log('Registering left panel accordion event handler.');
	  $$1("#".concat(LEFT_PANEL_ID)).on('show.bs.collapse', function (event) {
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
	};

	var _appendWelcomeSection2 = function _appendWelcomeSection2() {
	  var accordionEl = document.getElementById(this.leftPanelAccordionId); // add 'next' button to the bottom of the survey form

	  var nextButton = document.createElement('button');
	  nextButton.className = 'btn btn-primary';
	  nextButton.type = 'button';
	  nextButton.textContent = 'get started »';
	  nextButton.setAttribute('data-toggle', 'collapse');
	  nextButton.setAttribute('data-target', '#survey-0-about');
	  var cardId = Form.nextId;
	  var sectionElement = document.createElement('div');
	  sectionElement.innerHTML = welcomeContent;
	  sectionElement.appendChild(nextButton);
	  var helpLink = document.createElement('span');
	  helpLink.className = 'd-md-none pl-2';
	  helpLink.innerHTML = "(<a href=\"/app/list/survey/welcome/help\" data-navigo=\"list/survey/welcome/help\">more info</a>)";
	  sectionElement.appendChild(helpLink);
	  accordionEl.appendChild(this.card({
	    cardId: cardId,
	    cardHeadingId: Form.nextId,
	    collapsed: this.controller.surveySection !== 'welcome',
	    headingButtonId: Form.nextId,
	    headingHTML: 'Welcome',
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
	};

	var _appendSurveyForm2 = function _appendSurveyForm2(formIndex, accordionEl, next) {
	  var _this7 = this;

	  var sectionClass = NyphSurveyForm.sections[formIndex];
	  var surveyFormSection = new NyphSurveyForm(sectionClass);
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
	      var _nextSection2 = NyphSurveyForm.sections[formIndex + 1];
	      nextButton.setAttribute('data-toggle', 'collapse');
	      nextButton.setAttribute('data-target', "#survey-".concat(formIndex + 1, "-").concat(_nextSection2.sectionNavigationKey));
	      nextButton.title = _nextSection2.sectionTitle;
	      break;

	    case MainView.NEXT_IS_FINAL:
	      nextButton.textContent = 'finish';
	      nextButton.className = 'btn btn-primary btn-md-lg mt-2 mb-3';
	      nextButton.type = 'button';
	      nextButton.addEventListener('click', function ()
	      /* event */
	      {
	        _this7.controller.app.router.navigate('/list/'); // display the finish dialogue box


	        $$1("#".concat(FINISH_MODAL_ID)).modal();
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
	  surveyFormSection.addListener(NyphSurveyForm.EVENT_VALIDATION_STATE_CHANGE, this, function (context, eventName, isValid) {
	    var cardEl = document.getElementById(cardId);

	    if (isValid) {
	      cardEl.classList.remove('is-invalid');
	    } else {
	      cardEl.classList.add('is-invalid');
	    }
	  });
	};

	var _appendOccurrenceListContainer2 = function _appendOccurrenceListContainer2() {
	  var accordionEl = document.getElementById(this.leftPanelAccordionId);
	  var content = document.createDocumentFragment();
	  var summaryEl = content.appendChild(document.createElement('p')); // noinspection HtmlUnknownTarget

	  summaryEl.innerHTML = 'Records of invasive plants in your garden.<small class="d-block d-md-none"><a href="/app/list/record/help">(help)</a></small>';
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
	};

	var _buildOccurrenceList2 = function _buildOccurrenceList2() {
	  var listContainer = document.getElementById(OCCURRENCE_LIST_CONTAINER_ID);

	  if (!listContainer) {
	    throw new InternalAppError("Failed to find list container.");
	  }

	  _classPrivateMethodGet(this, _clearOccurrenceListeners, _clearOccurrenceListeners2).call(this);

	  var occurrencesHtml = []; // loop through entries sorted by creation date, most recent first

	  var _iteratorNormalCompletion4 = true;
	  var _didIteratorError4 = false;
	  var _iteratorError4 = undefined;

	  try {
	    for (var _iterator4 = _toConsumableArray(this.controller.occurrences.entries()).sort(function (a, b) {
	      return b[1].createdStamp - a[1].createdStamp;
	    })[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
	      var occurrenceTuple = _step4.value;
	      var occurrence = occurrenceTuple[1];

	      if (!occurrence.deleted) {
	        var valid = occurrence.isNew || occurrence.evaluateCompletionStatus(NyphOccurrenceForm.properties).requiredFieldsPresent;
	        occurrencesHtml.push("<div class=\"card".concat(valid ? '' : ' is-invalid', "\" id=\"card_").concat(occurrence.id, "\">\n    ").concat(_classPrivateMethodGet(this, _occurrenceSummaryHTML, _occurrenceSummaryHTML2).call(this, occurrence), "\n</div>"));
	        _classPrivateFieldGet(this, _occurrenceChangeHandles)[occurrence.id] = occurrence.addListener(Occurrence.EVENT_MODIFIED, this, this.occurrenceChangeHandler, {
	          occurrenceId: occurrence.id
	        });
	      }
	    }
	  } catch (err) {
	    _didIteratorError4 = true;
	    _iteratorError4 = err;
	  } finally {
	    try {
	      if (!_iteratorNormalCompletion4 && _iterator4.return != null) {
	        _iterator4.return();
	      }
	    } finally {
	      if (_didIteratorError4) {
	        throw _iteratorError4;
	      }
	    }
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

	      $$1(targetButtonEl.getAttribute('data-target')).modal();
	      event.preventDefault();
	      event.stopPropagation();
	    }
	  });
	};

	var _occurrenceSummaryHTML2 = function _occurrenceSummaryHTML2(occurrence) {
	  return "<div class=\"card-header pointer pl-2 pr-2 pt-2 pb-2\" id=\"heading_".concat(occurrence.id, "\" data-toggle=\"collapse\" data-target=\"#description_").concat(occurrence.id, "\">\n    <div class=\"float-right\">\n        <button type=\"button\" class=\"btn btn-outline-danger delete-occurrence-button\" data-toggle=\"modal\" data-target=\"#").concat(DELETE_OCCURRENCE_MODAL_ID, "\" data-occurrenceid=\"").concat(occurrence.id, "\"><i class=\"material-icons\">delete</i></button>\n    </div>\n    <h2 class=\"mb-0 pb-0 mt-0 pt-0 pl-0 ml-0\">\n        <button class=\"btn btn-link").concat(this.controller.currentOccurrenceId === occurrence.id ? '' : ' collapsed', " pt-0 pb-0 pl-0\" id=\"headingbutton_").concat(occurrence.id, "\" type=\"button\" data-toggle=\"collapse\" data-target=\"#description_").concat(occurrence.id, "\" aria-expanded=\"").concat(this.controller.currentOccurrenceId === occurrence.id ? 'true' : 'false', "\" aria-controls=\"description_").concat(occurrence.id, "\">\n          ").concat(this.occurrenceSummaryHeadingHTML(occurrence), "\n        </button>\n    </h2>\n    <div class=\"card-invalid-feedback\">\n        <small>Please check for errors or missing details.</small>\n    </div>\n</div>\n<div id=\"description_").concat(occurrence.id, "\" class=\"collapse").concat(this.controller.currentOccurrenceId === occurrence.id ? ' show' : '', "\" aria-labelledby=\"heading_").concat(occurrence.id, "\" data-parent=\"#").concat(OCCURRENCE_LIST_CONTAINER_ID, "\" data-occurrenceid=\"").concat(occurrence.id, "\">\n  <div class=\"card-body\">\n    ").concat(this.occurrenceSummaryBodyHTML(occurrence), "\n  </div>\n</div>");
	};

	var StaticContentController =
	/*#__PURE__*/
	function (_AppController) {
	  _inherits(StaticContentController, _AppController);

	  /**
	   * @type {string}
	   */

	  /**
	   *
	   * @param {Page} view
	   * @param {string} route
	   */
	  function StaticContentController(view, route) {
	    var _this;

	    _classCallCheck(this, StaticContentController);

	    _this = _possibleConstructorReturn(this, _getPrototypeOf(StaticContentController).call(this));

	    _defineProperty(_assertThisInitialized(_this), "route", void 0);

	    _this.view = view;
	    _this.route = route;
	    _this.handle = AppController.nextHandle;
	    return _this;
	  }
	  /**
	   *
	   * @param {object} params
	   * @param {string} query
	   */


	  _createClass(StaticContentController, [{
	    key: "routeHandler",
	    value: function routeHandler(params, query) {
	      console.log("reached route handler for StaticContentController.js");
	      this.app.currentControllerHandle = this.handle;
	      this.view.display();
	    }
	  }]);

	  return StaticContentController;
	}(AppController);

	var htmlContent = "<!-- begin: templates/helpPage.html -->\r\n<div class=\"accordion\" id=\"helpaccordion\">\r\n    <div class=\"card\">\r\n        <div class=\"card-header\" id=\"helphelpheadingOne\">\r\n            <h5 class=\"mb-0\">\r\n                <button class=\"btn btn-link\" type=\"button\" data-toggle=\"collapse\" data-target=\"#collapseOne\" aria-expanded=\"true\" aria-controls=\"collapseOne\">\r\n                    About the invasive plants survey\r\n                </button>\r\n            </h5>\r\n        </div>\r\n\r\n        <div id=\"collapseOne\" class=\"collapse show\" aria-labelledby=\"helpheadingOne\" data-parent=\"#helpaccordion\">\r\n            <div class=\"card-body\">\r\n                <div style=\"float: right; padding-left: 12px; margin: 0;\" class=\"d-none d-md-block\"><a href=\"/Plant_Alert_Flyer.pdf\" target=\"_blank\" title=\"Plant Alert introductory leaflet (pdf)\"><img src=\"/img/leaflet_thumb-or8.png\" alt=\"\" width=\"196\"><p>download Plant Alert leaflet (pdf)</p></a></div>\r\n                <p>Invasive non-native plants are causing major problems\r\n                for native biodiversity, ecosystems, infrastructure, the\r\n                built environment and human health. Most of our\r\n                invasive plants were introduced as ornamental garden\r\n                    plants but then escaped into the wider environment.</p>\r\n                <p>While maintaining the benefits and contributions of nonnative plants to our gardens we need to know\r\n                    early which plants might endanger natural habitats in the future. Gardeners can play a crucial role\r\n                    as they may be the first to notice any ornamental plants that show signs of invasiveness.</p>\r\n                <p class=\"d-block d-md-none\"><a href=\"/Plant_Alert_Flyer.pdf\" target=\"_blank\" title=\"Plant Alert introductory leaflet (pdf)\">Download the Plant Alert Leaflet</a></p>\r\n            </div>\r\n        </div>\r\n    </div>\r\n    <div class=\"card\">\r\n        <div class=\"card-header\" id=\"helpheadingTwo\">\r\n            <h5 class=\"mb-0\">\r\n                <button class=\"btn btn-link collapsed\" type=\"button\" data-toggle=\"collapse\" data-target=\"#collapseTwo\" aria-expanded=\"false\" aria-controls=\"collapseTwo\">\r\n                    What happens to my records?\r\n                </button>\r\n            </h5>\r\n        </div>\r\n        <div id=\"collapseTwo\" class=\"collapse\" aria-labelledby=\"helpheadingTwo\" data-parent=\"#helpaccordion\">\r\n            <div class=\"card-body\">\r\n                <p>A list of reported plants can be accessed on the website. At least once a year we will publish a summary of all records received on the webpage and in the <a href=\"https://bsbi.org/\">BSBI's newsletter</a>.\r\n                Data collected will be used in risk assessments of species as well as to provide gardeners and nurseries with advice on which plants could also\r\n                    become difficult to manage in gardens.</p>\r\n                <p>The data will also be included in BSBI's permanent archive of plant occurrence records.</p>\r\n            </div>\r\n        </div>\r\n    </div>\r\n    <div class=\"card\">\r\n        <div class=\"card-header\" id=\"helpheadingwhatreport\">\r\n            <h5 class=\"mb-0\">\r\n                <button class=\"btn btn-link collapsed\" type=\"button\" data-toggle=\"collapse\" data-target=\"#collapseWhatReport\" aria-expanded=\"false\" aria-controls=\"collapseThree\">\r\n                    Which plants should be reported?\r\n                </button>\r\n            </h5>\r\n        </div>\r\n        <div id=\"collapseWhatReport\" class=\"collapse\" aria-labelledby=\"helpheadingwhatreport\" data-parent=\"#helpaccordion\">\r\n            <div class=\"card-body\">\r\n                <p>Many ornamental plants in your garden will spread\r\n                    and this is a sign that they are growing well. We only\r\n                    want to know about those that are spreading to an\r\n                    extent that you have to control them to prevent them\r\n                    overgrowing other plants or parts of your garden\r\n                    where you do not want them.</p>\r\n                    <p>If you do not know a plant you want to report or are\r\n                    not sure, you can submit photographs we will use to\r\n                    help with identification</p>\r\n            </div>\r\n        </div>\r\n    </div>\r\n    <div class=\"card\">\r\n        <div class=\"card-header\" id=\"helpheadingThree\">\r\n            <h5 class=\"mb-0\">\r\n                <button class=\"btn btn-link collapsed\" type=\"button\" data-toggle=\"collapse\" data-target=\"#collapseThree\" aria-expanded=\"false\" aria-controls=\"collapseThree\">\r\n                    Help and support\r\n                </button>\r\n            </h5>\r\n        </div>\r\n        <div id=\"collapseThree\" class=\"collapse\" aria-labelledby=\"helpheadingThree\" data-parent=\"#helpaccordion\">\r\n            <div class=\"card-body\">\r\n                <p>If you encounter problems, would like to provide feedback about the survey or for more information about Nyph, please contact\r\n                <a href=\"mailto:support@nyph.bsbi.org\">support@nyph.bsbi.org</a>.</p>\r\n            </div>\r\n        </div>\r\n    </div>\r\n    <div class=\"card\">\r\n        <div class=\"card-header\" id=\"helpheadingFour\">\r\n            <h5 class=\"mb-0\">\r\n                <button class=\"btn btn-link collapsed\" type=\"button\" data-toggle=\"collapse\" data-target=\"#collapseFour\" aria-expanded=\"false\" aria-controls=\"collapseThree\">\r\n                    Links to further information\r\n                </button>\r\n            </h5>\r\n        </div>\r\n        <div id=\"collapseFour\" class=\"collapse\" aria-labelledby=\"helpheadingFour\" data-parent=\"#helpaccordion\">\r\n            <div class=\"card-body\">\r\n                <p>Introductory article published in BSBI news.<br>\r\n                    Judith Conroy &amp; Katharina Dehnen-Schmutz. 2018. <a href=\"/GardenOrnamentals_BSBI_News_2018.pdf\" target=\"_blank\">Can gardeners help identify ornamental plants at risk\r\n                    of becoming invasive?</a> BSBI News. <strong>139</strong>: 51.</p>\r\n                <p>The findings of a pilot study for Nyph have been published:<br>\r\n                    Dehnen-Schmutz, K. &amp; Conroy, J. Biol Invasions (2018) <strong>20</strong>: 3069. <a href=\"https://doi.org/10.1007/s10530-018-1759-3\" target=\"_blank\">https://doi.org/10.1007/s10530-018-1759-3</a></p>\r\n                <p>Background information about invasive species can be found on the <a href=\"http://www.nonnativespecies.org/\" target=\"_blank\">GB Non-native Species Secretariat</a> website.</p>\r\n\r\n            </div>\r\n        </div>\r\n    </div>\r\n    <div class=\"card\">\r\n        <div class=\"card-header\" id=\"helpheadingFive\">\r\n            <h5 class=\"mb-0\">\r\n                <button class=\"btn btn-link collapsed\" type=\"button\" data-toggle=\"collapse\" data-target=\"#collapseFive\" aria-expanded=\"false\" aria-controls=\"collapseThree\">\r\n                    About us\r\n                </button>\r\n            </h5>\r\n        </div>\r\n        <div id=\"collapseFive\" class=\"collapse\" aria-labelledby=\"helpheadingFive\" data-parent=\"#helpaccordion\">\r\n            <div class=\"card-body\">\r\n                Nyph is a collaboration between and the <a href=\"https://www.coventry.ac.uk/research/areas-of-research/agroecology-water-resilience/\" title=\"CAWR\" target=\"_blank\">Centre for Agroecology, Water and Resilience</a> at Coventry University and the <a href=\"https://bsbi.org/\" target=\"_blank\" title=\"BSBI\">Botanical Society of Britain and Ireland</a>.\r\n                <p>For more information, please contact <a href=\"mailto:support@nyph.bsbi.org\">support@nyph.bsbi.org</a>.</p>\r\n                <p>Follow us on twitter <a href=\"https://twitter.com/Plant_Alert\" target=\"_blank\">@Plant_Alert</a></p>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>\r\n<!-- end: templates/helpPage.html -->\r\n";

	var HelpView =
	/*#__PURE__*/
	function (_Page) {
	  _inherits(HelpView, _Page);

	  function HelpView() {
	    _classCallCheck(this, HelpView);

	    return _possibleConstructorReturn(this, _getPrototypeOf(HelpView).apply(this, arguments));
	  }

	  _createClass(HelpView, [{
	    key: "body",
	    value: function body() {
	      // at this point the entire content of #body should be safe to replace
	      var bodyEl = document.getElementById('body');
	      bodyEl.innerHTML = htmlContent + "<p>Version 1.0.1.1569856515</p>";
	    }
	  }]);

	  return HelpView;
	}(Page);

	var $forEach$1 = arrayIteration.forEach;


	// `Array.prototype.forEach` method implementation
	// https://tc39.github.io/ecma262/#sec-array.prototype.foreach
	var arrayForEach = sloppyArrayMethod('forEach') ? function forEach(callbackfn /* , thisArg */) {
	  return $forEach$1(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
	} : [].forEach;

	// `Array.prototype.forEach` method
	// https://tc39.github.io/ecma262/#sec-array.prototype.foreach
	_export({ target: 'Array', proto: true, forced: [].forEach != arrayForEach }, {
	  forEach: arrayForEach
	});

	for (var COLLECTION_NAME$1 in domIterables) {
	  var Collection$1 = global_1[COLLECTION_NAME$1];
	  var CollectionPrototype$1 = Collection$1 && Collection$1.prototype;
	  // some Chrome versions have non-configurable methods on DOMTokenList
	  if (CollectionPrototype$1 && CollectionPrototype$1.forEach !== arrayForEach) try {
	    hide(CollectionPrototype$1, 'forEach', arrayForEach);
	  } catch (error) {
	    CollectionPrototype$1.forEach = arrayForEach;
	  }
	}

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	function isPushStateAvailable() {
	  return !!(typeof window !== 'undefined' && window.history && window.history.pushState);
	}

	function Navigo(r, useHash, hash) {
	  this.root = null;
	  this._routes = [];
	  this._useHash = useHash;
	  this._hash = typeof hash === 'undefined' ? '#' : hash;
	  this._paused = false;
	  this._destroyed = false;
	  this._lastRouteResolved = null;
	  this._notFoundHandler = null;
	  this._defaultHandler = null;
	  this._usePushState = !useHash && isPushStateAvailable();
	  this._onLocationChange = this._onLocationChange.bind(this);
	  this._genericHooks = null;
	  this._historyAPIUpdateMethod = 'pushState';

	  if (r) {
	    this.root = useHash ? r.replace(/\/$/, '/' + this._hash) : r.replace(/\/$/, '');
	  } else if (useHash) {
	    this.root = this._cLoc().split(this._hash)[0].replace(/\/$/, '/' + this._hash);
	  }

	  this._listen();
	  this.updatePageLinks();
	}

	function clean(s) {
	  if (s instanceof RegExp) return s;
	  return s.replace(/\/+$/, '').replace(/^\/+/, '^/');
	}

	function regExpResultToParams(match, names) {
	  if (names.length === 0) return null;
	  if (!match) return null;
	  return match.slice(1, match.length).reduce(function (params, value, index) {
	    if (params === null) params = {};
	    params[names[index]] = decodeURIComponent(value);
	    return params;
	  }, null);
	}

	function replaceDynamicURLParts(route) {
	  var paramNames = [],
	      regexp;

	  if (route instanceof RegExp) {
	    regexp = route;
	  } else {
	    regexp = new RegExp(route.replace(Navigo.PARAMETER_REGEXP, function (full, dots, name) {
	      paramNames.push(name);
	      return Navigo.REPLACE_VARIABLE_REGEXP;
	    }).replace(Navigo.WILDCARD_REGEXP, Navigo.REPLACE_WILDCARD) + Navigo.FOLLOWED_BY_SLASH_REGEXP, Navigo.MATCH_REGEXP_FLAGS);
	  }
	  return { regexp: regexp, paramNames: paramNames };
	}

	function getUrlDepth(url) {
	  return url.replace(/\/$/, '').split('/').length;
	}

	function compareUrlDepth(urlA, urlB) {
	  return getUrlDepth(urlB) - getUrlDepth(urlA);
	}

	function findMatchedRoutes(url) {
	  var routes = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

	  return routes.map(function (route) {
	    var _replaceDynamicURLPar = replaceDynamicURLParts(clean(route.route)),
	        regexp = _replaceDynamicURLPar.regexp,
	        paramNames = _replaceDynamicURLPar.paramNames;

	    var match = url.replace(/^\/+/, '/').match(regexp);
	    var params = regExpResultToParams(match, paramNames);

	    return match ? { match: match, route: route, params: params } : false;
	  }).filter(function (m) {
	    return m;
	  });
	}

	function match(url, routes) {
	  return findMatchedRoutes(url, routes)[0] || false;
	}

	function root(url, routes) {
	  var matched = routes.map(function (route) {
	    return route.route === '' || route.route === '*' ? url : url.split(new RegExp(route.route + '($|\/)'))[0];
	  });
	  var fallbackURL = clean(url);

	  if (matched.length > 1) {
	    return matched.reduce(function (result, url) {
	      if (result.length > url.length) result = url;
	      return result;
	    }, matched[0]);
	  } else if (matched.length === 1) {
	    return matched[0];
	  }
	  return fallbackURL;
	}

	function isHashChangeAPIAvailable() {
	  return typeof window !== 'undefined' && 'onhashchange' in window;
	}

	function extractGETParameters(url) {
	  return url.split(/\?(.*)?$/).slice(1).join('');
	}

	function getOnlyURL(url, useHash, hash) {
	  var onlyURL = url,
	      split;
	  var cleanGETParam = function cleanGETParam(str) {
	    return str.split(/\?(.*)?$/)[0];
	  };

	  if (typeof hash === 'undefined') {
	    // To preserve BC
	    hash = '#';
	  }

	  if (isPushStateAvailable() && !useHash) {
	    onlyURL = cleanGETParam(url).split(hash)[0];
	  } else {
	    split = url.split(hash);
	    onlyURL = split.length > 1 ? cleanGETParam(split[1]) : cleanGETParam(split[0]);
	  }

	  return onlyURL;
	}

	function manageHooks(handler, hooks, params) {
	  if (hooks && (typeof hooks === 'undefined' ? 'undefined' : _typeof(hooks)) === 'object') {
	    if (hooks.before) {
	      hooks.before(function () {
	        var shouldRoute = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

	        if (!shouldRoute) return;
	        handler();
	        hooks.after && hooks.after(params);
	      }, params);
	      return;
	    } else if (hooks.after) {
	      handler();
	      hooks.after && hooks.after(params);
	      return;
	    }
	  }
	  handler();
	}

	function isHashedRoot(url, useHash, hash) {
	  if (isPushStateAvailable() && !useHash) {
	    return false;
	  }

	  if (!url.match(hash)) {
	    return false;
	  }

	  var split = url.split(hash);

	  return split.length < 2 || split[1] === '';
	}

	Navigo.prototype = {
	  helpers: {
	    match: match,
	    root: root,
	    clean: clean,
	    getOnlyURL: getOnlyURL
	  },
	  navigate: function navigate(path, absolute) {
	    var to;

	    path = path || '';
	    if (this._usePushState) {
	      to = (!absolute ? this._getRoot() + '/' : '') + path.replace(/^\/+/, '/');
	      to = to.replace(/([^:])(\/{2,})/g, '$1/');
	      history[this._historyAPIUpdateMethod]({}, '', to);
	      this.resolve();
	    } else if (typeof window !== 'undefined') {
	      path = path.replace(new RegExp('^' + this._hash), '');
	      window.location.href = window.location.href.replace(/#$/, '').replace(new RegExp(this._hash + '.*$'), '') + this._hash + path;
	    }
	    return this;
	  },
	  on: function on() {
	    var _this = this;

	    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	      args[_key] = arguments[_key];
	    }

	    if (typeof args[0] === 'function') {
	      this._defaultHandler = { handler: args[0], hooks: args[1] };
	    } else if (args.length >= 2) {
	      if (args[0] === '/') {
	        var func = args[1];

	        if (_typeof(args[1]) === 'object') {
	          func = args[1].uses;
	        }

	        this._defaultHandler = { handler: func, hooks: args[2] };
	      } else {
	        this._add(args[0], args[1], args[2]);
	      }
	    } else if (_typeof(args[0]) === 'object') {
	      var orderedRoutes = Object.keys(args[0]).sort(compareUrlDepth);

	      orderedRoutes.forEach(function (route) {
	        _this.on(route, args[0][route]);
	      });
	    }
	    return this;
	  },
	  off: function off(handler) {
	    if (this._defaultHandler !== null && handler === this._defaultHandler.handler) {
	      this._defaultHandler = null;
	    } else if (this._notFoundHandler !== null && handler === this._notFoundHandler.handler) {
	      this._notFoundHandler = null;
	    }
	    this._routes = this._routes.reduce(function (result, r) {
	      if (r.handler !== handler) result.push(r);
	      return result;
	    }, []);
	    return this;
	  },
	  notFound: function notFound(handler, hooks) {
	    this._notFoundHandler = { handler: handler, hooks: hooks };
	    return this;
	  },
	  resolve: function resolve(current) {
	    var _this2 = this;

	    var handler, m;
	    var url = (current || this._cLoc()).replace(this._getRoot(), '');

	    if (this._useHash) {
	      url = url.replace(new RegExp('^\/' + this._hash), '/');
	    }

	    var GETParameters = extractGETParameters(current || this._cLoc());
	    var onlyURL = getOnlyURL(url, this._useHash, this._hash);

	    if (this._paused) return false;

	    if (this._lastRouteResolved && onlyURL === this._lastRouteResolved.url && GETParameters === this._lastRouteResolved.query) {
	      if (this._lastRouteResolved.hooks && this._lastRouteResolved.hooks.already) {
	        this._lastRouteResolved.hooks.already(this._lastRouteResolved.params);
	      }
	      return false;
	    }

	    m = match(onlyURL, this._routes);

	    if (m) {
	      this._callLeave();
	      this._lastRouteResolved = {
	        url: onlyURL,
	        query: GETParameters,
	        hooks: m.route.hooks,
	        params: m.params,
	        name: m.route.name
	      };
	      handler = m.route.handler;
	      manageHooks(function () {
	        manageHooks(function () {
	          m.route.route instanceof RegExp ? handler.apply(undefined, m.match.slice(1, m.match.length)) : handler(m.params, GETParameters);
	        }, m.route.hooks, m.params, _this2._genericHooks);
	      }, this._genericHooks, m.params);
	      return m;
	    } else if (this._defaultHandler && (onlyURL === '' || onlyURL === '/' || onlyURL === this._hash || isHashedRoot(onlyURL, this._useHash, this._hash))) {
	      manageHooks(function () {
	        manageHooks(function () {
	          _this2._callLeave();
	          _this2._lastRouteResolved = { url: onlyURL, query: GETParameters, hooks: _this2._defaultHandler.hooks };
	          _this2._defaultHandler.handler(GETParameters);
	        }, _this2._defaultHandler.hooks);
	      }, this._genericHooks);
	      return true;
	    } else if (this._notFoundHandler) {
	      manageHooks(function () {
	        manageHooks(function () {
	          _this2._callLeave();
	          _this2._lastRouteResolved = { url: onlyURL, query: GETParameters, hooks: _this2._notFoundHandler.hooks };
	          _this2._notFoundHandler.handler(GETParameters);
	        }, _this2._notFoundHandler.hooks);
	      }, this._genericHooks);
	    }
	    return false;
	  },
	  destroy: function destroy() {
	    this._routes = [];
	    this._destroyed = true;
	    this._lastRouteResolved = null;
	    this._genericHooks = null;
	    clearTimeout(this._listeningInterval);
	    if (typeof window !== 'undefined') {
	      window.removeEventListener('popstate', this._onLocationChange);
	      window.removeEventListener('hashchange', this._onLocationChange);
	    }
	  },
	  updatePageLinks: function updatePageLinks() {
	    var self = this;

	    if (typeof document === 'undefined') return;

	    this._findLinks().forEach(function (link) {
	      if (!link.hasListenerAttached) {
	        link.addEventListener('click', function (e) {
	          if ((e.ctrlKey || e.metaKey) && e.target.tagName.toLowerCase() == 'a') {
	            return false;
	          }
	          var location = self.getLinkPath(link);

	          if (!self._destroyed) {
	            e.preventDefault();
	            self.navigate(location.replace(/\/+$/, '').replace(/^\/+/, '/'));
	          }
	        });
	        link.hasListenerAttached = true;
	      }
	    });
	  },
	  generate: function generate(name) {
	    var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

	    var result = this._routes.reduce(function (result, route) {
	      var key;

	      if (route.name === name) {
	        result = route.route;
	        for (key in data) {
	          result = result.toString().replace(':' + key, data[key]);
	        }
	      }
	      return result;
	    }, '');

	    return this._useHash ? this._hash + result : result;
	  },
	  link: function link(path) {
	    return this._getRoot() + path;
	  },
	  pause: function pause() {
	    var status = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

	    this._paused = status;
	    if (status) {
	      this._historyAPIUpdateMethod = 'replaceState';
	    } else {
	      this._historyAPIUpdateMethod = 'pushState';
	    }
	  },
	  resume: function resume() {
	    this.pause(false);
	  },
	  historyAPIUpdateMethod: function historyAPIUpdateMethod(value) {
	    if (typeof value === 'undefined') return this._historyAPIUpdateMethod;
	    this._historyAPIUpdateMethod = value;
	    return value;
	  },
	  disableIfAPINotAvailable: function disableIfAPINotAvailable() {
	    if (!isPushStateAvailable()) {
	      this.destroy();
	    }
	  },
	  lastRouteResolved: function lastRouteResolved() {
	    return this._lastRouteResolved;
	  },
	  getLinkPath: function getLinkPath(link) {
	    return link.getAttribute('href');
	  },
	  hooks: function hooks(_hooks) {
	    this._genericHooks = _hooks;
	  },

	  _add: function _add(route) {
	    var handler = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
	    var hooks = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

	    if (typeof route === 'string') {
	      route = encodeURI(route);
	    }
	    this._routes.push((typeof handler === 'undefined' ? 'undefined' : _typeof(handler)) === 'object' ? {
	      route: route,
	      handler: handler.uses,
	      name: handler.as,
	      hooks: hooks || handler.hooks
	    } : { route: route, handler: handler, hooks: hooks });

	    return this._add;
	  },
	  _getRoot: function _getRoot() {
	    if (this.root !== null) return this.root;
	    this.root = root(this._cLoc().split('?')[0], this._routes);
	    return this.root;
	  },
	  _listen: function _listen() {
	    var _this3 = this;

	    if (this._usePushState) {
	      window.addEventListener('popstate', this._onLocationChange);
	    } else if (isHashChangeAPIAvailable()) {
	      window.addEventListener('hashchange', this._onLocationChange);
	    } else {
	      var cached = this._cLoc(),
	          current = void 0,
	          _check = void 0;

	      _check = function check() {
	        current = _this3._cLoc();
	        if (cached !== current) {
	          cached = current;
	          _this3.resolve();
	        }
	        _this3._listeningInterval = setTimeout(_check, 200);
	      };
	      _check();
	    }
	  },
	  _cLoc: function _cLoc() {
	    if (typeof window !== 'undefined') {
	      if (typeof window.__NAVIGO_WINDOW_LOCATION_MOCK__ !== 'undefined') {
	        return window.__NAVIGO_WINDOW_LOCATION_MOCK__;
	      }
	      return clean(window.location.href);
	    }
	    return '';
	  },
	  _findLinks: function _findLinks() {
	    return [].slice.call(document.querySelectorAll('[data-navigo]'));
	  },
	  _onLocationChange: function _onLocationChange() {
	    this.resolve();
	  },
	  _callLeave: function _callLeave() {
	    var lastRouteResolved = this._lastRouteResolved;

	    if (lastRouteResolved && lastRouteResolved.hooks && lastRouteResolved.hooks.leave) {
	      lastRouteResolved.hooks.leave(lastRouteResolved.params);
	    }
	  }
	};

	Navigo.PARAMETER_REGEXP = /([:*])(\w+)/g;
	Navigo.WILDCARD_REGEXP = /\*/g;
	Navigo.REPLACE_VARIABLE_REGEXP = '([^\/]+)';
	Navigo.REPLACE_WILDCARD = '(?:.*)';
	Navigo.FOLLOWED_BY_SLASH_REGEXP = '(?:\/$|$)';
	Navigo.MATCH_REGEXP_FLAGS = '';

	var PatchedNavigo =
	/*#__PURE__*/
	function (_Navigo) {
	  _inherits(PatchedNavigo, _Navigo);

	  function PatchedNavigo() {
	    _classCallCheck(this, PatchedNavigo);

	    return _possibleConstructorReturn(this, _getPrototypeOf(PatchedNavigo).apply(this, arguments));
	  }

	  _createClass(PatchedNavigo, [{
	    key: "updatePageLinks",
	    value: function updatePageLinks() {
	      var _this = this;

	      if (typeof document === 'undefined') {
	        return;
	      }

	      var l = document.createElement("a");
	      l.href = this.root;
	      var rootPath = l.pathname;

	      this._findLinks().forEach(function (link) {
	        if (!link.hasListenerAttached) {
	          link.addEventListener('click', function (e) {
	            if ((e.ctrlKey || e.metaKey) && e.target.tagName.toLowerCase() == 'a') {
	              return false;
	            }

	            if (!_this._destroyed) {
	              var path = link.pathname; // console.log({path});

	              var leaf = path.replace(rootPath, ''); // console.log({leaf});
	              //var location = self.getLinkPath(link);

	              e.preventDefault(); //self.navigate(location.replace(/\/+$/, '').replace(/^\/+/, '/'));

	              _this.navigate(leaf);
	            }
	          });
	          link.hasListenerAttached = true;
	        }
	      });
	    }
	  }]);

	  return PatchedNavigo;
	}(Navigo);

	var newSurveyModal = "<!-- begin: templates/newSurveyModal.html -->\r\n<div class=\"modal fade\" id=\"newsurveymodal\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"newsurveymodalTitle\" aria-hidden=\"true\">\r\n    <div class=\"modal-dialog modal-dialog-centered\" role=\"document\">\r\n        <div class=\"modal-content\">\r\n            <div class=\"modal-header\">\r\n                <h5 class=\"modal-title\" id=\"newsurveymodalTitle\">Start a new survey?</h5>\r\n                <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\">\r\n                    <span aria-hidden=\"true\">&times;</span>\r\n                </button>\r\n            </div>\r\n            <div class=\"modal-body\">\r\n                Please confirm that you wish to start a new survey. You only need to do this is you wish to send a set of records from a different locality, otherwise please add more records to your current report.\r\n            </div>\r\n            <div class=\"modal-footer\">\r\n                <button type=\"button\" class=\"btn btn-secondary\" data-dismiss=\"modal\">Back</button>\r\n                <button type=\"button\" class=\"btn btn-danger\" data-dismiss=\"modal\" id=\"newsurveymodalconfirmed\">New survey</button>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>\r\n<!-- end: templates/newSurveyModal.html -->\r\n";

	var resetModal = "<!-- begin: templates/resetModal.html -->\r\n<div class=\"modal fade\" id=\"resetmodal\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"resetmodalTitle\" aria-hidden=\"true\">\r\n    <div class=\"modal-dialog modal-dialog-centered\" role=\"document\">\r\n        <div class=\"modal-content\">\r\n            <div class=\"modal-header\">\r\n                <h5 class=\"modal-title\" id=\"resetmodalTitle\">Reset?</h5>\r\n                <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\">\r\n                    <span aria-hidden=\"true\">&times;</span>\r\n                </button>\r\n            </div>\r\n            <div class=\"modal-body\">\r\n                Please confirm that you wish to clear out your survey data.\r\n                <p>Warning: any unsaved changes will be lost.</p>\r\n            </div>\r\n            <div class=\"modal-footer\">\r\n                <button type=\"button\" class=\"btn btn-secondary\" data-dismiss=\"modal\">Back</button>\r\n                <button type=\"button\" class=\"btn btn-danger\" data-dismiss=\"modal\" id=\"resetmodalconfirmed\">Reset</button>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>\r\n<!-- end: templates/resetModal.html -->\r\n";

	var saveAllSuccessModal = "<!-- begin: templates/syncSuccessModal.html -->\r\n<div class=\"modal fade\" id=\"saveallsuccess\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"saveallsuccessTitle\" aria-hidden=\"true\">\r\n    <div class=\"modal-dialog modal-dialog-centered\" role=\"document\">\r\n        <div class=\"modal-content\">\r\n            <div class=\"modal-header\">\r\n                <h5 class=\"modal-title\" id=\"saveallsuccessTitle\">All records sent</h5>\r\n                <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\">\r\n                    <span aria-hidden=\"true\">&times;</span>\r\n                </button>\r\n            </div>\r\n            <div class=\"modal-body\">\r\n                Your data has been synchronised with the server.\r\n                <p>Thank you.</p>\r\n            </div>\r\n            <div class=\"modal-footer\">\r\n                <button type=\"button\" class=\"btn btn-secondary\" data-dismiss=\"modal\">Close</button>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>\r\n<!-- end: templates/syncSuccessModal.html -->\r\n";

	var saveAllFailureModal = "<!-- begin: templates/syncFailureModal.html -->\r\n<div class=\"modal fade\" id=\"saveallfailure\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"saveallfailureTitle\" aria-hidden=\"true\">\r\n    <div class=\"modal-dialog modal-dialog-centered\" role=\"document\">\r\n        <div class=\"modal-content\">\r\n            <div class=\"modal-header\">\r\n                <h5 class=\"modal-title\" id=\"saveallfailureTitle\">One or more records could not be saved</h5>\r\n                <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\">\r\n                    <span aria-hidden=\"true\">&times;</span>\r\n                </button>\r\n            </div>\r\n            <div class=\"modal-body\">\r\n                Please check your connection to the network and try again.\r\n            </div>\r\n            <div class=\"modal-footer\">\r\n                <button type=\"button\" class=\"btn btn-secondary\" data-dismiss=\"modal\">Close</button>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>\r\n<!-- end: templates/syncFailureModal.html -->\r\n";

	var Layout =
	/*#__PURE__*/
	function (_EventHarness) {
	  _inherits(Layout, _EventHarness);

	  function Layout() {
	    var _getPrototypeOf2;

	    var _this;

	    _classCallCheck(this, Layout);

	    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
	      args[_key] = arguments[_key];
	    }

	    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(Layout)).call.apply(_getPrototypeOf2, [this].concat(args)));

	    _defineProperty(_assertThisInitialized(_this), "app", void 0);

	    _defineProperty(_assertThisInitialized(_this), "surveysMenuId", void 0);

	    return _this;
	  }

	  _createClass(Layout, [{
	    key: "setApp",

	    /**
	     *
	     * @param {App} app
	     */
	    value: function setApp(app) {
	      this.app = app;
	      app.addListener(App.EVENT_SURVEYS_CHANGED, this, this.surveysChangedHandler);
	    }
	  }, {
	    key: "initialise",
	    value: function initialise() {
	      var _this2 = this;

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
	          _this2.app.fireEvent(App.EVENT_ADD_SURVEY_USER_REQUEST);
	        });
	        document.getElementById("".concat(Layout.RESET_MODAL_ID, "confirmed")).addEventListener('click', function (event) {
	          _this2.app.fireEvent(App.EVENT_RESET_SURVEYS);
	        });
	      }, 100);
	    }
	  }, {
	    key: "surveysChangedHandler",
	    value: function surveysChangedHandler() {
	      this.refreshSurveysMenu();
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
	      var _iteratorNormalCompletion = true;
	      var _didIteratorError = false;
	      var _iteratorError = undefined;

	      try {
	        for (var _iterator = this.app.surveys[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	          var surveyTuple = _step.value;
	          var survey = surveyTuple[1];
	          var label = survey.generateSurveyName() + (surveyTuple[0] === currentSurveyId ? ' <span style="color: green">●</span>' : '');
	          items[items.length] = "<a class=\"dropdown-item\" href=\"/app/survey/add/".concat(surveyTuple[0], "\" data-navigo=\"survey/add/").concat(surveyTuple[0], "\">").concat(label, "</a>");
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

	      surveyMenuContainer.innerHTML = "<a class=\"dropdown-item\" href=\"/app/survey/save\" data-navigo=\"survey/save\">save all</a>\n    <div class=\"dropdown-divider\"></div>\n    ".concat(items.join(''), "\n    <div class=\"dropdown-divider\"></div>\n    <a class=\"dropdown-item\" href=\"/app/survey/new\" data-navigo=\"survey/new\">new survey</a>\n    <a class=\"dropdown-item\" href=\"/app/survey/reset\" data-navigo=\"survey/reset\">reset</a>");
	      this.app.router.updatePageLinks();
	    }
	  }]);

	  return Layout;
	}(EventHarness);

	_defineProperty(Layout, "NEW_SURVEY_MODAL_ID", 'newsurveymodal');

	_defineProperty(Layout, "RESET_MODAL_ID", 'resetmodal');

	_defineProperty(Layout, "SAVE_ALL_SUCCESS_MODAL_ID", 'saveallsuccess');

	_defineProperty(Layout, "SAVE_ALL_FAILURE_MODAL_ID", 'saveallfailure');

	var SurveyPickerController =
	/*#__PURE__*/
	function (_AppController) {
	  _inherits(SurveyPickerController, _AppController);

	  _createClass(SurveyPickerController, [{
	    key: "survey",

	    /**
	     * @type {NyphApp}
	     */

	    /**
	     *
	     * @type {SurveyPickerView}
	     */

	    /**
	     *
	     * @returns {Survey}
	     */
	    get: function get() {
	      return this.app.currentSurvey;
	    }
	    /**
	     *
	     * @param {SurveyPickerView} view
	     */

	  }]);

	  function SurveyPickerController(view) {
	    var _this;

	    _classCallCheck(this, SurveyPickerController);

	    _this = _possibleConstructorReturn(this, _getPrototypeOf(SurveyPickerController).call(this));

	    _defineProperty(_assertThisInitialized(_this), "route", '/survey/:action/:id');

	    _defineProperty(_assertThisInitialized(_this), "title", 'NYPH survey picker');

	    _defineProperty(_assertThisInitialized(_this), "app", void 0);

	    _defineProperty(_assertThisInitialized(_this), "view", void 0);

	    _this.view = view;
	    view.controller = _assertThisInitialized(_this);
	    _this.handle = AppController.nextHandle; // view.addListener(MainController.EVENT_SELECT_OCCURRENCE, this, this.occurrenceSelectionHandler);
	    // view.addListener(MainController.EVENT_SELECT_SURVEY_SECTION, this, this.surveyPartSelectionHandler);
	    // view.addListener(MainController.EVENT_NEW_RECORD, this, this.newRecordHandler);
	    // view.addListener(MainController.EVENT_DELETE_OCCURRENCE, this, this.deleteOccurrenceHandler);
	    //
	    // view.addListener(MainController.EVENT_BACK, this, this.backHandler);
	    // view.addListener(MainController.EVENT_NEXT_TO_RECORDS, this, this.nextTransitionToRecordsHandler);

	    return _this;
	  } // /**
	  //  * handler for event fired on and by view when 'next section' button has been click, leading to the records section
	  //  * this will expand the list of records, or if none exist, add a first one and open it
	  //  */
	  // nextTransitionToRecordsHandler() {
	  //     console.log('in nextTransitionToRecordsHandler()');
	  //
	  //     if (this.app.haveExtantOccurrences()) {
	  //         this.app.router.navigate('/list/record/');
	  //     } else {
	  //         this.newRecordHandler();
	  //     }
	  // }
	  // /**
	  //  *
	  //  * @param {MainController} context
	  //  * @param {string} eventName
	  //  * @param {string} occurrenceId
	  //  */
	  // deleteOccurrenceHandler(context, eventName, occurrenceId) {
	  //     console.log({deleting : occurrenceId});
	  //
	  //     const occurrence = this.app.occurrences.get(occurrenceId);
	  //     if (!occurrence) {
	  //         throw new InternalAppError(`Occurrence id '${occurrenceId}' not found when trying to delete.`);
	  //     }
	  //
	  //     occurrence.delete();
	  //     if (this.currentOccurrenceId === occurrenceId) {
	  //         //this.currentOccurrenceId = '';
	  //         this.app.router.navigate(`/list/record/`);
	  //     }
	  // }
	  // /**
	  //  *
	  //  * @param {MainController} context
	  //  * @param {string} eventName
	  //  * @param {{sectionKey : string}} params
	  //  */
	  // surveyPartSelectionHandler (context, eventName, params) {
	  //     console.log('In surveyPartSelectionHandler');
	  //     console.log({context, eventName, params});
	  //
	  //     if (params.sectionKey === 'record') {
	  //         this.app.router.navigate(`/list/record/`);
	  //     } else if (params.sectionKey) {
	  //         this.app.router.navigate(`/list/survey/${params.sectionKey}`);
	  //     } else {
	  //         this.app.router.navigate(`/list/`);
	  //     }
	  // }
	  // /**
	  //  * may be invoked directly or in response to the Add New Record event
	  //  * therefore assume that the method receives no event parameters
	  //  */
	  // newRecordHandler() {
	  //     const occurrence = this.app.addNewOccurrence();
	  //
	  //     this.app.router.navigate(`/list/record/${occurrence.id}`);
	  // }

	  /**
	   * registers the default route from this.route
	   * or alternatively is overridden in a child class
	   *
	   * @param {Navigo} router
	   */


	  _createClass(SurveyPickerController, [{
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
	      this.app.addListener(App.EVENT_ADD_SURVEY_USER_REQUEST, this, this.addNewSurveyHandler);
	      this.app.addListener(App.EVENT_RESET_SURVEYS, this, this.resetSurveysHandler);
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
	        $("#".concat(Layout.SAVE_ALL_SUCCESS_MODAL_ID)).modal();
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
	    value: function newSurveyHandler(context, subcontext, rhs, queryParameters) {} // should not get here, as beforeNewHandler ought to have been invoked first

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
	      }); // this.app.saveRoute();
	      //
	      // switch(subcontext) {
	      //     case 'add':
	      //
	      //         break;
	      //
	      //     case '':
	      //         break;
	      //
	      //     default:
	      //         throw new NotFoundError(`Unrecognised context '${subcontext}'`);
	      // }
	      //
	      // try {
	      //     this.viewSubcontext = subcontext;
	      //
	      //
	      //
	      //     if (this.app.currentControllerHandle !== this.handle) {
	      //         // need a complete refresh of the page
	      //
	      //         this.needsFullRefresh = true;
	      //         this.app.currentControllerHandle = this.handle;
	      //     }
	      //
	      //     this.view.display();
	      //     this.needsFullRefresh = false;
	      // } catch (error) {
	      //     this.error = error;
	      //     console.log({error});
	      //
	      //     // attempt to carry on regardless to some extent (error should be reported in the view)
	      //     // but wrap in a further try just in case
	      //
	      //     try {
	      //         this.needsFullRefresh = true;
	      //         this.view.display();
	      //     } catch (rethrownError) {
	      //         console.log({rethrownError});
	      //         document.body.innerHTML = `<h2>Internal error</h2><p>Please report this problem:</p><p>${rethrownError.message}</p>`;
	      //     }
	      // }
	    } // backHandler() {
	    //     console.log({'leftPanelBaseRoute' : this.leftPanelBaseRoute});
	    //     console.log({'local navigation cache' : this.app.routeHistory});
	    //
	    //     if (this.app.routeHistory.length >= 2 && this.app.routeHistory[this.app.routeHistory.length - 2].url === this.leftPanelBaseRoute) {
	    //         this.app.routeHistory.length -= 1;
	    //         console.log('using standard back navigation');
	    //         window.history.back();
	    //         //console.log('fell through back!');
	    //     } else {
	    //         console.log(`navigating back using base address '${this.leftPanelBaseRoute}'`);
	    //         this.app.router.navigate(this.leftPanelBaseRoute);
	    //     }
	    // }

	  }]);

	  return SurveyPickerController;
	}(AppController);

	_defineProperty(SurveyPickerController, "EVENT_BACK", 'back');

	var SurveyPickerView =
	/*#__PURE__*/
	function (_Page) {
	  _inherits(SurveyPickerView, _Page);

	  function SurveyPickerView() {
	    _classCallCheck(this, SurveyPickerView);

	    return _possibleConstructorReturn(this, _getPrototypeOf(SurveyPickerView).apply(this, arguments));
	  }

	  _createClass(SurveyPickerView, [{
	    key: "body",
	    value: function body() {
	      // at this point the entire content of #body should be safe to replace
	      var bodyEl = document.getElementById('body');
	      bodyEl.innerHTML = '<p>Placeholder survey picker content.</p>';
	    }
	  }]);

	  return SurveyPickerView;
	}(Page);

	var NyphLayout =
	/*#__PURE__*/
	function (_Layout) {
	  _inherits(NyphLayout, _Layout);

	  function NyphLayout() {
	    var _getPrototypeOf2;

	    var _this;

	    _classCallCheck(this, NyphLayout);

	    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
	      args[_key] = arguments[_key];
	    }

	    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(NyphLayout)).call.apply(_getPrototypeOf2, [this].concat(args)));

	    _defineProperty(_assertThisInitialized(_this), "surveysMenuId", 'surveysmenu');

	    return _this;
	  }

	  return NyphLayout;
	}(Layout);

	var TaxaLoadedHook =
	/*#__PURE__*/
	function () {
	  function TaxaLoadedHook() {
	    _classCallCheck(this, TaxaLoadedHook);
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

	_defineProperty(TaxaLoadedHook, "callbackStack", []);

	localforage.config({
	  name: 'Nyph App'
	}); // work around Edge bug

	if (!Promise.prototype.finally) {
	  Promise.prototype.finally = function (callback) {
	    return this.then(callback).catch(callback);
	  };
	} // even though Rollup is bundling all your files together, errors and
	// logs will still point to your original source modules


	console.log('if you have sourcemaps enabled in your devtools, click on main.js:5 -->'); // console.log(GridRef.from_string('SD59'));
	// Register the ServiceWorker limiting its action to those URL starting
	// by `controlled`. The scope is not a path but a prefix. First, it is
	// converted into an absolute URL, then used to determine if a page is
	// controlled by testing it is a prefix of the request URL.

	navigator.serviceWorker.register('/app/serviceworker.js', {// scope: './controlled'
	});
	navigator.serviceWorker.addEventListener('controllerchange', function () {
	  window.location.reload(true);
	});
	var app = new NyphApp(); //app.router = new Navigo('http://localhost:3000/');

	app.router = new PatchedNavigo('https://nyph.bsbi.org/app/');
	app.containerId = 'appcontainer';
	app.setLayout(new NyphLayout());
	app.registerController(new StaticContentController(new HelpView(), '/help'));
	app.registerController(new MainController(new MainView()));
	app.registerController(new SurveyPickerController(new SurveyPickerView())); // test detection of cameras
	// see https://stackoverflow.com/questions/23288918/check-if-user-has-webcam-or-not-using-javascript-only
	// navigator.mediaDevices.enumerateDevices()
	//     .then(function(devices) {
	//         devices.forEach(function(device) {
	//             console.log(device.kind + ": " + device.label +
	//                 " id = " + device.deviceId);
	//         });
	//     });

	app.restoreOccurrences().then(function (result) {
	  console.log({
	    'result from restoreOccurrences': result
	  });
	}, function (result) {
	  console.log({
	    'failed result from restoreOccurrences': result
	  });
	}).finally(function () {
	  // the taxon list may be slow to load
	  TaxaLoadedHook.onceTaxaLoaded().then(function () {
	    app.initialise();
	    app.display();
	  });
	});

}(BsbiDb, $));
//# sourceMappingURL=nyph.js.map
