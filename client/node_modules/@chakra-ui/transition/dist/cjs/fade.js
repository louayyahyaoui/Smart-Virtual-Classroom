"use strict";

exports.__esModule = true;
exports.Fade = exports.fadeConfig = void 0;

var _utils = require("@chakra-ui/utils");

var _framerMotion = require("framer-motion");

var React = _interopRequireWildcard(require("react"));

var _utils2 = require("./__utils");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var variants = {
  exit: {
    opacity: 0,
    transition: {
      duration: 0.1,
      ease: _utils2.EASINGS.easeOut
    }
  },
  enter: {
    opacity: 1,
    transition: {
      duration: 0.2,
      ease: _utils2.EASINGS.easeIn
    }
  }
};
var fadeConfig = {
  initial: "exit",
  animate: "enter",
  exit: "exit",
  variants: variants
};
exports.fadeConfig = fadeConfig;
var Fade = /*#__PURE__*/React.forwardRef(function (props, ref) {
  var unmountOnExit = props.unmountOnExit,
      isOpen = props["in"],
      className = props.className,
      rest = _objectWithoutPropertiesLoose(props, ["unmountOnExit", "in", "className"]);

  var shouldExpand = unmountOnExit ? isOpen && unmountOnExit : true;
  return /*#__PURE__*/React.createElement(_framerMotion.AnimatePresence, null, shouldExpand && /*#__PURE__*/React.createElement(_framerMotion.motion.div, _extends({
    ref: ref,
    className: (0, _utils.cx)("chakra-fade", className)
  }, fadeConfig, {
    animate: isOpen || unmountOnExit ? "enter" : "exit"
  }, rest)));
});
exports.Fade = Fade;

if (_utils.__DEV__) {
  Fade.displayName = "Fade";
}
//# sourceMappingURL=fade.js.map