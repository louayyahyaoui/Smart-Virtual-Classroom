"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var math_1 = require("../utils/math");
var metrics_1 = require("./metrics");
var point_1 = require("./point");
var rectangle_1 = require("./rectangle");
var Segment = (function () {
    function Segment(startPoint, endPoint) {
        this.startPoint = startPoint;
        this.endPoint = endPoint;
    }
    Object.defineProperty(Segment.prototype, "length", {
        get: function () {
            return metrics_1.Metrics.euclideanDistance(this.startPoint, this.endPoint);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Segment.prototype, "xLength", {
        get: function () {
            return Math.abs(this.endPoint.x - this.startPoint.x);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Segment.prototype, "yLength", {
        get: function () {
            return Math.abs(this.endPoint.y - this.startPoint.y);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Segment.prototype, "center", {
        get: function () {
            return new point_1.Point(this.startPoint.x + (this.endPoint.x - this.startPoint.x) / 2, this.startPoint.y + (this.endPoint.y - this.startPoint.y) / 2);
        },
        enumerable: true,
        configurable: true
    });
    Segment.prototype.isIntersected = function (segment) {
        return this.startPoint.equals(segment.startPoint) || this.endPoint.equals(segment.startPoint) ||
            this.startPoint.equals(segment.endPoint) || this.endPoint.equals(segment.endPoint) ||
            (this.intersectCore(segment) && segment.intersectCore(this));
    };
    Segment.prototype.containsPoint = function (point, accuracy) {
        if (accuracy === void 0) { accuracy = 0.0000001; }
        return this.startPoint.equals(point) || this.endPoint.equals(point) ||
            math_1.MathUtils.numberCloseTo(this.length, metrics_1.Metrics.euclideanDistance(this.startPoint, point) + metrics_1.Metrics.euclideanDistance(this.endPoint, point), accuracy);
    };
    Segment.prototype.isIntersectedByRect = function (rect) {
        if (rectangle_1.Rectangle.containsPoint(rect, this.startPoint) || rectangle_1.Rectangle.containsPoint(rect, this.endPoint))
            return true;
        var left = rect.x;
        var right = rect.x + rect.width;
        var top = rect.y;
        var bottom = rect.y + rect.height;
        return this.isIntersected(new Segment(new point_1.Point(left, top), new point_1.Point(left, bottom))) ||
            this.isIntersected(new Segment(new point_1.Point(right, top), new point_1.Point(right, bottom))) ||
            this.isIntersected(new Segment(new point_1.Point(left, top), new point_1.Point(right, top))) ||
            this.isIntersected(new Segment(new point_1.Point(left, bottom), new point_1.Point(right, bottom)));
    };
    Segment.prototype.intersectCore = function (segment) {
        if (this.startPoint.x === this.endPoint.x) {
            if (this.startPoint.x - segment.endPoint.x !== 0)
                return (this.startPoint.x - segment.startPoint.x) / (this.startPoint.x - segment.endPoint.x) <= 0;
            if (segment.endPoint.y - this.endPoint.y !== 0)
                return (segment.endPoint.y - this.startPoint.y) / (segment.endPoint.y - this.endPoint.y) <= 0;
        }
        if (this.startPoint.y === this.endPoint.y) {
            if (this.startPoint.y - segment.endPoint.y !== 0)
                return (this.startPoint.y - segment.startPoint.y) / (this.startPoint.y - segment.endPoint.y) <= 0;
            if (segment.endPoint.x - this.endPoint.x !== 0)
                return (segment.endPoint.x - this.startPoint.x) / (segment.endPoint.x - this.endPoint.x) <= 0;
        }
        var tg = (this.endPoint.y - this.startPoint.y) / (this.endPoint.x - this.startPoint.x);
        var y1 = this.startPoint.y + (segment.startPoint.x - this.startPoint.x) * tg;
        var y2 = this.startPoint.y + (segment.endPoint.x - this.startPoint.x) * tg;
        var dy1 = segment.startPoint.y - y1;
        var dy2 = segment.endPoint.y - y2;
        if (dy1 === 0 && dy2 === 0) {
            return (this.startPoint.y - y1) / (this.endPoint.y - y1) <= 0 ||
                (this.startPoint.y - y2) / (this.endPoint.y - y2) <= 0;
        }
        return dy1 === 0 || dy2 === 0 || dy1 / dy2 < 0;
    };
    return Segment;
}());
exports.Segment = Segment;
