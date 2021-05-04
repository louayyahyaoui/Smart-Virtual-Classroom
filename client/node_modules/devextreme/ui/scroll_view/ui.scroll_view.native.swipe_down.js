/**
 * DevExtreme (ui/scroll_view/ui.scroll_view.native.swipe_down.js)
 * Version: 20.2.6
 * Build date: Tue Mar 16 2021
 *
 * Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
exports.default = void 0;
var _renderer = _interopRequireDefault(require("../../core/renderer"));
var _callbacks = _interopRequireDefault(require("../../core/utils/callbacks"));
var _translator = require("../../animation/translator");
var _index = require("../../events/utils/index");
var _uiScrollable = _interopRequireDefault(require("./ui.scrollable.native"));
var _load_indicator = _interopRequireDefault(require("../load_indicator"));
var _deferred = require("../../core/utils/deferred");

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        "default": obj
    }
}
var SCROLLVIEW_PULLDOWN_DOWN_LOADING_CLASS = "dx-scrollview-pull-down-loading";
var SCROLLVIEW_PULLDOWN_INDICATOR_CLASS = "dx-scrollview-pull-down-indicator";
var SCROLLVIEW_PULLDOWN_REFRESHING_CLASS = "dx-scrollview-pull-down-refreshing";
var PULLDOWN_ICON_CLASS = "dx-icon-pulldown";
var STATE_RELEASED = 0;
var STATE_READY = 1;
var STATE_REFRESHING = 2;
var STATE_TOUCHED = 4;
var STATE_PULLED = 5;
var SwipeDownNativeScrollViewStrategy = _uiScrollable.default.inherit({
    _init: function(scrollView) {
        this.callBase(scrollView);
        this._$topPocket = scrollView._$topPocket;
        this._$bottomPocket = scrollView._$bottomPocket;
        this._$pullDown = scrollView._$pullDown;
        this._$scrollViewContent = scrollView.content();
        this._initCallbacks();
        this._location = 0
    },
    _initCallbacks: function() {
        this.pullDownCallbacks = (0, _callbacks.default)();
        this.releaseCallbacks = (0, _callbacks.default)();
        this.reachBottomCallbacks = (0, _callbacks.default)()
    },
    render: function() {
        this.callBase();
        this._renderPullDown();
        this._releaseState()
    },
    _renderPullDown: function() {
        var $loadContainer = (0, _renderer.default)("<div>").addClass(SCROLLVIEW_PULLDOWN_INDICATOR_CLASS);
        var $loadIndicator = new _load_indicator.default((0, _renderer.default)("<div>")).$element();
        this._$icon = (0, _renderer.default)("<div>").addClass(PULLDOWN_ICON_CLASS);
        this._$pullDown.empty().append(this._$icon).append($loadContainer.append($loadIndicator))
    },
    _releaseState: function() {
        this._state = STATE_RELEASED;
        this._releasePullDown();
        this._updateDimensions()
    },
    _releasePullDown: function() {
        this._$pullDown.css({
            opacity: 0
        })
    },
    _updateDimensions: function() {
        this.callBase();
        this._topPocketSize = this._$topPocket.height();
        this._bottomPocketSize = this._$bottomPocket.height();
        this._scrollOffset = this._$container.height() - this._$content.height()
    },
    _allowedDirections: function() {
        var allowedDirections = this.callBase();
        allowedDirections.vertical = allowedDirections.vertical || this._pullDownEnabled;
        return allowedDirections
    },
    handleInit: function(e) {
        this.callBase(e);
        if (this._state === STATE_RELEASED && 0 === this._location) {
            this._startClientY = (0, _index.eventData)(e.originalEvent).y;
            this._state = STATE_TOUCHED
        }
    },
    handleMove: function(e) {
        this.callBase(e);
        this._deltaY = (0, _index.eventData)(e.originalEvent).y - this._startClientY;
        if (this._state === STATE_TOUCHED) {
            if (this._pullDownEnabled && this._deltaY > 0) {
                this._state = STATE_PULLED
            } else {
                this._complete()
            }
        }
        if (this._state === STATE_PULLED) {
            e.preventDefault();
            this._movePullDown()
        }
    },
    _movePullDown: function() {
        var pullDownHeight = this._getPullDownHeight();
        var top = Math.min(3 * pullDownHeight, this._deltaY + this._getPullDownStartPosition());
        var angle = 180 * top / pullDownHeight / 3;
        this._$pullDown.css({
            opacity: 1
        }).toggleClass(SCROLLVIEW_PULLDOWN_REFRESHING_CLASS, top < pullDownHeight);
        (0, _translator.move)(this._$pullDown, {
            top: top
        });
        this._$icon.css({
            transform: "rotate(" + angle + "deg)"
        })
    },
    _isPullDown: function() {
        return this._pullDownEnabled && this._state === STATE_PULLED && this._deltaY >= this._getPullDownHeight() - this._getPullDownStartPosition()
    },
    _getPullDownHeight: function() {
        return Math.round(.05 * this._$element.outerHeight())
    },
    _getPullDownStartPosition: function() {
        return -Math.round(1.5 * this._$pullDown.outerHeight())
    },
    handleEnd: function() {
        if (this._isPullDown()) {
            this._pullDownRefreshing()
        }
        this._complete()
    },
    handleStop: function() {
        this._complete()
    },
    _complete: function() {
        if (this._state === STATE_TOUCHED || this._state === STATE_PULLED) {
            this._releaseState()
        }
    },
    handleScroll: function(e) {
        this.callBase(e);
        if (this._state === STATE_REFRESHING) {
            return
        }
        var currentLocation = this.location().top;
        var scrollDelta = this._location - currentLocation;
        this._location = currentLocation;
        if (scrollDelta > 0 && this._isReachBottom()) {
            this._reachBottom()
        } else {
            this._stateReleased()
        }
    },
    _isReachBottom: function() {
        return this._reachBottomEnabled && this._location <= this._scrollOffset + this._bottomPocketSize
    },
    _reachBottom: function() {
        this.reachBottomCallbacks.fire()
    },
    _stateReleased: function() {
        if (this._state === STATE_RELEASED) {
            return
        }
        this._$pullDown.removeClass(SCROLLVIEW_PULLDOWN_DOWN_LOADING_CLASS);
        this._releaseState()
    },
    _pullDownRefreshing: function() {
        this._state = STATE_REFRESHING;
        this._pullDownRefreshHandler()
    },
    _pullDownRefreshHandler: function() {
        this._refreshPullDown();
        this.pullDownCallbacks.fire()
    },
    _refreshPullDown: function() {
        this._$pullDown.addClass(SCROLLVIEW_PULLDOWN_DOWN_LOADING_CLASS);
        (0, _translator.move)(this._$pullDown, {
            top: this._getPullDownHeight()
        })
    },
    pullDownEnable: function(enabled) {
        this._$topPocket.toggle(enabled);
        this._pullDownEnabled = enabled
    },
    reachBottomEnable: function(enabled) {
        this._reachBottomEnabled = enabled
    },
    pendingRelease: function() {
        this._state = STATE_READY
    },
    release: function() {
        var deferred = new _deferred.Deferred;
        this._updateDimensions();
        clearTimeout(this._releaseTimeout);
        this._releaseTimeout = setTimeout(function() {
            this._stateReleased();
            this.releaseCallbacks.fire();
            this._updateAction();
            deferred.resolve()
        }.bind(this), 800);
        return deferred.promise()
    },
    dispose: function() {
        clearTimeout(this._pullDownRefreshTimeout);
        clearTimeout(this._releaseTimeout);
        this.callBase()
    }
});
var _default = SwipeDownNativeScrollViewStrategy;
exports.default = _default;
module.exports = exports.default;
