/**
 * DevExtreme (core/class.js)
 * Version: 20.2.6
 * Build date: Tue Mar 16 2021
 *
 * Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
exports.default = void 0;
var _errors = _interopRequireDefault(require("./errors"));
var _type = require("./utils/type");

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        "default": obj
    }
}
var wrapOverridden = function(baseProto, methodName, method) {
    return function() {
        var prevCallBase = this.callBase;
        this.callBase = baseProto[methodName];
        try {
            return method.apply(this, arguments)
        } finally {
            this.callBase = prevCallBase
        }
    }
};
var clonePrototype = function(obj) {
    var func = function() {};
    func.prototype = obj.prototype;
    return new func
};
var redefine = function(members) {
    var that = this;
    var overridden;
    var memberName;
    var member;
    if (!members) {
        return that
    }
    for (memberName in members) {
        member = members[memberName];
        overridden = "function" === typeof that.prototype[memberName] && "function" === typeof member;
        that.prototype[memberName] = overridden ? wrapOverridden(that.parent.prototype, memberName, member) : member
    }
    return that
};
var include = function() {
    var classObj = this;
    var argument;
    var name;
    var i;
    var hasClassObjOwnProperty = Object.prototype.hasOwnProperty.bind(classObj);
    var isES6Class = !hasClassObjOwnProperty("_includedCtors") && !hasClassObjOwnProperty("_includedPostCtors");
    if (isES6Class) {
        classObj._includedCtors = classObj._includedCtors.slice(0);
        classObj._includedPostCtors = classObj._includedPostCtors.slice(0)
    }
    for (i = 0; i < arguments.length; i++) {
        argument = arguments[i];
        if (argument.ctor) {
            classObj._includedCtors.push(argument.ctor)
        }
        if (argument.postCtor) {
            classObj._includedPostCtors.push(argument.postCtor)
        }
        for (name in argument) {
            if ("ctor" === name || "postCtor" === name) {
                continue
            }
            classObj.prototype[name] = argument[name]
        }
    }
    return classObj
};
var subclassOf = function(parentClass) {
    var hasParentProperty = Object.prototype.hasOwnProperty.bind(this)("parent");
    var isES6Class = !hasParentProperty && this.parent;
    if (isES6Class) {
        var baseClass = Object.getPrototypeOf(this);
        return baseClass === parentClass || baseClass.subclassOf(parentClass)
    } else {
        if (this.parent === parentClass) {
            return true
        }
        if (!this.parent || !this.parent.subclassOf) {
            return false
        }
        return this.parent.subclassOf(parentClass)
    }
};
var abstract = function() {
    throw _errors.default.Error("E0001")
};
var copyStatic = function() {
    var hasOwn = Object.prototype.hasOwnProperty;
    return function(source, destination) {
        for (var key in source) {
            if (!hasOwn.call(source, key)) {
                return
            }
            destination[key] = source[key]
        }
    }
}();
var classImpl = function() {};
classImpl.inherit = function(members) {
    var inheritor = function() {
        if (!this || (0, _type.isWindow)(this) || "function" !== typeof this.constructor) {
            throw _errors.default.Error("E0003")
        }
        var instance = this;
        var ctor = instance.ctor;
        var includedCtors = instance.constructor._includedCtors;
        var includedPostCtors = instance.constructor._includedPostCtors;
        var i;
        for (i = 0; i < includedCtors.length; i++) {
            includedCtors[i].call(instance)
        }
        if (ctor) {
            ctor.apply(instance, arguments)
        }
        for (i = 0; i < includedPostCtors.length; i++) {
            includedPostCtors[i].call(instance)
        }
    };
    inheritor.prototype = clonePrototype(this);
    copyStatic(this, inheritor);
    inheritor.inherit = this.inherit;
    inheritor.abstract = abstract;
    inheritor.redefine = redefine;
    inheritor.include = include;
    inheritor.subclassOf = subclassOf;
    inheritor.parent = this;
    inheritor._includedCtors = this._includedCtors ? this._includedCtors.slice(0) : [];
    inheritor._includedPostCtors = this._includedPostCtors ? this._includedPostCtors.slice(0) : [];
    inheritor.prototype.constructor = inheritor;
    inheritor.redefine(members);
    return inheritor
};
classImpl.abstract = abstract;
var _default = classImpl;
exports.default = _default;
module.exports = exports.default;
