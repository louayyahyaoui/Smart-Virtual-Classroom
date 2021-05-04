/**
 * DevExtreme (core/templates/child_default_template.js)
 * Version: 20.2.6
 * Build date: Tue Mar 16 2021
 *
 * Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
exports.ChildDefaultTemplate = void 0;
var _template_base = require("./template_base");

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
var ChildDefaultTemplate = function(_TemplateBase) {
    _inheritsLoose(ChildDefaultTemplate, _TemplateBase);

    function ChildDefaultTemplate(name) {
        var _this;
        _this = _TemplateBase.call(this) || this;
        _this.name = name;
        return _this
    }
    return ChildDefaultTemplate
}(_template_base.TemplateBase);
exports.ChildDefaultTemplate = ChildDefaultTemplate;
