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
exports.SpeedDialAction = void 0;
var speed_dial_action_1 = require("devextreme/ui/speed_dial_action");
var PropTypes = require("prop-types");
var component_1 = require("./core/component");
var SpeedDialAction = /** @class */ (function (_super) {
    __extends(SpeedDialAction, _super);
    function SpeedDialAction() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._WidgetClass = speed_dial_action_1.default;
        _this.independentEvents = ["onClick", "onContentReady", "onDisposing", "onInitialized", "onOptionChanged"];
        return _this;
    }
    Object.defineProperty(SpeedDialAction.prototype, "instance", {
        get: function () {
            return this._instance;
        },
        enumerable: false,
        configurable: true
    });
    return SpeedDialAction;
}(component_1.Component));
exports.SpeedDialAction = SpeedDialAction;
SpeedDialAction.propTypes = {
    accessKey: PropTypes.string,
    activeStateEnabled: PropTypes.bool,
    elementAttr: PropTypes.object,
    focusStateEnabled: PropTypes.bool,
    hint: PropTypes.string,
    hoverStateEnabled: PropTypes.bool,
    icon: PropTypes.string,
    index: PropTypes.number,
    label: PropTypes.string,
    onClick: PropTypes.func,
    onContentReady: PropTypes.func,
    onDisposing: PropTypes.func,
    onInitialized: PropTypes.func,
    onOptionChanged: PropTypes.func,
    rtlEnabled: PropTypes.bool,
    tabIndex: PropTypes.number,
    visible: PropTypes.bool
};
exports.default = SpeedDialAction;
