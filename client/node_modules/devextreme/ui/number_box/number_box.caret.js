/**
 * DevExtreme (ui/number_box/number_box.caret.js)
 * Version: 20.2.6
 * Build date: Tue Mar 16 2021
 *
 * Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
exports.getCaretInBoundaries = getCaretInBoundaries;
exports.getCaretOffset = exports.isCaretInBoundaries = exports.getCaretAfterFormat = exports.getCaretWithOffset = exports.getCaretBoundaries = void 0;
var _math = require("../../core/utils/math");
var _common = require("../../core/utils/common");
var _number = _interopRequireDefault(require("../../localization/number"));
var _utils = require("./utils");

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        "default": obj
    }
}
var getCaretBoundaries = function(text, format) {
    if ("string" === typeof format) {
        var signParts = format.split(";");
        var sign = _number.default.getSign(text, format);
        signParts[1] = signParts[1] || "-" + signParts[0];
        format = signParts[sign < 0 ? 1 : 0];
        var mockEscapedStubs = function(str) {
            return str.replace(/'([^']*)'/g, function(str) {
                return str.split("").map(function() {
                    return " "
                }).join("").substr(2)
            })
        };
        format = mockEscapedStubs(format);
        var prefixStubLength = /^[^#0.,]*/.exec(format)[0].length;
        var postfixStubLength = /[^#0.,]*$/.exec(format)[0].length;
        return {
            start: prefixStubLength,
            end: text.length - postfixStubLength
        }
    } else {
        return {
            start: 0,
            end: text.length
        }
    }
};
exports.getCaretBoundaries = getCaretBoundaries;
var _getDigitCountBeforeIndex = function(index, text) {
    var decimalSeparator = _number.default.getDecimalSeparator();
    var regExp = new RegExp("[^0-9" + (0, _common.escapeRegExp)(decimalSeparator) + "]", "g");
    var textBeforePosition = text.slice(0, index);
    return textBeforePosition.replace(regExp, "").length
};
var _reverseText = function(text) {
    return text.split("").reverse().join("")
};
var _getDigitPositionByIndex = function(digitIndex, text) {
    if (!digitIndex) {
        return -1
    }
    var regExp = /[0-9]/g;
    var counter = 1;
    var index = null;
    var result = regExp.exec(text);
    while (result) {
        index = result.index;
        if (!digitIndex || counter >= digitIndex) {
            return index
        }
        counter++;
        result = regExp.exec(text)
    }
    return null === index ? text.length : index
};
var _trimNonNumericCharsFromEnd = function(text) {
    return text.replace(/[^0-9e]+$/, "")
};
var getCaretWithOffset = function(caret, offset) {
    if (void 0 === caret.start) {
        caret = {
            start: caret,
            end: caret
        }
    }
    return {
        start: caret.start + offset,
        end: caret.end + offset
    }
};
exports.getCaretWithOffset = getCaretWithOffset;
var getCaretAfterFormat = function(text, formatted, caret, format) {
    caret = getCaretWithOffset(caret, 0);
    var point = _number.default.getDecimalSeparator();
    var isSeparatorBasedText = isSeparatorBasedString(text);
    var realSeparatorOccurrenceIndex = (0, _utils.getRealSeparatorIndex)(format).occurrence;
    var pointPosition = isSeparatorBasedText ? 0 : (0, _utils.getNthOccurrence)(text, point, realSeparatorOccurrenceIndex);
    var newPointPosition = (0, _utils.getNthOccurrence)(formatted, point, realSeparatorOccurrenceIndex);
    var textParts = (0, _utils.splitByIndex)(text, pointPosition);
    var formattedParts = (0, _utils.splitByIndex)(formatted, newPointPosition);
    var isCaretOnFloat = pointPosition !== -1 && caret.start > pointPosition;
    if (isCaretOnFloat) {
        var relativeIndex = caret.start - pointPosition - 1;
        var digitsBefore = _getDigitCountBeforeIndex(relativeIndex, textParts[1]);
        var newPosition = formattedParts[1] ? newPointPosition + 1 + _getDigitPositionByIndex(digitsBefore, formattedParts[1]) + 1 : formatted.length;
        return getCaretInBoundaries(newPosition, formatted, format)
    } else {
        var formattedIntPart = _trimNonNumericCharsFromEnd(formattedParts[0]);
        var positionFromEnd = textParts[0].length - caret.start;
        var digitsFromEnd = _getDigitCountBeforeIndex(positionFromEnd, _reverseText(textParts[0]));
        var newPositionFromEnd = _getDigitPositionByIndex(digitsFromEnd, _reverseText(formattedIntPart));
        var newPositionFromBegin = formattedIntPart.length - (newPositionFromEnd + 1);
        return getCaretInBoundaries(newPositionFromBegin, formatted, format)
    }
};
exports.getCaretAfterFormat = getCaretAfterFormat;

function isSeparatorBasedString(text) {
    return 1 === text.length && !!text.match(/^[,.][0-9]*$/g)
}
var isCaretInBoundaries = function(caret, text, format) {
    caret = getCaretWithOffset(caret, 0);
    var boundaries = getCaretInBoundaries(caret, text, format);
    return caret.start >= boundaries.start && caret.end <= boundaries.end
};
exports.isCaretInBoundaries = isCaretInBoundaries;

function getCaretInBoundaries(caret, text, format) {
    caret = getCaretWithOffset(caret, 0);
    var boundaries = getCaretBoundaries(text, format);
    var adjustedCaret = {
        start: (0, _math.fitIntoRange)(caret.start, boundaries.start, boundaries.end),
        end: (0, _math.fitIntoRange)(caret.end, boundaries.start, boundaries.end)
    };
    return adjustedCaret
}
var getCaretOffset = function(previousText, newText, format) {
    var previousBoundaries = getCaretBoundaries(previousText, format);
    var newBoundaries = getCaretBoundaries(newText, format);
    return newBoundaries.start - previousBoundaries.start
};
exports.getCaretOffset = getCaretOffset;
