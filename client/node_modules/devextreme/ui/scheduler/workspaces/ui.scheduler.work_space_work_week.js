/**
 * DevExtreme (ui/scheduler/workspaces/ui.scheduler.work_space_work_week.js)
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
var _utils = _interopRequireDefault(require("./utils.work_week"));
var _uiScheduler = _interopRequireDefault(require("./ui.scheduler.work_space_week"));

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
var toMs = _date.default.dateToMilliseconds;
var WORK_WEEK_CLASS = "dx-scheduler-work-space-work-week";
var dayIndexes = [1, 2, 3, 4, 5];
var weekCounter = 0;
var SchedulerWorkSpaceWorkWeek = function(_SchedulerWorkSpaceWe) {
    _inheritsLoose(SchedulerWorkSpaceWorkWeek, _SchedulerWorkSpaceWe);

    function SchedulerWorkSpaceWorkWeek() {
        var _this;
        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key]
        }
        _this = _SchedulerWorkSpaceWe.call.apply(_SchedulerWorkSpaceWe, [this].concat(args)) || this;
        _this._isSkippedData = _utils.default.isDataOnWeekend;
        _this._getWeekendsCount = _utils.default.getWeekendsCount;
        return _this
    }
    var _proto = SchedulerWorkSpaceWorkWeek.prototype;
    _proto._getElementClass = function() {
        return WORK_WEEK_CLASS
    };
    _proto._getCellCount = function() {
        return 5 * this.option("intervalCount")
    };
    _proto._firstDayOfWeek = function() {
        return _utils.default.getFirstDayOfWeek(this.option("firstDayOfWeek"))
    };
    _proto._getDateByIndex = function(headerIndex) {
        var resultDate = new Date(this._firstViewDate);
        if (headerIndex % this._getCellCount() === 0) {
            weekCounter = 0
        }
        resultDate.setDate(this._firstViewDate.getDate() + headerIndex + weekCounter);
        var index = resultDate.getDay();
        while (dayIndexes.indexOf(index) === -1) {
            resultDate.setDate(resultDate.getDate() + 1);
            index = resultDate.getDay();
            weekCounter++
        }
        return resultDate
    };
    _proto._renderView = function() {
        weekCounter = 0;
        _SchedulerWorkSpaceWe.prototype._renderView.call(this)
    };
    _proto._setFirstViewDate = function() {
        this._firstViewDate = _utils.default.getFirstViewDate(this._getViewStartByOptions(), this._firstDayOfWeek());
        this._setStartDayHour(this._firstViewDate)
    };
    _proto._getOffsetByCount = function(cellIndex) {
        var cellsInGroup = this._getCellCount();
        var inGroup = Math.floor(cellIndex / cellsInGroup);
        cellIndex -= cellsInGroup * inGroup;
        var weekendCount = Math.floor(cellIndex / 5);
        return toMs("day") * weekendCount * 2
    };
    return SchedulerWorkSpaceWorkWeek
}(_uiScheduler.default);
(0, _component_registrator.default)("dxSchedulerWorkSpaceWorkWeek", SchedulerWorkSpaceWorkWeek);
var _default = SchedulerWorkSpaceWorkWeek;
exports.default = _default;
module.exports = exports.default;
