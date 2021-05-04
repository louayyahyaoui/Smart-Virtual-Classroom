/**
 * DevExtreme (ui/collection/ui.collection_widget.base.js)
 * Version: 20.2.6
 * Build date: Tue Mar 16 2021
 *
 * Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
exports.default = void 0;
var _renderer = _interopRequireDefault(require("../../core/renderer"));
var _events_engine = _interopRequireDefault(require("../../events/core/events_engine"));
var _common = require("../../core/utils/common");
var _template_manager = require("../../core/utils/template_manager");
var _element = require("../../core/element");
var _dom_adapter = _interopRequireDefault(require("../../core/dom_adapter"));
var _type = require("../../core/utils/type");
var _deferred = require("../../core/utils/deferred");
var _extend = require("../../core/utils/extend");
var _array = require("../../core/utils/array");
var _iterator = require("../../core/utils/iterator");
var _action = _interopRequireDefault(require("../../core/action"));
var _guid = _interopRequireDefault(require("../../core/guid"));
var _ui = _interopRequireDefault(require("../widget/ui.widget"));
var _index = require("../../events/utils/index");
var _pointer = _interopRequireDefault(require("../../events/pointer"));
var _data_helper = _interopRequireDefault(require("../../data_helper"));
var _item = _interopRequireDefault(require("./item"));
var _selectors = require("../widget/selectors");
var _message = _interopRequireDefault(require("../../localization/message"));
var _hold = _interopRequireDefault(require("../../events/hold"));
var _data = require("../../core/utils/data");
var _click = require("../../events/click");
var _contextmenu = require("../../events/contextmenu");
var _bindable_template = require("../../core/templates/bindable_template");

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        "default": obj
    }
}
var COLLECTION_CLASS = "dx-collection";
var ITEM_CLASS = "dx-item";
var CONTENT_CLASS_POSTFIX = "-content";
var ITEM_CONTENT_PLACEHOLDER_CLASS = "dx-item-content-placeholder";
var ITEM_DATA_KEY = "dxItemData";
var ITEM_INDEX_KEY = "dxItemIndex";
var ITEM_TEMPLATE_ID_PREFIX = "tmpl-";
var ITEMS_OPTIONS_NAME = "dxItem";
var SELECTED_ITEM_CLASS = "dx-item-selected";
var ITEM_RESPONSE_WAIT_CLASS = "dx-item-response-wait";
var EMPTY_COLLECTION = "dx-empty-collection";
var TEMPLATE_WRAPPER_CLASS = "dx-template-wrapper";
var ITEM_PATH_REGEX = /^([^.]+\[\d+\]\.)+([\w.]+)$/;
var ANONYMOUS_TEMPLATE_NAME = "item";
var FOCUS_UP = "up";
var FOCUS_DOWN = "down";
var FOCUS_LEFT = "left";
var FOCUS_RIGHT = "right";
var FOCUS_PAGE_UP = "pageup";
var FOCUS_PAGE_DOWN = "pagedown";
var FOCUS_LAST = "last";
var FOCUS_FIRST = "first";
var CollectionWidget = _ui.default.inherit({
    _activeStateUnit: "." + ITEM_CLASS,
    _supportedKeys: function() {
        var enter = function(e) {
            var $itemElement = (0, _renderer.default)(this.option("focusedElement"));
            if (!$itemElement.length) {
                return
            }
            this._itemClickHandler((0, _extend.extend)({}, e, {
                target: $itemElement.get(0),
                currentTarget: $itemElement.get(0)
            }))
        };
        var space = function(e) {
            e.preventDefault();
            enter.call(this, e)
        };
        var move = function(location, e) {
            if (!(0, _index.isCommandKeyPressed)(e)) {
                e.preventDefault();
                e.stopPropagation();
                this._moveFocus(location, e)
            }
        };
        return (0, _extend.extend)(this.callBase(), {
            space: space,
            enter: enter,
            leftArrow: move.bind(this, FOCUS_LEFT),
            rightArrow: move.bind(this, FOCUS_RIGHT),
            upArrow: move.bind(this, FOCUS_UP),
            downArrow: move.bind(this, FOCUS_DOWN),
            pageUp: move.bind(this, FOCUS_UP),
            pageDown: move.bind(this, FOCUS_DOWN),
            home: move.bind(this, FOCUS_FIRST),
            end: move.bind(this, FOCUS_LAST)
        })
    },
    _getDefaultOptions: function() {
        return (0, _extend.extend)(this.callBase(), {
            selectOnFocus: false,
            loopItemFocus: true,
            items: [],
            itemTemplate: "item",
            onItemRendered: null,
            onItemClick: null,
            onItemHold: null,
            itemHoldTimeout: 750,
            onItemContextMenu: null,
            onFocusedItemChanged: null,
            noDataText: _message.default.format("dxCollectionWidget-noDataText"),
            dataSource: null,
            _itemAttributes: {},
            itemTemplateProperty: "template",
            focusOnSelectedItem: true,
            focusedElement: null,
            displayExpr: void 0,
            disabledExpr: function(data) {
                return data ? data.disabled : void 0
            },
            visibleExpr: function(data) {
                return data ? data.visible : void 0
            }
        })
    },
    _init: function() {
        this._compileDisplayGetter();
        this.callBase();
        this._cleanRenderedItems();
        this._refreshDataSource()
    },
    _compileDisplayGetter: function() {
        var displayExpr = this.option("displayExpr");
        this._displayGetter = displayExpr ? (0, _data.compileGetter)(this.option("displayExpr")) : void 0
    },
    _initTemplates: function() {
        this._initItemsFromMarkup();
        this._initDefaultItemTemplate();
        this.callBase()
    },
    _getAnonymousTemplateName: function() {
        return ANONYMOUS_TEMPLATE_NAME
    },
    _initDefaultItemTemplate: function() {
        var fieldsMap = this._getFieldsMap();
        this._templateManager.addDefaultTemplates({
            item: new _bindable_template.BindableTemplate(function($container, data) {
                if ((0, _type.isPlainObject)(data)) {
                    this._prepareDefaultItemTemplate(data, $container)
                } else {
                    if (fieldsMap && (0, _type.isFunction)(fieldsMap.text)) {
                        data = fieldsMap.text(data)
                    }
                    $container.text(String((0, _common.ensureDefined)(data, "")))
                }
            }.bind(this), this._getBindableFields(), this.option("integrationOptions.watchMethod"), fieldsMap)
        })
    },
    _getBindableFields: function() {
        return ["text", "html"]
    },
    _getFieldsMap: function() {
        if (this._displayGetter) {
            return {
                text: this._displayGetter
            }
        }
    },
    _prepareDefaultItemTemplate: function(data, $container) {
        if ((0, _type.isDefined)(data.text)) {
            $container.text(data.text)
        }
        if ((0, _type.isDefined)(data.html)) {
            $container.html(data.html)
        }
    },
    _initItemsFromMarkup: function() {
        var _this = this;
        var rawItems = (0, _template_manager.findTemplates)(this.$element(), ITEMS_OPTIONS_NAME);
        if (!rawItems.length || this.option("items").length) {
            return
        }
        var items = rawItems.map(function(_ref) {
            var element = _ref.element,
                options = _ref.options;
            var isTemplateRequired = /\S/.test(element.innerHTML) && !options.template;
            if (isTemplateRequired) {
                options.template = _this._prepareItemTemplate(element)
            } else {
                (0, _renderer.default)(element).remove()
            }
            return options
        });
        this.option("items", items)
    },
    _prepareItemTemplate: function(item) {
        var templateId = ITEM_TEMPLATE_ID_PREFIX + new _guid.default;
        var $template = (0, _renderer.default)(item).detach().clone().removeAttr("data-options").addClass(TEMPLATE_WRAPPER_CLASS);
        this._saveTemplate(templateId, $template);
        return templateId
    },
    _dataSourceOptions: function() {
        return {
            paginate: false
        }
    },
    _cleanRenderedItems: function() {
        this._renderedItemsCount = 0
    },
    _focusTarget: function() {
        return this.$element()
    },
    _focusInHandler: function(e) {
        this.callBase.apply(this, arguments);
        if ((0, _array.inArray)(e.target, this._focusTarget()) === -1) {
            return
        }
        var $focusedElement = (0, _renderer.default)(this.option("focusedElement"));
        if ($focusedElement.length) {
            this._setFocusedItem($focusedElement)
        } else {
            var $activeItem = this._getActiveItem();
            if ($activeItem.length) {
                this.option("focusedElement", (0, _element.getPublicElement)($activeItem))
            }
        }
    },
    _focusOutHandler: function() {
        this.callBase.apply(this, arguments);
        var $target = (0, _renderer.default)(this.option("focusedElement"));
        this._updateFocusedItemState($target, false)
    },
    _getActiveItem: function(last) {
        var $focusedElement = (0, _renderer.default)(this.option("focusedElement"));
        if ($focusedElement.length) {
            return $focusedElement
        }
        var index = this.option("focusOnSelectedItem") ? this.option("selectedIndex") : 0;
        var activeElements = this._getActiveElement();
        var lastIndex = activeElements.length - 1;
        if (index < 0) {
            index = last ? lastIndex : 0
        }
        return activeElements.eq(index)
    },
    _moveFocus: function(location) {
        var $items = this._getAvailableItems();
        var $newTarget;
        switch (location) {
            case FOCUS_PAGE_UP:
            case FOCUS_UP:
                $newTarget = this._prevItem($items);
                break;
            case FOCUS_PAGE_DOWN:
            case FOCUS_DOWN:
                $newTarget = this._nextItem($items);
                break;
            case FOCUS_RIGHT:
                $newTarget = this.option("rtlEnabled") ? this._prevItem($items) : this._nextItem($items);
                break;
            case FOCUS_LEFT:
                $newTarget = this.option("rtlEnabled") ? this._nextItem($items) : this._prevItem($items);
                break;
            case FOCUS_FIRST:
                $newTarget = $items.first();
                break;
            case FOCUS_LAST:
                $newTarget = $items.last();
                break;
            default:
                return false
        }
        if (0 !== $newTarget.length) {
            this.option("focusedElement", (0, _element.getPublicElement)($newTarget))
        }
    },
    _getVisibleItems: function($itemElements) {
        $itemElements = $itemElements || this._itemElements();
        return $itemElements.filter(":visible")
    },
    _getAvailableItems: function($itemElements) {
        return this._getVisibleItems($itemElements).not(".dx-state-disabled")
    },
    _prevItem: function($items) {
        var $target = this._getActiveItem();
        var targetIndex = $items.index($target);
        var $last = $items.last();
        var $item = (0, _renderer.default)($items[targetIndex - 1]);
        var loop = this.option("loopItemFocus");
        if (0 === $item.length && loop) {
            $item = $last
        }
        return $item
    },
    _nextItem: function($items) {
        var $target = this._getActiveItem(true);
        var targetIndex = $items.index($target);
        var $first = $items.first();
        var $item = (0, _renderer.default)($items[targetIndex + 1]);
        var loop = this.option("loopItemFocus");
        if (0 === $item.length && loop) {
            $item = $first
        }
        return $item
    },
    _selectFocusedItem: function($target) {
        this.selectItem($target)
    },
    _updateFocusedItemState: function(target, isFocused, needCleanItemId) {
        var $target = (0, _renderer.default)(target);
        if ($target.length) {
            this._refreshActiveDescendant();
            this._refreshItemId($target, needCleanItemId);
            this._toggleFocusClass(isFocused, $target)
        }
        this._updateParentActiveDescendant()
    },
    _refreshActiveDescendant: function($target) {
        this.setAria("activedescendant", (0, _type.isDefined)(this.option("focusedElement")) ? this.getFocusedItemId() : null, $target)
    },
    _refreshItemId: function($target, needCleanItemId) {
        if (!needCleanItemId && this.option("focusedElement")) {
            this.setAria("id", this.getFocusedItemId(), $target)
        } else {
            this.setAria("id", null, $target)
        }
    },
    _setFocusedItem: function($target) {
        if (!$target || !$target.length) {
            return
        }
        this._updateFocusedItemState($target, true);
        this.onFocusedItemChanged(this.getFocusedItemId());
        if (this.option("selectOnFocus")) {
            this._selectFocusedItem($target)
        }
    },
    _findItemElementByItem: function(item) {
        var result = (0, _renderer.default)();
        var that = this;
        this.itemElements().each(function() {
            var $item = (0, _renderer.default)(this);
            if ($item.data(that._itemDataKey()) === item) {
                result = $item;
                return false
            }
        });
        return result
    },
    _getIndexByItem: function(item) {
        return this.option("items").indexOf(item)
    },
    _itemOptionChanged: function(item, property, value, oldValue) {
        var $item = this._findItemElementByItem(item);
        if (!$item.length) {
            return
        }
        if (!this.constructor.ItemClass.getInstance($item).setDataField(property, value)) {
            this._refreshItem($item, item)
        }
        var isDisabling = "disabled" === property && value;
        if (isDisabling) {
            this._resetItemFocus($item)
        }
    },
    _resetItemFocus: function($item) {
        if ($item.is(this.option("focusedElement"))) {
            this.option("focusedElement", null)
        }
    },
    _refreshItem: function($item) {
        var itemData = this._getItemData($item);
        var index = $item.data(this._itemIndexKey());
        this._renderItem(this._renderedItemsCount + index, itemData, null, $item)
    },
    _updateParentActiveDescendant: _common.noop,
    _optionChanged: function(args) {
        if ("items" === args.name) {
            var matches = args.fullName.match(ITEM_PATH_REGEX);
            if (matches && matches.length) {
                var property = matches[matches.length - 1];
                var itemPath = args.fullName.replace("." + property, "");
                var item = this.option(itemPath);
                this._itemOptionChanged(item, property, args.value, args.previousValue);
                return
            }
        }
        switch (args.name) {
            case "items":
            case "_itemAttributes":
            case "itemTemplateProperty":
            case "showItemDataTitle":
                this._cleanRenderedItems();
                this._invalidate();
                break;
            case "dataSource":
                this._refreshDataSource();
                this._renderEmptyMessage();
                break;
            case "noDataText":
                this._renderEmptyMessage();
                break;
            case "itemTemplate":
                this._invalidate();
                break;
            case "onItemRendered":
                this._createItemRenderAction();
                break;
            case "onItemClick":
                break;
            case "onItemHold":
            case "itemHoldTimeout":
                this._attachHoldEvent();
                break;
            case "onItemContextMenu":
                this._attachContextMenuEvent();
                break;
            case "onFocusedItemChanged":
                this.onFocusedItemChanged = this._createActionByOption("onFocusedItemChanged");
                break;
            case "selectOnFocus":
            case "loopItemFocus":
            case "focusOnSelectedItem":
                break;
            case "focusedElement":
                this._updateFocusedItemState(args.previousValue, false, true);
                this._setFocusedItem((0, _renderer.default)(args.value));
                break;
            case "displayExpr":
                this._compileDisplayGetter();
                this._initDefaultItemTemplate();
                this._invalidate();
                break;
            case "visibleExpr":
            case "disabledExpr":
                this._invalidate();
                break;
            default:
                this.callBase(args)
        }
    },
    _invalidate: function() {
        this.option("focusedElement", null);
        return this.callBase.apply(this, arguments)
    },
    _loadNextPage: function() {
        var dataSource = this._dataSource;
        this._expectNextPageLoading();
        dataSource.pageIndex(1 + dataSource.pageIndex());
        return dataSource.load()
    },
    _expectNextPageLoading: function() {
        this._startIndexForAppendedItems = 0
    },
    _expectLastItemLoading: function() {
        this._startIndexForAppendedItems = -1
    },
    _forgetNextPageLoading: function() {
        this._startIndexForAppendedItems = null
    },
    _dataSourceChangedHandler: function(newItems) {
        var items = this.option("items");
        if (this._initialized && items && this._shouldAppendItems()) {
            this._renderedItemsCount = items.length;
            if (!this._isLastPage() || this._startIndexForAppendedItems !== -1) {
                this.option().items = items.concat(newItems.slice(this._startIndexForAppendedItems))
            }
            this._forgetNextPageLoading();
            this._refreshContent()
        } else {
            this.option("items", newItems.slice())
        }
    },
    _refreshContent: function() {
        this._prepareContent();
        this._renderContent()
    },
    _dataSourceLoadErrorHandler: function() {
        this._forgetNextPageLoading();
        this.option("items", this.option("items"))
    },
    _shouldAppendItems: function() {
        return null != this._startIndexForAppendedItems && this._allowDynamicItemsAppend()
    },
    _allowDynamicItemsAppend: function() {
        return false
    },
    _clean: function() {
        this._cleanFocusState();
        this._cleanItemContainer()
    },
    _cleanItemContainer: function() {
        (0, _renderer.default)(this._itemContainer()).empty()
    },
    _dispose: function() {
        this.callBase();
        clearTimeout(this._itemFocusTimeout)
    },
    _refresh: function() {
        this._cleanRenderedItems();
        this.callBase.apply(this, arguments)
    },
    _itemContainer: function() {
        return this.$element()
    },
    _itemClass: function() {
        return ITEM_CLASS
    },
    _itemContentClass: function() {
        return this._itemClass() + CONTENT_CLASS_POSTFIX
    },
    _selectedItemClass: function() {
        return SELECTED_ITEM_CLASS
    },
    _itemResponseWaitClass: function() {
        return ITEM_RESPONSE_WAIT_CLASS
    },
    _itemSelector: function() {
        return "." + this._itemClass()
    },
    _itemDataKey: function() {
        return ITEM_DATA_KEY
    },
    _itemIndexKey: function() {
        return ITEM_INDEX_KEY
    },
    _itemElements: function() {
        return this._itemContainer().find(this._itemSelector())
    },
    _initMarkup: function() {
        this.callBase();
        this.onFocusedItemChanged = this._createActionByOption("onFocusedItemChanged");
        this.$element().addClass(COLLECTION_CLASS);
        this._prepareContent()
    },
    _prepareContent: (0, _common.deferRenderer)(function() {
        this._renderContentImpl()
    }),
    _renderContent: function() {
        this._fireContentReadyAction()
    },
    _render: function() {
        this.callBase();
        this._attachClickEvent();
        this._attachHoldEvent();
        this._attachContextMenuEvent()
    },
    _attachClickEvent: function() {
        var itemSelector = this._itemSelector();
        var clickEventNamespace = (0, _index.addNamespace)(_click.name, this.NAME);
        var pointerDownEventNamespace = (0, _index.addNamespace)(_pointer.default.down, this.NAME);
        var that = this;
        var pointerDownAction = new _action.default(function(args) {
            var event = args.event;
            that._itemPointerDownHandler(event)
        });
        _events_engine.default.off(this._itemContainer(), clickEventNamespace, itemSelector);
        _events_engine.default.off(this._itemContainer(), pointerDownEventNamespace, itemSelector);
        _events_engine.default.on(this._itemContainer(), clickEventNamespace, itemSelector, function(e) {
            this._itemClickHandler(e)
        }.bind(this));
        _events_engine.default.on(this._itemContainer(), pointerDownEventNamespace, itemSelector, function(e) {
            pointerDownAction.execute({
                element: (0, _renderer.default)(e.target),
                event: e
            })
        })
    },
    _itemClickHandler: function(e, args, config) {
        this._itemDXEventHandler(e, "onItemClick", args, config)
    },
    _itemPointerDownHandler: function(e) {
        if (!this.option("focusStateEnabled")) {
            return
        }
        this._itemFocusHandler = function() {
            clearTimeout(this._itemFocusTimeout);
            this._itemFocusHandler = null;
            if (e.isDefaultPrevented()) {
                return
            }
            var $target = (0, _renderer.default)(e.target);
            var $closestItem = $target.closest(this._itemElements());
            var $closestFocusable = this._closestFocusable($target);
            if ($closestItem.length && $closestFocusable && (0, _array.inArray)($closestFocusable.get(0), this._focusTarget()) !== -1) {
                this.option("focusedElement", (0, _element.getPublicElement)($closestItem))
            }
        }.bind(this);
        this._itemFocusTimeout = setTimeout(this._forcePointerDownFocus.bind(this))
    },
    _closestFocusable: function($target) {
        if ($target.is(_selectors.focusable)) {
            return $target
        } else {
            $target = $target.parent();
            while ($target.length && !_dom_adapter.default.isDocument($target.get(0))) {
                if ($target.is(_selectors.focusable)) {
                    return $target
                }
                $target = $target.parent()
            }
        }
    },
    _forcePointerDownFocus: function() {
        this._itemFocusHandler && this._itemFocusHandler()
    },
    _updateFocusState: function() {
        this.callBase.apply(this, arguments);
        this._forcePointerDownFocus()
    },
    _attachHoldEvent: function() {
        var $itemContainer = this._itemContainer();
        var itemSelector = this._itemSelector();
        var eventName = (0, _index.addNamespace)(_hold.default.name, this.NAME);
        _events_engine.default.off($itemContainer, eventName, itemSelector);
        _events_engine.default.on($itemContainer, eventName, itemSelector, {
            timeout: this._getHoldTimeout()
        }, this._itemHoldHandler.bind(this))
    },
    _getHoldTimeout: function() {
        return this.option("itemHoldTimeout")
    },
    _shouldFireHoldEvent: function() {
        return this.hasActionSubscription("onItemHold")
    },
    _itemHoldHandler: function(e) {
        if (this._shouldFireHoldEvent()) {
            this._itemDXEventHandler(e, "onItemHold")
        } else {
            e.cancel = true
        }
    },
    _attachContextMenuEvent: function() {
        var $itemContainer = this._itemContainer();
        var itemSelector = this._itemSelector();
        var eventName = (0, _index.addNamespace)(_contextmenu.name, this.NAME);
        _events_engine.default.off($itemContainer, eventName, itemSelector);
        _events_engine.default.on($itemContainer, eventName, itemSelector, this._itemContextMenuHandler.bind(this))
    },
    _shouldFireContextMenuEvent: function() {
        return this.hasActionSubscription("onItemContextMenu")
    },
    _itemContextMenuHandler: function(e) {
        if (this._shouldFireContextMenuEvent()) {
            this._itemDXEventHandler(e, "onItemContextMenu")
        } else {
            e.cancel = true
        }
    },
    _renderContentImpl: function() {
        var items = this.option("items") || [];
        if (this._renderedItemsCount) {
            this._renderItems(items.slice(this._renderedItemsCount))
        } else {
            this._renderItems(items)
        }
    },
    _renderItems: function(items) {
        if (items.length) {
            (0, _iterator.each)(items, function(index, itemData) {
                this._renderItem(this._renderedItemsCount + index, itemData)
            }.bind(this))
        }
        this._renderEmptyMessage()
    },
    _renderItem: function(index, itemData, $container, $itemToReplace) {
        $container = $container || this._itemContainer();
        var $itemFrame = this._renderItemFrame(index, itemData, $container, $itemToReplace);
        this._setElementData($itemFrame, itemData, index);
        $itemFrame.attr(this.option("_itemAttributes"));
        this._attachItemClickEvent(itemData, $itemFrame);
        var $itemContent = this._getItemContent($itemFrame);
        var renderContentPromise = this._renderItemContent({
            index: index,
            itemData: itemData,
            container: (0, _element.getPublicElement)($itemContent),
            contentClass: this._itemContentClass(),
            defaultTemplateName: this.option("itemTemplate")
        });
        var that = this;
        (0, _deferred.when)(renderContentPromise).done(function($itemContent) {
            that._postprocessRenderItem({
                itemElement: $itemFrame,
                itemContent: $itemContent,
                itemData: itemData,
                itemIndex: index
            });
            that._executeItemRenderAction(index, itemData, (0, _element.getPublicElement)($itemFrame))
        });
        return $itemFrame
    },
    _getItemContent: function($itemFrame) {
        var $itemContent = $itemFrame.find("." + ITEM_CONTENT_PLACEHOLDER_CLASS);
        $itemContent.removeClass(ITEM_CONTENT_PLACEHOLDER_CLASS);
        return $itemContent
    },
    _attachItemClickEvent: function(itemData, $itemElement) {
        if (!itemData || !itemData.onClick) {
            return
        }
        _events_engine.default.on($itemElement, _click.name, function(e) {
            this._itemEventHandlerByHandler($itemElement, itemData.onClick, {
                event: e
            })
        }.bind(this))
    },
    _renderItemContent: function(args) {
        var itemTemplateName = this._getItemTemplateName(args);
        var itemTemplate = this._getTemplate(itemTemplateName);
        this._addItemContentClasses(args);
        var $templateResult = (0, _renderer.default)(this._createItemByTemplate(itemTemplate, args));
        if (!$templateResult.hasClass(TEMPLATE_WRAPPER_CLASS)) {
            return args.container
        }
        return this._renderItemContentByNode(args, $templateResult)
    },
    _renderItemContentByNode: function(args, $node) {
        (0, _renderer.default)(args.container).replaceWith($node);
        args.container = (0, _element.getPublicElement)($node);
        this._addItemContentClasses(args);
        return $node
    },
    _addItemContentClasses: function(args) {
        var classes = [ITEM_CLASS + CONTENT_CLASS_POSTFIX, args.contentClass];
        (0, _renderer.default)(args.container).addClass(classes.join(" "))
    },
    _appendItemToContainer: function($container, $itemFrame, index) {
        $itemFrame.appendTo($container)
    },
    _renderItemFrame: function(index, itemData, $container, $itemToReplace) {
        var $itemFrame = (0, _renderer.default)("<div>");
        new this.constructor.ItemClass($itemFrame, this._itemOptions(), itemData || {});
        if ($itemToReplace && $itemToReplace.length) {
            $itemToReplace.replaceWith($itemFrame)
        } else {
            this._appendItemToContainer.call(this, $container, $itemFrame, index)
        }
        if (this.option("showItemDataTitle")) {
            var displayValue = this._displayGetter ? this._displayGetter(itemData) : itemData;
            $itemFrame.attr("title", displayValue)
        }
        return $itemFrame
    },
    _itemOptions: function() {
        var that = this;
        return {
            watchMethod: function() {
                return that.option("integrationOptions.watchMethod")
            },
            owner: that,
            fieldGetter: function(field) {
                var expr = that.option(field + "Expr");
                var getter = (0, _data.compileGetter)(expr);
                return getter
            }
        }
    },
    _postprocessRenderItem: _common.noop,
    _executeItemRenderAction: function(index, itemData, itemElement) {
        this._getItemRenderAction()({
            itemElement: itemElement,
            itemIndex: index,
            itemData: itemData
        })
    },
    _setElementData: function(element, data, index) {
        element.addClass([ITEM_CLASS, this._itemClass()].join(" ")).data(this._itemDataKey(), data).data(this._itemIndexKey(), index)
    },
    _createItemRenderAction: function() {
        return this._itemRenderAction = this._createActionByOption("onItemRendered", {
            element: this.element(),
            excludeValidators: ["disabled", "readOnly"],
            category: "rendering"
        })
    },
    _getItemRenderAction: function() {
        return this._itemRenderAction || this._createItemRenderAction()
    },
    _getItemTemplateName: function(args) {
        var data = args.itemData;
        var templateProperty = args.templateProperty || this.option("itemTemplateProperty");
        var template = data && data[templateProperty];
        return template || args.defaultTemplateName
    },
    _createItemByTemplate: function(itemTemplate, renderArgs) {
        return itemTemplate.render({
            model: renderArgs.itemData,
            container: renderArgs.container,
            index: renderArgs.index
        })
    },
    _emptyMessageContainer: function() {
        return this._itemContainer()
    },
    _renderEmptyMessage: function(items) {
        items = items || this.option("items");
        var noDataText = this.option("noDataText");
        var hideNoData = !noDataText || items && items.length || this._isDataSourceLoading();
        if (hideNoData && this._$noData) {
            this._$noData.remove();
            this._$noData = null;
            this.setAria("label", void 0)
        }
        if (!hideNoData) {
            this._$noData = this._$noData || (0, _renderer.default)("<div>").addClass("dx-empty-message");
            this._$noData.appendTo(this._emptyMessageContainer()).html(noDataText);
            this.setAria("label", noDataText)
        }
        this.$element().toggleClass(EMPTY_COLLECTION, !hideNoData)
    },
    _itemDXEventHandler: function(dxEvent, handlerOptionName, actionArgs, actionConfig) {
        this._itemEventHandler(dxEvent.target, handlerOptionName, (0, _extend.extend)(actionArgs, {
            event: dxEvent
        }), actionConfig)
    },
    _itemEventHandler: function(initiator, handlerOptionName, actionArgs, actionConfig) {
        var action = this._createActionByOption(handlerOptionName, (0, _extend.extend)({
            validatingTargetName: "itemElement"
        }, actionConfig));
        return this._itemEventHandlerImpl(initiator, action, actionArgs)
    },
    _itemEventHandlerByHandler: function(initiator, handler, actionArgs, actionConfig) {
        var action = this._createAction(handler, (0, _extend.extend)({
            validatingTargetName: "itemElement"
        }, actionConfig));
        return this._itemEventHandlerImpl(initiator, action, actionArgs)
    },
    _itemEventHandlerImpl: function(initiator, action, actionArgs) {
        var $itemElement = this._closestItemElement((0, _renderer.default)(initiator));
        var args = (0, _extend.extend)({}, actionArgs);
        return action((0, _extend.extend)(actionArgs, this._extendActionArgs($itemElement), args))
    },
    _extendActionArgs: function($itemElement) {
        return {
            itemElement: (0, _element.getPublicElement)($itemElement),
            itemIndex: this._itemElements().index($itemElement),
            itemData: this._getItemData($itemElement)
        }
    },
    _closestItemElement: function($element) {
        return (0, _renderer.default)($element).closest(this._itemSelector())
    },
    _getItemData: function(itemElement) {
        return (0, _renderer.default)(itemElement).data(this._itemDataKey())
    },
    _getSummaryItemsWidth: function(items, includeMargin) {
        var result = 0;
        if (items) {
            (0, _iterator.each)(items, function(_, item) {
                result += (0, _renderer.default)(item).outerWidth(includeMargin || false)
            })
        }
        return result
    },
    getFocusedItemId: function() {
        if (!this._focusedItemId) {
            this._focusedItemId = "dx-" + new _guid.default
        }
        return this._focusedItemId
    },
    itemElements: function() {
        return this._itemElements()
    },
    itemsContainer: function() {
        return this._itemContainer()
    }
}).include(_data_helper.default);
CollectionWidget.ItemClass = _item.default;
var _default = CollectionWidget;
exports.default = _default;
module.exports = exports.default;
