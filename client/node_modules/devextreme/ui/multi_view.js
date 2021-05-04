/**
 * DevExtreme (ui/multi_view.js)
 * Version: 20.2.6
 * Build date: Tue Mar 16 2021
 *
 * Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
exports.default = void 0;
var _renderer = _interopRequireDefault(require("../core/renderer"));
var _translator2 = require("../animation/translator");
var _uiMulti_view = require("./multi_view/ui.multi_view.animation");
var _math = require("../core/utils/math");
var _extend = require("../core/utils/extend");
var _common = require("../core/utils/common");
var _visibility_change = require("../events/visibility_change");
var _element = require("../core/element");
var _type = require("../core/utils/type");
var _devices = _interopRequireDefault(require("../core/devices"));
var _component_registrator = _interopRequireDefault(require("../core/component_registrator"));
var _uiCollection_widget = _interopRequireDefault(require("./collection/ui.collection_widget.live_update"));
var _swipeable = _interopRequireDefault(require("../events/gesture/swipeable"));
var _deferred = require("../core/utils/deferred");

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        "default": obj
    }
}
var MULTIVIEW_CLASS = "dx-multiview";
var MULTIVIEW_WRAPPER_CLASS = "dx-multiview-wrapper";
var MULTIVIEW_ITEM_CONTAINER_CLASS = "dx-multiview-item-container";
var MULTIVIEW_ITEM_CLASS = "dx-multiview-item";
var MULTIVIEW_ITEM_HIDDEN_CLASS = "dx-multiview-item-hidden";
var MULTIVIEW_ITEM_DATA_KEY = "dxMultiViewItemData";
var MULTIVIEW_ANIMATION_DURATION = 200;
var toNumber = function(value) {
    return +value
};
var position = function($element) {
    return (0, _translator2.locate)($element).left
};
var MultiView = _uiCollection_widget.default.inherit({
    _activeStateUnit: "." + MULTIVIEW_ITEM_CLASS,
    _supportedKeys: function() {
        return (0, _extend.extend)(this.callBase(), {
            pageUp: _common.noop,
            pageDown: _common.noop
        })
    },
    _getDefaultOptions: function() {
        return (0, _extend.extend)(this.callBase(), {
            selectedIndex: 0,
            swipeEnabled: true,
            animationEnabled: true,
            loop: false,
            deferRendering: true,
            _itemAttributes: {
                role: "tabpanel"
            },
            loopItemFocus: false,
            selectOnFocus: true,
            selectionMode: "single",
            selectionRequired: true,
            selectionByClick: false
        })
    },
    _defaultOptionsRules: function() {
        return this.callBase().concat([{
            device: function() {
                return "desktop" === _devices.default.real().deviceType && !_devices.default.isSimulator()
            },
            options: {
                focusStateEnabled: true
            }
        }])
    },
    _itemClass: function() {
        return MULTIVIEW_ITEM_CLASS
    },
    _itemDataKey: function() {
        return MULTIVIEW_ITEM_DATA_KEY
    },
    _itemContainer: function() {
        return this._$itemContainer
    },
    _itemElements: function() {
        return this._itemContainer().children(this._itemSelector())
    },
    _itemWidth: function() {
        if (!this._itemWidthValue) {
            this._itemWidthValue = this._$wrapper.width()
        }
        return this._itemWidthValue
    },
    _clearItemWidthCache: function() {
        delete this._itemWidthValue
    },
    _itemsCount: function() {
        return this.option("items").length
    },
    _normalizeIndex: function(index) {
        var count = this._itemsCount();
        if (index < 0) {
            index += count
        }
        if (index >= count) {
            index -= count
        }
        return index
    },
    _getRTLSignCorrection: function() {
        return this.option("rtlEnabled") ? -1 : 1
    },
    _init: function() {
        this.callBase.apply(this, arguments);
        var $element = this.$element();
        $element.addClass(MULTIVIEW_CLASS);
        this._$wrapper = (0, _renderer.default)("<div>").addClass(MULTIVIEW_WRAPPER_CLASS);
        this._$wrapper.appendTo($element);
        this._$itemContainer = (0, _renderer.default)("<div>").addClass(MULTIVIEW_ITEM_CONTAINER_CLASS);
        this._$itemContainer.appendTo(this._$wrapper);
        this.option("loopItemFocus", this.option("loop"));
        this._initSwipeable()
    },
    _initMarkup: function() {
        this._deferredItems = [];
        this.callBase();
        var selectedItemIndices = this._getSelectedItemIndices();
        this._updateItemsVisibility(selectedItemIndices[0])
    },
    _afterItemElementDeleted: function($item, deletedActionArgs) {
        this.callBase($item, deletedActionArgs);
        if (this._deferredItems) {
            this._deferredItems.splice(deletedActionArgs.itemIndex, 1)
        }
    },
    _beforeItemElementInserted: function(change) {
        this.callBase.apply(this, arguments);
        if (this._deferredItems) {
            this._deferredItems.splice(change.index, 0, null)
        }
    },
    _executeItemRenderAction: function(index, itemData, itemElement) {
        index = (this.option("items") || []).indexOf(itemData);
        this.callBase(index, itemData, itemElement)
    },
    _renderItemContent: function(args) {
        var renderContentDeferred = new _deferred.Deferred;
        var that = this;
        var callBase = this.callBase;
        var deferred = new _deferred.Deferred;
        deferred.done(function() {
            var $itemContent = callBase.call(that, args);
            renderContentDeferred.resolve($itemContent)
        });
        this._deferredItems[args.index] = deferred;
        this.option("deferRendering") || deferred.resolve();
        return renderContentDeferred.promise()
    },
    _render: function() {
        var _this = this;
        this.callBase();
        (0, _common.deferRender)(function() {
            var selectedItemIndices = _this._getSelectedItemIndices();
            _this._updateItems(selectedItemIndices[0])
        })
    },
    _updateItems: function(selectedIndex, newIndex) {
        this._updateItemsPosition(selectedIndex, newIndex);
        this._updateItemsVisibility(selectedIndex, newIndex)
    },
    _modifyByChanges: function() {
        this.callBase.apply(this, arguments);
        var selectedItemIndices = this._getSelectedItemIndices();
        this._updateItemsVisibility(selectedItemIndices[0])
    },
    _updateItemsPosition: function(selectedIndex, newIndex) {
        var $itemElements = this._itemElements();
        var positionSign = (0, _type.isDefined)(newIndex) ? -this._animationDirection(newIndex, selectedIndex) : void 0;
        var $selectedItem = $itemElements.eq(selectedIndex);
        _uiMulti_view._translator.move($selectedItem, 0);
        if ((0, _type.isDefined)(newIndex)) {
            _uiMulti_view._translator.move($itemElements.eq(newIndex), 100 * positionSign + "%")
        }
    },
    _updateItemsVisibility: function(selectedIndex, newIndex) {
        var $itemElements = this._itemElements();
        $itemElements.each(function(itemIndex, item) {
            var $item = (0, _renderer.default)(item);
            var isHidden = itemIndex !== selectedIndex && itemIndex !== newIndex;
            if (!isHidden) {
                this._renderSpecificItem(itemIndex)
            }
            $item.toggleClass(MULTIVIEW_ITEM_HIDDEN_CLASS, isHidden);
            this.setAria("hidden", isHidden || void 0, $item)
        }.bind(this))
    },
    _renderSpecificItem: function(index) {
        var $item = this._itemElements().eq(index);
        var hasItemContent = $item.find(this._itemContentClass()).length > 0;
        if ((0, _type.isDefined)(index) && !hasItemContent) {
            this._deferredItems[index].resolve();
            (0, _visibility_change.triggerResizeEvent)($item)
        }
    },
    _refreshItem: function($item, item) {
        this.callBase($item, item);
        this._updateItemsVisibility(this.option("selectedIndex"))
    },
    _setAriaSelected: _common.noop,
    _updateSelection: function(addedSelection, removedSelection) {
        var newIndex = addedSelection[0];
        var prevIndex = removedSelection[0];
        _uiMulti_view.animation.complete(this._$itemContainer);
        this._updateItems(prevIndex, newIndex);
        var animationDirection = this._animationDirection(newIndex, prevIndex);
        this._animateItemContainer(animationDirection * this._itemWidth(), function() {
            _uiMulti_view._translator.move(this._$itemContainer, 0);
            this._updateItems(newIndex);
            this._$itemContainer.width()
        }.bind(this))
    },
    _animateItemContainer: function(position, completeCallback) {
        var duration = this.option("animationEnabled") ? MULTIVIEW_ANIMATION_DURATION : 0;
        _uiMulti_view.animation.moveTo(this._$itemContainer, position, duration, completeCallback)
    },
    _animationDirection: function(newIndex, prevIndex) {
        var containerPosition = position(this._$itemContainer);
        var indexDifference = (prevIndex - newIndex) * this._getRTLSignCorrection() * this._getItemFocusLoopSignCorrection();
        var isSwipePresent = 0 !== containerPosition;
        var directionSignVariable = isSwipePresent ? containerPosition : indexDifference;
        return (0, _math.sign)(directionSignVariable)
    },
    _getSwipeDisabledState: function() {
        return !this.option("swipeEnabled") || this._itemsCount() <= 1
    },
    _initSwipeable: function() {
        var _this2 = this;
        this._createComponent(this.$element(), _swipeable.default, {
            disabled: this._getSwipeDisabledState(),
            elastic: false,
            itemSizeFunc: this._itemWidth.bind(this),
            onStart: function(args) {
                return _this2._swipeStartHandler(args.event)
            },
            onUpdated: function(args) {
                return _this2._swipeUpdateHandler(args.event)
            },
            onEnd: function(args) {
                return _this2._swipeEndHandler(args.event)
            }
        })
    },
    _swipeStartHandler: function(e) {
        _uiMulti_view.animation.complete(this._$itemContainer);
        var selectedIndex = this.option("selectedIndex");
        var loop = this.option("loop");
        var lastIndex = this._itemsCount() - 1;
        var rtl = this.option("rtlEnabled");
        e.maxLeftOffset = toNumber(loop || (rtl ? selectedIndex > 0 : selectedIndex < lastIndex));
        e.maxRightOffset = toNumber(loop || (rtl ? selectedIndex < lastIndex : selectedIndex > 0));
        this._swipeDirection = null
    },
    _swipeUpdateHandler: function(e) {
        var offset = e.offset;
        var swipeDirection = (0, _math.sign)(offset) * this._getRTLSignCorrection();
        _uiMulti_view._translator.move(this._$itemContainer, offset * this._itemWidth());
        if (swipeDirection !== this._swipeDirection) {
            this._swipeDirection = swipeDirection;
            var selectedIndex = this.option("selectedIndex");
            var newIndex = this._normalizeIndex(selectedIndex - swipeDirection);
            this._updateItems(selectedIndex, newIndex)
        }
    },
    _swipeEndHandler: function(e) {
        var targetOffset = e.targetOffset * this._getRTLSignCorrection();
        if (targetOffset) {
            this.option("selectedIndex", this._normalizeIndex(this.option("selectedIndex") - targetOffset));
            var $selectedElement = this.itemElements().filter(".dx-item-selected");
            this.option("focusStateEnabled") && this.option("focusedElement", (0, _element.getPublicElement)($selectedElement))
        } else {
            this._animateItemContainer(0, _common.noop)
        }
    },
    _getItemFocusLoopSignCorrection: function() {
        return this._itemFocusLooped ? -1 : 1
    },
    _moveFocus: function() {
        this.callBase.apply(this, arguments);
        this._itemFocusLooped = false
    },
    _prevItem: function($items) {
        var $result = this.callBase.apply(this, arguments);
        this._itemFocusLooped = $result.is($items.last());
        return $result
    },
    _nextItem: function($items) {
        var $result = this.callBase.apply(this, arguments);
        this._itemFocusLooped = $result.is($items.first());
        return $result
    },
    _dimensionChanged: function() {
        this._clearItemWidthCache()
    },
    _visibilityChanged: function(visible) {
        if (visible) {
            this._dimensionChanged()
        }
    },
    _updateSwipeDisabledState: function() {
        var disabled = this._getSwipeDisabledState();
        _swipeable.default.getInstance(this.$element()).option("disabled", disabled)
    },
    _optionChanged: function(args) {
        var value = args.value;
        switch (args.name) {
            case "loop":
                this.option("loopItemFocus", value);
                break;
            case "animationEnabled":
                break;
            case "swipeEnabled":
                this._updateSwipeDisabledState();
                break;
            case "deferRendering":
                this._invalidate();
                break;
            case "items":
                this._updateSwipeDisabledState();
                this.callBase(args);
                break;
            default:
                this.callBase(args)
        }
    }
});
(0, _component_registrator.default)("dxMultiView", MultiView);
var _default = MultiView;
exports.default = _default;
module.exports = exports.default;
module.exports.default = module.exports;
