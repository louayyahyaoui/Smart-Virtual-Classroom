"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var common_1 = require("./common");
var StringSequenceComparator = (function () {
    function StringSequenceComparator(a, b) {
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
    }
    StringSequenceComparator.prototype.calculate = function () {
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
    StringSequenceComparator.prototype.toString = function () {
        var result = [];
        for (var _i = 0, _a = this.ses; _i < _a.length; _i++) {
            var elem = _a[_i];
            result.push(elem.toString());
        }
        return result.join('\n');
    };
    StringSequenceComparator.prototype.snake = function (k, p, pp) {
        var r = p > pp ?
            this.path[k - 1 + this.offset] :
            this.path[k + 1 + this.offset];
        var y = Math.max(p, pp);
        var x = y - k;
        while (x < this.m && y < this.n && this.a[x] === this.b[y]) {
            ++x;
            ++y;
        }
        var len = this.pathposi.push(new PathElem(x, y, r));
        this.path[k + this.offset] = len - 1;
        return y;
    };
    StringSequenceComparator.prototype.recordSeq = function (epc) {
        var px_idx = 0;
        var py_idx = 0;
        var addTag = this.reverse ? common_1.SesType.Delete : common_1.SesType.Add;
        var deleteTag = this.reverse ? common_1.SesType.Add : common_1.SesType.Delete;
        for (var i = epc.length - 1; i >= 0; --i) {
            var currEpc = epc[i];
            while (px_idx < currEpc.x || py_idx < currEpc.y) {
                var yxDiff = currEpc.y - currEpc.x;
                var pypxDiff = py_idx - px_idx;
                if (yxDiff > pypxDiff) {
                    this.ses.push(new StringSesElem(this.b[py_idx], addTag));
                    ++py_idx;
                }
                else if (yxDiff < pypxDiff) {
                    this.ses.push(new StringSesElem(this.a[px_idx], deleteTag));
                    ++px_idx;
                }
                else {
                    this.ses.push(new StringSesElem(this.a[px_idx], common_1.SesType.Common));
                    this.lcs += this.a[px_idx];
                    ++px_idx;
                    ++py_idx;
                }
            }
        }
    };
    return StringSequenceComparator;
}());
exports.StringSequenceComparator = StringSequenceComparator;
var PathElem = (function () {
    function PathElem(x, y, k) {
        this.x = x;
        this.y = y;
        this.k = k;
    }
    return PathElem;
}());
var StringSesElem = (function () {
    function StringSesElem(elem, type) {
        this.elem = elem;
        this.type = type;
    }
    StringSesElem.prototype.toString = function () {
        var sign;
        switch (this.type) {
            case common_1.SesType.Add:
                sign = '+';
                break;
            case common_1.SesType.Delete:
                sign = '-';
                break;
            case common_1.SesType.Common:
                sign = ' ';
                break;
        }
        return sign + this.elem;
    };
    return StringSesElem;
}());
exports.StringSesElem = StringSesElem;
var StringSequenceComparatorItertor = (function () {
    function StringSequenceComparatorItertor(str) {
        this.str = str;
    }
    Object.defineProperty(StringSequenceComparatorItertor.prototype, "length", {
        get: function () {
            return this.str.length;
        },
        enumerable: true,
        configurable: true
    });
    StringSequenceComparatorItertor.prototype.getComparer = function () {
        return function (a, b) { return a === b; };
    };
    StringSequenceComparatorItertor.prototype.getByIndex = function (index) {
        return this.str[index];
    };
    return StringSequenceComparatorItertor;
}());
exports.StringSequenceComparatorItertor = StringSequenceComparatorItertor;
