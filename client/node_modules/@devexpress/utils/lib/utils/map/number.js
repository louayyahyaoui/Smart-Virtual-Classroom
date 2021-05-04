"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var constants_1 = require("../../constants");
var min_max_1 = require("../../class/min-max");
var NumberMapUtils = (function () {
    function NumberMapUtils() {
    }
    NumberMapUtils.forEach = function (map, callback) {
        for (var key in map) {
            if (Object.prototype.hasOwnProperty.call(map, key))
                callback(map[key], parseInt(key));
        }
    };
    NumberMapUtils.map = function (map, callback) {
        var result = {};
        for (var key in map) {
            if (Object.prototype.hasOwnProperty.call(map, key))
                result[key] = callback(map[key], parseInt(key));
        }
        return result;
    };
    NumberMapUtils.reducedMap = function (map, callback) {
        var result = {};
        for (var key in map) {
            if (Object.prototype.hasOwnProperty.call(map, key)) {
                var newItem = callback(map[key], parseInt(key));
                if (newItem !== null)
                    result[key] = newItem;
            }
        }
        return result;
    };
    NumberMapUtils.clear = function (map) {
        for (var key in map) {
            if (Object.prototype.hasOwnProperty.call(map, key))
                delete map[key];
        }
    };
    NumberMapUtils.shallowCopy = function (map) {
        return NumberMapUtils.map(map, function (val) { return val; });
    };
    NumberMapUtils.deepCopy = function (map) {
        return NumberMapUtils.map(map, function (val) { return val.clone(); });
    };
    NumberMapUtils.isEmpty = function (map) {
        for (var key in map) {
            if (Object.prototype.hasOwnProperty.call(map, key))
                return false;
        }
        return true;
    };
    NumberMapUtils.accumulate = function (map, initAccValue, callback) {
        var acc = initAccValue;
        for (var key in map) {
            if (Object.prototype.hasOwnProperty.call(map, key))
                acc = callback(acc, map[key], parseInt(key));
        }
        return acc;
    };
    NumberMapUtils.keyBy = function (map, callback) {
        for (var key in map) {
            if (Object.prototype.hasOwnProperty.call(map, key)) {
                var intKey = parseInt(key);
                if (callback(map[key], intKey))
                    return intKey;
            }
        }
        return null;
    };
    NumberMapUtils.elementBy = function (map, callback) {
        var key = NumberMapUtils.keyBy(map, callback);
        return key === null ? null : map[key];
    };
    NumberMapUtils.containsBy = function (map, callback) {
        return NumberMapUtils.keyBy(map, callback) !== null;
    };
    NumberMapUtils.toList = function (map) {
        return NumberMapUtils.toListBy(map, function (elem) { return elem; });
    };
    NumberMapUtils.toListBy = function (map, callback, maxElements) {
        if (maxElements === void 0) { maxElements = constants_1.Constants.MAX_SAFE_INTEGER; }
        var result = [];
        for (var key in map) {
            if (Object.prototype.hasOwnProperty.call(map, key)) {
                result.push(callback(map[key], parseInt(key)));
                if (!--maxElements)
                    break;
            }
        }
        return result;
    };
    NumberMapUtils.anyOf = function (map, callback) {
        for (var key in map) {
            if (Object.prototype.hasOwnProperty.call(map, key)) {
                var res = callback(map[key], parseInt(key));
                if (res !== null)
                    return res;
            }
        }
        return null;
    };
    NumberMapUtils.unsafeAnyOf = function (map, callback) {
        for (var key in map) {
            if (Object.prototype.hasOwnProperty.call(map, key)) {
                var res = callback(map[key], parseInt(key));
                if (res)
                    return res;
            }
        }
        return null;
    };
    NumberMapUtils.allOf = function (map, callback) {
        for (var key in map) {
            if (Object.prototype.hasOwnProperty.call(map, key)) {
                if (!callback(map[key], parseInt(key)))
                    return false;
            }
        }
        return true;
    };
    NumberMapUtils.mapLength = function (map) {
        var length = 0;
        for (var key in map) {
            if (Object.prototype.hasOwnProperty.call(map, key))
                length++;
        }
        return length;
    };
    NumberMapUtils.min = function (map, getValue) {
        var res = NumberMapUtils.minExtended(map, getValue);
        return res === null ? null : res.minElement;
    };
    NumberMapUtils.max = function (map, getValue) {
        var res = NumberMapUtils.maxExtended(map, getValue);
        return res === null ? null : res.maxElement;
    };
    NumberMapUtils.minMax = function (map, getValue) {
        var res = NumberMapUtils.minMaxExtended(map, getValue);
        return res === null ? null : new min_max_1.MinMax(res.minElement, res.maxElement);
    };
    NumberMapUtils.minExtended = function (map, getValue) {
        var minElement;
        var minValue = constants_1.Constants.MAX_SAFE_INTEGER;
        for (var key in map) {
            if (Object.prototype.hasOwnProperty.call(map, key)) {
                var currElem = map[key];
                var currValue = getValue(currElem, parseInt(key));
                if (currValue < minValue) {
                    minElement = currElem;
                    minValue = currValue;
                }
            }
        }
        return minElement === undefined ? null : new min_max_1.ExtendedMin(minElement, minValue);
    };
    NumberMapUtils.maxExtended = function (map, getValue) {
        var maxElement;
        var maxValue = constants_1.Constants.MIN_SAFE_INTEGER;
        for (var key in map) {
            if (Object.prototype.hasOwnProperty.call(map, key)) {
                var currElem = map[key];
                var currValue = getValue(currElem, parseInt(key));
                if (currValue > maxValue) {
                    maxElement = currElem;
                    maxValue = currValue;
                }
            }
        }
        return maxElement === undefined ? null : new min_max_1.ExtendedMax(maxElement, maxValue);
    };
    NumberMapUtils.minMaxExtended = function (map, getValue) {
        var minElement;
        var minValue = constants_1.Constants.MAX_SAFE_INTEGER;
        var maxElement;
        var maxValue = constants_1.Constants.MIN_SAFE_INTEGER;
        for (var key in map) {
            if (Object.prototype.hasOwnProperty.call(map, key)) {
                var currElem = map[key];
                var currValue = getValue(currElem, parseInt(key));
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
    NumberMapUtils.maxByCmp = function (map, cmp) {
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
    NumberMapUtils.minByCmp = function (map, cmp) {
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
    return NumberMapUtils;
}());
exports.NumberMapUtils = NumberMapUtils;
