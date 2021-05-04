"use strict";

exports.__esModule = true;
exports.usePinInput = usePinInput;
exports.usePinInputField = usePinInputField;
exports.usePinInputContext = exports.PinInputProvider = void 0;

var _descendant = require("@chakra-ui/descendant");

var _hooks = require("@chakra-ui/hooks");

var _utils = require("@chakra-ui/utils");

var React = _interopRequireWildcard(require("react"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var _createContext = (0, _utils.createContext)({
  name: "PinInputContext",
  errorMessage: "usePinInputContext: `context` is undefined. Seems you forgot to all pin input fields within `<PinInput />`"
}),
    PinInputProvider = _createContext[0],
    usePinInputContext = _createContext[1];

exports.usePinInputContext = usePinInputContext;
exports.PinInputProvider = PinInputProvider;

var toArray = function toArray(value) {
  return value == null ? void 0 : value.split("");
};

function validate(value, type) {
  var NUMERIC_REGEX = /^[0-9]+$/;
  var ALPHA_NUMERIC_REGEX = /^[a-zA-Z0-9]+$/i;
  var regex = type === "alphanumeric" ? ALPHA_NUMERIC_REGEX : NUMERIC_REGEX;
  return regex.test(value);
}

function usePinInput(props) {
  if (props === void 0) {
    props = {};
  }

  var _props = props,
      autoFocus = _props.autoFocus,
      value = _props.value,
      defaultValue = _props.defaultValue,
      _onChange = _props.onChange,
      onComplete = _props.onComplete,
      _props$placeholder = _props.placeholder,
      placeholder = _props$placeholder === void 0 ? "○" : _props$placeholder,
      _props$manageFocus = _props.manageFocus,
      manageFocus = _props$manageFocus === void 0 ? true : _props$manageFocus,
      _props$otp = _props.otp,
      otp = _props$otp === void 0 ? false : _props$otp,
      idProp = _props.id,
      isDisabled = _props.isDisabled,
      isInvalid = _props.isInvalid,
      _props$type = _props.type,
      type = _props$type === void 0 ? "number" : _props$type,
      mask = _props.mask;
  var uuid = (0, _hooks.useId)();
  var id = idProp != null ? idProp : "pin-input-" + uuid;
  var domContext = (0, _descendant.useDescendants)();
  var descendants = domContext.descendants;

  var _React$useState = React.useState(true),
      moveFocus = _React$useState[0],
      setMoveFocus = _React$useState[1];

  var _useControllableState = (0, _hooks.useControllableState)({
    defaultValue: toArray(defaultValue) || [],
    value: toArray(value),
    onChange: function onChange(values) {
      return _onChange == null ? void 0 : _onChange(values.join(""));
    }
  }),
      values = _useControllableState[0],
      setValues = _useControllableState[1];

  React.useEffect(function () {
    if (autoFocus) {
      var _firstInput$element;

      var firstInput = descendants[0];
      firstInput == null ? void 0 : (_firstInput$element = firstInput.element) == null ? void 0 : _firstInput$element.focus();
    } // We don't want to listen for updates to `autoFocus` since it only runs initially
    // eslint-disable-next-line

  }, [descendants]);
  var focusNext = React.useCallback(function (index) {
    var _nextInput$element;

    if (!moveFocus || !manageFocus) return;
    var nextInput = descendants[index + 1];
    nextInput == null ? void 0 : (_nextInput$element = nextInput.element) == null ? void 0 : _nextInput$element.focus();
  }, [descendants, moveFocus, manageFocus]);
  var setValue = React.useCallback(function (value, index) {
    var nextValues = [].concat(values);
    nextValues[index] = value;
    setValues(nextValues);
    var isComplete = value !== "" && index === descendants.length - 1 && nextValues.every(function (inputValue) {
      return inputValue !== "";
    });

    if (isComplete) {
      onComplete == null ? void 0 : onComplete(nextValues.join(""));
    } else {
      focusNext(index);
    }
  }, [values, setValues, focusNext, onComplete, descendants.length]);
  var clear = React.useCallback(function () {
    var _firstInput$element2;

    var values = Array(descendants.length).fill("");
    setValues(values);
    var firstInput = descendants[0];
    (_firstInput$element2 = firstInput.element) == null ? void 0 : _firstInput$element2.focus();
  }, [descendants, setValues]);
  var getNextValue = React.useCallback(function (value, eventValue) {
    var nextValue = eventValue;

    if ((value == null ? void 0 : value.length) > 0) {
      if (value[0] === eventValue.charAt(0)) {
        nextValue = eventValue.charAt(1);
      } else if (value[0] === eventValue.charAt(1)) {
        nextValue = eventValue.charAt(0);
      }
    }

    return nextValue;
  }, []);

  var _React$useState2 = React.useState(-1),
      focusedIndex = _React$useState2[0],
      setFocusedIndex = _React$useState2[1];

  var getInputProps = React.useCallback(function (props) {
    var index = props.index,
        rest = _objectWithoutPropertiesLoose(props, ["index"]);
    /**
     * Improved from: https://github.com/uber/baseweb/blob/master/src/pin-code/pin-code.js
     */


    var onChange = function onChange(event) {
      var eventValue = event.target.value;
      var currentValue = values[index];
      var nextValue = getNextValue(currentValue, eventValue); // if the value was removed using backspace

      if (nextValue === "") {
        setValue("", index);
        return;
      } // in the case of an autocomplete or copy and paste


      if (eventValue.length > 2) {
        // see if we can use the string to fill out our values
        if (validate(eventValue, type)) {
          // Ensure the value matches the number of inputs
          var _nextValue = eventValue.split("").filter(function (_, index) {
            return index < descendants.length;
          });

          setValues(_nextValue); // if pasting fills the entire input fields, trigger `onComplete`

          if (_nextValue.length === descendants.length) {
            onComplete == null ? void 0 : onComplete(_nextValue.join(""));
          }
        }
      } else {
        // only set if the new value is a number
        if (validate(nextValue, type)) {
          setValue(nextValue, index);
        }

        setMoveFocus(true);
      }
    };

    var onKeyDown = function onKeyDown(event) {
      if (event.key === "Backspace" && manageFocus) {
        if (event.target.value === "") {
          var prevInput = descendants[index - 1];

          if (prevInput) {
            var _prevInput$element;

            setValue("", index - 1);
            (_prevInput$element = prevInput.element) == null ? void 0 : _prevInput$element.focus();
            setMoveFocus(true);
          }
        } else {
          setMoveFocus(false);
        }
      }
    };

    var onFocus = function onFocus() {
      setFocusedIndex(index);
    };

    var onBlur = function onBlur() {
      setFocusedIndex(-1);
    };

    var hasFocus = focusedIndex === index;
    var inputType = type === "number" ? "tel" : "text";
    return _extends({
      "aria-label": "Please enter your pin code",
      inputMode: type === "number" ? "numeric" : "text",
      type: mask ? "password" : inputType
    }, rest, {
      id: id + "-" + index,
      disabled: isDisabled,
      "aria-invalid": (0, _utils.ariaAttr)(isInvalid),
      onChange: (0, _utils.callAllHandlers)(rest.onChange, onChange),
      onKeyDown: (0, _utils.callAllHandlers)(rest.onKeyDown, onKeyDown),
      onFocus: (0, _utils.callAllHandlers)(rest.onFocus, onFocus),
      onBlur: (0, _utils.callAllHandlers)(rest.onBlur, onBlur),
      value: values[index] || "",
      autoComplete: otp ? "one-time-code" : "off",
      placeholder: hasFocus ? "" : placeholder
    });
  }, [descendants, focusedIndex, getNextValue, id, isDisabled, mask, isInvalid, manageFocus, onComplete, otp, placeholder, setValue, setValues, type, values]);
  return {
    // prop getter
    getInputProps: getInputProps,
    // state
    id: id,
    domContext: domContext,
    values: values,
    // actions
    setValue: setValue,
    setValues: setValues,
    clear: clear
  };
}

function usePinInputField(props, forwardedRef) {
  if (props === void 0) {
    props = {};
  }

  if (forwardedRef === void 0) {
    forwardedRef = null;
  }

  var ref = React.useRef(null);

  var _usePinInputContext = usePinInputContext(),
      domContext = _usePinInputContext.domContext,
      getInputProps = _usePinInputContext.getInputProps;

  var index = (0, _descendant.useDescendant)({
    context: domContext,
    element: ref.current
  });
  return getInputProps(_extends({}, props, {
    ref: (0, _utils.mergeRefs)(ref, forwardedRef),
    index: index
  }));
}
//# sourceMappingURL=use-pin-input.js.map