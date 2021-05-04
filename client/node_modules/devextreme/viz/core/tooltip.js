/**
 * DevExtreme (viz/core/tooltip.js)
 * Version: 20.2.6
 * Build date: Tue Mar 16 2021
 *
 * Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
exports.plugin = exports.Tooltip = void 0;
var _dom_adapter = _interopRequireDefault(require("../../core/dom_adapter"));
var _window = require("../../core/utils/window");
var _inflector = require("../../core/utils/inflector");
var _renderer = _interopRequireDefault(require("../../core/renderer"));
var _renderer2 = require("./renderers/renderer");
var _type = require("../../core/utils/type");
var _extend = require("../../core/utils/extend");
var _utils = require("./utils");
var _format_helper = _interopRequireDefault(require("../../format_helper"));
var _plaque = require("./plaque");

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        "default": obj
    }
}
var format = _format_helper.default.format;
var mathCeil = Math.ceil;
var mathMax = Math.max;
var mathMin = Math.min;
var window = (0, _window.getWindow)();
var DEFAULT_HTML_GROUP_WIDTH = 3e3;

function hideElement($element) {
    $element.css({
        left: "-9999px"
    }).detach()
}

function getSpecialFormatOptions(options, specialFormat) {
    var result = options;
    switch (specialFormat) {
        case "argument":
            result = {
                format: options.argumentFormat
            };
            break;
        case "percent":
            result = {
                format: {
                    type: "percent",
                    precision: options.format && options.format.percentPrecision
                }
            }
    }
    return result
}
var Tooltip = function(params) {
    var that = this;
    var renderer;
    that._eventTrigger = params.eventTrigger;
    that._widgetRoot = params.widgetRoot;
    that._widget = params.widget;
    that._wrapper = (0, _renderer.default)("<div>").css({
        position: "absolute",
        overflow: "hidden",
        pointerEvents: "none"
    }).addClass(params.cssClass);
    that._renderer = renderer = new _renderer2.Renderer({
        pathModified: params.pathModified,
        container: that._wrapper[0]
    });
    var root = renderer.root;
    root.attr({
        "pointer-events": "none"
    });
    that._text = renderer.text(void 0, 0, 0);
    that._textGroupHtml = (0, _renderer.default)("<div>").css({
        position: "absolute",
        padding: 0,
        margin: 0,
        border: "0px solid transparent"
    }).appendTo(that._wrapper);
    that._textHtml = (0, _renderer.default)("<div>").css({
        position: "relative",
        display: "inline-block",
        padding: 0,
        margin: 0,
        border: "0px solid transparent"
    }).appendTo(that._textGroupHtml)
};
exports.Tooltip = Tooltip;
Tooltip.prototype = {
    constructor: Tooltip,
    dispose: function() {
        this._wrapper.remove();
        this._renderer.dispose();
        this._options = this._widgetRoot = null
    },
    _getContainer: function() {
        var options = this._options;
        var container = (0, _renderer.default)(this._widgetRoot).closest(options.container);
        if (0 === container.length) {
            container = (0, _renderer.default)(options.container)
        }
        return (container.length ? container : (0, _renderer.default)("body")).get(0)
    },
    setTemplate: function(contentTemplate) {
        var that = this;
        that._template = contentTemplate ? that._widget._getTemplate(contentTemplate) : null
    },
    setOptions: function(options) {
        var _this = this;
        options = options || {};
        var that = this;
        that._options = options;
        that._textFontStyles = (0, _utils.patchFontOptions)(options.font);
        that._textFontStyles.color = that._textFontStyles.fill;
        that._wrapper.css({
            zIndex: options.zIndex
        });
        that._customizeTooltip = options.customizeTooltip;
        var textGroupHtml = that._textGroupHtml;
        var textHtml = that._textHtml;
        if (this.plaque) {
            this.plaque.clear()
        }
        this.setTemplate(options.contentTemplate);
        var pointerEvents = options.interactive ? "auto" : "none";
        if (options.interactive) {
            this._renderer.root.css({
                "-ms-user-select": "auto",
                "-moz-user-select": "auto",
                "-webkit-user-select": "auto"
            })
        }
        var drawTooltip = function(_ref) {
            var group = _ref.group,
                onRender = _ref.onRender,
                eventData = _ref.eventData,
                isMoving = _ref.isMoving,
                _ref$templateCallback = _ref.templateCallback,
                templateCallback = void 0 === _ref$templateCallback ? function() {} : _ref$templateCallback;
            var state = that._state;
            if (!isMoving) {
                var template = that._template;
                var useTemplate = template && !state.formatObject.skipTemplate;
                if (state.html || useTemplate) {
                    textGroupHtml.css({
                        color: state.textColor,
                        width: DEFAULT_HTML_GROUP_WIDTH,
                        pointerEvents: pointerEvents
                    });
                    if (useTemplate) {
                        template.render({
                            model: state.formatObject,
                            container: textHtml,
                            onRendered: function() {
                                state.html = textHtml.html();
                                if (0 === textHtml.width() && 0 === textHtml.height()) {
                                    _this.plaque.clear();
                                    templateCallback(false);
                                    return
                                }
                                onRender();
                                that._riseEvents(eventData);
                                that._moveWrapper();
                                that.plaque.customizeCloud({
                                    fill: state.color,
                                    stroke: state.borderColor,
                                    "pointer-events": pointerEvents
                                });
                                templateCallback(true)
                            }
                        });
                        return
                    } else {
                        that._text.attr({
                            text: ""
                        });
                        textHtml.html(state.html)
                    }
                } else {
                    that._text.css({
                        fill: state.textColor
                    }).attr({
                        text: state.text,
                        "class": options.cssClass,
                        "pointer-events": pointerEvents
                    }).append(group.attr({
                        align: options.textAlignment
                    }))
                }
                that._riseEvents(eventData);
                that.plaque.customizeCloud({
                    fill: state.color,
                    stroke: state.borderColor,
                    "pointer-events": pointerEvents
                })
            }
            onRender();
            that._moveWrapper();
            return true
        };
        this.plaque = new _plaque.Plaque({
            opacity: that._options.opacity,
            color: that._options.color,
            border: that._options.border,
            paddingLeftRight: that._options.paddingLeftRight,
            paddingTopBottom: that._options.paddingTopBottom,
            arrowLength: that._options.arrowLength,
            arrowWidth: 20,
            shadow: that._options.shadow,
            cornerRadius: that._options.cornerRadius
        }, that, that._renderer.root, drawTooltip, true, function(tooltip, g) {
            var state = tooltip._state;
            if (state.html) {
                var bBox;
                var getComputedStyle = window.getComputedStyle;
                if (getComputedStyle) {
                    bBox = getComputedStyle(textHtml.get(0));
                    bBox = {
                        x: 0,
                        y: 0,
                        width: mathCeil(parseFloat(bBox.width)),
                        height: mathCeil(parseFloat(bBox.height))
                    }
                } else {
                    bBox = textHtml.get(0).getBoundingClientRect();
                    bBox = {
                        x: 0,
                        y: 0,
                        width: mathCeil(bBox.width ? bBox.width : bBox.right - bBox.left),
                        height: mathCeil(bBox.height ? bBox.height : bBox.bottom - bBox.top)
                    }
                }
                return bBox
            }
            return g.getBBox()
        }, function(tooltip, g, x, y) {
            var state = tooltip._state;
            if (state.html) {
                that._textGroupHtml.css({
                    left: x,
                    top: y
                })
            } else {
                g.move(x, y)
            }
        });
        return that
    },
    _riseEvents: function(eventData) {
        var that = this;
        that._eventData && that._eventTrigger("tooltipHidden", that._eventData);
        that._eventData = eventData;
        that._eventTrigger("tooltipShown", that._eventData)
    },
    setRendererOptions: function(options) {
        this._renderer.setOptions(options);
        this._textGroupHtml.css({
            direction: options.rtl ? "rtl" : "ltr"
        });
        return this
    },
    update: function(options) {
        var that = this;
        that.setOptions(options);
        hideElement(that._wrapper);
        var normalizedCSS = {};
        for (var name in that._textFontStyles) {
            normalizedCSS[(0, _inflector.camelize)(name)] = that._textFontStyles[name]
        }
        that._textGroupHtml.css(normalizedCSS);
        that._text.css(that._textFontStyles);
        that._eventData = null;
        return that
    },
    _prepare: function(formatObject, state) {
        var customizeTooltip = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : this._customizeTooltip;
        var options = this._options;
        var customize = {};
        if ((0, _type.isFunction)(customizeTooltip)) {
            customize = customizeTooltip.call(formatObject, formatObject);
            customize = (0, _type.isPlainObject)(customize) ? customize : {};
            if ("text" in customize) {
                state.text = (0, _type.isDefined)(customize.text) ? String(customize.text) : ""
            }
            if ("html" in customize) {
                state.html = (0, _type.isDefined)(customize.html) ? String(customize.html) : ""
            }
        }
        if (!("text" in state) && !("html" in state)) {
            state.text = formatObject.valueText || formatObject.description || ""
        }
        state.color = customize.color || options.color;
        state.borderColor = customize.borderColor || (options.border || {}).color;
        state.textColor = customize.fontColor || (this._textFontStyles || {}).color;
        return !!state.text || !!state.html || !!this._template
    },
    show: function(formatObject, params, eventData, customizeTooltip, templateCallback) {
        var that = this;
        if (that._options.forceEvents) {
            eventData.x = params.x;
            eventData.y = params.y - params.offset;
            that._riseEvents(eventData);
            return true
        }
        var state = {
            formatObject: formatObject,
            eventData: eventData,
            templateCallback: templateCallback
        };
        if (!that._prepare(formatObject, state, customizeTooltip)) {
            return false
        }
        that._state = state;
        that._wrapper.appendTo(that._getContainer());
        that._clear();
        var parameters = (0, _extend.extend)({}, that._options, {
            canvas: that._getCanvas()
        }, state, {
            x: params.x,
            y: params.y,
            offset: params.offset
        });
        return this.plaque.clear().draw(parameters)
    },
    isCursorOnTooltip: function(x, y) {
        if (this._options.interactive && this.isEnabled()) {
            var box = this.plaque.getBBox();
            return x > box.x && x < box.x + box.width && y > box.y && y < box.y + box.height
        }
        return false
    },
    hide: function() {
        var that = this;
        hideElement(that._wrapper);
        if (that._eventData) {
            that._eventTrigger("tooltipHidden", that._eventData);
            that._clear();
            that._eventData = null
        }
    },
    _clear: function() {
        this._textHtml.empty()
    },
    move: function(x, y, offset) {
        this.plaque.draw({
            x: x,
            y: y,
            offset: offset,
            canvas: this._getCanvas(),
            isMoving: true
        })
    },
    _moveWrapper: function() {
        var that = this;
        var plaqueBBox = this.plaque.getBBox();
        that._renderer.resize(plaqueBBox.width, plaqueBBox.height);
        var offset = that._wrapper.css({
            left: 0,
            top: 0
        }).offset();
        var left = plaqueBBox.x;
        var top = plaqueBBox.y;
        that._wrapper.css({
            left: left - offset.left,
            top: top - offset.top
        });
        this.plaque.moveRoot(-left, -top);
        if (this._state.html) {
            that._textHtml.css({
                left: -left,
                top: -top
            });
            that._textGroupHtml.css({
                width: mathCeil(that._textHtml.width())
            })
        }
    },
    formatValue: function(value, _specialFormat) {
        var options = _specialFormat ? getSpecialFormatOptions(this._options, _specialFormat) : this._options;
        return format(value, options.format)
    },
    getLocation: function() {
        return (0, _utils.normalizeEnum)(this._options.location)
    },
    isEnabled: function() {
        return !!this._options.enabled || !!this._options.forceEvents
    },
    isShared: function() {
        return !!this._options.shared
    },
    _getCanvas: function() {
        var container = this._getContainer();
        var containerBox = container.getBoundingClientRect();
        var html = _dom_adapter.default.getDocumentElement();
        var document = _dom_adapter.default.getDocument();
        var left = window.pageXOffset || html.scrollLeft || 0;
        var top = window.pageYOffset || html.scrollTop || 0;
        var box = {
            left: left,
            top: top,
            width: mathMax(html.clientWidth, document.body.clientWidth) + left,
            height: mathMax(document.body.scrollHeight, html.scrollHeight, document.body.offsetHeight, html.offsetHeight, document.body.clientHeight, html.clientHeight),
            right: 0,
            bottom: 0
        };
        if (container !== _dom_adapter.default.getBody()) {
            left = mathMax(box.left, box.left + containerBox.left);
            top = mathMax(box.top, box.top + containerBox.top);
            box.width = mathMin(containerBox.width, box.width) + left + box.left;
            box.height = mathMin(containerBox.height, box.height) + top + box.top;
            box.left = left;
            box.top = top
        }
        return box
    }
};
var plugin = {
    name: "tooltip",
    init: function() {
        this._initTooltip()
    },
    dispose: function() {
        this._disposeTooltip()
    },
    members: {
        _initTooltip: function() {
            this._tooltip = new Tooltip({
                cssClass: this._rootClassPrefix + "-tooltip",
                eventTrigger: this._eventTrigger,
                pathModified: this.option("pathModified"),
                widgetRoot: this.element(),
                widget: this
            })
        },
        _disposeTooltip: function() {
            this._tooltip.dispose();
            this._tooltip = null
        },
        _setTooltipRendererOptions: function() {
            this._tooltip.setRendererOptions(this._getRendererOptions())
        },
        _setTooltipOptions: function() {
            this._tooltip.update(this._getOption("tooltip"))
        }
    },
    extenders: {
        _stopCurrentHandling: function() {
            this._tooltip && this._tooltip.hide()
        }
    },
    customize: function(constructor) {
        var proto = constructor.prototype;
        proto._eventsMap.onTooltipShown = {
            name: "tooltipShown"
        };
        proto._eventsMap.onTooltipHidden = {
            name: "tooltipHidden"
        };
        constructor.addChange({
            code: "TOOLTIP_RENDERER",
            handler: function() {
                this._setTooltipRendererOptions()
            },
            isThemeDependent: true,
            isOptionChange: true
        });
        constructor.addChange({
            code: "TOOLTIP",
            handler: function() {
                this._setTooltipOptions()
            },
            isThemeDependent: true,
            isOptionChange: true,
            option: "tooltip"
        })
    },
    fontFields: ["tooltip.font"]
};
exports.plugin = plugin;
