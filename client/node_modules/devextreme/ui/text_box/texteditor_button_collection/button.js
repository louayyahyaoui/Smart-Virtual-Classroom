/**
 * DevExtreme (ui/text_box/texteditor_button_collection/button.js)
 * Version: 20.2.6
 * Build date: Tue Mar 16 2021
 *
 * Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
exports.default = void 0;
var _renderer = _interopRequireDefault(require("../../../core/renderer"));

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        "default": obj
    }
}
var TextEditorButton = function() {
    function TextEditorButton(name, editor, options) {
        this.instance = null;
        this.$container = null;
        this.$placeMarker = null;
        this.editor = editor;
        this.name = name;
        this.options = options || {}
    }
    var _proto = TextEditorButton.prototype;
    _proto._addPlaceMarker = function($container) {
        this.$placeMarker = (0, _renderer.default)("<div>").appendTo($container)
    };
    _proto._addToContainer = function($element) {
        var $placeMarker = this.$placeMarker,
            $container = this.$container;
        $placeMarker ? $placeMarker.replaceWith($element) : $element.appendTo($container)
    };
    _proto._attachEvents = function() {
        throw "Not implemented"
    };
    _proto._create = function() {
        throw "Not implemented"
    };
    _proto._isRendered = function() {
        return !!this.instance
    };
    _proto._isVisible = function() {
        var editor = this.editor,
            options = this.options;
        return options.visible || !editor.option("readOnly")
    };
    _proto._isDisabled = function() {
        throw "Not implemented"
    };
    _proto._shouldRender = function() {
        return this._isVisible() && !this._isRendered()
    };
    _proto.dispose = function() {
        var instance = this.instance,
            $placeMarker = this.$placeMarker;
        if (instance) {
            instance.dispose ? instance.dispose() : instance.remove();
            this.instance = null
        }
        $placeMarker && $placeMarker.remove()
    };
    _proto.render = function() {
        var $container = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : this.$container;
        this.$container = $container;
        if (this._isVisible()) {
            var _this$_create = this._create(),
                instance = _this$_create.instance,
                $element = _this$_create.$element;
            this.instance = instance;
            this._attachEvents(instance, $element)
        } else {
            this._addPlaceMarker($container)
        }
    };
    _proto.update = function() {
        if (this._shouldRender()) {
            this.render()
        }
        return !!this.instance
    };
    return TextEditorButton
}();
exports.default = TextEditorButton;
module.exports = exports.default;
