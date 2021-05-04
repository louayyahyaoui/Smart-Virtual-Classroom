"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isElement = exports.isModifier = void 0;

var isModifier = function isModifier(key) {
  return key[0] === '&';
};

exports.isModifier = isModifier;

var isElement = function isElement(key) {
  return !isModifier(key);
};

exports.isElement = isElement;