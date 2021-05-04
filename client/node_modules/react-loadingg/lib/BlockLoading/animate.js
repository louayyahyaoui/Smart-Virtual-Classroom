"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.animateFour = exports.animateThree = exports.animateTwo = exports.animateFirst = exports.Rotate = void 0;

var _styledComponents = require("styled-components");

function _templateObject5() {
  var data = _taggedTemplateLiteral(["\n  0% {\n    background: ", ";\n  }\n  25% {\n    background: ", ";\n  }\n  50% {\n    background: ", ";\n  }\n  75% {\n    background: ", ";\n  }\n  100% {\n    background: ", ";\n  }\n"]);

  _templateObject5 = function _templateObject5() {
    return data;
  };

  return data;
}

function _templateObject4() {
  var data = _taggedTemplateLiteral(["\n  0% {\n    background: ", ";\n  }\n  25% {\n    background: ", ";\n  }\n  50% {\n    background: ", ";\n  }\n  75% {\n    background: ", ";\n  }\n  100% {\n    background: ", ";\n  }\n"]);

  _templateObject4 = function _templateObject4() {
    return data;
  };

  return data;
}

function _templateObject3() {
  var data = _taggedTemplateLiteral(["\n  0% {\n    background: ", ";\n  }\n  25% {\n    background: ", ";\n  }\n  50% {\n    background: ", ";\n  }\n  75% {\n    background: ", ";\n  }\n  100% {\n    background: ", ";\n  }\n"]);

  _templateObject3 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2() {
  var data = _taggedTemplateLiteral(["\n  0% {\n    background: ", ";\n  }\n  25% {\n    background: ", ";\n  }\n  50% {\n    background: ", ";\n  }\n  75% {\n    background: ", ";\n  }\n  100% {\n    background: ", ";\n  }\n"]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n  0% {\n    transform: rotate(0deg);\n  }\n  25% {\n    transform: rotate(90deg);\n  }\n  50% {\n    transform: rotate(180deg);\n  }\n  75% {\n    transform: rotate(270deg);\n  }\n  100% {\n    transform: rotate(360deg);\n  }\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var $InColor = '#f9c094';
var $color = '#00adb5';
var Rotate = (0, _styledComponents.keyframes)(_templateObject());
exports.Rotate = Rotate;

var animateFirst = function animateFirst(color) {
  return (0, _styledComponents.keyframes)(_templateObject2(), $InColor, color, color, color, $InColor);
};

exports.animateFirst = animateFirst;

var animateTwo = function animateTwo(color) {
  return (0, _styledComponents.keyframes)(_templateObject3(), color, $InColor, color, color, color);
};

exports.animateTwo = animateTwo;

var animateThree = function animateThree(color) {
  return (0, _styledComponents.keyframes)(_templateObject4(), color, color, $InColor, color, color);
};

exports.animateThree = animateThree;

var animateFour = function animateFour(color) {
  return (0, _styledComponents.keyframes)(_templateObject5(), color, color, color, $InColor, color);
};

exports.animateFour = animateFour;