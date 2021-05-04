/**
 * DevExtreme (ui/scheduler/ui.scheduler.appointment.js)
 * Version: 20.2.6
 * Build date: Tue Mar 16 2021
 *
 * Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
exports.default = void 0;
var _renderer = _interopRequireDefault(require("../../core/renderer"));
var _events_engine = _interopRequireDefault(require("../../events/core/events_engine"));
var _translator = require("../../animation/translator");
var _recurrence = require("./recurrence");
var _extend = require("../../core/utils/extend");
var _component_registrator = _interopRequireDefault(require("../../core/component_registrator"));
var _ui = require("../tooltip/ui.tooltip");
var _uiScheduler = _interopRequireDefault(require("./ui.scheduler.publisher_mixin"));
var _index = require("../../events/utils/index");
var _pointer = _interopRequireDefault(require("../../events/pointer"));
var _dom_component = _interopRequireDefault(require("../../core/dom_component"));
var _resizable = _interopRequireDefault(require("../resizable"));
var _message = _interopRequireDefault(require("../../localization/message"));
var _date = _interopRequireDefault(require("../../localization/date"));
var _constants = require("./constants");

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        "default": obj
    }
}
var DEFAULT_HORIZONTAL_HANDLES = "left right";
var DEFAULT_VERTICAL_HANDLES = "top bottom";
var REDUCED_APPOINTMENT_POINTERENTER_EVENT_NAME = (0, _index.addNamespace)(_pointer.default.enter, "dxSchedulerAppointment");
var REDUCED_APPOINTMENT_POINTERLEAVE_EVENT_NAME = (0, _index.addNamespace)(_pointer.default.leave, "dxSchedulerAppointment");
var Appointment = _dom_component.default.inherit({
    _getDefaultOptions: function() {
        return (0, _extend.extend)(this.callBase(), {
            data: {},
            geometry: {
                top: 0,
                left: 0,
                width: 0,
                height: 0
            },
            allowDrag: true,
            allowResize: true,
            reduced: null,
            isCompact: false,
            direction: "vertical",
            resizableConfig: {},
            cellHeight: 0,
            cellWidth: 0,
            isDragSource: false
        })
    },
    _optionChanged: function(args) {
        switch (args.name) {
            case "data":
            case "geometry":
            case "allowDrag":
            case "allowResize":
            case "reduced":
            case "sortedIndex":
            case "isCompact":
            case "direction":
            case "resizableConfig":
            case "cellHeight":
            case "cellWidth":
                this._invalidate();
                break;
            case "isDragSource":
                this._renderDragSourceClass();
                break;
            default:
                this.callBase(args)
        }
    },
    _getHorizontalResizingRule: function() {
        var reducedHandles = {
            head: this.option("rtlEnabled") ? "right" : "left",
            body: "",
            tail: this.option("rtlEnabled") ? "left" : "right"
        };
        return {
            handles: this.option("reduced") ? reducedHandles[this.option("reduced")] : DEFAULT_HORIZONTAL_HANDLES,
            minHeight: 0,
            minWidth: this.invoke("getCellWidth"),
            step: this.invoke("getResizableStep"),
            roundStepValue: false
        }
    },
    _getVerticalResizingRule: function() {
        var height = this.invoke("getCellHeight");
        return {
            handles: DEFAULT_VERTICAL_HANDLES,
            minWidth: 0,
            minHeight: height,
            step: height,
            roundStepValue: true
        }
    },
    _render: function() {
        this.callBase();
        this._renderAppointmentGeometry();
        this._renderEmptyClass();
        this._renderReducedAppointment();
        this._renderAllDayClass();
        this._renderDragSourceClass();
        this._renderDirection();
        this.$element().data("dxAppointmentStartDate", this.option("startDate"));
        this.$element().attr("title", this.invoke("getField", "text", this.option("data")));
        this.$element().attr("role", "button");
        this._renderRecurrenceClass();
        this._renderResizable()
    },
    _renderAppointmentGeometry: function() {
        var geometry = this.option("geometry");
        var $element = this.$element();
        (0, _translator.move)($element, {
            top: geometry.top,
            left: geometry.left
        });
        $element.css({
            width: geometry.width < 0 ? 0 : geometry.width,
            height: geometry.height < 0 ? 0 : geometry.height
        })
    },
    _renderEmptyClass: function() {
        var geometry = this.option("geometry");
        if (geometry.empty || this.option("isCompact")) {
            this.$element().addClass(_constants.EMPTY_APPOINTMENT_CLASS)
        }
    },
    _renderReducedAppointment: function() {
        var reducedPart = this.option("reduced");
        if (!reducedPart) {
            return
        }
        this.$element().toggleClass(_constants.REDUCED_APPOINTMENT_CLASS, true).toggleClass(_constants.REDUCED_APPOINTMENT_PARTS_CLASSES[reducedPart], true);
        this._renderAppointmentReducedIcon()
    },
    _renderAppointmentReducedIcon: function() {
        var $icon = (0, _renderer.default)("<div>").addClass(_constants.REDUCED_APPOINTMENT_ICON).appendTo(this.$element());
        var endDate = this._getEndDate();
        var tooltipLabel = _message.default.format("dxScheduler-editorLabelEndDate");
        var tooltipText = [tooltipLabel, ": ", _date.default.format(endDate, "monthAndDay"), ", ", _date.default.format(endDate, "year")].join("");
        _events_engine.default.off($icon, REDUCED_APPOINTMENT_POINTERENTER_EVENT_NAME);
        _events_engine.default.on($icon, REDUCED_APPOINTMENT_POINTERENTER_EVENT_NAME, function() {
            (0, _ui.show)({
                target: $icon,
                content: tooltipText
            })
        });
        _events_engine.default.off($icon, REDUCED_APPOINTMENT_POINTERLEAVE_EVENT_NAME);
        _events_engine.default.on($icon, REDUCED_APPOINTMENT_POINTERLEAVE_EVENT_NAME, function() {
            (0, _ui.hide)()
        })
    },
    _getEndDate: function() {
        var result = this.invoke("getField", "endDate", this.option("data"));
        if (result) {
            return new Date(result)
        }
        return result
    },
    _renderAllDayClass: function() {
        this.$element().toggleClass(_constants.ALL_DAY_APPOINTMENT_CLASS, !!this.option("allDay"))
    },
    _renderDragSourceClass: function() {
        this.$element().toggleClass(_constants.APPOINTMENT_DRAG_SOURCE_CLASS, !!this.option("isDragSource"))
    },
    _renderRecurrenceClass: function() {
        var rule = this.invoke("getField", "recurrenceRule", this.option("data"));
        if ((0, _recurrence.getRecurrenceProcessor)().isValidRecurrenceRule(rule)) {
            this.$element().addClass(_constants.RECURRENCE_APPOINTMENT_CLASS)
        }
    },
    _renderDirection: function() {
        this.$element().addClass(_constants.DIRECTION_APPOINTMENT_CLASSES[this.option("direction")])
    },
    _createResizingConfig: function() {
        var config = "vertical" === this.option("direction") ? this._getVerticalResizingRule() : this._getHorizontalResizingRule();
        if (!this.invoke("isGroupedByDate")) {
            config.stepPrecision = "strict"
        }
        return config
    },
    _renderResizable: function() {
        if (this.option("allowResize")) {
            this._createComponent(this.$element(), _resizable.default, (0, _extend.extend)(this._createResizingConfig(), this.option("resizableConfig")))
        }
    },
    _useTemplates: function() {
        return false
    }
}).include(_uiScheduler.default);
(0, _component_registrator.default)("dxSchedulerAppointment", Appointment);
var _default = Appointment;
exports.default = _default;
module.exports = exports.default;
