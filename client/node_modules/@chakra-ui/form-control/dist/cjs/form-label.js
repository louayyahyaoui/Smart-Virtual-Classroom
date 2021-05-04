"use strict";

exports.__esModule = true;
exports.useFieldLabel = useFieldLabel;
exports.RequiredIndicator = exports.FormLabel = void 0;

var _system = require("@chakra-ui/system");

var _utils = require("@chakra-ui/utils");

var React = _interopRequireWildcard(require("react"));

var _formControl = require("./form-control");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function useFieldLabel(props) {
  var _props$id, _props$htmlFor;

  var field = (0, _formControl.useFormControlContext)();
  return _extends({}, props, {
    "data-focus": (0, _utils.dataAttr)(field == null ? void 0 : field.isFocused),
    "data-disabled": (0, _utils.dataAttr)(field == null ? void 0 : field.isDisabled),
    "data-invalid": (0, _utils.dataAttr)(field == null ? void 0 : field.isInvalid),
    "data-readonly": (0, _utils.dataAttr)(field == null ? void 0 : field.isReadOnly),
    id: (_props$id = props.id) != null ? _props$id : field == null ? void 0 : field.labelId,
    htmlFor: (_props$htmlFor = props.htmlFor) != null ? _props$htmlFor : field == null ? void 0 : field.id
  });
}

/**
 * Used to enhance the usability of form controls.
 *
 * It is used to inform users as to what information
 * is requested for a form field.
 *
 * ♿️ Accessibility: Every form field should have a form label.
 */
var FormLabel = /*#__PURE__*/(0, _system.forwardRef)(function (passedProps, ref) {
  var styles = (0, _system.useStyleConfig)("FormLabel", passedProps);
  var props = (0, _system.omitThemingProps)(passedProps);

  var className = props.className,
      children = props.children,
      _props$requiredIndica = props.requiredIndicator,
      requiredIndicator = _props$requiredIndica === void 0 ? /*#__PURE__*/React.createElement(RequiredIndicator, null) : _props$requiredIndica,
      rest = _objectWithoutPropertiesLoose(props, ["className", "children", "requiredIndicator"]);

  var ownProps = useFieldLabel(rest);
  var field = (0, _formControl.useFormControlContext)();
  return /*#__PURE__*/React.createElement(_system.chakra.label, _extends({
    ref: ref,
    className: (0, _utils.cx)("chakra-form__label", props.className),
    __css: _extends({
      display: "block",
      textAlign: "start"
    }, styles)
  }, ownProps), children, field != null && field.isRequired ? requiredIndicator : null);
});
exports.FormLabel = FormLabel;

if (_utils.__DEV__) {
  FormLabel.displayName = "FormLabel";
}

/**
 * Used to show a "required" text or an asterisks (*) to indicate that
 * a field is required.
 */
var RequiredIndicator = /*#__PURE__*/(0, _system.forwardRef)(function (props, ref) {
  var children = props.children,
      className = props.className,
      rest = _objectWithoutPropertiesLoose(props, ["children", "className"]);

  var field = (0, _formControl.useFormControlContext)();
  var styles = (0, _system.useStyles)();
  if (!(field != null && field.isRequired)) return null;

  var _className = (0, _utils.cx)("chakra-form__required-indicator", className);

  return /*#__PURE__*/React.createElement(_system.chakra.span, _extends({
    role: "presentation",
    "aria-hidden": true,
    ref: ref
  }, rest, {
    __css: styles.requiredIndicator,
    className: _className
  }), children || "*");
});
exports.RequiredIndicator = RequiredIndicator;

if (_utils.__DEV__) {
  RequiredIndicator.displayName = "RequiredIndicator";
}
//# sourceMappingURL=form-label.js.map