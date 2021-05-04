"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Initializer = (function () {
    function Initializer() {
    }
    Initializer.prototype.set = function (property, value) {
        this[property] = value;
        return this;
    };
    return Initializer;
}());
exports.Initializer = Initializer;
function Initialize(options) {
    var set = function (property, value) {
        options[property] = value;
        return {
            set: set,
            result: options
        };
    };
    return {
        set: set,
        result: options
    };
}
exports.Initialize = Initialize;
