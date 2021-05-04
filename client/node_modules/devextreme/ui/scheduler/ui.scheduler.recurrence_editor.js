/**
 * DevExtreme (ui/scheduler/ui.scheduler.recurrence_editor.js)
 * Version: 20.2.6
 * Build date: Tue Mar 16 2021
 *
 * Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
exports.default = void 0;
var _component_registrator = _interopRequireDefault(require("../../core/component_registrator"));
var _guid = _interopRequireDefault(require("../../core/guid"));
var _renderer = _interopRequireDefault(require("../../core/renderer"));
var _date = _interopRequireDefault(require("../../core/utils/date"));
var _extend = require("../../core/utils/extend");
var _type = require("../../core/utils/type");
var _date2 = _interopRequireDefault(require("../../localization/date"));
var _message = _interopRequireDefault(require("../../localization/message"));
var _form = _interopRequireDefault(require("../form"));
var _button_group = _interopRequireDefault(require("../button_group"));
var _date_box = _interopRequireDefault(require("../date_box"));
var _editor = _interopRequireDefault(require("../editor/editor"));
var _number_box = _interopRequireDefault(require("../number_box"));
var _recurrence = require("./recurrence");
require("../radio_group");

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

function _arrayLikeToArray(arr, len) {
    if (null == len || len > arr.length) {
        len = arr.length
    }
    for (var i = 0, arr2 = new Array(len); i < len; i++) {
        arr2[i] = arr[i]
    }
    return arr2
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
var RECURRENCE_EDITOR = "dx-recurrence-editor";
var LABEL_POSTFIX = "-label";
var WRAPPER_POSTFIX = "-wrapper";
var RECURRENCE_EDITOR_CONTAINER = "dx-recurrence-editor-container";
var REPEAT_END_EDITOR = "dx-recurrence-repeat-end";
var REPEAT_END_TYPE_EDITOR = "dx-recurrence-radiogroup-repeat-type";
var REPEAT_COUNT_EDITOR = "dx-recurrence-numberbox-repeat-count";
var REPEAT_UNTIL_DATE_EDITOR = "dx-recurrence-datebox-until-date";
var RECURRENCE_BUTTON_GROUP = "dx-recurrence-button-group";
var FREQUENCY_EDITOR = "dx-recurrence-selectbox-freq";
var INTERVAL_EDITOR = "dx-recurrence-numberbox-interval";
var REPEAT_ON_EDITOR = "dx-recurrence-repeat-on";
var DAY_OF_MONTH = "dx-recurrence-numberbox-day-of-month";
var MONTH_OF_YEAR = "dx-recurrence-selectbox-month-of-year";
var recurrentEditorNumberBoxWidth = 70;
var recurrentEditorSelectBoxWidth = 120;
var defaultRecurrenceTypeIndex = 1;
var frequenciesMessages = [{
    recurrence: "dxScheduler-recurrenceHourly",
    value: "hourly"
}, {
    recurrence: "dxScheduler-recurrenceDaily",
    value: "daily"
}, {
    recurrence: "dxScheduler-recurrenceWeekly",
    value: "weekly"
}, {
    recurrence: "dxScheduler-recurrenceMonthly",
    value: "monthly"
}, {
    recurrence: "dxScheduler-recurrenceYearly",
    value: "yearly"
}];
var frequencies = frequenciesMessages.map(function(item) {
    return {
        text: function() {
            return _message.default.format(item.recurrence)
        },
        value: item.value
    }
});
var repeatEndTypes = [{
    type: "never"
}, {
    type: "until"
}, {
    type: "count"
}];
var days = ["SU", "MO", "TU", "WE", "TH", "FR", "SA"];
var RecurrenceRule = function() {
    function RecurrenceRule(rule) {
        this._recurrenceProcessor = (0, _recurrence.getRecurrenceProcessor)();
        this._recurrenceRule = this._recurrenceProcessor.evalRecurrenceRule(rule).rule
    }
    var _proto = RecurrenceRule.prototype;
    _proto.makeRules = function(string) {
        this._recurrenceRule = this._recurrenceProcessor.evalRecurrenceRule(string).rule
    };
    _proto.makeRule = function(field, value) {
        if (!value || Array.isArray(value) && !value.length) {
            delete this._recurrenceRule[field];
            return
        }
        if ((0, _type.isDefined)(field)) {
            if ("until" === field) {
                delete this._recurrenceRule.count
            }
            if ("count" === field) {
                delete this._recurrenceRule.until
            }
            this._recurrenceRule[field] = value
        }
    };
    _proto.getRepeatEndRule = function() {
        var rules = this._recurrenceRule;
        if ("count" in rules) {
            return "count"
        }
        if ("until" in rules) {
            return "until"
        }
        return "never"
    };
    _proto.getRecurrenceString = function() {
        return this._recurrenceProcessor.getRecurrenceString(this._recurrenceRule)
    };
    _proto.getRules = function() {
        return this._recurrenceRule
    };
    _proto.getDaysFromByDayRule = function() {
        return this._recurrenceProcessor.daysFromByDayRule(this._recurrenceRule)
    };
    return RecurrenceRule
}();
var RecurrenceEditor = function(_Editor) {
    _inheritsLoose(RecurrenceEditor, _Editor);

    function RecurrenceEditor() {
        return _Editor.apply(this, arguments) || this
    }
    var _proto2 = RecurrenceEditor.prototype;
    _proto2._getDefaultOptions = function() {
        var defaultOptions = _Editor.prototype._getDefaultOptions.call(this);
        return (0, _extend.extend)(defaultOptions, {
            value: null,
            startDate: new Date,
            firstDayOfWeek: void 0
        })
    };
    _proto2._getFirstDayOfWeek = function() {
        var firstDayOfWeek = this.option("firstDayOfWeek");
        return (0, _type.isDefined)(firstDayOfWeek) ? firstDayOfWeek : _date2.default.firstDayOfWeekIndex()
    };
    _proto2._createComponent = function(element, name) {
        var config = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
        this._extendConfig(config, {
            readOnly: this.option("readOnly")
        });
        return _Editor.prototype._createComponent.call(this, element, name, config)
    };
    _proto2._init = function() {
        _Editor.prototype._init.call(this);
        this._recurrenceRule = new RecurrenceRule(this.option("value"))
    };
    _proto2._render = function() {
        _Editor.prototype._render.call(this);
        this.$element().addClass(RECURRENCE_EDITOR);
        this._$container = (0, _renderer.default)("<div>").addClass(RECURRENCE_EDITOR_CONTAINER).appendTo(this.$element());
        this._prepareEditors();
        this._renderEditors(this._$container)
    };
    _proto2.getEditorByField = function(fieldName) {
        var editor = this.getRecurrenceForm().getEditor(fieldName);
        if (!(0, _type.isDefined)(editor)) {
            switch (fieldName) {
                case "byday":
                    editor = this._weekEditor;
                    break;
                case "count":
                    editor = this._repeatCountEditor;
                    break;
                case "until":
                    editor = this._repeatUntilDate
            }
        }
        return editor
    };
    _proto2._prepareEditors = function() {
        var freq = (this._recurrenceRule.getRules().freq || frequenciesMessages[defaultRecurrenceTypeIndex].value).toLowerCase();
        this._editors = [this._createFreqEditor(freq), this._createIntervalEditor(freq), this._createRepeatOnLabel(freq), {
            itemType: "group",
            cssClass: REPEAT_ON_EDITOR,
            colCount: 2,
            colCountByScreen: {
                xs: 2
            },
            items: this._createRepeatOnEditor(freq)
        }, {
            itemType: "group",
            items: this._createRepeatEndEditor()
        }];
        return this._editors
    };
    _proto2._createFreqEditor = function(freq) {
        var _this = this;
        return {
            dataField: "freq",
            name: "FREQ",
            editorType: "dxSelectBox",
            cssClass: FREQUENCY_EDITOR,
            editorOptions: {
                items: frequencies,
                value: freq,
                field: "freq",
                valueExpr: "value",
                displayExpr: "text",
                layout: "horizontal",
                elementAttr: {
                    "class": FREQUENCY_EDITOR
                },
                onValueChanged: function(args) {
                    return _this._valueChangedHandler(args)
                }
            },
            label: {
                text: _message.default.format("dxScheduler-editorLabelRecurrence")
            }
        }
    };
    _proto2._createIntervalEditor = function(freq) {
        var _this2 = this;
        var interval = this._recurrenceRule.getRules().interval || 1;
        return {
            itemType: "group",
            colCount: 2,
            cssClass: "".concat(INTERVAL_EDITOR).concat(WRAPPER_POSTFIX),
            colCountByScreen: {
                xs: 2
            },
            items: [{
                dataField: "interval",
                editorType: "dxNumberBox",
                editorOptions: {
                    width: recurrentEditorNumberBoxWidth,
                    min: 1,
                    field: "interval",
                    value: interval,
                    showSpinButtons: true,
                    useLargeSpinButtons: false,
                    elementAttr: {
                        "class": INTERVAL_EDITOR
                    },
                    onValueChanged: function(args) {
                        return _this2._valueChangedHandler(args)
                    }
                },
                label: {
                    text: _message.default.format("dxScheduler-recurrenceRepeatEvery")
                }
            }, {
                name: "intervalLabel",
                cssClass: "".concat(INTERVAL_EDITOR).concat(LABEL_POSTFIX),
                template: function() {
                    return _message.default.format("dxScheduler-recurrenceRepeat".concat(freq.charAt(0).toUpperCase()).concat(freq.substr(1).toLowerCase()))
                }
            }]
        }
    };
    _proto2._createRepeatOnLabel = function(freq) {
        return {
            itemType: "group",
            cssClass: "".concat(REPEAT_ON_EDITOR).concat(LABEL_POSTFIX),
            items: [{
                name: "repeatOnLabel",
                colSpan: 2,
                template: function() {
                    return _message.default.format("dxScheduler-recurrenceRepeatOn")
                },
                visible: freq && "daily" !== freq && "hourly" !== freq
            }]
        }
    };
    _proto2._createRepeatOnEditor = function(freq) {
        return [this._createByDayEditor(freq), this._createByMonthEditor(freq), this._createByMonthDayEditor(freq)]
    };
    _proto2._createByDayEditor = function(freq) {
        var _this3 = this;
        return {
            dataField: "byday",
            colSpan: 2,
            template: function(_, itemElement) {
                var firstDayOfWeek = _this3._getFirstDayOfWeek();
                var byDay = _this3._daysOfWeekByRules();
                var localDaysNames = _date2.default.getDayNames("abbreviated");
                var dayNames = days.slice(firstDayOfWeek).concat(days.slice(0, firstDayOfWeek));
                var itemsButtonGroup = localDaysNames.slice(firstDayOfWeek).concat(localDaysNames.slice(0, firstDayOfWeek)).map(function(item, index) {
                    return {
                        text: item,
                        key: dayNames[index]
                    }
                });
                _this3._$repeatOnWeek = (0, _renderer.default)("<div>").addClass(RECURRENCE_BUTTON_GROUP).appendTo(itemElement);
                _this3._weekEditor = _this3._createComponent(_this3._$repeatOnWeek, _button_group.default, {
                    items: itemsButtonGroup,
                    field: "byday",
                    selectionMode: "multiple",
                    selectedItemKeys: byDay,
                    keyExpr: "key",
                    onSelectionChanged: function(e) {
                        var selectedKeys = e.component.option("selectedItemKeys");
                        _this3._recurrenceRule.makeRule("byday", selectedKeys);
                        _this3._changeEditorValue()
                    }
                })
            },
            visible: "weekly" === freq,
            label: {
                visible: false
            }
        }
    };
    _proto2._createByMonthEditor = function(freq) {
        var _this4 = this;
        var monthsName = _date2.default.getMonthNames("wide");
        var months = _toConsumableArray(Array(12)).map(function(_, i) {
            return {
                value: "".concat(i + 1),
                text: monthsName[i]
            }
        });
        return {
            dataField: "bymonth",
            editorType: "dxSelectBox",
            editorOptions: {
                field: "bymonth",
                items: months,
                value: this._monthOfYearByRules(),
                width: recurrentEditorSelectBoxWidth,
                displayExpr: "text",
                valueExpr: "value",
                elementAttr: {
                    "class": MONTH_OF_YEAR
                },
                onValueChanged: function(args) {
                    return _this4._valueChangedHandler(args)
                }
            },
            visible: "yearly" === freq,
            label: {
                visible: false
            }
        }
    };
    _proto2._createByMonthDayEditor = function(freq) {
        var _this5 = this;
        return {
            dataField: "bymonthday",
            editorType: "dxNumberBox",
            editorOptions: {
                min: 1,
                max: 31,
                width: recurrentEditorNumberBoxWidth,
                field: "bymonthday",
                showSpinButtons: true,
                useLargeSpinButtons: false,
                value: this._dayOfMonthByRules(),
                elementAttr: {
                    "class": DAY_OF_MONTH
                },
                onValueChanged: function(args) {
                    return _this5._valueChangedHandler(args)
                }
            },
            visible: "monthly" === freq || "yearly" === freq,
            label: {
                visible: false
            }
        }
    };
    _proto2._createRepeatEndEditor = function() {
        var _this6 = this;
        var repeatType = this._recurrenceRule.getRepeatEndRule();
        return [{
            dataField: "repeatEnd",
            editorType: "dxRadioGroup",
            editorOptions: {
                items: repeatEndTypes,
                value: repeatType,
                valueExpr: "type",
                field: "repeatEnd",
                itemTemplate: function(itemData) {
                    if ("count" === itemData.type) {
                        return _this6._renderRepeatCountEditor()
                    }
                    if ("until" === itemData.type) {
                        return _this6._renderRepeatUntilEditor()
                    }
                    return _this6._renderDefaultRepeatEnd()
                },
                layout: "vertical",
                elementAttr: {
                    "class": REPEAT_END_TYPE_EDITOR
                },
                onValueChanged: function(args) {
                    return _this6._repeatEndValueChangedHandler(args)
                }
            },
            label: {
                text: _message.default.format("dxScheduler-recurrenceEnd")
            }
        }]
    };
    _proto2._renderEditors = function($container) {
        this._recurrenceForm = this._createComponent($container, _form.default, {
            items: this._editors,
            showValidationSummary: true,
            scrollingEnabled: true,
            showColonAfterLabel: false,
            labelLocation: "top"
        });
        this._disableRepeatEndParts()
    };
    _proto2._setAriaDescribedBy = function(editor, $label) {
        var labelId = "label-".concat(new _guid.default);
        editor.setAria("describedby", labelId);
        editor.setAria("id", labelId, $label)
    };
    _proto2.getRecurrenceForm = function() {
        return this._recurrenceForm
    };
    _proto2.changeValueByVisibility = function(value) {
        if (value) {
            if (!this.option("value")) {
                this._handleDefaults()
            }
        } else {
            this._recurrenceRule.makeRules("");
            this.option("value", "")
        }
    };
    _proto2._handleDefaults = function() {
        this._recurrenceRule.makeRule("freq", frequenciesMessages[defaultRecurrenceTypeIndex].value);
        this._changeEditorValue()
    };
    _proto2._changeEditorValue = function() {
        this.option("value", this._recurrenceRule.getRecurrenceString() || "")
    };
    _proto2._daysOfWeekByRules = function() {
        var daysByRule = this._recurrenceRule.getDaysFromByDayRule();
        if (!daysByRule.length) {
            daysByRule = [days[this.option("startDate").getDay()]]
        }
        return daysByRule
    };
    _proto2._dayOfMonthByRules = function() {
        var dayByRule = this._recurrenceRule.getRules().bymonthday;
        if (!dayByRule) {
            dayByRule = this.option("startDate").getDate()
        }
        return dayByRule
    };
    _proto2._monthOfYearByRules = function() {
        var monthByRule = this._recurrenceRule.getRules().bymonth;
        if (!monthByRule) {
            monthByRule = this.option("startDate").getMonth() + 1
        }
        return String(monthByRule)
    };
    _proto2._renderDefaultRepeatEnd = function() {
        var $editorTemplate = (0, _renderer.default)("<div>").addClass(REPEAT_END_EDITOR + WRAPPER_POSTFIX);
        (0, _renderer.default)("<div>").text(_message.default.format("dxScheduler-recurrenceNever")).addClass(REPEAT_END_EDITOR + LABEL_POSTFIX).appendTo($editorTemplate);
        return $editorTemplate
    };
    _proto2._repeatEndValueChangedHandler = function(args) {
        var value = args.value;
        this._disableRepeatEndParts(value);
        if ("until" === value) {
            this._recurrenceRule.makeRule(value, this._getUntilValue())
        }
        if ("count" === value) {
            this._recurrenceRule.makeRule(value, this._repeatCountEditor.option("value"))
        }
        if ("never" === value) {
            this._recurrenceRule.makeRule("count", "");
            this._recurrenceRule.makeRule("until", "")
        }
        this._changeEditorValue()
    };
    _proto2._disableRepeatEndParts = function() {
        var value = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : this._recurrenceRule.getRepeatEndRule();
        if ("until" === value) {
            this._repeatCountEditor.option("disabled", true);
            this._repeatUntilDate.option("disabled", false)
        }
        if ("count" === value) {
            this._repeatCountEditor.option("disabled", false);
            this._repeatUntilDate.option("disabled", true)
        }
        if ("never" === value) {
            this._repeatCountEditor.option("disabled", true);
            this._repeatUntilDate.option("disabled", true)
        }
    };
    _proto2._renderRepeatCountEditor = function() {
        var repeatCount = this._recurrenceRule.getRules().count || 1;
        var $editorWrapper = (0, _renderer.default)("<div>").addClass(REPEAT_END_EDITOR + WRAPPER_POSTFIX);
        (0, _renderer.default)("<div>").text(_message.default.format("dxScheduler-recurrenceAfter")).addClass(REPEAT_END_EDITOR + LABEL_POSTFIX).appendTo($editorWrapper);
        this._$repeatCountEditor = (0, _renderer.default)("<div>").addClass(REPEAT_COUNT_EDITOR).appendTo($editorWrapper);
        (0, _renderer.default)("<div>").text(_message.default.format("dxScheduler-recurrenceRepeatCount")).addClass(REPEAT_END_EDITOR + LABEL_POSTFIX).appendTo($editorWrapper);
        this._repeatCountEditor = this._createComponent(this._$repeatCountEditor, _number_box.default, {
            field: "count",
            width: recurrentEditorNumberBoxWidth,
            min: 1,
            showSpinButtons: true,
            useLargeSpinButtons: false,
            value: repeatCount,
            onValueChanged: this._repeatCountValueChangeHandler.bind(this)
        });
        return $editorWrapper
    };
    _proto2._repeatCountValueChangeHandler = function(args) {
        if ("count" === this._recurrenceRule.getRepeatEndRule()) {
            var value = args.value;
            this._recurrenceRule.makeRule("count", value);
            this._changeEditorValue()
        }
    };
    _proto2._formatUntilDate = function(date) {
        if (this._recurrenceRule.getRules().until && _date.default.sameDate(this._recurrenceRule.getRules().until, date)) {
            return date
        }
        return _date.default.setToDayEnd(date)
    };
    _proto2._renderRepeatUntilEditor = function() {
        var repeatUntil = this._recurrenceRule.getRules().until || this._formatUntilDate(new Date);
        var $editorWrapper = (0, _renderer.default)("<div>").addClass(REPEAT_END_EDITOR + WRAPPER_POSTFIX);
        (0, _renderer.default)("<div>").text(_message.default.format("dxScheduler-recurrenceOn")).addClass(REPEAT_END_EDITOR + LABEL_POSTFIX).appendTo($editorWrapper);
        this._$repeatDateEditor = (0, _renderer.default)("<div>").addClass(REPEAT_UNTIL_DATE_EDITOR).appendTo($editorWrapper);
        this._repeatUntilDate = this._createComponent(this._$repeatDateEditor, _date_box.default, {
            field: "until",
            value: repeatUntil,
            type: "date",
            onValueChanged: this._repeatUntilValueChangeHandler.bind(this),
            calendarOptions: {
                firstDayOfWeek: this._getFirstDayOfWeek()
            }
        });
        return $editorWrapper
    };
    _proto2._repeatUntilValueChangeHandler = function(args) {
        if ("until" === this._recurrenceRule.getRepeatEndRule()) {
            var untilDate = this._formatUntilDate(new Date(args.value));
            this._repeatUntilDate.option("value", untilDate);
            this._recurrenceRule.makeRule("until", untilDate);
            this._changeEditorValue()
        }
    };
    _proto2._valueChangedHandler = function(args) {
        var value = args.value,
            previousValue = args.previousValue;
        var field = args.component.option("field");
        if (!this.option("visible")) {
            this.option("value", "")
        } else {
            this._recurrenceRule.makeRule(field, value);
            if ("freq" === field) {
                this._makeRepeatOnRule(value);
                this._changeRepeatOnVisibility(value, previousValue)
            }
            this._changeEditorValue()
        }
    };
    _proto2._makeRepeatOnRule = function(value) {
        if ("daily" === value || "hourly" === value) {
            this._recurrenceRule.makeRule("byday", "");
            this._recurrenceRule.makeRule("bymonth", "");
            this._recurrenceRule.makeRule("bymonthday", "")
        }
        if ("weekly" === value) {
            this._recurrenceRule.makeRule("byday", this._daysOfWeekByRules());
            this._recurrenceRule.makeRule("bymonth", "");
            this._recurrenceRule.makeRule("bymonthday", "")
        }
        if ("monthly" === value) {
            this._recurrenceRule.makeRule("bymonthday", this._dayOfMonthByRules());
            this._recurrenceRule.makeRule("bymonth", "");
            this._recurrenceRule.makeRule("byday", "")
        }
        if ("yearly" === value) {
            this._recurrenceRule.makeRule("bymonthday", this._dayOfMonthByRules());
            this._recurrenceRule.makeRule("bymonth", this._monthOfYearByRules());
            this._recurrenceRule.makeRule("byday", "")
        }
    };
    _proto2._optionChanged = function(args) {
        switch (args.name) {
            case "value":
                this._recurrenceRule.makeRules(args.value);
                this._changeRepeatIntervalLabel();
                this._disableRepeatEndParts();
                this._changeEditorsValue(this._recurrenceRule.getRules());
                _Editor.prototype._optionChanged.call(this, args);
                break;
            case "startDate":
                this._makeRepeatOnRule(this._recurrenceRule.getRules().freq);
                if ((0, _type.isDefined)(this._recurrenceRule.getRecurrenceString())) {
                    this._changeEditorValue()
                }
                break;
            case "firstDayOfWeek":
                if (this._weekEditor) {
                    var localDaysNames = _date2.default.getDayNames("abbreviated");
                    var dayNames = days.slice(args.value).concat(days.slice(0, args.value));
                    var itemsButtonGroup = localDaysNames.slice(args.value).concat(localDaysNames.slice(0, args.value)).map(function(item, index) {
                        return {
                            text: item,
                            key: dayNames[index]
                        }
                    });
                    this._weekEditor.option("items", itemsButtonGroup)
                }
                if (this._$repeatDateEditor) {
                    this._repeatUntilDate.option("calendarOptions.firstDayOfWeek", this._getFirstDayOfWeek())
                }
                break;
            default:
                _Editor.prototype._optionChanged.call(this, args)
        }
    };
    _proto2._changeRepeatOnVisibility = function(freq, previousFreq) {
        if (freq !== previousFreq) {
            this._recurrenceForm.itemOption("byday", "visible", false);
            this._recurrenceForm.itemOption("bymonthday", "visible", false);
            this._recurrenceForm.itemOption("bymonth", "visible", false);
            this._recurrenceForm.itemOption("repeatOnLabel", "visible", freq && "daily" !== freq && "hourly" !== freq);
            if ("weekly" === freq) {
                this._recurrenceForm.itemOption("byday", "visible", true)
            }
            if ("monthly" === freq) {
                this._recurrenceForm.itemOption("bymonthday", "visible", true)
            }
            if ("yearly" === freq) {
                this._recurrenceForm.itemOption("bymonthday", "visible", true);
                this._recurrenceForm.itemOption("bymonth", "visible", true)
            }
        }
    };
    _proto2._changeRepeatIntervalLabel = function() {
        var freq = this._recurrenceRule.getRules().freq;
        freq && this._recurrenceForm.itemOption("intervalLabel", "template", _message.default.format("dxScheduler-recurrenceRepeat".concat(freq.charAt(0).toUpperCase()).concat(freq.substr(1).toLowerCase())))
    };
    _proto2._changeEditorsValue = function(rules) {
        this._recurrenceForm.getEditor("freq").option("value", (rules.freq || frequenciesMessages[defaultRecurrenceTypeIndex].value).toLowerCase());
        this._changeDayOfWeekValue();
        this._changeDayOfMonthValue();
        this._changeMonthOfYearValue();
        this._changeIntervalValue(rules.interval);
        this._changeRepeatCountValue();
        this._changeRepeatEndValue();
        this._changeRepeatUntilValue()
    };
    _proto2._changeIntervalValue = function(value) {
        this._recurrenceForm.getEditor("interval").option("value", value || 1)
    };
    _proto2._changeRepeatEndValue = function() {
        var repeatType = this._recurrenceRule.getRepeatEndRule();
        this._recurrenceForm.getEditor("repeatEnd").option("value", repeatType)
    };
    _proto2._changeDayOfWeekValue = function() {
        var isEditorVisible = this._recurrenceForm.itemOption("byday").visible;
        if (isEditorVisible) {
            var _days = this._daysOfWeekByRules();
            this.getEditorByField("byday").option("selectedItemKeys", _days)
        }
    };
    _proto2._changeDayOfMonthValue = function() {
        var isEditorVisible = this._recurrenceForm.itemOption("bymonthday").visible;
        if (isEditorVisible) {
            var day = this._dayOfMonthByRules();
            this._recurrenceForm.getEditor("bymonthday").option("value", day)
        }
    };
    _proto2._changeMonthOfYearValue = function() {
        var isEditorVisible = this._recurrenceForm.itemOption("bymonth").visible;
        if (isEditorVisible) {
            var month = this._monthOfYearByRules();
            this._recurrenceForm.getEditor("bymonth").option("value", month)
        }
    };
    _proto2._changeRepeatCountValue = function() {
        var count = this._recurrenceRule.getRules().count || 1;
        this._repeatCountEditor.option("value", count)
    };
    _proto2._changeRepeatUntilValue = function() {
        this._repeatUntilDate.option("value", this._getUntilValue())
    };
    _proto2._getUntilValue = function() {
        return this._recurrenceRule.getRules().until || this._formatUntilDate(new Date)
    };
    _proto2.toggle = function() {
        this._freqEditor.focus()
    };
    _proto2.setAria = function() {
        if (this._switchEditor) {
            this._switchEditor.setAria(arguments.length <= 0 ? void 0 : arguments[0], arguments.length <= 1 ? void 0 : arguments[1])
        }
    };
    return RecurrenceEditor
}(_editor.default);
(0, _component_registrator.default)("dxRecurrenceEditor", RecurrenceEditor);
var _default = RecurrenceEditor;
exports.default = _default;
module.exports = exports.default;
