/**
 * DevExtreme (exporter.js)
 * Version: 20.2.6
 * Build date: Tue Mar 16 2021
 *
 * Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
exports.export = _export;
Object.defineProperty(exports, "fileSaver", {
    enumerable: true,
    get: function() {
        return _file_saver.fileSaver
    }
});
exports.svg = exports.pdf = exports.image = exports.excel = void 0;
var _file_saver = require("./exporter/file_saver");
var _excel_creator = require("./exporter/excel_creator");
var _image_creator = require("./exporter/image_creator");
var _svg_creator = require("./exporter/svg_creator");
var _type = require("./core/utils/type");
var _deferred = require("./core/utils/deferred");
var _excel_format_converter = _interopRequireDefault(require("./exporter/excel_format_converter"));
var _pdf_creator = require("./exporter/pdf_creator");

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        "default": obj
    }
}

function _export(data, options, getData) {
    if (!data) {
        return (new _deferred.Deferred).resolve()
    }
    var exportingAction = options.exportingAction;
    var exportedAction = options.exportedAction;
    var fileSavingAction = options.fileSavingAction;
    var eventArgs = {
        fileName: options.fileName,
        format: options.format,
        cancel: false
    };
    (0, _type.isFunction)(exportingAction) && exportingAction(eventArgs);
    if (!eventArgs.cancel) {
        return getData(data, options).then(function(blob) {
            (0, _type.isFunction)(exportedAction) && exportedAction();
            if ((0, _type.isFunction)(fileSavingAction)) {
                eventArgs.data = blob;
                fileSavingAction(eventArgs)
            }
            if (!eventArgs.cancel) {
                _file_saver.fileSaver.saveAs(eventArgs.fileName, options.format, blob, options.proxyUrl, options.forceProxy)
            }
        })
    }
    return (new _deferred.Deferred).resolve()
}
var excel = {
    creator: _excel_creator.ExcelCreator,
    getData: _excel_creator.getData,
    formatConverter: _excel_format_converter.default
};
exports.excel = excel;
var image = {
    creator: _image_creator.imageCreator,
    getData: _image_creator.getData,
    testFormats: _image_creator.testFormats
};
exports.image = image;
var pdf = {
    getData: _pdf_creator.getData
};
exports.pdf = pdf;
var svg = {
    creator: _svg_creator.svgCreator,
    getData: _svg_creator.getData
};
exports.svg = svg;
