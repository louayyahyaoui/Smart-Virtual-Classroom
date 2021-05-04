"use strict";

exports.__esModule = true;
exports.Slide = void 0;

var _utils = require("@chakra-ui/utils");

var _framerMotion = require("framer-motion");

var React = _interopRequireWildcard(require("react"));

var _utils2 = require("./__utils");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var directions = {
  bottom: {
    motion: {
      y: "100%"
    },
    baseStyle: {
      maxWidth: "100vw",
      bottom: 0,
      left: 0,
      right: 0
    }
  },
  top: {
    motion: {
      y: "-100%"
    },
    baseStyle: {
      maxWidth: "100vw",
      top: 0,
      left: 0,
      right: 0
    }
  },
  left: {
    motion: {
      x: "-100%"
    },
    baseStyle: {
      width: "100%",
      left: 0,
      top: 0,
      bottom: 0
    }
  },
  right: {
    motion: {
      x: "100%"
    },
    baseStyle: {
      width: "100%",
      right: 0,
      top: 0,
      bottom: 0
    }
  }
};
var variants = {
  exit: function exit(direction) {
    var _directions$direction;

    var _ref = (_directions$direction = directions[direction]) != null ? _directions$direction : {},
        motion = _ref.motion;

    return _extends({}, motion, {
      transition: {
        duration: 0.15,
        ease: _utils2.EASINGS.easeInOut
      }
    });
  },
  enter: function enter(direction) {
    var _directions$direction2, _ref4;

    var _ref2 = (_directions$direction2 = directions[direction]) != null ? _directions$direction2 : {},
        motion = _ref2.motion;

    var _ref3 = motion ? Object.keys(motion) : ["x"],
        axis = _ref3[0];

    return _ref4 = {}, _ref4[axis] = 0, _ref4.transition = {
      type: "spring",
      damping: 25,
      stiffness: 180
    }, _ref4;
  }
};
var Slide = /*#__PURE__*/React.forwardRef(function (props, ref) {
  var _directions$direction3;

  var _props$direction = props.direction,
      direction = _props$direction === void 0 ? "right" : _props$direction,
      style = props.style,
      unmountOnExit = props.unmountOnExit,
      isOpen = props["in"],
      className = props.className,
      rest = _objectWithoutPropertiesLoose(props, ["direction", "style", "unmountOnExit", "in", "className"]);

  var _ref5 = (_directions$direction3 = directions[direction]) != null ? _directions$direction3 : {},
      baseStyle = _ref5.baseStyle;

  var shouldExpand = unmountOnExit ? isOpen && unmountOnExit : true;
  return /*#__PURE__*/React.createElement(_framerMotion.AnimatePresence, {
    custom: direction
  }, shouldExpand && /*#__PURE__*/React.createElement(_framerMotion.motion.div, _extends({
    ref: ref,
    initial: "exit",
    className: (0, _utils.cx)("chakra-slide", className),
    animate: isOpen || unmountOnExit ? "enter" : "exit",
    exit: "exit",
    custom: direction,
    variants: variants,
    style: _extends({
      position: "fixed"
    }, baseStyle, style)
  }, rest)));
});
exports.Slide = Slide;

if (_utils.__DEV__) {
  Slide.displayName = "Slide";
}
//# sourceMappingURL=slide.js.map