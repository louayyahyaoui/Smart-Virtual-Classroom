/**
 * DevExtreme (viz/vector_map/event_emitter.js)
 * Version: 20.2.6
 * Build date: Tue Mar 16 2021
 *
 * Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
exports.makeEventEmitter = makeEventEmitter;
var _callbacks = _interopRequireDefault(require("../../core/utils/callbacks"));

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        "default": obj
    }
}
var eventEmitterMethods = {
    _initEvents: function() {
        var names = this._eventNames;
        var i;
        var ii = names.length;
        var events = this._events = {};
        for (i = 0; i < ii; ++i) {
            events[names[i]] = (0, _callbacks.default)()
        }
    },
    _disposeEvents: function() {
        var events = this._events;
        var name;
        for (name in events) {
            events[name].empty()
        }
        this._events = null
    },
    on: function(handlers) {
        var events = this._events;
        var name;
        for (name in handlers) {
            events[name].add(handlers[name])
        }
        return dispose;

        function dispose() {
            for (name in handlers) {
                events[name].remove(handlers[name])
            }
        }
    },
    _fire: function(name, arg) {
        this._events[name].fire(arg)
    }
};

function makeEventEmitter(target) {
    var proto = target.prototype;
    var name;
    for (name in eventEmitterMethods) {
        proto[name] = eventEmitterMethods[name]
    }
}
