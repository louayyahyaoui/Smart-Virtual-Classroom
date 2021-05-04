/**
 * DevExtreme (ui/file_manager/ui.file_manager.common.js)
 * Version: 20.2.6
 * Build date: Tue Mar 16 2021
 *
 * Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
exports.getMapFromObject = exports.findItemsByKeys = exports.extendAttributes = exports.getDisplayFileSize = exports.whenSome = void 0;
var _deferred = require("../../core/utils/deferred");
var _extend = require("../../core/utils/extend");
var _common = require("../../core/utils/common");
var _type = require("../../core/utils/type");

function _defineProperty(obj, key, value) {
    if (key in obj) {
        Object.defineProperty(obj, key, {
            value: value,
            enumerable: true,
            configurable: true,
            writable: true
        })
    } else {
        obj[key] = value
    }
    return obj
}
var whenSome = function(arg, onSuccess, onError) {
    onSuccess = onSuccess || _common.noop;
    onError = onError || _common.noop;
    if (!Array.isArray(arg)) {
        arg = [arg]
    }
    var deferreds = arg.map(function(item, index) {
        return (0, _deferred.when)(item).then(function(result) {
            (0, _type.isFunction)(onSuccess) && onSuccess({
                item: item,
                index: index,
                result: result
            });
            return result
        }, function(error) {
            if (!error) {
                error = {}
            }
            error.index = index;
            (0, _type.isFunction)(onError) && onError(error);
            return (new _deferred.Deferred).resolve().promise()
        })
    });
    return _deferred.when.apply(null, deferreds)
};
exports.whenSome = whenSome;
var getDisplayFileSize = function(byteSize) {
    var sizesTitles = ["B", "KB", "MB", "GB", "TB"];
    var index = 0;
    var displaySize = byteSize;
    while (displaySize >= 1024 && index <= sizesTitles.length - 1) {
        displaySize /= 1024;
        index++
    }
    displaySize = Math.round(10 * displaySize) / 10;
    return "".concat(displaySize, " ").concat(sizesTitles[index])
};
exports.getDisplayFileSize = getDisplayFileSize;
var extendAttributes = function(targetObject, sourceObject, objectKeysArray) {
    objectKeysArray.forEach(function(objectKey) {
        (0, _extend.extend)(true, targetObject, (0, _type.isDefined)(sourceObject[objectKey]) ? _defineProperty({}, objectKey, sourceObject[objectKey]) : {})
    });
    return targetObject
};
exports.extendAttributes = extendAttributes;
var findItemsByKeys = function(itemInfos, keys) {
    var itemMap = {};
    keys.forEach(function(key) {
        itemMap[key] = null
    });
    itemInfos.forEach(function(itemInfo) {
        var key = itemInfo.fileItem.key;
        if (Object.prototype.hasOwnProperty.call(itemMap, key)) {
            itemMap[key] = itemInfo
        }
    });
    var result = [];
    keys.forEach(function(key) {
        var itemInfo = itemMap[key];
        if (itemInfo) {
            result.push(itemInfo)
        }
    });
    return result
};
exports.findItemsByKeys = findItemsByKeys;
var getMapFromObject = function(object) {
    var keys = Object.keys(object);
    var values = [];
    keys.forEach(function(key) {
        return values.push(object[key])
    });
    return {
        keys: keys,
        values: values
    }
};
exports.getMapFromObject = getMapFromObject;
