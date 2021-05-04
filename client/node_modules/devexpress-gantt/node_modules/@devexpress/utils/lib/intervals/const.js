"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ConstInterval = (function () {
    function ConstInterval() {
    }
    Object.defineProperty(ConstInterval.prototype, "center", {
        get: function () {
            return this.start + (this.length / 2);
        },
        enumerable: true,
        configurable: true
    });
    ConstInterval.prototype.isNormalized = function () {
        return this.end >= this.start;
    };
    ConstInterval.prototype.isCollapsed = function () {
        return this.length === 0;
    };
    ConstInterval.prototype.equals = function (obj) {
        return this.start === obj.start && this.end === obj.end;
    };
    ConstInterval.isCollapsed = function (intervals) {
        return !intervals[1] && intervals[0].isCollapsed();
    };
    ConstInterval.prototype.containsInterval = function (interval) {
        return this.start <= interval.start && this.end >= interval.end;
    };
    ConstInterval.prototype.containsIntervalWithoutEnd = function (interval) {
        return this.start <= interval.start && this.end > interval.end;
    };
    ConstInterval.prototype.contains = function (pos) {
        return this.start <= pos && pos < this.end;
    };
    ConstInterval.prototype.containsWithIntervalEnd = function (val) {
        return this.start <= val && val <= this.end;
    };
    ConstInterval.prototype.containsWithoutIntervalEndAndStart = function (pos) {
        return this.start < pos && pos < this.end;
    };
    return ConstInterval;
}());
exports.ConstInterval = ConstInterval;
