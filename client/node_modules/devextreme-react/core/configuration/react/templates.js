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
exports.getNamedTemplate = exports.getAnonymousTemplate = void 0;
function getAnonymousTemplate(props, templateMeta, hasTranscludedContent) {
    if (templateMeta.tmplOption === 'template' && hasTranscludedContent) {
        return {
            optionName: templateMeta.tmplOption,
            isAnonymous: true,
            type: 'children',
            content: props.children,
            keyFn: props[templateMeta.keyFn],
        };
    }
    if (props[templateMeta.render]) {
        return {
            optionName: templateMeta.tmplOption,
            isAnonymous: true,
            type: 'render',
            content: props[templateMeta.render],
            keyFn: props[templateMeta.keyFn],
        };
    }
    if (props[templateMeta.component]) {
        return {
            optionName: templateMeta.tmplOption,
            isAnonymous: true,
            type: 'component',
            content: props[templateMeta.component],
            keyFn: props[templateMeta.keyFn],
        };
    }
    return null;
}
exports.getAnonymousTemplate = getAnonymousTemplate;
function getNamedTemplate(props) {
    if (!props.name) {
        return null;
    }
    if (props.component) {
        return {
            optionName: props.name,
            isAnonymous: false,
            type: 'component',
            content: props.component,
            keyFn: props.keyFn,
        };
    }
    if (props.render) {
        return {
            optionName: props.name,
            isAnonymous: false,
            type: 'render',
            content: props.render,
            keyFn: props.keyFn,
        };
    }
    return {
        optionName: props.name,
        isAnonymous: false,
        type: 'children',
        content: props.children,
        keyFn: props.keyFn,
    };
}
exports.getNamedTemplate = getNamedTemplate;
