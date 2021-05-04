/**
 * DevExtreme (viz/chart_components/shutter_zoom.js)
 * Version: 20.2.6
 * Build date: Tue Mar 16 2021
 *
 * Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
exports.default = void 0;
var _drag = require("../../events/drag");
var SHUTTER_EVENTS_NS = ".shutter-zoom";
var DRAG_START_EVENT_NAME = _drag.start + SHUTTER_EVENTS_NS;
var DRAG_UPDATE_EVENT_NAME = _drag.move + SHUTTER_EVENTS_NS;
var DRAG_END_EVENT_NAME = _drag.end + SHUTTER_EVENTS_NS;

function getPointerCoord(rootOffset, canvas, rotated, e) {
    var coord = Math.floor(rotated ? e.pageY - rootOffset.top : e.pageX - rootOffset.left);
    var min = rotated ? canvas.y1 : canvas.x1;
    var max = rotated ? canvas.y2 : canvas.x2;
    if (coord < min) {
        coord = min
    } else {
        if (coord > max) {
            coord = max
        }
    }
    return coord
}

function checkCoords(rootOffset, canvas, e) {
    var x = e.pageX - rootOffset.left;
    var y = e.pageY - rootOffset.top;
    return x >= canvas.x1 && x <= canvas.x2 && y >= canvas.y1 && y <= canvas.y2
}

function dragStartHandler(ctx) {
    return function(e) {
        var offset = ctx.getRootOffset();
        var canvas = ctx.getCanvas();
        if (!checkCoords(offset, canvas, e)) {
            e.cancel = true;
            return
        }
        ctx.rootOffset = offset;
        ctx.canvas = canvas;
        ctx.startCoord = getPointerCoord(offset, canvas, ctx.rotated, e);
        ctx.triggerStart();
        ctx.rect.attr({
            x: canvas.x1,
            y: canvas.y1,
            width: canvas.width,
            height: canvas.height
        }).append(ctx.root)
    }
}

function dragHandler(ctx) {
    return function(e) {
        var curCoord = getPointerCoord(ctx.rootOffset, ctx.canvas, ctx.rotated, e);
        var attr = {};
        ctx.curCoord = curCoord;
        attr[ctx.rotated ? "y" : "x"] = Math.min(ctx.startCoord, curCoord);
        attr[ctx.rotated ? "height" : "width"] = Math.abs(ctx.startCoord - curCoord);
        ctx.rect.attr(attr)
    }
}

function dragEndHandler(ctx) {
    return function(e) {
        ctx.triggerEnd();
        ctx.rect.remove()
    }
}

function shutterZoom(options) {
    var chart = options.chart;
    var renderer = options.renderer;
    var rotated = options.rotated;
    var rect = renderer.rect(0, 0, 0, 0).attr(options.shutterOptions);
    var shutter = {
        rect: rect,
        root: renderer.root,
        rotated: rotated,
        triggerStart: function() {
            chart._eventTrigger("zoomStart")
        },
        triggerEnd: function() {
            var tr = chart._argumentAxes[0].getTranslator();
            var rangeStart = Math.min(this.startCoord, this.curCoord);
            var rangeEnd = Math.max(this.startCoord, this.curCoord);
            chart._eventTrigger("zoomEnd", {
                rangeStart: tr.from(rangeStart),
                rangeEnd: tr.from(rangeEnd)
            })
        },
        dispose: function() {
            renderer.root.off(SHUTTER_EVENTS_NS);
            rect.dispose()
        },
        getRootOffset: function() {
            return renderer.getRootOffset()
        },
        getCanvas: function() {
            var canvas = chart._canvas;
            var panes = chart.panes;
            var firstPane = panes[0].canvas;
            var lastPane = panes[panes.length - 1].canvas;
            return {
                x1: firstPane.left,
                y1: firstPane.top,
                x2: canvas.width - lastPane.right,
                y2: canvas.height - lastPane.bottom,
                width: canvas.width - firstPane.left - lastPane.right,
                height: canvas.height - firstPane.top - lastPane.bottom
            }
        }
    };
    renderer.root.off(SHUTTER_EVENTS_NS).on(DRAG_START_EVENT_NAME, {
        direction: rotated ? "vertical" : "horizontal",
        immediate: true
    }, dragStartHandler(shutter)).on(DRAG_UPDATE_EVENT_NAME, dragHandler(shutter)).on(DRAG_END_EVENT_NAME, dragEndHandler(shutter));
    return shutter
}
var _default = {
    name: "shutter_zoom",
    init: function() {
        var options = this.option("shutterZoom") || {};
        if (!options.enabled) {
            return
        }
        this._shutterZoom = shutterZoom({
            chart: this,
            renderer: this._renderer,
            rotated: this.option("rotated"),
            shutterOptions: options
        })
    },
    dispose: function() {
        this._shutterZoom && this._shutterZoom.dispose()
    }
};
exports.default = _default;
module.exports = exports.default;
