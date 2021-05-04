/**
 * DevExtreme (ui/number_box/number_box.spins.js)
 * Version: 20.2.6
 * Build date: Tue Mar 16 2021
 *
 * Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
exports.default = void 0;
var _renderer = _interopRequireDefault(require("../../core/renderer"));
var _events_engine = _interopRequireDefault(require("../../events/core/events_engine"));
var _button = _interopRequireDefault(require("../text_box/texteditor_button_collection/button"));
var _number_box = _interopRequireDefault(require("./number_box.spin"));
var _index = require("../../events/utils/index");
var _pointer = _interopRequireDefault(require("../../events/pointer"));
var _extend = require("../../core/utils/extend");

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
var SPIN_CLASS = "dx-numberbox-spin";
var SPIN_CONTAINER_CLASS = "dx-numberbox-spin-container";
var SPIN_TOUCH_FRIENDLY_CLASS = "dx-numberbox-spin-touch-friendly";
var SpinButtons = function(_TextEditorButton) {
    _inheritsLoose(SpinButtons, _TextEditorButton);

    function SpinButtons() {
        return _TextEditorButton.apply(this, arguments) || this
    }
    var _proto = SpinButtons.prototype;
    _proto._attachEvents = function(instance, $spinContainer) {
        var editor = this.editor;
        var eventName = (0, _index.addNamespace)(_pointer.default.down, editor.NAME);
        var $spinContainerChildren = $spinContainer.children();
        var pointerDownAction = editor._createAction(function(e) {
            return editor._spinButtonsPointerDownHandler(e)
        });
        _events_engine.default.off($spinContainer, eventName);
        _events_engine.default.on($spinContainer, eventName, function(e) {
            return pointerDownAction({
                event: e
            })
        });
        _number_box.default.getInstance($spinContainerChildren.eq(0)).option("onChange", function(e) {
            return editor._spinUpChangeHandler(e)
        });
        _number_box.default.getInstance($spinContainerChildren.eq(1)).option("onChange", function(e) {
            return editor._spinDownChangeHandler(e)
        })
    };
    _proto._create = function() {
        var editor = this.editor;
        var $spinContainer = (0, _renderer.default)("<div>").addClass(SPIN_CONTAINER_CLASS);
        var $spinUp = (0, _renderer.default)("<div>").appendTo($spinContainer);
        var $spinDown = (0, _renderer.default)("<div>").appendTo($spinContainer);
        var options = this._getOptions();
        this._addToContainer($spinContainer);
        editor._createComponent($spinUp, _number_box.default, (0, _extend.extend)({
            direction: "up"
        }, options));
        editor._createComponent($spinDown, _number_box.default, (0, _extend.extend)({
            direction: "down"
        }, options));
        this._legacyRender(editor.$element(), this._isTouchFriendly(), options.visible);
        return {
            instance: $spinContainer,
            $element: $spinContainer
        }
    };
    _proto._getOptions = function() {
        var editor = this.editor;
        var visible = this._isVisible();
        var disabled = editor.option("disabled");
        return {
            visible: visible,
            disabled: disabled
        }
    };
    _proto._isVisible = function() {
        var editor = this.editor;
        return _TextEditorButton.prototype._isVisible.call(this) && editor.option("showSpinButtons")
    };
    _proto._isTouchFriendly = function() {
        var editor = this.editor;
        return editor.option("showSpinButtons") && editor.option("useLargeSpinButtons")
    };
    _proto._legacyRender = function($editor, isTouchFriendly, isVisible) {
        $editor.toggleClass(SPIN_TOUCH_FRIENDLY_CLASS, isTouchFriendly);
        $editor.toggleClass(SPIN_CLASS, isVisible)
    };
    _proto.update = function() {
        var shouldUpdate = _TextEditorButton.prototype.update.call(this);
        if (shouldUpdate) {
            var editor = this.editor,
                instance = this.instance;
            var $editor = editor.$element();
            var isVisible = this._isVisible();
            var isTouchFriendly = this._isTouchFriendly();
            var $spinButtons = instance.children();
            var spinUp = _number_box.default.getInstance($spinButtons.eq(0));
            var spinDown = _number_box.default.getInstance($spinButtons.eq(1));
            var options = this._getOptions();
            spinUp.option(options);
            spinDown.option(options);
            this._legacyRender($editor, isTouchFriendly, isVisible)
        }
    };
    return SpinButtons
}(_button.default);
exports.default = SpinButtons;
module.exports = exports.default;
