/**
 * DevExtreme (ui/html_editor/formats/image.js)
 * Version: 20.2.6
 * Build date: Tue Mar 16 2021
 *
 * Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
exports.default = void 0;
var _devextremeQuill = _interopRequireDefault(require("devextreme-quill"));
var _type = require("../../../core/utils/type");

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        "default": obj
    }
}

function _inheritsLoose(subClass, superClass) {
    subClass.prototype = Object.create(superClass.prototype);
    subClass.prototype.constructor = subClass;
    _setPrototypeOf(subClass, superClass)
}

function _setPrototypeOf(o, p) {
    _setPrototypeOf = Object.setPrototypeOf || function(o, p) {
        o.__proto__ = p;
        return o
    };
    return _setPrototypeOf(o, p)
}
var ExtImage = {};
if (_devextremeQuill.default) {
    var Image = _devextremeQuill.default.import("formats/image");
    ExtImage = function(_Image) {
        _inheritsLoose(ExtImage, _Image);

        function ExtImage() {
            return _Image.apply(this, arguments) || this
        }
        ExtImage.create = function(data) {
            var SRC = data && data.src || data;
            var node = _Image.create.call(this, SRC);
            if ((0, _type.isObject)(data)) {
                var setAttribute = function(attr, value) {
                    data[attr] && node.setAttribute(attr, value)
                };
                setAttribute("alt", data.alt);
                setAttribute("width", data.width);
                setAttribute("height", data.height)
            }
            return node
        };
        ExtImage.formats = function formats(domNode) {
            var formats = _Image.formats.call(this, domNode);
            formats.imageSrc = domNode.getAttribute("src");
            return formats
        };
        var _proto = ExtImage.prototype;
        _proto.formats = function formats() {
            var formats = _Image.prototype.formats.call(this);
            var floatValue = this.domNode.style.float;
            if (floatValue) {
                formats.float = floatValue
            }
            return formats
        };
        _proto.format = function(name, value) {
            if ("float" === name) {
                this.domNode.style[name] = value
            } else {
                _Image.prototype.format.call(this, name, value)
            }
        };
        ExtImage.value = function(domNode) {
            return {
                src: domNode.getAttribute("src"),
                width: domNode.getAttribute("width"),
                height: domNode.getAttribute("height"),
                alt: domNode.getAttribute("alt")
            }
        };
        return ExtImage
    }(Image);
    ExtImage.blotName = "extendedImage"
}
var _default = ExtImage;
exports.default = _default;
module.exports = exports.default;
