"use strict";

exports.__esModule = true;
exports.Checkbox = void 0;

var _system = require("@chakra-ui/system");

var _utils = require("@chakra-ui/utils");

var React = _interopRequireWildcard(require("react"));

var _checkboxGroup = require("./checkbox-group");

var _checkboxIcon = require("./checkbox-icon");

var _useCheckbox2 = require("./use-checkbox");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var StyledControl = (0, _system.chakra)("span", {
  baseStyle: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    verticalAlign: "top",
    userSelect: "none",
    flexShrink: 0
  }
});
var StyledContainer = (0, _system.chakra)("label", {
  baseStyle: {
    cursor: "pointer",
    display: "inline-flex",
    alignItems: "center",
    verticalAlign: "top",
    position: "relative",
    _disabled: {
      cursor: "not-allowed"
    }
  }
});

/**
 * Checkbox
 *
 * React component used in forms when a user needs to select
 * multiple values from several options.
 *
 * @see Docs https://chakra-ui.com/docs/form/checkbox
 */
var Checkbox = /*#__PURE__*/(0, _system.forwardRef)(function (props, ref) {
  var group = (0, _checkboxGroup.useCheckboxGroupContext)();

  var mergedProps = _extends({}, group, props);

  var styles = (0, _system.useMultiStyleConfig)("Checkbox", mergedProps);
  var ownProps = (0, _system.omitThemingProps)(props);

  var _ownProps$spacing = ownProps.spacing,
      spacing = _ownProps$spacing === void 0 ? "0.5rem" : _ownProps$spacing,
      className = ownProps.className,
      children = ownProps.children,
      iconColor = ownProps.iconColor,
      iconSize = ownProps.iconSize,
      _ownProps$icon = ownProps.icon,
      Icon = _ownProps$icon === void 0 ? /*#__PURE__*/React.createElement(_checkboxIcon.CheckboxIcon, null) : _ownProps$icon,
      isCheckedProp = ownProps.isChecked,
      onChangeProp = ownProps.onChange,
      rest = _objectWithoutPropertiesLoose(ownProps, ["spacing", "className", "children", "iconColor", "iconSize", "icon", "isChecked", "onChange"]);

  var isChecked = isCheckedProp;

  if (group != null && group.value && ownProps.value) {
    isChecked = group.value.includes(ownProps.value);
  }

  var onChange = onChangeProp;

  if (group != null && group.onChange && ownProps.value) {
    onChange = (0, _utils.callAll)(group.onChange, onChangeProp);
  }

  var _useCheckbox = (0, _useCheckbox2.useCheckbox)(_extends({}, rest, {
    isChecked: isChecked,
    onChange: onChange
  })),
      state = _useCheckbox.state,
      getInputProps = _useCheckbox.getInputProps,
      getCheckboxProps = _useCheckbox.getCheckboxProps,
      getLabelProps = _useCheckbox.getLabelProps,
      htmlProps = _useCheckbox.htmlProps;

  var _className = (0, _utils.cx)("chakra-checkbox", className);

  var inputProps = getInputProps({}, ref);
  var labelProps = getLabelProps();
  var checkboxProps = getCheckboxProps();

  var iconStyles = _extends({
    opacity: state.isChecked || state.isIndeterminate ? 1 : 0,
    transform: state.isChecked || state.isIndeterminate ? "scale(1)" : "scale(0.95)",
    transition: "transform 200ms",
    fontSize: iconSize,
    color: iconColor
  }, styles.icon);

  var clonedIcon = /*#__PURE__*/React.cloneElement(Icon, {
    __css: iconStyles,
    isIndeterminate: state.isIndeterminate,
    isChecked: state.isChecked
  });
  return /*#__PURE__*/React.createElement(StyledContainer, _extends({
    __css: styles.container,
    "data-disabled": (0, _utils.dataAttr)(state.isDisabled),
    className: _className
  }, htmlProps), /*#__PURE__*/React.createElement("input", _extends({
    className: "chakra-checkbox__input"
  }, inputProps)), /*#__PURE__*/React.createElement(StyledControl, _extends({
    __css: styles.control,
    className: "chakra-checkbox__control"
  }, checkboxProps), clonedIcon), children && /*#__PURE__*/React.createElement(_system.chakra.span, _extends({
    className: "chakra-checkbox__label"
  }, labelProps, {
    __css: _extends({
      marginStart: spacing
    }, styles.label)
  }), children));
});
exports.Checkbox = Checkbox;

if (_utils.__DEV__) {
  Checkbox.displayName = "Checkbox";
}
//# sourceMappingURL=checkbox.js.map