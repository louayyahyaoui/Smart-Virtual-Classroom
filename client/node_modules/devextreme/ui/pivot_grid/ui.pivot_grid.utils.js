/**
 * DevExtreme (ui/pivot_grid/ui.pivot_grid.utils.js)
 * Version: 20.2.6
 * Build date: Tue Mar 16 2021
 *
 * Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
exports.sendRequest = sendRequest;
exports.findField = findField;
exports.formatValue = formatValue;
exports.getCompareFunction = getCompareFunction;
exports.createPath = createPath;
exports.foreachDataLevel = foreachDataLevel;
exports.mergeArraysByMaxValue = mergeArraysByMaxValue;
exports.getExpandedLevel = getExpandedLevel;
exports.discoverObjectFields = discoverObjectFields;
exports.getFieldsDataType = getFieldsDataType;
exports.setDefaultFieldValueFormatting = setDefaultFieldValueFormatting;
exports.getFiltersByPath = getFiltersByPath;
exports.capitalizeFirstLetter = capitalizeFirstLetter;
exports.storeDrillDownMixin = exports.foreachTreeAsync = exports.foreachTree = exports.setFieldProperty = void 0;
var _type = require("../../core/utils/type");
var _ajax = _interopRequireDefault(require("../../core/utils/ajax"));
var _data = require("../../core/utils/data");
var _iterator = require("../../core/utils/iterator");
var _extend = require("../../core/utils/extend");
var _date = _interopRequireDefault(require("../../localization/date"));
var _format_helper = _interopRequireDefault(require("../../format_helper"));
var _data_source = require("../../data/data_source/data_source");
var _array_store = _interopRequireDefault(require("../../data/array_store"));
var _deferred = require("../../core/utils/deferred");

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        "default": obj
    }
}
var setFieldProperty = function(field, property, value, isInitialization) {
    var initProperties = field._initProperties = field._initProperties || {};
    var initValue = isInitialization ? value : field[property];
    if (!Object.prototype.hasOwnProperty.call(initProperties, property) || isInitialization) {
        initProperties[property] = initValue
    }
    field[property] = value
};
exports.setFieldProperty = setFieldProperty;

function sendRequest(options) {
    return _ajax.default.sendRequest(options)
}
var foreachTreeAsyncDate = new Date;

function createForeachTreeFunc(isAsync) {
    var foreachTreeFunc = function foreachTreeFunc(items, callback, parentAtFirst, members, index, isChildrenProcessing) {
        members = members || [];
        items = items || [];
        var i;
        var deferred;
        index = index || 0;

        function createForeachTreeAsyncHandler(deferred, i, isChildrenProcessing) {
            (0, _deferred.when)(foreachTreeFunc(items, callback, parentAtFirst, members, i, isChildrenProcessing)).done(deferred.resolve)
        }
        for (i = index; i < items.length; i++) {
            if (isAsync && i > index && i % 1e4 === 0 && new Date - foreachTreeAsyncDate >= 300) {
                foreachTreeAsyncDate = new Date;
                deferred = new _deferred.Deferred;
                setTimeout(createForeachTreeAsyncHandler(deferred, i, false), 0);
                return deferred
            }
            var item = items[i];
            if (!isChildrenProcessing) {
                members.unshift(item);
                if (parentAtFirst && false === callback(members, i)) {
                    return
                }
                if (item.children) {
                    var childrenDeferred = foreachTreeFunc(item.children, callback, parentAtFirst, members);
                    if (isAsync && childrenDeferred) {
                        deferred = new _deferred.Deferred;
                        childrenDeferred.done(createForeachTreeAsyncHandler(deferred, i, true));
                        return deferred
                    }
                }
            }
            isChildrenProcessing = false;
            if (!parentAtFirst && false === callback(members, i)) {
                return
            }
            members.shift();
            if (items[i] !== item) {
                i--
            }
        }
    };
    return foreachTreeFunc
}
var foreachTree = createForeachTreeFunc(false);
exports.foreachTree = foreachTree;
var foreachTreeAsync = createForeachTreeFunc(true);
exports.foreachTreeAsync = foreachTreeAsync;

function findField(fields, id) {
    if (fields && (0, _type.isDefined)(id)) {
        for (var i = 0; i < fields.length; i++) {
            var field = fields[i];
            if (field.name === id || field.caption === id || field.dataField === id || field.index === id) {
                return i
            }
        }
    }
    return -1
}

function formatValue(value, options) {
    var valueText = value === value && _format_helper.default.format(value, options.format);
    var formatObject = {
        value: value,
        valueText: valueText || ""
    };
    return options.customizeText ? options.customizeText.call(options, formatObject) : formatObject.valueText
}

function getCompareFunction(valueSelector) {
    return function(a, b) {
        var result = 0;
        var valueA = valueSelector(a);
        var valueB = valueSelector(b);
        var aIsDefined = (0, _type.isDefined)(valueA);
        var bIsDefined = (0, _type.isDefined)(valueB);
        if (aIsDefined && bIsDefined) {
            if (valueA > valueB) {
                result = 1
            } else {
                if (valueA < valueB) {
                    result = -1
                }
            }
        }
        if (aIsDefined && !bIsDefined) {
            result = 1
        }
        if (!aIsDefined && bIsDefined) {
            result = -1
        }
        return result
    }
}

function createPath(items) {
    var result = [];
    for (var i = items.length - 1; i >= 0; i--) {
        result.push(items[i].key || items[i].value)
    }
    return result
}

function foreachDataLevel(data, callback, index, childrenField) {
    index = index || 0;
    childrenField = childrenField || "children";
    if (data.length) {
        callback(data, index)
    }
    for (var i = 0; i < data.length; i++) {
        var item = data[i];
        if (item[childrenField] && item[childrenField].length) {
            foreachDataLevel(item[childrenField], callback, index + 1, childrenField)
        }
    }
}

function mergeArraysByMaxValue(values1, values2) {
    var result = [];
    for (var i = 0; i < values1.length; i++) {
        result.push(Math.max(values1[i] || 0, values2[i] || 0))
    }
    return result
}

function getExpandedLevel(options, axisName) {
    var dimensions = options[axisName];
    var expandLevel = 0;
    var expandedPaths = ("columns" === axisName ? options.columnExpandedPaths : options.rowExpandedPaths) || [];
    if (options.headerName === axisName) {
        expandLevel = options.path.length
    } else {
        if (options.headerName && options.headerName !== axisName && options.oppositePath) {
            expandLevel = options.oppositePath.length
        } else {
            (0, _iterator.each)(expandedPaths, function(_, path) {
                expandLevel = Math.max(expandLevel, path.length)
            })
        }
    }
    while (dimensions[expandLevel + 1] && dimensions[expandLevel].expanded) {
        expandLevel++
    }
    return expandLevel
}

function createGroupFields(item) {
    return (0, _iterator.map)(["year", "quarter", "month"], function(value, index) {
        return (0, _extend.extend)({}, item, {
            groupInterval: value,
            groupIndex: index
        })
    })
}

function parseFields(dataSource, fieldsList, path, fieldsDataType) {
    var result = [];
    Object.keys(fieldsList || []).forEach(function(field) {
        if (field && 0 === field.indexOf("__")) {
            return
        }
        var dataIndex = 1;
        var currentPath = path.length ? path + "." + field : field;
        var dataType = fieldsDataType[currentPath];
        var getter = (0, _data.compileGetter)(currentPath);
        var value = fieldsList[field];
        var items;
        while (!(0, _type.isDefined)(value) && dataSource[dataIndex]) {
            value = getter(dataSource[dataIndex]);
            dataIndex++
        }
        if (!dataType && (0, _type.isDefined)(value)) {
            dataType = (0, _type.type)(value)
        }
        items = [{
            dataField: currentPath,
            dataType: dataType,
            groupName: "date" === dataType ? field : void 0,
            groupInterval: void 0,
            displayFolder: path
        }];
        if ("date" === dataType) {
            items = items.concat(createGroupFields(items[0]))
        } else {
            if ("object" === dataType) {
                items = parseFields(dataSource, value, currentPath, fieldsDataType)
            }
        }
        result.push.apply(result, items)
    });
    return result
}

function discoverObjectFields(items, fields) {
    var fieldsDataType = getFieldsDataType(fields);
    return parseFields(items, items[0], "", fieldsDataType)
}

function getFieldsDataType(fields) {
    var result = {};
    (0, _iterator.each)(fields, function(_, field) {
        result[field.dataField] = result[field.dataField] || field.dataType
    });
    return result
}
var DATE_INTERVAL_FORMATS = {
    month: function(value) {
        return _date.default.getMonthNames()[value - 1]
    },
    quarter: function(value) {
        return _date.default.format(new Date(2e3, 3 * value - 1), "quarter")
    },
    dayOfWeek: function(value) {
        return _date.default.getDayNames()[value]
    }
};

function setDefaultFieldValueFormatting(field) {
    if ("date" === field.dataType) {
        if (!field.format) {
            setFieldProperty(field, "format", DATE_INTERVAL_FORMATS[field.groupInterval])
        }
    } else {
        if ("number" === field.dataType) {
            var groupInterval = (0, _type.isNumeric)(field.groupInterval) && field.groupInterval > 0 && field.groupInterval;
            if (groupInterval && !field.customizeText) {
                setFieldProperty(field, "customizeText", function(formatObject) {
                    var secondValue = formatObject.value + groupInterval;
                    var secondValueText = _format_helper.default.format(secondValue, field.format);
                    return formatObject.valueText && secondValueText ? formatObject.valueText + " - " + secondValueText : ""
                })
            }
        }
    }
}

function getFiltersByPath(fields, path) {
    var result = [];
    path = path || [];
    for (var i = 0; i < path.length; i++) {
        result.push((0, _extend.extend)({}, fields[i], {
            groupIndex: null,
            groupName: null,
            filterType: "include",
            filterValues: [path[i]]
        }))
    }
    return result
}
var storeDrillDownMixin = {
    createDrillDownDataSource: function(descriptions, params) {
        var items = this.getDrillDownItems(descriptions, params);
        var arrayStore;

        function createCustomStoreMethod(methodName) {
            return function(options) {
                var d;
                if (arrayStore) {
                    d = arrayStore[methodName](options)
                } else {
                    d = new _deferred.Deferred;
                    (0, _deferred.when)(items).done(function(data) {
                        var arrayStore = new _array_store.default(data);
                        arrayStore[methodName](options).done(d.resolve).fail(d.reject)
                    }).fail(d.reject)
                }
                return d
            }
        }
        var dataSource = new _data_source.DataSource({
            load: createCustomStoreMethod("load"),
            totalCount: createCustomStoreMethod("totalCount"),
            key: this.key()
        });
        return dataSource
    }
};
exports.storeDrillDownMixin = storeDrillDownMixin;

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1)
}
