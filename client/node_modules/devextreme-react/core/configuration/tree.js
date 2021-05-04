/*!
 * devextreme-react
 * Version: 20.2.6
 * Build date: Tue Mar 16 2021
 *
 * Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
 *
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file in the root of the project for details.
 *
 * https://github.com/DevExpress/devextreme-react
 */

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findValueInObject = exports.findValue = exports.buildTemplates = exports.buildNode = exports.buildConfig = exports.ValueType = void 0;
var utils_1 = require("./utils");
function buildTemplates(node, optionsAccum, templatesAccum) {
    node.templates.forEach(function (template) {
        if (template.isAnonymous) {
            var templateName = utils_1.mergeNameParts(node.fullName, template.optionName);
            optionsAccum[template.optionName] = templateName;
            templatesAccum[templateName] = template;
        }
        else {
            templatesAccum[template.optionName] = template;
        }
    });
}
exports.buildTemplates = buildTemplates;
function buildNode(node, templatesAccum, ignoreInitialValues) {
    var result = {};
    Object.keys(node.predefinedOptions).forEach(function (key) {
        result[key] = node.predefinedOptions[key];
    });
    Object.keys(node.configs).forEach(function (key) {
        result[key] = buildNode(node.configs[key], templatesAccum, ignoreInitialValues);
    });
    Object.keys(node.configCollections).forEach(function (key) {
        result[key] = node.configCollections[key].map(function (item) { return buildNode(item, templatesAccum, ignoreInitialValues); });
    });
    if (!ignoreInitialValues) {
        Object.keys(node.initialOptions).forEach(function (key) {
            result[key] = node.initialOptions[key];
        });
    }
    Object.keys(node.options).forEach(function (key) {
        result[key] = node.options[key];
    });
    buildTemplates(node, result, templatesAccum);
    return result;
}
exports.buildNode = buildNode;
function buildConfig(root, ignoreInitialValues) {
    var templatesAccum = {};
    var options = buildNode(root, templatesAccum, ignoreInitialValues);
    return {
        templates: templatesAccum,
        options: options,
    };
}
exports.buildConfig = buildConfig;
var ValueType;
(function (ValueType) {
    ValueType[ValueType["Simple"] = 0] = "Simple";
    ValueType[ValueType["Complex"] = 1] = "Complex";
    ValueType[ValueType["Array"] = 2] = "Array";
})(ValueType || (ValueType = {}));
exports.ValueType = ValueType;
function findValueInObject(obj, path) {
    var key = path.shift();
    if (!key) {
        return {
            value: obj,
            type: ValueType.Simple,
        };
    }
    if (obj instanceof Object && Object.keys(obj).includes(key)) {
        return findValueInObject(obj[key], path);
    }
    return undefined;
}
exports.findValueInObject = findValueInObject;
function findValue(node, path) {
    var name = path.shift();
    if (!name) {
        return {
            value: buildConfig(node, true).options,
            type: ValueType.Complex,
        };
    }
    var optionInfo = utils_1.parseOptionName(name);
    if (optionInfo.name in node.options) {
        var options = optionInfo.isCollectionItem
            ? node.options[optionInfo.name][optionInfo.index]
            : node.options[optionInfo.name];
        return findValueInObject(options, path);
    }
    if (optionInfo.isCollectionItem) {
        var collection = node.configCollections[optionInfo.name];
        if (!collection) {
            return undefined;
        }
        var item = collection[optionInfo.index];
        if (!item) {
            return undefined;
        }
        return findValue(item, path);
    }
    var child = node.configs[optionInfo.name];
    if (child) {
        return findValue(child, path);
    }
    var childCollection = node.configCollections[optionInfo.name];
    if (childCollection) {
        if (path.length !== 0) {
            return undefined;
        }
        return {
            value: childCollection.map(function (item) { return buildNode(item, {}, true); }),
            type: ValueType.Array,
        };
    }
    return undefined;
}
exports.findValue = findValue;
