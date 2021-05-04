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
exports.ScrollView = void 0;
var scroll_view_1 = require("devextreme/ui/scroll_view");
var PropTypes = require("prop-types");
var component_1 = require("./core/component");
var ScrollView = /** @class */ (function (_super) {
    __extends(ScrollView, _super);
    function ScrollView() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._WidgetClass = scroll_view_1.default;
        _this.independentEvents = ["onDisposing", "onInitialized", "onOptionChanged", "onPullDown", "onReachBottom", "onScroll", "onUpdated"];
        return _this;
    }
    Object.defineProperty(ScrollView.prototype, "instance", {
        get: function () {
            return this._instance;
        },
        enumerable: false,
        configurable: true
    });
    return ScrollView;
}(component_1.Component));
exports.ScrollView = ScrollView;
ScrollView.propTypes = {
    bounceEnabled: PropTypes.bool,
    direction: PropTypes.oneOf([
        "both",
        "horizontal",
        "vertical"
    ]),
    disabled: PropTypes.bool,
    elementAttr: PropTypes.object,
    height: PropTypes.oneOfType([
        PropTypes.func,
        PropTypes.number,
        PropTypes.string
    ]),
    onDisposing: PropTypes.func,
    onInitialized: PropTypes.func,
    onOptionChanged: PropTypes.func,
    onPullDown: PropTypes.func,
    onReachBottom: PropTypes.func,
    onScroll: PropTypes.func,
    onUpdated: PropTypes.func,
    pulledDownText: PropTypes.string,
    pullingDownText: PropTypes.string,
    reachBottomText: PropTypes.string,
    refreshingText: PropTypes.string,
    rtlEnabled: PropTypes.bool,
    scrollByContent: PropTypes.bool,
    scrollByThumb: PropTypes.bool,
    showScrollbar: PropTypes.oneOf([
        "onScroll",
        "onHover",
        "always",
        "never"
    ]),
    useNative: PropTypes.bool,
    width: PropTypes.oneOfType([
        PropTypes.func,
        PropTypes.number,
        PropTypes.string
    ])
};
exports.default = ScrollView;
