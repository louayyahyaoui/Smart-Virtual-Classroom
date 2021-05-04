/**
 * DevExtreme (localization.js)
 * Version: 20.2.6
 * Build date: Tue Mar 16 2021
 *
 * Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
exports.disableIntl = disableIntl;
Object.defineProperty(exports, "message", {
    enumerable: true,
    get: function() {
        return _message.default
    }
});
Object.defineProperty(exports, "number", {
    enumerable: true,
    get: function() {
        return _number.default
    }
});
Object.defineProperty(exports, "date", {
    enumerable: true,
    get: function() {
        return _date.default
    }
});
exports.parseDate = exports.formatDate = exports.parseNumber = exports.formatNumber = exports.formatMessage = exports.loadMessages = exports.locale = void 0;
var _core = _interopRequireDefault(require("./localization/core"));
var _message = _interopRequireDefault(require("./localization/message"));
var _number = _interopRequireDefault(require("./localization/number"));
var _date = _interopRequireDefault(require("./localization/date"));
require("./localization/currency");

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        "default": obj
    }
}
var locale = _core.default.locale.bind(_core.default);
exports.locale = locale;
var loadMessages = _message.default.load.bind(_message.default);
exports.loadMessages = loadMessages;
var formatMessage = _message.default.format.bind(_message.default);
exports.formatMessage = formatMessage;
var formatNumber = _number.default.format.bind(_number.default);
exports.formatNumber = formatNumber;
var parseNumber = _number.default.parse.bind(_number.default);
exports.parseNumber = parseNumber;
var formatDate = _date.default.format.bind(_date.default);
exports.formatDate = formatDate;
var parseDate = _date.default.parse.bind(_date.default);
exports.parseDate = parseDate;

function disableIntl() {
    if ("intl" === _number.default.engine()) {
        _number.default.resetInjection()
    }
    if ("intl" === _date.default.engine()) {
        _date.default.resetInjection()
    }
}
