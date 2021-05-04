"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var browser_1 = require("../browser");
var base64_1 = require("./base64");
var common_1 = require("./common");
var FileUtils = (function () {
    function FileUtils() {
    }
    FileUtils.loadJavascriptFile = function (srcUri, callback) {
        var _a;
        var headElem = document.getElementsByTagName('head')[0];
        if (!headElem) {
            headElem = document.createElement('head');
            var bodyElem = document.getElementsByTagName('body')[0];
            (_a = bodyElem.parentNode) === null || _a === void 0 ? void 0 : _a.insertBefore(headElem, bodyElem);
        }
        var scriptElem = document.createElement('script');
        scriptElem.onload = callback;
        scriptElem.src = srcUri;
        headElem.appendChild(scriptElem);
        return { htmlScriptElement: scriptElem };
    };
    FileUtils.startDownloadFileLocal = function (content, fileName) {
        if (content instanceof ArrayBuffer)
            content = base64_1.Base64Utils.fromArrayBuffer(content);
        if (common_1.isString(content))
            content = base64_1.Base64Utils.getFileFromBase64(content);
        if (window.navigator.msSaveOrOpenBlob)
            window.navigator.msSaveOrOpenBlob(content, fileName);
        else {
            var a_1 = document.createElement('a');
            var url_1 = URL.createObjectURL(content);
            a_1.href = url_1;
            a_1.download = fileName;
            document.body.appendChild(a_1);
            a_1.click();
            setTimeout(function () {
                document.body.removeChild(a_1);
                window.URL.revokeObjectURL(url_1);
            }, 0);
        }
    };
    FileUtils.createFile = function (fileBits, fileName, options) {
        var _a;
        if (browser_1.Browser.IE || browser_1.Browser.Edge && browser_1.Browser.MajorVersion < 86) {
            var blob = new Blob(fileBits, options);
            blob['lastModifiedDate'] = (_a = options === null || options === void 0 ? void 0 : options.lastModified) !== null && _a !== void 0 ? _a : Date.now();
            blob['name'] = fileName;
            return blob;
        }
        else
            return new File(fileBits, fileName, options);
    };
    FileUtils.isFile = function (file) {
        if (browser_1.Browser.IE || browser_1.Browser.Edge && browser_1.Browser.MajorVersion < 86)
            return (file instanceof File) || (file instanceof Blob && common_1.isDefined(file.name));
        else
            return file instanceof File;
    };
    return FileUtils;
}());
exports.FileUtils = FileUtils;
