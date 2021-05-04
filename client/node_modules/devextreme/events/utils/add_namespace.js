/**
 * DevExtreme (events/utils/add_namespace.js)
 * Version: 20.2.6
 * Build date: Tue Mar 16 2021
 *
 * Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
exports.default = void 0;
var _errors = _interopRequireDefault(require("../../core/errors"));

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        "default": obj
    }
}
var addNamespace = function addNamespace(eventNames, namespace) {
    if (!namespace) {
        throw _errors.default.Error("E0017")
    }
    if (Array.isArray(eventNames)) {
        return eventNames.map(function(eventName) {
            return addNamespace(eventName, namespace)
        }).join(" ")
    }
    if (eventNames.indexOf(" ") !== -1) {
        return addNamespace(eventNames.split(/\s+/g), namespace)
    }
    return "".concat(eventNames, ".").concat(namespace)
};
var _default = addNamespace;
exports.default = _default;
module.exports = exports.default;
