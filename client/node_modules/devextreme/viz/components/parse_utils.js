/**
 * DevExtreme (viz/components/parse_utils.js)
 * Version: 20.2.6
 * Build date: Tue Mar 16 2021
 *
 * Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
exports.correctValueType = correctValueType;
exports.getParser = void 0;
var _common = require("../../core/utils/common");
var _date_serialization = _interopRequireDefault(require("../../core/utils/date_serialization"));
var _type = require("../../core/utils/type");

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        "default": obj
    }
}
var parsers = {
    string: function(val) {
        return (0, _type.isDefined)(val) ? "" + val : val
    },
    numeric: function(val) {
        if (!(0, _type.isDefined)(val)) {
            return val
        }
        var parsedVal = Number(val);
        if (isNaN(parsedVal)) {
            parsedVal = void 0
        }
        return parsedVal
    },
    datetime: function(val) {
        if (!(0, _type.isDefined)(val)) {
            return val
        }
        var parsedVal;
        var numVal = Number(val);
        if (!isNaN(numVal)) {
            parsedVal = new Date(numVal)
        } else {
            parsedVal = _date_serialization.default.deserializeDate(val)
        }
        if (isNaN(Number(parsedVal))) {
            parsedVal = void 0
        }
        return parsedVal
    }
};

function correctValueType(type) {
    return "numeric" === type || "datetime" === type || "string" === type ? type : ""
}
var getParser = function(valueType) {
    return parsers[correctValueType(valueType)] || _common.noop
};
exports.getParser = getParser;
