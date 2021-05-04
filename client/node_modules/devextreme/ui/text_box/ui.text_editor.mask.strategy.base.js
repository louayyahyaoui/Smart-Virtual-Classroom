/**
 * DevExtreme (ui/text_box/ui.text_editor.mask.strategy.base.js)
 * Version: 20.2.6
 * Build date: Tue Mar 16 2021
 *
 * Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
exports.default = void 0;
var _events_engine = _interopRequireDefault(require("../../events/core/events_engine"));
var _index = require("../../events/utils/index");
var _browser = _interopRequireDefault(require("../../core/utils/browser"));
var _array = require("../../core/utils/array");
var _dom = require("../../core/utils/dom");

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        "default": obj
    }
}
var MASK_EVENT_NAMESPACE = "dxMask";
var BLUR_EVENT = "blur beforedeactivate";
var EMPTY_CHAR = " ";
var BaseMaskStrategy = function() {
    function BaseMaskStrategy(editor) {
        this.editor = editor;
        this.DIRECTION = {
            FORWARD: "forward",
            BACKWARD: "backward"
        };
        this.NAME = this._getStrategyName()
    }
    var _proto = BaseMaskStrategy.prototype;
    _proto._getStrategyName = function() {
        return "base"
    };
    _proto.editorOption = function() {
        var _this$editor;
        return (_this$editor = this.editor).option.apply(_this$editor, arguments)
    };
    _proto.editorInput = function() {
        return this.editor._input()
    };
    _proto.editorCaret = function(newCaret) {
        if (!newCaret) {
            return this.editor._caret()
        }
        this.editor._caret(newCaret)
    };
    _proto.getHandler = function(handlerName) {
        var handler = this["_".concat(handlerName, "Handler")] || function() {};
        return handler.bind(this)
    };
    _proto.attachEvents = function() {
        var _this = this;
        var $input = this.editorInput();
        this.getHandleEventNames().forEach(function(eventName) {
            var subscriptionName = (0, _index.addNamespace)(eventName.toLowerCase(), MASK_EVENT_NAMESPACE);
            _events_engine.default.on($input, subscriptionName, _this.getEventHandler(eventName))
        });
        this._attachChangeEventHandlers()
    };
    _proto.getHandleEventNames = function() {
        return ["focusIn", "focusOut", "keyDown", "input", "paste", "cut", "drop"]
    };
    _proto.getEventHandler = function(eventName) {
        return this["_".concat(eventName, "Handler")].bind(this)
    };
    _proto.detachEvents = function() {
        _events_engine.default.off(this.editorInput(), ".".concat(MASK_EVENT_NAMESPACE))
    };
    _proto._attachChangeEventHandlers = function() {
        if ((0, _array.inArray)("change", this.editorOption("valueChangeEvent").split(" ")) === -1) {
            return
        }
        _events_engine.default.on(this.editorInput(), (0, _index.addNamespace)(BLUR_EVENT, MASK_EVENT_NAMESPACE), function(e) {
            this._suppressCaretChanging(this._changeHandler, [e]);
            this._changeHandler(e)
        }.bind(this.editor))
    };
    _proto._focusInHandler = function() {
        this.editor._showMaskPlaceholder();
        this.editor._direction(this.DIRECTION.FORWARD);
        if (!this.editor._isValueEmpty() && this.editorOption("isValid")) {
            this.editor._adjustCaret()
        } else {
            var caret = this.editor._maskRulesChain.first();
            this._caretTimeout = setTimeout(function() {
                this._caret({
                    start: caret,
                    end: caret
                })
            }.bind(this.editor), 0)
        }
    };
    _proto._focusOutHandler = function(event) {
        this.editor._changeHandler(event);
        if ("onFocus" === this.editorOption("showMaskMode") && this.editor._isValueEmpty()) {
            this.editorOption("text", "");
            this.editor._renderDisplayText("")
        }
    };
    _proto._cutHandler = function(event) {
        var caret = this.editorCaret();
        var selectedText = this.editorInput().val().substring(caret.start, caret.end);
        this.editor._maskKeyHandler(event, function() {
            return (0, _dom.clipboardText)(event, selectedText)
        })
    };
    _proto._dropHandler = function() {
        this._clearDragTimer();
        this._dragTimer = setTimeout(function() {
            this.option("value", this._convertToValue(this._input().val()))
        }.bind(this.editor))
    };
    _proto._clearDragTimer = function() {
        clearTimeout(this._dragTimer)
    };
    _proto._keyDownHandler = function() {
        this._keyPressHandled = false
    };
    _proto._pasteHandler = function(event) {
        var editor = this.editor;
        this._keyPressHandled = true;
        var caret = this.editorCaret();
        editor._maskKeyHandler(event, function() {
            var pastedText = (0, _dom.clipboardText)(event);
            var restText = editor._maskRulesChain.text().substring(caret.end);
            var accepted = editor._handleChain({
                text: pastedText,
                start: caret.start,
                length: pastedText.length
            });
            var newCaret = caret.start + accepted;
            editor._handleChain({
                text: restText,
                start: newCaret,
                length: restText.length
            });
            editor._caret({
                start: newCaret,
                end: newCaret
            })
        })
    };
    _proto._autoFillHandler = function(event) {
        var _this2 = this;
        var editor = this.editor;
        var inputVal = this.editorInput().val();
        this._inputHandlerTimer = setTimeout(function() {
            _this2._keyPressHandled = true;
            if (_this2._isAutoFill()) {
                _this2._keyPressHandled = true;
                editor._maskKeyHandler(event, function() {
                    editor._handleChain({
                        text: inputVal,
                        start: 0,
                        length: inputVal.length
                    })
                });
                editor._validateMask()
            }
        })
    };
    _proto._isAutoFill = function() {
        var $input = this.editor._input();
        var result = false;
        if (_browser.default.msie && _browser.default.version > 11) {
            result = $input.hasClass("edge-autofilled")
        } else {
            if (_browser.default.webkit) {
                var input = $input.get(0);
                result = input && input.matches(":-webkit-autofill")
            }
        }
        return result
    };
    _proto.runWithoutEventProcessing = function(action) {
        var keyPressHandled = this._keyPressHandled;
        this._keyPressHandled = true;
        action();
        this._keyPressHandled = keyPressHandled
    };
    _proto._backspaceHandler = function() {};
    _proto._delHandler = function(event) {
        var editor = this.editor;
        this._keyPressHandled = true;
        editor._maskKeyHandler(event, function() {
            return !editor._hasSelection() && editor._handleKey(EMPTY_CHAR)
        })
    };
    _proto.clean = function() {
        this._clearDragTimer();
        clearTimeout(this._backspaceHandlerTimeout);
        clearTimeout(this._caretTimeout);
        clearTimeout(this._inputHandlerTimer)
    };
    return BaseMaskStrategy
}();
exports.default = BaseMaskStrategy;
module.exports = exports.default;
