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
exports.SlideOutView = void 0;
var slide_out_view_1 = require("devextreme/ui/slide_out_view");
var PropTypes = require("prop-types");
var component_1 = require("./core/component");
var SlideOutView = /** @class */ (function (_super) {
    __extends(SlideOutView, _super);
    function SlideOutView() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._WidgetClass = slide_out_view_1.default;
        _this.independentEvents = ["onDisposing", "onInitialized", "onOptionChanged"];
        _this._templateProps = [{
                tmplOption: "contentTemplate",
                render: "contentRender",
                component: "contentComponent",
                keyFn: "contentKeyFn"
            }, {
                tmplOption: "menuTemplate",
                render: "menuRender",
                component: "menuComponent",
                keyFn: "menuKeyFn"
            }];
        return _this;
    }
    Object.defineProperty(SlideOutView.prototype, "instance", {
        get: function () {
            return this._instance;
        },
        enumerable: false,
        configurable: true
    });
    return SlideOutView;
}(component_1.Component));
exports.SlideOutView = SlideOutView;
SlideOutView.propTypes = {
    activeStateEnabled: PropTypes.bool,
    disabled: PropTypes.bool,
    elementAttr: PropTypes.object,
    height: PropTypes.oneOfType([
        PropTypes.func,
        PropTypes.number,
        PropTypes.string
    ]),
    hint: PropTypes.string,
    hoverStateEnabled: PropTypes.bool,
    menuPosition: PropTypes.oneOf([
        "inverted",
        "normal"
    ]),
    menuVisible: PropTypes.bool,
    onDisposing: PropTypes.func,
    onInitialized: PropTypes.func,
    onOptionChanged: PropTypes.func,
    rtlEnabled: PropTypes.bool,
    swipeEnabled: PropTypes.bool,
    visible: PropTypes.bool,
    width: PropTypes.oneOfType([
        PropTypes.func,
        PropTypes.number,
        PropTypes.string
    ])
};
exports.default = SlideOutView;
