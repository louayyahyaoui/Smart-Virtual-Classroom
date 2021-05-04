/**
 * DevExtreme (ui/scheduler/workspaces/ui.scheduler.work_space_week.js)
 * Version: 20.2.6
 * Build date: Tue Mar 16 2021
 *
 * Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
exports.default = void 0;
var _component_registrator = _interopRequireDefault(require("../../../core/component_registrator"));
var _date = _interopRequireDefault(require("../../../core/utils/date"));
var _date2 = _interopRequireDefault(require("../../../localization/date"));
var _uiScheduler = _interopRequireDefault(require("./ui.scheduler.work_space_vertical"));
var _layout = _interopRequireDefault(require("../../../renovation/ui/scheduler/workspaces/week/date_table/layout.j"));

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
var WEEK_CLASS = "dx-scheduler-work-space-week";
var toMs = _date.default.dateToMilliseconds;
var SchedulerWorkSpaceWeek = function(_SchedulerWorkSpaceVe) {
    _inheritsLoose(SchedulerWorkSpaceWeek, _SchedulerWorkSpaceVe);

    function SchedulerWorkSpaceWeek() {
        return _SchedulerWorkSpaceVe.apply(this, arguments) || this
    }
    var _proto = SchedulerWorkSpaceWeek.prototype;
    _proto._getElementClass = function() {
        return WEEK_CLASS
    };
    _proto._getRowCount = function() {
        return this._getCellCountInDay()
    };
    _proto._getCellCount = function() {
        return 7 * this.option("intervalCount")
    };
    _proto._getDateByIndex = function(headerIndex) {
        var resultDate = new Date(this._firstViewDate);
        resultDate.setDate(this._firstViewDate.getDate() + headerIndex);
        return resultDate
    };
    _proto._getStartViewDate = function() {
        return _date.default.getFirstWeekDate(this.option("startDate"), this._firstDayOfWeek() || _date2.default.firstDayOfWeekIndex())
    };
    _proto._getIntervalDuration = function() {
        return 7 * toMs("day") * this.option("intervalCount")
    };
    _proto.getPositionShift = function(timeShift, isAllDay) {
        if (!isAllDay && this.invoke("isAdaptive") && 0 === this.invoke("getMaxAppointmentCountPerCellByType")) {
            return {
                top: 0,
                left: 0,
                cellPosition: 0
            }
        }
        return _SchedulerWorkSpaceVe.prototype.getPositionShift.call(this, timeShift, isAllDay)
    };
    _proto._isApplyCompactAppointmentOffset = function() {
        if (this.invoke("isAdaptive") && 0 === this.invoke("getMaxAppointmentCountPerCellByType")) {
            return false
        }
        return _SchedulerWorkSpaceVe.prototype._isApplyCompactAppointmentOffset.call(this)
    };
    _proto.renderRDateTable = function() {
        this.renderRComponent(this._$dateTable, _layout.default, "renovatedDateTable", {
            viewData: this.viewDataProvider.viewData,
            dataCellTemplate: this.option("dataCellTemplate")
        })
    };
    return SchedulerWorkSpaceWeek
}(_uiScheduler.default);
(0, _component_registrator.default)("dxSchedulerWorkSpaceWeek", SchedulerWorkSpaceWeek);
var _default = SchedulerWorkSpaceWeek;
exports.default = _default;
module.exports = exports.default;
