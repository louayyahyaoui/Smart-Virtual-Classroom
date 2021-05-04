"use strict";

exports.__esModule = true;
exports.SlideFade = exports.slideFadeConfig = void 0;

var _utils = require("@chakra-ui/utils");

var _framerMotion = require("framer-motion");

var React = _interopRequireWildcard(require("react"));

var _utils2 = require("./__utils");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var transitions = {
  enter: {
    duration: 0.2,
    ease: _utils2.EASINGS.easeOut
  },
  exit: {
    duration: 0.1,
    ease: _utils2.EASINGS.easeIn
  }
};
var variants = {
  initial: function initial(props) {
    return {
      opacity: 0,
      x: props.offsetX,
      y: props.offsetY,
      transition: transitions.exit
    };
  },
  exit: function exit(props) {
    return _extends({
      opacity: 0,
      transition: transitions.exit
    }, props.reverse && {
      x: props.offsetX,
      y: props.offsetY
    }, !props.reverse && {
      transitionEnd: {
        x: props.offsetX,
        y: props.offsetY
      }
    });
  },
  enter: {
    opacity: 1,
    x: 0,
    y: 0,
    transition: transitions.enter
  }
};
var slideFadeConfig = {
  initial: "initial",
  animate: "enter",
  exit: "exit",
  variants: variants
};
exports.slideFadeConfig = slideFadeConfig;
var SlideFade = /*#__PURE__*/React.forwardRef(function (props, ref) {
  var unmountOnExit = props.unmountOnExit,
      isOpen = props["in"],
      _props$reverse = props.reverse,
      reverse = _props$reverse === void 0 ? true : _props$reverse,
      className = props.className,
      _props$offsetX = props.offsetX,
      offsetX = _props$offsetX === void 0 ? 0 : _props$offsetX,
      _props$offsetY = props.offsetY,
      offsetY = _props$offsetY === void 0 ? 8 : _props$offsetY,
      rest = _objectWithoutPropertiesLoose(props, ["unmountOnExit", "in", "reverse", "className", "offsetX", "offsetY"]);

  var shouldExpand = unmountOnExit ? isOpen && unmountOnExit : true;
  var custom = {
    offsetX: offsetX,
    offsetY: offsetY,
    reverse: reverse
  };
  var motionProps = (0, _utils.mergeWith)(slideFadeConfig, {
    custom: custom,
    animate: isOpen || unmountOnExit ? "enter" : "exit"
  });
  return /*#__PURE__*/React.createElement(_framerMotion.AnimatePresence, {
    custom: custom
  }, shouldExpand && /*#__PURE__*/React.createElement(_framerMotion.motion.div, _extends({
    ref: ref,
    className: (0, _utils.cx)("chakra-offset-slide", className)
  }, motionProps, rest)));
});
exports.SlideFade = SlideFade;

if (_utils.__DEV__) {
  SlideFade.displayName = "SlideFade";
}
//# sourceMappingURL=slide-fade.js.map