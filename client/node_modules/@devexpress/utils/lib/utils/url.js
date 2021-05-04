"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var browser_1 = require("../browser");
var common_1 = require("./common");
var string_1 = require("./string");
var javascriptPrefix = 'javascript:';
var Url = (function () {
    function Url() {
    }
    Url.containsClientScript = function (url) {
        return url.toLowerCase().indexOf(javascriptPrefix) !== -1;
    };
    Url.navigate = function (url, target) {
        if (string_1.StringUtils.isNullOrEmpty(url))
            return;
        else if (Url.containsClientScript(url))
            eval(url.substr(javascriptPrefix.length));
        else {
            try {
                if (common_1.isNonNullString(target))
                    Url.navigateTo(url, target);
                else
                    location.href = url;
            }
            catch (e) {
            }
        }
    };
    Url.navigateTo = function (url, target) {
        var lowerCaseTarget = target.toLowerCase();
        if ('_top' === lowerCaseTarget)
            top.location.href = url;
        else if ('_self' === lowerCaseTarget)
            location.href = url;
        else if ('_search' === lowerCaseTarget)
            Url.openInNewWindow(url);
        else if ('_media' === lowerCaseTarget)
            Url.openInNewWindow(url);
        else if ('_parent' === lowerCaseTarget)
            window.parent.location.href = url;
        else if ('_blank' === lowerCaseTarget)
            Url.openInNewWindow(url);
        else {
            var frame = Url.getFrame(top.frames, target);
            if (frame !== null)
                frame.location.href = url;
            else
                Url.openInNewWindow(url);
        }
    };
    Url.openInNewWindow = function (url) {
        if (browser_1.Browser.Safari)
            Url.openInNewWindowViaIframe(url);
        else {
            var newWindow = window.open();
            if (newWindow) {
                newWindow.opener = null;
                newWindow.location.assign(url);
            }
        }
    };
    Url.openInNewWindowViaIframe = function (url) {
        var iframe = document.createElement('iframe');
        iframe.style.display = 'none';
        document.body.appendChild(iframe);
        var iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
        var openArgs = '"' + url + '"';
        var script = iframeDoc.createElement('script');
        script.type = 'text/javascript';
        script.text = 'window.parent = null; ' +
            'window.top = null;' +
            'window.frameElement = null;' +
            'var child = window.open(' + openArgs + ');' +
            'child.opener = null';
        iframeDoc.body.appendChild(script);
        document.body.removeChild(iframe);
    };
    Url.getFrame = function (frames, name) {
        if (frames[name])
            return frames[name];
        for (var i = 0; i < frames.length; i++) {
            try {
                var frame = frames[i];
                if (frame.name === name)
                    return frame;
                frame = Url.getFrame(frame.frames, name);
                if (frame !== null)
                    return frame;
            }
            catch (e) {
            }
        }
        return null;
    };
    return Url;
}());
exports.Url = Url;
