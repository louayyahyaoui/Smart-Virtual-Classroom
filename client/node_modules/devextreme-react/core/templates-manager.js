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
var React = require("react");
var config_1 = require("./config");
var dx_template_1 = require("./dx-template");
function normalizeProps(props) {
    if (config_1.getOption('useLegacyTemplateEngine')) {
        var model = props.data;
        if (model && Object.prototype.hasOwnProperty.call(model, 'key')) {
            model.dxkey = model.key;
        }
        return model;
    }
    return props;
}
var contentCreators = {
    component: function (contentGetter) { return function (props) {
        props = normalizeProps(props);
        return React.createElement.bind(null, contentGetter())(props);
    }; },
    render: function (contentGetter) { return function (props) {
        normalizeProps(props);
        return contentGetter()(props.data, props.index);
    }; },
    children: function (contentGetter) { return function () { return contentGetter(); }; },
};
var TemplatesManager = /** @class */ (function () {
    function TemplatesManager(templatesStore) {
        this._templates = {};
        this._templatesContent = {};
        this._templatesStore = templatesStore;
    }
    TemplatesManager.prototype.add = function (name, template) {
        var _this = this;
        this._templatesContent[name] = template.content;
        var contentCreator = contentCreators[template.type]
            .bind(this, function () { return _this._templatesContent[name]; });
        this._templates[name] = dx_template_1.createDxTemplate(contentCreator, this._templatesStore, template.keyFn);
    };
    Object.defineProperty(TemplatesManager.prototype, "templatesCount", {
        get: function () {
            return Object.keys(this._templates).length;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TemplatesManager.prototype, "templates", {
        get: function () {
            return this._templates;
        },
        enumerable: false,
        configurable: true
    });
    return TemplatesManager;
}());
exports.default = TemplatesManager;
