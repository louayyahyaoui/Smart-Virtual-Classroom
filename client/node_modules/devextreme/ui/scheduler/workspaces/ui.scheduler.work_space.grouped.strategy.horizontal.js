/**
 * DevExtreme (ui/scheduler/workspaces/ui.scheduler.work_space.grouped.strategy.horizontal.js)
 * Version: 20.2.6
 * Build date: Tue Mar 16 2021
 *
 * Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
exports.default = void 0;
var _position = require("../../../core/utils/position");
var _uiSchedulerWork_spaceGrouped = _interopRequireDefault(require("./ui.scheduler.work_space.grouped.strategy"));

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
var HORIZONTAL_GROUPED_ATTR = "dx-group-row-count";
var HorizontalGroupedStrategy = function(_GroupedStrategy) {
    _inheritsLoose(HorizontalGroupedStrategy, _GroupedStrategy);

    function HorizontalGroupedStrategy() {
        return _GroupedStrategy.apply(this, arguments) || this
    }
    var _proto = HorizontalGroupedStrategy.prototype;
    _proto.prepareCellIndexes = function(cellCoordinates, groupIndex, inAllDay) {
        var groupByDay = this._workSpace.isGroupedByDate();
        if (!groupByDay) {
            return {
                rowIndex: cellCoordinates.rowIndex,
                cellIndex: cellCoordinates.cellIndex + groupIndex * this._workSpace._getCellCount()
            }
        } else {
            return {
                rowIndex: cellCoordinates.rowIndex,
                cellIndex: cellCoordinates.cellIndex * this._workSpace._getGroupCount() + groupIndex
            }
        }
    };
    _proto.calculateCellIndex = function(rowIndex, cellIndex) {
        cellIndex %= this._workSpace._getCellCount();
        return this._workSpace._getRowCount() * cellIndex + rowIndex
    };
    _proto.getGroupIndex = function(rowIndex, cellIndex) {
        var groupByDay = this._workSpace.isGroupedByDate();
        var groupCount = this._workSpace._getGroupCount();
        if (groupByDay) {
            return cellIndex % groupCount
        } else {
            return Math.floor(cellIndex / this._workSpace._getCellCount())
        }
    };
    _proto.calculateHeaderCellRepeatCount = function() {
        return this._workSpace._getGroupCount() || 1
    };
    _proto.insertAllDayRowsIntoDateTable = function() {
        return false
    };
    _proto.getTotalCellCount = function(groupCount) {
        groupCount = groupCount || 1;
        return this._workSpace._getCellCount() * groupCount
    };
    _proto.getTotalRowCount = function() {
        return this._workSpace._getRowCount()
    };
    _proto.addAdditionalGroupCellClasses = function(cellClass, index, i, j) {
        var applyUnconditionally = arguments.length > 4 && void 0 !== arguments[4] ? arguments[4] : false;
        cellClass = this._addLastGroupCellClass(cellClass, index, applyUnconditionally);
        return this._addFirstGroupCellClass(cellClass, index, applyUnconditionally)
    };
    _proto._addLastGroupCellClass = function(cellClass, index, applyUnconditionally) {
        if (applyUnconditionally) {
            return "".concat(cellClass, " ").concat(this.getLastGroupCellClass())
        }
        var groupByDate = this._workSpace.isGroupedByDate();
        if (groupByDate) {
            if (index % this._workSpace._getGroupCount() === 0) {
                return "".concat(cellClass, " ").concat(this.getLastGroupCellClass())
            }
        } else {
            if (index % this._workSpace._getCellCount() === 0) {
                return "".concat(cellClass, " ").concat(this.getLastGroupCellClass())
            }
        }
        return cellClass
    };
    _proto._addFirstGroupCellClass = function(cellClass, index, applyUnconditionally) {
        if (applyUnconditionally) {
            return "".concat(cellClass, " ").concat(this.getFirstGroupCellClass())
        }
        var groupByDate = this._workSpace.isGroupedByDate();
        if (groupByDate) {
            if ((index - 1) % this._workSpace._getGroupCount() === 0) {
                return "".concat(cellClass, " ").concat(this.getFirstGroupCellClass())
            }
        } else {
            if ((index - 1) % this._workSpace._getCellCount() === 0) {
                return "".concat(cellClass, " ").concat(this.getFirstGroupCellClass())
            }
        }
        return cellClass
    };
    _proto.getHorizontalMax = function(groupIndex) {
        return this._workSpace.getMaxAllowedPosition()[groupIndex]
    };
    _proto.getVerticalMax = function(groupIndex) {
        return this._workSpace.getMaxAllowedVerticalPosition(0)
    };
    _proto.calculateTimeCellRepeatCount = function() {
        return 1
    };
    _proto.getWorkSpaceMinWidth = function() {
        return (0, _position.getBoundingRect)(this._workSpace.$element().get(0)).width - this._workSpace.getTimePanelWidth()
    };
    _proto.getAllDayOffset = function() {
        return this._workSpace.getAllDayHeight()
    };
    _proto.getAllDayTableHeight = function() {
        return (0, _position.getBoundingRect)(this._workSpace._$allDayTable.get(0)).height || 0
    };
    _proto.getGroupCountAttr = function(groupRowCount, groupRows) {
        return {
            attr: HORIZONTAL_GROUPED_ATTR,
            count: groupRows && groupRows.elements.length
        }
    };
    _proto.getLeftOffset = function() {
        return this._workSpace.getTimePanelWidth()
    };
    _proto.getGroupBoundsOffset = function(cellCount, $cells, cellWidth, coordinates) {
        var groupIndex;
        var cellIndex;
        var startCellIndex;
        var startOffset;
        var endOffset;
        if (this._workSpace.isGroupedByDate()) {
            startCellIndex = 0;
            startOffset = $cells.eq(startCellIndex).offset().left - cellWidth / 2;
            endOffset = $cells.eq(cellCount * this._workSpace._getGroupCount() - 1).offset().left + cellWidth + cellWidth / 2
        } else {
            cellIndex = this._workSpace.getCellIndexByCoordinates(coordinates);
            groupIndex = coordinates.groupIndex || Math.floor(cellIndex / cellCount);
            startCellIndex = groupIndex * cellCount;
            startOffset = $cells.eq(startCellIndex).offset().left - cellWidth / 2;
            endOffset = $cells.eq(startCellIndex + cellCount - 1).offset().left + cellWidth + cellWidth / 2
        }
        return {
            left: startOffset,
            right: endOffset,
            top: 0,
            bottom: 0
        }
    };
    _proto.shiftIndicator = function($indicator, height, rtlOffset, groupIndex) {
        var offset = this._getIndicatorOffset(groupIndex);
        var horizontalOffset = rtlOffset ? rtlOffset - offset : offset;
        $indicator.css("left", horizontalOffset);
        $indicator.css("top", height)
    };
    _proto._getIndicatorOffset = function(groupIndex) {
        var groupByDay = this._workSpace.isGroupedByDate();
        return groupByDay ? this._calculateGroupByDateOffset(groupIndex) : this._calculateOffset(groupIndex)
    };
    _proto._calculateOffset = function(groupIndex) {
        return this._workSpace._getCellCount() * this._workSpace.getRoundedCellWidth(groupIndex - 1, 0) * groupIndex + this._workSpace.getIndicatorOffset(groupIndex) + groupIndex
    };
    _proto._calculateGroupByDateOffset = function(groupIndex) {
        return this._workSpace.getIndicatorOffset(0) * this._workSpace._getGroupCount() + this._workSpace.getRoundedCellWidth(groupIndex - 1, 0) * groupIndex
    };
    _proto.getShaderOffset = function(i, width) {
        var offset = this._workSpace._getCellCount() * this._workSpace.getRoundedCellWidth(i - 1) * i;
        return this._workSpace.option("rtlEnabled") ? (0, _position.getBoundingRect)(this._workSpace._dateTableScrollable.$content().get(0)).width - offset - this._workSpace.getTimePanelWidth() - width : offset
    };
    _proto.getShaderTopOffset = function(i) {
        return -this.getShaderMaxHeight() * (i > 0 ? 1 : 0)
    };
    _proto.getShaderHeight = function() {
        var height = this._workSpace.getIndicationHeight();
        return height
    };
    _proto.getShaderMaxHeight = function() {
        return (0, _position.getBoundingRect)(this._workSpace._dateTableScrollable.$content().get(0)).height
    };
    _proto.getShaderWidth = function(i) {
        return this._workSpace.getIndicationWidth(i)
    };
    _proto.getScrollableScrollTop = function(allDay) {
        return !allDay ? this._workSpace.getScrollable().scrollTop() : 0
    };
    _proto.getGroupIndexByCell = function($cell) {
        var rowIndex = $cell.parent().index();
        var cellIndex = $cell.index();
        return this.getGroupIndex(rowIndex, cellIndex)
    };
    return HorizontalGroupedStrategy
}(_uiSchedulerWork_spaceGrouped.default);
var _default = HorizontalGroupedStrategy;
exports.default = _default;
module.exports = exports.default;
