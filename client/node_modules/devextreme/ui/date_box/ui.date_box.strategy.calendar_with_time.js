/**
 * DevExtreme (ui/date_box/ui.date_box.strategy.calendar_with_time.js)
 * Version: 20.2.6
 * Build date: Tue Mar 16 2021
 *
 * Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
exports.default = void 0;
var _renderer = _interopRequireDefault(require("../../core/renderer"));
var _window = require("../../core/utils/window");
var _uiDate_boxStrategy = _interopRequireDefault(require("./ui.date_box.strategy.calendar"));
var _ui = _interopRequireDefault(require("./ui.time_view"));
var _date = _interopRequireDefault(require("../../localization/date"));
var _extend = require("../../core/utils/extend");
var _box = _interopRequireDefault(require("../box"));
var _ui2 = _interopRequireDefault(require("./ui.date_utils"));

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        "default": obj
    }
}
var window = (0, _window.getWindow)();
var SHRINK_VIEW_SCREEN_WIDTH = 573;
var DATEBOX_ADAPTIVITY_MODE_CLASS = "dx-datebox-adaptivity-mode";
var CalendarWithTimeStrategy = _uiDate_boxStrategy.default.inherit({
    NAME: "CalendarWithTime",
    getDefaultOptions: function() {
        return (0, _extend.extend)(this.callBase(), {
            applyValueMode: "useButtons",
            buttonsLocation: "bottom after",
            "dropDownOptions.showTitle": false
        })
    },
    getDisplayFormat: function(displayFormat) {
        return displayFormat || "shortdateshorttime"
    },
    _is24HourFormat: function() {
        return _date.default.is24HourFormat(this.getDisplayFormat(this.dateBox.option("displayFormat")))
    },
    _getContouredValue: function() {
        var viewDate = this.callBase();
        return this._updateDateTime(viewDate)
    },
    _renderWidget: function() {
        this.callBase();
        this._timeView = this.dateBox._createComponent((0, _renderer.default)("<div>"), _ui.default, {
            value: this.dateBoxValue(),
            _showClock: !this._isShrinkView(),
            use24HourFormat: this._is24HourFormat(),
            onValueChanged: this._valueChangedHandler.bind(this),
            stylingMode: this.dateBox.option("stylingMode")
        });
        this._timeView.registerKeyHandler("escape", this._escapeHandler.bind(this))
    },
    renderOpenedState: function() {
        this.callBase();
        var popup = this._getPopup();
        if (popup) {
            popup._wrapper().toggleClass(DATEBOX_ADAPTIVITY_MODE_CLASS, this._isSmallScreen())
        }
        clearTimeout(this._repaintTimer);
        this._repaintTimer = setTimeout(function() {
            this._getPopup() && this._getPopup().repaint()
        }.bind(this), 0)
    },
    isAdaptivityChanged: function() {
        var isAdaptiveMode = this._isShrinkView();
        var currentAdaptiveMode = this._currentAdaptiveMode;
        if (isAdaptiveMode !== currentAdaptiveMode) {
            this._currentAdaptiveMode = isAdaptiveMode;
            return void 0 !== currentAdaptiveMode
        }
        return this.callBase()
    },
    _updateValue: function(preventDefaultValue) {
        var date = this.dateBoxValue();
        if (!date && !preventDefaultValue) {
            date = new Date;
            _ui2.default.normalizeTime(date)
        }
        this.callBase();
        if (this._timeView) {
            date && this._timeView.option("value", date);
            this._timeView.option("use24HourFormat", this._is24HourFormat())
        }
    },
    _isSmallScreen: function() {
        return (0, _renderer.default)(window).width() <= SHRINK_VIEW_SCREEN_WIDTH
    },
    _isShrinkView: function() {
        return !this.dateBox.option("showAnalogClock") || this.dateBox.option("adaptivityEnabled") && this._isSmallScreen()
    },
    _getBoxItems: function() {
        var items = [{
            ratio: 0,
            shrink: 0,
            baseSize: "auto",
            name: "calendar"
        }];
        if (!this._isShrinkView()) {
            items.push({
                ratio: 0,
                shrink: 0,
                baseSize: "auto",
                name: "time"
            })
        }
        return items
    },
    renderPopupContent: function() {
        this.callBase();
        this._currentAdaptiveMode = this._isShrinkView();
        var $popupContent = this._getPopup().$content();
        this._box = this.dateBox._createComponent((0, _renderer.default)("<div>").appendTo($popupContent), _box.default, {
            direction: "row",
            crossAlign: "start",
            items: this._getBoxItems(),
            itemTemplate: function(data) {
                var $container = (0, _renderer.default)("<div>");
                switch (data.name) {
                    case "calendar":
                        $container.append(this._widget.$element());
                        if (this._isShrinkView()) {
                            $container.append(this._timeView.$element())
                        }
                        break;
                    case "time":
                        $container.append(this._timeView.$element())
                }
                return $container
            }.bind(this)
        });
        this._attachTabHandler()
    },
    popupConfig: function(_popupConfig) {
        var calendarPopupConfig = this.callBase(_popupConfig);
        var result = (0, _extend.extend)(calendarPopupConfig, {
            width: "auto",
            onShowing: function() {
                if ("fallback" === this._box.option("_layoutStrategy")) {
                    var clockMinWidth = this._getPopup().$content().find(".dx-timeview-clock").css("minWidth");
                    this._timeView.$element().css("maxWidth", clockMinWidth)
                }
            }.bind(this)
        });
        return result
    },
    getFirstPopupElement: function() {
        return this._timeView._hourBox.$element().find("input")
    },
    _attachTabHandler: function() {
        var dateBox = this.dateBox;
        var handler = function(e) {
            if (e.shiftKey) {
                e.preventDefault();
                dateBox.focus()
            }
        };
        this._timeView._hourBox.registerKeyHandler("tab", handler)
    },
    _preventFocusOnPopup: function(e) {
        if (!(0, _renderer.default)(e.target).hasClass("dx-texteditor-input")) {
            this.callBase.apply(this, arguments);
            if (!this.dateBox._hasFocusClass()) {
                this.dateBox.focus()
            }
        }
    },
    _updateDateTime: function(date) {
        var time = this._timeView.option("value");
        date.setHours(time.getHours(), time.getMinutes(), time.getSeconds(), time.getMilliseconds());
        return date
    },
    getValue: function() {
        var date = this._widget.option("value");
        date = date ? new Date(date) : new Date;
        return this._updateDateTime(date)
    },
    dispose: function() {
        clearTimeout(this._removeMinWidthTimer);
        clearTimeout(this._repaintTimer);
        this.callBase()
    }
});
var _default = CalendarWithTimeStrategy;
exports.default = _default;
module.exports = exports.default;
