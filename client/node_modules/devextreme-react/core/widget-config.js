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
exports.separateProps = exports.getClassName = exports.elementPropNames = void 0;
var elementPropNames = ['style', 'id'];
exports.elementPropNames = elementPropNames;
var classNamePropName = 'className';
function isIgnoredProp(name) {
    return name === 'children' || name === classNamePropName || elementPropNames.indexOf(name) > -1;
}
function separateProps(props, defaultsProps, templateProps) {
    templateProps = templateProps || [];
    var defaults = {};
    var options = {};
    var templates = {};
    var knownTemplates = {};
    templateProps.forEach(function (value) {
        knownTemplates[value.component] = true;
        knownTemplates[value.render] = true;
    });
    Object.keys(props).forEach(function (key) {
        var defaultOptionName = defaultsProps ? defaultsProps[key] : null;
        if (isIgnoredProp(key)) {
            return;
        }
        if (defaultOptionName) {
            defaults[defaultOptionName] = props[key];
            return;
        }
        if (knownTemplates[key]) {
            templates[key] = props[key];
            return;
        }
        options[key] = props[key];
    });
    return { options: options, defaults: defaults, templates: templates };
}
exports.separateProps = separateProps;
function getClassName(props) {
    return props[classNamePropName];
}
exports.getClassName = getClassName;
