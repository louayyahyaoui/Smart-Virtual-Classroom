/**
 * DevExtreme (ui/editor/editor.js)
 * Version: 20.2.6
 * Build date: Tue Mar 16 2021
 *
 * Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
exports.default = void 0;
var _renderer = _interopRequireDefault(require("../../core/renderer"));
var _element_data = require("../../core/element_data");
var _callbacks = _interopRequireDefault(require("../../core/utils/callbacks"));
var _window = require("../../core/utils/window");
var _index = require("../../events/utils/index");
var _extend = require("../../core/utils/extend");
var _ui = _interopRequireDefault(require("../widget/ui.widget"));
var _validation_engine = _interopRequireDefault(require("../validation_engine"));
var _events_engine = _interopRequireDefault(require("../../events/core/events_engine"));
var _validation_message = _interopRequireDefault(require("../validation_message"));
var _guid = _interopRequireDefault(require("../../core/guid"));

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        "default": obj
    }
}
var INVALID_MESSAGE_AUTO = "dx-invalid-message-auto";
var READONLY_STATE_CLASS = "dx-state-readonly";
var INVALID_CLASS = "dx-invalid";
var DX_INVALID_BADGE_CLASS = "dx-show-invalid-badge";
var VALIDATION_TARGET = "dx-validation-target";
var VALIDATION_STATUS_VALID = "valid";
var VALIDATION_STATUS_INVALID = "invalid";
var READONLY_NAMESPACE = "editorReadOnly";
var VALIDATION_MESSAGE_KEYS_MAP = {
    validationMessageMode: "mode",
    validationMessageOffset: "offset",
    validationBoundary: "boundary"
};
var Editor = _ui.default.inherit({
    ctor: function() {
        this.showValidationMessageTimeout = null;
        this.validationRequest = (0, _callbacks.default)();
        this.callBase.apply(this, arguments)
    },
    _createElement: function(element) {
        this.callBase(element);
        var $element = this.$element();
        if ($element) {
            (0, _element_data.data)($element[0], VALIDATION_TARGET, this)
        }
    },
    _initOptions: function(options) {
        this.callBase.apply(this, arguments);
        this.option(_validation_engine.default.initValidationOptions(options))
    },
    _init: function() {
        this.callBase();
        this._options.cache("validationTooltipOptions", this.option("validationTooltipOptions"));
        var $element = this.$element();
        $element.addClass(DX_INVALID_BADGE_CLASS)
    },
    _getDefaultOptions: function() {
        return (0, _extend.extend)(this.callBase(), {
            value: null,
            name: "",
            onValueChanged: null,
            readOnly: false,
            isValid: true,
            validationError: null,
            validationErrors: null,
            validationStatus: VALIDATION_STATUS_VALID,
            validationMessageMode: "auto",
            validationBoundary: void 0,
            validationMessageOffset: {
                h: 0,
                v: 0
            },
            validationTooltipOptions: {}
        })
    },
    _attachKeyboardEvents: function() {
        if (!this.option("readOnly")) {
            this.callBase()
        }
    },
    _setOptionsByReference: function() {
        this.callBase();
        (0, _extend.extend)(this._optionsByReference, {
            validationError: true
        })
    },
    _createValueChangeAction: function() {
        this._valueChangeAction = this._createActionByOption("onValueChanged", {
            excludeValidators: ["disabled", "readOnly"]
        })
    },
    _suppressValueChangeAction: function() {
        this._valueChangeActionSuppressed = true
    },
    _resumeValueChangeAction: function() {
        this._valueChangeActionSuppressed = false
    },
    _initMarkup: function() {
        this._toggleReadOnlyState();
        this._setSubmitElementName(this.option("name"));
        this.callBase();
        this._renderValidationState()
    },
    _raiseValueChangeAction: function(value, previousValue) {
        if (!this._valueChangeAction) {
            this._createValueChangeAction()
        }
        this._valueChangeAction(this._valueChangeArgs(value, previousValue))
    },
    _valueChangeArgs: function(value, previousValue) {
        return {
            value: value,
            previousValue: previousValue,
            event: this._valueChangeEventInstance
        }
    },
    _saveValueChangeEvent: function(e) {
        this._valueChangeEventInstance = e
    },
    _focusInHandler: function(e) {
        var isValidationMessageShownOnFocus = "auto" === this.option("validationMessageMode");
        if (this._canValueBeChangedByClick() && isValidationMessageShownOnFocus) {
            var _this$_validationMess;
            var $validationMessageWrapper = null === (_this$_validationMess = this._validationMessage) || void 0 === _this$_validationMess ? void 0 : _this$_validationMess._wrapper();
            null === $validationMessageWrapper || void 0 === $validationMessageWrapper ? void 0 : $validationMessageWrapper.removeClass(INVALID_MESSAGE_AUTO);
            clearTimeout(this.showValidationMessageTimeout);
            this.showValidationMessageTimeout = setTimeout(function() {
                return null === $validationMessageWrapper || void 0 === $validationMessageWrapper ? void 0 : $validationMessageWrapper.addClass(INVALID_MESSAGE_AUTO)
            }, 150)
        }
        return this.callBase(e)
    },
    _canValueBeChangedByClick: function() {
        return false
    },
    _getValidationErrors: function() {
        var validationErrors = this.option("validationErrors");
        if (!validationErrors && this.option("validationError")) {
            validationErrors = [this.option("validationError")]
        }
        return validationErrors
    },
    _disposeValidationMessage: function() {
        if (this._$validationMessage) {
            this._$validationMessage.remove();
            this.setAria("describedby", null);
            this._$validationMessage = null
        }
    },
    _toggleValidationClasses: function(isInvalid) {
        this.$element().toggleClass(INVALID_CLASS, isInvalid);
        this.setAria(VALIDATION_STATUS_INVALID, isInvalid || void 0)
    },
    _renderValidationState: function() {
        var isValid = this.option("isValid") && this.option("validationStatus") !== VALIDATION_STATUS_INVALID;
        var validationErrors = this._getValidationErrors();
        var $element = this.$element();
        this._toggleValidationClasses(!isValid);
        if (!(0, _window.hasWindow)()) {
            return
        }
        this._disposeValidationMessage();
        if (!isValid && validationErrors) {
            var _this$option = this.option(),
                validationMessageMode = _this$option.validationMessageMode,
                validationMessageOffset = _this$option.validationMessageOffset,
                validationBoundary = _this$option.validationBoundary,
                rtlEnabled = _this$option.rtlEnabled;
            this._$validationMessage = (0, _renderer.default)("<div>").appendTo($element);
            this.setAria("describedby", "dx-" + new _guid.default);
            this._validationMessage = new _validation_message.default(this._$validationMessage, (0, _extend.extend)({
                validationErrors: validationErrors,
                rtlEnabled: rtlEnabled,
                target: this._getValidationMessageTarget(),
                container: $element,
                mode: validationMessageMode,
                positionRequest: "below",
                offset: validationMessageOffset,
                boundary: validationBoundary,
                describedElement: this._focusTarget()
            }, this._options.cache("validationTooltipOptions")));
            this._bindInnerWidgetOptions(this._validationMessage, "validationTooltipOptions")
        }
    },
    _getValidationMessageTarget: function() {
        return this.$element()
    },
    _toggleReadOnlyState: function() {
        var readOnly = this.option("readOnly");
        this._toggleBackspaceHandler(readOnly);
        this.$element().toggleClass(READONLY_STATE_CLASS, !!readOnly);
        this.setAria("readonly", readOnly || void 0)
    },
    _toggleBackspaceHandler: function(isReadOnly) {
        var $eventTarget = this._keyboardEventBindingTarget();
        var eventName = (0, _index.addNamespace)("keydown", READONLY_NAMESPACE);
        _events_engine.default.off($eventTarget, eventName);
        if (isReadOnly) {
            _events_engine.default.on($eventTarget, eventName, function(e) {
                if ("backspace" === (0, _index.normalizeKeyName)(e)) {
                    e.preventDefault()
                }
            })
        }
    },
    _dispose: function() {
        var element = this.$element()[0];
        (0, _element_data.data)(element, VALIDATION_TARGET, null);
        clearTimeout(this.showValidationMessageTimeout);
        this.callBase()
    },
    _setSubmitElementName: function(name) {
        var $submitElement = this._getSubmitElement();
        if (!$submitElement) {
            return
        }
        if (name.length > 0) {
            $submitElement.attr("name", name)
        } else {
            $submitElement.removeAttr("name")
        }
    },
    _getSubmitElement: function() {
        return null
    },
    _setValidationMessageOption: function(_ref) {
        var _this$_validationMess2;
        var name = _ref.name,
            value = _ref.value;
        var optionKey = VALIDATION_MESSAGE_KEYS_MAP[name] ? VALIDATION_MESSAGE_KEYS_MAP[name] : name;
        null === (_this$_validationMess2 = this._validationMessage) || void 0 === _this$_validationMess2 ? void 0 : _this$_validationMess2.option(optionKey, value)
    },
    _optionChanged: function(args) {
        var _this$_validationMess3;
        switch (args.name) {
            case "onValueChanged":
                this._createValueChangeAction();
                break;
            case "readOnly":
                this._toggleReadOnlyState();
                this._refreshFocusState();
                break;
            case "value":
                if (args.value != args.previousValue) {
                    this.validationRequest.fire({
                        value: args.value,
                        editor: this
                    })
                }
                if (!this._valueChangeActionSuppressed) {
                    this._raiseValueChangeAction(args.value, args.previousValue);
                    this._saveValueChangeEvent(void 0)
                }
                break;
            case "width":
                this.callBase(args);
                null === (_this$_validationMess3 = this._validationMessage) || void 0 === _this$_validationMess3 ? void 0 : _this$_validationMess3.updateMaxWidth();
                break;
            case "name":
                this._setSubmitElementName(args.value);
                break;
            case "isValid":
            case "validationError":
            case "validationErrors":
            case "validationStatus":
                this.option(_validation_engine.default.synchronizeValidationOptions(args, this.option()));
                this._renderValidationState();
                break;
            case "validationBoundary":
            case "validationMessageMode":
            case "validationMessageOffset":
                this._setValidationMessageOption(args);
                break;
            case "rtlEnabled":
                this._setValidationMessageOption(args);
                this.callBase(args);
                break;
            case "validationTooltipOptions":
                this._innerWidgetOptionChanged(this._validationMessage, args);
                break;
            default:
                this.callBase(args)
        }
    },
    reset: function() {
        var defaultOptions = this._getDefaultOptions();
        this.option("value", defaultOptions.value)
    }
});
var _default = Editor;
exports.default = _default;
module.exports = exports.default;
