/**
 * DevExtreme (ui/text_box/ui.text_editor.mask.js)
 * Version: 20.2.6
 * Build date: Tue Mar 16 2021
 *
 * Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
exports.default = void 0;
var _renderer = _interopRequireDefault(require("../../core/renderer"));
var _utils = _interopRequireDefault(require("./utils.caret"));
var _utils2 = require("./utils.support");
var _iterator = require("../../core/utils/iterator");
var _index = require("../../events/utils/index");
var _events_engine = _interopRequireDefault(require("../../events/core/events_engine"));
var _extend = require("../../core/utils/extend");
var _selectors = require("../widget/selectors");
var _type = require("../../core/utils/type");
var _message = _interopRequireDefault(require("../../localization/message"));
var _common = require("../../core/utils/common");
var _string = require("../../core/utils/string");
var _wheel = require("../../events/core/wheel");
var _uiText_editorMask = require("./ui.text_editor.mask.rule");
var _uiText_editor = _interopRequireDefault(require("./ui.text_editor.base"));
var _uiText_editorMaskStrategy = _interopRequireDefault(require("./ui.text_editor.mask.strategy.default"));
var _uiText_editorMaskStrategy2 = _interopRequireDefault(require("./ui.text_editor.mask.strategy.input_events"));

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        "default": obj
    }
}
var stubCaret = function() {
    return {}
};
var caret = _utils.default;
var EMPTY_CHAR = " ";
var ESCAPED_CHAR = "\\";
var TEXTEDITOR_MASKED_CLASS = "dx-texteditor-masked";
var FORWARD_DIRECTION = "forward";
var BACKWARD_DIRECTION = "backward";
var buildInMaskRules = {
    0: /[0-9]/,
    9: /[0-9\s]/,
    "#": /[-+0-9\s]/,
    L: function(char) {
        return isLiteralChar(char)
    },
    l: function(char) {
        return isLiteralChar(char) || isSpaceChar(char)
    },
    C: /\S/,
    c: /./,
    A: function(char) {
        return isLiteralChar(char) || isNumericChar(char)
    },
    a: function(char) {
        return isLiteralChar(char) || isNumericChar(char) || isSpaceChar(char)
    }
};

function isNumericChar(char) {
    return /[0-9]/.test(char)
}

function isLiteralChar(char) {
    var code = char.charCodeAt();
    return 64 < code && code < 91 || 96 < code && code < 123 || code > 127
}

function isSpaceChar(char) {
    return " " === char
}
var TextEditorMask = _uiText_editor.default.inherit({
    _getDefaultOptions: function() {
        return (0, _extend.extend)(this.callBase(), {
            mask: "",
            maskChar: "_",
            maskRules: {},
            maskInvalidMessage: _message.default.format("validation-mask"),
            useMaskedValue: false,
            showMaskMode: "always"
        })
    },
    _supportedKeys: function() {
        var that = this;
        var keyHandlerMap = {
            backspace: that._maskStrategy.getHandler("backspace"),
            del: that._maskStrategy.getHandler("del"),
            enter: that._changeHandler
        };
        var result = that.callBase();
        (0, _iterator.each)(keyHandlerMap, function(key, callback) {
            var parentHandler = result[key];
            result[key] = function(e) {
                that.option("mask") && callback.call(that, e);
                parentHandler && parentHandler(e)
            }
        });
        return result
    },
    _getSubmitElement: function() {
        return !this.option("mask") ? this.callBase() : this._$hiddenElement
    },
    _init: function() {
        this.callBase();
        this._initMaskStrategy()
    },
    _initMaskStrategy: function() {
        this._maskStrategy = (0, _utils2.isInputEventsL2Supported)() ? new _uiText_editorMaskStrategy2.default(this) : new _uiText_editorMaskStrategy.default(this)
    },
    _initMarkup: function() {
        this._renderHiddenElement();
        this.callBase()
    },
    _attachMouseWheelEventHandlers: function() {
        var hasMouseWheelHandler = this._onMouseWheel !== _common.noop;
        if (!hasMouseWheelHandler) {
            return
        }
        var input = this._input();
        var eventName = (0, _index.addNamespace)(_wheel.name, this.NAME);
        var mouseWheelAction = this._createAction(function(e) {
            var event = e.event;
            if ((0, _selectors.focused)(input) && !(0, _index.isCommandKeyPressed)(event)) {
                this._onMouseWheel(event);
                event.preventDefault();
                event.stopPropagation()
            }
        }.bind(this));
        _events_engine.default.off(input, eventName);
        _events_engine.default.on(input, eventName, function(e) {
            mouseWheelAction({
                event: e
            })
        })
    },
    _onMouseWheel: _common.noop,
    _render: function() {
        this._renderMask();
        this.callBase();
        this._attachMouseWheelEventHandlers()
    },
    _renderHiddenElement: function() {
        if (this.option("mask")) {
            this._$hiddenElement = (0, _renderer.default)("<input>").attr("type", "hidden").appendTo(this._inputWrapper())
        }
    },
    _removeHiddenElement: function() {
        this._$hiddenElement && this._$hiddenElement.remove()
    },
    _renderMask: function() {
        this.$element().removeClass(TEXTEDITOR_MASKED_CLASS);
        this._maskRulesChain = null;
        this._maskStrategy.detachEvents();
        if (!this.option("mask")) {
            return
        }
        this.$element().addClass(TEXTEDITOR_MASKED_CLASS);
        this._maskStrategy.attachEvents();
        this._parseMask();
        this._renderMaskedValue()
    },
    _suppressCaretChanging: function(callback, args) {
        caret = stubCaret;
        try {
            callback.apply(this, args)
        } finally {
            caret = _utils.default
        }
    },
    _changeHandler: function(e) {
        var $input = this._input();
        var inputValue = $input.val();
        if (inputValue === this._changedValue) {
            return
        }
        this._changedValue = inputValue;
        var changeEvent = (0, _index.createEvent)(e, {
            type: "change"
        });
        _events_engine.default.trigger($input, changeEvent)
    },
    _parseMask: function() {
        this._maskRules = (0, _extend.extend)({}, buildInMaskRules, this.option("maskRules"));
        this._maskRulesChain = this._parseMaskRule(0)
    },
    _parseMaskRule: function(index) {
        var mask = this.option("mask");
        if (index >= mask.length) {
            return new _uiText_editorMask.EmptyMaskRule
        }
        var currentMaskChar = mask[index];
        var isEscapedChar = currentMaskChar === ESCAPED_CHAR;
        var result = isEscapedChar ? new _uiText_editorMask.StubMaskRule({
            maskChar: mask[index + 1]
        }) : this._getMaskRule(currentMaskChar);
        result.next(this._parseMaskRule(index + 1 + isEscapedChar));
        return result
    },
    _getMaskRule: function(pattern) {
        var ruleConfig;
        (0, _iterator.each)(this._maskRules, function(rulePattern, allowedChars) {
            if (rulePattern === pattern) {
                ruleConfig = {
                    pattern: rulePattern,
                    allowedChars: allowedChars
                };
                return false
            }
        });
        return (0, _type.isDefined)(ruleConfig) ? new _uiText_editorMask.MaskRule((0, _extend.extend)({
            maskChar: this.option("maskChar")
        }, ruleConfig)) : new _uiText_editorMask.StubMaskRule({
            maskChar: pattern
        })
    },
    _renderMaskedValue: function() {
        if (!this._maskRulesChain) {
            return
        }
        var value = this.option("value") || "";
        this._maskRulesChain.clear(this._normalizeChainArguments());
        var chainArgs = {
            length: value.length
        };
        chainArgs[this._isMaskedValueMode() ? "text" : "value"] = value;
        this._handleChain(chainArgs);
        this._displayMask()
    },
    _replaceSelectedText: function(text, selection, char) {
        if (void 0 === char) {
            return text
        }
        var textBefore = text.slice(0, selection.start);
        var textAfter = text.slice(selection.end);
        var edited = textBefore + char + textAfter;
        return edited
    },
    _isMaskedValueMode: function() {
        return this.option("useMaskedValue")
    },
    _displayMask: function(caret) {
        caret = caret || this._caret();
        this._renderValue();
        this._caret(caret)
    },
    _isValueEmpty: function() {
        return (0, _string.isEmpty)(this._value)
    },
    _shouldShowMask: function() {
        var showMaskMode = this.option("showMaskMode");
        if ("onFocus" === showMaskMode) {
            return (0, _selectors.focused)(this._input()) || !this._isValueEmpty()
        }
        return true
    },
    _showMaskPlaceholder: function() {
        if (this._shouldShowMask()) {
            var text = this._maskRulesChain.text();
            this.option("text", text);
            if ("onFocus" === this.option("showMaskMode")) {
                this._renderDisplayText(text)
            }
        }
    },
    _renderValue: function() {
        if (this._maskRulesChain) {
            this._showMaskPlaceholder();
            if (this._$hiddenElement) {
                var value = this._maskRulesChain.value();
                var submitElementValue = !(0, _string.isEmpty)(value) ? this._getPreparedValue() : "";
                this._$hiddenElement.val(submitElementValue)
            }
        }
        return this.callBase()
    },
    _getPreparedValue: function() {
        return this._convertToValue().replace(/\s+$/, "")
    },
    _valueChangeEventHandler: function(e) {
        if (!this._maskRulesChain) {
            this.callBase.apply(this, arguments);
            return
        }
        this._saveValueChangeEvent(e);
        this.option("value", this._getPreparedValue())
    },
    _isControlKeyFired: function(e) {
        return this._isControlKey((0, _index.normalizeKeyName)(e)) || (0, _index.isCommandKeyPressed)(e)
    },
    _handleChain: function(args) {
        var handledCount = this._maskRulesChain.handle(this._normalizeChainArguments(args));
        this._value = this._maskRulesChain.value();
        this._textValue = this._maskRulesChain.text();
        return handledCount
    },
    _normalizeChainArguments: function(args) {
        args = args || {};
        args.index = 0;
        args.fullText = this._maskRulesChain.text();
        return args
    },
    _convertToValue: function(text) {
        if (this._isMaskedValueMode()) {
            text = this._replaceMaskCharWithEmpty(text || this._textValue || "")
        } else {
            text = text || this._value || ""
        }
        return text
    },
    _replaceMaskCharWithEmpty: function(text) {
        return text.replace(new RegExp(this.option("maskChar"), "g"), EMPTY_CHAR)
    },
    _maskKeyHandler: function(e, keyHandler) {
        var _this = this;
        if (this.option("readOnly")) {
            return
        }
        this.setForwardDirection();
        e.preventDefault();
        this._handleSelection();
        var previousText = this._input().val();
        var raiseInputEvent = function() {
            if (previousText !== _this._input().val()) {
                _this._maskStrategy.runWithoutEventProcessing(function() {
                    return _events_engine.default.trigger(_this._input(), "input")
                })
            }
        };
        var handled = keyHandler();
        if (handled) {
            handled.then(raiseInputEvent)
        } else {
            this.setForwardDirection();
            this._adjustCaret();
            this._displayMask();
            this._maskRulesChain.reset();
            raiseInputEvent()
        }
    },
    _handleKey: function(key, direction) {
        this._direction(direction || FORWARD_DIRECTION);
        this._adjustCaret(key);
        this._handleKeyChain(key);
        this._moveCaret()
    },
    _handleSelection: function() {
        if (!this._hasSelection()) {
            return
        }
        var caret = this._caret();
        var emptyChars = new Array(caret.end - caret.start + 1).join(EMPTY_CHAR);
        this._handleKeyChain(emptyChars)
    },
    _handleKeyChain: function(chars) {
        var caret = this._caret();
        var start = this.isForwardDirection() ? caret.start : caret.start - 1;
        var end = this.isForwardDirection() ? caret.end : caret.end - 1;
        var length = start === end ? 1 : end - start;
        this._handleChain({
            text: chars,
            start: start,
            length: length
        })
    },
    _tryMoveCaretBackward: function() {
        this.setBackwardDirection();
        var currentCaret = this._caret().start;
        this._adjustCaret();
        return !currentCaret || currentCaret !== this._caret().start
    },
    _adjustCaret: function(char) {
        var caret = this._maskRulesChain.adjustedCaret(this._caret().start, this.isForwardDirection(), char);
        this._caret({
            start: caret,
            end: caret
        })
    },
    _moveCaret: function() {
        var currentCaret = this._caret().start;
        var maskRuleIndex = currentCaret + (this.isForwardDirection() ? 0 : -1);
        var caret = this._maskRulesChain.isAccepted(maskRuleIndex) ? currentCaret + (this.isForwardDirection() ? 1 : -1) : currentCaret;
        this._caret({
            start: caret,
            end: caret
        })
    },
    _caret: function(position) {
        var $input = this._input();
        if (!$input.length) {
            return
        }
        if (!arguments.length) {
            return caret($input)
        }
        caret($input, position)
    },
    _hasSelection: function() {
        var caret = this._caret();
        return caret.start !== caret.end
    },
    _direction: function(direction) {
        if (!arguments.length) {
            return this._typingDirection
        }
        this._typingDirection = direction
    },
    setForwardDirection: function() {
        this._direction(FORWARD_DIRECTION)
    },
    setBackwardDirection: function() {
        this._direction(BACKWARD_DIRECTION)
    },
    isForwardDirection: function() {
        return this._direction() === FORWARD_DIRECTION
    },
    _clean: function() {
        this._maskStrategy && this._maskStrategy.clean();
        this.callBase()
    },
    _validateMask: function() {
        if (!this._maskRulesChain) {
            return
        }
        var isValid = (0, _string.isEmpty)(this.option("value")) || this._maskRulesChain.isValid(this._normalizeChainArguments());
        this.option({
            isValid: isValid,
            validationError: isValid ? null : {
                editorSpecific: true,
                message: this.option("maskInvalidMessage")
            }
        })
    },
    _updateHiddenElement: function() {
        this._removeHiddenElement();
        if (this.option("mask")) {
            this._input().removeAttr("name");
            this._renderHiddenElement()
        }
        this._setSubmitElementName(this.option("name"))
    },
    _updateMaskOption: function() {
        this._updateHiddenElement();
        this._renderMask();
        this._validateMask()
    },
    _processEmptyMask: function(mask) {
        if (mask) {
            return
        }
        var value = this.option("value");
        this.option({
            text: value,
            isValid: true
        });
        this.validationRequest.fire({
            value: value,
            editor: this
        });
        this._renderValue()
    },
    _optionChanged: function(args) {
        switch (args.name) {
            case "mask":
                this._updateMaskOption();
                this._processEmptyMask(args.value);
                break;
            case "maskChar":
            case "maskRules":
            case "useMaskedValue":
                this._updateMaskOption();
                break;
            case "value":
                this._renderMaskedValue();
                this._validateMask();
                this.callBase(args);
                this._changedValue = this._input().val();
                break;
            case "maskInvalidMessage":
                break;
            case "showMaskMode":
                this.option("text", "");
                this._renderValue();
                break;
            default:
                this.callBase(args)
        }
    }
});
var _default = TextEditorMask;
exports.default = _default;
module.exports = exports.default;
