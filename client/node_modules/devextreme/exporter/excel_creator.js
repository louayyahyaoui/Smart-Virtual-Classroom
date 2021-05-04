/**
 * DevExtreme (exporter/excel_creator.js)
 * Version: 20.2.6
 * Build date: Tue Mar 16 2021
 *
 * Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
exports.getData = getData;
exports.ExcelCreator = void 0;
var _class = _interopRequireDefault(require("../core/class"));
var _window = require("../core/utils/window");
var _type = require("../core/utils/type");
var _extend = require("../core/utils/extend");
var _ui = _interopRequireDefault(require("../ui/widget/ui.errors"));
var _string = require("../core/utils/string");
var _jszip = _interopRequireDefault(require("jszip"));
var _file_saver = require("./file_saver");
var _excel_format_converter = _interopRequireDefault(require("./excel_format_converter"));
var _excel = _interopRequireDefault(require("./excel/excel.file"));
var _deferred = require("../core/utils/deferred");

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        "default": obj
    }
}

function _typeof(obj) {
    "@babel/helpers - typeof";
    if ("function" === typeof Symbol && "symbol" === typeof Symbol.iterator) {
        _typeof = function(obj) {
            return typeof obj
        }
    } else {
        _typeof = function(obj) {
            return obj && "function" === typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj
        }
    }
    return _typeof(obj)
}
var XML_TAG = '<?xml version="1.0" encoding="utf-8"?>';
var GROUP_SHEET_PR_XML = '<sheetPr><outlinePr summaryBelow="0"/></sheetPr>';
var SINGLE_SHEET_PR_XML = "<sheetPr/>";
var BASE_STYLE_XML2 = '<borders count="1"><border><left style="thin"><color rgb="FFD3D3D3"/></left><right style="thin"><color rgb="FFD3D3D3"/></right><top style="thin"><color rgb="FFD3D3D3"/></top><bottom style="thin"><color rgb="FFD3D3D3"/></bottom></border></borders><cellStyleXfs count="1"><xf numFmtId="0" fontId="0" fillId="0" borderId="0"/></cellStyleXfs>';
var OPEN_XML_FORMAT_URL = "http://schemas.openxmlformats.org";
var RELATIONSHIP_PART_NAME = "rels";
var XL_FOLDER_NAME = "xl";
var WORKBOOK_FILE_NAME = "workbook.xml";
var CONTENTTYPES_FILE_NAME = "[Content_Types].xml";
var SHAREDSTRING_FILE_NAME = "sharedStrings.xml";
var STYLE_FILE_NAME = "styles.xml";
var WORKSHEETS_FOLDER = "worksheets";
var WORKSHEET_FILE_NAME = "sheet1.xml";
var WORKSHEET_HEADER_XML = '<?xml version="1.0" encoding="UTF-8" standalone="yes"?><worksheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships" xmlns:mc="http://schemas.openxmlformats.org/markup-compatibility/2006" mc:Ignorable="x14ac" xmlns:x14ac="http://schemas.microsoft.com/office/spreadsheetml/2009/9/ac">';
var VALID_TYPES = {
    "boolean": "b",
    date: "d",
    number: "n",
    string: "s"
};
var EXCEL_START_TIME = Date.UTC(1899, 11, 30);
var DAYS_COUNT_BEFORE_29_FEB_1900 = 60;
var MAX_DIGIT_WIDTH_IN_PIXELS = 7;
var UNSUPPORTED_FORMAT_MAPPING = {
    quarter: "shortDate",
    quarterAndYear: "shortDate",
    minute: "longTime",
    millisecond: "longTime"
};
var ExcelCreator = _class.default.inherit({
    _getXMLTag: function(tagName, attributes, content) {
        var result = "<" + tagName;
        var i;
        var length = attributes.length;
        var attr;
        for (i = 0; i < length; i++) {
            attr = attributes[i];
            if (void 0 !== attr.value) {
                result = result + " " + attr.name + '="' + attr.value + '"'
            }
        }
        return (0, _type.isDefined)(content) ? result + ">" + content + "</" + tagName + ">" : result + " />"
    },
    _convertToExcelCellRef: function(zeroBasedRowIndex, zeroBasedCellIndex) {
        var columnName = "";
        var max = 26;
        var charCode;
        var isCellIndexFound;
        while (!isCellIndexFound) {
            charCode = 65 + (zeroBasedCellIndex >= max ? zeroBasedCellIndex % max : Math.ceil(zeroBasedCellIndex));
            columnName = String.fromCharCode(charCode) + columnName;
            if (zeroBasedCellIndex >= max) {
                zeroBasedCellIndex = Math.floor(zeroBasedCellIndex / max) - 1
            } else {
                isCellIndexFound = true
            }
        }
        return columnName + (zeroBasedRowIndex + 1)
    },
    _convertToExcelCellRefAndTrackMaxIndex: function(rowIndex, cellIndex) {
        if (this._maxRowIndex < Number(rowIndex)) {
            this._maxRowIndex = Number(rowIndex)
        }
        if (this._maxColumnIndex < Number(cellIndex)) {
            this._maxColumnIndex = Number(cellIndex)
        }
        return this._convertToExcelCellRef(rowIndex, cellIndex)
    },
    _getDataType: function(dataType) {
        return VALID_TYPES[dataType] || VALID_TYPES.string
    },
    _tryGetExcelCellDataType: function(object) {
        if ((0, _type.isDefined)(object)) {
            if ("number" === typeof object) {
                if (isFinite(object)) {
                    return VALID_TYPES.number
                } else {
                    return VALID_TYPES.string
                }
            } else {
                if ((0, _type.isString)(object)) {
                    return VALID_TYPES.string
                } else {
                    if ((0, _type.isDate)(object)) {
                        return VALID_TYPES.number
                    } else {
                        if ((0, _type.isBoolean)(object)) {
                            return VALID_TYPES.boolean
                        }
                    }
                }
            }
        }
    },
    _formatObjectConverter: function(format, dataType) {
        var result = {
            format: format,
            precision: format && format.precision,
            dataType: dataType
        };
        if ((0, _type.isObject)(format)) {
            return (0, _extend.extend)(result, format, {
                format: format.formatter || format.type,
                currency: format.currency
            })
        }
        return result
    },
    _tryConvertToExcelNumberFormat: function(format, dataType) {
        var newFormat = this._formatObjectConverter(format, dataType);
        format = newFormat.format;
        var currency = newFormat.currency;
        dataType = newFormat.dataType;
        if ((0, _type.isDefined)(format) && "date" === dataType) {
            format = UNSUPPORTED_FORMAT_MAPPING[format && format.type || format] || format
        }
        return _excel_format_converter.default.convertFormat(format, newFormat.precision, dataType, currency)
    },
    _appendString: function(value) {
        if ((0, _type.isDefined)(value)) {
            value = String(value);
            if (value.length) {
                value = (0, _string.encodeHtml)(value);
                if (void 0 === this._stringHash[value]) {
                    this._stringHash[value] = this._stringArray.length;
                    this._stringArray.push(value)
                }
                return this._stringHash[value]
            }
        }
    },
    _tryGetExcelDateValue: function(date) {
        var days;
        var totalTime;
        if ((0, _type.isDate)(date)) {
            days = Math.floor((Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()) - EXCEL_START_TIME) / 864e5);
            if (days < DAYS_COUNT_BEFORE_29_FEB_1900) {
                days--
            }
            totalTime = (3600 * date.getHours() + 60 * date.getMinutes() + date.getSeconds()) / 86400;
            return days + totalTime
        }
    },
    _prepareValue: function(rowIndex, cellIndex) {
        var dataProvider = this._dataProvider;
        var _ref = dataProvider.getCellData(rowIndex, cellIndex) || {},
            cellSourceData = _ref.cellSourceData;
        var _ref2 = dataProvider.getCellData(rowIndex, cellIndex) || {},
            value = _ref2.value;
        var sourceValue;
        var type = this._getDataType(dataProvider.getCellType(rowIndex, cellIndex));
        if (type === VALID_TYPES.date && !(0, _type.isDate)(value)) {
            type = VALID_TYPES.string
        }
        switch (type) {
            case VALID_TYPES.string:
                sourceValue = value;
                value = this._appendString(value);
                break;
            case VALID_TYPES.date:
                sourceValue = value;
                value = this._tryGetExcelDateValue(value);
                type = VALID_TYPES.number
        }
        return {
            value: value,
            type: type,
            sourceValue: sourceValue,
            cellSourceData: cellSourceData
        }
    },
    _callCustomizeExcelCell: function(_ref3) {
        var dataProvider = _ref3.dataProvider,
            value = _ref3.value,
            style = _ref3.style,
            sourceData = _ref3.sourceData;
        var styleCopy = _excel.default.copyCellFormat(style);
        var args = {
            value: value,
            numberFormat: styleCopy.numberFormat,
            clearStyle: function() {
                this.horizontalAlignment = null;
                this.verticalAlignment = null;
                this.wrapTextEnabled = null;
                this.font = null;
                this.numberFormat = null
            }
        };
        if ((0, _type.isDefined)(styleCopy)) {
            if ((0, _type.isDefined)(styleCopy.alignment)) {
                args.horizontalAlignment = styleCopy.alignment.horizontal;
                args.verticalAlignment = styleCopy.alignment.vertical;
                args.wrapTextEnabled = styleCopy.alignment.wrapText
            }
            args.backgroundColor = styleCopy.backgroundColor;
            args.fillPatternType = styleCopy.fillPatternType;
            args.fillPatternColor = styleCopy.fillPatternColor;
            args.font = styleCopy.font
        }
        dataProvider.customizeExcelCell(args, sourceData);
        var newStyle = styleCopy || {};
        newStyle.font = args.font;
        newStyle.alignment = newStyle.alignment || {};
        newStyle.alignment.horizontal = args.horizontalAlignment;
        newStyle.alignment.vertical = args.verticalAlignment;
        newStyle.alignment.wrapText = args.wrapTextEnabled;
        newStyle.backgroundColor = args.backgroundColor;
        newStyle.fillPatternType = args.fillPatternType;
        newStyle.fillPatternColor = args.fillPatternColor;
        newStyle.numberFormat = args.numberFormat;
        return {
            value: args.value,
            style: newStyle
        }
    },
    _getDataArray: function() {
        var that = this;
        var rowIndex;
        var cellIndex;
        var cellsArray;
        var cellData;
        var result = [];
        var dataProvider = that._dataProvider;
        var rowsLength = dataProvider.getRowsCount();
        var columns = dataProvider.getColumns();
        var cellsLength;
        for (rowIndex = 0; rowIndex < rowsLength; rowIndex++) {
            cellsArray = [];
            cellsLength = columns.length;
            for (cellIndex = 0; cellIndex !== cellsLength; cellIndex++) {
                cellData = that._prepareValue(rowIndex, cellIndex);
                var styleArrayIndex = dataProvider.getStyleId(rowIndex, cellIndex);
                var cellStyleId = this._styleArrayIndexToCellStyleIdMap[styleArrayIndex];
                if (dataProvider.hasCustomizeExcelCell && dataProvider.hasCustomizeExcelCell()) {
                    var value = cellData.sourceValue || cellData.value;
                    var modifiedExcelCell = this._callCustomizeExcelCell({
                        dataProvider: dataProvider,
                        value: value,
                        style: that._styleArray[styleArrayIndex],
                        sourceData: cellData.cellSourceData
                    });
                    if (modifiedExcelCell.value !== value) {
                        if (_typeof(modifiedExcelCell.value) !== _typeof(value) || "number" === typeof modifiedExcelCell.value && !isFinite(modifiedExcelCell.value)) {
                            var cellDataType = this._tryGetExcelCellDataType(modifiedExcelCell.value);
                            if ((0, _type.isDefined)(cellDataType)) {
                                cellData.type = cellDataType
                            }
                        }
                        switch (cellData.type) {
                            case VALID_TYPES.string:
                                cellData.value = this._appendString(modifiedExcelCell.value);
                                break;
                            case VALID_TYPES.date:
                                cellData.value = modifiedExcelCell.value;
                                break;
                            case VALID_TYPES.number:
                                var newValue = modifiedExcelCell.value;
                                var excelDateValue = this._tryGetExcelDateValue(newValue);
                                if ((0, _type.isDefined)(excelDateValue)) {
                                    newValue = excelDateValue
                                }
                                cellData.value = newValue;
                                break;
                            default:
                                cellData.value = modifiedExcelCell.value
                        }
                    }
                    cellStyleId = this._excelFile.registerCellFormat(modifiedExcelCell.style)
                }
                cellsArray.push({
                    style: cellStyleId,
                    value: cellData.value,
                    type: cellData.type
                })
            }
            if (!that._needSheetPr && dataProvider.getGroupLevel(rowIndex) > 0) {
                that._needSheetPr = true
            }
            result.push(cellsArray)
        }
        return result
    },
    _calculateWidth: function(pixelsWidth) {
        pixelsWidth = parseInt(pixelsWidth, 10);
        if (!pixelsWidth || pixelsWidth < 5) {
            pixelsWidth = 100
        }
        return Math.min(255, Math.floor((pixelsWidth - 5) / MAX_DIGIT_WIDTH_IN_PIXELS * 100 + .5) / 100)
    },
    _prepareStyleData: function() {
        var _this = this;
        var that = this;
        var styles = that._dataProvider.getStyles();
        that._dataProvider.getColumns().forEach(function(column) {
            that._colsArray.push(that._calculateWidth(column.width))
        });
        var fonts = [{
            size: 11,
            color: {
                theme: 1
            },
            name: "Calibri",
            family: 2,
            scheme: "minor",
            bold: false
        }, {
            size: 11,
            color: {
                theme: 1
            },
            name: "Calibri",
            family: 2,
            scheme: "minor",
            bold: true
        }];
        this._excelFile.registerFont(fonts[0]);
        this._excelFile.registerFont(fonts[1]);
        styles.forEach(function(style) {
            var numberFormat = that._tryConvertToExcelNumberFormat(style.format, style.dataType);
            if (!(0, _type.isDefined)(numberFormat)) {
                numberFormat = 0
            }
            that._styleArray.push({
                font: fonts[Number(!!style.bold)],
                numberFormat: numberFormat,
                alignment: {
                    vertical: "top",
                    wrapText: !!style.wrapText,
                    horizontal: style.alignment || "left"
                }
            })
        });
        that._styleArrayIndexToCellStyleIdMap = that._styleArray.map(function(item) {
            return _this._excelFile.registerCellFormat(item)
        })
    },
    _prepareCellData: function() {
        this._cellsArray = this._getDataArray()
    },
    _createXMLRelationships: function(xmlRelationships) {
        return this._getXMLTag("Relationships", [{
            name: "xmlns",
            value: OPEN_XML_FORMAT_URL + "/package/2006/relationships"
        }], xmlRelationships)
    },
    _createXMLRelationship: function(id, type, target) {
        return this._getXMLTag("Relationship", [{
            name: "Id",
            value: "rId" + id
        }, {
            name: "Type",
            value: OPEN_XML_FORMAT_URL + "/officeDocument/2006/relationships/" + type
        }, {
            name: "Target",
            value: target
        }])
    },
    _getWorkbookContent: function() {
        var content = '<bookViews><workbookView xWindow="0" yWindow="0" windowWidth="0" windowHeight="0"/></bookViews><sheets><sheet name="Sheet" sheetId="1" r:id="rId1" /></sheets><definedNames><definedName name="_xlnm.Print_Titles" localSheetId="0">Sheet!$1:$1</definedName><definedName name="_xlnm._FilterDatabase" hidden="0" localSheetId="0">Sheet!$A$1:$F$6332</definedName></definedNames>';
        return XML_TAG + this._getXMLTag("workbook", [{
            name: "xmlns:r",
            value: OPEN_XML_FORMAT_URL + "/officeDocument/2006/relationships"
        }, {
            name: "xmlns",
            value: OPEN_XML_FORMAT_URL + "/spreadsheetml/2006/main"
        }], content)
    },
    _getContentTypesContent: function() {
        return XML_TAG + '<Types xmlns="' + OPEN_XML_FORMAT_URL + '/package/2006/content-types"><Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml" /><Default Extension="xml" ContentType="application/xml" /><Override PartName="/xl/worksheets/sheet1.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml" /><Override PartName="/xl/styles.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.styles+xml" /><Override PartName="/xl/sharedStrings.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.sharedStrings+xml" /><Override PartName="/xl/workbook.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml" /></Types>'
    },
    _generateStylesXML: function() {
        var that = this;
        var folder = that._zip.folder(XL_FOLDER_NAME);
        var XML = "";
        XML += this._excelFile.generateNumberFormatsXml();
        XML += this._excelFile.generateFontsXml();
        XML += this._excelFile.generateFillsXml();
        XML += BASE_STYLE_XML2;
        XML += this._excelFile.generateCellFormatsXml();
        XML += that._getXMLTag("cellStyles", [{
            name: "count",
            value: 1
        }], that._getXMLTag("cellStyle", [{
            name: "name",
            value: "Normal"
        }, {
            name: "xfId",
            value: 0
        }, {
            name: "builtinId",
            value: 0
        }]));
        XML = XML_TAG + that._getXMLTag("styleSheet", [{
            name: "xmlns",
            value: OPEN_XML_FORMAT_URL + "/spreadsheetml/2006/main"
        }], XML);
        folder.file(STYLE_FILE_NAME, XML);
        that._styleArray = []
    },
    _generateStringsXML: function() {
        var folder = this._zip.folder(XL_FOLDER_NAME);
        var stringIndex;
        var stringsLength = this._stringArray.length;
        var sharedStringXml = XML_TAG;
        for (stringIndex = 0; stringIndex < stringsLength; stringIndex++) {
            this._stringArray[stringIndex] = this._getXMLTag("si", [], this._getXMLTag("t", [], this._stringArray[stringIndex]))
        }
        sharedStringXml += this._getXMLTag("sst", [{
            name: "xmlns",
            value: OPEN_XML_FORMAT_URL + "/spreadsheetml/2006/main"
        }, {
            name: "count",
            value: this._stringArray.length
        }, {
            name: "uniqueCount",
            value: this._stringArray.length
        }], this._stringArray.join(""));
        folder.file(SHAREDSTRING_FILE_NAME, sharedStringXml);
        this._stringArray = []
    },
    _getPaneXML: function() {
        var attributes = [{
            name: "activePane",
            value: "bottomLeft"
        }, {
            name: "state",
            value: "frozen"
        }];
        var frozenArea = this._dataProvider.getFrozenArea();
        if (!(frozenArea.x || frozenArea.y)) {
            return ""
        }
        if (frozenArea.x) {
            attributes.push({
                name: "xSplit",
                value: frozenArea.x
            })
        }
        if (frozenArea.y) {
            attributes.push({
                name: "ySplit",
                value: frozenArea.y
            })
        }
        attributes.push({
            name: "topLeftCell",
            value: this._convertToExcelCellRefAndTrackMaxIndex(frozenArea.y, frozenArea.x)
        });
        return this._getXMLTag("pane", attributes)
    },
    _getAutoFilterXML: function(maxCellIndex) {
        if (this._options.autoFilterEnabled) {
            return '<autoFilter ref="A' + this._dataProvider.getHeaderRowCount() + ":" + maxCellIndex + '" />'
        }
        return ""
    },
    _getIgnoredErrorsXML: function(maxCellIndex) {
        if (this._options.ignoreErrors) {
            return '<ignoredErrors><ignoredError sqref="A1:' + maxCellIndex + '" numberStoredAsText="1" /></ignoredErrors>'
        }
        return ""
    },
    _generateWorksheetXML: function() {
        var colIndex;
        var rowIndex;
        var cellData;
        var xmlCells;
        var xmlRows = [];
        var rowsLength = this._cellsArray.length;
        var cellsLength;
        var colsLength = this._colsArray.length;
        var rSpans = "1:" + colsLength;
        var headerRowCount = this._dataProvider.getHeaderRowCount ? this._dataProvider.getHeaderRowCount() : 1;
        var xmlResult = [WORKSHEET_HEADER_XML];
        xmlResult.push(this._needSheetPr ? GROUP_SHEET_PR_XML : SINGLE_SHEET_PR_XML);
        xmlResult.push('<dimension ref="A1:C1"/>');
        xmlResult.push("<sheetViews><sheetView ");
        xmlResult.push(this._rtlEnabled ? 'rightToLeft="1" ' : "");
        xmlResult.push('tabSelected="1" workbookViewId="0">');
        xmlResult.push(this._getPaneXML());
        xmlResult.push("</sheetView></sheetViews>");
        xmlResult.push('<sheetFormatPr defaultRowHeight="15"');
        xmlResult.push(' outlineLevelRow="' + (this._dataProvider.getRowsCount() > 0 ? this._dataProvider.getGroupLevel(0) : 0) + '"');
        xmlResult.push(' x14ac:dyDescent="0.25"/>');
        for (colIndex = 0; colIndex < colsLength; colIndex++) {
            this._colsArray[colIndex] = this._getXMLTag("col", [{
                name: "width",
                value: this._colsArray[colIndex]
            }, {
                name: "min",
                value: Number(colIndex) + 1
            }, {
                name: "max",
                value: Number(colIndex) + 1
            }, {
                name: "customWidth",
                value: 1
            }])
        }
        xmlResult.push(this._getXMLTag("cols", [], this._colsArray.join("")) + "<sheetData>");
        for (rowIndex = 0; rowIndex < rowsLength; rowIndex++) {
            xmlCells = [];
            cellsLength = this._cellsArray[rowIndex].length;
            for (colIndex = 0; colIndex < cellsLength; colIndex++) {
                rowIndex = Number(rowIndex);
                cellData = this._cellsArray[rowIndex][colIndex];
                xmlCells.push(this._getXMLTag("c", [{
                    name: "r",
                    value: this._convertToExcelCellRefAndTrackMaxIndex(rowIndex, colIndex)
                }, {
                    name: "s",
                    value: cellData.style
                }, {
                    name: "t",
                    value: cellData.type
                }], (0, _type.isDefined)(cellData.value) ? this._getXMLTag("v", [], cellData.value) : null))
            }
            xmlRows.push(this._getXMLTag("row", [{
                name: "r",
                value: Number(rowIndex) + 1
            }, {
                name: "spans",
                value: rSpans
            }, {
                name: "outlineLevel",
                value: rowIndex >= headerRowCount ? this._dataProvider.getGroupLevel(rowIndex) : 0
            }, {
                name: "x14ac:dyDescent",
                value: "0.25"
            }], xmlCells.join("")));
            this._cellsArray[rowIndex] = null;
            if (xmlRows.length > 1e4) {
                xmlResult.push(xmlRows.join(""));
                xmlRows = []
            }
        }
        xmlResult.push(xmlRows.join(""));
        xmlRows = [];
        var rightBottomCellRef = this._convertToExcelCellRef(this._maxRowIndex, this._maxColumnIndex);
        xmlResult.push("</sheetData>" + this._getAutoFilterXML(rightBottomCellRef) + this._generateMergingXML() + this._getIgnoredErrorsXML(rightBottomCellRef) + "</worksheet>");
        this._zip.folder(XL_FOLDER_NAME).folder(WORKSHEETS_FOLDER).file(WORKSHEET_FILE_NAME, xmlResult.join(""));
        this._colsArray = [];
        this._cellsArray = [];
        xmlResult = []
    },
    _generateMergingXML: function() {
        var k;
        var l;
        var cellIndex;
        var rowIndex;
        var rowsLength = (0, _type.isDefined)(this._dataProvider.getHeaderRowCount) ? this._dataProvider.getHeaderRowCount() : this._dataProvider.getRowsCount();
        var columnsLength = this._dataProvider.getColumns().length;
        var usedArea = [];
        var mergeArray = [];
        var mergeIndex;
        var mergeXML = "";
        for (rowIndex = 0; rowIndex < rowsLength; rowIndex++) {
            for (cellIndex = 0; cellIndex !== columnsLength; cellIndex++) {
                if (!(0, _type.isDefined)(usedArea[rowIndex]) || !(0, _type.isDefined)(usedArea[rowIndex][cellIndex])) {
                    var cellMerge = this._dataProvider.getCellMerging(rowIndex, cellIndex);
                    if (cellMerge.colspan || cellMerge.rowspan) {
                        mergeArray.push({
                            start: this._convertToExcelCellRefAndTrackMaxIndex(rowIndex, cellIndex),
                            end: this._convertToExcelCellRefAndTrackMaxIndex(rowIndex + (cellMerge.rowspan || 0), cellIndex + (cellMerge.colspan || 0))
                        });
                        for (k = rowIndex; k <= rowIndex + cellMerge.rowspan || 0; k++) {
                            for (l = cellIndex; l <= cellIndex + cellMerge.colspan || 0; l++) {
                                if (!(0, _type.isDefined)(usedArea[k])) {
                                    usedArea[k] = []
                                }
                                usedArea[k][l] = true
                            }
                        }
                    }
                }
            }
        }
        var mergeArrayLength = mergeArray.length;
        for (mergeIndex = 0; mergeIndex < mergeArrayLength; mergeIndex++) {
            mergeXML += this._getXMLTag("mergeCell", [{
                name: "ref",
                value: mergeArray[mergeIndex].start + ":" + mergeArray[mergeIndex].end
            }])
        }
        return mergeXML.length ? this._getXMLTag("mergeCells", [{
            name: "count",
            value: mergeArrayLength
        }], mergeXML) : ""
    },
    _generateCommonXML: function() {
        var relsFileContent = XML_TAG + this._createXMLRelationships(this._createXMLRelationship(1, "officeDocument", "xl/" + WORKBOOK_FILE_NAME));
        var folder = this._zip.folder(XL_FOLDER_NAME);
        var relsXML = XML_TAG;
        this._zip.folder("_" + RELATIONSHIP_PART_NAME).file("." + RELATIONSHIP_PART_NAME, relsFileContent);
        var xmlRelationships = this._createXMLRelationship(1, "worksheet", "worksheets/" + WORKSHEET_FILE_NAME) + this._createXMLRelationship(2, "styles", STYLE_FILE_NAME) + this._createXMLRelationship(3, "sharedStrings", SHAREDSTRING_FILE_NAME);
        relsXML += this._createXMLRelationships(xmlRelationships);
        folder.folder("_" + RELATIONSHIP_PART_NAME).file(WORKBOOK_FILE_NAME + ".rels", relsXML);
        folder.file(WORKBOOK_FILE_NAME, this._getWorkbookContent());
        this._zip.file(CONTENTTYPES_FILE_NAME, this._getContentTypesContent())
    },
    _generateContent: function() {
        this._prepareStyleData();
        this._prepareCellData();
        this._generateWorkXML();
        this._generateCommonXML()
    },
    _generateWorkXML: function() {
        this._generateStylesXML();
        this._generateStringsXML();
        this._generateWorksheetXML()
    },
    ctor: function(dataProvider, options) {
        this._rtlEnabled = options && !!options.rtlEnabled;
        this._options = options;
        this._maxRowIndex = 0;
        this._maxColumnIndex = 0;
        this._stringArray = [];
        this._stringHash = {};
        this._styleArray = [];
        this._colsArray = [];
        this._cellsArray = [];
        this._needSheetPr = false;
        this._dataProvider = dataProvider;
        this._excelFile = new _excel.default;
        if ((0, _type.isDefined)(ExcelCreator.JSZip)) {
            this._zip = new ExcelCreator.JSZip
        } else {
            this._zip = null
        }
    },
    _checkZipState: function() {
        if (!this._zip) {
            throw _ui.default.Error("E1041", "JSZip")
        }
    },
    ready: function() {
        return this._dataProvider.ready()
    },
    getData: function(isBlob) {
        var options = {
            type: isBlob ? "blob" : "base64",
            compression: "DEFLATE",
            mimeType: _file_saver.MIME_TYPES.EXCEL
        };
        var deferred = new _deferred.Deferred;
        this._checkZipState();
        this._generateContent();
        if (this._zip.generateAsync) {
            this._zip.generateAsync(options).then(deferred.resolve)
        } else {
            deferred.resolve(this._zip.generate(options))
        }
        return deferred
    }
});
exports.ExcelCreator = ExcelCreator;
ExcelCreator.JSZip = _jszip.default;

function getData(data, options) {
    var excelCreator = new ExcelCreator(data, options);
    excelCreator._checkZipState();
    return excelCreator.ready().then(function() {
        return excelCreator.getData((0, _type.isFunction)((0, _window.getWindow)().Blob))
    })
}
