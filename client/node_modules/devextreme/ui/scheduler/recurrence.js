/**
 * DevExtreme (ui/scheduler/recurrence.js)
 * Version: 20.2.6
 * Build date: Tue Mar 16 2021
 *
 * Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
exports.getRecurrenceProcessor = getRecurrenceProcessor;
var _errors = _interopRequireDefault(require("../../core/errors"));
var _iterator = require("../../core/utils/iterator");
var _array = require("../../core/utils/array");
var _rrule = require("rrule");
var _date = _interopRequireDefault(require("../../core/utils/date"));
var _utilsTimeZone = _interopRequireDefault(require("./utils.timeZone.js"));

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        "default": obj
    }
}

function _slicedToArray(arr, i) {
    return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest()
}

function _nonIterableRest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
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

function _arrayLikeToArray(arr, len) {
    if (null == len || len > arr.length) {
        len = arr.length
    }
    for (var i = 0, arr2 = new Array(len); i < len; i++) {
        arr2[i] = arr[i]
    }
    return arr2
}

function _iterableToArrayLimit(arr, i) {
    if ("undefined" === typeof Symbol || !(Symbol.iterator in Object(arr))) {
        return
    }
    var _arr = [];
    var _n = true;
    var _d = false;
    var _e = void 0;
    try {
        for (var _s, _i = arr[Symbol.iterator](); !(_n = (_s = _i.next()).done); _n = true) {
            _arr.push(_s.value);
            if (i && _arr.length === i) {
                break
            }
        }
    } catch (err) {
        _d = true;
        _e = err
    } finally {
        try {
            if (!_n && null != _i.return) {
                _i.return()
            }
        } finally {
            if (_d) {
                throw _e
            }
        }
    }
    return _arr
}

function _arrayWithHoles(arr) {
    if (Array.isArray(arr)) {
        return arr
    }
}
var toMs = _date.default.dateToMilliseconds;
var ruleNames = ["freq", "interval", "byday", "byweekno", "byyearday", "bymonth", "bymonthday", "count", "until", "byhour", "byminute", "bysecond", "bysetpos", "wkst"];
var freqNames = ["DAILY", "WEEKLY", "MONTHLY", "YEARLY", "SECONDLY", "MINUTELY", "HOURLY"];
var days = {
    SU: 0,
    MO: 1,
    TU: 2,
    WE: 3,
    TH: 4,
    FR: 5,
    SA: 6
};
var loggedWarnings = [];
var recurrence = null;

function getRecurrenceProcessor() {
    if (!recurrence) {
        recurrence = new RecurrenceProcessor
    }
    return recurrence
}
var RecurrenceProcessor = function() {
    function RecurrenceProcessor() {
        this.rRule = null;
        this.rRuleSet = null;
        this.validator = new RecurrenceValidator
    }
    var _proto = RecurrenceProcessor.prototype;
    _proto.generateDates = function(options) {
        var result = [];
        var recurrenceRule = this.evalRecurrenceRule(options.rule);
        var rule = recurrenceRule.rule;
        if (!recurrenceRule.isValid || !rule.freq) {
            return result
        }
        var startDateUtc = _utilsTimeZone.default.createUTCDateWithLocalOffset(options.start);
        var endDateUtc = _utilsTimeZone.default.createUTCDateWithLocalOffset(options.end);
        var minDateUtc = _utilsTimeZone.default.createUTCDateWithLocalOffset(options.min);
        var maxDateUtc = _utilsTimeZone.default.createUTCDateWithLocalOffset(options.max);
        var duration = endDateUtc ? endDateUtc.getTime() - startDateUtc.getTime() : 0;
        this._initializeRRule(options, startDateUtc);
        var minTime = minDateUtc.getTime();
        var leftBorder = this._getLeftBorder(options, minDateUtc, duration);
        this.rRuleSet.between(leftBorder, maxDateUtc, true).forEach(function(date) {
            var endAppointmentTime = date.getTime() + duration;
            if (endAppointmentTime >= minTime) {
                var correctDate = _utilsTimeZone.default.createDateFromUTCWithLocalOffset(date);
                result.push(correctDate)
            }
        });
        return result
    };
    _proto.hasRecurrence = function(options) {
        return !!this.generateDates(options).length
    };
    _proto.evalRecurrenceRule = function(rule) {
        var result = {
            rule: {},
            isValid: false
        };
        if (rule) {
            result.rule = this._parseRecurrenceRule(rule);
            result.isValid = this.validator.validateRRule(result.rule, rule)
        }
        return result
    };
    _proto.isValidRecurrenceRule = function(rule) {
        return this.evalRecurrenceRule(rule).isValid
    };
    _proto.daysFromByDayRule = function(rule) {
        var result = [];
        if (rule.byday) {
            if (Array.isArray(rule.byday)) {
                result = rule.byday
            } else {
                result = rule.byday.split(",")
            }
        }
        return result.map(function(item) {
            var match = item.match(/[A-Za-z]+/);
            return !!match && match[0]
        }).filter(function(item) {
            return !!item
        })
    };
    _proto.getAsciiStringByDate = function(date) {
        var currentOffset = this._getTimeZoneOffset() * toMs("minute");
        var offsetDate = new Date(date.getTime() + currentOffset);
        return offsetDate.getFullYear() + ("0" + (offsetDate.getMonth() + 1)).slice(-2) + ("0" + offsetDate.getDate()).slice(-2) + "T" + ("0" + offsetDate.getHours()).slice(-2) + ("0" + offsetDate.getMinutes()).slice(-2) + ("0" + offsetDate.getSeconds()).slice(-2) + "Z"
    };
    _proto.getRecurrenceString = function(object) {
        if (!object || !object.freq) {
            return
        }
        var result = "";
        for (var field in object) {
            var value = object[field];
            if ("interval" === field && value < 2) {
                continue
            }
            if ("until" === field) {
                value = this.getAsciiStringByDate(value)
            }
            result += field + "=" + value + ";"
        }
        result = result.substring(0, result.length - 1);
        return result.toUpperCase()
    };
    _proto._parseExceptionToRawArray = function(value) {
        return value.match(/(\d{4})(\d{2})(\d{2})(T(\d{2})(\d{2})(\d{2}))?(Z)?/)
    };
    _proto.getDateByAsciiString = function(exceptionText) {
        if ("string" !== typeof exceptionText) {
            return exceptionText
        }
        var result = this._parseExceptionToRawArray(exceptionText);
        if (!result) {
            return null
        }
        var _this$_createDateTupl = this._createDateTuple(result),
            _this$_createDateTupl2 = _slicedToArray(_this$_createDateTupl, 7),
            year = _this$_createDateTupl2[0],
            month = _this$_createDateTupl2[1],
            date = _this$_createDateTupl2[2],
            hours = _this$_createDateTupl2[3],
            minutes = _this$_createDateTupl2[4],
            seconds = _this$_createDateTupl2[5],
            isUtc = _this$_createDateTupl2[6];
        if (isUtc) {
            return new Date(Date.UTC(year, month, date, hours, minutes, seconds))
        }
        return new Date(year, month, date, hours, minutes, seconds)
    };
    _proto._dispose = function() {
        if (this.rRuleSet) {
            delete this.rRuleSet;
            this.rRuleSet = null
        }
        if (this.rRule) {
            delete this.rRule;
            this.rRule = null
        }
    };
    _proto._getTimeZoneOffset = function() {
        return (new Date).getTimezoneOffset()
    };
    _proto._initializeRRule = function(options, startDateUtc) {
        var _this = this;
        var ruleOptions = _rrule.RRule.parseString(options.rule);
        var firstDayOfWeek = options.firstDayOfWeek;
        ruleOptions.dtstart = startDateUtc;
        if (!ruleOptions.wkst && firstDayOfWeek) {
            var weekDayNumbers = [6, 0, 1, 2, 3, 4, 5];
            ruleOptions.wkst = weekDayNumbers[firstDayOfWeek]
        }
        this._createRRule(ruleOptions);
        if (options.exception) {
            var exceptionStrings = options.exception;
            var exceptionDates = exceptionStrings.split(",").map(function(rule) {
                return _this.getDateByAsciiString(rule)
            });
            exceptionDates.forEach(function(date) {
                if (options.getPostProcessedException) {
                    date = options.getPostProcessedException(date)
                }
                var utcDate = _utilsTimeZone.default.createUTCDateWithLocalOffset(date);
                _this.rRuleSet.exdate(utcDate)
            })
        }
    };
    _proto._createRRule = function(ruleOptions) {
        this._dispose();
        var rRuleSet = new _rrule.RRuleSet;
        this.rRuleSet = rRuleSet;
        this.rRule = new _rrule.RRule(ruleOptions);
        this.rRuleSet.rrule(this.rRule)
    };
    _proto._getLeftBorder = function(options, minDateUtc, appointmentDuration) {
        if (options.end && !_utilsTimeZone.default.isSameAppointmentDates(options.start, options.end)) {
            return new Date(minDateUtc.getTime() - appointmentDuration)
        }
        return minDateUtc
    };
    _proto._parseRecurrenceRule = function(recurrence) {
        var ruleObject = {};
        var ruleParts = recurrence.split(";");
        for (var i = 0, len = ruleParts.length; i < len; i++) {
            var rule = ruleParts[i].split("=");
            var ruleName = rule[0].toLowerCase();
            var ruleValue = rule[1];
            ruleObject[ruleName] = ruleValue
        }
        var count = parseInt(ruleObject.count);
        if (!isNaN(count)) {
            ruleObject.count = count
        }
        if (ruleObject.interval) {
            var interval = parseInt(ruleObject.interval);
            if (!isNaN(interval)) {
                ruleObject.interval = interval
            }
        } else {
            ruleObject.interval = 1
        }
        if (ruleObject.freq && ruleObject.until) {
            ruleObject.until = this.getDateByAsciiString(ruleObject.until)
        }
        return ruleObject
    };
    _proto._createDateTuple = function(parseResult) {
        var isUtc = void 0 !== parseResult[8];
        parseResult.shift();
        if (void 0 === parseResult[3]) {
            parseResult.splice(3)
        } else {
            parseResult.splice(3, 1);
            parseResult.splice(6)
        }
        parseResult[1]--;
        parseResult.unshift(null);
        return [parseInt(parseResult[1]), parseInt(parseResult[2]), parseInt(parseResult[3]), parseInt(parseResult[4]) || 0, parseInt(parseResult[5]) || 0, parseInt(parseResult[6]) || 0, isUtc]
    };
    return RecurrenceProcessor
}();
var RecurrenceValidator = function() {
    function RecurrenceValidator() {}
    var _proto2 = RecurrenceValidator.prototype;
    _proto2.validateRRule = function(rule, recurrence) {
        if (this._brokenRuleNameExists(rule) || (0, _array.inArray)(rule.freq, freqNames) === -1 || this._wrongCountRule(rule) || this._wrongIntervalRule(rule) || this._wrongDayOfWeek(rule) || this._wrongByMonthDayRule(rule) || this._wrongByMonth(rule) || this._wrongUntilRule(rule)) {
            this._logBrokenRule(recurrence);
            return false
        }
        return true
    };
    _proto2._wrongUntilRule = function(rule) {
        var wrongUntil = false;
        var until = rule.until;
        if (void 0 !== until && !(until instanceof Date)) {
            wrongUntil = true
        }
        return wrongUntil
    };
    _proto2._wrongCountRule = function(rule) {
        var wrongCount = false;
        var count = rule.count;
        if (count && "string" === typeof count) {
            wrongCount = true
        }
        return wrongCount
    };
    _proto2._wrongByMonthDayRule = function(rule) {
        var wrongByMonthDay = false;
        var byMonthDay = rule.bymonthday;
        if (byMonthDay && isNaN(parseInt(byMonthDay))) {
            wrongByMonthDay = true
        }
        return wrongByMonthDay
    };
    _proto2._wrongByMonth = function(rule) {
        var wrongByMonth = false;
        var byMonth = rule.bymonth;
        if (byMonth && isNaN(parseInt(byMonth))) {
            wrongByMonth = true
        }
        return wrongByMonth
    };
    _proto2._wrongIntervalRule = function(rule) {
        var wrongInterval = false;
        var interval = rule.interval;
        if (interval && "string" === typeof interval) {
            wrongInterval = true
        }
        return wrongInterval
    };
    _proto2._wrongDayOfWeek = function(rule) {
        var byDay = rule.byday;
        var daysByRule = getRecurrenceProcessor().daysFromByDayRule(rule);
        var brokenDaysExist = false;
        if ("" === byDay) {
            brokenDaysExist = true
        }(0, _iterator.each)(daysByRule, function(_, day) {
            if (!Object.prototype.hasOwnProperty.call(days, day)) {
                brokenDaysExist = true;
                return false
            }
        });
        return brokenDaysExist
    };
    _proto2._brokenRuleNameExists = function(rule) {
        var brokenRuleExists = false;
        (0, _iterator.each)(rule, function(ruleName) {
            if ((0, _array.inArray)(ruleName, ruleNames) === -1) {
                brokenRuleExists = true;
                return false
            }
        });
        return brokenRuleExists
    };
    _proto2._logBrokenRule = function(recurrence) {
        if ((0, _array.inArray)(recurrence, loggedWarnings) === -1) {
            _errors.default.log("W0006", recurrence);
            loggedWarnings.push(recurrence)
        }
    };
    return RecurrenceValidator
}();
