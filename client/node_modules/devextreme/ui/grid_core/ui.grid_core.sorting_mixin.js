/**
 * DevExtreme (ui/grid_core/ui.grid_core.sorting_mixin.js)
 * Version: 20.2.6
 * Build date: Tue Mar 16 2021
 *
 * Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
exports.default = void 0;
var _type = require("../../core/utils/type");
var _renderer = _interopRequireDefault(require("../../core/renderer"));

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        "default": obj
    }
}
var SORT_CLASS = "dx-sort";
var SORT_NONE_CLASS = "dx-sort-none";
var SORTUP_CLASS = "dx-sort-up";
var SORTDOWN_CLASS = "dx-sort-down";
var SORT_INDEX_CLASS = "dx-sort-index";
var SORT_INDEX_ICON_CLASS = "dx-sort-index-icon";
var HEADERS_ACTION_CLASS = "action";
var _default = {
    _applyColumnState: function(options) {
        var that = this;
        var ariaSortState;
        var $sortIndicator;
        var sortingMode = that.option("sorting.mode");
        var rootElement = options.rootElement;
        var column = options.column;
        var $indicatorsContainer = that._getIndicatorContainer(rootElement);
        if ("sort" === options.name) {
            rootElement.find("." + SORT_CLASS).remove();
            !$indicatorsContainer.children().length && $indicatorsContainer.remove();
            var isSortingAllowed = ("single" === sortingMode || "multiple" === sortingMode) && column.allowSorting;
            if (!(0, _type.isDefined)(column.groupIndex) && (isSortingAllowed || (0, _type.isDefined)(column.sortOrder))) {
                ariaSortState = "asc" === column.sortOrder ? "ascending" : "descending";
                $sortIndicator = that.callBase(options).toggleClass(SORTUP_CLASS, "asc" === column.sortOrder).toggleClass(SORTDOWN_CLASS, "desc" === column.sortOrder);
                var hasSeveralSortIndexes = that.getController && !!that.getController("columns").columnOption("sortIndex:1");
                if (hasSeveralSortIndexes && that.option("sorting.showSortIndexes") && column.sortIndex >= 0) {
                    (0, _renderer.default)("<span>").addClass(SORT_INDEX_ICON_CLASS).text(column.sortIndex + 1).appendTo($sortIndicator);
                    $sortIndicator.addClass(SORT_INDEX_CLASS)
                }
                options.rootElement.addClass(that.addWidgetPrefix(HEADERS_ACTION_CLASS))
            }
            if (!(0, _type.isDefined)(column.sortOrder)) {
                that.setAria("sort", "none", rootElement)
            } else {
                that.setAria("sort", ariaSortState, rootElement)
            }
            return $sortIndicator
        } else {
            return that.callBase(options)
        }
    },
    _getIndicatorClassName: function(name) {
        if ("sort" === name) {
            return SORT_CLASS
        } else {
            if ("sortIndex" === name) {
                return SORT_INDEX_ICON_CLASS
            }
        }
        return this.callBase(name)
    },
    _renderIndicator: function(options) {
        var column = options.column;
        var $container = options.container;
        var $indicator = options.indicator;
        if ("sort" === options.name) {
            var rtlEnabled = this.option("rtlEnabled");
            if (!(0, _type.isDefined)(column.sortOrder)) {
                $indicator && $indicator.addClass(SORT_NONE_CLASS)
            }
            if ($container.children().length && (!rtlEnabled && "left" === options.columnAlignment || rtlEnabled && "right" === options.columnAlignment)) {
                $container.prepend($indicator);
                return
            }
        }
        this.callBase(options)
    },
    _updateIndicator: function($cell, column, indicatorName) {
        if ("sort" === indicatorName && (0, _type.isDefined)(column.groupIndex)) {
            return
        }
        return this.callBase.apply(this, arguments)
    },
    _getIndicatorElements: function($cell, returnAll) {
        var $indicatorElements = this.callBase($cell);
        return returnAll ? $indicatorElements : $indicatorElements && $indicatorElements.not("." + SORT_NONE_CLASS)
    }
};
exports.default = _default;
module.exports = exports.default;
