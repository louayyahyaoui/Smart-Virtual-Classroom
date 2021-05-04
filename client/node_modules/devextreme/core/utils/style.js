/**
 * DevExtreme (core/utils/style.js)
 * Version: 20.2.6
 * Build date: Tue Mar 16 2021
 *
 * Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
exports.setHeight = exports.setWidth = exports.normalizeStyleProp = exports.stylePropPrefix = exports.styleProp = void 0;
var _inflector = require("./inflector");
var _call_once = _interopRequireDefault(require("./call_once"));
var _type = require("./type");
var _dom_adapter = _interopRequireDefault(require("../dom_adapter"));

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        "default": obj
    }
}
var jsPrefixes = ["", "Webkit", "Moz", "O", "Ms"];
var cssPrefixes = {
    "": "",
    Webkit: "-webkit-",
    Moz: "-moz-",
    O: "-o-",
    ms: "-ms-"
};
var getStyles = (0, _call_once.default)(function() {
    return _dom_adapter.default.createElement("dx").style
});
var forEachPrefixes = function(prop, callBack) {
    prop = (0, _inflector.camelize)(prop, true);
    var result;
    for (var i = 0, cssPrefixesCount = jsPrefixes.length; i < cssPrefixesCount; i++) {
        var jsPrefix = jsPrefixes[i];
        var prefixedProp = jsPrefix + prop;
        var lowerPrefixedProp = (0, _inflector.camelize)(prefixedProp);
        result = callBack(lowerPrefixedProp, jsPrefix);
        if (void 0 === result) {
            result = callBack(prefixedProp, jsPrefix)
        }
        if (void 0 !== result) {
            break
        }
    }
    return result || ""
};
var styleProp = function(name) {
    if (name in getStyles()) {
        return name
    }
    var originalName = name;
    name = name.charAt(0).toUpperCase() + name.substr(1);
    for (var i = 1; i < jsPrefixes.length; i++) {
        var prefixedProp = jsPrefixes[i].toLowerCase() + name;
        if (prefixedProp in getStyles()) {
            return prefixedProp
        }
    }
    return originalName
};
exports.styleProp = styleProp;
var stylePropPrefix = function(prop) {
    return forEachPrefixes(prop, function(specific, jsPrefix) {
        if (specific in getStyles()) {
            return cssPrefixes[jsPrefix]
        }
    })
};
exports.stylePropPrefix = stylePropPrefix;
var pxExceptions = ["fillOpacity", "columnCount", "flexGrow", "flexShrink", "fontWeight", "lineHeight", "opacity", "zIndex", "zoom"];
var normalizeStyleProp = function(prop, value) {
    if ((0, _type.isNumeric)(value) && pxExceptions.indexOf(prop) === -1) {
        value += "px"
    }
    return value
};
exports.normalizeStyleProp = normalizeStyleProp;
var setDimensionProperty = function(elements, propertyName, value) {
    if (elements) {
        value = (0, _type.isNumeric)(value) ? value += "px" : value;
        for (var i = 0; i < elements.length; ++i) {
            elements[i].style[propertyName] = value
        }
    }
};
var setWidth = function(elements, value) {
    setDimensionProperty(elements, "width", value)
};
exports.setWidth = setWidth;
var setHeight = function(elements, value) {
    setDimensionProperty(elements, "height", value)
};
exports.setHeight = setHeight;
