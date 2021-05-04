/**
 * DevExtreme (viz/translators/datetime_translator.js)
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

function parse(value) {
    return null !== value ? new Date(value) : value
}
var _default = {
    _fromValue: parse,
    _toValue: parse,
    _add: _date.default.addDateInterval,
    convert: _date.default.dateToMilliseconds
};
exports.default = _default;
module.exports = exports.default;
