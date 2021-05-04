/**
 * DevExtreme (ui/context_menu/ui.menu_base.js)
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
var _type = require("../../core/utils/type");
var _iterator = require("../../core/utils/iterator");
var _extend = require("../../core/utils/extend");
var _utils = require("../widget/utils.ink_ripple");
var _ui = _interopRequireDefault(require("../hierarchical_collection/ui.hierarchical_collection_widget"));
var _uiMenu_baseEdit = _interopRequireDefault(require("./ui.menu_base.edit.strategy"));
var _devices = _interopRequireDefault(require("../../core/devices"));
var _item = _interopRequireDefault(require("../collection/item"));

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        "default": obj
    }
}

function _inheritsLoose(subClass, superClass) {
    subClass.prototype = Object.create(superClass.prototype);
    subClass.prototype.constructor = subClass;
    _setPrototypeOf(subClass, superClass)
}

function _setPrototypeOf(o, p) {
    _setPrototypeOf = Object.setPrototypeOf || function(o, p) {
        o.__proto__ = p;
        return o
    };
    return _setPrototypeOf(o, p)
}
var DX_MENU_CLASS = "dx-menu";
var DX_MENU_NO_ICONS_CLASS = DX_MENU_CLASS + "-no-icons";
var DX_MENU_BASE_CLASS = "dx-menu-base";
var ITEM_CLASS = DX_MENU_CLASS + "-item";
var DX_ITEM_CONTENT_CLASS = ITEM_CLASS + "-content";
var DX_MENU_SELECTED_ITEM_CLASS = ITEM_CLASS + "-selected";
var DX_MENU_ITEM_WRAPPER_CLASS = ITEM_CLASS + "-wrapper";
var DX_MENU_ITEMS_CONTAINER_CLASS = DX_MENU_CLASS + "-items-container";
var DX_MENU_ITEM_EXPANDED_CLASS = ITEM_CLASS + "-expanded";
var DX_MENU_SEPARATOR_CLASS = DX_MENU_CLASS + "-separator";
var DX_MENU_ITEM_LAST_GROUP_ITEM = DX_MENU_CLASS + "-last-group-item";
var DX_ITEM_HAS_TEXT = ITEM_CLASS + "-has-text";
var DX_ITEM_HAS_ICON = ITEM_CLASS + "-has-icon";
var DX_ITEM_HAS_SUBMENU = ITEM_CLASS + "-has-submenu";
var DX_MENU_ITEM_POPOUT_CLASS = ITEM_CLASS + "-popout";
var DX_MENU_ITEM_POPOUT_CONTAINER_CLASS = DX_MENU_ITEM_POPOUT_CLASS + "-container";
var DX_MENU_ITEM_CAPTION_CLASS = ITEM_CLASS + "-text";
var SINGLE_SELECTION_MODE = "single";
var DEFAULT_DELAY = {
    show: 50,
    hide: 300
};
var MenuBase = function(_HierarchicalCollecti) {
    _inheritsLoose(MenuBase, _HierarchicalCollecti);

    function MenuBase() {
        return _HierarchicalCollecti.apply(this, arguments) || this
    }
    var _proto = MenuBase.prototype;
    _proto._getDefaultOptions = function() {
        return (0, _extend.extend)(_HierarchicalCollecti.prototype._getDefaultOptions.call(this), {
            items: [],
            cssClass: "",
            activeStateEnabled: true,
            showSubmenuMode: {
                name: "onHover",
                delay: {
                    show: 50,
                    hide: 300
                }
            },
            animation: {
                show: {
                    type: "fade",
                    from: 0,
                    to: 1,
                    duration: 100
                },
                hide: {
                    type: "fade",
                    from: 1,
                    to: 0,
                    duration: 100
                }
            },
            selectByClick: false,
            focusOnSelectedItem: false,
            keyExpr: null,
            _itemAttributes: {
                role: "menuitem"
            },
            useInkRipple: false
        })
    };
    _proto._itemDataKey = function() {
        return "dxMenuItemDataKey"
    };
    _proto._itemClass = function() {
        return ITEM_CLASS
    };
    _proto._setAriaSelected = function() {};
    _proto._selectedItemClass = function() {
        return DX_MENU_SELECTED_ITEM_CLASS
    };
    _proto._widgetClass = function() {
        return DX_MENU_BASE_CLASS
    };
    _proto._focusTarget = function() {
        return this._itemContainer()
    };
    _proto._clean = function() {
        this.option("focusedElement", null);
        _HierarchicalCollecti.prototype._clean.call(this)
    };
    _proto._supportedKeys = function() {
        var _this = this;
        var selectItem = function() {
            var $item = (0, _renderer.default)(_this.option("focusedElement"));
            if (!$item.length || !_this._isSelectionEnabled()) {
                return
            }
            _this.selectItem($item[0])
        };
        return (0, _extend.extend)(_HierarchicalCollecti.prototype._supportedKeys.call(this), {
            space: selectItem,
            pageUp: _common.noop,
            pageDown: _common.noop
        })
    };
    _proto._isSelectionEnabled = function() {
        return this.option("selectionMode") === SINGLE_SELECTION_MODE
    };
    _proto._init = function() {
        this._activeStateUnit = ".".concat(ITEM_CLASS);
        _HierarchicalCollecti.prototype._init.call(this);
        this._renderSelectedItem();
        this._initActions()
    };
    _proto._getTextContainer = function(itemData) {
        var itemText = itemData.text;
        var $itemContainer = (0, _renderer.default)("<span>").addClass(DX_MENU_ITEM_CAPTION_CLASS);
        var itemContent = (0, _type.isPlainObject)(itemData) ? itemText : String(itemData);
        return itemText && $itemContainer.text(itemContent)
    };
    _proto._getPopoutContainer = function(itemData) {
        var items = itemData.items;
        var $popOutContainer;
        if (items && items.length) {
            var $popOutImage = (0, _renderer.default)("<div>").addClass(DX_MENU_ITEM_POPOUT_CLASS);
            $popOutContainer = (0, _renderer.default)("<span>").addClass(DX_MENU_ITEM_POPOUT_CONTAINER_CLASS).append($popOutImage)
        }
        return $popOutContainer
    };
    _proto._getDataAdapterOptions = function() {
        return {
            rootValue: 0,
            multipleSelection: false,
            recursiveSelection: false,
            recursiveExpansion: false,
            searchValue: ""
        }
    };
    _proto._selectByItem = function(selectedItem) {
        if (!selectedItem) {
            return
        }
        var nodeToSelect = this._dataAdapter.getNodeByItem(selectedItem);
        this._dataAdapter.toggleSelection(nodeToSelect.internalFields.key, true)
    };
    _proto._renderSelectedItem = function() {
        var selectedKeys = this._dataAdapter.getSelectedNodesKeys();
        var selectedKey = selectedKeys.length && selectedKeys[0];
        var selectedItem = this.option("selectedItem");
        if (!selectedKey) {
            this._selectByItem(selectedItem);
            return
        }
        var node = this._dataAdapter.getNodeByKey(selectedKey);
        if (false === node.selectable) {
            return
        }
        if (!selectedItem) {
            this.option("selectedItem", node.internalFields.item);
            return
        }
        if (selectedItem !== node.internalFields.item) {
            this._dataAdapter.toggleSelection(selectedKey, false);
            this._selectByItem(selectedItem)
        }
    };
    _proto._initActions = function() {};
    _proto._initMarkup = function() {
        _HierarchicalCollecti.prototype._initMarkup.call(this);
        this._addCustomCssClass(this.$element());
        this.option("useInkRipple") && this._renderInkRipple()
    };
    _proto._renderInkRipple = function() {
        this._inkRipple = (0, _utils.render)()
    };
    _proto._toggleActiveState = function($element, value, e) {
        _HierarchicalCollecti.prototype._toggleActiveState.apply(this, arguments);
        if (!this._inkRipple) {
            return
        }
        var config = {
            element: $element,
            event: e
        };
        if (value) {
            this._inkRipple.showWave(config)
        } else {
            this._inkRipple.hideWave(config)
        }
    };
    _proto._getShowSubmenuMode = function() {
        var defaultValue = "onClick";
        var optionValue = this.option("showSubmenuMode");
        optionValue = (0, _type.isObject)(optionValue) ? optionValue.name : optionValue;
        return this._isDesktopDevice() ? optionValue : defaultValue
    };
    _proto._initSelectedItems = function() {};
    _proto._isDesktopDevice = function() {
        return "desktop" === _devices.default.real().deviceType
    };
    _proto._initEditStrategy = function() {
        var Strategy = _uiMenu_baseEdit.default;
        this._editStrategy = new Strategy(this)
    };
    _proto._addCustomCssClass = function($element) {
        $element.addClass(this.option("cssClass"))
    };
    _proto._itemWrapperSelector = function() {
        return ".".concat(DX_MENU_ITEM_WRAPPER_CLASS)
    };
    _proto._hoverStartHandler = function(e) {
        var $itemElement = this._getItemElementByEventArgs(e);
        if (!$itemElement || this._isItemDisabled($itemElement)) {
            return
        }
        e.stopPropagation();
        if ("onHover" === this._getShowSubmenuMode()) {
            clearTimeout(this._showSubmenusTimeout);
            this._showSubmenusTimeout = setTimeout(this._showSubmenu.bind(this, $itemElement), this._getSubmenuDelay("show"))
        }
    };
    _proto._getAvailableItems = function($itemElements) {
        return _HierarchicalCollecti.prototype._getAvailableItems.call(this, $itemElements).filter(function() {
            return "hidden" !== (0, _renderer.default)(this).css("visibility")
        })
    };
    _proto._isItemDisabled = function($item) {
        return this._disabledGetter($item.data(this._itemDataKey()))
    };
    _proto._showSubmenu = function($itemElement) {
        this._addExpandedClass($itemElement)
    };
    _proto._addExpandedClass = function(itemElement) {
        (0, _renderer.default)(itemElement).addClass(DX_MENU_ITEM_EXPANDED_CLASS)
    };
    _proto._getSubmenuDelay = function(action) {
        var _this$option = this.option("showSubmenuMode"),
            delay = _this$option.delay;
        if (!(0, _type.isDefined)(delay)) {
            return DEFAULT_DELAY[action]
        }
        return (0, _type.isObject)(delay) ? delay[action] : delay
    };
    _proto._getItemElementByEventArgs = function(eventArgs) {
        var $target = (0, _renderer.default)(eventArgs.target);
        if ($target.hasClass(this._itemClass()) || $target.get(0) === eventArgs.currentTarget) {
            return $target
        }
        while (!$target.hasClass(this._itemClass())) {
            $target = $target.parent();
            if ($target.hasClass("dx-submenu")) {
                return null
            }
        }
        return $target
    };
    _proto._hoverEndHandler = function() {
        clearTimeout(this._showSubmenusTimeout)
    };
    _proto._hasSubmenu = function(node) {
        return node && node.internalFields.childrenKeys.length
    };
    _proto._renderContentImpl = function() {
        this._renderItems(this._dataAdapter.getRootNodes())
    };
    _proto._renderItems = function(nodes, submenuContainer) {
        var _this2 = this;
        if (nodes.length) {
            this.hasIcons = false;
            var $nodeContainer = this._renderContainer(this.$element(), submenuContainer);
            var firstVisibleIndex = -1;
            var nextGroupFirstIndex = -1;
            (0, _iterator.each)(nodes, function(index, node) {
                var isVisibleNode = false !== node.visible;
                if (isVisibleNode && firstVisibleIndex < 0) {
                    firstVisibleIndex = index
                }
                var isBeginGroup = firstVisibleIndex < index && (node.beginGroup || index === nextGroupFirstIndex);
                if (isBeginGroup) {
                    nextGroupFirstIndex = isVisibleNode ? index : index + 1
                }
                if (index === nextGroupFirstIndex && firstVisibleIndex < index) {
                    _this2._renderSeparator($nodeContainer)
                }
                _this2._renderItem(index, node, $nodeContainer)
            });
            if (!this.hasIcons) {
                $nodeContainer.addClass(DX_MENU_NO_ICONS_CLASS)
            }
        }
    };
    _proto._renderContainer = function($wrapper) {
        var $container = (0, _renderer.default)("<ul>");
        this.setAria("role", "none", $container);
        return $container.appendTo($wrapper).addClass(DX_MENU_ITEMS_CONTAINER_CLASS)
    };
    _proto._createDOMElement = function($nodeContainer) {
        var $node = (0, _renderer.default)("<li>");
        this.setAria("role", "none", $node);
        return $node.appendTo($nodeContainer).addClass(DX_MENU_ITEM_WRAPPER_CLASS)
    };
    _proto._renderItem = function(index, node, $nodeContainer, $nodeElement) {
        var items = this.option("items");
        var $node = $nodeElement || this._createDOMElement($nodeContainer);
        if (items[index + 1] && items[index + 1].beginGroup) {
            $node.addClass(DX_MENU_ITEM_LAST_GROUP_ITEM)
        }
        var $itemFrame = _HierarchicalCollecti.prototype._renderItem.call(this, index, node.internalFields.item, $node);
        if (node.internalFields.item === this.option("selectedItem")) {
            $itemFrame.addClass(DX_MENU_SELECTED_ITEM_CLASS)
        }
        $itemFrame.attr("tabIndex", -1);
        if (this._hasSubmenu(node)) {
            this.setAria("haspopup", "true", $itemFrame)
        }
    };
    _proto._renderItemFrame = function(index, itemData, $itemContainer) {
        var $itemFrame = $itemContainer.children(".".concat(ITEM_CLASS));
        return $itemFrame.length ? $itemFrame : _HierarchicalCollecti.prototype._renderItemFrame.apply(this, arguments)
    };
    _proto._refreshItem = function($item, item) {
        var node = this._dataAdapter.getNodeByItem(item);
        var index = $item.data(this._itemIndexKey());
        var $nodeContainer = $item.closest("ul");
        var $nodeElement = $item.closest("li");
        this._renderItem(index, node, $nodeContainer, $nodeElement)
    };
    _proto._addContentClasses = function(itemData, $itemFrame) {
        var hasText = itemData.text ? !!itemData.text.length : false;
        var hasIcon = !!itemData.icon;
        var hasSubmenu = itemData.items ? !!itemData.items.length : false;
        $itemFrame.toggleClass(DX_ITEM_HAS_TEXT, hasText);
        $itemFrame.toggleClass(DX_ITEM_HAS_ICON, hasIcon);
        if (!this.hasIcons) {
            this.hasIcons = hasIcon
        }
        $itemFrame.toggleClass(DX_ITEM_HAS_SUBMENU, hasSubmenu)
    };
    _proto._getItemContent = function($itemFrame) {
        var $itemContent = _HierarchicalCollecti.prototype._getItemContent.call(this, $itemFrame);
        if (!$itemContent.length) {
            $itemContent = $itemFrame.children(".".concat(DX_ITEM_CONTENT_CLASS))
        }
        return $itemContent
    };
    _proto._postprocessRenderItem = function(args) {
        var $itemElement = (0, _renderer.default)(args.itemElement);
        var selectedIndex = this._dataAdapter.getSelectedNodesKeys();
        if (!selectedIndex.length || !this._selectedGetter(args.itemData) || !this._isItemSelectable(args.itemData)) {
            this._setAriaSelected($itemElement, "false");
            return
        }
        var node = this._dataAdapter.getNodeByItem(args.itemData);
        if (node.internalFields.key === selectedIndex[0]) {
            $itemElement.addClass(this._selectedItemClass());
            this._setAriaSelected($itemElement, "true")
        } else {
            this._setAriaSelected($itemElement, "false")
        }
    };
    _proto._isItemSelectable = function(item) {
        return false !== item.selectable
    };
    _proto._renderSeparator = function($itemsContainer) {
        (0, _renderer.default)("<li>").appendTo($itemsContainer).addClass(DX_MENU_SEPARATOR_CLASS)
    };
    _proto._itemClickHandler = function(e) {
        if (e._skipHandling) {
            return
        }
        var itemClickActionHandler = this._createAction(this._updateSubmenuVisibilityOnClick.bind(this));
        this._itemDXEventHandler(e, "onItemClick", {}, {
            afterExecute: itemClickActionHandler.bind(this)
        });
        e._skipHandling = true
    };
    _proto._updateSubmenuVisibilityOnClick = function(actionArgs) {
        this._updateSelectedItemOnClick(actionArgs);
        if ("onClick" === this._getShowSubmenuMode()) {
            this._addExpandedClass(actionArgs.args[0].itemElement)
        }
    };
    _proto._updateSelectedItemOnClick = function(actionArgs) {
        var args = actionArgs.args ? actionArgs.args[0] : actionArgs;
        if (!this._isItemSelectionAllowed(args.itemData)) {
            return
        }
        var selectedItemKey = this._dataAdapter.getSelectedNodesKeys();
        var selectedNode = selectedItemKey.length && this._dataAdapter.getNodeByKey(selectedItemKey[0]);
        if (selectedNode) {
            this._toggleItemSelection(selectedNode, false)
        }
        if (!selectedNode || selectedNode.internalFields.item !== args.itemData) {
            this.selectItem(args.itemData)
        } else {
            this._fireSelectionChangeEvent(null, this.option("selectedItem"));
            this._setOptionWithoutOptionChange("selectedItem", null)
        }
    };
    _proto._isItemSelectionAllowed = function(item) {
        var isSelectionByClickEnabled = this._isSelectionEnabled() && this.option("selectByClick");
        return !this._isContainerEmpty() && isSelectionByClickEnabled && this._isItemSelectable(item) && !this._itemsGetter(item)
    };
    _proto._isContainerEmpty = function() {
        return this._itemContainer().is(":empty")
    };
    _proto._syncSelectionOptions = function() {
        return (0, _common.asyncNoop)()
    };
    _proto._optionChanged = function(args) {
        switch (args.name) {
            case "showSubmenuMode":
                break;
            case "selectedItem":
                var node = this._dataAdapter.getNodeByItem(args.value);
                var selectedKey = this._dataAdapter.getSelectedNodesKeys()[0];
                if (node && node.internalFields.key !== selectedKey) {
                    if (false === node.selectable) {
                        break
                    }
                    if (selectedKey) {
                        this._toggleItemSelection(this._dataAdapter.getNodeByKey(selectedKey), false)
                    }
                    this._toggleItemSelection(node, true);
                    this._updateSelectedItems()
                }
                break;
            case "cssClass":
            case "position":
            case "selectByClick":
            case "animation":
            case "useInkRipple":
                this._invalidate();
                break;
            default:
                _HierarchicalCollecti.prototype._optionChanged.call(this, args)
        }
    };
    _proto._toggleItemSelection = function(node, value) {
        var itemElement = this._getElementByItem(node.internalFields.item);
        itemElement && (0, _renderer.default)(itemElement).toggleClass(DX_MENU_SELECTED_ITEM_CLASS);
        this._dataAdapter.toggleSelection(node.internalFields.key, value)
    };
    _proto._getElementByItem = function(itemData) {
        var _this3 = this;
        var result;
        (0, _iterator.each)(this._itemElements(), function(_, itemElement) {
            if ((0, _renderer.default)(itemElement).data(_this3._itemDataKey()) !== itemData) {
                return true
            }
            result = itemElement;
            return false
        });
        return result
    };
    _proto._updateSelectedItems = function(oldSelection, newSelection) {
        if (oldSelection || newSelection) {
            this._fireSelectionChangeEvent(newSelection, oldSelection)
        }
    };
    _proto._fireSelectionChangeEvent = function(addedSelection, removedSelection) {
        this._createActionByOption("onSelectionChanged", {
            excludeValidators: ["disabled", "readOnly"]
        })({
            addedItems: [addedSelection],
            removedItems: [removedSelection]
        })
    };
    _proto.selectItem = function(itemElement) {
        var itemData = itemElement.nodeType ? this._getItemData(itemElement) : itemElement;
        var selectedKey = this._dataAdapter.getSelectedNodesKeys()[0];
        var selectedItem = this.option("selectedItem");
        var node = this._dataAdapter.getNodeByItem(itemData);
        if (node.internalFields.key !== selectedKey) {
            if (selectedKey) {
                this._toggleItemSelection(this._dataAdapter.getNodeByKey(selectedKey), false)
            }
            this._toggleItemSelection(node, true);
            this._updateSelectedItems(selectedItem, itemData);
            this._setOptionWithoutOptionChange("selectedItem", itemData)
        }
    };
    _proto.unselectItem = function(itemElement) {
        var itemData = itemElement.nodeType ? this._getItemData(itemElement) : itemElement;
        var node = this._dataAdapter.getNodeByItem(itemData);
        var selectedItem = this.option("selectedItem");
        if (node.internalFields.selected) {
            this._toggleItemSelection(node, false);
            this._updateSelectedItems(selectedItem, null);
            this._setOptionWithoutOptionChange("selectedItem", null)
        }
    };
    return MenuBase
}(_ui.default);
MenuBase.ItemClass = _item.default;
var _default = MenuBase;
exports.default = _default;
module.exports = exports.default;
