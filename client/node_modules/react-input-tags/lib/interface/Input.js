'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Input = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _InputDefault = require('../implementation/InputDefault');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var Input = function Input(_ref) {
  var InputImplementation = _ref.InputImplementation,
      value = _ref.value,
      handleOnChange = _ref.handleOnChange,
      handleOnBlur = _ref.handleOnBlur,
      handleOnKeyDown = _ref.handleOnKeyDown,
      otherProps = _objectWithoutProperties(_ref, ['InputImplementation', 'value', 'handleOnChange', 'handleOnBlur', 'handleOnKeyDown']);

  return _react2.default.createElement(InputImplementation, _extends({
    value: value,
    handleOnChange: handleOnChange,
    handleOnBlur: handleOnBlur,
    handleOnKeyDown: handleOnKeyDown
  }, otherProps));
};

exports.Input = Input;
Input.propTypes = {
  InputImplementation: _propTypes2.default.func.isRequired,
  value: _propTypes2.default.string.isRequired,
  handleOnChange: _propTypes2.default.func.isRequired,
  handleOnBlur: _propTypes2.default.func.isRequired,
  handleOnKeyDown: _propTypes2.default.func.isRequired
};

Input.defaultProps = {
  InputImplementation: _InputDefault.InputDefault
};