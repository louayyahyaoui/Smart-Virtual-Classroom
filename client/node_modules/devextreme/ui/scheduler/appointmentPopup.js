/**
 * DevExtreme (ui/scheduler/appointmentPopup.js)
 * Version: 20.2.6
 * Build date: Tue Mar 16 2021
 *
 * Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
exports.default = void 0;
var _devices = _interopRequireDefault(require("../../core/devices"));
var _renderer = _interopRequireDefault(require("../../core/renderer"));
var _date = _interopRequireDefault(require("../../core/utils/date"));
var _deferred = require("../../core/utils/deferred");
var _extend = require("../../core/utils/extend");
var _iterator = require("../../core/utils/iterator");
var _type = require("../../core/utils/type");
var _window = require("../../core/utils/window");
var _visibility_change = require("../../events/visibility_change");
var _message = _interopRequireDefault(require("../../localization/message"));
var _popup = _interopRequireDefault(require("../popup"));
var _uiScheduler = require("./ui.scheduler.appointment_form");
var _ui = require("./ui.loading");

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        "default": obj
    }
}
var toMs = _date.default.dateToMilliseconds;
var WIDGET_CLASS = "dx-scheduler";
var APPOINTMENT_POPUP_CLASS = "".concat(WIDGET_CLASS, "-appointment-popup");
var APPOINTMENT_POPUP_WIDTH = 485;
var APPOINTMENT_POPUP_WIDTH_WITH_RECURRENCE = 970;
var APPOINTMENT_POPUP_FULLSCREEN_WINDOW_WIDTH = 1e3;
var APPOINTMENT_POPUP_FULLSCREEN_WINDOW_WIDTH_MOBILE = 500;
var APPOINTMENT_POPUP_WIDTH_MOBILE = 350;
var TOOLBAR_ITEM_AFTER_LOCATION = "after";
var TOOLBAR_ITEM_BEFORE_LOCATION = "before";
var DAY_IN_MS = toMs("day");
var AppointmentPopup = function() {
    function AppointmentPopup(scheduler) {
        this.scheduler = scheduler;
        this._popup = null;
        this._appointmentForm = null;
        this.state = {
            lastEditData: null,
            saveChangesLocker: false,
            appointment: {
                data: null,
                isEmptyText: false,
                isEmptyDescription: false
            }
        }
    }
    var _proto = AppointmentPopup.prototype;
    _proto.show = function() {
        var data = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
        var isDoneButtonVisible = arguments.length > 1 ? arguments[1] : void 0;
        if ((0, _type.isEmptyObject)(data)) {
            var startDate = this.scheduler.option("currentDate");
            var endDate = new Date(startDate.getTime() + this.scheduler.option("cellDuration") * toMs("minute"));
            this.scheduler.fire("setField", "startDate", data, startDate);
            this.scheduler.fire("setField", "endDate", data, endDate)
        }
        this.state.appointment.data = data;
        if (!this._popup) {
            var popupConfig = this._createPopupConfig();
            this._popup = this._createPopup(popupConfig)
        }
        this._popup.option("toolbarItems", this._createPopupToolbarItems(isDoneButtonVisible));
        this._popup.show()
    };
    _proto.hide = function() {
        this._popup.hide()
    };
    _proto.isVisible = function() {
        return this._popup ? this._popup.option("visible") : false
    };
    _proto.dispose = function() {
        if (this._$popup) {
            this._popup.$element().remove();
            this._$popup = null
        }
    };
    _proto._createPopup = function(options) {
        var popupElement = (0, _renderer.default)("<div>").addClass(APPOINTMENT_POPUP_CLASS).appendTo(this.scheduler.$element());
        return this.scheduler._createComponent(popupElement, _popup.default, options)
    };
    _proto._createPopupConfig = function() {
        var _this = this;
        return {
            height: "auto",
            maxHeight: "100%",
            showCloseButton: false,
            showTitle: false,
            onHiding: function() {
                _this.scheduler.focus()
            },
            contentTemplate: function() {
                return _this._createPopupContent()
            },
            onShowing: function(e) {
                return _this._onShowing(e)
            },
            defaultOptionsRules: [{
                device: function() {
                    return _devices.default.current().android
                },
                options: {
                    showTitle: false
                }
            }]
        }
    };
    _proto._onShowing = function(e) {
        var _this2 = this;
        this._updateForm();
        var arg = {
            form: this._appointmentForm,
            popup: this._popup,
            appointmentData: this.state.appointment.data,
            cancel: false
        };
        this.scheduler._actions.onAppointmentFormOpening(arg);
        this.scheduler._processActionResult(arg, function(canceled) {
            if (canceled) {
                e.cancel = true
            } else {
                _this2.updatePopupFullScreenMode()
            }
        })
    };
    _proto._createPopupContent = function() {
        var formElement = (0, _renderer.default)("<div>");
        this._appointmentForm = this._createForm(formElement);
        return formElement
    };
    _proto._createAppointmentFormData = function(rawAppointment) {
        var appointment = this._createAppointmentAdapter(rawAppointment);
        var result = (0, _extend.extend)(true, {
            repeat: !!appointment.recurrenceRule
        }, rawAppointment);
        (0, _iterator.each)(this.scheduler._resourcesManager.getResourcesFromItem(result, true) || {}, function(name, value) {
            return result[name] = value
        });
        return result
    };
    _proto._createForm = function(element) {
        var expr = this.scheduler._dataAccessors.expr;
        var resources = this.scheduler.option("resources");
        var allowTimeZoneEditing = this._getAllowTimeZoneEditing();
        var rawAppointment = this.state.appointment.data;
        var formData = this._createAppointmentFormData(rawAppointment);
        var readOnly = this._isReadOnly(rawAppointment);
        _uiScheduler.AppointmentForm.prepareAppointmentFormEditors(expr, this.scheduler, this.triggerResize.bind(this), this.changeSize.bind(this), formData, allowTimeZoneEditing, readOnly);
        if (resources && resources.length) {
            _uiScheduler.AppointmentForm.concatResources(this.scheduler._resourcesManager.getEditors())
        }
        return _uiScheduler.AppointmentForm.create(this.scheduler._createComponent.bind(this.scheduler), element, readOnly, formData)
    };
    _proto._getAllowTimeZoneEditing = function() {
        var scheduler = this.scheduler;
        return scheduler.option("editing.allowTimeZoneEditing") || scheduler.option("editing.allowEditingTimeZones")
    };
    _proto._isReadOnly = function(rawAppointment) {
        var adapter = this.scheduler.createAppointmentAdapter(rawAppointment);
        if (rawAppointment && adapter.disabled) {
            return true
        }
        return this.scheduler._editAppointmentData ? !this.scheduler._editing.allowUpdating : false
    };
    _proto._createAppointmentAdapter = function(rawAppointment) {
        return this.scheduler.createAppointmentAdapter(rawAppointment)
    };
    _proto._updateForm = function() {
        var data = this.state.appointment.data;
        var adapter = this._createAppointmentAdapter(data);
        var allDay = adapter.allDay;
        var startDate = adapter.startDate && adapter.calculateStartDate("toAppointment");
        var endDate = adapter.endDate && adapter.calculateEndDate("toAppointment");
        this.state.appointment.isEmptyText = void 0 === data || void 0 === adapter.text;
        this.state.appointment.isEmptyDescription = void 0 === data || void 0 === adapter.description;
        var appointment = this._createAppointmentAdapter(this._createAppointmentFormData(data));
        if (void 0 === appointment.text) {
            appointment.text = ""
        }
        if (void 0 === appointment.description) {
            appointment.description = ""
        }
        if (void 0 === appointment.recurrenceRule) {
            appointment.recurrenceRule = ""
        }
        var formData = appointment.source();
        if (startDate) {
            this.scheduler.fire("setField", "startDate", formData, startDate)
        }
        if (endDate) {
            this.scheduler.fire("setField", "endDate", formData, endDate)
        }
        var _this$scheduler$_data = this.scheduler._dataAccessors.expr,
            startDateExpr = _this$scheduler$_data.startDateExpr,
            endDateExpr = _this$scheduler$_data.endDateExpr;
        this._appointmentForm.option("readOnly", this._isReadOnly(data));
        _uiScheduler.AppointmentForm.updateFormData(this._appointmentForm, formData, this.scheduler._dataAccessors.expr);
        _uiScheduler.AppointmentForm.setEditorsType(this._appointmentForm, startDateExpr, endDateExpr, allDay)
    };
    _proto._isDeviceMobile = function() {
        return "desktop" !== _devices.default.current().deviceType
    };
    _proto._isPopupFullScreenNeeded = function() {
        var width = this._tryGetWindowWidth();
        if (width) {
            return this._isDeviceMobile() ? width < APPOINTMENT_POPUP_FULLSCREEN_WINDOW_WIDTH_MOBILE : width < APPOINTMENT_POPUP_FULLSCREEN_WINDOW_WIDTH
        }
        return false
    };
    _proto._tryGetWindowWidth = function() {
        if ((0, _window.hasWindow)()) {
            var window = (0, _window.getWindow)();
            return (0, _renderer.default)(window).width()
        }
    };
    _proto.triggerResize = function() {
        this._popup && (0, _visibility_change.triggerResizeEvent)(this._popup.$element())
    };
    _proto._getMaxWidth = function(isRecurrence) {
        if (this._isDeviceMobile()) {
            return APPOINTMENT_POPUP_WIDTH_MOBILE
        }
        return isRecurrence ? APPOINTMENT_POPUP_WIDTH_WITH_RECURRENCE : APPOINTMENT_POPUP_WIDTH
    };
    _proto.changeSize = function(isRecurrence) {
        var isFullScreen = this._isPopupFullScreenNeeded();
        this._popup.option({
            maxWidth: isFullScreen ? "100%" : this._getMaxWidth(isRecurrence),
            fullScreen: isFullScreen
        })
    };
    _proto.updatePopupFullScreenMode = function() {
        if (!this._appointmentForm) {
            return
        }
        var isRecurrence = _uiScheduler.AppointmentForm.getRecurrenceRule(this._appointmentForm.option("formData"), this.scheduler._dataAccessors.expr);
        if (this.isVisible()) {
            this.changeSize(isRecurrence)
        }
    };
    _proto._createPopupToolbarItems = function(isDoneButtonVisible) {
        var _this3 = this;
        var result = [];
        var isIOs = "ios" === _devices.default.current().platform;
        if (isDoneButtonVisible) {
            result.push({
                shortcut: "done",
                options: {
                    text: _message.default.format("Done")
                },
                location: TOOLBAR_ITEM_AFTER_LOCATION,
                onClick: function(e) {
                    return _this3._doneButtonClickHandler(e)
                }
            })
        }
        result.push({
            shortcut: "cancel",
            location: isIOs ? TOOLBAR_ITEM_BEFORE_LOCATION : TOOLBAR_ITEM_AFTER_LOCATION
        });
        return result
    };
    _proto.saveChanges = function(showLoadPanel) {
        var _this4 = this;
        var deferred = new _deferred.Deferred;
        var validation = this._appointmentForm.validate();
        var state = this.state.appointment;
        showLoadPanel && this._showLoadPanel();
        (0, _deferred.when)(validation && validation.complete || validation).done(function(validation) {
            if (validation && !validation.isValid) {
                _this4._hideLoadPanel();
                deferred.resolve(false);
                return
            }
            var formData = _this4._appointmentForm.option("formData");
            var adapter = _this4.scheduler.createAppointmentAdapter(formData);
            var appointment = adapter.clone({
                pathTimeZone: "fromAppointment"
            }).source();
            var oldData = _this4.scheduler._editAppointmentData;
            var recData = _this4.scheduler._updatedRecAppointment;
            if (state.isEmptyText && "" === adapter.text) {
                delete appointment.text
            }
            if (state.isEmptyDescription && "" === adapter.description) {
                delete appointment.description
            }
            if (void 0 === state.data.recurrenceRule && "" === adapter.recurrenceRule) {
                delete appointment.recurrenceRule
            }
            if ((0, _type.isDefined)(appointment.repeat)) {
                delete appointment.repeat
            }
            if (oldData && !recData) {
                _this4.scheduler.updateAppointment(oldData, appointment).done(deferred.resolve)
            } else {
                if (recData) {
                    _this4.scheduler.updateAppointment(oldData, recData);
                    delete _this4.scheduler._updatedRecAppointment
                }
                _this4.scheduler.addAppointment(appointment).done(deferred.resolve)
            }
            deferred.done(function() {
                _this4._hideLoadPanel();
                _this4.state.lastEditData = appointment
            })
        });
        return deferred.promise()
    };
    _proto._doneButtonClickHandler = function(e) {
        e.cancel = true;
        this.saveEditData()
    };
    _proto.saveEditData = function() {
        var _this5 = this;
        var deferred = new _deferred.Deferred;
        if (this._tryLockSaveChanges()) {
            (0, _deferred.when)(this.saveChanges(true)).done(function() {
                if (_this5.state.lastEditData) {
                    var adapter = _this5.scheduler.createAppointmentAdapter(_this5.state.lastEditData);
                    var startDate = adapter.startDate,
                        endDate = adapter.endDate,
                        allDay = adapter.allDay;
                    var startTime = startDate.getTime();
                    var endTime = endDate.getTime();
                    var inAllDayRow = allDay || endTime - startTime >= DAY_IN_MS;
                    _this5.scheduler._workSpace.updateScrollPosition(startDate, _this5.scheduler._resourcesManager.getResourcesFromItem(_this5.state.lastEditData, true), inAllDayRow);
                    _this5.state.lastEditData = null
                }
                _this5._unlockSaveChanges();
                deferred.resolve()
            })
        }
        return deferred.promise()
    };
    _proto._hideLoadPanel = function() {
        (0, _ui.hide)()
    };
    _proto._showLoadPanel = function() {
        var $overlayContent = this._popup.overlayContent();
        (0, _ui.show)({
            container: $overlayContent,
            position: {
                of: $overlayContent
            }
        })
    };
    _proto._tryLockSaveChanges = function() {
        if (false === this.state.saveChangesLocker) {
            this.state.saveChangesLocker = true;
            return true
        }
        return false
    };
    _proto._unlockSaveChanges = function() {
        this.state.saveChangesLocker = false
    };
    return AppointmentPopup
}();
exports.default = AppointmentPopup;
module.exports = exports.default;
