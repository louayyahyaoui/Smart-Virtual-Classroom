/**
 * DevExtreme (localization/date.js)
 * Version: 20.2.6
 * Build date: Tue Mar 16 2021
 *
 * Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
exports.default = void 0;
var _dependency_injector = _interopRequireDefault(require("../core/utils/dependency_injector"));
var _type = require("../core/utils/type");
var _iterator = require("../core/utils/iterator");
var _array = require("../core/utils/array");
var _errors = _interopRequireDefault(require("../core/errors"));
var _date = require("./ldml/date.formatter");
var _date2 = require("./ldml/date.format");
var _date3 = require("./ldml/date.parser");
var _default_date_names = _interopRequireDefault(require("./default_date_names"));
var _first_day_of_week_data = _interopRequireDefault(require("./cldr-data/first_day_of_week_data"));
var _core = _interopRequireDefault(require("./core"));
var _number = _interopRequireDefault(require("./number"));
var _date4 = _interopRequireDefault(require("./intl/date"));

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        "default": obj
    }
}
var DEFAULT_DAY_OF_WEEK_INDEX = 0;
var hasIntl = "undefined" !== typeof Intl;
var FORMATS_TO_PATTERN_MAP = {
    shortdate: "M/d/y",
    shorttime: "h:mm a",
    longdate: "EEEE, MMMM d, y",
    longtime: "h:mm:ss a",
    monthandday: "MMMM d",
    monthandyear: "MMMM y",
    quarterandyear: "QQQ y",
    day: "d",
    year: "y",
    shortdateshorttime: "M/d/y, h:mm a",
    longdatelongtime: "EEEE, MMMM d, y, h:mm:ss a",
    month: "LLLL",
    shortyear: "yy",
    dayofweek: "EEEE",
    quarter: "QQQ",
    hour: "HH",
    minute: "mm",
    second: "ss",
    millisecond: "SSS",
    "datetime-local": "yyyy-MM-ddTHH':'mm':'ss"
};
var possiblePartPatterns = {
    year: ["y", "yy", "yyyy"],
    day: ["d", "dd"],
    month: ["M", "MM", "MMM", "MMMM"],
    hours: ["H", "HH", "h", "hh", "ah"],
    minutes: ["m", "mm"],
    seconds: ["s", "ss"],
    milliseconds: ["S", "SS", "SSS"]
};
var dateLocalization = (0, _dependency_injector.default)({
    engine: function() {
        return "base"
    },
    _getPatternByFormat: function(format) {
        return FORMATS_TO_PATTERN_MAP[format.toLowerCase()]
    },
    _expandPattern: function(pattern) {
        return this._getPatternByFormat(pattern) || pattern
    },
    formatUsesMonthName: function(format) {
        return this._expandPattern(format).indexOf("MMMM") !== -1
    },
    formatUsesDayName: function(format) {
        return this._expandPattern(format).indexOf("EEEE") !== -1
    },
    getFormatParts: function(format) {
        var pattern = this._getPatternByFormat(format) || format;
        var result = [];
        (0, _iterator.each)(pattern.split(/\W+/), function(_, formatPart) {
            (0, _iterator.each)(possiblePartPatterns, function(partName, possiblePatterns) {
                if ((0, _array.inArray)(formatPart, possiblePatterns) > -1) {
                    result.push(partName)
                }
            })
        });
        return result
    },
    getMonthNames: function(format) {
        return _default_date_names.default.getMonthNames(format)
    },
    getDayNames: function(format) {
        return _default_date_names.default.getDayNames(format)
    },
    getQuarterNames: function(format) {
        return _default_date_names.default.getQuarterNames(format)
    },
    getPeriodNames: function(format) {
        return _default_date_names.default.getPeriodNames(format)
    },
    getTimeSeparator: function() {
        return ":"
    },
    is24HourFormat: function(format) {
        var amTime = new Date(2017, 0, 20, 11, 0, 0, 0);
        var pmTime = new Date(2017, 0, 20, 23, 0, 0, 0);
        var amTimeFormatted = this.format(amTime, format);
        var pmTimeFormatted = this.format(pmTime, format);
        for (var i = 0; i < amTimeFormatted.length; i++) {
            if (amTimeFormatted[i] !== pmTimeFormatted[i]) {
                return !isNaN(parseInt(amTimeFormatted[i]))
            }
        }
    },
    format: function(date, _format) {
        if (!date) {
            return
        }
        if (!_format) {
            return date
        }
        var formatter;
        if ("function" === typeof _format) {
            formatter = _format
        } else {
            if (_format.formatter) {
                formatter = _format.formatter
            } else {
                _format = _format.type || _format;
                if ((0, _type.isString)(_format)) {
                    _format = FORMATS_TO_PATTERN_MAP[_format.toLowerCase()] || _format;
                    return _number.default.convertDigits((0, _date.getFormatter)(_format, this)(date))
                }
            }
        }
        if (!formatter) {
            return
        }
        return formatter(date)
    },
    parse: function(text, format) {
        var that = this;
        var ldmlFormat;
        var formatter;
        if (!text) {
            return
        }
        if (!format) {
            return this.parse(text, "shortdate")
        }
        if (format.parser) {
            return format.parser(text)
        }
        if ("string" === typeof format && !FORMATS_TO_PATTERN_MAP[format.toLowerCase()]) {
            ldmlFormat = format
        } else {
            formatter = function(value) {
                var text = that.format(value, format);
                return _number.default.convertDigits(text, true)
            };
            try {
                ldmlFormat = (0, _date2.getFormat)(formatter)
            } catch (e) {}
        }
        if (ldmlFormat) {
            text = _number.default.convertDigits(text, true);
            return (0, _date3.getParser)(ldmlFormat, this)(text)
        }
        _errors.default.log("W0012");
        var result = new Date(text);
        if (!result || isNaN(result.getTime())) {
            return
        }
        return result
    },
    firstDayOfWeekIndex: function() {
        var index = _core.default.getValueByClosestLocale(function(locale) {
            return _first_day_of_week_data.default[locale]
        });
        return void 0 === index ? DEFAULT_DAY_OF_WEEK_INDEX : index
    }
});
if (hasIntl) {
    dateLocalization.inject(_date4.default)
}
var _default = dateLocalization;
exports.default = _default;
module.exports = exports.default;
