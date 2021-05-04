/**
 * DevExtreme (ui/slider/ui.slider.js)
 * Version: 20.2.6
 * Build date: Tue Mar 16 2021
 *
 * Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
exports.default = void 0;
var _component_registrator = _interopRequireDefault(require("../../core/component_registrator"));
var _devices = _interopRequireDefault(require("../../core/devices"));
var _renderer = _interopRequireDefault(require("../../core/renderer"));
var _common = require("../../core/utils/common");
var _deferred = require("../../core/utils/deferred");
var _extend = require("../../core/utils/extend");
var _click = require("../../events/click");
var _emitter = require("../../events/core/emitter.feedback");
var _events_engine = _interopRequireDefault(require("../../events/core/events_engine"));
var _swipeable = _interopRequireDefault(require("../../events/gesture/swipeable"));
var _pointer = _interopRequireDefault(require("../../events/pointer"));
var _index = require("../../events/utils/index");
var _visibility_change = require("../../events/visibility_change");
var _number = _interopRequireDefault(require("../../localization/number"));
var _themes = require("../themes");
var _track_bar = _interopRequireDefault(require("../track_bar"));
var _utils = require("../widget/utils.ink_ripple");
var _ui = _interopRequireDefault(require("./ui.slider_handle"));
var _math = require("../../core/utils/math");

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        "default": obj
    }
}
var SLIDER_CLASS = "dx-slider";
var SLIDER_WRAPPER_CLASS = "dx-slider-wrapper";
var SLIDER_HANDLE_SELECTOR = ".dx-slider-handle";
var SLIDER_BAR_CLASS = "dx-slider-bar";
var SLIDER_RANGE_CLASS = "dx-slider-range";
var SLIDER_RANGE_VISIBLE_CLASS = "dx-slider-range-visible";
var SLIDER_LABEL_CLASS = "dx-slider-label";
var SLIDER_LABEL_POSITION_CLASS_PREFIX = "dx-slider-label-position-";
var SLIDER_TOOLTIP_POSITION_CLASS_PREFIX = "dx-slider-tooltip-position-";
var INVALID_MESSAGE_VISIBLE_CLASS = "dx-invalid-message-visible";
var SLIDER_VALIDATION_NAMESPACE = "Validation";
var Slider = _track_bar.default.inherit({
    _activeStateUnit: SLIDER_HANDLE_SELECTOR,
    _supportedKeys: function() {
        var _this = this;
        var isRTL = this.option("rtlEnabled");
        var roundedValue = function(offset, isLeftDirection) {
            offset = _this._valueStep(offset);
            var step = _this.option("step");
            var value = _this.option("value");
            var currentPosition = value - _this.option("min");
            var remainder = (0, _math.getRemainderByDivision)(currentPosition, step, _this._getValueExponentLength());
            var result = isLeftDirection ? value - offset + (remainder ? step - remainder : 0) : value + offset - remainder;
            var min = _this.option("min");
            var max = _this.option("max");
            if (result < min) {
                result = min
            } else {
                if (result > max) {
                    result = max
                }
            }
            return _this._roundToExponentLength(result)
        };
        var moveHandleRight = function(offset) {
            _this.option("value", roundedValue(offset, isRTL))
        };
        var moveHandleLeft = function(offset) {
            _this.option("value", roundedValue(offset, !isRTL))
        };
        return (0, _extend.extend)(this.callBase(), {
            leftArrow: function(e) {
                this._processKeyboardEvent(e);
                moveHandleLeft(this.option("step"))
            },
            rightArrow: function(e) {
                this._processKeyboardEvent(e);
                moveHandleRight(this.option("step"))
            },
            pageUp: function(e) {
                this._processKeyboardEvent(e);
                moveHandleRight(this.option("step") * this.option("keyStep"))
            },
            pageDown: function(e) {
                this._processKeyboardEvent(e);
                moveHandleLeft(this.option("step") * this.option("keyStep"))
            },
            home: function(e) {
                this._processKeyboardEvent(e);
                var min = this.option("min");
                this.option("value", min)
            },
            end: function(e) {
                this._processKeyboardEvent(e);
                var max = this.option("max");
                this.option("value", max)
            }
        })
    },
    _processKeyboardEvent: function(e) {
        e.preventDefault();
        e.stopPropagation();
        this._saveValueChangeEvent(e)
    },
    _getDefaultOptions: function() {
        return (0, _extend.extend)(this.callBase(), {
            value: 50,
            hoverStateEnabled: true,
            activeStateEnabled: true,
            step: 1,
            showRange: true,
            tooltip: {
                enabled: false,
                format: function(value) {
                    return value
                },
                position: "top",
                showMode: "onHover"
            },
            label: {
                visible: false,
                position: "bottom",
                format: function(value) {
                    return value
                }
            },
            keyStep: 1,
            useInkRipple: false,
            validationMessageOffset: (0, _themes.isMaterial)() ? {
                h: 18,
                v: 0
            } : {
                h: 7,
                v: 4
            },
            focusStateEnabled: true
        })
    },
    _toggleValidationMessage: function(visible) {
        if (!this.option("isValid")) {
            this.$element().toggleClass(INVALID_MESSAGE_VISIBLE_CLASS, visible)
        }
    },
    _defaultOptionsRules: function() {
        return this.callBase().concat([{
            device: function() {
                return "desktop" === _devices.default.real().deviceType && !_devices.default.isSimulator()
            },
            options: {
                focusStateEnabled: true
            }
        }, {
            device: function() {
                var themeName = (0, _themes.current)();
                return (0, _themes.isMaterial)(themeName)
            },
            options: {
                useInkRipple: true
            }
        }])
    },
    _initMarkup: function() {
        this.$element().addClass(SLIDER_CLASS);
        this._renderSubmitElement();
        this.option("useInkRipple") && this._renderInkRipple();
        this.callBase();
        this._renderLabels();
        this._renderStartHandler();
        this._renderAriaMinAndMax()
    },
    _attachFocusEvents: function() {
        this.callBase();
        var namespace = this.NAME + SLIDER_VALIDATION_NAMESPACE;
        var focusInEvent = (0, _index.addNamespace)("focusin", namespace);
        var focusOutEvent = (0, _index.addNamespace)("focusout", namespace);
        var $focusTarget = this._focusTarget();
        _events_engine.default.on($focusTarget, focusInEvent, this._toggleValidationMessage.bind(this, true));
        _events_engine.default.on($focusTarget, focusOutEvent, this._toggleValidationMessage.bind(this, false))
    },
    _detachFocusEvents: function() {
        this.callBase();
        var $focusTarget = this._focusTarget();
        this._toggleValidationMessage(false);
        _events_engine.default.off($focusTarget, this.NAME + SLIDER_VALIDATION_NAMESPACE)
    },
    _render: function() {
        this.callBase();
        this._repaintHandle()
    },
    _renderSubmitElement: function() {
        this._$submitElement = (0, _renderer.default)("<input>").attr("type", "hidden").appendTo(this.$element())
    },
    _getSubmitElement: function() {
        return this._$submitElement
    },
    _renderInkRipple: function() {
        this._inkRipple = (0, _utils.render)({
            waveSizeCoefficient: .7,
            isCentered: true,
            wavesNumber: 2,
            useHoldAnimation: false
        })
    },
    _renderInkWave: function(element, dxEvent, doRender, waveIndex) {
        if (!this._inkRipple) {
            return
        }
        var config = {
            element: element,
            event: dxEvent,
            wave: waveIndex
        };
        if (doRender) {
            this._inkRipple.showWave(config)
        } else {
            this._inkRipple.hideWave(config)
        }
    },
    _visibilityChanged: function() {
        this.repaint()
    },
    _renderWrapper: function() {
        this.callBase();
        this._$wrapper.addClass(SLIDER_WRAPPER_CLASS);
        this._createComponent(this._$wrapper, _swipeable.default, {
            elastic: false,
            immediate: true,
            onStart: this._swipeStartHandler.bind(this),
            onUpdated: this._swipeUpdateHandler.bind(this),
            onEnd: this._swipeEndHandler.bind(this),
            itemSizeFunc: this._itemWidthFunc.bind(this)
        })
    },
    _renderContainer: function() {
        this.callBase();
        this._$bar.addClass(SLIDER_BAR_CLASS)
    },
    _renderRange: function() {
        this.callBase();
        this._$range.addClass(SLIDER_RANGE_CLASS);
        this._renderHandle();
        this._renderRangeVisibility()
    },
    _renderRangeVisibility: function() {
        this._$range.toggleClass(SLIDER_RANGE_VISIBLE_CLASS, Boolean(this.option("showRange")))
    },
    _renderHandle: function() {
        this._$handle = this._renderHandleImpl(this.option("value"), this._$handle)
    },
    _renderHandleImpl: function(value, $element) {
        var $handle = $element || (0, _renderer.default)("<div>").appendTo(this._$range);
        var format = this.option("tooltip.format");
        var tooltipEnabled = this.option("tooltip.enabled");
        var tooltipPosition = this.option("tooltip.position");
        this.$element().toggleClass(SLIDER_TOOLTIP_POSITION_CLASS_PREFIX + "bottom", tooltipEnabled && "bottom" === tooltipPosition).toggleClass(SLIDER_TOOLTIP_POSITION_CLASS_PREFIX + "top", tooltipEnabled && "top" === tooltipPosition);
        this._createComponent($handle, _ui.default, {
            value: value,
            tooltipEnabled: tooltipEnabled,
            tooltipPosition: tooltipPosition,
            tooltipFormat: format,
            tooltipShowMode: this.option("tooltip.showMode"),
            tooltipFitIn: this.$element()
        });
        return $handle
    },
    _renderAriaMinAndMax: function() {
        this.setAria({
            valuemin: this.option("min"),
            valuemax: this.option("max")
        }, this._$handle)
    },
    _hoverStartHandler: function(e) {
        _ui.default.getInstance((0, _renderer.default)(e.currentTarget)).updateTooltip()
    },
    _toggleActiveState: function($element, value) {
        this.callBase($element, value);
        if (value) {
            _ui.default.getInstance($element).updateTooltip()
        }
        this._renderInkWave($element, null, !!value, 1)
    },
    _toggleFocusClass: function(isFocused, $element) {
        this.callBase(isFocused, $element);
        if (this._disposed) {
            return
        }
        var $focusTarget = (0, _renderer.default)($element || this._focusTarget());
        this._renderInkWave($focusTarget, null, isFocused, 0)
    },
    _renderLabels: function() {
        this.$element().removeClass(SLIDER_LABEL_POSITION_CLASS_PREFIX + "bottom").removeClass(SLIDER_LABEL_POSITION_CLASS_PREFIX + "top");
        if (this.option("label.visible")) {
            var min = this.option("min");
            var max = this.option("max");
            var position = this.option("label.position");
            var labelFormat = this.option("label.format");
            if (!this._$minLabel) {
                this._$minLabel = (0, _renderer.default)("<div>").addClass(SLIDER_LABEL_CLASS).appendTo(this._$wrapper)
            }
            this._$minLabel.html(_number.default.format(min, labelFormat));
            if (!this._$maxLabel) {
                this._$maxLabel = (0, _renderer.default)("<div>").addClass(SLIDER_LABEL_CLASS).appendTo(this._$wrapper)
            }
            this._$maxLabel.html(_number.default.format(max, labelFormat));
            this.$element().addClass(SLIDER_LABEL_POSITION_CLASS_PREFIX + position)
        } else {
            if (this._$minLabel) {
                this._$minLabel.remove();
                delete this._$minLabel
            }
            if (this._$maxLabel) {
                this._$maxLabel.remove();
                delete this._$maxLabel
            }
        }
    },
    _renderStartHandler: function() {
        var _this2 = this;
        var pointerDownEventName = (0, _index.addNamespace)(_pointer.default.down, this.NAME);
        var clickEventName = (0, _index.addNamespace)(_click.name, this.NAME);
        var startAction = this._createAction(this._startHandler.bind(this));
        var $element = this.$element();
        _events_engine.default.off($element, pointerDownEventName);
        _events_engine.default.on($element, pointerDownEventName, function(e) {
            if ((0, _index.isMouseEvent)(e)) {
                startAction({
                    event: e
                })
            }
        });
        _events_engine.default.off($element, clickEventName);
        _events_engine.default.on($element, clickEventName, function(e) {
            var $handle = _this2._activeHandle();
            if ($handle) {
                _events_engine.default.trigger($handle, "focusin");
                _events_engine.default.trigger($handle, "focus")
            }
            startAction({
                event: e
            })
        })
    },
    _itemWidthFunc: function() {
        return this._itemWidthRatio
    },
    _swipeStartHandler: function(e) {
        var rtlEnabled = this.option("rtlEnabled");
        if ((0, _index.isTouchEvent)(e.event)) {
            this._createAction(this._startHandler.bind(this))({
                event: e.event
            })
        }
        this._feedbackDeferred = new _deferred.Deferred;
        (0, _emitter.lock)(this._feedbackDeferred);
        this._toggleActiveState(this._activeHandle(), this.option("activeStateEnabled"));
        this._startOffset = this._currentRatio;
        var startOffset = this._startOffset * this._swipePixelRatio();
        var endOffset = (1 - this._startOffset) * this._swipePixelRatio();
        e.event.maxLeftOffset = rtlEnabled ? endOffset : startOffset;
        e.event.maxRightOffset = rtlEnabled ? startOffset : endOffset;
        this._itemWidthRatio = this.$element().width() / this._swipePixelRatio();
        this._needPreventAnimation = true
    },
    _swipeEndHandler: function(e) {
        this._feedbackDeferred.resolve();
        this._toggleActiveState(this._activeHandle(), false);
        var offsetDirection = this.option("rtlEnabled") ? -1 : 1;
        delete this._needPreventAnimation;
        this._saveValueChangeEvent(e.event);
        this._changeValueOnSwipe(this._startOffset + offsetDirection * e.event.targetOffset / this._swipePixelRatio());
        delete this._startOffset;
        this._renderValue()
    },
    _activeHandle: function() {
        return this._$handle
    },
    _swipeUpdateHandler: function(e) {
        this._saveValueChangeEvent(e.event);
        this._updateHandlePosition(e)
    },
    _updateHandlePosition: function(e) {
        var offsetDirection = this.option("rtlEnabled") ? -1 : 1;
        var newRatio = Math.min(this._startOffset + offsetDirection * e.event.offset / this._swipePixelRatio(), 1);
        this._$range.width(100 * newRatio + "%");
        _ui.default.getInstance(this._activeHandle()).fitTooltipPosition;
        this._changeValueOnSwipe(newRatio)
    },
    _swipePixelRatio: function() {
        var min = this.option("min");
        var max = this.option("max");
        var step = this._valueStep(this.option("step"));
        return (max - min) / step
    },
    _valueStep: function(step) {
        if (!step || isNaN(step)) {
            step = 1
        }
        return step
    },
    _getValueExponentLength: function() {
        var _this$option = this.option(),
            step = _this$option.step,
            min = _this$option.min;
        return Math.max((0, _math.getExponentLength)(step), (0, _math.getExponentLength)(min))
    },
    _roundToExponentLength: function(value) {
        var valueExponentLength = this._getValueExponentLength();
        return (0, _math.roundFloatPart)(value, valueExponentLength)
    },
    _changeValueOnSwipe: function(ratio) {
        var min = this.option("min");
        var max = this.option("max");
        var step = this._valueStep(this.option("step"));
        var newChange = ratio * (max - min);
        var newValue = min + newChange;
        if (step < 0) {
            return
        }
        if (newValue === max || newValue === min) {
            this._setValueOnSwipe(newValue)
        } else {
            var stepCount = Math.round((newValue - min) / step);
            newValue = this._roundToExponentLength(stepCount * step + min);
            this._setValueOnSwipe(Math.max(Math.min(newValue, max), min))
        }
    },
    _setValueOnSwipe: function(value) {
        this.option("value", value);
        this._saveValueChangeEvent(void 0)
    },
    _startHandler: function(args) {
        var e = args.event;
        this._currentRatio = ((0, _index.eventData)(e).x - this._$bar.offset().left) / this._$bar.width();
        if (this.option("rtlEnabled")) {
            this._currentRatio = 1 - this._currentRatio
        }
        this._saveValueChangeEvent(e);
        this._changeValueOnSwipe(this._currentRatio)
    },
    _renderValue: function() {
        this.callBase();
        var value = this.option("value");
        this._getSubmitElement().val((0, _common.applyServerDecimalSeparator)(value));
        _ui.default.getInstance(this._activeHandle()).option("value", value)
    },
    _setRangeStyles: function(options) {
        options && this._$range.css(options)
    },
    _callHandlerMethod: function(name, args) {
        _ui.default.getInstance(this._$handle)[name](args)
    },
    _repaintHandle: function() {
        this._callHandlerMethod("repaint")
    },
    _fitTooltip: function() {
        this._callHandlerMethod("fitTooltipPosition")
    },
    _optionChanged: function(args) {
        switch (args.name) {
            case "visible":
                this.callBase(args);
                this._renderHandle();
                this._repaintHandle();
                (0, _visibility_change.triggerShownEvent)(this.$element());
                break;
            case "min":
            case "max":
                this._renderValue();
                this.callBase(args);
                this._renderLabels();
                this._renderAriaMinAndMax();
                this._fitTooltip();
                break;
            case "step":
                this._renderValue();
                break;
            case "keyStep":
                break;
            case "showRange":
                this._renderRangeVisibility();
                break;
            case "tooltip":
                this._renderHandle();
                break;
            case "label":
                this._renderLabels();
                break;
            case "useInkRipple":
                this._invalidate();
                break;
            default:
                this.callBase(args)
        }
    },
    _refresh: function() {
        this._toggleRTLDirection(this.option("rtlEnabled"));
        this._renderDimensions();
        this._renderValue();
        this._renderHandle();
        this._repaintHandle()
    },
    _clean: function() {
        delete this._inkRipple;
        this.callBase()
    }
});
(0, _component_registrator.default)("dxSlider", Slider);
var _default = Slider;
exports.default = _default;
module.exports = exports.default;
