"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var search_1 = require("../utils/search");
var OrderedList = (function () {
    function OrderedList(comparer) {
        this.list = [];
        this.comparer = comparer;
    }
    OrderedList.prototype.add = function (elem) {
        var _this = this;
        this.list.splice(search_1.SearchUtils.normedBinaryIndexOf(this.list, function (currElem) { return _this.comparer(currElem, elem); }) + 1, 0, elem);
        return this;
    };
    OrderedList.prototype.sort = function () {
        this.list.sort(this.comparer);
    };
    OrderedList.prototype.findIndex = function (elem) {
        var _this = this;
        var ind = search_1.SearchUtils.binaryIndexOf(this.list, function (currElem) { return _this.comparer(currElem, elem); });
        if (ind < 0)
            return -1;
        for (var prevElem = void 0; (prevElem = this.list[ind - 1]) && this.comparer(elem, prevElem) === 0; ind--)
            ;
        return ind;
    };
    OrderedList.prototype.findElement = function (elem) {
        var element = this.list[this.findIndex(elem)];
        return element === undefined ? null : element;
    };
    return OrderedList;
}());
exports.OrderedList = OrderedList;
