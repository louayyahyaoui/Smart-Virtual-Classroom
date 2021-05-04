"use strict";

exports.__esModule = true;
exports.useFormControl = useFormControl;

var _utils = require("@chakra-ui/utils");

var _formControl = require("./form-control");

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

/**
 * React hook that provides the props that should be spread on to
 * input fields (`input`, `select`, `textarea`, etc.).
 *
 * It provides a convenient way to control a form fields, validation
 * and helper text.
 */
function useFormControl(props) {
  var _props$id;

  var field = (0, _formControl.useFormControlContext)();
  var describedBy = []; // Error message must be described first in all scenarios.

  if (field != null && field.hasFeedbackText) describedBy.push(field.feedbackId);
  if (field != null && field.hasHelpText) describedBy.push(field.helpTextId);
  var ariaDescribedBy = describedBy.join(" ");
  var cleanProps = (0, _utils.omit)(props, ["isInvalid", "isDisabled", "isReadOnly", "isRequired"]);
  return _extends({}, cleanProps, {
    id: (_props$id = props.id) != null ? _props$id : field == null ? void 0 : field.id,
    disabled: props.disabled || props.isDisabled || (field == null ? void 0 : field.isDisabled),
    readOnly: props.readOnly || props.isReadOnly || (field == null ? void 0 : field.isReadOnly),
    required: props.required || props.isRequired || (field == null ? void 0 : field.isRequired),
    "aria-invalid": (0, _utils.ariaAttr)(props.isInvalid || (field == null ? void 0 : field.isInvalid)),
    "aria-required": (0, _utils.ariaAttr)(props.isRequired || (field == null ? void 0 : field.isRequired)),
    "aria-readonly": (0, _utils.ariaAttr)(props.isReadOnly || (field == null ? void 0 : field.isReadOnly)),
    "aria-describedby": ariaDescribedBy || undefined,
    onFocus: (0, _utils.callAllHandlers)(field == null ? void 0 : field.onFocus, props.onFocus),
    onBlur: (0, _utils.callAllHandlers)(field == null ? void 0 : field.onBlur, props.onBlur)
  });
}
//# sourceMappingURL=use-form-control.js.map