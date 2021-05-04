/**
 * DevExtreme (viz/core/annotations.js)
 * Version: 20.2.6
 * Build date: Tue Mar 16 2021
 *
 * Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
exports.plugins = exports.createAnnotations = void 0;
var _dom_adapter = _interopRequireDefault(require("../../core/dom_adapter"));
var _type = require("../../core/utils/type");
var _tooltip = require("../core/tooltip");
var _extend = require("../../core/utils/extend");
var _utils = require("./utils");
var _plaque = require("./plaque");
var _pointer = _interopRequireDefault(require("../../events/pointer"));
var _drag = require("../../events/drag");
var _index = require("../../events/utils/index");
var _events_engine = _interopRequireDefault(require("../../events/core/events_engine"));

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        "default": obj
    }
}
var getDocument = _dom_adapter.default.getDocument;
var EVENT_NS = "annotations";
var DOT_EVENT_NS = "." + EVENT_NS;
var POINTER_ACTION = (0, _index.addNamespace)([_pointer.default.down, _pointer.default.move], EVENT_NS);
var POINTER_UP_EVENT_NAME = (0, _index.addNamespace)(_pointer.default.up, EVENT_NS);
var DRAG_START_EVENT_NAME = _drag.start + DOT_EVENT_NS;
var DRAG_EVENT_NAME = _drag.move + DOT_EVENT_NS;
var DRAG_END_EVENT_NAME = _drag.end + DOT_EVENT_NS;

function coreAnnotation(options, contentTemplate) {
    return {
        draw: function(widget, group) {
            var _this = this;
            var annotationGroup = widget._renderer.g().append(group).css((0, _utils.patchFontOptions)(options.font));
            if (this.plaque) {
                this.plaque.clear()
            }
            this.plaque = new _plaque.Plaque((0, _extend.extend)(true, {}, options, {
                cornerRadius: (options.border || {}).cornerRadius
            }), widget, annotationGroup, contentTemplate, widget._isAnnotationBounded(options));
            this.plaque.draw(widget._getAnnotationCoords(this));
            if (options.allowDragging) {
                annotationGroup.on(DRAG_START_EVENT_NAME, {
                    immediate: true
                }, function(e) {
                    _this._dragOffsetX = _this.plaque.x - e.pageX;
                    _this._dragOffsetY = _this.plaque.y - e.pageY
                }).on(DRAG_EVENT_NAME, function(e) {
                    _this.plaque.move(e.pageX + _this._dragOffsetX, e.pageY + _this._dragOffsetY)
                }).on(DRAG_END_EVENT_NAME, function(e) {
                    _this.offsetX = (_this.offsetX || 0) + e.offset.x;
                    _this.offsetY = (_this.offsetY || 0) + e.offset.y
                })
            }
        },
        hitTest: function(x, y) {
            return this.plaque.hitTest(x, y)
        },
        showTooltip: function(tooltip, _ref) {
            var x = _ref.x,
                y = _ref.y;
            var that = this;
            var options = that.options;
            if (tooltip.annotation !== that) {
                tooltip.setTemplate(options.tooltipTemplate);
                var callback = function(result) {
                    result && (tooltip.annotation = that)
                };
                callback(tooltip.show(options, {
                    x: x,
                    y: y
                }, {
                    target: options
                }, options.customizeTooltip, callback))
            } else {
                tooltip.move(x, y)
            }
        }
    }
}

function getTemplateFunction(options, widget) {
    var template;
    if ("text" === options.type) {
        template = function(item, groupElement) {
            var text = widget._renderer.text(item.text).attr({
                "class": item.cssClass
            }).append({
                element: groupElement
            });
            if (item.width > 0 || item.height > 0) {
                text.setMaxSize(item.width, item.height, {
                    wordWrap: item.wordWrap,
                    textOverflow: item.textOverflow
                })
            }
        }
    } else {
        if ("image" === options.type) {
            template = function(item, groupElement) {
                var _ref2 = item.image || {},
                    width = _ref2.width,
                    height = _ref2.height,
                    url = _ref2.url,
                    location = _ref2.location;
                var outerWidth = item.width,
                    outerHeight = item.height;
                var imageWidth = outerWidth > 0 ? Math.min(width, outerWidth) : width;
                var imageHeight = outerHeight > 0 ? Math.min(height, outerHeight) : height;
                widget._renderer.image(0, 0, imageWidth, imageHeight, url, location || "center").append({
                    element: groupElement
                })
            }
        } else {
            if ("custom" === options.type) {
                template = options.template
            }
        }
    }
    return template
}

function getImageObject(image) {
    return "string" === typeof image ? {
        url: image
    } : image
}
var createAnnotations = function(widget, items) {
    var commonAnnotationSettings = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
    var customizeAnnotation = arguments.length > 3 ? arguments[3] : void 0;
    var pullOptions = arguments.length > 4 ? arguments[4] : void 0;
    var commonImageOptions = getImageObject(commonAnnotationSettings.image);
    return items.reduce(function(arr, item) {
        var currentImageOptions = getImageObject(item.image);
        var customizedItem = (0, _type.isFunction)(customizeAnnotation) ? customizeAnnotation(item) : {};
        if (customizedItem) {
            customizedItem.image = getImageObject(customizedItem.image)
        }
        var options = (0, _extend.extend)(true, {}, commonAnnotationSettings, item, {
            image: commonImageOptions
        }, {
            image: currentImageOptions
        }, customizedItem);
        var templateFunction = getTemplateFunction(options, widget);
        var annotation = templateFunction && (0, _extend.extend)(true, pullOptions(options), coreAnnotation(options, widget._getTemplate(templateFunction)));
        annotation && arr.push(annotation);
        return arr
    }, [])
};
exports.createAnnotations = createAnnotations;
var chartPlugin = {
    name: "annotations_chart",
    init: function() {},
    dispose: function() {},
    members: {
        _getAnnotationCoords: function(annotation) {
            var _axis, _axis2;
            var coords = {
                offsetX: annotation.offsetX,
                offsetY: annotation.offsetY
            };
            var argCoordName = this._options.silent("rotated") ? "y" : "x";
            var valCoordName = this._options.silent("rotated") ? "x" : "y";
            var argAxis = this.getArgumentAxis();
            var argument = argAxis.validateUnit(annotation.argument);
            var axis = this.getValueAxis(annotation.axis);
            var series;
            var pane = null === (_axis = axis) || void 0 === _axis ? void 0 : _axis.pane;
            if (annotation.series) {
                var _series;
                series = this.series.filter(function(s) {
                    return s.name === annotation.series
                })[0];
                axis = null === (_series = series) || void 0 === _series ? void 0 : _series.getValueAxis();
                (0, _type.isDefined)(axis) && (pane = axis.pane)
            }
            if ((0, _type.isDefined)(argument)) {
                if (series) {
                    var center = series.getPointCenterByArg(argument);
                    center && (coords[argCoordName] = center[argCoordName])
                } else {
                    coords[argCoordName] = argAxis.getTranslator().translate(argument)
                }!(0, _type.isDefined)(pane) && (pane = argAxis.pane)
            }
            var value = null === (_axis2 = axis) || void 0 === _axis2 ? void 0 : _axis2.validateUnit(annotation.value);
            if ((0, _type.isDefined)(value)) {
                var _axis3;
                coords[valCoordName] = null === (_axis3 = axis) || void 0 === _axis3 ? void 0 : _axis3.getTranslator().translate(value);
                !(0, _type.isDefined)(pane) && (0, _type.isDefined)(axis) && (pane = axis.pane)
            }
            coords.canvas = this._getCanvasForPane(pane);
            if ((0, _type.isDefined)(coords[argCoordName]) && !(0, _type.isDefined)(value)) {
                var _series2;
                if (!(0, _type.isDefined)(axis) && !(0, _type.isDefined)(series)) {
                    coords[valCoordName] = argAxis.getAxisPosition()
                } else {
                    if ((0, _type.isDefined)(axis) && !(0, _type.isDefined)(series)) {
                        coords[valCoordName] = this._argumentAxes.filter(function(a) {
                            return a.pane === axis.pane
                        })[0].getAxisPosition()
                    } else {
                        if (null !== (_series2 = series) && void 0 !== _series2 && _series2.checkSeriesViewportCoord(argAxis, coords[argCoordName])) {
                            coords[valCoordName] = series.getSeriesPairCoord(coords[argCoordName], true)
                        }
                    }
                }
            }
            if (!(0, _type.isDefined)(argument) && (0, _type.isDefined)(coords[valCoordName])) {
                if ((0, _type.isDefined)(axis) && !(0, _type.isDefined)(series)) {
                    coords[argCoordName] = axis.getAxisPosition()
                } else {
                    if ((0, _type.isDefined)(series)) {
                        if (series.checkSeriesViewportCoord(axis, coords[valCoordName])) {
                            coords[argCoordName] = series.getSeriesPairCoord(coords[valCoordName], false)
                        }
                    }
                }
            }
            return coords
        },
        _annotationsPointerEventHandler: function(event) {
            var originalEvent = event.originalEvent || {};
            var touch = originalEvent.touches && originalEvent.touches[0] || {};
            var rootOffset = this._renderer.getRootOffset();
            var coords = {
                x: touch.pageX || originalEvent.pageX || event.pageX,
                y: touch.pageY || originalEvent.pageY || event.pageY
            };
            var annotation = this._annotations.items.filter(function(a) {
                return a.hitTest(coords.x - rootOffset.left, coords.y - rootOffset.top)
            })[0];
            if (!annotation || !annotation.options.tooltipEnabled) {
                this._annotations.hideTooltip();
                return
            }
            this._clear();
            if (annotation.options.allowDragging && event.type === _pointer.default.down) {
                this._annotations._hideToolTipForDrag = true
            }
            if (!this._annotations._hideToolTipForDrag) {
                annotation.showTooltip(this._annotations.tooltip, coords);
                event.stopPropagation()
            }
        },
        _isAnnotationBounded: function(options) {
            return (0, _type.isDefined)(options.value) || (0, _type.isDefined)(options.argument)
        },
        _pullOptions: function(options) {
            return {
                type: options.type,
                name: options.name,
                x: options.x,
                y: options.y,
                value: options.value,
                argument: options.argument,
                axis: options.axis,
                series: options.series,
                options: options,
                offsetX: options.offsetX,
                offsetY: options.offsetY
            }
        },
        _forceAnnotationRender: function() {
            this._change(["FORCE_RENDER"])
        },
        _clear: function() {
            this.hideTooltip();
            this.clearHover()
        }
    }
};
var polarChartPlugin = {
    name: "annotations_polar_chart",
    init: function() {},
    dispose: function() {},
    members: {
        _getAnnotationCoords: function(annotation) {
            var coords = {
                offsetX: annotation.offsetX,
                offsetY: annotation.offsetY,
                canvas: this._calcCanvas()
            };
            var argAxis = this.getArgumentAxis();
            var argument = argAxis.validateUnit(annotation.argument);
            var value = this.getValueAxis().validateUnit(annotation.value);
            var radius = annotation.radius;
            var angle = annotation.angle;
            var pointCoords;
            var series;
            if (annotation.series) {
                series = this.series.filter(function(s) {
                    return s.name === annotation.series
                })[0]
            }(0, _extend.extend)(true, coords, this.getXYFromPolar(angle, radius, argument, value));
            if ((0, _type.isDefined)(series)) {
                if ((0, _type.isDefined)(coords.angle) && !(0, _type.isDefined)(value) && !(0, _type.isDefined)(radius)) {
                    if (!(0, _type.isDefined)(argument)) {
                        argument = argAxis.getTranslator().from(isFinite(angle) ? this.getActualAngle(angle) : coords.angle)
                    }
                    pointCoords = series.getSeriesPairCoord({
                        argument: argument,
                        angle: -coords.angle
                    }, true)
                } else {
                    if ((0, _type.isDefined)(coords.radius) && !(0, _type.isDefined)(argument) && !(0, _type.isDefined)(angle)) {
                        pointCoords = series.getSeriesPairCoord({
                            radius: coords.radius
                        }, false)
                    }
                }
                if ((0, _type.isDefined)(pointCoords)) {
                    coords.x = pointCoords.x;
                    coords.y = pointCoords.y
                }
            }
            if (annotation.series && !(0, _type.isDefined)(pointCoords)) {
                coords.x = coords.y = void 0
            }
            return coords
        },
        _annotationsPointerEventHandler: chartPlugin.members._annotationsPointerEventHandler,
        _isAnnotationBounded: chartPlugin.members._isAnnotationBounded,
        _pullOptions: function(options) {
            var polarOptions = (0, _extend.extend)({}, {
                radius: options.radius,
                angle: options.angle
            }, chartPlugin.members._pullOptions(options));
            delete polarOptions.axis;
            return polarOptions
        },
        _forceAnnotationRender: chartPlugin.members._forceAnnotationRender,
        _clear: chartPlugin.members._clear
    }
};
var vectorMapPlugin = {
    name: "annotations_vector_map",
    init: function() {},
    dispose: function() {
        this._annotations._offTracker();
        this._annotations._offTracker = null
    },
    members: {
        _getAnnotationCoords: function(annotation) {
            var coords = {
                offsetX: annotation.offsetX,
                offsetY: annotation.offsetY
            };
            coords.canvas = this._projection.getCanvas();
            if (annotation.coordinates) {
                var data = this._projection.toScreenPoint(annotation.coordinates);
                coords.x = data[0];
                coords.y = data[1]
            }
            return coords
        },
        _annotationsPointerEventHandler: chartPlugin.members._annotationsPointerEventHandler,
        _isAnnotationBounded: function(options) {
            return (0, _type.isDefined)(options.coordinates)
        },
        _pullOptions: function(options) {
            var vectorMapOptions = (0, _extend.extend)({}, {
                coordinates: options.coordinates
            }, chartPlugin.members._pullOptions(options));
            delete vectorMapOptions.axis;
            delete vectorMapOptions.series;
            delete vectorMapOptions.argument;
            delete vectorMapOptions.value;
            return vectorMapOptions
        },
        _forceAnnotationRender: function() {
            this._change(["EXTRA_ELEMENTS"])
        },
        _getAnnotationStyles: function() {
            return {
                "text-anchor": "start"
            }
        },
        _clear: function() {}
    },
    extenders: {
        _prepareExtraElements: function() {
            var that = this;
            var renderElements = function() {
                that._renderExtraElements()
            };
            that._annotations._offTracker = that._tracker.on({
                move: renderElements,
                zoom: renderElements,
                end: renderElements
            })
        }
    }
};
var pieChartPlugin = {
    name: "annotations_pie_chart",
    init: function() {},
    dispose: function() {},
    members: {
        _getAnnotationCoords: function(annotation) {
            var series;
            var coords = {
                offsetX: annotation.offsetX,
                offsetY: annotation.offsetY,
                canvas: this._canvas
            };
            if (annotation.argument) {
                if (annotation.series) {
                    series = this.getSeriesByName(annotation.series)
                } else {
                    series = this.series[0]
                }
                var argument = series.getPointsByArg(annotation.argument)[0];
                var _argument$getAnnotati = argument.getAnnotationCoords(annotation.location),
                    x = _argument$getAnnotati.x,
                    y = _argument$getAnnotati.y;
                coords.x = x;
                coords.y = y
            }
            return coords
        },
        _isAnnotationBounded: function(options) {
            return options.argument
        },
        _annotationsPointerEventHandler: chartPlugin.members._annotationsPointerEventHandler,
        _pullOptions: function(options) {
            var pieChartOptions = (0, _extend.extend)({}, {
                location: options.location
            }, chartPlugin.members._pullOptions(options));
            delete pieChartOptions.axis;
            return pieChartOptions
        },
        _clear: chartPlugin.members._clear,
        _forceAnnotationRender: chartPlugin.members._forceAnnotationRender
    }
};
var corePlugin = {
    name: "annotations_core",
    init: function() {
        this._annotations = {
            items: [],
            _hideToolTipForDrag: false,
            tooltip: new _tooltip.Tooltip({
                cssClass: "".concat(this._rootClassPrefix, "-annotation-tooltip"),
                eventTrigger: this._eventTrigger,
                widgetRoot: this.element(),
                widget: this
            }),
            hideTooltip: function() {
                this.tooltip.annotation = null;
                this.tooltip.hide()
            },
            clearItems: function() {
                this.items.forEach(function(i) {
                    return i.plaque.clear()
                });
                this.items = []
            }
        };
        this._annotations.tooltip.setRendererOptions(this._getRendererOptions())
    },
    dispose: function() {
        this._annotationsGroup.linkRemove().linkOff();
        _events_engine.default.off(getDocument(), DOT_EVENT_NS);
        this._annotationsGroup.off(DOT_EVENT_NS);
        this._annotations.tooltip && this._annotations.tooltip.dispose()
    },
    extenders: {
        _createHtmlStructure: function() {
            var _this2 = this;
            this._annotationsGroup = this._renderer.g().attr({
                "class": "".concat(this._rootClassPrefix, "-annotations")
            }).css(this._getAnnotationStyles()).linkOn(this._renderer.root, "annotations").linkAppend();
            _events_engine.default.on(getDocument(), POINTER_ACTION, function() {
                return _this2._annotations.hideTooltip()
            });
            _events_engine.default.on(getDocument(), POINTER_UP_EVENT_NAME, function(event) {
                _this2._annotations._hideToolTipForDrag = false;
                _this2._annotationsPointerEventHandler(event)
            });
            this._annotationsGroup.on(POINTER_ACTION, this._annotationsPointerEventHandler.bind(this))
        },
        _renderExtraElements: function() {
            var _this3 = this;
            this._annotationsGroup.clear();
            this._annotations.items.forEach(function(item) {
                return item.draw(_this3, _this3._annotationsGroup)
            })
        },
        _stopCurrentHandling: function() {
            this._annotations.hideTooltip()
        }
    },
    members: {
        _buildAnnotations: function() {
            this._annotations.clearItems();
            var items = this._getOption("annotations", true);
            if (!(null !== items && void 0 !== items && items.length)) {
                return
            }
            this._annotations.items = createAnnotations(this, items, this._getOption("commonAnnotationSettings"), this._getOption("customizeAnnotation", true), this._pullOptions)
        },
        _setAnnotationTooltipOptions: function() {
            var tooltipOptions = (0, _extend.extend)({}, this._getOption("tooltip"));
            tooltipOptions.contentTemplate = tooltipOptions.customizeTooltip = void 0;
            this._annotations.tooltip.update(tooltipOptions)
        },
        _getAnnotationCoords: function() {
            return {}
        },
        _pullOptions: function() {
            return {}
        },
        _getAnnotationStyles: function() {
            return {}
        }
    },
    customize: function(constructor) {
        constructor.addChange({
            code: "ANNOTATIONITEMS",
            handler: function() {
                this._requestChange(["ANNOTATIONS"])
            },
            isOptionChange: true,
            option: "annotations"
        });
        constructor.addChange({
            code: "ANNOTATIONSSETTINGS",
            handler: function() {
                this._requestChange(["ANNOTATIONS"])
            },
            isOptionChange: true,
            option: "commonAnnotationSettings"
        });
        constructor.addChange({
            code: "ANNOTATIONS",
            handler: function() {
                this._buildAnnotations();
                this._setAnnotationTooltipOptions();
                this._forceAnnotationRender()
            },
            isThemeDependent: true,
            isOptionChange: true
        })
    },
    fontFields: ["commonAnnotationSettings.font"]
};
var plugins = {
    core: corePlugin,
    chart: chartPlugin,
    polarChart: polarChartPlugin,
    vectorMap: vectorMapPlugin,
    pieChart: pieChartPlugin
};
exports.plugins = plugins;
