/**
 * DevExtreme (ui/grid_core/ui.grid_core.filter_sync.js)
 * Version: 20.2.6
 * Build date: Tue Mar 16 2021
 *
 * Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
exports.default = void 0;
var _type = require("../../core/utils/type");
var _uiGrid_core = _interopRequireDefault(require("./ui.grid_core.modules"));
var _utils = require("../filter_builder/utils");
var _ui = _interopRequireDefault(require("../widget/ui.errors"));
var _uiGrid_core2 = _interopRequireDefault(require("./ui.grid_core.utils"));
var _filtering = _interopRequireDefault(require("../shared/filtering"));
var _uiGrid_core3 = require("./ui.grid_core.filter_custom_operations");

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        "default": obj
    }
}
var FILTER_ROW_OPERATIONS = ["=", "<>", "<", "<=", ">", ">=", "notcontains", "contains", "startswith", "endswith", "between"];
var FILTER_TYPES_INCLUDE = "include";
var FILTER_TYPES_EXCLUDE = "exclude";

function getColumnIdentifier(column) {
    return column.dataField || column.name
}

function checkForErrors(columns) {
    columns.forEach(function(column) {
        var identifier = getColumnIdentifier(column);
        if (!(0, _type.isDefined)(identifier) && column.allowFiltering) {
            throw new _ui.default.Error("E1049", column.caption)
        }
    })
}
var FilterSyncController = _uiGrid_core.default.Controller.inherit(function() {
    var getEmptyFilterValues = function() {
        return {
            filterType: FILTER_TYPES_INCLUDE,
            filterValues: void 0
        }
    };
    var canSyncHeaderFilterWithFilterRow = function(column) {
        return !_filtering.default.getGroupInterval(column) && !(column.headerFilter && column.headerFilter.dataSource)
    };
    var getHeaderFilterFromCondition = function(headerFilterCondition, column) {
        if (!headerFilterCondition) {
            return getEmptyFilterValues()
        }
        var filterType;
        var selectedFilterOperation = headerFilterCondition[1];
        var value = headerFilterCondition[2];
        var hasArrayValue = Array.isArray(value);
        if (!hasArrayValue) {
            if (!canSyncHeaderFilterWithFilterRow(column)) {
                return getEmptyFilterValues()
            }
        }
        switch (selectedFilterOperation) {
            case "anyof":
            case "=":
                filterType = FILTER_TYPES_INCLUDE;
                break;
            case "noneof":
            case "<>":
                filterType = FILTER_TYPES_EXCLUDE;
                break;
            default:
                return getEmptyFilterValues()
        }
        return {
            filterType: filterType,
            filterValues: hasArrayValue ? value : [value]
        }
    };
    var getConditionFromFilterRow = function(column) {
        var value = column.filterValue;
        if ((0, _type.isDefined)(value)) {
            var operation = column.selectedFilterOperation || column.defaultFilterOperation || (0, _utils.getDefaultOperation)(column);
            var filter = [getColumnIdentifier(column), operation, column.filterValue];
            return filter
        } else {
            return null
        }
    };
    var getConditionFromHeaderFilter = function(column) {
        var selectedOperation;
        var value;
        var filterValues = column.filterValues;
        if (!filterValues) {
            return null
        }
        if (canSyncHeaderFilterWithFilterRow(column) && 1 === column.filterValues.length && !Array.isArray(filterValues[0])) {
            column.filterType === FILTER_TYPES_EXCLUDE ? selectedOperation = "<>" : selectedOperation = "=";
            value = filterValues[0]
        } else {
            column.filterType === FILTER_TYPES_EXCLUDE ? selectedOperation = "noneof" : selectedOperation = "anyof";
            value = filterValues
        }
        return [getColumnIdentifier(column), selectedOperation, value]
    };
    var updateHeaderFilterCondition = function(columnsController, column, headerFilterCondition) {
        var headerFilter = getHeaderFilterFromCondition(headerFilterCondition, column);
        columnsController.columnOption(getColumnIdentifier(column), headerFilter)
    };
    var updateFilterRowCondition = function(columnsController, column, condition) {
        var filterRowOptions;
        var selectedFilterOperation = condition && condition[1];
        var filterOperations = column.filterOperations || column.defaultFilterOperations;
        if ((!filterOperations || filterOperations.indexOf(selectedFilterOperation) >= 0 || selectedFilterOperation === column.defaultFilterOperation) && FILTER_ROW_OPERATIONS.indexOf(selectedFilterOperation) >= 0) {
            if (selectedFilterOperation === column.defaultFilterOperation && !(0, _type.isDefined)(column.selectedFilterOperation)) {
                selectedFilterOperation = column.selectedFilterOperation
            }
            filterRowOptions = {
                filterValue: condition[2],
                selectedFilterOperation: selectedFilterOperation
            }
        } else {
            filterRowOptions = {
                filterValue: void 0,
                selectedFilterOperation: void 0
            }
        }
        columnsController.columnOption(getColumnIdentifier(column), filterRowOptions)
    };
    return {
        syncFilterValue: function() {
            var that = this;
            var columnsController = that.getController("columns");
            var columns = columnsController.getFilteringColumns();
            this._skipSyncColumnOptions = true;
            columns.forEach(function(column) {
                var filterConditions = (0, _utils.getMatchedConditions)(that.option("filterValue"), getColumnIdentifier(column));
                if (1 === filterConditions.length) {
                    var filterCondition = filterConditions[0];
                    updateHeaderFilterCondition(columnsController, column, filterCondition);
                    updateFilterRowCondition(columnsController, column, filterCondition)
                } else {
                    (0, _type.isDefined)(column.filterValues) && updateHeaderFilterCondition(columnsController, column);
                    (0, _type.isDefined)(column.filterValue) && updateFilterRowCondition(columnsController, column)
                }
            });
            this._skipSyncColumnOptions = false
        },
        _initSync: function() {
            var columns = this.getController("columns").getColumns();
            var dataController = this.getController("data");
            var pageIndex = dataController.pageIndex();
            checkForErrors(columns);
            if (!this.option("filterValue")) {
                var filteringColumns = this.getController("columns").getFilteringColumns();
                var filterValue = this.getFilterValueFromColumns(filteringColumns);
                this.option("filterValue", filterValue)
            }
            this.syncFilterValue();
            dataController.pageIndex(pageIndex)
        },
        init: function() {
            var _this = this;
            var dataController = this.getController("data");
            if (dataController.isFilterSyncActive()) {
                if (this.getController("columns").isAllDataTypesDefined()) {
                    this._initSync()
                } else {
                    dataController.dataSourceChanged.add(function() {
                        return _this._initSync()
                    })
                }
            }
        },
        _getSyncFilterRow: function(filterValue, column) {
            var filter = getConditionFromFilterRow(column);
            if ((0, _type.isDefined)(filter)) {
                return (0, _utils.syncFilters)(filterValue, filter)
            } else {
                return (0, _utils.removeFieldConditionsFromFilter)(filterValue, getColumnIdentifier(column))
            }
        },
        _getSyncHeaderFilter: function(filterValue, column) {
            var filter = getConditionFromHeaderFilter(column);
            if (filter) {
                return (0, _utils.syncFilters)(filterValue, filter)
            } else {
                return (0, _utils.removeFieldConditionsFromFilter)(filterValue, getColumnIdentifier(column))
            }
        },
        getFilterValueFromColumns: function(columns) {
            if (!this.getController("data").isFilterSyncActive()) {
                return null
            }
            var filterValue = ["and"];
            columns && columns.forEach(function(column) {
                var headerFilter = getConditionFromHeaderFilter(column);
                var filterRow = getConditionFromFilterRow(column);
                headerFilter && (0, _utils.addItem)(headerFilter, filterValue);
                filterRow && (0, _utils.addItem)(filterRow, filterValue)
            });
            return (0, _utils.getNormalizedFilter)(filterValue)
        },
        syncFilterRow: function(column, value) {
            this.option("filterValue", this._getSyncFilterRow(this.option("filterValue"), column))
        },
        syncHeaderFilter: function(column) {
            this.option("filterValue", this._getSyncHeaderFilter(this.option("filterValue"), column))
        },
        getCustomFilterOperations: function() {
            var filterBuilderCustomOperations = this.option("filterBuilder.customOperations") || [];
            return [(0, _uiGrid_core3.anyOf)(this.component), (0, _uiGrid_core3.noneOf)(this.component)].concat(filterBuilderCustomOperations)
        },
        publicMethods: function() {
            return ["getCustomFilterOperations"]
        }
    }
}());
var DataControllerFilterSyncExtender = {
    isFilterSyncActive: function() {
        var filterSyncEnabledValue = this.option("filterSyncEnabled");
        return "auto" === filterSyncEnabledValue ? this.option("filterPanel.visible") : filterSyncEnabledValue
    },
    skipCalculateColumnFilters: function() {
        return (0, _type.isDefined)(this.option("filterValue")) && this.isFilterSyncActive()
    },
    _calculateAdditionalFilter: function() {
        var that = this;
        if (false === that.option("filterPanel.filterEnabled")) {
            return that.callBase()
        }
        var filters = [that.callBase()];
        var columns = that.getController("columns").getFilteringColumns();
        var filterValue = that.option("filterValue");
        if (that.isFilterSyncActive()) {
            var currentColumn = that.getController("headerFilter").getCurrentColumn();
            if (currentColumn && filterValue) {
                filterValue = (0, _utils.removeFieldConditionsFromFilter)(filterValue, getColumnIdentifier(currentColumn))
            }
        }
        var customOperations = that.getController("filterSync").getCustomFilterOperations();
        var calculatedFilterValue = (0, _utils.getFilterExpression)(filterValue, columns, customOperations, "filterBuilder");
        if (calculatedFilterValue) {
            filters.push(calculatedFilterValue)
        }
        return _uiGrid_core2.default.combineFilters(filters)
    },
    _parseColumnPropertyName: function(fullName) {
        var matched = fullName.match(/.*\.(.*)/);
        return matched[1]
    },
    clearFilter: function(filterName) {
        this.component.beginUpdate();
        if (arguments.length > 0) {
            if ("filterValue" === filterName) {
                this.option("filterValue", null)
            }
            this.callBase(filterName)
        } else {
            this.option("filterValue", null);
            this.callBase()
        }
        this.component.endUpdate()
    },
    optionChanged: function(args) {
        switch (args.name) {
            case "filterValue":
                this._applyFilter();
                this.isFilterSyncActive() && this.getController("filterSync").syncFilterValue();
                args.handled = true;
                break;
            case "filterSyncEnabled":
                args.handled = true;
                break;
            case "columns":
                if (this.isFilterSyncActive()) {
                    var column = this.getController("columns").getColumnByPath(args.fullName);
                    var filterSyncController = this.getController("filterSync");
                    if (column && !filterSyncController._skipSyncColumnOptions) {
                        var propertyName = this._parseColumnPropertyName(args.fullName);
                        filterSyncController._skipSyncColumnOptions = true;
                        if ("filterType" === propertyName) {
                            if (FILTER_TYPES_EXCLUDE === args.value || FILTER_TYPES_EXCLUDE === args.previousValue) {
                                filterSyncController.syncHeaderFilter(column)
                            }
                        } else {
                            if ("filterValues" === propertyName) {
                                filterSyncController.syncHeaderFilter(column)
                            } else {
                                if (["filterValue", "selectedFilterOperation"].indexOf(propertyName) > -1) {
                                    filterSyncController.syncFilterRow(column, column.filterValue)
                                }
                            }
                        }
                        filterSyncController._skipSyncColumnOptions = false
                    }
                }
                this.callBase(args);
                break;
            default:
                this.callBase(args)
        }
    }
};
var ColumnHeadersViewFilterSyncExtender = {
    _isHeaderFilterEmpty: function(column) {
        if (this.getController("data").isFilterSyncActive()) {
            return !(0, _utils.filterHasField)(this.option("filterValue"), getColumnIdentifier(column))
        }
        return this.callBase(column)
    },
    _needUpdateFilterIndicators: function() {
        return !this.getController("data").isFilterSyncActive()
    },
    optionChanged: function(args) {
        if ("filterValue" === args.name) {
            this._updateHeaderFilterIndicators()
        } else {
            this.callBase(args)
        }
    }
};
var _default = {
    defaultOptions: function() {
        return {
            filterValue: null,
            filterSyncEnabled: "auto"
        }
    },
    controllers: {
        filterSync: FilterSyncController
    },
    extenders: {
        controllers: {
            data: DataControllerFilterSyncExtender
        },
        views: {
            columnHeadersView: ColumnHeadersViewFilterSyncExtender
        }
    }
};
exports.default = _default;
module.exports = exports.default;
