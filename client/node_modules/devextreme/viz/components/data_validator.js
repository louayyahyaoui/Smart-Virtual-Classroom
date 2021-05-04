/**
 * DevExtreme (viz/components/data_validator.js)
 * Version: 20.2.6
 * Build date: Tue Mar 16 2021
 *
 * Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
exports.validateData = validateData;
var _type = require("../../core/utils/type");
var _extend = require("../../core/utils/extend");
var _utils = require("../core/utils");
var _parse_utils = require("./parse_utils");
var STRING = "string";
var NUMERIC = "numeric";
var DATETIME = "datetime";
var DISCRETE = "discrete";
var SEMIDISCRETE = "semidiscrete";
var CONTINUOUS = "continuous";
var LOGARITHMIC = "logarithmic";
var VALUE_TYPE = "valueType";
var ARGUMENT_TYPE = "argumentType";
var axisTypeParser = (0, _utils.enumParser)([STRING, NUMERIC, DATETIME]);
var _isArray = Array.isArray;

function groupingValues(data, others, valueField, index) {
    if (index >= 0) {
        data.slice(index).forEach(function(cell) {
            if ((0, _type.isDefined)(cell[valueField])) {
                others[valueField] += cell[valueField];
                cell[valueField] = void 0
            }
        })
    }
}

function processGroups(groups) {
    groups.forEach(function(group) {
        group.valueType = group.valueAxisType = null;
        group.series.forEach(function(series) {
            series.updateDataType({})
        });
        group.valueAxis && group.valueAxis.resetTypes(VALUE_TYPE)
    })
}

function sortValues(data, asc, selector) {
    var func = asc ? function(a, b) {
        return a - b
    } : function(a, b) {
        return b - a
    };
    data.sort(function(a, b) {
        var valA = selector(a);
        var valB = selector(b);
        var aa = (0, _type.isDefined)(valA) ? 1 : 0;
        var bb = (0, _type.isDefined)(valB) ? 1 : 0;
        return aa && bb ? func(valA, valB) : func(aa, bb)
    });
    return data
}

function resetArgumentAxes(axes) {
    axes && axes.forEach(function(axis) {
        axis.resetTypes(ARGUMENT_TYPE)
    })
}

function parseCategories(categories, parser) {
    var newArray = [];
    categories.forEach(function(category) {
        var parsedCategory = parser(category);
        void 0 !== parsedCategory && newArray.push(parsedCategory)
    });
    return newArray
}

function parseAxisCategories(groupsData, parsers) {
    var argumentCategories = groupsData.argumentOptions && groupsData.argumentOptions.categories;
    groupsData.groups.forEach(function(valueGroup, i) {
        var categories = valueGroup.valueOptions && valueGroup.valueOptions.categories;
        if (categories) {
            valueGroup.valueOptions.categories = parseCategories(categories, parsers[i + 1])
        }
    });
    if (argumentCategories) {
        groupsData.argumentOptions.categories = parseCategories(argumentCategories, parsers[0])
    }
}

function eigen(x) {
    return x
}

function getType(unit, type) {
    var result = type;
    if (type === STRING || (0, _type.isString)(unit)) {
        result = STRING
    } else {
        if (type === DATETIME || (0, _type.isDate)(unit)) {
            result = DATETIME
        } else {
            if ((0, _type.isNumeric)(unit)) {
                result = NUMERIC
            }
        }
    }
    return result
}

function correctAxisType(type, axisType, hasCategories, incidentOccurred) {
    if (type === STRING && (axisType === CONTINUOUS || axisType === LOGARITHMIC || axisType === SEMIDISCRETE)) {
        incidentOccurred("E2002")
    }
    return axisType === LOGARITHMIC ? LOGARITHMIC : hasCategories || axisType === DISCRETE || type === STRING ? DISCRETE : axisType === SEMIDISCRETE ? SEMIDISCRETE : CONTINUOUS
}

function validUnit(unit, field, incidentOccurred) {
    if (unit) {
        incidentOccurred(!(0, _type.isNumeric)(unit) && !(0, _type.isDate)(unit) && !(0, _type.isString)(unit) ? "E2003" : "E2004", [field])
    }
}

function createParserUnit(type, axisType, incidentOccurred) {
    var parser = type ? (0, _parse_utils.getParser)(type) : eigen;
    var filterInfinity = axisType !== DISCRETE ? function(x) {
        return isFinite(x) || void 0 === x ? x : null
    } : eigen;
    return function(unit, field) {
        var parseUnit = filterInfinity(parser(unit));
        if (void 0 === parseUnit) {
            validUnit(unit, field, incidentOccurred)
        }
        return parseUnit
    }
}

function prepareParsers(groupsData, incidentOccurred) {
    var argumentParser = createParserUnit(groupsData.argumentType, groupsData.argumentAxisType, incidentOccurred);
    var sizeParser;
    var valueParser;
    var categoryParsers = [argumentParser];
    var cache = {};
    var list = [];
    groupsData.groups.forEach(function(group, groupIndex) {
        group.series.forEach(function(series) {
            valueParser = createParserUnit(group.valueType, group.valueAxisType, incidentOccurred);
            sizeParser = createParserUnit(NUMERIC, CONTINUOUS, incidentOccurred);
            cache[series.getArgumentField()] = argumentParser;
            series.getValueFields().forEach(function(field) {
                categoryParsers[groupIndex + 1] = valueParser;
                cache[field] = valueParser
            });
            if (series.getSizeField()) {
                cache[series.getSizeField()] = sizeParser
            }
        })
    });
    for (var field in cache) {
        list.push([field, cache[field]])
    }
    list.length && parseAxisCategories(groupsData, categoryParsers);
    return list
}

function getParsedCell(cell, parsers) {
    var i;
    var ii = parsers.length;
    var obj = (0, _extend.extend)({}, cell);
    var field;
    var value;
    for (i = 0; i < ii; ++i) {
        field = parsers[i][0];
        value = cell[field];
        obj[field] = parsers[i][1](value, field)
    }
    return obj
}

function parse(data, parsers) {
    var parsedData = [];
    var i;
    var ii = data.length;
    parsedData.length = ii;
    for (i = 0; i < ii; ++i) {
        parsedData[i] = getParsedCell(data[i], parsers)
    }
    return parsedData
}

function findIndexByThreshold(data, valueField, threshold) {
    var i;
    var ii = data.length;
    var value;
    for (i = 0; i < ii; ++i) {
        value = data[i][valueField];
        if ((0, _type.isDefined)(value) && threshold > value) {
            break
        }
    }
    return i
}

function groupMinSlices(originalData, argumentField, valueField, smallValuesGrouping) {
    smallValuesGrouping = smallValuesGrouping || {};
    var mode = smallValuesGrouping.mode;
    var others = {};
    if (!mode || "none" === mode) {
        return
    }
    others[argumentField] = String(smallValuesGrouping.groupName || "others");
    others[valueField] = 0;
    var data = sortValues(originalData.slice(), false, function(a) {
        return a[valueField]
    });
    groupingValues(data, others, valueField, "smallValueThreshold" === mode ? findIndexByThreshold(data, valueField, smallValuesGrouping.threshold) : smallValuesGrouping.topCount);
    others[valueField] && originalData.push(others)
}

function groupPieData(data, groupsData) {
    var firstSeries = groupsData.groups[0] && groupsData.groups[0].series[0];
    var isPie = firstSeries && ("pie" === firstSeries.type || "doughnut" === firstSeries.type || "donut" === firstSeries.type);
    if (!isPie) {
        return
    }
    groupsData.groups.forEach(function(group) {
        group.series.forEach(function(series) {
            groupMinSlices(data, series.getArgumentField(), series.getValueFields()[0], series.getOptions().smallValuesGrouping)
        })
    })
}

function addUniqueItemToCollection(item, collection, itemsHash) {
    if (!itemsHash[item]) {
        collection.push(item);
        itemsHash[item] = true
    }
}

function getUniqueArgumentFields(groupsData) {
    var uniqueArgumentFields = [];
    var hash = {};
    groupsData.groups.forEach(function(group) {
        group.series.forEach(function(series) {
            addUniqueItemToCollection(series.getArgumentField(), uniqueArgumentFields, hash)
        })
    });
    return uniqueArgumentFields
}

function sort(a, b) {
    var result = a - b;
    if (isNaN(result)) {
        if (!(0, _type.isDefined)(a)) {
            return 1
        }
        if (!(0, _type.isDefined)(b)) {
            return -1
        }
        return 0
    }
    return result
}

function sortByArgument(data, argumentField) {
    return data.slice().sort(function(a, b) {
        return sort(a[argumentField], b[argumentField])
    })
}

function sortByCallback(data, callback) {
    return data.slice().sort(callback)
}

function checkValueTypeOfGroup(group, cell) {
    group.series.forEach(function(series) {
        series.getValueFields().forEach(function(field) {
            group.valueType = getType(cell[field], group.valueType)
        })
    });
    return group.valueType
}

function getSortByCategories(categories) {
    var hash = {};
    categories.forEach(function(value, i) {
        hash[value] = i
    });
    return function(data, argumentField) {
        return sortValues(data.slice(), true, function(a) {
            return hash[a[argumentField]]
        })
    }
}

function sortData(data, groupsData, options, uniqueArgumentFields) {
    var dataByArguments = {};
    var isDiscrete = groupsData.argumentAxisType === DISCRETE;
    var userCategories = isDiscrete && groupsData.argumentOptions && groupsData.argumentOptions.categories;
    var sortFunction = function(data) {
        return data
    };
    var sortingMethodOption = options.sortingMethod;
    var reSortCategories;
    if (!userCategories && (0, _type.isFunction)(sortingMethodOption)) {
        data = sortByCallback(data, sortingMethodOption)
    }
    if (isDiscrete) {
        groupsData.categories = getCategories(data, uniqueArgumentFields, userCategories)
    }
    if (userCategories || !(0, _type.isFunction)(sortingMethodOption) && groupsData.argumentType === STRING && !options._skipArgumentSorting) {
        sortFunction = getSortByCategories(groupsData.categories)
    } else {
        if (true === sortingMethodOption && groupsData.argumentType !== STRING) {
            sortFunction = sortByArgument;
            reSortCategories = isDiscrete
        }
    }
    uniqueArgumentFields.forEach(function(field) {
        dataByArguments[field] = sortFunction(data, field)
    });
    if (reSortCategories) {
        groupsData.categories = groupsData.categories.sort(sort)
    }
    return dataByArguments
}

function checkItemExistence(collection, item) {
    return collection.map(function(collectionItem) {
        return collectionItem.valueOf()
    }).indexOf(item.valueOf()) === -1
}

function getCategories(data, uniqueArgumentFields, userCategories) {
    var categories = userCategories ? userCategories.slice() : [];
    uniqueArgumentFields.forEach(function(field) {
        data.forEach(function(item) {
            var dataItem = item[field];
            (0, _type.isDefined)(dataItem) && checkItemExistence(categories, dataItem) && categories.push(dataItem)
        })
    });
    return categories
}

function checkArgumentTypeOfGroup(series, cell, groupsData) {
    series.forEach(function(currentSeries) {
        groupsData.argumentType = getType(cell[currentSeries.getArgumentField()], groupsData.argumentType)
    });
    return groupsData.argumentType
}

function checkType(data, groupsData, checkTypeForAllData) {
    var groupsWithUndefinedValueType = [];
    var groupsWithUndefinedArgumentType = [];
    var argumentTypeGroup = groupsData.argumentOptions && axisTypeParser(groupsData.argumentOptions.argumentType);
    var groupsIndexes;
    groupsData.groups.forEach(function(group) {
        if (!group.series.length) {
            return
        }
        var valueTypeGroup = group.valueOptions && axisTypeParser(group.valueOptions.valueType);
        group.valueType = valueTypeGroup;
        groupsData.argumentType = argumentTypeGroup;
        !valueTypeGroup && groupsWithUndefinedValueType.push(group);
        !argumentTypeGroup && groupsWithUndefinedArgumentType.push(group)
    });
    if (groupsWithUndefinedValueType.length || groupsWithUndefinedArgumentType.length) {
        groupsIndexes = groupsWithUndefinedValueType.map(function(_, index) {
            return index
        });
        data.some(function(cell) {
            var defineArg;
            groupsWithUndefinedValueType.forEach(function(group, groupIndex) {
                if (checkValueTypeOfGroup(group, cell) && groupsIndexes.indexOf(groupIndex) >= 0) {
                    groupsIndexes.splice(groupIndex, 1)
                }
            });
            if (!defineArg) {
                groupsWithUndefinedArgumentType.forEach(function(group) {
                    defineArg = checkArgumentTypeOfGroup(group.series, cell, groupsData)
                })
            }
            if (!checkTypeForAllData && defineArg && 0 === groupsIndexes.length) {
                return true
            }
        })
    }
}

function checkAxisType(groupsData, incidentOccurred) {
    var argumentOptions = groupsData.argumentOptions || {};
    var userArgumentCategories = argumentOptions && argumentOptions.categories || [];
    var argumentAxisType = correctAxisType(groupsData.argumentType, argumentOptions.type, !!userArgumentCategories.length, incidentOccurred);
    groupsData.groups.forEach(function(group) {
        var valueOptions = group.valueOptions || {};
        var valueCategories = valueOptions.categories || [];
        var valueAxisType = correctAxisType(group.valueType, valueOptions.type, !!valueCategories.length, incidentOccurred);
        group.series.forEach(function(series) {
            var optionsSeries = {};
            optionsSeries.argumentAxisType = argumentAxisType;
            optionsSeries.valueAxisType = valueAxisType;
            groupsData.argumentAxisType = groupsData.argumentAxisType || optionsSeries.argumentAxisType;
            group.valueAxisType = group.valueAxisType || optionsSeries.valueAxisType;
            optionsSeries.argumentType = groupsData.argumentType;
            optionsSeries.valueType = group.valueType;
            optionsSeries.showZero = valueOptions.showZero;
            series.updateDataType(optionsSeries)
        });
        group.valueAxisType = group.valueAxisType || valueAxisType;
        if (group.valueAxis) {
            group.valueAxis.setTypes(group.valueAxisType, group.valueType, VALUE_TYPE);
            group.valueAxis.validate()
        }
    });
    groupsData.argumentAxisType = groupsData.argumentAxisType || argumentAxisType;
    if (groupsData.argumentAxes) {
        groupsData.argumentAxes.forEach(function(axis) {
            axis.setTypes(groupsData.argumentAxisType, groupsData.argumentType, ARGUMENT_TYPE);
            axis.validate()
        })
    }
}

function verifyData(source, incidentOccurred) {
    var data = [];
    var sourceIsDefined = (0, _type.isDefined)(source);
    var hasError = sourceIsDefined && !_isArray(source);
    var i;
    var ii;
    var k;
    var item;
    if (sourceIsDefined && !hasError) {
        for (i = 0, ii = source.length, k = 0; i < ii; ++i) {
            item = source[i];
            if ((0, _type.isObject)(item)) {
                data[k++] = item
            } else {
                if (item) {
                    hasError = true
                }
            }
        }
    }
    if (hasError) {
        incidentOccurred("E2001")
    }
    return data
}

function validateData(data, groupsData, incidentOccurred, options) {
    data = verifyData(data, incidentOccurred);
    groupsData.argumentType = groupsData.argumentAxisType = null;
    processGroups(groupsData.groups);
    resetArgumentAxes(groupsData.argumentAxes);
    checkType(data, groupsData, options.checkTypeForAllData);
    checkAxisType(groupsData, incidentOccurred);
    if (options.convertToAxisDataType) {
        data = parse(data, prepareParsers(groupsData, incidentOccurred))
    }
    groupPieData(data, groupsData);
    var dataByArgumentFields = sortData(data, groupsData, options, getUniqueArgumentFields(groupsData));
    return dataByArgumentFields
}
