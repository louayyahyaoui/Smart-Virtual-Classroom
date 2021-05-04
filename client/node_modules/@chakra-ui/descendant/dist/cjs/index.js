"use strict";

exports.__esModule = true;

var _useDescendant = require("./use-descendant");

Object.keys(_useDescendant).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _useDescendant[key]) return;
  exports[key] = _useDescendant[key];
});
//# sourceMappingURL=index.js.map