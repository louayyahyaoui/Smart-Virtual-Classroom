"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.hoistModifierStylesRecursive = exports.pickNestedStyles = exports.pickDirectStyles = void 0;

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _utils = require("./utils");

var _filterKeys = require("./filterKeys");

var camelize = function camelize(key) {
  return key.replace(/-(\w)/g, function (m, c) {
    return c.toUpperCase();
  });
};

var pickDirectStyles = function pickDirectStyles(style) {
  var objectPropertiesWhitelist = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  var styleKeys = (0, _utils.keys)(style);
  var result = {};

  for (var i = 0, l = styleKeys.length; i < l; i += 1) {
    var key = styleKeys[i];
    var isDirect = Object.prototype.toString.call(style[key]) !== '[object Object]' || // style defs
    key[0] === ':' || // pseudo selectors
    key[0] === '@' || // @media / @keyframes / @supports / @font-face
    objectPropertiesWhitelist.indexOf(key) >= 0; // whitelisted object-type properties

    if (isDirect) {
      result[key] = style[key];
    }
  }

  return result;
};

exports.pickDirectStyles = pickDirectStyles;

var pickNestedStyles = function pickNestedStyles(style, keysToPick) {
  var camelizedKeysToPick = keysToPick.map(camelize);
  var styleKeys = (0, _utils.keys)(style);
  var result = {};

  for (var i = 0, l = styleKeys.length; i < l; i += 1) {
    var key = styleKeys[i];

    if (keysToPick.indexOf(key) >= 0 || camelizedKeysToPick.indexOf(camelize(key)) >= 0) {
      result[key] = style[key];
    }
  }

  return result;
}; // breadth-first hoisting of selected modifier style subtrees
// does not traverse into element, :pseudo-selector or @directive subtrees


exports.pickNestedStyles = pickNestedStyles;

var hoistModifierStylesRecursive = function hoistModifierStylesRecursive(style, modifierKeysToPick) {
  // hoist styles for selected modifiers on current level
  var result = _utils.merge.apply(void 0, [{}, (0, _utils.omit)(style, modifierKeysToPick)].concat((0, _toConsumableArray2.default)((0, _utils.values)(pickNestedStyles(style, modifierKeysToPick))))); // traverse nested styled for ALL modifiers


  var modifierKeys = (0, _utils.keys)(result).filter(_filterKeys.isModifier);

  for (var i = 0, l = modifierKeys.length; i < l; i += 1) {
    var key = modifierKeys[i];
    var subresult = hoistModifierStylesRecursive(result[key], modifierKeysToPick);

    if (modifierKeysToPick.indexOf(key) >= 0) {
      // selected modifier: hoist subresult
      delete result[key];
      result = (0, _utils.merge)({}, result, subresult);
    } else {
      // non-selected modifier: replace with subresult
      result[key] = subresult;
    }
  }

  return result;
};

exports.hoistModifierStylesRecursive = hoistModifierStylesRecursive;