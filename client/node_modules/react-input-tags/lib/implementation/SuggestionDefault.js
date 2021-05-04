'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SuggestionDefault = exports.SuggestionClassNameDefault = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _util = require('./util');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SuggestionClassNameDefault = exports.SuggestionClassNameDefault = _util.defaultClassNamePrefix + '-suggestion';

/* eslint-disable react/prefer-stateless-function */

var SuggestionDefault = exports.SuggestionDefault = function (_React$Component) {
  _inherits(SuggestionDefault, _React$Component);

  function SuggestionDefault() {
    _classCallCheck(this, SuggestionDefault);

    return _possibleConstructorReturn(this, (SuggestionDefault.__proto__ || Object.getPrototypeOf(SuggestionDefault)).apply(this, arguments));
  }

  _createClass(SuggestionDefault, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          value = _props.value,
          isHighlighted = _props.isHighlighted,
          handleHighlight = _props.handleHighlight,
          handleSelect = _props.handleSelect,
          SuggestionClassName = _props.SuggestionClassName;

      var highlightClass = isHighlighted ? 'highlighted' : '';
      return _react2.default.createElement(
        'li',
        { // eslint-disable-line jsx-a11y/no-static-element-interactions
          className: SuggestionClassName + ' ' + highlightClass,
          onMouseOver: handleHighlight,
          onMouseDown: function onMouseDown(event) {
            return event.preventDefault();
          } // prevents onBlur from inserting inputValue
          , onClick: handleSelect
        },
        value
      );
    }
  }]);

  return SuggestionDefault;
}(_react2.default.Component);

SuggestionDefault.propTypes = {
  value: _propTypes2.default.any.isRequired,
  isHighlighted: _propTypes2.default.bool.isRequired,
  handleHighlight: _propTypes2.default.func.isRequired,
  handleSelect: _propTypes2.default.func.isRequired,
  SuggestionClassName: _propTypes2.default.string
};
SuggestionDefault.defaultProps = {
  SuggestionClassName: SuggestionClassNameDefault
};