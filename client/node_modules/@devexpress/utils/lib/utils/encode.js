"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var EncodeUtils = (function () {
    function EncodeUtils() {
    }
    EncodeUtils.encodeHtml = function (text) {
        return text
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;');
    };
    EncodeUtils.decodeHtml = function (text) {
        return text
            .replace(/&amp;/g, '&')
            .replace(/&lt;/g, '<')
            .replace(/&gt;/g, '>');
    };
    EncodeUtils.prepareTextForRequest = function (text) {
        return text
            .replace(/%/g, '%25')
            .replace(/&/g, '%26amp;')
            .replace(/\+/g, '%2B')
            .replace(/</g, '%26lt;')
            .replace(/>/g, '%26gt;')
            .replace(/"/g, '%26quot;');
    };
    EncodeUtils.prepareTextForCallBackRequest = function (text) {
        return text
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;');
    };
    EncodeUtils.decodeViaTextArea = function (html) {
        var textArea = document.createElement('TEXTAREA');
        textArea.innerHTML = html;
        return textArea.value;
    };
    return EncodeUtils;
}());
exports.EncodeUtils = EncodeUtils;
