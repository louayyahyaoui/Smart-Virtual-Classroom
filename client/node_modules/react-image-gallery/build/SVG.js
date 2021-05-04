'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var left = _react2.default.createElement('polyline', { points: '15 18 9 12 15 6' });
var right = _react2.default.createElement('polyline', { points: '9 18 15 12 9 6' });
var maximize = _react2.default.createElement('path', { d: 'M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3' });
var minimize = _react2.default.createElement('path', { d: 'M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3m0 18v-3a2 2 0 0 1 2-2h3M3 16h3a2 2 0 0 1 2 2v3' });
var play = _react2.default.createElement('polygon', { points: '5 3 19 12 5 21 5 3' });
var pause = _react2.default.createElement(
  _react2.default.Fragment,
  null,
  _react2.default.createElement('rect', { x: '6', y: '4', width: '4', height: '16' }),
  _react2.default.createElement('rect', { x: '14', y: '4', width: '4', height: '16' })
);

var iconMapper = {
  left: left,
  right: right,
  maximize: maximize,
  minimize: minimize,
  play: play,
  pause: pause
};

var SVG = function SVG(props) {
  var strokeWidth = props.strokeWidth,
      viewBox = props.viewBox,
      icon = props.icon;

  return _react2.default.createElement(
    'svg',
    {
      className: 'image-gallery-svg',
      xmlns: 'http://www.w3.org/2000/svg',
      viewBox: viewBox,
      fill: 'none',
      stroke: 'currentColor',
      strokeWidth: strokeWidth,
      strokeLinecap: 'round',
      strokeLinejoin: 'round'
    },
    iconMapper[icon]
  );
};

SVG.propTypes = {
  strokeWidth: _propTypes.number,
  viewBox: _propTypes.string,
  icon: (0, _propTypes.oneOf)(['left', 'right', 'maximize', 'minimize', 'play', 'pause']).isRequired
};

SVG.defaultProps = {
  strokeWidth: 1,
  viewBox: '0 0 24 24'
};

exports.default = SVG;