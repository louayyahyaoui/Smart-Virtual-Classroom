'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.InputDefault = exports.handleEditDefault = exports.updateInputWidthDefault = exports.mirrorInputStyleDefault = exports.InputClassNameDefault = undefined;

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

var InputClassNameDefault = exports.InputClassNameDefault = _util.defaultClassNamePrefix + '-input';

var mirrorInputStyleDefault = exports.mirrorInputStyleDefault = _util.noop;
var updateInputWidthDefault = exports.updateInputWidthDefault = _util.noop;
var handleEditDefault = exports.handleEditDefault = _util.noop;

var InputDefault = exports.InputDefault = function (_React$Component) {
  _inherits(InputDefault, _React$Component);

  function InputDefault() {
    _classCallCheck(this, InputDefault);

    return _possibleConstructorReturn(this, (InputDefault.__proto__ || Object.getPrototypeOf(InputDefault)).apply(this, arguments));
  }

  _createClass(InputDefault, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _props = this.props,
          mirrorInputStyle = _props.mirrorInputStyle,
          updateInputWidth = _props.updateInputWidth;

      mirrorInputStyle();
      updateInputWidth();
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps) {
      var _props2 = this.props,
          updateInputWidth = _props2.updateInputWidth,
          handleEdit = _props2.handleEdit;

      updateInputWidth();

      if (prevProps.inputIsEditing === false && this.props.inputIsEditing === true) {
        handleEdit();
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _props3 = this.props,
          value = _props3.value,
          handleOnChange = _props3.handleOnChange,
          handleOnBlur = _props3.handleOnBlur,
          handleOnKeyDown = _props3.handleOnKeyDown,
          inputPlaceholder = _props3.inputPlaceholder,
          inputTabIndex = _props3.inputTabIndex,
          inputRef = _props3.inputRef,
          mirrorRef = _props3.mirrorRef,
          InputClassName = _props3.InputClassName;


      var mirrorValue = value || inputPlaceholder;
      var mirrorStyle = {
        position: 'absolute',
        whiteSpace: 'pre',
        overflow: 'scroll',
        visibility: 'hidden'
      };

      return _react2.default.createElement(
        'span',
        null,
        _react2.default.createElement(
          'span',
          {
            ref: mirrorRef,
            style: mirrorStyle
          },
          mirrorValue
        ),
        _react2.default.createElement('input', {
          ref: inputRef,
          type: 'text',
          value: value,
          onChange: handleOnChange,
          onBlur: handleOnBlur,
          onKeyDown: handleOnKeyDown,
          placeholder: inputPlaceholder,
          tabIndex: inputTabIndex,
          className: InputClassName
        })
      );
    }
  }]);

  return InputDefault;
}(_react2.default.Component);

InputDefault.propTypes = {
  value: _propTypes2.default.string.isRequired,
  handleOnChange: _propTypes2.default.func.isRequired,
  handleOnBlur: _propTypes2.default.func.isRequired,
  handleOnKeyDown: _propTypes2.default.func.isRequired,
  InputClassName: _propTypes2.default.string,
  inputPlaceholder: _propTypes2.default.string,
  inputTabIndex: _propTypes2.default.number,
  inputRef: _propTypes2.default.func,
  mirrorRef: _propTypes2.default.func,
  mirrorInputStyle: _propTypes2.default.func,
  updateInputWidth: _propTypes2.default.func,
  inputIsEditing: _propTypes2.default.bool,
  handleEdit: _propTypes2.default.func
};
InputDefault.defaultProps = {
  InputClassName: InputClassNameDefault,
  mirrorInputStyle: mirrorInputStyleDefault,
  updateInputWidth: updateInputWidthDefault,
  handleEdit: handleEditDefault
};