"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = require("react");

var _PropsDecoratorProvider = require("./PropsDecoratorProvider");

var _createSubstyle = _interopRequireDefault(require("./createSubstyle"));

var useStyles = function useStyles(defaultStyle, _ref, modifiers) {
  var style = _ref.style,
      className = _ref.className,
      classNames = _ref.classNames;
  var propsDecorator = (0, _react.useContext)(_PropsDecoratorProvider.PropsDecoratorContext);
  var substyle = (0, _react.useMemo)(function () {
    return (0, _createSubstyle.default)({
      style: style,
      className: className,
      classNames: classNames
    }, propsDecorator);
  }, [style, className, classNames, propsDecorator]);
  return substyle(modifiers, defaultStyle);
};

var _default = useStyles;
exports.default = _default;