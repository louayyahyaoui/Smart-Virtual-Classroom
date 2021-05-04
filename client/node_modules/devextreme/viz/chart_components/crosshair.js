/**
 * DevExtreme (viz/chart_components/crosshair.js)
 * Version: 20.2.6
 * Build date: Tue Mar 16 2021
 *
 * Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
exports.getMargins = getMargins;
exports.Crosshair = Crosshair;
var _utils = require("../core/utils");
var _extend = require("../../core/utils/extend");
var math = Math;
var mathAbs = math.abs;
var mathMin = math.min;
var mathMax = math.max;
var mathFloor = math.floor;
var HORIZONTAL = "horizontal";
var VERTICAL = "vertical";
var LABEL_BACKGROUND_PADDING_X = 8;
var LABEL_BACKGROUND_PADDING_Y = 4;
var CENTER = "center";
var RIGHT = "right";
var LEFT = "left";
var TOP = "top";
var BOTTOM = "bottom";

function getMargins() {
    return {
        x: LABEL_BACKGROUND_PADDING_X,
        y: LABEL_BACKGROUND_PADDING_Y
    }
}

function getRectangleBBox(bBox) {
    return {
        x: bBox.x - LABEL_BACKGROUND_PADDING_X,
        y: bBox.y - LABEL_BACKGROUND_PADDING_Y,
        width: bBox.width + 2 * LABEL_BACKGROUND_PADDING_X,
        height: bBox.height + 2 * LABEL_BACKGROUND_PADDING_Y
    }
}

function getLabelCheckerPosition(x, y, isHorizontal, canvas) {
    var params = isHorizontal ? ["x", "width", "y", "height", y, 0] : ["y", "height", "x", "width", x, 1];
    return function(bBox, position, coord) {
        var labelCoord = {
            x: coord.x,
            y: coord.y
        };
        var rectangleBBox = getRectangleBBox(bBox);
        var delta = isHorizontal ? coord.y - bBox.y - bBox.height / 2 : coord.y - bBox.y;
        labelCoord.y = isHorizontal || !isHorizontal && position === BOTTOM ? coord.y + delta : coord.y;
        if (rectangleBBox[params[0]] < 0) {
            labelCoord[params[0]] -= rectangleBBox[params[0]]
        } else {
            if (rectangleBBox[params[0]] + rectangleBBox[params[1]] + delta * params[5] > canvas[params[1]]) {
                labelCoord[params[0]] -= rectangleBBox[params[0]] + rectangleBBox[params[1]] + delta * params[5] - canvas[params[1]]
            }
        }
        if (params[4] - rectangleBBox[params[3]] / 2 < 0) {
            labelCoord[params[2]] -= params[4] - rectangleBBox[params[3]] / 2
        } else {
            if (params[4] + rectangleBBox[params[3]] / 2 > canvas[params[3]]) {
                labelCoord[params[2]] -= params[4] + rectangleBBox[params[3]] / 2 - canvas[params[3]]
            }
        }
        return labelCoord
    }
}

function Crosshair(renderer, options, params, group) {
    var that = this;
    that._renderer = renderer;
    that._crosshairGroup = group;
    that._options = {};
    that.update(options, params)
}
Crosshair.prototype = {
    constructor: Crosshair,
    update: function(options, params) {
        var that = this;
        var canvas = params.canvas;
        that._canvas = {
            top: canvas.top,
            bottom: canvas.height - canvas.bottom,
            left: canvas.left,
            right: canvas.width - canvas.right,
            width: canvas.width,
            height: canvas.height
        };
        that._axes = params.axes;
        that._panes = params.panes;
        that._prepareOptions(options, HORIZONTAL);
        that._prepareOptions(options, VERTICAL)
    },
    dispose: function() {
        var that = this;
        that._renderer = that._crosshairGroup = that._options = that._axes = that._canvas = that._horizontalGroup = that._verticalGroup = that._horizontal = that._vertical = that._circle = that._panes = null
    },
    _prepareOptions: function(options, direction) {
        var lineOptions = options[direction + "Line"];
        this._options[direction] = {
            visible: lineOptions.visible,
            line: {
                stroke: lineOptions.color || options.color,
                "stroke-width": lineOptions.width || options.width,
                dashStyle: lineOptions.dashStyle || options.dashStyle,
                opacity: lineOptions.opacity || options.opacity,
                "stroke-linecap": "butt"
            },
            label: (0, _extend.extend)(true, {}, options.label, lineOptions.label)
        }
    },
    _createLines: function(options, sharpParam, group) {
        var lines = [];
        var canvas = this._canvas;
        var points = [canvas.left, canvas.top, canvas.left, canvas.top];
        for (var i = 0; i < 2; i++) {
            lines.push(this._renderer.path(points, "line").attr(options).sharp(sharpParam).append(group))
        }
        return lines
    },
    render: function() {
        var that = this;
        var renderer = that._renderer;
        var options = that._options;
        var verticalOptions = options.vertical;
        var horizontalOptions = options.horizontal;
        var extraOptions = horizontalOptions.visible ? horizontalOptions.line : verticalOptions.line;
        var circleOptions = {
            stroke: extraOptions.stroke,
            "stroke-width": extraOptions["stroke-width"],
            dashStyle: extraOptions.dashStyle,
            opacity: extraOptions.opacity
        };
        var canvas = that._canvas;
        that._horizontal = {};
        that._vertical = {};
        that._circle = renderer.circle(canvas.left, canvas.top, 0).attr(circleOptions).append(that._crosshairGroup);
        that._horizontalGroup = renderer.g().append(that._crosshairGroup);
        that._verticalGroup = renderer.g().append(that._crosshairGroup);
        if (verticalOptions.visible) {
            that._vertical.lines = that._createLines(verticalOptions.line, "h", that._verticalGroup);
            that._vertical.labels = that._createLabels(that._axes[0], verticalOptions, false, that._verticalGroup)
        }
        if (horizontalOptions.visible) {
            that._horizontal.lines = that._createLines(horizontalOptions.line, "v", that._horizontalGroup);
            that._horizontal.labels = that._createLabels(that._axes[1], horizontalOptions, true, that._horizontalGroup)
        }
        that.hide()
    },
    _createLabels: function(axes, options, isHorizontal, group) {
        var that = this;
        var canvas = that._canvas;
        var renderer = that._renderer;
        var x;
        var y;
        var text;
        var labels = [];
        var background;
        var currentLabelPos;
        var labelOptions = options.label;
        if (labelOptions.visible) {
            axes.forEach(function(axis) {
                var position = axis.getOptions().position;
                if (axis.getTranslator().getBusinessRange().isEmpty()) {
                    return
                }
                currentLabelPos = axis.getLabelsPosition();
                if (isHorizontal) {
                    y = canvas.top;
                    x = currentLabelPos
                } else {
                    x = canvas.left;
                    y = currentLabelPos
                }
                var align = position === TOP || position === BOTTOM ? CENTER : position === RIGHT ? LEFT : RIGHT;
                background = renderer.rect(0, 0, 0, 0).attr({
                    fill: labelOptions.backgroundColor || options.line.stroke
                }).append(group);
                text = renderer.text("0", 0, 0).css((0, _utils.patchFontOptions)(options.label.font)).attr({
                    align: align,
                    "class": labelOptions.cssClass
                }).append(group);
                labels.push({
                    text: text,
                    background: background,
                    axis: axis,
                    options: labelOptions,
                    pos: {
                        coord: currentLabelPos,
                        side: position
                    },
                    startXY: {
                        x: x,
                        y: y
                    }
                })
            })
        }
        return labels
    },
    _updateText: function(value, axisName, labels, point, func) {
        var that = this;
        labels.forEach(function(label) {
            var axis = label.axis;
            var coord = label.startXY;
            var textElement = label.text;
            var backgroundElement = label.background;
            var text = "";
            if (!axis.name || axis.name === axisName) {
                text = axis.getFormattedValue(value, label.options, point)
            }
            if (text) {
                textElement.attr({
                    text: text,
                    x: coord.x,
                    y: coord.y
                });
                textElement.attr(func(textElement.getBBox(), label.pos.side, coord));
                that._updateLinesCanvas(label);
                backgroundElement.attr(getRectangleBBox(textElement.getBBox()))
            } else {
                textElement.attr({
                    text: ""
                });
                backgroundElement.attr({
                    x: 0,
                    y: 0,
                    width: 0,
                    height: 0
                })
            }
        })
    },
    hide: function() {
        this._crosshairGroup.attr({
            visibility: "hidden"
        })
    },
    _updateLinesCanvas: function(label) {
        var position = label.pos.side;
        var labelCoord = label.pos.coord;
        var coords = this._linesCanvas;
        var canvas = this._canvas;
        coords[position] = coords[position] !== canvas[position] && mathAbs(coords[position] - canvas[position]) < mathAbs(labelCoord - canvas[position]) ? coords[position] : labelCoord
    },
    _updateLines: function(lines, x, y, r, isHorizontal) {
        var coords = this._linesCanvas;
        var canvas = this._canvas;
        var points = isHorizontal ? [
            [mathMin(x - r, coords.left), canvas.top, x - r, canvas.top],
            [x + r, canvas.top, mathMax(coords.right, x + r), canvas.top]
        ] : [
            [canvas.left, mathMin(coords.top, y - r), canvas.left, y - r],
            [canvas.left, y + r, canvas.left, mathMax(coords.bottom, y + r)]
        ];
        for (var i = 0; i < 2; i++) {
            lines[i].attr({
                points: points[i]
            }).sharp(isHorizontal ? "v" : "h", isHorizontal ? y === canvas.bottom ? -1 : 1 : x === canvas.right ? -1 : 1)
        }
    },
    _resetLinesCanvas: function() {
        var canvas = this._canvas;
        this._linesCanvas = {
            left: canvas.left,
            right: canvas.right,
            top: canvas.top,
            bottom: canvas.bottom
        }
    },
    _getClipRectForPane: function(x, y) {
        var panes = this._panes;
        var i;
        var coords;
        for (i = 0; i < panes.length; i++) {
            coords = panes[i].coords;
            if (coords.left <= x && coords.right >= x && coords.top <= y && coords.bottom >= y) {
                return panes[i].clipRect
            }
        }
        return {
            id: null
        }
    },
    show: function(data) {
        var that = this;
        var point = data.point;
        var pointData = point.getCrosshairData(data.x, data.y);
        var r = point.getPointRadius();
        var horizontal = that._horizontal;
        var vertical = that._vertical;
        var rad = !r ? 0 : r + 3;
        var canvas = that._canvas;
        var x = mathFloor(pointData.x);
        var y = mathFloor(pointData.y);
        if (x >= canvas.left && x <= canvas.right && y >= canvas.top && y <= canvas.bottom) {
            that._crosshairGroup.attr({
                visibility: "visible"
            });
            that._resetLinesCanvas();
            that._circle.attr({
                cx: x,
                cy: y,
                r: rad,
                "clip-path": that._getClipRectForPane(x, y).id
            });
            if (horizontal.lines) {
                that._updateText(pointData.yValue, pointData.axis, horizontal.labels, point, getLabelCheckerPosition(x, y, true, canvas));
                that._updateLines(horizontal.lines, x, y, rad, true);
                that._horizontalGroup.attr({
                    translateY: y - canvas.top
                })
            }
            if (vertical.lines) {
                that._updateText(pointData.xValue, pointData.axis, vertical.labels, point, getLabelCheckerPosition(x, y, false, canvas));
                that._updateLines(vertical.lines, x, y, rad, false);
                that._verticalGroup.attr({
                    translateX: x - canvas.left
                })
            }
        } else {
            that.hide()
        }
    }
};
