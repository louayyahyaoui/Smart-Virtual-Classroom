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
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildConfigTree = exports.processChildren = void 0;
var React = require("react");
var widget_config_1 = require("../../widget-config");
var element_1 = require("./element");
var utils_1 = require("../utils");
var templates_1 = require("./templates");
function processChildren(parentElement, parentFullName) {
    var templates = [];
    var configCollections = {};
    var configs = {};
    var hasTranscludedContent = false;
    React.Children.map(parentElement.props.children, function (child) {
        var element = element_1.getElementInfo(child, parentElement.descriptor.expectedChildren);
        if (element.type === element_1.ElementType.Unknown) {
            if (child !== null && child !== undefined && child !== false) {
                hasTranscludedContent = true;
            }
            return;
        }
        if (element.type === element_1.ElementType.Template) {
            var template = templates_1.getNamedTemplate(element.props);
            if (template) {
                templates.push(template);
            }
            return;
        }
        if (element.descriptor.isCollection) {
            var collection = configCollections[element.descriptor.name];
            if (!collection) {
                collection = [];
                configCollections[element.descriptor.name] = collection;
            }
            // eslint-disable-next-line @typescript-eslint/no-use-before-define
            var collectionItem = createConfigNode(element, utils_1.mergeNameParts(parentFullName, element.descriptor.name) + "[" + collection.length + "]");
            collection.push(collectionItem);
            return;
        }
        // eslint-disable-next-line @typescript-eslint/no-use-before-define
        var configNode = createConfigNode(element, parentFullName);
        configs[element.descriptor.name] = configNode;
    });
    return {
        configs: configs,
        configCollections: configCollections,
        templates: templates,
        hasTranscludedContent: hasTranscludedContent,
    };
}
exports.processChildren = processChildren;
function createConfigNode(element, path) {
    var fullName = element.descriptor.isCollection
        ? path
        : utils_1.mergeNameParts(path, element.descriptor.name);
    var separatedValues = widget_config_1.separateProps(element.props, element.descriptor.initialValuesProps, element.descriptor.templates);
    var childrenData = processChildren(element, fullName);
    element.descriptor.templates.forEach(function (templateMeta) {
        var template = templates_1.getAnonymousTemplate(element.props, templateMeta, path.length > 0 ? childrenData.hasTranscludedContent : false);
        if (template) {
            childrenData.templates.push(template);
        }
    });
    return {
        fullName: fullName,
        predefinedOptions: element.descriptor.predefinedValuesProps,
        initialOptions: separatedValues.defaults,
        options: separatedValues.options,
        templates: childrenData.templates,
        configCollections: childrenData.configCollections,
        configs: childrenData.configs,
    };
}
function buildConfigTree(widgetDescriptor, props) {
    return createConfigNode({
        type: element_1.ElementType.Option,
        descriptor: __assign({ name: '', isCollection: false }, widgetDescriptor),
        props: props,
    }, '');
}
exports.buildConfigTree = buildConfigTree;
