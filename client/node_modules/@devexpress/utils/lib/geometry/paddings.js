"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var offsets_1 = require("./offsets");
var Paddings = (function (_super) {
    tslib_1.__extends(Paddings, _super);
    function Paddings() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Paddings.empty = function () {
        return new Paddings(0, 0, 0, 0);
    };
    Paddings.prototype.clone = function () {
        return new Paddings(this.left, this.right, this.top, this.bottom);
    };
    return Paddings;
}(offsets_1.Offsets));
exports.Paddings = Paddings;
