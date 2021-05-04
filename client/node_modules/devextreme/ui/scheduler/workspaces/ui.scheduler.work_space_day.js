/**
 * DevExtreme (ui/scheduler/workspaces/ui.scheduler.work_space_day.js)
 * Version: 20.2.6
 * Build date: Tue Mar 16 2021
 *
 * Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
exports.default = void 0;
var _component_registrator = _interopRequireDefault(require("../../../core/component_registrator"));
var _uiScheduler = _interopRequireDefault(require("./ui.scheduler.work_space_vertical"));
var _layout = _interopRequireDefault(require("../../../renovation/ui/scheduler/workspaces/day/date_table/layout.j"));

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
var DAY_CLASS = "dx-scheduler-work-space-day";
var SchedulerWorkSpaceDay = function(_SchedulerWorkSpaceVe) {
    _inheritsLoose(SchedulerWorkSpaceDay, _SchedulerWorkSpaceVe);

    function SchedulerWorkSpaceDay() {
        return _SchedulerWorkSpaceVe.apply(this, arguments) || this
    }
    var _proto = SchedulerWorkSpaceDay.prototype;
    _proto._getElementClass = function() {
        return DAY_CLASS
    };
    _proto._getRowCount = function() {
        return this._getCellCountInDay()
    };
    _proto._getCellCount = function() {
        return this.option("intervalCount")
    };
    _proto._setFirstViewDate = function() {
        this._firstViewDate = this._getViewStartByOptions();
        this._setStartDayHour(this._firstViewDate)
    };
    _proto._getDateByIndex = function(headerIndex) {
        if (1 === this.option("intervalCount")) {
            return this._firstViewDate
        }
        var resultDate = new Date(this._firstViewDate);
        resultDate.setDate(this._firstViewDate.getDate() + headerIndex);
        return resultDate
    };
    _proto._renderDateHeader = function() {
        return 1 === this.option("intervalCount") ? null : _SchedulerWorkSpaceVe.prototype._renderDateHeader.call(this)
    };
    _proto.renderRDateTable = function() {
        this.renderRComponent(this._$dateTable, _layout.default, "renovatedDateTable", {
            viewData: this.viewDataProvider.viewData,
            dataCellTemplate: this.option("dataCellTemplate")
        })
    };
    return SchedulerWorkSpaceDay
}(_uiScheduler.default);
(0, _component_registrator.default)("dxSchedulerWorkSpaceDay", SchedulerWorkSpaceDay);
var _default = SchedulerWorkSpaceDay;
exports.default = _default;
module.exports = exports.default;
