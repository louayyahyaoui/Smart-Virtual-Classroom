"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var EnumUtils = (function () {
    function EnumUtils() {
    }
    EnumUtils.forEach = function (enumObject, callback) {
        for (var key in enumObject) {
            if (!Object.prototype.hasOwnProperty.call(enumObject, key))
                continue;
            var keyNum = parseInt(key);
            if (!isNaN(keyNum))
                callback(keyNum);
        }
    };
    EnumUtils.isAnyOf = function (value) {
        var params = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            params[_i - 1] = arguments[_i];
        }
        for (var _a = 0, params_1 = params; _a < params_1.length; _a++) {
            var param = params_1[_a];
            if (value === param)
                return true;
        }
        return false;
    };
    return EnumUtils;
}());
exports.EnumUtils = EnumUtils;
