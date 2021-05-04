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
exports.getChanges = void 0;
var tree_1 = require("./tree");
var utils_1 = require("./utils");
function compareTemplates(current, prev, changesAccum) {
    var currentTemplatesOptions = {};
    var currentTemplates = {};
    var prevTemplatesOptions = {};
    var prevTemplates = {};
    tree_1.buildTemplates(current, currentTemplatesOptions, currentTemplates);
    tree_1.buildTemplates(prev, prevTemplatesOptions, prevTemplates);
    changesAccum.addRemovedValues(currentTemplatesOptions, prevTemplatesOptions, current.fullName);
    // TODO: support switching to default templates
    // appendRemovedValues(currentTemplates, prevTemplates, "", changesAccum.templates);
    Object.keys(currentTemplatesOptions).forEach(function (key) {
        if (currentTemplatesOptions[key] === prevTemplatesOptions[key]) {
            return;
        }
        changesAccum.options[utils_1.mergeNameParts(current.fullName, key)] = currentTemplatesOptions[key];
    });
    Object.keys(currentTemplates).forEach(function (key) {
        var currentTemplate = currentTemplates[key];
        var prevTemplate = prevTemplates[key];
        if (prevTemplate && currentTemplate.content === prevTemplate.content) {
            return;
        }
        changesAccum.templates[key] = currentTemplate;
    });
}
function compare(current, prev, changesAccum) {
    if (!prev) {
        changesAccum.options[current.fullName] = tree_1.buildNode(current, changesAccum.templates, true);
        return;
    }
    changesAccum.addRemovedValues(current.options, prev.options, current.fullName);
    changesAccum.addRemovedValues(current.configCollections, prev.configCollections, current.fullName);
    changesAccum.addRemovedValues(current.configs, prev.configs, current.fullName);
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    compareCollections(current, prev, changesAccum);
    Object.keys(current.configs).forEach(function (key) {
        compare(current.configs[key], prev.configs[key], changesAccum);
    });
    Object.keys(current.options).forEach(function (key) {
        if (current.options[key] === prev.options[key]) {
            return;
        }
        changesAccum.options[utils_1.mergeNameParts(current.fullName, key)] = current.options[key];
    });
    compareTemplates(current, prev, changesAccum);
}
function appendRemovedValues(current, prev, path, changesAccum) {
    var removedKeys = Object.keys(prev).filter(function (key) { return Object.keys(current).indexOf(key) < 0; });
    removedKeys.forEach(function (key) {
        changesAccum.push(utils_1.mergeNameParts(path, key));
    });
}
function getChanges(current, prev) {
    var changesAccum = {
        options: {},
        removedOptions: [],
        templates: {},
        addRemovedValues: function (currentOptions, prevOptions, path) {
            appendRemovedValues(currentOptions, prevOptions, path, this.removedOptions);
        },
    };
    compare(current, prev, changesAccum);
    return changesAccum;
}
exports.getChanges = getChanges;
function compareCollections(current, prev, changesAccum) {
    Object.keys(current.configCollections).forEach(function (key) {
        var currentCollection = current.configCollections[key];
        var prevCollection = prev.configCollections[key] || [];
        if (!currentCollection || currentCollection.length !== prevCollection.length) {
            var updatedCollection_1 = [];
            currentCollection.forEach(function (item) {
                var config = tree_1.buildNode(item, changesAccum.templates, true);
                updatedCollection_1.push(config);
            });
            changesAccum.options[utils_1.mergeNameParts(current.fullName, key)] = updatedCollection_1;
            return;
        }
        for (var i = 0; i < currentCollection.length; i += 1) {
            compare(currentCollection[i], prevCollection[i], changesAccum);
        }
    });
}
