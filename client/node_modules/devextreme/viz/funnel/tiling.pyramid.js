/**
 * DevExtreme (viz/funnel/tiling.pyramid.js)
 * Version: 20.2.6
 * Build date: Tue Mar 16 2021
 *
 * Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
exports.default = void 0;
var CENTER = .5;
var LEFTCORNER = 0;
var RIGHTCORNER = 1;
var _default = {
    getFigures: function(data, neckWidth, neckHeight) {
        var height = 0;
        var y = 0;
        var x = 0;
        var offsetX = 0;
        var halfNeckWidth = neckWidth / 2;
        var offsetFromCorner = CENTER - halfNeckWidth;
        var funnelHeight = 1 - neckHeight;
        var neckLeftCorner = CENTER - halfNeckWidth;
        var neckRightCorner = CENTER + halfNeckWidth;
        return data.map(function(value) {
            x = offsetX;
            y = height;
            height += value;
            offsetX = offsetFromCorner * height / funnelHeight;
            if (y <= funnelHeight && height <= funnelHeight) {
                return [x, y, RIGHTCORNER - x, y, RIGHTCORNER - offsetX, height, LEFTCORNER + offsetX, height]
            } else {
                if (y <= funnelHeight && height > funnelHeight) {
                    return [x, y, RIGHTCORNER - x, y, neckRightCorner, funnelHeight, neckRightCorner, height, neckLeftCorner, height, neckLeftCorner, funnelHeight]
                } else {
                    return [neckLeftCorner, y, neckRightCorner, y, neckRightCorner, height, neckLeftCorner, height]
                }
            }
        })
    },
    normalizeValues: function(items) {
        var sum = items.reduce(function(sum, item) {
            return sum + item.value
        }, 0);
        return items.map(function(item) {
            return item.value / sum
        })
    }
};
exports.default = _default;
module.exports = exports.default;
