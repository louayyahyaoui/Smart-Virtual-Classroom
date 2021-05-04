/**
 * DevExtreme (data/array_utils.js)
 * Version: 20.2.6
 * Build date: Tue Mar 16 2021
 *
 * Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
exports.applyBatch = applyBatch;
exports.createObjectWithChanges = createObjectWithChanges;
exports.update = update;
exports.insert = insert;
exports.remove = remove;
exports.indexByKey = indexByKey;
exports.applyChanges = applyChanges;
var _type = require("../core/utils/type");
var _config = _interopRequireDefault(require("../core/config"));
var _guid = _interopRequireDefault(require("../core/guid"));
var _extend = require("../core/utils/extend");
var _errors = _interopRequireDefault(require("./errors"));
var _object = require("../core/utils/object");
var _data = require("../core/utils/data");
var _utils = _interopRequireDefault(require("./utils"));

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        "default": obj
    }
}

function _typeof(obj) {
    "@babel/helpers - typeof";
    if ("function" === typeof Symbol && "symbol" === typeof Symbol.iterator) {
        _typeof = function(obj) {
            return typeof obj
        }
    } else {
        _typeof = function(obj) {
            return obj && "function" === typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj
        }
    }
    return _typeof(obj)
}

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

function hasKey(target, keyOrKeys) {
    var key;
    var keys = "string" === typeof keyOrKeys ? keyOrKeys.split() : keyOrKeys.slice();
    while (keys.length) {
        key = keys.shift();
        if (key in target) {
            return true
        }
    }
    return false
}

function findItems(keyInfo, items, key, groupCount) {
    var childItems;
    var result;
    if (groupCount) {
        for (var i = 0; i < items.length; i++) {
            childItems = items[i].items || items[i].collapsedItems || [];
            result = findItems(keyInfo, childItems || [], key, groupCount - 1);
            if (result) {
                return result
            }
        }
    } else {
        if (indexByKey(keyInfo, items, key) >= 0) {
            return items
        }
    }
}

function getItems(keyInfo, items, key, groupCount) {
    if (groupCount) {
        return findItems(keyInfo, items, key, groupCount) || []
    }
    return items
}

function generateDataByKeyMap(keyInfo, array) {
    if (keyInfo.key() && (!array._dataByKeyMap || array._dataByKeyMapLength !== array.length)) {
        var dataByKeyMap = {};
        var arrayLength = array.length;
        for (var i = 0; i < arrayLength; i++) {
            dataByKeyMap[JSON.stringify(keyInfo.keyOf(array[i]))] = array[i]
        }
        array._dataByKeyMap = dataByKeyMap;
        array._dataByKeyMapLength = arrayLength
    }
}

function getCacheValue(array, key) {
    if (array._dataByKeyMap) {
        return array._dataByKeyMap[JSON.stringify(key)]
    }
}

function getHasKeyCacheValue(array, key) {
    if (array._dataByKeyMap) {
        return array._dataByKeyMap[JSON.stringify(key)]
    }
    return true
}

function setDataByKeyMapValue(array, key, data) {
    if (array._dataByKeyMap) {
        array._dataByKeyMap[JSON.stringify(key)] = data;
        array._dataByKeyMapLength += data ? 1 : -1
    }
}

function createObjectWithChanges(target, changes) {
    var result = target ? Object.create(Object.getPrototypeOf(target)) : {};
    var targetWithoutPrototype = (0, _extend.extendFromObject)({}, target);
    (0, _object.deepExtendArraySafe)(result, targetWithoutPrototype, true, true);
    return (0, _object.deepExtendArraySafe)(result, changes, true, true)
}

function applyBatch(_ref) {
    var keyInfo = _ref.keyInfo,
        data = _ref.data,
        changes = _ref.changes,
        groupCount = _ref.groupCount,
        useInsertIndex = _ref.useInsertIndex,
        immutable = _ref.immutable,
        disableCache = _ref.disableCache,
        logError = _ref.logError;
    var resultItems = true === immutable ? _toConsumableArray(data) : data;
    changes.forEach(function(item) {
        var items = "insert" === item.type ? resultItems : getItems(keyInfo, resultItems, item.key, groupCount);
        !disableCache && generateDataByKeyMap(keyInfo, items);
        switch (item.type) {
            case "update":
                update(keyInfo, items, item.key, item.data, true, immutable, logError);
                break;
            case "insert":
                insert(keyInfo, items, item.data, useInsertIndex && (0, _type.isDefined)(item.index) ? item.index : -1, true, logError);
                break;
            case "remove":
                remove(keyInfo, items, item.key, true, logError)
        }
    });
    return resultItems
}

function getErrorResult(isBatch, logError, errorCode) {
    return !isBatch ? _utils.default.rejectedPromise(_errors.default.errors.Error(errorCode)) : logError && _errors.default.errors.log(errorCode)
}

function applyChanges(data, changes) {
    var options = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
    var _options$keyExpr = options.keyExpr,
        keyExpr = void 0 === _options$keyExpr ? "id" : _options$keyExpr,
        _options$immutable = options.immutable,
        immutable = void 0 === _options$immutable ? true : _options$immutable;
    var keyGetter = (0, _data.compileGetter)(keyExpr);
    var keyInfo = {
        key: function() {
            return keyExpr
        },
        keyOf: function(obj) {
            return keyGetter(obj)
        }
    };
    return applyBatch({
        keyInfo: keyInfo,
        data: data,
        changes: changes,
        immutable: immutable,
        disableCache: true,
        logError: true
    })
}

function update(keyInfo, array, key, data, isBatch, immutable, logError) {
    var target;
    var extendComplexObject = true;
    var keyExpr = keyInfo.key();
    if (keyExpr) {
        if (hasKey(data, keyExpr) && !_utils.default.keysEqual(keyExpr, key, keyInfo.keyOf(data))) {
            return getErrorResult(isBatch, logError, "E4017")
        }
        target = getCacheValue(array, key);
        if (!target) {
            var index = indexByKey(keyInfo, array, key);
            if (index < 0) {
                return getErrorResult(isBatch, logError, "E4009")
            }
            target = array[index];
            if (true === immutable && (0, _type.isDefined)(target)) {
                var newTarget = createObjectWithChanges(target, data);
                array[index] = newTarget;
                return !isBatch && _utils.default.trivialPromise(newTarget, key)
            }
        }
    } else {
        target = key
    }(0, _object.deepExtendArraySafe)(target, data, extendComplexObject);
    if (!isBatch) {
        if ((0, _config.default)().useLegacyStoreResult) {
            return _utils.default.trivialPromise(key, data)
        } else {
            return _utils.default.trivialPromise(target, key)
        }
    }
}

function insert(keyInfo, array, data, index, isBatch, logError) {
    var keyValue;
    var keyExpr = keyInfo.key();
    var obj = (0, _type.isPlainObject)(data) ? (0, _extend.extend)({}, data) : data;
    if (keyExpr) {
        keyValue = keyInfo.keyOf(obj);
        if (void 0 === keyValue || "object" === _typeof(keyValue) && (0, _type.isEmptyObject)(keyValue)) {
            if (Array.isArray(keyExpr)) {
                throw _errors.default.errors.Error("E4007")
            }
            keyValue = obj[keyExpr] = String(new _guid.default)
        } else {
            if (void 0 !== array[indexByKey(keyInfo, array, keyValue)]) {
                return getErrorResult(isBatch, logError, "E4008")
            }
        }
    } else {
        keyValue = obj
    }
    if (index >= 0) {
        array.splice(index, 0, obj)
    } else {
        array.push(obj)
    }
    setDataByKeyMapValue(array, keyValue, obj);
    if (!isBatch) {
        return _utils.default.trivialPromise((0, _config.default)().useLegacyStoreResult ? data : obj, keyValue)
    }
}

function remove(keyInfo, array, key, isBatch, logError) {
    var index = indexByKey(keyInfo, array, key);
    if (index > -1) {
        array.splice(index, 1);
        setDataByKeyMapValue(array, key, null)
    }
    if (!isBatch) {
        return _utils.default.trivialPromise(key)
    } else {
        if (index < 0) {
            return getErrorResult(isBatch, logError, "E4009")
        }
    }
}

function indexByKey(keyInfo, array, key) {
    var keyExpr = keyInfo.key();
    if (!getHasKeyCacheValue(array, key)) {
        return -1
    }
    for (var i = 0, arrayLength = array.length; i < arrayLength; i++) {
        if (_utils.default.keysEqual(keyExpr, keyInfo.keyOf(array[i]), key)) {
            return i
        }
    }
    return -1
}
