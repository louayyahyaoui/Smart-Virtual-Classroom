"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var date_1 = require("./date");
var number_1 = require("./number");
var string_1 = require("./string");
var SimpleFormattersManager = (function () {
    function SimpleFormattersManager(options) {
        this.options = options;
        this.dateFormatter = new date_1.DateFormatter(options);
        this.numberFormatter = new number_1.NumberFormatter(options);
        this.stringFormatter = new string_1.StringFormatter(this.dateFormatter, this.numberFormatter);
    }
    SimpleFormattersManager.prototype.formatString = function (pattern) {
        var _a;
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        return (_a = this.stringFormatter).format.apply(_a, tslib_1.__spreadArrays([pattern], args));
    };
    SimpleFormattersManager.prototype.formatDate = function (format, date) {
        this.dateFormatter.setFormatString(format);
        return this.dateFormatter.format(date);
    };
    SimpleFormattersManager.prototype.formatNumber = function (format, value) {
        return this.numberFormatter.format(format, value);
    };
    return SimpleFormattersManager;
}());
exports.SimpleFormattersManager = SimpleFormattersManager;
