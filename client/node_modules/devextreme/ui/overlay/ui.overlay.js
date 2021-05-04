/**
 * DevExtreme (ui/overlay/ui.overlay.js)
 * Version: 20.2.6
 * Build date: Tue Mar 16 2021
 *
 * Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
exports.default = void 0;
var _fx = _interopRequireDefault(require("../../animation/fx"));
var _position = _interopRequireDefault(require("../../animation/position"));
var _translator = require("../../animation/translator");
var _component_registrator = _interopRequireDefault(require("../../core/component_registrator"));
var _devices = _interopRequireDefault(require("../../core/devices"));
var _dom_adapter = _interopRequireDefault(require("../../core/dom_adapter"));
var _element = require("../../core/element");
var _renderer = _interopRequireDefault(require("../../core/renderer"));
var _empty_template = require("../../core/templates/empty_template");
var _array = require("../../core/utils/array");
var _browser = _interopRequireDefault(require("../../core/utils/browser"));
var _common = require("../../core/utils/common");
var _deferred = require("../../core/utils/deferred");
var _dom = require("../../core/utils/dom");
var _extend = require("../../core/utils/extend");
var _iterator = require("../../core/utils/iterator");
var _math = require("../../core/utils/math");
var _ready_callbacks = _interopRequireDefault(require("../../core/utils/ready_callbacks"));
var _type = require("../../core/utils/type");
var _version = require("../../core/utils/version");
var _view_port = require("../../core/utils/view_port");
var _window = require("../../core/utils/window");
var _events_engine = _interopRequireDefault(require("../../events/core/events_engine"));
var _drag = require("../../events/drag");
var _pointer = _interopRequireDefault(require("../../events/pointer"));
var _short = require("../../events/short");
var _index = require("../../events/utils/index");
var _visibility_change = require("../../events/visibility_change");
var _hide_callback = require("../../mobile/hide_callback");
var _resizable = _interopRequireDefault(require("../resizable"));
var _selectors = require("../widget/selectors");
var _swatch_container = _interopRequireDefault(require("../widget/swatch_container"));
var _ui = _interopRequireDefault(require("../widget/ui.widget"));
var zIndexPool = _interopRequireWildcard(require("./z_index"));

function _getRequireWildcardCache() {
    if ("function" !== typeof WeakMap) {
        return null
    }
    var cache = new WeakMap;
    _getRequireWildcardCache = function() {
        return cache
    };
    return cache
}

function _interopRequireWildcard(obj) {
    if (obj && obj.__esModule) {
        return obj
    }
    if (null === obj || "object" !== _typeof(obj) && "function" !== typeof obj) {
        return {
            "default": obj
        }
    }
    var cache = _getRequireWildcardCache();
    if (cache && cache.has(obj)) {
        return cache.get(obj)
    }
    var newObj = {};
    var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;
    for (var key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
            var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;
            if (desc && (desc.get || desc.set)) {
                Object.defineProperty(newObj, key, desc)
            } else {
                newObj[key] = obj[key]
            }
        }
    }
    newObj.default = obj;
    if (cache) {
        cache.set(obj, newObj)
    }
    return newObj
}

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        "default": obj
    }
}

function _typeof(obj) {
    "@babel/helpers - typeof";
    if ("function" === typeof Symbol && "symbol" === typeof Symbol.iterator) {
        _typeof = function(obj) {
            return typeof obj
        }
    } else {
        _typeof = function(obj) {
            return obj && "function" === typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj
        }
    }
    return _typeof(obj)
}
var ready = _ready_callbacks.default.add;
var window = (0, _window.getWindow)();
var navigator = (0, _window.getNavigator)();
var viewPortChanged = _view_port.changeCallback;
var OVERLAY_CLASS = "dx-overlay";
var OVERLAY_WRAPPER_CLASS = "dx-overlay-wrapper";
var OVERLAY_CONTENT_CLASS = "dx-overlay-content";
var OVERLAY_SHADER_CLASS = "dx-overlay-shader";
var OVERLAY_MODAL_CLASS = "dx-overlay-modal";
var INNER_OVERLAY_CLASS = "dx-inner-overlay";
var INVISIBLE_STATE_CLASS = "dx-state-invisible";
var ANONYMOUS_TEMPLATE_NAME = "content";
var RTL_DIRECTION_CLASS = "dx-rtl";
var ACTIONS = ["onShowing", "onShown", "onHiding", "onHidden", "onPositioning", "onPositioned", "onResizeStart", "onResize", "onResizeEnd"];
var OVERLAY_STACK = [];
var DISABLED_STATE_CLASS = "dx-state-disabled";
var PREVENT_SAFARI_SCROLLING_CLASS = "dx-prevent-safari-scrolling";
var TAB_KEY = "tab";
var POSITION_ALIASES = {
    top: {
        my: "top center",
        at: "top center"
    },
    bottom: {
        my: "bottom center",
        at: "bottom center"
    },
    right: {
        my: "right center",
        at: "right center"
    },
    left: {
        my: "left center",
        at: "left center"
    },
    center: {
        my: "center",
        at: "center"
    },
    "right bottom": {
        my: "right bottom",
        at: "right bottom"
    },
    "right top": {
        my: "right top",
        at: "right top"
    },
    "left bottom": {
        my: "left bottom",
        at: "left bottom"
    },
    "left top": {
        my: "left top",
        at: "left top"
    }
};
var realDevice = _devices.default.real();
var realVersion = realDevice.version;
var firefoxDesktop = _browser.default.mozilla && "desktop" === realDevice.deviceType;
var iOS = "ios" === realDevice.platform;
var hasSafariAddressBar = _browser.default.safari && "desktop" !== realDevice.deviceType;
var android4_0nativeBrowser = "android" === realDevice.platform && 0 === (0, _version.compare)(realVersion, [4, 0], 2) && navigator.userAgent.indexOf("Chrome") === -1;
var forceRepaint = function($element) {
    if (firefoxDesktop) {
        $element.width()
    }
    if (android4_0nativeBrowser) {
        var $parents = $element.parents();
        var inScrollView = $parents.is(".dx-scrollable-native");
        if (!inScrollView) {
            $parents.css("backfaceVisibility", "hidden");
            $parents.css("backfaceVisibility");
            $parents.css("backfaceVisibility", "visible")
        }
    }
};
var getElement = function(value) {
    if ((0, _type.isEvent)(value)) {
        value = value.target
    }
    return (0, _renderer.default)(value)
};
ready(function() {
    _events_engine.default.subscribeGlobal(_dom_adapter.default.getDocument(), _pointer.default.down, function(e) {
        for (var i = OVERLAY_STACK.length - 1; i >= 0; i--) {
            if (!OVERLAY_STACK[i]._proxiedDocumentDownHandler(e)) {
                return
            }
        }
    })
});
var Overlay = _ui.default.inherit({
    _supportedKeys: function() {
        var offsetSize = 5;
        var move = function(top, left, e) {
            if (!this.option("dragEnabled")) {
                return
            }
            e.preventDefault();
            e.stopPropagation();
            var allowedOffsets = this._allowedOffsets();
            var offset = {
                top: (0, _math.fitIntoRange)(top, -allowedOffsets.top, allowedOffsets.bottom),
                left: (0, _math.fitIntoRange)(left, -allowedOffsets.left, allowedOffsets.right)
            };
            this._changePosition(offset)
        };
        return (0, _extend.extend)(this.callBase(), {
            escape: function() {
                this.hide()
            },
            upArrow: move.bind(this, -offsetSize, 0),
            downArrow: move.bind(this, offsetSize, 0),
            leftArrow: move.bind(this, 0, -offsetSize),
            rightArrow: move.bind(this, 0, offsetSize)
        })
    },
    _getDefaultOptions: function() {
        var _this = this;
        return (0, _extend.extend)(this.callBase(), {
            activeStateEnabled: false,
            visible: false,
            deferRendering: true,
            shading: true,
            shadingColor: "",
            position: {
                my: "center",
                at: "center"
            },
            width: function() {
                return .8 * (0, _renderer.default)(window).width()
            },
            minWidth: null,
            maxWidth: null,
            height: function() {
                return .8 * (0, _renderer.default)(window).height()
            },
            minHeight: null,
            maxHeight: null,
            animation: {
                show: {
                    type: "pop",
                    duration: 300,
                    from: {
                        scale: .55
                    }
                },
                hide: {
                    type: "pop",
                    duration: 300,
                    to: {
                        opacity: 0,
                        scale: .55
                    },
                    from: {
                        opacity: 1,
                        scale: 1
                    }
                }
            },
            closeOnOutsideClick: false,
            onShowing: null,
            onShown: null,
            onHiding: null,
            onHidden: null,
            contentTemplate: "content",
            dragEnabled: false,
            resizeEnabled: false,
            onResizeStart: null,
            onResize: null,
            onResizeEnd: null,
            innerOverlay: false,
            target: void 0,
            container: void 0,
            hideTopOverlayHandler: function() {
                _this.hide()
            },
            closeOnTargetScroll: false,
            onPositioned: null,
            boundaryOffset: {
                h: 0,
                v: 0
            },
            propagateOutsideClick: false,
            ignoreChildEvents: true,
            _checkParentVisibility: true,
            _fixedPosition: false
        })
    },
    _defaultOptionsRules: function() {
        return this.callBase().concat([{
            device: function() {
                var realDevice = _devices.default.real();
                var realPlatform = realDevice.platform;
                var realVersion = realDevice.version;
                return "android" === realPlatform && (0, _version.compare)(realVersion, [4, 2]) < 0
            },
            options: {
                animation: {
                    show: {
                        type: "fade",
                        duration: 400
                    },
                    hide: {
                        type: "fade",
                        duration: 400,
                        to: {
                            opacity: 0
                        },
                        from: {
                            opacity: 1
                        }
                    }
                }
            }
        }, {
            device: function() {
                return !(0, _window.hasWindow)()
            },
            options: {
                width: null,
                height: null,
                animation: null,
                _checkParentVisibility: false
            }
        }])
    },
    _setOptionsByReference: function() {
        this.callBase();
        (0, _extend.extend)(this._optionsByReference, {
            animation: true
        })
    },
    _wrapper: function() {
        return this._$wrapper
    },
    _container: function() {
        return this._$content
    },
    _eventBindingTarget: function() {
        return this._$content
    },
    _init: function() {
        this.callBase();
        this._initActions();
        this._initCloseOnOutsideClickHandler();
        this._initTabTerminatorHandler();
        this._$wrapper = (0, _renderer.default)("<div>").addClass(OVERLAY_WRAPPER_CLASS);
        this._$content = (0, _renderer.default)("<div>").addClass(OVERLAY_CONTENT_CLASS);
        this._initInnerOverlayClass();
        var $element = this.$element();
        this._$wrapper.addClass($element.attr("class"));
        $element.addClass(OVERLAY_CLASS);
        this._$wrapper.attr("data-bind", "dxControlsDescendantBindings: true");
        _events_engine.default.on(this._$wrapper, "MSPointerDown", _common.noop);
        _events_engine.default.on(this._$wrapper, "focusin", function(e) {
            e.stopPropagation()
        });
        this._toggleViewPortSubscription(true);
        this._initHideTopOverlayHandler(this.option("hideTopOverlayHandler"))
    },
    _initOptions: function(options) {
        this._initTarget(options.target);
        var container = void 0 === options.container ? this.option("container") : options.container;
        this._initContainer(container);
        this.callBase(options)
    },
    _initInnerOverlayClass: function() {
        this._$content.toggleClass(INNER_OVERLAY_CLASS, this.option("innerOverlay"))
    },
    _initTarget: function(target) {
        if (!(0, _type.isDefined)(target)) {
            return
        }
        var options = this.option();
        (0, _iterator.each)(["position.of", "animation.show.from.position.of", "animation.show.to.position.of", "animation.hide.from.position.of", "animation.hide.to.position.of"], function(_, path) {
            var pathParts = path.split(".");
            var option = options;
            while (option) {
                if (1 === pathParts.length) {
                    if ((0, _type.isPlainObject)(option)) {
                        option[pathParts.shift()] = target
                    }
                    break
                } else {
                    option = option[pathParts.shift()]
                }
            }
        })
    },
    _initContainer: function(container) {
        container = void 0 === container ? (0, _view_port.value)() : container;
        var $element = this.$element();
        var $container = $element.closest(container);
        if (!$container.length) {
            $container = (0, _renderer.default)(container).first()
        }
        this._$container = $container.length ? $container : $element.parent()
    },
    _initHideTopOverlayHandler: function(handler) {
        this._hideTopOverlayHandler = handler
    },
    _initActions: function() {
        var _this2 = this;
        this._actions = {};
        (0, _iterator.each)(ACTIONS, function(_, action) {
            _this2._actions[action] = _this2._createActionByOption(action, {
                excludeValidators: ["disabled", "readOnly"]
            }) || _common.noop
        })
    },
    _initCloseOnOutsideClickHandler: function() {
        var that = this;
        this._proxiedDocumentDownHandler = function() {
            return that._documentDownHandler.apply(that, arguments)
        }
    },
    _documentDownHandler: function(e) {
        if (this._showAnimationProcessing) {
            this._stopAnimation()
        }
        var closeOnOutsideClick = this.option("closeOnOutsideClick");
        if ((0, _type.isFunction)(closeOnOutsideClick)) {
            closeOnOutsideClick = closeOnOutsideClick(e)
        }
        var $container = this._$content;
        var isAttachedTarget = (0, _renderer.default)(window.document).is(e.target) || (0, _dom.contains)(window.document, e.target);
        var isInnerOverlay = (0, _renderer.default)(e.target).closest("." + INNER_OVERLAY_CLASS).length;
        var outsideClick = isAttachedTarget && !isInnerOverlay && !($container.is(e.target) || (0, _dom.contains)($container.get(0), e.target));
        if (outsideClick && closeOnOutsideClick) {
            this._outsideClickHandler(e)
        }
        return this.option("propagateOutsideClick")
    },
    _outsideClickHandler: function(e) {
        if (this.option("shading")) {
            e.preventDefault()
        }
        this.hide()
    },
    _getAnonymousTemplateName: function() {
        return ANONYMOUS_TEMPLATE_NAME
    },
    _initTemplates: function() {
        this._templateManager.addDefaultTemplates({
            content: new _empty_template.EmptyTemplate
        });
        this.callBase()
    },
    _isTopOverlay: function() {
        var overlayStack = this._overlayStack();
        for (var i = overlayStack.length - 1; i >= 0; i--) {
            var tabbableElements = overlayStack[i]._findTabbableBounds();
            if (tabbableElements.first || tabbableElements.last) {
                return overlayStack[i] === this
            }
        }
        return false
    },
    _overlayStack: function() {
        return OVERLAY_STACK
    },
    _zIndexInitValue: function() {
        return Overlay.baseZIndex()
    },
    _toggleViewPortSubscription: function(toggle) {
        viewPortChanged.remove(this._viewPortChangeHandle);
        if (toggle) {
            this._viewPortChangeHandle = this._viewPortChangeHandler.bind(this);
            viewPortChanged.add(this._viewPortChangeHandle)
        }
    },
    _viewPortChangeHandler: function() {
        this._initContainer(this.option("container"));
        this._refresh()
    },
    _renderVisibilityAnimate: function(visible) {
        this._stopAnimation();
        return visible ? this._show() : this._hide()
    },
    _normalizePosition: function() {
        var position = this.option("position");
        this._position = "function" === typeof position ? position() : position
    },
    _getAnimationConfig: function() {
        var animation = this.option("animation");
        if ((0, _type.isFunction)(animation)) {
            animation = animation.call(this)
        }
        return animation
    },
    _show: function() {
        var _this3 = this;
        var that = this;
        var deferred = new _deferred.Deferred;
        this._parentHidden = this._isParentHidden();
        deferred.done(function() {
            delete that._parentHidden
        });
        if (this._parentHidden) {
            this._isHidden = true;
            return deferred.resolve()
        }
        if (this._currentVisible) {
            return (new _deferred.Deferred).resolve().promise()
        }
        this._currentVisible = true;
        this._isShown = false;
        this._normalizePosition();
        var animation = that._getAnimationConfig() || {};
        var showAnimation = this._normalizeAnimation(animation.show, "to");
        var startShowAnimation = showAnimation && showAnimation.start || _common.noop;
        var completeShowAnimation = showAnimation && showAnimation.complete || _common.noop;
        if (this._isHidingActionCanceled) {
            delete this._isHidingActionCanceled;
            deferred.resolve()
        } else {
            var show = function() {
                _this3._renderVisibility(true);
                if (_this3._isShowingActionCanceled) {
                    delete _this3._isShowingActionCanceled;
                    deferred.resolve();
                    return
                }
                _this3._animate(showAnimation, function() {
                    if (that.option("focusStateEnabled")) {
                        _events_engine.default.trigger(that._focusTarget(), "focus")
                    }
                    completeShowAnimation.apply(this, arguments);
                    that._showAnimationProcessing = false;
                    that._isShown = true;
                    that._actions.onShown();
                    that._toggleSafariScrolling(false);
                    deferred.resolve()
                }, function() {
                    startShowAnimation.apply(this, arguments);
                    that._showAnimationProcessing = true
                })
            };
            if (this.option("templatesRenderAsynchronously")) {
                this._stopShowTimer();
                this._asyncShowTimeout = setTimeout(show)
            } else {
                show()
            }
        }
        return deferred.promise()
    },
    _normalizeAnimation: function(animation, prop) {
        if (animation) {
            animation = (0, _extend.extend)({
                type: "slide"
            }, animation);
            if (animation[prop] && "object" === _typeof(animation[prop])) {
                (0, _extend.extend)(animation[prop], {
                    position: this._position
                })
            }
        }
        return animation
    },
    _hide: function() {
        if (!this._currentVisible) {
            return (new _deferred.Deferred).resolve().promise()
        }
        this._currentVisible = false;
        var that = this;
        var deferred = new _deferred.Deferred;
        var animation = that._getAnimationConfig() || {};
        var hideAnimation = this._normalizeAnimation(animation.hide, "from");
        var startHideAnimation = hideAnimation && hideAnimation.start || _common.noop;
        var completeHideAnimation = hideAnimation && hideAnimation.complete || _common.noop;
        var hidingArgs = {
            cancel: false
        };
        if (this._isShowingActionCanceled) {
            deferred.resolve()
        } else {
            this._actions.onHiding(hidingArgs);
            that._toggleSafariScrolling(true);
            if (hidingArgs.cancel) {
                this._isHidingActionCanceled = true;
                this.option("visible", true);
                deferred.resolve()
            } else {
                this._forceFocusLost();
                this._toggleShading(false);
                this._toggleSubscriptions(false);
                this._stopShowTimer();
                this._animate(hideAnimation, function() {
                    var _that$_actions;
                    that._$content.css("pointerEvents", "");
                    that._renderVisibility(false);
                    completeHideAnimation.apply(this, arguments);
                    that._hideAnimationProcessing = false;
                    null === (_that$_actions = that._actions) || void 0 === _that$_actions ? void 0 : _that$_actions.onHidden();
                    deferred.resolve()
                }, function() {
                    that._$content.css("pointerEvents", "none");
                    startHideAnimation.apply(this, arguments);
                    that._hideAnimationProcessing = true
                })
            }
        }
        return deferred.promise()
    },
    _forceFocusLost: function() {
        var activeElement = _dom_adapter.default.getActiveElement();
        var shouldResetActiveElement = !!this._$content.find(activeElement).length;
        if (shouldResetActiveElement) {
            (0, _dom.resetActiveElement)()
        }
    },
    _animate: function(animation, completeCallback, startCallback) {
        if (animation) {
            startCallback = startCallback || animation.start || _common.noop;
            _fx.default.animate(this._$content, (0, _extend.extend)({}, animation, {
                start: startCallback,
                complete: completeCallback
            }))
        } else {
            completeCallback()
        }
    },
    _stopAnimation: function() {
        _fx.default.stop(this._$content, true)
    },
    _renderVisibility: function(visible) {
        if (visible && this._isParentHidden()) {
            return
        }
        this._currentVisible = visible;
        this._stopAnimation();
        if (!visible) {
            (0, _visibility_change.triggerHidingEvent)(this._$content)
        }
        this._toggleVisibility(visible);
        this._$content.toggleClass(INVISIBLE_STATE_CLASS, !visible);
        this._updateZIndexStackPosition(visible);
        if (visible) {
            this._renderContent();
            var showingArgs = {
                cancel: false
            };
            this._actions.onShowing(showingArgs);
            if (showingArgs.cancel) {
                this._toggleVisibility(false);
                this._$content.toggleClass(INVISIBLE_STATE_CLASS, true);
                this._updateZIndexStackPosition(false);
                this._moveFromContainer();
                this._isShowingActionCanceled = true;
                this.option("visible", false);
                return
            }
            this._moveToContainer();
            this._renderGeometry();
            (0, _visibility_change.triggerShownEvent)(this._$content);
            (0, _visibility_change.triggerResizeEvent)(this._$content)
        } else {
            this._moveFromContainer()
        }
        this._toggleShading(visible);
        this._toggleSubscriptions(visible)
    },
    _updateZIndexStackPosition: function(pushToStack) {
        var overlayStack = this._overlayStack();
        var index = (0, _array.inArray)(this, overlayStack);
        if (pushToStack) {
            if (index === -1) {
                this._zIndex = zIndexPool.create(this._zIndexInitValue());
                overlayStack.push(this)
            }
            this._$wrapper.css("zIndex", this._zIndex);
            this._$content.css("zIndex", this._zIndex)
        } else {
            if (index !== -1) {
                overlayStack.splice(index, 1);
                zIndexPool.remove(this._zIndex)
            }
        }
    },
    _toggleShading: function(visible) {
        this._$wrapper.toggleClass(OVERLAY_MODAL_CLASS, this.option("shading") && !this.option("container"));
        this._$wrapper.toggleClass(OVERLAY_SHADER_CLASS, visible && this.option("shading"));
        this._$wrapper.css("backgroundColor", this.option("shading") ? this.option("shadingColor") : "");
        this._toggleTabTerminator(visible && this.option("shading"))
    },
    _initTabTerminatorHandler: function() {
        var that = this;
        this._proxiedTabTerminatorHandler = function() {
            that._tabKeyHandler.apply(that, arguments)
        }
    },
    _toggleTabTerminator: function(enabled) {
        var eventName = (0, _index.addNamespace)("keydown", this.NAME);
        if (enabled) {
            _events_engine.default.on(_dom_adapter.default.getDocument(), eventName, this._proxiedTabTerminatorHandler)
        } else {
            _events_engine.default.off(_dom_adapter.default.getDocument(), eventName, this._proxiedTabTerminatorHandler)
        }
    },
    _findTabbableBounds: function() {
        var $elements = this._$wrapper.find("*");
        var elementsCount = $elements.length - 1;
        var result = {
            first: null,
            last: null
        };
        for (var i = 0; i <= elementsCount; i++) {
            if (!result.first && $elements.eq(i).is(_selectors.tabbable)) {
                result.first = $elements.eq(i)
            }
            if (!result.last && $elements.eq(elementsCount - i).is(_selectors.tabbable)) {
                result.last = $elements.eq(elementsCount - i)
            }
            if (result.first && result.last) {
                break
            }
        }
        return result
    },
    _tabKeyHandler: function(e) {
        if ((0, _index.normalizeKeyName)(e) !== TAB_KEY || !this._isTopOverlay()) {
            return
        }
        var tabbableElements = this._findTabbableBounds();
        var $firstTabbable = tabbableElements.first;
        var $lastTabbable = tabbableElements.last;
        var isTabOnLast = !e.shiftKey && e.target === $lastTabbable.get(0);
        var isShiftTabOnFirst = e.shiftKey && e.target === $firstTabbable.get(0);
        var isEmptyTabList = 0 === tabbableElements.length;
        var isOutsideTarget = !(0, _dom.contains)(this._$wrapper.get(0), e.target);
        if (isTabOnLast || isShiftTabOnFirst || isEmptyTabList || isOutsideTarget) {
            e.preventDefault();
            var $focusElement = e.shiftKey ? $lastTabbable : $firstTabbable;
            _events_engine.default.trigger($focusElement, "focusin");
            _events_engine.default.trigger($focusElement, "focus")
        }
    },
    _toggleSubscriptions: function(enabled) {
        if ((0, _window.hasWindow)()) {
            this._toggleHideTopOverlayCallback(enabled);
            this._toggleParentsScrollSubscription(enabled)
        }
    },
    _toggleHideTopOverlayCallback: function(subscribe) {
        if (!this._hideTopOverlayHandler) {
            return
        }
        if (subscribe) {
            _hide_callback.hideCallback.add(this._hideTopOverlayHandler)
        } else {
            _hide_callback.hideCallback.remove(this._hideTopOverlayHandler)
        }
    },
    _toggleParentsScrollSubscription: function(subscribe) {
        var _this4 = this;
        if (!this._position) {
            return
        }
        var target = this._position.of || (0, _renderer.default)();
        var closeOnScroll = this.option("closeOnTargetScroll");
        var $parents = getElement(target).parents();
        var scrollEvent = (0, _index.addNamespace)("scroll", this.NAME);
        if ("desktop" === _devices.default.real().deviceType) {
            $parents = $parents.add(window)
        }
        this._proxiedTargetParentsScrollHandler = this._proxiedTargetParentsScrollHandler || function(e) {
            _this4._targetParentsScrollHandler(e)
        };
        _events_engine.default.off((0, _renderer.default)().add(this._$prevTargetParents), scrollEvent, this._proxiedTargetParentsScrollHandler);
        if (subscribe && closeOnScroll) {
            _events_engine.default.on($parents, scrollEvent, this._proxiedTargetParentsScrollHandler);
            this._$prevTargetParents = $parents
        }
    },
    _targetParentsScrollHandler: function(e) {
        var closeHandled = false;
        var closeOnScroll = this.option("closeOnTargetScroll");
        if ((0, _type.isFunction)(closeOnScroll)) {
            closeHandled = closeOnScroll(e)
        }
        if (!closeHandled && !this._showAnimationProcessing) {
            this.hide()
        }
    },
    _render: function() {
        this.callBase();
        this._appendContentToElement();
        this._renderVisibilityAnimate(this.option("visible"))
    },
    _appendContentToElement: function() {
        if (!this._$content.parent().is(this.$element())) {
            this._$content.appendTo(this.$element())
        }
    },
    _renderContent: function() {
        var shouldDeferRendering = !this._currentVisible && this.option("deferRendering");
        var isParentHidden = this.option("visible") && this._isParentHidden();
        if (isParentHidden) {
            this._isHidden = true;
            return
        }
        if (this._contentAlreadyRendered || shouldDeferRendering) {
            return
        }
        this._contentAlreadyRendered = true;
        this._appendContentToElement();
        this.callBase()
    },
    _isParentHidden: function() {
        if (!this.option("_checkParentVisibility")) {
            return false
        }
        if (void 0 !== this._parentHidden) {
            return this._parentHidden
        }
        var $parent = this.$element().parent();
        if ($parent.is(":visible")) {
            return false
        }
        var isHidden = false;
        $parent.add($parent.parents()).each(function() {
            var $element = (0, _renderer.default)(this);
            if ("none" === $element.css("display")) {
                isHidden = true;
                return false
            }
        });
        return isHidden || !_dom_adapter.default.getBody().contains($parent.get(0))
    },
    _renderContentImpl: function() {
        var _this5 = this;
        var whenContentRendered = new _deferred.Deferred;
        var contentTemplateOption = this.option("contentTemplate");
        var contentTemplate = this._getTemplate(contentTemplateOption);
        var transclude = this._templateManager.anonymousTemplateName === contentTemplateOption;
        contentTemplate && contentTemplate.render({
            container: (0, _element.getPublicElement)(this.$content()),
            noModel: true,
            transclude: transclude,
            onRendered: function() {
                whenContentRendered.resolve()
            }
        });
        this._renderDrag();
        this._renderResize();
        this._renderScrollTerminator();
        whenContentRendered.done(function() {
            if (_this5.option("visible")) {
                _this5._moveToContainer()
            }
        });
        return whenContentRendered.promise()
    },
    _renderDrag: function() {
        var $dragTarget = this._getDragTarget();
        if (!$dragTarget) {
            return
        }
        var startEventName = (0, _index.addNamespace)(_drag.start, this.NAME);
        var updateEventName = (0, _index.addNamespace)(_drag.move, this.NAME);
        _events_engine.default.off($dragTarget, startEventName);
        _events_engine.default.off($dragTarget, updateEventName);
        if (!this.option("dragEnabled")) {
            return
        }
        _events_engine.default.on($dragTarget, startEventName, this._dragStartHandler.bind(this));
        _events_engine.default.on($dragTarget, updateEventName, this._dragUpdateHandler.bind(this))
    },
    _renderResize: function() {
        this._resizable = this._createComponent(this._$content, _resizable.default, {
            handles: this.option("resizeEnabled") ? "all" : "none",
            onResizeEnd: this._resizeEndHandler.bind(this),
            onResize: this._actions.onResize.bind(this),
            onResizeStart: this._actions.onResizeStart.bind(this),
            minHeight: 100,
            minWidth: 100,
            area: this._getDragResizeContainer()
        })
    },
    _resizeEndHandler: function() {
        this._positionChangeHandled = true;
        var width = this._resizable.option("width");
        var height = this._resizable.option("height");
        width && this.option("width", width);
        height && this.option("height", height);
        this._actions.onResizeEnd()
    },
    _renderScrollTerminator: function() {
        var $scrollTerminator = this._wrapper();
        var terminatorEventName = (0, _index.addNamespace)(_drag.move, this.NAME);
        _events_engine.default.off($scrollTerminator, terminatorEventName);
        _events_engine.default.on($scrollTerminator, terminatorEventName, {
            validate: function() {
                return true
            },
            getDirection: function() {
                return "both"
            },
            _toggleGestureCover: function(toggle) {
                if (!toggle) {
                    this._toggleGestureCoverImpl(toggle)
                }
            },
            _clearSelection: _common.noop,
            isNative: true
        }, function(e) {
            var originalEvent = e.originalEvent.originalEvent;
            var _ref = originalEvent || {},
                type = _ref.type;
            var isWheel = "wheel" === type;
            var isMouseMove = "mousemove" === type;
            var isScrollByWheel = isWheel && !(0, _index.isCommandKeyPressed)(e);
            e._cancelPreventDefault = true;
            if (originalEvent && false !== e.cancelable && (!isMouseMove && !isWheel || isScrollByWheel)) {
                e.preventDefault()
            }
        })
    },
    _getDragTarget: function() {
        return this.$content()
    },
    _dragStartHandler: function(e) {
        e.targetElements = [];
        this._prevOffset = {
            x: 0,
            y: 0
        };
        var allowedOffsets = this._allowedOffsets();
        e.maxTopOffset = allowedOffsets.top;
        e.maxBottomOffset = allowedOffsets.bottom;
        e.maxLeftOffset = allowedOffsets.left;
        e.maxRightOffset = allowedOffsets.right
    },
    _getDragResizeContainer: function() {
        var isContainerDefined = (0, _view_port.originalViewPort)().get(0) || this.option("container");
        var $container = !isContainerDefined ? (0, _renderer.default)(window) : this._$container;
        return $container
    },
    _deltaSize: function() {
        var $content = this._$content;
        var $container = this._getDragResizeContainer();
        var contentWidth = $content.outerWidth();
        var contentHeight = $content.outerHeight();
        var containerWidth = $container.outerWidth();
        var containerHeight = $container.outerHeight();
        if (this._isWindow($container)) {
            var document = _dom_adapter.default.getDocument();
            var fullPageHeight = Math.max((0, _renderer.default)(document).outerHeight(), containerHeight);
            var fullPageWidth = Math.max((0, _renderer.default)(document).outerWidth(), containerWidth);
            containerHeight = fullPageHeight;
            containerWidth = fullPageWidth
        }
        return {
            width: containerWidth - contentWidth,
            height: containerHeight - contentHeight
        }
    },
    _dragUpdateHandler: function(e) {
        var offset = e.offset;
        var prevOffset = this._prevOffset;
        var targetOffset = {
            top: offset.y - prevOffset.y,
            left: offset.x - prevOffset.x
        };
        this._changePosition(targetOffset);
        this._prevOffset = offset
    },
    _changePosition: function(offset) {
        var position = (0, _translator.locate)(this._$content);
        (0, _translator.move)(this._$content, {
            left: position.left + offset.left,
            top: position.top + offset.top
        });
        this._positionChangeHandled = true
    },
    _allowedOffsets: function() {
        var position = (0, _translator.locate)(this._$content);
        var deltaSize = this._deltaSize();
        var isAllowedDrag = deltaSize.height >= 0 && deltaSize.width >= 0;
        var shaderOffset = this.option("shading") && !this.option("container") && !this._isWindow(this._getContainer()) ? (0, _translator.locate)(this._$wrapper) : {
            top: 0,
            left: 0
        };
        var boundaryOffset = this.option("boundaryOffset");
        return {
            top: isAllowedDrag ? position.top + shaderOffset.top + boundaryOffset.v : 0,
            bottom: isAllowedDrag ? -position.top - shaderOffset.top + deltaSize.height - boundaryOffset.v : 0,
            left: isAllowedDrag ? position.left + shaderOffset.left + boundaryOffset.h : 0,
            right: isAllowedDrag ? -position.left - shaderOffset.left + deltaSize.width - boundaryOffset.h : 0
        }
    },
    _moveFromContainer: function() {
        this._$content.appendTo(this.$element());
        this._detachWrapperToContainer()
    },
    _detachWrapperToContainer: function() {
        this._$wrapper.detach()
    },
    _moveToContainer: function() {
        this._attachWrapperToContainer();
        this._$content.appendTo(this._$wrapper)
    },
    _attachWrapperToContainer: function() {
        var $element = this.$element();
        var containerDefined = void 0 !== this.option("container");
        var renderContainer = containerDefined ? this._$container : _swatch_container.default.getSwatchContainer($element);
        if (renderContainer && renderContainer[0] === $element.parent()[0]) {
            renderContainer = $element
        }
        this._$wrapper.appendTo(renderContainer)
    },
    _fixHeightAfterSafariAddressBarResizing: function() {
        if (this._isWindow(this._getContainer()) && hasSafariAddressBar) {
            this._$wrapper.css("minHeight", window.innerHeight)
        }
    },
    _renderGeometry: function(isDimensionChanged) {
        if (this.option("visible") && (0, _window.hasWindow)()) {
            this._renderGeometryImpl(isDimensionChanged)
        }
    },
    _renderGeometryImpl: function(isDimensionChanged) {
        this._stopAnimation();
        this._normalizePosition();
        this._renderWrapper();
        this._fixHeightAfterSafariAddressBarResizing();
        this._renderDimensions();
        var resultPosition = this._renderPosition();
        this._actions.onPositioned({
            position: resultPosition
        })
    },
    _fixWrapperPosition: function() {
        this._$wrapper.css("position", this._useFixedPosition() ? "fixed" : "absolute")
    },
    _useFixedPosition: function() {
        return this._shouldFixBodyPosition() || this.option("_fixedPosition")
    },
    _shouldFixBodyPosition: function() {
        var $container = this._getContainer();
        return this._isWindow($container) && (!iOS || void 0 !== this._bodyScrollTop)
    },
    _toggleSafariScrolling: function(scrollingEnabled) {
        if (iOS && this._shouldFixBodyPosition()) {
            var body = _dom_adapter.default.getBody();
            if (scrollingEnabled) {
                (0, _renderer.default)(body).removeClass(PREVENT_SAFARI_SCROLLING_CLASS);
                window.scrollTo(0, this._bodyScrollTop);
                this._bodyScrollTop = void 0
            } else {
                if (this.option("visible")) {
                    this._bodyScrollTop = window.pageYOffset;
                    (0, _renderer.default)(body).addClass(PREVENT_SAFARI_SCROLLING_CLASS)
                }
            }
        }
    },
    _renderWrapper: function() {
        this._fixWrapperPosition();
        this._renderWrapperDimensions();
        this._renderWrapperPosition()
    },
    _renderWrapperDimensions: function() {
        var wrapperWidth;
        var wrapperHeight;
        var $container = this._getContainer();
        if (!$container) {
            return
        }
        var isWindow = this._isWindow($container);
        wrapperWidth = isWindow ? "" : $container.outerWidth(), wrapperHeight = isWindow ? "" : $container.outerHeight();
        this._$wrapper.css({
            width: wrapperWidth,
            height: wrapperHeight
        })
    },
    _isWindow: function($element) {
        return !!$element && (0, _type.isWindow)($element.get(0))
    },
    _renderWrapperPosition: function() {
        var $container = this._getContainer();
        if ($container) {
            _position.default.setup(this._$wrapper, {
                my: "top left",
                at: "top left",
                of: $container
            })
        }
    },
    _getContainer: function() {
        var position = this._position;
        var container = this.option("container");
        var positionOf = null;
        if (!container && position) {
            positionOf = (0, _type.isEvent)(position.of) ? window : position.of || window
        }
        return getElement(container || positionOf)
    },
    _renderDimensions: function() {
        var content = this._$content.get(0);
        this._$content.css({
            minWidth: this._getOptionValue("minWidth", content),
            maxWidth: this._getOptionValue("maxWidth", content),
            minHeight: this._getOptionValue("minHeight", content),
            maxHeight: this._getOptionValue("maxHeight", content),
            width: this._getOptionValue("width", content),
            height: this._getOptionValue("height", content)
        })
    },
    _renderPosition: function() {
        if (this._positionChangeHandled) {
            var allowedOffsets = this._allowedOffsets();
            this._changePosition({
                top: (0, _math.fitIntoRange)(0, -allowedOffsets.top, allowedOffsets.bottom),
                left: (0, _math.fitIntoRange)(0, -allowedOffsets.left, allowedOffsets.right)
            })
        } else {
            this._renderOverlayBoundaryOffset();
            (0, _translator.resetPosition)(this._$content);
            var position = this._transformStringPosition(this._position, POSITION_ALIASES);
            var resultPosition = _position.default.setup(this._$content, position);
            forceRepaint(this._$content);
            this._actions.onPositioning();
            return resultPosition
        }
    },
    _transformStringPosition: function(position, positionAliases) {
        if ((0, _type.isString)(position)) {
            position = (0, _extend.extend)({}, positionAliases[position])
        }
        return position
    },
    _renderOverlayBoundaryOffset: function() {
        var boundaryOffset = this.option("boundaryOffset");
        this._$content.css("margin", boundaryOffset.v + "px " + boundaryOffset.h + "px")
    },
    _focusTarget: function() {
        return this._$content
    },
    _attachKeyboardEvents: function() {
        var _this6 = this;
        this._keyboardListenerId = _short.keyboard.on(this._$content, null, function(opts) {
            return _this6._keyboardHandler(opts)
        })
    },
    _keyboardHandler: function(options) {
        var e = options.originalEvent;
        var $target = (0, _renderer.default)(e.target);
        if ($target.is(this._$content) || !this.option("ignoreChildEvents")) {
            this.callBase.apply(this, arguments)
        }
    },
    _isVisible: function() {
        return this.option("visible")
    },
    _visibilityChanged: function(visible) {
        if (visible) {
            if (this.option("visible")) {
                this._renderVisibilityAnimate(visible)
            }
        } else {
            this._renderVisibilityAnimate(visible)
        }
    },
    _dimensionChanged: function() {
        this._renderGeometry(true)
    },
    _clean: function() {
        if (!this._contentAlreadyRendered) {
            this.$content().empty()
        }
        this._renderVisibility(false);
        this._stopShowTimer();
        this._cleanFocusState()
    },
    _stopShowTimer: function() {
        if (this._asyncShowTimeout) {
            clearTimeout(this._asyncShowTimeout)
        }
        this._asyncShowTimeout = null
    },
    _dispose: function() {
        _fx.default.stop(this._$content, false);
        clearTimeout(this._deferShowTimer);
        this._toggleViewPortSubscription(false);
        this._toggleSubscriptions(false);
        this._updateZIndexStackPosition(false);
        this._toggleTabTerminator(false);
        this._toggleSafariScrolling(true);
        this._actions = null;
        this.callBase();
        zIndexPool.remove(this._zIndex);
        this._$wrapper.remove();
        this._$content.remove()
    },
    _toggleDisabledState: function(value) {
        this.callBase.apply(this, arguments);
        this._$content.toggleClass(DISABLED_STATE_CLASS, Boolean(value))
    },
    _toggleRTLDirection: function(rtl) {
        this._$content.toggleClass(RTL_DIRECTION_CLASS, rtl)
    },
    _optionChanged: function(args) {
        var _this7 = this;
        var value = args.value;
        if ((0, _array.inArray)(args.name, ACTIONS) > -1) {
            this._initActions();
            return
        }
        switch (args.name) {
            case "dragEnabled":
                this._renderDrag();
                this._renderGeometry();
                break;
            case "resizeEnabled":
                this._renderResize();
                this._renderGeometry();
                break;
            case "shading":
            case "shadingColor":
                this._toggleShading(this.option("visible"));
                break;
            case "width":
            case "height":
            case "minWidth":
            case "maxWidth":
            case "minHeight":
            case "maxHeight":
            case "boundaryOffset":
                this._renderGeometry();
                break;
            case "position":
                this._positionChangeHandled = false;
                this._renderGeometry();
                break;
            case "visible":
                this._renderVisibilityAnimate(value).done(function() {
                    if (!_this7._animateDeferred) {
                        return
                    }
                    _this7._animateDeferred.resolveWith(_this7)
                });
                break;
            case "target":
                this._initTarget(value);
                this._invalidate();
                break;
            case "container":
                this._initContainer(value);
                this._invalidate();
                break;
            case "innerOverlay":
                this._initInnerOverlayClass();
                break;
            case "deferRendering":
            case "contentTemplate":
                this._contentAlreadyRendered = false;
                this._clean();
                this._invalidate();
                break;
            case "hideTopOverlayHandler":
                this._toggleHideTopOverlayCallback(false);
                this._initHideTopOverlayHandler(args.value);
                this._toggleHideTopOverlayCallback(this.option("visible"));
                break;
            case "closeOnTargetScroll":
                this._toggleParentsScrollSubscription(this.option("visible"));
                break;
            case "closeOnOutsideClick":
            case "animation":
            case "propagateOutsideClick":
                break;
            case "rtlEnabled":
                this._contentAlreadyRendered = false;
                this.callBase(args);
                break;
            case "_fixedPosition":
                this._fixWrapperPosition();
                break;
            default:
                this.callBase(args)
        }
    },
    toggle: function(showing) {
        var _this8 = this;
        showing = void 0 === showing ? !this.option("visible") : showing;
        var result = new _deferred.Deferred;
        if (showing === this.option("visible")) {
            return result.resolveWith(this, [showing]).promise()
        }
        var animateDeferred = new _deferred.Deferred;
        this._animateDeferred = animateDeferred;
        this.option("visible", showing);
        animateDeferred.promise().done(function() {
            delete _this8._animateDeferred;
            result.resolveWith(_this8, [_this8.option("visible")])
        });
        return result.promise()
    },
    $content: function() {
        return this._$content
    },
    show: function() {
        return this.toggle(true)
    },
    hide: function() {
        return this.toggle(false)
    },
    content: function() {
        return (0, _element.getPublicElement)(this._$content)
    },
    repaint: function() {
        if (this._contentAlreadyRendered) {
            this._renderGeometry();
            (0, _visibility_change.triggerResizeEvent)(this._$content)
        } else {
            this.callBase()
        }
    }
});
Overlay.baseZIndex = function(zIndex) {
    return zIndexPool.base(zIndex)
};
(0, _component_registrator.default)("dxOverlay", Overlay);
var _default = Overlay;
exports.default = _default;
module.exports = exports.default;
