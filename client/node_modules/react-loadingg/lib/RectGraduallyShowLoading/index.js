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

function _templateObject6() {
  var data = _taggedTemplateLiteral(["\n  width: 12.5%;\n  height: 100%;\n  background-color: ", ";\n"]);

  _templateObject6 = function _templateObject6() {
    return data;
  };

  return data;
}

function _templateObject5() {
  var data = _taggedTemplateLiteral(["\n  width: 100%;\n  height: 100%;\n  display: flex;\n  flex-wrap: nowrap;\n  position: absolute;\n  z-index: 1;\n  left: 0;\n  top: 0;\n  >div {\n    animation: ", " ", "s ease-in-out infinite;\n  }\n  >div:nth-of-type(8) {\n    animation-delay: 0s;\n  }\n  >div:nth-of-type(7) {\n    animation-delay: ", "s;\n  }\n  >div:nth-of-type(6) {\n    animation-delay: ", "s;\n  }\n  >div:nth-of-type(5) {\n    animation-delay: ", "s;\n  }\n  >div:nth-of-type(4) {\n    animation-delay: ", "s;\n  }\n  >div:nth-of-type(3) {\n    animation-delay: ", "s;\n  }\n  >div:nth-of-type(2) {\n    animation-delay: ", "s;\n  }\n  >div:nth-of-type(1) {\n    animation-delay: ", "s;\n  }\n"]);

  _templateObject5 = function _templateObject5() {
    return data;
  };

  return data;
}

function _templateObject4() {
  var data = _taggedTemplateLiteral(["\n  width: 100%;\n  height: 100%;\n  background-color: ", ";\n  position: absolute;\n  z-index: 2;\n  left: 0;\n  top: 0;\n  animation: ", " ", "s linear infinite;\n"]);

  _templateObject4 = function _templateObject4() {
    return data;
  };

  return data;
}

function _templateObject3() {
  var data = _taggedTemplateLiteral(["\n  width: ", "px;\n  height: ", "px;\n  position: relative;\n  overflow: hidden;\n"]);

  _templateObject3 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2() {
  var data = _taggedTemplateLiteral(["\n  0% {\n    transform: translateX(0);\n  }\n  100% {\n    transform: translateX(-100%)\n  }\n"]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n  0% {\n    opacity: 0.3;\n  }\n  25% {\n    opacity: 1;\n  }\n  50% {\n    opacity: 0.3;\n  }\n  65% {\n    opacity: 1;\n  }\n  100% {\n    opacity: 0.3;\n  }\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var gradualShowDispear = (0, _styledComponents.keyframes)(_templateObject());
var gradualDispear = (0, _styledComponents.keyframes)(_templateObject2());

var LoadContainer = _styledComponents.default.div(_templateObject3(), function (props) {
  return props.size === 'small' ? 56 : props.size === 'large' ? 64 : 60;
}, function (props) {
  return props.size === 'small' ? 12 : props.size === 'large' ? 20 : 16;
});

var RectBig = _styledComponents.default.div(_templateObject4(), function (props) {
  return props.color || '#00adb5';
}, gradualDispear, function (props) {
  return props.speed || 4;
});

var RectSmallWrap = _styledComponents.default.div(_templateObject5(), gradualShowDispear, function (props) {
  return props.speed || 4;
}, function (props) {
  return props.speed / 16 * 1 || 4 / 16 * 1;
}, function (props) {
  return props.speed / 16 * 2 || 4 / 16 * 2;
}, function (props) {
  return props.speed / 16 * 3 || 4 / 16 * 3;
}, function (props) {
  return props.speed / 16 * 4 || 4 / 16 * 4;
}, function (props) {
  return props.speed / 16 * 5 || 4 / 16 * 5;
}, function (props) {
  return props.speed / 16 * 6 || 4 / 16 * 6;
}, function (props) {
  return props.speed / 16 * 7 || 4 / 16 * 7;
});

var RectSmall = _styledComponents.default.div(_templateObject6(), function (props) {
  return props.color || '#00adb5';
});

var RectGraduallyShowLoading = function RectGraduallyShowLoading(_ref) {
  var _ref$style = _ref.style,
      style = _ref$style === void 0 ? _style.commonStyle : _ref$style,
      color = _ref.color,
      speed = _ref.speed,
      _ref$size = _ref.size,
      size = _ref$size === void 0 ? 'default' : _ref$size;
  return _react.default.createElement(LoadContainer, {
    style: style,
    speed: speed,
    color: color,
    size: size
  }, _react.default.createElement(RectSmallWrap, null, Array.from(Array(8)).map(function (item, index) {
    return _react.default.createElement(RectSmall, {
      speed: speed,
      color: color,
      size: size,
      key: index
    });
  })));
};

var _default = RectGraduallyShowLoading;
exports.default = _default;