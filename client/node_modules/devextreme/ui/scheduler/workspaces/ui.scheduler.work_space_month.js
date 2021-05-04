/**
 * DevExtreme (ui/scheduler/workspaces/ui.scheduler.work_space_month.js)
 * Version: 20.2.6
 * Build date: Tue Mar 16 2021
 *
 * Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
exports.default = void 0;
var _renderer = _interopRequireDefault(require("../../../core/renderer"));
var _common = require("../../../core/utils/common");
var _component_registrator = _interopRequireDefault(require("../../../core/component_registrator"));
var _uiSchedulerWork_space = _interopRequireDefault(require("./ui.scheduler.work_space.indicator"));
var _date = _interopRequireDefault(require("../../../core/utils/date"));
var _position = require("../../../core/utils/position");
var _date2 = _interopRequireDefault(require("../../../localization/date"));

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
var MONTH_CLASS = "dx-scheduler-work-space-month";
var DATE_TABLE_CURRENT_DATE_CLASS = "dx-scheduler-date-table-current-date";
var DATE_TABLE_FIRST_OF_MONTH_CLASS = "dx-scheduler-date-table-first-of-month";
var DATE_TABLE_OTHER_MONTH_DATE_CLASS = "dx-scheduler-date-table-other-month";
var DATE_TABLE_SCROLLABLE_FIXED_CLASS = "dx-scheduler-scrollable-fixed-content";
var DAYS_IN_WEEK = 7;
var DAY_IN_MILLISECONDS = 864e5;
var toMs = _date.default.dateToMilliseconds;
var SchedulerWorkSpaceMonth = function(_SchedulerWorkSpace) {
    _inheritsLoose(SchedulerWorkSpaceMonth, _SchedulerWorkSpace);

    function SchedulerWorkSpaceMonth() {
        return _SchedulerWorkSpace.apply(this, arguments) || this
    }
    var _proto = SchedulerWorkSpaceMonth.prototype;
    _proto._toggleFixedScrollableClass = function() {
        this._dateTableScrollable.$content().toggleClass(DATE_TABLE_SCROLLABLE_FIXED_CLASS, !this._isWorkSpaceWithCount() && !this._isVerticalGroupedWorkSpace())
    };
    _proto._getElementClass = function() {
        return MONTH_CLASS
    };
    _proto._getRowCount = function() {
        return this._isWorkSpaceWithCount() ? 4 * this.option("intervalCount") + 2 : 6
    };
    _proto._getCellCount = function() {
        return DAYS_IN_WEEK
    };
    _proto._getDateByIndex = function(headerIndex) {
        var resultDate = new Date(this._firstViewDate);
        resultDate.setDate(this._firstViewDate.getDate() + headerIndex);
        return resultDate
    };
    _proto._getFormat = function() {
        return this._formatWeekday
    };
    _proto._calculateCellIndex = function(rowIndex, cellIndex) {
        if (this._isVerticalGroupedWorkSpace()) {
            rowIndex %= this._getRowCount()
        } else {
            cellIndex %= this._getCellCount()
        }
        return rowIndex * this._getCellCount() + cellIndex
    };
    _proto._getInterval = function() {
        return DAY_IN_MILLISECONDS
    };
    _proto._getIntervalBetween = function(currentDate) {
        var firstViewDate = this.getStartViewDate();
        var timeZoneOffset = _date.default.getTimezonesDifference(firstViewDate, currentDate);
        return currentDate.getTime() - (firstViewDate.getTime() - 36e5 * this.option("startDayHour")) - timeZoneOffset
    };
    _proto._getDateByCellIndexes = function(rowIndex, cellIndex) {
        var date = _SchedulerWorkSpace.prototype._getDateByCellIndexes.call(this, rowIndex, cellIndex);
        this._setStartDayHour(date);
        return date
    };
    _proto.getCellWidth = function() {
        var _this = this;
        return this.cache.get("cellWidth", function() {
            var DAYS_IN_WEEK = 7;
            var averageWidth = 0;
            _this._getCells().slice(0, DAYS_IN_WEEK).each(function(index, element) {
                return averageWidth += (0, _position.getBoundingRect)(element).width
            });
            return averageWidth / DAYS_IN_WEEK
        })
    };
    _proto._calculateHiddenInterval = function() {
        return 0
    };
    _proto._insertAllDayRowsIntoDateTable = function() {
        return false
    };
    _proto._getCellCoordinatesByIndex = function(index) {
        var rowIndex = Math.floor(index / this._getCellCount());
        var cellIndex = index - this._getCellCount() * rowIndex;
        return {
            rowIndex: rowIndex,
            cellIndex: cellIndex
        }
    };
    _proto._createWorkSpaceElements = function() {
        if (this._isVerticalGroupedWorkSpace()) {
            this._createWorkSpaceScrollableElements()
        } else {
            _SchedulerWorkSpace.prototype._createWorkSpaceElements.call(this)
        }
    };
    _proto._needCreateCrossScrolling = function() {
        return this.option("crossScrollingEnabled") || this._isVerticalGroupedWorkSpace()
    };
    _proto._renderTimePanel = function() {
        return (0, _common.noop)()
    };
    _proto._renderAllDayPanel = function() {
        return (0, _common.noop)()
    };
    _proto._getTableAllDay = function() {
        return (0, _common.noop)()
    };
    _proto._toggleAllDayVisibility = function() {
        return (0, _common.noop)()
    };
    _proto._changeAllDayVisibility = function() {
        return (0, _common.noop)()
    };
    _proto._setFirstViewDate = function() {
        var firstMonthDate = _date.default.getFirstMonthDate(this._getViewStartByOptions());
        this._firstViewDate = _date.default.getFirstWeekDate(firstMonthDate, this.option("firstDayOfWeek") || _date2.default.firstDayOfWeekIndex());
        this._setStartDayHour(this._firstViewDate);
        var date = this._getViewStartByOptions();
        this._minVisibleDate = new Date(date.setDate(1));
        this._maxVisibleDate = new Date(new Date(date.setMonth(date.getMonth() + this.option("intervalCount"))).setDate(0))
    };
    _proto._getViewStartByOptions = function() {
        if (!this.option("startDate")) {
            return new Date(this.option("currentDate").getTime())
        } else {
            var startDate = this._getStartViewDate();
            var currentDate = this.option("currentDate");
            var diff = startDate.getTime() <= currentDate.getTime() ? 1 : -1;
            var endDate = new Date(new Date(this._getStartViewDate().setMonth(this._getStartViewDate().getMonth() + diff * this.option("intervalCount"))));
            while (!this._dateInRange(currentDate, startDate, endDate, diff)) {
                startDate = new Date(endDate);
                if (diff > 0) {
                    startDate.setDate(1)
                }
                endDate = new Date(new Date(endDate.setMonth(endDate.getMonth() + diff * this.option("intervalCount"))))
            }
            return diff > 0 ? startDate : endDate
        }
    };
    _proto._getStartViewDate = function() {
        var firstMonthDate = _date.default.getFirstMonthDate(this.option("startDate"));
        return firstMonthDate
    };
    _proto._renderTableBody = function(options) {
        options.getCellText = this._getCellText.bind(this);
        _SchedulerWorkSpace.prototype._renderTableBody.call(this, options)
    };
    _proto._getCellText = function(rowIndex, cellIndex) {
        if (this.isGroupedByDate()) {
            cellIndex = Math.floor(cellIndex / this._getGroupCount())
        } else {
            cellIndex %= this._getCellCount()
        }
        var date = this._getDate(rowIndex, cellIndex);
        if (this._isWorkSpaceWithCount() && this._isFirstDayOfMonth(date)) {
            return this._formatMonthAndDay(date)
        }
        return _date2.default.format(date, "dd")
    };
    _proto._formatMonthAndDay = function(date) {
        var monthName = _date2.default.getMonthNames("abbreviated")[date.getMonth()];
        return [monthName, _date2.default.format(date, "day")].join(" ")
    };
    _proto._getDate = function(week, day) {
        var result = new Date(this._firstViewDate);
        var lastRowInDay = this._getRowCount();
        result.setDate(result.getDate() + week % lastRowInDay * DAYS_IN_WEEK + day);
        return result
    };
    _proto._updateIndex = function(index) {
        return index
    };
    _proto._prepareCellData = function(rowIndex, cellIndex, cell) {
        var data = _SchedulerWorkSpace.prototype._prepareCellData.call(this, rowIndex, cellIndex, cell);
        var $cell = (0, _renderer.default)(cell);
        $cell.toggleClass(DATE_TABLE_CURRENT_DATE_CLASS, this._isCurrentDate(data.startDate)).toggleClass(DATE_TABLE_FIRST_OF_MONTH_CLASS, this._isFirstDayOfMonth(data.startDate)).toggleClass(DATE_TABLE_OTHER_MONTH_DATE_CLASS, this._isOtherMonth(data.startDate));
        return data
    };
    _proto._isCurrentDate = function(cellDate) {
        return _date.default.sameDate(cellDate, this._getToday())
    };
    _proto._isFirstDayOfMonth = function(cellDate) {
        return this._isWorkSpaceWithCount() && 1 === cellDate.getDate()
    };
    _proto._isOtherMonth = function(cellDate) {
        return !_date.default.dateInRange(cellDate, this._minVisibleDate, this._maxVisibleDate, "date")
    };
    _proto.isIndicationAvailable = function() {
        return false
    };
    _proto.getCellDuration = function() {
        return 36e5 * this._calculateDayDuration()
    };
    _proto.getIntervalDuration = function() {
        return toMs("day")
    };
    _proto.getTimePanelWidth = function() {
        return 0
    };
    _proto.getPositionShift = function(timeShift) {
        return {
            cellPosition: timeShift * this.getCellWidth(),
            top: 0,
            left: 0
        }
    };
    _proto.getCellCountToLastViewDate = function(date) {
        var firstDateTime = date.getTime();
        var lastDateTime = this.getEndViewDate().getTime();
        var dayDurationInMs = this.getCellDuration();
        return Math.ceil((lastDateTime - firstDateTime) / dayDurationInMs)
    };
    _proto.supportAllDayRow = function() {
        return false
    };
    _proto.keepOriginalHours = function() {
        return true
    };
    _proto.calculateEndDate = function(startDate) {
        var startDateCopy = new Date(startDate);
        return new Date(startDateCopy.setHours(this.option("endDayHour")))
    };
    _proto.getWorkSpaceLeftOffset = function() {
        return 0
    };
    _proto.needApplyCollectorOffset = function() {
        return true
    };
    _proto._getDateTableBorderOffset = function() {
        return this._getDateTableBorder()
    };
    _proto._getCellPositionByIndex = function(index, groupIndex) {
        var position = _SchedulerWorkSpace.prototype._getCellPositionByIndex.call(this, index, groupIndex);
        var rowIndex = this._getCellCoordinatesByIndex(index).rowIndex;
        var calculatedTopOffset;
        if (!this._isVerticalGroupedWorkSpace()) {
            calculatedTopOffset = this.getCellHeight() * rowIndex
        } else {
            calculatedTopOffset = this.getCellHeight() * (rowIndex + groupIndex * this._getRowCount())
        }
        if (calculatedTopOffset) {
            position.top = calculatedTopOffset
        }
        return position
    };
    _proto._getHeaderDate = function() {
        return this._getViewStartByOptions()
    };
    _proto._supportCompactDropDownAppointments = function() {
        return false
    };
    _proto.scrollToTime = function() {
        return (0, _common.noop)()
    };
    _proto._getRowCountWithAllDayRows = function() {
        return this._getRowCount()
    };
    return SchedulerWorkSpaceMonth
}(_uiSchedulerWork_space.default);
(0, _component_registrator.default)("dxSchedulerWorkSpaceMonth", SchedulerWorkSpaceMonth);
var _default = SchedulerWorkSpaceMonth;
exports.default = _default;
module.exports = exports.default;
