/**
 * DevExtreme (renovation/test_utils/transformers/tsx.js)
 * Version: 20.2.6
 * Build date: Tue Mar 16 2021
 *
 * Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
var fs = require("fs");
var tsJest = require("ts-jest");
var _getCacheKey = require("./get_cache_key");
var THIS_FILE = fs.readFileSync(__filename);
var jestTransformer = tsJest.createTransformer();
var addCreateElementImport = function(src) {
    return "import React from 'react'; ".concat(src)
};
module.exports = {
    process: function(src, filename, config) {
        return jestTransformer.process(filename.indexOf("__tests__") > -1 ? src : addCreateElementImport(src), filename, config)
    },
    getCacheKey: function(fileData, filePath, configStr) {
        return _getCacheKey(fileData, filePath, configStr, THIS_FILE)
    }
};
