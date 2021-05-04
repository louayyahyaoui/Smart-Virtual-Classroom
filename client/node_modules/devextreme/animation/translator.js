/**
 * DevExtreme (animation/translator.js)
 * Version: 20.2.6
 * Build date: Tue Mar 16 2021
 *
 * Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
exports.parseTranslate = exports.resetPosition = exports.move = exports.getTranslate = exports.getTranslateCss = exports.clearCache = exports.locate = void 0;
var _element_data = require("../core/element_data");
var _type = require("../core/utils/type");
var TRANSLATOR_DATA_KEY = "dxTranslator";
var TRANSFORM_MATRIX_REGEX = /matrix(3d)?\((.+?)\)/;
var TRANSLATE_REGEX = /translate(?:3d)?\((.+?)\)/;
var locate = function($element) {
    var translate = getTranslate($element);
    return {
        left: translate.x,
        top: translate.y
    }
};
exports.locate = locate;

function isPercentValue(value) {
    return "string" === (0, _type.type)(value) && "%" === value[value.length - 1]
}

function cacheTranslate($element, translate) {
    if ($element.length) {
        (0, _element_data.data)($element.get(0), TRANSLATOR_DATA_KEY, translate)
    }
}
var clearCache = function($element) {
    if ($element.length) {
        (0, _element_data.removeData)($element.get(0), TRANSLATOR_DATA_KEY)
    }
};
exports.clearCache = clearCache;
var getTranslateCss = function(translate) {
    translate.x = translate.x || 0;
    translate.y = translate.y || 0;
    var xValueString = isPercentValue(translate.x) ? translate.x : translate.x + "px";
    var yValueString = isPercentValue(translate.y) ? translate.y : translate.y + "px";
    return "translate(" + xValueString + ", " + yValueString + ")"
};
exports.getTranslateCss = getTranslateCss;
var getTranslate = function($element) {
    var result = $element.length ? (0, _element_data.data)($element.get(0), TRANSLATOR_DATA_KEY) : null;
    if (!result) {
        var transformValue = $element.css("transform") || getTranslateCss({
            x: 0,
            y: 0
        });
        var matrix = transformValue.match(TRANSFORM_MATRIX_REGEX);
        var is3D = matrix && matrix[1];
        if (matrix) {
            matrix = matrix[2].split(",");
            if ("3d" === is3D) {
                matrix = matrix.slice(12, 15)
            } else {
                matrix.push(0);
                matrix = matrix.slice(4, 7)
            }
        } else {
            matrix = [0, 0, 0]
        }
        result = {
            x: parseFloat(matrix[0]),
            y: parseFloat(matrix[1]),
            z: parseFloat(matrix[2])
        };
        cacheTranslate($element, result)
    }
    return result
};
exports.getTranslate = getTranslate;
var move = function($element, position) {
    var left = position.left;
    var top = position.top;
    var translate;
    if (void 0 === left) {
        translate = getTranslate($element);
        translate.y = top || 0
    } else {
        if (void 0 === top) {
            translate = getTranslate($element);
            translate.x = left || 0
        } else {
            translate = {
                x: left || 0,
                y: top || 0,
                z: 0
            };
            cacheTranslate($element, translate)
        }
    }
    $element.css({
        transform: getTranslateCss(translate)
    });
    if (isPercentValue(left) || isPercentValue(top)) {
        clearCache($element)
    }
};
exports.move = move;
var resetPosition = function($element, finishTransition) {
    var originalTransition;
    var stylesConfig = {
        left: 0,
        top: 0,
        transform: "none"
    };
    if (finishTransition) {
        originalTransition = $element.css("transition");
        stylesConfig.transition = "none"
    }
    $element.css(stylesConfig);
    clearCache($element);
    if (finishTransition) {
        $element.get(0).offsetHeight;
        $element.css("transition", originalTransition)
    }
};
exports.resetPosition = resetPosition;
var parseTranslate = function(translateString) {
    var result = translateString.match(TRANSLATE_REGEX);
    if (!result || !result[1]) {
        return
    }
    result = result[1].split(",");
    result = {
        x: parseFloat(result[0]),
        y: parseFloat(result[1]),
        z: parseFloat(result[2])
    };
    return result
};
exports.parseTranslate = parseTranslate;
