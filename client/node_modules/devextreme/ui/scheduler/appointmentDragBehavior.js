/**
 * DevExtreme (ui/scheduler/appointmentDragBehavior.js)
 * Version: 20.2.6
 * Build date: Tue Mar 16 2021
 *
 * Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
exports.default = void 0;
var _renderer = _interopRequireDefault(require("../../core/renderer"));
var _draggable = _interopRequireDefault(require("../draggable"));
var _extend = require("../../core/utils/extend");
var _constants = require("./constants");

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        "default": obj
    }
}
var APPOINTMENT_ITEM_CLASS = "dx-scheduler-appointment";
var AppointmentDragBehavior = function() {
    function AppointmentDragBehavior(scheduler) {
        this.scheduler = scheduler;
        this.appointments = scheduler._appointments;
        this.initialPosition = {
            left: 0,
            top: 0
        };
        this.appointmentInfo = null
    }
    var _proto = AppointmentDragBehavior.prototype;
    _proto.isAllDay = function(appointment) {
        return appointment.data("dxAppointmentSettings").allDay
    };
    _proto.onDragStart = function(e) {
        var itemSettings = e.itemSettings,
            itemData = e.itemData,
            initialPosition = e.initialPosition;
        this.initialPosition = initialPosition;
        this.appointmentInfo = {
            appointment: itemData,
            settings: itemSettings
        };
        this.appointments.notifyObserver("hideAppointmentTooltip")
    };
    _proto.onDragMove = function(e) {
        if (e.fromComponent !== e.toComponent) {
            this.appointments.notifyObserver("removeDroppableCellClass")
        }
    };
    _proto.getAppointmentElement = function(e) {
        var itemElement = e.event.data && e.event.data.itemElement || e.itemElement;
        return (0, _renderer.default)(itemElement)
    };
    _proto.onDragEnd = function(e) {
        var element = this.getAppointmentElement(e);
        var rawAppointment = this.appointments._getItemData(element);
        var container = this.appointments._getAppointmentContainer(this.isAllDay(element));
        container.append(element);
        this.appointments.notifyObserver("updateAppointmentAfterDrag", {
            event: e,
            element: element,
            rawAppointment: rawAppointment,
            coordinates: this.initialPosition
        })
    };
    _proto.getItemData = function(appointmentElement) {
        var dataFromTooltip = (0, _renderer.default)(appointmentElement).data(_constants.LIST_ITEM_DATA_KEY);
        var itemDataFromTooltip = null === dataFromTooltip || void 0 === dataFromTooltip ? void 0 : dataFromTooltip.appointment;
        var itemDataFromGrid = this.appointments._getItemData(appointmentElement);
        return itemDataFromTooltip || itemDataFromGrid
    };
    _proto.getItemSettings = function(appointment) {
        var itemData = (0, _renderer.default)(appointment).data(_constants.LIST_ITEM_DATA_KEY);
        return itemData && itemData.settings || []
    };
    _proto.createDragStartHandler = function(options, appointmentDragging) {
        var _this = this;
        return function(e) {
            e.itemData = _this.getItemData(e.itemElement);
            e.itemSettings = _this.getItemSettings(e.itemElement);
            appointmentDragging.onDragStart && appointmentDragging.onDragStart(e);
            if (!e.cancel) {
                options.onDragStart(e)
            }
        }
    };
    _proto.createDragMoveHandler = function(options, appointmentDragging) {
        return function(e) {
            appointmentDragging.onDragMove && appointmentDragging.onDragMove(e);
            if (!e.cancel) {
                options.onDragMove(e)
            }
        }
    };
    _proto.createDragEndHandler = function(options, appointmentDragging) {
        var _this2 = this;
        return function(e) {
            _this2.appointmentInfo = null;
            appointmentDragging.onDragEnd && appointmentDragging.onDragEnd(e);
            if (!e.cancel) {
                options.onDragEnd(e);
                if (e.fromComponent !== e.toComponent) {
                    appointmentDragging.onRemove && appointmentDragging.onRemove(e)
                }
            }
        }
    };
    _proto.createDropHandler = function(appointmentDragging) {
        var _this3 = this;
        return function(e) {
            var updatedData = _this3.appointments.invoke("getUpdatedData", e.itemData);
            e.itemData = (0, _extend.extend)({}, e.itemData, updatedData);
            if (e.fromComponent !== e.toComponent) {
                appointmentDragging.onAdd && appointmentDragging.onAdd(e)
            }
        }
    };
    _proto.addTo = function(container, config) {
        var appointmentDragging = this.scheduler.option("appointmentDragging") || {};
        var options = (0, _extend.extend)({
            component: this.scheduler,
            contentTemplate: null,
            filter: ".".concat(APPOINTMENT_ITEM_CLASS),
            immediate: false,
            onDragStart: this.onDragStart.bind(this),
            onDragMove: this.onDragMove.bind(this),
            onDragEnd: this.onDragEnd.bind(this)
        }, config);
        this.appointments._createComponent(container, _draggable.default, (0, _extend.extend)({}, options, appointmentDragging, {
            onDragStart: this.createDragStartHandler(options, appointmentDragging),
            onDragMove: this.createDragMoveHandler(options, appointmentDragging),
            onDragEnd: this.createDragEndHandler(options, appointmentDragging),
            onDrop: this.createDropHandler(appointmentDragging)
        }))
    };
    _proto.updateDragSource = function(appointment, settings) {
        var appointmentInfo = this.appointmentInfo;
        if (appointmentInfo || appointment) {
            var currentAppointment = appointment || appointmentInfo.appointment;
            var currentSettings = settings || appointmentInfo.settings;
            this.appointments._setDragSourceAppointment(currentAppointment, currentSettings)
        }
    };
    return AppointmentDragBehavior
}();
exports.default = AppointmentDragBehavior;
module.exports = exports.default;
