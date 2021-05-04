/**
 * DevExtreme (ui/number_box/number_box.base.js)
 * Version: 20.2.6
 * Build date: Tue Mar 16 2021
 *
 * Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
exports.default = void 0;
var _renderer = _interopRequireDefault(require("../../core/renderer"));
var _dom_adapter = _interopRequireDefault(require("../../core/dom_adapter"));
var _events_engine = _interopRequireDefault(require("../../events/core/events_engine"));
var _common = require("../../core/utils/common");
var _type = require("../../core/utils/type");
var _math = require("../../core/utils/math");
var _extend = require("../../core/utils/extend");
var _array = require("../../core/utils/array");
var _devices = _interopRequireDefault(require("../../core/devices"));
var _browser = _interopRequireDefault(require("../../core/utils/browser"));
var _ui = _interopRequireDefault(require("../text_box/ui.text_editor"));
var _index = require("../../events/utils/index");
var _number_box = _interopRequireDefault(require("./number_box.spins"));
var _message = _interopRequireDefault(require("../../localization/message"));
var _deferred = require("../../core/utils/deferred");

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        "default": obj
    }
}
var math = Math;
var WIDGET_CLASS = "dx-numberbox";
var FIREFOX_CONTROL_KEYS = ["tab", "del", "backspace", "leftArrow", "rightArrow", "home", "end", "enter"];
var FORCE_VALUECHANGE_EVENT_NAMESPACE = "NumberBoxForceValueChange";
var NumberBoxBase = _ui.default.inherit({
    _supportedKeys: function() {
        return (0, _extend.extend)(this.callBase(), {
            upArrow: function(e) {
                if (!(0, _index.isCommandKeyPressed)(e)) {
                    e.preventDefault();
                    e.stopPropagation();
                    this._spinUpChangeHandler(e)
                }
            },
            downArrow: function(e) {
                if (!(0, _index.isCommandKeyPressed)(e)) {
                    e.preventDefault();
                    e.stopPropagation();
                    this._spinDownChangeHandler(e)
                }
            },
            enter: function() {}
        })
    },
    _getDefaultOptions: function() {
        return (0, _extend.extend)(this.callBase(), {
            value: 0,
            min: void 0,
            max: void 0,
            step: 1,
            showSpinButtons: false,
            useLargeSpinButtons: true,
            mode: "text",
            invalidValueMessage: _message.default.format("dxNumberBox-invalidValueMessage"),
            buttons: void 0
        })
    },
    _getDefaultButtons: function() {
        return this.callBase().concat([{
            name: "spins",
            Ctor: _number_box.default
        }])
    },
    _isSupportInputMode: function() {
        var version = parseFloat(_browser.default.version);
        return _browser.default.chrome && version >= 66 || _browser.default.safari && version >= 12 || _browser.default.msie && version >= 75
    },
    _defaultOptionsRules: function() {
        return this.callBase().concat([{
            device: function() {
                return _devices.default.real().generic && !_devices.default.isSimulator()
            },
            options: {
                useLargeSpinButtons: false
            }
        }, {
            device: function() {
                return "desktop" !== _devices.default.real().deviceType && !this._isSupportInputMode()
            }.bind(this),
            options: {
                mode: "number"
            }
        }])
    },
    _initMarkup: function() {
        this._renderSubmitElement();
        this.$element().addClass(WIDGET_CLASS);
        this.callBase()
    },
    _getDefaultAttributes: function() {
        var attributes = this.callBase();
        attributes.inputmode = "decimal";
        return attributes
    },
    _renderContentImpl: function() {
        this.option("isValid") && this._validateValue(this.option("value"));
        this.setAria("role", "spinbutton")
    },
    _renderSubmitElement: function() {
        this._$submitElement = (0, _renderer.default)("<input>").attr("type", "hidden").appendTo(this.$element());
        this._setSubmitValue(this.option("value"))
    },
    _setSubmitValue: function(value) {
        this._getSubmitElement().val((0, _common.applyServerDecimalSeparator)(value))
    },
    _getSubmitElement: function() {
        return this._$submitElement
    },
    _keyPressHandler: function(e) {
        this.callBase(e);
        var char = (0, _index.getChar)(e);
        var validCharRegExp = /[\d.,eE\-+]|Subtract/;
        var isInputCharValid = validCharRegExp.test(char);
        if (!isInputCharValid) {
            var keyName = (0, _index.normalizeKeyName)(e);
            if ((0, _index.isCommandKeyPressed)(e) || keyName && (0, _array.inArray)(keyName, FIREFOX_CONTROL_KEYS) >= 0) {
                return
            }
            e.preventDefault();
            return false
        }
        this._keyPressed = true
    },
    _onMouseWheel: function(dxEvent) {
        dxEvent.delta > 0 ? this._spinValueChange(1, dxEvent) : this._spinValueChange(-1, dxEvent)
    },
    _renderValue: function() {
        var inputValue = this._input().val();
        var value = this.option("value");
        if (!inputValue.length || Number(inputValue) !== value) {
            this._forceValueRender();
            this._toggleEmptinessEventHandler()
        }
        var valueText = (0, _type.isDefined)(value) ? null : _message.default.format("dxNumberBox-noDataText");
        this.setAria({
            valuenow: (0, _common.ensureDefined)(value, ""),
            valuetext: valueText
        });
        this.option("text", this._input().val());
        this._updateButtons();
        return (new _deferred.Deferred).resolve()
    },
    _forceValueRender: function() {
        var value = this.option("value");
        var number = Number(value);
        var formattedValue = isNaN(number) ? "" : this._applyDisplayValueFormatter(value);
        this._renderDisplayText(formattedValue)
    },
    _applyDisplayValueFormatter: function(value) {
        return this.option("displayValueFormatter")(value)
    },
    _renderProps: function() {
        this.callBase();
        this._input().prop({
            min: this.option("min"),
            max: this.option("max"),
            step: this.option("step")
        });
        this.setAria({
            valuemin: (0, _common.ensureDefined)(this.option("min"), ""),
            valuemax: (0, _common.ensureDefined)(this.option("max"), "")
        })
    },
    _spinButtonsPointerDownHandler: function() {
        var $input = this._input();
        if (!this.option("useLargeSpinButtons") && _dom_adapter.default.getActiveElement() !== $input[0]) {
            _events_engine.default.trigger($input, "focus")
        }
    },
    _spinUpChangeHandler: function(e) {
        if (!this.option("readOnly")) {
            this._spinValueChange(1, e.event || e)
        }
    },
    _spinDownChangeHandler: function(e) {
        if (!this.option("readOnly")) {
            this._spinValueChange(-1, e.event || e)
        }
    },
    _spinValueChange: function(sign, dxEvent) {
        var step = parseFloat(this.option("step"));
        if (0 === step) {
            return
        }
        var value = parseFloat(this._normalizeInputValue()) || 0;
        value = this._correctRounding(value, step * sign);
        var min = this.option("min");
        var max = this.option("max");
        if ((0, _type.isDefined)(min)) {
            value = Math.max(min, value)
        }
        if ((0, _type.isDefined)(max)) {
            value = Math.min(max, value)
        }
        this._saveValueChangeEvent(dxEvent);
        this.option("value", value)
    },
    _correctRounding: function(value, step) {
        var regex = /[,.](.*)/;
        var isFloatValue = regex.test(value);
        var isFloatStep = regex.test(step);
        if (isFloatValue || isFloatStep) {
            var valueAccuracy = isFloatValue ? regex.exec(value)[0].length : 0;
            var stepAccuracy = isFloatStep ? regex.exec(step)[0].length : 0;
            var accuracy = math.max(valueAccuracy, stepAccuracy);
            value = this._round(value + step, accuracy);
            return value
        }
        return value + step
    },
    _round: function(value, precision) {
        precision = precision || 0;
        var multiplier = Math.pow(10, precision);
        value *= multiplier;
        value = Math.round(value) / multiplier;
        return value
    },
    _renderValueChangeEvent: function() {
        this.callBase();
        var forceValueChangeEvent = (0, _index.addNamespace)("focusout", FORCE_VALUECHANGE_EVENT_NAMESPACE);
        _events_engine.default.off(this.element(), forceValueChangeEvent);
        _events_engine.default.on(this.element(), forceValueChangeEvent, this._forceRefreshInputValue.bind(this))
    },
    _forceRefreshInputValue: function() {
        if ("number" === this.option("mode")) {
            return
        }
        var $input = this._input();
        var formattedValue = this._applyDisplayValueFormatter(this.option("value"));
        $input.val(null);
        $input.val(formattedValue)
    },
    _valueChangeEventHandler: function(e) {
        var $input = this._input();
        var inputValue = this._normalizeText();
        var value = this._parseValue(inputValue);
        var valueHasDigits = "." !== inputValue && "-" !== inputValue;
        if (this._isValueValid() && !this._validateValue(value)) {
            $input.val(this._applyDisplayValueFormatter(value));
            return
        }
        if (valueHasDigits) {
            this.callBase(e, isNaN(value) ? null : value)
        }
        this._applyValueBoundaries(inputValue, value);
        this.validationRequest.fire({
            value: value,
            editor: this
        })
    },
    _applyValueBoundaries: function(inputValue, parsedValue) {
        var isValueIncomplete = this._isValueIncomplete(inputValue);
        var isValueCorrect = this._isValueInRange(inputValue);
        if (!isValueIncomplete && !isValueCorrect && null !== parsedValue) {
            if (Number(inputValue) !== parsedValue) {
                this._input().val(this._applyDisplayValueFormatter(parsedValue))
            }
        }
    },
    _replaceCommaWithPoint: function(value) {
        return value.replace(",", ".")
    },
    _inputIsInvalid: function() {
        var isNumberMode = "number" === this.option("mode");
        var validityState = this._input().get(0).validity;
        return isNumberMode && validityState && validityState.badInput
    },
    _renderDisplayText: function(text) {
        if (this._inputIsInvalid()) {
            return
        }
        this.callBase(text)
    },
    _isValueIncomplete: function(value) {
        var incompleteRegex = /(^-$)|(^-?\d*\.$)|(\d+e-?$)/i;
        return incompleteRegex.test(value)
    },
    _isValueInRange: function(value) {
        return (0, _math.inRange)(value, this.option("min"), this.option("max"))
    },
    _isNumber: function(value) {
        return null !== this._parseValue(value)
    },
    _validateValue: function(value) {
        var inputValue = this._normalizeText();
        var isValueValid = this._isValueValid();
        var isValid = true;
        var isNumber = this._isNumber(inputValue);
        if (isNaN(Number(value))) {
            isValid = false
        }
        if (!value && isValueValid) {
            isValid = true
        } else {
            if (!isNumber && !isValueValid) {
                isValid = false
            }
        }
        this.option({
            isValid: isValid,
            validationError: isValid ? null : {
                editorSpecific: true,
                message: this.option("invalidValueMessage")
            }
        });
        return isValid
    },
    _normalizeInputValue: function() {
        return this._parseValue(this._normalizeText())
    },
    _normalizeText: function() {
        var value = this._input().val().trim();
        return this._replaceCommaWithPoint(value)
    },
    _parseValue: function(value) {
        var number = parseFloat(value);
        if (isNaN(number)) {
            return null
        }
        return (0, _math.fitIntoRange)(number, this.option("min"), this.option("max"))
    },
    _clearValue: function() {
        if (this._inputIsInvalid()) {
            this._input().val("");
            this._validateValue()
        }
        this.callBase()
    },
    reset: function() {
        if (null === this.option("value")) {
            this.option("text", "");
            this._renderValue()
        } else {
            this.option("value", null)
        }
    },
    _optionChanged: function(args) {
        switch (args.name) {
            case "value":
                this._validateValue(args.value);
                this._setSubmitValue(args.value);
                this.callBase(args);
                this._resumeValueChangeAction();
                break;
            case "step":
                this._renderProps();
                break;
            case "min":
            case "max":
                this._renderProps();
                this.option("value", this._parseValue(this.option("value")));
                break;
            case "showSpinButtons":
            case "useLargeSpinButtons":
                this._updateButtons(["spins"]);
                break;
            case "invalidValueMessage":
                break;
            default:
                this.callBase(args)
        }
    }
});
var _default = NumberBoxBase;
exports.default = _default;
module.exports = exports.default;
