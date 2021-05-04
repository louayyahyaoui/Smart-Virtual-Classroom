'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TagDefault = exports.TagClassNameDefault = undefined;

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

var TagClassNameDefault = exports.TagClassNameDefault = _util.defaultClassNamePrefix + '-tag';

var TagDefault = exports.TagDefault = function (_React$Component) {
  _inherits(TagDefault, _React$Component);

  function TagDefault() {
    _classCallCheck(this, TagDefault);

    return _possibleConstructorReturn(this, (TagDefault.__proto__ || Object.getPrototypeOf(TagDefault)).apply(this, arguments));
  }

  _createClass(TagDefault, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          value = _props.value,
          handleEdit = _props.handleEdit,
          handleRemove = _props.handleRemove,
          TagClassName = _props.TagClassName;

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
          value
        ),
        _react2.default.createElement(
          'button',
          {
            onClick: handleRemove
          },
          'X'
        )
      );
    }
  }]);

  return TagDefault;
}(_react2.default.Component);

TagDefault.propTypes = {
  value: _propTypes2.default.string.isRequired,
  handleEdit: _propTypes2.default.func.isRequired,
  handleRemove: _propTypes2.default.func.isRequired,
  TagClassName: _propTypes2.default.string
};
TagDefault.defaultProps = {
  TagClassName: TagClassNameDefault
};