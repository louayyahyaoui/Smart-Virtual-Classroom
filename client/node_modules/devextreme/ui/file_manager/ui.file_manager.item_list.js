/**
 * DevExtreme (ui/file_manager/ui.file_manager.item_list.js)
 * Version: 20.2.6
 * Build date: Tue Mar 16 2021
 *
 * Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
exports.default = void 0;
var _extend = require("../../core/utils/extend");
var _deferred = require("../../core/utils/deferred");
var _double_click = require("../../events/double_click");
var _index = require("../../events/utils/index");
var _events_engine = _interopRequireDefault(require("../../events/core/events_engine"));
var _icon = require("../../core/utils/icon");
var _devices = _interopRequireDefault(require("../../core/devices"));
var _custom_store = _interopRequireDefault(require("../../data/custom_store"));
var _ui = _interopRequireDefault(require("../widget/ui.widget"));

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        "default": obj
    }
}

function _toConsumableArray(arr) {
    return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread()
}

function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
}

function _unsupportedIterableToArray(o, minLen) {
    if (!o) {
        return
    }
    if ("string" === typeof o) {
        return _arrayLikeToArray(o, minLen)
    }
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if ("Object" === n && o.constructor) {
        n = o.constructor.name
    }
    if ("Map" === n || "Set" === n) {
        return Array.from(o)
    }
    if ("Arguments" === n || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) {
        return _arrayLikeToArray(o, minLen)
    }
}

function _iterableToArray(iter) {
    if ("undefined" !== typeof Symbol && Symbol.iterator in Object(iter)) {
        return Array.from(iter)
    }
}

function _arrayWithoutHoles(arr) {
    if (Array.isArray(arr)) {
        return _arrayLikeToArray(arr)
    }
}

function _arrayLikeToArray(arr, len) {
    if (null == len || len > arr.length) {
        len = arr.length
    }
    for (var i = 0, arr2 = new Array(len); i < len; i++) {
        arr2[i] = arr[i]
    }
    return arr2
}

function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) {
            descriptor.writable = true
        }
        Object.defineProperty(target, descriptor.key, descriptor)
    }
}

function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) {
        _defineProperties(Constructor.prototype, protoProps)
    }
    if (staticProps) {
        _defineProperties(Constructor, staticProps)
    }
    return Constructor
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
var FILE_MANAGER_FILES_VIEW_CLASS = "dx-filemanager-files-view";
var FILE_MANAGER_ITEM_LIST_ITEM_OPEN_EVENT_NAMESPACE = "dxFileManager_open";
var FileManagerItemListBase = function(_Widget) {
    _inheritsLoose(FileManagerItemListBase, _Widget);

    function FileManagerItemListBase() {
        return _Widget.apply(this, arguments) || this
    }
    var _proto = FileManagerItemListBase.prototype;
    _proto._init = function() {
        this._initActions();
        this._lockFocusedItemProcessing = false;
        this._focusedItemKey = this.option("focusedItemKey");
        _Widget.prototype._init.call(this)
    };
    _proto._initMarkup = function() {
        this.$element().addClass(FILE_MANAGER_FILES_VIEW_CLASS);
        var dblClickEventName = (0, _index.addNamespace)(_double_click.name, FILE_MANAGER_ITEM_LIST_ITEM_OPEN_EVENT_NAMESPACE);
        _events_engine.default.on(this.$element(), dblClickEventName, this._getItemSelector(), this._onItemDblClick.bind(this));
        _Widget.prototype._initMarkup.call(this)
    };
    _proto._initActions = function() {
        this._actions = {
            onError: this._createActionByOption("onError"),
            onSelectionChanged: this._createActionByOption("onSelectionChanged"),
            onFocusedItemChanged: this._createActionByOption("onFocusedItemChanged"),
            onSelectedItemOpened: this._createActionByOption("onSelectedItemOpened"),
            onContextMenuShowing: this._createActionByOption("onContextMenuShowing")
        }
    };
    _proto._getDefaultOptions = function() {
        return (0, _extend.extend)(_Widget.prototype._getDefaultOptions.call(this), {
            selectionMode: "single",
            selectedItemKeys: [],
            focusedItemKey: void 0,
            contextMenu: null,
            getItems: null,
            getItemThumbnail: null,
            onError: null,
            onSelectionChanged: null,
            onFocusedItemChanged: null,
            onSelectedItemOpened: null,
            onContextMenuShowing: null
        })
    };
    _proto._optionChanged = function(args) {
        var name = args.name;
        switch (name) {
            case "selectionMode":
            case "contextMenu":
            case "getItems":
            case "getItemThumbnail":
                this.repaint();
                break;
            case "selectedItemKeys":
                this._setSelectedItemKeys(args.value);
                break;
            case "focusedItemKey":
                if (!this._lockFocusedItemProcessing) {
                    this._setFocusedItemKey(args.value)
                }
                break;
            case "onError":
            case "onSelectedItemOpened":
            case "onSelectionChanged":
            case "onFocusedItemChanged":
            case "onContextMenuShowing":
                this._actions[name] = this._createActionByOption(name);
                break;
            default:
                _Widget.prototype._optionChanged.call(this, args)
        }
    };
    _proto._getItems = function() {
        var _this = this;
        return this._getItemsInternal().done(function(itemInfos) {
            _this._itemCount = itemInfos.length;
            var parentDirectoryItem = _this._findParentDirectoryItem(itemInfos);
            _this._hasParentDirectoryItem = !!parentDirectoryItem;
            _this._parentDirectoryItemKey = parentDirectoryItem ? parentDirectoryItem.fileItem.key : null
        })
    };
    _proto._getItemsInternal = function() {
        var itemsGetter = this.option("getItems");
        var itemsResult = itemsGetter ? itemsGetter() : [];
        return (0, _deferred.when)(itemsResult)
    };
    _proto._raiseOnError = function(error) {
        this._actions.onError({
            error: error
        })
    };
    _proto._raiseSelectionChanged = function(args) {
        this._actions.onSelectionChanged(args)
    };
    _proto._raiseFocusedItemChanged = function(args) {
        this._actions.onFocusedItemChanged(args)
    };
    _proto._raiseSelectedItemOpened = function(fileItemInfo) {
        this._actions.onSelectedItemOpened({
            fileItemInfo: fileItemInfo
        })
    };
    _proto._raiseContextMenuShowing = function() {
        this._actions.onContextMenuShowing()
    };
    _proto._tryRaiseSelectionChanged = function(_ref) {
        var _this2 = this;
        var selectedItemInfos = _ref.selectedItemInfos,
            selectedItems = _ref.selectedItems,
            selectedItemKeys = _ref.selectedItemKeys,
            currentSelectedItemKeys = _ref.currentSelectedItemKeys,
            currentDeselectedItemKeys = _ref.currentDeselectedItemKeys;
        var parentDirectoryItem = this._findParentDirectoryItem(this.getSelectedItems());
        if (parentDirectoryItem) {
            this._deselectItem(parentDirectoryItem)
        }
        var raiseEvent = !this._hasParentDirectoryItem;
        raiseEvent = raiseEvent || this._hasValidKeys(currentSelectedItemKeys) || this._hasValidKeys(currentDeselectedItemKeys);
        if (raiseEvent) {
            selectedItemInfos = this._filterOutItemByPredicate(selectedItemInfos, function(item) {
                return item.fileItem.key === _this2._parentDirectoryItemKey
            });
            selectedItems = this._filterOutParentDirectory(selectedItems);
            selectedItemKeys = this._filterOutParentDirectoryKey(selectedItemKeys, true);
            currentSelectedItemKeys = this._filterOutParentDirectoryKey(currentSelectedItemKeys, true);
            currentDeselectedItemKeys = this._filterOutParentDirectoryKey(currentDeselectedItemKeys, true);
            this._raiseSelectionChanged({
                selectedItemInfos: selectedItemInfos,
                selectedItems: selectedItems,
                selectedItemKeys: selectedItemKeys,
                currentSelectedItemKeys: currentSelectedItemKeys,
                currentDeselectedItemKeys: currentDeselectedItemKeys
            })
        }
    };
    _proto._onFocusedItemChanged = function(args) {
        if (this._focusedItemKey === args.itemKey) {
            return
        }
        this._focusedItemKey = args.itemKey;
        this._lockFocusedItemProcessing = true;
        this.option("focusedItemKey", args.itemKey);
        this._lockFocusedItemProcessing = false;
        this._raiseFocusedItemChanged(args)
    };
    _proto._getItemThumbnail = function(fileInfo) {
        var itemThumbnailGetter = this.option("getItemThumbnail");
        return itemThumbnailGetter ? itemThumbnailGetter(fileInfo) : {
            thumbnail: ""
        }
    };
    _proto._getItemThumbnailContainer = function(fileInfo) {
        var _this$_getItemThumbna = this._getItemThumbnail(fileInfo),
            thumbnail = _this$_getItemThumbna.thumbnail,
            cssClass = _this$_getItemThumbna.cssClass;
        var $itemThumbnail = (0, _icon.getImageContainer)(thumbnail).addClass(this._getItemThumbnailCssClass());
        if (cssClass) {
            $itemThumbnail.addClass(cssClass)
        }
        return $itemThumbnail
    };
    _proto._getItemThumbnailCssClass = function() {
        return ""
    };
    _proto._getItemSelector = function() {};
    _proto._onItemDblClick = function(e) {};
    _proto._isDesktop = function() {
        return "desktop" === _devices.default.real().deviceType
    };
    _proto._showContextMenu = function(items, element, offset, targetFileItem) {
        this._contextMenu.showAt(items, element, offset, targetFileItem)
    };
    _proto._findParentDirectoryItem = function(itemInfos) {
        for (var i = 0; i < itemInfos.length; i++) {
            var itemInfo = itemInfos[i];
            if (this._isParentDirectoryItem(itemInfo)) {
                return itemInfo
            }
        }
        return null
    };
    _proto._getFileItemsForContextMenu = function(fileItem) {
        var result = this.getSelectedItems();
        if (this._isParentDirectoryItem(fileItem)) {
            result.push(fileItem)
        }
        return result
    };
    _proto._isParentDirectoryItem = function(itemInfo) {
        return itemInfo.fileItem.isParentFolder
    };
    _proto._hasValidKeys = function(keys) {
        return keys.length > 1 || 1 === keys.length && keys[0] !== this._parentDirectoryItemKey
    };
    _proto._filterOutParentDirectory = function(array, createNewArray) {
        var _this3 = this;
        return this._filterOutItemByPredicate(array, function(item) {
            return item.key === _this3._parentDirectoryItemKey
        }, createNewArray)
    };
    _proto._filterOutParentDirectoryKey = function(array, createNewArray) {
        var _this4 = this;
        return this._filterOutItemByPredicate(array, function(key) {
            return key === _this4._parentDirectoryItemKey
        }, createNewArray)
    };
    _proto._filterOutItemByPredicate = function(array, predicate, createNewArray) {
        var result = array;
        var index = -1;
        for (var i = 0; i < array.length; i++) {
            if (predicate(array[i])) {
                index = i;
                break
            }
        }
        if (index !== -1) {
            if (createNewArray) {
                result = _toConsumableArray(array)
            }
            result.splice(index, 1)
        }
        return result
    };
    _proto._isMultipleSelectionMode = function() {
        return "multiple" === this.option("selectionMode")
    };
    _proto._deselectItem = function(item) {};
    _proto._setSelectedItemKeys = function(itemKeys) {};
    _proto._setFocusedItemKey = function(itemKey) {};
    _proto._createDataSource = function() {
        return {
            store: new _custom_store.default({
                key: "fileItem.key",
                load: this._getItems.bind(this)
            })
        }
    };
    _proto.getSelectedItems = function() {};
    _proto.clearSelection = function() {};
    _proto.selectItem = function() {};
    _createClass(FileManagerItemListBase, [{
        key: "_contextMenu",
        get: function() {
            return this.option("contextMenu")
        }
    }]);
    return FileManagerItemListBase
}(_ui.default);
var _default = FileManagerItemListBase;
exports.default = _default;
module.exports = exports.default;
