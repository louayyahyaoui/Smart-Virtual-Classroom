'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SuggestionsLoader = undefined;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _SuggestionsLoaderDefault = require('../implementation/SuggestionsLoaderDefault');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var SuggestionsLoader = function SuggestionsLoader(_ref) {
  var SuggestionsLoaderImplementation = _ref.SuggestionsLoaderImplementation,
      otherProps = _objectWithoutProperties(_ref, ['SuggestionsLoaderImplementation']);

  return _react2.default.createElement(SuggestionsLoaderImplementation, otherProps);
};

exports.SuggestionsLoader = SuggestionsLoader;
SuggestionsLoader.propTypes = {
  SuggestionsLoaderImplementation: _propTypes2.default.func.isRequired
};

SuggestionsLoader.defaultProps = {
  SuggestionsLoaderImplementation: _SuggestionsLoaderDefault.SuggestionsLoaderDefault
};