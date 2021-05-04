/**
 * DevExtreme (viz/sparklines/bullet.js)
 * Version: 20.2.6
 * Build date: Tue Mar 16 2021
 *
 * Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
exports.default = void 0;
var _iterator = require("../../core/utils/iterator");
var _base_sparkline = _interopRequireDefault(require("./base_sparkline"));
var _component_registrator = _interopRequireDefault(require("../../core/component_registrator"));

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        "default": obj
    }
}
var TARGET_MIN_Y = .02;
var TARGET_MAX_Y = .98;
var BAR_VALUE_MIN_Y = .1;
var BAR_VALUE_MAX_Y = .9;
var DEFAULT_CANVAS_WIDTH = 300;
var DEFAULT_CANVAS_HEIGHT = 30;
var DEFAULT_HORIZONTAL_MARGIN = 1;
var DEFAULT_VERTICAL_MARGIN = 2;
var _Number = Number;
var _isFinite = isFinite;
var dxBullet = _base_sparkline.default.inherit({
    _rootClassPrefix: "dxb",
    _rootClass: "dxb-bullet",
    _themeSection: "bullet",
    _defaultSize: {
        width: DEFAULT_CANVAS_WIDTH,
        height: DEFAULT_CANVAS_HEIGHT,
        left: DEFAULT_HORIZONTAL_MARGIN,
        right: DEFAULT_HORIZONTAL_MARGIN,
        top: DEFAULT_VERTICAL_MARGIN,
        bottom: DEFAULT_VERTICAL_MARGIN
    },
    _disposeWidgetElements: function() {
        delete this._zeroLevelPath;
        delete this._targetPath;
        delete this._barValuePath
    },
    _cleanWidgetElements: function() {
        this._zeroLevelPath.remove();
        this._targetPath.remove();
        this._barValuePath.remove()
    },
    _drawWidgetElements: function() {
        this._drawBullet();
        this._drawn()
    },
    _createHtmlElements: function() {
        var renderer = this._renderer;
        this._zeroLevelPath = renderer.path(void 0, "line").attr({
            "class": "dxb-zero-level",
            "stroke-linecap": "square"
        });
        this._targetPath = renderer.path(void 0, "line").attr({
            "class": "dxb-target",
            "stroke-linecap": "square"
        });
        this._barValuePath = renderer.path(void 0, "line").attr({
            "class": "dxb-bar-value",
            "stroke-linecap": "square"
        })
    },
    _prepareOptions: function() {
        var that = this;
        var options;
        var startScaleValue;
        var endScaleValue;
        var level;
        var value;
        var target;
        that._allOptions = options = that.callBase();
        var isValueUndefined = void 0 === that._allOptions.value;
        var isTargetUndefined = void 0 === that._allOptions.target;
        that._tooltipEnabled = !(isValueUndefined && isTargetUndefined);
        if (isValueUndefined) {
            that._allOptions.value = 0
        }
        if (isTargetUndefined) {
            that._allOptions.target = 0
        }
        options.value = value = _Number(options.value);
        options.target = target = _Number(options.target);
        if (void 0 === that._allOptions.startScaleValue) {
            that._allOptions.startScaleValue = target < value ? target : value;
            that._allOptions.startScaleValue = that._allOptions.startScaleValue < 0 ? that._allOptions.startScaleValue : 0
        }
        if (void 0 === that._allOptions.endScaleValue) {
            that._allOptions.endScaleValue = target > value ? target : value
        }
        options.startScaleValue = startScaleValue = _Number(options.startScaleValue);
        options.endScaleValue = endScaleValue = _Number(options.endScaleValue);
        if (endScaleValue < startScaleValue) {
            level = endScaleValue;
            that._allOptions.endScaleValue = startScaleValue;
            that._allOptions.startScaleValue = level;
            that._allOptions.inverted = true
        }
    },
    _updateRange: function() {
        var that = this;
        var options = that._allOptions;
        that._ranges = {
            arg: {
                invert: options.rtlEnabled ? !options.inverted : options.inverted,
                min: options.startScaleValue,
                max: options.endScaleValue,
                axisType: "continuous",
                dataType: "numeric"
            },
            val: {
                min: 0,
                max: 1,
                axisType: "continuous",
                dataType: "numeric"
            }
        }
    },
    _drawBullet: function() {
        var that = this;
        var options = that._allOptions;
        var isValidBounds = options.startScaleValue !== options.endScaleValue;
        var isValidMin = _isFinite(options.startScaleValue);
        var isValidMax = _isFinite(options.endScaleValue);
        var isValidValue = _isFinite(options.value);
        var isValidTarget = _isFinite(options.target);
        if (isValidBounds && isValidMax && isValidMin && isValidTarget && isValidValue) {
            this._drawBarValue();
            this._drawTarget();
            this._drawZeroLevel()
        }
    },
    _getTargetParams: function() {
        var that = this;
        var options = that._allOptions;
        var translatorY = that._valueAxis.getTranslator();
        var x = that._argumentAxis.getTranslator().translate(options.target);
        return {
            points: [x, translatorY.translate(TARGET_MIN_Y), x, translatorY.translate(TARGET_MAX_Y)],
            stroke: options.targetColor,
            "stroke-width": options.targetWidth
        }
    },
    _getBarValueParams: function() {
        var that = this;
        var options = that._allOptions;
        var translatorX = that._argumentAxis.getTranslator();
        var translatorY = that._valueAxis.getTranslator();
        var startLevel = options.startScaleValue;
        var endLevel = options.endScaleValue;
        var value = options.value;
        var y2 = translatorY.translate(BAR_VALUE_MIN_Y);
        var y1 = translatorY.translate(BAR_VALUE_MAX_Y);
        var x1;
        var x2;
        if (value > 0) {
            x1 = startLevel <= 0 ? 0 : startLevel;
            x2 = value >= endLevel ? endLevel : value < x1 ? x1 : value
        } else {
            x1 = endLevel >= 0 ? 0 : endLevel;
            x2 = value < startLevel ? startLevel : value > x1 ? x1 : value
        }
        x1 = translatorX.translate(x1);
        x2 = translatorX.translate(x2);
        return {
            points: [x1, y1, x2, y1, x2, y2, x1, y2],
            fill: options.color
        }
    },
    _getCorrectCanvas: function() {
        return this._canvas
    },
    _getZeroLevelParams: function() {
        var that = this;
        var translatorY = that._valueAxis.getTranslator();
        var x = that._argumentAxis.getTranslator().translate(0);
        return {
            points: [x, translatorY.translate(TARGET_MIN_Y), x, translatorY.translate(TARGET_MAX_Y)],
            stroke: that._allOptions.targetColor,
            "stroke-width": 1
        }
    },
    _drawZeroLevel: function() {
        var that = this;
        var options = that._allOptions;
        if (0 > options.endScaleValue || 0 < options.startScaleValue || !options.showZeroLevel) {
            return
        }
        that._zeroLevelPath.attr(that._getZeroLevelParams()).sharp().append(that._renderer.root)
    },
    _drawTarget: function() {
        var that = this;
        var options = that._allOptions;
        var target = options.target;
        if (target > options.endScaleValue || target < options.startScaleValue || !options.showTarget) {
            return
        }
        that._targetPath.attr(that._getTargetParams()).sharp().append(that._renderer.root)
    },
    _drawBarValue: function() {
        this._barValuePath.attr(this._getBarValueParams()).append(this._renderer.root)
    },
    _getTooltipCoords: function() {
        var canvas = this._canvas;
        var rootOffset = this._renderer.getRootOffset();
        var bBox = this._barValuePath.getBBox();
        return {
            x: bBox.x + bBox.width / 2 + rootOffset.left,
            y: canvas.height / 2 + rootOffset.top
        }
    },
    _getTooltipData: function() {
        var that = this;
        var tooltip = that._tooltip;
        var options = that._allOptions;
        var value = options.value;
        var target = options.target;
        var valueText = tooltip.formatValue(value);
        var targetText = tooltip.formatValue(target);
        return {
            originalValue: value,
            originalTarget: target,
            value: valueText,
            target: targetText,
            valueText: ["Actual Value:", valueText, "Target Value:", targetText]
        }
    },
    _isTooltipEnabled: function() {
        return this._tooltipEnabled
    }
});
(0, _iterator.each)(["color", "targetColor", "targetWidth", "showTarget", "showZeroLevel", "value", "target", "startScaleValue", "endScaleValue"], function(_, name) {
    dxBullet.prototype._optionChangesMap[name] = "OPTIONS"
});
(0, _component_registrator.default)("dxBullet", dxBullet);
var _default = dxBullet;
exports.default = _default;
module.exports = exports.default;
