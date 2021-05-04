/**
 * DevExtreme (ui/file_manager/ui.file_manager.item_list.thumbnails.js)
 * Version: 20.2.6
 * Build date: Tue Mar 16 2021
 *
 * Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
exports.default = void 0;
var _renderer = _interopRequireDefault(require("../../core/renderer"));
var _extend = require("../../core/utils/extend");
var _deferred = require("../../core/utils/deferred");
var _events_engine = _interopRequireDefault(require("../../events/core/events_engine"));
var _index = require("../../events/utils/index");
var _contextmenu = require("../../events/contextmenu");
var _uiFile_manager = require("./ui.file_manager.common");
var _message = _interopRequireDefault(require("../../localization/message"));
var _uiFile_managerItems_listThumbnails = _interopRequireDefault(require("./ui.file_manager.items_list.thumbnails.list_box"));
var _uiFile_manager2 = _interopRequireDefault(require("./ui.file_manager.item_list"));

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
var FILE_MANAGER_THUMBNAILS_ITEM_LIST_CLASS = "dx-filemanager-thumbnails";
var FILE_MANAGER_THUMBNAILS_ITEM_CLASS = "dx-filemanager-thumbnails-item";
var FILE_MANAGER_THUMBNAILS_ITEM_THUMBNAIL_CLASS = "dx-filemanager-thumbnails-item-thumbnail";
var FILE_MANAGER_THUMBNAILS_EVENT_NAMESPACE = "dxFileManager_thumbnails";
var FileManagerThumbnailsItemList = function(_FileManagerItemListB) {
    _inheritsLoose(FileManagerThumbnailsItemList, _FileManagerItemListB);

    function FileManagerThumbnailsItemList() {
        return _FileManagerItemListB.apply(this, arguments) || this
    }
    var _proto = FileManagerThumbnailsItemList.prototype;
    _proto._initMarkup = function() {
        _FileManagerItemListB.prototype._initMarkup.call(this);
        this.$element().addClass(FILE_MANAGER_THUMBNAILS_ITEM_LIST_CLASS);
        var contextMenuEvent = (0, _index.addNamespace)(_contextmenu.name, FILE_MANAGER_THUMBNAILS_EVENT_NAMESPACE);
        _events_engine.default.on(this.$element(), contextMenuEvent, this._onContextMenu.bind(this));
        this._createItemList()
    };
    _proto._createItemList = function() {
        var _this = this;
        var selectionMode = this._isMultipleSelectionMode() ? "multiple" : "single";
        var $itemListContainer = (0, _renderer.default)("<div>").appendTo(this.$element());
        this._itemList = this._createComponent($itemListContainer, _uiFile_managerItems_listThumbnails.default, {
            dataSource: this._createDataSource(),
            selectionMode: selectionMode,
            selectedItemKeys: this.option("selectedItemKeys"),
            focusedItemKey: this.option("focusedItemKey"),
            activeStateEnabled: true,
            hoverStateEnabled: true,
            loopItemFocus: false,
            focusStateEnabled: true,
            onItemEnterKeyPressed: this._tryOpen.bind(this),
            itemThumbnailTemplate: this._getItemThumbnailContainer.bind(this),
            getTooltipText: this._getTooltipText.bind(this),
            onSelectionChanged: this._onItemListSelectionChanged.bind(this),
            onFocusedItemChanged: this._onItemListFocusedItemChanged.bind(this),
            onContentReady: function() {
                var _this$_refreshDeferre;
                return null === (_this$_refreshDeferre = _this._refreshDeferred) || void 0 === _this$_refreshDeferre ? void 0 : _this$_refreshDeferre.resolve()
            }
        })
    };
    _proto._onContextMenu = function(e) {
        e.preventDefault();
        if (!this._isDesktop()) {
            return
        }
        var items = null;
        var targetItemElement = (0, _renderer.default)(e.target).closest(this._getItemSelector());
        var targetItem = null;
        if (targetItemElement.length > 0) {
            targetItem = this._itemList.getItemByItemElement(targetItemElement);
            this._itemList.selectItem(targetItem);
            items = this._getFileItemsForContextMenu(targetItem)
        }
        this._showContextMenu(items, e.target, e, targetItem)
    };
    _proto._getItemThumbnailCssClass = function() {
        return FILE_MANAGER_THUMBNAILS_ITEM_THUMBNAIL_CLASS
    };
    _proto._getItemSelector = function() {
        return ".".concat(FILE_MANAGER_THUMBNAILS_ITEM_CLASS)
    };
    _proto._getTooltipText = function(fileItemInfo) {
        var item = fileItemInfo.fileItem;
        if (item.tooltipText) {
            return item.tooltipText
        }
        var text = "".concat(item.name, "\r\n");
        if (!item.isDirectory) {
            text += "".concat(_message.default.format("dxFileManager-listThumbnailsTooltipTextSize"), ": ").concat((0, _uiFile_manager.getDisplayFileSize)(item.size), "\r\n")
        }
        text += "".concat(_message.default.format("dxFileManager-listThumbnailsTooltipTextDateModified"), ": ").concat(item.dateModified);
        return text
    };
    _proto._onItemDblClick = function(e) {
        var $item = (0, _renderer.default)(e.currentTarget);
        var item = this._itemList.getItemByItemElement($item);
        this._tryOpen(item)
    };
    _proto._tryOpen = function(item) {
        if (item) {
            this._raiseSelectedItemOpened(item)
        }
    };
    _proto._getItemsInternal = function() {
        return _FileManagerItemListB.prototype._getItemsInternal.call(this).then(function(items) {
            var deferred = new _deferred.Deferred;
            setTimeout(function() {
                return deferred.resolve(items)
            });
            return deferred.promise()
        })
    };
    _proto._disableDragging = function() {
        return false
    };
    _proto._getDefaultOptions = function() {
        return (0, _extend.extend)(_FileManagerItemListB.prototype._getDefaultOptions.call(this), {
            focusStateEnabled: true
        })
    };
    _proto._onItemListSelectionChanged = function(_ref) {
        var addedItemKeys = _ref.addedItemKeys,
            removedItemKeys = _ref.removedItemKeys;
        var selectedItemInfos = this.getSelectedItems();
        var selectedItems = selectedItemInfos.map(function(itemInfo) {
            return itemInfo.fileItem
        });
        var selectedItemKeys = selectedItems.map(function(item) {
            return item.key
        });
        this._tryRaiseSelectionChanged({
            selectedItemInfos: selectedItemInfos,
            selectedItems: selectedItems,
            selectedItemKeys: selectedItemKeys,
            currentSelectedItemKeys: addedItemKeys,
            currentDeselectedItemKeys: removedItemKeys
        })
    };
    _proto._onItemListFocusedItemChanged = function(_ref2) {
        var item = _ref2.item,
            itemElement = _ref2.itemElement;
        if (!this._isMultipleSelectionMode()) {
            this._selectItemSingleSelection(item)
        }
        var fileSystemItem = (null === item || void 0 === item ? void 0 : item.fileItem) || null;
        this._onFocusedItemChanged({
            item: fileSystemItem,
            itemKey: null === fileSystemItem || void 0 === fileSystemItem ? void 0 : fileSystemItem.key,
            itemElement: itemElement || void 0
        })
    };
    _proto._setSelectedItemKeys = function(itemKeys) {
        this._itemList.option("selectedItemKeys", itemKeys)
    };
    _proto._setFocusedItemKey = function(itemKey) {
        this._itemList.option("focusedItemKey", itemKey)
    };
    _proto.refresh = function(options) {
        var actualOptions = {
            dataSource: this._createDataSource()
        };
        if (options && Object.prototype.hasOwnProperty.call(options, "focusedItemKey")) {
            actualOptions.focusedItemKey = options.focusedItemKey
        }
        this._itemList.option(actualOptions);
        this._refreshDeferred = new _deferred.Deferred;
        return this._refreshDeferred.promise()
    };
    _proto._deselectItem = function(item) {
        var itemElement = this._itemList.getItemElementByItem(item);
        this._itemList.unselectItem(itemElement)
    };
    _proto._selectItemSingleSelection = function(item) {
        if (item) {
            this._itemList.selectItem(item)
        } else {
            this._itemList.clearSelection()
        }
    };
    _proto.clearSelection = function() {
        this._itemList.clearSelection()
    };
    _proto.getSelectedItems = function() {
        return this._itemList.getSelectedItems()
    };
    return FileManagerThumbnailsItemList
}(_uiFile_manager2.default);
var _default = FileManagerThumbnailsItemList;
exports.default = _default;
module.exports = exports.default;
