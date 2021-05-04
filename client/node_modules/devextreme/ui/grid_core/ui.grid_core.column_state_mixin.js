/**
 * DevExtreme (ui/grid_core/ui.grid_core.column_state_mixin.js)
 * Version: 20.2.6
 * Build date: Tue Mar 16 2021
 *
 * Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
exports.default = void 0;
var _renderer = _interopRequireDefault(require("../../core/renderer"));
var _common = require("../../core/utils/common");
var _extend = require("../../core/utils/extend");
var _position = require("../../core/utils/position");

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        "default": obj
    }
}
var COLUMN_INDICATORS_CLASS = "dx-column-indicators";
var GROUP_PANEL_ITEM_CLASS = "dx-group-panel-item";
var _default = {
    _applyColumnState: function(options) {
        var _that$component;
        var that = this;
        var rtlEnabled = this.option("rtlEnabled");
        var columnAlignment = that._getColumnAlignment(options.column.alignment, rtlEnabled);
        var parameters = (0, _extend.extend)(true, {
            columnAlignment: columnAlignment
        }, options);
        var isGroupPanelItem = parameters.rootElement.hasClass(GROUP_PANEL_ITEM_CLASS);
        var $indicatorsContainer = that._createIndicatorContainer(parameters, isGroupPanelItem);
        var $span = (0, _renderer.default)("<span>").addClass(that._getIndicatorClassName(options.name));
        var columnsController = null === (_that$component = that.component) || void 0 === _that$component ? void 0 : _that$component.getController("columns");
        var indicatorAlignment = (null === columnsController || void 0 === columnsController ? void 0 : columnsController.getHeaderContentAlignment(columnAlignment)) || columnAlignment;
        parameters.container = $indicatorsContainer;
        parameters.indicator = $span;
        that._renderIndicator(parameters);
        $indicatorsContainer[(isGroupPanelItem || !options.showColumnLines) && "left" === indicatorAlignment ? "appendTo" : "prependTo"](options.rootElement);
        return $span
    },
    _getIndicatorClassName: _common.noop,
    _getColumnAlignment: function(alignment, rtlEnabled) {
        rtlEnabled = rtlEnabled || this.option("rtlEnabled");
        return alignment && "center" !== alignment ? alignment : (0, _position.getDefaultAlignment)(rtlEnabled)
    },
    _createIndicatorContainer: function(options, ignoreIndicatorAlignment) {
        var $indicatorsContainer = this._getIndicatorContainer(options.rootElement);
        var indicatorAlignment = "left" === options.columnAlignment ? "right" : "left";
        if (!$indicatorsContainer.length) {
            $indicatorsContainer = (0, _renderer.default)("<div>").addClass(COLUMN_INDICATORS_CLASS)
        }
        this.setAria("role", "presentation", $indicatorsContainer);
        return $indicatorsContainer.css("float", options.showColumnLines && !ignoreIndicatorAlignment ? indicatorAlignment : null)
    },
    _getIndicatorContainer: function($cell) {
        return $cell && $cell.find("." + COLUMN_INDICATORS_CLASS)
    },
    _getIndicatorElements: function($cell) {
        var $indicatorContainer = this._getIndicatorContainer($cell);
        return $indicatorContainer && $indicatorContainer.children()
    },
    _renderIndicator: function(options) {
        var $container = options.container;
        var $indicator = options.indicator;
        $container && $indicator && $container.append($indicator)
    },
    _updateIndicators: function(indicatorName) {
        var that = this;
        var columns = that.getColumns();
        var $cells = that.getColumnElements();
        var $cell;
        if (!$cells || columns.length !== $cells.length) {
            return
        }
        for (var i = 0; i < columns.length; i++) {
            $cell = $cells.eq(i);
            that._updateIndicator($cell, columns[i], indicatorName);
            var rowOptions = $cell.parent().data("options");
            if (rowOptions && rowOptions.cells) {
                rowOptions.cells[$cell.index()].column = columns[i]
            }
        }
    },
    _updateIndicator: function($cell, column, indicatorName) {
        if (!column.command) {
            return this._applyColumnState({
                name: indicatorName,
                rootElement: $cell,
                column: column,
                showColumnLines: this.option("showColumnLines")
            })
        }
    }
};
exports.default = _default;
module.exports = exports.default;
