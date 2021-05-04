"use strict";

exports.__esModule = true;
exports.ScaleFade = exports.scaleFadeConfig = void 0;

var _utils = require("@chakra-ui/utils");

var _framerMotion = require("framer-motion");

var React = _interopRequireWildcard(require("react"));

var _utils2 = require("./__utils");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var variants = {
  exit: function exit(props) {
    return _extends({
      opacity: 0
    }, props.reverse ? {
      scale: props.initialScale
    } : {
      transitionEnd: {
        scale: props.initialScale
      }
    }, {
      transition: {
        duration: 0.1,
        ease: _utils2.EASINGS.easeOut
      }
    });
  },
  enter: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.25,
      ease: _utils2.EASINGS.easeInOut
    }
  }
};
var scaleFadeConfig = {
  initial: "exit",
  animate: "enter",
  exit: "exit",
  variants: variants
};
exports.scaleFadeConfig = scaleFadeConfig;
var ScaleFade = /*#__PURE__*/React.forwardRef(function (props, ref) {
  var unmountOnExit = props.unmountOnExit,
      isOpen = props["in"],
      _props$reverse = props.reverse,
      reverse = _props$reverse === void 0 ? true : _props$reverse,
      _props$initialScale = props.initialScale,
      initialScale = _props$initialScale === void 0 ? 0.95 : _props$initialScale,
      className = props.className,
      rest = _objectWithoutPropertiesLoose(props, ["unmountOnExit", "in", "reverse", "initialScale", "className"]);

  var show = unmountOnExit ? isOpen && unmountOnExit : true;
  var custom = {
    initialScale: initialScale,
    reverse: reverse
  };
  var motionProps = (0, _utils.mergeWith)(scaleFadeConfig, {
    custom: custom,
    animate: isOpen || unmountOnExit ? "enter" : "exit"
  });
  return /*#__PURE__*/React.createElement(_framerMotion.AnimatePresence, {
    custom: custom
  }, show && /*#__PURE__*/React.createElement(_framerMotion.motion.div, _extends({
    ref: ref,
    className: (0, _utils.cx)("chakra-offset-slide", className)
  }, motionProps, rest)));
});
exports.ScaleFade = ScaleFade;

if (_utils.__DEV__) {
  ScaleFade.displayName = "ScaleFade";
}
//# sourceMappingURL=scale-fade.js.map