/**
 * DevExtreme (renovation/ui/common/widget.j.js)
 * Version: 20.2.6
 * Build date: Tue Mar 16 2021
 *
 * Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
exports.default = void 0;
var _component_registrator = _interopRequireDefault(require("../../../core/component_registrator"));
var _component = _interopRequireDefault(require("../../preact_wrapper/component"));
var _widget = require("./widget");

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
var Widget = function(_BaseComponent) {
    _inheritsLoose(Widget, _BaseComponent);

    function Widget() {
        return _BaseComponent.apply(this, arguments) || this
    }
    var _proto = Widget.prototype;
    _proto.getProps = function() {
        var props = _BaseComponent.prototype.getProps.call(this);
        props.onKeyDown = this._wrapKeyDownHandler(props.onKeyDown);
        return props
    };
    _proto.focus = function() {
        return this.viewRef.focus()
    };
    _proto._getActionConfigs = function() {
        return {
            onActive: {},
            onDimensionChanged: {},
            onInactive: {},
            onKeyboardHandled: {},
            onVisibilityChange: {},
            onFocusIn: {},
            onFocusOut: {},
            onClick: {},
            onContentReady: {
                excludeValidators: ["disabled", "readOnly"]
            }
        }
    };
    _createClass(Widget, [{
        key: "_propsInfo",
        get: function() {
            return {
                twoWay: [],
                allowNull: ["accessKey"],
                elements: []
            }
        }
    }, {
        key: "_viewComponent",
        get: function() {
            return _widget.Widget
        }
    }]);
    return Widget
}(_component.default);
exports.default = Widget;
(0, _component_registrator.default)("dxWidget", Widget);
module.exports = exports.default;
