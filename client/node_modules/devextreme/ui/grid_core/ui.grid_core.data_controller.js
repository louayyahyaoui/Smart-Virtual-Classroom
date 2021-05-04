/**
 * DevExtreme (ui/grid_core/ui.grid_core.data_controller.js)
 * Version: 20.2.6
 * Build date: Tue Mar 16 2021
 *
 * Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
exports.default = void 0;
var _renderer = _interopRequireDefault(require("../../core/renderer"));
var _uiGrid_core = _interopRequireDefault(require("./ui.grid_core.modules"));
var _uiGrid_core2 = _interopRequireDefault(require("./ui.grid_core.utils"));
var _array_store = _interopRequireDefault(require("../../data/array_store"));
var _custom_store = _interopRequireDefault(require("../../data/custom_store"));
var _ui = _interopRequireDefault(require("../widget/ui.errors"));
var _common = require("../../core/utils/common");
var _iterator = require("../../core/utils/iterator");
var _type = require("../../core/utils/type");
var _extend = require("../../core/utils/extend");
var _data_helper = _interopRequireDefault(require("../../data_helper"));
var _deferred = require("../../core/utils/deferred");
var _array_compare = require("../../core/utils/array_compare");

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        "default": obj
    }
}
var _default = {
    defaultOptions: function() {
        return {
            loadingTimeout: 0,
            dataSource: null,
            cacheEnabled: true,
            repaintChangesOnly: false,
            highlightChanges: false,
            onDataErrorOccurred: null,
            remoteOperations: "auto",
            paging: {
                enabled: true,
                pageSize: void 0,
                pageIndex: void 0
            }
        }
    },
    controllers: {
        data: _uiGrid_core.default.Controller.inherit({}).include(_data_helper.default).inherit(function() {
            var changePaging = function(that, optionName, value) {
                var dataSource = that._dataSource;
                if (dataSource) {
                    if (void 0 !== value) {
                        if (dataSource[optionName]() !== value) {
                            if ("pageSize" === optionName) {
                                dataSource.pageIndex(0)
                            }
                            dataSource[optionName](value);
                            that._skipProcessingPagingChange = true;
                            that.option("paging." + optionName, value);
                            that._skipProcessingPagingChange = false;
                            return dataSource["pageIndex" === optionName ? "load" : "reload"]().done(that.pageChanged.fire.bind(that.pageChanged))
                        }
                        return (0, _deferred.Deferred)().resolve().promise()
                    }
                    return dataSource[optionName]()
                }
                return 0
            };
            var members = {
                init: function() {
                    var _this = this;
                    var that = this;
                    that._items = [];
                    that._columnsController = that.getController("columns");
                    that._currentOperationTypes = null;
                    that._dataChangedHandler = function(e) {
                        that._currentOperationTypes = _this._dataSource.operationTypes();
                        that._handleDataChanged(e);
                        that._currentOperationTypes = null
                    };
                    that._columnsChangedHandler = that._handleColumnsChanged.bind(that);
                    that._loadingChangedHandler = that._handleLoadingChanged.bind(that);
                    that._loadErrorHandler = that._handleLoadError.bind(that);
                    that._customizeStoreLoadOptionsHandler = that._handleCustomizeStoreLoadOptions.bind(that);
                    that._changingHandler = that._handleChanging.bind(that);
                    that._columnsController.columnsChanged.add(that._columnsChangedHandler);
                    that._isLoading = false;
                    that._isCustomLoading = false;
                    that._repaintChangesOnly = void 0;
                    that._changes = [];
                    that.createAction("onDataErrorOccurred");
                    that.dataErrorOccurred.add(function(error) {
                        return that.executeAction("onDataErrorOccurred", {
                            error: error
                        })
                    });
                    that._refreshDataSource()
                },
                callbackNames: function() {
                    return ["changed", "loadingChanged", "dataErrorOccurred", "pageChanged", "dataSourceChanged"]
                },
                callbackFlags: function(name) {
                    if ("dataErrorOccurred" === name) {
                        return {
                            stopOnFalse: true
                        }
                    }
                },
                publicMethods: function() {
                    return ["beginCustomLoading", "endCustomLoading", "refresh", "filter", "clearFilter", "getCombinedFilter", "keyOf", "byKey", "getDataByKeys", "pageIndex", "pageSize", "pageCount", "totalCount", "_disposeDataSource", "getKeyByRowIndex", "getRowIndexByKey", "getDataSource", "getVisibleRows", "repaintRows"]
                },
                reset: function() {
                    this._columnsController.reset();
                    this._items = [];
                    this._refreshDataSource()
                },
                optionChanged: function(args) {
                    var that = this;
                    var dataSource;

                    function handled() {
                        args.handled = true
                    }
                    if ("dataSource" === args.name && args.name === args.fullName && (args.value === args.previousValue || that.option("columns") && Array.isArray(args.value) && Array.isArray(args.previousValue))) {
                        if (args.value !== args.previousValue) {
                            var store = that.store();
                            if (store) {
                                store._array = args.value
                            }
                        }
                        handled();
                        that.refresh(that.option("repaintChangesOnly"));
                        return
                    }
                    switch (args.name) {
                        case "cacheEnabled":
                        case "repaintChangesOnly":
                        case "highlightChanges":
                        case "loadingTimeout":
                            handled();
                            break;
                        case "remoteOperations":
                        case "keyExpr":
                        case "dataSource":
                        case "scrolling":
                            handled();
                            that.reset();
                            break;
                        case "paging":
                            dataSource = that.dataSource();
                            if (dataSource && that._setPagingOptions(dataSource)) {
                                dataSource.load().done(that.pageChanged.fire.bind(that.pageChanged))
                            }
                            handled();
                            break;
                        case "rtlEnabled":
                            that.reset();
                            break;
                        case "columns":
                            dataSource = that.dataSource();
                            if (dataSource && dataSource.isLoading() && args.name === args.fullName) {
                                this._useSortingGroupingFromColumns = true;
                                dataSource.load()
                            }
                            break;
                        default:
                            that.callBase(args)
                    }
                },
                isReady: function() {
                    return !this._isLoading
                },
                getDataSource: function() {
                    return this._dataSource && this._dataSource._dataSource
                },
                getCombinedFilter: function(returnDataField) {
                    return this.combinedFilter(void 0, returnDataField)
                },
                combinedFilter: function(filter, returnDataField) {
                    var that = this;
                    var dataSource = that._dataSource;
                    var columnsController = that._columnsController;
                    if (dataSource) {
                        if (void 0 === filter) {
                            filter = dataSource.filter()
                        }
                        var additionalFilter = that._calculateAdditionalFilter();
                        if (additionalFilter) {
                            if (columnsController.isDataSourceApplied() || columnsController.isAllDataTypesDefined()) {
                                filter = _uiGrid_core2.default.combineFilters([additionalFilter, filter])
                            }
                        }
                        filter = columnsController.updateFilter(filter, returnDataField || dataSource.remoteOperations().filtering)
                    }
                    return filter
                },
                waitReady: function() {
                    if (this._updateLockCount) {
                        this._readyDeferred = new _deferred.Deferred;
                        return this._readyDeferred
                    }
                    return (0, _deferred.when)()
                },
                _endUpdateCore: function() {
                    var changes = this._changes;
                    if (changes.length) {
                        this._changes = [];
                        var repaintChangesOnly = changes.every(function(change) {
                            return change.repaintChangesOnly
                        });
                        this.updateItems(1 === changes.length ? changes[0] : {
                            repaintChangesOnly: repaintChangesOnly
                        })
                    }
                    if (this._readyDeferred) {
                        this._readyDeferred.resolve();
                        this._readyDeferred = null
                    }
                },
                _handleCustomizeStoreLoadOptions: function(e) {
                    var columnsController = this._columnsController;
                    var dataSource = this._dataSource;
                    var storeLoadOptions = e.storeLoadOptions;
                    if (e.isCustomLoading && !storeLoadOptions.isLoadingAll) {
                        return
                    }
                    storeLoadOptions.filter = this.combinedFilter(storeLoadOptions.filter);
                    if (!columnsController.isDataSourceApplied()) {
                        columnsController.updateColumnDataTypes(dataSource)
                    }
                    this._columnsUpdating = true;
                    columnsController.updateSortingGrouping(dataSource, !this._useSortingGroupingFromColumns);
                    this._columnsUpdating = false;
                    storeLoadOptions.sort = columnsController.getSortDataSourceParameters();
                    storeLoadOptions.group = columnsController.getGroupDataSourceParameters();
                    dataSource.sort(storeLoadOptions.sort);
                    dataSource.group(storeLoadOptions.group);
                    storeLoadOptions.sort = columnsController.getSortDataSourceParameters(!dataSource.remoteOperations().sorting);
                    e.group = columnsController.getGroupDataSourceParameters(!dataSource.remoteOperations().grouping)
                },
                _handleColumnsChanged: function(e) {
                    var that = this;
                    var changeTypes = e.changeTypes;
                    var optionNames = e.optionNames;
                    var filterValue;
                    var filterValues;
                    var filterApplied;
                    var updateItemsHandler = function updateItemsHandler() {
                        that._columnsController.columnsChanged.remove(updateItemsHandler);
                        that.updateItems()
                    };
                    if (changeTypes.sorting || changeTypes.grouping) {
                        if (that._dataSource && !that._columnsUpdating) {
                            that._dataSource.group(that._columnsController.getGroupDataSourceParameters());
                            that._dataSource.sort(that._columnsController.getSortDataSourceParameters());
                            that.reload()
                        }
                    } else {
                        if (changeTypes.columns) {
                            if (optionNames.filterValues || optionNames.filterValue || optionNames.selectedFilterOperation) {
                                filterValue = that._columnsController.columnOption(e.columnIndex, "filterValue");
                                filterValues = that._columnsController.columnOption(e.columnIndex, "filterValues");
                                if (Array.isArray(filterValues) || void 0 === e.columnIndex || (0, _type.isDefined)(filterValue) || !optionNames.selectedFilterOperation || optionNames.filterValue) {
                                    that._applyFilter();
                                    filterApplied = true
                                }
                            }
                            if (!that._needApplyFilter && !_uiGrid_core2.default.checkChanges(optionNames, ["width", "visibleWidth", "filterValue", "bufferedFilterValue", "selectedFilterOperation", "filterValues", "filterType"])) {
                                that._columnsController.columnsChanged.add(updateItemsHandler)
                            }
                            if ((0, _type.isDefined)(optionNames.visible)) {
                                var column = that._columnsController.columnOption(e.columnIndex);
                                if (column && ((0, _type.isDefined)(column.filterValue) || (0, _type.isDefined)(column.filterValues))) {
                                    that._applyFilter();
                                    filterApplied = true
                                }
                            }
                        }
                    }
                    if (!filterApplied && changeTypes.filtering) {
                        that.reload()
                    }
                },
                _handleDataChanged: function(e) {
                    var that = this;
                    var dataSource = that._dataSource;
                    var columnsController = that._columnsController;
                    var isAsyncDataSourceApplying = false;
                    this._useSortingGroupingFromColumns = false;
                    if (dataSource && !that._isDataSourceApplying) {
                        that._isDataSourceApplying = true;
                        (0, _deferred.when)(that._columnsController.applyDataSource(dataSource)).done(function() {
                            if (that._isLoading) {
                                that._handleLoadingChanged(false)
                            }
                            if (isAsyncDataSourceApplying && e && e.isDelayed) {
                                e.isDelayed = false
                            }
                            that._isDataSourceApplying = false;
                            var hasAdditionalFilter = function() {
                                var additionalFilter = that._calculateAdditionalFilter();
                                return additionalFilter && additionalFilter.length
                            };
                            var needApplyFilter = that._needApplyFilter;
                            that._needApplyFilter = false;
                            if (needApplyFilter && !that._isAllDataTypesDefined && hasAdditionalFilter()) {
                                _ui.default.log("W1005", that.component.NAME);
                                that._applyFilter()
                            } else {
                                that.updateItems(e, true)
                            }
                        }).fail(function() {
                            that._isDataSourceApplying = false
                        });
                        if (that._isDataSourceApplying) {
                            isAsyncDataSourceApplying = true;
                            that._handleLoadingChanged(true)
                        }
                        that._needApplyFilter = !that._columnsController.isDataSourceApplied();
                        that._isAllDataTypesDefined = columnsController.isAllDataTypesDefined()
                    }
                },
                _handleLoadingChanged: function(isLoading) {
                    this._isLoading = isLoading;
                    this._fireLoadingChanged()
                },
                _handleLoadError: function(e) {
                    this.dataErrorOccurred.fire(e)
                },
                fireError: function() {
                    this.dataErrorOccurred.fire(_ui.default.Error.apply(_ui.default, arguments))
                },
                _setPagingOptions: function(dataSource) {
                    var pageIndex = this.option("paging.pageIndex");
                    var pageSize = this.option("paging.pageSize");
                    var pagingEnabled = this.option("paging.enabled");
                    var scrollingMode = this.option("scrolling.mode");
                    var appendMode = "infinite" === scrollingMode;
                    var virtualMode = "virtual" === scrollingMode;
                    var paginate = pagingEnabled || virtualMode || appendMode;
                    var isChanged = false;
                    dataSource.requireTotalCount(!appendMode);
                    if (void 0 !== pagingEnabled && dataSource.paginate() !== paginate) {
                        dataSource.paginate(paginate);
                        isChanged = true
                    }
                    if (void 0 !== pageSize && dataSource.pageSize() !== pageSize) {
                        dataSource.pageSize(pageSize);
                        isChanged = true
                    }
                    if (void 0 !== pageIndex && dataSource.pageIndex() !== pageIndex) {
                        dataSource.pageIndex(pageIndex);
                        isChanged = true
                    }
                    return isChanged
                },
                _getSpecificDataSourceOption: function() {
                    var dataSource = this.option("dataSource");
                    if (Array.isArray(dataSource)) {
                        return {
                            store: {
                                type: "array",
                                data: dataSource,
                                key: this.option("keyExpr")
                            }
                        }
                    }
                    return dataSource
                },
                _initDataSource: function() {
                    var that = this;
                    var dataSource = this.option("dataSource");
                    var oldDataSource = this._dataSource;
                    that.callBase();
                    dataSource = that._dataSource;
                    that._useSortingGroupingFromColumns = true;
                    if (dataSource) {
                        that._setPagingOptions(dataSource);
                        that.setDataSource(dataSource)
                    } else {
                        if (oldDataSource) {
                            that.updateItems()
                        }
                    }
                },
                _loadDataSource: function() {
                    var that = this;
                    var dataSource = that._dataSource;
                    var result = new _deferred.Deferred;
                    (0, _deferred.when)(this._columnsController.refresh(true)).always(function() {
                        if (dataSource) {
                            dataSource.load().done(result.resolve).fail(result.reject)
                        } else {
                            result.resolve()
                        }
                    });
                    return result.promise()
                },
                _beforeProcessItems: function(items) {
                    return items.slice(0)
                },
                getRowIndexDelta: function() {
                    return 0
                },
                _processItems: function(items, change) {
                    var that = this;
                    var rowIndexDelta = that.getRowIndexDelta();
                    var changeType = change.changeType;
                    var visibleColumns = that._columnsController.getVisibleColumns(null, "loadingAll" === changeType);
                    var visibleItems = that._items;
                    var lastVisibleItem = "append" === changeType && visibleItems.length > 0 ? visibleItems[visibleItems.length - 1] : null;
                    var dataIndex = (0, _type.isDefined)(null === lastVisibleItem || void 0 === lastVisibleItem ? void 0 : lastVisibleItem.dataIndex) ? lastVisibleItem.dataIndex + 1 : 0;
                    var options = {
                        visibleColumns: visibleColumns,
                        dataIndex: dataIndex
                    };
                    var result = [];
                    (0, _iterator.each)(items, function(index, item) {
                        if ((0, _type.isDefined)(item)) {
                            options.rowIndex = index - rowIndexDelta;
                            item = that._processItem(item, options);
                            result.push(item)
                        }
                    });
                    return result
                },
                _processItem: function(item, options) {
                    item = this._generateDataItem(item, options);
                    item = this._processDataItem(item, options);
                    item.dataIndex = options.dataIndex++;
                    return item
                },
                _generateDataItem: function(data) {
                    return {
                        rowType: "data",
                        data: data,
                        key: this.keyOf(data)
                    }
                },
                _processDataItem: function(dataItem, options) {
                    dataItem.values = this.generateDataValues(dataItem.data, options.visibleColumns);
                    return dataItem
                },
                generateDataValues: function(data, columns, isModified) {
                    var values = [];
                    var value;
                    for (var i = 0; i < columns.length; i++) {
                        var column = columns[i];
                        value = isModified ? void 0 : null;
                        if (!column.command) {
                            if (column.calculateCellValue) {
                                value = column.calculateCellValue(data)
                            } else {
                                if (column.dataField) {
                                    value = data[column.dataField]
                                }
                            }
                        }
                        values.push(value)
                    }
                    return values
                },
                _applyChange: function(change) {
                    var that = this;
                    if ("update" === change.changeType) {
                        that._applyChangeUpdate(change)
                    } else {
                        if (that.items().length && change.repaintChangesOnly && "refresh" === change.changeType) {
                            that._applyChangesOnly(change)
                        } else {
                            if ("refresh" === change.changeType) {
                                that._applyChangeFull(change)
                            }
                        }
                    }
                },
                _applyChangeFull: function(change) {
                    this._items = change.items.slice(0)
                },
                _getRowIndices: function(change) {
                    var rowIndices = change.rowIndices.slice(0);
                    var rowIndexDelta = this.getRowIndexDelta();
                    rowIndices.sort(function(a, b) {
                        return a - b
                    });
                    for (var i = 0; i < rowIndices.length; i++) {
                        var correctedRowIndex = rowIndices[i];
                        if (change.allowInvisibleRowIndices) {
                            correctedRowIndex += rowIndexDelta
                        }
                        if (correctedRowIndex < 0) {
                            rowIndices.splice(i, 1);
                            i--
                        }
                    }
                    return rowIndices
                },
                _applyChangeUpdate: function(change) {
                    var that = this;
                    var items = change.items;
                    var rowIndices = that._getRowIndices(change);
                    var rowIndexDelta = that.getRowIndexDelta();
                    var repaintChangesOnly = that.option("repaintChangesOnly");
                    var prevIndex = -1;
                    var rowIndexCorrection = 0;
                    var changeType;
                    change.items = [];
                    change.rowIndices = [];
                    change.columnIndices = [];
                    change.changeTypes = [];
                    var equalItems = function(item1, item2, strict) {
                        var result = item1 && item2 && (0, _common.equalByValue)(item1.key, item2.key);
                        if (result && strict) {
                            result = item1.rowType === item2.rowType && ("detail" !== item2.rowType || item1.isEditing === item2.isEditing)
                        }
                        return result
                    };
                    (0, _iterator.each)(rowIndices, function(index, rowIndex) {
                        var columnIndices;
                        rowIndex += rowIndexCorrection + rowIndexDelta;
                        if (prevIndex === rowIndex) {
                            return
                        }
                        prevIndex = rowIndex;
                        var oldItem = that._items[rowIndex];
                        var oldNextItem = that._items[rowIndex + 1];
                        var newItem = items[rowIndex];
                        var newNextItem = items[rowIndex + 1];
                        var strict = equalItems(oldItem, oldNextItem) || equalItems(newItem, newNextItem);
                        if (newItem) {
                            newItem.rowIndex = rowIndex;
                            change.items.push(newItem)
                        }
                        if (oldItem && newItem && equalItems(oldItem, newItem, strict)) {
                            changeType = "update";
                            that._items[rowIndex] = newItem;
                            if (oldItem.visible !== newItem.visible) {
                                change.items.splice(-1, 1, {
                                    visible: newItem.visible
                                })
                            } else {
                                if (repaintChangesOnly && !change.isFullUpdate) {
                                    columnIndices = that._partialUpdateRow(oldItem, newItem, rowIndex - rowIndexDelta)
                                }
                            }
                        } else {
                            if (newItem && !oldItem || newNextItem && equalItems(oldItem, newNextItem, strict)) {
                                changeType = "insert";
                                that._items.splice(rowIndex, 0, newItem);
                                rowIndexCorrection++
                            } else {
                                if (oldItem && !newItem || oldNextItem && equalItems(newItem, oldNextItem, strict)) {
                                    changeType = "remove";
                                    that._items.splice(rowIndex, 1);
                                    rowIndexCorrection--;
                                    prevIndex = -1
                                } else {
                                    if (newItem) {
                                        changeType = "update";
                                        that._items[rowIndex] = newItem
                                    } else {
                                        return
                                    }
                                }
                            }
                        }
                        change.rowIndices.push(rowIndex - rowIndexDelta);
                        change.changeTypes.push(changeType);
                        change.columnIndices.push(columnIndices)
                    })
                },
                _isCellChanged: function(oldRow, newRow, visibleRowIndex, columnIndex, isLiveUpdate) {
                    if (JSON.stringify(oldRow.values[columnIndex]) !== JSON.stringify(newRow.values[columnIndex])) {
                        return true
                    }

                    function isCellModified(row, columnIndex) {
                        return row.modifiedValues ? void 0 !== row.modifiedValues[columnIndex] : false
                    }
                    if (isCellModified(oldRow, columnIndex) !== isCellModified(newRow, columnIndex)) {
                        return true
                    }
                    return false
                },
                _getChangedColumnIndices: function(oldItem, newItem, visibleRowIndex, isLiveUpdate) {
                    if (oldItem.rowType === newItem.rowType && "group" !== newItem.rowType && "groupFooter" !== newItem.rowType) {
                        var columnIndices = [];
                        if ("detail" !== newItem.rowType) {
                            for (var columnIndex = 0; columnIndex < oldItem.values.length; columnIndex++) {
                                if (this._isCellChanged(oldItem, newItem, visibleRowIndex, columnIndex, isLiveUpdate)) {
                                    columnIndices.push(columnIndex)
                                }
                            }
                        }
                        return columnIndices
                    }
                },
                _partialUpdateRow: function(oldItem, newItem, visibleRowIndex, isLiveUpdate) {
                    var changedColumnIndices = this._getChangedColumnIndices(oldItem, newItem, visibleRowIndex, isLiveUpdate);
                    if (changedColumnIndices) {
                        oldItem.cells && oldItem.cells.forEach(function(cell, columnIndex) {
                            var isCellChanged = changedColumnIndices.indexOf(columnIndex) >= 0;
                            if (!isCellChanged && cell && cell.update) {
                                cell.update(newItem)
                            }
                        });
                        newItem.update = oldItem.update;
                        newItem.watch = oldItem.watch;
                        newItem.cells = oldItem.cells;
                        if (isLiveUpdate) {
                            newItem.oldValues = oldItem.values
                        }
                        oldItem.update && oldItem.update(newItem)
                    }
                    return changedColumnIndices
                },
                _isItemEquals: function(item1, item2) {
                    if (JSON.stringify(item1.values) !== JSON.stringify(item2.values)) {
                        return false
                    }
                    var compareFields = ["modified", "isNewRow", "removed", "isEditing"];
                    if (compareFields.some(function(field) {
                            return item1[field] !== item2[field]
                        })) {
                        return false
                    }
                    if ("group" === item1.rowType || "groupFooter" === item1.rowType) {
                        var _item1$data, _item2$data, _item1$data2, _item2$data2;
                        var expandedMatch = item1.isExpanded === item2.isExpanded;
                        var summaryCellsMatch = JSON.stringify(item1.summaryCells) === JSON.stringify(item2.summaryCells);
                        var continuationMatch = (null === (_item1$data = item1.data) || void 0 === _item1$data ? void 0 : _item1$data.isContinuation) === (null === (_item2$data = item2.data) || void 0 === _item2$data ? void 0 : _item2$data.isContinuation) && (null === (_item1$data2 = item1.data) || void 0 === _item1$data2 ? void 0 : _item1$data2.isContinuationOnNextPage) === (null === (_item2$data2 = item2.data) || void 0 === _item2$data2 ? void 0 : _item2$data2.isContinuationOnNextPage);
                        if (!expandedMatch || !summaryCellsMatch || !continuationMatch) {
                            return false
                        }
                    }
                    return true
                },
                _applyChangesOnly: function(change) {
                    var _this2 = this;
                    var rowIndices = [];
                    var columnIndices = [];
                    var changeTypes = [];
                    var items = [];
                    var newIndexByKey = {};

                    function getRowKey(row) {
                        if (row) {
                            return row.rowType + "," + JSON.stringify(row.key)
                        }
                    }
                    var isItemEquals = function(item1, item2) {
                        if (!_this2._isItemEquals(item1, item2)) {
                            return false
                        }
                        if (item1.cells) {
                            item1.update && item1.update(item2);
                            item1.cells.forEach(function(cell) {
                                if (cell && cell.update) {
                                    cell.update(item2)
                                }
                            })
                        }
                        return true
                    };
                    var oldItems = this._items.slice();
                    change.items.forEach(function(item, index) {
                        var key = getRowKey(item);
                        newIndexByKey[key] = index;
                        item.rowIndex = index
                    });
                    var result = (0, _array_compare.findChanges)(oldItems, change.items, getRowKey, isItemEquals);
                    if (!result) {
                        this._applyChangeFull(change);
                        return
                    }
                    result.forEach(function(change) {
                        switch (change.type) {
                            case "update":
                                var index = change.index;
                                var newItem = change.data;
                                var oldItem = change.oldItem;
                                var changedColumnIndices = _this2._partialUpdateRow(oldItem, newItem, index, true);
                                rowIndices.push(index);
                                changeTypes.push("update");
                                items.push(newItem);
                                _this2._items[index] = newItem;
                                columnIndices.push(changedColumnIndices);
                                break;
                            case "insert":
                                rowIndices.push(change.index);
                                changeTypes.push("insert");
                                items.push(change.data);
                                columnIndices.push(void 0);
                                _this2._items.splice(change.index, 0, change.data);
                                break;
                            case "remove":
                                rowIndices.push(change.index);
                                changeTypes.push("remove");
                                _this2._items.splice(change.index, 1);
                                items.push(change.oldItem);
                                columnIndices.push(void 0)
                        }
                    });
                    change.repaintChangesOnly = true;
                    change.changeType = "update";
                    change.rowIndices = rowIndices;
                    change.columnIndices = columnIndices;
                    change.changeTypes = changeTypes;
                    change.items = items;
                    if (oldItems.length) {
                        change.isLiveUpdate = true
                    }
                    this._correctRowIndices(function(rowIndex) {
                        var oldItem = oldItems[rowIndex];
                        var key = getRowKey(oldItem);
                        var newRowIndex = newIndexByKey[key];
                        return newRowIndex >= 0 ? newRowIndex - rowIndex : 0
                    })
                },
                _correctRowIndices: _common.noop,
                _updateItemsCore: function(change) {
                    var that = this;
                    var items;
                    var dataSource = that._dataSource;
                    var changeType = change.changeType || "refresh";
                    change.changeType = changeType;
                    if (dataSource) {
                        items = change.items || dataSource.items();
                        items = that._beforeProcessItems(items);
                        items = that._processItems(items, change);
                        change.items = items;
                        var oldItems = that._items.length === items.length && that._items;
                        that._applyChange(change);
                        var rowIndexDelta = that.getRowIndexDelta();
                        (0, _iterator.each)(that._items, function(index, item) {
                            item.rowIndex = index - rowIndexDelta;
                            if (oldItems) {
                                item.cells = oldItems[index].cells || []
                            }
                        })
                    } else {
                        that._items = []
                    }
                },
                _handleChanging: function(e) {
                    var that = this;
                    var rows = that.getVisibleRows();
                    var dataSource = that.dataSource();
                    if (dataSource) {
                        e.changes.forEach(function(change) {
                            if ("insert" === change.type && change.index >= 0) {
                                var dataIndex = 0;
                                for (var i = 0; i < change.index; i++) {
                                    var row = rows[i];
                                    if (row && ("data" === row.rowType || "group" === row.rowType)) {
                                        dataIndex++
                                    }
                                }
                                change.index = dataIndex
                            }
                        })
                    }
                },
                updateItems: function(change, isDataChanged) {
                    change = change || {};
                    var that = this;
                    if (void 0 !== that._repaintChangesOnly) {
                        change.repaintChangesOnly = that._repaintChangesOnly
                    } else {
                        if (change.changes) {
                            change.repaintChangesOnly = that.option("repaintChangesOnly")
                        } else {
                            if (isDataChanged) {
                                var operationTypes = that.dataSource().operationTypes();
                                change.repaintChangesOnly = operationTypes && !operationTypes.grouping && !operationTypes.filtering && that.option("repaintChangesOnly");
                                change.isDataChanged = true;
                                if (operationTypes && (operationTypes.reload || operationTypes.paging || operationTypes.groupExpanding)) {
                                    change.needUpdateDimensions = true
                                }
                            }
                        }
                    }
                    if (that._updateLockCount) {
                        that._changes.push(change);
                        return
                    }
                    that._updateItemsCore(change);
                    if (change.cancel) {
                        return
                    }
                    that._fireChanged(change)
                },
                loadingOperationTypes: function() {
                    var dataSource = this.dataSource();
                    return dataSource && dataSource.loadingOperationTypes() || {}
                },
                _fireChanged: function(change) {
                    var _this3 = this;
                    if (this._currentOperationTypes) {
                        change.operationTypes = this._currentOperationTypes;
                        this._currentOperationTypes = null
                    }(0, _common.deferRender)(function() {
                        _this3.changed.fire(change)
                    })
                },
                isLoading: function() {
                    return this._isLoading || this._isCustomLoading
                },
                _fireLoadingChanged: function() {
                    this.loadingChanged.fire(this.isLoading(), this._loadingText)
                },
                _calculateAdditionalFilter: function() {
                    return null
                },
                _applyFilter: function() {
                    var that = this;
                    var dataSource = that._dataSource;
                    if (dataSource) {
                        dataSource.pageIndex(0);
                        return that.reload().done(that.pageChanged.fire.bind(that.pageChanged))
                    }
                },
                filter: function filter(filterExpr) {
                    var dataSource = this._dataSource;
                    var filter = dataSource && dataSource.filter();
                    if (0 === arguments.length) {
                        return filter
                    }
                    filterExpr = arguments.length > 1 ? Array.prototype.slice.call(arguments, 0) : filterExpr;
                    if (_uiGrid_core2.default.equalFilterParameters(filter, filterExpr)) {
                        return
                    }
                    if (dataSource) {
                        dataSource.filter(filterExpr)
                    }
                    this._applyFilter()
                },
                clearFilter: function(filterName) {
                    var that = this;
                    var columnsController = that._columnsController;
                    var clearColumnOption = function(optionName) {
                        var columnCount = columnsController.columnCount();
                        for (var index = 0; index < columnCount; index++) {
                            columnsController.columnOption(index, optionName, void 0)
                        }
                    };
                    that.component.beginUpdate();
                    if (arguments.length > 0) {
                        switch (filterName) {
                            case "dataSource":
                                that.filter(null);
                                break;
                            case "search":
                                that.searchByText("");
                                break;
                            case "header":
                                clearColumnOption("filterValues");
                                break;
                            case "row":
                                clearColumnOption("filterValue")
                        }
                    } else {
                        that.filter(null);
                        that.searchByText("");
                        clearColumnOption("filterValue");
                        clearColumnOption("bufferedFilterValue");
                        clearColumnOption("filterValues")
                    }
                    that.component.endUpdate()
                },
                _fireDataSourceChanged: function() {
                    var that = this;
                    var changedHandler = function changedHandler() {
                        that.changed.remove(changedHandler);
                        that.dataSourceChanged.fire()
                    };
                    that.changed.add(changedHandler)
                },
                _getDataSourceAdapter: _common.noop,
                _createDataSourceAdapterCore: function(dataSource, remoteOperations) {
                    var dataSourceAdapterProvider = this._getDataSourceAdapter();
                    var dataSourceAdapter = dataSourceAdapterProvider.create(this.component);
                    dataSourceAdapter.init(dataSource, remoteOperations);
                    return dataSourceAdapter
                },
                isLocalStore: function(store) {
                    store = store || this.store();
                    return store instanceof _array_store.default
                },
                isCustomStore: function(store) {
                    store = store || this.store();
                    return store instanceof _custom_store.default
                },
                _createDataSourceAdapter: function(dataSource) {
                    var remoteOperations = this.option("remoteOperations");
                    var store = dataSource.store();
                    var enabledRemoteOperations = {
                        filtering: true,
                        sorting: true,
                        paging: true,
                        grouping: true,
                        summary: true
                    };
                    if (remoteOperations && remoteOperations.groupPaging) {
                        remoteOperations = (0, _extend.extend)({}, enabledRemoteOperations, remoteOperations)
                    }
                    if ("auto" === remoteOperations) {
                        remoteOperations = this.isLocalStore(store) || this.isCustomStore(store) ? {} : {
                            filtering: true,
                            sorting: true,
                            paging: true
                        }
                    }
                    if (true === remoteOperations) {
                        remoteOperations = enabledRemoteOperations
                    }
                    return this._createDataSourceAdapterCore(dataSource, remoteOperations)
                },
                setDataSource: function(dataSource) {
                    var that = this;
                    var oldDataSource = that._dataSource;
                    if (!dataSource && oldDataSource) {
                        oldDataSource.cancelAll();
                        oldDataSource.changed.remove(that._dataChangedHandler);
                        oldDataSource.loadingChanged.remove(that._loadingChangedHandler);
                        oldDataSource.loadError.remove(that._loadErrorHandler);
                        oldDataSource.customizeStoreLoadOptions.remove(that._customizeStoreLoadOptionsHandler);
                        oldDataSource.changing.remove(that._changingHandler);
                        oldDataSource.dispose(that._isSharedDataSource)
                    }
                    if (dataSource) {
                        dataSource = that._createDataSourceAdapter(dataSource)
                    }
                    that._dataSource = dataSource;
                    if (dataSource) {
                        that._fireDataSourceChanged();
                        that._isLoading = !dataSource.isLoaded();
                        that._needApplyFilter = true;
                        that._isAllDataTypesDefined = that._columnsController.isAllDataTypesDefined();
                        dataSource.changed.add(that._dataChangedHandler);
                        dataSource.loadingChanged.add(that._loadingChangedHandler);
                        dataSource.loadError.add(that._loadErrorHandler);
                        dataSource.customizeStoreLoadOptions.add(that._customizeStoreLoadOptionsHandler);
                        dataSource.changing.add(that._changingHandler)
                    }
                },
                items: function() {
                    return this._items
                },
                isEmpty: function() {
                    return !this.items().length
                },
                pageCount: function() {
                    return this._dataSource ? this._dataSource.pageCount() : 1
                },
                dataSource: function() {
                    return this._dataSource
                },
                store: function() {
                    var dataSource = this._dataSource;
                    return dataSource && dataSource.store()
                },
                loadAll: function(data) {
                    var that = this;
                    var d = new _deferred.Deferred;
                    var dataSource = that._dataSource;
                    if (dataSource) {
                        if (data) {
                            var options = {
                                data: data,
                                isCustomLoading: true,
                                storeLoadOptions: {
                                    isLoadingAll: true
                                },
                                loadOptions: {
                                    filter: that.getCombinedFilter(),
                                    group: dataSource.group(),
                                    sort: dataSource.sort()
                                }
                            };
                            dataSource._handleDataLoaded(options);
                            (0, _deferred.when)(options.data).done(function(data) {
                                data = that._beforeProcessItems(data);
                                d.resolve(that._processItems(data, {
                                    changeType: "loadingAll"
                                }), options.extra && options.extra.summary)
                            }).fail(d.reject)
                        } else {
                            if (!dataSource.isLoading()) {
                                var loadOptions = (0, _extend.extend)({}, dataSource.loadOptions(), {
                                    isLoadingAll: true,
                                    requireTotalCount: false
                                });
                                dataSource.load(loadOptions).done(function(items, extra) {
                                    items = that._beforeProcessItems(items);
                                    items = that._processItems(items, {
                                        changeType: "loadingAll"
                                    });
                                    d.resolve(items, extra && extra.summary)
                                }).fail(d.reject)
                            } else {
                                d.reject()
                            }
                        }
                    } else {
                        d.resolve([])
                    }
                    return d
                },
                getKeyByRowIndex: function(rowIndex, byLoaded) {
                    var item = this.items(byLoaded)[rowIndex];
                    if (item) {
                        return item.key
                    }
                },
                getRowIndexByKey: function(key, byLoaded) {
                    return _uiGrid_core2.default.getIndexByKey(key, this.items(byLoaded))
                },
                keyOf: function(data) {
                    var store = this.store();
                    if (store) {
                        return store.keyOf(data)
                    }
                },
                byKey: function(key) {
                    var store = this.store();
                    var rowIndex = this.getRowIndexByKey(key);
                    var result;
                    if (!store) {
                        return
                    }
                    if (rowIndex >= 0) {
                        result = (new _deferred.Deferred).resolve(this.items()[rowIndex].data)
                    }
                    return result || store.byKey(key)
                },
                key: function() {
                    var store = this.store();
                    if (store) {
                        return store.key()
                    }
                },
                getRowIndexOffset: function() {
                    return 0
                },
                getDataByKeys: function(rowKeys) {
                    var that = this;
                    var result = new _deferred.Deferred;
                    var deferreds = [];
                    var data = [];
                    (0, _iterator.each)(rowKeys, function(index, key) {
                        deferreds.push(that.byKey(key).done(function(keyData) {
                            data[index] = keyData
                        }))
                    });
                    _deferred.when.apply(_renderer.default, deferreds).always(function() {
                        result.resolve(data)
                    });
                    return result
                },
                pageIndex: function(value) {
                    return changePaging(this, "pageIndex", value)
                },
                pageSize: function(value) {
                    return changePaging(this, "pageSize", value)
                },
                beginCustomLoading: function(messageText) {
                    this._isCustomLoading = true;
                    this._loadingText = messageText || "";
                    this._fireLoadingChanged()
                },
                endCustomLoading: function() {
                    this._isCustomLoading = false;
                    this._loadingText = void 0;
                    this._fireLoadingChanged()
                },
                refresh: function(options) {
                    if (true === options) {
                        options = {
                            reload: true,
                            changesOnly: true
                        }
                    } else {
                        if (!options) {
                            options = {
                                lookup: true,
                                selection: true,
                                reload: true
                            }
                        }
                    }
                    var that = this;
                    var dataSource = that.getDataSource();
                    var changesOnly = options.changesOnly;
                    var d = new _deferred.Deferred;
                    var customizeLoadResult = function() {
                        that._repaintChangesOnly = !!changesOnly
                    };
                    (0, _deferred.when)(!options.lookup || that._columnsController.refresh()).always(function() {
                        if (options.load || options.reload) {
                            dataSource && dataSource.on("customizeLoadResult", customizeLoadResult);
                            (0, _deferred.when)(that.reload(options.reload, changesOnly)).always(function() {
                                dataSource && dataSource.off("customizeLoadResult", customizeLoadResult);
                                that._repaintChangesOnly = void 0
                            }).done(d.resolve).fail(d.reject)
                        } else {
                            that.updateItems({
                                repaintChangesOnly: options.changesOnly
                            });
                            d.resolve()
                        }
                    });
                    return d.promise()
                },
                getVisibleRows: function() {
                    return this.items()
                },
                _disposeDataSource: function() {
                    this.setDataSource(null)
                },
                dispose: function() {
                    this._disposeDataSource();
                    this.callBase.apply(this, arguments)
                },
                repaintRows: function(rowIndexes, changesOnly) {
                    rowIndexes = Array.isArray(rowIndexes) ? rowIndexes : [rowIndexes];
                    if (rowIndexes.length > 1 || (0, _type.isDefined)(rowIndexes[0])) {
                        this.updateItems({
                            changeType: "update",
                            rowIndices: rowIndexes,
                            isFullUpdate: !changesOnly
                        })
                    }
                },
                skipProcessingPagingChange: function(fullName) {
                    return this._skipProcessingPagingChange && ("paging.pageIndex" === fullName || "paging.pageSize" === fullName)
                },
                getUserState: function() {
                    return {
                        searchText: this.option("searchPanel.text"),
                        pageIndex: this.pageIndex(),
                        pageSize: this.pageSize()
                    }
                },
                getCachedStoreData: function() {
                    return this._dataSource && this._dataSource.getCachedStoreData()
                }
            };
            _uiGrid_core2.default.proxyMethod(members, "load");
            _uiGrid_core2.default.proxyMethod(members, "reload");
            _uiGrid_core2.default.proxyMethod(members, "push");
            _uiGrid_core2.default.proxyMethod(members, "itemsCount", 0);
            _uiGrid_core2.default.proxyMethod(members, "totalItemsCount", 0);
            _uiGrid_core2.default.proxyMethod(members, "hasKnownLastPage", true);
            _uiGrid_core2.default.proxyMethod(members, "isLoaded", true);
            _uiGrid_core2.default.proxyMethod(members, "totalCount", 0);
            return members
        }())
    }
};
exports.default = _default;
module.exports = exports.default;
