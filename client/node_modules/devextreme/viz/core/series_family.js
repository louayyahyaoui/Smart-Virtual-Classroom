/**
 * DevExtreme (viz/core/series_family.js)
 * Version: 20.2.6
 * Build date: Tue Mar 16 2021
 *
 * Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
exports.SeriesFamily = SeriesFamily;
var _type = require("../../core/utils/type");
var _extend = require("../../core/utils/extend");
var _iterator = require("../../core/utils/iterator");
var _math = require("../../core/utils/math");
var _common = require("../../core/utils/common");
var _utils = require("./utils");
var round = Math.round,
    abs = Math.abs,
    pow = Math.pow,
    sqrt = Math.sqrt;
var _min = Math.min;
var DEFAULT_BAR_GROUP_PADDING = .3;

function validateBarPadding(barPadding) {
    return barPadding < 0 || barPadding > 1 ? void 0 : barPadding
}

function validateBarGroupPadding(barGroupPadding) {
    return barGroupPadding < 0 || barGroupPadding > 1 ? DEFAULT_BAR_GROUP_PADDING : barGroupPadding
}

function isStackExist(series, arg) {
    return series.some(function(s) {
        return !s.getOptions().ignoreEmptyPoints || s.getPointsByArg(arg, true).some(function(point) {
            return point.hasValue()
        })
    })
}

function correctStackCoordinates(series, currentStacks, arg, stack, parameters, barsArea, seriesStackIndexCallback) {
    series.forEach(function(series) {
        var stackIndex = seriesStackIndexCallback(currentStacks.indexOf(stack), currentStacks.length);
        var points = series.getPointsByArg(arg, true);
        var barPadding = validateBarPadding(series.getOptions().barPadding);
        var barWidth = series.getOptions().barWidth;
        var offset = getOffset(stackIndex, parameters);
        var width = parameters.width;
        var extraParameters;
        if (stackIndex === -1) {
            return
        }
        if ((0, _type.isDefined)(barPadding) || (0, _type.isDefined)(barWidth)) {
            extraParameters = calculateParams(barsArea, currentStacks.length, 1 - barPadding, barWidth);
            width = extraParameters.width;
            offset = getOffset(stackIndex, extraParameters)
        }
        correctPointCoordinates(points, width, offset)
    })
}

function adjustBarSeriesDimensionsCore(series, options, seriesStackIndexCallback) {
    var commonStacks = [];
    var allArguments = [];
    var seriesInStacks = {};
    var barGroupWidth = options.barGroupWidth;
    var interval = series[0] && series[0].getArgumentAxis().getTranslator().getInterval();
    var barsArea = barGroupWidth ? interval > barGroupWidth ? barGroupWidth : interval : interval * (1 - validateBarGroupPadding(options.barGroupPadding));
    series.forEach(function(s, i) {
        var stackName = s.getStackName() || s.getBarOverlapGroup() || i.toString();
        var argument;
        for (argument in s.pointsByArgument) {
            if (allArguments.indexOf(argument.valueOf()) === -1) {
                allArguments.push(argument.valueOf())
            }
        }
        if (commonStacks.indexOf(stackName) === -1) {
            commonStacks.push(stackName);
            seriesInStacks[stackName] = []
        }
        seriesInStacks[stackName].push(s)
    });
    allArguments.forEach(function(arg) {
        var currentStacks = commonStacks.reduce(function(stacks, stack) {
            if (isStackExist(seriesInStacks[stack], arg)) {
                stacks.push(stack)
            }
            return stacks
        }, []);
        var parameters = calculateParams(barsArea, currentStacks.length);
        commonStacks.forEach(function(stack) {
            correctStackCoordinates(seriesInStacks[stack], currentStacks, arg, stack, parameters, barsArea, seriesStackIndexCallback)
        })
    })
}

function calculateParams(barsArea, count, percentWidth, fixedBarWidth) {
    var spacing;
    var width;
    if (fixedBarWidth) {
        width = _min(fixedBarWidth, barsArea / count);
        spacing = count > 1 ? round((barsArea - round(width) * count) / (count - 1)) : 0
    } else {
        if ((0, _type.isDefined)(percentWidth)) {
            width = barsArea * percentWidth / count;
            spacing = count > 1 ? round((barsArea - barsArea * percentWidth) / (count - 1)) : 0
        } else {
            spacing = round(barsArea / count * .2);
            width = (barsArea - spacing * (count - 1)) / count
        }
    }
    return {
        width: width > 1 ? round(width) : 1,
        spacing: spacing,
        middleIndex: count / 2,
        rawWidth: width
    }
}

function getOffset(stackIndex, parameters) {
    var width = parameters.rawWidth < 1 ? parameters.rawWidth : parameters.width;
    return (stackIndex - parameters.middleIndex + .5) * width - (parameters.middleIndex - stackIndex - .5) * parameters.spacing
}

function correctPointCoordinates(points, width, offset) {
    (0, _iterator.each)(points, function(_, point) {
        point.correctCoordinates({
            width: width,
            offset: offset
        })
    })
}

function getValueType(value) {
    return value >= 0 ? "positive" : "negative"
}

function getVisibleSeries(that) {
    return that.series.filter(function(s) {
        return s.isVisible()
    })
}

function getAbsStackSumByArg(stackKeepers, stackName, argument) {
    var positiveStackValue = (stackKeepers.positive[stackName] || {})[argument] || 0;
    var negativeStackValue = -(stackKeepers.negative[stackName] || {})[argument] || 0;
    return positiveStackValue + negativeStackValue
}

function getStackSumByArg(stackKeepers, stackName, argument) {
    var positiveStackValue = (stackKeepers.positive[stackName] || {})[argument] || 0;
    var negativeStackValue = (stackKeepers.negative[stackName] || {})[argument] || 0;
    return positiveStackValue + negativeStackValue
}

function getSeriesStackIndexCallback(inverted) {
    if (!inverted) {
        return function(index) {
            return index
        }
    } else {
        return function(index, stackCount) {
            return stackCount - index - 1
        }
    }
}

function isInverted(series) {
    return series[0] && series[0].getArgumentAxis().getTranslator().isInverted()
}

function adjustBarSeriesDimensions() {
    var series = getVisibleSeries(this);
    adjustBarSeriesDimensionsCore(series, this._options, getSeriesStackIndexCallback(isInverted(series)))
}

function getFirstValueSign(series) {
    var points = series.getPoints();
    var value;
    for (var i = 0; i < points.length; i++) {
        var point = points[i];
        value = point.initialValue && point.initialValue.valueOf();
        if (abs(value) > 0) {
            break
        }
    }
    return (0, _math.sign)(value)
}

function adjustStackedSeriesValues() {
    var that = this;
    var negativesAsZeroes = that._options.negativesAsZeroes;
    var series = getVisibleSeries(that);
    var stackKeepers = {
        positive: {},
        negative: {}
    };
    var holesStack = {
        left: {},
        right: {}
    };
    var lastSeriesInPositiveStack = {};
    var lastSeriesInNegativeStack = {};
    series.forEach(function(singleSeries) {
        var stackName = singleSeries.getStackName() || singleSeries.getBarOverlapGroup();
        var hole = false;
        var stack = getFirstValueSign(singleSeries) < 0 ? lastSeriesInNegativeStack : lastSeriesInPositiveStack;
        singleSeries._prevSeries = stack[stackName];
        stack[stackName] = singleSeries;
        singleSeries.holes = (0, _extend.extend)(true, {}, holesStack);
        singleSeries.getPoints().forEach(function(point, index, points) {
            var value = point.initialValue && point.initialValue.valueOf();
            var argument = point.argument.valueOf();
            var stacks = value >= 0 ? stackKeepers.positive : stackKeepers.negative;
            var isNotBarSeries = "bar" !== singleSeries.type;
            if (negativesAsZeroes && value < 0) {
                stacks = stackKeepers.positive;
                value = 0;
                point.resetValue()
            }
            stacks[stackName] = stacks[stackName] || {};
            var currentStack = stacks[stackName];
            if (currentStack[argument]) {
                if (isNotBarSeries) {
                    point.correctValue(currentStack[argument])
                }
                currentStack[argument] += value
            } else {
                currentStack[argument] = value;
                if (isNotBarSeries) {
                    point.resetCorrection()
                }
            }
            if (!point.hasValue()) {
                var prevPoint = points[index - 1];
                if (!hole && prevPoint && prevPoint.hasValue()) {
                    argument = prevPoint.argument.valueOf();
                    prevPoint._skipSetRightHole = true;
                    holesStack.right[argument] = (holesStack.right[argument] || 0) + (prevPoint.value.valueOf() - (isFinite(prevPoint.minValue) ? prevPoint.minValue.valueOf() : 0))
                }
                hole = true
            } else {
                if (hole) {
                    hole = false;
                    holesStack.left[argument] = (holesStack.left[argument] || 0) + (point.value.valueOf() - (isFinite(point.minValue) ? point.minValue.valueOf() : 0));
                    point._skipSetLeftHole = true
                }
            }
        })
    });
    series.forEach(function(singleSeries) {
        var holes = singleSeries.holes;
        singleSeries.getPoints().forEach(function(point) {
            var argument = point.argument.valueOf();
            point.resetHoles();
            !point._skipSetLeftHole && point.setHole(holes.left[argument] || holesStack.left[argument] && 0, "left");
            !point._skipSetRightHole && point.setHole(holes.right[argument] || holesStack.right[argument] && 0, "right");
            point._skipSetLeftHole = null;
            point._skipSetRightHole = null
        })
    });
    that._stackKeepers = stackKeepers;
    series.forEach(function(singleSeries) {
        singleSeries.getPoints().forEach(function(point) {
            var argument = point.argument.valueOf();
            var stackName = singleSeries.getStackName() || singleSeries.getBarOverlapGroup();
            var absTotal = getAbsStackSumByArg(stackKeepers, stackName, argument);
            var total = getStackSumByArg(stackKeepers, stackName, argument);
            point.setPercentValue(absTotal, total, holesStack.left[argument], holesStack.right[argument])
        })
    })
}

function updateStackedSeriesValues() {
    var that = this;
    var series = getVisibleSeries(that);
    var stack = that._stackKeepers;
    var stackKeepers = {
        positive: {},
        negative: {}
    };
    (0, _iterator.each)(series, function(_, singleSeries) {
        var minBarSize = singleSeries.getOptions().minBarSize;
        var valueAxisTranslator = singleSeries.getValueAxis().getTranslator();
        var minShownBusinessValue = minBarSize && valueAxisTranslator.getMinBarSize(minBarSize);
        var stackName = singleSeries.getStackName();
        (0, _iterator.each)(singleSeries.getPoints(), function(index, point) {
            if (!point.hasValue()) {
                return
            }
            var value = point.initialValue && point.initialValue.valueOf();
            var argument = point.argument.valueOf();
            if (that.fullStacked) {
                value = value / getAbsStackSumByArg(stack, stackName, argument) || 0
            }
            var updateValue = valueAxisTranslator.checkMinBarSize(value, minShownBusinessValue, point.value);
            var valueType = getValueType(updateValue);
            var currentStack = stackKeepers[valueType][stackName] = stackKeepers[valueType][stackName] || {};
            if (currentStack[argument]) {
                point.minValue = currentStack[argument];
                currentStack[argument] += updateValue
            } else {
                currentStack[argument] = updateValue
            }
            point.value = currentStack[argument]
        })
    });
    if (that.fullStacked) {
        updateFullStackedSeriesValues(series, stackKeepers)
    }
}

function updateFullStackedSeriesValues(series, stackKeepers) {
    (0, _iterator.each)(series, function(_, singleSeries) {
        var stackName = singleSeries.getStackName ? singleSeries.getStackName() : "default";
        (0, _iterator.each)(singleSeries.getPoints(), function(index, point) {
            var stackSum = getAbsStackSumByArg(stackKeepers, stackName, point.argument.valueOf());
            if (0 !== stackSum) {
                point.value = point.value / stackSum;
                if ((0, _type.isNumeric)(point.minValue)) {
                    point.minValue = point.minValue / stackSum
                }
            }
        })
    })
}

function updateBarSeriesValues() {
    (0, _iterator.each)(this.series, function(_, singleSeries) {
        var minBarSize = singleSeries.getOptions().minBarSize;
        var valueAxisTranslator = singleSeries.getValueAxis().getTranslator();
        var minShownBusinessValue = minBarSize && valueAxisTranslator.getMinBarSize(minBarSize);
        if (minShownBusinessValue) {
            (0, _iterator.each)(singleSeries.getPoints(), function(index, point) {
                if (point.hasValue()) {
                    point.value = valueAxisTranslator.checkMinBarSize(point.initialValue, minShownBusinessValue)
                }
            })
        }
    })
}

function adjustCandlestickSeriesDimensions() {
    var series = getVisibleSeries(this);
    adjustBarSeriesDimensionsCore(series, {
        barGroupPadding: .3
    }, getSeriesStackIndexCallback(isInverted(series)))
}

function adjustBubbleSeriesDimensions() {
    var series = getVisibleSeries(this);
    if (!series.length) {
        return
    }
    var options = this._options;
    var visibleAreaX = series[0].getArgumentAxis().getVisibleArea();
    var visibleAreaY = series[0].getValueAxis().getVisibleArea();
    var min = _min(visibleAreaX[1] - visibleAreaX[0], visibleAreaY[1] - visibleAreaY[0]);
    var minBubbleArea = pow(options.minBubbleSize, 2);
    var maxBubbleArea = pow(min * options.maxBubbleSize, 2);
    var equalBubbleSize = (min * options.maxBubbleSize + options.minBubbleSize) / 2;
    var minPointSize = 1 / 0;
    var maxPointSize = -(1 / 0);
    var pointSize;
    var bubbleArea;
    var sizeProportion;
    (0, _iterator.each)(series, function(_, seriesItem) {
        (0, _iterator.each)(seriesItem.getPoints(), function(_, point) {
            maxPointSize = maxPointSize > point.size ? maxPointSize : point.size;
            minPointSize = minPointSize < point.size ? minPointSize : point.size
        })
    });
    var sizeDispersion = maxPointSize - minPointSize;
    var areaDispersion = abs(maxBubbleArea - minBubbleArea);
    (0, _iterator.each)(series, function(_, seriesItem) {
        (0, _iterator.each)(seriesItem.getPoints(), function(_, point) {
            if (maxPointSize === minPointSize) {
                pointSize = round(equalBubbleSize)
            } else {
                sizeProportion = abs(point.size - minPointSize) / sizeDispersion;
                bubbleArea = areaDispersion * sizeProportion + minBubbleArea;
                pointSize = round(sqrt(bubbleArea))
            }
            point.correctCoordinates(pointSize)
        })
    })
}

function SeriesFamily(options) {
    var that = this;
    that.type = (0, _utils.normalizeEnum)(options.type);
    that.pane = options.pane;
    that.series = [];
    that.updateOptions(options);
    switch (that.type) {
        case "bar":
            that.adjustSeriesDimensions = adjustBarSeriesDimensions;
            that.updateSeriesValues = updateBarSeriesValues;
            that.adjustSeriesValues = adjustStackedSeriesValues;
            break;
        case "rangebar":
            that.adjustSeriesDimensions = adjustBarSeriesDimensions;
            break;
        case "fullstackedbar":
            that.fullStacked = true;
            that.adjustSeriesDimensions = adjustBarSeriesDimensions;
            that.adjustSeriesValues = adjustStackedSeriesValues;
            that.updateSeriesValues = updateStackedSeriesValues;
            break;
        case "stackedbar":
            that.adjustSeriesDimensions = adjustBarSeriesDimensions;
            that.adjustSeriesValues = adjustStackedSeriesValues;
            that.updateSeriesValues = updateStackedSeriesValues;
            break;
        case "fullstackedarea":
        case "fullstackedline":
        case "fullstackedspline":
        case "fullstackedsplinearea":
            that.fullStacked = true;
            that.adjustSeriesValues = adjustStackedSeriesValues;
            break;
        case "stackedarea":
        case "stackedsplinearea":
        case "stackedline":
        case "stackedspline":
            that.adjustSeriesValues = adjustStackedSeriesValues;
            break;
        case "candlestick":
        case "stock":
            that.adjustSeriesDimensions = adjustCandlestickSeriesDimensions;
            break;
        case "bubble":
            that.adjustSeriesDimensions = adjustBubbleSeriesDimensions
    }
}
SeriesFamily.prototype = {
    constructor: SeriesFamily,
    adjustSeriesDimensions: _common.noop,
    adjustSeriesValues: _common.noop,
    updateSeriesValues: _common.noop,
    updateOptions: function(options) {
        this._options = options
    },
    dispose: function() {
        this.series = null
    },
    add: function(series) {
        var type = this.type;
        this.series = (0, _utils.map)(series, function(singleSeries) {
            return singleSeries.type === type ? singleSeries : null
        })
    }
};
