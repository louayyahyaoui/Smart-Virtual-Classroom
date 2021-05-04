"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Point = (function () {
    function Point(x, y) {
        this.x = x;
        this.y = y;
    }
    Point.zero = function () {
        return new Point(0, 0);
    };
    Point.fromNumber = function (num) {
        return new Point(num, num);
    };
    Point.prototype.isZero = function () {
        return this.x === 0 && this.y === 0;
    };
    Point.prototype.toString = function () {
        return JSON.stringify(this);
    };
    Point.prototype.copyFrom = function (obj) {
        this.x = obj.x;
        this.y = obj.y;
    };
    Point.prototype.clone = function () {
        return new Point(this.x, this.y);
    };
    Point.prototype.equals = function (obj) {
        return this.x === obj.x && this.y === obj.y;
    };
    Point.prototype.offset = function (offsetX, offsetY) {
        this.x += offsetX;
        this.y += offsetY;
        return this;
    };
    Point.prototype.offsetByPoint = function (offset) {
        this.x += offset.x;
        this.y += offset.y;
        return this;
    };
    Point.prototype.multiply = function (multiplierX, multiplierY) {
        this.x *= multiplierX;
        this.y *= multiplierY;
        return this;
    };
    Point.prototype.negative = function () {
        this.x *= -1;
        this.y *= -1;
        return this;
    };
    Point.prototype.applyConverter = function (converter) {
        this.x = converter(this.x);
        this.y = converter(this.y);
        return this;
    };
    Point.plus = function (a, b) {
        return new Point(a.x + b.x, a.y + b.y);
    };
    Point.minus = function (a, b) {
        return new Point(a.x - b.x, a.y - b.y);
    };
    Point.xComparer = function (a, b) {
        return a.x - b.x;
    };
    Point.yComparer = function (a, b) {
        return a.y - b.y;
    };
    Point.equals = function (a, b) {
        return a.x === b.x && a.y === b.y;
    };
    return Point;
}());
exports.Point = Point;
