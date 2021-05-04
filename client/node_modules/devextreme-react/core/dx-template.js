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
exports.createDxTemplate = void 0;
var React = require("react");
var helpers_1 = require("./helpers");
var template_wrapper_1 = require("./template-wrapper");
function unwrapElement(element) {
    return element.get ? element.get(0) : element;
}
function createDxTemplate(createContentProvider, templatesStore, keyFn) {
    var renderedTemplates = new helpers_1.DoubleKeyMap();
    return {
        render: function (data) {
            var container = unwrapElement(data.container);
            var key = { key1: data.model, key2: container };
            var prevTemplateId = renderedTemplates.get(key);
            var templateId;
            if (prevTemplateId) {
                templateId = prevTemplateId;
            }
            else {
                templateId = keyFn ? keyFn(data.model) : "__template_" + helpers_1.generateID();
                if (data.model !== undefined) {
                    renderedTemplates.set(key, templateId);
                }
            }
            templatesStore.add(templateId, function () {
                var props = {
                    data: data.model,
                    index: data.index,
                };
                var contentProvider = createContentProvider();
                return React.createElement(template_wrapper_1.TemplateWrapper, {
                    content: contentProvider(props),
                    container: container,
                    onRemoved: function () {
                        templatesStore.remove(templateId);
                        renderedTemplates.delete({ key1: data.model, key2: container });
                    },
                    onRendered: data.onRendered,
                    key: templateId,
                });
            });
            return container;
        },
    };
}
exports.createDxTemplate = createDxTemplate;
