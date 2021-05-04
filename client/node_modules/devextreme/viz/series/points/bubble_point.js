/**
 * DevExtreme (viz/series/points/bubble_point.js)
 * Version: 20.2.6
 * Build date: Tue Mar 16 2021
 *
 * Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
exports.default = void 0;
var _extend2 = require("../../../core/utils/extend");
var _symbol_point = _interopRequireDefault(require("./symbol_point"));

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        "default": obj
    }
}
var _extend = _extend2.extend;
var MIN_BUBBLE_HEIGHT = 20;
var _default = _extend({}, _symbol_point.default, {
    correctCoordinates: function(diameter) {
        this.bubbleSize = diameter / 2
    },
    _drawMarker: function(renderer, group, animationEnabled) {
        var that = this;
        var attr = _extend({
            translateX: that.x,
            translateY: that.y
        }, that._getStyle());
        that.graphic = renderer.circle(0, 0, animationEnabled ? 0 : that.bubbleSize).smartAttr(attr).data({
            "chart-data-point": that
        }).append(group)
    },
    getTooltipParams: function(location) {
        var that = this;
        var graphic = that.graphic;
        if (!graphic) {
            return
        }
        var height = graphic.getBBox().height;
        return {
            x: that.x,
            y: that.y,
            offset: height < MIN_BUBBLE_HEIGHT || "edge" === location ? height / 2 : 0
        }
    },
    _getLabelFormatObject: function() {
        var formatObject = _symbol_point.default._getLabelFormatObject.call(this);
        formatObject.size = this.initialSize;
        return formatObject
    },
    _updateData: function(data) {
        _symbol_point.default._updateData.call(this, data);
        this.size = this.initialSize = data.size
    },
    _getGraphicBBox: function() {
        var that = this;
        return that._getSymbolBBox(that.x, that.y, that.bubbleSize)
    },
    _updateMarker: function(animationEnabled, style) {
        var that = this;
        if (!animationEnabled) {
            style = _extend({
                r: that.bubbleSize,
                translateX: that.x,
                translateY: that.y
            }, style)
        }
        that.graphic.smartAttr(style)
    },
    _getFormatObject: function(tooltip) {
        var formatObject = _symbol_point.default._getFormatObject.call(this, tooltip);
        formatObject.sizeText = tooltip.formatValue(this.initialSize);
        return formatObject
    },
    _storeTrackerR: function() {
        return this.bubbleSize
    },
    _getLabelCoords: function(label) {
        var coords;
        if ("inside" === label.getLayoutOptions().position) {
            coords = this._getLabelCoordOfPosition(label, "inside")
        } else {
            coords = _symbol_point.default._getLabelCoords.call(this, label)
        }
        return coords
    }
});
exports.default = _default;
module.exports = exports.default;
