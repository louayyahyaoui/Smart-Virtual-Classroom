/**
 * DevExtreme (ui/date_box/ui.date_view.js)
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
var _ui = _interopRequireDefault(require("./ui.date_view_roller"));
var _date = _interopRequireDefault(require("../../core/utils/date"));
var _iterator = require("../../core/utils/iterator");
var _extend = require("../../core/utils/extend");
var _ui2 = _interopRequireDefault(require("./ui.date_utils"));
var _component_registrator = _interopRequireDefault(require("../../core/component_registrator"));
var _date2 = _interopRequireDefault(require("../../localization/date"));

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        "default": obj
    }
}
var DATEVIEW_CLASS = "dx-dateview";
var DATEVIEW_COMPACT_CLASS = "dx-dateview-compact";
var DATEVIEW_WRAPPER_CLASS = "dx-dateview-wrapper";
var DATEVIEW_ROLLER_CONTAINER_CLASS = "dx-dateview-rollers";
var DATEVIEW_ROLLER_CLASS = "dx-dateviewroller";
var TYPE = {
    date: "date",
    datetime: "datetime",
    time: "time"
};
var ROLLER_TYPE = {
    year: "year",
    month: "month",
    day: "day",
    hours: "hours"
};
var DateView = _editor.default.inherit({
    _valueOption: function() {
        var value = this.option("value");
        var date = new Date(value);
        return !value || isNaN(date) ? this._getDefaultDate() : date
    },
    _getDefaultDate: function() {
        var date = new Date;
        if (this.option("type") === TYPE.date) {
            return new Date(date.getFullYear(), date.getMonth(), date.getDate())
        }
        return date
    },
    _getDefaultOptions: function() {
        return (0, _extend.extend)(this.callBase(), {
            minDate: _ui2.default.MIN_DATEVIEW_DEFAULT_DATE,
            maxDate: _ui2.default.MAX_DATEVIEW_DEFAULT_DATE,
            type: TYPE.date,
            value: new Date,
            applyCompactClass: false
        })
    },
    _defaultOptionsRules: function() {
        return this.callBase().concat([{
            device: function(_device) {
                return "desktop" !== _device.deviceType
            },
            options: {
                applyCompactClass: true
            }
        }])
    },
    _render: function() {
        this.callBase();
        this.$element().addClass(DATEVIEW_CLASS);
        this._toggleFormatClasses(this.option("type"));
        this._toggleCompactClass()
    },
    _toggleFormatClasses: function(currentFormat, previousFormat) {
        this.$element().addClass(DATEVIEW_CLASS + "-" + currentFormat);
        previousFormat && this.$element().removeClass(DATEVIEW_CLASS + "-" + previousFormat)
    },
    _toggleCompactClass: function() {
        this.$element().toggleClass(DATEVIEW_COMPACT_CLASS, this.option("applyCompactClass"))
    },
    _wrapper: function() {
        return this._$wrapper
    },
    _renderContentImpl: function() {
        this._$wrapper = (0, _renderer.default)("<div>").addClass(DATEVIEW_WRAPPER_CLASS);
        this._renderRollers();
        this._$wrapper.appendTo(this.$element())
    },
    _renderRollers: function() {
        if (!this._$rollersContainer) {
            this._$rollersContainer = (0, _renderer.default)("<div>").addClass(DATEVIEW_ROLLER_CONTAINER_CLASS)
        }
        this._$rollersContainer.empty();
        this._createRollerConfigs();
        this._rollers = {};
        var that = this;
        (0, _iterator.each)(that._rollerConfigs, function(name) {
            var $roller = (0, _renderer.default)("<div>").appendTo(that._$rollersContainer).addClass(DATEVIEW_ROLLER_CLASS + "-" + that._rollerConfigs[name].type);
            that._rollers[that._rollerConfigs[name].type] = that._createComponent($roller, _ui.default, {
                items: that._rollerConfigs[name].displayItems,
                selectedIndex: that._rollerConfigs[name].selectedIndex,
                showScrollbar: false,
                onStart: function(e) {
                    var roller = e.component;
                    roller._toggleActive(true);
                    that._setActiveRoller(that._rollerConfigs[name], roller.option("selectedIndex"))
                },
                onEnd: function(e) {
                    var roller = e.component;
                    roller._toggleActive(false)
                },
                onClick: function(e) {
                    var roller = e.component;
                    roller._toggleActive(true);
                    that._setActiveRoller(that._rollerConfigs[name], roller.option("selectedIndex"));
                    that._setRollerState(that._rollerConfigs[name], roller.option("selectedIndex"));
                    roller._toggleActive(false)
                },
                onSelectedIndexChanged: function(e) {
                    var roller = e.component;
                    that._setRollerState(that._rollerConfigs[name], roller.option("selectedIndex"))
                }
            })
        });
        that._$rollersContainer.appendTo(that._wrapper())
    },
    _createRollerConfigs: function(type) {
        var that = this;
        type = type || that.option("type");
        that._rollerConfigs = {};
        _date2.default.getFormatParts(_ui2.default.FORMATS_MAP[type]).forEach(function(partName) {
            that._createRollerConfig(partName)
        })
    },
    _createRollerConfig: function(componentName) {
        var componentInfo = _ui2.default.DATE_COMPONENTS_INFO[componentName];
        var valueRange = this._calculateRollerConfigValueRange(componentName);
        var startValue = valueRange.startValue;
        var endValue = valueRange.endValue;
        var formatter = componentInfo.formatter;
        var curDate = this._getCurrentDate();
        var config = {
            type: componentName,
            setValue: componentInfo.setter,
            valueItems: [],
            displayItems: [],
            getIndex: function(value) {
                return value[componentInfo.getter]() - startValue
            }
        };
        for (var i = startValue; i <= endValue; i++) {
            config.valueItems.push(i);
            config.displayItems.push(formatter(i, curDate))
        }
        config.selectedIndex = config.getIndex(curDate);
        this._rollerConfigs[componentName] = config
    },
    _setActiveRoller: function(currentRoller) {
        var activeRoller = currentRoller && this._rollers[currentRoller.type];
        (0, _iterator.each)(this._rollers, function() {
            this.toggleActiveState(this === activeRoller)
        })
    },
    _updateRollersPosition: function() {
        var that = this;
        (0, _iterator.each)(this._rollers, function(type) {
            var correctIndex = that._rollerConfigs[type].getIndex(that._getCurrentDate());
            this.option("selectedIndex", correctIndex)
        })
    },
    _setRollerState: function(roller, selectedIndex) {
        if (selectedIndex !== roller.selectedIndex) {
            var rollerValue = roller.valueItems[selectedIndex];
            var setValue = roller.setValue;
            var currentValue = new Date(this._getCurrentDate());
            var currentDate = currentValue.getDate();
            var minDate = this.option("minDate");
            var maxDate = this.option("maxDate");
            if (roller.type === ROLLER_TYPE.month) {
                currentDate = Math.min(currentDate, _ui2.default.getMaxMonthDay(currentValue.getFullYear(), rollerValue))
            } else {
                if (roller.type === ROLLER_TYPE.year) {
                    currentDate = Math.min(currentDate, _ui2.default.getMaxMonthDay(rollerValue, currentValue.getMonth()))
                }
            }
            currentValue.setDate(currentDate);
            currentValue[setValue](rollerValue);
            var normalizedDate = _date.default.normalizeDate(currentValue, minDate, maxDate);
            currentValue = _ui2.default.mergeDates(normalizedDate, currentValue, "time");
            currentValue = _date.default.normalizeDate(currentValue, minDate, maxDate);
            this.option("value", currentValue);
            roller.selectedIndex = selectedIndex
        }
        if (roller.type === ROLLER_TYPE.year) {
            this._refreshRollers()
        }
        if (roller.type === ROLLER_TYPE.month) {
            this._refreshRoller(ROLLER_TYPE.day);
            this._refreshRoller(ROLLER_TYPE.hours)
        }
    },
    _refreshRoller: function(rollerType) {
        var roller = this._rollers[rollerType];
        if (roller) {
            this._createRollerConfig(rollerType);
            var rollerConfig = this._rollerConfigs[rollerType];
            if (rollerType === ROLLER_TYPE.day || rollerConfig.displayItems.toString() !== roller.option("items").toString()) {
                roller.option({
                    items: rollerConfig.displayItems,
                    selectedIndex: rollerConfig.selectedIndex
                })
            }
        }
    },
    _getCurrentDate: function() {
        var curDate = this._valueOption();
        var minDate = this.option("minDate");
        var maxDate = this.option("maxDate");
        return _date.default.normalizeDate(curDate, minDate, maxDate)
    },
    _calculateRollerConfigValueRange: function(componentName) {
        var curDate = this._getCurrentDate();
        var minDate = this.option("minDate");
        var maxDate = this.option("maxDate");
        var minYear = _date.default.sameYear(curDate, minDate);
        var minMonth = minYear && curDate.getMonth() === minDate.getMonth();
        var maxYear = _date.default.sameYear(curDate, maxDate);
        var maxMonth = maxYear && curDate.getMonth() === maxDate.getMonth();
        var minHour = minMonth && curDate.getDate() === minDate.getDate();
        var maxHour = maxMonth && curDate.getDate() === maxDate.getDate();
        var componentInfo = _ui2.default.DATE_COMPONENTS_INFO[componentName];
        var startValue = componentInfo.startValue;
        var endValue = componentInfo.endValue;
        if (componentName === ROLLER_TYPE.year) {
            startValue = minDate.getFullYear();
            endValue = maxDate.getFullYear()
        }
        if (componentName === ROLLER_TYPE.month) {
            if (minYear) {
                startValue = minDate.getMonth()
            }
            if (maxYear) {
                endValue = maxDate.getMonth()
            }
        }
        if (componentName === ROLLER_TYPE.day) {
            endValue = _ui2.default.getMaxMonthDay(curDate.getFullYear(), curDate.getMonth());
            if (minYear && minMonth) {
                startValue = minDate.getDate()
            }
            if (maxYear && maxMonth) {
                endValue = maxDate.getDate()
            }
        }
        if (componentName === ROLLER_TYPE.hours) {
            startValue = minHour ? minDate.getHours() : startValue;
            endValue = maxHour ? maxDate.getHours() : endValue
        }
        return {
            startValue: startValue,
            endValue: endValue
        }
    },
    _refreshRollers: function() {
        this._refreshRoller(ROLLER_TYPE.month);
        this._refreshRoller(ROLLER_TYPE.day);
        this._refreshRoller(ROLLER_TYPE.hours)
    },
    _optionChanged: function(args) {
        switch (args.name) {
            case "minDate":
            case "maxDate":
            case "type":
                this._renderRollers();
                this._toggleFormatClasses(args.value, args.previousValue);
                break;
            case "visible":
                this.callBase(args);
                if (args.value) {
                    this._renderRollers()
                }
                break;
            case "value":
                this.option("value", this._valueOption());
                this._refreshRollers();
                this._updateRollersPosition();
                break;
            default:
                this.callBase(args)
        }
    },
    _clean: function() {
        this.callBase();
        delete this._$rollersContainer
    }
});
(0, _component_registrator.default)("dxDateView", DateView);
var _default = DateView;
exports.default = _default;
module.exports = exports.default;
