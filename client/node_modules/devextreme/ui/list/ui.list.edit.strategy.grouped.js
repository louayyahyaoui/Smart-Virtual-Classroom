/**
 * DevExtreme (ui/list/ui.list.edit.strategy.grouped.js)
 * Version: 20.2.6
 * Build date: Tue Mar 16 2021
 *
 * Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
exports.default = void 0;
var _renderer = _interopRequireDefault(require("../../core/renderer"));
var _type = require("../../core/utils/type");
var _iterator = require("../../core/utils/iterator");
var _store_helper = _interopRequireDefault(require("../../data/store_helper"));
var _query = _interopRequireDefault(require("../../data/query"));
var _uiCollection_widgetEditStrategy = _interopRequireDefault(require("../collection/ui.collection_widget.edit.strategy.plain"));

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        "default": obj
    }
}
var LIST_ITEM_CLASS = "dx-list-item";
var LIST_GROUP_CLASS = "dx-list-group";
var SELECTION_SHIFT = 20;
var SELECTION_MASK = 2303;
var combineIndex = function(indices) {
    return (indices.group << SELECTION_SHIFT) + indices.item
};
var splitIndex = function(combinedIndex) {
    return {
        group: combinedIndex >> SELECTION_SHIFT,
        item: combinedIndex & SELECTION_MASK
    }
};
var GroupedEditStrategy = _uiCollection_widgetEditStrategy.default.inherit({
    _groupElements: function() {
        return this._collectionWidget._itemContainer().find("." + LIST_GROUP_CLASS)
    },
    _groupItemElements: function($group) {
        return $group.find("." + LIST_ITEM_CLASS)
    },
    getIndexByItemData: function(itemData) {
        var groups = this._collectionWidget.option("items");
        var index = false;
        if (!itemData) {
            return false
        }
        if (itemData.items && itemData.items.length) {
            itemData = itemData.items[0]
        }(0, _iterator.each)(groups, function(groupIndex, group) {
            if (!group.items) {
                return false
            }(0, _iterator.each)(group.items, function(itemIndex, item) {
                if (item !== itemData) {
                    return true
                }
                index = {
                    group: groupIndex,
                    item: itemIndex
                };
                return false
            });
            if (index) {
                return false
            }
        });
        return index
    },
    getItemDataByIndex: function(index) {
        var items = this._collectionWidget.option("items");
        if ((0, _type.isNumeric)(index)) {
            return this.itemsGetter()[index]
        }
        return index && items[index.group] && items[index.group].items[index.item] || null
    },
    itemsGetter: function() {
        var resultItems = [];
        var items = this._collectionWidget.option("items");
        for (var i = 0; i < items.length; i++) {
            if (items[i] && items[i].items) {
                resultItems = resultItems.concat(items[i].items)
            } else {
                resultItems.push(items[i])
            }
        }
        return resultItems
    },
    deleteItemAtIndex: function(index) {
        var indices = splitIndex(index);
        var itemGroup = this._collectionWidget.option("items")[indices.group].items;
        itemGroup.splice(indices.item, 1)
    },
    getKeysByItems: function(items) {
        var plainItems = [];
        var i;
        for (i = 0; i < items.length; i++) {
            if (items[i] && items[i].items) {
                plainItems = plainItems.concat(items[i].items)
            } else {
                plainItems.push(items[i])
            }
        }
        var result = [];
        for (i = 0; i < plainItems.length; i++) {
            result.push(this._collectionWidget.keyOf(plainItems[i]))
        }
        return result
    },
    getIndexByKey: function(key, items) {
        var groups = items || this._collectionWidget.option("items");
        var index = -1;
        var that = this;
        (0, _iterator.each)(groups, function(groupIndex, group) {
            if (!group.items) {
                return
            }
            var keys = that.getKeysByItems(group.items);
            (0, _iterator.each)(keys, function(keyIndex, itemKey) {
                if (that._equalKeys(itemKey, key)) {
                    index = {
                        group: groupIndex,
                        item: keyIndex
                    };
                    return false
                }
            });
            if (index !== -1) {
                return false
            }
        });
        return index
    },
    _getGroups: function(items) {
        var dataSource = this._collectionWidget.getDataSource();
        var group = dataSource && dataSource.group();
        if (group) {
            return _store_helper.default.queryByOptions((0, _query.default)(items), {
                group: group
            }).toArray()
        }
        return this._collectionWidget.option("items")
    },
    getItemsByKeys: function(keys, items) {
        var result = [];
        (0, _iterator.each)(keys, function(_, key) {
            var getItemMeta = function(groups) {
                var index = this.getIndexByKey(key, groups);
                var group = index && groups[index.group];
                if (!group) {
                    return
                }
                return {
                    groupKey: group.key,
                    item: group.items[index.item]
                }
            }.bind(this);
            var itemMeta = getItemMeta(this._getGroups(items));
            if (!itemMeta) {
                return
            }
            var groupKey = itemMeta.groupKey;
            var item = itemMeta.item;
            var selectedGroup;
            (0, _iterator.each)(result, function(_, item) {
                if (item.key === groupKey) {
                    selectedGroup = item;
                    return false
                }
            });
            if (!selectedGroup) {
                selectedGroup = {
                    key: groupKey,
                    items: []
                };
                result.push(selectedGroup)
            }
            selectedGroup.items.push(item)
        }.bind(this));
        return result
    },
    moveItemAtIndexToIndex: function(movingIndex, destinationIndex) {
        var items = this._collectionWidget.option("items");
        var movingIndices = splitIndex(movingIndex);
        var destinationIndices = splitIndex(destinationIndex);
        var movingItemGroup = items[movingIndices.group].items;
        var destinationItemGroup = items[destinationIndices.group].items;
        var movedItemData = movingItemGroup[movingIndices.item];
        movingItemGroup.splice(movingIndices.item, 1);
        destinationItemGroup.splice(destinationIndices.item, 0, movedItemData)
    },
    _isItemIndex: function(index) {
        return index && (0, _type.isNumeric)(index.group) && (0, _type.isNumeric)(index.item)
    },
    _getNormalizedItemIndex: function(itemElement) {
        var $item = (0, _renderer.default)(itemElement);
        var $group = $item.closest("." + LIST_GROUP_CLASS);
        if (!$group.length) {
            return -1
        }
        return combineIndex({
            group: this._groupElements().index($group),
            item: this._groupItemElements($group).index($item)
        })
    },
    _normalizeItemIndex: function(index) {
        return combineIndex(index)
    },
    _denormalizeItemIndex: function(index) {
        return splitIndex(index)
    },
    _getItemByNormalizedIndex: function(index) {
        var indices = splitIndex(index);
        var $group = this._groupElements().eq(indices.group);
        return this._groupItemElements($group).eq(indices.item)
    },
    _itemsFromSameParent: function(firstIndex, secondIndex) {
        return splitIndex(firstIndex).group === splitIndex(secondIndex).group
    }
});
var _default = GroupedEditStrategy;
exports.default = _default;
module.exports = exports.default;
