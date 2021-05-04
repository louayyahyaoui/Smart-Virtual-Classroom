/**
 * DevExtreme (viz/vector_map/gesture_handler.js)
 * Version: 20.2.6
 * Build date: Tue Mar 16 2021
 *
 * Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
exports.GestureHandler = GestureHandler;
var _ln = Math.log;
var _LN2 = Math.LN2;

function GestureHandler(params) {
    var that = this;
    that._projection = params.projection;
    that._renderer = params.renderer;
    that._x = that._y = 0;
    that._subscribeToTracker(params.tracker)
}
GestureHandler.prototype = {
    constructor: GestureHandler,
    dispose: function() {
        this._offTracker();
        this._offTracker = null
    },
    _subscribeToTracker: function(tracker) {
        var that = this;
        var isActive = false;
        that._offTracker = tracker.on({
            start: function(arg) {
                isActive = "control-bar" !== arg.data.name;
                if (isActive) {
                    that._processStart(arg)
                }
            },
            move: function(arg) {
                if (isActive) {
                    that._processMove(arg)
                }
            },
            end: function() {
                if (isActive) {
                    that._processEnd()
                }
            },
            zoom: function(arg) {
                that._processZoom(arg)
            }
        })
    },
    setInteraction: function(options) {
        this._processEnd();
        this._centeringEnabled = options.centeringEnabled;
        this._zoomingEnabled = options.zoomingEnabled
    },
    _processStart: function(arg) {
        if (this._centeringEnabled) {
            this._x = arg.x;
            this._y = arg.y;
            this._projection.beginMoveCenter()
        }
    },
    _processMove: function(arg) {
        var that = this;
        if (that._centeringEnabled) {
            that._renderer.root.attr({
                cursor: "move"
            });
            that._projection.moveCenter([that._x - arg.x, that._y - arg.y]);
            that._x = arg.x;
            that._y = arg.y
        }
    },
    _processEnd: function() {
        if (this._centeringEnabled) {
            this._renderer.root.attr({
                cursor: "default"
            });
            this._projection.endMoveCenter()
        }
    },
    _processZoom: function(arg) {
        var that = this;
        var delta;
        var screenPosition;
        var coords;
        if (that._zoomingEnabled) {
            if (arg.delta) {
                delta = arg.delta
            } else {
                if (arg.ratio) {
                    delta = _ln(arg.ratio) / _LN2
                }
            }
            if (that._centeringEnabled) {
                screenPosition = that._renderer.getRootOffset();
                screenPosition = [arg.x - screenPosition.left, arg.y - screenPosition.top];
                coords = that._projection.fromScreenPoint(screenPosition)
            }
            that._projection.changeScaledZoom(delta);
            if (that._centeringEnabled) {
                that._projection.setCenterByPoint(coords, screenPosition)
            }
        }
    }
};
