/**
 * DevExtreme (core/utils/dependency_injector.js)
 * Version: 20.2.6
 * Build date: Tue Mar 16 2021
 *
 * Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
exports.default = _default;
var _extend = require("./extend");
var _type = require("./type");
var _iterator = require("./iterator");
var _class = _interopRequireDefault(require("../class"));

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        "default": obj
    }
}

function _default(object) {
    var BaseClass = _class.default.inherit(object);
    var InjectedClass = BaseClass;
    var instance = new InjectedClass(object);
    var initialFields = {};
    var injectFields = function(injectionObject, initial) {
        (0, _iterator.each)(injectionObject, function(key) {
            if ((0, _type.isFunction)(instance[key])) {
                if (initial || !object[key]) {
                    object[key] = function() {
                        return instance[key].apply(object, arguments)
                    }
                }
            } else {
                if (initial) {
                    initialFields[key] = object[key]
                }
                object[key] = instance[key]
            }
        })
    };
    injectFields(object, true);
    object.inject = function(injectionObject) {
        InjectedClass = InjectedClass.inherit(injectionObject);
        instance = new InjectedClass;
        injectFields(injectionObject)
    };
    object.resetInjection = function() {
        (0, _extend.extend)(object, initialFields);
        InjectedClass = BaseClass;
        instance = new BaseClass
    };
    return object
}
module.exports = exports.default;
