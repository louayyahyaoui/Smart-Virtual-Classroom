'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LocalSuggestionsExample = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _index = require('../index');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var suggestionsLocalDefault = ['apple', 'banana', 'cherry'];

var LocalSuggestionsExample = exports.LocalSuggestionsExample = function (_React$Component) {
  _inherits(LocalSuggestionsExample, _React$Component);

  function LocalSuggestionsExample() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, LocalSuggestionsExample);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = LocalSuggestionsExample.__proto__ || Object.getPrototypeOf(LocalSuggestionsExample)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      tags: [],
      suggestions: []
    }, _this.handleUpdateTags = function (newTags) {
      _this.setState({ tags: newTags });
    }, _this.handleUpdateSuggestions = function (inputValue) {
      var suggestions = _this.props.suggestions;

      var newSuggestions = suggestions.filter(function (suggestion) {
        return suggestion.indexOf(inputValue) !== -1;
      });
      _this.setState({ suggestions: newSuggestions });
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(LocalSuggestionsExample, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(_index.InputTagsContainer, {
        tags: this.state.tags,
        handleUpdateTags: this.handleUpdateTags,
        inputPlaceholder: 'Add tag',
        inputMaxWidth: 200,
        suggestions: this.state.suggestions,
        handleUpdateSuggestions: this.handleUpdateSuggestions
      });
    }
  }]);

  return LocalSuggestionsExample;
}(_react2.default.Component);

LocalSuggestionsExample.propTypes = {
  suggestions: _propTypes2.default.arrayOf(_propTypes2.default.any).isRequired
};
LocalSuggestionsExample.defaultProps = {
  suggestions: suggestionsLocalDefault
};