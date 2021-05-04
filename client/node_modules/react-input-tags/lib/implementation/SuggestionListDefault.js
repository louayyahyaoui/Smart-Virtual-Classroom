'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SuggestionListDefault = exports.SuggestionListClassNameDefault = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _Suggestion = require('../interface/Suggestion');

var _util = require('./util');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SuggestionListClassNameDefault = exports.SuggestionListClassNameDefault = _util.defaultClassNamePrefix + '-suggestion-list';

/* eslint-disable react/prefer-stateless-function */

var SuggestionListDefault = exports.SuggestionListDefault = function (_React$Component) {
  _inherits(SuggestionListDefault, _React$Component);

  function SuggestionListDefault() {
    _classCallCheck(this, SuggestionListDefault);

    return _possibleConstructorReturn(this, (SuggestionListDefault.__proto__ || Object.getPrototypeOf(SuggestionListDefault)).apply(this, arguments));
  }

  _createClass(SuggestionListDefault, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          suggestions = _props.suggestions,
          highlightedSuggestionIndex = _props.highlightedSuggestionIndex,
          _handleHighlight = _props.handleHighlight,
          _handleSelect = _props.handleSelect,
          getSuggestionValue = _props.getSuggestionValue,
          SuggestionListClassName = _props.SuggestionListClassName,
          otherProps = _objectWithoutProperties(_props, ['suggestions', 'highlightedSuggestionIndex', 'handleHighlight', 'handleSelect', 'getSuggestionValue', 'SuggestionListClassName']);

      return _react2.default.createElement(
        'ul',
        { className: SuggestionListClassName },
        suggestions.map(function (suggestion, index) {
          var isHighlighted = highlightedSuggestionIndex === index;
          return _react2.default.createElement(_Suggestion.Suggestion, _extends({
            key: index,
            value: suggestion,
            isHighlighted: isHighlighted,
            handleHighlight: function handleHighlight() {
              return _handleHighlight(index);
            },
            handleSelect: function handleSelect() {
              return _handleSelect(getSuggestionValue(suggestion));
            }
          }, otherProps));
        })
      );
    }
  }]);

  return SuggestionListDefault;
}(_react2.default.Component);

SuggestionListDefault.propTypes = {
  suggestions: _propTypes2.default.arrayOf(_propTypes2.default.any).isRequired,
  highlightedSuggestionIndex: _propTypes2.default.number.isRequired,
  handleHighlight: _propTypes2.default.func.isRequired,
  handleSelect: _propTypes2.default.func.isRequired,
  getSuggestionValue: _propTypes2.default.func.isRequired,
  SuggestionListClassName: _propTypes2.default.string
};
SuggestionListDefault.defaultProps = {
  SuggestionListClassName: SuggestionListClassNameDefault
};