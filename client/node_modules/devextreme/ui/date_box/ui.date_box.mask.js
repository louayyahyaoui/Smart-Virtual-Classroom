/**
 * DevExtreme (ui/date_box/ui.date_box.mask.js)
 * Version: 20.2.6
 * Build date: Tue Mar 16 2021
 *
 * Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
exports.default = void 0;
var _index = require("../../events/utils/index");
var _type = require("../../core/utils/type");
var _dom = require("../../core/utils/dom");
var _extend = require("../../core/utils/extend");
var _math = require("../../core/utils/math");
var _events_engine = _interopRequireDefault(require("../../events/core/events_engine"));
var _uiDate_boxMask = require("./ui.date_box.mask.parts");
var _date = _interopRequireDefault(require("../../localization/date"));
var _date2 = require("../../localization/ldml/date.parser");
var _date3 = require("../../localization/ldml/date.format");
var _uiDate_box = _interopRequireDefault(require("./ui.date_box.base"));
var _number = _interopRequireDefault(require("../../localization/number"));
var _devices = _interopRequireDefault(require("../../core/devices"));
var _browser = _interopRequireDefault(require("../../core/utils/browser"));

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        "default": obj
    }
}
var MASK_EVENT_NAMESPACE = "dateBoxMask";
var FORWARD = 1;
var BACKWARD = -1;
var DateBoxMask = _uiDate_box.default.inherit({
    _supportedKeys: function(e) {
        var _this = this;
        var originalHandlers = this.callBase(e);
        var callOriginalHandler = function(e) {
            var originalHandler = originalHandlers[(0, _index.normalizeKeyName)(e)];
            return originalHandler && originalHandler.apply(_this, [e])
        };
        var applyHandler = function(e, maskHandler) {
            if (_this._shouldUseOriginalHandler(e)) {
                return callOriginalHandler.apply(_this, [e])
            } else {
                return maskHandler.apply(_this, [e])
            }
        };
        return (0, _extend.extend)({}, originalHandlers, {
            del: function(e) {
                return applyHandler(e, function(event) {
                    _this._revertPart(FORWARD);
                    _this._isAllSelected() || event.preventDefault()
                })
            },
            backspace: function(e) {
                return applyHandler(e, function(event) {
                    _this._revertPart(BACKWARD);
                    _this._isAllSelected() || event.preventDefault()
                })
            },
            home: function(e) {
                return applyHandler(e, function(event) {
                    _this._selectFirstPart();
                    event.preventDefault()
                })
            },
            end: function(e) {
                return applyHandler(e, function(event) {
                    _this._selectLastPart();
                    event.preventDefault()
                })
            },
            escape: function(e) {
                return applyHandler(e, function(event) {
                    _this._revertChanges(event)
                })
            },
            enter: function(e) {
                return applyHandler(e, function(event) {
                    _this._enterHandler(event)
                })
            },
            leftArrow: function(e) {
                return applyHandler(e, function(event) {
                    _this._selectNextPart(BACKWARD);
                    event.preventDefault()
                })
            },
            rightArrow: function(e) {
                return applyHandler(e, function(event) {
                    _this._selectNextPart(FORWARD);
                    event.preventDefault()
                })
            },
            upArrow: function(e) {
                return applyHandler(e, function(event) {
                    _this._upDownArrowHandler(FORWARD);
                    event.preventDefault()
                })
            },
            downArrow: function(e) {
                return applyHandler(e, function(event) {
                    _this._upDownArrowHandler(BACKWARD);
                    event.preventDefault()
                })
            }
        })
    },
    _shouldUseOriginalHandler: function(e) {
        var keysToHandleByMask = ["backspace", "del"];
        var isNotDeletingInCalendar = this.option("opened") && e && keysToHandleByMask.indexOf((0, _index.normalizeKeyName)(e)) === -1;
        return !this._useMaskBehavior() || isNotDeletingInCalendar || e && e.altKey
    },
    _upDownArrowHandler: function(step) {
        this._setNewDateIfEmpty();
        var originalValue = this._getActivePartValue(this._initialMaskValue);
        var currentValue = this._getActivePartValue();
        var delta = currentValue - originalValue;
        this._loadMaskValue(this._initialMaskValue);
        this._partIncrease(delta + step, true)
    },
    _getDefaultOptions: function() {
        return (0, _extend.extend)(this.callBase(), {
            useMaskBehavior: false,
            emptyDateValue: new Date(2e3, 0, 1, 0, 0, 0)
        })
    },
    _isSingleCharKey: function(_ref) {
        var originalEvent = _ref.originalEvent,
            ctrl = _ref.ctrl,
            alt = _ref.alt;
        var key = originalEvent.data || ("space" === (0, _index.normalizeKeyName)(originalEvent) ? " " : originalEvent.key);
        return "string" === typeof key && 1 === key.length && !ctrl && !alt
    },
    _isSingleDigitKey: function(e) {
        var _e$originalEvent;
        var data = null === (_e$originalEvent = e.originalEvent) || void 0 === _e$originalEvent ? void 0 : _e$originalEvent.data;
        return 1 === (null === data || void 0 === data ? void 0 : data.length) && parseInt(data, 10)
    },
    _useBeforeInputEvent: function() {
        var device = _devices.default.real();
        return device.android && device.version[0] > 4
    },
    _keyboardHandler: function(e) {
        var _this2 = this;
        var key = e.originalEvent.key;
        var result = this.callBase(e);
        if (!this._useMaskBehavior() || this._useBeforeInputEvent()) {
            return result
        }
        if (_browser.default.chrome && "Process" === e.key && 0 === e.code.indexOf("Digit")) {
            key = e.code.replace("Digit", "");
            this._processInputKey(key);
            this._maskInputHandler = function() {
                _this2._renderSelectedPart()
            }
        } else {
            if (this._isSingleCharKey(e)) {
                this._processInputKey(key);
                e.originalEvent.preventDefault()
            }
        }
        return result
    },
    _maskBeforeInputHandler: function(e) {
        var _this3 = this;
        this._maskInputHandler = null;
        var inputType = e.originalEvent.inputType;
        if ("insertCompositionText" === inputType) {
            this._maskInputHandler = function() {
                _this3._renderSelectedPart()
            }
        }
        var isBackwardDeletion = "deleteContentBackward" === inputType;
        var isForwardDeletion = "deleteContentForward" === inputType;
        if (isBackwardDeletion || isForwardDeletion) {
            var direction = isBackwardDeletion ? BACKWARD : FORWARD;
            this._maskInputHandler = function() {
                _this3._revertPart();
                _this3._selectNextPart(direction)
            }
        }
        if (!this._useMaskBehavior() || !this._isSingleCharKey(e)) {
            return
        }
        var key = e.originalEvent.data;
        this._processInputKey(key);
        e.preventDefault();
        return true
    },
    _keyPressHandler: function(e) {
        var event = e.originalEvent;
        if ("insertCompositionText" === (null === event || void 0 === event ? void 0 : event.inputType) && this._isSingleDigitKey(e)) {
            this._processInputKey(event.data);
            this._renderDisplayText(this._getDisplayedText(this._maskValue));
            this._selectNextPart()
        }
        this.callBase(e);
        if (this._maskInputHandler) {
            this._maskInputHandler();
            this._maskInputHandler = null
        }
    },
    _processInputKey: function(key) {
        if (this._isAllSelected()) {
            this._activePartIndex = 0
        }
        this._setNewDateIfEmpty();
        if (isNaN(parseInt(key))) {
            this._searchString(key)
        } else {
            this._searchNumber(key)
        }
    },
    _isAllSelected: function() {
        var caret = this._caret();
        return caret.end - caret.start === this.option("text").length
    },
    _getFormatPattern: function() {
        if (this._formatPattern) {
            return this._formatPattern
        }
        var format = this._strategy.getDisplayFormat(this.option("displayFormat"));
        var isLDMLPattern = (0, _type.isString)(format) && !_date.default._getPatternByFormat(format);
        if (isLDMLPattern) {
            this._formatPattern = format
        } else {
            this._formatPattern = (0, _date3.getFormat)(function(value) {
                return _date.default.format(value, format)
            })
        }
        return this._formatPattern
    },
    _setNewDateIfEmpty: function() {
        if (!this._maskValue) {
            var value = "time" === this.option("type") ? new Date(null) : new Date;
            this._maskValue = value;
            this._initialMaskValue = value;
            this._renderDateParts()
        }
    },
    _partLimitsReached: function(max) {
        var maxLimitLength = String(max).length;
        var formatLength = this._getActivePartProp("pattern").length;
        var isShortFormat = 1 === formatLength;
        var maxSearchLength = isShortFormat ? maxLimitLength : Math.min(formatLength, maxLimitLength);
        var isLengthExceeded = this._searchValue.length === maxSearchLength;
        var isValueOverflowed = parseInt(this._searchValue + "0") > max;
        return isLengthExceeded || isValueOverflowed
    },
    _searchNumber: function(char) {
        var _this$_getActivePartL = this._getActivePartLimits(),
            max = _this$_getActivePartL.max;
        var maxLimitLength = String(max).length;
        this._searchValue = (this._searchValue + char).substr(-maxLimitLength);
        if (isNaN(this._searchValue)) {
            this._searchValue = char
        }
        this._setActivePartValue(this._searchValue);
        if (this._partLimitsReached(max)) {
            this._selectNextPart(FORWARD)
        }
    },
    _searchString: function(char) {
        if (!isNaN(parseInt(this._getActivePartProp("text")))) {
            return
        }
        var limits = this._getActivePartProp("limits")(this._maskValue);
        var startString = this._searchValue + char.toLowerCase();
        var endLimit = limits.max - limits.min;
        for (var i = 0; i <= endLimit; i++) {
            this._loadMaskValue(this._initialMaskValue);
            this._partIncrease(i + 1);
            if (0 === this._getActivePartProp("text").toLowerCase().indexOf(startString)) {
                this._searchValue = startString;
                return
            }
        }
        this._setNewDateIfEmpty();
        if (this._searchValue) {
            this._clearSearchValue();
            this._searchString(char)
        }
    },
    _clearSearchValue: function() {
        this._searchValue = ""
    },
    _revertPart: function(direction) {
        if (!this._isAllSelected()) {
            var actual = this._getActivePartValue(this.option("emptyDateValue"));
            this._setActivePartValue(actual);
            this._selectNextPart(direction)
        }
        this._clearSearchValue()
    },
    _useMaskBehavior: function() {
        return this.option("useMaskBehavior") && "text" === this.option("mode")
    },
    _prepareRegExpInfo: function() {
        this._regExpInfo = (0, _date2.getRegExpInfo)(this._getFormatPattern(), _date.default);
        var regExp = this._regExpInfo.regexp;
        var flags = regExp.flags;
        var convertedRegExp = _number.default.convertDigits(this._regExpInfo.regexp.source, false);
        this._regExpInfo.regexp = RegExp(convertedRegExp, flags)
    },
    _initMaskState: function() {
        this._activePartIndex = 0;
        this._formatPattern = null;
        this._prepareRegExpInfo();
        this._loadMaskValue()
    },
    _renderMask: function() {
        this.callBase();
        this._detachMaskEvents();
        this._clearMaskState();
        if (this._useMaskBehavior()) {
            this._attachMaskEvents();
            this._initMaskState();
            this._renderDateParts()
        }
    },
    _renderDateParts: function() {
        if (!this._useMaskBehavior()) {
            return
        }
        var text = this.option("text") || this._getDisplayedText(this._maskValue);
        if (text) {
            this._dateParts = (0, _uiDate_boxMask.renderDateParts)(text, this._regExpInfo);
            if (!this._input().is(":hidden")) {
                this._selectNextPart()
            }
        }
    },
    _detachMaskEvents: function() {
        _events_engine.default.off(this._input(), "." + MASK_EVENT_NAMESPACE)
    },
    _attachMaskEvents: function() {
        var _this4 = this;
        _events_engine.default.on(this._input(), (0, _index.addNamespace)("dxclick", MASK_EVENT_NAMESPACE), this._maskClickHandler.bind(this));
        _events_engine.default.on(this._input(), (0, _index.addNamespace)("paste", MASK_EVENT_NAMESPACE), this._maskPasteHandler.bind(this));
        _events_engine.default.on(this._input(), (0, _index.addNamespace)("drop", MASK_EVENT_NAMESPACE), function() {
            _this4._renderSelectedPart()
        });
        _events_engine.default.on(this._input(), (0, _index.addNamespace)("compositionend", MASK_EVENT_NAMESPACE), this._maskCompositionEndHandler.bind(this));
        if (this._useBeforeInputEvent()) {
            _events_engine.default.on(this._input(), (0, _index.addNamespace)("beforeinput", MASK_EVENT_NAMESPACE), this._maskBeforeInputHandler.bind(this))
        }
    },
    _renderSelectedPart: function() {
        this._renderDisplayText(this._getDisplayedText(this._maskValue));
        this._selectNextPart()
    },
    _selectLastPart: function() {
        if (this.option("text")) {
            this._activePartIndex = this._dateParts.length;
            this._selectNextPart(BACKWARD)
        }
    },
    _selectFirstPart: function() {
        if (this.option("text")) {
            this._activePartIndex = -1;
            this._selectNextPart(FORWARD)
        }
    },
    _onMouseWheel: function(e) {
        if (this._useMaskBehavior()) {
            this._partIncrease(e.delta > 0 ? FORWARD : BACKWARD, e)
        }
    },
    _selectNextPart: function() {
        var step = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 0;
        if (!this.option("text") || this._disposed) {
            return
        }
        if (step) {
            this._initialMaskValue = new Date(this._maskValue)
        }
        var index = (0, _math.fitIntoRange)(this._activePartIndex + step, 0, this._dateParts.length - 1);
        if (this._dateParts[index].isStub) {
            var isBoundaryIndex = 0 === index && step < 0 || index === this._dateParts.length - 1 && step > 0;
            if (!isBoundaryIndex) {
                this._selectNextPart(step >= 0 ? step + 1 : step - 1);
                return
            } else {
                index = this._activePartIndex
            }
        }
        if (this._activePartIndex !== index) {
            this._clearSearchValue()
        }
        this._activePartIndex = index;
        this._caret(this._getActivePartProp("caret"))
    },
    _getRealLimitsPattern: function() {
        if ("d" === this._getActivePartProp("pattern")[0]) {
            return "dM"
        }
    },
    _getActivePartLimits: function(lockOtherParts) {
        var limitFunction = this._getActivePartProp("limits");
        return limitFunction(this._maskValue, lockOtherParts && this._getRealLimitsPattern())
    },
    _getActivePartValue: function(dateValue) {
        dateValue = dateValue || this._maskValue;
        var getter = this._getActivePartProp("getter");
        return (0, _type.isFunction)(getter) ? getter(dateValue) : dateValue[getter]()
    },
    _addLeadingZeroes: function(value) {
        var zeroes = this._searchValue.match(/^0+/);
        var limits = this._getActivePartLimits();
        var maxLimitLength = String(limits.max).length;
        return ((zeroes && zeroes[0] || "") + String(value)).substr(-maxLimitLength)
    },
    _setActivePartValue: function(value, dateValue) {
        dateValue = dateValue || this._maskValue;
        var setter = this._getActivePartProp("setter");
        var limits = this._getActivePartLimits();
        value = (0, _math.inRange)(value, limits.min, limits.max) ? value : value % 10;
        value = this._addLeadingZeroes((0, _math.fitIntoRange)(value, limits.min, limits.max));
        (0, _type.isFunction)(setter) ? setter(dateValue, value): dateValue[setter](value);
        this._renderDisplayText(this._getDisplayedText(dateValue));
        this._renderDateParts()
    },
    _getActivePartProp: function(property) {
        if (!this._dateParts || !this._dateParts[this._activePartIndex]) {
            return
        }
        return this._dateParts[this._activePartIndex][property]
    },
    _loadMaskValue: function() {
        var value = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : this.dateOption("value");
        this._maskValue = value && new Date(value);
        this._initialMaskValue = value && new Date(value)
    },
    _saveMaskValue: function() {
        var value = this._maskValue && new Date(this._maskValue);
        if (value && "date" === this.option("type")) {
            value.setHours(0, 0, 0, 0)
        }
        this._initialMaskValue = new Date(value);
        this.dateOption("value", value)
    },
    _revertChanges: function() {
        this._loadMaskValue();
        this._renderDisplayText(this._getDisplayedText(this._maskValue));
        this._renderDateParts()
    },
    _renderDisplayText: function(text) {
        this.callBase(text);
        if (this._useMaskBehavior()) {
            this.option("text", text)
        }
    },
    _partIncrease: function(step, lockOtherParts) {
        this._setNewDateIfEmpty();
        var _this$_getActivePartL2 = this._getActivePartLimits(lockOtherParts),
            max = _this$_getActivePartL2.max,
            min = _this$_getActivePartL2.min;
        var limitDelta = max - min;
        if (1 === limitDelta) {
            limitDelta++
        }
        var newValue = step + this._getActivePartValue();
        if (newValue > max) {
            newValue = this._applyLimits(newValue, {
                limitBase: min,
                limitClosest: max,
                limitDelta: limitDelta
            })
        } else {
            if (newValue < min) {
                newValue = this._applyLimits(newValue, {
                    limitBase: max,
                    limitClosest: min,
                    limitDelta: limitDelta
                })
            }
        }
        this._setActivePartValue(newValue)
    },
    _applyLimits: function(newValue, _ref2) {
        var limitBase = _ref2.limitBase,
            limitClosest = _ref2.limitClosest,
            limitDelta = _ref2.limitDelta;
        var delta = (newValue - limitClosest) % limitDelta;
        return delta ? limitBase + delta - 1 * (0, _math.sign)(delta) : limitClosest
    },
    _maskClickHandler: function() {
        if (this.option("text")) {
            this._activePartIndex = (0, _uiDate_boxMask.getDatePartIndexByPosition)(this._dateParts, this._caret().start);
            if ((0, _type.isDefined)(this._activePartIndex)) {
                this._caret(this._getActivePartProp("caret"))
            } else {
                this._selectLastPart()
            }
        }
    },
    _maskCompositionEndHandler: function(e) {
        var _this5 = this;
        if (_browser.default.msie && this._isSingleDigitKey(e)) {
            var key = e.originalEvent.data;
            this._processInputKey(key)
        } else {
            this._input().val(this._getDisplayedText(this._maskValue));
            this._selectNextPart();
            this._maskInputHandler = function() {
                _this5._renderSelectedPart()
            }
        }
    },
    _maskPasteHandler: function(e) {
        var newText = this._replaceSelectedText(this.option("text"), this._caret(), (0, _dom.clipboardText)(e));
        var date = _date.default.parse(newText, this._getFormatPattern());
        if (date && this._isDateValid(date)) {
            this._maskValue = date;
            this._renderDisplayText(this._getDisplayedText(this._maskValue));
            this._renderDateParts();
            this._selectNextPart()
        }
        e.preventDefault()
    },
    _isDateValid: function(date) {
        return (0, _type.isDate)(date) && !isNaN(date)
    },
    _isValueDirty: function() {
        var value = this.dateOption("value");
        return (this._maskValue && this._maskValue.getTime()) !== (value && value.getTime())
    },
    _fireChangeEvent: function() {
        this._clearSearchValue();
        if (this._isValueDirty()) {
            _events_engine.default.trigger(this._input(), "change")
        }
    },
    _enterHandler: function(e) {
        this._fireChangeEvent();
        this._selectNextPart(FORWARD);
        e.preventDefault()
    },
    _focusOutHandler: function(e) {
        this.callBase(e);
        if (this._useMaskBehavior() && !e.isDefaultPrevented()) {
            this._fireChangeEvent();
            this._selectFirstPart(e)
        }
    },
    _valueChangeEventHandler: function(e) {
        var text = this.option("text");
        if (this._useMaskBehavior()) {
            this._saveValueChangeEvent(e);
            if (!text) {
                this._maskValue = null
            } else {
                if (null === this._maskValue) {
                    this._loadMaskValue(text)
                }
            }
            this._saveMaskValue()
        } else {
            this.callBase(e)
        }
    },
    _optionChanged: function(args) {
        switch (args.name) {
            case "useMaskBehavior":
                this._renderMask();
                break;
            case "displayFormat":
            case "mode":
                this.callBase(args);
                this._renderMask();
                break;
            case "value":
                this._loadMaskValue();
                this.callBase(args);
                this._renderDateParts();
                break;
            case "emptyDateValue":
                break;
            default:
                this.callBase(args)
        }
    },
    _clearMaskState: function() {
        this._clearSearchValue();
        delete this._dateParts;
        delete this._activePartIndex;
        delete this._maskValue
    },
    reset: function() {
        this.callBase();
        this._clearMaskState();
        this._activePartIndex = 0
    },
    _clean: function() {
        this.callBase();
        this._detachMaskEvents();
        this._clearMaskState()
    }
});
var _default = DateBoxMask;
exports.default = _default;
module.exports = exports.default;
