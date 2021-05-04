/**
 * DevExtreme (core/memorized_callbacks.js)
 * Version: 20.2.6
 * Build date: Tue Mar 16 2021
 *
 * Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
exports.default = void 0;
var _iterator = require("../core/utils/iterator");
var _callbacks = _interopRequireDefault(require("./utils/callbacks"));

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        "default": obj
    }
}
var MemorizedCallbacks = function() {
    function MemorizedCallbacks() {
        this.memory = [];
        this.callbacks = (0, _callbacks.default)()
    }
    var _proto = MemorizedCallbacks.prototype;
    _proto.add = function(fn) {
        (0, _iterator.each)(this.memory, function(_, item) {
            return fn.apply(fn, item)
        });
        this.callbacks.add(fn)
    };
    _proto.remove = function(fn) {
        this.callbacks.remove(fn)
    };
    _proto.fire = function() {
        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key]
        }
        this.memory.push(args);
        this.callbacks.fire.apply(this.callbacks, args)
    };
    return MemorizedCallbacks
}();
exports.default = MemorizedCallbacks;
module.exports = exports.default;
