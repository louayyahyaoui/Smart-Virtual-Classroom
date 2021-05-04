/**
 * DevExtreme (events/utils/index.js)
 * Version: 20.2.6
 * Build date: Tue Mar 16 2021
 *
 * Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
exports.isCommandKeyPressed = exports.addNamespace = exports.getChar = exports.normalizeKeyName = exports.fireEvent = exports.createEvent = exports.setEventFixMethod = exports.needSkipEvent = exports.stopEventsSkipping = exports.forceSkipEvents = exports.hasTouches = exports.eventDelta = exports.eventData = exports.isFakeClickEvent = exports.isKeyboardEvent = exports.isTouchEvent = exports.isDxMouseWheelEvent = exports.isMouseEvent = exports.isPointerEvent = exports.eventSource = void 0;
var _renderer = _interopRequireDefault(require("../../core/renderer"));
var _add_namespace = _interopRequireDefault(require("./add_namespace"));
var _events_engine = _interopRequireDefault(require("../core/events_engine"));
var _iterator = require("../../core/utils/iterator");
var _extend = require("../../core/utils/extend");
var _selectors = require("../../ui/widget/selectors");

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        "default": obj
    }
}
var KEY_MAP = {
    backspace: "backspace",
    tab: "tab",
    enter: "enter",
    escape: "escape",
    pageup: "pageUp",
    pagedown: "pageDown",
    end: "end",
    home: "home",
    arrowleft: "leftArrow",
    arrowup: "upArrow",
    arrowright: "rightArrow",
    arrowdown: "downArrow",
    "delete": "del",
    " ": "space",
    f: "F",
    a: "A",
    "*": "asterisk",
    "-": "minus",
    alt: "alt",
    control: "control",
    shift: "shift",
    left: "leftArrow",
    up: "upArrow",
    right: "rightArrow",
    down: "downArrow",
    multiply: "asterisk",
    spacebar: "space",
    del: "del",
    subtract: "minus",
    esc: "escape"
};
var LEGACY_KEY_CODES = {
    8: "backspace",
    9: "tab",
    13: "enter",
    27: "escape",
    33: "pageUp",
    34: "pageDown",
    35: "end",
    36: "home",
    37: "leftArrow",
    38: "upArrow",
    39: "rightArrow",
    40: "downArrow",
    46: "del",
    32: "space",
    70: "F",
    65: "A",
    106: "asterisk",
    109: "minus",
    189: "minus",
    173: "minus",
    16: "shift",
    17: "control",
    18: "alt"
};
var EVENT_SOURCES_REGEX = {
    dx: /^dx/i,
    mouse: /(mouse|wheel)/i,
    touch: /^touch/i,
    keyboard: /^key/i,
    pointer: /^(ms)?pointer/i
};
var fixMethod = function(e) {
    return e
};
var copyEvent = function(originalEvent) {
    return fixMethod(_events_engine.default.Event(originalEvent, originalEvent), originalEvent)
};
var isDxEvent = function(e) {
    return "dx" === eventSource(e)
};
var isNativeMouseEvent = function(e) {
    return "mouse" === eventSource(e)
};
var isNativeTouchEvent = function(e) {
    return "touch" === eventSource(e)
};
var eventSource = function(_ref) {
    var type = _ref.type;
    var result = "other";
    (0, _iterator.each)(EVENT_SOURCES_REGEX, function(key) {
        if (this.test(type)) {
            result = key;
            return false
        }
    });
    return result
};
exports.eventSource = eventSource;
var isPointerEvent = function(e) {
    return "pointer" === eventSource(e)
};
exports.isPointerEvent = isPointerEvent;
var isMouseEvent = function(e) {
    return isNativeMouseEvent(e) || (isPointerEvent(e) || isDxEvent(e)) && "mouse" === e.pointerType
};
exports.isMouseEvent = isMouseEvent;
var isDxMouseWheelEvent = function(e) {
    return e && "dxmousewheel" === e.type
};
exports.isDxMouseWheelEvent = isDxMouseWheelEvent;
var isTouchEvent = function(e) {
    return isNativeTouchEvent(e) || (isPointerEvent(e) || isDxEvent(e)) && "touch" === e.pointerType
};
exports.isTouchEvent = isTouchEvent;
var isKeyboardEvent = function(e) {
    return "keyboard" === eventSource(e)
};
exports.isKeyboardEvent = isKeyboardEvent;
var isFakeClickEvent = function(_ref2) {
    var screenX = _ref2.screenX,
        offsetX = _ref2.offsetX,
        pageX = _ref2.pageX;
    return 0 === screenX && !offsetX && 0 === pageX
};
exports.isFakeClickEvent = isFakeClickEvent;
var eventData = function(_ref3) {
    var pageX = _ref3.pageX,
        pageY = _ref3.pageY,
        timeStamp = _ref3.timeStamp;
    return {
        x: pageX,
        y: pageY,
        time: timeStamp
    }
};
exports.eventData = eventData;
var eventDelta = function(from, to) {
    return {
        x: to.x - from.x,
        y: to.y - from.y,
        time: to.time - from.time || 1
    }
};
exports.eventDelta = eventDelta;
var hasTouches = function(e) {
    var originalEvent = e.originalEvent,
        pointers = e.pointers;
    if (isNativeTouchEvent(e)) {
        return (originalEvent.touches || []).length
    }
    if (isDxEvent(e)) {
        return (pointers || []).length
    }
    return 0
};
exports.hasTouches = hasTouches;
var skipEvents = false;
var forceSkipEvents = function() {
    return skipEvents = true
};
exports.forceSkipEvents = forceSkipEvents;
var stopEventsSkipping = function() {
    return skipEvents = false
};
exports.stopEventsSkipping = stopEventsSkipping;
var needSkipEvent = function(e) {
    if (skipEvents) {
        return true
    }
    var target = e.target;
    var $target = (0, _renderer.default)(target);
    var isContentEditable = (null === target || void 0 === target ? void 0 : target.isContentEditable) || (null === target || void 0 === target ? void 0 : target.hasAttribute("contenteditable"));
    var touchInEditable = $target.is("input, textarea, select") || isContentEditable;
    if ($target.is(".dx-skip-gesture-event *, .dx-skip-gesture-event")) {
        return true
    }
    if (isDxMouseWheelEvent(e)) {
        var isTextArea = $target.is("textarea") && $target.hasClass("dx-texteditor-input");
        if (isTextArea || isContentEditable) {
            return false
        }
        var isInputFocused = $target.is("input[type='number'], textarea, select") && $target.is(":focus");
        return isInputFocused
    }
    if (isMouseEvent(e)) {
        return touchInEditable || e.which > 1
    }
    if (isTouchEvent(e)) {
        return touchInEditable && (0, _selectors.focused)($target)
    }
};
exports.needSkipEvent = needSkipEvent;
var setEventFixMethod = function(func) {
    return fixMethod = func
};
exports.setEventFixMethod = setEventFixMethod;
var createEvent = function(originalEvent, args) {
    var event = copyEvent(originalEvent);
    args && (0, _extend.extend)(event, args);
    return event
};
exports.createEvent = createEvent;
var fireEvent = function(props) {
    var originalEvent = props.originalEvent,
        delegateTarget = props.delegateTarget;
    var event = createEvent(originalEvent, props);
    _events_engine.default.trigger(delegateTarget || event.target, event);
    return event
};
exports.fireEvent = fireEvent;
var normalizeKeyName = function(_ref4) {
    var key = _ref4.key,
        which = _ref4.which;
    var isKeySupported = !!key;
    key = isKeySupported ? key : which;
    if (key) {
        if (isKeySupported) {
            key = KEY_MAP[key.toLowerCase()] || key
        } else {
            key = LEGACY_KEY_CODES[key] || String.fromCharCode(key)
        }
        return key
    }
};
exports.normalizeKeyName = normalizeKeyName;
var getChar = function(_ref5) {
    var key = _ref5.key,
        which = _ref5.which;
    return key || String.fromCharCode(which)
};
exports.getChar = getChar;
var addNamespace = _add_namespace.default;
exports.addNamespace = addNamespace;
var isCommandKeyPressed = function(_ref6) {
    var ctrlKey = _ref6.ctrlKey,
        metaKey = _ref6.metaKey;
    return ctrlKey || metaKey
};
exports.isCommandKeyPressed = isCommandKeyPressed;
