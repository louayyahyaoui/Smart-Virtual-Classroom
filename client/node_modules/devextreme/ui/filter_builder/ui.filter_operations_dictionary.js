/**
 * DevExtreme (ui/filter_builder/ui.filter_operations_dictionary.js)
 * Version: 20.2.6
 * Build date: Tue Mar 16 2021
 *
 * Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
exports.default = void 0;
var OPERATION_ICONS = {
    "=": "equal",
    "<>": "notequal",
    "<": "less",
    "<=": "lessorequal",
    ">": "greater",
    ">=": "greaterorequal",
    notcontains: "doesnotcontain",
    contains: "contains",
    startswith: "startswith",
    endswith: "endswith",
    isblank: "isblank",
    isnotblank: "isnotblank"
};
var OPERATION_NAME = {
    "=": "equal",
    "<>": "notEqual",
    "<": "lessThan",
    "<=": "lessThanOrEqual",
    ">": "greaterThan",
    ">=": "greaterThanOrEqual",
    startswith: "startsWith",
    contains: "contains",
    notcontains: "notContains",
    endswith: "endsWith",
    isblank: "isBlank",
    isnotblank: "isNotBlank",
    between: "between"
};
var _default = {
    getIconByFilterOperation: function(filterOperation) {
        return OPERATION_ICONS[filterOperation]
    },
    getNameByFilterOperation: function(filterOperation) {
        return OPERATION_NAME[filterOperation]
    }
};
exports.default = _default;
module.exports = exports.default;
