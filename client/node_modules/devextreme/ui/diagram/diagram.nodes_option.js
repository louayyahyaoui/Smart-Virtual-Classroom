/**
 * DevExtreme (ui/diagram/diagram.nodes_option.js)
 * Version: 20.2.6
 * Build date: Tue Mar 16 2021
 *
 * Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
exports.default = void 0;
var _diagram = _interopRequireDefault(require("./diagram.items_option"));

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        "default": obj
    }
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
var NodesOption = function(_ItemsOption) {
    _inheritsLoose(NodesOption, _ItemsOption);

    function NodesOption() {
        return _ItemsOption.apply(this, arguments) || this
    }
    var _proto = NodesOption.prototype;
    _proto._getKeyExpr = function() {
        return this._diagramWidget._createOptionGetter("nodes.keyExpr")
    };
    _proto._getItemsExpr = function() {
        return this._diagramWidget._createOptionGetter("nodes.itemsExpr")
    };
    _proto._getContainerChildrenExpr = function() {
        return this._diagramWidget._createOptionGetter("nodes.containerChildrenExpr")
    };
    return NodesOption
}(_diagram.default);
var _default = NodesOption;
exports.default = _default;
module.exports = exports.default;
