'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SuggestionsLoaderDefault = exports.SuggestionsLoaderClassNameDefault = exports.suggestionsAreLoadingDefault = undefined;

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

var suggestionsAreLoadingDefault = exports.suggestionsAreLoadingDefault = false;

var SuggestionsLoaderClassNameDefault = exports.SuggestionsLoaderClassNameDefault = _util.defaultClassNamePrefix + '-suggestions-loader';

/* eslint-disable react/prefer-stateless-function */

var SuggestionsLoaderDefault = exports.SuggestionsLoaderDefault = function (_React$Component) {
  _inherits(SuggestionsLoaderDefault, _React$Component);

  function SuggestionsLoaderDefault() {
    _classCallCheck(this, SuggestionsLoaderDefault);

    return _possibleConstructorReturn(this, (SuggestionsLoaderDefault.__proto__ || Object.getPrototypeOf(SuggestionsLoaderDefault)).apply(this, arguments));
  }

  _createClass(SuggestionsLoaderDefault, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          suggestionsAreLoading = _props.suggestionsAreLoading,
          SuggestionsLoaderClassName = _props.SuggestionsLoaderClassName;

      if (!suggestionsAreLoading) return null;
      return _react2.default.createElement('div', {
        className: SuggestionsLoaderClassName
      });
    }
  }]);

  return SuggestionsLoaderDefault;
}(_react2.default.Component);

SuggestionsLoaderDefault.propTypes = {
  suggestionsAreLoading: _propTypes2.default.bool,
  SuggestionsLoaderClassName: _propTypes2.default.string
};
SuggestionsLoaderDefault.defaultProps = {
  suggestionsAreLoading: suggestionsAreLoadingDefault,
  SuggestionsLoaderClassName: SuggestionsLoaderClassNameDefault
};