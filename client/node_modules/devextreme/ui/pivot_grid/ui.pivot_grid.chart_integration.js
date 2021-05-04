/**
 * DevExtreme (ui/pivot_grid/ui.pivot_grid.chart_integration.js)
 * Version: 20.2.6
 * Build date: Tue Mar 16 2021
 *
 * Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
exports.default = void 0;
var _renderer = _interopRequireDefault(require("../../core/renderer"));
var _extend = require("../../core/utils/extend");
var _uiPivot_grid = require("./ui.pivot_grid.utils");
var _iterator = require("../../core/utils/iterator");

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        "default": obj
    }
}
var FORMAT_DICTIONARY = {
    number: "numeric",
    date: "datetime"
};
var UNBIND_KEY = "dxPivotGridUnbinding";

function getFormattedValue(path, fields) {
    var value = [];
    var lastFieldIndex = fields.length - 1;
    (0, _iterator.each)(path, function(i, item) {
        value.push(item.text || (0, _uiPivot_grid.formatValue)(item.value, fields[lastFieldIndex - i]))
    });
    return value.reverse()
}

function getExpandedLevel(node) {
    var level = 0;
    (0, _uiPivot_grid.foreachTree)(node, function(members) {
        level = Math.max(level, members.length - 1)
    });
    return level
}

function processDataCell(processCellArgs, processCell) {
    var chartDataItem = processCellArgs.chartDataItem;
    var processedCell = processCell && processCell(processCellArgs);
    if (processedCell) {
        chartDataItem = (0, _extend.extend)({}, chartDataItem, processedCell.chartDataItem);
        processedCell = (0, _extend.extend)({}, processCellArgs, processedCell, {
            chartDataItem: chartDataItem
        });
        return processedCell
    }
    return processCellArgs
}

function createChartDataSource(pivotGridDataSource, mapOptions, axisDictionary) {
    var data = pivotGridDataSource.getData();
    var dataSource = [];
    var dataFields = pivotGridDataSource.getAreaFields("data");
    var rowFields = pivotGridDataSource.getAreaFields("row");
    var columnFields = pivotGridDataSource.getAreaFields("column");
    var columnElements = [{
        index: data.grandTotalColumnIndex,
        children: data.columns
    }];
    var rowElements = [{
        index: data.grandTotalRowIndex,
        children: data.rows
    }];
    var rowLevel = getExpandedLevel(rowElements);
    var columnLevel = getExpandedLevel(columnElements);
    var measureIndex;
    var dataField;
    var rowMemberIndex;
    var rowVisibility;
    var rowPathFormatted;
    var rowPath;
    var columnMemberIndex;
    var columnVisibility;
    var columnPath;
    var columnPathFormatted;

    function createDataItem() {
        var dataCell = (data.values[rowMemberIndex] || [])[columnMemberIndex] || [];
        var value = dataCell[measureIndex];
        var axis;
        var processCellArgs = {
            rowPath: rowPath,
            maxRowLevel: rowLevel,
            rowPathFormatted: rowPathFormatted,
            rowFields: rowFields,
            columnPathFormatted: columnPathFormatted,
            maxColumnLevel: columnLevel,
            columnPath: columnPath,
            columnFields: columnFields,
            dataFields: dataFields,
            dataIndex: measureIndex,
            dataValues: dataCell,
            visible: columnVisibility && rowVisibility
        };
        var seriesName = (mapOptions.inverted ? columnPathFormatted : rowPathFormatted).join(" - ");
        var argument = (mapOptions.inverted ? rowPathFormatted : columnPathFormatted).join("/");
        if (dataFields.length > 1) {
            if ("args" === mapOptions.putDataFieldsInto || "both" === mapOptions.putDataFieldsInto) {
                argument += " | " + dataField.caption
            }
            if ("args" !== mapOptions.putDataFieldsInto) {
                seriesName += " | " + dataField.caption;
                if ("singleAxis" !== mapOptions.dataFieldsDisplayMode) {
                    axis = dataField.caption
                }
            }
        }
        processCellArgs.chartDataItem = {
            val: void 0 === value ? null : value,
            series: seriesName,
            arg: argument
        };
        processCellArgs = processDataCell(processCellArgs, mapOptions.processCell);
        if (processCellArgs.visible) {
            axisDictionary[processCellArgs.chartDataItem.series] = axisDictionary[processCellArgs.chartDataItem.series] || axis;
            dataSource.push(processCellArgs.chartDataItem)
        }
    }

    function foreachRowColumn(callBack) {
        (0, _uiPivot_grid.foreachTree)(rowElements, function(rowMembers) {
            rowMemberIndex = rowMembers[0].index;
            rowMembers = rowMembers.slice(0, rowMembers.length - 1);
            rowVisibility = rowLevel === rowMembers.length;
            rowPath = (0, _uiPivot_grid.createPath)(rowMembers);
            rowPathFormatted = getFormattedValue(rowMembers, rowFields);
            if (0 === rowPath.length) {
                rowPathFormatted = [mapOptions.grandTotalText]
            }(0, _uiPivot_grid.foreachTree)(columnElements, function(columnMembers) {
                columnMemberIndex = columnMembers[0].index;
                columnMembers = columnMembers.slice(0, columnMembers.length - 1);
                columnVisibility = columnLevel === columnMembers.length;
                columnPath = (0, _uiPivot_grid.createPath)(columnMembers);
                columnPathFormatted = getFormattedValue(columnMembers, columnFields);
                if (0 === columnPath.length) {
                    columnPathFormatted = [mapOptions.grandTotalText]
                }
                callBack()
            })
        })
    }

    function foreachDataField(callback) {
        (0, _iterator.each)(dataFields, function(index, field) {
            dataField = field;
            measureIndex = index;
            callback()
        })
    }
    if (false === mapOptions.alternateDataFields) {
        foreachDataField(function() {
            foreachRowColumn(createDataItem)
        })
    } else {
        foreachRowColumn(function() {
            foreachDataField(createDataItem)
        })
    }
    return dataSource
}

function createValueAxisOptions(dataSource, options) {
    var dataFields = dataSource.getAreaFields("data");
    if ("args" !== options.putDataFieldsInto && "singleAxis" !== options.dataFieldsDisplayMode || 1 === dataFields.length) {
        var valueAxisSettings = [];
        (0, _iterator.each)(dataFields, function(_, dataField) {
            var valueAxisOptions = {
                name: dataField.caption,
                title: dataField.caption,
                valueType: FORMAT_DICTIONARY[dataField.dataType] || dataField.dataType,
                label: {
                    format: dataField.format
                }
            };
            if (dataField.customizeText) {
                valueAxisOptions.label.customizeText = function(formatObject) {
                    return dataField.customizeText.call(dataField, formatObject)
                }
            }
            if ("splitPanes" === options.dataFieldsDisplayMode) {
                valueAxisOptions.pane = dataField.caption
            }
            valueAxisSettings.push(valueAxisOptions)
        });
        return valueAxisSettings
    }
    return [{}]
}

function createPanesOptions(dataSource, options) {
    var panes = [];
    var dataFields = dataSource.getAreaFields("data");
    if (dataFields.length > 1 && "splitPanes" === options.dataFieldsDisplayMode && "args" !== options.putDataFieldsInto) {
        (0, _iterator.each)(dataFields, function(_, dataField) {
            panes.push({
                name: dataField.caption
            })
        })
    }
    if (!panes.length) {
        panes.push({})
    }
    return panes
}

function createChartOptions(dataSource, options) {
    var _customizeSeries = options.customizeSeries;
    var customizeChart = options.customizeChart;
    var chartOptions = {
        valueAxis: createValueAxisOptions(dataSource, options),
        panes: createPanesOptions(dataSource, options)
    };
    var axisDictionary = {};
    if (customizeChart) {
        chartOptions = (0, _extend.extend)(true, {}, chartOptions, customizeChart(chartOptions))
    }
    chartOptions.dataSource = createChartDataSource(dataSource, options, axisDictionary);
    chartOptions.seriesTemplate = {
        nameField: "series",
        customizeSeries: function(seriesName) {
            var seriesOptions = {};
            if ("splitPanes" === options.dataFieldsDisplayMode) {
                seriesOptions.pane = axisDictionary[seriesName]
            } else {
                if ("singleAxis" !== options.dataFieldsDisplayMode) {
                    seriesOptions.axis = axisDictionary[seriesName]
                }
            }
            if (_customizeSeries) {
                seriesOptions = (0, _extend.extend)(seriesOptions, _customizeSeries(seriesName, seriesOptions))
            }
            return seriesOptions
        }
    };
    return chartOptions
}

function getChartInstance(chartElement) {
    if (!chartElement) {
        return false
    }
    if (chartElement.NAME) {
        return "dxChart" === chartElement.NAME && chartElement
    }
    var element = (0, _renderer.default)(chartElement);
    return element.data("dxChart") && element.dxChart("instance")
}

function removeBinding(chart) {
    var unbind = chart.$element().data(UNBIND_KEY);
    unbind && unbind()
}
var _default = {
    bindChart: function(chart, integrationOptions) {
        integrationOptions = (0, _extend.extend)({}, integrationOptions);
        var that = this;
        var updateChart = function() {
            integrationOptions.grandTotalText = that.option("texts.grandTotal");
            var chartOptions = createChartOptions(that.getDataSource(), integrationOptions);
            chart.option(chartOptions)
        };
        chart = getChartInstance(chart);
        if (!chart) {
            return null
        }
        removeBinding(chart);
        that.on("changed", updateChart);
        updateChart();
        var disposeBinding = function() {
            chart.$element().removeData(UNBIND_KEY);
            that.off("changed", updateChart)
        };
        chart.on("disposing", disposeBinding);
        this.on("disposing", disposeBinding);
        chart.$element().data(UNBIND_KEY, disposeBinding);
        return disposeBinding
    }
};
exports.default = _default;
module.exports = exports.default;
