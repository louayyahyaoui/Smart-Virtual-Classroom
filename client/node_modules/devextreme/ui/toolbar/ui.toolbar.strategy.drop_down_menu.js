/**
 * DevExtreme (ui/toolbar/ui.toolbar.strategy.drop_down_menu.js)
 * Version: 20.2.6
 * Build date: Tue Mar 16 2021
 *
 * Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
exports.default = void 0;
var _extend = require("../../core/utils/extend");
var _uiToolbar = _interopRequireDefault(require("./ui.toolbar.strategy"));
var _uiToolbar2 = _interopRequireDefault(require("./ui.toolbar.menu"));
var _drop_down_menu = _interopRequireDefault(require("../drop_down_menu"));

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        "default": obj
    }
}
var MENU_INVISIBLE_CLASS = "dx-state-invisible";
var DropDownMenuStrategy = _uiToolbar.default.inherit({
    NAME: "dropDownMenu",
    render: function() {
        if (!this._hasVisibleMenuItems()) {
            return
        }
        this._renderMenuButtonContainer();
        this._renderWidget()
    },
    renderMenuItems: function() {
        if (!this._menu) {
            this.render()
        }
        this.callBase();
        if (this._menu && !this._menu.option("items").length) {
            this._menu.close()
        }
    },
    _menuWidgetClass: function() {
        return _drop_down_menu.default
    },
    _widgetOptions: function() {
        var that = this;
        return (0, _extend.extend)(this.callBase(), {
            deferRendering: true,
            container: that._toolbar.option("menuContainer"),
            menuWidget: _uiToolbar2.default,
            onOptionChanged: function(e) {
                if ("items" === e.name) {
                    that._updateMenuVisibility(e.value)
                }
            },
            popupPosition: {
                at: "bottom right",
                my: "top right"
            }
        })
    },
    _updateMenuVisibility: function(menuItems) {
        var items = menuItems || this._getMenuItems();
        var isMenuVisible = items.length && this._hasVisibleMenuItems(items);
        this._toggleMenuVisibility(isMenuVisible)
    },
    _toggleMenuVisibility: function(value) {
        if (!this._menuContainer()) {
            return
        }
        this._menuContainer().toggleClass(MENU_INVISIBLE_CLASS, !value)
    },
    _menuContainer: function() {
        return this._$menuButtonContainer
    }
});
var _default = DropDownMenuStrategy;
exports.default = _default;
module.exports = exports.default;
