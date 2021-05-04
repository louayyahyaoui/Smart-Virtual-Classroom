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
exports.Animation = exports.DeferRendering = void 0;
var defer_rendering_1 = require("devextreme/ui/defer_rendering");
var PropTypes = require("prop-types");
var component_1 = require("./core/component");
var nested_option_1 = require("./core/nested-option");
var DeferRendering = /** @class */ (function (_super) {
    __extends(DeferRendering, _super);
    function DeferRendering() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._WidgetClass = defer_rendering_1.default;
        _this.independentEvents = ["onContentReady", "onDisposing", "onInitialized", "onOptionChanged", "onRendered", "onShown"];
        _this._expectedChildren = {
            animation: { optionName: "animation", isCollectionItem: false }
        };
        return _this;
    }
    Object.defineProperty(DeferRendering.prototype, "instance", {
        get: function () {
            return this._instance;
        },
        enumerable: false,
        configurable: true
    });
    return DeferRendering;
}(component_1.Component));
exports.DeferRendering = DeferRendering;
DeferRendering.propTypes = {
    accessKey: PropTypes.string,
    activeStateEnabled: PropTypes.bool,
    animation: PropTypes.object,
    disabled: PropTypes.bool,
    elementAttr: PropTypes.object,
    focusStateEnabled: PropTypes.bool,
    height: PropTypes.oneOfType([
        PropTypes.func,
        PropTypes.number,
        PropTypes.string
    ]),
    hint: PropTypes.string,
    hoverStateEnabled: PropTypes.bool,
    onContentReady: PropTypes.func,
    onDisposing: PropTypes.func,
    onInitialized: PropTypes.func,
    onOptionChanged: PropTypes.func,
    onRendered: PropTypes.func,
    onShown: PropTypes.func,
    rtlEnabled: PropTypes.bool,
    showLoadIndicator: PropTypes.bool,
    staggerItemSelector: PropTypes.string,
    tabIndex: PropTypes.number,
    visible: PropTypes.bool,
    width: PropTypes.oneOfType([
        PropTypes.func,
        PropTypes.number,
        PropTypes.string
    ])
};
var Animation = /** @class */ (function (_super) {
    __extends(Animation, _super);
    function Animation() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Animation.OptionName = "animation";
    return Animation;
}(nested_option_1.default));
exports.Animation = Animation;
exports.default = DeferRendering;
