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
  var data = _taggedTemplateLiteral(["\n   height: calc( ", " / 4) ;\n    width:calc( ", " / 4) ;\n  background-color: ", ";\n  border-radius: 50%;\nanimation: ", " ", "s alternate ease-in-out infinite;\n"]);

  _templateObject3 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2() {
  var data = _taggedTemplateLiteral(["\n   height: calc( ", " * 2) ;\n    width: calc( ", " * 2) ;\n  display: grid;\n  grid-template-rows: repeat(3, 1fr);\n  grid-template-columns: repeat(3, 1fr);\n  justify-items: center;\n  align-items: center;\n  > div:nth-child(2) > div:nth-child(4) {\n    animation-delay: ", "s;\n  }\n  > div:nth-of-type(3),\n  > div:nth-of-type(5),\n  > div:nth-of-type(7) {\n    animation-delay: ", "s;\n  }\n  > div:nth-of-type(6),\n  > div:nth-of-type(8) {\n    animation-delay: ", "s;\n  }\n  > div:nth-of-type(9) {\n    animation-delay: ", "s;\n  }\n"]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n  to {\n    opacity: 0.3;\n  }\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var animate = (0, _styledComponents.keyframes)(_templateObject());

var LoadContainer = _styledComponents.default.div(_templateObject2(), function (props) {
  return _style.sizeContainer[props.size] || _style.sizeContainer['default'];
}, function (props) {
  return _style.sizeContainer[props.size] || _style.sizeContainer['default'];
}, function (props) {
  return props.speed * (1 / 6) || 0.25;
}, function (props) {
  return props.speed / 3 || 0.5;
}, function (props) {
  return props.speed / 2 || 0.75;
}, function (props) {
  return props.speed * (2 / 3) || 1;
});

var Item = _styledComponents.default.div(_templateObject3(), function (props) {
  return _style.sizeContainer[props.size] || _style.sizeContainer['default'];
}, function (props) {
  return _style.sizeContainer[props.size] || _style.sizeContainer['default'];
}, function (props) {
  return props.color || '#00adb5';
}, animate, function (props) {
  return props.speed || 1.5;
});

var NineCellLoading = function NineCellLoading(_ref) {
  var _ref$style = _ref.style,
      style = _ref$style === void 0 ? _style.commonStyle : _ref$style,
      color = _ref.color,
      _ref$size = _ref.size,
      size = _ref$size === void 0 ? "default" : _ref$size,
      speed = _ref.speed;
  return _react.default.createElement(LoadContainer, {
    style: style,
    speed: speed
  }, Array.from(Array(9)).map(function (item, index) {
    return _react.default.createElement(Item, {
      size: size,
      color: color,
      speed: speed,
      key: index
    });
  }));
};

var _default = NineCellLoading;
exports.default = _default;