/**
 * DevExtreme (ui/date_box/ui.date_box.base.js)
 * Version: 20.2.6
 * Build date: Tue Mar 16 2021
 *
 * Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
exports.default = void 0;
var _window = require("../../core/utils/window");
var _component_registrator = _interopRequireDefault(require("../../core/component_registrator"));
var _type = require("../../core/utils/type");
var _dom = require("../../core/utils/dom");
var _iterator = require("../../core/utils/iterator");
var _version = require("../../core/utils/version");
var _extend = require("../../core/utils/extend");
var _support = require("../../core/utils/support");
var _devices = _interopRequireDefault(require("../../core/devices"));
var _config = _interopRequireDefault(require("../../core/config"));
var _date = _interopRequireDefault(require("../../core/utils/date"));
var _ui = _interopRequireDefault(require("./ui.date_utils"));
var _date_serialization = _interopRequireDefault(require("../../core/utils/date_serialization"));
var _ui2 = _interopRequireDefault(require("../drop_down_editor/ui.drop_down_editor"));
var _date2 = _interopRequireDefault(require("../../localization/date"));
var _message = _interopRequireDefault(require("../../localization/message"));
var _uiDate_boxStrategy = _interopRequireDefault(require("./ui.date_box.strategy.calendar"));
var _uiDate_boxStrategy2 = _interopRequireDefault(require("./ui.date_box.strategy.date_view"));
var _uiDate_boxStrategy3 = _interopRequireDefault(require("./ui.date_box.strategy.native"));
var _uiDate_boxStrategy4 = _interopRequireDefault(require("./ui.date_box.strategy.calendar_with_time"));
var _uiDate_boxStrategy5 = _interopRequireDefault(require("./ui.date_box.strategy.list"));

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        "default": obj
    }
}
var window = (0, _window.getWindow)();
var DATEBOX_CLASS = "dx-datebox";
var DX_AUTO_WIDTH_CLASS = "dx-auto-width";
var DX_INVALID_BADGE_CLASS = "dx-show-invalid-badge";
var DX_CLEAR_BUTTON_CLASS = "dx-clear-button-area";
var DATEBOX_WRAPPER_CLASS = "dx-datebox-wrapper";
var PICKER_TYPE = {
    calendar: "calendar",
    rollers: "rollers",
    list: "list",
    "native": "native"
};
var TYPE = {
    date: "date",
    datetime: "datetime",
    time: "time"
};
var STRATEGY_NAME = {
    calendar: "Calendar",
    dateView: "DateView",
    "native": "Native",
    calendarWithTime: "CalendarWithTime",
    list: "List"
};
var STRATEGY_CLASSES = {
    Calendar: _uiDate_boxStrategy.default,
    DateView: _uiDate_boxStrategy2.default,
    Native: _uiDate_boxStrategy3.default,
    CalendarWithTime: _uiDate_boxStrategy4.default,
    List: _uiDate_boxStrategy5.default
};
var DateBox = _ui2.default.inherit({
    _supportedKeys: function() {
        return (0, _extend.extend)(this.callBase(), this._strategy.supportedKeys())
    },
    _renderButtonContainers: function() {
        this.callBase.apply(this, arguments);
        this._strategy.customizeButtons()
    },
    _getDefaultOptions: function() {
        return (0, _extend.extend)(this.callBase(), {
            type: "date",
            showAnalogClock: true,
            value: null,
            dateSerializationFormat: void 0,
            min: void 0,
            max: void 0,
            displayFormat: null,
            interval: 30,
            disabledDates: null,
            pickerType: PICKER_TYPE.calendar,
            invalidDateMessage: _message.default.format("dxDateBox-validation-datetime"),
            dateOutOfRangeMessage: _message.default.format("validation-range"),
            applyButtonText: _message.default.format("OK"),
            adaptivityEnabled: false,
            calendarOptions: {},
            useHiddenSubmitElement: true
        })
    },
    _defaultOptionsRules: function() {
        return this.callBase().concat([{
            device: {
                platform: "ios"
            },
            options: {
                "dropDownOptions.showTitle": true
            }
        }, {
            device: {
                platform: "android"
            },
            options: {
                buttonsLocation: "bottom after"
            }
        }, {
            device: function() {
                var realDevice = _devices.default.real();
                var platform = realDevice.platform;
                return "ios" === platform || "android" === platform
            },
            options: {
                pickerType: PICKER_TYPE.native
            }
        }, {
            device: function(currentDevice) {
                var realDevice = _devices.default.real();
                var platform = realDevice.platform;
                var version = realDevice.version;
                return "generic" === platform && "desktop" !== currentDevice.deviceType || "android" === platform && (0, _version.compare)(version, [4, 4]) < 0
            },
            options: {
                pickerType: PICKER_TYPE.rollers
            }
        }, {
            device: {
                platform: "generic",
                deviceType: "desktop"
            },
            options: {
                buttonsLocation: "bottom after"
            }
        }])
    },
    _initOptions: function(options) {
        this._userOptions = (0, _extend.extend)({}, options);
        this.callBase(options);
        this._updatePickerOptions()
    },
    _updatePickerOptions: function() {
        var pickerType = this.option("pickerType");
        var type = this.option("type");
        if (pickerType === PICKER_TYPE.list && (type === TYPE.datetime || type === TYPE.date)) {
            pickerType = PICKER_TYPE.calendar
        }
        if (type === TYPE.time && pickerType === PICKER_TYPE.calendar) {
            pickerType = PICKER_TYPE.list
        }
        this.option("showDropDownButton", "generic" !== _devices.default.real().platform || pickerType !== PICKER_TYPE.native);
        this._pickerType = pickerType
    },
    _init: function() {
        this._initStrategy();
        this.option((0, _extend.extend)({}, this._strategy.getDefaultOptions(), this._userOptions));
        delete this._userOptions;
        this.callBase()
    },
    _toLowerCaseFirstLetter: function(string) {
        return string.charAt(0).toLowerCase() + string.substr(1)
    },
    _initStrategy: function() {
        var strategyName = this._getStrategyName(this._getFormatType());
        var strategy = STRATEGY_CLASSES[strategyName];
        if (!(this._strategy && this._strategy.NAME === strategyName)) {
            this._strategy = new strategy(this)
        }
    },
    _getFormatType: function() {
        var currentType = this.option("type");
        var isTime = /h|m|s/g.test(currentType);
        var isDate = /d|M|Y/g.test(currentType);
        var type = "";
        if (isDate) {
            type += TYPE.date
        }
        if (isTime) {
            type += TYPE.time
        }
        return type
    },
    _getStrategyName: function(type) {
        var pickerType = this._pickerType;
        if (pickerType === PICKER_TYPE.rollers) {
            return STRATEGY_NAME.dateView
        } else {
            if (pickerType === PICKER_TYPE.native) {
                return STRATEGY_NAME.native
            }
        }
        if (type === TYPE.date) {
            return STRATEGY_NAME.calendar
        }
        if (type === TYPE.datetime) {
            return STRATEGY_NAME.calendarWithTime
        }
        return STRATEGY_NAME.list
    },
    _initMarkup: function() {
        this.$element().addClass(DATEBOX_CLASS);
        this.callBase();
        this._refreshFormatClass();
        this._refreshPickerTypeClass();
        this._strategy.renderInputMinMax(this._input())
    },
    _render: function() {
        this.callBase();
        this._formatValidationIcon()
    },
    _renderDimensions: function() {
        this.callBase();
        this.$element().toggleClass(DX_AUTO_WIDTH_CLASS, !this.option("width"));
        this._dimensionChanged()
    },
    _dimensionChanged: function() {
        this.callBase(arguments);
        if (this._popup) {
            var _this$_strategy$_upda, _this$_strategy;
            null === (_this$_strategy$_upda = (_this$_strategy = this._strategy)._updatePopupHeight) || void 0 === _this$_strategy$_upda ? void 0 : _this$_strategy$_upda.call(_this$_strategy)
        }
    },
    _refreshFormatClass: function() {
        var $element = this.$element();
        (0, _iterator.each)(TYPE, function(_, item) {
            $element.removeClass(DATEBOX_CLASS + "-" + item)
        });
        $element.addClass(DATEBOX_CLASS + "-" + this.option("type"))
    },
    _refreshPickerTypeClass: function() {
        var $element = this.$element();
        (0, _iterator.each)(PICKER_TYPE, function(_, item) {
            $element.removeClass(DATEBOX_CLASS + "-" + item)
        });
        $element.addClass(DATEBOX_CLASS + "-" + this._pickerType)
    },
    _formatValidationIcon: function() {
        if (!(0, _window.hasWindow)()) {
            return
        }
        var inputElement = this._input().get(0);
        var isRtlEnabled = this.option("rtlEnabled");
        var clearButtonWidth = this._getClearButtonWidth();
        var longestElementDimensions = this._getLongestElementDimensions();
        var curWidth = parseFloat(window.getComputedStyle(inputElement).width) - clearButtonWidth;
        var shouldHideValidationIcon = longestElementDimensions.width > curWidth;
        var style = inputElement.style;
        this.$element().toggleClass(DX_INVALID_BADGE_CLASS, !shouldHideValidationIcon);
        if (shouldHideValidationIcon) {
            if (void 0 === this._storedPadding) {
                this._storedPadding = isRtlEnabled ? longestElementDimensions.leftPadding : longestElementDimensions.rightPadding
            }
            isRtlEnabled ? style.paddingLeft = 0 : style.paddingRight = 0
        } else {
            isRtlEnabled ? style.paddingLeft = this._storedPadding + "px" : style.paddingRight = this._storedPadding + "px"
        }
    },
    _getClearButtonWidth: function() {
        var clearButtonWidth = 0;
        if (this._isClearButtonVisible() && "" === this._input().val()) {
            var clearButtonElement = this.$element().find("." + DX_CLEAR_BUTTON_CLASS).get(0);
            clearButtonWidth = parseFloat(window.getComputedStyle(clearButtonElement).width)
        }
        return clearButtonWidth
    },
    _getLongestElementDimensions: function() {
        var format = this._strategy.getDisplayFormat(this.option("displayFormat"));
        var longestValue = _date2.default.format(_ui.default.getLongestDate(format, _date2.default.getMonthNames(), _date2.default.getDayNames()), format);
        var $input = this._input();
        var inputElement = $input.get(0);
        var $longestValueElement = (0, _dom.createTextElementHiddenCopy)($input, longestValue);
        var isPaddingStored = void 0 !== this._storedPadding;
        var storedPadding = !isPaddingStored ? 0 : this._storedPadding;
        $longestValueElement.appendTo(this.$element());
        var elementWidth = parseFloat(window.getComputedStyle($longestValueElement.get(0)).width);
        var rightPadding = parseFloat(window.getComputedStyle(inputElement).paddingRight);
        var leftPadding = parseFloat(window.getComputedStyle(inputElement).paddingLeft);
        var necessaryWidth = elementWidth + leftPadding + rightPadding + storedPadding;
        $longestValueElement.remove();
        return {
            width: necessaryWidth,
            leftPadding: leftPadding,
            rightPadding: rightPadding
        }
    },
    _getKeyboardListeners: function() {
        return this.callBase().concat([this._strategy && this._strategy.getKeyboardListener()])
    },
    _renderPopup: function() {
        this.callBase();
        this._popup._wrapper().addClass(DATEBOX_WRAPPER_CLASS);
        this._renderPopupWrapper()
    },
    _popupConfig: function() {
        var popupConfig = this.callBase();
        return (0, _extend.extend)(this._strategy.popupConfig(popupConfig), {
            title: this._getPopupTitle(),
            dragEnabled: false
        })
    },
    _renderPopupWrapper: function() {
        if (!this._popup) {
            return
        }
        var $element = this.$element();
        var classPostfixes = (0, _extend.extend)({}, TYPE, PICKER_TYPE);
        (0, _iterator.each)(classPostfixes, function(_, item) {
            $element.removeClass(DATEBOX_WRAPPER_CLASS + "-" + item)
        }.bind(this));
        this._popup._wrapper().addClass(DATEBOX_WRAPPER_CLASS + "-" + this.option("type")).addClass(DATEBOX_WRAPPER_CLASS + "-" + this._pickerType)
    },
    _renderPopupContent: function() {
        this.callBase();
        this._strategy.renderPopupContent()
    },
    _getFirstPopupElement: function() {
        return this._strategy.getFirstPopupElement() || this.callBase()
    },
    _getLastPopupElement: function() {
        return this._strategy.getLastPopupElement() || this.callBase()
    },
    _popupShowingHandler: function() {
        this.callBase();
        this._strategy.popupShowingHandler()
    },
    _popupShownHandler: function() {
        this.callBase();
        this._strategy.renderOpenedState()
    },
    _popupHiddenHandler: function() {
        this.callBase();
        this._strategy.renderOpenedState();
        this._strategy.popupHiddenHandler()
    },
    _visibilityChanged: function(visible) {
        if (visible) {
            this._formatValidationIcon()
        }
    },
    _clearValueHandler: function(e) {
        this.option("text", "");
        this.callBase(e)
    },
    _readOnlyPropValue: function() {
        if (this._pickerType === PICKER_TYPE.rollers) {
            return true
        }
        var platform = _devices.default.real().platform;
        var isCustomValueDisabled = this._isNativeType() && ("ios" === platform || "android" === platform);
        if (isCustomValueDisabled) {
            return this.option("readOnly")
        }
        return this.callBase()
    },
    _isClearButtonVisible: function() {
        return this.callBase() && !this._isNativeType()
    },
    _renderValue: function() {
        var value = this.dateOption("value");
        this.option("text", this._getDisplayedText(value));
        this._strategy.renderValue();
        return this.callBase()
    },
    _setSubmitValue: function() {
        var value = this.dateOption("value");
        var dateSerializationFormat = this.option("dateSerializationFormat");
        var submitFormat = _ui.default.SUBMIT_FORMATS_MAP[this.option("type")];
        var submitValue = dateSerializationFormat ? _date_serialization.default.serializeDate(value, dateSerializationFormat) : _ui.default.toStandardDateFormat(value, submitFormat);
        this._getSubmitElement().val(submitValue)
    },
    _getDisplayedText: function(value) {
        var mode = this.option("mode");
        var displayedText;
        if ("text" === mode) {
            var displayFormat = this._strategy.getDisplayFormat(this.option("displayFormat"));
            displayedText = _date2.default.format(value, displayFormat)
        } else {
            var format = this._getFormatByMode(mode);
            if (format) {
                displayedText = _date2.default.format(value, format)
            } else {
                displayedText = _ui.default.toStandardDateFormat(value, mode)
            }
        }
        return displayedText
    },
    _getFormatByMode: function(mode) {
        return (0, _support.inputType)(mode) ? null : _ui.default.FORMATS_MAP[mode]
    },
    _valueChangeEventHandler: function(e) {
        var text = this.option("text");
        var currentValue = this.dateOption("value");
        if (text === this._getDisplayedText(currentValue)) {
            this._applyInternalValidation(currentValue);
            return
        }
        var parsedDate = this._getParsedDate(text);
        var value = null !== currentValue && void 0 !== currentValue ? currentValue : this._getDateByDefault();
        var type = this.option("type");
        var newValue = _ui.default.mergeDates(value, parsedDate, type);
        var date = parsedDate && "time" === type ? newValue : parsedDate;
        if (this._applyInternalValidation(date).isValid) {
            var displayedText = this._getDisplayedText(newValue);
            if (value && newValue && value.getTime() === newValue.getTime() && displayedText !== text) {
                this._renderValue()
            } else {
                this.dateValue(newValue, e)
            }
        }
    },
    _getDateByDefault: function() {
        return this._strategy.useCurrentDateByDefault() && this._strategy.getDefaultDate()
    },
    _getParsedDate: function(text) {
        var displayFormat = this._strategy.getDisplayFormat(this.option("displayFormat"));
        var parsedText = this._strategy.getParsedText(text, displayFormat);
        return null !== parsedText && void 0 !== parsedText ? parsedText : void 0
    },
    _applyInternalValidation: function(value) {
        var text = this.option("text");
        var hasText = !!text && null !== value;
        var isDate = !!value && (0, _type.isDate)(value) && !isNaN(value.getTime());
        var isDateInRange = isDate && _date.default.dateInRange(value, this.dateOption("min"), this.dateOption("max"), this.option("type"));
        var isValid = !hasText && !value || isDateInRange;
        var validationMessage = "";
        if (!isDate) {
            validationMessage = this.option("invalidDateMessage")
        } else {
            if (!isDateInRange) {
                validationMessage = this.option("dateOutOfRangeMessage")
            }
        }
        this.option({
            isValid: isValid,
            validationError: isValid ? null : {
                editorSpecific: true,
                message: validationMessage
            }
        });
        return {
            isValid: isValid,
            isDate: isDate
        }
    },
    _applyCustomValidation: function(value) {
        this.validationRequest.fire({
            editor: this,
            value: this._serializeDate(value)
        })
    },
    _isValueChanged: function(newValue) {
        var oldValue = this.dateOption("value");
        var oldTime = oldValue && oldValue.getTime();
        var newTime = newValue && newValue.getTime();
        return oldTime !== newTime
    },
    _isTextChanged: function(newValue) {
        var oldText = this.option("text");
        var newText = newValue && this._getDisplayedText(newValue) || "";
        return oldText !== newText
    },
    _renderProps: function() {
        this.callBase();
        this._input().attr("autocomplete", "off")
    },
    _renderOpenedState: function() {
        if (!this._isNativeType()) {
            this.callBase()
        }
        if (this._strategy.isAdaptivityChanged()) {
            this._refreshStrategy()
        }
    },
    _getPopupTitle: function() {
        var placeholder = this.option("placeholder");
        if (placeholder) {
            return placeholder
        }
        var type = this.option("type");
        if (type === TYPE.time) {
            return _message.default.format("dxDateBox-simulatedDataPickerTitleTime")
        }
        if (type === TYPE.date || type === TYPE.datetime) {
            return _message.default.format("dxDateBox-simulatedDataPickerTitleDate")
        }
        return ""
    },
    _renderPlaceholder: function() {
        this._popup && this._popup.option("title", this._getPopupTitle());
        this.callBase()
    },
    _refreshStrategy: function() {
        this._strategy.dispose();
        this._initStrategy();
        this.option(this._strategy.getDefaultOptions());
        this._refresh()
    },
    _applyButtonHandler: function(e) {
        var value = this._strategy.getValue();
        var _this$_applyInternalV = this._applyInternalValidation(value),
            isValid = _this$_applyInternalV.isValid,
            isDate = _this$_applyInternalV.isDate;
        if (isValid) {
            this.dateValue(value, e.event)
        } else {
            if (isDate) {
                var displayedText = this._getDisplayedText(value);
                this.option("text", displayedText);
                this._renderDisplayText(displayedText)
            }
        }
        this.callBase()
    },
    _dispose: function() {
        var _this$_strategy2;
        this.callBase();
        null === (_this$_strategy2 = this._strategy) || void 0 === _this$_strategy2 ? void 0 : _this$_strategy2.dispose()
    },
    _isNativeType: function() {
        return this._pickerType === PICKER_TYPE.native
    },
    _optionChanged: function(args) {
        switch (args.name) {
            case "showClearButton":
            case "buttons":
                this.callBase.apply(this, arguments);
                this._formatValidationIcon();
                break;
            case "pickerType":
                this._updatePickerOptions({
                    pickerType: args.value
                });
                this._refreshStrategy();
                this._refreshPickerTypeClass();
                this._invalidate();
                break;
            case "type":
                this._updatePickerOptions({
                    format: args.value
                });
                this._refreshStrategy();
                this._refreshFormatClass();
                this._renderPopupWrapper();
                this._formatValidationIcon();
                this._updateValue();
                break;
            case "placeholder":
                this._renderPlaceholder();
                break;
            case "min":
            case "max":
                var isValid = this.option("isValid");
                this._applyInternalValidation(this.dateOption("value"));
                if (!isValid) {
                    this._applyCustomValidation(this.dateOption("value"))
                }
                this._invalidate();
                break;
            case "dateSerializationFormat":
            case "interval":
            case "disabledDates":
            case "calendarOptions":
                this._invalidate();
                break;
            case "displayFormat":
                this.option("text", this._getDisplayedText(this.dateOption("value")));
                this._renderInputValue();
                break;
            case "text":
                this._strategy.textChangedHandler(args.value);
                this.callBase.apply(this, arguments);
                break;
            case "isValid":
                this.callBase.apply(this, arguments);
                this._formatValidationIcon();
                break;
            case "showDropDownButton":
                this._formatValidationIcon();
                this.callBase.apply(this, arguments);
                break;
            case "readOnly":
                this.callBase.apply(this, arguments);
                this._formatValidationIcon();
                break;
            case "invalidDateMessage":
            case "dateOutOfRangeMessage":
            case "adaptivityEnabled":
            case "showAnalogClock":
                break;
            default:
                this.callBase.apply(this, arguments)
        }
    },
    _getSerializationFormat: function() {
        var value = this.option("value");
        if (this.option("dateSerializationFormat") && (0, _config.default)().forceIsoDateParsing) {
            return this.option("dateSerializationFormat")
        }
        if ((0, _type.isNumeric)(value)) {
            return "number"
        }
        if (!(0, _type.isString)(value)) {
            return
        }
        return _date_serialization.default.getDateSerializationFormat(value)
    },
    _updateValue: function(value) {
        this.callBase();
        this._applyInternalValidation(null !== value && void 0 !== value ? value : this.dateOption("value"))
    },
    dateValue: function(value, dxEvent) {
        var isValueChanged = this._isValueChanged(value);
        if (isValueChanged && dxEvent) {
            this._saveValueChangeEvent(dxEvent)
        }
        if (!isValueChanged) {
            if (this._isTextChanged(value)) {
                this._updateValue(value)
            } else {
                if ("" === this.option("text")) {
                    this._applyCustomValidation(value)
                }
            }
        }
        return this.dateOption("value", value)
    },
    dateOption: function(optionName, value) {
        if (1 === arguments.length) {
            return _date_serialization.default.deserializeDate(this.option(optionName))
        }
        this.option(optionName, this._serializeDate(value))
    },
    _serializeDate: function(date) {
        var serializationFormat = this._getSerializationFormat();
        return _date_serialization.default.serializeDate(date, serializationFormat)
    },
    reset: function() {
        this.callBase();
        this._updateValue(this.dateOption("value"))
    }
});
(0, _component_registrator.default)("dxDateBox", DateBox);
var _default = DateBox;
exports.default = _default;
module.exports = exports.default;
