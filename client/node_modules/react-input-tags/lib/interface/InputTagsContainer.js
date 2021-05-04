'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.InputTagsContainer = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _InputTagsContainerDefault = require('../implementation/InputTagsContainerDefault');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var InputTagsContainer = function InputTagsContainer(_ref) {
  var InputTagsContainerImplementation = _ref.InputTagsContainerImplementation,
      tags = _ref.tags,
      handleUpdateTags = _ref.handleUpdateTags,
      otherProps = _objectWithoutProperties(_ref, ['InputTagsContainerImplementation', 'tags', 'handleUpdateTags']);

  return _react2.default.createElement(InputTagsContainerImplementation, _extends({
    tags: tags,
    handleUpdateTags: handleUpdateTags
  }, otherProps));
};

exports.InputTagsContainer = InputTagsContainer;
InputTagsContainer.propTypes = {
  InputTagsContainerImplementation: _propTypes2.default.func.isRequired,
  tags: _propTypes2.default.arrayOf(_propTypes2.default.any).isRequired,
  handleUpdateTags: _propTypes2.default.func.isRequired
};

InputTagsContainer.defaultProps = {
  InputTagsContainerImplementation: _InputTagsContainerDefault.InputTagsContainerDefault
};