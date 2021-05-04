'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.InputTagsDefault = exports.INPUT_MAX_WIDTH = exports.INPUT_WIDTH_EXTRA = exports.MIRROR_STYLES = exports.closeKeyCodesDefault = exports.previousKeyCodesDefault = exports.nextKeyCodesDefault = exports.removeKeyCodesDefault = exports.insertKeyCodesDefault = exports.calcPreviousIndexDefault = exports.calcNextIndexDefault = exports.InputTagsClassNameDefault = exports.getSuggestionValueDefault = exports.handleUpdateSuggestionsDefault = exports.suggestionsDefault = exports.createTagDefault = exports.getTagValueDefault = exports.SuggestionListContainer = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _Input = require('../interface/Input');

var _Tag = require('../interface/Tag');

var _SuggestionList = require('../interface/SuggestionList');

var _SuggestionsLoader = require('../interface/SuggestionsLoader');

var _util = require('./util');

var _keyCodes = require('../keyCodes');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var SuggestionListContainer = function SuggestionListContainer(_ref) {
  var showSuggestions = _ref.showSuggestions,
      suggestions = _ref.suggestions,
      highlightedSuggestionIndex = _ref.highlightedSuggestionIndex,
      handleHighlight = _ref.handleHighlight,
      handleSelect = _ref.handleSelect,
      getSuggestionValue = _ref.getSuggestionValue,
      otherProps = _objectWithoutProperties(_ref, ['showSuggestions', 'suggestions', 'highlightedSuggestionIndex', 'handleHighlight', 'handleSelect', 'getSuggestionValue']);

  if (!showSuggestions) return null;
  return _react2.default.createElement(_SuggestionList.SuggestionList, _extends({
    suggestions: suggestions,
    highlightedSuggestionIndex: highlightedSuggestionIndex,
    handleHighlight: handleHighlight,
    handleSelect: handleSelect,
    getSuggestionValue: getSuggestionValue
  }, otherProps));
};

exports.SuggestionListContainer = SuggestionListContainer;
SuggestionListContainer.propTypes = {
  showSuggestions: _propTypes2.default.bool.isRequired,
  suggestions: _propTypes2.default.arrayOf(_propTypes2.default.any).isRequired,
  highlightedSuggestionIndex: _propTypes2.default.number.isRequired,
  handleHighlight: _propTypes2.default.func.isRequired,
  handleSelect: _propTypes2.default.func.isRequired,
  getSuggestionValue: _propTypes2.default.func.isRequired
};

var getTagValueDefault = exports.getTagValueDefault = function getTagValueDefault(tag) {
  return tag;
};

var createTagDefault = exports.createTagDefault = function createTagDefault(inputValue) {
  return inputValue;
};

var suggestionsDefault = exports.suggestionsDefault = [];

var handleUpdateSuggestionsDefault = exports.handleUpdateSuggestionsDefault = function handleUpdateSuggestionsDefault() {};

var getSuggestionValueDefault = exports.getSuggestionValueDefault = function getSuggestionValueDefault(suggestion) {
  return suggestion;
};

var InputTagsClassNameDefault = exports.InputTagsClassNameDefault = _util.defaultClassNamePrefix + '-input-tags';

var calcNextIndexDefault = exports.calcNextIndexDefault = function calcNextIndexDefault(oldIndex, numItems) {
  return (oldIndex + 1) % numItems;
};

var calcPreviousIndexDefault = exports.calcPreviousIndexDefault = function calcPreviousIndexDefault(oldIndex, numItems) {
  return (oldIndex - 1 + numItems) % numItems;
};

var insertKeyCodesDefault = exports.insertKeyCodesDefault = [_keyCodes.tabKeyCode, _keyCodes.enterKeyCode, _keyCodes.commaKeyCode];

var removeKeyCodesDefault = exports.removeKeyCodesDefault = [_keyCodes.backspaceKeyCode];

var nextKeyCodesDefault = exports.nextKeyCodesDefault = [_keyCodes.downKeyCode];

var previousKeyCodesDefault = exports.previousKeyCodesDefault = [_keyCodes.upKeyCode];

var closeKeyCodesDefault = exports.closeKeyCodesDefault = [_keyCodes.escapeKeyCode];

var MIRROR_STYLES = exports.MIRROR_STYLES = ['fontFamily', 'fontSize', 'fontStyle', 'fontWeight', 'lineHeight', 'letterSpacing', 'wordSpacing'];

var INPUT_WIDTH_EXTRA = exports.INPUT_WIDTH_EXTRA = 2;

var INPUT_MAX_WIDTH = exports.INPUT_MAX_WIDTH = 9999;

var InputTagsDefault = exports.InputTagsDefault = function (_React$Component) {
  _inherits(InputTagsDefault, _React$Component);

  function InputTagsDefault() {
    var _ref2;

    var _temp, _this, _ret;

    _classCallCheck(this, InputTagsDefault);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref2 = InputTagsDefault.__proto__ || Object.getPrototypeOf(InputTagsDefault)).call.apply(_ref2, [this].concat(args))), _this), _this.state = {
      inputValue: '',
      inputIndex: _this.props.tags.length,
      inputIsEditing: false,
      showSuggestions: false,
      highlightedSuggestionIndex: 0
    }, _this.insertTag = function (tags, insertTagIndex, inputValue) {
      var handleInsert = _this.props.handleInsert;


      _this.setState({
        inputValue: '',
        inputIndex: tags.length + 1,
        inputIsEditing: false,
        showSuggestions: false
      });
      handleInsert(tags, insertTagIndex, inputValue);
    }, _this.editTag = function (tags, editTagIndex) {
      var getTagValue = _this.props.getTagValue;


      _this.removeTag(tags, editTagIndex, true);
      _this.setState({
        inputValue: getTagValue(tags[editTagIndex]),
        inputIndex: editTagIndex,
        inputIsEditing: true
      });
    }, _this.removeTag = function (tags, removeTagIndex, inputInUse) {
      var handleRemove = _this.props.handleRemove;

      // when input is in use, we do not want the input to jump around
      // knowing that eventually an insert or blur will move the input back to the end

      var newInputIndex = inputInUse ? removeTagIndex : tags.length - 1;
      _this.setState({
        inputIndex: newInputIndex
      });
      handleRemove(tags, removeTagIndex);
    }, _this.handleInputOnChange = function (event) {
      var handleUpdateSuggestions = _this.props.handleUpdateSuggestions;


      var inputValue = event.target.value;
      var showSuggestions = inputValue.length > 0;
      _this.setState({ inputValue: inputValue, showSuggestions: showSuggestions, inputIsEditing: false });
      handleUpdateSuggestions(inputValue);
    }, _this.handleInputOnBlur = function () {
      var _this$state = _this.state,
          inputValue = _this$state.inputValue,
          inputIndex = _this$state.inputIndex;
      var _this$props = _this.props,
          tags = _this$props.tags,
          createTag = _this$props.createTag;


      if (inputValue.length > 0) {
        _this.insertTag(tags, inputIndex, createTag(inputValue));
      }

      if (inputValue.length === 0 && inputIndex !== tags.length) {
        _this.setState({ inputIndex: tags.length });
      }
    }, _this.handleInputOnKeyDown = function (event) {
      var keyCode = event.keyCode;
      var _this$state2 = _this.state,
          inputValue = _this$state2.inputValue,
          inputIndex = _this$state2.inputIndex,
          showSuggestions = _this$state2.showSuggestions,
          highlightedSuggestionIndex = _this$state2.highlightedSuggestionIndex;
      var _this$props2 = _this.props,
          tags = _this$props2.tags,
          createTag = _this$props2.createTag,
          suggestions = _this$props2.suggestions,
          getSuggestionValue = _this$props2.getSuggestionValue,
          calcNextIndex = _this$props2.calcNextIndex,
          calcPreviousIndex = _this$props2.calcPreviousIndex,
          insertKeyCodes = _this$props2.insertKeyCodes,
          removeKeyCodes = _this$props2.removeKeyCodes,
          nextKeyCodes = _this$props2.nextKeyCodes,
          previousKeyCodes = _this$props2.previousKeyCodes,
          closeKeyCodes = _this$props2.closeKeyCodes;


      if (insertKeyCodes.includes(keyCode) && inputValue.length > 0) {
        // prevents typing comma from entering `,` in the input
        // prevents typing tab from setting the focus on something other than the input
        event.preventDefault();
        if (showSuggestions && suggestions.length > 0) {
          var suggestion = getSuggestionValue(suggestions[highlightedSuggestionIndex]);
          _this.insertTag(tags, inputIndex, suggestion);
        } else {
          _this.insertTag(tags, inputIndex, createTag(inputValue));
        }
      }

      if (removeKeyCodes.includes(keyCode) && inputValue.length === 0 && tags.length > 0 && inputIndex > 0) {
        var removeTagIndex = inputIndex - 1;
        _this.removeTag(tags, removeTagIndex, true);
      }

      if (closeKeyCodes.includes(keyCode)) {
        _this.setShowSuggestions(false);
      }

      var oldHighlightedIndex = highlightedSuggestionIndex;
      var numSuggestions = suggestions.length;

      if (nextKeyCodes.includes(keyCode)) {
        var newHighlightedIndex = calcNextIndex(oldHighlightedIndex, numSuggestions);
        _this.setHighlightedSuggestionIndex(newHighlightedIndex);
      }

      if (previousKeyCodes.includes(keyCode)) {
        // prevents typing up from moving cursor to beginning of input
        event.preventDefault();
        var _newHighlightedIndex = calcPreviousIndex(oldHighlightedIndex, numSuggestions);
        _this.setHighlightedSuggestionIndex(_newHighlightedIndex);
      }
    }, _this.handleEdit = function () {
      var element = _this.inputNode;
      _this.props.focusElement(element);
      _this.props.selectElement(element);
    }, _this.mirrorInputStyle = function () {
      var mirrorStyles = _this.props.mirrorStyles;

      var inputNode = _this.inputNode;
      var mirrorNode = _this.mirrorNode;
      if (!inputNode || !mirrorNode) return;

      var inputStyle = window.getComputedStyle(inputNode);
      mirrorStyles.forEach(function (mStyle) {
        mirrorNode.style[mStyle] = inputStyle[mStyle];
      });
    }, _this.updateInputWidth = function () {
      var _this$props3 = _this.props,
          inputWidthExtra = _this$props3.inputWidthExtra,
          inputMaxWidth = _this$props3.inputMaxWidth;

      var inputNode = _this.inputNode;
      var mirrorNode = _this.mirrorNode;
      if (!inputNode || !mirrorNode) return;

      var updatedInputWidth = mirrorNode.offsetWidth + inputWidthExtra;
      var newInputWidth = Math.min(updatedInputWidth, inputMaxWidth);
      inputNode.style.width = newInputWidth + 'px';
    }, _this.setShowSuggestions = function (showSuggestions) {
      _this.setState({ showSuggestions: showSuggestions });
    }, _this.setHighlightedSuggestionIndex = function (highlightedSuggestionIndex) {
      _this.setState({ highlightedSuggestionIndex: highlightedSuggestionIndex });
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(InputTagsDefault, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (nextProps.suggestions !== this.props.suggestions) {
        this.setState({ highlightedSuggestionIndex: 0 });
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          tags = _props.tags,
          handleRemove = _props.handleRemove,
          suggestions = _props.suggestions,
          getSuggestionValue = _props.getSuggestionValue,
          InputTagsClassName = _props.InputTagsClassName,
          otherProps = _objectWithoutProperties(_props, ['tags', 'handleRemove', 'suggestions', 'getSuggestionValue', 'InputTagsClassName']);

      var _state = this.state,
          inputValue = _state.inputValue,
          inputIndex = _state.inputIndex,
          inputIsEditing = _state.inputIsEditing,
          showSuggestions = _state.showSuggestions,
          highlightedSuggestionIndex = _state.highlightedSuggestionIndex;

      return _react2.default.createElement(
        'div',
        {
          className: InputTagsClassName
        },
        _react2.default.createElement(
          'div',
          null,
          tags.slice(0, inputIndex).map(function (tag, index) {
            return _react2.default.createElement(_Tag.Tag, _extends({
              key: index,
              value: tag,
              handleEdit: function handleEdit() {
                return _this2.editTag(tags, index);
              },
              handleRemove: function handleRemove() {
                return _this2.removeTag(tags, index, false);
              }
            }, otherProps));
          }),
          _react2.default.createElement(_Input.Input, _extends({
            value: inputValue,
            handleOnChange: this.handleInputOnChange,
            handleOnBlur: this.handleInputOnBlur,
            handleOnKeyDown: this.handleInputOnKeyDown,
            inputRef: function inputRef(node) {
              _this2.inputNode = node;
            },
            mirrorRef: function mirrorRef(node) {
              _this2.mirrorNode = node;
            },
            mirrorInputStyle: this.mirrorInputStyle,
            updateInputWidth: this.updateInputWidth,
            inputIsEditing: inputIsEditing,
            handleEdit: this.handleEdit
          }, otherProps)),
          tags.slice(inputIndex).map(function (tag, index) {
            return _react2.default.createElement(_Tag.Tag, _extends({
              key: index + inputIndex,
              value: tag,
              handleEdit: function handleEdit() {
                return _this2.editTag(tags, index + inputIndex);
              },
              handleRemove: function handleRemove() {
                return _this2.removeTag(tags, index + inputIndex, false);
              }
            }, otherProps));
          }),
          _react2.default.createElement(_SuggestionsLoader.SuggestionsLoader, otherProps)
        ),
        _react2.default.createElement(SuggestionListContainer, _extends({
          showSuggestions: showSuggestions,
          suggestions: suggestions,
          highlightedSuggestionIndex: highlightedSuggestionIndex,
          handleHighlight: this.setHighlightedSuggestionIndex,
          handleSelect: function handleSelect(suggestion) {
            return _this2.insertTag(tags, inputIndex, suggestion);
          },
          getSuggestionValue: getSuggestionValue
        }, otherProps))
      );
    }
  }]);

  return InputTagsDefault;
}(_react2.default.Component);

InputTagsDefault.propTypes = {
  tags: _propTypes2.default.arrayOf(_propTypes2.default.any).isRequired,
  handleInsert: _propTypes2.default.func.isRequired,
  handleRemove: _propTypes2.default.func.isRequired,
  getTagValue: _propTypes2.default.func,
  createTag: _propTypes2.default.func,
  suggestions: _propTypes2.default.arrayOf(_propTypes2.default.any),
  handleUpdateSuggestions: _propTypes2.default.func,
  getSuggestionValue: _propTypes2.default.func,
  InputTagsClassName: _propTypes2.default.string,
  inputMaxWidth: _propTypes2.default.number,
  mirrorStyles: _propTypes2.default.arrayOf(_propTypes2.default.string).isRequired,
  inputWidthExtra: _propTypes2.default.number.isRequired,
  focusElement: _propTypes2.default.func.isRequired,
  selectElement: _propTypes2.default.func.isRequired,
  calcNextIndex: _propTypes2.default.func.isRequired,
  calcPreviousIndex: _propTypes2.default.func.isRequired,
  insertKeyCodes: _propTypes2.default.arrayOf(_propTypes2.default.number).isRequired,
  removeKeyCodes: _propTypes2.default.arrayOf(_propTypes2.default.number).isRequired,
  nextKeyCodes: _propTypes2.default.arrayOf(_propTypes2.default.number).isRequired,
  previousKeyCodes: _propTypes2.default.arrayOf(_propTypes2.default.number).isRequired,
  closeKeyCodes: _propTypes2.default.arrayOf(_propTypes2.default.number).isRequired
};
InputTagsDefault.defaultProps = {
  getTagValue: getTagValueDefault,
  createTag: createTagDefault,
  suggestions: suggestionsDefault,
  handleUpdateSuggestions: handleUpdateSuggestionsDefault,
  getSuggestionValue: getSuggestionValueDefault,
  InputTagsClassName: InputTagsClassNameDefault,
  inputMaxWidth: INPUT_MAX_WIDTH,
  mirrorStyles: MIRROR_STYLES,
  inputWidthExtra: INPUT_WIDTH_EXTRA,
  focusElement: _util.focusElement,
  selectElement: _util.selectElement,
  calcNextIndex: calcNextIndexDefault,
  calcPreviousIndex: calcPreviousIndexDefault,
  insertKeyCodes: insertKeyCodesDefault,
  removeKeyCodes: removeKeyCodesDefault,
  nextKeyCodes: nextKeyCodesDefault,
  previousKeyCodes: previousKeyCodesDefault,
  closeKeyCodes: closeKeyCodesDefault
};