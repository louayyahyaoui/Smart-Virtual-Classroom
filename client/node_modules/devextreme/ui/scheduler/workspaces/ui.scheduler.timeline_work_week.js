/**
 * DevExtreme (ui/scheduler/workspaces/ui.scheduler.timeline_work_week.js)
 * Version: 20.2.6
 * Build date: Tue Mar 16 2021
 *
 * Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
exports.default = void 0;
var _component_registrator = _interopRequireDefault(require("../../../core/component_registrator"));
var _uiScheduler = _interopRequireDefault(require("./ui.scheduler.timeline_week"));
var _date = _interopRequireDefault(require("../../../core/utils/date"));
var _utils = _interopRequireDefault(require("./utils.work_week"));

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
var TIMELINE_CLASS = "dx-scheduler-timeline-work-week";
var LAST_DAY_WEEK_INDEX = 5;
var SchedulerTimelineWorkWeek = function(_SchedulerTimelineWee) {
    _inheritsLoose(SchedulerTimelineWorkWeek, _SchedulerTimelineWee);

    function SchedulerTimelineWorkWeek() {
        var _this;
        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key]
        }
        _this = _SchedulerTimelineWee.call.apply(_SchedulerTimelineWee, [this].concat(args)) || this;
        _this._getWeekendsCount = _utils.default.getWeekendsCount;
        _this._isSkippedData = _utils.default.isDataOnWeekend;
        return _this
    }
    var _proto = SchedulerTimelineWorkWeek.prototype;
    _proto._getElementClass = function() {
        return TIMELINE_CLASS
    };
    _proto._getWeekDuration = function() {
        return 5
    };
    _proto._firstDayOfWeek = function() {
        return _utils.default.getFirstDayOfWeek(this.option("firstDayOfWeek"))
    };
    _proto._isSkippedData = function() {
        return _utils.default.isDataOnWeekend
    };
    _proto._incrementDate = function(date) {
        var day = date.getDay();
        if (day === LAST_DAY_WEEK_INDEX) {
            date.setDate(date.getDate() + 2)
        }
        _SchedulerTimelineWee.prototype._incrementDate.call(this, date)
    };
    _proto._getOffsetByCount = function(cellIndex) {
        var weekendCount = Math.floor(cellIndex / (5 * this._getCellCountInDay()));
        return toMs("day") * weekendCount * 2
    };
    _proto._setFirstViewDate = function() {
        this._firstViewDate = _utils.default.getFirstViewDate(this.option("currentDate"), this._firstDayOfWeek());
        this._setStartDayHour(this._firstViewDate)
    };
    return SchedulerTimelineWorkWeek
}(_uiScheduler.default);
(0, _component_registrator.default)("dxSchedulerTimelineWorkWeek", SchedulerTimelineWorkWeek);
var _default = SchedulerTimelineWorkWeek;
exports.default = _default;
module.exports = exports.default;
