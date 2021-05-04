/**
 * DevExtreme (viz/chart_components/layout_manager.js)
 * Version: 20.2.6
 * Build date: Tue Mar 16 2021
 *
 * Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
exports.LayoutManager = LayoutManager;
var _type = require("../../core/utils/type");
var _consts = _interopRequireDefault(require("../components/consts"));
var _layout_element = require("../core/layout_element");

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        "default": obj
    }
}
var floor = Math.floor,
    sqrt = Math.sqrt;
var _min = Math.min;
var _max = Math.max;
var DEFAULT_INNER_RADIUS = .5;
var RADIAL_LABEL_INDENT = _consts.default.radialLabelIndent;

function getNearestCoord(firstCoord, secondCoord, pointCenterCoord) {
    var nearestCoord;
    if (pointCenterCoord < firstCoord) {
        nearestCoord = firstCoord
    } else {
        if (secondCoord < pointCenterCoord) {
            nearestCoord = secondCoord
        } else {
            nearestCoord = pointCenterCoord
        }
    }
    return nearestCoord
}

function getLabelLayout(point) {
    if (point._label.isVisible() && "inside" !== point._label.getLayoutOptions().position) {
        return point._label.getBoundingRect()
    }
}

function getPieRadius(series, paneCenterX, paneCenterY, accessibleRadius, minR) {
    series.some(function(singleSeries) {
        return singleSeries.getVisiblePoints().reduce(function(radiusIsFound, point) {
            var labelBBox = getLabelLayout(point);
            if (labelBBox) {
                var xCoords = getNearestCoord(labelBBox.x, labelBBox.x + labelBBox.width, paneCenterX);
                var yCoords = getNearestCoord(labelBBox.y, labelBBox.y + labelBBox.height, paneCenterY);
                accessibleRadius = _min(_max(getLengthFromCenter(xCoords, yCoords, paneCenterX, paneCenterY) - RADIAL_LABEL_INDENT, minR), accessibleRadius);
                radiusIsFound = true
            }
            return radiusIsFound
        }, false)
    });
    return accessibleRadius
}

function getSizeLabels(series) {
    return series.reduce(function(res, singleSeries) {
        var maxWidth = singleSeries.getVisiblePoints().reduce(function(width, point) {
            var labelBBox = getLabelLayout(point);
            if (labelBBox && labelBBox.width > width) {
                width = labelBBox.width
            }
            return width
        }, 0);
        var rWidth = maxWidth;
        if (maxWidth) {
            res.outerLabelsCount++;
            if (res.outerLabelsCount > 1) {
                maxWidth += _consts.default.pieLabelSpacing
            }
            rWidth += _consts.default.pieLabelSpacing
        }
        res.sizes.push(maxWidth);
        res.rSizes.push(rWidth);
        res.common += maxWidth;
        return res
    }, {
        sizes: [],
        rSizes: [],
        common: 0,
        outerLabelsCount: 0
    })
}

function correctLabelRadius(labelSizes, radius, series, canvas, averageWidthLabels, centerX) {
    var curRadius;
    var i;
    var runningWidth = 0;
    var sizes = labelSizes.sizes;
    var rSizes = labelSizes.rSizes;
    for (i = 0; i < series.length; i++) {
        if (0 === sizes[i]) {
            curRadius && (curRadius += rSizes[i - 1]);
            continue
        }
        curRadius = floor(curRadius ? curRadius + rSizes[i - 1] : radius);
        series[i].correctLabelRadius(curRadius);
        runningWidth += averageWidthLabels || sizes[i];
        rSizes[i] = averageWidthLabels || rSizes[i];
        series[i].setVisibleArea({
            left: floor(centerX - radius - runningWidth),
            right: floor(canvas.width - (centerX + radius + runningWidth)),
            top: canvas.top,
            bottom: canvas.bottom,
            width: canvas.width,
            height: canvas.height
        })
    }
}

function getLengthFromCenter(x, y, paneCenterX, paneCenterY) {
    return sqrt((x - paneCenterX) * (x - paneCenterX) + (y - paneCenterY) * (y - paneCenterY))
}

function getInnerRadius(_ref) {
    var type = _ref.type,
        innerRadius = _ref.innerRadius;
    return "pie" === type ? 0 : (0, _type.isNumeric)(innerRadius) ? Number(innerRadius) : DEFAULT_INNER_RADIUS
}

function LayoutManager() {}

function getAverageLabelWidth(centerX, radius, canvas, sizeLabels) {
    return (centerX - radius - RADIAL_LABEL_INDENT - canvas.left) / sizeLabels.outerLabelsCount
}

function getFullRadiusWithLabels(centerX, canvas, sizeLabels) {
    return centerX - canvas.left - (sizeLabels.outerLabelsCount > 0 ? sizeLabels.common + RADIAL_LABEL_INDENT : 0)
}

function correctAvailableRadius(availableRadius, canvas, series, minR, paneCenterX, paneCenterY) {
    var sizeLabels = getSizeLabels(series);
    var averageWidthLabels;
    var fullRadiusWithLabels = getFullRadiusWithLabels(paneCenterX, canvas, sizeLabels);
    if (fullRadiusWithLabels < minR) {
        availableRadius = minR;
        averageWidthLabels = getAverageLabelWidth(paneCenterX, availableRadius, canvas, sizeLabels)
    } else {
        availableRadius = _min(getPieRadius(series, paneCenterX, paneCenterY, availableRadius, minR), fullRadiusWithLabels)
    }
    correctLabelRadius(sizeLabels, availableRadius + RADIAL_LABEL_INDENT, series, canvas, averageWidthLabels, paneCenterX);
    return availableRadius
}

function toLayoutElementCoords(canvas) {
    return new _layout_element.WrapperLayoutElement(null, {
        x: canvas.left,
        y: canvas.top,
        width: canvas.width - canvas.left - canvas.right,
        height: canvas.height - canvas.top - canvas.bottom
    })
}
LayoutManager.prototype = {
    constructor: LayoutManager,
    setOptions: function(options) {
        this._options = options
    },
    applyPieChartSeriesLayout: function(canvas, series, hideLayoutLabels) {
        var paneSpaceHeight = canvas.height - canvas.top - canvas.bottom;
        var paneSpaceWidth = canvas.width - canvas.left - canvas.right;
        var paneCenterX = paneSpaceWidth / 2 + canvas.left;
        var paneCenterY = paneSpaceHeight / 2 + canvas.top;
        var piePercentage = this._options.piePercentage;
        var availableRadius;
        var minR;
        if ((0, _type.isNumeric)(piePercentage)) {
            availableRadius = minR = piePercentage * _min(canvas.height, canvas.width) / 2
        } else {
            availableRadius = _min(paneSpaceWidth, paneSpaceHeight) / 2;
            minR = this._options.minPiePercentage * availableRadius
        }
        if (!hideLayoutLabels) {
            availableRadius = correctAvailableRadius(availableRadius, canvas, series, minR, paneCenterX, paneCenterY)
        }
        return {
            centerX: floor(paneCenterX),
            centerY: floor(paneCenterY),
            radiusInner: floor(availableRadius * getInnerRadius(series[0])),
            radiusOuter: floor(availableRadius)
        }
    },
    applyEqualPieChartLayout: function(series, layout) {
        var radius = layout.radius;
        return {
            centerX: floor(layout.x),
            centerY: floor(layout.y),
            radiusInner: floor(radius * getInnerRadius(series[0])),
            radiusOuter: floor(radius)
        }
    },
    correctPieLabelRadius: function(series, layout, canvas) {
        var sizeLabels = getSizeLabels(series);
        var averageWidthLabels;
        var radius = layout.radiusOuter + RADIAL_LABEL_INDENT;
        var availableLabelWidth = layout.centerX - canvas.left - radius;
        if (sizeLabels.common + RADIAL_LABEL_INDENT > availableLabelWidth) {
            averageWidthLabels = getAverageLabelWidth(layout.centerX, layout.radiusOuter, canvas, sizeLabels)
        }
        correctLabelRadius(sizeLabels, radius, series, canvas, averageWidthLabels, layout.centerX)
    },
    needMoreSpaceForPanesCanvas: function(panes, rotated, fixedSizeCallback) {
        var options = this._options;
        var width = options.width;
        var height = options.height;
        var piePercentage = options.piePercentage;
        var percentageIsValid = (0, _type.isNumeric)(piePercentage);
        var needHorizontalSpace = 0;
        var needVerticalSpace = 0;
        panes.forEach(function(pane) {
            var paneCanvas = pane.canvas;
            var minSize = percentageIsValid ? _min(paneCanvas.width, paneCanvas.height) * piePercentage : void 0;
            var paneSized = fixedSizeCallback ? fixedSizeCallback(pane) : {
                width: false,
                height: false
            };
            var needPaneHorizontalSpace = !paneSized.width ? (percentageIsValid ? minSize : width) - (paneCanvas.width - paneCanvas.left - paneCanvas.right) : 0;
            var needPaneVerticalSpace = !paneSized.height ? (percentageIsValid ? minSize : height) - (paneCanvas.height - paneCanvas.top - paneCanvas.bottom) : 0;
            if (rotated) {
                needHorizontalSpace += needPaneHorizontalSpace > 0 ? needPaneHorizontalSpace : 0;
                needVerticalSpace = _max(needPaneVerticalSpace > 0 ? needPaneVerticalSpace : 0, needVerticalSpace)
            } else {
                needHorizontalSpace = _max(needPaneHorizontalSpace > 0 ? needPaneHorizontalSpace : 0, needHorizontalSpace);
                needVerticalSpace += needPaneVerticalSpace > 0 ? needPaneVerticalSpace : 0
            }
        });
        return needHorizontalSpace > 0 || needVerticalSpace > 0 ? {
            width: needHorizontalSpace,
            height: needVerticalSpace
        } : false
    },
    layoutInsideLegend: function(legend, canvas) {
        var inverseAlign = {
            left: "right",
            right: "left",
            top: "bottom",
            bottom: "top",
            center: "center"
        };
        var layoutOptions = legend.getLayoutOptions();
        if (!layoutOptions) {
            return
        }
        var position = layoutOptions.position;
        var cutSide = layoutOptions.cutSide;
        var my = {
            horizontal: position.horizontal,
            vertical: position.vertical
        };
        canvas[layoutOptions.cutLayoutSide] += "horizontal" === layoutOptions.cutSide ? layoutOptions.width : layoutOptions.height;
        my[cutSide] = inverseAlign[my[cutSide]];
        legend.position({
            of: toLayoutElementCoords(canvas),
            my: my,
            at: position
        })
    }
};
