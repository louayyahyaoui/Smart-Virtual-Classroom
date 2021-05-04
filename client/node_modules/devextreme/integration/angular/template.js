/**
 * DevExtreme (integration/angular/template.js)
 * Version: 20.2.6
 * Build date: Tue Mar 16 2021
 *
 * Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
exports.NgTemplate = void 0;
var _renderer = _interopRequireDefault(require("../../core/renderer"));
var _template_base = require("../../core/templates/template_base");
var _type = require("../../core/utils/type");
var _dom = require("../../core/utils/dom");

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
var NgTemplate = function(_TemplateBase) {
    _inheritsLoose(NgTemplate, _TemplateBase);

    function NgTemplate(element, templateCompiler) {
        var _this;
        _this = _TemplateBase.call(this) || this;
        _this._element = element;
        _this._compiledTemplate = templateCompiler((0, _dom.normalizeTemplateElement)(_this._element));
        return _this
    }
    var _proto = NgTemplate.prototype;
    _proto._renderCore = function(options) {
        var compiledTemplate = this._compiledTemplate;
        return (0, _type.isFunction)(compiledTemplate) ? compiledTemplate(options) : compiledTemplate
    };
    _proto.source = function() {
        return (0, _renderer.default)(this._element).clone()
    };
    return NgTemplate
}(_template_base.TemplateBase);
exports.NgTemplate = NgTemplate;
