/**
 * DevExtreme (viz/tree_map/colorizing.js)
 * Version: 20.2.6
 * Build date: Tue Mar 16 2021
 *
 * Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
exports.getColorizer = getColorizer;
exports.addColorizer = addColorizer;
exports.setDefaultColorizer = setDefaultColorizer;
exports.createColorCodeGetter = createColorCodeGetter;
var _utils = require("../core/utils");
var _common = require("../../core/utils/common");
var colorizers = {};
var defaultColorizerName;

function wrapLeafColorGetter(getter) {
    return function(node) {
        return !node.isNode() ? getter(node) : void 0
    }
}

function wrapGroupColorGetter(getter) {
    return function(node) {
        var parent = !node.isNode() && node.parent;
        return parent ? parent._groupColor = parent._groupColor || getter(parent) : void 0
    }
}

function getColorizer(options, themeManager, root) {
    var type = (0, _utils.normalizeEnum)(options.type || defaultColorizerName);
    var colorizer = colorizers[type] && colorizers[type](options, themeManager, root);
    return colorizer ? (options.colorizeGroups ? wrapGroupColorGetter : wrapLeafColorGetter)(colorizer) : _common.noop
}

function addColorizer(name, colorizer) {
    colorizers[name] = colorizer
}

function setDefaultColorizer(name) {
    defaultColorizerName = name
}

function getValueAsColorCode(node) {
    return node.value
}

function createColorCode(colorCodeField) {
    return function(node) {
        return Number(node.data[colorCodeField])
    }
}

function createColorCodeGetter(options) {
    return options.colorCodeField ? createColorCode(options.colorCodeField) : getValueAsColorCode
}
