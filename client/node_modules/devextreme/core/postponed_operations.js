/**
 * DevExtreme (core/postponed_operations.js)
 * Version: 20.2.6
 * Build date: Tue Mar 16 2021
 *
 * Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
exports.PostponedOperations = void 0;
var _deferred = require("./utils/deferred");
var _type = require("./utils/type");

function _toConsumableArray(arr) {
    return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread()
}

function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
}

function _unsupportedIterableToArray(o, minLen) {
    if (!o) {
        return
    }
    if ("string" === typeof o) {
        return _arrayLikeToArray(o, minLen)
    }
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if ("Object" === n && o.constructor) {
        n = o.constructor.name
    }
    if ("Map" === n || "Set" === n) {
        return Array.from(o)
    }
    if ("Arguments" === n || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) {
        return _arrayLikeToArray(o, minLen)
    }
}

function _iterableToArray(iter) {
    if ("undefined" !== typeof Symbol && Symbol.iterator in Object(iter)) {
        return Array.from(iter)
    }
}

function _arrayWithoutHoles(arr) {
    if (Array.isArray(arr)) {
        return _arrayLikeToArray(arr)
    }
}

function _arrayLikeToArray(arr, len) {
    if (null == len || len > arr.length) {
        len = arr.length
    }
    for (var i = 0, arr2 = new Array(len); i < len; i++) {
        arr2[i] = arr[i]
    }
    return arr2
}
var PostponedOperations = function() {
    function PostponedOperations() {
        this._postponedOperations = {}
    }
    var _proto = PostponedOperations.prototype;
    _proto.add = function(key, fn, postponedPromise) {
        if (key in this._postponedOperations) {
            postponedPromise && this._postponedOperations[key].promises.push(postponedPromise)
        } else {
            var completePromise = new _deferred.Deferred;
            this._postponedOperations[key] = {
                fn: fn,
                completePromise: completePromise,
                promises: postponedPromise ? [postponedPromise] : []
            }
        }
        return this._postponedOperations[key].completePromise.promise()
    };
    _proto.callPostponedOperations = function() {
        for (var key in this._postponedOperations) {
            var operation = this._postponedOperations[key];
            if ((0, _type.isDefined)(operation)) {
                if (operation.promises && operation.promises.length) {
                    _deferred.when.apply(void 0, _toConsumableArray(operation.promises)).done(operation.fn).then(operation.completePromise.resolve)
                } else {
                    operation.fn().done(operation.completePromise.resolve)
                }
            }
        }
        this._postponedOperations = {}
    };
    return PostponedOperations
}();
exports.PostponedOperations = PostponedOperations;
