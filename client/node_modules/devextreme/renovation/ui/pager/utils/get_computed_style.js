/**
 * DevExtreme (renovation/ui/pager/utils/get_computed_style.js)
 * Version: 20.2.6
 * Build date: Tue Mar 16 2021
 *
 * Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
exports.default = getElementComputedStyle;

function getElementComputedStyle(el) {
    return el ? window.getComputedStyle && window.getComputedStyle(el) : null
}
module.exports = exports.default;
