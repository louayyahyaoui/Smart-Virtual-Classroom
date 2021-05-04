"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var SparseIntervalsIterator = (function () {
    function SparseIntervalsIterator(sparseIntervals) {
        this.sparseIntervals = sparseIntervals;
        this.intervalIndex = -1;
    }
    Object.defineProperty(SparseIntervalsIterator.prototype, "isStarted", {
        get: function () {
            return !!this.curr;
        },
        enumerable: true,
        configurable: true
    });
    SparseIntervalsIterator.prototype.moveNext = function () {
        if (this.curr && this.posInInterval + 1 < this.curr.length) {
            this.posInInterval++;
            this.index++;
            this.initObject();
            return true;
        }
        if (this.intervalIndex + 1 < this.sparseIntervals.numIntervals) {
            this.intervalIndex++;
            this.curr = this.sparseIntervals.getInterval(this.intervalIndex);
            if (!this.curr.length)
                return this.moveNext();
            this.posInInterval = 0;
            this.index = this.curr.start;
            this.initObject();
            return true;
        }
        return false;
    };
    SparseIntervalsIterator.prototype.movePrev = function () {
        if (this.curr && this.posInInterval - 1 >= this.curr.start) {
            this.posInInterval--;
            this.index--;
            this.initObject();
            return true;
        }
        if (!this.isStarted)
            this.intervalIndex = this.sparseIntervals.numIntervals;
        if (this.intervalIndex - 1 >= 0) {
            this.intervalIndex--;
            this.curr = this.sparseIntervals.getInterval(this.intervalIndex);
            this.posInInterval = Math.max(this.curr.length - 1, this.curr.start);
            this.index = this.curr.start;
            this.initObject();
            return true;
        }
        return false;
    };
    SparseIntervalsIterator.prototype.initObject = function () { };
    return SparseIntervalsIterator;
}());
exports.SparseIntervalsIterator = SparseIntervalsIterator;
