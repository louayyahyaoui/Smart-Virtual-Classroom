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
exports.TemplateWrapper = void 0;
var events = require("devextreme/events");
var React = require("react");
var ReactDOM = require("react-dom");
var component_base_1 = require("./component-base");
var removalListenerStyle = { display: 'none' };
var TemplateWrapper = /** @class */ (function (_super) {
    __extends(TemplateWrapper, _super);
    function TemplateWrapper(props) {
        var _this = _super.call(this, props) || this;
        _this._removalListenerRef = React.createRef();
        _this.state = { removalListenerRequired: false };
        _this._onDxRemove = _this._onDxRemove.bind(_this);
        return _this;
    }
    TemplateWrapper.prototype.componentDidMount = function () {
        var onRendered = this.props.onRendered;
        onRendered === null || onRendered === void 0 ? void 0 : onRendered();
        this._subscribeOnRemove();
    };
    TemplateWrapper.prototype.componentDidUpdate = function () {
        this._subscribeOnRemove();
    };
    TemplateWrapper.prototype.componentWillUnmount = function () {
        // Let React remove it itself
        // eslint-disable-next-line react/no-find-dom-node
        var node = ReactDOM.findDOMNode(this);
        var container = this.props.container;
        if (node) {
            container.appendChild(node);
        }
        if (this._listenerElement) {
            container.appendChild(this._listenerElement);
        }
    };
    Object.defineProperty(TemplateWrapper.prototype, "_listenerElement", {
        get: function () {
            return this._removalListenerRef.current;
        },
        enumerable: false,
        configurable: true
    });
    TemplateWrapper.prototype._subscribeOnRemove = function () {
        // eslint-disable-next-line react/no-find-dom-node
        var node = ReactDOM.findDOMNode(this);
        var removalListenerRequired = this.state.removalListenerRequired;
        if (node && node.nodeType === Node.ELEMENT_NODE) {
            this._subscribeOnElementRemoval(node);
            return;
        }
        if (!removalListenerRequired) {
            this.setState({ removalListenerRequired: true });
            return;
        }
        if (this._listenerElement) {
            this._subscribeOnElementRemoval(this._listenerElement);
        }
    };
    TemplateWrapper.prototype._subscribeOnElementRemoval = function (element) {
        events.off(element, component_base_1.DX_REMOVE_EVENT, this._onDxRemove);
        events.one(element, component_base_1.DX_REMOVE_EVENT, this._onDxRemove);
    };
    TemplateWrapper.prototype._onDxRemove = function () {
        var onRemoved = this.props.onRemoved;
        onRemoved();
    };
    TemplateWrapper.prototype.render = function () {
        var removalListenerRequired = this.state.removalListenerRequired;
        var _a = this.props, content = _a.content, container = _a.container;
        var removalListener = removalListenerRequired
            ? React.createElement('span', { style: removalListenerStyle, ref: this._removalListenerRef })
            : undefined;
        return ReactDOM.createPortal(React.createElement(React.Fragment, null, content, removalListener), container);
    };
    return TemplateWrapper;
}(React.PureComponent));
exports.TemplateWrapper = TemplateWrapper;
