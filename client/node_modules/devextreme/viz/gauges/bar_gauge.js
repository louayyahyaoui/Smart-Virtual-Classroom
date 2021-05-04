/**
 * DevExtreme (viz/gauges/bar_gauge.js)
 * Version: 20.2.6
 * Build date: Tue Mar 16 2021
 *
 * Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
exports.dxBarGauge = void 0;
var _component_registrator = _interopRequireDefault(require("../../core/component_registrator"));
var _object = require("../../core/utils/object");
var _common = require("../../core/utils/common");
var _extend2 = require("../../core/utils/extend");
var _utils = require("../core/utils");
var _base_gauge = require("./base_gauge");
var _circular_gauge = _interopRequireDefault(require("./circular_gauge"));
var _legend = require("../components/legend");

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        "default": obj
    }
}
var PI_DIV_180 = Math.PI / 180;
var _abs = Math.abs;
var _round = Math.round;
var _floor = Math.floor;
var _min = Math.min;
var _max = Math.max;
var _getSampleText = _base_gauge.getSampleText;
var _formatValue = _base_gauge.formatValue;
var _compareArrays = _base_gauge.compareArrays;
var _isArray = Array.isArray;
var _convertAngleToRendererSpace = _utils.convertAngleToRendererSpace;
var _getCosAndSin = _utils.getCosAndSin;
var _patchFontOptions = _utils.patchFontOptions;
var _Number = Number;
var _isFinite = isFinite;
var _noop = _common.noop;
var _extend = _extend2.extend;
var OPTION_VALUES = "values";
var BarWrapper;
var dxBarGauge = _base_gauge.dxBaseGauge.inherit({
    _rootClass: "dxbg-bar-gauge",
    _themeSection: "barGauge",
    _fontFields: ["label.font", "legend.font", "legend.title.font", "legend.title.subtitle.font"],
    _initCore: function() {
        var that = this;
        that.callBase.apply(that, arguments);
        that._barsGroup = that._renderer.g().attr({
            "class": "dxbg-bars"
        }).linkOn(that._renderer.root, "bars");
        that._values = [];
        that._context = {
            renderer: that._renderer,
            translator: that._translator,
            tracker: that._tracker,
            group: that._barsGroup
        };
        that._animateStep = function(pos) {
            var bars = that._bars;
            var i;
            var ii;
            for (i = 0, ii = bars.length; i < ii; ++i) {
                bars[i].animate(pos)
            }
        };
        that._animateComplete = function() {
            that._bars.forEach(function(bar) {
                return bar.endAnimation()
            });
            that._checkOverlap()
        }
    },
    _disposeCore: function() {
        var that = this;
        that._barsGroup.linkOff();
        that._barsGroup = that._values = that._context = that._animateStep = that._animateComplete = null;
        that.callBase.apply(that, arguments)
    },
    _setupDomainCore: function() {
        var that = this;
        var startValue = that.option("startValue");
        var endValue = that.option("endValue");
        _isFinite(startValue) || (startValue = 0);
        _isFinite(endValue) || (endValue = 100);
        that._translator.setDomain(startValue, endValue);
        that._baseValue = that._translator.adjust(that.option("baseValue"));
        _isFinite(that._baseValue) || (that._baseValue = startValue < endValue ? startValue : endValue)
    },
    _getDefaultSize: function() {
        return {
            width: 300,
            height: 300
        }
    },
    _setupCodomain: _circular_gauge.default.prototype._setupCodomain,
    _getApproximateScreenRange: function() {
        var that = this;
        var sides = that._area.sides;
        var width = that._canvas.width / (sides.right - sides.left);
        var height = that._canvas.height / (sides.down - sides.up);
        var r = width < height ? width : height;
        return -that._translator.getCodomainRange() * r * PI_DIV_180
    },
    _setupAnimationSettings: function() {
        var that = this;
        that.callBase.apply(that, arguments);
        if (that._animationSettings) {
            that._animationSettings.step = that._animateStep;
            that._animationSettings.complete = that._animateComplete
        }
    },
    _cleanContent: function() {
        var that = this;
        that._barsGroup.linkRemove();
        that._animationSettings && that._barsGroup.stopAnimation();
        that._barsGroup.clear()
    },
    _renderContent: function() {
        var that = this;
        var labelOptions = that.option("label");
        var text;
        var bBox;
        var context = that._context;
        that._barsGroup.linkAppend();
        context.textEnabled = void 0 === labelOptions || labelOptions && (!("visible" in labelOptions) || labelOptions.visible);
        if (context.textEnabled) {
            context.textColor = labelOptions && labelOptions.font && labelOptions.font.color || null;
            labelOptions = _extend(true, {}, that._themeManager.theme().label, labelOptions);
            context.formatOptions = {
                format: void 0 !== labelOptions.format ? labelOptions.format : that._defaultFormatOptions,
                customizeText: labelOptions.customizeText
            };
            context.textOptions = {
                align: "center"
            };
            context.fontStyles = _patchFontOptions(_extend({}, that._themeManager.theme().label.font, labelOptions.font, {
                color: null
            }));
            that._textIndent = labelOptions.indent > 0 ? _Number(labelOptions.indent) : 0;
            context.lineWidth = labelOptions.connectorWidth > 0 ? _Number(labelOptions.connectorWidth) : 0;
            context.lineColor = labelOptions.connectorColor || null;
            text = that._renderer.text(_getSampleText(that._translator, context.formatOptions), 0, 0).attr(context.textOptions).css(context.fontStyles).append(that._barsGroup);
            bBox = text.getBBox();
            text.remove();
            context.textY = bBox.y;
            context.textWidth = bBox.width;
            context.textHeight = bBox.height
        }
        _circular_gauge.default.prototype._applyMainLayout.call(that);
        that._renderBars()
    },
    _measureMainElements: function() {
        var result = {
            maxRadius: this._area.radius
        };
        if (this._context.textEnabled) {
            result.horizontalMargin = this._context.textWidth;
            result.verticalMargin = this._context.textHeight;
            result.inverseHorizontalMargin = this._context.textWidth / 2;
            result.inverseVerticalMargin = this._context.textHeight / 2
        }
        return result
    },
    _renderBars: function() {
        var that = this;
        var options = _extend({}, that._themeManager.theme(), that.option());
        var radius;
        var area = that._area;
        var relativeInnerRadius = options.relativeInnerRadius > 0 && options.relativeInnerRadius < 1 ? _Number(options.relativeInnerRadius) : .1;
        radius = area.radius;
        if (that._context.textEnabled) {
            that._textIndent = _round(_min(that._textIndent, radius / 2));
            radius -= that._textIndent
        }
        that._outerRadius = _floor(radius);
        that._innerRadius = _floor(radius * relativeInnerRadius);
        that._barSpacing = options.barSpacing > 0 ? _Number(options.barSpacing) : 0;
        _extend(that._context, {
            backgroundColor: options.backgroundColor,
            x: area.x,
            y: area.y,
            startAngle: area.startCoord,
            endAngle: area.endCoord,
            baseAngle: that._translator.translate(that._baseValue)
        });
        that._arrangeBars()
    },
    _arrangeBars: function() {
        var that = this;
        var radius = that._outerRadius - that._innerRadius;
        var context = that._context;
        var i;
        var count = that._bars.length;
        that._beginValueChanging();
        context.barSize = count > 0 ? _max((radius - (count - 1) * that._barSpacing) / count, 1) : 0;
        var spacing = count > 1 ? _max(_min((radius - count * context.barSize) / (count - 1), that._barSpacing), 0) : 0;
        var _count = _min(_floor((radius + spacing) / context.barSize), count);
        that._setBarsCount(count);
        radius = that._outerRadius;
        context.textRadius = radius;
        context.textIndent = that._textIndent;
        that._palette.reset();
        var unitOffset = context.barSize + spacing;
        var colors = that._palette.generateColors(_count);
        for (i = 0; i < _count; ++i, radius -= unitOffset) {
            that._bars[i].arrange({
                radius: radius,
                color: colors[i]
            })
        }
        for (var _i = _count; _i < count; _i++) {
            that._bars[_i].hide()
        }
        if (that._animationSettings && !that._noAnimation) {
            that._animateBars()
        } else {
            that._updateBars()
        }
        that._endValueChanging()
    },
    _setBarsCount: function() {
        var that = this;
        if (that._bars.length > 0) {
            if (that._dummyBackground) {
                that._dummyBackground.dispose();
                that._dummyBackground = null
            }
        } else {
            if (!that._dummyBackground) {
                that._dummyBackground = that._renderer.arc().attr({
                    "stroke-linejoin": "round"
                })
            }
            that._dummyBackground.attr({
                x: that._context.x,
                y: that._context.y,
                outerRadius: that._outerRadius,
                innerRadius: that._innerRadius,
                startAngle: that._context.endAngle,
                endAngle: that._context.startAngle,
                fill: that._context.backgroundColor
            }).append(that._barsGroup)
        }
    },
    _updateBars: function() {
        this._bars.forEach(function(bar) {
            return bar.applyValue()
        });
        this._checkOverlap()
    },
    _checkOverlap: function() {
        var that = this;
        var bars = that._bars;
        var overlapStrategy = (0, _utils.normalizeEnum)(that._getOption("resolveLabelOverlapping", true));
        if ("none" === overlapStrategy) {
            return
        }
        var sortedBars = bars.concat().sort(function(a, b) {
            return a.getValue() - b.getValue()
        });
        var currentIndex = 0;
        var nextIndex = 1;
        while (currentIndex < sortedBars.length && nextIndex < sortedBars.length) {
            var current = sortedBars[currentIndex];
            var next = sortedBars[nextIndex];
            if (current.checkIntersect(next)) {
                next.hideLabel();
                nextIndex++
            } else {
                currentIndex = nextIndex;
                nextIndex = currentIndex + 1
            }
        }
    },
    _animateBars: function() {
        var that = this;
        var i;
        var ii = that._bars.length;
        if (ii > 0) {
            for (i = 0; i < ii; ++i) {
                that._bars[i].beginAnimation()
            }
            that._barsGroup.animate({
                _: 0
            }, that._animationSettings)
        }
    },
    _buildNodes: function() {
        var that = this;
        var options = that._options.silent();
        that._palette = that._themeManager.createPalette(options.palette, {
            useHighlight: true,
            extensionMode: options.paletteExtensionMode
        });
        that._palette.reset();
        that._bars = that._bars || [];
        that._animationSettings && that._barsGroup.stopAnimation();
        var barValues = that._values.filter(_isFinite);
        var count = barValues.length;
        if (that._bars.length > count) {
            var ii = that._bars.length;
            for (var i = count; i < ii; ++i) {
                that._bars[i].dispose()
            }
            that._bars.splice(count, ii - count)
        } else {
            if (that._bars.length < count) {
                for (var _i2 = that._bars.length; _i2 < count; ++_i2) {
                    that._bars.push(new BarWrapper(_i2, that._context))
                }
            }
        }
        that._bars.forEach(function(bar, index) {
            bar.update({
                color: that._palette.getNextColor(count),
                value: barValues[index]
            })
        })
    },
    _updateValues: function(values) {
        var that = this;
        var list = _isArray(values) && values || _isFinite(values) && [values] || [];
        var i;
        var ii = list.length;
        var value;
        that._values.length = ii;
        for (i = 0; i < ii; ++i) {
            value = list[i];
            that._values[i] = value = _Number(_isFinite(value) ? value : that._values[i])
        }
        if (!that._resizing) {
            if (!_compareArrays(that._values, that.option(OPTION_VALUES))) {
                that.option(OPTION_VALUES, that._values.slice())
            }
        }
        this._change(["NODES"])
    },
    values: function(arg) {
        if (void 0 !== arg) {
            this._updateValues(arg);
            return this
        } else {
            return this._values.slice(0)
        }
    },
    _optionChangesMap: {
        backgroundColor: "MOSTLY_TOTAL",
        relativeInnerRadius: "MOSTLY_TOTAL",
        barSpacing: "MOSTLY_TOTAL",
        label: "MOSTLY_TOTAL",
        resolveLabelOverlapping: "MOSTLY_TOTAL",
        palette: "MOSTLY_TOTAL",
        paletteExtensionMode: "MOSTLY_TOTAL",
        values: "VALUES"
    },
    _change_VALUES: function() {
        this._updateValues(this.option(OPTION_VALUES))
    },
    _factory: (0, _object.clone)(_base_gauge.dxBaseGauge.prototype._factory),
    _optionChangesOrder: ["VALUES", "NODES"],
    _initialChanges: ["VALUES"],
    _change_NODES: function() {
        this._buildNodes()
    },
    _change_MOSTLY_TOTAL: function() {
        this._change(["NODES"]);
        this.callBase()
    },
    _proxyData: [],
    _getLegendData: function() {
        var that = this;
        var formatOptions = {};
        var options = that._options.silent();
        var labelFormatOptions = (options.label || {}).format;
        var legendFormatOptions = (options.legend || {}).itemTextFormat;
        if (legendFormatOptions) {
            formatOptions.format = legendFormatOptions
        } else {
            formatOptions.format = labelFormatOptions || that._defaultFormatOptions
        }
        return (this._bars || []).map(function(b) {
            return {
                id: b.index,
                item: {
                    value: b.getValue(),
                    color: b.getColor(),
                    index: b.index
                },
                text: _formatValue(b.getValue(), formatOptions),
                visible: true,
                states: {
                    normal: {
                        fill: b.getColor()
                    }
                }
            }
        })
    }
});
exports.dxBarGauge = dxBarGauge;
BarWrapper = function(index, context) {
    var that = this;
    that._context = context;
    that._tracker = context.renderer.arc().attr({
        "stroke-linejoin": "round"
    });
    that.index = index
};
_extend(BarWrapper.prototype, {
    dispose: function() {
        var that = this;
        that._background.dispose();
        that._bar.dispose();
        if (that._context.textEnabled) {
            that._line.dispose();
            that._text.dispose()
        }
        that._context.tracker.detach(that._tracker);
        that._context = that._settings = that._background = that._bar = that._line = that._text = that._tracker = null;
        return that
    },
    arrange: function(options) {
        var that = this;
        var context = that._context;
        this._visible = true;
        context.tracker.attach(that._tracker, that, {
            index: that.index
        });
        that._background = context.renderer.arc().attr({
            "stroke-linejoin": "round",
            fill: context.backgroundColor
        }).append(context.group);
        that._settings = that._settings || {
            x: context.x,
            y: context.y,
            startAngle: context.baseAngle,
            endAngle: context.baseAngle
        };
        that._bar = context.renderer.arc().attr(_extend({
            "stroke-linejoin": "round"
        }, that._settings)).append(context.group);
        if (context.textEnabled) {
            that._line = context.renderer.path([], "line").attr({
                "stroke-width": context.lineWidth
            }).append(context.group);
            that._text = context.renderer.text().css(context.fontStyles).attr(context.textOptions).append(context.group)
        }
        that._angle = isFinite(that._angle) ? that._angle : context.baseAngle;
        that._settings.outerRadius = options.radius;
        that._settings.innerRadius = options.radius - context.barSize;
        that._settings.x = context.x;
        that._settings.y = context.y;
        that._background.attr(_extend({}, that._settings, {
            startAngle: context.endAngle,
            endAngle: context.startAngle,
            fill: that._context.backgroundColor
        }));
        that._bar.attr({
            x: context.x,
            y: context.y,
            outerRadius: that._settings.outerRadius,
            innerRadius: that._settings.innerRadius,
            fill: that._color
        });
        that._tracker.attr(that._settings);
        if (context.textEnabled) {
            that._line.attr({
                points: [context.x, context.y - that._settings.innerRadius, context.x, context.y - context.textRadius - context.textIndent],
                stroke: context.lineColor || that._color
            }).sharp();
            that._text.css({
                fill: context.textColor || that._color
            })
        }
        return that
    },
    getTooltipParameters: function() {
        var that = this;
        var cosSin = _getCosAndSin((that._angle + that._context.baseAngle) / 2);
        return {
            x: _round(that._context.x + (that._settings.outerRadius + that._settings.innerRadius) / 2 * cosSin.cos),
            y: _round(that._context.y - (that._settings.outerRadius + that._settings.innerRadius) / 2 * cosSin.sin),
            offset: 0,
            color: that._color,
            value: that._value
        }
    },
    setAngle: function(angle) {
        var that = this;
        var context = that._context;
        var settings = that._settings;
        var cosSin;
        that._angle = angle;
        setAngles(settings, context.baseAngle, angle);
        that._bar.attr(settings);
        that._tracker.attr(settings);
        if (context.textEnabled) {
            cosSin = _getCosAndSin(angle);
            var indent = context.textIndent;
            var radius = context.textRadius + indent;
            var x = context.x + radius * cosSin.cos;
            var y = context.y - radius * cosSin.sin;
            var halfWidth = .5 * context.textWidth;
            var textHeight = context.textHeight;
            var textY = context.textY;
            if (_abs(x - context.x) > indent) {
                x += x < context.x ? -halfWidth : halfWidth
            }
            if (_abs(y - context.y) <= indent) {
                y -= textY + .5 * textHeight
            } else {
                y -= y < context.y ? textY + textHeight : textY
            }
            var text = _formatValue(that._value, context.formatOptions, {
                index: that.index
            });
            var visibility = "" === text ? "hidden" : null;
            that._text.attr({
                text: text,
                x: x,
                y: y,
                visibility: visibility
            });
            that._line.attr({
                visibility: visibility
            });
            that._line.rotate(_convertAngleToRendererSpace(angle), context.x, context.y)
        }
        return that
    },
    hideLabel: function() {
        this._text.attr({
            visibility: "hidden"
        });
        this._line.attr({
            visibility: "hidden"
        })
    },
    checkIntersect: function(anotherBar) {
        var coords = this.calculateLabelCoords();
        var anotherCoords = anotherBar.calculateLabelCoords();
        if (!coords || !anotherCoords) {
            return false
        }
        var width = Math.max(0, Math.min(coords.bottomRight.x, anotherCoords.bottomRight.x) - Math.max(coords.topLeft.x, anotherCoords.topLeft.x));
        var height = Math.max(0, Math.min(coords.bottomRight.y, anotherCoords.bottomRight.y) - Math.max(coords.topLeft.y, anotherCoords.topLeft.y));
        return width * height !== 0
    },
    calculateLabelCoords: function() {
        if (!this._text) {
            return
        }
        var box = this._text.getBBox();
        return {
            topLeft: {
                x: box.x,
                y: box.y
            },
            bottomRight: {
                x: box.x + box.width,
                y: box.y + box.height
            }
        }
    },
    _processValue: function(value) {
        return this._context.translator.translate(this._context.translator.adjust(value))
    },
    applyValue: function() {
        if (!this._visible) {
            return this
        }
        return this.setAngle(this._processValue(this.getValue()))
    },
    update: function(_ref) {
        var color = _ref.color,
            value = _ref.value;
        this._color = color;
        this._value = value
    },
    hide: function() {
        this._visible = false
    },
    getColor: function() {
        return this._color
    },
    getValue: function() {
        return this._value
    },
    beginAnimation: function() {
        if (!this._visible) {
            return this
        }
        var that = this;
        var angle = this._processValue(this.getValue());
        if (!compareFloats(that._angle, angle)) {
            that._start = that._angle;
            that._delta = angle - that._angle;
            that._tracker.attr({
                visibility: "hidden"
            });
            if (that._context.textEnabled) {
                that._line.attr({
                    visibility: "hidden"
                });
                that._text.attr({
                    visibility: "hidden"
                })
            }
        } else {
            that.animate = _noop;
            that.setAngle(that._angle)
        }
    },
    animate: function(pos) {
        if (!this._visible) {
            return this
        }
        var that = this;
        that._angle = that._start + that._delta * pos;
        setAngles(that._settings, that._context.baseAngle, that._angle);
        that._bar.attr(that._settings)
    },
    endAnimation: function() {
        var that = this;
        if (void 0 !== that._delta) {
            if (compareFloats(that._angle, that._start + that._delta)) {
                that._tracker.attr({
                    visibility: null
                });
                that.setAngle(that._angle)
            }
        } else {
            delete that.animate
        }
        delete that._start;
        delete that._delta
    }
});

function setAngles(target, angle1, angle2) {
    target.startAngle = angle1 < angle2 ? angle1 : angle2;
    target.endAngle = angle1 < angle2 ? angle2 : angle1
}

function compareFloats(value1, value2) {
    return _abs(value1 - value2) < 1e-4
}(0, _component_registrator.default)("dxBarGauge", dxBarGauge);
dxBarGauge.addPlugin(_legend.plugin);
