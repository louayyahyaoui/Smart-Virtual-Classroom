/**
 * DevExtreme (ui/lookup.js)
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
var _window = require("../core/utils/window");
var _support = require("../core/utils/support");
var _common = require("../core/utils/common");
var _element = require("../core/element");
var _iterator = require("../core/utils/iterator");
var _extend = require("../core/utils/extend");
var _utils = require("./widget/utils.ink_ripple");
var _message = _interopRequireDefault(require("../localization/message"));
var _devices = _interopRequireDefault(require("../core/devices"));
var _component_registrator = _interopRequireDefault(require("../core/component_registrator"));
var _index = require("../events/utils/index");
var _ui = _interopRequireDefault(require("./drop_down_editor/ui.drop_down_list"));
var _themes = require("./themes");
var _click = require("../events/click");
var _popover = _interopRequireDefault(require("./popover"));
var _text_box = _interopRequireDefault(require("./text_box"));
var _child_default_template = require("../core/templates/child_default_template");
var _translator = require("../animation/translator");
var _type = require("../core/utils/type");
var _utils2 = require("./drop_down_editor/utils");

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        "default": obj
    }
}
var window = (0, _window.getWindow)();
var LOOKUP_CLASS = "dx-lookup";
var LOOKUP_SEARCH_CLASS = "dx-lookup-search";
var LOOKUP_SEARCH_WRAPPER_CLASS = "dx-lookup-search-wrapper";
var LOOKUP_FIELD_CLASS = "dx-lookup-field";
var LOOKUP_ARROW_CLASS = "dx-lookup-arrow";
var LOOKUP_FIELD_WRAPPER_CLASS = "dx-lookup-field-wrapper";
var LOOKUP_POPUP_CLASS = "dx-lookup-popup";
var LOOKUP_POPUP_WRAPPER_CLASS = "dx-lookup-popup-wrapper";
var LOOKUP_POPUP_SEARCH_CLASS = "dx-lookup-popup-search";
var LOOKUP_POPOVER_MODE = "dx-lookup-popover-mode";
var LOOKUP_EMPTY_CLASS = "dx-lookup-empty";
var LOOKUP_POPOVER_FLIP_VERTICAL_CLASS = "dx-popover-flipped-vertical";
var TEXTEDITOR_INPUT_CLASS = "dx-texteditor-input";
var LIST_ITEM_CLASS = "dx-list-item";
var LIST_ITEM_SELECTED_CLASS = "dx-list-item-selected";
var GROUP_LIST_HEADER_CLASS = "dx-list-group-header";
var MATERIAL_LOOKUP_LIST_ITEMS_COUNT = 5;
var MATERIAL_LOOKUP_LIST_PADDING = 8;
var Lookup = _ui.default.inherit({
    _supportedKeys: function() {
        return (0, _extend.extend)(this.callBase(), {
            space: function(e) {
                e.preventDefault();
                this._validatedOpening()
            },
            enter: function() {
                this._validatedOpening()
            }
        })
    },
    _getDefaultOptions: function() {
        return (0, _extend.extend)(this.callBase(), {
            placeholder: _message.default.format("Select"),
            searchPlaceholder: _message.default.format("Search"),
            searchEnabled: true,
            cleanSearchOnOpening: true,
            showCancelButton: true,
            showClearButton: false,
            clearButtonText: _message.default.format("Clear"),
            applyButtonText: _message.default.format("OK"),
            pullRefreshEnabled: false,
            useNativeScrolling: true,
            pullingDownText: _message.default.format("dxList-pullingDownText"),
            pulledDownText: _message.default.format("dxList-pulledDownText"),
            refreshingText: _message.default.format("dxList-refreshingText"),
            pageLoadingText: _message.default.format("dxList-pageLoadingText"),
            onScroll: null,
            onPullRefresh: null,
            onPageLoading: null,
            pageLoadMode: "scrollBottom",
            nextButtonText: _message.default.format("dxList-nextButtonText"),
            grouped: false,
            groupTemplate: "group",
            usePopover: false,
            showDropDownButton: false,
            focusStateEnabled: false,
            animation: {},
            dropDownOptions: {
                showTitle: true,
                width: function() {
                    return .8 * (0, _renderer.default)(window).width()
                },
                height: function() {
                    return .8 * (0, _renderer.default)(window).height()
                },
                shading: true,
                closeOnOutsideClick: false,
                position: void 0,
                animation: {},
                title: "",
                titleTemplate: "title",
                onTitleRendered: null,
                fullScreen: false
            },
            dropDownCentered: false,
            _scrollToSelectedItemEnabled: false,
            useHiddenSubmitElement: true
        })
    },
    _defaultOptionsRules: function() {
        var _this = this;
        var themeName = (0, _themes.current)();
        return this.callBase().concat([{
            device: function() {
                return !_support.nativeScrolling
            },
            options: {
                useNativeScrolling: false
            }
        }, {
            device: function(_device) {
                return !_devices.default.isSimulator() && "desktop" === _devices.default.real().deviceType && "generic" === _device.platform
            },
            options: {
                usePopover: true,
                dropDownOptions: {
                    height: "auto"
                }
            }
        }, {
            device: {
                platform: "ios",
                phone: true
            },
            options: {
                dropDownOptions: {
                    fullScreen: true
                }
            }
        }, {
            device: {
                platform: "ios",
                tablet: true
            },
            options: {
                dropDownOptions: {
                    width: function() {
                        return .4 * Math.min((0, _renderer.default)(window).width(), (0, _renderer.default)(window).height())
                    },
                    height: "auto"
                },
                usePopover: true,
                useInkRipple: false
            }
        }, {
            device: function() {
                return "desktop" === _devices.default.real().deviceType && !_devices.default.isSimulator()
            },
            options: {
                focusStateEnabled: true
            }
        }, {
            device: function() {
                return (0, _themes.isMaterial)(themeName)
            },
            options: {
                usePopover: false,
                searchEnabled: false,
                showCancelButton: false,
                dropDownCentered: true,
                _scrollToSelectedItemEnabled: true,
                dropDownOptions: {
                    closeOnOutsideClick: true,
                    width: function() {
                        return (0, _utils2.getElementWidth)(_this.$element())
                    },
                    height: function() {
                        return this._getPopupHeight()
                    }.bind(this),
                    showTitle: false,
                    shading: false
                }
            }
        }])
    },
    _init: function() {
        this.callBase();
        this._initActions()
    },
    _initActions: function() {
        this.callBase();
        this._initScrollAction();
        this._initPageLoadingAction();
        this._initPullRefreshAction()
    },
    _initPageLoadingAction: function() {
        this._pageLoadingAction = this._createActionByOption("onPageLoading")
    },
    _initPullRefreshAction: function() {
        this._pullRefreshAction = this._createActionByOption("onPullRefresh")
    },
    _initScrollAction: function() {
        this._scrollAction = this._createActionByOption("onScroll")
    },
    _scrollHandler: function(e) {
        this._scrollAction(e)
    },
    _pullRefreshHandler: function(e) {
        this._pullRefreshAction(e)
    },
    _pageLoadingHandler: function(e) {
        this._pageLoadingAction(e)
    },
    _initTemplates: function() {
        this.callBase();
        this._templateManager.addDefaultTemplates({
            group: new _child_default_template.ChildDefaultTemplate("group"),
            title: new _child_default_template.ChildDefaultTemplate("title")
        })
    },
    _initMarkup: function() {
        this.$element().addClass(LOOKUP_CLASS).toggleClass(LOOKUP_POPOVER_MODE, this.option("usePopover"));
        this.callBase()
    },
    _inputWrapper: function() {
        return this.$element().find("." + LOOKUP_FIELD_WRAPPER_CLASS)
    },
    _dataSourceOptions: function() {
        return (0, _extend.extend)(this.callBase(), {
            paginate: true
        })
    },
    _fireContentReadyAction: _common.noop,
    _popupWrapperClass: function() {
        return ""
    },
    _renderInput: function() {
        var _this2 = this;
        var fieldClickAction = this._createAction(function() {
            _this2._toggleOpenState()
        });
        this._$field = (0, _renderer.default)("<div>").addClass(LOOKUP_FIELD_CLASS);
        _events_engine.default.on(this._$field, (0, _index.addNamespace)(_click.name, this.NAME), function(e) {
            fieldClickAction({
                event: e
            })
        });
        var $arrow = (0, _renderer.default)("<div>").addClass(LOOKUP_ARROW_CLASS);
        this._$fieldWrapper = (0, _renderer.default)("<div>").addClass(LOOKUP_FIELD_WRAPPER_CLASS).append(this._$field).append($arrow).appendTo(this.$element());
        this.option("useInkRipple") && this._renderInkRipple()
    },
    _getInputContainer: function() {
        return this._$fieldWrapper
    },
    _renderInkRipple: function() {
        this._inkRipple = (0, _utils.render)()
    },
    _toggleOpenState: function() {
        this.callBase();
        if (!this.option("dropDownOptions.fullScreen") && this.option("_scrollToSelectedItemEnabled")) {
            this._setPopupPosition()
        }
    },
    _toggleActiveState: function($element, value, e) {
        this.callBase.apply(this, arguments);
        if (!this._inkRipple) {
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
    _renderField: function() {
        var fieldTemplate = this._getTemplateByOption("fieldTemplate");
        if (fieldTemplate && this.option("fieldTemplate")) {
            this._renderFieldTemplate(fieldTemplate);
            return
        }
        var displayValue = this.option("displayValue");
        this._updateField((0, _type.isDefined)(displayValue) && String(displayValue) || this.option("placeholder"));
        this.$element().toggleClass(LOOKUP_EMPTY_CLASS, !this.option("selectedItem"))
    },
    _renderDisplayText: function(text) {
        if (this._input().length) {
            this.callBase(text)
        } else {
            this._updateField(text)
        }
    },
    _updateField: function(text) {
        this._$field.text(text)
    },
    _renderFieldTemplate: function(template) {
        this._$field.empty();
        var data = this._fieldRenderData();
        template.render({
            model: data,
            container: (0, _element.getPublicElement)(this._$field)
        })
    },
    _fieldRenderData: function() {
        return this.option("selectedItem")
    },
    _popupShowingHandler: function() {
        this.callBase.apply(this, arguments);
        if (this.option("cleanSearchOnOpening")) {
            if (this.option("searchEnabled") && this._searchBox.option("value")) {
                this._searchBox.option("value", "");
                this._searchCanceled()
            }
            this._list && this._list.option("focusedElement", null)
        }
        if (this.option("dropDownOptions.fullScreen") && this.option("_scrollToSelectedItemEnabled")) {
            this._popup.option("position").of = (0, _renderer.default)(window)
        }
    },
    _scrollToSelectedItem: function() {
        var selectedIndex = this._list.option("selectedIndex");
        var listItems = this._list.option("items");
        var itemsCount = listItems.length;
        if (0 !== itemsCount) {
            if (this._list.option("grouped")) {
                this._list.scrollToItem({
                    group: itemsCount - 1,
                    item: listItems[itemsCount - 1].items.length - 1
                })
            } else {
                this._list.scrollToItem(itemsCount - 1)
            }
            this._list.scrollToItem(selectedIndex)
        }
    },
    _getDifferenceOffsets: function(selectedListItem) {
        return selectedListItem.offset().top - (0, _renderer.default)(this.element()).offset().top
    },
    _isCenteringEnabled: function(index, count) {
        return 1 < index && index < count - 2
    },
    _getPopupOffset: function() {
        var listItemsCount = this._listItemElements().length;
        if (0 === listItemsCount) {
            return
        }
        var selectedListItem = (0, _renderer.default)(this._list.element()).find("." + LIST_ITEM_SELECTED_CLASS);
        var selectedIndex = this._listItemElements().index(selectedListItem);
        var differenceOfHeights = (selectedListItem.height() - (0, _renderer.default)(this.element()).height()) / 2;
        var lookupOffset = (0, _renderer.default)(this._list.element()).offset().top;
        var dropDownHeightOption = this.option("dropDownOptions.height");
        var popupHeight = "function" === typeof dropDownHeightOption ? dropDownHeightOption() : dropDownHeightOption;
        var windowHeight = (0, _renderer.default)(window).height();
        var offsetTop = 0;
        if (selectedIndex !== -1) {
            if (this._isCenteringEnabled(selectedIndex, listItemsCount)) {
                this._scrollToSelectedItem();
                var scrollOffsetTop = (popupHeight - selectedListItem.height()) / 2 - this._getDifferenceOffsets(selectedListItem);
                this._list.scrollTo(this._list.scrollTop() + MATERIAL_LOOKUP_LIST_PADDING / 2 - scrollOffsetTop);
                offsetTop = differenceOfHeights + this._getDifferenceOffsets(selectedListItem);
                if (lookupOffset < offsetTop && selectedIndex !== listItemsCount - 3) {
                    this._list.scrollTo(this._list.scrollTop() + this._getDifferenceOffsets(selectedListItem) / 2);
                    offsetTop = differenceOfHeights + this._getDifferenceOffsets(selectedListItem)
                }
            } else {
                if (selectedIndex <= 1) {
                    this._list.scrollTo(0);
                    offsetTop = differenceOfHeights + this._getDifferenceOffsets(selectedListItem)
                } else {
                    if (selectedIndex >= listItemsCount - 2) {
                        this._scrollToSelectedItem();
                        offsetTop = differenceOfHeights + this._getDifferenceOffsets(selectedListItem)
                    }
                }
            }
            if (lookupOffset < offsetTop) {
                this._scrollToSelectedItem();
                offsetTop = differenceOfHeights + MATERIAL_LOOKUP_LIST_PADDING
            }
        }
        var offsetBottom = popupHeight - offsetTop - (0, _renderer.default)(this.element()).height();
        if (windowHeight - lookupOffset < offsetBottom) {
            this._list.scrollTo(this._list.scrollTop() + differenceOfHeights - offsetBottom);
            offsetTop = popupHeight - (0, _renderer.default)(this.element()).height() - MATERIAL_LOOKUP_LIST_PADDING
        }
        return offsetTop
    },
    _setPopupPosition: function() {
        if (!this.option("dropDownCentered")) {
            return
        }
        var flipped = this._popup._$wrapper.hasClass(LOOKUP_POPOVER_FLIP_VERTICAL_CLASS);
        if (flipped) {
            return
        }
        var popupContentParent = (0, _renderer.default)(this._popup.content()).parent();
        var popupOffset = this._getPopupOffset();
        var position = (0, _translator.locate)(popupContentParent);
        (0, _translator.move)(popupContentParent, {
            top: position.top - popupOffset
        })
    },
    _listItemGroupedElements: function() {
        var groups = this._list._itemContainer().children();
        var items = [];
        groups.each(function(_, group) {
            items.push((0, _renderer.default)(group).find("." + GROUP_LIST_HEADER_CLASS)[0]);
            var groupedItems = (0, _renderer.default)(group).find("." + LIST_ITEM_CLASS);
            groupedItems.each(function(_, item) {
                items.push(item)
            })
        });
        return (0, _renderer.default)(items)
    },
    _calculateListHeight: function(grouped) {
        var listItems = grouped ? this._listItemGroupedElements() : this._listItemElements();
        var selectedListItem = (0, _renderer.default)("." + LIST_ITEM_SELECTED_CLASS);
        var selectedIndex = listItems.index(selectedListItem);
        var listHeight = 0;
        var requireListItems = [];
        if (0 === listItems.length) {
            listHeight += MATERIAL_LOOKUP_LIST_PADDING
        } else {
            if (listItems.length < MATERIAL_LOOKUP_LIST_ITEMS_COUNT) {
                listItems.each(function(_, item) {
                    listHeight += (0, _renderer.default)(item).outerHeight()
                })
            } else {
                if (selectedIndex <= 1) {
                    requireListItems = listItems.slice(0, MATERIAL_LOOKUP_LIST_ITEMS_COUNT)
                } else {
                    if (this._isCenteringEnabled(selectedIndex, listItems.length)) {
                        requireListItems = listItems.slice(selectedIndex - 2, selectedIndex + 3)
                    } else {
                        requireListItems = listItems.slice(listItems.length - MATERIAL_LOOKUP_LIST_ITEMS_COUNT, listItems.length)
                    }
                }
                requireListItems.each(function(_, item) {
                    listHeight += (0, _renderer.default)(item).outerHeight()
                })
            }
        }
        return listHeight + (grouped ? MATERIAL_LOOKUP_LIST_PADDING : 2 * MATERIAL_LOOKUP_LIST_PADDING)
    },
    _getPopupHeight: function() {
        if (this._list && this._list.itemElements()) {
            return this._calculateListHeight(this.option("grouped")) + (this._$searchWrapper ? this._$searchWrapper.outerHeight() : 0) + (this._popup._$bottom ? this._popup._$bottom.outerHeight() : 0) + (this._popup._$title ? this._popup._$title.outerHeight() : 0)
        } else {
            return "auto"
        }
    },
    _renderPopup: function() {
        if (this.option("usePopover") && !this.option("dropDownOptions.fullScreen")) {
            if (this.option("_scrollToSelectedItemEnabled")) {
                this.callBase()
            } else {
                this._renderPopover()
            }
        } else {
            this.callBase()
        }
        this._$popup.addClass(LOOKUP_POPUP_CLASS);
        this._popup._wrapper().addClass(LOOKUP_POPUP_WRAPPER_CLASS)
    },
    _renderPopover: function() {
        this._popup = this._createComponent(this._$popup, _popover.default, (0, _extend.extend)(this._popupConfig(), this._options.cache("dropDownOptions"), {
            showEvent: null,
            hideEvent: null,
            target: this.$element(),
            _fixedPosition: false,
            fullScreen: false,
            shading: false,
            closeOnTargetScroll: true,
            width: this._isInitialOptionValue("dropDownOptions.width") ? function() {
                return this.$element().outerWidth()
            }.bind(this) : this._popupConfig().width
        }));
        this._popup.on({
            showing: this._popupShowingHandler.bind(this),
            shown: this._popupShownHandler.bind(this),
            hiding: this._popupHidingHandler.bind(this),
            hidden: this._popupHiddenHandler.bind(this),
            contentReady: this._contentReadyHandler.bind(this)
        });
        if (this.option("_scrollToSelectedItemEnabled")) {
            this._popup._$arrow.remove()
        }
        this._setPopupContentId(this._popup.$content());
        this._contentReadyHandler()
    },
    _popupHidingHandler: function() {
        this.callBase();
        this.option("focusStateEnabled") && this.focus()
    },
    _popupHiddenHandler: function() {
        this.callBase();
        if (this.option("_scrollToSelectedItemEnabled")) {
            (0, _translator.resetPosition)((0, _renderer.default)(this._popup.content()).parent())
        }
    },
    _preventFocusOnPopup: _common.noop,
    _popupConfig: function() {
        var _this3 = this;
        var result = (0, _extend.extend)(this.callBase(), {
            toolbarItems: this._getPopupToolbarItems(),
            closeOnTargetScroll: false,
            onPositioned: null,
            maxHeight: function() {
                return (0, _renderer.default)(window).height()
            },
            showTitle: this.option("dropDownOptions.showTitle"),
            title: this.option("dropDownOptions.title"),
            titleTemplate: this._getTemplateByOption("dropDownOptions.titleTemplate"),
            onTitleRendered: this.option("dropDownOptions.onTitleRendered"),
            fullScreen: this.option("dropDownOptions.fullScreen"),
            shading: this.option("dropDownOptions.shading"),
            closeOnOutsideClick: this.option("dropDownOptions.closeOnOutsideClick")
        });
        delete result.animation;
        delete result.position;
        if (this.option("_scrollToSelectedItemEnabled")) {
            result.position = this.option("dropDownCentered") ? {
                my: "left top",
                at: "left top",
                of: this.element()
            } : {
                my: "left top",
                at: "left bottom",
                of: this.element()
            };
            result.closeOnTargetScroll = true
        }(0, _iterator.each)(["position", "animation", "width", "height"], function(_, optionName) {
            var popupOptionValue = _this3.option("dropDownOptions.".concat(optionName));
            if (void 0 !== popupOptionValue) {
                result[optionName] = popupOptionValue
            }
        });
        return result
    },
    _getPopupToolbarItems: function() {
        var buttonsConfig = "useButtons" === this.option("applyValueMode") ? this._popupToolbarItemsConfig() : [];
        var cancelButton = this._getCancelButtonConfig();
        if (cancelButton) {
            buttonsConfig.push(cancelButton)
        }
        var clearButton = this._getClearButtonConfig();
        if (clearButton) {
            buttonsConfig.push(clearButton)
        }
        return this._applyButtonsLocation(buttonsConfig)
    },
    _popupToolbarItemsConfig: function() {
        return [{
            shortcut: "done",
            options: {
                onClick: this._applyButtonHandler.bind(this),
                text: this.option("applyButtonText")
            }
        }]
    },
    _getCancelButtonConfig: function() {
        var _this4 = this;
        return this.option("showCancelButton") ? {
            shortcut: "cancel",
            onClick: this._cancelButtonHandler.bind(this),
            options: {
                onInitialized: function(e) {
                    e.component.registerKeyHandler("escape", _this4.close.bind(_this4))
                },
                text: this.option("cancelButtonText")
            }
        } : null
    },
    _getClearButtonConfig: function() {
        return this.option("showClearButton") ? {
            shortcut: "clear",
            onClick: this._resetValue.bind(this),
            options: {
                text: this.option("clearButtonText")
            }
        } : null
    },
    _applyButtonHandler: function(args) {
        if (args) {
            this._saveValueChangeEvent(args.event)
        }
        this.option("value", this._valueGetter(this._currentSelectedItem()));
        this.callBase()
    },
    _cancelButtonHandler: function() {
        this._refreshSelected();
        this.callBase()
    },
    _refreshPopupVisibility: function() {
        if (this.option("opened")) {
            this._updatePopupDimensions()
        }
    },
    _dimensionChanged: function() {
        if (this.option("usePopover") && !this.option("dropDownOptions.width")) {
            this.option("dropDownOptions.width", this.$element().width())
        }
        this._popup && this._updatePopupDimensions()
    },
    _input: function() {
        return this._$searchBox || this.callBase()
    },
    _renderPopupContent: function() {
        this.callBase();
        this._renderSearch()
    },
    _renderSearch: function() {
        var _this5 = this;
        var isSearchEnabled = this.option("searchEnabled");
        this._toggleSearchClass(isSearchEnabled);
        if (isSearchEnabled) {
            var $searchWrapper = this._$searchWrapper = (0, _renderer.default)("<div>").addClass(LOOKUP_SEARCH_WRAPPER_CLASS);
            var $searchBox = this._$searchBox = (0, _renderer.default)("<div>").addClass(LOOKUP_SEARCH_CLASS).appendTo($searchWrapper);
            var currentDevice = _devices.default.current();
            var searchMode = currentDevice.android && currentDevice.version[0] >= 5 ? "text" : "search";
            var isKeyboardListeningEnabled = false;
            this._searchBox = this._createComponent($searchBox, _text_box.default, {
                onDisposing: function() {
                    return isKeyboardListeningEnabled = false
                },
                onFocusIn: function() {
                    return isKeyboardListeningEnabled = true
                },
                onFocusOut: function() {
                    return isKeyboardListeningEnabled = false
                },
                onKeyboardHandled: function(opts) {
                    return isKeyboardListeningEnabled && _this5._list._keyboardHandler(opts)
                },
                mode: searchMode,
                showClearButton: true,
                valueChangeEvent: this.option("valueChangeEvent"),
                onValueChanged: this._searchHandler.bind(this)
            });
            this._registerSearchKeyHandlers();
            $searchWrapper.insertBefore(this._$list);
            this._setSearchPlaceholder()
        }
    },
    _removeSearch: function() {
        this._$searchWrapper && this._$searchWrapper.remove();
        delete this._$searchWrapper;
        this._$searchBox && this._$searchBox.remove();
        delete this._$searchBox;
        delete this._searchBox
    },
    _selectListItemHandler: function(e) {
        var $itemElement = (0, _renderer.default)(this._list.option("focusedElement"));
        if (!$itemElement.length) {
            return
        }
        e.preventDefault();
        e.target = $itemElement.get(0);
        this._saveValueChangeEvent(e);
        this._selectListItem(e.itemData, $itemElement)
    },
    _registerSearchKeyHandlers: function() {
        this._searchBox.registerKeyHandler("escape", this.close.bind(this));
        this._searchBox.registerKeyHandler("enter", this._selectListItemHandler.bind(this));
        this._searchBox.registerKeyHandler("space", this._selectListItemHandler.bind(this));
        this._searchBox.registerKeyHandler("end", _common.noop);
        this._searchBox.registerKeyHandler("home", _common.noop)
    },
    _toggleSearchClass: function(isSearchEnabled) {
        if (this._popup) {
            this._popup._wrapper().toggleClass(LOOKUP_POPUP_SEARCH_CLASS, isSearchEnabled)
        }
    },
    _setSearchPlaceholder: function() {
        if (!this._$searchBox) {
            return
        }
        var minSearchLength = this.option("minSearchLength");
        var placeholder = this.option("searchPlaceholder");
        if (minSearchLength && placeholder === _message.default.format("Search")) {
            placeholder = _message.default.getFormatter("dxLookup-searchPlaceholder")(minSearchLength)
        }
        this._searchBox.option("placeholder", placeholder)
    },
    _setAriaTargetForList: _common.noop,
    _renderList: function() {
        var _this6 = this;
        this.callBase();
        this._list.registerKeyHandler("escape", function() {
            _this6.close()
        })
    },
    _listConfig: function() {
        return (0, _extend.extend)(this.callBase(), {
            tabIndex: 0,
            grouped: this.option("grouped"),
            groupTemplate: this._getTemplateByOption("groupTemplate"),
            pullRefreshEnabled: this.option("pullRefreshEnabled"),
            useNativeScrolling: this.option("useNativeScrolling"),
            pullingDownText: this.option("pullingDownText"),
            pulledDownText: this.option("pulledDownText"),
            refreshingText: this.option("refreshingText"),
            pageLoadingText: this.option("pageLoadingText"),
            onScroll: this._scrollHandler.bind(this),
            onPullRefresh: this._pullRefreshHandler.bind(this),
            onPageLoading: this._pageLoadingHandler.bind(this),
            pageLoadMode: this.option("pageLoadMode"),
            nextButtonText: this.option("nextButtonText"),
            indicateLoading: this.option("searchEnabled"),
            onSelectionChanged: this._getSelectionChangedHandler()
        })
    },
    _getSelectionChangedHandler: function() {
        return this.option("showSelectionControls") ? this._selectionChangeHandler.bind(this) : _common.noop
    },
    _listContentReadyHandler: function() {
        this.callBase.apply(this, arguments);
        this._refreshSelected()
    },
    _setFocusPolicy: function() {
        if (!this.option("focusStateEnabled")) {
            return
        }
        if (this.option("searchEnabled")) {
            this._searchBox.focus()
        } else {
            _events_engine.default.trigger(this._$list, "focus")
        }
    },
    _focusTarget: function() {
        return this._$field
    },
    _keyboardEventBindingTarget: function() {
        return this._$field
    },
    _listItemClickHandler: function(e) {
        this._saveValueChangeEvent(e.event);
        this._selectListItem(e.itemData, e.event.currentTarget)
    },
    _selectListItem: function(itemData, target) {
        this._list.selectItem(target);
        if ("instantly" === this.option("applyValueMode")) {
            this._applyButtonHandler()
        }
    },
    _currentSelectedItem: function() {
        return this.option("grouped") ? this._list.option("selectedItems[0]").items[0] : this._list.option("selectedItems[0]")
    },
    _resetValue: function(e) {
        this._saveValueChangeEvent(e.event);
        this.option("value", null);
        this.option("opened", false)
    },
    _searchValue: function() {
        return this.option("searchEnabled") && this._searchBox ? this._searchBox.option("value") : ""
    },
    _renderInputValue: function() {
        var _this7 = this;
        return this.callBase().always(function() {
            _this7._refreshSelected()
        })
    },
    _renderPlaceholder: function() {
        if (0 === this.$element().find("." + TEXTEDITOR_INPUT_CLASS).length) {
            return
        }
        this.callBase()
    },
    _clean: function() {
        this._$fieldWrapper.remove();
        this._$searchBox = null;
        delete this._inkRipple;
        this.callBase()
    },
    _setDeprecatedOptions: function() {
        this.callBase();
        (0, _extend.extend)(this._deprecatedOptions, {
            title: {
                since: "20.1",
                alias: "dropDownOptions.title"
            },
            titleTemplate: {
                since: "20.1",
                alias: "dropDownOptions.titleTemplate"
            },
            onTitleRendered: {
                since: "20.1",
                alias: "dropDownOptions.onTitleRendered"
            },
            fullScreen: {
                since: "20.1",
                alias: "dropDownOptions.fullScreen"
            },
            popupWidth: {
                since: "20.1",
                alias: "dropDownOptions.width"
            },
            popupHeight: {
                since: "20.1",
                alias: "dropDownOptions.height"
            },
            shading: {
                since: "20.1",
                alias: "dropDownOptions.shading"
            },
            closeOnOutsideClick: {
                since: "20.1",
                alias: "dropDownOptions.closeOnOutsideClick"
            },
            position: {
                since: "20.1",
                alias: "dropDownOptions.position"
            },
            animation: {
                since: "20.1",
                alias: "dropDownOptions.animation"
            }
        })
    },
    _optionChanged: function(args) {
        var name = args.name;
        var value = args.value;
        switch (name) {
            case "dataSource":
                this.callBase.apply(this, arguments);
                this._renderField();
                break;
            case "searchEnabled":
                if (this._popup) {
                    this._removeSearch();
                    this._renderSearch()
                }
                break;
            case "searchPlaceholder":
                this._setSearchPlaceholder();
                break;
            case "minSearchLength":
                this._setSearchPlaceholder();
                this.callBase.apply(this, arguments);
                break;
            case "title":
            case "titleTemplate":
            case "onTitleRendered":
            case "shading":
            case "animation":
            case "position":
            case "closeOnOutsideClick":
            case "fullScreen":
                this._setPopupOption(name, value);
                break;
            case "usePopover":
            case "placeholder":
                this._invalidate();
                break;
            case "clearButtonText":
            case "showClearButton":
            case "showCancelButton":
                this._setPopupOption("toolbarItems", this._getPopupToolbarItems());
                break;
            case "applyValueMode":
                this.callBase.apply(this, arguments);
                break;
            case "popupWidth":
                this._setPopupOption("width", "auto" === value ? this.initialOption("dropDownOptions").width : value);
                break;
            case "popupHeight":
                this._setPopupOption("height", "auto" === value ? this.initialOption("dropDownOptions").height : value);
                break;
            case "onPageLoading":
                this._initPageLoadingAction();
                break;
            case "onPullRefresh":
                this._initPullRefreshAction();
                break;
            case "pullRefreshEnabled":
            case "useNativeScrolling":
            case "pullingDownText":
            case "pulledDownText":
            case "refreshingText":
            case "pageLoadingText":
            case "nextButtonText":
            case "grouped":
            case "groupTemplate":
                this._setListOption(name);
                break;
            case "onScroll":
                this._initScrollAction();
                break;
            case "pageLoadMode":
                this._setListOption("pageLoadMode", this.option("pageLoadMode"));
                break;
            case "cleanSearchOnOpening":
            case "_scrollToSelectedItemEnabled":
                break;
            case "dropDownCentered":
                if (this.option("_scrollToSelectedItemEnabled")) {
                    this.option("dropDownOptions.position", void 0);
                    this._renderPopup()
                }
                break;
            default:
                this.callBase.apply(this, arguments)
        }
    },
    focus: function() {
        this.option("opened") ? this._setFocusPolicy() : _events_engine.default.trigger(this._focusTarget(), "focus")
    },
    field: function() {
        return this._$field
    }
});
(0, _component_registrator.default)("dxLookup", Lookup);
var _default = Lookup;
exports.default = _default;
module.exports = exports.default;
module.exports.default = module.exports;
