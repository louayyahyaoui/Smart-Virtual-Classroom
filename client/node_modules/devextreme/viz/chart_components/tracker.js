/**
 * DevExtreme (viz/chart_components/tracker.js)
 * Version: 20.2.6
 * Build date: Tue Mar 16 2021
 *
 * Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
exports.PieTracker = exports.ChartTracker = void 0;
var _dom_adapter = _interopRequireDefault(require("../../core/dom_adapter"));
var _events_engine = _interopRequireDefault(require("../../events/core/events_engine"));
var _click = require("../../events/click");
var _extend = require("../../core/utils/extend");
var _iterator = require("../../core/utils/iterator");
var _consts = _interopRequireDefault(require("../components/consts"));
var _utils = require("../core/utils");
var _pointer = _interopRequireDefault(require("../../events/pointer"));
var _index = require("../../events/utils/index");
var _type = require("../../core/utils/type");
var _common = require("../../core/utils/common");

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        "default": obj
    }
}
var _floor = Math.floor;
var eventsConsts = _consts.default.events;
var statesConsts = _consts.default.states;
var HOVER_STATE = statesConsts.hoverMark;
var NORMAL_STATE = statesConsts.normalMark;
var EVENT_NS = "dxChartTracker";
var DOT_EVENT_NS = "." + EVENT_NS;
var POINTER_ACTION = (0, _index.addNamespace)([_pointer.default.down, _pointer.default.move], EVENT_NS);
var LEGEND_CLICK = "legendClick";
var SERIES_CLICK = "seriesClick";
var POINT_CLICK = "pointClick";
var POINT_DATA = "chart-data-point";
var SERIES_DATA = "chart-data-series";
var ARG_DATA = "chart-data-argument";
var DELAY = 100;
var HOLD_TIMEOUT = 300;
var NONE_MODE = "none";
var ALL_ARGUMENT_POINTS_MODE = "allargumentpoints";
var INCLUDE_POINTS_MODE = "includepoints";
var EXLUDE_POINTS_MODE = "excludepoints";
var LEGEND_HOVER_MODES = [INCLUDE_POINTS_MODE, EXLUDE_POINTS_MODE, NONE_MODE];

function getData(event, dataKey, tryCheckParent) {
    var target = event.target;
    if ("tspan" === target.tagName) {
        return target.parentNode[dataKey]
    }
    var data = target[dataKey];
    if (tryCheckParent && !(0, _type.isDefined)(data)) {
        var getParentData = function getParentData(node) {
            if (node.parentNode) {
                if ((0, _type.isDefined)(node.parentNode[dataKey])) {
                    return node.parentNode[dataKey]
                } else {
                    return getParentData(node.parentNode)
                }
            }
            return
        };
        return getParentData(target)
    }
    return data
}

function eventCanceled(event, target) {
    return event.cancel || !target.getOptions()
}

function correctLegendHoverMode(mode) {
    if (LEGEND_HOVER_MODES.indexOf(mode) > -1) {
        return mode
    } else {
        return INCLUDE_POINTS_MODE
    }
}

function correctHoverMode(target) {
    var mode = target.getOptions().hoverMode;
    return mode === NONE_MODE ? mode : ALL_ARGUMENT_POINTS_MODE
}
var baseTrackerPrototype = {
    ctor: function(options) {
        var that = this;
        var data = {
            tracker: that
        };
        that._renderer = options.renderer;
        that._legend = options.legend;
        that._tooltip = options.tooltip;
        that._eventTrigger = options.eventTrigger;
        that._seriesGroup = options.seriesGroup;
        options.seriesGroup.off(DOT_EVENT_NS).on((0, _index.addNamespace)(eventsConsts.showPointTooltip, EVENT_NS), data, that._showPointTooltip).on((0, _index.addNamespace)(eventsConsts.hidePointTooltip, EVENT_NS), data, that._hidePointTooltip);
        that._renderer.root.off(DOT_EVENT_NS).on(POINTER_ACTION, data, that._pointerHandler).on((0, _index.addNamespace)(_pointer.default.up, EVENT_NS), function() {
            return clearTimeout(that._holdTimer)
        }).on((0, _index.addNamespace)(_click.name, EVENT_NS), data, that._clickHandler)
    },
    update: function(options) {
        this._chart = options.chart
    },
    updateSeries: function(series, resetDecorations) {
        var that = this;
        var noHoveredSeries = !(null !== series && void 0 !== series && series.some(function(s) {
            return s === that.hoveredSeries
        }) || that._hoveredPoint && that._hoveredPoint.series);
        if (that._storedSeries !== series) {
            that._storedSeries = series || []
        }
        if (noHoveredSeries) {
            that._clean();
            that._renderer.initHatching()
        }
        if (resetDecorations) {
            that.clearSelection();
            if (!noHoveredSeries) {
                that._hideTooltip(that.pointAtShownTooltip);
                that.clearHover()
            }
        }
    },
    setCanvases: function(mainCanvas, paneCanvases) {
        this._mainCanvas = mainCanvas;
        this._canvases = paneCanvases
    },
    repairTooltip: function() {
        var point = this.pointAtShownTooltip;
        if (!point || !point.series || !point.isVisible()) {
            this._hideTooltip(point, true)
        } else {
            this._showTooltip(point)
        }
    },
    _setHoveredPoint: function(point) {
        if (point === this._hoveredPoint) {
            return
        }
        this._releaseHoveredPoint();
        point.hover();
        this._hoveredPoint = point
    },
    _releaseHoveredPoint: function() {
        if (this._hoveredPoint && this._hoveredPoint.getOptions()) {
            this._hoveredPoint.clearHover();
            this._hoveredPoint = null;
            if (this._tooltip.isEnabled()) {
                this._hideTooltip(this._hoveredPoint)
            }
        }
    },
    _setHoveredSeries: function(series, mode) {
        this._releaseHoveredSeries();
        this._releaseHoveredPoint();
        series.hover(mode);
        this.hoveredSeries = series
    },
    _releaseHoveredSeries: function() {
        if (this.hoveredSeries) {
            this.hoveredSeries.clearHover();
            this.hoveredSeries = null
        }
    },
    clearSelection: function() {
        this._storedSeries.forEach(function(series) {
            if (series) {
                series.clearSelection();
                series.getPoints().forEach(function(point) {
                    return point.clearSelection()
                })
            }
        })
    },
    _clean: function() {
        var that = this;
        that.hoveredPoint = that.hoveredSeries = that._hoveredArgumentPoints = null;
        that._hideTooltip(that.pointAtShownTooltip)
    },
    clearHover: function() {
        this._resetHoveredArgument();
        this._releaseHoveredSeries();
        this._releaseHoveredPoint()
    },
    _hideTooltip: function(point, silent) {
        var that = this;
        if (!that._tooltip || point && that.pointAtShownTooltip !== point) {
            return
        }
        if (!silent && that.pointAtShownTooltip) {
            that.pointAtShownTooltip = null
        }
        that._tooltip.hide()
    },
    _showTooltip: function(point) {
        var that = this;
        var tooltipFormatObject;
        var eventData = {
            target: point
        };
        if (null !== point && void 0 !== point && point.getOptions()) {
            tooltipFormatObject = point.getTooltipFormatObject(that._tooltip, that._tooltip.isShared() && that._chart.getStackedPoints(point));
            if (!(0, _type.isDefined)(tooltipFormatObject.valueText) && !tooltipFormatObject.points || !point.isVisible()) {
                return
            }
            var coords = point.getTooltipParams(that._tooltip.getLocation());
            var rootOffset = that._renderer.getRootOffset();
            coords.x += rootOffset.left;
            coords.y += rootOffset.top;
            var callback = function(result) {
                result && (that.pointAtShownTooltip = point)
            };
            callback(that._tooltip.show(tooltipFormatObject, coords, eventData, void 0, callback))
        }
    },
    _showPointTooltip: function(event, point) {
        var that = event.data.tracker;
        var pointWithTooltip = that.pointAtShownTooltip;
        if (pointWithTooltip && pointWithTooltip !== point) {
            that._hideTooltip(pointWithTooltip)
        }
        that._showTooltip(point)
    },
    _hidePointTooltip: function(event, point) {
        event.data.tracker._hideTooltip(point)
    },
    _enableOutHandler: function() {
        if (this._outHandler) {
            return
        }
        var that = this;
        var handler = function(e) {
            var rootOffset = that._renderer.getRootOffset();
            var x = _floor(e.pageX - rootOffset.left);
            var y = _floor(e.pageY - rootOffset.top);
            if (!(0, _utils.pointInCanvas)(that._mainCanvas, x, y) && !that._tooltip.isCursorOnTooltip(e.pageX, e.pageY)) {
                that._pointerOut();
                that._disableOutHandler()
            }
        };
        _events_engine.default.on(_dom_adapter.default.getDocument(), POINTER_ACTION, handler);
        this._outHandler = handler
    },
    _disableOutHandler: function() {
        this._outHandler && _events_engine.default.off(_dom_adapter.default.getDocument(), POINTER_ACTION, this._outHandler);
        this._outHandler = null
    },
    stopCurrentHandling: function() {
        this._pointerOut(true)
    },
    _pointerOut: function(force) {
        this.clearHover();
        (force || this._tooltip.isEnabled()) && this._hideTooltip(this.pointAtShownTooltip)
    },
    _triggerLegendClick: function(eventArgs, elementClick) {
        var eventTrigger = this._eventTrigger;
        eventTrigger(LEGEND_CLICK, eventArgs, function() {
            !eventCanceled(eventArgs.event, eventArgs.target) && eventTrigger(elementClick, eventArgs)
        })
    },
    _hoverLegendItem: function(x, y) {
        var that = this;
        var item = that._legend.getItemByCoord(x, y);
        var series;
        var legendHoverMode = correctLegendHoverMode(that._legend.getOptions().hoverMode);
        if (item) {
            series = that._storedSeries[item.id];
            if (!series.isHovered() || series.lastHoverMode !== legendHoverMode) {
                that._setHoveredSeries(series, legendHoverMode)
            }
            that._tooltip.isEnabled() && that._hideTooltip(that.pointAtShownTooltip)
        } else {
            that.clearHover()
        }
    },
    _hoverArgument: function(argument, argumentIndex) {
        var that = this;
        var hoverMode = that._getArgumentHoverMode();
        if ((0, _type.isDefined)(argument)) {
            that._releaseHoveredPoint();
            that._hoveredArgument = argument;
            that._argumentIndex = argumentIndex;
            that._notifySeries({
                action: "pointHover",
                notifyLegend: that._notifyLegendOnHoverArgument,
                target: {
                    argument: argument,
                    fullState: HOVER_STATE,
                    argumentIndex: argumentIndex,
                    getOptions: function() {
                        return {
                            hoverMode: hoverMode
                        }
                    }
                }
            })
        }
    },
    _resetHoveredArgument: function() {
        var that = this;
        var hoverMode;
        if ((0, _type.isDefined)(that._hoveredArgument)) {
            hoverMode = that._getArgumentHoverMode();
            that._notifySeries({
                action: "clearPointHover",
                notifyLegend: that._notifyLegendOnHoverArgument,
                target: {
                    fullState: NORMAL_STATE,
                    argumentIndex: that._argumentIndex,
                    argument: that._hoveredArgument,
                    getOptions: function() {
                        return {
                            hoverMode: hoverMode
                        }
                    }
                }
            });
            that._hoveredArgument = null
        }
    },
    _notifySeries: function(data) {
        this._storedSeries.forEach(function(series) {
            series.notify(data)
        })
    },
    _pointerHandler: function(e) {
        var _series;
        var that = e.data.tracker;
        var rootOffset = that._renderer.getRootOffset();
        var x = _floor(e.pageX - rootOffset.left);
        var y = _floor(e.pageY - rootOffset.top);
        var canvas = that._getCanvas(x, y);
        var series = getData(e, SERIES_DATA);
        var point = getData(e, POINT_DATA) || (null === (_series = series) || void 0 === _series ? void 0 : _series.getPointByCoord(x, y));
        that._isHolding = false;
        clearTimeout(that._holdTimer);
        if (e.type === _pointer.default.down) {
            that._holdTimer = setTimeout(function() {
                return that._isHolding = true
            }, HOLD_TIMEOUT)
        }
        if (point && !point.getMarkerVisibility()) {
            point = void 0
        }
        that._enableOutHandler();
        if (that._legend.coordsIn(x, y)) {
            that._hoverLegendItem(x, y);
            return
        }
        if (that.hoveredSeries && that.hoveredSeries !== that._stuckSeries) {
            that._releaseHoveredSeries()
        }
        if (that._hoverArgumentAxis(x, y, e)) {
            return
        }
        if (that._isPointerOut(canvas, point)) {
            that._pointerOut()
        }
        if (!canvas && !point) {
            return
        }
        if (series && !point) {
            point = series.getNeighborPoint(x, y);
            if (!that._stickyHovering && point && !point.coordsIn(x, y)) {
                point = null
            }
            if (series !== that.hoveredSeries) {
                that._setTimeout(function() {
                    that._setHoveredSeries(series);
                    that._setStuckSeries(e, series, x, y);
                    that._pointerComplete(point, x, y)
                }, series);
                return
            }
        } else {
            if (point) {
                if (e.type !== _pointer.default.move && "touch" !== e.pointerType) {
                    return
                }
                if (that.hoveredSeries) {
                    that._setTimeout(function() {
                        return that._pointerOnPoint(point, x, y, e)
                    }, point)
                } else {
                    that._pointerOnPoint(point, x, y, e)
                }
                return
            } else {
                if (that._setStuckSeries(e, void 0, x, y) && that._stickyHovering) {
                    var _point;
                    series = that._stuckSeries;
                    point = series.getNeighborPoint(x, y);
                    that._releaseHoveredSeries();
                    (null === (_point = point) || void 0 === _point ? void 0 : _point.getMarkerVisibility()) && that._setHoveredPoint(point)
                } else {
                    if (!that._stickyHovering) {
                        that._pointerOut()
                    }
                }
            }
        }
        that._pointerComplete(point, x, y)
    },
    _pointerOnPoint: function(point, x, y) {
        this._resetHoveredArgument();
        this._setHoveredPoint(point);
        this._pointerComplete(point, x, y)
    },
    _pointerComplete: function(point) {
        this.pointAtShownTooltip !== point && this._tooltip.isEnabled() && this._showTooltip(point)
    },
    _clickHandler: function(e) {
        var _point2;
        var that = e.data.tracker;
        if (that._isHolding) {
            return
        }
        var rootOffset = that._renderer.getRootOffset();
        var x = _floor(e.pageX - rootOffset.left);
        var y = _floor(e.pageY - rootOffset.top);
        var point = getData(e, POINT_DATA);
        var series = that._stuckSeries || getData(e, SERIES_DATA) || (null === (_point2 = point) || void 0 === _point2 ? void 0 : _point2.series);
        var axis = that._argumentAxis;
        if (that._legend.coordsIn(x, y)) {
            var item = that._legend.getItemByCoord(x, y);
            if (item) {
                that._legendClick(item, e)
            }
        } else {
            if (null !== axis && void 0 !== axis && axis.coordsIn(x, y)) {
                var argument = getData(e, ARG_DATA, true);
                if ((0, _type.isDefined)(argument)) {
                    that._eventTrigger("argumentAxisClick", {
                        argument: argument,
                        event: e
                    })
                }
            } else {
                if (series) {
                    var _point3;
                    point = point || series.getPointByCoord(x, y);
                    if (null !== (_point3 = point) && void 0 !== _point3 && _point3.getMarkerVisibility()) {
                        that._pointClick(point, e)
                    } else {
                        getData(e, SERIES_DATA) && that._eventTrigger(SERIES_CLICK, {
                            target: series,
                            event: e
                        })
                    }
                }
            }
        }
    },
    dispose: function() {
        var that = this;
        that._disableOutHandler();
        that._renderer.root.off(DOT_EVENT_NS);
        that._seriesGroup.off(DOT_EVENT_NS)
    }
};
var ChartTracker = function(options) {
    this.ctor(options)
};
exports.ChartTracker = ChartTracker;
(0, _extend.extend)(ChartTracker.prototype, baseTrackerPrototype, {
    _pointClick: function(point, event) {
        var that = this;
        var eventTrigger = that._eventTrigger;
        var series = point.series;
        eventTrigger(POINT_CLICK, {
            target: point,
            event: event
        }, function() {
            !eventCanceled(event, series) && eventTrigger(SERIES_CLICK, {
                target: series,
                event: event
            })
        })
    },
    update: function(options) {
        var that = this;
        baseTrackerPrototype.update.call(this, options);
        that._argumentAxis = options.argumentAxis || {};
        that._axisHoverEnabled = that._argumentAxis && (0, _utils.normalizeEnum)(that._argumentAxis.getOptions().hoverMode) === ALL_ARGUMENT_POINTS_MODE;
        that._rotated = options.rotated;
        that._crosshair = options.crosshair;
        that._stickyHovering = options.stickyHovering
    },
    _getCanvas: function(x, y) {
        var that = this;
        var canvases = that._canvases || [];
        for (var i = 0; i < canvases.length; i++) {
            var c = canvases[i];
            if ((0, _utils.pointInCanvas)(c, x, y)) {
                return c
            }
        }
        return null
    },
    _isPointerOut: function(canvas) {
        return !canvas && this._stuckSeries
    },
    _hideCrosshair: function() {
        var _this$_crosshair;
        null === (_this$_crosshair = this._crosshair) || void 0 === _this$_crosshair ? void 0 : _this$_crosshair.hide()
    },
    _moveCrosshair: function(point, x, y) {
        if (this._crosshair && null !== point && void 0 !== point && point.isVisible()) {
            this._crosshair.show({
                point: point,
                x: x,
                y: y
            })
        }
    },
    _clean: function() {
        var that = this;
        baseTrackerPrototype._clean.call(that);
        that._resetTimer();
        that._stuckSeries = null
    },
    _getSeriesForShared: function(x, y) {
        var _point4;
        var that = this;
        var points = [];
        var point = null;
        var distance = 1 / 0;
        if (that._tooltip.isShared() && !that.hoveredSeries) {
            (0, _iterator.each)(that._storedSeries, function(_, series) {
                var point = series.getNeighborPoint(x, y);
                point && points.push(point)
            });
            (0, _iterator.each)(points, function(_, p) {
                var coords = p.getCrosshairData(x, y);
                var d = (0, _utils.getDistance)(x, y, coords.x, coords.y);
                if (d < distance) {
                    point = p;
                    distance = d
                }
            })
        }
        return null === (_point4 = point) || void 0 === _point4 ? void 0 : _point4.series
    },
    _setTimeout: function(callback, keeper) {
        var that = this;
        if (that._timeoutKeeper !== keeper) {
            that._resetTimer();
            that._hoverTimeout = setTimeout(function() {
                callback();
                that._timeoutKeeper = null
            }, DELAY);
            that._timeoutKeeper = keeper
        }
    },
    _resetTimer: function() {
        clearTimeout(this._hoverTimeout);
        this._timeoutKeeper = this._hoverTimeout = null
    },
    _stopEvent: function(e) {
        if (!(0, _type.isDefined)(e.cancelable) || e.cancelable) {
            e.preventDefault();
            e.stopPropagation()
        }
    },
    _setStuckSeries: function(e, series, x, y) {
        if ("mouse" !== e.pointerType) {
            this._stuckSeries = null
        } else {
            this._stuckSeries = series || this._stuckSeries || this._getSeriesForShared(x, y)
        }
        return !!this._stuckSeries
    },
    _pointerOut: function() {
        var that = this;
        that._stuckSeries = null;
        that._hideCrosshair();
        that._resetTimer();
        baseTrackerPrototype._pointerOut.apply(that, arguments)
    },
    _hoverArgumentAxis: function(x, y, e) {
        var that = this;
        that._resetHoveredArgument();
        if (that._axisHoverEnabled && that._argumentAxis.coordsIn(x, y)) {
            that._hoverArgument(getData(e, ARG_DATA, true));
            return true
        }
    },
    _pointerComplete: function(point, x, y) {
        var that = this;
        that.hoveredSeries && that.hoveredSeries.updateHover(x, y);
        that._resetTimer();
        that._moveCrosshair(point, x, y);
        baseTrackerPrototype._pointerComplete.call(that, point)
    },
    _legendClick: function(item, e) {
        var series = this._storedSeries[item.id];
        this._triggerLegendClick({
            target: series,
            event: e
        }, SERIES_CLICK)
    },
    _hoverLegendItem: function(x, y) {
        this._stuckSeries = null;
        this._hideCrosshair();
        baseTrackerPrototype._hoverLegendItem.call(this, x, y)
    },
    _pointerOnPoint: function(point, x, y, e) {
        this._setStuckSeries(e, point.series, x, y);
        this._releaseHoveredSeries();
        baseTrackerPrototype._pointerOnPoint.call(this, point, x, y, e)
    },
    _notifyLegendOnHoverArgument: false,
    _getArgumentHoverMode: function() {
        return correctHoverMode(this._argumentAxis)
    },
    dispose: function() {
        this._resetTimer();
        baseTrackerPrototype.dispose.call(this)
    }
});
var PieTracker = function(options) {
    this.ctor(options)
};
exports.PieTracker = PieTracker;
(0, _extend.extend)(PieTracker.prototype, baseTrackerPrototype, {
    _isPointerOut: function(_, point) {
        return !point
    },
    _legendClick: function(item, e) {
        var that = this;
        var points = [];
        that._storedSeries.forEach(function(s) {
            return points.push.apply(points, s.getPointsByKeys(item.argument, item.argumentIndex))
        });
        that._eventTrigger(LEGEND_CLICK, {
            target: item.argument,
            points: points,
            event: e
        })
    },
    _pointClick: function(point, e) {
        this._eventTrigger(POINT_CLICK, {
            target: point,
            event: e
        })
    },
    _hoverLegendItem: function(x, y) {
        var that = this;
        var item = that._legend.getItemByCoord(x, y);
        if (item && that._hoveredArgument !== item.argument) {
            that._resetHoveredArgument();
            that._hoverArgument(item.argument, item.argumentIndex)
        } else {
            if (!item) {
                that.clearHover()
            }
        }
    },
    _getArgumentHoverMode: function() {
        return correctHoverMode(this._legend)
    },
    _hoverArgumentAxis: _common.noop,
    _setStuckSeries: _common.noop,
    _getCanvas: _common.noop,
    _notifyLegendOnHoverArgument: true
});
