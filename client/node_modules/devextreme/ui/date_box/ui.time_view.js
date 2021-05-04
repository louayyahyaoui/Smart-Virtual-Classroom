/**
 * DevExtreme (ui/date_box/ui.time_view.js)
 * Version: 20.2.6
 * Build date: Tue Mar 16 2021
 *
 * Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
exports.default = void 0;
var _renderer = _interopRequireDefault(require("../../core/renderer"));
var _editor = _interopRequireDefault(require("../editor/editor"));
var _number_box = _interopRequireDefault(require("../number_box"));
var _select_box = _interopRequireDefault(require("../select_box"));
var _box = _interopRequireDefault(require("../box"));
var _extend = require("../../core/utils/extend");
var _component_registrator = _interopRequireDefault(require("../../core/component_registrator"));
var _date = _interopRequireDefault(require("../../localization/date"));
var _ui = _interopRequireDefault(require("./ui.date_utils"));

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        "default": obj
    }
}
var TIMEVIEW_CLASS = "dx-timeview";
var TIMEVIEW_CLOCK_CLASS = "dx-timeview-clock";
var TIMEVIEW_FIELD_CLASS = "dx-timeview-field";
var TIMEVIEW_HOURARROW_CLASS = "dx-timeview-hourarrow";
var TIMEVIEW_TIME_SEPARATOR_CLASS = "dx-timeview-time-separator";
var TIMEVIEW_FORMAT12_CLASS = "dx-timeview-format12";
var TIMEVIEW_FORMAT12_AM = -1;
var TIMEVIEW_FORMAT12_PM = 1;
var TIMEVIEW_MINUTEARROW_CLASS = "dx-timeview-minutearrow";
var rotateArrow = function($arrow, angle, offset) {
    cssRotate($arrow, angle, offset)
};
var cssRotate = function($arrow, angle, offset) {
    $arrow.css("transform", "rotate(" + angle + "deg) translate(0," + offset + "px)")
};
var TimeView = _editor.default.inherit({
    _getDefaultOptions: function() {
        return (0, _extend.extend)(this.callBase(), {
            value: new Date(Date.now()),
            use24HourFormat: true,
            _showClock: true,
            _arrowOffset: 0,
            stylingMode: void 0
        })
    },
    _defaultOptionsRules: function() {
        return this.callBase().concat([{
            device: {
                platform: "android"
            },
            options: {
                _arrowOffset: 15
            }
        }, {
            device: {
                platform: "generic"
            },
            options: {
                _arrowOffset: 5
            }
        }])
    },
    _getValue: function() {
        return this.option("value") || new Date
    },
    _init: function() {
        this.callBase();
        this.$element().addClass(TIMEVIEW_CLASS)
    },
    _render: function() {
        this.callBase();
        this._renderBox();
        this._updateTime()
    },
    _renderBox: function() {
        var $box = (0, _renderer.default)("<div>").appendTo(this.$element());
        var items = [];
        if (this.option("_showClock")) {
            items.push({
                ratio: 1,
                shrink: 0,
                baseSize: "auto",
                template: this._renderClock.bind(this)
            })
        }
        items.push({
            ratio: 0,
            shrink: 0,
            baseSize: 50,
            template: this._renderField.bind(this)
        });
        this._createComponent($box, _box.default, {
            height: "100%",
            width: "100%",
            direction: "col",
            items: items
        })
    },
    _renderClock: function(_, __, container) {
        this._$hourArrow = (0, _renderer.default)("<div>").addClass(TIMEVIEW_HOURARROW_CLASS);
        this._$minuteArrow = (0, _renderer.default)("<div>").addClass(TIMEVIEW_MINUTEARROW_CLASS);
        var $container = (0, _renderer.default)(container);
        $container.addClass(TIMEVIEW_CLOCK_CLASS).append(this._$hourArrow).append(this._$minuteArrow);
        this.setAria("role", "presentation", $container)
    },
    _updateClock: function() {
        var time = this._getValue();
        var hourArrowAngle = time.getHours() / 12 * 360 + time.getMinutes() / 60 * 30;
        var minuteArrowAngle = time.getMinutes() / 60 * 360;
        rotateArrow(this._$hourArrow, hourArrowAngle, this.option("_arrowOffset"));
        rotateArrow(this._$minuteArrow, minuteArrowAngle, this.option("_arrowOffset"))
    },
    _getBoxItems: function(is12HourFormat) {
        var _this = this;
        var items = [{
            ratio: 0,
            shrink: 0,
            baseSize: "auto",
            template: function() {
                return _this._hourBox.$element()
            }
        }, {
            ratio: 0,
            shrink: 0,
            baseSize: "auto",
            template: (0, _renderer.default)("<div>").addClass(TIMEVIEW_TIME_SEPARATOR_CLASS).text(_date.default.getTimeSeparator())
        }, {
            ratio: 0,
            shrink: 0,
            baseSize: "auto",
            template: function() {
                return _this._minuteBox.$element()
            }
        }];
        if (is12HourFormat) {
            items.push({
                ratio: 0,
                shrink: 0,
                baseSize: "auto",
                template: function() {
                    return _this._format12.$element()
                }
            })
        }
        return items
    },
    _renderField: function() {
        var is12HourFormat = !this.option("use24HourFormat");
        this._createHourBox(is12HourFormat);
        this._createMinuteBox();
        if (is12HourFormat) {
            this._createFormat12Box()
        }
        return this._createComponent((0, _renderer.default)("<div>").addClass(TIMEVIEW_FIELD_CLASS), _box.default, {
            direction: "row",
            align: "center",
            crossAlign: "center",
            items: this._getBoxItems(is12HourFormat)
        }).$element()
    },
    _createHourBox: function(is12HourFormat) {
        var _this2 = this;
        var editor = this._hourBox = this._createComponent((0, _renderer.default)("<div>"), _number_box.default, (0, _extend.extend)({
            min: -1,
            max: is12HourFormat ? 12 : 24,
            value: this._getValue().getHours(),
            onValueChanged: this._onHourBoxValueChanged.bind(this),
            onKeyboardHandled: function(opts) {
                return _this2._keyboardHandler(opts)
            }
        }, this._getNumberBoxConfig()));
        editor.setAria("label", "hours")
    },
    _isPM: function() {
        return !this.option("use24HourFormat") && 1 === this._format12.option("value")
    },
    _onHourBoxValueChanged: function(args) {
        var currentValue = this._getValue();
        var newValue = new Date(currentValue);
        var newHours = this._convertMaxHourToMin(args.value);
        if (this._isPM()) {
            newHours += 12
        }
        newValue.setHours(newHours);
        _ui.default.normalizeTime(newValue);
        this.option("value", newValue)
    },
    _convertMaxHourToMin: function(hours) {
        var maxHoursValue = this.option("use24HourFormat") ? 24 : 12;
        return (maxHoursValue + hours) % maxHoursValue
    },
    _createMinuteBox: function() {
        var _this3 = this;
        var editor = this._minuteBox = this._createComponent((0, _renderer.default)("<div>"), _number_box.default, (0, _extend.extend)({
            min: -1,
            max: 60,
            value: this._getValue().getMinutes(),
            onKeyboardHandled: function(opts) {
                return _this3._keyboardHandler(opts)
            },
            onValueChanged: function(_ref) {
                var value = _ref.value,
                    component = _ref.component;
                var newMinutes = (60 + value) % 60;
                component.option("value", newMinutes);
                var time = new Date(_this3._getValue());
                time.setMinutes(newMinutes);
                _ui.default.normalizeTime(time);
                _this3.option("value", time)
            }
        }, this._getNumberBoxConfig()));
        editor.setAria("label", "minutes")
    },
    _createFormat12Box: function() {
        var _this4 = this;
        var periodNames = _date.default.getPeriodNames();
        var editor = this._format12 = this._createComponent((0, _renderer.default)("<div>").addClass(TIMEVIEW_FORMAT12_CLASS), _select_box.default, {
            items: [{
                value: TIMEVIEW_FORMAT12_AM,
                text: periodNames[0]
            }, {
                value: TIMEVIEW_FORMAT12_PM,
                text: periodNames[1]
            }],
            valueExpr: "value",
            displayExpr: "text",
            onKeyboardHandled: function(opts) {
                return _this4._keyboardHandler(opts)
            },
            onValueChanged: function(_ref2) {
                var value = _ref2.value;
                var hours = _this4._getValue().getHours();
                var time = new Date(_this4._getValue());
                var newHours = (hours + 12 * value) % 24;
                time.setHours(newHours);
                _this4.option("value", time)
            },
            value: this._getValue().getHours() >= 12 ? TIMEVIEW_FORMAT12_PM : TIMEVIEW_FORMAT12_AM,
            stylingMode: this.option("stylingMode")
        });
        editor.setAria("label", "type")
    },
    _refreshFormat12: function() {
        if (this.option("use24HourFormat")) {
            return
        }
        var value = this._getValue();
        var hours = value.getHours();
        var isPM = hours >= 12;
        var newValue = isPM ? TIMEVIEW_FORMAT12_PM : TIMEVIEW_FORMAT12_AM;
        this._silentEditorValueUpdate(this._format12, newValue)
    },
    _silentEditorValueUpdate: function(editor, value) {
        if (editor) {
            editor._suppressValueChangeAction();
            editor.option("value", value);
            editor._resumeValueChangeAction()
        }
    },
    _getNumberBoxConfig: function() {
        return {
            showSpinButtons: true,
            displayValueFormatter: function(value) {
                return (value < 10 ? "0" : "") + value
            },
            stylingMode: this.option("stylingMode")
        }
    },
    _normalizeHours: function(hours) {
        return this.option("use24HourFormat") ? hours : hours % 12 || 12
    },
    _updateField: function() {
        var hours = this._normalizeHours(this._getValue().getHours());
        this._silentEditorValueUpdate(this._hourBox, hours);
        this._silentEditorValueUpdate(this._minuteBox, this._getValue().getMinutes());
        this._refreshFormat12()
    },
    _updateTime: function() {
        if (this.option("_showClock")) {
            this._updateClock()
        }
        this._updateField()
    },
    _visibilityChanged: function(visible) {
        if (visible) {
            this._updateTime()
        }
    },
    _optionChanged: function(args) {
        switch (args.name) {
            case "value":
                this._updateTime();
                this.callBase(args);
                break;
            case "_arrowOffset":
                break;
            case "use24HourFormat":
            case "_showClock":
            case "stylingMode":
                this._invalidate();
                break;
            default:
                this.callBase(args)
        }
    }
});
(0, _component_registrator.default)("dxTimeView", TimeView);
var _default = TimeView;
exports.default = _default;
module.exports = exports.default;
