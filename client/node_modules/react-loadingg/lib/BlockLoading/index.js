"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _animate = require("./animate");

var _style = require("../utils/style");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _templateObject6() {
  var data = _taggedTemplateLiteral(["\n  animation: ", " ", "s infinite ease-in-out;\n"]);

  _templateObject6 = function _templateObject6() {
    return data;
  };

  return data;
}

function _templateObject5() {
  var data = _taggedTemplateLiteral(["\n  animation: ", " ", "s infinite ease-in-out;\n"]);

  _templateObject5 = function _templateObject5() {
    return data;
  };

  return data;
}

function _templateObject4() {
  var data = _taggedTemplateLiteral(["\n  animation: ", " ", "s infinite ease-in-out;\n"]);

  _templateObject4 = function _templateObject4() {
    return data;
  };

  return data;
}

function _templateObject3() {
  var data = _taggedTemplateLiteral(["\n  animation: ", " ", "s infinite ease-in-out;\n"]);

  _templateObject3 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2() {
  var data = _taggedTemplateLiteral(["\n  width: ", ";\n  height: ", ";\n  margin: auto;\n"]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n  width: ", ";\n  height: ", ";\n  display: flex;\n  justify-content: space-between;\n  flex-wrap: wrap;\n  align-items: center;\n  animation: ", " ", "s infinite ease-in-out;\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var LoadContainer = _styledComponents.default.div(_templateObject(), function (props) {
  return _style.sizeContainer[props.size] || _style.sizeContainer['default'];
}, function (props) {
  return _style.sizeContainer[props.size] || _style.sizeContainer['default'];
}, _animate.Rotate, function (props) {
  return props.speed || 8;
});

var Item = _styledComponents.default.div(_templateObject2(), function (props) {
  return _style.sizeItem[props.size] || _style.sizeItem['default'];
}, function (props) {
  return _style.sizeItem[props.size] || _style.sizeItem['default'];
});

var ItemFirst = (0, _styledComponents.default)(Item)(_templateObject3(), function (props) {
  return (0, _animate.animateFirst)(props.color || '#00adb5');
}, function (props) {
  return props.speed / 4 || 2;
});
var ItemTwo = (0, _styledComponents.default)(Item)(_templateObject4(), function (props) {
  return (0, _animate.animateTwo)(props.color || '#00adb5');
}, function (props) {
  return props.speed / 4 || 2;
});
var ItemThree = (0, _styledComponents.default)(Item)(_templateObject5(), function (props) {
  return (0, _animate.animateThree)(props.color || '#00adb5');
}, function (props) {
  return props.speed / 4 || 2;
});
var ItemFour = (0, _styledComponents.default)(Item)(_templateObject6(), function (props) {
  return (0, _animate.animateFour)(props.color || '#00adb5');
}, function (props) {
  return props.speed / 4 || 2;
});

var BlockLoading = function BlockLoading(_ref) {
  var _ref$style = _ref.style,
      style = _ref$style === void 0 ? _style.commonStyle : _ref$style,
      speed = _ref.speed,
      _ref$size = _ref.size,
      size = _ref$size === void 0 ? "default" : _ref$size,
      color = _ref.color;
  return _react.default.createElement(LoadContainer, {
    style: style,
    speed: speed,
    size: size
  }, _react.default.createElement(ItemFirst, {
    speed: speed,
    size: size,
    color: color
  }), _react.default.createElement(ItemTwo, {
    speed: speed,
    size: size,
    color: color
  }), _react.default.createElement(ItemFour, {
    speed: speed,
    size: size,
    color: color
  }), _react.default.createElement(ItemThree, {
    speed: speed,
    size: size,
    color: color
  }));
};

var _default = BlockLoading;
exports.default = _default;