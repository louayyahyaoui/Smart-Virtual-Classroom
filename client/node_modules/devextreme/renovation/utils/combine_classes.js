/**
 * DevExtreme (renovation/utils/combine_classes.js)
 * Version: 20.2.6
 * Build date: Tue Mar 16 2021
 *
 * Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
exports.combineClasses = combineClasses;

function combineClasses(classesMap) {
    return Object.keys(classesMap).filter(function(p) {
        return classesMap[p]
    }).join(" ")
}
