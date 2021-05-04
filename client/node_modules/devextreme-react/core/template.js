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
exports.findProps = exports.Template = void 0;
var PropTypes = require("prop-types");
var React = require("react");
var Template = /** @class */ (function (_super) {
    __extends(Template, _super);
    function Template() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Template.prototype.render = function () {
        return null;
    };
    return Template;
}(React.PureComponent));
exports.Template = Template;
var requiredPropsCheck = function (props) {
    if (!props.component && !props.render && !props.children) {
        return new Error("The Template component requires 'component' or 'render' property");
    }
    return null;
};
Template.propTypes = {
    name: PropTypes.string.isRequired,
    component: requiredPropsCheck,
    render: requiredPropsCheck,
    children: requiredPropsCheck,
};
function findProps(child) {
    if (child.type !== Template) {
        return undefined;
    }
    return {
        name: child.props.name,
        render: child.props.render,
        component: child.props.component,
        children: child.props.children,
        keyFn: child.props.keyFn,
    };
}
exports.findProps = findProps;
