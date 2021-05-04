/**
 * DevExtreme (ui/grid_core/ui.grid_core.search.js)
 * Version: 20.2.6
 * Build date: Tue Mar 16 2021
 *
 * Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
exports.default = void 0;
var _renderer = _interopRequireDefault(require("../../core/renderer"));
var _dom_adapter = _interopRequireDefault(require("../../core/dom_adapter"));
var _type = require("../../core/utils/type");
var _data = require("../../core/utils/data");
var _iterator = require("../../core/utils/iterator");
var _uiGrid_core = _interopRequireDefault(require("./ui.grid_core.utils"));
var _message = _interopRequireDefault(require("../../localization/message"));
var _query = _interopRequireDefault(require("../../data/query"));

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        "default": obj
    }
}
var SEARCH_PANEL_CLASS = "search-panel";
var SEARCH_TEXT_CLASS = "search-text";
var HEADER_PANEL_CLASS = "header-panel";
var FILTERING_TIMEOUT = 700;

function allowSearch(column) {
    return (0, _type.isDefined)(column.allowSearch) ? column.allowSearch : column.allowFiltering
}

function parseValue(column, text) {
    var lookup = column.lookup;
    if (!column.parseValue) {
        return text
    }
    if (lookup) {
        return column.parseValue.call(lookup, text)
    }
    return column.parseValue(text)
}
var _default = {
    defaultOptions: function() {
        return {
            searchPanel: {
                visible: false,
                width: 160,
                placeholder: _message.default.format("dxDataGrid-searchPanelPlaceholder"),
                highlightSearchText: true,
                highlightCaseSensitive: false,
                text: "",
                searchVisibleColumnsOnly: false
            }
        }
    },
    extenders: {
        controllers: {
            data: function() {
                var calculateSearchFilter = function(that, text) {
                    var i;
                    var column;
                    var columns = that._columnsController.getColumns();
                    var searchVisibleColumnsOnly = that.option("searchPanel.searchVisibleColumnsOnly");
                    var lookup;
                    var filters = [];
                    if (!text) {
                        return null
                    }

                    function onQueryDone(items) {
                        var valueGetter = (0, _data.compileGetter)(lookup.valueExpr);
                        for (var _i = 0; _i < items.length; _i++) {
                            var value = valueGetter(items[_i]);
                            filters.push(column.createFilterExpression(value, null, "search"))
                        }
                    }
                    for (i = 0; i < columns.length; i++) {
                        column = columns[i];
                        if (searchVisibleColumnsOnly && !column.visible) {
                            continue
                        }
                        if (allowSearch(column) && column.calculateFilterExpression) {
                            lookup = column.lookup;
                            var filterValue = parseValue(column, text);
                            if (lookup && lookup.items) {
                                (0, _query.default)(lookup.items).filter(column.createFilterExpression.call({
                                    dataField: lookup.displayExpr,
                                    dataType: lookup.dataType,
                                    calculateFilterExpression: column.calculateFilterExpression
                                }, filterValue, null, "search")).enumerate().done(onQueryDone)
                            } else {
                                if (void 0 !== filterValue) {
                                    filters.push(column.createFilterExpression(filterValue, null, "search"))
                                }
                            }
                        }
                    }
                    return _uiGrid_core.default.combineFilters(filters, "or")
                };
                return {
                    publicMethods: function() {
                        return this.callBase().concat(["searchByText"])
                    },
                    _calculateAdditionalFilter: function() {
                        var that = this;
                        var filter = that.callBase();
                        var searchFilter = calculateSearchFilter(that, that.option("searchPanel.text"));
                        return _uiGrid_core.default.combineFilters([filter, searchFilter])
                    },
                    searchByText: function(text) {
                        this.option("searchPanel.text", text)
                    },
                    optionChanged: function(args) {
                        var that = this;
                        switch (args.fullName) {
                            case "searchPanel.text":
                            case "searchPanel":
                                that._applyFilter();
                                args.handled = true;
                                break;
                            default:
                                that.callBase(args)
                        }
                    }
                }
            }()
        },
        views: {
            headerPanel: function() {
                var getSearchPanelOptions = function(that) {
                    return that.option("searchPanel")
                };
                return {
                    _getToolbarItems: function() {
                        var items = this.callBase();
                        return this._prepareSearchItem(items)
                    },
                    _prepareSearchItem: function(items) {
                        var that = this;
                        var dataController = that.getController("data");
                        var searchPanelOptions = getSearchPanelOptions(that);
                        if (searchPanelOptions && searchPanelOptions.visible) {
                            var toolbarItem = {
                                template: function(data, index, container) {
                                    var $search = (0, _renderer.default)("<div>").addClass(that.addWidgetPrefix(SEARCH_PANEL_CLASS)).appendTo(container);
                                    that.getController("editorFactory").createEditor($search, {
                                        width: searchPanelOptions.width,
                                        placeholder: searchPanelOptions.placeholder,
                                        parentType: "searchPanel",
                                        value: that.option("searchPanel.text"),
                                        updateValueTimeout: FILTERING_TIMEOUT,
                                        setValue: function(value) {
                                            dataController.searchByText(value)
                                        },
                                        editorOptions: {
                                            inputAttr: {
                                                "aria-label": _message.default.format("".concat(that.component.NAME, "-ariaSearchInGrid"))
                                            }
                                        }
                                    });
                                    that.resize()
                                },
                                name: "searchPanel",
                                location: "after",
                                locateInMenu: "never",
                                sortIndex: 40
                            };
                            items.push(toolbarItem)
                        }
                        return items
                    },
                    getSearchTextEditor: function() {
                        var that = this;
                        var $element = that.element();
                        var $searchPanel = $element.find("." + that.addWidgetPrefix(SEARCH_PANEL_CLASS)).filter(function() {
                            return (0, _renderer.default)(this).closest("." + that.addWidgetPrefix(HEADER_PANEL_CLASS)).is($element)
                        });
                        if ($searchPanel.length) {
                            return $searchPanel.dxTextBox("instance")
                        }
                        return null
                    },
                    isVisible: function() {
                        var searchPanelOptions = getSearchPanelOptions(this);
                        return this.callBase() || searchPanelOptions && searchPanelOptions.visible
                    },
                    optionChanged: function(args) {
                        if ("searchPanel" === args.name) {
                            if ("searchPanel.text" === args.fullName) {
                                var editor = this.getSearchTextEditor();
                                if (editor) {
                                    editor.option("value", args.value)
                                }
                            } else {
                                this._invalidate()
                            }
                            args.handled = true
                        } else {
                            this.callBase(args)
                        }
                    }
                }
            }(),
            rowsView: {
                init: function() {
                    this.callBase.apply(this, arguments);
                    this._searchParams = []
                },
                _getFormattedSearchText: function(column, searchText) {
                    var value = parseValue(column, searchText);
                    var formatOptions = _uiGrid_core.default.getFormatOptionsByColumn(column, "search");
                    return _uiGrid_core.default.formatValue(value, formatOptions)
                },
                _getStringNormalizer: function() {
                    var isCaseSensitive = this.option("searchPanel.highlightCaseSensitive");
                    return function(str) {
                        return isCaseSensitive ? str : str.toLowerCase()
                    }
                },
                _findHighlightingTextNodes: function(column, cellElement, searchText) {
                    var _$items;
                    var that = this;
                    var $parent = cellElement.parent();
                    var $items;
                    var stringNormalizer = this._getStringNormalizer();
                    var normalizedSearchText = stringNormalizer(searchText);
                    if (!$parent.length) {
                        $parent = (0, _renderer.default)("<div>").append(cellElement)
                    } else {
                        if (column) {
                            if (column.groupIndex >= 0 && !column.showWhenGrouped) {
                                $items = cellElement
                            } else {
                                var columnIndex = that._columnsController.getVisibleIndex(column.index);
                                $items = $parent.children("td").eq(columnIndex).find("*")
                            }
                        }
                    }
                    $items = null !== (_$items = $items) && void 0 !== _$items && _$items.length ? $items : $parent.find("*");
                    $items = $items.filter(function(_, element) {
                        var $contents = (0, _renderer.default)(element).contents();
                        for (var i = 0; i < $contents.length; i++) {
                            var node = $contents.get(i);
                            if (3 === node.nodeType) {
                                return stringNormalizer(node.textContent || node.nodeValue).indexOf(normalizedSearchText) > -1
                            }
                            return false
                        }
                    });
                    return $items
                },
                _highlightSearchTextCore: function($textNode, searchText) {
                    var that = this;
                    var $searchTextSpan = (0, _renderer.default)("<span>").addClass(that.addWidgetPrefix(SEARCH_TEXT_CLASS));
                    var text = $textNode.text();
                    var firstContentElement = $textNode[0];
                    var stringNormalizer = this._getStringNormalizer();
                    var index = stringNormalizer(text).indexOf(stringNormalizer(searchText));
                    if (index >= 0) {
                        if (firstContentElement.textContent) {
                            firstContentElement.textContent = text.substr(0, index)
                        } else {
                            firstContentElement.nodeValue = text.substr(0, index)
                        }
                        $textNode.after($searchTextSpan.text(text.substr(index, searchText.length)));
                        $textNode = (0, _renderer.default)(_dom_adapter.default.createTextNode(text.substr(index + searchText.length))).insertAfter($searchTextSpan);
                        return that._highlightSearchTextCore($textNode, searchText)
                    }
                },
                _highlightSearchText: function(cellElement, isEquals, column) {
                    var that = this;
                    var stringNormalizer = this._getStringNormalizer();
                    var searchText = that.option("searchPanel.text");
                    if (isEquals && column) {
                        searchText = searchText && that._getFormattedSearchText(column, searchText)
                    }
                    if (searchText && that.option("searchPanel.highlightSearchText")) {
                        var textNodes = that._findHighlightingTextNodes(column, cellElement, searchText);
                        (0, _iterator.each)(textNodes, function(_, element) {
                            (0, _iterator.each)((0, _renderer.default)(element).contents(), function(_, textNode) {
                                if (isEquals) {
                                    if (stringNormalizer((0, _renderer.default)(textNode).text()) === stringNormalizer(searchText)) {
                                        (0, _renderer.default)(this).replaceWith((0, _renderer.default)("<span>").addClass(that.addWidgetPrefix(SEARCH_TEXT_CLASS)).text((0, _renderer.default)(textNode).text()))
                                    }
                                } else {
                                    that._highlightSearchTextCore((0, _renderer.default)(textNode), searchText)
                                }
                            })
                        })
                    }
                },
                _renderCore: function() {
                    this.callBase.apply(this, arguments);
                    if (this.option("rowTemplate")) {
                        if (this.option("templatesRenderAsynchronously")) {
                            clearTimeout(this._highlightTimer);
                            this._highlightTimer = setTimeout(function() {
                                this._highlightSearchText(this.getTableElement())
                            }.bind(this))
                        } else {
                            this._highlightSearchText(this.getTableElement())
                        }
                    }
                },
                _updateCell: function($cell, parameters) {
                    var column = parameters.column;
                    var dataType = column.lookup && column.lookup.dataType || column.dataType;
                    var isEquals = "string" !== dataType;
                    if (allowSearch(column) && !parameters.isOnForm) {
                        if (this.option("templatesRenderAsynchronously")) {
                            if (!this._searchParams.length) {
                                clearTimeout(this._highlightTimer);
                                this._highlightTimer = setTimeout(function() {
                                    this._searchParams.forEach(function(params) {
                                        this._highlightSearchText.apply(this, params)
                                    }.bind(this));
                                    this._searchParams = []
                                }.bind(this))
                            }
                            this._searchParams.push([$cell, isEquals, column])
                        } else {
                            this._highlightSearchText($cell, isEquals, column)
                        }
                    }
                    this.callBase($cell, parameters)
                },
                dispose: function() {
                    clearTimeout(this._highlightTimer);
                    this.callBase()
                }
            }
        }
    }
};
exports.default = _default;
module.exports = exports.default;
