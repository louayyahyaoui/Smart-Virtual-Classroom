/**
 * DevExtreme (ui/number_box/utils.js)
 * Version: 20.2.6
 * Build date: Tue Mar 16 2021
 *
 * Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
exports.splitByIndex = exports.getNthOccurrence = exports.getRealSeparatorIndex = void 0;
var getRealSeparatorIndex = function(str) {
    var quoteBalance = 0;
    var separatorCount = 0;
    for (var i = 0; i < str.length; ++i) {
        if ("'" === str[i]) {
            quoteBalance++
        }
        if ("." === str[i]) {
            ++separatorCount;
            if (quoteBalance % 2 === 0) {
                return {
                    occurrence: separatorCount,
                    index: i
                }
            }
        }
    }
    return {
        occurrence: 1,
        index: -1
    }
};
exports.getRealSeparatorIndex = getRealSeparatorIndex;
var getNthOccurrence = function(str, c, n) {
    var i = -1;
    while (n-- && i++ < str.length) {
        i = str.indexOf(c, i)
    }
    return i
};
exports.getNthOccurrence = getNthOccurrence;
var splitByIndex = function(str, index) {
    if (index === -1) {
        return [str]
    }
    return [str.slice(0, index), str.slice(index + 1)]
};
exports.splitByIndex = splitByIndex;
