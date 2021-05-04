/**
 * DevExtreme (ui/scheduler/rendering_strategies/ui.scheduler.appointmentsPositioning.strategy.base.js)
 * Version: 20.2.6
 * Build date: Tue Mar 16 2021
 *
 * Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
exports.default = void 0;
var _type = require("../../../core/utils/type");
var COLLECTOR_DEFAULT_WIDTH = 24;
var COLLECTOR_DEFAULT_OFFSET = 3;
var COMPACT_THEME_APPOINTMENT_DEFAULT_OFFSET = 22;
var APPOINTMENT_MIN_COUNT = 1;
var APPOINTMENT_DEFAULT_WIDTH = 40;
var COLLECTOR_WIDTH_IN_PERCENTS = 75;
var APPOINTMENT_INCREASED_WIDTH = 50;
var AppointmentPositioningStrategy = function() {
    function AppointmentPositioningStrategy(renderingStrategy) {
        this._renderingStrategy = renderingStrategy
    }
    var _proto = AppointmentPositioningStrategy.prototype;
    _proto.getRenderingStrategy = function() {
        return this._renderingStrategy
    };
    _proto.getDropDownAppointmentWidth = function(intervalCount, isAllDay) {
        if (isAllDay || !(0, _type.isDefined)(isAllDay)) {
            return COLLECTOR_WIDTH_IN_PERCENTS * this.getRenderingStrategy().getDefaultCellWidth() / 100
        } else {
            return COLLECTOR_DEFAULT_WIDTH
        }
    };
    _proto.getCollectorTopOffset = function() {
        return COLLECTOR_DEFAULT_OFFSET
    };
    _proto.getCollectorLeftOffset = function() {
        return COLLECTOR_DEFAULT_OFFSET
    };
    _proto.getAppointmentDefaultOffset = function() {
        if (this.getRenderingStrategy()._isCompactTheme()) {
            return COMPACT_THEME_APPOINTMENT_DEFAULT_OFFSET
        }
        return this.getRenderingStrategy().instance.option("_appointmentOffset")
    };
    _proto.getDynamicAppointmentCountPerCell = function() {
        var renderingStrategy = this.getRenderingStrategy();
        var cellHeight = renderingStrategy.instance.fire("getCellHeight");
        var allDayCount = Math.floor((cellHeight - renderingStrategy._getAppointmentDefaultOffset()) / renderingStrategy._getAppointmentDefaultHeight()) || this._getAppointmentMinCount();
        if (renderingStrategy.hasAllDayAppointments()) {
            return {
                allDay: "vertical" === renderingStrategy.instance._groupOrientation ? allDayCount : renderingStrategy.instance.option("_appointmentCountPerCell"),
                simple: this._calculateDynamicAppointmentCountPerCell() || this._getAppointmentMinCount()
            }
        } else {
            return allDayCount
        }
    };
    _proto.getDropDownAppointmentHeight = function() {
        return
    };
    _proto._getAppointmentMinCount = function() {
        return APPOINTMENT_MIN_COUNT
    };
    _proto._calculateDynamicAppointmentCountPerCell = function() {
        return Math.floor(this.getRenderingStrategy()._getAppointmentMaxWidth() / APPOINTMENT_INCREASED_WIDTH)
    };
    _proto._getAppointmentDefaultWidth = function() {
        return APPOINTMENT_DEFAULT_WIDTH
    };
    return AppointmentPositioningStrategy
}();
var _default = AppointmentPositioningStrategy;
exports.default = _default;
module.exports = exports.default;
