/**
 * DevExtreme (ui/scheduler/workspaces/ui.scheduler.work_space.grouped.strategy.js)
 * Version: 20.2.6
 * Build date: Tue Mar 16 2021
 *
 * Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
exports.default = void 0;
var LAST_GROUP_CELL_CLASS = "dx-scheduler-last-group-cell";
var FIRST_GROUP_CELL_CLASS = "dx-scheduler-first-group-cell";
var GroupedStrategy = function() {
    function GroupedStrategy(workSpace) {
        this._workSpace = workSpace
    }
    var _proto = GroupedStrategy.prototype;
    _proto.getLastGroupCellClass = function() {
        return LAST_GROUP_CELL_CLASS
    };
    _proto.getFirstGroupCellClass = function() {
        return FIRST_GROUP_CELL_CLASS
    };
    _proto._getOffsetByAllDayPanel = function() {
        return 0
    };
    _proto._getGroupTop = function() {
        return 0
    };
    return GroupedStrategy
}();
var _default = GroupedStrategy;
exports.default = _default;
module.exports = exports.default;
