"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Offsets = (function () {
    function Offsets(left, right, top, bottom) {
        this.left = left;
        this.right = right;
        this.top = top;
        this.bottom = bottom;
    }
    Offsets.empty = function () {
        return new Offsets(0, 0, 0, 0);
    };
    Object.defineProperty(Offsets.prototype, "horizontal", {
        get: function () {
            return this.left + this.right;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Offsets.prototype, "vertical", {
        get: function () {
            return this.top + this.bottom;
        },
        enumerable: true,
        configurable: true
    });
    Offsets.fromNumber = function (offset) {
        return new Offsets(offset, offset, offset, offset);
    };
    Offsets.fromOffsets = function (offsets) {
        return new Offsets(offsets.left, offsets.right, offsets.top, offsets.bottom);
    };
    Offsets.fromSide = function (horizontal, vertical) {
        return new Offsets(horizontal, horizontal, vertical, vertical);
    };
    Offsets.prototype.normalize = function () {
        this.left = Math.max(0, this.left);
        this.right = Math.max(0, this.right);
        this.top = Math.max(0, this.top);
        this.bottom = Math.max(0, this.bottom);
        return this;
    };
    Offsets.prototype.toString = function () {
        return JSON.stringify(this);
    };
    Offsets.prototype.isEmpty = function () {
        return this.left === 0 && this.right === 0 && this.top === 0 && this.bottom === 0;
    };
    Offsets.prototype.offset = function (offset) {
        this.left += offset.left;
        this.right += offset.right;
        this.top += offset.top;
        this.bottom += offset.bottom;
        return this;
    };
    Offsets.prototype.multiply = function (multLeft, multRight, multTop, multBottom) {
        switch (arguments.length) {
            case 1: {
                this.left *= multLeft;
                this.right *= multLeft;
                this.top *= multLeft;
                this.bottom *= multLeft;
                return this;
            }
            case 2: {
                this.left *= multLeft;
                this.right *= multLeft;
                this.top *= multRight;
                this.bottom *= multRight;
                return this;
            }
            case 4: {
                this.left *= multLeft;
                this.right *= multRight;
                this.top *= multTop;
                this.bottom *= multBottom;
                return this;
            }
        }
        return this;
    };
    Offsets.prototype.clone = function () {
        return new Offsets(this.left, this.right, this.top, this.bottom);
    };
    Offsets.prototype.copyFrom = function (obj) {
        this.left = obj.left;
        this.right = obj.right;
        this.top = obj.top;
        this.bottom = obj.bottom;
    };
    Offsets.prototype.equals = function (obj) {
        return this.top === obj.top &&
            this.bottom === obj.bottom &&
            this.right === obj.right &&
            this.left === obj.left;
    };
    Offsets.prototype.applyConverter = function (converter) {
        this.left = converter(this.left);
        this.right = converter(this.right);
        this.top = converter(this.top);
        this.bottom = converter(this.bottom);
        return this;
    };
    return Offsets;
}());
exports.Offsets = Offsets;
