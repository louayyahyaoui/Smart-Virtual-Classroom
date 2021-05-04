/**
 * DevExtreme (viz/series/points/polar_point.js)
 * Version: 20.2.6
 * Build date: Tue Mar 16 2021
 *
 * Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
exports.polarBarPoint = exports.polarSymbolPoint = void 0;
var _extend2 = require("../../../core/utils/extend");
var _symbol_point = _interopRequireDefault(require("./symbol_point"));
var _bar_point = _interopRequireDefault(require("./bar_point"));
var _pie_point = _interopRequireDefault(require("./pie_point"));
var _type = require("../../../core/utils/type");
var _utils = require("../../core/utils");
var _consts = _interopRequireDefault(require("../../components/consts"));

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        "default": obj
    }
}
var _extend = _extend2.extend;
var _math = Math;
var _max = _math.max;
var RADIAL_LABEL_INDENT = _consts.default.radialLabelIndent;
var ERROR_BARS_ANGLE_OFFSET = 90;
var CANVAS_POSITION_END = "canvas_position_end";
var CANVAS_POSITION_DEFAULT = "canvas_position_default";
var polarSymbolPoint = _extend({}, _symbol_point.default, {
    _getLabelCoords: _pie_point.default._getLabelCoords,
    _getElementCoords: _pie_point.default._getElementCoords,
    _moveLabelOnCanvas: function(coord, visibleArea, labelBBox) {
        var x = coord.x;
        var y = coord.y;
        if (visibleArea.minX > x) {
            x = visibleArea.minX
        }
        if (visibleArea.maxX < x + labelBBox.width) {
            x = visibleArea.maxX - labelBBox.width
        }
        if (visibleArea.minY > y) {
            y = visibleArea.minY
        }
        if (visibleArea.maxY < y + labelBBox.height) {
            y = visibleArea.maxY - labelBBox.height
        }
        return {
            x: x,
            y: y
        }
    },
    _getLabelPosition: function() {
        return "outside"
    },
    _getCoords: function(argument, value) {
        var axis = this.series.getValueAxis();
        var startAngle = axis.getAngles()[0];
        var angle = this._getArgTranslator().translate(argument);
        var radius = this._getValTranslator().translate(value);
        var coords = (0, _utils.convertPolarToXY)(axis.getCenter(), axis.getAngles()[0], angle, radius);
        coords.angle = angle + startAngle - 90, coords.radius = radius;
        return coords
    },
    _translate: function() {
        var that = this;
        var center = that.series.getValueAxis().getCenter();
        var coord = that._getCoords(that.argument, that.value);
        var maxRadius = that._getValTranslator().translate(CANVAS_POSITION_END);
        var normalizedRadius = (0, _type.isDefined)(coord.radius) && coord.radius >= 0 ? coord.radius : null;
        that.vx = (0, _utils.normalizeAngle)(coord.angle);
        that.vy = that.radiusOuter = that.radiusLabels = normalizedRadius;
        that.radiusLabels += RADIAL_LABEL_INDENT;
        that.radius = normalizedRadius;
        that.middleAngle = -coord.angle;
        that.angle = -coord.angle;
        that.x = coord.x;
        that.y = coord.y;
        that.defaultX = that.centerX = center.x;
        that.defaultY = that.centerY = center.y;
        that._translateErrorBars();
        that.inVisibleArea = that._checkRadiusForVisibleArea(normalizedRadius, maxRadius)
    },
    _checkRadiusForVisibleArea: function(radius, maxRadius) {
        return (0, _type.isDefined)(radius) && radius <= maxRadius
    },
    _translateErrorBars: function() {
        var that = this;
        var errorBars = that._options.errorBars;
        var translator = that._getValTranslator();
        if (!errorBars) {
            return
        }(0, _type.isDefined)(that.lowError) && (that._lowErrorCoord = that.centerY - translator.translate(that.lowError));
        (0, _type.isDefined)(that.highError) && (that._highErrorCoord = that.centerY - translator.translate(that.highError));
        that._errorBarPos = that.centerX;
        that._baseErrorBarPos = "stdDeviation" === errorBars.type ? that._lowErrorCoord + (that._highErrorCoord - that._lowErrorCoord) / 2 : that.centerY - that.radius
    },
    _getTranslates: function(animationEnabled) {
        return animationEnabled ? this.getDefaultCoords() : {
            x: this.x,
            y: this.y
        }
    },
    getDefaultCoords: function() {
        var cosSin = (0, _utils.getCosAndSin)(-this.angle);
        var radius = this._getValTranslator().translate(CANVAS_POSITION_DEFAULT);
        var x = this.defaultX + radius * cosSin.cos;
        var y = this.defaultY + radius * cosSin.sin;
        return {
            x: x,
            y: y
        }
    },
    _addLabelAlignmentAndOffset: function(label, coord) {
        return coord
    },
    _checkLabelPosition: function(label, coord) {
        var that = this;
        var visibleArea = that._getVisibleArea();
        var graphicBBox = that._getGraphicBBox();
        if (that._isPointInVisibleArea(visibleArea, graphicBBox)) {
            coord = that._moveLabelOnCanvas(coord, visibleArea, label.getBoundingRect())
        }
        return coord
    },
    _getErrorBarSettings: function(errorBarOptions, animationEnabled) {
        var settings = _symbol_point.default._getErrorBarSettings.call(this, errorBarOptions, animationEnabled);
        settings.rotate = ERROR_BARS_ANGLE_OFFSET - this.angle;
        settings.rotateX = this.centerX;
        settings.rotateY = this.centerY;
        return settings
    },
    getCoords: function(min) {
        return min ? this.getDefaultCoords() : {
            x: this.x,
            y: this.y
        }
    }
});
exports.polarSymbolPoint = polarSymbolPoint;
var polarBarPoint = _extend({}, _bar_point.default, {
    _translateErrorBars: polarSymbolPoint._translateErrorBars,
    _getErrorBarSettings: polarSymbolPoint._getErrorBarSettings,
    _moveLabelOnCanvas: polarSymbolPoint._moveLabelOnCanvas,
    _getLabelCoords: _pie_point.default._getLabelCoords,
    _getElementCoords: _pie_point.default._getElementCoords,
    _getLabelConnector: _pie_point.default._getLabelConnector,
    getTooltipParams: _pie_point.default.getTooltipParams,
    _getLabelPosition: _pie_point.default._getLabelPosition,
    _getCoords: polarSymbolPoint._getCoords,
    _translate: function() {
        var that = this;
        var translator = that._getValTranslator();
        var businessRange = translator.getBusinessRange();
        var maxRadius = translator.translate(CANVAS_POSITION_END);
        that.radiusInner = translator.translate(that.minValue);
        polarSymbolPoint._translate.call(that);
        if (null === that.radiusInner) {
            that.radiusInner = that.radius = maxRadius
        } else {
            if (null === that.radius) {
                that.radius = that.value >= businessRange.minVisible ? maxRadius : 0
            } else {
                if (that.radius > maxRadius) {
                    that.radius = maxRadius
                }
            }
        }
        that.radiusOuter = that.radiusLabels = _max(that.radiusInner, that.radius);
        that.radiusLabels += RADIAL_LABEL_INDENT;
        that.radiusInner = that.defaultRadius = _math.min(that.radiusInner, that.radius);
        that.middleAngle = that.angle = -(0, _utils.normalizeAngle)(that.middleAngleCorrection - that.angle)
    },
    _checkRadiusForVisibleArea: function(radius) {
        return (0, _type.isDefined)(radius) || this._getValTranslator().translate(this.minValue) > 0
    },
    _getErrorBarBaseEdgeLength: function() {
        var coord = this.getMarkerCoords();
        return _math.PI * coord.outerRadius * _math.abs(coord.startAngle - coord.endAngle) / 180
    },
    getMarkerCoords: function() {
        return {
            x: this.centerX,
            y: this.centerY,
            outerRadius: this.radiusOuter,
            innerRadius: this.defaultRadius,
            startAngle: this.middleAngle - this.interval / 2,
            endAngle: this.middleAngle + this.interval / 2
        }
    },
    _drawMarker: function(renderer, group, animationEnabled) {
        var that = this;
        var styles = that._getStyle();
        var coords = that.getMarkerCoords();
        var innerRadius = coords.innerRadius;
        var outerRadius = coords.outerRadius;
        var start = that._getCoords(that.argument, CANVAS_POSITION_DEFAULT);
        var x = coords.x;
        var y = coords.y;
        if (animationEnabled) {
            innerRadius = 0;
            outerRadius = 0;
            x = start.x;
            y = start.y
        }
        that.graphic = renderer.arc(x, y, innerRadius, outerRadius, coords.startAngle, coords.endAngle).attr(styles).data({
            "chart-data-point": that
        }).append(group)
    },
    _checkLabelPosition: function(label, coord) {
        var that = this;
        var visibleArea = that._getVisibleArea();
        var angleFunctions = (0, _utils.getCosAndSin)(that.middleAngle);
        var x = that.centerX + that.defaultRadius * angleFunctions.cos;
        var y = that.centerY - that.defaultRadius * angleFunctions.sin;
        if (x > visibleArea.minX && x < visibleArea.maxX && y > visibleArea.minY && y < visibleArea.maxY) {
            coord = that._moveLabelOnCanvas(coord, visibleArea, label.getBoundingRect())
        }
        return coord
    },
    _addLabelAlignmentAndOffset: function(label, coord) {
        return coord
    },
    correctCoordinates: function(correctOptions) {
        this.middleAngleCorrection = correctOptions.offset;
        this.interval = correctOptions.width
    },
    coordsIn: function(x, y) {
        var val = (0, _utils.convertXYToPolar)(this.series.getValueAxis().getCenter(), x, y);
        var coords = this.getMarkerCoords();
        var isBetweenAngles = coords.startAngle < coords.endAngle ? -val.phi >= coords.startAngle && -val.phi <= coords.endAngle : -val.phi <= coords.startAngle && -val.phi >= coords.endAngle;
        return val.r >= coords.innerRadius && val.r <= coords.outerRadius && isBetweenAngles
    }
});
exports.polarBarPoint = polarBarPoint;
