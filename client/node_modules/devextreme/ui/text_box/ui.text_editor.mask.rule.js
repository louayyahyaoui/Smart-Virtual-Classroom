/**
 * DevExtreme (ui/text_box/ui.text_editor.mask.rule.js)
 * Version: 20.2.6
 * Build date: Tue Mar 16 2021
 *
 * Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
exports.StubMaskRule = exports.MaskRule = exports.EmptyMaskRule = void 0;
var _class = _interopRequireDefault(require("../../core/class"));
var _extend = require("../../core/utils/extend");
var _array = require("../../core/utils/array");
var _type = require("../../core/utils/type");
var _common = require("../../core/utils/common");

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        "default": obj
    }
}
var EMPTY_CHAR = " ";
var BaseMaskRule = _class.default.inherit({
    ctor: function(config) {
        this._value = EMPTY_CHAR;
        (0, _extend.extend)(this, config)
    },
    next: function(rule) {
        if (!arguments.length) {
            return this._next
        }
        this._next = rule
    },
    text: _common.noop,
    value: _common.noop,
    rawValue: _common.noop,
    handle: _common.noop,
    _prepareHandlingArgs: function(args, config) {
        var _config$str, _config$start, _config$length;
        config = config || {};
        var handlingProperty = Object.prototype.hasOwnProperty.call(args, "value") ? "value" : "text";
        args[handlingProperty] = null !== (_config$str = config.str) && void 0 !== _config$str ? _config$str : args[handlingProperty];
        args.start = null !== (_config$start = config.start) && void 0 !== _config$start ? _config$start : args.start;
        args.length = null !== (_config$length = config.length) && void 0 !== _config$length ? _config$length : args.length;
        args.index = args.index + 1;
        return args
    },
    reset: _common.noop,
    clear: _common.noop,
    first: function(index) {
        index = index || 0;
        return this.next().first(index + 1)
    },
    isAccepted: function() {
        return false
    },
    adjustedCaret: function(caret, isForwardDirection, char) {
        return isForwardDirection ? this._adjustedForward(caret, 0, char) : this._adjustedBackward(caret, 0, char)
    },
    _adjustedForward: _common.noop,
    _adjustedBackward: _common.noop,
    isValid: _common.noop
});
var EmptyMaskRule = BaseMaskRule.inherit({
    next: _common.noop,
    handle: function() {
        return 0
    },
    text: function() {
        return ""
    },
    value: function() {
        return ""
    },
    first: function() {
        return 0
    },
    rawValue: function() {
        return ""
    },
    adjustedCaret: function() {
        return 0
    },
    isValid: function() {
        return true
    }
});
exports.EmptyMaskRule = EmptyMaskRule;
var MaskRule = BaseMaskRule.inherit({
    text: function() {
        return (this._value !== EMPTY_CHAR ? this._value : this.maskChar) + this.next().text()
    },
    value: function() {
        return this._value + this.next().value()
    },
    rawValue: function() {
        return this._value + this.next().rawValue()
    },
    handle: function(args) {
        var str = Object.prototype.hasOwnProperty.call(args, "value") ? args.value : args.text;
        if (!str || !str.length || !args.length) {
            return 0
        }
        if (args.start) {
            return this.next().handle(this._prepareHandlingArgs(args, {
                start: args.start - 1
            }))
        }
        var char = str[0];
        var rest = str.substring(1);
        this._tryAcceptChar(char, args);
        return this._accepted() ? this.next().handle(this._prepareHandlingArgs(args, {
            str: rest,
            length: args.length - 1
        })) + 1 : this.handle(this._prepareHandlingArgs(args, {
            str: rest,
            length: args.length - 1
        }))
    },
    clear: function(args) {
        this._tryAcceptChar(EMPTY_CHAR, args);
        this.next().clear(this._prepareHandlingArgs(args))
    },
    reset: function() {
        this._accepted(false);
        this.next().reset()
    },
    _tryAcceptChar: function(char, args) {
        this._accepted(false);
        if (!this._isAllowed(char, args)) {
            return
        }
        var acceptedChar = char === EMPTY_CHAR ? this.maskChar : char;
        args.fullText = args.fullText.substring(0, args.index) + acceptedChar + args.fullText.substring(args.index + 1);
        this._accepted(true);
        this._value = char
    },
    _accepted: function(value) {
        if (!arguments.length) {
            return !!this._isAccepted
        }
        this._isAccepted = !!value
    },
    first: function(index) {
        return this._value === EMPTY_CHAR ? index || 0 : this.callBase(index)
    },
    _isAllowed: function(char, args) {
        if (char === EMPTY_CHAR) {
            return true
        }
        return this._isValid(char, args)
    },
    _isValid: function(char, args) {
        var allowedChars = this.allowedChars;
        if (allowedChars instanceof RegExp) {
            return allowedChars.test(char)
        }
        if ((0, _type.isFunction)(allowedChars)) {
            return allowedChars(char, args.index, args.fullText)
        }
        if (Array.isArray(allowedChars)) {
            return (0, _array.inArray)(char, allowedChars) > -1
        }
        return allowedChars === char
    },
    isAccepted: function(caret) {
        return 0 === caret ? this._accepted() : this.next().isAccepted(caret - 1)
    },
    _adjustedForward: function(caret, index, char) {
        if (index >= caret) {
            return index
        }
        return this.next()._adjustedForward(caret, index + 1, char) || index + 1
    },
    _adjustedBackward: function(caret, index) {
        if (index >= caret - 1) {
            return caret
        }
        return this.next()._adjustedBackward(caret, index + 1) || index + 1
    },
    isValid: function(args) {
        return this._isValid(this._value, args) && this.next().isValid(this._prepareHandlingArgs(args))
    }
});
exports.MaskRule = MaskRule;
var StubMaskRule = MaskRule.inherit({
    value: function() {
        return this.next().value()
    },
    handle: function(args) {
        var hasValueProperty = Object.prototype.hasOwnProperty.call(args, "value");
        var str = hasValueProperty ? args.value : args.text;
        if (!str.length || !args.length) {
            return 0
        }
        if (args.start || hasValueProperty) {
            return this.next().handle(this._prepareHandlingArgs(args, {
                start: args.start && args.start - 1
            }))
        }
        var char = str[0];
        var rest = str.substring(1);
        this._tryAcceptChar(char);
        var nextArgs = this._isAllowed(char) ? this._prepareHandlingArgs(args, {
            str: rest,
            length: args.length - 1
        }) : args;
        return this.next().handle(nextArgs) + 1
    },
    clear: function(args) {
        this._accepted(false);
        this.next().clear(this._prepareHandlingArgs(args))
    },
    _tryAcceptChar: function(char) {
        this._accepted(this._isValid(char))
    },
    _isValid: function(char) {
        return char === this.maskChar
    },
    first: function(index) {
        index = index || 0;
        return this.next().first(index + 1)
    },
    _adjustedForward: function(caret, index, char) {
        if (index >= caret && char === this.maskChar) {
            return index
        }
        if (caret === index + 1 && this._accepted()) {
            return caret
        }
        return this.next()._adjustedForward(caret, index + 1, char)
    },
    _adjustedBackward: function(caret, index) {
        if (index >= caret - 1) {
            return 0
        }
        return this.next()._adjustedBackward(caret, index + 1)
    },
    isValid: function(args) {
        return this.next().isValid(this._prepareHandlingArgs(args))
    }
});
exports.StubMaskRule = StubMaskRule;
