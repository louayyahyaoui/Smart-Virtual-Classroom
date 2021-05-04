"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var browser_1 = require("../browser");
var PdfPluginHelper = (function () {
    function PdfPluginHelper() {
    }
    PdfPluginHelper.isInstalled = function () {
        return !!PdfPluginHelper.getPdfPlugin();
    };
    PdfPluginHelper.getPdfPlugin = function () {
        if (!PdfPluginHelper.plugin) {
            PdfPluginHelper.plugin = browser_1.Browser.IE ?
                PdfPluginHelper.getActiveXObject('AcroPDF.PDF') || PdfPluginHelper.getActiveXObject('PDF.PdfCtrl') :
                PdfPluginHelper.getNavigatorPlugin('Adobe Acrobat') || PdfPluginHelper.getNavigatorPlugin('Chrome PDF Viewer') ||
                    PdfPluginHelper.getNavigatorPlugin('WebKit built-in PDF') || PdfPluginHelper.getNavigatorPlugin('Chromium PDF Viewer');
        }
        return PdfPluginHelper.plugin;
    };
    PdfPluginHelper.getActiveXObject = function (name) {
        try {
            return new ActiveXObject(name);
        }
        catch (e) {
            return null;
        }
    };
    PdfPluginHelper.getNavigatorPlugin = function (name) {
        var plugins = navigator.plugins;
        for (var key in plugins) {
            if (!Object.prototype.hasOwnProperty.call(plugins, key))
                continue;
            var plugin = plugins[key];
            if (plugin.name === name)
                return plugin;
        }
        return null;
    };
    PdfPluginHelper.getVersion = function () {
        try {
            var plugin = PdfPluginHelper.getPdfPlugin();
            if (browser_1.Browser.IE) {
                var versions = plugin.GetVersions().split(',');
                var latest = versions[0].split('=');
                return parseFloat(latest[1]);
            }
            return plugin.version ? parseInt(plugin.version) : plugin.name;
        }
        catch (e) {
            return null;
        }
    };
    return PdfPluginHelper;
}());
exports.PdfPluginHelper = PdfPluginHelper;
