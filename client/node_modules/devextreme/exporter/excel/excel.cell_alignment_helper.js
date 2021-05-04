/**
 * DevExtreme (exporter/excel/excel.cell_alignment_helper.js)
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

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        "default": obj
    }
}
var cellAlignmentHelper = {
    tryCreateTag: function(sourceObj) {
        var result = null;
        if ((0, _type.isDefined)(sourceObj)) {
            result = {
                vertical: sourceObj.vertical,
                wrapText: sourceObj.wrapText,
                horizontal: sourceObj.horizontal
            };
            if (cellAlignmentHelper.isEmpty(result)) {
                result = null
            }
        }
        return result
    },
    copy: function(source) {
        var result = null;
        if ((0, _type.isDefined)(source)) {
            result = {};
            if (void 0 !== source.horizontal) {
                result.horizontal = source.horizontal
            }
            if (void 0 !== source.vertical) {
                result.vertical = source.vertical
            }
            if (void 0 !== source.wrapText) {
                result.wrapText = source.wrapText
            }
        }
        return result
    },
    areEqual: function(leftTag, rightTag) {
        return cellAlignmentHelper.isEmpty(leftTag) && cellAlignmentHelper.isEmpty(rightTag) || (0, _type.isDefined)(leftTag) && (0, _type.isDefined)(rightTag) && leftTag.vertical === rightTag.vertical && leftTag.wrapText === rightTag.wrapText && leftTag.horizontal === rightTag.horizontal
    },
    isEmpty: function(tag) {
        return !(0, _type.isDefined)(tag) || !(0, _type.isDefined)(tag.vertical) && !(0, _type.isDefined)(tag.wrapText) && !(0, _type.isDefined)(tag.horizontal)
    },
    toXml: function(tag) {
        return _excel.default.toXml("alignment", {
            vertical: tag.vertical,
            wrapText: (0, _type.isDefined)(tag.wrapText) ? Number(tag.wrapText) : void 0,
            horizontal: tag.horizontal
        })
    }
};
var _default = cellAlignmentHelper;
exports.default = _default;
module.exports = exports.default;
