/**
 * DevExtreme (viz/utils.js)
 * Version: 20.2.6
 * Build date: Tue Mar 16 2021
 *
 * Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
Object.defineProperty(exports, "refreshPaths", {
    enumerable: true,
    get: function() {
        return _renderer.refreshPaths
    }
});
exports.prepareSegmentRectPoints = void 0;
var _renderer = require("./core/renderers/renderer");
var _iterator = require("../core/utils/iterator");
var prepareSegmentRectPoints = function(left, top, width, height, borderOptions) {
    var maxSW = ~~((width < height ? width : height) / 2);
    var sw = borderOptions.width || 0;
    var newSW = sw < maxSW ? sw : maxSW;
    left += newSW / 2;
    top += newSW / 2;
    width -= newSW;
    height -= newSW;
    var right = left + width;
    var bottom = top + height;
    var points = [];
    var segments = [];
    var segmentSequence;
    var visiblyOpt = 0;
    var prevSegmentVisibility = 0;
    var allSegment = {
        top: [
            [left, top],
            [right, top]
        ],
        right: [
            [right, top],
            [right, bottom]
        ],
        bottom: [
            [right, bottom],
            [left, bottom]
        ],
        left: [
            [left, bottom],
            [left, top]
        ]
    };
    (0, _iterator.each)(allSegment, function(seg) {
        var visibility = !!borderOptions[seg];
        visiblyOpt = 2 * visiblyOpt + ~~visibility
    });
    switch (visiblyOpt) {
        case 13:
        case 9:
            segmentSequence = ["left", "top", "right", "bottom"];
            break;
        case 11:
            segmentSequence = ["bottom", "left", "top", "right"];
            break;
        default:
            segmentSequence = ["top", "right", "bottom", "left"]
    }(0, _iterator.each)(segmentSequence, function(_, seg) {
        var segmentVisibility = !!borderOptions[seg];
        if (!prevSegmentVisibility && segments.length) {
            points.push(segments);
            segments = []
        }
        if (segmentVisibility) {
            (0, _iterator.each)(allSegment[seg].slice(prevSegmentVisibility), function(_, segment) {
                segments = segments.concat(segment)
            })
        }
        prevSegmentVisibility = ~~segmentVisibility
    });
    segments.length && points.push(segments);
    1 === points.length && (points = points[0]);
    return {
        points: points,
        pathType: 15 === visiblyOpt ? "area" : "line"
    }
};
exports.prepareSegmentRectPoints = prepareSegmentRectPoints;
