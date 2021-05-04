"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var math_1 = require("../utils/math");
var point_1 = require("./point");
var LineEquation = (function () {
    function LineEquation(aParam, bParam, cParam) {
        this.aParam = aParam;
        this.bParam = bParam;
        this.cParam = cParam;
    }
    LineEquation.prototype.equals = function (obj) {
        return this.aParam === obj.aParam &&
            this.bParam === obj.bParam &&
            this.cParam === obj.cParam;
    };
    LineEquation.prototype.getIntersection = function (equation) {
        return LineEquation.getIntersection(this, equation);
    };
    LineEquation.fromPoints = function (pointA, pointB) {
        return new LineEquation(pointB.y - pointA.y, pointA.x - pointB.x, pointB.x * pointA.y - pointA.x * pointB.y);
    };
    LineEquation.getIntersection = function (a, b) {
        var A1 = a.aParam;
        var B1 = a.bParam;
        var C1 = a.cParam;
        var A2 = b.aParam;
        var B2 = b.bParam;
        var C2 = b.cParam;
        var v = A2 * B1 - A1 * B2;
        if (math_1.MathUtils.numberCloseTo(v, 0))
            return null;
        if (A1 === 0) {
            var x = (B2 * C1 - C2 * B1) / (B1 * A2);
            return new point_1.Point(x, -C1 / B1);
        }
        var y = (C2 * A1 - C1 * A2) / v;
        return new point_1.Point((-B1 * y - C1) / A1, y);
    };
    LineEquation.equals = function (a, b) {
        return a.aParam === b.bParam &&
            a.bParam === b.bParam &&
            a.cParam === b.cParam;
    };
    return LineEquation;
}());
exports.LineEquation = LineEquation;
