/**
 * DevExtreme (ui/scheduler/rendering_strategies/ui.scheduler.appointments.strategy.horizontal_month_line.js)
 * Version: 20.2.6
 * Build date: Tue Mar 16 2021
 *
 * Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
exports.default = void 0;
var _uiSchedulerAppointmentsStrategy = _interopRequireDefault(require("./ui.scheduler.appointments.strategy.horizontal"));
var _date = _interopRequireDefault(require("../../../core/utils/date"));
var _query = _interopRequireDefault(require("../../../data/query"));

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
var HOURS_IN_DAY = 24;
var MINUTES_IN_HOUR = 60;
var MILLISECONDS_IN_MINUTE = 6e4;
var ZERO_APPOINTMENT_DURATION_IN_DAYS = 1;
var HorizontalMonthLineRenderingStrategy = function(_HorizontalAppointmen) {
    _inheritsLoose(HorizontalMonthLineRenderingStrategy, _HorizontalAppointmen);

    function HorizontalMonthLineRenderingStrategy() {
        return _HorizontalAppointmen.apply(this, arguments) || this
    }
    var _proto = HorizontalMonthLineRenderingStrategy.prototype;
    _proto.calculateAppointmentWidth = function(appointment, position) {
        var startDate = _date.default.trimTime(position.info.appointment.startDate);
        var endDate = this.normalizeEndDateByViewEnd(appointment, position.info.appointment.endDate);
        var cellWidth = this.getDefaultCellWidth() || this.getAppointmentMinSize();
        var duration = this._getDurationInDays(startDate, endDate);
        var width = this.cropAppointmentWidth(Math.ceil(duration) * cellWidth, cellWidth);
        return width
    };
    _proto._getDurationInDays = function(startDate, endDate) {
        var adjustedDuration = this._adjustDurationByDaylightDiff(endDate.getTime() - startDate.getTime(), startDate, endDate);
        return adjustedDuration / _date.default.dateToMilliseconds("day") || ZERO_APPOINTMENT_DURATION_IN_DAYS
    };
    _proto.getDeltaTime = function(args, initialSize) {
        return HOURS_IN_DAY * MINUTES_IN_HOUR * MILLISECONDS_IN_MINUTE * this._getDeltaWidth(args, initialSize)
    };
    _proto.isAllDay = function() {
        return false
    };
    _proto.createTaskPositionMap = function(items, skipSorting) {
        if (!skipSorting) {
            this.instance.getAppointmentsInstance()._sortAppointmentsByStartDate(items)
        }
        return _HorizontalAppointmen.prototype.createTaskPositionMap.call(this, items)
    };
    _proto._getSortedPositions = function(map, skipSorting) {
        var result = _HorizontalAppointmen.prototype._getSortedPositions.call(this, map);
        if (!skipSorting) {
            result = (0, _query.default)(result).sortBy("top").thenBy("left").thenBy("cellPosition").thenBy("i").toArray()
        }
        return result
    };
    _proto.needCorrectAppointmentDates = function() {
        return false
    };
    return HorizontalMonthLineRenderingStrategy
}(_uiSchedulerAppointmentsStrategy.default);
var _default = HorizontalMonthLineRenderingStrategy;
exports.default = _default;
module.exports = exports.default;
