/**
 * DevExtreme (ui/gallery.js)
 * Version: 20.2.6
 * Build date: Tue Mar 16 2021
 *
 * Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
exports.default = void 0;
var _renderer = _interopRequireDefault(require("../core/renderer"));
var _events_engine = _interopRequireDefault(require("../events/core/events_engine"));
var _component_registrator = _interopRequireDefault(require("../core/component_registrator"));
var _common = require("../core/utils/common");
var _type = require("../core/utils/type");
var _window = require("../core/utils/window");
var _extend = require("../core/utils/extend");
var _element = require("../core/element");
var _fx = _interopRequireDefault(require("../animation/fx"));
var _click = require("../events/click");
var _translator = require("../animation/translator");
var _devices = _interopRequireDefault(require("../core/devices"));
var _ui = _interopRequireDefault(require("./widget/ui.widget"));
var _index = require("../events/utils/index");
var _uiCollection_widget = _interopRequireDefault(require("./collection/ui.collection_widget.edit"));
var _swipeable = _interopRequireDefault(require("../events/gesture/swipeable"));
var _bindable_template = require("../core/templates/bindable_template");
var _deferred = require("../core/utils/deferred");

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        "default": obj
    }
}
var GALLERY_CLASS = "dx-gallery";
var GALLERY_WRAPPER_CLASS = GALLERY_CLASS + "-wrapper";
var GALLERY_LOOP_CLASS = "dx-gallery-loop";
var GALLERY_ITEM_CONTAINER_CLASS = GALLERY_CLASS + "-container";
var GALLERY_ACTIVE_CLASS = GALLERY_CLASS + "-active";
var GALLERY_ITEM_CLASS = GALLERY_CLASS + "-item";
var GALLERY_INVISIBLE_ITEM_CLASS = GALLERY_CLASS + "-item-invisible";
var GALLERY_LOOP_ITEM_CLASS = GALLERY_ITEM_CLASS + "-loop";
var GALLERY_ITEM_SELECTOR = "." + GALLERY_ITEM_CLASS;
var GALLERY_ITEM_SELECTED_CLASS = GALLERY_ITEM_CLASS + "-selected";
var GALLERY_INDICATOR_CLASS = GALLERY_CLASS + "-indicator";
var GALLERY_INDICATOR_ITEM_CLASS = GALLERY_INDICATOR_CLASS + "-item";
var GALLERY_INDICATOR_ITEM_SELECTOR = "." + GALLERY_INDICATOR_ITEM_CLASS;
var GALLERY_INDICATOR_ITEM_SELECTED_CLASS = GALLERY_INDICATOR_ITEM_CLASS + "-selected";
var GALLERY_IMAGE_CLASS = "dx-gallery-item-image";
var GALLERY_ITEM_DATA_KEY = "dxGalleryItemData";
var MAX_CALC_ERROR = 1;
var GalleryNavButton = _ui.default.inherit({
    _supportedKeys: function() {
        return (0, _extend.extend)(this.callBase(), {
            pageUp: _common.noop,
            pageDown: _common.noop
        })
    },
    _getDefaultOptions: function() {
        return (0, _extend.extend)(this.callBase(), {
            direction: "next",
            onClick: null,
            hoverStateEnabled: true,
            activeStateEnabled: true
        })
    },
    _render: function() {
        this.callBase();
        var that = this;
        var $element = this.$element();
        var eventName = (0, _index.addNamespace)(_click.name, this.NAME);
        $element.addClass(GALLERY_CLASS + "-nav-button-" + this.option("direction"));
        _events_engine.default.off($element, eventName);
        _events_engine.default.on($element, eventName, function(e) {
            that._createActionByOption("onClick")({
                event: e
            })
        })
    },
    _optionChanged: function(args) {
        switch (args.name) {
            case "onClick":
            case "direction":
                this._invalidate();
                break;
            default:
                this.callBase(args)
        }
    }
});
var Gallery = _uiCollection_widget.default.inherit({
    _activeStateUnit: GALLERY_ITEM_SELECTOR,
    _getDefaultOptions: function() {
        return (0, _extend.extend)(this.callBase(), {
            activeStateEnabled: false,
            animationDuration: 400,
            animationEnabled: true,
            loop: false,
            swipeEnabled: true,
            indicatorEnabled: true,
            showIndicator: true,
            selectedIndex: 0,
            slideshowDelay: 0,
            showNavButtons: false,
            wrapAround: false,
            initialItemWidth: void 0,
            stretchImages: false,
            _itemAttributes: {
                role: "option"
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
    _init: function() {
        this.callBase();
        this.option("loopItemFocus", this.option("loop"))
    },
    _initTemplates: function() {
        this.callBase();
        this._templateManager.addDefaultTemplates({
            item: new _bindable_template.BindableTemplate(function($container, data) {
                var $img = (0, _renderer.default)("<img>").addClass(GALLERY_IMAGE_CLASS);
                if ((0, _type.isPlainObject)(data)) {
                    this._prepareDefaultItemTemplate(data, $container);
                    $img.attr({
                        src: data.imageSrc,
                        alt: data.imageAlt
                    }).appendTo($container)
                } else {
                    $img.attr("src", String(data)).appendTo($container)
                }
            }.bind(this), ["imageSrc", "imageAlt", "text", "html"], this.option("integrationOptions.watchMethod"))
        })
    },
    _dataSourceOptions: function() {
        return {
            paginate: false
        }
    },
    _itemContainer: function() {
        return this._$container
    },
    _itemClass: function() {
        return GALLERY_ITEM_CLASS
    },
    _itemDataKey: function() {
        return GALLERY_ITEM_DATA_KEY
    },
    _actualItemWidth: function() {
        var isWrapAround = this.option("wrapAround");
        if (this.option("stretchImages")) {
            var itemPerPage = isWrapAround ? this._itemsPerPage() + 1 : this._itemsPerPage();
            return 1 / itemPerPage
        }
        if (isWrapAround) {
            return this._itemPercentWidth() * this._itemsPerPage() / (this._itemsPerPage() + 1)
        }
        return this._itemPercentWidth()
    },
    _itemPercentWidth: function() {
        var percentWidth;
        var elementWidth = this.$element().outerWidth();
        var initialItemWidth = this.option("initialItemWidth");
        if (initialItemWidth && initialItemWidth <= elementWidth) {
            percentWidth = initialItemWidth / elementWidth
        } else {
            percentWidth = 1
        }
        return percentWidth
    },
    _itemsPerPage: function() {
        var itemsPerPage = (0, _window.hasWindow)() ? Math.floor(1 / this._itemPercentWidth()) : 1;
        return Math.min(itemsPerPage, this._itemsCount())
    },
    _pagesCount: function() {
        return Math.ceil(this._itemsCount() / this._itemsPerPage())
    },
    _itemsCount: function() {
        return (this.option("items") || []).length
    },
    _offsetDirection: function() {
        return this.option("rtlEnabled") ? -1 : 1
    },
    _initMarkup: function() {
        this._renderWrapper();
        this._renderItemsContainer();
        this.$element().addClass(GALLERY_CLASS);
        this.$element().toggleClass(GALLERY_LOOP_CLASS, this.option("loop"));
        this.callBase();
        this.setAria({
            role: "listbox",
            label: "gallery"
        })
    },
    _render: function() {
        this._renderDragHandler();
        this._renderContainerPosition();
        this._renderItemSizes();
        this._renderItemPositions();
        this._renderNavButtons();
        this._renderIndicator();
        this._renderSelectedItem();
        this._renderItemVisibility();
        this._renderUserInteraction();
        this._setupSlideShow();
        this._reviseDimensions();
        this.callBase()
    },
    _dimensionChanged: function() {
        var selectedIndex = this.option("selectedIndex") || 0;
        this._stopItemAnimations();
        this._clearCacheWidth();
        this._cloneDuplicateItems();
        this._renderItemSizes();
        this._renderItemPositions();
        this._renderIndicator();
        this._renderContainerPosition(this._calculateIndexOffset(selectedIndex), true);
        this._renderItemVisibility()
    },
    _renderDragHandler: function() {
        var eventName = (0, _index.addNamespace)("dragstart", this.NAME);
        _events_engine.default.off(this.$element(), eventName);
        _events_engine.default.on(this.$element(), eventName, "img", function() {
            return false
        })
    },
    _renderWrapper: function() {
        if (this._$wrapper) {
            return
        }
        this._$wrapper = (0, _renderer.default)("<div>").addClass(GALLERY_WRAPPER_CLASS).appendTo(this.$element())
    },
    _renderItems: function(items) {
        if (!(0, _window.hasWindow)()) {
            var selectedIndex = this.option("selectedIndex");
            items = items.length > selectedIndex ? items.slice(selectedIndex, selectedIndex + 1) : items.slice(0, 1)
        }
        this.callBase(items);
        this._loadNextPageIfNeeded()
    },
    _renderItemsContainer: function() {
        if (this._$container) {
            return
        }
        this._$container = (0, _renderer.default)("<div>").addClass(GALLERY_ITEM_CONTAINER_CLASS).appendTo(this._$wrapper)
    },
    _cloneDuplicateItems: function() {
        if (!this.option("loop")) {
            return
        }
        var items = this.option("items") || [];
        var itemsCount = items.length;
        var lastItemIndex = itemsCount - 1;
        var i;
        if (!itemsCount) {
            return
        }
        this._getLoopedItems().remove();
        var duplicateCount = Math.min(this._itemsPerPage(), itemsCount);
        var $items = this._getRealItems();
        var $container = this._itemContainer();
        for (i = 0; i < duplicateCount; i++) {
            this._cloneItemForDuplicate($items[i], $container)
        }
        for (i = 0; i < duplicateCount; i++) {
            this._cloneItemForDuplicate($items[lastItemIndex - i], $container)
        }
    },
    _cloneItemForDuplicate: function(item, $container) {
        if (item) {
            (0, _renderer.default)(item).clone(true).addClass(GALLERY_LOOP_ITEM_CLASS).css("margin", 0).appendTo($container)
        }
    },
    _getRealItems: function() {
        var selector = "." + GALLERY_ITEM_CLASS + ":not(." + GALLERY_LOOP_ITEM_CLASS + ")";
        return this.$element().find(selector)
    },
    _getLoopedItems: function() {
        return this.$element().find("." + GALLERY_LOOP_ITEM_CLASS)
    },
    _emptyMessageContainer: function() {
        return this._$wrapper
    },
    _renderItemSizes: function(startIndex) {
        var $items = this._itemElements();
        var itemWidth = this._actualItemWidth();
        if (void 0 !== startIndex) {
            $items = $items.slice(startIndex)
        }
        $items.each(function(index) {
            (0, _renderer.default)($items[index]).outerWidth(100 * itemWidth + "%")
        })
    },
    _renderItemPositions: function() {
        var itemWidth = this._actualItemWidth();
        var itemsCount = this._itemsCount();
        var itemsPerPage = this._itemsPerPage();
        var loopItemsCount = this.$element().find("." + GALLERY_LOOP_ITEM_CLASS).length;
        var lastItemDuplicateIndex = itemsCount + loopItemsCount - 1;
        var offsetRatio = this.option("wrapAround") ? .5 : 0;
        var freeSpace = this._itemFreeSpace();
        var isGapBetweenImages = !!freeSpace;
        var rtlEnabled = this.option("rtlEnabled");
        var selectedIndex = this.option("selectedIndex");
        var side = rtlEnabled ? "Right" : "Left";
        this._itemElements().each(function(index) {
            var realIndex = index;
            var isLoopItem = (0, _renderer.default)(this).hasClass(GALLERY_LOOP_ITEM_CLASS);
            if (index > itemsCount + itemsPerPage - 1) {
                realIndex = lastItemDuplicateIndex - realIndex - itemsPerPage
            }
            if (!isLoopItem && 0 !== realIndex) {
                if (isGapBetweenImages) {
                    (0, _renderer.default)(this).css("margin" + side, 100 * freeSpace + "%")
                }
                return
            }
            var itemPosition = itemWidth * (realIndex + offsetRatio) + freeSpace * (realIndex + 1 - offsetRatio);
            var property = isLoopItem ? side.toLowerCase() : "margin" + side;
            (0, _renderer.default)(this).css(property, 100 * itemPosition + "%")
        });
        this._relocateItems(selectedIndex, selectedIndex, true)
    },
    _itemFreeSpace: function() {
        var itemsPerPage = this._itemsPerPage();
        if (this.option("wrapAround")) {
            itemsPerPage += 1
        }
        return (1 - this._actualItemWidth() * itemsPerPage) / (itemsPerPage + 1)
    },
    _renderContainerPosition: function(offset, hideItems, animate) {
        this._releaseInvisibleItems();
        offset = offset || 0;
        var that = this;
        var itemWidth = this._actualItemWidth();
        var targetIndex = offset;
        var targetPosition = this._offsetDirection() * targetIndex * (itemWidth + this._itemFreeSpace());
        var positionReady;
        if ((0, _type.isDefined)(this._animationOverride)) {
            animate = this._animationOverride;
            delete this._animationOverride
        }
        if (animate) {
            that._startSwipe();
            positionReady = that._animate(targetPosition).done(that._endSwipe.bind(that))
        } else {
            (0, _translator.move)(this._$container, {
                left: targetPosition * this._elementWidth(),
                top: 0
            });
            positionReady = (new _deferred.Deferred).resolveWith(that)
        }
        positionReady.done(function() {
            this._deferredAnimate && that._deferredAnimate.resolveWith(that);
            hideItems && this._renderItemVisibility()
        });
        return positionReady.promise()
    },
    _startSwipe: function() {
        this.$element().addClass(GALLERY_ACTIVE_CLASS)
    },
    _endSwipe: function() {
        this.$element().removeClass(GALLERY_ACTIVE_CLASS)
    },
    _animate: function(targetPosition, extraConfig) {
        var that = this;
        var $container = this._$container;
        var animationComplete = new _deferred.Deferred;
        _fx.default.animate(this._$container, (0, _extend.extend)({
            type: "slide",
            to: {
                left: targetPosition * this._elementWidth()
            },
            duration: that.option("animationDuration"),
            complete: function() {
                if (that._needMoveContainerForward()) {
                    (0, _translator.move)($container, {
                        left: 0,
                        top: 0
                    })
                }
                if (that._needMoveContainerBack()) {
                    (0, _translator.move)($container, {
                        left: that._maxContainerOffset() * that._elementWidth(),
                        top: 0
                    })
                }
                animationComplete.resolveWith(that)
            }
        }, extraConfig || {}));
        return animationComplete
    },
    _needMoveContainerForward: function() {
        var expectedPosition = this._$container.position().left * this._offsetDirection();
        var actualPosition = -this._maxItemWidth() * this._elementWidth() * this._itemsCount();
        return expectedPosition <= actualPosition + MAX_CALC_ERROR
    },
    _needMoveContainerBack: function() {
        var expectedPosition = this._$container.position().left * this._offsetDirection();
        var actualPosition = this._actualItemWidth() * this._elementWidth();
        return expectedPosition >= actualPosition - MAX_CALC_ERROR
    },
    _maxContainerOffset: function() {
        return -this._maxItemWidth() * (this._itemsCount() - this._itemsPerPage()) * this._offsetDirection()
    },
    _maxItemWidth: function() {
        return this._actualItemWidth() + this._itemFreeSpace()
    },
    _reviseDimensions: function() {
        var that = this;
        var $firstItem = that._itemElements().first().find(".dx-item-content");
        if (!$firstItem || $firstItem.is(":hidden")) {
            return
        }
        if (!that.option("height")) {
            that.option("height", $firstItem.outerHeight())
        }
        if (!that.option("width")) {
            that.option("width", $firstItem.outerWidth())
        }
        this._dimensionChanged()
    },
    _renderIndicator: function() {
        this._cleanIndicators();
        if (!this.option("showIndicator")) {
            return
        }
        var indicator = this._$indicator = (0, _renderer.default)("<div>").addClass(GALLERY_INDICATOR_CLASS).appendTo(this._$wrapper);
        var isIndicatorEnabled = this.option("indicatorEnabled");
        for (var i = 0; i < this._pagesCount(); i++) {
            var $indicatorItem = (0, _renderer.default)("<div>").addClass(GALLERY_INDICATOR_ITEM_CLASS).appendTo(indicator);
            if (isIndicatorEnabled) {
                this._attachIndicatorClickHandler($indicatorItem, i)
            }
        }
        this._renderSelectedPageIndicator()
    },
    _attachIndicatorClickHandler: function($element, index) {
        _events_engine.default.on($element, (0, _index.addNamespace)(_click.name, this.NAME), function(event) {
            this._indicatorSelectHandler(event, index)
        }.bind(this))
    },
    _detachIndicatorClickHandler: function($element) {
        _events_engine.default.off($element, (0, _index.addNamespace)(_click.name, this.NAME))
    },
    _toggleIndicatorInteraction: function(clickEnabled) {
        var _this$_$indicator;
        var $indicatorItems = (null === (_this$_$indicator = this._$indicator) || void 0 === _this$_$indicator ? void 0 : _this$_$indicator.find(GALLERY_INDICATOR_ITEM_SELECTOR)) || [];
        if ($indicatorItems.length) {
            $indicatorItems.each(function(index, element) {
                clickEnabled ? this._attachIndicatorClickHandler((0, _renderer.default)(element), index) : this._detachIndicatorClickHandler((0, _renderer.default)(element))
            }.bind(this))
        }
    },
    _cleanIndicators: function() {
        if (this._$indicator) {
            this._$indicator.remove()
        }
    },
    _renderSelectedItem: function() {
        var selectedIndex = this.option("selectedIndex");
        this._itemElements().removeClass(GALLERY_ITEM_SELECTED_CLASS).eq(selectedIndex).addClass(GALLERY_ITEM_SELECTED_CLASS)
    },
    _renderItemVisibility: function() {
        if (this.option("initialItemWidth") || this.option("wrapAround")) {
            this._releaseInvisibleItems();
            return
        }
        this._itemElements().each(function(index, item) {
            if (this.option("selectedIndex") === index) {
                (0, _renderer.default)(item).removeClass(GALLERY_INVISIBLE_ITEM_CLASS)
            } else {
                (0, _renderer.default)(item).addClass(GALLERY_INVISIBLE_ITEM_CLASS)
            }
        }.bind(this));
        this._getLoopedItems().addClass(GALLERY_INVISIBLE_ITEM_CLASS)
    },
    _releaseInvisibleItems: function() {
        this._itemElements().removeClass(GALLERY_INVISIBLE_ITEM_CLASS);
        this._getLoopedItems().removeClass(GALLERY_INVISIBLE_ITEM_CLASS)
    },
    _renderSelectedPageIndicator: function() {
        if (!this._$indicator) {
            return
        }
        var itemIndex = this.option("selectedIndex");
        var lastIndex = this._pagesCount() - 1;
        var pageIndex = Math.ceil(itemIndex / this._itemsPerPage());
        pageIndex = Math.min(lastIndex, pageIndex);
        this._$indicator.find(GALLERY_INDICATOR_ITEM_SELECTOR).removeClass(GALLERY_INDICATOR_ITEM_SELECTED_CLASS).eq(pageIndex).addClass(GALLERY_INDICATOR_ITEM_SELECTED_CLASS)
    },
    _renderUserInteraction: function() {
        var rootElement = this.$element();
        var swipeEnabled = this.option("swipeEnabled") && this._itemsCount() > 1;
        this._createComponent(rootElement, _swipeable.default, {
            disabled: this.option("disabled") || !swipeEnabled,
            onStart: this._swipeStartHandler.bind(this),
            onUpdated: this._swipeUpdateHandler.bind(this),
            onEnd: this._swipeEndHandler.bind(this),
            itemSizeFunc: this._elementWidth.bind(this)
        })
    },
    _indicatorSelectHandler: function(e, indicatorIndex) {
        if (!this.option("indicatorEnabled")) {
            return
        }
        var itemIndex = this._fitPaginatedIndex(indicatorIndex * this._itemsPerPage());
        this._needLongMove = true;
        this.option("selectedIndex", itemIndex);
        this._loadNextPageIfNeeded(itemIndex)
    },
    _renderNavButtons: function() {
        var that = this;
        if (!that.option("showNavButtons")) {
            that._cleanNavButtons();
            return
        }
        that._prevNavButton = (0, _renderer.default)("<div>").appendTo(this._$wrapper);
        that._createComponent(that._prevNavButton, GalleryNavButton, {
            direction: "prev",
            onClick: function() {
                that._prevPage()
            }
        });
        that._nextNavButton = (0, _renderer.default)("<div>").appendTo(this._$wrapper);
        that._createComponent(that._nextNavButton, GalleryNavButton, {
            direction: "next",
            onClick: function() {
                that._nextPage()
            }
        });
        this._renderNavButtonsVisibility()
    },
    _prevPage: function() {
        var visiblePageSize = this._itemsPerPage();
        var newSelectedIndex = this.option("selectedIndex") - visiblePageSize;
        if (newSelectedIndex === -visiblePageSize && visiblePageSize === this._itemsCount()) {
            return this._relocateItems(newSelectedIndex, 0)
        } else {
            return this.goToItem(this._fitPaginatedIndex(newSelectedIndex))
        }
    },
    _nextPage: function() {
        var visiblePageSize = this._itemsPerPage();
        var newSelectedIndex = this.option("selectedIndex") + visiblePageSize;
        if (newSelectedIndex === visiblePageSize && visiblePageSize === this._itemsCount()) {
            return this._relocateItems(newSelectedIndex, 0)
        } else {
            return this.goToItem(this._fitPaginatedIndex(newSelectedIndex)).done(this._loadNextPageIfNeeded)
        }
    },
    _loadNextPageIfNeeded: function(selectedIndex) {
        selectedIndex = void 0 === selectedIndex ? this.option("selectedIndex") : selectedIndex;
        if (this._dataSource && this._dataSource.paginate() && this._shouldLoadNextPage(selectedIndex) && !this._isDataSourceLoading() && !this._isLastPage()) {
            this._loadNextPage().done(function() {
                this._renderIndicator();
                this._cloneDuplicateItems();
                this._renderItemPositions();
                this._renderNavButtonsVisibility();
                this._renderItemSizes(selectedIndex)
            }.bind(this))
        }
    },
    _shouldLoadNextPage: function(selectedIndex) {
        var visiblePageSize = this._itemsPerPage();
        return selectedIndex + 2 * visiblePageSize > this.option("items").length
    },
    _allowDynamicItemsAppend: function() {
        return true
    },
    _fitPaginatedIndex: function(itemIndex) {
        var itemsPerPage = this._itemsPerPage();
        var restItemsCount = itemIndex < 0 ? itemsPerPage + itemIndex : this._itemsCount() - itemIndex;
        if (itemIndex > this._itemsCount() - 1) {
            itemIndex = 0;
            this._goToGhostItem = true
        } else {
            if (restItemsCount < itemsPerPage && restItemsCount > 0) {
                if (itemIndex > 0) {
                    itemIndex -= itemsPerPage - restItemsCount
                } else {
                    itemIndex += itemsPerPage - restItemsCount
                }
            }
        }
        return itemIndex
    },
    _cleanNavButtons: function() {
        if (this._prevNavButton) {
            this._prevNavButton.remove();
            delete this._prevNavButton
        }
        if (this._nextNavButton) {
            this._nextNavButton.remove();
            delete this._nextNavButton
        }
    },
    _renderNavButtonsVisibility: function() {
        if (!this.option("showNavButtons") || !this._prevNavButton || !this._nextNavButton) {
            return
        }
        var selectedIndex = this.option("selectedIndex");
        var loop = this.option("loop");
        var itemsCount = this._itemsCount();
        this._prevNavButton.show();
        this._nextNavButton.show();
        if (0 === itemsCount) {
            this._prevNavButton.hide();
            this._nextNavButton.hide()
        }
        if (loop) {
            return
        }
        var nextHidden = selectedIndex === itemsCount - this._itemsPerPage();
        var prevHidden = itemsCount < 2 || 0 === selectedIndex;
        if (this._dataSource && this._dataSource.paginate()) {
            nextHidden = nextHidden && this._isLastPage()
        } else {
            nextHidden = nextHidden || itemsCount < 2
        }
        if (prevHidden) {
            this._prevNavButton.hide()
        }
        if (nextHidden) {
            this._nextNavButton.hide()
        }
    },
    _setupSlideShow: function() {
        var that = this;
        var slideshowDelay = that.option("slideshowDelay");
        clearTimeout(that._slideshowTimer);
        if (!slideshowDelay) {
            return
        }
        that._slideshowTimer = setTimeout(function() {
            if (that._userInteraction) {
                that._setupSlideShow();
                return
            }
            that.nextItem(true).done(that._setupSlideShow)
        }, slideshowDelay)
    },
    _elementWidth: function() {
        if (!this._cacheElementWidth) {
            this._cacheElementWidth = this.$element().width()
        }
        return this._cacheElementWidth
    },
    _clearCacheWidth: function() {
        delete this._cacheElementWidth
    },
    _swipeStartHandler: function(e) {
        this._releaseInvisibleItems();
        this._clearCacheWidth();
        this._elementWidth();
        var itemsCount = this._itemsCount();
        if (!itemsCount) {
            e.event.cancel = true;
            return
        }
        this._stopItemAnimations();
        this._startSwipe();
        this._userInteraction = true;
        if (!this.option("loop")) {
            var selectedIndex = this.option("selectedIndex");
            var startOffset = itemsCount - selectedIndex - this._itemsPerPage();
            var endOffset = selectedIndex;
            var rtlEnabled = this.option("rtlEnabled");
            e.event.maxLeftOffset = rtlEnabled ? endOffset : startOffset;
            e.event.maxRightOffset = rtlEnabled ? startOffset : endOffset
        }
    },
    _stopItemAnimations: function() {
        _fx.default.stop(this._$container, true)
    },
    _swipeUpdateHandler: function(e) {
        var wrapAroundRatio = this.option("wrapAround") ? 1 : 0;
        var offset = this._offsetDirection() * e.event.offset * (this._itemsPerPage() + wrapAroundRatio) - this.option("selectedIndex");
        if (offset < 0) {
            this._loadNextPageIfNeeded(Math.ceil(Math.abs(offset)))
        }
        this._renderContainerPosition(offset)
    },
    _swipeEndHandler: function(e) {
        var targetOffset = e.event.targetOffset * this._offsetDirection() * this._itemsPerPage();
        var selectedIndex = this.option("selectedIndex");
        var newIndex = this._fitIndex(selectedIndex - targetOffset);
        var paginatedIndex = this._fitPaginatedIndex(newIndex);
        if (Math.abs(targetOffset) < this._itemsPerPage()) {
            this._relocateItems(selectedIndex);
            return
        }
        if (this._itemsPerPage() === this._itemsCount()) {
            if (targetOffset > 0) {
                this._relocateItems(-targetOffset)
            } else {
                this._relocateItems(0)
            }
            return
        }
        this.option("selectedIndex", paginatedIndex)
    },
    _setFocusOnSelect: function() {
        this._userInteraction = true;
        var selectedItem = this.itemElements().filter("." + GALLERY_ITEM_SELECTED_CLASS);
        this.option("focusedElement", (0, _element.getPublicElement)(selectedItem));
        this._userInteraction = false
    },
    _flipIndex: function(index) {
        var itemsCount = this._itemsCount();
        index %= itemsCount;
        if (index > (itemsCount + 1) / 2) {
            index -= itemsCount
        }
        if (index < -(itemsCount - 1) / 2) {
            index += itemsCount
        }
        return index
    },
    _fitIndex: function(index) {
        if (!this.option("loop")) {
            return index
        }
        var itemsCount = this._itemsCount();
        if (index >= itemsCount || index < 0) {
            this._goToGhostItem = true
        }
        if (index >= itemsCount) {
            index = itemsCount - index
        }
        index %= itemsCount;
        if (index < 0) {
            index += itemsCount
        }
        return index
    },
    _clean: function() {
        this.callBase();
        this._cleanIndicators();
        this._cleanNavButtons()
    },
    _dispose: function() {
        clearTimeout(this._slideshowTimer);
        this.callBase()
    },
    _updateSelection: function(addedSelection, removedSelection) {
        this._stopItemAnimations();
        this._renderNavButtonsVisibility();
        this._renderSelectedItem();
        this._relocateItems(addedSelection[0], removedSelection[0]);
        this._renderSelectedPageIndicator()
    },
    _relocateItems: function(newIndex, prevIndex, withoutAnimation) {
        if (void 0 === prevIndex) {
            prevIndex = newIndex
        }
        var indexOffset = this._calculateIndexOffset(newIndex, prevIndex);
        this._renderContainerPosition(indexOffset, true, this.option("animationEnabled") && !withoutAnimation).done(function() {
            this._setFocusOnSelect();
            this._userInteraction = false;
            this._setupSlideShow()
        })
    },
    _focusInHandler: function() {
        if (_fx.default.isAnimating(this._$container) || this._userInteraction) {
            return
        }
        this.callBase.apply(this, arguments)
    },
    _focusOutHandler: function() {
        if (_fx.default.isAnimating(this._$container) || this._userInteraction) {
            return
        }
        this.callBase.apply(this, arguments)
    },
    _selectFocusedItem: _common.noop,
    _moveFocus: function() {
        this._stopItemAnimations();
        this.callBase.apply(this, arguments);
        var index = this.itemElements().index((0, _renderer.default)(this.option("focusedElement")));
        this.goToItem(index, this.option("animationEnabled"))
    },
    _visibilityChanged: function(visible) {
        if (visible) {
            this._reviseDimensions()
        }
    },
    _calculateIndexOffset: function(newIndex, lastIndex) {
        if (void 0 === lastIndex) {
            lastIndex = newIndex
        }
        var indexOffset = lastIndex - newIndex;
        if (this.option("loop") && !this._needLongMove && this._goToGhostItem) {
            if (this._isItemOnFirstPage(newIndex) && this._isItemOnLastPage(lastIndex)) {
                indexOffset = -this._itemsPerPage()
            } else {
                if (this._isItemOnLastPage(newIndex) && this._isItemOnFirstPage(lastIndex)) {
                    indexOffset = this._itemsPerPage()
                }
            }
            this._goToGhostItem = false
        }
        this._needLongMove = false;
        indexOffset -= lastIndex;
        return indexOffset
    },
    _isItemOnLastPage: function(itemIndex) {
        return itemIndex >= this._itemsCount() - this._itemsPerPage()
    },
    _isItemOnFirstPage: function(itemIndex) {
        return itemIndex <= this._itemsPerPage()
    },
    _optionChanged: function(args) {
        switch (args.name) {
            case "width":
            case "initialItemWidth":
                this.callBase.apply(this, arguments);
                this._dimensionChanged();
                break;
            case "animationDuration":
                this._renderNavButtonsVisibility();
                break;
            case "animationEnabled":
                break;
            case "loop":
                this.$element().toggleClass(GALLERY_LOOP_CLASS, args.value);
                this.option("loopItemFocus", args.value);
                if ((0, _window.hasWindow)()) {
                    this._cloneDuplicateItems();
                    this._renderItemPositions();
                    this._renderNavButtonsVisibility()
                }
                break;
            case "showIndicator":
                this._renderIndicator();
                break;
            case "showNavButtons":
                this._renderNavButtons();
                break;
            case "slideshowDelay":
                this._setupSlideShow();
                break;
            case "wrapAround":
            case "stretchImages":
                if ((0, _window.hasWindow)()) {
                    this._renderItemSizes();
                    this._renderItemPositions();
                    this._renderItemVisibility()
                }
                break;
            case "swipeEnabled":
                this._renderUserInteraction();
                break;
            case "indicatorEnabled":
                this._toggleIndicatorInteraction(args.value);
                break;
            default:
                this.callBase(args)
        }
    },
    goToItem: function(itemIndex, animation) {
        var selectedIndex = this.option("selectedIndex");
        var itemsCount = this._itemsCount();
        if (void 0 !== animation) {
            this._animationOverride = animation
        }
        itemIndex = this._fitIndex(itemIndex);
        this._deferredAnimate = new _deferred.Deferred;
        if (itemIndex > itemsCount - 1 || itemIndex < 0 || selectedIndex === itemIndex) {
            return this._deferredAnimate.resolveWith(this).promise()
        }
        this.option("selectedIndex", itemIndex);
        return this._deferredAnimate.promise()
    },
    prevItem: function(animation) {
        return this.goToItem(this.option("selectedIndex") - 1, animation)
    },
    nextItem: function(animation) {
        return this.goToItem(this.option("selectedIndex") + 1, animation)
    }
});
(0, _component_registrator.default)("dxGallery", Gallery);
var _default = Gallery;
exports.default = _default;
module.exports = exports.default;
module.exports.default = module.exports;
