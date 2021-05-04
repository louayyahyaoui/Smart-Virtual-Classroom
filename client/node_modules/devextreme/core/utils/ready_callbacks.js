/**
 * DevExtreme (core/utils/ready_callbacks.js)
 * Version: 20.2.6
 * Build date: Tue Mar 16 2021
 *
 * Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
exports.default = void 0;
var _dom_adapter = _interopRequireDefault(require("../dom_adapter"));
var _dependency_injector = _interopRequireDefault(require("./dependency_injector"));
var _window = require("./window");
var _call_once = _interopRequireDefault(require("./call_once"));

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        "default": obj
    }
}
var callbacks = [];
var isReady = function() {
    return "complete" === _dom_adapter.default.getReadyState() || "loading" !== _dom_adapter.default.getReadyState() && !_dom_adapter.default.getDocumentElement().doScroll
};
var subscribeReady = (0, _call_once.default)(function() {
    var removeListener = _dom_adapter.default.listen(_dom_adapter.default.getDocument(), "DOMContentLoaded", function() {
        readyCallbacks.fire();
        removeListener()
    })
});
var readyCallbacks = {
    add: function(callback) {
        var windowExists = (0, _window.hasWindow)();
        if (windowExists && isReady()) {
            callback()
        } else {
            callbacks.push(callback);
            windowExists && subscribeReady()
        }
    },
    fire: function() {
        callbacks.forEach(function(callback) {
            return callback()
        });
        callbacks = []
    }
};
var _default = (0, _dependency_injector.default)(readyCallbacks);
exports.default = _default;
module.exports = exports.default;
