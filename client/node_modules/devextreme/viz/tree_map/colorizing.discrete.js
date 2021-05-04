/**
 * DevExtreme (viz/tree_map/colorizing.discrete.js)
 * Version: 20.2.6
 * Build date: Tue Mar 16 2021
 *
 * Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
exports.default = void 0;
var _colorizing = require("./colorizing");

function discreteColorizer(options, themeManager, root) {
    var palette = themeManager.createPalette(options.palette, {
        useHighlight: true,
        extensionMode: options.paletteExtensionMode,
        count: options.colorizeGroups ? getNodesCount(root) : getLeafsCount(root)
    });
    return (options.colorizeGroups ? discreteGroupColorizer : discreteLeafColorizer)(palette, root)
}

function getLeafsCount(root) {
    var allNodes = root.nodes.slice();
    var i;
    var ii = allNodes.length;
    var count = 0;
    var node;
    for (i = 0; i < ii; ++i) {
        node = allNodes[i];
        if (node.isNode()) {
            count = Math.max(count, getLeafsCount(node))
        } else {
            count += 1
        }
    }
    return count
}

function discreteLeafColorizer(palette) {
    var colors = palette.generateColors();
    return function(node) {
        return colors[node.index]
    }
}

function getNodesCount(root) {
    var allNodes = root.nodes.slice();
    var i;
    var ii = allNodes.length;
    var count = 0;
    var node;
    for (i = 0; i < ii; ++i) {
        node = allNodes[i];
        if (node.isNode()) {
            count += getNodesCount(node) + 1
        }
    }
    return count
}

function prepareDiscreteGroupColors(palette, root) {
    var colors = {};
    var allNodes = root.nodes.slice();
    var i;
    var ii = allNodes.length;
    var node;
    for (i = 0; i < ii; ++i) {
        node = allNodes[i];
        if (node.isNode()) {
            allNodes = allNodes.concat(node.nodes);
            ii = allNodes.length
        } else {
            if (!colors[node.parent._id]) {
                colors[node.parent._id] = palette.getNextColor()
            }
        }
    }
    return colors
}

function discreteGroupColorizer(palette, root) {
    var colors = prepareDiscreteGroupColors(palette, root);
    return function(node) {
        return colors[node._id]
    }
}(0, _colorizing.addColorizer)("discrete", discreteColorizer);
var _default = discreteColorizer;
exports.default = _default;
module.exports = exports.default;
