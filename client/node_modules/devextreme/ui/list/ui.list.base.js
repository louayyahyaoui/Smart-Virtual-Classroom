/**
 * DevExtreme (ui/list/ui.list.base.js)
 * Version: 20.2.6
 * Build date: Tue Mar 16 2021
 *
 * Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
exports.setScrollView = setScrollView;
exports.ListBase = void 0;
var _renderer = _interopRequireDefault(require("../../core/renderer"));
var _events_engine = _interopRequireDefault(require("../../events/core/events_engine"));
var _common = require("../../core/utils/common");
var _type = require("../../core/utils/type");
var _icon = require("../../core/utils/icon");
var _element = require("../../core/element");
var _iterator = require("../../core/utils/iterator");
var _data = require("../../core/utils/data");
var _extend = require("../../core/utils/extend");
var _fx = _interopRequireDefault(require("../../animation/fx"));
var _click = require("../../events/click");
var _swipe = require("../../events/swipe");
var _support = require("../../core/utils/support");
var _message = _interopRequireDefault(require("../../localization/message"));
var _utils = require("../widget/utils.ink_ripple");
var _devices = _interopRequireDefault(require("../../core/devices"));
var _item = _interopRequireDefault(require("./item"));
var _button = _interopRequireDefault(require("../button"));
var _index = require("../../events/utils/index");
var _themes = require("../themes");
var _window = require("../../core/utils/window");
var _scroll_view = _interopRequireDefault(require("../scroll_view"));
var _uiScrollable = require("../scroll_view/ui.scrollable.device");
var _uiCollection_widget = _interopRequireDefault(require("../collection/ui.collection_widget.live_update"));
var _bindable_template = require("../../core/templates/bindable_template");
var _deferred = require("../../core/utils/deferred");
var _grouped_data_converter_mixin = _interopRequireDefault(require("../shared/grouped_data_converter_mixin"));

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        "default": obj
    }
}
var LIST_CLASS = "dx-list";
var LIST_ITEM_CLASS = "dx-list-item";
var LIST_ITEM_SELECTOR = "." + LIST_ITEM_CLASS;
var LIST_ITEM_ICON_CONTAINER_CLASS = "dx-list-item-icon-container";
var LIST_ITEM_ICON_CLASS = "dx-list-item-icon";
var LIST_GROUP_CLASS = "dx-list-group";
var LIST_GROUP_HEADER_CLASS = "dx-list-group-header";
var LIST_GROUP_BODY_CLASS = "dx-list-group-body";
var LIST_COLLAPSIBLE_GROUPS_CLASS = "dx-list-collapsible-groups";
var LIST_GROUP_COLLAPSED_CLASS = "dx-list-group-collapsed";
var LIST_GROUP_HEADER_INDICATOR_CLASS = "dx-list-group-header-indicator";
var LIST_HAS_NEXT_CLASS = "dx-has-next";
var LIST_NEXT_BUTTON_CLASS = "dx-list-next-button";
var WRAP_ITEM_TEXT_CLASS = "dx-wrap-item-text";
var SELECT_ALL_ITEM_SELECTOR = ".dx-list-select-all";
var LIST_ITEM_DATA_KEY = "dxListItemData";
var LIST_FEEDBACK_SHOW_TIMEOUT = 70;
var groupItemsGetter = (0, _data.compileGetter)("items");
var _scrollView;
var ListBase = _uiCollection_widget.default.inherit({
    _activeStateUnit: [LIST_ITEM_SELECTOR, SELECT_ALL_ITEM_SELECTOR].join(","),
    _supportedKeys: function() {
        var that = this;
        var moveFocusPerPage = function(direction) {
            var $item = getEdgeVisibleItem(direction);
            var isFocusedItem = $item.is(that.option("focusedElement"));
            if (isFocusedItem) {
                scrollListTo($item, direction);
                $item = getEdgeVisibleItem(direction)
            }
            that.option("focusedElement", (0, _element.getPublicElement)($item));
            that.scrollToItem($item)
        };

        function getEdgeVisibleItem(direction) {
            var scrollTop = that.scrollTop();
            var containerHeight = that.$element().height();
            var $item = (0, _renderer.default)(that.option("focusedElement"));
            var isItemVisible = true;
            if (!$item.length) {
                return (0, _renderer.default)()
            }
            while (isItemVisible) {
                var $nextItem = $item[direction]();
                if (!$nextItem.length) {
                    break
                }
                var nextItemLocation = $nextItem.position().top + $nextItem.outerHeight() / 2;
                isItemVisible = nextItemLocation < containerHeight + scrollTop && nextItemLocation > scrollTop;
                if (isItemVisible) {
                    $item = $nextItem
                }
            }
            return $item
        }

        function scrollListTo($item, direction) {
            var resultPosition = $item.position().top;
            if ("prev" === direction) {
                resultPosition = $item.position().top - that.$element().height() + $item.outerHeight()
            }
            that.scrollTo(resultPosition)
        }
        return (0, _extend.extend)(this.callBase(), {
            leftArrow: _common.noop,
            rightArrow: _common.noop,
            pageUp: function() {
                moveFocusPerPage("prev");
                return false
            },
            pageDown: function() {
                moveFocusPerPage("next");
                return false
            }
        })
    },
    _getDefaultOptions: function() {
        return (0, _extend.extend)(this.callBase(), {
            hoverStateEnabled: true,
            pullRefreshEnabled: false,
            scrollingEnabled: true,
            showScrollbar: "onScroll",
            useNativeScrolling: true,
            bounceEnabled: true,
            scrollByContent: true,
            scrollByThumb: false,
            pullingDownText: _message.default.format("dxList-pullingDownText"),
            pulledDownText: _message.default.format("dxList-pulledDownText"),
            refreshingText: _message.default.format("dxList-refreshingText"),
            pageLoadingText: _message.default.format("dxList-pageLoadingText"),
            onScroll: null,
            onPullRefresh: null,
            onPageLoading: null,
            pageLoadMode: "scrollBottom",
            nextButtonText: _message.default.format("dxList-nextButtonText"),
            onItemSwipe: null,
            grouped: false,
            onGroupRendered: null,
            collapsibleGroups: false,
            groupTemplate: "group",
            indicateLoading: true,
            activeStateEnabled: true,
            _itemAttributes: {
                role: "option"
            },
            _listAttributes: {
                role: "listbox"
            },
            useInkRipple: false,
            wrapItemText: false,
            _swipeEnabled: true,
            _revertPageOnEmptyLoad: false,
            showChevronExpr: function(data) {
                return data ? data.showChevron : void 0
            },
            badgeExpr: function(data) {
                return data ? data.badge : void 0
            }
        })
    },
    _defaultOptionsRules: function() {
        var themeName = (0, _themes.current)();
        return this.callBase().concat((0, _uiScrollable.deviceDependentOptions)(), [{
            device: function() {
                return !_support.nativeScrolling
            },
            options: {
                useNativeScrolling: false
            }
        }, {
            device: function(_device) {
                return !_support.nativeScrolling && !_devices.default.isSimulator() && "desktop" === _devices.default.real().deviceType && "generic" === _device.platform
            },
            options: {
                showScrollbar: "onHover",
                pageLoadMode: "nextButton"
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
                pullingDownText: "",
                pulledDownText: "",
                refreshingText: "",
                pageLoadingText: "",
                useInkRipple: true
            }
        }])
    },
    _visibilityChanged: function(visible) {
        if (visible) {
            this._updateLoadingState(true)
        }
    },
    _itemClass: function() {
        return LIST_ITEM_CLASS
    },
    _itemDataKey: function() {
        return LIST_ITEM_DATA_KEY
    },
    _itemContainer: function() {
        return this._$container
    },
    _saveSelectionChangeEvent: function(e) {
        this._selectionChangeEventInstance = e
    },
    _getSelectionChangeEvent: function() {
        return this._selectionChangeEventInstance
    },
    _refreshItemElements: function() {
        if (!this.option("grouped")) {
            this._itemElementsCache = this._itemContainer().children(this._itemSelector())
        } else {
            this._itemElementsCache = this._itemContainer().children("." + LIST_GROUP_CLASS).children("." + LIST_GROUP_BODY_CLASS).children(this._itemSelector())
        }
    },
    _modifyByChanges: function() {
        this.callBase.apply(this, arguments);
        this._refreshItemElements();
        this._updateLoadingState(true)
    },
    reorderItem: function(itemElement, toItemElement) {
        var promise = this.callBase(itemElement, toItemElement);
        return promise.done(function() {
            this._refreshItemElements()
        })
    },
    deleteItem: function(itemElement) {
        var promise = this.callBase(itemElement);
        return promise.done(function() {
            this._refreshItemElements()
        })
    },
    _itemElements: function() {
        return this._itemElementsCache
    },
    _itemSelectHandler: function(e) {
        if ("single" === this.option("selectionMode") && this.isItemSelected(e.currentTarget)) {
            return
        }
        this.callBase(e)
    },
    _allowDynamicItemsAppend: function() {
        return true
    },
    _resetDataSourcePageIndex: function() {
        var currentDataSource = this.getDataSource();
        if (currentDataSource && 0 !== currentDataSource.pageIndex()) {
            currentDataSource.pageIndex(0);
            currentDataSource.load()
        }
    },
    _init: function() {
        this.callBase();
        this._resetDataSourcePageIndex();
        this._$container = this.$element();
        this._initScrollView();
        this._feedbackShowTimeout = LIST_FEEDBACK_SHOW_TIMEOUT;
        this._createGroupRenderAction()
    },
    _scrollBottomMode: function() {
        return "scrollBottom" === this.option("pageLoadMode")
    },
    _nextButtonMode: function() {
        return "nextButton" === this.option("pageLoadMode")
    },
    _dataSourceOptions: function() {
        var scrollBottom = this._scrollBottomMode();
        var nextButton = this._nextButtonMode();
        return (0, _extend.extend)(this.callBase(), {
            paginate: (0, _common.ensureDefined)(scrollBottom || nextButton, true)
        })
    },
    _getGroupedOption: function() {
        return this.option("grouped")
    },
    _dataSourceFromUrlLoadMode: function() {
        return "raw"
    },
    _initScrollView: function() {
        var scrollingEnabled = this.option("scrollingEnabled");
        var pullRefreshEnabled = scrollingEnabled && this.option("pullRefreshEnabled");
        var autoPagingEnabled = scrollingEnabled && this._scrollBottomMode() && !!this._dataSource;
        this._scrollView = this._createComponent(this.$element(), getScrollView(), {
            disabled: this.option("disabled") || !scrollingEnabled,
            onScroll: this._scrollHandler.bind(this),
            onPullDown: pullRefreshEnabled ? this._pullDownHandler.bind(this) : null,
            onReachBottom: autoPagingEnabled ? this._scrollBottomHandler.bind(this) : null,
            showScrollbar: this.option("showScrollbar"),
            useNative: this.option("useNativeScrolling"),
            bounceEnabled: this.option("bounceEnabled"),
            scrollByContent: this.option("scrollByContent"),
            scrollByThumb: this.option("scrollByThumb"),
            pullingDownText: this.option("pullingDownText"),
            pulledDownText: this.option("pulledDownText"),
            refreshingText: this.option("refreshingText"),
            reachBottomText: this.option("pageLoadingText"),
            useKeyboard: false
        });
        this._$container = (0, _renderer.default)(this._scrollView.content());
        if (this.option("wrapItemText")) {
            this._$container.addClass(WRAP_ITEM_TEXT_CLASS)
        }
        this._createScrollViewActions()
    },
    _createScrollViewActions: function() {
        this._scrollAction = this._createActionByOption("onScroll");
        this._pullRefreshAction = this._createActionByOption("onPullRefresh");
        this._pageLoadingAction = this._createActionByOption("onPageLoading")
    },
    _scrollHandler: function(e) {
        this._scrollAction && this._scrollAction(e)
    },
    _initTemplates: function() {
        this._templateManager.addDefaultTemplates({
            group: new _bindable_template.BindableTemplate(function($container, data) {
                if ((0, _type.isPlainObject)(data)) {
                    if (data.key) {
                        $container.text(data.key)
                    }
                } else {
                    $container.text(String(data))
                }
            }, ["key"], this.option("integrationOptions.watchMethod"))
        });
        this.callBase()
    },
    _prepareDefaultItemTemplate: function(data, $container) {
        this.callBase(data, $container);
        if (data.icon) {
            var $icon = (0, _icon.getImageContainer)(data.icon).addClass(LIST_ITEM_ICON_CLASS);
            var $iconContainer = (0, _renderer.default)("<div>").addClass(LIST_ITEM_ICON_CONTAINER_CLASS);
            $iconContainer.append($icon);
            $container.prepend($iconContainer)
        }
    },
    _getBindableFields: function() {
        return ["text", "html", "icon"]
    },
    _updateLoadingState: function(tryLoadMore) {
        var isDataLoaded = !tryLoadMore || this._isLastPage();
        var scrollBottomMode = this._scrollBottomMode();
        var stopLoading = isDataLoaded || !scrollBottomMode;
        var hideLoadIndicator = stopLoading && !this._isDataSourceLoading();
        if (stopLoading || this._scrollViewIsFull()) {
            this._scrollView.release(hideLoadIndicator);
            this._toggleNextButton(this._shouldRenderNextButton() && !this._isLastPage());
            this._loadIndicationSuppressed(false)
        } else {
            this._infiniteDataLoading()
        }
    },
    _shouldRenderNextButton: function() {
        return this._nextButtonMode() && this._dataSource && this._dataSource.isLoaded()
    },
    _dataSourceLoadingChangedHandler: function(isLoading) {
        if (this._loadIndicationSuppressed()) {
            return
        }
        if (isLoading && this.option("indicateLoading")) {
            this._showLoadingIndicatorTimer = setTimeout(function() {
                var isEmpty = !this._itemElements().length;
                if (this._scrollView && !isEmpty) {
                    this._scrollView.startLoading()
                }
            }.bind(this))
        } else {
            clearTimeout(this._showLoadingIndicatorTimer);
            this._scrollView && this._scrollView.finishLoading()
        }
    },
    _dataSourceChangedHandler: function(newItems) {
        if (!this._shouldAppendItems() && (0, _window.hasWindow)()) {
            this._scrollView && this._scrollView.scrollTo(0)
        }
        this.callBase.apply(this, arguments)
    },
    _refreshContent: function() {
        this._prepareContent();
        this._fireContentReadyAction()
    },
    _hideLoadingIfLoadIndicationOff: function() {
        if (!this.option("indicateLoading")) {
            this._dataSourceLoadingChangedHandler(false)
        }
    },
    _loadIndicationSuppressed: function(value) {
        if (!arguments.length) {
            return this._isLoadIndicationSuppressed
        }
        this._isLoadIndicationSuppressed = value
    },
    _scrollViewIsFull: function() {
        return !this._scrollView || this._scrollView.isFull()
    },
    _pullDownHandler: function(e) {
        this._pullRefreshAction(e);
        if (this._dataSource && !this._isDataSourceLoading()) {
            this._clearSelectedItems();
            this._dataSource.pageIndex(0);
            this._dataSource.reload()
        } else {
            this._updateLoadingState()
        }
    },
    _infiniteDataLoading: function() {
        var _this = this;
        var isElementVisible = this.$element().is(":visible");
        if (isElementVisible && !this._scrollViewIsFull() && !this._isDataSourceLoading() && !this._isLastPage()) {
            clearTimeout(this._loadNextPageTimer);
            this._loadNextPageTimer = setTimeout(function() {
                _this._loadNextPage().done(_this._setPreviousPageIfNewIsEmpty.bind(_this))
            })
        }
    },
    _setPreviousPageIfNewIsEmpty: function(result) {
        if (this.option("_revertPageOnEmptyLoad")) {
            var dataSource = this.getDataSource();
            var pageIndex = null === dataSource || void 0 === dataSource ? void 0 : dataSource.pageIndex();
            if (0 === (null === result || void 0 === result ? void 0 : result.length) && pageIndex > 0) {
                this._fireContentReadyAction();
                dataSource.pageIndex(pageIndex - 1)
            }
        }
    },
    _scrollBottomHandler: function(e) {
        this._pageLoadingAction(e);
        if (!this._isDataSourceLoading() && !this._isLastPage()) {
            this._loadNextPage()
        } else {
            this._updateLoadingState()
        }
    },
    _renderItems: function(items) {
        if (this.option("grouped")) {
            (0, _iterator.each)(items, this._renderGroup.bind(this));
            this._attachGroupCollapseEvent();
            this._renderEmptyMessage();
            if ((0, _themes.isMaterial)()) {
                this.attachGroupHeaderInkRippleEvents()
            }
        } else {
            this.callBase.apply(this, arguments)
        }
        this._refreshItemElements();
        this._updateLoadingState(true)
    },
    _attachGroupCollapseEvent: function() {
        var eventName = (0, _index.addNamespace)(_click.name, this.NAME);
        var selector = "." + LIST_GROUP_HEADER_CLASS;
        var $element = this.$element();
        var collapsibleGroups = this.option("collapsibleGroups");
        $element.toggleClass(LIST_COLLAPSIBLE_GROUPS_CLASS, collapsibleGroups);
        _events_engine.default.off($element, eventName, selector);
        if (collapsibleGroups) {
            _events_engine.default.on($element, eventName, selector, function(e) {
                this._createAction(function(e) {
                    var $group = (0, _renderer.default)(e.event.currentTarget).parent();
                    this._collapseGroupHandler($group);
                    if (this.option("focusStateEnabled")) {
                        this.option("focusedElement", (0, _element.getPublicElement)($group.find("." + LIST_ITEM_CLASS).eq(0)))
                    }
                }.bind(this), {
                    validatingTargetName: "element"
                })({
                    event: e
                })
            }.bind(this))
        }
    },
    _collapseGroupHandler: function($group, toggle) {
        var deferred = new _deferred.Deferred;
        if ($group.hasClass(LIST_GROUP_COLLAPSED_CLASS) === toggle) {
            return deferred.resolve()
        }
        var $groupBody = $group.children("." + LIST_GROUP_BODY_CLASS);
        var startHeight = $groupBody.outerHeight();
        var endHeight = 0 === startHeight ? $groupBody.height("auto").outerHeight() : 0;
        $group.toggleClass(LIST_GROUP_COLLAPSED_CLASS, toggle);
        _fx.default.animate($groupBody, {
            type: "custom",
            from: {
                height: startHeight
            },
            to: {
                height: endHeight
            },
            duration: 200,
            complete: function() {
                this.updateDimensions();
                this._updateLoadingState();
                deferred.resolve()
            }.bind(this)
        });
        return deferred.promise()
    },
    _dataSourceLoadErrorHandler: function() {
        this._forgetNextPageLoading();
        if (this._initialized) {
            this._renderEmptyMessage();
            this._updateLoadingState()
        }
    },
    _initMarkup: function() {
        this._itemElementsCache = (0, _renderer.default)();
        this.$element().addClass(LIST_CLASS);
        this.callBase();
        this.option("useInkRipple") && this._renderInkRipple();
        this.setAria("role", this.option("_listAttributes").role)
    },
    _renderInkRipple: function() {
        this._inkRipple = (0, _utils.render)()
    },
    _toggleActiveState: function($element, value, e) {
        this.callBase.apply(this, arguments);
        var that = this;
        if (!this._inkRipple) {
            return
        }
        var config = {
            element: $element,
            event: e
        };
        if (value) {
            if ((0, _themes.isMaterial)()) {
                this._inkRippleTimer = setTimeout(function() {
                    that._inkRipple.showWave(config)
                }, LIST_FEEDBACK_SHOW_TIMEOUT / 2)
            } else {
                that._inkRipple.showWave(config)
            }
        } else {
            clearTimeout(this._inkRippleTimer);
            this._inkRipple.hideWave(config)
        }
    },
    _postprocessRenderItem: function(args) {
        this._refreshItemElements();
        this.callBase.apply(this, arguments);
        if (this.option("_swipeEnabled")) {
            this._attachSwipeEvent((0, _renderer.default)(args.itemElement))
        }
    },
    _attachSwipeEvent: function($itemElement) {
        var endEventName = (0, _index.addNamespace)(_swipe.end, this.NAME);
        _events_engine.default.on($itemElement, endEventName, this._itemSwipeEndHandler.bind(this))
    },
    _itemSwipeEndHandler: function(e) {
        this._itemDXEventHandler(e, "onItemSwipe", {
            direction: e.offset < 0 ? "left" : "right"
        })
    },
    _nextButtonHandler: function(e) {
        this._pageLoadingAction(e);
        var source = this._dataSource;
        if (source && !source.isLoading()) {
            this._scrollView.toggleLoading(true);
            this._$nextButton.detach();
            this._loadIndicationSuppressed(true);
            this._loadNextPage()
        }
    },
    _renderGroup: function(index, group) {
        var $groupElement = (0, _renderer.default)("<div>").addClass(LIST_GROUP_CLASS).appendTo(this._itemContainer());
        var $groupHeaderElement = (0, _renderer.default)("<div>").addClass(LIST_GROUP_HEADER_CLASS).appendTo($groupElement);
        var groupTemplateName = this.option("groupTemplate");
        var groupTemplate = this._getTemplate(group.template || groupTemplateName, group, index, $groupHeaderElement);
        var renderArgs = {
            index: index,
            itemData: group,
            container: (0, _element.getPublicElement)($groupHeaderElement)
        };
        this._createItemByTemplate(groupTemplate, renderArgs);
        if ((0, _themes.isMaterial)()) {
            (0, _renderer.default)("<div>").addClass(LIST_GROUP_HEADER_INDICATOR_CLASS).prependTo($groupHeaderElement)
        }
        this._renderingGroupIndex = index;
        var $groupBody = (0, _renderer.default)("<div>").addClass(LIST_GROUP_BODY_CLASS).appendTo($groupElement);
        (0, _iterator.each)(groupItemsGetter(group) || [], function(index, item) {
            this._renderItem(index, item, $groupBody)
        }.bind(this));
        this._groupRenderAction({
            groupElement: (0, _element.getPublicElement)($groupElement),
            groupIndex: index,
            groupData: group
        })
    },
    downInkRippleHandler: function(e) {
        this._toggleActiveState((0, _renderer.default)(e.currentTarget), true, e)
    },
    upInkRippleHandler: function(e) {
        this._toggleActiveState((0, _renderer.default)(e.currentTarget), false)
    },
    attachGroupHeaderInkRippleEvents: function() {
        var selector = "." + LIST_GROUP_HEADER_CLASS;
        var $element = this.$element();
        this._downInkRippleHandler = this._downInkRippleHandler || this.downInkRippleHandler.bind(this);
        this._upInkRippleHandler = this._upInkRippleHandler || this.upInkRippleHandler.bind(this);
        var downArguments = [$element, "dxpointerdown", selector, this._downInkRippleHandler];
        var upArguments = [$element, "dxpointerup dxpointerout", selector, this._upInkRippleHandler];
        _events_engine.default.off.apply(_events_engine.default, downArguments);
        _events_engine.default.on.apply(_events_engine.default, downArguments);
        _events_engine.default.off.apply(_events_engine.default, upArguments);
        _events_engine.default.on.apply(_events_engine.default, upArguments)
    },
    _createGroupRenderAction: function() {
        this._groupRenderAction = this._createActionByOption("onGroupRendered")
    },
    _clean: function() {
        clearTimeout(this._inkRippleTimer);
        if (this._$nextButton) {
            this._$nextButton.remove();
            this._$nextButton = null
        }
        delete this._inkRipple;
        this.callBase.apply(this, arguments)
    },
    _dispose: function() {
        clearTimeout(this._holdTimer);
        clearTimeout(this._loadNextPageTimer);
        clearTimeout(this._showLoadingIndicatorTimer);
        this.callBase()
    },
    _toggleDisabledState: function(value) {
        this.callBase(value);
        this._scrollView.option("disabled", value || !this.option("scrollingEnabled"))
    },
    _toggleNextButton: function(value) {
        var dataSource = this._dataSource;
        var $nextButton = this._getNextButton();
        this.$element().toggleClass(LIST_HAS_NEXT_CLASS, value);
        if (value && dataSource && dataSource.isLoaded()) {
            $nextButton.appendTo(this._itemContainer())
        }
        if (!value) {
            $nextButton.detach()
        }
    },
    _getNextButton: function() {
        if (!this._$nextButton) {
            this._$nextButton = this._createNextButton()
        }
        return this._$nextButton
    },
    _createNextButton: function() {
        var $result = (0, _renderer.default)("<div>").addClass(LIST_NEXT_BUTTON_CLASS);
        var $button = (0, _renderer.default)("<div>").appendTo($result);
        this._createComponent($button, _button.default, {
            text: this.option("nextButtonText"),
            onClick: this._nextButtonHandler.bind(this),
            type: (0, _themes.isMaterial)() ? "default" : void 0,
            integrationOptions: {}
        });
        return $result
    },
    _moveFocus: function() {
        this.callBase.apply(this, arguments);
        this.scrollToItem(this.option("focusedElement"))
    },
    _refresh: function() {
        if (!(0, _window.hasWindow)()) {
            this.callBase()
        } else {
            var scrollTop = this._scrollView.scrollTop();
            this.callBase();
            scrollTop && this._scrollView.scrollTo(scrollTop)
        }
    },
    _optionChanged: function(args) {
        switch (args.name) {
            case "pageLoadMode":
                this._toggleNextButton(args.value);
                this._initScrollView();
                break;
            case "dataSource":
                this.callBase(args);
                this._initScrollView();
                break;
            case "pullingDownText":
            case "pulledDownText":
            case "refreshingText":
            case "pageLoadingText":
            case "showScrollbar":
            case "bounceEnabled":
            case "scrollByContent":
            case "scrollByThumb":
            case "useNativeScrolling":
            case "scrollingEnabled":
            case "pullRefreshEnabled":
                this._initScrollView();
                this._updateLoadingState();
                break;
            case "nextButtonText":
            case "onItemSwipe":
            case "useInkRipple":
                this._invalidate();
                break;
            case "onScroll":
            case "onPullRefresh":
            case "onPageLoading":
                this._createScrollViewActions();
                break;
            case "grouped":
            case "collapsibleGroups":
            case "groupTemplate":
                this._invalidate();
                break;
            case "wrapItemText":
                this._$container.toggleClass(WRAP_ITEM_TEXT_CLASS, args.value);
                break;
            case "onGroupRendered":
                this._createGroupRenderAction();
                break;
            case "width":
            case "height":
                this.callBase(args);
                this._scrollView.update();
                break;
            case "indicateLoading":
                this._hideLoadingIfLoadIndicationOff();
                break;
            case "visible":
                this.callBase(args);
                this._scrollView.update();
                break;
            case "rtlEnabled":
                this._initScrollView();
                this.callBase(args);
                break;
            case "showChevronExpr":
            case "badgeExpr":
                this._invalidate();
                break;
            case "_swipeEnabled":
            case "_revertPageOnEmptyLoad":
                break;
            case "_listAttributes":
                break;
            default:
                this.callBase(args)
        }
    },
    _extendActionArgs: function($itemElement) {
        if (!this.option("grouped")) {
            return this.callBase($itemElement)
        }
        var $group = $itemElement.closest("." + LIST_GROUP_CLASS);
        var $item = $group.find("." + LIST_ITEM_CLASS);
        return (0, _extend.extend)(this.callBase($itemElement), {
            itemIndex: {
                group: $group.index(),
                item: $item.index($itemElement)
            }
        })
    },
    expandGroup: function(groupIndex) {
        var deferred = new _deferred.Deferred;
        var $group = this._itemContainer().find("." + LIST_GROUP_CLASS).eq(groupIndex);
        this._collapseGroupHandler($group, false).done(function() {
            deferred.resolveWith(this)
        }.bind(this));
        return deferred.promise()
    },
    collapseGroup: function(groupIndex) {
        var deferred = new _deferred.Deferred;
        var $group = this._itemContainer().find("." + LIST_GROUP_CLASS).eq(groupIndex);
        this._collapseGroupHandler($group, true).done(function() {
            deferred.resolveWith(this)
        }.bind(this));
        return deferred
    },
    updateDimensions: function() {
        var that = this;
        var deferred = new _deferred.Deferred;
        if (that._scrollView) {
            that._scrollView.update().done(function() {
                !that._scrollViewIsFull() && that._updateLoadingState(true);
                deferred.resolveWith(that)
            })
        } else {
            deferred.resolveWith(that)
        }
        return deferred.promise()
    },
    reload: function() {
        this.callBase();
        this.scrollTo(0);
        this._pullDownHandler()
    },
    repaint: function() {
        this.scrollTo(0);
        this.callBase()
    },
    scrollTop: function() {
        return this._scrollView.scrollOffset().top
    },
    clientHeight: function() {
        return this._scrollView.clientHeight()
    },
    scrollHeight: function() {
        return this._scrollView.scrollHeight()
    },
    scrollBy: function(distance) {
        this._scrollView.scrollBy(distance)
    },
    scrollTo: function(location) {
        this._scrollView.scrollTo(location)
    },
    scrollToItem: function(itemElement) {
        var $item = this._editStrategy.getItemElement(itemElement);
        this._scrollView.scrollToElement($item)
    }
}).include(_grouped_data_converter_mixin.default);
exports.ListBase = ListBase;
ListBase.ItemClass = _item.default;

function getScrollView() {
    return _scrollView || _scroll_view.default
}

function setScrollView(value) {
    _scrollView = value
}
