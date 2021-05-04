/**
 * DevExtreme (ui/grid_core/ui.grid_core.header_filter_core.js)
 * Version: 20.2.6
 * Build date: Tue Mar 16 2021
 *
 * Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
exports.updateHeaderFilterItemSelectionState = updateHeaderFilterItemSelectionState;
exports.headerFilterMixin = exports.allowHeaderFiltering = exports.HeaderFilterView = void 0;
var _renderer = _interopRequireDefault(require("../../core/renderer"));
var _uiGrid_core = _interopRequireDefault(require("./ui.grid_core.modules"));
var _uiGrid_core2 = _interopRequireDefault(require("./ui.grid_core.utils"));
var _type = require("../../core/utils/type");
var _iterator = require("../../core/utils/iterator");
var _extend = require("../../core/utils/extend");
var _popup = _interopRequireDefault(require("../popup"));
var _tree_view = _interopRequireDefault(require("../tree_view"));
var _list = _interopRequireDefault(require("../list"));

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        "default": obj
    }
}
var HEADER_FILTER_CLASS = "dx-header-filter";
var HEADER_FILTER_MENU_CLASS = "dx-header-filter-menu";
var DEFAULT_SEARCH_EXPRESSION = "text";

function resetChildrenItemSelection(items) {
    items = items || [];
    for (var i = 0; i < items.length; i++) {
        items[i].selected = false;
        resetChildrenItemSelection(items[i].items)
    }
}

function updateSelectAllState(e, filterValues) {
    if (e.component.option("searchValue")) {
        return
    }
    var selectAllCheckBox = (0, _renderer.default)(e.element).find(".dx-list-select-all-checkbox").data("dxCheckBox");
    if (selectAllCheckBox && filterValues && filterValues.length) {
        selectAllCheckBox.option("value", void 0)
    }
}

function isSearchEnabled(that, options) {
    var headerFilter = options.headerFilter;
    if (headerFilter && (0, _type.isDefined)(headerFilter.allowSearch)) {
        return headerFilter.allowSearch
    }
    return that.option("headerFilter.allowSearch")
}

function updateHeaderFilterItemSelectionState(item, filterValuesMatch, isExcludeFilter) {
    if (filterValuesMatch ^ isExcludeFilter) {
        item.selected = true;
        if (isExcludeFilter && item.items) {
            for (var j = 0; j < item.items.length; j++) {
                if (!item.items[j].selected) {
                    item.selected = void 0;
                    break
                }
            }
        }
    } else {
        if (isExcludeFilter || item.selected) {
            item.selected = false;
            resetChildrenItemSelection(item.items)
        }
    }
}
var HeaderFilterView = _uiGrid_core.default.View.inherit({
    getPopupContainer: function() {
        return this._popupContainer
    },
    getListContainer: function() {
        return this._listContainer
    },
    applyHeaderFilter: function(options) {
        var that = this;
        var list = that.getListContainer();
        var searchValue = list.option("searchValue");
        var isSelectAll = !searchValue && !options.isFilterBuilder && list.$element().find(".dx-checkbox").eq(0).hasClass("dx-checkbox-checked");
        var filterValues = [];
        var fillSelectedItemKeys = function fillSelectedItemKeys(filterValues, items, isExclude) {
            (0, _iterator.each)(items, function(_, item) {
                if (void 0 !== item.selected && !!item.selected ^ isExclude) {
                    var node = list._getNode(item);
                    var hasChildren = list._hasChildren(node);
                    var hasChildrenWithSelection = hasChildren && item.items && item.items.some(function(item) {
                        return item.selected
                    });
                    if (!searchValue || !hasChildrenWithSelection) {
                        filterValues.push(item.value);
                        return
                    }
                }
                if (item.items && item.items.length) {
                    fillSelectedItemKeys(filterValues, item.items, isExclude)
                }
            })
        };
        if (!isSelectAll) {
            if ("tree" === options.type) {
                if (options.filterType) {
                    options.filterType = "include"
                }
                fillSelectedItemKeys(filterValues, list.option("items"), false);
                options.filterValues = filterValues
            }
        } else {
            if ("tree" === options.type) {
                options.filterType = "exclude"
            }
            if (Array.isArray(options.filterValues)) {
                options.filterValues = []
            }
        }
        if (options.filterValues && !options.filterValues.length) {
            options.filterValues = null
        }
        options.apply();
        that.hideHeaderFilterMenu()
    },
    showHeaderFilterMenu: function($columnElement, options) {
        var that = this;
        if (options) {
            that._initializePopupContainer(options);
            var popupContainer = that.getPopupContainer();
            that.hideHeaderFilterMenu();
            that.updatePopup($columnElement, options);
            popupContainer.show()
        }
    },
    hideHeaderFilterMenu: function() {
        var headerFilterMenu = this.getPopupContainer();
        headerFilterMenu && headerFilterMenu.hide()
    },
    updatePopup: function($element, options) {
        var that = this;
        var alignment = "right" === options.alignment ? "left" : "right";
        if (that._popupContainer) {
            that._cleanPopupContent();
            that._popupContainer.option("position", {
                my: alignment + " top",
                at: alignment + " bottom",
                of: $element,
                collision: "flip fit"
            })
        }
    },
    _getSearchExpr: function(options) {
        var lookup = options.lookup;
        var useDefaultSearchExpr = options.useDefaultSearchExpr;
        var headerFilterDataSource = options.headerFilter && options.headerFilter.dataSource;
        if (useDefaultSearchExpr || (0, _type.isDefined)(headerFilterDataSource) && !(0, _type.isFunction)(headerFilterDataSource)) {
            return DEFAULT_SEARCH_EXPRESSION
        }
        if (lookup) {
            return lookup.displayExpr || "this"
        }
        if (options.dataSource) {
            var group = options.dataSource.group;
            if (Array.isArray(group) && group.length > 0) {
                return group[0].selector
            } else {
                if ((0, _type.isFunction)(group) && !options.remoteFiltering) {
                    return group
                }
            }
        }
        return options.dataField || options.selector
    },
    _cleanPopupContent: function() {
        this._popupContainer && this._popupContainer.$content().empty()
    },
    _initializePopupContainer: function(options) {
        var that = this;
        var $element = that.element();
        var headerFilterOptions = that.option("headerFilter");
        var width = options.headerFilter && options.headerFilter.width || headerFilterOptions && headerFilterOptions.width;
        var height = options.headerFilter && options.headerFilter.height || headerFilterOptions && headerFilterOptions.height;
        var dxPopupOptions = {
            width: width,
            height: height,
            visible: false,
            shading: false,
            showTitle: false,
            showCloseButton: false,
            closeOnTargetScroll: false,
            dragEnabled: false,
            closeOnOutsideClick: true,
            focusStateEnabled: false,
            toolbarItems: [{
                toolbar: "bottom",
                location: "after",
                widget: "dxButton",
                options: {
                    text: headerFilterOptions.texts.ok,
                    onClick: function() {
                        that.applyHeaderFilter(options)
                    }
                }
            }, {
                toolbar: "bottom",
                location: "after",
                widget: "dxButton",
                options: {
                    text: headerFilterOptions.texts.cancel,
                    onClick: function() {
                        that.hideHeaderFilterMenu()
                    }
                }
            }],
            resizeEnabled: true,
            onShowing: function(e) {
                e.component.$content().parent().addClass("dx-dropdowneditor-overlay");
                that._initializeListContainer(options);
                options.onShowing && options.onShowing(e)
            },
            onShown: function() {
                that.getListContainer().focus()
            },
            onHidden: options.onHidden,
            onInitialized: function(e) {
                var component = e.component;
                component.option("animation", component._getDefaultOptions().animation)
            }
        };
        if (!(0, _type.isDefined)(that._popupContainer)) {
            that._popupContainer = that._createComponent($element, _popup.default, dxPopupOptions)
        } else {
            that._popupContainer.option(dxPopupOptions)
        }
    },
    _initializeListContainer: function(options) {
        var that = this;
        var $content = that._popupContainer.$content();
        var widgetOptions = {
            searchEnabled: isSearchEnabled(that, options),
            searchTimeout: that.option("headerFilter.searchTimeout"),
            searchMode: options.headerFilter && options.headerFilter.searchMode || "",
            dataSource: options.dataSource,
            onContentReady: function() {
                that.renderCompleted.fire()
            },
            itemTemplate: function(data, _, element) {
                var $element = (0, _renderer.default)(element);
                if (options.encodeHtml) {
                    return $element.text(data.text)
                }
                return $element.html(data.text)
            }
        };

        function onOptionChanged(e) {
            if ("searchValue" === e.fullName && !options.isFilterBuilder && false !== that.option("headerFilter.hideSelectAllOnSearch")) {
                if ("tree" === options.type) {
                    e.component.option("showCheckBoxesMode", e.value ? "normal" : "selectAll")
                } else {
                    e.component.option("selectionMode", e.value ? "multiple" : "all")
                }
            }
        }
        if ("tree" === options.type) {
            that._listContainer = that._createComponent((0, _renderer.default)("<div>").appendTo($content), _tree_view.default, (0, _extend.extend)(widgetOptions, {
                showCheckBoxesMode: options.isFilterBuilder ? "normal" : "selectAll",
                onOptionChanged: onOptionChanged,
                keyExpr: "id"
            }))
        } else {
            that._listContainer = that._createComponent((0, _renderer.default)("<div>").appendTo($content), _list.default, (0, _extend.extend)(widgetOptions, {
                searchExpr: that._getSearchExpr(options),
                pageLoadMode: "scrollBottom",
                showSelectionControls: true,
                selectionMode: options.isFilterBuilder ? "multiple" : "all",
                onOptionChanged: onOptionChanged,
                onSelectionChanged: function(e) {
                    var items = e.component.option("items");
                    var selectedItems = e.component.option("selectedItems");
                    if (!e.component._selectedItemsUpdating && !e.component.option("searchValue") && !options.isFilterBuilder) {
                        var filterValues = options.filterValues || [];
                        var isExclude = "exclude" === options.filterType;
                        if (0 === selectedItems.length && items.length && (filterValues.length <= 1 || isExclude && filterValues.length === items.length - 1)) {
                            options.filterType = "include";
                            options.filterValues = []
                        } else {
                            if (selectedItems.length === items.length) {
                                options.filterType = "exclude";
                                options.filterValues = []
                            }
                        }
                    }(0, _iterator.each)(items, function(index, item) {
                        var selected = _uiGrid_core2.default.getIndexByKey(item, selectedItems, null) >= 0;
                        var oldSelected = !!item.selected;
                        if (oldSelected !== selected) {
                            item.selected = selected;
                            options.filterValues = options.filterValues || [];
                            var filterValueIndex = _uiGrid_core2.default.getIndexByKey(item.value, options.filterValues, null);
                            if (filterValueIndex >= 0) {
                                options.filterValues.splice(filterValueIndex, 1)
                            }
                            if (selected ^ "exclude" === options.filterType) {
                                options.filterValues.push(item.value)
                            }
                        }
                    });
                    updateSelectAllState(e, options.filterValues)
                },
                onContentReady: function(e) {
                    var component = e.component;
                    var items = component.option("items");
                    var selectedItems = [];
                    (0, _iterator.each)(items, function() {
                        if (this.selected) {
                            selectedItems.push(this)
                        }
                    });
                    component._selectedItemsUpdating = true;
                    component.option("selectedItems", selectedItems);
                    component._selectedItemsUpdating = false;
                    updateSelectAllState(e, options.filterValues)
                }
            }))
        }
    },
    _renderCore: function() {
        this.element().addClass(HEADER_FILTER_MENU_CLASS)
    }
});
exports.HeaderFilterView = HeaderFilterView;
var allowHeaderFiltering = function(column) {
    return (0, _type.isDefined)(column.allowHeaderFiltering) ? column.allowHeaderFiltering : column.allowFiltering
};
exports.allowHeaderFiltering = allowHeaderFiltering;
var headerFilterMixin = {
    _applyColumnState: function(options) {
        var $headerFilterIndicator;
        var rootElement = options.rootElement;
        var column = options.column;
        if ("headerFilter" === options.name) {
            rootElement.find("." + HEADER_FILTER_CLASS).remove();
            if (allowHeaderFiltering(column)) {
                $headerFilterIndicator = this.callBase(options).toggleClass("dx-header-filter-empty", this._isHeaderFilterEmpty(column));
                if (!this.option("useLegacyKeyboardNavigation")) {
                    $headerFilterIndicator.attr("tabindex", this.option("tabindex") || 0)
                }
            }
            return $headerFilterIndicator
        }
        return this.callBase(options)
    },
    _isHeaderFilterEmpty: function(column) {
        return !column.filterValues || !column.filterValues.length
    },
    _getIndicatorClassName: function(name) {
        if ("headerFilter" === name) {
            return HEADER_FILTER_CLASS
        }
        return this.callBase(name)
    },
    _renderIndicator: function(options) {
        var $container = options.container;
        var $indicator = options.indicator;
        if ("headerFilter" === options.name) {
            var rtlEnabled = this.option("rtlEnabled");
            if ($container.children().length && (!rtlEnabled && "right" === options.columnAlignment || rtlEnabled && "left" === options.columnAlignment)) {
                $container.prepend($indicator);
                return
            }
        }
        this.callBase(options)
    },
    optionChanged: function(args) {
        if ("headerFilter" === args.name) {
            var requireReady = "columnHeadersView" === this.name;
            this._invalidate(requireReady, requireReady);
            args.handled = true
        } else {
            this.callBase(args)
        }
    }
};
exports.headerFilterMixin = headerFilterMixin;
