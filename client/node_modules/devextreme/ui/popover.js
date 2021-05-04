/**
 * DevExtreme (ui/popover.js)
 * Version: 20.2.6
 * Build date: Tue Mar 16 2021
 *
 * Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
exports.default = void 0;
var _renderer = _interopRequireDefault(require("../core/renderer"));
var _window = require("../core/utils/window");
var _element = require("../core/element");
var _dom_adapter = _interopRequireDefault(require("../core/dom_adapter"));
var _events_engine = _interopRequireDefault(require("../events/core/events_engine"));
var _component_registrator = _interopRequireDefault(require("../core/component_registrator"));
var _common = require("../core/utils/common");
var _extend = require("../core/utils/extend");
var _translator = require("../animation/translator");
var _position = _interopRequireDefault(require("../animation/position"));
var _type = require("../core/utils/type");
var _math = require("../core/utils/math");
var _index = require("../events/utils/index");
var _popup = _interopRequireDefault(require("./popup"));
var _position2 = require("../core/utils/position");

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
var window = (0, _window.getWindow)();
var POPOVER_CLASS = "dx-popover";
var POPOVER_WRAPPER_CLASS = "dx-popover-wrapper";
var POPOVER_ARROW_CLASS = "dx-popover-arrow";
var POPOVER_WITHOUT_TITLE_CLASS = "dx-popover-without-title";
var POSITION_FLIP_MAP = {
    left: "right",
    top: "bottom",
    right: "left",
    bottom: "top",
    center: "center"
};
var WEIGHT_OF_SIDES = {
    left: -1,
    top: -1,
    center: 0,
    right: 1,
    bottom: 1
};
var POSITION_ALIASES = {
    top: {
        my: "bottom center",
        at: "top center",
        collision: "fit flip"
    },
    bottom: {
        my: "top center",
        at: "bottom center",
        collision: "fit flip"
    },
    right: {
        my: "left center",
        at: "right center",
        collision: "flip fit"
    },
    left: {
        my: "right center",
        at: "left center",
        collision: "flip fit"
    }
};
var SIDE_BORDER_WIDTH_STYLES = {
    left: "borderLeftWidth",
    top: "borderTopWidth",
    right: "borderRightWidth",
    bottom: "borderBottomWidth"
};
var getEventNameByOption = function(optionValue) {
    return (0, _type.isObject)(optionValue) ? optionValue.name : optionValue
};
var getEventName = function(that, optionName) {
    var optionValue = that.option(optionName);
    return getEventNameByOption(optionValue)
};
var getEventDelay = function(that, optionName) {
    var optionValue = that.option(optionName);
    return (0, _type.isObject)(optionValue) && optionValue.delay
};
var attachEvent = function(that, name) {
    var target = that.option("target");
    var isSelector = (0, _type.isString)(target);
    var event = getEventName(that, name + "Event");
    if (!event || that.option("disabled")) {
        return
    }
    var eventName = (0, _index.addNamespace)(event, that.NAME);
    var action = that._createAction(function() {
        var delay = getEventDelay(that, name + "Event");
        this._clearEventsTimeouts();
        if (delay) {
            this._timeouts[name] = setTimeout(function() {
                that[name]()
            }, delay)
        } else {
            that[name]()
        }
    }.bind(that), {
        validatingTargetName: "target"
    });
    var handler = function(e) {
        action({
            event: e,
            target: (0, _renderer.default)(e.currentTarget)
        })
    };
    var EVENT_HANDLER_NAME = "_" + name + "EventHandler";
    if (isSelector) {
        that[EVENT_HANDLER_NAME] = handler;
        _events_engine.default.on(_dom_adapter.default.getDocument(), eventName, target, handler)
    } else {
        var targetElement = (0, _element.getPublicElement)((0, _renderer.default)(target));
        that[EVENT_HANDLER_NAME] = void 0;
        _events_engine.default.on(targetElement, eventName, handler)
    }
};
var detachEvent = function(that, target, name, event) {
    var eventName = event || getEventName(that, name + "Event");
    if (!eventName) {
        return
    }
    eventName = (0, _index.addNamespace)(eventName, that.NAME);
    var EVENT_HANDLER_NAME = "_" + name + "EventHandler";
    if (that[EVENT_HANDLER_NAME]) {
        _events_engine.default.off(_dom_adapter.default.getDocument(), eventName, target, that[EVENT_HANDLER_NAME])
    } else {
        _events_engine.default.off((0, _element.getPublicElement)((0, _renderer.default)(target)), eventName)
    }
};
var Popover = _popup.default.inherit({
    _getDefaultOptions: function() {
        return (0, _extend.extend)(this.callBase(), {
            target: window,
            shading: false,
            position: "bottom",
            closeOnOutsideClick: true,
            animation: {
                show: {
                    type: "fade",
                    from: 0,
                    to: 1
                },
                hide: {
                    type: "fade",
                    to: 0
                }
            },
            showTitle: false,
            width: "auto",
            height: "auto",
            dragEnabled: false,
            resizeEnabled: false,
            fullScreen: false,
            closeOnTargetScroll: true,
            arrowPosition: "",
            arrowOffset: 0,
            boundaryOffset: {
                h: 10,
                v: 10
            },
            _fixedPosition: true
        })
    },
    _defaultOptionsRules: function() {
        return [{
            device: {
                platform: "ios"
            },
            options: {
                arrowPosition: {
                    boundaryOffset: {
                        h: 20,
                        v: -10
                    },
                    collision: "fit"
                }
            }
        }, {
            device: function() {
                return !(0, _window.hasWindow)()
            },
            options: {
                animation: null
            }
        }]
    },
    _init: function() {
        this.callBase();
        this._renderArrow();
        this._timeouts = {};
        this.$element().addClass(POPOVER_CLASS);
        this._wrapper().addClass(POPOVER_WRAPPER_CLASS)
    },
    _render: function() {
        this.callBase.apply(this, arguments);
        this._detachEvents(this.option("target"));
        this._attachEvents()
    },
    _detachEvents: function(target) {
        detachEvent(this, target, "show");
        detachEvent(this, target, "hide")
    },
    _attachEvents: function() {
        attachEvent(this, "show");
        attachEvent(this, "hide")
    },
    _renderArrow: function() {
        this._$arrow = (0, _renderer.default)("<div>").addClass(POPOVER_ARROW_CLASS).prependTo(this.overlayContent())
    },
    _documentDownHandler: function(e) {
        if (this._isOutsideClick(e)) {
            return this.callBase(e)
        }
        return true
    },
    _isOutsideClick: function(e) {
        return !(0, _renderer.default)(e.target).closest(this.option("target")).length
    },
    _animate: function(animation) {
        if (animation && animation.to && "object" === _typeof(animation.to)) {
            (0, _extend.extend)(animation.to, {
                position: this._getContainerPosition()
            })
        }
        this.callBase.apply(this, arguments)
    },
    _stopAnimation: function() {
        this.callBase.apply(this, arguments)
    },
    _renderTitle: function() {
        this._wrapper().toggleClass(POPOVER_WITHOUT_TITLE_CLASS, !this.option("showTitle"));
        this.callBase()
    },
    _renderPosition: function() {
        this.callBase();
        this._renderOverlayPosition()
    },
    _renderOverlayBoundaryOffset: _common.noop,
    _renderOverlayPosition: function() {
        this._resetOverlayPosition();
        this._updateContentSize();
        var contentPosition = this._getContainerPosition();
        var resultLocation = _position.default.setup(this._$content, contentPosition);
        var positionSide = this._getSideByLocation(resultLocation);
        this._togglePositionClass("dx-position-" + positionSide);
        this._toggleFlippedClass(resultLocation.h.flip, resultLocation.v.flip);
        var isArrowVisible = this._isHorizontalSide() || this._isVerticalSide();
        if (isArrowVisible) {
            this._renderArrowPosition(positionSide)
        }
    },
    _resetOverlayPosition: function() {
        this._setContentHeight(true);
        this._togglePositionClass("dx-position-" + this._positionSide);
        (0, _translator.move)(this._$content, {
            left: 0,
            top: 0
        });
        this._$arrow.css({
            top: "auto",
            right: "auto",
            bottom: "auto",
            left: "auto"
        })
    },
    _updateContentSize: function() {
        if (!this._$popupContent) {
            return
        }
        var containerLocation = _position.default.calculate(this._$content, this._getContainerPosition());
        if (containerLocation.h.oversize > 0 && this._isHorizontalSide() && !containerLocation.h.fit) {
            var newContainerWidth = this._$content.width() - containerLocation.h.oversize;
            this._$content.width(newContainerWidth)
        }
        if (containerLocation.v.oversize > 0 && this._isVerticalSide() && !containerLocation.v.fit) {
            var newOverlayContentHeight = this._$content.height() - containerLocation.v.oversize;
            var newPopupContentHeight = this._$popupContent.height() - containerLocation.v.oversize;
            this._$content.height(newOverlayContentHeight);
            this._$popupContent.height(newPopupContentHeight)
        }
    },
    _getContainerPosition: function() {
        var offset = (0, _common.pairToObject)(this._position.offset || "");
        var hOffset = offset.h;
        var vOffset = offset.v;
        var isVerticalSide = this._isVerticalSide();
        var isHorizontalSide = this._isHorizontalSide();
        if (isVerticalSide || isHorizontalSide) {
            var isPopoverInside = this._isPopoverInside();
            var sign = (isPopoverInside ? -1 : 1) * WEIGHT_OF_SIDES[this._positionSide];
            var arrowSize = isVerticalSide ? this._$arrow.height() : this._$arrow.width();
            var arrowSizeCorrection = this._getContentBorderWidth(this._positionSide);
            var arrowOffset = sign * (arrowSize - arrowSizeCorrection);
            isVerticalSide ? vOffset += arrowOffset : hOffset += arrowOffset
        }
        return (0, _extend.extend)({}, this._position, {
            offset: hOffset + " " + vOffset
        })
    },
    _getContentBorderWidth: function(side) {
        var borderWidth = this._$content.css(SIDE_BORDER_WIDTH_STYLES[side]);
        return parseInt(borderWidth) || 0
    },
    _getSideByLocation: function(location) {
        var isFlippedByVertical = location.v.flip;
        var isFlippedByHorizontal = location.h.flip;
        return this._isVerticalSide() && isFlippedByVertical || this._isHorizontalSide() && isFlippedByHorizontal || this._isPopoverInside() ? POSITION_FLIP_MAP[this._positionSide] : this._positionSide
    },
    _togglePositionClass: function(positionClass) {
        this._$wrapper.removeClass("dx-position-left dx-position-right dx-position-top dx-position-bottom").addClass(positionClass)
    },
    _toggleFlippedClass: function(isFlippedHorizontal, isFlippedVertical) {
        this._$wrapper.toggleClass("dx-popover-flipped-horizontal", isFlippedHorizontal).toggleClass("dx-popover-flipped-vertical", isFlippedVertical)
    },
    _renderArrowPosition: function(side) {
        var arrowRect = (0, _position2.getBoundingRect)(this._$arrow.get(0));
        var arrowFlip = -(this._isVerticalSide(side) ? arrowRect.height : arrowRect.width);
        this._$arrow.css(POSITION_FLIP_MAP[side], arrowFlip);
        var axis = this._isVerticalSide(side) ? "left" : "top";
        var sizeProperty = this._isVerticalSide(side) ? "width" : "height";
        var $target = (0, _renderer.default)(this._position.of);
        var targetOffset = _position.default.offset($target) || {
            top: 0,
            left: 0
        };
        var contentOffset = _position.default.offset(this._$content);
        var arrowSize = arrowRect[sizeProperty];
        var contentLocation = contentOffset[axis];
        var contentSize = (0, _position2.getBoundingRect)(this._$content.get(0))[sizeProperty];
        var targetLocation = targetOffset[axis];
        var targetSize = $target.get(0).preventDefault ? 0 : (0, _position2.getBoundingRect)($target.get(0))[sizeProperty];
        var min = Math.max(contentLocation, targetLocation);
        var max = Math.min(contentLocation + contentSize, targetLocation + targetSize);
        var arrowLocation;
        if ("start" === this.option("arrowPosition")) {
            arrowLocation = min - contentLocation
        } else {
            if ("end" === this.option("arrowPosition")) {
                arrowLocation = max - contentLocation - arrowSize
            } else {
                arrowLocation = (min + max) / 2 - contentLocation - arrowSize / 2
            }
        }
        var borderWidth = this._getContentBorderWidth(side);
        var finalArrowLocation = (0, _math.fitIntoRange)(arrowLocation - borderWidth + this.option("arrowOffset"), borderWidth, contentSize - arrowSize - 2 * borderWidth);
        this._$arrow.css(axis, finalArrowLocation)
    },
    _isPopoverInside: function() {
        var position = this._transformStringPosition(this.option("position"), POSITION_ALIASES);
        var my = _position.default.setup.normalizeAlign(position.my);
        var at = _position.default.setup.normalizeAlign(position.at);
        return my.h === at.h && my.v === at.v
    },
    _setContentHeight: function(fullUpdate) {
        if (fullUpdate) {
            this.callBase()
        }
    },
    _renderWrapperPosition: function() {
        if (this.option("shading")) {
            this._$wrapper.css({
                top: 0,
                left: 0
            })
        }
    },
    _renderWrapperDimensions: function() {
        if (this.option("shading")) {
            this._$wrapper.css({
                width: "100%",
                height: "100%"
            })
        }
    },
    _normalizePosition: function() {
        var position = (0, _extend.extend)({}, this._transformStringPosition(this.option("position"), POSITION_ALIASES));
        if (!position.of) {
            position.of = this.option("target")
        }
        if (!position.collision) {
            position.collision = "flip"
        }
        if (!position.boundaryOffset) {
            position.boundaryOffset = this.option("boundaryOffset")
        }
        this._positionSide = this._getDisplaySide(position);
        this._position = position
    },
    _getDisplaySide: function(position) {
        var my = _position.default.setup.normalizeAlign(position.my);
        var at = _position.default.setup.normalizeAlign(position.at);
        var weightSign = WEIGHT_OF_SIDES[my.h] === WEIGHT_OF_SIDES[at.h] && WEIGHT_OF_SIDES[my.v] === WEIGHT_OF_SIDES[at.v] ? -1 : 1;
        var horizontalWeight = Math.abs(WEIGHT_OF_SIDES[my.h] - weightSign * WEIGHT_OF_SIDES[at.h]);
        var verticalWeight = Math.abs(WEIGHT_OF_SIDES[my.v] - weightSign * WEIGHT_OF_SIDES[at.v]);
        return horizontalWeight > verticalWeight ? at.h : at.v
    },
    _isVerticalSide: function(side) {
        side = side || this._positionSide;
        return "top" === side || "bottom" === side
    },
    _isHorizontalSide: function(side) {
        side = side || this._positionSide;
        return "left" === side || "right" === side
    },
    _clearEventTimeout: function(name) {
        clearTimeout(this._timeouts[name])
    },
    _clearEventsTimeouts: function() {
        this._clearEventTimeout("show");
        this._clearEventTimeout("hide")
    },
    _clean: function() {
        this._detachEvents(this.option("target"));
        this.callBase.apply(this, arguments)
    },
    _optionChanged: function(args) {
        switch (args.name) {
            case "boundaryOffset":
            case "arrowPosition":
            case "arrowOffset":
                this._renderGeometry();
                break;
            case "fullScreen":
                if (args.value) {
                    this.option("fullScreen", false)
                }
                break;
            case "target":
                args.previousValue && this._detachEvents(args.previousValue);
                this.callBase(args);
                break;
            case "showEvent":
            case "hideEvent":
                var name = args.name.substring(0, 4);
                var event = getEventNameByOption(args.previousValue);
                this.hide();
                detachEvent(this, this.option("target"), name, event);
                attachEvent(this, name);
                break;
            case "visible":
                this._clearEventTimeout(args.value ? "show" : "hide");
                this.callBase(args);
                break;
            default:
                this.callBase(args)
        }
    },
    show: function(target) {
        if (target) {
            this.option("target", target)
        }
        return this.callBase()
    }
});
(0, _component_registrator.default)("dxPopover", Popover);
var _default = Popover;
exports.default = _default;
module.exports = exports.default;
module.exports.default = module.exports;
