/**
 * DevExtreme (viz/series/points/pie_point.js)
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
var _utils = require("../../core/utils");
var _type = require("../../../core/utils/type");
var _consts = _interopRequireDefault(require("../../components/consts"));

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        "default": obj
    }
}
var _extend = _extend2.extend;
var _round = Math.round;
var _sqrt = Math.sqrt;
var _acos = Math.acos;
var DEG = 180 / Math.PI;
var _abs = Math.abs;
var RADIAL_LABEL_INDENT = _consts.default.radialLabelIndent;
var _default = _extend({}, _symbol_point.default, {
    _updateData: function(data, argumentChanged) {
        var that = this;
        _symbol_point.default._updateData.call(this, data);
        if (argumentChanged || !(0, _type.isDefined)(that._visible)) {
            that._visible = true
        }
        that.minValue = that.initialMinValue = that.originalMinValue = (0, _type.isDefined)(data.minValue) ? data.minValue : 0
    },
    animate: function(complete, duration, delay) {
        var that = this;
        that.graphic.animate({
            x: that.centerX,
            y: that.centerY,
            outerRadius: that.radiusOuter,
            innerRadius: that.radiusInner,
            startAngle: that.toAngle,
            endAngle: that.fromAngle
        }, {
            delay: delay,
            partitionDuration: duration
        }, complete)
    },
    correctPosition: function(correction) {
        var that = this;
        that.correctRadius(correction);
        that.correctLabelRadius(correction.radiusOuter + RADIAL_LABEL_INDENT);
        that.centerX = correction.centerX;
        that.centerY = correction.centerY
    },
    correctRadius: function(correction) {
        this.radiusInner = correction.radiusInner;
        this.radiusOuter = correction.radiusOuter
    },
    correctLabelRadius: function(radiusLabels) {
        this.radiusLabels = radiusLabels
    },
    correctValue: function(correction, percent, base) {
        var that = this;
        that.value = (base || that.normalInitialValue) + correction;
        that.minValue = correction;
        that.percent = percent;
        that._label.setDataField("percent", percent)
    },
    _updateLabelData: function() {
        this._label.setData(this._getLabelFormatObject())
    },
    _getShiftLabelCoords: function() {
        var that = this;
        var bBox = that._label.getBoundingRect();
        var coord = that._getLabelCoords(that._label);
        var visibleArea = that._getVisibleArea();
        if (that._isLabelDrawingWithoutPoints) {
            return that._checkLabelPosition(coord, bBox, visibleArea)
        } else {
            return that._getLabelExtraCoord(coord, that._checkVerticalLabelPosition(coord, bBox, visibleArea), bBox)
        }
    },
    _getLabelPosition: function(options) {
        return options.position
    },
    getAnnotationCoords: function(location) {
        return this._getElementCoords("edge" !== location ? "inside" : "outside", this.radiusOuter, 0)
    },
    _getElementCoords: function(position, elementRadius, radialOffset) {
        var bBox = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : {
            x: 0,
            y: 0,
            width: 0,
            height: 0
        };
        var that = this;
        var angleFunctions = (0, _utils.getCosAndSin)(that.middleAngle);
        var radiusInner = that.radiusInner;
        var radiusOuter = that.radiusOuter;
        var columnsPosition = "columns" === position;
        var rad;
        var x;
        if ("inside" === position) {
            rad = radiusInner + (radiusOuter - radiusInner) / 2 + radialOffset;
            x = that.centerX + rad * angleFunctions.cos - bBox.width / 2
        } else {
            rad = elementRadius + radialOffset;
            if (angleFunctions.cos > .1 || columnsPosition && angleFunctions.cos >= 0) {
                x = that.centerX + rad * angleFunctions.cos
            } else {
                if (angleFunctions.cos < -.1 || columnsPosition && angleFunctions.cos < 0) {
                    x = that.centerX + rad * angleFunctions.cos - bBox.width
                } else {
                    x = that.centerX + rad * angleFunctions.cos - bBox.width / 2
                }
            }
        }
        return {
            x: x,
            y: _round(that.centerY - rad * angleFunctions.sin - bBox.height / 2)
        }
    },
    _getLabelCoords: function(label) {
        var that = this;
        var bBox = label.getBoundingRect();
        var options = label.getLayoutOptions();
        var position = that._getLabelPosition(options);
        return that._getElementCoords(position, that.radiusLabels, options.radialOffset, bBox)
    },
    _correctLabelCoord: function(coord, moveLabelsFromCenter) {
        var that = this;
        var label = that._label;
        var bBox = label.getBoundingRect();
        var labelWidth = bBox.width;
        var options = label.getLayoutOptions();
        var visibleArea = that._getVisibleArea();
        var rightBorderX = visibleArea.maxX - labelWidth;
        var leftBorderX = visibleArea.minX;
        var angleOfPoint = (0, _utils.normalizeAngle)(that.middleAngle);
        var centerX = that.centerX;
        var connectorOffset = options.connectorOffset;
        var x = coord.x;
        if ("columns" === options.position) {
            if (angleOfPoint <= 90 || angleOfPoint >= 270) {
                x = rightBorderX
            } else {
                x = leftBorderX
            }
            coord.x = x
        } else {
            if ("inside" !== options.position && moveLabelsFromCenter) {
                if (angleOfPoint <= 90 || angleOfPoint >= 270) {
                    if (x - connectorOffset < centerX) {
                        x = centerX + connectorOffset
                    }
                } else {
                    if (x + labelWidth + connectorOffset > centerX) {
                        x = centerX - labelWidth - connectorOffset
                    }
                }
                coord.x = x
            }
        }
        return coord
    },
    drawLabel: function() {
        this.translate();
        this._isLabelDrawingWithoutPoints = true;
        this._drawLabel();
        this._isLabelDrawingWithoutPoints = false
    },
    updateLabelCoord: function(moveLabelsFromCenter) {
        var that = this;
        var bBox = that._label.getBoundingRect();
        var coord = that._correctLabelCoord(bBox, moveLabelsFromCenter);
        coord = that._checkHorizontalLabelPosition(coord, bBox, that._getVisibleArea());
        that._label.shift(_round(coord.x), _round(bBox.y))
    },
    _checkVerticalLabelPosition: function(coord, box, visibleArea) {
        var x = coord.x;
        var y = coord.y;
        if (coord.y + box.height > visibleArea.maxY) {
            y = visibleArea.maxY - box.height
        } else {
            if (coord.y < visibleArea.minY) {
                y = visibleArea.minY
            }
        }
        return {
            x: x,
            y: y
        }
    },
    _getLabelExtraCoord: function(coord, shiftCoord, box) {
        return coord.y !== shiftCoord.y ? (0, _utils.getVerticallyShiftedAngularCoords)({
            x: coord.x,
            y: coord.y,
            width: box.width,
            height: box.height
        }, shiftCoord.y - coord.y, {
            x: this.centerX,
            y: this.centerY
        }) : coord
    },
    _checkHorizontalLabelPosition: function(coord, box, visibleArea) {
        var x = coord.x;
        var y = coord.y;
        if (coord.x + box.width > visibleArea.maxX) {
            x = visibleArea.maxX - box.width
        } else {
            if (coord.x < visibleArea.minX) {
                x = visibleArea.minX
            }
        }
        return {
            x: x,
            y: y
        }
    },
    applyWordWrap: function(moveLabelsFromCenter) {
        var that = this;
        var label = that._label;
        var box = label.getBoundingRect();
        var visibleArea = that._getVisibleArea();
        var position = label.getLayoutOptions().position;
        var width = box.width;
        var rowCountChanged = false;
        if ("columns" === position && that.series.index > 0) {
            width = visibleArea.maxX - that.centerX - that.radiusLabels
        } else {
            if ("inside" === position) {
                if (width > visibleArea.maxX - visibleArea.minX) {
                    width = visibleArea.maxX - visibleArea.minX
                }
            } else {
                if (moveLabelsFromCenter && box.x < that.centerX && box.width + box.x > that.centerX) {
                    width = Math.floor((visibleArea.maxX - visibleArea.minX) / 2)
                } else {
                    if (box.x + width > visibleArea.maxX) {
                        width = visibleArea.maxX - box.x
                    } else {
                        if (box.x < visibleArea.minX) {
                            width = box.x + width - visibleArea.minX
                        }
                    }
                }
            }
        }
        if (width < box.width) {
            rowCountChanged = label.fit(width)
        }
        return rowCountChanged
    },
    setLabelTrackerData: function() {
        this._label.setTrackerData(this)
    },
    _checkLabelPosition: function(coord, bBox, visibleArea) {
        coord = this._checkHorizontalLabelPosition(coord, bBox, visibleArea);
        return this._checkVerticalLabelPosition(coord, bBox, visibleArea)
    },
    _getLabelConnector: function() {
        var that = this;
        var rad = that.radiusOuter;
        var seriesStyle = that._options.styles.normal;
        var strokeWidthBy2 = seriesStyle["stroke-width"] / 2;
        var borderWidth = that.series.getOptions().containerBackgroundColor === seriesStyle.stroke ? _round(strokeWidthBy2) : _round(-strokeWidthBy2);
        var angleFunctions = (0, _utils.getCosAndSin)(_round(that.middleAngle));
        return {
            x: _round(that.centerX + (rad - borderWidth) * angleFunctions.cos),
            y: _round(that.centerY - (rad - borderWidth) * angleFunctions.sin),
            angle: that.middleAngle
        }
    },
    _drawMarker: function(renderer, group, animationEnabled, firstDrawing) {
        var that = this;
        var radiusOuter = that.radiusOuter;
        var radiusInner = that.radiusInner;
        var fromAngle = that.fromAngle;
        var toAngle = that.toAngle;
        if (animationEnabled) {
            radiusInner = radiusOuter = 0;
            if (!firstDrawing) {
                fromAngle = toAngle = that.shiftedAngle
            }
        }
        that.graphic = renderer.arc(that.centerX, that.centerY, radiusInner, radiusOuter, toAngle, fromAngle).attr({
            "stroke-linejoin": "round"
        }).smartAttr(that._getStyle()).data({
            "chart-data-point": that
        }).sharp().append(group)
    },
    getTooltipParams: function() {
        var that = this;
        var angleFunctions = (0, _utils.getCosAndSin)(that.middleAngle);
        var radiusInner = that.radiusInner;
        var radiusOuter = that.radiusOuter;
        return {
            x: that.centerX + (radiusInner + (radiusOuter - radiusInner) / 2) * angleFunctions.cos,
            y: that.centerY - (radiusInner + (radiusOuter - radiusInner) / 2) * angleFunctions.sin,
            offset: 0
        }
    },
    _translate: function() {
        var that = this;
        var angle = that.shiftedAngle || 0;
        var value = that.value;
        var minValue = that.minValue;
        var translator = that._getValTranslator();
        that.fromAngle = translator.translate(minValue) + angle;
        that.toAngle = translator.translate(value) + angle;
        that.middleAngle = translator.translate((value - minValue) / 2 + minValue) + angle;
        if (!that.isVisible()) {
            that.middleAngle = that.toAngle = that.fromAngle = that.fromAngle || angle
        }
    },
    getMarkerVisibility: function() {
        return true
    },
    _updateMarker: function(animationEnabled, style, _, callback) {
        var that = this;
        if (!animationEnabled) {
            style = _extend({
                x: that.centerX,
                y: that.centerY,
                outerRadius: that.radiusOuter,
                innerRadius: that.radiusInner,
                startAngle: that.toAngle,
                endAngle: that.fromAngle
            }, style)
        }
        that.graphic.smartAttr(style).sharp();
        callback && callback()
    },
    getLegendStyles: function() {
        return this._styles.legendStyles
    },
    isInVisibleArea: function() {
        return true
    },
    hide: function() {
        var that = this;
        if (that._visible) {
            that._visible = false;
            that.hideTooltip();
            that._options.visibilityChanged()
        }
    },
    show: function() {
        var that = this;
        if (!that._visible) {
            that._visible = true;
            that._options.visibilityChanged()
        }
    },
    setInvisibility: function() {
        this._label.draw(false)
    },
    isVisible: function() {
        return this._visible
    },
    _getFormatObject: function(tooltip) {
        var formatObject = _symbol_point.default._getFormatObject.call(this, tooltip);
        var percent = this.percent;
        formatObject.percent = percent;
        formatObject.percentText = tooltip.formatValue(percent, "percent");
        return formatObject
    },
    getColor: function() {
        return this._styles.normal.fill
    },
    coordsIn: function(x, y) {
        var that = this;
        var lx = x - that.centerX;
        var ly = y - that.centerY;
        var r = _sqrt(lx * lx + ly * ly);
        var fromAngle = that.fromAngle % 360;
        var toAngle = that.toAngle % 360;
        var angle;
        if (r < that.radiusInner || r > that.radiusOuter || 0 === r) {
            return false
        }
        angle = _acos(lx / r) * DEG * (ly > 0 ? -1 : 1);
        if (angle < 0) {
            angle += 360
        }
        if (fromAngle === toAngle && _abs(that.toAngle - that.fromAngle) > 1e-4) {
            return true
        } else {
            return fromAngle >= toAngle ? angle <= fromAngle && angle >= toAngle : !(angle >= fromAngle && angle <= toAngle)
        }
    }
});
exports.default = _default;
module.exports = exports.default;
