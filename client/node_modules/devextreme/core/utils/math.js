/**
 * DevExtreme (core/utils/math.js)
 * Version: 20.2.6
 * Build date: Tue Mar 16 2021
 *
 * Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
exports.adjust = adjust;
exports.getPrecision = getPrecision;
exports.getExponent = getExponent;
exports.getRoot = getRoot;
exports.solveCubicEquation = solveCubicEquation;
exports.trunc = trunc;
exports.roundFloatPart = roundFloatPart;
exports.getExponentLength = getExponentLength;
exports.getRemainderByDivision = getRemainderByDivision;
exports.inRange = exports.fitIntoRange = exports.sign = void 0;
var _type = require("./type");
var sign = function(value) {
    if (0 === value) {
        return 0
    }
    return value / Math.abs(value)
};
exports.sign = sign;
var fitIntoRange = function(value, minValue, maxValue) {
    var isMinValueUndefined = !minValue && 0 !== minValue;
    var isMaxValueUndefined = !maxValue && 0 !== maxValue;
    isMinValueUndefined && (minValue = !isMaxValueUndefined ? Math.min(value, maxValue) : value);
    isMaxValueUndefined && (maxValue = !isMinValueUndefined ? Math.max(value, minValue) : value);
    return Math.min(Math.max(value, minValue), maxValue)
};
exports.fitIntoRange = fitIntoRange;
var inRange = function(value, minValue, maxValue) {
    return value >= minValue && value <= maxValue
};
exports.inRange = inRange;

function getExponent(value) {
    return Math.abs(parseInt(value.toExponential().split("e")[1]))
}

function _isEdgeBug() {
    var value = 3e-4;
    var correctValue = "0.000300";
    var precisionValue = 3;
    return correctValue !== value.toPrecision(precisionValue)
}

function adjust(value, interval) {
    var precision = getPrecision(interval || 0) + 2;
    var separatedValue = value.toString().split(".");
    var sourceValue = value;
    var absValue = Math.abs(value);
    var separatedAdjustedValue;
    var isExponentValue = (0, _type.isExponential)(value);
    var integerPart = absValue > 1 ? 10 : 0;
    if (1 === separatedValue.length) {
        return value
    }
    if (!isExponentValue) {
        if ((0, _type.isExponential)(interval)) {
            precision = separatedValue[0].length + getExponent(interval)
        }
        value = absValue;
        value = value - Math.floor(value) + integerPart
    }
    precision = _isEdgeBug() && getExponent(value) > 6 || precision > 7 ? 15 : 7;
    if (!isExponentValue) {
        separatedAdjustedValue = parseFloat(value.toPrecision(precision)).toString().split(".");
        if (separatedAdjustedValue[0] === integerPart.toString()) {
            return parseFloat(separatedValue[0] + "." + separatedAdjustedValue[1])
        }
    }
    return parseFloat(sourceValue.toPrecision(precision))
}

function getPrecision(value) {
    var str = value.toString();
    if (str.indexOf(".") < 0) {
        return 0
    }
    var mantissa = str.split(".");
    var positionOfDelimiter = mantissa[1].indexOf("e");
    return positionOfDelimiter >= 0 ? positionOfDelimiter : mantissa[1].length
}

function getRoot(x, n) {
    if (x < 0 && n % 2 !== 1) {
        return NaN
    }
    var y = Math.pow(Math.abs(x), 1 / n);
    return n % 2 === 1 && x < 0 ? -y : y
}

function solveCubicEquation(a, b, c, d) {
    var min = 1e-8;
    if (Math.abs(a) < min) {
        a = b;
        b = c;
        c = d;
        if (Math.abs(a) < min) {
            a = b;
            b = c;
            if (Math.abs(a) < min) {
                return []
            }
            return [-b / a]
        }
        var D2 = b * b - 4 * a * c;
        if (Math.abs(D2) < min) {
            return [-b / (2 * a)]
        } else {
            if (D2 > 0) {
                return [(-b + Math.sqrt(D2)) / (2 * a), (-b - Math.sqrt(D2)) / (2 * a)]
            }
        }
        return []
    }
    var p = (3 * a * c - b * b) / (3 * a * a);
    var q = (2 * b * b * b - 9 * a * b * c + 27 * a * a * d) / (27 * a * a * a);
    var roots;
    var u;
    if (Math.abs(p) < min) {
        roots = [getRoot(-q, 3)]
    } else {
        if (Math.abs(q) < min) {
            roots = [0].concat(p < 0 ? [Math.sqrt(-p), -Math.sqrt(-p)] : [])
        } else {
            var D3 = q * q / 4 + p * p * p / 27;
            if (Math.abs(D3) < min) {
                roots = [-1.5 * q / p, 3 * q / p]
            } else {
                if (D3 > 0) {
                    u = getRoot(-q / 2 - Math.sqrt(D3), 3);
                    roots = [u - p / (3 * u)]
                } else {
                    u = 2 * Math.sqrt(-p / 3);
                    var t = Math.acos(3 * q / p / u) / 3;
                    var k = 2 * Math.PI / 3;
                    roots = [u * Math.cos(t), u * Math.cos(t - k), u * Math.cos(t - 2 * k)]
                }
            }
        }
    }
    for (var i = 0; i < roots.length; i++) {
        roots[i] -= b / (3 * a)
    }
    return roots
}

function trunc(value) {
    return Math.trunc ? Math.trunc(value) : value > 0 ? Math.floor(value) : Math.ceil(value)
}

function getRemainderByDivision(dividend, divider, digitsCount) {
    if (divider === parseInt(divider)) {
        return dividend % divider
    }
    var quotient = roundFloatPart(dividend / divider, digitsCount);
    return (quotient - parseInt(quotient)) * divider
}

function getExponentLength(value) {
    var _valueString$split$;
    var valueString = value.toString();
    return (null === (_valueString$split$ = valueString.split(".")[1]) || void 0 === _valueString$split$ ? void 0 : _valueString$split$.length) || parseInt(valueString.split("e-")[1]) || 0
}

function roundFloatPart(value) {
    var digitsCount = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0;
    return parseFloat(value.toFixed(digitsCount))
}
