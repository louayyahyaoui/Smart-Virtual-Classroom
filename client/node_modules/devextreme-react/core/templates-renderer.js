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
exports.TemplatesRenderer = void 0;
var frame_1 = require("devextreme/animation/frame");
var common_1 = require("devextreme/core/utils/common");
var React = require("react");
var TemplatesRenderer = /** @class */ (function (_super) {
    __extends(TemplatesRenderer, _super);
    function TemplatesRenderer() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.updateScheduled = false;
        _this.mounted = false;
        return _this;
    }
    TemplatesRenderer.prototype.componentDidMount = function () {
        this.mounted = true;
    };
    TemplatesRenderer.prototype.componentWillUnmount = function () {
        this.mounted = false;
    };
    TemplatesRenderer.prototype.scheduleUpdate = function (useDeferUpdate) {
        var _this = this;
        if (this.updateScheduled) {
            return;
        }
        this.updateScheduled = true;
        var updateFunc = useDeferUpdate ? common_1.deferUpdate : frame_1.requestAnimationFrame;
        updateFunc(function () {
            if (_this.mounted) {
                _this.forceUpdate();
            }
            _this.updateScheduled = false;
        });
    };
    TemplatesRenderer.prototype.render = function () {
        var templatesStore = this.props.templatesStore;
        return React.createElement(React.Fragment, {}, templatesStore.renderWrappers());
    };
    return TemplatesRenderer;
}(React.PureComponent));
exports.TemplatesRenderer = TemplatesRenderer;
