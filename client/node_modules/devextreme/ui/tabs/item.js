/**
 * DevExtreme (ui/tabs/item.js)
 * Version: 20.2.6
 * Build date: Tue Mar 16 2021
 *
 * Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
exports.default = void 0;
var _renderer = _interopRequireDefault(require("../../core/renderer"));
var _item = _interopRequireDefault(require("../collection/item"));

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        "default": obj
    }
}
var TABS_ITEM_BADGE_CLASS = "dx-tabs-item-badge";
var BADGE_CLASS = "dx-badge";
var TabsItem = _item.default.inherit({
    _renderWatchers: function() {
        this.callBase();
        this._startWatcher("badge", this._renderBadge.bind(this))
    },
    _renderBadge: function(badge) {
        this._$element.children("." + BADGE_CLASS).remove();
        if (!badge) {
            return
        }
        var $badge = (0, _renderer.default)("<div>").addClass(TABS_ITEM_BADGE_CLASS).addClass(BADGE_CLASS).text(badge);
        this._$element.append($badge)
    }
});
var _default = TabsItem;
exports.default = _default;
module.exports = exports.default;
