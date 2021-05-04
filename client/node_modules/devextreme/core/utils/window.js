/**
 * DevExtreme (core/utils/window.js)
 * Version: 20.2.6
 * Build date: Tue Mar 16 2021
 *
 * Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
exports.getNavigator = exports.getCurrentScreenFactor = exports.defaultScreenFactorFunc = exports.hasProperty = exports.getWindow = exports.hasWindow = void 0;
var _dom_adapter = _interopRequireDefault(require("../dom_adapter"));

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        "default": obj
    }
}
var hasWindow = function() {
    return "undefined" !== typeof window
};
exports.hasWindow = hasWindow;
var windowObject = hasWindow() && window;
if (!windowObject) {
    windowObject = {};
    windowObject.window = windowObject
}
var getWindow = function() {
    return windowObject
};
exports.getWindow = getWindow;
var hasProperty = function(prop) {
    return hasWindow() && prop in windowObject
};
exports.hasProperty = hasProperty;
var defaultScreenFactorFunc = function(width) {
    if (width < 768) {
        return "xs"
    } else {
        if (width < 992) {
            return "sm"
        } else {
            if (width < 1200) {
                return "md"
            } else {
                return "lg"
            }
        }
    }
};
exports.defaultScreenFactorFunc = defaultScreenFactorFunc;
var getCurrentScreenFactor = function(screenFactorCallback) {
    var screenFactorFunc = screenFactorCallback || defaultScreenFactorFunc;
    var windowWidth = _dom_adapter.default.getDocumentElement().clientWidth;
    return screenFactorFunc(windowWidth)
};
exports.getCurrentScreenFactor = getCurrentScreenFactor;
var getNavigator = function() {
    return hasWindow() ? windowObject.navigator : {
        userAgent: ""
    }
};
exports.getNavigator = getNavigator;
