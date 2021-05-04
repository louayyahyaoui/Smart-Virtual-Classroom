/**
 * DevExtreme (renovation/ui/pager/pager.j.js)
 * Version: 20.2.6
 * Build date: Tue Mar 16 2021
 *
 * Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
exports.default = void 0;
var _component_registrator = _interopRequireDefault(require("../../../core/component_registrator"));
var _grid_pager = require("../../preact_wrapper/grid_pager");
var _pager = require("./pager");

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
var Pager = function(_GridPagerWrapper) {
    _inheritsLoose(Pager, _GridPagerWrapper);

    function Pager() {
        return _GridPagerWrapper.apply(this, arguments) || this
    }
    _createClass(Pager, [{
        key: "_propsInfo",
        get: function() {
            return {
                twoWay: [
                    ["pageIndex", 1, "pageIndexChange"],
                    ["pageSize", 5, "pageSizeChange"]
                ],
                allowNull: [],
                elements: []
            }
        }
    }, {
        key: "_viewComponent",
        get: function() {
            return _pager.Pager
        }
    }]);
    return Pager
}(_grid_pager.GridPagerWrapper);
exports.default = Pager;
(0, _component_registrator.default)("dxPager", Pager);
module.exports = exports.default;
