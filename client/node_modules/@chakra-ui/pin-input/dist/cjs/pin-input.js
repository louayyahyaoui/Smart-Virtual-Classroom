"use strict";

exports.__esModule = true;
exports.PinInputField = exports.PinInput = void 0;

var _system = require("@chakra-ui/system");

var _utils = require("@chakra-ui/utils");

var React = _interopRequireWildcard(require("react"));

var _usePinInput = require("./use-pin-input");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var PinInput = function PinInput(props) {
  var styles = (0, _system.useStyleConfig)("PinInput", props);

  var _omitThemingProps = (0, _system.omitThemingProps)(props),
      children = _omitThemingProps.children,
      rest = _objectWithoutPropertiesLoose(_omitThemingProps, ["children"]);

  var context = (0, _usePinInput.usePinInput)(rest);
  var clones = (0, _utils.getValidChildren)(children).map(function (child) {
    return /*#__PURE__*/React.cloneElement(child, {
      __css: styles
    });
  });
  return /*#__PURE__*/React.createElement(_usePinInput.PinInputProvider, {
    value: context
  }, clones);
};

exports.PinInput = PinInput;

if (_utils.__DEV__) {
  PinInput.displayName = "PinInput";
}

var PinInputField = /*#__PURE__*/(0, _system.forwardRef)(function (props, ref) {
  var inputProps = (0, _usePinInput.usePinInputField)(props, ref);
  return /*#__PURE__*/React.createElement(_system.chakra.input, _extends({}, inputProps, {
    className: (0, _utils.cx)("chakra-pin-input", props.className)
  }));
});
exports.PinInputField = PinInputField;

if (_utils.__DEV__) {
  PinInputField.displayName = "PinInputField";
}
//# sourceMappingURL=pin-input.js.map