"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _coerceSelection = _interopRequireDefault(require("./coerceSelection"));

var EMPTY = {};

var memoize = function memoize(substyle) {
  return function (select, defaultStyle) {
    var cacheKey = defaultStyle || EMPTY;
    substyle.memoize = substyle.memoize || new WeakMap();
    var mapEntry;

    if (!substyle.memoize.has(cacheKey)) {
      mapEntry = {};
      substyle.memoize.set(cacheKey, mapEntry);
    } else {
      mapEntry = substyle.memoize.get(cacheKey);
    }

    var selectHash = (0, _coerceSelection.default)(select).join(' ');
    return selectHash in mapEntry ? mapEntry[selectHash] : mapEntry[selectHash] = substyle(select || [], defaultStyle);
  };
};

var _default = memoize;
exports.default = _default;