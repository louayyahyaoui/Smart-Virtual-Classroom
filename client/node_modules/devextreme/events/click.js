/**
 * DevExtreme (events/click.js)
 * Version: 20.2.6
 * Build date: Tue Mar 16 2021
 *
 * Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
exports.name = void 0;
var _renderer = _interopRequireDefault(require("../core/renderer"));
var _events_engine = _interopRequireDefault(require("../events/core/events_engine"));
var _devices = _interopRequireDefault(require("../core/devices"));
var _dom_adapter = _interopRequireDefault(require("../core/dom_adapter"));
var _dom = require("../core/utils/dom");
var _frame = require("../animation/frame");
var _index = require("./utils/index");
var _event_nodes_disposing = require("./utils/event_nodes_disposing");
var _pointer = _interopRequireDefault(require("./pointer"));
var _emitter = _interopRequireDefault(require("./core/emitter"));
var _emitter_registrator = _interopRequireDefault(require("./core/emitter_registrator"));
var _version = require("../core/utils/version");

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        "default": obj
    }
}
var CLICK_EVENT_NAME = "dxclick";
exports.name = CLICK_EVENT_NAME;
var TOUCH_BOUNDARY = 10;
var abs = Math.abs;
var isInput = function(element) {
    return (0, _renderer.default)(element).is("input, textarea, select, button ,:focus, :focus *")
};
var misc = {
    requestAnimationFrame: _frame.requestAnimationFrame,
    cancelAnimationFrame: _frame.cancelAnimationFrame
};
var ClickEmitter = _emitter.default.inherit({
    ctor: function(element) {
        this.callBase(element);
        this._makeElementClickable((0, _renderer.default)(element))
    },
    _makeElementClickable: function($element) {
        if (!$element.attr("onclick")) {
            $element.attr("onclick", "void(0)")
        }
    },
    start: function(e) {
        this._blurPrevented = e.isDefaultPrevented();
        this._startTarget = e.target;
        this._startEventData = (0, _index.eventData)(e)
    },
    end: function(e) {
        if (this._eventOutOfElement(e, this.getElement().get(0)) || e.type === _pointer.default.cancel) {
            this._cancel(e);
            return
        }
        if (!isInput(e.target) && !this._blurPrevented) {
            (0, _dom.resetActiveElement)()
        }
        this._accept(e);
        this._clickAnimationFrame = misc.requestAnimationFrame(function() {
            this._fireClickEvent(e)
        }.bind(this))
    },
    _eventOutOfElement: function(e, element) {
        var target = e.target;
        var targetChanged = !(0, _dom.contains)(element, target) && element !== target;
        var gestureDelta = (0, _index.eventDelta)((0, _index.eventData)(e), this._startEventData);
        var boundsExceeded = abs(gestureDelta.x) > TOUCH_BOUNDARY || abs(gestureDelta.y) > TOUCH_BOUNDARY;
        return targetChanged || boundsExceeded
    },
    _fireClickEvent: function(e) {
        this._fireEvent(CLICK_EVENT_NAME, e, {
            target: (0, _dom.closestCommonParent)(this._startTarget, e.target)
        })
    },
    dispose: function() {
        misc.cancelAnimationFrame(this._clickAnimationFrame)
    }
});
var realDevice = _devices.default.real();
var useNativeClick = realDevice.generic || realDevice.ios && (0, _version.compare)(realDevice.version, [9, 3]) >= 0 || realDevice.android && (0, _version.compare)(realDevice.version, [5]) >= 0;
! function() {
    var NATIVE_CLICK_CLASS = "dx-native-click";
    var isNativeClickEvent = function(target) {
        return useNativeClick || (0, _renderer.default)(target).closest("." + NATIVE_CLICK_CLASS).length
    };
    var prevented = null;
    var lastFiredEvent = null;

    function onNodeRemove() {
        lastFiredEvent = null
    }
    var clickHandler = function(e) {
        var originalEvent = e.originalEvent;
        var eventAlreadyFired = lastFiredEvent === originalEvent || originalEvent && originalEvent.DXCLICK_FIRED;
        var leftButton = !e.which || 1 === e.which;
        if (leftButton && !prevented && isNativeClickEvent(e.target) && !eventAlreadyFired) {
            if (originalEvent) {
                originalEvent.DXCLICK_FIRED = true
            }(0, _event_nodes_disposing.unsubscribeNodesDisposing)(lastFiredEvent, onNodeRemove);
            lastFiredEvent = originalEvent;
            (0, _event_nodes_disposing.subscribeNodesDisposing)(lastFiredEvent, onNodeRemove);
            (0, _index.fireEvent)({
                type: CLICK_EVENT_NAME,
                originalEvent: e
            })
        }
    };
    ClickEmitter = ClickEmitter.inherit({
        _makeElementClickable: function($element) {
            if (!isNativeClickEvent($element)) {
                this.callBase($element)
            }
            _events_engine.default.on($element, "click", clickHandler)
        },
        configure: function(data) {
            this.callBase(data);
            if (data.useNative) {
                this.getElement().addClass(NATIVE_CLICK_CLASS)
            }
        },
        start: function(e) {
            prevented = null;
            if (!isNativeClickEvent(e.target)) {
                this.callBase(e)
            }
        },
        end: function(e) {
            if (!isNativeClickEvent(e.target)) {
                this.callBase(e)
            }
        },
        cancel: function() {
            prevented = true
        },
        dispose: function() {
            this.callBase();
            _events_engine.default.off(this.getElement(), "click", clickHandler)
        }
    })
}();
! function() {
    var desktopDevice = _devices.default.real().generic;
    if (!desktopDevice) {
        var startTarget = null;
        var blurPrevented = false;
        var pointerDownHandler = function(e) {
            startTarget = e.target;
            blurPrevented = e.isDefaultPrevented()
        };
        var clickHandler = function(e) {
            var $target = (0, _renderer.default)(e.target);
            if (!blurPrevented && startTarget && !$target.is(startTarget) && !(0, _renderer.default)(startTarget).is("label") && isInput($target)) {
                (0, _dom.resetActiveElement)()
            }
            startTarget = null;
            blurPrevented = false
        };
        var NATIVE_CLICK_FIXER_NAMESPACE = "NATIVE_CLICK_FIXER";
        var document = _dom_adapter.default.getDocument();
        _events_engine.default.subscribeGlobal(document, (0, _index.addNamespace)(_pointer.default.down, NATIVE_CLICK_FIXER_NAMESPACE), pointerDownHandler);
        _events_engine.default.subscribeGlobal(document, (0, _index.addNamespace)("click", NATIVE_CLICK_FIXER_NAMESPACE), clickHandler)
    }
}();
(0, _emitter_registrator.default)({
    emitter: ClickEmitter,
    bubble: true,
    events: [CLICK_EVENT_NAME]
});
