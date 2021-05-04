"use strict";

exports.__esModule = true;
exports.transform = void 0;
var templates = {
  auto: "var(--chakra-transform)",
  "auto-gpu": "var(--chakra-transform-gpu)"
};
var transform = {
  transform: {
    property: "transform",
    transform: function transform(value) {
      var _templates$value;

      return (_templates$value = templates[value]) != null ? _templates$value : value;
    }
  },
  transformOrigin: true
};
exports.transform = transform;
//# sourceMappingURL=transform.js.map