/**
 * DevExtreme (ui/pivot_grid/ui.pivot_grid.export.js)
 * Version: 20.2.6
 * Build date: Tue Mar 16 2021
 *
 * Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
exports.DataProvider = exports.ExportMixin = void 0;
var _class = _interopRequireDefault(require("../../core/class"));
var _type = require("../../core/utils/type");
var _extend = require("../../core/utils/extend");
var _iterator = require("../../core/utils/iterator");
var _window = require("../../core/utils/window");
var _format_helper = _interopRequireDefault(require("../../format_helper"));
var _number = _interopRequireDefault(require("../../localization/number"));
var _exporter = require("../../exporter");
var _uiGrid_core = _interopRequireDefault(require("../grid_core/ui.grid_core.export_mixin"));
var _deferred = require("../../core/utils/deferred");

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        "default": obj
    }
}
var DEFAULT_DATA_TYPE = "string";
var COLUMN_HEADER_STYLE_ID = 0;
var ROW_HEADER_STYLE_ID = 1;
var DATA_STYLE_OFFSET = 2;
var DEFAUL_COLUMN_WIDTH = 100;
var ExportMixin = (0, _extend.extend)({}, _uiGrid_core.default, {
    exportToExcel: function() {
        var that = this;
        (0, _exporter.export)(that.getDataProvider(), {
            fileName: that.option("export.fileName"),
            proxyUrl: that.option("export.proxyUrl"),
            format: "EXCEL",
            rtlEnabled: that.option("rtlEnabled"),
            ignoreErrors: that.option("export.ignoreExcelErrors"),
            exportingAction: that._actions.onExporting,
            exportedAction: that._actions.onExported,
            fileSavingAction: that._actions.onFileSaving
        }, _exporter.excel.getData)
    },
    _getLength: function(items) {
        var i;
        var itemCount = items[0].length;
        var cellCount = 0;
        for (i = 0; i < itemCount; i++) {
            cellCount += items[0][i].colspan || 1
        }
        return cellCount
    },
    _correctCellsInfoItemLengths: function(cellsInfo, expectedLength) {
        for (var i = 0; i < cellsInfo.length; i++) {
            while (cellsInfo[i].length < expectedLength) {
                cellsInfo[i].push({})
            }
        }
        return cellsInfo
    },
    _calculateCellInfoItemLength: function(columnsRow) {
        var result = 0;
        for (var columnIndex = 0; columnIndex < columnsRow.length; columnIndex++) {
            result += (0, _type.isDefined)(columnsRow[columnIndex].colspan) ? columnsRow[columnIndex].colspan : 1
        }
        return result
    },
    _getAllItems: function(columnsInfo, rowsInfoItems, cellsInfo) {
        var cellIndex;
        var rowIndex;
        var correctedCellsInfo = cellsInfo;
        var rowsLength = this._getLength(rowsInfoItems);
        var headerRowsCount = columnsInfo.length;
        if (columnsInfo.length > 0 && columnsInfo[0].length > 0 && cellsInfo.length > 0 && 0 === cellsInfo[0].length) {
            var cellInfoItemLength = this._calculateCellInfoItemLength(columnsInfo[0]);
            if (cellInfoItemLength > 0) {
                correctedCellsInfo = this._correctCellsInfoItemLengths(cellsInfo, cellInfoItemLength)
            }
        }
        var sourceItems = columnsInfo.concat(correctedCellsInfo);
        for (rowIndex = 0; rowIndex < rowsInfoItems.length; rowIndex++) {
            for (cellIndex = rowsInfoItems[rowIndex].length - 1; cellIndex >= 0; cellIndex--) {
                if (!(0, _type.isDefined)(sourceItems[rowIndex + headerRowsCount])) {
                    sourceItems[rowIndex + headerRowsCount] = []
                }
                sourceItems[rowIndex + headerRowsCount].splice(0, 0, (0, _extend.extend)({}, rowsInfoItems[rowIndex][cellIndex]))
            }
        }
        sourceItems[0].splice(0, 0, (0, _extend.extend)({}, this._getEmptyCell(), {
            alignment: this._options.rtlEnabled ? "right" : "left",
            colspan: rowsLength,
            rowspan: headerRowsCount
        }));
        return this._prepareItems(sourceItems)
    },
    getDataProvider: function() {
        var that = this;
        var dataController = this._dataController;
        var items = new _deferred.Deferred;
        dataController.beginLoading();
        setTimeout(function() {
            var columnsInfo = (0, _extend.extend)(true, [], dataController.getColumnsInfo(true));
            var rowsInfoItems = (0, _extend.extend)(true, [], dataController.getRowsInfo(true));
            var cellsInfo = dataController.getCellsInfo(true);
            items.resolve(that._getAllItems(columnsInfo, rowsInfoItems, cellsInfo));
            dataController.endLoading()
        });
        return new DataProvider({
            items: items,
            rtlEnabled: this.option("rtlEnabled"),
            dataFields: this.getDataSource().getAreaFields("data"),
            customizeExcelCell: this.option("export.customizeExcelCell"),
            rowsArea: this._rowsArea,
            columnsArea: this._columnsArea
        })
    }
});
exports.ExportMixin = ExportMixin;

function getCellDataType(field) {
    if (field && field.customizeText) {
        return "string"
    }
    if (field.dataType) {
        return field.dataType
    }
    if (field.format) {
        if (1 === _number.default.parse(_format_helper.default.format(1, field.format))) {
            return "number"
        }
        if (_format_helper.default.format(new Date, field.format)) {
            return "date"
        }
    }
    return DEFAULT_DATA_TYPE
}
var DataProvider = _class.default.inherit({
    ctor: function(options) {
        this._options = options;
        this._styles = []
    },
    ready: function() {
        var that = this;
        var options = that._options;
        var dataFields = options.dataFields;
        return (0, _deferred.when)(options.items).done(function(items) {
            var headerSize = items[0][0].rowspan;
            var columns = items[headerSize - 1];
            var dataItemStyle = {
                alignment: options.rtlEnabled ? "left" : "right"
            };
            that._styles = [{
                alignment: "center",
                dataType: "string"
            }, {
                alignment: options.rtlEnabled ? "right" : "left",
                dataType: "string"
            }];
            if (dataFields.length) {
                dataFields.forEach(function(dataField) {
                    that._styles.push((0, _extend.extend)({}, dataItemStyle, {
                        format: dataField.format,
                        dataType: getCellDataType(dataField)
                    }))
                })
            } else {
                that._styles.push(dataItemStyle)
            }(0, _iterator.each)(columns, function(columnIndex, column) {
                column.width = DEFAUL_COLUMN_WIDTH
            });
            options.columns = columns;
            options.items = items
        })
    },
    getColumns: function() {
        return this._options.columns
    },
    getColumnsWidths: function() {
        var colsArea = this._options.columnsArea;
        var rowsArea = this._options.rowsArea;
        var columns = this._options.columns;
        var useDefaultWidth = !(0, _window.hasWindow)() || "virtual" === colsArea.option("scrolling.mode") || colsArea.element().is(":hidden");
        return useDefaultWidth ? columns.map(function(_) {
            return DEFAUL_COLUMN_WIDTH
        }) : rowsArea.getColumnsWidth().concat(colsArea.getColumnsWidth())
    },
    getRowsCount: function() {
        return this._options.items.length
    },
    getGroupLevel: function() {
        return 0
    },
    getCellMerging: function(rowIndex, cellIndex) {
        var items = this._options.items;
        var item = items[rowIndex] && items[rowIndex][cellIndex];
        return item ? {
            colspan: item.colspan - 1,
            rowspan: item.rowspan - 1
        } : {
            colspan: 0,
            rowspan: 0
        }
    },
    getFrozenArea: function() {
        var items = this._options.items;
        return {
            x: items[0][0].colspan,
            y: items[0][0].rowspan
        }
    },
    getCellType: function(rowIndex, cellIndex) {
        var style = this._styles[this.getStyleId(rowIndex, cellIndex)];
        return style && style.dataType || "string"
    },
    getCellData: function(rowIndex, cellIndex, isExcelJS) {
        var result = {};
        var items = this._options.items;
        var item = items[rowIndex] && items[rowIndex][cellIndex] || {};
        if (isExcelJS) {
            result.cellSourceData = item;
            var areaName = this._tryGetAreaName(items, item, rowIndex, cellIndex);
            if (areaName) {
                result.cellSourceData.area = areaName
            }
            result.cellSourceData.rowIndex = rowIndex;
            result.cellSourceData.columnIndex = cellIndex
        }
        if ("string" === this.getCellType(rowIndex, cellIndex)) {
            result.value = item.text
        } else {
            result.value = item.value
        }
        if (result.cellSourceData && result.cellSourceData.isWhiteSpace) {
            result.value = ""
        }
        return result
    },
    _tryGetAreaName: function(items, item, rowIndex, cellIndex) {
        var columnHeaderSize = items[0][0].rowspan;
        var rowHeaderSize = items[0][0].colspan;
        if (cellIndex >= rowHeaderSize && rowIndex < columnHeaderSize) {
            return "column"
        } else {
            if (rowIndex >= columnHeaderSize && cellIndex < rowHeaderSize) {
                return "row"
            } else {
                if ((0, _type.isDefined)(item.dataIndex)) {
                    return "data"
                }
            }
        }
    },
    getStyles: function() {
        return this._styles
    },
    getStyleId: function(rowIndex, cellIndex) {
        var items = this._options.items;
        var columnHeaderSize = items[0][0].rowspan;
        var rowHeaderSize = items[0][0].colspan;
        var item = items[rowIndex] && items[rowIndex][cellIndex] || {};
        if (0 === cellIndex && 0 === rowIndex) {
            return COLUMN_HEADER_STYLE_ID
        } else {
            if (cellIndex >= rowHeaderSize && rowIndex < columnHeaderSize) {
                return COLUMN_HEADER_STYLE_ID
            } else {
                if (rowIndex >= columnHeaderSize && cellIndex < rowHeaderSize) {
                    return ROW_HEADER_STYLE_ID
                }
            }
        }
        return DATA_STYLE_OFFSET + (item.dataIndex || 0)
    },
    hasCustomizeExcelCell: function() {
        return (0, _type.isDefined)(this._options.customizeExcelCell)
    },
    customizeExcelCell: function(e) {
        if (this._options.customizeExcelCell) {
            this._options.customizeExcelCell(e)
        }
    }
});
exports.DataProvider = DataProvider;
