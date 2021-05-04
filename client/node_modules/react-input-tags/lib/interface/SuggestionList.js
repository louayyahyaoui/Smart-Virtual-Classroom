'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SuggestionList = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _SuggestionListDefault = require('../implementation/SuggestionListDefault');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var SuggestionList = function SuggestionList(_ref) {
  var SuggestionListImplementation = _ref.SuggestionListImplementation,
      suggestions = _ref.suggestions,
      highlightedSuggestionIndex = _ref.highlightedSuggestionIndex,
      handleHighlight = _ref.handleHighlight,
      handleSelect = _ref.handleSelect,
      getSuggestionValue = _ref.getSuggestionValue,
      otherProps = _objectWithoutProperties(_ref, ['SuggestionListImplementation', 'suggestions', 'highlightedSuggestionIndex', 'handleHighlight', 'handleSelect', 'getSuggestionValue']);

  return _react2.default.createElement(SuggestionListImplementation, _extends({
    suggestions: suggestions,
    highlightedSuggestionIndex: highlightedSuggestionIndex,
    handleHighlight: handleHighlight,
    handleSelect: handleSelect,
    getSuggestionValue: getSuggestionValue
  }, otherProps));
};

exports.SuggestionList = SuggestionList;
SuggestionList.propTypes = {
  SuggestionListImplementation: _propTypes2.default.func.isRequired,
  suggestions: _propTypes2.default.arrayOf(_propTypes2.default.any).isRequired,
  highlightedSuggestionIndex: _propTypes2.default.number.isRequired,
  handleHighlight: _propTypes2.default.func.isRequired,
  handleSelect: _propTypes2.default.func.isRequired,
  getSuggestionValue: _propTypes2.default.func.isRequired
};

SuggestionList.defaultProps = {
  SuggestionListImplementation: _SuggestionListDefault.SuggestionListDefault
};