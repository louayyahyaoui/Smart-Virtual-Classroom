/**
 * DevExtreme (ui/scroll_view/ui.events.emitter.gesture.scroll.js)
 * Version: 20.2.6
 * Build date: Tue Mar 16 2021
 *
 * Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
exports.default = void 0;
var _events_engine = _interopRequireDefault(require("../../events/core/events_engine"));
var _class = _interopRequireDefault(require("../../core/class"));
var _index = require("../../events/utils/index");
var _emitter = _interopRequireDefault(require("../../events/gesture/emitter.gesture"));
var _emitter_registrator = _interopRequireDefault(require("../../events/core/emitter_registrator"));
var _frame = require("../../animation/frame");
var _devices = _interopRequireDefault(require("../../core/devices"));
var _version = require("../../core/utils/version");

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        "default": obj
    }
}
var abstract = _class.default.abstract;
var realDevice = _devices.default.real();
var SCROLL_INIT_EVENT = "dxscrollinit";
var SCROLL_START_EVENT = "dxscrollstart";
var SCROLL_MOVE_EVENT = "dxscroll";
var SCROLL_END_EVENT = "dxscrollend";
var SCROLL_STOP_EVENT = "dxscrollstop";
var SCROLL_CANCEL_EVENT = "dxscrollcancel";
var Locker = _class.default.inherit(function() {
    var NAMESPACED_SCROLL_EVENT = (0, _index.addNamespace)("scroll", "dxScrollEmitter");
    return {
        ctor: function(element) {
            this._element = element;
            this._locked = false;
            var that = this;
            this._proxiedScroll = function(e) {
                that._scroll(e)
            };
            _events_engine.default.on(this._element, NAMESPACED_SCROLL_EVENT, this._proxiedScroll)
        },
        _scroll: abstract,
        check: function(e, callback) {
            if (this._locked) {
                callback()
            }
        },
        dispose: function() {
            _events_engine.default.off(this._element, NAMESPACED_SCROLL_EVENT, this._proxiedScroll)
        }
    }
}());
var TimeoutLocker = Locker.inherit(function() {
    return {
        ctor: function(element, timeout) {
            this.callBase(element);
            this._timeout = timeout
        },
        _scroll: function() {
            this._prepare();
            this._forget()
        },
        _prepare: function() {
            if (this._timer) {
                this._clearTimer()
            }
            this._locked = true
        },
        _clearTimer: function() {
            clearTimeout(this._timer);
            this._locked = false;
            this._timer = null
        },
        _forget: function() {
            var that = this;
            this._timer = setTimeout(function() {
                that._clearTimer()
            }, this._timeout)
        },
        dispose: function() {
            this.callBase();
            this._clearTimer()
        }
    }
}());
var WheelLocker = TimeoutLocker.inherit(function() {
    var WHEEL_UNLOCK_TIMEOUT = 400;
    return {
        ctor: function(element) {
            this.callBase(element, WHEEL_UNLOCK_TIMEOUT);
            this._lastWheelDirection = null
        },
        check: function(e, callback) {
            this._checkDirectionChanged(e);
            this.callBase(e, callback)
        },
        _checkDirectionChanged: function(e) {
            if (!(0, _index.isDxMouseWheelEvent)(e)) {
                this._lastWheelDirection = null;
                return
            }
            var direction = e.shiftKey || false;
            var directionChange = null !== this._lastWheelDirection && direction !== this._lastWheelDirection;
            this._lastWheelDirection = direction;
            this._locked = this._locked && !directionChange
        }
    }
}());
var PointerLocker = TimeoutLocker.inherit(function() {
    var POINTER_UNLOCK_TIMEOUT = 400;
    return {
        ctor: function(element) {
            this.callBase(element, POINTER_UNLOCK_TIMEOUT)
        }
    }
}());
! function() {
    var ios8_greater = realDevice.ios && (0, _version.compare)(realDevice.version, [8]) >= 0;
    var android5_greater = realDevice.android && (0, _version.compare)(realDevice.version, [5]) >= 0;
    if (!(ios8_greater || android5_greater)) {
        return
    }
    PointerLocker = Locker.inherit(function() {
        return {
            _scroll: function() {
                this._locked = true;
                var that = this;
                (0, _frame.cancelAnimationFrame)(this._scrollFrame);
                this._scrollFrame = (0, _frame.requestAnimationFrame)(function() {
                    that._locked = false
                })
            },
            check: function(e, callback) {
                (0, _frame.cancelAnimationFrame)(this._scrollFrame);
                (0, _frame.cancelAnimationFrame)(this._checkFrame);
                var that = this;
                var callBase = this.callBase;
                this._checkFrame = (0, _frame.requestAnimationFrame)(function() {
                    callBase.call(that, e, callback);
                    that._locked = false
                })
            },
            dispose: function() {
                this.callBase();
                (0, _frame.cancelAnimationFrame)(this._scrollFrame);
                (0, _frame.cancelAnimationFrame)(this._checkFrame)
            }
        }
    }())
}();
var ScrollEmitter = _emitter.default.inherit(function() {
    var INERTIA_TIMEOUT = 100;
    var VELOCITY_CALC_TIMEOUT = 200;
    var FRAME_DURATION = Math.round(1e3 / 60);
    return {
        ctor: function(element) {
            this.callBase.apply(this, arguments);
            this.direction = "both";
            this._pointerLocker = new PointerLocker(element);
            this._wheelLocker = new WheelLocker(element)
        },
        validate: function() {
            return true
        },
        configure: function(data) {
            if (data.scrollTarget) {
                this._pointerLocker.dispose();
                this._wheelLocker.dispose();
                this._pointerLocker = new PointerLocker(data.scrollTarget);
                this._wheelLocker = new WheelLocker(data.scrollTarget)
            }
            this.callBase(data)
        },
        _init: function(e) {
            this._wheelLocker.check(e, function() {
                if ((0, _index.isDxMouseWheelEvent)(e)) {
                    this._accept(e)
                }
            }.bind(this));
            this._pointerLocker.check(e, function() {
                var skipCheck = this.isNative && (0, _index.isMouseEvent)(e);
                if (!(0, _index.isDxMouseWheelEvent)(e) && !skipCheck) {
                    this._accept(e)
                }
            }.bind(this));
            this._fireEvent(SCROLL_INIT_EVENT, e);
            this._prevEventData = (0, _index.eventData)(e)
        },
        move: function(e) {
            this.callBase.apply(this, arguments);
            e.isScrollingEvent = this.isNative || e.isScrollingEvent
        },
        _start: function(e) {
            this._savedEventData = (0, _index.eventData)(e);
            this._fireEvent(SCROLL_START_EVENT, e);
            this._prevEventData = (0, _index.eventData)(e)
        },
        _move: function(e) {
            var currentEventData = (0, _index.eventData)(e);
            this._fireEvent(SCROLL_MOVE_EVENT, e, {
                delta: (0, _index.eventDelta)(this._prevEventData, currentEventData)
            });
            var delta = (0, _index.eventDelta)(this._savedEventData, currentEventData);
            if (delta.time > VELOCITY_CALC_TIMEOUT) {
                this._savedEventData = this._prevEventData
            }
            this._prevEventData = (0, _index.eventData)(e)
        },
        _end: function(e) {
            var endEventDelta = (0, _index.eventDelta)(this._prevEventData, (0, _index.eventData)(e));
            var velocity = {
                x: 0,
                y: 0
            };
            if (!(0, _index.isDxMouseWheelEvent)(e) && endEventDelta.time < INERTIA_TIMEOUT) {
                var delta = (0, _index.eventDelta)(this._savedEventData, this._prevEventData);
                var velocityMultiplier = FRAME_DURATION / delta.time;
                velocity = {
                    x: delta.x * velocityMultiplier,
                    y: delta.y * velocityMultiplier
                }
            }
            this._fireEvent(SCROLL_END_EVENT, e, {
                velocity: velocity
            })
        },
        _stop: function(e) {
            this._fireEvent(SCROLL_STOP_EVENT, e)
        },
        cancel: function(e) {
            this.callBase.apply(this, arguments);
            this._fireEvent(SCROLL_CANCEL_EVENT, e)
        },
        dispose: function() {
            this.callBase.apply(this, arguments);
            this._pointerLocker.dispose();
            this._wheelLocker.dispose()
        },
        _clearSelection: function() {
            if (this.isNative) {
                return
            }
            return this.callBase.apply(this, arguments)
        },
        _toggleGestureCover: function() {
            if (this.isNative) {
                return
            }
            return this.callBase.apply(this, arguments)
        }
    }
}());
(0, _emitter_registrator.default)({
    emitter: ScrollEmitter,
    events: [SCROLL_INIT_EVENT, SCROLL_START_EVENT, SCROLL_MOVE_EVENT, SCROLL_END_EVENT, SCROLL_STOP_EVENT, SCROLL_CANCEL_EVENT]
});
var _default = {
    init: SCROLL_INIT_EVENT,
    start: SCROLL_START_EVENT,
    move: SCROLL_MOVE_EVENT,
    end: SCROLL_END_EVENT,
    stop: SCROLL_STOP_EVENT,
    cancel: SCROLL_CANCEL_EVENT
};
exports.default = _default;
module.exports = exports.default;
