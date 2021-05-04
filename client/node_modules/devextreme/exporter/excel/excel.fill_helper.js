/**
 * DevExtreme (exporter/excel/excel.fill_helper.js)
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
var _excel2 = _interopRequireDefault(require("./excel.pattern_fill_helper"));

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        "default": obj
    }
}
var fillHelper = {
    tryCreateTag: function(sourceObj) {
        var result = null;
        if ((0, _type.isDefined)(sourceObj)) {
            result = {
                patternFill: _excel2.default.tryCreateTag(sourceObj.patternFill)
            };
            if (fillHelper.isEmpty(result)) {
                result = null
            }
        }
        return result
    },
    tryCreateFillFromSimpleFormat: function() {
        var _ref = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
            backgroundColor = _ref.backgroundColor,
            fillPatternType = _ref.fillPatternType,
            fillPatternColor = _ref.fillPatternColor;
        if ((0, _type.isDefined)(backgroundColor) && !((0, _type.isDefined)(fillPatternType) && (0, _type.isDefined)(fillPatternColor))) {
            return {
                patternFill: {
                    patternType: "solid",
                    foregroundColor: {
                        rgb: backgroundColor
                    }
                }
            }
        } else {
            if ((0, _type.isDefined)(fillPatternType) && (0, _type.isDefined)(fillPatternColor)) {
                return {
                    patternFill: {
                        patternType: fillPatternType,
                        foregroundColor: {
                            rgb: fillPatternColor
                        },
                        backgroundColor: {
                            rgb: backgroundColor
                        }
                    }
                }
            }
        }
    },
    copySimpleFormat: function(source, target) {
        if (void 0 !== source.backgroundColor) {
            target.backgroundColor = source.backgroundColor
        }
        if (void 0 !== source.fillPatternType) {
            target.fillPatternType = source.fillPatternType
        }
        if (void 0 !== source.fillPatternColor) {
            target.fillPatternColor = source.fillPatternColor
        }
    },
    copy: function(source) {
        var result = null;
        if ((0, _type.isDefined)(source)) {
            result = {};
            if (void 0 !== source.patternFill) {
                result.patternFill = _excel2.default.copy(source.patternFill)
            }
        }
        return result
    },
    areEqual: function(leftTag, rightTag) {
        return fillHelper.isEmpty(leftTag) && fillHelper.isEmpty(rightTag) || (0, _type.isDefined)(leftTag) && (0, _type.isDefined)(rightTag) && _excel2.default.areEqual(leftTag.patternFill, rightTag.patternFill)
    },
    isEmpty: function(tag) {
        return !(0, _type.isDefined)(tag) || _excel2.default.isEmpty(tag.patternFill)
    },
    toXml: function(tag) {
        return _excel.default.toXml("fill", {}, _excel2.default.toXml(tag.patternFill))
    }
};
var _default = fillHelper;
exports.default = _default;
module.exports = exports.default;
