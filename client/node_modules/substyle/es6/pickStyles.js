import _toConsumableArray from "@babel/runtime/helpers/toConsumableArray";
import { keys, merge, omit, values } from './utils';
import { isModifier } from './filterKeys';

var camelize = function camelize(key) {
  return key.replace(/-(\w)/g, function (m, c) {
    return c.toUpperCase();
  });
};

export var pickDirectStyles = function pickDirectStyles(style) {
  var objectPropertiesWhitelist = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  var styleKeys = keys(style);
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
export var pickNestedStyles = function pickNestedStyles(style, keysToPick) {
  var camelizedKeysToPick = keysToPick.map(camelize);
  var styleKeys = keys(style);
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

export var hoistModifierStylesRecursive = function hoistModifierStylesRecursive(style, modifierKeysToPick) {
  // hoist styles for selected modifiers on current level
  var result = merge.apply(void 0, [{}, omit(style, modifierKeysToPick)].concat(_toConsumableArray(values(pickNestedStyles(style, modifierKeysToPick))))); // traverse nested styled for ALL modifiers

  var modifierKeys = keys(result).filter(isModifier);

  for (var i = 0, l = modifierKeys.length; i < l; i += 1) {
    var key = modifierKeys[i];
    var subresult = hoistModifierStylesRecursive(result[key], modifierKeysToPick);

    if (modifierKeysToPick.indexOf(key) >= 0) {
      // selected modifier: hoist subresult
      delete result[key];
      result = merge({}, result, subresult);
    } else {
      // non-selected modifier: replace with subresult
      result[key] = subresult;
    }
  }

  return result;
};