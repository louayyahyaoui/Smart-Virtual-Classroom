"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var const_1 = require("./const");
var MutableInterval = (function (_super) {
    tslib_1.__extends(MutableInterval, _super);
    function MutableInterval() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MutableInterval.prototype.normalizeLength = function () {
        if (this.length < 0)
            this.length = 0;
        return this;
    };
    return MutableInterval;
}(const_1.ConstInterval));
exports.MutableInterval = MutableInterval;
