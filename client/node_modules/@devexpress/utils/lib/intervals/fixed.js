"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var mutable_1 = require("./mutable");
var FixedInterval = (function (_super) {
    tslib_1.__extends(FixedInterval, _super);
    function FixedInterval(start, length) {
        var _this = _super.call(this) || this;
        _this.start = start;
        _this.length = length;
        return _this;
    }
    Object.defineProperty(FixedInterval.prototype, "end", {
        get: function () {
            return this.start + this.length;
        },
        set: function (newEnd) {
            this.length = newEnd - this.start;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FixedInterval.prototype, "center", {
        get: function () {
            return this.start + this.length / 2;
        },
        enumerable: true,
        configurable: true
    });
    FixedInterval.prototype.copyFrom = function (obj) {
        this.start = obj.start;
        this.length = obj.length;
    };
    FixedInterval.prototype.equals = function (obj) {
        return obj && this.start === obj.start && this.length === obj.length;
    };
    FixedInterval.prototype.clone = function () {
        return new FixedInterval(this.start, this.length);
    };
    FixedInterval.prototype.makeByStartEnd = function (start, end) {
        return new FixedInterval(start, end - start);
    };
    FixedInterval.prototype.makeByStartLength = function (start, length) {
        return new FixedInterval(start, length);
    };
    FixedInterval.prototype.makeByLengthEnd = function (length, end) {
        return new FixedInterval(end - length, length);
    };
    FixedInterval.fromPositions = function (start, end) {
        return new FixedInterval(start, end - start);
    };
    FixedInterval.makeByConstInterval = function (interval) {
        return new FixedInterval(interval.start, interval.length);
    };
    FixedInterval.prototype.expand = function (interval) {
        var end = Math.max(interval.end, this.end);
        this.start = Math.min(interval.start, this.start);
        this.end = end;
        return this;
    };
    return FixedInterval;
}(mutable_1.MutableInterval));
exports.FixedInterval = FixedInterval;
