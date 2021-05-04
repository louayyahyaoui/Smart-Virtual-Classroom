/**
 * DevExtreme (core/utils/type.js)
 * Version: 20.2.6
 * Build date: Tue Mar 16 2021
 *
 * Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
exports.isEvent = exports.type = exports.isDeferred = exports.isPromise = exports.isRenderer = exports.isWindow = exports.isPrimitive = exports.isPlainObject = exports.isEmptyObject = exports.isObject = exports.isNumeric = exports.isString = exports.isFunction = exports.isDefined = exports.isDate = exports.isExponential = exports.isBoolean = void 0;

function _typeof(obj) {
    "@babel/helpers - typeof";
    if ("function" === typeof Symbol && "symbol" === typeof Symbol.iterator) {
        _typeof = function(obj) {
            return typeof obj
        }
    } else {
        _typeof = function(obj) {
            return obj && "function" === typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj
        }
    }
    return _typeof(obj)
}
var types = {
    "[object Array]": "array",
    "[object Date]": "date",
    "[object Object]": "object",
    "[object String]": "string",
    "[object Null]": "null"
};
var type = function(object) {
    var typeOfObject = Object.prototype.toString.call(object);
    return "object" === _typeof(object) ? types[typeOfObject] || "object" : _typeof(object)
};
exports.type = type;
var isBoolean = function(object) {
    return "boolean" === typeof object
};
exports.isBoolean = isBoolean;
var isExponential = function(value) {
    return isNumeric(value) && value.toString().indexOf("e") !== -1
};
exports.isExponential = isExponential;
var isDate = function(object) {
    return "date" === type(object)
};
exports.isDate = isDate;
var isDefined = function(object) {
    return null !== object && void 0 !== object
};
exports.isDefined = isDefined;
var isFunction = function(object) {
    return "function" === typeof object
};
exports.isFunction = isFunction;
var isString = function(object) {
    return "string" === typeof object
};
exports.isString = isString;
var isNumeric = function(object) {
    return "number" === typeof object && isFinite(object) || !isNaN(object - parseFloat(object))
};
exports.isNumeric = isNumeric;
var isObject = function(object) {
    return "object" === type(object)
};
exports.isObject = isObject;
var isEmptyObject = function(object) {
    var property;
    for (property in object) {
        return false
    }
    return true
};
exports.isEmptyObject = isEmptyObject;
var isPlainObject = function(object) {
    if (!object || "[object Object]" !== Object.prototype.toString.call(object)) {
        return false
    }
    var proto = Object.getPrototypeOf(object);
    var ctor = Object.hasOwnProperty.call(proto, "constructor") && proto.constructor;
    return "function" === typeof ctor && Object.toString.call(ctor) === Object.toString.call(Object)
};
exports.isPlainObject = isPlainObject;
var isPrimitive = function(value) {
    return ["object", "array", "function"].indexOf(type(value)) === -1
};
exports.isPrimitive = isPrimitive;
var isWindow = function(object) {
    return null != object && object === object.window
};
exports.isWindow = isWindow;
var isRenderer = function(object) {
    return !!(object.jquery || object.dxRenderer)
};
exports.isRenderer = isRenderer;
var isPromise = function(object) {
    return object && isFunction(object.then)
};
exports.isPromise = isPromise;
var isDeferred = function(object) {
    return object && isFunction(object.done) && isFunction(object.fail)
};
exports.isDeferred = isDeferred;
var isEvent = function(object) {
    return !!(object && object.preventDefault)
};
exports.isEvent = isEvent;
