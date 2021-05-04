/**
 * DevExtreme (ui/scheduler/rendering_strategies/ui.scheduler.appointments.strategy.vertical.js)
 * Version: 20.2.6
 * Build date: Tue Mar 16 2021
 *
 * Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
exports.default = void 0;
var _uiSchedulerAppointmentsStrategy = _interopRequireDefault(require("./ui.scheduler.appointments.strategy.base"));
var _extend = require("../../../core/utils/extend");
var _type = require("../../../core/utils/type");
var _date = _interopRequireDefault(require("../../../core/utils/date"));
var _utils = _interopRequireDefault(require("./../utils.timeZone"));

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
var ALLDAY_APPOINTMENT_MIN_VERTICAL_OFFSET = 5;
var ALLDAY_APPOINTMENT_MAX_VERTICAL_OFFSET = 20;
var toMs = _date.default.dateToMilliseconds;
var VerticalRenderingStrategy = function(_BaseAppointmentsStra) {
    _inheritsLoose(VerticalRenderingStrategy, _BaseAppointmentsStra);

    function VerticalRenderingStrategy() {
        return _BaseAppointmentsStra.apply(this, arguments) || this
    }
    var _proto = VerticalRenderingStrategy.prototype;
    _proto.getDeltaTime = function(args, initialSize, appointment) {
        var deltaTime = 0;
        if (this.isAllDay(appointment)) {
            deltaTime = this._getDeltaWidth(args, initialSize) * toMs("day")
        } else {
            var deltaHeight = args.height - initialSize.height;
            deltaTime = toMs("minute") * Math.round(deltaHeight / this.getDefaultCellHeight() * this.instance.getAppointmentDurationInMinutes())
        }
        return deltaTime
    };
    _proto._correctCollectorCoordinatesInAdaptive = function(coordinates, isAllDay) {
        if (isAllDay) {
            _BaseAppointmentsStra.prototype._correctCollectorCoordinatesInAdaptive.call(this, coordinates, isAllDay)
        } else {
            if (0 === this._getMaxAppointmentCountPerCellByType()) {
                var cellHeight = this.getDefaultCellHeight();
                var cellWidth = this.getDefaultCellWidth();
                coordinates.top += (cellHeight - this.getDropDownButtonAdaptiveSize()) / 2;
                coordinates.left += (cellWidth - this.getDropDownButtonAdaptiveSize()) / 2
            }
        }
    };
    _proto.getAppointmentGeometry = function(coordinates) {
        var geometry = null;
        if (coordinates.allDay) {
            geometry = this._getAllDayAppointmentGeometry(coordinates)
        } else {
            geometry = this._isAdaptive() && coordinates.isCompact ? this._getAdaptiveGeometry(coordinates) : this._getVerticalAppointmentGeometry(coordinates)
        }
        return _BaseAppointmentsStra.prototype.getAppointmentGeometry.call(this, geometry)
    };
    _proto._getAdaptiveGeometry = function(coordinates) {
        var config = this._calculateGeometryConfig(coordinates);
        return this._customizeCoordinates(coordinates, config.height, config.appointmentCountPerCell, config.offset)
    };
    _proto._getItemPosition = function(appointment) {
        var adapter = this.instance.createAppointmentAdapter(appointment);
        var allDay = this.isAllDay(appointment);
        var isRecurring = !!adapter.recurrenceRule;
        var appointmentStartDate = adapter.calculateStartDate("toGrid");
        var appointmentEndDate = adapter.calculateEndDate("toGrid");
        var isAppointmentTakesSeveralDays = !_utils.default.isSameAppointmentDates(appointmentStartDate, appointmentEndDate);
        if (allDay) {
            return _BaseAppointmentsStra.prototype._getItemPosition.call(this, appointment)
        }
        var settings = this._getAppointmentCoordinates(appointment);
        var result = [];
        for (var j = 0; j < settings.length; j++) {
            var currentSetting = settings[j];
            var height = this.calculateAppointmentHeight(appointment, currentSetting);
            var width = this.calculateAppointmentWidth(appointment, currentSetting);
            var resultHeight = height;
            var appointmentReduced = null;
            var multiDaysAppointmentParts = [];
            var currentMaxAllowedPosition = currentSetting.vMax;
            if (this._isMultiViewAppointment(currentSetting, height) || isAppointmentTakesSeveralDays && !isRecurring) {
                var reduceHead = _date.default.sameDate(appointmentStartDate, currentSetting.info.appointment.startDate) || isRecurring;
                if (reduceHead) {
                    resultHeight = this._reduceMultiDayAppointment(height, {
                        top: currentSetting.top,
                        bottom: currentMaxAllowedPosition
                    });
                    multiDaysAppointmentParts = this._getAppointmentParts({
                        sourceAppointmentHeight: height,
                        reducedHeight: resultHeight,
                        width: width
                    }, currentSetting)
                }
                var isMultiDay = this._isMultiDayAppointment(currentSetting, height);
                if (isMultiDay) {
                    appointmentReduced = reduceHead ? "head" : "tail"
                }
            }(0, _extend.extend)(currentSetting, {
                height: resultHeight,
                width: width,
                allDay: allDay,
                appointmentReduced: appointmentReduced
            });
            result = this._getAppointmentPartsPosition(multiDaysAppointmentParts, currentSetting, result)
        }
        return result
    };
    _proto._isMultiDayAppointment = function(position, height) {
        if (this.isVirtualScrolling) {
            var maxTop = this._getGroupHeight() - this._getGroupTopOffset(position);
            return height > maxTop
        }
        return false
    };
    _proto._isMultiViewAppointment = function(position, height) {
        return height > position.vMax - position.top
    };
    _proto._reduceMultiDayAppointment = function(sourceAppointmentHeight, bound) {
        sourceAppointmentHeight = bound.bottom - Math.floor(bound.top);
        return sourceAppointmentHeight
    };
    _proto._getGroupHeight = function() {
        var workspace = this.instance.getWorkSpace();
        return workspace.getCellHeight() * workspace._getRowCount()
    };
    _proto._getGroupTopOffset = function(appointmentSettings) {
        var groupTop = Math.max(0, this.instance.fire("getGroupTop", appointmentSettings.groupIndex));
        var allDayPanelOffset = this.instance.fire("getOffsetByAllDayPanel", appointmentSettings.groupIndex);
        var appointmentGroupTopOffset = appointmentSettings.top - groupTop - allDayPanelOffset;
        return appointmentGroupTopOffset
    };
    _proto._getTailHeight = function(appointmentGeometry, appointmentSettings) {
        if (!this.isVirtualScrolling) {
            return appointmentGeometry.sourceAppointmentHeight - appointmentGeometry.reducedHeight
        }
        var appointmentGroupTopOffset = this._getGroupTopOffset(appointmentSettings);
        var sourceAppointmentHeight = appointmentGeometry.sourceAppointmentHeight;
        var groupHeight = this._getGroupHeight();
        var tailHeight = appointmentGroupTopOffset + sourceAppointmentHeight - groupHeight;
        return tailHeight
    };
    _proto._getAppointmentParts = function(appointmentGeometry, appointmentSettings) {
        var tailHeight = this._getTailHeight(appointmentGeometry, appointmentSettings);
        var width = appointmentGeometry.width;
        var result = [];
        var currentPartTop = Math.max(0, this.instance.fire("getGroupTop", appointmentSettings.groupIndex));
        var cellsDiff = this.instance.fire("isGroupedByDate") ? this.instance.fire("getGroupCount") : 1;
        var offset = this.getDefaultCellWidth() * cellsDiff;
        var left = appointmentSettings.left + offset;
        if (tailHeight > 0) {
            var minHeight = this.getAppointmentMinSize();
            if (tailHeight < minHeight) {
                tailHeight = minHeight
            }
            currentPartTop += this.instance.fire("getOffsetByAllDayPanel", appointmentSettings.groupIndex);
            result.push((0, _extend.extend)(true, {}, appointmentSettings, {
                top: currentPartTop,
                left: left,
                height: tailHeight,
                width: width,
                appointmentReduced: "tail",
                rowIndex: 0,
                cellIndex: appointmentSettings.cellIndex + cellsDiff
            }))
        }
        return result
    };
    _proto._getMinuteHeight = function() {
        return this.getDefaultCellHeight() / this.instance.getAppointmentDurationInMinutes()
    };
    _proto._getCompactLeftCoordinate = function(itemLeft, index) {
        var cellBorderSize = 1;
        var cellWidth = this.getDefaultCellWidth() || this.getAppointmentMinSize();
        return itemLeft + (cellBorderSize + cellWidth) * index
    };
    _proto._getVerticalAppointmentGeometry = function(coordinates) {
        var config = this._calculateVerticalGeometryConfig(coordinates);
        return this._customizeVerticalCoordinates(coordinates, config.width, config.appointmentCountPerCell, config.offset)
    };
    _proto._customizeVerticalCoordinates = function(coordinates, width, appointmentCountPerCell, topOffset, isAllDay) {
        var appointmentWidth = Math.max(width / appointmentCountPerCell, width / coordinates.count);
        var height = coordinates.height;
        var appointmentLeft = coordinates.left + coordinates.index * appointmentWidth;
        var top = coordinates.top;
        if (coordinates.isCompact) {
            this._markAppointmentAsVirtual(coordinates, isAllDay)
        }
        return {
            height: height,
            width: appointmentWidth,
            top: top,
            left: appointmentLeft,
            empty: this._isAppointmentEmpty(height, width)
        }
    };
    _proto._calculateVerticalGeometryConfig = function(coordinates) {
        var overlappingMode = this.instance.fire("getMaxAppointmentsPerCell");
        var offsets = this._getOffsets();
        var appointmentDefaultOffset = this._getAppointmentDefaultOffset();
        var appointmentCountPerCell = this._getAppointmentCount(overlappingMode, coordinates);
        var ratio = this._getDefaultRatio(coordinates, appointmentCountPerCell);
        var maxWidth = this._getMaxWidth();
        if (!appointmentCountPerCell) {
            appointmentCountPerCell = coordinates.count;
            ratio = (maxWidth - offsets.unlimited) / maxWidth
        }
        var topOffset = (1 - ratio) * maxWidth;
        if ("auto" === overlappingMode || (0, _type.isNumeric)(overlappingMode)) {
            ratio = 1;
            maxWidth -= appointmentDefaultOffset;
            topOffset = 0
        }
        return {
            width: ratio * maxWidth,
            appointmentCountPerCell: appointmentCountPerCell,
            offset: topOffset
        }
    };
    _proto._getMaxWidth = function() {
        return this.getDefaultCellWidth() || this.invoke("getCellWidth")
    };
    _proto.isAllDay = function(appointmentData) {
        var allDay = this.instance.fire("getField", "allDay", appointmentData);
        if (allDay) {
            return true
        }
        return this.instance.appointmentTakesAllDay(appointmentData)
    };
    _proto._getAppointmentMaxWidth = function() {
        return this.getDefaultCellWidth() - this._getAppointmentDefaultOffset()
    };
    _proto.calculateAppointmentWidth = function(appointment, position) {
        if (!this.isAllDay(appointment)) {
            return 0
        }
        var startDate = _date.default.trimTime(position.info.appointment.startDate);
        var endDate = this.normalizeEndDateByViewEnd(appointment, position.info.appointment.endDate);
        var cellWidth = this.getDefaultCellWidth() || this.getAppointmentMinSize();
        var durationInHours = (endDate.getTime() - startDate.getTime()) / toMs("hour");
        var width = Math.ceil(durationInHours / 24) * cellWidth;
        width = this.cropAppointmentWidth(width, cellWidth);
        return width
    };
    _proto.calculateAppointmentHeight = function(appointment, position) {
        if (this.isAllDay(appointment)) {
            return 0
        }
        var startDate = position.info.appointment.startDate;
        var endDate = this.normalizeEndDateByViewEnd(appointment, position.info.appointment.endDate);
        var allDay = this.instance.fire("getField", "allDay", appointment);
        var fullDuration = this._getAppointmentDurationInMs(startDate, endDate, allDay);
        var durationInMinutes = this._adjustDurationByDaylightDiff(fullDuration, startDate, endDate) / toMs("minute");
        var height = durationInMinutes * this._getMinuteHeight();
        return height
    };
    _proto.getDirection = function() {
        return "vertical"
    };
    _proto._sortCondition = function(a, b) {
        var allDayCondition = a.allDay - b.allDay;
        var isAllDay = a.allDay && b.allDay;
        var condition = "vertical" === this.instance._groupOrientation && isAllDay ? this._columnCondition(a, b) : this._rowCondition(a, b);
        return allDayCondition ? allDayCondition : condition
    };
    _proto.hasAllDayAppointments = function() {
        return true
    };
    _proto._getAllDayAppointmentGeometry = function(coordinates) {
        var config = this._calculateGeometryConfig(coordinates);
        return this._customizeCoordinates(coordinates, config.height, config.appointmentCountPerCell, config.offset, true)
    };
    _proto._calculateGeometryConfig = function(coordinates) {
        if (!this.instance._allowResizing() || !this.instance._allowAllDayResizing()) {
            coordinates.skipResizing = true
        }
        var config = _BaseAppointmentsStra.prototype._calculateGeometryConfig.call(this, coordinates);
        if (coordinates.count <= this._getDynamicAppointmentCountPerCell().allDay) {
            config.offset = 0
        }
        return config
    };
    _proto._getAppointmentCount = function(overlappingMode, coordinates) {
        return "auto" !== overlappingMode && 1 === coordinates.count && !(0, _type.isNumeric)(overlappingMode) ? coordinates.count : this._getMaxAppointmentCountPerCellByType(coordinates.allDay)
    };
    _proto._getDefaultRatio = function(coordinates, appointmentCountPerCell) {
        return coordinates.count > this.instance.option("_appointmentCountPerCell") ? .65 : 1
    };
    _proto._getOffsets = function() {
        return {
            unlimited: ALLDAY_APPOINTMENT_MIN_VERTICAL_OFFSET,
            auto: ALLDAY_APPOINTMENT_MAX_VERTICAL_OFFSET
        }
    };
    _proto._getMaxHeight = function() {
        return this.getDefaultAllDayCellHeight() || this.getAppointmentMinSize()
    };
    _proto._needVerticalGroupBounds = function(allDay) {
        return !allDay
    };
    _proto._needHorizontalGroupBounds = function() {
        return false
    };
    return VerticalRenderingStrategy
}(_uiSchedulerAppointmentsStrategy.default);
var _default = VerticalRenderingStrategy;
exports.default = _default;
module.exports = exports.default;
