'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Tag = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _TagDefault = require('../implementation/TagDefault');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var Tag = function Tag(_ref) {
  var TagImplementation = _ref.TagImplementation,
      value = _ref.value,
      handleEdit = _ref.handleEdit,
      handleRemove = _ref.handleRemove,
      otherProps = _objectWithoutProperties(_ref, ['TagImplementation', 'value', 'handleEdit', 'handleRemove']);

  return _react2.default.createElement(TagImplementation, _extends({
    value: value,
    handleEdit: handleEdit,
    handleRemove: handleRemove
  }, otherProps));
};

exports.Tag = Tag;
Tag.propTypes = {
  TagImplementation: _propTypes2.default.func.isRequired,
  value: _propTypes2.default.any.isRequired,
  handleEdit: _propTypes2.default.func.isRequired,
  handleRemove: _propTypes2.default.func.isRequired
};

Tag.defaultProps = {
  TagImplementation: _TagDefault.TagDefault
};