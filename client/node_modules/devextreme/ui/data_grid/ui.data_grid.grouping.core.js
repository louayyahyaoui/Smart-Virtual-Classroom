/**
 * DevExtreme (ui/data_grid/ui.data_grid.grouping.core.js)
 * Version: 20.2.6
 * Build date: Tue Mar 16 2021
 *
 * Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
exports.createOffsetFilter = createOffsetFilter;
exports.GroupingHelper = void 0;
var _renderer = _interopRequireDefault(require("../../core/renderer"));
var _class = _interopRequireDefault(require("../../core/class"));
var _uiData_grid = _interopRequireDefault(require("./ui.data_grid.core"));
var _utils = _interopRequireDefault(require("../../data/utils"));
var _deferred = require("../../core/utils/deferred");

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        "default": obj
    }
}

function createOffsetFilter(path, storeLoadOptions) {
    var groups = _utils.default.normalizeSortingInfo(storeLoadOptions.group);
    var filter = [];
    for (var i = 0; i < path.length; i++) {
        var filterElement = [];
        for (var j = 0; j <= i; j++) {
            var selector = groups[j].selector;
            if (i === j && (null === path[j] || false === path[j] || true === path[j])) {
                if (false === path[j]) {
                    filterElement.push([selector, "=", groups[j].desc ? true : null])
                } else {
                    if (path[j] ? !groups[j].desc : groups[j].desc) {
                        filterElement.push([selector, "<>", path[j]])
                    } else {
                        filterElement.push([selector, "<>", null]);
                        filterElement.push([selector, "=", null])
                    }
                }
            } else {
                var currentFilter = [selector, i === j ? groups[j].desc ? ">" : "<" : "=", path[j]];
                if ("<" === currentFilter[1]) {
                    filterElement.push([currentFilter, "or", [selector, "=", null]])
                } else {
                    filterElement.push(currentFilter)
                }
            }
        }
        filter.push(_uiData_grid.default.combineFilters(filterElement))
    }
    filter = _uiData_grid.default.combineFilters(filter, "or");
    return _uiData_grid.default.combineFilters([filter, storeLoadOptions.filter])
}
var GroupingHelper = _class.default.inherit(function() {
    var findGroupInfoByKey = function(groupsInfo, key) {
        var hash = groupsInfo.hash;
        return hash && hash[JSON.stringify(key)]
    };
    var getGroupInfoIndexByOffset = function(groupsInfo, offset) {
        var leftIndex = 0;
        var rightIndex = groupsInfo.length - 1;
        if (!groupsInfo.length) {
            return 0
        }
        do {
            var middleIndex = rightIndex + leftIndex >> 1;
            if (groupsInfo[middleIndex].offset > offset) {
                rightIndex = middleIndex
            } else {
                leftIndex = middleIndex
            }
        } while (rightIndex - leftIndex > 1);
        var index;
        for (index = leftIndex; index <= rightIndex; index++) {
            if (groupsInfo[index].offset > offset) {
                break
            }
        }
        return index
    };
    var cleanGroupsInfo = function cleanGroupsInfo(groupsInfo, groupIndex, groupsCount) {
        for (var i = 0; i < groupsInfo.length; i++) {
            if (groupIndex + 1 >= groupsCount) {
                groupsInfo[i].children = []
            } else {
                cleanGroupsInfo(groupsInfo[i].children, groupIndex + 1, groupsCount)
            }
        }
    };
    var calculateItemsCount = function calculateItemsCount(that, items, groupsCount) {
        var result = 0;
        if (items) {
            if (!groupsCount) {
                result = items.length
            } else {
                for (var i = 0; i < items.length; i++) {
                    if (that.isGroupItemCountable(items[i])) {
                        result++
                    }
                    result += calculateItemsCount(that, items[i].items, groupsCount - 1)
                }
            }
        }
        return result
    };
    return {
        ctor: function(dataSourceAdapter) {
            this._dataSource = dataSourceAdapter;
            this.reset()
        },
        reset: function() {
            this._groupsInfo = [];
            this._totalCountCorrection = 0
        },
        totalCountCorrection: function() {
            return this._totalCountCorrection
        },
        updateTotalItemsCount: function(totalCountCorrection) {
            this._totalCountCorrection = totalCountCorrection || 0
        },
        isGroupItemCountable: function(item) {
            return !this._isVirtualPaging() || !item.isContinuation
        },
        _isVirtualPaging: function() {
            var scrollingMode = this._dataSource.option("scrolling.mode");
            return "virtual" === scrollingMode || "infinite" === scrollingMode
        },
        itemsCount: function itemsCount() {
            var dataSourceAdapter = this._dataSource;
            var dataSource = dataSourceAdapter._dataSource;
            var groupCount = _uiData_grid.default.normalizeSortingInfo(dataSource.group() || []).length;
            var itemsCount = calculateItemsCount(this, dataSource.items(), groupCount);
            return itemsCount
        },
        foreachGroups: function(callback, childrenAtFirst, foreachCollapsedGroups, updateOffsets, updateParentOffsets) {
            var that = this;

            function foreachGroupsCore(groupsInfo, callback, childrenAtFirst, parents) {
                var callbackResults = [];

                function executeCallback(callback, data, parents, callbackResults) {
                    var callbackResult = data && callback(data, parents);
                    callbackResult && callbackResults.push(callbackResult);
                    return callbackResult
                }
                for (var i = 0; i < groupsInfo.length; i++) {
                    parents.push(groupsInfo[i].data);
                    if (!childrenAtFirst && false === executeCallback(callback, groupsInfo[i].data, parents, callbackResults)) {
                        return false
                    }
                    if (!groupsInfo[i].data || groupsInfo[i].data.isExpanded || foreachCollapsedGroups) {
                        var children = groupsInfo[i].children;
                        var callbackResult = children.length && foreachGroupsCore(children, callback, childrenAtFirst, parents);
                        callbackResult && callbackResults.push(callbackResult);
                        if (false === callbackResult) {
                            return false
                        }
                    }
                    if (childrenAtFirst && false === executeCallback(callback, groupsInfo[i].data, parents, callbackResults)) {
                        return false
                    }
                    if (!groupsInfo[i].data || groupsInfo[i].data.offset !== groupsInfo[i].offset) {
                        updateOffsets = true
                    }
                    parents.pop()
                }
                var currentParents = updateParentOffsets && parents.slice(0);
                return updateOffsets && _deferred.when.apply(_renderer.default, callbackResults).always(function() {
                    that._updateGroupInfoOffsets(groupsInfo, currentParents)
                })
            }
            return foreachGroupsCore(that._groupsInfo, callback, childrenAtFirst, [])
        },
        _updateGroupInfoOffsets: function(groupsInfo, parents) {
            parents = parents || [];
            for (var index = 0; index < groupsInfo.length; index++) {
                var groupInfo = groupsInfo[index];
                if (groupInfo.data && groupInfo.data.offset !== groupInfo.offset) {
                    groupInfo.offset = groupInfo.data.offset;
                    for (var parentIndex = 0; parentIndex < parents.length; parentIndex++) {
                        parents[parentIndex].offset = groupInfo.offset
                    }
                }
            }
            groupsInfo.sort(function(a, b) {
                return a.offset - b.offset
            })
        },
        findGroupInfo: function(path) {
            var that = this;
            var groupInfo;
            var groupsInfo = that._groupsInfo;
            for (var pathIndex = 0; groupsInfo && pathIndex < path.length; pathIndex++) {
                groupInfo = findGroupInfoByKey(groupsInfo, path[pathIndex]);
                groupsInfo = groupInfo && groupInfo.children
            }
            return groupInfo && groupInfo.data
        },
        addGroupInfo: function(groupInfoData) {
            var that = this;
            var groupInfo;
            var path = groupInfoData.path;
            var groupsInfo = that._groupsInfo;
            for (var pathIndex = 0; pathIndex < path.length; pathIndex++) {
                groupInfo = findGroupInfoByKey(groupsInfo, path[pathIndex]);
                if (!groupInfo) {
                    groupInfo = {
                        key: path[pathIndex],
                        offset: groupInfoData.offset,
                        data: {
                            offset: groupInfoData.offset,
                            isExpanded: true,
                            path: path.slice(0, pathIndex + 1)
                        },
                        children: []
                    };
                    var index = getGroupInfoIndexByOffset(groupsInfo, groupInfoData.offset);
                    groupsInfo.splice(index, 0, groupInfo);
                    groupsInfo.hash = groupsInfo.hash || {};
                    groupsInfo.hash[JSON.stringify(groupInfo.key)] = groupInfo
                }
                if (pathIndex === path.length - 1) {
                    groupInfo.data = groupInfoData;
                    if (groupInfo.offset !== groupInfoData.offset) {
                        that._updateGroupInfoOffsets(groupsInfo)
                    }
                }
                groupsInfo = groupInfo.children
            }
        },
        allowCollapseAll: function() {
            return true
        },
        refresh: function(options) {
            var that = this;
            var storeLoadOptions = options.storeLoadOptions;
            var groups = _utils.default.normalizeSortingInfo(storeLoadOptions.group || []);
            var oldGroups = "_group" in that ? _utils.default.normalizeSortingInfo(that._group || []) : groups;
            var groupsCount = Math.min(oldGroups.length, groups.length);
            that._group = storeLoadOptions.group;
            for (var groupIndex = 0; groupIndex < groupsCount; groupIndex++) {
                if (oldGroups[groupIndex].selector !== groups[groupIndex].selector) {
                    groupsCount = groupIndex;
                    break
                }
            }
            if (!groupsCount) {
                that.reset()
            } else {
                cleanGroupsInfo(that._groupsInfo, 0, groupsCount)
            }
        },
        handleDataLoading: function() {},
        handleDataLoaded: function(options, callBase) {
            callBase(options)
        },
        handleDataLoadedCore: function(options, callBase) {
            callBase(options)
        }
    }
}());
exports.GroupingHelper = GroupingHelper;
