/**
 * DevExtreme (ui/selection/selection.strategy.js)
 * Version: 20.2.6
 * Build date: Tue Mar 16 2021
 *
 * Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
exports.default = void 0;
var _query = _interopRequireDefault(require("../../data/query"));
var _common = require("../../core/utils/common");
var _type = require("../../core/utils/type");
var _class = _interopRequireDefault(require("../../core/class"));
var _deferred = require("../../core/utils/deferred");

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        "default": obj
    }
}
var _default = _class.default.inherit({
    ctor: function(options) {
        this.options = options;
        this._setOption("disabledItemKeys", []);
        this._clearItemKeys()
    },
    _clearItemKeys: function() {
        this._setOption("addedItemKeys", []);
        this._setOption("removedItemKeys", []);
        this._setOption("removedItems", []);
        this._setOption("addedItems", [])
    },
    validate: _common.noop,
    _setOption: function(name, value) {
        this.options[name] = value
    },
    onSelectionChanged: function onSelectionChanged() {
        var addedItemKeys = this.options.addedItemKeys;
        var removedItemKeys = this.options.removedItemKeys;
        var addedItems = this.options.addedItems;
        var removedItems = this.options.removedItems;
        var selectedItems = this.options.selectedItems;
        var selectedItemKeys = this.options.selectedItemKeys;
        var onSelectionChanged = this.options.onSelectionChanged || _common.noop;
        this._clearItemKeys();
        onSelectionChanged({
            selectedItems: selectedItems,
            selectedItemKeys: selectedItemKeys,
            addedItemKeys: addedItemKeys,
            removedItemKeys: removedItemKeys,
            addedItems: addedItems,
            removedItems: removedItems
        })
    },
    equalKeys: function(key1, key2) {
        if (this.options.equalByReference) {
            if ((0, _type.isObject)(key1) && (0, _type.isObject)(key2)) {
                return key1 === key2
            }
        }
        return (0, _common.equalByValue)(key1, key2)
    },
    getSelectableItems: function(items) {
        return items.filter(function(item) {
            return !item.disabled
        })
    },
    _clearSelection: function(keys, preserve, isDeselect, isSelectAll) {
        keys = keys || [];
        keys = Array.isArray(keys) ? keys : [keys];
        this.validate();
        return this.selectedItemKeys(keys, preserve, isDeselect, isSelectAll)
    },
    _loadFilteredData: function(remoteFilter, localFilter, select, isSelectAll) {
        var filterLength = encodeURI(JSON.stringify(remoteFilter)).length;
        var needLoadAllData = this.options.maxFilterLengthInRequest && filterLength > this.options.maxFilterLengthInRequest;
        var deferred = new _deferred.Deferred;
        var loadOptions = {
            filter: needLoadAllData ? void 0 : remoteFilter,
            select: needLoadAllData ? this.options.dataFields() : select || this.options.dataFields()
        };
        if (remoteFilter && 0 === remoteFilter.length) {
            deferred.resolve([])
        } else {
            this.options.load(loadOptions).done(function(items) {
                var filteredItems = (0, _type.isPlainObject)(items) ? items.data : items;
                if (localFilter && !isSelectAll) {
                    filteredItems = filteredItems.filter(localFilter)
                } else {
                    if (needLoadAllData) {
                        filteredItems = (0, _query.default)(filteredItems).filter(remoteFilter).toArray()
                    }
                }
                deferred.resolve(filteredItems)
            }).fail(deferred.reject.bind(deferred))
        }
        return deferred
    },
    updateSelectedItemKeyHash: function(keys) {
        for (var i = 0; i < keys.length; i++) {
            var keyHash = (0, _common.getKeyHash)(keys[i]);
            if (!(0, _type.isObject)(keyHash)) {
                this.options.keyHashIndices[keyHash] = this.options.keyHashIndices[keyHash] || [];
                var keyIndices = this.options.keyHashIndices[keyHash];
                keyIndices.push(i)
            }
        }
    },
    _isAnyItemSelected: function(items) {
        for (var i = 0; i < items.length; i++) {
            if (this.options.isItemSelected(items[i])) {
                return
            }
        }
        return false
    },
    _getFullSelectAllState: function() {
        var items = this.options.plainItems();
        var dataFilter = this.options.filter();
        var selectedItems = this.options.selectedItems;
        if (dataFilter) {
            selectedItems = (0, _query.default)(selectedItems).filter(dataFilter).toArray()
        }
        var selectedItemsLength = selectedItems.length;
        if (!selectedItemsLength) {
            return this._isAnyItemSelected(items)
        }
        if (selectedItemsLength >= this.options.totalCount() - this.options.disabledItemKeys.length) {
            return true
        }
        return
    },
    _getVisibleSelectAllState: function() {
        var items = this.getSelectableItems(this.options.plainItems());
        var hasSelectedItems = false;
        var hasUnselectedItems = false;
        for (var i = 0; i < items.length; i++) {
            var item = items[i];
            var itemData = this.options.getItemData(item);
            var key = this.options.keyOf(itemData);
            if (this.options.isSelectableItem(item)) {
                if (this.isItemKeySelected(key)) {
                    hasSelectedItems = true
                } else {
                    hasUnselectedItems = true
                }
            }
        }
        if (hasSelectedItems) {
            return !hasUnselectedItems ? true : void 0
        } else {
            return false
        }
    }
});
exports.default = _default;
module.exports = exports.default;
