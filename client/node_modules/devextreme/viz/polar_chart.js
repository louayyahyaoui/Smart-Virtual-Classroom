/**
 * DevExtreme (viz/polar_chart.js)
 * Version: 20.2.6
 * Build date: Tue Mar 16 2021
 *
 * Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
exports.default = void 0;
var _common = require("../core/utils/common");
var _component_registrator = _interopRequireDefault(require("../core/component_registrator"));
var _extend = require("../core/utils/extend");
var _utils = require("./core/utils");
var _advanced_chart = require("./chart_components/advanced_chart");
var _type = require("../core/utils/type");
var _annotations = require("./core/annotations");

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        "default": obj
    }
}
var DEFAULT_PANE_NAME = "default";
var DOUBLE_PI_ANGLE = 360;
var dxPolarChart = _advanced_chart.AdvancedChart.inherit({
    _themeSection: "polar",
    _createPanes: function() {
        this.callBase();
        return [{
            name: DEFAULT_PANE_NAME
        }]
    },
    _checkPaneName: function() {
        return true
    },
    _getAxisRenderingOptions: function(typeSelector) {
        var isArgumentAxis = "argumentAxis" === typeSelector;
        var type = isArgumentAxis ? "circular" : "linear";
        var useSpiderWeb = this.option("useSpiderWeb");
        if (useSpiderWeb) {
            type += "Spider"
        }
        return {
            axisType: "polarAxes",
            drawingType: type
        }
    },
    _prepareAxisOptions: function(typeSelector, axisOptions) {
        var isArgumentAxis = "argumentAxis" === typeSelector;
        var themeManager = this._themeManager;
        var axisUserOptions = this.option("argumentAxis");
        var argumentAxisOptions = themeManager.getOptions("argumentAxis", axisUserOptions) || {};
        var startAngle = isFinite(argumentAxisOptions.startAngle) ? (0, _utils.normalizeAngle)(argumentAxisOptions.startAngle) : 0;
        return {
            type: this.option("useSpiderWeb") && isArgumentAxis ? "discrete" : axisOptions.type,
            isHorizontal: true,
            showCustomBoundaryTicks: isArgumentAxis,
            startAngle: startAngle,
            endAngle: startAngle + 360
        }
    },
    _optionChangesMap: {
        useSpiderWeb: "AXES_AND_PANES"
    },
    _getExtraOptions: function() {
        return {
            spiderWidget: this.option("useSpiderWeb")
        }
    },
    _prepareToRender: function() {
        this._appendAxesGroups();
        return {}
    },
    _calcCanvas: function() {
        var canvas = (0, _extend.extend)({}, this._canvas);
        var argumentAxis = this.getArgumentAxis();
        var margins = argumentAxis.getMargins();
        Object.keys(margins).forEach(function(margin) {
            return canvas[margin] = canvas["original".concat(margin[0].toUpperCase()).concat(margin.slice(1))] + margins[margin]
        });
        return canvas
    },
    _renderAxes: function(drawOptions) {
        var that = this;
        var valueAxis = that._getValueAxis();
        var argumentAxis = that.getArgumentAxis();
        argumentAxis.draw(that._canvas);
        valueAxis.setSpiderTicks(argumentAxis.getSpiderTicks());
        var canvas = that._calcCanvas();
        argumentAxis.updateSize(canvas);
        valueAxis.draw(canvas);
        return canvas
    },
    _getValueAxis: function() {
        return this._valueAxes[0]
    },
    _shrinkAxes: function(sizeStorage) {
        var valueAxis = this._getValueAxis();
        var argumentAxis = this.getArgumentAxis();
        if (sizeStorage && (sizeStorage.width || sizeStorage.height)) {
            argumentAxis.hideOuterElements();
            var canvas = this._calcCanvas();
            argumentAxis.updateSize(canvas);
            valueAxis.updateSize(canvas)
        }
    },
    checkForMoreSpaceForPanesCanvas: function() {
        return this.layoutManager.needMoreSpaceForPanesCanvas([{
            canvas: this.getArgumentAxis().getCanvas()
        }], this._isRotated())
    },
    _getLayoutTargets: function() {
        return [{
            canvas: this._canvas
        }]
    },
    _getSeriesForPane: function() {
        return this.series
    },
    _applyClipRects: function() {
        var canvasClipRectID = this._getCanvasClipRectID();
        this._createClipPathForPane();
        this.getArgumentAxis().applyClipRects(this._getElementsClipRectID(), canvasClipRectID);
        this._getValueAxis().applyClipRects(this._getElementsClipRectID(), canvasClipRectID)
    },
    _createClipPathForPane: function() {
        var that = this;
        var valueAxis = that._getValueAxis();
        var center = valueAxis.getCenter();
        var radius = valueAxis.getRadius();
        var panesClipRects = that._panesClipRects;
        center = {
            x: Math.round(center.x),
            y: Math.round(center.y)
        };
        that._createClipCircle(panesClipRects.fixed, center.x, center.y, radius);
        that._createClipCircle(panesClipRects.base, center.x, center.y, radius);
        if (that.series.some(function(s) {
                return s.areErrorBarsVisible()
            })) {
            that._createClipCircle(panesClipRects.wide, center.x, center.y, radius)
        } else {
            panesClipRects.wide[0] = null
        }
    },
    _createClipCircle: function(clipArray, left, top, radius) {
        var that = this;
        var clipCircle = clipArray[0];
        if (!clipCircle) {
            clipCircle = that._renderer.clipCircle(left, top, radius);
            clipArray[0] = clipCircle
        } else {
            clipCircle.attr({
                cx: left,
                cy: top,
                r: radius
            })
        }
    },
    _applyExtraSettings: function(series) {
        var wideClipRect = this._panesClipRects.wide[0];
        series.setClippingParams(this._panesClipRects.base[0].id, wideClipRect && wideClipRect.id, false, false)
    },
    getActualAngle: function(angle) {
        return this.getArgumentAxis().getOptions().inverted ? DOUBLE_PI_ANGLE - angle : angle
    },
    getXYFromPolar: function(angle, radius, argument, value) {
        var layoutInfo = {
            angle: void 0,
            radius: void 0,
            x: void 0,
            y: void 0
        };
        if (!(0, _type.isDefined)(angle) && !(0, _type.isDefined)(radius) && !(0, _type.isDefined)(argument) && !(0, _type.isDefined)(value)) {
            return layoutInfo
        }
        var argAxis = this.getArgumentAxis();
        var startAngle = argAxis.getAngles()[0];
        var argAngle;
        var translatedRadius;
        if ((0, _type.isDefined)(argument)) {
            argAngle = argAxis.getTranslator().translate(argument)
        } else {
            if (isFinite(angle)) {
                argAngle = this.getActualAngle(angle)
            } else {
                if (!(0, _type.isDefined)(angle)) {
                    argAngle = 0
                }
            }
        }
        if ((0, _type.isDefined)(value)) {
            translatedRadius = this.getValueAxis().getTranslator().translate(value)
        } else {
            if (isFinite(radius)) {
                translatedRadius = radius
            } else {
                if (!(0, _type.isDefined)(radius)) {
                    translatedRadius = argAxis.getRadius()
                }
            }
        }
        if ((0, _type.isDefined)(argAngle) && (0, _type.isDefined)(translatedRadius)) {
            var coords = (0, _utils.convertPolarToXY)(argAxis.getCenter(), startAngle, argAngle, translatedRadius);
            (0, _extend.extend)(layoutInfo, coords, {
                angle: argAxis.getTranslatedAngle(argAngle),
                radius: translatedRadius
            })
        }
        return layoutInfo
    },
    _applyPointMarkersAutoHiding: _common.noop,
    _createScrollBar: _common.noop,
    _isRotated: _common.noop,
    _getCrosshairOptions: _common.noop,
    _isLegendInside: _common.noop
});
dxPolarChart.addPlugin(_annotations.plugins.core);
dxPolarChart.addPlugin(_annotations.plugins.polarChart);
(0, _component_registrator.default)("dxPolarChart", dxPolarChart);
var _default = dxPolarChart;
exports.default = _default;
module.exports = exports.default;
module.exports.default = module.exports;
