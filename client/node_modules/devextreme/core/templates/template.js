/**
 * DevExtreme (core/templates/template.js)
 * Version: 20.2.6
 * Build date: Tue Mar 16 2021
 *
 * Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
exports.Template = void 0;
var _renderer = _interopRequireDefault(require("../renderer"));
var _template_base = require("./template_base");
var _dom = require("../utils/dom");
var _template_engine_registry = require("./template_engine_registry");
require("./template_engines");

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
}(0, _template_engine_registry.registerTemplateEngine)("default", {
    compile: function(element) {
        return (0, _dom.normalizeTemplateElement)(element)
    },
    render: function(template, model, index) {
        return template.clone()
    }
});
(0, _template_engine_registry.setTemplateEngine)("default");
var Template = function(_TemplateBase) {
    _inheritsLoose(Template, _TemplateBase);

    function Template(element) {
        var _this;
        _this = _TemplateBase.call(this) || this;
        _this._element = element;
        return _this
    }
    var _proto = Template.prototype;
    _proto._renderCore = function(options) {
        var transclude = options.transclude;
        if (!transclude && !this._compiledTemplate) {
            this._compiledTemplate = (0, _template_engine_registry.getCurrentTemplateEngine)().compile(this._element)
        }
        return (0, _renderer.default)("<div>").append(transclude ? this._element : (0, _template_engine_registry.getCurrentTemplateEngine)().render(this._compiledTemplate, options.model, options.index)).contents()
    };
    _proto.source = function() {
        return (0, _renderer.default)(this._element).clone()
    };
    return Template
}(_template_base.TemplateBase);
exports.Template = Template;
