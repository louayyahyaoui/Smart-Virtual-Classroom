"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var map_iterator_1 = require("./map-iterator");
var SparseIntervalsMapCollector = (function () {
    function SparseIntervalsMapCollector(cmp, template) {
        this.intervals = [];
        this.valMap = {};
        this.cmp = cmp;
        this.template = template;
    }
    SparseIntervalsMapCollector.prototype.add = function (index, value) {
        if (this.curr && this.curr.end === index && this.cmp(this.currVal, value) === 0) {
            this.curr.length++;
            return;
        }
        this.curr = this.template.makeByStartLength(index, 1);
        this.intervals.push(this.curr);
        this.currVal = value;
        this.valMap[index] = value;
    };
    SparseIntervalsMapCollector.prototype.getIterator = function () {
        return new map_iterator_1.SparseIntervalsMapIterator(this.intervals, this.valMap);
    };
    return SparseIntervalsMapCollector;
}());
exports.SparseIntervalsMapCollector = SparseIntervalsMapCollector;
