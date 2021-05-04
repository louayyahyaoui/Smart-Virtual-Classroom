/**
 * DevExtreme (viz/series/points/base_point.js)
 * Version: 20.2.6
 * Build date: Tue Mar 16 2021
 *
 * Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
exports.Point = Point;
var _consts = _interopRequireDefault(require("../../components/consts"));
var _symbol_point = _interopRequireDefault(require("./symbol_point"));
var _bar_point = _interopRequireDefault(require("./bar_point"));
var _bubble_point = _interopRequireDefault(require("./bubble_point"));
var _pie_point = _interopRequireDefault(require("./pie_point"));
var _range_symbol_point = _interopRequireDefault(require("./range_symbol_point"));
var _range_bar_point = _interopRequireDefault(require("./range_bar_point"));
var _candlestick_point = _interopRequireDefault(require("./candlestick_point"));
var _stock_point = _interopRequireDefault(require("./stock_point"));
var _polar_point = require("./polar_point");
var _utils = require("../../core/utils");
var _extend2 = require("../../../core/utils/extend");
var _type = require("../../../core/utils/type");
var _common = require("../../../core/utils/common");

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        "default": obj
    }
}
var mixins = {};
var _extend = _extend2.extend;
var statesConsts = _consts.default.states;
var SYMBOL_POINT = "symbolPoint";
var POLAR_SYMBOL_POINT = "polarSymbolPoint";
var BAR_POINT = "barPoint";
var POLAR_BAR_POINT = "polarBarPoint";
var PIE_POINT = "piePoint";
var SELECTED_STATE = statesConsts.selectedMark;
var HOVER_STATE = statesConsts.hoverMark;
var NORMAL_STATE = statesConsts.normalMark;
var HOVER = statesConsts.hover;
var NORMAL = statesConsts.normal;
var SELECTION = statesConsts.selection;
var pointTypes = {
    chart: {
        scatter: SYMBOL_POINT,
        line: SYMBOL_POINT,
        spline: SYMBOL_POINT,
        stepline: SYMBOL_POINT,
        stackedline: SYMBOL_POINT,
        fullstackedline: SYMBOL_POINT,
        stackedspline: SYMBOL_POINT,
        fullstackedspline: SYMBOL_POINT,
        stackedsplinearea: SYMBOL_POINT,
        fullstackedsplinearea: SYMBOL_POINT,
        area: SYMBOL_POINT,
        splinearea: SYMBOL_POINT,
        steparea: SYMBOL_POINT,
        stackedarea: SYMBOL_POINT,
        fullstackedarea: SYMBOL_POINT,
        rangearea: "rangeSymbolPoint",
        bar: BAR_POINT,
        stackedbar: BAR_POINT,
        fullstackedbar: BAR_POINT,
        rangebar: "rangeBarPoint",
        bubble: "bubblePoint",
        stock: "stockPoint",
        candlestick: "candlestickPoint"
    },
    pie: {
        pie: PIE_POINT,
        doughnut: PIE_POINT,
        donut: PIE_POINT
    },
    polar: {
        scatter: POLAR_SYMBOL_POINT,
        line: POLAR_SYMBOL_POINT,
        area: POLAR_SYMBOL_POINT,
        bar: POLAR_BAR_POINT,
        stackedbar: POLAR_BAR_POINT
    }
};

function isNoneMode(mode) {
    return "none" === (0, _utils.normalizeEnum)(mode)
}

function Point(series, dataItem, options) {
    this.fullState = NORMAL_STATE;
    this.series = series;
    this.update(dataItem, options);
    this._viewCounters = {
        hover: 0,
        selection: 0
    };
    this._emptySettings = {
        fill: null,
        stroke: null,
        dashStyle: null
    }
}
mixins.symbolPoint = _symbol_point.default;
mixins.barPoint = _bar_point.default;
mixins.bubblePoint = _bubble_point.default;
mixins.piePoint = _pie_point.default;
mixins.rangeSymbolPoint = _range_symbol_point.default;
mixins.rangeBarPoint = _range_bar_point.default;
mixins.candlestickPoint = _candlestick_point.default;
mixins.stockPoint = _stock_point.default;
mixins.polarSymbolPoint = _polar_point.polarSymbolPoint;
mixins.polarBarPoint = _polar_point.polarBarPoint;
Point.prototype = {
    constructor: Point,
    getColor: function() {
        if (!this.hasValue() && !this._styles.usePointCustomOptions) {
            this.series.customizePoint(this, this._dataItem)
        }
        return this._styles.normal.fill || this.series.getColor()
    },
    _getStyle: function() {
        return this._styles[this._currentStyle || "normal"]
    },
    update: function(dataItem, options) {
        this.updateOptions(options);
        this.updateData(dataItem)
    },
    updateData: function(dataItem) {
        var that = this;
        var argumentWasChanged = that.argument !== dataItem.argument;
        that.argument = that.initialArgument = that.originalArgument = dataItem.argument;
        that.tag = dataItem.tag;
        that.index = dataItem.index;
        that._dataItem = dataItem;
        that.data = dataItem.data;
        that.lowError = dataItem.lowError;
        that.highError = dataItem.highError;
        that.aggregationInfo = dataItem.aggregationInfo;
        that._updateData(dataItem, argumentWasChanged);
        !that.hasValue() && that.setInvisibility();
        that._fillStyle();
        that._updateLabelData()
    },
    deleteMarker: function() {
        var that = this;
        if (that.graphic) {
            that.graphic.dispose()
        }
        that.graphic = null
    },
    draw: function(renderer, groups, animationEnabled, firstDrawing) {
        var that = this;
        if (that._needDeletingOnDraw || that.series.autoHidePointMarkers && !that.isSelected()) {
            that.deleteMarker();
            that._needDeletingOnDraw = false
        }
        if (that._needClearingOnDraw) {
            that.clearMarker();
            that._needClearingOnDraw = false
        }
        if (!that._hasGraphic()) {
            that.getMarkerVisibility() && !that.series.autoHidePointMarkers && that._drawMarker(renderer, groups.markers, animationEnabled, firstDrawing)
        } else {
            that._updateMarker(animationEnabled, this._getStyle(), groups.markers)
        }
        that._drawLabel();
        that._drawErrorBar(renderer, groups.errorBars, animationEnabled);
        return that
    },
    _getViewStyle: function() {
        var state = NORMAL_STATE;
        var fullState = this.fullState;
        var styles = [NORMAL, HOVER, SELECTION, SELECTION];
        if (this._viewCounters.hover) {
            state |= HOVER_STATE
        }
        if (this._viewCounters.selection) {
            state |= SELECTED_STATE
        }
        if (isNoneMode(this.getOptions().selectionMode)) {
            fullState &= ~SELECTED_STATE
        }
        if (isNoneMode(this.getOptions().hoverMode)) {
            fullState &= ~HOVER_STATE
        }
        state |= fullState;
        return styles[state]
    },
    applyView: function(legendCallback) {
        var style = this._getViewStyle();
        var that = this;
        that._currentStyle = style;
        if (!that.graphic && that.series.autoHidePointMarkers && (style === SELECTION || style === HOVER)) {
            that._drawMarker(that.series.getRenderer(), that.series.getMarkersGroup())
        }
        if (that.graphic) {
            if (that.series.autoHidePointMarkers && style !== SELECTION && style !== HOVER) {
                that.deleteMarker()
            } else {
                if ("normal" === style) {
                    that.clearMarker()
                } else {
                    that.graphic.toForeground()
                }
                that._updateMarker(true, that._styles[style], void 0, legendCallback)
            }
        }
    },
    setView: function(style) {
        this._viewCounters[style]++;
        this.applyView()
    },
    resetView: function(style) {
        var viewCounters = this._viewCounters;
        --viewCounters[style];
        if (viewCounters[style] < 0) {
            viewCounters[style] = 0
        }
        this.applyView()
    },
    releaseHoverState: function() {
        var that = this;
        if (that.graphic && !that.isSelected()) {
            that.graphic.toBackground()
        }
    },
    select: function() {
        this.series.selectPoint(this)
    },
    clearSelection: function() {
        this.series.deselectPoint(this)
    },
    hover: function() {
        this.series.hoverPoint(this)
    },
    clearHover: function() {
        this.series.clearPointHover()
    },
    showTooltip: function() {
        this.series.showPointTooltip(this)
    },
    hideTooltip: function() {
        this.series.hidePointTooltip(this)
    },
    _checkLabelsChanging: function(oldType, newType) {
        var isNewRange = ~newType.indexOf("range");
        var isOldRange = ~oldType.indexOf("range");
        return isOldRange && !isNewRange || !isOldRange && isNewRange
    },
    updateOptions: function(newOptions) {
        if (!newOptions) {
            return
        }
        var that = this;
        var oldOptions = that._options;
        var widgetType = newOptions.widgetType;
        var oldType = oldOptions && oldOptions.type;
        var newType = newOptions.type;
        var newPointTypeMixin = pointTypes[widgetType][newType];
        if (oldType !== newType) {
            that._needDeletingOnDraw = true;
            that._needClearingOnDraw = false;
            if (oldType) {
                that._checkLabelsChanging(oldType, newType) && that.deleteLabel();
                that._resetType(mixins[pointTypes[oldType]])
            }
            that._setType(mixins[newPointTypeMixin])
        } else {
            that._needDeletingOnDraw = that._checkSymbol(oldOptions, newOptions);
            that._needClearingOnDraw = that._checkCustomize(oldOptions, newOptions)
        }
        that._options = newOptions;
        that._fillStyle();
        that._updateLabelOptions(newPointTypeMixin)
    },
    translate: function() {
        if (this.hasValue()) {
            this._translate();
            this.translated = true
        }
    },
    _checkCustomize: function(oldOptions, newOptions) {
        return oldOptions.styles.usePointCustomOptions && !newOptions.styles.usePointCustomOptions
    },
    _getCustomLabelVisibility: function() {
        return this._styles.useLabelCustomOptions ? !!this._options.label.visible : null
    },
    getBoundingRect: function() {
        return this._getGraphicBBox()
    },
    _resetType: function(methods) {
        for (var methodName in methods) {
            delete this[methodName]
        }
    },
    _setType: function(methods) {
        for (var methodName in methods) {
            this[methodName] = methods[methodName]
        }
    },
    isInVisibleArea: function() {
        return this.inVisibleArea
    },
    isSelected: function() {
        return !!(this.fullState & SELECTED_STATE)
    },
    isHovered: function() {
        return !!(this.fullState & HOVER_STATE)
    },
    getOptions: function() {
        return this._options
    },
    animate: function(complete, settings, partitionDuration) {
        if (!this.graphic) {
            complete && complete();
            return
        }
        this.graphic.animate(settings, {
            partitionDuration: partitionDuration
        }, complete)
    },
    getCoords: function(min) {
        var that = this;
        if (!min) {
            return {
                x: that.x,
                y: that.y
            }
        }
        if (!that._options.rotated) {
            return {
                x: that.x,
                y: that.minY + (that.y - that.minY ? 0 : 1)
            }
        }
        return {
            x: that.minX - (that.x - that.minX ? 0 : 1),
            y: that.y
        }
    },
    getDefaultCoords: function() {
        var that = this;
        return !that._options.rotated ? {
            x: that.x,
            y: that.defaultY
        } : {
            x: that.defaultX,
            y: that.y
        }
    },
    setDefaultCoords: function() {
        var coords = this.getDefaultCoords();
        this.x = coords.x;
        this.y = coords.y
    },
    _getVisibleArea: function() {
        return this.series.getVisibleArea()
    },
    _getArgTranslator: function() {
        return this.series.getArgumentAxis().getTranslator()
    },
    _getValTranslator: function() {
        return this.series.getValueAxis().getTranslator()
    },
    _calculateVisibility: function(x, y, width, height) {
        var that = this;
        var visibleArea = that._getVisibleArea();
        var rotated = that._options.rotated;
        if (visibleArea.minX > x + (width || 0) || visibleArea.maxX < x || visibleArea.minY > y + (height || 0) || visibleArea.maxY < y || rotated && (0, _type.isDefined)(width) && 0 !== width && (visibleArea.minX === x + width || visibleArea.maxX === x) || !rotated && (0, _type.isDefined)(height) && 0 !== height && (visibleArea.minY === y + height || visibleArea.maxY === y)) {
            that.inVisibleArea = false
        } else {
            that.inVisibleArea = true
        }
    },
    isArgumentCorrect: function() {
        return this.series._argumentChecker(this.argument)
    },
    isValueCorrect: function() {
        var valueChecker = this.series._valueChecker;
        return valueChecker(this.getMinValue()) && valueChecker(this.getMaxValue())
    },
    hasValue: function() {
        return null !== this.value && null !== this.minValue && this.isArgumentCorrect() && this.isValueCorrect()
    },
    hasCoords: _common.noop,
    correctPosition: _common.noop,
    correctRadius: _common.noop,
    correctLabelRadius: _common.noop,
    getCrosshairData: _common.noop,
    getPointRadius: _common.noop,
    _populatePointShape: _common.noop,
    _checkSymbol: _common.noop,
    getMarkerCoords: _common.noop,
    hide: _common.noop,
    show: _common.noop,
    hideMarker: _common.noop,
    setInvisibility: _common.noop,
    clearVisibility: _common.noop,
    isVisible: _common.noop,
    resetCorrection: _common.noop,
    correctValue: _common.noop,
    resetValue: _common.noop,
    setPercentValue: _common.noop,
    correctCoordinates: _common.noop,
    coordsIn: _common.noop,
    getTooltipParams: _common.noop,
    applyWordWrap: _common.noop,
    setLabelTrackerData: _common.noop,
    updateLabelCoord: _common.noop,
    drawLabel: _common.noop,
    correctLabelPosition: _common.noop,
    getMinValue: _common.noop,
    getMaxValue: _common.noop,
    _drawErrorBar: _common.noop,
    getMarkerVisibility: _common.noop,
    dispose: function() {
        var that = this;
        that.deleteMarker();
        that.deleteLabel();
        that._errorBar && this._errorBar.dispose();
        that._options = that._styles = that.series = that._errorBar = null
    },
    getTooltipFormatObject: function(tooltip, stackPoints) {
        var that = this;
        var tooltipFormatObject = that._getFormatObject(tooltip);
        var sharedTooltipValuesArray = [];
        var tooltipStackPointsFormatObject = [];
        if (stackPoints) {
            stackPoints.forEach(function(point) {
                if (!point.isVisible()) {
                    return
                }
                var formatObject = point._getFormatObject(tooltip);
                tooltipStackPointsFormatObject.push(formatObject);
                sharedTooltipValuesArray.push(formatObject.seriesName + ": " + formatObject.valueText)
            });
            _extend(tooltipFormatObject, {
                points: tooltipStackPointsFormatObject,
                valueText: sharedTooltipValuesArray.join("\n"),
                stackName: that.series.getStackName() || null
            })
        }
        var aggregationInfo = that.aggregationInfo;
        if (aggregationInfo) {
            var axis = that.series.getArgumentAxis();
            var rangeText = axis.formatRange(aggregationInfo.intervalStart, aggregationInfo.intervalEnd, aggregationInfo.aggregationInterval);
            if (rangeText) {
                tooltipFormatObject.valueText += "\n".concat(rangeText)
            }
        }
        return tooltipFormatObject
    },
    setHole: function(holeValue, position) {
        var that = this;
        var minValue = isFinite(that.minValue) ? that.minValue : 0;
        if ((0, _type.isDefined)(holeValue)) {
            if ("left" === position) {
                that.leftHole = that.value - holeValue;
                that.minLeftHole = minValue - holeValue
            } else {
                that.rightHole = that.value - holeValue;
                that.minRightHole = minValue - holeValue
            }
        }
    },
    resetHoles: function() {
        this.leftHole = null;
        this.minLeftHole = null;
        this.rightHole = null;
        this.minRightHole = null
    },
    getLabel: function() {
        return this._label
    },
    getLabels: function() {
        return [this._label]
    },
    getCenterCoord: function() {
        return {
            x: this.x,
            y: this.y
        }
    }
};
