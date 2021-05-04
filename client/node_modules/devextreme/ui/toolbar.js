/**
 * DevExtreme (ui/toolbar.js)
 * Version: 20.2.6
 * Build date: Tue Mar 16 2021
 *
 * Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
exports.default = void 0;
var _renderer = _interopRequireDefault(require("../core/renderer"));
var _component_registrator = _interopRequireDefault(require("../core/component_registrator"));
var _common = require("../core/utils/common");
var _extend = require("../core/utils/extend");
var _array = require("../core/utils/array");
var _iterator = require("../core/utils/iterator");
var _uiToolbarStrategy = _interopRequireDefault(require("./toolbar/ui.toolbar.strategy.action_sheet"));
var _uiToolbarStrategy2 = _interopRequireDefault(require("./toolbar/ui.toolbar.strategy.drop_down_menu"));
var _uiToolbar = _interopRequireDefault(require("./toolbar/ui.toolbar.base"));
var _child_default_template = require("../core/templates/child_default_template");

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        "default": obj
    }
}
var STRATEGIES = {
    actionSheet: _uiToolbarStrategy.default,
    dropDownMenu: _uiToolbarStrategy2.default
};
var TOOLBAR_AUTO_HIDE_ITEM_CLASS = "dx-toolbar-item-auto-hide";
var TOOLBAR_AUTO_HIDE_TEXT_CLASS = "dx-toolbar-text-auto-hide";
var TOOLBAR_HIDDEN_ITEM = "dx-toolbar-item-invisible";
var Toolbar = _uiToolbar.default.inherit({
    _getDefaultOptions: function() {
        return (0, _extend.extend)(this.callBase(), {
            menuItemTemplate: "menuItem",
            submenuType: "dropDownMenu",
            menuContainer: void 0
        })
    },
    _dimensionChanged: function(dimension) {
        if ("height" === dimension) {
            return
        }
        this._menuStrategy.toggleMenuVisibility(false, true);
        this.callBase();
        this._menuStrategy.renderMenuItems()
    },
    _initTemplates: function() {
        this.callBase();
        this._templateManager.addDefaultTemplates({
            actionSheetItem: new _child_default_template.ChildDefaultTemplate("item")
        })
    },
    _initMarkup: function() {
        this.callBase();
        this._renderMenu()
    },
    _postProcessRenderItems: function() {
        var _this = this;
        this._hideOverflowItems();
        this._menuStrategy._updateMenuVisibility();
        this.callBase();
        (0, _common.deferRender)(function() {
            _this._menuStrategy.renderMenuItems()
        })
    },
    _renderItem: function(index, item, itemContainer, $after) {
        var itemElement = this.callBase(index, item, itemContainer, $after);
        if ("auto" === item.locateInMenu) {
            itemElement.addClass(TOOLBAR_AUTO_HIDE_ITEM_CLASS)
        }
        if ("dxButton" === item.widget && "inMenu" === item.showText) {
            itemElement.toggleClass(TOOLBAR_AUTO_HIDE_TEXT_CLASS)
        }
        return itemElement
    },
    _getItemsWidth: function() {
        return this._getSummaryItemsWidth([this._$beforeSection, this._$centerSection, this._$afterSection])
    },
    _hideOverflowItems: function(elementWidth) {
        var overflowItems = this.$element().find("." + TOOLBAR_AUTO_HIDE_ITEM_CLASS);
        if (!overflowItems.length) {
            return
        }
        elementWidth = elementWidth || this.$element().width();
        (0, _renderer.default)(overflowItems).removeClass(TOOLBAR_HIDDEN_ITEM);
        var itemsWidth = this._getItemsWidth();
        while (overflowItems.length && elementWidth < itemsWidth) {
            var $item = overflowItems.eq(-1);
            itemsWidth -= $item.outerWidth();
            $item.addClass(TOOLBAR_HIDDEN_ITEM);
            overflowItems.splice(-1, 1)
        }
    },
    _getMenuItems: function() {
        var that = this;
        var menuItems = (0, _common.grep)(this.option("items") || [], function(item) {
            return that._isMenuItem(item)
        });
        var $hiddenItems = this._itemContainer().children("." + TOOLBAR_AUTO_HIDE_ITEM_CLASS + "." + TOOLBAR_HIDDEN_ITEM).not(".dx-state-invisible");
        this._restoreItems = this._restoreItems || [];
        var overflowItems = [].slice.call($hiddenItems).map(function(item) {
            var itemData = that._getItemData(item);
            var $itemContainer = (0, _renderer.default)(item).children();
            var $itemMarkup = $itemContainer.children();
            return (0, _extend.extend)({
                menuItemTemplate: function() {
                    that._restoreItems.push({
                        container: $itemContainer,
                        item: $itemMarkup
                    });
                    var $container = (0, _renderer.default)("<div>").addClass(TOOLBAR_AUTO_HIDE_ITEM_CLASS);
                    return $container.append($itemMarkup)
                }
            }, itemData)
        });
        return (0, _array.merge)(overflowItems, menuItems)
    },
    _getToolbarItems: function() {
        var that = this;
        return (0, _common.grep)(this.option("items") || [], function(item) {
            return !that._isMenuItem(item)
        })
    },
    _renderMenu: function() {
        var _this2 = this;
        this._renderMenuStrategy();
        (0, _common.deferRender)(function() {
            _this2._menuStrategy.render()
        })
    },
    _renderMenuStrategy: function() {
        var strategyName = this.option("submenuType");
        if (this._requireDropDownStrategy()) {
            strategyName = "dropDownMenu"
        }
        var strategy = STRATEGIES[strategyName];
        if (!(this._menuStrategy && this._menuStrategy.NAME === strategyName)) {
            this._menuStrategy = new strategy(this)
        }
    },
    _requireDropDownStrategy: function() {
        var items = this.option("items") || [];
        var result = false;
        (0, _iterator.each)(items, function(index, item) {
            if ("auto" === item.locateInMenu) {
                result = true
            } else {
                if ("always" === item.locateInMenu && item.widget) {
                    result = true
                }
            }
        });
        return result
    },
    _arrangeItems: function() {
        if (this.$element().is(":hidden")) {
            return
        }
        this._$centerSection.css({
            margin: "0 auto",
            "float": "none"
        });
        (0, _iterator.each)(this._restoreItems || [], function(_, obj) {
            (0, _renderer.default)(obj.container).append(obj.item)
        });
        this._restoreItems = [];
        var elementWidth = this.$element().width();
        this._hideOverflowItems(elementWidth);
        this.callBase(elementWidth)
    },
    _itemOptionChanged: function(item, property, value) {
        if (this._isMenuItem(item)) {
            this._menuStrategy.renderMenuItems()
        } else {
            if (this._isToolbarItem(item)) {
                this.callBase(item, property, value)
            } else {
                this.callBase(item, property, value);
                this._menuStrategy.renderMenuItems()
            }
        }
        if ("location" === property) {
            this.repaint()
        }
    },
    _isMenuItem: function(itemData) {
        return "menu" === itemData.location || "always" === itemData.locateInMenu
    },
    _isToolbarItem: function(itemData) {
        return void 0 === itemData.location || "never" === itemData.locateInMenu
    },
    _optionChanged: function(args) {
        var name = args.name;
        var value = args.value;
        switch (name) {
            case "submenuType":
                this._invalidate();
                break;
            case "visible":
                this.callBase.apply(this, arguments);
                this._menuStrategy.handleToolbarVisibilityChange(value);
                break;
            case "menuItemTemplate":
                this._changeMenuOption("itemTemplate", this._getTemplate(value));
                break;
            case "onItemClick":
                this._changeMenuOption(name, value);
                this.callBase.apply(this, arguments);
                break;
            case "menuContainer":
                this._changeMenuOption("container", value);
                break;
            default:
                this.callBase.apply(this, arguments)
        }
    },
    _changeMenuOption: function(name, value) {
        this._menuStrategy.widgetOption(name, value)
    }
});
(0, _component_registrator.default)("dxToolbar", Toolbar);
var _default = Toolbar;
exports.default = _default;
module.exports = exports.default;
module.exports.default = module.exports;
