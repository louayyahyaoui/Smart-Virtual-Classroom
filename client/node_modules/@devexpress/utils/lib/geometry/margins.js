"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var offsets_1 = require("./offsets");
var Margins = (function (_super) {
    tslib_1.__extends(Margins, _super);
    function Margins() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Margins.empty = function () {
        return new Margins(0, 0, 0, 0);
    };
    Margins.prototype.clone = function () {
        return new Margins(this.left, this.right, this.top, this.bottom);
    };
    return Margins;
}(offsets_1.Offsets));
exports.Margins = Margins;
