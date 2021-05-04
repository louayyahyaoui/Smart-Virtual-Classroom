/**
 * DevExtreme (core/options/utils.js)
 * Version: 20.2.6
 * Build date: Tue Mar 16 2021
 *
 * Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
exports.createDefaultOptionRules = exports.getNestedOptionValue = exports.getParentName = exports.getFieldName = exports.deviceMatch = exports.normalizeOptions = exports.convertRulesToOptions = void 0;
var _devices = _interopRequireDefault(require("../devices"));
var _type = require("../utils/type");
var _common = require("../utils/common");
var _extend = require("../utils/extend");
var _data = require("../utils/data");

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        "default": obj
    }
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
var cachedGetters = {};
var convertRulesToOptions = function(rules) {
    var currentDevice = _devices.default.current();
    return rules.reduce(function(options, _ref) {
        var device = _ref.device,
            ruleOptions = _ref.options;
        var deviceFilter = device || {};
        var match = (0, _type.isFunction)(deviceFilter) ? deviceFilter(currentDevice) : deviceMatch(currentDevice, deviceFilter);
        if (match) {
            (0, _extend.extend)(true, options, ruleOptions)
        }
        return options
    }, {})
};
exports.convertRulesToOptions = convertRulesToOptions;
var normalizeOptions = function(options, value) {
    return "string" !== typeof options ? options : _defineProperty({}, options, value)
};
exports.normalizeOptions = normalizeOptions;
var deviceMatch = function(device, filter) {
    return (0, _type.isEmptyObject)(filter) || (0, _common.findBestMatches)(device, [filter]).length > 0
};
exports.deviceMatch = deviceMatch;
var getFieldName = function(fullName) {
    return fullName.substr(fullName.lastIndexOf(".") + 1)
};
exports.getFieldName = getFieldName;
var getParentName = function(fullName) {
    return fullName.substr(0, fullName.lastIndexOf("."))
};
exports.getParentName = getParentName;
var getNestedOptionValue = function(optionsObject, name) {
    cachedGetters[name] = cachedGetters[name] || (0, _data.compileGetter)(name);
    return cachedGetters[name](optionsObject, {
        functionsAsIs: true
    })
};
exports.getNestedOptionValue = getNestedOptionValue;
var createDefaultOptionRules = function() {
    var options = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : [];
    return options
};
exports.createDefaultOptionRules = createDefaultOptionRules;
