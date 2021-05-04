/**
 * DevExtreme (core/utils/iterator.js)
 * Version: 20.2.6
 * Build date: Tue Mar 16 2021
 *
 * Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
exports.reverseEach = exports.each = exports.map = void 0;
var map = function(values, callback) {
    if (Array.isArray(values)) {
        return values.map(callback)
    }
    var result = [];
    for (var key in values) {
        result.push(callback(values[key], key))
    }
    return result
};
exports.map = map;
var each = function(values, callback) {
    if (!values) {
        return
    }
    if ("length" in values) {
        for (var i = 0; i < values.length; i++) {
            if (false === callback.call(values[i], i, values[i])) {
                break
            }
        }
    } else {
        for (var key in values) {
            if (false === callback.call(values[key], key, values[key])) {
                break
            }
        }
    }
    return values
};
exports.each = each;
var reverseEach = function(array, callback) {
    if (!array || !("length" in array) || 0 === array.length) {
        return
    }
    for (var i = array.length - 1; i >= 0; i--) {
        if (false === callback.call(array[i], i, array[i])) {
            break
        }
    }
};
exports.reverseEach = reverseEach;
