/**
 * DevExtreme (ui/shared/grouped_data_converter_mixin.js)
 * Version: 20.2.6
 * Build date: Tue Mar 16 2021
 *
 * Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
exports.default = void 0;
var _type = require("../../core/utils/type");
var isCorrectStructure = function(data) {
    return Array.isArray(data) && data.every(function(item) {
        var hasTwoFields = 2 === Object.keys(item).length;
        var hasCorrectFields = "key" in item && "items" in item;
        return hasTwoFields && hasCorrectFields && Array.isArray(item.items)
    })
};
var _default = {
    _getSpecificDataSourceOption: function() {
        var groupKey = "key";
        var dataSource = this.option("dataSource");
        var hasSimpleItems = false;
        var data = {};
        if (this._getGroupedOption() && isCorrectStructure(dataSource)) {
            data = dataSource.reduce(function(accumulator, item) {
                var items = item.items.map(function(innerItem) {
                    if (!(0, _type.isObject)(innerItem)) {
                        innerItem = {
                            text: innerItem
                        };
                        hasSimpleItems = true
                    }
                    if (!(groupKey in innerItem)) {
                        innerItem[groupKey] = item.key
                    }
                    return innerItem
                });
                return accumulator.concat(items)
            }, []);
            dataSource = {
                store: {
                    type: "array",
                    data: data
                },
                group: {
                    selector: "key",
                    keepInitialKeyOrder: true
                }
            };
            if (hasSimpleItems) {
                dataSource.searchExpr = "text"
            }
        }
        return dataSource
    }
};
exports.default = _default;
module.exports = exports.default;
