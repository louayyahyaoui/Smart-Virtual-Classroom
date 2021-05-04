/**
 * DevExtreme (file_management/provider_base.js)
 * Version: 20.2.6
 * Build date: Tue Mar 16 2021
 *
 * Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
exports.default = void 0;
var _data = require("../core/utils/data");
var _common = require("../core/utils/common");
var _date_serialization = _interopRequireDefault(require("../core/utils/date_serialization"));
var _iterator = require("../core/utils/iterator");
var _type = require("../core/utils/type");
var _deferred = require("../core/utils/deferred");
var _file_system_item = _interopRequireDefault(require("./file_system_item"));

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        "default": obj
    }
}
var DEFAULT_FILE_UPLOAD_CHUNK_SIZE = 2e5;
var FileSystemProviderBase = function() {
    function FileSystemProviderBase(options) {
        options = (0, _common.ensureDefined)(options, {});
        this._keyGetter = (0, _data.compileGetter)(this._getKeyExpr(options));
        this._nameGetter = (0, _data.compileGetter)(this._getNameExpr(options));
        this._isDirGetter = (0, _data.compileGetter)(this._getIsDirExpr(options));
        this._sizeGetter = (0, _data.compileGetter)(this._getSizeExpr(options));
        this._dateModifiedGetter = (0, _data.compileGetter)(this._getDateModifiedExpr(options));
        this._thumbnailGetter = (0, _data.compileGetter)(options.thumbnailExpr || "thumbnail")
    }
    var _proto = FileSystemProviderBase.prototype;
    _proto.getItems = function(parentDirectory) {
        return []
    };
    _proto.renameItem = function(item, name) {};
    _proto.createDirectory = function(parentDirectory, name) {};
    _proto.deleteItems = function(items) {};
    _proto.moveItems = function(items, destinationDirectory) {};
    _proto.copyItems = function(items, destinationDirectory) {};
    _proto.uploadFileChunk = function(fileData, chunksInfo, destinationDirectory) {};
    _proto.abortFileUpload = function(fileData, chunksInfo, destinationDirectory) {};
    _proto.downloadItems = function(items) {};
    _proto.getItemsContent = function(items) {};
    _proto.getFileUploadChunkSize = function() {
        return DEFAULT_FILE_UPLOAD_CHUNK_SIZE
    };
    _proto._convertDataObjectsToFileItems = function(entries, pathInfo) {
        var _this = this;
        var result = [];
        (0, _iterator.each)(entries, function(_, entry) {
            var fileItem = _this._createFileItem(entry, pathInfo);
            result.push(fileItem)
        });
        return result
    };
    _proto._createFileItem = function(dataObj, pathInfo) {
        var fileItem = new _file_system_item.default(pathInfo, this._nameGetter(dataObj), (!!this._isDirGetter(dataObj)));
        fileItem.size = this._sizeGetter(dataObj);
        if (void 0 === fileItem.size) {
            fileItem.size = 0
        }
        fileItem.dateModified = _date_serialization.default.deserializeDate(this._dateModifiedGetter(dataObj));
        if (void 0 === fileItem.dateModified) {
            fileItem.dateModified = new Date
        }
        if (fileItem.isDirectory) {
            fileItem.hasSubDirectories = this._hasSubDirs(dataObj)
        }
        fileItem.key = this._keyGetter(dataObj);
        if (!fileItem.key) {
            fileItem.key = fileItem.relativeName
        }
        fileItem.thumbnail = this._thumbnailGetter(dataObj) || "";
        fileItem.dataItem = dataObj;
        return fileItem
    };
    _proto._hasSubDirs = function(dataObj) {
        return true
    };
    _proto._getKeyExpr = function(options) {
        return options.keyExpr || this._defaultKeyExpr
    };
    _proto._defaultKeyExpr = function(fileItem) {
        if (2 === arguments.length) {
            fileItem.__KEY__ = arguments[1];
            return
        }
        return Object.prototype.hasOwnProperty.call(fileItem, "__KEY__") ? fileItem.__KEY__ : null
    };
    _proto._getNameExpr = function(options) {
        return options.nameExpr || "name"
    };
    _proto._getIsDirExpr = function(options) {
        return options.isDirectoryExpr || "isDirectory"
    };
    _proto._getSizeExpr = function(options) {
        return options.sizeExpr || "size"
    };
    _proto._getDateModifiedExpr = function(options) {
        return options.dateModifiedExpr || "dateModified"
    };
    _proto._executeActionAsDeferred = function(action, keepResult) {
        var deferred = new _deferred.Deferred;
        try {
            var result = action();
            if ((0, _type.isPromise)(result)) {
                (0, _deferred.fromPromise)(result).done(function(userResult) {
                    return deferred.resolve(keepResult && userResult || void 0)
                }).fail(function(error) {
                    return deferred.reject(error)
                })
            } else {
                deferred.resolve(keepResult && result || void 0)
            }
        } catch (error) {
            return deferred.reject(error)
        }
        return deferred.promise()
    };
    return FileSystemProviderBase
}();
var _default = FileSystemProviderBase;
exports.default = _default;
module.exports = exports.default;
