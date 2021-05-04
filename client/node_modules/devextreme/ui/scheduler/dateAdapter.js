/**
 * DevExtreme (ui/scheduler/dateAdapter.js)
 * Version: 20.2.6
 * Build date: Tue Mar 16 2021
 *
 * Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
exports.default = void 0;
var _date = _interopRequireDefault(require("../../core/utils/date"));

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        "default": obj
    }
}

function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) {
            descriptor.writable = true
        }
        Object.defineProperty(target, descriptor.key, descriptor)
    }
}

function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) {
        _defineProperties(Constructor.prototype, protoProps)
    }
    if (staticProps) {
        _defineProperties(Constructor, staticProps)
    }
    return Constructor
}
var toMs = _date.default.dateToMilliseconds;
var DateAdapterCore = function() {
    function DateAdapterCore(source) {
        this._source = new Date(source.getTime ? source.getTime() : source)
    }
    var _proto = DateAdapterCore.prototype;
    _proto.result = function() {
        return this._source
    };
    _proto.getTimezoneOffset = function() {
        var format = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : void 0;
        var value = this._source.getTimezoneOffset();
        if ("minute" === format) {
            return value * toMs("minute")
        }
        return value
    };
    _proto.getTime = function() {
        return this._source.getTime()
    };
    _proto.setTime = function(value) {
        this._source.setTime(value);
        return this
    };
    _proto.addTime = function(value) {
        this._source.setTime(this._source.getTime() + value);
        return this
    };
    _proto.setMinutes = function(value) {
        this._source.setMinutes(value);
        return this
    };
    _proto.addMinutes = function(value) {
        this._source.setMinutes(this._source.getMinutes() + value);
        return this
    };
    _proto.subtractMinutes = function(value) {
        this._source.setMinutes(this._source.getMinutes() - value);
        return this
    };
    _createClass(DateAdapterCore, [{
        key: "source",
        get: function() {
            return this._source
        }
    }]);
    return DateAdapterCore
}();
var DateAdapter = function(date) {
    return new DateAdapterCore(date)
};
var _default = DateAdapter;
exports.default = _default;
module.exports = exports.default;
