/**
 * DevExtreme (events/pointer.js)
 * Version: 20.2.6
 * Build date: Tue Mar 16 2021
 *
 * Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";

function _typeof(obj) {
    "@babel/helpers - typeof";
    if ("function" === typeof Symbol && "symbol" === typeof Symbol.iterator) {
        _typeof = function(obj) {
            return typeof obj
        }
    } else {
        _typeof = function(obj) {
            return obj && "function" === typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj
        }
    }
    return _typeof(obj)
}
exports.default = void 0;
var support = _interopRequireWildcard(require("../core/utils/support"));
var _iterator = require("../core/utils/iterator");
var _browser = _interopRequireDefault(require("../core/utils/browser"));
var _devices = _interopRequireDefault(require("../core/devices"));
var _event_registrator = _interopRequireDefault(require("./core/event_registrator"));
var _touch = _interopRequireDefault(require("./pointer/touch"));
var _mspointer = _interopRequireDefault(require("./pointer/mspointer"));
var _mouse = _interopRequireDefault(require("./pointer/mouse"));
var _mouse_and_touch = _interopRequireDefault(require("./pointer/mouse_and_touch"));

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        "default": obj
    }
}

function _getRequireWildcardCache() {
    if ("function" !== typeof WeakMap) {
        return null
    }
    var cache = new WeakMap;
    _getRequireWildcardCache = function() {
        return cache
    };
    return cache
}

function _interopRequireWildcard(obj) {
    if (obj && obj.__esModule) {
        return obj
    }
    if (null === obj || "object" !== _typeof(obj) && "function" !== typeof obj) {
        return {
            "default": obj
        }
    }
    var cache = _getRequireWildcardCache();
    if (cache && cache.has(obj)) {
        return cache.get(obj)
    }
    var newObj = {};
    var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;
    for (var key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
            var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;
            if (desc && (desc.get || desc.set)) {
                Object.defineProperty(newObj, key, desc)
            } else {
                newObj[key] = obj[key]
            }
        }
    }
    newObj.default = obj;
    if (cache) {
        cache.set(obj, newObj)
    }
    return newObj
}
var getStrategy = function(support, device, browser) {
    if (support.pointerEvents && browser.msie) {
        return _mspointer.default
    }
    var tablet = device.tablet,
        phone = device.phone;
    if (support.touch && !(tablet || phone)) {
        return _mouse_and_touch.default
    }
    if (support.touch) {
        return _touch.default
    }
    return _mouse.default
};
var EventStrategy = getStrategy(support, _devices.default.real(), _browser.default);
(0, _iterator.each)(EventStrategy.map, function(pointerEvent, originalEvents) {
    (0, _event_registrator.default)(pointerEvent, new EventStrategy(pointerEvent, originalEvents))
});
var pointer = {
    down: "dxpointerdown",
    up: "dxpointerup",
    move: "dxpointermove",
    cancel: "dxpointercancel",
    enter: "dxpointerenter",
    leave: "dxpointerleave",
    over: "dxpointerover",
    out: "dxpointerout"
};
var _default = pointer;
exports.default = _default;
module.exports = exports.default;
