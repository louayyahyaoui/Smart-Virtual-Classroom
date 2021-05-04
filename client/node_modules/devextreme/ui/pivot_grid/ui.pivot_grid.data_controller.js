/**
 * DevExtreme (ui/pivot_grid/ui.pivot_grid.data_controller.js)
 * Version: 20.2.6
 * Build date: Tue Mar 16 2021
 *
 * Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
exports.DataController = void 0;
var _callbacks = _interopRequireDefault(require("../../core/utils/callbacks"));
var _deferred = require("../../core/utils/deferred");
var _extend2 = require("../../core/utils/extend");
var _array = require("../../core/utils/array");
var _iterator = require("../../core/utils/iterator");
var _class = _interopRequireDefault(require("../../core/class"));
var _string = require("../../core/utils/string");
var _common = require("../../core/utils/common");
var _type = require("../../core/utils/type");
var _uiGrid_core = require("../grid_core/ui.grid_core.virtual_scrolling_core");
var _uiGrid_core2 = require("../grid_core/ui.grid_core.virtual_columns_core");
var _uiGrid_core3 = require("../grid_core/ui.grid_core.state_storing_core");
var _data_source = _interopRequireDefault(require("./data_source"));
var _uiPivot_grid = require("./ui.pivot_grid.utils");

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        "default": obj
    }
}

function _defineProperty(obj, key, value) {
    if (key in obj) {
        Object.defineProperty(obj, key, {
            value: value,
            enumerable: true,
            configurable: true,
            writable: true
        })
    } else {
        obj[key] = value
    }
    return obj
}
var math = Math;
var GRAND_TOTAL_TYPE = "GT";
var TOTAL_TYPE = "T";
var DATA_TYPE = "D";
var NOT_AVAILABLE = "#N/A";
var CHANGING_DURATION_IF_PAGINATE = 300;
var proxyMethod = function(instance, methodName, defaultResult) {
    if (!instance[methodName]) {
        instance[methodName] = function() {
            var dataSource = this._dataSource;
            return dataSource ? dataSource[methodName].apply(dataSource, arguments) : defaultResult
        }
    }
};
var DataController = _class.default.inherit(function() {
    function getHeaderItemText(item, description, options) {
        var text = item.text;
        if ((0, _type.isDefined)(item.displayText)) {
            text = item.displayText
        } else {
            if ((0, _type.isDefined)(item.caption)) {
                text = item.caption
            } else {
                if (item.type === GRAND_TOTAL_TYPE) {
                    text = options.texts.grandTotal
                }
            }
        }
        if (item.isAdditionalTotal) {
            text = (0, _string.format)(options.texts.total || "", text)
        }
        return text
    }

    function formatCellValue(value, dataField, errorText) {
        return value === NOT_AVAILABLE ? errorText : (0, _uiPivot_grid.formatValue)(value, dataField)
    }
    var createHeaderInfo = function() {
        var getHeaderItemsDepth = function(headerItems) {
            var depth = 0;
            (0, _uiPivot_grid.foreachTree)(headerItems, function(items) {
                depth = math.max(depth, items.length)
            });
            return depth
        };
        var createInfoItem = function(headerItem, breadth, isHorizontal, isTree) {
            var infoItem = {
                type: headerItem.type,
                text: headerItem.text
            };
            if (headerItem.path) {
                infoItem.path = headerItem.path
            }
            if (headerItem.width) {
                infoItem.width = headerItem.width
            }
            if ((0, _type.isDefined)(headerItem.wordWrapEnabled)) {
                infoItem.wordWrapEnabled = headerItem.wordWrapEnabled
            }
            if (headerItem.isLast) {
                infoItem.isLast = true
            }
            if (headerItem.sorted) {
                infoItem.sorted = true
            }
            if (headerItem.isMetric) {
                infoItem.dataIndex = headerItem.dataIndex
            }
            if ((0, _type.isDefined)(headerItem.expanded)) {
                infoItem.expanded = headerItem.expanded
            }
            if (breadth > 1) {
                infoItem[isHorizontal ? "colspan" : "rowspan"] = breadth
            }
            if (headerItem.depthSize && headerItem.depthSize > 1) {
                infoItem[isHorizontal ? "rowspan" : "colspan"] = headerItem.depthSize
            }
            if (headerItem.index >= 0) {
                infoItem.dataSourceIndex = headerItem.index
            }
            if (isTree && headerItem.children && headerItem.children.length && !headerItem.children[0].isMetric) {
                infoItem.width = null;
                infoItem.isWhiteSpace = true
            }
            return infoItem
        };
        var addInfoItem = function(info, options) {
            var breadth = options.lastIndex - options.index || 1;
            var addInfoItemCore = function(info, infoItem, itemIndex, depthIndex, isHorizontal) {
                var index = isHorizontal ? depthIndex : itemIndex;
                while (!info[index]) {
                    info.push([])
                }
                if (isHorizontal) {
                    info[index].push(infoItem)
                } else {
                    info[index].unshift(infoItem)
                }
            };
            var itemInfo = createInfoItem(options.headerItem, breadth, options.isHorizontal, options.isTree);
            addInfoItemCore(info, itemInfo, options.index, options.depth, options.isHorizontal);
            if (!options.headerItem.children || 0 === options.headerItem.children.length) {
                return options.lastIndex + 1
            }
            return options.lastIndex
        };
        var isItemSorted = function(items, sortBySummaryPath) {
            var path;
            var item = items[0];
            var stringValuesUsed = (0, _type.isString)(sortBySummaryPath[0]);
            var headerItem = item.dataIndex >= 0 ? items[1] : item;
            if (stringValuesUsed && sortBySummaryPath[0].indexOf("&[") !== -1 && headerItem.key || !headerItem.key) {
                path = (0, _uiPivot_grid.createPath)(items)
            } else {
                path = (0, _iterator.map)(items, function(item) {
                    return item.dataIndex >= 0 ? item.value : item.text
                }).reverse()
            }
            if (item.type === GRAND_TOTAL_TYPE) {
                path = path.slice(1)
            }
            return path.join("/") === sortBySummaryPath.join("/")
        };
        var getViewHeaderItems = function(headerItems, headerDescriptions, cellDescriptions, depthSize, options) {
            var cellDescriptionsCount = cellDescriptions.length;
            var viewHeaderItems = createViewHeaderItems(headerItems, headerDescriptions);
            var dataFields = options.dataFields;
            var d = new _deferred.Deferred;
            (0, _deferred.when)(viewHeaderItems).done(function(viewHeaderItems) {
                options.notifyProgress(.5);
                if (options.showGrandTotals) {
                    viewHeaderItems[!options.showTotalsPrior ? "push" : "unshift"]({
                        type: GRAND_TOTAL_TYPE,
                        isEmpty: options.isEmptyGrandTotal
                    })
                }
                var hideTotals = false === options.showTotals || dataFields.length > 0 && dataFields.length === options.hiddenTotals.length;
                var hideData = dataFields.length > 0 && options.hiddenValues.length === dataFields.length;
                if (hideData && hideTotals) {
                    depthSize = 1
                }
                if (!hideTotals || "tree" === options.layout) {
                    addAdditionalTotalHeaderItems(viewHeaderItems, headerDescriptions, options.showTotalsPrior, "tree" === options.layout)
                }(0, _deferred.when)((0, _uiPivot_grid.foreachTreeAsync)(viewHeaderItems, function(items) {
                    var item = items[0];
                    if (!item.children || 0 === item.children.length) {
                        item.depthSize = depthSize - items.length + 1
                    }
                })).done(function() {
                    if (cellDescriptionsCount > 1) {
                        addMetricHeaderItems(viewHeaderItems, cellDescriptions, options)
                    }!options.showEmpty && removeHiddenItems(viewHeaderItems);
                    options.notifyProgress(.75);
                    (0, _deferred.when)((0, _uiPivot_grid.foreachTreeAsync)(viewHeaderItems, function(items) {
                        var item = items[0];
                        var isMetric = item.isMetric;
                        var field = headerDescriptions[items.length - 1] || {};
                        if (item.type === DATA_TYPE && !isMetric) {
                            item.width = field.width
                        }
                        if (true === hideData && item.type === DATA_TYPE) {
                            var parentChildren = (items[1] ? items[1].children : viewHeaderItems) || [];
                            parentChildren.splice((0, _array.inArray)(item, parentChildren), 1);
                            return
                        }
                        if (isMetric) {
                            item.wordWrapEnabled = cellDescriptions[item.dataIndex].wordWrapEnabled
                        } else {
                            item.wordWrapEnabled = field.wordWrapEnabled
                        }
                        item.isLast = !item.children || !item.children.length;
                        if (item.isLast) {
                            (0, _iterator.each)(options.sortBySummaryPaths, function(index, sortBySummaryPath) {
                                if (!(0, _type.isDefined)(item.dataIndex)) {
                                    sortBySummaryPath = sortBySummaryPath.slice(0);
                                    sortBySummaryPath.pop()
                                }
                                if (isItemSorted(items, sortBySummaryPath)) {
                                    item.sorted = true;
                                    return false
                                }
                            })
                        }
                        item.text = getHeaderItemText(item, field, options)
                    })).done(function() {
                        if (!viewHeaderItems.length) {
                            viewHeaderItems.push({})
                        }
                        options.notifyProgress(1);
                        d.resolve(viewHeaderItems)
                    })
                })
            });
            return d
        };

        function createHeaderItem(childrenStack, depth, index) {
            var parent = childrenStack[depth] = childrenStack[depth] || [];
            var node = parent[index] = {};
            if (childrenStack[depth + 1]) {
                node.children = childrenStack[depth + 1];
                for (var i = depth + 1; i < childrenStack.length; i++) {
                    childrenStack[i] = void 0
                }
                childrenStack.length = depth + 1
            }
            return node
        }

        function createViewHeaderItems(headerItems, headerDescriptions) {
            var headerDescriptionsCount = headerDescriptions && headerDescriptions.length || 0;
            var childrenStack = [];
            var d = new _deferred.Deferred;
            var headerItem;
            (0, _deferred.when)((0, _uiPivot_grid.foreachTreeAsync)(headerItems, function(items, index) {
                var item = items[0];
                var path = (0, _uiPivot_grid.createPath)(items);
                headerItem = createHeaderItem(childrenStack, path.length, index);
                headerItem.type = DATA_TYPE;
                headerItem.value = item.value;
                headerItem.path = path;
                headerItem.text = item.text;
                headerItem.index = item.index;
                headerItem.displayText = item.displayText;
                headerItem.key = item.key;
                headerItem.isEmpty = item.isEmpty;
                if (path.length < headerDescriptionsCount && (!item.children || 0 !== item.children.length)) {
                    headerItem.expanded = !!item.children
                }
            })).done(function() {
                d.resolve(createHeaderItem(childrenStack, 0, 0).children || [])
            });
            return d
        }

        function addMetricHeaderItems(headerItems, cellDescriptions, options) {
            (0, _uiPivot_grid.foreachTree)(headerItems, function(items) {
                var item = items[0];
                var i;
                if (!item.children || 0 === item.children.length) {
                    item.children = [];
                    for (i = 0; i < cellDescriptions.length; i++) {
                        var isGrandTotal = item.type === GRAND_TOTAL_TYPE;
                        var isTotal = item.type === TOTAL_TYPE;
                        var isValue = item.type === DATA_TYPE;
                        var columnIsHidden = false === cellDescriptions[i].visible || isGrandTotal && (0, _array.inArray)(i, options.hiddenGrandTotals) !== -1 || isTotal && (0, _array.inArray)(i, options.hiddenTotals) !== -1 || isValue && (0, _array.inArray)(i, options.hiddenValues) !== -1;
                        if (columnIsHidden) {
                            continue
                        }
                        item.children.push({
                            caption: cellDescriptions[i].caption,
                            path: item.path,
                            type: item.type,
                            value: i,
                            index: item.index,
                            dataIndex: i,
                            isMetric: true,
                            isEmpty: item.isEmpty && item.isEmpty[i]
                        })
                    }
                }
            })
        }

        function addAdditionalTotalHeaderItems(headerItems, headerDescriptions, showTotalsPrior, isTree) {
            showTotalsPrior = showTotalsPrior || isTree;
            (0, _uiPivot_grid.foreachTree)(headerItems, function(items, index) {
                var item = items[0];
                var parentChildren = (items[1] ? items[1].children : headerItems) || [];
                var dataField = headerDescriptions[items.length - 1];
                if (item.type === DATA_TYPE && item.expanded && (false !== dataField.showTotals || isTree)) {
                    index !== -1 && parentChildren.splice(showTotalsPrior ? index : index + 1, 0, (0, _extend2.extend)({}, item, {
                        children: null,
                        type: TOTAL_TYPE,
                        expanded: showTotalsPrior ? true : null,
                        isAdditionalTotal: true
                    }));
                    if (showTotalsPrior) {
                        item.expanded = null
                    }
                }
            })
        }
        var removeEmptyParent = function removeEmptyParent(items, index) {
            var parent = items[index + 1];
            if (!items[index].children.length && parent && parent.children) {
                parent.children.splice((0, _array.inArray)(items[index], parent.children), 1);
                removeEmptyParent(items, index + 1)
            }
        };

        function removeHiddenItems(headerItems) {
            (0, _uiPivot_grid.foreachTree)([{
                children: headerItems
            }], function(items, index) {
                var item = items[0];
                var parentChildren = (items[1] ? items[1].children : headerItems) || [];
                var isEmpty = item.isEmpty;
                if (isEmpty && isEmpty.length) {
                    isEmpty = item.isEmpty.filter(function(isEmpty) {
                        return isEmpty
                    }).length === isEmpty.length
                }
                if (item && !item.children && isEmpty) {
                    parentChildren.splice(index, 1);
                    removeEmptyParent(items, 1)
                }
            })
        }
        var fillHeaderInfo = function(info, viewHeaderItems, depthSize, isHorizontal, isTree) {
            var lastIndex = 0;
            var index;
            var depth;
            var indexesByDepth = [0];
            (0, _uiPivot_grid.foreachTree)(viewHeaderItems, function(items) {
                var headerItem = items[0];
                depth = headerItem.isMetric ? depthSize : items.length - 1;
                while (indexesByDepth.length - 1 < depth) {
                    indexesByDepth.push(indexesByDepth[indexesByDepth.length - 1])
                }
                index = indexesByDepth[depth] || 0;
                lastIndex = addInfoItem(info, {
                    headerItem: headerItem,
                    index: index,
                    lastIndex: lastIndex,
                    depth: depth,
                    isHorizontal: isHorizontal,
                    isTree: isTree
                });
                indexesByDepth.length = depth;
                indexesByDepth.push(lastIndex)
            })
        };
        return function(headerItems, headerDescriptions, cellDescriptions, isHorizontal, options) {
            var info = [];
            var depthSize = getHeaderItemsDepth(headerItems) || 1;
            var d = new _deferred.Deferred;
            getViewHeaderItems(headerItems, headerDescriptions, cellDescriptions, depthSize, options).done(function(viewHeaderItems) {
                fillHeaderInfo(info, viewHeaderItems, depthSize, isHorizontal, "tree" === options.layout);
                options.notifyProgress(1);
                d.resolve(info)
            });
            return d
        }
    }();

    function createSortPaths(headerFields, dataFields) {
        var sortBySummaryPaths = [];
        (0, _iterator.each)(headerFields, function(index, headerField) {
            var fieldIndex = (0, _uiPivot_grid.findField)(dataFields, headerField.sortBySummaryField);
            if (fieldIndex >= 0) {
                sortBySummaryPaths.push((headerField.sortBySummaryPath || []).concat([fieldIndex]))
            }
        });
        return sortBySummaryPaths
    }

    function foreachRowInfo(rowsInfo, callback) {
        var columnOffset = 0;
        var columnOffsetResetIndexes = [];
        for (var i = 0; i < rowsInfo.length; i++) {
            for (var j = 0; j < rowsInfo[i].length; j++) {
                var rowSpanOffset = (rowsInfo[i][j].rowspan || 1) - 1;
                var visibleIndex = i + rowSpanOffset;
                if (columnOffsetResetIndexes[i]) {
                    columnOffset -= columnOffsetResetIndexes[i];
                    columnOffsetResetIndexes[i] = 0
                }
                if (false === callback(rowsInfo[i][j], visibleIndex, i, j, columnOffset)) {
                    break
                }
                columnOffsetResetIndexes[i + (rowsInfo[i][j].rowspan || 1)] = (columnOffsetResetIndexes[i + (rowsInfo[i][j].rowspan || 1)] || 0) + 1;
                columnOffset++
            }
        }
    }

    function createCellsInfo(rowsInfo, columnsInfo, data, dataFields, dataFieldArea, errorText) {
        var info = [];
        var dataFieldAreaInRows = "row" === dataFieldArea;
        var dataSourceCells = data.values;
        dataSourceCells.length && foreachRowInfo(rowsInfo, function(rowInfo, rowIndex) {
            var row = info[rowIndex] = [];
            var dataRow = dataSourceCells[rowInfo.dataSourceIndex >= 0 ? rowInfo.dataSourceIndex : data.grandTotalRowIndex] || [];
            rowInfo.isLast && (0, _uiGrid_core2.foreachColumnInfo)(columnsInfo, function(columnInfo, columnIndex) {
                var dataIndex = (dataFieldAreaInRows ? rowInfo.dataIndex : columnInfo.dataIndex) || 0;
                var dataField = dataFields[dataIndex];
                if (columnInfo.isLast && dataField) {
                    var cell = dataRow[columnInfo.dataSourceIndex >= 0 ? columnInfo.dataSourceIndex : data.grandTotalColumnIndex];
                    if (!Array.isArray(cell)) {
                        cell = [cell]
                    }
                    var cellValue = cell[dataIndex];
                    row[columnIndex] = {
                        text: formatCellValue(cellValue, dataField, errorText),
                        value: cellValue,
                        format: dataField.format,
                        dataType: dataField.dataType,
                        columnType: columnInfo.type,
                        rowType: rowInfo.type,
                        rowPath: rowInfo.path || [],
                        columnPath: columnInfo.path || [],
                        dataIndex: dataIndex
                    };
                    if (dataField.width) {
                        row[columnIndex].width = dataField.width
                    }
                }
            })
        });
        return info
    }

    function getHeaderIndexedItems(headerItems, options) {
        var visibleIndex = 0;
        var indexedItems = [];
        (0, _uiPivot_grid.foreachTree)(headerItems, function(items) {
            var headerItem = items[0];
            var path = (0, _uiPivot_grid.createPath)(items);
            if (headerItem.children && false === options.showTotals) {
                return
            }
            var indexedItem = (0, _extend2.extend)(true, {}, headerItem, {
                visibleIndex: visibleIndex++,
                path: path
            });
            if ((0, _type.isDefined)(indexedItem.index)) {
                indexedItems[indexedItem.index] = indexedItem
            } else {
                indexedItems.push(indexedItem)
            }
        });
        return indexedItems
    }

    function createScrollController(dataController, component, dataAdapter) {
        if (component && "virtual" === component.option("scrolling.mode")) {
            return new _uiGrid_core.VirtualScrollController(component, (0, _extend2.extend)({
                hasKnownLastPage: function() {
                    return true
                },
                pageCount: function() {
                    return math.ceil(this.totalItemsCount() / this.pageSize())
                },
                updateLoading: function() {},
                itemsCount: function() {
                    if (this.pageIndex() < this.pageCount() - 1) {
                        return this.pageSize()
                    } else {
                        return this.totalItemsCount() % this.pageSize()
                    }
                },
                items: function() {
                    return []
                },
                viewportItems: function() {
                    return []
                },
                onChanged: function() {},
                isLoading: function() {
                    return dataController.isLoading()
                },
                changingDuration: function() {
                    var dataSource = dataController._dataSource;
                    if (dataSource.paginate()) {
                        return CHANGING_DURATION_IF_PAGINATE
                    }
                    return dataController._changingDuration || 0
                }
            }, dataAdapter))
        }
    }

    function getHiddenTotals(dataFields) {
        var result = [];
        (0, _iterator.each)(dataFields, function(index, field) {
            if (false === field.showTotals) {
                result.push(index)
            }
        });
        return result
    }

    function getHiddenValues(dataFields) {
        var result = [];
        dataFields.forEach(function(field, index) {
            if (void 0 === field.showValues && false === field.showTotals || false === field.showValues) {
                result.push(index)
            }
        });
        return result
    }

    function getHiddenGrandTotalsTotals(dataFields, columnFields) {
        var result = [];
        (0, _iterator.each)(dataFields, function(index, field) {
            if (false === field.showGrandTotals) {
                result.push(index)
            }
        });
        if (0 === columnFields.length && result.length === dataFields.length) {
            result = []
        }
        return result
    }
    var members = {
        ctor: function(options) {
            var that = this;
            var virtualScrollControllerChanged = that._fireChanged.bind(that);
            options = that._options = options || {};
            that.dataSourceChanged = (0, _callbacks.default)();
            that._dataSource = that._createDataSource(options);
            that._rowsScrollController = createScrollController(that, options.component, {
                totalItemsCount: function() {
                    return that.totalRowCount()
                },
                pageIndex: function(index) {
                    return that.rowPageIndex(index)
                },
                pageSize: function() {
                    return that.rowPageSize()
                },
                load: function() {
                    if (that._rowsScrollController.pageIndex() >= this.pageCount()) {
                        that._rowsScrollController.pageIndex(this.pageCount() - 1)
                    }
                    return that._rowsScrollController.handleDataChanged(function() {
                        if (that._dataSource.paginate()) {
                            that._dataSource.load()
                        } else {
                            virtualScrollControllerChanged.apply(this, arguments)
                        }
                    })
                }
            });
            that._columnsScrollController = createScrollController(that, options.component, {
                totalItemsCount: function() {
                    return that.totalColumnCount()
                },
                pageIndex: function(index) {
                    return that.columnPageIndex(index)
                },
                pageSize: function() {
                    return that.columnPageSize()
                },
                load: function() {
                    if (that._columnsScrollController.pageIndex() >= this.pageCount()) {
                        that._columnsScrollController.pageIndex(this.pageCount() - 1)
                    }
                    return that._columnsScrollController.handleDataChanged(function() {
                        if (that._dataSource.paginate()) {
                            that._dataSource.load()
                        } else {
                            virtualScrollControllerChanged.apply(this, arguments)
                        }
                    })
                }
            });
            that._stateStoringController = new _uiGrid_core3.StateStoringController(options.component).init();
            that._columnsInfo = [];
            that._rowsInfo = [];
            that._cellsInfo = [];
            that.expandValueChanging = (0, _callbacks.default)();
            that.loadingChanged = (0, _callbacks.default)();
            that.progressChanged = (0, _callbacks.default)();
            that.scrollChanged = (0, _callbacks.default)();
            that.load();
            that._update();
            that.changed = (0, _callbacks.default)()
        },
        _fireChanged: function() {
            var that = this;
            var startChanging = new Date;
            that.changed && !that._lockChanged && that.changed.fire();
            that._changingDuration = new Date - startChanging
        },
        _correctSkipsTakes: function(rowIndex, rowSkip, rowSpan, levels, skips, takes) {
            var endIndex = rowSpan ? rowIndex + rowSpan - 1 : rowIndex;
            skips[levels.length] = skips[levels.length] || 0;
            takes[levels.length] = takes[levels.length] || 0;
            if (endIndex < rowSkip) {
                skips[levels.length]++
            } else {
                takes[levels.length]++
            }
        },
        _calculatePagingForRowExpandedPaths: function(options, skips, takes, rowExpandedSkips, rowExpandedTakes) {
            var rows = this._rowsInfo;
            var rowCount = Math.min(options.rowSkip + options.rowTake, rows.length);
            var rowExpandedPaths = options.rowExpandedPaths;
            var levels = [];
            var expandedPathIndexes = {};
            var i;
            var j;
            var path;
            rowExpandedPaths.forEach(function(path, index) {
                expandedPathIndexes[path] = index
            });
            for (i = 0; i < rowCount; i++) {
                takes.length = skips.length = levels.length + 1;
                for (j = 0; j < rows[i].length; j++) {
                    var cell = rows[i][j];
                    if ("D" === cell.type) {
                        this._correctSkipsTakes(i, options.rowSkip, cell.rowspan, levels, skips, takes);
                        path = cell.path || path;
                        var expandIndex = path && path.length > 1 ? expandedPathIndexes[path.slice(0, -1)] : -1;
                        if (expandIndex >= 0) {
                            rowExpandedSkips[expandIndex] = skips[levels.length] || 0;
                            rowExpandedTakes[expandIndex] = takes[levels.length] || 0
                        }
                        if (cell.rowspan) {
                            levels.push(cell.rowspan)
                        }
                    }
                }
                levels = levels.map(function(level) {
                    return level - 1
                }).filter(function(level) {
                    return level > 0
                })
            }
        },
        _calculatePagingForColumnExpandedPaths: function(options, skips, takes, expandedSkips, expandedTakes) {
            var skipByPath = {};
            var takeByPath = {};
            (0, _uiGrid_core2.foreachColumnInfo)(this._columnsInfo, function(columnInfo, columnIndex) {
                if ("D" === columnInfo.type && columnInfo.path && void 0 === columnInfo.dataIndex) {
                    var colspan = columnInfo.colspan || 1;
                    var path = columnInfo.path.slice(0, -1).toString();
                    skipByPath[path] = skipByPath[path] || 0;
                    takeByPath[path] = takeByPath[path] || 0;
                    if (columnIndex + colspan <= options.columnSkip) {
                        skipByPath[path]++
                    } else {
                        if (columnIndex < options.columnSkip + options.columnTake) {
                            takeByPath[path]++
                        }
                    }
                }
            });
            skips[0] = skipByPath[[]];
            takes[0] = takeByPath[[]];
            options.columnExpandedPaths.forEach(function(path, index) {
                var skip = skipByPath[path];
                var take = takeByPath[path];
                if (void 0 !== skip) {
                    expandedSkips[index] = skip
                }
                if (void 0 !== take) {
                    expandedTakes[index] = take
                }
            })
        },
        _processPagingForExpandedPaths: function(options, area, storeLoadOptions, reload) {
            var expandedPaths = options[area + "ExpandedPaths"];
            var expandedSkips = expandedPaths.map(function() {
                return 0
            });
            var expandedTakes = expandedPaths.map(function() {
                return reload ? options.pageSize : 0
            });
            var skips = [];
            var takes = [];
            if (!reload) {
                if ("row" === area) {
                    this._calculatePagingForRowExpandedPaths(options, skips, takes, expandedSkips, expandedTakes)
                } else {
                    this._calculatePagingForColumnExpandedPaths(options, skips, takes, expandedSkips, expandedTakes)
                }
            }
            this._savePagingForExpandedPaths(options, area, storeLoadOptions, skips[0], takes[0], expandedSkips, expandedTakes)
        },
        _savePagingForExpandedPaths: function(options, area, storeLoadOptions, skip, take, expandedSkips, expandedTakes) {
            var expandedPaths = options[area + "ExpandedPaths"];
            options[area + "ExpandedPaths"] = [];
            options[area + "Skip"] = void 0 !== skip ? skip : options[area + "Skip"];
            options[area + "Take"] = void 0 !== take ? take : options[area + "Take"];
            for (var i = 0; i < expandedPaths.length; i++) {
                if (expandedTakes[i]) {
                    var _extend;
                    var isOppositeArea = options.area && options.area !== area;
                    storeLoadOptions.push((0, _extend2.extend)({
                        area: area,
                        headerName: area + "s"
                    }, options, (_extend = {}, _defineProperty(_extend, area + "Skip", expandedSkips[i]), _defineProperty(_extend, area + "Take", expandedTakes[i]), _defineProperty(_extend, isOppositeArea ? "oppositePath" : "path", expandedPaths[i]), _extend)))
                }
            }
        },
        _handleCustomizeStoreLoadOptions: function(storeLoadOptions, reload) {
            var _this = this;
            var options = storeLoadOptions[0];
            var rowsScrollController = this._rowsScrollController;
            if (this._dataSource.paginate() && rowsScrollController) {
                var rowPageSize = rowsScrollController._dataSource.pageSize();
                if ("rows" === options.headerName) {
                    options.rowSkip = 0;
                    options.rowTake = rowPageSize;
                    options.rowExpandedPaths = []
                } else {
                    options.rowSkip = rowsScrollController.beginPageIndex() * rowPageSize;
                    options.rowTake = (rowsScrollController.endPageIndex() - rowsScrollController.beginPageIndex() + 1) * rowPageSize;
                    this._processPagingForExpandedPaths(options, "row", storeLoadOptions, reload)
                }
            }
            var columnsScrollController = this._columnsScrollController;
            if (this._dataSource.paginate() && columnsScrollController) {
                var columnPageSize = columnsScrollController._dataSource.pageSize();
                storeLoadOptions.forEach(function(options, index) {
                    if ("columns" === options.headerName) {
                        options.columnSkip = 0;
                        options.columnTake = columnPageSize;
                        options.columnExpandedPaths = []
                    } else {
                        options.columnSkip = columnsScrollController.beginPageIndex() * columnPageSize;
                        options.columnTake = (columnsScrollController.endPageIndex() - columnsScrollController.beginPageIndex() + 1) * columnPageSize;
                        _this._processPagingForExpandedPaths(options, "column", storeLoadOptions, reload)
                    }
                })
            }
        },
        load: function() {
            var that = this;
            var stateStoringController = this._stateStoringController;
            if (stateStoringController.isEnabled() && !stateStoringController.isLoaded()) {
                stateStoringController.load().always(function(state) {
                    if (state) {
                        that._dataSource.state(state)
                    } else {
                        that._dataSource.load()
                    }
                })
            } else {
                that._dataSource.load()
            }
        },
        calculateVirtualContentParams: function(contentParams) {
            var that = this;
            var rowsScrollController = that._rowsScrollController;
            var columnsScrollController = that._columnsScrollController;
            if (rowsScrollController && columnsScrollController) {
                rowsScrollController.viewportItemSize(contentParams.virtualRowHeight);
                rowsScrollController.viewportSize(contentParams.viewportHeight / rowsScrollController.viewportItemSize());
                rowsScrollController.setContentSize(contentParams.itemHeights);
                columnsScrollController.viewportItemSize(contentParams.virtualColumnWidth);
                columnsScrollController.viewportSize(contentParams.viewportWidth / columnsScrollController.viewportItemSize());
                columnsScrollController.setContentSize(contentParams.itemWidths);
                (0, _common.deferUpdate)(function() {
                    columnsScrollController.loadIfNeed();
                    rowsScrollController.loadIfNeed()
                });
                that.scrollChanged.fire({
                    left: columnsScrollController.getViewportPosition(),
                    top: rowsScrollController.getViewportPosition()
                });
                return {
                    contentTop: rowsScrollController.getContentOffset(),
                    contentLeft: columnsScrollController.getContentOffset(),
                    width: columnsScrollController.getVirtualContentSize(),
                    height: rowsScrollController.getVirtualContentSize()
                }
            }
        },
        setViewportPosition: function(left, top) {
            this._rowsScrollController.setViewportPosition(top || 0);
            this._columnsScrollController.setViewportPosition(left || 0)
        },
        subscribeToWindowScrollEvents: function($element) {
            this._rowsScrollController && this._rowsScrollController.subscribeToWindowScrollEvents($element)
        },
        updateWindowScrollPosition: function(position) {
            this._rowsScrollController && this._rowsScrollController.scrollTo(position)
        },
        updateViewOptions: function(options) {
            (0, _extend2.extend)(this._options, options);
            this._update()
        },
        _handleExpandValueChanging: function(e) {
            this.expandValueChanging.fire(e)
        },
        _handleLoadingChanged: function(isLoading) {
            this.loadingChanged.fire(isLoading)
        },
        _handleProgressChanged: function(progress) {
            this.progressChanged.fire(progress)
        },
        _handleFieldsPrepared: function(e) {
            this._options.onFieldsPrepared && this._options.onFieldsPrepared(e)
        },
        _createDataSource: function(options) {
            var that = this;
            var dataSourceOptions = options.dataSource;
            var dataSource;
            that._isSharedDataSource = dataSourceOptions instanceof _data_source.default;
            if (that._isSharedDataSource) {
                dataSource = dataSourceOptions
            } else {
                dataSource = new _data_source.default(dataSourceOptions)
            }
            that._expandValueChangingHandler = that._handleExpandValueChanging.bind(that);
            that._loadingChangedHandler = that._handleLoadingChanged.bind(that);
            that._fieldsPreparedHandler = that._handleFieldsPrepared.bind(that);
            that._customizeStoreLoadOptionsHandler = that._handleCustomizeStoreLoadOptions.bind(that);
            that._changedHandler = function() {
                that._update();
                that.dataSourceChanged.fire()
            };
            that._progressChangedHandler = function(progress) {
                that._handleProgressChanged(.8 * progress)
            };
            dataSource.on("changed", that._changedHandler);
            dataSource.on("expandValueChanging", that._expandValueChangingHandler);
            dataSource.on("loadingChanged", that._loadingChangedHandler);
            dataSource.on("progressChanged", that._progressChangedHandler);
            dataSource.on("fieldsPrepared", that._fieldsPreparedHandler);
            dataSource.on("customizeStoreLoadOptions", that._customizeStoreLoadOptionsHandler);
            return dataSource
        },
        getDataSource: function() {
            return this._dataSource
        },
        isLoading: function() {
            return this._dataSource.isLoading()
        },
        beginLoading: function() {
            this._dataSource.beginLoading()
        },
        endLoading: function() {
            this._dataSource.endLoading()
        },
        _update: function() {
            var that = this;
            var dataSource = that._dataSource;
            var options = that._options;
            var columnFields = dataSource.getAreaFields("column");
            var rowFields = dataSource.getAreaFields("row");
            var dataFields = dataSource.getAreaFields("data");
            var dataFieldsForRows = "row" === options.dataFieldArea ? dataFields : [];
            var dataFieldsForColumns = "row" !== options.dataFieldArea ? dataFields : [];
            var data = dataSource.getData();
            var hiddenTotals = getHiddenTotals(dataFields);
            var hiddenValues = getHiddenValues(dataFields);
            var hiddenGrandTotals = getHiddenGrandTotalsTotals(dataFields, columnFields);
            var grandTotalsAreHiddenForNotAllDataFields = dataFields.length > 0 ? hiddenGrandTotals.length !== dataFields.length : true;
            var rowOptions = {
                isEmptyGrandTotal: data.isEmptyGrandTotalRow,
                texts: options.texts || {},
                hiddenTotals: hiddenTotals,
                hiddenValues: hiddenValues,
                hiddenGrandTotals: [],
                showTotals: options.showRowTotals,
                showGrandTotals: false !== options.showRowGrandTotals && grandTotalsAreHiddenForNotAllDataFields,
                sortBySummaryPaths: createSortPaths(columnFields, dataFields),
                showTotalsPrior: "rows" === options.showTotalsPrior || "both" === options.showTotalsPrior,
                showEmpty: !options.hideEmptySummaryCells,
                layout: options.rowHeaderLayout,
                fields: rowFields,
                dataFields: dataFields,
                progress: 0
            };
            var columnOptions = {
                isEmptyGrandTotal: data.isEmptyGrandTotalColumn,
                texts: options.texts || {},
                hiddenTotals: hiddenTotals,
                hiddenValues: hiddenValues,
                hiddenGrandTotals: hiddenGrandTotals,
                showTotals: options.showColumnTotals,
                showTotalsPrior: "columns" === options.showTotalsPrior || "both" === options.showTotalsPrior,
                showGrandTotals: false !== options.showColumnGrandTotals && grandTotalsAreHiddenForNotAllDataFields,
                sortBySummaryPaths: createSortPaths(rowFields, dataFields),
                showEmpty: !options.hideEmptySummaryCells,
                fields: columnFields,
                dataFields: dataFields,
                progress: 0
            };
            var notifyProgress = function(progress) {
                this.progress = progress;
                that._handleProgressChanged(.8 + .1 * rowOptions.progress + .1 * columnOptions.progress)
            };
            rowOptions.notifyProgress = notifyProgress;
            columnOptions.notifyProgress = notifyProgress;
            if (!(0, _type.isDefined)(data.grandTotalRowIndex)) {
                data.grandTotalRowIndex = getHeaderIndexedItems(data.rows, rowOptions).length
            }
            if (!(0, _type.isDefined)(data.grandTotalColumnIndex)) {
                data.grandTotalColumnIndex = getHeaderIndexedItems(data.columns, columnOptions).length
            }
            dataSource._changeLoadingCount(1);
            (0, _deferred.when)(createHeaderInfo(data.columns, columnFields, dataFieldsForColumns, true, columnOptions), createHeaderInfo(data.rows, rowFields, dataFieldsForRows, false, rowOptions)).always(function() {
                dataSource._changeLoadingCount(-1)
            }).done(function(columnsInfo, rowsInfo) {
                that._columnsInfo = columnsInfo;
                that._rowsInfo = rowsInfo;
                if (that._rowsScrollController && that._columnsScrollController && that.changed && !that._dataSource.paginate()) {
                    that._rowsScrollController.reset();
                    that._columnsScrollController.reset();
                    that._lockChanged = true;
                    that._rowsScrollController.load();
                    that._columnsScrollController.load();
                    that._lockChanged = false
                }
            }).done(function() {
                that._fireChanged();
                if (that._stateStoringController.isEnabled() && !that._dataSource.isLoading()) {
                    that._stateStoringController.state(that._dataSource.state());
                    that._stateStoringController.save()
                }
            })
        },
        getRowsInfo: function(getAllData) {
            var that = this;
            var rowsInfo = that._rowsInfo;
            var scrollController = that._rowsScrollController;
            var rowspan;
            var i;
            if (scrollController && !getAllData) {
                var startIndex = scrollController.beginPageIndex() * that.rowPageSize();
                var endIndex = scrollController.endPageIndex() * that.rowPageSize() + that.rowPageSize();
                var newRowsInfo = [];
                var maxDepth = 1;
                foreachRowInfo(rowsInfo, function(rowInfo, visibleIndex, rowIndex, _, columnIndex) {
                    var isVisible = visibleIndex >= startIndex && rowIndex < endIndex;
                    var index = rowIndex < startIndex ? 0 : rowIndex - startIndex;
                    var cell = rowInfo;
                    if (isVisible) {
                        newRowsInfo[index] = newRowsInfo[index] || [];
                        rowspan = rowIndex < startIndex ? rowInfo.rowspan - (startIndex - rowIndex) || 1 : rowInfo.rowspan;
                        if (startIndex + index + rowspan > endIndex) {
                            rowspan = endIndex - (index + startIndex) || 1
                        }
                        if (rowspan !== rowInfo.rowspan) {
                            cell = (0, _extend2.extend)({}, cell, {
                                rowspan: rowspan
                            })
                        }
                        newRowsInfo[index].push(cell);
                        maxDepth = math.max(maxDepth, columnIndex + 1)
                    } else {
                        if (i > endIndex) {
                            return false
                        }
                    }
                });
                foreachRowInfo(newRowsInfo, function(rowInfo, visibleIndex, rowIndex, columnIndex, realColumnIndex) {
                    var colspan = rowInfo.colspan || 1;
                    if (realColumnIndex + colspan > maxDepth) {
                        newRowsInfo[rowIndex][columnIndex] = (0, _extend2.extend)({}, rowInfo, {
                            colspan: maxDepth - realColumnIndex || 1
                        })
                    }
                });
                return newRowsInfo
            }
            return rowsInfo
        },
        getColumnsInfo: function(getAllData) {
            var that = this;
            var info = that._columnsInfo;
            var scrollController = that._columnsScrollController;
            if (scrollController && !getAllData) {
                var startIndex = scrollController.beginPageIndex() * that.columnPageSize();
                var endIndex = scrollController.endPageIndex() * that.columnPageSize() + that.columnPageSize();
                info = (0, _uiGrid_core2.createColumnsInfo)(info, startIndex, endIndex)
            }
            return info
        },
        totalRowCount: function() {
            return this._rowsInfo.length
        },
        rowPageIndex: function(index) {
            if (void 0 !== index) {
                this._rowPageIndex = index
            }
            return this._rowPageIndex || 0
        },
        totalColumnCount: function() {
            var count = 0;
            if (this._columnsInfo && this._columnsInfo.length) {
                for (var i = 0; i < this._columnsInfo[0].length; i++) {
                    count += this._columnsInfo[0][i].colspan || 1
                }
            }
            return count
        },
        rowPageSize: function(size) {
            if (void 0 !== size) {
                this._rowPageSize = size
            }
            return this._rowPageSize || 20
        },
        columnPageSize: function(size) {
            if (void 0 !== size) {
                this._columnPageSize = size
            }
            return this._columnPageSize || 20
        },
        columnPageIndex: function(index) {
            if (void 0 !== index) {
                this._columnPageIndex = index
            }
            return this._columnPageIndex || 0
        },
        getCellsInfo: function(getAllData) {
            var rowsInfo = this.getRowsInfo(getAllData);
            var columnsInfo = this.getColumnsInfo(getAllData);
            var data = this._dataSource.getData();
            var texts = this._options.texts || {};
            return createCellsInfo(rowsInfo, columnsInfo, data, this._dataSource.getAreaFields("data"), this._options.dataFieldArea, texts.dataNotAvailable)
        },
        dispose: function() {
            var that = this;
            if (that._isSharedDataSource) {
                that._dataSource.off("changed", that._changedHandler);
                that._dataSource.off("expandValueChanging", that._expandValueChangingHandler);
                that._dataSource.off("loadingChanged", that._loadingChangedHandler);
                that._dataSource.off("progressChanged", that._progressChangedHandler);
                that._dataSource.off("fieldsPrepared", that._fieldsPreparedHandler);
                that._dataSource.off("customizeStoreLoadOptions", that._customizeStoreLoadOptionsHandler)
            } else {
                that._dataSource.dispose()
            }
            that._columnsScrollController && that._columnsScrollController.dispose();
            that._rowsScrollController && that._rowsScrollController.dispose();
            that._stateStoringController.dispose();
            that.expandValueChanging.empty();
            that.changed.empty();
            that.loadingChanged.empty();
            that.progressChanged.empty();
            that.scrollChanged.empty();
            that.dataSourceChanged.empty()
        }
    };
    proxyMethod(members, "applyPartialDataSource");
    proxyMethod(members, "collapseHeaderItem");
    proxyMethod(members, "expandHeaderItem");
    proxyMethod(members, "getData");
    proxyMethod(members, "isEmpty");
    return members
}());
exports.DataController = DataController;
