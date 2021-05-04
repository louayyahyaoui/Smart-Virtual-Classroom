"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var intervals_1 = require("./intervals");
var SparseIntervalsCollector = (function () {
    function SparseIntervalsCollector(template) {
        this.intervals = [];
        this.template = template;
    }
    SparseIntervalsCollector.prototype.add = function (index) {
        if (this.curr && this.curr.end === index) {
            this.curr.length++;
            return;
        }
        this.curr = this.template.makeByStartLength(index, 1);
        this.intervals.push(this.curr);
    };
    SparseIntervalsCollector.prototype.getIntervals = function () {
        return new intervals_1.SparseIntervals(this.intervals);
    };
    return SparseIntervalsCollector;
}());
exports.SparseIntervalsCollector = SparseIntervalsCollector;
