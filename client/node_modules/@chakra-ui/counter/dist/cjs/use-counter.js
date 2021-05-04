"use strict";

exports.__esModule = true;
exports.useCounter = useCounter;

var _hooks = require("@chakra-ui/hooks");

var _utils = require("@chakra-ui/utils");

var _react = require("react");

function useCounter(props) {
  if (props === void 0) {
    props = {};
  }

  var _props = props,
      onChange = _props.onChange,
      precisionProp = _props.precision,
      defaultValue = _props.defaultValue,
      valueProp = _props.value,
      _props$step = _props.step,
      stepProp = _props$step === void 0 ? 1 : _props$step,
      _props$min = _props.min,
      min = _props$min === void 0 ? _utils.minSafeInteger : _props$min,
      _props$max = _props.max,
      max = _props$max === void 0 ? _utils.maxSafeInteger : _props$max,
      _props$keepWithinRang = _props.keepWithinRange,
      keepWithinRange = _props$keepWithinRang === void 0 ? true : _props$keepWithinRang;

  var _useState = (0, _react.useState)(function () {
    if (defaultValue == null) return "";
    return cast(defaultValue, stepProp, precisionProp);
  }),
      valueState = _useState[0],
      setValue = _useState[1];
  /**
   * Because the component that consumes this hook can be controlled or uncontrolled
   * we'll keep track of that
   */


  var _useControllableProp = (0, _hooks.useControllableProp)(valueProp, valueState),
      isControlled = _useControllableProp[0],
      value = _useControllableProp[1];

  var decimalPlaces = getDecimalPlaces(parse(value), stepProp);
  var precision = precisionProp != null ? precisionProp : decimalPlaces;
  var update = (0, _react.useCallback)(function (next) {
    if (!isControlled) {
      setValue(next.toString());
    }

    onChange == null ? void 0 : onChange(next.toString(), parse(next));
  }, [onChange, isControlled]); // Function to clamp the value and round it to the precision

  var clamp = (0, _react.useCallback)(function (value) {
    var nextValue = value;

    if (keepWithinRange) {
      nextValue = (0, _utils.clampValue)(nextValue, min, max);
    }

    return (0, _utils.toPrecision)(nextValue, precision);
  }, [precision, keepWithinRange, max, min]);
  var increment = (0, _react.useCallback)(function (step) {
    if (step === void 0) {
      step = stepProp;
    }

    var next;
    /**
     * Let's follow the native browser behavior for
     * scenarios where the input starts empty ("")
     */

    if (value === "") {
      /**
       * If `min` is set, native input, starts at the `min`.
       * Else, it starts at `step`
       */
      next = parse(step);
    } else {
      next = parse(value) + step;
    }

    next = clamp(next);
    update(next);
  }, [clamp, stepProp, update, value]);
  var decrement = (0, _react.useCallback)(function (step) {
    if (step === void 0) {
      step = stepProp;
    }

    var next; // Same thing here. We'll follow native implementation

    if (value === "") {
      next = parse(-step);
    } else {
      next = parse(value) - step;
    }

    next = clamp(next);
    update(next);
  }, [clamp, stepProp, update, value]);
  var reset = (0, _react.useCallback)(function () {
    var next;

    if (defaultValue == null) {
      next = "";
    } else {
      next = cast(defaultValue, stepProp, precisionProp);
    }

    update(next);
  }, [defaultValue, precisionProp, stepProp, update]);
  var castValue = (0, _react.useCallback)(function (value) {
    update(cast(value, stepProp, precision));
  }, [precision, stepProp, update]);
  var valueAsNumber = parse(value);
  /**
   * Common range checks
   */

  var isOutOfRange = valueAsNumber > max || valueAsNumber < min;
  var isAtMax = valueAsNumber === max;
  var isAtMin = valueAsNumber === min;
  return {
    isOutOfRange: isOutOfRange,
    isAtMax: isAtMax,
    isAtMin: isAtMin,
    precision: precision,
    value: value,
    valueAsNumber: valueAsNumber,
    update: update,
    reset: reset,
    increment: increment,
    decrement: decrement,
    clamp: clamp,
    cast: castValue
  };
}

function parse(value) {
  return parseFloat(value.toString().replace(/[^\w.-]+/g, ""));
}

function getDecimalPlaces(value, step) {
  return Math.max((0, _utils.countDecimalPlaces)(step), (0, _utils.countDecimalPlaces)(value));
}

function cast(value, step, precision) {
  var decimalPlaces = getDecimalPlaces(parse(value), step);
  return (0, _utils.toPrecision)(parse(value), precision != null ? precision : decimalPlaces);
}
//# sourceMappingURL=use-counter.js.map