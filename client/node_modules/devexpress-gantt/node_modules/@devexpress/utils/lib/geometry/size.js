"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Size = (function () {
    function Size(width, height) {
        this.width = width;
        this.height = height;
    }
    Size.empty = function () {
        return new Size(0, 0);
    };
    Size.fromNumber = function (num) {
        return new Size(num, num);
    };
    Size.initByCommonAction = function (action) {
        var widthAdp = function (s) { return s.width; };
        var heightAdp = function (s) { return s.height; };
        return new Size(action(widthAdp, heightAdp), action(heightAdp, widthAdp));
    };
    Size.prototype.isEmpty = function () {
        return this.width === 0 && this.height === 0;
    };
    Size.prototype.toString = function () {
        return JSON.stringify(this);
    };
    Size.prototype.nonNegativeSize = function () {
        if (this.width < 0)
            this.width = 0;
        if (this.height < 0)
            this.height = 0;
        return this;
    };
    Size.prototype.offset = function (offsetWidth, offsetHeight) {
        this.width = this.width + offsetWidth;
        this.height = this.height + offsetHeight;
        return this;
    };
    Size.prototype.multiply = function (multiplierW, multiplierH) {
        this.width *= multiplierW;
        this.height *= multiplierH;
        return this;
    };
    Size.prototype.equals = function (obj) {
        return this.width === obj.width && this.height === obj.height;
    };
    Size.prototype.clone = function () {
        return new Size(this.width, this.height);
    };
    Size.prototype.copyFrom = function (obj) {
        this.width = obj.width;
        this.height = obj.height;
    };
    Size.prototype.applyConverter = function (conv) {
        this.width = conv(this.width);
        this.height = conv(this.height);
        return this;
    };
    Size.equals = function (a, b) {
        return a.width === b.width && a.height === b.height;
    };
    return Size;
}());
exports.Size = Size;
