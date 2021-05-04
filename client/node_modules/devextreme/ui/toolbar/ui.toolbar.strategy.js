/**
 * DevExtreme (ui/toolbar/ui.toolbar.strategy.js)
 * Version: 20.2.6
 * Build date: Tue Mar 16 2021
 *
 * Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
exports.default = void 0;
var _renderer = _interopRequireDefault(require("../../core/renderer"));
var _common = require("../../core/utils/common");
var _iterator = require("../../core/utils/iterator");
var _data = require("../../core/utils/data");
var _class = _interopRequireDefault(require("../../core/class"));
var _button = _interopRequireDefault(require("../button"));

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        "default": obj
    }
}
var abstract = _class.default.abstract;
var TOOLBAR_MENU_CONTAINER_CLASS = "dx-toolbar-menu-container";
var TOOLBAR_MENU_BUTTON_CLASS = "dx-toolbar-menu-button";
var ToolbarStrategy = _class.default.inherit({
    ctor: function(toolbar) {
        this._toolbar = toolbar
    },
    render: function() {
        this._renderMenuButton();
        this._renderWidget()
    },
    _widgetOptions: function() {
        var itemClickAction = this._toolbar._createActionByOption("onItemClick");
        return {
            itemTemplate: this._getMenuItemTemplate.bind(this),
            onItemClick: function(e) {
                this._toggleMenu(false, true);
                itemClickAction(e)
            }.bind(this)
        }
    },
    _getMenuItemTemplate: function() {
        return this._toolbar._getTemplateByOption("menuItemTemplate")
    },
    _renderWidget: function() {
        var $menu = (0, _renderer.default)("<div>").appendTo(this._menuContainer());
        this._menu = this._toolbar._createComponent($menu, this._menuWidgetClass(), this._widgetOptions());
        this.renderMenuItems()
    },
    _menuContainer: abstract,
    _menuWidgetClass: abstract,
    _hasVisibleMenuItems: function(items) {
        var menuItems = items || this._toolbar.option("items");
        var result = false;
        var optionGetter = (0, _data.compileGetter)("visible");
        var overflowGetter = (0, _data.compileGetter)("locateInMenu");
        (0, _iterator.each)(menuItems, function(index, item) {
            var itemVisible = optionGetter(item, {
                functionsAsIs: true
            });
            var itemOverflow = overflowGetter(item, {
                functionsAsIs: true
            });
            if (false !== itemVisible && ("auto" === itemOverflow || "always" === itemOverflow) || "menu" === item.location) {
                result = true
            }
        });
        return result
    },
    _getMenuItems: function() {
        return this._toolbar._getMenuItems()
    },
    _updateMenuVisibility: _common.noop,
    _renderMenuButton: function() {
        var buttonOptions = this._menuButtonOptions();
        this._renderMenuButtonContainer();
        this._$button = (0, _renderer.default)("<div>").appendTo(this._$menuButtonContainer).addClass(TOOLBAR_MENU_BUTTON_CLASS);
        this._toolbar._createComponent(this._$button, _button.default, buttonOptions)
    },
    _menuButtonOptions: function() {
        return {
            onClick: this._menuButtonClickHandler.bind(this)
        }
    },
    _menuButtonClickHandler: function() {
        this._toggleMenu(!this._menuShown, true)
    },
    _renderMenuButtonContainer: function() {
        var $afterSection = this._toolbar._$afterSection;
        this._$menuButtonContainer = (0, _renderer.default)("<div>").appendTo($afterSection).addClass(this._toolbar._buttonClass()).addClass(TOOLBAR_MENU_CONTAINER_CLASS)
    },
    renderMenuItems: function() {
        this._menu && this._menu.option("items", this._getMenuItems())
    },
    toggleMenuVisibility: function(visible, animate) {
        this._menu && this._toggleMenu(visible, animate)
    },
    _toggleMenu: function(visible) {
        this._menuShown = visible
    },
    getMenuWidget: function() {
        return this._menu
    },
    widgetOption: function(name, value) {
        this._menu && this._menu.option(name, value)
    },
    handleToolbarVisibilityChange: _common.noop
});
var _default = ToolbarStrategy;
exports.default = _default;
module.exports = exports.default;
