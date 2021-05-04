/**
 * DevExtreme (viz/series/bar_series.js)
 * Version: 20.2.6
 * Build date: Tue Mar 16 2021
 *
 * Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";

function _typeof(obj) {
    "@babel/helpers - typeof";
    if ("function" === typeof Symbol && "symbol" === typeof Symbol.iterator) {
        _typeof = function(obj) {
            return typeof obj
        }
    } else {
        _typeof = function(obj) {
            return obj && "function" === typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj
        }
    }
    return _typeof(obj)
}
exports.polar = exports.chart = void 0;
var _extend2 = require("../../core/utils/extend");
var _iterator = require("../../core/utils/iterator");
var scatterSeries = _interopRequireWildcard(require("./scatter_series"));
var _area_series = require("./area_series");
var _utils = require("../core/utils");
var _type = require("../../core/utils/type");

function _getRequireWildcardCache() {
    if ("function" !== typeof WeakMap) {
        return null
    }
    var cache = new WeakMap;
    _getRequireWildcardCache = function() {
        return cache
    };
    return cache
}

function _interopRequireWildcard(obj) {
    if (obj && obj.__esModule) {
        return obj
    }
    if (null === obj || "object" !== _typeof(obj) && "function" !== typeof obj) {
        return {
            "default": obj
        }
    }
    var cache = _getRequireWildcardCache();
    if (cache && cache.has(obj)) {
        return cache.get(obj)
    }
    var newObj = {};
    var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;
    for (var key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
            var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;
            if (desc && (desc.get || desc.set)) {
                Object.defineProperty(newObj, key, desc)
            } else {
                newObj[key] = obj[key]
            }
        }
    }
    newObj.default = obj;
    if (cache) {
        cache.set(obj, newObj)
    }
    return newObj
}
var areaSeries = _area_series.chart.area;
var chartSeries = scatterSeries.chart;
var polarSeries = scatterSeries.polar;
var _extend = _extend2.extend;
var _each = _iterator.each;
var chart = {};
exports.chart = chart;
var polar = {};
exports.polar = polar;
var baseBarSeriesMethods = {
    _createLegendState: function(styleOptions, defaultColor) {
        return {
            fill: styleOptions.color || defaultColor,
            hatching: styleOptions.hatching
        }
    },
    _parsePointStyle: function(style, defaultColor, defaultBorderColor) {
        var color = style.color || defaultColor;
        var base = chartSeries._parsePointStyle.call(this, style, color, defaultBorderColor);
        base.fill = color;
        base.hatching = style.hatching;
        base.dashStyle = style.border && style.border.dashStyle || "solid";
        delete base.r;
        return base
    },
    _applyMarkerClipRect: function(settings) {
        settings["clip-path"] = null
    },
    _setGroupsSettings: function(animationEnabled, firstDrawing) {
        var that = this;
        var settings = {};
        chartSeries._setGroupsSettings.apply(that, arguments);
        if (animationEnabled && firstDrawing) {
            settings = this._getAffineCoordOptions()
        } else {
            if (!animationEnabled) {
                settings = {
                    scaleX: 1,
                    scaleY: 1,
                    translateX: 0,
                    translateY: 0
                }
            }
        }
        that._markersGroup.attr(settings)
    },
    _drawPoint: function(options) {
        options.hasAnimation = options.hasAnimation && !options.firstDrawing;
        options.firstDrawing = false;
        chartSeries._drawPoint.call(this, options)
    },
    _getMainColor: function() {
        return this._options.mainSeriesColor
    },
    _createPointStyles: function(pointOptions) {
        var that = this;
        var mainColor = pointOptions.color || that._getMainColor();
        return {
            normal: that._parsePointStyle(pointOptions, mainColor, mainColor),
            hover: that._parsePointStyle(pointOptions.hoverStyle || {}, mainColor, mainColor),
            selection: that._parsePointStyle(pointOptions.selectionStyle || {}, mainColor, mainColor)
        }
    },
    _updatePointsVisibility: function() {
        var visibility = this._options.visible;
        (0, _iterator.each)(this._points, function(_, point) {
            point._options.visible = visibility
        })
    },
    _getOptionsForPoint: function() {
        return this._options
    },
    _animate: function(firstDrawing) {
        var that = this;
        var complete = function() {
            that._animateComplete()
        };
        var animateFunc = function(drawnPoints, complete) {
            var lastPointIndex = drawnPoints.length - 1;
            _each(drawnPoints || [], function(i, point) {
                point.animate(i === lastPointIndex ? complete : void 0, point.getMarkerCoords())
            })
        };
        that._animatePoints(firstDrawing, complete, animateFunc)
    },
    getValueRangeInitialValue: areaSeries.getValueRangeInitialValue,
    _patchMarginOptions: function(options) {
        options.checkInterval = true;
        return options
    },
    _defaultAggregator: "sum",
    _defineDrawingState: function() {},
    usePointsToDefineAutoHiding: function() {
        return false
    }
};
chart.bar = _extend({}, chartSeries, baseBarSeriesMethods, {
    _getAffineCoordOptions: function() {
        var rotated = this._options.rotated;
        var direction = rotated ? "X" : "Y";
        var settings = {
            scaleX: rotated ? .001 : 1,
            scaleY: rotated ? 1 : .001
        };
        settings["translate" + direction] = this.getValueAxis().getTranslator().translate("canvas_position_default");
        return settings
    },
    _animatePoints: function(firstDrawing, complete, animateFunc) {
        var that = this;
        that._markersGroup.animate({
            scaleX: 1,
            scaleY: 1,
            translateY: 0,
            translateX: 0
        }, void 0, complete);
        if (!firstDrawing) {
            animateFunc(that._drawnPoints, complete)
        }
    },
    checkSeriesViewportCoord: function(axis, coord) {
        if (!chartSeries.checkSeriesViewportCoord.call(this)) {
            return false
        }
        if (axis.isArgumentAxis) {
            return true
        }
        var translator = axis.getTranslator();
        var range = this.getViewport();
        var min = translator.translate(range.categories ? range.categories[0] : range.min);
        var max = translator.translate(range.categories ? range.categories[range.categories.length - 1] : range.max);
        var rotated = this.getOptions().rotated;
        var inverted = axis.getOptions().inverted;
        return rotated && !inverted || !rotated && inverted ? coord >= min && coord <= max : coord >= max && coord <= min
    },
    getSeriesPairCoord: function(coord, isArgument) {
        var oppositeCoord = null;
        var rotated = this._options.rotated;
        var isOpposite = !isArgument && !rotated || isArgument && rotated;
        var coordName = isOpposite ? "vy" : "vx";
        var oppositeCoordName = isOpposite ? "vx" : "vy";
        var points = this.getPoints();
        for (var i = 0; i < points.length; i++) {
            var p = points[i];
            var tmpCoord = void 0;
            if (isArgument) {
                tmpCoord = p.getCenterCoord()[coordName[1]] === coord ? p[oppositeCoordName] : void 0
            } else {
                tmpCoord = p[coordName] === coord ? p[oppositeCoordName] : void 0
            }
            if (this._checkAxisVisibleAreaCoord(!isArgument, tmpCoord)) {
                oppositeCoord = tmpCoord;
                break
            }
        }
        return oppositeCoord
    }
});
polar.bar = _extend({}, polarSeries, baseBarSeriesMethods, {
    _animatePoints: function(firstDrawing, complete, animateFunc) {
        animateFunc(this._drawnPoints, complete)
    },
    _setGroupsSettings: chartSeries._setGroupsSettings,
    _drawPoint: function(point, groups, animationEnabled) {
        chartSeries._drawPoint.call(this, point, groups, animationEnabled)
    },
    _parsePointStyle: function(style) {
        var base = baseBarSeriesMethods._parsePointStyle.apply(this, arguments);
        base.opacity = style.opacity;
        return base
    },
    _createGroups: chartSeries._createGroups,
    _setMarkerGroupSettings: function() {
        var that = this;
        var markersSettings = that._createPointStyles(that._getMarkerGroupOptions()).normal;
        markersSettings.class = "dxc-markers";
        that._applyMarkerClipRect(markersSettings);
        var groupSettings = _extend({}, markersSettings);
        delete groupSettings.opacity;
        that._markersGroup.attr(groupSettings)
    },
    getSeriesPairCoord: function(params, isArgument) {
        var coords = null;
        var paramName = isArgument ? "argument" : "radius";
        var points = this.getVisiblePoints();
        var argAxis = this.getArgumentAxis();
        var startAngle = argAxis.getAngles()[0];
        for (var i = 0; i < points.length; i++) {
            var p = points[i];
            var tmpPoint = (0, _type.isDefined)(p[paramName]) && (0, _type.isDefined)(params[paramName]) && p[paramName].valueOf() === params[paramName].valueOf() ? (0, _utils.convertPolarToXY)(argAxis.getCenter(), startAngle, -argAxis.getTranslatedAngle(p.angle), p.radius) : void 0;
            if ((0, _type.isDefined)(tmpPoint)) {
                coords = tmpPoint;
                break
            }
        }
        return coords
    },
    _createLegendState: areaSeries._createLegendState
});
