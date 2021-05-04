/**
 * DevExtreme (viz/chart_components/advanced_chart.js)
 * Version: 20.2.6
 * Build date: Tue Mar 16 2021
 *
 * Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
exports.AdvancedChart = void 0;
var _extend2 = require("../../core/utils/extend");
var _array = require("../../core/utils/array");
var _iterator = require("../../core/utils/iterator");
var _range = require("../translators/range");
var _base_axis = require("../axes/base_axis");
var _series_family = require("../core/series_family");
var _base_chart = require("./base_chart");
var _crosshair = require("./crosshair");
var _range_data_calculator = _interopRequireDefault(require("../series/helpers/range_data_calculator"));
var _type = require("../../core/utils/type");
var _common = require("../../core/utils/common");
var _utils = require("../core/utils");

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        "default": obj
    }
}

function ownKeys(object, enumerableOnly) {
    var keys = Object.keys(object);
    if (Object.getOwnPropertySymbols) {
        var symbols = Object.getOwnPropertySymbols(object);
        if (enumerableOnly) {
            symbols = symbols.filter(function(sym) {
                return Object.getOwnPropertyDescriptor(object, sym).enumerable
            })
        }
        keys.push.apply(keys, symbols)
    }
    return keys
}

function _objectSpread(target) {
    for (var i = 1; i < arguments.length; i++) {
        var source = null != arguments[i] ? arguments[i] : {};
        if (i % 2) {
            ownKeys(Object(source), true).forEach(function(key) {
                _defineProperty(target, key, source[key])
            })
        } else {
            if (Object.getOwnPropertyDescriptors) {
                Object.defineProperties(target, Object.getOwnPropertyDescriptors(source))
            } else {
                ownKeys(Object(source)).forEach(function(key) {
                    Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key))
                })
            }
        }
    }
    return target
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
var _isArray = Array.isArray;
var DEFAULT_AXIS_NAME = "defaultAxisName";
var FONT = "font";
var COMMON_AXIS_SETTINGS = "commonAxisSettings";
var DEFAULT_PANE_NAME = "default";
var VISUAL_RANGE = "VISUAL_RANGE";

function prepareAxis(axisOptions) {
    return _isArray(axisOptions) ? 0 === axisOptions.length ? [{}] : axisOptions : [axisOptions]
}

function processBubbleMargin(opt, bubbleSize) {
    if (opt.processBubbleSize) {
        opt.size = bubbleSize
    }
    return opt
}

function estimateBubbleSize(size, panesCount, maxSize, rotated) {
    var width = rotated ? size.width / panesCount : size.width;
    var height = rotated ? size.height : size.height / panesCount;
    return Math.min(width, height) * maxSize
}

function setAxisVisualRangeByOption(arg, axis, isDirectOption, index) {
    var options;
    var visualRange;
    if (isDirectOption) {
        visualRange = arg.value;
        options = {
            skipEventRising: true
        };
        var wrappedVisualRange = wrapVisualRange(arg.fullName, visualRange);
        if (wrappedVisualRange) {
            options = {
                allowPartialUpdate: true
            };
            visualRange = wrappedVisualRange
        }
    } else {
        visualRange = ((0, _type.isDefined)(index) ? arg.value[index] : arg.value).visualRange
    }
    axis.visualRange(visualRange, options)
}

function getAxisTypes(groupsData, axis, isArgumentAxes) {
    if (isArgumentAxes) {
        return {
            argumentAxisType: groupsData.argumentAxisType,
            argumentType: groupsData.argumentType
        }
    }
    var _groupsData$groups$fi = groupsData.groups.filter(function(g) {
            return g.valueAxis === axis
        })[0],
        valueAxisType = _groupsData$groups$fi.valueAxisType,
        valueType = _groupsData$groups$fi.valueType;
    return {
        valueAxisType: valueAxisType,
        valueType: valueType
    }
}

function wrapVisualRange(fullName, value) {
    var pathElements = fullName.split(".");
    var destElem = pathElements[pathElements.length - 1];
    if ("endValue" === destElem || "startValue" === destElem) {
        return _defineProperty({}, destElem, value)
    }
}
var AdvancedChart = _base_chart.BaseChart.inherit({
    _fontFields: [COMMON_AXIS_SETTINGS + ".label." + FONT, COMMON_AXIS_SETTINGS + ".title." + FONT],
    _partialOptionChangesMap: {
        visualRange: VISUAL_RANGE,
        _customVisualRange: VISUAL_RANGE,
        strips: "REFRESH_AXES",
        constantLines: "REFRESH_AXES"
    },
    _partialOptionChangesPath: {
        argumentAxis: ["strips", "constantLines", "visualRange", "_customVisualRange"],
        valueAxis: ["strips", "constantLines", "visualRange", "_customVisualRange"]
    },
    _initCore: function() {
        this._panesClipRects = {};
        this.callBase()
    },
    _disposeCore: function() {
        var disposeObjectsInArray = this._disposeObjectsInArray;
        var panesClipRects = this._panesClipRects;
        this.callBase();
        disposeObjectsInArray.call(panesClipRects, "fixed");
        disposeObjectsInArray.call(panesClipRects, "base");
        disposeObjectsInArray.call(panesClipRects, "wide");
        this._panesClipRects = null
    },
    _dispose: function() {
        var that = this;
        var disposeObjectsInArray = this._disposeObjectsInArray;
        that.callBase();
        that.panes = null;
        if (that._legend) {
            that._legend.dispose();
            that._legend = null
        }
        disposeObjectsInArray.call(that, "panesBackground");
        disposeObjectsInArray.call(that, "seriesFamilies");
        that._disposeAxes()
    },
    _createPanes: function() {
        this._cleanPanesClipRects("fixed");
        this._cleanPanesClipRects("base");
        this._cleanPanesClipRects("wide")
    },
    _cleanPanesClipRects: function(clipArrayName) {
        var clipArray = this._panesClipRects[clipArrayName];
        (clipArray || []).forEach(function(clipRect) {
            return clipRect && clipRect.dispose()
        });
        this._panesClipRects[clipArrayName] = []
    },
    _getElementsClipRectID: function(paneName) {
        var clipShape = this._panesClipRects.fixed[this._getPaneIndex(paneName)];
        return clipShape && clipShape.id
    },
    _getPaneIndex: function(paneName) {
        var paneIndex;
        var name = paneName || DEFAULT_PANE_NAME;
        (0, _iterator.each)(this.panes, function(index, pane) {
            if (pane.name === name) {
                paneIndex = index;
                return false
            }
        });
        return paneIndex
    },
    _updateSize: function() {
        this.callBase();
        (0, _utils.setCanvasValues)(this._canvas)
    },
    _reinitAxes: function() {
        this.panes = this._createPanes();
        this._populateAxes();
        this._axesReinitialized = true
    },
    _getCrosshairMargins: function() {
        var crosshairOptions = this._getCrosshairOptions() || {};
        var crosshairEnabled = crosshairOptions.enabled;
        var margins = (0, _crosshair.getMargins)();
        return {
            x: crosshairEnabled && crosshairOptions.horizontalLine.visible ? margins.x : 0,
            y: crosshairEnabled && crosshairOptions.verticalLine.visible ? margins.y : 0
        }
    },
    _populateAxes: function() {
        var that = this;
        var panes = that.panes;
        var rotated = that._isRotated();
        var argumentAxesOptions = prepareAxis(that.option("argumentAxis") || {})[0];
        var valueAxisOption = that.option("valueAxis");
        var valueAxesOptions = prepareAxis(valueAxisOption || {});
        var argumentAxesPopulatedOptions = [];
        var valueAxesPopulatedOptions = [];
        var axisNames = [];
        var valueAxesCounter = 0;
        var paneWithNonVirtualAxis;
        var crosshairMargins = that._getCrosshairMargins();

        function getNextAxisName() {
            return DEFAULT_AXIS_NAME + valueAxesCounter++
        }
        if (rotated) {
            paneWithNonVirtualAxis = "right" === argumentAxesOptions.position ? panes[panes.length - 1].name : panes[0].name
        } else {
            paneWithNonVirtualAxis = "top" === argumentAxesOptions.position ? panes[0].name : panes[panes.length - 1].name
        }
        argumentAxesPopulatedOptions = (0, _utils.map)(panes, function(pane) {
            var virtual = pane.name !== paneWithNonVirtualAxis;
            return that._populateAxesOptions("argumentAxis", argumentAxesOptions, {
                pane: pane.name,
                name: null,
                optionPath: "argumentAxis",
                crosshairMargin: rotated ? crosshairMargins.x : crosshairMargins.y
            }, rotated, virtual)
        });
        (0, _iterator.each)(valueAxesOptions, function(priority, axisOptions) {
            var _axisOptions$panes;
            var axisPanes = [];
            var name = axisOptions.name;
            if (name && (0, _array.inArray)(name, axisNames) !== -1) {
                that._incidentOccurred("E2102");
                return
            }
            name && axisNames.push(name);
            if (axisOptions.pane) {
                axisPanes.push(axisOptions.pane)
            }
            if (null !== (_axisOptions$panes = axisOptions.panes) && void 0 !== _axisOptions$panes && _axisOptions$panes.length) {
                axisPanes = axisPanes.concat(axisOptions.panes.slice(0))
            }
            axisPanes = (0, _utils.unique)(axisPanes);
            if (!axisPanes.length) {
                axisPanes.push(void 0)
            }(0, _iterator.each)(axisPanes, function(_, pane) {
                var optionPath = _isArray(valueAxisOption) ? "valueAxis[".concat(priority, "]") : "valueAxis";
                valueAxesPopulatedOptions.push(that._populateAxesOptions("valueAxis", axisOptions, {
                    name: name || getNextAxisName(),
                    pane: pane,
                    priority: priority,
                    optionPath: optionPath,
                    crosshairMargin: rotated ? crosshairMargins.y : crosshairMargins.x
                }, rotated))
            })
        });
        that._redesignAxes(argumentAxesPopulatedOptions, true, paneWithNonVirtualAxis);
        that._redesignAxes(valueAxesPopulatedOptions, false)
    },
    _redesignAxes: function(options, isArgumentAxes, paneWithNonVirtualAxis) {
        var that = this;
        var axesBasis = [];
        var axes = isArgumentAxes ? that._argumentAxes : that._valueAxes;
        (0, _iterator.each)(options, function(_, opt) {
            var curAxes = axes && axes.filter(function(a) {
                return a.name === opt.name && (!(0, _type.isDefined)(opt.pane) && that.panes.some(function(p) {
                    return p.name === a.pane
                }) || a.pane === opt.pane)
            });
            if (curAxes && curAxes.length > 0) {
                (0, _iterator.each)(curAxes, function(_, axis) {
                    var axisTypes = getAxisTypes(that._groupsData, axis, isArgumentAxes);
                    axis.updateOptions(opt);
                    if (isArgumentAxes) {
                        axis.setTypes(axisTypes.argumentAxisType, axisTypes.argumentType, "argumentType")
                    } else {
                        axis.setTypes(axisTypes.valueAxisType, axisTypes.valueType, "valueType")
                    }
                    axis.validate();
                    axesBasis.push({
                        axis: axis
                    })
                })
            } else {
                axesBasis.push({
                    options: opt
                })
            }
        });
        if (axes) {
            (0, _iterator.reverseEach)(axes, function(index, axis) {
                if (!axesBasis.some(function(basis) {
                        return basis.axis && basis.axis === axis
                    })) {
                    that._disposeAxis(index, isArgumentAxes)
                }
            })
        } else {
            if (isArgumentAxes) {
                axes = that._argumentAxes = []
            } else {
                axes = that._valueAxes = []
            }
        }(0, _iterator.each)(axesBasis, function(_, basis) {
            var axis = basis.axis;
            if (basis.axis && isArgumentAxes) {
                basis.axis.isVirtual = basis.axis.pane !== paneWithNonVirtualAxis
            } else {
                if (basis.options) {
                    axis = that._createAxis(isArgumentAxes, basis.options, isArgumentAxes ? basis.options.pane !== paneWithNonVirtualAxis : void 0);
                    axes.push(axis)
                }
            }
            axis.applyVisualRangeSetter(that._getVisualRangeSetter())
        })
    },
    _disposeAxis: function(index, isArgumentAxis) {
        var axes = isArgumentAxis ? this._argumentAxes : this._valueAxes;
        var axis = axes[index];
        if (!axis) {
            return
        }
        axis.dispose();
        axes.splice(index, 1)
    },
    _disposeAxes: function() {
        var that = this;
        var disposeObjectsInArray = that._disposeObjectsInArray;
        disposeObjectsInArray.call(that, "_argumentAxes");
        disposeObjectsInArray.call(that, "_valueAxes")
    },
    _appendAdditionalSeriesGroups: function() {
        this._crosshairCursorGroup.linkAppend();
        this._scrollBar && this._scrollBarGroup.linkAppend()
    },
    _getLegendTargets: function() {
        var _this = this;
        return (this.series || []).map(function(s) {
            var item = _this._getLegendOptions(s);
            item.legendData.series = s;
            if (!s.getOptions().showInLegend) {
                item.legendData.visible = false
            }
            return item
        })
    },
    _legendItemTextField: "name",
    _seriesPopulatedHandlerCore: function() {
        this._processSeriesFamilies();
        this._processValueAxisFormat()
    },
    _renderTrackers: function() {
        var that = this;
        var i;
        for (i = 0; i < that.series.length; ++i) {
            that.series[i].drawTrackers()
        }
    },
    _specialProcessSeries: function() {
        this._processSeriesFamilies()
    },
    _processSeriesFamilies: function() {
        var _that$seriesFamilies;
        var that = this;
        var types = [];
        var families = [];
        var paneSeries;
        var themeManager = that._themeManager;
        var negativesAsZeroes = themeManager.getOptions("negativesAsZeroes");
        var negativesAsZeros = themeManager.getOptions("negativesAsZeros");
        var familyOptions = {
            minBubbleSize: themeManager.getOptions("minBubbleSize"),
            maxBubbleSize: themeManager.getOptions("maxBubbleSize"),
            barGroupPadding: themeManager.getOptions("barGroupPadding"),
            barGroupWidth: themeManager.getOptions("barGroupWidth"),
            negativesAsZeroes: (0, _type.isDefined)(negativesAsZeroes) ? negativesAsZeroes : negativesAsZeros
        };
        if (null !== (_that$seriesFamilies = that.seriesFamilies) && void 0 !== _that$seriesFamilies && _that$seriesFamilies.length) {
            (0, _iterator.each)(that.seriesFamilies, function(_, family) {
                family.updateOptions(familyOptions);
                family.adjustSeriesValues()
            });
            return
        }(0, _iterator.each)(that.series, function(_, item) {
            if ((0, _array.inArray)(item.type, types) === -1) {
                types.push(item.type)
            }
        });
        (0, _iterator.each)(that._getLayoutTargets(), function(_, pane) {
            paneSeries = that._getSeriesForPane(pane.name);
            (0, _iterator.each)(types, function(_, type) {
                var family = new _series_family.SeriesFamily({
                    type: type,
                    pane: pane.name,
                    minBubbleSize: familyOptions.minBubbleSize,
                    maxBubbleSize: familyOptions.maxBubbleSize,
                    barGroupPadding: familyOptions.barGroupPadding,
                    barGroupWidth: familyOptions.barGroupWidth,
                    negativesAsZeroes: familyOptions.negativesAsZeroes,
                    rotated: that._isRotated()
                });
                family.add(paneSeries);
                family.adjustSeriesValues();
                families.push(family)
            })
        });
        that.seriesFamilies = families
    },
    _updateSeriesDimensions: function() {
        var that = this;
        var i;
        var seriesFamilies = that.seriesFamilies || [];
        for (i = 0; i < seriesFamilies.length; i++) {
            var family = seriesFamilies[i];
            family.updateSeriesValues();
            family.adjustSeriesDimensions()
        }
    },
    _getLegendCallBack: function(series) {
        return this._legend && this._legend.getActionCallback(series)
    },
    _appendAxesGroups: function() {
        var that = this;
        that._stripsGroup.linkAppend();
        that._gridGroup.linkAppend();
        that._axesGroup.linkAppend();
        that._constantLinesGroup.linkAppend();
        that._labelAxesGroup.linkAppend();
        that._scaleBreaksGroup.linkAppend()
    },
    _populateMarginOptions: function() {
        var that = this;
        var bubbleSize = estimateBubbleSize(that.getSize(), that.panes.length, that._themeManager.getOptions("maxBubbleSize"), that._isRotated());
        var argumentMarginOptions = {};
        that._valueAxes.forEach(function(valueAxis) {
            var groupSeries = that.series.filter(function(series) {
                return series.getValueAxis() === valueAxis
            });
            var marginOptions = {};
            groupSeries.forEach(function(series) {
                if (series.isVisible()) {
                    var seriesMarginOptions = processBubbleMargin(series.getMarginOptions(), bubbleSize);
                    marginOptions = (0, _utils.mergeMarginOptions)(marginOptions, seriesMarginOptions);
                    argumentMarginOptions = (0, _utils.mergeMarginOptions)(argumentMarginOptions, seriesMarginOptions)
                }
            });
            valueAxis.setMarginOptions(marginOptions)
        });
        that._argumentAxes.forEach(function(a) {
            return a.setMarginOptions(argumentMarginOptions)
        })
    },
    _populateBusinessRange: function(updatedAxis, keepRange) {
        var that = this;
        var rotated = that._isRotated();
        var series = that._getVisibleSeries();
        var argRanges = {};
        var commonArgRange = new _range.Range({
            rotated: !!rotated
        });
        var getPaneName = function(axis) {
            return axis.pane || DEFAULT_PANE_NAME
        };
        that.panes.forEach(function(p) {
            return argRanges[p.name] = new _range.Range({
                rotated: !!rotated
            })
        });
        that._valueAxes.forEach(function(valueAxis) {
            var groupRange = new _range.Range({
                rotated: !!rotated,
                pane: valueAxis.pane,
                axis: valueAxis.name
            });
            var groupSeries = series.filter(function(series) {
                return series.getValueAxis() === valueAxis
            });
            groupSeries.forEach(function(series) {
                var seriesRange = series.getRangeData();
                groupRange.addRange(seriesRange.val);
                argRanges[getPaneName(valueAxis)].addRange(seriesRange.arg)
            });
            if (!updatedAxis || updatedAxis && groupSeries.length && valueAxis === updatedAxis) {
                valueAxis.setGroupSeries(groupSeries);
                valueAxis.setBusinessRange(groupRange, that._axesReinitialized || keepRange, that._argumentAxes[0]._lastVisualRangeUpdateMode)
            }
        });
        if (!updatedAxis || updatedAxis && series.length) {
            Object.keys(argRanges).forEach(function(p) {
                return commonArgRange.addRange(argRanges[p])
            });
            var commonInterval = commonArgRange.interval;
            that._argumentAxes.forEach(function(a) {
                var _argRanges$getPaneNam;
                var currentInterval = null !== (_argRanges$getPaneNam = argRanges[getPaneName(a)].interval) && void 0 !== _argRanges$getPaneNam ? _argRanges$getPaneNam : commonInterval;
                a.setBusinessRange(new _range.Range(_objectSpread(_objectSpread({}, commonArgRange), {}, {
                    interval: currentInterval
                })), that._axesReinitialized, void 0, that._groupsData.categories)
            })
        }
        that._populateMarginOptions()
    },
    getArgumentAxis: function() {
        return (this._argumentAxes || []).filter(function(a) {
            return !a.isVirtual
        })[0]
    },
    getValueAxis: function(name) {
        var _this2 = this;
        return (this._valueAxes || []).filter((0, _type.isDefined)(name) ? function(a) {
            return a.name === name
        } : function(a) {
            return a.pane === _this2.defaultPane
        })[0]
    },
    _getGroupsData: function() {
        var that = this;
        var groups = [];
        that._valueAxes.forEach(function(axis) {
            groups.push({
                series: that.series.filter(function(series) {
                    return series.getValueAxis() === axis
                }),
                valueAxis: axis,
                valueOptions: axis.getOptions()
            })
        });
        return {
            groups: groups,
            argumentAxes: that._argumentAxes,
            argumentOptions: that._argumentAxes[0].getOptions()
        }
    },
    _groupSeries: function() {
        var that = this;
        that._correctValueAxes(false);
        that._groupsData = that._getGroupsData()
    },
    _processValueAxisFormat: function() {
        var axesWithFullStackedFormat = [];
        this.series.forEach(function(series) {
            var axis = series.getValueAxis();
            if (series.isFullStackedSeries()) {
                axis.setPercentLabelFormat();
                axesWithFullStackedFormat.push(axis)
            }
        });
        this._valueAxes.forEach(function(axis) {
            if (axesWithFullStackedFormat.indexOf(axis) === -1) {
                axis.resetAutoLabelFormat()
            }
        })
    },
    _populateAxesOptions: function(typeSelector, userOptions, axisOptions, rotated, virtual) {
        var that = this;
        var preparedUserOptions = that._prepareStripsAndConstantLines(typeSelector, userOptions, rotated);
        var options = (0, _extend2.extend)(true, {}, preparedUserOptions, axisOptions, that._prepareAxisOptions(typeSelector, preparedUserOptions, rotated));
        if (virtual) {
            options.visible = options.tick.visible = options.minorTick.visible = options.label.visible = false;
            options.title = {}
        }
        return options
    },
    _getValFilter: function(series) {
        return _range_data_calculator.default.getViewPortFilter(series.getValueAxis().visualRange() || {})
    },
    _createAxis: function(isArgumentAxes, options, virtual) {
        var that = this;
        var typeSelector = isArgumentAxes ? "argumentAxis" : "valueAxis";
        var renderingSettings = (0, _extend2.extend)({
            renderer: that._renderer,
            incidentOccurred: that._incidentOccurred,
            eventTrigger: that._eventTrigger,
            axisClass: isArgumentAxes ? "arg" : "val",
            widgetClass: "dxc",
            stripsGroup: that._stripsGroup,
            labelAxesGroup: that._labelAxesGroup,
            constantLinesGroup: that._constantLinesGroup,
            scaleBreaksGroup: that._scaleBreaksGroup,
            axesContainerGroup: that._axesGroup,
            gridGroup: that._gridGroup,
            isArgumentAxis: isArgumentAxes,
            getTemplate: function() {
                return that._getTemplate(options.label.template)
            }
        }, that._getAxisRenderingOptions(typeSelector));
        var axis = new _base_axis.Axis(renderingSettings);
        axis.updateOptions(options);
        axis.isVirtual = virtual;
        return axis
    },
    _applyVisualRangeByVirtualAxes: function(axis, range) {
        return false
    },
    _applyCustomVisualRangeOption: function(axis, range) {
        var that = this;
        if (axis.getOptions().optionPath) {
            that._parseVisualRangeOption("".concat(axis.getOptions().optionPath, ".visualRange"), range)
        }
    },
    _getVisualRangeSetter: function() {
        var chart = this;
        return function(axis, _ref2) {
            var skipEventRising = _ref2.skipEventRising,
                range = _ref2.range;
            chart._applyCustomVisualRangeOption(axis, range);
            axis.setCustomVisualRange(range);
            axis.skipEventRising = skipEventRising;
            if (!chart._applyVisualRangeByVirtualAxes(axis, range)) {
                if (chart._applyingChanges) {
                    chart._change_VISUAL_RANGE()
                } else {
                    chart._requestChange([VISUAL_RANGE])
                }
            }
        }
    },
    _getTrackerSettings: function() {
        return (0, _extend2.extend)(this.callBase(), {
            argumentAxis: this.getArgumentAxis()
        })
    },
    _prepareStripsAndConstantLines: function(typeSelector, userOptions, rotated) {
        userOptions = this._themeManager.getOptions(typeSelector, userOptions, rotated);
        if (userOptions.strips) {
            (0, _iterator.each)(userOptions.strips, function(i) {
                userOptions.strips[i] = (0, _extend2.extend)(true, {}, userOptions.stripStyle, userOptions.strips[i])
            })
        }
        if (userOptions.constantLines) {
            (0, _iterator.each)(userOptions.constantLines, function(i, line) {
                userOptions.constantLines[i] = (0, _extend2.extend)(true, {}, userOptions.constantLineStyle, line)
            })
        }
        return userOptions
    },
    refresh: function() {
        this._disposeAxes();
        this.callBase()
    },
    _layoutAxes: function(drawAxes) {
        var that = this;
        drawAxes();
        var needSpace = that.checkForMoreSpaceForPanesCanvas();
        if (needSpace) {
            var rect = this._rect.slice();
            var size = this._layout.backward(rect, rect, [needSpace.width, needSpace.height]);
            needSpace.width = Math.max(0, size[0]);
            needSpace.height = Math.max(0, size[1]);
            this._canvas = this._createCanvasFromRect(rect);
            drawAxes(needSpace)
        }
    },
    checkForMoreSpaceForPanesCanvas: function() {
        return this.layoutManager.needMoreSpaceForPanesCanvas(this._getLayoutTargets(), this._isRotated())
    },
    _parseVisualRangeOption: function(fullName, value) {
        var that = this;
        var name = fullName.split(/[.[]/)[0];
        var index = fullName.match(/\d+/g);
        index = (0, _type.isDefined)(index) ? parseInt(index[0]) : index;
        if (fullName.indexOf("visualRange") > 0) {
            if ("object" !== (0, _type.type)(value)) {
                value = wrapVisualRange(fullName, value) || value
            }
            that._setCustomVisualRange(name, index, value)
        } else {
            if (("object" === (0, _type.type)(value) || _isArray(value)) && name.indexOf("Axis") > 0 && JSON.stringify(value).indexOf("visualRange") > 0) {
                if ((0, _type.isDefined)(value.visualRange)) {
                    that._setCustomVisualRange(name, index, value.visualRange)
                } else {
                    if (_isArray(value)) {
                        value.forEach(function(a, i) {
                            return (0, _type.isDefined)(a.visualRange) && that._setCustomVisualRange(name, i, a.visualRange)
                        })
                    }
                }
            }
        }
    },
    _setCustomVisualRange: function(axesName, index, value) {
        var that = this;
        var options = that._options.silent(axesName);
        if (!options) {
            return
        }
        if (!(0, _type.isDefined)(index)) {
            options._customVisualRange = value
        } else {
            options[index]._customVisualRange = value
        }
        that._axesReinitialized = true
    },
    _raiseZoomEndHandlers: function() {
        this._valueAxes.forEach(function(axis) {
            return axis.handleZoomEnd()
        })
    },
    _setOptionsByReference: function() {
        this.callBase();
        (0, _extend2.extend)(this._optionsByReference, {
            "valueAxis.visualRange": true
        })
    },
    _notifyOptionChanged: function(option, value, previousValue) {
        this.callBase.apply(this, arguments);
        if (!this._optionChangedLocker) {
            this._parseVisualRangeOption(option, value)
        }
    },
    _notifyVisualRange: function() {
        var that = this;
        that._valueAxes.forEach(function(axis) {
            var axisPath = axis.getOptions().optionPath;
            if (axisPath) {
                var path = "".concat(axisPath, ".visualRange");
                var visualRange = (0, _utils.convertVisualRangeObject)(axis.visualRange(), !_isArray(that.option(path)));
                if (!axis.skipEventRising || !(0, _utils.rangesAreEqual)(visualRange, that.option(path))) {
                    if (!that.option(axisPath) && "valueAxis" !== axisPath) {
                        that.option(axisPath, {
                            name: axis.name,
                            visualRange: visualRange
                        })
                    } else {
                        that.option(path, visualRange)
                    }
                } else {
                    axis.skipEventRising = null
                }
            }
        })
    },
    _notify: function() {
        this.callBase();
        this._axesReinitialized = false;
        if (true !== this.option("disableTwoWayBinding")) {
            this._notifyVisualRange()
        }
    },
    _getAxesForScaling: function() {
        return this._valueAxes
    },
    _getAxesByOptionPath: function(arg, isDirectOption, optionName) {
        var that = this;
        var sourceAxes = that._getAxesForScaling();
        var axes = [];
        if (isDirectOption) {
            var axisPath;
            if (arg.fullName) {
                axisPath = arg.fullName.slice(0, arg.fullName.indexOf("."))
            }
            axes = sourceAxes.filter(function(a) {
                return a.getOptions().optionPath === axisPath
            })
        } else {
            if ("object" === (0, _type.type)(arg.value)) {
                axes = sourceAxes.filter(function(a) {
                    return a.getOptions().optionPath === arg.name
                })
            } else {
                if (_isArray(arg.value)) {
                    arg.value.forEach(function(v, index) {
                        var axis = sourceAxes.filter(function(a) {
                            return a.getOptions().optionPath === "".concat(arg.name, "[").concat(index, "]")
                        })[0];
                        (0, _type.isDefined)(v[optionName]) && (0, _type.isDefined)(axis) && (axes[index] = axis)
                    })
                }
            }
        }
        return axes
    },
    _optionChanged: function(arg) {
        var that = this;
        if (!that._optionChangedLocker) {
            var optionName = "visualRange";
            var axes;
            var isDirectOption = arg.fullName.indexOf(optionName) > 0 ? true : that.getPartialChangeOptionsName(arg).indexOf(optionName) > -1 ? false : void 0;
            if ((0, _type.isDefined)(isDirectOption)) {
                axes = that._getAxesByOptionPath(arg, isDirectOption, optionName);
                if (axes) {
                    if (axes.length > 1 || _isArray(arg.value)) {
                        axes.forEach(function(a, index) {
                            return setAxisVisualRangeByOption(arg, a, isDirectOption, index)
                        })
                    } else {
                        if (1 === axes.length) {
                            setAxisVisualRangeByOption(arg, axes[0], isDirectOption)
                        }
                    }
                }
            }
        }
        that.callBase(arg)
    },
    _change_VISUAL_RANGE: function() {
        var that = this;
        that._recreateSizeDependentObjects(false);
        if (!that._changes.has("FULL_RENDER")) {
            var resizePanesOnZoom = that.option("resizePanesOnZoom");
            that._doRender({
                force: true,
                drawTitle: false,
                drawLegend: false,
                adjustAxes: null !== resizePanesOnZoom && void 0 !== resizePanesOnZoom ? resizePanesOnZoom : that.option("adjustAxesOnZoom") || false,
                animate: false
            });
            that._raiseZoomEndHandlers()
        }
    },
    resetVisualRange: function() {
        var that = this;
        that._valueAxes.forEach(function(axis) {
            axis.resetVisualRange(false);
            that._applyCustomVisualRangeOption(axis)
        });
        that._requestChange([VISUAL_RANGE])
    },
    _legendDataField: "series",
    _adjustSeriesLabels: _common.noop,
    _correctValueAxes: _common.noop
});
exports.AdvancedChart = AdvancedChart;
