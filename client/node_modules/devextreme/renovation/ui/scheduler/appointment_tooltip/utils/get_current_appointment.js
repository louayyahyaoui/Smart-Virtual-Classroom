/**
 * DevExtreme (renovation/ui/scheduler/appointment_tooltip/utils/get_current_appointment.js)
 * Version: 20.2.6
 * Build date: Tue Mar 16 2021
 *
 * Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
exports.default = void 0;
var _default = function(appointmentItem) {
    var _ref, _settings$targetedApp;
    var currentData = appointmentItem.currentData,
        data = appointmentItem.data,
        settings = appointmentItem.settings;
    return null !== (_ref = null !== (_settings$targetedApp = null === settings || void 0 === settings ? void 0 : settings.targetedAppointmentData) && void 0 !== _settings$targetedApp ? _settings$targetedApp : currentData) && void 0 !== _ref ? _ref : data
};
exports.default = _default;
module.exports = exports.default;
