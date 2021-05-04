/**
 * DevExtreme (core/events_strategy.js)
 * Version: 20.2.6
 * Build date: Tue Mar 16 2021
 *
 * Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
exports.EventsStrategy = void 0;
var _callbacks = _interopRequireDefault(require("./utils/callbacks"));
var _iterator = require("./utils/iterator");
var _type = require("./utils/type");

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        "default": obj
    }
}
var EventsStrategy = function() {
    function EventsStrategy(owner) {
        var options = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
        this._events = {};
        this._owner = owner;
        this._options = options
    }
    EventsStrategy.create = function(owner, strategy) {
        if (strategy) {
            return (0, _type.isFunction)(strategy) ? strategy(owner) : strategy
        } else {
            return new EventsStrategy(owner)
        }
    };
    var _proto = EventsStrategy.prototype;
    _proto.hasEvent = function(eventName) {
        var callbacks = this._events[eventName];
        return callbacks ? callbacks.has() : false
    };
    _proto.fireEvent = function(eventName, eventArgs) {
        var callbacks = this._events[eventName];
        if (callbacks) {
            callbacks.fireWith(this._owner, eventArgs)
        }
        return this._owner
    };
    _proto.on = function(eventName, eventHandler) {
        var _this = this;
        if ((0, _type.isPlainObject)(eventName)) {
            (0, _iterator.each)(eventName, function(e, h) {
                _this.on(e, h)
            })
        } else {
            var callbacks = this._events[eventName];
            if (!callbacks) {
                callbacks = (0, _callbacks.default)({
                    syncStrategy: this._options.syncStrategy
                });
                this._events[eventName] = callbacks
            }
            var addFn = callbacks.originalAdd || callbacks.add;
            addFn.call(callbacks, eventHandler)
        }
    };
    _proto.off = function(eventName, eventHandler) {
        var callbacks = this._events[eventName];
        if (callbacks) {
            if ((0, _type.isFunction)(eventHandler)) {
                callbacks.remove(eventHandler)
            } else {
                callbacks.empty()
            }
        }
    };
    _proto.dispose = function() {
        (0, _iterator.each)(this._events, function(eventName, event) {
            event.empty()
        })
    };
    return EventsStrategy
}();
exports.EventsStrategy = EventsStrategy;
