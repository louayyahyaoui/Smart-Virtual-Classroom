"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Stack = (function () {
    function Stack() {
        this.list = [];
        this._count = 0;
        this.last = undefined;
    }
    Stack.prototype.push = function (val) {
        this.list.push(val);
        this.last = val;
        this._count++;
    };
    Stack.prototype.pop = function () {
        this._count--;
        var result = this.list.pop();
        this.last = this.list[this.list.length - 1];
        return result;
    };
    Stack.prototype.peek = function () {
        return this.last;
    };
    Object.defineProperty(Stack.prototype, "count", {
        get: function () {
            return this._count;
        },
        enumerable: true,
        configurable: true
    });
    Stack.prototype.getPrevious = function () {
        return this.list[this._count - 2];
    };
    return Stack;
}());
exports.Stack = Stack;
