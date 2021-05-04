/**
 * DevExtreme (exporter/file_saver.js)
 * Version: 20.2.6
 * Build date: Tue Mar 16 2021
 *
 * Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
exports.fileSaver = exports.MIME_TYPES = void 0;
var _renderer = _interopRequireDefault(require("../core/renderer"));
var _dom_adapter = _interopRequireDefault(require("../core/dom_adapter"));
var _window = require("../core/utils/window");
var _events_engine = _interopRequireDefault(require("../events/core/events_engine"));
var _ui = _interopRequireDefault(require("../ui/widget/ui.errors"));
var _type = require("../core/utils/type");
var _console = require("../core/utils/console");

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        "default": obj
    }
}
var window = (0, _window.getWindow)();
var navigator = (0, _window.getNavigator)();
var FILE_EXTESIONS = {
    EXCEL: "xlsx",
    CSS: "css",
    PNG: "png",
    JPEG: "jpeg",
    GIF: "gif",
    SVG: "svg",
    PDF: "pdf"
};
var MIME_TYPES = {
    CSS: "text/css",
    EXCEL: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    PNG: "image/png",
    JPEG: "image/jpeg",
    GIF: "image/gif",
    SVG: "image/svg+xml",
    PDF: "application/pdf"
};
exports.MIME_TYPES = MIME_TYPES;
var fileSaver = {
    _revokeObjectURLTimeout: 3e4,
    _getDataUri: function(format, data) {
        var mimeType = this._getMimeType(format);
        return "data:".concat(mimeType, ";base64,").concat(data)
    },
    _getMimeType: function(format) {
        return MIME_TYPES[format] || "application/octet-stream"
    },
    _linkDownloader: function(fileName, href) {
        var exportLinkElement = _dom_adapter.default.createElement("a");
        exportLinkElement.download = fileName;
        exportLinkElement.href = href;
        exportLinkElement.target = "_blank";
        return exportLinkElement
    },
    _formDownloader: function(proxyUrl, fileName, contentType, data) {
        var formAttributes = {
            method: "post",
            action: proxyUrl,
            enctype: "multipart/form-data"
        };
        var exportForm = (0, _renderer.default)("<form>").css({
            display: "none"
        }).attr(formAttributes);

        function setAttributes(element, attributes) {
            for (var key in attributes) {
                element.setAttribute(key, attributes[key])
            }
            return element
        }
        exportForm.append(setAttributes(_dom_adapter.default.createElement("input"), {
            type: "hidden",
            name: "fileName",
            value: fileName
        }));
        exportForm.append(setAttributes(_dom_adapter.default.createElement("input"), {
            type: "hidden",
            name: "contentType",
            value: contentType
        }));
        exportForm.append(setAttributes(_dom_adapter.default.createElement("input"), {
            type: "hidden",
            name: "data",
            value: data
        }));
        exportForm.appendTo("body");
        _events_engine.default.trigger(exportForm, "submit");
        if (_events_engine.default.trigger(exportForm, "submit")) {
            exportForm.remove()
        }
    },
    _saveByProxy: function(proxyUrl, fileName, format, data) {
        var contentType = this._getMimeType(format);
        return this._formDownloader(proxyUrl, fileName, contentType, data)
    },
    _winJSBlobSave: function(blob, fileName, format) {
        var savePicker = new Windows.Storage.Pickers.FileSavePicker;
        savePicker.suggestedStartLocation = Windows.Storage.Pickers.PickerLocationId.documentsLibrary;
        var fileExtension = FILE_EXTESIONS[format];
        if (fileExtension) {
            var mimeType = this._getMimeType(format);
            savePicker.fileTypeChoices.insert(mimeType, ["." + fileExtension])
        }
        savePicker.suggestedFileName = fileName;
        savePicker.pickSaveFileAsync().then(function(file) {
            if (file) {
                file.openAsync(Windows.Storage.FileAccessMode.readWrite).then(function(outputStream) {
                    var inputStream = blob.msDetachStream();
                    Windows.Storage.Streams.RandomAccessStream.copyAsync(inputStream, outputStream).then(function() {
                        outputStream.flushAsync().done(function() {
                            inputStream.close();
                            outputStream.close()
                        })
                    })
                })
            }
        })
    },
    _click: function(link) {
        try {
            link.dispatchEvent(new MouseEvent("click", {
                cancelable: true
            }))
        } catch (e) {
            var event = _dom_adapter.default.getDocument().createEvent("MouseEvents");
            event.initMouseEvent("click", true, true, window, 0, 0, 0, 80, 20, false, false, false, false, 0, null);
            link.dispatchEvent(event)
        }
    },
    _saveBlobAs: function(fileName, format, data) {
        var _this = this;
        this._blobSaved = false;
        if ((0, _type.isDefined)(navigator.msSaveOrOpenBlob)) {
            navigator.msSaveOrOpenBlob(data, fileName);
            this._blobSaved = true
        } else {
            if ((0, _type.isDefined)(window.WinJS)) {
                this._winJSBlobSave(data, fileName, format);
                this._blobSaved = true
            } else {
                var URL = window.URL || window.webkitURL || window.mozURL || window.msURL || window.oURL;
                if ((0, _type.isDefined)(URL)) {
                    var objectURL = URL.createObjectURL(data);
                    var downloadLink = this._linkDownloader(fileName, objectURL);
                    setTimeout(function() {
                        URL.revokeObjectURL(objectURL);
                        _this._objectUrlRevoked = true
                    }, this._revokeObjectURLTimeout);
                    this._click(downloadLink)
                } else {
                    _console.logger.warn("window.URL || window.webkitURL || window.mozURL || window.msURL || window.oURL is not defined")
                }
            }
        }
    },
    saveAs: function(fileName, format, data, proxyURL, forceProxy) {
        var fileExtension = FILE_EXTESIONS[format];
        if (fileExtension) {
            fileName += "." + fileExtension
        }
        if ((0, _type.isDefined)(proxyURL)) {
            _ui.default.log("W0001", "Export", "proxyURL", "19.2", "This option is no longer required")
        }
        if (forceProxy) {
            this._saveByProxy(proxyURL, fileName, format, data)
        } else {
            if ((0, _type.isFunction)(window.Blob)) {
                this._saveBlobAs(fileName, format, data)
            } else {
                if ((0, _type.isDefined)(proxyURL) && !(0, _type.isDefined)(navigator.userAgent.match(/iPad/i))) {
                    this._saveByProxy(proxyURL, fileName, format, data)
                } else {
                    if (!(0, _type.isDefined)(navigator.userAgent.match(/iPad/i))) {
                        _ui.default.log("E1034")
                    }
                    var downloadLink = this._linkDownloader(fileName, this._getDataUri(format, data));
                    this._click(downloadLink)
                }
            }
        }
    }
};
exports.fileSaver = fileSaver;
