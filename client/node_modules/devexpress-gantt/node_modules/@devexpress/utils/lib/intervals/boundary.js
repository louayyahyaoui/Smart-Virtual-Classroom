"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var mutable_1 = require("./mutable");
var BoundaryInterval = (function (_super) {
    tslib_1.__extends(BoundaryInterval, _super);
    function BoundaryInterval(start, end) {
        var _this = _super.call(this) || this;
        _this.start = start;
        _this.end = end;
        return _this;
    }
    Object.defineProperty(BoundaryInterval.prototype, "length", {
        get: function () {
            return this.end - this.start;
        },
        set: function (newLength) {
            this.end = this.start + newLength;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BoundaryInterval.prototype, "center", {
        get: function () {
            return (this.start + this.end) / 2;
        },
        enumerable: true,
        configurable: true
    });
    BoundaryInterval.normalized = function (pointA, pointB) {
        return pointA > pointB ?
            new BoundaryInterval(pointB, pointA) :
            new BoundaryInterval(pointA, pointB);
    };
    BoundaryInterval.prototype.copyFrom = function (obj) {
        this.start = obj.start;
        this.end = obj.end;
    };
    BoundaryInterval.prototype.equals = function (obj) {
        return obj && this.start === obj.start && this.end === obj.end;
    };
    BoundaryInterval.prototype.clone = function () {
        return new BoundaryInterval(this.start, this.length);
    };
    BoundaryInterval.prototype.makeByStartEnd = function (start, end) {
        return new BoundaryInterval(start, end);
    };
    BoundaryInterval.prototype.makeByStartLength = function (start, length) {
        return new BoundaryInterval(start, start + length);
    };
    BoundaryInterval.prototype.makeByLengthEnd = function (length, end) {
        return new BoundaryInterval(end - length, end);
    };
    BoundaryInterval.makeByConstInterval = function (interval) {
        return new BoundaryInterval(interval.start, interval.end);
    };
    BoundaryInterval.prototype.expand = function (interval) {
        this.start = Math.min(interval.start, this.start);
        this.end = Math.max(interval.end, this.end);
        return this;
    };
    return BoundaryInterval;
}(mutable_1.MutableInterval));
exports.BoundaryInterval = BoundaryInterval;
