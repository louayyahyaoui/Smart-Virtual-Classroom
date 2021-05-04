/**
 * DevExtreme (exporter/jspdf/export.js)
 * Version: 20.2.6
 * Build date: Tue Mar 16 2021
 *
 * Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
exports.Export = void 0;
var _type = require("../../core/utils/type");
var _extend = require("../../core/utils/extend");
var _date = _interopRequireDefault(require("../../localization/date"));
var _number = _interopRequireDefault(require("../../localization/number"));
var _message = _interopRequireDefault(require("../../localization/message"));
var _window = require("../../core/utils/window");

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        "default": obj
    }
}
var Export = {
    getFullOptions: function(options) {
        var fullOptions = (0, _extend.extend)({}, options);
        if (!((0, _type.isDefined)(fullOptions.jsPDFDocument) && (0, _type.isObject)(fullOptions.jsPDFDocument))) {
            throw Error('The "jsPDFDocument" field must contain a jsPDF instance.')
        }
        if (!((0, _type.isDefined)(fullOptions.jsPDFDocument.autoTable) && (0, _type.isFunction)(fullOptions.jsPDFDocument.autoTable))) {
            throw Error('The "exportDataGrid" method requires a autoTable plugin for jsPDF object.')
        }
        if (!(0, _type.isDefined)(fullOptions.keepColumnWidths)) {
            fullOptions.keepColumnWidths = true
        }
        if (!(0, _type.isDefined)(fullOptions.autoTableOptions)) {
            fullOptions.autoTableOptions = this._getDefaultAutoTableOptions()
        } else {
            if (!(0, _type.isObject)(fullOptions.autoTableOptions)) {
                throw Error('The "autoTableOptions" option must be of object type.')
            }
            fullOptions.autoTableOptions = (0, _extend.extend)(true, {}, this._getDefaultAutoTableOptions(), fullOptions.autoTableOptions)
        }
        if (!(0, _type.isDefined)(fullOptions.loadPanel)) {
            fullOptions.loadPanel = {}
        }
        if (!(0, _type.isDefined)(fullOptions.loadPanel.enabled)) {
            fullOptions.loadPanel.enabled = true
        }
        if (!(0, _type.isDefined)(fullOptions.loadPanel.text)) {
            fullOptions.loadPanel.text = _message.default.format("dxDataGrid-exporting")
        }
        return fullOptions
    },
    _getDefaultAutoTableOptions: function() {
        return {
            theme: "plain",
            tableLineColor: 149,
            tableLineWidth: .1,
            styles: {
                textColor: 51,
                lineColor: 149,
                lineWidth: 0
            },
            columnStyles: {},
            headStyles: {
                fontStyle: "normal",
                textColor: 149,
                lineWidth: .1
            },
            bodyStyles: {
                lineWidth: .1
            },
            head: [],
            body: []
        }
    },
    _setLoadPanelOptions: function(component, options) {
        if (!(0, _window.hasWindow)()) {
            return
        }
        component._setOptionWithoutOptionChange("loadPanel", options);
        this._renderLoadPanel(component)
    },
    _renderLoadPanel: function(component) {
        var rowsView = component.getView("rowsView");
        rowsView._renderLoadPanel(rowsView.element(), rowsView.element().parent())
    },
    "export": function(options) {
        var _this = this;
        var jsPDFDocument = options.jsPDFDocument,
            autoTableOptions = options.autoTableOptions,
            component = options.component,
            customizeCell = options.customizeCell,
            keepColumnWidths = options.keepColumnWidths,
            selectedRowsOnly = options.selectedRowsOnly,
            loadPanel = options.loadPanel;
        var initialLoadPanelOptions = (0, _extend.extend)({}, component.option("loadPanel"));
        if ("animation" in component.option("loadPanel")) {
            loadPanel.animation = null
        }
        this._setLoadPanelOptions(component, loadPanel);
        var dataProvider = component.getDataProvider(selectedRowsOnly);
        var wrapText = !!component.option("wordWrapEnabled");
        return new Promise(function(resolve) {
            dataProvider.ready().done(function() {
                var columns = dataProvider.getColumns();
                var styles = dataProvider.getStyles();
                var dataRowsCount = dataProvider.getRowsCount();
                var headerRowCount = dataProvider.getHeaderRowCount();
                var mergedCells = [];
                if (keepColumnWidths) {
                    var pdfColumnWidths = _this._tryGetPdfColumnWidths(autoTableOptions.tableWidth, dataProvider.getColumnsWidths());
                    if ((0, _type.isDefined)(pdfColumnWidths) && (0, _type.isDefined)(autoTableOptions.columnStyles)) {
                        _this._setColumnWidths(autoTableOptions.columnStyles, pdfColumnWidths)
                    }
                }
                for (var rowIndex = 0; rowIndex < dataRowsCount; rowIndex++) {
                    var row = [];
                    for (var cellIndex = 0; cellIndex < columns.length; cellIndex++) {
                        var _dataProvider$getCell = dataProvider.getCellData(rowIndex, cellIndex, true),
                            value = _dataProvider$getCell.value,
                            gridCell = _dataProvider$getCell.cellSourceData;
                        var cellStyle = styles[dataProvider.getStyleId(rowIndex, cellIndex)];
                        var pdfCell = {
                            content: _this._getFormattedValue(value, cellStyle.format),
                            styles: _this._getPDFCellStyles(gridCell.rowType, columns[cellIndex].alignment, cellStyle, wrapText)
                        };
                        if ("header" === gridCell.rowType) {
                            var mergedRange = _this._tryGetMergeRange(rowIndex, cellIndex, mergedCells, dataProvider);
                            if (mergedRange && mergedRange.rowSpan > 0) {
                                pdfCell.rowSpan = mergedRange.rowSpan + 1
                            }
                            if (mergedRange && mergedRange.colSpan > 0) {
                                pdfCell.colSpan = mergedRange.colSpan + 1
                            }
                            var isMergedCell = mergedCells[rowIndex] && mergedCells[rowIndex][cellIndex];
                            if (!isMergedCell || pdfCell.rowSpan > 1 || pdfCell.colSpan > 1) {
                                if ((0, _type.isFunction)(customizeCell)) {
                                    customizeCell({
                                        gridCell: gridCell,
                                        pdfCell: pdfCell
                                    })
                                }
                                row.push(pdfCell)
                            }
                        } else {
                            if ("group" === gridCell.rowType && !(0, _type.isDefined)(pdfCell.content) && 1 === row.length) {
                                var _row$0$colSpan;
                                row[0].colSpan = null !== (_row$0$colSpan = row[0].colSpan) && void 0 !== _row$0$colSpan ? _row$0$colSpan : 1;
                                row[0].colSpan++
                            } else {
                                var _pdfCell$content;
                                pdfCell.content = null !== (_pdfCell$content = pdfCell.content) && void 0 !== _pdfCell$content ? _pdfCell$content : "";
                                if ((0, _type.isFunction)(customizeCell)) {
                                    customizeCell({
                                        gridCell: gridCell,
                                        pdfCell: pdfCell
                                    })
                                }
                                row.push(pdfCell)
                            }
                        }
                    }
                    if (rowIndex < headerRowCount) {
                        autoTableOptions.head.push(row)
                    } else {
                        autoTableOptions.body.push(row)
                    }
                }
                jsPDFDocument.autoTable(autoTableOptions);
                resolve()
            }).always(function() {
                _this._setLoadPanelOptions(component, initialLoadPanelOptions)
            })
        })
    },
    _getFormattedValue: function(value, format) {
        if ((0, _type.isDefined)(format)) {
            if ((0, _type.isDate)(value)) {
                return _date.default.format(value, format)
            }
            if ((0, _type.isNumeric)(value)) {
                return _number.default.format(value, format)
            }
        }
        return value
    },
    _getPDFCellStyles: function(rowType, columnAlignment, cellStyle, wrapText) {
        var cellAlignment = cellStyle.alignment,
            bold = cellStyle.bold;
        var align = "header" === rowType ? columnAlignment : cellAlignment;
        var pdfCellStyle = {};
        if (align) {
            pdfCellStyle.halign = align
        }
        if (bold && "header" !== rowType) {
            pdfCellStyle.fontStyle = "bold"
        }
        if (wrapText) {
            pdfCellStyle.cellWidth = "wrap"
        }
        return pdfCellStyle
    },
    _tryGetMergeRange: function(rowIndex, cellIndex, mergedCells, dataProvider) {
        if (!mergedCells[rowIndex] || !mergedCells[rowIndex][cellIndex]) {
            var _dataProvider$getCell2 = dataProvider.getCellMerging(rowIndex, cellIndex),
                colspan = _dataProvider$getCell2.colspan,
                rowspan = _dataProvider$getCell2.rowspan;
            if (colspan || rowspan) {
                for (var i = rowIndex; i <= rowIndex + rowspan || 0; i++) {
                    for (var j = cellIndex; j <= cellIndex + colspan || 0; j++) {
                        if (!mergedCells[i]) {
                            mergedCells[i] = []
                        }
                        mergedCells[i][j] = true
                    }
                }
                return {
                    rowSpan: rowspan,
                    colSpan: colspan
                }
            }
        }
    },
    _tryGetPdfColumnWidths: function(autoTableWidth, columnWidths) {
        if ((0, _type.isNumeric)(autoTableWidth) && (0, _type.isDefined)(columnWidths)) {
            var tableWidth = columnWidths.reduce(function(a, b) {
                return a + b
            }, 0);
            return columnWidths.map(function(columnWidth) {
                return autoTableWidth * columnWidth / tableWidth
            })
        }
    },
    _setColumnWidths: function(autoTableColumnStyles, pdfColumnWidths) {
        pdfColumnWidths.forEach(function(width, index) {
            autoTableColumnStyles[index] = autoTableColumnStyles[index] || {};
            autoTableColumnStyles[index].cellWidth = width
        })
    }
};
exports.Export = Export;
