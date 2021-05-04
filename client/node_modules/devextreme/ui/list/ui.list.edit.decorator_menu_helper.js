/**
 * DevExtreme (ui/list/ui.list.edit.decorator_menu_helper.js)
 * Version: 20.2.6
 * Build date: Tue Mar 16 2021
 *
 * Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
exports.default = void 0;
var EditDecoratorMenuHelperMixin = {
    _menuEnabled: function() {
        return !!this._menuItems().length
    },
    _menuItems: function() {
        return this._list.option("menuItems")
    },
    _deleteEnabled: function() {
        return this._list.option("allowItemDeleting")
    },
    _fireMenuAction: function($itemElement, action) {
        this._list._itemEventHandlerByHandler($itemElement, action, {}, {
            excludeValidators: ["disabled", "readOnly"]
        })
    }
};
var _default = EditDecoratorMenuHelperMixin;
exports.default = _default;
module.exports = exports.default;
