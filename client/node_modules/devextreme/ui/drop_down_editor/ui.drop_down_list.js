/**
 * DevExtreme (ui/drop_down_editor/ui.drop_down_list.js)
 * Version: 20.2.6
 * Build date: Tue Mar 16 2021
 *
 * Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
exports.default = void 0;
var _renderer = _interopRequireDefault(require("../../core/renderer"));
var _window = require("../../core/utils/window");
var _events_engine = _interopRequireDefault(require("../../events/core/events_engine"));
var _guid = _interopRequireDefault(require("../../core/guid"));
var _component_registrator = _interopRequireDefault(require("../../core/component_registrator"));
var _common = require("../../core/utils/common");
var _type = require("../../core/utils/type");
var _extend = require("../../core/utils/extend");
var _array = require("../../core/utils/array");
var _ui = _interopRequireDefault(require("./ui.drop_down_editor"));
var _list = _interopRequireDefault(require("../list"));
var _ui2 = _interopRequireDefault(require("../widget/ui.errors"));
var _index = require("../../events/utils/index");
var _devices = _interopRequireDefault(require("../../core/devices"));
var _query = _interopRequireDefault(require("../../data/query"));
var _iterator = require("../../core/utils/iterator");
var _ui3 = _interopRequireDefault(require("../editor/ui.data_expression"));
var _message = _interopRequireDefault(require("../../localization/message"));
var _child_default_template = require("../../core/templates/child_default_template");
var _deferred = require("../../core/utils/deferred");
var _grouped_data_converter_mixin = _interopRequireDefault(require("../shared/grouped_data_converter_mixin"));

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        "default": obj
    }
}

function _typeof(obj) {
    "@babel/helpers - typeof";
    if ("function" === typeof Symbol && "symbol" === typeof Symbol.iterator) {
        _typeof = function(obj) {
            return typeof obj
        }
    } else {
        _typeof = function(obj) {
            return obj && "function" === typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj
        }
    }
    return _typeof(obj)
}
var window = (0, _window.getWindow)();
var LIST_ITEM_SELECTOR = ".dx-list-item";
var LIST_ITEM_DATA_KEY = "dxListItemData";
var DROPDOWNLIST_POPUP_WRAPPER_CLASS = "dx-dropdownlist-popup-wrapper";
var SKIP_GESTURE_EVENT_CLASS = "dx-skip-gesture-event";
var SEARCH_EVENT = "input";
var SEARCH_MODES = ["startswith", "contains", "endwith", "notcontains"];
var DropDownList = _ui.default.inherit({
    _supportedKeys: function() {
        var parent = this.callBase();
        return (0, _extend.extend)({}, parent, {
            tab: function(e) {
                if (this._allowSelectItemByTab()) {
                    this._saveValueChangeEvent(e);
                    var $focusedItem = (0, _renderer.default)(this._list.option("focusedElement"));
                    $focusedItem.length && this._setSelectedElement($focusedItem)
                }
                parent.tab.apply(this, arguments)
            },
            space: _common.noop,
            home: _common.noop,
            end: _common.noop
        })
    },
    _allowSelectItemByTab: function() {
        return this.option("opened") && "instantly" === this.option("applyValueMode")
    },
    _setSelectedElement: function($element) {
        var value = this._valueGetter(this._list._getItemData($element));
        this._setValue(value)
    },
    _setValue: function(value) {
        this.option("value", value)
    },
    _getDefaultOptions: function() {
        return (0, _extend.extend)(this.callBase(), (0, _extend.extend)(_ui3.default._dataExpressionDefaultOptions(), {
            displayValue: void 0,
            searchEnabled: false,
            searchMode: "contains",
            searchTimeout: 500,
            minSearchLength: 0,
            searchExpr: null,
            valueChangeEvent: "input change keyup",
            selectedItem: null,
            noDataText: _message.default.format("dxCollectionWidget-noDataText"),
            onSelectionChanged: null,
            onItemClick: _common.noop,
            showDataBeforeSearch: false,
            grouped: false,
            groupTemplate: "group",
            popupPosition: {
                my: "left top",
                at: "left bottom",
                offset: {
                    h: 0,
                    v: 0
                },
                collision: "flip"
            },
            wrapItemText: false
        }))
    },
    _defaultOptionsRules: function() {
        return this.callBase().concat([{
            device: {
                platform: "ios"
            },
            options: {
                popupPosition: {
                    offset: {
                        v: -1
                    }
                }
            }
        }, {
            device: {
                platform: "generic"
            },
            options: {
                buttonsLocation: "bottom center"
            }
        }])
    },
    _setOptionsByReference: function() {
        this.callBase();
        (0, _extend.extend)(this._optionsByReference, {
            value: true,
            selectedItem: true,
            displayValue: true
        })
    },
    _init: function() {
        this.callBase();
        this._initDataExpressions();
        this._initActions();
        this._setListDataSource();
        this._validateSearchMode();
        this._clearSelectedItem();
        this._initItems()
    },
    _setListFocusedElementOptionChange: function() {
        this._list._updateParentActiveDescendant = this._updateActiveDescendant.bind(this)
    },
    _initItems: function() {
        var items = this.option().items;
        if (items && !items.length && this._dataSource) {
            this.option().items = this._dataSource.items()
        }
    },
    _initActions: function() {
        this._initContentReadyAction();
        this._initSelectionChangedAction();
        this._initItemClickAction()
    },
    _initContentReadyAction: function() {
        this._contentReadyAction = this._createActionByOption("onContentReady", {
            excludeValidators: ["disabled", "readOnly"]
        })
    },
    _initSelectionChangedAction: function() {
        this._selectionChangedAction = this._createActionByOption("onSelectionChanged", {
            excludeValidators: ["disabled", "readOnly"]
        })
    },
    _initItemClickAction: function() {
        this._itemClickAction = this._createActionByOption("onItemClick")
    },
    _initTemplates: function() {
        this.callBase();
        this._templateManager.addDefaultTemplates({
            item: new _child_default_template.ChildDefaultTemplate("item")
        })
    },
    _saveFocusOnWidget: function(e) {
        if (this._list && this._list.initialOption("focusStateEnabled")) {
            this._focusInput()
        }
    },
    _fitIntoRange: function(value, start, end) {
        if (value > end) {
            return start
        }
        if (value < start) {
            return end
        }
        return value
    },
    _items: function() {
        var items = this._getPlainItems(!this._list && this._dataSource.items());
        var availableItems = new _query.default(items).filter("disabled", "<>", true).toArray();
        return availableItems
    },
    _calcNextItem: function(step) {
        var items = this._items();
        var nextIndex = this._fitIntoRange(this._getSelectedIndex() + step, 0, items.length - 1);
        return items[nextIndex]
    },
    _getSelectedIndex: function() {
        var items = this._items();
        var selectedItem = this.option("selectedItem");
        var result = -1;
        (0, _iterator.each)(items, function(index, item) {
            if (this._isValueEquals(item, selectedItem)) {
                result = index;
                return false
            }
        }.bind(this));
        return result
    },
    _createPopup: function() {
        this.callBase();
        this._updateCustomBoundaryContainer();
        this._popup._wrapper().addClass(this._popupWrapperClass());
        var $popupContent = this._popup.$content();
        _events_engine.default.off($popupContent, "mouseup");
        _events_engine.default.on($popupContent, "mouseup", this._saveFocusOnWidget.bind(this));
        var that = this;
        this._popup.on({
            shown: function() {
                that.$element().addClass(SKIP_GESTURE_EVENT_CLASS)
            },
            hidden: function() {
                that.$element().removeClass(SKIP_GESTURE_EVENT_CLASS)
            }
        })
    },
    _updateCustomBoundaryContainer: function() {
        var customContainer = this.option("dropDownOptions.container");
        var $container = customContainer && (0, _renderer.default)(customContainer);
        if ($container && $container.length && !(0, _type.isWindow)($container.get(0))) {
            var $containerWithParents = [].slice.call($container.parents());
            $containerWithParents.unshift($container.get(0));
            (0, _iterator.each)($containerWithParents, function(i, parent) {
                if (parent === (0, _renderer.default)("body").get(0)) {
                    return false
                } else {
                    if ("hidden" === window.getComputedStyle(parent).overflowY) {
                        this._$customBoundaryContainer = (0, _renderer.default)(parent);
                        return false
                    }
                }
            }.bind(this))
        }
    },
    _popupWrapperClass: function() {
        return DROPDOWNLIST_POPUP_WRAPPER_CLASS
    },
    _renderInputValue: function() {
        var value = this._getCurrentValue();
        return this._loadInputValue(value, this._setSelectedItem.bind(this)).always(this.callBase.bind(this, value))
    },
    _loadInputValue: function(value, callback) {
        return this._loadItem(value).always(callback)
    },
    _getItemFromPlain: function(value, cache) {
        var plainItems;
        var selectedItem;
        if (cache && "object" !== _typeof(value)) {
            if (!cache.itemByValue) {
                cache.itemByValue = {};
                plainItems = this._getPlainItems();
                plainItems.forEach(function(item) {
                    cache.itemByValue[this._valueGetter(item)] = item
                }, this)
            }
            selectedItem = cache.itemByValue[value]
        }
        if (!selectedItem) {
            plainItems = this._getPlainItems();
            selectedItem = (0, _common.grep)(plainItems, function(item) {
                return this._isValueEquals(this._valueGetter(item), value)
            }.bind(this))[0]
        }
        return selectedItem
    },
    _loadItem: function(value, cache) {
        var selectedItem = this._getItemFromPlain(value, cache);
        return void 0 !== selectedItem ? (new _deferred.Deferred).resolve(selectedItem).promise() : this._loadValue(value)
    },
    _getPlainItems: function(items) {
        var plainItems = [];
        items = items || this.option("items") || this._dataSource.items() || [];
        for (var i = 0; i < items.length; i++) {
            if (items[i] && items[i].items) {
                plainItems = plainItems.concat(items[i].items)
            } else {
                plainItems.push(items[i])
            }
        }
        return plainItems
    },
    _updateActiveDescendant: function() {
        var _this$_list;
        var opened = this.option("opened");
        var listFocusedItemId = null === (_this$_list = this._list) || void 0 === _this$_list ? void 0 : _this$_list.getFocusedItemId();
        var isElementOnDom = (0, _renderer.default)("#".concat(listFocusedItemId)).length > 0;
        var activedescendant = opened && isElementOnDom && listFocusedItemId;
        this.setAria({
            activedescendant: activedescendant || null
        })
    },
    _setSelectedItem: function(item) {
        var displayValue = this._displayValue(item);
        this.option("selectedItem", (0, _common.ensureDefined)(item, null));
        this.option("displayValue", displayValue)
    },
    _displayValue: function(item) {
        return this._displayGetter(item)
    },
    _refreshSelected: function() {
        var cache = {};
        this._listItemElements().each(function(_, itemElement) {
            var $itemElement = (0, _renderer.default)(itemElement);
            var itemValue = this._valueGetter($itemElement.data(LIST_ITEM_DATA_KEY));
            var isItemSelected = this._isSelectedValue(itemValue, cache);
            if (isItemSelected) {
                this._list.selectItem($itemElement)
            } else {
                this._list.unselectItem($itemElement)
            }
        }.bind(this))
    },
    _popupShownHandler: function() {
        this.callBase();
        this._setFocusPolicy()
    },
    _setFocusPolicy: function() {
        if (!this.option("focusStateEnabled") || !this._list) {
            return
        }
        this._list.option("focusedElement", null)
    },
    _isSelectedValue: function(value) {
        return this._isValueEquals(value, this.option("value"))
    },
    _validateSearchMode: function() {
        var searchMode = this.option("searchMode");
        var normalizedSearchMode = searchMode.toLowerCase();
        if ((0, _array.inArray)(normalizedSearchMode, SEARCH_MODES) < 0) {
            throw _ui2.default.Error("E1019", searchMode)
        }
    },
    _clearSelectedItem: function() {
        this.option("selectedItem", null)
    },
    _processDataSourceChanging: function() {
        this._setListDataSource();
        this._renderInputValue().fail(function() {
            if (this._isCustomValueAllowed()) {
                return
            }
            this._clearSelectedItem()
        }.bind(this))
    },
    _isCustomValueAllowed: function() {
        return this.option("displayCustomValue")
    },
    reset: function() {
        this.callBase();
        this._clearFilter();
        this._clearSelectedItem();
        this._preventFiltering = true
    },
    _listItemElements: function() {
        return this._$list ? this._$list.find(LIST_ITEM_SELECTOR) : (0, _renderer.default)()
    },
    _popupConfig: function() {
        return (0, _extend.extend)(this.callBase(), {
            templatesRenderAsynchronously: false,
            autoResizeEnabled: false,
            maxHeight: this._getMaxHeight.bind(this)
        })
    },
    _renderPopupContent: function() {
        this.callBase();
        this._renderList()
    },
    _getKeyboardListeners: function() {
        var canListHaveFocus = this._canListHaveFocus();
        return this.callBase().concat([!canListHaveFocus && this._list])
    },
    _setAriaTargetForList: function() {
        this._list._getAriaTarget = this._getAriaTarget.bind(this)
    },
    _renderList: function() {
        this._listId = "dx-" + (new _guid.default)._value;
        var $list = this._$list = (0, _renderer.default)("<div>").attr("id", this._listId).appendTo(this._popup.$content());
        this._list = this._createComponent($list, _list.default, this._listConfig());
        this._refreshList();
        this._setAriaTargetForList();
        this._list.option("_listAttributes", {
            role: "combobox"
        });
        this._renderPreventBlur(this._$list);
        this._setListFocusedElementOptionChange()
    },
    _renderPreventBlur: function($target) {
        var eventName = (0, _index.addNamespace)("mousedown", "dxDropDownList");
        _events_engine.default.off($target, eventName);
        _events_engine.default.on($target, eventName, function(e) {
            e.preventDefault()
        }.bind(this))
    },
    _renderOpenedState: function() {
        this.callBase();
        this._list && this._updateActiveDescendant();
        this.setAria({
            controls: this._list && this._listId,
            owns: this._popup && this._popupContentId
        })
    },
    _setDefaultAria: function() {
        this.setAria({
            haspopup: "listbox",
            autocomplete: "list"
        })
    },
    _refreshList: function() {
        if (this._list && this._shouldRefreshDataSource()) {
            this._setListDataSource()
        }
    },
    _shouldRefreshDataSource: function() {
        var dataSourceProvided = !!this._list.option("dataSource");
        return dataSourceProvided !== this._needPassDataSourceToList()
    },
    _isDesktopDevice: function() {
        return "desktop" === _devices.default.real().deviceType
    },
    _listConfig: function() {
        var options = {
            selectionMode: "single",
            _templates: this.option("_templates"),
            templateProvider: this.option("templateProvider"),
            noDataText: this.option("noDataText"),
            grouped: this.option("grouped"),
            wrapItemText: this.option("wrapItemText"),
            onContentReady: this._listContentReadyHandler.bind(this),
            itemTemplate: this.option("itemTemplate"),
            indicateLoading: false,
            keyExpr: this._getCollectionKeyExpr(),
            displayExpr: this._displayGetterExpr(),
            groupTemplate: this.option("groupTemplate"),
            onItemClick: this._listItemClickAction.bind(this),
            dataSource: this._getDataSource(),
            _revertPageOnEmptyLoad: true,
            hoverStateEnabled: this._isDesktopDevice() ? this.option("hoverStateEnabled") : false,
            focusStateEnabled: this._isDesktopDevice() ? this.option("focusStateEnabled") : false
        };
        if (!this._canListHaveFocus()) {
            options.tabIndex = null
        }
        return options
    },
    _canListHaveFocus: function() {
        return false
    },
    _getDataSource: function() {
        return this._needPassDataSourceToList() ? this._dataSource : null
    },
    _dataSourceOptions: function() {
        return {
            paginate: false
        }
    },
    _getGroupedOption: function() {
        return this.option("grouped")
    },
    _dataSourceFromUrlLoadMode: function() {
        return "raw"
    },
    _listContentReadyHandler: function() {
        this._list = this._list || this._$list.dxList("instance");
        if (!this.option("deferRendering")) {
            this._refreshSelected()
        }
        this._dimensionChanged();
        this._contentReadyAction()
    },
    _setListOption: function(optionName, value) {
        this._setWidgetOption("_list", arguments)
    },
    _listItemClickAction: function(e) {
        this._listItemClickHandler(e);
        this._itemClickAction(e)
    },
    _listItemClickHandler: _common.noop,
    _setListDataSource: function() {
        if (!this._list) {
            return
        }
        this._setListOption("dataSource", this._getDataSource());
        if (!this._needPassDataSourceToList()) {
            this._setListOption("items", [])
        }
    },
    _needPassDataSourceToList: function() {
        return this.option("showDataBeforeSearch") || this._isMinSearchLengthExceeded()
    },
    _isMinSearchLengthExceeded: function() {
        return this._searchValue().toString().length >= this.option("minSearchLength")
    },
    _needClearFilter: function() {
        return this._canKeepDataSource() ? false : this._needPassDataSourceToList()
    },
    _canKeepDataSource: function() {
        var _this$_dataSource;
        var isMinSearchLengthExceeded = this._isMinSearchLengthExceeded();
        return (null === (_this$_dataSource = this._dataSource) || void 0 === _this$_dataSource ? void 0 : _this$_dataSource.isLoaded()) && this.option("showDataBeforeSearch") && this.option("minSearchLength") && !isMinSearchLengthExceeded && !this._isLastMinSearchLengthExceeded
    },
    _searchValue: function() {
        return this._input().val() || ""
    },
    _getSearchEvent: function() {
        return (0, _index.addNamespace)(SEARCH_EVENT, this.NAME + "Search")
    },
    _getSetFocusPolicyEvent: function() {
        return (0, _index.addNamespace)("input", this.NAME + "FocusPolicy")
    },
    _renderEvents: function() {
        this.callBase();
        _events_engine.default.on(this._input(), this._getSetFocusPolicyEvent(), this._setFocusPolicy.bind(this));
        if (this._shouldRenderSearchEvent()) {
            _events_engine.default.on(this._input(), this._getSearchEvent(), this._searchHandler.bind(this))
        }
    },
    _shouldRenderSearchEvent: function() {
        return this.option("searchEnabled")
    },
    _refreshEvents: function() {
        _events_engine.default.off(this._input(), this._getSearchEvent());
        _events_engine.default.off(this._input(), this._getSetFocusPolicyEvent());
        this.callBase()
    },
    _searchHandler: function() {
        if (!this._isMinSearchLengthExceeded()) {
            this._searchCanceled();
            return
        }
        var searchTimeout = this.option("searchTimeout");
        if (searchTimeout) {
            this._clearSearchTimer();
            this._searchTimer = setTimeout(this._searchDataSource.bind(this), searchTimeout)
        } else {
            this._searchDataSource()
        }
    },
    _searchCanceled: function() {
        this._clearSearchTimer();
        if (this._needClearFilter()) {
            this._filterDataSource(null)
        }
        this._refreshList()
    },
    _searchDataSource: function() {
        this._filterDataSource(this._searchValue())
    },
    _filterDataSource: function(searchValue) {
        this._clearSearchTimer();
        var dataSource = this._dataSource;
        if (dataSource) {
            dataSource.searchExpr(this.option("searchExpr") || this._displayGetterExpr());
            dataSource.searchOperation(this.option("searchMode"));
            dataSource.searchValue(searchValue);
            dataSource.load().done(this._dataSourceFiltered.bind(this, searchValue))
        }
    },
    _clearFilter: function() {
        var dataSource = this._dataSource;
        dataSource && dataSource.searchValue() && dataSource.searchValue(null)
    },
    _dataSourceFiltered: function() {
        this._isLastMinSearchLengthExceeded = this._isMinSearchLengthExceeded();
        this._refreshList();
        this._refreshPopupVisibility()
    },
    _shouldOpenPopup: function() {
        return this._hasItemsToShow()
    },
    _refreshPopupVisibility: function() {
        if (this.option("readOnly") || !this._searchValue()) {
            return
        }
        var shouldOpenPopup = this._shouldOpenPopup();
        if (shouldOpenPopup && !this._isFocused()) {
            return
        }
        this.option("opened", shouldOpenPopup);
        if (shouldOpenPopup) {
            this._dimensionChanged()
        }
    },
    _dataSourceChangedHandler: function(newItems) {
        if (0 === this._dataSource.pageIndex()) {
            this.option().items = newItems
        } else {
            this.option().items = this.option().items.concat(newItems)
        }
    },
    _hasItemsToShow: function() {
        var resultItems = this._dataSource && this._dataSource.items() || [];
        var resultAmount = resultItems.length;
        var isMinSearchLengthExceeded = this._needPassDataSourceToList();
        return !!(isMinSearchLengthExceeded && resultAmount)
    },
    _clearSearchTimer: function() {
        clearTimeout(this._searchTimer);
        delete this._searchTimer
    },
    _popupShowingHandler: function() {
        this._dimensionChanged()
    },
    _dimensionChanged: function() {
        this.callBase(arguments);
        this._popup && this._updatePopupDimensions()
    },
    _needPopupRepaint: function() {
        if (!this._dataSource) {
            return false
        }
        var currentPageIndex = this._dataSource.pageIndex();
        var needRepaint = (0, _type.isDefined)(this._pageIndex) && currentPageIndex <= this._pageIndex;
        this._pageIndex = currentPageIndex;
        return needRepaint
    },
    _updatePopupDimensions: function() {
        if (this._needPopupRepaint()) {
            this._popup.repaint()
        }
        this._list && this._list.updateDimensions()
    },
    _getMaxHeight: function() {
        var $element = this.$element();
        var $customBoundaryContainer = this._$customBoundaryContainer;
        var offsetTop = $element.offset().top - ($customBoundaryContainer ? $customBoundaryContainer.offset().top : 0);
        var windowHeight = (0, _renderer.default)(window).outerHeight();
        var containerHeight = $customBoundaryContainer ? Math.min($customBoundaryContainer.outerHeight(), windowHeight) : windowHeight;
        var maxHeight = Math.max(offsetTop, containerHeight - offsetTop - $element.outerHeight());
        return Math.min(.5 * containerHeight, maxHeight)
    },
    _clean: function() {
        if (this._list) {
            delete this._list
        }
        delete this._isLastMinSearchLengthExceeded;
        this.callBase()
    },
    _dispose: function() {
        this._clearSearchTimer();
        this.callBase()
    },
    _setCollectionWidgetOption: function() {
        this._setListOption.apply(this, arguments)
    },
    _setSubmitValue: function() {
        var value = this.option("value");
        var submitValue = this._shouldUseDisplayValue(value) ? this._displayGetter(value) : value;
        this._getSubmitElement().val(submitValue)
    },
    _shouldUseDisplayValue: function(value) {
        return "this" === this.option("valueExpr") && (0, _type.isObject)(value)
    },
    _optionChanged: function(args) {
        this._dataExpressionOptionChanged(args);
        switch (args.name) {
            case "hoverStateEnabled":
            case "focusStateEnabled":
                this._isDesktopDevice() && this._setListOption(args.name, args.value);
                this.callBase(args);
                break;
            case "items":
                if (!this.option("dataSource")) {
                    this._processDataSourceChanging()
                }
                break;
            case "dataSource":
                this._processDataSourceChanging();
                break;
            case "valueExpr":
                this._renderValue();
                this._setListOption("keyExpr", this._getCollectionKeyExpr());
                break;
            case "displayExpr":
                this._renderValue();
                this._setListOption("displayExpr", this._displayGetterExpr());
                break;
            case "searchMode":
                this._validateSearchMode();
                break;
            case "minSearchLength":
                this._refreshList();
                break;
            case "searchEnabled":
            case "showDataBeforeSearch":
            case "searchExpr":
                this._invalidate();
                break;
            case "onContentReady":
                this._initContentReadyAction();
                break;
            case "onSelectionChanged":
                this._initSelectionChangedAction();
                break;
            case "onItemClick":
                this._initItemClickAction();
                break;
            case "grouped":
            case "groupTemplate":
            case "wrapItemText":
            case "noDataText":
                this._setListOption(args.name);
                break;
            case "displayValue":
                this.option("text", args.value);
                break;
            case "itemTemplate":
            case "searchTimeout":
                break;
            case "selectedItem":
                if (args.previousValue !== args.value) {
                    this._selectionChangedAction({
                        selectedItem: args.value
                    })
                }
                break;
            default:
                this.callBase(args)
        }
    }
}).include(_ui3.default, _grouped_data_converter_mixin.default);
(0, _component_registrator.default)("dxDropDownList", DropDownList);
var _default = DropDownList;
exports.default = _default;
module.exports = exports.default;
