/**
 * DevExtreme (ui/grid_core/ui.grid_core.virtual_columns_core.js)
 * Version: 20.2.6
 * Build date: Tue Mar 16 2021
 *
 * Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
exports.foreachColumnInfo = foreachColumnInfo;
exports.createColumnsInfo = createColumnsInfo;
var _extend = require("../../core/utils/extend");

function foreachColumnInfo(info, callback, rowIndex, offsets, columnCount, lastProcessedIndexes) {
    rowIndex = rowIndex || 0;
    offsets = offsets || [];
    lastProcessedIndexes = lastProcessedIndexes || [];
    offsets[rowIndex] = offsets[rowIndex] || 0;
    var row = info[rowIndex];
    var startIndex = lastProcessedIndexes[rowIndex] + 1 || 0;
    var processedColumnCount = 0;
    var colIndex;
    if (!row) {
        return
    }
    for (colIndex = startIndex; colIndex < row.length; colIndex++) {
        var cell = row[colIndex];
        var visibleIndex = colIndex + offsets[rowIndex];
        var colspan = cell.colspan || 1;
        foreachColumnInfo(info, callback, rowIndex + (cell.rowspan || 1), offsets, colspan, lastProcessedIndexes);
        offsets[rowIndex] += colspan - 1;
        processedColumnCount += colspan;
        if (cell.rowspan) {
            for (var i = rowIndex + 1; i < rowIndex + cell.rowspan; i++) {
                offsets[i] = offsets[i] || 0;
                offsets[i] += cell.colspan || 1
            }
        }
        if (false === callback(cell, visibleIndex, rowIndex, colIndex)) {
            break
        }
        if (void 0 !== columnCount && processedColumnCount >= columnCount) {
            break
        }
    }
    lastProcessedIndexes[rowIndex] = colIndex
}

function createColumnsInfo(info, startIndex, endIndex) {
    var newInfo = [];
    foreachColumnInfo(info, function(columnInfo, visibleIndex, rowIndex) {
        var cell = columnInfo;
        var colspan;
        var cellColspan = cell.colspan || 1;
        var isVisible = visibleIndex + cellColspan - 1 >= startIndex && visibleIndex < endIndex;
        newInfo[rowIndex] = newInfo[rowIndex] || [];
        if (isVisible) {
            if (visibleIndex < startIndex) {
                colspan = cellColspan - (startIndex - visibleIndex);
                visibleIndex = startIndex
            } else {
                colspan = cellColspan
            }
            if (visibleIndex + colspan > endIndex) {
                colspan = endIndex - visibleIndex
            }
            if (colspan !== cellColspan) {
                cell = (0, _extend.extend)({}, cell, {
                    colspan: colspan
                })
            }
            newInfo[rowIndex].push(cell)
        } else {
            if (visibleIndex > endIndex) {
                return false
            }
        }
    });
    for (var i = 0; i < newInfo.length; i++) {
        newInfo[i] = newInfo[i] || []
    }
    return newInfo
}
