/**
 * DevExtreme (viz/axes/xy_axes.js)
 * Version: 20.2.6
 * Build date: Tue Mar 16 2021
 *
 * Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
exports.default = void 0;
var _range = require("../translators/range");
var _format_helper = _interopRequireDefault(require("../../format_helper"));
var _date = _interopRequireDefault(require("../../core/utils/date"));
var _extend = require("../../core/utils/extend");
var _datetime_breaks = require("./datetime_breaks");
var _common = require("../../core/utils/common");
var _utils = require("../core/utils");
var _type = require("../../core/utils/type");
var _axes_constants = _interopRequireDefault(require("./axes_constants"));

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        "default": obj
    }
}
var getNextDateUnit = _date.default.getNextDateUnit;
var correctDateWithUnitBeginning = _date.default.correctDateWithUnitBeginning;
var _math = Math;
var _max = _math.max;
var TOP = _axes_constants.default.top;
var BOTTOM = _axes_constants.default.bottom;
var LEFT = _axes_constants.default.left;
var RIGHT = _axes_constants.default.right;
var CENTER = _axes_constants.default.center;
var SCALE_BREAK_OFFSET = 3;
var RANGE_RATIO = .3;
var WAVED_LINE_CENTER = 2;
var WAVED_LINE_TOP = 0;
var WAVED_LINE_BOTTOM = 4;
var WAVED_LINE_LENGTH = 24;
var TICKS_CORRECTIONS = {
    left: -1,
    top: -1,
    right: 0,
    bottom: 0,
    center: -.5
};

function prepareDatesDifferences(datesDifferences, tickInterval) {
    var dateUnitInterval;
    var i;
    if ("week" === tickInterval) {
        tickInterval = "day"
    }
    if ("quarter" === tickInterval) {
        tickInterval = "month"
    }
    if (datesDifferences[tickInterval]) {
        for (i = 0; i < _date.default.dateUnitIntervals.length; i++) {
            dateUnitInterval = _date.default.dateUnitIntervals[i];
            if (datesDifferences[dateUnitInterval]) {
                datesDifferences[dateUnitInterval] = false;
                datesDifferences.count--
            }
            if (dateUnitInterval === tickInterval) {
                break
            }
        }
    }
}

function sortingBreaks(breaks) {
    return breaks.sort(function(a, b) {
        return a.from - b.from
    })
}

function getMarkerDates(min, max, markerInterval) {
    var origMin = min;
    var dates;
    min = correctDateWithUnitBeginning(min, markerInterval);
    max = correctDateWithUnitBeginning(max, markerInterval);
    dates = _date.default.getSequenceByInterval(min, max, markerInterval);
    if (dates.length && origMin > dates[0]) {
        dates = dates.slice(1)
    }
    return dates
}

function getStripHorizontalAlignmentPosition(alignment) {
    var position = "start";
    if ("center" === alignment) {
        position = "center"
    }
    if ("right" === alignment) {
        position = "end"
    }
    return position
}

function getStripVerticalAlignmentPosition(alignment) {
    var position = "start";
    if ("center" === alignment) {
        position = "center"
    }
    if ("bottom" === alignment) {
        position = "end"
    }
    return position
}

function getMarkerInterval(tickInterval) {
    var markerInterval = getNextDateUnit(tickInterval);
    if ("quarter" === markerInterval) {
        markerInterval = getNextDateUnit(markerInterval)
    }
    return markerInterval
}

function getMarkerFormat(curDate, prevDate, tickInterval, markerInterval) {
    var format = markerInterval;
    var datesDifferences = prevDate && _date.default.getDatesDifferences(prevDate, curDate);
    if (prevDate && "year" !== tickInterval) {
        prepareDatesDifferences(datesDifferences, tickInterval);
        format = _format_helper.default.getDateFormatByDifferences(datesDifferences)
    }
    return format
}

function getMaxSide(act, boxes) {
    return boxes.reduce(function(prevValue, box) {
        return _max(prevValue, act(box))
    }, 0)
}

function getDistanceByAngle(bBox, rotationAngle) {
    rotationAngle = _math.abs(rotationAngle);
    rotationAngle = rotationAngle % 180 >= 90 ? 90 - rotationAngle % 90 : rotationAngle % 90;
    var a = rotationAngle * (_math.PI / 180);
    if (a >= _math.atan(bBox.height / bBox.width)) {
        return bBox.height / _math.abs(_math.sin(a))
    } else {
        return bBox.width
    }
}

function getMaxConstantLinePadding(constantLines) {
    return constantLines.reduce(function(padding, options) {
        return _max(padding, options.paddingTopBottom)
    }, 0)
}

function getConstantLineLabelMarginForVerticalAlignment(constantLines, alignment, labelHeight) {
    return constantLines.some(function(options) {
        return options.label.verticalAlignment === alignment
    }) && labelHeight || 0
}

function getLeftMargin(bBox) {
    return _math.abs(bBox.x) || 0
}

function getRightMargin(bBox) {
    return _math.abs(bBox.width - _math.abs(bBox.x)) || 0
}

function generateRangesOnPoints(points, edgePoints, getRange) {
    var i;
    var length;
    var maxRange = null;
    var ranges = [];
    var curValue;
    var prevValue;
    var curRange;
    for (i = 1, length = points.length; i < length; i++) {
        curValue = points[i];
        prevValue = points[i - 1];
        curRange = getRange(curValue, prevValue);
        if (edgePoints.indexOf(curValue) >= 0) {
            if (!maxRange || curRange > maxRange.length) {
                maxRange = {
                    start: curValue,
                    end: prevValue,
                    length: curRange
                }
            }
        } else {
            if (maxRange && curRange < maxRange.length) {
                ranges.push(maxRange)
            } else {
                ranges.push({
                    start: curValue,
                    end: prevValue,
                    length: curRange
                })
            }
            maxRange = null
        }
    }
    if (maxRange) {
        ranges.push(maxRange)
    }
    return ranges
}

function generateAutoBreaks(_ref, series, _ref2) {
    var logarithmBase = _ref.logarithmBase,
        type = _ref.type,
        maxAutoBreakCount = _ref.maxAutoBreakCount;
    var minVisible = _ref2.minVisible,
        maxVisible = _ref2.maxVisible;
    var breaks = [];
    var getRange = "logarithmic" === type ? function(min, max) {
        return (0, _utils.getLog)(max / min, logarithmBase)
    } : function(min, max) {
        return max - min
    };
    var visibleRange = getRange(minVisible, maxVisible);
    var points = series.reduce(function(result, s) {
        var points = s.getPointsInViewPort();
        result[0] = result[0].concat(points[0]);
        result[1] = result[1].concat(points[1]);
        return result
    }, [
        [],
        []
    ]);
    var sortedAllPoints = points[0].concat(points[1]).sort(function(a, b) {
        return b - a
    });
    var edgePoints = points[1].filter(function(p) {
        return points[0].indexOf(p) < 0
    });
    var minDiff = RANGE_RATIO * visibleRange;
    var ranges = generateRangesOnPoints(sortedAllPoints, edgePoints, getRange).sort(function(a, b) {
        return b.length - a.length
    });
    var epsilon = _math.min.apply(null, ranges.map(function(r) {
        return r.length
    })) / 1e3;
    var _maxAutoBreakCount = (0, _type.isDefined)(maxAutoBreakCount) ? _math.min(maxAutoBreakCount, ranges.length) : ranges.length;
    for (var i = 0; i < _maxAutoBreakCount; i++) {
        if (ranges[i].length >= minDiff) {
            if (visibleRange <= ranges[i].length) {
                break
            }
            visibleRange -= ranges[i].length;
            if (visibleRange > epsilon || visibleRange < -epsilon) {
                breaks.push({
                    from: ranges[i].start,
                    to: ranges[i].end
                });
                minDiff = RANGE_RATIO * visibleRange
            }
        } else {
            break
        }
    }
    sortingBreaks(breaks);
    return breaks
}
var _default = {
    linear: {
        _getStep: function(boxes, rotationAngle) {
            var spacing = this._options.label.minSpacing;
            var func = this._isHorizontal ? function(box) {
                return box.width + spacing
            } : function(box) {
                return box.height
            };
            var maxLabelLength = getMaxSide(func, boxes);
            if (rotationAngle) {
                maxLabelLength = getDistanceByAngle({
                    width: maxLabelLength,
                    height: this._getMaxLabelHeight(boxes, 0)
                }, rotationAngle)
            }
            return _axes_constants.default.getTicksCountInRange(this._majorTicks, this._isHorizontal ? "x" : "y", maxLabelLength)
        },
        _getMaxLabelHeight: function(boxes, spacing) {
            return getMaxSide(function(box) {
                return box.height
            }, boxes) + spacing
        },
        _validateOverlappingMode: function(mode, displayMode) {
            if (this._isHorizontal && ("rotate" === displayMode || "stagger" === displayMode) || !this._isHorizontal) {
                return _axes_constants.default.validateOverlappingMode(mode)
            }
            return mode
        },
        _validateDisplayMode: function(mode) {
            return this._isHorizontal ? mode : "standard"
        },
        getMarkerTrackers: function() {
            return this._markerTrackers
        },
        _getSharpParam: function(opposite) {
            return this._isHorizontal ^ opposite ? "h" : "v"
        },
        _createAxisElement: function() {
            return this._renderer.path([], "line")
        },
        _updateAxisElementPosition: function() {
            var axisCoord = this._axisPosition;
            var canvas = this._getCanvasStartEnd();
            this._axisElement.attr({
                points: this._isHorizontal ? [canvas.start, axisCoord, canvas.end, axisCoord] : [axisCoord, canvas.start, axisCoord, canvas.end]
            })
        },
        _getTranslatedCoord: function(value, offset) {
            return this._translator.translate(value, offset)
        },
        _initAxisPositions: function() {
            var that = this;
            if (that.customPositionIsAvailable() && !(0, _type.isDefined)(that._customBoundaryPosition)) {
                that._customBoundaryPosition = that.getCustomBoundaryPosition()
            }
            if (!that.customPositionIsAvailable() || that.customPositionIsBoundary()) {
                that._axisPosition = that.getPredefinedPosition(that.getResolvedBoundaryPosition())
            } else {
                that._axisPosition = that.getCustomPosition()
            }
        },
        _getTickMarkPoints: function(coords, length, tickOptions) {
            var isHorizontal = this._isHorizontal;
            var tickOrientation = this._options.tickOrientation;
            var labelPosition = this._options.label.position;
            var tickStartCoord;
            if ((0, _type.isDefined)(tickOrientation)) {
                tickStartCoord = TICKS_CORRECTIONS[tickOrientation] * length
            } else {
                var shift = tickOptions.shift || 0;
                if (!isHorizontal && labelPosition === LEFT || isHorizontal && labelPosition !== BOTTOM) {
                    shift = -shift
                }
                tickStartCoord = shift + this.getTickStartPositionShift(length)
            }
            return [coords.x + (isHorizontal ? 0 : tickStartCoord), coords.y + (isHorizontal ? tickStartCoord : 0), coords.x + (isHorizontal ? 0 : tickStartCoord + length), coords.y + (isHorizontal ? tickStartCoord + length : 0)]
        },
        getTickStartPositionShift: function(length) {
            var width = this._options.width;
            var position = this.getResolvedBoundaryPosition();
            return length % 2 === 1 ? width % 2 === 0 && (position === LEFT || position === TOP) || width % 2 === 1 && (position === RIGHT || position === BOTTOM) && !this.hasCustomPosition() ? Math.floor(-length / 2) : -Math.floor(length / 2) : -length / 2 + (width % 2 === 0 ? 0 : position === BOTTOM || position === RIGHT ? -1 : 1)
        },
        _getTitleCoords: function() {
            var that = this;
            var horizontal = that._isHorizontal;
            var x = that._axisPosition;
            var y = that._axisPosition;
            var align = that._options.title.alignment;
            var canvas = that._getCanvasStartEnd();
            var fromStartToEnd = horizontal || that._options.position === LEFT;
            var canvasStart = fromStartToEnd ? canvas.start : canvas.end;
            var canvasEnd = fromStartToEnd ? canvas.end : canvas.start;
            var coord = align === LEFT ? canvasStart : align === RIGHT ? canvasEnd : canvas.start + (canvas.end - canvas.start) / 2;
            if (horizontal) {
                x = coord
            } else {
                y = coord
            }
            return {
                x: x,
                y: y
            }
        },
        _drawTitleText: function(group, coords) {
            var options = this._options;
            var titleOptions = options.title;
            var attrs = {
                opacity: titleOptions.opacity,
                align: titleOptions.alignment,
                "class": titleOptions.cssClass
            };
            if (!titleOptions.text || !group) {
                return
            }
            coords = coords || this._getTitleCoords();
            if (!this._isHorizontal) {
                attrs.rotate = options.position === LEFT ? 270 : 90
            }
            var text = this._renderer.text(titleOptions.text, coords.x, coords.y).css((0, _utils.patchFontOptions)(titleOptions.font)).attr(attrs).append(group);
            this._checkTitleOverflow(text);
            return text
        },
        _updateTitleCoords: function() {
            this._title && this._title.element.attr(this._getTitleCoords())
        },
        _drawTitle: function() {
            var title = this._drawTitleText(this._axisTitleGroup);
            if (title) {
                this._title = {
                    element: title
                }
            }
        },
        _measureTitle: function() {
            if (this._title) {
                if (this._title.bBox && !this._title.originalSize) {
                    this._title.originalSize = this._title.bBox
                }
                this._title.bBox = this._title.element.getBBox()
            }
        },
        _drawDateMarker: function(date, options, range) {
            var that = this;
            var markerOptions = that._options.marker;
            var invert = that._translator.getBusinessRange().invert;
            var textIndent = markerOptions.width + markerOptions.textLeftIndent;
            var pathElement;
            if (null === options.x) {
                return
            }
            if (!options.withoutStick) {
                pathElement = that._renderer.path([options.x, options.y, options.x, options.y + markerOptions.separatorHeight], "line").attr({
                    "stroke-width": markerOptions.width,
                    stroke: markerOptions.color,
                    "stroke-opacity": markerOptions.opacity,
                    sharp: "h"
                }).append(that._axisElementsGroup)
            }
            var text = String(that.formatLabel(date, options.labelOptions, range));
            return {
                date: date,
                x: options.x,
                y: options.y,
                cropped: options.withoutStick,
                label: that._renderer.text(text, options.x, options.y).css((0, _utils.patchFontOptions)(markerOptions.label.font)).append(that._axisElementsGroup),
                line: pathElement,
                getContentContainer: function() {
                    return this.label
                },
                getEnd: function() {
                    return this.x + (invert ? -1 : 1) * (textIndent + this.labelBBox.width)
                },
                setTitle: function() {
                    this.title = text
                },
                hideLabel: function() {
                    this.label.dispose();
                    this.label = null;
                    this.title = text
                },
                hide: function() {
                    if (pathElement) {
                        pathElement.dispose();
                        pathElement = null
                    }
                    this.label.dispose();
                    this.label = null;
                    this.hidden = true
                }
            }
        },
        _drawDateMarkers: function() {
            var that = this;
            var options = that._options;
            var translator = that._translator;
            var viewport = that._getViewportRange();
            var minBound = viewport.minVisible;
            var dateMarkers = [];
            var dateMarker;

            function draw(markerDate, format, withoutStick) {
                return that._drawDateMarker(markerDate, {
                    x: translator.translate(markerDate),
                    y: markersAreaTop,
                    labelOptions: that._getLabelFormatOptions(format),
                    withoutStick: withoutStick
                }, viewport)
            }
            if (viewport.isEmpty() || !options.marker.visible || "datetime" !== options.argumentType || "discrete" === options.type || that._majorTicks.length <= 1) {
                return []
            }
            var markersAreaTop = that._axisPosition + options.marker.topIndent;
            var tickInterval = _date.default.getDateUnitInterval(this._tickInterval);
            var markerInterval = getMarkerInterval(tickInterval);
            var markerDates = getMarkerDates(minBound, viewport.maxVisible, markerInterval);
            if (markerDates.length > 1 || 1 === markerDates.length && minBound < markerDates[0]) {
                dateMarkers = markerDates.reduce(function(markers, curDate, i, dates) {
                    var marker = draw(curDate, getMarkerFormat(curDate, dates[i - 1] || minBound < curDate && minBound, tickInterval, markerInterval));
                    marker && markers.push(marker);
                    return markers
                }, []);
                if (minBound < markerDates[0]) {
                    dateMarker = draw(minBound, getMarkerFormat(minBound, markerDates[0], tickInterval, markerInterval), true);
                    dateMarker && dateMarkers.unshift(dateMarker)
                }
            }
            return dateMarkers
        },
        _adjustDateMarkers: function(offset) {
            offset = offset || 0;
            var that = this;
            var markerOptions = this._options.marker;
            var textIndent = markerOptions.width + markerOptions.textLeftIndent;
            var invert = this._translator.getBusinessRange().invert;
            var canvas = that._getCanvasStartEnd();
            var dateMarkers = this._dateMarkers;
            if (!dateMarkers.length) {
                return offset
            }
            if (dateMarkers[0].cropped) {
                if (!this._checkMarkersPosition(invert, dateMarkers[1], dateMarkers[0])) {
                    dateMarkers[0].hideLabel()
                }
            }
            var prevDateMarker;
            dateMarkers.forEach(function(marker, i, markers) {
                if (marker.cropped) {
                    return
                }
                if (invert ? marker.getEnd() < canvas.end : marker.getEnd() > canvas.end) {
                    marker.hideLabel()
                } else {
                    if (that._checkMarkersPosition(invert, marker, prevDateMarker)) {
                        prevDateMarker = marker
                    } else {
                        marker.hide()
                    }
                }
            });
            this._dateMarkers.forEach(function(marker) {
                if (marker.label) {
                    var labelBBox = marker.labelBBox;
                    var dy = marker.y + markerOptions.textTopIndent - labelBBox.y;
                    marker.label.attr({
                        translateX: invert ? marker.x - textIndent - labelBBox.x - labelBBox.width : marker.x + textIndent - labelBBox.x,
                        translateY: dy + offset
                    })
                }
                if (marker.line) {
                    marker.line.attr({
                        translateY: offset
                    })
                }
            });
            that._initializeMarkersTrackers(offset);
            return offset + markerOptions.topIndent + markerOptions.separatorHeight
        },
        _checkMarkersPosition: function(invert, dateMarker, prevDateMarker) {
            if (void 0 === prevDateMarker) {
                return true
            }
            return invert ? dateMarker.x < prevDateMarker.getEnd() : dateMarker.x > prevDateMarker.getEnd()
        },
        _initializeMarkersTrackers: function(offset) {
            var that = this;
            var separatorHeight = that._options.marker.separatorHeight;
            var renderer = that._renderer;
            var businessRange = this._translator.getBusinessRange();
            var canvas = that._getCanvasStartEnd();
            var group = that._axisElementsGroup;
            that._markerTrackers = this._dateMarkers.filter(function(marker) {
                return !marker.hidden
            }).map(function(marker, i, markers) {
                var nextMarker = markers[i + 1] || {
                    x: canvas.end,
                    date: businessRange.max
                };
                var x = marker.x;
                var y = marker.y + offset;
                var markerTracker = renderer.path([x, y, x, y + separatorHeight, nextMarker.x, y + separatorHeight, nextMarker.x, y, x, y], "area").attr({
                    "stroke-width": 1,
                    stroke: "grey",
                    fill: "grey",
                    opacity: 1e-4
                }).append(group);
                markerTracker.data("range", {
                    startValue: marker.date,
                    endValue: nextMarker.date
                });
                if (marker.title) {
                    markerTracker.setTitle(marker.title)
                }
                return markerTracker
            })
        },
        _getLabelFormatOptions: function(formatString) {
            var that = this;
            var markerLabelOptions = that._markerLabelOptions;
            if (!markerLabelOptions) {
                that._markerLabelOptions = markerLabelOptions = (0, _extend.extend)(true, {}, that._options.marker.label)
            }
            if (!(0, _type.isDefined)(that._options.marker.label.format)) {
                markerLabelOptions.format = formatString
            }
            return markerLabelOptions
        },
        _adjustConstantLineLabels: function(constantLines) {
            var that = this;
            var axisPosition = that._options.position;
            var canvas = that.getCanvas();
            var canvasLeft = canvas.left;
            var canvasRight = canvas.width - canvas.right;
            var canvasTop = canvas.top;
            var canvasBottom = canvas.height - canvas.bottom;
            var verticalCenter = canvasTop + (canvasBottom - canvasTop) / 2;
            var horizontalCenter = canvasLeft + (canvasRight - canvasLeft) / 2;
            var maxLabel = 0;
            constantLines.forEach(function(item) {
                var isHorizontal = that._isHorizontal;
                var linesOptions = item.options;
                var paddingTopBottom = linesOptions.paddingTopBottom;
                var paddingLeftRight = linesOptions.paddingLeftRight;
                var labelOptions = linesOptions.label;
                var labelVerticalAlignment = labelOptions.verticalAlignment;
                var labelHorizontalAlignment = labelOptions.horizontalAlignment;
                var labelIsInside = "inside" === labelOptions.position;
                var label = item.label;
                var box = item.labelBBox;
                var translateX;
                var translateY;
                if (null === label || box.isEmpty) {
                    return
                }
                if (isHorizontal) {
                    if (labelIsInside) {
                        if (labelHorizontalAlignment === LEFT) {
                            translateX = item.coord - paddingLeftRight - box.x - box.width
                        } else {
                            translateX = item.coord + paddingLeftRight - box.x
                        }
                        switch (labelVerticalAlignment) {
                            case CENTER:
                                translateY = verticalCenter - box.y - box.height / 2;
                                break;
                            case BOTTOM:
                                translateY = canvasBottom - paddingTopBottom - box.y - box.height;
                                break;
                            default:
                                translateY = canvasTop + paddingTopBottom - box.y
                        }
                    } else {
                        if (axisPosition === labelVerticalAlignment) {
                            maxLabel = _max(maxLabel, box.height + paddingTopBottom)
                        }
                        translateX = item.coord - box.x - box.width / 2;
                        if (labelVerticalAlignment === BOTTOM) {
                            translateY = canvasBottom + paddingTopBottom - box.y
                        } else {
                            translateY = canvasTop - paddingTopBottom - box.y - box.height
                        }
                    }
                } else {
                    if (labelIsInside) {
                        if (labelVerticalAlignment === BOTTOM) {
                            translateY = item.coord + paddingTopBottom - box.y
                        } else {
                            translateY = item.coord - paddingTopBottom - box.y - box.height
                        }
                        switch (labelHorizontalAlignment) {
                            case CENTER:
                                translateX = horizontalCenter - box.x - box.width / 2;
                                break;
                            case RIGHT:
                                translateX = canvasRight - paddingLeftRight - box.x - box.width;
                                break;
                            default:
                                translateX = canvasLeft + paddingLeftRight - box.x
                        }
                    } else {
                        if (axisPosition === labelHorizontalAlignment) {
                            maxLabel = _max(maxLabel, box.width + paddingLeftRight)
                        }
                        translateY = item.coord - box.y - box.height / 2;
                        if (labelHorizontalAlignment === RIGHT) {
                            translateX = canvasRight + paddingLeftRight - box.x
                        } else {
                            translateX = canvasLeft - paddingLeftRight - box.x - box.width
                        }
                    }
                }
                label.attr({
                    translateX: translateX,
                    translateY: translateY
                })
            });
            return maxLabel
        },
        _drawConstantLinesForEstimating: function(constantLines) {
            var that = this;
            var renderer = this._renderer;
            var group = renderer.g();
            constantLines.forEach(function(options) {
                that._drawConstantLineLabelText(options.label.text, 0, 0, options.label, group).attr({
                    align: "center"
                })
            });
            return group.append(renderer.root)
        },
        _estimateLabelHeight: function(bBox, labelOptions) {
            var height = bBox.height;
            var drawingType = labelOptions.drawingType;
            if ("stagger" === this._validateDisplayMode(drawingType) || "stagger" === this._validateOverlappingMode(labelOptions.overlappingBehavior, drawingType)) {
                height = 2 * height + labelOptions.staggeringSpacing
            }
            if ("rotate" === this._validateDisplayMode(drawingType) || "rotate" === this._validateOverlappingMode(labelOptions.overlappingBehavior, drawingType)) {
                var sinCos = (0, _utils.getCosAndSin)(labelOptions.rotationAngle);
                height = height * sinCos.cos + bBox.width * sinCos.sin
            }
            return height && (height + labelOptions.indentFromAxis || 0) || 0
        },
        estimateMargins: function(canvas) {
            this.updateCanvas(canvas);
            var that = this;
            var range = that._getViewportRange();
            var ticksData = this._createTicksAndLabelFormat(range);
            var ticks = ticksData.ticks;
            var tickInterval = ticksData.tickInterval;
            var options = this._options;
            var constantLineOptions = that._outsideConstantLines.filter(function(l) {
                return l.labelOptions.visible
            }).map(function(l) {
                return l.options
            });
            var rootElement = that._renderer.root;
            var labelIsVisible = options.label.visible && !range.isEmpty() && ticks.length;
            var labelValue = labelIsVisible && that.formatLabel(ticks[ticks.length - 1], options.label, void 0, void 0, tickInterval, ticks);
            var labelElement = labelIsVisible && that._renderer.text(labelValue, 0, 0).css(that._textFontStyles).attr(that._textOptions).append(rootElement);
            var titleElement = that._drawTitleText(rootElement, {
                x: 0,
                y: 0
            });
            var constantLinesLabelsElement = that._drawConstantLinesForEstimating(constantLineOptions);
            var labelBox = !options.label.template && labelElement && labelElement.getBBox() || {
                x: 0,
                y: 0,
                width: 0,
                height: 0
            };
            var titleBox = titleElement && titleElement.getBBox() || {
                x: 0,
                y: 0,
                width: 0,
                height: 0
            };
            var constantLinesBox = constantLinesLabelsElement.getBBox();
            var titleHeight = titleBox.height ? titleBox.height + options.title.margin : 0;
            var labelHeight = that._estimateLabelHeight(labelBox, options.label);
            var constantLinesHeight = constantLinesBox.height ? constantLinesBox.height + getMaxConstantLinePadding(constantLineOptions) : 0;
            var height = labelHeight + titleHeight;
            var margins = {
                left: _max(getLeftMargin(labelBox), getLeftMargin(constantLinesBox)),
                right: _max(getRightMargin(labelBox), getRightMargin(constantLinesBox)),
                top: ("top" === options.position ? height : 0) + getConstantLineLabelMarginForVerticalAlignment(constantLineOptions, "top", constantLinesHeight),
                bottom: ("top" !== options.position ? height : 0) + getConstantLineLabelMarginForVerticalAlignment(constantLineOptions, "bottom", constantLinesHeight)
            };
            labelElement && labelElement.remove();
            titleElement && titleElement.remove();
            constantLinesLabelsElement && constantLinesLabelsElement.remove();
            return margins
        },
        _checkAlignmentConstantLineLabels: function(labelOptions) {
            var position = labelOptions.position;
            var verticalAlignment = (labelOptions.verticalAlignment || "").toLowerCase();
            var horizontalAlignment = (labelOptions.horizontalAlignment || "").toLowerCase();
            if (this._isHorizontal) {
                if ("outside" === position) {
                    verticalAlignment = verticalAlignment === BOTTOM ? BOTTOM : TOP;
                    horizontalAlignment = CENTER
                } else {
                    verticalAlignment = verticalAlignment === CENTER ? CENTER : verticalAlignment === BOTTOM ? BOTTOM : TOP;
                    horizontalAlignment = horizontalAlignment === LEFT ? LEFT : RIGHT
                }
            } else {
                if ("outside" === position) {
                    verticalAlignment = CENTER;
                    horizontalAlignment = horizontalAlignment === LEFT ? LEFT : RIGHT
                } else {
                    verticalAlignment = verticalAlignment === BOTTOM ? BOTTOM : TOP;
                    horizontalAlignment = horizontalAlignment === RIGHT ? RIGHT : horizontalAlignment === CENTER ? CENTER : LEFT
                }
            }
            labelOptions.verticalAlignment = verticalAlignment;
            labelOptions.horizontalAlignment = horizontalAlignment
        },
        _getConstantLineLabelsCoords: function(value, lineLabelOptions) {
            var that = this;
            var x = value;
            var y = value;
            if (that._isHorizontal) {
                y = that._orthogonalPositions["top" === lineLabelOptions.verticalAlignment ? "start" : "end"]
            } else {
                x = that._orthogonalPositions["right" === lineLabelOptions.horizontalAlignment ? "end" : "start"]
            }
            return {
                x: x,
                y: y
            }
        },
        _getAdjustedStripLabelCoords: function(strip) {
            var stripOptions = strip.options;
            var paddingTopBottom = stripOptions.paddingTopBottom;
            var paddingLeftRight = stripOptions.paddingLeftRight;
            var horizontalAlignment = stripOptions.label.horizontalAlignment;
            var verticalAlignment = stripOptions.label.verticalAlignment;
            var box = strip.labelBBox;
            var labelHeight = box.height;
            var labelWidth = box.width;
            var labelCoords = strip.labelCoords;
            var y = labelCoords.y - box.y;
            var x = labelCoords.x - box.x;
            if (verticalAlignment === TOP) {
                y += paddingTopBottom
            } else {
                if (verticalAlignment === CENTER) {
                    y -= labelHeight / 2
                } else {
                    if (verticalAlignment === BOTTOM) {
                        y -= paddingTopBottom + labelHeight
                    }
                }
            }
            if (horizontalAlignment === LEFT) {
                x += paddingLeftRight
            } else {
                if (horizontalAlignment === CENTER) {
                    x -= labelWidth / 2
                } else {
                    if (horizontalAlignment === RIGHT) {
                        x -= paddingLeftRight + labelWidth
                    }
                }
            }
            return {
                translateX: x,
                translateY: y
            }
        },
        _adjustTitle: function(offset) {
            offset = offset || 0;
            if (!this._title) {
                return
            }
            var that = this;
            var options = that._options;
            var position = options.position;
            var margin = options.title.margin;
            var title = that._title;
            var boxTitle = title.bBox;
            var x = boxTitle.x;
            var y = boxTitle.y;
            var width = boxTitle.width;
            var height = boxTitle.height;
            var axisPosition = that._axisPosition;
            var loCoord = axisPosition - margin - offset;
            var hiCoord = axisPosition + margin + offset;
            var params = {};
            if (that._isHorizontal) {
                if (position === TOP) {
                    params.translateY = loCoord - (y + height)
                } else {
                    params.translateY = hiCoord - y
                }
            } else {
                if (position === LEFT) {
                    params.translateX = loCoord - (x + width)
                } else {
                    params.translateX = hiCoord - x
                }
            }
            title.element.attr(params)
        },
        _checkTitleOverflow: function(titleElement) {
            if (!this._title && !titleElement) {
                return
            }
            var canvasLength = this._getScreenDelta();
            var title = titleElement ? {
                bBox: titleElement.getBBox(),
                element: titleElement
            } : this._title;
            var titleOptions = this._options.title;
            var boxTitle = title.bBox;
            if ((this._isHorizontal ? boxTitle.width : boxTitle.height) > canvasLength) {
                title.element.setMaxSize(canvasLength, void 0, {
                    wordWrap: titleOptions.wordWrap || "none",
                    textOverflow: titleOptions.textOverflow || "ellipsis"
                });
                this._wrapped = titleOptions.wordWrap && "none" !== titleOptions.wordWrap
            } else {
                var moreThanOriginalSize = title.originalSize && canvasLength > (this._isHorizontal ? title.originalSize.width : title.originalSize.height);
                !this._wrapped && moreThanOriginalSize && title.element.restoreText()
            }
        },
        coordsIn: function(x, y) {
            var canvas = this.getCanvas();
            var isHorizontal = this._options.isHorizontal;
            var position = this._options.position;
            var coord = isHorizontal ? y : x;
            if (isHorizontal && (x < canvas.left || x > canvas.width - canvas.right) || !isHorizontal && (y < canvas.top || y > canvas.height - canvas.bottom)) {
                return false
            }
            if (isHorizontal && position === _axes_constants.default.top || !isHorizontal && position === _axes_constants.default.left) {
                return coord < canvas[position]
            }
            return coord > canvas[isHorizontal ? "height" : "width"] - canvas[position]
        },
        _boundaryTicksVisibility: {
            min: true,
            max: true
        },
        adjust: function(alignToBounds) {
            var that = this;
            var seriesData = that._seriesData;
            var viewport = {
                min: seriesData.min,
                max: seriesData.max
            };
            if (!alignToBounds) {
                viewport = that._series.filter(function(s) {
                    return s.isVisible()
                }).reduce(function(range, s) {
                    var seriesRange = s.getViewport();
                    range.min = (0, _type.isDefined)(seriesRange.min) ? range.min < seriesRange.min ? range.min : seriesRange.min : range.min;
                    range.max = (0, _type.isDefined)(seriesRange.max) ? range.max > seriesRange.max ? range.max : seriesRange.max : range.max;
                    if (s.showZero) {
                        range = new _range.Range(range);
                        range.correctValueZeroLevel()
                    }
                    return range
                }, {})
            }
            if ((0, _type.isDefined)(viewport.min) && (0, _type.isDefined)(viewport.max)) {
                seriesData.minVisible = viewport.min;
                seriesData.maxVisible = viewport.max
            }
            seriesData.userBreaks = that._getScaleBreaks(that._options, {
                minVisible: seriesData.minVisible,
                maxVisible: seriesData.maxVisible
            }, that._series, that.isArgumentAxis);
            that._translator.updateBusinessRange(that._getViewportRange())
        },
        hasWrap: function() {
            return this._wrapped
        },
        getAxisPosition: function() {
            return this._axisPosition
        },
        _getStick: function() {
            return !this._options.valueMarginsEnabled
        },
        _getStripLabelCoords: function(from, to, stripLabelOptions) {
            var that = this;
            var orthogonalPositions = that._orthogonalPositions;
            var isHorizontal = that._isHorizontal;
            var horizontalAlignment = stripLabelOptions.horizontalAlignment;
            var verticalAlignment = stripLabelOptions.verticalAlignment;
            var x;
            var y;
            if (isHorizontal) {
                if (horizontalAlignment === CENTER) {
                    x = from + (to - from) / 2
                } else {
                    if (horizontalAlignment === LEFT) {
                        x = from
                    } else {
                        if (horizontalAlignment === RIGHT) {
                            x = to
                        }
                    }
                }
                y = orthogonalPositions[getStripVerticalAlignmentPosition(verticalAlignment)]
            } else {
                x = orthogonalPositions[getStripHorizontalAlignmentPosition(horizontalAlignment)];
                if (verticalAlignment === TOP) {
                    y = from
                } else {
                    if (verticalAlignment === CENTER) {
                        y = to + (from - to) / 2
                    } else {
                        if (verticalAlignment === BOTTOM) {
                            y = to
                        }
                    }
                }
            }
            return {
                x: x,
                y: y
            }
        },
        _getTranslatedValue: function(value, offset) {
            var pos1 = this._translator.translate(value, offset, "semidiscrete" === this._options.type && this._options.tickInterval);
            var pos2 = this._axisPosition;
            var isHorizontal = this._isHorizontal;
            return {
                x: isHorizontal ? pos1 : pos2,
                y: isHorizontal ? pos2 : pos1
            }
        },
        areCoordsOutsideAxis: function(coords) {
            var coord = this._isHorizontal ? coords.x : coords.y;
            var visibleArea = this.getVisibleArea();
            if (coord < visibleArea[0] || coord > visibleArea[1]) {
                return true
            }
            return false
        },
        _getSkippedCategory: function(ticks) {
            var skippedCategory;
            if (this._options.type === _axes_constants.default.discrete && this._tickOffset && 0 !== ticks.length) {
                skippedCategory = ticks[ticks.length - 1]
            }
            return skippedCategory
        },
        _filterBreaks: function(breaks, viewport, breakStyle) {
            var minVisible = viewport.minVisible;
            var maxVisible = viewport.maxVisible;
            var breakSize = breakStyle ? breakStyle.width : 0;
            return breaks.reduce(function(result, currentBreak) {
                var from = currentBreak.from;
                var to = currentBreak.to;
                var lastResult = result[result.length - 1];
                var newBreak;
                if (!(0, _type.isDefined)(from) || !(0, _type.isDefined)(to)) {
                    return result
                }
                if (from > to) {
                    to = [from, from = to][0]
                }
                if (result.length && from < lastResult.to) {
                    if (to > lastResult.to) {
                        lastResult.to = to > maxVisible ? maxVisible : to;
                        if (lastResult.gapSize) {
                            lastResult.gapSize = void 0;
                            lastResult.cumulativeWidth += breakSize
                        }
                    }
                } else {
                    if (from >= minVisible && from < maxVisible || to <= maxVisible && to > minVisible) {
                        from = from >= minVisible ? from : minVisible;
                        to = to <= maxVisible ? to : maxVisible;
                        if (to - from < maxVisible - minVisible) {
                            var _lastResult$cumulativ;
                            newBreak = {
                                from: from,
                                to: to,
                                cumulativeWidth: (null !== (_lastResult$cumulativ = null === lastResult || void 0 === lastResult ? void 0 : lastResult.cumulativeWidth) && void 0 !== _lastResult$cumulativ ? _lastResult$cumulativ : 0) + breakSize
                            };
                            if (currentBreak.gapSize) {
                                var _lastResult$cumulativ2;
                                newBreak.gapSize = _date.default.convertMillisecondsToDateUnits(to - from);
                                newBreak.cumulativeWidth = null !== (_lastResult$cumulativ2 = null === lastResult || void 0 === lastResult ? void 0 : lastResult.cumulativeWidth) && void 0 !== _lastResult$cumulativ2 ? _lastResult$cumulativ2 : 0
                            }
                            result.push(newBreak)
                        }
                    }
                }
                return result
            }, [])
        },
        _getScaleBreaks: function(axisOptions, viewport, series, isArgumentAxis) {
            var that = this;
            var breaks = (axisOptions.breaks || []).map(function(b) {
                return {
                    from: that.parser(b.startValue),
                    to: that.parser(b.endValue)
                }
            });
            if ("discrete" !== axisOptions.type && "datetime" === axisOptions.dataType && axisOptions.workdaysOnly) {
                breaks = breaks.concat((0, _datetime_breaks.generateDateBreaks)(viewport.minVisible, viewport.maxVisible, axisOptions.workWeek, axisOptions.singleWorkdays, axisOptions.holidays))
            }
            if (!isArgumentAxis && "discrete" !== axisOptions.type && "datetime" !== axisOptions.dataType && axisOptions.autoBreaksEnabled && 0 !== axisOptions.maxAutoBreakCount) {
                breaks = breaks.concat(generateAutoBreaks(axisOptions, series, viewport))
            }
            return sortingBreaks(breaks)
        },
        _drawBreak: function(translatedEnd, positionFrom, positionTo, width, options, group) {
            var that = this;
            var breakStart = translatedEnd - (!that._translator.isInverted() ? width + 1 : 0);
            var attr = {
                "stroke-width": 1,
                stroke: options.borderColor,
                sharp: !options.isWaved ? options.isHorizontal ? "h" : "v" : void 0
            };
            var spaceAttr = {
                stroke: options.color,
                "stroke-width": width
            };
            var getPoints = that._isHorizontal ? rotateLine : function(p) {
                return p
            };
            var drawer = getLineDrawer(that._renderer, group, getPoints, positionFrom, breakStart, positionTo, options.isWaved);
            drawer(width / 2, spaceAttr);
            drawer(0, attr);
            drawer(width, attr)
        },
        _createBreakClipRect: function(from, to) {
            var that = this;
            var canvas = that._canvas;
            var clipWidth = to - from;
            var clipRect;
            if (that._isHorizontal) {
                clipRect = that._renderer.clipRect(canvas.left, from, canvas.width, clipWidth)
            } else {
                clipRect = that._renderer.clipRect(from, canvas.top, clipWidth, canvas.height)
            }
            that._breaksElements = that._breaksElements || [];
            that._breaksElements.push(clipRect);
            return clipRect.id
        },
        _createBreaksGroup: function(clipFrom, clipTo) {
            var that = this;
            var group = that._renderer.g().attr({
                "class": that._axisCssPrefix + "breaks",
                "clip-path": that._createBreakClipRect(clipFrom, clipTo)
            }).append(that._scaleBreaksGroup);
            that._breaksElements = that._breaksElements || [];
            that._breaksElements.push(group);
            return group
        },
        _disposeBreaksGroup: function() {
            (this._breaksElements || []).forEach(function(clipRect) {
                clipRect.dispose()
            });
            this._breaksElements = null
        },
        drawScaleBreaks: function(customCanvas) {
            var that = this;
            var options = that._options;
            var breakStyle = options.breakStyle;
            var position = options.position;
            var positionFrom;
            var positionTo;
            var breaks = that._translator.getBusinessRange().breaks || [];
            var additionGroup;
            var additionBreakFrom;
            var additionBreakTo;
            that._disposeBreaksGroup();
            if (!(breaks && breaks.length)) {
                return
            }
            var breakOptions = {
                color: that._options.containerColor,
                borderColor: breakStyle.color,
                isHorizontal: that._isHorizontal,
                isWaved: "straight" !== breakStyle.line.toLowerCase()
            };
            if (customCanvas) {
                positionFrom = customCanvas.start;
                positionTo = customCanvas.end
            } else {
                positionFrom = that._orthogonalPositions.start - (options.visible && !that._axisShift && (position === LEFT || position === TOP) ? SCALE_BREAK_OFFSET : 0);
                positionTo = that._orthogonalPositions.end + (options.visible && (position === RIGHT || position === BOTTOM) ? SCALE_BREAK_OFFSET : 0)
            }
            var mainGroup = that._createBreaksGroup(positionFrom, positionTo);
            if (that._axisShift && options.visible) {
                additionBreakFrom = that._axisPosition - that._axisShift - SCALE_BREAK_OFFSET;
                additionBreakTo = additionBreakFrom + 2 * SCALE_BREAK_OFFSET;
                additionGroup = that._createBreaksGroup(additionBreakFrom, additionBreakTo)
            }
            breaks.forEach(function(br) {
                if (!br.gapSize) {
                    var breakCoord = that._getTranslatedCoord(br.to);
                    that._drawBreak(breakCoord, positionFrom, positionTo, breakStyle.width, breakOptions, mainGroup);
                    if (that._axisShift && options.visible) {
                        that._drawBreak(breakCoord, additionBreakFrom, additionBreakTo, breakStyle.width, breakOptions, additionGroup)
                    }
                }
            })
        },
        _getSpiderCategoryOption: _common.noop,
        shift: function(margins) {
            var that = this;
            var options = that._options;
            var isHorizontal = options.isHorizontal;
            var axesSpacing = that.getMultipleAxesSpacing();
            var constantLinesGroups = that._axisConstantLineGroups;

            function shiftGroup(side, group) {
                var attr = {
                    translateX: 0,
                    translateY: 0
                };
                var shift = margins[side] ? margins[side] + axesSpacing : 0;
                attr[isHorizontal ? "translateY" : "translateX"] = (side === LEFT || side === TOP ? -1 : 1) * shift;
                (group[side] || group).attr(attr);
                return shift
            }
            that._axisShift = shiftGroup(options.position, that._axisGroup);
            (isHorizontal ? [TOP, BOTTOM] : [LEFT, RIGHT]).forEach(function(side) {
                shiftGroup(side, constantLinesGroups.above);
                shiftGroup(side, constantLinesGroups.under)
            })
        },
        getCustomPosition: function(position) {
            var that = this;
            var orthogonalAxis = that.getOrthogonalAxis();
            var resolvedPosition = null !== position && void 0 !== position ? position : that.getResolvedPositionOption();
            var offset = that.getOptions().offset;
            var orthogonalTranslator = orthogonalAxis.getTranslator();
            var orthogonalAxisType = orthogonalAxis.getOptions().type;
            var validPosition = orthogonalAxis.validateUnit(resolvedPosition);
            var currentPosition;
            if ("discrete" === orthogonalAxisType && (!orthogonalTranslator._categories || orthogonalTranslator._categories.indexOf(validPosition) < 0)) {
                validPosition = void 0
            }
            if (that.positionIsBoundary(resolvedPosition)) {
                currentPosition = that.getPredefinedPosition(resolvedPosition)
            } else {
                if (!(0, _type.isDefined)(validPosition)) {
                    currentPosition = that.getPredefinedPosition(that.getOptions().position)
                } else {
                    currentPosition = orthogonalTranslator.to(validPosition, -1)
                }
            }
            if (isFinite(currentPosition) && isFinite(offset)) {
                currentPosition += offset
            }
            return currentPosition
        },
        getCustomBoundaryPosition: function(position) {
            var that = this;
            var orthogonalAxis = that.getOrthogonalAxis();
            var resolvedPosition = null !== position && void 0 !== position ? position : that.getResolvedPositionOption();
            var orthogonalTranslator = orthogonalAxis.getTranslator();
            var visibleArea = orthogonalTranslator.getCanvasVisibleArea();
            if (!(0, _type.isDefined)(orthogonalAxis._orthogonalPositions) || 0 === orthogonalTranslator.canvasLength) {
                return
            }
            var currentPosition = that.getCustomPosition(resolvedPosition);
            if (!(0, _type.isDefined)(currentPosition)) {
                return that.getResolvedBoundaryPosition()
            } else {
                if (currentPosition <= visibleArea.min) {
                    return that._isHorizontal ? TOP : LEFT
                } else {
                    if (currentPosition >= visibleArea.max) {
                        return that._isHorizontal ? BOTTOM : RIGHT
                    }
                }
            }
            return currentPosition
        },
        getResolvedPositionOption: function() {
            var _options$customPositi;
            var options = this.getOptions();
            return null !== (_options$customPositi = options.customPosition) && void 0 !== _options$customPositi ? _options$customPositi : options.position
        },
        customPositionIsAvailable: function() {
            var options = this.getOptions();
            return (0, _type.isDefined)(this.getOrthogonalAxis()) && ((0, _type.isDefined)(options.customPosition) || isFinite(options.offset))
        },
        hasCustomPosition: function() {
            return this.customPositionIsAvailable() && !this.customPositionIsBoundary()
        },
        getResolvedBoundaryPosition: function() {
            return this.customPositionIsBoundary() ? this._customBoundaryPosition : this.getOptions().position
        },
        customPositionEqualsToPredefined: function() {
            return this.customPositionIsBoundary() && this._customBoundaryPosition === this.getOptions().position
        },
        customPositionIsBoundary: function() {
            return this.positionIsBoundary(this._customBoundaryPosition)
        },
        positionIsBoundary: function(position) {
            return [TOP, LEFT, BOTTOM, RIGHT].indexOf(position) >= 0
        },
        getPredefinedPosition: function(position) {
            var _this$_orthogonalPosi;
            return null === (_this$_orthogonalPosi = this._orthogonalPositions) || void 0 === _this$_orthogonalPosi ? void 0 : _this$_orthogonalPosi[position === TOP || position === LEFT ? "start" : "end"]
        },
        resolveOverlappingForCustomPositioning: function(oppositeAxes) {
            var that = this;
            if (!that.hasCustomPosition() && !that.customPositionIsBoundary() && !oppositeAxes.some(function(a) {
                    return a.hasCustomPosition()
                })) {
                return
            }
            var overlappingObj = {
                axes: [],
                ticks: []
            };
            oppositeAxes.filter(function(orthogonalAxis) {
                return orthogonalAxis.pane === that.pane
            }).forEach(function(orthogonalAxis) {
                for (var i = 0; i < that._majorTicks.length; i++) {
                    var tick = that._majorTicks[i];
                    var label = tick.label;
                    if (label) {
                        if (overlappingObj.axes.indexOf(orthogonalAxis) < 0 && that._detectElementsOverlapping(label, orthogonalAxis._axisElement)) {
                            overlappingObj.axes.push(orthogonalAxis);
                            that._shiftThroughOrthogonalAxisOverlappedTick(label, orthogonalAxis)
                        }
                        for (var j = 0; j < orthogonalAxis._majorTicks.length; j++) {
                            var oppositeTick = orthogonalAxis._majorTicks[j];
                            var oppositeLabel = oppositeTick.label;
                            if (oppositeLabel && that._detectElementsOverlapping(label, oppositeLabel)) {
                                overlappingObj.ticks.push(tick);
                                that._shiftThroughAxisOverlappedTick(tick);
                                i = that._majorTicks.length;
                                break
                            }
                        }
                    }
                    if (tick.mark && overlappingObj.ticks.indexOf(tick) < 0) {
                        if (that._isHorizontal && tick.mark.attr("translateY")) {
                            tick.mark.attr({
                                translateY: 0
                            })
                        } else {
                            if (!that._isHorizontal && tick.mark.attr("translateX")) {
                                tick.mark.attr({
                                    translateX: 0
                                })
                            }
                        }
                    }
                }
            })
        },
        _shiftThroughOrthogonalAxisOverlappedTick: function(label, orthogonalAxis) {
            var that = this;
            var labelBBox = label.getBBox();
            var orthogonalAxisPosition = orthogonalAxis.getAxisPosition();
            var orthogonalAxisLabelOptions = orthogonalAxis.getOptions().label;
            var orthogonalAxisLabelPosition = orthogonalAxisLabelOptions.position;
            var orthogonalAxisLabelIndent = orthogonalAxisLabelOptions.indentFromAxis / 2;
            var translateCoordName = that._isHorizontal ? "translateX" : "translateY";
            var defaultOrthogonalAxisLabelPosition = that._isHorizontal ? LEFT : TOP;
            var translate = label.attr(translateCoordName);
            var labelCoord = (that._isHorizontal ? labelBBox.x : labelBBox.y) + translate;
            var labelSize = that._isHorizontal ? labelBBox.width : labelBBox.height;
            var outsidePart = orthogonalAxisPosition - labelCoord;
            var insidePart = labelCoord + labelSize - orthogonalAxisPosition;
            var attr = {};
            attr[translateCoordName] = translate;
            if (outsidePart > 0 && insidePart > 0) {
                if (insidePart - outsidePart > 1) {
                    attr[translateCoordName] += outsidePart + orthogonalAxisLabelIndent
                } else {
                    if (outsidePart - insidePart > 1) {
                        attr[translateCoordName] -= insidePart + orthogonalAxisLabelIndent
                    } else {
                        attr[translateCoordName] += orthogonalAxisLabelPosition === defaultOrthogonalAxisLabelPosition ? outsidePart + orthogonalAxisLabelIndent : -(insidePart + orthogonalAxisLabelIndent)
                    }
                }
                label.attr(attr)
            }
        },
        _shiftThroughAxisOverlappedTick: function(tick) {
            var _tick$mark;
            var that = this;
            var label = tick.label;
            if (!label) {
                return
            }
            var labelBBox = label.getBBox();
            var tickMarkBBox = null === (_tick$mark = tick.mark) || void 0 === _tick$mark ? void 0 : _tick$mark.getBBox();
            var axisPosition = that.getAxisPosition();
            var labelOptions = that.getOptions().label;
            var labelIndent = labelOptions.indentFromAxis;
            var labelPosition = labelOptions.position;
            var defaultLabelPosition = that._isHorizontal ? TOP : LEFT;
            var translateCoordName = that._isHorizontal ? "translateY" : "translateX";
            var translate = label.attr(translateCoordName);
            var labelCoord = (that._isHorizontal ? labelBBox.y : labelBBox.x) + translate;
            var labelSize = that._isHorizontal ? labelBBox.height : labelBBox.width;
            var attr = {};
            attr[translateCoordName] = translate + (labelPosition === defaultLabelPosition ? axisPosition - labelCoord + labelIndent : -(labelCoord - axisPosition + labelSize + labelIndent));
            label.attr(attr);
            if (tick.mark) {
                var markerCoord = that._isHorizontal ? tickMarkBBox.y : tickMarkBBox.x;
                var markerSize = that._isHorizontal ? tickMarkBBox.height : tickMarkBBox.width;
                attr[translateCoordName] = 2 * (axisPosition - markerCoord) - markerSize + 1;
                tick.mark.attr(attr)
            }
        },
        _detectElementsOverlapping: function(element1, element2) {
            if (!element1 || !element2) {
                return false
            }
            var bBox1 = element1.getBBox();
            var x1 = bBox1.x + element1.attr("translateX");
            var y1 = bBox1.y + element1.attr("translateY");
            var bBox2 = element2.getBBox();
            var x2 = bBox2.x + element2.attr("translateX");
            var y2 = bBox2.y + element2.attr("translateY");
            return (x2 >= x1 && x2 <= x1 + bBox1.width || x1 >= x2 && x1 <= x2 + bBox2.width) && (y2 >= y1 && y2 <= y1 + bBox1.height || y1 >= y2 && y1 <= y2 + bBox2.height)
        }
    }
};
exports.default = _default;

function getLineDrawer(renderer, root, rotatePoints, positionFrom, breakStart, positionTo, isWaved) {
    var elementType = isWaved ? "bezier" : "line";
    var group = renderer.g().append(root);
    return function(offset, attr) {
        renderer.path(rotatePoints(getPoints(positionFrom, breakStart, positionTo, offset, isWaved)), elementType).attr(attr).append(group)
    }
}

function getPoints(positionFrom, breakStart, positionTo, offset, isWaved) {
    if (!isWaved) {
        return [positionFrom, breakStart + offset, positionTo, breakStart + offset]
    }
    breakStart += offset;
    var currentPosition;
    var topPoint = breakStart + WAVED_LINE_TOP;
    var centerPoint = breakStart + WAVED_LINE_CENTER;
    var bottomPoint = breakStart + WAVED_LINE_BOTTOM;
    var points = [
        [positionFrom, centerPoint]
    ];
    for (currentPosition = positionFrom; currentPosition < positionTo + WAVED_LINE_LENGTH; currentPosition += WAVED_LINE_LENGTH) {
        points.push([currentPosition + 6, topPoint, currentPosition + 6, topPoint, currentPosition + 12, centerPoint, currentPosition + 18, bottomPoint, currentPosition + 18, bottomPoint, currentPosition + 24, centerPoint])
    }
    return [].concat.apply([], points)
}

function rotateLine(lineCoords) {
    var points = [];
    var i;
    for (i = 0; i < lineCoords.length; i += 2) {
        points.push(lineCoords[i + 1]);
        points.push(lineCoords[i])
    }
    return points
}
module.exports = exports.default;
