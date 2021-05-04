/**
 * DevExtreme (core/utils/size.js)
 * Version: 20.2.6
 * Build date: Tue Mar 16 2021
 *
 * Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
exports.parseHeight = exports.getVisibleHeight = exports.getVerticalOffsets = exports.addOffsetToMinHeight = exports.addOffsetToMaxHeight = exports.getElementBoxParams = exports.getSize = void 0;
var _window = require("../../core/utils/window");
var _type = require("../utils/type");
var window = (0, _window.getWindow)();
var SPECIAL_HEIGHT_VALUES = ["auto", "none", "inherit", "initial"];
var getSizeByStyles = function(elementStyles, styles) {
    var result = 0;
    styles.forEach(function(style) {
        result += parseFloat(elementStyles[style]) || 0
    });
    return result
};
var getElementBoxParams = function(name, elementStyles) {
    var beforeName = "width" === name ? "Left" : "Top";
    var afterName = "width" === name ? "Right" : "Bottom";
    return {
        padding: getSizeByStyles(elementStyles, ["padding" + beforeName, "padding" + afterName]),
        border: getSizeByStyles(elementStyles, ["border" + beforeName + "Width", "border" + afterName + "Width"]),
        margin: getSizeByStyles(elementStyles, ["margin" + beforeName, "margin" + afterName])
    }
};
exports.getElementBoxParams = getElementBoxParams;
var getBoxSizingOffset = function(name, elementStyles, boxParams) {
    var size = elementStyles[name];
    if ("border-box" === elementStyles.boxSizing && size.length && "%" !== size[size.length - 1]) {
        return boxParams.border + boxParams.padding
    }
    return 0
};
var getSize = function(element, name, include) {
    var elementStyles = window.getComputedStyle(element);
    var boxParams = getElementBoxParams(name, elementStyles);
    var clientRect = element.getClientRects().length;
    var boundingClientRect = element.getBoundingClientRect()[name];
    var result = clientRect ? boundingClientRect : 0;
    if (result <= 0) {
        result = parseFloat(elementStyles[name] || element.style[name]) || 0;
        result -= getBoxSizingOffset(name, elementStyles, boxParams)
    } else {
        result -= boxParams.padding + boxParams.border
    }
    if (include.paddings) {
        result += boxParams.padding
    }
    if (include.borders) {
        result += boxParams.border
    }
    if (include.margins) {
        result += boxParams.margin
    }
    return result
};
exports.getSize = getSize;
var getContainerHeight = function(container) {
    return (0, _type.isWindow)(container) ? container.innerHeight : container.offsetHeight
};
var parseHeight = function(value, container) {
    if (value.indexOf("px") > 0) {
        value = parseInt(value.replace("px", ""))
    } else {
        if (value.indexOf("%") > 0) {
            value = parseInt(value.replace("%", "")) * getContainerHeight(container) / 100
        } else {
            if (!isNaN(value)) {
                value = parseInt(value)
            }
        }
    }
    return value
};
exports.parseHeight = parseHeight;
var getHeightWithOffset = function(value, offset, container) {
    if (!value) {
        return null
    }
    if (SPECIAL_HEIGHT_VALUES.indexOf(value) > -1) {
        return offset ? null : value
    }
    if ((0, _type.isString)(value)) {
        value = parseHeight(value, container)
    }
    if ((0, _type.isNumeric)(value)) {
        return Math.max(0, value + offset)
    }
    var operationString = offset < 0 ? " - " : " ";
    return "calc(" + value + operationString + Math.abs(offset) + "px)"
};
var addOffsetToMaxHeight = function(value, offset, container) {
    var maxHeight = getHeightWithOffset(value, offset, container);
    return null !== maxHeight ? maxHeight : "none"
};
exports.addOffsetToMaxHeight = addOffsetToMaxHeight;
var addOffsetToMinHeight = function(value, offset, container) {
    var minHeight = getHeightWithOffset(value, offset, container);
    return null !== minHeight ? minHeight : 0
};
exports.addOffsetToMinHeight = addOffsetToMinHeight;
var getVerticalOffsets = function(element, withMargins) {
    if (!element) {
        return 0
    }
    var boxParams = getElementBoxParams("height", window.getComputedStyle(element));
    return boxParams.padding + boxParams.border + (withMargins ? boxParams.margin : 0)
};
exports.getVerticalOffsets = getVerticalOffsets;
var getVisibleHeight = function(element) {
    if (element) {
        var boundingClientRect = element.getBoundingClientRect();
        if (boundingClientRect.height) {
            return boundingClientRect.height
        }
    }
    return 0
};
exports.getVisibleHeight = getVisibleHeight;
