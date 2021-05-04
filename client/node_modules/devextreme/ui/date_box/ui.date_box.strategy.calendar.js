/**
 * DevExtreme (ui/date_box/ui.date_box.strategy.calendar.js)
 * Version: 20.2.6
 * Build date: Tue Mar 16 2021
 *
 * Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
exports.default = void 0;
var _calendar = _interopRequireDefault(require("../calendar"));
var _uiDate_box = _interopRequireDefault(require("./ui.date_box.strategy"));
var _date = _interopRequireDefault(require("../../core/utils/date"));
var _common = require("../../core/utils/common");
var _type = require("../../core/utils/type");
var _extend = require("../../core/utils/extend");
var _message = _interopRequireDefault(require("../../localization/message"));

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        "default": obj
    }
}
var CalendarStrategy = _uiDate_box.default.inherit({
    NAME: "Calendar",
    supportedKeys: function() {
        var homeEndHandler = function(e) {
            if (this.option("opened")) {
                e.preventDefault();
                return true
            }
            return false
        };
        return {
            rightArrow: function() {
                if (this.option("opened")) {
                    return true
                }
            },
            leftArrow: function() {
                if (this.option("opened")) {
                    return true
                }
            },
            enter: function(e) {
                if (this.dateBox.option("opened")) {
                    e.preventDefault();
                    if (this._widget.option("zoomLevel") === this._widget.option("maxZoomLevel")) {
                        var viewValue = this._getContouredValue();
                        var lastActionElement = this._lastActionElement;
                        if (viewValue && "calendar" === lastActionElement) {
                            this.dateBoxValue(viewValue, e)
                        }
                        this.dateBox.close();
                        this.dateBox._valueChangeEventHandler(e)
                    } else {
                        return true
                    }
                } else {
                    this.dateBox._valueChangeEventHandler(e)
                }
            }.bind(this),
            home: homeEndHandler,
            end: homeEndHandler
        }
    },
    getDisplayFormat: function(displayFormat) {
        return displayFormat || "shortdate"
    },
    _getWidgetName: function() {
        return _calendar.default
    },
    _getContouredValue: function() {
        return this._widget._view.option("contouredDate")
    },
    getKeyboardListener: function() {
        return this._widget
    },
    _getWidgetOptions: function() {
        var disabledDates = this.dateBox.option("disabledDates");
        return (0, _extend.extend)(this.dateBox.option("calendarOptions"), {
            value: this.dateBoxValue() || null,
            dateSerializationFormat: null,
            min: this.dateBox.dateOption("min"),
            max: this.dateBox.dateOption("max"),
            onValueChanged: this._valueChangedHandler.bind(this),
            onCellClick: this._cellClickHandler.bind(this),
            tabIndex: null,
            disabledDates: (0, _type.isFunction)(disabledDates) ? this._injectComponent(disabledDates.bind(this.dateBox)) : disabledDates,
            onContouredChanged: this._refreshActiveDescendant.bind(this),
            hasFocus: function() {
                return true
            }
        })
    },
    _injectComponent: function(func) {
        var that = this;
        return function(params) {
            (0, _extend.extend)(params, {
                component: that.dateBox
            });
            return func(params)
        }
    },
    _refreshActiveDescendant: function(e) {
        this._lastActionElement = "calendar";
        this.dateBox.setAria("activedescendant", e.actionValue)
    },
    popupConfig: function(_popupConfig) {
        var _this = this;
        var toolbarItems = _popupConfig.toolbarItems;
        var buttonsLocation = this.dateBox.option("buttonsLocation");
        var position = [];
        if ("default" !== buttonsLocation) {
            position = (0, _common.splitPair)(buttonsLocation)
        } else {
            position = ["bottom", "center"]
        }
        if ("useButtons" === this.dateBox.option("applyValueMode") && this._isCalendarVisible()) {
            toolbarItems.unshift({
                widget: "dxButton",
                toolbar: position[0],
                location: "after" === position[1] ? "before" : position[1],
                options: {
                    onInitialized: function(e) {
                        e.component.registerKeyHandler("escape", this._escapeHandler.bind(this))
                    }.bind(this),
                    onClick: function(args) {
                        _this._widget._toTodayView(args)
                    },
                    text: _message.default.format("dxCalendar-todayButtonText"),
                    type: "today"
                }
            })
        }
        return (0, _extend.extend)(true, _popupConfig, {
            toolbarItems: toolbarItems,
            position: {
                collision: "flipfit flip"
            },
            width: "auto"
        })
    },
    _isCalendarVisible: function() {
        return (0, _type.isEmptyObject)(this.dateBox.option("calendarOptions")) || false !== this.dateBox.option("calendarOptions.visible")
    },
    _escapeHandler: function() {
        this.dateBox.close();
        this.dateBox.focus()
    },
    _valueChangedHandler: function(e) {
        var dateBox = this.dateBox;
        var value = e.value;
        var prevValue = e.previousValue;
        if (_date.default.sameDate(value, prevValue)) {
            return
        }
        if ("instantly" === dateBox.option("applyValueMode")) {
            this.dateBoxValue(this.getValue(), e.event)
        }
    },
    _updateValue: function() {
        if (!this._widget) {
            return
        }
        this._widget.option("value", this.dateBoxValue())
    },
    textChangedHandler: function() {
        this._lastActionElement = "input";
        if (this.dateBox.option("opened") && this._widget) {
            this._updateValue(true)
        }
    },
    _cellClickHandler: function(e) {
        var dateBox = this.dateBox;
        if ("instantly" === dateBox.option("applyValueMode")) {
            dateBox.option("opened", false);
            this.dateBoxValue(this.getValue(), e.event)
        }
    }
});
var _default = CalendarStrategy;
exports.default = _default;
module.exports = exports.default;
