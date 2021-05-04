/**
 * DevExtreme (ui/drop_down_editor/utils.js)
 * Version: 20.2.6
 * Build date: Tue Mar 16 2021
 *
 * Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
exports.getSizeValue = exports.getElementWidth = void 0;
var _window = require("../../core/utils/window");
var getElementWidth = function($element) {
    if ((0, _window.hasWindow)()) {
        return $element.outerWidth()
    }
};
exports.getElementWidth = getElementWidth;
var getSizeValue = function(size) {
    if (null === size) {
        size = void 0
    }
    if ("function" === typeof size) {
        size = size()
    }
    return size
};
exports.getSizeValue = getSizeValue;
