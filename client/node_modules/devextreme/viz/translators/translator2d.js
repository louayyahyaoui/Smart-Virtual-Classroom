/**
 * DevExtreme (viz/translators/translator2d.js)
 * Version: 20.2.6
 * Build date: Tue Mar 16 2021
 *
 * Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
exports.Translator2D = void 0;
var _extend = require("../../core/utils/extend");
var _iterator = require("../../core/utils/iterator");
var _range = require("./range");
var _category_translator = _interopRequireDefault(require("./category_translator"));
var _interval_translator = _interopRequireDefault(require("./interval_translator"));
var _datetime_translator = _interopRequireDefault(require("./datetime_translator"));
var _logarithmic_translator = _interopRequireDefault(require("./logarithmic_translator"));
var _utils = require("../core/utils");
var _type = require("../../core/utils/type");
var _math = require("../../core/utils/math");
var _date = _interopRequireDefault(require("../../core/utils/date"));

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        "default": obj
    }
}
var _abs = Math.abs;
var CANVAS_PROP = ["width", "height", "left", "top", "bottom", "right"];
var dummyTranslator = {
    to: function(value) {
        var coord = this._canvasOptions.startPoint + (this._options.conversionValue ? value : Math.round(value));
        return coord > this._canvasOptions.endPoint ? this._canvasOptions.endPoint : coord
    },
    from: function(value) {
        return value - this._canvasOptions.startPoint
    }
};
var validateCanvas = function(canvas) {
    (0, _iterator.each)(CANVAS_PROP, function(_, prop) {
        canvas[prop] = parseInt(canvas[prop]) || 0
    });
    return canvas
};
var makeCategoriesToPoints = function(categories) {
    var categoriesToPoints = {};
    categories.forEach(function(item, i) {
        categoriesToPoints[item.valueOf()] = i
    });
    return categoriesToPoints
};
var validateBusinessRange = function(businessRange) {
    if (!(businessRange instanceof _range.Range)) {
        businessRange = new _range.Range(businessRange)
    }

    function validate(valueSelector, baseValueSelector) {
        if (!(0, _type.isDefined)(businessRange[valueSelector]) && (0, _type.isDefined)(businessRange[baseValueSelector])) {
            businessRange[valueSelector] = businessRange[baseValueSelector]
        }
    }
    validate("minVisible", "min");
    validate("maxVisible", "max");
    return businessRange
};

function prepareBreaks(breaks, range) {
    var transform = "logarithmic" === range.axisType ? function(value) {
        return (0, _utils.getLogExt)(value, range.base)
    } : function(value) {
        return value
    };
    var array = [];
    var br;
    var transformFrom;
    var transformTo;
    var i;
    var length = breaks.length;
    var sum = 0;
    for (i = 0; i < length; i++) {
        br = breaks[i];
        transformFrom = transform(br.from);
        transformTo = transform(br.to);
        sum += transformTo - transformFrom;
        array.push({
            trFrom: transformFrom,
            trTo: transformTo,
            from: br.from,
            to: br.to,
            length: sum,
            cumulativeWidth: br.cumulativeWidth
        })
    }
    return array
}

function getCanvasBounds(range) {
    var min = range.min;
    var max = range.max;
    var minVisible = range.minVisible;
    var maxVisible = range.maxVisible;
    var isLogarithmic = "logarithmic" === range.axisType;
    if (isLogarithmic) {
        maxVisible = (0, _utils.getLogExt)(maxVisible, range.base, range.allowNegatives, range.linearThreshold);
        minVisible = (0, _utils.getLogExt)(minVisible, range.base, range.allowNegatives, range.linearThreshold);
        min = (0, _utils.getLogExt)(min, range.base, range.allowNegatives, range.linearThreshold);
        max = (0, _utils.getLogExt)(max, range.base, range.allowNegatives, range.linearThreshold)
    }
    return {
        base: range.base,
        rangeMin: min,
        rangeMax: max,
        rangeMinVisible: minVisible,
        rangeMaxVisible: maxVisible
    }
}

function getCheckingMethodsAboutBreaks(inverted) {
    return {
        isStartSide: !inverted ? function(pos, breaks, start, end) {
            return pos < breaks[0][start]
        } : function(pos, breaks, start, end) {
            return pos <= breaks[breaks.length - 1][end]
        },
        isEndSide: !inverted ? function(pos, breaks, start, end) {
            return pos >= breaks[breaks.length - 1][end]
        } : function(pos, breaks, start, end) {
            return pos > breaks[0][start]
        },
        isInBreak: !inverted ? function(pos, br, start, end) {
            return pos >= br[start] && pos < br[end]
        } : function(pos, br, start, end) {
            return pos > br[end] && pos <= br[start]
        },
        isBetweenBreaks: !inverted ? function(pos, br, prevBreak, start, end) {
            return pos < br[start] && pos >= prevBreak[end]
        } : function(pos, br, prevBreak, start, end) {
            return pos >= br[end] && pos < prevBreak[start]
        },
        getLength: !inverted ? function(br) {
            return br.length
        } : function(br, lastBreak) {
            return lastBreak.length - br.length
        },
        getBreaksSize: !inverted ? function(br) {
            return br.cumulativeWidth
        } : function(br, lastBreak) {
            return lastBreak.cumulativeWidth - br.cumulativeWidth
        }
    }
}
var _Translator2d = function(businessRange, canvas, options) {
    this.update(businessRange, canvas, options)
};
exports.Translator2D = _Translator2d;
_Translator2d.prototype = {
    constructor: _Translator2d,
    reinit: function() {
        var that = this;
        var options = that._options;
        var range = that._businessRange;
        var categories = range.categories || [];
        var script = {};
        var canvasOptions = that._prepareCanvasOptions();
        var visibleCategories = (0, _utils.getCategoriesInfo)(categories, range.minVisible, range.maxVisible).categories;
        var categoriesLength = visibleCategories.length;
        if (range.isEmpty()) {
            script = dummyTranslator
        } else {
            switch (range.axisType) {
                case "logarithmic":
                    script = _logarithmic_translator.default;
                    break;
                case "semidiscrete":
                    script = _interval_translator.default;
                    canvasOptions.ratioOfCanvasRange = canvasOptions.canvasLength / (_date.default.addInterval(canvasOptions.rangeMaxVisible, options.interval) - canvasOptions.rangeMinVisible);
                    break;
                case "discrete":
                    script = _category_translator.default;
                    that._categories = categories;
                    canvasOptions.interval = that._getDiscreteInterval(options.addSpiderCategory ? categoriesLength + 1 : categoriesLength, canvasOptions);
                    that._categoriesToPoints = makeCategoriesToPoints(categories, canvasOptions.invert);
                    if (categoriesLength) {
                        canvasOptions.startPointIndex = that._categoriesToPoints[visibleCategories[0].valueOf()];
                        that.visibleCategories = visibleCategories
                    }
                    break;
                default:
                    if ("datetime" === range.dataType) {
                        script = _datetime_translator.default
                    }
            }
        }(that._oldMethods || []).forEach(function(methodName) {
            delete that[methodName]
        });
        that._oldMethods = Object.keys(script);
        (0, _extend.extend)(that, script);
        that._conversionValue = options.conversionValue ? function(value) {
            return value
        } : function(value) {
            return Math.round(value)
        };
        that.sc = {};
        that._checkingMethodsAboutBreaks = [getCheckingMethodsAboutBreaks(false), getCheckingMethodsAboutBreaks(that.isInverted())];
        that._translateBreaks();
        that._calculateSpecialValues()
    },
    _translateBreaks: function() {
        var breaks = this._breaks;
        var size = this._options.breaksSize;
        var i;
        var b;
        var end;
        var length;
        if (void 0 === breaks) {
            return
        }
        for (i = 0, length = breaks.length; i < length; i++) {
            b = breaks[i];
            end = this.translate(b.to);
            b.end = end;
            b.start = !b.gapSize ? !this.isInverted() ? end - size : end + size : end
        }
    },
    _checkValueAboutBreaks: function(breaks, pos, start, end, methods) {
        var i;
        var length;
        var prop = {
            length: 0,
            breaksSize: void 0,
            inBreak: false
        };
        var br;
        var prevBreak;
        var lastBreak = breaks[breaks.length - 1];
        if (methods.isStartSide(pos, breaks, start, end)) {
            return prop
        } else {
            if (methods.isEndSide(pos, breaks, start, end)) {
                return {
                    length: lastBreak.length,
                    breaksSize: lastBreak.cumulativeWidth,
                    inBreak: false
                }
            }
        }
        for (i = 0, length = breaks.length; i < length; i++) {
            br = breaks[i];
            prevBreak = breaks[i - 1];
            if (methods.isInBreak(pos, br, start, end)) {
                prop.inBreak = true;
                prop.break = br;
                break
            }
            if (prevBreak && methods.isBetweenBreaks(pos, br, prevBreak, start, end)) {
                prop = {
                    length: methods.getLength(prevBreak, lastBreak),
                    breaksSize: methods.getBreaksSize(prevBreak, lastBreak),
                    inBreak: false
                };
                break
            }
        }
        return prop
    },
    isInverted: function() {
        return !(this._options.isHorizontal ^ this._businessRange.invert)
    },
    _getDiscreteInterval: function(categoriesLength, canvasOptions) {
        var correctedCategoriesCount = categoriesLength - (this._options.stick ? 1 : 0);
        return correctedCategoriesCount > 0 ? canvasOptions.canvasLength / correctedCategoriesCount : canvasOptions.canvasLength
    },
    _prepareCanvasOptions: function() {
        var that = this;
        var businessRange = that._businessRange;
        var canvasOptions = that._canvasOptions = getCanvasBounds(businessRange);
        var canvas = that._canvas;
        var breaks = that._breaks;
        var length;
        canvasOptions.startPadding = canvas.startPadding || 0;
        canvasOptions.endPadding = canvas.endPadding || 0;
        if (that._options.isHorizontal) {
            canvasOptions.startPoint = canvas.left + canvasOptions.startPadding;
            length = canvas.width;
            canvasOptions.endPoint = canvas.width - canvas.right - canvasOptions.endPadding;
            canvasOptions.invert = businessRange.invert
        } else {
            canvasOptions.startPoint = canvas.top + canvasOptions.startPadding;
            length = canvas.height;
            canvasOptions.endPoint = canvas.height - canvas.bottom - canvasOptions.endPadding;
            canvasOptions.invert = !businessRange.invert
        }
        that.canvasLength = canvasOptions.canvasLength = canvasOptions.endPoint - canvasOptions.startPoint;
        canvasOptions.rangeDoubleError = Math.pow(10, (0, _utils.getPower)(canvasOptions.rangeMax - canvasOptions.rangeMin) - (0, _utils.getPower)(length) - 2);
        canvasOptions.ratioOfCanvasRange = canvasOptions.canvasLength / (canvasOptions.rangeMaxVisible - canvasOptions.rangeMinVisible);
        if (void 0 !== breaks) {
            canvasOptions.ratioOfCanvasRange = (canvasOptions.canvasLength - breaks[breaks.length - 1].cumulativeWidth) / (canvasOptions.rangeMaxVisible - canvasOptions.rangeMinVisible - breaks[breaks.length - 1].length)
        }
        return canvasOptions
    },
    updateCanvas: function(canvas) {
        this._canvas = validateCanvas(canvas);
        this.reinit()
    },
    updateBusinessRange: function(businessRange) {
        var that = this;
        var breaks = businessRange.breaks || [];
        that._userBreaks = businessRange.userBreaks || [];
        that._businessRange = validateBusinessRange(businessRange);
        that._breaks = breaks.length ? prepareBreaks(breaks, that._businessRange) : void 0;
        that.reinit()
    },
    update: function(businessRange, canvas, options) {
        var that = this;
        that._options = (0, _extend.extend)(that._options || {}, options);
        that._canvas = validateCanvas(canvas);
        that.updateBusinessRange(businessRange)
    },
    getBusinessRange: function() {
        return this._businessRange
    },
    getEventScale: function(zoomEvent) {
        return zoomEvent.deltaScale || 1
    },
    getCanvasVisibleArea: function() {
        return {
            min: this._canvasOptions.startPoint,
            max: this._canvasOptions.endPoint
        }
    },
    _calculateSpecialValues: function() {
        var that = this;
        var canvasOptions = that._canvasOptions;
        var startPoint = canvasOptions.startPoint - canvasOptions.startPadding;
        var endPoint = canvasOptions.endPoint + canvasOptions.endPadding;
        var range = that._businessRange;
        var minVisible = range.minVisible;
        var maxVisible = range.maxVisible;
        var canvas_position_center_middle = startPoint + canvasOptions.canvasLength / 2;
        var canvas_position_default;
        if (minVisible < 0 && maxVisible > 0 && minVisible !== maxVisible) {
            canvas_position_default = that.translate(0, 1)
        }
        if (!(0, _type.isDefined)(canvas_position_default)) {
            var invert = range.invert ^ (minVisible < 0 && maxVisible <= 0);
            if (that._options.isHorizontal) {
                canvas_position_default = invert ? endPoint : startPoint
            } else {
                canvas_position_default = invert ? startPoint : endPoint
            }
        }
        that.sc = {
            canvas_position_default: canvas_position_default,
            canvas_position_left: startPoint,
            canvas_position_top: startPoint,
            canvas_position_center: canvas_position_center_middle,
            canvas_position_middle: canvas_position_center_middle,
            canvas_position_right: endPoint,
            canvas_position_bottom: endPoint,
            canvas_position_start: canvasOptions.invert ? endPoint : startPoint,
            canvas_position_end: canvasOptions.invert ? startPoint : endPoint
        }
    },
    translateSpecialCase: function(value) {
        return this.sc[value]
    },
    _calculateProjection: function(distance) {
        var canvasOptions = this._canvasOptions;
        return canvasOptions.invert ? canvasOptions.endPoint - distance : canvasOptions.startPoint + distance
    },
    _calculateUnProjection: function(distance) {
        var canvasOptions = this._canvasOptions;
        "datetime" === this._businessRange.dataType && (distance = Math.round(distance));
        return canvasOptions.invert ? canvasOptions.rangeMaxVisible.valueOf() - distance : canvasOptions.rangeMinVisible.valueOf() + distance
    },
    getMinBarSize: function(minBarSize) {
        var visibleArea = this.getCanvasVisibleArea();
        var minValue = this.from(visibleArea.min + minBarSize);
        return _abs(this.from(visibleArea.min) - (!(0, _type.isDefined)(minValue) ? this.from(visibleArea.max) : minValue))
    },
    checkMinBarSize: function(value, minShownValue, stackValue) {
        return _abs(value) < minShownValue ? value >= 0 ? minShownValue : -minShownValue : value
    },
    translate: function(bp, direction) {
        var specialValue = this.translateSpecialCase(bp);
        if ((0, _type.isDefined)(specialValue)) {
            return Math.round(specialValue)
        }
        if (isNaN(bp)) {
            return null
        }
        return this.to(bp, direction)
    },
    getInterval: function(interval) {
        var _interval;
        var canvasOptions = this._canvasOptions;
        interval = null !== (_interval = interval) && void 0 !== _interval ? _interval : this._businessRange.interval;
        if (interval) {
            return Math.round(canvasOptions.ratioOfCanvasRange * interval)
        }
        return Math.round(canvasOptions.endPoint - canvasOptions.startPoint)
    },
    zoom: function(translate, scale, wholeRange) {
        var canvasOptions = this._canvasOptions;
        if (canvasOptions.rangeMinVisible.valueOf() === canvasOptions.rangeMaxVisible.valueOf() && 0 !== translate) {
            return this.zoomZeroLengthRange(translate, scale)
        }
        var startPoint = canvasOptions.startPoint;
        var endPoint = canvasOptions.endPoint;
        var isInverted = this.isInverted();
        var newStart = (startPoint + translate) / scale;
        var newEnd = (endPoint + translate) / scale;
        wholeRange = wholeRange || {};
        var minPoint = this.to(isInverted ? wholeRange.endValue : wholeRange.startValue);
        var maxPoint = this.to(isInverted ? wholeRange.startValue : wholeRange.endValue);
        var min;
        var max;
        if (minPoint > newStart) {
            newEnd -= newStart - minPoint;
            newStart = minPoint;
            min = isInverted ? wholeRange.endValue : wholeRange.startValue
        }
        if (maxPoint < newEnd) {
            newStart -= newEnd - maxPoint;
            newEnd = maxPoint;
            max = isInverted ? wholeRange.startValue : wholeRange.endValue
        }
        if (maxPoint - minPoint < newEnd - newStart) {
            newStart = minPoint;
            newEnd = maxPoint
        }
        translate = (endPoint - startPoint) * newStart / (newEnd - newStart) - startPoint;
        scale = (startPoint + translate) / newStart || 1;
        min = (0, _type.isDefined)(min) ? min : (0, _math.adjust)(this.from(newStart, 1));
        max = (0, _type.isDefined)(max) ? max : (0, _math.adjust)(this.from(newEnd, -1));
        if (scale <= 1) {
            min = this._correctValueAboutBreaks(min, 1 === scale ? translate : -1);
            max = this._correctValueAboutBreaks(max, 1 === scale ? translate : 1)
        }
        if (min > max) {
            min = min > wholeRange.endValue ? wholeRange.endValue : min;
            max = max < wholeRange.startValue ? wholeRange.startValue : max
        } else {
            min = min < wholeRange.startValue ? wholeRange.startValue : min;
            max = max > wholeRange.endValue ? wholeRange.endValue : max
        }
        return {
            min: min,
            max: max,
            translate: (0, _math.adjust)(translate),
            scale: (0, _math.adjust)(scale)
        }
    },
    _correctValueAboutBreaks: function(value, direction) {
        var br = this._userBreaks.filter(function(br) {
            return value >= br.from && value <= br.to
        });
        if (br.length) {
            return direction > 0 ? br[0].to : br[0].from
        } else {
            return value
        }
    },
    zoomZeroLengthRange: function(translate, scale) {
        var canvasOptions = this._canvasOptions;
        var min = canvasOptions.rangeMin;
        var max = canvasOptions.rangeMax;
        var correction = (max.valueOf() !== min.valueOf() ? max.valueOf() - min.valueOf() : _abs(canvasOptions.rangeMinVisible.valueOf() - min.valueOf())) / canvasOptions.canvasLength;
        var isDateTime = (0, _type.isDate)(max) || (0, _type.isDate)(min);
        var isLogarithmic = "logarithmic" === this._businessRange.axisType;
        var newMin = canvasOptions.rangeMinVisible.valueOf() - correction;
        var newMax = canvasOptions.rangeMaxVisible.valueOf() + correction;
        newMin = isLogarithmic ? (0, _math.adjust)((0, _utils.raiseToExt)(newMin, canvasOptions.base)) : isDateTime ? new Date(newMin) : newMin;
        newMax = isLogarithmic ? (0, _math.adjust)((0, _utils.raiseToExt)(newMax, canvasOptions.base)) : isDateTime ? new Date(newMax) : newMax;
        return {
            min: newMin,
            max: newMax,
            translate: translate,
            scale: scale
        }
    },
    getMinScale: function(zoom) {
        var _this$_businessRange = this._businessRange,
            dataType = _this$_businessRange.dataType,
            interval = _this$_businessRange.interval;
        if ("datetime" === dataType && 1 === interval) {
            return this.getDateTimeMinScale(zoom)
        }
        return zoom ? 1.1 : .9
    },
    getDateTimeMinScale: function(zoom) {
        var canvasOptions = this._canvasOptions;
        var length = canvasOptions.canvasLength / canvasOptions.ratioOfCanvasRange;
        length += (parseInt(.1 * length) || 1) * (zoom ? -2 : 2);
        return canvasOptions.canvasLength / (Math.max(length, 1) * canvasOptions.ratioOfCanvasRange)
    },
    getScale: function(val1, val2) {
        var canvasOptions = this._canvasOptions;
        if (canvasOptions.rangeMax === canvasOptions.rangeMin) {
            return 1
        }
        val1 = (0, _type.isDefined)(val1) ? this._fromValue(val1) : canvasOptions.rangeMin;
        val2 = (0, _type.isDefined)(val2) ? this._fromValue(val2) : canvasOptions.rangeMax;
        return (canvasOptions.rangeMax - canvasOptions.rangeMin) / Math.abs(val1 - val2)
    },
    isValid: function(value) {
        var co = this._canvasOptions;
        value = this._fromValue(value);
        return null !== value && !isNaN(value) && value.valueOf() + co.rangeDoubleError >= co.rangeMin && value.valueOf() - co.rangeDoubleError <= co.rangeMax
    },
    getCorrectValue: function(value, direction) {
        var that = this;
        var breaks = that._breaks;
        var prop;
        value = that._fromValue(value);
        if (that._breaks) {
            prop = that._checkValueAboutBreaks(breaks, value, "trFrom", "trTo", that._checkingMethodsAboutBreaks[0]);
            if (true === prop.inBreak) {
                return that._toValue(direction > 0 ? prop.break.trTo : prop.break.trFrom)
            }
        }
        return that._toValue(value)
    },
    to: function(bp, direction) {
        var range = this.getBusinessRange();
        if ((0, _type.isDefined)(range.maxVisible) && (0, _type.isDefined)(range.minVisible) && range.maxVisible.valueOf() === range.minVisible.valueOf()) {
            if (!(0, _type.isDefined)(bp) || range.maxVisible.valueOf() !== bp.valueOf()) {
                return null
            }
            return this.translateSpecialCase(0 === bp && this._options.shiftZeroValue ? "canvas_position_default" : "canvas_position_middle")
        }
        bp = this._fromValue(bp);
        var that = this;
        var canvasOptions = that._canvasOptions;
        var breaks = that._breaks;
        var prop = {
            length: 0
        };
        var commonBreakSize = 0;
        if (void 0 !== breaks) {
            prop = that._checkValueAboutBreaks(breaks, bp, "trFrom", "trTo", that._checkingMethodsAboutBreaks[0]);
            commonBreakSize = (0, _type.isDefined)(prop.breaksSize) ? prop.breaksSize : 0
        }
        if (true === prop.inBreak) {
            if (direction > 0) {
                return prop.break.start
            } else {
                if (direction < 0) {
                    return prop.break.end
                } else {
                    return null
                }
            }
        }
        return that._conversionValue(that._calculateProjection((bp - canvasOptions.rangeMinVisible - prop.length) * canvasOptions.ratioOfCanvasRange + commonBreakSize))
    },
    from: function(pos, direction) {
        var that = this;
        var breaks = that._breaks;
        var prop = {
            length: 0
        };
        var canvasOptions = that._canvasOptions;
        var startPoint = canvasOptions.startPoint;
        var commonBreakSize = 0;
        if (void 0 !== breaks) {
            prop = that._checkValueAboutBreaks(breaks, pos, "start", "end", that._checkingMethodsAboutBreaks[1]);
            commonBreakSize = (0, _type.isDefined)(prop.breaksSize) ? prop.breaksSize : 0
        }
        if (true === prop.inBreak) {
            if (direction > 0) {
                return that._toValue(prop.break.trTo)
            } else {
                if (direction < 0) {
                    return that._toValue(prop.break.trFrom)
                } else {
                    return null
                }
            }
        }
        return that._toValue(that._calculateUnProjection((pos - startPoint - commonBreakSize) / canvasOptions.ratioOfCanvasRange + prop.length))
    },
    isValueProlonged: false,
    getRange: function() {
        return [this._toValue(this._canvasOptions.rangeMin), this._toValue(this._canvasOptions.rangeMax)]
    },
    getScreenRange: function() {
        return [this._canvasOptions.startPoint, this._canvasOptions.endPoint]
    },
    add: function(value, diff, dir) {
        return this._add(value, diff, (this._businessRange.invert ? -1 : 1) * dir)
    },
    _add: function(value, diff, coeff) {
        return this._toValue(this._fromValue(value) + diff * coeff)
    },
    _fromValue: function(value) {
        return null !== value ? Number(value) : null
    },
    _toValue: function(value) {
        return null !== value ? Number(value) : null
    },
    ratioOfCanvasRange: function() {
        return this._canvasOptions.ratioOfCanvasRange
    },
    convert: function(value) {
        return value
    },
    getRangeByMinZoomValue: function(minZoom, visualRange) {
        if (visualRange.minVisible + minZoom <= this._businessRange.max) {
            return [visualRange.minVisible, visualRange.minVisible + minZoom]
        } else {
            return [visualRange.maxVisible - minZoom, visualRange.maxVisible]
        }
    }
};
