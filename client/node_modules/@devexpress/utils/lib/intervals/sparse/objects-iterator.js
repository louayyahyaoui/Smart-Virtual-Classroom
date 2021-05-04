"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var iterator_1 = require("./iterator");
var SparseObjectsIterator = (function (_super) {
    tslib_1.__extends(SparseObjectsIterator, _super);
    function SparseObjectsIterator(sparseIntervals, objects) {
        var _this = _super.call(this, sparseIntervals) || this;
        _this.objects = objects;
        return _this;
    }
    SparseObjectsIterator.prototype.initObject = function () {
        this.obj = this.objects[this.index];
    };
    return SparseObjectsIterator;
}(iterator_1.SparseIntervalsIterator));
exports.SparseObjectsIterator = SparseObjectsIterator;
