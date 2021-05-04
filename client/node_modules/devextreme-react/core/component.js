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
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.Component = void 0;
var React = require("react");
var component_base_1 = require("./component-base");
var extension_component_1 = require("./extension-component");
var Component = /** @class */ (function (_super) {
    __extends(Component, _super);
    function Component(props) {
        var _this = _super.call(this, props) || this;
        _this._extensionCreators = [];
        _this._registerExtension = _this._registerExtension.bind(_this);
        return _this;
    }
    Component.prototype.componentDidMount = function () {
        _super.prototype.componentDidMount.call(this);
        this._createWidget();
        this._createExtensions();
    };
    Component.prototype.renderChildren = function () {
        var _this = this;
        return React.Children.map(this.props.children, function (child) {
            if (child && Object.prototype.isPrototypeOf.call(extension_component_1.ExtensionComponent, child.type)) {
                return React.cloneElement(child, { onMounted: _this._registerExtension });
            }
            return child;
        });
    };
    Component.prototype._registerExtension = function (creator) {
        this._extensionCreators.push(creator);
    };
    Component.prototype._createExtensions = function () {
        var _this = this;
        this._extensionCreators.forEach(function (creator) { return creator(_this._element); });
    };
    return Component;
}(component_base_1.ComponentBase));
exports.Component = Component;
