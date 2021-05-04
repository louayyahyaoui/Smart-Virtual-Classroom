/**
 * DevExtreme (viz/gauges/base_gauge.js)
 * Version: 20.2.6
 * Build date: Tue Mar 16 2021
 *
 * Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
exports.compareArrays = compareArrays;
exports.getSampleText = exports.formatValue = exports.dxBaseGauge = void 0;
var _utils = require("../core/utils");
var _extend2 = require("../../core/utils/extend");
var _translator1d = require("../translators/translator1d");
var _base_widget = _interopRequireDefault(require("../core/base_widget"));
var _theme_manager = _interopRequireDefault(require("./theme_manager"));
var _tracker = _interopRequireDefault(require("./tracker"));
var _format_helper = _interopRequireDefault(require("../../format_helper"));
var _export = require("../core/export");
var _title = require("../core/title");
var _tooltip = require("../core/tooltip");
var _loading_indicator = require("../core/loading_indicator");

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        "default": obj
    }
}
var _Number = Number;
var _extend = _extend2.extend;
var _format = _format_helper.default.format;
var dxBaseGauge = _base_widget.default.inherit({
    _rootClassPrefix: "dxg",
    _themeSection: "gauge",
    _createThemeManager: function() {
        return new _theme_manager.default.ThemeManager(this._getThemeManagerOptions())
    },
    _initCore: function() {
        var that = this;
        var root = that._renderer.root;
        that._valueChangingLocker = 0;
        that._translator = that._factory.createTranslator();
        that._tracker = that._factory.createTracker({
            renderer: that._renderer,
            container: root
        });
        that._setTrackerCallbacks()
    },
    _beginValueChanging: function() {
        this._resetIsReady();
        this._onBeginUpdate();
        ++this._valueChangingLocker
    },
    _endValueChanging: function() {
        if (0 === --this._valueChangingLocker) {
            this._drawn()
        }
    },
    _setTrackerCallbacks: function() {
        var that = this;
        var renderer = that._renderer;
        var tooltip = that._tooltip;
        that._tracker.setCallbacks({
            "tooltip-show": function(target, info, callback) {
                var tooltipParameters = target.getTooltipParameters();
                var offset = renderer.getRootOffset();
                var formatObject = _extend({
                    value: tooltipParameters.value,
                    valueText: tooltip.formatValue(tooltipParameters.value),
                    color: tooltipParameters.color
                }, info);
                return tooltip.show(formatObject, {
                    x: tooltipParameters.x + offset.left,
                    y: tooltipParameters.y + offset.top,
                    offset: tooltipParameters.offset
                }, {
                    target: info
                }, void 0, callback)
            },
            "tooltip-hide": function() {
                return tooltip.hide()
            }
        })
    },
    _dispose: function() {
        this._cleanCore();
        this.callBase.apply(this, arguments)
    },
    _disposeCore: function() {
        var that = this;
        that._themeManager.dispose();
        that._tracker.dispose();
        that._translator = that._tracker = null
    },
    _cleanCore: function() {
        var that = this;
        that._tracker.deactivate();
        that._cleanContent()
    },
    _renderCore: function() {
        var that = this;
        if (!that._isValidDomain) {
            return
        }
        that._renderContent();
        that._tracker.setTooltipState(that._tooltip.isEnabled());
        that._tracker.activate();
        that._noAnimation = false
    },
    _applyChanges: function() {
        this.callBase.apply(this, arguments);
        this._resizing = this._noAnimation = false
    },
    _setContentSize: function() {
        var that = this;
        that._resizing = that._noAnimation = 2 === that._changes.count();
        that.callBase.apply(that, arguments)
    },
    _applySize: function(rect) {
        var that = this;
        that._innerRect = {
            left: rect[0],
            top: rect[1],
            right: rect[2],
            bottom: rect[3]
        };
        var layoutCache = that._layout._cache;
        that._cleanCore();
        that._renderCore();
        that._layout._cache = that._layout._cache || layoutCache;
        return [rect[0], that._innerRect.top, rect[2], that._innerRect.bottom]
    },
    _initialChanges: ["DOMAIN"],
    _themeDependentChanges: ["DOMAIN"],
    _optionChangesMap: {
        subtitle: "MOSTLY_TOTAL",
        indicator: "MOSTLY_TOTAL",
        geometry: "MOSTLY_TOTAL",
        animation: "MOSTLY_TOTAL",
        startValue: "DOMAIN",
        endValue: "DOMAIN"
    },
    _optionChangesOrder: ["DOMAIN", "MOSTLY_TOTAL"],
    _change_DOMAIN: function() {
        this._setupDomain()
    },
    _change_MOSTLY_TOTAL: function() {
        this._applyMostlyTotalChange()
    },
    _setupDomain: function() {
        var that = this;
        that._setupDomainCore();
        that._isValidDomain = isFinite(1 / (that._translator.getDomain()[1] - that._translator.getDomain()[0]));
        if (!that._isValidDomain) {
            that._incidentOccurred("W2301")
        }
        that._change(["MOSTLY_TOTAL"])
    },
    _applyMostlyTotalChange: function() {
        var that = this;
        that._setupCodomain();
        that._setupAnimationSettings();
        that._setupDefaultFormat();
        that._change(["LAYOUT"])
    },
    _setupAnimationSettings: function() {
        var that = this;
        var option = that.option("animation");
        that._animationSettings = null;
        if (void 0 === option || option) {
            option = _extend({
                enabled: true,
                duration: 1e3,
                easing: "easeOutCubic"
            }, option);
            if (option.enabled && option.duration > 0) {
                that._animationSettings = {
                    duration: _Number(option.duration),
                    easing: option.easing
                }
            }
        }
        that._containerBackgroundColor = that.option("containerBackgroundColor") || that._themeManager.theme().containerBackgroundColor
    },
    _setupDefaultFormat: function() {
        var domain = this._translator.getDomain();
        this._defaultFormatOptions = (0, _utils.getAppropriateFormat)(domain[0], domain[1], this._getApproximateScreenRange())
    },
    _setupDomainCore: null,
    _calculateSize: null,
    _cleanContent: null,
    _renderContent: null,
    _setupCodomain: null,
    _getApproximateScreenRange: null,
    _factory: {
        createTranslator: function() {
            return new _translator1d.Translator1D
        },
        createTracker: function(parameters) {
            return new _tracker.default(parameters)
        }
    }
});
exports.dxBaseGauge = dxBaseGauge;
var formatValue = function(value, options, extra) {
    options = options || {};
    var text = _format(value, options.format);
    var formatObject;
    if ("function" === typeof options.customizeText) {
        formatObject = _extend({
            value: value,
            valueText: text
        }, extra);
        return String(options.customizeText.call(formatObject, formatObject))
    }
    return text
};
exports.formatValue = formatValue;
var getSampleText = function(translator, options) {
    var text1 = formatValue(translator.getDomainStart(), options);
    var text2 = formatValue(translator.getDomainEnd(), options);
    return text1.length >= text2.length ? text1 : text2
};
exports.getSampleText = getSampleText;

function compareArrays(array1, array2) {
    return array1 && array2 && array1.length === array2.length && compareArraysElements(array1, array2)
}

function compareArraysElements(array1, array2) {
    var i;
    var ii = array1.length;
    var array1ValueIsNaN;
    var array2ValueIsNaN;
    for (i = 0; i < ii; ++i) {
        array1ValueIsNaN = array1[i] !== array1[i];
        array2ValueIsNaN = array2[i] !== array2[i];
        if (array1ValueIsNaN && array2ValueIsNaN) {
            continue
        }
        if (array1[i] !== array2[i]) {
            return false
        }
    }
    return true
}
dxBaseGauge.addPlugin(_export.plugin);
dxBaseGauge.addPlugin(_title.plugin);
dxBaseGauge.addPlugin(_tooltip.plugin);
dxBaseGauge.addPlugin(_loading_indicator.plugin);
var _setTooltipOptions = dxBaseGauge.prototype._setTooltipOptions;
dxBaseGauge.prototype._setTooltipOptions = function() {
    _setTooltipOptions.apply(this, arguments);
    this._tracker && this._tracker.setTooltipState(this._tooltip.isEnabled())
};
