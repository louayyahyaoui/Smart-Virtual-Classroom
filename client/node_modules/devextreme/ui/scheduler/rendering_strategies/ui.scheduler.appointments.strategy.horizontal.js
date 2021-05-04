/**
 * DevExtreme (ui/scheduler/rendering_strategies/ui.scheduler.appointments.strategy.horizontal.js)
 * Version: 20.2.6
 * Build date: Tue Mar 16 2021
 *
 * Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
exports.default = void 0;
var _uiSchedulerAppointmentsStrategy = _interopRequireDefault(require("./ui.scheduler.appointments.strategy.base"));
var _date = _interopRequireDefault(require("../../../core/utils/date"));

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        "default": obj
    }
}

function _inheritsLoose(subClass, superClass) {
    subClass.prototype = Object.create(superClass.prototype);
    subClass.prototype.constructor = subClass;
    _setPrototypeOf(subClass, superClass)
}

function _setPrototypeOf(o, p) {
    _setPrototypeOf = Object.setPrototypeOf || function(o, p) {
        o.__proto__ = p;
        return o
    };
    return _setPrototypeOf(o, p)
}
var DEFAULT_APPOINTMENT_HEIGHT = 60;
var MIN_APPOINTMENT_HEIGHT = 35;
var DROP_DOWN_BUTTON_OFFSET = 2;
var toMs = _date.default.dateToMilliseconds;
var HorizontalRenderingStrategy = function(_BaseAppointmentsStra) {
    _inheritsLoose(HorizontalRenderingStrategy, _BaseAppointmentsStra);

    function HorizontalRenderingStrategy() {
        return _BaseAppointmentsStra.apply(this, arguments) || this
    }
    var _proto = HorizontalRenderingStrategy.prototype;
    _proto._needVerifyItemSize = function() {
        return true
    };
    _proto.calculateAppointmentWidth = function(appointment, position) {
        var cellWidth = this.getDefaultCellWidth() || this.getAppointmentMinSize();
        var allDay = this.instance.fire("getField", "allDay", appointment);
        var startDate = position.info.appointment.startDate;
        var endDate = this.normalizeEndDateByViewEnd(appointment, position.info.appointment.endDate);
        var appointmentDuration = this._getAppointmentDurationInMs(startDate, endDate, allDay);
        appointmentDuration = this._adjustDurationByDaylightDiff(appointmentDuration, startDate, endDate);
        var cellDuration = this.instance.getAppointmentDurationInMinutes() * toMs("minute");
        var durationInCells = appointmentDuration / cellDuration;
        var width = this.cropAppointmentWidth(durationInCells * cellWidth, cellWidth);
        return width
    };
    _proto._needAdjustDuration = function(diff) {
        return diff < 0
    };
    _proto.getAppointmentGeometry = function(coordinates) {
        var result = this._customizeAppointmentGeometry(coordinates);
        return _BaseAppointmentsStra.prototype.getAppointmentGeometry.call(this, result)
    };
    _proto._customizeAppointmentGeometry = function(coordinates) {
        var config = this._calculateGeometryConfig(coordinates);
        return this._customizeCoordinates(coordinates, config.height, config.appointmentCountPerCell, config.offset)
    };
    _proto._getOffsets = function() {
        return {
            unlimited: 0,
            auto: 0
        }
    };
    _proto._getCompactLeftCoordinate = function(itemLeft, index) {
        var cellWidth = this.getDefaultCellWidth() || this.getAppointmentMinSize();
        return itemLeft + cellWidth * index
    };
    _proto._getMaxHeight = function() {
        return this.getDefaultCellHeight() || this.getAppointmentMinSize()
    };
    _proto._getAppointmentCount = function(overlappingMode, coordinates) {
        return this._getMaxAppointmentCountPerCellByType(false)
    };
    _proto._getAppointmentDefaultHeight = function() {
        return DEFAULT_APPOINTMENT_HEIGHT
    };
    _proto._getAppointmentMinHeight = function() {
        return MIN_APPOINTMENT_HEIGHT
    };
    _proto._sortCondition = function(a, b) {
        return this._columnCondition(a, b)
    };
    _proto._getOrientation = function() {
        return ["left", "right", "top"]
    };
    _proto._getMaxAppointmentWidth = function(startDate) {
        return this.instance.fire("getMaxAppointmentWidth", {
            date: startDate
        })
    };
    _proto.getDropDownAppointmentWidth = function() {
        return this.getDefaultCellWidth() - 2 * DROP_DOWN_BUTTON_OFFSET
    };
    _proto.getDeltaTime = function(args, initialSize) {
        var deltaTime = 0;
        var deltaWidth = args.width - initialSize.width;
        deltaTime = toMs("minute") * Math.round(deltaWidth / this.getDefaultCellWidth() * this.instance.getAppointmentDurationInMinutes());
        return deltaTime
    };
    _proto.isAllDay = function(appointmentData) {
        return this.instance.fire("getField", "allDay", appointmentData)
    };
    _proto.needSeparateAppointment = function() {
        return this.instance.fire("isGroupedByDate")
    };
    return HorizontalRenderingStrategy
}(_uiSchedulerAppointmentsStrategy.default);
var _default = HorizontalRenderingStrategy;
exports.default = _default;
module.exports = exports.default;
