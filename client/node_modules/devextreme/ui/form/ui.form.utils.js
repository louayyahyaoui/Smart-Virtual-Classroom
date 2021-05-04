/**
 * DevExtreme (ui/form/ui.form.utils.js)
 * Version: 20.2.6
 * Build date: Tue Mar 16 2021
 *
 * Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
exports.getItemPath = exports.isFullPathContainsTabs = exports.tryGetTabPath = exports.getOptionNameFromFullName = exports.getFullOptionName = exports.isExpectedItem = exports.getTextWithoutSpaces = exports.concatPaths = exports.createItemPathByIndex = void 0;
var _type = require("../../core/utils/type");

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
var createItemPathByIndex = function(index, isTabs) {
    return "".concat(isTabs ? "tabs" : "items", "[").concat(index, "]")
};
exports.createItemPathByIndex = createItemPathByIndex;
var concatPaths = function(path1, path2) {
    if ((0, _type.isDefined)(path1) && (0, _type.isDefined)(path2)) {
        return "".concat(path1, ".").concat(path2)
    }
    return path1 || path2
};
exports.concatPaths = concatPaths;
var getTextWithoutSpaces = function(text) {
    return text ? text.replace(/\s/g, "") : void 0
};
exports.getTextWithoutSpaces = getTextWithoutSpaces;
var isExpectedItem = function(item, fieldName) {
    return item && (item.dataField === fieldName || item.name === fieldName || getTextWithoutSpaces(item.title) === fieldName || "group" === item.itemType && getTextWithoutSpaces(item.caption) === fieldName)
};
exports.isExpectedItem = isExpectedItem;
var getFullOptionName = function(path, optionName) {
    return "".concat(path, ".").concat(optionName)
};
exports.getFullOptionName = getFullOptionName;
var getOptionNameFromFullName = function(fullName) {
    var parts = fullName.split(".");
    return parts[parts.length - 1].replace(/\[\d+]/, "")
};
exports.getOptionNameFromFullName = getOptionNameFromFullName;
var tryGetTabPath = function(fullPath) {
    var pathParts = fullPath.split(".");
    var resultPathParts = _toConsumableArray(pathParts);
    for (var i = pathParts.length - 1; i >= 0; i--) {
        if (isFullPathContainsTabs(pathParts[i])) {
            return resultPathParts.join(".")
        }
        resultPathParts.splice(i, 1)
    }
    return ""
};
exports.tryGetTabPath = tryGetTabPath;
var isFullPathContainsTabs = function(fullPath) {
    return fullPath.indexOf("tabs") > -1
};
exports.isFullPathContainsTabs = isFullPathContainsTabs;
var getItemPath = function getItemPath(items, item, isTabs) {
    var index = items.indexOf(item);
    if (index > -1) {
        return createItemPathByIndex(index, isTabs)
    }
    for (var i = 0; i < items.length; i++) {
        var targetItem = items[i];
        var tabOrGroupItems = targetItem.tabs || targetItem.items;
        if (tabOrGroupItems) {
            var itemPath = getItemPath(tabOrGroupItems, item, targetItem.tabs);
            if (itemPath) {
                return concatPaths(createItemPathByIndex(i, isTabs), itemPath)
            }
        }
    }
};
exports.getItemPath = getItemPath;
