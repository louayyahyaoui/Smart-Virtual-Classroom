/**
 * DevExtreme (ui/toolbar/ui.toolbar.strategy.action_sheet.js)
 * Version: 20.2.6
 * Build date: Tue Mar 16 2021
 *
 * Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
exports.default = void 0;
var _uiToolbar = _interopRequireDefault(require("./ui.toolbar.strategy"));
var _extend = require("../../core/utils/extend");
var _action_sheet = _interopRequireDefault(require("../action_sheet"));

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        "default": obj
    }
}
var ActionSheetStrategy = _uiToolbar.default.inherit({
    NAME: "actionSheet",
    _getMenuItemTemplate: function() {
        return this._toolbar._getTemplate("actionSheetItem")
    },
    render: function() {
        if (!this._hasVisibleMenuItems()) {
            return
        }
        this.callBase()
    },
    _menuWidgetClass: function() {
        return _action_sheet.default
    },
    _menuContainer: function() {
        return this._toolbar.$element()
    },
    _widgetOptions: function() {
        return (0, _extend.extend)({}, this.callBase(), {
            target: this._$button,
            showTitle: false
        })
    },
    _menuButtonOptions: function() {
        return (0, _extend.extend)({}, this.callBase(), {
            icon: "overflow"
        })
    },
    _toggleMenu: function() {
        this.callBase.apply(this, arguments);
        this._menu.toggle(this._menuShown);
        this._menuShown = false
    }
});
var _default = ActionSheetStrategy;
exports.default = _default;
module.exports = exports.default;
