/**
 * DevExtreme (renovation/ui/pager/utils/get_element_width.js)
 * Version: 20.2.6
 * Build date: Tue Mar 16 2021
 *
 * Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
exports.getElementStyle = getElementStyle;
exports.getElementWidth = getElementWidth;
exports.getElementMinWidth = getElementMinWidth;
var _get_computed_style = _interopRequireDefault(require("./get_computed_style"));

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        "default": obj
    }
}

function toNumber(attribute) {
    return attribute ? Number(attribute.replace("px", "")) : 0
}

function getElementStyle(name, element) {
    var computedStyle = (0, _get_computed_style.default)(element) || {};
    return toNumber(computedStyle[name])
}

function getElementWidth(element) {
    return getElementStyle("width", element)
}

function getElementMinWidth(element) {
    return getElementStyle("minWidth", element)
}
