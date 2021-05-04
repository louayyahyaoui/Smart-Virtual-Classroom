/**
 * DevExtreme (viz/sparklines/sparkline.js)
 * Version: 20.2.6
 * Build date: Tue Mar 16 2021
 *
 * Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
exports.default = void 0;
var _base_sparkline = _interopRequireDefault(require("./base_sparkline"));
var _data_validator = require("../components/data_validator");
var _base_series = require("../series/base_series");
var _utils = require("../core/utils");
var _type = require("../../core/utils/type");
var _component_registrator = _interopRequireDefault(require("../../core/component_registrator"));
var _data_source = require("../core/data_source");

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        "default": obj
    }
}
var MIN_BAR_WIDTH = 1;
var MAX_BAR_WIDTH = 50;
var DEFAULT_BAR_INTERVAL = 4;
var DEFAULT_CANVAS_WIDTH = 250;
var DEFAULT_CANVAS_HEIGHT = 30;
var DEFAULT_POINT_BORDER = 2;
var ALLOWED_TYPES = {
    line: true,
    spline: true,
    stepline: true,
    area: true,
    steparea: true,
    splinearea: true,
    bar: true,
    winloss: true
};
var _math = Math;
var _abs = _math.abs;
var _round = _math.round;
var _max = _math.max;
var _min = _math.min;
var _isFinite = isFinite;
var _Number = Number;
var _String = String;

function findMinMax(data, valField) {
    var firstItem = data[0] || {};
    var firstValue = firstItem[valField] || 0;
    var min = firstValue;
    var max = firstValue;
    var minIndexes = [0];
    var maxIndexes = [0];
    var dataLength = data.length;
    var value;
    var i;
    for (i = 1; i < dataLength; i++) {
        value = data[i][valField];
        if (value < min) {
            min = value;
            minIndexes = [i]
        } else {
            if (value === min) {
                minIndexes.push(i)
            }
        }
        if (value > max) {
            max = value;
            maxIndexes = [i]
        } else {
            if (value === max) {
                maxIndexes.push(i)
            }
        }
    }
    if (max === min) {
        minIndexes = maxIndexes = []
    }
    return {
        minIndexes: minIndexes,
        maxIndexes: maxIndexes
    }
}

function parseNumericDataSource(data, argField, valField, ignoreEmptyPoints) {
    return (0, _utils.map)(data, function(dataItem, index) {
        var item = null;
        var isDataNumber;
        var value;
        if (void 0 !== dataItem) {
            item = {};
            isDataNumber = _isFinite(dataItem);
            item[argField] = isDataNumber ? _String(index) : dataItem[argField];
            value = isDataNumber ? dataItem : dataItem[valField];
            item[valField] = null === value ? ignoreEmptyPoints ? void 0 : value : _Number(value);
            item = void 0 !== item[argField] && void 0 !== item[valField] ? item : null
        }
        return item
    })
}

function parseWinlossDataSource(data, argField, valField, target) {
    var lowBarValue = -1;
    var zeroBarValue = 0;
    var highBarValue = 1;
    var delta = 1e-4;
    return (0, _utils.map)(data, function(dataItem) {
        var item = {};
        item[argField] = dataItem[argField];
        if (_abs(dataItem[valField] - target) < delta) {
            item[valField] = zeroBarValue
        } else {
            if (dataItem[valField] > target) {
                item[valField] = highBarValue
            } else {
                item[valField] = lowBarValue
            }
        }
        return item
    })
}

function selectPointColor(color, options, index, pointIndexes) {
    if (index === pointIndexes.first || index === pointIndexes.last) {
        color = options.firstLastColor
    }
    if ((pointIndexes.min || []).indexOf(index) >= 0) {
        color = options.minColor
    }
    if ((pointIndexes.max || []).indexOf(index) >= 0) {
        color = options.maxColor
    }
    return color
}

function createLineCustomizeFunction(pointIndexes, options) {
    return function() {
        var color = selectPointColor(void 0, options, this.index, pointIndexes);
        return color ? {
            visible: true,
            border: {
                color: color
            }
        } : {}
    }
}

function createBarCustomizeFunction(pointIndexes, options, winlossData) {
    return function() {
        var index = this.index;
        var isWinloss = "winloss" === options.type;
        var target = isWinloss ? options.winlossThreshold : 0;
        var value = isWinloss ? winlossData[index][options.valueField] : this.value;
        var positiveColor = isWinloss ? options.winColor : options.barPositiveColor;
        var negativeColor = isWinloss ? options.lossColor : options.barNegativeColor;
        return {
            color: selectPointColor(value >= target ? positiveColor : negativeColor, options, index, pointIndexes)
        }
    }
}
var dxSparkline = _base_sparkline.default.inherit({
    _rootClassPrefix: "dxsl",
    _rootClass: "dxsl-sparkline",
    _themeSection: "sparkline",
    _defaultSize: {
        width: DEFAULT_CANVAS_WIDTH,
        height: DEFAULT_CANVAS_HEIGHT
    },
    _initCore: function() {
        this.callBase();
        this._createSeries()
    },
    _initialChanges: ["DATA_SOURCE"],
    _dataSourceChangedHandler: function() {
        this._requestChange(["UPDATE"])
    },
    _updateWidgetElements: function() {
        this._updateSeries();
        this.callBase()
    },
    _disposeWidgetElements: function() {
        var that = this;
        that._series && that._series.dispose();
        that._series = that._seriesGroup = that._seriesLabelGroup = null
    },
    _cleanWidgetElements: function() {
        this._seriesGroup.remove();
        this._seriesLabelGroup.remove();
        this._seriesGroup.clear();
        this._seriesLabelGroup.clear()
    },
    _drawWidgetElements: function() {
        if (this._dataIsLoaded()) {
            this._drawSeries();
            this._drawn()
        }
    },
    _getCorrectCanvas: function() {
        var options = this._allOptions;
        var canvas = this._canvas;
        var halfPointSize = options.pointSize && Math.ceil(options.pointSize / 2) + DEFAULT_POINT_BORDER;
        var type = options.type;
        if ("bar" !== type && "winloss" !== type && (options.showFirstLast || options.showMinMax)) {
            return {
                width: canvas.width,
                height: canvas.height,
                left: canvas.left + halfPointSize,
                right: canvas.right + halfPointSize,
                top: canvas.top + halfPointSize,
                bottom: canvas.bottom + halfPointSize
            }
        }
        return canvas
    },
    _prepareOptions: function() {
        var that = this;
        that._allOptions = that.callBase();
        that._allOptions.type = (0, _utils.normalizeEnum)(that._allOptions.type);
        if (!ALLOWED_TYPES[that._allOptions.type]) {
            that._allOptions.type = "line"
        }
    },
    _createHtmlElements: function() {
        this._seriesGroup = this._renderer.g().attr({
            "class": "dxsl-series"
        });
        this._seriesLabelGroup = this._renderer.g().attr({
            "class": "dxsl-series-labels"
        })
    },
    _createSeries: function() {
        this._series = new _base_series.Series({
            renderer: this._renderer,
            seriesGroup: this._seriesGroup,
            labelsGroup: this._seriesLabelGroup,
            argumentAxis: this._argumentAxis,
            valueAxis: this._valueAxis
        }, {
            widgetType: "chart",
            type: "line"
        })
    },
    _updateSeries: function() {
        var that = this;
        var singleSeries = that._series;
        that._prepareDataSource();
        var seriesOptions = that._prepareSeriesOptions();
        singleSeries.updateOptions(seriesOptions);
        var groupsData = {
            groups: [{
                series: [singleSeries]
            }]
        };
        groupsData.argumentOptions = {
            type: "bar" === seriesOptions.type ? "discrete" : void 0
        };
        that._simpleDataSource = (0, _data_validator.validateData)(that._simpleDataSource, groupsData, that._incidentOccurred, {
            checkTypeForAllData: false,
            convertToAxisDataType: true,
            sortingMethod: true
        })[singleSeries.getArgumentField()];
        seriesOptions.customizePoint = that._getCustomizeFunction();
        singleSeries.updateData(that._simpleDataSource);
        singleSeries.createPoints();
        that._groupsDataCategories = groupsData.categories
    },
    _optionChangesMap: {
        dataSource: "DATA_SOURCE"
    },
    _optionChangesOrder: ["DATA_SOURCE"],
    _change_DATA_SOURCE: function() {
        this._updateDataSource()
    },
    _prepareDataSource: function() {
        var that = this;
        var options = that._allOptions;
        var argField = options.argumentField;
        var valField = options.valueField;
        var dataSource = that._dataSourceItems() || [];
        var data = parseNumericDataSource(dataSource, argField, valField, that.option("ignoreEmptyPoints"));
        if ("winloss" === options.type) {
            that._winlossDataSource = data;
            that._simpleDataSource = parseWinlossDataSource(data, argField, valField, options.winlossThreshold)
        } else {
            that._simpleDataSource = data
        }
    },
    _prepareSeriesOptions: function() {
        var that = this;
        var options = that._allOptions;
        var type = "winloss" === options.type ? "bar" : options.type;
        return {
            visible: true,
            argumentField: options.argumentField,
            valueField: options.valueField,
            color: options.lineColor,
            width: options.lineWidth,
            widgetType: "chart",
            type: type,
            opacity: type.indexOf("area") !== -1 ? that._allOptions.areaOpacity : void 0,
            point: {
                size: options.pointSize,
                symbol: options.pointSymbol,
                border: {
                    visible: true,
                    width: DEFAULT_POINT_BORDER
                },
                color: options.pointColor,
                visible: false,
                hoverStyle: {
                    border: {}
                },
                selectionStyle: {
                    border: {}
                }
            },
            border: {
                color: options.lineColor,
                width: options.lineWidth,
                visible: "bar" !== type
            }
        }
    },
    _getCustomizeFunction: function() {
        var that = this;
        var options = that._allOptions;
        var dataSource = that._winlossDataSource || that._simpleDataSource;
        var drawnPointIndexes = that._getExtremumPointsIndexes(dataSource);
        var customizeFunction;
        if ("winloss" === options.type || "bar" === options.type) {
            customizeFunction = createBarCustomizeFunction(drawnPointIndexes, options, that._winlossDataSource)
        } else {
            customizeFunction = createLineCustomizeFunction(drawnPointIndexes, options)
        }
        return customizeFunction
    },
    _getExtremumPointsIndexes: function(data) {
        var that = this;
        var options = that._allOptions;
        var lastIndex = data.length - 1;
        var indexes = {};
        that._minMaxIndexes = findMinMax(data, options.valueField);
        if (options.showFirstLast) {
            indexes.first = 0;
            indexes.last = lastIndex
        }
        if (options.showMinMax) {
            indexes.min = that._minMaxIndexes.minIndexes;
            indexes.max = that._minMaxIndexes.maxIndexes
        }
        return indexes
    },
    _getStick: function() {
        return {
            stick: "bar" !== this._series.type
        }
    },
    _updateRange: function() {
        var that = this;
        var series = that._series;
        var type = series.type;
        var isBarType = "bar" === type;
        var isWinlossType = "winloss" === type;
        var DEFAULT_VALUE_RANGE_MARGIN = .15;
        var DEFAULT_ARGUMENT_RANGE_MARGIN = .1;
        var WINLOSS_MAX_RANGE = 1;
        var WINLOSS_MIN_RANGE = -1;
        var rangeData = series.getRangeData();
        var minValue = that._allOptions.minValue;
        var hasMinY = (0, _type.isDefined)(minValue) && _isFinite(minValue);
        var maxValue = that._allOptions.maxValue;
        var hasMaxY = (0, _type.isDefined)(maxValue) && _isFinite(maxValue);
        var argCoef;
        var valCoef = (rangeData.val.max - rangeData.val.min) * DEFAULT_VALUE_RANGE_MARGIN;
        if (isBarType || isWinlossType || "area" === type) {
            if (0 !== rangeData.val.min) {
                rangeData.val.min -= valCoef
            }
            if (0 !== rangeData.val.max) {
                rangeData.val.max += valCoef
            }
        } else {
            rangeData.val.min -= valCoef;
            rangeData.val.max += valCoef
        }
        if (hasMinY || hasMaxY) {
            if (hasMinY && hasMaxY) {
                rangeData.val.minVisible = _min(minValue, maxValue);
                rangeData.val.maxVisible = _max(minValue, maxValue)
            } else {
                rangeData.val.minVisible = hasMinY ? _Number(minValue) : void 0;
                rangeData.val.maxVisible = hasMaxY ? _Number(maxValue) : void 0
            }
            if (isWinlossType) {
                rangeData.val.minVisible = hasMinY ? _max(rangeData.val.minVisible, WINLOSS_MIN_RANGE) : void 0;
                rangeData.val.maxVisible = hasMaxY ? _min(rangeData.val.maxVisible, WINLOSS_MAX_RANGE) : void 0
            }
        }
        if (series.getPoints().length > 1) {
            if (isBarType) {
                argCoef = (rangeData.arg.max - rangeData.arg.min) * DEFAULT_ARGUMENT_RANGE_MARGIN;
                rangeData.arg.min = rangeData.arg.min - argCoef;
                rangeData.arg.max = rangeData.arg.max + argCoef
            }
        }
        rangeData.arg.categories = that._groupsDataCategories;
        that._ranges = rangeData
    },
    _getBarWidth: function(pointsCount) {
        var that = this;
        var canvas = that._canvas;
        var intervalWidth = pointsCount * DEFAULT_BAR_INTERVAL;
        var rangeWidth = canvas.width - canvas.left - canvas.right - intervalWidth;
        var width = _round(rangeWidth / pointsCount);
        if (width < MIN_BAR_WIDTH) {
            width = MIN_BAR_WIDTH
        }
        if (width > MAX_BAR_WIDTH) {
            width = MAX_BAR_WIDTH
        }
        return width
    },
    _correctPoints: function() {
        var that = this;
        var seriesType = that._allOptions.type;
        var seriesPoints = that._series.getPoints();
        var pointsLength = seriesPoints.length;
        var barWidth;
        var i;
        if ("bar" === seriesType || "winloss" === seriesType) {
            barWidth = that._getBarWidth(pointsLength);
            for (i = 0; i < pointsLength; i++) {
                seriesPoints[i].correctCoordinates({
                    width: barWidth,
                    offset: 0
                })
            }
        }
    },
    _drawSeries: function() {
        var that = this;
        if (that._simpleDataSource.length > 0) {
            that._correctPoints();
            that._series.draw();
            that._seriesGroup.append(that._renderer.root)
        }
    },
    _isTooltipEnabled: function() {
        return !!this._simpleDataSource.length
    },
    _getTooltipData: function() {
        var that = this;
        var options = that._allOptions;
        var dataSource = that._winlossDataSource || that._simpleDataSource;
        var tooltip = that._tooltip;
        if (0 === dataSource.length) {
            return {}
        }
        var minMax = that._minMaxIndexes;
        var valueField = options.valueField;
        var first = dataSource[0][valueField];
        var last = dataSource[dataSource.length - 1][valueField];
        var min = (0, _type.isDefined)(minMax.minIndexes[0]) ? dataSource[minMax.minIndexes[0]][valueField] : first;
        var max = (0, _type.isDefined)(minMax.maxIndexes[0]) ? dataSource[minMax.maxIndexes[0]][valueField] : first;
        var formattedFirst = tooltip.formatValue(first);
        var formattedLast = tooltip.formatValue(last);
        var formattedMin = tooltip.formatValue(min);
        var formattedMax = tooltip.formatValue(max);
        var customizeObject = {
            firstValue: formattedFirst,
            lastValue: formattedLast,
            minValue: formattedMin,
            maxValue: formattedMax,
            originalFirstValue: first,
            originalLastValue: last,
            originalMinValue: min,
            originalMaxValue: max,
            valueText: ["Start:", formattedFirst, "End:", formattedLast, "Min:", formattedMin, "Max:", formattedMax]
        };
        if ("winloss" === options.type) {
            customizeObject.originalThresholdValue = options.winlossThreshold;
            customizeObject.thresholdValue = tooltip.formatValue(options.winlossThreshold)
        }
        return customizeObject
    }
});
(0, _utils.map)(["lineColor", "lineWidth", "areaOpacity", "minColor", "maxColor", "barPositiveColor", "barNegativeColor", "winColor", "lessColor", "firstLastColor", "pointSymbol", "pointColor", "pointSize", "type", "argumentField", "valueField", "winlossThreshold", "showFirstLast", "showMinMax", "ignoreEmptyPoints", "minValue", "maxValue"], function(name) {
    dxSparkline.prototype._optionChangesMap[name] = "OPTIONS"
});
(0, _component_registrator.default)("dxSparkline", dxSparkline);
var _default = dxSparkline;
exports.default = _default;
dxSparkline.addPlugin(_data_source.plugin);
module.exports = exports.default;
