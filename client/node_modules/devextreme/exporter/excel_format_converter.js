/**
 * DevExtreme (exporter/excel_format_converter.js)
 * Version: 20.2.6
 * Build date: Tue Mar 16 2021
 *
 * Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
exports.default = void 0;
var _string = require("../core/utils/string");
var _number = _interopRequireDefault(require("../localization/number"));
var _date = _interopRequireDefault(require("../localization/date"));
var _type = require("../core/utils/type");
var _date2 = require("../localization/ldml/date.format");
var _language_codes = require("../localization/language_codes");
require("../localization/currency");

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        "default": obj
    }
}
var ARABIC_ZERO_CODE = 1632;
var DEFINED_NUMBER_FORMTATS = {
    thousands: "#,##0{0},&quot;K&quot;",
    millions: "#,##0{0},,&quot;M&quot;",
    billions: "#,##0{0},,,&quot;B&quot;",
    trillions: "#,##0{0},,,,&quot;T&quot;",
    percent: "0{0}%",
    decimal: "#{0}",
    fixedpoint: "#,##0{0}",
    exponential: "0{0}E+00",
    currency: " "
};
var PERIOD_REGEXP = /a+/g;
var DAY_REGEXP = /E/g;
var DO_REGEXP = /dE+/g;
var STANDALONE_MONTH_REGEXP = /L/g;
var HOUR_REGEXP = /h/g;
var SLASH_REGEXP = /\//g;
var SQUARE_OPEN_BRACKET_REGEXP = /\[/g;
var SQUARE_CLOSE_BRACKET_REGEXP = /]/g;
var ANY_REGEXP = /./g;
var excelFormatConverter = {
    _applyPrecision: function(format, precision) {
        var result;
        var i;
        if (precision > 0) {
            result = "decimal" !== format ? "." : "";
            for (i = 0; i < precision; i++) {
                result += "0"
            }
            return result
        }
        return ""
    },
    _hasArabicDigits: function(text) {
        var code;
        for (var i = 0; i < text.length; i++) {
            code = text.charCodeAt(i);
            if (code >= ARABIC_ZERO_CODE && code < ARABIC_ZERO_CODE + 10) {
                return true
            }
        }
        return false
    },
    _convertDateFormatToOpenXml: function(format) {
        return format.replace(SLASH_REGEXP, "\\/").split("'").map(function(datePart, index) {
            if (index % 2 === 0) {
                return datePart.replace(PERIOD_REGEXP, "AM/PM").replace(DO_REGEXP, "d").replace(DAY_REGEXP, "d").replace(STANDALONE_MONTH_REGEXP, "M").replace(HOUR_REGEXP, "H").replace(SQUARE_OPEN_BRACKET_REGEXP, "\\[").replace(SQUARE_CLOSE_BRACKET_REGEXP, "\\]")
            }
            if (datePart) {
                return datePart.replace(ANY_REGEXP, "\\$&")
            }
            return "'"
        }).join("")
    },
    _convertDateFormat: function(format) {
        var formattedValue = (_date.default.format(new Date(2009, 8, 8, 6, 5, 4), format) || "").toString();
        var result = (0, _date2.getFormat)(function(value) {
            return _date.default.format(value, format)
        });
        if (result) {
            result = this._convertDateFormatToOpenXml(result);
            result = this._getLanguageInfo(formattedValue) + result
        }
        return result
    },
    _getLanguageInfo: function(defaultPattern) {
        var languageID = (0, _language_codes.getLanguageId)();
        var languageIDStr = languageID ? languageID.toString(16) : "";
        var languageInfo = "";
        if (this._hasArabicDigits(defaultPattern)) {
            while (languageIDStr.length < 3) {
                languageIDStr = "0" + languageIDStr
            }
            languageInfo = "[$-2010" + languageIDStr + "]"
        } else {
            if (languageIDStr) {
                languageInfo = "[$-" + languageIDStr + "]"
            }
        }
        return languageInfo
    },
    _convertNumberFormat: function(format, precision, currency) {
        var result;
        var excelFormat;
        if ("currency" === format) {
            excelFormat = _number.default.getOpenXmlCurrencyFormat(currency)
        } else {
            excelFormat = DEFINED_NUMBER_FORMTATS[format.toLowerCase()]
        }
        if (excelFormat) {
            result = (0, _string.format)(excelFormat, this._applyPrecision(format, precision))
        }
        return result
    },
    convertFormat: function(format, precision, type, currency) {
        if ((0, _type.isDefined)(format)) {
            if ("date" === type) {
                return excelFormatConverter._convertDateFormat(format)
            } else {
                if ((0, _type.isString)(format) && DEFINED_NUMBER_FORMTATS[format.toLowerCase()]) {
                    return excelFormatConverter._convertNumberFormat(format, precision, currency)
                }
            }
        }
    }
};
var _default = excelFormatConverter;
exports.default = _default;
module.exports = exports.default;
