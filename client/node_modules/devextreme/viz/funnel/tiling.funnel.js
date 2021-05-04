/**
 * DevExtreme (viz/funnel/tiling.funnel.js)
 * Version: 20.2.6
 * Build date: Tue Mar 16 2021
 *
 * Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
exports.default = void 0;
var CENTER = .5;
var _default = {
    getFigures: function(data) {
        var height = 1 / data.length;
        return data.map(function(value, index, array) {
            var nextValue = array[index + 1] ? array[index + 1] : array[index];
            return [CENTER - value / 2, height * index, CENTER + value / 2, height * index, CENTER + nextValue / 2, height * (index + 1), CENTER - nextValue / 2, height * (index + 1)]
        })
    },
    normalizeValues: function(items) {
        var max = items.reduce(function(max, item) {
            return Math.max(item.value, max)
        }, items[0] && items[0].value || 0);
        return items.map(function(item) {
            return item.value / max
        })
    }
};
exports.default = _default;
module.exports = exports.default;
