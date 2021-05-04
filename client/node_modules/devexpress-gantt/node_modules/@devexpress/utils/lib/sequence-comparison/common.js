"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var SesType;
(function (SesType) {
    SesType[SesType["Delete"] = -1] = "Delete";
    SesType[SesType["Common"] = 0] = "Common";
    SesType[SesType["Add"] = 1] = "Add";
})(SesType = exports.SesType || (exports.SesType = {}));
var SesElem = (function () {
    function SesElem(elem, type) {
        this.elem = elem;
        this.type = type;
    }
    SesElem.prototype.toString = function () {
        var sign;
        switch (this.type) {
            case SesType.Add:
                sign = '+';
                break;
            case SesType.Delete:
                sign = '-';
                break;
            case SesType.Common:
                sign = ' ';
                break;
        }
        return sign + this.elem.toString();
    };
    return SesElem;
}());
exports.SesElem = SesElem;
var SequenceComparator = (function () {
    function SequenceComparator(a, b) {
        this.editDistance = null;
        this.lcs = '';
        this.ses = [];
        this.path = [];
        this.pathposi = [];
        this.a = a;
        this.b = b;
        this.m = this.a.length;
        this.n = this.b.length;
        this.reverse = this.m > this.n;
        if (this.reverse) {
            var tmpA = this.a;
            this.a = this.b;
            this.b = tmpA;
            var tmpM = this.m;
            this.m = this.n;
            this.n = tmpM;
        }
        this.offset = this.m + 1;
        this.comparer = this.a.getComparer();
    }
    SequenceComparator.prototype.calculate = function () {
        var size = this.m + this.n + 3;
        var fp = {};
        for (var i = 0; i < size; ++i) {
            fp[i] = -1;
            this.path[i] = -1;
        }
        var delta = this.n - this.m;
        var p = -1;
        do {
            ++p;
            for (var k = -p; k <= delta - 1; ++k)
                fp[k + this.offset] = this.snake(k, fp[k - 1 + this.offset] + 1, fp[k + 1 + this.offset]);
            for (var k = delta + p; k >= delta + 1; --k)
                fp[k + this.offset] = this.snake(k, fp[k - 1 + this.offset] + 1, fp[k + 1 + this.offset]);
            fp[delta + this.offset] = this.snake(delta, fp[delta - 1 + this.offset] + 1, fp[delta + 1 + this.offset]);
        } while (fp[delta + this.offset] !== this.n);
        this.editDistance = delta + 2 * p;
        var r = this.path[delta + this.offset];
        var epc = [];
        while (r !== -1) {
            var pos = this.pathposi[r];
            epc.push(new PathElem(pos.x, pos.y, null));
            r = pos.k;
        }
        this.recordSeq(epc);
        return this.ses;
    };
    SequenceComparator.prototype.toString = function () {
        var result = [];
        for (var _i = 0, _a = this.ses; _i < _a.length; _i++) {
            var elem = _a[_i];
            result.push(elem.toString());
        }
        return result.join('\n');
    };
    SequenceComparator.prototype.snake = function (k, p, pp) {
        var r = p > pp ?
            this.path[k - 1 + this.offset] :
            this.path[k + 1 + this.offset];
        var y = Math.max(p, pp);
        var x = y - k;
        while (x < this.m && y < this.n && this.comparer(this.a.getByIndex(x), this.b.getByIndex(y))) {
            ++x;
            ++y;
        }
        var len = this.pathposi.push(new PathElem(x, y, r));
        this.path[k + this.offset] = len - 1;
        return y;
    };
    SequenceComparator.prototype.recordSeq = function (epc) {
        var px_idx = 0;
        var py_idx = 0;
        var addTag = this.reverse ? SesType.Delete : SesType.Add;
        var deleteTag = this.reverse ? SesType.Add : SesType.Delete;
        for (var i = epc.length - 1; i >= 0; --i) {
            var currEpc = epc[i];
            while (px_idx < currEpc.x || py_idx < currEpc.y) {
                var yxDiff = currEpc.y - currEpc.x;
                var pypxDiff = py_idx - px_idx;
                if (yxDiff > pypxDiff) {
                    this.ses.push(new SesElem(this.b.getByIndex(py_idx), addTag));
                    ++py_idx;
                }
                else if (yxDiff < pypxDiff) {
                    this.ses.push(new SesElem(this.a.getByIndex(px_idx), deleteTag));
                    ++px_idx;
                }
                else {
                    this.ses.push(new SesElem(this.a.getByIndex(px_idx), SesType.Common));
                    this.lcs += this.a.getByIndex(px_idx);
                    ++px_idx;
                    ++py_idx;
                }
            }
        }
    };
    return SequenceComparator;
}());
exports.SequenceComparator = SequenceComparator;
var PathElem = (function () {
    function PathElem(x, y, k) {
        this.x = x;
        this.y = y;
        this.k = k;
    }
    return PathElem;
}());
