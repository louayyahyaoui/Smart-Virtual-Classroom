/**
 * DevExtreme (viz/chart_components/zoom_and_pan.js)
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
exports.default = void 0;
var _type = require("../../core/utils/type");
var _extend = require("../../core/utils/extend");
var _utils = require("../core/utils");
var _wheel = require("../../events/core/wheel");
var transformEvents = _interopRequireWildcard(require("../../events/transform"));
var _drag = require("../../events/drag");

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
var EVENTS_NS = ".zoomAndPanNS";
var DRAG_START_EVENT_NAME = _drag.start + EVENTS_NS;
var DRAG_EVENT_NAME = _drag.move + EVENTS_NS;
var DRAG_END_EVENT_NAME = _drag.end + EVENTS_NS;
var PINCH_START_EVENT_NAME = transformEvents.pinchstart + EVENTS_NS;
var PINCH_EVENT_NAME = transformEvents.pinch + EVENTS_NS;
var PINCH_END_EVENT_NAME = transformEvents.pinchend + EVENTS_NS;
var SCROLL_BAR_START_EVENT_NAME = "dxc-scroll-start" + EVENTS_NS;
var SCROLL_BAR_MOVE_EVENT_NAME = "dxc-scroll-move" + EVENTS_NS;
var SCROLL_BAR_END_EVENT_NAME = "dxc-scroll-end" + EVENTS_NS;
var GESTURE_TIMEOUT = 300;
var MIN_DRAG_DELTA = 5;
var _min = Math.min;
var _max = Math.max;
var _abs = Math.abs;

function canvasToRect(canvas) {
    return {
        x: canvas.left,
        y: canvas.top,
        width: canvas.width - canvas.left - canvas.right,
        height: canvas.height - canvas.top - canvas.bottom
    }
}

function checkCoords(rect, coords) {
    var x = coords.x;
    var y = coords.y;
    return x >= rect.x && x <= rect.width + rect.x && y >= rect.y && y <= rect.height + rect.y
}

function sortAxes(axes, onlyAxisToNotify) {
    if (onlyAxisToNotify) {
        axes = axes.sort(function(a, b) {
            if (a === onlyAxisToNotify) {
                return -1
            }
            if (b === onlyAxisToNotify) {
                return 1
            }
            return 0
        })
    }
    return axes
}

function isNotEmptyAxisBusinessRange(axis) {
    return !axis.getTranslator().getBusinessRange().isEmpty()
}

function axisZoom(axis, onlyAxisToNotify, getRange, getParameters, actionField, scale, e) {
    var silent = onlyAxisToNotify && axis !== onlyAxisToNotify;
    var range = getRange(axis);
    var _axis$checkZoomingLow = axis.checkZoomingLowerLimitOvercome(actionField, scale, range),
        stopInteraction = _axis$checkZoomingLow.stopInteraction,
        correctedRange = _axis$checkZoomingLow.correctedRange;
    var result = axis.handleZooming(stopInteraction ? null : correctedRange, getParameters(silent), e, actionField);
    stopInteraction && axis.handleZoomEnd();
    return {
        stopInteraction: stopInteraction,
        result: result
    }
}
var _default = {
    name: "zoom_and_pan",
    init: function() {
        var chart = this;
        var renderer = this._renderer;

        function cancelEvent(e) {
            if (e.originalEvent) {
                cancelEvent(e.originalEvent)
            }
            if (false !== e.cancelable) {
                e.cancel = true
            }
        }

        function startAxesViewportChanging(zoomAndPan, actionField, e) {
            var options = zoomAndPan.options;
            var actionData = zoomAndPan.actionData;
            var axes = [];
            if (options.argumentAxis[actionField]) {
                axes.push(chart.getArgumentAxis())
            }
            if (options.valueAxis[actionField]) {
                axes = axes.concat(actionData.valueAxes)
            }
            axes.reduce(function(isPrevented, axis) {
                if (isPrevented) {
                    return isPrevented
                }
                if (isNotEmptyAxisBusinessRange(axis)) {
                    return axis.handleZooming(null, {
                        end: true
                    }, e, actionField).isPrevented
                }
                return isPrevented
            }, false) && cancelEvent(e)
        }

        function axesViewportChanging(zoomAndPan, actionField, e, offsetCalc, centerCalc) {
            function zoomAxes(axes, criteria, coordField, e, actionData) {
                var zoom = {
                    zoomed: false
                };
                criteria && axes.filter(isNotEmptyAxisBusinessRange).forEach(function(axis) {
                    var options = axis.getOptions();
                    var viewport = axis.visualRange();
                    var scale = axis.getTranslator().getEventScale(e);
                    var translate = -offsetCalc(e, actionData, coordField, scale);
                    zoom = (0, _extend.extend)(true, zoom, axis.getTranslator().zoom(translate, scale, axis.getZoomBounds()));
                    var range = axis.adjustRange((0, _utils.getVizRangeObject)([zoom.min, zoom.max]));
                    var _axis$checkZoomingLow2 = axis.checkZoomingLowerLimitOvercome(actionField, scale, range),
                        stopInteraction = _axis$checkZoomingLow2.stopInteraction,
                        correctedRange = _axis$checkZoomingLow2.correctedRange;
                    if (!(0, _type.isDefined)(viewport) || viewport.startValue.valueOf() !== correctedRange.startValue.valueOf() || viewport.endValue.valueOf() !== correctedRange.endValue.valueOf()) {
                        axis.handleZooming(stopInteraction ? null : correctedRange, {
                            start: true,
                            end: true
                        }, e, actionField);
                        if (!stopInteraction) {
                            zoom.zoomed = true;
                            zoom.deltaTranslate = translate - zoom.translate
                        }
                    } else {
                        if ("touch" === e.pointerType && "discrete" === options.type) {
                            var isMinPosition = axis.isExtremePosition(false);
                            var isMaxPosition = axis.isExtremePosition(true);
                            var zoomInEnabled = scale > 1 && !stopInteraction;
                            var zoomOutEnabled = scale < 1 && (!isMinPosition || !isMaxPosition);
                            var panningEnabled = 1 === scale && !(isMinPosition && (translate < 0 && !options.inverted || translate > 0 && options.inverted) || isMaxPosition && (translate > 0 && !options.inverted || translate < 0 && options.inverted));
                            zoom.enabled = zoomInEnabled || zoomOutEnabled || panningEnabled
                        }
                    }
                });
                return zoom
            }

            function storeOffset(e, actionData, zoom, coordField) {
                if (zoom.zoomed) {
                    actionData.offset[coordField] = (e.offset ? e.offset[coordField] : actionData.offset[coordField]) + zoom.deltaTranslate
                }
            }

            function storeCenter(center, actionData, zoom, coordField) {
                if (zoom.zoomed) {
                    actionData.center[coordField] = center[coordField] + zoom.deltaTranslate
                }
            }
            var rotated = chart.option("rotated");
            var actionData = zoomAndPan.actionData;
            var options = zoomAndPan.options;
            var argZoom = {};
            var valZoom = {};
            if (!actionData.fallback) {
                argZoom = zoomAxes(chart._argumentAxes, options.argumentAxis[actionField], rotated ? "y" : "x", e, actionData);
                valZoom = zoomAxes(actionData.valueAxes, options.valueAxis[actionField], rotated ? "x" : "y", e, actionData);
                chart._requestChange(["VISUAL_RANGE"]);
                storeOffset(e, actionData, argZoom, rotated ? "y" : "x");
                storeOffset(e, actionData, valZoom, rotated ? "x" : "y")
            }
            var center = centerCalc(e);
            storeCenter(center, actionData, argZoom, rotated ? "y" : "x");
            storeCenter(center, actionData, valZoom, rotated ? "x" : "y");
            if (!argZoom.zoomed && !valZoom.zoomed) {
                actionData.center = center
            }
            return argZoom.zoomed || valZoom.zoomed || actionData.fallback || argZoom.enabled || valZoom.enabled
        }

        function finishAxesViewportChanging(zoomAndPan, actionField, e, offsetCalc) {
            function zoomAxes(axes, criteria, coordField, actionData, onlyAxisToNotify) {
                var zoomStarted = false;
                var scale = e.scale || 1;
                var getRange = function(axis) {
                    var zoom = axis.getTranslator().zoom(-offsetCalc(e, actionData, coordField, scale), scale, axis.getZoomBounds());
                    return {
                        startValue: zoom.min,
                        endValue: zoom.max
                    }
                };
                var getParameters = function(silent) {
                    return {
                        start: true,
                        end: silent
                    }
                };
                criteria && axes.forEach(function(axis) {
                    zoomStarted = !axisZoom(axis, onlyAxisToNotify, getRange, getParameters, actionField, scale, e).stopInteraction
                });
                return zoomStarted
            }
            var rotated = chart.option("rotated");
            var actionData = zoomAndPan.actionData;
            var options = zoomAndPan.options;
            var zoomStarted = true;
            if (actionData.fallback) {
                zoomStarted &= zoomAxes(chart._argumentAxes, options.argumentAxis[actionField], rotated ? "y" : "x", actionData, chart.getArgumentAxis());
                zoomStarted |= zoomAxes(actionData.valueAxes, options.valueAxis[actionField], rotated ? "x" : "y", actionData)
            } else {
                var axes = [];
                if (options.argumentAxis[actionField]) {
                    axes.push(chart.getArgumentAxis())
                }
                if (options.valueAxis[actionField]) {
                    axes = axes.concat(actionData.valueAxes)
                }
                axes.filter(isNotEmptyAxisBusinessRange).forEach(function(axis) {
                    axis.handleZooming(null, {
                        start: true
                    }, e, actionField)
                });
                zoomStarted = zoomStarted && axes.length
            }
            zoomStarted && chart._requestChange(["VISUAL_RANGE"])
        }

        function prepareActionData(coords, action) {
            var axes = chart._argumentAxes.filter(function(axis) {
                return checkCoords(canvasToRect(axis.getCanvas()), coords)
            });
            return {
                fallback: chart._lastRenderingTime > GESTURE_TIMEOUT,
                cancel: !axes.length || !(0, _type.isDefined)(action),
                action: action,
                curAxisRect: axes.length && canvasToRect(axes[0].getCanvas()),
                valueAxes: axes.length && chart._valueAxes.filter(function(axis) {
                    return checkCoords(canvasToRect(axis.getCanvas()), coords)
                }),
                offset: {
                    x: 0,
                    y: 0
                },
                center: coords,
                startCenter: coords
            }
        }

        function getPointerCoord(rect, e) {
            var rootOffset = renderer.getRootOffset();
            return {
                x: _min(_max(e.pageX - rootOffset.left, rect.x), rect.width + rect.x),
                y: _min(_max(e.pageY - rootOffset.top, rect.y), rect.height + rect.y)
            }
        }

        function calcCenterForPinch(e) {
            var rootOffset = renderer.getRootOffset();
            var x1 = e.pointers[0].pageX;
            var x2 = e.pointers[1].pageX;
            var y1 = e.pointers[0].pageY;
            var y2 = e.pointers[1].pageY;
            return {
                x: _min(x1, x2) + _abs(x2 - x1) / 2 - rootOffset.left,
                y: _min(y1, y2) + _abs(y2 - y1) / 2 - rootOffset.top
            }
        }

        function calcCenterForDrag(e) {
            var rootOffset = renderer.getRootOffset();
            return {
                x: e.pageX - rootOffset.left,
                y: e.pageY - rootOffset.top
            }
        }

        function calcOffsetForDrag(e, actionData, coordField) {
            return e.offset[coordField] - actionData.offset[coordField]
        }

        function preventDefaults(e) {
            if (false !== e.cancelable) {
                e.preventDefault();
                e.stopPropagation()
            }
            chart._stopCurrentHandling()
        }
        var zoomAndPan = {
            dragStartHandler: function(e) {
                var options = zoomAndPan.options;
                var isTouch = "touch" === e.pointerType;
                var wantPan = options.argumentAxis.pan || options.valueAxis.pan;
                var wantZoom = options.argumentAxis.zoom || options.valueAxis.zoom;
                var panKeyPressed = (0, _type.isDefined)(options.panKey) && e[(0, _utils.normalizeEnum)(options.panKey) + "Key"];
                var dragToZoom = options.dragToZoom;
                var action;
                e._cancelPreventDefault = true;
                if (isTouch) {
                    if (options.allowTouchGestures && wantPan) {
                        var cancelPanning = !zoomAndPan.panningVisualRangeEnabled() || zoomAndPan.skipEvent;
                        action = cancelPanning ? null : "pan"
                    }
                } else {
                    if (dragToZoom && wantPan && panKeyPressed) {
                        action = "pan"
                    } else {
                        if (!dragToZoom && wantPan) {
                            action = "pan"
                        } else {
                            if (dragToZoom && wantZoom) {
                                action = "zoom"
                            }
                        }
                    }
                }
                var actionData = prepareActionData(calcCenterForDrag(e), action);
                if (actionData.cancel) {
                    zoomAndPan.skipEvent = false;
                    if (false !== e.cancelable) {
                        e.cancel = true
                    }
                    return
                }
                zoomAndPan.actionData = actionData;
                if ("zoom" === action) {
                    actionData.startCoords = getPointerCoord(actionData.curAxisRect, e);
                    actionData.rect = renderer.rect(0, 0, 0, 0).attr(options.dragBoxStyle).append(renderer.root)
                } else {
                    startAxesViewportChanging(zoomAndPan, "pan", e)
                }
            },
            dragHandler: function(e) {
                var rotated = chart.option("rotated");
                var options = zoomAndPan.options;
                var actionData = zoomAndPan.actionData;
                var isTouch = "touch" === e.pointerType;
                e._cancelPreventDefault = true;
                if (!actionData || isTouch && !zoomAndPan.panningVisualRangeEnabled()) {
                    return
                }
                if ("zoom" === actionData.action) {
                    preventDefaults(e);
                    var curCanvas = actionData.curAxisRect;
                    var startCoords = actionData.startCoords;
                    var curCoords = getPointerCoord(curCanvas, e);
                    var zoomArg = options.argumentAxis.zoom;
                    var zoomVal = options.valueAxis.zoom;
                    var rect = {
                        x: _min(startCoords.x, curCoords.x),
                        y: _min(startCoords.y, curCoords.y),
                        width: _abs(startCoords.x - curCoords.x),
                        height: _abs(startCoords.y - curCoords.y)
                    };
                    if (!zoomArg || !zoomVal) {
                        if (!zoomArg && !rotated || !zoomVal && rotated) {
                            rect.x = curCanvas.x;
                            rect.width = curCanvas.width
                        } else {
                            rect.y = curCanvas.y;
                            rect.height = curCanvas.height
                        }
                    }
                    actionData.rect.attr(rect)
                } else {
                    if ("pan" === actionData.action) {
                        axesViewportChanging(zoomAndPan, "pan", e, calcOffsetForDrag, function(e) {
                            return e.offset
                        });
                        var deltaOffsetY = Math.abs(e.offset.y - actionData.offset.y);
                        var deltaOffsetX = Math.abs(e.offset.x - actionData.offset.x);
                        if (isTouch && (deltaOffsetY > MIN_DRAG_DELTA && deltaOffsetY > Math.abs(actionData.offset.x) || deltaOffsetX > MIN_DRAG_DELTA && deltaOffsetX > Math.abs(actionData.offset.y))) {
                            return
                        }
                        preventDefaults(e)
                    }
                }
            },
            dragEndHandler: function(e) {
                var rotated = chart.option("rotated");
                var options = zoomAndPan.options;
                var actionData = zoomAndPan.actionData;
                var isTouch = "touch" === e.pointerType;
                var panIsEmpty = actionData && "pan" === actionData.action && !actionData.fallback && 0 === actionData.offset.x && 0 === actionData.offset.y;
                if (!actionData || isTouch && !zoomAndPan.panningVisualRangeEnabled() || panIsEmpty) {
                    return
                }(!isTouch || !zoomAndPan.actionData.isNative) && preventDefaults(e);
                if ("zoom" === actionData.action) {
                    var zoomAxes = function(axes, criteria, coordField, startCoords, curCoords, onlyAxisToNotify) {
                        axes = sortAxes(axes, onlyAxisToNotify);
                        var curCoord = curCoords[coordField];
                        var startCoord = startCoords[coordField];
                        var zoomStarted = false;
                        var getParameters = function(silent) {
                            return {
                                start: !!silent,
                                end: !!silent
                            }
                        };
                        if (criteria && _abs(curCoord - startCoord) > MIN_DRAG_DELTA) {
                            axes.some(function(axis) {
                                var tr = axis.getTranslator();
                                if (tr.getBusinessRange().isEmpty()) {
                                    return
                                }
                                var getRange = function() {
                                    return [tr.from(startCoord), tr.from(curCoord)]
                                };
                                var _axisZoom = axisZoom(axis, onlyAxisToNotify, getRange, getParameters, actionData.action, tr.getMinScale(true), e),
                                    stopInteraction = _axisZoom.stopInteraction,
                                    result = _axisZoom.result;
                                zoomStarted = !stopInteraction;
                                return onlyAxisToNotify && result.isPrevented
                            })
                        }
                        return zoomStarted
                    };
                    var curCoords = getPointerCoord(actionData.curAxisRect, e);
                    var argumentAxesZoomed = zoomAxes(chart._argumentAxes, options.argumentAxis.zoom, rotated ? "y" : "x", actionData.startCoords, curCoords, chart.getArgumentAxis());
                    var valueAxesZoomed = zoomAxes(actionData.valueAxes, options.valueAxis.zoom, rotated ? "x" : "y", actionData.startCoords, curCoords);
                    if (valueAxesZoomed || argumentAxesZoomed) {
                        chart._requestChange(["VISUAL_RANGE"])
                    }
                    actionData.rect.dispose()
                } else {
                    if ("pan" === actionData.action) {
                        finishAxesViewportChanging(zoomAndPan, "pan", e, calcOffsetForDrag)
                    }
                }
                zoomAndPan.actionData = null
            },
            pinchStartHandler: function(e) {
                var actionData = prepareActionData(calcCenterForPinch(e), "zoom");
                actionData.isNative = !zoomAndPan.panningVisualRangeEnabled();
                if (actionData.cancel) {
                    cancelEvent(e);
                    return
                }
                zoomAndPan.actionData = actionData;
                startAxesViewportChanging(zoomAndPan, "zoom", e)
            },
            pinchHandler: function(e) {
                if (!zoomAndPan.actionData) {
                    return
                }
                var viewportChanged = axesViewportChanging(zoomAndPan, "zoom", e, function(e, actionData, coordField, scale) {
                    return calcCenterForPinch(e)[coordField] - actionData.center[coordField] + (actionData.center[coordField] - actionData.center[coordField] * scale)
                }, calcCenterForPinch);
                zoomAndPan.defineTouchBehavior(!viewportChanged, e);
                !viewportChanged && (zoomAndPan.actionData = null)
            },
            pinchEndHandler: function(e) {
                if (!zoomAndPan.actionData) {
                    return
                }
                finishAxesViewportChanging(zoomAndPan, "zoom", e, function(e, actionData, coordField, scale) {
                    return actionData.center[coordField] - actionData.startCenter[coordField] + (actionData.startCenter[coordField] - actionData.startCenter[coordField] * scale)
                });
                zoomAndPan.actionData = null
            },
            cleanup: function() {
                renderer.root.off(EVENTS_NS);
                zoomAndPan.actionData && zoomAndPan.actionData.rect && zoomAndPan.actionData.rect.dispose();
                zoomAndPan.actionData = null;
                renderer.root.css({
                    "touch-action": "",
                    "-ms-touch-action": ""
                })
            },
            setup: function(options) {
                zoomAndPan.cleanup();
                if (!options.argumentAxis.pan) {
                    renderer.root.on(SCROLL_BAR_START_EVENT_NAME, cancelEvent)
                }
                if (options.argumentAxis.none && options.valueAxis.none) {
                    return
                }
                zoomAndPan.options = options;
                var rotated = chart.option("rotated");
                if ((options.argumentAxis.zoom || options.valueAxis.zoom) && options.allowMouseWheel) {
                    renderer.root.on(_wheel.name + EVENTS_NS, function(e) {
                        function zoomAxes(axes, coord, delta, onlyAxisToNotify) {
                            axes = sortAxes(axes, onlyAxisToNotify);
                            var zoomStarted = false;
                            var getParameters = function(silent) {
                                return {
                                    start: !!silent,
                                    end: !!silent
                                }
                            };
                            axes.some(function(axis) {
                                var translator = axis.getTranslator();
                                if (translator.getBusinessRange().isEmpty()) {
                                    return
                                }
                                var scale = translator.getMinScale(delta > 0);
                                var getRange = function() {
                                    var zoom = translator.zoom(-(coord - coord * scale), scale, axis.getZoomBounds());
                                    return {
                                        startValue: zoom.min,
                                        endValue: zoom.max
                                    }
                                };
                                var _axisZoom2 = axisZoom(axis, onlyAxisToNotify, getRange, getParameters, "zoom", scale, e),
                                    stopInteraction = _axisZoom2.stopInteraction,
                                    result = _axisZoom2.result;
                                zoomStarted = !stopInteraction;
                                return onlyAxisToNotify && result.isPrevented
                            });
                            return zoomStarted
                        }
                        var coords = calcCenterForDrag(e);
                        var axesZoomed = false;
                        var targetAxes;
                        if (options.valueAxis.zoom) {
                            targetAxes = chart._valueAxes.filter(function(axis) {
                                return checkCoords(canvasToRect(axis.getCanvas()), coords)
                            });
                            if (0 === targetAxes.length) {
                                var targetCanvas = chart._valueAxes.reduce(function(r, axis) {
                                    if (!r && axis.coordsIn(coords.x, coords.y)) {
                                        r = axis.getCanvas()
                                    }
                                    return r
                                }, null);
                                if (targetCanvas) {
                                    targetAxes = chart._valueAxes.filter(function(axis) {
                                        return checkCoords(canvasToRect(axis.getCanvas()), {
                                            x: targetCanvas.left,
                                            y: targetCanvas.top
                                        })
                                    })
                                }
                            }
                            axesZoomed |= zoomAxes(targetAxes, rotated ? coords.x : coords.y, e.delta)
                        }
                        if (options.argumentAxis.zoom) {
                            var canZoom = chart._argumentAxes.some(function(axis) {
                                if (checkCoords(canvasToRect(axis.getCanvas()), coords) || axis.coordsIn(coords.x, coords.y)) {
                                    return true
                                }
                                return false
                            });
                            axesZoomed |= canZoom && zoomAxes(chart._argumentAxes, rotated ? coords.y : coords.x, e.delta, chart.getArgumentAxis())
                        }
                        if (axesZoomed) {
                            chart._requestChange(["VISUAL_RANGE"]);
                            zoomAndPan.panningVisualRangeEnabled(targetAxes) && preventDefaults(e)
                        }
                    })
                }
                if (options.allowTouchGestures) {
                    if (options.argumentAxis.zoom || options.valueAxis.zoom) {
                        renderer.root.on(PINCH_START_EVENT_NAME, {
                            passive: false
                        }, zoomAndPan.pinchStartHandler).on(PINCH_EVENT_NAME, {
                            passive: false
                        }, zoomAndPan.pinchHandler).on(PINCH_END_EVENT_NAME, zoomAndPan.pinchEndHandler)
                    }
                }
                renderer.root.on(DRAG_START_EVENT_NAME, {
                    immediate: true,
                    passive: false
                }, zoomAndPan.dragStartHandler).on(DRAG_EVENT_NAME, {
                    immediate: true,
                    passive: false
                }, zoomAndPan.dragHandler).on(DRAG_END_EVENT_NAME, zoomAndPan.dragEndHandler);
                if (options.argumentAxis.pan) {
                    renderer.root.on(SCROLL_BAR_START_EVENT_NAME, function(e) {
                        zoomAndPan.actionData = {
                            valueAxes: [],
                            offset: {
                                x: 0,
                                y: 0
                            },
                            center: {
                                x: 0,
                                y: 0
                            }
                        };
                        preventDefaults(e);
                        startAxesViewportChanging(zoomAndPan, "pan", e)
                    }).on(SCROLL_BAR_MOVE_EVENT_NAME, function(e) {
                        preventDefaults(e);
                        axesViewportChanging(zoomAndPan, "pan", e, calcOffsetForDrag, function(e) {
                            return e.offset
                        })
                    }).on(SCROLL_BAR_END_EVENT_NAME, function(e) {
                        preventDefaults(e);
                        finishAxesViewportChanging(zoomAndPan, "pan", e, calcOffsetForDrag);
                        zoomAndPan.actionData = null
                    })
                }
            },
            defineTouchBehavior: function(isDefault, e) {
                zoomAndPan.actionData && (zoomAndPan.actionData.isNative = isDefault);
                if (!isDefault) {
                    preventDefaults(e)
                }
            },
            panningVisualRangeEnabled: function(targetAxes) {
                if (null !== targetAxes && void 0 !== targetAxes && targetAxes.length) {
                    return targetAxes.some(function(axis) {
                        return !axis.isExtremePosition(false) || !axis.isExtremePosition(true)
                    })
                }
                var enablePanByValueAxis = chart._valueAxes.some(function(axis) {
                    return !axis.isExtremePosition(false) || !axis.isExtremePosition(true)
                });
                var enablePanByArgumentAxis = chart._argumentAxes.some(function(axis) {
                    return !axis.isExtremePosition(false) || !axis.isExtremePosition(true)
                });
                return enablePanByValueAxis || enablePanByArgumentAxis
            }
        };
        this._zoomAndPan = zoomAndPan
    },
    members: {
        _setupZoomAndPan: function() {
            this._zoomAndPan.setup(this._themeManager.getOptions("zoomAndPan"))
        }
    },
    dispose: function() {
        this._zoomAndPan.cleanup()
    },
    customize: function(constructor) {
        constructor.addChange({
            code: "ZOOM_AND_PAN",
            handler: function() {
                this._setupZoomAndPan()
            },
            isThemeDependent: true,
            isOptionChange: true,
            option: "zoomAndPan"
        })
    }
};
exports.default = _default;
module.exports = exports.default;
