/**
 * DevExtreme (ui/pivot_grid/data_source.utils.js)
 * Version: 20.2.6
 * Build date: Tue Mar 16 2021
 *
 * Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
exports.sort = sort;
var _uiPivot_grid = require("./ui.pivot_grid.utils");
var _type = require("../../core/utils/type");
var _iterator = require("../../core/utils/iterator");

function sort(loadOptions, dataSource, getAscOrder) {
    sortDimension(dataSource, loadOptions, "rows", getAscOrder);
    sortDimension(dataSource, loadOptions, "columns", getAscOrder)
}

function sortDimension(dataSource, loadOptions, dimensionName, getAscOrder) {
    var fields = loadOptions[dimensionName] || [];
    var baseIndex = loadOptions.headerName === dimensionName ? loadOptions.path.length : 0;
    var sortingMethodByLevel = [];
    (0, _uiPivot_grid.foreachDataLevel)(dataSource[dimensionName], function(item, index) {
        var field = fields[index] || {};
        var sortingMethod = sortingMethodByLevel[index] = sortingMethodByLevel[index] || getSortingMethod(field, dataSource, loadOptions, dimensionName, getAscOrder);
        item.sort(sortingMethod)
    }, baseIndex)
}

function getSortingMethod(field, dataSource, loadOptions, dimensionName, getAscOrder) {
    var sortOrder = getAscOrder ? "asc" : field.sortOrder;
    var sortBy = getMemberForSortBy(field.sortBy, getAscOrder);
    var defaultCompare = field.sortingMethod ? function(a, b) {
        return field.sortingMethod(a, b)
    } : (0, _uiPivot_grid.getCompareFunction)(function(item) {
        return item[sortBy]
    });
    var summaryValueSelector = !getAscOrder && getFieldSummaryValueSelector(field, dataSource, loadOptions, dimensionName);
    var summaryCompare = summaryValueSelector && (0, _uiPivot_grid.getCompareFunction)(summaryValueSelector);
    var sortingMethod = function(a, b) {
        var result = summaryCompare && summaryCompare(a, b) || defaultCompare(a, b);
        return "desc" === sortOrder ? -result : result
    };
    return sortingMethod
}

function getFieldSummaryValueSelector(field, dataSource, loadOptions, dimensionName) {
    var values = dataSource.values;
    var sortBySummaryFieldIndex = (0, _uiPivot_grid.findField)(loadOptions.values, field.sortBySummaryField);
    var areRows = "rows" === dimensionName;
    var sortByDimension = areRows ? dataSource.columns : dataSource.rows;
    var grandTotalIndex = areRows ? dataSource.grandTotalRowIndex : dataSource.grandTotalColumnIndex;
    var sortBySummaryPath = field.sortBySummaryPath || [];
    var sliceIndex = sortBySummaryPath.length ? getSliceIndex(sortByDimension, sortBySummaryPath) : grandTotalIndex;
    if (values && values.length && sortBySummaryFieldIndex >= 0 && (0, _type.isDefined)(sliceIndex)) {
        return function(field) {
            var rowIndex = areRows ? field.index : sliceIndex;
            var columnIndex = areRows ? sliceIndex : field.index;
            var value = ((values[rowIndex] || [
                []
            ])[columnIndex] || [])[sortBySummaryFieldIndex];
            return (0, _type.isDefined)(value) ? value : null
        }
    }
}

function getMemberForSortBy(sortBy, getAscOrder) {
    var member = "text";
    if ("none" === sortBy) {
        member = "index"
    } else {
        if (getAscOrder || "displayText" !== sortBy) {
            member = "value"
        }
    }
    return member
}

function getSliceIndex(items, path) {
    var index = null;
    var pathValue = (path || []).join(".");
    if (pathValue.length) {
        (0, _uiPivot_grid.foreachTree)(items, function(items) {
            var item = items[0];
            var itemPath = (0, _uiPivot_grid.createPath)(items).join(".");
            var textPath = (0, _iterator.map)(items, function(item) {
                return item.text
            }).reverse().join(".");
            if (pathValue === itemPath || item.key && textPath === pathValue) {
                index = items[0].index;
                return false
            }
        })
    }
    return index
}
