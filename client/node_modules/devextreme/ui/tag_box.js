/**
 * DevExtreme (ui/tag_box.js)
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
var _element_data = require("../core/element_data");
var _events_engine = _interopRequireDefault(require("../events/core/events_engine"));
var _component_registrator = _interopRequireDefault(require("../core/component_registrator"));
var _common = require("../core/utils/common");
var _selection_filter = require("../core/utils/selection_filter");
var _deferred = require("../core/utils/deferred");
var _dom = require("../core/utils/dom");
var _element = require("../core/element");
var _type = require("../core/utils/type");
var _window = require("../core/utils/window");
var _extend = require("../core/utils/extend");
var _array = require("../core/utils/array");
var _iterator = require("../core/utils/iterator");
var _message = _interopRequireDefault(require("../localization/message"));
var _index = require("../events/utils/index");
var _click = require("../events/click");
var _utils = _interopRequireDefault(require("./text_box/utils.caret"));
var _utils2 = require("../data/data_source/utils");
var _scroll_rtl_behavior = _interopRequireDefault(require("../core/utils/scroll_rtl_behavior"));
var _select_box = _interopRequireDefault(require("./select_box"));
var _bindable_template = require("../core/templates/bindable_template");
var _utils3 = require("./text_box/utils.scroll");

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
var TAGBOX_TAG_DATA_KEY = "dxTagData";
var TAGBOX_CLASS = "dx-tagbox";
var TAGBOX_TAG_CONTAINER_CLASS = "dx-tag-container";
var TAGBOX_TAG_CLASS = "dx-tag";
var TAGBOX_MULTI_TAG_CLASS = "dx-tagbox-multi-tag";
var TAGBOX_CUSTOM_TAG_CLASS = "dx-tag-custom";
var TAGBOX_TAG_REMOVE_BUTTON_CLASS = "dx-tag-remove-button";
var TAGBOX_ONLY_SELECT_CLASS = "dx-tagbox-only-select";
var TAGBOX_SINGLE_LINE_CLASS = "dx-tagbox-single-line";
var TAGBOX_POPUP_WRAPPER_CLASS = "dx-tagbox-popup-wrapper";
var TAGBOX_TAG_CONTENT_CLASS = "dx-tag-content";
var TAGBOX_DEFAULT_FIELD_TEMPLATE_CLASS = "dx-tagbox-default-template";
var TAGBOX_CUSTOM_FIELD_TEMPLATE_CLASS = "dx-tagbox-custom-template";
var NATIVE_CLICK_CLASS = "dx-native-click";
var TEXTEDITOR_INPUT_CONTAINER_CLASS = "dx-texteditor-input-container";
var TAGBOX_MOUSE_WHEEL_DELTA_MULTIPLIER = -.3;
var TagBox = _select_box.default.inherit({
    _supportedKeys: function() {
        var _this = this;
        var parent = this.callBase();
        var sendToList = function(options) {
            return _this._list._keyboardHandler(options)
        };
        var rtlEnabled = this.option("rtlEnabled");
        return (0, _extend.extend)({}, parent, {
            backspace: function(e) {
                if (!this._isCaretAtTheStart()) {
                    return
                }
                this._processKeyboardEvent(e);
                this._isTagRemoved = true;
                var $tagToDelete = this._$focusedTag || this._tagElements().last();
                if (this._$focusedTag) {
                    this._moveTagFocus("prev", true)
                }
                if (0 === $tagToDelete.length) {
                    return
                }
                this._preserveFocusedTag = true;
                this._removeTagElement($tagToDelete);
                delete this._preserveFocusedTag
            },
            upArrow: function(e, opts) {
                return e.altKey || !_this._list ? parent.upArrow.call(_this, e) : sendToList(opts)
            },
            downArrow: function(e, opts) {
                return e.altKey || !_this._list ? parent.downArrow.call(_this, e) : sendToList(opts)
            },
            del: function(e) {
                if (!this._$focusedTag || !this._isCaretAtTheStart()) {
                    return
                }
                this._processKeyboardEvent(e);
                this._isTagRemoved = true;
                var $tagToDelete = this._$focusedTag;
                this._moveTagFocus("next", true);
                this._preserveFocusedTag = true;
                this._removeTagElement($tagToDelete);
                delete this._preserveFocusedTag
            },
            enter: function(e, options) {
                var isListItemFocused = this._list && null !== this._list.option("focusedElement");
                var isCustomItem = this.option("acceptCustomValue") && !isListItemFocused;
                if (isCustomItem) {
                    e.preventDefault();
                    "" !== this._searchValue() && this._customItemAddedHandler(e);
                    return
                }
                if (this.option("opened")) {
                    this._saveValueChangeEvent(e);
                    sendToList(options);
                    e.preventDefault()
                }
            },
            space: function(e, options) {
                var isOpened = this.option("opened");
                var isInputActive = this._shouldRenderSearchEvent();
                if (isOpened && !isInputActive) {
                    this._saveValueChangeEvent(e);
                    sendToList(options);
                    e.preventDefault()
                }
            },
            leftArrow: function(e) {
                if (!this._isCaretAtTheStart() || this._isEmpty() || this._isEditable() && rtlEnabled && !this._$focusedTag) {
                    return
                }
                e.preventDefault();
                var direction = rtlEnabled ? "next" : "prev";
                this._moveTagFocus(direction);
                !this.option("multiline") && this._scrollContainer(direction)
            },
            rightArrow: function(e) {
                if (!this._isCaretAtTheStart() || this._isEmpty() || this._isEditable() && !rtlEnabled && !this._$focusedTag) {
                    return
                }
                e.preventDefault();
                var direction = rtlEnabled ? "prev" : "next";
                this._moveTagFocus(direction);
                !this.option("multiline") && this._scrollContainer(direction)
            }
        })
    },
    _processKeyboardEvent: function(e) {
        e.preventDefault();
        e.stopPropagation();
        this._saveValueChangeEvent(e)
    },
    _isEmpty: function() {
        return 0 === this._getValue().length
    },
    _updateTagsContainer: function($element) {
        this._$tagsContainer = $element.addClass(TAGBOX_TAG_CONTAINER_CLASS).addClass(NATIVE_CLICK_CLASS);
        this._$tagsContainer.parent().addClass(NATIVE_CLICK_CLASS)
    },
    _allowSelectItemByTab: function() {
        return false
    },
    _isCaretAtTheStart: function() {
        var position = (0, _utils.default)(this._input());
        return 0 === position.start && 0 === position.end
    },
    _moveTagFocus: function(direction, clearOnBoundary) {
        if (!this._$focusedTag) {
            var tagElements = this._tagElements();
            this._$focusedTag = "next" === direction ? tagElements.first() : tagElements.last();
            this._toggleFocusClass(true, this._$focusedTag);
            return
        }
        var $nextFocusedTag = this._$focusedTag[direction](".".concat(TAGBOX_TAG_CLASS));
        if ($nextFocusedTag.length > 0) {
            this._replaceFocusedTag($nextFocusedTag)
        } else {
            if (clearOnBoundary || "next" === direction && this._isEditable()) {
                this._clearTagFocus()
            }
        }
    },
    _replaceFocusedTag: function($nextFocusedTag) {
        this._toggleFocusClass(false, this._$focusedTag);
        this._$focusedTag = $nextFocusedTag;
        this._toggleFocusClass(true, this._$focusedTag)
    },
    _clearTagFocus: function() {
        if (!this._$focusedTag) {
            return
        }
        this._toggleFocusClass(false, this._$focusedTag);
        delete this._$focusedTag
    },
    _focusClassTarget: function($element) {
        if ($element && $element.length && $element[0] !== this._focusTarget()[0]) {
            return $element
        }
        return this.callBase()
    },
    _scrollContainer: function(direction) {
        if (this.option("multiline") || !(0, _window.hasWindow)()) {
            return
        }
        if (!this._$tagsContainer) {
            return
        }
        var scrollPosition = this._getScrollPosition(direction);
        this._$tagsContainer.scrollLeft(scrollPosition)
    },
    _getScrollPosition: function(direction) {
        if ("start" === direction || "end" === direction) {
            return this._getBorderPosition(direction)
        }
        return this._$focusedTag ? this._getFocusedTagPosition(direction) : this._getBorderPosition("end")
    },
    _getBorderPosition: function(direction) {
        var rtlEnabled = this.option("rtlEnabled");
        var isScrollLeft = "end" === direction ^ rtlEnabled;
        var scrollBehavior = (0, _scroll_rtl_behavior.default)();
        var isScrollInverted = rtlEnabled && scrollBehavior.decreasing ^ scrollBehavior.positive;
        var scrollSign = !rtlEnabled || scrollBehavior.positive ? 1 : -1;
        return isScrollLeft ^ !isScrollInverted ? 0 : scrollSign * (this._$tagsContainer.get(0).scrollWidth - this._$tagsContainer.outerWidth())
    },
    _getFocusedTagPosition: function(direction) {
        var rtlEnabled = this.option("rtlEnabled");
        var isScrollLeft = "next" === direction ^ rtlEnabled;
        var _this$_$focusedTag$po = this._$focusedTag.position(),
            scrollOffset = _this$_$focusedTag$po.left;
        var scrollLeft = this._$tagsContainer.scrollLeft();
        if (isScrollLeft) {
            scrollOffset += this._$focusedTag.outerWidth(true) - this._$tagsContainer.outerWidth()
        }
        if (isScrollLeft ^ scrollOffset < 0) {
            var scrollBehavior = (0, _scroll_rtl_behavior.default)();
            var scrollCorrection = rtlEnabled && !scrollBehavior.decreasing && scrollBehavior.positive ? -1 : 1;
            scrollLeft += scrollOffset * scrollCorrection
        }
        return scrollLeft
    },
    _setNextValue: _common.noop,
    _getDefaultOptions: function() {
        return (0, _extend.extend)(this.callBase(), {
            value: [],
            showDropDownButton: false,
            maxFilterLength: 1500,
            tagTemplate: "tag",
            selectAllText: _message.default.format("dxList-selectAll"),
            hideSelectedItems: false,
            selectedItems: [],
            selectAllMode: "page",
            onSelectAllValueChanged: null,
            maxDisplayedTags: void 0,
            showMultiTagOnly: true,
            onMultiTagPreparing: null,
            multiline: true,
            useSubmitBehavior: true
        })
    },
    _init: function() {
        this.callBase();
        this._selectedItems = [];
        this._initSelectAllValueChangedAction()
    },
    _initActions: function() {
        this.callBase();
        this._initMultiTagPreparingAction()
    },
    _initMultiTagPreparingAction: function() {
        this._multiTagPreparingAction = this._createActionByOption("onMultiTagPreparing", {
            beforeExecute: function(e) {
                this._multiTagPreparingHandler(e.args[0])
            }.bind(this),
            excludeValidators: ["disabled", "readOnly"]
        })
    },
    _multiTagPreparingHandler: function(args) {
        var _this$_getValue = this._getValue(),
            selectedCount = _this$_getValue.length;
        if (!this.option("showMultiTagOnly")) {
            args.text = _message.default.getFormatter("dxTagBox-moreSelected")(selectedCount - this.option("maxDisplayedTags") + 1)
        } else {
            args.text = _message.default.getFormatter("dxTagBox-selected")(selectedCount)
        }
    },
    _initDynamicTemplates: function() {
        this.callBase();
        this._templateManager.addDefaultTemplates({
            tag: new _bindable_template.BindableTemplate(function($container, data) {
                var _data$text;
                var $tagContent = (0, _renderer.default)("<div>").addClass(TAGBOX_TAG_CONTENT_CLASS);
                (0, _renderer.default)("<span>").text(null !== (_data$text = data.text) && void 0 !== _data$text ? _data$text : data).appendTo($tagContent);
                (0, _renderer.default)("<div>").addClass(TAGBOX_TAG_REMOVE_BUTTON_CLASS).appendTo($tagContent);
                $container.append($tagContent)
            }, ["text"], this.option("integrationOptions.watchMethod"), {
                text: this._displayGetter
            })
        })
    },
    _toggleSubmitElement: function(enabled) {
        if (enabled) {
            this._renderSubmitElement();
            this._setSubmitValue()
        } else {
            this._$submitElement && this._$submitElement.remove();
            delete this._$submitElement
        }
    },
    _renderSubmitElement: function() {
        if (!this.option("useSubmitBehavior")) {
            return
        }
        this._$submitElement = (0, _renderer.default)("<select>").attr("multiple", "multiple").css("display", "none").appendTo(this.$element())
    },
    _setSubmitValue: function() {
        if (!this.option("useSubmitBehavior")) {
            return
        }
        var value = this._getValue();
        var $options = [];
        for (var i = 0, n = value.length; i < n; i++) {
            var useDisplayText = this._shouldUseDisplayValue(value[i]);
            $options.push((0, _renderer.default)("<option>").val(useDisplayText ? this._displayGetter(value[i]) : value[i]).attr("selected", "selected"))
        }
        this._getSubmitElement().empty().append($options)
    },
    _initMarkup: function() {
        this._tagElementsCache = (0, _renderer.default)();
        var isSingleLineMode = !this.option("multiline");
        this.$element().addClass(TAGBOX_CLASS).toggleClass(TAGBOX_ONLY_SELECT_CLASS, !(this.option("searchEnabled") || this.option("acceptCustomValue"))).toggleClass(TAGBOX_SINGLE_LINE_CLASS, isSingleLineMode);
        this._initTagTemplate();
        this.callBase()
    },
    _render: function() {
        this.callBase();
        this._renderTagRemoveAction();
        this._renderSingleLineScroll();
        this._scrollContainer("start")
    },
    _initTagTemplate: function() {
        this._tagTemplate = this._getTemplateByOption("tagTemplate")
    },
    _renderField: function() {
        var isDefaultFieldTemplate = !(0, _type.isDefined)(this.option("fieldTemplate"));
        this.$element().toggleClass(TAGBOX_DEFAULT_FIELD_TEMPLATE_CLASS, isDefaultFieldTemplate).toggleClass(TAGBOX_CUSTOM_FIELD_TEMPLATE_CLASS, !isDefaultFieldTemplate);
        this.callBase()
    },
    _renderTagRemoveAction: function() {
        var tagRemoveAction = this._createAction(this._removeTagHandler.bind(this));
        var eventName = (0, _index.addNamespace)(_click.name, "dxTagBoxTagRemove");
        _events_engine.default.off(this._$tagsContainer, eventName);
        _events_engine.default.on(this._$tagsContainer, eventName, ".".concat(TAGBOX_TAG_REMOVE_BUTTON_CLASS), function(event) {
            tagRemoveAction({
                event: event
            })
        });
        this._renderTypingEvent()
    },
    _renderSingleLineScroll: function() {
        var mouseWheelEvent = (0, _index.addNamespace)("dxmousewheel", this.NAME);
        var $element = this.$element();
        var isMultiline = this.option("multiline");
        _events_engine.default.off($element, mouseWheelEvent);
        if ("desktop" !== _devices.default.real().deviceType) {
            this._$tagsContainer && this._$tagsContainer.css("overflowX", isMultiline ? "" : "auto");
            return
        }
        if (isMultiline) {
            return
        }
        _events_engine.default.on($element, mouseWheelEvent, this._tagContainerMouseWheelHandler.bind(this))
    },
    _tagContainerMouseWheelHandler: function(e) {
        var scrollLeft = this._$tagsContainer.scrollLeft();
        var delta = e.delta * TAGBOX_MOUSE_WHEEL_DELTA_MULTIPLIER;
        if (!(0, _index.isCommandKeyPressed)(e) && (0, _utils3.allowScroll)(this._$tagsContainer, delta, true)) {
            this._$tagsContainer.scrollLeft(scrollLeft + delta);
            return false
        }
    },
    _renderTypingEvent: function() {
        var _this2 = this;
        _events_engine.default.on(this._input(), (0, _index.addNamespace)("keydown", this.NAME), function(e) {
            var keyName = (0, _index.normalizeKeyName)(e);
            if (!_this2._isControlKey(keyName) && _this2._isEditable()) {
                _this2._clearTagFocus()
            }
        })
    },
    _popupWrapperClass: function() {
        return this.callBase() + " " + TAGBOX_POPUP_WRAPPER_CLASS
    },
    _renderInput: function() {
        this.callBase();
        this._renderPreventBlur(this._inputWrapper())
    },
    _renderInputValueImpl: function() {
        return this._renderMultiSelect()
    },
    _loadInputValue: function() {
        return (0, _deferred.when)()
    },
    _clearTextValue: function() {
        this._input().val("");
        this._toggleEmptinessEventHandler();
        this.option("text", "")
    },
    _focusInHandler: function(e) {
        if (!this._preventNestedFocusEvent(e)) {
            this._scrollContainer("end")
        }
        this.callBase(e)
    },
    _renderInputValue: function() {
        this.option("displayValue", this._searchValue());
        return this.callBase()
    },
    _restoreInputText: function(saveEditingValue) {
        if (!saveEditingValue) {
            this._clearTextValue()
        }
    },
    _focusOutHandler: function(e) {
        if (!this._preventNestedFocusEvent(e)) {
            this._clearTagFocus();
            this._scrollContainer("start")
        }
        this.callBase(e)
    },
    _getFirstPopupElement: function() {
        return this.option("showSelectionControls") ? this._list.$element() : this.callBase()
    },
    _initSelectAllValueChangedAction: function() {
        this._selectAllValueChangeAction = this._createActionByOption("onSelectAllValueChanged")
    },
    _renderList: function() {
        var _this3 = this;
        this.callBase();
        this._setListDataSourceFilter();
        if (this.option("showSelectionControls")) {
            this._list.registerKeyHandler("tab", function(e) {
                return _this3._popupElementTabHandler(e)
            });
            this._list.registerKeyHandler("escape", function(e) {
                return _this3._popupElementEscHandler(e)
            })
        }
    },
    _canListHaveFocus: function() {
        return "useButtons" === this.option("applyValueMode")
    },
    _listConfig: function() {
        var _this4 = this;
        var selectionMode = this.option("showSelectionControls") ? "all" : "multiple";
        return (0, _extend.extend)(this.callBase(), {
            selectionMode: selectionMode,
            selectAllText: this.option("selectAllText"),
            onSelectAllValueChanged: function(_ref) {
                var value = _ref.value;
                _this4._selectAllValueChangeAction({
                    value: value
                })
            },
            selectAllMode: this.option("selectAllMode"),
            selectedItems: this._selectedItems,
            onFocusedItemChanged: null
        })
    },
    _renderMultiSelect: function() {
        var _this5 = this;
        var d = new _deferred.Deferred;
        this._updateTagsContainer(this._$textEditorInputContainer);
        this._renderInputSize();
        this._renderTags().done(function() {
            _this5._popup && _this5._popup.refreshPosition();
            d.resolve()
        }).fail(d.reject);
        return d.promise()
    },
    _listItemClickHandler: function(e) {
        !this.option("showSelectionControls") && this._clearTextValue();
        if ("useButtons" === this.option("applyValueMode")) {
            return
        }
        this.callBase(e);
        this._saveValueChangeEvent(void 0)
    },
    _shouldClearFilter: function() {
        var shouldClearFilter = this.callBase();
        var showSelectionControls = this.option("showSelectionControls");
        return !showSelectionControls && shouldClearFilter
    },
    _renderInputSize: function() {
        var $input = this._input();
        var value = $input.val();
        var isEmptyInput = (0, _type.isString)(value) && value;
        var cursorWidth = 5;
        var width = "";
        var size = "";
        var canTypeText = this.option("searchEnabled") || this.option("acceptCustomValue");
        if (isEmptyInput && canTypeText) {
            var $calculationElement = (0, _dom.createTextElementHiddenCopy)($input, value, {
                includePaddings: true
            });
            $calculationElement.insertAfter($input);
            width = $calculationElement.outerWidth() + cursorWidth;
            $calculationElement.remove()
        } else {
            if (!value) {
                size = 1
            }
        }
        $input.css("width", width);
        $input.attr("size", size)
    },
    _renderInputSubstitution: function() {
        this.callBase();
        this._renderInputSize()
    },
    _getValue: function() {
        return this.option("value") || []
    },
    _multiTagRequired: function() {
        var values = this._getValue();
        var maxDisplayedTags = this.option("maxDisplayedTags");
        return (0, _type.isDefined)(maxDisplayedTags) && values.length > maxDisplayedTags
    },
    _renderMultiTag: function($input) {
        var $tag = (0, _renderer.default)("<div>").addClass(TAGBOX_TAG_CLASS).addClass(TAGBOX_MULTI_TAG_CLASS);
        var args = {
            multiTagElement: (0, _element.getPublicElement)($tag),
            selectedItems: this.option("selectedItems")
        };
        this._multiTagPreparingAction(args);
        if (args.cancel) {
            return false
        }
        $tag.data(TAGBOX_TAG_DATA_KEY, args.text);
        $tag.insertBefore($input);
        this._tagTemplate.render({
            model: args.text,
            container: (0, _element.getPublicElement)($tag)
        });
        return $tag
    },
    _getFilteredItems: function(values) {
        var _this$_list, _this6 = this;
        var creator = new _selection_filter.SelectionFilterCreator(values);
        var listSelectedItems = null === (_this$_list = this._list) || void 0 === _this$_list ? void 0 : _this$_list.option("selectedItems");
        var isListItemsLoaded = !!listSelectedItems && this._list.getDataSource().isLoaded();
        var selectedItems = listSelectedItems || this.option("selectedItems");
        var clientFilterFunction = creator.getLocalFilter(this._valueGetter);
        var filteredItems = selectedItems.filter(clientFilterFunction);
        var selectedItemsAlreadyLoaded = filteredItems.length === values.length;
        var d = new _deferred.Deferred;
        if ((!this._isDataSourceChanged || isListItemsLoaded) && selectedItemsAlreadyLoaded) {
            return d.resolve(filteredItems).promise()
        } else {
            var dataSource = this._dataSource;
            var dataSourceFilter = dataSource.filter();
            var filterExpr = creator.getCombinedFilter(this.option("valueExpr"), dataSourceFilter);
            var filterLength = encodeURI(JSON.stringify(filterExpr)).length;
            var filter = filterLength > this.option("maxFilterLength") ? void 0 : filterExpr;
            var _dataSource$loadOptio = dataSource.loadOptions(),
                customQueryParams = _dataSource$loadOptio.customQueryParams,
                expand = _dataSource$loadOptio.expand;
            dataSource.store().load({
                filter: filter,
                customQueryParams: customQueryParams,
                expand: expand
            }).done(function(data, extra) {
                _this6._isDataSourceChanged = false;
                if (_this6._disposed) {
                    d.reject();
                    return
                }
                var _normalizeLoadResult = (0, _utils2.normalizeLoadResult)(data, extra),
                    items = _normalizeLoadResult.data;
                var mappedItems = dataSource._applyMapFunction(items);
                d.resolve(mappedItems.filter(clientFilterFunction))
            }).fail(d.reject);
            return d.promise()
        }
    },
    _createTagsData: function(values, filteredItems) {
        var _this7 = this;
        var items = [];
        var cache = {};
        var isValueExprSpecified = "this" === this._valueGetterExpr();
        var filteredValues = {};
        filteredItems.forEach(function(filteredItem) {
            var filteredItemValue = isValueExprSpecified ? JSON.stringify(filteredItem) : _this7._valueGetter(filteredItem);
            filteredValues[filteredItemValue] = filteredItem
        });
        var loadItemPromises = [];
        values.forEach(function(value, index) {
            var currentItem = filteredValues[isValueExprSpecified ? JSON.stringify(value) : value];
            if (isValueExprSpecified && !(0, _type.isDefined)(currentItem)) {
                loadItemPromises.push(_this7._loadItem(value, cache).always(function(item) {
                    var newItem = _this7._createTagData(items, item, value, index);
                    items.splice(index, 0, newItem)
                }))
            } else {
                var newItem = _this7._createTagData(items, currentItem, value, index);
                items.splice(index, 0, newItem)
            }
        });
        var d = new _deferred.Deferred;
        _deferred.when.apply(this, loadItemPromises).always(function() {
            d.resolve(items)
        });
        return d.promise()
    },
    _createTagData: function(items, item, value, valueIndex) {
        if ((0, _type.isDefined)(item)) {
            this._selectedItems.push(item);
            return item
        } else {
            var selectedItem = this.option("selectedItem");
            var customItem = this._valueGetter(selectedItem) === value ? selectedItem : value;
            return customItem
        }
    },
    _isGroupedData: function() {
        return this.option("grouped") && !this._dataSource.group()
    },
    _getItemsByValues: function(values) {
        var resultItems = [];
        values.forEach(function(value) {
            var item = this._getItemFromPlain(value);
            if ((0, _type.isDefined)(item)) {
                resultItems.push(item)
            }
        }.bind(this));
        return resultItems
    },
    _getFilteredGroupedItems: function(values) {
        var selectedItems = new _deferred.Deferred;
        if (!this._dataSource.items().length) {
            this._dataSource.load().done(function() {
                selectedItems.resolve(this._getItemsByValues(values))
            }.bind(this)).fail(selectedItems.resolve([]))
        } else {
            selectedItems.resolve(this._getItemsByValues(values))
        }
        return selectedItems.promise()
    },
    _loadTagsData: function() {
        var _this8 = this;
        var values = this._getValue();
        var tagData = new _deferred.Deferred;
        this._selectedItems = [];
        var filteredItemsPromise = this._isGroupedData() ? this._getFilteredGroupedItems(values) : this._getFilteredItems(values);
        filteredItemsPromise.done(function(filteredItems) {
            var items = _this8._createTagsData(values, filteredItems);
            items.always(function(data) {
                tagData.resolve(data)
            })
        }).fail(tagData.reject.bind(this));
        return tagData.promise()
    },
    _renderTags: function() {
        var _this9 = this;
        var d = new _deferred.Deferred;
        var isPlainDataUsed = false;
        if (this._shouldGetItemsFromPlain(this._valuesToUpdate)) {
            this._selectedItems = this._getItemsFromPlain(this._valuesToUpdate);
            if (this._selectedItems.length === this._valuesToUpdate.length) {
                this._renderTagsImpl(this._selectedItems);
                isPlainDataUsed = true;
                d.resolve()
            }
        }
        if (!isPlainDataUsed) {
            this._loadTagsData().done(function(items) {
                if (_this9._disposed) {
                    d.reject();
                    return
                }
                _this9._renderTagsImpl(items);
                d.resolve()
            }).fail(d.reject)
        }
        return d.promise()
    },
    _renderTagsImpl: function(items) {
        this._renderTagsCore(items);
        this._renderEmptyState();
        if (!this._preserveFocusedTag) {
            this._clearTagFocus()
        }
    },
    _shouldGetItemsFromPlain: function(values) {
        return values && this._dataSource.isLoaded() && values.length <= this._getPlainItems().length
    },
    _getItemsFromPlain: function(values) {
        var selectedItems = this._getSelectedItemsFromList(values);
        var needFilterPlainItems = 0 === selectedItems.length && values.length > 0 || selectedItems.length < values.length;
        if (needFilterPlainItems) {
            var plainItems = this._getPlainItems();
            selectedItems = this._filterSelectedItems(plainItems, values)
        }
        return selectedItems
    },
    _getSelectedItemsFromList: function(values) {
        var _this$_list2;
        var listSelectedItems = null === (_this$_list2 = this._list) || void 0 === _this$_list2 ? void 0 : _this$_list2.option("selectedItems");
        var selectedItems = [];
        if (values.length === (null === listSelectedItems || void 0 === listSelectedItems ? void 0 : listSelectedItems.length)) {
            selectedItems = this._filterSelectedItems(listSelectedItems, values)
        }
        return selectedItems
    },
    _filterSelectedItems: function(plainItems, values) {
        var _this10 = this;
        var selectedItems = plainItems.filter(function(dataItem) {
            var currentValue;
            for (var i = 0; i < values.length; i++) {
                currentValue = values[i];
                if ((0, _type.isObject)(currentValue)) {
                    if (_this10._isValueEquals(dataItem, currentValue)) {
                        return true
                    }
                } else {
                    if (_this10._isValueEquals(_this10._valueGetter(dataItem), currentValue)) {
                        return true
                    }
                }
            }
            return false
        }, this);
        return selectedItems
    },
    _integrateInput: function() {
        this.callBase();
        this._updateTagsContainer((0, _renderer.default)(".".concat(TEXTEDITOR_INPUT_CONTAINER_CLASS)));
        this._renderTagRemoveAction()
    },
    _renderTagsCore: function(items) {
        var _this11 = this;
        this._renderField();
        this.option("selectedItems", this._selectedItems.slice());
        this._cleanTags();
        var $multiTag = this._multiTagRequired() && this._renderMultiTag(this._input());
        var showMultiTagOnly = this.option("showMultiTagOnly");
        var maxDisplayedTags = this.option("maxDisplayedTags");
        items.forEach(function(item, index) {
            if ($multiTag && showMultiTagOnly || $multiTag && !showMultiTagOnly && index - maxDisplayedTags >= -1) {
                return false
            }
            _this11._renderTag(item, $multiTag || _this11._input())
        });
        if (this._isFocused()) {
            this._scrollContainer("end")
        }
        this._refreshTagElements()
    },
    _cleanTags: function() {
        if (this._multiTagRequired()) {
            this._tagElements().remove()
        } else {
            var $tags = this._tagElements();
            var values = this._getValue();
            (0, _iterator.each)($tags, function(_, tag) {
                var $tag = (0, _renderer.default)(tag);
                var index = (0, _array.inArray)($tag.data(TAGBOX_TAG_DATA_KEY), values);
                if (index < 0) {
                    $tag.remove()
                }
            })
        }
    },
    _renderEmptyState: function() {
        var isEmpty = !(this._getValue().length || this._selectedItems.length || this._searchValue());
        this._toggleEmptiness(isEmpty);
        this._renderDisplayText()
    },
    _renderDisplayText: function() {
        this._renderInputSize()
    },
    _refreshTagElements: function() {
        this._tagElementsCache = this.$element().find(".".concat(TAGBOX_TAG_CLASS))
    },
    _tagElements: function() {
        return this._tagElementsCache
    },
    _applyTagTemplate: function(item, $tag) {
        this._tagTemplate.render({
            model: item,
            container: (0, _element.getPublicElement)($tag)
        })
    },
    _renderTag: function(item, $input) {
        var value = this._valueGetter(item);
        if (!(0, _type.isDefined)(value)) {
            return
        }
        var $tag = this._getTag(value);
        var displayValue = this._displayGetter(item);
        var itemModel = this._getItemModel(item, displayValue);
        if ($tag) {
            if ((0, _type.isDefined)(displayValue)) {
                $tag.empty();
                this._applyTagTemplate(itemModel, $tag)
            }
            $tag.removeClass(TAGBOX_CUSTOM_TAG_CLASS)
        } else {
            $tag = this._createTag(value, $input);
            if ((0, _type.isDefined)(item)) {
                this._applyTagTemplate(itemModel, $tag)
            } else {
                $tag.addClass(TAGBOX_CUSTOM_TAG_CLASS);
                this._applyTagTemplate(value, $tag)
            }
        }
    },
    _getItemModel: function(item, displayValue) {
        if ((0, _type.isObject)(item) && (0, _type.isDefined)(displayValue)) {
            return item
        } else {
            return (0, _common.ensureDefined)(displayValue, "")
        }
    },
    _getTag: function(value) {
        var $tags = this._tagElements();
        var tagsLength = $tags.length;
        var result = false;
        for (var i = 0; i < tagsLength; i++) {
            var $tag = $tags[i];
            var tagData = (0, _element_data.data)($tag, TAGBOX_TAG_DATA_KEY);
            if (value === tagData || (0, _common.equalByValue)(value, tagData)) {
                result = (0, _renderer.default)($tag);
                break
            }
        }
        return result
    },
    _createTag: function(value, $input) {
        return (0, _renderer.default)("<div>").addClass(TAGBOX_TAG_CLASS).data(TAGBOX_TAG_DATA_KEY, value).insertBefore($input)
    },
    _toggleEmptinessEventHandler: function() {
        this._toggleEmptiness(!this._getValue().length && !this._searchValue().length)
    },
    _customItemAddedHandler: function(e) {
        this.callBase(e);
        this._clearTextValue()
    },
    _removeTagHandler: function(args) {
        var e = args.event;
        e.stopPropagation();
        this._saveValueChangeEvent(e);
        var $tag = (0, _renderer.default)(e.target).closest(".".concat(TAGBOX_TAG_CLASS));
        this._removeTagElement($tag)
    },
    _removeTagElement: function($tag) {
        if ($tag.hasClass(TAGBOX_MULTI_TAG_CLASS)) {
            if (!this.option("showMultiTagOnly")) {
                this.option("value", this._getValue().slice(0, this.option("maxDisplayedTags")))
            } else {
                this.reset()
            }
            return
        }
        var itemValue = $tag.data(TAGBOX_TAG_DATA_KEY);
        this._removeTagWithUpdate(itemValue);
        this._refreshTagElements()
    },
    _updateField: _common.noop,
    _removeTagWithUpdate: function(itemValue) {
        var value = this._getValue().slice();
        this._removeTag(value, itemValue);
        this.option("value", value);
        if (0 === value.length) {
            this._clearTagFocus()
        }
    },
    _getCurrentValue: function() {
        return this._lastValue()
    },
    _selectionChangeHandler: function(e) {
        var _this12 = this;
        if ("useButtons" === this.option("applyValueMode")) {
            return
        }
        var value = this._getValue().slice();
        (0, _iterator.each)(e.removedItems || [], function(_, removedItem) {
            _this12._removeTag(value, _this12._valueGetter(removedItem))
        });
        (0, _iterator.each)(e.addedItems || [], function(_, addedItem) {
            _this12._addTag(value, _this12._valueGetter(addedItem))
        });
        this._updateWidgetHeight();
        if (!(0, _common.equalByValue)(this._list.option("selectedItemKeys"), this.option("value"))) {
            var listSelectionChangeEvent = this._list._getSelectionChangeEvent();
            listSelectionChangeEvent && this._saveValueChangeEvent(listSelectionChangeEvent);
            this.option("value", value)
        }
        this._list._saveSelectionChangeEvent(void 0)
    },
    _removeTag: function(value, item) {
        var index = this._valueIndex(item, value);
        if (index >= 0) {
            value.splice(index, 1)
        }
    },
    _addTag: function(value, item) {
        var index = this._valueIndex(item);
        if (index < 0) {
            value.push(item)
        }
    },
    _fieldRenderData: function() {
        return this._selectedItems.slice()
    },
    _completeSelection: function(value) {
        if (!this.option("showSelectionControls")) {
            this._setValue(value)
        }
    },
    _setValue: function(value) {
        if (null === value) {
            return
        }
        var useButtons = "useButtons" === this.option("applyValueMode");
        var valueIndex = this._valueIndex(value);
        var values = (useButtons ? this._list.option("selectedItemKeys") : this._getValue()).slice();
        if (valueIndex >= 0) {
            values.splice(valueIndex, 1)
        } else {
            values.push(value)
        }
        if ("useButtons" === this.option("applyValueMode")) {
            this._list.option("selectedItemKeys", values)
        } else {
            this.option("value", values)
        }
    },
    _isSelectedValue: function(value, cache) {
        return this._valueIndex(value, null, cache) > -1
    },
    _valueIndex: function(value, values, cache) {
        var _this13 = this;
        var result = -1;
        if (cache && "object" !== _typeof(value)) {
            if (!cache.indexByValues) {
                cache.indexByValues = {};
                values = values || this._getValue();
                values.forEach(function(value, index) {
                    cache.indexByValues[value] = index
                })
            }
            if (value in cache.indexByValues) {
                return cache.indexByValues[value]
            }
        }
        values = values || this._getValue();
        (0, _iterator.each)(values, function(index, selectedValue) {
            if (_this13._isValueEquals(value, selectedValue)) {
                result = index;
                return false
            }
        });
        return result
    },
    _lastValue: function() {
        var values = this._getValue();
        var lastValue = values[values.length - 1];
        return null !== lastValue && void 0 !== lastValue ? lastValue : null
    },
    _valueChangeEventHandler: _common.noop,
    _shouldRenderSearchEvent: function() {
        return this.option("searchEnabled") || this.option("acceptCustomValue")
    },
    _searchHandler: function(e) {
        if (this.option("searchEnabled") && !!e && !this._isTagRemoved) {
            this.callBase(e);
            this._setListDataSourceFilter()
        }
        this._updateWidgetHeight();
        delete this._isTagRemoved
    },
    _updateWidgetHeight: function() {
        var element = this.$element();
        var originalHeight = element.height();
        this._renderInputSize();
        var currentHeight = element.height();
        if (this._popup && this.option("opened") && this._isEditable() && currentHeight !== originalHeight) {
            this._popup.repaint()
        }
    },
    _refreshSelected: function() {
        var _this$_list3;
        (null === (_this$_list3 = this._list) || void 0 === _this$_list3 ? void 0 : _this$_list3.getDataSource()) && this._list.option("selectedItems", this._selectedItems)
    },
    _resetListDataSourceFilter: function() {
        var dataSource = this._getDataSource();
        if (!dataSource) {
            return
        }
        delete this._userFilter;
        dataSource.filter(null);
        dataSource.reload()
    },
    _setListDataSourceFilter: function() {
        if (!this.option("hideSelectedItems") || !this._list) {
            return
        }
        var dataSource = this._getDataSource();
        if (!dataSource) {
            return
        }
        var valueGetterExpr = this._valueGetterExpr();
        if ((0, _type.isString)(valueGetterExpr) && "this" !== valueGetterExpr) {
            var filter = this._dataSourceFilterExpr();
            if (void 0 === this._userFilter) {
                this._userFilter = dataSource.filter() || null
            }
            this._userFilter && filter.push(this._userFilter);
            filter.length ? dataSource.filter(filter) : dataSource.filter(null)
        } else {
            dataSource.filter(this._dataSourceFilterFunction.bind(this))
        }
        dataSource.load()
    },
    _dataSourceFilterExpr: function() {
        var _this14 = this;
        var filter = [];
        (0, _iterator.each)(this._getValue(), function(index, value) {
            filter.push(["!", [_this14._valueGetterExpr(), value]])
        });
        return filter
    },
    _dataSourceFilterFunction: function(itemData) {
        var _this15 = this;
        var itemValue = this._valueGetter(itemData);
        var result = true;
        (0, _iterator.each)(this._getValue(), function(index, value) {
            if (_this15._isValueEquals(value, itemValue)) {
                result = false;
                return false
            }
        });
        return result
    },
    _dataSourceChangedHandler: function() {
        this._isDataSourceChanged = true;
        this.callBase.apply(this, arguments)
    },
    _applyButtonHandler: function(args) {
        this._saveValueChangeEvent(args.event);
        this.option("value", this._getSortedListValues());
        this._clearTextValue();
        this.callBase();
        this._cancelSearchIfNeed()
    },
    _getSortedListValues: function() {
        var listValues = this._getListValues();
        var currentValue = this.option("value") || [];
        var existedItems = listValues.length ? currentValue.filter(function(item) {
            return listValues.indexOf(item) !== -1
        }) : [];
        var newItems = existedItems.length ? listValues.filter(function(item) {
            return currentValue.indexOf(item) === -1
        }) : listValues;
        return existedItems.concat(newItems)
    },
    _getListValues: function() {
        var _this16 = this;
        if (!this._list) {
            return []
        }
        var selectedItems = this._getPlainItems(this._list.option("selectedItems"));
        var result = [];
        (0, _iterator.each)(selectedItems, function(index, item) {
            result[index] = _this16._valueGetter(item)
        });
        return result
    },
    _setListDataSource: function() {
        var currentValue = this._getValue();
        this.callBase();
        if (currentValue !== this.option("value")) {
            this.option("value", currentValue)
        }
        this._refreshSelected()
    },
    _renderOpenedState: function() {
        this.callBase();
        if ("useButtons" === this.option("applyValueMode") && !this.option("opened")) {
            this._refreshSelected()
        }
    },
    reset: function() {
        this._restoreInputText();
        var defaultValue = this._getDefaultOptions().value;
        var currentValue = this.option("value");
        if (defaultValue && 0 === defaultValue.length && currentValue && defaultValue.length === currentValue.length) {
            return
        }
        this.callBase()
    },
    _clean: function() {
        this.callBase();
        delete this._defaultTagTemplate;
        delete this._valuesToUpdate;
        delete this._tagTemplate
    },
    _removeDuplicates: function(from, what) {
        var _this17 = this;
        var result = [];
        (0, _iterator.each)(from, function(_, value) {
            var filteredItems = what.filter(function(item) {
                return _this17._valueGetter(value) === _this17._valueGetter(item)
            });
            if (!filteredItems.length) {
                result.push(value)
            }
        });
        return result
    },
    _optionChanged: function(args) {
        switch (args.name) {
            case "onSelectAllValueChanged":
                this._initSelectAllValueChangedAction();
                break;
            case "onMultiTagPreparing":
                this._initMultiTagPreparingAction();
                this._renderTags();
                break;
            case "hideSelectedItems":
                if (args.value) {
                    this._setListDataSourceFilter()
                } else {
                    this._resetListDataSourceFilter()
                }
                break;
            case "useSubmitBehavior":
                this._toggleSubmitElement(args.value);
                break;
            case "displayExpr":
                this.callBase(args);
                this._initTemplates();
                this._invalidate();
                break;
            case "tagTemplate":
                this._initTagTemplate();
                this._invalidate();
                break;
            case "selectAllText":
                this._setListOption("selectAllText", this.option("selectAllText"));
                break;
            case "value":
                this._valuesToUpdate = null === args || void 0 === args ? void 0 : args.value;
                this.callBase(args);
                this._valuesToUpdate = void 0;
                this._setListDataSourceFilter();
                break;
            case "maxDisplayedTags":
            case "showMultiTagOnly":
                this._renderTags();
                break;
            case "selectAllMode":
                this._setListOption(args.name, args.value);
                break;
            case "selectedItem":
                break;
            case "selectedItems":
                this._selectionChangedAction({
                    addedItems: this._removeDuplicates(args.value, args.previousValue),
                    removedItems: this._removeDuplicates(args.previousValue, args.value)
                });
                break;
            case "multiline":
                this.$element().toggleClass(TAGBOX_SINGLE_LINE_CLASS, !args.value);
                this._renderSingleLineScroll();
                break;
            case "maxFilterLength":
                break;
            default:
                this.callBase(args)
        }
    },
    _getActualSearchValue: function() {
        return this.callBase() || this._searchValue()
    },
    _popupHidingHandler: function() {
        this.callBase();
        this._clearFilter()
    }
});
(0, _component_registrator.default)("dxTagBox", TagBox);
var _default = TagBox;
exports.default = _default;
module.exports = exports.default;
module.exports.default = module.exports;
