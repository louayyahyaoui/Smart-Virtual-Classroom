/**
 * DevExtreme (ui/scheduler/rendering_strategies/ui.scheduler.appointments.strategy.agenda.js)
 * Version: 20.2.6
 * Build date: Tue Mar 16 2021
 *
 * Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
exports.default = void 0;
var _date = _interopRequireDefault(require("../../../core/utils/date"));
var _iterator = require("../../../core/utils/iterator");
var _array = require("../../../core/utils/array");
var _uiSchedulerAppointmentsStrategy = _interopRequireDefault(require("./ui.scheduler.appointments.strategy.base"));

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
var AgendaRenderingStrategy = function(_BaseAppointmentsStra) {
    _inheritsLoose(AgendaRenderingStrategy, _BaseAppointmentsStra);

    function AgendaRenderingStrategy() {
        return _BaseAppointmentsStra.apply(this, arguments) || this
    }
    var _proto = AgendaRenderingStrategy.prototype;
    _proto.getAppointmentMinSize = function() {};
    _proto.getDeltaTime = function() {};
    _proto.keepAppointmentSettings = function() {
        return true
    };
    _proto.getAppointmentGeometry = function(geometry) {
        return geometry
    };
    _proto.createTaskPositionMap = function(appointments) {
        var height;
        var appointmentsByResources;
        if (appointments.length) {
            height = this.instance.fire("getAgendaVerticalStepHeight");
            appointmentsByResources = this.instance.fire("groupAppointmentsByResources", appointments);
            var groupedAppts = [];
            (0, _iterator.each)(appointmentsByResources, function(i, appts) {
                var additionalAppointments = [];
                var recurrentIndexes = [];
                (0, _iterator.each)(appts, function(index, appointment) {
                    var recurrenceBatch = this.instance.getAppointmentsInstance()._processRecurrenceAppointment(appointment, index);
                    var appointmentBatch = null;
                    if (!recurrenceBatch.indexes.length) {
                        appointmentBatch = {
                            parts: []
                        };
                        appointmentBatch = this.instance.getAppointmentsInstance()._processLongAppointment(appointment);
                        additionalAppointments = additionalAppointments.concat(appointmentBatch.parts)
                    }
                    additionalAppointments = additionalAppointments.concat(recurrenceBatch.parts);
                    recurrentIndexes = recurrentIndexes.concat(recurrenceBatch.indexes)
                }.bind(this));
                this.instance.getAppointmentsInstance()._reduceRecurrenceAppointments(recurrentIndexes, appts);
                this.instance.getAppointmentsInstance()._combineAppointments(appts, additionalAppointments);
                groupedAppts = groupedAppts.concat(appts)
            }.bind(this));
            Array.prototype.splice.apply(appointments, [0, appointments.length].concat(groupedAppts))
        }
        var result = [];
        var sortedIndex = 0;
        appointments.forEach(function(appt, index) {
            result.push([{
                height: height,
                width: "100%",
                sortedIndex: sortedIndex++,
                groupIndex: this._calculateGroupIndex(index, appointmentsByResources)
            }])
        }.bind(this));
        return result
    };
    _proto._calculateGroupIndex = function(apptIndex, appointmentsByResources) {
        var resultInd;
        var counter = 0;
        for (var i in appointmentsByResources) {
            var countApptInGroup = appointmentsByResources[i].length;
            if (apptIndex >= counter && apptIndex < counter + countApptInGroup) {
                resultInd = Number(i);
                break
            }
            counter += countApptInGroup
        }
        return resultInd
    };
    _proto._getDeltaWidth = function() {};
    _proto._getAppointmentMaxWidth = function() {
        return this.getDefaultCellWidth()
    };
    _proto._needVerifyItemSize = function() {
        return false
    };
    _proto._isRtl = function() {
        return this.instance.option("rtlEnabled")
    };
    _proto._getAppointmentParts = function() {};
    _proto._reduceMultiWeekAppointment = function() {};
    _proto.calculateAppointmentHeight = function() {
        return 0
    };
    _proto.calculateAppointmentWidth = function() {
        return 0
    };
    _proto.isAppointmentGreaterThan = function() {};
    _proto.isAllDay = function() {
        return false
    };
    _proto._sortCondition = function() {};
    _proto._rowCondition = function() {};
    _proto._columnCondition = function() {};
    _proto._findIndexByKey = function() {};
    _proto._markAppointmentAsVirtual = function() {};
    _proto.getDropDownAppointmentWidth = function() {};
    _proto.getDefaultCellWidth = function() {
        return this._defaultWidth
    };
    _proto.getCollectorLeftOffset = function() {};
    _proto.getCollectorTopOffset = function() {};
    _proto.calculateRows = function(appointments, agendaDuration, currentDate, needClearSettings) {
        this._rows = [];
        var groupedAppointments = this.instance.fire("groupAppointmentsByResources", appointments);
        currentDate = _date.default.trimTime(new Date(currentDate));
        (0, _iterator.each)(groupedAppointments, function(groupIndex, currentAppointments) {
            var groupResult = [];
            var appts = {
                indexes: [],
                parts: []
            };
            if (!currentAppointments.length) {
                this._rows.push([]);
                return true
            }(0, _iterator.each)(currentAppointments, function(index, appointment) {
                var startDate = this.instance.fire("getField", "startDate", appointment);
                var endDate = this.instance.fire("getField", "endDate", appointment);
                this.instance.fire("replaceWrongEndDate", appointment, startDate, endDate);
                needClearSettings && delete appointment.settings;
                var result = this.instance.getAppointmentsInstance()._processRecurrenceAppointment(appointment, index, false);
                appts.parts = appts.parts.concat(result.parts);
                appts.indexes = appts.indexes.concat(result.indexes)
            }.bind(this));
            this.instance.getAppointmentsInstance()._reduceRecurrenceAppointments(appts.indexes, currentAppointments);
            (0, _array.merge)(currentAppointments, appts.parts);
            var appointmentCount = currentAppointments.length;
            for (var i = 0; i < agendaDuration; i++) {
                var day = new Date(currentDate);
                day.setMilliseconds(day.getMilliseconds() + 864e5 * i);
                if (void 0 === groupResult[i]) {
                    groupResult[i] = 0
                }
                for (var j = 0; j < appointmentCount; j++) {
                    var appointmentData = currentAppointments[j].settings || currentAppointments[j];
                    var appointmentIsLong = this.instance.fire("appointmentTakesSeveralDays", currentAppointments[j]);
                    var appointmentIsRecurrence = this.instance.fire("getField", "recurrenceRule", currentAppointments[j]);
                    if (this.instance.fire("dayHasAppointment", day, appointmentData, true) || !appointmentIsRecurrence && appointmentIsLong && this.instance.fire("dayHasAppointment", day, currentAppointments[j], true)) {
                        groupResult[i] += 1
                    }
                }
            }
            this._rows.push(groupResult)
        }.bind(this));
        return this._rows
    };
    _proto._iterateRow = function(row, obj, index) {
        for (var i = 0; i < row.length; i++) {
            obj.counter = obj.counter + row[i];
            if (obj.counter >= index) {
                obj.indexInRow = i;
                break
            }
        }
    };
    _proto.getDateByIndex = function(index, rows, startViewDate) {
        var obj = {
            counter: 0,
            indexInRow: 0
        };
        index++;
        for (var i = 0; i < rows.length; i++) {
            this._iterateRow(rows[i], obj, index);
            if (obj.indexInRow) {
                break
            }
        }
        return new Date(new Date(startViewDate).setDate(startViewDate.getDate() + obj.indexInRow))
    };
    _proto.getAppointmentDataCalculator = function() {
        return function($appointment, originalStartDate) {
            var apptIndex = $appointment.index();
            var startViewDate = this.instance.getStartViewDate();
            var calculatedStartDate = this.getDateByIndex(apptIndex, this._rows, startViewDate);
            var wrappedOriginalStartDate = new Date(originalStartDate);
            return {
                startDate: new Date(calculatedStartDate.setHours(wrappedOriginalStartDate.getHours(), wrappedOriginalStartDate.getMinutes(), wrappedOriginalStartDate.getSeconds(), wrappedOriginalStartDate.getMilliseconds()))
            }
        }.bind(this)
    };
    return AgendaRenderingStrategy
}(_uiSchedulerAppointmentsStrategy.default);
var _default = AgendaRenderingStrategy;
exports.default = _default;
module.exports = exports.default;
