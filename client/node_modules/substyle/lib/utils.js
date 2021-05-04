"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.compact = exports.isPlainObject = exports.omit = exports.identity = exports.merge = exports.values = exports.keys = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var keys = function keys(obj) {
  return obj === Object(obj) ? Object.keys(obj) : [];
};

exports.keys = keys;

var values = function values(obj) {
  return obj === Object(obj) ? Object.values(obj) : [];
};

exports.values = values;

function mergeDeep(target, source) {
  var output = Object.assign({}, target);

  if (isPlainObject(target) && isPlainObject(source)) {
    keys(source).forEach(function (key) {
      if (isPlainObject(source[key])) {
        if (!(key in target)) Object.assign(output, (0, _defineProperty2.default)({}, key, source[key]));else output[key] = mergeDeep(target[key], source[key]);
      } else {
        Object.assign(output, (0, _defineProperty2.default)({}, key, source[key]));
      }
    });
  }

  return output;
}

var merge = function merge(target) {
  for (var _len = arguments.length, sources = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    sources[_key - 1] = arguments[_key];
  }

  return sources.reduce(function (t, s) {
    return mergeDeep(t, s);
  }, target);
};

exports.merge = merge;

var identity = function identity(value) {
  return value;
};

exports.identity = identity;

var omit = function omit(obj, keys) {
  var other = Object.assign({}, obj);

  if (keys) {
    for (var i = 0; i < keys.length; i++) {
      delete other[keys[i]];
    }
  }

  return other;
};

exports.omit = omit;

var isPlainObject = function isPlainObject(obj) {
  return obj === Object(obj) && !(obj instanceof Date) && !Array.isArray(obj);
};

exports.isPlainObject = isPlainObject;

var compact = function compact(arr) {
  return (arr || []).filter(Boolean);
};

exports.compact = compact;