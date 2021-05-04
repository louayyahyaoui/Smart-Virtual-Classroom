"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Vector = (function () {
    function Vector(x, y) {
        if (x === void 0) { x = 0; }
        if (y === void 0) { y = 0; }
        this.x = x;
        this.y = y;
    }
    Object.defineProperty(Vector.prototype, "length", {
        get: function () {
            return Math.sqrt(this.x * this.x + this.y * this.y);
        },
        enumerable: true,
        configurable: true
    });
    Vector.fromPoints = function (begin, end) {
        return new Vector(end.x - begin.x, end.y - begin.y);
    };
    Vector.fromSegment = function (segment) {
        return new Vector(segment.endPoint.x - segment.startPoint.x, segment.endPoint.y - segment.startPoint.y);
    };
    Vector.prototype.normalize = function () {
        var length = this.length;
        if (length !== 0) {
            this.x /= length;
            this.y /= length;
        }
        return this;
    };
    Vector.prototype.negative = function () {
        this.x *= -1;
        this.y *= -1;
        return this;
    };
    Object.defineProperty(Vector, "axisX", {
        get: function () {
            return new Vector(1, 0);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Vector, "axisY", {
        get: function () {
            return new Vector(0, 1);
        },
        enumerable: true,
        configurable: true
    });
    Vector.angleBetween = function (a, b) {
        var cosFi = Vector.scalarProduct(a, b) / (a.length * b.length);
        return Math.acos(cosFi);
    };
    Vector.scalarProduct = function (a, b) {
        return a.x * b.x + a.y * b.y;
    };
    return Vector;
}());
exports.Vector = Vector;
