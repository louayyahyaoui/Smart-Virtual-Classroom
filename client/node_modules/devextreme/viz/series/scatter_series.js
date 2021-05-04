/**
 * DevExtreme (viz/series/scatter_series.js)
 * Version: 20.2.6
 * Build date: Tue Mar 16 2021
 *
 * Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
exports.polar = exports.chart = void 0;
var _extend3 = require("../../core/utils/extend");
var _array = require("../../core/utils/array");
var _iterator = require("../../core/utils/iterator");
var _range_data_calculator = _interopRequireDefault(require("./helpers/range_data_calculator"));
var _type = require("../../core/utils/type");
var _utils = require("../core/utils");
var _common = require("../../core/utils/common");

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        "default": obj
    }
}

function _defineProperty(obj, key, value) {
    if (key in obj) {
        Object.defineProperty(obj, key, {
            value: value,
            enumerable: true,
            configurable: true,
            writable: true
        })
    } else {
        obj[key] = value
    }
    return obj
}
var math = Math;
var _abs = math.abs;
var _sqrt = math.sqrt;
var _max = math.max;
var DEFAULT_TRACKER_WIDTH = 12;
var DEFAULT_DURATION = 400;
var HIGH_ERROR = "highError";
var LOW_ERROR = "lowError";
var VARIANCE = "variance";
var STANDARD_DEVIATION = "stddeviation";
var STANDARD_ERROR = "stderror";
var PERCENT = "percent";
var FIXED = "fixed";
var UNDEFINED = "undefined";
var DISCRETE = "discrete";
var LOGARITHMIC = "logarithmic";
var DATETIME = "datetime";
var chart = {};
exports.chart = chart;
var polar = {};
exports.polar = polar;

function sum(array) {
    var result = 0;
    (0, _iterator.each)(array, function(_, value) {
        result += value
    });
    return result
}

function isErrorBarTypeCorrect(type) {
    return (0, _array.inArray)(type, [FIXED, PERCENT, VARIANCE, STANDARD_DEVIATION, STANDARD_ERROR]) !== -1
}

function variance(array, expectedValue) {
    return sum((0, _utils.map)(array, function(value) {
        return (value - expectedValue) * (value - expectedValue)
    })) / array.length
}

function calculateAvgErrorBars(result, data, series) {
    var errorBarsOptions = series.getOptions().valueErrorBar;
    var valueField = series.getValueFields()[0];
    var lowValueField = errorBarsOptions.lowValueField || LOW_ERROR;
    var highValueField = errorBarsOptions.highValueField || HIGH_ERROR;
    if (series.areErrorBarsVisible() && void 0 === errorBarsOptions.type) {
        var fusionData = data.reduce(function(result, item) {
            if ((0, _type.isDefined)(item[lowValueField])) {
                result[0] += item[valueField] - item[lowValueField];
                result[1]++
            }
            if ((0, _type.isDefined)(item[highValueField])) {
                result[2] += item[highValueField] - item[valueField];
                result[3]++
            }
            return result
        }, [0, 0, 0, 0]);
        if (fusionData[1]) {
            result[lowValueField] = result[valueField] - fusionData[0] / fusionData[1]
        }
        if (fusionData[2]) {
            result[highValueField] = result[valueField] + fusionData[2] / fusionData[3]
        }
    }
    return result
}

function calculateSumErrorBars(result, data, series) {
    var errorBarsOptions = series.getOptions().valueErrorBar;
    var lowValueField = errorBarsOptions.lowValueField || LOW_ERROR;
    var highValueField = errorBarsOptions.highValueField || HIGH_ERROR;
    if (series.areErrorBarsVisible() && void 0 === errorBarsOptions.type) {
        result[lowValueField] = 0;
        result[highValueField] = 0;
        result = data.reduce(function(result, item) {
            result[lowValueField] += item[lowValueField];
            result[highValueField] += item[highValueField];
            return result
        }, result)
    }
    return result
}

function getMinMaxAggregator(compare) {
    return function(_ref, series) {
        var intervalStart = _ref.intervalStart,
            data = _ref.data;
        var valueField = series.getValueFields()[0];
        var targetData = data[0];
        targetData = data.reduce(function(result, item) {
            var value = item[valueField];
            if (null === result[valueField]) {
                result = item
            }
            if (null !== value && compare(value, result[valueField])) {
                return item
            }
            return result
        }, targetData);
        return (0, _extend3.extend)({}, targetData, _defineProperty({}, series.getArgumentField(), intervalStart))
    }
}

function checkFields(data, fieldsToCheck, skippedFields) {
    var allFieldsIsValid = true;
    for (var field in fieldsToCheck) {
        var isArgument = "argument" === field;
        if (isArgument || "size" === field ? !(0, _type.isDefined)(data[field]) : void 0 === data[field]) {
            var selector = fieldsToCheck[field];
            if (!isArgument) {
                skippedFields[selector] = (skippedFields[selector] || 0) + 1
            }
            allFieldsIsValid = false
        }
    }
    return allFieldsIsValid
}
var baseScatterMethods = {
    _defaultDuration: DEFAULT_DURATION,
    _defaultTrackerWidth: DEFAULT_TRACKER_WIDTH,
    _applyStyle: _common.noop,
    _updateOptions: _common.noop,
    _parseStyle: _common.noop,
    _prepareSegment: _common.noop,
    _drawSegment: _common.noop,
    _appendInGroup: function() {
        this._group.append(this._extGroups.seriesGroup)
    },
    _createLegendState: function(styleOptions, defaultColor) {
        return {
            fill: styleOptions.color || defaultColor,
            hatching: styleOptions.hatching ? (0, _extend3.extend)({}, styleOptions.hatching, {
                direction: "right"
            }) : void 0
        }
    },
    _applyElementsClipRect: function(settings) {
        settings["clip-path"] = this._paneClipRectID
    },
    _applyMarkerClipRect: function(settings) {
        settings["clip-path"] = this._forceClipping ? this._paneClipRectID : null
    },
    _createGroup: function(groupName, parent, target, settings) {
        var group = parent[groupName] = parent[groupName] || this._renderer.g();
        target && group.append(target);
        settings && group.attr(settings)
    },
    _applyClearingSettings: function(settings) {
        settings.opacity = null;
        settings.scale = null;
        if (this._options.rotated) {
            settings.translateX = null
        } else {
            settings.translateY = null
        }
    },
    _createGroups: function() {
        var that = this;
        that._createGroup("_markersGroup", that, that._group);
        that._createGroup("_labelsGroup", that)
    },
    _setMarkerGroupSettings: function() {
        var that = this;
        var settings = that._createPointStyles(that._getMarkerGroupOptions()).normal;
        settings.class = "dxc-markers";
        settings.opacity = 1;
        that._applyMarkerClipRect(settings);
        that._markersGroup.attr(settings)
    },
    getVisibleArea: function() {
        return this._visibleArea
    },
    areErrorBarsVisible: function() {
        var errorBarOptions = this._options.valueErrorBar;
        return errorBarOptions && this._errorBarsEnabled() && "none" !== errorBarOptions.displayMode && (isErrorBarTypeCorrect((0, _utils.normalizeEnum)(errorBarOptions.type)) || (0, _type.isDefined)(errorBarOptions.lowValueField) || (0, _type.isDefined)(errorBarOptions.highValueField))
    },
    groupPointsByCoords: function(rotated) {
        var cat = [];
        (0, _iterator.each)(this.getVisiblePoints(), function(_, p) {
            var pointCoord = parseInt(rotated ? p.vy : p.vx);
            if (!cat[pointCoord]) {
                cat[pointCoord] = p
            } else {
                Array.isArray(cat[pointCoord]) ? cat[pointCoord].push(p) : cat[pointCoord] = [cat[pointCoord], p]
            }
        });
        return cat
    },
    _createErrorBarGroup: function(animationEnabled) {
        var that = this;
        var errorBarOptions = that._options.valueErrorBar;
        var settings;
        if (that.areErrorBarsVisible()) {
            settings = {
                "class": "dxc-error-bars",
                stroke: errorBarOptions.color,
                "stroke-width": errorBarOptions.lineWidth,
                opacity: animationEnabled ? .001 : errorBarOptions.opacity || 1,
                "stroke-linecap": "square",
                sharp: true,
                "clip-path": that._forceClipping ? that._paneClipRectID : that._widePaneClipRectID
            };
            that._createGroup("_errorBarGroup", that, that._group, settings)
        }
    },
    _setGroupsSettings: function(animationEnabled) {
        var that = this;
        that._setMarkerGroupSettings();
        that._setLabelGroupSettings(animationEnabled);
        that._createErrorBarGroup(animationEnabled)
    },
    _getCreatingPointOptions: function() {
        var that = this;
        var defaultPointOptions;
        var creatingPointOptions = that._predefinedPointOptions;
        var normalStyle;
        if (!creatingPointOptions) {
            defaultPointOptions = that._getPointOptions();
            that._predefinedPointOptions = creatingPointOptions = (0, _extend3.extend)(true, {
                styles: {}
            }, defaultPointOptions);
            normalStyle = defaultPointOptions.styles && defaultPointOptions.styles.normal || {};
            creatingPointOptions.styles = creatingPointOptions.styles || {};
            creatingPointOptions.styles.normal = {
                "stroke-width": normalStyle["stroke-width"],
                r: normalStyle.r,
                opacity: normalStyle.opacity
            }
        }
        return creatingPointOptions
    },
    _getPointOptions: function() {
        return this._parsePointOptions(this._preparePointOptions(), this._options.label)
    },
    _getOptionsForPoint: function() {
        return this._options.point
    },
    _parsePointStyle: function(style, defaultColor, defaultBorderColor, defaultSize) {
        var border = style.border || {};
        var sizeValue = void 0 !== style.size ? style.size : defaultSize;
        return {
            fill: style.color || defaultColor,
            stroke: border.color || defaultBorderColor,
            "stroke-width": border.visible ? border.width : 0,
            r: sizeValue / 2 + (border.visible && 0 !== sizeValue ? ~~(border.width / 2) || 0 : 0)
        }
    },
    _createPointStyles: function(pointOptions) {
        var that = this;
        var mainPointColor = pointOptions.color || that._options.mainSeriesColor;
        var containerColor = that._options.containerBackgroundColor;
        var normalStyle = that._parsePointStyle(pointOptions, mainPointColor, mainPointColor);
        normalStyle.visibility = pointOptions.visible ? "visible" : "hidden";
        return {
            normal: normalStyle,
            hover: that._parsePointStyle(pointOptions.hoverStyle, containerColor, mainPointColor, pointOptions.size),
            selection: that._parsePointStyle(pointOptions.selectionStyle, containerColor, mainPointColor, pointOptions.size)
        }
    },
    _checkData: function(data, skippedFields, fieldsToCheck) {
        fieldsToCheck = fieldsToCheck || {
            value: this.getValueFields()[0]
        };
        fieldsToCheck.argument = this.getArgumentField();
        return checkFields(data, fieldsToCheck, skippedFields || {}) && data.value === data.value
    },
    getValueRangeInitialValue: function() {
        return
    },
    _getRangeData: function() {
        return _range_data_calculator.default.getRangeData(this)
    },
    _getPointDataSelector: function() {
        var _this = this;
        var valueField = this.getValueFields()[0];
        var argumentField = this.getArgumentField();
        var tagField = this.getTagField();
        var areErrorBarsVisible = this.areErrorBarsVisible();
        var lowValueField;
        var highValueField;
        if (areErrorBarsVisible) {
            var errorBarOptions = this._options.valueErrorBar;
            lowValueField = errorBarOptions.lowValueField || LOW_ERROR;
            highValueField = errorBarOptions.highValueField || HIGH_ERROR
        }
        return function(data) {
            var pointData = {
                value: _this._processEmptyValue(data[valueField]),
                argument: data[argumentField],
                tag: data[tagField],
                data: data
            };
            if (areErrorBarsVisible) {
                pointData.lowError = data[lowValueField];
                pointData.highError = data[highValueField]
            }
            return pointData
        }
    },
    _errorBarsEnabled: function() {
        return this.valueAxisType !== DISCRETE && this.valueAxisType !== LOGARITHMIC && this.valueType !== DATETIME
    },
    _drawPoint: function(options) {
        var point = options.point;
        if (point.isInVisibleArea()) {
            point.clearVisibility();
            point.draw(this._renderer, options.groups, options.hasAnimation, options.firstDrawing);
            this._drawnPoints.push(point)
        } else {
            point.setInvisibility()
        }
    },
    _animateComplete: function() {
        var that = this;
        var animationSettings = {
            duration: that._defaultDuration
        };
        that._labelsGroup && that._labelsGroup.animate({
            opacity: 1
        }, animationSettings);
        that._errorBarGroup && that._errorBarGroup.animate({
            opacity: that._options.valueErrorBar.opacity || 1
        }, animationSettings)
    },
    _animate: function() {
        var that = this;
        var lastPointIndex = that._drawnPoints.length - 1;
        (0, _iterator.each)(that._drawnPoints || [], function(i, p) {
            p.animate(i === lastPointIndex ? function() {
                that._animateComplete()
            } : void 0, {
                translateX: p.x,
                translateY: p.y
            })
        })
    },
    _defaultAggregator: "avg",
    _aggregators: {
        avg: function(_ref2, series) {
            var _calculateAvgErrorBar;
            var data = _ref2.data,
                intervalStart = _ref2.intervalStart;
            if (!data.length) {
                return
            }
            var valueField = series.getValueFields()[0];
            var aggregationResult = data.reduce(function(result, item) {
                var value = item[valueField];
                if ((0, _type.isDefined)(value)) {
                    result[0] += value;
                    result[1]++
                } else {
                    if (null === value) {
                        result[2]++
                    }
                }
                return result
            }, [0, 0, 0]);
            return calculateAvgErrorBars((_calculateAvgErrorBar = {}, _defineProperty(_calculateAvgErrorBar, valueField, aggregationResult[2] === data.length ? null : aggregationResult[0] / aggregationResult[1]), _defineProperty(_calculateAvgErrorBar, series.getArgumentField(), intervalStart), _calculateAvgErrorBar), data, series)
        },
        sum: function(_ref3, series) {
            var _calculateSumErrorBar;
            var intervalStart = _ref3.intervalStart,
                data = _ref3.data;
            if (!data.length) {
                return
            }
            var valueField = series.getValueFields()[0];
            var aggregationResult = data.reduce(function(result, item) {
                var value = item[valueField];
                if (void 0 !== value) {
                    result[0] += value
                }
                if (null === value) {
                    result[1]++
                } else {
                    if (void 0 === value) {
                        result[2]++
                    }
                }
                return result
            }, [0, 0, 0]);
            var value = aggregationResult[0];
            if (aggregationResult[1] === data.length) {
                value = null
            }
            if (aggregationResult[2] === data.length) {
                return
            }
            return calculateSumErrorBars((_calculateSumErrorBar = {}, _defineProperty(_calculateSumErrorBar, valueField, value), _defineProperty(_calculateSumErrorBar, series.getArgumentField(), intervalStart), _calculateSumErrorBar), data, series)
        },
        count: function(_ref4, series) {
            var _ref5;
            var data = _ref4.data,
                intervalStart = _ref4.intervalStart;
            var valueField = series.getValueFields()[0];
            return _ref5 = {}, _defineProperty(_ref5, series.getArgumentField(), intervalStart), _defineProperty(_ref5, valueField, data.filter(function(i) {
                return void 0 !== i[valueField]
            }).length), _ref5
        },
        min: getMinMaxAggregator(function(a, b) {
            return a < b
        }),
        max: getMinMaxAggregator(function(a, b) {
            return a > b
        })
    },
    _endUpdateData: function() {
        delete this._predefinedPointOptions
    },
    getArgumentField: function() {
        return this._options.argumentField || "arg"
    },
    getValueFields: function() {
        var options = this._options;
        var errorBarsOptions = options.valueErrorBar;
        var valueFields = [options.valueField || "val"];
        var lowValueField;
        var highValueField;
        if (errorBarsOptions) {
            lowValueField = errorBarsOptions.lowValueField;
            highValueField = errorBarsOptions.highValueField;
            (0, _type.isString)(lowValueField) && valueFields.push(lowValueField);
            (0, _type.isString)(highValueField) && valueFields.push(highValueField)
        }
        return valueFields
    },
    _calculateErrorBars: function(data) {
        if (!this.areErrorBarsVisible()) {
            return
        }
        var that = this;
        var options = that._options;
        var errorBarsOptions = options.valueErrorBar;
        var errorBarType = (0, _utils.normalizeEnum)(errorBarsOptions.type);
        var floatErrorValue = parseFloat(errorBarsOptions.value);
        var valueField = that.getValueFields()[0];
        var value;
        var lowValueField = errorBarsOptions.lowValueField || LOW_ERROR;
        var highValueField = errorBarsOptions.highValueField || HIGH_ERROR;
        var valueArray;
        var valueArrayLength;
        var meanValue;
        var processDataItem;
        var addSubError = function(_i, item) {
            value = item.value;
            item.lowError = value - floatErrorValue;
            item.highError = value + floatErrorValue
        };
        switch (errorBarType) {
            case FIXED:
                processDataItem = addSubError;
                break;
            case PERCENT:
                processDataItem = function(_, item) {
                    value = item.value;
                    var error = value * floatErrorValue / 100;
                    item.lowError = value - error;
                    item.highError = value + error
                };
                break;
            case UNDEFINED:
                processDataItem = function(_, item) {
                    item.lowError = item.data[lowValueField];
                    item.highError = item.data[highValueField]
                };
                break;
            default:
                valueArray = (0, _utils.map)(data, function(item) {
                    return (0, _type.isDefined)(item.data[valueField]) ? item.data[valueField] : null
                });
                valueArrayLength = valueArray.length;
                floatErrorValue = floatErrorValue || 1;
                switch (errorBarType) {
                    case VARIANCE:
                        floatErrorValue = variance(valueArray, sum(valueArray) / valueArrayLength) * floatErrorValue;
                        processDataItem = addSubError;
                        break;
                    case STANDARD_DEVIATION:
                        meanValue = sum(valueArray) / valueArrayLength;
                        floatErrorValue = _sqrt(variance(valueArray, meanValue)) * floatErrorValue;
                        processDataItem = function(_, item) {
                            item.lowError = meanValue - floatErrorValue;
                            item.highError = meanValue + floatErrorValue
                        };
                        break;
                    case STANDARD_ERROR:
                        floatErrorValue = _sqrt(variance(valueArray, sum(valueArray) / valueArrayLength) / valueArrayLength) * floatErrorValue;
                        processDataItem = addSubError
                }
        }
        processDataItem && (0, _iterator.each)(data, processDataItem)
    },
    _patchMarginOptions: function(options) {
        var pointOptions = this._getCreatingPointOptions();
        var styles = pointOptions.styles;
        var maxSize = [styles.normal, styles.hover, styles.selection].reduce(function(max, style) {
            return _max(max, 2 * style.r + style["stroke-width"])
        }, 0);
        options.size = pointOptions.visible ? maxSize : 0;
        options.sizePointNormalState = pointOptions.visible ? 2 * styles.normal.r + styles.normal["stroke-width"] : 2;
        return options
    },
    usePointsToDefineAutoHiding: function() {
        return true
    }
};
exports.chart = chart = (0, _extend3.extend)({}, baseScatterMethods, {
    drawTrackers: function() {
        var that = this;
        var trackers;
        var trackersGroup;
        var segments = that._segments || [];
        var rotated = that._options.rotated;
        if (!that.isVisible()) {
            return
        }
        if (segments.length) {
            trackers = that._trackers = that._trackers || [];
            trackersGroup = that._trackersGroup = (that._trackersGroup || that._renderer.g().attr({
                fill: "gray",
                opacity: .001,
                stroke: "gray",
                "class": "dxc-trackers"
            })).attr({
                "clip-path": this._paneClipRectID || null
            }).append(that._group);
            (0, _iterator.each)(segments, function(i, segment) {
                if (!trackers[i]) {
                    trackers[i] = that._drawTrackerElement(segment).data({
                        "chart-data-series": that
                    }).append(trackersGroup)
                } else {
                    that._updateTrackerElement(segment, trackers[i])
                }
            })
        }
        that._trackersTranslator = that.groupPointsByCoords(rotated)
    },
    _checkAxisVisibleAreaCoord: function(isArgument, coord) {
        var axis = isArgument ? this.getArgumentAxis() : this.getValueAxis();
        var visibleArea = axis.getVisibleArea();
        return (0, _type.isDefined)(coord) && visibleArea[0] <= coord && visibleArea[1] >= coord
    },
    checkSeriesViewportCoord: function(axis, coord) {
        return this.getPoints().length && this.isVisible()
    },
    getSeriesPairCoord: function(coord, isArgument) {
        var oppositeCoord = null;
        var isOpposite = !isArgument && !this._options.rotated || isArgument && this._options.rotated;
        var coordName = !isOpposite ? "vx" : "vy";
        var oppositeCoordName = !isOpposite ? "vy" : "vx";
        var points = this.getVisiblePoints();
        for (var i = 0; i < points.length; i++) {
            var p = points[i];
            var tmpCoord = p[coordName] === coord ? p[oppositeCoordName] : void 0;
            if (this._checkAxisVisibleAreaCoord(!isArgument, tmpCoord)) {
                oppositeCoord = tmpCoord;
                break
            }
        }
        return oppositeCoord
    },
    _getNearestPoints: function(point, nextPoint) {
        return [point, nextPoint]
    },
    _getBezierPoints: function() {
        return []
    },
    _getNearestPointsByCoord: function(coord, isArgument) {
        var that = this;
        var rotated = that.getOptions().rotated;
        var isOpposite = !isArgument && !rotated || isArgument && rotated;
        var coordName = isOpposite ? "vy" : "vx";
        var allPoints = that.getPoints();
        var bezierPoints = that._getBezierPoints();
        var nearestPoints = [];
        if (allPoints.length > 1) {
            allPoints.forEach(function(point, i) {
                var nextPoint = allPoints[i + 1];
                if (nextPoint && (point[coordName] <= coord && nextPoint[coordName] >= coord || point[coordName] >= coord && nextPoint[coordName] <= coord)) {
                    nearestPoints.push(that._getNearestPoints(point, nextPoint, bezierPoints))
                }
            })
        } else {
            nearestPoints.push([allPoints[0], allPoints[0]])
        }
        return nearestPoints
    },
    getNeighborPoint: function(x, y) {
        var pCoord = this._options.rotated ? y : x;
        var nCoord = pCoord;
        var cat = this._trackersTranslator;
        var point = null;
        var minDistance;
        var oppositeCoord = this._options.rotated ? x : y;
        var oppositeCoordName = this._options.rotated ? "vx" : "vy";
        if (this.isVisible() && cat) {
            point = cat[pCoord];
            do {
                point = cat[nCoord] || cat[pCoord];
                pCoord--;
                nCoord++
            } while ((pCoord >= 0 || nCoord < cat.length) && !point);
            if (Array.isArray(point)) {
                minDistance = _abs(point[0][oppositeCoordName] - oppositeCoord);
                (0, _iterator.each)(point, function(i, p) {
                    var distance = _abs(p[oppositeCoordName] - oppositeCoord);
                    if (minDistance >= distance) {
                        minDistance = distance;
                        point = p
                    }
                })
            }
        }
        return point
    },
    _applyVisibleArea: function() {
        var that = this;
        var rotated = that._options.rotated;
        var visibleX = (rotated ? that.getValueAxis() : that.getArgumentAxis()).getVisibleArea();
        var visibleY = (rotated ? that.getArgumentAxis() : that.getValueAxis()).getVisibleArea();
        that._visibleArea = {
            minX: visibleX[0],
            maxX: visibleX[1],
            minY: visibleY[0],
            maxY: visibleY[1]
        }
    },
    getPointCenterByArg: function(arg) {
        var point = this.getPointsByArg(arg)[0];
        return point ? point.getCenterCoord() : void 0
    }
});
exports.polar = polar = (0, _extend3.extend)({}, baseScatterMethods, {
    drawTrackers: function() {
        chart.drawTrackers.call(this);
        var cat = this._trackersTranslator;
        var index;
        if (!this.isVisible()) {
            return
        }(0, _iterator.each)(cat, function(i, category) {
            if (category) {
                index = i;
                return false
            }
        });
        cat[index + 360] = cat[index]
    },
    getNeighborPoint: function(x, y) {
        var pos = (0, _utils.convertXYToPolar)(this.getValueAxis().getCenter(), x, y);
        return chart.getNeighborPoint.call(this, pos.phi, pos.r)
    },
    _applyVisibleArea: function() {
        var that = this;
        var canvas = that.getValueAxis().getCanvas();
        that._visibleArea = {
            minX: canvas.left,
            maxX: canvas.width - canvas.right,
            minY: canvas.top,
            maxY: canvas.height - canvas.bottom
        }
    },
    getSeriesPairCoord: function(params, isArgument) {
        var coords = null;
        var paramName = isArgument ? "argument" : "radius";
        var points = this.getVisiblePoints();
        for (var i = 0; i < points.length; i++) {
            var p = points[i];
            var tmpPoint = (0, _type.isDefined)(p[paramName]) && (0, _type.isDefined)(params[paramName]) && p[paramName].valueOf() === params[paramName].valueOf() ? {
                x: p.x,
                y: p.y
            } : void 0;
            if ((0, _type.isDefined)(tmpPoint)) {
                coords = tmpPoint;
                break
            }
        }
        return coords
    }
});
