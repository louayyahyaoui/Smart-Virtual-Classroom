/**
 * DevExtreme (ui/scheduler/utils.js)
 * Version: 20.2.6
 * Build date: Tue Mar 16 2021
 *
 * Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
exports.default = void 0;
var _renderer = _interopRequireDefault(require("../../core/renderer"));

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        "default": obj
    }
}
var KEYS = {
    SETTINGS: "dxAppointmentSettings"
};
var utils = {
    dataAccessors: {
        getAppointmentSettings: function(element) {
            return (0, _renderer.default)(element).data(KEYS.SETTINGS)
        },
        getAppointmentInfo: function(element) {
            var settings = utils.dataAccessors.getAppointmentSettings(element);
            return null === settings || void 0 === settings ? void 0 : settings.info
        }
    }
};
var _default = utils;
exports.default = _default;
module.exports = exports.default;
