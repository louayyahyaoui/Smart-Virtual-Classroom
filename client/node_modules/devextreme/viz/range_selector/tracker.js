/**
 * DevExtreme (viz/range_selector/tracker.js)
 * Version: 20.2.6
 * Build date: Tue Mar 16 2021
 *
 * Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
exports.Tracker = Tracker;
var _events_engine = _interopRequireDefault(require("../../events/core/events_engine"));
var _pointer = _interopRequireDefault(require("../../events/pointer"));
var _window = require("../../core/utils/window");
var _dom_adapter = _interopRequireDefault(require("../../core/dom_adapter"));
var _iterator = require("../../core/utils/iterator");
var _support = require("../../core/utils/support");

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        "default": obj
    }
}

function _defineProperty(obj, key, value) {
    if (key in obj) {
        Object.defineProperty(obj, key, {
            value: value,
            enumerable: true,
            configurable: true,
            writable: true
        })
    } else {
        obj[key] = value
    }
    return obj
}
var MIN_MANUAL_SELECTING_WIDTH = 10;
var window = (0, _window.getWindow)();

function isLeftButtonPressed(event) {
    var e = event || window.event;
    var originalEvent = e.originalEvent;
    var touches = e.touches;
    var pointerType = originalEvent ? originalEvent.pointerType : false;
    var eventTouches = originalEvent ? originalEvent.touches : false;
    var isMSPointerLeftClick = originalEvent && void 0 !== pointerType && (pointerType === (originalEvent.MSPOINTER_TYPE_TOUCH || "touch") || pointerType === (originalEvent.MSPOINTER_TYPE_MOUSE || "mouse") && 1 === originalEvent.buttons);
    var isTouches = touches && touches.length > 0 || eventTouches && eventTouches.length > 0;
    return 1 === e.which || isMSPointerLeftClick || isTouches
}

function isMultiTouches(event) {
    var originalEvent = event.originalEvent;
    var touches = event.touches;
    var eventTouches = originalEvent && originalEvent.touches;
    return touches && touches.length > 1 || eventTouches && eventTouches.length > 1 || null
}

function preventDefault(e) {
    if (!isMultiTouches(e)) {
        e.preventDefault()
    }
}

function stopPropagationAndPreventDefault(e) {
    if (!isMultiTouches(e)) {
        e.stopPropagation();
        e.preventDefault()
    }
}

function isTouchEventArgs(e) {
    return e && e.type && 0 === e.type.indexOf("touch")
}

function getEventPageX(event) {
    var originalEvent = event.originalEvent;
    var result = 0;
    if (event.pageX) {
        result = event.pageX
    } else {
        if (originalEvent && originalEvent.pageX) {
            result = originalEvent.pageX
        }
    }
    if (originalEvent && originalEvent.touches) {
        if (originalEvent.touches.length > 0) {
            result = originalEvent.touches[0].pageX
        } else {
            if (originalEvent.changedTouches.length > 0) {
                result = originalEvent.changedTouches[0].pageX
            }
        }
    }
    return result
}

function initializeAreaEvents(controller, area, state, getRootOffsetLeft) {
    var _docEvents;
    var isTouchEvent;
    var isActive = false;
    var initialPosition;
    var movingHandler = null;
    var docEvents = (_docEvents = {}, _defineProperty(_docEvents, _pointer.default.move, function(e) {
        var position;
        var offset;
        if (isTouchEvent !== isTouchEventArgs(e)) {
            return
        }
        if (!isLeftButtonPressed(e)) {
            cancel(e)
        }
        if (isActive) {
            position = getEventPageX(e);
            offset = getRootOffsetLeft();
            if (movingHandler) {
                movingHandler(position - offset, e)
            } else {
                if (state.manualRangeSelectionEnabled && Math.abs(initialPosition - position) >= MIN_MANUAL_SELECTING_WIDTH) {
                    movingHandler = controller.placeSliderAndBeginMoving(initialPosition - offset, position - offset, e)
                }
            }
        }
    }), _defineProperty(_docEvents, _pointer.default.up, function(e) {
        var position;
        if (isActive) {
            position = getEventPageX(e);
            if (!movingHandler && state.moveSelectedRangeByClick && Math.abs(initialPosition - position) < MIN_MANUAL_SELECTING_WIDTH) {
                controller.moveSelectedArea(position - getRootOffsetLeft(), e)
            }
            cancel(e)
        }
    }), _docEvents);

    function cancel(e) {
        if (isActive) {
            isActive = false;
            if (movingHandler) {
                movingHandler.complete(e);
                movingHandler = null
            }
        }
    }
    area.on(_pointer.default.down, function(e) {
        if (!state.enabled || !isLeftButtonPressed(e) || isActive) {
            return
        }
        isActive = true;
        isTouchEvent = isTouchEventArgs(e);
        initialPosition = getEventPageX(e)
    });
    return docEvents
}

function initializeSelectedAreaEvents(controller, area, state, getRootOffsetLeft) {
    var _docEvents2;
    var isTouchEvent;
    var isActive = false;
    var movingHandler = null;
    var docEvents = (_docEvents2 = {}, _defineProperty(_docEvents2, _pointer.default.move, function(e) {
        if (isTouchEvent !== isTouchEventArgs(e)) {
            return
        }
        if (!isLeftButtonPressed(e)) {
            cancel(e)
        }
        if (isActive) {
            preventDefault(e);
            movingHandler(getEventPageX(e) - getRootOffsetLeft(), e)
        }
    }), _defineProperty(_docEvents2, _pointer.default.up, cancel), _docEvents2);

    function cancel(e) {
        if (isActive) {
            isActive = false;
            movingHandler.complete(e);
            movingHandler = null
        }
    }
    area.on(_pointer.default.down, function(e) {
        if (!state.enabled || !isLeftButtonPressed(e) || isActive) {
            return
        }
        isActive = true;
        isTouchEvent = isTouchEventArgs(e);
        movingHandler = controller.beginSelectedAreaMoving(getEventPageX(e) - getRootOffsetLeft());
        stopPropagationAndPreventDefault(e)
    });
    return docEvents
}

function initializeSliderEvents(controller, sliders, state, getRootOffsetLeft) {
    var _docEvents3;
    var isTouchEvent;
    var isActive = false;
    var movingHandler = null;
    var docEvents = (_docEvents3 = {}, _defineProperty(_docEvents3, _pointer.default.move, function(e) {
        if (isTouchEvent !== isTouchEventArgs(e)) {
            return
        }
        if (!isLeftButtonPressed(e)) {
            cancel(e)
        }
        if (isActive) {
            preventDefault(e);
            movingHandler(getEventPageX(e) - getRootOffsetLeft(), e)
        }
    }), _defineProperty(_docEvents3, _pointer.default.up, cancel), _docEvents3);
    (0, _iterator.each)(sliders, function(i, slider) {
        var _slider$on;
        slider.on((_slider$on = {}, _defineProperty(_slider$on, _pointer.default.down, function(e) {
            if (!state.enabled || !isLeftButtonPressed(e) || isActive) {
                return
            }
            isActive = true;
            isTouchEvent = isTouchEventArgs(e);
            movingHandler = controller.beginSliderMoving(i, getEventPageX(e) - getRootOffsetLeft());
            stopPropagationAndPreventDefault(e)
        }), _defineProperty(_slider$on, _pointer.default.move, function() {
            if (!movingHandler) {
                controller.foregroundSlider(i)
            }
        }), _slider$on))
    });

    function cancel(e) {
        if (isActive) {
            isActive = false;
            movingHandler.complete(e);
            movingHandler = null
        }
    }
    return docEvents
}

function Tracker(params) {
    var state = this._state = {};
    var targets = params.controller.getTrackerTargets();
    if (_support.pointerEvents) {
        params.renderer.root.css({
            msTouchAction: "pinch-zoom"
        })
    }
    this._docEvents = [initializeSelectedAreaEvents(params.controller, targets.selectedArea, state, getRootOffsetLeft), initializeAreaEvents(params.controller, targets.area, state, getRootOffsetLeft), initializeSliderEvents(params.controller, targets.sliders, state, getRootOffsetLeft)];
    (0, _iterator.each)(this._docEvents, function(_, events) {
        _events_engine.default.on(_dom_adapter.default.getDocument(), events)
    });

    function getRootOffsetLeft() {
        return params.renderer.getRootOffset().left
    }
}
Tracker.prototype = {
    constructor: Tracker,
    dispose: function() {
        (0, _iterator.each)(this._docEvents, function(_, events) {
            _events_engine.default.off(_dom_adapter.default.getDocument(), events)
        })
    },
    update: function(enabled, behavior) {
        var state = this._state;
        state.enabled = enabled;
        state.moveSelectedRangeByClick = behavior.moveSelectedRangeByClick;
        state.manualRangeSelectionEnabled = behavior.manualRangeSelectionEnabled
    }
};
