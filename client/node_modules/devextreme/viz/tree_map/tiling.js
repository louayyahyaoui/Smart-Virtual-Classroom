/**
 * DevExtreme (viz/tree_map/tiling.js)
 * Version: 20.2.6
 * Build date: Tue Mar 16 2021
 *
 * Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
exports.getAlgorithm = getAlgorithm;
exports.addAlgorithm = addAlgorithm;
exports.setDefaultAlgorithm = setDefaultAlgorithm;
exports.buildSidesData = buildSidesData;
exports.calculateRectangles = calculateRectangles;
exports.getStaticSideIndex = void 0;
var _type = require("../../core/utils/type");
var _utils = require("../core/utils");
var _round = Math.round;
var algorithms = {};
var defaultAlgorithm;

function getAlgorithm(value) {
    return algorithms[(0, _utils.normalizeEnum)(value)] || (0, _type.isFunction)(value) && value || defaultAlgorithm
}

function addAlgorithm(name, callback) {
    algorithms[name] = callback
}

function setDefaultAlgorithm(name) {
    defaultAlgorithm = algorithms[name]
}
var directionToIndexOffsets = {};
directionToIndexOffsets[-1] = [2, 0];
directionToIndexOffsets[1] = [0, 2];
var getStaticSideIndex = function(rect) {
    return rect[2] - rect[0] < rect[3] - rect[1] ? 0 : 1
};
exports.getStaticSideIndex = getStaticSideIndex;

function buildSidesData(rect, directions, _staticSideIndex) {
    var staticSideIndex = void 0 !== _staticSideIndex ? _staticSideIndex : getStaticSideIndex(rect);
    var variedSideIndex = 1 - staticSideIndex;
    var staticSideDirection = directions[staticSideIndex];
    var variedSideDirection = directions[variedSideIndex];
    var staticSideIndexOffsets = directionToIndexOffsets[staticSideDirection];
    var variedSideIndexOffsets = directionToIndexOffsets[variedSideDirection];
    return {
        staticSide: rect[2 + staticSideIndex] - rect[staticSideIndex],
        variedSide: rect[2 + variedSideIndex] - rect[variedSideIndex],
        static1: staticSideIndex + staticSideIndexOffsets[0],
        static2: staticSideIndex + staticSideIndexOffsets[1],
        varied1: variedSideIndex + variedSideIndexOffsets[0],
        varied2: variedSideIndex + variedSideIndexOffsets[1],
        staticDir: staticSideDirection,
        variedDir: variedSideDirection
    }
}

function calculateRectangles(nodes, head, totalRect, sidesData, rowData) {
    var i;
    var ii;
    var variedSidePart = [0, 0, 0, 0];
    var static1 = sidesData.static1;
    var static2 = sidesData.static2;
    var position = totalRect[static1];
    var dir = sidesData.staticDir;
    var side = sidesData.staticSide;
    var sum = rowData.sum;
    var rect;
    var delta;
    variedSidePart[sidesData.varied1] = totalRect[sidesData.varied1];
    variedSidePart[sidesData.varied2] = totalRect[sidesData.varied1] + sidesData.variedDir * rowData.side;
    for (i = head, ii = head + rowData.count; i < ii; ++i) {
        rect = variedSidePart.slice();
        rect[static1] = position;
        delta = _round(side * nodes[i].value / sum) || 0;
        sum -= nodes[i].value;
        side -= delta;
        position += dir * delta;
        rect[static2] = position;
        nodes[i].rect = rect
    }
    totalRect[sidesData.varied1] = variedSidePart[sidesData.varied2]
}
