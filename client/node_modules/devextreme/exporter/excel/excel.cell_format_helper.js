/**
 * DevExtreme (exporter/excel/excel.cell_format_helper.js)
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
var _excel2 = _interopRequireDefault(require("./excel.cell_alignment_helper"));
var _excel3 = _interopRequireDefault(require("./excel.fill_helper"));
var _excel4 = _interopRequireDefault(require("./excel.font_helper"));

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        "default": obj
    }
}
var cellFormatHelper = {
    tryCreateTag: function(sourceObj, sharedItemsContainer) {
        var result = null;
        if ((0, _type.isDefined)(sourceObj)) {
            var numberFormatId;
            if ("number" === typeof sourceObj.numberFormat) {
                numberFormatId = sourceObj.numberFormat
            } else {
                numberFormatId = sharedItemsContainer.registerNumberFormat(sourceObj.numberFormat)
            }
            var fill = sourceObj.fill;
            if (!(0, _type.isDefined)(fill)) {
                fill = _excel3.default.tryCreateFillFromSimpleFormat(sourceObj)
            }
            result = {
                numberFormatId: numberFormatId,
                alignment: _excel2.default.tryCreateTag(sourceObj.alignment),
                fontId: sharedItemsContainer.registerFont(sourceObj.font),
                fillId: sharedItemsContainer.registerFill(fill)
            };
            if (cellFormatHelper.isEmpty(result)) {
                result = null
            }
        }
        return result
    },
    copy: function(source) {
        var result;
        if (null === source) {
            result = null
        } else {
            if ((0, _type.isDefined)(source)) {
                result = {};
                if (void 0 !== source.numberFormat) {
                    result.numberFormat = source.numberFormat
                }
                if (void 0 !== source.fill) {
                    result.fill = _excel3.default.copy(source.fill)
                } else {
                    _excel3.default.copySimpleFormat(source, result)
                }
                if (void 0 !== source.alignment) {
                    result.alignment = _excel2.default.copy(source.alignment)
                }
                if (void 0 !== source.font) {
                    result.font = _excel4.default.copy(source.font)
                }
            }
        }
        return result
    },
    areEqual: function(leftTag, rightTag) {
        return cellFormatHelper.isEmpty(leftTag) && cellFormatHelper.isEmpty(rightTag) || (0, _type.isDefined)(leftTag) && (0, _type.isDefined)(rightTag) && leftTag.fontId === rightTag.fontId && leftTag.numberFormatId === rightTag.numberFormatId && leftTag.fillId === rightTag.fillId && _excel2.default.areEqual(leftTag.alignment, rightTag.alignment)
    },
    isEmpty: function(tag) {
        return !(0, _type.isDefined)(tag) || !(0, _type.isDefined)(tag.fontId) && !(0, _type.isDefined)(tag.numberFormatId) && !(0, _type.isDefined)(tag.fillId) && _excel2.default.isEmpty(tag.alignment)
    },
    toXml: function(tag) {
        var isAlignmentEmpty = _excel2.default.isEmpty(tag.alignment);
        var applyNumberFormat;
        if ((0, _type.isDefined)(tag.numberFormatId)) {
            applyNumberFormat = tag.numberFormatId > 0 ? 1 : 0
        }
        return _excel.default.toXml("xf", {
            xfId: 0,
            applyAlignment: isAlignmentEmpty ? null : 1,
            fontId: tag.fontId,
            applyNumberFormat: applyNumberFormat,
            fillId: tag.fillId,
            numFmtId: tag.numberFormatId
        }, isAlignmentEmpty ? null : _excel2.default.toXml(tag.alignment))
    }
};
var _default = cellFormatHelper;
exports.default = _default;
module.exports = exports.default;
