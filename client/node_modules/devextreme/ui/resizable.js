/**
 * DevExtreme (ui/resizable.js)
 * Version: 20.2.6
 * Build date: Tue Mar 16 2021
 *
 * Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
exports.default = void 0;
var _translator = require("../animation/translator");
var _component_registrator = _interopRequireDefault(require("../core/component_registrator"));
var _dom_component = _interopRequireDefault(require("../core/dom_component"));
var _renderer = _interopRequireDefault(require("../core/renderer"));
var _array = require("../core/utils/array");
var _common = require("../core/utils/common");
var _extend = require("../core/utils/extend");
var _iterator = require("../core/utils/iterator");
var _math = require("../core/utils/math");
var _type = require("../core/utils/type");
var _window = require("../core/utils/window");
var _events_engine = _interopRequireDefault(require("../events/core/events_engine"));
var _drag = require("../events/drag");
var _position = require("../core/utils/position");
var _index = require("../events/utils/index");
var _visibility_change = require("../events/visibility_change");

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        "default": obj
    }
}
var RESIZABLE = "dxResizable";
var RESIZABLE_CLASS = "dx-resizable";
var RESIZABLE_RESIZING_CLASS = "dx-resizable-resizing";
var RESIZABLE_HANDLE_CLASS = "dx-resizable-handle";
var RESIZABLE_HANDLE_TOP_CLASS = "dx-resizable-handle-top";
var RESIZABLE_HANDLE_BOTTOM_CLASS = "dx-resizable-handle-bottom";
var RESIZABLE_HANDLE_LEFT_CLASS = "dx-resizable-handle-left";
var RESIZABLE_HANDLE_RIGHT_CLASS = "dx-resizable-handle-right";
var RESIZABLE_HANDLE_CORNER_CLASS = "dx-resizable-handle-corner";
var DRAGSTART_START_EVENT_NAME = (0, _index.addNamespace)(_drag.start, RESIZABLE);
var DRAGSTART_EVENT_NAME = (0, _index.addNamespace)(_drag.move, RESIZABLE);
var DRAGSTART_END_EVENT_NAME = (0, _index.addNamespace)(_drag.end, RESIZABLE);
var SIDE_BORDER_WIDTH_STYLES = {
    left: "borderLeftWidth",
    top: "borderTopWidth",
    right: "borderRightWidth",
    bottom: "borderBottomWidth"
};
var Resizable = _dom_component.default.inherit({
    _getDefaultOptions: function() {
        return (0, _extend.extend)(this.callBase(), {
            handles: "all",
            step: "1",
            stepPrecision: "simple",
            area: void 0,
            minWidth: 30,
            maxWidth: 1 / 0,
            minHeight: 30,
            maxHeight: 1 / 0,
            onResizeStart: null,
            onResize: null,
            onResizeEnd: null,
            roundStepValue: true
        })
    },
    _init: function() {
        this.callBase();
        this.$element().addClass(RESIZABLE_CLASS)
    },
    _initMarkup: function() {
        this.callBase();
        this._renderHandles()
    },
    _render: function() {
        this.callBase();
        this._renderActions()
    },
    _renderActions: function() {
        this._resizeStartAction = this._createActionByOption("onResizeStart");
        this._resizeEndAction = this._createActionByOption("onResizeEnd");
        this._resizeAction = this._createActionByOption("onResize")
    },
    _renderHandles: function() {
        var _this = this;
        this._handles = [];
        var handles = this.option("handles");
        if ("none" === handles) {
            return
        }
        var directions = "all" === handles ? ["top", "bottom", "left", "right"] : handles.split(" ");
        (0, _iterator.each)(directions, function(index, handleName) {
            _this._renderHandle(handleName)
        });
        (0, _array.inArray)("bottom", directions) + 1 && (0, _array.inArray)("right", directions) + 1 && this._renderHandle("corner-bottom-right");
        (0, _array.inArray)("bottom", directions) + 1 && (0, _array.inArray)("left", directions) + 1 && this._renderHandle("corner-bottom-left");
        (0, _array.inArray)("top", directions) + 1 && (0, _array.inArray)("right", directions) + 1 && this._renderHandle("corner-top-right");
        (0, _array.inArray)("top", directions) + 1 && (0, _array.inArray)("left", directions) + 1 && this._renderHandle("corner-top-left");
        this._attachEventHandlers()
    },
    _renderHandle: function(handleName) {
        var $handle = (0, _renderer.default)("<div>").addClass(RESIZABLE_HANDLE_CLASS).addClass(RESIZABLE_HANDLE_CLASS + "-" + handleName).appendTo(this.$element());
        this._handles.push($handle)
    },
    _attachEventHandlers: function() {
        if (this.option("disabled")) {
            return
        }
        var handlers = {};
        handlers[DRAGSTART_START_EVENT_NAME] = this._dragStartHandler.bind(this);
        handlers[DRAGSTART_EVENT_NAME] = this._dragHandler.bind(this);
        handlers[DRAGSTART_END_EVENT_NAME] = this._dragEndHandler.bind(this);
        this._handles.forEach(function(handleElement) {
            _events_engine.default.on(handleElement, handlers, {
                direction: "both",
                immediate: true
            })
        })
    },
    _detachEventHandlers: function() {
        this._handles.forEach(function(handleElement) {
            _events_engine.default.off(handleElement)
        })
    },
    _toggleEventHandlers: function(shouldAttachEvents) {
        shouldAttachEvents ? this._attachEventHandlers() : this._detachEventHandlers()
    },
    _dragStartHandler: function(e) {
        var $element = this.$element();
        if ($element.is(".dx-state-disabled, .dx-state-disabled *")) {
            e.cancel = true;
            return
        }
        this._toggleResizingClass(true);
        this._movingSides = this._getMovingSides(e);
        this._elementLocation = (0, _translator.locate)($element);
        var elementRect = (0, _position.getBoundingRect)($element.get(0));
        this._elementSize = {
            width: elementRect.width,
            height: elementRect.height
        };
        this._renderDragOffsets(e);
        this._resizeStartAction({
            event: e,
            width: this._elementSize.width,
            height: this._elementSize.height,
            handles: this._movingSides
        });
        e.targetElements = null
    },
    _toggleResizingClass: function(value) {
        this.$element().toggleClass(RESIZABLE_RESIZING_CLASS, value)
    },
    _renderDragOffsets: function(e) {
        var area = this._getArea();
        if (!area) {
            return
        }
        var $handle = (0, _renderer.default)(e.target).closest("." + RESIZABLE_HANDLE_CLASS);
        var handleWidth = $handle.outerWidth();
        var handleHeight = $handle.outerHeight();
        var handleOffset = $handle.offset();
        var areaOffset = area.offset;
        var scrollOffset = this._getAreaScrollOffset();
        e.maxLeftOffset = handleOffset.left - areaOffset.left - scrollOffset.scrollX;
        e.maxRightOffset = areaOffset.left + area.width - handleOffset.left - handleWidth + scrollOffset.scrollX;
        e.maxTopOffset = handleOffset.top - areaOffset.top - scrollOffset.scrollY;
        e.maxBottomOffset = areaOffset.top + area.height - handleOffset.top - handleHeight + scrollOffset.scrollY
    },
    _getBorderWidth: function($element, direction) {
        if ((0, _type.isWindow)($element.get(0))) {
            return 0
        }
        var borderWidth = $element.css(SIDE_BORDER_WIDTH_STYLES[direction]);
        return parseInt(borderWidth) || 0
    },
    _dragHandler: function(e) {
        var $element = this.$element();
        var sides = this._movingSides;
        var location = this._elementLocation;
        var size = this._elementSize;
        var offset = this._getOffset(e);
        var width = size.width + offset.x * (sides.left ? -1 : 1);
        var height = size.height + offset.y * (sides.top ? -1 : 1);
        if (offset.x || "strict" === this.option("stepPrecision")) {
            this._renderWidth(width)
        }
        if (offset.y || "strict" === this.option("stepPrecision")) {
            this._renderHeight(height)
        }
        var elementRect = (0, _position.getBoundingRect)($element.get(0));
        var offsetTop = offset.y - ((elementRect.height || height) - height);
        var offsetLeft = offset.x - ((elementRect.width || width) - width);
        (0, _translator.move)($element, {
            top: location.top + (sides.top ? offsetTop : 0),
            left: location.left + (sides.left ? offsetLeft : 0)
        });
        this._resizeAction({
            event: e,
            width: this.option("width") || width,
            height: this.option("height") || height,
            handles: this._movingSides
        });
        (0, _visibility_change.triggerResizeEvent)($element)
    },
    _getOffset: function(e) {
        var offset = e.offset;
        var steps = (0, _common.pairToObject)(this.option("step"), !this.option("roundStepValue"));
        var sides = this._getMovingSides(e);
        var strictPrecision = "strict" === this.option("stepPrecision");
        if (!sides.left && !sides.right) {
            offset.x = 0
        }
        if (!sides.top && !sides.bottom) {
            offset.y = 0
        }
        return strictPrecision ? this._getStrictOffset(offset, steps, sides) : this._getSimpleOffset(offset, steps)
    },
    _getSimpleOffset: function(offset, steps) {
        return {
            x: offset.x - offset.x % steps.h,
            y: offset.y - offset.y % steps.v
        }
    },
    _getStrictOffset: function(offset, steps, sides) {
        var location = this._elementLocation;
        var size = this._elementSize;
        var xPos = sides.left ? location.left : location.left + size.width;
        var yPos = sides.top ? location.top : location.top + size.height;
        var newXShift = (xPos + offset.x) % steps.h;
        var newYShift = (yPos + offset.y) % steps.v;
        var sign = Math.sign || function(x) {
            x = +x;
            if (0 === x || isNaN(x)) {
                return x
            }
            return x > 0 ? 1 : -1
        };
        var separatorOffset = function(steps, offset) {
            return (1 + .2 * sign(offset)) % 1 * steps
        };
        var isSmallOffset = function(offset, steps) {
            return Math.abs(offset) < .2 * steps
        };
        var newOffsetX = offset.x - newXShift;
        var newOffsetY = offset.y - newYShift;
        if (newXShift > separatorOffset(steps.h, offset.x)) {
            newOffsetX += steps.h
        }
        if (newYShift > separatorOffset(steps.v, offset.y)) {
            newOffsetY += steps.v
        }
        return {
            x: (sides.left || sides.right) && !isSmallOffset(offset.x, steps.h) ? newOffsetX : 0,
            y: (sides.top || sides.bottom) && !isSmallOffset(offset.y, steps.v) ? newOffsetY : 0
        }
    },
    _getMovingSides: function(e) {
        var $target = (0, _renderer.default)(e.target);
        var hasCornerTopLeftClass = $target.hasClass(RESIZABLE_HANDLE_CORNER_CLASS + "-top-left");
        var hasCornerTopRightClass = $target.hasClass(RESIZABLE_HANDLE_CORNER_CLASS + "-top-right");
        var hasCornerBottomLeftClass = $target.hasClass(RESIZABLE_HANDLE_CORNER_CLASS + "-bottom-left");
        var hasCornerBottomRightClass = $target.hasClass(RESIZABLE_HANDLE_CORNER_CLASS + "-bottom-right");
        return {
            top: $target.hasClass(RESIZABLE_HANDLE_TOP_CLASS) || hasCornerTopLeftClass || hasCornerTopRightClass,
            left: $target.hasClass(RESIZABLE_HANDLE_LEFT_CLASS) || hasCornerTopLeftClass || hasCornerBottomLeftClass,
            bottom: $target.hasClass(RESIZABLE_HANDLE_BOTTOM_CLASS) || hasCornerBottomLeftClass || hasCornerBottomRightClass,
            right: $target.hasClass(RESIZABLE_HANDLE_RIGHT_CLASS) || hasCornerTopRightClass || hasCornerBottomRightClass
        }
    },
    _getArea: function() {
        var area = this.option("area");
        if ((0, _type.isFunction)(area)) {
            area = area.call(this)
        }
        if ((0, _type.isPlainObject)(area)) {
            return this._getAreaFromObject(area)
        }
        return this._getAreaFromElement(area)
    },
    _getAreaScrollOffset: function() {
        var area = this.option("area");
        var isElement = !(0, _type.isFunction)(area) && !(0, _type.isPlainObject)(area);
        var scrollOffset = {
            scrollY: 0,
            scrollX: 0
        };
        if (isElement) {
            var areaElement = (0, _renderer.default)(area)[0];
            if ((0, _type.isWindow)(areaElement)) {
                scrollOffset.scrollX = areaElement.pageXOffset;
                scrollOffset.scrollY = areaElement.pageYOffset
            }
        }
        return scrollOffset
    },
    _getAreaFromObject: function(area) {
        var result = {
            width: area.right - area.left,
            height: area.bottom - area.top,
            offset: {
                left: area.left,
                top: area.top
            }
        };
        this._correctAreaGeometry(result);
        return result
    },
    _getAreaFromElement: function(area) {
        var $area = (0, _renderer.default)(area);
        var result;
        if ($area.length) {
            result = {
                width: $area.innerWidth(),
                height: $area.innerHeight(),
                offset: (0, _extend.extend)({
                    top: 0,
                    left: 0
                }, (0, _type.isWindow)($area[0]) ? {} : $area.offset())
            };
            this._correctAreaGeometry(result, $area)
        }
        return result
    },
    _correctAreaGeometry: function(result, $area) {
        var areaBorderLeft = $area ? this._getBorderWidth($area, "left") : 0;
        var areaBorderTop = $area ? this._getBorderWidth($area, "top") : 0;
        result.offset.left += areaBorderLeft + this._getBorderWidth(this.$element(), "left");
        result.offset.top += areaBorderTop + this._getBorderWidth(this.$element(), "top");
        result.width -= this.$element().outerWidth() - this.$element().innerWidth();
        result.height -= this.$element().outerHeight() - this.$element().innerHeight()
    },
    _dragEndHandler: function(e) {
        var $element = this.$element();
        this._resizeEndAction({
            event: e,
            width: $element.outerWidth(),
            height: $element.outerHeight(),
            handles: this._movingSides
        });
        this._toggleResizingClass(false)
    },
    _renderWidth: function(width) {
        this.option("width", (0, _math.fitIntoRange)(width, this.option("minWidth"), this.option("maxWidth")))
    },
    _renderHeight: function(height) {
        this.option("height", (0, _math.fitIntoRange)(height, this.option("minHeight"), this.option("maxHeight")))
    },
    _optionChanged: function(args) {
        switch (args.name) {
            case "disabled":
                this._toggleEventHandlers(!args.value);
                this.callBase(args);
                break;
            case "handles":
                this._invalidate();
                break;
            case "minWidth":
            case "maxWidth":
                (0, _window.hasWindow)() && this._renderWidth(this.$element().outerWidth());
                break;
            case "minHeight":
            case "maxHeight":
                (0, _window.hasWindow)() && this._renderHeight(this.$element().outerHeight());
                break;
            case "onResize":
            case "onResizeStart":
            case "onResizeEnd":
                this._renderActions();
                break;
            case "area":
            case "stepPrecision":
            case "step":
            case "roundStepValue":
                break;
            default:
                this.callBase(args)
        }
    },
    _clean: function() {
        this.$element().find("." + RESIZABLE_HANDLE_CLASS).remove()
    },
    _useTemplates: function() {
        return false
    }
});
(0, _component_registrator.default)(RESIZABLE, Resizable);
var _default = Resizable;
exports.default = _default;
module.exports = exports.default;
module.exports.default = module.exports;
