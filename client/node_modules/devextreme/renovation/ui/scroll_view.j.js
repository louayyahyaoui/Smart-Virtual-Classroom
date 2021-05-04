/**
 * DevExtreme (renovation/ui/scroll_view.j.js)
 * Version: 20.2.6
 * Build date: Tue Mar 16 2021
 *
 * Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
exports.default = void 0;
var _component_registrator = _interopRequireDefault(require("../../core/component_registrator"));
var _component = _interopRequireDefault(require("../preact_wrapper/component"));
var _scroll_view = require("./scroll_view");

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
var ScrollView = function(_BaseComponent) {
    _inheritsLoose(ScrollView, _BaseComponent);

    function ScrollView() {
        return _BaseComponent.apply(this, arguments) || this
    }
    var _proto = ScrollView.prototype;
    _proto.content = function() {
        return this._toPublicElement(this.viewRef.content())
    };
    _proto.scrollBy = function(distance) {
        return this.viewRef.scrollBy(distance)
    };
    _proto.scrollTo = function(targetLocation) {
        return this.viewRef.scrollTo(targetLocation)
    };
    _proto.scrollToElement = function(element, offset) {
        return this.viewRef.scrollToElement(this._patchElementParam(element), offset)
    };
    _proto.scrollHeight = function() {
        return this.viewRef.scrollHeight()
    };
    _proto.scrollWidth = function() {
        return this.viewRef.scrollWidth()
    };
    _proto.scrollOffset = function() {
        return this.viewRef.scrollOffset()
    };
    _proto.scrollTop = function() {
        return this.viewRef.scrollTop()
    };
    _proto.scrollLeft = function() {
        return this.viewRef.scrollLeft()
    };
    _proto.clientHeight = function() {
        return this.viewRef.clientHeight()
    };
    _proto.clientWidth = function() {
        return this.viewRef.clientWidth()
    };
    _proto._getActionConfigs = function() {
        return {
            onScroll: {}
        }
    };
    _createClass(ScrollView, [{
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
            return _scroll_view.ScrollView
        }
    }]);
    return ScrollView
}(_component.default);
exports.default = ScrollView;
(0, _component_registrator.default)("dxScrollView", ScrollView);
module.exports = exports.default;
