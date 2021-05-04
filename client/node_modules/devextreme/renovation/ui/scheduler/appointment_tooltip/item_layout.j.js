/**
 * DevExtreme (renovation/ui/scheduler/appointment_tooltip/item_layout.j.js)
 * Version: 20.2.6
 * Build date: Tue Mar 16 2021
 *
 * Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
exports.default = void 0;
var _component_registrator = _interopRequireDefault(require("../../../../core/component_registrator"));
var _tooltip_item_content = _interopRequireDefault(require("../../../preact_wrapper/tooltip_item_content"));
var _item_layout = require("./item_layout");

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        "default": obj
    }
}

function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) {
            descriptor.writable = true
        }
        Object.defineProperty(target, descriptor.key, descriptor)
    }
}

function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) {
        _defineProperties(Constructor.prototype, protoProps)
    }
    if (staticProps) {
        _defineProperties(Constructor, staticProps)
    }
    return Constructor
}

function _inheritsLoose(subClass, superClass) {
    subClass.prototype = Object.create(superClass.prototype);
    subClass.prototype.constructor = subClass;
    _setPrototypeOf(subClass, superClass)
}

function _setPrototypeOf(o, p) {
    _setPrototypeOf = Object.setPrototypeOf || function(o, p) {
        o.__proto__ = p;
        return o
    };
    return _setPrototypeOf(o, p)
}
var TooltipItemLayout = function(_BaseComponent) {
    _inheritsLoose(TooltipItemLayout, _BaseComponent);

    function TooltipItemLayout() {
        return _BaseComponent.apply(this, arguments) || this
    }
    var _proto = TooltipItemLayout.prototype;
    _proto.getProps = function() {
        var props = _BaseComponent.prototype.getProps.call(this);
        props.itemContentTemplate = this._createTemplateComponent(props, props.itemContentTemplate);
        return props
    };
    _proto._getActionConfigs = function() {
        return {
            onDelete: {},
            onHide: {}
        }
    };
    _createClass(TooltipItemLayout, [{
        key: "_propsInfo",
        get: function() {
            return {
                twoWay: [],
                allowNull: [],
                elements: []
            }
        }
    }, {
        key: "_viewComponent",
        get: function() {
            return _item_layout.TooltipItemLayout
        }
    }]);
    return TooltipItemLayout
}(_tooltip_item_content.default);
exports.default = TooltipItemLayout;
(0, _component_registrator.default)("dxTooltipItemLayout", TooltipItemLayout);
module.exports = exports.default;
