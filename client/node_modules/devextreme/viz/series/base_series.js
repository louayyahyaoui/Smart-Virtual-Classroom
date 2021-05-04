/**
 * DevExtreme (viz/series/base_series.js)
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
exports.Series = Series;
exports.mixins = void 0;
var _type = require("../../core/utils/type");
var _extend2 = require("../../core/utils/extend");
var _iterator = require("../../core/utils/iterator");
var _base_point = require("./points/base_point");
var _utils = require("../core/utils");
var _common = require("../../core/utils/common");
var _consts = _interopRequireDefault(require("../components/consts"));
var _range_data_calculator = _interopRequireDefault(require("./helpers/range_data_calculator"));
var scatterSeries = _interopRequireWildcard(require("./scatter_series"));
var lineSeries = _interopRequireWildcard(require("./line_series"));
var areaSeries = _interopRequireWildcard(require("./area_series"));
var barSeries = _interopRequireWildcard(require("./bar_series"));
var _range_series = require("./range_series");
var _bubble_series = require("./bubble_series");
var pieSeries = _interopRequireWildcard(require("./pie_series"));
var financialSeries = _interopRequireWildcard(require("./financial_series"));
var stackedSeries = _interopRequireWildcard(require("./stacked_series"));

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

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        "default": obj
    }
}
var seriesNS = {};
var states = _consts.default.states;
var DISCRETE = "discrete";
var SELECTED_STATE = states.selectedMark;
var HOVER_STATE = states.hoverMark;
var HOVER = states.hover;
var NORMAL = states.normal;
var SELECTION = states.selection;
var APPLY_SELECTED = states.applySelected;
var APPLY_HOVER = states.applyHover;
var RESET_ITEM = states.resetItem;
var NONE_MODE = "none";
var INCLUDE_POINTS = "includepoints";
var NEAREST_POINT = "nearestpoint";
var SERIES_SELECTION_CHANGED = "seriesSelectionChanged";
var POINT_SELECTION_CHANGED = "pointSelectionChanged";
var SERIES_HOVER_CHANGED = "seriesHoverChanged";
var POINT_HOVER_CHANGED = "pointHoverChanged";
var ALL_SERIES_POINTS = "allseriespoints";
var ALL_ARGUMENT_POINTS = "allargumentpoints";
var POINT_HOVER = "pointHover";
var CLEAR_POINT_HOVER = "clearPointHover";
var SERIES_SELECT = "seriesSelect";
var POINT_SELECT = "pointSelect";
var POINT_DESELECT = "pointDeselect";
var getEmptyBusinessRange = function() {
    return {
        arg: {},
        val: {}
    }
};

function triggerEvent(element, event, point) {
    element && element.trigger(event, point)
}
seriesNS.mixins = {
    chart: {},
    pie: {},
    polar: {}
};
seriesNS.mixins.chart.scatter = scatterSeries.chart;
seriesNS.mixins.polar.scatter = scatterSeries.polar;
(0, _extend2.extend)(seriesNS.mixins.pie, pieSeries);
(0, _extend2.extend)(seriesNS.mixins.chart, lineSeries.chart, areaSeries.chart, barSeries.chart, _range_series.chart, _bubble_series.chart, financialSeries, stackedSeries.chart);
(0, _extend2.extend)(seriesNS.mixins.polar, lineSeries.polar, areaSeries.polar, barSeries.polar, stackedSeries.polar);

function includePointsMode(mode) {
    mode = (0, _utils.normalizeEnum)(mode);
    return mode === INCLUDE_POINTS || mode === ALL_SERIES_POINTS
}

function getLabelOptions(labelOptions, defaultColor) {
    var opt = labelOptions || {};
    var labelFont = (0, _extend2.extend)({}, opt.font) || {};
    var labelBorder = opt.border || {};
    var labelConnector = opt.connector || {};
    var backgroundAttr = {
        fill: opt.backgroundColor || defaultColor,
        "stroke-width": labelBorder.visible ? labelBorder.width || 0 : 0,
        stroke: labelBorder.visible && labelBorder.width ? labelBorder.color : "none",
        dashStyle: labelBorder.dashStyle
    };
    var connectorAttr = {
        stroke: labelConnector.visible && labelConnector.width ? labelConnector.color || defaultColor : "none",
        "stroke-width": labelConnector.visible ? labelConnector.width || 0 : 0
    };
    labelFont.color = "none" === opt.backgroundColor && "#ffffff" === (0, _utils.normalizeEnum)(labelFont.color) && "inside" !== opt.position ? defaultColor : labelFont.color;
    return {
        alignment: opt.alignment,
        format: opt.format,
        argumentFormat: opt.argumentFormat,
        customizeText: (0, _type.isFunction)(opt.customizeText) ? opt.customizeText : void 0,
        attributes: {
            font: labelFont
        },
        visible: 0 !== labelFont.size ? opt.visible : false,
        showForZeroValues: opt.showForZeroValues,
        horizontalOffset: opt.horizontalOffset,
        verticalOffset: opt.verticalOffset,
        radialOffset: opt.radialOffset,
        background: backgroundAttr,
        position: opt.position,
        connector: connectorAttr,
        rotationAngle: opt.rotationAngle,
        wordWrap: opt.wordWrap,
        textOverflow: opt.textOverflow,
        cssClass: opt.cssClass
    }
}

function setPointHoverState(point, legendCallback) {
    point.fullState |= HOVER_STATE;
    point.applyView(legendCallback)
}

function releasePointHoverState(point, legendCallback) {
    point.fullState &= ~HOVER_STATE;
    point.applyView(legendCallback);
    point.releaseHoverState()
}

function setPointSelectedState(point, legendCallback) {
    point.fullState |= SELECTED_STATE;
    point.applyView(legendCallback)
}

function releasePointSelectedState(point, legendCallback) {
    point.fullState &= ~SELECTED_STATE;
    point.applyView(legendCallback)
}

function mergePointOptionsCore(base, extra) {
    var options = (0, _extend2.extend)({}, base, extra);
    options.border = (0, _extend2.extend)({}, base && base.border, extra && extra.border);
    return options
}

function mergePointOptions(base, extra) {
    var options = mergePointOptionsCore(base, extra);
    options.image = (0, _extend2.extend)(true, {}, base.image, extra.image);
    options.selectionStyle = mergePointOptionsCore(base.selectionStyle, extra.selectionStyle);
    options.hoverStyle = mergePointOptionsCore(base.hoverStyle, extra.hoverStyle);
    return options
}

function Series(settings, options) {
    var that = this;
    that.fullState = 0;
    that._extGroups = settings;
    that._renderer = settings.renderer;
    that._group = settings.renderer.g().attr({
        "class": "dxc-series"
    });
    that._eventTrigger = settings.eventTrigger;
    that._eventPipe = settings.eventPipe;
    that._incidentOccurred = settings.incidentOccurred;
    that._legendCallback = _common.noop;
    that.updateOptions(options, settings)
}

function getData(pointData) {
    return pointData.data
}

function getValueChecker(axisType, axis) {
    if (!axis || "logarithmic" !== axisType || false !== axis.getOptions().allowNegatives) {
        return function() {
            return true
        }
    } else {
        return function(value) {
            return value > 0
        }
    }
}
Series.prototype = {
    constructor: Series,
    _createLegendState: _common.noop,
    getLegendStyles: function() {
        return this._styles.legendStyles
    },
    _createStyles: function(options) {
        var that = this;
        var mainSeriesColor = options.mainSeriesColor;
        that._styles = {
            normal: that._parseStyle(options, mainSeriesColor, mainSeriesColor),
            hover: that._parseStyle(options.hoverStyle || {}, mainSeriesColor, mainSeriesColor),
            selection: that._parseStyle(options.selectionStyle || {}, mainSeriesColor, mainSeriesColor),
            legendStyles: {
                normal: that._createLegendState(options, mainSeriesColor),
                hover: that._createLegendState(options.hoverStyle || {}, mainSeriesColor),
                selection: that._createLegendState(options.selectionStyle || {}, mainSeriesColor)
            }
        }
    },
    setClippingParams: function(baseId, wideId, forceClipping) {
        var clipLabels = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : true;
        this._paneClipRectID = baseId;
        this._widePaneClipRectID = wideId;
        this._forceClipping = forceClipping;
        this._clipLabels = clipLabels
    },
    applyClip: function() {
        this._group.attr({
            "clip-path": this._paneClipRectID
        })
    },
    resetClip: function() {
        this._group.attr({
            "clip-path": null
        })
    },
    getTagField: function() {
        return this._options.tagField || "tag"
    },
    getValueFields: _common.noop,
    getSizeField: _common.noop,
    getArgumentField: _common.noop,
    getPoints: function() {
        return this._points
    },
    getPointsInViewPort: function() {
        return _range_data_calculator.default.getPointsInViewPort(this)
    },
    _createPoint: function(data, index, oldPoint) {
        data.index = index;
        var that = this;
        var pointsByArgument = that.pointsByArgument;
        var options = that._getCreatingPointOptions(data);
        var arg = data.argument.valueOf();
        var point = oldPoint;
        if (point) {
            point.update(data, options)
        } else {
            point = new _base_point.Point(that, data, options);
            if (that.isSelected() && includePointsMode(that.lastSelectionMode)) {
                point.setView(SELECTION)
            }
        }
        var pointByArgument = pointsByArgument[arg];
        if (pointByArgument) {
            pointByArgument.push(point)
        } else {
            pointsByArgument[arg] = [point]
        }
        if (point.hasValue()) {
            that.customizePoint(point, data)
        }
        return point
    },
    getRangeData: function() {
        return this._visible ? this._getRangeData() : getEmptyBusinessRange()
    },
    getArgumentRange: function() {
        return this._visible ? _range_data_calculator.default.getArgumentRange(this) : getEmptyBusinessRange()
    },
    getViewport: function() {
        return _range_data_calculator.default.getViewport(this)
    },
    _deleteGroup: function(groupName) {
        var group = this[groupName];
        if (group) {
            group.dispose();
            this[groupName] = null
        }
    },
    updateOptions: function(newOptions, settings) {
        var that = this;
        var widgetType = newOptions.widgetType;
        var oldType = that.type;
        var newType = newOptions.type;
        that.type = newType && (0, _utils.normalizeEnum)(newType.toString());
        if (!that._checkType(widgetType) || that._checkPolarBarType(widgetType, newOptions)) {
            that.dispose();
            that.isUpdated = false;
            return
        }
        if (oldType !== that.type) {
            that._firstDrawing = true;
            that._resetType(oldType, widgetType);
            that._setType(that.type, widgetType)
        } else {
            that._defineDrawingState()
        }
        that._options = newOptions;
        that._pointOptions = null;
        that.name = newOptions.name;
        that.pane = newOptions.pane;
        that.tag = newOptions.tag;
        if (settings) {
            that._seriesModes = settings.commonSeriesModes || that._seriesModes;
            that._valueAxis = settings.valueAxis || that._valueAxis;
            that.axis = that._valueAxis && that._valueAxis.name;
            that._argumentAxis = settings.argumentAxis || that._argumentAxis
        }
        that._createStyles(newOptions);
        that._stackName = null;
        that._updateOptions(newOptions);
        that._visible = newOptions.visible;
        that.isUpdated = true;
        that.stack = newOptions.stack;
        that.barOverlapGroup = newOptions.barOverlapGroup;
        that._createGroups();
        that._processEmptyValue = newOptions.ignoreEmptyPoints ? function(x) {
            return null === x ? void 0 : x
        } : function(x) {
            return x
        }
    },
    _defineDrawingState: function() {
        this._firstDrawing = true
    },
    _disposePoints: function(points) {
        (0, _iterator.each)(points || [], function(_, p) {
            p.dispose()
        })
    },
    updateDataType: function(settings) {
        var that = this;
        that.argumentType = settings.argumentType;
        that.valueType = settings.valueType;
        that.argumentAxisType = settings.argumentAxisType;
        that.valueAxisType = settings.valueAxisType;
        that.showZero = settings.showZero;
        this._argumentChecker = getValueChecker(settings.argumentAxisType, that.getArgumentAxis());
        this._valueChecker = getValueChecker(settings.valueAxisType, that.getValueAxis());
        return that
    },
    _argumentChecker: function() {
        return true
    },
    _valueChecker: function() {
        return true
    },
    getOptions: function() {
        return this._options
    },
    _getOldPoint: function(data, oldPointsByArgument, index) {
        var arg = data.argument && data.argument.valueOf();
        var point = (oldPointsByArgument[arg] || [])[0];
        if (point) {
            oldPointsByArgument[arg].splice(0, 1)
        }
        return point
    },
    updateData: function(data) {
        var that = this;
        var options = that._options;
        var nameField = options.nameField;
        data = data || [];
        if (data.length) {
            that._canRenderCompleteHandle = true
        }
        var dataSelector = this._getPointDataSelector();
        var itemsWithoutArgument = 0;
        that._data = data.reduce(function(data, dataItem, index) {
            var pointDataItem = dataSelector(dataItem);
            if ((0, _type.isDefined)(pointDataItem.argument)) {
                if (!nameField || dataItem[nameField] === options.nameFieldValue) {
                    pointDataItem.index = index;
                    data.push(pointDataItem)
                }
            } else {
                itemsWithoutArgument++
            }
            return data
        }, []);
        if (itemsWithoutArgument && itemsWithoutArgument === data.length) {
            that._incidentOccurred("W2002", [that.name, that.getArgumentField()])
        }
        that._endUpdateData()
    },
    _getData: function() {
        var data = this._data || [];
        if (this.useAggregation()) {
            data = this._resample(this.getArgumentAxis().getAggregationInfo(this._useAllAggregatedPoints, this.argumentAxisType !== DISCRETE ? this.getArgumentRange() : {}), data)
        }
        return data
    },
    useAggregation: function() {
        var aggregation = this.getOptions().aggregation;
        return aggregation && aggregation.enabled
    },
    autoHidePointMarkersEnabled: _common.noop,
    usePointsToDefineAutoHiding: _common.noop,
    createPoints: function(useAllAggregatedPoints) {
        this._normalizeUsingAllAggregatedPoints(useAllAggregatedPoints);
        this._createPoints()
    },
    _normalizeUsingAllAggregatedPoints: function(useAllAggregatedPoints) {
        this._useAllAggregatedPoints = this.useAggregation() && (this.argumentAxisType === DISCRETE || (this._data || []).length > 1 && !!useAllAggregatedPoints)
    },
    _createPoints: function() {
        var that = this;
        var oldPointsByArgument = that.pointsByArgument || {};
        var data = that._getData();
        that.pointsByArgument = {};
        that._calculateErrorBars(data);
        var skippedFields = {};
        var points = data.reduce(function(points, pointDataItem) {
            if (that._checkData(pointDataItem, skippedFields)) {
                var pointIndex = points.length;
                var oldPoint = that._getOldPoint(pointDataItem, oldPointsByArgument, pointIndex);
                var point = that._createPoint(pointDataItem, pointIndex, oldPoint);
                points.push(point)
            }
            return points
        }, []);
        for (var field in skippedFields) {
            if (skippedFields[field] === data.length) {
                that._incidentOccurred("W2002", [that.name, field])
            }
        }
        Object.keys(oldPointsByArgument).forEach(function(key) {
            return that._disposePoints(oldPointsByArgument[key])
        });
        that._points = points
    },
    _removeOldSegments: function() {
        var that = this;
        var startIndex = that._segments.length;
        (0, _iterator.each)(that._graphics.splice(startIndex, that._graphics.length) || [], function(_, elem) {
            that._removeElement(elem)
        });
        if (that._trackers) {
            (0, _iterator.each)(that._trackers.splice(startIndex, that._trackers.length) || [], function(_, elem) {
                elem.remove()
            })
        }
    },
    _drawElements: function(animationEnabled, firstDrawing, translateAllPoints) {
        var that = this;
        var points = that._points || [];
        var closeSegment = points[0] && points[0].hasValue() && that._options.closed;
        var groupForPoint = {
            markers: that._markersGroup,
            errorBars: that._errorBarGroup
        };
        that._drawnPoints = [];
        that._graphics = that._graphics || [];
        that._segments = [];
        var segments = points.reduce(function(segments, p) {
            var segment = segments[segments.length - 1];
            if (!p.translated || translateAllPoints) {
                p.translate();
                !translateAllPoints && p.setDefaultCoords()
            }
            if (p.hasValue() && p.hasCoords()) {
                translateAllPoints && that._drawPoint({
                    point: p,
                    groups: groupForPoint,
                    hasAnimation: animationEnabled,
                    firstDrawing: firstDrawing
                });
                segment.push(p)
            } else {
                if (!p.hasValue()) {
                    segment.length && segments.push([])
                } else {
                    p.setInvisibility()
                }
            }
            return segments
        }, [
            []
        ]);
        segments.forEach(function(segment, index) {
            if (segment.length) {
                that._drawSegment(segment, animationEnabled, index, closeSegment && index === this.length - 1)
            }
        }, segments);
        that._firstDrawing = !points.length;
        that._removeOldSegments();
        animationEnabled && that._animate(firstDrawing)
    },
    draw: function(animationEnabled, hideLayoutLabels, legendCallback) {
        var that = this;
        var firstDrawing = that._firstDrawing;
        that._legendCallback = legendCallback || that._legendCallback;
        if (!that._visible) {
            animationEnabled = false;
            that._group.remove();
            return
        }
        that._appendInGroup();
        that._applyVisibleArea();
        that._setGroupsSettings(animationEnabled, firstDrawing);
        !firstDrawing && !that._resetApplyingAnimation && that._drawElements(false, firstDrawing, false);
        that._drawElements(animationEnabled, firstDrawing, true);
        hideLayoutLabels && that.hideLabels();
        if (that.isSelected()) {
            that._changeStyle(that.lastSelectionMode, void 0, true)
        } else {
            if (that.isHovered()) {
                that._changeStyle(that.lastHoverMode, void 0, true)
            } else {
                that._applyStyle(that._styles.normal)
            }
        }
        that._resetApplyingAnimation = false
    },
    _setLabelGroupSettings: function(animationEnabled) {
        var settings = {
            "class": "dxc-labels",
            "pointer-events": "none"
        };
        this._clipLabels && this._applyElementsClipRect(settings);
        this._applyClearingSettings(settings);
        animationEnabled && (settings.opacity = .001);
        this._labelsGroup.attr(settings).append(this._extGroups.labelsGroup)
    },
    _checkType: function(widgetType) {
        return !!seriesNS.mixins[widgetType][this.type]
    },
    _checkPolarBarType: function(widgetType, options) {
        return "polar" === widgetType && options.spiderWidget && this.type.indexOf("bar") !== -1
    },
    _resetType: function(seriesType, widgetType) {
        var methodName;
        var methods;
        if (seriesType) {
            methods = seriesNS.mixins[widgetType][seriesType];
            for (methodName in methods) {
                delete this[methodName]
            }
        }
    },
    _setType: function(seriesType, widgetType) {
        var methodName;
        var methods = seriesNS.mixins[widgetType][seriesType];
        for (methodName in methods) {
            this[methodName] = methods[methodName]
        }
    },
    _setPointsView: function(view, target) {
        this.getPoints().forEach(function(point) {
            if (target !== point) {
                point.setView(view)
            }
        })
    },
    _resetPointsView: function(view, target) {
        this.getPoints().forEach(function(point) {
            if (target !== point) {
                point.resetView(view)
            }
        })
    },
    _resetNearestPoint: function() {
        var that = this;
        that._nearestPoint && null !== that._nearestPoint.series && that._nearestPoint.resetView(HOVER);
        that._nearestPoint = null
    },
    _setSelectedState: function(mode) {
        var that = this;
        that.lastSelectionMode = (0, _utils.normalizeEnum)(mode || that._options.selectionMode);
        that.fullState = that.fullState | SELECTED_STATE;
        that._resetNearestPoint();
        that._changeStyle(that.lastSelectionMode);
        if (that.lastSelectionMode !== NONE_MODE && that.isHovered() && includePointsMode(that.lastHoverMode)) {
            that._resetPointsView(HOVER)
        }
    },
    _releaseSelectedState: function() {
        var that = this;
        that.fullState = that.fullState & ~SELECTED_STATE;
        that._changeStyle(that.lastSelectionMode, SELECTION);
        if (that.lastSelectionMode !== NONE_MODE && that.isHovered() && includePointsMode(that.lastHoverMode)) {
            that._setPointsView(HOVER)
        }
    },
    isFullStackedSeries: function() {
        return 0 === this.type.indexOf("fullstacked")
    },
    isStackedSeries: function() {
        return 0 === this.type.indexOf("stacked")
    },
    resetApplyingAnimation: function(isFirstDrawing) {
        this._resetApplyingAnimation = true;
        if (isFirstDrawing) {
            this._firstDrawing = true
        }
    },
    isFinancialSeries: function() {
        return "stock" === this.type || "candlestick" === this.type
    },
    _canChangeView: function() {
        return !this.isSelected() && (0, _utils.normalizeEnum)(this._options.hoverMode) !== NONE_MODE
    },
    _changeStyle: function(mode, resetView, skipPoints) {
        var that = this;
        var state = that.fullState;
        var styles = [NORMAL, HOVER, SELECTION, SELECTION];
        if ("none" === that.lastHoverMode) {
            state &= ~HOVER_STATE
        }
        if ("none" === that.lastSelectionMode) {
            state &= ~SELECTED_STATE
        }
        if (includePointsMode(mode) && !skipPoints) {
            if (!resetView) {
                that._setPointsView(styles[state])
            } else {
                that._resetPointsView(resetView)
            }
        }
        that._legendCallback([RESET_ITEM, APPLY_HOVER, APPLY_SELECTED, APPLY_SELECTED][state]);
        that._applyStyle(that._styles[styles[state]])
    },
    updateHover: function(x, y) {
        var that = this;
        var currentNearestPoint = that._nearestPoint;
        var point = that.isHovered() && that.lastHoverMode === NEAREST_POINT && that.getNeighborPoint(x, y);
        if (point !== currentNearestPoint && !(that.isSelected() && that.lastSelectionMode !== NONE_MODE)) {
            that._resetNearestPoint();
            if (point) {
                point.setView(HOVER);
                that._nearestPoint = point
            }
        }
    },
    _getMainAxisName: function() {
        return this._options.rotated ? "X" : "Y"
    },
    areLabelsVisible: function() {
        return !(0, _type.isDefined)(this._options.maxLabelCount) || this._points.length <= this._options.maxLabelCount
    },
    getLabelVisibility: function() {
        return this.areLabelsVisible() && this._options.label && this._options.label.visible
    },
    customizePoint: function customizePoint(point, pointData) {
        var that = this;
        var options = that._options;
        var customizePoint = options.customizePoint;
        var customizeObject;
        var pointOptions;
        var customLabelOptions;
        var customOptions;
        var customizeLabel = options.customizeLabel;
        var useLabelCustomOptions;
        var usePointCustomOptions;
        if (customizeLabel && customizeLabel.call) {
            customizeObject = (0, _extend2.extend)({
                seriesName: that.name
            }, pointData);
            customizeObject.series = that;
            customLabelOptions = customizeLabel.call(customizeObject, customizeObject);
            useLabelCustomOptions = customLabelOptions && !(0, _type.isEmptyObject)(customLabelOptions);
            customLabelOptions = useLabelCustomOptions ? (0, _extend2.extend)(true, {}, options.label, customLabelOptions) : null
        }
        if (customizePoint && customizePoint.call) {
            customizeObject = customizeObject || (0, _extend2.extend)({
                seriesName: that.name
            }, pointData);
            customizeObject.series = that;
            customOptions = customizePoint.call(customizeObject, customizeObject);
            usePointCustomOptions = customOptions && !(0, _type.isEmptyObject)(customOptions)
        }
        if (useLabelCustomOptions || usePointCustomOptions) {
            pointOptions = that._parsePointOptions(that._preparePointOptions(customOptions), customLabelOptions || options.label, pointData, point);
            pointOptions.styles.useLabelCustomOptions = useLabelCustomOptions;
            pointOptions.styles.usePointCustomOptions = usePointCustomOptions;
            point.updateOptions(pointOptions)
        }
    },
    show: function() {
        if (!this._visible) {
            this._changeVisibility(true)
        }
    },
    hide: function() {
        if (this._visible) {
            this._changeVisibility(false)
        }
    },
    _changeVisibility: function(visibility) {
        var that = this;
        that._visible = that._options.visible = visibility;
        that._updatePointsVisibility();
        that.hidePointTooltip();
        that._options.visibilityChanged(that)
    },
    _updatePointsVisibility: _common.noop,
    hideLabels: function() {
        (0, _iterator.each)(this._points, function(_, point) {
            point._label.draw(false)
        })
    },
    _parsePointOptions: function(pointOptions, labelOptions, data, point) {
        var that = this;
        var options = that._options;
        var styles = that._createPointStyles(pointOptions, data, point);
        var parsedOptions = (0, _extend2.extend)({}, pointOptions, {
            type: options.type,
            rotated: options.rotated,
            styles: styles,
            widgetType: options.widgetType,
            visibilityChanged: options.visibilityChanged
        });
        parsedOptions.label = getLabelOptions(labelOptions, styles.normal.fill);
        if (that.areErrorBarsVisible()) {
            parsedOptions.errorBars = options.valueErrorBar
        }
        return parsedOptions
    },
    _preparePointOptions: function(customOptions) {
        var pointOptions = this._getOptionsForPoint();
        return customOptions ? mergePointOptions(pointOptions, customOptions) : pointOptions
    },
    _getMarkerGroupOptions: function() {
        return (0, _extend2.extend)(false, {}, this._getOptionsForPoint(), {
            hoverStyle: {},
            selectionStyle: {}
        })
    },
    _getAggregationMethod: function(isDiscrete, aggregateByCategory) {
        var options = this.getOptions().aggregation;
        var method = (0, _utils.normalizeEnum)(options.method);
        var customAggregator = "custom" === method && options.calculate;
        var aggregator;
        if (isDiscrete && !aggregateByCategory) {
            aggregator = function(_ref) {
                var data = _ref.data;
                return data[0]
            }
        } else {
            aggregator = this._aggregators[method] || this._aggregators[this._defaultAggregator]
        }
        return customAggregator || aggregator
    },
    _resample: function(_ref2, data) {
        var interval = _ref2.interval,
            ticks = _ref2.ticks,
            aggregateByCategory = _ref2.aggregateByCategory;
        var that = this;
        var isDiscrete = that.argumentAxisType === DISCRETE || that.valueAxisType === DISCRETE;
        var dataIndex = 0;
        var dataSelector = this._getPointDataSelector();
        var options = that.getOptions();
        var addAggregatedData = function(target, data, aggregationInfo) {
            if (!data) {
                return
            }
            var processData = function(d) {
                var pointData = d && dataSelector(d, options);
                if (pointData && that._checkData(pointData)) {
                    pointData.aggregationInfo = aggregationInfo;
                    target.push(pointData)
                }
            };
            if (data.length) {
                data.forEach(processData)
            } else {
                processData(data)
            }
        };
        var aggregationMethod = this._getAggregationMethod(isDiscrete, aggregateByCategory);
        if (isDiscrete) {
            if (aggregateByCategory) {
                var categories = this.getArgumentAxis().getTranslator().getBusinessRange().categories;
                var groups = categories.reduce(function(g, category) {
                    g[category.valueOf()] = [];
                    return g
                }, {});
                data.forEach(function(dataItem) {
                    groups[dataItem.argument.valueOf()].push(dataItem)
                });
                return categories.reduce(function(result, c) {
                    addAggregatedData(result, aggregationMethod({
                        aggregationInterval: null,
                        intervalStart: c,
                        intervalEnd: c,
                        data: groups[c.valueOf()].map(getData)
                    }, that));
                    return result
                }, [])
            } else {
                return data.reduce(function(result, dataItem, index, data) {
                    result[1].push(dataItem);
                    if (index === data.length - 1 || (index + 1) % interval === 0) {
                        var dataInInterval = result[1];
                        var aggregationInfo = {
                            aggregationInterval: interval,
                            data: dataInInterval.map(getData)
                        };
                        addAggregatedData(result[0], aggregationMethod(aggregationInfo, that));
                        result[1] = []
                    }
                    return result
                }, [
                    [],
                    []
                ])[0]
            }
        }
        var aggregatedData = [];
        for (var i = 1; i < ticks.length; i++) {
            var intervalEnd = ticks[i];
            var intervalStart = ticks[i - 1];
            var dataInInterval = [];
            while (data[dataIndex] && data[dataIndex].argument < intervalEnd) {
                if (data[dataIndex].argument >= intervalStart) {
                    dataInInterval.push(data[dataIndex])
                }
                dataIndex++
            }
            var aggregationInfo = {
                intervalStart: intervalStart,
                intervalEnd: intervalEnd,
                aggregationInterval: interval,
                data: dataInInterval.map(getData)
            };
            addAggregatedData(aggregatedData, aggregationMethod(aggregationInfo, that), aggregationInfo)
        }
        that._endUpdateData();
        return aggregatedData
    },
    canRenderCompleteHandle: function() {
        var result = this._canRenderCompleteHandle;
        delete this._canRenderCompleteHandle;
        return !!result
    },
    isHovered: function() {
        return !!(1 & this.fullState)
    },
    isSelected: function() {
        return !!(2 & this.fullState)
    },
    isVisible: function() {
        return this._visible
    },
    getAllPoints: function() {
        this._createAllAggregatedPoints();
        return (this._points || []).slice()
    },
    getPointByPos: function(pos) {
        this._createAllAggregatedPoints();
        return (this._points || [])[pos]
    },
    getVisiblePoints: function() {
        return (this._drawnPoints || []).slice()
    },
    selectPoint: function(point) {
        if (!point.isSelected()) {
            setPointSelectedState(point, this._legendCallback);
            this._eventPipe({
                action: POINT_SELECT,
                target: point
            });
            this._eventTrigger(POINT_SELECTION_CHANGED, {
                target: point
            })
        }
    },
    deselectPoint: function(point) {
        if (point.isSelected()) {
            releasePointSelectedState(point, this._legendCallback);
            this._eventPipe({
                action: POINT_DESELECT,
                target: point
            });
            this._eventTrigger(POINT_SELECTION_CHANGED, {
                target: point
            })
        }
    },
    hover: function(mode) {
        var that = this;
        var eventTrigger = that._eventTrigger;
        if (that.isHovered()) {
            return
        }
        that.lastHoverMode = (0, _utils.normalizeEnum)(mode || that._options.hoverMode);
        that.fullState = that.fullState | HOVER_STATE;
        that._changeStyle(that.lastHoverMode, void 0, that.isSelected() && that.lastSelectionMode !== NONE_MODE);
        eventTrigger(SERIES_HOVER_CHANGED, {
            target: that
        })
    },
    clearHover: function() {
        var that = this;
        var eventTrigger = that._eventTrigger;
        if (!that.isHovered()) {
            return
        }
        that._resetNearestPoint();
        that.fullState = that.fullState & ~HOVER_STATE;
        that._changeStyle(that.lastHoverMode, HOVER, that.isSelected() && that.lastSelectionMode !== NONE_MODE);
        eventTrigger(SERIES_HOVER_CHANGED, {
            target: that
        })
    },
    hoverPoint: function(point) {
        var that = this;
        if (!point.isHovered()) {
            point.clearHover();
            setPointHoverState(point, that._legendCallback);
            that._canChangeView() && that._applyStyle(that._styles.hover);
            that._eventPipe({
                action: POINT_HOVER,
                target: point
            });
            that._eventTrigger(POINT_HOVER_CHANGED, {
                target: point
            })
        }
    },
    clearPointHover: function() {
        var that = this;
        that.getPoints().some(function(currentPoint) {
            if (currentPoint.isHovered()) {
                releasePointHoverState(currentPoint, that._legendCallback);
                that._canChangeView() && that._applyStyle(that._styles.normal);
                that._eventPipe({
                    action: CLEAR_POINT_HOVER,
                    target: currentPoint
                });
                that._eventTrigger(POINT_HOVER_CHANGED, {
                    target: currentPoint
                });
                return true
            }
            return false
        })
    },
    showPointTooltip: function(point) {
        triggerEvent(this._extGroups.seriesGroup, "showpointtooltip", point)
    },
    hidePointTooltip: function(point) {
        triggerEvent(this._extGroups.seriesGroup, "hidepointtooltip", point)
    },
    select: function() {
        var that = this;
        if (!that.isSelected()) {
            that._setSelectedState(that._options.selectionMode);
            that._eventPipe({
                action: SERIES_SELECT,
                target: that
            });
            that._group.toForeground();
            that._eventTrigger(SERIES_SELECTION_CHANGED, {
                target: that
            })
        }
    },
    clearSelection: function() {
        var that = this;
        if (that.isSelected()) {
            that._releaseSelectedState();
            that._eventTrigger(SERIES_SELECTION_CHANGED, {
                target: that
            })
        }
    },
    getPointsByArg: function(arg, skipPointsCreation) {
        var that = this;
        var argValue = arg.valueOf();
        var points = that.pointsByArgument[argValue];
        if (!points && !skipPointsCreation && that._createAllAggregatedPoints()) {
            points = that.pointsByArgument[argValue]
        }
        return points || []
    },
    _createAllAggregatedPoints: function() {
        if (this.useAggregation() && !this._useAllAggregatedPoints) {
            this.createPoints(true);
            return true
        }
        return false
    },
    getPointsByKeys: function(arg) {
        return this.getPointsByArg(arg)
    },
    notify: function(data) {
        var that = this;
        var action = data.action;
        var seriesModes = that._seriesModes;
        var target = data.target;
        var targetOptions = target.getOptions();
        var pointHoverMode = (0, _utils.normalizeEnum)(targetOptions.hoverMode);
        var selectionModeOfPoint = (0, _utils.normalizeEnum)(targetOptions.selectionMode);
        if (action === POINT_HOVER) {
            that._hoverPointHandler(target, pointHoverMode, data.notifyLegend)
        } else {
            if (action === CLEAR_POINT_HOVER) {
                that._clearPointHoverHandler(target, pointHoverMode, data.notifyLegend)
            } else {
                if (action === SERIES_SELECT) {
                    target !== that && "single" === seriesModes.seriesSelectionMode && that.clearSelection()
                } else {
                    if (action === POINT_SELECT) {
                        if ("single" === seriesModes.pointSelectionMode) {
                            that.getPoints().some(function(currentPoint) {
                                if (currentPoint !== target && currentPoint.isSelected()) {
                                    that.deselectPoint(currentPoint);
                                    return true
                                }
                                return false
                            })
                        }
                        that._selectPointHandler(target, selectionModeOfPoint)
                    } else {
                        if (action === POINT_DESELECT) {
                            that._deselectPointHandler(target, selectionModeOfPoint)
                        }
                    }
                }
            }
        }
    },
    _selectPointHandler: function(target, mode) {
        var that = this;
        if (mode === ALL_SERIES_POINTS) {
            target.series === that && that._setPointsView(SELECTION, target)
        } else {
            if (mode === ALL_ARGUMENT_POINTS) {
                that.getPointsByKeys(target.argument, target.argumentIndex).forEach(function(currentPoint) {
                    currentPoint !== target && currentPoint.setView(SELECTION)
                })
            }
        }
    },
    _deselectPointHandler: function(target, mode) {
        if (mode === ALL_SERIES_POINTS) {
            target.series === this && this._resetPointsView(SELECTION, target)
        } else {
            if (mode === ALL_ARGUMENT_POINTS) {
                this.getPointsByKeys(target.argument, target.argumentIndex).forEach(function(currentPoint) {
                    currentPoint !== target && currentPoint.resetView(SELECTION)
                })
            }
        }
    },
    _hoverPointHandler: function(target, mode, notifyLegend) {
        var that = this;
        if (target.series !== that && mode === ALL_ARGUMENT_POINTS) {
            that.getPointsByKeys(target.argument, target.argumentIndex).forEach(function(currentPoint) {
                currentPoint.setView(HOVER)
            });
            notifyLegend && that._legendCallback(target)
        } else {
            if (mode === ALL_SERIES_POINTS && target.series === that) {
                that._setPointsView(HOVER, target)
            }
        }
    },
    _clearPointHoverHandler: function(target, mode, notifyLegend) {
        var that = this;
        if (mode === ALL_ARGUMENT_POINTS) {
            target.series !== that && that.getPointsByKeys(target.argument, target.argumentIndex).forEach(function(currentPoint) {
                currentPoint.resetView(HOVER)
            });
            notifyLegend && that._legendCallback(target)
        } else {
            if (mode === ALL_SERIES_POINTS && target.series === that) {
                that._resetPointsView(HOVER, target)
            }
        }
    },
    _deletePoints: function() {
        var that = this;
        that._disposePoints(that._points);
        that._points = that._drawnPoints = null
    },
    _deleteTrackers: function() {
        var that = this;
        (0, _iterator.each)(that._trackers || [], function(_, tracker) {
            tracker.remove()
        });
        that._trackersGroup && that._trackersGroup.dispose();
        that._trackers = that._trackersGroup = null
    },
    dispose: function() {
        var that = this;
        that._deletePoints();
        that._group.dispose();
        that._labelsGroup && that._labelsGroup.dispose();
        that._errorBarGroup && that._errorBarGroup.dispose();
        that._deleteTrackers();
        that._group = that._extGroups = that._markersGroup = that._elementsGroup = that._bordersGroup = that._labelsGroup = that._errorBarGroup = that._graphics = that._rangeData = that._renderer = that._styles = that._options = that._pointOptions = that._drawnPoints = that.pointsByArgument = that._segments = that._prevSeries = null
    },
    correctPosition: _common.noop,
    drawTrackers: _common.noop,
    getNeighborPoint: _common.noop,
    areErrorBarsVisible: _common.noop,
    getMarginOptions: function() {
        return this._patchMarginOptions({
            percentStick: this.isFullStackedSeries()
        })
    },
    getColor: function() {
        return this.getLegendStyles().normal.fill
    },
    getOpacity: function() {
        return this._options.opacity
    },
    getStackName: function() {
        return this._stackName
    },
    getBarOverlapGroup: function() {
        return this._options.barOverlapGroup
    },
    getPointByCoord: function(x, y) {
        var point = this.getNeighborPoint(x, y);
        return null !== point && void 0 !== point && point.coordsIn(x, y) ? point : null
    },
    getValueAxis: function() {
        return this._valueAxis
    },
    getArgumentAxis: function() {
        return this._argumentAxis
    },
    getMarkersGroup: function() {
        return this._markersGroup
    },
    getRenderer: function() {
        return this._renderer
    }
};
var mixins = seriesNS.mixins;
exports.mixins = mixins;
