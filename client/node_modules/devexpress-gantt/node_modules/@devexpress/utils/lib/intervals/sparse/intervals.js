"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var iterator_1 = require("./iterator");
var objects_iterator_1 = require("./objects-iterator");
var SparseIntervals = (function () {
    function SparseIntervals(list) {
        if (list === void 0) { list = []; }
        this.list = list;
        this._count = 0;
        this._numIntervals = 0;
        for (var _i = 0, list_1 = list; _i < list_1.length; _i++) {
            var curr = list_1[_i];
            this._count += curr.length;
            this._numIntervals++;
        }
    }
    Object.defineProperty(SparseIntervals.prototype, "count", {
        get: function () {
            return this._count;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SparseIntervals.prototype, "numIntervals", {
        get: function () {
            return this._numIntervals;
        },
        enumerable: true,
        configurable: true
    });
    SparseIntervals.prototype.getInterval = function (index) {
        return this.list[index];
    };
    SparseIntervals.prototype.getNativeIterator = function () {
        return new iterator_1.SparseIntervalsIterator(this);
    };
    SparseIntervals.prototype.getObjectsIterator = function (objects) {
        return new objects_iterator_1.SparseObjectsIterator(this, objects);
    };
    return SparseIntervals;
}());
exports.SparseIntervals = SparseIntervals;
