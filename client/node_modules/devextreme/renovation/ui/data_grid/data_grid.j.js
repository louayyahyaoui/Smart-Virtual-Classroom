/**
 * DevExtreme (renovation/ui/data_grid/data_grid.j.js)
 * Version: 20.2.6
 * Build date: Tue Mar 16 2021
 *
 * Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
exports.default = void 0;
var _component_registrator = _interopRequireDefault(require("../../../core/component_registrator"));
var _component = _interopRequireDefault(require("../../preact_wrapper/component"));
var _data_grid = require("./data_grid");

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        "default": obj
    }
}

function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) {
            descriptor.writable = true
        }
        Object.defineProperty(target, descriptor.key, descriptor)
    }
}

function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) {
        _defineProperties(Constructor.prototype, protoProps)
    }
    if (staticProps) {
        _defineProperties(Constructor, staticProps)
    }
    return Constructor
}

function _inheritsLoose(subClass, superClass) {
    subClass.prototype = Object.create(superClass.prototype);
    subClass.prototype.constructor = subClass;
    _setPrototypeOf(subClass, superClass)
}

function _setPrototypeOf(o, p) {
    _setPrototypeOf = Object.setPrototypeOf || function(o, p) {
        o.__proto__ = p;
        return o
    };
    return _setPrototypeOf(o, p)
}
var DataGrid = function(_BaseComponent) {
    _inheritsLoose(DataGrid, _BaseComponent);

    function DataGrid() {
        return _BaseComponent.apply(this, arguments) || this
    }
    var _proto = DataGrid.prototype;
    _proto.getProps = function() {
        var props = _BaseComponent.prototype.getProps.call(this);
        props.rowTemplate = this._createTemplateComponent(props, props.rowTemplate);
        props.onKeyDown = this._wrapKeyDownHandler(props.onKeyDown);
        return props
    };
    _proto.beginCustomLoading = function(messageText) {
        return this.viewRef.beginCustomLoading(messageText)
    };
    _proto.byKey = function(key) {
        return this.viewRef.byKey(key)
    };
    _proto.cancelEditData = function() {
        return this.viewRef.cancelEditData()
    };
    _proto.cellValue = function(rowIndex, dataField, value) {
        return this.viewRef.cellValue(rowIndex, dataField, value)
    };
    _proto.clearFilter = function(filterName) {
        return this.viewRef.clearFilter(filterName)
    };
    _proto.clearSelection = function() {
        return this.viewRef.clearSelection()
    };
    _proto.clearSorting = function() {
        return this.viewRef.clearSorting()
    };
    _proto.closeEditCell = function() {
        return this.viewRef.closeEditCell()
    };
    _proto.collapseAdaptiveDetailRow = function() {
        return this.viewRef.collapseAdaptiveDetailRow()
    };
    _proto.columnCount = function() {
        return this.viewRef.columnCount()
    };
    _proto.columnOption = function(id, optionName, optionValue) {
        return this.viewRef.columnOption(id, optionName, optionValue)
    };
    _proto.deleteColumn = function(id) {
        return this.viewRef.deleteColumn(id)
    };
    _proto.deleteRow = function(rowIndex) {
        return this.viewRef.deleteRow(rowIndex)
    };
    _proto.deselectAll = function() {
        return this.viewRef.deselectAll()
    };
    _proto.deselectRows = function(keys) {
        return this.viewRef.deselectRows(keys)
    };
    _proto.editCell = function(rowIndex, dataField) {
        return this.viewRef.editCell(rowIndex, dataField)
    };
    _proto.editRow = function(rowIndex) {
        return this.viewRef.editRow(rowIndex)
    };
    _proto.endCustomLoading = function() {
        return this.viewRef.endCustomLoading()
    };
    _proto.expandAdaptiveDetailRow = function(key) {
        return this.viewRef.expandAdaptiveDetailRow(key)
    };
    _proto.filter = function(filterExpr) {
        return this.viewRef.filter(filterExpr)
    };
    _proto.focus = function(element) {
        return this.viewRef.focus(this._patchElementParam(element))
    };
    _proto.getCellElement = function(rowIndex, dataField) {
        return this.viewRef.getCellElement(rowIndex, dataField)
    };
    _proto.getCombinedFilter = function(returnDataField) {
        return this.viewRef.getCombinedFilter(returnDataField)
    };
    _proto.getDataSource = function() {
        return this.viewRef.getDataSource()
    };
    _proto.getKeyByRowIndex = function(rowIndex) {
        return this.viewRef.getKeyByRowIndex(rowIndex)
    };
    _proto.getRowElement = function(rowIndex) {
        return this.viewRef.getRowElement(rowIndex)
    };
    _proto.getRowIndexByKey = function(key) {
        return this.viewRef.getRowIndexByKey(key)
    };
    _proto.getScrollable = function() {
        return this.viewRef.getScrollable()
    };
    _proto.getVisibleColumnIndex = function(id) {
        return this.viewRef.getVisibleColumnIndex(id)
    };
    _proto.hasEditData = function() {
        return this.viewRef.hasEditData()
    };
    _proto.hideColumnChooser = function() {
        return this.viewRef.hideColumnChooser()
    };
    _proto.isAdaptiveDetailRowExpanded = function(key) {
        return this.viewRef.isAdaptiveDetailRowExpanded(key)
    };
    _proto.isRowFocused = function(key) {
        return this.viewRef.isRowFocused(key)
    };
    _proto.isRowSelected = function(key) {
        return this.viewRef.isRowSelected(key)
    };
    _proto.keyOf = function(obj) {
        return this.viewRef.keyOf(obj)
    };
    _proto.navigateToRow = function(key) {
        return this.viewRef.navigateToRow(key)
    };
    _proto.pageCount = function() {
        return this.viewRef.pageCount()
    };
    _proto.pageIndex = function(newIndex) {
        return this.viewRef.pageIndex(newIndex)
    };
    _proto.pageSize = function(value) {
        return this.viewRef.pageSize(value)
    };
    _proto.refresh = function(changesOnly) {
        return this.viewRef.refresh(changesOnly)
    };
    _proto.repaintRows = function(rowIndexes) {
        return this.viewRef.repaintRows(rowIndexes)
    };
    _proto.saveEditData = function() {
        return this.viewRef.saveEditData()
    };
    _proto.searchByText = function(text) {
        return this.viewRef.searchByText(text)
    };
    _proto.selectAll = function() {
        return this.viewRef.selectAll()
    };
    _proto.selectRows = function(keys, preserve) {
        return this.viewRef.selectRows(keys, preserve)
    };
    _proto.selectRowsByIndexes = function(indexes) {
        return this.viewRef.selectRowsByIndexes(indexes)
    };
    _proto.showColumnChooser = function() {
        return this.viewRef.showColumnChooser()
    };
    _proto.undeleteRow = function(rowIndex) {
        return this.viewRef.undeleteRow(rowIndex)
    };
    _proto.updateDimensions = function() {
        return this.viewRef.updateDimensions()
    };
    _proto.addColumn = function(columnOptions) {
        return this.viewRef.addColumn(columnOptions)
    };
    _proto.addRow = function() {
        return this.viewRef.addRow()
    };
    _proto.clearGrouping = function() {
        return this.viewRef.clearGrouping()
    };
    _proto.collapseAll = function(groupIndex) {
        return this.viewRef.collapseAll(groupIndex)
    };
    _proto.collapseRow = function(key) {
        return this.viewRef.collapseRow(key)
    };
    _proto.expandAll = function(groupIndex) {
        return this.viewRef.expandAll(groupIndex)
    };
    _proto.expandRow = function(key) {
        return this.viewRef.expandRow(key)
    };
    _proto.exportToExcel = function(selectionOnly) {
        return this.viewRef.exportToExcel(selectionOnly)
    };
    _proto.getSelectedRowKeys = function() {
        return this.viewRef.getSelectedRowKeys()
    };
    _proto.getSelectedRowsData = function() {
        return this.viewRef.getSelectedRowsData()
    };
    _proto.getTotalSummaryValue = function(summaryItemName) {
        return this.viewRef.getTotalSummaryValue(summaryItemName)
    };
    _proto.getVisibleColumns = function(headerLevel) {
        return this.viewRef.getVisibleColumns(headerLevel)
    };
    _proto.getVisibleRows = function() {
        return this.viewRef.getVisibleRows()
    };
    _proto.isRowExpanded = function(key) {
        return this.viewRef.isRowExpanded(key)
    };
    _proto.totalCount = function() {
        return this.viewRef.totalCount()
    };
    _proto.getController = function(name) {
        return this.viewRef.getController(name)
    };
    _proto._getActionConfigs = function() {
        return {
            onCellClick: {},
            onCellDblClick: {},
            onCellHoverChanged: {},
            onCellPrepared: {},
            onContextMenuPreparing: {},
            onEditingStart: {},
            onEditorPrepared: {},
            onEditorPreparing: {},
            onExported: {},
            onExporting: {},
            onFileSaving: {},
            onFocusedCellChanged: {},
            onFocusedCellChanging: {},
            onFocusedRowChanged: {},
            onFocusedRowChanging: {},
            onRowClick: {},
            onRowDblClick: {},
            onRowPrepared: {},
            onAdaptiveDetailRowPreparing: {},
            onDataErrorOccurred: {},
            onInitNewRow: {},
            onRowCollapsed: {},
            onRowCollapsing: {},
            onRowExpanded: {},
            onRowExpanding: {},
            onRowInserted: {},
            onRowInserting: {},
            onRowRemoved: {},
            onRowRemoving: {},
            onRowUpdated: {},
            onRowUpdating: {},
            onRowValidating: {},
            onSelectionChanged: {},
            onToolbarPreparing: {},
            onActive: {},
            onDimensionChanged: {},
            onInactive: {},
            onKeyboardHandled: {},
            onVisibilityChange: {},
            onFocusIn: {},
            onFocusOut: {},
            onClick: {},
            onContentReady: {
                excludeValidators: ["disabled", "readOnly"]
            }
        }
    };
    _createClass(DataGrid, [{
        key: "_propsInfo",
        get: function() {
            return {
                twoWay: [
                    ["filterValue", null, "filterValueChange"],
                    ["focusedColumnIndex", -1, "focusedColumnIndexChange"],
                    ["focusedRowIndex", -1, "focusedRowIndexChange"],
                    ["focusedRowKey", null, "focusedRowKeyChange"],
                    ["selectedRowKeys", [], "selectedRowKeysChange"],
                    ["selectionFilter", [], "selectionFilterChange"]
                ],
                allowNull: ["defaultFilterValue", "defaultFocusedRowKey", "accessKey", "filterValue", "focusedRowKey"],
                elements: []
            }
        }
    }, {
        key: "_viewComponent",
        get: function() {
            return _data_grid.DataGrid
        }
    }]);
    return DataGrid
}(_component.default);
exports.default = DataGrid;
(0, _component_registrator.default)("dxDataGrid", DataGrid);
module.exports = exports.default;
