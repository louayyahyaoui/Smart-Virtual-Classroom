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
exports.Drawer = void 0;
var drawer_1 = require("devextreme/ui/drawer");
var PropTypes = require("prop-types");
var component_1 = require("./core/component");
var Drawer = /** @class */ (function (_super) {
    __extends(Drawer, _super);
    function Drawer() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._WidgetClass = drawer_1.default;
        _this.subscribableOptions = ["opened"];
        _this.independentEvents = ["onDisposing", "onInitialized", "onOptionChanged"];
        _this._defaults = {
            defaultOpened: "opened"
        };
        _this._templateProps = [{
                tmplOption: "template",
                render: "render",
                component: "component",
                keyFn: "keyFn"
            }];
        return _this;
    }
    Object.defineProperty(Drawer.prototype, "instance", {
        get: function () {
            return this._instance;
        },
        enumerable: false,
        configurable: true
    });
    return Drawer;
}(component_1.Component));
exports.Drawer = Drawer;
Drawer.propTypes = {
    activeStateEnabled: PropTypes.bool,
    animationDuration: PropTypes.number,
    animationEnabled: PropTypes.bool,
    closeOnOutsideClick: PropTypes.oneOfType([
        PropTypes.bool,
        PropTypes.func
    ]),
    disabled: PropTypes.bool,
    elementAttr: PropTypes.object,
    height: PropTypes.oneOfType([
        PropTypes.func,
        PropTypes.number,
        PropTypes.string
    ]),
    hint: PropTypes.string,
    hoverStateEnabled: PropTypes.bool,
    maxSize: PropTypes.number,
    minSize: PropTypes.number,
    onDisposing: PropTypes.func,
    onInitialized: PropTypes.func,
    onOptionChanged: PropTypes.func,
    opened: PropTypes.bool,
    openedStateMode: PropTypes.oneOf([
        "overlap",
        "shrink",
        "push"
    ]),
    position: PropTypes.oneOf([
        "left",
        "right",
        "top",
        "bottom",
        "before",
        "after"
    ]),
    revealMode: PropTypes.oneOf([
        "slide",
        "expand"
    ]),
    rtlEnabled: PropTypes.bool,
    shading: PropTypes.bool,
    visible: PropTypes.bool,
    width: PropTypes.oneOfType([
        PropTypes.func,
        PropTypes.number,
        PropTypes.string
    ])
};
exports.default = Drawer;
