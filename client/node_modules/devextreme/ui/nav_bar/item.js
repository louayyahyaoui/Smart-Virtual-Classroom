/**
 * DevExtreme (ui/nav_bar/item.js)
 * Version: 20.2.6
 * Build date: Tue Mar 16 2021
 *
 * Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
exports.default = void 0;
var _item = _interopRequireDefault(require("../tabs/item"));

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        "default": obj
    }
}
var TABS_ITEM_BADGE_CLASS = "dx-tabs-item-badge";
var NAVBAR_ITEM_BADGE_CLASS = "dx-navbar-item-badge";
var NavBarItem = _item.default.inherit({
    _renderBadge: function(badge) {
        this.callBase(badge);
        this._$element.children("." + TABS_ITEM_BADGE_CLASS).removeClass(TABS_ITEM_BADGE_CLASS).addClass(NAVBAR_ITEM_BADGE_CLASS)
    }
});
var _default = NavBarItem;
exports.default = _default;
module.exports = exports.default;
