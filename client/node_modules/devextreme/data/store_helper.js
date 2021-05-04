/**
 * DevExtreme (data/store_helper.js)
 * Version: 20.2.6
 * Build date: Tue Mar 16 2021
 *
 * Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
exports.default = void 0;
var _common = require("../core/utils/common");
var _extend = require("../core/utils/extend");
var _iterator = require("../core/utils/iterator");
var _array_query = _interopRequireDefault(require("./array_query"));
var _utils = _interopRequireDefault(require("./utils"));

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        "default": obj
    }
}

function multiLevelGroup(query, groupInfo) {
    query = query.groupBy(groupInfo[0].selector);
    if (groupInfo.length > 1) {
        query = query.select(function(g) {
            return (0, _extend.extend)({}, g, {
                items: multiLevelGroup((0, _array_query.default)(g.items), groupInfo.slice(1)).toArray()
            })
        })
    }
    return query
}

function arrangeSortingInfo(groupInfo, sortInfo) {
    var filteredGroup = [];
    (0, _iterator.each)(groupInfo, function(_, group) {
        var collision = (0, _common.grep)(sortInfo, function(sort) {
            return group.selector === sort.selector
        });
        if (collision.length < 1) {
            filteredGroup.push(group)
        }
    });
    return filteredGroup.concat(sortInfo)
}

function queryByOptions(query, options, isCountQuery) {
    options = options || {};
    var filter = options.filter;
    if (filter) {
        query = query.filter(filter)
    }
    if (isCountQuery) {
        return query
    }
    var sort = options.sort;
    var select = options.select;
    var group = options.group;
    var skip = options.skip;
    var take = options.take;
    if (group) {
        group = _utils.default.normalizeSortingInfo(group);
        group.keepInitialKeyOrder = !!options.group.keepInitialKeyOrder
    }
    if (sort || group) {
        sort = _utils.default.normalizeSortingInfo(sort || []);
        if (group && !group.keepInitialKeyOrder) {
            sort = arrangeSortingInfo(group, sort)
        }(0, _iterator.each)(sort, function(index) {
            query = query[index ? "thenBy" : "sortBy"](this.selector, this.desc, this.compare)
        })
    }
    if (select) {
        query = query.select(select)
    }
    if (group) {
        query = multiLevelGroup(query, group)
    }
    if (take || skip) {
        query = query.slice(skip || 0, take)
    }
    return query
}
var _default = {
    multiLevelGroup: multiLevelGroup,
    arrangeSortingInfo: arrangeSortingInfo,
    queryByOptions: queryByOptions
};
exports.default = _default;
module.exports = exports.default;
