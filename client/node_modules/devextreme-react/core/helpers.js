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
exports.capitalizeFirstLetter = exports.DoubleKeyMap = exports.generateID = void 0;
function generateID() {
    return Math.random().toString(36).substr(2);
}
exports.generateID = generateID;
var DoubleKeyMap = /** @class */ (function () {
    function DoubleKeyMap() {
        this._map = new Map();
    }
    DoubleKeyMap.prototype.set = function (_a, value) {
        var key1 = _a.key1, key2 = _a.key2;
        var innerMap = this._map.get(key1);
        if (!innerMap) {
            innerMap = new Map();
            this._map.set(key1, innerMap);
        }
        innerMap.set(key2, value);
    };
    DoubleKeyMap.prototype.get = function (_a) {
        var key1 = _a.key1, key2 = _a.key2;
        var innerMap = this._map.get(key1);
        return innerMap ? innerMap.get(key2) : undefined;
    };
    DoubleKeyMap.prototype.delete = function (_a) {
        var key1 = _a.key1, key2 = _a.key2;
        var innerMap = this._map.get(key1);
        if (!innerMap) {
            return;
        }
        innerMap.delete(key2);
        if (innerMap.size === 0) {
            this._map.delete(key1);
        }
    };
    return DoubleKeyMap;
}());
exports.DoubleKeyMap = DoubleKeyMap;
function capitalizeFirstLetter(text) {
    if (text.length) {
        return "" + text[0].toUpperCase() + text.substr(1);
    }
    return '';
}
exports.capitalizeFirstLetter = capitalizeFirstLetter;
