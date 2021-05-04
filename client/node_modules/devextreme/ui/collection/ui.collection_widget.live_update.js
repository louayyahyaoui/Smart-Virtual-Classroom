/**
 * DevExtreme (ui/collection/ui.collection_widget.live_update.js)
 * Version: 20.2.6
 * Build date: Tue Mar 16 2021
 *
 * Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
exports.default = void 0;
var _renderer = _interopRequireDefault(require("../../core/renderer"));
var _uiCollection_widget = _interopRequireDefault(require("./ui.collection_widget.edit"));
var _extend = require("../../core/utils/extend");
var _array_utils = require("../../data/array_utils");
var _utils = _interopRequireDefault(require("../../data/utils"));
var _deferred = require("../../core/utils/deferred");
var _array_compare = require("../../core/utils/array_compare");
var _dom_adapter = _interopRequireDefault(require("../../core/dom_adapter"));
var _common = require("../../core/utils/common");

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        "default": obj
    }
}

function _defineProperty(obj, key, value) {
    if (key in obj) {
        Object.defineProperty(obj, key, {
            value: value,
            enumerable: true,
            configurable: true,
            writable: true
        })
    } else {
        obj[key] = value
    }
    return obj
}
var PRIVATE_KEY_FIELD = "__dx_key__";
var _default = _uiCollection_widget.default.inherit({
    _getDefaultOptions: function() {
        return (0, _extend.extend)(this.callBase(), {
            repaintChangesOnly: false
        })
    },
    ctor: function() {
        var _this = this;
        this.callBase.apply(this, arguments);
        this._customizeStoreLoadOptions = function(e) {
            var dataSource = _this._dataSource;
            if (dataSource && !dataSource.isLoaded()) {
                _this._correctionIndex = 0
            }
            if (_this._correctionIndex && e.storeLoadOptions) {
                e.storeLoadOptions.skip += _this._correctionIndex
            }
        }, this._dataSource && this._dataSource.on("customizeStoreLoadOptions", this._customizeStoreLoadOptions)
    },
    reload: function() {
        this._correctionIndex = 0
    },
    _init: function() {
        this.callBase();
        this._refreshItemsCache();
        this._correctionIndex = 0
    },
    _findItemElementByKey: function(key) {
        var _this2 = this;
        var result = (0, _renderer.default)();
        var keyExpr = this.key();
        this.itemElements().each(function(_, item) {
            var $item = (0, _renderer.default)(item);
            var itemData = _this2._getItemData($item);
            if (keyExpr ? _utils.default.keysEqual(keyExpr, _this2.keyOf(itemData), key) : _this2._isItemEquals(itemData, key)) {
                result = $item;
                return false
            }
        });
        return result
    },
    _dataSourceChangedHandler: function(newItems, e) {
        if (null !== e && void 0 !== e && e.changes) {
            this._modifyByChanges(e.changes)
        } else {
            this.callBase(newItems, e);
            this._refreshItemsCache()
        }
    },
    _isItemEquals: function(item1, item2) {
        if (item1 && item1[PRIVATE_KEY_FIELD]) {
            item1 = item1.data
        }
        try {
            return JSON.stringify(item1) === JSON.stringify(item2)
        } catch (e) {
            return item1 === item2
        }
    },
    _isItemStrictEquals: function(item1, item2) {
        return this._isItemEquals(item1, item2)
    },
    _partialRefresh: function() {
        var _this3 = this;
        if (this.option("repaintChangesOnly")) {
            var keyOf = function(data) {
                if (data && void 0 !== data[PRIVATE_KEY_FIELD]) {
                    return data[PRIVATE_KEY_FIELD]
                }
                return _this3.keyOf(data)
            };
            var result = (0, _array_compare.findChanges)(this._itemsCache, this._editStrategy.itemsGetter(), keyOf, this._isItemStrictEquals.bind(this));
            if (result && this._itemsCache.length) {
                this._modifyByChanges(result, true);
                this._renderEmptyMessage();
                return true
            } else {
                this._refreshItemsCache()
            }
        }
        return false
    },
    _refreshItemsCache: function() {
        if (this.option("repaintChangesOnly")) {
            var items = this._editStrategy.itemsGetter();
            try {
                this._itemsCache = (0, _extend.extend)(true, [], items);
                if (!this.key()) {
                    this._itemsCache = this._itemsCache.map(function(itemCache, index) {
                        var _ref;
                        return _ref = {}, _defineProperty(_ref, PRIVATE_KEY_FIELD, items[index]), _defineProperty(_ref, "data", itemCache), _ref
                    })
                }
            } catch (e) {
                this._itemsCache = (0, _extend.extend)([], items)
            }
        }
    },
    _dispose: function() {
        this._dataSource && this._dataSource.off("customizeStoreLoadOptions", this._customizeStoreLoadOptions);
        this.callBase()
    },
    _updateByChange: function(keyInfo, items, change, isPartialRefresh) {
        var _this4 = this;
        if (isPartialRefresh) {
            this._renderItem(change.index, change.data, null, this._findItemElementByKey(change.key))
        } else {
            var changedItem = items[(0, _array_utils.indexByKey)(keyInfo, items, change.key)];
            if (changedItem) {
                (0, _array_utils.update)(keyInfo, items, change.key, change.data).done(function() {
                    _this4._renderItem(items.indexOf(changedItem), changedItem, null, _this4._findItemElementByKey(change.key))
                })
            }
        }
    },
    _insertByChange: function(keyInfo, items, change, isPartialRefresh) {
        var _this5 = this;
        (0, _deferred.when)(isPartialRefresh || (0, _array_utils.insert)(keyInfo, items, change.data, change.index)).done(function() {
            var _change$index;
            _this5._beforeItemElementInserted(change);
            _this5._renderItem(null !== (_change$index = change.index) && void 0 !== _change$index ? _change$index : items.length, change.data);
            _this5._afterItemElementInserted();
            _this5._correctionIndex++
        })
    },
    _updateSelectionAfterRemoveByChange: function(removeIndex) {
        var selectedIndex = this.option("selectedIndex");
        if (selectedIndex > removeIndex) {
            this.option("selectedIndex", selectedIndex - 1)
        } else {
            if (selectedIndex === removeIndex && 1 === this.option("selectedItems").length) {
                this.option("selectedItems", [])
            } else {
                this._normalizeSelectedItems()
            }
        }
    },
    _beforeItemElementInserted: function(change) {
        var selectedIndex = this.option("selectedIndex");
        if (change.index <= selectedIndex) {
            this.option("selectedIndex", selectedIndex + 1)
        }
    },
    _afterItemElementInserted: _common.noop,
    _removeByChange: function(keyInfo, items, change, isPartialRefresh) {
        var _this6 = this;
        var index = isPartialRefresh ? change.index : (0, _array_utils.indexByKey)(keyInfo, items, change.key);
        var removedItem = isPartialRefresh ? change.oldItem : items[index];
        if (removedItem) {
            var $removedItemElement = this._findItemElementByKey(change.key);
            var deletedActionArgs = this._extendActionArgs($removedItemElement);
            this._waitDeletingPrepare($removedItemElement).done(function() {
                if (isPartialRefresh) {
                    _this6._updateIndicesAfterIndex(index - 1);
                    _this6._afterItemElementDeleted($removedItemElement, deletedActionArgs);
                    _this6._updateSelectionAfterRemoveByChange(index)
                } else {
                    _this6._deleteItemElementByIndex(index);
                    _this6._afterItemElementDeleted($removedItemElement, deletedActionArgs)
                }
            });
            this._correctionIndex--
        }
    },
    _modifyByChanges: function(changes, isPartialRefresh) {
        var _this7 = this;
        var items = this._editStrategy.itemsGetter();
        var keyInfo = {
            key: this.key.bind(this),
            keyOf: this.keyOf.bind(this)
        };
        var dataSource = this._dataSource;
        var paginate = dataSource && dataSource.paginate();
        var group = dataSource && dataSource.group();
        if (paginate || group) {
            changes = changes.filter(function(item) {
                return "insert" !== item.type || void 0 !== item.index
            })
        }
        changes.forEach(function(change) {
            return _this7["_".concat(change.type, "ByChange")](keyInfo, items, change, isPartialRefresh)
        });
        this._renderedItemsCount = items.length;
        this._refreshItemsCache();
        this._fireContentReadyAction()
    },
    _appendItemToContainer: function($container, $itemFrame, index) {
        var nextSiblingElement = $container.children(this._itemSelector()).get(index);
        _dom_adapter.default.insertElement($container.get(0), $itemFrame.get(0), nextSiblingElement)
    },
    _optionChanged: function(args) {
        switch (args.name) {
            case "items":
                var isItemsUpdated = this._partialRefresh(args.value);
                if (!isItemsUpdated) {
                    this.callBase(args)
                }
                break;
            case "dataSource":
                if (!this.option("repaintChangesOnly") || !args.value) {
                    this.option("items", [])
                }
                this.callBase(args);
                break;
            case "repaintChangesOnly":
                break;
            default:
                this.callBase(args)
        }
    }
});
exports.default = _default;
module.exports = exports.default;
