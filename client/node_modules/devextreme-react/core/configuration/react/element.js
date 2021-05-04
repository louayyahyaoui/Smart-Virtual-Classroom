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
exports.ElementType = exports.getElementInfo = void 0;
var template_1 = require("../../template");
var ElementType;
(function (ElementType) {
    ElementType[ElementType["Option"] = 0] = "Option";
    ElementType[ElementType["Template"] = 1] = "Template";
    ElementType[ElementType["Unknown"] = 2] = "Unknown";
})(ElementType || (ElementType = {}));
exports.ElementType = ElementType;
function getElementInfo(element, parentExpectedChildren) {
    var reactElement = element;
    if (!reactElement || !reactElement.type) {
        return {
            type: ElementType.Unknown,
        };
    }
    if (reactElement.type === template_1.Template) {
        return {
            type: ElementType.Template,
            props: reactElement.props,
        };
    }
    var elementDescriptor = reactElement.type;
    if (elementDescriptor.OptionName) {
        var name_1 = elementDescriptor.OptionName;
        var isCollectionItem = elementDescriptor.IsCollectionItem;
        var expectation = parentExpectedChildren && parentExpectedChildren[name_1];
        if (expectation) {
            isCollectionItem = expectation.isCollectionItem;
            if (expectation.optionName) {
                name_1 = expectation.optionName;
            }
        }
        return {
            type: ElementType.Option,
            descriptor: {
                name: name_1,
                isCollection: isCollectionItem,
                templates: elementDescriptor.TemplateProps || [],
                initialValuesProps: elementDescriptor.DefaultsProps || {},
                predefinedValuesProps: elementDescriptor.PredefinedProps || {},
                expectedChildren: elementDescriptor.ExpectedChildren || {},
            },
            props: reactElement.props,
        };
    }
    return {
        type: ElementType.Unknown,
    };
}
exports.getElementInfo = getElementInfo;
