/**
 * DevExtreme (ui/grid_core/ui.grid_core.virtual_scrolling.js)
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
var _common = require("../../core/utils/common");
var _uiGrid_core = require("./ui.grid_core.virtual_scrolling_core");
var _uiGrid_core2 = _interopRequireDefault(require("./ui.grid_core.utils"));
var _iterator = require("../../core/utils/iterator");
var _deferred = require("../../core/utils/deferred");
var _translator = require("../../animation/translator");
var _load_indicator = _interopRequireDefault(require("../load_indicator"));
var _browser = _interopRequireDefault(require("../../core/utils/browser"));
var _position = require("../../core/utils/position");
var _type = require("../../core/utils/type");

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        "default": obj
    }
}
var TABLE_CLASS = "table";
var BOTTOM_LOAD_PANEL_CLASS = "bottom-load-panel";
var TABLE_CONTENT_CLASS = "table-content";
var GROUP_SPACE_CLASS = "group-space";
var CONTENT_CLASS = "content";
var ROW_CLASS = "dx-row";
var FREESPACE_CLASS = "dx-freespace-row";
var COLUMN_LINES_CLASS = "dx-column-lines";
var VIRTUAL_ROW_CLASS = "dx-virtual-row";
var SCROLLING_MODE_INFINITE = "infinite";
var SCROLLING_MODE_VIRTUAL = "virtual";
var SCROLLING_MODE_STANDARD = "standard";
var PIXELS_LIMIT = 25e4;
var LOAD_TIMEOUT = 300;
var isVirtualMode = function(that) {
    return that.option("scrolling.mode") === SCROLLING_MODE_VIRTUAL
};
var isAppendMode = function(that) {
    return that.option("scrolling.mode") === SCROLLING_MODE_INFINITE
};
var isVirtualRowRendering = function(that) {
    var rowRenderingMode = that.option("scrolling.rowRenderingMode");
    if (rowRenderingMode === SCROLLING_MODE_VIRTUAL) {
        return true
    } else {
        if (rowRenderingMode === SCROLLING_MODE_STANDARD) {
            return false
        }
    }
};
var _correctCount = function(items, count, fromEnd, isItemCountableFunc) {
    for (var i = 0; i < count + 1; i++) {
        var item = items[fromEnd ? items.length - 1 - i : i];
        if (item && !isItemCountableFunc(item, i === count, fromEnd)) {
            count++
        }
    }
    return count
};
var isItemCountableByDataSource = function(item, dataSource) {
    return "data" === item.rowType && !item.isNewRow || "group" === item.rowType && dataSource.isGroupItemCountable(item.data)
};
var VirtualScrollingDataSourceAdapterExtender = function() {
    var _updateLoading = function(that) {
        var beginPageIndex = that._virtualScrollController.beginPageIndex(-1);
        if (isVirtualMode(that)) {
            if (beginPageIndex < 0 || that.viewportSize() >= 0 && that.getViewportItemIndex() >= 0 && (beginPageIndex * that.pageSize() > that.getViewportItemIndex() || beginPageIndex * that.pageSize() + that.itemsCount() < that.getViewportItemIndex() + that.viewportSize()) && that._dataSource.isLoading()) {
                if (!that._isLoading) {
                    that._isLoading = true;
                    that.loadingChanged.fire(true)
                }
            } else {
                if (that._isLoading) {
                    that._isLoading = false;
                    that.loadingChanged.fire(false)
                }
            }
        }
    };
    var result = {
        init: function(dataSource) {
            var that = this;
            that.callBase.apply(that, arguments);
            that._items = [];
            that._isLoaded = true;
            that._virtualScrollController = new _uiGrid_core.VirtualScrollController(that.component, {
                pageSize: function() {
                    return that.pageSize()
                },
                totalItemsCount: function() {
                    return that.totalItemsCount()
                },
                hasKnownLastPage: function() {
                    return that.hasKnownLastPage()
                },
                pageIndex: function(index) {
                    return dataSource.pageIndex(index)
                },
                isLoading: function() {
                    return dataSource.isLoading() && !that.isCustomLoading()
                },
                pageCount: function() {
                    return that.pageCount()
                },
                load: function() {
                    return dataSource.load()
                },
                updateLoading: function() {
                    _updateLoading(that)
                },
                itemsCount: function() {
                    return that.itemsCount(true)
                },
                items: function() {
                    return dataSource.items()
                },
                viewportItems: function(items) {
                    if (items) {
                        that._items = items
                    }
                    return that._items
                },
                onChanged: function(e) {
                    that.changed.fire(e)
                },
                changingDuration: function(e) {
                    if (that.isLoading()) {
                        return LOAD_TIMEOUT
                    }
                    return that._renderTime || 0
                }
            })
        },
        _handleLoadingChanged: function(isLoading) {
            if (!isVirtualMode(this) || this._isLoadingAll) {
                this._isLoading = isLoading;
                this.callBase.apply(this, arguments)
            }
            if (isLoading) {
                this._startLoadTime = new Date
            } else {
                this._startLoadTime = void 0
            }
        },
        _handleLoadError: function() {
            var that = this;
            that._isLoading = false;
            that.loadingChanged.fire(false);
            that.callBase.apply(that, arguments)
        },
        _handleDataChanged: function(e) {
            var callBase = this.callBase.bind(this);
            this._virtualScrollController.handleDataChanged(callBase, e)
        },
        _customizeRemoteOperations: function(options, operationTypes) {
            var that = this;
            if (!that.option("legacyRendering") && isVirtualMode(that) && !operationTypes.reload && operationTypes.skip && that._renderTime < that.option("scrolling.renderingThreshold")) {
                options.delay = void 0
            }
            that.callBase.apply(that, arguments)
        },
        items: function() {
            return this._items
        },
        itemsCount: function(isBase) {
            if (isBase) {
                return this.callBase()
            }
            return this._virtualScrollController.itemsCount()
        },
        load: function(loadOptions) {
            if (loadOptions) {
                return this.callBase(loadOptions)
            }
            return this._virtualScrollController.load()
        },
        isLoading: function() {
            return this._isLoading
        },
        isLoaded: function() {
            return this._dataSource.isLoaded() && this._isLoaded
        },
        resetPagesCache: function(isLiveUpdate) {
            if (!isLiveUpdate) {
                this._virtualScrollController.reset(true)
            }
            this.callBase.apply(this, arguments)
        },
        _changeRowExpandCore: function() {
            var result = this.callBase.apply(this, arguments);
            this.resetPagesCache();
            _updateLoading(this);
            return result
        },
        reload: function() {
            this._dataSource.pageIndex(this.pageIndex());
            var virtualScrollController = this._virtualScrollController;
            if (virtualScrollController) {
                var d = new _deferred.Deferred;
                this.callBase.apply(this, arguments).done(function(r) {
                    var delayDeferred = virtualScrollController._delayDeferred;
                    if (delayDeferred) {
                        delayDeferred.done(d.resolve).fail(d.reject)
                    } else {
                        d.resolve(r)
                    }
                }).fail(d.reject);
                return d
            } else {
                return this.callBase.apply(this, arguments)
            }
        },
        refresh: function(options, operationTypes) {
            var that = this;
            var storeLoadOptions = options.storeLoadOptions;
            var dataSource = that._dataSource;
            if (operationTypes.reload) {
                that._virtualScrollController.reset();
                dataSource.items().length = 0;
                that._isLoaded = false;
                _updateLoading(that);
                that._isLoaded = true;
                if (isAppendMode(that)) {
                    that.pageIndex(0);
                    dataSource.pageIndex(0);
                    storeLoadOptions.pageIndex = 0;
                    options.pageIndex = 0;
                    storeLoadOptions.skip = 0
                } else {
                    dataSource.pageIndex(that.pageIndex());
                    if (dataSource.paginate()) {
                        options.pageIndex = that.pageIndex();
                        storeLoadOptions.skip = that.pageIndex() * that.pageSize()
                    }
                }
            } else {
                if (isAppendMode(that) && storeLoadOptions.skip && that._skipCorrection < 0) {
                    storeLoadOptions.skip += that._skipCorrection
                }
            }
            return that.callBase.apply(that, arguments)
        },
        dispose: function() {
            this._virtualScrollController.dispose();
            this.callBase.apply(this, arguments)
        }
    };
    ["virtualItemsCount", "getContentOffset", "getVirtualContentSize", "setContentSize", "setViewportPosition", "getViewportItemIndex", "setViewportItemIndex", "getItemIndexByPosition", "viewportSize", "viewportItemSize", "getItemSize", "getItemSizes", "pageIndex", "beginPageIndex", "endPageIndex", "loadIfNeed"].forEach(function(name) {
        result[name] = function() {
            var virtualScrollController = this._virtualScrollController;
            return virtualScrollController[name].apply(virtualScrollController, arguments)
        }
    });
    return result
}();
var VirtualScrollingRowsViewExtender = function() {
    var removeEmptyRows = function($emptyRows, className) {
        var getRowParent = function(row) {
            return (0, _renderer.default)(row).parent("." + className).get(0)
        };
        var tBodies = $emptyRows.toArray().map(getRowParent).filter(function(row) {
            return row
        });
        if (tBodies.length) {
            $emptyRows = (0, _renderer.default)(tBodies)
        }
        var rowCount = className === FREESPACE_CLASS ? $emptyRows.length - 1 : $emptyRows.length;
        for (var i = 0; i < rowCount; i++) {
            $emptyRows.eq(i).remove()
        }
    };
    return {
        init: function() {
            var _dataController$state, _this = this;
            var dataController = this.getController("data");
            this.callBase();
            dataController.pageChanged.add(function() {
                _this.scrollToPage(dataController.pageIndex())
            });
            dataController.dataSourceChanged.add(function() {
                !_this._scrollTop && _this._scrollToCurrentPageOnResize()
            });
            null === (_dataController$state = dataController.stateLoaded) || void 0 === _dataController$state ? void 0 : _dataController$state.add(function() {
                _this._scrollToCurrentPageOnResize()
            });
            this._scrollToCurrentPageOnResize()
        },
        _scrollToCurrentPageOnResize: function() {
            var _this2 = this;
            var dataController = this.getController("data");
            if (!this.option("legacyRendering") && dataController.pageIndex() > 0) {
                var resizeHandler = function resizeHandler() {
                    _this2.resizeCompleted.remove(resizeHandler);
                    _this2.scrollToPage(dataController.pageIndex())
                };
                this.resizeCompleted.add(resizeHandler)
            }
        },
        scrollToPage: function(pageIndex) {
            var that = this;
            var dataController = that._dataController;
            var pageSize = dataController ? dataController.pageSize() : 0;
            var scrollPosition;
            if (isVirtualMode(that) || isAppendMode(that)) {
                var itemSize = dataController.getItemSize();
                var itemSizes = dataController.getItemSizes();
                var itemIndex = pageIndex * pageSize;
                scrollPosition = itemIndex * itemSize;
                for (var index in itemSizes) {
                    if (index < itemIndex) {
                        scrollPosition += itemSizes[index] - itemSize
                    }
                }
            } else {
                scrollPosition = 0
            }
            that.scrollTo({
                y: scrollPosition,
                x: that._scrollLeft
            })
        },
        renderDelayedTemplates: function(e) {
            this._updateContentPosition(true);
            this.callBase.apply(this, arguments)
        },
        _renderCore: function(e) {
            var that = this;
            var startRenderTime = new Date;
            that.callBase.apply(that, arguments);
            var dataSource = that._dataController._dataSource;
            if (dataSource && e) {
                var itemCount = e.items ? e.items.length : 20;
                var viewportSize = that._dataController.viewportSize() || 20;
                if (isVirtualRowRendering(that)) {
                    dataSource._renderTime = (new Date - startRenderTime) * viewportSize / itemCount
                } else {
                    dataSource._renderTime = new Date - startRenderTime
                }
            }
        },
        _getRowElements: function(tableElement) {
            var $rows = this.callBase(tableElement);
            return $rows && $rows.not("." + VIRTUAL_ROW_CLASS)
        },
        _renderContent: function(contentElement, tableElement) {
            var that = this;
            var virtualItemsCount = that._dataController.virtualItemsCount();
            if (virtualItemsCount && that.option("legacyRendering")) {
                if ((0, _window.hasWindow)()) {
                    tableElement.addClass(that.addWidgetPrefix(TABLE_CONTENT_CLASS))
                }
                if (!contentElement.children().length) {
                    contentElement.append(tableElement)
                } else {
                    contentElement.children().first().replaceWith(tableElement)
                }
                if (1 === contentElement.children("table").length) {
                    contentElement.append(that._createTable());
                    that._contentHeight = 0
                }
                return contentElement
            }
            return that.callBase.apply(that, arguments)
        },
        _removeRowsElements: function(contentTable, removeCount, changeType) {
            var rowElements = this._getRowElements(contentTable).toArray();
            if ("append" === changeType) {
                rowElements = rowElements.slice(0, removeCount)
            } else {
                rowElements = rowElements.slice(-removeCount)
            }
            var errorHandlingController = this.getController("errorHandling");
            rowElements.map(function(rowElement) {
                var $rowElement = (0, _renderer.default)(rowElement);
                errorHandlingController && errorHandlingController.removeErrorRow($rowElement.next());
                $rowElement.remove()
            })
        },
        _restoreErrorRow: function(contentTable) {
            var editingController = this.getController("editing");
            editingController && editingController.hasChanges() && this._getRowElements(contentTable).each(function(_, item) {
                var rowOptions = (0, _renderer.default)(item).data("options");
                if (rowOptions) {
                    var change = editingController.getChangeByKey(rowOptions.key);
                    change && editingController._showErrorRow(change)
                }
            })
        },
        _updateContent: function(tableElement, change) {
            var that = this;
            var $freeSpaceRowElements;
            var contentElement = that._findContentElement();
            var changeType = change && change.changeType;
            if ("append" === changeType || "prepend" === changeType) {
                var contentTable = contentElement.children().first();
                var $tBodies = that._getBodies(tableElement);
                if (!that.option("legacyRendering") && 1 === $tBodies.length) {
                    that._getBodies(contentTable)["append" === changeType ? "append" : "prepend"]($tBodies.children())
                } else {
                    $tBodies["append" === changeType ? "appendTo" : "prependTo"](contentTable)
                }
                tableElement.remove();
                $freeSpaceRowElements = that._getFreeSpaceRowElements(contentTable);
                removeEmptyRows($freeSpaceRowElements, FREESPACE_CLASS);
                if (change.removeCount) {
                    that._removeRowsElements(contentTable, change.removeCount, changeType)
                }
                that._restoreErrorRow(contentTable)
            } else {
                that.callBase.apply(that, arguments)
            }
            that._updateBottomLoading()
        },
        _addVirtualRow: function($table, isFixed, location, position) {
            if (!position) {
                return
            }
            var $virtualRow = this._createEmptyRow(VIRTUAL_ROW_CLASS, isFixed, position);
            $virtualRow = this._wrapRowIfNeed($table, $virtualRow);
            this._appendEmptyRow($table, $virtualRow, location)
        },
        _getRowHeights: function() {
            var rowHeights = this._getRowElements(this._tableElement).toArray().map(function(row) {
                return (0, _position.getBoundingRect)(row).height
            });
            return rowHeights
        },
        _correctRowHeights: function(rowHeights) {
            var dataController = this._dataController;
            var dataSource = dataController._dataSource;
            var correctedRowHeights = [];
            var visibleRows = dataController.getVisibleRows();
            var itemSize = 0;
            var firstCountableItem = true;
            for (var i = 0; i < rowHeights.length; i++) {
                var currentItem = visibleRows[i];
                if (!(0, _type.isDefined)(currentItem)) {
                    continue
                }
                if (isItemCountableByDataSource(currentItem, dataSource)) {
                    if (firstCountableItem) {
                        firstCountableItem = false
                    } else {
                        correctedRowHeights.push(itemSize);
                        itemSize = 0
                    }
                }
                itemSize += rowHeights[i]
            }
            itemSize > 0 && correctedRowHeights.push(itemSize);
            return correctedRowHeights
        },
        _updateContentPosition: function(isRender) {
            var that = this;
            var dataController = that._dataController;
            var rowHeight = that._rowHeight || 20;
            dataController.viewportItemSize(rowHeight);
            if (!that.option("legacyRendering") && (isVirtualMode(that) || isVirtualRowRendering(that))) {
                if (!isRender) {
                    var rowHeights = that._getRowHeights();
                    var correctedRowHeights = that._correctRowHeights(rowHeights);
                    dataController.setContentSize(correctedRowHeights)
                }
                var top = dataController.getContentOffset("begin");
                var bottom = dataController.getContentOffset("end");
                var $tables = that.getTableElements();
                var $virtualRows = $tables.children("tbody").children("." + VIRTUAL_ROW_CLASS);
                removeEmptyRows($virtualRows, VIRTUAL_ROW_CLASS);
                $tables.each(function(index) {
                    var isFixed = index > 0;
                    that._isFixedTableRendering = isFixed;
                    that._addVirtualRow((0, _renderer.default)(this), isFixed, "top", top);
                    that._addVirtualRow((0, _renderer.default)(this), isFixed, "bottom", bottom);
                    that._isFixedTableRendering = false
                })
            } else {
                (0, _common.deferUpdate)(function() {
                    that._updateContentPositionCore()
                })
            }
        },
        _updateContentPositionCore: function() {
            var that = this;
            var contentHeight;
            var $tables;
            var $contentTable;
            var rowHeight = that._rowHeight || 20;
            var virtualItemsCount = that._dataController.virtualItemsCount();
            if (virtualItemsCount) {
                var contentElement = that._findContentElement();
                $tables = contentElement.children();
                $contentTable = $tables.eq(0);
                var virtualTable = $tables.eq(1);
                that._contentTableHeight = $contentTable[0].offsetHeight;
                that._dataController.viewportItemSize(rowHeight);
                that._dataController.setContentSize(that._contentTableHeight);
                contentHeight = that._dataController.getVirtualContentSize();
                var top = that._dataController.getContentOffset();
                (0, _common.deferRender)(function() {
                    (0, _translator.move)($contentTable, {
                        left: 0,
                        top: top
                    });
                    var isRenderVirtualTableContentRequired = that._contentHeight !== contentHeight || 0 === contentHeight || !that._isTableLinesDisplaysCorrect(virtualTable) || !that._isColumnElementsEqual($contentTable.find("col"), virtualTable.find("col"));
                    if (isRenderVirtualTableContentRequired) {
                        that._contentHeight = contentHeight;
                        that._renderVirtualTableContent(virtualTable, contentHeight)
                    }
                })
            }
        },
        _isTableLinesDisplaysCorrect: function(table) {
            var hasColumnLines = table.find("." + COLUMN_LINES_CLASS).length > 0;
            return hasColumnLines === this.option("showColumnLines")
        },
        _isColumnElementsEqual: function($columns, $virtualColumns) {
            var result = $columns.length === $virtualColumns.length;
            if (result) {
                (0, _iterator.each)($columns, function(index, element) {
                    if (element.style.width !== $virtualColumns[index].style.width) {
                        result = false;
                        return result
                    }
                })
            }
            return result
        },
        _renderVirtualTableContent: function(container, height) {
            var that = this;
            var columns = that._columnsController.getVisibleColumns();
            var html = that._createColGroup(columns).prop("outerHTML");
            var freeSpaceCellsHtml = "";
            var columnLinesClass = that.option("showColumnLines") ? COLUMN_LINES_CLASS : "";
            var createFreeSpaceRowHtml = function(height) {
                return "<tr style='height:" + height + "px;' class='" + FREESPACE_CLASS + " " + ROW_CLASS + " " + columnLinesClass + "' >" + freeSpaceCellsHtml + "</tr>"
            };
            for (var i = 0; i < columns.length; i++) {
                var classes = that._getCellClasses(columns[i]);
                var classString = classes.length ? " class='" + classes.join(" ") + "'" : "";
                freeSpaceCellsHtml += "<td" + classString + "/>"
            }
            while (height > PIXELS_LIMIT) {
                html += createFreeSpaceRowHtml(PIXELS_LIMIT);
                height -= PIXELS_LIMIT
            }
            html += createFreeSpaceRowHtml(height);
            container.addClass(that.addWidgetPrefix(TABLE_CLASS));
            container.html(html)
        },
        _getCellClasses: function(column) {
            var classes = [];
            var cssClass = column.cssClass;
            var isExpandColumn = "expand" === column.command;
            cssClass && classes.push(cssClass);
            isExpandColumn && classes.push(this.addWidgetPrefix(GROUP_SPACE_CLASS));
            return classes
        },
        _findBottomLoadPanel: function($contentElement) {
            var $element = $contentElement || this.element();
            var $bottomLoadPanel = $element && $element.find("." + this.addWidgetPrefix(BOTTOM_LOAD_PANEL_CLASS));
            if ($bottomLoadPanel && $bottomLoadPanel.length) {
                return $bottomLoadPanel
            }
        },
        _updateBottomLoading: function() {
            var that = this;
            var scrollingMode = that.option("scrolling.mode");
            var virtualMode = scrollingMode === SCROLLING_MODE_VIRTUAL;
            var appendMode = scrollingMode === SCROLLING_MODE_INFINITE;
            var showBottomLoading = !that._dataController.hasKnownLastPage() && that._dataController.isLoaded() && (virtualMode || appendMode);
            var $contentElement = that._findContentElement();
            var bottomLoadPanelElement = that._findBottomLoadPanel($contentElement);
            if (showBottomLoading) {
                if (!bottomLoadPanelElement) {
                    (0, _renderer.default)("<div>").addClass(that.addWidgetPrefix(BOTTOM_LOAD_PANEL_CLASS)).append(that._createComponent((0, _renderer.default)("<div>"), _load_indicator.default).$element()).appendTo($contentElement)
                }
            } else {
                if (bottomLoadPanelElement) {
                    bottomLoadPanelElement.remove()
                }
            }
        },
        _handleScroll: function(e) {
            var that = this;
            if (that._hasHeight && that._rowHeight) {
                that._dataController.setViewportPosition(e.scrollOffset.top)
            }
            that.callBase.apply(that, arguments)
        },
        _needUpdateRowHeight: function(itemsCount) {
            var that = this;
            return that.callBase.apply(that, arguments) || itemsCount > 0 && that.option("scrolling.mode") === SCROLLING_MODE_INFINITE && that.option("scrolling.rowRenderingMode") !== SCROLLING_MODE_VIRTUAL
        },
        _updateRowHeight: function() {
            var that = this;
            that.callBase.apply(that, arguments);
            if (that._rowHeight) {
                that._updateContentPosition();
                var viewportHeight = that._hasHeight ? that.element().outerHeight() : (0, _renderer.default)((0, _window.getWindow)()).outerHeight();
                that._dataController.viewportSize(Math.ceil(viewportHeight / that._rowHeight))
            }
        },
        updateFreeSpaceRowHeight: function() {
            var result = this.callBase.apply(this, arguments);
            if (result) {
                this._updateContentPosition()
            }
            return result
        },
        setLoading: function(isLoading, messageText) {
            var that = this;
            var callBase = that.callBase;
            var dataController = that._dataController;
            var hasBottomLoadPanel = dataController.pageIndex() > 0 && dataController.isLoaded() && !!that._findBottomLoadPanel();
            if (hasBottomLoadPanel) {
                isLoading = false
            }
            callBase.call(that, isLoading, messageText)
        },
        _resizeCore: function() {
            var that = this;
            var $element = that.element();
            that.callBase();
            if (that.component.$element() && !that._windowScroll && $element.closest((0, _window.getWindow)().document).length) {
                that._windowScroll = (0, _uiGrid_core.subscribeToExternalScrollers)($element, function(scrollPos) {
                    if (!that._hasHeight && that._rowHeight) {
                        that._dataController.setViewportPosition(scrollPos)
                    }
                }, that.component.$element());
                that.on("disposing", function() {
                    that._windowScroll.dispose()
                })
            }
            that.loadIfNeed()
        },
        loadIfNeed: function() {
            var dataController = this._dataController;
            if (dataController && dataController.loadIfNeed) {
                dataController.loadIfNeed()
            }
        },
        setColumnWidths: function(widths) {
            var scrollable = this.getScrollable();
            var $content;
            this.callBase.apply(this, arguments);
            if ("virtual" === this.option("scrolling.mode")) {
                $content = scrollable ? scrollable.$content() : this.element();
                this.callBase(widths, $content.children("." + this.addWidgetPrefix(CONTENT_CLASS)).children(":not(." + this.addWidgetPrefix(TABLE_CONTENT_CLASS) + ")"))
            }
        },
        dispose: function() {
            clearTimeout(this._scrollTimeoutID);
            this.callBase()
        }
    }
}();
var _default = {
    defaultOptions: function() {
        return {
            scrolling: {
                timeout: 300,
                updateTimeout: 300,
                minTimeout: 0,
                renderingThreshold: 100,
                removeInvisiblePages: true,
                rowPageSize: 5,
                mode: "standard",
                preloadEnabled: false,
                rowRenderingMode: "standard",
                loadTwoPagesOnStart: false
            }
        }
    },
    extenders: {
        dataSourceAdapter: VirtualScrollingDataSourceAdapterExtender,
        controllers: {
            data: function() {
                var members = {
                    _refreshDataSource: function() {
                        var baseResult = this.callBase.apply(this, arguments) || (new _deferred.Deferred).resolve().promise();
                        baseResult.done(this.initVirtualRows.bind(this));
                        return baseResult
                    },
                    getRowPageSize: function() {
                        var rowPageSize = this.option("scrolling.rowPageSize");
                        var pageSize = this.pageSize();
                        return pageSize && pageSize < rowPageSize ? pageSize : rowPageSize
                    },
                    reload: function() {
                        var that = this;
                        var rowsScrollController = that._rowsScrollController || that._dataSource;
                        var itemIndex = rowsScrollController && rowsScrollController.getItemIndexByPosition();
                        var result = this.callBase.apply(this, arguments);
                        return result && result.done(function() {
                            if (isVirtualMode(that) || isVirtualRowRendering(that)) {
                                var rowIndexOffset = that.getRowIndexOffset();
                                var rowIndex = Math.floor(itemIndex) - rowIndexOffset;
                                var component = that.component;
                                var scrollable = component.getScrollable && component.getScrollable();
                                var isSortingOperation = that.dataSource().operationTypes().sorting;
                                if (scrollable && !that.option("legacyRendering") && !isSortingOperation) {
                                    var rowElement = component.getRowElement(rowIndex);
                                    var $rowElement = rowElement && rowElement[0] && (0, _renderer.default)(rowElement[0]);
                                    var top = $rowElement && $rowElement.position().top;
                                    var allowedTopOffset = _browser.default.mozilla || _browser.default.msie ? 1 : 0;
                                    if (top > allowedTopOffset) {
                                        top = Math.round(top + $rowElement.outerHeight() * (itemIndex % 1));
                                        scrollable.scrollTo({
                                            y: top
                                        })
                                    }
                                }
                            }
                        })
                    },
                    initVirtualRows: function() {
                        var that = this;
                        var virtualRowsRendering = isVirtualRowRendering(that);
                        if ("virtual" !== that.option("scrolling.mode") && true !== virtualRowsRendering || false === virtualRowsRendering || that.option("legacyRendering") || !that.option("scrolling.rowPageSize")) {
                            that._visibleItems = null;
                            that._rowsScrollController = null;
                            return
                        }
                        var pageIndex = !isVirtualMode(this) && that.pageIndex() >= that.pageCount() ? that.pageCount() - 1 : that.pageIndex();
                        that._rowPageIndex = Math.ceil(pageIndex * that.pageSize() / that.getRowPageSize());
                        that._visibleItems = [];
                        var isItemCountable = function(item) {
                            return isItemCountableByDataSource(item, that._dataSource)
                        };
                        that._rowsScrollController = new _uiGrid_core.VirtualScrollController(that.component, {
                            pageSize: function() {
                                return that.getRowPageSize()
                            },
                            totalItemsCount: function() {
                                return isVirtualMode(that) ? that.totalItemsCount() : that._items.filter(isItemCountable).length
                            },
                            hasKnownLastPage: function() {
                                return true
                            },
                            pageIndex: function(index) {
                                if (void 0 !== index) {
                                    that._rowPageIndex = index
                                }
                                return that._rowPageIndex
                            },
                            isLoading: function() {
                                return that.isLoading()
                            },
                            pageCount: function pageCount() {
                                var pageCount = Math.ceil(this.totalItemsCount() / this.pageSize());
                                return pageCount ? pageCount : 1
                            },
                            load: function() {
                                if (that._rowsScrollController.pageIndex() >= this.pageCount()) {
                                    that._rowPageIndex = this.pageCount() - 1;
                                    that._rowsScrollController.pageIndex(that._rowPageIndex)
                                }
                                if (!that._rowsScrollController._dataSource.items().length && this.totalItemsCount()) {
                                    return
                                }
                                that._rowsScrollController.handleDataChanged(function(change) {
                                    change = change || {};
                                    change.changeType = change.changeType || "refresh";
                                    change.items = change.items || that._visibleItems;
                                    that._visibleItems.forEach(function(item, index) {
                                        item.rowIndex = index
                                    });
                                    that._fireChanged(change)
                                })
                            },
                            updateLoading: function() {},
                            itemsCount: function() {
                                return that._rowsScrollController._dataSource.items().filter(isItemCountable).length
                            },
                            correctCount: function(items, count, fromEnd) {
                                return _correctCount(items, count, fromEnd, function(item, isNextAfterLast, fromEnd) {
                                    if (item.isNewRow) {
                                        return isNextAfterLast && !fromEnd
                                    }
                                    if (isNextAfterLast && fromEnd) {
                                        return !item.isNewRow
                                    }
                                    return isItemCountable(item)
                                })
                            },
                            items: function(countableOnly) {
                                var dataSource = that.dataSource();
                                var virtualItemsCount = dataSource && dataSource.virtualItemsCount();
                                var begin = virtualItemsCount ? virtualItemsCount.begin : 0;
                                var rowPageSize = that.getRowPageSize();
                                var skip = that._rowPageIndex * rowPageSize - begin;
                                var take = rowPageSize;
                                var result = that._items;
                                if (skip < 0) {
                                    return []
                                }
                                if (skip) {
                                    skip = this.correctCount(result, skip);
                                    result = result.slice(skip)
                                }
                                if (take) {
                                    take = this.correctCount(result, take);
                                    result = result.slice(0, take)
                                }
                                return countableOnly ? result.filter(isItemCountable) : result
                            },
                            viewportItems: function(items) {
                                if (items) {
                                    that._visibleItems = items
                                }
                                return that._visibleItems
                            },
                            onChanged: function() {},
                            changingDuration: function(e) {
                                var dataSource = that.dataSource();
                                if (dataSource.isLoading()) {
                                    return LOAD_TIMEOUT
                                }
                                return (null === dataSource || void 0 === dataSource ? void 0 : dataSource._renderTime) || 0
                            }
                        }, true);
                        that._rowsScrollController.positionChanged.add(function() {
                            var _that$_dataSource;
                            null === (_that$_dataSource = that._dataSource) || void 0 === _that$_dataSource ? void 0 : _that$_dataSource.setViewportItemIndex(that._rowsScrollController.getViewportItemIndex())
                        });
                        if (that.isLoaded()) {
                            that._rowsScrollController.load()
                        }
                    },
                    _updateItemsCore: function(change) {
                        var _this3 = this;
                        var delta = this.getRowIndexDelta();
                        this.callBase.apply(this, arguments);
                        var rowsScrollController = this._rowsScrollController;
                        if (rowsScrollController) {
                            var visibleItems = this._visibleItems;
                            var isRefresh = "refresh" === change.changeType || change.isLiveUpdate;
                            if ("append" === change.changeType && change.items && !change.items.length) {
                                return
                            }
                            if (isRefresh || "append" === change.changeType || "prepend" === change.changeType) {
                                change.cancel = true;
                                isRefresh && rowsScrollController.reset(true);
                                rowsScrollController.load()
                            } else {
                                if ("update" === change.changeType) {
                                    change.rowIndices.forEach(function(rowIndex, index) {
                                        var changeType = change.changeTypes[index];
                                        var newItem = change.items[index];
                                        if ("update" === changeType) {
                                            visibleItems[rowIndex] = newItem
                                        } else {
                                            if ("insert" === changeType) {
                                                visibleItems.splice(rowIndex, 0, newItem)
                                            } else {
                                                if ("remove" === changeType) {
                                                    visibleItems.splice(rowIndex, 1)
                                                }
                                            }
                                        }
                                    })
                                } else {
                                    visibleItems.forEach(function(item, index) {
                                        visibleItems[index] = _this3._items[index + delta] || visibleItems[index]
                                    });
                                    change.items = visibleItems
                                }
                                visibleItems.forEach(function(item, index) {
                                    item.rowIndex = index
                                })
                            }
                        }
                    },
                    _applyChange: function(change) {
                        var that = this;
                        var items = change.items;
                        var changeType = change.changeType;
                        var removeCount = change.removeCount;
                        if (removeCount) {
                            var fromEnd = "prepend" === changeType;
                            removeCount = _correctCount(that._items, removeCount, fromEnd, function(item, isNextAfterLast) {
                                return "data" === item.rowType && !item.isNewRow || "group" === item.rowType && (that._dataSource.isGroupItemCountable(item.data) || isNextAfterLast)
                            });
                            change.removeCount = removeCount
                        }
                        switch (changeType) {
                            case "prepend":
                                that._items.unshift.apply(that._items, items);
                                if (removeCount) {
                                    that._items.splice(-removeCount)
                                }
                                break;
                            case "append":
                                that._items.push.apply(that._items, items);
                                if (removeCount) {
                                    that._items.splice(0, removeCount)
                                }
                                break;
                            default:
                                that.callBase(change)
                        }
                    },
                    items: function(allItems) {
                        return allItems ? this._items : this._visibleItems || this._items
                    },
                    getRowIndexDelta: function() {
                        var visibleItems = this._visibleItems;
                        var delta = 0;
                        if (visibleItems && visibleItems[0]) {
                            delta = this._items.indexOf(visibleItems[0])
                        }
                        return delta < 0 ? 0 : delta
                    },
                    getRowIndexOffset: function(byLoadedRows) {
                        var offset = 0;
                        var dataSource = this.dataSource();
                        var rowsScrollController = this._rowsScrollController;
                        if (rowsScrollController && !byLoadedRows) {
                            offset = rowsScrollController.beginPageIndex() * rowsScrollController._dataSource.pageSize()
                        } else {
                            if ("virtual" === this.option("scrolling.mode") && dataSource) {
                                offset = dataSource.beginPageIndex() * dataSource.pageSize()
                            }
                        }
                        return offset
                    },
                    viewportSize: function() {
                        var rowsScrollController = this._rowsScrollController;
                        rowsScrollController && rowsScrollController.viewportSize.apply(rowsScrollController, arguments);
                        var dataSource = this._dataSource;
                        return dataSource && dataSource.viewportSize.apply(dataSource, arguments)
                    },
                    viewportItemSize: function() {
                        var rowsScrollController = this._rowsScrollController;
                        rowsScrollController && rowsScrollController.viewportItemSize.apply(rowsScrollController, arguments);
                        var dataSource = this._dataSource;
                        return dataSource && dataSource.viewportItemSize.apply(dataSource, arguments)
                    },
                    setViewportPosition: function() {
                        var rowsScrollController = this._rowsScrollController;
                        var dataSource = this._dataSource;
                        if (rowsScrollController) {
                            rowsScrollController.setViewportPosition.apply(rowsScrollController, arguments)
                        } else {
                            null === dataSource || void 0 === dataSource ? void 0 : dataSource.setViewportPosition.apply(dataSource, arguments)
                        }
                    },
                    setContentSize: function(sizes) {
                        var rowsScrollController = this._rowsScrollController;
                        rowsScrollController && rowsScrollController.setContentSize(sizes);
                        var dataSource = this._dataSource;
                        return dataSource && dataSource.setContentSize(sizes)
                    },
                    loadIfNeed: function() {
                        var rowsScrollController = this._rowsScrollController;
                        rowsScrollController && rowsScrollController.loadIfNeed();
                        var dataSource = this._dataSource;
                        return dataSource && dataSource.loadIfNeed()
                    },
                    getItemSize: function() {
                        var rowsScrollController = this._rowsScrollController;
                        if (rowsScrollController) {
                            return rowsScrollController.getItemSize.apply(rowsScrollController, arguments)
                        }
                        var dataSource = this._dataSource;
                        return dataSource && dataSource.getItemSize.apply(dataSource, arguments)
                    },
                    getItemSizes: function() {
                        var rowsScrollController = this._rowsScrollController;
                        if (rowsScrollController) {
                            return rowsScrollController.getItemSizes.apply(rowsScrollController, arguments)
                        }
                        var dataSource = this._dataSource;
                        return dataSource && dataSource.getItemSizes.apply(dataSource, arguments)
                    },
                    getContentOffset: function() {
                        var rowsScrollController = this._rowsScrollController;
                        if (rowsScrollController) {
                            return rowsScrollController.getContentOffset.apply(rowsScrollController, arguments)
                        }
                        var dataSource = this._dataSource;
                        return dataSource && dataSource.getContentOffset.apply(dataSource, arguments)
                    },
                    refresh: function(options) {
                        var dataSource = this._dataSource;
                        if (dataSource && options && options.load && isAppendMode(this)) {
                            dataSource.resetCurrentTotalCount()
                        }
                        return this.callBase.apply(this, arguments)
                    },
                    dispose: function() {
                        var rowsScrollController = this._rowsScrollController;
                        rowsScrollController && rowsScrollController.dispose();
                        this.callBase.apply(this, arguments)
                    }
                };
                _uiGrid_core2.default.proxyMethod(members, "virtualItemsCount");
                _uiGrid_core2.default.proxyMethod(members, "getVirtualContentSize");
                _uiGrid_core2.default.proxyMethod(members, "setViewportItemIndex");
                return members
            }(),
            resizing: {
                resize: function() {
                    var that = this;
                    var callBase = that.callBase;
                    var result;
                    if (!that.option("legacyRendering") && (isVirtualMode(that) || isVirtualRowRendering(that))) {
                        clearTimeout(that._resizeTimeout);
                        var diff = new Date - that._lastTime;
                        var updateTimeout = that.option("scrolling.updateTimeout");
                        if (that._lastTime && diff < updateTimeout) {
                            result = new _deferred.Deferred;
                            that._resizeTimeout = setTimeout(function() {
                                callBase.apply(that).done(result.resolve).fail(result.reject);
                                that._lastTime = new Date
                            }, updateTimeout);
                            that._lastTime = new Date
                        } else {
                            result = callBase.apply(that);
                            if (that._dataController.isLoaded()) {
                                that._lastTime = new Date
                            }
                        }
                    } else {
                        result = callBase.apply(that)
                    }
                    return result
                },
                dispose: function() {
                    this.callBase.apply(this, arguments);
                    clearTimeout(this._resizeTimeout)
                }
            }
        },
        views: {
            rowsView: VirtualScrollingRowsViewExtender
        }
    }
};
exports.default = _default;
module.exports = exports.default;
