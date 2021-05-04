/**
 * DevExtreme (core/utils/resize_callbacks.js)
 * Version: 20.2.6
 * Build date: Tue Mar 16 2021
 *
 * Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
exports.default = void 0;
var _window = require("./window");
var _dom_adapter = _interopRequireDefault(require("../dom_adapter"));
var _callbacks = _interopRequireDefault(require("./callbacks"));
var _ready_callbacks = _interopRequireDefault(require("./ready_callbacks"));
var _call_once = _interopRequireDefault(require("./call_once"));

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        "default": obj
    }
}
var resizeCallbacks = function() {
    var prevSize;
    var callbacks = (0, _callbacks.default)();
    var originalCallbacksAdd = callbacks.add;
    var originalCallbacksRemove = callbacks.remove;
    if (!(0, _window.hasWindow)()) {
        return callbacks
    }
    var formatSize = function() {
        var window = (0, _window.getWindow)();
        return {
            width: window.innerWidth,
            height: window.innerHeight
        }
    };
    var handleResize = function() {
        var now = formatSize();
        if (now.width === prevSize.width && now.height === prevSize.height) {
            return
        }
        var changedDimension;
        if (now.width === prevSize.width) {
            changedDimension = "height"
        }
        if (now.height === prevSize.height) {
            changedDimension = "width"
        }
        prevSize = now;
        callbacks.fire(changedDimension)
    };
    var setPrevSize = (0, _call_once.default)(function() {
        prevSize = formatSize()
    });
    var removeListener;
    callbacks.add = function() {
        var result = originalCallbacksAdd.apply(callbacks, arguments);
        setPrevSize();
        _ready_callbacks.default.add(function() {
            if (!removeListener && callbacks.has()) {
                removeListener = _dom_adapter.default.listen((0, _window.getWindow)(), "resize", handleResize)
            }
        });
        return result
    };
    callbacks.remove = function() {
        var result = originalCallbacksRemove.apply(callbacks, arguments);
        if (!callbacks.has() && removeListener) {
            removeListener();
            removeListener = void 0
        }
        return result
    };
    return callbacks
}();
var _default = resizeCallbacks;
exports.default = _default;
module.exports = exports.default;
