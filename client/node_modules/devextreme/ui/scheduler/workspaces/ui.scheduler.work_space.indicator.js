/**
 * DevExtreme (ui/scheduler/workspaces/ui.scheduler.work_space.indicator.js)
 * Version: 20.2.6
 * Build date: Tue Mar 16 2021
 *
 * Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
exports.default = void 0;
var _renderer = _interopRequireDefault(require("../../../core/renderer"));
var _uiScheduler = _interopRequireDefault(require("./ui.scheduler.work_space"));
var _component_registrator = _interopRequireDefault(require("../../../core/component_registrator"));
var _date = _interopRequireDefault(require("../../../core/utils/date"));
var _extend = require("../../../core/utils/extend");
var _position = require("../../../core/utils/position");
var _window = require("../../../core/utils/window");

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
var SCHEDULER_DATE_TIME_INDICATOR_CLASS = "dx-scheduler-date-time-indicator";
var TIME_PANEL_CURRENT_TIME_CELL_CLASS = "dx-scheduler-time-panel-current-time-cell";
var HEADER_CURRENT_TIME_CELL_CLASS = "dx-scheduler-header-panel-current-time-cell";
var SchedulerWorkSpaceIndicator = function(_SchedulerWorkSpace) {
    _inheritsLoose(SchedulerWorkSpaceIndicator, _SchedulerWorkSpace);

    function SchedulerWorkSpaceIndicator() {
        return _SchedulerWorkSpace.apply(this, arguments) || this
    }
    var _proto = SchedulerWorkSpaceIndicator.prototype;
    _proto._getTimeZoneCalculator = function() {
        return this.invoke("getTimeZoneCalculator")
    };
    _proto._getToday = function() {
        var todayDate = this.option("indicatorTime") || new Date;
        var timeZoneCalculator = this._getTimeZoneCalculator();
        return (null === timeZoneCalculator || void 0 === timeZoneCalculator ? void 0 : timeZoneCalculator.createDate(todayDate, {
            path: "toGrid"
        })) || todayDate
    };
    _proto.isIndicationOnView = function() {
        if (this.option("showCurrentTimeIndicator")) {
            var today = this._getToday();
            var endViewDate = _date.default.trimTime(this.getEndViewDate());
            return _date.default.dateInRange(today, this._firstViewDate, new Date(endViewDate.getTime() + toMs("day")))
        }
        return false
    };
    _proto.isIndicationAvailable = function() {
        if (!(0, _window.hasWindow)()) {
            return false
        }
        var today = this._getToday();
        return today >= _date.default.trimTime(new Date(this.getStartViewDate()))
    };
    _proto.isIndicatorVisible = function() {
        var today = this._getToday();
        var endViewDate = new Date(this.getEndViewDate().getTime() + this._getEndViewDateTimeDiff() - 1);
        var firstViewDate = new Date(this.getStartViewDate());
        firstViewDate.setFullYear(today.getFullYear(), today.getMonth(), today.getDate());
        endViewDate.setFullYear(today.getFullYear(), today.getMonth(), today.getDate());
        return _date.default.dateInRange(today, firstViewDate, endViewDate)
    };
    _proto._renderDateTimeIndication = function() {
        if (this.isIndicationAvailable()) {
            if (this.option("shadeUntilCurrentTime")) {
                this._shader.render()
            }
            if (this.isIndicationOnView() && this.isIndicatorVisible()) {
                var groupCount = this._getGroupCount() || 1;
                var $container = this._dateTableScrollable.$content();
                var height = this.getIndicationHeight();
                var rtlOffset = this._getRtlOffset(this.getCellWidth());
                this._renderIndicator(height, rtlOffset, $container, groupCount)
            }
        }
    };
    _proto._renderIndicator = function(height, rtlOffset, $container, groupCount) {
        var groupedByDate = this.isGroupedByDate();
        var repeatCount = groupedByDate ? 1 : groupCount;
        for (var i = 0; i < repeatCount; i++) {
            var $indicator = this._createIndicator($container);
            $indicator.width(groupedByDate ? this.getCellWidth() * groupCount : this.getCellWidth());
            this._groupedStrategy.shiftIndicator($indicator, height, rtlOffset, i)
        }
    };
    _proto._createIndicator = function($container) {
        var $indicator = (0, _renderer.default)("<div>").addClass(SCHEDULER_DATE_TIME_INDICATOR_CLASS);
        $container.append($indicator);
        return $indicator
    };
    _proto._getRtlOffset = function(width) {
        return this.option("rtlEnabled") ? (0, _position.getBoundingRect)(this._dateTableScrollable.$content().get(0)).width - this.getTimePanelWidth() - width : 0
    };
    _proto._setIndicationUpdateInterval = function() {
        if (!this.option("showCurrentTimeIndicator") || 0 === this.option("indicatorUpdateInterval")) {
            return
        }
        this._clearIndicatorUpdateInterval();
        this._indicatorInterval = setInterval(function() {
            this._refreshDateTimeIndication()
        }.bind(this), this.option("indicatorUpdateInterval"))
    };
    _proto._clearIndicatorUpdateInterval = function() {
        if (this._indicatorInterval) {
            clearInterval(this._indicatorInterval);
            delete this._indicatorInterval
        }
    };
    _proto._isVerticalShader = function() {
        return true
    };
    _proto.getIndicationWidth = function(groupIndex) {
        var maxWidth = this.getCellWidth() * this._getCellCount();
        var difference = this._getIndicatorDuration();
        if (difference > this._getCellCount()) {
            difference = this._getCellCount()
        }
        var width = difference * this.getRoundedCellWidth(groupIndex, groupIndex * this._getCellCount(), difference);
        return maxWidth < width ? maxWidth : width
    };
    _proto.getIndicatorOffset = function(groupIndex) {
        var difference = this._getIndicatorDuration() - 1;
        var offset = difference * this.getRoundedCellWidth(groupIndex, groupIndex * this._getCellCount(), difference);
        return offset
    };
    _proto._getIndicatorDuration = function() {
        var today = this._getToday();
        var firstViewDate = new Date(this._firstViewDate);
        var timeDiff = today.getTime() - firstViewDate.getTime();
        if ("workWeek" === this.option("type")) {
            timeDiff -= this._getWeekendsCount(Math.round(timeDiff / toMs("day"))) * toMs("day")
        }
        return Math.ceil((timeDiff + 1) / toMs("day"))
    };
    _proto.getIndicationHeight = function() {
        var today = this._getToday();
        var cellHeight = this.getCellHeight();
        var date = new Date(this._firstViewDate);
        if (this.isIndicationOnView()) {
            date.setFullYear(today.getFullYear(), today.getMonth(), today.getDate())
        }
        var duration = today.getTime() - date.getTime();
        var cellCount = duration / this.getCellDuration();
        return cellCount * cellHeight
    };
    _proto._dispose = function() {
        this._clearIndicatorUpdateInterval();
        _SchedulerWorkSpace.prototype._dispose.apply(this, arguments)
    };
    _proto._refreshDateTimeIndication = function() {
        this._cleanDateTimeIndicator();
        this._shader && this._shader.clean();
        this._renderDateTimeIndication()
    };
    _proto._isCurrentTime = function(date) {
        if (this.isIndicationOnView()) {
            var today = this._getToday();
            var result = false;
            date = new Date(date);
            date.setFullYear(today.getFullYear(), today.getMonth(), today.getDate());
            var startCellDate = new Date(date);
            var endCellDate = new Date(date);
            if (_date.default.sameDate(today, date)) {
                startCellDate = startCellDate.setMilliseconds(date.getMilliseconds() - this.getCellDuration() + 1);
                endCellDate = endCellDate.setMilliseconds(date.getMilliseconds() + this.getCellDuration());
                result = _date.default.dateInRange(today, startCellDate, endCellDate)
            }
            return result
        }
    };
    _proto._isCurrentTimeHeaderCell = function(headerIndex) {
        if (this.isIndicationOnView()) {
            var date = this._getDateByIndex(headerIndex);
            return _date.default.sameDate(date, this._getToday())
        }
        return false
    };
    _proto._getTimeCellClass = function(i) {
        var startViewDate = this._getTimeCellDate(i);
        var cellClass = _SchedulerWorkSpace.prototype._getTimeCellClass.call(this, i);
        if (this._isCurrentTime(startViewDate)) {
            return cellClass + " " + TIME_PANEL_CURRENT_TIME_CELL_CLASS
        }
        return cellClass
    };
    _proto._getHeaderPanelCellClass = function(i) {
        var cellClass = _SchedulerWorkSpace.prototype._getHeaderPanelCellClass.call(this, i);
        if (this._isCurrentTimeHeaderCell(i)) {
            return cellClass + " " + HEADER_CURRENT_TIME_CELL_CLASS
        }
        return cellClass
    };
    _proto._cleanView = function() {
        _SchedulerWorkSpace.prototype._cleanView.call(this);
        this._cleanDateTimeIndicator()
    };
    _proto._dimensionChanged = function() {
        _SchedulerWorkSpace.prototype._dimensionChanged.call(this);
        this._refreshDateTimeIndication()
    };
    _proto._cleanDateTimeIndicator = function() {
        this.$element().find("." + SCHEDULER_DATE_TIME_INDICATOR_CLASS).remove()
    };
    _proto._cleanWorkSpace = function() {
        _SchedulerWorkSpace.prototype._cleanWorkSpace.call(this);
        this._renderDateTimeIndication();
        this._setIndicationUpdateInterval()
    };
    _proto._optionChanged = function(args) {
        switch (args.name) {
            case "showCurrentTimeIndicator":
            case "indicatorTime":
                this._cleanWorkSpace();
                break;
            case "indicatorUpdateInterval":
                this._setIndicationUpdateInterval();
                break;
            case "showAllDayPanel":
                _SchedulerWorkSpace.prototype._optionChanged.call(this, args);
                this._refreshDateTimeIndication();
                break;
            case "allDayExpanded":
                _SchedulerWorkSpace.prototype._optionChanged.call(this, args);
                this._refreshDateTimeIndication();
                break;
            case "crossScrollingEnabled":
                _SchedulerWorkSpace.prototype._optionChanged.call(this, args);
                this._refreshDateTimeIndication();
                break;
            case "shadeUntilCurrentTime":
                this._refreshDateTimeIndication();
                break;
            default:
                _SchedulerWorkSpace.prototype._optionChanged.call(this, args)
        }
    };
    _proto._getDefaultOptions = function() {
        return (0, _extend.extend)(_SchedulerWorkSpace.prototype._getDefaultOptions.call(this), {
            showCurrentTimeIndicator: true,
            indicatorTime: new Date,
            indicatorUpdateInterval: 5 * toMs("minute"),
            shadeUntilCurrentTime: true
        })
    };
    return SchedulerWorkSpaceIndicator
}(_uiScheduler.default);
(0, _component_registrator.default)("dxSchedulerWorkSpace", SchedulerWorkSpaceIndicator);
var _default = SchedulerWorkSpaceIndicator;
exports.default = _default;
module.exports = exports.default;
