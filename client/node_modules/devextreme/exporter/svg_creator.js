/**
 * DevExtreme (exporter/svg_creator.js)
 * Version: 20.2.6
 * Build date: Tue Mar 16 2021
 *
 * Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
exports.getData = getData;
exports.svgCreator = void 0;
var _renderer = _interopRequireDefault(require("../core/renderer"));
var _ajax = _interopRequireDefault(require("../core/utils/ajax"));
var _window = require("../core/utils/window");
var _type = require("../core/utils/type");
var _iterator = require("../core/utils/iterator");
var _svg = require("../core/utils/svg");
var _deferred = require("../core/utils/deferred");

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        "default": obj
    }
}
var window = (0, _window.getWindow)();
var svgCreator = {
    _markup: "",
    _imageArray: {},
    _imageDeferreds: [],
    _getBinaryFile: function(src, callback) {
        _ajax.default.sendRequest({
            url: src,
            method: "GET",
            responseType: "arraybuffer"
        }).done(callback).fail(function() {
            callback(false)
        })
    },
    _loadImages: function() {
        var that = this;
        (0, _iterator.each)(that._imageArray, function(src) {
            var deferred = new _deferred.Deferred;
            that._imageDeferreds.push(deferred);
            that._getBinaryFile(src, function(response) {
                if (!response) {
                    delete that._imageArray[src];
                    deferred.resolve();
                    return
                }
                var i;
                var binary = "";
                var bytes = new Uint8Array(response);
                var length = bytes.byteLength;
                for (i = 0; i < length; i++) {
                    binary += String.fromCharCode(bytes[i])
                }
                that._imageArray[src] = "data:image/png;base64," + window.btoa(binary);
                deferred.resolve()
            })
        })
    },
    _parseImages: function(element) {
        var href;
        var that = this;
        if ("image" === element.tagName) {
            href = (0, _renderer.default)(element).attr("href") || (0, _renderer.default)(element).attr("xlink:href");
            if (!that._imageArray[href]) {
                that._imageArray[href] = ""
            }
        }(0, _iterator.each)(element.childNodes, function(_, element) {
            that._parseImages(element)
        })
    },
    _prepareImages: function(svgElem) {
        this._parseImages(svgElem);
        this._loadImages();
        return _deferred.when.apply(_renderer.default, this._imageDeferreds)
    },
    getData: function(data, options) {
        var markup;
        var that = this;
        var xmlVersion = '<?xml version="1.0" encoding="UTF-8" standalone="yes" ?>';
        var svgElem = (0, _svg.getSvgElement)(data);
        var $svgObject = (0, _renderer.default)(svgElem);
        markup = xmlVersion + (0, _svg.getSvgMarkup)($svgObject.get(0), options.backgroundColor);
        return that._prepareImages(svgElem).then(function() {
            (0, _iterator.each)(that._imageArray, function(href, dataURI) {
                var regexpString = "href=['|\"]".concat(href, "['|\"]");
                markup = markup.replace(new RegExp(regexpString, "gi"), 'href="'.concat(dataURI, '"'))
            });
            return (0, _type.isFunction)(window.Blob) ? that._getBlob(markup) : that._getBase64(markup)
        })
    },
    _getBlob: function(markup) {
        return new window.Blob([markup], {
            type: "image/svg+xml"
        })
    },
    _getBase64: function(markup) {
        return window.btoa(markup)
    }
};
exports.svgCreator = svgCreator;

function getData(data, options) {
    return svgCreator.getData(data, options)
}
