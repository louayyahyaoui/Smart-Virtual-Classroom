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
exports.ExtensionComponent = void 0;
var component_base_1 = require("./component-base");
var ExtensionComponent = /** @class */ (function (_super) {
    __extends(ExtensionComponent, _super);
    function ExtensionComponent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ExtensionComponent.prototype.componentDidMount = function () {
        var onMounted = this.props.onMounted;
        if (onMounted) {
            onMounted(this._createWidget);
        }
        else {
            this._createWidget();
        }
    };
    return ExtensionComponent;
}(component_base_1.ComponentBase));
exports.ExtensionComponent = ExtensionComponent;
