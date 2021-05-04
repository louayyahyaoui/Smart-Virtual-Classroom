/**
 * DevExtreme (ui/scheduler/workspaces/view_data_provider.js)
 * Version: 20.2.6
 * Build date: Tue Mar 16 2021
 *
 * Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
exports.default = void 0;
var _date = _interopRequireDefault(require("../../../core/utils/date"));

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        "default": obj
    }
}

function ownKeys(object, enumerableOnly) {
    var keys = Object.keys(object);
    if (Object.getOwnPropertySymbols) {
        var symbols = Object.getOwnPropertySymbols(object);
        if (enumerableOnly) {
            symbols = symbols.filter(function(sym) {
                return Object.getOwnPropertyDescriptor(object, sym).enumerable
            })
        }
        keys.push.apply(keys, symbols)
    }
    return keys
}

function _objectSpread(target) {
    for (var i = 1; i < arguments.length; i++) {
        var source = null != arguments[i] ? arguments[i] : {};
        if (i % 2) {
            ownKeys(Object(source), true).forEach(function(key) {
                _defineProperty(target, key, source[key])
            })
        } else {
            if (Object.getOwnPropertyDescriptors) {
                Object.defineProperties(target, Object.getOwnPropertyDescriptors(source))
            } else {
                ownKeys(Object(source)).forEach(function(key) {
                    Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key))
                })
            }
        }
    }
    return target
}

function _defineProperty(obj, key, value) {
    if (key in obj) {
        Object.defineProperty(obj, key, {
            value: value,
            enumerable: true,
            configurable: true,
            writable: true
        })
    } else {
        obj[key] = value
    }
    return obj
}

function _toConsumableArray(arr) {
    return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread()
}

function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
}

function _unsupportedIterableToArray(o, minLen) {
    if (!o) {
        return
    }
    if ("string" === typeof o) {
        return _arrayLikeToArray(o, minLen)
    }
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if ("Object" === n && o.constructor) {
        n = o.constructor.name
    }
    if ("Map" === n || "Set" === n) {
        return Array.from(o)
    }
    if ("Arguments" === n || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) {
        return _arrayLikeToArray(o, minLen)
    }
}

function _iterableToArray(iter) {
    if ("undefined" !== typeof Symbol && Symbol.iterator in Object(iter)) {
        return Array.from(iter)
    }
}

function _arrayWithoutHoles(arr) {
    if (Array.isArray(arr)) {
        return _arrayLikeToArray(arr)
    }
}

function _arrayLikeToArray(arr, len) {
    if (null == len || len > arr.length) {
        len = arr.length
    }
    for (var i = 0, arr2 = new Array(len); i < len; i++) {
        arr2[i] = arr[i]
    }
    return arr2
}

function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) {
            descriptor.writable = true
        }
        Object.defineProperty(target, descriptor.key, descriptor)
    }
}

function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) {
        _defineProperties(Constructor.prototype, protoProps)
    }
    if (staticProps) {
        _defineProperties(Constructor, staticProps)
    }
    return Constructor
}
var ViewDataGenerator = function() {
    function ViewDataGenerator(workspace) {
        this.workspace = workspace
    }
    var _proto = ViewDataGenerator.prototype;
    _proto._getCompleteViewDataMap = function(options) {
        var rowCount = options.nonVirtualRowCount,
            cellCount = options.cellCount,
            verticalGroupCount = options.verticalGroupCount;
        var viewDataMap = [];
        for (var groupIndex = 0; groupIndex < verticalGroupCount; groupIndex += 1) {
            var allDayPanelData = this._generateAllDayPanelData(options, groupIndex, rowCount, cellCount);
            var viewCellsData = this._generateViewCellsData(options, rowCount, 0, rowCount * groupIndex);
            allDayPanelData && viewDataMap.push(allDayPanelData);
            viewDataMap.push.apply(viewDataMap, _toConsumableArray(viewCellsData))
        }
        return viewDataMap
    };
    _proto._generateViewDataMap = function(completeViewDataMap, options) {
        var startRowIndex = options.startRowIndex,
            rowCount = options.rowCount;
        var isVerticalGrouping = this.workspace._isVerticalGroupedWorkSpace();
        var showAllDayPanel = this.workspace._isShowAllDayPanel();
        var indexDifference = isVerticalGrouping || !showAllDayPanel ? 0 : 1;
        var correctedStartRowIndex = startRowIndex + indexDifference;
        return completeViewDataMap.slice(correctedStartRowIndex, correctedStartRowIndex + rowCount).map(function(cellsRow, rowIndex) {
            return cellsRow.map(function(cellData, cellIndex) {
                return {
                    cellData: cellData,
                    position: {
                        rowIndex: rowIndex,
                        cellIndex: cellIndex
                    }
                }
            })
        })
    };
    _proto._getViewDataFromMap = function(viewDataMap, completeViewDataMap, options) {
        var topVirtualRowHeight = options.topVirtualRowHeight,
            bottomVirtualRowHeight = options.bottomVirtualRowHeight,
            cellCountInGroupRow = options.cellCountInGroupRow;
        var isGroupedAllDayPanel = this.workspace.isGroupedAllDayPanel();
        var _viewDataMap$reduce = viewDataMap.reduce(function(_ref, cellsRow) {
                var previousGroupIndex = _ref.previousGroupIndex,
                    previousGroupedData = _ref.previousGroupedData;
                var cellDataRow = cellsRow.map(function(_ref2) {
                    var cellData = _ref2.cellData;
                    return cellData
                });
                var firstCell = cellDataRow[0];
                var isAllDayRow = firstCell.allDay;
                var currentGroupIndex = firstCell.groupIndex;
                if (currentGroupIndex !== previousGroupIndex) {
                    previousGroupedData.push({
                        dateTable: [],
                        isGroupedAllDayPanel: isGroupedAllDayPanel,
                        groupIndex: currentGroupIndex
                    })
                }
                if (isAllDayRow) {
                    previousGroupedData[previousGroupedData.length - 1].allDayPanel = cellDataRow
                } else {
                    previousGroupedData[previousGroupedData.length - 1].dateTable.push(cellDataRow)
                }
                return {
                    previousGroupedData: previousGroupedData,
                    previousGroupIndex: currentGroupIndex
                }
            }, {
                previousGroupIndex: -1,
                previousGroupedData: []
            }),
            groupedData = _viewDataMap$reduce.previousGroupedData;
        var isVirtualScrolling = this.workspace.isVirtualScrolling();
        var isVerticalGrouping = this.workspace._isVerticalGroupedWorkSpace();
        var showAllDayPanel = this.workspace._isShowAllDayPanel();
        if (!isVerticalGrouping && showAllDayPanel) {
            groupedData[0].allDayPanel = completeViewDataMap[0]
        }
        return {
            groupedData: groupedData,
            isVirtual: isVirtualScrolling,
            topVirtualRowHeight: topVirtualRowHeight,
            bottomVirtualRowHeight: bottomVirtualRowHeight,
            cellCountInGroupRow: cellCountInGroupRow
        }
    };
    _proto._generateViewCellsData = function(options, renderRowCount, startRowIndex, rowOffset) {
        var cellCount = options.cellCount,
            cellDataGetters = options.cellDataGetters,
            rowCountInGroup = options.rowCountInGroup;
        var viewCellsData = [];
        for (var i = 0; i < renderRowCount; ++i) {
            var rowIndex = startRowIndex + rowOffset + i;
            var rowIndexInGroup = rowIndex % rowCountInGroup;
            viewCellsData.push(this._generateCellsRow(options, cellDataGetters, rowIndex, cellCount, rowIndexInGroup))
        }
        return viewCellsData
    };
    _proto._generateAllDayPanelData = function(options, groupIndex, rowCount, cellCount) {
        var workSpace = this.workspace;
        if (!workSpace._isShowAllDayPanel()) {
            return null
        }
        var rowIndex = Math.max(groupIndex * rowCount, 0);
        return this._generateCellsRow(options, [workSpace._getAllDayCellData.bind(workSpace)], rowIndex, cellCount, 0, groupIndex)
    };
    _proto._generateCellsRow = function(options, cellDataGetters, rowIndex, cellCount, rowIndexInGroup, groupIndex) {
        var _this = this;
        var cellsRow = [];
        var horizontalGroupCount = options.horizontalGroupCount,
            groupOrientation = options.groupOrientation,
            rowCountInGroup = options.rowCountInGroup,
            cellCountInGroupRow = options.cellCountInGroupRow,
            groupCount = options.groupCount;
        var _loop = function(columnIndex) {
            var cellDataValue = cellDataGetters.reduce(function(data, getter) {
                return _objectSpread(_objectSpread({}, data), getter(void 0, rowIndex, columnIndex, groupIndex).value)
            }, {});
            cellDataValue.index = _this._calculateCellIndex(horizontalGroupCount, groupOrientation, _this._workspace.isGroupedByDate(), rowIndexInGroup, columnIndex, cellCount);
            cellDataValue.isFirstGroupCell = _this._isFirstGroupCell(rowIndex, columnIndex, rowCountInGroup, cellCountInGroupRow, groupCount);
            cellDataValue.isLastGroupCell = _this._isLastGroupCell(rowIndex, columnIndex, rowCountInGroup, cellCountInGroupRow, groupCount);
            cellDataValue.key = _this._getKeyByRowAndColumn(rowIndex, columnIndex, cellCount);
            cellsRow.push(cellDataValue)
        };
        for (var columnIndex = 0; columnIndex < cellCount; ++columnIndex) {
            _loop(columnIndex)
        }
        return cellsRow
    };
    _proto._calculateCellIndex = function(horizontalGroupCount, groupOrientation, isGroupedByDate, rowIndex, columnIndex, columnsNumber) {
        var groupCount = horizontalGroupCount || 1;
        var index = rowIndex * columnsNumber + columnIndex;
        var columnsInGroup = columnsNumber / groupCount;
        if ("horizontal" === groupOrientation) {
            var columnIndexInCurrentGroup = columnIndex % columnsInGroup;
            if (isGroupedByDate) {
                columnIndexInCurrentGroup = Math.floor(columnIndex / groupCount)
            }
            index = rowIndex * columnsInGroup + columnIndexInCurrentGroup
        }
        return index
    };
    _proto._getKeyByRowAndColumn = function(rowIndex, columnIndex, cellCount) {
        return rowIndex * cellCount + columnIndex
    };
    _proto.generateGroupedDataMap = function(viewDataMap) {
        var _viewDataMap$reduce2 = viewDataMap.reduce(function(previousOptions, cellsRow) {
                var previousGroupedDataMap = previousOptions.previousGroupedDataMap,
                    previousRowIndex = previousOptions.previousRowIndex,
                    previousGroupIndex = previousOptions.previousGroupIndex;
                var currentGroupIndex = cellsRow[0].cellData.groupIndex;
                var currentRowIndex = currentGroupIndex === previousGroupIndex ? previousRowIndex + 1 : 0;
                cellsRow.forEach(function(cell) {
                    var groupIndex = cell.cellData.groupIndex;
                    if (!previousGroupedDataMap[groupIndex]) {
                        previousGroupedDataMap[groupIndex] = []
                    }
                    if (!previousGroupedDataMap[groupIndex][currentRowIndex]) {
                        previousGroupedDataMap[groupIndex][currentRowIndex] = []
                    }
                    previousGroupedDataMap[groupIndex][currentRowIndex].push(cell)
                });
                return {
                    previousGroupedDataMap: previousGroupedDataMap,
                    previousRowIndex: currentRowIndex,
                    previousGroupIndex: currentGroupIndex
                }
            }, {
                previousGroupedDataMap: [],
                previousRowIndex: -1,
                previousGroupIndex: -1
            }),
            groupedDataMap = _viewDataMap$reduce2.previousGroupedDataMap;
        return groupedDataMap
    };
    _proto._isFirstGroupCell = function(rowIndex, columnIndex, singleGroupRowCount, singleGroupColumnCount, groupCount) {
        if (this.workspace.isGroupedByDate()) {
            return columnIndex % groupCount === 0
        }
        if (this.workspace._isHorizontalGroupedWorkSpace() || 0 === groupCount) {
            return columnIndex % singleGroupColumnCount === 0
        }
        return rowIndex % singleGroupRowCount === 0
    };
    _proto._isLastGroupCell = function(rowIndex, columnIndex, singleGroupRowCount, singleGroupColumnCount, groupCount) {
        if (this.workspace.isGroupedByDate()) {
            return (columnIndex + 1) % groupCount === 0
        }
        if (this.workspace._isHorizontalGroupedWorkSpace() || 0 === groupCount) {
            return (columnIndex + 1) % singleGroupColumnCount === 0
        }
        return (rowIndex + 1) % singleGroupRowCount === 0
    };
    _createClass(ViewDataGenerator, [{
        key: "workspace",
        get: function() {
            return this._workspace
        },
        set: function(value) {
            this._workspace = value
        }
    }]);
    return ViewDataGenerator
}();
var ViewDataProvider = function() {
    function ViewDataProvider(workspace) {
        this._viewDataGenerator = null;
        this._viewData = [];
        this._completeViewDataMap = [];
        this._completeGroupedViewDataMap = [];
        this._viewDataMap = [];
        this._groupedDataMap = [];
        this._workspace = workspace
    }
    var _proto2 = ViewDataProvider.prototype;
    _proto2.update = function(isGenerateNewViewData) {
        var viewDataGenerator = this.viewDataGenerator,
            _workspace = this._workspace;
        var renderOptions = _workspace.generateRenderOptions();
        if (isGenerateNewViewData) {
            this.completeViewDataMap = viewDataGenerator._getCompleteViewDataMap(renderOptions)
        }
        this.viewDataMap = viewDataGenerator._generateViewDataMap(this.completeViewDataMap, renderOptions);
        this.viewData = viewDataGenerator._getViewDataFromMap(this.viewDataMap, this.completeViewDataMap, renderOptions);
        this.groupedDataMap = viewDataGenerator.generateGroupedDataMap(this.viewDataMap)
    };
    _proto2.getStartDate = function() {
        var groupedData = this.viewData.groupedData;
        var dateTable = groupedData[0].dateTable;
        return dateTable[0][0].startDate
    };
    _proto2.getGroupStartDate = function(groupIndex) {
        var _this$getGroupData = this.getGroupData(groupIndex),
            dateTable = _this$getGroupData.dateTable;
        return dateTable[0][0].startDate
    };
    _proto2.getGroupEndDate = function(groupIndex) {
        var _this$getGroupData2 = this.getGroupData(groupIndex),
            dateTable = _this$getGroupData2.dateTable;
        var lastRowIndex = dateTable.length - 1;
        var lastCellIndex = dateTable[lastRowIndex].length - 1;
        return dateTable[lastRowIndex][lastCellIndex].endDate
    };
    _proto2.findGroupCellStartDate = function(groupIndex, startDate, endDate, isAllDay) {
        if (isAllDay) {
            return this.findAllDayGroupCellStartDate(groupIndex, startDate)
        }
        var _this$getGroupData3 = this.getGroupData(groupIndex),
            dateTable = _this$getGroupData3.dateTable;
        if (!dateTable.length) {
            return
        }
        for (var i = 0; i < dateTable[0].length; ++i) {
            var cell = dateTable[0][i];
            var lastRowIndex = dateTable.length - 1;
            if (_date.default.sameDate(cell.startDate, startDate)) {
                var _lastCell;
                var lastCell = dateTable[lastRowIndex][i];
                if (lastCell.endDate <= startDate) {
                    if (endDate.getDate() > startDate.getDate()) {
                        cell = dateTable[0][i + 1];
                        lastCell = dateTable[lastRowIndex][i + 1]
                    }
                }
                if ((null === (_lastCell = lastCell) || void 0 === _lastCell ? void 0 : _lastCell.endDate) > startDate) {
                    return cell.startDate
                }
            }
        }
    };
    _proto2.findAllDayGroupCellStartDate = function(groupIndex, startDate) {
        var groupStartDate = this.getGroupStartDate(groupIndex);
        return groupStartDate > startDate ? groupStartDate : startDate
    };
    _proto2.getCellsGroup = function(groupIndex) {
        var _this$getGroupData4 = this.getGroupData(groupIndex),
            dateTable = _this$getGroupData4.dateTable;
        return dateTable[0][0].groups
    };
    _proto2.getCellData = function(rowIndex, cellIndex, isAllDay) {
        if (isAllDay && !this._workspace._isVerticalGroupedWorkSpace()) {
            return this._viewData.groupedData[0].allDayPanel[cellIndex]
        }
        var cellData = this.viewDataMap[rowIndex][cellIndex].cellData;
        return cellData
    };
    _proto2.getCellsByGroupIndexAndAllDay = function(groupIndex, allDay) {
        var workspace = this._workspace;
        var rowsPerGroup = workspace._getRowCountWithAllDayRows();
        var isVerticalGrouping = workspace._isVerticalGroupedWorkSpace();
        var isShowAllDayPanel = workspace._isShowAllDayPanel();
        var firstRowInGroup = isVerticalGrouping ? groupIndex * rowsPerGroup : 0;
        var lastRowInGroup = isVerticalGrouping ? (groupIndex + 1) * rowsPerGroup - 1 : rowsPerGroup;
        var correctedFirstRow = isShowAllDayPanel && !allDay ? firstRowInGroup + 1 : firstRowInGroup;
        var correctedLastRow = allDay ? correctedFirstRow : lastRowInGroup;
        return this.completeViewDataMap.slice(correctedFirstRow, correctedLastRow + 1).map(function(row) {
            return row.filter(function(_ref3) {
                var currentGroupIndex = _ref3.groupIndex;
                return groupIndex === currentGroupIndex
            })
        })
    };
    _proto2.findCellPositionInMap = function(groupIndex, startDate, isAllDay) {
        var startTime = isAllDay ? _date.default.trimTime(startDate).getTime() : startDate.getTime();
        var isStartTimeInCell = function(cellData) {
            var cellStartTime = cellData.startDate.getTime();
            var cellEndTime = cellData.endDate.getTime();
            return isAllDay ? cellData.allDay && startTime >= cellStartTime && startTime <= cellEndTime : startTime >= cellStartTime && startTime < cellEndTime
        };
        var rows = isAllDay && !this._workspace._isVerticalGroupedWorkSpace() ? [this.completeViewDataMap[0].map(function(cell, index) {
            return {
                cellData: cell,
                position: {
                    cellIndex: index,
                    rowIndex: 0
                }
            }
        })] : this.groupedDataMap[groupIndex] || [];
        for (var rowIndex = 0; rowIndex < rows.length; ++rowIndex) {
            var row = rows[rowIndex];
            for (var cellIndex = 0; cellIndex < row.length; ++cellIndex) {
                var cell = row[cellIndex];
                var cellData = cell.cellData;
                if (cellData.groupIndex === groupIndex) {
                    if (isStartTimeInCell(cellData)) {
                        return cell.position
                    }
                }
            }
        }
        return
    };
    _proto2.getGroupIndices = function() {
        var groupedData = this.viewData.groupedData;
        return groupedData.map(function(_ref4) {
            var groupIndex = _ref4.groupIndex;
            return groupIndex
        })
    };
    _proto2._getLastGroupRow = function(groupIndex) {
        var group = this.groupedDataMap[groupIndex];
        var lastIndex = group.length - 1;
        return group[lastIndex]
    };
    _proto2.getLasGroupCellPosition = function(groupIndex) {
        var groupRow = this._getLastGroupRow(groupIndex);
        return groupRow[0].position
    };
    _proto2.getLasGroupCellIndex = function(groupIndex) {
        var group = this.groupedDataMap[groupIndex];
        return group.length - 1
    };
    _proto2.getRowCountInGroup = function(groupIndex) {
        var groupRow = this._getLastGroupRow(groupIndex);
        var cellAmount = groupRow.length;
        var lastCellData = groupRow[cellAmount - 1].cellData;
        var lastCellIndex = lastCellData.index;
        return (lastCellIndex + 1) / groupRow.length
    };
    _proto2.getGroupData = function(groupIndex) {
        var groupedData = this.viewData.groupedData;
        return groupedData.filter(function(item) {
            return item.groupIndex === groupIndex
        })[0]
    };
    _proto2.isGroupIntersectDateInterval = function(groupIndex, startDate, endDate) {
        var groupStartDate = this.getGroupStartDate(groupIndex);
        var groupEndDate = this.getGroupEndDate(groupIndex);
        return startDate < groupEndDate && endDate > groupStartDate
    };
    _proto2.findGlobalCellPosition = function(date) {
        var groupIndex = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0;
        var allDay = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : false;
        var completeViewDataMap = this.completeViewDataMap,
            workspace = this._workspace;
        var showAllDayPanel = workspace._isShowAllDayPanel();
        var isVerticalGroupOrientation = workspace._isVerticalGroupedWorkSpace();
        for (var rowIndex = 0; rowIndex < completeViewDataMap.length; rowIndex += 1) {
            var currentRow = completeViewDataMap[rowIndex];
            for (var columnIndex = 0; columnIndex < currentRow.length; columnIndex += 1) {
                var cellData = currentRow[columnIndex];
                var currentStartDate = cellData.startDate,
                    currentEndDate = cellData.endDate,
                    currentGroupIndex = cellData.groupIndex,
                    currentAllDay = cellData.allDay;
                if (groupIndex === currentGroupIndex && allDay === currentAllDay && this._compareDatesAndAllDay(date, currentStartDate, currentEndDate, allDay)) {
                    return {
                        position: {
                            columnIndex: columnIndex,
                            rowIndex: showAllDayPanel && !isVerticalGroupOrientation ? rowIndex - 1 : rowIndex
                        },
                        cellData: cellData
                    }
                }
            }
        }
    };
    _proto2._compareDatesAndAllDay = function(date, cellStartDate, cellEndDate, allDay) {
        var time = date.getTime();
        var trimmedTime = _date.default.trimTime(date).getTime();
        var cellStartTime = cellStartDate.getTime();
        var cellEndTime = cellEndDate.getTime();
        return !allDay && time >= cellStartTime && time < cellEndTime || allDay && trimmedTime === cellStartTime
    };
    _createClass(ViewDataProvider, [{
        key: "viewDataGenerator",
        get: function() {
            if (!this._viewDataGenerator) {
                this._viewDataGenerator = new ViewDataGenerator(this._workspace)
            }
            return this._viewDataGenerator
        }
    }, {
        key: "completeViewDataMap",
        get: function() {
            return this._completeViewDataMap
        },
        set: function(value) {
            this._completeViewDataMap = value
        }
    }, {
        key: "completeGroupedViewDataMap",
        get: function() {
            return this._completeGroupedViewDataMap
        },
        set: function(value) {
            this._completeGroupedViewDataMap = value
        }
    }, {
        key: "viewData",
        get: function() {
            return this._viewData
        },
        set: function(value) {
            this._viewData = value
        }
    }, {
        key: "viewDataMap",
        get: function() {
            return this._viewDataMap
        },
        set: function(value) {
            this._viewDataMap = value
        }
    }, {
        key: "groupedDataMap",
        get: function() {
            return this._groupedDataMap
        },
        set: function(value) {
            this._groupedDataMap = value
        }
    }]);
    return ViewDataProvider
}();
exports.default = ViewDataProvider;
module.exports = exports.default;
