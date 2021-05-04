/**
 * DevExtreme (ui/filter_builder/utils.js)
 * Version: 20.2.6
 * Build date: Tue Mar 16 2021
 *
 * Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
exports.getGroupCriteria = getGroupCriteria;
exports.setGroupValue = setGroupValue;
exports.getGroupMenuItem = getGroupMenuItem;
exports.getGroupValue = getGroupValue;
exports.getFilterOperations = getFilterOperations;
exports.getCaptionByOperation = getCaptionByOperation;
exports.getOperationFromAvailable = getOperationFromAvailable;
exports.getCustomOperation = getCustomOperation;
exports.getAvailableOperations = getAvailableOperations;
exports.getDefaultOperation = getDefaultOperation;
exports.createCondition = createCondition;
exports.removeItem = removeItem;
exports.createEmptyGroup = createEmptyGroup;
exports.isEmptyGroup = isEmptyGroup;
exports.addItem = addItem;
exports.getField = getField;
exports.isGroup = isGroup;
exports.isCondition = isCondition;
exports.convertToInnerStructure = convertToInnerStructure;
exports.getNormalizedFields = getNormalizedFields;
exports.getFilterExpression = getFilterExpression;
exports.getNormalizedFilter = getNormalizedFilter;
exports.getCurrentLookupValueText = getCurrentLookupValueText;
exports.getCurrentValueText = getCurrentValueText;
exports.getItems = getItems;
exports.getCaptionWithParents = getCaptionWithParents;
exports.updateConditionByOperation = updateConditionByOperation;
exports.getOperationValue = getOperationValue;
exports.isValidCondition = isValidCondition;
exports.getMergedOperations = getMergedOperations;
exports.removeFieldConditionsFromFilter = removeFieldConditionsFromFilter;
exports.syncFilters = syncFilters;
exports.getMatchedConditions = getMatchedConditions;
exports.filterHasField = filterHasField;
exports.renderValueText = void 0;
var _renderer = _interopRequireDefault(require("../../core/renderer"));
var _deferred = require("../../core/utils/deferred");
var _errors = _interopRequireDefault(require("../../data/errors"));
var _type = require("../../core/utils/type");
var _data = require("../../core/utils/data");
var _ui = _interopRequireDefault(require("../widget/ui.errors"));
var _filtering = _interopRequireDefault(require("../shared/filtering"));
var _format_helper = _interopRequireDefault(require("../../format_helper"));
var _extend = require("../../core/utils/extend");
var _inflector = require("../../core/utils/inflector");
var _between = require("./between");
var _message = _interopRequireDefault(require("../../localization/message"));
var _data_source = require("../../data/data_source/data_source");
var _ui2 = _interopRequireDefault(require("./ui.filter_operations_dictionary"));

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        "default": obj
    }
}
var DEFAULT_DATA_TYPE = "string";
var EMPTY_MENU_ICON = "icon-none";
var AND_GROUP_OPERATION = "and";
var EQUAL_OPERATION = "=";
var NOT_EQUAL_OPERATION = "<>";
var DATATYPE_OPERATIONS = {
    number: ["=", "<>", "<", ">", "<=", ">=", "isblank", "isnotblank"],
    string: ["contains", "notcontains", "startswith", "endswith", "=", "<>", "isblank", "isnotblank"],
    date: ["=", "<>", "<", ">", "<=", ">=", "isblank", "isnotblank"],
    datetime: ["=", "<>", "<", ">", "<=", ">=", "isblank", "isnotblank"],
    "boolean": ["=", "<>", "isblank", "isnotblank"],
    object: ["isblank", "isnotblank"]
};
var DEFAULT_FORMAT = {
    date: "shortDate",
    datetime: "shortDateShortTime"
};
var LOOKUP_OPERATIONS = ["=", "<>", "isblank", "isnotblank"];
var AVAILABLE_FIELD_PROPERTIES = ["caption", "customizeText", "dataField", "dataType", "editorTemplate", "falseText", "editorOptions", "filterOperations", "format", "lookup", "trueText", "calculateFilterExpression", "name"];
var FILTER_BUILDER_CLASS = "dx-filterbuilder";
var FILTER_BUILDER_ITEM_TEXT_CLASS = FILTER_BUILDER_CLASS + "-text";
var FILTER_BUILDER_ITEM_TEXT_PART_CLASS = FILTER_BUILDER_ITEM_TEXT_CLASS + "-part";
var FILTER_BUILDER_ITEM_TEXT_SEPARATOR_CLASS = FILTER_BUILDER_ITEM_TEXT_CLASS + "-separator";
var FILTER_BUILDER_ITEM_TEXT_SEPARATOR_EMPTY_CLASS = FILTER_BUILDER_ITEM_TEXT_SEPARATOR_CLASS + "-empty";

function getFormattedValueText(field, value) {
    var fieldFormat = field.format || DEFAULT_FORMAT[field.dataType];
    return _format_helper.default.format(value, fieldFormat)
}

function isNegationGroup(group) {
    return group && group.length > 1 && "!" === group[0] && !isCondition(group)
}

function getGroupCriteria(group) {
    return isNegationGroup(group) ? group[1] : group
}

function setGroupCriteria(group, criteria) {
    if (isNegationGroup(group)) {
        group[1] = criteria
    } else {
        group = criteria
    }
    return group
}

function convertGroupToNewStructure(group, value) {
    var isNegationValue = function(value) {
        return value.indexOf("!") !== -1
    };
    var convertGroupToNegationGroup = function(group) {
        var criteria = group.slice(0);
        group.length = 0;
        group.push("!", criteria)
    };
    var convertNegationGroupToGroup = function(group) {
        var criteria = getGroupCriteria(group);
        group.length = 0;
        [].push.apply(group, criteria)
    };
    if (isNegationValue(value)) {
        if (!isNegationGroup(group)) {
            convertGroupToNegationGroup(group)
        }
    } else {
        if (isNegationGroup(group)) {
            convertNegationGroupToGroup(group)
        }
    }
}

function setGroupValue(group, value) {
    convertGroupToNewStructure(group, value);
    var criteria = getGroupCriteria(group);
    var i;
    var getNormalizedGroupValue = function(value) {
        return value.indexOf("!") === -1 ? value : value.substring(1)
    };
    var changeCriteriaValue = function(criteria, value) {
        for (i = 0; i < criteria.length; i++) {
            if (!Array.isArray(criteria[i])) {
                criteria[i] = value
            }
        }
    };
    value = getNormalizedGroupValue(value);
    changeCriteriaValue(criteria, value);
    return group
}

function getGroupMenuItem(group, availableGroups) {
    var groupValue = getGroupValue(group);
    return availableGroups.filter(function(item) {
        return item.value === groupValue
    })[0]
}

function getCriteriaOperation(criteria) {
    if (isCondition(criteria)) {
        return AND_GROUP_OPERATION
    }
    var value = "";
    for (var i = 0; i < criteria.length; i++) {
        var item = criteria[i];
        if (!Array.isArray(item)) {
            if (value && value !== item) {
                throw new _errors.default.errors.Error("E4019")
            }
            if ("!" !== item) {
                value = item
            }
        }
    }
    return value
}

function getGroupValue(group) {
    var criteria = getGroupCriteria(group);
    var value = getCriteriaOperation(criteria);
    if (!value) {
        value = AND_GROUP_OPERATION
    }
    if (criteria !== group) {
        value = "!" + value
    }
    return value
}

function getDefaultFilterOperations(field) {
    return field.lookup && LOOKUP_OPERATIONS || DATATYPE_OPERATIONS[field.dataType || DEFAULT_DATA_TYPE]
}

function containItems(entity) {
    return Array.isArray(entity) && entity.length
}

function getFilterOperations(field) {
    var result = containItems(field.filterOperations) ? field.filterOperations : getDefaultFilterOperations(field);
    return (0, _extend.extend)([], result)
}

function getCaptionByOperation(operation, filterOperationDescriptions) {
    var operationName = _ui2.default.getNameByFilterOperation(operation);
    return filterOperationDescriptions && filterOperationDescriptions[operationName] ? filterOperationDescriptions[operationName] : operationName
}

function getOperationFromAvailable(operation, availableOperations) {
    for (var i = 0; i < availableOperations.length; i++) {
        if (availableOperations[i].value === operation) {
            return availableOperations[i]
        }
    }
    throw new _ui.default.Error("E1048", operation)
}

function getCustomOperation(customOperations, name) {
    var filteredOperations = customOperations.filter(function(item) {
        return item.name === name
    });
    return filteredOperations.length ? filteredOperations[0] : null
}

function getAvailableOperations(field, filterOperationDescriptions, customOperations) {
    var filterOperations = getFilterOperations(field);
    var isLookupField = !!field.lookup;
    customOperations.forEach(function(customOperation) {
        if (!field.filterOperations && filterOperations.indexOf(customOperation.name) === -1) {
            var dataTypes = customOperation && customOperation.dataTypes;
            var isOperationForbidden = isLookupField ? !!customOperation.notForLookup : false;
            if (!isOperationForbidden && dataTypes && dataTypes.indexOf(field.dataType || DEFAULT_DATA_TYPE) >= 0) {
                filterOperations.push(customOperation.name)
            }
        }
    });
    return filterOperations.map(function(operation) {
        var customOperation = getCustomOperation(customOperations, operation);
        if (customOperation) {
            return {
                icon: customOperation.icon || EMPTY_MENU_ICON,
                text: customOperation.caption || (0, _inflector.captionize)(customOperation.name),
                value: customOperation.name,
                isCustom: true
            }
        } else {
            return {
                icon: _ui2.default.getIconByFilterOperation(operation) || EMPTY_MENU_ICON,
                text: getCaptionByOperation(operation, filterOperationDescriptions),
                value: operation
            }
        }
    })
}

function getDefaultOperation(field) {
    return field.defaultFilterOperation || getFilterOperations(field)[0]
}

function createCondition(field, customOperations) {
    var condition = [field.dataField, "", ""];
    var filterOperation = getDefaultOperation(field);
    updateConditionByOperation(condition, filterOperation, customOperations);
    return condition
}

function removeItem(group, item) {
    var criteria = getGroupCriteria(group);
    var index = criteria.indexOf(item);
    criteria.splice(index, 1);
    if (1 !== criteria.length) {
        criteria.splice(index, 1)
    }
    return group
}

function createEmptyGroup(value) {
    return value.indexOf("not") !== -1 ? ["!", [value.substring(3).toLowerCase()]] : [value]
}

function isEmptyGroup(group) {
    var criteria = getGroupCriteria(group);
    if (isCondition(criteria)) {
        return false
    }
    var hasConditions = criteria.some(function(item) {
        return isCondition(item)
    });
    return !hasConditions
}

function addItem(item, group) {
    var criteria = getGroupCriteria(group);
    var groupValue = getGroupValue(criteria);
    1 === criteria.length ? criteria.unshift(item) : criteria.push(item, groupValue);
    return group
}

function getField(dataField, fields) {
    for (var i = 0; i < fields.length; i++) {
        if (fields[i].name === dataField) {
            return fields[i]
        }
        if (fields[i].dataField.toLowerCase() === dataField.toLowerCase()) {
            return fields[i]
        }
    }
    var extendedFields = getItems(fields, true).filter(function(item) {
        return item.dataField.toLowerCase() === dataField.toLowerCase()
    });
    if (extendedFields.length > 0) {
        return extendedFields[0]
    }
    throw new _ui.default.Error("E1047", dataField)
}

function isGroup(criteria) {
    if (!Array.isArray(criteria)) {
        return false
    }
    return criteria.length < 2 || Array.isArray(criteria[0]) || Array.isArray(criteria[1])
}

function isCondition(criteria) {
    if (!Array.isArray(criteria)) {
        return false
    }
    return criteria.length > 1 && !Array.isArray(criteria[0]) && !Array.isArray(criteria[1])
}

function convertToInnerGroup(group, customOperations) {
    var groupOperation = getCriteriaOperation(group).toLowerCase() || AND_GROUP_OPERATION;
    var innerGroup = [];
    for (var i = 0; i < group.length; i++) {
        if (isGroup(group[i])) {
            innerGroup.push(convertToInnerStructure(group[i], customOperations));
            innerGroup.push(groupOperation)
        } else {
            if (isCondition(group[i])) {
                innerGroup.push(convertToInnerCondition(group[i], customOperations));
                innerGroup.push(groupOperation)
            }
        }
    }
    if (0 === innerGroup.length) {
        innerGroup.push(groupOperation)
    }
    return innerGroup
}

function conditionHasCustomOperation(condition, customOperations) {
    var customOperation = getCustomOperation(customOperations, condition[1]);
    return customOperation && customOperation.name === condition[1]
}

function convertToInnerCondition(condition, customOperations) {
    if (conditionHasCustomOperation(condition, customOperations)) {
        return condition
    }
    if (condition.length < 3) {
        condition[2] = condition[1];
        condition[1] = EQUAL_OPERATION
    }
    return condition
}

function convertToInnerStructure(value, customOperations) {
    if (!value) {
        return [AND_GROUP_OPERATION]
    }
    value = (0, _extend.extend)(true, [], value);
    if (isCondition(value)) {
        return [convertToInnerCondition(value, customOperations), AND_GROUP_OPERATION]
    }
    if (isNegationGroup(value)) {
        return ["!", isCondition(value[1]) ? [convertToInnerCondition(value[1], customOperations), AND_GROUP_OPERATION] : isNegationGroup(value[1]) ? [convertToInnerStructure(value[1], customOperations), AND_GROUP_OPERATION] : convertToInnerGroup(value[1], customOperations)]
    }
    return convertToInnerGroup(value, customOperations)
}

function getNormalizedFields(fields) {
    return fields.reduce(function(result, field) {
        if ((0, _type.isDefined)(field.dataField)) {
            var normalizedField = {};
            for (var key in field) {
                if (field[key] && AVAILABLE_FIELD_PROPERTIES.indexOf(key) > -1) {
                    normalizedField[key] = field[key]
                }
            }
            normalizedField.defaultCalculateFilterExpression = _filtering.default.defaultCalculateFilterExpression;
            if (!(0, _type.isDefined)(normalizedField.dataType)) {
                normalizedField.dataType = DEFAULT_DATA_TYPE
            }
            if (!(0, _type.isDefined)(normalizedField.trueText)) {
                normalizedField.trueText = _message.default.format("dxDataGrid-trueText")
            }
            if (!(0, _type.isDefined)(normalizedField.falseText)) {
                normalizedField.falseText = _message.default.format("dxDataGrid-falseText")
            }
            result.push(normalizedField)
        }
        return result
    }, [])
}

function getConditionFilterExpression(condition, fields, customOperations, target) {
    var field = getField(condition[0], fields);
    var filterExpression = convertToInnerCondition(condition, customOperations);
    var customOperation = customOperations.length && getCustomOperation(customOperations, filterExpression[1]);
    if (customOperation && customOperation.calculateFilterExpression) {
        return customOperation.calculateFilterExpression.apply(customOperation, [filterExpression[2], field, fields])
    } else {
        if (field.createFilterExpression) {
            return field.createFilterExpression.apply(field, [filterExpression[2], filterExpression[1], target])
        } else {
            if (field.calculateFilterExpression) {
                return field.calculateFilterExpression.apply(field, [filterExpression[2], filterExpression[1], target])
            } else {
                return field.defaultCalculateFilterExpression.apply(field, [filterExpression[2], filterExpression[1], target])
            }
        }
    }
}

function getFilterExpression(value, fields, customOperations, target) {
    if (!(0, _type.isDefined)(value)) {
        return null
    }
    if (isNegationGroup(value)) {
        var filterExpression = getFilterExpression(value[1], fields, customOperations, target);
        return ["!", filterExpression]
    }
    var criteria = getGroupCriteria(value);
    if (isCondition(criteria)) {
        return getConditionFilterExpression(criteria, fields, customOperations, target) || null
    } else {
        var result = [];
        var _filterExpression;
        var groupValue = getGroupValue(criteria);
        for (var i = 0; i < criteria.length; i++) {
            if (isGroup(criteria[i])) {
                _filterExpression = getFilterExpression(criteria[i], fields, customOperations, target);
                if (_filterExpression) {
                    i && result.push(groupValue);
                    result.push(_filterExpression)
                }
            } else {
                if (isCondition(criteria[i])) {
                    _filterExpression = getConditionFilterExpression(criteria[i], fields, customOperations, target);
                    if (_filterExpression) {
                        result.length && result.push(groupValue);
                        result.push(_filterExpression)
                    }
                }
            }
        }
        if (1 === result.length) {
            result = result[0]
        }
        return result.length ? result : null
    }
}

function getNormalizedFilter(group) {
    var criteria = getGroupCriteria(group);
    var i;
    if (0 === criteria.length) {
        return null
    }
    var itemsForRemove = [];
    for (i = 0; i < criteria.length; i++) {
        if (isGroup(criteria[i])) {
            var normalizedGroupValue = getNormalizedFilter(criteria[i]);
            if (normalizedGroupValue) {
                criteria[i] = normalizedGroupValue
            } else {
                itemsForRemove.push(criteria[i])
            }
        } else {
            if (isCondition(criteria[i])) {
                if (!isValidCondition(criteria[i])) {
                    itemsForRemove.push(criteria[i])
                }
            }
        }
    }
    for (i = 0; i < itemsForRemove.length; i++) {
        removeItem(criteria, itemsForRemove[i])
    }
    if (1 === criteria.length) {
        return null
    }
    criteria.splice(criteria.length - 1, 1);
    if (1 === criteria.length) {
        group = setGroupCriteria(group, criteria[0])
    }
    if (0 === group.length) {
        return null
    }
    return group
}

function getCurrentLookupValueText(field, value, handler) {
    if ("" === value) {
        handler("");
        return
    }
    var lookup = field.lookup;
    if (lookup.items) {
        handler(lookup.calculateCellValue(value) || "")
    } else {
        var lookupDataSource = (0, _type.isFunction)(lookup.dataSource) ? lookup.dataSource({}) : lookup.dataSource;
        var dataSource = new _data_source.DataSource(lookupDataSource);
        dataSource.loadSingle(lookup.valueExpr, value).done(function(result) {
            result ? handler(lookup.displayExpr ? (0, _data.compileGetter)(lookup.displayExpr)(result) : result) : handler("")
        }).fail(function() {
            handler("")
        })
    }
}

function getPrimitiveValueText(field, value, customOperation, target) {
    var valueText;
    if (true === value) {
        valueText = field.trueText || _message.default.format("dxDataGrid-trueText")
    } else {
        if (false === value) {
            valueText = field.falseText || _message.default.format("dxDataGrid-falseText")
        } else {
            valueText = getFormattedValueText(field, value)
        }
    }
    if (field.customizeText) {
        valueText = field.customizeText.call(field, {
            value: value,
            valueText: valueText,
            target: target
        })
    }
    if (customOperation && customOperation.customizeText) {
        valueText = customOperation.customizeText.call(customOperation, {
            value: value,
            valueText: valueText,
            field: field,
            target: target
        })
    }
    return valueText
}

function getArrayValueText(field, value, customOperation, target) {
    return value.map(function(v) {
        return getPrimitiveValueText(field, v, customOperation, target)
    })
}

function checkDefaultValue(value) {
    return "" === value || null === value
}

function getCurrentValueText(field, value, customOperation) {
    var target = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : "filterBuilder";
    if (checkDefaultValue(value)) {
        return ""
    }
    if (Array.isArray(value)) {
        var result = new _deferred.Deferred;
        _deferred.when.apply(this, getArrayValueText(field, value, customOperation, target)).done(function() {
            for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
                args[_key] = arguments[_key]
            }
            var text = args.some(function(item) {
                return !checkDefaultValue(item)
            }) ? args.map(function(item) {
                return !checkDefaultValue(item) ? item : "?"
            }) : "";
            result.resolve(text)
        });
        return result
    } else {
        return getPrimitiveValueText(field, value, customOperation, target)
    }
}

function itemExists(plainItems, parentId) {
    return plainItems.some(function(item) {
        return item.dataField === parentId
    })
}

function pushItemAndCheckParent(originalItems, plainItems, item) {
    var dataField = item.dataField;
    if (hasParent(dataField)) {
        item.parentId = getParentIdFromItemDataField(dataField);
        if (!itemExists(plainItems, item.parentId) && !itemExists(originalItems, item.parentId)) {
            pushItemAndCheckParent(originalItems, plainItems, {
                id: item.parentId,
                dataType: "object",
                dataField: item.parentId,
                caption: generateCaptionByDataField(item.parentId, true),
                filterOperations: ["isblank", "isnotblank"]
            })
        }
    }
    plainItems.push(item)
}

function generateCaptionByDataField(dataField, allowHierarchicalFields) {
    var caption = "";
    if (allowHierarchicalFields) {
        dataField = dataField.substring(dataField.lastIndexOf(".") + 1)
    } else {
        if (hasParent(dataField)) {
            dataField.split(".").forEach(function(field, index, arr) {
                caption += (0, _inflector.captionize)(field);
                if (index !== arr.length - 1) {
                    caption += "."
                }
            });
            return caption
        }
    }
    return (0, _inflector.captionize)(dataField)
}

function getItems(fields, allowHierarchicalFields) {
    var items = [];
    for (var i = 0; i < fields.length; i++) {
        var item = (0, _extend.extend)(true, {
            caption: generateCaptionByDataField(fields[i].dataField, allowHierarchicalFields)
        }, fields[i]);
        item.id = item.name || item.dataField;
        if (allowHierarchicalFields) {
            pushItemAndCheckParent(fields, items, item)
        } else {
            items.push(item)
        }
    }
    return items
}

function hasParent(dataField) {
    return dataField.lastIndexOf(".") !== -1
}

function getParentIdFromItemDataField(dataField) {
    return dataField.substring(0, dataField.lastIndexOf("."))
}

function getCaptionWithParents(item, plainItems) {
    if (hasParent(item.dataField)) {
        var parentId = getParentIdFromItemDataField(item.dataField);
        for (var i = 0; i < plainItems.length; i++) {
            if (plainItems[i].dataField === parentId) {
                return getCaptionWithParents(plainItems[i], plainItems) + "." + item.caption
            }
        }
    }
    return item.caption
}

function updateConditionByOperation(condition, operation, customOperations) {
    var customOperation = getCustomOperation(customOperations, operation);
    if (customOperation) {
        if (false === customOperation.hasValue) {
            condition[1] = operation;
            condition.length = 2
        } else {
            condition[1] = operation;
            condition[2] = ""
        }
        return condition
    }
    if ("isblank" === operation) {
        condition[1] = EQUAL_OPERATION;
        condition[2] = null
    } else {
        if ("isnotblank" === operation) {
            condition[1] = NOT_EQUAL_OPERATION;
            condition[2] = null
        } else {
            customOperation = getCustomOperation(customOperations, condition[1]);
            if (customOperation || 2 === condition.length || null === condition[2]) {
                condition[2] = ""
            }
            condition[1] = operation
        }
    }
    return condition
}

function getOperationValue(condition) {
    var caption;
    if (null === condition[2]) {
        if (condition[1] === EQUAL_OPERATION) {
            caption = "isblank"
        } else {
            caption = "isnotblank"
        }
    } else {
        caption = condition[1]
    }
    return caption
}

function isValidCondition(condition) {
    return "" !== condition[2]
}

function getMergedOperations(customOperations, betweenCaption, context) {
    var result = (0, _extend.extend)(true, [], customOperations);
    var betweenIndex = -1;
    result.some(function(customOperation, index) {
        if ("between" === customOperation.name) {
            betweenIndex = index;
            return true
        }
    });
    if (betweenIndex !== -1) {
        result[betweenIndex] = (0, _extend.extend)((0, _between.getConfig)(betweenCaption, context), result[betweenIndex])
    } else {
        result.unshift((0, _between.getConfig)(betweenCaption, context))
    }
    return result
}

function isMatchedCondition(filter, addedFilterDataField) {
    return filter[0] === addedFilterDataField
}

function removeFieldConditionsFromFilter(filter, dataField) {
    if (!filter || 0 === filter.length) {
        return null
    }
    if (isCondition(filter)) {
        var hasMatchedCondition = isMatchedCondition(filter, dataField);
        return !hasMatchedCondition ? filter : null
    } else {
        return syncConditionIntoGroup(filter, [dataField], false)
    }
}

function syncConditionIntoGroup(filter, addedFilter, canPush) {
    var result = [];
    filter.forEach(function(item) {
        if (isCondition(item)) {
            if (isMatchedCondition(item, addedFilter[0])) {
                if (canPush) {
                    result.push(addedFilter);
                    canPush = false
                } else {
                    result.splice(result.length - 1, 1)
                }
            } else {
                result.push(item)
            }
        } else {
            (result.length || isGroup(item)) && result.push(item)
        }
    });
    if (0 === result.length) {
        return null
    }
    if (canPush) {
        result.push(AND_GROUP_OPERATION);
        result.push(addedFilter)
    }
    return 1 === result.length ? result[0] : result
}

function syncFilters(filter, addedFilter) {
    if (null === filter || 0 === filter.length) {
        return addedFilter
    }
    if (isCondition(filter)) {
        if (isMatchedCondition(filter, addedFilter[0])) {
            return addedFilter
        } else {
            return [filter, AND_GROUP_OPERATION, addedFilter]
        }
    }
    var groupValue = getGroupValue(filter);
    if (groupValue !== AND_GROUP_OPERATION) {
        return [addedFilter, "and", filter]
    }
    return syncConditionIntoGroup(filter, addedFilter, true)
}

function getMatchedConditions(filter, dataField) {
    if (null === filter || 0 === filter.length) {
        return []
    }
    if (isCondition(filter)) {
        if (isMatchedCondition(filter, dataField)) {
            return [filter]
        } else {
            return []
        }
    }
    var groupValue = getGroupValue(filter);
    if (groupValue !== AND_GROUP_OPERATION) {
        return []
    }
    var result = filter.filter(function(item) {
        return isCondition(item) && isMatchedCondition(item, dataField)
    });
    return result
}

function filterHasField(filter, dataField) {
    if (null === filter || 0 === filter.length) {
        return false
    }
    if (isCondition(filter)) {
        return filter[0] === dataField
    }
    return filter.some(function(item) {
        return (isCondition(item) || isGroup(item)) && filterHasField(item, dataField)
    })
}
var renderValueText = function($container, value, customOperation) {
    if (Array.isArray(value)) {
        var lastItemIndex = value.length - 1;
        $container.empty();
        value.forEach(function(t, i) {
            (0, _renderer.default)("<span>").addClass(FILTER_BUILDER_ITEM_TEXT_PART_CLASS).text(t).appendTo($container);
            if (i !== lastItemIndex) {
                (0, _renderer.default)("<span>").addClass(FILTER_BUILDER_ITEM_TEXT_SEPARATOR_CLASS).text(customOperation && customOperation.valueSeparator ? customOperation.valueSeparator : "|").addClass(FILTER_BUILDER_ITEM_TEXT_SEPARATOR_EMPTY_CLASS).appendTo($container)
            }
        })
    } else {
        if (value) {
            $container.text(value)
        } else {
            $container.text(_message.default.format("dxFilterBuilder-enterValueText"))
        }
    }
};
exports.renderValueText = renderValueText;
