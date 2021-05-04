"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var browser_1 = require("../browser");
var DataTransferUtils = (function () {
    function DataTransferUtils() {
    }
    DataTransferUtils.isBrowserSupportExtendedClientBuffer = function () {
        return browser_1.Browser.WebKitFamily || (browser_1.Browser.Firefox && browser_1.Browser.MajorVersion >= 50) || (browser_1.Browser.Edge && browser_1.Browser.MajorVersion >= 14);
    };
    DataTransferUtils.getPlainTextItem = function (items) {
        return DataTransferUtils.getTransferItemByType(items, 'text/plain');
    };
    DataTransferUtils.getRtfTextItem = function (items) {
        return DataTransferUtils.getTransferItemByType(items, 'text/rtf');
    };
    DataTransferUtils.getImageItem = function (items) {
        var len = items.length;
        while (len--) {
            if (items[len].type.indexOf('image') >= 0)
                return items[len].getAsFile();
        }
        return null;
    };
    DataTransferUtils.getTransferItemByType = function (items, type) {
        if (this.isBrowserSupportExtendedClientBuffer()) {
            var len = items.length;
            while (len--) {
                var item = items[len];
                if (item.type.indexOf(type) >= 0)
                    return item;
            }
        }
        return null;
    };
    return DataTransferUtils;
}());
exports.DataTransferUtils = DataTransferUtils;
