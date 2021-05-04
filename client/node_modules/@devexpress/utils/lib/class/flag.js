"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Flag = (function () {
    function Flag(initValue) {
        if (initValue === void 0) { initValue = 0; }
        this.value = initValue;
    }
    Flag.prototype.get = function (enumVal) {
        return (this.value & enumVal) === enumVal;
    };
    Flag.prototype.set = function (enumVal, newValue) {
        var currVal = (this.value & enumVal) === enumVal;
        if (currVal !== newValue) {
            if (newValue)
                this.value |= enumVal;
            else
                this.value ^= enumVal;
        }
        return this;
    };
    Flag.prototype.add = function (value) {
        this.value |= value;
    };
    Flag.prototype.anyOf = function () {
        var flags = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            flags[_i] = arguments[_i];
        }
        for (var _a = 0, flags_1 = flags; _a < flags_1.length; _a++) {
            var flag = flags_1[_a];
            if ((this.value & flag) === flag)
                return true;
        }
        return false;
    };
    Flag.prototype.getValue = function () {
        return this.value;
    };
    Flag.prototype.clone = function () {
        return new Flag(this.value);
    };
    return Flag;
}());
exports.Flag = Flag;
