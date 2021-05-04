/**
 * DevExtreme (ui/drop_down_editor/ui.drop_down_button.js)
 * Version: 20.2.6
 * Build date: Tue Mar 16 2021
 *
 * Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
exports.default = void 0;
var _renderer = _interopRequireDefault(require("../../core/renderer"));
var _extend = require("../../core/utils/extend");
var _events_engine = _interopRequireDefault(require("../../events/core/events_engine"));
var _message = _interopRequireDefault(require("../../localization/message"));
var _button = _interopRequireDefault(require("../text_box/texteditor_button_collection/button"));
var _button2 = _interopRequireDefault(require("../button"));

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
var DROP_DOWN_EDITOR_BUTTON_CLASS = "dx-dropdowneditor-button";
var DROP_DOWN_EDITOR_BUTTON_VISIBLE = "dx-dropdowneditor-button-visible";
var BUTTON_MESSAGE = "dxDropDownEditor-selectLabel";
var ClearButton = function(_TextEditorButton) {
    _inheritsLoose(ClearButton, _TextEditorButton);

    function ClearButton() {
        return _TextEditorButton.apply(this, arguments) || this
    }
    var _proto = ClearButton.prototype;
    _proto._attachEvents = function(instance) {
        var editor = this.editor;
        instance.option("onClick", function(e) {
            !editor.option("openOnFieldClick") && editor._openHandler(e)
        });
        _events_engine.default.on(instance.$element(), "mousedown", function(e) {
            if (editor.$element().is(".dx-state-focused")) {
                e.preventDefault()
            }
        })
    };
    _proto._create = function() {
        var editor = this.editor;
        var $element = (0, _renderer.default)("<div>");
        var options = this._getOptions();
        this._addToContainer($element);
        var instance = editor._createComponent($element, _button2.default, (0, _extend.extend)({}, options, {
            elementAttr: {
                "aria-label": _message.default.format(BUTTON_MESSAGE)
            }
        }));
        this._legacyRender(editor.$element(), $element, options.visible);
        return {
            $element: $element,
            instance: instance
        }
    };
    _proto._getOptions = function() {
        var editor = this.editor;
        var visible = this._isVisible();
        var isReadOnly = editor.option("readOnly");
        var template = editor._getTemplateByOption("dropDownButtonTemplate");
        return {
            focusStateEnabled: false,
            hoverStateEnabled: false,
            activeStateEnabled: false,
            useInkRipple: false,
            disabled: isReadOnly,
            visible: visible,
            template: template
        }
    };
    _proto._isVisible = function() {
        var editor = this.editor;
        return _TextEditorButton.prototype._isVisible.call(this) && editor.option("showDropDownButton")
    };
    _proto._legacyRender = function($editor, $element, isVisible) {
        $editor.toggleClass(DROP_DOWN_EDITOR_BUTTON_VISIBLE, isVisible);
        if ($element) {
            $element.removeClass("dx-button");
            $element.addClass(DROP_DOWN_EDITOR_BUTTON_CLASS)
        }
    };
    _proto.update = function() {
        var shouldUpdate = _TextEditorButton.prototype.update.call(this);
        if (shouldUpdate) {
            var editor = this.editor,
                instance = this.instance;
            var $editor = editor.$element();
            var options = this._getOptions();
            instance && instance.option(options);
            this._legacyRender($editor, instance && instance.$element(), options.visible)
        }
    };
    return ClearButton
}(_button.default);
exports.default = ClearButton;
module.exports = exports.default;
