"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _styledComponents = _interopRequireWildcard(require("styled-components"));

var _style = require("../utils/style");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _templateObject3() {
  var data = _taggedTemplateLiteral(["\n  display: block;\n  width: 100%;\n  height: 100%;\n  border-radius: 3px;\n  background: ", ";\n  animation: ", " ", "s linear infinite;\n"]);

  _templateObject3 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2() {
  var data = _taggedTemplateLiteral(["\n  width: ", "px;\n  height: 8px;\n  border-radius: 4px;\n  margin: 0 auto;\n  position: relative;\n  background: #fff;\n  overflow: hidden;\n"]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n    0%{\n          transform: translate(-", "px);\n      }\n      50%{\n          transform: translate(0);\n      }\n      100%{\n          transform: translate(", "px);\n      }\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var animation = function animation(width) {
  return (0, _styledComponents.keyframes)(_templateObject(), width, width);
};

var Container = _styledComponents.default.div(_templateObject2(), function (props) {
  return props.size === 'small' ? 60 : props.size === 'large' ? 100 : 80;
});

var ItemSpan = _styledComponents.default.span(_templateObject3(), function (props) {
  return props.color || '#00adb5';
}, function (props) {
  return animation(props.size === 'small' ? 60 : props.size === 'large' ? 100 : 80);
}, function (props) {
  return props.speed || 2;
});

var ThreeHorseLoading = function ThreeHorseLoading(_ref) {
  var speed = _ref.speed,
      color = _ref.color,
      _ref$style = _ref.style,
      style = _ref$style === void 0 ? _style.commonStyle : _ref$style,
      _ref$size = _ref.size,
      size = _ref$size === void 0 ? "default" : _ref$size;
  return _react.default.createElement(Container, {
    style: style,
    color: color,
    size: size
  }, _react.default.createElement(ItemSpan, {
    speed: speed,
    style: style,
    color: color,
    size: size
  }));
};

var _default = ThreeHorseLoading;
exports.default = _default;