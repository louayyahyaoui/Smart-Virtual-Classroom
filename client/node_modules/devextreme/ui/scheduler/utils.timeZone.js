/**
 * DevExtreme (ui/scheduler/utils.timeZone.js)
 * Version: 20.2.6
 * Build date: Tue Mar 16 2021
 *
 * Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
exports.default = void 0;
var _date = _interopRequireDefault(require("../../core/utils/date"));
var _utils = _interopRequireDefault(require("./timezones/utils.timezones_data"));
var _dateAdapter = _interopRequireDefault(require("./dateAdapter"));

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
var MINUTES_IN_HOUR = 60;
var createUTCDateWithLocalOffset = function(date) {
    if (!date) {
        return null
    }
    return new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds()))
};
var createDateFromUTCWithLocalOffset = function(date) {
    var result = (0, _dateAdapter.default)(date);
    var timezoneOffsetBeforeInMin = result.getTimezoneOffset();
    result.addTime(result.getTimezoneOffset("minute"));
    result.subtractMinutes(timezoneOffsetBeforeInMin - result.getTimezoneOffset());
    return result.source
};
var getTimeZones = function() {
    var date = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : new Date;
    var dateInUTC = createUTCDate(date);
    return _utils.default.getDisplayedTimeZones(dateInUTC.getTime())
};
var createUTCDate = function(date) {
    return new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(), date.getUTCHours(), date.getUTCMinutes()))
};
var getTimezoneOffsetChangeInMinutes = function(startDate, endDate, updatedStartDate, updatedEndDate) {
    return getDaylightOffset(updatedStartDate, updatedEndDate) - getDaylightOffset(startDate, endDate)
};
var getTimezoneOffsetChangeInMs = function(startDate, endDate, updatedStartDate, updatedEndDate) {
    return getTimezoneOffsetChangeInMinutes(startDate, endDate, updatedStartDate, updatedEndDate) * toMs("minute")
};
var getDaylightOffset = function(startDate, endDate) {
    return new Date(startDate).getTimezoneOffset() - new Date(endDate).getTimezoneOffset()
};
var getDaylightOffsetInMs = function(startDate, endDate) {
    return getDaylightOffset(startDate, endDate) * toMs("minute")
};
var calculateTimezoneByValue = function(timezone) {
    var date = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : new Date;
    if ("string" === typeof timezone) {
        var dateUtc = createUTCDate(date);
        return _utils.default.getTimeZoneOffsetById(timezone, dateUtc.getTime())
    }
    return timezone
};
var _getDaylightOffsetByTimezone = function(startDate, endDate, timeZone) {
    return calculateTimezoneByValue(timeZone, startDate) - calculateTimezoneByValue(timeZone, endDate)
};
var getCorrectedDateByDaylightOffsets = function(convertedOriginalStartDate, convertedDate, date, timeZone, startDateTimezone) {
    var daylightOffsetByCommonTimezone = _getDaylightOffsetByTimezone(convertedOriginalStartDate, convertedDate, timeZone);
    var daylightOffsetByAppointmentTimezone = _getDaylightOffsetByTimezone(convertedOriginalStartDate, convertedDate, startDateTimezone);
    var diff = daylightOffsetByCommonTimezone - daylightOffsetByAppointmentTimezone;
    return new Date(date.getTime() - diff * toMs("hour"))
};
var correctRecurrenceExceptionByTimezone = function(exception, exceptionByStartDate, timeZone, startDateTimeZone) {
    var isBackConversion = arguments.length > 4 && void 0 !== arguments[4] ? arguments[4] : false;
    var timezoneOffset = (exception.getTimezoneOffset() - exceptionByStartDate.getTimezoneOffset()) / MINUTES_IN_HOUR;
    if (startDateTimeZone) {
        timezoneOffset = _getDaylightOffsetByTimezone(exceptionByStartDate, exception, startDateTimeZone)
    } else {
        if (timeZone) {
            timezoneOffset = _getDaylightOffsetByTimezone(exceptionByStartDate, exception, timeZone)
        }
    }
    return new Date(exception.getTime() + (isBackConversion ? -1 : 1) * timezoneOffset * toMs("hour"))
};
var isTimezoneChangeInDate = function(date) {
    var startDayDate = new Date(new Date(date).setHours(0, 0, 0, 0));
    var endDayDate = new Date(new Date(date).setHours(23, 59, 59, 0));
    return startDayDate.getTimezoneOffset() - endDayDate.getTimezoneOffset() !== 0
};
var getDateWithoutTimezoneChange = function(date) {
    var clonedDate = new Date(date);
    if (isTimezoneChangeInDate(clonedDate)) {
        var result = new Date(clonedDate);
        return new Date(result.setDate(result.getDate() + 1))
    }
    return clonedDate
};
var isSameAppointmentDates = function(startDate, endDate) {
    endDate = new Date(endDate.getTime() - 1);
    return _date.default.sameDate(startDate, endDate)
};
var getClientTimezoneOffset = function() {
    var date = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : new Date;
    return 6e4 * date.getTimezoneOffset()
};
var isEqualLocalTimeZone = function(timeZoneName) {
    var date = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : new Date;
    if (Intl) {
        var localTimeZoneName = Intl.DateTimeFormat().resolvedOptions().timeZone;
        if (localTimeZoneName === timeZoneName) {
            return true
        }
    }
    return isEqualLocalTimeZoneByDeclaration(timeZoneName, date)
};
var hasDSTInLocalTimeZone = function() {
    var _getExtremeDates = getExtremeDates(),
        _getExtremeDates2 = _slicedToArray(_getExtremeDates, 2),
        startDate = _getExtremeDates2[0],
        endDate = _getExtremeDates2[1];
    return startDate.getTimezoneOffset() !== endDate.getTimezoneOffset()
};
var isEqualLocalTimeZoneByDeclaration = function(timeZoneName, date) {
    var year = date.getFullYear();
    var getOffset = function(date) {
        return -date.getTimezoneOffset() / 60
    };
    var getDateAndMoveHourBack = function(dateStamp) {
        return new Date(dateStamp - 36e5)
    };
    var configTuple = _utils.default.getTimeZoneDeclarationTuple(timeZoneName, year);
    var _configTuple = _slicedToArray(configTuple, 2),
        summerTime = _configTuple[0],
        winterTime = _configTuple[1];
    var noDSTInTargetTimeZone = 0 === configTuple.length;
    if (noDSTInTargetTimeZone) {
        var targetTimeZoneOffset = _utils.default.getTimeZoneOffsetById(timeZoneName, date);
        var localTimeZoneOffset = getOffset(date);
        if (targetTimeZoneOffset !== localTimeZoneOffset) {
            return false
        }
        return hasDSTInLocalTimeZone() ? false : true
    }
    var localSummerOffset = getOffset(new Date(summerTime.date));
    var localWinterOffset = getOffset(new Date(winterTime.date));
    if (localSummerOffset !== summerTime.offset) {
        return false
    }
    if (localSummerOffset === getOffset(getDateAndMoveHourBack(summerTime.date))) {
        return false
    }
    if (localWinterOffset !== winterTime.offset) {
        return false
    }
    if (localWinterOffset === getOffset(getDateAndMoveHourBack(winterTime.date))) {
        return false
    }
    return true
};
var getExtremeDates = function() {
    var nowDate = new Date(Date.now());
    var startDate = new Date;
    var endDate = new Date;
    startDate.setFullYear(nowDate.getFullYear(), 0, 1);
    endDate.setFullYear(nowDate.getFullYear(), 6, 1);
    return [startDate, endDate]
};
var utils = {
    getDaylightOffset: getDaylightOffset,
    getDaylightOffsetInMs: getDaylightOffsetInMs,
    getTimezoneOffsetChangeInMinutes: getTimezoneOffsetChangeInMinutes,
    getTimezoneOffsetChangeInMs: getTimezoneOffsetChangeInMs,
    calculateTimezoneByValue: calculateTimezoneByValue,
    getCorrectedDateByDaylightOffsets: getCorrectedDateByDaylightOffsets,
    isSameAppointmentDates: isSameAppointmentDates,
    correctRecurrenceExceptionByTimezone: correctRecurrenceExceptionByTimezone,
    getClientTimezoneOffset: getClientTimezoneOffset,
    createUTCDateWithLocalOffset: createUTCDateWithLocalOffset,
    createDateFromUTCWithLocalOffset: createDateFromUTCWithLocalOffset,
    createUTCDate: createUTCDate,
    isTimezoneChangeInDate: isTimezoneChangeInDate,
    getDateWithoutTimezoneChange: getDateWithoutTimezoneChange,
    hasDSTInLocalTimeZone: hasDSTInLocalTimeZone,
    isEqualLocalTimeZone: isEqualLocalTimeZone,
    isEqualLocalTimeZoneByDeclaration: isEqualLocalTimeZoneByDeclaration,
    getTimeZones: getTimeZones
};
var _default = utils;
exports.default = _default;
module.exports = exports.default;
