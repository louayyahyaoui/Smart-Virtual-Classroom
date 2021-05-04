/**
 * DevExtreme (core/polyfills/promise.js)
 * Version: 20.2.6
 * Build date: Tue Mar 16 2021
 *
 * Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
exports.default = void 0;
var _deferred = require("../../core/utils/deferred");
var _window = require("../../core/utils/window");
var promise = (0, _window.hasWindow)() ? (0, _window.getWindow)().Promise : Promise;
if (!promise) {
    promise = function(resolver) {
        var d = new _deferred.Deferred;
        resolver(d.resolve.bind(this), d.reject.bind(this));
        return d.promise()
    };
    promise.resolve = function(val) {
        return (new _deferred.Deferred).resolve(val).promise()
    };
    promise.reject = function(val) {
        return (new _deferred.Deferred).reject(val).promise()
    };
    promise.all = function(promises) {
        return _deferred.when.apply(this, promises).then(function() {
            return [].slice.call(arguments)
        })
    }
}
var _default = promise;
exports.default = _default;
module.exports = exports.default;
