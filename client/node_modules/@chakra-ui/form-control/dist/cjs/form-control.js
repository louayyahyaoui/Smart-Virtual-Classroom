"use strict";

exports.__esModule = true;
exports.FormHelperText = exports.FormControl = exports.useFormControlContext = void 0;

var _hooks = require("@chakra-ui/hooks");

var _system = require("@chakra-ui/system");

var _utils = require("@chakra-ui/utils");

var React = _interopRequireWildcard(require("react"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var _createContext = (0, _utils.createContext)({
  strict: false,
  name: "FormControlContext"
}),
    FormControlProvider = _createContext[0],
    useFormControlContext = _createContext[1];

exports.useFormControlContext = useFormControlContext;

function useFormControlProvider(props) {
  var idProp = props.id,
      isRequired = props.isRequired,
      isInvalid = props.isInvalid,
      isDisabled = props.isDisabled,
      isReadOnly = props.isReadOnly,
      htmlProps = _objectWithoutPropertiesLoose(props, ["id", "isRequired", "isInvalid", "isDisabled", "isReadOnly"]); // Generate all the required ids


  var uuid = (0, _hooks.useId)();
  var id = idProp || "field-" + uuid;
  var labelId = id + "-label";
  var feedbackId = id + "-feedback";
  var helpTextId = id + "-helptext";
  /**
   * Track whether the `FormErrorMessage` has been rendered.
   * We use this to append its id the the `aria-describedby` of the `input`.
   */

  var _useBoolean = (0, _hooks.useBoolean)(),
      hasFeedbackText = _useBoolean[0],
      setHasFeedbackText = _useBoolean[1];
  /**
   * Track whether the `FormHelperText` has been rendered.
   * We use this to append its id the the `aria-describedby` of the `input`.
   */


  var _useBoolean2 = (0, _hooks.useBoolean)(),
      hasHelpText = _useBoolean2[0],
      setHasHelpText = _useBoolean2[1]; // Track whether the form element (e.g, `input`) has focus.


  var _useBoolean3 = (0, _hooks.useBoolean)(),
      isFocused = _useBoolean3[0],
      setFocus = _useBoolean3[1];

  var context = {
    isRequired: !!isRequired,
    isInvalid: !!isInvalid,
    isReadOnly: !!isReadOnly,
    isDisabled: !!isDisabled,
    isFocused: !!isFocused,
    onFocus: setFocus.on,
    onBlur: setFocus.off,
    hasFeedbackText: hasFeedbackText,
    setHasFeedbackText: setHasFeedbackText,
    hasHelpText: hasHelpText,
    setHasHelpText: setHasHelpText,
    id: id,
    labelId: labelId,
    feedbackId: feedbackId,
    helpTextId: helpTextId,
    htmlProps: htmlProps
  };
  return context;
}

/**
 * FormControl provides context such as
 * `isInvalid`, `isDisabled`, and `isRequired` to form elements.
 *
 * This is commonly used in form elements such as `input`,
 * `select`, `textarea`, etc.
 */
var FormControl = /*#__PURE__*/(0, _system.forwardRef)(function (props, ref) {
  var styles = (0, _system.useMultiStyleConfig)("Form", props);
  var ownProps = (0, _system.omitThemingProps)(props);

  var _useFormControlProvid = useFormControlProvider(ownProps),
      htmlProps = _useFormControlProvid.htmlProps,
      context = _objectWithoutPropertiesLoose(_useFormControlProvid, ["htmlProps"]);

  var _className = (0, _utils.cx)("chakra-form-control", props.className);

  return /*#__PURE__*/React.createElement(FormControlProvider, {
    value: context
  }, /*#__PURE__*/React.createElement(_system.StylesProvider, {
    value: styles
  }, /*#__PURE__*/React.createElement(_system.chakra.div, _extends({
    role: "group",
    ref: ref
  }, htmlProps, {
    className: _className,
    __css: {
      width: "100%",
      position: "relative"
    }
  }))));
});
exports.FormControl = FormControl;

if (_utils.__DEV__) {
  FormControl.displayName = "FormControl";
}

/**
 * FormHelperText
 *
 * Assistive component that conveys additional guidance
 * about the field, such as how it will be used and what
 * types in values should be provided.
 */
var FormHelperText = /*#__PURE__*/(0, _system.forwardRef)(function (props, ref) {
  var _props$id;

  var field = useFormControlContext();
  var styles = (0, _system.useStyles)();
  /**
   * Notify the field context when the help text is rendered on screen,
   * so we can apply the correct `aria-describedby` to the field (e.g. input, textarea).
   */

  (0, _hooks.useSafeLayoutEffect)(function () {
    field == null ? void 0 : field.setHasHelpText.on();
    return function () {
      return field == null ? void 0 : field.setHasHelpText.off();
    };
  }, []);

  var _className = (0, _utils.cx)("chakra-form__helper-text", props.className);

  return /*#__PURE__*/React.createElement(_system.chakra.div, _extends({
    ref: ref,
    __css: styles.helperText
  }, props, {
    className: _className,
    id: (_props$id = props.id) != null ? _props$id : field == null ? void 0 : field.helpTextId
  }));
});
exports.FormHelperText = FormHelperText;

if (_utils.__DEV__) {
  FormHelperText.displayName = "FormHelperText";
}
//# sourceMappingURL=form-control.js.map