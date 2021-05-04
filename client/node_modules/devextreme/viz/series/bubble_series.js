/**
 * DevExtreme (viz/series/bubble_series.js)
 * Version: 20.2.6
 * Build date: Tue Mar 16 2021
 *
 * Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
exports.chart = void 0;
var _line_series = require("./line_series");
var _scatter_series = require("./scatter_series");
var _area_series = require("./area_series");
var _bar_series = require("./bar_series");
var _extend2 = require("../../core/utils/extend");
var _iterator = require("../../core/utils/iterator");
var _common = require("../../core/utils/common");

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
var lineSeries = _line_series.chart.line;
var areaSeries = _area_series.chart.area;
var chartBarSeries = _bar_series.chart.bar;
var polarBarSeries = _bar_series.polar.bar;
var _extend = _extend2.extend;
var _each = _iterator.each;
var _noop = _common.noop;
var chart = {};
exports.chart = chart;
chart.bubble = _extend({}, _scatter_series.chart, {
    _calculateErrorBars: _noop,
    _getMainColor: chartBarSeries._getMainColor,
    _createPointStyles: chartBarSeries._createPointStyles,
    _updatePointsVisibility: chartBarSeries._updatePointsVisibility,
    _getOptionsForPoint: chartBarSeries._getOptionsForPoint,
    _applyMarkerClipRect: lineSeries._applyElementsClipRect,
    _parsePointStyle: polarBarSeries._parsePointStyle,
    _createLegendState: areaSeries._createLegendState,
    _setMarkerGroupSettings: polarBarSeries._setMarkerGroupSettings,
    areErrorBarsVisible: _noop,
    _createErrorBarGroup: _noop,
    _checkData: function(data, skippedFields) {
        return _scatter_series.chart._checkData.call(this, data, skippedFields, {
            value: this.getValueFields()[0],
            size: this.getSizeField()
        })
    },
    _getPointDataSelector: function(data, options) {
        var sizeField = this.getSizeField();
        var baseGetter = _scatter_series.chart._getPointDataSelector.call(this);
        return function(data) {
            var pointData = baseGetter(data);
            pointData.size = data[sizeField];
            return pointData
        }
    },
    _aggregators: {
        avg: function(_ref, series) {
            var _ref2;
            var data = _ref.data,
                intervalStart = _ref.intervalStart;
            if (!data.length) {
                return
            }
            var valueField = series.getValueFields()[0];
            var sizeField = series.getSizeField();
            var aggregate = data.reduce(function(result, item) {
                result[0] += item[valueField];
                result[1] += item[sizeField];
                result[2]++;
                return result
            }, [0, 0, 0]);
            return _ref2 = {}, _defineProperty(_ref2, valueField, aggregate[0] / aggregate[2]), _defineProperty(_ref2, sizeField, aggregate[1] / aggregate[2]), _defineProperty(_ref2, series.getArgumentField(), intervalStart), _ref2
        }
    },
    getValueFields: function() {
        return [this._options.valueField || "val"]
    },
    getSizeField: function() {
        return this._options.sizeField || "size"
    },
    _animate: function() {
        var that = this;
        var lastPointIndex = that._drawnPoints.length - 1;
        var labelsGroup = that._labelsGroup;
        var labelAnimFunc = function() {
            labelsGroup && labelsGroup.animate({
                opacity: 1
            }, {
                duration: that._defaultDuration
            })
        };
        _each(that._drawnPoints || [], function(i, p) {
            p.animate(i === lastPointIndex ? labelAnimFunc : void 0, {
                r: p.bubbleSize,
                translateX: p.x,
                translateY: p.y
            })
        })
    },
    _patchMarginOptions: function(options) {
        options.processBubbleSize = true;
        return options
    }
});
