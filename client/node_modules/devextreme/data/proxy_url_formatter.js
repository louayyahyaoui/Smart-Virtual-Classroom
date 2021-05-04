/**
 * DevExtreme (data/proxy_url_formatter.js)
 * Version: 20.2.6
 * Build date: Tue Mar 16 2021
 *
 * Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
exports.default = void 0;
var _iterator = require("../core/utils/iterator");
var _dom_adapter = _interopRequireDefault(require("../core/dom_adapter"));
var _window = require("../core/utils/window");
var _call_once = _interopRequireDefault(require("../core/utils/call_once"));

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        "default": obj
    }
}
var window = (0, _window.getWindow)();
var DXPROXY_HOST = "dxproxy.devexpress.com:8000";
var urlMapping = {};
var getUrlParser = (0, _call_once.default)(function() {
    var a = _dom_adapter.default.createElement("a");
    var props = ["protocol", "hostname", "port", "pathname", "search", "hash"];
    var normalizePath = function(value) {
        if ("/" !== value.charAt(0)) {
            value = "/" + value
        }
        return value
    };
    return function(url) {
        a.href = url;
        var result = {};
        (0, _iterator.each)(props, function() {
            result[this] = a[this]
        });
        result.pathname = normalizePath(result.pathname);
        return result
    }
});
var parseUrl = function(url) {
    var urlParser = getUrlParser();
    return urlParser(url)
};
var extractProxyAppId = function() {
    return window.location.pathname.split("/")[1]
};
var _default = {
    parseUrl: parseUrl,
    isProxyUsed: function() {
        return window.location.host === DXPROXY_HOST
    },
    formatProxyUrl: function(localUrl) {
        var urlData = parseUrl(localUrl);
        if (!/^(localhost$|127\.)/i.test(urlData.hostname)) {
            return localUrl
        }
        var proxyUrlPart = DXPROXY_HOST + "/" + extractProxyAppId() + "_" + urlData.port;
        urlMapping[proxyUrlPart] = urlData.hostname + ":" + urlData.port;
        var resultUrl = "http://" + proxyUrlPart + urlData.pathname + urlData.search;
        return resultUrl
    },
    formatLocalUrl: function(proxyUrl) {
        if (proxyUrl.indexOf(DXPROXY_HOST) < 0) {
            return proxyUrl
        }
        var resultUrl = proxyUrl;
        for (var proxyUrlPart in urlMapping) {
            if (Object.prototype.hasOwnProperty.call(urlMapping, proxyUrlPart)) {
                if (proxyUrl.indexOf(proxyUrlPart) >= 0) {
                    resultUrl = proxyUrl.replace(proxyUrlPart, urlMapping[proxyUrlPart]);
                    break
                }
            }
        }
        return resultUrl
    }
};
exports.default = _default;
module.exports = exports.default;
