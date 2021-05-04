"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var DateUtils = (function () {
    function DateUtils() {
    }
    DateUtils.fixTimezoneGap = function (oldDate, newDate) {
        var diff = newDate.getHours() - oldDate.getHours();
        if (diff === 0)
            return;
        var sign = (diff === 1 || diff === -23) ? -1 : 1;
        var trial = new Date(newDate.getTime() + sign * 3600000);
        var isDateChangedAsExpected = newDate.getHours() - trial.getHours() === diff;
        if (isDateChangedAsExpected && (sign > 0 || trial.getDate() === newDate.getDate()))
            newDate.setTime(trial.getTime());
    };
    DateUtils.expandTwoDigitYear = function (value, options) {
        value += 1900;
        if (value + 99 < options.twoDigitYearMax)
            value += 100;
        return value;
    };
    DateUtils.toUtcTime = function (date) {
        var result = new Date();
        result.setTime(date.valueOf() + DateUtils.getTimeZoneOffset(date));
        return result;
    };
    DateUtils.getTimeZoneOffset = function (date) {
        var utcFullYear = date.getUTCFullYear();
        var utcDate = new Date(utcFullYear, date.getUTCMonth(), date.getUTCDate(), date.getUTCHours(), date.getUTCMinutes(), date.getUTCSeconds(), date.getUTCMilliseconds());
        if (utcFullYear < 100)
            utcDate.setFullYear(utcFullYear);
        return utcDate.valueOf() - date.valueOf();
    };
    return DateUtils;
}());
exports.DateUtils = DateUtils;
