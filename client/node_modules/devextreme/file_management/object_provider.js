/**
 * DevExtreme (file_management/object_provider.js)
 * Version: 20.2.6
 * Build date: Tue Mar 16 2021
 *
 * Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
exports.default = void 0;
var _array = require("../core/utils/array");
var _common = require("../core/utils/common");
var _data = require("../core/utils/data");
var _guid = _interopRequireDefault(require("../core/guid"));
var _type = require("../core/utils/type");
var _errors = _interopRequireDefault(require("../data/errors"));
var _deferred = require("../core/utils/deferred");
var _window = require("../core/utils/window");
var _file_saver = require("../exporter/file_saver");
var _ui = _interopRequireDefault(require("../ui/widget/ui.errors"));
var _jszip = _interopRequireDefault(require("jszip"));
var _provider_base = _interopRequireDefault(require("./provider_base"));
var _errors2 = _interopRequireDefault(require("./errors"));
var _utils = require("./utils");

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
var window = (0, _window.getWindow)();
var ObjectFileSystemProvider = function(_FileSystemProviderBa) {
    _inheritsLoose(ObjectFileSystemProvider, _FileSystemProviderBa);

    function ObjectFileSystemProvider(options) {
        var _this;
        options = (0, _common.ensureDefined)(options, {});
        _this = _FileSystemProviderBa.call(this, options) || this;
        var initialArray = options.data;
        if (initialArray && !Array.isArray(initialArray)) {
            throw _errors.default.errors.Error("E4006")
        }
        var itemsExpr = options.itemsExpr || "items";
        _this._subFileItemsGetter = (0, _data.compileGetter)(itemsExpr);
        _this._subFileItemsSetter = _this._getSetter(itemsExpr);
        var contentExpr = options.contentExpr || "content";
        _this._contentGetter = (0, _data.compileGetter)(contentExpr);
        _this._contentSetter = _this._getSetter(contentExpr);
        var nameExpr = _this._getNameExpr(options);
        _this._nameSetter = _this._getSetter(nameExpr);
        var isDirExpr = _this._getIsDirExpr(options);
        _this._getIsDirSetter = _this._getSetter(isDirExpr);
        var keyExpr = _this._getKeyExpr(options);
        _this._keySetter = _this._getSetter(keyExpr);
        var sizeExpr = _this._getSizeExpr(options);
        _this._sizeSetter = _this._getSetter(sizeExpr);
        var dateModifiedExpr = _this._getDateModifiedExpr(options);
        _this._dateModifiedSetter = _this._getSetter(dateModifiedExpr);
        _this._data = initialArray || [];
        return _this
    }
    var _proto = ObjectFileSystemProvider.prototype;
    _proto.getItems = function(parentDir) {
        var _this2 = this;
        return this._executeActionAsDeferred(function() {
            return _this2._getItems(parentDir)
        }, true)
    };
    _proto.renameItem = function(item, name) {
        var _this3 = this;
        return this._executeActionAsDeferred(function() {
            return _this3._renameItemCore(item, name)
        })
    };
    _proto._renameItemCore = function(item, name) {
        if (!item) {
            return
        }
        var dataItem = this._findDataObject(item);
        this._nameSetter(dataItem, name);
        item.name = name;
        item.key = this._ensureDataObjectKey(dataItem)
    };
    _proto.createDirectory = function(parentDir, name) {
        var _this4 = this;
        return this._executeActionAsDeferred(function() {
            _this4._validateDirectoryExists(parentDir);
            _this4._createDataObject(parentDir, name, true)
        })
    };
    _proto.deleteItems = function(items) {
        var _this5 = this;
        return items.map(function(item) {
            return _this5._executeActionAsDeferred(function() {
                return _this5._deleteItem(item)
            })
        })
    };
    _proto.moveItems = function(items, destinationDir) {
        var _this6 = this;
        var destinationDataItem = this._findDataObject(destinationDir);
        var array = this._getDirectoryDataItems(destinationDataItem);
        var deferreds = items.map(function(item) {
            return _this6._executeActionAsDeferred(function() {
                _this6._checkAbilityToMoveOrCopyItem(item, destinationDir);
                var dataItem = _this6._findDataObject(item);
                _this6._deleteItem(item);
                array.push(dataItem)
            })
        });
        return deferreds
    };
    _proto.copyItems = function(items, destinationDir) {
        var _this7 = this;
        var destinationDataItem = this._findDataObject(destinationDir);
        var array = this._getDirectoryDataItems(destinationDataItem);
        var deferreds = items.map(function(item) {
            return _this7._executeActionAsDeferred(function() {
                _this7._checkAbilityToMoveOrCopyItem(item, destinationDir);
                var dataItem = _this7._findDataObject(item);
                var copiedItem = _this7._createCopy(dataItem);
                array.push(copiedItem)
            })
        });
        return deferreds
    };
    _proto.uploadFileChunk = function(fileData, chunksInfo, destinationDirectory) {
        var _this8 = this;
        if (chunksInfo.chunkIndex > 0) {
            return chunksInfo.customData.deferred
        }
        this._validateDirectoryExists(destinationDirectory);
        var deferred = chunksInfo.customData.deferred = new _deferred.Deferred;
        var reader = this._createFileReader();
        reader.readAsDataURL(fileData);
        reader.onload = function() {
            var content = reader.result.split(",")[1];
            var dataObj = _this8._createDataObject(destinationDirectory, fileData.name, false);
            _this8._sizeSetter(dataObj, fileData.size);
            _this8._dateModifiedSetter(dataObj, fileData.lastModifiedDate);
            _this8._contentSetter(dataObj, content);
            deferred.resolve()
        };
        reader.onerror = function(error) {
            return deferred.reject(error)
        };
        return deferred
    };
    _proto.downloadItems = function(items) {
        if (1 === items.length) {
            this._downloadSingleFile(items[0])
        } else {
            this._downloadMultipleFiles(items)
        }
    };
    _proto._downloadSingleFile = function(file) {
        var content = this._getFileContent(file);
        var byteString = window.atob(content);
        var arrayBuffer = new ArrayBuffer(byteString.length);
        var array = new Uint8Array(arrayBuffer);
        for (var i = 0; i < byteString.length; i++) {
            array[i] = byteString.charCodeAt(i)
        }
        var blob = new window.Blob([arrayBuffer], {
            type: "application/octet-stream"
        });
        _file_saver.fileSaver.saveAs(file.name, null, blob)
    };
    _proto._downloadMultipleFiles = function(files) {
        var _this9 = this;
        var jsZip = getJSZip();
        var zip = new jsZip;
        files.forEach(function(file) {
            return zip.file(file.name, _this9._getFileContent(file), {
                base64: true
            })
        });
        var options = {
            type: "blob",
            compression: "DEFLATE",
            mimeType: "application/zip"
        };
        var deferred = new _deferred.Deferred;
        if (zip.generateAsync) {
            zip.generateAsync(options).then(deferred.resolve)
        } else {
            deferred.resolve(zip.generate(options))
        }
        deferred.done(function(blob) {
            return _file_saver.fileSaver.saveAs("files.zip", null, blob)
        })
    };
    _proto._getFileContent = function(file) {
        var dataItem = this._findDataObject(file);
        return this._contentGetter(dataItem) || ""
    };
    _proto._validateDirectoryExists = function(directoryInfo) {
        if (!this._isFileItemExists(directoryInfo) || this._isDirGetter(directoryInfo.fileItem)) {
            throw {
                errorId: _errors2.default.DirectoryNotFound,
                fileItem: directoryInfo
            }
        }
    };
    _proto._checkAbilityToMoveOrCopyItem = function(item, destinationDir) {
        var _this10 = this;
        var dataItem = this._findDataObject(item);
        var itemKey = this._getKeyFromDataObject(dataItem, item.parentPath);
        var pathInfo = destinationDir.getFullPathInfo();
        var currentPath = "";
        pathInfo.forEach(function(info) {
            currentPath = (0, _utils.pathCombine)(currentPath, info.name);
            var pathKey = _this10._getDataObjectKey(info.key, currentPath);
            if (pathKey === itemKey) {
                throw {
                    errorId: _errors2.default.Other,
                    fileItem: item
                }
            }
        })
    };
    _proto._createDataObject = function(parentDir, name, isDirectory) {
        var dataObj = {};
        this._nameSetter(dataObj, name);
        this._getIsDirSetter(dataObj, isDirectory);
        this._keySetter(dataObj, String(new _guid.default));
        var parentDataItem = this._findDataObject(parentDir);
        var array = this._getDirectoryDataItems(parentDataItem);
        array.push(dataObj);
        return dataObj
    };
    _proto._createCopy = function(dataObj) {
        var _this11 = this;
        var copyObj = {};
        this._nameSetter(copyObj, this._nameGetter(dataObj));
        this._getIsDirSetter(copyObj, this._isDirGetter(dataObj));
        var items = this._subFileItemsGetter(dataObj);
        if (Array.isArray(items)) {
            var itemsCopy = [];
            items.forEach(function(childItem) {
                var childCopy = _this11._createCopy(childItem);
                itemsCopy.push(childCopy)
            });
            this._subFileItemsSetter(copyObj, itemsCopy)
        }
        return copyObj
    };
    _proto._deleteItem = function(fileItem) {
        var dataItem = this._findDataObject(fileItem);
        var parentDirDataObj = this._findFileItemObj(fileItem.pathInfo);
        var array = this._getDirectoryDataItems(parentDirDataObj);
        var index = array.indexOf(dataItem);
        array.splice(index, 1)
    };
    _proto._getDirectoryDataItems = function(directoryDataObj) {
        if (!directoryDataObj) {
            return this._data
        }
        var dataItems = this._subFileItemsGetter(directoryDataObj);
        if (!Array.isArray(dataItems)) {
            dataItems = [];
            this._subFileItemsSetter(directoryDataObj, dataItems)
        }
        return dataItems
    };
    _proto._getItems = function(parentDir) {
        this._validateDirectoryExists(parentDir);
        var pathInfo = parentDir.getFullPathInfo();
        var parentDirKey = pathInfo && pathInfo.length > 0 ? pathInfo[pathInfo.length - 1].key : null;
        var dirFileObjects = this._data;
        if (parentDirKey) {
            var directoryEntry = this._findFileItemObj(pathInfo);
            dirFileObjects = directoryEntry && this._subFileItemsGetter(directoryEntry) || []
        }
        this._ensureKeysForDuplicateNameItems(dirFileObjects);
        return this._convertDataObjectsToFileItems(dirFileObjects, pathInfo)
    };
    _proto._ensureKeysForDuplicateNameItems = function(dataObjects) {
        var _this12 = this;
        var names = {};
        dataObjects.forEach(function(obj) {
            var name = _this12._nameGetter(obj);
            if (names[name]) {
                _this12._ensureDataObjectKey(obj)
            } else {
                names[name] = true
            }
        })
    };
    _proto._findDataObject = function(item) {
        if (item.isRoot()) {
            return null
        }
        var result = this._findFileItemObj(item.getFullPathInfo());
        if (!result) {
            throw {
                errorId: item.isDirectory ? _errors2.default.DirectoryNotFound : _errors2.default.FileNotFound,
                fileItem: item
            }
        }
        return result
    };
    _proto._findFileItemObj = function(pathInfo) {
        var _this13 = this;
        if (!Array.isArray(pathInfo)) {
            pathInfo = []
        }
        var currentPath = "";
        var fileItemObj = null;
        var fileItemObjects = this._data;
        var _loop = function(i) {
            fileItemObj = (0, _array.find)(fileItemObjects, function(item) {
                var hasCorrectFileItemType = _this13._isDirGetter(item) || i === pathInfo.length - 1;
                return _this13._getKeyFromDataObject(item, currentPath) === pathInfo[i].key && _this13._nameGetter(item) === pathInfo[i].name && hasCorrectFileItemType
            });
            if (fileItemObj) {
                currentPath = (0, _utils.pathCombine)(currentPath, _this13._nameGetter(fileItemObj));
                fileItemObjects = _this13._subFileItemsGetter(fileItemObj)
            }
        };
        for (var i = 0; i < pathInfo.length && (0 === i || fileItemObj); i++) {
            _loop(i)
        }
        return fileItemObj
    };
    _proto._getKeyFromDataObject = function(dataObj, defaultKeyPrefix) {
        var key = this._keyGetter(dataObj);
        var relativeName = (0, _utils.pathCombine)(defaultKeyPrefix, this._nameGetter(dataObj));
        return this._getDataObjectKey(key, relativeName)
    };
    _proto._getDataObjectKey = function(key, relativeName) {
        return key ? key : relativeName
    };
    _proto._ensureDataObjectKey = function(dataObj) {
        var key = this._keyGetter(dataObj);
        if (!key) {
            key = String(new _guid.default);
            this._keySetter(dataObj, key)
        }
        return key
    };
    _proto._hasSubDirs = function(dataObj) {
        var subItems = (0, _common.ensureDefined)(this._subFileItemsGetter(dataObj), []);
        if (!Array.isArray(subItems)) {
            return true
        }
        for (var i = 0; i < subItems.length; i++) {
            if (true === this._isDirGetter(subItems[i])) {
                return true
            }
        }
        return false
    };
    _proto._getSetter = function(expr) {
        return (0, _type.isFunction)(expr) ? expr : (0, _data.compileSetter)(expr)
    };
    _proto._isFileItemExists = function(fileItem) {
        return fileItem.isDirectory && fileItem.isRoot() || !!this._findFileItemObj(fileItem.getFullPathInfo())
    };
    _proto._createFileReader = function() {
        return new window.FileReader
    };
    return ObjectFileSystemProvider
}(_provider_base.default);

function getJSZip() {
    if (!_jszip.default) {
        throw _ui.default.Error("E1041", "JSZip")
    }
    return _jszip.default
}
var _default = ObjectFileSystemProvider;
exports.default = _default;
module.exports = exports.default;
module.exports.default = module.exports;
