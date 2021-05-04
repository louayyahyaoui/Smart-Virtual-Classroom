'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CustomSuggestionExample = undefined;

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

var AvatarSuggestion = function AvatarSuggestion(_ref) {
  var value = _ref.value,
      isHighlighted = _ref.isHighlighted,
      handleHighlight = _ref.handleHighlight,
      handleSelect = _ref.handleSelect;
  return _react2.default.createElement(
    'li',
    { // eslint-disable-line jsx-a11y/no-static-element-interactions
      className: isHighlighted ? 'react-input-tags-suggestion highlighted' : 'react-input-tags-suggestion',
      onMouseOver: handleHighlight,
      onMouseDown: function onMouseDown(event) {
        return event.preventDefault();
      },
      onClick: handleSelect
    },
    _react2.default.createElement('img', { alt: 'avatar', src: '' + value.url, width: '20px', height: '20px' }),
    _react2.default.createElement(
      'div',
      null,
      value.name
    )
  );
};

AvatarSuggestion.propTypes = {
  value: _propTypes2.default.object.isRequired,
  isHighlighted: _propTypes2.default.bool.isRequired,
  handleHighlight: _propTypes2.default.func.isRequired,
  handleSelect: _propTypes2.default.func.isRequired
};

var suggestionsLocal = [{ name: 'akinnee', url: 'https://avatars.githubusercontent.com/u/3019562?v=3' }, { name: 'baldwmic', url: 'https://avatars.githubusercontent.com/u/10538297?v=3' }, { name: 'jimbol', url: 'https://avatars.githubusercontent.com/u/1278367?v=3' }, { name: 'neurosnap', url: 'https://avatars.githubusercontent.com/u/1940365?v=3' }];

var getSuggestionValueObject = function getSuggestionValueObject(suggestion) {
  return suggestion.name;
};

var CustomSuggestionExample = exports.CustomSuggestionExample = function (_React$Component) {
  _inherits(CustomSuggestionExample, _React$Component);

  function CustomSuggestionExample() {
    var _ref2;

    var _temp, _this, _ret;

    _classCallCheck(this, CustomSuggestionExample);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref2 = CustomSuggestionExample.__proto__ || Object.getPrototypeOf(CustomSuggestionExample)).call.apply(_ref2, [this].concat(args))), _this), _this.state = {
      tags: [],
      suggestions: []
    }, _this.handleUpdateTags = function (newTags) {
      _this.setState({ tags: newTags });
    }, _this.handleUpdateSuggestions = function (inputValue) {
      var _this$props = _this.props,
          suggestions = _this$props.suggestions,
          getSuggestionValue = _this$props.getSuggestionValue;

      var newSuggestions = suggestions.filter(function (suggestion) {
        return getSuggestionValue(suggestion).indexOf(inputValue) !== -1;
      });
      _this.setState({ suggestions: newSuggestions });
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(CustomSuggestionExample, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(_index.InputTagsContainer, {
        SuggestionImplementation: AvatarSuggestion,
        tags: this.state.tags,
        handleUpdateTags: this.handleUpdateTags,
        inputPlaceholder: 'Add tag',
        suggestions: this.state.suggestions,
        handleUpdateSuggestions: this.handleUpdateSuggestions,
        getSuggestionValue: this.props.getSuggestionValue
      });
    }
  }]);

  return CustomSuggestionExample;
}(_react2.default.Component);

CustomSuggestionExample.propTypes = {
  suggestions: _propTypes2.default.arrayOf(_propTypes2.default.any).isRequired,
  getSuggestionValue: _propTypes2.default.func.isRequired
};
CustomSuggestionExample.defaultProps = {
  suggestions: suggestionsLocal,
  getSuggestionValue: getSuggestionValueObject
};