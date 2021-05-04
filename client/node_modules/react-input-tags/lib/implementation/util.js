'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var focusElement = exports.focusElement = function focusElement(element) {
  if (!element) return;
  element.focus();
};

var selectElement = exports.selectElement = function selectElement(element) {
  if (!element) return;
  element.select();
};

var noop = exports.noop = function noop() {};

var defaultClassNamePrefix = exports.defaultClassNamePrefix = 'react-input-tags';