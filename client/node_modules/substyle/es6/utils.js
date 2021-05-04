import _defineProperty from "@babel/runtime/helpers/defineProperty";
export var keys = function keys(obj) {
  return obj === Object(obj) ? Object.keys(obj) : [];
};
export var values = function values(obj) {
  return obj === Object(obj) ? Object.values(obj) : [];
};

function mergeDeep(target, source) {
  var output = Object.assign({}, target);

  if (isPlainObject(target) && isPlainObject(source)) {
    keys(source).forEach(function (key) {
      if (isPlainObject(source[key])) {
        if (!(key in target)) Object.assign(output, _defineProperty({}, key, source[key]));else output[key] = mergeDeep(target[key], source[key]);
      } else {
        Object.assign(output, _defineProperty({}, key, source[key]));
      }
    });
  }

  return output;
}

export var merge = function merge(target) {
  for (var _len = arguments.length, sources = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    sources[_key - 1] = arguments[_key];
  }

  return sources.reduce(function (t, s) {
    return mergeDeep(t, s);
  }, target);
};
export var identity = function identity(value) {
  return value;
};
export var omit = function omit(obj, keys) {
  var other = Object.assign({}, obj);

  if (keys) {
    for (var i = 0; i < keys.length; i++) {
      delete other[keys[i]];
    }
  }

  return other;
};
export var isPlainObject = function isPlainObject(obj) {
  return obj === Object(obj) && !(obj instanceof Date) && !Array.isArray(obj);
};
export var compact = function compact(arr) {
  return (arr || []).filter(Boolean);
};