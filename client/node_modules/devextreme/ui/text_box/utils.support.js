/**
 * DevExtreme (ui/text_box/utils.support.js)
 * Version: 20.2.6
 * Build date: Tue Mar 16 2021
 *
 * Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
exports.isInputEventsL2Supported = isInputEventsL2Supported;
var _dom_adapter = _interopRequireDefault(require("../../core/dom_adapter"));
var _devices = _interopRequireDefault(require("../../core/devices"));

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        "default": obj
    }
}

function isModernAndroidDevice() {
    var _devices$real = _devices.default.real(),
        android = _devices$real.android,
        version = _devices$real.version;
    return android && version[0] > 4
}

function isInputEventsL2Supported() {
    return "onbeforeinput" in _dom_adapter.default.createElement("input") || isModernAndroidDevice()
}
