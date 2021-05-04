/**
 * DevExtreme (exporter/excel/excel.file.js)
 * Version: 20.2.6
 * Build date: Tue Mar 16 2021
 *
 * Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
exports.default = void 0;
var _type = require("../../core/utils/type");
var _excel = _interopRequireDefault(require("./excel.tag_helper"));
var _excel2 = _interopRequireDefault(require("./excel.cell_format_helper"));
var _excel3 = _interopRequireDefault(require("./excel.fill_helper"));
var _excel4 = _interopRequireDefault(require("./excel.font_helper"));
var _excel5 = _interopRequireDefault(require("./excel.number_format_helper"));

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        "default": obj
    }
}
var ExcelFile = function() {
    function ExcelFile() {
        this._cellFormatTags = [];
        this._fillTags = [];
        this._fontTags = [];
        this._numberFormatTags = [];
        this._fillTags.push(_excel3.default.tryCreateTag({
            patternFill: {
                patternType: "none"
            }
        }))
    }
    var _proto = ExcelFile.prototype;
    _proto.registerCellFormat = function(cellFormat) {
        var result;
        var cellFormatTag = _excel2.default.tryCreateTag(cellFormat, {
            registerFill: this.registerFill.bind(this),
            registerFont: this.registerFont.bind(this),
            registerNumberFormat: this.registerNumberFormat.bind(this)
        });
        if ((0, _type.isDefined)(cellFormatTag)) {
            for (var i = 0; i < this._cellFormatTags.length; i++) {
                if (_excel2.default.areEqual(this._cellFormatTags[i], cellFormatTag)) {
                    result = i;
                    break
                }
            }
            if (void 0 === result) {
                result = this._cellFormatTags.push(cellFormatTag) - 1
            }
        }
        return result
    };
    ExcelFile.copyCellFormat = function(source) {
        return _excel2.default.copy(source)
    };
    _proto.generateCellFormatsXml = function() {
        var cellFormatTagsAsXmlStringsArray = this._cellFormatTags.map(function(tag) {
            return _excel2.default.toXml(tag)
        });
        return _excel.default.toXml("cellXfs", {
            count: cellFormatTagsAsXmlStringsArray.length
        }, cellFormatTagsAsXmlStringsArray.join(""))
    };
    _proto.registerFill = function(fill) {
        var result;
        var fillTag = _excel3.default.tryCreateTag(fill);
        if ((0, _type.isDefined)(fillTag)) {
            for (var i = 0; i < this._fillTags.length; i++) {
                if (_excel3.default.areEqual(this._fillTags[i], fillTag)) {
                    result = i;
                    break
                }
            }
            if (void 0 === result) {
                if (this._fillTags.length < 2) {
                    this._fillTags.push(_excel3.default.tryCreateTag({
                        patternFill: {
                            patternType: "Gray125"
                        }
                    }))
                }
                result = this._fillTags.push(fillTag) - 1
            }
        }
        return result
    };
    _proto.generateFillsXml = function() {
        var tagsAsXmlStringsArray = this._fillTags.map(function(tag) {
            return _excel3.default.toXml(tag)
        });
        return _excel.default.toXml("fills", {
            count: tagsAsXmlStringsArray.length
        }, tagsAsXmlStringsArray.join(""))
    };
    _proto.registerFont = function(font) {
        var result;
        var fontTag = _excel4.default.tryCreateTag(font);
        if ((0, _type.isDefined)(fontTag)) {
            for (var i = 0; i < this._fontTags.length; i++) {
                if (_excel4.default.areEqual(this._fontTags[i], fontTag)) {
                    result = i;
                    break
                }
            }
            if (void 0 === result) {
                result = this._fontTags.push(fontTag) - 1
            }
        }
        return result
    };
    _proto.generateFontsXml = function() {
        var xmlStringsArray = this._fontTags.map(function(tag) {
            return _excel4.default.toXml(tag)
        });
        return _excel.default.toXml("fonts", {
            count: xmlStringsArray.length
        }, xmlStringsArray.join(""))
    };
    _proto._convertNumberFormatIndexToId = function(index) {
        var CUSTOM_FORMAT_ID_START_VALUE = 165;
        return CUSTOM_FORMAT_ID_START_VALUE + index
    };
    _proto.registerNumberFormat = function(numberFormat) {
        var result;
        var tag = _excel5.default.tryCreateTag(numberFormat);
        if ((0, _type.isDefined)(tag)) {
            for (var i = 0; i < this._numberFormatTags.length; i++) {
                if (_excel5.default.areEqual(this._numberFormatTags[i], tag)) {
                    result = this._numberFormatTags[i][_excel5.default.ID_PROPERTY_NAME];
                    break
                }
            }
            if (void 0 === result) {
                tag[_excel5.default.ID_PROPERTY_NAME] = this._convertNumberFormatIndexToId(this._numberFormatTags.length);
                result = tag[_excel5.default.ID_PROPERTY_NAME];
                this._numberFormatTags.push(tag)
            }
        }
        return result
    };
    _proto.generateNumberFormatsXml = function() {
        if (this._numberFormatTags.length > 0) {
            var xmlStringsArray = this._numberFormatTags.map(function(tag) {
                return _excel5.default.toXml(tag)
            });
            return _excel.default.toXml("numFmts", {
                count: xmlStringsArray.length
            }, xmlStringsArray.join(""))
        } else {
            return ""
        }
    };
    return ExcelFile
}();
exports.default = ExcelFile;
module.exports = exports.default;
