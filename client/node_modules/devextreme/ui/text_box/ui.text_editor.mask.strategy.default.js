/**
 * DevExtreme (ui/text_box/ui.text_editor.mask.strategy.default.js)
 * Version: 20.2.6
 * Build date: Tue Mar 16 2021
 *
 * Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
exports.default = void 0;
var _uiText_editorMaskStrategy = _interopRequireDefault(require("./ui.text_editor.mask.strategy.base"));
var _index = require("../../events/utils/index");
var _promise = _interopRequireDefault(require("../../core/polyfills/promise"));

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        "default": obj
    }
}

function _toConsumableArray(arr) {
    return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread()
}

function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
}

function _unsupportedIterableToArray(o, minLen) {
    if (!o) {
        return
    }
    if ("string" === typeof o) {
        return _arrayLikeToArray(o, minLen)
    }
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if ("Object" === n && o.constructor) {
        n = o.constructor.name
    }
    if ("Map" === n || "Set" === n) {
        return Array.from(o)
    }
    if ("Arguments" === n || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) {
        return _arrayLikeToArray(o, minLen)
    }
}

function _iterableToArray(iter) {
    if ("undefined" !== typeof Symbol && Symbol.iterator in Object(iter)) {
        return Array.from(iter)
    }
}

function _arrayWithoutHoles(arr) {
    if (Array.isArray(arr)) {
        return _arrayLikeToArray(arr)
    }
}

function _arrayLikeToArray(arr, len) {
    if (null == len || len > arr.length) {
        len = arr.length
    }
    for (var i = 0, arr2 = new Array(len); i < len; i++) {
        arr2[i] = arr[i]
    }
    return arr2
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
var BACKSPACE_INPUT_TYPE = "deleteContentBackward";
var EMPTY_CHAR = " ";
var DefaultMaskStrategy = function(_BaseMaskStrategy) {
    _inheritsLoose(DefaultMaskStrategy, _BaseMaskStrategy);

    function DefaultMaskStrategy() {
        return _BaseMaskStrategy.apply(this, arguments) || this
    }
    var _proto = DefaultMaskStrategy.prototype;
    _proto._getStrategyName = function() {
        return "default"
    };
    _proto.getHandleEventNames = function() {
        return [].concat(_toConsumableArray(_BaseMaskStrategy.prototype.getHandleEventNames.call(this)), ["keyPress"])
    };
    _proto._keyPressHandler = function(event) {
        if (this._keyPressHandled) {
            return
        }
        this._keyPressHandled = true;
        if (this.editor._isControlKeyFired(event)) {
            return
        }
        var editor = this.editor;
        editor._maskKeyHandler(event, function() {
            return editor._handleKey((0, _index.getChar)(event))
        })
    };
    _proto._inputHandler = function(event) {
        if (this._backspaceInputHandled(event.originalEvent && event.originalEvent.inputType)) {
            this._handleBackspaceInput(event)
        }
        if (event.originalEvent) {
            this._autoFillHandler(event)
        }
        if (this._keyPressHandled) {
            return
        }
        this._keyPressHandled = true;
        var inputValue = this.editorInput().val();
        var caret = this.editorCaret();
        if (!caret.end) {
            return
        }
        caret.start = caret.end - 1;
        var oldValue = inputValue.substring(0, caret.start) + inputValue.substring(caret.end);
        var char = inputValue[caret.start];
        var editor = this.editor;
        this.editorInput().val(oldValue);
        editor._caret({
            start: caret.start,
            end: caret.start
        });
        editor._maskKeyHandler(event, function() {
            return editor._handleKey(char)
        })
    };
    _proto._backspaceHandler = function(event) {
        var _this = this;
        var editor = this.editor;
        this._keyPressHandled = true;
        var afterBackspaceHandler = function(needAdjustCaret, callBack) {
            if (needAdjustCaret) {
                editor._direction(_this.DIRECTION.FORWARD);
                editor._adjustCaret()
            }
            var currentCaret = _this.editorCaret();
            return new _promise.default(function(resolve) {
                clearTimeout(_this._backspaceHandlerTimeout);
                _this._backspaceHandlerTimeout = setTimeout(function() {
                    callBack(currentCaret);
                    resolve()
                })
            })
        };
        editor._maskKeyHandler(event, function() {
            if (editor._hasSelection()) {
                return afterBackspaceHandler(true, function(currentCaret) {
                    editor._displayMask(currentCaret);
                    editor._maskRulesChain.reset()
                })
            }
            if (editor._tryMoveCaretBackward()) {
                return afterBackspaceHandler(false, function(currentCaret) {
                    _this.editorCaret(currentCaret)
                })
            }
            editor._handleKey(EMPTY_CHAR, _this.DIRECTION.BACKWARD);
            return afterBackspaceHandler(true, function(currentCaret) {
                editor._displayMask(currentCaret);
                editor._maskRulesChain.reset()
            })
        })
    };
    _proto._backspaceInputHandled = function(inputType) {
        return inputType === BACKSPACE_INPUT_TYPE && !this._keyPressHandled
    };
    _proto._handleBackspaceInput = function(event) {
        var _this$editorCaret = this.editorCaret(),
            start = _this$editorCaret.start,
            end = _this$editorCaret.end;
        this.editorCaret({
            start: start + 1,
            end: end + 1
        });
        this._backspaceHandler(event)
    };
    return DefaultMaskStrategy
}(_uiText_editorMaskStrategy.default);
var _default = DefaultMaskStrategy;
exports.default = _default;
module.exports = exports.default;
