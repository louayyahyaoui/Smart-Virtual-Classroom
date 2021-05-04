/**
 * DevExtreme (events/swipe.js)
 * Version: 20.2.6
 * Build date: Tue Mar 16 2021
 *
 * Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
exports.end = exports.start = exports.swipe = void 0;
var _index = require("./utils/index");
var _emitter = _interopRequireDefault(require("./gesture/emitter.gesture"));
var _emitter_registrator = _interopRequireDefault(require("./core/emitter_registrator"));

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        "default": obj
    }
}
var SWIPE_START_EVENT = "dxswipestart";
exports.start = SWIPE_START_EVENT;
var SWIPE_EVENT = "dxswipe";
exports.swipe = SWIPE_EVENT;
var SWIPE_END_EVENT = "dxswipeend";
exports.end = SWIPE_END_EVENT;
var HorizontalStrategy = {
    defaultItemSizeFunc: function() {
        return this.getElement().width()
    },
    getBounds: function() {
        return [this._maxLeftOffset, this._maxRightOffset]
    },
    calcOffsetRatio: function(e) {
        var endEventData = (0, _index.eventData)(e);
        return (endEventData.x - (this._savedEventData && this._savedEventData.x || 0)) / this._itemSizeFunc().call(this, e)
    },
    isFastSwipe: function(e) {
        var endEventData = (0, _index.eventData)(e);
        return this.FAST_SWIPE_SPEED_LIMIT * Math.abs(endEventData.x - this._tickData.x) >= endEventData.time - this._tickData.time
    }
};
var VerticalStrategy = {
    defaultItemSizeFunc: function() {
        return this.getElement().height()
    },
    getBounds: function() {
        return [this._maxTopOffset, this._maxBottomOffset]
    },
    calcOffsetRatio: function(e) {
        var endEventData = (0, _index.eventData)(e);
        return (endEventData.y - (this._savedEventData && this._savedEventData.y || 0)) / this._itemSizeFunc().call(this, e)
    },
    isFastSwipe: function(e) {
        var endEventData = (0, _index.eventData)(e);
        return this.FAST_SWIPE_SPEED_LIMIT * Math.abs(endEventData.y - this._tickData.y) >= endEventData.time - this._tickData.time
    }
};
var STRATEGIES = {
    horizontal: HorizontalStrategy,
    vertical: VerticalStrategy
};
var SwipeEmitter = _emitter.default.inherit({
    TICK_INTERVAL: 300,
    FAST_SWIPE_SPEED_LIMIT: 10,
    ctor: function(element) {
        this.callBase(element);
        this.direction = "horizontal";
        this.elastic = true
    },
    _getStrategy: function() {
        return STRATEGIES[this.direction]
    },
    _defaultItemSizeFunc: function() {
        return this._getStrategy().defaultItemSizeFunc.call(this)
    },
    _itemSizeFunc: function() {
        return this.itemSizeFunc || this._defaultItemSizeFunc
    },
    _init: function(e) {
        this._tickData = (0, _index.eventData)(e)
    },
    _start: function(e) {
        this._savedEventData = (0, _index.eventData)(e);
        e = this._fireEvent(SWIPE_START_EVENT, e);
        if (!e.cancel) {
            this._maxLeftOffset = e.maxLeftOffset;
            this._maxRightOffset = e.maxRightOffset;
            this._maxTopOffset = e.maxTopOffset;
            this._maxBottomOffset = e.maxBottomOffset
        }
    },
    _move: function(e) {
        var strategy = this._getStrategy();
        var moveEventData = (0, _index.eventData)(e);
        var offset = strategy.calcOffsetRatio.call(this, e);
        offset = this._fitOffset(offset, this.elastic);
        if (moveEventData.time - this._tickData.time > this.TICK_INTERVAL) {
            this._tickData = moveEventData
        }
        this._fireEvent(SWIPE_EVENT, e, {
            offset: offset
        });
        e.preventDefault()
    },
    _end: function(e) {
        var strategy = this._getStrategy();
        var offsetRatio = strategy.calcOffsetRatio.call(this, e);
        var isFast = strategy.isFastSwipe.call(this, e);
        var startOffset = offsetRatio;
        var targetOffset = this._calcTargetOffset(offsetRatio, isFast);
        startOffset = this._fitOffset(startOffset, this.elastic);
        targetOffset = this._fitOffset(targetOffset, false);
        this._fireEvent(SWIPE_END_EVENT, e, {
            offset: startOffset,
            targetOffset: targetOffset
        })
    },
    _fitOffset: function(offset, elastic) {
        var strategy = this._getStrategy();
        var bounds = strategy.getBounds.call(this);
        if (offset < -bounds[0]) {
            return elastic ? (-2 * bounds[0] + offset) / 3 : -bounds[0]
        }
        if (offset > bounds[1]) {
            return elastic ? (2 * bounds[1] + offset) / 3 : bounds[1]
        }
        return offset
    },
    _calcTargetOffset: function(offsetRatio, isFast) {
        var result;
        if (isFast) {
            result = Math.ceil(Math.abs(offsetRatio));
            if (offsetRatio < 0) {
                result = -result
            }
        } else {
            result = Math.round(offsetRatio)
        }
        return result
    }
});
(0, _emitter_registrator.default)({
    emitter: SwipeEmitter,
    events: [SWIPE_START_EVENT, SWIPE_EVENT, SWIPE_END_EVENT]
});
