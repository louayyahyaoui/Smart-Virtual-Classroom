/**
 * DevExtreme (core/utils/deferred.js)
 * Version: 20.2.6
 * Build date: Tue Mar 16 2021
 *
 * Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
exports.fromPromise = fromPromise;
exports.setStrategy = setStrategy;
exports.Deferred = Deferred;
exports.when = when;
var _type = require("../utils/type");
var _extend = require("../utils/extend");
var _callbacks = _interopRequireDefault(require("../utils/callbacks"));

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        "default": obj
    }
}
var deferredConfig = [{
    method: "resolve",
    handler: "done",
    state: "resolved"
}, {
    method: "reject",
    handler: "fail",
    state: "rejected"
}, {
    method: "notify",
    handler: "progress"
}];
var _DeferredObj = function() {
    var that = this;
    this._state = "pending";
    this._promise = {};
    deferredConfig.forEach(function(config) {
        var methodName = config.method;
        this[methodName + "Callbacks"] = new _callbacks.default;
        this[methodName] = function() {
            return this[methodName + "With"](this._promise, arguments)
        }.bind(this);
        this._promise[config.handler] = function(handler) {
            if (!handler) {
                return this
            }
            var callbacks = that[methodName + "Callbacks"];
            if (callbacks.fired()) {
                handler.apply(that[methodName + "Context"], that[methodName + "Args"])
            } else {
                callbacks.add(function(context, args) {
                    handler.apply(context, args)
                }.bind(this))
            }
            return this
        }
    }.bind(this));
    this._promise.always = function(handler) {
        return this.done(handler).fail(handler)
    };
    this._promise.catch = function(handler) {
        return this.then(null, handler)
    };
    this._promise.then = function(resolve, reject) {
        var result = new _DeferredObj;
        ["done", "fail"].forEach(function(method) {
            var callback = "done" === method ? resolve : reject;
            this[method](function() {
                if (!callback) {
                    result["done" === method ? "resolve" : "reject"].apply(this, arguments);
                    return
                }
                var callbackResult = callback && callback.apply(this, arguments);
                if ((0, _type.isDeferred)(callbackResult)) {
                    callbackResult.done(result.resolve).fail(result.reject)
                } else {
                    if ((0, _type.isPromise)(callbackResult)) {
                        callbackResult.then(result.resolve, result.reject)
                    } else {
                        result.resolve.apply(this, (0, _type.isDefined)(callbackResult) ? [callbackResult] : arguments)
                    }
                }
            })
        }.bind(this));
        return result.promise()
    };
    this._promise.state = function() {
        return that._state
    };
    this._promise.promise = function(args) {
        return args ? (0, _extend.extend)(args, that._promise) : that._promise
    };
    this._promise.promise(this)
};
deferredConfig.forEach(function(config) {
    var methodName = config.method;
    var state = config.state;
    _DeferredObj.prototype[methodName + "With"] = function(context, args) {
        var callbacks = this[methodName + "Callbacks"];
        if ("pending" === this.state()) {
            this[methodName + "Args"] = args;
            this[methodName + "Context"] = context;
            if (state) {
                this._state = state
            }
            callbacks.fire(context, args)
        }
        return this
    }
});

function fromPromise(promise, context) {
    if ((0, _type.isDeferred)(promise)) {
        return promise
    } else {
        if ((0, _type.isPromise)(promise)) {
            var d = new _DeferredObj;
            promise.then(function() {
                d.resolveWith.apply(d, [context].concat([
                    [].slice.call(arguments)
                ]))
            }, function() {
                d.rejectWith.apply(d, [context].concat([
                    [].slice.call(arguments)
                ]))
            });
            return d
        }
    }
    return (new _DeferredObj).resolveWith(context, [promise])
}
var whenFunc = function() {
    if (1 === arguments.length) {
        return fromPromise(arguments[0])
    }
    var values = [].slice.call(arguments);
    var contexts = [];
    var resolvedCount = 0;
    var deferred = new _DeferredObj;
    var updateState = function(i) {
        return function(value) {
            contexts[i] = this;
            values[i] = arguments.length > 1 ? [].slice.call(arguments) : value;
            resolvedCount++;
            if (resolvedCount === values.length) {
                deferred.resolveWith(contexts, values)
            }
        }
    };
    for (var i = 0; i < values.length; i++) {
        if ((0, _type.isDeferred)(values[i])) {
            values[i].promise().done(updateState(i)).fail(deferred.reject)
        } else {
            resolvedCount++
        }
    }
    if (resolvedCount === values.length) {
        deferred.resolveWith(contexts, values)
    }
    return deferred.promise()
};

function setStrategy(value) {
    _DeferredObj = value.Deferred;
    whenFunc = value.when
}

function Deferred() {
    return new _DeferredObj
}

function when() {
    return whenFunc.apply(this, arguments)
}
