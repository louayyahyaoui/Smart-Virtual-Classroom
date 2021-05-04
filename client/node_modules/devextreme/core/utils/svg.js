/**
 * DevExtreme (core/utils/svg.js)
 * Version: 20.2.6
 * Build date: Tue Mar 16 2021
 *
 * Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
exports.getSvgMarkup = getSvgMarkup;
exports.getSvgElement = getSvgElement;
var _dom_adapter = _interopRequireDefault(require("../../core/dom_adapter"));
var _window = require("./window");
var _renderer = _interopRequireDefault(require("../../core/renderer"));

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        "default": obj
    }
}
var window = (0, _window.getWindow)();

function getMarkup(element, backgroundColor) {
    var temp = _dom_adapter.default.createElement("div");
    var clone = element.cloneNode(true);
    if (backgroundColor) {
        (0, _renderer.default)(clone).css("backgroundColor", backgroundColor)
    }
    temp.appendChild(clone);
    return temp.innerHTML
}

function fixNamespaces(markup) {
    var first = true;
    if (markup.indexOf("xmlns:xlink") === -1) {
        markup = markup.replace("<svg", '<svg xmlns:xlink="http://www.w3.org/1999/xlink"')
    }
    markup = markup.replace(/xmlns="[\s\S]*?"/gi, function(match) {
        if (!first) {
            return ""
        }
        first = false;
        return match
    });
    return markup.replace(/xmlns:NS1="[\s\S]*?"/gi, "").replace(/NS1:xmlns:xlink="([\s\S]*?)"/gi, 'xmlns:xlink="$1"')
}

function decodeHtmlEntities(markup) {
    return markup.replace(/&quot;/gi, "&#34;").replace(/&amp;/gi, "&#38;").replace(/&apos;/gi, "&#39;").replace(/&lt;/gi, "&#60;").replace(/&gt;/gi, "&#62;").replace(/&nbsp;/gi, "&#160;").replace(/&shy;/gi, "&#173;")
}

function getSvgMarkup(element, backgroundColor) {
    return fixNamespaces(decodeHtmlEntities(getMarkup(element, backgroundColor)))
}

function getSvgElement(markup) {
    return _dom_adapter.default.isNode(markup) ? markup : (new window.DOMParser).parseFromString(markup, "image/svg+xml").childNodes[0]
}
