/**
 * DevExtreme (ui/scheduler/appointmentSettingsGenerator.js)
 * Version: 20.2.6
 * Build date: Tue Mar 16 2021
 *
 * Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
exports.AppointmentSettingsGeneratorVirtualStrategy = exports.AppointmentSettingsGeneratorBaseStrategy = exports.AppointmentSettingsGenerator = void 0;
var _date = _interopRequireDefault(require("../../core/utils/date"));
var _type = require("../../core/utils/type");
var _extend = require("../../core/utils/extend");
var _recurrence = require("./recurrence");
var _utilsTimeZone = _interopRequireDefault(require("./utils.timeZone.js"));

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        "default": obj
    }
}

function _toConsumableArray(arr) {
    return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread()
}

function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
}

function _iterableToArray(iter) {
    if ("undefined" !== typeof Symbol && Symbol.iterator in Object(iter)) {
        return Array.from(iter)
    }
}

function _arrayWithoutHoles(arr) {
    if (Array.isArray(arr)) {
        return _arrayLikeToArray(arr)
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

function _slicedToArray(arr, i) {
    return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest()
}

function _nonIterableRest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
}

function _unsupportedIterableToArray(o, minLen) {
    if (!o) {
        return
    }
    if ("string" === typeof o) {
        return _arrayLikeToArray(o, minLen)
    }
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if ("Object" === n && o.constructor) {
        n = o.constructor.name
    }
    if ("Map" === n || "Set" === n) {
        return Array.from(o)
    }
    if ("Arguments" === n || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) {
        return _arrayLikeToArray(o, minLen)
    }
}

function _arrayLikeToArray(arr, len) {
    if (null == len || len > arr.length) {
        len = arr.length
    }
    for (var i = 0, arr2 = new Array(len); i < len; i++) {
        arr2[i] = arr[i]
    }
    return arr2
}

function _iterableToArrayLimit(arr, i) {
    if ("undefined" === typeof Symbol || !(Symbol.iterator in Object(arr))) {
        return
    }
    var _arr = [];
    var _n = true;
    var _d = false;
    var _e = void 0;
    try {
        for (var _s, _i = arr[Symbol.iterator](); !(_n = (_s = _i.next()).done); _n = true) {
            _arr.push(_s.value);
            if (i && _arr.length === i) {
                break
            }
        }
    } catch (err) {
        _d = true;
        _e = err
    } finally {
        try {
            if (!_n && null != _i.return) {
                _i.return()
            }
        } finally {
            if (_d) {
                throw _e
            }
        }
    }
    return _arr
}

function _arrayWithHoles(arr) {
    if (Array.isArray(arr)) {
        return arr
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
var toMs = _date.default.dateToMilliseconds;
var AppointmentSettingsGenerator = function() {
    function AppointmentSettingsGenerator(scheduler) {
        this.scheduler = scheduler;
        this.settingsStrategy = this.scheduler.isVirtualScrolling() ? new AppointmentSettingsGeneratorVirtualStrategy(this.scheduler) : new AppointmentSettingsGeneratorBaseStrategy(this.scheduler)
    }
    var _proto = AppointmentSettingsGenerator.prototype;
    _proto.create = function(rawAppointment) {
        return this.settingsStrategy.create(rawAppointment)
    };
    return AppointmentSettingsGenerator
}();
exports.AppointmentSettingsGenerator = AppointmentSettingsGenerator;
var AppointmentSettingsGeneratorBaseStrategy = function() {
    function AppointmentSettingsGeneratorBaseStrategy(scheduler) {
        this.scheduler = scheduler
    }
    var _proto2 = AppointmentSettingsGeneratorBaseStrategy.prototype;
    _proto2.create = function(rawAppointment) {
        var scheduler = this.scheduler;
        var appointment = scheduler.createAppointmentAdapter(rawAppointment);
        var itemResources = scheduler._resourcesManager.getResourcesFromItem(rawAppointment);
        var isAllDay = this._isAllDayAppointment(rawAppointment);
        var appointmentList = this._createAppointments(appointment, itemResources);
        if (this._canProcessNotNativeTimezoneDates(appointment)) {
            appointmentList = this._getProcessedNotNativeTimezoneDates(appointmentList, appointment)
        }
        var gridAppointmentList = this._createGridAppointmentList(appointmentList, appointment);
        gridAppointmentList = this._cropAppointmentsByStartDayHour(gridAppointmentList, rawAppointment, isAllDay);
        gridAppointmentList = this._getProcessedLongAppointmentsIfRequired(gridAppointmentList, appointment);
        var appointmentInfos = this._createAppointmentInfos(gridAppointmentList, itemResources, isAllDay, appointment.isRecurrent);
        return appointmentInfos
    };
    _proto2._isAllDayAppointment = function(rawAppointment) {
        return this.scheduler.appointmentTakesAllDay(rawAppointment) && this.workspace.supportAllDayRow()
    };
    _proto2._createAppointments = function(appointment, resources) {
        var appointments = this._createRecurrenceAppointments(appointment, resources);
        if (!appointment.isRecurrent && 0 === appointments.length) {
            appointments.push({
                startDate: appointment.startDate,
                endDate: appointment.endDate
            })
        }
        appointments = appointments.map(function(item) {
            var startDate = item.startDate,
                endDate = item.endDate;
            var endTime = null === endDate || void 0 === endDate ? void 0 : endDate.getTime();
            if (startDate.getTime() === endTime) {
                endDate.setTime(endTime + toMs("minute"))
            }
            return item
        });
        return appointments
    };
    _proto2._canProcessNotNativeTimezoneDates = function(appointment) {
        var timeZoneName = this.scheduler.option("timeZone");
        var isTimeZoneSet = !(0, _type.isEmptyObject)(timeZoneName);
        if (!isTimeZoneSet) {
            return false
        }
        if (!appointment.isRecurrent) {
            return false
        }
        return !_utilsTimeZone.default.isEqualLocalTimeZone(timeZoneName, appointment.startDate)
    };
    _proto2._getProcessedNotNativeDateIfCrossDST = function(date, offset) {
        if (offset < 0) {
            var newDate = new Date(date);
            var newDateMinusOneHour = new Date(newDate);
            newDateMinusOneHour.setHours(newDateMinusOneHour.getHours() - 1);
            var newDateOffset = this.timeZoneCalculator.getOffsets(newDate).common;
            var newDateMinusOneHourOffset = this.timeZoneCalculator.getOffsets(newDateMinusOneHour).common;
            if (newDateOffset !== newDateMinusOneHourOffset) {
                return 0
            }
        }
        return offset
    };
    _proto2._getProcessedNotNativeTimezoneDates = function(appointmentList, appointment) {
        var _this = this;
        var startDateRange = appointment.startDate;
        var endDateRange = appointmentList[appointmentList.length - 1].endDate;
        var startDateRangeOffset = this.timeZoneCalculator.getOffsets(startDateRange).common;
        var endDateRangeOffset = this.timeZoneCalculator.getOffsets(endDateRange).common;
        var isChangeOffsetInRange = startDateRangeOffset !== endDateRangeOffset;
        if (isChangeOffsetInRange) {
            return appointmentList.map(function(a) {
                var diffStartDateOffset = _this.timeZoneCalculator.getOffsets(appointment.startDate).common - _this.timeZoneCalculator.getOffsets(a.startDate).common;
                var diffEndDateOffset = _this.timeZoneCalculator.getOffsets(appointment.endDate).common - _this.timeZoneCalculator.getOffsets(a.endDate).common;
                diffStartDateOffset = _this._getProcessedNotNativeDateIfCrossDST(a.startDate, diffStartDateOffset);
                diffEndDateOffset = _this._getProcessedNotNativeDateIfCrossDST(a.endDate, diffEndDateOffset);
                var newStartDate = new Date(a.startDate.getTime() + diffStartDateOffset * toMs("hour"));
                var newEndDate = new Date(a.endDate.getTime() + diffEndDateOffset * toMs("hour"));
                var testNewStartDate = _this.timeZoneCalculator.createDate(newStartDate, {
                    path: "toGrid"
                });
                var testNewEndDate = _this.timeZoneCalculator.createDate(newEndDate, {
                    path: "toGrid"
                });
                if (appointment.duration > testNewEndDate.getTime() - testNewStartDate.getTime()) {
                    newEndDate = new Date(newStartDate.getTime() + appointment.duration)
                }
                return {
                    startDate: newStartDate,
                    endDate: newEndDate
                }
            })
        }
        return appointmentList
    };
    _proto2._getProcessedLongAppointmentsIfRequired = function(gridAppointmentList, appointment) {
        var _this2 = this;
        var rawAppointment = appointment.source();
        var allDay = this.scheduler.appointmentTakesAllDay(rawAppointment);
        var dateRange = this.workspace.getDateRange();
        var renderingStrategy = this.scheduler.getLayoutManager().getRenderingStrategyInstance();
        if (renderingStrategy.needSeparateAppointment(allDay)) {
            var longStartDateParts = [];
            var resultDates = [];
            gridAppointmentList.forEach(function(gridAppointment) {
                var maxDate = new Date(dateRange[1]);
                var endDateOfPart = renderingStrategy.normalizeEndDateByViewEnd(rawAppointment, gridAppointment.endDate);
                longStartDateParts = _date.default.getDatesOfInterval(gridAppointment.startDate, endDateOfPart, {
                    milliseconds: _this2.scheduler.getWorkSpace().getIntervalDuration(allDay)
                });
                var list = longStartDateParts.filter(function(startDatePart) {
                    return new Date(startDatePart) < maxDate
                }).map(function(date) {
                    return {
                        startDate: date,
                        endDate: new Date(new Date(date).setMilliseconds(appointment.duration)),
                        source: gridAppointment.source
                    }
                });
                resultDates = resultDates.concat(list)
            });
            gridAppointmentList = resultDates
        }
        return gridAppointmentList
    };
    _proto2._createGridAppointmentList = function(appointmentList, appointment) {
        var _this3 = this;
        return appointmentList.map(function(source) {
            var offsetDifference = appointment.startDate.getTimezoneOffset() - source.startDate.getTimezoneOffset();
            if (0 !== offsetDifference && _this3._canProcessNotNativeTimezoneDates(appointment)) {
                source.startDate = new Date(source.startDate.getTime() + offsetDifference * toMs("minute"));
                source.endDate = new Date(source.endDate.getTime() + offsetDifference * toMs("minute"))
            }
            var startDate = _this3.timeZoneCalculator.createDate(source.startDate, {
                path: "toGrid"
            });
            var endDate = _this3.timeZoneCalculator.createDate(source.endDate, {
                path: "toGrid"
            });
            return {
                startDate: startDate,
                endDate: endDate,
                source: source
            }
        })
    };
    _proto2._createExtremeRecurrenceDates = function(rawAppointment) {
        var dateRange = this.workspace.getDateRange();
        var startViewDate = this.scheduler.appointmentTakesAllDay(rawAppointment) ? _date.default.trimTime(dateRange[0]) : dateRange[0];
        var commonTimeZone = this.scheduler.option("timeZone");
        var minRecurrenceDate = commonTimeZone ? this.timeZoneCalculator.createDate(startViewDate, {
            path: "fromGrid"
        }) : startViewDate;
        var maxRecurrenceDate = commonTimeZone ? this.timeZoneCalculator.createDate(dateRange[1], {
            path: "fromGrid"
        }) : dateRange[1];
        return [minRecurrenceDate, maxRecurrenceDate]
    };
    _proto2._createRecurrenceOptions = function(appointment, groupIndex) {
        var _this4 = this;
        var _this$_createExtremeR = this._createExtremeRecurrenceDates(appointment.source(), groupIndex),
            _this$_createExtremeR2 = _slicedToArray(_this$_createExtremeR, 2),
            minRecurrenceDate = _this$_createExtremeR2[0],
            maxRecurrenceDate = _this$_createExtremeR2[1];
        return {
            rule: appointment.recurrenceRule,
            exception: appointment.recurrenceException,
            min: minRecurrenceDate,
            max: maxRecurrenceDate,
            firstDayOfWeek: this.scheduler.getFirstDayOfWeek(),
            start: appointment.startDate,
            end: appointment.endDate,
            getPostProcessedException: function(date) {
                var timeZoneName = _this4.scheduler.option("timeZone");
                if ((0, _type.isEmptyObject)(timeZoneName) || _utilsTimeZone.default.isEqualLocalTimeZone(timeZoneName, date)) {
                    return date
                }
                var appointmentOffset = _this4.timeZoneCalculator.getOffsets(appointment.startDate).common;
                var exceptionAppointmentOffset = _this4.timeZoneCalculator.getOffsets(date).common;
                var diff = appointmentOffset - exceptionAppointmentOffset;
                diff = _this4._getProcessedNotNativeDateIfCrossDST(date, diff);
                return new Date(date.getTime() - diff * _date.default.dateToMilliseconds("hour"))
            }
        }
    };
    _proto2._createRecurrenceAppointments = function(appointment, resources) {
        var duration = appointment.duration;
        var option = this._createRecurrenceOptions(appointment);
        var generatedStartDates = (0, _recurrence.getRecurrenceProcessor)().generateDates(option);
        return generatedStartDates.map(function(date) {
            var utcDate = _utilsTimeZone.default.createUTCDateWithLocalOffset(date);
            utcDate.setTime(utcDate.getTime() + duration);
            var endDate = _utilsTimeZone.default.createDateFromUTCWithLocalOffset(utcDate);
            return {
                startDate: new Date(date),
                endDate: endDate
            }
        })
    };
    _proto2._getGroupIndices = function(resources) {
        var workspace = this.scheduler._workSpace;
        return workspace._getGroupIndexes(resources)
    };
    _proto2._cropAppointmentsByStartDayHour = function(appointments, rawAppointment, isAllDay) {
        var _this5 = this;
        return appointments.map(function(appointment) {
            var startDate = new Date(appointment.startDate);
            var firstViewDate = _this5._getAppointmentFirstViewDate(appointment, rawAppointment);
            var startDayHour = _this5._getViewStartDayHour(firstViewDate);
            appointment.startDate = _this5._getAppointmentResultDate({
                appointment: appointment,
                rawAppointment: rawAppointment,
                startDate: startDate,
                startDayHour: startDayHour,
                firstViewDate: firstViewDate
            });
            return appointment
        })
    };
    _proto2._getAppointmentFirstViewDate = function() {
        return this.scheduler.getStartViewDate()
    };
    _proto2._getViewStartDayHour = function() {
        return this.scheduler._getCurrentViewOption("startDayHour")
    };
    _proto2._getAppointmentResultDate = function(options) {
        var appointment = options.appointment,
            rawAppointment = options.rawAppointment,
            startDayHour = options.startDayHour,
            firstViewDate = options.firstViewDate;
        var startDate = options.startDate;
        var resultDate = new Date(appointment.startDate);
        if (this.scheduler.appointmentTakesAllDay(rawAppointment)) {
            resultDate = _date.default.normalizeDate(startDate, firstViewDate)
        } else {
            if (startDate < firstViewDate) {
                startDate = firstViewDate
            }
            resultDate = _date.default.normalizeDate(appointment.startDate, startDate)
        }
        return _date.default.roundDateByStartDayHour(resultDate, startDayHour)
    };
    _proto2._createAppointmentInfos = function(gridAppointments, resources, allDay, recurrent) {
        var _this6 = this;
        var result = [];
        var _loop = function(i) {
            var coordinates = _this6.scheduler._workSpace.getCoordinatesByDateInGroup(gridAppointments[i].startDate, resources, allDay);
            coordinates.forEach(function(coordinate) {
                (0, _extend.extend)(coordinate, {
                    info: {
                        appointment: gridAppointments[i],
                        sourceAppointment: gridAppointments[i].source
                    }
                })
            });
            result = result.concat(coordinates)
        };
        for (var i = 0; i < gridAppointments.length; i++) {
            _loop(i)
        }
        return result
    };
    _createClass(AppointmentSettingsGeneratorBaseStrategy, [{
        key: "timeZoneCalculator",
        get: function() {
            return this.scheduler.timeZoneCalculator
        }
    }, {
        key: "workspace",
        get: function() {
            return this.scheduler.getWorkSpace()
        }
    }, {
        key: "viewDataProvider",
        get: function() {
            return this.workspace.viewDataProvider
        }
    }]);
    return AppointmentSettingsGeneratorBaseStrategy
}();
exports.AppointmentSettingsGeneratorBaseStrategy = AppointmentSettingsGeneratorBaseStrategy;
var AppointmentSettingsGeneratorVirtualStrategy = function(_AppointmentSettingsG) {
    _inheritsLoose(AppointmentSettingsGeneratorVirtualStrategy, _AppointmentSettingsG);

    function AppointmentSettingsGeneratorVirtualStrategy() {
        return _AppointmentSettingsG.apply(this, arguments) || this
    }
    var _proto3 = AppointmentSettingsGeneratorVirtualStrategy.prototype;
    _proto3._createAppointmentInfos = function(gridAppointments, resources, allDay, recurrent) {
        var _this7 = this;
        var appointments = allDay ? gridAppointments : gridAppointments.filter(function(item) {
            var source = item.source,
                startDate = item.startDate,
                endDate = item.endDate;
            var groupIndex = source.groupIndex;
            return _this7.viewDataProvider.isGroupIntersectDateInterval(groupIndex, startDate, endDate)
        });
        if (recurrent && this.isVerticalGrouping) {
            return this._createRecurrentAppointmentInfos(appointments, resources, allDay)
        }
        return _AppointmentSettingsG.prototype._createAppointmentInfos.call(this, appointments, resources, allDay, recurrent)
    };
    _proto3._createRecurrentAppointmentInfos = function(gridAppointments, resources, allDay) {
        var _this8 = this;
        var result = [];
        gridAppointments.forEach(function(appointment) {
            var source = appointment.source;
            var groupIndex = source.groupIndex;
            var coordinate = _this8.workspace.getCoordinatesByDate(appointment.startDate, groupIndex, allDay);
            if (coordinate) {
                (0, _extend.extend)(coordinate, {
                    info: {
                        appointment: appointment,
                        sourceAppointment: source
                    }
                });
                result.push(coordinate)
            }
        });
        return result
    };
    _proto3._cropAppointmentsByStartDayHour = function(appointments, rawAppointment, isAllDay) {
        var _this9 = this;
        return appointments.filter(function(appointment) {
            var firstViewDate = _this9._getAppointmentFirstViewDate(appointment, rawAppointment);
            if (!firstViewDate) {
                return false
            }
            var startDayHour = _this9._getViewStartDayHour(firstViewDate);
            var startDate = new Date(appointment.startDate);
            appointment.startDate = _this9._getAppointmentResultDate({
                appointment: appointment,
                rawAppointment: rawAppointment,
                startDate: startDate,
                startDayHour: startDayHour,
                firstViewDate: firstViewDate
            });
            return !isAllDay ? appointment.endDate > appointment.startDate : true
        })
    };
    _proto3._createRecurrenceAppointments = function(appointment, resources) {
        var _this10 = this;
        var duration = appointment.duration;
        var result = [];
        var groupIndices = this.isVerticalGrouping && this.workspace._getGroupCount() ? this._getGroupIndices(resources) : [0];
        groupIndices.forEach(function(groupIndex) {
            var option = _this10._createRecurrenceOptions(appointment, groupIndex);
            var generatedStartDates = (0, _recurrence.getRecurrenceProcessor)().generateDates(option);
            var recurrentInfo = generatedStartDates.map(function(date) {
                var startDate = new Date(date);
                var utcDate = _utilsTimeZone.default.createUTCDateWithLocalOffset(date);
                utcDate.setTime(utcDate.getTime() + duration);
                var endDate = _utilsTimeZone.default.createDateFromUTCWithLocalOffset(utcDate);
                return {
                    startDate: startDate,
                    endDate: endDate,
                    groupIndex: groupIndex
                }
            });
            result.push.apply(result, _toConsumableArray(recurrentInfo))
        });
        return result
    };
    _proto3._getViewStartDayHour = function(firstViewDate) {
        return firstViewDate.getHours()
    };
    _proto3._getAppointmentFirstViewDate = function(appointment, rawAppointment) {
        var _this$scheduler$getWo = this.scheduler.getWorkSpace(),
            viewDataProvider = _this$scheduler$getWo.viewDataProvider;
        var groupIndex = appointment.source.groupIndex;
        var startDate = appointment.startDate,
            endDate = appointment.endDate;
        var isAllDay = this._isAllDayAppointment(rawAppointment);
        return viewDataProvider.findGroupCellStartDate(groupIndex, startDate, endDate, isAllDay)
    };
    _proto3._updateGroupIndices = function(appointments, itemResources) {
        var _this11 = this;
        var groupIndices = this.isVerticalGrouping ? this._getGroupIndices(itemResources) : [0];
        var result = [];
        groupIndices.forEach(function(groupIndex) {
            var groupStartDate = _this11.viewDataProvider.getGroupStartDate(groupIndex);
            if (groupStartDate) {
                appointments.forEach(function(appointment) {
                    var appointmentCopy = (0, _extend.extend)({}, appointment);
                    appointmentCopy.groupIndex = groupIndex;
                    result.push(appointmentCopy)
                })
            }
        });
        return result
    };
    _proto3._getGroupIndices = function(resources) {
        var groupIndices = _AppointmentSettingsG.prototype._getGroupIndices.call(this, resources);
        var _this$scheduler$getWo2 = this.scheduler.getWorkSpace(),
            viewDataProvider = _this$scheduler$getWo2.viewDataProvider;
        var viewDataGroupIndices = viewDataProvider.getGroupIndices();
        var result = groupIndices.filter(function(groupIndex) {
            return viewDataGroupIndices.indexOf(groupIndex) !== -1
        });
        return result
    };
    _proto3._createAppointments = function(appointment, resources) {
        var appointments = _AppointmentSettingsG.prototype._createAppointments.call(this, appointment, resources);
        return !appointment.isRecurrent ? this._updateGroupIndices(appointments, resources) : appointments
    };
    _createClass(AppointmentSettingsGeneratorVirtualStrategy, [{
        key: "viewDataProvider",
        get: function() {
            return this.workspace.viewDataProvider
        }
    }, {
        key: "isVerticalGrouping",
        get: function() {
            return this.workspace._isVerticalGroupedWorkSpace()
        }
    }]);
    return AppointmentSettingsGeneratorVirtualStrategy
}(AppointmentSettingsGeneratorBaseStrategy);
exports.AppointmentSettingsGeneratorVirtualStrategy = AppointmentSettingsGeneratorVirtualStrategy;
