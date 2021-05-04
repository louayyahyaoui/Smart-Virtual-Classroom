"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _utils = require("./utils");

var coerceSelection = function coerceSelection(select) {
  if (!select) {
    return [];
  } else if (typeof select === 'string') {
    return [select];
  } else if (!Array.isArray(select)) {
    var objSelect = select; // workaround for https://github.com/facebook/flow/issues/5781

    return (0, _utils.keys)(select).reduce(function (acc, key) {
      return acc.concat(objSelect[key] ? [key] : []);
    }, []);
  }

  return select;
};

var _default = coerceSelection;
exports.default = _default;