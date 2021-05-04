/**
 * DevExtreme (ui/scheduler/appointmentAdapter.js)
 * Version: 20.2.6
 * Build date: Tue Mar 16 2021
 *
 * Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
exports.default = void 0;
var _extend = require("../../core/utils/extend");
var _ui = _interopRequireDefault(require("../widget/ui.errors"));
var _object = require("../../core/utils/object");
var _recurrence = require("./recurrence");

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        "default": obj
    }
}

function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) {
            descriptor.writable = true
        }
        Object.defineProperty(target, descriptor.key, descriptor)
    }
}

function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) {
        _defineProperties(Constructor.prototype, protoProps)
    }
    if (staticProps) {
        _defineProperties(Constructor, staticProps)
    }
    return Constructor
}
var PROPERTY_NAMES = {
    startDate: "startDate",
    endDate: "endDate",
    allDay: "allDay",
    text: "text",
    description: "description",
    startDateTimeZone: "startDateTimeZone",
    endDateTimeZone: "endDateTimeZone",
    recurrenceRule: "recurrenceRule",
    recurrenceException: "recurrenceException",
    disabled: "disabled"
};
var AppointmentAdapter = function() {
    function AppointmentAdapter(rawAppointment, options) {
        this.rawAppointment = rawAppointment;
        this.options = options
    }
    var _proto = AppointmentAdapter.prototype;
    _proto.getField = function(property) {
        return this.options.getField(this.rawAppointment, property)
    };
    _proto.setField = function(property, value) {
        return this.options.setField(this.rawAppointment, property, value)
    };
    _proto.calculateStartDate = function(pathTimeZoneConversion) {
        if (!this.startDate || isNaN(this.startDate.getTime())) {
            throw _ui.default.Error("E1032", this.text)
        }
        return this.calculateDate(this.startDate, this.startDateTimeZone, pathTimeZoneConversion)
    };
    _proto.calculateEndDate = function(pathTimeZoneConversion) {
        return this.calculateDate(this.endDate, this.endDateTimeZone, pathTimeZoneConversion)
    };
    _proto.calculateDate = function(date, appointmentTimeZone, pathTimeZoneConversion) {
        if (!date) {
            return
        }
        return this.timeZoneCalculator.createDate(date, {
            appointmentTimeZone: appointmentTimeZone,
            path: pathTimeZoneConversion
        })
    };
    _proto.clone = function() {
        var options = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : void 0;
        var result = new AppointmentAdapter((0, _object.deepExtendArraySafe)({}, this.rawAppointment), this.options);
        if (null !== options && void 0 !== options && options.pathTimeZone) {
            result.startDate = result.calculateStartDate(options.pathTimeZone);
            result.endDate = result.calculateEndDate(options.pathTimeZone)
        }
        return result
    };
    _proto.source = function() {
        var serializeDate = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : false;
        if (serializeDate) {
            var clonedAdapter = this.clone();
            clonedAdapter.startDate = this.startDate;
            clonedAdapter.endDate = this.endDate;
            return clonedAdapter.source()
        }
        return (0, _extend.extend)({}, this.rawAppointment)
    };
    _createClass(AppointmentAdapter, [{
        key: "duration",
        get: function() {
            return this.endDate ? this.endDate - this.startDate : 0
        }
    }, {
        key: "startDate",
        get: function() {
            var result = this.getField(PROPERTY_NAMES.startDate);
            return void 0 === result ? result : new Date(result)
        },
        set: function(value) {
            this.setField(PROPERTY_NAMES.startDate, value)
        }
    }, {
        key: "endDate",
        get: function() {
            var result = this.getField(PROPERTY_NAMES.endDate);
            return void 0 === result ? result : new Date(result)
        },
        set: function(value) {
            this.setField(PROPERTY_NAMES.endDate, value)
        }
    }, {
        key: "allDay",
        get: function() {
            return this.getField(PROPERTY_NAMES.allDay)
        },
        set: function(value) {
            this.setField(PROPERTY_NAMES.allDay, value)
        }
    }, {
        key: "text",
        get: function() {
            return this.getField(PROPERTY_NAMES.text)
        },
        set: function(value) {
            this.setField(PROPERTY_NAMES.text, value)
        }
    }, {
        key: "description",
        get: function() {
            return this.getField(PROPERTY_NAMES.description)
        },
        set: function(value) {
            this.setField(PROPERTY_NAMES.description, value)
        }
    }, {
        key: "startDateTimeZone",
        get: function() {
            return this.getField(PROPERTY_NAMES.startDateTimeZone)
        }
    }, {
        key: "endDateTimeZone",
        get: function() {
            return this.getField(PROPERTY_NAMES.endDateTimeZone)
        }
    }, {
        key: "recurrenceRule",
        get: function() {
            return this.getField(PROPERTY_NAMES.recurrenceRule)
        },
        set: function(value) {
            this.setField(PROPERTY_NAMES.recurrenceRule, value)
        }
    }, {
        key: "recurrenceException",
        get: function() {
            return this.getField(PROPERTY_NAMES.recurrenceException)
        },
        set: function(value) {
            this.setField(PROPERTY_NAMES.recurrenceException, value)
        }
    }, {
        key: "disabled",
        get: function() {
            return !!this.getField(PROPERTY_NAMES.disabled)
        }
    }, {
        key: "timeZoneCalculator",
        get: function() {
            return this.options.getTimeZoneCalculator()
        }
    }, {
        key: "isRecurrent",
        get: function() {
            return (0, _recurrence.getRecurrenceProcessor)().isValidRecurrenceRule(this.recurrenceRule)
        }
    }]);
    return AppointmentAdapter
}();
var _default = AppointmentAdapter;
exports.default = _default;
module.exports = exports.default;
