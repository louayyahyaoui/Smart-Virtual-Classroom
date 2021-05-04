/**
 * DevExtreme (ui/list/ui.list.edit.js)
 * Version: 20.2.6
 * Build date: Tue Mar 16 2021
 *
 * Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
exports.default = void 0;
var _renderer = _interopRequireDefault(require("../../core/renderer"));
var _index = require("../../events/utils/index");
var _extend = require("../../core/utils/extend");
var _uiListEditStrategy = _interopRequireDefault(require("./ui.list.edit.strategy.grouped"));
var _message = _interopRequireDefault(require("../../localization/message"));
var _uiListEdit = _interopRequireDefault(require("./ui.list.edit.provider"));
var _uiList = require("./ui.list.base");

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        "default": obj
    }
}
var LIST_ITEM_SELECTED_CLASS = "dx-list-item-selected";
var LIST_ITEM_RESPONSE_WAIT_CLASS = "dx-list-item-response-wait";
var ListEdit = _uiList.ListBase.inherit({
    _supportedKeys: function() {
        var _this = this;
        var that = this;
        var parent = this.callBase();
        var deleteFocusedItem = function(e) {
            if (that.option("allowItemDeleting")) {
                e.preventDefault();
                that.deleteItem(that.option("focusedElement"))
            }
        };
        var moveFocusedItem = function(e, moveUp) {
            var editStrategy = _this._editStrategy;
            var focusedElement = _this.option("focusedElement");
            var focusedItemIndex = editStrategy.getNormalizedIndex(focusedElement);
            var isLastIndexFocused = focusedItemIndex === _this._getLastItemIndex();
            if (isLastIndexFocused && _this._isDataSourceLoading()) {
                return
            }
            if (e.shiftKey && that.option("itemDragging.allowReordering")) {
                var nextItemIndex = focusedItemIndex + (moveUp ? -1 : 1);
                var $nextItem = editStrategy.getItemElement(nextItemIndex);
                _this.reorderItem(focusedElement, $nextItem);
                _this.scrollToItem(focusedElement);
                e.preventDefault()
            } else {
                var editProvider = _this._editProvider;
                var isInternalMoving = editProvider.handleKeyboardEvents(focusedItemIndex, moveUp);
                if (!isInternalMoving) {
                    moveUp ? parent.upArrow(e) : parent.downArrow(e)
                }
            }
        };
        var enter = function(e) {
            if (!this._editProvider.handleEnterPressing(e)) {
                parent.enter.apply(this, arguments)
            }
        };
        var space = function(e) {
            if (!this._editProvider.handleEnterPressing(e)) {
                parent.space.apply(this, arguments)
            }
        };
        return (0, _extend.extend)({}, parent, {
            del: deleteFocusedItem,
            upArrow: function(e) {
                return moveFocusedItem(e, true)
            },
            downArrow: function(e) {
                return moveFocusedItem(e)
            },
            enter: enter,
            space: space
        })
    },
    _updateSelection: function() {
        this._editProvider.afterItemsRendered();
        this.callBase()
    },
    _getLastItemIndex: function() {
        return this._itemElements().length - 1
    },
    _refreshItemElements: function() {
        this.callBase();
        var excludedSelectors = this._editProvider.getExcludedItemSelectors();
        if (excludedSelectors.length) {
            this._itemElementsCache = this._itemElementsCache.not(excludedSelectors)
        }
    },
    _isItemStrictEquals: function(item1, item2) {
        var privateKey = item1 && item1.__dx_key__;
        if (privateKey && !this.key() && this._selection.isItemSelected(privateKey)) {
            return false
        }
        return this.callBase(item1, item2)
    },
    _getDefaultOptions: function() {
        return (0, _extend.extend)(this.callBase(), {
            showSelectionControls: false,
            selectionMode: "none",
            selectAllMode: "page",
            onSelectAllValueChanged: null,
            selectAllText: _message.default.format("dxList-selectAll"),
            menuItems: [],
            menuMode: "context",
            allowItemDeleting: false,
            itemDeleteMode: "static",
            itemDragging: {}
        })
    },
    _defaultOptionsRules: function() {
        return this.callBase().concat([{
            device: function(_device) {
                return "ios" === _device.platform
            },
            options: {
                menuMode: "slide",
                itemDeleteMode: "slideItem"
            }
        }, {
            device: {
                platform: "android"
            },
            options: {
                itemDeleteMode: "swipe"
            }
        }])
    },
    _init: function() {
        this.callBase();
        this._initEditProvider()
    },
    _initDataSource: function() {
        this.callBase();
        if (!this._isPageSelectAll()) {
            this._dataSource && this._dataSource.requireTotalCount(true)
        }
    },
    _isPageSelectAll: function() {
        return "page" === this.option("selectAllMode")
    },
    _initEditProvider: function() {
        this._editProvider = new _uiListEdit.default(this)
    },
    _disposeEditProvider: function() {
        if (this._editProvider) {
            this._editProvider.dispose()
        }
    },
    _refreshEditProvider: function() {
        this._disposeEditProvider();
        this._initEditProvider()
    },
    _initEditStrategy: function() {
        if (this.option("grouped")) {
            this._editStrategy = new _uiListEditStrategy.default(this)
        } else {
            this.callBase()
        }
    },
    _initMarkup: function() {
        this._refreshEditProvider();
        this.callBase()
    },
    _renderItems: function() {
        this.callBase.apply(this, arguments);
        this._editProvider.afterItemsRendered()
    },
    _selectedItemClass: function() {
        return LIST_ITEM_SELECTED_CLASS
    },
    _itemResponseWaitClass: function() {
        return LIST_ITEM_RESPONSE_WAIT_CLASS
    },
    _itemClickHandler: function(e) {
        var $itemElement = (0, _renderer.default)(e.currentTarget);
        if ($itemElement.is(".dx-state-disabled, .dx-state-disabled *")) {
            return
        }
        var handledByEditProvider = this._editProvider.handleClick($itemElement, e);
        if (handledByEditProvider) {
            return
        }
        this._saveSelectionChangeEvent(e);
        this.callBase.apply(this, arguments)
    },
    _shouldFireContextMenuEvent: function() {
        return this.callBase.apply(this, arguments) || this._editProvider.contextMenuHandlerExists()
    },
    _itemHoldHandler: function(e) {
        var $itemElement = (0, _renderer.default)(e.currentTarget);
        if ($itemElement.is(".dx-state-disabled, .dx-state-disabled *")) {
            return
        }
        var handledByEditProvider = (0, _index.isTouchEvent)(e) && this._editProvider.handleContextMenu($itemElement, e);
        if (handledByEditProvider) {
            e.handledByEditProvider = true;
            return
        }
        this.callBase.apply(this, arguments)
    },
    _itemContextMenuHandler: function(e) {
        var $itemElement = (0, _renderer.default)(e.currentTarget);
        if ($itemElement.is(".dx-state-disabled, .dx-state-disabled *")) {
            return
        }
        var handledByEditProvider = !e.handledByEditProvider && this._editProvider.handleContextMenu($itemElement, e);
        if (handledByEditProvider) {
            e.preventDefault();
            return
        }
        this.callBase.apply(this, arguments)
    },
    _postprocessRenderItem: function(args) {
        this.callBase.apply(this, arguments);
        this._editProvider.modifyItemElement(args)
    },
    _clean: function() {
        this._disposeEditProvider();
        this.callBase()
    },
    focusListItem: function(index) {
        var $item = this._editStrategy.getItemElement(index);
        this.option("focusedElement", $item);
        this.focus();
        this.scrollToItem(this.option("focusedElement"))
    },
    _optionChanged: function(args) {
        switch (args.name) {
            case "selectAllMode":
                this._initDataSource();
                this._dataSource.pageIndex(0);
                this._dataSource.load();
                break;
            case "grouped":
                this._clearSelectedItems();
                delete this._renderingGroupIndex;
                this._initEditStrategy();
                this.callBase(args);
                break;
            case "showSelectionControls":
            case "menuItems":
            case "menuMode":
            case "allowItemDeleting":
            case "itemDeleteMode":
            case "itemDragging":
            case "selectAllText":
                this._invalidate();
                break;
            case "onSelectAllValueChanged":
                break;
            default:
                this.callBase(args)
        }
    },
    selectAll: function() {
        return this._selection.selectAll(this._isPageSelectAll())
    },
    unselectAll: function() {
        return this._selection.deselectAll(this._isPageSelectAll())
    },
    isSelectAll: function() {
        return this._selection.getSelectAllState(this._isPageSelectAll())
    },
    getFlatIndexByItemElement: function(itemElement) {
        return this._itemElements().index(itemElement)
    },
    getItemElementByFlatIndex: function(flatIndex) {
        var $itemElements = this._itemElements();
        if (flatIndex < 0 || flatIndex >= $itemElements.length) {
            return (0, _renderer.default)()
        }
        return $itemElements.eq(flatIndex)
    },
    getItemByIndex: function(index) {
        return this._editStrategy.getItemDataByIndex(index)
    }
});
var _default = ListEdit;
exports.default = _default;
module.exports = exports.default;
