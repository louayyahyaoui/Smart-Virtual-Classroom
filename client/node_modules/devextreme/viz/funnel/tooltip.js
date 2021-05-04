/**
 * DevExtreme (viz/funnel/tooltip.js)
 * Version: 20.2.6
 * Build date: Tue Mar 16 2021
 *
 * Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
exports.plugin = void 0;
var _common = require("../../core/utils/common");
var _tooltip = require("../core/tooltip");

function getCoords(figureCoords, renderer) {
    var offset = renderer.getRootOffset();
    return [(figureCoords[0] + figureCoords[2]) / 2 + offset.left, (figureCoords[1] + figureCoords[5]) / 2 + offset.top]
}
var plugin = {
    name: "funnel-tooltip",
    init: _common.noop,
    dispose: _common.noop,
    extenders: {
        _buildNodes: function() {
            this.hideTooltip()
        },
        _change_TILING: function() {
            if (this._tooltipIndex >= 0) {
                this._moveTooltip(this._items[this._tooltipIndex])
            }
        }
    },
    members: {
        hideTooltip: function() {
            if (this._tooltipIndex >= 0) {
                this._tooltipIndex = -1;
                this._tooltip.hide()
            }
        },
        _moveTooltip: function(item, coords) {
            var xy = coords || item.coords && getCoords(item.coords, this._renderer) || [-1e3, -1e3];
            this._tooltip.move(xy[0], xy[1], 0)
        },
        _showTooltip: function(index, coords) {
            var that = this;
            var tooltip = that._tooltip;
            var item = that._items[index];
            if (that._tooltipIndex === index) {
                that._moveTooltip(item, coords);
                return
            }
            var callback = function(result) {
                if (void 0 === result) {
                    return
                }
                if (result) {
                    that._moveTooltip(item, coords)
                } else {
                    tooltip.hide()
                }
                that._tooltipIndex = result ? index : -1
            };
            callback(tooltip.show({
                value: item.value,
                valueText: tooltip.formatValue(item.value),
                percentText: tooltip.formatValue(item.percent, "percent"),
                percent: item.percent,
                item: item
            }, {
                x: 0,
                y: 0,
                offset: 0
            }, {
                item: item
            }, void 0, callback))
        }
    },
    customize: function(constructor) {
        constructor.addPlugin(_tooltip.plugin)
    }
};
exports.plugin = plugin;
