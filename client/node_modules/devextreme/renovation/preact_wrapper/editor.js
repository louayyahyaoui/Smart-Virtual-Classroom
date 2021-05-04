/**
 * DevExtreme (renovation/preact_wrapper/editor.js)
 * Version: 20.2.6
 * Build date: Tue Mar 16 2021
 *
 * Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
exports.default = void 0;
var _component = _interopRequireDefault(require("./component"));
var _validation_engine = _interopRequireDefault(require("../../ui/validation_engine"));
var _extend = require("../../core/utils/extend");
var _renderer = _interopRequireDefault(require("../../core/renderer"));
var _element_data = require("../../core/element_data");
var _callbacks = _interopRequireDefault(require("../../core/utils/callbacks"));

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        "default": obj
    }
}

function _inheritsLoose(subClass, superClass) {
    subClass.prototype = Object.create(superClass.prototype);
    subClass.prototype.constructor = subClass;
    _setPrototypeOf(subClass, superClass)
}

function _setPrototypeOf(o, p) {
    _setPrototypeOf = Object.setPrototypeOf || function(o, p) {
        o.__proto__ = p;
        return o
    };
    return _setPrototypeOf(o, p)
}
var INVALID_MESSAGE_AUTO = "dx-invalid-message-auto";
var VALIDATION_TARGET = "dx-validation-target";
var Editor = function(_Component) {
    _inheritsLoose(Editor, _Component);

    function Editor() {
        return _Component.apply(this, arguments) || this
    }
    var _proto = Editor.prototype;
    _proto.getProps = function() {
        var _this = this;
        var props = _Component.prototype.getProps.call(this);
        props.onFocusIn = function() {
            var isValidationMessageShownOnFocus = "auto" === _this.option("validationMessageMode");
            if (isValidationMessageShownOnFocus) {
                var $validationMessageWrapper = (0, _renderer.default)(".dx-invalid-message.dx-overlay-wrapper");
                null === $validationMessageWrapper || void 0 === $validationMessageWrapper ? void 0 : $validationMessageWrapper.removeClass(INVALID_MESSAGE_AUTO);
                clearTimeout(_this.showValidationMessageTimeout);
                _this.showValidationMessageTimeout = setTimeout(function() {
                    null === $validationMessageWrapper || void 0 === $validationMessageWrapper ? void 0 : $validationMessageWrapper.addClass(INVALID_MESSAGE_AUTO)
                }, 150)
            }
        };
        props.saveValueChangeEvent = function(e) {
            _this._valueChangeEventInstance = e
        };
        return props
    };
    _proto._init = function() {
        _Component.prototype._init.call(this);
        (0, _element_data.data)(this.$element()[0], VALIDATION_TARGET, this);
        this.validationRequest = (0, _callbacks.default)();
        this.showValidationMessageTimeout = null;
        this._valueChangeAction = this._createActionByOption("onValueChanged", {
            excludeValidators: ["disabled", "readOnly"]
        })
    };
    _proto._getDefaultOptions = function() {
        return (0, _extend.extend)(_Component.prototype._getDefaultOptions.call(this), {
            validationMessageOffset: {
                h: 0,
                v: 0
            },
            validationTooltipOptions: {}
        })
    };
    _proto._bindInnerWidgetOptions = function(innerWidget, optionsContainer) {
        var _this2 = this;
        var syncOptions = function() {
            return _this2._options.silent(optionsContainer, (0, _extend.extend)({}, innerWidget.option()))
        };
        syncOptions();
        innerWidget.on("optionChanged", syncOptions)
    };
    _proto._optionChanged = function() {
        var option = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
        var name = option.name,
            previousValue = option.previousValue,
            value = option.value;
        if (name && this._getActionConfigs()[name]) {
            this._addAction(name)
        }
        switch (name) {
            case "value":
                if (value !== previousValue) {
                    this.validationRequest.fire({
                        value: value,
                        editor: this
                    })
                }
                break;
            case "isValid":
            case "validationError":
            case "validationErrors":
            case "validationStatus":
                this.option(_validation_engine.default.synchronizeValidationOptions(option, this.option()));
                break;
            default:
                _Component.prototype._optionChanged.call(this, option)
        }
        this._invalidate()
    };
    _proto.reset = function() {
        var _this$_getDefaultOpti = this._getDefaultOptions(),
            value = _this$_getDefaultOpti.value;
        this.option({
            value: value
        })
    };
    _proto._dispose = function() {
        _Component.prototype._dispose.call(this);
        (0, _element_data.data)(this.element(), VALIDATION_TARGET, null);
        clearTimeout(this.showValidationMessageTimeout)
    };
    return Editor
}(_component.default);
exports.default = Editor;
module.exports = exports.default;
