/**
 * DevExtreme (viz/tree_map/tiling.slice_and_dice.js)
 * Version: 20.2.6
 * Build date: Tue Mar 16 2021
 *
 * Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
exports.default = void 0;
var _tiling = require("./tiling");

function sliceAndDice(data) {
    var items = data.items;
    var sidesData = (0, _tiling.buildSidesData)(data.rect, data.directions, data.isRotated ? 1 : 0);
    (0, _tiling.calculateRectangles)(items, 0, data.rect, sidesData, {
        sum: data.sum,
        count: items.length,
        side: sidesData.variedSide
    })
}(0, _tiling.addAlgorithm)("sliceanddice", sliceAndDice);
var _default = sliceAndDice;
exports.default = _default;
module.exports = exports.default;
