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

function _templateObject5() {
  var data = _taggedTemplateLiteral(["\n  width: ", ";\n  height: ", ";\n  border-radius: 100%;\n  position: relative;\n  background-color: ", ";\n  animation: ", " ", "s -", "s infinite;\n"]);

  _templateObject5 = function _templateObject5() {
    return data;
  };

  return data;
}

function _templateObject4() {
  var data = _taggedTemplateLiteral(["\n  width: ", ";\n  height: ", ";\n  border-radius: 100%;\n  position: relative;\n  z-index: 1;\n  background-color: ", ";\n  animation: ", " ", "s 0s infinite;\n"]);

  _templateObject4 = function _templateObject4() {
    return data;
  };

  return data;
}

function _templateObject3() {
  var data = _taggedTemplateLiteral(["\n  width: ", ";\n  height: ", ";\n  display: flex;\n  flex-direction: column;\n  justify-content: space-between;\n  align-items: center;\n"]);

  _templateObject3 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2() {
  var data = _taggedTemplateLiteral(["\n  width: ", ";\n  height: ", ";\n  position: relative;\n  /* overflow: hidden; */\n"]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n  0% {\n    transform: translateY(-8px);\n  }\n\n  50% {\n    transform: translateY(12px);\n    opacity: 0.3;\n  }\n  100% {\n    transform: translateY(-8px);\n  }\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var fly = (0, _styledComponents.keyframes)(_templateObject());

var LoadContainer = _styledComponents.default.div(_templateObject2(), function (props) {
  return _style.sizeContainer[props.size] || _style.sizeContainer['default'];
}, function (props) {
  return _style.sizeContainer[props.size] || _style.sizeContainer['default'];
});

var BlurField = _styledComponents.default.div(_templateObject3(), function (props) {
  return _style.sizeContainer[props.size] || _style.sizeContainer['default'];
}, function (props) {
  return _style.sizeContainer[props.size] || _style.sizeContainer['default'];
});

var BallOne = _styledComponents.default.div(_templateObject4(), function (props) {
  return _style.sizeItem[props.size] || _style.sizeItem[props.size];
}, function (props) {
  return _style.sizeItem[props.size] || _style.sizeItem[props.size];
}, function (props) {
  return props.color || '#00adb5';
}, fly, function (props) {
  return props.speed || 2;
});

var BallTwo = _styledComponents.default.div(_templateObject5(), function (props) {
  return _style.sizeItem[props.size] || _style.sizeItem[props.size];
}, function (props) {
  return _style.sizeItem[props.size] || _style.sizeItem[props.size];
}, function (props) {
  return props.inColor || '#f9c094';
}, fly, function (props) {
  return props.speed || 2;
}, function (props) {
  return props.speed / 2 || 1;
});

var StickyBallLoading = function StickyBallLoading(_ref) {
  var _ref$style = _ref.style,
      style = _ref$style === void 0 ? _style.commonStyle : _ref$style,
      color = _ref.color,
      inColor = _ref.inColor,
      speed = _ref.speed,
      _ref$size = _ref.size,
      size = _ref$size === void 0 ? 'default' : _ref$size;
  return _react.default.createElement(LoadContainer, {
    style: style,
    size: size
  }, _react.default.createElement(BlurField, null, _react.default.createElement(BallOne, {
    color: color,
    speed: speed,
    size: size
  }), _react.default.createElement(BallTwo, {
    inColor: inColor,
    speed: speed,
    size: size
  })));
};

var _default = StickyBallLoading;
exports.default = _default;