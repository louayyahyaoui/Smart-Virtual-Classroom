/**
 * DevExtreme (ui/text_box/texteditor_button_collection/custom.js)
 * Version: 20.2.6
 * Build date: Tue Mar 16 2021
 *
 * Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
exports.default = void 0;
var _renderer = _interopRequireDefault(require("../../../core/renderer"));
var _button = _interopRequireDefault(require("./button"));
var _button2 = _interopRequireDefault(require("../../button"));
var _extend = require("../../../core/utils/extend");
var _events_engine = _interopRequireDefault(require("../../../events/core/events_engine"));
var _hover = require("../../../events/hover");
var _click = require("../../../events/click");

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
var CUSTOM_BUTTON_HOVERED_CLASS = "dx-custom-button-hovered";
var CustomButton = function(_TextEditorButton) {
    _inheritsLoose(CustomButton, _TextEditorButton);

    function CustomButton() {
        return _TextEditorButton.apply(this, arguments) || this
    }
    var _proto = CustomButton.prototype;
    _proto._attachEvents = function(instance, $element) {
        var editor = this.editor;
        _events_engine.default.on($element, _hover.start, function() {
            editor.$element().addClass(CUSTOM_BUTTON_HOVERED_CLASS)
        });
        _events_engine.default.on($element, _hover.end, function() {
            editor.$element().removeClass(CUSTOM_BUTTON_HOVERED_CLASS)
        });
        _events_engine.default.on($element, _click.name, function(e) {
            e.stopPropagation()
        })
    };
    _proto._create = function() {
        var editor = this.editor;
        var $element = (0, _renderer.default)("<div>");
        this._addToContainer($element);
        var instance = editor._createComponent($element, _button2.default, (0, _extend.extend)({}, this.options, {
            ignoreParentReadOnly: true,
            disabled: this._isDisabled(),
            integrationOptions: this._prepareIntegrationOptions(editor)
        }));
        return {
            $element: $element,
            instance: instance
        }
    };
    _proto._prepareIntegrationOptions = function(editor) {
        return (0, _extend.extend)({}, editor.option("integrationOptions"), {
            skipTemplates: ["content"]
        })
    };
    _proto.update = function() {
        var isUpdated = _TextEditorButton.prototype.update.call(this);
        if (this.instance) {
            this.instance.option("disabled", this._isDisabled())
        }
        return isUpdated
    };
    _proto._isVisible = function() {
        var editor = this.editor;
        return editor.option("visible")
    };
    _proto._isDisabled = function() {
        var isDefinedByUser = void 0 !== this.options.disabled;
        if (isDefinedByUser) {
            return this.instance ? this.instance.option("disabled") : this.options.disabled
        } else {
            return this.editor.option("readOnly")
        }
    };
    return CustomButton
}(_button.default);
exports.default = CustomButton;
module.exports = exports.default;
