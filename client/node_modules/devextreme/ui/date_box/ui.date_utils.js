/**
 * DevExtreme (ui/date_box/ui.date_utils.js)
 * Version: 20.2.6
 * Build date: Tue Mar 16 2021
 *
 * Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
exports.default = void 0;
var _renderer = _interopRequireDefault(require("../../core/renderer"));
var _date_serialization = _interopRequireDefault(require("../../core/utils/date_serialization"));
var _type = require("../../core/utils/type");
var _iterator = require("../../core/utils/iterator");
var _date = _interopRequireDefault(require("../../localization/date"));

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        "default": obj
    }
}

function _typeof(obj) {
    "@babel/helpers - typeof";
    if ("function" === typeof Symbol && "symbol" === typeof Symbol.iterator) {
        _typeof = function(obj) {
            return typeof obj
        }
    } else {
        _typeof = function(obj) {
            return obj && "function" === typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj
        }
    }
    return _typeof(obj)
}
var dateComponents = function() {
    return ["year", "day", "month", "day"]
};
var ONE_MINUTE = 6e4;
var ONE_DAY = 60 * ONE_MINUTE * 24;
var ONE_YEAR = 365 * ONE_DAY;
var getStringFormat = function(format) {
    var formatType = _typeof(format);
    if ("string" === formatType) {
        return "format"
    }
    if ("object" === formatType && void 0 !== format.type) {
        return format.type
    }
    return null
};
var dateUtils = {
    SUPPORTED_FORMATS: ["date", "time", "datetime"],
    DATE_COMPONENT_TEXT_FORMATTER: function(value, name) {
        var $container = (0, _renderer.default)("<div>").addClass("dx-dateview-formatter-container");
        (0, _renderer.default)("<span>").text(value).addClass("dx-dateview-value-formatter").appendTo($container);
        (0, _renderer.default)("<span>").text(name).addClass("dx-dateview-name-formatter").appendTo($container);
        return $container
    },
    ONE_MINUTE: ONE_MINUTE,
    ONE_DAY: ONE_DAY,
    ONE_YEAR: ONE_YEAR,
    MIN_DATEVIEW_DEFAULT_DATE: new Date(1900, 0, 1),
    MAX_DATEVIEW_DEFAULT_DATE: function() {
        var newDate = new Date;
        return new Date(newDate.getFullYear() + 50, newDate.getMonth(), newDate.getDate(), 23, 59, 59)
    }(),
    FORMATS_INFO: {
        date: {
            getStandardPattern: function() {
                return "yyyy-MM-dd"
            },
            components: dateComponents()
        },
        time: {
            getStandardPattern: function() {
                return "HH:mm"
            },
            components: ["hours", "minutes", "seconds", "milliseconds"]
        },
        datetime: {
            getStandardPattern: function() {
                var standardPattern;
                ! function() {
                    var androidFormatPattern = "yyyy-MM-ddTHH:mmZ";
                    var testDateString = "2000-01-01T01:01Z";
                    var $input = (0, _renderer.default)("<input>").attr("type", "datetime");
                    $input.val(testDateString);
                    if ($input.val()) {
                        standardPattern = androidFormatPattern
                    }
                }();
                if (!standardPattern) {
                    standardPattern = "yyyy-MM-ddTHH:mm:ssZ"
                }
                dateUtils.FORMATS_INFO.datetime.getStandardPattern = function() {
                    return standardPattern
                };
                return standardPattern
            },
            components: dateComponents().concat(["hours", "minutes", "seconds", "milliseconds"])
        },
        "datetime-local": {
            getStandardPattern: function() {
                return "yyyy-MM-ddTHH:mm:ss"
            },
            components: dateComponents().concat(["hours", "minutes", "seconds"])
        }
    },
    FORMATS_MAP: {
        date: "shortdate",
        time: "shorttime",
        datetime: "shortdateshorttime"
    },
    SUBMIT_FORMATS_MAP: {
        date: "date",
        time: "time",
        datetime: "datetime-local"
    },
    toStandardDateFormat: function(date, type) {
        var pattern = dateUtils.FORMATS_INFO[type].getStandardPattern();
        return _date_serialization.default.serializeDate(date, pattern)
    },
    fromStandardDateFormat: function(text) {
        var date = _date_serialization.default.dateParser(text);
        return (0, _type.isDate)(date) ? date : void 0
    },
    getMaxMonthDay: function(year, month) {
        return new Date(year, month + 1, 0).getDate()
    },
    mergeDates: function(oldValue, newValue, format) {
        if (!newValue) {
            return newValue || null
        }
        if (!oldValue || isNaN(oldValue.getTime())) {
            var now = new Date(null);
            oldValue = new Date(now.getFullYear(), now.getMonth(), now.getDate())
        }
        var result = new Date(oldValue.valueOf());
        var formatInfo = dateUtils.FORMATS_INFO[format];
        (0, _iterator.each)(formatInfo.components, function() {
            var componentInfo = dateUtils.DATE_COMPONENTS_INFO[this];
            result[componentInfo.setter](newValue[componentInfo.getter]())
        });
        return result
    },
    getLongestCaptionIndex: function(captionArray) {
        var longestIndex = 0;
        var longestCaptionLength = 0;
        var i;
        for (i = 0; i < captionArray.length; ++i) {
            if (captionArray[i].length > longestCaptionLength) {
                longestIndex = i;
                longestCaptionLength = captionArray[i].length
            }
        }
        return longestIndex
    },
    formatUsesMonthName: function(format) {
        return _date.default.formatUsesMonthName(format)
    },
    formatUsesDayName: function(format) {
        return _date.default.formatUsesDayName(format)
    },
    getLongestDate: function(format, monthNames, dayNames) {
        var stringFormat = getStringFormat(format);
        var month = 9;
        if (!stringFormat || dateUtils.formatUsesMonthName(stringFormat)) {
            month = dateUtils.getLongestCaptionIndex(monthNames)
        }
        var longestDate = new Date(1888, month, 21, 23, 59, 59, 999);
        if (!stringFormat || dateUtils.formatUsesDayName(stringFormat)) {
            var date = longestDate.getDate() - longestDate.getDay() + dateUtils.getLongestCaptionIndex(dayNames);
            longestDate.setDate(date)
        }
        return longestDate
    },
    normalizeTime: function(date) {
        date.setSeconds(0);
        date.setMilliseconds(0)
    }
};
dateUtils.DATE_COMPONENTS_INFO = {
    year: {
        getter: "getFullYear",
        setter: "setFullYear",
        formatter: function(value, date) {
            var formatDate = new Date(date.getTime());
            formatDate.setFullYear(value);
            return _date.default.format(formatDate, "yyyy")
        },
        startValue: void 0,
        endValue: void 0
    },
    day: {
        getter: "getDate",
        setter: "setDate",
        formatter: function(value, date) {
            var formatDate = new Date(date.getTime());
            formatDate.setDate(value);
            return _date.default.format(formatDate, "d")
        },
        startValue: 1,
        endValue: void 0
    },
    month: {
        getter: "getMonth",
        setter: "setMonth",
        formatter: function(value) {
            return _date.default.getMonthNames()[value]
        },
        startValue: 0,
        endValue: 11
    },
    hours: {
        getter: "getHours",
        setter: "setHours",
        formatter: function(value) {
            return _date.default.format(new Date(0, 0, 0, value), "hour")
        },
        startValue: 0,
        endValue: 23
    },
    minutes: {
        getter: "getMinutes",
        setter: "setMinutes",
        formatter: function(value) {
            return _date.default.format(new Date(0, 0, 0, 0, value), "minute")
        },
        startValue: 0,
        endValue: 59
    },
    seconds: {
        getter: "getSeconds",
        setter: "setSeconds",
        formatter: function(value) {
            return _date.default.format(new Date(0, 0, 0, 0, 0, value), "second")
        },
        startValue: 0,
        endValue: 59
    },
    milliseconds: {
        getter: "getMilliseconds",
        setter: "setMilliseconds",
        formatter: function(value) {
            return _date.default.format(new Date(0, 0, 0, 0, 0, 0, value), "millisecond")
        },
        startValue: 0,
        endValue: 999
    }
};
var _default = dateUtils;
exports.default = _default;
module.exports = exports.default;
