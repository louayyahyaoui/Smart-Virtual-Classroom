/**
 * DevExtreme (ui/list/ui.list.edit.decorator.switchable.button.js)
 * Version: 20.2.6
 * Build date: Tue Mar 16 2021
 *
 * Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
exports.default = void 0;
var _renderer = _interopRequireDefault(require("../../core/renderer"));
var _fx = _interopRequireDefault(require("../../animation/fx"));
var _button = _interopRequireDefault(require("../button"));
var _message = _interopRequireDefault(require("../../localization/message"));
var _uiListEdit = require("./ui.list.edit.decorator_registry");
var _uiListEditDecorator = _interopRequireDefault(require("./ui.list.edit.decorator.switchable"));

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        "default": obj
    }
}
var SWITCHABLE_DELETE_BUTTON_CONTAINER_CLASS = "dx-list-switchable-delete-button-container";
var SWITCHABLE_DELETE_BUTTON_WRAPPER_CLASS = "dx-list-switchable-delete-button-wrapper";
var SWITCHABLE_DELETE_BUTTON_INNER_WRAPPER_CLASS = "dx-list-switchable-delete-button-inner-wrapper";
var SWITCHABLE_DELETE_BUTTON_CLASS = "dx-list-switchable-delete-button";
var SWITCHABLE_DELETE_BUTTON_ANIMATION_DURATION = 200;
var SwitchableButtonEditDecorator = _uiListEditDecorator.default.inherit({
    _init: function() {
        this.callBase.apply(this, arguments);
        var $buttonContainer = (0, _renderer.default)("<div>").addClass(SWITCHABLE_DELETE_BUTTON_CONTAINER_CLASS);
        var $buttonWrapper = (0, _renderer.default)("<div>").addClass(SWITCHABLE_DELETE_BUTTON_WRAPPER_CLASS);
        var $buttonInnerWrapper = (0, _renderer.default)("<div>").addClass(SWITCHABLE_DELETE_BUTTON_INNER_WRAPPER_CLASS);
        var $button = (0, _renderer.default)("<div>").addClass(SWITCHABLE_DELETE_BUTTON_CLASS);
        this._list._createComponent($button, _button.default, {
            text: _message.default.format("dxListEditDecorator-delete"),
            type: "danger",
            onClick: function(e) {
                this._deleteItem();
                e.event.stopPropagation()
            }.bind(this),
            integrationOptions: {}
        });
        $buttonContainer.append($buttonWrapper);
        $buttonWrapper.append($buttonInnerWrapper);
        $buttonInnerWrapper.append($button);
        this._$buttonContainer = $buttonContainer
    },
    _enablePositioning: function($itemElement) {
        this.callBase.apply(this, arguments);
        _fx.default.stop(this._$buttonContainer, true);
        this._$buttonContainer.appendTo($itemElement)
    },
    _disablePositioning: function() {
        this.callBase.apply(this, arguments);
        this._$buttonContainer.detach()
    },
    _animatePrepareDeleteReady: function() {
        var rtl = this._isRtlEnabled();
        var listWidth = this._list.$element().width();
        var buttonWidth = this._buttonWidth();
        var fromValue = rtl ? listWidth : -buttonWidth;
        var toValue = rtl ? listWidth - buttonWidth : 0;
        return _fx.default.animate(this._$buttonContainer, {
            type: "custom",
            duration: SWITCHABLE_DELETE_BUTTON_ANIMATION_DURATION,
            from: {
                right: fromValue
            },
            to: {
                right: toValue
            }
        })
    },
    _animateForgetDeleteReady: function() {
        var rtl = this._isRtlEnabled();
        var listWidth = this._list.$element().width();
        var buttonWidth = this._buttonWidth();
        var fromValue = rtl ? listWidth - buttonWidth : 0;
        var toValue = rtl ? listWidth : -buttonWidth;
        return _fx.default.animate(this._$buttonContainer, {
            type: "custom",
            duration: SWITCHABLE_DELETE_BUTTON_ANIMATION_DURATION,
            from: {
                right: fromValue
            },
            to: {
                right: toValue
            }
        })
    },
    _buttonWidth: function() {
        if (!this._buttonContainerWidth) {
            this._buttonContainerWidth = this._$buttonContainer.outerWidth()
        }
        return this._buttonContainerWidth
    },
    dispose: function() {
        if (this._$buttonContainer) {
            this._$buttonContainer.remove()
        }
        this.callBase.apply(this, arguments)
    }
});
var TOGGLE_DELETE_SWITCH_CONTAINER_CLASS = "dx-list-toggle-delete-switch-container";
var TOGGLE_DELETE_SWITCH_CLASS = "dx-list-toggle-delete-switch";
(0, _uiListEdit.register)("delete", "toggle", SwitchableButtonEditDecorator.inherit({
    beforeBag: function(config) {
        var $itemElement = config.$itemElement;
        var $container = config.$container;
        var $toggle = (0, _renderer.default)("<div>").addClass(TOGGLE_DELETE_SWITCH_CLASS);
        this._list._createComponent($toggle, _button.default, {
            icon: "toggle-delete",
            onClick: function(e) {
                _fx.default.stop(this._$buttonContainer, false);
                this._toggleDeleteReady($itemElement);
                e.event.stopPropagation()
            }.bind(this),
            integrationOptions: {}
        });
        $container.addClass(TOGGLE_DELETE_SWITCH_CONTAINER_CLASS);
        $container.append($toggle)
    }
}));
(0, _uiListEdit.register)("delete", "slideButton", SwitchableButtonEditDecorator.inherit({
    _shouldHandleSwipe: true,
    _swipeEndHandler: function($itemElement, args) {
        if (0 !== args.targetOffset) {
            _fx.default.stop(this._$buttonContainer, false);
            this._toggleDeleteReady($itemElement)
        }
        return true
    }
}));
var _default = SwitchableButtonEditDecorator;
exports.default = _default;
module.exports = exports.default;
