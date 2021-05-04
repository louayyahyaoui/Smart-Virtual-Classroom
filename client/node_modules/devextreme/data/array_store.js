/**
 * DevExtreme (data/array_store.js)
 * Version: 20.2.6
 * Build date: Tue Mar 16 2021
 *
 * Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
exports.default = void 0;
var _utils = _interopRequireDefault(require("./utils"));
var _query = _interopRequireDefault(require("./query"));
var _errors = _interopRequireDefault(require("./errors"));
var _abstract_store = _interopRequireDefault(require("./abstract_store"));
var _array_utils = require("./array_utils");

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        "default": obj
    }
}
var ArrayStore = _abstract_store.default.inherit({
    ctor: function(options) {
        if (Array.isArray(options)) {
            options = {
                data: options
            }
        } else {
            options = options || {}
        }
        this.callBase(options);
        var initialArray = options.data;
        if (initialArray && !Array.isArray(initialArray)) {
            throw _errors.default.errors.Error("E4006")
        }
        this._array = initialArray || []
    },
    createQuery: function() {
        return (0, _query.default)(this._array, {
            errorHandler: this._errorHandler
        })
    },
    _byKeyImpl: function(key) {
        var index = (0, _array_utils.indexByKey)(this, this._array, key);
        if (index === -1) {
            return _utils.default.rejectedPromise(_errors.default.errors.Error("E4009"))
        }
        return _utils.default.trivialPromise(this._array[index])
    },
    _insertImpl: function(values) {
        return (0, _array_utils.insert)(this, this._array, values)
    },
    _pushImpl: function(changes) {
        (0, _array_utils.applyBatch)({
            keyInfo: this,
            data: this._array,
            changes: changes
        })
    },
    _updateImpl: function(key, values) {
        return (0, _array_utils.update)(this, this._array, key, values)
    },
    _removeImpl: function(key) {
        return (0, _array_utils.remove)(this, this._array, key)
    },
    clear: function() {
        this._eventsStrategy.fireEvent("modifying");
        this._array = [];
        this._eventsStrategy.fireEvent("modified")
    }
}, "array");
var _default = ArrayStore;
exports.default = _default;
module.exports = exports.default;
module.exports.default = module.exports;
