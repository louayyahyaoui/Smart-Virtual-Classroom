/**
 * DevExtreme (ui/diagram/ui.diagram.menu_helper.js)
 * Version: 20.2.6
 * Build date: Tue Mar 16 2021
 *
 * Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
exports.default = void 0;
var _renderer = _interopRequireDefault(require("../../core/renderer"));
var _icon = require("../../core/utils/icon");

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        "default": obj
    }
}

function _typeof(obj) {
    "@babel/helpers - typeof";
    if ("function" === typeof Symbol && "symbol" === typeof Symbol.iterator) {
        _typeof = function(obj) {
            return typeof obj
        }
    } else {
        _typeof = function(obj) {
            return obj && "function" === typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj
        }
    }
    return _typeof(obj)
}
var DIAGRAM_CONTEXT_MENU_CLASS = "dx-diagram-contextmenu";
var DiagramMenuHelper = {
    getContextMenuItemTemplate: function(contextMenu, itemData, itemIndex, itemElement) {
        var $itemElement = (0, _renderer.default)(itemElement);
        $itemElement.empty();
        var itemKey = void 0 !== itemData.rootCommand ? itemData.rootCommand : -1;
        if (itemData.icon && !itemData.checked) {
            var $iconElement = (0, _icon.getImageContainer)(itemData.icon);
            $itemElement.append($iconElement)
        } else {
            if (contextMenu._menuHasCheckedItems && true === contextMenu._menuHasCheckedItems[itemKey]) {
                var $checkElement = (0, _icon.getImageContainer)("check");
                $checkElement.css("visibility", !itemData.checked ? "hidden" : "visible");
                $itemElement.append($checkElement)
            }
        }
        $itemElement.append('<span class="dx-menu-item-text">' + itemData.text + "</span>");
        if (Array.isArray(itemData.items) && itemData.items.length > 0) {
            $itemElement.append('<span class="dx-menu-item-popout-container"><div class="dx-menu-item-popout"></div></span>')
        }
    },
    getContextMenuCssClass: function() {
        return DIAGRAM_CONTEXT_MENU_CLASS
    },
    onContextMenuItemClick: function(widget, itemData, actionHandler) {
        if ((void 0 !== itemData.command || void 0 !== itemData.name) && (!Array.isArray(itemData.items) || !itemData.items.length)) {
            var parameter = DiagramMenuHelper.getItemCommandParameter(widget, itemData);
            actionHandler.call(this, itemData.command, itemData.name, parameter)
        } else {
            if (void 0 !== itemData.rootCommand && void 0 !== itemData.value) {
                var _parameter = DiagramMenuHelper.getItemCommandParameter(widget, itemData, itemData.value);
                actionHandler.call(this, itemData.rootCommand, void 0, _parameter)
            }
        }
    },
    getItemValue: function(item) {
        return "object" === _typeof(item.value) ? JSON.stringify(item.value) : item.value
    },
    getItemOptionText: function(contextMenu, indexPath) {
        if (contextMenu) {
            indexPath = indexPath.slice();
            var parentItemOptionText = this._getParentItemOptionText(indexPath);
            if (contextMenu && contextMenu._originalItemsInfo && contextMenu._originalItemsInfo[parentItemOptionText]) {
                indexPath[indexPath.length - 1] += contextMenu._originalItemsInfo[parentItemOptionText].indexPathCorrection
            }
        }
        return this._getItemOptionTextCore(indexPath)
    },
    _getParentItemOptionText: function(indexPath) {
        var parentIndexPath = indexPath.slice(0, indexPath.length - 1);
        return this._getItemOptionTextCore(parentIndexPath)
    },
    _getItemOptionTextCore: function(indexPath) {
        return indexPath.reduce(function(r, i) {
            return r + "items[".concat(i, "].")
        }, "")
    },
    getItemCommandParameter: function(widget, item, value) {
        if (item.getParameter) {
            return item.getParameter(widget)
        }
        return value
    },
    updateContextMenuItems: function(contextMenu, itemOptionText, rootCommandKey, items) {
        var _this = this;
        if (!contextMenu._originalItemsInfo) {
            contextMenu._originalItemsInfo = {}
        }
        if (!contextMenu._originalItemsInfo[itemOptionText]) {
            contextMenu._originalItemsInfo[itemOptionText] = {
                items: contextMenu.option(itemOptionText + "items") || []
            }
        }
        items = items.map(function(item) {
            return {
                value: _this.getItemValue(item),
                text: item.text,
                checked: item.checked,
                widget: contextMenu,
                rootCommand: rootCommandKey
            }
        });
        var originalItems = contextMenu._originalItemsInfo[itemOptionText].items;
        contextMenu.option(itemOptionText + "items", items.concat(originalItems));
        if (contextMenu._originalItemsInfo[itemOptionText] && originalItems.length) {
            contextMenu._originalItemsInfo[itemOptionText].indexPathCorrection = items.length
        }
    },
    updateContextMenuItemVisible: function(contextMenu, itemOptionText, visible) {
        contextMenu.option(itemOptionText + "visible", visible)
    },
    updateContextMenuItemValue: function(contextMenu, itemOptionText, rootCommandKey, value) {
        var items = contextMenu.option(itemOptionText + "items");
        if ("boolean" === typeof value && (!items || !items.length)) {
            this._setContextMenuHasCheckedItems(contextMenu, -1);
            contextMenu.option(itemOptionText + "checked", value)
        } else {
            if (void 0 !== value) {
                this._setContextMenuHasCheckedItems(contextMenu, rootCommandKey);
                if (Array.isArray(items)) {
                    items.forEach(function(item, index) {
                        item.checked = item.value === value
                    })
                }
            }
        }
    },
    _setContextMenuHasCheckedItems: function(contextMenu, key) {
        if (!contextMenu._menuHasCheckedItems) {
            contextMenu._menuHasCheckedItems = {}
        }
        contextMenu._menuHasCheckedItems[key] = true
    }
};
var _default = DiagramMenuHelper;
exports.default = _default;
module.exports = exports.default;
