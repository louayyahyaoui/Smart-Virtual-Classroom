"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var min_max_1 = require("../../class/min-max");
var constants_1 = require("../../constants");
var StringMapUtils = (function () {
    function StringMapUtils() {
    }
    StringMapUtils.forEach = function (map, callback) {
        for (var key in map) {
            if (Object.prototype.hasOwnProperty.call(map, key))
                callback(map[key], key);
        }
    };
    StringMapUtils.map = function (map, callback) {
        var result = {};
        for (var key in map) {
            if (Object.prototype.hasOwnProperty.call(map, key))
                result[key] = callback(map[key], key);
        }
        return result;
    };
    StringMapUtils.reducedMap = function (map, callback) {
        var result = {};
        for (var key in map) {
            if (Object.prototype.hasOwnProperty.call(map, key)) {
                var newItem = callback(map[key], key);
                if (newItem !== null)
                    result[key] = newItem;
            }
        }
        return result;
    };
    StringMapUtils.clear = function (map) {
        for (var key in map) {
            if (Object.prototype.hasOwnProperty.call(map, key))
                delete map[key];
        }
    };
    StringMapUtils.shallowCopy = function (map) {
        return StringMapUtils.map(map, function (val) { return val; });
    };
    StringMapUtils.deepCopy = function (map) {
        return StringMapUtils.map(map, function (val) { return val.clone(); });
    };
    StringMapUtils.isEmpty = function (map) {
        for (var key in map) {
            if (Object.prototype.hasOwnProperty.call(map, key))
                return false;
        }
        return true;
    };
    StringMapUtils.accumulate = function (map, initAccValue, callback) {
        var acc = initAccValue;
        for (var key in map) {
            if (Object.prototype.hasOwnProperty.call(map, key))
                acc = callback(acc, map[key], key);
        }
        return acc;
    };
    StringMapUtils.keyBy = function (map, callback) {
        for (var key in map) {
            if (Object.prototype.hasOwnProperty.call(map, key)) {
                if (callback(map[key], key))
                    return key;
            }
        }
        return null;
    };
    StringMapUtils.elementBy = function (map, callback) {
        var key = StringMapUtils.keyBy(map, callback);
        return key === null ? null : map[key];
    };
    StringMapUtils.containsBy = function (map, callback) {
        return StringMapUtils.keyBy(map, callback) !== null;
    };
    StringMapUtils.toList = function (map) {
        return StringMapUtils.toListBy(map, function (elem) { return elem; });
    };
    StringMapUtils.toListBy = function (map, callback, maxElements) {
        if (maxElements === void 0) { maxElements = constants_1.Constants.MAX_SAFE_INTEGER; }
        var result = [];
        for (var key in map) {
            if (Object.prototype.hasOwnProperty.call(map, key)) {
                result.push(callback(map[key], key));
                if (!--maxElements)
                    break;
            }
        }
        return result;
    };
    StringMapUtils.anyOf = function (map, callback) {
        for (var key in map) {
            if (Object.prototype.hasOwnProperty.call(map, key)) {
                var res = callback(map[key], key);
                if (res !== null)
                    return res;
            }
        }
        return null;
    };
    StringMapUtils.unsafeAnyOf = function (map, callback) {
        for (var key in map) {
            if (Object.prototype.hasOwnProperty.call(map, key)) {
                var res = callback(map[key], key);
                if (res)
                    return res;
            }
        }
        return null;
    };
    StringMapUtils.allOf = function (map, callback) {
        for (var key in map) {
            if (Object.prototype.hasOwnProperty.call(map, key)) {
                if (!callback(map[key], key))
                    return false;
            }
        }
        return true;
    };
    StringMapUtils.mapLength = function (map) {
        var length = 0;
        for (var key in map) {
            if (Object.prototype.hasOwnProperty.call(map, key))
                length++;
        }
        return length;
    };
    StringMapUtils.min = function (map, getValue) {
        var res = StringMapUtils.minExtended(map, getValue);
        return res === null ? null : res.minElement;
    };
    StringMapUtils.max = function (map, getValue) {
        var res = StringMapUtils.maxExtended(map, getValue);
        return res === null ? null : res.maxElement;
    };
    StringMapUtils.minMax = function (map, getValue) {
        var res = StringMapUtils.minMaxExtended(map, getValue);
        return res === null ? null : new min_max_1.MinMax(res.minElement, res.maxElement);
    };
    StringMapUtils.minExtended = function (map, getValue) {
        var minElement;
        var minValue = constants_1.Constants.MAX_SAFE_INTEGER;
        for (var key in map) {
            if (Object.prototype.hasOwnProperty.call(map, key)) {
                var currElem = map[key];
                var currValue = getValue(currElem, key);
                if (currValue < minValue) {
                    minElement = currElem;
                    minValue = currValue;
                }
            }
        }
        return minElement === undefined ? null : new min_max_1.ExtendedMin(minElement, minValue);
    };
    StringMapUtils.maxExtended = function (map, getValue) {
        var maxElement;
        var maxValue = constants_1.Constants.MIN_SAFE_INTEGER;
        for (var key in map) {
            if (Object.prototype.hasOwnProperty.call(map, key)) {
                var currElem = map[key];
                var currValue = getValue(currElem, key);
                if (currValue > maxValue) {
                    maxElement = currElem;
                    maxValue = currValue;
                }
            }
        }
        return maxElement === undefined ? null : new min_max_1.ExtendedMax(maxElement, maxValue);
    };
    StringMapUtils.minMaxExtended = function (map, getValue) {
        var minElement;
        var minValue = constants_1.Constants.MAX_SAFE_INTEGER;
        var maxElement;
        var maxValue = constants_1.Constants.MIN_SAFE_INTEGER;
        for (var key in map) {
            if (Object.prototype.hasOwnProperty.call(map, key)) {
                var currElem = map[key];
                var currValue = getValue(currElem, key);
                if (currValue < minValue) {
                    minElement = currElem;
                    minValue = currValue;
                }
                else if (currValue > maxValue) {
                    maxElement = currElem;
                    maxValue = currValue;
                }
            }
        }
        return minElement === undefined ? null : new min_max_1.ExtendedMinMax(minElement, minValue, maxElement, maxValue);
    };
    StringMapUtils.maxByCmp = function (map, cmp) {
        var found;
        for (var key in map) {
            if (Object.prototype.hasOwnProperty.call(map, key)) {
                if (found !== undefined) {
                    var elem = map[key];
                    if (cmp(elem, found) > 0)
                        found = elem;
                }
                else
                    found = map[key];
            }
        }
        return found === undefined ? null : found;
    };
    StringMapUtils.minByCmp = function (map, cmp) {
        var found;
        for (var key in map) {
            if (Object.prototype.hasOwnProperty.call(map, key)) {
                if (found !== undefined) {
                    var elem = map[key];
                    if (cmp(elem, found) < 0)
                        found = elem;
                }
                else
                    found = map[key];
            }
        }
        return found === undefined ? null : found;
    };
    return StringMapUtils;
}());
exports.StringMapUtils = StringMapUtils;
