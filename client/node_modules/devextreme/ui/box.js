/**
 * DevExtreme (ui/box.js)
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
var _extend = require("../core/utils/extend");
var _common = require("../core/utils/common");
var _window = require("../core/utils/window");
var _inflector = require("../core/utils/inflector");
var _type = require("../core/utils/type");
var _style = require("../core/utils/style");
var _iterator = require("../core/utils/iterator");
var _browser = _interopRequireDefault(require("../core/utils/browser"));
var _item = _interopRequireDefault(require("./collection/item"));
var _uiCollection_widget = _interopRequireDefault(require("./collection/ui.collection_widget.edit"));

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
var BOX_CLASS = "dx-box";
var BOX_SELECTOR = ".dx-box";
var BOX_ITEM_CLASS = "dx-box-item";
var BOX_ITEM_DATA_KEY = "dxBoxItemData";
var MINSIZE_MAP = {
    row: "minWidth",
    col: "minHeight"
};
var MAXSIZE_MAP = {
    row: "maxWidth",
    col: "maxHeight"
};
var SHRINK = 1;
var FLEX_JUSTIFY_CONTENT_MAP = {
    start: "flex-start",
    end: "flex-end",
    center: "center",
    "space-between": "space-between",
    "space-around": "space-around"
};
var FLEX_ALIGN_ITEMS_MAP = {
    start: "flex-start",
    end: "flex-end",
    center: "center",
    stretch: "stretch"
};
var FLEX_DIRECTION_MAP = {
    row: "row",
    col: "column"
};
var setFlexProp = function(element, prop, value) {
    value = (0, _style.normalizeStyleProp)(prop, value);
    element.style[(0, _style.styleProp)(prop)] = value;
    if (!(0, _window.hasWindow)()) {
        if ("" === value || !(0, _type.isDefined)(value)) {
            return
        }
        var cssName = (0, _inflector.dasherize)(prop);
        var styleExpr = cssName + ": " + value + ";";
        if (!element.attributes.style) {
            element.setAttribute("style", styleExpr)
        } else {
            if (element.attributes.style.value.indexOf(styleExpr) < 0) {
                element.attributes.style.value += " " + styleExpr
            }
        }
    }
};
var BOX_EVENTNAMESPACE = "dxBox";
var UPDATE_EVENT = "dxupdate." + BOX_EVENTNAMESPACE;
var FALLBACK_BOX_ITEM = "dx-box-fallback-item";
var FALLBACK_WRAP_MAP = {
    row: "nowrap",
    col: "normal"
};
var FALLBACK_MAIN_SIZE_MAP = {
    row: "width",
    col: "height"
};
var FALLBACK_CROSS_SIZE_MAP = {
    row: "height",
    col: "width"
};
var FALLBACK_PRE_MARGIN_MAP = {
    row: "marginLeft",
    col: "marginTop"
};
var FALLBACK_POST_MARGIN_MAP = {
    row: "marginRight",
    col: "marginBottom"
};
var FALLBACK_CROSS_PRE_MARGIN_MAP = {
    row: "marginTop",
    col: "marginLeft"
};
var FALLBACK_CROSS_POST_MARGIN_MAP = {
    row: "marginBottom",
    col: "marginRight"
};
var MARGINS_RTL_FLIP_MAP = {
    marginLeft: "marginRight",
    marginRight: "marginLeft"
};
var BoxItem = function(_CollectionWidgetItem) {
    _inheritsLoose(BoxItem, _CollectionWidgetItem);

    function BoxItem() {
        return _CollectionWidgetItem.apply(this, arguments) || this
    }
    var _proto = BoxItem.prototype;
    _proto._renderVisible = function(value, oldValue) {
        _CollectionWidgetItem.prototype._renderVisible.call(this, value);
        if ((0, _type.isDefined)(oldValue)) {
            this._options.fireItemStateChangedAction({
                name: "visible",
                state: value,
                oldState: oldValue
            })
        }
    };
    return BoxItem
}(_item.default);
var FlexLayoutStrategy = function() {
    function FlexLayoutStrategy($element, option) {
        this._$element = $element;
        this._option = option;
        this.initSize = _common.noop;
        this.update = _common.noop
    }
    var _proto2 = FlexLayoutStrategy.prototype;
    _proto2.renderBox = function() {
        this._$element.css({
            display: (0, _style.stylePropPrefix)("flexDirection") + "flex"
        });
        setFlexProp(this._$element.get(0), "flexDirection", FLEX_DIRECTION_MAP[this._option("direction")])
    };
    _proto2.renderAlign = function() {
        this._$element.css({
            justifyContent: this._normalizedAlign()
        })
    };
    _proto2._normalizedAlign = function() {
        var align = this._option("align");
        return align in FLEX_JUSTIFY_CONTENT_MAP ? FLEX_JUSTIFY_CONTENT_MAP[align] : align
    };
    _proto2.renderCrossAlign = function() {
        this._$element.css({
            alignItems: this._normalizedCrossAlign()
        })
    };
    _proto2._normalizedCrossAlign = function() {
        var crossAlign = this._option("crossAlign");
        return crossAlign in FLEX_ALIGN_ITEMS_MAP ? FLEX_ALIGN_ITEMS_MAP[crossAlign] : crossAlign
    };
    _proto2.renderItems = function($items) {
        var flexPropPrefix = (0, _style.stylePropPrefix)("flexDirection");
        var direction = this._option("direction");
        (0, _iterator.each)($items, function() {
            var $item = (0, _renderer.default)(this);
            var item = $item.data(BOX_ITEM_DATA_KEY);
            $item.css({
                display: flexPropPrefix + "flex"
            }).css(MAXSIZE_MAP[direction], item.maxSize || "none").css(MINSIZE_MAP[direction], item.minSize || "0");
            setFlexProp($item.get(0), "flexBasis", item.baseSize || 0);
            setFlexProp($item.get(0), "flexGrow", item.ratio);
            setFlexProp($item.get(0), "flexShrink", (0, _type.isDefined)(item.shrink) ? item.shrink : SHRINK);
            $item.children().each(function(_, itemContent) {
                (0, _renderer.default)(itemContent).css({
                    width: "auto",
                    height: "auto",
                    display: (0, _style.stylePropPrefix)("flexDirection") + "flex",
                    flexBasis: 0
                });
                setFlexProp(itemContent, "flexGrow", 1);
                setFlexProp(itemContent, "flexDirection", (0, _renderer.default)(itemContent)[0].style.flexDirection || "column")
            })
        })
    };
    return FlexLayoutStrategy
}();
var FallbackLayoutStrategy = function() {
    function FallbackLayoutStrategy($element, option) {
        this._$element = $element;
        this._option = option
    }
    var _proto3 = FallbackLayoutStrategy.prototype;
    _proto3.renderBox = function() {
        this._$element.css({
            fontSize: 0,
            whiteSpace: FALLBACK_WRAP_MAP[this._option("direction")],
            verticalAlign: "top"
        });
        _events_engine.default.off(this._$element, UPDATE_EVENT);
        _events_engine.default.on(this._$element, UPDATE_EVENT, this.update.bind(this))
    };
    _proto3.renderAlign = function() {
        var $items = this._$items;
        if (!$items) {
            return
        }
        var align = this._option("align");
        var totalItemSize = this.totalItemSize;
        var direction = this._option("direction");
        var boxSize = this._$element[FALLBACK_MAIN_SIZE_MAP[direction]]();
        var freeSpace = boxSize - totalItemSize;
        var shift = 0;
        this._setItemsMargins($items, direction, 0);
        switch (align) {
            case "start":
                break;
            case "end":
                shift = freeSpace;
                $items.first().css(this._chooseMarginSide(FALLBACK_PRE_MARGIN_MAP[direction]), shift);
                break;
            case "center":
                shift = .5 * freeSpace;
                $items.first().css(this._chooseMarginSide(FALLBACK_PRE_MARGIN_MAP[direction]), shift);
                $items.last().css(this._chooseMarginSide(FALLBACK_POST_MARGIN_MAP[direction]), shift);
                break;
            case "space-between":
                shift = .5 * freeSpace / ($items.length - 1);
                this._setItemsMargins($items, direction, shift);
                $items.first().css(this._chooseMarginSide(FALLBACK_PRE_MARGIN_MAP[direction]), 0);
                $items.last().css(this._chooseMarginSide(FALLBACK_POST_MARGIN_MAP[direction]), 0);
                break;
            case "space-around":
                shift = .5 * freeSpace / $items.length;
                this._setItemsMargins($items, direction, shift)
        }
    };
    _proto3._setItemsMargins = function($items, direction, shift) {
        $items.css(this._chooseMarginSide(FALLBACK_PRE_MARGIN_MAP[direction]), shift).css(this._chooseMarginSide(FALLBACK_POST_MARGIN_MAP[direction]), shift)
    };
    _proto3.renderCrossAlign = function() {
        var $items = this._$items;
        if (!$items) {
            return
        }
        var crossAlign = this._option("crossAlign");
        var direction = this._option("direction");
        var size = this._$element[FALLBACK_CROSS_SIZE_MAP[direction]]();
        var that = this;
        switch (crossAlign) {
            case "start":
                break;
            case "end":
                (0, _iterator.each)($items, function() {
                    var $item = (0, _renderer.default)(this);
                    var itemSize = $item[FALLBACK_CROSS_SIZE_MAP[direction]]();
                    var shift = size - itemSize;
                    $item.css(that._chooseMarginSide(FALLBACK_CROSS_PRE_MARGIN_MAP[direction]), shift)
                });
                break;
            case "center":
                (0, _iterator.each)($items, function() {
                    var $item = (0, _renderer.default)(this);
                    var itemSize = $item[FALLBACK_CROSS_SIZE_MAP[direction]]();
                    var shift = .5 * (size - itemSize);
                    $item.css(that._chooseMarginSide(FALLBACK_CROSS_PRE_MARGIN_MAP[direction]), shift).css(that._chooseMarginSide(FALLBACK_CROSS_POST_MARGIN_MAP[direction]), shift)
                });
                break;
            case "stretch":
                $items.css(that._chooseMarginSide(FALLBACK_CROSS_PRE_MARGIN_MAP[direction]), 0).css(that._chooseMarginSide(FALLBACK_CROSS_POST_MARGIN_MAP[direction]), 0).css(FALLBACK_CROSS_SIZE_MAP[direction], "100%")
        }
    };
    _proto3._chooseMarginSide = function(value) {
        if (!this._option("rtlEnabled")) {
            return value
        }
        return MARGINS_RTL_FLIP_MAP[value] || value
    };
    _proto3.renderItems = function($items) {
        var _this = this;
        this._$items = $items;
        var direction = this._option("direction");
        var totalRatio = 0;
        var totalWeightedShrink = 0;
        var totalBaseSize = 0;
        (0, _iterator.each)($items, function(_, item) {
            var $item = (0, _renderer.default)(item);
            $item.css({
                display: "inline-block",
                verticalAlign: "top"
            });
            $item[FALLBACK_MAIN_SIZE_MAP[direction]]("auto");
            $item.removeClass(FALLBACK_BOX_ITEM);
            var itemData = $item.data(BOX_ITEM_DATA_KEY);
            var ratio = itemData.ratio || 0;
            var size = _this._baseSize($item);
            var shrink = (0, _type.isDefined)(itemData.shrink) ? itemData.shrink : SHRINK;
            totalRatio += ratio;
            totalWeightedShrink += shrink * size;
            totalBaseSize += size
        });
        var freeSpaceSize = this._boxSize() - totalBaseSize;
        var itemSize = function($item) {
            var itemData = $item.data(BOX_ITEM_DATA_KEY);
            var size = _this._baseSize($item);
            var factor = freeSpaceSize >= 0 ? itemData.ratio || 0 : ((0, _type.isDefined)(itemData.shrink) ? itemData.shrink : SHRINK) * size;
            var totalFactor = freeSpaceSize >= 0 ? totalRatio : totalWeightedShrink;
            var shift = totalFactor ? Math.round(freeSpaceSize * factor / totalFactor) : 0;
            return size + shift
        };
        var totalItemSize = 0;
        (0, _iterator.each)($items, function(_, item) {
            var $item = (0, _renderer.default)(item);
            var itemData = (0, _renderer.default)(item).data(BOX_ITEM_DATA_KEY);
            var size = itemSize($item);
            totalItemSize += size;
            $item.css(MAXSIZE_MAP[direction], itemData.maxSize || "none").css(MINSIZE_MAP[direction], itemData.minSize || "0").css(FALLBACK_MAIN_SIZE_MAP[direction], size);
            $item.addClass(FALLBACK_BOX_ITEM)
        });
        this.totalItemSize = totalItemSize
    };
    _proto3._baseSize = function(item) {
        var itemData = (0, _renderer.default)(item).data(BOX_ITEM_DATA_KEY);
        return null == itemData.baseSize ? 0 : "auto" === itemData.baseSize ? this._contentSize(item) : this._parseSize(itemData.baseSize)
    };
    _proto3._contentSize = function(item) {
        return (0, _renderer.default)(item)[FALLBACK_MAIN_SIZE_MAP[this._option("direction")]]()
    };
    _proto3._parseSize = function(size) {
        return String(size).match(/.+%$/) ? .01 * parseFloat(size) * this._boxSizeValue : size
    };
    _proto3._boxSize = function(value) {
        if (!arguments.length) {
            this._boxSizeValue = this._boxSizeValue || this._totalBaseSize();
            return this._boxSizeValue
        }
        this._boxSizeValue = value
    };
    _proto3._totalBaseSize = function() {
        var _this2 = this;
        var result = 0;
        (0, _iterator.each)(this._$items, function(_, item) {
            result += _this2._baseSize(item)
        });
        return result
    };
    _proto3.initSize = function() {
        this._boxSize(this._$element[FALLBACK_MAIN_SIZE_MAP[this._option("direction")]]())
    };
    _proto3.update = function() {
        if (!this._$items || this._$element.is(":hidden")) {
            return
        }
        this._$items.detach();
        this.initSize();
        this._$element.append(this._$items);
        this.renderItems(this._$items);
        this.renderAlign();
        this.renderCrossAlign();
        var element = this._$element.get(0);
        this._$items.find(BOX_SELECTOR).each(function() {
            if (element === (0, _renderer.default)(this).parent().closest(BOX_SELECTOR).get(0)) {
                _events_engine.default.triggerHandler(this, UPDATE_EVENT)
            }
        })
    };
    return FallbackLayoutStrategy
}();
var Box = function(_CollectionWidget) {
    _inheritsLoose(Box, _CollectionWidget);

    function Box() {
        return _CollectionWidget.apply(this, arguments) || this
    }
    var _proto4 = Box.prototype;
    _proto4._getDefaultOptions = function() {
        return (0, _extend.extend)(_CollectionWidget.prototype._getDefaultOptions.call(this), {
            direction: "row",
            align: "start",
            crossAlign: "stretch",
            activeStateEnabled: false,
            focusStateEnabled: false,
            onItemStateChanged: void 0,
            _layoutStrategy: "flex",
            _queue: void 0
        })
    };
    _proto4._defaultOptionsRules = function() {
        return _CollectionWidget.prototype._defaultOptionsRules.call(this).concat([{
            device: function() {
                return _browser.default.msie
            },
            options: {
                _layoutStrategy: "fallback"
            }
        }])
    };
    _proto4._itemClass = function() {
        return BOX_ITEM_CLASS
    };
    _proto4._itemDataKey = function() {
        return BOX_ITEM_DATA_KEY
    };
    _proto4._itemElements = function() {
        return this._itemContainer().children(this._itemSelector())
    };
    _proto4._init = function() {
        _CollectionWidget.prototype._init.call(this);
        this.$element().addClass("".concat(BOX_CLASS, "-").concat(this.option("_layoutStrategy")));
        this._initLayout();
        this._initBoxQueue()
    };
    _proto4._initLayout = function() {
        this._layout = "fallback" === this.option("_layoutStrategy") ? new FallbackLayoutStrategy(this.$element(), this.option.bind(this)) : new FlexLayoutStrategy(this.$element(), this.option.bind(this))
    };
    _proto4._initBoxQueue = function() {
        this._queue = this.option("_queue") || []
    };
    _proto4._queueIsNotEmpty = function() {
        return this.option("_queue") ? false : !!this._queue.length
    };
    _proto4._pushItemToQueue = function($item, config) {
        this._queue.push({
            $item: $item,
            config: config
        })
    };
    _proto4._shiftItemFromQueue = function() {
        return this._queue.shift()
    };
    _proto4._initMarkup = function() {
        this.$element().addClass(BOX_CLASS);
        this._layout.renderBox();
        _CollectionWidget.prototype._initMarkup.call(this);
        this._renderAlign();
        this._renderActions()
    };
    _proto4._renderActions = function() {
        this._onItemStateChanged = this._createActionByOption("onItemStateChanged")
    };
    _proto4._renderAlign = function() {
        this._layout.renderAlign();
        this._layout.renderCrossAlign()
    };
    _proto4._renderItems = function(items) {
        var _this3 = this;
        this._layout.initSize();
        _CollectionWidget.prototype._renderItems.call(this, items);
        while (this._queueIsNotEmpty()) {
            var item = this._shiftItemFromQueue();
            this._createComponent(item.$item, Box, (0, _extend.extend)({
                _layoutStrategy: this.option("_layoutStrategy"),
                itemTemplate: this.option("itemTemplate"),
                itemHoldTimeout: this.option("itemHoldTimeout"),
                onItemHold: this.option("onItemHold"),
                onItemClick: this.option("onItemClick"),
                onItemContextMenu: this.option("onItemContextMenu"),
                onItemRendered: this.option("onItemRendered"),
                _queue: this._queue
            }, item.config))
        }
        this._layout.renderItems(this._itemElements());
        clearTimeout(this._updateTimer);
        this._updateTimer = setTimeout(function() {
            if (!_this3._isUpdated) {
                _this3._layout.update()
            }
            _this3._isUpdated = false;
            _this3._updateTimer = null
        })
    };
    _proto4._renderItemContent = function(args) {
        var $itemNode = args.itemData && args.itemData.node;
        if ($itemNode) {
            return this._renderItemContentByNode(args, $itemNode)
        }
        return _CollectionWidget.prototype._renderItemContent.call(this, args)
    };
    _proto4._postprocessRenderItem = function(args) {
        var boxConfig = args.itemData.box;
        if (!boxConfig) {
            return
        }
        this._pushItemToQueue(args.itemContent, boxConfig)
    };
    _proto4._createItemByTemplate = function(itemTemplate, args) {
        if (args.itemData.box) {
            return itemTemplate.source ? itemTemplate.source() : (0, _renderer.default)()
        }
        return _CollectionWidget.prototype._createItemByTemplate.call(this, itemTemplate, args)
    };
    _proto4._visibilityChanged = function(visible) {
        if (visible) {
            this._dimensionChanged()
        }
    };
    _proto4._dimensionChanged = function() {
        if (this._updateTimer) {
            return
        }
        this._isUpdated = true;
        this._layout.update()
    };
    _proto4._dispose = function() {
        clearTimeout(this._updateTimer);
        _CollectionWidget.prototype._dispose.apply(this, arguments)
    };
    _proto4._itemOptionChanged = function(item, property, value, oldValue) {
        if ("visible" === property) {
            this._onItemStateChanged({
                name: property,
                state: value,
                oldState: false !== oldValue
            })
        }
        _CollectionWidget.prototype._itemOptionChanged.call(this, item, property, value)
    };
    _proto4._optionChanged = function(args) {
        switch (args.name) {
            case "_layoutStrategy":
            case "_queue":
            case "direction":
                this._invalidate();
                break;
            case "align":
                this._layout.renderAlign();
                break;
            case "crossAlign":
                this._layout.renderCrossAlign();
                break;
            default:
                _CollectionWidget.prototype._optionChanged.call(this, args)
        }
    };
    _proto4._itemOptions = function() {
        var _this4 = this;
        var options = _CollectionWidget.prototype._itemOptions.call(this);
        options.fireItemStateChangedAction = function(e) {
            _this4._onItemStateChanged(e)
        };
        return options
    };
    _proto4.repaint = function() {
        this._dimensionChanged()
    };
    return Box
}(_uiCollection_widget.default);
Box.ItemClass = BoxItem;
(0, _component_registrator.default)("dxBox", Box);
var _default = Box;
exports.default = _default;
module.exports = exports.default;
module.exports.default = module.exports;
