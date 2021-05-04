/**
 * DevExtreme (core/utils/console.js)
 * Version: 20.2.6
 * Build date: Tue Mar 16 2021
 *
 * Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
exports.debug = exports.logger = void 0;
var _type = require("./type");
var noop = function() {};
var getConsoleMethod = function(method) {
    if ("undefined" === typeof console || !(0, _type.isFunction)(console[method])) {
        return noop
    }
    return console[method].bind(console)
};
var logger = {
    info: getConsoleMethod("info"),
    warn: getConsoleMethod("warn"),
    error: getConsoleMethod("error")
};
exports.logger = logger;
var debug = function() {
    function assert(condition, message) {
        if (!condition) {
            throw new Error(message)
        }
    }

    function assertParam(parameter, message) {
        assert(null !== parameter && void 0 !== parameter, message)
    }
    return {
        assert: assert,
        assertParam: assertParam
    }
}();
exports.debug = debug;
