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
exports.TemplatesStore = void 0;
var TemplatesStore = /** @class */ (function () {
    function TemplatesStore(onTemplateAdded) {
        this._templates = {};
        this._onTemplateAdded = onTemplateAdded;
    }
    TemplatesStore.prototype.add = function (templateId, templateFunc) {
        this._templates[templateId] = templateFunc;
        this._onTemplateAdded();
    };
    TemplatesStore.prototype.remove = function (templateId) {
        delete this._templates[templateId];
    };
    TemplatesStore.prototype.renderWrappers = function () {
        var _this = this;
        return Object.getOwnPropertyNames(this._templates).map(function (templateId) { return _this._templates[templateId](); });
    };
    return TemplatesStore;
}());
exports.TemplatesStore = TemplatesStore;
