/**
 * DevExtreme (viz/vector_map/vector_map.utils.js)
 * Version: 20.2.6
 * Build date: Tue Mar 16 2021
 *
 * Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
exports.generateDataKey = generateDataKey;
var nextDataKey = 1;

function generateDataKey() {
    return "vectormap-data-" + nextDataKey++
}
