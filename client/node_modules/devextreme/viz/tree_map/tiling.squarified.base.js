/**
 * DevExtreme (viz/tree_map/tiling.squarified.base.js)
 * Version: 20.2.6
 * Build date: Tue Mar 16 2021
 *
 * Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
exports.default = _default;
var _tiling = require("./tiling");
var _max = Math.max;
var _round = Math.round;

function compare(a, b) {
    return b.value - a.value
}

function getAspectRatio(value) {
    return _max(value, 1 / value)
}

function findAppropriateCollection(nodes, head, context) {
    var bestAspectRatio = 1 / 0;
    var nextAspectRatio;
    var sum = 0;
    var nextSum;
    var i;
    var j;
    var ii = nodes.length;
    var coeff = context.areaToValue / context.staticSide;
    var totalAspectRatio;
    for (i = head; i < ii;) {
        nextSum = sum + nodes[i].value;
        totalAspectRatio = context.staticSide / coeff / nextSum;
        nextAspectRatio = 0;
        for (j = head; j <= i; ++j) {
            nextAspectRatio = context.accumulate(nextAspectRatio, getAspectRatio(totalAspectRatio * nodes[j].value / nextSum), j - head + 1)
        }
        if (nextAspectRatio < bestAspectRatio) {
            bestAspectRatio = nextAspectRatio;
            sum = nextSum;
            ++i
        } else {
            break
        }
    }
    return {
        sum: sum,
        count: i - head,
        side: _round(coeff * sum)
    }
}

function getArea(rect) {
    return (rect[2] - rect[0]) * (rect[3] - rect[1])
}

function doStep(nodes, head, context) {
    var sidesData = (0, _tiling.buildSidesData)(context.rect, context.directions, context.staticSideIndex);
    var area = getArea(context.rect);
    var rowData = area > 0 ? findAppropriateCollection(nodes, head, {
        areaToValue: area / context.sum,
        accumulate: context.accumulate,
        staticSide: sidesData.staticSide
    }) : {
        sum: 1,
        side: sidesData.variedSide,
        count: nodes.length - head
    };
    (0, _tiling.calculateRectangles)(nodes, head, context.rect, sidesData, rowData);
    context.sum -= rowData.sum;
    return head + rowData.count
}

function _default(data, accumulate, isFixedStaticSide) {
    var items = data.items;
    var ii = items.length;
    var i;
    var context = {
        sum: data.sum,
        rect: data.rect,
        directions: data.directions,
        accumulate: accumulate
    };
    if (isFixedStaticSide) {
        context.staticSideIndex = (0, _tiling.getStaticSideIndex)(context.rect)
    }
    items.sort(compare);
    for (i = 0; i < ii;) {
        i = doStep(items, i, context)
    }
}
module.exports = exports.default;
