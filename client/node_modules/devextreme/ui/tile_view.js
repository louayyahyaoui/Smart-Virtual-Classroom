/**
 * DevExtreme (ui/tile_view.js)
 * Version: 20.2.6
 * Build date: Tue Mar 16 2021
 *
 * Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
exports.default = void 0;
var _renderer = _interopRequireDefault(require("../core/renderer"));
var _devices = _interopRequireDefault(require("../core/devices"));
var _component_registrator = _interopRequireDefault(require("../core/component_registrator"));
var _inflector = require("../core/utils/inflector");
var _iterator = require("../core/utils/iterator");
var _type = require("../core/utils/type");
var _extend = require("../core/utils/extend");
var _window = require("../core/utils/window");
var _element = require("../core/element");
var _common = require("../core/utils/common");
var _scroll_view = _interopRequireDefault(require("./scroll_view"));
var _uiCollection_widget = _interopRequireDefault(require("./collection/ui.collection_widget.edit"));

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        "default": obj
    }
}
var TILEVIEW_CLASS = "dx-tileview";
var TILEVIEW_CONTAINER_CLASS = "dx-tileview-wrapper";
var TILEVIEW_ITEM_CLASS = "dx-tile";
var TILEVIEW_ITEM_SELECTOR = "." + TILEVIEW_ITEM_CLASS;
var TILEVIEW_ITEM_DATA_KEY = "dxTileData";
var CONFIGS = {
    horizontal: {
        itemMainRatio: "widthRatio",
        itemCrossRatio: "heightRatio",
        baseItemMainDimension: "baseItemWidth",
        baseItemCrossDimension: "baseItemHeight",
        mainDimension: "width",
        crossDimension: "height",
        mainPosition: "left",
        crossPosition: "top"
    },
    vertical: {
        itemMainRatio: "heightRatio",
        itemCrossRatio: "widthRatio",
        baseItemMainDimension: "baseItemHeight",
        baseItemCrossDimension: "baseItemWidth",
        mainDimension: "height",
        crossDimension: "width",
        mainPosition: "top",
        crossPosition: "left"
    }
};
var TileView = _uiCollection_widget.default.inherit({
    _activeStateUnit: TILEVIEW_ITEM_SELECTOR,
    _getDefaultOptions: function() {
        return (0, _extend.extend)(this.callBase(), {
            items: null,
            direction: "horizontal",
            hoverStateEnabled: true,
            showScrollbar: false,
            height: 500,
            baseItemWidth: 100,
            baseItemHeight: 100,
            itemMargin: 20,
            activeStateEnabled: true,
            indicateLoading: true
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
        return TILEVIEW_ITEM_CLASS
    },
    _itemDataKey: function() {
        return TILEVIEW_ITEM_DATA_KEY
    },
    _itemContainer: function() {
        return this._$container
    },
    _init: function() {
        this.callBase();
        this.$element().addClass(TILEVIEW_CLASS);
        this._initScrollView()
    },
    _dataSourceLoadingChangedHandler: function(isLoading) {
        var scrollView = this._scrollView;
        if (!scrollView || !scrollView.startLoading) {
            return
        }
        if (isLoading && this.option("indicateLoading")) {
            scrollView.startLoading()
        } else {
            scrollView.finishLoading()
        }
    },
    _hideLoadingIfLoadIndicationOff: function() {
        if (!this.option("indicateLoading")) {
            this._dataSourceLoadingChangedHandler(false)
        }
    },
    _initScrollView: function() {
        this._scrollView = this._createComponent(this.$element(), _scroll_view.default, {
            direction: this.option("direction"),
            scrollByContent: true,
            useKeyboard: false,
            showScrollbar: this.option("showScrollbar")
        });
        this._$container = (0, _renderer.default)(this._scrollView.content());
        this._$container.addClass(TILEVIEW_CONTAINER_CLASS);
        this._scrollView.option("onUpdated", this._renderGeometry.bind(this))
    },
    _initMarkup: function() {
        this.callBase();
        (0, _common.deferRender)(function() {
            this._cellsPerDimension = 1;
            this._renderGeometry();
            this._updateScrollView();
            this._fireContentReadyAction()
        }.bind(this))
    },
    _updateScrollView: function() {
        this._scrollView.option("direction", this.option("direction"));
        this._scrollView.update();
        this._indicateLoadingIfAlreadyStarted()
    },
    _indicateLoadingIfAlreadyStarted: function() {
        if (this._isDataSourceLoading()) {
            this._dataSourceLoadingChangedHandler(true)
        }
    },
    _renderGeometry: function() {
        this._config = CONFIGS[this.option("direction")];
        var items = this.option("items") || [];
        var config = this._config;
        var itemMargin = this.option("itemMargin");
        var maxItemCrossRatio = Math.max.apply(Math, (0, _iterator.map)(items || [], function(item) {
            return Math.round(item[config.itemCrossRatio] || 1)
        }));
        var crossDimensionValue = (0, _window.hasWindow)() ? this.$element()[config.crossDimension]() : parseInt(this.$element().get(0).style[config.crossDimension]);
        this._cellsPerDimension = Math.floor(crossDimensionValue / (this.option(config.baseItemCrossDimension) + itemMargin));
        this._cellsPerDimension = Math.max(this._cellsPerDimension, maxItemCrossRatio);
        this._cells = [];
        this._cells.push(new Array(this._cellsPerDimension));
        this._arrangeItems(items);
        this._renderContentSize(config, itemMargin)
    },
    _renderContentSize: function(_ref, itemMargin) {
        var mainDimension = _ref.mainDimension,
            baseItemMainDimension = _ref.baseItemMainDimension;
        if ((0, _window.hasWindow)()) {
            var actualContentSize = this._cells.length * this.option(baseItemMainDimension) + (this._cells.length + 1) * itemMargin;
            var elementSize = this.$element()[mainDimension]();
            this._$container[mainDimension](Math.max(actualContentSize, elementSize))
        }
    },
    _arrangeItems: function(items) {
        var config = this._config;
        var itemMainRatio = config.itemMainRatio;
        var itemCrossRatio = config.itemCrossRatio;
        var mainPosition = config.mainPosition;
        this._itemsPositions = [];
        (0, _iterator.each)(items, function(index, item) {
            var currentItem = {};
            currentItem[itemMainRatio] = item[itemMainRatio] || 1;
            currentItem[itemCrossRatio] = item[itemCrossRatio] || 1;
            currentItem.index = index;
            currentItem[itemMainRatio] = currentItem[itemMainRatio] <= 0 ? 0 : Math.round(currentItem[config.itemMainRatio]);
            currentItem[itemCrossRatio] = currentItem[itemCrossRatio] <= 0 ? 0 : Math.round(currentItem[config.itemCrossRatio]);
            var itemPosition = this._getItemPosition(currentItem);
            if (itemPosition[mainPosition] === -1) {
                itemPosition[mainPosition] = this._cells.push(new Array(this._cellsPerDimension)) - 1
            }
            this._occupyCells(currentItem, itemPosition);
            this._arrangeItem(currentItem, itemPosition);
            this._itemsPositions.push(itemPosition)
        }.bind(this))
    },
    _getItemPosition: function(item) {
        var config = this._config;
        var mainPosition = config.mainPosition;
        var crossPosition = config.crossPosition;
        var position = {};
        position[mainPosition] = -1;
        position[crossPosition] = 0;
        for (var main = 0; main < this._cells.length; main++) {
            for (var cross = 0; cross < this._cellsPerDimension; cross++) {
                if (this._itemFit(main, cross, item)) {
                    position[mainPosition] = main;
                    position[crossPosition] = cross;
                    break
                }
            }
            if (position[mainPosition] > -1) {
                break
            }
        }
        return position
    },
    _itemFit: function(mainPosition, crossPosition, item) {
        var result = true;
        var config = this._config;
        var itemRatioMain = item[config.itemMainRatio];
        var itemRatioCross = item[config.itemCrossRatio];
        if (crossPosition + itemRatioCross > this._cellsPerDimension) {
            return false
        }
        for (var main = mainPosition; main < mainPosition + itemRatioMain; main++) {
            for (var cross = crossPosition; cross < crossPosition + itemRatioCross; cross++) {
                if (this._cells.length - 1 < main) {
                    this._cells.push(new Array(this._cellsPerDimension))
                } else {
                    if (void 0 !== this._cells[main][cross]) {
                        result = false;
                        break
                    }
                }
            }
        }
        return result
    },
    _occupyCells: function(item, itemPosition) {
        var config = this._config;
        var itemPositionMain = itemPosition[config.mainPosition];
        var itemPositionCross = itemPosition[config.crossPosition];
        var itemRatioMain = item[config.itemMainRatio];
        var itemRatioCross = item[config.itemCrossRatio];
        for (var main = itemPositionMain; main < itemPositionMain + itemRatioMain; main++) {
            for (var cross = itemPositionCross; cross < itemPositionCross + itemRatioCross; cross++) {
                this._cells[main][cross] = item.index
            }
        }
    },
    _arrangeItem: function(item, itemPosition) {
        var config = this._config;
        var itemPositionMain = itemPosition[config.mainPosition];
        var itemPositionCross = itemPosition[config.crossPosition];
        var itemRatioMain = item[config.itemMainRatio];
        var itemRatioCross = item[config.itemCrossRatio];
        var baseItemCross = this.option(config.baseItemCrossDimension);
        var baseItemMain = this.option(config.baseItemMainDimension);
        var itemMargin = this.option("itemMargin");
        var cssProps = {
            display: itemRatioMain <= 0 || itemRatioCross <= 0 ? "none" : ""
        };
        var mainDimension = itemRatioMain * baseItemMain + (itemRatioMain - 1) * itemMargin;
        var crossDimension = itemRatioCross * baseItemCross + (itemRatioCross - 1) * itemMargin;
        cssProps[config.mainDimension] = mainDimension < 0 ? 0 : mainDimension;
        cssProps[config.crossDimension] = crossDimension < 0 ? 0 : crossDimension;
        cssProps[config.mainPosition] = itemPositionMain * baseItemMain + (itemPositionMain + 1) * itemMargin;
        cssProps[config.crossPosition] = itemPositionCross * baseItemCross + (itemPositionCross + 1) * itemMargin;
        if (this.option("rtlEnabled")) {
            var offsetCorrection = this._$container.width();
            var baseItemWidth = this.option("baseItemWidth");
            var itemPositionX = itemPosition.left;
            var offsetPosition = itemPositionX * baseItemWidth;
            var itemBaseOffset = baseItemWidth + itemMargin;
            var itemWidth = itemBaseOffset * item.widthRatio;
            var subItemMargins = itemPositionX * itemMargin;
            cssProps.left = offsetCorrection - (offsetPosition + itemWidth + subItemMargins)
        }
        this._itemElements().eq(item.index).css(cssProps)
    },
    _moveFocus: function(location) {
        var FOCUS_UP = "up";
        var FOCUS_DOWN = "down";
        var FOCUS_LEFT = this.option("rtlEnabled") ? "right" : "left";
        var FOCUS_RIGHT = this.option("rtlEnabled") ? "left" : "right";
        var FOCUS_PAGE_UP = "pageup";
        var FOCUS_PAGE_DOWN = "pagedown";
        var horizontalDirection = "horizontal" === this.option("direction");
        var cells = this._cells;
        var index = (0, _renderer.default)(this.option("focusedElement")).index();
        var targetCol = this._itemsPositions[index].left;
        var targetRow = this._itemsPositions[index].top;
        var colCount = (horizontalDirection ? cells : cells[0]).length;
        var rowCount = (horizontalDirection ? cells[0] : cells).length;
        var getCell = function(col, row) {
            if (horizontalDirection) {
                return cells[col][row]
            }
            return cells[row][col]
        };
        switch (location) {
            case FOCUS_PAGE_UP:
            case FOCUS_UP:
                while (targetRow > 0 && index === getCell(targetCol, targetRow)) {
                    targetRow--
                }
                if (targetRow < 0) {
                    targetRow = 0
                }
                break;
            case FOCUS_PAGE_DOWN:
            case FOCUS_DOWN:
                while (targetRow < rowCount && index === getCell(targetCol, targetRow)) {
                    targetRow++
                }
                if (targetRow === rowCount) {
                    targetRow = rowCount - 1
                }
                break;
            case FOCUS_RIGHT:
                while (targetCol < colCount && index === getCell(targetCol, targetRow)) {
                    targetCol++
                }
                if (targetCol === colCount) {
                    targetCol = colCount - 1
                }
                break;
            case FOCUS_LEFT:
                while (targetCol >= 0 && index === getCell(targetCol, targetRow)) {
                    targetCol--
                }
                if (targetCol < 0) {
                    targetCol = 0
                }
                break;
            default:
                this.callBase.apply(this, arguments);
                return
        }
        var newTargetIndex = getCell(targetCol, targetRow);
        if (!(0, _type.isDefined)(newTargetIndex)) {
            return
        }
        var $newTarget = this._itemElements().eq(newTargetIndex);
        this.option("focusedElement", (0, _element.getPublicElement)($newTarget));
        this._scrollToItem($newTarget)
    },
    _scrollToItem: function($itemElement) {
        if (!$itemElement.length) {
            return
        }
        var config = this._config;
        var outerMainProp = "outer" + (0, _inflector.captionize)(config.mainDimension);
        var itemMargin = this.option("itemMargin");
        var itemPosition = $itemElement.position()[config.mainPosition];
        var itemDimension = $itemElement[outerMainProp]();
        var itemTail = itemPosition + itemDimension;
        var scrollPosition = this.scrollPosition();
        var clientWidth = this.$element()[outerMainProp]();
        if (scrollPosition <= itemPosition && itemTail <= scrollPosition + clientWidth) {
            return
        }
        if (scrollPosition > itemPosition) {
            this._scrollView.scrollTo(itemPosition - itemMargin)
        } else {
            this._scrollView.scrollTo(itemPosition + itemDimension - clientWidth + itemMargin)
        }
    },
    _optionChanged: function(args) {
        switch (args.name) {
            case "items":
                this.callBase(args);
                this._renderGeometry();
                this._updateScrollView();
                break;
            case "showScrollbar":
                this._initScrollView();
                break;
            case "disabled":
                this._scrollView.option("disabled", args.value);
                this.callBase(args);
                break;
            case "baseItemWidth":
            case "baseItemHeight":
            case "itemMargin":
                this._renderGeometry();
                break;
            case "width":
            case "height":
                this.callBase(args);
                this._renderGeometry();
                this._updateScrollView();
                break;
            case "direction":
                this._renderGeometry();
                this._updateScrollView();
                break;
            case "indicateLoading":
                this._hideLoadingIfLoadIndicationOff();
                break;
            default:
                this.callBase(args)
        }
    },
    scrollPosition: function() {
        return this._scrollView.scrollOffset()[this._config.mainPosition]
    }
});
(0, _component_registrator.default)("dxTileView", TileView);
var _default = TileView;
exports.default = _default;
module.exports = exports.default;
module.exports.default = module.exports;
