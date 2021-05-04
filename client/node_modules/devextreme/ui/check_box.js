/**
 * DevExtreme (ui/check_box.js)
 * Version: 20.2.6
 * Build date: Tue Mar 16 2021
 *
 * Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
exports.default = void 0;
var _renderer = _interopRequireDefault(require("../core/renderer"));
var _events_engine = _interopRequireDefault(require("../events/core/events_engine"));
var _devices = _interopRequireDefault(require("../core/devices"));
var _extend = require("../core/utils/extend");
var _utils = require("./widget/utils.ink_ripple");
var _editor = _interopRequireDefault(require("./editor/editor"));
var _component_registrator = _interopRequireDefault(require("../core/component_registrator"));
var _index = require("../events/utils/index");
var _click = require("../events/click");

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        "default": obj
    }
}
var CHECKBOX_CLASS = "dx-checkbox";
var CHECKBOX_ICON_CLASS = "dx-checkbox-icon";
var CHECKBOX_CHECKED_CLASS = "dx-checkbox-checked";
var CHECKBOX_CONTAINER_CLASS = "dx-checkbox-container";
var CHECKBOX_TEXT_CLASS = "dx-checkbox-text";
var CHECKBOX_HAS_TEXT_CLASS = "dx-checkbox-has-text";
var CHECKBOX_INDETERMINATE_CLASS = "dx-checkbox-indeterminate";
var CHECKBOX_FEEDBACK_HIDE_TIMEOUT = 100;
var CheckBox = _editor.default.inherit({
    _supportedKeys: function() {
        var click = function(e) {
            e.preventDefault();
            this._clickAction({
                event: e
            })
        };
        return (0, _extend.extend)(this.callBase(), {
            space: click
        })
    },
    _getDefaultOptions: function() {
        return (0, _extend.extend)(this.callBase(), {
            hoverStateEnabled: true,
            activeStateEnabled: true,
            value: false,
            text: "",
            useInkRipple: false
        })
    },
    _defaultOptionsRules: function() {
        return this.callBase().concat([{
            device: function() {
                return "desktop" === _devices.default.real().deviceType && !_devices.default.isSimulator()
            },
            options: {
                focusStateEnabled: true
            }
        }])
    },
    _canValueBeChangedByClick: function() {
        return true
    },
    _feedbackHideTimeout: CHECKBOX_FEEDBACK_HIDE_TIMEOUT,
    _initMarkup: function() {
        this._renderSubmitElement();
        this._$container = (0, _renderer.default)("<div>").addClass(CHECKBOX_CONTAINER_CLASS);
        this.setAria("role", "checkbox");
        this.$element().addClass(CHECKBOX_CLASS);
        this._renderValue();
        this._renderIcon();
        this._renderText();
        this.option("useInkRipple") && this._renderInkRipple();
        this.$element().append(this._$container);
        this.callBase()
    },
    _render: function() {
        this._renderClick();
        this.callBase()
    },
    _renderSubmitElement: function() {
        this._$submitElement = (0, _renderer.default)("<input>").attr("type", "hidden").appendTo(this.$element())
    },
    _getSubmitElement: function() {
        return this._$submitElement
    },
    _renderInkRipple: function() {
        this._inkRipple = (0, _utils.render)({
            waveSizeCoefficient: 2.5,
            useHoldAnimation: false,
            wavesNumber: 2,
            isCentered: true
        })
    },
    _renderInkWave: function(element, dxEvent, doRender, waveIndex) {
        if (!this._inkRipple) {
            return
        }
        var config = {
            element: element,
            event: dxEvent,
            wave: waveIndex
        };
        if (doRender) {
            this._inkRipple.showWave(config)
        } else {
            this._inkRipple.hideWave(config)
        }
    },
    _updateFocusState: function(e, value) {
        this.callBase.apply(this, arguments);
        this._renderInkWave(this._$icon, e, value, 0)
    },
    _toggleActiveState: function($element, value, e) {
        this.callBase.apply(this, arguments);
        this._renderInkWave(this._$icon, e, value, 1)
    },
    _renderIcon: function() {
        this._$icon = (0, _renderer.default)("<span>").addClass(CHECKBOX_ICON_CLASS).prependTo(this._$container)
    },
    _renderText: function() {
        var textValue = this.option("text");
        if (!textValue) {
            if (this._$text) {
                this._$text.remove();
                this.$element().removeClass(CHECKBOX_HAS_TEXT_CLASS)
            }
            return
        }
        if (!this._$text) {
            this._$text = (0, _renderer.default)("<span>").addClass(CHECKBOX_TEXT_CLASS)
        }
        this._$text.text(textValue);
        this._$container.append(this._$text);
        this.$element().addClass(CHECKBOX_HAS_TEXT_CLASS)
    },
    _renderClick: function() {
        var that = this;
        var eventName = (0, _index.addNamespace)(_click.name, that.NAME);
        that._clickAction = that._createAction(that._clickHandler);
        _events_engine.default.off(that.$element(), eventName);
        _events_engine.default.on(that.$element(), eventName, function(e) {
            that._clickAction({
                event: e
            })
        })
    },
    _clickHandler: function(args) {
        var that = args.component;
        that._saveValueChangeEvent(args.event);
        that.option("value", !that.option("value"))
    },
    _renderValue: function() {
        var $element = this.$element();
        var checked = this.option("value");
        var indeterminate = void 0 === checked;
        $element.toggleClass(CHECKBOX_CHECKED_CLASS, Boolean(checked));
        $element.toggleClass(CHECKBOX_INDETERMINATE_CLASS, indeterminate);
        this._getSubmitElement().val(checked);
        this.setAria("checked", indeterminate ? "mixed" : checked || "false")
    },
    _optionChanged: function(args) {
        switch (args.name) {
            case "useInkRipple":
                this._invalidate();
                break;
            case "value":
                this._renderValue();
                this.callBase(args);
                break;
            case "text":
                this._renderText();
                this._renderDimensions();
                break;
            default:
                this.callBase(args)
        }
    },
    _clean: function() {
        delete this._inkRipple;
        this.callBase()
    }
});
(0, _component_registrator.default)("dxCheckBox", CheckBox);
var _default = CheckBox;
exports.default = _default;
module.exports = exports.default;
module.exports.default = module.exports;
