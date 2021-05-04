/**
 * DevExtreme (exporter/exceljs/export.js)
 * Version: 20.2.6
 * Build date: Tue Mar 16 2021
 *
 * Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
exports.Export = void 0;
var _type = require("../../core/utils/type");
var _message = _interopRequireDefault(require("../../localization/message"));
var _export_format = require("./export_format");
var _extend = require("../../core/utils/extend");
var _window = require("../../core/utils/window");

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        "default": obj
    }
}
var MAX_DIGIT_WIDTH_IN_PIXELS = 7;
var MAX_EXCEL_COLUMN_WIDTH = 255;
var Export = {
    getFullOptions: function(options) {
        var fullOptions = (0, _extend.extend)({}, options);
        if (!((0, _type.isDefined)(fullOptions.worksheet) && (0, _type.isObject)(fullOptions.worksheet))) {
            throw Error('The "worksheet" field must contain an object.')
        }
        if (!(0, _type.isDefined)(fullOptions.topLeftCell)) {
            fullOptions.topLeftCell = {
                row: 1,
                column: 1
            }
        } else {
            if ((0, _type.isString)(fullOptions.topLeftCell)) {
                var _fullOptions$workshee = fullOptions.worksheet.getCell(fullOptions.topLeftCell),
                    row = _fullOptions$workshee.row,
                    col = _fullOptions$workshee.col;
                fullOptions.topLeftCell = {
                    row: row,
                    column: col
                }
            }
        }
        if (!(0, _type.isDefined)(fullOptions.keepColumnWidths)) {
            fullOptions.keepColumnWidths = true
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
    convertDateForExcelJS: function(date) {
        return new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds(), date.getMilliseconds()))
    },
    setNumberFormat: function(excelCell, numberFormat) {
        excelCell.numFmt = numberFormat
    },
    tryConvertToExcelNumberFormat: function(format, dataType) {
        var newFormat = _export_format.ExportFormat.formatObjectConverter(format, dataType);
        var currency = newFormat.currency;
        format = newFormat.format;
        dataType = newFormat.dataType;
        return _export_format.ExportFormat.convertFormat(format, newFormat.precision, dataType, currency)
    },
    setAlignment: function(excelCell, wrapText, horizontalAlignment) {
        excelCell.alignment = excelCell.alignment || {};
        if ((0, _type.isDefined)(wrapText)) {
            excelCell.alignment.wrapText = wrapText
        }
        if ((0, _type.isDefined)(horizontalAlignment)) {
            excelCell.alignment.horizontal = horizontalAlignment
        }
        excelCell.alignment.vertical = "top"
    },
    setColumnsWidth: function(worksheet, widths, startColumnIndex) {
        if (!(0, _type.isDefined)(widths)) {
            return
        }
        for (var i = 0; i < widths.length; i++) {
            var columnWidth = widths[i];
            if ("number" === typeof columnWidth && isFinite(columnWidth)) {
                worksheet.getColumn(startColumnIndex + i).width = Math.min(MAX_EXCEL_COLUMN_WIDTH, Math.floor(columnWidth / MAX_DIGIT_WIDTH_IN_PIXELS * 100) / 100)
            }
        }
    },
    tryGetMergeRange: function(rowIndex, cellIndex, mergedCells, dataProvider) {
        if (!mergedCells[rowIndex] || !mergedCells[rowIndex][cellIndex]) {
            var cellMerge = dataProvider.getCellMerging(rowIndex, cellIndex);
            if (cellMerge.colspan || cellMerge.rowspan) {
                for (var i = rowIndex; i <= rowIndex + cellMerge.rowspan || 0; i++) {
                    for (var j = cellIndex; j <= cellIndex + cellMerge.colspan || 0; j++) {
                        if (!mergedCells[i]) {
                            mergedCells[i] = []
                        }
                        mergedCells[i][j] = true
                    }
                }
                return {
                    start: {
                        row: rowIndex,
                        column: cellIndex
                    },
                    end: {
                        row: rowIndex + (cellMerge.rowspan || 0),
                        column: cellIndex + (cellMerge.colspan || 0)
                    }
                }
            }
        }
    },
    mergeCells: function(worksheet, topLeftCell, mergeRanges) {
        mergeRanges.forEach(function(mergeRange) {
            worksheet.mergeCells(mergeRange.start.row + topLeftCell.row, mergeRange.start.column + topLeftCell.column, mergeRange.end.row + topLeftCell.row, mergeRange.end.column + topLeftCell.column)
        })
    },
    setLoadPanelOptions: function(component, options, privateOptions) {
        if (!(0, _window.hasWindow)()) {
            return
        }
        component._setOptionWithoutOptionChange("loadPanel", options);
        privateOptions._renderLoadPanel(component)
    },
    "export": function(options, privateOptions) {
        var _this = this;
        var customizeCell = options.customizeCell,
            component = options.component,
            worksheet = options.worksheet,
            topLeftCell = options.topLeftCell,
            autoFilterEnabled = options.autoFilterEnabled,
            keepColumnWidths = options.keepColumnWidths,
            selectedRowsOnly = options.selectedRowsOnly,
            loadPanel = options.loadPanel;
        var initialLoadPanelOptions = (0, _extend.extend)({}, component.option("loadPanel"));
        if ("animation" in component.option("loadPanel")) {
            loadPanel.animation = null
        }
        this.setLoadPanelOptions(component, loadPanel, privateOptions);
        var wrapText = !!component.option("wordWrapEnabled");
        worksheet.properties.outlineProperties = {
            summaryBelow: false,
            summaryRight: false
        };
        var cellRange = {
            from: {
                row: topLeftCell.row,
                column: topLeftCell.column
            },
            to: {
                row: topLeftCell.row,
                column: topLeftCell.column
            }
        };
        var dataProvider = component.getDataProvider(selectedRowsOnly);
        return new Promise(function(resolve) {
            dataProvider.ready().done(function() {
                var columns = dataProvider.getColumns();
                var headerRowCount = (0, _type.isFunction)(dataProvider.getHeaderRowCount) ? dataProvider.getHeaderRowCount() : 1;
                var dataRowsCount = dataProvider.getRowsCount();
                if (keepColumnWidths) {
                    _this.setColumnsWidth(worksheet, dataProvider.getColumnsWidths(), cellRange.from.column)
                }
                var mergedCells = [];
                var mergeRanges = [];
                for (var rowIndex = 0; rowIndex < dataRowsCount; rowIndex++) {
                    var row = worksheet.getRow(cellRange.from.row + rowIndex);
                    _this.exportRow(rowIndex, columns.length, row, cellRange.from.column, dataProvider, customizeCell, headerRowCount, mergedCells, mergeRanges, wrapText, privateOptions);
                    if (rowIndex >= 1) {
                        cellRange.to.row++
                    }
                }
                _this.mergeCells(worksheet, topLeftCell, mergeRanges);
                cellRange.to.column += columns.length > 0 ? columns.length - 1 : 0;
                var worksheetViewSettings = worksheet.views[0] || {};
                if (component.option("rtlEnabled")) {
                    worksheetViewSettings.rightToLeft = true
                }
                if (headerRowCount > 0) {
                    if (Object.keys(worksheetViewSettings).indexOf("state") === -1) {
                        (0, _extend.extend)(worksheetViewSettings, privateOptions._getWorksheetFrozenState(dataProvider, cellRange))
                    }
                    privateOptions._trySetAutoFilter(dataProvider, worksheet, cellRange, headerRowCount, autoFilterEnabled)
                }
                if (Object.keys(worksheetViewSettings).length > 0) {
                    worksheet.views = [worksheetViewSettings]
                }
                resolve(cellRange)
            }).always(function() {
                _this.setLoadPanelOptions(component, initialLoadPanelOptions, privateOptions)
            })
        })
    },
    exportRow: function(rowIndex, cellCount, row, startColumnIndex, dataProvider, customizeCell, headerRowCount, mergedCells, mergeRanges, wrapText, privateOptions) {
        var styles = dataProvider.getStyles();
        privateOptions._trySetOutlineLevel(dataProvider, row, rowIndex, headerRowCount);
        for (var cellIndex = 0; cellIndex < cellCount; cellIndex++) {
            var cellData = dataProvider.getCellData(rowIndex, cellIndex, true);
            var cell = cellData.cellSourceData;
            var excelCell = row.getCell(startColumnIndex + cellIndex);
            if ((0, _type.isDate)(cellData.value)) {
                excelCell.value = this.convertDateForExcelJS(cellData.value)
            } else {
                excelCell.value = cellData.value
            }
            if ((0, _type.isDefined)(excelCell.value)) {
                var _styles$dataProvider$ = styles[dataProvider.getStyleId(rowIndex, cellIndex)],
                    bold = _styles$dataProvider$.bold,
                    horizontalAlignment = _styles$dataProvider$.alignment,
                    format = _styles$dataProvider$.format,
                    dataType = _styles$dataProvider$.dataType;
                var numberFormat = this.tryConvertToExcelNumberFormat(format, dataType);
                if ((0, _type.isDefined)(numberFormat)) {
                    numberFormat = numberFormat.replace(/&quot;/g, '"')
                } else {
                    if ((0, _type.isString)(excelCell.value) && /^[@=+-]/.test(excelCell.value)) {
                        numberFormat = "@"
                    }
                }
                this.setNumberFormat(excelCell, numberFormat);
                privateOptions._trySetFont(excelCell, bold);
                this.setAlignment(excelCell, wrapText, horizontalAlignment)
            }
            if ((0, _type.isFunction)(customizeCell)) {
                customizeCell(privateOptions._getCustomizeCellOptions(excelCell, cell))
            }
            if (privateOptions._needMergeRange(rowIndex, headerRowCount)) {
                var mergeRange = this.tryGetMergeRange(rowIndex, cellIndex, mergedCells, dataProvider);
                if ((0, _type.isDefined)(mergeRange)) {
                    mergeRanges.push(mergeRange)
                }
            }
        }
    }
};
exports.Export = Export;
