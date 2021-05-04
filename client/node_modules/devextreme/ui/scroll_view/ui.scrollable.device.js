/**
 * DevExtreme (ui/scroll_view/ui.scrollable.device.js)
 * Version: 20.2.6
 * Build date: Tue Mar 16 2021
 *
 * Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
exports.deviceDependentOptions = void 0;
var _devices = _interopRequireDefault(require("../../core/devices"));
var _support = require("../../core/utils/support");

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        "default": obj
    }
}
var deviceDependentOptions = function() {
    return [{
        device: function() {
            return !_support.nativeScrolling
        },
        options: {
            useNative: false
        }
    }, {
        device: function(_device) {
            return !_devices.default.isSimulator() && "desktop" === _devices.default.real().deviceType && "generic" === _device.platform
        },
        options: {
            bounceEnabled: false,
            scrollByThumb: true,
            scrollByContent: _support.touch,
            showScrollbar: "onHover"
        }
    }]
};
exports.deviceDependentOptions = deviceDependentOptions;
