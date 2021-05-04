/**
 * DevExtreme (ui/scheduler/workspaces/virtual_selection_state.js)
 * Version: 20.2.6
 * Build date: Tue Mar 16 2021
 *
 * Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
exports.default = void 0;
var _date = _interopRequireDefault(require("../../../core/utils/date"));

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        "default": obj
    }
}

function _toConsumableArray(arr) {
    return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread()
}

function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
}

function _unsupportedIterableToArray(o, minLen) {
    if (!o) {
        return
    }
    if ("string" === typeof o) {
        return _arrayLikeToArray(o, minLen)
    }
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if ("Object" === n && o.constructor) {
        n = o.constructor.name
    }
    if ("Map" === n || "Set" === n) {
        return Array.from(o)
    }
    if ("Arguments" === n || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) {
        return _arrayLikeToArray(o, minLen)
    }
}

function _iterableToArray(iter) {
    if ("undefined" !== typeof Symbol && Symbol.iterator in Object(iter)) {
        return Array.from(iter)
    }
}

function _arrayWithoutHoles(arr) {
    if (Array.isArray(arr)) {
        return _arrayLikeToArray(arr)
    }
}

function _arrayLikeToArray(arr, len) {
    if (null == len || len > arr.length) {
        len = arr.length
    }
    for (var i = 0, arr2 = new Array(len); i < len; i++) {
        arr2[i] = arr[i]
    }
    return arr2
}
var VirtualSelectionState = function() {
    function VirtualSelectionState(viewDataProvider) {
        this._viewDataProvider = viewDataProvider;
        this._focusedCell = null;
        this._selectedCells = null;
        this._firstSelectedCell = null
    }
    var _proto = VirtualSelectionState.prototype;
    _proto.setFocusedCell = function(rowIndex, columnIndex, isAllDay) {
        if (rowIndex >= 0) {
            var cell = this._viewDataProvider.getCellData(rowIndex, columnIndex, isAllDay);
            this._focusedCell = cell
        }
    };
    _proto.getFocusedCell = function(isVerticalGroupOrientation) {
        var _focusedCell = this._focusedCell;
        if (!_focusedCell) {
            return
        }
        var columnIndex = this._getColumnIndexByCellData(_focusedCell, isVerticalGroupOrientation);
        var rowIndex = this._getRowIndexByColumnAndData(_focusedCell, columnIndex, isVerticalGroupOrientation);
        return {
            coordinates: {
                cellIndex: columnIndex,
                rowIndex: rowIndex
            },
            cellData: _focusedCell
        }
    };
    _proto.setSelectedCells = function(lastCellCoordinates) {
        var _this = this;
        var firstCellCoordinates = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : void 0;
        var viewDataProvider = this._viewDataProvider;
        var lastRowIndex = lastCellCoordinates.rowIndex,
            lastColumnIndex = lastCellCoordinates.columnIndex,
            isLastCellAllDay = lastCellCoordinates.allDay;
        if (lastRowIndex < 0) {
            return
        }
        var firstCell = firstCellCoordinates ? viewDataProvider.getCellData(firstCellCoordinates.rowIndex, firstCellCoordinates.columnIndex, firstCellCoordinates.allDay) : this._firstSelectedCell;
        var lastCell = viewDataProvider.getCellData(lastRowIndex, lastColumnIndex, isLastCellAllDay);
        this._firstSelectedCell = firstCell;
        if (firstCell.startDate.getTime() > lastCell.startDate.getTime()) {
            var _ref = [lastCell, firstCell];
            firstCell = _ref[0];
            lastCell = _ref[1]
        }
        var _firstCell = firstCell,
            firstStartDate = _firstCell.startDate,
            firstGroupIndex = _firstCell.groupIndex;
        var _lastCell = lastCell,
            lastStartDate = _lastCell.startDate;
        var cells = viewDataProvider.getCellsByGroupIndexAndAllDay(firstGroupIndex, isLastCellAllDay);
        var filteredCells = cells.reduce(function(selectedCells, cellsRow) {
            var filteredRow = _this._filterCellsByDate(cellsRow, firstStartDate, lastStartDate);
            selectedCells.push.apply(selectedCells, _toConsumableArray(filteredRow));
            return selectedCells
        }, []);
        this._selectedCells = filteredCells.sort(function(firstCell, secondCell) {
            return firstCell.startDate.getTime() - secondCell.startDate.getTime()
        })
    };
    _proto.getSelectedCells = function() {
        return this._selectedCells
    };
    _proto.releaseSelectedAndFocusedCells = function() {
        this.releaseSelectedCells();
        this.releaseFocusedCell()
    };
    _proto.releaseSelectedCells = function() {
        this._selectedCells = null;
        this._firstSelectedCell = null
    };
    _proto.releaseFocusedCell = function() {
        this._focusedCell = null
    };
    _proto.isValidFocusedCell = function(nextFocusedCellData) {
        var focusedCell = this._focusedCell;
        if (!focusedCell) {
            return true
        }
        var groupIndex = focusedCell.groupIndex,
            allDay = focusedCell.allDay;
        var nextGroupIndex = nextFocusedCellData.groupIndex,
            nextAllDay = nextFocusedCellData.allDay;
        return groupIndex === nextGroupIndex && allDay === nextAllDay
    };
    _proto._getColumnIndexByCellData = function(cellData, isVerticalGroupOrientation) {
        var viewDataMap = this._viewDataProvider.viewDataMap;
        var startDate = cellData.startDate,
            groupIndex = cellData.groupIndex;
        var firstRow = viewDataMap[0];
        var startTime = _date.default.trimTime(startDate).getTime();
        for (var columnIndex = 0; columnIndex < firstRow.length; columnIndex += 1) {
            var _firstRow$columnIndex = firstRow[columnIndex].cellData,
                currentStartDate = _firstRow$columnIndex.startDate,
                currentGroupIndex = _firstRow$columnIndex.groupIndex;
            if (startTime === _date.default.trimTime(currentStartDate).getTime() && (groupIndex === currentGroupIndex || isVerticalGroupOrientation)) {
                return columnIndex
            }
        }
    };
    _proto._getRowIndexByColumnAndData = function(cellData, columnIndex, isVerticalGroupOrientation) {
        var viewDataMap = this._viewDataProvider.viewDataMap;
        var startDate = cellData.startDate,
            groupIndex = cellData.groupIndex,
            allDay = cellData.allDay;
        if (allDay && !isVerticalGroupOrientation) {
            return 0
        }
        for (var rowIndex = 0; rowIndex < viewDataMap.length; rowIndex += 1) {
            var currentCellData = viewDataMap[rowIndex][columnIndex].cellData;
            var currentStartDate = currentCellData.startDate,
                currentGroupIndex = currentCellData.groupIndex,
                currentAllDay = currentCellData.allDay;
            if (startDate.getTime() === currentStartDate.getTime() && groupIndex === currentGroupIndex && allDay === currentAllDay) {
                return rowIndex
            }
        }
    };
    _proto._filterCellsByDate = function(cellsRow, firstDate, lastDate) {
        var firstTime = firstDate.getTime();
        var lastTime = lastDate.getTime();
        return cellsRow.filter(function(cell) {
            var startDate = cell.startDate;
            var time = startDate.getTime();
            return firstTime <= time && time <= lastTime
        })
    };
    return VirtualSelectionState
}();
exports.default = VirtualSelectionState;
module.exports = exports.default;
