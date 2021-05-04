/**
 * DevExtreme (ui/scroll_view/ui.scrollable.js)
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
var _support = require("../../core/utils/support");
var _browser = _interopRequireDefault(require("../../core/utils/browser"));
var _common = require("../../core/utils/common");
var _type = require("../../core/utils/type");
var _extend = require("../../core/utils/extend");
var _element = require("../../core/element");
var _window = require("../../core/utils/window");
var _dom_adapter = _interopRequireDefault(require("../../core/dom_adapter"));
var _devices = _interopRequireDefault(require("../../core/devices"));
var _component_registrator = _interopRequireDefault(require("../../core/component_registrator"));
var _dom_component = _interopRequireDefault(require("../../core/dom_component"));
var _selectors = require("../widget/selectors");
var _index = require("../../events/utils/index");
var _uiEventsEmitterGesture = _interopRequireDefault(require("./ui.events.emitter.gesture.scroll"));
var _uiScrollable = require("./ui.scrollable.simulated");
var _uiScrollable2 = _interopRequireDefault(require("./ui.scrollable.native"));
var _uiScrollable3 = require("./ui.scrollable.device");
var _deferred = require("../../core/utils/deferred");

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        "default": obj
    }
}
var SCROLLABLE = "dxScrollable";
var SCROLLABLE_STRATEGY = "dxScrollableStrategy";
var SCROLLABLE_CLASS = "dx-scrollable";
var SCROLLABLE_DISABLED_CLASS = "dx-scrollable-disabled";
var SCROLLABLE_CONTAINER_CLASS = "dx-scrollable-container";
var SCROLLABLE_WRAPPER_CLASS = "dx-scrollable-wrapper";
var SCROLLABLE_CONTENT_CLASS = "dx-scrollable-content";
var VERTICAL = "vertical";
var HORIZONTAL = "horizontal";
var BOTH = "both";
var Scrollable = _dom_component.default.inherit({
    _getDefaultOptions: function() {
        return (0, _extend.extend)(this.callBase(), {
            disabled: false,
            onScroll: null,
            direction: VERTICAL,
            showScrollbar: "onScroll",
            useNative: true,
            bounceEnabled: true,
            scrollByContent: true,
            scrollByThumb: false,
            onUpdated: null,
            onStart: null,
            onEnd: null,
            onBounce: null,
            onStop: null,
            useSimulatedScrollbar: false,
            useKeyboard: true,
            inertiaEnabled: true,
            pushBackValue: 0,
            updateManually: false
        })
    },
    _defaultOptionsRules: function() {
        return this.callBase().concat((0, _uiScrollable3.deviceDependentOptions)(), [{
            device: function() {
                return _support.nativeScrolling && "android" === _devices.default.real().platform && !_browser.default.mozilla
            },
            options: {
                useSimulatedScrollbar: true
            }
        }, {
            device: function() {
                return "ios" === _devices.default.real().platform
            },
            options: {
                pushBackValue: 1
            }
        }])
    },
    _initOptions: function(options) {
        this.callBase(options);
        if (!("useSimulatedScrollbar" in options)) {
            this._setUseSimulatedScrollbar()
        }
    },
    _setUseSimulatedScrollbar: function() {
        if (!this.initialOption("useSimulatedScrollbar")) {
            this.option("useSimulatedScrollbar", !this.option("useNative"))
        }
    },
    _init: function() {
        this.callBase();
        this._initScrollableMarkup();
        this._locked = false
    },
    _getWindowDevicePixelRatio: function() {
        return (0, _window.hasWindow)() ? (0, _window.getWindow)().devicePixelRatio : 1
    },
    _visibilityChanged: function(visible) {
        if (visible) {
            this.update();
            this._updateRtlPosition();
            this._savedScrollOffset && this.scrollTo(this._savedScrollOffset);
            delete this._savedScrollOffset
        } else {
            this._savedScrollOffset = this.scrollOffset()
        }
    },
    _initScrollableMarkup: function() {
        var $element = this.$element().addClass(SCROLLABLE_CLASS);
        var $container = this._$container = (0, _renderer.default)("<div>").addClass(SCROLLABLE_CONTAINER_CLASS);
        var $wrapper = this._$wrapper = (0, _renderer.default)("<div>").addClass(SCROLLABLE_WRAPPER_CLASS);
        var $content = this._$content = (0, _renderer.default)("<div>").addClass(SCROLLABLE_CONTENT_CLASS);
        if (_dom_adapter.default.hasDocumentProperty("onbeforeactivate") && _browser.default.msie && _browser.default.version < 12) {
            _events_engine.default.on($element, (0, _index.addNamespace)("beforeactivate", SCROLLABLE), function(e) {
                if (!(0, _renderer.default)(e.target).is(_selectors.focusable)) {
                    e.preventDefault()
                }
            })
        }
        $content.append($element.contents()).appendTo($container);
        $container.appendTo($wrapper);
        $wrapper.appendTo($element)
    },
    _dimensionChanged: function() {
        this.update();
        this._updateRtlPosition()
    },
    _initMarkup: function() {
        this.callBase();
        this._renderDirection()
    },
    _render: function() {
        this._renderStrategy();
        this._attachEventHandlers();
        this._renderDisabledState();
        this._createActions();
        this.update();
        this.callBase();
        this._rtlConfig = {
            scrollRight: 0,
            clientWidth: this._container().get(0).clientWidth,
            windowPixelRatio: this._getWindowDevicePixelRatio()
        };
        this._updateRtlPosition()
    },
    _isHorizontalAndRtlEnabled: function() {
        return this.option("rtlEnabled") && this.option("direction") !== VERTICAL
    },
    _updateRtlPosition: function() {
        var _this = this;
        this._updateBounds();
        if (this._isHorizontalAndRtlEnabled()) {
            (0, _common.deferUpdate)(function() {
                var scrollLeft = _this._getMaxOffset().left - _this._rtlConfig.scrollRight;
                if (scrollLeft <= 0) {
                    scrollLeft = 0;
                    _this._rtlConfig.scrollRight = _this._getMaxOffset().left
                }(0, _common.deferRender)(function() {
                    if (_this.scrollLeft() !== scrollLeft) {
                        _this._rtlConfig.skipUpdating = true;
                        _this.scrollTo({
                            left: scrollLeft
                        });
                        _this._rtlConfig.skipUpdating = false
                    }
                })
            })
        }
    },
    _getMaxOffset: function() {
        var _this$_container$get = this._container().get(0),
            scrollWidth = _this$_container$get.scrollWidth,
            clientWidth = _this$_container$get.clientWidth,
            scrollHeight = _this$_container$get.scrollHeight,
            clientHeight = _this$_container$get.clientHeight;
        return {
            left: scrollWidth - clientWidth,
            top: scrollHeight - clientHeight
        }
    },
    _updateBounds: function() {
        this._strategy.updateBounds()
    },
    _attachEventHandlers: function() {
        var strategy = this._strategy;
        var initEventData = {
            getDirection: strategy.getDirection.bind(strategy),
            validate: this._validate.bind(this),
            isNative: this.option("useNative"),
            scrollTarget: this._$container
        };
        _events_engine.default.off(this._$wrapper, "." + SCROLLABLE);
        _events_engine.default.on(this._$wrapper, (0, _index.addNamespace)(_uiEventsEmitterGesture.default.init, SCROLLABLE), initEventData, this._initHandler.bind(this));
        _events_engine.default.on(this._$wrapper, (0, _index.addNamespace)(_uiEventsEmitterGesture.default.start, SCROLLABLE), strategy.handleStart.bind(strategy));
        _events_engine.default.on(this._$wrapper, (0, _index.addNamespace)(_uiEventsEmitterGesture.default.move, SCROLLABLE), strategy.handleMove.bind(strategy));
        _events_engine.default.on(this._$wrapper, (0, _index.addNamespace)(_uiEventsEmitterGesture.default.end, SCROLLABLE), strategy.handleEnd.bind(strategy));
        _events_engine.default.on(this._$wrapper, (0, _index.addNamespace)(_uiEventsEmitterGesture.default.cancel, SCROLLABLE), strategy.handleCancel.bind(strategy));
        _events_engine.default.on(this._$wrapper, (0, _index.addNamespace)(_uiEventsEmitterGesture.default.stop, SCROLLABLE), strategy.handleStop.bind(strategy));
        _events_engine.default.off(this._$container, "." + SCROLLABLE);
        _events_engine.default.on(this._$container, (0, _index.addNamespace)("scroll", SCROLLABLE), strategy.handleScroll.bind(strategy))
    },
    _updateRtlConfig: function() {
        if (this._isHorizontalAndRtlEnabled() && !this._rtlConfig.skipUpdating) {
            var _this$_container$get2 = this._container().get(0),
                clientWidth = _this$_container$get2.clientWidth,
                scrollLeft = _this$_container$get2.scrollLeft;
            var windowPixelRatio = this._getWindowDevicePixelRatio();
            if (this._rtlConfig.windowPixelRatio === windowPixelRatio && this._rtlConfig.clientWidth === clientWidth) {
                this._rtlConfig.scrollRight = this._getMaxOffset().left - scrollLeft
            }
            this._rtlConfig.clientWidth = clientWidth;
            this._rtlConfig.windowPixelRatio = windowPixelRatio
        }
    },
    _validate: function(e) {
        if (this._isLocked()) {
            return false
        }
        this._updateIfNeed();
        return this._strategy.validate(e)
    },
    _initHandler: function() {
        var strategy = this._strategy;
        strategy.handleInit.apply(strategy, arguments)
    },
    _renderDisabledState: function() {
        this.$element().toggleClass(SCROLLABLE_DISABLED_CLASS, this.option("disabled"));
        if (this.option("disabled")) {
            this._lock()
        } else {
            this._unlock()
        }
    },
    _renderDirection: function() {
        this.$element().removeClass("dx-scrollable-" + HORIZONTAL).removeClass("dx-scrollable-" + VERTICAL).removeClass("dx-scrollable-" + BOTH).addClass("dx-scrollable-" + this.option("direction"))
    },
    _renderStrategy: function() {
        this._createStrategy();
        this._strategy.render();
        this.$element().data(SCROLLABLE_STRATEGY, this._strategy)
    },
    _createStrategy: function() {
        this._strategy = this.option("useNative") ? new _uiScrollable2.default(this) : new _uiScrollable.SimulatedStrategy(this)
    },
    _createActions: function() {
        this._strategy && this._strategy.createActions()
    },
    _clean: function() {
        this._strategy && this._strategy.dispose()
    },
    _optionChanged: function(args) {
        switch (args.name) {
            case "onStart":
            case "onEnd":
            case "onStop":
            case "onUpdated":
            case "onScroll":
            case "onBounce":
                this._createActions();
                break;
            case "direction":
                this._resetInactiveDirection();
                this._invalidate();
                break;
            case "useNative":
                this._setUseSimulatedScrollbar();
                this._invalidate();
                break;
            case "inertiaEnabled":
            case "scrollByContent":
            case "scrollByThumb":
            case "bounceEnabled":
            case "useKeyboard":
            case "showScrollbar":
            case "useSimulatedScrollbar":
            case "pushBackValue":
                this._invalidate();
                break;
            case "disabled":
                this._renderDisabledState();
                this._strategy && this._strategy.disabledChanged();
                break;
            case "updateManually":
                break;
            case "width":
                this.callBase(args);
                this._updateRtlPosition();
                break;
            default:
                this.callBase(args)
        }
    },
    _resetInactiveDirection: function() {
        var inactiveProp = this._getInactiveProp();
        if (!inactiveProp || !(0, _window.hasWindow)()) {
            return
        }
        var scrollOffset = this.scrollOffset();
        scrollOffset[inactiveProp] = 0;
        this.scrollTo(scrollOffset)
    },
    _getInactiveProp: function() {
        var direction = this.option("direction");
        if (direction === VERTICAL) {
            return "left"
        }
        if (direction === HORIZONTAL) {
            return "top"
        }
    },
    _location: function() {
        return this._strategy.location()
    },
    _normalizeLocation: function(location) {
        if ((0, _type.isPlainObject)(location)) {
            var left = (0, _common.ensureDefined)(location.left, location.x);
            var top = (0, _common.ensureDefined)(location.top, location.y);
            return {
                left: (0, _type.isDefined)(left) ? -left : void 0,
                top: (0, _type.isDefined)(top) ? -top : void 0
            }
        } else {
            var direction = this.option("direction");
            return {
                left: direction !== VERTICAL ? -location : void 0,
                top: direction !== HORIZONTAL ? -location : void 0
            }
        }
    },
    _isLocked: function() {
        return this._locked
    },
    _lock: function() {
        this._locked = true
    },
    _unlock: function() {
        if (!this.option("disabled")) {
            this._locked = false
        }
    },
    _isDirection: function(direction) {
        var current = this.option("direction");
        if (direction === VERTICAL) {
            return current !== HORIZONTAL
        }
        if (direction === HORIZONTAL) {
            return current !== VERTICAL
        }
        return current === direction
    },
    _updateAllowedDirection: function() {
        var allowedDirections = this._strategy._allowedDirections();
        if (this._isDirection(BOTH) && allowedDirections.vertical && allowedDirections.horizontal) {
            this._allowedDirectionValue = BOTH
        } else {
            if (this._isDirection(HORIZONTAL) && allowedDirections.horizontal) {
                this._allowedDirectionValue = HORIZONTAL
            } else {
                if (this._isDirection(VERTICAL) && allowedDirections.vertical) {
                    this._allowedDirectionValue = VERTICAL
                } else {
                    this._allowedDirectionValue = null
                }
            }
        }
    },
    _allowedDirection: function() {
        return this._allowedDirectionValue
    },
    _container: function() {
        return this._$container
    },
    $content: function() {
        return this._$content
    },
    content: function() {
        return (0, _element.getPublicElement)(this._$content)
    },
    scrollOffset: function() {
        return this._getScrollOffset()
    },
    _getScrollOffset: function() {
        return {
            top: -this._location().top,
            left: -this._location().left
        }
    },
    scrollTop: function() {
        return this.scrollOffset().top
    },
    scrollLeft: function() {
        return this.scrollOffset().left
    },
    clientHeight: function() {
        return this._$container.height()
    },
    scrollHeight: function() {
        return this.$content().outerHeight() - 2 * this._strategy.verticalOffset()
    },
    clientWidth: function() {
        return this._$container.width()
    },
    scrollWidth: function() {
        return this.$content().outerWidth()
    },
    update: function() {
        if (!this._strategy) {
            return
        }
        return (0, _deferred.when)(this._strategy.update()).done(function() {
            this._updateAllowedDirection()
        }.bind(this))
    },
    scrollBy: function(distance) {
        distance = this._normalizeLocation(distance);
        if (!distance.top && !distance.left) {
            return
        }
        this._updateIfNeed();
        this._strategy.scrollBy(distance);
        this._updateRtlConfig()
    },
    scrollTo: function(targetLocation) {
        targetLocation = this._normalizeLocation(targetLocation);
        this._updateIfNeed();
        var location = this._location();
        if (!this.option("useNative")) {
            targetLocation = this._strategy._applyScaleRatio(targetLocation);
            location = this._strategy._applyScaleRatio(location)
        }
        var distance = this._normalizeLocation({
            left: location.left - (0, _common.ensureDefined)(targetLocation.left, location.left),
            top: location.top - (0, _common.ensureDefined)(targetLocation.top, location.top)
        });
        if (!distance.top && !distance.left) {
            return
        }
        this._strategy.scrollBy(distance);
        this._updateRtlConfig()
    },
    scrollToElement: function(element, offset) {
        var $element = (0, _renderer.default)(element);
        var elementInsideContent = this.$content().find(element).length;
        var elementIsInsideContent = $element.parents("." + SCROLLABLE_CLASS).length - $element.parents("." + SCROLLABLE_CONTENT_CLASS).length === 0;
        if (!elementInsideContent || !elementIsInsideContent) {
            return
        }
        var scrollPosition = {
            top: 0,
            left: 0
        };
        var direction = this.option("direction");
        if (direction !== VERTICAL) {
            scrollPosition.left = this.getScrollElementPosition($element, HORIZONTAL, offset)
        }
        if (direction !== HORIZONTAL) {
            scrollPosition.top = this.getScrollElementPosition($element, VERTICAL, offset)
        }
        this.scrollTo(scrollPosition)
    },
    scrollToElementTopLeft: function(element) {
        var $element = (0, _renderer.default)(element);
        var elementInsideContent = this.$content().find(element).length;
        var elementIsInsideContent = $element.parents("." + SCROLLABLE_CLASS).length - $element.parents("." + SCROLLABLE_CONTENT_CLASS).length === 0;
        if (!elementInsideContent || !elementIsInsideContent) {
            return
        }
        var scrollPosition = {
            top: 0,
            left: 0
        };
        var direction = this.option("direction");
        if (direction !== VERTICAL) {
            var leftPosition = this._elementPositionRelativeToContent($element, "left");
            scrollPosition.left = true === this.option("rtlEnabled") ? leftPosition + $element.width() - this.clientWidth() : leftPosition
        }
        if (direction !== HORIZONTAL) {
            scrollPosition.top = this._elementPositionRelativeToContent($element, "top")
        }
        this.scrollTo(scrollPosition)
    },
    getScrollElementPosition: function($element, direction, offset) {
        offset = offset || {};
        var isVertical = direction === VERTICAL;
        var startOffset = (isVertical ? offset.top : offset.left) || 0;
        var endOffset = (isVertical ? offset.bottom : offset.right) || 0;
        var pushBackOffset = isVertical ? this._strategy.verticalOffset() : 0;
        var elementPositionRelativeToContent = this._elementPositionRelativeToContent($element, isVertical ? "top" : "left");
        var elementPosition = elementPositionRelativeToContent - pushBackOffset;
        var elementSize = $element[isVertical ? "outerHeight" : "outerWidth"]();
        var scrollLocation = isVertical ? this.scrollTop() : this.scrollLeft();
        var clientSize = this._container().get(0)[isVertical ? "clientHeight" : "clientWidth"];
        var startDistance = scrollLocation - elementPosition + startOffset;
        var endDistance = scrollLocation - elementPosition - elementSize + clientSize - endOffset;
        if (startDistance <= 0 && endDistance >= 0) {
            return scrollLocation
        }
        return scrollLocation - (Math.abs(startDistance) > Math.abs(endDistance) ? endDistance : startDistance)
    },
    _elementPositionRelativeToContent: function($element, prop) {
        var result = 0;
        while (this._hasScrollContent($element)) {
            result += $element.position()[prop];
            $element = $element.offsetParent()
        }
        return result
    },
    _hasScrollContent: function($element) {
        var $content = this.$content();
        return $element.closest($content).length && !$element.is($content)
    },
    _updateIfNeed: function() {
        if (!this.option("updateManually")) {
            this.update()
        }
    },
    _useTemplates: function() {
        return false
    }
});
(0, _component_registrator.default)(SCROLLABLE, Scrollable);
var _default = Scrollable;
exports.default = _default;
module.exports = exports.default;
