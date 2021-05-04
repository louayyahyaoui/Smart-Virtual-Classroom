"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var file_1 = require("./file");
var mime_type_1 = require("./mime-type");
var Base64Utils = (function () {
    function Base64Utils() {
    }
    Base64Utils.normalizeToDataUrl = function (base64, mimeType) {
        if (!Base64Utils.checkPrependDataUrl(base64))
            base64 = Base64Utils.prependByDataUrl(base64, mimeType);
        return base64;
    };
    Base64Utils.prependByDataUrl = function (base64, mimeType) {
        return "data:" + mimeType + ";base64," + base64;
    };
    Base64Utils.checkPrependDataUrl = function (base64) {
        return Base64Utils.dataUrl.test(base64);
    };
    Base64Utils.deleteDataUrlPrefix = function (base64DataUrl) {
        return base64DataUrl.replace(Base64Utils.dataUrl, '');
    };
    Base64Utils.getUint8Array = function (base64) {
        base64 = atob(base64);
        var n = base64.length;
        var arr = new Uint8Array(n);
        while (n--)
            arr[n] = base64.charCodeAt(n);
        return arr;
    };
    Base64Utils.fromArrayBuffer = function (buffer) {
        var binary = [];
        var bytes = new Uint8Array(buffer);
        var len = bytes.byteLength;
        for (var i = 0; i < len; i++)
            binary.push(String.fromCharCode(bytes[i]));
        return window.btoa(binary.join(''));
    };
    Base64Utils.getFileFromBase64 = function (base64, fileName, options) {
        if (fileName === void 0) { fileName = ''; }
        var data = Base64Utils.getUint8Array(base64);
        return file_1.FileUtils.createFile([data], fileName, options);
    };
    Base64Utils.getMimeTypeAsString = function (base64) {
        var match = base64.match(Base64Utils.dataUrl);
        return match ? match[1] : null;
    };
    Base64Utils.getKnownMimeType = function (base64) {
        var match = base64.match(Base64Utils.dataUrl);
        return match ? mime_type_1.MimeTypeUtils.stringTypeToType(match[1]) : mime_type_1.DxMimeType.Unknown;
    };
    Base64Utils.fromBlobAsArrayBuffer = function (blob, callback) {
        var reader = new FileReader();
        reader.onloadend = function () { return callback(Base64Utils.fromArrayBuffer(reader.result)); };
        reader.readAsArrayBuffer(blob);
    };
    Base64Utils.fromBlobAsDataUrl = function (blob, callback) {
        var reader = new FileReader();
        reader.onloadend = function () { return callback(reader.result); };
        reader.readAsDataURL(blob);
    };
    Base64Utils.dataUrl = /^data:(.*?)(;(.*?))??(;base64)?,/;
    return Base64Utils;
}());
exports.Base64Utils = Base64Utils;
