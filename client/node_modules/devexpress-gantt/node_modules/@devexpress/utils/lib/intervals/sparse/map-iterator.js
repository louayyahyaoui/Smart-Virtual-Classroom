"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var intervals_1 = require("./intervals");
var SparseIntervalsMapIterator = (function () {
    function SparseIntervalsMapIterator(intervals, valMap) {
        this.sparseIntervals = new intervals_1.SparseIntervals(intervals);
        this.valMap = valMap;
        this.intervalIndex = -1;
    }
    Object.defineProperty(SparseIntervalsMapIterator.prototype, "numIntervals", {
        get: function () {
            return this.sparseIntervals.numIntervals;
        },
        enumerable: true,
        configurable: true
    });
    SparseIntervalsMapIterator.prototype.moveToNextPosition = function () {
        if (this.interval && this.posInInterval + 1 < this.interval.length) {
            this.posInInterval++;
            this.position++;
            return true;
        }
        return this.moveToNextInterval();
    };
    SparseIntervalsMapIterator.prototype.moveToNextInterval = function () {
        if (this.intervalIndex + 1 < this.sparseIntervals.numIntervals) {
            this.intervalIndex++;
            this.interval = this.sparseIntervals.getInterval(this.intervalIndex);
            this.posInInterval = 0;
            this.position = this.interval.start;
            this.object = this.valMap[this.position];
            return true;
        }
        return false;
    };
    return SparseIntervalsMapIterator;
}());
exports.SparseIntervalsMapIterator = SparseIntervalsMapIterator;
