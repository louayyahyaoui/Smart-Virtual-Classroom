/**
 * DevExtreme (ui/scheduler/workspaces/ui.scheduler.work_space_vertical.js)
 * Version: 20.2.6
 * Build date: Tue Mar 16 2021
 *
 * Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
exports.default = void 0;
var _renderer = _interopRequireDefault(require("../../../core/renderer"));
var _iterator = require("../../../core/utils/iterator");
var _uiSchedulerWork_space = _interopRequireDefault(require("./ui.scheduler.work_space.indicator"));
var _date = _interopRequireDefault(require("../../../localization/date"));
var _utils = _interopRequireDefault(require("../utils.timeZone"));

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
var SchedulerWorkspaceVertical = function(_SchedulerWorkSpaceIn) {
    _inheritsLoose(SchedulerWorkspaceVertical, _SchedulerWorkSpaceIn);

    function SchedulerWorkspaceVertical() {
        return _SchedulerWorkSpaceIn.apply(this, arguments) || this
    }
    var _proto = SchedulerWorkspaceVertical.prototype;
    _proto._getCellsBetween = function($first, $last) {
        if (this._hasAllDayClass($last)) {
            return _SchedulerWorkSpaceIn.prototype._getCellsBetween.call(this, $first, $last)
        }
        var $cells = this._getCells();
        var firstColumn = $first.index();
        var firstRow = $first.parent().index();
        var lastColumn = $last.index();
        var lastRow = $last.parent().index();
        var groupCount = this._getGroupCount();
        var cellCount = groupCount > 0 ? this._getTotalCellCount(groupCount) : this._getCellCount();
        var rowCount = this._getTotalRowCount(groupCount);
        var result = [];
        for (var i = 0; i < cellCount; i++) {
            for (var j = 0; j < rowCount; j++) {
                var cell = $cells.get(cellCount * j + i);
                result.push(cell)
            }
        }
        var lastCellGroup = this.getCellData($last).groups;
        var indexesDifference = this.option("showAllDayPanel") && this._isVerticalGroupedWorkSpace() ? this._getGroupIndexByResourceId(lastCellGroup) + 1 : 0;
        var newFirstIndex = rowCount * firstColumn + firstRow - indexesDifference;
        var newLastIndex = rowCount * lastColumn + lastRow - indexesDifference;
        if (newFirstIndex > newLastIndex) {
            var buffer = newFirstIndex;
            newFirstIndex = newLastIndex;
            newLastIndex = buffer
        }
        $cells = (0, _renderer.default)(result).slice(newFirstIndex, newLastIndex + 1);
        if (this._getGroupCount()) {
            var arr = [];
            var focusedGroupIndex = this._getGroupIndexByCell($first);
            (0, _iterator.each)($cells, function(_, cell) {
                var groupIndex = this._getGroupIndexByCell((0, _renderer.default)(cell));
                if (focusedGroupIndex === groupIndex) {
                    arr.push(cell)
                }
            }.bind(this));
            $cells = (0, _renderer.default)(arr)
        }
        return $cells
    };
    _proto._getCellFromNextColumn = function(direction, isMultiSelection) {
        var $nextCell = _SchedulerWorkSpaceIn.prototype._getCellFromNextColumn.call(this, direction, isMultiSelection);
        var $focusedCell = this._$focusedCell;
        if ($focusedCell.parent().index() !== $nextCell.parent().index() && isMultiSelection) {
            $nextCell = $focusedCell
        }
        return $nextCell
    };
    _proto._getFormat = function() {
        return this._formatWeekdayAndDay
    };
    _proto.renovatedRenderSupported = function() {
        return true
    };
    _proto.generateRenderOptions = function() {
        var _this = this;
        var startViewDate = _utils.default.getDateWithoutTimezoneChange(this.getStartViewDate());
        var _getTimeText = function(row, column) {
            var index = row % _this._getRowCount();
            if (index % 2 === 0 && 0 === column) {
                return _date.default.format(_this._getTimeCellDateCore(startViewDate, row), "shorttime")
            }
            return ""
        };
        var options = _SchedulerWorkSpaceIn.prototype.generateRenderOptions.call(this);
        options.cellDataGetters.push(function(_, rowIndex, cellIndex) {
            return {
                value: {
                    text: _getTimeText(rowIndex, cellIndex)
                }
            }
        });
        return options
    };
    return SchedulerWorkspaceVertical
}(_uiSchedulerWork_space.default);
var _default = SchedulerWorkspaceVertical;
exports.default = _default;
module.exports = exports.default;
