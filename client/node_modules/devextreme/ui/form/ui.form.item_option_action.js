/**
 * DevExtreme (ui/form/ui.form.item_option_action.js)
 * Version: 20.2.6
 * Build date: Tue Mar 16 2021
 *
 * Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
exports.default = void 0;
var _class = _interopRequireDefault(require("../../core/class"));

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        "default": obj
    }
}
var ItemOptionAction = function() {
    function ItemOptionAction(options) {
        this._options = options;
        this._itemsRunTimeInfo = this._options.itemsRunTimeInfo
    }
    var _proto = ItemOptionAction.prototype;
    _proto.findInstance = function() {
        return this._itemsRunTimeInfo.findWidgetInstanceByItem(this._options.item)
    };
    _proto.findItemContainer = function() {
        return this._itemsRunTimeInfo.findItemContainerByItem(this._options.item)
    };
    _proto.tryExecute = function() {
        _class.default.abstract()
    };
    return ItemOptionAction
}();
exports.default = ItemOptionAction;
module.exports = exports.default;
