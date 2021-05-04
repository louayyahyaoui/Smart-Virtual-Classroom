/**
 * DevExtreme (renovation/preact_wrapper/tooltip_item_content.js)
 * Version: 20.2.6
 * Build date: Tue Mar 16 2021
 *
 * Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
exports.default = void 0;
var _component = _interopRequireDefault(require("./component"));
var _extend = require("../../core/utils/extend");

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
var TooltipItemContent = function(_Component) {
    _inheritsLoose(TooltipItemContent, _Component);

    function TooltipItemContent() {
        return _Component.apply(this, arguments) || this
    }
    var _proto = TooltipItemContent.prototype;
    _proto._setOptionsByReference = function() {
        _Component.prototype._setOptionsByReference.call(this);
        (0, _extend.extend)(this._optionsByReference, {
            item: true
        })
    };
    return TooltipItemContent
}(_component.default);
exports.default = TooltipItemContent;
module.exports = exports.default;
