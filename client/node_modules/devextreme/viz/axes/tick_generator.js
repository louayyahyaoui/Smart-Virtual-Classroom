/**
 * DevExtreme (viz/axes/tick_generator.js)
 * Version: 20.2.6
 * Build date: Tue Mar 16 2021
 *
 * Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
exports.tickGenerator = void 0;
var _utils = require("../core/utils");
var _date = _interopRequireDefault(require("../../core/utils/date"));
var _type = require("../../core/utils/type");
var _math = require("../../core/utils/math");
var _extend = require("../../core/utils/extend");

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        "default": obj
    }
}

function _slicedToArray(arr, i) {
    return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest()
}

function _nonIterableRest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
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

function _arrayLikeToArray(arr, len) {
    if (null == len || len > arr.length) {
        len = arr.length
    }
    for (var i = 0, arr2 = new Array(len); i < len; i++) {
        arr2[i] = arr[i]
    }
    return arr2
}

function _iterableToArrayLimit(arr, i) {
    if ("undefined" === typeof Symbol || !(Symbol.iterator in Object(arr))) {
        return
    }
    var _arr = [];
    var _n = true;
    var _d = false;
    var _e = void 0;
    try {
        for (var _s, _i = arr[Symbol.iterator](); !(_n = (_s = _i.next()).done); _n = true) {
            _arr.push(_s.value);
            if (i && _arr.length === i) {
                break
            }
        }
    } catch (err) {
        _d = true;
        _e = err
    } finally {
        try {
            if (!_n && null != _i.return) {
                _i.return()
            }
        } finally {
            if (_d) {
                throw _e
            }
        }
    }
    return _arr
}

function _arrayWithHoles(arr) {
    if (Array.isArray(arr)) {
        return arr
    }
}
var convertDateUnitToMilliseconds = _date.default.convertDateUnitToMilliseconds;
var dateToMilliseconds = _date.default.dateToMilliseconds;
var math = Math;
var mathAbs = math.abs;
var mathFloor = math.floor;
var mathCeil = math.ceil;
var mathPow = math.pow;
var NUMBER_MULTIPLIERS = [1, 2, 2.5, 5];
var LOGARITHMIC_MULTIPLIERS = [1, 2, 3, 5];
var DATETIME_MULTIPLIERS = {
    millisecond: [1, 2, 5, 10, 25, 50, 100, 250, 500],
    second: [1, 2, 3, 5, 10, 15, 20, 30],
    minute: [1, 2, 3, 5, 10, 15, 20, 30],
    hour: [1, 2, 3, 4, 6, 8, 12],
    day: [1, 2],
    week: [1, 2],
    month: [1, 2, 3, 6]
};
var DATETIME_MULTIPLIERS_WITH_BIG_WEEKEND = (0, _extend.extend)({}, DATETIME_MULTIPLIERS, {
    day: [1]
});
var DATETIME_MINOR_MULTIPLIERS = {
    millisecond: [1, 2, 5, 10, 25, 50, 100, 250, 500],
    second: [1, 2, 3, 5, 10, 15, 20, 30],
    minute: [1, 2, 3, 5, 10, 15, 20, 30],
    hour: [1, 2, 3, 4, 6, 8, 12],
    day: [1, 2, 3, 7, 14],
    month: [1, 2, 3, 6]
};
var MINOR_DELIMITERS = [2, 4, 5, 8, 10];
var VISIBILITY_DELIMITER = 3;
var MINUTE = 6e4;

function dummyGenerator(options) {
    return function(data, screenDelta, tickInterval, forceTickInterval) {
        var count = mathFloor(screenDelta / options.axisDivisionFactor);
        count = count < 1 ? 1 : count;
        var interval = screenDelta / count;
        return {
            ticks: interval > 0 ? Array.apply(null, new Array(count + 1)).map(function(_, i) {
                return interval * i
            }) : [],
            tickInterval: interval
        }
    }
}

function discreteGenerator(options) {
    return function(data, screenDelta, tickInterval, forceTickInterval) {
        var categories = (0, _utils.getCategoriesInfo)(data.categories, data.min, data.max).categories;
        return {
            ticks: categories,
            tickInterval: mathCeil(categories.length * options.axisDivisionFactor / screenDelta)
        }
    }
}
var getValue = function(value) {
    return value
};
var getLogValue = function(base, allowNegatives, linearThreshold) {
    return function(value) {
        return (0, _utils.getLogExt)(value, base, allowNegatives, linearThreshold)
    }
};
var raiseTo = function(base, allowNegatives, linearThreshold) {
    return function(value) {
        return (0, _utils.raiseToExt)(value, base, allowNegatives, linearThreshold)
    }
};
var mathRaiseTo = function(base) {
    return function(value) {
        return (0, _utils.raiseTo)(value, base)
    }
};
var logAbsValue = function(base) {
    return function(value) {
        return 0 === value ? 0 : (0, _utils.getLog)(mathAbs(value), base)
    }
};
var correctValueByInterval = function(post, round, getValue) {
    return function(value, interval) {
        return (0, _math.adjust)(post(round((0, _math.adjust)(getValue(value) / interval)) * interval))
    }
};

function correctMinValueByEndOnTick(floorFunc, ceilFunc, resolveEndOnTick, endOnTick) {
    if ((0, _type.isDefined)(endOnTick)) {
        return endOnTick ? floorFunc : ceilFunc
    }
    return function(value, interval, businessViewInfo, forceEndOnTick) {
        var floorTickValue = floorFunc(value, interval);
        if (value - floorTickValue === 0 || !(0, _type.isDefined)(businessViewInfo) || resolveEndOnTick(value, floorTickValue, interval, businessViewInfo) || forceEndOnTick) {
            return floorTickValue
        }
        return ceilFunc(value, interval)
    }
}

function resolveEndOnTick(curValue, tickValue, interval, businessViewInfo) {
    var prevTickDataDiff = interval - mathAbs(tickValue - curValue);
    var intervalCount = math.max(mathCeil(businessViewInfo.businessDelta / interval), 2);
    var businessRatio = businessViewInfo.screenDelta / (intervalCount * interval);
    var potentialTickScreenDiff = math.round(businessRatio * prevTickDataDiff);
    var delimiterFactor = (0, _utils.getLogExt)(businessRatio * interval / businessViewInfo.axisDivisionFactor, 2) + 1;
    var delimiterMultiplier = (businessViewInfo.isSpacedMargin ? 2 : 1) * delimiterFactor;
    var screenDelimiter = math.round(VISIBILITY_DELIMITER * delimiterMultiplier);
    return businessViewInfo.businessDelta > businessViewInfo.interval && potentialTickScreenDiff >= screenDelimiter
}

function resolveEndOnTickLog(base) {
    return function(curValue, tickValue, interval, businessViewInfo) {
        return resolveEndOnTick((0, _utils.getLogExt)(curValue, base), (0, _utils.getLogExt)(tickValue, base), interval, businessViewInfo)
    }
}

function resolveEndOnTickDate(curValue, tickValue, interval, businessViewInfo) {
    return resolveEndOnTick(curValue.valueOf(), tickValue.valueOf(), dateToMilliseconds(interval), businessViewInfo)
}

function getBusinessDelta(data, breaks) {
    var spacing = 0;
    if (breaks) {
        spacing = breaks.reduce(function(prev, item) {
            return prev + (item.to - item.from)
        }, 0)
    }
    return mathAbs(data.max - data.min - spacing)
}

function getBusinessDeltaLog(base, allowNegatives, linearThreshold) {
    var getLog = getLogValue(base, allowNegatives, linearThreshold);
    return function(data, breaks) {
        var spacing = 0;
        if (breaks) {
            spacing = breaks.reduce(function(prev, item) {
                return prev + mathAbs(getLog(item.to / item.from))
            }, 0)
        }
        return mathCeil(mathAbs(getLog(data.max) - getLog(data.min)) - spacing)
    }
}

function getIntervalByFactor(businessDelta, screenDelta, axisDivisionFactor, addTickCount) {
    var count = screenDelta / axisDivisionFactor - (addTickCount || 0);
    count = count < 1 ? 1 : count;
    return businessDelta / count
}

function getMultiplierFactor(interval, factorDelta) {
    return mathPow(10, mathFloor((0, _utils.getLogExt)(interval, 10)) + (factorDelta || 0))
}

function calculateTickInterval(businessDelta, screenDelta, tickInterval, forceTickInterval, axisDivisionFactor, multipliers, allowDecimals, addTickCount, _, minTickInterval) {
    var interval = getIntervalByFactor(businessDelta, screenDelta, axisDivisionFactor, addTickCount);
    var result = 1;
    var onlyIntegers = false === allowDecimals;
    if (!forceTickInterval || !tickInterval) {
        if (interval >= 1 || !onlyIntegers && interval > 0) {
            result = adjustInterval(interval, multipliers, onlyIntegers)
        }
        if (!tickInterval || !forceTickInterval && tickInterval < result) {
            tickInterval = result
        }
    }
    if (!forceTickInterval && minTickInterval) {
        minTickInterval = adjustInterval(minTickInterval, multipliers, onlyIntegers);
        if (minTickInterval > tickInterval) {
            tickInterval = minTickInterval
        }
    }
    return tickInterval
}

function adjustInterval(interval, multipliers, onlyIntegers) {
    var factor = getMultiplierFactor(interval, -1);
    var result = 1;
    multipliers = multipliers || NUMBER_MULTIPLIERS;
    if (interval > 0) {
        interval /= factor;
        result = multipliers.concat(10 * multipliers[0]).map(function(m) {
            return 10 * m
        }).reduce(function(r, m) {
            if (.1 === factor && onlyIntegers && 25 === m) {
                return r
            }
            return r < interval ? m : r
        }, 0);
        result = (0, _math.adjust)(result * factor, factor)
    }
    return result
}

function calculateMinorTickInterval(businessDelta, screenDelta, tickInterval, axisDivisionFactor) {
    var interval = getIntervalByFactor(businessDelta, screenDelta, axisDivisionFactor);
    return tickInterval || MINOR_DELIMITERS.reduce(function(r, d) {
        var cur = businessDelta / d;
        return cur >= interval ? cur : r
    }, 0)
}

function getCalculateTickIntervalLog(skipCalculationLimits) {
    return function(businessDelta, screenDelta, tickInterval, forceTickInterval, axisDivisionFactor, multipliers, allowDecimals, _, __, minTickInterval) {
        var interval = getIntervalByFactor(businessDelta, screenDelta, axisDivisionFactor);
        var result = 0;
        var adjustInterval = getAdjustIntervalLog(skipCalculationLimits);
        if (!forceTickInterval || !tickInterval) {
            if (interval > 0) {
                result = adjustInterval(interval, multipliers)
            }
            if (!tickInterval || !forceTickInterval && tickInterval < result) {
                tickInterval = result
            }
        }
        if (!forceTickInterval && minTickInterval) {
            minTickInterval = adjustInterval(minTickInterval, multipliers);
            if (minTickInterval > tickInterval) {
                tickInterval = minTickInterval
            }
        }
        return tickInterval
    }
}

function getAdjustIntervalLog(skipCalculationLimits) {
    return function(interval, multipliers) {
        var factor = getMultiplierFactor(interval);
        multipliers = multipliers || LOGARITHMIC_MULTIPLIERS;
        if (!skipCalculationLimits && factor < 1) {
            factor = 1
        }
        return multipliers.concat(10 * multipliers[0]).reduce(function(r, m) {
            return r < interval ? m * factor : r
        }, 0)
    }
}

function getDataTimeMultipliers(gapSize) {
    if (gapSize && gapSize > 2) {
        return DATETIME_MULTIPLIERS_WITH_BIG_WEEKEND
    } else {
        return DATETIME_MULTIPLIERS
    }
}

function numbersReducer(interval, key) {
    return function(r, m) {
        if (!r && interval <= convertDateUnitToMilliseconds(key, m)) {
            r = {};
            r[key + "s"] = m
        }
        return r
    }
}

function yearsReducer(interval, factor) {
    return function(r, m) {
        var years = factor * m;
        if (!r && interval <= convertDateUnitToMilliseconds("year", years) && 2.5 !== years) {
            r = {
                years: years
            }
        }
        return r
    }
}

function calculateTickIntervalDateTime(businessDelta, screenDelta, tickInterval, forceTickInterval, axisDivisionFactor, multipliers, allowDecimals, addTickCount, gapSize, minTickInterval) {
    if (!forceTickInterval || !tickInterval) {
        var result = adjustIntervalDateTime(getIntervalByFactor(businessDelta, screenDelta, axisDivisionFactor), multipliers, null, gapSize);
        if (!tickInterval || !forceTickInterval && dateToMilliseconds(tickInterval) <= dateToMilliseconds(result)) {
            tickInterval = result
        }
    }
    if (!forceTickInterval && minTickInterval) {
        minTickInterval = adjustIntervalDateTime(minTickInterval, multipliers, null, gapSize);
        if (dateToMilliseconds(minTickInterval) > dateToMilliseconds(tickInterval)) {
            tickInterval = minTickInterval
        }
    }
    return tickInterval
}

function adjustIntervalDateTime(interval, multipliers, _, gapSize) {
    var result;
    multipliers = multipliers || getDataTimeMultipliers(gapSize);
    for (var key in multipliers) {
        result = multipliers[key].reduce(numbersReducer(interval, key), result);
        if (result) {
            break
        }
    }
    if (!result) {
        for (var factor = 1;; factor *= 10) {
            result = NUMBER_MULTIPLIERS.reduce(yearsReducer(interval, factor), result);
            if (result) {
                break
            }
        }
    }
    return result
}

function calculateMinorTickIntervalDateTime(businessDelta, screenDelta, tickInterval, axisDivisionFactor) {
    return calculateTickIntervalDateTime(businessDelta, screenDelta, tickInterval, true, axisDivisionFactor, DATETIME_MINOR_MULTIPLIERS)
}

function getTickIntervalByCustomTicks(getValue, postProcess) {
    return function(ticks) {
        return ticks ? postProcess(mathAbs((0, _math.adjust)(getValue(ticks[1]) - getValue(ticks[0])))) || void 0 : void 0
    }
}

function addInterval(value, interval, isNegative) {
    return _date.default.addInterval(value, interval, isNegative)
}

function addIntervalLog(log, raise) {
    return function(value, interval, isNegative) {
        return raise(addInterval(log(value), interval, isNegative))
    }
}

function addIntervalDate(value, interval, isNegative) {
    return addInterval(value, interval, isNegative)
}

function addIntervalWithBreaks(addInterval, breaks, correctValue) {
    breaks = breaks.filter(function(b) {
        return !b.gapSize
    });
    return function(value, interval, isNegative) {
        var breakSize;
        value = addInterval(value, interval, isNegative);
        if (!breaks.every(function(item) {
                if (value >= addInterval(item.from, interval) && addInterval(value, interval) < item.to) {
                    breakSize = item.to - item.from - 2 * (addInterval(item.from, interval) - item.from)
                }
                return !breakSize
            })) {
            value = correctValue(addInterval(value, breakSize), interval)
        }
        return value
    }
}

function calculateTicks(addInterval, correctMinValue, adjustInterval, resolveEndOnTick) {
    return function(data, tickInterval, endOnTick, gaps, breaks, businessDelta, screenDelta, axisDivisionFactor, generateExtraTick) {
        var correctTickValue = correctTickValueOnGapSize(addInterval, gaps);
        var min = data.min;
        var max = data.max;
        var businessViewInfo = {
            screenDelta: screenDelta,
            businessDelta: businessDelta,
            axisDivisionFactor: axisDivisionFactor,
            isSpacedMargin: data.isSpacedMargin,
            interval: tickInterval
        };
        var cur = correctMinValue(min, tickInterval, businessViewInfo);
        var ticks = [];
        if (null !== breaks && void 0 !== breaks && breaks.length) {
            addInterval = addIntervalWithBreaks(addInterval, breaks, correctMinValue)
        }
        if (cur > max) {
            cur = correctMinValue(min, adjustInterval(businessDelta / 2), businessViewInfo);
            if (cur > max) {
                endOnTick = true;
                cur = correctMinValue(min, tickInterval, businessViewInfo, endOnTick)
            }
        }
        cur = correctTickValue(cur);
        var prev;
        while (cur < max && cur !== prev || generateExtraTick && cur <= max) {
            ticks.push(cur);
            prev = cur;
            cur = correctTickValue(addInterval(cur, tickInterval))
        }
        if (endOnTick || cur - max === 0 || !(0, _type.isDefined)(endOnTick) && resolveEndOnTick(max, cur, tickInterval, businessViewInfo)) {
            ticks.push(cur)
        }
        return ticks
    }
}

function calculateMinorTicks(updateTickInterval, addInterval, correctMinValue, correctTickValue, ceil) {
    return function(min, max, majorTicks, minorTickInterval, tickInterval, breaks, maxCount) {
        var factor = tickInterval / minorTickInterval;
        var lastMajor = majorTicks[majorTicks.length - 1];
        var firstMajor = majorTicks[0];
        var tickBalance = maxCount - 1;
        if (null !== breaks && void 0 !== breaks && breaks.length) {
            addInterval = addIntervalWithBreaks(addInterval, breaks, correctMinValue)
        }
        minorTickInterval = updateTickInterval(minorTickInterval, firstMajor, firstMajor, factor);
        if (0 === minorTickInterval) {
            return []
        }
        var cur = correctTickValue(correctMinValue(min, tickInterval, min), minorTickInterval);
        minorTickInterval = updateTickInterval(minorTickInterval, firstMajor, cur, factor);
        var ticks = [];
        while (cur < firstMajor && (!tickBalance || tickBalance > 0)) {
            cur >= min && ticks.push(cur);
            tickBalance--;
            cur = addInterval(cur, minorTickInterval)
        }
        var middleTicks = majorTicks.reduce(function(r, tick) {
            tickBalance = maxCount - 1;
            if (null === r.prevTick) {
                r.prevTick = tick;
                return r
            }
            minorTickInterval = updateTickInterval(minorTickInterval, tick, r.prevTick, factor);
            var cur = correctTickValue(r.prevTick, minorTickInterval);
            while (cur < tick && (!tickBalance || tickBalance > 0)) {
                cur !== r.prevTick && r.minors.push(cur);
                tickBalance--;
                cur = addInterval(cur, minorTickInterval)
            }
            r.prevTick = tick;
            return r
        }, {
            prevTick: null,
            minors: []
        });
        ticks = ticks.concat(middleTicks.minors);
        var maxValue = ceil(max, tickInterval, min);
        minorTickInterval = updateTickInterval(minorTickInterval, maxValue, maxValue, factor);
        cur = correctTickValue(lastMajor, minorTickInterval);
        var prev;
        while (cur < max && cur !== prev) {
            ticks.push(cur);
            prev = cur;
            cur = addInterval(cur, minorTickInterval)
        }
        if (lastMajor - max !== 0 && cur - max === 0) {
            ticks.push(cur)
        }
        return ticks
    }
}

function filterTicks(ticks, breaks) {
    if (breaks.length) {
        var result = breaks.reduce(function(result, b) {
            var tmpTicks = [];
            var i;
            for (i = result[1]; i < ticks.length; i++) {
                var tickValue = ticks[i];
                if (tickValue < b.from) {
                    tmpTicks.push(tickValue)
                }
                if (tickValue >= b.to) {
                    break
                }
            }
            return [result[0].concat(tmpTicks), i]
        }, [
            [], 0
        ]);
        return result[0].concat(ticks.slice(result[1]))
    }
    return ticks
}

function correctTickValueOnGapSize(addInterval, breaks) {
    return function(value) {
        var gapSize;
        if (!breaks.every(function(item) {
                if (value >= item.from && value < item.to) {
                    gapSize = item.gapSize
                }
                return !gapSize
            })) {
            value = addInterval(value, gapSize)
        }
        return value
    }
}

function generator(options, getBusinessDelta, calculateTickInterval, calculateMinorTickInterval, getMajorTickIntervalByCustomTicks, getMinorTickIntervalByCustomTicks, convertTickInterval, calculateTicks, calculateMinorTicks, processScaleBreaks) {
    function processCustomTicks(customTicks) {
        return {
            tickInterval: getMajorTickIntervalByCustomTicks(customTicks.majors),
            ticks: customTicks.majors || [],
            minorTickInterval: getMinorTickIntervalByCustomTicks(customTicks.minors),
            minorTicks: customTicks.minors || []
        }
    }

    function correctUserTickInterval(tickInterval, businessDelta, limit) {
        if (tickInterval && businessDelta / convertTickInterval(tickInterval) >= limit + 1) {
            options.incidentOccurred("W2003");
            tickInterval = void 0
        }
        return tickInterval
    }

    function generateMajorTicks(ticks, data, businessDelta, screenDelta, tickInterval, forceTickInterval, customTicks, breaks) {
        if (customTicks.majors) {
            ticks.breaks = breaks;
            return ticks
        }
        var gaps = breaks.filter(function(b) {
            return b.gapSize
        });
        var majorTicks;
        tickInterval = options.skipCalculationLimits ? tickInterval : correctUserTickInterval(tickInterval, businessDelta, screenDelta);
        tickInterval = calculateTickInterval(businessDelta, screenDelta, tickInterval, forceTickInterval, options.axisDivisionFactor, options.numberMultipliers, options.allowDecimals, breaks.length, gaps[0] && gaps[0].gapSize.days, options.minTickInterval);
        if (!options.skipTickGeneration) {
            majorTicks = calculateTicks(data, tickInterval, options.endOnTick, gaps, breaks, businessDelta, screenDelta, options.axisDivisionFactor, options.generateExtraTick);
            breaks = processScaleBreaks(breaks, majorTicks, tickInterval);
            majorTicks = filterTicks(majorTicks, breaks);
            ticks.breaks = breaks;
            ticks.ticks = ticks.ticks.concat(majorTicks)
        }
        ticks.tickInterval = tickInterval;
        return ticks
    }

    function generateMinorTicks(ticks, data, businessDelta, screenDelta, minorTickInterval, minorTickCount, customTicks) {
        if (!options.calculateMinors) {
            return ticks
        }
        if (customTicks.minors) {
            return ticks
        }
        var minorBusinessDelta = convertTickInterval(ticks.tickInterval);
        var minorScreenDelta = screenDelta * minorBusinessDelta / businessDelta;
        var breaks = ticks.breaks;
        if (!minorTickInterval && minorTickCount) {
            minorTickInterval = getMinorTickIntervalByCustomTicks([minorBusinessDelta / (minorTickCount + 1), minorBusinessDelta / (minorTickCount + 1) * 2])
        } else {
            minorTickCount = void 0
        }
        minorTickInterval = correctUserTickInterval(minorTickInterval, minorBusinessDelta, minorScreenDelta);
        minorTickInterval = calculateMinorTickInterval(minorBusinessDelta, minorScreenDelta, minorTickInterval, options.minorAxisDivisionFactor);
        ticks.minorTicks = filterTicks(ticks.minorTicks.concat(calculateMinorTicks(data.min, data.max, ticks.ticks, minorTickInterval, ticks.tickInterval, breaks, minorTickCount)), breaks);
        ticks.minorTickInterval = minorTickInterval;
        return ticks
    }
    return function(data, screenDelta, tickInterval, forceTickInterval, customTicks, minorTickInterval, minorTickCount, breaks) {
        customTicks = customTicks || {};
        var businessDelta = getBusinessDelta(data, breaks);
        var result = processCustomTicks(customTicks);
        if (!isNaN(businessDelta)) {
            if (0 === businessDelta && !customTicks.majors) {
                result.ticks = [data.min]
            } else {
                result = generateMajorTicks(result, data, businessDelta, screenDelta, tickInterval, forceTickInterval, customTicks, breaks || []);
                if (!options.skipTickGeneration && businessDelta > 0) {
                    result = generateMinorTicks(result, data, businessDelta, screenDelta, minorTickInterval, minorTickCount, customTicks)
                }
            }
        }
        return result
    }
}

function getBaseTick(breakValue, _ref, interval, getValue) {
    var _ref2 = _slicedToArray(_ref, 2),
        tick = _ref2[0],
        insideTick = _ref2[1];
    if (!(0, _type.isDefined)(tick) || mathAbs(getValue(breakValue) - getValue(tick)) / interval > .25) {
        if ((0, _type.isDefined)(insideTick)) {
            tick = insideTick
        } else {
            if (!(0, _type.isDefined)(tick)) {
                tick = breakValue
            }
        }
    }
    return tick
}

function getScaleBreaksProcessor(convertTickInterval, getValue, addCorrection) {
    return function(breaks, ticks, tickInterval) {
        var interval = convertTickInterval(tickInterval);
        var correction = .5 * interval;
        return breaks.reduce(function(result, b) {
            var breakTicks = ticks.filter(function(tick) {
                return tick <= b.from
            });
            var from = addCorrection(getBaseTick(b.from, [].concat(breakTicks[breakTicks.length - 1], ticks[breakTicks.length]), interval, getValue), correction);
            breakTicks = ticks.filter(function(tick) {
                return tick >= b.to
            });
            var to = addCorrection(getBaseTick(b.to, [].concat(breakTicks[0], ticks[ticks.length - breakTicks.length - 1]), interval, getValue), -correction);
            if (getValue(to) - getValue(from) < interval && !b.gapSize) {
                return result
            }
            if (b.gapSize) {
                return result.concat([b])
            }
            return result.concat([{
                from: from,
                to: to,
                cumulativeWidth: b.cumulativeWidth
            }])
        }, [])
    }
}

function numericGenerator(options) {
    var floor = correctValueByInterval(getValue, mathFloor, getValue);
    var ceil = correctValueByInterval(getValue, mathCeil, getValue);
    var calculateTickIntervalByCustomTicks = getTickIntervalByCustomTicks(getValue, getValue);
    return generator(options, getBusinessDelta, calculateTickInterval, calculateMinorTickInterval, calculateTickIntervalByCustomTicks, calculateTickIntervalByCustomTicks, getValue, calculateTicks(addInterval, correctMinValueByEndOnTick(floor, ceil, resolveEndOnTick, options.endOnTick), adjustInterval, resolveEndOnTick), calculateMinorTicks(getValue, addInterval, floor, addInterval, getValue), getScaleBreaksProcessor(getValue, getValue, function(value, correction) {
        return value + correction
    }))
}
var correctValueByIntervalLog = function(post, getRound, getValue) {
    return function(value, interval) {
        return (0, _math.sign)(value) * (0, _math.adjust)(post(getRound(value)((0, _math.adjust)(getValue(value) / interval)) * interval))
    }
};

function logarithmicGenerator(options) {
    var base = options.logBase;
    var raise = raiseTo(base, options.allowNegatives, options.linearThreshold);
    var log = getLogValue(base, options.allowNegatives, options.linearThreshold);
    var absLog = logAbsValue(base);
    var absRaise = mathRaiseTo(base);
    var absFloor = function(value) {
        return value < 0 ? mathCeil : mathFloor
    };
    var absCeil = function(value) {
        return value < 0 ? mathFloor : mathCeil
    };
    var floor = correctValueByIntervalLog(absRaise, absFloor, absLog);
    var ceil = correctValueByIntervalLog(absRaise, absCeil, absLog);
    var ceilNumber = correctValueByInterval(getValue, mathCeil, getValue);
    return generator(options, getBusinessDeltaLog(base, options.allowNegatives, options.linearThreshold), getCalculateTickIntervalLog(options.skipCalculationLimits), calculateMinorTickInterval, getTickIntervalByCustomTicks(log, getValue), getTickIntervalByCustomTicks(getValue, getValue), getValue, calculateTicks(addIntervalLog(log, raise), correctMinValueByEndOnTick(floor, ceil, resolveEndOnTickLog(base), options.endOnTick), getAdjustIntervalLog(options.skipCalculationLimits), resolveEndOnTickLog(base)), calculateMinorTicks(function(_, tick, prevTick, factor) {
        return Math.max(Math.abs(tick), Math.abs(prevTick)) / factor
    }, addInterval, floor, ceilNumber, ceil), getScaleBreaksProcessor(getValue, log, function(value, correction) {
        return raise(log(value) + correction)
    }))
}

function dateGenerator(options) {
    function floor(value, interval) {
        var floorNumber = correctValueByInterval(getValue, mathFloor, getValue);
        var intervalObject = (0, _type.isString)(interval) ? _date.default.getDateIntervalByString(interval.toLowerCase()) : interval;
        var divider = dateToMilliseconds(interval);
        if (intervalObject.days % 7 === 0 || interval.quarters) {
            intervalObject = adjustIntervalDateTime(divider)
        }
        var correctDateWithUnitBeginning = function(v) {
            return _date.default.correctDateWithUnitBeginning(v, intervalObject, null, options.firstDayOfWeek)
        };
        var floorAtStartDate = function(v) {
            return new Date(mathFloor((v.getTime() - v.getTimezoneOffset() * MINUTE) / divider) * divider + v.getTimezoneOffset() * MINUTE)
        };
        value = correctDateWithUnitBeginning(value);
        if ("years" in intervalObject) {
            value.setFullYear(floorNumber(value.getFullYear(), intervalObject.years, 0))
        } else {
            if ("quarters" in intervalObject) {
                value = correctDateWithUnitBeginning(floorAtStartDate(value))
            } else {
                if ("months" in intervalObject) {
                    value.setMonth(floorNumber(value.getMonth(), intervalObject.months, 0))
                } else {
                    if ("weeks" in intervalObject || "days" in intervalObject) {
                        value = correctDateWithUnitBeginning(floorAtStartDate(value))
                    } else {
                        if ("hours" in intervalObject) {
                            value.setHours(floorNumber(value.getHours(), intervalObject.hours, 0))
                        } else {
                            if ("minutes" in intervalObject) {
                                value.setMinutes(floorNumber(value.getMinutes(), intervalObject.minutes, 0))
                            } else {
                                if ("seconds" in intervalObject) {
                                    value.setSeconds(floorNumber(value.getSeconds(), intervalObject.seconds, 0))
                                } else {
                                    if ("milliseconds" in intervalObject) {
                                        value = floorAtStartDate(value)
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
        return value
    }

    function ceil(value, interval) {
        var newValue = floor(value, interval);
        while (value - newValue > 0) {
            newValue = addIntervalDate(newValue, interval)
        }
        return newValue
    }
    var calculateTickIntervalByCustomTicks = getTickIntervalByCustomTicks(getValue, _date.default.convertMillisecondsToDateUnits);
    return generator(options, getBusinessDelta, calculateTickIntervalDateTime, calculateMinorTickIntervalDateTime, calculateTickIntervalByCustomTicks, calculateTickIntervalByCustomTicks, dateToMilliseconds, calculateTicks(addIntervalDate, correctMinValueByEndOnTick(floor, ceil, resolveEndOnTickDate, options.endOnTick), adjustIntervalDateTime, resolveEndOnTickDate), calculateMinorTicks(getValue, addIntervalDate, floor, addIntervalDate, getValue), getScaleBreaksProcessor(dateToMilliseconds, getValue, function(value, correction) {
        return new Date(value.getTime() + correction)
    }))
}
var tickGenerator = function(options) {
    var result;
    if (options.rangeIsEmpty) {
        result = dummyGenerator(options)
    } else {
        if ("discrete" === options.axisType) {
            result = discreteGenerator(options)
        } else {
            if ("logarithmic" === options.axisType) {
                result = logarithmicGenerator(options)
            } else {
                if ("datetime" === options.dataType) {
                    result = dateGenerator(options)
                } else {
                    result = numericGenerator(options)
                }
            }
        }
    }
    return result
};
exports.tickGenerator = tickGenerator;
