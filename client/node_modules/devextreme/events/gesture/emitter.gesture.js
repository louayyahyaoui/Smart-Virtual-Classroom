/**
 * DevExtreme (events/gesture/emitter.gesture.js)
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
var _devices = _interopRequireDefault(require("../../core/devices"));
var _style = require("../../core/utils/style");
var _call_once = _interopRequireDefault(require("../../core/utils/call_once"));
var _dom = require("../../core/utils/dom");
var _ready_callbacks = _interopRequireDefault(require("../../core/utils/ready_callbacks"));
var _math = require("../../core/utils/math");
var _common = require("../../core/utils/common");
var _type = require("../../core/utils/type");
var _index = require("../utils/index");
var _emitter = _interopRequireDefault(require("../core/emitter"));

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        "default": obj
    }
}
var ready = _ready_callbacks.default.add;
var abs = Math.abs;
var SLEEP = 0;
var INITED = 1;
var STARTED = 2;
var TOUCH_BOUNDARY = 10;
var IMMEDIATE_TOUCH_BOUNDARY = 0;
var IMMEDIATE_TIMEOUT = 180;
var supportPointerEvents = function() {
    return (0, _style.styleProp)("pointer-events")
};
var setGestureCover = (0, _call_once.default)(function() {
    var GESTURE_COVER_CLASS = "dx-gesture-cover";
    var isDesktop = "desktop" === _devices.default.real().deviceType;
    if (!supportPointerEvents() || !isDesktop) {
        return _common.noop
    }
    var $cover = (0, _renderer.default)("<div>").addClass(GESTURE_COVER_CLASS).css("pointerEvents", "none");
    _events_engine.default.subscribeGlobal($cover, "dxmousewheel", function(e) {
        e.preventDefault()
    });
    ready(function() {
        $cover.appendTo("body")
    });
    return function(toggle, cursor) {
        $cover.css("pointerEvents", toggle ? "all" : "none");
        toggle && $cover.css("cursor", cursor)
    }
});
var gestureCover = function(toggle, cursor) {
    var gestureCoverStrategy = setGestureCover();
    gestureCoverStrategy(toggle, cursor)
};
var GestureEmitter = _emitter.default.inherit({
    gesture: true,
    configure: function(data) {
        this.getElement().css("msTouchAction", data.immediate ? "pinch-zoom" : "");
        this.callBase(data)
    },
    allowInterruptionByMouseWheel: function() {
        return this._stage !== STARTED
    },
    getDirection: function() {
        return this.direction
    },
    _cancel: function() {
        this.callBase.apply(this, arguments);
        this._toggleGestureCover(false);
        this._stage = SLEEP
    },
    start: function(e) {
        if (e._needSkipEvent || (0, _index.needSkipEvent)(e)) {
            this._cancel(e);
            return
        }
        this._startEvent = (0, _index.createEvent)(e);
        this._startEventData = (0, _index.eventData)(e);
        this._stage = INITED;
        this._init(e);
        this._setupImmediateTimer()
    },
    _setupImmediateTimer: function() {
        clearTimeout(this._immediateTimer);
        this._immediateAccepted = false;
        if (!this.immediate) {
            return
        }
        this._immediateTimer = setTimeout(function() {
            this._immediateAccepted = true
        }.bind(this), IMMEDIATE_TIMEOUT)
    },
    move: function(e) {
        if (this._stage === INITED && this._directionConfirmed(e)) {
            this._stage = STARTED;
            this._resetActiveElement();
            this._toggleGestureCover(true);
            this._clearSelection(e);
            this._adjustStartEvent(e);
            this._start(this._startEvent);
            if (this._stage === SLEEP) {
                return
            }
            this._requestAccept(e);
            this._move(e);
            this._forgetAccept()
        } else {
            if (this._stage === STARTED) {
                this._clearSelection(e);
                this._move(e)
            }
        }
    },
    _directionConfirmed: function(e) {
        var touchBoundary = this._getTouchBoundary(e);
        var delta = (0, _index.eventDelta)(this._startEventData, (0, _index.eventData)(e));
        var deltaX = abs(delta.x);
        var deltaY = abs(delta.y);
        var horizontalMove = this._validateMove(touchBoundary, deltaX, deltaY);
        var verticalMove = this._validateMove(touchBoundary, deltaY, deltaX);
        var direction = this.getDirection(e);
        var bothAccepted = "both" === direction && (horizontalMove || verticalMove);
        var horizontalAccepted = "horizontal" === direction && horizontalMove;
        var verticalAccepted = "vertical" === direction && verticalMove;
        return bothAccepted || horizontalAccepted || verticalAccepted || this._immediateAccepted
    },
    _validateMove: function(touchBoundary, mainAxis, crossAxis) {
        return mainAxis && mainAxis >= touchBoundary && (this.immediate ? mainAxis >= crossAxis : true)
    },
    _getTouchBoundary: function(e) {
        return this.immediate || (0, _index.isDxMouseWheelEvent)(e) ? IMMEDIATE_TOUCH_BOUNDARY : TOUCH_BOUNDARY
    },
    _adjustStartEvent: function(e) {
        var touchBoundary = this._getTouchBoundary(e);
        var delta = (0, _index.eventDelta)(this._startEventData, (0, _index.eventData)(e));
        this._startEvent.pageX += (0, _math.sign)(delta.x) * touchBoundary;
        this._startEvent.pageY += (0, _math.sign)(delta.y) * touchBoundary
    },
    _resetActiveElement: function() {
        if ("ios" === _devices.default.real().platform && this.getElement().find(":focus").length) {
            (0, _dom.resetActiveElement)()
        }
    },
    _toggleGestureCover: function(toggle) {
        this._toggleGestureCoverImpl(toggle)
    },
    _toggleGestureCoverImpl: function(toggle) {
        var isStarted = this._stage === STARTED;
        if (isStarted) {
            gestureCover(toggle, this.getElement().css("cursor"))
        }
    },
    _clearSelection: function(e) {
        if ((0, _index.isDxMouseWheelEvent)(e) || (0, _index.isTouchEvent)(e)) {
            return
        }(0, _dom.clearSelection)()
    },
    end: function(e) {
        this._toggleGestureCover(false);
        if (this._stage === STARTED) {
            this._end(e)
        } else {
            if (this._stage === INITED) {
                this._stop(e)
            }
        }
        this._stage = SLEEP
    },
    dispose: function() {
        clearTimeout(this._immediateTimer);
        this.callBase.apply(this, arguments);
        this._toggleGestureCover(false)
    },
    _init: _common.noop,
    _start: _common.noop,
    _move: _common.noop,
    _stop: _common.noop,
    _end: _common.noop
});
GestureEmitter.initialTouchBoundary = TOUCH_BOUNDARY;
GestureEmitter.touchBoundary = function(newBoundary) {
    if ((0, _type.isDefined)(newBoundary)) {
        TOUCH_BOUNDARY = newBoundary;
        return
    }
    return TOUCH_BOUNDARY
};
var _default = GestureEmitter;
exports.default = _default;
module.exports = exports.default;
