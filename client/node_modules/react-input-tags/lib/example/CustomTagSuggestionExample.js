'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CustomTagSuggestionExample = undefined;

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

var NameTag = function NameTag(_ref) {
  var value = _ref.value,
      handleEdit = _ref.handleEdit,
      handleRemove = _ref.handleRemove,
      TagClassName = _ref.TagClassName;
  return _react2.default.createElement(
    'span',
    {
      className: TagClassName
    },
    _react2.default.createElement(
      'span',
      { // eslint-disable-line jsx-a11y/no-static-element-interactions
        onClick: handleEdit
      },
      value.name || value.address
    ),
    _react2.default.createElement(
      'button',
      {
        onClick: handleRemove
      },
      'x'
    )
  );
};

NameTag.propTypes = {
  value: _propTypes2.default.object.isRequired,
  handleEdit: _propTypes2.default.func.isRequired,
  handleRemove: _propTypes2.default.func.isRequired,
  TagClassName: _propTypes2.default.string
};

var AvatarSuggestion = function AvatarSuggestion(_ref2) {
  var value = _ref2.value,
      isHighlighted = _ref2.isHighlighted,
      handleHighlight = _ref2.handleHighlight,
      handleSelect = _ref2.handleSelect;
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
      value.name + ' ' + value.address
    )
  );
};

AvatarSuggestion.propTypes = {
  value: _propTypes2.default.object.isRequired,
  isHighlighted: _propTypes2.default.bool.isRequired,
  handleHighlight: _propTypes2.default.func.isRequired,
  handleSelect: _propTypes2.default.func.isRequired
};

var suggestionsLocal = [{ name: 'akinnee', address: 'alex@kinnee.com', url: 'https://avatars.githubusercontent.com/u/3019562?v=3' }, { name: 'baldwmic', address: 'baldwmic@mail.gvsu.edu', url: 'https://avatars.githubusercontent.com/u/10538297?v=3' }, { name: 'jimbol', address: 'jim.hall.dev@gmail.com', url: 'https://avatars.githubusercontent.com/u/1278367?v=3' }, { name: 'neurosnap', address: 'neurosnap@gmail.com', url: 'https://avatars.githubusercontent.com/u/1940365?v=3' }];

var getTagValueAddress = function getTagValueAddress(tag) {
  return tag.address;
};

var createTagObject = function createTagObject(inputValue) {
  return { address: inputValue };
};

var CustomTagSuggestionExample = exports.CustomTagSuggestionExample = function (_React$Component) {
  _inherits(CustomTagSuggestionExample, _React$Component);

  function CustomTagSuggestionExample() {
    var _ref3;

    var _temp, _this, _ret;

    _classCallCheck(this, CustomTagSuggestionExample);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref3 = CustomTagSuggestionExample.__proto__ || Object.getPrototypeOf(CustomTagSuggestionExample)).call.apply(_ref3, [this].concat(args))), _this), _this.state = {
      tags: [],
      suggestions: []
    }, _this.handleUpdateTags = function (newTags) {
      _this.setState({ tags: newTags });
    }, _this.handleUpdateSuggestions = function (inputValue) {
      var suggestions = _this.props.suggestions;

      var newSuggestions = suggestions.filter(function (suggestion) {
        return suggestion.address.indexOf(inputValue) !== -1;
      });
      _this.setState({ suggestions: newSuggestions });
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(CustomTagSuggestionExample, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(_index.InputTagsContainer, {
        TagImplementation: NameTag,
        SuggestionImplementation: AvatarSuggestion,
        tags: this.state.tags,
        handleUpdateTags: this.handleUpdateTags,
        getTagValue: this.props.getTagValue,
        createTag: this.props.createTag,
        inputPlaceholder: 'Add tag',
        suggestions: this.state.suggestions,
        handleUpdateSuggestions: this.handleUpdateSuggestions
      });
    }
  }]);

  return CustomTagSuggestionExample;
}(_react2.default.Component);

CustomTagSuggestionExample.propTypes = {
  getTagValue: _propTypes2.default.func.isRequired,
  createTag: _propTypes2.default.func.isRequired,
  suggestions: _propTypes2.default.arrayOf(_propTypes2.default.any).isRequired
};
CustomTagSuggestionExample.defaultProps = {
  getTagValue: getTagValueAddress,
  createTag: createTagObject,
  suggestions: suggestionsLocal
};