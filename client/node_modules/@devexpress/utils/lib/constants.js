"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Constants = (function () {
    function Constants() {
    }
    Constants.MIN_SAFE_INTEGER = -(Math.pow(2, 53) - 1);
    Constants.MAX_SAFE_INTEGER = (Math.pow(2, 53) - 1);
    Constants.MAX_BYTE = Math.pow(2, 8) - 1;
    return Constants;
}());
exports.Constants = Constants;
var Int32Constants = (function () {
    function Int32Constants() {
    }
    Int32Constants.MIN_VALUE = -2147483648;
    Int32Constants.MAX_VALUE = 2147483647;
    return Int32Constants;
}());
exports.Int32Constants = Int32Constants;
