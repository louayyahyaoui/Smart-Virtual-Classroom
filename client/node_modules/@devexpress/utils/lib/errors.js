"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Errors = (function () {
    function Errors() {
    }
    Errors.internalExceptionTemplate = function (str) {
        return Errors.InternalException + " " + str;
    };
    Errors.NotImplemented = 'The method is not implemented.';
    Errors.InternalException = 'Internal exception.';
    Errors.ValueCannotBeNull = 'Value cannot be null.';
    return Errors;
}());
exports.Errors = Errors;
