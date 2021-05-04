/**
 * DevExtreme (ui/track_bar.js)
 * Version: 20.2.6
 * Build date: Tue Mar 16 2021
 *
 * Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
exports.default = void 0;
var _renderer = _interopRequireDefault(require("../core/renderer"));
var _editor = _interopRequireDefault(require("./editor/editor"));
var _component_registrator = _interopRequireDefault(require("../core/component_registrator"));
var _extend = require("../core/utils/extend");
var _window = require("../core/utils/window");
var _fx = _interopRequireDefault(require("../animation/fx"));

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        "default": obj
    }
}
var TRACKBAR_CLASS = "dx-trackbar";
var TRACKBAR_CONTAINER_CLASS = "dx-trackbar-container";
var TRACKBAR_RANGE_CLASS = "dx-trackbar-range";
var TRACKBAR_WRAPPER_CLASS = "dx-trackbar-wrapper";
var TrackBar = _editor.default.inherit({
    _getDefaultOptions: function() {
        return (0, _extend.extend)(this.callBase(), {
            min: 0,
            max: 100,
            value: 0
        })
    },
    _initMarkup: function() {
        this.$element().addClass(TRACKBAR_CLASS);
        this._renderWrapper();
        this._renderContainer();
        this._renderRange();
        this._renderValue();
        this._setRangeStyles();
        this.callBase()
    },
    _render: function() {
        this.callBase();
        this._setRangeStyles(this._rangeStylesConfig())
    },
    _renderWrapper: function() {
        this._$wrapper = (0, _renderer.default)("<div>").addClass(TRACKBAR_WRAPPER_CLASS).appendTo(this.$element())
    },
    _renderContainer: function() {
        this._$bar = (0, _renderer.default)("<div>").addClass(TRACKBAR_CONTAINER_CLASS).appendTo(this._$wrapper)
    },
    _renderRange: function() {
        this._$range = (0, _renderer.default)("<div>").addClass(TRACKBAR_RANGE_CLASS).appendTo(this._$bar)
    },
    _renderValue: function() {
        var val = this.option("value");
        var min = this.option("min");
        var max = this.option("max");
        if (min > max) {
            return
        }
        if (val < min) {
            this.option("value", min);
            this._currentRatio = 0;
            return
        }
        if (val > max) {
            this.option("value", max);
            this._currentRatio = 1;
            return
        }
        var ratio = min === max ? 0 : (val - min) / (max - min);
        !this._needPreventAnimation && this._setRangeStyles({
            width: 100 * ratio + "%"
        });
        this.setAria({
            valuemin: this.option("min"),
            valuemax: max,
            valuenow: val
        });
        this._currentRatio = ratio
    },
    _rangeStylesConfig: function() {
        return {
            width: 100 * this._currentRatio + "%"
        }
    },
    _setRangeStyles: function(options) {
        _fx.default.stop(this._$range);
        if (!options) {
            this._$range.css({
                width: 0
            });
            return
        }
        if (this._needPreventAnimation || !(0, _window.hasWindow)()) {
            return
        }
        _fx.default.animate(this._$range, {
            type: "custom",
            duration: 100,
            to: options
        })
    },
    _optionChanged: function(args) {
        switch (args.name) {
            case "value":
                this._renderValue();
                this.callBase(args);
                break;
            case "max":
            case "min":
                this._renderValue();
                break;
            default:
                this.callBase(args)
        }
    },
    _dispose: function() {
        _fx.default.stop(this._$range);
        this.callBase()
    }
});
(0, _component_registrator.default)("dxTrackBar", TrackBar);
var _default = TrackBar;
exports.default = _default;
module.exports = exports.default;
