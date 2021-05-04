"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var browser_1 = require("../browser");
var PopupUtils = (function () {
    function PopupUtils() {
    }
    PopupUtils.preventContextMenu = function (evt) {
        evt === null || evt === void 0 ? void 0 : evt.stopPropagation();
        evt === null || evt === void 0 ? void 0 : evt.preventDefault();
        if (browser_1.Browser.WebKitFamily)
            evt.returnValue = false;
    };
    return PopupUtils;
}());
exports.PopupUtils = PopupUtils;
