/**
 * DevExtreme (ui/scheduler/workspaces/ui.scheduler.timeline_week.js)
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
var _position = require("../../../core/utils/position");

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
var TIMELINE_CLASS = "dx-scheduler-timeline-week";
var SchedulerTimelineWeek = function(_SchedulerTimeline) {
    _inheritsLoose(SchedulerTimelineWeek, _SchedulerTimeline);

    function SchedulerTimelineWeek() {
        return _SchedulerTimeline.apply(this, arguments) || this
    }
    var _proto = SchedulerTimelineWeek.prototype;
    _proto._getElementClass = function() {
        return TIMELINE_CLASS
    };
    _proto._getCellCount = function() {
        return _SchedulerTimeline.prototype._getCellCount.call(this) * this._getWeekDuration()
    };
    _proto._getHeaderPanelCellWidth = function($headerRow) {
        return (0, _position.getBoundingRect)($headerRow.children().first().get(0)).width
    };
    _proto._getWeekDuration = function() {
        return 7
    };
    _proto._needRenderWeekHeader = function() {
        return true
    };
    _proto._incrementDate = function(date) {
        date.setDate(date.getDate() + 1)
    };
    return SchedulerTimelineWeek
}(_uiScheduler.default);
exports.default = SchedulerTimelineWeek;
(0, _component_registrator.default)("dxSchedulerTimelineWeek", SchedulerTimelineWeek);
module.exports = exports.default;
