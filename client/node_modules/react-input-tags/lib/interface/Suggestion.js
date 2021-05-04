'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Suggestion = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _SuggestionDefault = require('../implementation/SuggestionDefault');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var Suggestion = function Suggestion(_ref) {
  var SuggestionImplementation = _ref.SuggestionImplementation,
      value = _ref.value,
      isHighlighted = _ref.isHighlighted,
      handleHighlight = _ref.handleHighlight,
      handleSelect = _ref.handleSelect,
      otherProps = _objectWithoutProperties(_ref, ['SuggestionImplementation', 'value', 'isHighlighted', 'handleHighlight', 'handleSelect']);

  return _react2.default.createElement(SuggestionImplementation, _extends({
    value: value,
    isHighlighted: isHighlighted,
    handleHighlight: handleHighlight,
    handleSelect: handleSelect
  }, otherProps));
};

exports.Suggestion = Suggestion;
Suggestion.propTypes = {
  SuggestionImplementation: _propTypes2.default.func.isRequired,
  value: _propTypes2.default.any.isRequired,
  isHighlighted: _propTypes2.default.bool.isRequired,
  handleHighlight: _propTypes2.default.func.isRequired,
  handleSelect: _propTypes2.default.func.isRequired
};

Suggestion.defaultProps = {
  SuggestionImplementation: _SuggestionDefault.SuggestionDefault
};