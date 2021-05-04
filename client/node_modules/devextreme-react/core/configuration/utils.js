/*!
 * devextreme-react
 * Version: 20.2.6
 * Build date: Tue Mar 16 2021
 *
 * Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
 *
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file in the root of the project for details.
 *
 * https://github.com/DevExpress/devextreme-react
 */

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseOptionName = exports.mergeNameParts = void 0;
function mergeNameParts() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    return args.filter(function (value) { return value; }).join('.');
}
exports.mergeNameParts = mergeNameParts;
function parseOptionName(name) {
    var parts = name.split('[');
    if (parts.length === 1) {
        return {
            isCollectionItem: false,
            name: name,
        };
    }
    return {
        isCollectionItem: true,
        name: parts[0],
        index: Number(parts[1].slice(0, -1)),
    };
}
exports.parseOptionName = parseOptionName;
