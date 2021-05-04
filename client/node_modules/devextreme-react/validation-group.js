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
exports.ValidationGroup = void 0;
var validation_group_1 = require("devextreme/ui/validation_group");
var PropTypes = require("prop-types");
var component_1 = require("./core/component");
var ValidationGroup = /** @class */ (function (_super) {
    __extends(ValidationGroup, _super);
    function ValidationGroup() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._WidgetClass = validation_group_1.default;
        _this.independentEvents = ["onDisposing", "onInitialized", "onOptionChanged"];
        return _this;
    }
    Object.defineProperty(ValidationGroup.prototype, "instance", {
        get: function () {
            return this._instance;
        },
        enumerable: false,
        configurable: true
    });
    return ValidationGroup;
}(component_1.Component));
exports.ValidationGroup = ValidationGroup;
ValidationGroup.propTypes = {
    elementAttr: PropTypes.object,
    height: PropTypes.oneOfType([
        PropTypes.func,
        PropTypes.number,
        PropTypes.string
    ]),
    onDisposing: PropTypes.func,
    onInitialized: PropTypes.func,
    onOptionChanged: PropTypes.func,
    width: PropTypes.oneOfType([
        PropTypes.func,
        PropTypes.number,
        PropTypes.string
    ])
};
exports.default = ValidationGroup;
