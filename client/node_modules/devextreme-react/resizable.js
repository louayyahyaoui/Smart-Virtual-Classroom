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
exports.Resizable = void 0;
var resizable_1 = require("devextreme/ui/resizable");
var PropTypes = require("prop-types");
var component_1 = require("./core/component");
var Resizable = /** @class */ (function (_super) {
    __extends(Resizable, _super);
    function Resizable() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._WidgetClass = resizable_1.default;
        _this.subscribableOptions = ["height", "width"];
        _this.independentEvents = ["onDisposing", "onInitialized", "onOptionChanged", "onResize", "onResizeEnd", "onResizeStart"];
        _this._defaults = {
            defaultHeight: "height",
            defaultWidth: "width"
        };
        return _this;
    }
    Object.defineProperty(Resizable.prototype, "instance", {
        get: function () {
            return this._instance;
        },
        enumerable: false,
        configurable: true
    });
    return Resizable;
}(component_1.Component));
exports.Resizable = Resizable;
Resizable.propTypes = {
    elementAttr: PropTypes.object,
    handles: PropTypes.oneOf([
        "bottom",
        "left",
        "right",
        "top",
        "all"
    ]),
    height: PropTypes.oneOfType([
        PropTypes.func,
        PropTypes.number,
        PropTypes.string
    ]),
    maxHeight: PropTypes.number,
    maxWidth: PropTypes.number,
    minHeight: PropTypes.number,
    minWidth: PropTypes.number,
    onDisposing: PropTypes.func,
    onInitialized: PropTypes.func,
    onOptionChanged: PropTypes.func,
    onResize: PropTypes.func,
    onResizeEnd: PropTypes.func,
    onResizeStart: PropTypes.func,
    rtlEnabled: PropTypes.bool,
    width: PropTypes.oneOfType([
        PropTypes.func,
        PropTypes.number,
        PropTypes.string
    ])
};
exports.default = Resizable;
