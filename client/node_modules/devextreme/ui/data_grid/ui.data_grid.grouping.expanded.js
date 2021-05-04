/**
 * DevExtreme (ui/data_grid/ui.data_grid.grouping.expanded.js)
 * Version: 20.2.6
 * Build date: Tue Mar 16 2021
 *
 * Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
exports.GroupingHelper = void 0;
var _data = require("../../core/utils/data");
var _utils = _interopRequireDefault(require("../../data/utils"));
var _iterator = require("../../core/utils/iterator");
var _extend = require("../../core/utils/extend");
var _store_helper = _interopRequireDefault(require("../../data/store_helper"));
var _uiData_grid = _interopRequireDefault(require("./ui.data_grid.core"));
var _uiData_gridGrouping = require("./ui.data_grid.grouping.core");
var _uiData_grid2 = require("./ui.data_grid.utils");
var _query = _interopRequireDefault(require("../../data/query"));
var _deferred = require("../../core/utils/deferred");

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        "default": obj
    }
}
var loadTotalCount = function(dataSource, options) {
    var d = new _deferred.Deferred;
    var loadOptions = (0, _extend.extend)({
        skip: 0,
        take: 1,
        requireTotalCount: true
    }, options);
    dataSource.load(loadOptions).done(function(data, extra) {
        d.resolve(extra && extra.totalCount)
    }).fail(d.reject.bind(d));
    return d
};
var GroupingHelper = _uiData_gridGrouping.GroupingHelper.inherit(function() {
    var foreachCollapsedGroups = function(that, callback, updateOffsets) {
        return that.foreachGroups(function(groupInfo) {
            if (!groupInfo.isExpanded) {
                return callback(groupInfo)
            }
        }, false, false, updateOffsets, true)
    };
    var correctSkipLoadOption = function(that, skip) {
        var skipCorrection = 0;
        var resultSkip = skip || 0;
        if (skip) {
            foreachCollapsedGroups(that, function(groupInfo) {
                if (groupInfo.offset - skipCorrection >= skip) {
                    return false
                }
                skipCorrection += groupInfo.count - 1
            });
            resultSkip += skipCorrection
        }
        return resultSkip
    };
    var processGroupItems = function processGroupItems(that, items, path, offset, skipFirstItem, take) {
        var removeLastItemsCount = 0;
        var needRemoveFirstItem = false;
        for (var i = 0; i < items.length; i++) {
            var item = items[i];
            if (void 0 !== item.items) {
                path.push(item.key);
                var groupInfo = that.findGroupInfo(path);
                if (groupInfo && !groupInfo.isExpanded) {
                    item.collapsedItems = item.items;
                    item.items = null;
                    offset += groupInfo.count;
                    take--;
                    if (take < 0) {
                        removeLastItemsCount++
                    }
                    if (skipFirstItem) {
                        needRemoveFirstItem = true
                    }
                } else {
                    if (item.items) {
                        var offsetInfo = processGroupItems(that, item.items, path, offset, skipFirstItem, take);
                        if (skipFirstItem) {
                            if (offsetInfo.offset - offset > 1) {
                                item.isContinuation = true
                            } else {
                                needRemoveFirstItem = true
                            }
                        }
                        offset = offsetInfo.offset;
                        take = offsetInfo.take;
                        if (take < 0) {
                            if (item.items.length) {
                                item.isContinuationOnNextPage = true
                            } else {
                                removeLastItemsCount++
                            }
                        }
                    }
                }
                path.pop()
            } else {
                if (skipFirstItem) {
                    needRemoveFirstItem = true
                }
                offset++;
                take--;
                if (take < 0) {
                    removeLastItemsCount++
                }
            }
            skipFirstItem = false
        }
        if (needRemoveFirstItem) {
            items.splice(0, 1)
        }
        if (removeLastItemsCount) {
            items.splice(-removeLastItemsCount, removeLastItemsCount)
        }
        return {
            offset: offset,
            take: take
        }
    };
    var pathEquals = function(path1, path2) {
        if (path1.length !== path2.length) {
            return false
        }
        for (var i = 0; i < path1.length; i++) {
            if (!_utils.default.keysEqual(null, path1[i], path2[i])) {
                return false
            }
        }
        return true
    };
    var updateGroupOffsets = function updateGroupOffsets(that, items, path, offset, additionalGroupInfo) {
        if (!items) {
            return
        }
        for (var i = 0; i < items.length; i++) {
            var item = items[i];
            if ("key" in item && void 0 !== item.items) {
                path.push(item.key);
                if (additionalGroupInfo && pathEquals(additionalGroupInfo.path, path) && !item.isContinuation) {
                    additionalGroupInfo.offset = offset
                }
                var groupInfo = that.findGroupInfo(path);
                if (groupInfo && !item.isContinuation) {
                    groupInfo.offset = offset
                }
                if (groupInfo && !groupInfo.isExpanded) {
                    offset += groupInfo.count
                } else {
                    offset = updateGroupOffsets(that, item.items, path, offset, additionalGroupInfo)
                }
                path.pop()
            } else {
                offset++
            }
        }
        return offset
    };
    var removeGroupLoadOption = function(storeLoadOptions, loadOptions) {
        if (loadOptions.group) {
            var groups = _uiData_grid.default.normalizeSortingInfo(loadOptions.group);
            var sorts = _uiData_grid.default.normalizeSortingInfo(storeLoadOptions.sort);
            storeLoadOptions.sort = _store_helper.default.arrangeSortingInfo(groups, sorts);
            delete loadOptions.group
        }
    };
    var createNotGroupFilter = function(path, storeLoadOptions, group) {
        var groups = _uiData_grid.default.normalizeSortingInfo(group || storeLoadOptions.group);
        var filter = [];
        for (var i = 0; i < path.length; i++) {
            var filterElement = [];
            for (var j = 0; j <= i; j++) {
                filterElement.push([groups[j].selector, i === j ? "<>" : "=", path[j]])
            }
            filter.push(_uiData_grid.default.combineFilters(filterElement))
        }
        filter = _uiData_grid.default.combineFilters(filter, "or");
        return _uiData_grid.default.combineFilters([filter, storeLoadOptions.filter])
    };
    var getGroupCount = function getGroupCount(item, groupCount) {
        var count = item.count || item.items.length;
        if (!item.count && groupCount > 1) {
            count = 0;
            for (var i = 0; i < item.items.length; i++) {
                count += getGroupCount(item.items[i], groupCount - 1)
            }
        }
        return count
    };
    return {
        handleDataLoading: function(options) {
            var that = this;
            var storeLoadOptions = options.storeLoadOptions;
            var collapsedGroups = [];
            var collapsedItemsCount = 0;
            var skipFirstItem = false;
            var take;
            var group = options.loadOptions.group;
            var skipCorrection = 0;
            removeGroupLoadOption(storeLoadOptions, options.loadOptions);
            options.group = options.group || group;
            if (options.isCustomLoading) {
                return
            }
            var loadOptions = (0, _extend.extend)({}, storeLoadOptions);
            loadOptions.skip = correctSkipLoadOption(that, storeLoadOptions.skip);
            if (loadOptions.skip && loadOptions.take && group) {
                loadOptions.skip--;
                loadOptions.take++;
                skipFirstItem = true
            }
            if (loadOptions.take && group) {
                take = loadOptions.take;
                loadOptions.take++
            }
            foreachCollapsedGroups(that, function(groupInfo) {
                if (groupInfo.offset >= loadOptions.skip + loadOptions.take + skipCorrection) {
                    return false
                } else {
                    if (groupInfo.offset >= loadOptions.skip + skipCorrection && groupInfo.count) {
                        skipCorrection += groupInfo.count - 1;
                        collapsedGroups.push(groupInfo);
                        collapsedItemsCount += groupInfo.count
                    }
                }
            });
            (0, _iterator.each)(collapsedGroups, function() {
                loadOptions.filter = createNotGroupFilter(this.path, loadOptions, group)
            });
            options.storeLoadOptions = loadOptions;
            options.collapsedGroups = collapsedGroups;
            options.collapsedItemsCount = collapsedItemsCount;
            options.skip = loadOptions.skip || 0;
            options.skipFirstItem = skipFirstItem;
            options.take = take
        },
        handleDataLoaded: function(options, callBase) {
            var that = this;
            var data = options.data;
            var collapsedGroups = options.collapsedGroups;
            var groups = _uiData_grid.default.normalizeSortingInfo(options.group);
            var groupCount = groups.length;

            function appendCollapsedPath(data, path, groups, collapsedGroup, offset) {
                if (!data || !path.length || !groups.length) {
                    return
                }
                var keyValue;
                var i;
                var pathValue = (0, _data.toComparable)(path[0], true);
                for (i = 0; i < data.length; i++) {
                    keyValue = (0, _data.toComparable)(data[i].key, true);
                    if (offset >= collapsedGroup.offset || pathValue === keyValue) {
                        break
                    } else {
                        offset += getGroupCount(data[i], groups.length)
                    }
                }
                if (!data.length || pathValue !== keyValue) {
                    data.splice(i, 0, {
                        key: path[0],
                        items: [],
                        count: 1 === path.length ? collapsedGroup.count : void 0
                    })
                }
                appendCollapsedPath(data[i].items, path.slice(1), groups.slice(1), collapsedGroup, offset)
            }
            if (options.collapsedItemsCount && options.extra && options.extra.totalCount >= 0) {
                options.extra.totalCount += options.collapsedItemsCount
            }
            callBase(options);
            if (groupCount) {
                var query = (0, _query.default)(data);
                _store_helper.default.multiLevelGroup(query, groups).enumerate().done(function(groupedData) {
                    data = groupedData
                });
                if (collapsedGroups) {
                    for (var pathIndex = 0; pathIndex < collapsedGroups.length; pathIndex++) {
                        appendCollapsedPath(data, collapsedGroups[pathIndex].path, groups, collapsedGroups[pathIndex], options.skip)
                    }
                }
                if (!options.isCustomLoading) {
                    processGroupItems(that, data, [], options.skip, options.skipFirstItem, options.take)
                }
                options.data = data
            }
        },
        isGroupItemCountable: function(item) {
            return null === item.items
        },
        updateTotalItemsCount: function() {
            var itemsCountCorrection = 0;
            foreachCollapsedGroups(this, function(groupInfo) {
                if (groupInfo.count) {
                    itemsCountCorrection -= groupInfo.count - 1
                }
            });
            this.callBase(itemsCountCorrection)
        },
        changeRowExpand: function(path) {
            var that = this;
            var dataSource = that._dataSource;
            var beginPageIndex = dataSource.beginPageIndex ? dataSource.beginPageIndex() : dataSource.pageIndex();
            var dataSourceItems = dataSource.items();
            var offset = correctSkipLoadOption(that, beginPageIndex * dataSource.pageSize());
            var groupInfo = that.findGroupInfo(path);
            var groupCountQuery;
            if (groupInfo && !groupInfo.isExpanded) {
                groupCountQuery = (new _deferred.Deferred).resolve(groupInfo.count)
            } else {
                groupCountQuery = loadTotalCount(dataSource, {
                    filter: (0, _uiData_grid2.createGroupFilter)(path, {
                        filter: dataSource.filter(),
                        group: dataSource.group()
                    })
                })
            }
            return (0, _deferred.when)(groupCountQuery).done(function(count) {
                count = parseInt(count.length ? count[0] : count);
                if (groupInfo) {
                    updateGroupOffsets(that, dataSourceItems, [], offset);
                    groupInfo.isExpanded = !groupInfo.isExpanded;
                    groupInfo.count = count
                } else {
                    groupInfo = {
                        offset: -1,
                        count: count,
                        path: path,
                        isExpanded: false
                    };
                    updateGroupOffsets(that, dataSourceItems, [], offset, groupInfo);
                    if (groupInfo.offset >= 0) {
                        that.addGroupInfo(groupInfo)
                    }
                }
                that.updateTotalItemsCount()
            }).fail(function() {
                dataSource._eventsStrategy.fireEvent("loadError", arguments)
            })
        },
        allowCollapseAll: function() {
            return false
        },
        refresh: function(options, operationTypes) {
            var that = this;
            var storeLoadOptions = options.storeLoadOptions;
            var dataSource = that._dataSource;
            this.callBase.apply(this, arguments);
            if (operationTypes.reload) {
                return foreachCollapsedGroups(that, function(groupInfo) {
                    var groupCountQuery = loadTotalCount(dataSource, {
                        filter: (0, _uiData_grid2.createGroupFilter)(groupInfo.path, storeLoadOptions)
                    });
                    var groupOffsetQuery = loadTotalCount(dataSource, {
                        filter: (0, _uiData_gridGrouping.createOffsetFilter)(groupInfo.path, storeLoadOptions)
                    });
                    return (0, _deferred.when)(groupOffsetQuery, groupCountQuery).done(function(offset, count) {
                        offset = parseInt(offset.length ? offset[0] : offset);
                        count = parseInt(count.length ? count[0] : count);
                        groupInfo.offset = offset;
                        if (groupInfo.count !== count) {
                            groupInfo.count = count;
                            that.updateTotalItemsCount()
                        }
                    })
                }, true)
            }
        }
    }
}());
exports.GroupingHelper = GroupingHelper;
