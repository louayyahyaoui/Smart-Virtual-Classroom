/**
 * DevExtreme (viz/series/points/bar_point.js)
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
var _math = Math;
var _floor = _math.floor;
var _abs = _math.abs;
var CANVAS_POSITION_DEFAULT = "canvas_position_default";
var DEFAULT_BAR_TRACKER_SIZE = 9;
var CORRECTING_BAR_TRACKER_VALUE = 4;
var RIGHT = "right";
var LEFT = "left";
var TOP = "top";
var BOTTOM = "bottom";

function getLabelOrientation(point) {
    var initialValue = point.initialValue;
    var invert = point._getValTranslator().getBusinessRange().invert;
    var isDiscreteValue = "discrete" === point.series.valueAxisType;
    var isFullStacked = point.series.isFullStackedSeries();
    var notAxisInverted = !isDiscreteValue && (initialValue >= 0 && !invert || initialValue < 0 && invert) || isDiscreteValue && !invert || isFullStacked;
    return notAxisInverted ? TOP : BOTTOM
}
var _default = _extend({}, _symbol_point.default, {
    correctCoordinates: function(correctOptions) {
        var that = this;
        var correction = _floor(correctOptions.offset - correctOptions.width / 2);
        if (that._options.rotated) {
            that.height = correctOptions.width;
            that.yCorrection = correction;
            that.xCorrection = null
        } else {
            that.width = correctOptions.width;
            that.xCorrection = correction;
            that.yCorrection = null
        }
    },
    _getGraphicBBox: function(location) {
        var bBox = {
            x: this.x,
            y: this.y,
            width: this.width,
            height: this.height
        };
        if (location) {
            var isTop = "top" === location;
            if (!this._options.rotated) {
                bBox.y = isTop ? bBox.y : bBox.y + bBox.height;
                bBox.height = 0
            } else {
                bBox.x = isTop ? bBox.x + bBox.width : bBox.x;
                bBox.width = 0
            }
        }
        return bBox
    },
    _getLabelConnector: function(location) {
        return this._getGraphicBBox(location)
    },
    _getLabelPosition: function() {
        var position = getLabelOrientation(this);
        if (this._options.rotated) {
            position = position === TOP ? RIGHT : LEFT
        }
        return position
    },
    _getLabelCoords: function(label) {
        var that = this;
        var coords;
        if (0 === that.initialValue && that.series.isFullStackedSeries()) {
            if (!this._options.rotated) {
                coords = that._getLabelCoordOfPosition(label, TOP)
            } else {
                coords = that._getLabelCoordOfPosition(label, RIGHT)
            }
        } else {
            if ("inside" === label.getLayoutOptions().position) {
                coords = that._getLabelCoordOfPosition(label, "inside")
            } else {
                coords = _symbol_point.default._getLabelCoords.call(this, label)
            }
        }
        return coords
    },
    _drawLabel: function() {
        this._label.pointPosition = "inside" !== this._label.getLayoutOptions().position && getLabelOrientation(this);
        _symbol_point.default._drawLabel.call(this)
    },
    hideInsideLabel: function(label, coord) {
        var graphicBBox = this._getGraphicBBox();
        var labelBBox = label.getBoundingRect();
        if (this._options.resolveLabelsOverlapping) {
            if ((coord.y <= graphicBBox.y && coord.y + labelBBox.height >= graphicBBox.y + graphicBBox.height || coord.x <= graphicBBox.x && coord.x + labelBBox.width >= graphicBBox.x + graphicBBox.width) && !(coord.y > graphicBBox.y + graphicBBox.height || coord.y + labelBBox.height < graphicBBox.y || coord.x > graphicBBox.x + graphicBBox.width || coord.x + labelBBox.width < graphicBBox.x)) {
                label.draw(false);
                return true
            }
        }
        return false
    },
    _showForZeroValues: function() {
        return this._options.label.showForZeroValues || this.initialValue
    },
    _drawMarker: function(renderer, group, animationEnabled) {
        var that = this;
        var style = that._getStyle();
        var r = that._options.cornerRadius;
        var rotated = that._options.rotated;
        var _that$getMarkerCoords = that.getMarkerCoords(),
            x = _that$getMarkerCoords.x,
            y = _that$getMarkerCoords.y,
            width = _that$getMarkerCoords.width,
            height = _that$getMarkerCoords.height;
        if (animationEnabled) {
            if (rotated) {
                width = 0;
                x = that.defaultX
            } else {
                height = 0;
                y = that.defaultY
            }
        }
        that.graphic = renderer.rect(x, y, width, height).attr({
            rx: r,
            ry: r
        }).smartAttr(style).data({
            "chart-data-point": that
        }).append(group)
    },
    _getSettingsForTracker: function() {
        var that = this;
        var y = that.y;
        var height = that.height;
        var x = that.x;
        var width = that.width;
        if (that._options.rotated) {
            if (1 === width) {
                width = DEFAULT_BAR_TRACKER_SIZE;
                x -= CORRECTING_BAR_TRACKER_VALUE
            }
        } else {
            if (1 === height) {
                height = DEFAULT_BAR_TRACKER_SIZE;
                y -= CORRECTING_BAR_TRACKER_VALUE
            }
        }
        return {
            x: x,
            y: y,
            width: width,
            height: height
        }
    },
    getGraphicSettings: function() {
        var graphic = this.graphic;
        return {
            x: graphic.attr("x"),
            y: graphic.attr("y"),
            height: graphic.attr("height"),
            width: graphic.attr("width")
        }
    },
    _getEdgeTooltipParams: function() {
        var isPositive = this.value >= 0;
        var xCoord;
        var yCoord;
        var invertedBusinessRange = this._getValTranslator().getBusinessRange().invert;
        var x = this.x,
            y = this.y,
            width = this.width,
            height = this.height;
        if (this._options.rotated) {
            yCoord = y + height / 2;
            if (invertedBusinessRange) {
                xCoord = isPositive ? x : x + width
            } else {
                xCoord = isPositive ? x + width : x
            }
        } else {
            xCoord = x + width / 2;
            if (invertedBusinessRange) {
                yCoord = isPositive ? y + height : y
            } else {
                yCoord = isPositive ? y : y + height
            }
        }
        return {
            x: xCoord,
            y: yCoord,
            offset: 0
        }
    },
    getTooltipParams: function(location) {
        if ("edge" === location) {
            return this._getEdgeTooltipParams()
        }
        var center = this.getCenterCoord();
        center.offset = 0;
        return center
    },
    getCenterCoord: function() {
        var width = this.width,
            height = this.height,
            x = this.x,
            y = this.y;
        return {
            x: x + width / 2,
            y: y + height / 2
        }
    },
    _truncateCoord: function(coord, bounds) {
        if (null === coord) {
            return coord
        }
        if (coord < bounds[0]) {
            return bounds[0]
        }
        if (coord > bounds[1]) {
            return bounds[1]
        }
        return coord
    },
    _getErrorBarBaseEdgeLength: function() {
        return this._options.rotated ? this.height : this.width
    },
    _translateErrorBars: function(argVisibleArea) {
        _symbol_point.default._translateErrorBars.call(this);
        if (this._errorBarPos < argVisibleArea[0] || this._errorBarPos > argVisibleArea[1]) {
            this._errorBarPos = void 0
        }
    },
    _translate: function() {
        var that = this;
        var rotated = that._options.rotated;
        var valAxis = rotated ? "x" : "y";
        var argAxis = rotated ? "y" : "x";
        var valIntervalName = rotated ? "width" : "height";
        var argIntervalName = rotated ? "height" : "width";
        var argTranslator = that._getArgTranslator();
        var valTranslator = that._getValTranslator();
        var argVisibleArea = that.series.getArgumentAxis().getVisibleArea();
        var valVisibleArea = that.series.getValueAxis().getVisibleArea();
        var arg;
        var val;
        var minVal;
        arg = argTranslator.translate(that.argument);
        that[argAxis] = arg = null === arg ? arg : arg + (that[argAxis + "Correction"] || 0);
        val = valTranslator.translate(that.value, 1);
        minVal = valTranslator.translate(that.minValue);
        that["v" + valAxis] = val;
        that["v" + argAxis] = arg + that[argIntervalName] / 2;
        val = that._truncateCoord(val, valVisibleArea);
        minVal = that._truncateCoord(minVal, valVisibleArea);
        that[valIntervalName] = _abs(val - minVal);
        val = val < minVal ? val : minVal;
        that._calculateVisibility(rotated ? val : arg, rotated ? arg : val, that.width, that.height);
        that[valAxis] = null === val ? val : val + (that[valAxis + "Correction"] || 0);
        that["min" + valAxis.toUpperCase()] = null === minVal ? minVal : minVal + (that[valAxis + "Correction"] || 0);
        that["default" + valAxis.toUpperCase()] = valTranslator.translate(CANVAS_POSITION_DEFAULT);
        that._translateErrorBars(argVisibleArea);
        if (that.inVisibleArea && null !== that[argAxis]) {
            if (that[argAxis] < argVisibleArea[0]) {
                that[argIntervalName] = that[argIntervalName] - (argVisibleArea[0] - that[argAxis]);
                that[argAxis] = argVisibleArea[0]
            }
            if (that[argAxis] + that[argIntervalName] > argVisibleArea[1]) {
                that[argIntervalName] = argVisibleArea[1] - that[argAxis]
            }
        }
    },
    _updateMarker: function(animationEnabled, style) {
        this.graphic.smartAttr(_extend({}, style, !animationEnabled ? this.getMarkerCoords() : {}))
    },
    getMarkerCoords: function() {
        var that = this;
        var x = that.x;
        var y = that.y;
        var width = that.width;
        var height = that.height;
        var argAxis = that.series.getArgumentAxis();
        var rotated = that._options.rotated;
        if (argAxis.getAxisPosition) {
            var axisOptions = argAxis.getOptions();
            var edgeOffset = Math.round(axisOptions.width / 2);
            var argAxisPosition = argAxis.getAxisPosition();
            if (axisOptions.visible) {
                if (!rotated) {
                    height -= that.minY === that.defaultY && that.minY === argAxisPosition - argAxis.getAxisShift() ? edgeOffset : 0;
                    height < 0 && (height = 0)
                } else {
                    var isStartFromAxis = that.minX === that.defaultX && that.minX === argAxisPosition - argAxis.getAxisShift();
                    x += isStartFromAxis ? edgeOffset : 0;
                    width -= isStartFromAxis ? edgeOffset : 0;
                    width < 0 && (width = 0)
                }
            }
        }
        return {
            x: x,
            y: y,
            width: width,
            height: height
        }
    },
    coordsIn: function(x, y) {
        var that = this;
        return x >= that.x && x <= that.x + that.width && y >= that.y && y <= that.y + that.height
    }
});
exports.default = _default;
module.exports = exports.default;
