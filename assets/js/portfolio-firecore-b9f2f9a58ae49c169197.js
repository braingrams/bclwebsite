webpackJsonp([44],{

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var bind = __webpack_require__(22);

// utils is a library of generic helper functions non-specific to axios

var toString = Object.prototype.toString;

// eslint-disable-next-line func-names
var kindOf = function (cache) {
  // eslint-disable-next-line func-names
  return function (thing) {
    var str = toString.call(thing);
    return cache[str] || (cache[str] = str.slice(8, -1).toLowerCase());
  };
}(Object.create(null));

function kindOfTest(type) {
  type = type.toLowerCase();
  return function isKindOf(thing) {
    return kindOf(thing) === type;
  };
}

/**
 * Determine if a value is an Array
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an Array, otherwise false
 */
function isArray(val) {
  return Array.isArray(val);
}

/**
 * Determine if a value is undefined
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if the value is undefined, otherwise false
 */
function isUndefined(val) {
  return typeof val === 'undefined';
}

/**
 * Determine if a value is a Buffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Buffer, otherwise false
 */
function isBuffer(val) {
  return val !== null && !isUndefined(val) && val.constructor !== null && !isUndefined(val.constructor) && typeof val.constructor.isBuffer === 'function' && val.constructor.isBuffer(val);
}

/**
 * Determine if a value is an ArrayBuffer
 *
 * @function
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an ArrayBuffer, otherwise false
 */
var isArrayBuffer = kindOfTest('ArrayBuffer');

/**
 * Determine if a value is a view on an ArrayBuffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a view on an ArrayBuffer, otherwise false
 */
function isArrayBufferView(val) {
  var result;
  if (typeof ArrayBuffer !== 'undefined' && ArrayBuffer.isView) {
    result = ArrayBuffer.isView(val);
  } else {
    result = val && val.buffer && isArrayBuffer(val.buffer);
  }
  return result;
}

/**
 * Determine if a value is a String
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a String, otherwise false
 */
function isString(val) {
  return typeof val === 'string';
}

/**
 * Determine if a value is a Number
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Number, otherwise false
 */
function isNumber(val) {
  return typeof val === 'number';
}

/**
 * Determine if a value is an Object
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an Object, otherwise false
 */
function isObject(val) {
  return val !== null && (typeof val === 'undefined' ? 'undefined' : _typeof(val)) === 'object';
}

/**
 * Determine if a value is a plain Object
 *
 * @param {Object} val The value to test
 * @return {boolean} True if value is a plain Object, otherwise false
 */
function isPlainObject(val) {
  if (kindOf(val) !== 'object') {
    return false;
  }

  var prototype = Object.getPrototypeOf(val);
  return prototype === null || prototype === Object.prototype;
}

/**
 * Determine if a value is a Date
 *
 * @function
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Date, otherwise false
 */
var isDate = kindOfTest('Date');

/**
 * Determine if a value is a File
 *
 * @function
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a File, otherwise false
 */
var isFile = kindOfTest('File');

/**
 * Determine if a value is a Blob
 *
 * @function
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Blob, otherwise false
 */
var isBlob = kindOfTest('Blob');

/**
 * Determine if a value is a FileList
 *
 * @function
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a File, otherwise false
 */
var isFileList = kindOfTest('FileList');

/**
 * Determine if a value is a Function
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Function, otherwise false
 */
function isFunction(val) {
  return toString.call(val) === '[object Function]';
}

/**
 * Determine if a value is a Stream
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Stream, otherwise false
 */
function isStream(val) {
  return isObject(val) && isFunction(val.pipe);
}

/**
 * Determine if a value is a FormData
 *
 * @param {Object} thing The value to test
 * @returns {boolean} True if value is an FormData, otherwise false
 */
function isFormData(thing) {
  var pattern = '[object FormData]';
  return thing && (typeof FormData === 'function' && thing instanceof FormData || toString.call(thing) === pattern || isFunction(thing.toString) && thing.toString() === pattern);
}

/**
 * Determine if a value is a URLSearchParams object
 * @function
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a URLSearchParams object, otherwise false
 */
var isURLSearchParams = kindOfTest('URLSearchParams');

/**
 * Trim excess whitespace off the beginning and end of a string
 *
 * @param {String} str The String to trim
 * @returns {String} The String freed of excess whitespace
 */
function trim(str) {
  return str.trim ? str.trim() : str.replace(/^\s+|\s+$/g, '');
}

/**
 * Determine if we're running in a standard browser environment
 *
 * This allows axios to run in a web worker, and react-native.
 * Both environments support XMLHttpRequest, but not fully standard globals.
 *
 * web workers:
 *  typeof window -> undefined
 *  typeof document -> undefined
 *
 * react-native:
 *  navigator.product -> 'ReactNative'
 * nativescript
 *  navigator.product -> 'NativeScript' or 'NS'
 */
function isStandardBrowserEnv() {
  if (typeof navigator !== 'undefined' && (navigator.product === 'ReactNative' || navigator.product === 'NativeScript' || navigator.product === 'NS')) {
    return false;
  }
  return typeof window !== 'undefined' && typeof document !== 'undefined';
}

/**
 * Iterate over an Array or an Object invoking a function for each item.
 *
 * If `obj` is an Array callback will be called passing
 * the value, index, and complete array for each item.
 *
 * If 'obj' is an Object callback will be called passing
 * the value, key, and complete object for each property.
 *
 * @param {Object|Array} obj The object to iterate
 * @param {Function} fn The callback to invoke for each item
 */
function forEach(obj, fn) {
  // Don't bother if no value provided
  if (obj === null || typeof obj === 'undefined') {
    return;
  }

  // Force an array if not already something iterable
  if ((typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) !== 'object') {
    /*eslint no-param-reassign:0*/
    obj = [obj];
  }

  if (isArray(obj)) {
    // Iterate over array values
    for (var i = 0, l = obj.length; i < l; i++) {
      fn.call(null, obj[i], i, obj);
    }
  } else {
    // Iterate over object keys
    for (var key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        fn.call(null, obj[key], key, obj);
      }
    }
  }
}

/**
 * Accepts varargs expecting each argument to be an object, then
 * immutably merges the properties of each object and returns result.
 *
 * When multiple objects contain the same key the later object in
 * the arguments list will take precedence.
 *
 * Example:
 *
 * ```js
 * var result = merge({foo: 123}, {foo: 456});
 * console.log(result.foo); // outputs 456
 * ```
 *
 * @param {Object} obj1 Object to merge
 * @returns {Object} Result of all merge properties
 */
function merge() /* obj1, obj2, obj3, ... */{
  var result = {};
  function assignValue(val, key) {
    if (isPlainObject(result[key]) && isPlainObject(val)) {
      result[key] = merge(result[key], val);
    } else if (isPlainObject(val)) {
      result[key] = merge({}, val);
    } else if (isArray(val)) {
      result[key] = val.slice();
    } else {
      result[key] = val;
    }
  }

  for (var i = 0, l = arguments.length; i < l; i++) {
    forEach(arguments[i], assignValue);
  }
  return result;
}

/**
 * Extends object a by mutably adding to it the properties of object b.
 *
 * @param {Object} a The object to be extended
 * @param {Object} b The object to copy properties from
 * @param {Object} thisArg The object to bind function to
 * @return {Object} The resulting value of object a
 */
function extend(a, b, thisArg) {
  forEach(b, function assignValue(val, key) {
    if (thisArg && typeof val === 'function') {
      a[key] = bind(val, thisArg);
    } else {
      a[key] = val;
    }
  });
  return a;
}

/**
 * Remove byte order marker. This catches EF BB BF (the UTF-8 BOM)
 *
 * @param {string} content with BOM
 * @return {string} content value without BOM
 */
function stripBOM(content) {
  if (content.charCodeAt(0) === 0xFEFF) {
    content = content.slice(1);
  }
  return content;
}

/**
 * Inherit the prototype methods from one constructor into another
 * @param {function} constructor
 * @param {function} superConstructor
 * @param {object} [props]
 * @param {object} [descriptors]
 */

function inherits(constructor, superConstructor, props, descriptors) {
  constructor.prototype = Object.create(superConstructor.prototype, descriptors);
  constructor.prototype.constructor = constructor;
  props && _extends(constructor.prototype, props);
}

/**
 * Resolve object with deep prototype chain to a flat object
 * @param {Object} sourceObj source object
 * @param {Object} [destObj]
 * @param {Function} [filter]
 * @returns {Object}
 */

function toFlatObject(sourceObj, destObj, filter) {
  var props;
  var i;
  var prop;
  var merged = {};

  destObj = destObj || {};

  do {
    props = Object.getOwnPropertyNames(sourceObj);
    i = props.length;
    while (i-- > 0) {
      prop = props[i];
      if (!merged[prop]) {
        destObj[prop] = sourceObj[prop];
        merged[prop] = true;
      }
    }
    sourceObj = Object.getPrototypeOf(sourceObj);
  } while (sourceObj && (!filter || filter(sourceObj, destObj)) && sourceObj !== Object.prototype);

  return destObj;
}

/*
 * determines whether a string ends with the characters of a specified string
 * @param {String} str
 * @param {String} searchString
 * @param {Number} [position= 0]
 * @returns {boolean}
 */
function endsWith(str, searchString, position) {
  str = String(str);
  if (position === undefined || position > str.length) {
    position = str.length;
  }
  position -= searchString.length;
  var lastIndex = str.indexOf(searchString, position);
  return lastIndex !== -1 && lastIndex === position;
}

/**
 * Returns new array from array like object
 * @param {*} [thing]
 * @returns {Array}
 */
function toArray(thing) {
  if (!thing) return null;
  var i = thing.length;
  if (isUndefined(i)) return null;
  var arr = new Array(i);
  while (i-- > 0) {
    arr[i] = thing[i];
  }
  return arr;
}

// eslint-disable-next-line func-names
var isTypedArray = function (TypedArray) {
  // eslint-disable-next-line func-names
  return function (thing) {
    return TypedArray && thing instanceof TypedArray;
  };
}(typeof Uint8Array !== 'undefined' && Object.getPrototypeOf(Uint8Array));

module.exports = {
  isArray: isArray,
  isArrayBuffer: isArrayBuffer,
  isBuffer: isBuffer,
  isFormData: isFormData,
  isArrayBufferView: isArrayBufferView,
  isString: isString,
  isNumber: isNumber,
  isObject: isObject,
  isPlainObject: isPlainObject,
  isUndefined: isUndefined,
  isDate: isDate,
  isFile: isFile,
  isBlob: isBlob,
  isFunction: isFunction,
  isStream: isStream,
  isURLSearchParams: isURLSearchParams,
  isStandardBrowserEnv: isStandardBrowserEnv,
  forEach: forEach,
  merge: merge,
  extend: extend,
  trim: trim,
  stripBOM: stripBOM,
  inherits: inherits,
  toFlatObject: toFlatObject,
  kindOf: kindOf,
  kindOfTest: kindOfTest,
  endsWith: endsWith,
  toArray: toArray,
  isTypedArray: isTypedArray,
  isFileList: isFileList
};

/***/ }),

/***/ 10:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var bodyScrollIsOff = false;
var lastScrollPos = 0;

module.exports = {
    scrollOff: function scrollOff() {
        if (!bodyScrollIsOff) lastScrollPos = document.body.scrollTop;
        bodyScrollIsOff = true;

        document.documentElement.classList.add("noscroll");
        document.documentElement.style.top = '-' + lastScrollPos + 'px';
    },
    scrollOn: function scrollOn() {
        bodyScrollIsOff = false;

        document.documentElement.classList.remove("noscroll");
        document.documentElement.style.top = '';
        document.body.scrollTop = lastScrollPos;
    },
    scrollToggle: function scrollToggle() {
        if (bodyScrollIsOff) {
            this.scrollOn();
        } else {
            this.scrollOff();
        }
    },
    isScrollOff: function isScrollOff() {
        return bodyScrollIsOff;
    }
};

/***/ }),

/***/ 100:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.f = {}.propertyIsEnumerable;

/***/ }),

/***/ 101:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// most Object methods by ES6 should accept primitives
var $export = __webpack_require__(34);
var core = __webpack_require__(9);
var fails = __webpack_require__(18);
module.exports = function (KEY, exec) {
  var fn = (core.Object || {})[KEY] || Object[KEY];
  var exp = {};
  exp[KEY] = exec(fn);
  $export($export.S + $export.F * fails(function () {
    fn(1);
  }), 'Object', exp);
};

/***/ }),

/***/ 102:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/*
 * classList.js: Cross-browser full element.classList implementation.
 * 1.1.20170427
 *
 * By Eli Grey, http://eligrey.com
 * License: Dedicated to the public domain.
 *   See https://github.com/eligrey/classList.js/blob/master/LICENSE.md
 */

/*global self, document, DOMException */

/*! @source http://purl.eligrey.com/github/classList.js/blob/master/classList.js */

if ("document" in window.self) {

	// Full polyfill for browsers with no classList support
	// Including IE < Edge missing SVGElement.classList
	if (!("classList" in document.createElement("_")) || document.createElementNS && !("classList" in document.createElementNS("http://www.w3.org/2000/svg", "g"))) {

		(function (view) {

			"use strict";

			if (!('Element' in view)) return;

			var classListProp = "classList",
			    protoProp = "prototype",
			    elemCtrProto = view.Element[protoProp],
			    objCtr = Object,
			    strTrim = String[protoProp].trim || function () {
				return this.replace(/^\s+|\s+$/g, "");
			},
			    arrIndexOf = Array[protoProp].indexOf || function (item) {
				var i = 0,
				    len = this.length;
				for (; i < len; i++) {
					if (i in this && this[i] === item) {
						return i;
					}
				}
				return -1;
			}
			// Vendors: please allow content code to instantiate DOMExceptions
			,
			    DOMEx = function DOMEx(type, message) {
				this.name = type;
				this.code = DOMException[type];
				this.message = message;
			},
			    checkTokenAndGetIndex = function checkTokenAndGetIndex(classList, token) {
				if (token === "") {
					throw new DOMEx("SYNTAX_ERR", "An invalid or illegal string was specified");
				}
				if (/\s/.test(token)) {
					throw new DOMEx("INVALID_CHARACTER_ERR", "String contains an invalid character");
				}
				return arrIndexOf.call(classList, token);
			},
			    ClassList = function ClassList(elem) {
				var trimmedClasses = strTrim.call(elem.getAttribute("class") || ""),
				    classes = trimmedClasses ? trimmedClasses.split(/\s+/) : [],
				    i = 0,
				    len = classes.length;
				for (; i < len; i++) {
					this.push(classes[i]);
				}
				this._updateClassName = function () {
					elem.setAttribute("class", this.toString());
				};
			},
			    classListProto = ClassList[protoProp] = [],
			    classListGetter = function classListGetter() {
				return new ClassList(this);
			};
			// Most DOMException implementations don't allow calling DOMException's toString()
			// on non-DOMExceptions. Error's toString() is sufficient here.
			DOMEx[protoProp] = Error[protoProp];
			classListProto.item = function (i) {
				return this[i] || null;
			};
			classListProto.contains = function (token) {
				token += "";
				return checkTokenAndGetIndex(this, token) !== -1;
			};
			classListProto.add = function () {
				var tokens = arguments,
				    i = 0,
				    l = tokens.length,
				    token,
				    updated = false;
				do {
					token = tokens[i] + "";
					if (checkTokenAndGetIndex(this, token) === -1) {
						this.push(token);
						updated = true;
					}
				} while (++i < l);

				if (updated) {
					this._updateClassName();
				}
			};
			classListProto.remove = function () {
				var tokens = arguments,
				    i = 0,
				    l = tokens.length,
				    token,
				    updated = false,
				    index;
				do {
					token = tokens[i] + "";
					index = checkTokenAndGetIndex(this, token);
					while (index !== -1) {
						this.splice(index, 1);
						updated = true;
						index = checkTokenAndGetIndex(this, token);
					}
				} while (++i < l);

				if (updated) {
					this._updateClassName();
				}
			};
			classListProto.toggle = function (token, force) {
				token += "";

				var result = this.contains(token),
				    method = result ? force !== true && "remove" : force !== false && "add";

				if (method) {
					this[method](token);
				}

				if (force === true || force === false) {
					return force;
				} else {
					return !result;
				}
			};
			classListProto.toString = function () {
				return this.join(" ");
			};

			if (objCtr.defineProperty) {
				var classListPropDesc = {
					get: classListGetter,
					enumerable: true,
					configurable: true
				};
				try {
					objCtr.defineProperty(elemCtrProto, classListProp, classListPropDesc);
				} catch (ex) {
					// IE 8 doesn't support enumerable:true
					// adding undefined to fight this issue https://github.com/eligrey/classList.js/issues/36
					// modernie IE8-MSW7 machine has IE8 8.0.6001.18702 and is affected
					if (ex.number === undefined || ex.number === -0x7FF5EC54) {
						classListPropDesc.enumerable = false;
						objCtr.defineProperty(elemCtrProto, classListProp, classListPropDesc);
					}
				}
			} else if (objCtr[protoProp].__defineGetter__) {
				elemCtrProto.__defineGetter__(classListProp, classListGetter);
			}
		})(window.self);
	}

	// There is full or partial native classList support, so just check if we need
	// to normalize the add/remove and toggle APIs.

	(function () {
		"use strict";

		var testElement = document.createElement("_");

		testElement.classList.add("c1", "c2");

		// Polyfill for IE 10/11 and Firefox <26, where classList.add and
		// classList.remove exist but support only one argument at a time.
		if (!testElement.classList.contains("c2")) {
			var createMethod = function createMethod(method) {
				var original = DOMTokenList.prototype[method];

				DOMTokenList.prototype[method] = function (token) {
					var i,
					    len = arguments.length;

					for (i = 0; i < len; i++) {
						token = arguments[i];
						original.call(this, token);
					}
				};
			};
			createMethod('add');
			createMethod('remove');
		}

		testElement.classList.toggle("c3", false);

		// Polyfill for IE 10 and Firefox <24, where classList.toggle does not
		// support the second argument.
		if (testElement.classList.contains("c3")) {
			var _toggle = DOMTokenList.prototype.toggle;

			DOMTokenList.prototype.toggle = function (token, force) {
				if (1 in arguments && !this.contains(token) === !force) {
					return force;
				} else {
					return _toggle.call(this, token);
				}
			};
		}

		testElement = null;
	})();
}

/***/ }),

/***/ 103:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Module dependencies.
 * @private
 */

var Handlers = __webpack_require__(7);
var scrollBlocker = __webpack_require__(10);

/**
 * @private
 */
var DOM = {};
var handlers = new Handlers();

/**
 * @public
 * @type {Object}
 */
module.exports = {
	init: init,
	on: handlers.add.bind(handlers),
	off: handlers.remove.bind(handlers)
};

/**
 * @private
 */
function init() {
	var close = document.querySelector(".js-popup_close");

	if (close) {
		close.onclick = function () {
			handlers.call("close");
			scrollBlocker.scrollOn();
			_gaq.push(['_trackEvent', 'popupClose', 'click']);
		};
	}
}

/***/ }),

/***/ 104:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(setImmediate) {

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

(function (root) {

  // Store setTimeout reference so promise-polyfill will be unaffected by
  // other code modifying setTimeout (like sinon.useFakeTimers())
  var setTimeoutFunc = setTimeout;

  function noop() {}

  // Polyfill for Function.prototype.bind
  function bind(fn, thisArg) {
    return function () {
      fn.apply(thisArg, arguments);
    };
  }

  function Promise(fn) {
    if (!(this instanceof Promise)) throw new TypeError('Promises must be constructed via new');
    if (typeof fn !== 'function') throw new TypeError('not a function');
    this._state = 0;
    this._handled = false;
    this._value = undefined;
    this._deferreds = [];

    doResolve(fn, this);
  }

  function handle(self, deferred) {
    while (self._state === 3) {
      self = self._value;
    }
    if (self._state === 0) {
      self._deferreds.push(deferred);
      return;
    }
    self._handled = true;
    Promise._immediateFn(function () {
      var cb = self._state === 1 ? deferred.onFulfilled : deferred.onRejected;
      if (cb === null) {
        (self._state === 1 ? resolve : reject)(deferred.promise, self._value);
        return;
      }
      var ret;
      try {
        ret = cb(self._value);
      } catch (e) {
        reject(deferred.promise, e);
        return;
      }
      resolve(deferred.promise, ret);
    });
  }

  function resolve(self, newValue) {
    try {
      // Promise Resolution Procedure: https://github.com/promises-aplus/promises-spec#the-promise-resolution-procedure
      if (newValue === self) throw new TypeError('A promise cannot be resolved with itself.');
      if (newValue && ((typeof newValue === 'undefined' ? 'undefined' : _typeof(newValue)) === 'object' || typeof newValue === 'function')) {
        var then = newValue.then;
        if (newValue instanceof Promise) {
          self._state = 3;
          self._value = newValue;
          finale(self);
          return;
        } else if (typeof then === 'function') {
          doResolve(bind(then, newValue), self);
          return;
        }
      }
      self._state = 1;
      self._value = newValue;
      finale(self);
    } catch (e) {
      reject(self, e);
    }
  }

  function reject(self, newValue) {
    self._state = 2;
    self._value = newValue;
    finale(self);
  }

  function finale(self) {
    if (self._state === 2 && self._deferreds.length === 0) {
      Promise._immediateFn(function () {
        if (!self._handled) {
          Promise._unhandledRejectionFn(self._value);
        }
      });
    }

    for (var i = 0, len = self._deferreds.length; i < len; i++) {
      handle(self, self._deferreds[i]);
    }
    self._deferreds = null;
  }

  function Handler(onFulfilled, onRejected, promise) {
    this.onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : null;
    this.onRejected = typeof onRejected === 'function' ? onRejected : null;
    this.promise = promise;
  }

  /**
   * Take a potentially misbehaving resolver function and make sure
   * onFulfilled and onRejected are only called once.
   *
   * Makes no guarantees about asynchrony.
   */
  function doResolve(fn, self) {
    var done = false;
    try {
      fn(function (value) {
        if (done) return;
        done = true;
        resolve(self, value);
      }, function (reason) {
        if (done) return;
        done = true;
        reject(self, reason);
      });
    } catch (ex) {
      if (done) return;
      done = true;
      reject(self, ex);
    }
  }

  Promise.prototype['catch'] = function (onRejected) {
    return this.then(null, onRejected);
  };

  Promise.prototype.then = function (onFulfilled, onRejected) {
    var prom = new this.constructor(noop);

    handle(this, new Handler(onFulfilled, onRejected, prom));
    return prom;
  };

  Promise.all = function (arr) {
    return new Promise(function (resolve, reject) {
      if (!arr || typeof arr.length === 'undefined') throw new TypeError('Promise.all accepts an array');
      var args = Array.prototype.slice.call(arr);
      if (args.length === 0) return resolve([]);
      var remaining = args.length;

      function res(i, val) {
        try {
          if (val && ((typeof val === 'undefined' ? 'undefined' : _typeof(val)) === 'object' || typeof val === 'function')) {
            var then = val.then;
            if (typeof then === 'function') {
              then.call(val, function (val) {
                res(i, val);
              }, reject);
              return;
            }
          }
          args[i] = val;
          if (--remaining === 0) {
            resolve(args);
          }
        } catch (ex) {
          reject(ex);
        }
      }

      for (var i = 0; i < args.length; i++) {
        res(i, args[i]);
      }
    });
  };

  Promise.resolve = function (value) {
    if (value && (typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object' && value.constructor === Promise) {
      return value;
    }

    return new Promise(function (resolve) {
      resolve(value);
    });
  };

  Promise.reject = function (value) {
    return new Promise(function (resolve, reject) {
      reject(value);
    });
  };

  Promise.race = function (values) {
    return new Promise(function (resolve, reject) {
      for (var i = 0, len = values.length; i < len; i++) {
        values[i].then(resolve, reject);
      }
    });
  };

  // Use polyfill for setImmediate for performance gains
  Promise._immediateFn = typeof setImmediate === 'function' && function (fn) {
    setImmediate(fn);
  } || function (fn) {
    setTimeoutFunc(fn, 0);
  };

  Promise._unhandledRejectionFn = function _unhandledRejectionFn(err) {
    if (typeof console !== 'undefined' && console) {
      console.warn('Possible Unhandled Promise Rejection:', err); // eslint-disable-line no-console
    }
  };

  /**
   * Set the immediate function to execute callbacks
   * @param fn {function} Function to execute
   * @deprecated
   */
  Promise._setImmediateFn = function _setImmediateFn(fn) {
    Promise._immediateFn = fn;
  };

  /**
   * Change the function to execute on unhandled rejection
   * @param {function} fn Function to execute on unhandled rejection
   * @deprecated
   */
  Promise._setUnhandledRejectionFn = function _setUnhandledRejectionFn(fn) {
    Promise._unhandledRejectionFn = fn;
  };

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = Promise;
  } else if (!root.Promise) {
    root.Promise = Promise;
  }
})(undefined);
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(105).setImmediate))

/***/ }),

/***/ 105:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {

var scope = typeof global !== "undefined" && global || typeof self !== "undefined" && self || window;
var apply = Function.prototype.apply;

// DOM APIs, for completeness

exports.setTimeout = function () {
  return new Timeout(apply.call(setTimeout, scope, arguments), clearTimeout);
};
exports.setInterval = function () {
  return new Timeout(apply.call(setInterval, scope, arguments), clearInterval);
};
exports.clearTimeout = exports.clearInterval = function (timeout) {
  if (timeout) {
    timeout.close();
  }
};

function Timeout(id, clearFn) {
  this._id = id;
  this._clearFn = clearFn;
}
Timeout.prototype.unref = Timeout.prototype.ref = function () {};
Timeout.prototype.close = function () {
  this._clearFn.call(scope, this._id);
};

// Does not start the time, just sets up the members needed.
exports.enroll = function (item, msecs) {
  clearTimeout(item._idleTimeoutId);
  item._idleTimeout = msecs;
};

exports.unenroll = function (item) {
  clearTimeout(item._idleTimeoutId);
  item._idleTimeout = -1;
};

exports._unrefActive = exports.active = function (item) {
  clearTimeout(item._idleTimeoutId);

  var msecs = item._idleTimeout;
  if (msecs >= 0) {
    item._idleTimeoutId = setTimeout(function onTimeout() {
      if (item._onTimeout) item._onTimeout();
    }, msecs);
  }
};

// setimmediate attaches itself to the global object
__webpack_require__(106);
// On some exotic environments, it's not clear which object `setimmediate` was
// able to install onto.  Search each possibility in the same order as the
// `setimmediate` library.
exports.setImmediate = typeof self !== "undefined" && self.setImmediate || typeof global !== "undefined" && global.setImmediate || undefined && undefined.setImmediate;
exports.clearImmediate = typeof self !== "undefined" && self.clearImmediate || typeof global !== "undefined" && global.clearImmediate || undefined && undefined.clearImmediate;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(13)))

/***/ }),

/***/ 106:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global, process) {

(function (global, undefined) {
    "use strict";

    if (global.setImmediate) {
        return;
    }

    var nextHandle = 1; // Spec says greater than zero
    var tasksByHandle = {};
    var currentlyRunningATask = false;
    var doc = global.document;
    var registerImmediate;

    function setImmediate(callback) {
        // Callback can either be a function or a string
        if (typeof callback !== "function") {
            callback = new Function("" + callback);
        }
        // Copy function arguments
        var args = new Array(arguments.length - 1);
        for (var i = 0; i < args.length; i++) {
            args[i] = arguments[i + 1];
        }
        // Store and register the task
        var task = { callback: callback, args: args };
        tasksByHandle[nextHandle] = task;
        registerImmediate(nextHandle);
        return nextHandle++;
    }

    function clearImmediate(handle) {
        delete tasksByHandle[handle];
    }

    function run(task) {
        var callback = task.callback;
        var args = task.args;
        switch (args.length) {
            case 0:
                callback();
                break;
            case 1:
                callback(args[0]);
                break;
            case 2:
                callback(args[0], args[1]);
                break;
            case 3:
                callback(args[0], args[1], args[2]);
                break;
            default:
                callback.apply(undefined, args);
                break;
        }
    }

    function runIfPresent(handle) {
        // From the spec: "Wait until any invocations of this algorithm started before this one have completed."
        // So if we're currently running a task, we'll need to delay this invocation.
        if (currentlyRunningATask) {
            // Delay by doing a setTimeout. setImmediate was tried instead, but in Firefox 7 it generated a
            // "too much recursion" error.
            setTimeout(runIfPresent, 0, handle);
        } else {
            var task = tasksByHandle[handle];
            if (task) {
                currentlyRunningATask = true;
                try {
                    run(task);
                } finally {
                    clearImmediate(handle);
                    currentlyRunningATask = false;
                }
            }
        }
    }

    function installNextTickImplementation() {
        registerImmediate = function registerImmediate(handle) {
            process.nextTick(function () {
                runIfPresent(handle);
            });
        };
    }

    function canUsePostMessage() {
        // The test against `importScripts` prevents this implementation from being installed inside a web worker,
        // where `global.postMessage` means something completely different and can't be used for this purpose.
        if (global.postMessage && !global.importScripts) {
            var postMessageIsAsynchronous = true;
            var oldOnMessage = global.onmessage;
            global.onmessage = function () {
                postMessageIsAsynchronous = false;
            };
            global.postMessage("", "*");
            global.onmessage = oldOnMessage;
            return postMessageIsAsynchronous;
        }
    }

    function installPostMessageImplementation() {
        // Installs an event handler on `global` for the `message` event: see
        // * https://developer.mozilla.org/en/DOM/window.postMessage
        // * http://www.whatwg.org/specs/web-apps/current-work/multipage/comms.html#crossDocumentMessages

        var messagePrefix = "setImmediate$" + Math.random() + "$";
        var onGlobalMessage = function onGlobalMessage(event) {
            if (event.source === global && typeof event.data === "string" && event.data.indexOf(messagePrefix) === 0) {
                runIfPresent(+event.data.slice(messagePrefix.length));
            }
        };

        if (global.addEventListener) {
            global.addEventListener("message", onGlobalMessage, false);
        } else {
            global.attachEvent("onmessage", onGlobalMessage);
        }

        registerImmediate = function registerImmediate(handle) {
            global.postMessage(messagePrefix + handle, "*");
        };
    }

    function installMessageChannelImplementation() {
        var channel = new MessageChannel();
        channel.port1.onmessage = function (event) {
            var handle = event.data;
            runIfPresent(handle);
        };

        registerImmediate = function registerImmediate(handle) {
            channel.port2.postMessage(handle);
        };
    }

    function installReadyStateChangeImplementation() {
        var html = doc.documentElement;
        registerImmediate = function registerImmediate(handle) {
            // Create a <script> element; its readystatechange event will be fired asynchronously once it is inserted
            // into the document. Do so, thus queuing up the task. Remember to clean up once it's been called.
            var script = doc.createElement("script");
            script.onreadystatechange = function () {
                runIfPresent(handle);
                script.onreadystatechange = null;
                html.removeChild(script);
                script = null;
            };
            html.appendChild(script);
        };
    }

    function installSetTimeoutImplementation() {
        registerImmediate = function registerImmediate(handle) {
            setTimeout(runIfPresent, 0, handle);
        };
    }

    // If supported, we should attach to the prototype of global, since that is where setTimeout et al. live.
    var attachTo = Object.getPrototypeOf && Object.getPrototypeOf(global);
    attachTo = attachTo && attachTo.setTimeout ? attachTo : global;

    // Don't get fooled by e.g. browserify environments.
    if ({}.toString.call(global.process) === "[object process]") {
        // For Node.js before 0.9
        installNextTickImplementation();
    } else if (canUsePostMessage()) {
        // For non-IE10 modern browsers
        installPostMessageImplementation();
    } else if (global.MessageChannel) {
        // For web workers, where supported
        installMessageChannelImplementation();
    } else if (doc && "onreadystatechange" in doc.createElement("script")) {
        // For IE 6–8
        installReadyStateChangeImplementation();
    } else {
        // For older browsers
        installSetTimeoutImplementation();
    }

    attachTo.setImmediate = setImmediate;
    attachTo.clearImmediate = clearImmediate;
})(typeof self === "undefined" ? typeof global === "undefined" ? undefined : global : self);
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(13), __webpack_require__(12)))

/***/ }),

/***/ 107:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var inputs = document.querySelectorAll('.js-request_field');
var activeClassName = 'c-field--focused';

var inputsFocusHandler = function inputsFocusHandler(evt) {
    var target = evt.target;

    var isFocused = evt.type === 'focus';

    isFocused && !target.parentNode.classList.contains(activeClassName) && target.parentNode.classList.add(activeClassName);
    !isFocused && target.parentNode.classList.contains(activeClassName) && target.parentNode.classList.remove(activeClassName);
};

for (var i = 0; i < inputs.length; i++) {
    var el = inputs[i];

    el.addEventListener('focus', inputsFocusHandler);
    el.addEventListener('blur', inputsFocusHandler);
}

/***/ }),

/***/ 108:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var checkboxes = document.querySelectorAll('.ui-checkbox');

function switchDisable(checked, target) {
    var className = 'b-request_submit-disabled';
    var submitBtnWrapper = target.closest('.b-request_form').querySelector('.b-request_submit');
    var submitBtn = submitBtnWrapper.querySelector('input[type="submit"]');

    if (checked) {
        submitBtnWrapper.classList.remove(className);
        submitBtn.removeAttribute("disabled");
    } else {
        submitBtnWrapper.classList.add(className);
        submitBtn.setAttribute("disabled", "disabled");
    }
}

function checkboxesChangeHandler(evt) {
    var target = evt.target;
    var checked = target.checked;


    switchDisable(checked, target);
}

for (var i = 0; i < checkboxes.length; i++) {
    var el = checkboxes[i];

    switchDisable(el.checked, el);

    el.addEventListener('change', checkboxesChangeHandler);
}

/***/ }),

/***/ 109:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/*! modernizr 3.5.0 (Custom Build) | MIT *
 * https://modernizr.com/download/?-cssanimations-touchevents-videoautoplay-setclasses !*/
!function (A, e, t) {
  function n(A, e) {
    return (typeof A === "undefined" ? "undefined" : _typeof(A)) === e;
  }function o() {
    var A, e, t, o, i, r, l;for (var a in y) {
      if (y.hasOwnProperty(a)) {
        if (A = [], e = y[a], e.name && (A.push(e.name.toLowerCase()), e.options && e.options.aliases && e.options.aliases.length)) for (t = 0; t < e.options.aliases.length; t++) {
          A.push(e.options.aliases[t].toLowerCase());
        }for (o = n(e.fn, "function") ? e.fn() : e.fn, i = 0; i < A.length; i++) {
          r = A[i], l = r.split("."), 1 === l.length ? Modernizr[l[0]] = o : (!Modernizr[l[0]] || Modernizr[l[0]] instanceof Boolean || (Modernizr[l[0]] = new Boolean(Modernizr[l[0]])), Modernizr[l[0]][l[1]] = o), E.push((o ? "" : "no-") + l.join("-"));
        }
      }
    }
  }function i(A) {
    var e = v.className,
        t = Modernizr._config.classPrefix || "";if (T && (e = e.baseVal), Modernizr._config.enableJSClass) {
      var n = new RegExp("(^|\\s)" + t + "no-js(\\s|$)");e = e.replace(n, "$1" + t + "js$2");
    }Modernizr._config.enableClasses && (e += " " + t + A.join(" " + t), T ? v.className.baseVal = e : v.className = e);
  }function r() {
    return "function" != typeof e.createElement ? e.createElement(arguments[0]) : T ? e.createElementNS.call(e, "http://www.w3.org/2000/svg", arguments[0]) : e.createElement.apply(e, arguments);
  }function l(A, e) {
    if ("object" == (typeof A === "undefined" ? "undefined" : _typeof(A))) for (var t in A) {
      G(A, t) && l(t, A[t]);
    } else {
      A = A.toLowerCase();var n = A.split("."),
          o = Modernizr[n[0]];if (2 == n.length && (o = o[n[1]]), "undefined" != typeof o) return Modernizr;e = "function" == typeof e ? e() : e, 1 == n.length ? Modernizr[n[0]] = e : (!Modernizr[n[0]] || Modernizr[n[0]] instanceof Boolean || (Modernizr[n[0]] = new Boolean(Modernizr[n[0]])), Modernizr[n[0]][n[1]] = e), i([(e && 0 != e ? "" : "no-") + n.join("-")]), Modernizr._trigger(A, e);
    }return Modernizr;
  }function a() {
    var A = e.body;return A || (A = r(T ? "svg" : "body"), A.fake = !0), A;
  }function s(A, t, n, o) {
    var i,
        l,
        s,
        c,
        u = "modernizr",
        d = r("div"),
        p = a();if (parseInt(n, 10)) for (; n--;) {
      s = r("div"), s.id = o ? o[n] : u + (n + 1), d.appendChild(s);
    }return i = r("style"), i.type = "text/css", i.id = "s" + u, (p.fake ? p : d).appendChild(i), p.appendChild(d), i.styleSheet ? i.styleSheet.cssText = A : i.appendChild(e.createTextNode(A)), d.id = u, p.fake && (p.style.background = "", p.style.overflow = "hidden", c = v.style.overflow, v.style.overflow = "hidden", v.appendChild(p)), l = t(d, A), p.fake ? (p.parentNode.removeChild(p), v.style.overflow = c, v.offsetHeight) : d.parentNode.removeChild(d), !!l;
  }function c(A, e) {
    return function () {
      return A.apply(e, arguments);
    };
  }function u(A, e, t) {
    var o;for (var i in A) {
      if (A[i] in e) return t === !1 ? A[i] : (o = e[A[i]], n(o, "function") ? c(o, t || e) : o);
    }return !1;
  }function d(A, e) {
    return !!~("" + A).indexOf(e);
  }function p(A) {
    return A.replace(/([a-z])-([a-z])/g, function (A, e, t) {
      return e + t.toUpperCase();
    }).replace(/^-/, "");
  }function f(A) {
    return A.replace(/([A-Z])/g, function (A, e) {
      return "-" + e.toLowerCase();
    }).replace(/^ms-/, "-ms-");
  }function h(e, t, n) {
    var o;if ("getComputedStyle" in A) {
      o = getComputedStyle.call(A, e, t);var i = A.console;if (null !== o) n && (o = o.getPropertyValue(n));else if (i) {
        var r = i.error ? "error" : "log";i[r].call(i, "getComputedStyle returning null, its possible modernizr test results are inaccurate");
      }
    } else o = !t && e.currentStyle && e.currentStyle[n];return o;
  }function m(e, n) {
    var o = e.length;if ("CSS" in A && "supports" in A.CSS) {
      for (; o--;) {
        if (A.CSS.supports(f(e[o]), n)) return !0;
      }return !1;
    }if ("CSSSupportsRule" in A) {
      for (var i = []; o--;) {
        i.push("(" + f(e[o]) + ":" + n + ")");
      }return i = i.join(" or "), s("@supports (" + i + ") { #modernizr { position: absolute; } }", function (A) {
        return "absolute" == h(A, null, "position");
      });
    }return t;
  }function w(A, e, o, i) {
    function l() {
      s && (delete V.style, delete V.modElem);
    }if (i = n(i, "undefined") ? !1 : i, !n(o, "undefined")) {
      var a = m(A, o);if (!n(a, "undefined")) return a;
    }for (var s, c, u, f, h, w = ["modernizr", "tspan", "samp"]; !V.style && w.length;) {
      s = !0, V.modElem = r(w.shift()), V.style = V.modElem.style;
    }for (u = A.length, c = 0; u > c; c++) {
      if (f = A[c], h = V.style[f], d(f, "-") && (f = p(f)), V.style[f] !== t) {
        if (i || n(o, "undefined")) return l(), "pfx" == e ? f : !0;try {
          V.style[f] = o;
        } catch (g) {}if (V.style[f] != h) return l(), "pfx" == e ? f : !0;
      }
    }return l(), !1;
  }function g(A, e, t, o, i) {
    var r = A.charAt(0).toUpperCase() + A.slice(1),
        l = (A + " " + Z.join(r + " ") + r).split(" ");return n(e, "string") || n(e, "undefined") ? w(l, e, o, i) : (l = (A + " " + Y.join(r + " ") + r).split(" "), u(l, e, t));
  }function R(A, e, n) {
    return g(A, t, t, e, n);
  }var E = [],
      y = [],
      B = { _version: "3.5.0", _config: { classPrefix: "", enableClasses: !0, enableJSClass: !0, usePrefixes: !0 }, _q: [], on: function on(A, e) {
      var t = this;setTimeout(function () {
        e(t[A]);
      }, 0);
    }, addTest: function addTest(A, e, t) {
      y.push({ name: A, fn: e, options: t });
    }, addAsyncTest: function addAsyncTest(A) {
      y.push({ name: null, fn: A });
    } },
      Modernizr = function Modernizr() {};Modernizr.prototype = B, Modernizr = new Modernizr();var v = e.documentElement,
      T = "svg" === v.nodeName.toLowerCase(),
      F = B._config.usePrefixes ? " -webkit- -moz- -o- -ms- ".split(" ") : ["", ""];B._prefixes = F, Modernizr.addTest("video", function () {
    var A = r("video"),
        e = !1;try {
      e = !!A.canPlayType, e && (e = new Boolean(e), e.ogg = A.canPlayType('video/ogg; codecs="theora"').replace(/^no$/, ""), e.h264 = A.canPlayType('video/mp4; codecs="avc1.42E01E"').replace(/^no$/, ""), e.webm = A.canPlayType('video/webm; codecs="vp8, vorbis"').replace(/^no$/, ""), e.vp9 = A.canPlayType('video/webm; codecs="vp9"').replace(/^no$/, ""), e.hls = A.canPlayType('application/x-mpegURL; codecs="avc1.42E01E"').replace(/^no$/, ""));
    } catch (t) {}return e;
  });var G;!function () {
    var A = {}.hasOwnProperty;G = n(A, "undefined") || n(A.call, "undefined") ? function (A, e) {
      return e in A && n(A.constructor.prototype[e], "undefined");
    } : function (e, t) {
      return A.call(e, t);
    };
  }(), B._l = {}, B.on = function (A, e) {
    this._l[A] || (this._l[A] = []), this._l[A].push(e), Modernizr.hasOwnProperty(A) && setTimeout(function () {
      Modernizr._trigger(A, Modernizr[A]);
    }, 0);
  }, B._trigger = function (A, e) {
    if (this._l[A]) {
      var t = this._l[A];setTimeout(function () {
        var A, n;for (A = 0; A < t.length; A++) {
          (n = t[A])(e);
        }
      }, 0), delete this._l[A];
    }
  }, Modernizr._q.push(function () {
    B.addTest = l;
  }), Modernizr.addAsyncTest(function () {
    function A(r) {
      o++, clearTimeout(e);var a = r && "playing" === r.type || 0 !== i.currentTime;return !a && n > o ? void (e = setTimeout(A, t)) : (i.removeEventListener("playing", A, !1), l("videoautoplay", a), void (i.parentNode && i.parentNode.removeChild(i)));
    }var e,
        t = 200,
        n = 5,
        o = 0,
        i = r("video"),
        a = i.style;if (!(Modernizr.video && "autoplay" in i)) return void l("videoautoplay", !1);a.position = "absolute", a.height = 0, a.width = 0;try {
      if (Modernizr.video.ogg) i.src = "data:video/ogg;base64,T2dnUwACAAAAAAAAAABmnCATAAAAAHDEixYBKoB0aGVvcmEDAgEAAQABAAAQAAAQAAAAAAAFAAAAAQAAAAAAAAAAAGIAYE9nZ1MAAAAAAAAAAAAAZpwgEwEAAAACrA7TDlj///////////////+QgXRoZW9yYSsAAABYaXBoLk9yZyBsaWJ0aGVvcmEgMS4xIDIwMDkwODIyIChUaHVzbmVsZGEpAQAAABoAAABFTkNPREVSPWZmbXBlZzJ0aGVvcmEtMC4yOYJ0aGVvcmG+zSj3uc1rGLWpSUoQc5zmMYxSlKQhCDGMYhCEIQhAAAAAAAAAAAAAEW2uU2eSyPxWEvx4OVts5ir1aKtUKBMpJFoQ/nk5m41mUwl4slUpk4kkghkIfDwdjgajQYC8VioUCQRiIQh8PBwMhgLBQIg4FRba5TZ5LI/FYS/Hg5W2zmKvVoq1QoEykkWhD+eTmbjWZTCXiyVSmTiSSCGQh8PB2OBqNBgLxWKhQJBGIhCHw8HAyGAsFAiDgUCw8PDw8PDw8PDw8PDw8PDw8PDw8PDw8PDw8PDw8PDw8PDw8PDw8PDw8PDw8PDw8PDw8PDw8PDw8PDw8PDw8PDw8PDAwPEhQUFQ0NDhESFRUUDg4PEhQVFRUOEBETFBUVFRARFBUVFRUVEhMUFRUVFRUUFRUVFRUVFRUVFRUVFRUVEAwLEBQZGxwNDQ4SFRwcGw4NEBQZHBwcDhATFhsdHRwRExkcHB4eHRQYGxwdHh4dGxwdHR4eHh4dHR0dHh4eHRALChAYKDM9DAwOExo6PDcODRAYKDlFOA4RFh0zV1A+EhYlOkRtZ00YIzdAUWhxXDFATldneXhlSFxfYnBkZ2MTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTEhIVGRoaGhoSFBYaGhoaGhUWGRoaGhoaGRoaGhoaGhoaGhoaGhoaGhoaGhoaGhoaGhoaGhoaGhoaGhoaGhoaGhESFh8kJCQkEhQYIiQkJCQWGCEkJCQkJB8iJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQREhgvY2NjYxIVGkJjY2NjGBo4Y2NjY2MvQmNjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjFRUVFRUVFRUVFRUVFRUVFRUVFRUVFRUVFRUVFRUVFRUVFRUVFRUVFRUVFRUVFRUVFRUVFRUVFRUVFRUVFRUVFRISEhUXGBkbEhIVFxgZGxwSFRcYGRscHRUXGBkbHB0dFxgZGxwdHR0YGRscHR0dHhkbHB0dHR4eGxwdHR0eHh4REREUFxocIBERFBcaHCAiERQXGhwgIiUUFxocICIlJRcaHCAiJSUlGhwgIiUlJSkcICIlJSUpKiAiJSUlKSoqEBAQFBgcICgQEBQYHCAoMBAUGBwgKDBAFBgcICgwQEAYHCAoMEBAQBwgKDBAQEBgICgwQEBAYIAoMEBAQGCAgAfF5cdH1e3Ow/L66wGmYnfIUbwdUTe3LMRbqON8B+5RJEvcGxkvrVUjTMrsXYhAnIwe0dTJfOYbWrDYyqUrz7dw/JO4hpmV2LsQQvkUeGq1BsZLx+cu5iV0e0eScJ91VIQYrmqfdVSK7GgjOU0oPaPOu5IcDK1mNvnD+K8LwS87f8Jx2mHtHnUkTGAurWZlNQa74ZLSFH9oF6FPGxzLsjQO5Qe0edcpttd7BXBSqMCL4k/4tFrHIPuEQ7m1/uIWkbDMWVoDdOSuRQ9286kvVUlQjzOE6VrNguN4oRXYGkgcnih7t13/9kxvLYKQezwLTrO44sVmMPgMqORo1E0sm1/9SludkcWHwfJwTSybR4LeAz6ugWVgRaY8mV/9SluQmtHrzsBtRF/wPY+X0JuYTs+ltgrXAmlk10xQHmTu9VSIAk1+vcvU4ml2oNzrNhEtQ3CysNP8UeR35wqpKUBdGdZMSjX4WVi8nJpdpHnbhzEIdx7mwf6W1FKAiucMXrWUWVjyRf23chNtR9mIzDoT/6ZLYailAjhFlZuvPtSeZ+2oREubDoWmT3TguY+JHPdRVSLKxfKH3vgNqJ/9emeEYikGXDFNzaLjvTeGAL61mogOoeG3y6oU4rW55ydoj0lUTSR/mmRhPmF86uwIfzp3FtiufQCmppaHDlGE0r2iTzXIw3zBq5hvaTldjG4CPb9wdxAme0SyedVKczJ9AtYbgPOzYKJvZZImsN7ecrxWZg5dR6ZLj/j4qpWsIA+vYwE+Tca9ounMIsrXMB4Stiib2SPQtZv+FVIpfEbzv8ncZoLBXc3YBqTG1HsskTTotZOYTG+oVUjLk6zhP8bg4RhMUNtfZdO7FdpBuXzhJ5Fh8IKlJG7wtD9ik8rWOJxy6iQ3NwzBpQ219mlyv+FLicYs2iJGSE0u2txzed++D61ZWCiHD/cZdQVCqkO2gJpdpNaObhnDfAPrT89RxdWFZ5hO3MseBSIlANppdZNIV/Rwe5eLTDvkfWKzFnH+QJ7m9QWV1KdwnuIwTNtZdJMoXBf74OhRnh2t+OTGL+AVUnIkyYY+QG7g9itHXyF3OIygG2s2kud679ZWKqSFa9n3IHD6MeLv1lZ0XyduRhiDRtrNnKoyiFVLcBm0ba5Yy3fQkDh4XsFE34isVpOzpa9nR8iCpS4HoxG2rJpnRhf3YboVa1PcRouh5LIJv/uQcPNd095ickTaiGBnWLKVWRc0OnYTSyex/n2FofEPnDG8y3PztHrzOLK1xo6RAml2k9owKajOC0Wr4D5x+3nA0UEhK2m198wuBHF3zlWWVKWLN1CHzLClUfuoYBcx4b1llpeBKmbayaR58njtE9onD66lUcsg0Spm2snsb+8HaJRn4dYcLbCuBuYwziB8/5U1C1DOOz2gZjSZtrLJk6vrLF3hwY4Io9xuT/ruUFRSBkNtUzTOWhjh26irLEPx4jPZL3Fo3QrReoGTTM21xYTT9oFdhTUIvjqTkfkvt0bzgVUjq/hOYY8j60IaO/0AzRBtqkTS6R5ellZd5uKdzzhb8BFlDdAcrwkE0rbXTOPB+7Y0FlZO96qFL4Ykg21StJs8qIW7h16H5hGiv8V2Cflau7QVDepTAHa6Lgt6feiEvJDM21StJsmOH/hynURrKxvUpQ8BH0JF7BiyG2qZpnL/7AOU66gt+reLEXY8pVOCQvSsBtqZTNM8bk9ohRcwD18o/WVkbvrceVKRb9I59IEKysjBeTMmmbA21xu/6iHadLRxuIzkLpi8wZYmmbbWi32RVAUjruxWlJ//iFxE38FI9hNKOoCdhwf5fDe4xZ81lgREhK2m1j78vW1CqkuMu/AjBNK210kzRUX/B+69cMMUG5bYrIeZxVSEZISmkzbXOi9yxwIfPgdsov7R71xuJ7rFcACjG/9PzApqFq7wEgzNJm2suWESPuwrQvejj7cbnQxMkxpm21lUYJL0fKmogPPqywn7e3FvB/FCNxPJ85iVUkCE9/tLKx31G4CgNtWTTPFhMvlu8G4/TrgaZttTChljfNJGgOT2X6EqpETy2tYd9cCBI4lIXJ1/3uVUllZEJz4baqGF64yxaZ+zPLYwde8Uqn1oKANtUrSaTOPHkhvuQP3bBlEJ/LFe4pqQOHUI8T8q7AXx3fLVBgSCVpMba55YxN3rv8U1Dv51bAPSOLlZWebkL8vSMGI21lJmmeVxPRwFlZF1CpqCN8uLwymaZyjbXHCRytogPN3o/n74CNykfT+qqRv5AQlHcRxYrC5KvGmbbUwmZY/29BvF6C1/93x4WVglXDLFpmbapmF89HKTogRwqqSlGbu+oiAkcWFbklC6Zhf+NtTLFpn8oWz+HsNRVSgIxZWON+yVyJlE5tq/+GWLTMutYX9ekTySEQPLVNQQ3OfycwJBM0zNtZcse7CvcKI0V/zh16Dr9OSA21MpmmcrHC+6pTAPHPwoit3LHHqs7jhFNRD6W8+EBGoSEoaZttTCZljfduH/fFisn+dRBGAZYtMzbVMwvul/T/crK1NQh8gN0SRRa9cOux6clC0/mDLFpmbarmF8/e6CopeOLCNW6S/IUUg3jJIYiAcDoMcGeRbOvuTPjXR/tyo79LK3kqqkbxkkMRAOB0GODPItnX3Jnxro/25Ud+llbyVVSN4ySGIgHA6DHBnkWzr7kz410f7cqO/Syt5KqpFVJwn6gBEvBM0zNtZcpGOEPiysW8vvRd2R0f7gtjhqUvXL+gWVwHm4XJDBiMpmmZtrLfPwd/IugP5+fKVSysH1EXreFAcEhelGmbbUmZY4Xdo1vQWVnK19P4RuEnbf0gQnR+lDCZlivNM22t1ESmopPIgfT0duOfQrsjgG4tPxli0zJmF5trdL1JDUIUT1ZXSqQDeR4B8mX3TrRro/2McGeUvLtwo6jIEKMkCUXWsLyZROd9P/rFYNtXPBli0z398iVUlVKAjFlY437JXImUTm2r/4ZYtMy61hf16RPJIU9nZ1MABAwAAAAAAAAAZpwgEwIAAABhp658BScAAAAAAADnUFBQXIDGXLhwtttNHDhw5OcpQRMETBEwRPduylKVB0HRdF0A";else {
        if (!Modernizr.video.h264) return void l("videoautoplay", !1);i.src = "data:video/mp4;base64,AAAAIGZ0eXBpc29tAAACAGlzb21pc28yYXZjMW1wNDEAAAAIZnJlZQAAAs1tZGF0AAACrgYF//+q3EXpvebZSLeWLNgg2SPu73gyNjQgLSBjb3JlIDE0OCByMjYwMSBhMGNkN2QzIC0gSC4yNjQvTVBFRy00IEFWQyBjb2RlYyAtIENvcHlsZWZ0IDIwMDMtMjAxNSAtIGh0dHA6Ly93d3cudmlkZW9sYW4ub3JnL3gyNjQuaHRtbCAtIG9wdGlvbnM6IGNhYmFjPTEgcmVmPTMgZGVibG9jaz0xOjA6MCBhbmFseXNlPTB4MzoweDExMyBtZT1oZXggc3VibWU9NyBwc3k9MSBwc3lfcmQ9MS4wMDowLjAwIG1peGVkX3JlZj0xIG1lX3JhbmdlPTE2IGNocm9tYV9tZT0xIHRyZWxsaXM9MSA4eDhkY3Q9MSBjcW09MCBkZWFkem9uZT0yMSwxMSBmYXN0X3Bza2lwPTEgY2hyb21hX3FwX29mZnNldD0tMiB0aHJlYWRzPTEgbG9va2FoZWFkX3RocmVhZHM9MSBzbGljZWRfdGhyZWFkcz0wIG5yPTAgZGVjaW1hdGU9MSBpbnRlcmxhY2VkPTAgYmx1cmF5X2NvbXBhdD0wIGNvbnN0cmFpbmVkX2ludHJhPTAgYmZyYW1lcz0zIGJfcHlyYW1pZD0yIGJfYWRhcHQ9MSBiX2JpYXM9MCBkaXJlY3Q9MSB3ZWlnaHRiPTEgb3Blbl9nb3A9MCB3ZWlnaHRwPTIga2V5aW50PTI1MCBrZXlpbnRfbWluPTEwIHNjZW5lY3V0PTQwIGludHJhX3JlZnJlc2g9MCByY19sb29rYWhlYWQ9NDAgcmM9Y3JmIG1idHJlZT0xIGNyZj0yMy4wIHFjb21wPTAuNjAgcXBtaW49MCBxcG1heD02OSBxcHN0ZXA9NCBpcF9yYXRpbz0xLjQwIGFxPTE6MS4wMACAAAAAD2WIhAA3//728P4FNjuZQQAAAu5tb292AAAAbG12aGQAAAAAAAAAAAAAAAAAAAPoAAAAZAABAAABAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACAAACGHRyYWsAAABcdGtoZAAAAAMAAAAAAAAAAAAAAAEAAAAAAAAAZAAAAAAAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAEAAAAAAAgAAAAIAAAAAACRlZHRzAAAAHGVsc3QAAAAAAAAAAQAAAGQAAAAAAAEAAAAAAZBtZGlhAAAAIG1kaGQAAAAAAAAAAAAAAAAAACgAAAAEAFXEAAAAAAAtaGRscgAAAAAAAAAAdmlkZQAAAAAAAAAAAAAAAFZpZGVvSGFuZGxlcgAAAAE7bWluZgAAABR2bWhkAAAAAQAAAAAAAAAAAAAAJGRpbmYAAAAcZHJlZgAAAAAAAAABAAAADHVybCAAAAABAAAA+3N0YmwAAACXc3RzZAAAAAAAAAABAAAAh2F2YzEAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAgACAEgAAABIAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAY//8AAAAxYXZjQwFkAAr/4QAYZ2QACqzZX4iIhAAAAwAEAAADAFA8SJZYAQAGaOvjyyLAAAAAGHN0dHMAAAAAAAAAAQAAAAEAAAQAAAAAHHN0c2MAAAAAAAAAAQAAAAEAAAABAAAAAQAAABRzdHN6AAAAAAAAAsUAAAABAAAAFHN0Y28AAAAAAAAAAQAAADAAAABidWR0YQAAAFptZXRhAAAAAAAAACFoZGxyAAAAAAAAAABtZGlyYXBwbAAAAAAAAAAAAAAAAC1pbHN0AAAAJal0b28AAAAdZGF0YQAAAAEAAAAATGF2ZjU2LjQwLjEwMQ==";
      }
    } catch (s) {
      return void l("videoautoplay", !1);
    }i.setAttribute("autoplay", ""), i.style.cssText = "display:none", v.appendChild(i), setTimeout(function () {
      i.addEventListener("playing", A, !1), e = setTimeout(A, t);
    }, 0);
  });var C = B.testStyles = s;Modernizr.addTest("touchevents", function () {
    var t;if ("ontouchstart" in A || A.DocumentTouch && e instanceof DocumentTouch) t = !0;else {
      var n = ["@media (", F.join("touch-enabled),("), "heartz", ")", "{#modernizr{top:9px;position:absolute}}"].join("");C(n, function (A) {
        t = 9 === A.offsetTop;
      });
    }return t;
  });var Q = "Moz O ms Webkit",
      Z = B._config.usePrefixes ? Q.split(" ") : [];B._cssomPrefixes = Z;var Y = B._config.usePrefixes ? Q.toLowerCase().split(" ") : [];B._domPrefixes = Y;var x = { elem: r("modernizr") };Modernizr._q.push(function () {
    delete x.elem;
  });var V = { style: x.elem.style };Modernizr._q.unshift(function () {
    delete V.style;
  }), B.testAllProps = g, B.testAllProps = R, Modernizr.addTest("cssanimations", R("animationName", "a", !0)), o(), i(E), delete B.addTest, delete B.addAsyncTest;for (var M = 0; M < Modernizr._q.length; M++) {
    Modernizr._q[M]();
  }A.Modernizr = Modernizr;
}(window, document);

/***/ }),

/***/ 11:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/**
 * Checks if `value` is the
 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(_.noop);
 * // => true
 *
 * _.isObject(null);
 * // => false
 */
function isObject(value) {
  var type = typeof value === 'undefined' ? 'undefined' : _typeof(value);
  return value != null && (type == 'object' || type == 'function');
}

module.exports = isObject;

/***/ }),

/***/ 110:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var $ = __webpack_require__(82);

var _document = document,
    body = _document.body;

var modal = body.querySelector('#privacy-full').content.querySelector('.privacy-modal');
var links = body.querySelectorAll('.privacy-link');
var privacyHash = '#privacy';

function closeBtnClickHandler(evt) {
    var parentNode = evt.target.parentNode;


    body.style.overflow = 'unset';

    $('.privacy-modal').fadeOut(300);
    setTimeout(function () {
        return parentNode.remove();
    }, 300);
    history.back();
}

function openPopup() {
    var _this = this;

    body.style.overflow = 'hidden';

    _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var closeBtn;
        return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        _context.next = 2;
                        return body.append(modal);

                    case 2:

                        $('.privacy-modal').fadeIn(300);
                        history.pushState(null, null, privacyHash);

                        closeBtn = body.querySelector('.privacy-modal_close-btn');


                        closeBtn.addEventListener('click', closeBtnClickHandler);

                    case 6:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, _this);
    }))();
}

function linkClickHandler(evt) {
    evt.preventDefault();

    openPopup();
}

(function privacyHashCkecker() {
    var hash = window.location.hash;

    var isPrivacy = hash === privacyHash;

    if (isPrivacy) {
        openPopup();
    }
})();

for (var i = 0; i < links.length; i++) {
    links[i].addEventListener('click', linkClickHandler);
}

exports.linkClickHandler = linkClickHandler;

/***/ }),

/***/ 111:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var modal = document.querySelector('.cookie-msg');
var closeBtn = modal.querySelector('.cookie-msg__close-btn');
var modalHiddenClassname = 'cookie-msg--hidden';

function closeBtnClickHandler(evt) {
    evt.preventDefault();

    modal.classList.add(modalHiddenClassname);
    window.localStorage.setItem('isCookieAccept', true);
}

window.onload = function () {
    var isCookieAccept = window.localStorage.isCookieAccept;


    !isCookieAccept && setTimeout(function () {
        return modal.classList.remove(modalHiddenClassname);
    }, 5000);
};

closeBtn.addEventListener('click', closeBtnClickHandler);

/***/ }),

/***/ 113:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Module dependencies.
 * @private
 */

var googleAnalytics = __webpack_require__(3);

/**
 * @public
 * @type {Object}
 */
module.exports = {
  init: function init() {
    initCopyright();

    var link = document.querySelector(".l-footer .l-mail-link");

    link.addEventListener('click', function () {

      googleAnalytics.sendEvent({
        eventCategory: 'request',
        eventAction: 'email',
        eventLabel: 'footer'
      });
    });
  }
};

function initCopyright() {
  var currentYear = new Date().getFullYear();
  var copyrightElement = document.querySelector('.c-copyright span');
  copyrightElement.innerText = "\xA9 1999-" + currentYear + " Mercury Development LLC";
}

/***/ }),

/***/ 114:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * @public
 */

var timer;
var isDisabled = false;

/**
 * @public
 * @type {Object}
 */
module.exports = {
	init: function init() {
		window.addEventListener("scroll", onScroll, false);
	}
};

/**
 * @public
 */
function onScroll() {
	timer && clearTimeout(timer);

	!isDisabled && toggleMouseEvent(true);

	timer = setTimeout(function () {
		toggleMouseEvent(false);
	}, 300);
}

/**
 * @private
 */
function toggleMouseEvent(state) {
	isDisabled = state;
	document.body.classList.toggle("disable-pointer-events", state);
}

/***/ }),

/***/ 12:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout() {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
})();
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch (e) {
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch (e) {
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }
}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e) {
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e) {
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }
}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while (len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) {
    return [];
};

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () {
    return '/';
};
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function () {
    return 0;
};

/***/ }),

/***/ 121:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 122:
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(module) {var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*** IMPORTS FROM imports-loader ***/
var global = window;

'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

(function webpackUniversalModuleDefinition(root, factory) {
    if (( false ? 'undefined' : _typeof(exports)) === 'object' && ( false ? 'undefined' : _typeof(module)) === 'object') module.exports = factory();else if (true) !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));else {
        var a = factory();
        for (var i in a) {
            ((typeof exports === 'undefined' ? 'undefined' : _typeof(exports)) === 'object' ? exports : root)[i] = a[i];
        }
    }
})(typeof self !== 'undefined' ? self : undefined, function () {
    return (/******/function (modules) {
            // webpackBootstrap
            /******/ // The module cache
            /******/var installedModules = {};
            /******/
            /******/ // The require function
            /******/function __webpack_require__(moduleId) {
                /******/
                /******/ // Check if module is in cache
                /******/if (installedModules[moduleId]) {
                    /******/return installedModules[moduleId].exports;
                    /******/
                }
                /******/ // Create a new module (and put it into the cache)
                /******/var module = installedModules[moduleId] = {
                    /******/i: moduleId,
                    /******/l: false,
                    /******/exports: {}
                    /******/ };
                /******/
                /******/ // Execute the module function
                /******/modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
                /******/
                /******/ // Flag the module as loaded
                /******/module.l = true;
                /******/
                /******/ // Return the exports of the module
                /******/return module.exports;
                /******/
            }
            /******/
            /******/
            /******/ // expose the modules object (__webpack_modules__)
            /******/__webpack_require__.m = modules;
            /******/
            /******/ // expose the module cache
            /******/__webpack_require__.c = installedModules;
            /******/
            /******/ // define getter function for harmony exports
            /******/__webpack_require__.d = function (exports, name, getter) {
                /******/if (!__webpack_require__.o(exports, name)) {
                    /******/Object.defineProperty(exports, name, {
                        /******/configurable: false,
                        /******/enumerable: true,
                        /******/get: getter
                        /******/ });
                    /******/
                }
                /******/
            };
            /******/
            /******/ // getDefaultExport function for compatibility with non-harmony modules
            /******/__webpack_require__.n = function (module) {
                /******/var getter = module && module.__esModule ?
                /******/function getDefault() {
                    return module['default'];
                } :
                /******/function getModuleExports() {
                    return module;
                };
                /******/__webpack_require__.d(getter, 'a', getter);
                /******/return getter;
                /******/
            };
            /******/
            /******/ // Object.prototype.hasOwnProperty.call
            /******/__webpack_require__.o = function (object, property) {
                return Object.prototype.hasOwnProperty.call(object, property);
            };
            /******/
            /******/ // __webpack_public_path__
            /******/__webpack_require__.p = "";
            /******/
            /******/ // Load entry module and return exports
            /******/return __webpack_require__(__webpack_require__.s = 7);
            /******/
        }(
        /************************************************************************/
        /******/[
        /* 0 */
        /***/function (module, exports, __webpack_require__) {

            "use strict";

            Object.defineProperty(exports, "__esModule", {
                value: true
            });

            var _extends = Object.assign || function (target) {
                for (var i = 1; i < arguments.length; i++) {
                    var source = arguments[i];for (var key in source) {
                        if (Object.prototype.hasOwnProperty.call(source, key)) {
                            target[key] = source[key];
                        }
                    }
                }return target;
            }; /* globals jQuery */

            exports.lory = lory;

            var _detectPrefixes = __webpack_require__(1);

            var _detectPrefixes2 = _interopRequireDefault(_detectPrefixes);

            var _detectSupportsPassive = __webpack_require__(2);

            var _detectSupportsPassive2 = _interopRequireDefault(_detectSupportsPassive);

            var _dispatchEvent = __webpack_require__(3);

            var _dispatchEvent2 = _interopRequireDefault(_dispatchEvent);

            var _defaults = __webpack_require__(6);

            var _defaults2 = _interopRequireDefault(_defaults);

            function _interopRequireDefault(obj) {
                return obj && obj.__esModule ? obj : { default: obj };
            }

            var slice = Array.prototype.slice;

            function lory(slider, opts) {
                var position = void 0;
                var slidesWidth = void 0;
                var frameWidth = void 0;
                var slides = void 0;

                /**
                 * slider DOM elements
                 */
                var frame = void 0;
                var slideContainer = void 0;
                var prevCtrl = void 0;
                var nextCtrl = void 0;
                var prefixes = void 0;
                var transitionEndCallback = void 0;

                var index = 0;
                var options = {};
                var touchEventParams = (0, _detectSupportsPassive2.default)() ? { passive: true } : false;

                /**
                 * if object is jQuery convert to native DOM element
                 */
                if (typeof jQuery !== 'undefined' && slider instanceof jQuery) {
                    slider = slider[0];
                }

                /**
                 * private
                 * set active class to element which is the current slide
                 */
                function setActiveElement(slides, currentIndex) {
                    var _options = options,
                        classNameActiveSlide = _options.classNameActiveSlide;

                    slides.forEach(function (element, index) {
                        if (element.classList.contains(classNameActiveSlide)) {
                            element.classList.remove(classNameActiveSlide);
                        }
                    });

                    slides[currentIndex].classList.add(classNameActiveSlide);
                }

                /**
                 * private
                 * setupInfinite: function to setup if infinite is set
                 *
                 * @param  {array} slideArray
                 * @return {array} array of updated slideContainer elements
                 */
                function setupInfinite(slideArray) {
                    var _options2 = options,
                        infinite = _options2.infinite;

                    var front = slideArray.slice(0, infinite);
                    var back = slideArray.slice(slideArray.length - infinite, slideArray.length);

                    front.forEach(function (element) {
                        var cloned = element.cloneNode(true);

                        slideContainer.appendChild(cloned);
                    });

                    back.reverse().forEach(function (element) {
                        var cloned = element.cloneNode(true);

                        slideContainer.insertBefore(cloned, slideContainer.firstChild);
                    });

                    slideContainer.addEventListener(prefixes.transitionEnd, onTransitionEnd);

                    return slice.call(slideContainer.children);
                }

                /**
                 * [dispatchSliderEvent description]
                 * @return {[type]} [description]
                 */
                function dispatchSliderEvent(phase, type, detail) {
                    (0, _dispatchEvent2.default)(slider, phase + '.lory.' + type, detail);
                }

                /**
                 * translates to a given position in a given time in milliseconds
                 *
                 * @to        {number} number in pixels where to translate to
                 * @duration  {number} time in milliseconds for the transistion
                 * @ease      {string} easing css property
                 */
                function translate(to, duration, ease) {
                    var style = slideContainer && slideContainer.style;

                    if (style) {
                        style[prefixes.transition + 'TimingFunction'] = ease;
                        style[prefixes.transition + 'Duration'] = duration + 'ms';
                        style[prefixes.transform] = 'translateX(' + to + 'px)';
                    }
                }

                /**
                 * returns an element's width
                 */
                function elementWidth(element) {
                    return element.getBoundingClientRect().width || element.offsetWidth;
                }

                /**
                 * slidefunction called by prev, next & touchend
                 *
                 * determine nextIndex and slide to next postion
                 * under restrictions of the defined options
                 *
                 * @direction  {boolean}
                 */
                function slide(nextIndex, direction) {
                    var _options3 = options,
                        slideSpeed = _options3.slideSpeed,
                        slidesToScroll = _options3.slidesToScroll,
                        infinite = _options3.infinite,
                        rewind = _options3.rewind,
                        rewindPrev = _options3.rewindPrev,
                        rewindSpeed = _options3.rewindSpeed,
                        ease = _options3.ease,
                        classNameActiveSlide = _options3.classNameActiveSlide,
                        _options3$classNameDi = _options3.classNameDisabledNextCtrl,
                        classNameDisabledNextCtrl = _options3$classNameDi === undefined ? 'disabled' : _options3$classNameDi,
                        _options3$classNameDi2 = _options3.classNameDisabledPrevCtrl,
                        classNameDisabledPrevCtrl = _options3$classNameDi2 === undefined ? 'disabled' : _options3$classNameDi2;

                    var duration = slideSpeed;

                    var nextSlide = direction ? index + 1 : index - 1;
                    var maxOffset = Math.round(slidesWidth - frameWidth);

                    dispatchSliderEvent('before', 'slide', {
                        index: index,
                        nextSlide: nextSlide
                    });

                    /**
                     * Reset control classes
                     */
                    if (prevCtrl) {
                        prevCtrl.classList.remove(classNameDisabledPrevCtrl);
                    }
                    if (nextCtrl) {
                        nextCtrl.classList.remove(classNameDisabledNextCtrl);
                    }

                    if (typeof nextIndex !== 'number') {
                        if (direction) {
                            if (infinite && index + infinite * 2 !== slides.length) {
                                nextIndex = index + (infinite - index % infinite);
                            } else {
                                nextIndex = index + slidesToScroll;
                            }
                        } else {
                            if (infinite && index % infinite !== 0) {
                                nextIndex = index - index % infinite;
                            } else {
                                nextIndex = index - slidesToScroll;
                            }
                        }
                    }

                    nextIndex = Math.min(Math.max(nextIndex, 0), slides.length - 1);

                    if (infinite && direction === undefined) {
                        nextIndex += infinite;
                    }

                    if (rewindPrev && Math.abs(position.x) === 0 && direction === false) {
                        nextIndex = slides.length - 1;
                        duration = rewindSpeed;
                    }

                    var nextOffset = Math.min(Math.max(slides[nextIndex].offsetLeft * -1, maxOffset * -1), 0);

                    if (rewind && Math.abs(position.x) === maxOffset && direction) {
                        nextOffset = 0;
                        nextIndex = 0;
                        duration = rewindSpeed;
                    }

                    /**
                     * translate to the nextOffset by a defined duration and ease function
                     */
                    translate(nextOffset, duration, ease);

                    /**
                     * update the position with the next position
                     */
                    position.x = nextOffset;

                    /**
                     * update the index with the nextIndex only if
                     * the offset of the nextIndex is in the range of the maxOffset
                     */
                    if (slides[nextIndex].offsetLeft <= maxOffset) {
                        index = nextIndex;
                    }

                    if (infinite && (nextIndex === slides.length - infinite || nextIndex === slides.length - slides.length % infinite || nextIndex === 0)) {
                        if (direction) {
                            index = infinite;
                        }

                        if (!direction) {
                            index = slides.length - infinite * 2;
                        }

                        position.x = slides[index].offsetLeft * -1;

                        transitionEndCallback = function transitionEndCallback() {
                            translate(slides[index].offsetLeft * -1, 0, undefined);
                        };
                    }

                    if (classNameActiveSlide) {
                        setActiveElement(slice.call(slides), index);
                    }

                    /**
                     * update classes for next and prev arrows
                     * based on user settings
                     */
                    if (prevCtrl && !infinite && !rewindPrev && nextIndex === 0) {
                        prevCtrl.classList.add(classNameDisabledPrevCtrl);
                    }

                    if (nextCtrl && !infinite && !rewind && nextIndex + 1 === slides.length) {
                        nextCtrl.classList.add(classNameDisabledNextCtrl);
                    }

                    dispatchSliderEvent('after', 'slide', {
                        currentSlide: index
                    });
                }

                /**
                 * public
                 * setup function
                 */
                function setup() {
                    dispatchSliderEvent('before', 'init');

                    prefixes = (0, _detectPrefixes2.default)();
                    options = _extends({}, _defaults2.default, opts);

                    var _options4 = options,
                        classNameFrame = _options4.classNameFrame,
                        classNameSlideContainer = _options4.classNameSlideContainer,
                        classNamePrevCtrl = _options4.classNamePrevCtrl,
                        classNameNextCtrl = _options4.classNameNextCtrl,
                        _options4$classNameDi = _options4.classNameDisabledNextCtrl,
                        classNameDisabledNextCtrl = _options4$classNameDi === undefined ? 'disabled' : _options4$classNameDi,
                        _options4$classNameDi2 = _options4.classNameDisabledPrevCtrl,
                        classNameDisabledPrevCtrl = _options4$classNameDi2 === undefined ? 'disabled' : _options4$classNameDi2,
                        enableMouseEvents = _options4.enableMouseEvents,
                        classNameActiveSlide = _options4.classNameActiveSlide,
                        initialIndex = _options4.initialIndex;

                    index = initialIndex;
                    frame = slider.getElementsByClassName(classNameFrame)[0];
                    slideContainer = frame.getElementsByClassName(classNameSlideContainer)[0];
                    prevCtrl = slider.getElementsByClassName(classNamePrevCtrl)[0];
                    nextCtrl = slider.getElementsByClassName(classNameNextCtrl)[0];

                    position = {
                        x: slideContainer.offsetLeft,
                        y: slideContainer.offsetTop
                    };

                    if (options.infinite) {
                        slides = setupInfinite(slice.call(slideContainer.children));
                    } else {
                        slides = slice.call(slideContainer.children);

                        if (prevCtrl && !options.rewindPrev) {
                            prevCtrl.classList.add(classNameDisabledPrevCtrl);
                        }

                        if (nextCtrl && slides.length === 1 && !options.rewind) {
                            nextCtrl.classList.add(classNameDisabledNextCtrl);
                        }
                    }

                    reset();

                    if (classNameActiveSlide) {
                        setActiveElement(slides, index);
                    }

                    if (prevCtrl && nextCtrl) {
                        prevCtrl.addEventListener('click', prev);
                        nextCtrl.addEventListener('click', next);
                    }

                    frame.addEventListener('touchstart', onTouchstart, touchEventParams);

                    if (enableMouseEvents) {
                        frame.addEventListener('mousedown', onTouchstart);
                        frame.addEventListener('click', onClick);
                    }

                    options.window.addEventListener('resize', onResize);

                    dispatchSliderEvent('after', 'init');
                }

                /**
                 * public
                 * reset function: called on resize
                 */
                function reset() {
                    var _options5 = options,
                        infinite = _options5.infinite,
                        ease = _options5.ease,
                        rewindSpeed = _options5.rewindSpeed,
                        rewindOnResize = _options5.rewindOnResize,
                        classNameActiveSlide = _options5.classNameActiveSlide,
                        initialIndex = _options5.initialIndex;

                    slidesWidth = elementWidth(slideContainer);
                    frameWidth = elementWidth(frame);

                    if (frameWidth === slidesWidth) {
                        slidesWidth = slides.reduce(function (previousValue, slide) {
                            return previousValue + elementWidth(slide);
                        }, 0);
                    }

                    if (rewindOnResize) {
                        index = initialIndex;
                    } else {
                        ease = null;
                        rewindSpeed = 0;
                    }

                    if (infinite) {
                        translate(slides[index + infinite].offsetLeft * -1, 0, null);

                        index = index + infinite;
                        position.x = slides[index].offsetLeft * -1;
                    } else {
                        translate(slides[index].offsetLeft * -1, rewindSpeed, ease);
                        position.x = slides[index].offsetLeft * -1;
                    }

                    if (classNameActiveSlide) {
                        setActiveElement(slice.call(slides), index);
                    }
                }

                /**
                 * public
                 * slideTo: called on clickhandler
                 */
                function slideTo(index) {
                    slide(index);
                }

                /**
                 * public
                 * returnIndex function: called on clickhandler
                 */
                function returnIndex() {
                    return index - options.infinite || 0;
                }

                /**
                 * public
                 * prev function: called on clickhandler
                 */
                function prev() {
                    slide(false, false);
                }

                /**
                 * public
                 * next function: called on clickhandler
                 */
                function next() {
                    slide(false, true);
                }

                /**
                 * public
                 * destroy function: called to gracefully destroy the lory instance
                 */
                function destroy() {
                    dispatchSliderEvent('before', 'destroy');

                    // remove event listeners
                    frame.removeEventListener(prefixes.transitionEnd, onTransitionEnd);
                    frame.removeEventListener('touchstart', onTouchstart, touchEventParams);
                    frame.removeEventListener('touchmove', onTouchmove, touchEventParams);
                    frame.removeEventListener('touchend', onTouchend);
                    frame.removeEventListener('mousemove', onTouchmove);
                    frame.removeEventListener('mousedown', onTouchstart);
                    frame.removeEventListener('mouseup', onTouchend);
                    frame.removeEventListener('mouseleave', onTouchend);
                    frame.removeEventListener('click', onClick);

                    options.window.removeEventListener('resize', onResize);

                    if (prevCtrl) {
                        prevCtrl.removeEventListener('click', prev);
                    }

                    if (nextCtrl) {
                        nextCtrl.removeEventListener('click', next);
                    }

                    // remove cloned slides if infinite is set
                    if (options.infinite) {
                        Array.apply(null, Array(options.infinite)).forEach(function () {
                            slideContainer.removeChild(slideContainer.firstChild);
                            slideContainer.removeChild(slideContainer.lastChild);
                        });
                    }

                    dispatchSliderEvent('after', 'destroy');
                }

                // event handling

                var touchOffset = void 0;
                var delta = void 0;
                var isScrolling = void 0;

                function onTransitionEnd() {
                    if (transitionEndCallback) {
                        transitionEndCallback();

                        transitionEndCallback = undefined;
                    }
                }

                function onTouchstart(event) {
                    var _options6 = options,
                        enableMouseEvents = _options6.enableMouseEvents;

                    var touches = event.touches ? event.touches[0] : event;

                    if (enableMouseEvents) {
                        frame.addEventListener('mousemove', onTouchmove);
                        frame.addEventListener('mouseup', onTouchend);
                        frame.addEventListener('mouseleave', onTouchend);
                    }

                    frame.addEventListener('touchmove', onTouchmove, touchEventParams);
                    frame.addEventListener('touchend', onTouchend);

                    var pageX = touches.pageX,
                        pageY = touches.pageY;

                    touchOffset = {
                        x: pageX,
                        y: pageY,
                        time: Date.now()
                    };

                    isScrolling = undefined;

                    delta = {};

                    dispatchSliderEvent('on', 'touchstart', {
                        event: event
                    });
                }

                function onTouchmove(event) {
                    var touches = event.touches ? event.touches[0] : event;
                    var pageX = touches.pageX,
                        pageY = touches.pageY;

                    delta = {
                        x: pageX - touchOffset.x,
                        y: pageY - touchOffset.y
                    };

                    if (typeof isScrolling === 'undefined') {
                        isScrolling = !!(isScrolling || Math.abs(delta.x) < Math.abs(delta.y));
                    }

                    if (!isScrolling && touchOffset) {
                        translate(position.x + delta.x, 0, null);
                    }

                    // may be
                    dispatchSliderEvent('on', 'touchmove', {
                        event: event
                    });
                }

                function onTouchend(event) {
                    /**
                     * time between touchstart and touchend in milliseconds
                     * @duration {number}
                     */
                    var duration = touchOffset ? Date.now() - touchOffset.time : undefined;

                    /**
                     * is valid if:
                     *
                     * -> swipe attempt time is over 300 ms
                     * and
                     * -> swipe distance is greater than 25px
                     * or
                     * -> swipe distance is more then a third of the swipe area
                     *
                     * @isValidSlide {Boolean}
                     */
                    var isValid = Number(duration) < 300 && Math.abs(delta.x) > 25 || Math.abs(delta.x) > frameWidth / 3;

                    /**
                     * is out of bounds if:
                     *
                     * -> index is 0 and delta x is greater than 0
                     * or
                     * -> index is the last slide and delta is smaller than 0
                     *
                     * @isOutOfBounds {Boolean}
                     */
                    var isOutOfBounds = !index && delta.x > 0 || index === slides.length - 1 && delta.x < 0;

                    var direction = delta.x < 0;

                    if (!isScrolling) {
                        if (isValid && !isOutOfBounds) {
                            slide(false, direction);
                        } else {
                            translate(position.x, options.snapBackSpeed);
                        }
                    }

                    touchOffset = undefined;

                    /**
                     * remove eventlisteners after swipe attempt
                     */
                    frame.removeEventListener('touchmove', onTouchmove);
                    frame.removeEventListener('touchend', onTouchend);
                    frame.removeEventListener('mousemove', onTouchmove);
                    frame.removeEventListener('mouseup', onTouchend);
                    frame.removeEventListener('mouseleave', onTouchend);

                    dispatchSliderEvent('on', 'touchend', {
                        event: event
                    });
                }

                function onClick(event) {
                    if (delta.x) {
                        event.preventDefault();
                    }
                }

                function onResize(event) {
                    if (frameWidth !== elementWidth(frame)) {
                        reset();

                        dispatchSliderEvent('on', 'resize', {
                            event: event
                        });
                    }
                }

                // trigger initial setup
                setup();

                // expose public api
                return {
                    setup: setup,
                    reset: reset,
                    slideTo: slideTo,
                    returnIndex: returnIndex,
                    prev: prev,
                    next: next,
                    destroy: destroy
                };
            }

            /***/
        },
        /* 1 */
        /***/function (module, exports, __webpack_require__) {

            "use strict";

            Object.defineProperty(exports, "__esModule", {
                value: true
            });
            exports.default = detectPrefixes;
            /**
             * Detecting prefixes for saving time and bytes
             */
            function detectPrefixes() {
                var transform = void 0;
                var transition = void 0;
                var transitionEnd = void 0;

                (function () {
                    var el = document.createElement('_');
                    var style = el.style;

                    var prop = void 0;

                    if (style[prop = 'webkitTransition'] === '') {
                        transitionEnd = 'webkitTransitionEnd';
                        transition = prop;
                    }

                    if (style[prop = 'transition'] === '') {
                        transitionEnd = 'transitionend';
                        transition = prop;
                    }

                    if (style[prop = 'webkitTransform'] === '') {
                        transform = prop;
                    }

                    if (style[prop = 'msTransform'] === '') {
                        transform = prop;
                    }

                    if (style[prop = 'transform'] === '') {
                        transform = prop;
                    }

                    document.body.insertBefore(el, null);
                    style[transform] = 'translateX(0)';
                    document.body.removeChild(el);
                })();

                return {
                    transform: transform,
                    transition: transition,
                    transitionEnd: transitionEnd
                };
            }

            /***/
        },
        /* 2 */
        /***/function (module, exports, __webpack_require__) {

            "use strict";

            Object.defineProperty(exports, "__esModule", {
                value: true
            });
            exports.default = detectSupportsPassive;
            function detectSupportsPassive() {
                var supportsPassive = false;

                try {
                    var opts = Object.defineProperty({}, 'passive', {
                        get: function get() {
                            supportsPassive = true;
                        }
                    });

                    window.addEventListener('testPassive', null, opts);
                    window.removeEventListener('testPassive', null, opts);
                } catch (e) {}

                return supportsPassive;
            }

            /***/
        },
        /* 3 */
        /***/function (module, exports, __webpack_require__) {

            "use strict";

            Object.defineProperty(exports, "__esModule", {
                value: true
            });
            exports.default = dispatchEvent;

            var _customEvent = __webpack_require__(4);

            var _customEvent2 = _interopRequireDefault(_customEvent);

            function _interopRequireDefault(obj) {
                return obj && obj.__esModule ? obj : { default: obj };
            }

            /**
             * dispatch custom events
             *
             * @param  {element} el         slideshow element
             * @param  {string}  type       custom event name
             * @param  {object}  detail     custom detail information
             */
            function dispatchEvent(target, type, detail) {
                var event = new _customEvent2.default(type, {
                    bubbles: true,
                    cancelable: true,
                    detail: detail
                });

                target.dispatchEvent(event);
            }

            /***/
        },
        /* 4 */
        /***/function (module, exports, __webpack_require__) {

            /* WEBPACK VAR INJECTION */(function (global) {
                var NativeCustomEvent = global.CustomEvent;

                function useNative() {
                    try {
                        var p = new NativeCustomEvent('cat', { detail: { foo: 'bar' } });
                        return 'cat' === p.type && 'bar' === p.detail.foo;
                    } catch (e) {}
                    return false;
                }

                /**
                 * Cross-browser `CustomEvent` constructor.
                 *
                 * https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent.CustomEvent
                 *
                 * @public
                 */

                module.exports = useNative() ? NativeCustomEvent :

                // IE >= 9
                'undefined' !== typeof document && 'function' === typeof document.createEvent ? function CustomEvent(type, params) {
                    var e = document.createEvent('CustomEvent');
                    if (params) {
                        e.initCustomEvent(type, params.bubbles, params.cancelable, params.detail);
                    } else {
                        e.initCustomEvent(type, false, false, void 0);
                    }
                    return e;
                } :

                // IE <= 8
                function CustomEvent(type, params) {
                    var e = document.createEventObject();
                    e.type = type;
                    if (params) {
                        e.bubbles = Boolean(params.bubbles);
                        e.cancelable = Boolean(params.cancelable);
                        e.detail = params.detail;
                    } else {
                        e.bubbles = false;
                        e.cancelable = false;
                        e.detail = void 0;
                    }
                    return e;
                };

                /* WEBPACK VAR INJECTION */
            }).call(exports, __webpack_require__(5));

            /***/
        },
        /* 5 */
        /***/function (module, exports) {

            var g;

            // This works in non-strict mode
            g = function () {
                return this;
            }();

            try {
                // This works if eval is allowed (see CSP)
                g = g || Function("return this")() || (1, eval)("this");
            } catch (e) {
                // This works if the window reference is available
                if ((typeof window === 'undefined' ? 'undefined' : _typeof(window)) === "object") g = window;
            }

            // g can still be undefined, but nothing to do about it...
            // We return undefined, instead of nothing here, so it's
            // easier to handle this case. if(!global) { ...}

            module.exports = g;

            /***/
        },
        /* 6 */
        /***/function (module, exports, __webpack_require__) {

            "use strict";

            Object.defineProperty(exports, "__esModule", {
                value: true
            });
            exports.default = {
                /**
                 * slides scrolled at once
                 * @slidesToScroll {Number}
                 */
                slidesToScroll: 1,

                /**
                 * time in milliseconds for the animation of a valid slide attempt
                 * @slideSpeed {Number}
                 */
                slideSpeed: 300,

                /**
                 * time in milliseconds for the animation of the rewind after the last slide
                 * @rewindSpeed {Number}
                 */
                rewindSpeed: 600,

                /**
                 * time for the snapBack of the slider if the slide attempt was not valid
                 * @snapBackSpeed {Number}
                 */
                snapBackSpeed: 200,

                /**
                 * Basic easing functions: https://developer.mozilla.org/de/docs/Web/CSS/transition-timing-function
                 * cubic bezier easing functions: http://easings.net/de
                 * @ease {String}
                 */
                ease: 'ease',

                /**
                 * if slider reached the last slide, with next click the slider goes back to the startindex.
                 * use infinite or rewind, not both
                 * @rewind {Boolean}
                 */
                rewind: false,

                /**
                 * number of visible slides or false
                 * use infinite or rewind, not both
                 * @infinite {number}
                 */
                infinite: false,

                /**
                 * the slide index to show when the slider is initialized.
                 * @initialIndex {number}
                 */
                initialIndex: 0,

                /**
                 * class name for slider frame
                 * @classNameFrame {string}
                 */
                classNameFrame: 'js_frame',

                /**
                 * class name for slides container
                 * @classNameSlideContainer {string}
                 */
                classNameSlideContainer: 'js_slides',

                /**
                 * class name for slider prev control
                 * @classNamePrevCtrl {string}
                 */
                classNamePrevCtrl: 'js_prev',

                /**
                 * class name for slider next control
                 * @classNameNextCtrl {string}
                 */
                classNameNextCtrl: 'js_next',

                /**
                 * class name for current active slide
                 * if emptyString then no class is set
                 * @classNameActiveSlide {string}
                 */
                classNameActiveSlide: 'active',

                /**
                 * enables mouse events for swiping on desktop devices
                 * @enableMouseEvents {boolean}
                 */
                enableMouseEvents: false,

                /**
                 * window instance
                 * @window {object}
                 */
                window: typeof window !== 'undefined' ? window : null,

                /**
                 * If false, slides lory to the first slide on window resize.
                 * @rewindOnResize {boolean}
                 */
                rewindOnResize: true
            };

            /***/
        },
        /* 7 */
        /***/function (module, exports, __webpack_require__) {

            module.exports = __webpack_require__(0);

            /***/
        }]
        /******/)
    );
});

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(112)(module)))

/***/ }),

/***/ 124:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var LoryAutoplay = function LoryAutoplay() {};

LoryAutoplay.prototype.init = function (slider, interval) {
	this.slider = slider;
	this.interval = interval;
	this.isPlaying = true;
	this.startAnimating(interval);
};

LoryAutoplay.prototype.destroy = function () {
	this.resetTimer.apply(this);
	this.isPlaying = false;
};

// begin animation (autoplay)
LoryAutoplay.prototype.startAnimating = function () {
	this.then = Date.now();
	this.animate.apply(this);
};

// animate (autoplay)
LoryAutoplay.prototype.animate = function () {
	var now = Date.now();
	var self = this;

	window.requestAnimationFrame(this.animate.bind(self));
	this.elapsed = now - this.then;

	if (this.elapsed > this.interval && this.isPlaying) {
		this.then = now - this.elapsed % this.interval;
		this.slider.next();
	}
};

// reset timer
LoryAutoplay.prototype.resetTimer = function () {
	var now = Date.now();
	this.elapsed = now - this.then;
	this.then = now - this.elapsed % this.interval;
};

module.exports = LoryAutoplay;

/***/ }),

/***/ 125:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _VimeoVideo = __webpack_require__(126);

var _VimeoVideo2 = _interopRequireDefault(_VimeoVideo);

var _YoutubeVideo = __webpack_require__(127);

var _YoutubeVideo2 = _interopRequireDefault(_YoutubeVideo);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var videoElement = null;
var contentElement = null;
var player = null;
var scrollTop = 0;

function handleCloseButtonClick(event) {
    closeVideo();
}

function handleLoad(event) {
    closeVideoElement();

    videoElement.classList.remove("case-study-video-opened");
    videoElement.classList.remove("case-study-video-loading");

    window.removeEventListener("load", handleLoad, false);
    window.addEventListener("scroll", handleScroll, false);
}

function handleOpenButtonClick(event) {
    scrollTop = document.documentElement.scrollTop;

    scrollToTop();
    openVideo();
}

function handleResize(event) {
    if (isMobile()) {
        closeVideoElement();
    } else if (videoElement.classList.contains("case-study-video-opened")) {
        openVideoElement();
    } else {
        closeVideoElement();
    }
}

function handleScroll(event) {
    if (isMobile()) {
        return;
    }

    var MIN_SCROLL = 50;

    if (document.documentElement.scrollTop - scrollTop > MIN_SCROLL && videoElement.classList.contains("case-study-video-opened")) {
        closeVideo();
        scrollTop = 0;
    }
}

function handleTransitionEnd(event) {
    if (event.target === contentElement && videoElement.classList.contains("case-study-video-opened")) {
        openVideoIframe();
    }
}

function handleVideoEnded() {
    closeVideo();
}

function handleVideoReady() {
    contentElement = videoElement.querySelector(".case-study-video-content-foreground");
    contentElement.addEventListener("transitionend", handleTransitionEnd, false);

    var openButtonElement = document.getElementById("play-button");
    openButtonElement.addEventListener("click", handleOpenButtonClick, false);

    var closeButtonElement = document.getElementById("close-button");
    closeButtonElement.addEventListener("click", handleCloseButtonClick, false);
}

function closeVideo() {
    closeVideoElement();

    videoElement.querySelector("iframe").classList.remove("opened");
    videoElement.classList.remove("case-study-video-opened");
    player.stop();
}

function closeVideoElement() {
    videoElement.style.minHeight = "";
}

function isMobile() {
    return window.matchMedia("(max-width: 767px)").matches;
}

function isTablet() {
    return window.matchMedia("(min-width: 768px) and (max-width: 1024px)").matches;
}

function openVideo() {
    openVideoElement();

    videoElement.classList.add("case-study-video-opened");
    player.play();

    if (isMobile()) {
        openVideoIframe();
    }
}

function openVideoIframe() {
    videoElement.querySelector("iframe").classList.add("opened");
}

function openVideoElement() {
    if (isMobile()) {
        videoElement.style.minHeight = "";
    } else if (isTablet()) {
        videoElement.style.minHeight = window.innerHeight - 60 + "px";
    } else {
        videoElement.style.minHeight = window.innerHeight - 90 + "px";
    }
}

function scrollToTop() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}

function init() {
    videoElement = document.querySelector(".case-study-video");

    if (!videoElement) {
        return;
    }

    var youtubePlayerElement = videoElement.querySelector(".case-study-video__player--youtube");
    var vimeoPlayerElement = videoElement.querySelector(".case-study-video__player--vimeo");

    if (!(youtubePlayerElement || vimeoPlayerElement)) {
        return;
    }

    openVideoElement();

    var props = {
        handleVideoEnded: handleVideoEnded,
        handleVideoReady: handleVideoReady
    };

    if (youtubePlayerElement) {
        player = new _YoutubeVideo2.default(props);
        player.init(youtubePlayerElement.id);
    } else if (vimeoPlayerElement) {
        player = new _VimeoVideo2.default(props);
        player.init(vimeoPlayerElement.id);
    }

    window.addEventListener("load", handleLoad, false);
    window.addEventListener("resize", handleResize, false);
}

module.exports = {
    init: init
};

/***/ }),

/***/ 126:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var VimeoVideo = function () {
    function VimeoVideo(props) {
        _classCallCheck(this, VimeoVideo);

        this._props = props || {};
        this._player = null;
        this._videoEnded = false;
    }

    _createClass(VimeoVideo, [{
        key: "init",
        value: function init(playerId) {
            var _this = this;

            var iframe = document.getElementById(playerId);
            this._player = new window.Vimeo.Player(iframe);

            this._player.ready().then(function () {
                if (_this._props.handleVideoReady) {
                    _this._props.handleVideoReady();
                }
            });

            this._player.on("pause", function (event) {
                if (event.percent === 1 && !_this._videoEnded) {
                    _this._videoEnded = true;

                    if (_this._props.handleVideoEnded) {
                        _this._props.handleVideoEnded();
                    }
                }
            });
        }
    }, {
        key: "play",
        value: function play() {
            if (this._player) {
                this._videoEnded = false;
                this._player.play();
            }
        }
    }, {
        key: "stop",
        value: function stop() {
            if (this._player) {
                this._videoEnded = true;
                this._player.unload();
            }
        }
    }]);

    return VimeoVideo;
}();

exports.default = VimeoVideo;

/***/ }),

/***/ 127:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var YoutubeVideo = function () {
    function YoutubeVideo(props) {
        _classCallCheck(this, YoutubeVideo);

        this._onPlayerReady = this._onPlayerReady.bind(this);
        this._onPlayerStateChange = this._onPlayerStateChange.bind(this);

        this._props = props || {};
        this._player = null;
    }

    _createClass(YoutubeVideo, [{
        key: "_onPlayerReady",
        value: function _onPlayerReady() {
            this._player.setPlaybackQuality("highres");

            if (this._props.handleVideoReady) {
                this._props.handleVideoReady();
            }
        }
    }, {
        key: "_onPlayerStateChange",
        value: function _onPlayerStateChange(event) {
            if (event.data === 0) {
                if (this._props.handleVideoEnded) {
                    this._props.handleVideoEnded();
                }
            }
        }
    }, {
        key: "init",
        value: function init(playerId) {
            var _this = this;

            var tag = document.createElement("script");
            tag.src = "https://www.youtube.com/iframe_api";

            var firstScriptTag = document.getElementsByTagName("script")[0];
            firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

            window.onYouTubeIframeAPIReady = function () {
                _this._player = new YT.Player(playerId, {
                    videoId: playerId.replace("youtube-video-", ""),

                    events: {
                        "onReady": _this._onPlayerReady,
                        "onStateChange": _this._onPlayerStateChange
                    }
                });
            };
        }
    }, {
        key: "play",
        value: function play() {
            if (this._player) {
                this._player.playVideo();
            }
        }
    }, {
        key: "stop",
        value: function stop() {
            if (this._player) {
                this._player.stopVideo();
            }
        }
    }]);

    return YoutubeVideo;
}();

exports.default = YoutubeVideo;

/***/ }),

/***/ 129:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var View = function () {
    function View() {
        _classCallCheck(this, View);

        if (View._constructor) {
            throw new Error("Use View.getInstance() to get View's instance.");
        }

        this._onWindowRsize = this._onWindowRsize.bind(this);

        this._desktop = false;
        this._desktopMini = false;
        this._desktopSmall = false;
        this._desktopBase = false;
        this._phone = false;
        this._tablet = false;
        this._landscape = false;

        this._html = document.querySelector("html");

        window.addEventListener("resize", this._onWindowRsize, false);

        this._resize();
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //
    //  Public methods
    //
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    _createClass(View, [{
        key: "isDesktop",
        value: function isDesktop() {
            return this._desktop;
        }
    }, {
        key: "isDesktopMini",
        value: function isDesktopMini() {
            return this._desktopMini;
        }
    }, {
        key: "isDesktopSmall",
        value: function isDesktopSmall() {
            return this._desktopSmall;
        }
    }, {
        key: "isDesktopBase",
        value: function isDesktopBase() {
            return this._desktopBase;
        }
    }, {
        key: "isLandscape",
        value: function isLandscape() {
            return this._landscape;
        }
    }, {
        key: "isMobile",
        value: function isMobile() {
            return this._phone || this._tablet;
        }
    }, {
        key: "isPhone",
        value: function isPhone() {
            return this._phone;
        }
    }, {
        key: "isPortrait",
        value: function isPortrait() {
            return !this._landscape;
        }
    }, {
        key: "isTablet",
        value: function isTablet() {
            return this._tablet;
        }

        ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        //
        //  Private methods
        //
        ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    }, {
        key: "_resize",
        value: function _resize() {
            this._desktop = window.matchMedia("(min-width: 1025px)").matches;
            this._desktopMini = window.matchMedia("(min-width: 1025px) and (max-width: 1279px)").matches;
            this._desktopSmall = window.matchMedia("(min-width: 1025px) and (max-width: 1440px)").matches;
            this._desktopBase = window.matchMedia("(min-width: 1280px)").matches;
            this._phone = window.matchMedia("(max-width: 767px)").matches;
            this._tablet = window.matchMedia("(min-width: 768px) and (max-width: 1024px)").matches;
            this._landscape = window.innerWidth >= window.innerHeight;

            var orientationChanged = !(this._landscape && this._html.classList.contains("landscape") || !this._landscape && this._html.classList.contains("portrait"));

            if (orientationChanged) {
                this._html.classList.remove("landscape");
                this._html.classList.remove("portrait");

                this._html.classList.add(this._landscape ? "landscape" : "portrait");
            }
        }

        ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        //
        //  Event listeners
        //
        ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    }, {
        key: "_onWindowRsize",
        value: function _onWindowRsize(e) {
            this._resize();
        }
    }]);

    return View;
}();

View._constructor = true;
View._instance = null;

View.getInstance = function () {
    if (!View._instance) {
        View._constructor = false;
        View._instance = new View();
        View._constructor = true;
    }

    return View._instance;
};

exports.default = View;

/***/ }),

/***/ 133:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Module dependencies.
 * @private
 */

var _importsLoaderGlobalWindowLory = __webpack_require__(122);

var toggleMouseEvent = __webpack_require__(114);
var footer = __webpack_require__(113);
var player, playBtn;
var common = __webpack_require__(83);

var LoryAutoplay = __webpack_require__(124);
var caseStudyVideo = __webpack_require__(125);

common.init();
toggleMouseEvent.init();
footer.init();
caseStudyVideo.init();

var slider = document.querySelector(".js_slider");

if (slider) {
    var lorySlider = (0, _importsLoaderGlobalWindowLory.lory)(slider, {
        infinite: 1,
        enableMouseEvents: true
    });

    var autoplay = new LoryAutoplay();
    var startAutoplay = autoplay.init.bind(autoplay, lorySlider, 3000);
    startAutoplay();

    slider.addEventListener("mouseout", function () {
        startAutoplay();
    });

    slider.addEventListener("mouseover", function () {
        autoplay.destroy();
    });
}

/***/ }),

/***/ 14:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * @public
 * @type {Object}
 */

module.exports = {
	isBlendMode: function isBlendMode() {
		if ('CSS' in window && 'supports' in window.CSS) {
			return window.CSS.supports('mix-blend-mode', 'overlay');
		}
		return false;
	},

	isMac: function isMac() {
		return navigator.platform.toUpperCase().indexOf('MAC') > -1;
	},

	isSafari: function isSafari() {
		var ua = navigator.userAgent.toLowerCase();
		return ua.indexOf('safari') != -1 && ua.indexOf('chrome') < 0;
	},

	isAndroid: function isAndroid() {
		return navigator.userAgent.match(/Android/i);
	},

	isBlackBerry: function isBlackBerry() {
		return navigator.userAgent.match(/BlackBerry/i);
	},

	isiOS: function isiOS() {
		return navigator.userAgent.match(/iPhone|iPad|iPod/i) && !window.MSStream;
	},

	isOpera: function isOpera() {
		return navigator.userAgent.match(/Opera Mini/i);
	},

	isWindows: function isWindows() {
		return navigator.userAgent.match(/IEMobile/i);
	},

	isTouch: function isTouch() {
		return this.isAndroid() || this.isBlackBerry() || this.isiOS() || this.isOpera() || this.isWindows();
	}
};

/***/ }),

/***/ 15:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {

var utils = __webpack_require__(0);
var normalizeHeaderName = __webpack_require__(56);
var AxiosError = __webpack_require__(2);
var transitionalDefaults = __webpack_require__(24);
var toFormData = __webpack_require__(25);

var DEFAULT_CONTENT_TYPE = {
  'Content-Type': 'application/x-www-form-urlencoded'
};

function setContentTypeIfUnset(headers, value) {
  if (!utils.isUndefined(headers) && utils.isUndefined(headers['Content-Type'])) {
    headers['Content-Type'] = value;
  }
}

function getDefaultAdapter() {
  var adapter;
  if (typeof XMLHttpRequest !== 'undefined') {
    // For browsers use XHR adapter
    adapter = __webpack_require__(26);
  } else if (typeof process !== 'undefined' && Object.prototype.toString.call(process) === '[object process]') {
    // For node use HTTP adapter
    adapter = __webpack_require__(26);
  }
  return adapter;
}

function stringifySafely(rawValue, parser, encoder) {
  if (utils.isString(rawValue)) {
    try {
      (parser || JSON.parse)(rawValue);
      return utils.trim(rawValue);
    } catch (e) {
      if (e.name !== 'SyntaxError') {
        throw e;
      }
    }
  }

  return (encoder || JSON.stringify)(rawValue);
}

var defaults = {

  transitional: transitionalDefaults,

  adapter: getDefaultAdapter(),

  transformRequest: [function transformRequest(data, headers) {
    normalizeHeaderName(headers, 'Accept');
    normalizeHeaderName(headers, 'Content-Type');

    if (utils.isFormData(data) || utils.isArrayBuffer(data) || utils.isBuffer(data) || utils.isStream(data) || utils.isFile(data) || utils.isBlob(data)) {
      return data;
    }
    if (utils.isArrayBufferView(data)) {
      return data.buffer;
    }
    if (utils.isURLSearchParams(data)) {
      setContentTypeIfUnset(headers, 'application/x-www-form-urlencoded;charset=utf-8');
      return data.toString();
    }

    var isObjectPayload = utils.isObject(data);
    var contentType = headers && headers['Content-Type'];

    var isFileList;

    if ((isFileList = utils.isFileList(data)) || isObjectPayload && contentType === 'multipart/form-data') {
      var _FormData = this.env && this.env.FormData;
      return toFormData(isFileList ? { 'files[]': data } : data, _FormData && new _FormData());
    } else if (isObjectPayload || contentType === 'application/json') {
      setContentTypeIfUnset(headers, 'application/json');
      return stringifySafely(data);
    }

    return data;
  }],

  transformResponse: [function transformResponse(data) {
    var transitional = this.transitional || defaults.transitional;
    var silentJSONParsing = transitional && transitional.silentJSONParsing;
    var forcedJSONParsing = transitional && transitional.forcedJSONParsing;
    var strictJSONParsing = !silentJSONParsing && this.responseType === 'json';

    if (strictJSONParsing || forcedJSONParsing && utils.isString(data) && data.length) {
      try {
        return JSON.parse(data);
      } catch (e) {
        if (strictJSONParsing) {
          if (e.name === 'SyntaxError') {
            throw AxiosError.from(e, AxiosError.ERR_BAD_RESPONSE, this, null, this.response);
          }
          throw e;
        }
      }
    }

    return data;
  }],

  /**
   * A timeout in milliseconds to abort a request. If set to 0 (default) a
   * timeout is not created.
   */
  timeout: 0,

  xsrfCookieName: 'XSRF-TOKEN',
  xsrfHeaderName: 'X-XSRF-TOKEN',

  maxContentLength: -1,
  maxBodyLength: -1,

  env: {
    FormData: __webpack_require__(68)
  },

  validateStatus: function validateStatus(status) {
    return status >= 200 && status < 300;
  },

  headers: {
    common: {
      'Accept': 'application/json, text/plain, */*'
    }
  }
};

utils.forEach(['delete', 'get', 'head'], function forEachMethodNoData(method) {
  defaults.headers[method] = {};
});

utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  defaults.headers[method] = utils.merge(DEFAULT_CONTENT_TYPE);
});

module.exports = defaults;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(12)))

/***/ }),

/***/ 16:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Module dependencies.
 * @private
 */

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var Handlers = __webpack_require__(7);
var viewport = __webpack_require__(20);
var googleAnalytics = __webpack_require__(3);
var popup = __webpack_require__(103);
var RequestEstimateForm = __webpack_require__(44);
var RequestAdviserForm = __webpack_require__(45);
var scrollBlocker = __webpack_require__(10);

/**
 * @private
 */
var isInit = false;
var DOM = {};
var handlers = new Handlers();
var _isShow = false;
var delay = 0;
var requestEstimateForm = new RequestEstimateForm();
var requestAdviserForm = new RequestAdviserForm();
var selectorHide = "";

/**
 * @public
 * @type {Object}
 */
module.exports = {
	init: function init() {
		!isInit && _init();
	},
	show: show,
	hide: hide,
	getDOM: getDOM,
	on: handlers.add.bind(handlers),
	off: handlers.remove.bind(handlers),
	isShow: function isShow() {
		return _isShow;
	}
};

/**
 * @private
 * @type {Function}
 */
function _init() {
	isInit = true;
	popup.init();
	setDOM();
	setSelectorHide();
	setDelay();
	requestEstimateForm.init(DOM.requestEstimate);
	requestAdviserForm.init(DOM.requestAdviser);
	initHandlers();
}

/**
 * @private
 * @type {Function}
 */
function setDOM() {
	DOM.requestEstimate = document.querySelector(".js-request_estimate");
	DOM.requestAdviser = document.querySelector(".js-request_estimate .js-request_success-adviser");
	DOM.requestEstimateContainer = DOM.requestEstimate.querySelector(".js-request_estimate_container");
}

/**
 * @private
 */
function setSelectorHide() {
	if (!_isShow) {
		if (viewport.isDesktop()) {
			selectorHide = "g-hidden";
			DOM.requestEstimate.classList.remove("g-hide");
		} else {
			selectorHide = "g-hide";
			DOM.requestEstimate.classList.remove("g-hidden");
		}

		DOM.requestEstimate.classList.add(selectorHide);
	}
}

/**
 * @private
 */
function setDelay() {
	delay = viewport.isMobile() ? 0 : 300;
}

/**
 * @private
 * @type {Function}
 */
function getDOM() {
	return DOM.requestEstimate;
}

/**
 * @private
 */
function initHandlers() {
	window.addEventListener('resize', onWinResize);

	popup.on("close", hide);

	if (DOM.requestEstimateContainer) {
		DOM.requestEstimateContainer.addEventListener("click", function (e) {
			if (e.target.classList.contains("js-request_estimate_container")) {
				hide();
			}
		});
	}

	requestAdviserForm.on('done', hide);

	var emailLink = document.querySelectorAll(".l-mail-link.b-request_estimate_mail_link");

	if (emailLink) {
		for (var i = 0; i < emailLink.length; i++) {
			var link = emailLink[i];
			link.addEventListener("click", sendGoogleAnalyticsEvent);
		}
	}
}

/**
 * @private
 */
function onWinResize() {
	setSelectorHide();
	setDelay();
}

/**
 * @private
 */
function sendGoogleAnalyticsEvent() {
	googleAnalytics.sendEvent({
		eventCategory: "request",
		eventAction: "email",
		eventLabel: "form"
	});
}

/**
 * @private
 */
function changeFormText(element) {
	var defaultTitle = "Request a Project Estimation";
	var defaultButton = "Send Request";

	if ((typeof element === "undefined" ? "undefined" : _typeof(element)) === "object") {
		_setFormTitle(element.dataset.estimateTitle ? element.dataset.estimateTitle : defaultTitle);
		_setFormButton(element.dataset.estimateButton ? element.dataset.estimateButton : defaultButton);
	} else {
		_setFormTitle(defaultTitle);
		_setFormButton(defaultButton);
	}
}

/**
 * @private
 */
function show(element) {
	if (!_isShow) {
		_isShow = true;
		DOM.requestEstimate.classList.remove(selectorHide);
		changeFormText(element);
		scrollBlocker.scrollOff();
		setTimeout(function () {
			handlers.call("beforeShow");
			DOM.requestEstimate.classList.add("active");
			requestEstimateForm.onShow();

			handlers.call("show");
		}, delay);
	}
}

/**
 * @private
 */
function hide() {
	if (_isShow) {
		_isShow = false;
		DOM.requestEstimate.classList.remove("active");
		requestAdviserForm.clearForm();
		setTimeout(function () {
			handlers.call("beforeHide");
			DOM.requestEstimate.classList.add(selectorHide);
			requestEstimateForm.onHide();
			handlers.call("hide");

			if (requestEstimateForm.isFormStepFirst()) {
				requestEstimateForm.setTitle("Request a Project Estimation");
				requestEstimateForm.hideResult();
			}
		}, delay);

		_gaq.push(["_trackEvent", "popupClose", "click"]);
	}
}

/**
 * @private
 */
function _setFormTitle(title) {
	DOM.requestEstimate.querySelector(".b-request_title span").innerHTML = title;
}

/**
 * @private
 */
function _setFormButton(value) {
	DOM.requestEstimate.querySelector(".js-request_submit input").value = value;
}

/***/ }),

/***/ 17:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

module.exports = function (it) {
  return (typeof it === 'undefined' ? 'undefined' : _typeof(it)) === 'object' ? it !== null : typeof it === 'function';
};

/***/ }),

/***/ 1727:
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(123);
module.exports = __webpack_require__(1728);


/***/ }),

/***/ 1728:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(121);

__webpack_require__(1729);

__webpack_require__(133);

__webpack_require__(1730);

/***/ }),

/***/ 1729:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 1730:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(287);

__webpack_require__(1731);
__webpack_require__(1732);
__webpack_require__(1733);
__webpack_require__(744);


__webpack_require__(230);

/***/ }),

/***/ 1731:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/*!
 * GSAP 3.7.1
 * https://greensock.com
 * 
 * @license Copyright 2021, GreenSock. All rights reserved.
 * Subject to the terms at https://greensock.com/standard-license or for Club GreenSock members, the agreement issued with that membership.
 * @author: Jack Doyle, jack@greensock.com
 */

!function (t, e) {
  "object" == ( false ? "undefined" : _typeof(exports)) && "undefined" != typeof module ? e(exports) :  true ? !(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports], __WEBPACK_AMD_DEFINE_FACTORY__ = (e),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) : e((t = t || self).window = t.window || {});
}(undefined, function (e) {
  "use strict";
  function _inheritsLoose(t, e) {
    t.prototype = Object.create(e.prototype), (t.prototype.constructor = t).__proto__ = e;
  }function _assertThisInitialized(t) {
    if (void 0 === t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t;
  }function o(t) {
    return "string" == typeof t;
  }function p(t) {
    return "function" == typeof t;
  }function q(t) {
    return "number" == typeof t;
  }function r(t) {
    return void 0 === t;
  }function s(t) {
    return "object" == (typeof t === "undefined" ? "undefined" : _typeof(t));
  }function t(t) {
    return !1 !== t;
  }function u() {
    return "undefined" != typeof window;
  }function v(t) {
    return p(t) || o(t);
  }function M(t) {
    return (h = mt(t, ot)) && oe;
  }function N(t, e) {
    return console.warn("Invalid property", t, "set to", e, "Missing plugin? gsap.registerPlugin()");
  }function O(t, e) {
    return !e && console.warn(t);
  }function P(t, e) {
    return t && (ot[t] = e) && h && (h[t] = e) || ot;
  }function Q() {
    return 0;
  }function $(t) {
    var e,
        r,
        i = t[0];if (s(i) || p(i) || (t = [t]), !(e = (i._gsap || {}).harness)) {
      for (r = pt.length; r-- && !pt[r].targetTest(i);) {}e = pt[r];
    }for (r = t.length; r--;) {
      t[r] && (t[r]._gsap || (t[r]._gsap = new Lt(t[r], e))) || t.splice(r, 1);
    }return t;
  }function _(t) {
    return t._gsap || $(xt(t))[0]._gsap;
  }function aa(t, e, i) {
    return (i = t[e]) && p(i) ? t[e]() : r(i) && t.getAttribute && t.getAttribute(e) || i;
  }function ba(t, e) {
    return (t = t.split(",")).forEach(e) || t;
  }function ca(t) {
    return Math.round(1e5 * t) / 1e5 || 0;
  }function da(t, e) {
    for (var r = e.length, i = 0; t.indexOf(e[i]) < 0 && ++i < r;) {}return i < r;
  }function ea() {
    var t,
        e,
        r = ht.length,
        i = ht.slice(0);for (lt = {}, t = ht.length = 0; t < r; t++) {
      (e = i[t]) && e._lazy && (e.render(e._lazy[0], e._lazy[1], !0)._lazy = 0);
    }
  }function fa(t, e, r, i) {
    ht.length && ea(), t.render(e, r, i), ht.length && ea();
  }function ga(t) {
    var e = parseFloat(t);return (e || 0 === e) && (t + "").match(at).length < 2 ? e : o(t) ? t.trim() : t;
  }function ha(t) {
    return t;
  }function ia(t, e) {
    for (var r in e) {
      r in t || (t[r] = e[r]);
    }return t;
  }function ja(t, e) {
    for (var r in e) {
      r in t || "duration" === r || "ease" === r || (t[r] = e[r]);
    }
  }function la(t, e) {
    for (var r in e) {
      "__proto__" !== r && "constructor" !== r && "prototype" !== r && (t[r] = s(e[r]) ? la(t[r] || (t[r] = {}), e[r]) : e[r]);
    }return t;
  }function ma(t, e) {
    var r,
        i = {};for (r in t) {
      r in e || (i[r] = t[r]);
    }return i;
  }function na(e) {
    var r = e.parent || R,
        i = e.keyframes ? ja : ia;if (t(e.inherit)) for (; r;) {
      i(e, r.vars.defaults), r = r.parent || r._dp;
    }return e;
  }function qa(t, e, r, i) {
    void 0 === r && (r = "_first"), void 0 === i && (i = "_last");var n = e._prev,
        a = e._next;n ? n._next = a : t[r] === e && (t[r] = a), a ? a._prev = n : t[i] === e && (t[i] = n), e._next = e._prev = e.parent = null;
  }function ra(t, e) {
    !t.parent || e && !t.parent.autoRemoveChildren || t.parent.remove(t), t._act = 0;
  }function sa(t, e) {
    if (t && (!e || e._end > t._dur || e._start < 0)) for (var r = t; r;) {
      r._dirty = 1, r = r.parent;
    }return t;
  }function va(t) {
    return t._repeat ? gt(t._tTime, t = t.duration() + t._rDelay) * t : 0;
  }function xa(t, e) {
    return (t - e._start) * e._ts + (0 <= e._ts ? 0 : e._dirty ? e.totalDuration() : e._tDur);
  }function ya(t) {
    return t._end = ca(t._start + (t._tDur / Math.abs(t._ts || t._rts || U) || 0));
  }function za(t, e) {
    var r = t._dp;return r && r.smoothChildTiming && t._ts && (t._start = ca(r._time - (0 < t._ts ? e / t._ts : ((t._dirty ? t.totalDuration() : t._tDur) - e) / -t._ts)), ya(t), r._dirty || sa(r, t)), t;
  }function Aa(t, e) {
    var r;if ((e._time || e._initted && !e._dur) && (r = xa(t.rawTime(), e), (!e._dur || Tt(0, e.totalDuration(), r) - e._tTime > U) && e.render(r, !0)), sa(t, e)._dp && t._initted && t._time >= t._dur && t._ts) {
      if (t._dur < t.duration()) for (r = t; r._dp;) {
        0 <= r.rawTime() && r.totalTime(r._tTime), r = r._dp;
      }t._zTime = -U;
    }
  }function Ba(t, e, r, i) {
    return e.parent && ra(e), e._start = ca((q(r) ? r : r || t !== R ? bt(t, r, e) : t._time) + e._delay), e._end = ca(e._start + (e.totalDuration() / Math.abs(e.timeScale()) || 0)), function _addLinkedListItem(t, e, r, i, n) {
      void 0 === r && (r = "_first"), void 0 === i && (i = "_last");var a,
          s = t[i];if (n) for (a = e[n]; s && s[n] > a;) {
        s = s._prev;
      }s ? (e._next = s._next, s._next = e) : (e._next = t[r], t[r] = e), e._next ? e._next._prev = e : t[i] = e, e._prev = s, e.parent = e._dp = t;
    }(t, e, "_first", "_last", t._sort ? "_start" : 0), vt(e) || (t._recent = e), i || Aa(t, e), t;
  }function Ca(t, e) {
    return (ot.ScrollTrigger || N("scrollTrigger", e)) && ot.ScrollTrigger.create(e, t);
  }function Da(t, e, r, i) {
    return Ut(t, e), t._initted ? !r && t._pt && (t._dur && !1 !== t.vars.lazy || !t._dur && t.vars.lazy) && f !== St.frame ? (ht.push(t), t._lazy = [e, i], 1) : void 0 : 1;
  }function Ia(t, e, r, i) {
    var n = t._repeat,
        a = ca(e) || 0,
        s = t._tTime / t._tDur;return s && !i && (t._time *= a / t._dur), t._dur = a, t._tDur = n ? n < 0 ? 1e10 : ca(a * (n + 1) + t._rDelay * n) : a, s && !i ? za(t, t._tTime = t._tDur * s) : t.parent && ya(t), r || sa(t.parent, t), t;
  }function Ja(t) {
    return t instanceof qt ? sa(t) : Ia(t, t._dur);
  }function Ma(e, r, i) {
    var n,
        a,
        s = q(r[1]),
        o = (s ? 2 : 1) + (e < 2 ? 0 : 1),
        u = r[o];if (s && (u.duration = r[1]), u.parent = i, e) {
      for (n = u, a = i; a && !("immediateRender" in n);) {
        n = a.vars.defaults || {}, a = t(a.vars.inherit) && a.parent;
      }u.immediateRender = t(n.immediateRender), e < 2 ? u.runBackwards = 1 : u.startAt = r[o - 1];
    }return new Qt(r[0], u, r[1 + o]);
  }function Na(t, e) {
    return t || 0 === t ? e(t) : e;
  }function Pa(t) {
    if ("string" != typeof t) return "";var e = st.exec(t);return e ? t.substr(e.index + e[0].length) : "";
  }function Sa(t, e) {
    return t && s(t) && "length" in t && (!e && !t.length || t.length - 1 in t && s(t[0])) && !t.nodeType && t !== i;
  }function Wa(t) {
    return t.sort(function () {
      return .5 - Math.random();
    });
  }function Xa(t) {
    if (p(t)) return t;var _ = s(t) ? t : { each: t },
        m = Ft(_.ease),
        g = _.from || 0,
        v = parseFloat(_.base) || 0,
        y = {},
        e = 0 < g && g < 1,
        b = isNaN(g) || e,
        T = _.axis,
        w = g,
        x = g;return o(g) ? w = x = { center: .5, edges: .5, end: 1 }[g] || 0 : !e && b && (w = g[0], x = g[1]), function (t, e, r) {
      var i,
          n,
          a,
          s,
          o,
          u,
          h,
          l,
          f,
          d = (r || _).length,
          c = y[d];if (!c) {
        if (!(f = "auto" === _.grid ? 0 : (_.grid || [1, X])[1])) {
          for (h = -X; h < (h = r[f++].getBoundingClientRect().left) && f < d;) {}f--;
        }for (c = y[d] = [], i = b ? Math.min(f, d) * w - .5 : g % f, n = b ? d * x / f - .5 : g / f | 0, l = X, u = h = 0; u < d; u++) {
          a = u % f - i, s = n - (u / f | 0), c[u] = o = T ? Math.abs("y" === T ? s : a) : G(a * a + s * s), h < o && (h = o), o < l && (l = o);
        }"random" === g && Wa(c), c.max = h - l, c.min = l, c.v = d = (parseFloat(_.amount) || parseFloat(_.each) * (d < f ? d - 1 : T ? "y" === T ? d / f : f : Math.max(f, d / f)) || 0) * ("edges" === g ? -1 : 1), c.b = d < 0 ? v - d : v, c.u = Pa(_.amount || _.each) || 0, m = m && d < 0 ? Bt(m) : m;
      }return d = (c[t] - c.min) / c.max || 0, ca(c.b + (m ? m(d) : d) * c.v) + c.u;
    };
  }function Ya(r) {
    var i = r < 1 ? Math.pow(10, (r + "").length - 2) : 1;return function (t) {
      var e = Math.round(parseFloat(t) / r) * r * i;return (e - e % 1) / i + (q(t) ? 0 : Pa(t));
    };
  }function Za(u, t) {
    var h,
        l,
        e = H(u);return !e && s(u) && (h = e = u.radius || X, u.values ? (u = xt(u.values), (l = !q(u[0])) && (h *= h)) : u = Ya(u.increment)), Na(t, e ? p(u) ? function (t) {
      return l = u(t), Math.abs(l - t) <= h ? l : t;
    } : function (t) {
      for (var e, r, i = parseFloat(l ? t.x : t), n = parseFloat(l ? t.y : 0), a = X, s = 0, o = u.length; o--;) {
        (e = l ? (e = u[o].x - i) * e + (r = u[o].y - n) * r : Math.abs(u[o] - i)) < a && (a = e, s = o);
      }return s = !h || a <= h ? u[s] : t, l || s === t || q(t) ? s : s + Pa(t);
    } : Ya(u));
  }function $a(t, e, r, i) {
    return Na(H(t) ? !e : !0 === r ? !!(r = 0) : !i, function () {
      return H(t) ? t[~~(Math.random() * t.length)] : (r = r || 1e-5) && (i = r < 1 ? Math.pow(10, (r + "").length - 2) : 1) && Math.floor(Math.round((t - r / 2 + Math.random() * (e - t + .99 * r)) / r) * r * i) / i;
    });
  }function cb(e, r, t) {
    return Na(t, function (t) {
      return e[~~r(t)];
    });
  }function fb(t) {
    for (var e, r, i, n, a = 0, s = ""; ~(e = t.indexOf("random(", a));) {
      i = t.indexOf(")", e), n = "[" === t.charAt(e + 7), r = t.substr(e + 7, i - e - 7).match(n ? at : tt), s += t.substr(a, e - a) + $a(n ? r : +r[0], n ? 0 : +r[1], +r[2] || 1e-5), a = i + 1;
    }return s + t.substr(a, t.length - a);
  }function ib(t, e, r) {
    var i,
        n,
        a,
        s = t.labels,
        o = X;for (i in s) {
      (n = s[i] - e) < 0 == !!r && n && o > (n = Math.abs(n)) && (a = i, o = n);
    }return a;
  }function kb(t) {
    return ra(t), t.scrollTrigger && t.scrollTrigger.kill(!1), t.progress() < 1 && Pt(t, "onInterrupt"), t;
  }function pb(t, e, r) {
    return (6 * (t = t < 0 ? t + 1 : 1 < t ? t - 1 : t) < 1 ? e + (r - e) * t * 6 : t < .5 ? r : 3 * t < 2 ? e + (r - e) * (2 / 3 - t) * 6 : e) * kt + .5 | 0;
  }function qb(t, e, r) {
    var i,
        n,
        a,
        s,
        o,
        u,
        h,
        l,
        f,
        d,
        c = t ? q(t) ? [t >> 16, t >> 8 & kt, t & kt] : 0 : Mt.black;if (!c) {
      if ("," === t.substr(-1) && (t = t.substr(0, t.length - 1)), Mt[t]) c = Mt[t];else if ("#" === t.charAt(0)) {
        if (t.length < 6 && (t = "#" + (i = t.charAt(1)) + i + (n = t.charAt(2)) + n + (a = t.charAt(3)) + a + (5 === t.length ? t.charAt(4) + t.charAt(4) : "")), 9 === t.length) return [(c = parseInt(t.substr(1, 6), 16)) >> 16, c >> 8 & kt, c & kt, parseInt(t.substr(7), 16) / 255];c = [(t = parseInt(t.substr(1), 16)) >> 16, t >> 8 & kt, t & kt];
      } else if ("hsl" === t.substr(0, 3)) {
        if (c = d = t.match(tt), e) {
          if (~t.indexOf("=")) return c = t.match(et), r && c.length < 4 && (c[3] = 1), c;
        } else s = +c[0] % 360 / 360, o = c[1] / 100, i = 2 * (u = c[2] / 100) - (n = u <= .5 ? u * (o + 1) : u + o - u * o), 3 < c.length && (c[3] *= 1), c[0] = pb(s + 1 / 3, i, n), c[1] = pb(s, i, n), c[2] = pb(s - 1 / 3, i, n);
      } else c = t.match(tt) || Mt.transparent;c = c.map(Number);
    }return e && !d && (i = c[0] / kt, n = c[1] / kt, a = c[2] / kt, u = ((h = Math.max(i, n, a)) + (l = Math.min(i, n, a))) / 2, h === l ? s = o = 0 : (f = h - l, o = .5 < u ? f / (2 - h - l) : f / (h + l), s = h === i ? (n - a) / f + (n < a ? 6 : 0) : h === n ? (a - i) / f + 2 : (i - n) / f + 4, s *= 60), c[0] = ~~(s + .5), c[1] = ~~(100 * o + .5), c[2] = ~~(100 * u + .5)), r && c.length < 4 && (c[3] = 1), c;
  }function rb(t) {
    var r = [],
        i = [],
        n = -1;return t.split(At).forEach(function (t) {
      var e = t.match(rt) || [];r.push.apply(r, e), i.push(n += e.length + 1);
    }), r.c = i, r;
  }function sb(t, e, r) {
    var i,
        n,
        a,
        s,
        o = "",
        u = (t + o).match(At),
        h = e ? "hsla(" : "rgba(",
        l = 0;if (!u) return t;if (u = u.map(function (t) {
      return (t = qb(t, e, 1)) && h + (e ? t[0] + "," + t[1] + "%," + t[2] + "%," + t[3] : t.join(",")) + ")";
    }), r && (a = rb(t), (i = r.c).join(o) !== a.c.join(o))) for (s = (n = t.replace(At, "1").split(rt)).length - 1; l < s; l++) {
      o += n[l] + (~i.indexOf(l) ? u.shift() || h + "0,0,0,0)" : (a.length ? a : u.length ? u : r).shift());
    }if (!n) for (s = (n = t.split(At)).length - 1; l < s; l++) {
      o += n[l] + u[l];
    }return o + n[s];
  }function vb(t) {
    var e,
        r = t.join(" ");if (At.lastIndex = 0, At.test(r)) return e = Ct.test(r), t[1] = sb(t[1], e), t[0] = sb(t[0], e, rb(t[1])), !0;
  }function Eb(t) {
    var e = (t + "").split("("),
        r = zt[e[0]];return r && 1 < e.length && r.config ? r.config.apply(null, ~t.indexOf("{") ? [function _parseObjectInString(t) {
      for (var e, r, i, n = {}, a = t.substr(1, t.length - 3).split(":"), s = a[0], o = 1, u = a.length; o < u; o++) {
        r = a[o], e = o !== u - 1 ? r.lastIndexOf(",") : r.length, i = r.substr(0, e), n[s] = isNaN(i) ? i.replace(Et, "").trim() : +i, s = r.substr(e + 1).trim();
      }return n;
    }(e[1])] : function _valueInParentheses(t) {
      var e = t.indexOf("(") + 1,
          r = t.indexOf(")"),
          i = t.indexOf("(", e);return t.substring(e, ~i && i < r ? t.indexOf(")", r + 1) : r);
    }(t).split(",").map(ga)) : zt._CE && It.test(t) ? zt._CE("", t) : r;
  }function Gb(t, e) {
    for (var r, i = t._first; i;) {
      i instanceof qt ? Gb(i, e) : !i.vars.yoyoEase || i._yoyo && i._repeat || i._yoyo === e || (i.timeline ? Gb(i.timeline, e) : (r = i._ease, i._ease = i._yEase, i._yEase = r, i._yoyo = e)), i = i._next;
    }
  }function Ib(t, e, r, i) {
    void 0 === r && (r = function easeOut(t) {
      return 1 - e(1 - t);
    }), void 0 === i && (i = function easeInOut(t) {
      return t < .5 ? e(2 * t) / 2 : 1 - e(2 * (1 - t)) / 2;
    });var n,
        a = { easeIn: e, easeOut: r, easeInOut: i };return ba(t, function (t) {
      for (var e in zt[t] = ot[t] = a, zt[n = t.toLowerCase()] = r, a) {
        zt[n + ("easeIn" === e ? ".in" : "easeOut" === e ? ".out" : ".inOut")] = zt[t + "." + e] = a[e];
      }
    }), a;
  }function Jb(e) {
    return function (t) {
      return t < .5 ? (1 - e(1 - 2 * t)) / 2 : .5 + e(2 * (t - .5)) / 2;
    };
  }function Kb(r, t, e) {
    function Ol(t) {
      return 1 === t ? 1 : i * Math.pow(2, -10 * t) * J((t - a) * n) + 1;
    }var i = 1 <= t ? t : 1,
        n = (e || (r ? .3 : .45)) / (t < 1 ? t : 1),
        a = n / V * (Math.asin(1 / i) || 0),
        s = "out" === r ? Ol : "in" === r ? function (t) {
      return 1 - Ol(1 - t);
    } : Jb(Ol);return n = V / n, s.config = function (t, e) {
      return Kb(r, t, e);
    }, s;
  }function Lb(e, r) {
    function Wl(t) {
      return t ? --t * t * ((r + 1) * t + r) + 1 : 0;
    }void 0 === r && (r = 1.70158);var t = "out" === e ? Wl : "in" === e ? function (t) {
      return 1 - Wl(1 - t);
    } : Jb(Wl);return t.config = function (t) {
      return Lb(e, t);
    }, t;
  }var F,
      R,
      i,
      n,
      a,
      h,
      l,
      f,
      d,
      c,
      m,
      g,
      y,
      b,
      T,
      w,
      x,
      k,
      A,
      C,
      S,
      D,
      z,
      I,
      E,
      B,
      Y = { autoSleep: 120, force3D: "auto", nullTargetWarn: 1, units: { lineHeight: "" } },
      L = { duration: .5, overwrite: !1, delay: 0 },
      X = 1e8,
      U = 1 / X,
      V = 2 * Math.PI,
      j = V / 4,
      W = 0,
      G = Math.sqrt,
      K = Math.cos,
      J = Math.sin,
      Z = "function" == typeof ArrayBuffer && ArrayBuffer.isView || function () {},
      H = Array.isArray,
      tt = /(?:-?\.?\d|\.)+/gi,
      et = /[-+=.]*\d+[.e\-+]*\d*[e\-+]*\d*/g,
      rt = /[-+=.]*\d+[.e-]*\d*[a-z%]*/g,
      it = /[-+=.]*\d+\.?\d*(?:e-|e\+)?\d*/gi,
      nt = /[+-]=-?[.\d]+/,
      at = /[^,'"\[\]\s]+/gi,
      st = /[\d.+\-=]+(?:e[-+]\d*)*/i,
      ot = {},
      ut = {},
      ht = [],
      lt = {},
      ft = {},
      dt = {},
      ct = 30,
      pt = [],
      _t = "",
      mt = function _merge(t, e) {
    for (var r in e) {
      t[r] = e[r];
    }return t;
  },
      gt = function _animationCycle(t, e) {
    var r = Math.floor(t /= e);return t && r === t ? r - 1 : r;
  },
      vt = function _isFromOrFromStart(t) {
    var e = t.data;return "isFromStart" === e || "isStart" === e;
  },
      yt = { _start: 0, endTime: Q, totalDuration: Q },
      bt = function _parsePosition(t, e, r) {
    var i,
        n,
        a,
        s = t.labels,
        u = t._recent || yt,
        h = t.duration() >= X ? u.endTime(!1) : t._dur;return o(e) && (isNaN(e) || e in s) ? (n = e.charAt(0), a = "%" === e.substr(-1), i = e.indexOf("="), "<" === n || ">" === n ? (0 <= i && (e = e.replace(/=/, "")), ("<" === n ? u._start : u.endTime(0 <= u._repeat)) + (parseFloat(e.substr(1)) || 0) * (a ? (i < 0 ? u : r).totalDuration() / 100 : 1)) : i < 0 ? (e in s || (s[e] = h), s[e]) : (n = parseFloat(e.charAt(i - 1) + e.substr(i + 1)), a && r && (n = n / 100 * (H(r) ? r[0] : r).totalDuration()), 1 < i ? _parsePosition(t, e.substr(0, i - 1), r) + n : h + n)) : null == e ? h : +e;
  },
      Tt = function _clamp(t, e, r) {
    return r < t ? t : e < r ? e : r;
  },
      wt = [].slice,
      xt = function toArray(t, e, r) {
    return !o(t) || r || !n && Dt() ? H(t) ? function _flatten(t, e, r) {
      return void 0 === r && (r = []), t.forEach(function (t) {
        return o(t) && !e || Sa(t, 1) ? r.push.apply(r, xt(t)) : r.push(t);
      }) || r;
    }(t, r) : Sa(t) ? wt.call(t, 0) : t ? [t] : [] : wt.call((e || a).querySelectorAll(t), 0);
  },
      Ot = function mapRange(e, t, r, i, n) {
    var a = t - e,
        s = i - r;return Na(n, function (t) {
      return r + ((t - e) / a * s || 0);
    });
  },
      Pt = function _callback(t, e, r) {
    var i,
        n,
        a = t.vars,
        s = a[e];if (s) return i = a[e + "Params"], n = a.callbackScope || t, r && ht.length && ea(), i ? s.apply(n, i) : s.call(n);
  },
      kt = 255,
      Mt = { aqua: [0, kt, kt], lime: [0, kt, 0], silver: [192, 192, 192], black: [0, 0, 0], maroon: [128, 0, 0], teal: [0, 128, 128], blue: [0, 0, kt], navy: [0, 0, 128], white: [kt, kt, kt], olive: [128, 128, 0], yellow: [kt, kt, 0], orange: [kt, 165, 0], gray: [128, 128, 128], purple: [128, 0, 128], green: [0, 128, 0], red: [kt, 0, 0], pink: [kt, 192, 203], cyan: [0, kt, kt], transparent: [kt, kt, kt, 0] },
      At = function () {
    var t,
        e = "(?:\\b(?:(?:rgb|rgba|hsl|hsla)\\(.+?\\))|\\B#(?:[0-9a-f]{3,4}){1,2}\\b";for (t in Mt) {
      e += "|" + t + "\\b";
    }return new RegExp(e + ")", "gi");
  }(),
      Ct = /hsl[a]?\(/,
      St = (x = Date.now, k = 500, A = 33, C = x(), S = C, z = D = 1e3 / 240, b = { time: 0, frame: 0, tick: function tick() {
      Kk(!0);
    }, deltaRatio: function deltaRatio(t) {
      return T / (1e3 / (t || 60));
    }, wake: function wake() {
      l && (!n && u() && (i = n = window, a = i.document || {}, ot.gsap = oe, (i.gsapVersions || (i.gsapVersions = [])).push(oe.version), M(h || i.GreenSockGlobals || !i.gsap && i || {}), y = i.requestAnimationFrame), m && b.sleep(), g = y || function (t) {
        return setTimeout(t, z - 1e3 * b.time + 1 | 0);
      }, c = 1, Kk(2));
    }, sleep: function sleep() {
      (y ? i.cancelAnimationFrame : clearTimeout)(m), c = 0, g = Q;
    }, lagSmoothing: function lagSmoothing(t, e) {
      k = t || 1e8, A = Math.min(e, k, 0);
    }, fps: function fps(t) {
      D = 1e3 / (t || 240), z = 1e3 * b.time + D;
    }, add: function add(t) {
      I.indexOf(t) < 0 && I.push(t), Dt();
    }, remove: function remove(t) {
      var e;~(e = I.indexOf(t)) && I.splice(e, 1) && e <= w && w--;
    }, _listeners: I = [] }),
      Dt = function _wake() {
    return !c && St.wake();
  },
      zt = {},
      It = /^[\d.\-M][\d.\-,\s]/,
      Et = /["']/g,
      Bt = function _invertEase(e) {
    return function (t) {
      return 1 - e(1 - t);
    };
  },
      Ft = function _parseEase(t, e) {
    return t && (p(t) ? t : zt[t] || Eb(t)) || e;
  };function Kk(t) {
    var e,
        r,
        i,
        n,
        a = x() - S,
        s = !0 === t;if (k < a && (C += a - A), (0 < (e = (i = (S += a) - C) - z) || s) && (n = ++b.frame, T = i - 1e3 * b.time, b.time = i /= 1e3, z += e + (D <= e ? 4 : D - e), r = 1), s || (m = g(Kk)), r) for (w = 0; w < I.length; w++) {
      I[w](i, T, n, t);
    }
  }function lm(t) {
    return t < B ? E * t * t : t < .7272727272727273 ? E * Math.pow(t - 1.5 / 2.75, 2) + .75 : t < .9090909090909092 ? E * (t -= 2.25 / 2.75) * t + .9375 : E * Math.pow(t - 2.625 / 2.75, 2) + .984375;
  }ba("Linear,Quad,Cubic,Quart,Quint,Strong", function (t, e) {
    var r = e < 5 ? e + 1 : e;Ib(t + ",Power" + (r - 1), e ? function (t) {
      return Math.pow(t, r);
    } : function (t) {
      return t;
    }, function (t) {
      return 1 - Math.pow(1 - t, r);
    }, function (t) {
      return t < .5 ? Math.pow(2 * t, r) / 2 : 1 - Math.pow(2 * (1 - t), r) / 2;
    });
  }), zt.Linear.easeNone = zt.none = zt.Linear.easeIn, Ib("Elastic", Kb("in"), Kb("out"), Kb()), E = 7.5625, B = 1 / 2.75, Ib("Bounce", function (t) {
    return 1 - lm(1 - t);
  }, lm), Ib("Expo", function (t) {
    return t ? Math.pow(2, 10 * (t - 1)) : 0;
  }), Ib("Circ", function (t) {
    return -(G(1 - t * t) - 1);
  }), Ib("Sine", function (t) {
    return 1 === t ? 1 : 1 - K(t * j);
  }), Ib("Back", Lb("in"), Lb("out"), Lb()), zt.SteppedEase = zt.steps = ot.SteppedEase = { config: function config(t, e) {
      void 0 === t && (t = 1);var r = 1 / t,
          i = t + (e ? 0 : 1),
          n = e ? 1 : 0;return function (t) {
        return ((i * Tt(0, .99999999, t) | 0) + n) * r;
      };
    } }, L.ease = zt["quad.out"], ba("onComplete,onUpdate,onStart,onRepeat,onReverseComplete,onInterrupt", function (t) {
    return _t += t + "," + t + "Params,";
  });var Rt,
      Lt = function GSCache(t, e) {
    this.id = W++, (t._gsap = this).target = t, this.harness = e, this.get = e ? e.get : aa, this.set = e ? e.getSetter : Jt;
  },
      Nt = ((Rt = Animation.prototype).delay = function delay(t) {
    return t || 0 === t ? (this.parent && this.parent.smoothChildTiming && this.startTime(this._start + t - this._delay), this._delay = t, this) : this._delay;
  }, Rt.duration = function duration(t) {
    return arguments.length ? this.totalDuration(0 < this._repeat ? t + (t + this._rDelay) * this._repeat : t) : this.totalDuration() && this._dur;
  }, Rt.totalDuration = function totalDuration(t) {
    return arguments.length ? (this._dirty = 0, Ia(this, this._repeat < 0 ? t : (t - this._repeat * this._rDelay) / (this._repeat + 1))) : this._tDur;
  }, Rt.totalTime = function totalTime(t, e) {
    if (Dt(), !arguments.length) return this._tTime;var r = this._dp;if (r && r.smoothChildTiming && this._ts) {
      for (za(this, t), !r._dp || r.parent || Aa(r, this); r.parent;) {
        r.parent._time !== r._start + (0 <= r._ts ? r._tTime / r._ts : (r.totalDuration() - r._tTime) / -r._ts) && r.totalTime(r._tTime, !0), r = r.parent;
      }!this.parent && this._dp.autoRemoveChildren && (0 < this._ts && t < this._tDur || this._ts < 0 && 0 < t || !this._tDur && !t) && Ba(this._dp, this, this._start - this._delay);
    }return (this._tTime !== t || !this._dur && !e || this._initted && Math.abs(this._zTime) === U || !t && !this._initted && (this.add || this._ptLookup)) && (this._ts || (this._pTime = t), fa(this, t, e)), this;
  }, Rt.time = function time(t, e) {
    return arguments.length ? this.totalTime(Math.min(this.totalDuration(), t + va(this)) % (this._dur + this._rDelay) || (t ? this._dur : 0), e) : this._time;
  }, Rt.totalProgress = function totalProgress(t, e) {
    return arguments.length ? this.totalTime(this.totalDuration() * t, e) : this.totalDuration() ? Math.min(1, this._tTime / this._tDur) : this.ratio;
  }, Rt.progress = function progress(t, e) {
    return arguments.length ? this.totalTime(this.duration() * (!this._yoyo || 1 & this.iteration() ? t : 1 - t) + va(this), e) : this.duration() ? Math.min(1, this._time / this._dur) : this.ratio;
  }, Rt.iteration = function iteration(t, e) {
    var r = this.duration() + this._rDelay;return arguments.length ? this.totalTime(this._time + (t - 1) * r, e) : this._repeat ? gt(this._tTime, r) + 1 : 1;
  }, Rt.timeScale = function timeScale(t) {
    if (!arguments.length) return this._rts === -U ? 0 : this._rts;if (this._rts === t) return this;var e = this.parent && this._ts ? xa(this.parent._time, this) : this._tTime;return this._rts = +t || 0, this._ts = this._ps || t === -U ? 0 : this._rts, function _recacheAncestors(t) {
      for (var e = t.parent; e && e.parent;) {
        e._dirty = 1, e.totalDuration(), e = e.parent;
      }return t;
    }(this.totalTime(Tt(-this._delay, this._tDur, e), !0));
  }, Rt.paused = function paused(t) {
    return arguments.length ? (this._ps !== t && ((this._ps = t) ? (this._pTime = this._tTime || Math.max(-this._delay, this.rawTime()), this._ts = this._act = 0) : (Dt(), this._ts = this._rts, this.totalTime(this.parent && !this.parent.smoothChildTiming ? this.rawTime() : this._tTime || this._pTime, 1 === this.progress() && Math.abs(this._zTime) !== U && (this._tTime -= U)))), this) : this._ps;
  }, Rt.startTime = function startTime(t) {
    if (arguments.length) {
      this._start = t;var e = this.parent || this._dp;return !e || !e._sort && this.parent || Ba(e, this, t - this._delay), this;
    }return this._start;
  }, Rt.endTime = function endTime(e) {
    return this._start + (t(e) ? this.totalDuration() : this.duration()) / Math.abs(this._ts);
  }, Rt.rawTime = function rawTime(t) {
    var e = this.parent || this._dp;return e ? t && (!this._ts || this._repeat && this._time && this.totalProgress() < 1) ? this._tTime % (this._dur + this._rDelay) : this._ts ? xa(e.rawTime(t), this) : this._tTime : this._tTime;
  }, Rt.globalTime = function globalTime(t) {
    for (var e = this, r = arguments.length ? t : e.rawTime(); e;) {
      r = e._start + r / (e._ts || 1), e = e._dp;
    }return r;
  }, Rt.repeat = function repeat(t) {
    return arguments.length ? (this._repeat = t === 1 / 0 ? -2 : t, Ja(this)) : -2 === this._repeat ? 1 / 0 : this._repeat;
  }, Rt.repeatDelay = function repeatDelay(t) {
    if (arguments.length) {
      var e = this._time;return this._rDelay = t, Ja(this), e ? this.time(e) : this;
    }return this._rDelay;
  }, Rt.yoyo = function yoyo(t) {
    return arguments.length ? (this._yoyo = t, this) : this._yoyo;
  }, Rt.seek = function seek(e, r) {
    return this.totalTime(bt(this, e), t(r));
  }, Rt.restart = function restart(e, r) {
    return this.play().totalTime(e ? -this._delay : 0, t(r));
  }, Rt.play = function play(t, e) {
    return null != t && this.seek(t, e), this.reversed(!1).paused(!1);
  }, Rt.reverse = function reverse(t, e) {
    return null != t && this.seek(t || this.totalDuration(), e), this.reversed(!0).paused(!1);
  }, Rt.pause = function pause(t, e) {
    return null != t && this.seek(t, e), this.paused(!0);
  }, Rt.resume = function resume() {
    return this.paused(!1);
  }, Rt.reversed = function reversed(t) {
    return arguments.length ? (!!t !== this.reversed() && this.timeScale(-this._rts || (t ? -U : 0)), this) : this._rts < 0;
  }, Rt.invalidate = function invalidate() {
    return this._initted = this._act = 0, this._zTime = -U, this;
  }, Rt.isActive = function isActive() {
    var t,
        e = this.parent || this._dp,
        r = this._start;return !(e && !(this._ts && this._initted && e.isActive() && (t = e.rawTime(!0)) >= r && t < this.endTime(!0) - U));
  }, Rt.eventCallback = function eventCallback(t, e, r) {
    var i = this.vars;return 1 < arguments.length ? (e ? (i[t] = e, r && (i[t + "Params"] = r), "onUpdate" === t && (this._onUpdate = e)) : delete i[t], this) : i[t];
  }, Rt.then = function then(t) {
    var i = this;return new Promise(function (e) {
      function Cn() {
        var t = i.then;i.then = null, p(r) && (r = r(i)) && (r.then || r === i) && (i.then = t), e(r), i.then = t;
      }var r = p(t) ? t : ha;i._initted && 1 === i.totalProgress() && 0 <= i._ts || !i._tTime && i._ts < 0 ? Cn() : i._prom = Cn;
    });
  }, Rt.kill = function kill() {
    kb(this);
  }, Animation);function Animation(t) {
    this.vars = t, this._delay = +t.delay || 0, (this._repeat = t.repeat === 1 / 0 ? -2 : t.repeat || 0) && (this._rDelay = t.repeatDelay || 0, this._yoyo = !!t.yoyo || !!t.yoyoEase), this._ts = 1, Ia(this, +t.duration, 1, 1), this.data = t.data, c || St.wake();
  }ia(Nt.prototype, { _time: 0, _start: 0, _end: 0, _tTime: 0, _tDur: 0, _dirty: 0, _repeat: 0, _yoyo: !1, parent: null, _initted: !1, _rDelay: 0, _ts: 1, _dp: 0, ratio: 0, _zTime: -U, _prom: 0, _ps: !1, _rts: 1 });var qt = function (n) {
    function Timeline(e, r) {
      var i;return void 0 === e && (e = {}), (i = n.call(this, e) || this).labels = {}, i.smoothChildTiming = !!e.smoothChildTiming, i.autoRemoveChildren = !!e.autoRemoveChildren, i._sort = t(e.sortChildren), R && Ba(e.parent || R, _assertThisInitialized(i), r), e.reversed && i.reverse(), e.paused && i.paused(!0), e.scrollTrigger && Ca(_assertThisInitialized(i), e.scrollTrigger), i;
    }_inheritsLoose(Timeline, n);var e = Timeline.prototype;return e.to = function to(t, e, r) {
      return Ma(0, arguments, this), this;
    }, e.from = function from(t, e, r) {
      return Ma(1, arguments, this), this;
    }, e.fromTo = function fromTo(t, e, r, i) {
      return Ma(2, arguments, this), this;
    }, e.set = function set(t, e, r) {
      return e.duration = 0, e.parent = this, na(e).repeatDelay || (e.repeat = 0), e.immediateRender = !!e.immediateRender, new Qt(t, e, bt(this, r), 1), this;
    }, e.call = function call(t, e, r) {
      return Ba(this, Qt.delayedCall(0, t, e), r);
    }, e.staggerTo = function staggerTo(t, e, r, i, n, a, s) {
      return r.duration = e, r.stagger = r.stagger || i, r.onComplete = a, r.onCompleteParams = s, r.parent = this, new Qt(t, r, bt(this, n)), this;
    }, e.staggerFrom = function staggerFrom(e, r, i, n, a, s, o) {
      return i.runBackwards = 1, na(i).immediateRender = t(i.immediateRender), this.staggerTo(e, r, i, n, a, s, o);
    }, e.staggerFromTo = function staggerFromTo(e, r, i, n, a, s, o, u) {
      return n.startAt = i, na(n).immediateRender = t(n.immediateRender), this.staggerTo(e, r, n, a, s, o, u);
    }, e.render = function render(t, e, r) {
      var i,
          n,
          a,
          s,
          o,
          u,
          h,
          l,
          f,
          d,
          c,
          p,
          _ = this._time,
          m = this._dirty ? this.totalDuration() : this._tDur,
          g = this._dur,
          v = this !== R && m - U < t && 0 <= t ? m : t < U ? 0 : t,
          y = this._zTime < 0 != t < 0 && (this._initted || !g);if (v !== this._tTime || r || y) {
        if (_ !== this._time && g && (v += this._time - _, t += this._time - _), i = v, f = this._start, u = !(l = this._ts), y && (g || (_ = this._zTime), !t && e || (this._zTime = t)), this._repeat) {
          if (c = this._yoyo, o = g + this._rDelay, this._repeat < -1 && t < 0) return this.totalTime(100 * o + t, e, r);if (i = ca(v % o), v === m ? (s = this._repeat, i = g) : ((s = ~~(v / o)) && s === v / o && (i = g, s--), g < i && (i = g)), d = gt(this._tTime, o), !_ && this._tTime && d !== s && (d = s), c && 1 & s && (i = g - i, p = 1), s !== d && !this._lock) {
            var b = c && 1 & d,
                T = b === (c && 1 & s);if (s < d && (b = !b), _ = b ? 0 : g, this._lock = 1, this.render(_ || (p ? 0 : ca(s * o)), e, !g)._lock = 0, this._tTime = v, !e && this.parent && Pt(this, "onRepeat"), this.vars.repeatRefresh && !p && (this.invalidate()._lock = 1), _ && _ !== this._time || u != !this._ts || this.vars.onRepeat && !this.parent && !this._act) return this;if (g = this._dur, m = this._tDur, T && (this._lock = 2, _ = b ? g : -1e-4, this.render(_, !0), this.vars.repeatRefresh && !p && this.invalidate()), this._lock = 0, !this._ts && !u) return this;Gb(this, p);
          }
        }if (this._hasPause && !this._forcing && this._lock < 2 && (h = function _findNextPauseTween(t, e, r) {
          var i;if (e < r) for (i = t._first; i && i._start <= r;) {
            if (!i._dur && "isPause" === i.data && i._start > e) return i;i = i._next;
          } else for (i = t._last; i && i._start >= r;) {
            if (!i._dur && "isPause" === i.data && i._start < e) return i;i = i._prev;
          }
        }(this, ca(_), ca(i))) && (v -= i - (i = h._start)), this._tTime = v, this._time = i, this._act = !l, this._initted || (this._onUpdate = this.vars.onUpdate, this._initted = 1, this._zTime = t, _ = 0), !_ && i && !e && (Pt(this, "onStart"), this._tTime !== v)) return this;if (_ <= i && 0 <= t) for (n = this._first; n;) {
          if (a = n._next, (n._act || i >= n._start) && n._ts && h !== n) {
            if (n.parent !== this) return this.render(t, e, r);if (n.render(0 < n._ts ? (i - n._start) * n._ts : (n._dirty ? n.totalDuration() : n._tDur) + (i - n._start) * n._ts, e, r), i !== this._time || !this._ts && !u) {
              h = 0, a && (v += this._zTime = -U);break;
            }
          }n = a;
        } else {
          n = this._last;for (var w = t < 0 ? t : i; n;) {
            if (a = n._prev, (n._act || w <= n._end) && n._ts && h !== n) {
              if (n.parent !== this) return this.render(t, e, r);if (n.render(0 < n._ts ? (w - n._start) * n._ts : (n._dirty ? n.totalDuration() : n._tDur) + (w - n._start) * n._ts, e, r), i !== this._time || !this._ts && !u) {
                h = 0, a && (v += this._zTime = w ? -U : U);break;
              }
            }n = a;
          }
        }if (h && !e && (this.pause(), h.render(_ <= i ? 0 : -U)._zTime = _ <= i ? 1 : -1, this._ts)) return this._start = f, ya(this), this.render(t, e, r);this._onUpdate && !e && Pt(this, "onUpdate", !0), (v === m && m >= this.totalDuration() || !v && _) && (f !== this._start && Math.abs(l) === Math.abs(this._ts) || this._lock || (!t && g || !(v === m && 0 < this._ts || !v && this._ts < 0) || ra(this, 1), e || t < 0 && !_ || !v && !_ && m || (Pt(this, v === m && 0 <= t ? "onComplete" : "onReverseComplete", !0), !this._prom || v < m && 0 < this.timeScale() || this._prom())));
      }return this;
    }, e.add = function add(t, e) {
      var r = this;if (q(e) || (e = bt(this, e, t)), !(t instanceof Nt)) {
        if (H(t)) return t.forEach(function (t) {
          return r.add(t, e);
        }), this;if (o(t)) return this.addLabel(t, e);if (!p(t)) return this;t = Qt.delayedCall(0, t);
      }return this !== t ? Ba(this, t, e) : this;
    }, e.getChildren = function getChildren(t, e, r, i) {
      void 0 === t && (t = !0), void 0 === e && (e = !0), void 0 === r && (r = !0), void 0 === i && (i = -X);for (var n = [], a = this._first; a;) {
        a._start >= i && (a instanceof Qt ? e && n.push(a) : (r && n.push(a), t && n.push.apply(n, a.getChildren(!0, e, r)))), a = a._next;
      }return n;
    }, e.getById = function getById(t) {
      for (var e = this.getChildren(1, 1, 1), r = e.length; r--;) {
        if (e[r].vars.id === t) return e[r];
      }
    }, e.remove = function remove(t) {
      return o(t) ? this.removeLabel(t) : p(t) ? this.killTweensOf(t) : (qa(this, t), t === this._recent && (this._recent = this._last), sa(this));
    }, e.totalTime = function totalTime(t, e) {
      return arguments.length ? (this._forcing = 1, !this._dp && this._ts && (this._start = ca(St.time - (0 < this._ts ? t / this._ts : (this.totalDuration() - t) / -this._ts))), n.prototype.totalTime.call(this, t, e), this._forcing = 0, this) : this._tTime;
    }, e.addLabel = function addLabel(t, e) {
      return this.labels[t] = bt(this, e), this;
    }, e.removeLabel = function removeLabel(t) {
      return delete this.labels[t], this;
    }, e.addPause = function addPause(t, e, r) {
      var i = Qt.delayedCall(0, e || Q, r);return i.data = "isPause", this._hasPause = 1, Ba(this, i, bt(this, t));
    }, e.removePause = function removePause(t) {
      var e = this._first;for (t = bt(this, t); e;) {
        e._start === t && "isPause" === e.data && ra(e), e = e._next;
      }
    }, e.killTweensOf = function killTweensOf(t, e, r) {
      for (var i = this.getTweensOf(t, r), n = i.length; n--;) {
        Yt !== i[n] && i[n].kill(t, e);
      }return this;
    }, e.getTweensOf = function getTweensOf(t, e) {
      for (var r, i = [], n = xt(t), a = this._first, s = q(e); a;) {
        a instanceof Qt ? da(a._targets, n) && (s ? (!Yt || a._initted && a._ts) && a.globalTime(0) <= e && a.globalTime(a.totalDuration()) > e : !e || a.isActive()) && i.push(a) : (r = a.getTweensOf(n, e)).length && i.push.apply(i, r), a = a._next;
      }return i;
    }, e.tweenTo = function tweenTo(t, e) {
      e = e || {};var r,
          i = this,
          n = bt(i, t),
          a = e.startAt,
          s = e.onStart,
          o = e.onStartParams,
          u = e.immediateRender,
          h = Qt.to(i, ia({ ease: e.ease || "none", lazy: !1, immediateRender: !1, time: n, overwrite: "auto", duration: e.duration || Math.abs((n - (a && "time" in a ? a.time : i._time)) / i.timeScale()) || U, onStart: function onStart() {
          if (i.pause(), !r) {
            var t = e.duration || Math.abs((n - (a && "time" in a ? a.time : i._time)) / i.timeScale());h._dur !== t && Ia(h, t, 0, 1).render(h._time, !0, !0), r = 1;
          }s && s.apply(h, o || []);
        } }, e));return u ? h.render(0) : h;
    }, e.tweenFromTo = function tweenFromTo(t, e, r) {
      return this.tweenTo(e, ia({ startAt: { time: bt(this, t) } }, r));
    }, e.recent = function recent() {
      return this._recent;
    }, e.nextLabel = function nextLabel(t) {
      return void 0 === t && (t = this._time), ib(this, bt(this, t));
    }, e.previousLabel = function previousLabel(t) {
      return void 0 === t && (t = this._time), ib(this, bt(this, t), 1);
    }, e.currentLabel = function currentLabel(t) {
      return arguments.length ? this.seek(t, !0) : this.previousLabel(this._time + U);
    }, e.shiftChildren = function shiftChildren(t, e, r) {
      void 0 === r && (r = 0);for (var i, n = this._first, a = this.labels; n;) {
        n._start >= r && (n._start += t, n._end += t), n = n._next;
      }if (e) for (i in a) {
        a[i] >= r && (a[i] += t);
      }return sa(this);
    }, e.invalidate = function invalidate() {
      var t = this._first;for (this._lock = 0; t;) {
        t.invalidate(), t = t._next;
      }return n.prototype.invalidate.call(this);
    }, e.clear = function clear(t) {
      void 0 === t && (t = !0);for (var e, r = this._first; r;) {
        e = r._next, this.remove(r), r = e;
      }return this._dp && (this._time = this._tTime = this._pTime = 0), t && (this.labels = {}), sa(this);
    }, e.totalDuration = function totalDuration(t) {
      var e,
          r,
          i,
          n = 0,
          a = this,
          s = a._last,
          o = X;if (arguments.length) return a.timeScale((a._repeat < 0 ? a.duration() : a.totalDuration()) / (a.reversed() ? -t : t));if (a._dirty) {
        for (i = a.parent; s;) {
          e = s._prev, s._dirty && s.totalDuration(), o < (r = s._start) && a._sort && s._ts && !a._lock ? (a._lock = 1, Ba(a, s, r - s._delay, 1)._lock = 0) : o = r, r < 0 && s._ts && (n -= r, (!i && !a._dp || i && i.smoothChildTiming) && (a._start += r / a._ts, a._time -= r, a._tTime -= r), a.shiftChildren(-r, !1, -Infinity), o = 0), s._end > n && s._ts && (n = s._end), s = e;
        }Ia(a, a === R && a._time > n ? a._time : n, 1, 1), a._dirty = 0;
      }return a._tDur;
    }, Timeline.updateRoot = function updateRoot(t) {
      if (R._ts && (fa(R, xa(t, R)), f = St.frame), St.frame >= ct) {
        ct += Y.autoSleep || 120;var e = R._first;if ((!e || !e._ts) && Y.autoSleep && St._listeners.length < 2) {
          for (; e && !e._ts;) {
            e = e._next;
          }e || St.sleep();
        }
      }
    }, Timeline;
  }(Nt);ia(qt.prototype, { _lock: 0, _hasPause: 0, _forcing: 0 });function Sb(t, e, r, i, n, a) {
    var u, h, l, f;if (ft[t] && !1 !== (u = new ft[t]()).init(n, u.rawVars ? e[t] : function _processVars(t, e, r, i, n) {
      if (p(t) && (t = Vt(t, n, e, r, i)), !s(t) || t.style && t.nodeType || H(t) || Z(t)) return o(t) ? Vt(t, n, e, r, i) : t;var a,
          u = {};for (a in t) {
        u[a] = Vt(t[a], n, e, r, i);
      }return u;
    }(e[t], i, n, a, r), r, i, a) && (r._pt = h = new ae(r._pt, n, t, 0, 1, u.render, u, 0, u.priority), r !== d)) for (l = r._ptLookup[r._targets.indexOf(n)], f = u._props.length; f--;) {
      l[u._props[f]] = h;
    }return u;
  }var Yt,
      Xt = function _addPropTween(t, e, r, i, n, a, s, u, h) {
    p(i) && (i = i(n || 0, t, a));var l,
        f = t[e],
        d = "get" !== r ? r : p(f) ? h ? t[e.indexOf("set") || !p(t["get" + e.substr(3)]) ? e : "get" + e.substr(3)](h) : t[e]() : f,
        c = p(f) ? h ? $t : Kt : Gt;if (o(i) && (~i.indexOf("random(") && (i = fb(i)), "=" === i.charAt(1) && (!(l = parseFloat(d) + parseFloat(i.substr(2)) * ("-" === i.charAt(0) ? -1 : 1) + (Pa(d) || 0)) && 0 !== l || (i = l))), d !== i) return isNaN(d * i) || "" === i ? (f || e in t || N(e, i), function _addComplexStringPropTween(t, e, r, i, n, a, s) {
      var o,
          u,
          h,
          l,
          f,
          d,
          c,
          p,
          _ = new ae(this._pt, t, e, 0, 1, te, null, n),
          m = 0,
          g = 0;for (_.b = r, _.e = i, r += "", (c = ~(i += "").indexOf("random(")) && (i = fb(i)), a && (a(p = [r, i], t, e), r = p[0], i = p[1]), u = r.match(it) || []; o = it.exec(i);) {
        l = o[0], f = i.substring(m, o.index), h ? h = (h + 1) % 5 : "rgba(" === f.substr(-5) && (h = 1), l !== u[g++] && (d = parseFloat(u[g - 1]) || 0, _._pt = { _next: _._pt, p: f || 1 === g ? f : ",", s: d, c: "=" === l.charAt(1) ? parseFloat(l.substr(2)) * ("-" === l.charAt(0) ? -1 : 1) : parseFloat(l) - d, m: h && h < 4 ? Math.round : 0 }, m = it.lastIndex);
      }return _.c = m < i.length ? i.substring(m, i.length) : "", _.fp = s, (nt.test(i) || c) && (_.e = 0), this._pt = _;
    }.call(this, t, e, d, i, c, u || Y.stringFilter, h)) : (l = new ae(this._pt, t, e, +d || 0, i - (d || 0), "boolean" == typeof f ? Ht : Zt, 0, c), h && (l.fp = h), s && l.modifier(s, this, t), this._pt = l);
  },
      Ut = function _initTween(e, r) {
    var i,
        n,
        a,
        s,
        o,
        u,
        h,
        l,
        f,
        d,
        c,
        p,
        m,
        g = e.vars,
        v = g.ease,
        y = g.startAt,
        b = g.immediateRender,
        T = g.lazy,
        w = g.onUpdate,
        x = g.onUpdateParams,
        O = g.callbackScope,
        P = g.runBackwards,
        k = g.yoyoEase,
        M = g.keyframes,
        A = g.autoRevert,
        C = e._dur,
        S = e._startAt,
        D = e._targets,
        z = e.parent,
        I = z && "nested" === z.data ? z.parent._targets : D,
        E = "auto" === e._overwrite && !F,
        B = e.timeline;if (!B || M && v || (v = "none"), e._ease = Ft(v, L.ease), e._yEase = k ? Bt(Ft(!0 === k ? v : k, L.ease)) : 0, k && e._yoyo && !e._repeat && (k = e._yEase, e._yEase = e._ease, e._ease = k), e._from = !B && !!g.runBackwards, !B) {
      if (p = (l = D[0] ? _(D[0]).harness : 0) && g[l.prop], i = ma(g, ut), S && S.render(-1, !0).kill(), y) {
        if (ra(e._startAt = Qt.set(D, ia({ data: "isStart", overwrite: !1, parent: z, immediateRender: !0, lazy: t(T), startAt: null, delay: 0, onUpdate: w, onUpdateParams: x, callbackScope: O, stagger: 0 }, y))), r < 0 && !b && !A && e._startAt.render(-1, !0), b) {
          if (0 < r && !A && (e._startAt = 0), C && r <= 0) return void (r && (e._zTime = r));
        } else !1 === A && (e._startAt = 0);
      } else if (P && C) if (S) A || (e._startAt = 0);else if (r && (b = !1), a = ia({ overwrite: !1, data: "isFromStart", lazy: b && t(T), immediateRender: b, stagger: 0, parent: z }, i), p && (a[l.prop] = p), ra(e._startAt = Qt.set(D, a)), r < 0 && e._startAt.render(-1, !0), b) {
        if (!r) return;
      } else _initTween(e._startAt, U);for (e._pt = 0, T = C && t(T) || T && !C, n = 0; n < D.length; n++) {
        if (h = (o = D[n])._gsap || $(D)[n]._gsap, e._ptLookup[n] = d = {}, lt[h.id] && ht.length && ea(), c = I === D ? n : I.indexOf(o), l && !1 !== (f = new l()).init(o, p || i, e, c, I) && (e._pt = s = new ae(e._pt, o, f.name, 0, 1, f.render, f, 0, f.priority), f._props.forEach(function (t) {
          d[t] = s;
        }), f.priority && (u = 1)), !l || p) for (a in i) {
          ft[a] && (f = Sb(a, i, e, c, o, I)) ? f.priority && (u = 1) : d[a] = s = Xt.call(e, o, a, "get", i[a], c, I, 0, g.stringFilter);
        }e._op && e._op[n] && e.kill(o, e._op[n]), E && e._pt && (Yt = e, R.killTweensOf(o, d, e.globalTime(0)), m = !e.parent, Yt = 0), e._pt && T && (lt[h.id] = 1);
      }u && ne(e), e._onInit && e._onInit(e);
    }e._onUpdate = w, e._initted = (!e._op || e._pt) && !m;
  },
      Vt = function _parseFuncOrString(t, e, r, i, n) {
    return p(t) ? t.call(e, r, i, n) : o(t) && ~t.indexOf("random(") ? fb(t) : t;
  },
      jt = _t + "repeat,repeatDelay,yoyo,repeatRefresh,yoyoEase",
      Wt = (jt + ",id,stagger,delay,duration,paused,scrollTrigger").split(","),
      Qt = function (C) {
    function Tween(e, r, i, n) {
      var a;"number" == typeof r && (i.duration = r, r = i, i = null);var o,
          u,
          h,
          l,
          f,
          d,
          c,
          p,
          _ = (a = C.call(this, n ? r : na(r)) || this).vars,
          m = _.duration,
          g = _.delay,
          y = _.immediateRender,
          b = _.stagger,
          T = _.overwrite,
          w = _.keyframes,
          x = _.defaults,
          P = _.scrollTrigger,
          k = _.yoyoEase,
          M = r.parent || R,
          A = (H(e) || Z(e) ? q(e[0]) : "length" in r) ? [e] : xt(e);if (a._targets = A.length ? $(A) : O("GSAP target " + e + " not found. https://greensock.com", !Y.nullTargetWarn) || [], a._ptLookup = [], a._overwrite = T, w || b || v(m) || v(g)) {
        if (r = a.vars, (o = a.timeline = new qt({ data: "nested", defaults: x || {} })).kill(), o.parent = o._dp = _assertThisInitialized(a), o._start = 0, w) ia(o.vars.defaults, { ease: "none" }), b ? A.forEach(function (r, i) {
          return w.forEach(function (t, e) {
            return o.to(r, t, e ? ">" : i * b);
          });
        }) : w.forEach(function (t) {
          return o.to(A, t, ">");
        });else {
          if (l = A.length, c = b ? Xa(b) : Q, s(b)) for (f in b) {
            ~jt.indexOf(f) && ((p = p || {})[f] = b[f]);
          }for (u = 0; u < l; u++) {
            for (f in h = {}, r) {
              Wt.indexOf(f) < 0 && (h[f] = r[f]);
            }h.stagger = 0, k && (h.yoyoEase = k), p && mt(h, p), d = A[u], h.duration = +Vt(m, _assertThisInitialized(a), u, d, A), h.delay = (+Vt(g, _assertThisInitialized(a), u, d, A) || 0) - a._delay, !b && 1 === l && h.delay && (a._delay = g = h.delay, a._start += g, h.delay = 0), o.to(d, h, c(u, d, A));
          }o.duration() ? m = g = 0 : a.timeline = 0;
        }m || a.duration(m = o.duration());
      } else a.timeline = 0;return !0 !== T || F || (Yt = _assertThisInitialized(a), R.killTweensOf(A), Yt = 0), Ba(M, _assertThisInitialized(a), i), r.reversed && a.reverse(), r.paused && a.paused(!0), (y || !m && !w && a._start === ca(M._time) && t(y) && function _hasNoPausedAncestors(t) {
        return !t || t._ts && _hasNoPausedAncestors(t.parent);
      }(_assertThisInitialized(a)) && "nested" !== M.data) && (a._tTime = -U, a.render(Math.max(0, -g))), P && Ca(_assertThisInitialized(a), P), a;
    }_inheritsLoose(Tween, C);var e = Tween.prototype;return e.render = function render(t, e, r) {
      var i,
          n,
          a,
          s,
          o,
          u,
          h,
          l,
          f,
          d = this._time,
          c = this._tDur,
          p = this._dur,
          _ = c - U < t && 0 <= t ? c : t < U ? 0 : t;if (p) {
        if (_ !== this._tTime || !t || r || !this._initted && this._tTime || this._startAt && this._zTime < 0 != t < 0) {
          if (i = _, l = this.timeline, this._repeat) {
            if (s = p + this._rDelay, this._repeat < -1 && t < 0) return this.totalTime(100 * s + t, e, r);if (i = ca(_ % s), _ === c ? (a = this._repeat, i = p) : ((a = ~~(_ / s)) && a === _ / s && (i = p, a--), p < i && (i = p)), (u = this._yoyo && 1 & a) && (f = this._yEase, i = p - i), o = gt(this._tTime, s), i === d && !r && this._initted) return this;a !== o && (l && this._yEase && Gb(l, u), !this.vars.repeatRefresh || u || this._lock || (this._lock = r = 1, this.render(ca(s * a), !0).invalidate()._lock = 0));
          }if (!this._initted) {
            if (Da(this, t < 0 ? t : i, r, e)) return this._tTime = 0, this;if (p !== this._dur) return this.render(t, e, r);
          }if (this._tTime = _, this._time = i, !this._act && this._ts && (this._act = 1, this._lazy = 0), this.ratio = h = (f || this._ease)(i / p), this._from && (this.ratio = h = 1 - h), i && !d && !e && (Pt(this, "onStart"), this._tTime !== _)) return this;for (n = this._pt; n;) {
            n.r(h, n.d), n = n._next;
          }l && l.render(t < 0 ? t : !i && u ? -U : l._dur * h, e, r) || this._startAt && (this._zTime = t), this._onUpdate && !e && (t < 0 && this._startAt && this._startAt.render(t, !0, r), Pt(this, "onUpdate")), this._repeat && a !== o && this.vars.onRepeat && !e && this.parent && Pt(this, "onRepeat"), _ !== this._tDur && _ || this._tTime !== _ || (t < 0 && this._startAt && !this._onUpdate && this._startAt.render(t, !0, !0), !t && p || !(_ === this._tDur && 0 < this._ts || !_ && this._ts < 0) || ra(this, 1), e || t < 0 && !d || !_ && !d || (Pt(this, _ === c ? "onComplete" : "onReverseComplete", !0), !this._prom || _ < c && 0 < this.timeScale() || this._prom()));
        }
      } else !function _renderZeroDurationTween(t, e, r, i) {
        var n,
            a,
            s,
            o = t.ratio,
            u = e < 0 || !e && (!t._start && function _parentPlayheadIsBeforeStart(t) {
          var e = t.parent;return e && e._ts && e._initted && !e._lock && (e.rawTime() < 0 || _parentPlayheadIsBeforeStart(e));
        }(t) && (t._initted || !vt(t)) || (t._ts < 0 || t._dp._ts < 0) && !vt(t)) ? 0 : 1,
            h = t._rDelay,
            l = 0;if (h && t._repeat && (l = Tt(0, t._tDur, e), a = gt(l, h), s = gt(t._tTime, h), t._yoyo && 1 & a && (u = 1 - u), a !== s && (o = 1 - u, t.vars.repeatRefresh && t._initted && t.invalidate())), u !== o || i || t._zTime === U || !e && t._zTime) {
          if (!t._initted && Da(t, e, i, r)) return;for (s = t._zTime, t._zTime = e || (r ? U : 0), r = r || e && !s, t.ratio = u, t._from && (u = 1 - u), t._time = 0, t._tTime = l, n = t._pt; n;) {
            n.r(u, n.d), n = n._next;
          }t._startAt && e < 0 && t._startAt.render(e, !0, !0), t._onUpdate && !r && Pt(t, "onUpdate"), l && t._repeat && !r && t.parent && Pt(t, "onRepeat"), (e >= t._tDur || e < 0) && t.ratio === u && (u && ra(t, 1), r || (Pt(t, u ? "onComplete" : "onReverseComplete", !0), t._prom && t._prom()));
        } else t._zTime || (t._zTime = e);
      }(this, t, e, r);return this;
    }, e.targets = function targets() {
      return this._targets;
    }, e.invalidate = function invalidate() {
      return this._pt = this._op = this._startAt = this._onUpdate = this._lazy = this.ratio = 0, this._ptLookup = [], this.timeline && this.timeline.invalidate(), C.prototype.invalidate.call(this);
    }, e.kill = function kill(t, e) {
      if (void 0 === e && (e = "all"), !(t || e && "all" !== e)) return this._lazy = this._pt = 0, this.parent ? kb(this) : this;if (this.timeline) {
        var r = this.timeline.totalDuration();return this.timeline.killTweensOf(t, e, Yt && !0 !== Yt.vars.overwrite)._first || kb(this), this.parent && r !== this.timeline.totalDuration() && Ia(this, this._dur * this.timeline._tDur / r, 0, 1), this;
      }var i,
          n,
          a,
          s,
          u,
          h,
          l,
          f = this._targets,
          d = t ? xt(t) : f,
          c = this._ptLookup,
          p = this._pt;if ((!e || "all" === e) && function _arraysMatch(t, e) {
        for (var r = t.length, i = r === e.length; i && r-- && t[r] === e[r];) {}return r < 0;
      }(f, d)) return "all" === e && (this._pt = 0), kb(this);for (i = this._op = this._op || [], "all" !== e && (o(e) && (u = {}, ba(e, function (t) {
        return u[t] = 1;
      }), e = u), e = function _addAliasesToVars(t, e) {
        var r,
            i,
            n,
            a,
            s = t[0] ? _(t[0]).harness : 0,
            o = s && s.aliases;if (!o) return e;for (i in r = mt({}, e), o) {
          if ((i in r)) for (n = (a = o[i].split(",")).length; n--;) {
            r[a[n]] = r[i];
          }
        }return r;
      }(f, e)), l = f.length; l--;) {
        if (~d.indexOf(f[l])) for (u in n = c[l], "all" === e ? (i[l] = e, s = n, a = {}) : (a = i[l] = i[l] || {}, s = e), s) {
          (h = n && n[u]) && ("kill" in h.d && !0 !== h.d.kill(u) || qa(this, h, "_pt"), delete n[u]), "all" !== a && (a[u] = 1);
        }
      }return this._initted && !this._pt && p && kb(this), this;
    }, Tween.to = function to(t, e, r) {
      return new Tween(t, e, r);
    }, Tween.from = function from(t, e) {
      return Ma(1, arguments);
    }, Tween.delayedCall = function delayedCall(t, e, r, i) {
      return new Tween(e, 0, { immediateRender: !1, lazy: !1, overwrite: !1, delay: t, onComplete: e, onReverseComplete: e, onCompleteParams: r, onReverseCompleteParams: r, callbackScope: i });
    }, Tween.fromTo = function fromTo(t, e, r) {
      return Ma(2, arguments);
    }, Tween.set = function set(t, e) {
      return e.duration = 0, e.repeatDelay || (e.repeat = 0), new Tween(t, e);
    }, Tween.killTweensOf = function killTweensOf(t, e, r) {
      return R.killTweensOf(t, e, r);
    }, Tween;
  }(Nt);ia(Qt.prototype, { _targets: [], _lazy: 0, _startAt: 0, _op: 0, _onInit: 0 }), ba("staggerTo,staggerFrom,staggerFromTo", function (r) {
    Qt[r] = function () {
      var t = new qt(),
          e = wt.call(arguments, 0);return e.splice("staggerFromTo" === r ? 5 : 4, 0, 0), t[r].apply(t, e);
    };
  });function bc(t, e, r) {
    return t.setAttribute(e, r);
  }function jc(t, e, r, i) {
    i.mSet(t, e, i.m.call(i.tween, r, i.mt), i);
  }var Gt = function _setterPlain(t, e, r) {
    return t[e] = r;
  },
      Kt = function _setterFunc(t, e, r) {
    return t[e](r);
  },
      $t = function _setterFuncWithParam(t, e, r, i) {
    return t[e](i.fp, r);
  },
      Jt = function _getSetter(t, e) {
    return p(t[e]) ? Kt : r(t[e]) && t.setAttribute ? bc : Gt;
  },
      Zt = function _renderPlain(t, e) {
    return e.set(e.t, e.p, Math.round(1e6 * (e.s + e.c * t)) / 1e6, e);
  },
      Ht = function _renderBoolean(t, e) {
    return e.set(e.t, e.p, !!(e.s + e.c * t), e);
  },
      te = function _renderComplexString(t, e) {
    var r = e._pt,
        i = "";if (!t && e.b) i = e.b;else if (1 === t && e.e) i = e.e;else {
      for (; r;) {
        i = r.p + (r.m ? r.m(r.s + r.c * t) : Math.round(1e4 * (r.s + r.c * t)) / 1e4) + i, r = r._next;
      }i += e.c;
    }e.set(e.t, e.p, i, e);
  },
      ee = function _renderPropTweens(t, e) {
    for (var r = e._pt; r;) {
      r.r(t, r.d), r = r._next;
    }
  },
      re = function _addPluginModifier(t, e, r, i) {
    for (var n, a = this._pt; a;) {
      n = a._next, a.p === i && a.modifier(t, e, r), a = n;
    }
  },
      ie = function _killPropTweensOf(t) {
    for (var e, r, i = this._pt; i;) {
      r = i._next, i.p === t && !i.op || i.op === t ? qa(this, i, "_pt") : i.dep || (e = 1), i = r;
    }return !e;
  },
      ne = function _sortPropTweensByPriority(t) {
    for (var e, r, i, n, a = t._pt; a;) {
      for (e = a._next, r = i; r && r.pr > a.pr;) {
        r = r._next;
      }(a._prev = r ? r._prev : n) ? a._prev._next = a : i = a, (a._next = r) ? r._prev = a : n = a, a = e;
    }t._pt = i;
  },
      ae = (PropTween.prototype.modifier = function modifier(t, e, r) {
    this.mSet = this.mSet || this.set, this.set = jc, this.m = t, this.mt = r, this.tween = e;
  }, PropTween);function PropTween(t, e, r, i, n, a, s, o, u) {
    this.t = e, this.s = i, this.c = n, this.p = r, this.r = a || Zt, this.d = s || this, this.set = o || Gt, this.pr = u || 0, (this._next = t) && (t._prev = this);
  }ba(_t + "parent,duration,ease,delay,overwrite,runBackwards,startAt,yoyo,immediateRender,repeat,repeatDelay,data,paused,reversed,lazy,callbackScope,stringFilter,id,yoyoEase,stagger,inherit,repeatRefresh,keyframes,autoRevert,scrollTrigger", function (t) {
    return ut[t] = 1;
  }), ot.TweenMax = ot.TweenLite = Qt, ot.TimelineLite = ot.TimelineMax = qt, R = new qt({ sortChildren: !1, defaults: L, autoRemoveChildren: !0, id: "root", smoothChildTiming: !0 }), Y.stringFilter = vb;var se = { registerPlugin: function registerPlugin() {
      for (var t = arguments.length, e = new Array(t), r = 0; r < t; r++) {
        e[r] = arguments[r];
      }e.forEach(function (t) {
        return function _createPlugin(t) {
          var e = (t = !t.name && t.default || t).name,
              r = p(t),
              i = e && !r && t.init ? function () {
            this._props = [];
          } : t,
              n = { init: Q, render: ee, add: Xt, kill: ie, modifier: re, rawVars: 0 },
              a = { targetTest: 0, get: 0, getSetter: Jt, aliases: {}, register: 0 };if (Dt(), t !== i) {
            if (ft[e]) return;ia(i, ia(ma(t, n), a)), mt(i.prototype, mt(n, ma(t, a))), ft[i.prop = e] = i, t.targetTest && (pt.push(i), ut[e] = 1), e = ("css" === e ? "CSS" : e.charAt(0).toUpperCase() + e.substr(1)) + "Plugin";
          }P(e, i), t.register && t.register(oe, i, ae);
        }(t);
      });
    }, timeline: function timeline(t) {
      return new qt(t);
    }, getTweensOf: function getTweensOf(t, e) {
      return R.getTweensOf(t, e);
    }, getProperty: function getProperty(i, t, e, r) {
      o(i) && (i = xt(i)[0]);var n = _(i || {}).get,
          a = e ? ha : ga;return "native" === e && (e = ""), i ? t ? a((ft[t] && ft[t].get || n)(i, t, e, r)) : function (t, e, r) {
        return a((ft[t] && ft[t].get || n)(i, t, e, r));
      } : i;
    }, quickSetter: function quickSetter(r, e, i) {
      if (1 < (r = xt(r)).length) {
        var n = r.map(function (t) {
          return oe.quickSetter(t, e, i);
        }),
            a = n.length;return function (t) {
          for (var e = a; e--;) {
            n[e](t);
          }
        };
      }r = r[0] || {};var s = ft[e],
          o = _(r),
          u = o.harness && (o.harness.aliases || {})[e] || e,
          h = s ? function (t) {
        var e = new s();d._pt = 0, e.init(r, i ? t + i : t, d, 0, [r]), e.render(1, e), d._pt && ee(1, d);
      } : o.set(r, u);return s ? h : function (t) {
        return h(r, u, i ? t + i : t, o, 1);
      };
    }, isTweening: function isTweening(t) {
      return 0 < R.getTweensOf(t, !0).length;
    }, defaults: function defaults(t) {
      return t && t.ease && (t.ease = Ft(t.ease, L.ease)), la(L, t || {});
    }, config: function config(t) {
      return la(Y, t || {});
    }, registerEffect: function registerEffect(t) {
      var i = t.name,
          n = t.effect,
          e = t.plugins,
          a = t.defaults,
          r = t.extendTimeline;(e || "").split(",").forEach(function (t) {
        return t && !ft[t] && !ot[t] && O(i + " effect requires " + t + " plugin.");
      }), dt[i] = function (t, e, r) {
        return n(xt(t), ia(e || {}, a), r);
      }, r && (qt.prototype[i] = function (t, e, r) {
        return this.add(dt[i](t, s(e) ? e : (r = e) && {}, this), r);
      });
    }, registerEase: function registerEase(t, e) {
      zt[t] = Ft(e);
    }, parseEase: function parseEase(t, e) {
      return arguments.length ? Ft(t, e) : zt;
    }, getById: function getById(t) {
      return R.getById(t);
    }, exportRoot: function exportRoot(e, r) {
      void 0 === e && (e = {});var i,
          n,
          a = new qt(e);for (a.smoothChildTiming = t(e.smoothChildTiming), R.remove(a), a._dp = 0, a._time = a._tTime = R._time, i = R._first; i;) {
        n = i._next, !r && !i._dur && i instanceof Qt && i.vars.onComplete === i._targets[0] || Ba(a, i, i._start - i._delay), i = n;
      }return Ba(R, a, 0), a;
    }, utils: { wrap: function wrap(e, t, r) {
        var i = t - e;return H(e) ? cb(e, wrap(0, e.length), t) : Na(r, function (t) {
          return (i + (t - e) % i) % i + e;
        });
      }, wrapYoyo: function wrapYoyo(e, t, r) {
        var i = t - e,
            n = 2 * i;return H(e) ? cb(e, wrapYoyo(0, e.length - 1), t) : Na(r, function (t) {
          return e + (i < (t = (n + (t - e) % n) % n || 0) ? n - t : t);
        });
      }, distribute: Xa, random: $a, snap: Za, normalize: function normalize(t, e, r) {
        return Ot(t, e, 0, 1, r);
      }, getUnit: Pa, clamp: function clamp(e, r, t) {
        return Na(t, function (t) {
          return Tt(e, r, t);
        });
      }, splitColor: qb, toArray: xt, selector: function selector(r) {
        return r = xt(r)[0] || O("Invalid scope") || {}, function (t) {
          var e = r.current || r.nativeElement || r;return xt(t, e.querySelectorAll ? e : e === r ? O("Invalid scope") || a.createElement("div") : r);
        };
      }, mapRange: Ot, pipe: function pipe() {
        for (var t = arguments.length, e = new Array(t), r = 0; r < t; r++) {
          e[r] = arguments[r];
        }return function (t) {
          return e.reduce(function (t, e) {
            return e(t);
          }, t);
        };
      }, unitize: function unitize(e, r) {
        return function (t) {
          return e(parseFloat(t)) + (r || Pa(t));
        };
      }, interpolate: function interpolate(e, r, t, i) {
        var n = isNaN(e + r) ? 0 : function (t) {
          return (1 - t) * e + t * r;
        };if (!n) {
          var a,
              s,
              u,
              h,
              l,
              f = o(e),
              d = {};if (!0 === t && (i = 1) && (t = null), f) e = { p: e }, r = { p: r };else if (H(e) && !H(r)) {
            for (u = [], h = e.length, l = h - 2, s = 1; s < h; s++) {
              u.push(interpolate(e[s - 1], e[s]));
            }h--, n = function func(t) {
              t *= h;var e = Math.min(l, ~~t);return u[e](t - e);
            }, t = r;
          } else i || (e = mt(H(e) ? [] : {}, e));if (!u) {
            for (a in r) {
              Xt.call(d, e, a, "get", r[a]);
            }n = function func(t) {
              return ee(t, d) || (f ? e.p : e);
            };
          }
        }return Na(t, n);
      }, shuffle: Wa }, install: M, effects: dt, ticker: St, updateRoot: qt.updateRoot, plugins: ft, globalTimeline: R, core: { PropTween: ae, globals: P, Tween: Qt, Timeline: qt, Animation: Nt, getCache: _, _removeLinkedListItem: qa, suppressOverwrites: function suppressOverwrites(t) {
        return F = t;
      } } };ba("to,from,fromTo,delayedCall,set,killTweensOf", function (t) {
    return se[t] = Qt[t];
  }), St.add(qt.updateRoot), d = se.to({}, { duration: 0 });function nc(t, e) {
    for (var r = t._pt; r && r.p !== e && r.op !== e && r.fp !== e;) {
      r = r._next;
    }return r;
  }function pc(t, n) {
    return { name: t, rawVars: 1, init: function init(t, i, e) {
        e._onInit = function (t) {
          var e, r;if (o(i) && (e = {}, ba(i, function (t) {
            return e[t] = 1;
          }), i = e), n) {
            for (r in e = {}, i) {
              e[r] = n(i[r]);
            }i = e;
          }!function _addModifiers(t, e) {
            var r,
                i,
                n,
                a = t._targets;for (r in e) {
              for (i = a.length; i--;) {
                (n = (n = t._ptLookup[i][r]) && n.d) && (n._pt && (n = nc(n, r)), n && n.modifier && n.modifier(e[r], t, a[i], r));
              }
            }
          }(t, i);
        };
      } };
  }var oe = se.registerPlugin({ name: "attr", init: function init(t, e, r, i, n) {
      var a, s;for (a in e) {
        (s = this.add(t, "setAttribute", (t.getAttribute(a) || 0) + "", e[a], i, n, 0, 0, a)) && (s.op = a), this._props.push(a);
      }
    } }, { name: "endArray", init: function init(t, e) {
      for (var r = e.length; r--;) {
        this.add(t, r, t[r] || 0, e[r]);
      }
    } }, pc("roundProps", Ya), pc("modifiers"), pc("snap", Za)) || se;Qt.version = qt.version = oe.version = "3.7.1", l = 1, u() && Dt();function $c(t, e) {
    return e.set(e.t, e.p, Math.round(1e4 * (e.s + e.c * t)) / 1e4 + e.u, e);
  }function _c(t, e) {
    return e.set(e.t, e.p, 1 === t ? e.e : Math.round(1e4 * (e.s + e.c * t)) / 1e4 + e.u, e);
  }function ad(t, e) {
    return e.set(e.t, e.p, t ? Math.round(1e4 * (e.s + e.c * t)) / 1e4 + e.u : e.b, e);
  }function bd(t, e) {
    var r = e.s + e.c * t;e.set(e.t, e.p, ~~(r + (r < 0 ? -.5 : .5)) + e.u, e);
  }function cd(t, e) {
    return e.set(e.t, e.p, t ? e.e : e.b, e);
  }function dd(t, e) {
    return e.set(e.t, e.p, 1 !== t ? e.b : e.e, e);
  }function ed(t, e, r) {
    return t.style[e] = r;
  }function fd(t, e, r) {
    return t.style.setProperty(e, r);
  }function gd(t, e, r) {
    return t._gsap[e] = r;
  }function hd(t, e, r) {
    return t._gsap.scaleX = t._gsap.scaleY = r;
  }function id(t, e, r, i, n) {
    var a = t._gsap;a.scaleX = a.scaleY = r, a.renderTransform(n, a);
  }function jd(t, e, r, i, n) {
    var a = t._gsap;a[e] = r, a.renderTransform(n, a);
  }function nd(t, e) {
    var r = he.createElementNS ? he.createElementNS((e || "http://www.w3.org/1999/xhtml").replace(/^https/, "http"), t) : he.createElement(t);return r.style ? r : he.createElement(t);
  }function od(t, e, r) {
    var i = getComputedStyle(t);return i[e] || i.getPropertyValue(e.replace(Re, "-$1").toLowerCase()) || i.getPropertyValue(e) || !r && od(t, Ve(e) || e, 1) || "";
  }function rd() {
    (function _windowExists() {
      return "undefined" != typeof window;
    })() && window.document && (ue = window, he = ue.document, le = he.documentElement, de = nd("div") || { style: {} }, nd("div"), Ye = Ve(Ye), Xe = Ye + "Origin", de.style.cssText = "border-width:0;line-height:0;position:absolute;padding:0", pe = !!Ve("perspective"), fe = 1);
  }function sd(t) {
    var e,
        r = nd("svg", this.ownerSVGElement && this.ownerSVGElement.getAttribute("xmlns") || "http://www.w3.org/2000/svg"),
        i = this.parentNode,
        n = this.nextSibling,
        a = this.style.cssText;if (le.appendChild(r), r.appendChild(this), this.style.display = "block", t) try {
      e = this.getBBox(), this._gsapBBox = this.getBBox, this.getBBox = sd;
    } catch (t) {} else this._gsapBBox && (e = this._gsapBBox());return i && (n ? i.insertBefore(this, n) : i.appendChild(this)), le.removeChild(r), this.style.cssText = a, e;
  }function td(t, e) {
    for (var r = e.length; r--;) {
      if (t.hasAttribute(e[r])) return t.getAttribute(e[r]);
    }
  }function ud(e) {
    var r;try {
      r = e.getBBox();
    } catch (t) {
      r = sd.call(e, !0);
    }return r && (r.width || r.height) || e.getBBox === sd || (r = sd.call(e, !0)), !r || r.width || r.x || r.y ? r : { x: +td(e, ["x", "cx", "x1"]) || 0, y: +td(e, ["y", "cy", "y1"]) || 0, width: 0, height: 0 };
  }function vd(t) {
    return !(!t.getCTM || t.parentNode && !t.ownerSVGElement || !ud(t));
  }function wd(t, e) {
    if (e) {
      var r = t.style;e in Ie && e !== Xe && (e = Ye), r.removeProperty ? ("ms" !== e.substr(0, 2) && "webkit" !== e.substr(0, 6) || (e = "-" + e), r.removeProperty(e.replace(Re, "-$1").toLowerCase())) : r.removeAttribute(e);
    }
  }function xd(t, e, r, i, n, a) {
    var s = new ae(t._pt, e, r, 0, 1, a ? dd : cd);return (t._pt = s).b = i, s.e = n, t._props.push(r), s;
  }function zd(t, e, r, i) {
    var n,
        a,
        s,
        o,
        u = parseFloat(r) || 0,
        h = (r + "").trim().substr((u + "").length) || "px",
        l = de.style,
        f = Le.test(e),
        d = "svg" === t.tagName.toLowerCase(),
        c = (d ? "client" : "offset") + (f ? "Width" : "Height"),
        p = "px" === i,
        m = "%" === i;return i === h || !u || je[i] || je[h] ? u : ("px" === h || p || (u = zd(t, e, r, "px")), o = t.getCTM && vd(t), !m && "%" !== h || !Ie[e] && !~e.indexOf("adius") ? (l[f ? "width" : "height"] = 100 + (p ? h : i), a = ~e.indexOf("adius") || "em" === i && t.appendChild && !d ? t : t.parentNode, o && (a = (t.ownerSVGElement || {}).parentNode), a && a !== he && a.appendChild || (a = he.body), (s = a._gsap) && m && s.width && f && s.time === St.time ? ca(u / s.width * 100) : (!m && "%" !== h || (l.position = od(t, "position")), a === t && (l.position = "static"), a.appendChild(de), n = de[c], a.removeChild(de), l.position = "absolute", f && m && ((s = _(a)).time = St.time, s.width = a[c]), ca(p ? n * u / 100 : n && u ? 100 / n * u : 0))) : (n = o ? t.getBBox()[f ? "width" : "height"] : t[c], ca(m ? u / n * 100 : u / 100 * n)));
  }function Ad(t, e, r, i) {
    var n;return fe || rd(), e in qe && "transform" !== e && ~(e = qe[e]).indexOf(",") && (e = e.split(",")[0]), Ie[e] && "transform" !== e ? (n = $e(t, i), n = "transformOrigin" !== e ? n[e] : n.svg ? n.origin : Je(od(t, Xe)) + " " + n.zOrigin + "px") : (n = t.style[e]) && "auto" !== n && !i && !~(n + "").indexOf("calc(") || (n = Qe[e] && Qe[e](t, e, r) || od(t, e) || aa(t, e) || ("opacity" === e ? 1 : 0)), r && !~(n + "").trim().indexOf(" ") ? zd(t, e, n, r) + r : n;
  }function Bd(t, e, r, i) {
    if (!r || "none" === r) {
      var n = Ve(e, t, 1),
          a = n && od(t, n, 1);a && a !== r ? (e = n, r = a) : "borderColor" === e && (r = od(t, "borderTopColor"));
    }var s,
        o,
        u,
        h,
        l,
        f,
        d,
        c,
        p,
        _,
        m,
        g,
        v = new ae(this._pt, t.style, e, 0, 1, te),
        y = 0,
        b = 0;if (v.b = r, v.e = i, r += "", "auto" === (i += "") && (t.style[e] = i, i = od(t, e) || i, t.style[e] = r), vb(s = [r, i]), i = s[1], u = (r = s[0]).match(rt) || [], (i.match(rt) || []).length) {
      for (; o = rt.exec(i);) {
        d = o[0], p = i.substring(y, o.index), l ? l = (l + 1) % 5 : "rgba(" !== p.substr(-5) && "hsla(" !== p.substr(-5) || (l = 1), d !== (f = u[b++] || "") && (h = parseFloat(f) || 0, m = f.substr((h + "").length), (g = "=" === d.charAt(1) ? +(d.charAt(0) + "1") : 0) && (d = d.substr(2)), c = parseFloat(d), _ = d.substr((c + "").length), y = rt.lastIndex - _.length, _ || (_ = _ || Y.units[e] || m, y === i.length && (i += _, v.e += _)), m !== _ && (h = zd(t, e, f, _) || 0), v._pt = { _next: v._pt, p: p || 1 === b ? p : ",", s: h, c: g ? g * c : c - h, m: l && l < 4 || "zIndex" === e ? Math.round : 0 });
      }v.c = y < i.length ? i.substring(y, i.length) : "";
    } else v.r = "display" === e && "none" === i ? dd : cd;return nt.test(i) && (v.e = 0), this._pt = v;
  }function Dd(t) {
    var e = t.split(" "),
        r = e[0],
        i = e[1] || "50%";return "top" !== r && "bottom" !== r && "left" !== i && "right" !== i || (t = r, r = i, i = t), e[0] = We[r] || r, e[1] = We[i] || i, e.join(" ");
  }function Ed(t, e) {
    if (e.tween && e.tween._time === e.tween._dur) {
      var r,
          i,
          n,
          a = e.t,
          s = a.style,
          o = e.u,
          u = a._gsap;if ("all" === o || !0 === o) s.cssText = "", i = 1;else for (n = (o = o.split(",")).length; -1 < --n;) {
        r = o[n], Ie[r] && (i = 1, r = "transformOrigin" === r ? Xe : Ye), wd(a, r);
      }i && (wd(a, Ye), u && (u.svg && a.removeAttribute("transform"), $e(a, 1), u.uncache = 1));
    }
  }function Id(t) {
    return "matrix(1, 0, 0, 1, 0, 0)" === t || "none" === t || !t;
  }function Jd(t) {
    var e = od(t, Ye);return Id(e) ? Ge : e.substr(7).match(et).map(ca);
  }function Kd(t, e) {
    var r,
        i,
        n,
        a,
        s = t._gsap || _(t),
        o = t.style,
        u = Jd(t);return s.svg && t.getAttribute("transform") ? "1,0,0,1,0,0" === (u = [(n = t.transform.baseVal.consolidate().matrix).a, n.b, n.c, n.d, n.e, n.f]).join(",") ? Ge : u : (u !== Ge || t.offsetParent || t === le || s.svg || (n = o.display, o.display = "block", (r = t.parentNode) && t.offsetParent || (a = 1, i = t.nextSibling, le.appendChild(t)), u = Jd(t), n ? o.display = n : wd(t, "display"), a && (i ? r.insertBefore(t, i) : r ? r.appendChild(t) : le.removeChild(t))), e && 6 < u.length ? [u[0], u[1], u[4], u[5], u[12], u[13]] : u);
  }function Ld(t, e, r, i, n, a) {
    var s,
        o,
        u,
        h = t._gsap,
        l = n || Kd(t, !0),
        f = h.xOrigin || 0,
        d = h.yOrigin || 0,
        c = h.xOffset || 0,
        p = h.yOffset || 0,
        _ = l[0],
        m = l[1],
        g = l[2],
        v = l[3],
        y = l[4],
        b = l[5],
        T = e.split(" "),
        w = parseFloat(T[0]) || 0,
        x = parseFloat(T[1]) || 0;r ? l !== Ge && (o = _ * v - m * g) && (u = w * (-m / o) + x * (_ / o) - (_ * b - m * y) / o, w = w * (v / o) + x * (-g / o) + (g * b - v * y) / o, x = u) : (w = (s = ud(t)).x + (~T[0].indexOf("%") ? w / 100 * s.width : w), x = s.y + (~(T[1] || T[0]).indexOf("%") ? x / 100 * s.height : x)), i || !1 !== i && h.smooth ? (y = w - f, b = x - d, h.xOffset = c + (y * _ + b * g) - y, h.yOffset = p + (y * m + b * v) - b) : h.xOffset = h.yOffset = 0, h.xOrigin = w, h.yOrigin = x, h.smooth = !!i, h.origin = e, h.originIsAbsolute = !!r, t.style[Xe] = "0px 0px", a && (xd(a, h, "xOrigin", f, w), xd(a, h, "yOrigin", d, x), xd(a, h, "xOffset", c, h.xOffset), xd(a, h, "yOffset", p, h.yOffset)), t.setAttribute("data-svg-origin", w + " " + x);
  }function Od(t, e, r) {
    var i = Pa(e);return ca(parseFloat(e) + parseFloat(zd(t, "x", r + "px", i))) + i;
  }function Vd(t, e, r, i, n, a) {
    var s,
        u,
        h = 360,
        l = o(n),
        f = parseFloat(n) * (l && ~n.indexOf("rad") ? Ee : 1),
        d = a ? f * a : f - i,
        c = i + d + "deg";return l && ("short" === (s = n.split("_")[1]) && (d %= h) !== d % 180 && (d += d < 0 ? h : -h), "cw" === s && d < 0 ? d = (d + 36e9) % h - ~~(d / h) * h : "ccw" === s && 0 < d && (d = (d - 36e9) % h - ~~(d / h) * h)), t._pt = u = new ae(t._pt, e, r, i, d, _c), u.e = c, u.u = "deg", t._props.push(r), u;
  }function Wd(t, e) {
    for (var r in e) {
      t[r] = e[r];
    }return t;
  }function Xd(t, e, r) {
    var i,
        n,
        a,
        s,
        o,
        u,
        h,
        l = Wd({}, r._gsap),
        f = r.style;for (n in l.svg ? (a = r.getAttribute("transform"), r.setAttribute("transform", ""), f[Ye] = e, i = $e(r, 1), wd(r, Ye), r.setAttribute("transform", a)) : (a = getComputedStyle(r)[Ye], f[Ye] = e, i = $e(r, 1), f[Ye] = a), Ie) {
      (a = l[n]) !== (s = i[n]) && "perspective,force3D,transformOrigin,svgOrigin".indexOf(n) < 0 && (o = Pa(a) !== (h = Pa(s)) ? zd(r, n, a, h) : parseFloat(a), u = parseFloat(s), t._pt = new ae(t._pt, i, n, o, u - o, $c), t._pt.u = h || 0, t._props.push(n));
    }Wd(i, l);
  }var ue,
      he,
      le,
      fe,
      de,
      ce,
      pe,
      _e = zt.Power0,
      me = zt.Power1,
      ge = zt.Power2,
      ve = zt.Power3,
      ye = zt.Power4,
      be = zt.Linear,
      Te = zt.Quad,
      we = zt.Cubic,
      xe = zt.Quart,
      Oe = zt.Quint,
      Pe = zt.Strong,
      ke = zt.Elastic,
      Me = zt.Back,
      Ae = zt.SteppedEase,
      Ce = zt.Bounce,
      Se = zt.Sine,
      De = zt.Expo,
      ze = zt.Circ,
      Ie = {},
      Ee = 180 / Math.PI,
      Be = Math.PI / 180,
      Fe = Math.atan2,
      Re = /([A-Z])/g,
      Le = /(?:left|right|width|margin|padding|x)/i,
      Ne = /[\s,\(]\S/,
      qe = { autoAlpha: "opacity,visibility", scale: "scaleX,scaleY", alpha: "opacity" },
      Ye = "transform",
      Xe = Ye + "Origin",
      Ue = "O,Moz,ms,Ms,Webkit".split(","),
      Ve = function _checkPropPrefix(t, e, r) {
    var i = (e || de).style,
        n = 5;if (t in i && !r) return t;for (t = t.charAt(0).toUpperCase() + t.substr(1); n-- && !(Ue[n] + t in i);) {}return n < 0 ? null : (3 === n ? "ms" : 0 <= n ? Ue[n] : "") + t;
  },
      je = { deg: 1, rad: 1, turn: 1 },
      We = { top: "0%", bottom: "100%", left: "0%", right: "100%", center: "50%" },
      Qe = { clearProps: function clearProps(t, e, r, i, n) {
      if ("isFromStart" !== n.data) {
        var a = t._pt = new ae(t._pt, e, r, 0, 0, Ed);return a.u = i, a.pr = -10, a.tween = n, t._props.push(r), 1;
      }
    } },
      Ge = [1, 0, 0, 1, 0, 0],
      Ke = {},
      $e = function _parseTransform(t, e) {
    var r = t._gsap || new Lt(t);if ("x" in r && !e && !r.uncache) return r;var i,
        n,
        a,
        s,
        o,
        u,
        h,
        l,
        f,
        d,
        c,
        p,
        _,
        m,
        g,
        v,
        y,
        b,
        T,
        w,
        x,
        O,
        P,
        k,
        M,
        A,
        C,
        S,
        D,
        z,
        I,
        E,
        B = t.style,
        F = r.scaleX < 0,
        R = "deg",
        L = od(t, Xe) || "0";return i = n = a = u = h = l = f = d = c = 0, s = o = 1, r.svg = !(!t.getCTM || !vd(t)), m = Kd(t, r.svg), r.svg && (k = (!r.uncache || "0px 0px" === L) && !e && t.getAttribute("data-svg-origin"), Ld(t, k || L, !!k || r.originIsAbsolute, !1 !== r.smooth, m)), p = r.xOrigin || 0, _ = r.yOrigin || 0, m !== Ge && (b = m[0], T = m[1], w = m[2], x = m[3], i = O = m[4], n = P = m[5], 6 === m.length ? (s = Math.sqrt(b * b + T * T), o = Math.sqrt(x * x + w * w), u = b || T ? Fe(T, b) * Ee : 0, (f = w || x ? Fe(w, x) * Ee + u : 0) && (o *= Math.abs(Math.cos(f * Be))), r.svg && (i -= p - (p * b + _ * w), n -= _ - (p * T + _ * x))) : (E = m[6], z = m[7], C = m[8], S = m[9], D = m[10], I = m[11], i = m[12], n = m[13], a = m[14], h = (g = Fe(E, D)) * Ee, g && (k = O * (v = Math.cos(-g)) + C * (y = Math.sin(-g)), M = P * v + S * y, A = E * v + D * y, C = O * -y + C * v, S = P * -y + S * v, D = E * -y + D * v, I = z * -y + I * v, O = k, P = M, E = A), l = (g = Fe(-w, D)) * Ee, g && (v = Math.cos(-g), I = x * (y = Math.sin(-g)) + I * v, b = k = b * v - C * y, T = M = T * v - S * y, w = A = w * v - D * y), u = (g = Fe(T, b)) * Ee, g && (k = b * (v = Math.cos(g)) + T * (y = Math.sin(g)), M = O * v + P * y, T = T * v - b * y, P = P * v - O * y, b = k, O = M), h && 359.9 < Math.abs(h) + Math.abs(u) && (h = u = 0, l = 180 - l), s = ca(Math.sqrt(b * b + T * T + w * w)), o = ca(Math.sqrt(P * P + E * E)), g = Fe(O, P), f = 2e-4 < Math.abs(g) ? g * Ee : 0, c = I ? 1 / (I < 0 ? -I : I) : 0), r.svg && (k = t.getAttribute("transform"), r.forceCSS = t.setAttribute("transform", "") || !Id(od(t, Ye)), k && t.setAttribute("transform", k))), 90 < Math.abs(f) && Math.abs(f) < 270 && (F ? (s *= -1, f += u <= 0 ? 180 : -180, u += u <= 0 ? 180 : -180) : (o *= -1, f += f <= 0 ? 180 : -180)), r.x = i - ((r.xPercent = i && (r.xPercent || (Math.round(t.offsetWidth / 2) === Math.round(-i) ? -50 : 0))) ? t.offsetWidth * r.xPercent / 100 : 0) + "px", r.y = n - ((r.yPercent = n && (r.yPercent || (Math.round(t.offsetHeight / 2) === Math.round(-n) ? -50 : 0))) ? t.offsetHeight * r.yPercent / 100 : 0) + "px", r.z = a + "px", r.scaleX = ca(s), r.scaleY = ca(o), r.rotation = ca(u) + R, r.rotationX = ca(h) + R, r.rotationY = ca(l) + R, r.skewX = f + R, r.skewY = d + R, r.transformPerspective = c + "px", (r.zOrigin = parseFloat(L.split(" ")[2]) || 0) && (B[Xe] = Je(L)), r.xOffset = r.yOffset = 0, r.force3D = Y.force3D, r.renderTransform = r.svg ? ir : pe ? rr : Ze, r.uncache = 0, r;
  },
      Je = function _firstTwoOnly(t) {
    return (t = t.split(" "))[0] + " " + t[1];
  },
      Ze = function _renderNon3DTransforms(t, e) {
    e.z = "0px", e.rotationY = e.rotationX = "0deg", e.force3D = 0, rr(t, e);
  },
      He = "0deg",
      tr = "0px",
      er = ") ",
      rr = function _renderCSSTransforms(t, e) {
    var r = e || this,
        i = r.xPercent,
        n = r.yPercent,
        a = r.x,
        s = r.y,
        o = r.z,
        u = r.rotation,
        h = r.rotationY,
        l = r.rotationX,
        f = r.skewX,
        d = r.skewY,
        c = r.scaleX,
        p = r.scaleY,
        _ = r.transformPerspective,
        m = r.force3D,
        g = r.target,
        v = r.zOrigin,
        y = "",
        b = "auto" === m && t && 1 !== t || !0 === m;if (v && (l !== He || h !== He)) {
      var T,
          w = parseFloat(h) * Be,
          x = Math.sin(w),
          O = Math.cos(w);w = parseFloat(l) * Be, T = Math.cos(w), a = Od(g, a, x * T * -v), s = Od(g, s, -Math.sin(w) * -v), o = Od(g, o, O * T * -v + v);
    }_ !== tr && (y += "perspective(" + _ + er), (i || n) && (y += "translate(" + i + "%, " + n + "%) "), !b && a === tr && s === tr && o === tr || (y += o !== tr || b ? "translate3d(" + a + ", " + s + ", " + o + ") " : "translate(" + a + ", " + s + er), u !== He && (y += "rotate(" + u + er), h !== He && (y += "rotateY(" + h + er), l !== He && (y += "rotateX(" + l + er), f === He && d === He || (y += "skew(" + f + ", " + d + er), 1 === c && 1 === p || (y += "scale(" + c + ", " + p + er), g.style[Ye] = y || "translate(0, 0)";
  },
      ir = function _renderSVGTransforms(t, e) {
    var r,
        i,
        n,
        a,
        s,
        o = e || this,
        u = o.xPercent,
        h = o.yPercent,
        l = o.x,
        f = o.y,
        d = o.rotation,
        c = o.skewX,
        p = o.skewY,
        _ = o.scaleX,
        m = o.scaleY,
        g = o.target,
        v = o.xOrigin,
        y = o.yOrigin,
        b = o.xOffset,
        T = o.yOffset,
        w = o.forceCSS,
        x = parseFloat(l),
        O = parseFloat(f);d = parseFloat(d), c = parseFloat(c), (p = parseFloat(p)) && (c += p = parseFloat(p), d += p), d || c ? (d *= Be, c *= Be, r = Math.cos(d) * _, i = Math.sin(d) * _, n = Math.sin(d - c) * -m, a = Math.cos(d - c) * m, c && (p *= Be, s = Math.tan(c - p), n *= s = Math.sqrt(1 + s * s), a *= s, p && (s = Math.tan(p), r *= s = Math.sqrt(1 + s * s), i *= s)), r = ca(r), i = ca(i), n = ca(n), a = ca(a)) : (r = _, a = m, i = n = 0), (x && !~(l + "").indexOf("px") || O && !~(f + "").indexOf("px")) && (x = zd(g, "x", l, "px"), O = zd(g, "y", f, "px")), (v || y || b || T) && (x = ca(x + v - (v * r + y * n) + b), O = ca(O + y - (v * i + y * a) + T)), (u || h) && (s = g.getBBox(), x = ca(x + u / 100 * s.width), O = ca(O + h / 100 * s.height)), s = "matrix(" + r + "," + i + "," + n + "," + a + "," + x + "," + O + ")", g.setAttribute("transform", s), w && (g.style[Ye] = s);
  };ba("padding,margin,Width,Radius", function (e, r) {
    var t = "Right",
        i = "Bottom",
        n = "Left",
        o = (r < 3 ? ["Top", t, i, n] : ["Top" + n, "Top" + t, i + t, i + n]).map(function (t) {
      return r < 2 ? e + t : "border" + t + e;
    });Qe[1 < r ? "border" + e : e] = function (e, t, r, i, n) {
      var a, s;if (arguments.length < 4) return a = o.map(function (t) {
        return Ad(e, t, r);
      }), 5 === (s = a.join(" ")).split(a[0]).length ? a[0] : s;a = (i + "").split(" "), s = {}, o.forEach(function (t, e) {
        return s[t] = a[e] = a[e] || a[(e - 1) / 2 | 0];
      }), e.init(t, s, n);
    };
  });var nr,
      ar,
      sr,
      or = { name: "css", register: rd, targetTest: function targetTest(t) {
      return t.style && t.nodeType;
    }, init: function init(t, e, r, i, n) {
      var a,
          s,
          o,
          u,
          h,
          l,
          f,
          d,
          c,
          p,
          _,
          m,
          g,
          v,
          y,
          b = this._props,
          T = t.style,
          w = r.vars.startAt;for (f in fe || rd(), e) {
        if ("autoRound" !== f && (s = e[f], !ft[f] || !Sb(f, e, r, i, t, n))) if (h = typeof s === "undefined" ? "undefined" : _typeof(s), l = Qe[f], "function" === h && (h = _typeof(s = s.call(r, i, t, n))), "string" === h && ~s.indexOf("random(") && (s = fb(s)), l) l(this, t, f, s, r) && (y = 1);else if ("--" === f.substr(0, 2)) a = (getComputedStyle(t).getPropertyValue(f) + "").trim(), s += "", At.lastIndex = 0, At.test(a) || (d = Pa(a), c = Pa(s)), c ? d !== c && (a = zd(t, f, a, c) + c) : d && (s += d), this.add(T, "setProperty", a, s, i, n, 0, 0, f), b.push(f);else if ("undefined" !== h) {
          if (w && f in w ? (a = "function" == typeof w[f] ? w[f].call(r, i, t, n) : w[f], f in Y.units && !Pa(a) && (a += Y.units[f]), "=" === (a + "").charAt(1) && (a = Ad(t, f))) : a = Ad(t, f), u = parseFloat(a), (p = "string" === h && "=" === s.charAt(1) ? +(s.charAt(0) + "1") : 0) && (s = s.substr(2)), o = parseFloat(s), f in qe && ("autoAlpha" === f && (1 === u && "hidden" === Ad(t, "visibility") && o && (u = 0), xd(this, T, "visibility", u ? "inherit" : "hidden", o ? "inherit" : "hidden", !o)), "scale" !== f && "transform" !== f && ~(f = qe[f]).indexOf(",") && (f = f.split(",")[0])), _ = f in Ie) {
            if (m || ((g = t._gsap).renderTransform && !e.parseTransform || $e(t, e.parseTransform), v = !1 !== e.smoothOrigin && g.smooth, (m = this._pt = new ae(this._pt, T, Ye, 0, 1, g.renderTransform, g, 0, -1)).dep = 1), "scale" === f) this._pt = new ae(this._pt, g, "scaleY", g.scaleY, (p ? p * o : o - g.scaleY) || 0), b.push("scaleY", f), f += "X";else {
              if ("transformOrigin" === f) {
                s = Dd(s), g.svg ? Ld(t, s, 0, v, 0, this) : ((c = parseFloat(s.split(" ")[2]) || 0) !== g.zOrigin && xd(this, g, "zOrigin", g.zOrigin, c), xd(this, T, f, Je(a), Je(s)));continue;
              }if ("svgOrigin" === f) {
                Ld(t, s, 1, v, 0, this);continue;
              }if (f in Ke) {
                Vd(this, g, f, u, s, p);continue;
              }if ("smoothOrigin" === f) {
                xd(this, g, "smooth", g.smooth, s);continue;
              }if ("force3D" === f) {
                g[f] = s;continue;
              }if ("transform" === f) {
                Xd(this, s, t);continue;
              }
            }
          } else f in T || (f = Ve(f) || f);if (_ || (o || 0 === o) && (u || 0 === u) && !Ne.test(s) && f in T) o = o || 0, (d = (a + "").substr((u + "").length)) !== (c = Pa(s) || (f in Y.units ? Y.units[f] : d)) && (u = zd(t, f, a, c)), this._pt = new ae(this._pt, _ ? g : T, f, u, p ? p * o : o - u, _ || "px" !== c && "zIndex" !== f || !1 === e.autoRound ? $c : bd), this._pt.u = c || 0, d !== c && (this._pt.b = a, this._pt.r = ad);else if (f in T) Bd.call(this, t, f, a, s);else {
            if (!(f in t)) {
              N(f, s);continue;
            }this.add(t, f, a || t[f], s, i, n);
          }b.push(f);
        }
      }y && ne(this);
    }, get: Ad, aliases: qe, getSetter: function getSetter(t, e, i) {
      var n = qe[e];return n && n.indexOf(",") < 0 && (e = n), e in Ie && e !== Xe && (t._gsap.x || Ad(t, "x")) ? i && ce === i ? "scale" === e ? hd : gd : (ce = i || {}) && ("scale" === e ? id : jd) : t.style && !r(t.style[e]) ? ed : ~e.indexOf("-") ? fd : Jt(t, e);
    }, core: { _removeProperty: wd, _getMatrix: Kd } };oe.utils.checkPrefix = Ve, sr = ba((nr = "x,y,z,scale,scaleX,scaleY,xPercent,yPercent") + "," + (ar = "rotation,rotationX,rotationY,skewX,skewY") + ",transform,transformOrigin,svgOrigin,force3D,smoothOrigin,transformPerspective", function (t) {
    Ie[t] = 1;
  }), ba(ar, function (t) {
    Y.units[t] = "deg", Ke[t] = 1;
  }), qe[sr[13]] = nr + "," + ar, ba("0:translateX,1:translateY,2:translateZ,8:rotate,8:rotationZ,8:rotateZ,9:rotateX,10:rotateY", function (t) {
    var e = t.split(":");qe[e[1]] = sr[e[0]];
  }), ba("x,y,z,top,right,bottom,left,width,height,fontSize,padding,margin,perspective", function (t) {
    Y.units[t] = "px";
  }), oe.registerPlugin(or);var ur = oe.registerPlugin(or) || oe,
      hr = ur.core.Tween;e.Back = Me, e.Bounce = Ce, e.CSSPlugin = or, e.Circ = ze, e.Cubic = we, e.Elastic = ke, e.Expo = De, e.Linear = be, e.Power0 = _e, e.Power1 = me, e.Power2 = ge, e.Power3 = ve, e.Power4 = ye, e.Quad = Te, e.Quart = xe, e.Quint = Oe, e.Sine = Se, e.SteppedEase = Ae, e.Strong = Pe, e.TimelineLite = qt, e.TimelineMax = qt, e.TweenLite = Qt, e.TweenMax = hr, e.default = ur, e.gsap = ur;if (typeof window === "undefined" || window !== e) {
    Object.defineProperty(e, "__esModule", { value: !0 });
  } else {
    delete e.default;
  }
});

/***/ }),

/***/ 1732:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/*!
 * ScrollTrigger 3.7.1
 * https://greensock.com
 * 
 * @license Copyright 2021, GreenSock. All rights reserved.
 * Subject to the terms at https://greensock.com/standard-license or for Club GreenSock members, the agreement issued with that membership.
 * @author: Jack Doyle, jack@greensock.com
 */

!function (e, t) {
  "object" == ( false ? "undefined" : _typeof(exports)) && "undefined" != typeof module ? t(exports) :  true ? !(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports], __WEBPACK_AMD_DEFINE_FACTORY__ = (t),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) : t((e = e || self).window = e.window || {});
}(undefined, function (e) {
  "use strict";
  function J(e) {
    return e;
  }function K(e) {
    return Math.round(1e5 * e) / 1e5 || 0;
  }function L() {
    return "undefined" != typeof window;
  }function M() {
    return Se || L() && (Se = window.gsap) && Se.registerPlugin && Se;
  }function N(e) {
    return !!~o.indexOf(e);
  }function O(e, t) {
    return ~Fe.indexOf(e) && Fe[Fe.indexOf(e) + 1][t];
  }function P(t, e) {
    var r = e.s,
        n = e.sc,
        o = v.indexOf(t),
        i = n === ot.sc ? 1 : 2;return ~o || (o = v.push(t) - 1), v[o + i] || (v[o + i] = O(t, r) || (N(t) ? n : function (e) {
      return arguments.length ? t[r] = e : t[r];
    }));
  }function Q(e) {
    return O(e, "getBoundingClientRect") || (N(e) ? function () {
      return pt.width = Me.innerWidth, pt.height = Me.innerHeight, pt;
    } : function () {
      return it(e);
    });
  }function T(e, t) {
    var r = t.s,
        n = t.d2,
        o = t.d,
        i = t.a;return (r = "scroll" + n) && (i = O(e, r)) ? i() - Q(e)()[o] : N(e) ? Math.max(_e[r], Pe[r]) - (Me["inner" + n] || _e["client" + n] || Pe["client" + n]) : e[r] - e["offset" + n];
  }function U(e, t) {
    for (var r = 0; r < d.length; r += 3) {
      t && !~t.indexOf(d[r + 1]) || e(d[r], d[r + 1], d[r + 2]);
    }
  }function V(e) {
    return "string" == typeof e;
  }function W(e) {
    return "function" == typeof e;
  }function X(e) {
    return "number" == typeof e;
  }function Y(e) {
    return "object" == (typeof e === "undefined" ? "undefined" : _typeof(e));
  }function Z(e) {
    return W(e) && e();
  }function $(r, n) {
    return function () {
      var e = Z(r),
          t = Z(n);return function () {
        Z(e), Z(t);
      };
    };
  }function ta(e) {
    return Me.getComputedStyle(e);
  }function va(e, t) {
    for (var r in t) {
      r in e || (e[r] = t[r]);
    }return e;
  }function xa(e, t) {
    var r = t.d2;return e["offset" + r] || e["client" + r] || 0;
  }function ya(e) {
    var t,
        r = [],
        n = e.labels,
        o = e.duration();for (t in n) {
      r.push(n[t] / o);
    }return r;
  }function Ba(t, r, e, n) {
    return e.split(",").forEach(function (e) {
      return t(r, e, n);
    });
  }function Ca(e, t, r) {
    return e.addEventListener(t, r, { passive: !0 });
  }function Da(e, t, r) {
    return e.removeEventListener(t, r);
  }function Ha(e, t) {
    if (V(e)) {
      var r = e.indexOf("="),
          n = ~r ? (e.charAt(r - 1) + 1) * parseFloat(e.substr(r + 1)) : 0;~r && (e.indexOf("%") > r && (n *= t / 100), e = e.substr(0, r - 1)), e = n + (e in C ? C[e] * t : ~e.indexOf("%") ? parseFloat(e) * t / 100 : parseFloat(e) || 0);
    }return e;
  }function Ia(e, t, r, n, o, i, a) {
    var s = o.startColor,
        l = o.endColor,
        c = o.fontSize,
        u = o.indent,
        f = o.fontWeight,
        p = ke.createElement("div"),
        d = N(r) || "fixed" === O(r, "pinType"),
        g = -1 !== e.indexOf("scroller"),
        h = d ? Pe : r,
        v = -1 !== e.indexOf("start"),
        m = v ? s : l,
        b = "border-color:" + m + ";font-size:" + c + ";color:" + m + ";font-weight:" + f + ";pointer-events:none;white-space:nowrap;font-family:sans-serif,Arial;z-index:1000;padding:4px 8px;border-width:0;border-style:solid;";return b += "position:" + (g && d ? "fixed;" : "absolute;"), !g && d || (b += (n === ot ? x : y) + ":" + (i + parseFloat(u)) + "px;"), a && (b += "box-sizing:border-box;text-align:left;width:" + a.offsetWidth + "px;"), p._isStart = v, p.setAttribute("class", "gsap-marker-" + e), p.style.cssText = b, p.innerText = t || 0 === t ? e + "-" + t : e, h.children[0] ? h.insertBefore(p, h.children[0]) : h.appendChild(p), p._offset = p["offset" + n.op.d2], S(p, 0, n, v), p;
  }function Ma() {
    return l = l || s(F);
  }function Na() {
    l || (l = s(F), je || A("scrollStart"), je = He());
  }function Oa() {
    return !Be && !r && !ke.fullscreenElement && a.restart(!0);
  }function Ua(e) {
    var t,
        r = Se.ticker.frame,
        n = [],
        o = 0;if (g !== r || De) {
      for (R(); o < E.length; o += 4) {
        (t = Me.matchMedia(E[o]).matches) !== E[o + 3] && ((E[o + 3] = t) ? n.push(o) : R(1, E[o]) || W(E[o + 2]) && E[o + 2]());
      }for (I(), o = 0; o < n.length; o++) {
        t = n[o], Ve = E[t], E[t + 2] = E[t + 1](e);
      }Ve = 0, i && z(0, 1), g = r, A("matchMedia");
    }
  }function Va() {
    return Da(ee, "scrollEnd", Va) || z(!0);
  }function gb(e, t, r, n) {
    if (e.parentNode !== t) {
      for (var o, i = H.length, a = t.style, s = e.style; i--;) {
        a[o = H[i]] = r[o];
      }a.position = "absolute" === r.position ? "absolute" : "relative", "inline" === r.display && (a.display = "inline-block"), s[y] = s[x] = "auto", a.overflow = "visible", a.boxSizing = "border-box", a[Xe] = xa(e, nt) + rt, a[Ze] = xa(e, ot) + rt, a[Ge] = s[et] = s.top = s[b] = "0", ft(n), s[Xe] = s.maxWidth = r[Xe], s[Ze] = s.maxHeight = r[Ze], s[Ge] = r[Ge], e.parentNode.insertBefore(t, e), t.appendChild(e);
    }
  }function jb(e) {
    for (var t = j.length, r = e.style, n = [], o = 0; o < t; o++) {
      n.push(j[o], r[j[o]]);
    }return n.t = e, n;
  }function mb(e, t, r, n, o, i, a, s, l, c, u, f) {
    if (W(e) && (e = e(s)), V(e) && "max" === e.substr(0, 3) && (e = f + ("=" === e.charAt(4) ? Ha("0" + e.substr(3), r) : 0)), X(e)) a && S(a, r, n, !0);else {
      W(t) && (t = t(s));var p,
          d,
          g,
          h = Ee(t)[0] || Pe,
          v = it(h) || {},
          m = e.split(" ");v && (v.left || v.top) || "none" !== ta(h).display || (g = h.style.display, h.style.display = "block", v = it(h), g ? h.style.display = g : h.style.removeProperty("display")), p = Ha(m[0], v[n.d]), d = Ha(m[1] || "0", r), e = v[n.p] - l[n.p] - c + p + o - d, a && S(a, d, n, r - d < 20 || a._isStart && 20 < d), r -= r - d;
    }if (i) {
      var b = e + r,
          x = i._isStart;f = "scroll" + n.d2, S(i, b, n, x && 20 < b || !x && (u ? Math.max(Pe[f], _e[f]) : i.parentNode[f]) <= b + 1), u && (l = it(a), u && (i.style[n.op.p] = l[n.op.p] - n.op.m - i._offset + rt));
    }return Math.round(e);
  }function ob(e, t, r, n) {
    if (e.parentNode !== t) {
      var o,
          i,
          a = e.style;if (t === Pe) {
        for (o in e._stOrig = a.cssText, i = ta(e)) {
          +o || G.test(o) || !i[o] || "string" != typeof a[o] || "0" === o || (a[o] = i[o]);
        }a.top = r, a.left = n;
      } else a.cssText = e._stOrig;Se.core.getCache(e).uncache = 1, t.appendChild(e);
    }
  }function pb(l, e) {
    function Ye(e, t, r, n, o) {
      var i = Ye.tween,
          a = t.onComplete,
          s = {};return i && i.kill(), c = Math.round(r), t[p] = e, (t.modifiers = s)[p] = function (e) {
        return (e = K(f())) !== c && e !== u && 2 < Math.abs(e - c) ? (i.kill(), Ye.tween = 0) : e = r + n * i.ratio + o * i.ratio * i.ratio, u = c, c = K(e);
      }, t.onComplete = function () {
        Ye.tween = 0, a && a.call(i);
      }, i = Ye.tween = Se.to(l, t);
    }var c,
        u,
        f = P(l, e),
        p = "_scroll" + e.p2;return l[p] = f, l.addEventListener("wheel", function () {
      return Ye.tween && Ye.tween.kill() && (Ye.tween = 0);
    }, { passive: !0 }), Ye;
  }var Se,
      i,
      Me,
      ke,
      _e,
      Pe,
      o,
      a,
      s,
      l,
      Ee,
      Ne,
      Ae,
      c,
      Be,
      Ie,
      u,
      Le,
      f,
      p,
      d,
      Re,
      ze,
      r,
      We,
      Ve,
      g,
      h,
      De = 1,
      Fe = [],
      v = [],
      He = Date.now,
      m = He(),
      je = 0,
      Ue = 1,
      Je = Math.abs,
      t = "scrollLeft",
      n = "scrollTop",
      b = "left",
      x = "right",
      y = "bottom",
      Xe = "width",
      Ze = "height",
      qe = "Right",
      $e = "Left",
      Ke = "Top",
      Qe = "Bottom",
      Ge = "padding",
      et = "margin",
      tt = "Width",
      w = "Height",
      rt = "px",
      nt = { s: t, p: b, p2: $e, os: x, os2: qe, d: Xe, d2: tt, a: "x", sc: function sc(e) {
      return arguments.length ? Me.scrollTo(e, ot.sc()) : Me.pageXOffset || ke[t] || _e[t] || Pe[t] || 0;
    } },
      ot = { s: n, p: "top", p2: Ke, os: y, os2: Qe, d: Ze, d2: w, a: "y", op: nt, sc: function sc(e) {
      return arguments.length ? Me.scrollTo(nt.sc(), e) : Me.pageYOffset || ke[n] || _e[n] || Pe[n] || 0;
    } },
      it = function _getBounds(e, t) {
    var r = t && "matrix(1, 0, 0, 1, 0, 0)" !== ta(e)[u] && Se.to(e, { x: 0, y: 0, xPercent: 0, yPercent: 0, rotation: 0, rotationX: 0, rotationY: 0, scale: 1, skewX: 0, skewY: 0 }).progress(1),
        n = e.getBoundingClientRect();return r && r.progress(0).kill(), n;
  },
      at = { startColor: "green", endColor: "red", indent: 0, fontSize: "16px", fontWeight: "normal" },
      st = { toggleActions: "play", anticipatePin: 0 },
      C = { top: 0, left: 0, center: .5, bottom: 1, right: 1 },
      S = function _positionMarker(e, t, r, n) {
    var o = { display: "block" },
        i = r[n ? "os2" : "p2"],
        a = r[n ? "p2" : "os2"];e._isFlipped = n, o[r.a + "Percent"] = n ? -100 : 0, o[r.a] = n ? "1px" : 0, o["border" + i + tt] = 1, o["border" + a + tt] = 0, o[r.p] = t + "px", Se.set(e, o);
  },
      lt = [],
      ct = {},
      k = {},
      _ = [],
      E = [],
      A = function _dispatch(e) {
    return k[e] && k[e].map(function (e) {
      return e();
    }) || _;
  },
      B = [],
      I = function _revertRecorded(e) {
    for (var t = 0; t < B.length; t += 5) {
      e && B[t + 4] !== e || (B[t].style.cssText = B[t + 1], B[t].getBBox && B[t].setAttribute("transform", B[t + 2] || ""), B[t + 3].uncache = 1);
    }
  },
      R = function _revertAll(e, t) {
    var r;for (Le = 0; Le < lt.length; Le++) {
      r = lt[Le], t && r.media !== t || (e ? r.kill(1) : r.revert());
    }t && I(t), t || A("revert");
  },
      z = function _refreshAll(e, t) {
    if (!je || e) {
      h = !0;var r = A("refreshInit");Re && ee.sort(), t || R(), lt.forEach(function (e) {
        return e.refresh();
      }), r.forEach(function (e) {
        return e && e.render && e.render(-1);
      }), v.forEach(function (e) {
        return "function" == typeof e && (e.rec = 0);
      }), a.pause(), h = !1, A("refresh");
    } else Ca(ee, "scrollEnd", Va);
  },
      D = 0,
      ut = 1,
      F = function _updateAll() {
    if (!h) {
      var e = lt.length,
          t = He(),
          r = 50 <= t - m,
          n = e && lt[0].scroll();if (ut = n < D ? -1 : 1, D = n, r && (je && !Ie && 200 < t - je && (je = 0, A("scrollEnd")), Ae = m, m = t), ut < 0) {
        for (Le = e; 0 < Le--;) {
          lt[Le] && lt[Le].update(0, r);
        }ut = 1;
      } else for (Le = 0; Le < e; Le++) {
        lt[Le] && lt[Le].update(0, r);
      }l = 0;
    }
  },
      H = [b, "top", y, x, et + Qe, et + qe, et + Ke, et + $e, "display", "flexShrink", "float", "zIndex", "grid-column-start", "grid-column-end", "grid-row-start", "grid-row-end", "grid-area", "justify-self", "align-self", "place-self"],
      j = H.concat([Xe, Ze, "boxSizing", "max" + tt, "max" + w, "position", et, Ge, Ge + Ke, Ge + qe, Ge + Qe, Ge + $e]),
      q = /([A-Z])/g,
      ft = function _setState(e) {
    if (e) {
      var t,
          r,
          n = e.t.style,
          o = e.length,
          i = 0;for ((e.t._gsap || Se.core.getCache(e.t)).uncache = 1; i < o; i += 2) {
        r = e[i + 1], t = e[i], r ? n[t] = r : n[t] && n.removeProperty(t.replace(q, "-$1").toLowerCase());
      }
    }
  },
      pt = { left: 0, top: 0 },
      G = /(?:webkit|moz|length|cssText|inset)/i;nt.op = ot;var ee = (ScrollTrigger.prototype.init = function init(S, M) {
    if (this.progress = this.start = 0, this.vars && this.kill(1), Ue) {
      var d,
          n,
          f,
          k,
          _,
          E,
          A,
          B,
          I,
          L,
          R,
          e,
          z,
          D,
          F,
          H,
          j,
          t,
          U,
          g,
          Z,
          q,
          h,
          $,
          v,
          m,
          r,
          b,
          x,
          K,
          o,
          p,
          y,
          G,
          ee,
          te,
          re = (S = va(V(S) || X(S) || S.nodeType ? { trigger: S } : S, st)).horizontal ? nt : ot,
          w = S.onUpdate,
          C = S.toggleClass,
          i = S.id,
          ne = S.onToggle,
          oe = S.onRefresh,
          a = S.scrub,
          ie = S.trigger,
          ae = S.pin,
          se = S.pinSpacing,
          le = S.invalidateOnRefresh,
          ce = S.anticipatePin,
          s = S.onScrubComplete,
          ue = S.onSnapComplete,
          fe = S.once,
          pe = S.snap,
          de = S.pinReparent,
          ge = !a && 0 !== a,
          he = Ee(S.scroller || Me)[0],
          l = Se.core.getCache(he),
          ve = N(he),
          me = "pinType" in S ? "fixed" === S.pinType : ve || "fixed" === O(he, "pinType"),
          be = [S.onEnter, S.onLeave, S.onEnterBack, S.onLeaveBack],
          xe = ge && S.toggleActions.split(" "),
          c = "markers" in S ? S.markers : st.markers,
          ye = ve ? 0 : parseFloat(ta(he)["border" + re.p2 + tt]) || 0,
          we = this,
          u = S.onRefreshInit && function () {
        return S.onRefreshInit(we);
      },
          Ce = function _getSizeFunc(e, t, r) {
        var n = r.d,
            o = r.d2,
            i = r.a;return (i = O(e, "getBoundingClientRect")) ? function () {
          return i()[n];
        } : function () {
          return (t ? Me["inner" + o] : e["client" + o]) || 0;
        };
      }(he, ve, re),
          Te = function _getOffsetsFunc(e, t) {
        return !t || ~Fe.indexOf(e) ? Q(e) : function () {
          return pt;
        };
      }(he, ve),
          Oe = 0;we.media = Ve, ce *= 45, we.scroller = he, we.scroll = P(he, re), k = we.scroll(), we.vars = S, M = M || S.animation, "refreshPriority" in S && (Re = 1), l.tweenScroll = l.tweenScroll || { top: pb(he, ot), left: pb(he, nt) }, we.tweenTo = d = l.tweenScroll[re.p], M && (M.vars.lazy = !1, M._initted || !1 !== M.vars.immediateRender && !1 !== S.immediateRender && M.render(0, !0, !0), we.animation = M.pause(), M.scrollTrigger = we, (o = X(a) && a) && (K = Se.to(M, { ease: "power3", duration: o, onComplete: function onComplete() {
          return s && s(we);
        } })), b = 0, i = i || M.vars.id), lt.push(we), pe && (Y(pe) && !pe.push || (pe = { snapTo: pe }), "scrollBehavior" in Pe.style && Se.set(ve ? [Pe, _e] : he, { scrollBehavior: "auto" }), f = W(pe.snapTo) ? pe.snapTo : "labels" === pe.snapTo ? function _getClosestLabel(t) {
        return function (e) {
          return Se.utils.snap(ya(t), e);
        };
      }(M) : "labelsDirectional" === pe.snapTo ? function _getLabelAtDirection(o) {
        return function (e, t) {
          var r,
              n = ya(o);if (n.sort(function (e, t) {
            return e - t;
          }), 0 < t.direction) {
            for (e -= 1e-4, r = 0; r < n.length; r++) {
              if (n[r] >= e) return n[r];
            }return n.pop();
          }for (r = n.length, e += 1e-4; r--;) {
            if (n[r] <= e) return n[r];
          }return n[0];
        };
      }(M) : Se.utils.snap(pe.snapTo), p = pe.duration || { min: .1, max: 2 }, p = Y(p) ? Ne(p.min, p.max) : Ne(p, p), y = Se.delayedCall(pe.delay || o / 2 || .1, function () {
        if (Math.abs(we.getVelocity()) < 10 && !Ie && Oe !== we.scroll()) {
          var e = M && !ge ? M.totalProgress() : we.progress,
              t = (e - x) / (He() - Ae) * 1e3 || 0,
              r = Se.utils.clamp(-we.progress, 1 - we.progress, Je(t / 2) * t / .185),
              n = we.progress + (!1 === pe.inertia ? 0 : r),
              o = Ne(0, 1, f(n, we)),
              i = we.scroll(),
              a = Math.round(E + o * z),
              s = pe.onStart,
              l = pe.onInterrupt,
              c = pe.onComplete,
              u = d.tween;if (i <= A && E <= i && a !== i) {
            if (u && !u._initted && u.data <= Math.abs(a - i)) return;!1 === pe.inertia && (r = o - we.progress), d(a, { duration: p(Je(.185 * Math.max(Je(n - e), Je(o - e)) / t / .05 || 0)), ease: pe.ease || "power3", data: Math.abs(a - i), onInterrupt: function onInterrupt() {
                return y.restart(!0) && l && l(we);
              }, onComplete: function onComplete() {
                Oe = we.scroll(), b = x = M && !ge ? M.totalProgress() : we.progress, ue && ue(we), c && c(we);
              } }, i, r * z, a - i - r * z), s && s(we, d.tween);
          }
        } else we.isActive && y.restart(!0);
      }).pause()), i && (ct[i] = we), ie = we.trigger = Ee(ie || ae)[0], ae = !0 === ae ? ie : Ee(ae)[0], V(C) && (C = { targets: ie, className: C }), ae && (!1 === se || se === et || (se = !(!se && "flex" === ta(ae.parentNode).display) && Ge), we.pin = ae, !1 !== S.force3D && Se.set(ae, { force3D: !0 }), (n = Se.core.getCache(ae)).spacer ? D = n.pinState : (n.spacer = j = ke.createElement("div"), j.setAttribute("class", "pin-spacer" + (i ? " pin-spacer-" + i : "")), n.pinState = D = jb(ae)), we.spacer = j = n.spacer, r = ta(ae), h = r[se + re.os2], U = Se.getProperty(ae), g = Se.quickSetter(ae, re.a, rt), gb(ae, j, r), H = jb(ae)), c && (e = Y(c) ? va(c, at) : at, L = Ia("scroller-start", i, he, re, e, 0), R = Ia("scroller-end", i, he, re, e, 0, L), t = L["offset" + re.op.d2], B = Ia("start", i, he, re, e, t), I = Ia("end", i, he, re, e, t), me || Fe.length && !0 === O(he, "fixedMarkers") || (function _makePositionable(e) {
        var t = ta(e).position;e.style.position = "absolute" === t || "fixed" === t ? t : "relative";
      }(ve ? Pe : he), Se.set([L, R], { force3D: !0 }), v = Se.quickSetter(L, re.a, rt), m = Se.quickSetter(R, re.a, rt))), we.revert = function (e) {
        var t = !1 !== e || !we.enabled,
            r = Be;t !== we.isReverted && (t && (we.scroll.rec || (we.scroll.rec = we.scroll()), ee = Math.max(we.scroll(), we.scroll.rec || 0), G = we.progress, te = M && M.progress()), B && [B, I, L, R].forEach(function (e) {
          return e.style.display = t ? "none" : "block";
        }), t && (Be = 1), we.update(t), Be = r, ae && (t ? function _swapPinOut(e, t, r) {
          if (ft(r), e.parentNode === t) {
            var n = t.parentNode;n && (n.insertBefore(e, t), n.removeChild(t));
          }
        }(ae, j, D) : de && we.isActive || gb(ae, j, ta(ae), $)), we.isReverted = t);
      }, we.refresh = function (e, t) {
        if (!Be && we.enabled || t) if (ae && e && je) Ca(ScrollTrigger, "scrollEnd", Va);else {
          Be = 1, K && K.pause(), le && M && M.progress(0).invalidate(), we.isReverted || we.revert();for (var r, n, o, i, a, s, l, c, u, f, p = Ce(), d = Te(), g = T(he, re), h = 0, v = 0, m = S.end, b = S.endTrigger || ie, x = S.start || (0 !== S.start && ie ? ae ? "0 0" : "0 100%" : 0), y = S.pinnedContainer && Ee(S.pinnedContainer)[0], w = ie && Math.max(0, lt.indexOf(we)) || 0, C = w; C--;) {
            (s = lt[C]).end || s.refresh(0, 1) || (Be = 1), !(l = s.pin) || l !== ie && l !== ae || s.isReverted || ((f = f || []).unshift(s), s.revert());
          }for (E = mb(x, ie, p, re, we.scroll(), B, L, we, d, ye, me, g) || (ae ? -.001 : 0), W(m) && (m = m(we)), V(m) && !m.indexOf("+=") && (~m.indexOf(" ") ? m = (V(x) ? x.split(" ")[0] : "") + m : (h = Ha(m.substr(2), p), m = V(x) ? x : E + h, b = ie)), A = Math.max(E, mb(m || (b ? "100% 0" : g), b, p, re, we.scroll() + h, I, R, we, d, ye, me, g)) || -.001, z = A - E || (E -= .01) && .001, h = 0, C = w; C--;) {
            (l = (s = lt[C]).pin) && s.start - s._pinPush < E && (r = s.end - s.start, l !== ie && l !== y || (h += r), l === ae && (v += r));
          }if (E += h, A += h, we._pinPush = v, B && h && ((r = {})[re.a] = "+=" + h, y && (r[re.p] = "-=" + we.scroll()), Se.set([B, I], r)), ae) r = ta(ae), i = re === ot, o = we.scroll(), Z = parseFloat(U(re.a)) + v, !g && 1 < A && ((ve ? Pe : he).style["overflow-" + re.a] = "scroll"), gb(ae, j, r), H = jb(ae), n = it(ae, !0), c = me && P(he, i ? nt : ot)(), se && (($ = [se + re.os2, z + v + rt]).t = j, (C = se === Ge ? xa(ae, re) + z + v : 0) && $.push(re.d, C + rt), ft($), me && we.scroll(ee)), me && ((a = { top: n.top + (i ? o - E : c) + rt, left: n.left + (i ? c : o - E) + rt, boxSizing: "border-box", position: "fixed" })[Xe] = a.maxWidth = Math.ceil(n.width) + rt, a[Ze] = a.maxHeight = Math.ceil(n.height) + rt, a[et] = a[et + Ke] = a[et + qe] = a[et + Qe] = a[et + $e] = "0", a[Ge] = r[Ge], a[Ge + Ke] = r[Ge + Ke], a[Ge + qe] = r[Ge + qe], a[Ge + Qe] = r[Ge + Qe], a[Ge + $e] = r[Ge + $e], F = function _copyState(e, t, r) {
            for (var n, o = [], i = e.length, a = r ? 8 : 0; a < i; a += 2) {
              n = e[a], o.push(n, n in t ? t[n] : e[a + 1]);
            }return o.t = e.t, o;
          }(D, a, de)), M ? (u = M._initted, ze(1), M.render(M.duration(), !0, !0), q = U(re.a) - Z + z + v, z !== q && F.splice(F.length - 2, 2), M.render(0, !0, !0), u || M.invalidate(), ze(0)) : q = z;else if (ie && we.scroll()) for (n = ie.parentNode; n && n !== Pe;) {
            n._pinOffset && (E -= n._pinOffset, A -= n._pinOffset), n = n.parentNode;
          }f && f.forEach(function (e) {
            return e.revert(!1);
          }), we.start = E, we.end = A, (k = _ = we.scroll()) < ee && we.scroll(ee), we.revert(!1), Be = 0, M && ge && M._initted && M.progress() !== te && M.progress(te, !0).render(M.time(), !0, !0), G !== we.progress && (K && M.totalProgress(G, !0), we.progress = G, we.update()), ae && se && (j._pinOffset = Math.round(we.progress * q)), oe && oe(we);
        }
      }, we.getVelocity = function () {
        return (we.scroll() - _) / (He() - Ae) * 1e3 || 0;
      }, we.update = function (e, t) {
        var r,
            n,
            o,
            i,
            a,
            s = we.scroll(),
            l = e ? 0 : (s - E) / z,
            c = l < 0 ? 0 : 1 < l ? 1 : l || 0,
            u = we.progress;if (t && (_ = k, k = s, pe && (x = b, b = M && !ge ? M.totalProgress() : c)), ce && !c && ae && !Be && !De && je && E < s + (s - _) / (He() - Ae) * ce && (c = 1e-4), c !== u && we.enabled) {
          if (i = (a = (r = we.isActive = !!c && c < 1) != (!!u && u < 1)) || !!c != !!u, we.direction = u < c ? 1 : -1, we.progress = c, ge || (!K || Be || De ? M && M.totalProgress(c, !!Be) : (K.vars.totalProgress = c, K.invalidate().restart())), ae) if (e && se && (j.style[se + re.os2] = h), me) {
            if (i) {
              if (o = !e && u < c && s < A + 1 && s + 1 >= T(he, re), de) if (e || !r && !o) ob(ae, j);else {
                var f = it(ae, !0),
                    p = s - E;ob(ae, Pe, f.top + (re === ot ? p : 0) + rt, f.left + (re === ot ? 0 : p) + rt);
              }ft(r || o ? F : H), q !== z && c < 1 && r || g(Z + (1 !== c || o ? 0 : q));
            }
          } else g(Z + q * c);!pe || d.tween || Be || De || y.restart(!0), C && (a || fe && c && (c < 1 || !We)) && Ee(C.targets).forEach(function (e) {
            return e.classList[r || fe ? "add" : "remove"](C.className);
          }), !w || ge || e || w(we), i && !Be ? (n = c && !u ? 0 : 1 === c ? 1 : 1 === u ? 2 : 3, ge && (o = !a && "none" !== xe[n + 1] && xe[n + 1] || xe[n], M && ("complete" === o || "reset" === o || o in M) && ("complete" === o ? M.pause().totalProgress(1) : "reset" === o ? M.restart(!0).pause() : "restart" === o ? M.restart(!0) : M[o]()), w && w(we)), !a && We || (ne && a && ne(we), be[n] && be[n](we), fe && (1 === c ? we.kill(!1, 1) : be[n] = 0), a || be[n = 1 === c ? 1 : 3] && be[n](we))) : ge && w && !Be && w(we);
        }m && (v(s + (L._isFlipped ? 1 : 0)), m(s));
      }, we.enable = function (e, t) {
        we.enabled || (we.enabled = !0, Ca(he, "resize", Oa), Ca(he, "scroll", Na), u && Ca(ScrollTrigger, "refreshInit", u), !1 !== e && (we.progress = G = 0, k = _ = Oe = we.scroll()), !1 !== t && we.refresh());
      }, we.getTween = function (e) {
        return e && d ? d.tween : K;
      }, we.disable = function (e, t) {
        if (we.enabled && (!1 !== e && we.revert(), we.enabled = we.isActive = !1, t || K && K.pause(), ee = 0, n && (n.uncache = 1), u && Da(ScrollTrigger, "refreshInit", u), y && (y.pause(), d.tween && d.tween.kill() && (d.tween = 0)), !ve)) {
          for (var r = lt.length; r--;) {
            if (lt[r].scroller === he && lt[r] !== we) return;
          }Da(he, "resize", Oa), Da(he, "scroll", Na);
        }
      }, we.kill = function (e, t) {
        we.disable(e, t), i && delete ct[i];var r = lt.indexOf(we);lt.splice(r, 1), r === Le && 0 < ut && Le--, r = 0, lt.forEach(function (e) {
          return e.scroller === we.scroller && (r = 1);
        }), r || (we.scroll.rec = 0), M && (M.scrollTrigger = null, e && M.render(-1), t || M.kill()), B && [B, I, L, R].forEach(function (e) {
          return e.parentNode && e.parentNode.removeChild(e);
        }), ae && (n && (n.uncache = 1), r = 0, lt.forEach(function (e) {
          return e.pin === ae && r++;
        }), r || (n.spacer = 0));
      }, we.enable(!1, !1), M && M.add && !z ? Se.delayedCall(.01, function () {
        return E || A || we.refresh();
      }) && (z = .01) && (E = A = 0) : we.refresh();
    } else this.update = this.refresh = this.kill = J;
  }, ScrollTrigger.register = function register(e) {
    if (!i && (Se = e || M(), L() && window.document && (Me = window, ke = document, _e = ke.documentElement, Pe = ke.body), Se && (Ee = Se.utils.toArray, Ne = Se.utils.clamp, ze = Se.core.suppressOverwrites || J, Se.core.globals("ScrollTrigger", ScrollTrigger), Pe))) {
      s = Me.requestAnimationFrame || function (e) {
        return setTimeout(e, 16);
      }, Ca(Me, "wheel", Na), o = [Me, ke, _e, Pe], Ca(ke, "scroll", Na);var t,
          r = Pe.style,
          n = r.borderTop;r.borderTop = "1px solid #000", t = it(Pe), ot.m = Math.round(t.top + ot.sc()) || 0, nt.m = Math.round(t.left + nt.sc()) || 0, n ? r.borderTop = n : r.removeProperty("border-top"), c = setInterval(Ma, 200), Se.delayedCall(.5, function () {
        return De = 0;
      }), Ca(ke, "touchcancel", J), Ca(Pe, "touchstart", J), Ba(Ca, ke, "pointerdown,touchstart,mousedown", function () {
        return Ie = 1;
      }), Ba(Ca, ke, "pointerup,touchend,mouseup", function () {
        return Ie = 0;
      }), u = Se.utils.checkPrefix("transform"), j.push(u), i = He(), a = Se.delayedCall(.2, z).pause(), d = [ke, "visibilitychange", function () {
        var e = Me.innerWidth,
            t = Me.innerHeight;ke.hidden ? (f = e, p = t) : f === e && p === t || Oa();
      }, ke, "DOMContentLoaded", z, Me, "load", function () {
        return je || z();
      }, Me, "resize", Oa], U(Ca);
    }return i;
  }, ScrollTrigger.defaults = function defaults(e) {
    for (var t in e) {
      st[t] = e[t];
    }
  }, ScrollTrigger.kill = function kill() {
    Ue = 0, lt.slice(0).forEach(function (e) {
      return e.kill(1);
    });
  }, ScrollTrigger.config = function config(e) {
    "limitCallbacks" in e && (We = !!e.limitCallbacks);var t = e.syncInterval;t && clearInterval(c) || (c = t) && setInterval(Ma, t), "autoRefreshEvents" in e && (U(Da) || U(Ca, e.autoRefreshEvents || "none"), r = -1 === (e.autoRefreshEvents + "").indexOf("resize"));
  }, ScrollTrigger.scrollerProxy = function scrollerProxy(e, t) {
    var r = Ee(e)[0],
        n = v.indexOf(r),
        o = N(r);~n && v.splice(n, o ? 6 : 2), o ? Fe.unshift(Me, t, Pe, t, _e, t) : Fe.unshift(r, t);
  }, ScrollTrigger.matchMedia = function matchMedia(e) {
    var t, r, n, o, i;for (r in e) {
      n = E.indexOf(r), o = e[r], "all" === (Ve = r) ? o() : (t = Me.matchMedia(r)) && (t.matches && (i = o()), ~n ? (E[n + 1] = $(E[n + 1], o), E[n + 2] = $(E[n + 2], i)) : (n = E.length, E.push(r, o, i), t.addListener ? t.addListener(Ua) : t.addEventListener("change", Ua)), E[n + 3] = t.matches), Ve = 0;
    }return E;
  }, ScrollTrigger.clearMatchMedia = function clearMatchMedia(e) {
    e || (E.length = 0), 0 <= (e = E.indexOf(e)) && E.splice(e, 4);
  }, ScrollTrigger);function ScrollTrigger(e, t) {
    i || ScrollTrigger.register(Se) || console.warn("Please gsap.registerPlugin(ScrollTrigger)"), this.init(e, t);
  }ee.version = "3.7.1", ee.saveStyles = function (e) {
    return e ? Ee(e).forEach(function (e) {
      if (e && e.style) {
        var t = B.indexOf(e);0 <= t && B.splice(t, 5), B.push(e, e.style.cssText, e.getBBox && e.getAttribute("transform"), Se.core.getCache(e), Ve);
      }
    }) : B;
  }, ee.revert = function (e, t) {
    return R(!e, t);
  }, ee.create = function (e, t) {
    return new ee(e, t);
  }, ee.refresh = function (e) {
    return e ? Oa() : z(!0);
  }, ee.update = F, ee.maxScroll = function (e, t) {
    return T(e, t ? nt : ot);
  }, ee.getScrollFunc = function (e, t) {
    return P(Ee(e)[0], t ? nt : ot);
  }, ee.getById = function (e) {
    return ct[e];
  }, ee.getAll = function () {
    return lt.slice(0);
  }, ee.isScrolling = function () {
    return !!je;
  }, ee.addEventListener = function (e, t) {
    var r = k[e] || (k[e] = []);~r.indexOf(t) || r.push(t);
  }, ee.removeEventListener = function (e, t) {
    var r = k[e],
        n = r && r.indexOf(t);0 <= n && r.splice(n, 1);
  }, ee.batch = function (e, t) {
    function Ji(e, t) {
      var r = [],
          n = [],
          o = Se.delayedCall(i, function () {
        t(r, n), r = [], n = [];
      }).pause();return function (e) {
        r.length || o.restart(!0), r.push(e.trigger), n.push(e), a <= r.length && o.progress(1);
      };
    }var r,
        n = [],
        o = {},
        i = t.interval || .016,
        a = t.batchMax || 1e9;for (r in t) {
      o[r] = "on" === r.substr(0, 2) && W(t[r]) && "onRefreshInit" !== r ? Ji(0, t[r]) : t[r];
    }return W(a) && (a = a(), Ca(ee, "refresh", function () {
      return a = t.batchMax();
    })), Ee(e).forEach(function (e) {
      var t = {};for (r in o) {
        t[r] = o[r];
      }t.trigger = e, n.push(ee.create(t));
    }), n;
  }, ee.sort = function (e) {
    return lt.sort(e || function (e, t) {
      return -1e6 * (e.vars.refreshPriority || 0) + e.start - (t.start + -1e6 * (t.vars.refreshPriority || 0));
    });
  }, M() && Se.registerPlugin(ee), e.ScrollTrigger = ee, e.default = ee;if (typeof window === "undefined" || window !== e) {
    Object.defineProperty(e, "__esModule", { value: !0 });
  } else {
    delete e.default;
  }
});

/***/ }),

/***/ 1733:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


gsap.registerPlugin(ScrollTrigger);

__webpack_require__(1734);
__webpack_require__(1735);
__webpack_require__(1736);
__webpack_require__(1737);

gsap.to(".firecore__first-screen__background", {
  scrollTrigger: {
    trigger: ".firecore__first-screen",
    start: "0",
    end: "+=80%",
    scrub: true
    // markers: true,
    // pin: true,
  },
  scale: "1.2"
});

/***/ }),

/***/ 1734:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


//Challenge
var spider = document.querySelector(".firecore__challenge__spider_man");
var spiderPosition = function spiderPosition() {
  spider.style.left = ((2560 / window.innerWidth).toFixed(2) - 1) * 240 + 805 + "px";
};
spiderPosition();
window.addEventListener("resize", spiderPosition, true);

gsap.to(".firecore__challenge__spider_man", {
  scrollTrigger: {
    id: "spider-man",
    trigger: ".firecore__first-screen",
    start: "90",
    endTrigger: ".firecore__cooperate",
    end: "0",
    scrub: true
    // markers: true,
  },
  x: "16%",
  y: "16%",
  scale: "1.3"
});

gsap.timeline({
  scrollTrigger: {
    id: "spider-man-background",
    trigger: ".firecore__first-screen",
    start: "bottom 80%",
    endTrigger: ".firecore__challenge",
    end: "bottom 30%",
    scrub: true
    // markers: true,
  }
}).to(".firecore__challenge__background", { scale: 1.2, duration: 4, ease: "power1.inOut" }, 0).to(".firecore__challenge__background", { opacity: 0.4, duration: 1, ease: "power1.in" }, 0).to(".firecore__challenge__background", { opacity: 0, duration: 1, ease: "power1.Out" }, ">+=2");

/***/ }),

/***/ 1735:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


//Cooperate
var body_element = document.querySelector("body");
var container_element = document.querySelector(".firecore__cooperate__inner");
var jack_sparrow_element = document.querySelector(".firecore__cooperate__jack_sparrow");
var jack_sparrow_yardstick_element = document.querySelector(".firecore__cooperate__jack_sparrow__yardstick");

gsap.to(jack_sparrow_element, {
  scrollTrigger: {
    trigger: ".firecore__cooperate__background",
    start: "top bottom-=150px",
    endTrigger: ".firecore__review__r2d2",
    end: "bottom bottom",
    scrub: true
    // markers: true,
  },
  x: -jack_sparrow_element.clientWidth - 350,
  opacity: 0,
  ease: "power1.inOut"
  // scale: 0.5, There's a reason we don't do this
});

document.addEventListener("scroll", function () {
  var rect = jack_sparrow_yardstick_element.getBoundingClientRect();
  var space = window.innerHeight - rect.bottom;

  if (space >= 0) {
    jack_sparrow_element.style.position = "fixed";
    jack_sparrow_element.style.right = "unset";
    jack_sparrow_element.style.left = rect.left + "px";
  } else {
    jack_sparrow_element.style.position = "absolute";
    jack_sparrow_element.style.right = "500px";
    jack_sparrow_element.style.left = "unset";
  }
});

gsap.to(".firecore__cooperate__background", {
  scrollTrigger: {
    trigger: ".firecore__challenge",
    start: "-90",
    endTrigger: ".firecore__review",
    end: "0",
    scrub: true
    // markers: true,
  },
  y: "-6%"
});

gsap.timeline({
  scrollTrigger: {
    id: "jack-background",
    trigger: ".firecore__challenge",
    start: "bottom 80%",
    endTrigger: ".firecore__cooperate",
    end: "bottom 30%",
    scrub: true
    // markers: true,
  }
}).to(".firecore__cooperate__background", { scale: 1.1, duration: 4, ease: "power1.inOut" }, 0).to(".firecore__cooperate__background", { opacity: 0.4, duration: 1, ease: "power1.in" }, 0).to(".firecore__cooperate__background", { opacity: 0, duration: 1, ease: "power1.Out" }, ">+=2");

gsap.to(".firecore__cooperate__ios", {
  scrollTrigger: {
    id: "ios-badge",
    trigger: ".firecore__cooperate",
    start: "bottom 45%",
    end: "+=600px",
    scrub: true
    // markers: true,
  },
  opacity: "0"
});

/***/ }),

/***/ 1736:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


//Review
ScrollTrigger.create({
  id: "pin-bg-overlay",
  trigger: ".firecore__review",
  start: "top-=90px",
  end: "bottom center",
  scrub: true,
  pin: ".firecore__review__background__overlay"
  //   markers: true,
});

ScrollTrigger.create({
  id: "pin-r2d2",
  trigger: ".firecore__review__r2d2",
  start: "bottom bottom",
  end: "bottom top",
  scrub: true,
  pin: true
  //   markers: true,
});

gsap.timeline({
  scrollTrigger: {
    id: "r2d2",
    trigger: ".firecore__cooperate__ios",
    start: "top 55%",
    endTrigger: ".firecore__review__quote",
    end: "top top",
    scrub: true
    // markers: true,
  }
}).to(".firecore__review__r2d2", {
  x: "100%",
  scale: "0.5",
  ease: "power1.inOut",
  duration: 6
}, 0).to(".firecore__review__r2d2", {
  opacity: "0",
  duration: 1
}, "<+=3");

gsap.timeline({
  scrollTrigger: {
    id: "review-bg",
    trigger: ".firecore__review",
    start: "top 80%",
    endTrigger: ".firecore__review__quote",
    end: "top 10%",
    scrub: true
    // markers: true,
  }
}).to(".firecore__review__background", {
  webkitClipPath: "circle(100vh at 95% 50%)",
  duration: 9,
  ease: "power2.in"
}, 0).to(".firecore__review__background", {
  webkitClipPath: "circle(200vh at 95% 50%)",
  duration: 4,
  ease: "power2.Out"
}, ">");

gsap.fromTo(".firecore__review__background", { opacity: "0.2" }, {
  scrollTrigger: {
    id: "review-bg-fadeOut",
    trigger: ".firecore__review",
    start: "bottom bottom",
    end: "bottom center",
    scrub: true
    // markers: true,
  },
  opacity: "0"
});

gsap.to(".firecore__review__fps", {
  scrollTrigger: {
    id: "fps-badge",
    trigger: ".firecore__review__fps",
    start: "top 30%",
    end: "+=600px",
    scrub: true
    // markers: true,
  },
  opacity: "0"
});

/***/ }),

/***/ 1737:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// Cards
gsap.timeline({
  scrollTrigger: {
    id: "movie-pictures",
    trigger: ".firecore__review__quote .firecore__review__quote__img",
    start: "top 55%",
    endTrigger: ".firecore__review",
    end: "bottom 80%",
    scrub: true
    //   markers: true,
  }
}).to(".firecore__review__movie-pictures__item:nth-child(5)", {
  opacity: "1",
  duration: "10"
}, "<").to(".firecore__review__movie-pictures__item:nth-child(7)", {
  opacity: "1",
  duration: "10"
}, "<4").to(".firecore__review__movie-pictures__item:nth-child(18)", {
  opacity: "1",
  duration: "10"
}, "<3").to(".firecore__review__movie-pictures__item:nth-child(2)", {
  opacity: "1",
  duration: "10"
}, "<4").to(".firecore__review__movie-pictures__item:nth-child(5)", {
  opacity: "0",
  duration: "10"
}, "<6").to(".firecore__review__movie-pictures__item:nth-child(12)", {
  opacity: "1",
  duration: "10"
}, "<").to(".firecore__review__movie-pictures__item:nth-child(7)", {
  opacity: "0",
  duration: "10"
}, "<3").to(".firecore__review__movie-pictures__item:nth-child(18)", {
  opacity: "0",
  duration: "10"
}, "<1").to(".firecore__review__movie-pictures__item:nth-child(4)", {
  opacity: "1",
  duration: "10"
}, "<-4").to(".firecore__review__movie-pictures__item:nth-child(16)", {
  opacity: "1",
  duration: "10"
}, "<5").to(".firecore__review__movie-pictures__item:nth-child(12)", {
  opacity: "0",
  duration: "10"
}, "<-5").to(".firecore__review__movie-pictures__item:nth-child(11)", {
  opacity: "1",
  duration: "10"
}, "<").to(".firecore__review__movie-pictures__item:nth-child(2)", {
  opacity: "0",
  duration: "10"
}, "<4").to(".firecore__review__movie-pictures__item:nth-child(4)", {
  opacity: "0",
  duration: "10"
}, "<1").to(".firecore__review__movie-pictures__item:nth-child(16)", {
  opacity: "0",
  duration: "10"
}, "<").to(".firecore__review__movie-pictures__item:nth-child(1)", {
  opacity: "0",
  duration: "10"
}, "<3").to(".firecore__review__movie-pictures__item:nth-child(4)", {
  opacity: "0",
  duration: "10"
}, "<1").to(".firecore__review__movie-pictures__item:nth-child(16)", {
  opacity: "0",
  duration: "10"
}, "<").to(".firecore__review__movie-pictures__item:nth-child(1)", {
  opacity: "1",
  duration: "10"
}, "<2").to(".firecore__review__movie-pictures__item:nth-child(14)", {
  opacity: "1",
  duration: "10"
}, "<4").to(".firecore__review__movie-pictures__item:nth-child(11)", {
  opacity: "0",
  duration: "10"
}, "<").to(".firecore__review__movie-pictures__item:nth-child(10)", {
  opacity: "1",
  duration: "10"
}, "<6").to(".firecore__review__movie-pictures__item:nth-child(11)", {
  opacity: "0",
  duration: "10"
}, "<").to(".firecore__review__movie-pictures__item:nth-child(10)", {
  opacity: "1",
  duration: "10"
}, "<6").to(".firecore__review__movie-pictures__item:nth-child(10)", {
  opacity: "0",
  duration: "10"
}, "<6").to(".firecore__review__movie-pictures__item:nth-child(14)", {
  opacity: "0",
  duration: "10"
}, "<").to(".firecore__review__movie-pictures__item:nth-child(17)", {
  opacity: "1",
  duration: "10"
}, "<-1").to(".firecore__review__movie-pictures__item:nth-child(9)", {
  opacity: "1",
  duration: "10"
}, "<").to(".firecore__review__movie-pictures__item:nth-child(1)", {
  opacity: "0",
  duration: "10"
}, "<-2").to(".firecore__review__movie-pictures__item:nth-child(1)", {
  opacity: "0",
  duration: "10"
}, "<1").to(".firecore__review__movie-pictures__item:nth-child(1)", {
  opacity: "0",
  duration: "10"
}, "<-2").to(".firecore__review__movie-pictures__item:nth-child(1)", {
  opacity: "0",
  duration: "10"
}, "<").to(".firecore__review__movie-pictures__item:nth-child(3)", {
  opacity: "1",
  duration: "10"
}, "<4").to(".firecore__review__movie-pictures__item:nth-child(13)", {
  opacity: "1",
  duration: "10"
}, "<3").to(".firecore__review__movie-pictures__item:nth-child(17)", {
  opacity: "0",
  duration: "10"
}, "<-2").to(".firecore__review__movie-pictures__item:nth-child(9)", {
  opacity: "0",
  duration: "10"
}, "<-1").to(".firecore__review__movie-pictures__item:nth-child(15)", {
  opacity: "1",
  duration: "10"
}, "<3").to(".firecore__review__movie-pictures__item:nth-child(3)", {
  opacity: "0",
  duration: "10"
}, "<5").to(".firecore__review__movie-pictures__item:nth-child(8)", {
  opacity: "1",
  duration: "10"
}, "<1").to(".firecore__review__movie-pictures__item:nth-child(6)", {
  opacity: "1",
  duration: "10"
}, "<3").to(".firecore__review__movie-pictures__item:nth-child(15)", {
  opacity: "0",
  duration: "10"
}, "<-1").to(".firecore__review__movie-pictures__item:nth-child(6)", {
  opacity: "0",
  duration: "10"
}, "<2").to(".firecore__review__movie-pictures__item:nth-child(8)", {
  opacity: "0",
  duration: "10"
}, "<-1").to(".firecore__review__movie-pictures__item:nth-child(13)", {
  opacity: "0",
  duration: "10"
}, "<3");

/***/ }),

/***/ 18:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function (exec) {
  try {
    return !!exec();
  } catch (e) {
    return true;
  }
};

/***/ }),

/***/ 2:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var utils = __webpack_require__(0);

/**
 * Create an Error with the specified message, config, error code, request and response.
 *
 * @param {string} message The error message.
 * @param {string} [code] The error code (for example, 'ECONNABORTED').
 * @param {Object} [config] The config.
 * @param {Object} [request] The request.
 * @param {Object} [response] The response.
 * @returns {Error} The created error.
 */
function AxiosError(message, code, config, request, response) {
  Error.call(this);
  this.message = message;
  this.name = 'AxiosError';
  code && (this.code = code);
  config && (this.config = config);
  request && (this.request = request);
  response && (this.response = response);
}

utils.inherits(AxiosError, Error, {
  toJSON: function toJSON() {
    return {
      // Standard
      message: this.message,
      name: this.name,
      // Microsoft
      description: this.description,
      number: this.number,
      // Mozilla
      fileName: this.fileName,
      lineNumber: this.lineNumber,
      columnNumber: this.columnNumber,
      stack: this.stack,
      // Axios
      config: this.config,
      code: this.code,
      status: this.response && this.response.status ? this.response.status : null
    };
  }
});

var prototype = AxiosError.prototype;
var descriptors = {};

['ERR_BAD_OPTION_VALUE', 'ERR_BAD_OPTION', 'ECONNABORTED', 'ETIMEDOUT', 'ERR_NETWORK', 'ERR_FR_TOO_MANY_REDIRECTS', 'ERR_DEPRECATED', 'ERR_BAD_RESPONSE', 'ERR_BAD_REQUEST', 'ERR_CANCELED'
// eslint-disable-next-line func-names
].forEach(function (code) {
  descriptors[code] = { value: code };
});

Object.defineProperties(AxiosError, descriptors);
Object.defineProperty(prototype, 'isAxiosError', { value: true });

// eslint-disable-next-line func-names
AxiosError.from = function (error, code, config, request, response, customProps) {
  var axiosError = Object.create(prototype);

  utils.toFlatObject(error, axiosError, function filter(obj) {
    return obj !== Error.prototype;
  });

  AxiosError.call(axiosError, error.message, code, config, request, response);

  axiosError.name = error.name;

  customProps && _extends(axiosError, customProps);

  return axiosError;
};

module.exports = AxiosError;

/***/ }),

/***/ 20:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * @public
 * @type {Object}
 */

module.exports = {
	width: function width() {
		return document.documentElement.clientWidth < window.innerWidth ? window.innerWidth : document.documentElement.clientWidth;
	},
	height: function height() {
		return document.documentElement.clientHeight < window.innerHeight ? window.innerHeight : document.documentElement.clientHeight;
	},
	orientation: function orientation() {
		var width = this.width();
		var height = this.height();

		if (width < height) {
			return "portrait";
		} else if (width > height) {
			return "landscape";
		} else {
			return "";
		}
	},
	isPortrait: function isPortrait() {
		return this.orientation() === "portrait" ? true : false;
	},
	isLandscape: function isLandscape() {
		return this.orientation() === "landscape" ? true : false;
	},
	isMobile: function isMobile() {
		return this.width() < 1025 ? true : false;
	},
	isPhone: function isPhone() {
		return this.width() < 768 ? true : false;
	},
	isTablet: function isTablet() {
		return this.isMobile() && !this.isPhone();
	},
	isDesktop: function isDesktop() {
		return !this.isMobile();
	}
};

/***/ }),

/***/ 21:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var freeGlobal = __webpack_require__(50);

/** Detect free variable `self`. */
var freeSelf = (typeof self === 'undefined' ? 'undefined' : _typeof(self)) == 'object' && self && self.Object === Object && self;

/** Used as a reference to the global object. */
var root = freeGlobal || freeSelf || Function('return this')();

module.exports = root;

/***/ }),

/***/ 22:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function bind(fn, thisArg) {
  return function wrap() {
    var args = new Array(arguments.length);
    for (var i = 0; i < args.length; i++) {
      args[i] = arguments[i];
    }
    return fn.apply(thisArg, args);
  };
};

/***/ }),

/***/ 23:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(0);

function encode(val) {
  return encodeURIComponent(val).replace(/%3A/gi, ':').replace(/%24/g, '$').replace(/%2C/gi, ',').replace(/%20/g, '+').replace(/%5B/gi, '[').replace(/%5D/gi, ']');
}

/**
 * Build a URL by appending params to the end
 *
 * @param {string} url The base of the url (e.g., http://www.google.com)
 * @param {object} [params] The params to be appended
 * @returns {string} The formatted url
 */
module.exports = function buildURL(url, params, paramsSerializer) {
  /*eslint no-param-reassign:0*/
  if (!params) {
    return url;
  }

  var serializedParams;
  if (paramsSerializer) {
    serializedParams = paramsSerializer(params);
  } else if (utils.isURLSearchParams(params)) {
    serializedParams = params.toString();
  } else {
    var parts = [];

    utils.forEach(params, function serialize(val, key) {
      if (val === null || typeof val === 'undefined') {
        return;
      }

      if (utils.isArray(val)) {
        key = key + '[]';
      } else {
        val = [val];
      }

      utils.forEach(val, function parseValue(v) {
        if (utils.isDate(v)) {
          v = v.toISOString();
        } else if (utils.isObject(v)) {
          v = JSON.stringify(v);
        }
        parts.push(encode(key) + '=' + encode(v));
      });
    });

    serializedParams = parts.join('&');
  }

  if (serializedParams) {
    var hashmarkIndex = url.indexOf('#');
    if (hashmarkIndex !== -1) {
      url = url.slice(0, hashmarkIndex);
    }

    url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams;
  }

  return url;
};

/***/ }),

/***/ 230:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
var parallaxElements = [];
var hasScrollEventListener = false;

function init() {

    var domElements = document.querySelectorAll(".b-parallax-element");

    if (domElements.length) {
        for (var i = 0; i < domElements.length; i++) {
            var domElement = domElements[i];

            parallaxElements.push({
                domElement: domElement,
                speed: parseFloat(domElement.dataset.speed) || 0
            });
        }

        var resizeTimeout = void 0;

        window.addEventListener("resize", function () {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(onResize, 250);
        }, false);

        onResize();
        // window.requestAnimationFrame(onResize);
    }
}

function getElementOffsetTop(element) {
    var offsetTop = 0;

    while (element.tagName !== "BODY") {
        offsetTop += element.offsetTop;
        element = element.parentNode;
    }

    return offsetTop;
}

function onResize() {
    // window.requestAnimationFrame(onResize);

    if (window.matchMedia("(min-width: 1025px)").matches) {
        parallaxElements.forEach(function (parallaxElement) {
            parallaxElement.offsetTop = getElementOffsetTop(parallaxElement.domElement);
        });

        if (!hasScrollEventListener) {
            hasScrollEventListener = true;
            window.addEventListener("scroll", function () {
                window.requestAnimationFrame(onScroll);
            }, false);
            onScroll();
            // window.requestAnimationFrame(onScroll);
        }
    } else {
        if (hasScrollEventListener) {
            hasScrollEventListener = false;
            window.removeEventListener("scroll", onScroll, false);
        }
    }
}

function onScroll() {

    var windowScrollY = window.innerHeight / 2 + window.scrollY;

    parallaxElements.forEach(function (parallaxElement) {
        var elementTranslateY = parallaxElement.offsetTop - windowScrollY;
        parallaxElement.domElement.style.transform = "translateY(" + elementTranslateY * parallaxElement.speed + "px)";
    });
}

init();

// window.requestAnimationFrame(init);

exports.init = init;

/***/ }),

/***/ 24:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = {
  silentJSONParsing: true,
  forcedJSONParsing: true,
  clarifyTimeoutError: false
};

/***/ }),

/***/ 25:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(Buffer) {

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var utils = __webpack_require__(0);

/**
 * Convert a data object to FormData
 * @param {Object} obj
 * @param {?Object} [formData]
 * @returns {Object}
 **/

function toFormData(obj, formData) {
  // eslint-disable-next-line no-param-reassign
  formData = formData || new FormData();

  var stack = [];

  function convertValue(value) {
    if (value === null) return '';

    if (utils.isDate(value)) {
      return value.toISOString();
    }

    if (utils.isArrayBuffer(value) || utils.isTypedArray(value)) {
      return typeof Blob === 'function' ? new Blob([value]) : Buffer.from(value);
    }

    return value;
  }

  function build(data, parentKey) {
    if (utils.isPlainObject(data) || utils.isArray(data)) {
      if (stack.indexOf(data) !== -1) {
        throw Error('Circular reference detected in ' + parentKey);
      }

      stack.push(data);

      utils.forEach(data, function each(value, key) {
        if (utils.isUndefined(value)) return;
        var fullKey = parentKey ? parentKey + '.' + key : key;
        var arr;

        if (value && !parentKey && (typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object') {
          if (utils.endsWith(key, '{}')) {
            // eslint-disable-next-line no-param-reassign
            value = JSON.stringify(value);
          } else if (utils.endsWith(key, '[]') && (arr = utils.toArray(value))) {
            // eslint-disable-next-line func-names
            arr.forEach(function (el) {
              !utils.isUndefined(el) && formData.append(fullKey, convertValue(el));
            });
            return;
          }
        }

        build(value, fullKey);
      });

      stack.pop();
    } else {
      formData.append(parentKey, convertValue(data));
    }
  }

  build(obj);

  return formData;
}

module.exports = toFormData;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(57).Buffer))

/***/ }),

/***/ 26:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(0);
var settle = __webpack_require__(61);
var cookies = __webpack_require__(62);
var buildURL = __webpack_require__(23);
var buildFullPath = __webpack_require__(27);
var parseHeaders = __webpack_require__(65);
var isURLSameOrigin = __webpack_require__(66);
var transitionalDefaults = __webpack_require__(24);
var AxiosError = __webpack_require__(2);
var CanceledError = __webpack_require__(8);
var parseProtocol = __webpack_require__(67);

module.exports = function xhrAdapter(config) {
  return new Promise(function dispatchXhrRequest(resolve, reject) {
    var requestData = config.data;
    var requestHeaders = config.headers;
    var responseType = config.responseType;
    var onCanceled;
    function done() {
      if (config.cancelToken) {
        config.cancelToken.unsubscribe(onCanceled);
      }

      if (config.signal) {
        config.signal.removeEventListener('abort', onCanceled);
      }
    }

    if (utils.isFormData(requestData) && utils.isStandardBrowserEnv()) {
      delete requestHeaders['Content-Type']; // Let the browser set it
    }

    var request = new XMLHttpRequest();

    // HTTP basic authentication
    if (config.auth) {
      var username = config.auth.username || '';
      var password = config.auth.password ? unescape(encodeURIComponent(config.auth.password)) : '';
      requestHeaders.Authorization = 'Basic ' + btoa(username + ':' + password);
    }

    var fullPath = buildFullPath(config.baseURL, config.url);

    request.open(config.method.toUpperCase(), buildURL(fullPath, config.params, config.paramsSerializer), true);

    // Set the request timeout in MS
    request.timeout = config.timeout;

    function onloadend() {
      if (!request) {
        return;
      }
      // Prepare the response
      var responseHeaders = 'getAllResponseHeaders' in request ? parseHeaders(request.getAllResponseHeaders()) : null;
      var responseData = !responseType || responseType === 'text' || responseType === 'json' ? request.responseText : request.response;
      var response = {
        data: responseData,
        status: request.status,
        statusText: request.statusText,
        headers: responseHeaders,
        config: config,
        request: request
      };

      settle(function _resolve(value) {
        resolve(value);
        done();
      }, function _reject(err) {
        reject(err);
        done();
      }, response);

      // Clean up request
      request = null;
    }

    if ('onloadend' in request) {
      // Use onloadend if available
      request.onloadend = onloadend;
    } else {
      // Listen for ready state to emulate onloadend
      request.onreadystatechange = function handleLoad() {
        if (!request || request.readyState !== 4) {
          return;
        }

        // The request errored out and we didn't get a response, this will be
        // handled by onerror instead
        // With one exception: request that using file: protocol, most browsers
        // will return status as 0 even though it's a successful request
        if (request.status === 0 && !(request.responseURL && request.responseURL.indexOf('file:') === 0)) {
          return;
        }
        // readystate handler is calling before onerror or ontimeout handlers,
        // so we should call onloadend on the next 'tick'
        setTimeout(onloadend);
      };
    }

    // Handle browser request cancellation (as opposed to a manual cancellation)
    request.onabort = function handleAbort() {
      if (!request) {
        return;
      }

      reject(new AxiosError('Request aborted', AxiosError.ECONNABORTED, config, request));

      // Clean up request
      request = null;
    };

    // Handle low level network errors
    request.onerror = function handleError() {
      // Real errors are hidden from us by the browser
      // onerror should only fire if it's a network error
      reject(new AxiosError('Network Error', AxiosError.ERR_NETWORK, config, request, request));

      // Clean up request
      request = null;
    };

    // Handle timeout
    request.ontimeout = function handleTimeout() {
      var timeoutErrorMessage = config.timeout ? 'timeout of ' + config.timeout + 'ms exceeded' : 'timeout exceeded';
      var transitional = config.transitional || transitionalDefaults;
      if (config.timeoutErrorMessage) {
        timeoutErrorMessage = config.timeoutErrorMessage;
      }
      reject(new AxiosError(timeoutErrorMessage, transitional.clarifyTimeoutError ? AxiosError.ETIMEDOUT : AxiosError.ECONNABORTED, config, request));

      // Clean up request
      request = null;
    };

    // Add xsrf header
    // This is only done if running in a standard browser environment.
    // Specifically not if we're in a web worker, or react-native.
    if (utils.isStandardBrowserEnv()) {
      // Add xsrf header
      var xsrfValue = (config.withCredentials || isURLSameOrigin(fullPath)) && config.xsrfCookieName ? cookies.read(config.xsrfCookieName) : undefined;

      if (xsrfValue) {
        requestHeaders[config.xsrfHeaderName] = xsrfValue;
      }
    }

    // Add headers to the request
    if ('setRequestHeader' in request) {
      utils.forEach(requestHeaders, function setRequestHeader(val, key) {
        if (typeof requestData === 'undefined' && key.toLowerCase() === 'content-type') {
          // Remove Content-Type if data is undefined
          delete requestHeaders[key];
        } else {
          // Otherwise add header to the request
          request.setRequestHeader(key, val);
        }
      });
    }

    // Add withCredentials to request if needed
    if (!utils.isUndefined(config.withCredentials)) {
      request.withCredentials = !!config.withCredentials;
    }

    // Add responseType to request if needed
    if (responseType && responseType !== 'json') {
      request.responseType = config.responseType;
    }

    // Handle progress if needed
    if (typeof config.onDownloadProgress === 'function') {
      request.addEventListener('progress', config.onDownloadProgress);
    }

    // Not all browsers support upload events
    if (typeof config.onUploadProgress === 'function' && request.upload) {
      request.upload.addEventListener('progress', config.onUploadProgress);
    }

    if (config.cancelToken || config.signal) {
      // Handle cancellation
      // eslint-disable-next-line func-names
      onCanceled = function onCanceled(cancel) {
        if (!request) {
          return;
        }
        reject(!cancel || cancel && cancel.type ? new CanceledError() : cancel);
        request.abort();
        request = null;
      };

      config.cancelToken && config.cancelToken.subscribe(onCanceled);
      if (config.signal) {
        config.signal.aborted ? onCanceled() : config.signal.addEventListener('abort', onCanceled);
      }
    }

    if (!requestData) {
      requestData = null;
    }

    var protocol = parseProtocol(fullPath);

    if (protocol && ['http', 'https', 'file'].indexOf(protocol) === -1) {
      reject(new AxiosError('Unsupported protocol ' + protocol + ':', AxiosError.ERR_BAD_REQUEST, config));
      return;
    }

    // Send the request
    request.send(requestData);
  });
};

/***/ }),

/***/ 27:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var isAbsoluteURL = __webpack_require__(63);
var combineURLs = __webpack_require__(64);

/**
 * Creates a new URL by combining the baseURL with the requestedURL,
 * only when the requestedURL is not already an absolute URL.
 * If the requestURL is absolute, this function returns the requestedURL untouched.
 *
 * @param {string} baseURL The base URL
 * @param {string} requestedURL Absolute or relative URL to combine
 * @returns {string} The combined full path
 */
module.exports = function buildFullPath(baseURL, requestedURL) {
  if (baseURL && !isAbsoluteURL(requestedURL)) {
    return combineURLs(baseURL, requestedURL);
  }
  return requestedURL;
};

/***/ }),

/***/ 28:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function isCancel(value) {
  return !!(value && value.__CANCEL__);
};

/***/ }),

/***/ 287:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var i = new Image();i.onload = i.onerror = function () {
  document.body.classList.add(i.height == 1 ? "webp" : "no-webp");
};i.src = "data:image/webp;base64,UklGRhoAAABXRUJQVlA4TA0AAAAvAAAAEAcQERGIiP4HAA==";

/***/ }),

/***/ 29:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(0);

/**
 * Config-specific merge-function which creates a new config-object
 * by merging two configuration objects together.
 *
 * @param {Object} config1
 * @param {Object} config2
 * @returns {Object} New object resulting from merging config2 to config1
 */
module.exports = function mergeConfig(config1, config2) {
  // eslint-disable-next-line no-param-reassign
  config2 = config2 || {};
  var config = {};

  function getMergedValue(target, source) {
    if (utils.isPlainObject(target) && utils.isPlainObject(source)) {
      return utils.merge(target, source);
    } else if (utils.isPlainObject(source)) {
      return utils.merge({}, source);
    } else if (utils.isArray(source)) {
      return source.slice();
    }
    return source;
  }

  // eslint-disable-next-line consistent-return
  function mergeDeepProperties(prop) {
    if (!utils.isUndefined(config2[prop])) {
      return getMergedValue(config1[prop], config2[prop]);
    } else if (!utils.isUndefined(config1[prop])) {
      return getMergedValue(undefined, config1[prop]);
    }
  }

  // eslint-disable-next-line consistent-return
  function valueFromConfig2(prop) {
    if (!utils.isUndefined(config2[prop])) {
      return getMergedValue(undefined, config2[prop]);
    }
  }

  // eslint-disable-next-line consistent-return
  function defaultToConfig2(prop) {
    if (!utils.isUndefined(config2[prop])) {
      return getMergedValue(undefined, config2[prop]);
    } else if (!utils.isUndefined(config1[prop])) {
      return getMergedValue(undefined, config1[prop]);
    }
  }

  // eslint-disable-next-line consistent-return
  function mergeDirectKeys(prop) {
    if (prop in config2) {
      return getMergedValue(config1[prop], config2[prop]);
    } else if (prop in config1) {
      return getMergedValue(undefined, config1[prop]);
    }
  }

  var mergeMap = {
    'url': valueFromConfig2,
    'method': valueFromConfig2,
    'data': valueFromConfig2,
    'baseURL': defaultToConfig2,
    'transformRequest': defaultToConfig2,
    'transformResponse': defaultToConfig2,
    'paramsSerializer': defaultToConfig2,
    'timeout': defaultToConfig2,
    'timeoutMessage': defaultToConfig2,
    'withCredentials': defaultToConfig2,
    'adapter': defaultToConfig2,
    'responseType': defaultToConfig2,
    'xsrfCookieName': defaultToConfig2,
    'xsrfHeaderName': defaultToConfig2,
    'onUploadProgress': defaultToConfig2,
    'onDownloadProgress': defaultToConfig2,
    'decompress': defaultToConfig2,
    'maxContentLength': defaultToConfig2,
    'maxBodyLength': defaultToConfig2,
    'beforeRedirect': defaultToConfig2,
    'transport': defaultToConfig2,
    'httpAgent': defaultToConfig2,
    'httpsAgent': defaultToConfig2,
    'cancelToken': defaultToConfig2,
    'socketPath': defaultToConfig2,
    'responseEncoding': defaultToConfig2,
    'validateStatus': mergeDirectKeys
  };

  utils.forEach(Object.keys(config1).concat(Object.keys(config2)), function computeConfigValue(prop) {
    var merge = mergeMap[prop] || mergeDeepProperties;
    var configValue = merge(prop);
    utils.isUndefined(configValue) && merge !== mergeDirectKeys || (config[prop] = configValue);
  });

  return config;
};

/***/ }),

/***/ 3:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var assign = __webpack_require__(42);

/**
 * @public
 * @type {Object}
 */
module.exports = {
  virtualPage: function virtualPage(configs) {
    configs = assign.assign({
      command: 'send',
      type: 'pageview',
      page: ''
    }, configs);

    ga(configs.command, configs.type, configs.page);
  },
  sendEvent: function sendEvent(configs) {
    configs = assign.assign({
      command: 'send',
      type: 'event',
      eventCategory: '',
      eventAction: '',
      eventLabel: ''
    }, configs);

    ga(configs.command, configs.type, configs.eventCategory, configs.eventAction, configs.eventLabel);
  }
};

/***/ }),

/***/ 30:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = {
  "version": "0.27.2"
};

/***/ }),

/***/ 31:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var isObject = __webpack_require__(11),
    now = __webpack_require__(75),
    toNumber = __webpack_require__(76);

/** Error message constants. */
var FUNC_ERROR_TEXT = 'Expected a function';

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeMax = Math.max,
    nativeMin = Math.min;

/**
 * Creates a debounced function that delays invoking `func` until after `wait`
 * milliseconds have elapsed since the last time the debounced function was
 * invoked. The debounced function comes with a `cancel` method to cancel
 * delayed `func` invocations and a `flush` method to immediately invoke them.
 * Provide `options` to indicate whether `func` should be invoked on the
 * leading and/or trailing edge of the `wait` timeout. The `func` is invoked
 * with the last arguments provided to the debounced function. Subsequent
 * calls to the debounced function return the result of the last `func`
 * invocation.
 *
 * **Note:** If `leading` and `trailing` options are `true`, `func` is
 * invoked on the trailing edge of the timeout only if the debounced function
 * is invoked more than once during the `wait` timeout.
 *
 * If `wait` is `0` and `leading` is `false`, `func` invocation is deferred
 * until to the next tick, similar to `setTimeout` with a timeout of `0`.
 *
 * See [David Corbacho's article](https://css-tricks.com/debouncing-throttling-explained-examples/)
 * for details over the differences between `_.debounce` and `_.throttle`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Function
 * @param {Function} func The function to debounce.
 * @param {number} [wait=0] The number of milliseconds to delay.
 * @param {Object} [options={}] The options object.
 * @param {boolean} [options.leading=false]
 *  Specify invoking on the leading edge of the timeout.
 * @param {number} [options.maxWait]
 *  The maximum time `func` is allowed to be delayed before it's invoked.
 * @param {boolean} [options.trailing=true]
 *  Specify invoking on the trailing edge of the timeout.
 * @returns {Function} Returns the new debounced function.
 * @example
 *
 * // Avoid costly calculations while the window size is in flux.
 * jQuery(window).on('resize', _.debounce(calculateLayout, 150));
 *
 * // Invoke `sendMail` when clicked, debouncing subsequent calls.
 * jQuery(element).on('click', _.debounce(sendMail, 300, {
 *   'leading': true,
 *   'trailing': false
 * }));
 *
 * // Ensure `batchLog` is invoked once after 1 second of debounced calls.
 * var debounced = _.debounce(batchLog, 250, { 'maxWait': 1000 });
 * var source = new EventSource('/stream');
 * jQuery(source).on('message', debounced);
 *
 * // Cancel the trailing debounced invocation.
 * jQuery(window).on('popstate', debounced.cancel);
 */
function debounce(func, wait, options) {
  var lastArgs,
      lastThis,
      maxWait,
      result,
      timerId,
      lastCallTime,
      lastInvokeTime = 0,
      leading = false,
      maxing = false,
      trailing = true;

  if (typeof func != 'function') {
    throw new TypeError(FUNC_ERROR_TEXT);
  }
  wait = toNumber(wait) || 0;
  if (isObject(options)) {
    leading = !!options.leading;
    maxing = 'maxWait' in options;
    maxWait = maxing ? nativeMax(toNumber(options.maxWait) || 0, wait) : maxWait;
    trailing = 'trailing' in options ? !!options.trailing : trailing;
  }

  function invokeFunc(time) {
    var args = lastArgs,
        thisArg = lastThis;

    lastArgs = lastThis = undefined;
    lastInvokeTime = time;
    result = func.apply(thisArg, args);
    return result;
  }

  function leadingEdge(time) {
    // Reset any `maxWait` timer.
    lastInvokeTime = time;
    // Start the timer for the trailing edge.
    timerId = setTimeout(timerExpired, wait);
    // Invoke the leading edge.
    return leading ? invokeFunc(time) : result;
  }

  function remainingWait(time) {
    var timeSinceLastCall = time - lastCallTime,
        timeSinceLastInvoke = time - lastInvokeTime,
        timeWaiting = wait - timeSinceLastCall;

    return maxing ? nativeMin(timeWaiting, maxWait - timeSinceLastInvoke) : timeWaiting;
  }

  function shouldInvoke(time) {
    var timeSinceLastCall = time - lastCallTime,
        timeSinceLastInvoke = time - lastInvokeTime;

    // Either this is the first call, activity has stopped and we're at the
    // trailing edge, the system time has gone backwards and we're treating
    // it as the trailing edge, or we've hit the `maxWait` limit.
    return lastCallTime === undefined || timeSinceLastCall >= wait || timeSinceLastCall < 0 || maxing && timeSinceLastInvoke >= maxWait;
  }

  function timerExpired() {
    var time = now();
    if (shouldInvoke(time)) {
      return trailingEdge(time);
    }
    // Restart the timer.
    timerId = setTimeout(timerExpired, remainingWait(time));
  }

  function trailingEdge(time) {
    timerId = undefined;

    // Only invoke if we have `lastArgs` which means `func` has been
    // debounced at least once.
    if (trailing && lastArgs) {
      return invokeFunc(time);
    }
    lastArgs = lastThis = undefined;
    return result;
  }

  function cancel() {
    if (timerId !== undefined) {
      clearTimeout(timerId);
    }
    lastInvokeTime = 0;
    lastArgs = lastCallTime = lastThis = timerId = undefined;
  }

  function flush() {
    return timerId === undefined ? result : trailingEdge(now());
  }

  function debounced() {
    var time = now(),
        isInvoking = shouldInvoke(time);

    lastArgs = arguments;
    lastThis = this;
    lastCallTime = time;

    if (isInvoking) {
      if (timerId === undefined) {
        return leadingEdge(lastCallTime);
      }
      if (maxing) {
        // Handle invocations in a tight loop.
        clearTimeout(timerId);
        timerId = setTimeout(timerExpired, wait);
        return invokeFunc(lastCallTime);
      }
    }
    if (timerId === undefined) {
      timerId = setTimeout(timerExpired, wait);
    }
    return result;
  }
  debounced.cancel = cancel;
  debounced.flush = flush;
  return debounced;
}

module.exports = debounce;

/***/ }),

/***/ 32:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var root = __webpack_require__(21);

/** Built-in value references. */
var _Symbol = root.Symbol;

module.exports = _Symbol;

/***/ }),

/***/ 33:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Module dependencies.
 * @private
 */
// var SVGPolyfill = require("../polyfills/svg");

var viewport = __webpack_require__(20);
var Handlers = __webpack_require__(7);
var requestEstimatePopup = __webpack_require__(16);
var scrollBlocker = __webpack_require__(10);
var debounce = __webpack_require__(31);
var throttle = __webpack_require__(74);

/**
 * @private
 */
var DOM = {};
var handlers = new Handlers();
var marker = {
	enableMobileHandlers: false,
	navIcoAnimateTimer: false
};

// SVGPolyfill.init();

/**
 * @public
 * @type {Object}
 */
module.exports = {
	init: function init() {
		requestEstimatePopup.init();
		setDOM();
		initHandlers();
		fixSafariScroll();
		// toggleTransparentLayout();

		/* http://gitlab.mercury.office/mercdev.com/Web/merge_requests/902  - все ломает*/
	},
	isOpen: isOpen,
	on: handlers.add.bind(handlers),
	off: handlers.remove.bind(handlers)
};

/**
 * @private
 */
function isOpen() {
	return DOM.nav.classList.contains("active");
}

/**
 * @private
 */
function setDOM() {
	DOM.nav = document.querySelector(".js-nav");
	DOM.header = document.querySelector('.l-header');
	DOM.content = document.querySelector('.c-slides');
	DOM.main = document.querySelector('.c-slides-main');

	// for mobile
	DOM.mobileRequestEstimateLink = DOM.nav.querySelector('.js-nav_request_estimate_link');
	DOM.navIco = DOM.nav.querySelector(".js-nav_ico");
	DOM.navWrap = DOM.nav.querySelector(".c-nav_wrap");
	DOM.navOverlay = DOM.nav.querySelector(".c-nav_overlay");
	DOM.scrollable = document.querySelectorAll('.scrollable');
}

/**
 * @private
 */
function initHandlers() {
	viewport.isMobile() && enableMobileHandlers();

	initToggleTransparentLayout();

	window.addEventListener("resize", debounce(function () {
		viewport.isMobile() ? enableMobileHandlers() : disableMobileHandlers();

		// close mobile menu on viewport change (for iPad)
		if (isOpen() && !viewport.isMobile()) {
			toggleNavIcon();
		}
	}, 300));
}

function fixSafariScroll() {
	// About the problem: https://github.com/scottjehl/device-bugs/issues/23
	function getSafariVersion() {
		var navUserAgent = navigator.userAgent;
		var tempVersionOffset = void 0;
		var tempVersion = void 0;
		var browserVersion = void 0;

		if ((tempVersionOffset = navUserAgent.indexOf("Safari")) !== -1) {
			browserVersion = navUserAgent.substring(tempVersionOffset + 7);

			if ((tempVersionOffset = navUserAgent.indexOf("Version")) !== -1) {
				browserVersion = navUserAgent.substring(tempVersionOffset + 8);
			}
		} else {
			return false;
		}

		if ((tempVersion = browserVersion.indexOf(";")) != -1) {
			browserVersion = browserVersion.substring(0, tempVersion);
		}

		if ((tempVersion = browserVersion.indexOf(" ")) !== -1) {
			browserVersion = browserVersion.substring(0, tempVersion);
		}

		return parseFloat(browserVersion);
	}

	var safariVersion = getSafariVersion();

	if (safariVersion && safariVersion < 13) {

		if (DOM.main) {
			if (DOM.header) {
				DOM.header.classList.add("l-header--sticky");
			}
			if (DOM.content) {
				DOM.content.classList.add("c-slides--relative");
			}
		}
	}
}

/**
 * @private
 */
function enableMobileHandlers() {
	if (!marker.enableMobileHandlers) {
		marker.enableMobileHandlers = true;

		navCollapse();

		window.addEventListener("scroll", throttle(function () {
			navCollapse();
		}, 300));

		DOM.mobileRequestEstimateLink.addEventListener("click", requestEstimateShow);

		// nav ico
		DOM.navIco.addEventListener("click", toggleNavIcon);
	}
}

/**
 * @private
 */
function disableMobileHandlers() {
	if (marker.enableMobileHandlers) {
		marker.enableMobileHandlers = false;

		navCollapse();

		window.removeEventListener("scroll", navCollapse);

		DOM.mobileRequestEstimateLink.removeEventListener("click", requestEstimateShow);

		// nav ico
		DOM.navIco.removeEventListener("click", toggleNavIcon);
	}
}

/**
 * @private
 */
function navCollapse() {
	var isCollapse = isHeaderScrolled();
	var domNavClassList = DOM.nav.classList;

	if (isCollapse) domNavClassList.add("collapse");else domNavClassList.remove("collapse");

	handlers.call("collapse", [isCollapse], DOM.nav);
}

/**
 * @private
 * @returns {boolean}
 */
function isHeaderScrolled() {
	if (isOpen()) {
		return false;
	}

	return window.pageYOffset && window.pageYOffset > DOM.nav.parentNode.offsetHeight ? true : false;
}

/**
 * @private
 */
function requestEstimateShow() {
	requestEstimatePopup.show();
}

/**
 * @private
 */

function toggleNavIcon() {
	var isActive = DOM.nav.classList.toggle("active");

	iosBodyScrolling(isActive);

	DOM.navIco.classList.toggle("active");
	DOM.header.classList.toggle("opened");

	handlers.call("active", [isActive], DOM.nav);
	!isActive && viewport.isMobile() && requestEstimatePopup.isShow() && requestEstimatePopup.hide();
	// if (!isActive && !requestEstimatePopup.isShow()) {
	// 	scrollBlocker.scrollOn();
	// } else {
	// 	scrollBlocker.scrollOff();
	// }
}

function iosBodyScrolling(bool) {
	window.removeEventListener("touchmove", prevent);
	[].forEach.call(DOM.scrollable, function (item) {
		item.removeEventListener("touchstart", elPos);
		item.removeEventListener("touchmove", stopProp);
	});

	if (bool) {
		window.addEventListener("touchmove", prevent);
		[].forEach.call(DOM.scrollable, function (item) {
			item.addEventListener("touchstart", elPos);
			item.addEventListener("touchmove", stopProp);
		});
	}
}

function prevent(e) {
	e.preventDefault();
}

function elPos(e) {
	if (e.currentTarget.scrollTop === 0) {
		e.currentTarget.scrollTop = 1;
	} else if (e.currentTarget.scrollHeight === e.currentTarget.scrollTop + e.currentTarget.offsetHeight) {
		e.currentTarget.scrollTop -= 1;
	}
}

function stopProp(e) {
	e.stopPropagation();
}

function initToggleTransparentLayout() {
	var isTransparentSupport = DOM.header.classList.contains("js-toggle-transparent");

	if (viewport.isMobile() || !isTransparentSupport) return;

	toggleTransparentLayout();

	window.addEventListener("scroll", throttle(function () {
		toggleTransparentLayout();
	}, 300));
}

function toggleTransparentLayout() {
	var isScrolled = window.pageYOffset > 0;

	DOM.header.classList.toggle("l-header--transparent", !isScrolled);
}

/***/ }),

/***/ 34:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var global = __webpack_require__(35);
var core = __webpack_require__(9);
var ctx = __webpack_require__(88);
var hide = __webpack_require__(90);
var has = __webpack_require__(40);
var PROTOTYPE = 'prototype';

var $export = function $export(type, name, source) {
  var IS_FORCED = type & $export.F;
  var IS_GLOBAL = type & $export.G;
  var IS_STATIC = type & $export.S;
  var IS_PROTO = type & $export.P;
  var IS_BIND = type & $export.B;
  var IS_WRAP = type & $export.W;
  var exports = IS_GLOBAL ? core : core[name] || (core[name] = {});
  var expProto = exports[PROTOTYPE];
  var target = IS_GLOBAL ? global : IS_STATIC ? global[name] : (global[name] || {})[PROTOTYPE];
  var key, own, out;
  if (IS_GLOBAL) source = name;
  for (key in source) {
    // contains in native
    own = !IS_FORCED && target && target[key] !== undefined;
    if (own && has(exports, key)) continue;
    // export native or passed
    out = own ? target[key] : source[key];
    // prevent global pollution for namespaces
    exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]
    // bind timers to global for call from export context
    : IS_BIND && own ? ctx(out, global)
    // wrap global constructors for prevent change them in library
    : IS_WRAP && target[key] == out ? function (C) {
      var F = function F(a, b, c) {
        if (this instanceof C) {
          switch (arguments.length) {
            case 0:
              return new C();
            case 1:
              return new C(a);
            case 2:
              return new C(a, b);
          }return new C(a, b, c);
        }return C.apply(this, arguments);
      };
      F[PROTOTYPE] = C[PROTOTYPE];
      return F;
      // make static versions for prototype methods
    }(out) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
    // export proto methods to core.%CONSTRUCTOR%.methods.%NAME%
    if (IS_PROTO) {
      (exports.virtual || (exports.virtual = {}))[key] = out;
      // export proto methods to core.%CONSTRUCTOR%.prototype.%NAME%
      if (type & $export.R && expProto && !expProto[key]) hide(expProto, key, out);
    }
  }
};
// type bitmap
$export.F = 1; // forced
$export.G = 2; // global
$export.S = 4; // static
$export.P = 8; // proto
$export.B = 16; // bind
$export.W = 32; // wrap
$export.U = 64; // safe
$export.R = 128; // real proto method for `library`
module.exports = $export;

/***/ }),

/***/ 35:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math ? window : typeof self != 'undefined' && self.Math == Math ? self
// eslint-disable-next-line no-new-func
: Function('return this')();
if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef

/***/ }),

/***/ 36:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var anObject = __webpack_require__(91);
var IE8_DOM_DEFINE = __webpack_require__(37);
var toPrimitive = __webpack_require__(38);
var dP = Object.defineProperty;

exports.f = __webpack_require__(6) ? Object.defineProperty : function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPrimitive(P, true);
  anObject(Attributes);
  if (IE8_DOM_DEFINE) try {
    return dP(O, P, Attributes);
  } catch (e) {/* empty */}
  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported!');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};

/***/ }),

/***/ 37:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = !__webpack_require__(6) && !__webpack_require__(18)(function () {
  return Object.defineProperty(__webpack_require__(92)('div'), 'a', { get: function get() {
      return 7;
    } }).a != 7;
});

/***/ }),

/***/ 38:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// 7.1.1 ToPrimitive(input [, PreferredType])
var isObject = __webpack_require__(17);
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
module.exports = function (it, S) {
  if (!isObject(it)) return it;
  var fn, val;
  if (S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  if (typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it))) return val;
  if (!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  throw TypeError("Can't convert object to primitive value");
};

/***/ }),

/***/ 39:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};

/***/ }),

/***/ 40:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var hasOwnProperty = {}.hasOwnProperty;
module.exports = function (it, key) {
  return hasOwnProperty.call(it, key);
};

/***/ }),

/***/ 41:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// to indexed object, toObject with fallback for non-array-like ES3 strings
var IObject = __webpack_require__(96);
var defined = __webpack_require__(98);
module.exports = function (it) {
  return IObject(defined(it));
};

/***/ }),

/***/ 42:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = {
  assign: function assign(target, firstSource) {
    if (target === undefined || target === null) {
      throw new TypeError('Cannot convert first argument to object');
    }

    var to = Object(target);
    for (var i = 1; i < arguments.length; i++) {
      var nextSource = arguments[i];
      if (nextSource === undefined || nextSource === null) {
        continue;
      }

      var keysArray = Object.keys(Object(nextSource));
      for (var nextIndex = 0, len = keysArray.length; nextIndex < len; nextIndex++) {
        var nextKey = keysArray[nextIndex];
        var desc = Object.getOwnPropertyDescriptor(nextSource, nextKey);
        if (desc !== undefined && desc.enumerable) {
          to[nextKey] = nextSource[nextKey];
        }
      }
    }
    return to;
  }
};

/***/ }),

/***/ 43:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var Promise = __webpack_require__(104);
var googleAnalytics = __webpack_require__(3);
var axios = __webpack_require__(49);

if (!window.Promise) {
  window.Promise = Promise;
}

module.exports = {
  cache: {},

  sendRequest: function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
      var formData = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var formType = arguments[1];
      var formIdRequest = arguments[2];

      var _ref2, _ref2$data, sent, data;

      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              formData.page = document.location.pathname;
              formData.pageType = this._getPageType();

              this.cache[formIdRequest] = {};

              _context.next = 5;
              return axios.post(undefined ? "http://localhost:5001/api/core/requestEstimate" : "/api/core/requestEstimate", _extends({}, this.cache[formIdRequest], formData));

            case 5:
              _ref2 = _context.sent;
              _ref2$data = _ref2.data;
              sent = _ref2$data.sent;
              data = _objectWithoutProperties(_ref2$data, ["sent"]);


              this.cache[formIdRequest] = _extends({}, data, formData);

              _context.prev = 10;

              this._sendAnalytics(formIdRequest, formType);
              _context.next = 17;
              break;

            case 14:
              _context.prev = 14;
              _context.t0 = _context["catch"](10);

              console.error("Analytics request failed", _context.t0);

            case 17:
              _context.prev = 17;
              return _context.abrupt("return", this.cache[formIdRequest]);

            case 20:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, this, [[10, 14, 17, 20]]);
    }));

    function sendRequest() {
      return _ref.apply(this, arguments);
    }

    return sendRequest;
  }(),

  _sendAnalytics: function _sendAnalytics(formIdRequest, formType) {
    if (!window.google_trackConversion) return;

    switch (formIdRequest) {
      case "request-estimate-step1":
        window.google_trackConversion({
          google_conversion_id: 950055030,
          google_conversion_language: "en",
          google_conversion_format: "3",
          google_conversion_color: "ffffff",
          google_conversion_label: "KAoeCP7g6VwQ9uCCxQM",
          google_remarketing_only: false
        });

        window.google_trackConversion({
          google_conversion_id: 875350916,
          google_conversion_language: "en",
          google_conversion_format: "3",
          google_conversion_color: "ffffff",
          google_conversion_label: "qFB6CIqku28QhJezoQM",
          google_remarketing_only: false
        });

        if (typeof conversionGoal !== "undefined") window.optimizely.push(["trackEvent", conversionGoal]);

        _gaq.push(["_trackEvent", "formStepFirst", true]);
        yaCounter38650490.reachGoal("SUBMIT");

        if (formType === "footer") {
          var virtualPage = "/feedback_footer_wwd";

          switch (document.location.pathname) {
            case "/what-we-do/ble":
              virtualPage = "/ble_feedback_footer";
              break;
            case "/what-we-do/indoor":
              virtualPage = "/ibeacon_feedback_footer";
              break;
            case "/what-we-do/applewatch":
              virtualPage = "/watch_feedback_footer";
              break;
            case "/what-we-do/appletv":
              virtualPage = "/appletv_feedback_footer";
              break;
            default:
              break;
          }

          if (virtualPage) googleAnalytics.virtualPage({ page: virtualPage });
        }
        googleAnalytics.virtualPage({ page: "/thankyou_1_step" });
        break;
      case "request-estimate-step2":
        googleAnalytics.virtualPage({ page: "/thankyou_2_step" });
        break;
    }
  },

  _getPageType: function _getPageType() {
    var page = window.location.pathname;

    switch (page) {
      case "/what-we-do/mobile":
      case "/what-we-do/ios":
      case "/what-we-do/android":
        return "Mobile Development Enquiry";
      case "/what-we-do/desktop":
      case "/what-we-do/mac":
      case "/what-we-do/windows":
        return "Desktop Development Enquiry";

      case "/what-we-do/web":
        return "Web Development Enquiry";

      case "/what-we-do/ble":
        return "BLE Development Enquiry";

      case "/what-we-do/applewatch":
      case "/what-we-do/smartwatch":
      case "/what-we-do/androidwatch":
        return "Smart Watch Development Enquiry";

      case "/what-we-do/ellpa":
      case "/what-we-do/appletv":
      case "/what-we-do/smarttv":
        return "Multimedia App Development Enquiry";

      default:
        return "App Development Enquiry";
    }
  }
};

/***/ }),

/***/ 434:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
var scrollToSection = function scrollToSection(section) {
	var offset = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

	var currentSectionOffset = section.offsetTop;
	var currentWindowPosition = window.pageYOffset;
	var distance = currentSectionOffset - currentWindowPosition;
	var period = Math.abs(Math.ceil(distance / 3000 <= 0 ? 1 : distance / 3000));
	var startTime = null;

	function stepScroll(time) {
		if (startTime === null) startTime = time;

		var progress = (time - startTime) / 1000 * Math.PI / period;
		var currentDistance = (Math.sin(progress - Math.PI / 2) + 1) / 2;
		var step = currentWindowPosition + currentDistance * distance + offset;

		window.scrollTo(0, step);

		if (progress <= Math.PI) window.requestAnimationFrame(stepScroll);
	}

	if (currentWindowPosition !== currentSectionOffset) {
		window.requestAnimationFrame(stepScroll);
	}
};

exports.scrollToSection = scrollToSection;

/***/ }),

/***/ 44:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Module dependencies.
 * @private
 */

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var Support = __webpack_require__(14);
var formActions = __webpack_require__(43);

__webpack_require__(107);
__webpack_require__(108);

/**
 * @public
 * @constructor
 */
var requestEstimateForm = function requestEstimateForm() {
	if (!(this instanceof requestEstimateForm)) {
		new requestEstimateForm();
	}

	/**
  * @public
  * @type {Object}
  */
	this.DOM = {};
	this.data = {};
	this.formStep = 1;
	this.isSend = false;
};

/**
 * @public
 */
requestEstimateForm.prototype.init = function (container) {
	if (!container) return false;

	this.setDOM(container);
	this.initHandlers();
};

/**
 * @public
 */
requestEstimateForm.prototype.setDOM = function (container) {
	this.DOM.container = container;

	this.DOM.content = this.DOM.container.querySelector(".js-request_content");
	this.DOM.title = this.DOM.container.querySelector(".js-request_title span");
	this.DOM.success = this.DOM.container.querySelector(".js-request_success");
	this.DOM.fail = this.DOM.container.querySelector(".js-request_fail");

	this.DOM.form = this.DOM.container.querySelector(".js-request_form");
	this.DOM.formSteps = {
		wrap: this.DOM.form.querySelector(".js-request_steps"),
		step: this.DOM.form.querySelectorAll(".js-request_step")
	};
	this.DOM.footer = this.DOM.form.querySelector(".b-request_footer");
	this.DOM.formReload = Array.from(this.DOM.container.querySelectorAll(".js-request_reload")), this.DOM.formSubmit = this.DOM.footer.querySelector(".js-request_submit");
	this.DOM.budget = this.DOM.form.querySelector(".js-request_budget");
	this.DOM.adviser = this.DOM.form.querySelector(".js-request_adviser");
	this.DOM.fields = {
		text: Array.apply(null, this.DOM.form.querySelectorAll(".js-request_field")),
		radio: {
			budget: Array.apply(null, this.DOM.form.querySelectorAll("[name='budget']")),
			adviser: Array.apply(null, this.DOM.form.querySelectorAll("[name='adviser']"))
		},
		required: []
	};
};

/**
 * @public
 * @param text {String}
 */
requestEstimateForm.prototype.setTitle = function (text) {
	if (this.DOM.title) this.DOM.title.innerHTML = text;
};

/**
 * @public
 * @return {String}
 */
requestEstimateForm.prototype.getTitle = function () {
	return this.DOM.title.innerHTML;
};

/**
 * @public
 */
requestEstimateForm.prototype.initHandlers = function () {
	var self = this;

	this.DOM.form.onsubmit = function () {
		self.checkFormStep() && self.sendRequest();
		return false;
	};

	this.DOM.fields.text.map(function (field) {
		field.addEventListener("keyup", function () {
			if (this.value) {
				this.classList.add("full");
			} else {
				this.classList.remove("full");
			}

			self.data[this.name] = this.value;
		});

		field.addEventListener("blur", function () {
			self.data[this.name] = this.value;
		});

		if (field.classList.contains("required")) {
			self.DOM.fields.required.push(field);

			field.addEventListener("focus", function () {
				this.parentNode.classList.remove("error");
			});
		}

		if (field.classList.contains("radio")) {
			field.addEventListener("focus", function () {
				var id = this.parentNode.parentNode.getAttribute("for");

				var radio = document.getElementById(id);

				radio.checked = true;
				self.data[radio.name] = radio.value;
			});
		}

		return field;
	});

	var _DOM$fields$radio = this.DOM.fields.radio,
	    budget = _DOM$fields$radio.budget,
	    adviser = _DOM$fields$radio.adviser;


	[].concat(_toConsumableArray(budget), _toConsumableArray(adviser)).map(function (field) {
		field.onchange = function () {
			self.data[this.name] = this.value;
			this.checked && self.DOM.budget.classList.remove("error");
			this.checked && self.DOM.adviser.classList.remove("error");
		};
		return field;
	});

	this.DOM.formReload.map(function (button) {
		button.addEventListener("click", function () {
			return self.clearForm();
		});
	});
};

/**
 * @public
 */
requestEstimateForm.prototype.onShow = function () {
	!Support.isSafari() && this.autofocus(0);
};

/**
 * @public
 */
requestEstimateForm.prototype.onHide = function () {
	this.DOM.container.classList.remove("finished");
	this.DOM.content.classList.remove("g-hide");
	this.DOM.fail.classList.add("g-hide");
	this.DOM.success.classList.add("g-hide");
};

/**
 * @public
 */
requestEstimateForm.prototype.nextFormStep = function () {
	this.formStep++;

	if (this.formStep === 2) {
		this.DOM.formSteps.wrap.classList.remove("fst");
		this.DOM.formSteps.wrap.classList.add("sec");
	} else if (this.formStep === 3) {
		this.DOM.formSteps.wrap.classList.remove("sec");
		this.DOM.formSteps.wrap.classList.add("third");

		this.setTitle("Thank you!");
	}

	setTimeout(function () {
		this.autofocus(1);
	}.bind(this), 1000);

	/* if (this.formStep !== 1) {
 	_gaq.push(['_trackEvent', 'formSubmit', true]);
 	yaCounter38650490.reachGoal('SUBMIT');
 } */
};

/**
 * @public
 * @param i {Number}
 */
requestEstimateForm.prototype.autofocus = function (i) {
	this.DOM.formSteps.step[i].querySelector(".autofocus").focus();
};

/**
 * @public
 */
requestEstimateForm.prototype.prevFormStep = function () {
	this.formStep -= 2;
	this.DOM.formSteps.wrap.classList.remove("third");
	this.DOM.formSteps.wrap.classList.add("fst");
};

/**
 * @public
 * @returns {Boolean}
 */
requestEstimateForm.prototype.checkFormStep = function () {
	return this.isFormStepFirst() ? this.checkFormStepFirst() : this.isFormStepLast() ? this.checkFormStepThird() : this.checkFormStepSecond();
};

/**
 * @public
 * @returns {Boolean}
 */
requestEstimateForm.prototype.checkFormStepFirst = function () {
	var result = true;

	this.DOM.fields.required.map(function (field) {
		var value = field.value.trim();

		if (!value) {
			field.parentNode.classList.add("error");
			field.value = "";
			result = false;
		} else if (field.name === "mail") {
			var isValid = false;

			/*
    *  RegEx has ben taken from https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/email
    *  Browsers that implement the specification should be using an algorithm equivalent to the following regular expression:
    *
    *  /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
    */

			var isEmailValid = value.match(/^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]{1,63}@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/);
			var isPhoneValid = value.replace(/\s/g, "").match(/^(\+?([0-9][\-.]?){3,4}|(\+?[0-9][\-.]?)?\([0-9]{3}\)[\-.]?)([0-9][\-.]?){2}[0-9][^@]*$/i);

			if (isEmailValid || isPhoneValid) {
				isValid = true;
			}

			if (!isValid) {
				field.parentNode.classList.add("error");
				result = false;
			}
		}

		return field;
	});

	return result;
};

/**
 * @public
 * @returns {Boolean}
 */
requestEstimateForm.prototype.checkFormStepSecond = function () {
	var result = false;

	this.DOM.fields.radio.budget.map(function (field) {
		field.checked && (result = true);

		return field;
	});

	!result && this.DOM.budget.classList.add("error");

	return result;
};

/**
 * @public
 * @returns {Boolean}
 */
requestEstimateForm.prototype.checkFormStepThird = function () {
	var result = this.DOM.fields.radio.adviser.some(function (field) {
		return field.checked;
	});

	!result && this.DOM.adviser.classList.add("error");

	return result;
};

/**
 * @public
 * @returns {Boolean}
 */
requestEstimateForm.prototype.isFormStepFirst = function () {
	return this.formStep < 2;
};

requestEstimateForm.prototype.isFormStepLast = function () {
	return this.formStep > 2;
};

requestEstimateForm.prototype.setSending = function (status) {
	this.isSending = status;
	this.DOM.form.classList.toggle("js-is-sending", status);
};

/**
 * @public
 * @param isError {Boolean}
 */
requestEstimateForm.prototype.showResult = function () {
	this.DOM.container.classList.add("finished");
	this.DOM.formSteps.wrap.classList.add("g-hide");

	if (this.DOM.title) this.DOM.title.classList.add("g-hide");

	this.DOM.footer.classList.add("g-hide");
	this.DOM.success.classList.remove("g-hide");
	this.prevFormStep();
};

requestEstimateForm.prototype.showError = function () {
	this.DOM.formSteps.wrap.classList.add("g-hide");

	if (this.DOM.title) this.DOM.title.classList.add("g-hide");

	this.DOM.footer.classList.add("g-hide");
	this.DOM.fail.classList.remove("g-hide");
};

requestEstimateForm.prototype.hideResult = function () {
	this.DOM.formSteps.wrap.classList.remove("g-hide");

	if (this.DOM.title) this.DOM.title.classList.remove("g-hide");

	this.DOM.footer.classList.remove("g-hide");
	this.DOM.fail.classList.add("g-hide");
	this.DOM.success.classList.add("g-hide");
};

/**
 * @public
 * @returns {Boolean}
 */
requestEstimateForm.prototype.clearForm = function () {
	this.setTitle("Request a Project Estimation");
	this.hideResult();

	this.DOM.fields.text.map(function (field) {
		field.parentNode.classList.remove("error");
		field.classList.remove("full");
		field.value = "";

		return field;
	});

	var _DOM$fields$radio2 = this.DOM.fields.radio,
	    budget = _DOM$fields$radio2.budget,
	    adviser = _DOM$fields$radio2.adviser;


	[].concat(_toConsumableArray(budget), _toConsumableArray(adviser)).map(function (field) {
		field.checked = false;
		return field;
	});

	this.data = {};
};

/**
 * @public
 * @param formType {String}
 * @returns {Boolean}
 */
requestEstimateForm.prototype.sendRequest = function () {
	var self = this;

	if (this.isSending) return;
	this.setSending(true);

	this.data.step = this.formStep - 1;
	var formData = this.data;

	var formIdRequest = self.isFormStepFirst() ? 'request-estimate-step1' : 'request-estimate-step2';
	var formType = self.DOM.form.getAttribute("data-type");

	formActions.sendRequest(formData, formType, formIdRequest).then(function (data) {
		self.data = data;
		self.setSending(false);

		if (!self.isFormStepLast()) {
			self.nextFormStep();
		} else {
			self.showResult();
		}
	}).catch(function (error) {
		console.error(error);
		self.setSending(false);
		self.showError();
	});
};

/**
 * @public
 * @type {Handlers}
 */
module.exports = requestEstimateForm;

/***/ }),

/***/ 45:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Module dependencies.
 * @private
 */

var Support = __webpack_require__(14);
var googleAnalytics = __webpack_require__(3);
var formActions = __webpack_require__(43);
var Handlers = __webpack_require__(7);
var assign = __webpack_require__(42);

/**
 * @public
 * @constructor
 */
var requestAdviserForm = function requestAdviserForm() {
    if (!(this instanceof requestAdviserForm)) {
        new requestAdviserForm();
    }

    /**
     * @public
     * @type {Object}
     */
    this.DOM = {};
    this.data = {};
    this.isSend = false;
    this.handlers = new Handlers();

    this.on = this.handlers.add.bind(this.handlers);
    this.off = this.handlers.remove.bind(this.handlers);
};

requestAdviserForm.prototype.setAdviser = function (radioButtons) {
    var referrer = this.getReferrerUrlFromCookies();

    for (var i = 0; i < radioButtons.length; i++) {
        var value = radioButtons[i].value.toLowerCase().trim();

        // https://www.appfutura.com/
        // https://clutch.co/
        // https://www.goodfirms.co/

        var canCheck = value === "appfutura" && referrer.match(/https:\/\/(www\.)?appfutura\.com[^a-z]/i) || value === "clutch" && referrer.match(/https:\/\/(www\.)?clutch\.co[^a-z]?/i) || value === "google" && referrer.match(/https:\/\/(www\.)?google\./i) || value === "goodfirms" && referrer.match(/https:\/\/(www\.)?goodfirms\.co[^a-z]?/i);

        if (canCheck) {
            var radioButton = radioButtons[i];

            radioButton.checked = true;
            this.data[radioButton.name] = radioButton.value;

            break;
        }
    }
};

requestAdviserForm.prototype.getReferrerUrlFromCookies = function () {
    return document.cookie.replace(/(?:(?:^|.*;\s*)referrerUrl\s*\=\s*([^;]*).*$)|^.*$/, "$1");
};

requestAdviserForm.prototype.setReferrerUrlIntoCookies = function () {
    var referrer = null;
    var search = document.location.search;

    if (search.match(/[^a-z]?utm_source=appfutura[^a-z]?/i)) {
        referrer = "https://www.appfutura.com/";
    } else if (search.match(/[^a-z]?utm_source=clutch[^a-z]?/i)) {
        referrer = "https://clutch.co/";
    } else if (search.match(/[^a-z]?utm_source=goodfirms[^a-z]?/i)) {
        referrer = "https://www.goodfirms.co/";
    } else if (search.match(/[^a-z]?gclid=/i)) {
        referrer = "https://www.google.com/";
    } else {
        referrer = document.referrer;
    }

    if (!referrer) {
        document.cookie = "referrerUrl=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    } else {
        var cookieReferrer = this.getReferrerUrlFromCookies();

        if (cookieReferrer !== referrer && !referrer.match(/https:\/\/([a-z]{3}\.)?(mercdev|mercurydevelopment)\.com/i)) {
            document.cookie = "referrerUrl=" + referrer + "; path=/;";
        }
    }
};

/**
 * @public
 */
requestAdviserForm.prototype.init = function (container) {
    if (!container) return false;

    this.setReferrerUrlIntoCookies();
    this.setDOM(container);
    this.initHandlers();
};

/**
 * @public
 */
requestAdviserForm.prototype.setDOM = function (container) {
    this.DOM.container = container;

    this.DOM.form = this.DOM.container.querySelector(".js-request_form");
    this.DOM.formSubmit = this.DOM.form.querySelector(".js-request_submit");
    this.DOM.adviser = this.DOM.form.querySelector(".js-request_adviser");
    this.DOM.fields = {
        text: Array.apply(null, this.DOM.form.querySelectorAll(".js-request_field")),
        radio: Array.apply(null, this.DOM.form.querySelectorAll("[name='adviser']")),
        required: []
    };

    this.setAdviser(this.DOM.fields.radio);
};

/**
 * @public
 */
requestAdviserForm.prototype.initHandlers = function () {
    var self = this;

    this.DOM.form.onsubmit = function () {

        self.checkForm() && self.sendRequest();
        return false;
    };

    this.DOM.fields.text.map(function (field) {
        field.addEventListener("keyup", function () {
            if (this.value) {
                this.classList.add("full");
            } else {
                this.classList.remove("full");
            }
        });

        field.addEventListener("blur", function () {
            self.data[this.name] = this.value;
        });

        if (field.classList.contains("required")) {
            self.DOM.fields.required.push(field);

            field.addEventListener("focus", function () {
                this.parentNode.classList.remove("error");
            });
        }

        if (field.classList.contains("radio")) {
            field.addEventListener("focus", function () {
                var id = this.parentNode.parentNode.getAttribute("for");

                var radio = document.getElementById(id);

                radio.checked = true;
                self.data[radio.name] = radio.value;
            });
        }

        return field;
    });

    this.DOM.fields.radio.map(function (field) {
        field.onchange = function () {
            self.data[this.name] = this.value;
            this.checked && self.DOM.adviser.classList.remove("error");
        };
        return field;
    });
};

/**
 * @public
 * @returns {Boolean}
 */
requestAdviserForm.prototype.checkForm = function () {
    /*var result = false;
     this.DOM.fields.radio.map(function(field) {
        field.checked && (result = true);
         return field;
    });
     !result && this.DOM.adviser.classList.add("error");
     return result;*/

    return true;
};

requestAdviserForm.prototype.setSending = function (status) {
    this.isSending = status;
    this.DOM.form.classList.toggle("js-is-sending", status);
};

requestAdviserForm.prototype.showError = function () {
    this.DOM.fail.classList.remove("g-hide");
};

/**
 * @public
 * @returns {Boolean}
 */
requestAdviserForm.prototype.clearForm = function () {
    this.DOM.fields.text.map(function (field) {
        field.parentNode.classList.remove("error");
        field.classList.remove("full");
        field.value = "";

        return field;
    });

    this.DOM.adviser.classList.remove("error");

    this.DOM.fields.radio.map(function (field) {
        field.checked = false;
        return field;
    });

    this.data = {};

    this.setAdviser(this.DOM.fields.radio);
};

/**
 * @public
 * @param formType {String}
 * @returns {Boolean}
 */
requestAdviserForm.prototype.sendRequest = function () {
    var self = this;
    var formData = this.data;

    if (this.isSending) return;
    this.setSending(true);

    var formIdRequest = 'request-estimate-adviser';
    var formType = self.DOM.form.getAttribute("data-type");

    if (formActions.cache['request-estimate-step2']) {
        formData = assign.assign({}, formActions.cache['request-estimate-step2'], formData);
    }

    formActions.sendRequest(formData, formType, formIdRequest).then(function (data) {
        self.data = data;

        self.setSending(false);
        self.handlers.call('done');
        self.clearForm();
    }).catch(function (error) {
        console.error(error);
        self.setSending(false);
        self.showError();
        self.clearForm();
    });
};

/**
 * @public
 * @type {Handlers}
 */
module.exports = requestAdviserForm;

/***/ }),

/***/ 46:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike(value) {
  return value != null && (typeof value === 'undefined' ? 'undefined' : _typeof(value)) == 'object';
}

module.exports = isObjectLike;

/***/ }),

/***/ 47:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _Symbol = __webpack_require__(32),
    getRawTag = __webpack_require__(80),
    objectToString = __webpack_require__(81);

/** `Object#toString` result references. */
var nullTag = '[object Null]',
    undefinedTag = '[object Undefined]';

/** Built-in value references. */
var symToStringTag = _Symbol ? _Symbol.toStringTag : undefined;

/**
 * The base implementation of `getTag` without fallbacks for buggy environments.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */
function baseGetTag(value) {
    if (value == null) {
        return value === undefined ? undefinedTag : nullTag;
    }
    return symToStringTag && symToStringTag in Object(value) ? getRawTag(value) : objectToString(value);
}

module.exports = baseGetTag;

/***/ }),

/***/ 48:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Module dependencies.
 * @private
 */

var googleAnalytics = __webpack_require__(3);
var requestEstimatePopup = __webpack_require__(16);

/**
 * @public
 * @type {Object}
 */
module.exports = {
	init: function init(className, isHeaderLink) {
		if (typeof isHeaderLink === "undefined") isHeaderLink = false;

		var links = document.querySelectorAll(className || ".js-request_estimate_link");
		var self = this;

		for (var i = 0; i < links.length; i++) {
			var link = links[i];

			if (link) {
				requestEstimatePopup.init();

				link.addEventListener('click', function () {
					if (isHeaderLink) {
						googleAnalytics.virtualPage({ page: '/feedback_head' });
					} else {
						self.getGoogleVirtualPageAddress();
					}
					this.classList.add("active");
					requestEstimatePopup.show();

					_gaq.push(['_trackEvent', 'popupLink', 'click&show']);
				});

				requestEstimatePopup.on("hide", function () {
					link.classList.remove("active");
				});
			}
		}
	},
	getGoogleVirtualPageAddress: function getGoogleVirtualPageAddress() {
		var virtualPage = "";
		switch (document.location.pathname) {
			case "/what-we-do/ble":
				virtualPage = "/ble_feedback";
				break;
			case "/what-we-do/indoor":
				virtualPage = "/ibeacon_feedback";
				break;
			case "/what-we-do/applewatch":
				virtualPage = "/watch_feedback";
				break;
			case "/what-we-do/appletv":
				virtualPage = "/appletv_feedback";
				break;
			default:
				break;
		}

		if (virtualPage) googleAnalytics.virtualPage({ page: virtualPage });
	}
};

/***/ }),

/***/ 49:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = __webpack_require__(51);

/***/ }),

/***/ 50:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/** Detect free variable `global` from Node.js. */
var freeGlobal = (typeof global === 'undefined' ? 'undefined' : _typeof(global)) == 'object' && global && global.Object === Object && global;

module.exports = freeGlobal;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(13)))

/***/ }),

/***/ 51:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(0);
var bind = __webpack_require__(22);
var Axios = __webpack_require__(52);
var mergeConfig = __webpack_require__(29);
var defaults = __webpack_require__(15);

/**
 * Create an instance of Axios
 *
 * @param {Object} defaultConfig The default config for the instance
 * @return {Axios} A new instance of Axios
 */
function createInstance(defaultConfig) {
  var context = new Axios(defaultConfig);
  var instance = bind(Axios.prototype.request, context);

  // Copy axios.prototype to instance
  utils.extend(instance, Axios.prototype, context);

  // Copy context to instance
  utils.extend(instance, context);

  // Factory for creating new instances
  instance.create = function create(instanceConfig) {
    return createInstance(mergeConfig(defaultConfig, instanceConfig));
  };

  return instance;
}

// Create the default instance to be exported
var axios = createInstance(defaults);

// Expose Axios class to allow class inheritance
axios.Axios = Axios;

// Expose Cancel & CancelToken
axios.CanceledError = __webpack_require__(8);
axios.CancelToken = __webpack_require__(70);
axios.isCancel = __webpack_require__(28);
axios.VERSION = __webpack_require__(30).version;
axios.toFormData = __webpack_require__(25);

// Expose AxiosError class
axios.AxiosError = __webpack_require__(2);

// alias for CanceledError for backward compatibility
axios.Cancel = axios.CanceledError;

// Expose all/spread
axios.all = function all(promises) {
  return Promise.all(promises);
};
axios.spread = __webpack_require__(71);

// Expose isAxiosError
axios.isAxiosError = __webpack_require__(72);

module.exports = axios;

// Allow use of default import syntax in TypeScript
module.exports.default = axios;

/***/ }),

/***/ 52:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(0);
var buildURL = __webpack_require__(23);
var InterceptorManager = __webpack_require__(53);
var dispatchRequest = __webpack_require__(54);
var mergeConfig = __webpack_require__(29);
var buildFullPath = __webpack_require__(27);
var validator = __webpack_require__(69);

var validators = validator.validators;
/**
 * Create a new instance of Axios
 *
 * @param {Object} instanceConfig The default config for the instance
 */
function Axios(instanceConfig) {
  this.defaults = instanceConfig;
  this.interceptors = {
    request: new InterceptorManager(),
    response: new InterceptorManager()
  };
}

/**
 * Dispatch a request
 *
 * @param {Object} config The config specific for this request (merged with this.defaults)
 */
Axios.prototype.request = function request(configOrUrl, config) {
  /*eslint no-param-reassign:0*/
  // Allow for axios('example/url'[, config]) a la fetch API
  if (typeof configOrUrl === 'string') {
    config = config || {};
    config.url = configOrUrl;
  } else {
    config = configOrUrl || {};
  }

  config = mergeConfig(this.defaults, config);

  // Set config.method
  if (config.method) {
    config.method = config.method.toLowerCase();
  } else if (this.defaults.method) {
    config.method = this.defaults.method.toLowerCase();
  } else {
    config.method = 'get';
  }

  var transitional = config.transitional;

  if (transitional !== undefined) {
    validator.assertOptions(transitional, {
      silentJSONParsing: validators.transitional(validators.boolean),
      forcedJSONParsing: validators.transitional(validators.boolean),
      clarifyTimeoutError: validators.transitional(validators.boolean)
    }, false);
  }

  // filter out skipped interceptors
  var requestInterceptorChain = [];
  var synchronousRequestInterceptors = true;
  this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {
    if (typeof interceptor.runWhen === 'function' && interceptor.runWhen(config) === false) {
      return;
    }

    synchronousRequestInterceptors = synchronousRequestInterceptors && interceptor.synchronous;

    requestInterceptorChain.unshift(interceptor.fulfilled, interceptor.rejected);
  });

  var responseInterceptorChain = [];
  this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {
    responseInterceptorChain.push(interceptor.fulfilled, interceptor.rejected);
  });

  var promise;

  if (!synchronousRequestInterceptors) {
    var chain = [dispatchRequest, undefined];

    Array.prototype.unshift.apply(chain, requestInterceptorChain);
    chain = chain.concat(responseInterceptorChain);

    promise = Promise.resolve(config);
    while (chain.length) {
      promise = promise.then(chain.shift(), chain.shift());
    }

    return promise;
  }

  var newConfig = config;
  while (requestInterceptorChain.length) {
    var onFulfilled = requestInterceptorChain.shift();
    var onRejected = requestInterceptorChain.shift();
    try {
      newConfig = onFulfilled(newConfig);
    } catch (error) {
      onRejected(error);
      break;
    }
  }

  try {
    promise = dispatchRequest(newConfig);
  } catch (error) {
    return Promise.reject(error);
  }

  while (responseInterceptorChain.length) {
    promise = promise.then(responseInterceptorChain.shift(), responseInterceptorChain.shift());
  }

  return promise;
};

Axios.prototype.getUri = function getUri(config) {
  config = mergeConfig(this.defaults, config);
  var fullPath = buildFullPath(config.baseURL, config.url);
  return buildURL(fullPath, config.params, config.paramsSerializer);
};

// Provide aliases for supported request methods
utils.forEach(['delete', 'get', 'head', 'options'], function forEachMethodNoData(method) {
  /*eslint func-names:0*/
  Axios.prototype[method] = function (url, config) {
    return this.request(mergeConfig(config || {}, {
      method: method,
      url: url,
      data: (config || {}).data
    }));
  };
});

utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  /*eslint func-names:0*/

  function generateHTTPMethod(isForm) {
    return function httpMethod(url, data, config) {
      return this.request(mergeConfig(config || {}, {
        method: method,
        headers: isForm ? {
          'Content-Type': 'multipart/form-data'
        } : {},
        url: url,
        data: data
      }));
    };
  }

  Axios.prototype[method] = generateHTTPMethod();

  Axios.prototype[method + 'Form'] = generateHTTPMethod(true);
});

module.exports = Axios;

/***/ }),

/***/ 53:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(0);

function InterceptorManager() {
  this.handlers = [];
}

/**
 * Add a new interceptor to the stack
 *
 * @param {Function} fulfilled The function to handle `then` for a `Promise`
 * @param {Function} rejected The function to handle `reject` for a `Promise`
 *
 * @return {Number} An ID used to remove interceptor later
 */
InterceptorManager.prototype.use = function use(fulfilled, rejected, options) {
  this.handlers.push({
    fulfilled: fulfilled,
    rejected: rejected,
    synchronous: options ? options.synchronous : false,
    runWhen: options ? options.runWhen : null
  });
  return this.handlers.length - 1;
};

/**
 * Remove an interceptor from the stack
 *
 * @param {Number} id The ID that was returned by `use`
 */
InterceptorManager.prototype.eject = function eject(id) {
  if (this.handlers[id]) {
    this.handlers[id] = null;
  }
};

/**
 * Iterate over all the registered interceptors
 *
 * This method is particularly useful for skipping over any
 * interceptors that may have become `null` calling `eject`.
 *
 * @param {Function} fn The function to call for each interceptor
 */
InterceptorManager.prototype.forEach = function forEach(fn) {
  utils.forEach(this.handlers, function forEachHandler(h) {
    if (h !== null) {
      fn(h);
    }
  });
};

module.exports = InterceptorManager;

/***/ }),

/***/ 54:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(0);
var transformData = __webpack_require__(55);
var isCancel = __webpack_require__(28);
var defaults = __webpack_require__(15);
var CanceledError = __webpack_require__(8);

/**
 * Throws a `CanceledError` if cancellation has been requested.
 */
function throwIfCancellationRequested(config) {
  if (config.cancelToken) {
    config.cancelToken.throwIfRequested();
  }

  if (config.signal && config.signal.aborted) {
    throw new CanceledError();
  }
}

/**
 * Dispatch a request to the server using the configured adapter.
 *
 * @param {object} config The config that is to be used for the request
 * @returns {Promise} The Promise to be fulfilled
 */
module.exports = function dispatchRequest(config) {
  throwIfCancellationRequested(config);

  // Ensure headers exist
  config.headers = config.headers || {};

  // Transform request data
  config.data = transformData.call(config, config.data, config.headers, config.transformRequest);

  // Flatten headers
  config.headers = utils.merge(config.headers.common || {}, config.headers[config.method] || {}, config.headers);

  utils.forEach(['delete', 'get', 'head', 'post', 'put', 'patch', 'common'], function cleanHeaderConfig(method) {
    delete config.headers[method];
  });

  var adapter = config.adapter || defaults.adapter;

  return adapter(config).then(function onAdapterResolution(response) {
    throwIfCancellationRequested(config);

    // Transform response data
    response.data = transformData.call(config, response.data, response.headers, config.transformResponse);

    return response;
  }, function onAdapterRejection(reason) {
    if (!isCancel(reason)) {
      throwIfCancellationRequested(config);

      // Transform response data
      if (reason && reason.response) {
        reason.response.data = transformData.call(config, reason.response.data, reason.response.headers, config.transformResponse);
      }
    }

    return Promise.reject(reason);
  });
};

/***/ }),

/***/ 55:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(0);
var defaults = __webpack_require__(15);

/**
 * Transform the data for a request or a response
 *
 * @param {Object|String} data The data to be transformed
 * @param {Array} headers The headers for the request or response
 * @param {Array|Function} fns A single function or Array of functions
 * @returns {*} The resulting transformed data
 */
module.exports = function transformData(data, headers, fns) {
  var context = this || defaults;
  /*eslint no-param-reassign:0*/
  utils.forEach(fns, function transform(fn) {
    data = fn.call(context, data, headers);
  });

  return data;
};

/***/ }),

/***/ 56:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(0);

module.exports = function normalizeHeaderName(headers, normalizedName) {
  utils.forEach(headers, function processHeader(value, name) {
    if (name !== normalizedName && name.toUpperCase() === normalizedName.toUpperCase()) {
      headers[normalizedName] = value;
      delete headers[name];
    }
  });
};

/***/ }),

/***/ 57:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <http://feross.org>
 * @license  MIT
 */
/* eslint-disable no-proto */



var base64 = __webpack_require__(58);
var ieee754 = __webpack_require__(59);
var isArray = __webpack_require__(60);

exports.Buffer = Buffer;
exports.SlowBuffer = SlowBuffer;
exports.INSPECT_MAX_BYTES = 50;

/**
 * If `Buffer.TYPED_ARRAY_SUPPORT`:
 *   === true    Use Uint8Array implementation (fastest)
 *   === false   Use Object implementation (most compatible, even IE6)
 *
 * Browsers that support typed arrays are IE 10+, Firefox 4+, Chrome 7+, Safari 5.1+,
 * Opera 11.6+, iOS 4.2+.
 *
 * Due to various browser bugs, sometimes the Object implementation will be used even
 * when the browser supports typed arrays.
 *
 * Note:
 *
 *   - Firefox 4-29 lacks support for adding new properties to `Uint8Array` instances,
 *     See: https://bugzilla.mozilla.org/show_bug.cgi?id=695438.
 *
 *   - Chrome 9-10 is missing the `TypedArray.prototype.subarray` function.
 *
 *   - IE10 has a broken `TypedArray.prototype.subarray` function which returns arrays of
 *     incorrect length in some situations.

 * We detect these buggy browsers and set `Buffer.TYPED_ARRAY_SUPPORT` to `false` so they
 * get the Object implementation, which is slower but behaves correctly.
 */
Buffer.TYPED_ARRAY_SUPPORT = global.TYPED_ARRAY_SUPPORT !== undefined ? global.TYPED_ARRAY_SUPPORT : typedArraySupport();

/*
 * Export kMaxLength after typed array support is determined.
 */
exports.kMaxLength = kMaxLength();

function typedArraySupport() {
  try {
    var arr = new Uint8Array(1);
    arr.__proto__ = { __proto__: Uint8Array.prototype, foo: function foo() {
        return 42;
      } };
    return arr.foo() === 42 && // typed array instances can be augmented
    typeof arr.subarray === 'function' && // chrome 9-10 lack `subarray`
    arr.subarray(1, 1).byteLength === 0; // ie10 has broken `subarray`
  } catch (e) {
    return false;
  }
}

function kMaxLength() {
  return Buffer.TYPED_ARRAY_SUPPORT ? 0x7fffffff : 0x3fffffff;
}

function createBuffer(that, length) {
  if (kMaxLength() < length) {
    throw new RangeError('Invalid typed array length');
  }
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    // Return an augmented `Uint8Array` instance, for best performance
    that = new Uint8Array(length);
    that.__proto__ = Buffer.prototype;
  } else {
    // Fallback: Return an object instance of the Buffer class
    if (that === null) {
      that = new Buffer(length);
    }
    that.length = length;
  }

  return that;
}

/**
 * The Buffer constructor returns instances of `Uint8Array` that have their
 * prototype changed to `Buffer.prototype`. Furthermore, `Buffer` is a subclass of
 * `Uint8Array`, so the returned instances will have all the node `Buffer` methods
 * and the `Uint8Array` methods. Square bracket notation works as expected -- it
 * returns a single octet.
 *
 * The `Uint8Array` prototype remains unmodified.
 */

function Buffer(arg, encodingOrOffset, length) {
  if (!Buffer.TYPED_ARRAY_SUPPORT && !(this instanceof Buffer)) {
    return new Buffer(arg, encodingOrOffset, length);
  }

  // Common case.
  if (typeof arg === 'number') {
    if (typeof encodingOrOffset === 'string') {
      throw new Error('If encoding is specified then the first argument must be a string');
    }
    return allocUnsafe(this, arg);
  }
  return from(this, arg, encodingOrOffset, length);
}

Buffer.poolSize = 8192; // not used by this implementation

// TODO: Legacy, not needed anymore. Remove in next major version.
Buffer._augment = function (arr) {
  arr.__proto__ = Buffer.prototype;
  return arr;
};

function from(that, value, encodingOrOffset, length) {
  if (typeof value === 'number') {
    throw new TypeError('"value" argument must not be a number');
  }

  if (typeof ArrayBuffer !== 'undefined' && value instanceof ArrayBuffer) {
    return fromArrayBuffer(that, value, encodingOrOffset, length);
  }

  if (typeof value === 'string') {
    return fromString(that, value, encodingOrOffset);
  }

  return fromObject(that, value);
}

/**
 * Functionally equivalent to Buffer(arg, encoding) but throws a TypeError
 * if value is a number.
 * Buffer.from(str[, encoding])
 * Buffer.from(array)
 * Buffer.from(buffer)
 * Buffer.from(arrayBuffer[, byteOffset[, length]])
 **/
Buffer.from = function (value, encodingOrOffset, length) {
  return from(null, value, encodingOrOffset, length);
};

if (Buffer.TYPED_ARRAY_SUPPORT) {
  Buffer.prototype.__proto__ = Uint8Array.prototype;
  Buffer.__proto__ = Uint8Array;
  if (typeof Symbol !== 'undefined' && Symbol.species && Buffer[Symbol.species] === Buffer) {
    // Fix subarray() in ES2016. See: https://github.com/feross/buffer/pull/97
    Object.defineProperty(Buffer, Symbol.species, {
      value: null,
      configurable: true
    });
  }
}

function assertSize(size) {
  if (typeof size !== 'number') {
    throw new TypeError('"size" argument must be a number');
  } else if (size < 0) {
    throw new RangeError('"size" argument must not be negative');
  }
}

function alloc(that, size, fill, encoding) {
  assertSize(size);
  if (size <= 0) {
    return createBuffer(that, size);
  }
  if (fill !== undefined) {
    // Only pay attention to encoding if it's a string. This
    // prevents accidentally sending in a number that would
    // be interpretted as a start offset.
    return typeof encoding === 'string' ? createBuffer(that, size).fill(fill, encoding) : createBuffer(that, size).fill(fill);
  }
  return createBuffer(that, size);
}

/**
 * Creates a new filled Buffer instance.
 * alloc(size[, fill[, encoding]])
 **/
Buffer.alloc = function (size, fill, encoding) {
  return alloc(null, size, fill, encoding);
};

function allocUnsafe(that, size) {
  assertSize(size);
  that = createBuffer(that, size < 0 ? 0 : checked(size) | 0);
  if (!Buffer.TYPED_ARRAY_SUPPORT) {
    for (var i = 0; i < size; ++i) {
      that[i] = 0;
    }
  }
  return that;
}

/**
 * Equivalent to Buffer(num), by default creates a non-zero-filled Buffer instance.
 * */
Buffer.allocUnsafe = function (size) {
  return allocUnsafe(null, size);
};
/**
 * Equivalent to SlowBuffer(num), by default creates a non-zero-filled Buffer instance.
 */
Buffer.allocUnsafeSlow = function (size) {
  return allocUnsafe(null, size);
};

function fromString(that, string, encoding) {
  if (typeof encoding !== 'string' || encoding === '') {
    encoding = 'utf8';
  }

  if (!Buffer.isEncoding(encoding)) {
    throw new TypeError('"encoding" must be a valid string encoding');
  }

  var length = byteLength(string, encoding) | 0;
  that = createBuffer(that, length);

  var actual = that.write(string, encoding);

  if (actual !== length) {
    // Writing a hex string, for example, that contains invalid characters will
    // cause everything after the first invalid character to be ignored. (e.g.
    // 'abxxcd' will be treated as 'ab')
    that = that.slice(0, actual);
  }

  return that;
}

function fromArrayLike(that, array) {
  var length = array.length < 0 ? 0 : checked(array.length) | 0;
  that = createBuffer(that, length);
  for (var i = 0; i < length; i += 1) {
    that[i] = array[i] & 255;
  }
  return that;
}

function fromArrayBuffer(that, array, byteOffset, length) {
  array.byteLength; // this throws if `array` is not a valid ArrayBuffer

  if (byteOffset < 0 || array.byteLength < byteOffset) {
    throw new RangeError('\'offset\' is out of bounds');
  }

  if (array.byteLength < byteOffset + (length || 0)) {
    throw new RangeError('\'length\' is out of bounds');
  }

  if (byteOffset === undefined && length === undefined) {
    array = new Uint8Array(array);
  } else if (length === undefined) {
    array = new Uint8Array(array, byteOffset);
  } else {
    array = new Uint8Array(array, byteOffset, length);
  }

  if (Buffer.TYPED_ARRAY_SUPPORT) {
    // Return an augmented `Uint8Array` instance, for best performance
    that = array;
    that.__proto__ = Buffer.prototype;
  } else {
    // Fallback: Return an object instance of the Buffer class
    that = fromArrayLike(that, array);
  }
  return that;
}

function fromObject(that, obj) {
  if (Buffer.isBuffer(obj)) {
    var len = checked(obj.length) | 0;
    that = createBuffer(that, len);

    if (that.length === 0) {
      return that;
    }

    obj.copy(that, 0, 0, len);
    return that;
  }

  if (obj) {
    if (typeof ArrayBuffer !== 'undefined' && obj.buffer instanceof ArrayBuffer || 'length' in obj) {
      if (typeof obj.length !== 'number' || isnan(obj.length)) {
        return createBuffer(that, 0);
      }
      return fromArrayLike(that, obj);
    }

    if (obj.type === 'Buffer' && isArray(obj.data)) {
      return fromArrayLike(that, obj.data);
    }
  }

  throw new TypeError('First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.');
}

function checked(length) {
  // Note: cannot use `length < kMaxLength()` here because that fails when
  // length is NaN (which is otherwise coerced to zero.)
  if (length >= kMaxLength()) {
    throw new RangeError('Attempt to allocate Buffer larger than maximum ' + 'size: 0x' + kMaxLength().toString(16) + ' bytes');
  }
  return length | 0;
}

function SlowBuffer(length) {
  if (+length != length) {
    // eslint-disable-line eqeqeq
    length = 0;
  }
  return Buffer.alloc(+length);
}

Buffer.isBuffer = function isBuffer(b) {
  return !!(b != null && b._isBuffer);
};

Buffer.compare = function compare(a, b) {
  if (!Buffer.isBuffer(a) || !Buffer.isBuffer(b)) {
    throw new TypeError('Arguments must be Buffers');
  }

  if (a === b) return 0;

  var x = a.length;
  var y = b.length;

  for (var i = 0, len = Math.min(x, y); i < len; ++i) {
    if (a[i] !== b[i]) {
      x = a[i];
      y = b[i];
      break;
    }
  }

  if (x < y) return -1;
  if (y < x) return 1;
  return 0;
};

Buffer.isEncoding = function isEncoding(encoding) {
  switch (String(encoding).toLowerCase()) {
    case 'hex':
    case 'utf8':
    case 'utf-8':
    case 'ascii':
    case 'latin1':
    case 'binary':
    case 'base64':
    case 'ucs2':
    case 'ucs-2':
    case 'utf16le':
    case 'utf-16le':
      return true;
    default:
      return false;
  }
};

Buffer.concat = function concat(list, length) {
  if (!isArray(list)) {
    throw new TypeError('"list" argument must be an Array of Buffers');
  }

  if (list.length === 0) {
    return Buffer.alloc(0);
  }

  var i;
  if (length === undefined) {
    length = 0;
    for (i = 0; i < list.length; ++i) {
      length += list[i].length;
    }
  }

  var buffer = Buffer.allocUnsafe(length);
  var pos = 0;
  for (i = 0; i < list.length; ++i) {
    var buf = list[i];
    if (!Buffer.isBuffer(buf)) {
      throw new TypeError('"list" argument must be an Array of Buffers');
    }
    buf.copy(buffer, pos);
    pos += buf.length;
  }
  return buffer;
};

function byteLength(string, encoding) {
  if (Buffer.isBuffer(string)) {
    return string.length;
  }
  if (typeof ArrayBuffer !== 'undefined' && typeof ArrayBuffer.isView === 'function' && (ArrayBuffer.isView(string) || string instanceof ArrayBuffer)) {
    return string.byteLength;
  }
  if (typeof string !== 'string') {
    string = '' + string;
  }

  var len = string.length;
  if (len === 0) return 0;

  // Use a for loop to avoid recursion
  var loweredCase = false;
  for (;;) {
    switch (encoding) {
      case 'ascii':
      case 'latin1':
      case 'binary':
        return len;
      case 'utf8':
      case 'utf-8':
      case undefined:
        return utf8ToBytes(string).length;
      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return len * 2;
      case 'hex':
        return len >>> 1;
      case 'base64':
        return base64ToBytes(string).length;
      default:
        if (loweredCase) return utf8ToBytes(string).length; // assume utf8
        encoding = ('' + encoding).toLowerCase();
        loweredCase = true;
    }
  }
}
Buffer.byteLength = byteLength;

function slowToString(encoding, start, end) {
  var loweredCase = false;

  // No need to verify that "this.length <= MAX_UINT32" since it's a read-only
  // property of a typed array.

  // This behaves neither like String nor Uint8Array in that we set start/end
  // to their upper/lower bounds if the value passed is out of range.
  // undefined is handled specially as per ECMA-262 6th Edition,
  // Section 13.3.3.7 Runtime Semantics: KeyedBindingInitialization.
  if (start === undefined || start < 0) {
    start = 0;
  }
  // Return early if start > this.length. Done here to prevent potential uint32
  // coercion fail below.
  if (start > this.length) {
    return '';
  }

  if (end === undefined || end > this.length) {
    end = this.length;
  }

  if (end <= 0) {
    return '';
  }

  // Force coersion to uint32. This will also coerce falsey/NaN values to 0.
  end >>>= 0;
  start >>>= 0;

  if (end <= start) {
    return '';
  }

  if (!encoding) encoding = 'utf8';

  while (true) {
    switch (encoding) {
      case 'hex':
        return hexSlice(this, start, end);

      case 'utf8':
      case 'utf-8':
        return utf8Slice(this, start, end);

      case 'ascii':
        return asciiSlice(this, start, end);

      case 'latin1':
      case 'binary':
        return latin1Slice(this, start, end);

      case 'base64':
        return base64Slice(this, start, end);

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return utf16leSlice(this, start, end);

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding);
        encoding = (encoding + '').toLowerCase();
        loweredCase = true;
    }
  }
}

// The property is used by `Buffer.isBuffer` and `is-buffer` (in Safari 5-7) to detect
// Buffer instances.
Buffer.prototype._isBuffer = true;

function swap(b, n, m) {
  var i = b[n];
  b[n] = b[m];
  b[m] = i;
}

Buffer.prototype.swap16 = function swap16() {
  var len = this.length;
  if (len % 2 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 16-bits');
  }
  for (var i = 0; i < len; i += 2) {
    swap(this, i, i + 1);
  }
  return this;
};

Buffer.prototype.swap32 = function swap32() {
  var len = this.length;
  if (len % 4 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 32-bits');
  }
  for (var i = 0; i < len; i += 4) {
    swap(this, i, i + 3);
    swap(this, i + 1, i + 2);
  }
  return this;
};

Buffer.prototype.swap64 = function swap64() {
  var len = this.length;
  if (len % 8 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 64-bits');
  }
  for (var i = 0; i < len; i += 8) {
    swap(this, i, i + 7);
    swap(this, i + 1, i + 6);
    swap(this, i + 2, i + 5);
    swap(this, i + 3, i + 4);
  }
  return this;
};

Buffer.prototype.toString = function toString() {
  var length = this.length | 0;
  if (length === 0) return '';
  if (arguments.length === 0) return utf8Slice(this, 0, length);
  return slowToString.apply(this, arguments);
};

Buffer.prototype.equals = function equals(b) {
  if (!Buffer.isBuffer(b)) throw new TypeError('Argument must be a Buffer');
  if (this === b) return true;
  return Buffer.compare(this, b) === 0;
};

Buffer.prototype.inspect = function inspect() {
  var str = '';
  var max = exports.INSPECT_MAX_BYTES;
  if (this.length > 0) {
    str = this.toString('hex', 0, max).match(/.{2}/g).join(' ');
    if (this.length > max) str += ' ... ';
  }
  return '<Buffer ' + str + '>';
};

Buffer.prototype.compare = function compare(target, start, end, thisStart, thisEnd) {
  if (!Buffer.isBuffer(target)) {
    throw new TypeError('Argument must be a Buffer');
  }

  if (start === undefined) {
    start = 0;
  }
  if (end === undefined) {
    end = target ? target.length : 0;
  }
  if (thisStart === undefined) {
    thisStart = 0;
  }
  if (thisEnd === undefined) {
    thisEnd = this.length;
  }

  if (start < 0 || end > target.length || thisStart < 0 || thisEnd > this.length) {
    throw new RangeError('out of range index');
  }

  if (thisStart >= thisEnd && start >= end) {
    return 0;
  }
  if (thisStart >= thisEnd) {
    return -1;
  }
  if (start >= end) {
    return 1;
  }

  start >>>= 0;
  end >>>= 0;
  thisStart >>>= 0;
  thisEnd >>>= 0;

  if (this === target) return 0;

  var x = thisEnd - thisStart;
  var y = end - start;
  var len = Math.min(x, y);

  var thisCopy = this.slice(thisStart, thisEnd);
  var targetCopy = target.slice(start, end);

  for (var i = 0; i < len; ++i) {
    if (thisCopy[i] !== targetCopy[i]) {
      x = thisCopy[i];
      y = targetCopy[i];
      break;
    }
  }

  if (x < y) return -1;
  if (y < x) return 1;
  return 0;
};

// Finds either the first index of `val` in `buffer` at offset >= `byteOffset`,
// OR the last index of `val` in `buffer` at offset <= `byteOffset`.
//
// Arguments:
// - buffer - a Buffer to search
// - val - a string, Buffer, or number
// - byteOffset - an index into `buffer`; will be clamped to an int32
// - encoding - an optional encoding, relevant is val is a string
// - dir - true for indexOf, false for lastIndexOf
function bidirectionalIndexOf(buffer, val, byteOffset, encoding, dir) {
  // Empty buffer means no match
  if (buffer.length === 0) return -1;

  // Normalize byteOffset
  if (typeof byteOffset === 'string') {
    encoding = byteOffset;
    byteOffset = 0;
  } else if (byteOffset > 0x7fffffff) {
    byteOffset = 0x7fffffff;
  } else if (byteOffset < -0x80000000) {
    byteOffset = -0x80000000;
  }
  byteOffset = +byteOffset; // Coerce to Number.
  if (isNaN(byteOffset)) {
    // byteOffset: it it's undefined, null, NaN, "foo", etc, search whole buffer
    byteOffset = dir ? 0 : buffer.length - 1;
  }

  // Normalize byteOffset: negative offsets start from the end of the buffer
  if (byteOffset < 0) byteOffset = buffer.length + byteOffset;
  if (byteOffset >= buffer.length) {
    if (dir) return -1;else byteOffset = buffer.length - 1;
  } else if (byteOffset < 0) {
    if (dir) byteOffset = 0;else return -1;
  }

  // Normalize val
  if (typeof val === 'string') {
    val = Buffer.from(val, encoding);
  }

  // Finally, search either indexOf (if dir is true) or lastIndexOf
  if (Buffer.isBuffer(val)) {
    // Special case: looking for empty string/buffer always fails
    if (val.length === 0) {
      return -1;
    }
    return arrayIndexOf(buffer, val, byteOffset, encoding, dir);
  } else if (typeof val === 'number') {
    val = val & 0xFF; // Search for a byte value [0-255]
    if (Buffer.TYPED_ARRAY_SUPPORT && typeof Uint8Array.prototype.indexOf === 'function') {
      if (dir) {
        return Uint8Array.prototype.indexOf.call(buffer, val, byteOffset);
      } else {
        return Uint8Array.prototype.lastIndexOf.call(buffer, val, byteOffset);
      }
    }
    return arrayIndexOf(buffer, [val], byteOffset, encoding, dir);
  }

  throw new TypeError('val must be string, number or Buffer');
}

function arrayIndexOf(arr, val, byteOffset, encoding, dir) {
  var indexSize = 1;
  var arrLength = arr.length;
  var valLength = val.length;

  if (encoding !== undefined) {
    encoding = String(encoding).toLowerCase();
    if (encoding === 'ucs2' || encoding === 'ucs-2' || encoding === 'utf16le' || encoding === 'utf-16le') {
      if (arr.length < 2 || val.length < 2) {
        return -1;
      }
      indexSize = 2;
      arrLength /= 2;
      valLength /= 2;
      byteOffset /= 2;
    }
  }

  function read(buf, i) {
    if (indexSize === 1) {
      return buf[i];
    } else {
      return buf.readUInt16BE(i * indexSize);
    }
  }

  var i;
  if (dir) {
    var foundIndex = -1;
    for (i = byteOffset; i < arrLength; i++) {
      if (read(arr, i) === read(val, foundIndex === -1 ? 0 : i - foundIndex)) {
        if (foundIndex === -1) foundIndex = i;
        if (i - foundIndex + 1 === valLength) return foundIndex * indexSize;
      } else {
        if (foundIndex !== -1) i -= i - foundIndex;
        foundIndex = -1;
      }
    }
  } else {
    if (byteOffset + valLength > arrLength) byteOffset = arrLength - valLength;
    for (i = byteOffset; i >= 0; i--) {
      var found = true;
      for (var j = 0; j < valLength; j++) {
        if (read(arr, i + j) !== read(val, j)) {
          found = false;
          break;
        }
      }
      if (found) return i;
    }
  }

  return -1;
}

Buffer.prototype.includes = function includes(val, byteOffset, encoding) {
  return this.indexOf(val, byteOffset, encoding) !== -1;
};

Buffer.prototype.indexOf = function indexOf(val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, true);
};

Buffer.prototype.lastIndexOf = function lastIndexOf(val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, false);
};

function hexWrite(buf, string, offset, length) {
  offset = Number(offset) || 0;
  var remaining = buf.length - offset;
  if (!length) {
    length = remaining;
  } else {
    length = Number(length);
    if (length > remaining) {
      length = remaining;
    }
  }

  // must be an even number of digits
  var strLen = string.length;
  if (strLen % 2 !== 0) throw new TypeError('Invalid hex string');

  if (length > strLen / 2) {
    length = strLen / 2;
  }
  for (var i = 0; i < length; ++i) {
    var parsed = parseInt(string.substr(i * 2, 2), 16);
    if (isNaN(parsed)) return i;
    buf[offset + i] = parsed;
  }
  return i;
}

function utf8Write(buf, string, offset, length) {
  return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length);
}

function asciiWrite(buf, string, offset, length) {
  return blitBuffer(asciiToBytes(string), buf, offset, length);
}

function latin1Write(buf, string, offset, length) {
  return asciiWrite(buf, string, offset, length);
}

function base64Write(buf, string, offset, length) {
  return blitBuffer(base64ToBytes(string), buf, offset, length);
}

function ucs2Write(buf, string, offset, length) {
  return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length);
}

Buffer.prototype.write = function write(string, offset, length, encoding) {
  // Buffer#write(string)
  if (offset === undefined) {
    encoding = 'utf8';
    length = this.length;
    offset = 0;
    // Buffer#write(string, encoding)
  } else if (length === undefined && typeof offset === 'string') {
    encoding = offset;
    length = this.length;
    offset = 0;
    // Buffer#write(string, offset[, length][, encoding])
  } else if (isFinite(offset)) {
    offset = offset | 0;
    if (isFinite(length)) {
      length = length | 0;
      if (encoding === undefined) encoding = 'utf8';
    } else {
      encoding = length;
      length = undefined;
    }
    // legacy write(string, encoding, offset, length) - remove in v0.13
  } else {
    throw new Error('Buffer.write(string, encoding, offset[, length]) is no longer supported');
  }

  var remaining = this.length - offset;
  if (length === undefined || length > remaining) length = remaining;

  if (string.length > 0 && (length < 0 || offset < 0) || offset > this.length) {
    throw new RangeError('Attempt to write outside buffer bounds');
  }

  if (!encoding) encoding = 'utf8';

  var loweredCase = false;
  for (;;) {
    switch (encoding) {
      case 'hex':
        return hexWrite(this, string, offset, length);

      case 'utf8':
      case 'utf-8':
        return utf8Write(this, string, offset, length);

      case 'ascii':
        return asciiWrite(this, string, offset, length);

      case 'latin1':
      case 'binary':
        return latin1Write(this, string, offset, length);

      case 'base64':
        // Warning: maxLength not taken into account in base64Write
        return base64Write(this, string, offset, length);

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return ucs2Write(this, string, offset, length);

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding);
        encoding = ('' + encoding).toLowerCase();
        loweredCase = true;
    }
  }
};

Buffer.prototype.toJSON = function toJSON() {
  return {
    type: 'Buffer',
    data: Array.prototype.slice.call(this._arr || this, 0)
  };
};

function base64Slice(buf, start, end) {
  if (start === 0 && end === buf.length) {
    return base64.fromByteArray(buf);
  } else {
    return base64.fromByteArray(buf.slice(start, end));
  }
}

function utf8Slice(buf, start, end) {
  end = Math.min(buf.length, end);
  var res = [];

  var i = start;
  while (i < end) {
    var firstByte = buf[i];
    var codePoint = null;
    var bytesPerSequence = firstByte > 0xEF ? 4 : firstByte > 0xDF ? 3 : firstByte > 0xBF ? 2 : 1;

    if (i + bytesPerSequence <= end) {
      var secondByte, thirdByte, fourthByte, tempCodePoint;

      switch (bytesPerSequence) {
        case 1:
          if (firstByte < 0x80) {
            codePoint = firstByte;
          }
          break;
        case 2:
          secondByte = buf[i + 1];
          if ((secondByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0x1F) << 0x6 | secondByte & 0x3F;
            if (tempCodePoint > 0x7F) {
              codePoint = tempCodePoint;
            }
          }
          break;
        case 3:
          secondByte = buf[i + 1];
          thirdByte = buf[i + 2];
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0xC | (secondByte & 0x3F) << 0x6 | thirdByte & 0x3F;
            if (tempCodePoint > 0x7FF && (tempCodePoint < 0xD800 || tempCodePoint > 0xDFFF)) {
              codePoint = tempCodePoint;
            }
          }
          break;
        case 4:
          secondByte = buf[i + 1];
          thirdByte = buf[i + 2];
          fourthByte = buf[i + 3];
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80 && (fourthByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0x12 | (secondByte & 0x3F) << 0xC | (thirdByte & 0x3F) << 0x6 | fourthByte & 0x3F;
            if (tempCodePoint > 0xFFFF && tempCodePoint < 0x110000) {
              codePoint = tempCodePoint;
            }
          }
      }
    }

    if (codePoint === null) {
      // we did not generate a valid codePoint so insert a
      // replacement char (U+FFFD) and advance only 1 byte
      codePoint = 0xFFFD;
      bytesPerSequence = 1;
    } else if (codePoint > 0xFFFF) {
      // encode to utf16 (surrogate pair dance)
      codePoint -= 0x10000;
      res.push(codePoint >>> 10 & 0x3FF | 0xD800);
      codePoint = 0xDC00 | codePoint & 0x3FF;
    }

    res.push(codePoint);
    i += bytesPerSequence;
  }

  return decodeCodePointsArray(res);
}

// Based on http://stackoverflow.com/a/22747272/680742, the browser with
// the lowest limit is Chrome, with 0x10000 args.
// We go 1 magnitude less, for safety
var MAX_ARGUMENTS_LENGTH = 0x1000;

function decodeCodePointsArray(codePoints) {
  var len = codePoints.length;
  if (len <= MAX_ARGUMENTS_LENGTH) {
    return String.fromCharCode.apply(String, codePoints); // avoid extra slice()
  }

  // Decode in chunks to avoid "call stack size exceeded".
  var res = '';
  var i = 0;
  while (i < len) {
    res += String.fromCharCode.apply(String, codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH));
  }
  return res;
}

function asciiSlice(buf, start, end) {
  var ret = '';
  end = Math.min(buf.length, end);

  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i] & 0x7F);
  }
  return ret;
}

function latin1Slice(buf, start, end) {
  var ret = '';
  end = Math.min(buf.length, end);

  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i]);
  }
  return ret;
}

function hexSlice(buf, start, end) {
  var len = buf.length;

  if (!start || start < 0) start = 0;
  if (!end || end < 0 || end > len) end = len;

  var out = '';
  for (var i = start; i < end; ++i) {
    out += toHex(buf[i]);
  }
  return out;
}

function utf16leSlice(buf, start, end) {
  var bytes = buf.slice(start, end);
  var res = '';
  for (var i = 0; i < bytes.length; i += 2) {
    res += String.fromCharCode(bytes[i] + bytes[i + 1] * 256);
  }
  return res;
}

Buffer.prototype.slice = function slice(start, end) {
  var len = this.length;
  start = ~~start;
  end = end === undefined ? len : ~~end;

  if (start < 0) {
    start += len;
    if (start < 0) start = 0;
  } else if (start > len) {
    start = len;
  }

  if (end < 0) {
    end += len;
    if (end < 0) end = 0;
  } else if (end > len) {
    end = len;
  }

  if (end < start) end = start;

  var newBuf;
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    newBuf = this.subarray(start, end);
    newBuf.__proto__ = Buffer.prototype;
  } else {
    var sliceLen = end - start;
    newBuf = new Buffer(sliceLen, undefined);
    for (var i = 0; i < sliceLen; ++i) {
      newBuf[i] = this[i + start];
    }
  }

  return newBuf;
};

/*
 * Need to make sure that buffer isn't trying to write out of bounds.
 */
function checkOffset(offset, ext, length) {
  if (offset % 1 !== 0 || offset < 0) throw new RangeError('offset is not uint');
  if (offset + ext > length) throw new RangeError('Trying to access beyond buffer length');
}

Buffer.prototype.readUIntLE = function readUIntLE(offset, byteLength, noAssert) {
  offset = offset | 0;
  byteLength = byteLength | 0;
  if (!noAssert) checkOffset(offset, byteLength, this.length);

  var val = this[offset];
  var mul = 1;
  var i = 0;
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul;
  }

  return val;
};

Buffer.prototype.readUIntBE = function readUIntBE(offset, byteLength, noAssert) {
  offset = offset | 0;
  byteLength = byteLength | 0;
  if (!noAssert) {
    checkOffset(offset, byteLength, this.length);
  }

  var val = this[offset + --byteLength];
  var mul = 1;
  while (byteLength > 0 && (mul *= 0x100)) {
    val += this[offset + --byteLength] * mul;
  }

  return val;
};

Buffer.prototype.readUInt8 = function readUInt8(offset, noAssert) {
  if (!noAssert) checkOffset(offset, 1, this.length);
  return this[offset];
};

Buffer.prototype.readUInt16LE = function readUInt16LE(offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length);
  return this[offset] | this[offset + 1] << 8;
};

Buffer.prototype.readUInt16BE = function readUInt16BE(offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length);
  return this[offset] << 8 | this[offset + 1];
};

Buffer.prototype.readUInt32LE = function readUInt32LE(offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length);

  return (this[offset] | this[offset + 1] << 8 | this[offset + 2] << 16) + this[offset + 3] * 0x1000000;
};

Buffer.prototype.readUInt32BE = function readUInt32BE(offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length);

  return this[offset] * 0x1000000 + (this[offset + 1] << 16 | this[offset + 2] << 8 | this[offset + 3]);
};

Buffer.prototype.readIntLE = function readIntLE(offset, byteLength, noAssert) {
  offset = offset | 0;
  byteLength = byteLength | 0;
  if (!noAssert) checkOffset(offset, byteLength, this.length);

  var val = this[offset];
  var mul = 1;
  var i = 0;
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul;
  }
  mul *= 0x80;

  if (val >= mul) val -= Math.pow(2, 8 * byteLength);

  return val;
};

Buffer.prototype.readIntBE = function readIntBE(offset, byteLength, noAssert) {
  offset = offset | 0;
  byteLength = byteLength | 0;
  if (!noAssert) checkOffset(offset, byteLength, this.length);

  var i = byteLength;
  var mul = 1;
  var val = this[offset + --i];
  while (i > 0 && (mul *= 0x100)) {
    val += this[offset + --i] * mul;
  }
  mul *= 0x80;

  if (val >= mul) val -= Math.pow(2, 8 * byteLength);

  return val;
};

Buffer.prototype.readInt8 = function readInt8(offset, noAssert) {
  if (!noAssert) checkOffset(offset, 1, this.length);
  if (!(this[offset] & 0x80)) return this[offset];
  return (0xff - this[offset] + 1) * -1;
};

Buffer.prototype.readInt16LE = function readInt16LE(offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length);
  var val = this[offset] | this[offset + 1] << 8;
  return val & 0x8000 ? val | 0xFFFF0000 : val;
};

Buffer.prototype.readInt16BE = function readInt16BE(offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length);
  var val = this[offset + 1] | this[offset] << 8;
  return val & 0x8000 ? val | 0xFFFF0000 : val;
};

Buffer.prototype.readInt32LE = function readInt32LE(offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length);

  return this[offset] | this[offset + 1] << 8 | this[offset + 2] << 16 | this[offset + 3] << 24;
};

Buffer.prototype.readInt32BE = function readInt32BE(offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length);

  return this[offset] << 24 | this[offset + 1] << 16 | this[offset + 2] << 8 | this[offset + 3];
};

Buffer.prototype.readFloatLE = function readFloatLE(offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length);
  return ieee754.read(this, offset, true, 23, 4);
};

Buffer.prototype.readFloatBE = function readFloatBE(offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length);
  return ieee754.read(this, offset, false, 23, 4);
};

Buffer.prototype.readDoubleLE = function readDoubleLE(offset, noAssert) {
  if (!noAssert) checkOffset(offset, 8, this.length);
  return ieee754.read(this, offset, true, 52, 8);
};

Buffer.prototype.readDoubleBE = function readDoubleBE(offset, noAssert) {
  if (!noAssert) checkOffset(offset, 8, this.length);
  return ieee754.read(this, offset, false, 52, 8);
};

function checkInt(buf, value, offset, ext, max, min) {
  if (!Buffer.isBuffer(buf)) throw new TypeError('"buffer" argument must be a Buffer instance');
  if (value > max || value < min) throw new RangeError('"value" argument is out of bounds');
  if (offset + ext > buf.length) throw new RangeError('Index out of range');
}

Buffer.prototype.writeUIntLE = function writeUIntLE(value, offset, byteLength, noAssert) {
  value = +value;
  offset = offset | 0;
  byteLength = byteLength | 0;
  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1;
    checkInt(this, value, offset, byteLength, maxBytes, 0);
  }

  var mul = 1;
  var i = 0;
  this[offset] = value & 0xFF;
  while (++i < byteLength && (mul *= 0x100)) {
    this[offset + i] = value / mul & 0xFF;
  }

  return offset + byteLength;
};

Buffer.prototype.writeUIntBE = function writeUIntBE(value, offset, byteLength, noAssert) {
  value = +value;
  offset = offset | 0;
  byteLength = byteLength | 0;
  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1;
    checkInt(this, value, offset, byteLength, maxBytes, 0);
  }

  var i = byteLength - 1;
  var mul = 1;
  this[offset + i] = value & 0xFF;
  while (--i >= 0 && (mul *= 0x100)) {
    this[offset + i] = value / mul & 0xFF;
  }

  return offset + byteLength;
};

Buffer.prototype.writeUInt8 = function writeUInt8(value, offset, noAssert) {
  value = +value;
  offset = offset | 0;
  if (!noAssert) checkInt(this, value, offset, 1, 0xff, 0);
  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value);
  this[offset] = value & 0xff;
  return offset + 1;
};

function objectWriteUInt16(buf, value, offset, littleEndian) {
  if (value < 0) value = 0xffff + value + 1;
  for (var i = 0, j = Math.min(buf.length - offset, 2); i < j; ++i) {
    buf[offset + i] = (value & 0xff << 8 * (littleEndian ? i : 1 - i)) >>> (littleEndian ? i : 1 - i) * 8;
  }
}

Buffer.prototype.writeUInt16LE = function writeUInt16LE(value, offset, noAssert) {
  value = +value;
  offset = offset | 0;
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0);
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = value & 0xff;
    this[offset + 1] = value >>> 8;
  } else {
    objectWriteUInt16(this, value, offset, true);
  }
  return offset + 2;
};

Buffer.prototype.writeUInt16BE = function writeUInt16BE(value, offset, noAssert) {
  value = +value;
  offset = offset | 0;
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0);
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = value >>> 8;
    this[offset + 1] = value & 0xff;
  } else {
    objectWriteUInt16(this, value, offset, false);
  }
  return offset + 2;
};

function objectWriteUInt32(buf, value, offset, littleEndian) {
  if (value < 0) value = 0xffffffff + value + 1;
  for (var i = 0, j = Math.min(buf.length - offset, 4); i < j; ++i) {
    buf[offset + i] = value >>> (littleEndian ? i : 3 - i) * 8 & 0xff;
  }
}

Buffer.prototype.writeUInt32LE = function writeUInt32LE(value, offset, noAssert) {
  value = +value;
  offset = offset | 0;
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0);
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset + 3] = value >>> 24;
    this[offset + 2] = value >>> 16;
    this[offset + 1] = value >>> 8;
    this[offset] = value & 0xff;
  } else {
    objectWriteUInt32(this, value, offset, true);
  }
  return offset + 4;
};

Buffer.prototype.writeUInt32BE = function writeUInt32BE(value, offset, noAssert) {
  value = +value;
  offset = offset | 0;
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0);
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = value >>> 24;
    this[offset + 1] = value >>> 16;
    this[offset + 2] = value >>> 8;
    this[offset + 3] = value & 0xff;
  } else {
    objectWriteUInt32(this, value, offset, false);
  }
  return offset + 4;
};

Buffer.prototype.writeIntLE = function writeIntLE(value, offset, byteLength, noAssert) {
  value = +value;
  offset = offset | 0;
  if (!noAssert) {
    var limit = Math.pow(2, 8 * byteLength - 1);

    checkInt(this, value, offset, byteLength, limit - 1, -limit);
  }

  var i = 0;
  var mul = 1;
  var sub = 0;
  this[offset] = value & 0xFF;
  while (++i < byteLength && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i - 1] !== 0) {
      sub = 1;
    }
    this[offset + i] = (value / mul >> 0) - sub & 0xFF;
  }

  return offset + byteLength;
};

Buffer.prototype.writeIntBE = function writeIntBE(value, offset, byteLength, noAssert) {
  value = +value;
  offset = offset | 0;
  if (!noAssert) {
    var limit = Math.pow(2, 8 * byteLength - 1);

    checkInt(this, value, offset, byteLength, limit - 1, -limit);
  }

  var i = byteLength - 1;
  var mul = 1;
  var sub = 0;
  this[offset + i] = value & 0xFF;
  while (--i >= 0 && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i + 1] !== 0) {
      sub = 1;
    }
    this[offset + i] = (value / mul >> 0) - sub & 0xFF;
  }

  return offset + byteLength;
};

Buffer.prototype.writeInt8 = function writeInt8(value, offset, noAssert) {
  value = +value;
  offset = offset | 0;
  if (!noAssert) checkInt(this, value, offset, 1, 0x7f, -0x80);
  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value);
  if (value < 0) value = 0xff + value + 1;
  this[offset] = value & 0xff;
  return offset + 1;
};

Buffer.prototype.writeInt16LE = function writeInt16LE(value, offset, noAssert) {
  value = +value;
  offset = offset | 0;
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000);
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = value & 0xff;
    this[offset + 1] = value >>> 8;
  } else {
    objectWriteUInt16(this, value, offset, true);
  }
  return offset + 2;
};

Buffer.prototype.writeInt16BE = function writeInt16BE(value, offset, noAssert) {
  value = +value;
  offset = offset | 0;
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000);
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = value >>> 8;
    this[offset + 1] = value & 0xff;
  } else {
    objectWriteUInt16(this, value, offset, false);
  }
  return offset + 2;
};

Buffer.prototype.writeInt32LE = function writeInt32LE(value, offset, noAssert) {
  value = +value;
  offset = offset | 0;
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000);
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = value & 0xff;
    this[offset + 1] = value >>> 8;
    this[offset + 2] = value >>> 16;
    this[offset + 3] = value >>> 24;
  } else {
    objectWriteUInt32(this, value, offset, true);
  }
  return offset + 4;
};

Buffer.prototype.writeInt32BE = function writeInt32BE(value, offset, noAssert) {
  value = +value;
  offset = offset | 0;
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000);
  if (value < 0) value = 0xffffffff + value + 1;
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = value >>> 24;
    this[offset + 1] = value >>> 16;
    this[offset + 2] = value >>> 8;
    this[offset + 3] = value & 0xff;
  } else {
    objectWriteUInt32(this, value, offset, false);
  }
  return offset + 4;
};

function checkIEEE754(buf, value, offset, ext, max, min) {
  if (offset + ext > buf.length) throw new RangeError('Index out of range');
  if (offset < 0) throw new RangeError('Index out of range');
}

function writeFloat(buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 4, 3.4028234663852886e+38, -3.4028234663852886e+38);
  }
  ieee754.write(buf, value, offset, littleEndian, 23, 4);
  return offset + 4;
}

Buffer.prototype.writeFloatLE = function writeFloatLE(value, offset, noAssert) {
  return writeFloat(this, value, offset, true, noAssert);
};

Buffer.prototype.writeFloatBE = function writeFloatBE(value, offset, noAssert) {
  return writeFloat(this, value, offset, false, noAssert);
};

function writeDouble(buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 8, 1.7976931348623157E+308, -1.7976931348623157E+308);
  }
  ieee754.write(buf, value, offset, littleEndian, 52, 8);
  return offset + 8;
}

Buffer.prototype.writeDoubleLE = function writeDoubleLE(value, offset, noAssert) {
  return writeDouble(this, value, offset, true, noAssert);
};

Buffer.prototype.writeDoubleBE = function writeDoubleBE(value, offset, noAssert) {
  return writeDouble(this, value, offset, false, noAssert);
};

// copy(targetBuffer, targetStart=0, sourceStart=0, sourceEnd=buffer.length)
Buffer.prototype.copy = function copy(target, targetStart, start, end) {
  if (!start) start = 0;
  if (!end && end !== 0) end = this.length;
  if (targetStart >= target.length) targetStart = target.length;
  if (!targetStart) targetStart = 0;
  if (end > 0 && end < start) end = start;

  // Copy 0 bytes; we're done
  if (end === start) return 0;
  if (target.length === 0 || this.length === 0) return 0;

  // Fatal error conditions
  if (targetStart < 0) {
    throw new RangeError('targetStart out of bounds');
  }
  if (start < 0 || start >= this.length) throw new RangeError('sourceStart out of bounds');
  if (end < 0) throw new RangeError('sourceEnd out of bounds');

  // Are we oob?
  if (end > this.length) end = this.length;
  if (target.length - targetStart < end - start) {
    end = target.length - targetStart + start;
  }

  var len = end - start;
  var i;

  if (this === target && start < targetStart && targetStart < end) {
    // descending copy from end
    for (i = len - 1; i >= 0; --i) {
      target[i + targetStart] = this[i + start];
    }
  } else if (len < 1000 || !Buffer.TYPED_ARRAY_SUPPORT) {
    // ascending copy from start
    for (i = 0; i < len; ++i) {
      target[i + targetStart] = this[i + start];
    }
  } else {
    Uint8Array.prototype.set.call(target, this.subarray(start, start + len), targetStart);
  }

  return len;
};

// Usage:
//    buffer.fill(number[, offset[, end]])
//    buffer.fill(buffer[, offset[, end]])
//    buffer.fill(string[, offset[, end]][, encoding])
Buffer.prototype.fill = function fill(val, start, end, encoding) {
  // Handle string cases:
  if (typeof val === 'string') {
    if (typeof start === 'string') {
      encoding = start;
      start = 0;
      end = this.length;
    } else if (typeof end === 'string') {
      encoding = end;
      end = this.length;
    }
    if (val.length === 1) {
      var code = val.charCodeAt(0);
      if (code < 256) {
        val = code;
      }
    }
    if (encoding !== undefined && typeof encoding !== 'string') {
      throw new TypeError('encoding must be a string');
    }
    if (typeof encoding === 'string' && !Buffer.isEncoding(encoding)) {
      throw new TypeError('Unknown encoding: ' + encoding);
    }
  } else if (typeof val === 'number') {
    val = val & 255;
  }

  // Invalid ranges are not set to a default, so can range check early.
  if (start < 0 || this.length < start || this.length < end) {
    throw new RangeError('Out of range index');
  }

  if (end <= start) {
    return this;
  }

  start = start >>> 0;
  end = end === undefined ? this.length : end >>> 0;

  if (!val) val = 0;

  var i;
  if (typeof val === 'number') {
    for (i = start; i < end; ++i) {
      this[i] = val;
    }
  } else {
    var bytes = Buffer.isBuffer(val) ? val : utf8ToBytes(new Buffer(val, encoding).toString());
    var len = bytes.length;
    for (i = 0; i < end - start; ++i) {
      this[i + start] = bytes[i % len];
    }
  }

  return this;
};

// HELPER FUNCTIONS
// ================

var INVALID_BASE64_RE = /[^+\/0-9A-Za-z-_]/g;

function base64clean(str) {
  // Node strips out invalid characters like \n and \t from the string, base64-js does not
  str = stringtrim(str).replace(INVALID_BASE64_RE, '');
  // Node converts strings with length < 2 to ''
  if (str.length < 2) return '';
  // Node allows for non-padded base64 strings (missing trailing ===), base64-js does not
  while (str.length % 4 !== 0) {
    str = str + '=';
  }
  return str;
}

function stringtrim(str) {
  if (str.trim) return str.trim();
  return str.replace(/^\s+|\s+$/g, '');
}

function toHex(n) {
  if (n < 16) return '0' + n.toString(16);
  return n.toString(16);
}

function utf8ToBytes(string, units) {
  units = units || Infinity;
  var codePoint;
  var length = string.length;
  var leadSurrogate = null;
  var bytes = [];

  for (var i = 0; i < length; ++i) {
    codePoint = string.charCodeAt(i);

    // is surrogate component
    if (codePoint > 0xD7FF && codePoint < 0xE000) {
      // last char was a lead
      if (!leadSurrogate) {
        // no lead yet
        if (codePoint > 0xDBFF) {
          // unexpected trail
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD);
          continue;
        } else if (i + 1 === length) {
          // unpaired lead
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD);
          continue;
        }

        // valid lead
        leadSurrogate = codePoint;

        continue;
      }

      // 2 leads in a row
      if (codePoint < 0xDC00) {
        if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD);
        leadSurrogate = codePoint;
        continue;
      }

      // valid surrogate pair
      codePoint = (leadSurrogate - 0xD800 << 10 | codePoint - 0xDC00) + 0x10000;
    } else if (leadSurrogate) {
      // valid bmp char, but last char was a lead
      if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD);
    }

    leadSurrogate = null;

    // encode utf8
    if (codePoint < 0x80) {
      if ((units -= 1) < 0) break;
      bytes.push(codePoint);
    } else if (codePoint < 0x800) {
      if ((units -= 2) < 0) break;
      bytes.push(codePoint >> 0x6 | 0xC0, codePoint & 0x3F | 0x80);
    } else if (codePoint < 0x10000) {
      if ((units -= 3) < 0) break;
      bytes.push(codePoint >> 0xC | 0xE0, codePoint >> 0x6 & 0x3F | 0x80, codePoint & 0x3F | 0x80);
    } else if (codePoint < 0x110000) {
      if ((units -= 4) < 0) break;
      bytes.push(codePoint >> 0x12 | 0xF0, codePoint >> 0xC & 0x3F | 0x80, codePoint >> 0x6 & 0x3F | 0x80, codePoint & 0x3F | 0x80);
    } else {
      throw new Error('Invalid code point');
    }
  }

  return bytes;
}

function asciiToBytes(str) {
  var byteArray = [];
  for (var i = 0; i < str.length; ++i) {
    // Node's code seems to be doing this and not & 0x7F..
    byteArray.push(str.charCodeAt(i) & 0xFF);
  }
  return byteArray;
}

function utf16leToBytes(str, units) {
  var c, hi, lo;
  var byteArray = [];
  for (var i = 0; i < str.length; ++i) {
    if ((units -= 2) < 0) break;

    c = str.charCodeAt(i);
    hi = c >> 8;
    lo = c % 256;
    byteArray.push(lo);
    byteArray.push(hi);
  }

  return byteArray;
}

function base64ToBytes(str) {
  return base64.toByteArray(base64clean(str));
}

function blitBuffer(src, dst, offset, length) {
  for (var i = 0; i < length; ++i) {
    if (i + offset >= dst.length || i >= src.length) break;
    dst[i + offset] = src[i];
  }
  return i;
}

function isnan(val) {
  return val !== val; // eslint-disable-line no-self-compare
}
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(13)))

/***/ }),

/***/ 58:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.byteLength = byteLength;
exports.toByteArray = toByteArray;
exports.fromByteArray = fromByteArray;

var lookup = [];
var revLookup = [];
var Arr = typeof Uint8Array !== 'undefined' ? Uint8Array : Array;

var code = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
for (var i = 0, len = code.length; i < len; ++i) {
  lookup[i] = code[i];
  revLookup[code.charCodeAt(i)] = i;
}

// Support decoding URL-safe base64 strings, as Node.js does.
// See: https://en.wikipedia.org/wiki/Base64#URL_applications
revLookup['-'.charCodeAt(0)] = 62;
revLookup['_'.charCodeAt(0)] = 63;

function getLens(b64) {
  var len = b64.length;

  if (len % 4 > 0) {
    throw new Error('Invalid string. Length must be a multiple of 4');
  }

  // Trim off extra bytes after placeholder bytes are found
  // See: https://github.com/beatgammit/base64-js/issues/42
  var validLen = b64.indexOf('=');
  if (validLen === -1) validLen = len;

  var placeHoldersLen = validLen === len ? 0 : 4 - validLen % 4;

  return [validLen, placeHoldersLen];
}

// base64 is 4/3 + up to two characters of the original data
function byteLength(b64) {
  var lens = getLens(b64);
  var validLen = lens[0];
  var placeHoldersLen = lens[1];
  return (validLen + placeHoldersLen) * 3 / 4 - placeHoldersLen;
}

function _byteLength(b64, validLen, placeHoldersLen) {
  return (validLen + placeHoldersLen) * 3 / 4 - placeHoldersLen;
}

function toByteArray(b64) {
  var tmp;
  var lens = getLens(b64);
  var validLen = lens[0];
  var placeHoldersLen = lens[1];

  var arr = new Arr(_byteLength(b64, validLen, placeHoldersLen));

  var curByte = 0;

  // if there are placeholders, only get up to the last complete 4 chars
  var len = placeHoldersLen > 0 ? validLen - 4 : validLen;

  var i;
  for (i = 0; i < len; i += 4) {
    tmp = revLookup[b64.charCodeAt(i)] << 18 | revLookup[b64.charCodeAt(i + 1)] << 12 | revLookup[b64.charCodeAt(i + 2)] << 6 | revLookup[b64.charCodeAt(i + 3)];
    arr[curByte++] = tmp >> 16 & 0xFF;
    arr[curByte++] = tmp >> 8 & 0xFF;
    arr[curByte++] = tmp & 0xFF;
  }

  if (placeHoldersLen === 2) {
    tmp = revLookup[b64.charCodeAt(i)] << 2 | revLookup[b64.charCodeAt(i + 1)] >> 4;
    arr[curByte++] = tmp & 0xFF;
  }

  if (placeHoldersLen === 1) {
    tmp = revLookup[b64.charCodeAt(i)] << 10 | revLookup[b64.charCodeAt(i + 1)] << 4 | revLookup[b64.charCodeAt(i + 2)] >> 2;
    arr[curByte++] = tmp >> 8 & 0xFF;
    arr[curByte++] = tmp & 0xFF;
  }

  return arr;
}

function tripletToBase64(num) {
  return lookup[num >> 18 & 0x3F] + lookup[num >> 12 & 0x3F] + lookup[num >> 6 & 0x3F] + lookup[num & 0x3F];
}

function encodeChunk(uint8, start, end) {
  var tmp;
  var output = [];
  for (var i = start; i < end; i += 3) {
    tmp = (uint8[i] << 16 & 0xFF0000) + (uint8[i + 1] << 8 & 0xFF00) + (uint8[i + 2] & 0xFF);
    output.push(tripletToBase64(tmp));
  }
  return output.join('');
}

function fromByteArray(uint8) {
  var tmp;
  var len = uint8.length;
  var extraBytes = len % 3; // if we have 1 byte left, pad 2 bytes
  var parts = [];
  var maxChunkLength = 16383; // must be multiple of 3

  // go through the array every three bytes, we'll deal with trailing stuff later
  for (var i = 0, len2 = len - extraBytes; i < len2; i += maxChunkLength) {
    parts.push(encodeChunk(uint8, i, i + maxChunkLength > len2 ? len2 : i + maxChunkLength));
  }

  // pad the end with zeros, but make sure to not forget the extra bytes
  if (extraBytes === 1) {
    tmp = uint8[len - 1];
    parts.push(lookup[tmp >> 2] + lookup[tmp << 4 & 0x3F] + '==');
  } else if (extraBytes === 2) {
    tmp = (uint8[len - 2] << 8) + uint8[len - 1];
    parts.push(lookup[tmp >> 10] + lookup[tmp >> 4 & 0x3F] + lookup[tmp << 2 & 0x3F] + '=');
  }

  return parts.join('');
}

/***/ }),

/***/ 59:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/*! ieee754. BSD-3-Clause License. Feross Aboukhadijeh <https://feross.org/opensource> */
exports.read = function (buffer, offset, isLE, mLen, nBytes) {
  var e, m;
  var eLen = nBytes * 8 - mLen - 1;
  var eMax = (1 << eLen) - 1;
  var eBias = eMax >> 1;
  var nBits = -7;
  var i = isLE ? nBytes - 1 : 0;
  var d = isLE ? -1 : 1;
  var s = buffer[offset + i];

  i += d;

  e = s & (1 << -nBits) - 1;
  s >>= -nBits;
  nBits += eLen;
  for (; nBits > 0; e = e * 256 + buffer[offset + i], i += d, nBits -= 8) {}

  m = e & (1 << -nBits) - 1;
  e >>= -nBits;
  nBits += mLen;
  for (; nBits > 0; m = m * 256 + buffer[offset + i], i += d, nBits -= 8) {}

  if (e === 0) {
    e = 1 - eBias;
  } else if (e === eMax) {
    return m ? NaN : (s ? -1 : 1) * Infinity;
  } else {
    m = m + Math.pow(2, mLen);
    e = e - eBias;
  }
  return (s ? -1 : 1) * m * Math.pow(2, e - mLen);
};

exports.write = function (buffer, value, offset, isLE, mLen, nBytes) {
  var e, m, c;
  var eLen = nBytes * 8 - mLen - 1;
  var eMax = (1 << eLen) - 1;
  var eBias = eMax >> 1;
  var rt = mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0;
  var i = isLE ? 0 : nBytes - 1;
  var d = isLE ? 1 : -1;
  var s = value < 0 || value === 0 && 1 / value < 0 ? 1 : 0;

  value = Math.abs(value);

  if (isNaN(value) || value === Infinity) {
    m = isNaN(value) ? 1 : 0;
    e = eMax;
  } else {
    e = Math.floor(Math.log(value) / Math.LN2);
    if (value * (c = Math.pow(2, -e)) < 1) {
      e--;
      c *= 2;
    }
    if (e + eBias >= 1) {
      value += rt / c;
    } else {
      value += rt * Math.pow(2, 1 - eBias);
    }
    if (value * c >= 2) {
      e++;
      c /= 2;
    }

    if (e + eBias >= eMax) {
      m = 0;
      e = eMax;
    } else if (e + eBias >= 1) {
      m = (value * c - 1) * Math.pow(2, mLen);
      e = e + eBias;
    } else {
      m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen);
      e = 0;
    }
  }

  for (; mLen >= 8; buffer[offset + i] = m & 0xff, i += d, m /= 256, mLen -= 8) {}

  e = e << mLen | m;
  eLen += mLen;
  for (; eLen > 0; buffer[offset + i] = e & 0xff, i += d, e /= 256, eLen -= 8) {}

  buffer[offset + i - d] |= s * 128;
};

/***/ }),

/***/ 6:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// Thank's IE8 for his funny defineProperty
module.exports = !__webpack_require__(18)(function () {
  return Object.defineProperty({}, 'a', { get: function get() {
      return 7;
    } }).a != 7;
});

/***/ }),

/***/ 60:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var toString = {}.toString;

module.exports = Array.isArray || function (arr) {
  return toString.call(arr) == '[object Array]';
};

/***/ }),

/***/ 61:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var AxiosError = __webpack_require__(2);

/**
 * Resolve or reject a Promise based on response status.
 *
 * @param {Function} resolve A function that resolves the promise.
 * @param {Function} reject A function that rejects the promise.
 * @param {object} response The response.
 */
module.exports = function settle(resolve, reject, response) {
  var validateStatus = response.config.validateStatus;
  if (!response.status || !validateStatus || validateStatus(response.status)) {
    resolve(response);
  } else {
    reject(new AxiosError('Request failed with status code ' + response.status, [AxiosError.ERR_BAD_REQUEST, AxiosError.ERR_BAD_RESPONSE][Math.floor(response.status / 100) - 4], response.config, response.request, response));
  }
};

/***/ }),

/***/ 62:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(0);

module.exports = utils.isStandardBrowserEnv() ?

// Standard browser envs support document.cookie
function standardBrowserEnv() {
  return {
    write: function write(name, value, expires, path, domain, secure) {
      var cookie = [];
      cookie.push(name + '=' + encodeURIComponent(value));

      if (utils.isNumber(expires)) {
        cookie.push('expires=' + new Date(expires).toGMTString());
      }

      if (utils.isString(path)) {
        cookie.push('path=' + path);
      }

      if (utils.isString(domain)) {
        cookie.push('domain=' + domain);
      }

      if (secure === true) {
        cookie.push('secure');
      }

      document.cookie = cookie.join('; ');
    },

    read: function read(name) {
      var match = document.cookie.match(new RegExp('(^|;\\s*)(' + name + ')=([^;]*)'));
      return match ? decodeURIComponent(match[3]) : null;
    },

    remove: function remove(name) {
      this.write(name, '', Date.now() - 86400000);
    }
  };
}() :

// Non standard browser env (web workers, react-native) lack needed support.
function nonStandardBrowserEnv() {
  return {
    write: function write() {},
    read: function read() {
      return null;
    },
    remove: function remove() {}
  };
}();

/***/ }),

/***/ 63:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Determines whether the specified URL is absolute
 *
 * @param {string} url The URL to test
 * @returns {boolean} True if the specified URL is absolute, otherwise false
 */

module.exports = function isAbsoluteURL(url) {
  // A URL is considered absolute if it begins with "<scheme>://" or "//" (protocol-relative URL).
  // RFC 3986 defines scheme name as a sequence of characters beginning with a letter and followed
  // by any combination of letters, digits, plus, period, or hyphen.
  return (/^([a-z][a-z\d+\-.]*:)?\/\//i.test(url)
  );
};

/***/ }),

/***/ 64:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Creates a new URL by combining the specified URLs
 *
 * @param {string} baseURL The base URL
 * @param {string} relativeURL The relative URL
 * @returns {string} The combined URL
 */

module.exports = function combineURLs(baseURL, relativeURL) {
  return relativeURL ? baseURL.replace(/\/+$/, '') + '/' + relativeURL.replace(/^\/+/, '') : baseURL;
};

/***/ }),

/***/ 65:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(0);

// Headers whose duplicates are ignored by node
// c.f. https://nodejs.org/api/http.html#http_message_headers
var ignoreDuplicateOf = ['age', 'authorization', 'content-length', 'content-type', 'etag', 'expires', 'from', 'host', 'if-modified-since', 'if-unmodified-since', 'last-modified', 'location', 'max-forwards', 'proxy-authorization', 'referer', 'retry-after', 'user-agent'];

/**
 * Parse headers into an object
 *
 * ```
 * Date: Wed, 27 Aug 2014 08:58:49 GMT
 * Content-Type: application/json
 * Connection: keep-alive
 * Transfer-Encoding: chunked
 * ```
 *
 * @param {String} headers Headers needing to be parsed
 * @returns {Object} Headers parsed into an object
 */
module.exports = function parseHeaders(headers) {
  var parsed = {};
  var key;
  var val;
  var i;

  if (!headers) {
    return parsed;
  }

  utils.forEach(headers.split('\n'), function parser(line) {
    i = line.indexOf(':');
    key = utils.trim(line.substr(0, i)).toLowerCase();
    val = utils.trim(line.substr(i + 1));

    if (key) {
      if (parsed[key] && ignoreDuplicateOf.indexOf(key) >= 0) {
        return;
      }
      if (key === 'set-cookie') {
        parsed[key] = (parsed[key] ? parsed[key] : []).concat([val]);
      } else {
        parsed[key] = parsed[key] ? parsed[key] + ', ' + val : val;
      }
    }
  });

  return parsed;
};

/***/ }),

/***/ 66:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(0);

module.exports = utils.isStandardBrowserEnv() ?

// Standard browser envs have full support of the APIs needed to test
// whether the request URL is of the same origin as current location.
function standardBrowserEnv() {
  var msie = /(msie|trident)/i.test(navigator.userAgent);
  var urlParsingNode = document.createElement('a');
  var originURL;

  /**
  * Parse a URL to discover it's components
  *
  * @param {String} url The URL to be parsed
  * @returns {Object}
  */
  function resolveURL(url) {
    var href = url;

    if (msie) {
      // IE needs attribute set twice to normalize properties
      urlParsingNode.setAttribute('href', href);
      href = urlParsingNode.href;
    }

    urlParsingNode.setAttribute('href', href);

    // urlParsingNode provides the UrlUtils interface - http://url.spec.whatwg.org/#urlutils
    return {
      href: urlParsingNode.href,
      protocol: urlParsingNode.protocol ? urlParsingNode.protocol.replace(/:$/, '') : '',
      host: urlParsingNode.host,
      search: urlParsingNode.search ? urlParsingNode.search.replace(/^\?/, '') : '',
      hash: urlParsingNode.hash ? urlParsingNode.hash.replace(/^#/, '') : '',
      hostname: urlParsingNode.hostname,
      port: urlParsingNode.port,
      pathname: urlParsingNode.pathname.charAt(0) === '/' ? urlParsingNode.pathname : '/' + urlParsingNode.pathname
    };
  }

  originURL = resolveURL(window.location.href);

  /**
  * Determine if a URL shares the same origin as the current location
  *
  * @param {String} requestURL The URL to test
  * @returns {boolean} True if URL shares the same origin, otherwise false
  */
  return function isURLSameOrigin(requestURL) {
    var parsed = utils.isString(requestURL) ? resolveURL(requestURL) : requestURL;
    return parsed.protocol === originURL.protocol && parsed.host === originURL.host;
  };
}() :

// Non standard browser envs (web workers, react-native) lack needed support.
function nonStandardBrowserEnv() {
  return function isURLSameOrigin() {
    return true;
  };
}();

/***/ }),

/***/ 67:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function parseProtocol(url) {
  var match = /^([-+\w]{1,25})(:?\/\/|:)/.exec(url);
  return match && match[1] || '';
};

/***/ }),

/***/ 68:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// eslint-disable-next-line strict
module.exports = null;

/***/ }),

/***/ 69:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var VERSION = __webpack_require__(30).version;
var AxiosError = __webpack_require__(2);

var validators = {};

// eslint-disable-next-line func-names
['object', 'boolean', 'number', 'function', 'string', 'symbol'].forEach(function (type, i) {
  validators[type] = function validator(thing) {
    return (typeof thing === 'undefined' ? 'undefined' : _typeof(thing)) === type || 'a' + (i < 1 ? 'n ' : ' ') + type;
  };
});

var deprecatedWarnings = {};

/**
 * Transitional option validator
 * @param {function|boolean?} validator - set to false if the transitional option has been removed
 * @param {string?} version - deprecated version / removed since version
 * @param {string?} message - some message with additional info
 * @returns {function}
 */
validators.transitional = function transitional(validator, version, message) {
  function formatMessage(opt, desc) {
    return '[Axios v' + VERSION + '] Transitional option \'' + opt + '\'' + desc + (message ? '. ' + message : '');
  }

  // eslint-disable-next-line func-names
  return function (value, opt, opts) {
    if (validator === false) {
      throw new AxiosError(formatMessage(opt, ' has been removed' + (version ? ' in ' + version : '')), AxiosError.ERR_DEPRECATED);
    }

    if (version && !deprecatedWarnings[opt]) {
      deprecatedWarnings[opt] = true;
      // eslint-disable-next-line no-console
      console.warn(formatMessage(opt, ' has been deprecated since v' + version + ' and will be removed in the near future'));
    }

    return validator ? validator(value, opt, opts) : true;
  };
};

/**
 * Assert object's properties type
 * @param {object} options
 * @param {object} schema
 * @param {boolean?} allowUnknown
 */

function assertOptions(options, schema, allowUnknown) {
  if ((typeof options === 'undefined' ? 'undefined' : _typeof(options)) !== 'object') {
    throw new AxiosError('options must be an object', AxiosError.ERR_BAD_OPTION_VALUE);
  }
  var keys = Object.keys(options);
  var i = keys.length;
  while (i-- > 0) {
    var opt = keys[i];
    var validator = schema[opt];
    if (validator) {
      var value = options[opt];
      var result = value === undefined || validator(value, opt, options);
      if (result !== true) {
        throw new AxiosError('option ' + opt + ' must be ' + result, AxiosError.ERR_BAD_OPTION_VALUE);
      }
      continue;
    }
    if (allowUnknown !== true) {
      throw new AxiosError('Unknown option ' + opt, AxiosError.ERR_BAD_OPTION);
    }
  }
}

module.exports = {
  assertOptions: assertOptions,
  validators: validators
};

/***/ }),

/***/ 7:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * @public
 * @constructor
 */

var Handlers = function Handlers() {
  if (!(this instanceof Handlers)) {
    new Handlers();
  }

  /**
   * @public
   * @type {Object}
   */
  this.list = {};
};

/**
 * @public
 * @param event {String}
 * @param callback {Function}
 * @returns {Number}
 */
Handlers.prototype.add = function (event, callback) {
  if (!this.list.hasOwnProperty(event)) {
    this.list[event] = [];
  }

  this.list[event].push(callback);

  return this.list[event].length - 1;
};

/**
 * @public
 * @param event {String}
 * @param fn {Function}
 * @returns {Handlers}
 */
Handlers.prototype.remove = function (event, fn) {
  if (this.hasHandlers(event)) {
    this.list[event] = this.list[event].filter(function (handler) {
      return handler !== fn;
    });
  }

  return this;
};

/**
 * @public
 * @param event {String}
 * @returns {Boolean}
 */
Handlers.prototype.hasHandlers = function (event) {
  return this.list.hasOwnProperty(event) && this.list[event].length ? true : false;
};

/**
 * @public
 * @param event {String}
 * @param args {Array}
 * @param context {*}
 * @returns {Handlers}
 */
Handlers.prototype.call = function (event, args, context) {
  if (this.hasHandlers(event)) {
    this.list[event].map(function (handler) {
      handler && handler.apply(context || null, args);
    });
  }

  return this;
};

/**
 * @public
 * @type {Handlers}
 */
module.exports = Handlers;

/***/ }),

/***/ 70:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var CanceledError = __webpack_require__(8);

/**
 * A `CancelToken` is an object that can be used to request cancellation of an operation.
 *
 * @class
 * @param {Function} executor The executor function.
 */
function CancelToken(executor) {
  if (typeof executor !== 'function') {
    throw new TypeError('executor must be a function.');
  }

  var resolvePromise;

  this.promise = new Promise(function promiseExecutor(resolve) {
    resolvePromise = resolve;
  });

  var token = this;

  // eslint-disable-next-line func-names
  this.promise.then(function (cancel) {
    if (!token._listeners) return;

    var i;
    var l = token._listeners.length;

    for (i = 0; i < l; i++) {
      token._listeners[i](cancel);
    }
    token._listeners = null;
  });

  // eslint-disable-next-line func-names
  this.promise.then = function (onfulfilled) {
    var _resolve;
    // eslint-disable-next-line func-names
    var promise = new Promise(function (resolve) {
      token.subscribe(resolve);
      _resolve = resolve;
    }).then(onfulfilled);

    promise.cancel = function reject() {
      token.unsubscribe(_resolve);
    };

    return promise;
  };

  executor(function cancel(message) {
    if (token.reason) {
      // Cancellation has already been requested
      return;
    }

    token.reason = new CanceledError(message);
    resolvePromise(token.reason);
  });
}

/**
 * Throws a `CanceledError` if cancellation has been requested.
 */
CancelToken.prototype.throwIfRequested = function throwIfRequested() {
  if (this.reason) {
    throw this.reason;
  }
};

/**
 * Subscribe to the cancel signal
 */

CancelToken.prototype.subscribe = function subscribe(listener) {
  if (this.reason) {
    listener(this.reason);
    return;
  }

  if (this._listeners) {
    this._listeners.push(listener);
  } else {
    this._listeners = [listener];
  }
};

/**
 * Unsubscribe from the cancel signal
 */

CancelToken.prototype.unsubscribe = function unsubscribe(listener) {
  if (!this._listeners) {
    return;
  }
  var index = this._listeners.indexOf(listener);
  if (index !== -1) {
    this._listeners.splice(index, 1);
  }
};

/**
 * Returns an object that contains a new `CancelToken` and a function that, when called,
 * cancels the `CancelToken`.
 */
CancelToken.source = function source() {
  var cancel;
  var token = new CancelToken(function executor(c) {
    cancel = c;
  });
  return {
    token: token,
    cancel: cancel
  };
};

module.exports = CancelToken;

/***/ }),

/***/ 71:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Syntactic sugar for invoking a function and expanding an array for arguments.
 *
 * Common use case would be to use `Function.prototype.apply`.
 *
 *  ```js
 *  function f(x, y, z) {}
 *  var args = [1, 2, 3];
 *  f.apply(null, args);
 *  ```
 *
 * With `spread` this example can be re-written.
 *
 *  ```js
 *  spread(function(x, y, z) {})([1, 2, 3]);
 *  ```
 *
 * @param {Function} callback
 * @returns {Function}
 */

module.exports = function spread(callback) {
  return function wrap(arr) {
    return callback.apply(null, arr);
  };
};

/***/ }),

/***/ 72:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(0);

/**
 * Determines whether the payload is an error thrown by Axios
 *
 * @param {*} payload The value to test
 * @returns {boolean} True if the payload is an error thrown by Axios, otherwise false
 */
module.exports = function isAxiosError(payload) {
  return utils.isObject(payload) && payload.isAxiosError === true;
};

/***/ }),

/***/ 73:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Module dependencies.
 * @private
 */

var googleAnalytics = __webpack_require__(3);
var nav = __webpack_require__(33);
var requestEstimateLink = __webpack_require__(48);

/**
 * @public
 * @type {Object}
 */
module.exports = {
	init: function init() {
		nav.on("collapse", onNavCollapse);
		nav.init();

		requestEstimateLink.init(".js-request_estimate_link", true);
		initHandlers();
	}
};

/**
 * @private
 */
function initHandlers() {
	var emailLink = document.querySelector(".l-header .l-mail-link.b-nav_footer_email");

	emailLink.addEventListener('click', sendGoogleAnalyticsEvent);
}

/**
 * @private
 */
function sendGoogleAnalyticsEvent() {
	googleAnalytics.sendEvent({
		eventCategory: 'request',
		eventAction: 'email',
		eventLabel: 'tab'
	});
}

/**
 * @private
 * @param isCollapse {Boolean}
 */
function onNavCollapse(isCollapse) {
	var siteNavClassList = document.querySelector(".js-site-navigation").classList;

	if (isCollapse) siteNavClassList.add("collapse");else siteNavClassList.remove("collapse");
}

/***/ }),

/***/ 74:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var debounce = __webpack_require__(31),
    isObject = __webpack_require__(11);

/** Error message constants. */
var FUNC_ERROR_TEXT = 'Expected a function';

/**
 * Creates a throttled function that only invokes `func` at most once per
 * every `wait` milliseconds. The throttled function comes with a `cancel`
 * method to cancel delayed `func` invocations and a `flush` method to
 * immediately invoke them. Provide `options` to indicate whether `func`
 * should be invoked on the leading and/or trailing edge of the `wait`
 * timeout. The `func` is invoked with the last arguments provided to the
 * throttled function. Subsequent calls to the throttled function return the
 * result of the last `func` invocation.
 *
 * **Note:** If `leading` and `trailing` options are `true`, `func` is
 * invoked on the trailing edge of the timeout only if the throttled function
 * is invoked more than once during the `wait` timeout.
 *
 * If `wait` is `0` and `leading` is `false`, `func` invocation is deferred
 * until to the next tick, similar to `setTimeout` with a timeout of `0`.
 *
 * See [David Corbacho's article](https://css-tricks.com/debouncing-throttling-explained-examples/)
 * for details over the differences between `_.throttle` and `_.debounce`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Function
 * @param {Function} func The function to throttle.
 * @param {number} [wait=0] The number of milliseconds to throttle invocations to.
 * @param {Object} [options={}] The options object.
 * @param {boolean} [options.leading=true]
 *  Specify invoking on the leading edge of the timeout.
 * @param {boolean} [options.trailing=true]
 *  Specify invoking on the trailing edge of the timeout.
 * @returns {Function} Returns the new throttled function.
 * @example
 *
 * // Avoid excessively updating the position while scrolling.
 * jQuery(window).on('scroll', _.throttle(updatePosition, 100));
 *
 * // Invoke `renewToken` when the click event is fired, but not more than once every 5 minutes.
 * var throttled = _.throttle(renewToken, 300000, { 'trailing': false });
 * jQuery(element).on('click', throttled);
 *
 * // Cancel the trailing throttled invocation.
 * jQuery(window).on('popstate', throttled.cancel);
 */
function throttle(func, wait, options) {
  var leading = true,
      trailing = true;

  if (typeof func != 'function') {
    throw new TypeError(FUNC_ERROR_TEXT);
  }
  if (isObject(options)) {
    leading = 'leading' in options ? !!options.leading : leading;
    trailing = 'trailing' in options ? !!options.trailing : trailing;
  }
  return debounce(func, wait, {
    'leading': leading,
    'maxWait': wait,
    'trailing': trailing
  });
}

module.exports = throttle;

/***/ }),

/***/ 744:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _smoothScroll = __webpack_require__(434);

var _View = __webpack_require__(129);

var _View2 = _interopRequireDefault(_View);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var view = _View2.default.getInstance();

if (!view.isPhone()) {
	var anchorLink = document.querySelector('.c-let_scroll');

	var currentID = anchorLink.dataset.scrollTo;
	var currentSection = document.querySelector('#' + currentID);

	anchorLink.addEventListener('click', function () {
		(0, _smoothScroll.scrollToSection)(currentSection);
	});
}

/***/ }),

/***/ 75:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var root = __webpack_require__(21);

/**
 * Gets the timestamp of the number of milliseconds that have elapsed since
 * the Unix epoch (1 January 1970 00:00:00 UTC).
 *
 * @static
 * @memberOf _
 * @since 2.4.0
 * @category Date
 * @returns {number} Returns the timestamp.
 * @example
 *
 * _.defer(function(stamp) {
 *   console.log(_.now() - stamp);
 * }, _.now());
 * // => Logs the number of milliseconds it took for the deferred invocation.
 */
var now = function now() {
  return root.Date.now();
};

module.exports = now;

/***/ }),

/***/ 76:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var baseTrim = __webpack_require__(77),
    isObject = __webpack_require__(11),
    isSymbol = __webpack_require__(79);

/** Used as references for various `Number` constants. */
var NAN = 0 / 0;

/** Used to detect bad signed hexadecimal string values. */
var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;

/** Used to detect binary string values. */
var reIsBinary = /^0b[01]+$/i;

/** Used to detect octal string values. */
var reIsOctal = /^0o[0-7]+$/i;

/** Built-in method references without a dependency on `root`. */
var freeParseInt = parseInt;

/**
 * Converts `value` to a number.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to process.
 * @returns {number} Returns the number.
 * @example
 *
 * _.toNumber(3.2);
 * // => 3.2
 *
 * _.toNumber(Number.MIN_VALUE);
 * // => 5e-324
 *
 * _.toNumber(Infinity);
 * // => Infinity
 *
 * _.toNumber('3.2');
 * // => 3.2
 */
function toNumber(value) {
  if (typeof value == 'number') {
    return value;
  }
  if (isSymbol(value)) {
    return NAN;
  }
  if (isObject(value)) {
    var other = typeof value.valueOf == 'function' ? value.valueOf() : value;
    value = isObject(other) ? other + '' : other;
  }
  if (typeof value != 'string') {
    return value === 0 ? value : +value;
  }
  value = baseTrim(value);
  var isBinary = reIsBinary.test(value);
  return isBinary || reIsOctal.test(value) ? freeParseInt(value.slice(2), isBinary ? 2 : 8) : reIsBadHex.test(value) ? NAN : +value;
}

module.exports = toNumber;

/***/ }),

/***/ 77:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var trimmedEndIndex = __webpack_require__(78);

/** Used to match leading whitespace. */
var reTrimStart = /^\s+/;

/**
 * The base implementation of `_.trim`.
 *
 * @private
 * @param {string} string The string to trim.
 * @returns {string} Returns the trimmed string.
 */
function baseTrim(string) {
  return string ? string.slice(0, trimmedEndIndex(string) + 1).replace(reTrimStart, '') : string;
}

module.exports = baseTrim;

/***/ }),

/***/ 78:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/** Used to match a single whitespace character. */
var reWhitespace = /\s/;

/**
 * Used by `_.trim` and `_.trimEnd` to get the index of the last non-whitespace
 * character of `string`.
 *
 * @private
 * @param {string} string The string to inspect.
 * @returns {number} Returns the index of the last non-whitespace character.
 */
function trimmedEndIndex(string) {
  var index = string.length;

  while (index-- && reWhitespace.test(string.charAt(index))) {}
  return index;
}

module.exports = trimmedEndIndex;

/***/ }),

/***/ 79:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var baseGetTag = __webpack_require__(47),
    isObjectLike = __webpack_require__(46);

/** `Object#toString` result references. */
var symbolTag = '[object Symbol]';

/**
 * Checks if `value` is classified as a `Symbol` primitive or object.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
 * @example
 *
 * _.isSymbol(Symbol.iterator);
 * // => true
 *
 * _.isSymbol('abc');
 * // => false
 */
function isSymbol(value) {
    return (typeof value === 'undefined' ? 'undefined' : _typeof(value)) == 'symbol' || isObjectLike(value) && baseGetTag(value) == symbolTag;
}

module.exports = isSymbol;

/***/ }),

/***/ 8:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var AxiosError = __webpack_require__(2);
var utils = __webpack_require__(0);

/**
 * A `CanceledError` is an object that is thrown when an operation is canceled.
 *
 * @class
 * @param {string=} message The message.
 */
function CanceledError(message) {
  // eslint-disable-next-line no-eq-null,eqeqeq
  AxiosError.call(this, message == null ? 'canceled' : message, AxiosError.ERR_CANCELED);
  this.name = 'CanceledError';
}

utils.inherits(CanceledError, AxiosError, {
  __CANCEL__: true
});

module.exports = CanceledError;

/***/ }),

/***/ 80:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _Symbol = __webpack_require__(32);

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString = objectProto.toString;

/** Built-in value references. */
var symToStringTag = _Symbol ? _Symbol.toStringTag : undefined;

/**
 * A specialized version of `baseGetTag` which ignores `Symbol.toStringTag` values.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the raw `toStringTag`.
 */
function getRawTag(value) {
  var isOwn = hasOwnProperty.call(value, symToStringTag),
      tag = value[symToStringTag];

  try {
    value[symToStringTag] = undefined;
    var unmasked = true;
  } catch (e) {}

  var result = nativeObjectToString.call(value);
  if (unmasked) {
    if (isOwn) {
      value[symToStringTag] = tag;
    } else {
      delete value[symToStringTag];
    }
  }
  return result;
}

module.exports = getRawTag;

/***/ }),

/***/ 81:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/** Used for built-in method references. */
var objectProto = Object.prototype;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString = objectProto.toString;

/**
 * Converts `value` to a string using `Object.prototype.toString`.
 *
 * @private
 * @param {*} value The value to convert.
 * @returns {string} Returns the converted string.
 */
function objectToString(value) {
  return nativeObjectToString.call(value);
}

module.exports = objectToString;

/***/ }),

/***/ 82:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/*!
 * jQuery JavaScript Library v2.2.4
 * http://jquery.com/
 *
 * Includes Sizzle.js
 * http://sizzlejs.com/
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2016-05-20T17:23Z
 */

(function (global, factory) {

	if (( false ? "undefined" : _typeof(module)) === "object" && _typeof(module.exports) === "object") {
		// For CommonJS and CommonJS-like environments where a proper `window`
		// is present, execute the factory and get jQuery.
		// For environments that do not have a `window` with a `document`
		// (such as Node.js), expose a factory as module.exports.
		// This accentuates the need for the creation of a real `window`.
		// e.g. var jQuery = require("jquery")(window);
		// See ticket #14549 for more info.
		module.exports = global.document ? factory(global, true) : function (w) {
			if (!w.document) {
				throw new Error("jQuery requires a window with a document");
			}
			return factory(w);
		};
	} else {
		factory(global);
	}

	// Pass this if window is not defined yet
})(typeof window !== "undefined" ? window : undefined, function (window, noGlobal) {

	// Support: Firefox 18+
	// Can't be in strict mode, several libs including ASP.NET trace
	// the stack via arguments.caller.callee and Firefox dies if
	// you try to trace through "use strict" call chains. (#13335)
	//"use strict";
	var arr = [];

	var document = window.document;

	var _slice = arr.slice;

	var concat = arr.concat;

	var push = arr.push;

	var indexOf = arr.indexOf;

	var class2type = {};

	var toString = class2type.toString;

	var hasOwn = class2type.hasOwnProperty;

	var support = {};

	var version = "2.2.4",


	// Define a local copy of jQuery
	jQuery = function jQuery(selector, context) {

		// The jQuery object is actually just the init constructor 'enhanced'
		// Need init if jQuery is called (just allow error to be thrown if not included)
		return new jQuery.fn.init(selector, context);
	},


	// Support: Android<4.1
	// Make sure we trim BOM and NBSP
	rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,


	// Matches dashed string for camelizing
	rmsPrefix = /^-ms-/,
	    rdashAlpha = /-([\da-z])/gi,


	// Used by jQuery.camelCase as callback to replace()
	fcamelCase = function fcamelCase(all, letter) {
		return letter.toUpperCase();
	};

	jQuery.fn = jQuery.prototype = {

		// The current version of jQuery being used
		jquery: version,

		constructor: jQuery,

		// Start with an empty selector
		selector: "",

		// The default length of a jQuery object is 0
		length: 0,

		toArray: function toArray() {
			return _slice.call(this);
		},

		// Get the Nth element in the matched element set OR
		// Get the whole matched element set as a clean array
		get: function get(num) {
			return num != null ?

			// Return just the one element from the set
			num < 0 ? this[num + this.length] : this[num] :

			// Return all the elements in a clean array
			_slice.call(this);
		},

		// Take an array of elements and push it onto the stack
		// (returning the new matched element set)
		pushStack: function pushStack(elems) {

			// Build a new jQuery matched element set
			var ret = jQuery.merge(this.constructor(), elems);

			// Add the old object onto the stack (as a reference)
			ret.prevObject = this;
			ret.context = this.context;

			// Return the newly-formed element set
			return ret;
		},

		// Execute a callback for every element in the matched set.
		each: function each(callback) {
			return jQuery.each(this, callback);
		},

		map: function map(callback) {
			return this.pushStack(jQuery.map(this, function (elem, i) {
				return callback.call(elem, i, elem);
			}));
		},

		slice: function slice() {
			return this.pushStack(_slice.apply(this, arguments));
		},

		first: function first() {
			return this.eq(0);
		},

		last: function last() {
			return this.eq(-1);
		},

		eq: function eq(i) {
			var len = this.length,
			    j = +i + (i < 0 ? len : 0);
			return this.pushStack(j >= 0 && j < len ? [this[j]] : []);
		},

		end: function end() {
			return this.prevObject || this.constructor();
		},

		// For internal use only.
		// Behaves like an Array's method, not like a jQuery method.
		push: push,
		sort: arr.sort,
		splice: arr.splice
	};

	jQuery.extend = jQuery.fn.extend = function () {
		var options,
		    name,
		    src,
		    copy,
		    copyIsArray,
		    clone,
		    target = arguments[0] || {},
		    i = 1,
		    length = arguments.length,
		    deep = false;

		// Handle a deep copy situation
		if (typeof target === "boolean") {
			deep = target;

			// Skip the boolean and the target
			target = arguments[i] || {};
			i++;
		}

		// Handle case when target is a string or something (possible in deep copy)
		if ((typeof target === "undefined" ? "undefined" : _typeof(target)) !== "object" && !jQuery.isFunction(target)) {
			target = {};
		}

		// Extend jQuery itself if only one argument is passed
		if (i === length) {
			target = this;
			i--;
		}

		for (; i < length; i++) {

			// Only deal with non-null/undefined values
			if ((options = arguments[i]) != null) {

				// Extend the base object
				for (name in options) {
					src = target[name];
					copy = options[name];

					// Prevent never-ending loop
					if (target === copy) {
						continue;
					}

					// Recurse if we're merging plain objects or arrays
					if (deep && copy && (jQuery.isPlainObject(copy) || (copyIsArray = jQuery.isArray(copy)))) {

						if (copyIsArray) {
							copyIsArray = false;
							clone = src && jQuery.isArray(src) ? src : [];
						} else {
							clone = src && jQuery.isPlainObject(src) ? src : {};
						}

						// Never move original objects, clone them
						target[name] = jQuery.extend(deep, clone, copy);

						// Don't bring in undefined values
					} else if (copy !== undefined) {
						target[name] = copy;
					}
				}
			}
		}

		// Return the modified object
		return target;
	};

	jQuery.extend({

		// Unique for each copy of jQuery on the page
		expando: "jQuery" + (version + Math.random()).replace(/\D/g, ""),

		// Assume jQuery is ready without the ready module
		isReady: true,

		error: function error(msg) {
			throw new Error(msg);
		},

		noop: function noop() {},

		isFunction: function isFunction(obj) {
			return jQuery.type(obj) === "function";
		},

		isArray: Array.isArray,

		isWindow: function isWindow(obj) {
			return obj != null && obj === obj.window;
		},

		isNumeric: function isNumeric(obj) {

			// parseFloat NaNs numeric-cast false positives (null|true|false|"")
			// ...but misinterprets leading-number strings, particularly hex literals ("0x...")
			// subtraction forces infinities to NaN
			// adding 1 corrects loss of precision from parseFloat (#15100)
			var realStringObj = obj && obj.toString();
			return !jQuery.isArray(obj) && realStringObj - parseFloat(realStringObj) + 1 >= 0;
		},

		isPlainObject: function isPlainObject(obj) {
			var key;

			// Not plain objects:
			// - Any object or value whose internal [[Class]] property is not "[object Object]"
			// - DOM nodes
			// - window
			if (jQuery.type(obj) !== "object" || obj.nodeType || jQuery.isWindow(obj)) {
				return false;
			}

			// Not own constructor property must be Object
			if (obj.constructor && !hasOwn.call(obj, "constructor") && !hasOwn.call(obj.constructor.prototype || {}, "isPrototypeOf")) {
				return false;
			}

			// Own properties are enumerated firstly, so to speed up,
			// if last one is own, then all properties are own
			for (key in obj) {}

			return key === undefined || hasOwn.call(obj, key);
		},

		isEmptyObject: function isEmptyObject(obj) {
			var name;
			for (name in obj) {
				return false;
			}
			return true;
		},

		type: function type(obj) {
			if (obj == null) {
				return obj + "";
			}

			// Support: Android<4.0, iOS<6 (functionish RegExp)
			return (typeof obj === "undefined" ? "undefined" : _typeof(obj)) === "object" || typeof obj === "function" ? class2type[toString.call(obj)] || "object" : typeof obj === "undefined" ? "undefined" : _typeof(obj);
		},

		// Evaluates a script in a global context
		globalEval: function globalEval(code) {
			var script,
			    indirect = eval;

			code = jQuery.trim(code);

			if (code) {

				// If the code includes a valid, prologue position
				// strict mode pragma, execute code by injecting a
				// script tag into the document.
				if (code.indexOf("use strict") === 1) {
					script = document.createElement("script");
					script.text = code;
					document.head.appendChild(script).parentNode.removeChild(script);
				} else {

					// Otherwise, avoid the DOM node creation, insertion
					// and removal by using an indirect global eval

					indirect(code);
				}
			}
		},

		// Convert dashed to camelCase; used by the css and data modules
		// Support: IE9-11+
		// Microsoft forgot to hump their vendor prefix (#9572)
		camelCase: function camelCase(string) {
			return string.replace(rmsPrefix, "ms-").replace(rdashAlpha, fcamelCase);
		},

		nodeName: function nodeName(elem, name) {
			return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();
		},

		each: function each(obj, callback) {
			var length,
			    i = 0;

			if (isArrayLike(obj)) {
				length = obj.length;
				for (; i < length; i++) {
					if (callback.call(obj[i], i, obj[i]) === false) {
						break;
					}
				}
			} else {
				for (i in obj) {
					if (callback.call(obj[i], i, obj[i]) === false) {
						break;
					}
				}
			}

			return obj;
		},

		// Support: Android<4.1
		trim: function trim(text) {
			return text == null ? "" : (text + "").replace(rtrim, "");
		},

		// results is for internal usage only
		makeArray: function makeArray(arr, results) {
			var ret = results || [];

			if (arr != null) {
				if (isArrayLike(Object(arr))) {
					jQuery.merge(ret, typeof arr === "string" ? [arr] : arr);
				} else {
					push.call(ret, arr);
				}
			}

			return ret;
		},

		inArray: function inArray(elem, arr, i) {
			return arr == null ? -1 : indexOf.call(arr, elem, i);
		},

		merge: function merge(first, second) {
			var len = +second.length,
			    j = 0,
			    i = first.length;

			for (; j < len; j++) {
				first[i++] = second[j];
			}

			first.length = i;

			return first;
		},

		grep: function grep(elems, callback, invert) {
			var callbackInverse,
			    matches = [],
			    i = 0,
			    length = elems.length,
			    callbackExpect = !invert;

			// Go through the array, only saving the items
			// that pass the validator function
			for (; i < length; i++) {
				callbackInverse = !callback(elems[i], i);
				if (callbackInverse !== callbackExpect) {
					matches.push(elems[i]);
				}
			}

			return matches;
		},

		// arg is for internal usage only
		map: function map(elems, callback, arg) {
			var length,
			    value,
			    i = 0,
			    ret = [];

			// Go through the array, translating each of the items to their new values
			if (isArrayLike(elems)) {
				length = elems.length;
				for (; i < length; i++) {
					value = callback(elems[i], i, arg);

					if (value != null) {
						ret.push(value);
					}
				}

				// Go through every key on the object,
			} else {
				for (i in elems) {
					value = callback(elems[i], i, arg);

					if (value != null) {
						ret.push(value);
					}
				}
			}

			// Flatten any nested arrays
			return concat.apply([], ret);
		},

		// A global GUID counter for objects
		guid: 1,

		// Bind a function to a context, optionally partially applying any
		// arguments.
		proxy: function proxy(fn, context) {
			var tmp, args, proxy;

			if (typeof context === "string") {
				tmp = fn[context];
				context = fn;
				fn = tmp;
			}

			// Quick check to determine if target is callable, in the spec
			// this throws a TypeError, but we will just return undefined.
			if (!jQuery.isFunction(fn)) {
				return undefined;
			}

			// Simulated bind
			args = _slice.call(arguments, 2);
			proxy = function proxy() {
				return fn.apply(context || this, args.concat(_slice.call(arguments)));
			};

			// Set the guid of unique handler to the same of original handler, so it can be removed
			proxy.guid = fn.guid = fn.guid || jQuery.guid++;

			return proxy;
		},

		now: Date.now,

		// jQuery.support is not used in Core but other projects attach their
		// properties to it so it needs to exist.
		support: support
	});

	// JSHint would error on this code due to the Symbol not being defined in ES5.
	// Defining this global in .jshintrc would create a danger of using the global
	// unguarded in another place, it seems safer to just disable JSHint for these
	// three lines.
	/* jshint ignore: start */
	if (typeof Symbol === "function") {
		jQuery.fn[Symbol.iterator] = arr[Symbol.iterator];
	}
	/* jshint ignore: end */

	// Populate the class2type map
	jQuery.each("Boolean Number String Function Array Date RegExp Object Error Symbol".split(" "), function (i, name) {
		class2type["[object " + name + "]"] = name.toLowerCase();
	});

	function isArrayLike(obj) {

		// Support: iOS 8.2 (not reproducible in simulator)
		// `in` check used to prevent JIT error (gh-2145)
		// hasOwn isn't used here due to false negatives
		// regarding Nodelist length in IE
		var length = !!obj && "length" in obj && obj.length,
		    type = jQuery.type(obj);

		if (type === "function" || jQuery.isWindow(obj)) {
			return false;
		}

		return type === "array" || length === 0 || typeof length === "number" && length > 0 && length - 1 in obj;
	}
	var Sizzle =
	/*!
  * Sizzle CSS Selector Engine v2.2.1
  * http://sizzlejs.com/
  *
  * Copyright jQuery Foundation and other contributors
  * Released under the MIT license
  * http://jquery.org/license
  *
  * Date: 2015-10-17
  */
	function (window) {

		var i,
		    support,
		    Expr,
		    getText,
		    isXML,
		    tokenize,
		    compile,
		    select,
		    outermostContext,
		    sortInput,
		    hasDuplicate,


		// Local document vars
		setDocument,
		    document,
		    docElem,
		    documentIsHTML,
		    rbuggyQSA,
		    rbuggyMatches,
		    matches,
		    contains,


		// Instance-specific data
		expando = "sizzle" + 1 * new Date(),
		    preferredDoc = window.document,
		    dirruns = 0,
		    done = 0,
		    classCache = createCache(),
		    tokenCache = createCache(),
		    compilerCache = createCache(),
		    sortOrder = function sortOrder(a, b) {
			if (a === b) {
				hasDuplicate = true;
			}
			return 0;
		},


		// General-purpose constants
		MAX_NEGATIVE = 1 << 31,


		// Instance methods
		hasOwn = {}.hasOwnProperty,
		    arr = [],
		    pop = arr.pop,
		    push_native = arr.push,
		    push = arr.push,
		    slice = arr.slice,

		// Use a stripped-down indexOf as it's faster than native
		// http://jsperf.com/thor-indexof-vs-for/5
		indexOf = function indexOf(list, elem) {
			var i = 0,
			    len = list.length;
			for (; i < len; i++) {
				if (list[i] === elem) {
					return i;
				}
			}
			return -1;
		},
		    booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",


		// Regular expressions

		// http://www.w3.org/TR/css3-selectors/#whitespace
		whitespace = "[\\x20\\t\\r\\n\\f]",


		// http://www.w3.org/TR/CSS21/syndata.html#value-def-identifier
		identifier = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",


		// Attribute selectors: http://www.w3.org/TR/selectors/#attribute-selectors
		attributes = "\\[" + whitespace + "*(" + identifier + ")(?:" + whitespace +
		// Operator (capture 2)
		"*([*^$|!~]?=)" + whitespace +
		// "Attribute values must be CSS identifiers [capture 5] or strings [capture 3 or capture 4]"
		"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + identifier + "))|)" + whitespace + "*\\]",
		    pseudos = ":(" + identifier + ")(?:\\((" +
		// To reduce the number of selectors needing tokenize in the preFilter, prefer arguments:
		// 1. quoted (capture 3; capture 4 or capture 5)
		"('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|" +
		// 2. simple (capture 6)
		"((?:\\\\.|[^\\\\()[\\]]|" + attributes + ")*)|" +
		// 3. anything else (capture 2)
		".*" + ")\\)|)",


		// Leading and non-escaped trailing whitespace, capturing some non-whitespace characters preceding the latter
		rwhitespace = new RegExp(whitespace + "+", "g"),
		    rtrim = new RegExp("^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g"),
		    rcomma = new RegExp("^" + whitespace + "*," + whitespace + "*"),
		    rcombinators = new RegExp("^" + whitespace + "*([>+~]|" + whitespace + ")" + whitespace + "*"),
		    rattributeQuotes = new RegExp("=" + whitespace + "*([^\\]'\"]*?)" + whitespace + "*\\]", "g"),
		    rpseudo = new RegExp(pseudos),
		    ridentifier = new RegExp("^" + identifier + "$"),
		    matchExpr = {
			"ID": new RegExp("^#(" + identifier + ")"),
			"CLASS": new RegExp("^\\.(" + identifier + ")"),
			"TAG": new RegExp("^(" + identifier + "|[*])"),
			"ATTR": new RegExp("^" + attributes),
			"PSEUDO": new RegExp("^" + pseudos),
			"CHILD": new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + whitespace + "*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace + "*(\\d+)|))" + whitespace + "*\\)|)", "i"),
			"bool": new RegExp("^(?:" + booleans + ")$", "i"),
			// For use in libraries implementing .is()
			// We use this for POS matching in `select`
			"needsContext": new RegExp("^" + whitespace + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + whitespace + "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i")
		},
		    rinputs = /^(?:input|select|textarea|button)$/i,
		    rheader = /^h\d$/i,
		    rnative = /^[^{]+\{\s*\[native \w/,


		// Easily-parseable/retrievable ID or TAG or CLASS selectors
		rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,
		    rsibling = /[+~]/,
		    rescape = /'|\\/g,


		// CSS escapes http://www.w3.org/TR/CSS21/syndata.html#escaped-characters
		runescape = new RegExp("\\\\([\\da-f]{1,6}" + whitespace + "?|(" + whitespace + ")|.)", "ig"),
		    funescape = function funescape(_, escaped, escapedWhitespace) {
			var high = "0x" + escaped - 0x10000;
			// NaN means non-codepoint
			// Support: Firefox<24
			// Workaround erroneous numeric interpretation of +"0x"
			return high !== high || escapedWhitespace ? escaped : high < 0 ?
			// BMP codepoint
			String.fromCharCode(high + 0x10000) :
			// Supplemental Plane codepoint (surrogate pair)
			String.fromCharCode(high >> 10 | 0xD800, high & 0x3FF | 0xDC00);
		},


		// Used for iframes
		// See setDocument()
		// Removing the function wrapper causes a "Permission Denied"
		// error in IE
		unloadHandler = function unloadHandler() {
			setDocument();
		};

		// Optimize for push.apply( _, NodeList )
		try {
			push.apply(arr = slice.call(preferredDoc.childNodes), preferredDoc.childNodes);
			// Support: Android<4.0
			// Detect silently failing push.apply
			arr[preferredDoc.childNodes.length].nodeType;
		} catch (e) {
			push = { apply: arr.length ?

				// Leverage slice if possible
				function (target, els) {
					push_native.apply(target, slice.call(els));
				} :

				// Support: IE<9
				// Otherwise append directly
				function (target, els) {
					var j = target.length,
					    i = 0;
					// Can't trust NodeList.length
					while (target[j++] = els[i++]) {}
					target.length = j - 1;
				}
			};
		}

		function Sizzle(selector, context, results, seed) {
			var m,
			    i,
			    elem,
			    nid,
			    nidselect,
			    match,
			    groups,
			    newSelector,
			    newContext = context && context.ownerDocument,


			// nodeType defaults to 9, since context defaults to document
			nodeType = context ? context.nodeType : 9;

			results = results || [];

			// Return early from calls with invalid selector or context
			if (typeof selector !== "string" || !selector || nodeType !== 1 && nodeType !== 9 && nodeType !== 11) {

				return results;
			}

			// Try to shortcut find operations (as opposed to filters) in HTML documents
			if (!seed) {

				if ((context ? context.ownerDocument || context : preferredDoc) !== document) {
					setDocument(context);
				}
				context = context || document;

				if (documentIsHTML) {

					// If the selector is sufficiently simple, try using a "get*By*" DOM method
					// (excepting DocumentFragment context, where the methods don't exist)
					if (nodeType !== 11 && (match = rquickExpr.exec(selector))) {

						// ID selector
						if (m = match[1]) {

							// Document context
							if (nodeType === 9) {
								if (elem = context.getElementById(m)) {

									// Support: IE, Opera, Webkit
									// TODO: identify versions
									// getElementById can match elements by name instead of ID
									if (elem.id === m) {
										results.push(elem);
										return results;
									}
								} else {
									return results;
								}

								// Element context
							} else {

								// Support: IE, Opera, Webkit
								// TODO: identify versions
								// getElementById can match elements by name instead of ID
								if (newContext && (elem = newContext.getElementById(m)) && contains(context, elem) && elem.id === m) {

									results.push(elem);
									return results;
								}
							}

							// Type selector
						} else if (match[2]) {
							push.apply(results, context.getElementsByTagName(selector));
							return results;

							// Class selector
						} else if ((m = match[3]) && support.getElementsByClassName && context.getElementsByClassName) {

							push.apply(results, context.getElementsByClassName(m));
							return results;
						}
					}

					// Take advantage of querySelectorAll
					if (support.qsa && !compilerCache[selector + " "] && (!rbuggyQSA || !rbuggyQSA.test(selector))) {

						if (nodeType !== 1) {
							newContext = context;
							newSelector = selector;

							// qSA looks outside Element context, which is not what we want
							// Thanks to Andrew Dupont for this workaround technique
							// Support: IE <=8
							// Exclude object elements
						} else if (context.nodeName.toLowerCase() !== "object") {

							// Capture the context ID, setting it first if necessary
							if (nid = context.getAttribute("id")) {
								nid = nid.replace(rescape, "\\$&");
							} else {
								context.setAttribute("id", nid = expando);
							}

							// Prefix every selector in the list
							groups = tokenize(selector);
							i = groups.length;
							nidselect = ridentifier.test(nid) ? "#" + nid : "[id='" + nid + "']";
							while (i--) {
								groups[i] = nidselect + " " + toSelector(groups[i]);
							}
							newSelector = groups.join(",");

							// Expand context for sibling selectors
							newContext = rsibling.test(selector) && testContext(context.parentNode) || context;
						}

						if (newSelector) {
							try {
								push.apply(results, newContext.querySelectorAll(newSelector));
								return results;
							} catch (qsaError) {} finally {
								if (nid === expando) {
									context.removeAttribute("id");
								}
							}
						}
					}
				}
			}

			// All others
			return select(selector.replace(rtrim, "$1"), context, results, seed);
		}

		/**
   * Create key-value caches of limited size
   * @returns {function(string, object)} Returns the Object data after storing it on itself with
   *	property name the (space-suffixed) string and (if the cache is larger than Expr.cacheLength)
   *	deleting the oldest entry
   */
		function createCache() {
			var keys = [];

			function cache(key, value) {
				// Use (key + " ") to avoid collision with native prototype properties (see Issue #157)
				if (keys.push(key + " ") > Expr.cacheLength) {
					// Only keep the most recent entries
					delete cache[keys.shift()];
				}
				return cache[key + " "] = value;
			}
			return cache;
		}

		/**
   * Mark a function for special use by Sizzle
   * @param {Function} fn The function to mark
   */
		function markFunction(fn) {
			fn[expando] = true;
			return fn;
		}

		/**
   * Support testing using an element
   * @param {Function} fn Passed the created div and expects a boolean result
   */
		function assert(fn) {
			var div = document.createElement("div");

			try {
				return !!fn(div);
			} catch (e) {
				return false;
			} finally {
				// Remove from its parent by default
				if (div.parentNode) {
					div.parentNode.removeChild(div);
				}
				// release memory in IE
				div = null;
			}
		}

		/**
   * Adds the same handler for all of the specified attrs
   * @param {String} attrs Pipe-separated list of attributes
   * @param {Function} handler The method that will be applied
   */
		function addHandle(attrs, handler) {
			var arr = attrs.split("|"),
			    i = arr.length;

			while (i--) {
				Expr.attrHandle[arr[i]] = handler;
			}
		}

		/**
   * Checks document order of two siblings
   * @param {Element} a
   * @param {Element} b
   * @returns {Number} Returns less than 0 if a precedes b, greater than 0 if a follows b
   */
		function siblingCheck(a, b) {
			var cur = b && a,
			    diff = cur && a.nodeType === 1 && b.nodeType === 1 && (~b.sourceIndex || MAX_NEGATIVE) - (~a.sourceIndex || MAX_NEGATIVE);

			// Use IE sourceIndex if available on both nodes
			if (diff) {
				return diff;
			}

			// Check if b follows a
			if (cur) {
				while (cur = cur.nextSibling) {
					if (cur === b) {
						return -1;
					}
				}
			}

			return a ? 1 : -1;
		}

		/**
   * Returns a function to use in pseudos for input types
   * @param {String} type
   */
		function createInputPseudo(type) {
			return function (elem) {
				var name = elem.nodeName.toLowerCase();
				return name === "input" && elem.type === type;
			};
		}

		/**
   * Returns a function to use in pseudos for buttons
   * @param {String} type
   */
		function createButtonPseudo(type) {
			return function (elem) {
				var name = elem.nodeName.toLowerCase();
				return (name === "input" || name === "button") && elem.type === type;
			};
		}

		/**
   * Returns a function to use in pseudos for positionals
   * @param {Function} fn
   */
		function createPositionalPseudo(fn) {
			return markFunction(function (argument) {
				argument = +argument;
				return markFunction(function (seed, matches) {
					var j,
					    matchIndexes = fn([], seed.length, argument),
					    i = matchIndexes.length;

					// Match elements found at the specified indexes
					while (i--) {
						if (seed[j = matchIndexes[i]]) {
							seed[j] = !(matches[j] = seed[j]);
						}
					}
				});
			});
		}

		/**
   * Checks a node for validity as a Sizzle context
   * @param {Element|Object=} context
   * @returns {Element|Object|Boolean} The input node if acceptable, otherwise a falsy value
   */
		function testContext(context) {
			return context && typeof context.getElementsByTagName !== "undefined" && context;
		}

		// Expose support vars for convenience
		support = Sizzle.support = {};

		/**
   * Detects XML nodes
   * @param {Element|Object} elem An element or a document
   * @returns {Boolean} True iff elem is a non-HTML XML node
   */
		isXML = Sizzle.isXML = function (elem) {
			// documentElement is verified for cases where it doesn't yet exist
			// (such as loading iframes in IE - #4833)
			var documentElement = elem && (elem.ownerDocument || elem).documentElement;
			return documentElement ? documentElement.nodeName !== "HTML" : false;
		};

		/**
   * Sets document-related variables once based on the current document
   * @param {Element|Object} [doc] An element or document object to use to set the document
   * @returns {Object} Returns the current document
   */
		setDocument = Sizzle.setDocument = function (node) {
			var hasCompare,
			    parent,
			    doc = node ? node.ownerDocument || node : preferredDoc;

			// Return early if doc is invalid or already selected
			if (doc === document || doc.nodeType !== 9 || !doc.documentElement) {
				return document;
			}

			// Update global variables
			document = doc;
			docElem = document.documentElement;
			documentIsHTML = !isXML(document);

			// Support: IE 9-11, Edge
			// Accessing iframe documents after unload throws "permission denied" errors (jQuery #13936)
			if ((parent = document.defaultView) && parent.top !== parent) {
				// Support: IE 11
				if (parent.addEventListener) {
					parent.addEventListener("unload", unloadHandler, false);

					// Support: IE 9 - 10 only
				} else if (parent.attachEvent) {
					parent.attachEvent("onunload", unloadHandler);
				}
			}

			/* Attributes
   ---------------------------------------------------------------------- */

			// Support: IE<8
			// Verify that getAttribute really returns attributes and not properties
			// (excepting IE8 booleans)
			support.attributes = assert(function (div) {
				div.className = "i";
				return !div.getAttribute("className");
			});

			/* getElement(s)By*
   ---------------------------------------------------------------------- */

			// Check if getElementsByTagName("*") returns only elements
			support.getElementsByTagName = assert(function (div) {
				div.appendChild(document.createComment(""));
				return !div.getElementsByTagName("*").length;
			});

			// Support: IE<9
			support.getElementsByClassName = rnative.test(document.getElementsByClassName);

			// Support: IE<10
			// Check if getElementById returns elements by name
			// The broken getElementById methods don't pick up programatically-set names,
			// so use a roundabout getElementsByName test
			support.getById = assert(function (div) {
				docElem.appendChild(div).id = expando;
				return !document.getElementsByName || !document.getElementsByName(expando).length;
			});

			// ID find and filter
			if (support.getById) {
				Expr.find["ID"] = function (id, context) {
					if (typeof context.getElementById !== "undefined" && documentIsHTML) {
						var m = context.getElementById(id);
						return m ? [m] : [];
					}
				};
				Expr.filter["ID"] = function (id) {
					var attrId = id.replace(runescape, funescape);
					return function (elem) {
						return elem.getAttribute("id") === attrId;
					};
				};
			} else {
				// Support: IE6/7
				// getElementById is not reliable as a find shortcut
				delete Expr.find["ID"];

				Expr.filter["ID"] = function (id) {
					var attrId = id.replace(runescape, funescape);
					return function (elem) {
						var node = typeof elem.getAttributeNode !== "undefined" && elem.getAttributeNode("id");
						return node && node.value === attrId;
					};
				};
			}

			// Tag
			Expr.find["TAG"] = support.getElementsByTagName ? function (tag, context) {
				if (typeof context.getElementsByTagName !== "undefined") {
					return context.getElementsByTagName(tag);

					// DocumentFragment nodes don't have gEBTN
				} else if (support.qsa) {
					return context.querySelectorAll(tag);
				}
			} : function (tag, context) {
				var elem,
				    tmp = [],
				    i = 0,

				// By happy coincidence, a (broken) gEBTN appears on DocumentFragment nodes too
				results = context.getElementsByTagName(tag);

				// Filter out possible comments
				if (tag === "*") {
					while (elem = results[i++]) {
						if (elem.nodeType === 1) {
							tmp.push(elem);
						}
					}

					return tmp;
				}
				return results;
			};

			// Class
			Expr.find["CLASS"] = support.getElementsByClassName && function (className, context) {
				if (typeof context.getElementsByClassName !== "undefined" && documentIsHTML) {
					return context.getElementsByClassName(className);
				}
			};

			/* QSA/matchesSelector
   ---------------------------------------------------------------------- */

			// QSA and matchesSelector support

			// matchesSelector(:active) reports false when true (IE9/Opera 11.5)
			rbuggyMatches = [];

			// qSa(:focus) reports false when true (Chrome 21)
			// We allow this because of a bug in IE8/9 that throws an error
			// whenever `document.activeElement` is accessed on an iframe
			// So, we allow :focus to pass through QSA all the time to avoid the IE error
			// See http://bugs.jquery.com/ticket/13378
			rbuggyQSA = [];

			if (support.qsa = rnative.test(document.querySelectorAll)) {
				// Build QSA regex
				// Regex strategy adopted from Diego Perini
				assert(function (div) {
					// Select is set to empty string on purpose
					// This is to test IE's treatment of not explicitly
					// setting a boolean content attribute,
					// since its presence should be enough
					// http://bugs.jquery.com/ticket/12359
					docElem.appendChild(div).innerHTML = "<a id='" + expando + "'></a>" + "<select id='" + expando + "-\r\\' msallowcapture=''>" + "<option selected=''></option></select>";

					// Support: IE8, Opera 11-12.16
					// Nothing should be selected when empty strings follow ^= or $= or *=
					// The test attribute must be unknown in Opera but "safe" for WinRT
					// http://msdn.microsoft.com/en-us/library/ie/hh465388.aspx#attribute_section
					if (div.querySelectorAll("[msallowcapture^='']").length) {
						rbuggyQSA.push("[*^$]=" + whitespace + "*(?:''|\"\")");
					}

					// Support: IE8
					// Boolean attributes and "value" are not treated correctly
					if (!div.querySelectorAll("[selected]").length) {
						rbuggyQSA.push("\\[" + whitespace + "*(?:value|" + booleans + ")");
					}

					// Support: Chrome<29, Android<4.4, Safari<7.0+, iOS<7.0+, PhantomJS<1.9.8+
					if (!div.querySelectorAll("[id~=" + expando + "-]").length) {
						rbuggyQSA.push("~=");
					}

					// Webkit/Opera - :checked should return selected option elements
					// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
					// IE8 throws error here and will not see later tests
					if (!div.querySelectorAll(":checked").length) {
						rbuggyQSA.push(":checked");
					}

					// Support: Safari 8+, iOS 8+
					// https://bugs.webkit.org/show_bug.cgi?id=136851
					// In-page `selector#id sibing-combinator selector` fails
					if (!div.querySelectorAll("a#" + expando + "+*").length) {
						rbuggyQSA.push(".#.+[+~]");
					}
				});

				assert(function (div) {
					// Support: Windows 8 Native Apps
					// The type and name attributes are restricted during .innerHTML assignment
					var input = document.createElement("input");
					input.setAttribute("type", "hidden");
					div.appendChild(input).setAttribute("name", "D");

					// Support: IE8
					// Enforce case-sensitivity of name attribute
					if (div.querySelectorAll("[name=d]").length) {
						rbuggyQSA.push("name" + whitespace + "*[*^$|!~]?=");
					}

					// FF 3.5 - :enabled/:disabled and hidden elements (hidden elements are still enabled)
					// IE8 throws error here and will not see later tests
					if (!div.querySelectorAll(":enabled").length) {
						rbuggyQSA.push(":enabled", ":disabled");
					}

					// Opera 10-11 does not throw on post-comma invalid pseudos
					div.querySelectorAll("*,:x");
					rbuggyQSA.push(",.*:");
				});
			}

			if (support.matchesSelector = rnative.test(matches = docElem.matches || docElem.webkitMatchesSelector || docElem.mozMatchesSelector || docElem.oMatchesSelector || docElem.msMatchesSelector)) {

				assert(function (div) {
					// Check to see if it's possible to do matchesSelector
					// on a disconnected node (IE 9)
					support.disconnectedMatch = matches.call(div, "div");

					// This should fail with an exception
					// Gecko does not error, returns false instead
					matches.call(div, "[s!='']:x");
					rbuggyMatches.push("!=", pseudos);
				});
			}

			rbuggyQSA = rbuggyQSA.length && new RegExp(rbuggyQSA.join("|"));
			rbuggyMatches = rbuggyMatches.length && new RegExp(rbuggyMatches.join("|"));

			/* Contains
   ---------------------------------------------------------------------- */
			hasCompare = rnative.test(docElem.compareDocumentPosition);

			// Element contains another
			// Purposefully self-exclusive
			// As in, an element does not contain itself
			contains = hasCompare || rnative.test(docElem.contains) ? function (a, b) {
				var adown = a.nodeType === 9 ? a.documentElement : a,
				    bup = b && b.parentNode;
				return a === bup || !!(bup && bup.nodeType === 1 && (adown.contains ? adown.contains(bup) : a.compareDocumentPosition && a.compareDocumentPosition(bup) & 16));
			} : function (a, b) {
				if (b) {
					while (b = b.parentNode) {
						if (b === a) {
							return true;
						}
					}
				}
				return false;
			};

			/* Sorting
   ---------------------------------------------------------------------- */

			// Document order sorting
			sortOrder = hasCompare ? function (a, b) {

				// Flag for duplicate removal
				if (a === b) {
					hasDuplicate = true;
					return 0;
				}

				// Sort on method existence if only one input has compareDocumentPosition
				var compare = !a.compareDocumentPosition - !b.compareDocumentPosition;
				if (compare) {
					return compare;
				}

				// Calculate position if both inputs belong to the same document
				compare = (a.ownerDocument || a) === (b.ownerDocument || b) ? a.compareDocumentPosition(b) :

				// Otherwise we know they are disconnected
				1;

				// Disconnected nodes
				if (compare & 1 || !support.sortDetached && b.compareDocumentPosition(a) === compare) {

					// Choose the first element that is related to our preferred document
					if (a === document || a.ownerDocument === preferredDoc && contains(preferredDoc, a)) {
						return -1;
					}
					if (b === document || b.ownerDocument === preferredDoc && contains(preferredDoc, b)) {
						return 1;
					}

					// Maintain original order
					return sortInput ? indexOf(sortInput, a) - indexOf(sortInput, b) : 0;
				}

				return compare & 4 ? -1 : 1;
			} : function (a, b) {
				// Exit early if the nodes are identical
				if (a === b) {
					hasDuplicate = true;
					return 0;
				}

				var cur,
				    i = 0,
				    aup = a.parentNode,
				    bup = b.parentNode,
				    ap = [a],
				    bp = [b];

				// Parentless nodes are either documents or disconnected
				if (!aup || !bup) {
					return a === document ? -1 : b === document ? 1 : aup ? -1 : bup ? 1 : sortInput ? indexOf(sortInput, a) - indexOf(sortInput, b) : 0;

					// If the nodes are siblings, we can do a quick check
				} else if (aup === bup) {
					return siblingCheck(a, b);
				}

				// Otherwise we need full lists of their ancestors for comparison
				cur = a;
				while (cur = cur.parentNode) {
					ap.unshift(cur);
				}
				cur = b;
				while (cur = cur.parentNode) {
					bp.unshift(cur);
				}

				// Walk down the tree looking for a discrepancy
				while (ap[i] === bp[i]) {
					i++;
				}

				return i ?
				// Do a sibling check if the nodes have a common ancestor
				siblingCheck(ap[i], bp[i]) :

				// Otherwise nodes in our document sort first
				ap[i] === preferredDoc ? -1 : bp[i] === preferredDoc ? 1 : 0;
			};

			return document;
		};

		Sizzle.matches = function (expr, elements) {
			return Sizzle(expr, null, null, elements);
		};

		Sizzle.matchesSelector = function (elem, expr) {
			// Set document vars if needed
			if ((elem.ownerDocument || elem) !== document) {
				setDocument(elem);
			}

			// Make sure that attribute selectors are quoted
			expr = expr.replace(rattributeQuotes, "='$1']");

			if (support.matchesSelector && documentIsHTML && !compilerCache[expr + " "] && (!rbuggyMatches || !rbuggyMatches.test(expr)) && (!rbuggyQSA || !rbuggyQSA.test(expr))) {

				try {
					var ret = matches.call(elem, expr);

					// IE 9's matchesSelector returns false on disconnected nodes
					if (ret || support.disconnectedMatch ||
					// As well, disconnected nodes are said to be in a document
					// fragment in IE 9
					elem.document && elem.document.nodeType !== 11) {
						return ret;
					}
				} catch (e) {}
			}

			return Sizzle(expr, document, null, [elem]).length > 0;
		};

		Sizzle.contains = function (context, elem) {
			// Set document vars if needed
			if ((context.ownerDocument || context) !== document) {
				setDocument(context);
			}
			return contains(context, elem);
		};

		Sizzle.attr = function (elem, name) {
			// Set document vars if needed
			if ((elem.ownerDocument || elem) !== document) {
				setDocument(elem);
			}

			var fn = Expr.attrHandle[name.toLowerCase()],

			// Don't get fooled by Object.prototype properties (jQuery #13807)
			val = fn && hasOwn.call(Expr.attrHandle, name.toLowerCase()) ? fn(elem, name, !documentIsHTML) : undefined;

			return val !== undefined ? val : support.attributes || !documentIsHTML ? elem.getAttribute(name) : (val = elem.getAttributeNode(name)) && val.specified ? val.value : null;
		};

		Sizzle.error = function (msg) {
			throw new Error("Syntax error, unrecognized expression: " + msg);
		};

		/**
   * Document sorting and removing duplicates
   * @param {ArrayLike} results
   */
		Sizzle.uniqueSort = function (results) {
			var elem,
			    duplicates = [],
			    j = 0,
			    i = 0;

			// Unless we *know* we can detect duplicates, assume their presence
			hasDuplicate = !support.detectDuplicates;
			sortInput = !support.sortStable && results.slice(0);
			results.sort(sortOrder);

			if (hasDuplicate) {
				while (elem = results[i++]) {
					if (elem === results[i]) {
						j = duplicates.push(i);
					}
				}
				while (j--) {
					results.splice(duplicates[j], 1);
				}
			}

			// Clear input after sorting to release objects
			// See https://github.com/jquery/sizzle/pull/225
			sortInput = null;

			return results;
		};

		/**
   * Utility function for retrieving the text value of an array of DOM nodes
   * @param {Array|Element} elem
   */
		getText = Sizzle.getText = function (elem) {
			var node,
			    ret = "",
			    i = 0,
			    nodeType = elem.nodeType;

			if (!nodeType) {
				// If no nodeType, this is expected to be an array
				while (node = elem[i++]) {
					// Do not traverse comment nodes
					ret += getText(node);
				}
			} else if (nodeType === 1 || nodeType === 9 || nodeType === 11) {
				// Use textContent for elements
				// innerText usage removed for consistency of new lines (jQuery #11153)
				if (typeof elem.textContent === "string") {
					return elem.textContent;
				} else {
					// Traverse its children
					for (elem = elem.firstChild; elem; elem = elem.nextSibling) {
						ret += getText(elem);
					}
				}
			} else if (nodeType === 3 || nodeType === 4) {
				return elem.nodeValue;
			}
			// Do not include comment or processing instruction nodes

			return ret;
		};

		Expr = Sizzle.selectors = {

			// Can be adjusted by the user
			cacheLength: 50,

			createPseudo: markFunction,

			match: matchExpr,

			attrHandle: {},

			find: {},

			relative: {
				">": { dir: "parentNode", first: true },
				" ": { dir: "parentNode" },
				"+": { dir: "previousSibling", first: true },
				"~": { dir: "previousSibling" }
			},

			preFilter: {
				"ATTR": function ATTR(match) {
					match[1] = match[1].replace(runescape, funescape);

					// Move the given value to match[3] whether quoted or unquoted
					match[3] = (match[3] || match[4] || match[5] || "").replace(runescape, funescape);

					if (match[2] === "~=") {
						match[3] = " " + match[3] + " ";
					}

					return match.slice(0, 4);
				},

				"CHILD": function CHILD(match) {
					/* matches from matchExpr["CHILD"]
     	1 type (only|nth|...)
     	2 what (child|of-type)
     	3 argument (even|odd|\d*|\d*n([+-]\d+)?|...)
     	4 xn-component of xn+y argument ([+-]?\d*n|)
     	5 sign of xn-component
     	6 x of xn-component
     	7 sign of y-component
     	8 y of y-component
     */
					match[1] = match[1].toLowerCase();

					if (match[1].slice(0, 3) === "nth") {
						// nth-* requires argument
						if (!match[3]) {
							Sizzle.error(match[0]);
						}

						// numeric x and y parameters for Expr.filter.CHILD
						// remember that false/true cast respectively to 0/1
						match[4] = +(match[4] ? match[5] + (match[6] || 1) : 2 * (match[3] === "even" || match[3] === "odd"));
						match[5] = +(match[7] + match[8] || match[3] === "odd");

						// other types prohibit arguments
					} else if (match[3]) {
						Sizzle.error(match[0]);
					}

					return match;
				},

				"PSEUDO": function PSEUDO(match) {
					var excess,
					    unquoted = !match[6] && match[2];

					if (matchExpr["CHILD"].test(match[0])) {
						return null;
					}

					// Accept quoted arguments as-is
					if (match[3]) {
						match[2] = match[4] || match[5] || "";

						// Strip excess characters from unquoted arguments
					} else if (unquoted && rpseudo.test(unquoted) && (
					// Get excess from tokenize (recursively)
					excess = tokenize(unquoted, true)) && (
					// advance to the next closing parenthesis
					excess = unquoted.indexOf(")", unquoted.length - excess) - unquoted.length)) {

						// excess is a negative index
						match[0] = match[0].slice(0, excess);
						match[2] = unquoted.slice(0, excess);
					}

					// Return only captures needed by the pseudo filter method (type and argument)
					return match.slice(0, 3);
				}
			},

			filter: {

				"TAG": function TAG(nodeNameSelector) {
					var nodeName = nodeNameSelector.replace(runescape, funescape).toLowerCase();
					return nodeNameSelector === "*" ? function () {
						return true;
					} : function (elem) {
						return elem.nodeName && elem.nodeName.toLowerCase() === nodeName;
					};
				},

				"CLASS": function CLASS(className) {
					var pattern = classCache[className + " "];

					return pattern || (pattern = new RegExp("(^|" + whitespace + ")" + className + "(" + whitespace + "|$)")) && classCache(className, function (elem) {
						return pattern.test(typeof elem.className === "string" && elem.className || typeof elem.getAttribute !== "undefined" && elem.getAttribute("class") || "");
					});
				},

				"ATTR": function ATTR(name, operator, check) {
					return function (elem) {
						var result = Sizzle.attr(elem, name);

						if (result == null) {
							return operator === "!=";
						}
						if (!operator) {
							return true;
						}

						result += "";

						return operator === "=" ? result === check : operator === "!=" ? result !== check : operator === "^=" ? check && result.indexOf(check) === 0 : operator === "*=" ? check && result.indexOf(check) > -1 : operator === "$=" ? check && result.slice(-check.length) === check : operator === "~=" ? (" " + result.replace(rwhitespace, " ") + " ").indexOf(check) > -1 : operator === "|=" ? result === check || result.slice(0, check.length + 1) === check + "-" : false;
					};
				},

				"CHILD": function CHILD(type, what, argument, first, last) {
					var simple = type.slice(0, 3) !== "nth",
					    forward = type.slice(-4) !== "last",
					    ofType = what === "of-type";

					return first === 1 && last === 0 ?

					// Shortcut for :nth-*(n)
					function (elem) {
						return !!elem.parentNode;
					} : function (elem, context, xml) {
						var cache,
						    uniqueCache,
						    outerCache,
						    node,
						    nodeIndex,
						    start,
						    dir = simple !== forward ? "nextSibling" : "previousSibling",
						    parent = elem.parentNode,
						    name = ofType && elem.nodeName.toLowerCase(),
						    useCache = !xml && !ofType,
						    diff = false;

						if (parent) {

							// :(first|last|only)-(child|of-type)
							if (simple) {
								while (dir) {
									node = elem;
									while (node = node[dir]) {
										if (ofType ? node.nodeName.toLowerCase() === name : node.nodeType === 1) {

											return false;
										}
									}
									// Reverse direction for :only-* (if we haven't yet done so)
									start = dir = type === "only" && !start && "nextSibling";
								}
								return true;
							}

							start = [forward ? parent.firstChild : parent.lastChild];

							// non-xml :nth-child(...) stores cache data on `parent`
							if (forward && useCache) {

								// Seek `elem` from a previously-cached index

								// ...in a gzip-friendly way
								node = parent;
								outerCache = node[expando] || (node[expando] = {});

								// Support: IE <9 only
								// Defend against cloned attroperties (jQuery gh-1709)
								uniqueCache = outerCache[node.uniqueID] || (outerCache[node.uniqueID] = {});

								cache = uniqueCache[type] || [];
								nodeIndex = cache[0] === dirruns && cache[1];
								diff = nodeIndex && cache[2];
								node = nodeIndex && parent.childNodes[nodeIndex];

								while (node = ++nodeIndex && node && node[dir] || (

								// Fallback to seeking `elem` from the start
								diff = nodeIndex = 0) || start.pop()) {

									// When found, cache indexes on `parent` and break
									if (node.nodeType === 1 && ++diff && node === elem) {
										uniqueCache[type] = [dirruns, nodeIndex, diff];
										break;
									}
								}
							} else {
								// Use previously-cached element index if available
								if (useCache) {
									// ...in a gzip-friendly way
									node = elem;
									outerCache = node[expando] || (node[expando] = {});

									// Support: IE <9 only
									// Defend against cloned attroperties (jQuery gh-1709)
									uniqueCache = outerCache[node.uniqueID] || (outerCache[node.uniqueID] = {});

									cache = uniqueCache[type] || [];
									nodeIndex = cache[0] === dirruns && cache[1];
									diff = nodeIndex;
								}

								// xml :nth-child(...)
								// or :nth-last-child(...) or :nth(-last)?-of-type(...)
								if (diff === false) {
									// Use the same loop as above to seek `elem` from the start
									while (node = ++nodeIndex && node && node[dir] || (diff = nodeIndex = 0) || start.pop()) {

										if ((ofType ? node.nodeName.toLowerCase() === name : node.nodeType === 1) && ++diff) {

											// Cache the index of each encountered element
											if (useCache) {
												outerCache = node[expando] || (node[expando] = {});

												// Support: IE <9 only
												// Defend against cloned attroperties (jQuery gh-1709)
												uniqueCache = outerCache[node.uniqueID] || (outerCache[node.uniqueID] = {});

												uniqueCache[type] = [dirruns, diff];
											}

											if (node === elem) {
												break;
											}
										}
									}
								}
							}

							// Incorporate the offset, then check against cycle size
							diff -= last;
							return diff === first || diff % first === 0 && diff / first >= 0;
						}
					};
				},

				"PSEUDO": function PSEUDO(pseudo, argument) {
					// pseudo-class names are case-insensitive
					// http://www.w3.org/TR/selectors/#pseudo-classes
					// Prioritize by case sensitivity in case custom pseudos are added with uppercase letters
					// Remember that setFilters inherits from pseudos
					var args,
					    fn = Expr.pseudos[pseudo] || Expr.setFilters[pseudo.toLowerCase()] || Sizzle.error("unsupported pseudo: " + pseudo);

					// The user may use createPseudo to indicate that
					// arguments are needed to create the filter function
					// just as Sizzle does
					if (fn[expando]) {
						return fn(argument);
					}

					// But maintain support for old signatures
					if (fn.length > 1) {
						args = [pseudo, pseudo, "", argument];
						return Expr.setFilters.hasOwnProperty(pseudo.toLowerCase()) ? markFunction(function (seed, matches) {
							var idx,
							    matched = fn(seed, argument),
							    i = matched.length;
							while (i--) {
								idx = indexOf(seed, matched[i]);
								seed[idx] = !(matches[idx] = matched[i]);
							}
						}) : function (elem) {
							return fn(elem, 0, args);
						};
					}

					return fn;
				}
			},

			pseudos: {
				// Potentially complex pseudos
				"not": markFunction(function (selector) {
					// Trim the selector passed to compile
					// to avoid treating leading and trailing
					// spaces as combinators
					var input = [],
					    results = [],
					    matcher = compile(selector.replace(rtrim, "$1"));

					return matcher[expando] ? markFunction(function (seed, matches, context, xml) {
						var elem,
						    unmatched = matcher(seed, null, xml, []),
						    i = seed.length;

						// Match elements unmatched by `matcher`
						while (i--) {
							if (elem = unmatched[i]) {
								seed[i] = !(matches[i] = elem);
							}
						}
					}) : function (elem, context, xml) {
						input[0] = elem;
						matcher(input, null, xml, results);
						// Don't keep the element (issue #299)
						input[0] = null;
						return !results.pop();
					};
				}),

				"has": markFunction(function (selector) {
					return function (elem) {
						return Sizzle(selector, elem).length > 0;
					};
				}),

				"contains": markFunction(function (text) {
					text = text.replace(runescape, funescape);
					return function (elem) {
						return (elem.textContent || elem.innerText || getText(elem)).indexOf(text) > -1;
					};
				}),

				// "Whether an element is represented by a :lang() selector
				// is based solely on the element's language value
				// being equal to the identifier C,
				// or beginning with the identifier C immediately followed by "-".
				// The matching of C against the element's language value is performed case-insensitively.
				// The identifier C does not have to be a valid language name."
				// http://www.w3.org/TR/selectors/#lang-pseudo
				"lang": markFunction(function (lang) {
					// lang value must be a valid identifier
					if (!ridentifier.test(lang || "")) {
						Sizzle.error("unsupported lang: " + lang);
					}
					lang = lang.replace(runescape, funescape).toLowerCase();
					return function (elem) {
						var elemLang;
						do {
							if (elemLang = documentIsHTML ? elem.lang : elem.getAttribute("xml:lang") || elem.getAttribute("lang")) {

								elemLang = elemLang.toLowerCase();
								return elemLang === lang || elemLang.indexOf(lang + "-") === 0;
							}
						} while ((elem = elem.parentNode) && elem.nodeType === 1);
						return false;
					};
				}),

				// Miscellaneous
				"target": function target(elem) {
					var hash = window.location && window.location.hash;
					return hash && hash.slice(1) === elem.id;
				},

				"root": function root(elem) {
					return elem === docElem;
				},

				"focus": function focus(elem) {
					return elem === document.activeElement && (!document.hasFocus || document.hasFocus()) && !!(elem.type || elem.href || ~elem.tabIndex);
				},

				// Boolean properties
				"enabled": function enabled(elem) {
					return elem.disabled === false;
				},

				"disabled": function disabled(elem) {
					return elem.disabled === true;
				},

				"checked": function checked(elem) {
					// In CSS3, :checked should return both checked and selected elements
					// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
					var nodeName = elem.nodeName.toLowerCase();
					return nodeName === "input" && !!elem.checked || nodeName === "option" && !!elem.selected;
				},

				"selected": function selected(elem) {
					// Accessing this property makes selected-by-default
					// options in Safari work properly
					if (elem.parentNode) {
						elem.parentNode.selectedIndex;
					}

					return elem.selected === true;
				},

				// Contents
				"empty": function empty(elem) {
					// http://www.w3.org/TR/selectors/#empty-pseudo
					// :empty is negated by element (1) or content nodes (text: 3; cdata: 4; entity ref: 5),
					//   but not by others (comment: 8; processing instruction: 7; etc.)
					// nodeType < 6 works because attributes (2) do not appear as children
					for (elem = elem.firstChild; elem; elem = elem.nextSibling) {
						if (elem.nodeType < 6) {
							return false;
						}
					}
					return true;
				},

				"parent": function parent(elem) {
					return !Expr.pseudos["empty"](elem);
				},

				// Element/input types
				"header": function header(elem) {
					return rheader.test(elem.nodeName);
				},

				"input": function input(elem) {
					return rinputs.test(elem.nodeName);
				},

				"button": function button(elem) {
					var name = elem.nodeName.toLowerCase();
					return name === "input" && elem.type === "button" || name === "button";
				},

				"text": function text(elem) {
					var attr;
					return elem.nodeName.toLowerCase() === "input" && elem.type === "text" && (

					// Support: IE<8
					// New HTML5 attribute values (e.g., "search") appear with elem.type === "text"
					(attr = elem.getAttribute("type")) == null || attr.toLowerCase() === "text");
				},

				// Position-in-collection
				"first": createPositionalPseudo(function () {
					return [0];
				}),

				"last": createPositionalPseudo(function (matchIndexes, length) {
					return [length - 1];
				}),

				"eq": createPositionalPseudo(function (matchIndexes, length, argument) {
					return [argument < 0 ? argument + length : argument];
				}),

				"even": createPositionalPseudo(function (matchIndexes, length) {
					var i = 0;
					for (; i < length; i += 2) {
						matchIndexes.push(i);
					}
					return matchIndexes;
				}),

				"odd": createPositionalPseudo(function (matchIndexes, length) {
					var i = 1;
					for (; i < length; i += 2) {
						matchIndexes.push(i);
					}
					return matchIndexes;
				}),

				"lt": createPositionalPseudo(function (matchIndexes, length, argument) {
					var i = argument < 0 ? argument + length : argument;
					for (; --i >= 0;) {
						matchIndexes.push(i);
					}
					return matchIndexes;
				}),

				"gt": createPositionalPseudo(function (matchIndexes, length, argument) {
					var i = argument < 0 ? argument + length : argument;
					for (; ++i < length;) {
						matchIndexes.push(i);
					}
					return matchIndexes;
				})
			}
		};

		Expr.pseudos["nth"] = Expr.pseudos["eq"];

		// Add button/input type pseudos
		for (i in { radio: true, checkbox: true, file: true, password: true, image: true }) {
			Expr.pseudos[i] = createInputPseudo(i);
		}
		for (i in { submit: true, reset: true }) {
			Expr.pseudos[i] = createButtonPseudo(i);
		}

		// Easy API for creating new setFilters
		function setFilters() {}
		setFilters.prototype = Expr.filters = Expr.pseudos;
		Expr.setFilters = new setFilters();

		tokenize = Sizzle.tokenize = function (selector, parseOnly) {
			var matched,
			    match,
			    tokens,
			    type,
			    soFar,
			    groups,
			    preFilters,
			    cached = tokenCache[selector + " "];

			if (cached) {
				return parseOnly ? 0 : cached.slice(0);
			}

			soFar = selector;
			groups = [];
			preFilters = Expr.preFilter;

			while (soFar) {

				// Comma and first run
				if (!matched || (match = rcomma.exec(soFar))) {
					if (match) {
						// Don't consume trailing commas as valid
						soFar = soFar.slice(match[0].length) || soFar;
					}
					groups.push(tokens = []);
				}

				matched = false;

				// Combinators
				if (match = rcombinators.exec(soFar)) {
					matched = match.shift();
					tokens.push({
						value: matched,
						// Cast descendant combinators to space
						type: match[0].replace(rtrim, " ")
					});
					soFar = soFar.slice(matched.length);
				}

				// Filters
				for (type in Expr.filter) {
					if ((match = matchExpr[type].exec(soFar)) && (!preFilters[type] || (match = preFilters[type](match)))) {
						matched = match.shift();
						tokens.push({
							value: matched,
							type: type,
							matches: match
						});
						soFar = soFar.slice(matched.length);
					}
				}

				if (!matched) {
					break;
				}
			}

			// Return the length of the invalid excess
			// if we're just parsing
			// Otherwise, throw an error or return tokens
			return parseOnly ? soFar.length : soFar ? Sizzle.error(selector) :
			// Cache the tokens
			tokenCache(selector, groups).slice(0);
		};

		function toSelector(tokens) {
			var i = 0,
			    len = tokens.length,
			    selector = "";
			for (; i < len; i++) {
				selector += tokens[i].value;
			}
			return selector;
		}

		function addCombinator(matcher, combinator, base) {
			var dir = combinator.dir,
			    checkNonElements = base && dir === "parentNode",
			    doneName = done++;

			return combinator.first ?
			// Check against closest ancestor/preceding element
			function (elem, context, xml) {
				while (elem = elem[dir]) {
					if (elem.nodeType === 1 || checkNonElements) {
						return matcher(elem, context, xml);
					}
				}
			} :

			// Check against all ancestor/preceding elements
			function (elem, context, xml) {
				var oldCache,
				    uniqueCache,
				    outerCache,
				    newCache = [dirruns, doneName];

				// We can't set arbitrary data on XML nodes, so they don't benefit from combinator caching
				if (xml) {
					while (elem = elem[dir]) {
						if (elem.nodeType === 1 || checkNonElements) {
							if (matcher(elem, context, xml)) {
								return true;
							}
						}
					}
				} else {
					while (elem = elem[dir]) {
						if (elem.nodeType === 1 || checkNonElements) {
							outerCache = elem[expando] || (elem[expando] = {});

							// Support: IE <9 only
							// Defend against cloned attroperties (jQuery gh-1709)
							uniqueCache = outerCache[elem.uniqueID] || (outerCache[elem.uniqueID] = {});

							if ((oldCache = uniqueCache[dir]) && oldCache[0] === dirruns && oldCache[1] === doneName) {

								// Assign to newCache so results back-propagate to previous elements
								return newCache[2] = oldCache[2];
							} else {
								// Reuse newcache so results back-propagate to previous elements
								uniqueCache[dir] = newCache;

								// A match means we're done; a fail means we have to keep checking
								if (newCache[2] = matcher(elem, context, xml)) {
									return true;
								}
							}
						}
					}
				}
			};
		}

		function elementMatcher(matchers) {
			return matchers.length > 1 ? function (elem, context, xml) {
				var i = matchers.length;
				while (i--) {
					if (!matchers[i](elem, context, xml)) {
						return false;
					}
				}
				return true;
			} : matchers[0];
		}

		function multipleContexts(selector, contexts, results) {
			var i = 0,
			    len = contexts.length;
			for (; i < len; i++) {
				Sizzle(selector, contexts[i], results);
			}
			return results;
		}

		function condense(unmatched, map, filter, context, xml) {
			var elem,
			    newUnmatched = [],
			    i = 0,
			    len = unmatched.length,
			    mapped = map != null;

			for (; i < len; i++) {
				if (elem = unmatched[i]) {
					if (!filter || filter(elem, context, xml)) {
						newUnmatched.push(elem);
						if (mapped) {
							map.push(i);
						}
					}
				}
			}

			return newUnmatched;
		}

		function setMatcher(preFilter, selector, matcher, postFilter, postFinder, postSelector) {
			if (postFilter && !postFilter[expando]) {
				postFilter = setMatcher(postFilter);
			}
			if (postFinder && !postFinder[expando]) {
				postFinder = setMatcher(postFinder, postSelector);
			}
			return markFunction(function (seed, results, context, xml) {
				var temp,
				    i,
				    elem,
				    preMap = [],
				    postMap = [],
				    preexisting = results.length,


				// Get initial elements from seed or context
				elems = seed || multipleContexts(selector || "*", context.nodeType ? [context] : context, []),


				// Prefilter to get matcher input, preserving a map for seed-results synchronization
				matcherIn = preFilter && (seed || !selector) ? condense(elems, preMap, preFilter, context, xml) : elems,
				    matcherOut = matcher ?
				// If we have a postFinder, or filtered seed, or non-seed postFilter or preexisting results,
				postFinder || (seed ? preFilter : preexisting || postFilter) ?

				// ...intermediate processing is necessary
				[] :

				// ...otherwise use results directly
				results : matcherIn;

				// Find primary matches
				if (matcher) {
					matcher(matcherIn, matcherOut, context, xml);
				}

				// Apply postFilter
				if (postFilter) {
					temp = condense(matcherOut, postMap);
					postFilter(temp, [], context, xml);

					// Un-match failing elements by moving them back to matcherIn
					i = temp.length;
					while (i--) {
						if (elem = temp[i]) {
							matcherOut[postMap[i]] = !(matcherIn[postMap[i]] = elem);
						}
					}
				}

				if (seed) {
					if (postFinder || preFilter) {
						if (postFinder) {
							// Get the final matcherOut by condensing this intermediate into postFinder contexts
							temp = [];
							i = matcherOut.length;
							while (i--) {
								if (elem = matcherOut[i]) {
									// Restore matcherIn since elem is not yet a final match
									temp.push(matcherIn[i] = elem);
								}
							}
							postFinder(null, matcherOut = [], temp, xml);
						}

						// Move matched elements from seed to results to keep them synchronized
						i = matcherOut.length;
						while (i--) {
							if ((elem = matcherOut[i]) && (temp = postFinder ? indexOf(seed, elem) : preMap[i]) > -1) {

								seed[temp] = !(results[temp] = elem);
							}
						}
					}

					// Add elements to results, through postFinder if defined
				} else {
					matcherOut = condense(matcherOut === results ? matcherOut.splice(preexisting, matcherOut.length) : matcherOut);
					if (postFinder) {
						postFinder(null, results, matcherOut, xml);
					} else {
						push.apply(results, matcherOut);
					}
				}
			});
		}

		function matcherFromTokens(tokens) {
			var checkContext,
			    matcher,
			    j,
			    len = tokens.length,
			    leadingRelative = Expr.relative[tokens[0].type],
			    implicitRelative = leadingRelative || Expr.relative[" "],
			    i = leadingRelative ? 1 : 0,


			// The foundational matcher ensures that elements are reachable from top-level context(s)
			matchContext = addCombinator(function (elem) {
				return elem === checkContext;
			}, implicitRelative, true),
			    matchAnyContext = addCombinator(function (elem) {
				return indexOf(checkContext, elem) > -1;
			}, implicitRelative, true),
			    matchers = [function (elem, context, xml) {
				var ret = !leadingRelative && (xml || context !== outermostContext) || ((checkContext = context).nodeType ? matchContext(elem, context, xml) : matchAnyContext(elem, context, xml));
				// Avoid hanging onto element (issue #299)
				checkContext = null;
				return ret;
			}];

			for (; i < len; i++) {
				if (matcher = Expr.relative[tokens[i].type]) {
					matchers = [addCombinator(elementMatcher(matchers), matcher)];
				} else {
					matcher = Expr.filter[tokens[i].type].apply(null, tokens[i].matches);

					// Return special upon seeing a positional matcher
					if (matcher[expando]) {
						// Find the next relative operator (if any) for proper handling
						j = ++i;
						for (; j < len; j++) {
							if (Expr.relative[tokens[j].type]) {
								break;
							}
						}
						return setMatcher(i > 1 && elementMatcher(matchers), i > 1 && toSelector(
						// If the preceding token was a descendant combinator, insert an implicit any-element `*`
						tokens.slice(0, i - 1).concat({ value: tokens[i - 2].type === " " ? "*" : "" })).replace(rtrim, "$1"), matcher, i < j && matcherFromTokens(tokens.slice(i, j)), j < len && matcherFromTokens(tokens = tokens.slice(j)), j < len && toSelector(tokens));
					}
					matchers.push(matcher);
				}
			}

			return elementMatcher(matchers);
		}

		function matcherFromGroupMatchers(elementMatchers, setMatchers) {
			var bySet = setMatchers.length > 0,
			    byElement = elementMatchers.length > 0,
			    superMatcher = function superMatcher(seed, context, xml, results, outermost) {
				var elem,
				    j,
				    matcher,
				    matchedCount = 0,
				    i = "0",
				    unmatched = seed && [],
				    setMatched = [],
				    contextBackup = outermostContext,

				// We must always have either seed elements or outermost context
				elems = seed || byElement && Expr.find["TAG"]("*", outermost),

				// Use integer dirruns iff this is the outermost matcher
				dirrunsUnique = dirruns += contextBackup == null ? 1 : Math.random() || 0.1,
				    len = elems.length;

				if (outermost) {
					outermostContext = context === document || context || outermost;
				}

				// Add elements passing elementMatchers directly to results
				// Support: IE<9, Safari
				// Tolerate NodeList properties (IE: "length"; Safari: <number>) matching elements by id
				for (; i !== len && (elem = elems[i]) != null; i++) {
					if (byElement && elem) {
						j = 0;
						if (!context && elem.ownerDocument !== document) {
							setDocument(elem);
							xml = !documentIsHTML;
						}
						while (matcher = elementMatchers[j++]) {
							if (matcher(elem, context || document, xml)) {
								results.push(elem);
								break;
							}
						}
						if (outermost) {
							dirruns = dirrunsUnique;
						}
					}

					// Track unmatched elements for set filters
					if (bySet) {
						// They will have gone through all possible matchers
						if (elem = !matcher && elem) {
							matchedCount--;
						}

						// Lengthen the array for every element, matched or not
						if (seed) {
							unmatched.push(elem);
						}
					}
				}

				// `i` is now the count of elements visited above, and adding it to `matchedCount`
				// makes the latter nonnegative.
				matchedCount += i;

				// Apply set filters to unmatched elements
				// NOTE: This can be skipped if there are no unmatched elements (i.e., `matchedCount`
				// equals `i`), unless we didn't visit _any_ elements in the above loop because we have
				// no element matchers and no seed.
				// Incrementing an initially-string "0" `i` allows `i` to remain a string only in that
				// case, which will result in a "00" `matchedCount` that differs from `i` but is also
				// numerically zero.
				if (bySet && i !== matchedCount) {
					j = 0;
					while (matcher = setMatchers[j++]) {
						matcher(unmatched, setMatched, context, xml);
					}

					if (seed) {
						// Reintegrate element matches to eliminate the need for sorting
						if (matchedCount > 0) {
							while (i--) {
								if (!(unmatched[i] || setMatched[i])) {
									setMatched[i] = pop.call(results);
								}
							}
						}

						// Discard index placeholder values to get only actual matches
						setMatched = condense(setMatched);
					}

					// Add matches to results
					push.apply(results, setMatched);

					// Seedless set matches succeeding multiple successful matchers stipulate sorting
					if (outermost && !seed && setMatched.length > 0 && matchedCount + setMatchers.length > 1) {

						Sizzle.uniqueSort(results);
					}
				}

				// Override manipulation of globals by nested matchers
				if (outermost) {
					dirruns = dirrunsUnique;
					outermostContext = contextBackup;
				}

				return unmatched;
			};

			return bySet ? markFunction(superMatcher) : superMatcher;
		}

		compile = Sizzle.compile = function (selector, match /* Internal Use Only */) {
			var i,
			    setMatchers = [],
			    elementMatchers = [],
			    cached = compilerCache[selector + " "];

			if (!cached) {
				// Generate a function of recursive functions that can be used to check each element
				if (!match) {
					match = tokenize(selector);
				}
				i = match.length;
				while (i--) {
					cached = matcherFromTokens(match[i]);
					if (cached[expando]) {
						setMatchers.push(cached);
					} else {
						elementMatchers.push(cached);
					}
				}

				// Cache the compiled function
				cached = compilerCache(selector, matcherFromGroupMatchers(elementMatchers, setMatchers));

				// Save selector and tokenization
				cached.selector = selector;
			}
			return cached;
		};

		/**
   * A low-level selection function that works with Sizzle's compiled
   *  selector functions
   * @param {String|Function} selector A selector or a pre-compiled
   *  selector function built with Sizzle.compile
   * @param {Element} context
   * @param {Array} [results]
   * @param {Array} [seed] A set of elements to match against
   */
		select = Sizzle.select = function (selector, context, results, seed) {
			var i,
			    tokens,
			    token,
			    type,
			    find,
			    compiled = typeof selector === "function" && selector,
			    match = !seed && tokenize(selector = compiled.selector || selector);

			results = results || [];

			// Try to minimize operations if there is only one selector in the list and no seed
			// (the latter of which guarantees us context)
			if (match.length === 1) {

				// Reduce context if the leading compound selector is an ID
				tokens = match[0] = match[0].slice(0);
				if (tokens.length > 2 && (token = tokens[0]).type === "ID" && support.getById && context.nodeType === 9 && documentIsHTML && Expr.relative[tokens[1].type]) {

					context = (Expr.find["ID"](token.matches[0].replace(runescape, funescape), context) || [])[0];
					if (!context) {
						return results;

						// Precompiled matchers will still verify ancestry, so step up a level
					} else if (compiled) {
						context = context.parentNode;
					}

					selector = selector.slice(tokens.shift().value.length);
				}

				// Fetch a seed set for right-to-left matching
				i = matchExpr["needsContext"].test(selector) ? 0 : tokens.length;
				while (i--) {
					token = tokens[i];

					// Abort if we hit a combinator
					if (Expr.relative[type = token.type]) {
						break;
					}
					if (find = Expr.find[type]) {
						// Search, expanding context for leading sibling combinators
						if (seed = find(token.matches[0].replace(runescape, funescape), rsibling.test(tokens[0].type) && testContext(context.parentNode) || context)) {

							// If seed is empty or no tokens remain, we can return early
							tokens.splice(i, 1);
							selector = seed.length && toSelector(tokens);
							if (!selector) {
								push.apply(results, seed);
								return results;
							}

							break;
						}
					}
				}
			}

			// Compile and execute a filtering function if one is not provided
			// Provide `match` to avoid retokenization if we modified the selector above
			(compiled || compile(selector, match))(seed, context, !documentIsHTML, results, !context || rsibling.test(selector) && testContext(context.parentNode) || context);
			return results;
		};

		// One-time assignments

		// Sort stability
		support.sortStable = expando.split("").sort(sortOrder).join("") === expando;

		// Support: Chrome 14-35+
		// Always assume duplicates if they aren't passed to the comparison function
		support.detectDuplicates = !!hasDuplicate;

		// Initialize against the default document
		setDocument();

		// Support: Webkit<537.32 - Safari 6.0.3/Chrome 25 (fixed in Chrome 27)
		// Detached nodes confoundingly follow *each other*
		support.sortDetached = assert(function (div1) {
			// Should return 1, but returns 4 (following)
			return div1.compareDocumentPosition(document.createElement("div")) & 1;
		});

		// Support: IE<8
		// Prevent attribute/property "interpolation"
		// http://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
		if (!assert(function (div) {
			div.innerHTML = "<a href='#'></a>";
			return div.firstChild.getAttribute("href") === "#";
		})) {
			addHandle("type|href|height|width", function (elem, name, isXML) {
				if (!isXML) {
					return elem.getAttribute(name, name.toLowerCase() === "type" ? 1 : 2);
				}
			});
		}

		// Support: IE<9
		// Use defaultValue in place of getAttribute("value")
		if (!support.attributes || !assert(function (div) {
			div.innerHTML = "<input/>";
			div.firstChild.setAttribute("value", "");
			return div.firstChild.getAttribute("value") === "";
		})) {
			addHandle("value", function (elem, name, isXML) {
				if (!isXML && elem.nodeName.toLowerCase() === "input") {
					return elem.defaultValue;
				}
			});
		}

		// Support: IE<9
		// Use getAttributeNode to fetch booleans when getAttribute lies
		if (!assert(function (div) {
			return div.getAttribute("disabled") == null;
		})) {
			addHandle(booleans, function (elem, name, isXML) {
				var val;
				if (!isXML) {
					return elem[name] === true ? name.toLowerCase() : (val = elem.getAttributeNode(name)) && val.specified ? val.value : null;
				}
			});
		}

		return Sizzle;
	}(window);

	jQuery.find = Sizzle;
	jQuery.expr = Sizzle.selectors;
	jQuery.expr[":"] = jQuery.expr.pseudos;
	jQuery.uniqueSort = jQuery.unique = Sizzle.uniqueSort;
	jQuery.text = Sizzle.getText;
	jQuery.isXMLDoc = Sizzle.isXML;
	jQuery.contains = Sizzle.contains;

	var dir = function dir(elem, _dir, until) {
		var matched = [],
		    truncate = until !== undefined;

		while ((elem = elem[_dir]) && elem.nodeType !== 9) {
			if (elem.nodeType === 1) {
				if (truncate && jQuery(elem).is(until)) {
					break;
				}
				matched.push(elem);
			}
		}
		return matched;
	};

	var _siblings = function _siblings(n, elem) {
		var matched = [];

		for (; n; n = n.nextSibling) {
			if (n.nodeType === 1 && n !== elem) {
				matched.push(n);
			}
		}

		return matched;
	};

	var rneedsContext = jQuery.expr.match.needsContext;

	var rsingleTag = /^<([\w-]+)\s*\/?>(?:<\/\1>|)$/;

	var risSimple = /^.[^:#\[\.,]*$/;

	// Implement the identical functionality for filter and not
	function winnow(elements, qualifier, not) {
		if (jQuery.isFunction(qualifier)) {
			return jQuery.grep(elements, function (elem, i) {
				/* jshint -W018 */
				return !!qualifier.call(elem, i, elem) !== not;
			});
		}

		if (qualifier.nodeType) {
			return jQuery.grep(elements, function (elem) {
				return elem === qualifier !== not;
			});
		}

		if (typeof qualifier === "string") {
			if (risSimple.test(qualifier)) {
				return jQuery.filter(qualifier, elements, not);
			}

			qualifier = jQuery.filter(qualifier, elements);
		}

		return jQuery.grep(elements, function (elem) {
			return indexOf.call(qualifier, elem) > -1 !== not;
		});
	}

	jQuery.filter = function (expr, elems, not) {
		var elem = elems[0];

		if (not) {
			expr = ":not(" + expr + ")";
		}

		return elems.length === 1 && elem.nodeType === 1 ? jQuery.find.matchesSelector(elem, expr) ? [elem] : [] : jQuery.find.matches(expr, jQuery.grep(elems, function (elem) {
			return elem.nodeType === 1;
		}));
	};

	jQuery.fn.extend({
		find: function find(selector) {
			var i,
			    len = this.length,
			    ret = [],
			    self = this;

			if (typeof selector !== "string") {
				return this.pushStack(jQuery(selector).filter(function () {
					for (i = 0; i < len; i++) {
						if (jQuery.contains(self[i], this)) {
							return true;
						}
					}
				}));
			}

			for (i = 0; i < len; i++) {
				jQuery.find(selector, self[i], ret);
			}

			// Needed because $( selector, context ) becomes $( context ).find( selector )
			ret = this.pushStack(len > 1 ? jQuery.unique(ret) : ret);
			ret.selector = this.selector ? this.selector + " " + selector : selector;
			return ret;
		},
		filter: function filter(selector) {
			return this.pushStack(winnow(this, selector || [], false));
		},
		not: function not(selector) {
			return this.pushStack(winnow(this, selector || [], true));
		},
		is: function is(selector) {
			return !!winnow(this,

			// If this is a positional/relative selector, check membership in the returned set
			// so $("p:first").is("p:last") won't return true for a doc with two "p".
			typeof selector === "string" && rneedsContext.test(selector) ? jQuery(selector) : selector || [], false).length;
		}
	});

	// Initialize a jQuery object


	// A central reference to the root jQuery(document)
	var rootjQuery,


	// A simple way to check for HTML strings
	// Prioritize #id over <tag> to avoid XSS via location.hash (#9521)
	// Strict HTML recognition (#11290: must start with <)
	rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,
	    init = jQuery.fn.init = function (selector, context, root) {
		var match, elem;

		// HANDLE: $(""), $(null), $(undefined), $(false)
		if (!selector) {
			return this;
		}

		// Method init() accepts an alternate rootjQuery
		// so migrate can support jQuery.sub (gh-2101)
		root = root || rootjQuery;

		// Handle HTML strings
		if (typeof selector === "string") {
			if (selector[0] === "<" && selector[selector.length - 1] === ">" && selector.length >= 3) {

				// Assume that strings that start and end with <> are HTML and skip the regex check
				match = [null, selector, null];
			} else {
				match = rquickExpr.exec(selector);
			}

			// Match html or make sure no context is specified for #id
			if (match && (match[1] || !context)) {

				// HANDLE: $(html) -> $(array)
				if (match[1]) {
					context = context instanceof jQuery ? context[0] : context;

					// Option to run scripts is true for back-compat
					// Intentionally let the error be thrown if parseHTML is not present
					jQuery.merge(this, jQuery.parseHTML(match[1], context && context.nodeType ? context.ownerDocument || context : document, true));

					// HANDLE: $(html, props)
					if (rsingleTag.test(match[1]) && jQuery.isPlainObject(context)) {
						for (match in context) {

							// Properties of context are called as methods if possible
							if (jQuery.isFunction(this[match])) {
								this[match](context[match]);

								// ...and otherwise set as attributes
							} else {
								this.attr(match, context[match]);
							}
						}
					}

					return this;

					// HANDLE: $(#id)
				} else {
					elem = document.getElementById(match[2]);

					// Support: Blackberry 4.6
					// gEBID returns nodes no longer in the document (#6963)
					if (elem && elem.parentNode) {

						// Inject the element directly into the jQuery object
						this.length = 1;
						this[0] = elem;
					}

					this.context = document;
					this.selector = selector;
					return this;
				}

				// HANDLE: $(expr, $(...))
			} else if (!context || context.jquery) {
				return (context || root).find(selector);

				// HANDLE: $(expr, context)
				// (which is just equivalent to: $(context).find(expr)
			} else {
				return this.constructor(context).find(selector);
			}

			// HANDLE: $(DOMElement)
		} else if (selector.nodeType) {
			this.context = this[0] = selector;
			this.length = 1;
			return this;

			// HANDLE: $(function)
			// Shortcut for document ready
		} else if (jQuery.isFunction(selector)) {
			return root.ready !== undefined ? root.ready(selector) :

			// Execute immediately if ready is not present
			selector(jQuery);
		}

		if (selector.selector !== undefined) {
			this.selector = selector.selector;
			this.context = selector.context;
		}

		return jQuery.makeArray(selector, this);
	};

	// Give the init function the jQuery prototype for later instantiation
	init.prototype = jQuery.fn;

	// Initialize central reference
	rootjQuery = jQuery(document);

	var rparentsprev = /^(?:parents|prev(?:Until|All))/,


	// Methods guaranteed to produce a unique set when starting from a unique set
	guaranteedUnique = {
		children: true,
		contents: true,
		next: true,
		prev: true
	};

	jQuery.fn.extend({
		has: function has(target) {
			var targets = jQuery(target, this),
			    l = targets.length;

			return this.filter(function () {
				var i = 0;
				for (; i < l; i++) {
					if (jQuery.contains(this, targets[i])) {
						return true;
					}
				}
			});
		},

		closest: function closest(selectors, context) {
			var cur,
			    i = 0,
			    l = this.length,
			    matched = [],
			    pos = rneedsContext.test(selectors) || typeof selectors !== "string" ? jQuery(selectors, context || this.context) : 0;

			for (; i < l; i++) {
				for (cur = this[i]; cur && cur !== context; cur = cur.parentNode) {

					// Always skip document fragments
					if (cur.nodeType < 11 && (pos ? pos.index(cur) > -1 :

					// Don't pass non-elements to Sizzle
					cur.nodeType === 1 && jQuery.find.matchesSelector(cur, selectors))) {

						matched.push(cur);
						break;
					}
				}
			}

			return this.pushStack(matched.length > 1 ? jQuery.uniqueSort(matched) : matched);
		},

		// Determine the position of an element within the set
		index: function index(elem) {

			// No argument, return index in parent
			if (!elem) {
				return this[0] && this[0].parentNode ? this.first().prevAll().length : -1;
			}

			// Index in selector
			if (typeof elem === "string") {
				return indexOf.call(jQuery(elem), this[0]);
			}

			// Locate the position of the desired element
			return indexOf.call(this,

			// If it receives a jQuery object, the first element is used
			elem.jquery ? elem[0] : elem);
		},

		add: function add(selector, context) {
			return this.pushStack(jQuery.uniqueSort(jQuery.merge(this.get(), jQuery(selector, context))));
		},

		addBack: function addBack(selector) {
			return this.add(selector == null ? this.prevObject : this.prevObject.filter(selector));
		}
	});

	function sibling(cur, dir) {
		while ((cur = cur[dir]) && cur.nodeType !== 1) {}
		return cur;
	}

	jQuery.each({
		parent: function parent(elem) {
			var parent = elem.parentNode;
			return parent && parent.nodeType !== 11 ? parent : null;
		},
		parents: function parents(elem) {
			return dir(elem, "parentNode");
		},
		parentsUntil: function parentsUntil(elem, i, until) {
			return dir(elem, "parentNode", until);
		},
		next: function next(elem) {
			return sibling(elem, "nextSibling");
		},
		prev: function prev(elem) {
			return sibling(elem, "previousSibling");
		},
		nextAll: function nextAll(elem) {
			return dir(elem, "nextSibling");
		},
		prevAll: function prevAll(elem) {
			return dir(elem, "previousSibling");
		},
		nextUntil: function nextUntil(elem, i, until) {
			return dir(elem, "nextSibling", until);
		},
		prevUntil: function prevUntil(elem, i, until) {
			return dir(elem, "previousSibling", until);
		},
		siblings: function siblings(elem) {
			return _siblings((elem.parentNode || {}).firstChild, elem);
		},
		children: function children(elem) {
			return _siblings(elem.firstChild);
		},
		contents: function contents(elem) {
			return elem.contentDocument || jQuery.merge([], elem.childNodes);
		}
	}, function (name, fn) {
		jQuery.fn[name] = function (until, selector) {
			var matched = jQuery.map(this, fn, until);

			if (name.slice(-5) !== "Until") {
				selector = until;
			}

			if (selector && typeof selector === "string") {
				matched = jQuery.filter(selector, matched);
			}

			if (this.length > 1) {

				// Remove duplicates
				if (!guaranteedUnique[name]) {
					jQuery.uniqueSort(matched);
				}

				// Reverse order for parents* and prev-derivatives
				if (rparentsprev.test(name)) {
					matched.reverse();
				}
			}

			return this.pushStack(matched);
		};
	});
	var rnotwhite = /\S+/g;

	// Convert String-formatted options into Object-formatted ones
	function createOptions(options) {
		var object = {};
		jQuery.each(options.match(rnotwhite) || [], function (_, flag) {
			object[flag] = true;
		});
		return object;
	}

	/*
  * Create a callback list using the following parameters:
  *
  *	options: an optional list of space-separated options that will change how
  *			the callback list behaves or a more traditional option object
  *
  * By default a callback list will act like an event callback list and can be
  * "fired" multiple times.
  *
  * Possible options:
  *
  *	once:			will ensure the callback list can only be fired once (like a Deferred)
  *
  *	memory:			will keep track of previous values and will call any callback added
  *					after the list has been fired right away with the latest "memorized"
  *					values (like a Deferred)
  *
  *	unique:			will ensure a callback can only be added once (no duplicate in the list)
  *
  *	stopOnFalse:	interrupt callings when a callback returns false
  *
  */
	jQuery.Callbacks = function (options) {

		// Convert options from String-formatted to Object-formatted if needed
		// (we check in cache first)
		options = typeof options === "string" ? createOptions(options) : jQuery.extend({}, options);

		var // Flag to know if list is currently firing
		firing,


		// Last fire value for non-forgettable lists
		memory,


		// Flag to know if list was already fired
		_fired,


		// Flag to prevent firing
		_locked,


		// Actual callback list
		list = [],


		// Queue of execution data for repeatable lists
		queue = [],


		// Index of currently firing callback (modified by add/remove as needed)
		firingIndex = -1,


		// Fire callbacks
		fire = function fire() {

			// Enforce single-firing
			_locked = options.once;

			// Execute callbacks for all pending executions,
			// respecting firingIndex overrides and runtime changes
			_fired = firing = true;
			for (; queue.length; firingIndex = -1) {
				memory = queue.shift();
				while (++firingIndex < list.length) {

					// Run callback and check for early termination
					if (list[firingIndex].apply(memory[0], memory[1]) === false && options.stopOnFalse) {

						// Jump to end and forget the data so .add doesn't re-fire
						firingIndex = list.length;
						memory = false;
					}
				}
			}

			// Forget the data if we're done with it
			if (!options.memory) {
				memory = false;
			}

			firing = false;

			// Clean up if we're done firing for good
			if (_locked) {

				// Keep an empty list if we have data for future add calls
				if (memory) {
					list = [];

					// Otherwise, this object is spent
				} else {
					list = "";
				}
			}
		},


		// Actual Callbacks object
		self = {

			// Add a callback or a collection of callbacks to the list
			add: function add() {
				if (list) {

					// If we have memory from a past run, we should fire after adding
					if (memory && !firing) {
						firingIndex = list.length - 1;
						queue.push(memory);
					}

					(function add(args) {
						jQuery.each(args, function (_, arg) {
							if (jQuery.isFunction(arg)) {
								if (!options.unique || !self.has(arg)) {
									list.push(arg);
								}
							} else if (arg && arg.length && jQuery.type(arg) !== "string") {

								// Inspect recursively
								add(arg);
							}
						});
					})(arguments);

					if (memory && !firing) {
						fire();
					}
				}
				return this;
			},

			// Remove a callback from the list
			remove: function remove() {
				jQuery.each(arguments, function (_, arg) {
					var index;
					while ((index = jQuery.inArray(arg, list, index)) > -1) {
						list.splice(index, 1);

						// Handle firing indexes
						if (index <= firingIndex) {
							firingIndex--;
						}
					}
				});
				return this;
			},

			// Check if a given callback is in the list.
			// If no argument is given, return whether or not list has callbacks attached.
			has: function has(fn) {
				return fn ? jQuery.inArray(fn, list) > -1 : list.length > 0;
			},

			// Remove all callbacks from the list
			empty: function empty() {
				if (list) {
					list = [];
				}
				return this;
			},

			// Disable .fire and .add
			// Abort any current/pending executions
			// Clear all callbacks and values
			disable: function disable() {
				_locked = queue = [];
				list = memory = "";
				return this;
			},
			disabled: function disabled() {
				return !list;
			},

			// Disable .fire
			// Also disable .add unless we have memory (since it would have no effect)
			// Abort any pending executions
			lock: function lock() {
				_locked = queue = [];
				if (!memory) {
					list = memory = "";
				}
				return this;
			},
			locked: function locked() {
				return !!_locked;
			},

			// Call all callbacks with the given context and arguments
			fireWith: function fireWith(context, args) {
				if (!_locked) {
					args = args || [];
					args = [context, args.slice ? args.slice() : args];
					queue.push(args);
					if (!firing) {
						fire();
					}
				}
				return this;
			},

			// Call all the callbacks with the given arguments
			fire: function fire() {
				self.fireWith(this, arguments);
				return this;
			},

			// To know if the callbacks have already been called at least once
			fired: function fired() {
				return !!_fired;
			}
		};

		return self;
	};

	jQuery.extend({

		Deferred: function Deferred(func) {
			var tuples = [

			// action, add listener, listener list, final state
			["resolve", "done", jQuery.Callbacks("once memory"), "resolved"], ["reject", "fail", jQuery.Callbacks("once memory"), "rejected"], ["notify", "progress", jQuery.Callbacks("memory")]],
			    _state = "pending",
			    _promise = {
				state: function state() {
					return _state;
				},
				always: function always() {
					deferred.done(arguments).fail(arguments);
					return this;
				},
				then: function then() /* fnDone, fnFail, fnProgress */{
					var fns = arguments;
					return jQuery.Deferred(function (newDefer) {
						jQuery.each(tuples, function (i, tuple) {
							var fn = jQuery.isFunction(fns[i]) && fns[i];

							// deferred[ done | fail | progress ] for forwarding actions to newDefer
							deferred[tuple[1]](function () {
								var returned = fn && fn.apply(this, arguments);
								if (returned && jQuery.isFunction(returned.promise)) {
									returned.promise().progress(newDefer.notify).done(newDefer.resolve).fail(newDefer.reject);
								} else {
									newDefer[tuple[0] + "With"](this === _promise ? newDefer.promise() : this, fn ? [returned] : arguments);
								}
							});
						});
						fns = null;
					}).promise();
				},

				// Get a promise for this deferred
				// If obj is provided, the promise aspect is added to the object
				promise: function promise(obj) {
					return obj != null ? jQuery.extend(obj, _promise) : _promise;
				}
			},
			    deferred = {};

			// Keep pipe for back-compat
			_promise.pipe = _promise.then;

			// Add list-specific methods
			jQuery.each(tuples, function (i, tuple) {
				var list = tuple[2],
				    stateString = tuple[3];

				// promise[ done | fail | progress ] = list.add
				_promise[tuple[1]] = list.add;

				// Handle state
				if (stateString) {
					list.add(function () {

						// state = [ resolved | rejected ]
						_state = stateString;

						// [ reject_list | resolve_list ].disable; progress_list.lock
					}, tuples[i ^ 1][2].disable, tuples[2][2].lock);
				}

				// deferred[ resolve | reject | notify ]
				deferred[tuple[0]] = function () {
					deferred[tuple[0] + "With"](this === deferred ? _promise : this, arguments);
					return this;
				};
				deferred[tuple[0] + "With"] = list.fireWith;
			});

			// Make the deferred a promise
			_promise.promise(deferred);

			// Call given func if any
			if (func) {
				func.call(deferred, deferred);
			}

			// All done!
			return deferred;
		},

		// Deferred helper
		when: function when(subordinate /* , ..., subordinateN */) {
			var i = 0,
			    resolveValues = _slice.call(arguments),
			    length = resolveValues.length,


			// the count of uncompleted subordinates
			remaining = length !== 1 || subordinate && jQuery.isFunction(subordinate.promise) ? length : 0,


			// the master Deferred.
			// If resolveValues consist of only a single Deferred, just use that.
			deferred = remaining === 1 ? subordinate : jQuery.Deferred(),


			// Update function for both resolve and progress values
			updateFunc = function updateFunc(i, contexts, values) {
				return function (value) {
					contexts[i] = this;
					values[i] = arguments.length > 1 ? _slice.call(arguments) : value;
					if (values === progressValues) {
						deferred.notifyWith(contexts, values);
					} else if (! --remaining) {
						deferred.resolveWith(contexts, values);
					}
				};
			},
			    progressValues,
			    progressContexts,
			    resolveContexts;

			// Add listeners to Deferred subordinates; treat others as resolved
			if (length > 1) {
				progressValues = new Array(length);
				progressContexts = new Array(length);
				resolveContexts = new Array(length);
				for (; i < length; i++) {
					if (resolveValues[i] && jQuery.isFunction(resolveValues[i].promise)) {
						resolveValues[i].promise().progress(updateFunc(i, progressContexts, progressValues)).done(updateFunc(i, resolveContexts, resolveValues)).fail(deferred.reject);
					} else {
						--remaining;
					}
				}
			}

			// If we're not waiting on anything, resolve the master
			if (!remaining) {
				deferred.resolveWith(resolveContexts, resolveValues);
			}

			return deferred.promise();
		}
	});

	// The deferred used on DOM ready
	var readyList;

	jQuery.fn.ready = function (fn) {

		// Add the callback
		jQuery.ready.promise().done(fn);

		return this;
	};

	jQuery.extend({

		// Is the DOM ready to be used? Set to true once it occurs.
		isReady: false,

		// A counter to track how many items to wait for before
		// the ready event fires. See #6781
		readyWait: 1,

		// Hold (or release) the ready event
		holdReady: function holdReady(hold) {
			if (hold) {
				jQuery.readyWait++;
			} else {
				jQuery.ready(true);
			}
		},

		// Handle when the DOM is ready
		ready: function ready(wait) {

			// Abort if there are pending holds or we're already ready
			if (wait === true ? --jQuery.readyWait : jQuery.isReady) {
				return;
			}

			// Remember that the DOM is ready
			jQuery.isReady = true;

			// If a normal DOM Ready event fired, decrement, and wait if need be
			if (wait !== true && --jQuery.readyWait > 0) {
				return;
			}

			// If there are functions bound, to execute
			readyList.resolveWith(document, [jQuery]);

			// Trigger any bound ready events
			if (jQuery.fn.triggerHandler) {
				jQuery(document).triggerHandler("ready");
				jQuery(document).off("ready");
			}
		}
	});

	/**
  * The ready event handler and self cleanup method
  */
	function completed() {
		document.removeEventListener("DOMContentLoaded", completed);
		window.removeEventListener("load", completed);
		jQuery.ready();
	}

	jQuery.ready.promise = function (obj) {
		if (!readyList) {

			readyList = jQuery.Deferred();

			// Catch cases where $(document).ready() is called
			// after the browser event has already occurred.
			// Support: IE9-10 only
			// Older IE sometimes signals "interactive" too soon
			if (document.readyState === "complete" || document.readyState !== "loading" && !document.documentElement.doScroll) {

				// Handle it asynchronously to allow scripts the opportunity to delay ready
				window.setTimeout(jQuery.ready);
			} else {

				// Use the handy event callback
				document.addEventListener("DOMContentLoaded", completed);

				// A fallback to window.onload, that will always work
				window.addEventListener("load", completed);
			}
		}
		return readyList.promise(obj);
	};

	// Kick off the DOM ready check even if the user does not
	jQuery.ready.promise();

	// Multifunctional method to get and set values of a collection
	// The value/s can optionally be executed if it's a function
	var access = function access(elems, fn, key, value, chainable, emptyGet, raw) {
		var i = 0,
		    len = elems.length,
		    bulk = key == null;

		// Sets many values
		if (jQuery.type(key) === "object") {
			chainable = true;
			for (i in key) {
				access(elems, fn, i, key[i], true, emptyGet, raw);
			}

			// Sets one value
		} else if (value !== undefined) {
			chainable = true;

			if (!jQuery.isFunction(value)) {
				raw = true;
			}

			if (bulk) {

				// Bulk operations run against the entire set
				if (raw) {
					fn.call(elems, value);
					fn = null;

					// ...except when executing function values
				} else {
					bulk = fn;
					fn = function fn(elem, key, value) {
						return bulk.call(jQuery(elem), value);
					};
				}
			}

			if (fn) {
				for (; i < len; i++) {
					fn(elems[i], key, raw ? value : value.call(elems[i], i, fn(elems[i], key)));
				}
			}
		}

		return chainable ? elems :

		// Gets
		bulk ? fn.call(elems) : len ? fn(elems[0], key) : emptyGet;
	};
	var acceptData = function acceptData(owner) {

		// Accepts only:
		//  - Node
		//    - Node.ELEMENT_NODE
		//    - Node.DOCUMENT_NODE
		//  - Object
		//    - Any
		/* jshint -W018 */
		return owner.nodeType === 1 || owner.nodeType === 9 || !+owner.nodeType;
	};

	function Data() {
		this.expando = jQuery.expando + Data.uid++;
	}

	Data.uid = 1;

	Data.prototype = {

		register: function register(owner, initial) {
			var value = initial || {};

			// If it is a node unlikely to be stringify-ed or looped over
			// use plain assignment
			if (owner.nodeType) {
				owner[this.expando] = value;

				// Otherwise secure it in a non-enumerable, non-writable property
				// configurability must be true to allow the property to be
				// deleted with the delete operator
			} else {
				Object.defineProperty(owner, this.expando, {
					value: value,
					writable: true,
					configurable: true
				});
			}
			return owner[this.expando];
		},
		cache: function cache(owner) {

			// We can accept data for non-element nodes in modern browsers,
			// but we should not, see #8335.
			// Always return an empty object.
			if (!acceptData(owner)) {
				return {};
			}

			// Check if the owner object already has a cache
			var value = owner[this.expando];

			// If not, create one
			if (!value) {
				value = {};

				// We can accept data for non-element nodes in modern browsers,
				// but we should not, see #8335.
				// Always return an empty object.
				if (acceptData(owner)) {

					// If it is a node unlikely to be stringify-ed or looped over
					// use plain assignment
					if (owner.nodeType) {
						owner[this.expando] = value;

						// Otherwise secure it in a non-enumerable property
						// configurable must be true to allow the property to be
						// deleted when data is removed
					} else {
						Object.defineProperty(owner, this.expando, {
							value: value,
							configurable: true
						});
					}
				}
			}

			return value;
		},
		set: function set(owner, data, value) {
			var prop,
			    cache = this.cache(owner);

			// Handle: [ owner, key, value ] args
			if (typeof data === "string") {
				cache[data] = value;

				// Handle: [ owner, { properties } ] args
			} else {

				// Copy the properties one-by-one to the cache object
				for (prop in data) {
					cache[prop] = data[prop];
				}
			}
			return cache;
		},
		get: function get(owner, key) {
			return key === undefined ? this.cache(owner) : owner[this.expando] && owner[this.expando][key];
		},
		access: function access(owner, key, value) {
			var stored;

			// In cases where either:
			//
			//   1. No key was specified
			//   2. A string key was specified, but no value provided
			//
			// Take the "read" path and allow the get method to determine
			// which value to return, respectively either:
			//
			//   1. The entire cache object
			//   2. The data stored at the key
			//
			if (key === undefined || key && typeof key === "string" && value === undefined) {

				stored = this.get(owner, key);

				return stored !== undefined ? stored : this.get(owner, jQuery.camelCase(key));
			}

			// When the key is not a string, or both a key and value
			// are specified, set or extend (existing objects) with either:
			//
			//   1. An object of properties
			//   2. A key and value
			//
			this.set(owner, key, value);

			// Since the "set" path can have two possible entry points
			// return the expected data based on which path was taken[*]
			return value !== undefined ? value : key;
		},
		remove: function remove(owner, key) {
			var i,
			    name,
			    camel,
			    cache = owner[this.expando];

			if (cache === undefined) {
				return;
			}

			if (key === undefined) {
				this.register(owner);
			} else {

				// Support array or space separated string of keys
				if (jQuery.isArray(key)) {

					// If "name" is an array of keys...
					// When data is initially created, via ("key", "val") signature,
					// keys will be converted to camelCase.
					// Since there is no way to tell _how_ a key was added, remove
					// both plain key and camelCase key. #12786
					// This will only penalize the array argument path.
					name = key.concat(key.map(jQuery.camelCase));
				} else {
					camel = jQuery.camelCase(key);

					// Try the string as a key before any manipulation
					if (key in cache) {
						name = [key, camel];
					} else {

						// If a key with the spaces exists, use it.
						// Otherwise, create an array by matching non-whitespace
						name = camel;
						name = name in cache ? [name] : name.match(rnotwhite) || [];
					}
				}

				i = name.length;

				while (i--) {
					delete cache[name[i]];
				}
			}

			// Remove the expando if there's no more data
			if (key === undefined || jQuery.isEmptyObject(cache)) {

				// Support: Chrome <= 35-45+
				// Webkit & Blink performance suffers when deleting properties
				// from DOM nodes, so set to undefined instead
				// https://code.google.com/p/chromium/issues/detail?id=378607
				if (owner.nodeType) {
					owner[this.expando] = undefined;
				} else {
					delete owner[this.expando];
				}
			}
		},
		hasData: function hasData(owner) {
			var cache = owner[this.expando];
			return cache !== undefined && !jQuery.isEmptyObject(cache);
		}
	};
	var dataPriv = new Data();

	var dataUser = new Data();

	//	Implementation Summary
	//
	//	1. Enforce API surface and semantic compatibility with 1.9.x branch
	//	2. Improve the module's maintainability by reducing the storage
	//		paths to a single mechanism.
	//	3. Use the same single mechanism to support "private" and "user" data.
	//	4. _Never_ expose "private" data to user code (TODO: Drop _data, _removeData)
	//	5. Avoid exposing implementation details on user objects (eg. expando properties)
	//	6. Provide a clear path for implementation upgrade to WeakMap in 2014

	var rbrace = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
	    rmultiDash = /[A-Z]/g;

	function dataAttr(elem, key, data) {
		var name;

		// If nothing was found internally, try to fetch any
		// data from the HTML5 data-* attribute
		if (data === undefined && elem.nodeType === 1) {
			name = "data-" + key.replace(rmultiDash, "-$&").toLowerCase();
			data = elem.getAttribute(name);

			if (typeof data === "string") {
				try {
					data = data === "true" ? true : data === "false" ? false : data === "null" ? null :

					// Only convert to a number if it doesn't change the string
					+data + "" === data ? +data : rbrace.test(data) ? jQuery.parseJSON(data) : data;
				} catch (e) {}

				// Make sure we set the data so it isn't changed later
				dataUser.set(elem, key, data);
			} else {
				data = undefined;
			}
		}
		return data;
	}

	jQuery.extend({
		hasData: function hasData(elem) {
			return dataUser.hasData(elem) || dataPriv.hasData(elem);
		},

		data: function data(elem, name, _data) {
			return dataUser.access(elem, name, _data);
		},

		removeData: function removeData(elem, name) {
			dataUser.remove(elem, name);
		},

		// TODO: Now that all calls to _data and _removeData have been replaced
		// with direct calls to dataPriv methods, these can be deprecated.
		_data: function _data(elem, name, data) {
			return dataPriv.access(elem, name, data);
		},

		_removeData: function _removeData(elem, name) {
			dataPriv.remove(elem, name);
		}
	});

	jQuery.fn.extend({
		data: function data(key, value) {
			var i,
			    name,
			    data,
			    elem = this[0],
			    attrs = elem && elem.attributes;

			// Gets all values
			if (key === undefined) {
				if (this.length) {
					data = dataUser.get(elem);

					if (elem.nodeType === 1 && !dataPriv.get(elem, "hasDataAttrs")) {
						i = attrs.length;
						while (i--) {

							// Support: IE11+
							// The attrs elements can be null (#14894)
							if (attrs[i]) {
								name = attrs[i].name;
								if (name.indexOf("data-") === 0) {
									name = jQuery.camelCase(name.slice(5));
									dataAttr(elem, name, data[name]);
								}
							}
						}
						dataPriv.set(elem, "hasDataAttrs", true);
					}
				}

				return data;
			}

			// Sets multiple values
			if ((typeof key === "undefined" ? "undefined" : _typeof(key)) === "object") {
				return this.each(function () {
					dataUser.set(this, key);
				});
			}

			return access(this, function (value) {
				var data, camelKey;

				// The calling jQuery object (element matches) is not empty
				// (and therefore has an element appears at this[ 0 ]) and the
				// `value` parameter was not undefined. An empty jQuery object
				// will result in `undefined` for elem = this[ 0 ] which will
				// throw an exception if an attempt to read a data cache is made.
				if (elem && value === undefined) {

					// Attempt to get data from the cache
					// with the key as-is
					data = dataUser.get(elem, key) ||

					// Try to find dashed key if it exists (gh-2779)
					// This is for 2.2.x only
					dataUser.get(elem, key.replace(rmultiDash, "-$&").toLowerCase());

					if (data !== undefined) {
						return data;
					}

					camelKey = jQuery.camelCase(key);

					// Attempt to get data from the cache
					// with the key camelized
					data = dataUser.get(elem, camelKey);
					if (data !== undefined) {
						return data;
					}

					// Attempt to "discover" the data in
					// HTML5 custom data-* attrs
					data = dataAttr(elem, camelKey, undefined);
					if (data !== undefined) {
						return data;
					}

					// We tried really hard, but the data doesn't exist.
					return;
				}

				// Set the data...
				camelKey = jQuery.camelCase(key);
				this.each(function () {

					// First, attempt to store a copy or reference of any
					// data that might've been store with a camelCased key.
					var data = dataUser.get(this, camelKey);

					// For HTML5 data-* attribute interop, we have to
					// store property names with dashes in a camelCase form.
					// This might not apply to all properties...*
					dataUser.set(this, camelKey, value);

					// *... In the case of properties that might _actually_
					// have dashes, we need to also store a copy of that
					// unchanged property.
					if (key.indexOf("-") > -1 && data !== undefined) {
						dataUser.set(this, key, value);
					}
				});
			}, null, value, arguments.length > 1, null, true);
		},

		removeData: function removeData(key) {
			return this.each(function () {
				dataUser.remove(this, key);
			});
		}
	});

	jQuery.extend({
		queue: function queue(elem, type, data) {
			var queue;

			if (elem) {
				type = (type || "fx") + "queue";
				queue = dataPriv.get(elem, type);

				// Speed up dequeue by getting out quickly if this is just a lookup
				if (data) {
					if (!queue || jQuery.isArray(data)) {
						queue = dataPriv.access(elem, type, jQuery.makeArray(data));
					} else {
						queue.push(data);
					}
				}
				return queue || [];
			}
		},

		dequeue: function dequeue(elem, type) {
			type = type || "fx";

			var queue = jQuery.queue(elem, type),
			    startLength = queue.length,
			    fn = queue.shift(),
			    hooks = jQuery._queueHooks(elem, type),
			    next = function next() {
				jQuery.dequeue(elem, type);
			};

			// If the fx queue is dequeued, always remove the progress sentinel
			if (fn === "inprogress") {
				fn = queue.shift();
				startLength--;
			}

			if (fn) {

				// Add a progress sentinel to prevent the fx queue from being
				// automatically dequeued
				if (type === "fx") {
					queue.unshift("inprogress");
				}

				// Clear up the last queue stop function
				delete hooks.stop;
				fn.call(elem, next, hooks);
			}

			if (!startLength && hooks) {
				hooks.empty.fire();
			}
		},

		// Not public - generate a queueHooks object, or return the current one
		_queueHooks: function _queueHooks(elem, type) {
			var key = type + "queueHooks";
			return dataPriv.get(elem, key) || dataPriv.access(elem, key, {
				empty: jQuery.Callbacks("once memory").add(function () {
					dataPriv.remove(elem, [type + "queue", key]);
				})
			});
		}
	});

	jQuery.fn.extend({
		queue: function queue(type, data) {
			var setter = 2;

			if (typeof type !== "string") {
				data = type;
				type = "fx";
				setter--;
			}

			if (arguments.length < setter) {
				return jQuery.queue(this[0], type);
			}

			return data === undefined ? this : this.each(function () {
				var queue = jQuery.queue(this, type, data);

				// Ensure a hooks for this queue
				jQuery._queueHooks(this, type);

				if (type === "fx" && queue[0] !== "inprogress") {
					jQuery.dequeue(this, type);
				}
			});
		},
		dequeue: function dequeue(type) {
			return this.each(function () {
				jQuery.dequeue(this, type);
			});
		},
		clearQueue: function clearQueue(type) {
			return this.queue(type || "fx", []);
		},

		// Get a promise resolved when queues of a certain type
		// are emptied (fx is the type by default)
		promise: function promise(type, obj) {
			var tmp,
			    count = 1,
			    defer = jQuery.Deferred(),
			    elements = this,
			    i = this.length,
			    resolve = function resolve() {
				if (! --count) {
					defer.resolveWith(elements, [elements]);
				}
			};

			if (typeof type !== "string") {
				obj = type;
				type = undefined;
			}
			type = type || "fx";

			while (i--) {
				tmp = dataPriv.get(elements[i], type + "queueHooks");
				if (tmp && tmp.empty) {
					count++;
					tmp.empty.add(resolve);
				}
			}
			resolve();
			return defer.promise(obj);
		}
	});
	var pnum = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source;

	var rcssNum = new RegExp("^(?:([+-])=|)(" + pnum + ")([a-z%]*)$", "i");

	var cssExpand = ["Top", "Right", "Bottom", "Left"];

	var isHidden = function isHidden(elem, el) {

		// isHidden might be called from jQuery#filter function;
		// in that case, element will be second argument
		elem = el || elem;
		return jQuery.css(elem, "display") === "none" || !jQuery.contains(elem.ownerDocument, elem);
	};

	function adjustCSS(elem, prop, valueParts, tween) {
		var adjusted,
		    scale = 1,
		    maxIterations = 20,
		    currentValue = tween ? function () {
			return tween.cur();
		} : function () {
			return jQuery.css(elem, prop, "");
		},
		    initial = currentValue(),
		    unit = valueParts && valueParts[3] || (jQuery.cssNumber[prop] ? "" : "px"),


		// Starting value computation is required for potential unit mismatches
		initialInUnit = (jQuery.cssNumber[prop] || unit !== "px" && +initial) && rcssNum.exec(jQuery.css(elem, prop));

		if (initialInUnit && initialInUnit[3] !== unit) {

			// Trust units reported by jQuery.css
			unit = unit || initialInUnit[3];

			// Make sure we update the tween properties later on
			valueParts = valueParts || [];

			// Iteratively approximate from a nonzero starting point
			initialInUnit = +initial || 1;

			do {

				// If previous iteration zeroed out, double until we get *something*.
				// Use string for doubling so we don't accidentally see scale as unchanged below
				scale = scale || ".5";

				// Adjust and apply
				initialInUnit = initialInUnit / scale;
				jQuery.style(elem, prop, initialInUnit + unit);

				// Update scale, tolerating zero or NaN from tween.cur()
				// Break the loop if scale is unchanged or perfect, or if we've just had enough.
			} while (scale !== (scale = currentValue() / initial) && scale !== 1 && --maxIterations);
		}

		if (valueParts) {
			initialInUnit = +initialInUnit || +initial || 0;

			// Apply relative offset (+=/-=) if specified
			adjusted = valueParts[1] ? initialInUnit + (valueParts[1] + 1) * valueParts[2] : +valueParts[2];
			if (tween) {
				tween.unit = unit;
				tween.start = initialInUnit;
				tween.end = adjusted;
			}
		}
		return adjusted;
	}
	var rcheckableType = /^(?:checkbox|radio)$/i;

	var rtagName = /<([\w:-]+)/;

	var rscriptType = /^$|\/(?:java|ecma)script/i;

	// We have to close these tags to support XHTML (#13200)
	var wrapMap = {

		// Support: IE9
		option: [1, "<select multiple='multiple'>", "</select>"],

		// XHTML parsers do not magically insert elements in the
		// same way that tag soup parsers do. So we cannot shorten
		// this by omitting <tbody> or other required elements.
		thead: [1, "<table>", "</table>"],
		col: [2, "<table><colgroup>", "</colgroup></table>"],
		tr: [2, "<table><tbody>", "</tbody></table>"],
		td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],

		_default: [0, "", ""]
	};

	// Support: IE9
	wrapMap.optgroup = wrapMap.option;

	wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
	wrapMap.th = wrapMap.td;

	function getAll(context, tag) {

		// Support: IE9-11+
		// Use typeof to avoid zero-argument method invocation on host objects (#15151)
		var ret = typeof context.getElementsByTagName !== "undefined" ? context.getElementsByTagName(tag || "*") : typeof context.querySelectorAll !== "undefined" ? context.querySelectorAll(tag || "*") : [];

		return tag === undefined || tag && jQuery.nodeName(context, tag) ? jQuery.merge([context], ret) : ret;
	}

	// Mark scripts as having already been evaluated
	function setGlobalEval(elems, refElements) {
		var i = 0,
		    l = elems.length;

		for (; i < l; i++) {
			dataPriv.set(elems[i], "globalEval", !refElements || dataPriv.get(refElements[i], "globalEval"));
		}
	}

	var rhtml = /<|&#?\w+;/;

	function buildFragment(elems, context, scripts, selection, ignored) {
		var elem,
		    tmp,
		    tag,
		    wrap,
		    contains,
		    j,
		    fragment = context.createDocumentFragment(),
		    nodes = [],
		    i = 0,
		    l = elems.length;

		for (; i < l; i++) {
			elem = elems[i];

			if (elem || elem === 0) {

				// Add nodes directly
				if (jQuery.type(elem) === "object") {

					// Support: Android<4.1, PhantomJS<2
					// push.apply(_, arraylike) throws on ancient WebKit
					jQuery.merge(nodes, elem.nodeType ? [elem] : elem);

					// Convert non-html into a text node
				} else if (!rhtml.test(elem)) {
					nodes.push(context.createTextNode(elem));

					// Convert html into DOM nodes
				} else {
					tmp = tmp || fragment.appendChild(context.createElement("div"));

					// Deserialize a standard representation
					tag = (rtagName.exec(elem) || ["", ""])[1].toLowerCase();
					wrap = wrapMap[tag] || wrapMap._default;
					tmp.innerHTML = wrap[1] + jQuery.htmlPrefilter(elem) + wrap[2];

					// Descend through wrappers to the right content
					j = wrap[0];
					while (j--) {
						tmp = tmp.lastChild;
					}

					// Support: Android<4.1, PhantomJS<2
					// push.apply(_, arraylike) throws on ancient WebKit
					jQuery.merge(nodes, tmp.childNodes);

					// Remember the top-level container
					tmp = fragment.firstChild;

					// Ensure the created nodes are orphaned (#12392)
					tmp.textContent = "";
				}
			}
		}

		// Remove wrapper from fragment
		fragment.textContent = "";

		i = 0;
		while (elem = nodes[i++]) {

			// Skip elements already in the context collection (trac-4087)
			if (selection && jQuery.inArray(elem, selection) > -1) {
				if (ignored) {
					ignored.push(elem);
				}
				continue;
			}

			contains = jQuery.contains(elem.ownerDocument, elem);

			// Append to fragment
			tmp = getAll(fragment.appendChild(elem), "script");

			// Preserve script evaluation history
			if (contains) {
				setGlobalEval(tmp);
			}

			// Capture executables
			if (scripts) {
				j = 0;
				while (elem = tmp[j++]) {
					if (rscriptType.test(elem.type || "")) {
						scripts.push(elem);
					}
				}
			}
		}

		return fragment;
	}

	(function () {
		var fragment = document.createDocumentFragment(),
		    div = fragment.appendChild(document.createElement("div")),
		    input = document.createElement("input");

		// Support: Android 4.0-4.3, Safari<=5.1
		// Check state lost if the name is set (#11217)
		// Support: Windows Web Apps (WWA)
		// `name` and `type` must use .setAttribute for WWA (#14901)
		input.setAttribute("type", "radio");
		input.setAttribute("checked", "checked");
		input.setAttribute("name", "t");

		div.appendChild(input);

		// Support: Safari<=5.1, Android<4.2
		// Older WebKit doesn't clone checked state correctly in fragments
		support.checkClone = div.cloneNode(true).cloneNode(true).lastChild.checked;

		// Support: IE<=11+
		// Make sure textarea (and checkbox) defaultValue is properly cloned
		div.innerHTML = "<textarea>x</textarea>";
		support.noCloneChecked = !!div.cloneNode(true).lastChild.defaultValue;
	})();

	var rkeyEvent = /^key/,
	    rmouseEvent = /^(?:mouse|pointer|contextmenu|drag|drop)|click/,
	    rtypenamespace = /^([^.]*)(?:\.(.+)|)/;

	function returnTrue() {
		return true;
	}

	function returnFalse() {
		return false;
	}

	// Support: IE9
	// See #13393 for more info
	function safeActiveElement() {
		try {
			return document.activeElement;
		} catch (err) {}
	}

	function _on(elem, types, selector, data, fn, one) {
		var origFn, type;

		// Types can be a map of types/handlers
		if ((typeof types === "undefined" ? "undefined" : _typeof(types)) === "object") {

			// ( types-Object, selector, data )
			if (typeof selector !== "string") {

				// ( types-Object, data )
				data = data || selector;
				selector = undefined;
			}
			for (type in types) {
				_on(elem, type, selector, data, types[type], one);
			}
			return elem;
		}

		if (data == null && fn == null) {

			// ( types, fn )
			fn = selector;
			data = selector = undefined;
		} else if (fn == null) {
			if (typeof selector === "string") {

				// ( types, selector, fn )
				fn = data;
				data = undefined;
			} else {

				// ( types, data, fn )
				fn = data;
				data = selector;
				selector = undefined;
			}
		}
		if (fn === false) {
			fn = returnFalse;
		} else if (!fn) {
			return elem;
		}

		if (one === 1) {
			origFn = fn;
			fn = function fn(event) {

				// Can use an empty set, since event contains the info
				jQuery().off(event);
				return origFn.apply(this, arguments);
			};

			// Use same guid so caller can remove using origFn
			fn.guid = origFn.guid || (origFn.guid = jQuery.guid++);
		}
		return elem.each(function () {
			jQuery.event.add(this, types, fn, data, selector);
		});
	}

	/*
  * Helper functions for managing events -- not part of the public interface.
  * Props to Dean Edwards' addEvent library for many of the ideas.
  */
	jQuery.event = {

		global: {},

		add: function add(elem, types, handler, data, selector) {

			var handleObjIn,
			    eventHandle,
			    tmp,
			    events,
			    t,
			    handleObj,
			    special,
			    handlers,
			    type,
			    namespaces,
			    origType,
			    elemData = dataPriv.get(elem);

			// Don't attach events to noData or text/comment nodes (but allow plain objects)
			if (!elemData) {
				return;
			}

			// Caller can pass in an object of custom data in lieu of the handler
			if (handler.handler) {
				handleObjIn = handler;
				handler = handleObjIn.handler;
				selector = handleObjIn.selector;
			}

			// Make sure that the handler has a unique ID, used to find/remove it later
			if (!handler.guid) {
				handler.guid = jQuery.guid++;
			}

			// Init the element's event structure and main handler, if this is the first
			if (!(events = elemData.events)) {
				events = elemData.events = {};
			}
			if (!(eventHandle = elemData.handle)) {
				eventHandle = elemData.handle = function (e) {

					// Discard the second event of a jQuery.event.trigger() and
					// when an event is called after a page has unloaded
					return typeof jQuery !== "undefined" && jQuery.event.triggered !== e.type ? jQuery.event.dispatch.apply(elem, arguments) : undefined;
				};
			}

			// Handle multiple events separated by a space
			types = (types || "").match(rnotwhite) || [""];
			t = types.length;
			while (t--) {
				tmp = rtypenamespace.exec(types[t]) || [];
				type = origType = tmp[1];
				namespaces = (tmp[2] || "").split(".").sort();

				// There *must* be a type, no attaching namespace-only handlers
				if (!type) {
					continue;
				}

				// If event changes its type, use the special event handlers for the changed type
				special = jQuery.event.special[type] || {};

				// If selector defined, determine special event api type, otherwise given type
				type = (selector ? special.delegateType : special.bindType) || type;

				// Update special based on newly reset type
				special = jQuery.event.special[type] || {};

				// handleObj is passed to all event handlers
				handleObj = jQuery.extend({
					type: type,
					origType: origType,
					data: data,
					handler: handler,
					guid: handler.guid,
					selector: selector,
					needsContext: selector && jQuery.expr.match.needsContext.test(selector),
					namespace: namespaces.join(".")
				}, handleObjIn);

				// Init the event handler queue if we're the first
				if (!(handlers = events[type])) {
					handlers = events[type] = [];
					handlers.delegateCount = 0;

					// Only use addEventListener if the special events handler returns false
					if (!special.setup || special.setup.call(elem, data, namespaces, eventHandle) === false) {

						if (elem.addEventListener) {
							elem.addEventListener(type, eventHandle);
						}
					}
				}

				if (special.add) {
					special.add.call(elem, handleObj);

					if (!handleObj.handler.guid) {
						handleObj.handler.guid = handler.guid;
					}
				}

				// Add to the element's handler list, delegates in front
				if (selector) {
					handlers.splice(handlers.delegateCount++, 0, handleObj);
				} else {
					handlers.push(handleObj);
				}

				// Keep track of which events have ever been used, for event optimization
				jQuery.event.global[type] = true;
			}
		},

		// Detach an event or set of events from an element
		remove: function remove(elem, types, handler, selector, mappedTypes) {

			var j,
			    origCount,
			    tmp,
			    events,
			    t,
			    handleObj,
			    special,
			    handlers,
			    type,
			    namespaces,
			    origType,
			    elemData = dataPriv.hasData(elem) && dataPriv.get(elem);

			if (!elemData || !(events = elemData.events)) {
				return;
			}

			// Once for each type.namespace in types; type may be omitted
			types = (types || "").match(rnotwhite) || [""];
			t = types.length;
			while (t--) {
				tmp = rtypenamespace.exec(types[t]) || [];
				type = origType = tmp[1];
				namespaces = (tmp[2] || "").split(".").sort();

				// Unbind all events (on this namespace, if provided) for the element
				if (!type) {
					for (type in events) {
						jQuery.event.remove(elem, type + types[t], handler, selector, true);
					}
					continue;
				}

				special = jQuery.event.special[type] || {};
				type = (selector ? special.delegateType : special.bindType) || type;
				handlers = events[type] || [];
				tmp = tmp[2] && new RegExp("(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)");

				// Remove matching events
				origCount = j = handlers.length;
				while (j--) {
					handleObj = handlers[j];

					if ((mappedTypes || origType === handleObj.origType) && (!handler || handler.guid === handleObj.guid) && (!tmp || tmp.test(handleObj.namespace)) && (!selector || selector === handleObj.selector || selector === "**" && handleObj.selector)) {
						handlers.splice(j, 1);

						if (handleObj.selector) {
							handlers.delegateCount--;
						}
						if (special.remove) {
							special.remove.call(elem, handleObj);
						}
					}
				}

				// Remove generic event handler if we removed something and no more handlers exist
				// (avoids potential for endless recursion during removal of special event handlers)
				if (origCount && !handlers.length) {
					if (!special.teardown || special.teardown.call(elem, namespaces, elemData.handle) === false) {

						jQuery.removeEvent(elem, type, elemData.handle);
					}

					delete events[type];
				}
			}

			// Remove data and the expando if it's no longer used
			if (jQuery.isEmptyObject(events)) {
				dataPriv.remove(elem, "handle events");
			}
		},

		dispatch: function dispatch(event) {

			// Make a writable jQuery.Event from the native event object
			event = jQuery.event.fix(event);

			var i,
			    j,
			    ret,
			    matched,
			    handleObj,
			    handlerQueue = [],
			    args = _slice.call(arguments),
			    handlers = (dataPriv.get(this, "events") || {})[event.type] || [],
			    special = jQuery.event.special[event.type] || {};

			// Use the fix-ed jQuery.Event rather than the (read-only) native event
			args[0] = event;
			event.delegateTarget = this;

			// Call the preDispatch hook for the mapped type, and let it bail if desired
			if (special.preDispatch && special.preDispatch.call(this, event) === false) {
				return;
			}

			// Determine handlers
			handlerQueue = jQuery.event.handlers.call(this, event, handlers);

			// Run delegates first; they may want to stop propagation beneath us
			i = 0;
			while ((matched = handlerQueue[i++]) && !event.isPropagationStopped()) {
				event.currentTarget = matched.elem;

				j = 0;
				while ((handleObj = matched.handlers[j++]) && !event.isImmediatePropagationStopped()) {

					// Triggered event must either 1) have no namespace, or 2) have namespace(s)
					// a subset or equal to those in the bound event (both can have no namespace).
					if (!event.rnamespace || event.rnamespace.test(handleObj.namespace)) {

						event.handleObj = handleObj;
						event.data = handleObj.data;

						ret = ((jQuery.event.special[handleObj.origType] || {}).handle || handleObj.handler).apply(matched.elem, args);

						if (ret !== undefined) {
							if ((event.result = ret) === false) {
								event.preventDefault();
								event.stopPropagation();
							}
						}
					}
				}
			}

			// Call the postDispatch hook for the mapped type
			if (special.postDispatch) {
				special.postDispatch.call(this, event);
			}

			return event.result;
		},

		handlers: function handlers(event, _handlers) {
			var i,
			    matches,
			    sel,
			    handleObj,
			    handlerQueue = [],
			    delegateCount = _handlers.delegateCount,
			    cur = event.target;

			// Support (at least): Chrome, IE9
			// Find delegate handlers
			// Black-hole SVG <use> instance trees (#13180)
			//
			// Support: Firefox<=42+
			// Avoid non-left-click in FF but don't block IE radio events (#3861, gh-2343)
			if (delegateCount && cur.nodeType && (event.type !== "click" || isNaN(event.button) || event.button < 1)) {

				for (; cur !== this; cur = cur.parentNode || this) {

					// Don't check non-elements (#13208)
					// Don't process clicks on disabled elements (#6911, #8165, #11382, #11764)
					if (cur.nodeType === 1 && (cur.disabled !== true || event.type !== "click")) {
						matches = [];
						for (i = 0; i < delegateCount; i++) {
							handleObj = _handlers[i];

							// Don't conflict with Object.prototype properties (#13203)
							sel = handleObj.selector + " ";

							if (matches[sel] === undefined) {
								matches[sel] = handleObj.needsContext ? jQuery(sel, this).index(cur) > -1 : jQuery.find(sel, this, null, [cur]).length;
							}
							if (matches[sel]) {
								matches.push(handleObj);
							}
						}
						if (matches.length) {
							handlerQueue.push({ elem: cur, handlers: matches });
						}
					}
				}
			}

			// Add the remaining (directly-bound) handlers
			if (delegateCount < _handlers.length) {
				handlerQueue.push({ elem: this, handlers: _handlers.slice(delegateCount) });
			}

			return handlerQueue;
		},

		// Includes some event props shared by KeyEvent and MouseEvent
		props: ("altKey bubbles cancelable ctrlKey currentTarget detail eventPhase " + "metaKey relatedTarget shiftKey target timeStamp view which").split(" "),

		fixHooks: {},

		keyHooks: {
			props: "char charCode key keyCode".split(" "),
			filter: function filter(event, original) {

				// Add which for key events
				if (event.which == null) {
					event.which = original.charCode != null ? original.charCode : original.keyCode;
				}

				return event;
			}
		},

		mouseHooks: {
			props: ("button buttons clientX clientY offsetX offsetY pageX pageY " + "screenX screenY toElement").split(" "),
			filter: function filter(event, original) {
				var eventDoc,
				    doc,
				    body,
				    button = original.button;

				// Calculate pageX/Y if missing and clientX/Y available
				if (event.pageX == null && original.clientX != null) {
					eventDoc = event.target.ownerDocument || document;
					doc = eventDoc.documentElement;
					body = eventDoc.body;

					event.pageX = original.clientX + (doc && doc.scrollLeft || body && body.scrollLeft || 0) - (doc && doc.clientLeft || body && body.clientLeft || 0);
					event.pageY = original.clientY + (doc && doc.scrollTop || body && body.scrollTop || 0) - (doc && doc.clientTop || body && body.clientTop || 0);
				}

				// Add which for click: 1 === left; 2 === middle; 3 === right
				// Note: button is not normalized, so don't use it
				if (!event.which && button !== undefined) {
					event.which = button & 1 ? 1 : button & 2 ? 3 : button & 4 ? 2 : 0;
				}

				return event;
			}
		},

		fix: function fix(event) {
			if (event[jQuery.expando]) {
				return event;
			}

			// Create a writable copy of the event object and normalize some properties
			var i,
			    prop,
			    copy,
			    type = event.type,
			    originalEvent = event,
			    fixHook = this.fixHooks[type];

			if (!fixHook) {
				this.fixHooks[type] = fixHook = rmouseEvent.test(type) ? this.mouseHooks : rkeyEvent.test(type) ? this.keyHooks : {};
			}
			copy = fixHook.props ? this.props.concat(fixHook.props) : this.props;

			event = new jQuery.Event(originalEvent);

			i = copy.length;
			while (i--) {
				prop = copy[i];
				event[prop] = originalEvent[prop];
			}

			// Support: Cordova 2.5 (WebKit) (#13255)
			// All events should have a target; Cordova deviceready doesn't
			if (!event.target) {
				event.target = document;
			}

			// Support: Safari 6.0+, Chrome<28
			// Target should not be a text node (#504, #13143)
			if (event.target.nodeType === 3) {
				event.target = event.target.parentNode;
			}

			return fixHook.filter ? fixHook.filter(event, originalEvent) : event;
		},

		special: {
			load: {

				// Prevent triggered image.load events from bubbling to window.load
				noBubble: true
			},
			focus: {

				// Fire native event if possible so blur/focus sequence is correct
				trigger: function trigger() {
					if (this !== safeActiveElement() && this.focus) {
						this.focus();
						return false;
					}
				},
				delegateType: "focusin"
			},
			blur: {
				trigger: function trigger() {
					if (this === safeActiveElement() && this.blur) {
						this.blur();
						return false;
					}
				},
				delegateType: "focusout"
			},
			click: {

				// For checkbox, fire native event so checked state will be right
				trigger: function trigger() {
					if (this.type === "checkbox" && this.click && jQuery.nodeName(this, "input")) {
						this.click();
						return false;
					}
				},

				// For cross-browser consistency, don't fire native .click() on links
				_default: function _default(event) {
					return jQuery.nodeName(event.target, "a");
				}
			},

			beforeunload: {
				postDispatch: function postDispatch(event) {

					// Support: Firefox 20+
					// Firefox doesn't alert if the returnValue field is not set.
					if (event.result !== undefined && event.originalEvent) {
						event.originalEvent.returnValue = event.result;
					}
				}
			}
		}
	};

	jQuery.removeEvent = function (elem, type, handle) {

		// This "if" is needed for plain objects
		if (elem.removeEventListener) {
			elem.removeEventListener(type, handle);
		}
	};

	jQuery.Event = function (src, props) {

		// Allow instantiation without the 'new' keyword
		if (!(this instanceof jQuery.Event)) {
			return new jQuery.Event(src, props);
		}

		// Event object
		if (src && src.type) {
			this.originalEvent = src;
			this.type = src.type;

			// Events bubbling up the document may have been marked as prevented
			// by a handler lower down the tree; reflect the correct value.
			this.isDefaultPrevented = src.defaultPrevented || src.defaultPrevented === undefined &&

			// Support: Android<4.0
			src.returnValue === false ? returnTrue : returnFalse;

			// Event type
		} else {
			this.type = src;
		}

		// Put explicitly provided properties onto the event object
		if (props) {
			jQuery.extend(this, props);
		}

		// Create a timestamp if incoming event doesn't have one
		this.timeStamp = src && src.timeStamp || jQuery.now();

		// Mark it as fixed
		this[jQuery.expando] = true;
	};

	// jQuery.Event is based on DOM3 Events as specified by the ECMAScript Language Binding
	// http://www.w3.org/TR/2003/WD-DOM-Level-3-Events-20030331/ecma-script-binding.html
	jQuery.Event.prototype = {
		constructor: jQuery.Event,
		isDefaultPrevented: returnFalse,
		isPropagationStopped: returnFalse,
		isImmediatePropagationStopped: returnFalse,
		isSimulated: false,

		preventDefault: function preventDefault() {
			var e = this.originalEvent;

			this.isDefaultPrevented = returnTrue;

			if (e && !this.isSimulated) {
				e.preventDefault();
			}
		},
		stopPropagation: function stopPropagation() {
			var e = this.originalEvent;

			this.isPropagationStopped = returnTrue;

			if (e && !this.isSimulated) {
				e.stopPropagation();
			}
		},
		stopImmediatePropagation: function stopImmediatePropagation() {
			var e = this.originalEvent;

			this.isImmediatePropagationStopped = returnTrue;

			if (e && !this.isSimulated) {
				e.stopImmediatePropagation();
			}

			this.stopPropagation();
		}
	};

	// Create mouseenter/leave events using mouseover/out and event-time checks
	// so that event delegation works in jQuery.
	// Do the same for pointerenter/pointerleave and pointerover/pointerout
	//
	// Support: Safari 7 only
	// Safari sends mouseenter too often; see:
	// https://code.google.com/p/chromium/issues/detail?id=470258
	// for the description of the bug (it existed in older Chrome versions as well).
	jQuery.each({
		mouseenter: "mouseover",
		mouseleave: "mouseout",
		pointerenter: "pointerover",
		pointerleave: "pointerout"
	}, function (orig, fix) {
		jQuery.event.special[orig] = {
			delegateType: fix,
			bindType: fix,

			handle: function handle(event) {
				var ret,
				    target = this,
				    related = event.relatedTarget,
				    handleObj = event.handleObj;

				// For mouseenter/leave call the handler if related is outside the target.
				// NB: No relatedTarget if the mouse left/entered the browser window
				if (!related || related !== target && !jQuery.contains(target, related)) {
					event.type = handleObj.origType;
					ret = handleObj.handler.apply(this, arguments);
					event.type = fix;
				}
				return ret;
			}
		};
	});

	jQuery.fn.extend({
		on: function on(types, selector, data, fn) {
			return _on(this, types, selector, data, fn);
		},
		one: function one(types, selector, data, fn) {
			return _on(this, types, selector, data, fn, 1);
		},
		off: function off(types, selector, fn) {
			var handleObj, type;
			if (types && types.preventDefault && types.handleObj) {

				// ( event )  dispatched jQuery.Event
				handleObj = types.handleObj;
				jQuery(types.delegateTarget).off(handleObj.namespace ? handleObj.origType + "." + handleObj.namespace : handleObj.origType, handleObj.selector, handleObj.handler);
				return this;
			}
			if ((typeof types === "undefined" ? "undefined" : _typeof(types)) === "object") {

				// ( types-object [, selector] )
				for (type in types) {
					this.off(type, selector, types[type]);
				}
				return this;
			}
			if (selector === false || typeof selector === "function") {

				// ( types [, fn] )
				fn = selector;
				selector = undefined;
			}
			if (fn === false) {
				fn = returnFalse;
			}
			return this.each(function () {
				jQuery.event.remove(this, types, fn, selector);
			});
		}
	});

	var rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:-]+)[^>]*)\/>/gi,


	// Support: IE 10-11, Edge 10240+
	// In IE/Edge using regex groups here causes severe slowdowns.
	// See https://connect.microsoft.com/IE/feedback/details/1736512/
	rnoInnerhtml = /<script|<style|<link/i,


	// checked="checked" or checked
	rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
	    rscriptTypeMasked = /^true\/(.*)/,
	    rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g;

	// Manipulating tables requires a tbody
	function manipulationTarget(elem, content) {
		return jQuery.nodeName(elem, "table") && jQuery.nodeName(content.nodeType !== 11 ? content : content.firstChild, "tr") ? elem.getElementsByTagName("tbody")[0] || elem.appendChild(elem.ownerDocument.createElement("tbody")) : elem;
	}

	// Replace/restore the type attribute of script elements for safe DOM manipulation
	function disableScript(elem) {
		elem.type = (elem.getAttribute("type") !== null) + "/" + elem.type;
		return elem;
	}
	function restoreScript(elem) {
		var match = rscriptTypeMasked.exec(elem.type);

		if (match) {
			elem.type = match[1];
		} else {
			elem.removeAttribute("type");
		}

		return elem;
	}

	function cloneCopyEvent(src, dest) {
		var i, l, type, pdataOld, pdataCur, udataOld, udataCur, events;

		if (dest.nodeType !== 1) {
			return;
		}

		// 1. Copy private data: events, handlers, etc.
		if (dataPriv.hasData(src)) {
			pdataOld = dataPriv.access(src);
			pdataCur = dataPriv.set(dest, pdataOld);
			events = pdataOld.events;

			if (events) {
				delete pdataCur.handle;
				pdataCur.events = {};

				for (type in events) {
					for (i = 0, l = events[type].length; i < l; i++) {
						jQuery.event.add(dest, type, events[type][i]);
					}
				}
			}
		}

		// 2. Copy user data
		if (dataUser.hasData(src)) {
			udataOld = dataUser.access(src);
			udataCur = jQuery.extend({}, udataOld);

			dataUser.set(dest, udataCur);
		}
	}

	// Fix IE bugs, see support tests
	function fixInput(src, dest) {
		var nodeName = dest.nodeName.toLowerCase();

		// Fails to persist the checked state of a cloned checkbox or radio button.
		if (nodeName === "input" && rcheckableType.test(src.type)) {
			dest.checked = src.checked;

			// Fails to return the selected option to the default selected state when cloning options
		} else if (nodeName === "input" || nodeName === "textarea") {
			dest.defaultValue = src.defaultValue;
		}
	}

	function domManip(collection, args, callback, ignored) {

		// Flatten any nested arrays
		args = concat.apply([], args);

		var fragment,
		    first,
		    scripts,
		    hasScripts,
		    node,
		    doc,
		    i = 0,
		    l = collection.length,
		    iNoClone = l - 1,
		    value = args[0],
		    isFunction = jQuery.isFunction(value);

		// We can't cloneNode fragments that contain checked, in WebKit
		if (isFunction || l > 1 && typeof value === "string" && !support.checkClone && rchecked.test(value)) {
			return collection.each(function (index) {
				var self = collection.eq(index);
				if (isFunction) {
					args[0] = value.call(this, index, self.html());
				}
				domManip(self, args, callback, ignored);
			});
		}

		if (l) {
			fragment = buildFragment(args, collection[0].ownerDocument, false, collection, ignored);
			first = fragment.firstChild;

			if (fragment.childNodes.length === 1) {
				fragment = first;
			}

			// Require either new content or an interest in ignored elements to invoke the callback
			if (first || ignored) {
				scripts = jQuery.map(getAll(fragment, "script"), disableScript);
				hasScripts = scripts.length;

				// Use the original fragment for the last item
				// instead of the first because it can end up
				// being emptied incorrectly in certain situations (#8070).
				for (; i < l; i++) {
					node = fragment;

					if (i !== iNoClone) {
						node = jQuery.clone(node, true, true);

						// Keep references to cloned scripts for later restoration
						if (hasScripts) {

							// Support: Android<4.1, PhantomJS<2
							// push.apply(_, arraylike) throws on ancient WebKit
							jQuery.merge(scripts, getAll(node, "script"));
						}
					}

					callback.call(collection[i], node, i);
				}

				if (hasScripts) {
					doc = scripts[scripts.length - 1].ownerDocument;

					// Reenable scripts
					jQuery.map(scripts, restoreScript);

					// Evaluate executable scripts on first document insertion
					for (i = 0; i < hasScripts; i++) {
						node = scripts[i];
						if (rscriptType.test(node.type || "") && !dataPriv.access(node, "globalEval") && jQuery.contains(doc, node)) {

							if (node.src) {

								// Optional AJAX dependency, but won't run scripts if not present
								if (jQuery._evalUrl) {
									jQuery._evalUrl(node.src);
								}
							} else {
								jQuery.globalEval(node.textContent.replace(rcleanScript, ""));
							}
						}
					}
				}
			}
		}

		return collection;
	}

	function _remove(elem, selector, keepData) {
		var node,
		    nodes = selector ? jQuery.filter(selector, elem) : elem,
		    i = 0;

		for (; (node = nodes[i]) != null; i++) {
			if (!keepData && node.nodeType === 1) {
				jQuery.cleanData(getAll(node));
			}

			if (node.parentNode) {
				if (keepData && jQuery.contains(node.ownerDocument, node)) {
					setGlobalEval(getAll(node, "script"));
				}
				node.parentNode.removeChild(node);
			}
		}

		return elem;
	}

	jQuery.extend({
		htmlPrefilter: function htmlPrefilter(html) {
			return html.replace(rxhtmlTag, "<$1></$2>");
		},

		clone: function clone(elem, dataAndEvents, deepDataAndEvents) {
			var i,
			    l,
			    srcElements,
			    destElements,
			    clone = elem.cloneNode(true),
			    inPage = jQuery.contains(elem.ownerDocument, elem);

			// Fix IE cloning issues
			if (!support.noCloneChecked && (elem.nodeType === 1 || elem.nodeType === 11) && !jQuery.isXMLDoc(elem)) {

				// We eschew Sizzle here for performance reasons: http://jsperf.com/getall-vs-sizzle/2
				destElements = getAll(clone);
				srcElements = getAll(elem);

				for (i = 0, l = srcElements.length; i < l; i++) {
					fixInput(srcElements[i], destElements[i]);
				}
			}

			// Copy the events from the original to the clone
			if (dataAndEvents) {
				if (deepDataAndEvents) {
					srcElements = srcElements || getAll(elem);
					destElements = destElements || getAll(clone);

					for (i = 0, l = srcElements.length; i < l; i++) {
						cloneCopyEvent(srcElements[i], destElements[i]);
					}
				} else {
					cloneCopyEvent(elem, clone);
				}
			}

			// Preserve script evaluation history
			destElements = getAll(clone, "script");
			if (destElements.length > 0) {
				setGlobalEval(destElements, !inPage && getAll(elem, "script"));
			}

			// Return the cloned set
			return clone;
		},

		cleanData: function cleanData(elems) {
			var data,
			    elem,
			    type,
			    special = jQuery.event.special,
			    i = 0;

			for (; (elem = elems[i]) !== undefined; i++) {
				if (acceptData(elem)) {
					if (data = elem[dataPriv.expando]) {
						if (data.events) {
							for (type in data.events) {
								if (special[type]) {
									jQuery.event.remove(elem, type);

									// This is a shortcut to avoid jQuery.event.remove's overhead
								} else {
									jQuery.removeEvent(elem, type, data.handle);
								}
							}
						}

						// Support: Chrome <= 35-45+
						// Assign undefined instead of using delete, see Data#remove
						elem[dataPriv.expando] = undefined;
					}
					if (elem[dataUser.expando]) {

						// Support: Chrome <= 35-45+
						// Assign undefined instead of using delete, see Data#remove
						elem[dataUser.expando] = undefined;
					}
				}
			}
		}
	});

	jQuery.fn.extend({

		// Keep domManip exposed until 3.0 (gh-2225)
		domManip: domManip,

		detach: function detach(selector) {
			return _remove(this, selector, true);
		},

		remove: function remove(selector) {
			return _remove(this, selector);
		},

		text: function text(value) {
			return access(this, function (value) {
				return value === undefined ? jQuery.text(this) : this.empty().each(function () {
					if (this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9) {
						this.textContent = value;
					}
				});
			}, null, value, arguments.length);
		},

		append: function append() {
			return domManip(this, arguments, function (elem) {
				if (this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9) {
					var target = manipulationTarget(this, elem);
					target.appendChild(elem);
				}
			});
		},

		prepend: function prepend() {
			return domManip(this, arguments, function (elem) {
				if (this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9) {
					var target = manipulationTarget(this, elem);
					target.insertBefore(elem, target.firstChild);
				}
			});
		},

		before: function before() {
			return domManip(this, arguments, function (elem) {
				if (this.parentNode) {
					this.parentNode.insertBefore(elem, this);
				}
			});
		},

		after: function after() {
			return domManip(this, arguments, function (elem) {
				if (this.parentNode) {
					this.parentNode.insertBefore(elem, this.nextSibling);
				}
			});
		},

		empty: function empty() {
			var elem,
			    i = 0;

			for (; (elem = this[i]) != null; i++) {
				if (elem.nodeType === 1) {

					// Prevent memory leaks
					jQuery.cleanData(getAll(elem, false));

					// Remove any remaining nodes
					elem.textContent = "";
				}
			}

			return this;
		},

		clone: function clone(dataAndEvents, deepDataAndEvents) {
			dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
			deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;

			return this.map(function () {
				return jQuery.clone(this, dataAndEvents, deepDataAndEvents);
			});
		},

		html: function html(value) {
			return access(this, function (value) {
				var elem = this[0] || {},
				    i = 0,
				    l = this.length;

				if (value === undefined && elem.nodeType === 1) {
					return elem.innerHTML;
				}

				// See if we can take a shortcut and just use innerHTML
				if (typeof value === "string" && !rnoInnerhtml.test(value) && !wrapMap[(rtagName.exec(value) || ["", ""])[1].toLowerCase()]) {

					value = jQuery.htmlPrefilter(value);

					try {
						for (; i < l; i++) {
							elem = this[i] || {};

							// Remove element nodes and prevent memory leaks
							if (elem.nodeType === 1) {
								jQuery.cleanData(getAll(elem, false));
								elem.innerHTML = value;
							}
						}

						elem = 0;

						// If using innerHTML throws an exception, use the fallback method
					} catch (e) {}
				}

				if (elem) {
					this.empty().append(value);
				}
			}, null, value, arguments.length);
		},

		replaceWith: function replaceWith() {
			var ignored = [];

			// Make the changes, replacing each non-ignored context element with the new content
			return domManip(this, arguments, function (elem) {
				var parent = this.parentNode;

				if (jQuery.inArray(this, ignored) < 0) {
					jQuery.cleanData(getAll(this));
					if (parent) {
						parent.replaceChild(elem, this);
					}
				}

				// Force callback invocation
			}, ignored);
		}
	});

	jQuery.each({
		appendTo: "append",
		prependTo: "prepend",
		insertBefore: "before",
		insertAfter: "after",
		replaceAll: "replaceWith"
	}, function (name, original) {
		jQuery.fn[name] = function (selector) {
			var elems,
			    ret = [],
			    insert = jQuery(selector),
			    last = insert.length - 1,
			    i = 0;

			for (; i <= last; i++) {
				elems = i === last ? this : this.clone(true);
				jQuery(insert[i])[original](elems);

				// Support: QtWebKit
				// .get() because push.apply(_, arraylike) throws
				push.apply(ret, elems.get());
			}

			return this.pushStack(ret);
		};
	});

	var iframe,
	    elemdisplay = {

		// Support: Firefox
		// We have to pre-define these values for FF (#10227)
		HTML: "block",
		BODY: "block"
	};

	/**
  * Retrieve the actual display of a element
  * @param {String} name nodeName of the element
  * @param {Object} doc Document object
  */

	// Called only from within defaultDisplay
	function actualDisplay(name, doc) {
		var elem = jQuery(doc.createElement(name)).appendTo(doc.body),
		    display = jQuery.css(elem[0], "display");

		// We don't have any data stored on the element,
		// so use "detach" method as fast way to get rid of the element
		elem.detach();

		return display;
	}

	/**
  * Try to determine the default display value of an element
  * @param {String} nodeName
  */
	function defaultDisplay(nodeName) {
		var doc = document,
		    display = elemdisplay[nodeName];

		if (!display) {
			display = actualDisplay(nodeName, doc);

			// If the simple way fails, read from inside an iframe
			if (display === "none" || !display) {

				// Use the already-created iframe if possible
				iframe = (iframe || jQuery("<iframe frameborder='0' width='0' height='0'/>")).appendTo(doc.documentElement);

				// Always write a new HTML skeleton so Webkit and Firefox don't choke on reuse
				doc = iframe[0].contentDocument;

				// Support: IE
				doc.write();
				doc.close();

				display = actualDisplay(nodeName, doc);
				iframe.detach();
			}

			// Store the correct default display
			elemdisplay[nodeName] = display;
		}

		return display;
	}
	var rmargin = /^margin/;

	var rnumnonpx = new RegExp("^(" + pnum + ")(?!px)[a-z%]+$", "i");

	var getStyles = function getStyles(elem) {

		// Support: IE<=11+, Firefox<=30+ (#15098, #14150)
		// IE throws on elements created in popups
		// FF meanwhile throws on frame elements through "defaultView.getComputedStyle"
		var view = elem.ownerDocument.defaultView;

		if (!view || !view.opener) {
			view = window;
		}

		return view.getComputedStyle(elem);
	};

	var swap = function swap(elem, options, callback, args) {
		var ret,
		    name,
		    old = {};

		// Remember the old values, and insert the new ones
		for (name in options) {
			old[name] = elem.style[name];
			elem.style[name] = options[name];
		}

		ret = callback.apply(elem, args || []);

		// Revert the old values
		for (name in options) {
			elem.style[name] = old[name];
		}

		return ret;
	};

	var documentElement = document.documentElement;

	(function () {
		var pixelPositionVal,
		    boxSizingReliableVal,
		    pixelMarginRightVal,
		    reliableMarginLeftVal,
		    container = document.createElement("div"),
		    div = document.createElement("div");

		// Finish early in limited (non-browser) environments
		if (!div.style) {
			return;
		}

		// Support: IE9-11+
		// Style of cloned element affects source element cloned (#8908)
		div.style.backgroundClip = "content-box";
		div.cloneNode(true).style.backgroundClip = "";
		support.clearCloneStyle = div.style.backgroundClip === "content-box";

		container.style.cssText = "border:0;width:8px;height:0;top:0;left:-9999px;" + "padding:0;margin-top:1px;position:absolute";
		container.appendChild(div);

		// Executing both pixelPosition & boxSizingReliable tests require only one layout
		// so they're executed at the same time to save the second computation.
		function computeStyleTests() {
			div.style.cssText =

			// Support: Firefox<29, Android 2.3
			// Vendor-prefix box-sizing
			"-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;" + "position:relative;display:block;" + "margin:auto;border:1px;padding:1px;" + "top:1%;width:50%";
			div.innerHTML = "";
			documentElement.appendChild(container);

			var divStyle = window.getComputedStyle(div);
			pixelPositionVal = divStyle.top !== "1%";
			reliableMarginLeftVal = divStyle.marginLeft === "2px";
			boxSizingReliableVal = divStyle.width === "4px";

			// Support: Android 4.0 - 4.3 only
			// Some styles come back with percentage values, even though they shouldn't
			div.style.marginRight = "50%";
			pixelMarginRightVal = divStyle.marginRight === "4px";

			documentElement.removeChild(container);
		}

		jQuery.extend(support, {
			pixelPosition: function pixelPosition() {

				// This test is executed only once but we still do memoizing
				// since we can use the boxSizingReliable pre-computing.
				// No need to check if the test was already performed, though.
				computeStyleTests();
				return pixelPositionVal;
			},
			boxSizingReliable: function boxSizingReliable() {
				if (boxSizingReliableVal == null) {
					computeStyleTests();
				}
				return boxSizingReliableVal;
			},
			pixelMarginRight: function pixelMarginRight() {

				// Support: Android 4.0-4.3
				// We're checking for boxSizingReliableVal here instead of pixelMarginRightVal
				// since that compresses better and they're computed together anyway.
				if (boxSizingReliableVal == null) {
					computeStyleTests();
				}
				return pixelMarginRightVal;
			},
			reliableMarginLeft: function reliableMarginLeft() {

				// Support: IE <=8 only, Android 4.0 - 4.3 only, Firefox <=3 - 37
				if (boxSizingReliableVal == null) {
					computeStyleTests();
				}
				return reliableMarginLeftVal;
			},
			reliableMarginRight: function reliableMarginRight() {

				// Support: Android 2.3
				// Check if div with explicit width and no margin-right incorrectly
				// gets computed margin-right based on width of container. (#3333)
				// WebKit Bug 13343 - getComputedStyle returns wrong value for margin-right
				// This support function is only executed once so no memoizing is needed.
				var ret,
				    marginDiv = div.appendChild(document.createElement("div"));

				// Reset CSS: box-sizing; display; margin; border; padding
				marginDiv.style.cssText = div.style.cssText =

				// Support: Android 2.3
				// Vendor-prefix box-sizing
				"-webkit-box-sizing:content-box;box-sizing:content-box;" + "display:block;margin:0;border:0;padding:0";
				marginDiv.style.marginRight = marginDiv.style.width = "0";
				div.style.width = "1px";
				documentElement.appendChild(container);

				ret = !parseFloat(window.getComputedStyle(marginDiv).marginRight);

				documentElement.removeChild(container);
				div.removeChild(marginDiv);

				return ret;
			}
		});
	})();

	function curCSS(elem, name, computed) {
		var width,
		    minWidth,
		    maxWidth,
		    ret,
		    style = elem.style;

		computed = computed || getStyles(elem);
		ret = computed ? computed.getPropertyValue(name) || computed[name] : undefined;

		// Support: Opera 12.1x only
		// Fall back to style even without computed
		// computed is undefined for elems on document fragments
		if ((ret === "" || ret === undefined) && !jQuery.contains(elem.ownerDocument, elem)) {
			ret = jQuery.style(elem, name);
		}

		// Support: IE9
		// getPropertyValue is only needed for .css('filter') (#12537)
		if (computed) {

			// A tribute to the "awesome hack by Dean Edwards"
			// Android Browser returns percentage for some values,
			// but width seems to be reliably pixels.
			// This is against the CSSOM draft spec:
			// http://dev.w3.org/csswg/cssom/#resolved-values
			if (!support.pixelMarginRight() && rnumnonpx.test(ret) && rmargin.test(name)) {

				// Remember the original values
				width = style.width;
				minWidth = style.minWidth;
				maxWidth = style.maxWidth;

				// Put in the new values to get a computed value out
				style.minWidth = style.maxWidth = style.width = ret;
				ret = computed.width;

				// Revert the changed values
				style.width = width;
				style.minWidth = minWidth;
				style.maxWidth = maxWidth;
			}
		}

		return ret !== undefined ?

		// Support: IE9-11+
		// IE returns zIndex value as an integer.
		ret + "" : ret;
	}

	function addGetHookIf(conditionFn, hookFn) {

		// Define the hook, we'll check on the first run if it's really needed.
		return {
			get: function get() {
				if (conditionFn()) {

					// Hook not needed (or it's not possible to use it due
					// to missing dependency), remove it.
					delete this.get;
					return;
				}

				// Hook needed; redefine it so that the support test is not executed again.
				return (this.get = hookFn).apply(this, arguments);
			}
		};
	}

	var

	// Swappable if display is none or starts with table
	// except "table", "table-cell", or "table-caption"
	// See here for display values: https://developer.mozilla.org/en-US/docs/CSS/display
	rdisplayswap = /^(none|table(?!-c[ea]).+)/,
	    cssShow = { position: "absolute", visibility: "hidden", display: "block" },
	    cssNormalTransform = {
		letterSpacing: "0",
		fontWeight: "400"
	},
	    cssPrefixes = ["Webkit", "O", "Moz", "ms"],
	    emptyStyle = document.createElement("div").style;

	// Return a css property mapped to a potentially vendor prefixed property
	function vendorPropName(name) {

		// Shortcut for names that are not vendor prefixed
		if (name in emptyStyle) {
			return name;
		}

		// Check for vendor prefixed names
		var capName = name[0].toUpperCase() + name.slice(1),
		    i = cssPrefixes.length;

		while (i--) {
			name = cssPrefixes[i] + capName;
			if (name in emptyStyle) {
				return name;
			}
		}
	}

	function setPositiveNumber(elem, value, subtract) {

		// Any relative (+/-) values have already been
		// normalized at this point
		var matches = rcssNum.exec(value);
		return matches ?

		// Guard against undefined "subtract", e.g., when used as in cssHooks
		Math.max(0, matches[2] - (subtract || 0)) + (matches[3] || "px") : value;
	}

	function augmentWidthOrHeight(elem, name, extra, isBorderBox, styles) {
		var i = extra === (isBorderBox ? "border" : "content") ?

		// If we already have the right measurement, avoid augmentation
		4 :

		// Otherwise initialize for horizontal or vertical properties
		name === "width" ? 1 : 0,
		    val = 0;

		for (; i < 4; i += 2) {

			// Both box models exclude margin, so add it if we want it
			if (extra === "margin") {
				val += jQuery.css(elem, extra + cssExpand[i], true, styles);
			}

			if (isBorderBox) {

				// border-box includes padding, so remove it if we want content
				if (extra === "content") {
					val -= jQuery.css(elem, "padding" + cssExpand[i], true, styles);
				}

				// At this point, extra isn't border nor margin, so remove border
				if (extra !== "margin") {
					val -= jQuery.css(elem, "border" + cssExpand[i] + "Width", true, styles);
				}
			} else {

				// At this point, extra isn't content, so add padding
				val += jQuery.css(elem, "padding" + cssExpand[i], true, styles);

				// At this point, extra isn't content nor padding, so add border
				if (extra !== "padding") {
					val += jQuery.css(elem, "border" + cssExpand[i] + "Width", true, styles);
				}
			}
		}

		return val;
	}

	function getWidthOrHeight(elem, name, extra) {

		// Start with offset property, which is equivalent to the border-box value
		var valueIsBorderBox = true,
		    val = name === "width" ? elem.offsetWidth : elem.offsetHeight,
		    styles = getStyles(elem),
		    isBorderBox = jQuery.css(elem, "boxSizing", false, styles) === "border-box";

		// Some non-html elements return undefined for offsetWidth, so check for null/undefined
		// svg - https://bugzilla.mozilla.org/show_bug.cgi?id=649285
		// MathML - https://bugzilla.mozilla.org/show_bug.cgi?id=491668
		if (val <= 0 || val == null) {

			// Fall back to computed then uncomputed css if necessary
			val = curCSS(elem, name, styles);
			if (val < 0 || val == null) {
				val = elem.style[name];
			}

			// Computed unit is not pixels. Stop here and return.
			if (rnumnonpx.test(val)) {
				return val;
			}

			// Check for style in case a browser which returns unreliable values
			// for getComputedStyle silently falls back to the reliable elem.style
			valueIsBorderBox = isBorderBox && (support.boxSizingReliable() || val === elem.style[name]);

			// Normalize "", auto, and prepare for extra
			val = parseFloat(val) || 0;
		}

		// Use the active box-sizing model to add/subtract irrelevant styles
		return val + augmentWidthOrHeight(elem, name, extra || (isBorderBox ? "border" : "content"), valueIsBorderBox, styles) + "px";
	}

	function showHide(elements, show) {
		var display,
		    elem,
		    hidden,
		    values = [],
		    index = 0,
		    length = elements.length;

		for (; index < length; index++) {
			elem = elements[index];
			if (!elem.style) {
				continue;
			}

			values[index] = dataPriv.get(elem, "olddisplay");
			display = elem.style.display;
			if (show) {

				// Reset the inline display of this element to learn if it is
				// being hidden by cascaded rules or not
				if (!values[index] && display === "none") {
					elem.style.display = "";
				}

				// Set elements which have been overridden with display: none
				// in a stylesheet to whatever the default browser style is
				// for such an element
				if (elem.style.display === "" && isHidden(elem)) {
					values[index] = dataPriv.access(elem, "olddisplay", defaultDisplay(elem.nodeName));
				}
			} else {
				hidden = isHidden(elem);

				if (display !== "none" || !hidden) {
					dataPriv.set(elem, "olddisplay", hidden ? display : jQuery.css(elem, "display"));
				}
			}
		}

		// Set the display of most of the elements in a second loop
		// to avoid the constant reflow
		for (index = 0; index < length; index++) {
			elem = elements[index];
			if (!elem.style) {
				continue;
			}
			if (!show || elem.style.display === "none" || elem.style.display === "") {
				elem.style.display = show ? values[index] || "" : "none";
			}
		}

		return elements;
	}

	jQuery.extend({

		// Add in style property hooks for overriding the default
		// behavior of getting and setting a style property
		cssHooks: {
			opacity: {
				get: function get(elem, computed) {
					if (computed) {

						// We should always get a number back from opacity
						var ret = curCSS(elem, "opacity");
						return ret === "" ? "1" : ret;
					}
				}
			}
		},

		// Don't automatically add "px" to these possibly-unitless properties
		cssNumber: {
			"animationIterationCount": true,
			"columnCount": true,
			"fillOpacity": true,
			"flexGrow": true,
			"flexShrink": true,
			"fontWeight": true,
			"lineHeight": true,
			"opacity": true,
			"order": true,
			"orphans": true,
			"widows": true,
			"zIndex": true,
			"zoom": true
		},

		// Add in properties whose names you wish to fix before
		// setting or getting the value
		cssProps: {
			"float": "cssFloat"
		},

		// Get and set the style property on a DOM Node
		style: function style(elem, name, value, extra) {

			// Don't set styles on text and comment nodes
			if (!elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style) {
				return;
			}

			// Make sure that we're working with the right name
			var ret,
			    type,
			    hooks,
			    origName = jQuery.camelCase(name),
			    style = elem.style;

			name = jQuery.cssProps[origName] || (jQuery.cssProps[origName] = vendorPropName(origName) || origName);

			// Gets hook for the prefixed version, then unprefixed version
			hooks = jQuery.cssHooks[name] || jQuery.cssHooks[origName];

			// Check if we're setting a value
			if (value !== undefined) {
				type = typeof value === "undefined" ? "undefined" : _typeof(value);

				// Convert "+=" or "-=" to relative numbers (#7345)
				if (type === "string" && (ret = rcssNum.exec(value)) && ret[1]) {
					value = adjustCSS(elem, name, ret);

					// Fixes bug #9237
					type = "number";
				}

				// Make sure that null and NaN values aren't set (#7116)
				if (value == null || value !== value) {
					return;
				}

				// If a number was passed in, add the unit (except for certain CSS properties)
				if (type === "number") {
					value += ret && ret[3] || (jQuery.cssNumber[origName] ? "" : "px");
				}

				// Support: IE9-11+
				// background-* props affect original clone's values
				if (!support.clearCloneStyle && value === "" && name.indexOf("background") === 0) {
					style[name] = "inherit";
				}

				// If a hook was provided, use that value, otherwise just set the specified value
				if (!hooks || !("set" in hooks) || (value = hooks.set(elem, value, extra)) !== undefined) {

					style[name] = value;
				}
			} else {

				// If a hook was provided get the non-computed value from there
				if (hooks && "get" in hooks && (ret = hooks.get(elem, false, extra)) !== undefined) {

					return ret;
				}

				// Otherwise just get the value from the style object
				return style[name];
			}
		},

		css: function css(elem, name, extra, styles) {
			var val,
			    num,
			    hooks,
			    origName = jQuery.camelCase(name);

			// Make sure that we're working with the right name
			name = jQuery.cssProps[origName] || (jQuery.cssProps[origName] = vendorPropName(origName) || origName);

			// Try prefixed name followed by the unprefixed name
			hooks = jQuery.cssHooks[name] || jQuery.cssHooks[origName];

			// If a hook was provided get the computed value from there
			if (hooks && "get" in hooks) {
				val = hooks.get(elem, true, extra);
			}

			// Otherwise, if a way to get the computed value exists, use that
			if (val === undefined) {
				val = curCSS(elem, name, styles);
			}

			// Convert "normal" to computed value
			if (val === "normal" && name in cssNormalTransform) {
				val = cssNormalTransform[name];
			}

			// Make numeric if forced or a qualifier was provided and val looks numeric
			if (extra === "" || extra) {
				num = parseFloat(val);
				return extra === true || isFinite(num) ? num || 0 : val;
			}
			return val;
		}
	});

	jQuery.each(["height", "width"], function (i, name) {
		jQuery.cssHooks[name] = {
			get: function get(elem, computed, extra) {
				if (computed) {

					// Certain elements can have dimension info if we invisibly show them
					// but it must have a current display style that would benefit
					return rdisplayswap.test(jQuery.css(elem, "display")) && elem.offsetWidth === 0 ? swap(elem, cssShow, function () {
						return getWidthOrHeight(elem, name, extra);
					}) : getWidthOrHeight(elem, name, extra);
				}
			},

			set: function set(elem, value, extra) {
				var matches,
				    styles = extra && getStyles(elem),
				    subtract = extra && augmentWidthOrHeight(elem, name, extra, jQuery.css(elem, "boxSizing", false, styles) === "border-box", styles);

				// Convert to pixels if value adjustment is needed
				if (subtract && (matches = rcssNum.exec(value)) && (matches[3] || "px") !== "px") {

					elem.style[name] = value;
					value = jQuery.css(elem, name);
				}

				return setPositiveNumber(elem, value, subtract);
			}
		};
	});

	jQuery.cssHooks.marginLeft = addGetHookIf(support.reliableMarginLeft, function (elem, computed) {
		if (computed) {
			return (parseFloat(curCSS(elem, "marginLeft")) || elem.getBoundingClientRect().left - swap(elem, { marginLeft: 0 }, function () {
				return elem.getBoundingClientRect().left;
			})) + "px";
		}
	});

	// Support: Android 2.3
	jQuery.cssHooks.marginRight = addGetHookIf(support.reliableMarginRight, function (elem, computed) {
		if (computed) {
			return swap(elem, { "display": "inline-block" }, curCSS, [elem, "marginRight"]);
		}
	});

	// These hooks are used by animate to expand properties
	jQuery.each({
		margin: "",
		padding: "",
		border: "Width"
	}, function (prefix, suffix) {
		jQuery.cssHooks[prefix + suffix] = {
			expand: function expand(value) {
				var i = 0,
				    expanded = {},


				// Assumes a single number if not a string
				parts = typeof value === "string" ? value.split(" ") : [value];

				for (; i < 4; i++) {
					expanded[prefix + cssExpand[i] + suffix] = parts[i] || parts[i - 2] || parts[0];
				}

				return expanded;
			}
		};

		if (!rmargin.test(prefix)) {
			jQuery.cssHooks[prefix + suffix].set = setPositiveNumber;
		}
	});

	jQuery.fn.extend({
		css: function css(name, value) {
			return access(this, function (elem, name, value) {
				var styles,
				    len,
				    map = {},
				    i = 0;

				if (jQuery.isArray(name)) {
					styles = getStyles(elem);
					len = name.length;

					for (; i < len; i++) {
						map[name[i]] = jQuery.css(elem, name[i], false, styles);
					}

					return map;
				}

				return value !== undefined ? jQuery.style(elem, name, value) : jQuery.css(elem, name);
			}, name, value, arguments.length > 1);
		},
		show: function show() {
			return showHide(this, true);
		},
		hide: function hide() {
			return showHide(this);
		},
		toggle: function toggle(state) {
			if (typeof state === "boolean") {
				return state ? this.show() : this.hide();
			}

			return this.each(function () {
				if (isHidden(this)) {
					jQuery(this).show();
				} else {
					jQuery(this).hide();
				}
			});
		}
	});

	function Tween(elem, options, prop, end, easing) {
		return new Tween.prototype.init(elem, options, prop, end, easing);
	}
	jQuery.Tween = Tween;

	Tween.prototype = {
		constructor: Tween,
		init: function init(elem, options, prop, end, easing, unit) {
			this.elem = elem;
			this.prop = prop;
			this.easing = easing || jQuery.easing._default;
			this.options = options;
			this.start = this.now = this.cur();
			this.end = end;
			this.unit = unit || (jQuery.cssNumber[prop] ? "" : "px");
		},
		cur: function cur() {
			var hooks = Tween.propHooks[this.prop];

			return hooks && hooks.get ? hooks.get(this) : Tween.propHooks._default.get(this);
		},
		run: function run(percent) {
			var eased,
			    hooks = Tween.propHooks[this.prop];

			if (this.options.duration) {
				this.pos = eased = jQuery.easing[this.easing](percent, this.options.duration * percent, 0, 1, this.options.duration);
			} else {
				this.pos = eased = percent;
			}
			this.now = (this.end - this.start) * eased + this.start;

			if (this.options.step) {
				this.options.step.call(this.elem, this.now, this);
			}

			if (hooks && hooks.set) {
				hooks.set(this);
			} else {
				Tween.propHooks._default.set(this);
			}
			return this;
		}
	};

	Tween.prototype.init.prototype = Tween.prototype;

	Tween.propHooks = {
		_default: {
			get: function get(tween) {
				var result;

				// Use a property on the element directly when it is not a DOM element,
				// or when there is no matching style property that exists.
				if (tween.elem.nodeType !== 1 || tween.elem[tween.prop] != null && tween.elem.style[tween.prop] == null) {
					return tween.elem[tween.prop];
				}

				// Passing an empty string as a 3rd parameter to .css will automatically
				// attempt a parseFloat and fallback to a string if the parse fails.
				// Simple values such as "10px" are parsed to Float;
				// complex values such as "rotate(1rad)" are returned as-is.
				result = jQuery.css(tween.elem, tween.prop, "");

				// Empty strings, null, undefined and "auto" are converted to 0.
				return !result || result === "auto" ? 0 : result;
			},
			set: function set(tween) {

				// Use step hook for back compat.
				// Use cssHook if its there.
				// Use .style if available and use plain properties where available.
				if (jQuery.fx.step[tween.prop]) {
					jQuery.fx.step[tween.prop](tween);
				} else if (tween.elem.nodeType === 1 && (tween.elem.style[jQuery.cssProps[tween.prop]] != null || jQuery.cssHooks[tween.prop])) {
					jQuery.style(tween.elem, tween.prop, tween.now + tween.unit);
				} else {
					tween.elem[tween.prop] = tween.now;
				}
			}
		}
	};

	// Support: IE9
	// Panic based approach to setting things on disconnected nodes
	Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
		set: function set(tween) {
			if (tween.elem.nodeType && tween.elem.parentNode) {
				tween.elem[tween.prop] = tween.now;
			}
		}
	};

	jQuery.easing = {
		linear: function linear(p) {
			return p;
		},
		swing: function swing(p) {
			return 0.5 - Math.cos(p * Math.PI) / 2;
		},
		_default: "swing"
	};

	jQuery.fx = Tween.prototype.init;

	// Back Compat <1.8 extension point
	jQuery.fx.step = {};

	var fxNow,
	    timerId,
	    rfxtypes = /^(?:toggle|show|hide)$/,
	    rrun = /queueHooks$/;

	// Animations created synchronously will run synchronously
	function createFxNow() {
		window.setTimeout(function () {
			fxNow = undefined;
		});
		return fxNow = jQuery.now();
	}

	// Generate parameters to create a standard animation
	function genFx(type, includeWidth) {
		var which,
		    i = 0,
		    attrs = { height: type };

		// If we include width, step value is 1 to do all cssExpand values,
		// otherwise step value is 2 to skip over Left and Right
		includeWidth = includeWidth ? 1 : 0;
		for (; i < 4; i += 2 - includeWidth) {
			which = cssExpand[i];
			attrs["margin" + which] = attrs["padding" + which] = type;
		}

		if (includeWidth) {
			attrs.opacity = attrs.width = type;
		}

		return attrs;
	}

	function createTween(value, prop, animation) {
		var tween,
		    collection = (Animation.tweeners[prop] || []).concat(Animation.tweeners["*"]),
		    index = 0,
		    length = collection.length;
		for (; index < length; index++) {
			if (tween = collection[index].call(animation, prop, value)) {

				// We're done with this property
				return tween;
			}
		}
	}

	function defaultPrefilter(elem, props, opts) {
		/* jshint validthis: true */
		var prop,
		    value,
		    toggle,
		    tween,
		    hooks,
		    oldfire,
		    display,
		    checkDisplay,
		    anim = this,
		    orig = {},
		    style = elem.style,
		    hidden = elem.nodeType && isHidden(elem),
		    dataShow = dataPriv.get(elem, "fxshow");

		// Handle queue: false promises
		if (!opts.queue) {
			hooks = jQuery._queueHooks(elem, "fx");
			if (hooks.unqueued == null) {
				hooks.unqueued = 0;
				oldfire = hooks.empty.fire;
				hooks.empty.fire = function () {
					if (!hooks.unqueued) {
						oldfire();
					}
				};
			}
			hooks.unqueued++;

			anim.always(function () {

				// Ensure the complete handler is called before this completes
				anim.always(function () {
					hooks.unqueued--;
					if (!jQuery.queue(elem, "fx").length) {
						hooks.empty.fire();
					}
				});
			});
		}

		// Height/width overflow pass
		if (elem.nodeType === 1 && ("height" in props || "width" in props)) {

			// Make sure that nothing sneaks out
			// Record all 3 overflow attributes because IE9-10 do not
			// change the overflow attribute when overflowX and
			// overflowY are set to the same value
			opts.overflow = [style.overflow, style.overflowX, style.overflowY];

			// Set display property to inline-block for height/width
			// animations on inline elements that are having width/height animated
			display = jQuery.css(elem, "display");

			// Test default display if display is currently "none"
			checkDisplay = display === "none" ? dataPriv.get(elem, "olddisplay") || defaultDisplay(elem.nodeName) : display;

			if (checkDisplay === "inline" && jQuery.css(elem, "float") === "none") {
				style.display = "inline-block";
			}
		}

		if (opts.overflow) {
			style.overflow = "hidden";
			anim.always(function () {
				style.overflow = opts.overflow[0];
				style.overflowX = opts.overflow[1];
				style.overflowY = opts.overflow[2];
			});
		}

		// show/hide pass
		for (prop in props) {
			value = props[prop];
			if (rfxtypes.exec(value)) {
				delete props[prop];
				toggle = toggle || value === "toggle";
				if (value === (hidden ? "hide" : "show")) {

					// If there is dataShow left over from a stopped hide or show
					// and we are going to proceed with show, we should pretend to be hidden
					if (value === "show" && dataShow && dataShow[prop] !== undefined) {
						hidden = true;
					} else {
						continue;
					}
				}
				orig[prop] = dataShow && dataShow[prop] || jQuery.style(elem, prop);

				// Any non-fx value stops us from restoring the original display value
			} else {
				display = undefined;
			}
		}

		if (!jQuery.isEmptyObject(orig)) {
			if (dataShow) {
				if ("hidden" in dataShow) {
					hidden = dataShow.hidden;
				}
			} else {
				dataShow = dataPriv.access(elem, "fxshow", {});
			}

			// Store state if its toggle - enables .stop().toggle() to "reverse"
			if (toggle) {
				dataShow.hidden = !hidden;
			}
			if (hidden) {
				jQuery(elem).show();
			} else {
				anim.done(function () {
					jQuery(elem).hide();
				});
			}
			anim.done(function () {
				var prop;

				dataPriv.remove(elem, "fxshow");
				for (prop in orig) {
					jQuery.style(elem, prop, orig[prop]);
				}
			});
			for (prop in orig) {
				tween = createTween(hidden ? dataShow[prop] : 0, prop, anim);

				if (!(prop in dataShow)) {
					dataShow[prop] = tween.start;
					if (hidden) {
						tween.end = tween.start;
						tween.start = prop === "width" || prop === "height" ? 1 : 0;
					}
				}
			}

			// If this is a noop like .hide().hide(), restore an overwritten display value
		} else if ((display === "none" ? defaultDisplay(elem.nodeName) : display) === "inline") {
			style.display = display;
		}
	}

	function propFilter(props, specialEasing) {
		var index, name, easing, value, hooks;

		// camelCase, specialEasing and expand cssHook pass
		for (index in props) {
			name = jQuery.camelCase(index);
			easing = specialEasing[name];
			value = props[index];
			if (jQuery.isArray(value)) {
				easing = value[1];
				value = props[index] = value[0];
			}

			if (index !== name) {
				props[name] = value;
				delete props[index];
			}

			hooks = jQuery.cssHooks[name];
			if (hooks && "expand" in hooks) {
				value = hooks.expand(value);
				delete props[name];

				// Not quite $.extend, this won't overwrite existing keys.
				// Reusing 'index' because we have the correct "name"
				for (index in value) {
					if (!(index in props)) {
						props[index] = value[index];
						specialEasing[index] = easing;
					}
				}
			} else {
				specialEasing[name] = easing;
			}
		}
	}

	function Animation(elem, properties, options) {
		var result,
		    stopped,
		    index = 0,
		    length = Animation.prefilters.length,
		    deferred = jQuery.Deferred().always(function () {

			// Don't match elem in the :animated selector
			delete tick.elem;
		}),
		    tick = function tick() {
			if (stopped) {
				return false;
			}
			var currentTime = fxNow || createFxNow(),
			    remaining = Math.max(0, animation.startTime + animation.duration - currentTime),


			// Support: Android 2.3
			// Archaic crash bug won't allow us to use `1 - ( 0.5 || 0 )` (#12497)
			temp = remaining / animation.duration || 0,
			    percent = 1 - temp,
			    index = 0,
			    length = animation.tweens.length;

			for (; index < length; index++) {
				animation.tweens[index].run(percent);
			}

			deferred.notifyWith(elem, [animation, percent, remaining]);

			if (percent < 1 && length) {
				return remaining;
			} else {
				deferred.resolveWith(elem, [animation]);
				return false;
			}
		},
		    animation = deferred.promise({
			elem: elem,
			props: jQuery.extend({}, properties),
			opts: jQuery.extend(true, {
				specialEasing: {},
				easing: jQuery.easing._default
			}, options),
			originalProperties: properties,
			originalOptions: options,
			startTime: fxNow || createFxNow(),
			duration: options.duration,
			tweens: [],
			createTween: function createTween(prop, end) {
				var tween = jQuery.Tween(elem, animation.opts, prop, end, animation.opts.specialEasing[prop] || animation.opts.easing);
				animation.tweens.push(tween);
				return tween;
			},
			stop: function stop(gotoEnd) {
				var index = 0,


				// If we are going to the end, we want to run all the tweens
				// otherwise we skip this part
				length = gotoEnd ? animation.tweens.length : 0;
				if (stopped) {
					return this;
				}
				stopped = true;
				for (; index < length; index++) {
					animation.tweens[index].run(1);
				}

				// Resolve when we played the last frame; otherwise, reject
				if (gotoEnd) {
					deferred.notifyWith(elem, [animation, 1, 0]);
					deferred.resolveWith(elem, [animation, gotoEnd]);
				} else {
					deferred.rejectWith(elem, [animation, gotoEnd]);
				}
				return this;
			}
		}),
		    props = animation.props;

		propFilter(props, animation.opts.specialEasing);

		for (; index < length; index++) {
			result = Animation.prefilters[index].call(animation, elem, props, animation.opts);
			if (result) {
				if (jQuery.isFunction(result.stop)) {
					jQuery._queueHooks(animation.elem, animation.opts.queue).stop = jQuery.proxy(result.stop, result);
				}
				return result;
			}
		}

		jQuery.map(props, createTween, animation);

		if (jQuery.isFunction(animation.opts.start)) {
			animation.opts.start.call(elem, animation);
		}

		jQuery.fx.timer(jQuery.extend(tick, {
			elem: elem,
			anim: animation,
			queue: animation.opts.queue
		}));

		// attach callbacks from options
		return animation.progress(animation.opts.progress).done(animation.opts.done, animation.opts.complete).fail(animation.opts.fail).always(animation.opts.always);
	}

	jQuery.Animation = jQuery.extend(Animation, {
		tweeners: {
			"*": [function (prop, value) {
				var tween = this.createTween(prop, value);
				adjustCSS(tween.elem, prop, rcssNum.exec(value), tween);
				return tween;
			}]
		},

		tweener: function tweener(props, callback) {
			if (jQuery.isFunction(props)) {
				callback = props;
				props = ["*"];
			} else {
				props = props.match(rnotwhite);
			}

			var prop,
			    index = 0,
			    length = props.length;

			for (; index < length; index++) {
				prop = props[index];
				Animation.tweeners[prop] = Animation.tweeners[prop] || [];
				Animation.tweeners[prop].unshift(callback);
			}
		},

		prefilters: [defaultPrefilter],

		prefilter: function prefilter(callback, prepend) {
			if (prepend) {
				Animation.prefilters.unshift(callback);
			} else {
				Animation.prefilters.push(callback);
			}
		}
	});

	jQuery.speed = function (speed, easing, fn) {
		var opt = speed && (typeof speed === "undefined" ? "undefined" : _typeof(speed)) === "object" ? jQuery.extend({}, speed) : {
			complete: fn || !fn && easing || jQuery.isFunction(speed) && speed,
			duration: speed,
			easing: fn && easing || easing && !jQuery.isFunction(easing) && easing
		};

		opt.duration = jQuery.fx.off ? 0 : typeof opt.duration === "number" ? opt.duration : opt.duration in jQuery.fx.speeds ? jQuery.fx.speeds[opt.duration] : jQuery.fx.speeds._default;

		// Normalize opt.queue - true/undefined/null -> "fx"
		if (opt.queue == null || opt.queue === true) {
			opt.queue = "fx";
		}

		// Queueing
		opt.old = opt.complete;

		opt.complete = function () {
			if (jQuery.isFunction(opt.old)) {
				opt.old.call(this);
			}

			if (opt.queue) {
				jQuery.dequeue(this, opt.queue);
			}
		};

		return opt;
	};

	jQuery.fn.extend({
		fadeTo: function fadeTo(speed, to, easing, callback) {

			// Show any hidden elements after setting opacity to 0
			return this.filter(isHidden).css("opacity", 0).show()

			// Animate to the value specified
			.end().animate({ opacity: to }, speed, easing, callback);
		},
		animate: function animate(prop, speed, easing, callback) {
			var empty = jQuery.isEmptyObject(prop),
			    optall = jQuery.speed(speed, easing, callback),
			    doAnimation = function doAnimation() {

				// Operate on a copy of prop so per-property easing won't be lost
				var anim = Animation(this, jQuery.extend({}, prop), optall);

				// Empty animations, or finishing resolves immediately
				if (empty || dataPriv.get(this, "finish")) {
					anim.stop(true);
				}
			};
			doAnimation.finish = doAnimation;

			return empty || optall.queue === false ? this.each(doAnimation) : this.queue(optall.queue, doAnimation);
		},
		stop: function stop(type, clearQueue, gotoEnd) {
			var stopQueue = function stopQueue(hooks) {
				var stop = hooks.stop;
				delete hooks.stop;
				stop(gotoEnd);
			};

			if (typeof type !== "string") {
				gotoEnd = clearQueue;
				clearQueue = type;
				type = undefined;
			}
			if (clearQueue && type !== false) {
				this.queue(type || "fx", []);
			}

			return this.each(function () {
				var dequeue = true,
				    index = type != null && type + "queueHooks",
				    timers = jQuery.timers,
				    data = dataPriv.get(this);

				if (index) {
					if (data[index] && data[index].stop) {
						stopQueue(data[index]);
					}
				} else {
					for (index in data) {
						if (data[index] && data[index].stop && rrun.test(index)) {
							stopQueue(data[index]);
						}
					}
				}

				for (index = timers.length; index--;) {
					if (timers[index].elem === this && (type == null || timers[index].queue === type)) {

						timers[index].anim.stop(gotoEnd);
						dequeue = false;
						timers.splice(index, 1);
					}
				}

				// Start the next in the queue if the last step wasn't forced.
				// Timers currently will call their complete callbacks, which
				// will dequeue but only if they were gotoEnd.
				if (dequeue || !gotoEnd) {
					jQuery.dequeue(this, type);
				}
			});
		},
		finish: function finish(type) {
			if (type !== false) {
				type = type || "fx";
			}
			return this.each(function () {
				var index,
				    data = dataPriv.get(this),
				    queue = data[type + "queue"],
				    hooks = data[type + "queueHooks"],
				    timers = jQuery.timers,
				    length = queue ? queue.length : 0;

				// Enable finishing flag on private data
				data.finish = true;

				// Empty the queue first
				jQuery.queue(this, type, []);

				if (hooks && hooks.stop) {
					hooks.stop.call(this, true);
				}

				// Look for any active animations, and finish them
				for (index = timers.length; index--;) {
					if (timers[index].elem === this && timers[index].queue === type) {
						timers[index].anim.stop(true);
						timers.splice(index, 1);
					}
				}

				// Look for any animations in the old queue and finish them
				for (index = 0; index < length; index++) {
					if (queue[index] && queue[index].finish) {
						queue[index].finish.call(this);
					}
				}

				// Turn off finishing flag
				delete data.finish;
			});
		}
	});

	jQuery.each(["toggle", "show", "hide"], function (i, name) {
		var cssFn = jQuery.fn[name];
		jQuery.fn[name] = function (speed, easing, callback) {
			return speed == null || typeof speed === "boolean" ? cssFn.apply(this, arguments) : this.animate(genFx(name, true), speed, easing, callback);
		};
	});

	// Generate shortcuts for custom animations
	jQuery.each({
		slideDown: genFx("show"),
		slideUp: genFx("hide"),
		slideToggle: genFx("toggle"),
		fadeIn: { opacity: "show" },
		fadeOut: { opacity: "hide" },
		fadeToggle: { opacity: "toggle" }
	}, function (name, props) {
		jQuery.fn[name] = function (speed, easing, callback) {
			return this.animate(props, speed, easing, callback);
		};
	});

	jQuery.timers = [];
	jQuery.fx.tick = function () {
		var timer,
		    i = 0,
		    timers = jQuery.timers;

		fxNow = jQuery.now();

		for (; i < timers.length; i++) {
			timer = timers[i];

			// Checks the timer has not already been removed
			if (!timer() && timers[i] === timer) {
				timers.splice(i--, 1);
			}
		}

		if (!timers.length) {
			jQuery.fx.stop();
		}
		fxNow = undefined;
	};

	jQuery.fx.timer = function (timer) {
		jQuery.timers.push(timer);
		if (timer()) {
			jQuery.fx.start();
		} else {
			jQuery.timers.pop();
		}
	};

	jQuery.fx.interval = 13;
	jQuery.fx.start = function () {
		if (!timerId) {
			timerId = window.setInterval(jQuery.fx.tick, jQuery.fx.interval);
		}
	};

	jQuery.fx.stop = function () {
		window.clearInterval(timerId);

		timerId = null;
	};

	jQuery.fx.speeds = {
		slow: 600,
		fast: 200,

		// Default speed
		_default: 400
	};

	// Based off of the plugin by Clint Helfers, with permission.
	// http://web.archive.org/web/20100324014747/http://blindsignals.com/index.php/2009/07/jquery-delay/
	jQuery.fn.delay = function (time, type) {
		time = jQuery.fx ? jQuery.fx.speeds[time] || time : time;
		type = type || "fx";

		return this.queue(type, function (next, hooks) {
			var timeout = window.setTimeout(next, time);
			hooks.stop = function () {
				window.clearTimeout(timeout);
			};
		});
	};

	(function () {
		var input = document.createElement("input"),
		    select = document.createElement("select"),
		    opt = select.appendChild(document.createElement("option"));

		input.type = "checkbox";

		// Support: iOS<=5.1, Android<=4.2+
		// Default value for a checkbox should be "on"
		support.checkOn = input.value !== "";

		// Support: IE<=11+
		// Must access selectedIndex to make default options select
		support.optSelected = opt.selected;

		// Support: Android<=2.3
		// Options inside disabled selects are incorrectly marked as disabled
		select.disabled = true;
		support.optDisabled = !opt.disabled;

		// Support: IE<=11+
		// An input loses its value after becoming a radio
		input = document.createElement("input");
		input.value = "t";
		input.type = "radio";
		support.radioValue = input.value === "t";
	})();

	var boolHook,
	    attrHandle = jQuery.expr.attrHandle;

	jQuery.fn.extend({
		attr: function attr(name, value) {
			return access(this, jQuery.attr, name, value, arguments.length > 1);
		},

		removeAttr: function removeAttr(name) {
			return this.each(function () {
				jQuery.removeAttr(this, name);
			});
		}
	});

	jQuery.extend({
		attr: function attr(elem, name, value) {
			var ret,
			    hooks,
			    nType = elem.nodeType;

			// Don't get/set attributes on text, comment and attribute nodes
			if (nType === 3 || nType === 8 || nType === 2) {
				return;
			}

			// Fallback to prop when attributes are not supported
			if (typeof elem.getAttribute === "undefined") {
				return jQuery.prop(elem, name, value);
			}

			// All attributes are lowercase
			// Grab necessary hook if one is defined
			if (nType !== 1 || !jQuery.isXMLDoc(elem)) {
				name = name.toLowerCase();
				hooks = jQuery.attrHooks[name] || (jQuery.expr.match.bool.test(name) ? boolHook : undefined);
			}

			if (value !== undefined) {
				if (value === null) {
					jQuery.removeAttr(elem, name);
					return;
				}

				if (hooks && "set" in hooks && (ret = hooks.set(elem, value, name)) !== undefined) {
					return ret;
				}

				elem.setAttribute(name, value + "");
				return value;
			}

			if (hooks && "get" in hooks && (ret = hooks.get(elem, name)) !== null) {
				return ret;
			}

			ret = jQuery.find.attr(elem, name);

			// Non-existent attributes return null, we normalize to undefined
			return ret == null ? undefined : ret;
		},

		attrHooks: {
			type: {
				set: function set(elem, value) {
					if (!support.radioValue && value === "radio" && jQuery.nodeName(elem, "input")) {
						var val = elem.value;
						elem.setAttribute("type", value);
						if (val) {
							elem.value = val;
						}
						return value;
					}
				}
			}
		},

		removeAttr: function removeAttr(elem, value) {
			var name,
			    propName,
			    i = 0,
			    attrNames = value && value.match(rnotwhite);

			if (attrNames && elem.nodeType === 1) {
				while (name = attrNames[i++]) {
					propName = jQuery.propFix[name] || name;

					// Boolean attributes get special treatment (#10870)
					if (jQuery.expr.match.bool.test(name)) {

						// Set corresponding property to false
						elem[propName] = false;
					}

					elem.removeAttribute(name);
				}
			}
		}
	});

	// Hooks for boolean attributes
	boolHook = {
		set: function set(elem, value, name) {
			if (value === false) {

				// Remove boolean attributes when set to false
				jQuery.removeAttr(elem, name);
			} else {
				elem.setAttribute(name, name);
			}
			return name;
		}
	};
	jQuery.each(jQuery.expr.match.bool.source.match(/\w+/g), function (i, name) {
		var getter = attrHandle[name] || jQuery.find.attr;

		attrHandle[name] = function (elem, name, isXML) {
			var ret, handle;
			if (!isXML) {

				// Avoid an infinite loop by temporarily removing this function from the getter
				handle = attrHandle[name];
				attrHandle[name] = ret;
				ret = getter(elem, name, isXML) != null ? name.toLowerCase() : null;
				attrHandle[name] = handle;
			}
			return ret;
		};
	});

	var rfocusable = /^(?:input|select|textarea|button)$/i,
	    rclickable = /^(?:a|area)$/i;

	jQuery.fn.extend({
		prop: function prop(name, value) {
			return access(this, jQuery.prop, name, value, arguments.length > 1);
		},

		removeProp: function removeProp(name) {
			return this.each(function () {
				delete this[jQuery.propFix[name] || name];
			});
		}
	});

	jQuery.extend({
		prop: function prop(elem, name, value) {
			var ret,
			    hooks,
			    nType = elem.nodeType;

			// Don't get/set properties on text, comment and attribute nodes
			if (nType === 3 || nType === 8 || nType === 2) {
				return;
			}

			if (nType !== 1 || !jQuery.isXMLDoc(elem)) {

				// Fix name and attach hooks
				name = jQuery.propFix[name] || name;
				hooks = jQuery.propHooks[name];
			}

			if (value !== undefined) {
				if (hooks && "set" in hooks && (ret = hooks.set(elem, value, name)) !== undefined) {
					return ret;
				}

				return elem[name] = value;
			}

			if (hooks && "get" in hooks && (ret = hooks.get(elem, name)) !== null) {
				return ret;
			}

			return elem[name];
		},

		propHooks: {
			tabIndex: {
				get: function get(elem) {

					// elem.tabIndex doesn't always return the
					// correct value when it hasn't been explicitly set
					// http://fluidproject.org/blog/2008/01/09/getting-setting-and-removing-tabindex-values-with-javascript/
					// Use proper attribute retrieval(#12072)
					var tabindex = jQuery.find.attr(elem, "tabindex");

					return tabindex ? parseInt(tabindex, 10) : rfocusable.test(elem.nodeName) || rclickable.test(elem.nodeName) && elem.href ? 0 : -1;
				}
			}
		},

		propFix: {
			"for": "htmlFor",
			"class": "className"
		}
	});

	// Support: IE <=11 only
	// Accessing the selectedIndex property
	// forces the browser to respect setting selected
	// on the option
	// The getter ensures a default option is selected
	// when in an optgroup
	if (!support.optSelected) {
		jQuery.propHooks.selected = {
			get: function get(elem) {
				var parent = elem.parentNode;
				if (parent && parent.parentNode) {
					parent.parentNode.selectedIndex;
				}
				return null;
			},
			set: function set(elem) {
				var parent = elem.parentNode;
				if (parent) {
					parent.selectedIndex;

					if (parent.parentNode) {
						parent.parentNode.selectedIndex;
					}
				}
			}
		};
	}

	jQuery.each(["tabIndex", "readOnly", "maxLength", "cellSpacing", "cellPadding", "rowSpan", "colSpan", "useMap", "frameBorder", "contentEditable"], function () {
		jQuery.propFix[this.toLowerCase()] = this;
	});

	var rclass = /[\t\r\n\f]/g;

	function getClass(elem) {
		return elem.getAttribute && elem.getAttribute("class") || "";
	}

	jQuery.fn.extend({
		addClass: function addClass(value) {
			var classes,
			    elem,
			    cur,
			    curValue,
			    clazz,
			    j,
			    finalValue,
			    i = 0;

			if (jQuery.isFunction(value)) {
				return this.each(function (j) {
					jQuery(this).addClass(value.call(this, j, getClass(this)));
				});
			}

			if (typeof value === "string" && value) {
				classes = value.match(rnotwhite) || [];

				while (elem = this[i++]) {
					curValue = getClass(elem);
					cur = elem.nodeType === 1 && (" " + curValue + " ").replace(rclass, " ");

					if (cur) {
						j = 0;
						while (clazz = classes[j++]) {
							if (cur.indexOf(" " + clazz + " ") < 0) {
								cur += clazz + " ";
							}
						}

						// Only assign if different to avoid unneeded rendering.
						finalValue = jQuery.trim(cur);
						if (curValue !== finalValue) {
							elem.setAttribute("class", finalValue);
						}
					}
				}
			}

			return this;
		},

		removeClass: function removeClass(value) {
			var classes,
			    elem,
			    cur,
			    curValue,
			    clazz,
			    j,
			    finalValue,
			    i = 0;

			if (jQuery.isFunction(value)) {
				return this.each(function (j) {
					jQuery(this).removeClass(value.call(this, j, getClass(this)));
				});
			}

			if (!arguments.length) {
				return this.attr("class", "");
			}

			if (typeof value === "string" && value) {
				classes = value.match(rnotwhite) || [];

				while (elem = this[i++]) {
					curValue = getClass(elem);

					// This expression is here for better compressibility (see addClass)
					cur = elem.nodeType === 1 && (" " + curValue + " ").replace(rclass, " ");

					if (cur) {
						j = 0;
						while (clazz = classes[j++]) {

							// Remove *all* instances
							while (cur.indexOf(" " + clazz + " ") > -1) {
								cur = cur.replace(" " + clazz + " ", " ");
							}
						}

						// Only assign if different to avoid unneeded rendering.
						finalValue = jQuery.trim(cur);
						if (curValue !== finalValue) {
							elem.setAttribute("class", finalValue);
						}
					}
				}
			}

			return this;
		},

		toggleClass: function toggleClass(value, stateVal) {
			var type = typeof value === "undefined" ? "undefined" : _typeof(value);

			if (typeof stateVal === "boolean" && type === "string") {
				return stateVal ? this.addClass(value) : this.removeClass(value);
			}

			if (jQuery.isFunction(value)) {
				return this.each(function (i) {
					jQuery(this).toggleClass(value.call(this, i, getClass(this), stateVal), stateVal);
				});
			}

			return this.each(function () {
				var className, i, self, classNames;

				if (type === "string") {

					// Toggle individual class names
					i = 0;
					self = jQuery(this);
					classNames = value.match(rnotwhite) || [];

					while (className = classNames[i++]) {

						// Check each className given, space separated list
						if (self.hasClass(className)) {
							self.removeClass(className);
						} else {
							self.addClass(className);
						}
					}

					// Toggle whole class name
				} else if (value === undefined || type === "boolean") {
					className = getClass(this);
					if (className) {

						// Store className if set
						dataPriv.set(this, "__className__", className);
					}

					// If the element has a class name or if we're passed `false`,
					// then remove the whole classname (if there was one, the above saved it).
					// Otherwise bring back whatever was previously saved (if anything),
					// falling back to the empty string if nothing was stored.
					if (this.setAttribute) {
						this.setAttribute("class", className || value === false ? "" : dataPriv.get(this, "__className__") || "");
					}
				}
			});
		},

		hasClass: function hasClass(selector) {
			var className,
			    elem,
			    i = 0;

			className = " " + selector + " ";
			while (elem = this[i++]) {
				if (elem.nodeType === 1 && (" " + getClass(elem) + " ").replace(rclass, " ").indexOf(className) > -1) {
					return true;
				}
			}

			return false;
		}
	});

	var rreturn = /\r/g,
	    rspaces = /[\x20\t\r\n\f]+/g;

	jQuery.fn.extend({
		val: function val(value) {
			var hooks,
			    ret,
			    isFunction,
			    elem = this[0];

			if (!arguments.length) {
				if (elem) {
					hooks = jQuery.valHooks[elem.type] || jQuery.valHooks[elem.nodeName.toLowerCase()];

					if (hooks && "get" in hooks && (ret = hooks.get(elem, "value")) !== undefined) {
						return ret;
					}

					ret = elem.value;

					return typeof ret === "string" ?

					// Handle most common string cases
					ret.replace(rreturn, "") :

					// Handle cases where value is null/undef or number
					ret == null ? "" : ret;
				}

				return;
			}

			isFunction = jQuery.isFunction(value);

			return this.each(function (i) {
				var val;

				if (this.nodeType !== 1) {
					return;
				}

				if (isFunction) {
					val = value.call(this, i, jQuery(this).val());
				} else {
					val = value;
				}

				// Treat null/undefined as ""; convert numbers to string
				if (val == null) {
					val = "";
				} else if (typeof val === "number") {
					val += "";
				} else if (jQuery.isArray(val)) {
					val = jQuery.map(val, function (value) {
						return value == null ? "" : value + "";
					});
				}

				hooks = jQuery.valHooks[this.type] || jQuery.valHooks[this.nodeName.toLowerCase()];

				// If set returns undefined, fall back to normal setting
				if (!hooks || !("set" in hooks) || hooks.set(this, val, "value") === undefined) {
					this.value = val;
				}
			});
		}
	});

	jQuery.extend({
		valHooks: {
			option: {
				get: function get(elem) {

					var val = jQuery.find.attr(elem, "value");
					return val != null ? val :

					// Support: IE10-11+
					// option.text throws exceptions (#14686, #14858)
					// Strip and collapse whitespace
					// https://html.spec.whatwg.org/#strip-and-collapse-whitespace
					jQuery.trim(jQuery.text(elem)).replace(rspaces, " ");
				}
			},
			select: {
				get: function get(elem) {
					var value,
					    option,
					    options = elem.options,
					    index = elem.selectedIndex,
					    one = elem.type === "select-one" || index < 0,
					    values = one ? null : [],
					    max = one ? index + 1 : options.length,
					    i = index < 0 ? max : one ? index : 0;

					// Loop through all the selected options
					for (; i < max; i++) {
						option = options[i];

						// IE8-9 doesn't update selected after form reset (#2551)
						if ((option.selected || i === index) && (

						// Don't return options that are disabled or in a disabled optgroup
						support.optDisabled ? !option.disabled : option.getAttribute("disabled") === null) && (!option.parentNode.disabled || !jQuery.nodeName(option.parentNode, "optgroup"))) {

							// Get the specific value for the option
							value = jQuery(option).val();

							// We don't need an array for one selects
							if (one) {
								return value;
							}

							// Multi-Selects return an array
							values.push(value);
						}
					}

					return values;
				},

				set: function set(elem, value) {
					var optionSet,
					    option,
					    options = elem.options,
					    values = jQuery.makeArray(value),
					    i = options.length;

					while (i--) {
						option = options[i];
						if (option.selected = jQuery.inArray(jQuery.valHooks.option.get(option), values) > -1) {
							optionSet = true;
						}
					}

					// Force browsers to behave consistently when non-matching value is set
					if (!optionSet) {
						elem.selectedIndex = -1;
					}
					return values;
				}
			}
		}
	});

	// Radios and checkboxes getter/setter
	jQuery.each(["radio", "checkbox"], function () {
		jQuery.valHooks[this] = {
			set: function set(elem, value) {
				if (jQuery.isArray(value)) {
					return elem.checked = jQuery.inArray(jQuery(elem).val(), value) > -1;
				}
			}
		};
		if (!support.checkOn) {
			jQuery.valHooks[this].get = function (elem) {
				return elem.getAttribute("value") === null ? "on" : elem.value;
			};
		}
	});

	// Return jQuery for attributes-only inclusion


	var rfocusMorph = /^(?:focusinfocus|focusoutblur)$/;

	jQuery.extend(jQuery.event, {

		trigger: function trigger(event, data, elem, onlyHandlers) {

			var i,
			    cur,
			    tmp,
			    bubbleType,
			    ontype,
			    handle,
			    special,
			    eventPath = [elem || document],
			    type = hasOwn.call(event, "type") ? event.type : event,
			    namespaces = hasOwn.call(event, "namespace") ? event.namespace.split(".") : [];

			cur = tmp = elem = elem || document;

			// Don't do events on text and comment nodes
			if (elem.nodeType === 3 || elem.nodeType === 8) {
				return;
			}

			// focus/blur morphs to focusin/out; ensure we're not firing them right now
			if (rfocusMorph.test(type + jQuery.event.triggered)) {
				return;
			}

			if (type.indexOf(".") > -1) {

				// Namespaced trigger; create a regexp to match event type in handle()
				namespaces = type.split(".");
				type = namespaces.shift();
				namespaces.sort();
			}
			ontype = type.indexOf(":") < 0 && "on" + type;

			// Caller can pass in a jQuery.Event object, Object, or just an event type string
			event = event[jQuery.expando] ? event : new jQuery.Event(type, (typeof event === "undefined" ? "undefined" : _typeof(event)) === "object" && event);

			// Trigger bitmask: & 1 for native handlers; & 2 for jQuery (always true)
			event.isTrigger = onlyHandlers ? 2 : 3;
			event.namespace = namespaces.join(".");
			event.rnamespace = event.namespace ? new RegExp("(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)") : null;

			// Clean up the event in case it is being reused
			event.result = undefined;
			if (!event.target) {
				event.target = elem;
			}

			// Clone any incoming data and prepend the event, creating the handler arg list
			data = data == null ? [event] : jQuery.makeArray(data, [event]);

			// Allow special events to draw outside the lines
			special = jQuery.event.special[type] || {};
			if (!onlyHandlers && special.trigger && special.trigger.apply(elem, data) === false) {
				return;
			}

			// Determine event propagation path in advance, per W3C events spec (#9951)
			// Bubble up to document, then to window; watch for a global ownerDocument var (#9724)
			if (!onlyHandlers && !special.noBubble && !jQuery.isWindow(elem)) {

				bubbleType = special.delegateType || type;
				if (!rfocusMorph.test(bubbleType + type)) {
					cur = cur.parentNode;
				}
				for (; cur; cur = cur.parentNode) {
					eventPath.push(cur);
					tmp = cur;
				}

				// Only add window if we got to document (e.g., not plain obj or detached DOM)
				if (tmp === (elem.ownerDocument || document)) {
					eventPath.push(tmp.defaultView || tmp.parentWindow || window);
				}
			}

			// Fire handlers on the event path
			i = 0;
			while ((cur = eventPath[i++]) && !event.isPropagationStopped()) {

				event.type = i > 1 ? bubbleType : special.bindType || type;

				// jQuery handler
				handle = (dataPriv.get(cur, "events") || {})[event.type] && dataPriv.get(cur, "handle");
				if (handle) {
					handle.apply(cur, data);
				}

				// Native handler
				handle = ontype && cur[ontype];
				if (handle && handle.apply && acceptData(cur)) {
					event.result = handle.apply(cur, data);
					if (event.result === false) {
						event.preventDefault();
					}
				}
			}
			event.type = type;

			// If nobody prevented the default action, do it now
			if (!onlyHandlers && !event.isDefaultPrevented()) {

				if ((!special._default || special._default.apply(eventPath.pop(), data) === false) && acceptData(elem)) {

					// Call a native DOM method on the target with the same name name as the event.
					// Don't do default actions on window, that's where global variables be (#6170)
					if (ontype && jQuery.isFunction(elem[type]) && !jQuery.isWindow(elem)) {

						// Don't re-trigger an onFOO event when we call its FOO() method
						tmp = elem[ontype];

						if (tmp) {
							elem[ontype] = null;
						}

						// Prevent re-triggering of the same event, since we already bubbled it above
						jQuery.event.triggered = type;
						elem[type]();
						jQuery.event.triggered = undefined;

						if (tmp) {
							elem[ontype] = tmp;
						}
					}
				}
			}

			return event.result;
		},

		// Piggyback on a donor event to simulate a different one
		// Used only for `focus(in | out)` events
		simulate: function simulate(type, elem, event) {
			var e = jQuery.extend(new jQuery.Event(), event, {
				type: type,
				isSimulated: true
			});

			jQuery.event.trigger(e, null, elem);
		}

	});

	jQuery.fn.extend({

		trigger: function trigger(type, data) {
			return this.each(function () {
				jQuery.event.trigger(type, data, this);
			});
		},
		triggerHandler: function triggerHandler(type, data) {
			var elem = this[0];
			if (elem) {
				return jQuery.event.trigger(type, data, elem, true);
			}
		}
	});

	jQuery.each(("blur focus focusin focusout load resize scroll unload click dblclick " + "mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " + "change select submit keydown keypress keyup error contextmenu").split(" "), function (i, name) {

		// Handle event binding
		jQuery.fn[name] = function (data, fn) {
			return arguments.length > 0 ? this.on(name, null, data, fn) : this.trigger(name);
		};
	});

	jQuery.fn.extend({
		hover: function hover(fnOver, fnOut) {
			return this.mouseenter(fnOver).mouseleave(fnOut || fnOver);
		}
	});

	support.focusin = "onfocusin" in window;

	// Support: Firefox
	// Firefox doesn't have focus(in | out) events
	// Related ticket - https://bugzilla.mozilla.org/show_bug.cgi?id=687787
	//
	// Support: Chrome, Safari
	// focus(in | out) events fire after focus & blur events,
	// which is spec violation - http://www.w3.org/TR/DOM-Level-3-Events/#events-focusevent-event-order
	// Related ticket - https://code.google.com/p/chromium/issues/detail?id=449857
	if (!support.focusin) {
		jQuery.each({ focus: "focusin", blur: "focusout" }, function (orig, fix) {

			// Attach a single capturing handler on the document while someone wants focusin/focusout
			var handler = function handler(event) {
				jQuery.event.simulate(fix, event.target, jQuery.event.fix(event));
			};

			jQuery.event.special[fix] = {
				setup: function setup() {
					var doc = this.ownerDocument || this,
					    attaches = dataPriv.access(doc, fix);

					if (!attaches) {
						doc.addEventListener(orig, handler, true);
					}
					dataPriv.access(doc, fix, (attaches || 0) + 1);
				},
				teardown: function teardown() {
					var doc = this.ownerDocument || this,
					    attaches = dataPriv.access(doc, fix) - 1;

					if (!attaches) {
						doc.removeEventListener(orig, handler, true);
						dataPriv.remove(doc, fix);
					} else {
						dataPriv.access(doc, fix, attaches);
					}
				}
			};
		});
	}
	var location = window.location;

	var nonce = jQuery.now();

	var rquery = /\?/;

	// Support: Android 2.3
	// Workaround failure to string-cast null input
	jQuery.parseJSON = function (data) {
		return JSON.parse(data + "");
	};

	// Cross-browser xml parsing
	jQuery.parseXML = function (data) {
		var xml;
		if (!data || typeof data !== "string") {
			return null;
		}

		// Support: IE9
		try {
			xml = new window.DOMParser().parseFromString(data, "text/xml");
		} catch (e) {
			xml = undefined;
		}

		if (!xml || xml.getElementsByTagName("parsererror").length) {
			jQuery.error("Invalid XML: " + data);
		}
		return xml;
	};

	var rhash = /#.*$/,
	    rts = /([?&])_=[^&]*/,
	    rheaders = /^(.*?):[ \t]*([^\r\n]*)$/mg,


	// #7653, #8125, #8152: local protocol detection
	rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
	    rnoContent = /^(?:GET|HEAD)$/,
	    rprotocol = /^\/\//,


	/* Prefilters
  * 1) They are useful to introduce custom dataTypes (see ajax/jsonp.js for an example)
  * 2) These are called:
  *    - BEFORE asking for a transport
  *    - AFTER param serialization (s.data is a string if s.processData is true)
  * 3) key is the dataType
  * 4) the catchall symbol "*" can be used
  * 5) execution will start with transport dataType and THEN continue down to "*" if needed
  */
	prefilters = {},


	/* Transports bindings
  * 1) key is the dataType
  * 2) the catchall symbol "*" can be used
  * 3) selection will start with transport dataType and THEN go to "*" if needed
  */
	transports = {},


	// Avoid comment-prolog char sequence (#10098); must appease lint and evade compression
	allTypes = "*/".concat("*"),


	// Anchor tag for parsing the document origin
	originAnchor = document.createElement("a");
	originAnchor.href = location.href;

	// Base "constructor" for jQuery.ajaxPrefilter and jQuery.ajaxTransport
	function addToPrefiltersOrTransports(structure) {

		// dataTypeExpression is optional and defaults to "*"
		return function (dataTypeExpression, func) {

			if (typeof dataTypeExpression !== "string") {
				func = dataTypeExpression;
				dataTypeExpression = "*";
			}

			var dataType,
			    i = 0,
			    dataTypes = dataTypeExpression.toLowerCase().match(rnotwhite) || [];

			if (jQuery.isFunction(func)) {

				// For each dataType in the dataTypeExpression
				while (dataType = dataTypes[i++]) {

					// Prepend if requested
					if (dataType[0] === "+") {
						dataType = dataType.slice(1) || "*";
						(structure[dataType] = structure[dataType] || []).unshift(func);

						// Otherwise append
					} else {
						(structure[dataType] = structure[dataType] || []).push(func);
					}
				}
			}
		};
	}

	// Base inspection function for prefilters and transports
	function inspectPrefiltersOrTransports(structure, options, originalOptions, jqXHR) {

		var inspected = {},
		    seekingTransport = structure === transports;

		function inspect(dataType) {
			var selected;
			inspected[dataType] = true;
			jQuery.each(structure[dataType] || [], function (_, prefilterOrFactory) {
				var dataTypeOrTransport = prefilterOrFactory(options, originalOptions, jqXHR);
				if (typeof dataTypeOrTransport === "string" && !seekingTransport && !inspected[dataTypeOrTransport]) {

					options.dataTypes.unshift(dataTypeOrTransport);
					inspect(dataTypeOrTransport);
					return false;
				} else if (seekingTransport) {
					return !(selected = dataTypeOrTransport);
				}
			});
			return selected;
		}

		return inspect(options.dataTypes[0]) || !inspected["*"] && inspect("*");
	}

	// A special extend for ajax options
	// that takes "flat" options (not to be deep extended)
	// Fixes #9887
	function ajaxExtend(target, src) {
		var key,
		    deep,
		    flatOptions = jQuery.ajaxSettings.flatOptions || {};

		for (key in src) {
			if (src[key] !== undefined) {
				(flatOptions[key] ? target : deep || (deep = {}))[key] = src[key];
			}
		}
		if (deep) {
			jQuery.extend(true, target, deep);
		}

		return target;
	}

	/* Handles responses to an ajax request:
  * - finds the right dataType (mediates between content-type and expected dataType)
  * - returns the corresponding response
  */
	function ajaxHandleResponses(s, jqXHR, responses) {

		var ct,
		    type,
		    finalDataType,
		    firstDataType,
		    contents = s.contents,
		    dataTypes = s.dataTypes;

		// Remove auto dataType and get content-type in the process
		while (dataTypes[0] === "*") {
			dataTypes.shift();
			if (ct === undefined) {
				ct = s.mimeType || jqXHR.getResponseHeader("Content-Type");
			}
		}

		// Check if we're dealing with a known content-type
		if (ct) {
			for (type in contents) {
				if (contents[type] && contents[type].test(ct)) {
					dataTypes.unshift(type);
					break;
				}
			}
		}

		// Check to see if we have a response for the expected dataType
		if (dataTypes[0] in responses) {
			finalDataType = dataTypes[0];
		} else {

			// Try convertible dataTypes
			for (type in responses) {
				if (!dataTypes[0] || s.converters[type + " " + dataTypes[0]]) {
					finalDataType = type;
					break;
				}
				if (!firstDataType) {
					firstDataType = type;
				}
			}

			// Or just use first one
			finalDataType = finalDataType || firstDataType;
		}

		// If we found a dataType
		// We add the dataType to the list if needed
		// and return the corresponding response
		if (finalDataType) {
			if (finalDataType !== dataTypes[0]) {
				dataTypes.unshift(finalDataType);
			}
			return responses[finalDataType];
		}
	}

	/* Chain conversions given the request and the original response
  * Also sets the responseXXX fields on the jqXHR instance
  */
	function ajaxConvert(s, response, jqXHR, isSuccess) {
		var conv2,
		    current,
		    conv,
		    tmp,
		    prev,
		    converters = {},


		// Work with a copy of dataTypes in case we need to modify it for conversion
		dataTypes = s.dataTypes.slice();

		// Create converters map with lowercased keys
		if (dataTypes[1]) {
			for (conv in s.converters) {
				converters[conv.toLowerCase()] = s.converters[conv];
			}
		}

		current = dataTypes.shift();

		// Convert to each sequential dataType
		while (current) {

			if (s.responseFields[current]) {
				jqXHR[s.responseFields[current]] = response;
			}

			// Apply the dataFilter if provided
			if (!prev && isSuccess && s.dataFilter) {
				response = s.dataFilter(response, s.dataType);
			}

			prev = current;
			current = dataTypes.shift();

			if (current) {

				// There's only work to do if current dataType is non-auto
				if (current === "*") {

					current = prev;

					// Convert response if prev dataType is non-auto and differs from current
				} else if (prev !== "*" && prev !== current) {

					// Seek a direct converter
					conv = converters[prev + " " + current] || converters["* " + current];

					// If none found, seek a pair
					if (!conv) {
						for (conv2 in converters) {

							// If conv2 outputs current
							tmp = conv2.split(" ");
							if (tmp[1] === current) {

								// If prev can be converted to accepted input
								conv = converters[prev + " " + tmp[0]] || converters["* " + tmp[0]];
								if (conv) {

									// Condense equivalence converters
									if (conv === true) {
										conv = converters[conv2];

										// Otherwise, insert the intermediate dataType
									} else if (converters[conv2] !== true) {
										current = tmp[0];
										dataTypes.unshift(tmp[1]);
									}
									break;
								}
							}
						}
					}

					// Apply converter (if not an equivalence)
					if (conv !== true) {

						// Unless errors are allowed to bubble, catch and return them
						if (conv && s.throws) {
							response = conv(response);
						} else {
							try {
								response = conv(response);
							} catch (e) {
								return {
									state: "parsererror",
									error: conv ? e : "No conversion from " + prev + " to " + current
								};
							}
						}
					}
				}
			}
		}

		return { state: "success", data: response };
	}

	jQuery.extend({

		// Counter for holding the number of active queries
		active: 0,

		// Last-Modified header cache for next request
		lastModified: {},
		etag: {},

		ajaxSettings: {
			url: location.href,
			type: "GET",
			isLocal: rlocalProtocol.test(location.protocol),
			global: true,
			processData: true,
			async: true,
			contentType: "application/x-www-form-urlencoded; charset=UTF-8",
			/*
   timeout: 0,
   data: null,
   dataType: null,
   username: null,
   password: null,
   cache: null,
   throws: false,
   traditional: false,
   headers: {},
   */

			accepts: {
				"*": allTypes,
				text: "text/plain",
				html: "text/html",
				xml: "application/xml, text/xml",
				json: "application/json, text/javascript"
			},

			contents: {
				xml: /\bxml\b/,
				html: /\bhtml/,
				json: /\bjson\b/
			},

			responseFields: {
				xml: "responseXML",
				text: "responseText",
				json: "responseJSON"
			},

			// Data converters
			// Keys separate source (or catchall "*") and destination types with a single space
			converters: {

				// Convert anything to text
				"* text": String,

				// Text to html (true = no transformation)
				"text html": true,

				// Evaluate text as a json expression
				"text json": jQuery.parseJSON,

				// Parse text as xml
				"text xml": jQuery.parseXML
			},

			// For options that shouldn't be deep extended:
			// you can add your own custom options here if
			// and when you create one that shouldn't be
			// deep extended (see ajaxExtend)
			flatOptions: {
				url: true,
				context: true
			}
		},

		// Creates a full fledged settings object into target
		// with both ajaxSettings and settings fields.
		// If target is omitted, writes into ajaxSettings.
		ajaxSetup: function ajaxSetup(target, settings) {
			return settings ?

			// Building a settings object
			ajaxExtend(ajaxExtend(target, jQuery.ajaxSettings), settings) :

			// Extending ajaxSettings
			ajaxExtend(jQuery.ajaxSettings, target);
		},

		ajaxPrefilter: addToPrefiltersOrTransports(prefilters),
		ajaxTransport: addToPrefiltersOrTransports(transports),

		// Main method
		ajax: function ajax(url, options) {

			// If url is an object, simulate pre-1.5 signature
			if ((typeof url === "undefined" ? "undefined" : _typeof(url)) === "object") {
				options = url;
				url = undefined;
			}

			// Force options to be an object
			options = options || {};

			var transport,


			// URL without anti-cache param
			cacheURL,


			// Response headers
			responseHeadersString,
			    responseHeaders,


			// timeout handle
			timeoutTimer,


			// Url cleanup var
			urlAnchor,


			// To know if global events are to be dispatched
			fireGlobals,


			// Loop variable
			i,


			// Create the final options object
			s = jQuery.ajaxSetup({}, options),


			// Callbacks context
			callbackContext = s.context || s,


			// Context for global events is callbackContext if it is a DOM node or jQuery collection
			globalEventContext = s.context && (callbackContext.nodeType || callbackContext.jquery) ? jQuery(callbackContext) : jQuery.event,


			// Deferreds
			deferred = jQuery.Deferred(),
			    completeDeferred = jQuery.Callbacks("once memory"),


			// Status-dependent callbacks
			_statusCode = s.statusCode || {},


			// Headers (they are sent all at once)
			requestHeaders = {},
			    requestHeadersNames = {},


			// The jqXHR state
			state = 0,


			// Default abort message
			strAbort = "canceled",


			// Fake xhr
			jqXHR = {
				readyState: 0,

				// Builds headers hashtable if needed
				getResponseHeader: function getResponseHeader(key) {
					var match;
					if (state === 2) {
						if (!responseHeaders) {
							responseHeaders = {};
							while (match = rheaders.exec(responseHeadersString)) {
								responseHeaders[match[1].toLowerCase()] = match[2];
							}
						}
						match = responseHeaders[key.toLowerCase()];
					}
					return match == null ? null : match;
				},

				// Raw string
				getAllResponseHeaders: function getAllResponseHeaders() {
					return state === 2 ? responseHeadersString : null;
				},

				// Caches the header
				setRequestHeader: function setRequestHeader(name, value) {
					var lname = name.toLowerCase();
					if (!state) {
						name = requestHeadersNames[lname] = requestHeadersNames[lname] || name;
						requestHeaders[name] = value;
					}
					return this;
				},

				// Overrides response content-type header
				overrideMimeType: function overrideMimeType(type) {
					if (!state) {
						s.mimeType = type;
					}
					return this;
				},

				// Status-dependent callbacks
				statusCode: function statusCode(map) {
					var code;
					if (map) {
						if (state < 2) {
							for (code in map) {

								// Lazy-add the new callback in a way that preserves old ones
								_statusCode[code] = [_statusCode[code], map[code]];
							}
						} else {

							// Execute the appropriate callbacks
							jqXHR.always(map[jqXHR.status]);
						}
					}
					return this;
				},

				// Cancel the request
				abort: function abort(statusText) {
					var finalText = statusText || strAbort;
					if (transport) {
						transport.abort(finalText);
					}
					done(0, finalText);
					return this;
				}
			};

			// Attach deferreds
			deferred.promise(jqXHR).complete = completeDeferred.add;
			jqXHR.success = jqXHR.done;
			jqXHR.error = jqXHR.fail;

			// Remove hash character (#7531: and string promotion)
			// Add protocol if not provided (prefilters might expect it)
			// Handle falsy url in the settings object (#10093: consistency with old signature)
			// We also use the url parameter if available
			s.url = ((url || s.url || location.href) + "").replace(rhash, "").replace(rprotocol, location.protocol + "//");

			// Alias method option to type as per ticket #12004
			s.type = options.method || options.type || s.method || s.type;

			// Extract dataTypes list
			s.dataTypes = jQuery.trim(s.dataType || "*").toLowerCase().match(rnotwhite) || [""];

			// A cross-domain request is in order when the origin doesn't match the current origin.
			if (s.crossDomain == null) {
				urlAnchor = document.createElement("a");

				// Support: IE8-11+
				// IE throws exception if url is malformed, e.g. http://example.com:80x/
				try {
					urlAnchor.href = s.url;

					// Support: IE8-11+
					// Anchor's host property isn't correctly set when s.url is relative
					urlAnchor.href = urlAnchor.href;
					s.crossDomain = originAnchor.protocol + "//" + originAnchor.host !== urlAnchor.protocol + "//" + urlAnchor.host;
				} catch (e) {

					// If there is an error parsing the URL, assume it is crossDomain,
					// it can be rejected by the transport if it is invalid
					s.crossDomain = true;
				}
			}

			// Convert data if not already a string
			if (s.data && s.processData && typeof s.data !== "string") {
				s.data = jQuery.param(s.data, s.traditional);
			}

			// Apply prefilters
			inspectPrefiltersOrTransports(prefilters, s, options, jqXHR);

			// If request was aborted inside a prefilter, stop there
			if (state === 2) {
				return jqXHR;
			}

			// We can fire global events as of now if asked to
			// Don't fire events if jQuery.event is undefined in an AMD-usage scenario (#15118)
			fireGlobals = jQuery.event && s.global;

			// Watch for a new set of requests
			if (fireGlobals && jQuery.active++ === 0) {
				jQuery.event.trigger("ajaxStart");
			}

			// Uppercase the type
			s.type = s.type.toUpperCase();

			// Determine if request has content
			s.hasContent = !rnoContent.test(s.type);

			// Save the URL in case we're toying with the If-Modified-Since
			// and/or If-None-Match header later on
			cacheURL = s.url;

			// More options handling for requests with no content
			if (!s.hasContent) {

				// If data is available, append data to url
				if (s.data) {
					cacheURL = s.url += (rquery.test(cacheURL) ? "&" : "?") + s.data;

					// #9682: remove data so that it's not used in an eventual retry
					delete s.data;
				}

				// Add anti-cache in url if needed
				if (s.cache === false) {
					s.url = rts.test(cacheURL) ?

					// If there is already a '_' parameter, set its value
					cacheURL.replace(rts, "$1_=" + nonce++) :

					// Otherwise add one to the end
					cacheURL + (rquery.test(cacheURL) ? "&" : "?") + "_=" + nonce++;
				}
			}

			// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
			if (s.ifModified) {
				if (jQuery.lastModified[cacheURL]) {
					jqXHR.setRequestHeader("If-Modified-Since", jQuery.lastModified[cacheURL]);
				}
				if (jQuery.etag[cacheURL]) {
					jqXHR.setRequestHeader("If-None-Match", jQuery.etag[cacheURL]);
				}
			}

			// Set the correct header, if data is being sent
			if (s.data && s.hasContent && s.contentType !== false || options.contentType) {
				jqXHR.setRequestHeader("Content-Type", s.contentType);
			}

			// Set the Accepts header for the server, depending on the dataType
			jqXHR.setRequestHeader("Accept", s.dataTypes[0] && s.accepts[s.dataTypes[0]] ? s.accepts[s.dataTypes[0]] + (s.dataTypes[0] !== "*" ? ", " + allTypes + "; q=0.01" : "") : s.accepts["*"]);

			// Check for headers option
			for (i in s.headers) {
				jqXHR.setRequestHeader(i, s.headers[i]);
			}

			// Allow custom headers/mimetypes and early abort
			if (s.beforeSend && (s.beforeSend.call(callbackContext, jqXHR, s) === false || state === 2)) {

				// Abort if not done already and return
				return jqXHR.abort();
			}

			// Aborting is no longer a cancellation
			strAbort = "abort";

			// Install callbacks on deferreds
			for (i in { success: 1, error: 1, complete: 1 }) {
				jqXHR[i](s[i]);
			}

			// Get transport
			transport = inspectPrefiltersOrTransports(transports, s, options, jqXHR);

			// If no transport, we auto-abort
			if (!transport) {
				done(-1, "No Transport");
			} else {
				jqXHR.readyState = 1;

				// Send global event
				if (fireGlobals) {
					globalEventContext.trigger("ajaxSend", [jqXHR, s]);
				}

				// If request was aborted inside ajaxSend, stop there
				if (state === 2) {
					return jqXHR;
				}

				// Timeout
				if (s.async && s.timeout > 0) {
					timeoutTimer = window.setTimeout(function () {
						jqXHR.abort("timeout");
					}, s.timeout);
				}

				try {
					state = 1;
					transport.send(requestHeaders, done);
				} catch (e) {

					// Propagate exception as error if not done
					if (state < 2) {
						done(-1, e);

						// Simply rethrow otherwise
					} else {
						throw e;
					}
				}
			}

			// Callback for when everything is done
			function done(status, nativeStatusText, responses, headers) {
				var isSuccess,
				    success,
				    error,
				    response,
				    modified,
				    statusText = nativeStatusText;

				// Called once
				if (state === 2) {
					return;
				}

				// State is "done" now
				state = 2;

				// Clear timeout if it exists
				if (timeoutTimer) {
					window.clearTimeout(timeoutTimer);
				}

				// Dereference transport for early garbage collection
				// (no matter how long the jqXHR object will be used)
				transport = undefined;

				// Cache response headers
				responseHeadersString = headers || "";

				// Set readyState
				jqXHR.readyState = status > 0 ? 4 : 0;

				// Determine if successful
				isSuccess = status >= 200 && status < 300 || status === 304;

				// Get response data
				if (responses) {
					response = ajaxHandleResponses(s, jqXHR, responses);
				}

				// Convert no matter what (that way responseXXX fields are always set)
				response = ajaxConvert(s, response, jqXHR, isSuccess);

				// If successful, handle type chaining
				if (isSuccess) {

					// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
					if (s.ifModified) {
						modified = jqXHR.getResponseHeader("Last-Modified");
						if (modified) {
							jQuery.lastModified[cacheURL] = modified;
						}
						modified = jqXHR.getResponseHeader("etag");
						if (modified) {
							jQuery.etag[cacheURL] = modified;
						}
					}

					// if no content
					if (status === 204 || s.type === "HEAD") {
						statusText = "nocontent";

						// if not modified
					} else if (status === 304) {
						statusText = "notmodified";

						// If we have data, let's convert it
					} else {
						statusText = response.state;
						success = response.data;
						error = response.error;
						isSuccess = !error;
					}
				} else {

					// Extract error from statusText and normalize for non-aborts
					error = statusText;
					if (status || !statusText) {
						statusText = "error";
						if (status < 0) {
							status = 0;
						}
					}
				}

				// Set data for the fake xhr object
				jqXHR.status = status;
				jqXHR.statusText = (nativeStatusText || statusText) + "";

				// Success/Error
				if (isSuccess) {
					deferred.resolveWith(callbackContext, [success, statusText, jqXHR]);
				} else {
					deferred.rejectWith(callbackContext, [jqXHR, statusText, error]);
				}

				// Status-dependent callbacks
				jqXHR.statusCode(_statusCode);
				_statusCode = undefined;

				if (fireGlobals) {
					globalEventContext.trigger(isSuccess ? "ajaxSuccess" : "ajaxError", [jqXHR, s, isSuccess ? success : error]);
				}

				// Complete
				completeDeferred.fireWith(callbackContext, [jqXHR, statusText]);

				if (fireGlobals) {
					globalEventContext.trigger("ajaxComplete", [jqXHR, s]);

					// Handle the global AJAX counter
					if (! --jQuery.active) {
						jQuery.event.trigger("ajaxStop");
					}
				}
			}

			return jqXHR;
		},

		getJSON: function getJSON(url, data, callback) {
			return jQuery.get(url, data, callback, "json");
		},

		getScript: function getScript(url, callback) {
			return jQuery.get(url, undefined, callback, "script");
		}
	});

	jQuery.each(["get", "post"], function (i, method) {
		jQuery[method] = function (url, data, callback, type) {

			// Shift arguments if data argument was omitted
			if (jQuery.isFunction(data)) {
				type = type || callback;
				callback = data;
				data = undefined;
			}

			// The url can be an options object (which then must have .url)
			return jQuery.ajax(jQuery.extend({
				url: url,
				type: method,
				dataType: type,
				data: data,
				success: callback
			}, jQuery.isPlainObject(url) && url));
		};
	});

	jQuery._evalUrl = function (url) {
		return jQuery.ajax({
			url: url,

			// Make this explicit, since user can override this through ajaxSetup (#11264)
			type: "GET",
			dataType: "script",
			async: false,
			global: false,
			"throws": true
		});
	};

	jQuery.fn.extend({
		wrapAll: function wrapAll(html) {
			var wrap;

			if (jQuery.isFunction(html)) {
				return this.each(function (i) {
					jQuery(this).wrapAll(html.call(this, i));
				});
			}

			if (this[0]) {

				// The elements to wrap the target around
				wrap = jQuery(html, this[0].ownerDocument).eq(0).clone(true);

				if (this[0].parentNode) {
					wrap.insertBefore(this[0]);
				}

				wrap.map(function () {
					var elem = this;

					while (elem.firstElementChild) {
						elem = elem.firstElementChild;
					}

					return elem;
				}).append(this);
			}

			return this;
		},

		wrapInner: function wrapInner(html) {
			if (jQuery.isFunction(html)) {
				return this.each(function (i) {
					jQuery(this).wrapInner(html.call(this, i));
				});
			}

			return this.each(function () {
				var self = jQuery(this),
				    contents = self.contents();

				if (contents.length) {
					contents.wrapAll(html);
				} else {
					self.append(html);
				}
			});
		},

		wrap: function wrap(html) {
			var isFunction = jQuery.isFunction(html);

			return this.each(function (i) {
				jQuery(this).wrapAll(isFunction ? html.call(this, i) : html);
			});
		},

		unwrap: function unwrap() {
			return this.parent().each(function () {
				if (!jQuery.nodeName(this, "body")) {
					jQuery(this).replaceWith(this.childNodes);
				}
			}).end();
		}
	});

	jQuery.expr.filters.hidden = function (elem) {
		return !jQuery.expr.filters.visible(elem);
	};
	jQuery.expr.filters.visible = function (elem) {

		// Support: Opera <= 12.12
		// Opera reports offsetWidths and offsetHeights less than zero on some elements
		// Use OR instead of AND as the element is not visible if either is true
		// See tickets #10406 and #13132
		return elem.offsetWidth > 0 || elem.offsetHeight > 0 || elem.getClientRects().length > 0;
	};

	var r20 = /%20/g,
	    rbracket = /\[\]$/,
	    rCRLF = /\r?\n/g,
	    rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i,
	    rsubmittable = /^(?:input|select|textarea|keygen)/i;

	function buildParams(prefix, obj, traditional, add) {
		var name;

		if (jQuery.isArray(obj)) {

			// Serialize array item.
			jQuery.each(obj, function (i, v) {
				if (traditional || rbracket.test(prefix)) {

					// Treat each array item as a scalar.
					add(prefix, v);
				} else {

					// Item is non-scalar (array or object), encode its numeric index.
					buildParams(prefix + "[" + ((typeof v === "undefined" ? "undefined" : _typeof(v)) === "object" && v != null ? i : "") + "]", v, traditional, add);
				}
			});
		} else if (!traditional && jQuery.type(obj) === "object") {

			// Serialize object item.
			for (name in obj) {
				buildParams(prefix + "[" + name + "]", obj[name], traditional, add);
			}
		} else {

			// Serialize scalar item.
			add(prefix, obj);
		}
	}

	// Serialize an array of form elements or a set of
	// key/values into a query string
	jQuery.param = function (a, traditional) {
		var prefix,
		    s = [],
		    add = function add(key, value) {

			// If value is a function, invoke it and return its value
			value = jQuery.isFunction(value) ? value() : value == null ? "" : value;
			s[s.length] = encodeURIComponent(key) + "=" + encodeURIComponent(value);
		};

		// Set traditional to true for jQuery <= 1.3.2 behavior.
		if (traditional === undefined) {
			traditional = jQuery.ajaxSettings && jQuery.ajaxSettings.traditional;
		}

		// If an array was passed in, assume that it is an array of form elements.
		if (jQuery.isArray(a) || a.jquery && !jQuery.isPlainObject(a)) {

			// Serialize the form elements
			jQuery.each(a, function () {
				add(this.name, this.value);
			});
		} else {

			// If traditional, encode the "old" way (the way 1.3.2 or older
			// did it), otherwise encode params recursively.
			for (prefix in a) {
				buildParams(prefix, a[prefix], traditional, add);
			}
		}

		// Return the resulting serialization
		return s.join("&").replace(r20, "+");
	};

	jQuery.fn.extend({
		serialize: function serialize() {
			return jQuery.param(this.serializeArray());
		},
		serializeArray: function serializeArray() {
			return this.map(function () {

				// Can add propHook for "elements" to filter or add form elements
				var elements = jQuery.prop(this, "elements");
				return elements ? jQuery.makeArray(elements) : this;
			}).filter(function () {
				var type = this.type;

				// Use .is( ":disabled" ) so that fieldset[disabled] works
				return this.name && !jQuery(this).is(":disabled") && rsubmittable.test(this.nodeName) && !rsubmitterTypes.test(type) && (this.checked || !rcheckableType.test(type));
			}).map(function (i, elem) {
				var val = jQuery(this).val();

				return val == null ? null : jQuery.isArray(val) ? jQuery.map(val, function (val) {
					return { name: elem.name, value: val.replace(rCRLF, "\r\n") };
				}) : { name: elem.name, value: val.replace(rCRLF, "\r\n") };
			}).get();
		}
	});

	jQuery.ajaxSettings.xhr = function () {
		try {
			return new window.XMLHttpRequest();
		} catch (e) {}
	};

	var xhrSuccessStatus = {

		// File protocol always yields status code 0, assume 200
		0: 200,

		// Support: IE9
		// #1450: sometimes IE returns 1223 when it should be 204
		1223: 204
	},
	    xhrSupported = jQuery.ajaxSettings.xhr();

	support.cors = !!xhrSupported && "withCredentials" in xhrSupported;
	support.ajax = xhrSupported = !!xhrSupported;

	jQuery.ajaxTransport(function (options) {
		var _callback, errorCallback;

		// Cross domain only allowed if supported through XMLHttpRequest
		if (support.cors || xhrSupported && !options.crossDomain) {
			return {
				send: function send(headers, complete) {
					var i,
					    xhr = options.xhr();

					xhr.open(options.type, options.url, options.async, options.username, options.password);

					// Apply custom fields if provided
					if (options.xhrFields) {
						for (i in options.xhrFields) {
							xhr[i] = options.xhrFields[i];
						}
					}

					// Override mime type if needed
					if (options.mimeType && xhr.overrideMimeType) {
						xhr.overrideMimeType(options.mimeType);
					}

					// X-Requested-With header
					// For cross-domain requests, seeing as conditions for a preflight are
					// akin to a jigsaw puzzle, we simply never set it to be sure.
					// (it can always be set on a per-request basis or even using ajaxSetup)
					// For same-domain requests, won't change header if already provided.
					if (!options.crossDomain && !headers["X-Requested-With"]) {
						headers["X-Requested-With"] = "XMLHttpRequest";
					}

					// Set headers
					for (i in headers) {
						xhr.setRequestHeader(i, headers[i]);
					}

					// Callback
					_callback = function callback(type) {
						return function () {
							if (_callback) {
								_callback = errorCallback = xhr.onload = xhr.onerror = xhr.onabort = xhr.onreadystatechange = null;

								if (type === "abort") {
									xhr.abort();
								} else if (type === "error") {

									// Support: IE9
									// On a manual native abort, IE9 throws
									// errors on any property access that is not readyState
									if (typeof xhr.status !== "number") {
										complete(0, "error");
									} else {
										complete(

										// File: protocol always yields status 0; see #8605, #14207
										xhr.status, xhr.statusText);
									}
								} else {
									complete(xhrSuccessStatus[xhr.status] || xhr.status, xhr.statusText,

									// Support: IE9 only
									// IE9 has no XHR2 but throws on binary (trac-11426)
									// For XHR2 non-text, let the caller handle it (gh-2498)
									(xhr.responseType || "text") !== "text" || typeof xhr.responseText !== "string" ? { binary: xhr.response } : { text: xhr.responseText }, xhr.getAllResponseHeaders());
								}
							}
						};
					};

					// Listen to events
					xhr.onload = _callback();
					errorCallback = xhr.onerror = _callback("error");

					// Support: IE9
					// Use onreadystatechange to replace onabort
					// to handle uncaught aborts
					if (xhr.onabort !== undefined) {
						xhr.onabort = errorCallback;
					} else {
						xhr.onreadystatechange = function () {

							// Check readyState before timeout as it changes
							if (xhr.readyState === 4) {

								// Allow onerror to be called first,
								// but that will not handle a native abort
								// Also, save errorCallback to a variable
								// as xhr.onerror cannot be accessed
								window.setTimeout(function () {
									if (_callback) {
										errorCallback();
									}
								});
							}
						};
					}

					// Create the abort callback
					_callback = _callback("abort");

					try {

						// Do send the request (this may raise an exception)
						xhr.send(options.hasContent && options.data || null);
					} catch (e) {

						// #14683: Only rethrow if this hasn't been notified as an error yet
						if (_callback) {
							throw e;
						}
					}
				},

				abort: function abort() {
					if (_callback) {
						_callback();
					}
				}
			};
		}
	});

	// Install script dataType
	jQuery.ajaxSetup({
		accepts: {
			script: "text/javascript, application/javascript, " + "application/ecmascript, application/x-ecmascript"
		},
		contents: {
			script: /\b(?:java|ecma)script\b/
		},
		converters: {
			"text script": function textScript(text) {
				jQuery.globalEval(text);
				return text;
			}
		}
	});

	// Handle cache's special case and crossDomain
	jQuery.ajaxPrefilter("script", function (s) {
		if (s.cache === undefined) {
			s.cache = false;
		}
		if (s.crossDomain) {
			s.type = "GET";
		}
	});

	// Bind script tag hack transport
	jQuery.ajaxTransport("script", function (s) {

		// This transport only deals with cross domain requests
		if (s.crossDomain) {
			var script, _callback2;
			return {
				send: function send(_, complete) {
					script = jQuery("<script>").prop({
						charset: s.scriptCharset,
						src: s.url
					}).on("load error", _callback2 = function callback(evt) {
						script.remove();
						_callback2 = null;
						if (evt) {
							complete(evt.type === "error" ? 404 : 200, evt.type);
						}
					});

					// Use native DOM manipulation to avoid our domManip AJAX trickery
					document.head.appendChild(script[0]);
				},
				abort: function abort() {
					if (_callback2) {
						_callback2();
					}
				}
			};
		}
	});

	var oldCallbacks = [],
	    rjsonp = /(=)\?(?=&|$)|\?\?/;

	// Default jsonp settings
	jQuery.ajaxSetup({
		jsonp: "callback",
		jsonpCallback: function jsonpCallback() {
			var callback = oldCallbacks.pop() || jQuery.expando + "_" + nonce++;
			this[callback] = true;
			return callback;
		}
	});

	// Detect, normalize options and install callbacks for jsonp requests
	jQuery.ajaxPrefilter("json jsonp", function (s, originalSettings, jqXHR) {

		var callbackName,
		    overwritten,
		    responseContainer,
		    jsonProp = s.jsonp !== false && (rjsonp.test(s.url) ? "url" : typeof s.data === "string" && (s.contentType || "").indexOf("application/x-www-form-urlencoded") === 0 && rjsonp.test(s.data) && "data");

		// Handle iff the expected data type is "jsonp" or we have a parameter to set
		if (jsonProp || s.dataTypes[0] === "jsonp") {

			// Get callback name, remembering preexisting value associated with it
			callbackName = s.jsonpCallback = jQuery.isFunction(s.jsonpCallback) ? s.jsonpCallback() : s.jsonpCallback;

			// Insert callback into url or form data
			if (jsonProp) {
				s[jsonProp] = s[jsonProp].replace(rjsonp, "$1" + callbackName);
			} else if (s.jsonp !== false) {
				s.url += (rquery.test(s.url) ? "&" : "?") + s.jsonp + "=" + callbackName;
			}

			// Use data converter to retrieve json after script execution
			s.converters["script json"] = function () {
				if (!responseContainer) {
					jQuery.error(callbackName + " was not called");
				}
				return responseContainer[0];
			};

			// Force json dataType
			s.dataTypes[0] = "json";

			// Install callback
			overwritten = window[callbackName];
			window[callbackName] = function () {
				responseContainer = arguments;
			};

			// Clean-up function (fires after converters)
			jqXHR.always(function () {

				// If previous value didn't exist - remove it
				if (overwritten === undefined) {
					jQuery(window).removeProp(callbackName);

					// Otherwise restore preexisting value
				} else {
					window[callbackName] = overwritten;
				}

				// Save back as free
				if (s[callbackName]) {

					// Make sure that re-using the options doesn't screw things around
					s.jsonpCallback = originalSettings.jsonpCallback;

					// Save the callback name for future use
					oldCallbacks.push(callbackName);
				}

				// Call if it was a function and we have a response
				if (responseContainer && jQuery.isFunction(overwritten)) {
					overwritten(responseContainer[0]);
				}

				responseContainer = overwritten = undefined;
			});

			// Delegate to script
			return "script";
		}
	});

	// Argument "data" should be string of html
	// context (optional): If specified, the fragment will be created in this context,
	// defaults to document
	// keepScripts (optional): If true, will include scripts passed in the html string
	jQuery.parseHTML = function (data, context, keepScripts) {
		if (!data || typeof data !== "string") {
			return null;
		}
		if (typeof context === "boolean") {
			keepScripts = context;
			context = false;
		}
		context = context || document;

		var parsed = rsingleTag.exec(data),
		    scripts = !keepScripts && [];

		// Single tag
		if (parsed) {
			return [context.createElement(parsed[1])];
		}

		parsed = buildFragment([data], context, scripts);

		if (scripts && scripts.length) {
			jQuery(scripts).remove();
		}

		return jQuery.merge([], parsed.childNodes);
	};

	// Keep a copy of the old load method
	var _load = jQuery.fn.load;

	/**
  * Load a url into a page
  */
	jQuery.fn.load = function (url, params, callback) {
		if (typeof url !== "string" && _load) {
			return _load.apply(this, arguments);
		}

		var selector,
		    type,
		    response,
		    self = this,
		    off = url.indexOf(" ");

		if (off > -1) {
			selector = jQuery.trim(url.slice(off));
			url = url.slice(0, off);
		}

		// If it's a function
		if (jQuery.isFunction(params)) {

			// We assume that it's the callback
			callback = params;
			params = undefined;

			// Otherwise, build a param string
		} else if (params && (typeof params === "undefined" ? "undefined" : _typeof(params)) === "object") {
			type = "POST";
		}

		// If we have elements to modify, make the request
		if (self.length > 0) {
			jQuery.ajax({
				url: url,

				// If "type" variable is undefined, then "GET" method will be used.
				// Make value of this field explicit since
				// user can override it through ajaxSetup method
				type: type || "GET",
				dataType: "html",
				data: params
			}).done(function (responseText) {

				// Save response for use in complete callback
				response = arguments;

				self.html(selector ?

				// If a selector was specified, locate the right elements in a dummy div
				// Exclude scripts to avoid IE 'Permission Denied' errors
				jQuery("<div>").append(jQuery.parseHTML(responseText)).find(selector) :

				// Otherwise use the full result
				responseText);

				// If the request succeeds, this function gets "data", "status", "jqXHR"
				// but they are ignored because response was set above.
				// If it fails, this function gets "jqXHR", "status", "error"
			}).always(callback && function (jqXHR, status) {
				self.each(function () {
					callback.apply(this, response || [jqXHR.responseText, status, jqXHR]);
				});
			});
		}

		return this;
	};

	// Attach a bunch of functions for handling common AJAX events
	jQuery.each(["ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend"], function (i, type) {
		jQuery.fn[type] = function (fn) {
			return this.on(type, fn);
		};
	});

	jQuery.expr.filters.animated = function (elem) {
		return jQuery.grep(jQuery.timers, function (fn) {
			return elem === fn.elem;
		}).length;
	};

	/**
  * Gets a window from an element
  */
	function getWindow(elem) {
		return jQuery.isWindow(elem) ? elem : elem.nodeType === 9 && elem.defaultView;
	}

	jQuery.offset = {
		setOffset: function setOffset(elem, options, i) {
			var curPosition,
			    curLeft,
			    curCSSTop,
			    curTop,
			    curOffset,
			    curCSSLeft,
			    calculatePosition,
			    position = jQuery.css(elem, "position"),
			    curElem = jQuery(elem),
			    props = {};

			// Set position first, in-case top/left are set even on static elem
			if (position === "static") {
				elem.style.position = "relative";
			}

			curOffset = curElem.offset();
			curCSSTop = jQuery.css(elem, "top");
			curCSSLeft = jQuery.css(elem, "left");
			calculatePosition = (position === "absolute" || position === "fixed") && (curCSSTop + curCSSLeft).indexOf("auto") > -1;

			// Need to be able to calculate position if either
			// top or left is auto and position is either absolute or fixed
			if (calculatePosition) {
				curPosition = curElem.position();
				curTop = curPosition.top;
				curLeft = curPosition.left;
			} else {
				curTop = parseFloat(curCSSTop) || 0;
				curLeft = parseFloat(curCSSLeft) || 0;
			}

			if (jQuery.isFunction(options)) {

				// Use jQuery.extend here to allow modification of coordinates argument (gh-1848)
				options = options.call(elem, i, jQuery.extend({}, curOffset));
			}

			if (options.top != null) {
				props.top = options.top - curOffset.top + curTop;
			}
			if (options.left != null) {
				props.left = options.left - curOffset.left + curLeft;
			}

			if ("using" in options) {
				options.using.call(elem, props);
			} else {
				curElem.css(props);
			}
		}
	};

	jQuery.fn.extend({
		offset: function offset(options) {
			if (arguments.length) {
				return options === undefined ? this : this.each(function (i) {
					jQuery.offset.setOffset(this, options, i);
				});
			}

			var docElem,
			    win,
			    elem = this[0],
			    box = { top: 0, left: 0 },
			    doc = elem && elem.ownerDocument;

			if (!doc) {
				return;
			}

			docElem = doc.documentElement;

			// Make sure it's not a disconnected DOM node
			if (!jQuery.contains(docElem, elem)) {
				return box;
			}

			box = elem.getBoundingClientRect();
			win = getWindow(doc);
			return {
				top: box.top + win.pageYOffset - docElem.clientTop,
				left: box.left + win.pageXOffset - docElem.clientLeft
			};
		},

		position: function position() {
			if (!this[0]) {
				return;
			}

			var offsetParent,
			    offset,
			    elem = this[0],
			    parentOffset = { top: 0, left: 0 };

			// Fixed elements are offset from window (parentOffset = {top:0, left: 0},
			// because it is its only offset parent
			if (jQuery.css(elem, "position") === "fixed") {

				// Assume getBoundingClientRect is there when computed position is fixed
				offset = elem.getBoundingClientRect();
			} else {

				// Get *real* offsetParent
				offsetParent = this.offsetParent();

				// Get correct offsets
				offset = this.offset();
				if (!jQuery.nodeName(offsetParent[0], "html")) {
					parentOffset = offsetParent.offset();
				}

				// Add offsetParent borders
				parentOffset.top += jQuery.css(offsetParent[0], "borderTopWidth", true);
				parentOffset.left += jQuery.css(offsetParent[0], "borderLeftWidth", true);
			}

			// Subtract parent offsets and element margins
			return {
				top: offset.top - parentOffset.top - jQuery.css(elem, "marginTop", true),
				left: offset.left - parentOffset.left - jQuery.css(elem, "marginLeft", true)
			};
		},

		// This method will return documentElement in the following cases:
		// 1) For the element inside the iframe without offsetParent, this method will return
		//    documentElement of the parent window
		// 2) For the hidden or detached element
		// 3) For body or html element, i.e. in case of the html node - it will return itself
		//
		// but those exceptions were never presented as a real life use-cases
		// and might be considered as more preferable results.
		//
		// This logic, however, is not guaranteed and can change at any point in the future
		offsetParent: function offsetParent() {
			return this.map(function () {
				var offsetParent = this.offsetParent;

				while (offsetParent && jQuery.css(offsetParent, "position") === "static") {
					offsetParent = offsetParent.offsetParent;
				}

				return offsetParent || documentElement;
			});
		}
	});

	// Create scrollLeft and scrollTop methods
	jQuery.each({ scrollLeft: "pageXOffset", scrollTop: "pageYOffset" }, function (method, prop) {
		var top = "pageYOffset" === prop;

		jQuery.fn[method] = function (val) {
			return access(this, function (elem, method, val) {
				var win = getWindow(elem);

				if (val === undefined) {
					return win ? win[prop] : elem[method];
				}

				if (win) {
					win.scrollTo(!top ? val : win.pageXOffset, top ? val : win.pageYOffset);
				} else {
					elem[method] = val;
				}
			}, method, val, arguments.length);
		};
	});

	// Support: Safari<7-8+, Chrome<37-44+
	// Add the top/left cssHooks using jQuery.fn.position
	// Webkit bug: https://bugs.webkit.org/show_bug.cgi?id=29084
	// Blink bug: https://code.google.com/p/chromium/issues/detail?id=229280
	// getComputedStyle returns percent when specified for top/left/bottom/right;
	// rather than make the css module depend on the offset module, just check for it here
	jQuery.each(["top", "left"], function (i, prop) {
		jQuery.cssHooks[prop] = addGetHookIf(support.pixelPosition, function (elem, computed) {
			if (computed) {
				computed = curCSS(elem, prop);

				// If curCSS returns percentage, fallback to offset
				return rnumnonpx.test(computed) ? jQuery(elem).position()[prop] + "px" : computed;
			}
		});
	});

	// Create innerHeight, innerWidth, height, width, outerHeight and outerWidth methods
	jQuery.each({ Height: "height", Width: "width" }, function (name, type) {
		jQuery.each({ padding: "inner" + name, content: type, "": "outer" + name }, function (defaultExtra, funcName) {

			// Margin is only for outerHeight, outerWidth
			jQuery.fn[funcName] = function (margin, value) {
				var chainable = arguments.length && (defaultExtra || typeof margin !== "boolean"),
				    extra = defaultExtra || (margin === true || value === true ? "margin" : "border");

				return access(this, function (elem, type, value) {
					var doc;

					if (jQuery.isWindow(elem)) {

						// As of 5/8/2012 this will yield incorrect results for Mobile Safari, but there
						// isn't a whole lot we can do. See pull request at this URL for discussion:
						// https://github.com/jquery/jquery/pull/764
						return elem.document.documentElement["client" + name];
					}

					// Get document width or height
					if (elem.nodeType === 9) {
						doc = elem.documentElement;

						// Either scroll[Width/Height] or offset[Width/Height] or client[Width/Height],
						// whichever is greatest
						return Math.max(elem.body["scroll" + name], doc["scroll" + name], elem.body["offset" + name], doc["offset" + name], doc["client" + name]);
					}

					return value === undefined ?

					// Get width or height on the element, requesting but not forcing parseFloat
					jQuery.css(elem, type, extra) :

					// Set width or height on the element
					jQuery.style(elem, type, value, extra);
				}, type, chainable ? margin : undefined, chainable, null);
			};
		});
	});

	jQuery.fn.extend({

		bind: function bind(types, data, fn) {
			return this.on(types, null, data, fn);
		},
		unbind: function unbind(types, fn) {
			return this.off(types, null, fn);
		},

		delegate: function delegate(selector, types, data, fn) {
			return this.on(types, selector, data, fn);
		},
		undelegate: function undelegate(selector, types, fn) {

			// ( namespace ) or ( selector, types [, fn] )
			return arguments.length === 1 ? this.off(selector, "**") : this.off(types, selector || "**", fn);
		},
		size: function size() {
			return this.length;
		}
	});

	jQuery.fn.andSelf = jQuery.fn.addBack;

	// Register as a named AMD module, since jQuery can be concatenated with other
	// files that may use define, but not via a proper concatenation script that
	// understands anonymous AMD modules. A named AMD is safest and most robust
	// way to register. Lowercase jquery is used because AMD module names are
	// derived from file names, and jQuery is normally delivered in a lowercase
	// file name. Do this after creating the global so that if an AMD module wants
	// to call noConflict to hide this version of jQuery, it will work.

	// Note that for maximum portability, libraries that are not jQuery should
	// declare themselves as anonymous modules, and avoid setting a global if an
	// AMD loader is present. jQuery is a special case. For more information, see
	// https://github.com/jrburke/requirejs/wiki/Updating-existing-libraries#wiki-anon

	if (true) {
		!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function () {
			return jQuery;
		}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	}

	var

	// Map over jQuery in case of overwrite
	_jQuery = window.jQuery,


	// Map over the $ in case of overwrite
	_$ = window.$;

	jQuery.noConflict = function (deep) {
		if (window.$ === jQuery) {
			window.$ = _$;
		}

		if (deep && window.jQuery === jQuery) {
			window.jQuery = _jQuery;
		}

		return jQuery;
	};

	// Expose jQuery and $ identifiers, even in AMD
	// (#7102#comment:10, https://github.com/jquery/jquery/pull/557)
	// and CommonJS for browser emulators (#13566)
	if (!noGlobal) {
		window.jQuery = window.$ = jQuery;
	}

	return jQuery;
});
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(112)(module)))

/***/ }),

/***/ 83:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Module dependencies (polyfills).
 * @private
 */

__webpack_require__(84);
__webpack_require__(102);

/**
 * Module dependencies (components).
 * @private
 */
var header = __webpack_require__(73);
var requestEstimatePopup = __webpack_require__(16);
var nav = __webpack_require__(33);

/**
 * Module dependencies (utils).
 * @private
 */
var support = __webpack_require__(14);
var scrollBlocker = __webpack_require__(10);
__webpack_require__(109);

__webpack_require__(110);
__webpack_require__(111);

/**
 * @private
 */
var DOM = {};

/**
 * @private
 */
function setDOMiOS() {
    DOM.body = document.body;
    DOM.popupWrapper = DOM.body.querySelector(".js-popup-wrapper");
    DOM.bodyWrapper = DOM.body.querySelector(".js-body-wrapper");
}

module.exports = {
    init: function init() {
        header.init();

        requestEstimatePopup.init();
        requestEstimatePopup.on("beforeShow", function () {
            support.isiOS() && setDOMiOS();
            if (support.isiOS()) {
                DOM.windowPosition = document.documentElement.scrollTop || document.body.scrollTop;
            }
        });

        requestEstimatePopup.on("beforeHide", function () {
            // Если у нас в мобильной версии включена менюшка, то noscroll убирать не нужно, т.к в коде для нав бара используется toggle "noscroll"
            if (!nav.isOpen()) {
                scrollBlocker.scrollOn();
            }
            if (support.isiOS()) {
                window.scroll(0, DOM.windowPosition);
            }
        });
    }
};

/***/ }),

/***/ 84:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _defineProperty = __webpack_require__(85);

var _defineProperty2 = _interopRequireDefault(_defineProperty);

var _getOwnPropertyDescriptor = __webpack_require__(93);

var _getOwnPropertyDescriptor2 = _interopRequireDefault(_getOwnPropertyDescriptor);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-env browser */

//
// element-dataset 2.2.6
//
// element-dataset is released under the terms of the BSD-3-Clause license.
// (c) 2015 - 2017 Mark Milstein <mark@epiloque.com> 
//
// For all details and documentation: https://github.com/epiloque/element-dataset
//

function elementDatasetPolyfill() {
  if (!document.documentElement.dataset && (!(0, _getOwnPropertyDescriptor2.default)(HTMLElement.prototype, 'dataset') || !(0, _getOwnPropertyDescriptor2.default)(HTMLElement.prototype, 'dataset').get)) {
    var descriptor = {};

    descriptor.enumerable = true;

    descriptor.get = function get() {
      var element = this;
      var map = {};
      var attributes = this.attributes;

      function toUpperCase(n0) {
        return n0.charAt(1).toUpperCase();
      }

      function getter() {
        return this.value;
      }

      function setter(name, value) {
        if (typeof value !== 'undefined') {
          this.setAttribute(name, value);
        } else {
          this.removeAttribute(name);
        }
      }

      for (var i = 0; i < attributes.length; i += 1) {
        var attribute = attributes[i];

        // This test really should allow any XML Name without
        // colons (and non-uppercase for XHTML)

        if (attribute && attribute.name && /^data-\w[\w-]*$/.test(attribute.name)) {
          var name = attribute.name;
          var value = attribute.value;

          // Change to CamelCase

          var propName = name.substr(5).replace(/-./g, toUpperCase);

          (0, _defineProperty2.default)(map, propName, {
            enumerable: descriptor.enumerable,
            get: getter.bind({ value: value || '' }),
            set: setter.bind(element, name)
          });
        }
      }
      return map;
    };

    Object.defineProperty(HTMLElement.prototype, 'dataset', descriptor);
  }
}

exports.default = elementDatasetPolyfill;

/***/ }),

/***/ 85:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = { "default": __webpack_require__(86), __esModule: true };

/***/ }),

/***/ 86:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(87);
var $Object = __webpack_require__(9).Object;
module.exports = function defineProperty(it, key, desc) {
  return $Object.defineProperty(it, key, desc);
};

/***/ }),

/***/ 87:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var $export = __webpack_require__(34);
// 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
$export($export.S + $export.F * !__webpack_require__(6), 'Object', { defineProperty: __webpack_require__(36).f });

/***/ }),

/***/ 88:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// optional / simple context binding
var aFunction = __webpack_require__(89);
module.exports = function (fn, that, length) {
  aFunction(fn);
  if (that === undefined) return fn;
  switch (length) {
    case 1:
      return function (a) {
        return fn.call(that, a);
      };
    case 2:
      return function (a, b) {
        return fn.call(that, a, b);
      };
    case 3:
      return function (a, b, c) {
        return fn.call(that, a, b, c);
      };
  }
  return function () /* ...args */{
    return fn.apply(that, arguments);
  };
};

/***/ }),

/***/ 89:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function (it) {
  if (typeof it != 'function') throw TypeError(it + ' is not a function!');
  return it;
};

/***/ }),

/***/ 9:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var core = module.exports = { version: '2.6.12' };
if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef

/***/ }),

/***/ 90:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var dP = __webpack_require__(36);
var createDesc = __webpack_require__(39);
module.exports = __webpack_require__(6) ? function (object, key, value) {
  return dP.f(object, key, createDesc(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};

/***/ }),

/***/ 91:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var isObject = __webpack_require__(17);
module.exports = function (it) {
  if (!isObject(it)) throw TypeError(it + ' is not an object!');
  return it;
};

/***/ }),

/***/ 92:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var isObject = __webpack_require__(17);
var document = __webpack_require__(35).document;
// typeof document.createElement is 'object' in old IE
var is = isObject(document) && isObject(document.createElement);
module.exports = function (it) {
  return is ? document.createElement(it) : {};
};

/***/ }),

/***/ 93:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = { "default": __webpack_require__(94), __esModule: true };

/***/ }),

/***/ 94:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(95);
var $Object = __webpack_require__(9).Object;
module.exports = function getOwnPropertyDescriptor(it, key) {
  return $Object.getOwnPropertyDescriptor(it, key);
};

/***/ }),

/***/ 95:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
var toIObject = __webpack_require__(41);
var $getOwnPropertyDescriptor = __webpack_require__(99).f;

__webpack_require__(101)('getOwnPropertyDescriptor', function () {
  return function getOwnPropertyDescriptor(it, key) {
    return $getOwnPropertyDescriptor(toIObject(it), key);
  };
});

/***/ }),

/***/ 96:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// fallback for non-array-like ES3 and non-enumerable old V8 strings
var cof = __webpack_require__(97);
// eslint-disable-next-line no-prototype-builtins
module.exports = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
  return cof(it) == 'String' ? it.split('') : Object(it);
};

/***/ }),

/***/ 97:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var toString = {}.toString;

module.exports = function (it) {
  return toString.call(it).slice(8, -1);
};

/***/ }),

/***/ 98:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// 7.2.1 RequireObjectCoercible(argument)
module.exports = function (it) {
  if (it == undefined) throw TypeError("Can't call method on  " + it);
  return it;
};

/***/ }),

/***/ 99:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var pIE = __webpack_require__(100);
var createDesc = __webpack_require__(39);
var toIObject = __webpack_require__(41);
var toPrimitive = __webpack_require__(38);
var has = __webpack_require__(40);
var IE8_DOM_DEFINE = __webpack_require__(37);
var gOPD = Object.getOwnPropertyDescriptor;

exports.f = __webpack_require__(6) ? gOPD : function getOwnPropertyDescriptor(O, P) {
  O = toIObject(O);
  P = toPrimitive(P, true);
  if (IE8_DOM_DEFINE) try {
    return gOPD(O, P);
  } catch (e) {/* empty */}
  if (has(O, P)) return createDesc(!pIE.f.call(O, P), O[P]);
};

/***/ })

},[1727]);