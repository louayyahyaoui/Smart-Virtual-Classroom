/**
 * DevExtreme (exporter/excel/excel.tag_helper.js)
 * Version: 20.2.6
 * Build date: Tue Mar 16 2021
 *
 * Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
exports.default = void 0;
var _type = require("../../core/utils/type");
var tagHelper = {
    toXml: function(tagName, attributes, content) {
        var result = ["<", tagName];
        for (var attributeName in attributes) {
            var attributeValue = attributes[attributeName];
            if ((0, _type.isDefined)(attributeValue)) {
                result.push(" ", attributeName, '="', attributeValue, '"')
            }
        }
        if ((0, _type.isDefined)(content) && "" !== content) {
            result.push(">", content, "</", tagName, ">")
        } else {
            result.push(" />")
        }
        return result.join("")
    }
};
var _default = tagHelper;
exports.default = _default;
module.exports = exports.default;
