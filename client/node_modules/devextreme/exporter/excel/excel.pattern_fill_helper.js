/**
 * DevExtreme (exporter/excel/excel.pattern_fill_helper.js)
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
var _excel2 = _interopRequireDefault(require("./excel.color_helper"));

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        "default": obj
    }
}
var patternFillHelper = {
    tryCreateTag: function(sourceObj) {
        var result = null;
        if ((0, _type.isDefined)(sourceObj)) {
            result = {
                patternType: sourceObj.patternType,
                backgroundColor: _excel2.default.tryCreateTag(sourceObj.backgroundColor),
                foregroundColor: _excel2.default.tryCreateTag(sourceObj.foregroundColor)
            };
            if (patternFillHelper.isEmpty(result)) {
                result = null
            }
        }
        return result
    },
    copy: function(source) {
        var result = null;
        if ((0, _type.isDefined)(source)) {
            result = {};
            if (void 0 !== source.patternType) {
                result.patternType = source.patternType
            }
            if (void 0 !== source.backgroundColor) {
                result.backgroundColor = _excel2.default.copy(source.backgroundColor)
            }
            if (void 0 !== source.foregroundColor) {
                result.foregroundColor = _excel2.default.copy(source.foregroundColor)
            }
        }
        return result
    },
    areEqual: function(leftTag, rightTag) {
        return patternFillHelper.isEmpty(leftTag) && patternFillHelper.isEmpty(rightTag) || (0, _type.isDefined)(leftTag) && (0, _type.isDefined)(rightTag) && leftTag.patternType === rightTag.patternType && _excel2.default.areEqual(leftTag.backgroundColor, rightTag.backgroundColor) && _excel2.default.areEqual(leftTag.foregroundColor, rightTag.foregroundColor)
    },
    isEmpty: function(tag) {
        return !(0, _type.isDefined)(tag) || !(0, _type.isDefined)(tag.patternType)
    },
    toXml: function(tag) {
        var content = [(0, _type.isDefined)(tag.foregroundColor) ? _excel2.default.toXml("fgColor", tag.foregroundColor) : "", (0, _type.isDefined)(tag.backgroundColor) ? _excel2.default.toXml("bgColor", tag.backgroundColor) : ""].join("");
        return _excel.default.toXml("patternFill", {
            patternType: tag.patternType
        }, content)
    }
};
var _default = patternFillHelper;
exports.default = _default;
module.exports = exports.default;
