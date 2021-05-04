/**
 * DevExtreme (ui/pivot_grid/remote_store.utils.js)
 * Version: 20.2.6
 * Build date: Tue Mar 16 2021
 *
 * Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
exports.forEachGroup = void 0;
var forEachGroup = function forEachGroup(data, callback, level) {
    data = data || [];
    level = level || 0;
    for (var i = 0; i < data.length; i++) {
        var group = data[i];
        callback(group, level);
        if (group && group.items && group.items.length) {
            forEachGroup(group.items, callback, level + 1)
        }
    }
};
exports.forEachGroup = forEachGroup;
