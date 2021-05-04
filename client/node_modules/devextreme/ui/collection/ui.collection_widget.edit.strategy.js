/**
 * DevExtreme (ui/collection/ui.collection_widget.edit.strategy.js)
 * Version: 20.2.6
 * Build date: Tue Mar 16 2021
 *
 * Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
exports.default = void 0;
var _renderer = _interopRequireDefault(require("../../core/renderer"));
var _class = _interopRequireDefault(require("../../core/class"));
var _common = require("../../core/utils/common");
var _dom_adapter = _interopRequireDefault(require("../../core/dom_adapter"));

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        "default": obj
    }
}
var abstract = _class.default.abstract;
var EditStrategy = _class.default.inherit({
    ctor: function(collectionWidget) {
        this._collectionWidget = collectionWidget
    },
    getIndexByItemData: abstract,
    getItemDataByIndex: abstract,
    getKeysByItems: abstract,
    getItemsByKeys: abstract,
    itemsGetter: abstract,
    getKeyByIndex: function(index) {
        var resultIndex = this._denormalizeItemIndex(index);
        return this.getKeysByItems([this.getItemDataByIndex(resultIndex)])[0]
    },
    _equalKeys: function(key1, key2) {
        if (this._collectionWidget._isKeySpecified()) {
            return (0, _common.equalByValue)(key1, key2)
        } else {
            return key1 === key2
        }
    },
    beginCache: function() {
        this._cache = {}
    },
    endCache: function() {
        this._cache = null
    },
    getIndexByKey: abstract,
    getNormalizedIndex: function(value) {
        if (this._isNormalizedItemIndex(value)) {
            return value
        }
        if (this._isItemIndex(value)) {
            return this._normalizeItemIndex(value)
        }
        if (this._isNode(value)) {
            return this._getNormalizedItemIndex(value)
        }
        return this._normalizeItemIndex(this.getIndexByItemData(value))
    },
    getIndex: function(value) {
        if (this._isNormalizedItemIndex(value)) {
            return this._denormalizeItemIndex(value)
        }
        if (this._isItemIndex(value)) {
            return value
        }
        if (this._isNode(value)) {
            return this._denormalizeItemIndex(this._getNormalizedItemIndex(value))
        }
        return this.getIndexByItemData(value)
    },
    getItemElement: function(value) {
        if (this._isNormalizedItemIndex(value)) {
            return this._getItemByNormalizedIndex(value)
        }
        if (this._isItemIndex(value)) {
            return this._getItemByNormalizedIndex(this._normalizeItemIndex(value))
        }
        if (this._isNode(value)) {
            return (0, _renderer.default)(value)
        }
        var normalizedItemIndex = this._normalizeItemIndex(this.getIndexByItemData(value));
        return this._getItemByNormalizedIndex(normalizedItemIndex)
    },
    _isNode: function(el) {
        return _dom_adapter.default.isNode(el && el.get ? el.get(0) : el)
    },
    deleteItemAtIndex: abstract,
    itemPlacementFunc: function(movingIndex, destinationIndex) {
        return this._itemsFromSameParent(movingIndex, destinationIndex) && movingIndex < destinationIndex ? "after" : "before"
    },
    moveItemAtIndexToIndex: abstract,
    _isNormalizedItemIndex: function(index) {
        return "number" === typeof index && Math.round(index) === index
    },
    _isItemIndex: abstract,
    _getNormalizedItemIndex: abstract,
    _normalizeItemIndex: abstract,
    _denormalizeItemIndex: abstract,
    _getItemByNormalizedIndex: abstract,
    _itemsFromSameParent: abstract
});
var _default = EditStrategy;
exports.default = _default;
module.exports = exports.default;
