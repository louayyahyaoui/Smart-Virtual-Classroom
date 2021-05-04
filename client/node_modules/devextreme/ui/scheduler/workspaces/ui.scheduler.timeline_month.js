/**
 * DevExtreme (ui/scheduler/workspaces/ui.scheduler.timeline_month.js)
 * Version: 20.2.6
 * Build date: Tue Mar 16 2021
 *
 * Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
exports.default = void 0;
var _component_registrator = _interopRequireDefault(require("../../../core/component_registrator"));
var _uiScheduler = _interopRequireDefault(require("./ui.scheduler.timeline"));
var _date = _interopRequireDefault(require("../../../core/utils/date"));

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        "default": obj
    }
}

function _inheritsLoose(subClass, superClass) {
    subClass.prototype = Object.create(superClass.prototype);
    subClass.prototype.constructor = subClass;
    _setPrototypeOf(subClass, superClass)
}

function _setPrototypeOf(o, p) {
    _setPrototypeOf = Object.setPrototypeOf || function(o, p) {
        o.__proto__ = p;
        return o
    };
    return _setPrototypeOf(o, p)
}
var TIMELINE_CLASS = "dx-scheduler-timeline-month";
var DAY_IN_MILLISECONDS = 864e5;
var toMs = _date.default.dateToMilliseconds;
var SchedulerTimelineMonth = function(_SchedulerTimeline) {
    _inheritsLoose(SchedulerTimelineMonth, _SchedulerTimeline);

    function SchedulerTimelineMonth() {
        return _SchedulerTimeline.apply(this, arguments) || this
    }
    var _proto = SchedulerTimelineMonth.prototype;
    _proto._renderView = function() {
        _SchedulerTimeline.prototype._renderView.call(this);
        this._updateScrollable()
    };
    _proto._getElementClass = function() {
        return TIMELINE_CLASS
    };
    _proto._getDateHeaderTemplate = function() {
        return this.option("dateCellTemplate")
    };
    _proto._getHiddenInterval = function() {
        return 0
    };
    _proto._calculateDurationInCells = function(timeDiff) {
        return timeDiff / this.getCellDuration()
    };
    _proto.getCellDuration = function() {
        return toMs("day")
    };
    _proto.calculateEndViewDate = function(dateOfLastViewCell) {
        return new Date(dateOfLastViewCell.getTime() + this._calculateDayDuration() * toMs("hour"))
    };
    _proto.isIndicatorVisible = function() {
        return true
    };
    _proto._getCellCount = function() {
        var currentDate = this.option("currentDate");
        var cellCount = 0;
        if (this._isWorkSpaceWithCount()) {
            var intervalCount = this.option("intervalCount");
            for (var i = 1; i <= intervalCount; i++) {
                cellCount += new Date(currentDate.getFullYear(), currentDate.getMonth() + i, 0).getDate()
            }
        } else {
            cellCount = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate()
        }
        return cellCount
    };
    _proto._setFirstViewDate = function() {
        this._firstViewDate = _date.default.getFirstMonthDate(this.option("currentDate"));
        this._setStartDayHour(this._firstViewDate)
    };
    _proto._getFormat = function() {
        return this._formatWeekdayAndDay
    };
    _proto._getDateByIndex = function(headerIndex) {
        var resultDate = new Date(this._firstViewDate);
        resultDate.setDate(this._firstViewDate.getDate() + headerIndex);
        return resultDate
    };
    _proto._getInterval = function() {
        return DAY_IN_MILLISECONDS
    };
    _proto._getIntervalBetween = function(currentDate) {
        var firstViewDate = this.getStartViewDate();
        var timeZoneOffset = _date.default.getTimezonesDifference(firstViewDate, currentDate);
        return currentDate.getTime() - (firstViewDate.getTime() - 36e5 * this.option("startDayHour")) - timeZoneOffset
    };
    _proto.calculateEndDate = function(startDate) {
        var startDateCopy = new Date(startDate);
        return new Date(startDateCopy.setHours(this.option("endDayHour")))
    };
    _proto._calculateHiddenInterval = function() {
        return 0
    };
    _proto._getDateByCellIndexes = function(rowIndex, cellIndex) {
        var date = _SchedulerTimeline.prototype._getDateByCellIndexes.call(this, rowIndex, cellIndex);
        this._setStartDayHour(date);
        return date
    };
    _proto.getPositionShift = function() {
        return {
            top: 0,
            left: 0,
            cellPosition: 0
        }
    };
    return SchedulerTimelineMonth
}(_uiScheduler.default);
(0, _component_registrator.default)("dxSchedulerTimelineMonth", SchedulerTimelineMonth);
var _default = SchedulerTimelineMonth;
exports.default = _default;
module.exports = exports.default;
