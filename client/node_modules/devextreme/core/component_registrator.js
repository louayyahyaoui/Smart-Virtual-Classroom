/**
 * DevExtreme (core/component_registrator.js)
 * Version: 20.2.6
 * Build date: Tue Mar 16 2021
 *
 * Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
exports.default = void 0;
var _renderer = _interopRequireDefault(require("./renderer"));
var _component_registrator_callbacks = _interopRequireDefault(require("./component_registrator_callbacks"));
var _errors = _interopRequireDefault(require("./errors"));
var _public_component = require("./utils/public_component");

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        "default": obj
    }
}
var registerComponent = function(name, namespace, componentClass) {
    if (!componentClass) {
        componentClass = namespace
    } else {
        namespace[name] = componentClass
    }(0, _public_component.name)(componentClass, name);
    _component_registrator_callbacks.default.fire(name, componentClass)
};
var registerRendererComponent = function(name, componentClass) {
    _renderer.default.fn[name] = function(options) {
        var isMemberInvoke = "string" === typeof options;
        var result;
        if (isMemberInvoke) {
            var memberName = options;
            var memberArgs = [].slice.call(arguments).slice(1);
            this.each(function() {
                var instance = componentClass.getInstance(this);
                if (!instance) {
                    throw _errors.default.Error("E0009", name)
                }
                var member = instance[memberName];
                var memberValue = member.apply(instance, memberArgs);
                if (void 0 === result) {
                    result = memberValue
                }
            })
        } else {
            this.each(function() {
                var instance = componentClass.getInstance(this);
                if (instance) {
                    instance.option(options)
                } else {
                    new componentClass(this, options)
                }
            });
            result = this
        }
        return result
    }
};
_component_registrator_callbacks.default.add(registerRendererComponent);
var _default = registerComponent;
exports.default = _default;
module.exports = exports.default;
module.exports.default = module.exports;
