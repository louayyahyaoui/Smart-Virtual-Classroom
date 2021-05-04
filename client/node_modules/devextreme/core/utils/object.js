/**
 * DevExtreme (core/utils/object.js)
 * Version: 20.2.6
 * Build date: Tue Mar 16 2021
 *
 * Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
exports.deepExtendArraySafe = exports.orderEach = exports.clone = void 0;
var _type = require("./type");
var _variable_wrapper = _interopRequireDefault(require("./variable_wrapper"));

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        "default": obj
    }
}
var clone = function() {
    function Clone() {}
    return function(obj) {
        Clone.prototype = obj;
        return new Clone
    }
}();
exports.clone = clone;
var orderEach = function(map, func) {
    var keys = [];
    var key;
    var i;
    for (key in map) {
        if (Object.prototype.hasOwnProperty.call(map, key)) {
            keys.push(key)
        }
    }
    keys.sort(function(x, y) {
        var isNumberX = (0, _type.isNumeric)(x);
        var isNumberY = (0, _type.isNumeric)(y);
        if (isNumberX && isNumberY) {
            return x - y
        }
        if (isNumberX && !isNumberY) {
            return -1
        }
        if (!isNumberX && isNumberY) {
            return 1
        }
        if (x < y) {
            return -1
        }
        if (x > y) {
            return 1
        }
        return 0
    });
    for (i = 0; i < keys.length; i++) {
        key = keys[i];
        func(key, map[key])
    }
};
exports.orderEach = orderEach;
var assignValueToProperty = function(target, property, value, assignByReference) {
    if (!assignByReference && _variable_wrapper.default.isWrapped(target[property])) {
        _variable_wrapper.default.assign(target[property], value)
    } else {
        target[property] = value
    }
};
var deepExtendArraySafe = function deepExtendArraySafe(target, changes, extendComplexObject, assignByReference) {
    var prevValue;
    var newValue;
    for (var name in changes) {
        prevValue = target[name];
        newValue = changes[name];
        if ("__proto__" === name || target === newValue) {
            continue
        }
        if ((0, _type.isPlainObject)(newValue)) {
            var goDeeper = extendComplexObject ? (0, _type.isObject)(prevValue) : (0, _type.isPlainObject)(prevValue);
            newValue = deepExtendArraySafe(goDeeper ? prevValue : {}, newValue, extendComplexObject, assignByReference)
        }
        if (void 0 !== newValue && prevValue !== newValue) {
            assignValueToProperty(target, name, newValue, assignByReference)
        }
    }
    return target
};
exports.deepExtendArraySafe = deepExtendArraySafe;
