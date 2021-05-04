/**
 * DevExtreme (file_management/file_system_item.js)
 * Version: 20.2.6
 * Build date: Tue Mar 16 2021
 *
 * Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
exports.default = void 0;
var _type = require("../core/utils/type");
var _utils = require("./utils");

function _toConsumableArray(arr) {
    return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread()
}

function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
}

function _unsupportedIterableToArray(o, minLen) {
    if (!o) {
        return
    }
    if ("string" === typeof o) {
        return _arrayLikeToArray(o, minLen)
    }
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if ("Object" === n && o.constructor) {
        n = o.constructor.name
    }
    if ("Map" === n || "Set" === n) {
        return Array.from(o)
    }
    if ("Arguments" === n || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) {
        return _arrayLikeToArray(o, minLen)
    }
}

function _iterableToArray(iter) {
    if ("undefined" !== typeof Symbol && Symbol.iterator in Object(iter)) {
        return Array.from(iter)
    }
}

function _arrayWithoutHoles(arr) {
    if (Array.isArray(arr)) {
        return _arrayLikeToArray(arr)
    }
}

function _arrayLikeToArray(arr, len) {
    if (null == len || len > arr.length) {
        len = arr.length
    }
    for (var i = 0, arr2 = new Array(len); i < len; i++) {
        arr2[i] = arr[i]
    }
    return arr2
}
var FileSystemItem = function() {
    function FileSystemItem() {
        var ctor = (0, _type.isString)(arguments[0]) ? this._publicCtor : this._internalCtor;
        ctor.apply(this, arguments)
    }
    var _proto = FileSystemItem.prototype;
    _proto._internalCtor = function(pathInfo, name, isDirectory) {
        this.name = name || "";
        this.pathInfo = pathInfo && _toConsumableArray(pathInfo) || [];
        this.parentPath = this._getPathByPathInfo(this.pathInfo);
        this.relativeName = (0, _utils.pathCombine)(this.parentPath, name);
        this.key = this._getPathByPathInfo(this.getFullPathInfo(), true);
        this.path = (0, _utils.pathCombine)(this.parentPath, name);
        this.pathKeys = this.pathInfo.map(function(_ref) {
            var key = _ref.key;
            return key
        });
        if (!this.isRoot()) {
            this.pathKeys.push(this.key)
        }
        this._initialize(isDirectory)
    };
    _proto._publicCtor = function(path, isDirectory, pathKeys) {
        this.path = path || "";
        this.pathKeys = pathKeys || [];
        var pathInfo = [];
        var parts = (0, _utils.getPathParts)(path, true);
        for (var i = 0; i < parts.length - 1; i++) {
            var part = parts[i];
            var pathInfoPart = {
                key: this.pathKeys[i] || part,
                name: (0, _utils.getName)(part)
            };
            pathInfo.push(pathInfoPart)
        }
        this.pathInfo = pathInfo;
        this.relativeName = path;
        this.name = (0, _utils.getName)(path);
        this.key = this.pathKeys.length ? this.pathKeys[this.pathKeys.length - 1] : path;
        this.parentPath = parts.length > 1 ? parts[parts.length - 2] : "";
        this._initialize(isDirectory)
    };
    _proto._initialize = function(isDirectory) {
        this.isDirectory = !!isDirectory;
        this.size = 0;
        this.dateModified = new Date;
        this.thumbnail = "";
        this.tooltipText = ""
    };
    _proto.getFullPathInfo = function() {
        var pathInfo = _toConsumableArray(this.pathInfo);
        if (!this.isRoot()) {
            pathInfo.push({
                key: this.key,
                name: this.name
            })
        }
        return pathInfo
    };
    _proto.isRoot = function() {
        return "" === this.path
    };
    _proto.getFileExtension = function() {
        return this.isDirectory ? "" : (0, _utils.getFileExtension)(this.name)
    };
    _proto.equals = function(item) {
        return item && this.key === item.key
    };
    _proto.createClone = function() {
        var result = new FileSystemItem(this.pathInfo, this.name, this.isDirectory);
        result.key = this.key;
        result.size = this.size;
        result.dateModified = this.dateModified;
        result.thumbnail = this.thumbnail;
        result.tooltipText = this.tooltipText;
        result.hasSubDirectories = this.hasSubDirectories;
        result.dataItem = this.dataItem;
        return result
    };
    _proto._getPathByPathInfo = function(pathInfo, escape) {
        return pathInfo.map(function(info) {
            return escape ? (0, _utils.getEscapedFileName)(info.name) : info.name
        }).join(_utils.PATH_SEPARATOR)
    };
    return FileSystemItem
}();
var _default = FileSystemItem;
exports.default = _default;
module.exports = exports.default;
module.exports.default = module.exports;
