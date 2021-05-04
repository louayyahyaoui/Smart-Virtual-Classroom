'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.InputTags = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _InputTagsDefault = require('../implementation/InputTagsDefault');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var InputTags = function InputTags(_ref) {
  var InputTagsImplementation = _ref.InputTagsImplementation,
      tags = _ref.tags,
      handleInsert = _ref.handleInsert,
      handleRemove = _ref.handleRemove,
      otherProps = _objectWithoutProperties(_ref, ['InputTagsImplementation', 'tags', 'handleInsert', 'handleRemove']);

  return _react2.default.createElement(InputTagsImplementation, _extends({
    tags: tags,
    handleInsert: handleInsert,
    handleRemove: handleRemove
  }, otherProps));
};

exports.InputTags = InputTags;
InputTags.propTypes = {
  InputTagsImplementation: _propTypes2.default.func.isRequired,
  tags: _propTypes2.default.arrayOf(_propTypes2.default.any).isRequired,
  handleInsert: _propTypes2.default.func.isRequired,
  handleRemove: _propTypes2.default.func.isRequired
};

InputTags.defaultProps = {
  InputTagsImplementation: _InputTagsDefault.InputTagsDefault
};