"use strict";

exports.__esModule = true;
exports.useCheckboxGroup = useCheckboxGroup;

var _react = require("react");

var _hooks = require("@chakra-ui/hooks");

var _utils = require("@chakra-ui/utils");

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

/**
 * React hook that provides all the state management logic
 * for a group of checkboxes.
 *
 * It is consumed by the `CheckboxGroup` component
 */
function useCheckboxGroup(props) {
  if (props === void 0) {
    props = {};
  }

  var _props = props,
      defaultValue = _props.defaultValue,
      valueProp = _props.value,
      onChangeProp = _props.onChange,
      isNative = _props.isNative;

  var _useState = (0, _react.useState)(defaultValue || []),
      valueState = _useState[0],
      setValue = _useState[1];

  var _useControllableProp = (0, _hooks.useControllableProp)(valueProp, valueState),
      isControlled = _useControllableProp[0],
      value = _useControllableProp[1];

  var updateValue = (0, _react.useCallback)(function (nextState) {
    if (!isControlled) {
      setValue(nextState);
    }

    onChangeProp == null ? void 0 : onChangeProp(nextState);
  }, [isControlled, onChangeProp]);
  var onChange = (0, _react.useCallback)(function (eventOrValue) {
    if (!value) return;
    var isChecked = (0, _utils.isInputEvent)(eventOrValue) ? eventOrValue.target.checked : !value.includes(eventOrValue);
    var selectedValue = (0, _utils.isInputEvent)(eventOrValue) ? eventOrValue.target.value : eventOrValue;
    var nextValue = isChecked ? (0, _utils.addItem)(value, selectedValue) : (0, _utils.removeItem)(value, selectedValue);
    updateValue(nextValue);
  }, [updateValue, value]);
  return {
    value: value,
    onChange: onChange,
    setValue: updateValue,
    getCheckboxProps: function getCheckboxProps(props) {
      var _extends2;

      if (props === void 0) {
        props = {};
      }

      var checkedKey = isNative ? "checked" : "isChecked";
      return _extends({}, props, (_extends2 = {}, _extends2[checkedKey] = value.includes(props.value), _extends2.onChange = onChange, _extends2));
    }
  };
}
//# sourceMappingURL=use-checkbox-group.js.map