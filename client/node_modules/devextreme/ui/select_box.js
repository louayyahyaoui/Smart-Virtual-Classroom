/**
 * DevExtreme (ui/select_box.js)
 * Version: 20.2.6
 * Build date: Tue Mar 16 2021
 *
 * Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
exports.default = void 0;
var _renderer = _interopRequireDefault(require("../core/renderer"));
var _common = require("../core/utils/common");
var _type = require("../core/utils/type");
var _extend = require("../core/utils/extend");
var _array = require("../core/utils/array");
var _iterator = require("../core/utils/iterator");
var _deferred = require("../core/utils/deferred");
var _element = require("../core/element");
var _errors = _interopRequireDefault(require("../core/errors"));
var _dom_adapter = _interopRequireDefault(require("../core/dom_adapter"));
var _utils = require("./widget/utils.ink_ripple");
var _message = _interopRequireDefault(require("../localization/message"));
var _component_registrator = _interopRequireDefault(require("../core/component_registrator"));
var _ui = _interopRequireDefault(require("./drop_down_editor/ui.drop_down_list"));
var _index = require("../events/utils/index");

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        "default": obj
    }
}
var DISABLED_STATE_SELECTOR = ".dx-state-disabled";
var SELECTBOX_CLASS = "dx-selectbox";
var SELECTBOX_POPUP_CLASS = "dx-selectbox-popup";
var SELECTBOX_CONTAINER_CLASS = "dx-selectbox-container";
var SELECTBOX_POPUP_WRAPPER_CLASS = "dx-selectbox-popup-wrapper";
var SelectBox = _ui.default.inherit({
    _supportedKeys: function() {
        var that = this;
        var parent = this.callBase();
        var clearSelectBox = function(e) {
            var isEditable = this._isEditable();
            if (!isEditable) {
                if (this.option("showClearButton")) {
                    e.preventDefault();
                    this.reset()
                }
            } else {
                if (this._valueSubstituted()) {
                    this._preventFiltering = true
                }
            }
            this._savedTextRemoveEvent = e;
            this._preventSubstitution = true
        };
        var searchIfNeeded = function() {
            if (that.option("searchEnabled") && that._valueSubstituted()) {
                that._searchHandler()
            }
        };
        return (0, _extend.extend)({}, parent, {
            tab: function() {
                if (this.option("opened") && "instantly" === this.option("applyValueMode")) {
                    this._cleanInputSelection()
                }
                parent.tab && parent.tab.apply(this, arguments);
                this._cancelSearchIfNeed()
            },
            upArrow: function(e) {
                if (parent.upArrow && parent.upArrow.apply(this, arguments)) {
                    if (!this.option("opened")) {
                        this._setNextValue(e)
                    }
                    return true
                }
            },
            downArrow: function(e) {
                if (parent.downArrow && parent.downArrow.apply(this, arguments)) {
                    if (!this.option("opened")) {
                        this._setNextValue(e)
                    }
                    return true
                }
            },
            leftArrow: function() {
                searchIfNeeded();
                parent.leftArrow && parent.leftArrow.apply(this, arguments)
            },
            rightArrow: function() {
                searchIfNeeded();
                parent.rightArrow && parent.rightArrow.apply(this, arguments)
            },
            home: function() {
                searchIfNeeded();
                parent.home && parent.home.apply(this, arguments)
            },
            end: function() {
                searchIfNeeded();
                parent.end && parent.end.apply(this, arguments)
            },
            escape: function() {
                var result = parent.escape && parent.escape.apply(this, arguments);
                this._cancelEditing();
                return null !== result && void 0 !== result ? result : true
            },
            enter: function(e) {
                var isOpened = this.option("opened");
                var inputText = this._input().val().trim();
                var isCustomText = inputText && this._list && !this._list.option("focusedElement");
                if (!inputText && (0, _type.isDefined)(this.option("value")) && this.option("allowClearing")) {
                    this._saveValueChangeEvent(e);
                    this.option({
                        selectedItem: null,
                        value: null
                    });
                    this.close()
                } else {
                    if (this.option("acceptCustomValue")) {
                        e.preventDefault();
                        if (isCustomText) {
                            if (isOpened) {
                                this._toggleOpenState()
                            }
                            this._valueChangeEventHandler(e)
                        }
                        return isOpened
                    }
                    if (parent.enter && parent.enter.apply(this, arguments)) {
                        return isOpened
                    }
                }
            },
            space: function(e) {
                var isOpened = this.option("opened");
                var isSearchEnabled = this.option("searchEnabled");
                var acceptCustomValue = this.option("acceptCustomValue");
                if (!isOpened || isSearchEnabled || acceptCustomValue) {
                    return
                }
                e.preventDefault();
                this._valueChangeEventHandler(e);
                return true
            },
            backspace: clearSelectBox,
            del: clearSelectBox
        })
    },
    _getDefaultOptions: function() {
        return (0, _extend.extend)(this.callBase(), {
            placeholder: _message.default.format("Select"),
            fieldTemplate: null,
            valueChangeEvent: "change",
            acceptCustomValue: false,
            onCustomItemCreating: function(e) {
                if (!(0, _type.isDefined)(e.customItem)) {
                    e.customItem = e.text
                }
            },
            showSelectionControls: false,
            allowClearing: true,
            tooltipEnabled: false,
            openOnFieldClick: true,
            showDropDownButton: true,
            displayCustomValue: false,
            useInkRipple: false,
            useHiddenSubmitElement: true
        })
    },
    _init: function() {
        this.callBase();
        this._initCustomItemCreatingAction()
    },
    _initMarkup: function() {
        this.$element().addClass(SELECTBOX_CLASS);
        this._renderTooltip();
        this.option("useInkRipple") && this._renderInkRipple();
        this.callBase();
        this._$container.addClass(SELECTBOX_CONTAINER_CLASS)
    },
    _renderInkRipple: function() {
        this._inkRipple = (0, _utils.render)()
    },
    _toggleActiveState: function($element, value, e) {
        this.callBase.apply(this, arguments);
        if (!this._inkRipple || this._isEditable()) {
            return
        }
        var config = {
            element: this._inputWrapper(),
            event: e
        };
        if (value) {
            this._inkRipple.showWave(config)
        } else {
            this._inkRipple.hideWave(config)
        }
    },
    _createPopup: function() {
        this.callBase();
        this._popup.$element().addClass(SELECTBOX_POPUP_CLASS);
        this._popup.overlayContent().attr("tabindex", -1)
    },
    _popupWrapperClass: function() {
        return this.callBase() + " " + SELECTBOX_POPUP_WRAPPER_CLASS
    },
    _cancelEditing: function() {
        if (!this.option("searchEnabled") && this._list) {
            this._focusListElement(null);
            this._updateField(this.option("selectedItem"))
        }
    },
    _renderOpenedState: function() {
        this.callBase();
        if (this.option("opened")) {
            this._scrollToSelectedItem();
            this._focusSelectedElement()
        }
    },
    _focusSelectedElement: function() {
        var searchValue = this._searchValue();
        if (!searchValue) {
            this._focusListElement(null);
            return
        }
        var $listItems = this._list._itemElements();
        var index = (0, _array.inArray)(this.option("selectedItem"), this.option("items"));
        var focusedElement = index >= 0 && !this._isCustomItemSelected() ? $listItems.eq(index) : null;
        this._focusListElement(focusedElement)
    },
    _renderFocusedElement: function() {
        if (!this._list) {
            return
        }
        var searchValue = this._searchValue();
        if (!searchValue || this.option("acceptCustomValue")) {
            this._focusListElement(null);
            return
        }
        var $listItems = this._list._itemElements();
        var focusedElement = $listItems.not(DISABLED_STATE_SELECTOR).eq(0);
        this._focusListElement(focusedElement)
    },
    _focusListElement: function(element) {
        this._preventInputValueRender = true;
        this._list.option("focusedElement", (0, _element.getPublicElement)(element));
        delete this._preventInputValueRender
    },
    _scrollToSelectedItem: function() {
        this._list && this._list.scrollToItem(this._list.option("selectedItem"))
    },
    _listContentReadyHandler: function() {
        this.callBase();
        var isPaginate = this._dataSource && this._dataSource.paginate();
        if (isPaginate && this._needPopupRepaint()) {
            return
        }
        this._scrollToSelectedItem()
    },
    _renderValue: function() {
        this._renderInputValue();
        this._setSubmitValue();
        return (new _deferred.Deferred).resolve()
    },
    _renderInputValue: function() {
        return this.callBase().always(function() {
            this._renderInputValueAsync()
        }.bind(this))
    },
    _renderInputValueAsync: function() {
        this._renderTooltip();
        this._renderInputValueImpl().always(function() {
            this._refreshSelected()
        }.bind(this))
    },
    _renderInputValueImpl: function() {
        this._renderField();
        return (new _deferred.Deferred).resolve()
    },
    _setNextItem: function(step) {
        var item = this._calcNextItem(step);
        var value = this._valueGetter(item);
        this._setValue(value)
    },
    _setNextValue: function(e) {
        var dataSourceIsLoaded = this._dataSource.isLoaded() ? (new _deferred.Deferred).resolve() : this._dataSource.load();
        dataSourceIsLoaded.done(function() {
            var selectedIndex = this._getSelectedIndex();
            var hasPages = this._dataSource.pageSize();
            var isLastPage = this._dataSource.isLastPage();
            var isLastItem = selectedIndex === this._items().length - 1;
            this._saveValueChangeEvent(e);
            var step = "downArrow" === (0, _index.normalizeKeyName)(e) ? 1 : -1;
            if (hasPages && !isLastPage && isLastItem && step > 0) {
                if (!this._popup) {
                    this._createPopup()
                }
                if (!this._dataSource.isLoading()) {
                    this._list._loadNextPage().done(this._setNextItem.bind(this, step))
                }
            } else {
                this._setNextItem(step)
            }
        }.bind(this))
    },
    _setSelectedItem: function(item) {
        var isUnknownItem = !this._isCustomValueAllowed() && void 0 === item;
        this.callBase(isUnknownItem ? null : item);
        if (!isUnknownItem && (!this._isEditable() || this._isCustomItemSelected())) {
            this._setListOption("selectedItem", this.option("selectedItem"))
        }
    },
    _isCustomValueAllowed: function() {
        return this.option("acceptCustomValue") || this.callBase()
    },
    _displayValue: function(item) {
        item = !(0, _type.isDefined)(item) && this._isCustomValueAllowed() ? this.option("value") : item;
        return this.callBase(item)
    },
    _listConfig: function() {
        var result = (0, _extend.extend)(this.callBase(), {
            pageLoadMode: "scrollBottom",
            onSelectionChanged: this._getSelectionChangeHandler(),
            selectedItem: this.option("selectedItem"),
            onFocusedItemChanged: this._listFocusedItemChangeHandler.bind(this)
        });
        if (this.option("showSelectionControls")) {
            (0, _extend.extend)(result, {
                showSelectionControls: true,
                selectionByClick: true
            })
        }
        return result
    },
    _listFocusedItemChangeHandler: function(e) {
        if (this._preventInputValueRender) {
            return
        }
        var list = e.component;
        var focusedElement = (0, _renderer.default)(list.option("focusedElement"));
        var focusedItem = list._getItemData(focusedElement);
        this._updateField(focusedItem)
    },
    _updateField: function(item) {
        var fieldTemplate = this._getTemplateByOption("fieldTemplate");
        if (!(fieldTemplate && this.option("fieldTemplate"))) {
            var text = this._displayGetter(item);
            this.option("text", text);
            this._renderDisplayText(text);
            return
        }
        this._renderField()
    },
    _getSelectionChangeHandler: function() {
        return this.option("showSelectionControls") ? this._selectionChangeHandler.bind(this) : _common.noop
    },
    _selectionChangeHandler: function(e) {
        (0, _iterator.each)(e.addedItems || [], function(_, addedItem) {
            this._setValue(this._valueGetter(addedItem))
        }.bind(this))
    },
    _getActualSearchValue: function() {
        return this._dataSource.searchValue()
    },
    _toggleOpenState: function(isVisible) {
        if (this.option("disabled")) {
            return
        }
        isVisible = arguments.length ? isVisible : !this.option("opened");
        if (!isVisible && !this._shouldClearFilter()) {
            this._restoreInputText(true)
        }
        if (this._wasSearch() && isVisible) {
            this._wasSearch(false);
            var showDataImmediately = this.option("showDataBeforeSearch") || 0 === this.option("minSearchLength");
            if (showDataImmediately && this._dataSource) {
                if (this._searchTimer) {
                    return
                }
                var searchValue = this._getActualSearchValue();
                searchValue && this._wasSearch(true);
                this._filterDataSource(searchValue || null)
            } else {
                this._setListOption("items", [])
            }
        }
        if (isVisible) {
            this._scrollToSelectedItem()
        }
        this.callBase(isVisible)
    },
    _renderTooltip: function() {
        if (this.option("tooltipEnabled")) {
            this.$element().attr("title", this.option("displayValue"))
        }
    },
    _renderDimensions: function() {
        this.callBase();
        this._dimensionChanged()
    },
    _isValueEqualInputText: function() {
        var initialSelectedItem = this.option("selectedItem");
        var value = this._displayGetter(initialSelectedItem);
        var displayValue = value ? String(value) : "";
        var inputText = this._searchValue();
        return displayValue === inputText
    },
    _popupHidingHandler: function() {
        if (this._isValueEqualInputText()) {
            this._cancelEditing()
        }
        this.callBase()
    },
    _popupHiddenHandler: function() {
        this.callBase();
        if (this._shouldCancelSearch()) {
            this._wasSearch(false);
            this._searchCanceled();
            this._shouldCancelSearch(false)
        }
    },
    _restoreInputText: function(saveEditingValue) {
        if (this.option("readOnly")) {
            return
        }
        this._loadItemDeferred && this._loadItemDeferred.always(function() {
            var initialSelectedItem = this.option("selectedItem");
            if (this.option("acceptCustomValue")) {
                if (!saveEditingValue) {
                    this._updateField(initialSelectedItem);
                    this._clearFilter()
                }
                return
            }
            if (this.option("searchEnabled")) {
                if (!this._searchValue() && this.option("allowClearing")) {
                    this._clearTextValue();
                    return
                }
            }
            if (this._isValueEqualInputText()) {
                return
            }
            this._renderInputValue().always(function(selectedItem) {
                var newSelectedItem = (0, _common.ensureDefined)(selectedItem, initialSelectedItem);
                this._setSelectedItem(newSelectedItem);
                this._updateField(newSelectedItem);
                this._clearFilter()
            }.bind(this))
        }.bind(this))
    },
    _focusOutHandler: function(e) {
        if (!this._preventNestedFocusEvent(e)) {
            var isOverlayTarget = this._isOverlayNestedTarget(e.relatedTarget);
            if (!isOverlayTarget) {
                this._restoreInputText();
                this._clearSearchTimer()
            }
            this._cancelSearchIfNeed(e)
        }
        e.target = this._input().get(0);
        this.callBase(e)
    },
    _cancelSearchIfNeed: function(e) {
        var _this$option = this.option(),
            searchEnabled = _this$option.searchEnabled;
        var isOverlayTarget = this._isOverlayNestedTarget(null === e || void 0 === e ? void 0 : e.relatedTarget);
        var shouldCancelSearch = this._wasSearch() && searchEnabled && !isOverlayTarget;
        if (shouldCancelSearch) {
            var _this$_popup;
            var isPopupVisible = null === (_this$_popup = this._popup) || void 0 === _this$_popup ? void 0 : _this$_popup._hideAnimationProcessing;
            if (isPopupVisible) {
                this._shouldCancelSearch(true)
            } else {
                this._wasSearch(false);
                this._searchCanceled()
            }
        }
    },
    _shouldCancelSearch: function(value) {
        if (!arguments.length) {
            return this._shouldCancelSearchValue
        }
        this._shouldCancelSearchValue = value
    },
    _isOverlayNestedTarget: function(target) {
        return !!(0, _renderer.default)(target).closest(".".concat(SELECTBOX_POPUP_WRAPPER_CLASS)).length
    },
    _clearTextValue: function() {
        if (this.option("selectedItem")) {
            if (this._savedTextRemoveEvent) {
                this._saveValueChangeEvent(this._savedTextRemoveEvent)
            }
            this.option("value", null)
        }
        delete this._savedTextRemoveEvent
    },
    _shouldOpenPopup: function() {
        return this._needPassDataSourceToList() && this._wasSearch()
    },
    _isFocused: function() {
        var activeElement = _dom_adapter.default.getActiveElement();
        return this.callBase() && (0, _renderer.default)(activeElement).closest(this._input()).length > 0
    },
    _renderValueChangeEvent: function() {
        if (this._isEditable()) {
            this.callBase()
        }
    },
    _isEditable: function() {
        return this.option("acceptCustomValue") || this.option("searchEnabled")
    },
    _fieldRenderData: function() {
        var $listFocused = this._list && this.option("opened") && (0, _renderer.default)(this._list.option("focusedElement"));
        if ($listFocused && $listFocused.length) {
            return this._list._getItemData($listFocused)
        }
        return this.option("selectedItem")
    },
    _readOnlyPropValue: function() {
        return !this._isEditable() || this.option("readOnly")
    },
    _isSelectedValue: function(value) {
        return this._isValueEquals(value, this.option("value"))
    },
    _shouldCloseOnItemClick: function() {
        return !(this.option("showSelectionControls") && "single" !== this.option("selectionMode"))
    },
    _listItemClickHandler: function(e) {
        var previousValue = this._getCurrentValue();
        this._focusListElement((0, _renderer.default)(e.itemElement));
        this._saveValueChangeEvent(e.event);
        this._completeSelection(this._valueGetter(e.itemData));
        if (this._shouldCloseOnItemClick()) {
            this.option("opened", false)
        }
        if (this.option("searchEnabled") && previousValue === this._valueGetter(e.itemData)) {
            this._updateField(e.itemData)
        }
        if (this._shouldClearFilter()) {
            this._cancelSearchIfNeed()
        }
    },
    _shouldClearFilter: function() {
        return this._wasSearch()
    },
    _completeSelection: function(value) {
        this._setValue(value)
    },
    _loadItem: function(value, cache) {
        var that = this;
        var deferred = new _deferred.Deferred;
        this.callBase(value, cache).done(function(item) {
            deferred.resolve(item)
        }.bind(this)).fail(function() {
            var selectedItem = that.option("selectedItem");
            if (that.option("acceptCustomValue") && value === that._valueGetter(selectedItem)) {
                deferred.resolve(selectedItem)
            } else {
                deferred.reject()
            }
        }.bind(this));
        return deferred.promise()
    },
    _loadInputValue: function(value, callback) {
        this._loadItemDeferred = this._loadItem(value).always(callback);
        return this._loadItemDeferred
    },
    _isCustomItemSelected: function() {
        var selectedItem = this.option("selectedItem");
        var searchValue = this._searchValue();
        var selectedItemText = this._displayGetter(selectedItem);
        return !selectedItemText || searchValue !== selectedItemText.toString()
    },
    _valueChangeEventHandler: function(e) {
        if (this.option("acceptCustomValue") && this._isCustomItemSelected() && !this._isValueChanging) {
            this._isValueChanging = true;
            this._customItemAddedHandler(e);
            this._isValueChanging = false
        }
    },
    _initCustomItemCreatingAction: function() {
        this._customItemCreatingAction = this._createActionByOption("onCustomItemCreating")
    },
    _createCustomItem: function(text) {
        var params = {
            text: text
        };
        var actionResult = this._customItemCreatingAction(params);
        var item = (0, _common.ensureDefined)(actionResult, params.customItem);
        if ((0, _type.isDefined)(actionResult)) {
            _errors.default.log("W0015", "onCustomItemCreating", "customItem")
        }
        return item
    },
    _customItemAddedHandler: function(e) {
        var searchValue = this._searchValue();
        var item = this._createCustomItem(searchValue);
        this._saveValueChangeEvent(e);
        if (void 0 === item) {
            this._renderValue();
            throw _errors.default.Error("E0121")
        }
        if ((0, _type.isPromise)(item)) {
            (0, _deferred.fromPromise)(item).done(this._setCustomItem.bind(this)).fail(this._setCustomItem.bind(this, null))
        } else {
            this._setCustomItem(item)
        }
    },
    _setCustomItem: function(item) {
        if (this._disposed) {
            return
        }
        item = item || null;
        this.option("selectedItem", item);
        this._cancelSearchIfNeed();
        this._setValue(this._valueGetter(item));
        this._renderDisplayText(this._displayGetter(item))
    },
    _clearValueHandler: function(e) {
        this.callBase(e);
        return false
    },
    _wasSearch: function(value) {
        if (!arguments.length) {
            return this._wasSearchValue
        }
        this._wasSearchValue = value
    },
    _searchHandler: function(e) {
        if (this._preventFiltering) {
            delete this._preventFiltering;
            return
        }
        if (this._needPassDataSourceToList()) {
            this._wasSearch(true)
        }
        this.callBase(e)
    },
    _dataSourceFiltered: function(searchValue) {
        this.callBase();
        if (null !== searchValue) {
            this._renderInputSubstitution();
            this._renderFocusedElement()
        }
    },
    _valueSubstituted: function() {
        var input = this._input().get(0);
        var isAllSelected = 0 === input.selectionStart && input.selectionEnd === this._searchValue().length;
        var inputHasSelection = input.selectionStart !== input.selectionEnd;
        return this._wasSearch() && inputHasSelection && !isAllSelected
    },
    _shouldSubstitutionBeRendered: function() {
        return !this._preventSubstitution && this.option("searchEnabled") && !this.option("acceptCustomValue") && "startswith" === this.option("searchMode")
    },
    _renderInputSubstitution: function() {
        if (!this._shouldSubstitutionBeRendered()) {
            delete this._preventSubstitution;
            return
        }
        var item = this._list && this._getPlainItems(this._list.option("items"))[0];
        if (!item) {
            return
        }
        var $input = this._input();
        var valueLength = $input.val().length;
        if (0 === valueLength) {
            return
        }
        var inputElement = $input.get(0);
        var displayValue = this._displayGetter(item).toString();
        inputElement.value = displayValue;
        this._caret({
            start: valueLength,
            end: displayValue.length
        })
    },
    _cleanInputSelection: function() {
        var inputElement = this._input().get(0);
        var endPosition = inputElement.value.length;
        inputElement.selectionStart = endPosition;
        inputElement.selectionEnd = endPosition
    },
    _dispose: function() {
        this._renderInputValueAsync = _common.noop;
        delete this._loadItemDeferred;
        this.callBase()
    },
    _optionChanged: function(args) {
        switch (args.name) {
            case "onCustomItemCreating":
                this._initCustomItemCreatingAction();
                break;
            case "tooltipEnabled":
                this._renderTooltip();
                break;
            case "displayCustomValue":
            case "acceptCustomValue":
            case "showSelectionControls":
            case "useInkRipple":
                this._invalidate();
                break;
            case "allowClearing":
                break;
            default:
                this.callBase(args)
        }
    },
    _clean: function() {
        delete this._inkRipple;
        this.callBase()
    }
});
(0, _component_registrator.default)("dxSelectBox", SelectBox);
var _default = SelectBox;
exports.default = _default;
module.exports = exports.default;
module.exports.default = module.exports;
