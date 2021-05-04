/**
 * DevExtreme (animation/easing.js)
 * Version: 20.2.6
 * Build date: Tue Mar 16 2021
 *
 * Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
exports.setEasing = setEasing;
exports.getEasing = getEasing;
exports.convertTransitionTimingFuncToEasing = void 0;
var _type = require("../core/utils/type");
var CSS_TRANSITION_EASING_REGEX = /cubic-bezier\((\d+(?:\.\d+)?)\s*,\s*(\d+(?:\.\d+)?)\s*,\s*(\d+(?:\.\d+)?)\s*,\s*(\d+(?:\.\d+)?)\)/;
var TransitionTimingFuncMap = {
    linear: "cubic-bezier(0, 0, 1, 1)",
    swing: "cubic-bezier(0.445, 0.05, 0.55, 0.95)",
    ease: "cubic-bezier(0.25, 0.1, 0.25, 1)",
    "ease-in": "cubic-bezier(0.42, 0, 1, 1)",
    "ease-out": "cubic-bezier(0, 0, 0.58, 1)",
    "ease-in-out": "cubic-bezier(0.42, 0, 0.58, 1)"
};
var polynomBezier = function(x1, y1, x2, y2) {
    var Cx = 3 * x1;
    var Bx = 3 * (x2 - x1) - Cx;
    var Ax = 1 - Cx - Bx;
    var Cy = 3 * y1;
    var By = 3 * (y2 - y1) - Cy;
    var Ay = 1 - Cy - By;
    var bezierX = function(t) {
        return t * (Cx + t * (Bx + t * Ax))
    };
    var bezierY = function(t) {
        return t * (Cy + t * (By + t * Ay))
    };
    var derivativeX = function(t) {
        return Cx + t * (2 * Bx + 3 * t * Ax)
    };
    var findXFor = function(t) {
        var x = t;
        var i = 0;
        var z;
        while (i < 14) {
            z = bezierX(x) - t;
            if (Math.abs(z) < .001) {
                break
            }
            x -= z / derivativeX(x);
            i++
        }
        return x
    };
    return function(t) {
        return bezierY(findXFor(t))
    }
};
var easing = {};
var convertTransitionTimingFuncToEasing = function(cssTransitionEasing) {
    cssTransitionEasing = TransitionTimingFuncMap[cssTransitionEasing] || cssTransitionEasing;
    var coeffs = cssTransitionEasing.match(CSS_TRANSITION_EASING_REGEX);
    var forceName;
    if (!coeffs) {
        forceName = "linear";
        coeffs = TransitionTimingFuncMap[forceName].match(CSS_TRANSITION_EASING_REGEX)
    }
    coeffs = coeffs.slice(1, 5);
    for (var i = 0; i < coeffs.length; i++) {
        coeffs[i] = parseFloat(coeffs[i])
    }
    var easingName = forceName || "cubicbezier_" + coeffs.join("_").replace(/\./g, "p");
    if (!(0, _type.isFunction)(easing[easingName])) {
        easing[easingName] = function(x, t, b, c, d) {
            return c * polynomBezier(coeffs[0], coeffs[1], coeffs[2], coeffs[3])(t / d) + b
        }
    }
    return easingName
};
exports.convertTransitionTimingFuncToEasing = convertTransitionTimingFuncToEasing;

function setEasing(value) {
    easing = value
}

function getEasing(name) {
    return easing[name]
}
