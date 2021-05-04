/**
 * DevExtreme (ui/scheduler/workspaces/ui.scheduler.work_space.grouped.strategy.vertical.js)
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
var _cache = require("./cache");

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
var VERTICAL_GROUPED_ATTR = "dx-group-column-count";
var DATE_HEADER_OFFSET = 10;
var WORK_SPACE_BORDER = 1;
var VerticalGroupedStrategy = function(_GroupedStrategy) {
    _inheritsLoose(VerticalGroupedStrategy, _GroupedStrategy);

    function VerticalGroupedStrategy() {
        return _GroupedStrategy.apply(this, arguments) || this
    }
    var _proto = VerticalGroupedStrategy.prototype;
    _proto.prepareCellIndexes = function(cellCoordinates, groupIndex, inAllDayRow) {
        var rowIndex = cellCoordinates.rowIndex + groupIndex * this._workSpace._getRowCount();
        if (this._workSpace.supportAllDayRow() && this._workSpace.option("showAllDayPanel")) {
            rowIndex += groupIndex;
            if (!inAllDayRow) {
                rowIndex += 1
            }
        }
        return {
            rowIndex: rowIndex,
            cellIndex: cellCoordinates.cellIndex
        }
    };
    _proto.calculateCellIndex = function(rowIndex, cellIndex) {
        rowIndex %= this._workSpace._getRowCount();
        return this._workSpace._getRowCount() * cellIndex + rowIndex
    };
    _proto.getGroupIndex = function(rowIndex) {
        return Math.floor(rowIndex / this._workSpace._getRowCount())
    };
    _proto.calculateHeaderCellRepeatCount = function() {
        return 1
    };
    _proto.insertAllDayRowsIntoDateTable = function() {
        return this._workSpace.option("showAllDayPanel")
    };
    _proto.getTotalCellCount = function() {
        return this._workSpace._getCellCount()
    };
    _proto.getTotalRowCount = function() {
        return this._workSpace._getRowCount() * this._workSpace._getGroupCount()
    };
    _proto.addAdditionalGroupCellClasses = function(cellClass, index, i, j) {
        cellClass = this._addLastGroupCellClass(cellClass, i + 1);
        return this._addFirstGroupCellClass(cellClass, i + 1)
    };
    _proto._addLastGroupCellClass = function(cellClass, index) {
        if (index % this._workSpace._getRowCount() === 0) {
            return cellClass + " " + this.getLastGroupCellClass()
        }
        return cellClass
    };
    _proto._addFirstGroupCellClass = function(cellClass, index) {
        if ((index - 1) % this._workSpace._getRowCount() === 0) {
            return cellClass + " " + this.getFirstGroupCellClass()
        }
        return cellClass
    };
    _proto.getHorizontalMax = function() {
        return this._workSpace.getMaxAllowedPosition()[0]
    };
    _proto.getVerticalMax = function(groupIndex) {
        var maxAllowedPosition = this._workSpace.getMaxAllowedVerticalPosition(groupIndex);
        maxAllowedPosition += this._getOffsetByAllDayPanel(groupIndex);
        return maxAllowedPosition
    };
    _proto._getOffsetByAllDayPanel = function(groupIndex) {
        var result = 0;
        if (this._workSpace.supportAllDayRow() && this._workSpace.option("showAllDayPanel")) {
            result = this._workSpace.getAllDayHeight() * (groupIndex + 1)
        }
        return result
    };
    _proto._getGroupTop = function(groupIndex) {
        var workspace = this._workSpace;
        var rowCount = workspace.isVirtualScrolling() ? workspace.viewDataProvider.getRowCountInGroup(groupIndex) : workspace._getRowCount();
        return workspace.getMaxAllowedVerticalPosition(groupIndex) - workspace.getCellHeight() * rowCount
    };
    _proto.calculateTimeCellRepeatCount = function() {
        return this._workSpace._getGroupCount() || 1
    };
    _proto.getWorkSpaceMinWidth = function() {
        var minWidth = this._workSpace._getWorkSpaceWidth();
        var workspaceContainerWidth = (0, _position.getBoundingRect)(this._workSpace.$element().get(0)).width - this._workSpace.getTimePanelWidth() - this._workSpace.getGroupTableWidth() - 2 * WORK_SPACE_BORDER;
        if (minWidth < workspaceContainerWidth) {
            minWidth = workspaceContainerWidth
        }
        return minWidth
    };
    _proto.getAllDayOffset = function() {
        return 0
    };
    _proto.getAllDayTableHeight = function() {
        return 0
    };
    _proto.getGroupCountAttr = function() {
        return {
            attr: VERTICAL_GROUPED_ATTR,
            count: this._workSpace.option("groups") && this._workSpace.option("groups").length
        }
    };
    _proto.getLeftOffset = function() {
        return this._workSpace.getTimePanelWidth() + this._workSpace.getGroupTableWidth()
    };
    _proto.getGroupBoundsOffset = function(cellCount, $cells, cellWidth, coordinates) {
        var _this = this;
        return _cache.cache.get("groupBoundsOffset", function() {
            var groupIndex = coordinates.groupIndex;
            var startOffset = $cells.eq(0).offset().left;
            var endOffset = $cells.eq(cellCount - 1).offset().left + cellWidth;
            var dayHeight = _this._workSpace._calculateDayDuration() / _this._workSpace.option("hoursInterval") * _this._workSpace.getCellHeight();
            var scrollTop = _this.getScrollableScrollTop();
            var topOffset = groupIndex * dayHeight + (0, _position.getBoundingRect)(_this._workSpace._$thead.get(0)).height + _this._workSpace.invoke("getHeaderHeight") + DATE_HEADER_OFFSET - scrollTop;
            if (_this._workSpace.option("showAllDayPanel") && _this._workSpace.supportAllDayRow()) {
                topOffset += _this._workSpace.getCellHeight() * (groupIndex + 1)
            }
            var bottomOffset = topOffset + dayHeight;
            return _this._groupBoundsOffset = {
                left: startOffset,
                right: endOffset,
                top: topOffset,
                bottom: bottomOffset
            }
        })
    };
    _proto.shiftIndicator = function($indicator, height, rtlOffset, i) {
        var offset = this._workSpace.getIndicatorOffset(0);
        var tableOffset = this._workSpace.option("crossScrollingEnabled") ? 0 : this._workSpace.getGroupTableWidth();
        var horizontalOffset = rtlOffset ? rtlOffset - offset : offset;
        var verticalOffset = this._workSpace._getRowCount() * this._workSpace.getCellHeight() * i;
        if (this._workSpace.supportAllDayRow() && this._workSpace.option("showAllDayPanel")) {
            verticalOffset += this._workSpace.getAllDayHeight() * (i + 1)
        }
        $indicator.css("left", horizontalOffset + tableOffset);
        $indicator.css("top", height + verticalOffset)
    };
    _proto.getShaderOffset = function(i, width) {
        var offset = this._workSpace.option("crossScrollingEnabled") ? 0 : this._workSpace.getGroupTableWidth();
        return this._workSpace.option("rtlEnabled") ? (0, _position.getBoundingRect)(this._$container.get(0)).width - offset - this._workSpace.getWorkSpaceLeftOffset() - width : offset
    };
    _proto.getShaderTopOffset = function(i) {
        return 0
    };
    _proto.getShaderHeight = function() {
        var height = this._workSpace.getIndicationHeight();
        if (this._workSpace.supportAllDayRow() && this._workSpace.option("showAllDayPanel")) {
            height += this._workSpace.getCellHeight()
        }
        return height
    };
    _proto.getShaderMaxHeight = function() {
        var height = this._workSpace._getRowCount() * this._workSpace.getCellHeight();
        if (this._workSpace.supportAllDayRow() && this._workSpace.option("showAllDayPanel")) {
            height += this._workSpace.getCellHeight()
        }
        return height
    };
    _proto.getShaderWidth = function() {
        return this._workSpace.getIndicationWidth(0)
    };
    _proto.getScrollableScrollTop = function() {
        return this._workSpace.getScrollable().scrollTop()
    };
    _proto.getGroupIndexByCell = function($cell) {
        var rowIndex = $cell.parent().index();
        var rowCount = this._workSpace._getRowCountWithAllDayRows();
        return Math.ceil((rowIndex + 1) / rowCount)
    };
    return VerticalGroupedStrategy
}(_uiSchedulerWork_spaceGrouped.default);
var _default = VerticalGroupedStrategy;
exports.default = _default;
module.exports = exports.default;
