/**
 * DevExtreme (ui/scheduler/workspaces/utils.work_week.js)
 * Version: 20.2.6
 * Build date: Tue Mar 16 2021
 *
 * Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
exports.default = void 0;
var _date = _interopRequireDefault(require("../../../core/utils/date"));

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        "default": obj
    }
}
var MONDAY_INDEX = 1;
var SATURDAY_INDEX = 6;
var SUNDAY_INDEX = 0;
var workWeekUtils = function() {
    function workWeekUtils() {}
    workWeekUtils.isDataOnWeekend = function(date) {
        var day = date.getDay();
        return day === SATURDAY_INDEX || day === SUNDAY_INDEX
    };
    workWeekUtils.getFirstDayOfWeek = function(firstDayOfWeekOption) {
        return firstDayOfWeekOption || MONDAY_INDEX
    };
    workWeekUtils.getWeekendsCount = function(days) {
        return 2 * Math.floor(days / 7)
    };
    workWeekUtils.getFirstViewDate = function(viewStart, firstDayOfWeek) {
        var firstViewDate = _date.default.getFirstWeekDate(viewStart, firstDayOfWeek);
        return _date.default.normalizeDateByWeek(firstViewDate, viewStart)
    };
    return workWeekUtils
}();
var _default = workWeekUtils;
exports.default = _default;
module.exports = exports.default;
