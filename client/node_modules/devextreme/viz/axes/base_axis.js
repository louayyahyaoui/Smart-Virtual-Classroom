/**
 * DevExtreme (viz/axes/base_axis.js)
 * Version: 20.2.6
 * Build date: Tue Mar 16 2021
 *
 * Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";

function _typeof(obj) {
    "@babel/helpers - typeof";
    if ("function" === typeof Symbol && "symbol" === typeof Symbol.iterator) {
        _typeof = function(obj) {
            return typeof obj
        }
    } else {
        _typeof = function(obj) {
            return obj && "function" === typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj
        }
    }
    return _typeof(obj)
}
exports.Axis = exports.calculateCanvasMargins = exports.measureLabels = void 0;
var _smart_formatter = require("./smart_formatter");
var _utils = require("../core/utils");
var _type = require("../../core/utils/type");
var _axes_constants = _interopRequireDefault(require("./axes_constants"));
var _extend = require("../../core/utils/extend");
var _array = require("../../core/utils/array");
var _format_helper = _interopRequireDefault(require("../../format_helper"));
var _parse_utils = require("../components/parse_utils");
var _tick_generator = require("./tick_generator");
var _translator2d = require("../translators/translator2d");
var _range = require("../translators/range");
var _tick = require("./tick");
var _math2 = require("../../core/utils/math");
var _date = _interopRequireDefault(require("../../core/utils/date"));
var _common = require("../../core/utils/common");
var _xy_axes = _interopRequireDefault(require("./xy_axes"));
var polarMethods = _interopRequireWildcard(require("./polar_axes"));
var _constant_line = _interopRequireDefault(require("./constant_line"));
var _strip = _interopRequireDefault(require("./strip"));
var _deferred = require("../../core/utils/deferred");

function _getRequireWildcardCache() {
    if ("function" !== typeof WeakMap) {
        return null
    }
    var cache = new WeakMap;
    _getRequireWildcardCache = function() {
        return cache
    };
    return cache
}

function _interopRequireWildcard(obj) {
    if (obj && obj.__esModule) {
        return obj
    }
    if (null === obj || "object" !== _typeof(obj) && "function" !== typeof obj) {
        return {
            "default": obj
        }
    }
    var cache = _getRequireWildcardCache();
    if (cache && cache.has(obj)) {
        return cache.get(obj)
    }
    var newObj = {};
    var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;
    for (var key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
            var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;
            if (desc && (desc.get || desc.set)) {
                Object.defineProperty(newObj, key, desc)
            } else {
                newObj[key] = obj[key]
            }
        }
    }
    newObj.default = obj;
    if (cache) {
        cache.set(obj, newObj)
    }
    return newObj
}

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        "default": obj
    }
}

function _defineProperty(obj, key, value) {
    if (key in obj) {
        Object.defineProperty(obj, key, {
            value: value,
            enumerable: true,
            configurable: true,
            writable: true
        })
    } else {
        obj[key] = value
    }
    return obj
}
var convertTicksToValues = _axes_constants.default.convertTicksToValues;
var _math = Math;
var _abs = _math.abs;
var _max = _math.max;
var _min = _math.min;
var _isArray = Array.isArray;
var DEFAULT_AXIS_LABEL_SPACING = 5;
var MAX_GRID_BORDER_ADHENSION = 4;
var TOP = _axes_constants.default.top;
var BOTTOM = _axes_constants.default.bottom;
var LEFT = _axes_constants.default.left;
var RIGHT = _axes_constants.default.right;
var CENTER = _axes_constants.default.center;
var KEEP = "keep";
var SHIFT = "shift";
var RESET = "reset";
var ROTATE = "rotate";
var DEFAULT_AXIS_DIVISION_FACTOR = 50;
var DEFAULT_MINOR_AXIS_DIVISION_FACTOR = 15;
var SCROLL_THRESHOLD = 5;
var MIN_BAR_MARGIN = 5;
var MAX_MARGIN_VALUE = .8;
var dateIntervals = {
    day: 864e5,
    week: 6048e5
};

function getTickGenerator(options, incidentOccurred, skipTickGeneration, rangeIsEmpty, adjustDivisionFactor, _ref) {
    var _options$workWeek;
    var allowNegatives = _ref.allowNegatives,
        linearThreshold = _ref.linearThreshold;
    return (0, _tick_generator.tickGenerator)({
        axisType: options.type,
        dataType: options.dataType,
        logBase: options.logarithmBase,
        allowNegatives: allowNegatives,
        linearThreshold: linearThreshold,
        axisDivisionFactor: adjustDivisionFactor(options.axisDivisionFactor || DEFAULT_AXIS_DIVISION_FACTOR),
        minorAxisDivisionFactor: adjustDivisionFactor(options.minorAxisDivisionFactor || DEFAULT_MINOR_AXIS_DIVISION_FACTOR),
        numberMultipliers: options.numberMultipliers,
        calculateMinors: options.minorTick.visible || options.minorGrid.visible || options.calculateMinors,
        allowDecimals: options.allowDecimals,
        endOnTick: options.endOnTick,
        incidentOccurred: incidentOccurred,
        firstDayOfWeek: null === (_options$workWeek = options.workWeek) || void 0 === _options$workWeek ? void 0 : _options$workWeek[0],
        skipTickGeneration: skipTickGeneration,
        skipCalculationLimits: options.skipCalculationLimits,
        generateExtraTick: options.generateExtraTick,
        minTickInterval: options.minTickInterval,
        rangeIsEmpty: rangeIsEmpty
    })
}

function createMajorTick(axis, renderer, skippedCategory) {
    var options = axis.getOptions();
    return (0, _tick.tick)(axis, renderer, options.tick, options.grid, skippedCategory, false)
}

function createMinorTick(axis, renderer) {
    var options = axis.getOptions();
    return (0, _tick.tick)(axis, renderer, options.minorTick, options.minorGrid)
}

function createBoundaryTick(axis, renderer, isFirst) {
    var options = axis.getOptions();
    return (0, _tick.tick)(axis, renderer, (0, _extend.extend)({}, options.tick, {
        visible: options.showCustomBoundaryTicks
    }), options.grid, void 0, false, isFirst ? -1 : 1)
}

function callAction(elements, action, actionArgument1, actionArgument2) {
    (elements || []).forEach(function(e) {
        return e[action](actionArgument1, actionArgument2)
    })
}

function initTickCoords(ticks) {
    callAction(ticks, "initCoords")
}

function drawTickMarks(ticks, options) {
    callAction(ticks, "drawMark", options)
}

function drawGrids(ticks, drawLine) {
    callAction(ticks, "drawGrid", drawLine)
}

function updateTicksPosition(ticks, options, animate) {
    callAction(ticks, "updateTickPosition", options, animate)
}

function updateGridsPosition(ticks, animate) {
    callAction(ticks, "updateGridPosition", animate)
}
var measureLabels = function(items) {
    items.forEach(function(item) {
        var label = item.getContentContainer();
        item.labelBBox = label ? label.getBBox() : {
            x: 0,
            y: 0,
            width: 0,
            height: 0
        }
    })
};
exports.measureLabels = measureLabels;

function cleanUpInvalidTicks(ticks) {
    var i = ticks.length - 1;
    for (i; i >= 0; i--) {
        if (!removeInvalidTick(ticks, i)) {
            break
        }
    }
    for (i = 0; i < ticks.length; i++) {
        if (removeInvalidTick(ticks, i)) {
            i--
        } else {
            break
        }
    }
}

function removeInvalidTick(ticks, i) {
    if (null === ticks[i].coords.x || null === ticks[i].coords.y) {
        ticks.splice(i, 1);
        return true
    }
    return false
}

function validateAxisOptions(options) {
    var _labelOptions$minSpac;
    var labelOptions = options.label;
    var position = options.position;
    var defaultPosition = options.isHorizontal ? BOTTOM : LEFT;
    var secondaryPosition = options.isHorizontal ? TOP : RIGHT;
    var labelPosition = labelOptions.position;
    if (position !== defaultPosition && position !== secondaryPosition) {
        position = defaultPosition
    }
    if (!labelPosition || "outside" === labelPosition) {
        labelPosition = position
    } else {
        if ("inside" === labelPosition) {
            var _TOP$BOTTOM$LEFT$RIGH;
            labelPosition = (_TOP$BOTTOM$LEFT$RIGH = {}, _defineProperty(_TOP$BOTTOM$LEFT$RIGH, TOP, BOTTOM), _defineProperty(_TOP$BOTTOM$LEFT$RIGH, BOTTOM, TOP), _defineProperty(_TOP$BOTTOM$LEFT$RIGH, LEFT, RIGHT), _defineProperty(_TOP$BOTTOM$LEFT$RIGH, RIGHT, LEFT), _TOP$BOTTOM$LEFT$RIGH)[position]
        }
    }
    if (labelPosition !== defaultPosition && labelPosition !== secondaryPosition) {
        labelPosition = position
    }
    if (labelOptions.alignment !== CENTER && !labelOptions.userAlignment) {
        var _TOP$BOTTOM$LEFT$RIGH2;
        labelOptions.alignment = (_TOP$BOTTOM$LEFT$RIGH2 = {}, _defineProperty(_TOP$BOTTOM$LEFT$RIGH2, TOP, CENTER), _defineProperty(_TOP$BOTTOM$LEFT$RIGH2, BOTTOM, CENTER), _defineProperty(_TOP$BOTTOM$LEFT$RIGH2, LEFT, RIGHT), _defineProperty(_TOP$BOTTOM$LEFT$RIGH2, RIGHT, LEFT), _TOP$BOTTOM$LEFT$RIGH2)[labelPosition]
    }
    options.position = position;
    labelOptions.position = labelPosition;
    options.hoverMode = options.hoverMode ? options.hoverMode.toLowerCase() : "none";
    labelOptions.minSpacing = null !== (_labelOptions$minSpac = labelOptions.minSpacing) && void 0 !== _labelOptions$minSpac ? _labelOptions$minSpac : DEFAULT_AXIS_LABEL_SPACING;
    options.type && (options.type = options.type.toLowerCase());
    options.argumentType && (options.argumentType = options.argumentType.toLowerCase());
    options.valueType && (options.valueType = options.valueType.toLowerCase())
}

function getOptimalAngle(boxes, labelOpt) {
    var angle = 180 * _math.asin((boxes[0].height + labelOpt.minSpacing) / (boxes[1].x - boxes[0].x)) / _math.PI;
    return angle < 45 ? -45 : -90
}

function updateLabels(ticks, step, func) {
    ticks.forEach(function(tick, index) {
        if (tick.getContentContainer()) {
            if (index % step !== 0) {
                tick.removeLabel()
            } else {
                if (func) {
                    func(tick, index)
                }
            }
        }
    })
}

function getZoomBoundValue(optionValue, dataValue) {
    if (void 0 === optionValue) {
        return dataValue
    } else {
        if (null === optionValue) {
            return
        } else {
            return optionValue
        }
    }
}

function configureGenerator(options, axisDivisionFactor, viewPort, screenDelta, minTickInterval) {
    var tickGeneratorOptions = (0, _extend.extend)({}, options, {
        endOnTick: true,
        axisDivisionFactor: axisDivisionFactor,
        skipCalculationLimits: true,
        generateExtraTick: true,
        minTickInterval: minTickInterval
    });
    return function(tickInterval, skipTickGeneration, min, max, breaks) {
        return getTickGenerator(tickGeneratorOptions, _common.noop, skipTickGeneration, viewPort.isEmpty(), function(v) {
            return v
        }, viewPort)({
            min: min,
            max: max,
            categories: viewPort.categories,
            isSpacedMargin: viewPort.isSpacedMargin
        }, screenDelta, tickInterval, (0, _type.isDefined)(tickInterval), void 0, void 0, void 0, breaks)
    }
}

function getConstantLineSharpDirection(coord, axisCanvas) {
    return Math.max(axisCanvas.start, axisCanvas.end) !== coord ? 1 : -1
}
var calculateCanvasMargins = function(bBoxes, canvas) {
    var cLeft = canvas.left;
    var cTop = canvas.top;
    var cRight = canvas.width - canvas.right;
    var cBottom = canvas.height - canvas.bottom;
    return bBoxes.reduce(function(margins, bBox) {
        if (!bBox || bBox.isEmpty) {
            return margins
        }
        return {
            left: _max(margins.left, cLeft - bBox.x),
            top: _max(margins.top, cTop - bBox.y),
            right: _max(margins.right, bBox.x + bBox.width - cRight),
            bottom: _max(margins.bottom, bBox.y + bBox.height - cBottom)
        }
    }, {
        left: 0,
        right: 0,
        top: 0,
        bottom: 0
    })
};
exports.calculateCanvasMargins = calculateCanvasMargins;
var Axis = function(renderSettings) {
    var that = this;
    that._renderer = renderSettings.renderer;
    that._incidentOccurred = renderSettings.incidentOccurred;
    that._eventTrigger = renderSettings.eventTrigger;
    that._stripsGroup = renderSettings.stripsGroup;
    that._labelAxesGroup = renderSettings.labelAxesGroup;
    that._constantLinesGroup = renderSettings.constantLinesGroup;
    that._scaleBreaksGroup = renderSettings.scaleBreaksGroup;
    that._axesContainerGroup = renderSettings.axesContainerGroup;
    that._gridContainerGroup = renderSettings.gridGroup;
    that._axisCssPrefix = renderSettings.widgetClass + "-" + (renderSettings.axisClass ? renderSettings.axisClass + "-" : "");
    that._setType(renderSettings.axisType, renderSettings.drawingType);
    that._createAxisGroups();
    that._translator = that._createTranslator();
    that.isArgumentAxis = renderSettings.isArgumentAxis;
    that._viewport = {};
    that._firstDrawing = true;
    that._initRange = {};
    that._getTemplate = renderSettings.getTemplate
};
exports.Axis = Axis;
Axis.prototype = {
    constructor: Axis,
    _drawAxis: function() {
        var options = this._options;
        if (!options.visible) {
            return
        }
        this._axisElement = this._createAxisElement();
        this._updateAxisElementPosition();
        this._axisElement.attr({
            "stroke-width": options.width,
            stroke: options.color,
            "stroke-opacity": options.opacity
        }).sharp(this._getSharpParam(true), this.getAxisSharpDirection()).append(this._axisLineGroup)
    },
    _createPathElement: function(points, attr, sharpDirection) {
        return this.sharp(this._renderer.path(points, "line").attr(attr), sharpDirection)
    },
    sharp: function(svgElement) {
        var sharpDirection = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 1;
        return svgElement.sharp(this._getSharpParam(), sharpDirection)
    },
    customPositionIsAvailable: function() {
        return false
    },
    getOrthogonalAxis: _common.noop,
    getCustomPosition: _common.noop,
    getCustomBoundaryPosition: _common.noop,
    resolveOverlappingForCustomPositioning: _common.noop,
    hasCustomPosition: function() {
        return false
    },
    customPositionIsBoundaryOrthogonalAxis: function() {
        return false
    },
    getResolvedBoundaryPosition: function() {
        return this.getOptions().position
    },
    getAxisSharpDirection: function() {
        var position = this.getResolvedBoundaryPosition();
        return this.hasCustomPosition() || position !== BOTTOM && position !== RIGHT ? 1 : -1
    },
    getSharpDirectionByCoords: function(coords) {
        var canvas = this._getCanvasStartEnd();
        var maxCoord = Math.max(canvas.start, canvas.end);
        return this.getRadius ? 0 : maxCoord !== coords[this._isHorizontal ? "x" : "y"] ? 1 : -1
    },
    _getGridLineDrawer: function() {
        var that = this;
        return function(tick, gridStyle) {
            var grid = that._getGridPoints(tick.coords);
            if (grid.points) {
                return that._createPathElement(grid.points, gridStyle, that.getSharpDirectionByCoords(tick.coords))
            }
            return null
        }
    },
    _getGridPoints: function(coords) {
        var that = this;
        var isHorizontal = this._isHorizontal;
        var tickPositionField = isHorizontal ? "x" : "y";
        var orthogonalPositions = this._orthogonalPositions;
        var positionFrom = orthogonalPositions.start;
        var positionTo = orthogonalPositions.end;
        var borderOptions = that.borderOptions;
        var canvasStart = isHorizontal ? LEFT : TOP;
        var canvasEnd = isHorizontal ? RIGHT : BOTTOM;
        var axisCanvas = that.getCanvas();
        var canvas = {
            left: axisCanvas.left,
            right: axisCanvas.width - axisCanvas.right,
            top: axisCanvas.top,
            bottom: axisCanvas.height - axisCanvas.bottom
        };
        var firstBorderLinePosition = borderOptions.visible && borderOptions[canvasStart] ? canvas[canvasStart] : void 0;
        var lastBorderLinePosition = borderOptions.visible && borderOptions[canvasEnd] ? canvas[canvasEnd] : void 0;
        var minDelta = MAX_GRID_BORDER_ADHENSION + firstBorderLinePosition;
        var maxDelta = lastBorderLinePosition - MAX_GRID_BORDER_ADHENSION;
        if (that.areCoordsOutsideAxis(coords) || void 0 === coords[tickPositionField] || coords[tickPositionField] < minDelta || coords[tickPositionField] > maxDelta) {
            return {
                points: null
            }
        }
        return {
            points: isHorizontal ? null !== coords[tickPositionField] ? [coords[tickPositionField], positionFrom, coords[tickPositionField], positionTo] : null : null !== coords[tickPositionField] ? [positionFrom, coords[tickPositionField], positionTo, coords[tickPositionField]] : null
        }
    },
    _getConstantLinePos: function(parsedValue, canvasStart, canvasEnd) {
        var value = this._getTranslatedCoord(parsedValue);
        if (!(0, _type.isDefined)(value) || value < _min(canvasStart, canvasEnd) || value > _max(canvasStart, canvasEnd)) {
            return
        }
        return value
    },
    _getConstantLineGraphicAttributes: function(value) {
        var positionFrom = this._orthogonalPositions.start;
        var positionTo = this._orthogonalPositions.end;
        return {
            points: this._isHorizontal ? [value, positionFrom, value, positionTo] : [positionFrom, value, positionTo, value]
        }
    },
    _createConstantLine: function(value, attr) {
        return this._createPathElement(this._getConstantLineGraphicAttributes(value).points, attr, getConstantLineSharpDirection(value, this._getCanvasStartEnd()))
    },
    _drawConstantLineLabelText: function(text, x, y, _ref2, group) {
        var font = _ref2.font,
            cssClass = _ref2.cssClass;
        return this._renderer.text(text, x, y).css((0, _utils.patchFontOptions)((0, _extend.extend)({}, this._options.label.font, font))).attr({
            align: "center",
            "class": cssClass
        }).append(group)
    },
    _drawConstantLineLabels: function(parsedValue, lineLabelOptions, value, group) {
        var _text;
        var that = this;
        var text = lineLabelOptions.text;
        var options = that._options;
        var labelOptions = options.label;
        that._checkAlignmentConstantLineLabels(lineLabelOptions);
        text = null !== (_text = text) && void 0 !== _text ? _text : that.formatLabel(parsedValue, labelOptions);
        var coords = that._getConstantLineLabelsCoords(value, lineLabelOptions);
        return that._drawConstantLineLabelText(text, coords.x, coords.y, lineLabelOptions, group)
    },
    _getStripPos: function(startValue, endValue, canvasStart, canvasEnd, range) {
        var isContinuous = !!(range.minVisible || range.maxVisible);
        var categories = (range.categories || []).reduce(function(result, cat) {
            result.push(cat.valueOf());
            return result
        }, []);
        var start;
        var end;
        var swap;
        var startCategoryIndex;
        var endCategoryIndex;
        if (!isContinuous) {
            if ((0, _type.isDefined)(startValue) && (0, _type.isDefined)(endValue)) {
                var parsedStartValue = this.parser(startValue);
                var parsedEndValue = this.parser(endValue);
                startCategoryIndex = (0, _array.inArray)((0, _type.isDefined)(parsedStartValue) ? parsedStartValue.valueOf() : void 0, categories);
                endCategoryIndex = (0, _array.inArray)((0, _type.isDefined)(parsedEndValue) ? parsedEndValue.valueOf() : void 0, categories);
                if (startCategoryIndex === -1 || endCategoryIndex === -1) {
                    return {
                        from: 0,
                        to: 0,
                        outOfCanvas: true
                    }
                }
                if (startCategoryIndex > endCategoryIndex) {
                    swap = endValue;
                    endValue = startValue;
                    startValue = swap
                }
            }
        }
        if ((0, _type.isDefined)(startValue)) {
            startValue = this.validateUnit(startValue, "E2105", "strip");
            start = this._getTranslatedCoord(startValue, -1)
        } else {
            start = canvasStart
        }
        if ((0, _type.isDefined)(endValue)) {
            endValue = this.validateUnit(endValue, "E2105", "strip");
            end = this._getTranslatedCoord(endValue, 1)
        } else {
            end = canvasEnd
        }
        var stripPosition = start < end ? {
            from: start,
            to: end
        } : {
            from: end,
            to: start
        };
        var visibleArea = this.getVisibleArea();
        if (stripPosition.from <= visibleArea[0] && stripPosition.to <= visibleArea[0] || stripPosition.from >= visibleArea[1] && stripPosition.to >= visibleArea[1]) {
            stripPosition.outOfCanvas = true
        }
        return stripPosition
    },
    _getStripGraphicAttributes: function(fromPoint, toPoint) {
        var x;
        var y;
        var width;
        var height;
        var orthogonalPositions = this._orthogonalPositions;
        var positionFrom = orthogonalPositions.start;
        var positionTo = orthogonalPositions.end;
        if (this._isHorizontal) {
            x = fromPoint;
            y = _min(positionFrom, positionTo);
            width = toPoint - fromPoint;
            height = _abs(positionFrom - positionTo)
        } else {
            x = _min(positionFrom, positionTo);
            y = fromPoint;
            width = _abs(positionFrom - positionTo);
            height = _abs(fromPoint - toPoint)
        }
        return {
            x: x,
            y: y,
            width: width,
            height: height
        }
    },
    _createStrip: function(attrs) {
        return this._renderer.rect(attrs.x, attrs.y, attrs.width, attrs.height)
    },
    _adjustStripLabels: function() {
        var that = this;
        this._strips.forEach(function(strip) {
            if (strip.label) {
                strip.label.attr(that._getAdjustedStripLabelCoords(strip))
            }
        })
    },
    _adjustLabelsCoord: function(offset, maxWidth, checkCanvas) {
        var _this = this;
        var that = this;
        var getContainerAttrs = function(tick) {
            return _this._getLabelAdjustedCoord(tick, offset + (tick.labelOffset || 0), maxWidth, checkCanvas)
        };
        that._majorTicks.forEach(function(tick) {
            if (tick.label) {
                tick.updateMultilineTextAlignment();
                tick.label.attr(getContainerAttrs(tick))
            } else {
                tick.templateContainer && tick.templateContainer.attr(getContainerAttrs(tick))
            }
        })
    },
    _adjustLabels: function(offset) {
        var that = this;
        var options = that.getOptions();
        var positionsAreConsistent = options.position === options.label.position;
        var maxSize = that._majorTicks.reduce(function(size, tick) {
            if (!tick.getContentContainer()) {
                return size
            }
            var bBox = tick.labelRotationAngle ? (0, _utils.rotateBBox)(tick.labelBBox, [tick.labelCoords.x, tick.labelCoords.y], -tick.labelRotationAngle) : tick.labelBBox;
            return {
                width: _max(size.width || 0, bBox.width),
                height: _max(size.height || 0, bBox.height),
                offset: _max(size.offset || 0, tick.labelOffset || 0)
            }
        }, {});
        var additionalOffset = positionsAreConsistent ? that._isHorizontal ? maxSize.height : maxSize.width : 0;
        that._adjustLabelsCoord(offset, maxSize.width);
        return offset + additionalOffset + (additionalOffset && that._options.label.indentFromAxis) + (positionsAreConsistent ? maxSize.offset : 0)
    },
    _getLabelAdjustedCoord: function(tick, offset, maxWidth) {
        offset = offset || 0;
        var that = this;
        var options = that._options;
        var templateBox = tick.templateContainer && tick.templateContainer.getBBox();
        var box = templateBox || (0, _utils.rotateBBox)(tick.labelBBox, [tick.labelCoords.x, tick.labelCoords.y], -tick.labelRotationAngle || 0);
        var textAlign = tick.labelAlignment || options.label.alignment;
        var isDiscrete = "discrete" === that._options.type;
        var isFlatLabel = tick.labelRotationAngle % 90 === 0;
        var indentFromAxis = options.label.indentFromAxis;
        var labelPosition = options.label.position;
        var axisPosition = that._axisPosition;
        var labelCoords = tick.labelCoords;
        var labelX = labelCoords.x;
        var translateX;
        var translateY;
        if (that._isHorizontal) {
            if (labelPosition === BOTTOM) {
                translateY = axisPosition + indentFromAxis - box.y + offset
            } else {
                translateY = axisPosition - indentFromAxis - (box.y + box.height) - offset
            }
            if (textAlign === RIGHT) {
                translateX = isDiscrete && isFlatLabel ? tick.coords.x - (box.x + box.width) : labelX - box.x - box.width
            } else {
                if (textAlign === LEFT) {
                    translateX = isDiscrete && isFlatLabel ? labelX - box.x - (tick.coords.x - labelX) : labelX - box.x
                } else {
                    translateX = labelX - box.x - box.width / 2
                }
            }
        } else {
            translateY = labelCoords.y - box.y - box.height / 2;
            if (labelPosition === LEFT) {
                if (textAlign === LEFT) {
                    translateX = axisPosition - indentFromAxis - maxWidth - box.x
                } else {
                    if (textAlign === CENTER) {
                        translateX = axisPosition - indentFromAxis - maxWidth / 2 - box.x - box.width / 2
                    } else {
                        translateX = axisPosition - indentFromAxis - box.x - box.width
                    }
                }
                translateX -= offset
            } else {
                if (textAlign === RIGHT) {
                    translateX = axisPosition + indentFromAxis + maxWidth - box.x - box.width
                } else {
                    if (textAlign === CENTER) {
                        translateX = axisPosition + indentFromAxis + maxWidth / 2 - box.x - box.width / 2
                    } else {
                        translateX = axisPosition + indentFromAxis - box.x
                    }
                }
                translateX += offset
            }
        }
        return {
            translateX: translateX,
            translateY: translateY
        }
    },
    _createAxisConstantLineGroups: function() {
        var that = this;
        var renderer = that._renderer;
        var classSelector = that._axisCssPrefix;
        var constantLinesClass = classSelector + "constant-lines";
        var insideGroup = renderer.g().attr({
            "class": constantLinesClass
        });
        var outsideGroup1 = renderer.g().attr({
            "class": constantLinesClass
        });
        var outsideGroup2 = renderer.g().attr({
            "class": constantLinesClass
        });
        return {
            inside: insideGroup,
            outside1: outsideGroup1,
            left: outsideGroup1,
            top: outsideGroup1,
            outside2: outsideGroup2,
            right: outsideGroup2,
            bottom: outsideGroup2,
            remove: function() {
                this.inside.remove();
                this.outside1.remove();
                this.outside2.remove()
            },
            clear: function() {
                this.inside.clear();
                this.outside1.clear();
                this.outside2.clear()
            }
        }
    },
    _createAxisGroups: function() {
        var that = this;
        var renderer = that._renderer;
        var classSelector = that._axisCssPrefix;
        that._axisGroup = renderer.g().attr({
            "class": classSelector + "axis"
        }).enableLinks();
        that._axisStripGroup = renderer.g().attr({
            "class": classSelector + "strips"
        });
        that._axisGridGroup = renderer.g().attr({
            "class": classSelector + "grid"
        });
        that._axisElementsGroup = renderer.g().attr({
            "class": classSelector + "elements"
        }).linkOn(that._axisGroup, "axisElements").linkAppend();
        that._axisLineGroup = renderer.g().attr({
            "class": classSelector + "line"
        }).linkOn(that._axisGroup, "axisLine").linkAppend();
        that._axisTitleGroup = renderer.g().attr({
            "class": classSelector + "title"
        }).append(that._axisGroup);
        that._axisConstantLineGroups = {
            above: that._createAxisConstantLineGroups(),
            under: that._createAxisConstantLineGroups()
        };
        that._axisStripLabelGroup = renderer.g().attr({
            "class": classSelector + "axis-labels"
        })
    },
    _clearAxisGroups: function() {
        var that = this;
        that._axisGroup.remove();
        that._axisStripGroup.remove();
        that._axisStripLabelGroup.remove();
        that._axisConstantLineGroups.above.remove();
        that._axisConstantLineGroups.under.remove();
        that._axisGridGroup.remove();
        that._axisTitleGroup.clear();
        (!that._options.label.template || !that.isRendered()) && that._axisElementsGroup.clear();
        that._axisLineGroup && that._axisLineGroup.clear();
        that._axisStripGroup && that._axisStripGroup.clear();
        that._axisGridGroup && that._axisGridGroup.clear();
        that._axisConstantLineGroups.above.clear();
        that._axisConstantLineGroups.under.clear();
        that._axisStripLabelGroup && that._axisStripLabelGroup.clear()
    },
    _getLabelFormatObject: function(value, labelOptions, range, point, tickInterval, ticks) {
        range = range || this._getViewportRange();
        var formatObject = {
            value: value,
            valueText: (0, _smart_formatter.smartFormatter)(value, {
                labelOptions: labelOptions,
                ticks: ticks || convertTicksToValues(this._majorTicks),
                tickInterval: null !== tickInterval && void 0 !== tickInterval ? tickInterval : this._tickInterval,
                dataType: this._options.dataType,
                logarithmBase: this._options.logarithmBase,
                type: this._options.type,
                showTransition: !this._options.marker.visible,
                point: point
            }) || "",
            min: range.minVisible,
            max: range.maxVisible
        };
        if (point) {
            formatObject.point = point
        }
        return formatObject
    },
    formatLabel: function(value, labelOptions, range, point, tickInterval, ticks) {
        var formatObject = this._getLabelFormatObject(value, labelOptions, range, point, tickInterval, ticks);
        return (0, _type.isFunction)(labelOptions.customizeText) ? labelOptions.customizeText.call(formatObject, formatObject) : formatObject.valueText
    },
    formatHint: function(value, labelOptions, range) {
        var formatObject = this._getLabelFormatObject(value, labelOptions, range);
        return (0, _type.isFunction)(labelOptions.customizeHint) ? labelOptions.customizeHint.call(formatObject, formatObject) : void 0
    },
    formatRange: function(startValue, endValue, interval) {
        return (0, _smart_formatter.formatRange)(startValue, endValue, interval, this.getOptions())
    },
    _setTickOffset: function() {
        var options = this._options;
        var discreteAxisDivisionMode = options.discreteAxisDivisionMode;
        this._tickOffset = +("crossLabels" !== discreteAxisDivisionMode || !discreteAxisDivisionMode)
    },
    resetApplyingAnimation: function(isFirstDrawing) {
        this._resetApplyingAnimation = true;
        if (isFirstDrawing) {
            this._firstDrawing = true
        }
    },
    getMargins: function() {
        var that = this;
        if (that.hasCustomPosition()) {
            return {
                left: 0,
                right: 0,
                top: 0,
                bottom: 0
            }
        }
        var options = that._options;
        var position = options.position;
        var placeholderSize = options.placeholderSize;
        var canvas = that.getCanvas();
        var cLeft = canvas.left;
        var cTop = canvas.top;
        var cRight = canvas.width - canvas.right;
        var cBottom = canvas.height - canvas.bottom;
        var edgeMarginCorrection = _max(options.grid.visible && options.grid.width || 0, options.tick.visible && options.tick.width || 0);
        var constantLineAboveSeries = that._axisConstantLineGroups.above;
        var constantLineUnderSeries = that._axisConstantLineGroups.under;
        var boxes = [that._axisElementsGroup, constantLineAboveSeries.outside1, constantLineAboveSeries.outside2, constantLineUnderSeries.outside1, constantLineUnderSeries.outside2, that._axisLineGroup].map(function(group) {
            return group && group.getBBox()
        }).concat(function(group) {
            var box = group && group.getBBox();
            if (!box || box.isEmpty) {
                return box
            }
            if (that._isHorizontal) {
                box.x = cLeft;
                box.width = cRight - cLeft
            } else {
                box.y = cTop;
                box.height = cBottom - cTop
            }
            return box
        }(that._axisTitleGroup));
        var margins = calculateCanvasMargins(boxes, canvas);
        margins[position] += options.crosshairMargin;
        if (placeholderSize) {
            margins[position] = placeholderSize
        }
        if (edgeMarginCorrection) {
            if (that._isHorizontal && canvas.right < edgeMarginCorrection && margins.right < edgeMarginCorrection) {
                margins.right = edgeMarginCorrection
            }
            if (!that._isHorizontal && canvas.bottom < edgeMarginCorrection && margins.bottom < edgeMarginCorrection) {
                margins.bottom = edgeMarginCorrection
            }
        }
        return margins
    },
    validateUnit: function(unit, idError, parameters) {
        var that = this;
        unit = that.parser(unit);
        if (void 0 === unit && idError) {
            that._incidentOccurred(idError, [parameters])
        }
        return unit
    },
    _setType: function(axisType, drawingType) {
        var that = this;
        var axisTypeMethods;
        switch (axisType) {
            case "xyAxes":
                axisTypeMethods = _xy_axes.default;
                break;
            case "polarAxes":
                axisTypeMethods = polarMethods
        }(0, _extend.extend)(that, axisTypeMethods[drawingType])
    },
    _getSharpParam: function() {
        return true
    },
    _disposeBreaksGroup: _common.noop,
    dispose: function() {
        var that = this;
        [that._axisElementsGroup, that._axisStripGroup, that._axisGroup].forEach(function(g) {
            g.dispose()
        });
        that._strips = that._title = null;
        that._axisStripGroup = that._axisConstantLineGroups = that._axisStripLabelGroup = that._axisBreaksGroup = null;
        that._axisLineGroup = that._axisElementsGroup = that._axisGridGroup = null;
        that._axisGroup = that._axisTitleGroup = null;
        that._axesContainerGroup = that._stripsGroup = that._constantLinesGroup = null;
        that._renderer = that._options = that._textOptions = that._textFontStyles = null;
        that._translator = null;
        that._majorTicks = that._minorTicks = null;
        that._disposeBreaksGroup();
        that._templatesRendered && that._templatesRendered.reject()
    },
    getOptions: function() {
        return this._options
    },
    setPane: function(pane) {
        this.pane = pane;
        this._options.pane = pane
    },
    setTypes: function(type, axisType, typeSelector) {
        this._options.type = type || this._options.type;
        this._options[typeSelector] = axisType || this._options[typeSelector];
        this._updateTranslator()
    },
    resetTypes: function(typeSelector) {
        this._options.type = this._initTypes.type;
        this._options[typeSelector] = this._initTypes[typeSelector]
    },
    getTranslator: function() {
        return this._translator
    },
    updateOptions: function(options) {
        var that = this;
        var labelOpt = options.label;
        validateAxisOptions(options);
        that._options = options;
        options.tick = options.tick || {};
        options.minorTick = options.minorTick || {};
        options.grid = options.grid || {};
        options.minorGrid = options.minorGrid || {};
        options.title = options.title || {};
        options.marker = options.marker || {};
        that._initTypes = {
            type: options.type,
            argumentType: options.argumentType,
            valueType: options.valueType
        };
        that._setTickOffset();
        that._isHorizontal = options.isHorizontal;
        that.pane = options.pane;
        that.name = options.name;
        that.priority = options.priority;
        that._hasLabelFormat = "" !== labelOpt.format && (0, _type.isDefined)(labelOpt.format);
        that._textOptions = {
            opacity: labelOpt.opacity,
            align: "center",
            "class": labelOpt.cssClass
        };
        that._textFontStyles = (0, _utils.patchFontOptions)(labelOpt.font);
        if (options.type === _axes_constants.default.logarithmic) {
            if (options.logarithmBaseError) {
                that._incidentOccurred("E2104");
                delete options.logarithmBaseError
            }
        }
        that._updateTranslator();
        that._createConstantLines();
        that._strips = (options.strips || []).map(function(o) {
            return (0, _strip.default)(that, o)
        });
        that._majorTicks = that._minorTicks = null;
        that._firstDrawing = true
    },
    calculateInterval: function(value, prevValue) {
        var options = this._options;
        if (!options || options.type !== _axes_constants.default.logarithmic) {
            return _abs(value - prevValue)
        }
        var _Range = new _range.Range(this.getTranslator().getBusinessRange()),
            allowNegatives = _Range.allowNegatives,
            linearThreshold = _Range.linearThreshold;
        return _abs((0, _utils.getLogExt)(value, options.logarithmBase, allowNegatives, linearThreshold) - (0, _utils.getLogExt)(prevValue, options.logarithmBase, allowNegatives, linearThreshold))
    },
    getCanvasRange: function() {
        var translator = this._translator;
        return {
            startValue: translator.from(translator.translate("canvas_position_start")),
            endValue: translator.from(translator.translate("canvas_position_end"))
        }
    },
    _processCanvas: function(canvas) {
        return canvas
    },
    updateCanvas: function(canvas, canvasRedesign) {
        if (!canvasRedesign) {
            var positions = this._orthogonalPositions = {
                start: !this._isHorizontal ? canvas.left : canvas.top,
                end: !this._isHorizontal ? canvas.width - canvas.right : canvas.height - canvas.bottom
            };
            positions.center = positions.start + (positions.end - positions.start) / 2
        } else {
            this._orthogonalPositions = null
        }
        this._canvas = canvas;
        this._translator.updateCanvas(this._processCanvas(canvas));
        this._initAxisPositions()
    },
    getCanvas: function() {
        return this._canvas
    },
    getAxisShift: function() {
        return this._axisShift || 0
    },
    hideTitle: function() {
        var that = this;
        if (that._options.title.text) {
            that._incidentOccurred("W2105", [that._isHorizontal ? "horizontal" : "vertical"]);
            that._axisTitleGroup.clear()
        }
    },
    getTitle: function() {
        return this._title
    },
    hideOuterElements: function() {
        var that = this;
        var options = that._options;
        if ((options.label.visible || that._outsideConstantLines.length) && !that._translator.getBusinessRange().isEmpty()) {
            that._incidentOccurred("W2106", [that._isHorizontal ? "horizontal" : "vertical"]);
            that._axisElementsGroup.clear();
            callAction(that._outsideConstantLines, "removeLabel")
        }
    },
    _resolveLogarithmicOptionsForRange: function(range) {
        var options = this._options;
        if (options.type === _axes_constants.default.logarithmic) {
            range.addRange({
                allowNegatives: void 0 !== options.allowNegatives ? options.allowNegatives : range.min <= 0
            });
            if (!isNaN(options.linearThreshold)) {
                range.linearThreshold = options.linearThreshold
            }
        }
    },
    adjustViewport: function(businessRange) {
        var that = this;
        var options = that._options;
        var isDiscrete = options.type === _axes_constants.default.discrete;
        var categories = that._seriesData && that._seriesData.categories || [];
        var wholeRange = that.adjustRange((0, _utils.getVizRangeObject)(options.wholeRange));
        var visualRange = that.getViewport() || {};
        var result = new _range.Range(businessRange);
        that._addConstantLinesToRange(result, "minVisible", "maxVisible");
        var minDefined = (0, _type.isDefined)(visualRange.startValue);
        var maxDefined = (0, _type.isDefined)(visualRange.endValue);
        if (!isDiscrete) {
            minDefined = minDefined && (!(0, _type.isDefined)(wholeRange.endValue) || visualRange.startValue < wholeRange.endValue);
            maxDefined = maxDefined && (!(0, _type.isDefined)(wholeRange.startValue) || visualRange.endValue > wholeRange.startValue)
        }
        var minVisible = minDefined ? visualRange.startValue : result.minVisible;
        var maxVisible = maxDefined ? visualRange.endValue : result.maxVisible;
        if (!isDiscrete) {
            var _wholeRange$startValu, _wholeRange$endValue;
            result.min = null !== (_wholeRange$startValu = wholeRange.startValue) && void 0 !== _wholeRange$startValu ? _wholeRange$startValu : result.min;
            result.max = null !== (_wholeRange$endValue = wholeRange.endValue) && void 0 !== _wholeRange$endValue ? _wholeRange$endValue : result.max
        } else {
            var categoriesInfo = (0, _utils.getCategoriesInfo)(categories, wholeRange.startValue, wholeRange.endValue);
            categories = categoriesInfo.categories;
            result.categories = categories
        }
        var adjustedVisualRange = (0, _utils.adjustVisualRange)({
            axisType: options.type,
            dataType: options.dataType,
            base: options.logarithmBase
        }, {
            startValue: minDefined ? visualRange.startValue : void 0,
            endValue: maxDefined ? visualRange.endValue : void 0,
            length: visualRange.length
        }, {
            categories: categories,
            min: wholeRange.startValue,
            max: wholeRange.endValue
        }, {
            categories: categories,
            min: minVisible,
            max: maxVisible
        });
        result.minVisible = adjustedVisualRange.startValue;
        result.maxVisible = adjustedVisualRange.endValue;
        !(0, _type.isDefined)(result.min) && (result.min = result.minVisible);
        !(0, _type.isDefined)(result.max) && (result.max = result.maxVisible);
        result.addRange({});
        that._resolveLogarithmicOptionsForRange(result);
        return result
    },
    adjustRange: function(range) {
        range = range || {};
        var isDiscrete = this._options.type === _axes_constants.default.discrete;
        var isLogarithmic = this._options.type === _axes_constants.default.logarithmic;
        var disabledNegatives = false === this._options.allowNegatives;
        if (isLogarithmic) {
            range.startValue = disabledNegatives && range.startValue <= 0 ? null : range.startValue;
            range.endValue = disabledNegatives && range.endValue <= 0 ? null : range.endValue
        }
        if (!isDiscrete && (0, _type.isDefined)(range.startValue) && (0, _type.isDefined)(range.endValue) && range.startValue > range.endValue) {
            var tmp = range.endValue;
            range.endValue = range.startValue;
            range.startValue = tmp
        }
        return range
    },
    _getVisualRangeUpdateMode: function(viewport, newRange, oppositeValue) {
        var value = this._options.visualRangeUpdateMode;
        var translator = this._translator;
        var range = this._seriesData;
        if (this.isArgumentAxis) {
            if ([SHIFT, KEEP, RESET].indexOf(value) === -1) {
                if (range.axisType === _axes_constants.default.discrete) {
                    var categories = range.categories;
                    var newCategories = newRange.categories;
                    var visualRange = this.visualRange();
                    if (categories && newCategories && categories.length && newCategories.map(function(c) {
                            return c.valueOf()
                        }).join(",").indexOf(categories.map(function(c) {
                            return c.valueOf()
                        }).join(",")) !== -1 && (visualRange.startValue.valueOf() !== categories[0].valueOf() || visualRange.endValue.valueOf() !== categories[categories.length - 1].valueOf())) {
                        value = KEEP
                    } else {
                        value = RESET
                    }
                } else {
                    var minPoint = translator.translate(range.min);
                    var minVisiblePoint = translator.translate(viewport.startValue);
                    var maxPoint = translator.translate(range.max);
                    var maxVisiblePoint = translator.translate(viewport.endValue);
                    if (minPoint === minVisiblePoint && maxPoint === maxVisiblePoint) {
                        value = RESET
                    } else {
                        if (minPoint !== minVisiblePoint && maxPoint === maxVisiblePoint) {
                            value = SHIFT
                        } else {
                            value = KEEP
                        }
                    }
                }
            }
        } else {
            if ([KEEP, RESET].indexOf(value) === -1) {
                if (oppositeValue === KEEP) {
                    value = KEEP
                } else {
                    value = RESET
                }
            }
        }
        return value
    },
    _handleBusinessRangeChanged: function(oppositeVisualRangeUpdateMode, axisReinitialized, newRange) {
        var that = this;
        var visualRange = this.visualRange();
        if (axisReinitialized || that._translator.getBusinessRange().isEmpty()) {
            return
        }
        var visualRangeUpdateMode = that._lastVisualRangeUpdateMode = that._getVisualRangeUpdateMode(visualRange, newRange, oppositeVisualRangeUpdateMode);
        if (!that.isArgumentAxis) {
            var viewport = that.getViewport();
            if (!(0, _type.isDefined)(viewport.startValue) && !(0, _type.isDefined)(viewport.endValue) && !(0, _type.isDefined)(viewport.length)) {
                visualRangeUpdateMode = RESET
            }
        }
        that._prevDataWasEmpty && (visualRangeUpdateMode = KEEP);
        if (visualRangeUpdateMode === KEEP) {
            that._setVisualRange([visualRange.startValue, visualRange.endValue])
        }
        if (visualRangeUpdateMode === RESET) {
            that._setVisualRange([null, null])
        }
        if (visualRangeUpdateMode === SHIFT) {
            that._setVisualRange({
                length: that.getVisualRangeLength()
            })
        }
    },
    getVisualRangeLength: function(range) {
        var currentBusinessRange = range || this._translator.getBusinessRange();
        var type = this._options.type;
        var length;
        if (type === _axes_constants.default.logarithmic) {
            length = (0, _math2.adjust)(this.calculateInterval(currentBusinessRange.maxVisible, currentBusinessRange.minVisible))
        } else {
            if (type === _axes_constants.default.discrete) {
                var categoriesInfo = (0, _utils.getCategoriesInfo)(currentBusinessRange.categories, currentBusinessRange.minVisible, currentBusinessRange.maxVisible);
                length = categoriesInfo.categories.length
            } else {
                length = currentBusinessRange.maxVisible - currentBusinessRange.minVisible
            }
        }
        return length
    },
    getVisualRangeCenter: function(range) {
        var businessRange = this._translator.getBusinessRange();
        var currentBusinessRange = range || businessRange;
        var _this$_options = this._options,
            type = _this$_options.type,
            logarithmBase = _this$_options.logarithmBase;
        var center;
        if (!(0, _type.isDefined)(currentBusinessRange.minVisible) || !(0, _type.isDefined)(currentBusinessRange.maxVisible)) {
            return
        }
        if (type === _axes_constants.default.logarithmic) {
            var allowNegatives = currentBusinessRange.allowNegatives,
                linearThreshold = currentBusinessRange.linearThreshold,
                minVisible = currentBusinessRange.minVisible,
                maxVisible = currentBusinessRange.maxVisible;
            center = (0, _utils.raiseToExt)((0, _math2.adjust)((0, _utils.getLogExt)(maxVisible, logarithmBase, allowNegatives, linearThreshold) + (0, _utils.getLogExt)(minVisible, logarithmBase, allowNegatives, linearThreshold)) / 2, logarithmBase, allowNegatives, linearThreshold)
        } else {
            if (type === _axes_constants.default.discrete) {
                var categoriesInfo = (0, _utils.getCategoriesInfo)(currentBusinessRange.categories, currentBusinessRange.minVisible, currentBusinessRange.maxVisible);
                var index = Math.ceil(categoriesInfo.categories.length / 2) - 1;
                center = businessRange.categories.indexOf(categoriesInfo.categories[index])
            } else {
                center = (currentBusinessRange.maxVisible.valueOf() + currentBusinessRange.minVisible.valueOf()) / 2
            }
        }
        return center
    },
    setBusinessRange: function(range, axisReinitialized, oppositeVisualRangeUpdateMode, argCategories) {
        var _that$_seriesData$min, _that$_seriesData$max;
        var that = this;
        var options = that._options;
        var isDiscrete = options.type === _axes_constants.default.discrete;
        that._handleBusinessRangeChanged(oppositeVisualRangeUpdateMode, axisReinitialized, range);
        that._seriesData = new _range.Range(range);
        var dataIsEmpty = that._seriesData.isEmpty();
        that._prevDataWasEmpty = dataIsEmpty;
        that._seriesData.addRange({
            categories: options.categories,
            dataType: options.dataType,
            axisType: options.type,
            base: options.logarithmBase,
            invert: options.inverted
        });
        that._resolveLogarithmicOptionsForRange(that._seriesData);
        if (!isDiscrete) {
            if (!(0, _type.isDefined)(that._seriesData.min) && !(0, _type.isDefined)(that._seriesData.max)) {
                var visualRange = that.getViewport();
                visualRange && that._seriesData.addRange({
                    min: visualRange.startValue,
                    max: visualRange.endValue
                })
            }
            var synchronizedValue = options.synchronizedValue;
            if ((0, _type.isDefined)(synchronizedValue)) {
                that._seriesData.addRange({
                    min: synchronizedValue,
                    max: synchronizedValue
                })
            }
        }
        that._seriesData.minVisible = null !== (_that$_seriesData$min = that._seriesData.minVisible) && void 0 !== _that$_seriesData$min ? _that$_seriesData$min : that._seriesData.min;
        that._seriesData.maxVisible = null !== (_that$_seriesData$max = that._seriesData.maxVisible) && void 0 !== _that$_seriesData$max ? _that$_seriesData$max : that._seriesData.max;
        if (!that.isArgumentAxis && options.showZero) {
            that._seriesData.correctValueZeroLevel()
        }
        that._seriesData.sortCategories(that.getCategoriesSorter(argCategories));
        that._seriesData.userBreaks = that._seriesData.isEmpty() ? [] : that._getScaleBreaks(options, that._seriesData, that._series, that.isArgumentAxis);
        that._translator.updateBusinessRange(that._getViewportRange())
    },
    _addConstantLinesToRange: function(dataRange, minValueField, maxValueField) {
        this._outsideConstantLines.concat(this._insideConstantLines || []).forEach(function(cl) {
            if (cl.options.extendAxis) {
                var _dataRange$addRange;
                var value = cl.getParsedValue();
                dataRange.addRange((_dataRange$addRange = {}, _defineProperty(_dataRange$addRange, minValueField, value), _defineProperty(_dataRange$addRange, maxValueField, value), _dataRange$addRange))
            }
        })
    },
    setGroupSeries: function(series) {
        this._series = series
    },
    getLabelsPosition: function() {
        var that = this;
        var options = that._options;
        var position = options.position;
        var labelShift = options.label.indentFromAxis + (that._axisShift || 0) + that._constantLabelOffset;
        var axisPosition = that._axisPosition;
        return position === TOP || position === LEFT ? axisPosition - labelShift : axisPosition + labelShift
    },
    getFormattedValue: function(value, options, point) {
        var labelOptions = this._options.label;
        return (0, _type.isDefined)(value) ? this.formatLabel(value, (0, _extend.extend)(true, {}, labelOptions, options), void 0, point) : null
    },
    _getBoundaryTicks: function(majors, viewPort) {
        var that = this;
        var length = majors.length;
        var options = that._options;
        var customBounds = options.customBoundTicks;
        var min = viewPort.minVisible;
        var max = viewPort.maxVisible;
        var addMinMax = options.showCustomBoundaryTicks ? that._boundaryTicksVisibility : {};
        var boundaryTicks = [];
        if (options.type === _axes_constants.default.discrete) {
            if (that._tickOffset && 0 !== majors.length) {
                boundaryTicks = [majors[0], majors[majors.length - 1]]
            }
        } else {
            if (customBounds) {
                if (addMinMax.min && (0, _type.isDefined)(customBounds[0])) {
                    boundaryTicks.push(customBounds[0])
                }
                if (addMinMax.max && (0, _type.isDefined)(customBounds[1])) {
                    boundaryTicks.push(customBounds[1])
                }
            } else {
                if (addMinMax.min && (0 === length || majors[0] > min)) {
                    boundaryTicks.push(min)
                }
                if (addMinMax.max && (0 === length || majors[length - 1] < max)) {
                    boundaryTicks.push(max)
                }
            }
        }
        return boundaryTicks
    },
    setPercentLabelFormat: function() {
        if (!this._hasLabelFormat) {
            this._options.label.format = "percent"
        }
    },
    resetAutoLabelFormat: function() {
        if (!this._hasLabelFormat) {
            delete this._options.label.format
        }
    },
    getMultipleAxesSpacing: function() {
        return this._options.multipleAxesSpacing || 0
    },
    getTicksValues: function() {
        return {
            majorTicksValues: convertTicksToValues(this._majorTicks),
            minorTicksValues: convertTicksToValues(this._minorTicks)
        }
    },
    estimateTickInterval: function(canvas) {
        var that = this;
        that.updateCanvas(canvas);
        return that._tickInterval !== that._getTicks(that._getViewportRange(), _common.noop, true).tickInterval
    },
    setTicks: function(ticks) {
        var majors = ticks.majorTicks || [];
        this._majorTicks = majors.map(createMajorTick(this, this._renderer, this._getSkippedCategory(majors)));
        this._minorTicks = (ticks.minorTicks || []).map(createMinorTick(this, this._renderer));
        this._isSynchronized = true
    },
    _adjustDivisionFactor: function(val) {
        return val
    },
    _getTicks: function(viewPort, incidentOccurred, skipTickGeneration) {
        var that = this;
        var options = that._options;
        var customTicks = options.customTicks;
        var customMinorTicks = options.customMinorTicks;
        return getTickGenerator(options, incidentOccurred || that._incidentOccurred, skipTickGeneration, that._translator.getBusinessRange().isEmpty(), that._adjustDivisionFactor.bind(that), viewPort)({
            min: viewPort.minVisible,
            max: viewPort.maxVisible,
            categories: viewPort.categories,
            isSpacedMargin: viewPort.isSpacedMargin
        }, that._getScreenDelta(), options.tickInterval, "ignore" === options.label.overlappingBehavior || options.forceUserTickInterval, {
            majors: customTicks,
            minors: customMinorTicks
        }, options.minorTickInterval, options.minorTickCount, that._initialBreaks)
    },
    _createTicksAndLabelFormat: function(range, incidentOccurred) {
        var options = this._options;
        var ticks = this._getTicks(range, incidentOccurred, false);
        if (!range.isEmpty() && options.type === _axes_constants.default.discrete && "datetime" === options.dataType && !this._hasLabelFormat && ticks.ticks.length) {
            options.label.format = _format_helper.default.getDateFormatByTicks(ticks.ticks)
        }
        return ticks
    },
    getAggregationInfo: function(useAllAggregatedPoints, range) {
        var _visualRange$startVal, _visualRange$endValue, _that$_seriesData;
        var that = this;
        var options = that._options;
        var marginOptions = that._marginOptions;
        var businessRange = new _range.Range(that.getTranslator().getBusinessRange()).addRange(range);
        var visualRange = that.getViewport();
        var minVisible = null !== (_visualRange$startVal = null === visualRange || void 0 === visualRange ? void 0 : visualRange.startValue) && void 0 !== _visualRange$startVal ? _visualRange$startVal : businessRange.minVisible;
        var maxVisible = null !== (_visualRange$endValue = null === visualRange || void 0 === visualRange ? void 0 : visualRange.endValue) && void 0 !== _visualRange$endValue ? _visualRange$endValue : businessRange.maxVisible;
        var ticks = [];
        if (options.type === _axes_constants.default.discrete && options.aggregateByCategory) {
            return {
                aggregateByCategory: true
            }
        }
        var aggregationInterval = options.aggregationInterval;
        var aggregationGroupWidth = options.aggregationGroupWidth;
        if (!aggregationGroupWidth && marginOptions) {
            if (marginOptions.checkInterval) {
                aggregationGroupWidth = options.axisDivisionFactor
            }
            if (marginOptions.sizePointNormalState) {
                aggregationGroupWidth = Math.min(marginOptions.sizePointNormalState, options.axisDivisionFactor)
            }
        }
        var minInterval = !options.aggregationGroupWidth && !aggregationInterval && range.interval;
        var generateTicks = configureGenerator(options, aggregationGroupWidth, businessRange, that._getScreenDelta(), minInterval);
        var tickInterval = generateTicks(aggregationInterval, true, minVisible, maxVisible, null === (_that$_seriesData = that._seriesData) || void 0 === _that$_seriesData ? void 0 : _that$_seriesData.breaks).tickInterval;
        if (options.type !== _axes_constants.default.discrete) {
            var min = useAllAggregatedPoints ? businessRange.min : minVisible;
            var max = useAllAggregatedPoints ? businessRange.max : maxVisible;
            if ((0, _type.isDefined)(min) && (0, _type.isDefined)(max)) {
                var add = (0, _utils.getAddFunction)({
                    base: options.logarithmBase,
                    axisType: options.type,
                    dataType: options.dataType
                }, false);
                var start = min;
                var end = max;
                if (!useAllAggregatedPoints) {
                    var maxMinDistance = Math.max(that.calculateInterval(max, min), "datetime" === options.dataType ? _date.default.dateToMilliseconds(tickInterval) : tickInterval);
                    start = add(min, maxMinDistance, -1);
                    end = add(max, maxMinDistance)
                }
                start = start < businessRange.min ? businessRange.min : start;
                end = end > businessRange.max ? businessRange.max : end;
                var breaks = that._getScaleBreaks(options, {
                    minVisible: start,
                    maxVisible: end
                }, that._series, that.isArgumentAxis);
                var filteredBreaks = that._filterBreaks(breaks, {
                    minVisible: start,
                    maxVisible: end
                }, options.breakStyle);
                ticks = generateTicks(tickInterval, false, start, end, filteredBreaks).ticks
            }
        }
        that._aggregationInterval = tickInterval;
        return {
            interval: tickInterval,
            ticks: ticks
        }
    },
    createTicks: function(canvas) {
        var that = this;
        var renderer = that._renderer;
        var options = that._options;
        if (!canvas) {
            return
        }
        that._isSynchronized = false;
        that.updateCanvas(canvas);
        var range = that._getViewportRange();
        that._initialBreaks = range.breaks = this._seriesData.breaks = that._filterBreaks(this._seriesData.userBreaks, range, options.breakStyle);
        that._estimatedTickInterval = that._getTicks(that.adjustViewport(this._seriesData), _common.noop, true).tickInterval;
        var margins = this._calculateValueMargins();
        range.addRange({
            minVisible: margins.minValue,
            maxVisible: margins.maxValue,
            isSpacedMargin: margins.isSpacedMargin
        });
        var ticks = that._createTicksAndLabelFormat(range);
        var boundaryTicks = that._getBoundaryTicks(ticks.ticks, that._getViewportRange());
        if (options.showCustomBoundaryTicks && boundaryTicks.length) {
            that._boundaryTicks = [boundaryTicks[0]].map(createBoundaryTick(that, renderer, true));
            if (boundaryTicks.length > 1) {
                that._boundaryTicks = that._boundaryTicks.concat([boundaryTicks[1]].map(createBoundaryTick(that, renderer, false)))
            }
        } else {
            that._boundaryTicks = []
        }
        var minors = (ticks.minorTicks || []).filter(function(minor) {
            return !boundaryTicks.some(function(boundary) {
                return (0, _utils.valueOf)(boundary) === (0, _utils.valueOf)(minor)
            })
        });
        that._tickInterval = ticks.tickInterval;
        that._minorTickInterval = ticks.minorTickInterval;
        var oldMajorTicks = that._majorTicks || [];
        var majorTicksByValues = oldMajorTicks.reduce(function(r, t) {
            r[t.value.valueOf()] = t;
            return r
        }, {});
        var sameType = (0, _type.type)(ticks.ticks[0]) === (0, _type.type)(oldMajorTicks[0] && oldMajorTicks[0].value);
        var skippedCategory = that._getSkippedCategory(ticks.ticks);
        var majorTicks = ticks.ticks.map(function(v) {
            var tick = majorTicksByValues[v.valueOf()];
            if (tick && sameType) {
                delete majorTicksByValues[v.valueOf()];
                tick.setSkippedCategory(skippedCategory);
                return tick
            } else {
                return createMajorTick(that, renderer, skippedCategory)(v)
            }
        });
        that._majorTicks = majorTicks;
        var oldMinorTicks = that._minorTicks || [];
        that._minorTicks = minors.map(function(v, i) {
            var minorTick = oldMinorTicks[i];
            if (minorTick) {
                minorTick.updateValue(v);
                return minorTick
            }
            return createMinorTick(that, renderer)(v)
        });
        that._ticksToRemove = Object.keys(majorTicksByValues).map(function(k) {
            return majorTicksByValues[k]
        }).concat(oldMinorTicks.slice(that._minorTicks.length, oldMinorTicks.length));
        that._ticksToRemove.forEach(function(t) {
            var _t$label;
            return null === (_t$label = t.label) || void 0 === _t$label ? void 0 : _t$label.removeTitle()
        });
        if (ticks.breaks) {
            that._seriesData.breaks = ticks.breaks
        }
        that._reinitTranslator(that._getViewportRange())
    },
    _reinitTranslator: function(range) {
        var that = this;
        var translator = that._translator;
        if (that._isSynchronized) {
            return
        }
        translator.updateBusinessRange(range)
    },
    _getViewportRange: function() {
        return this.adjustViewport(this._seriesData)
    },
    setMarginOptions: function(options) {
        this._marginOptions = options
    },
    getMarginOptions: function() {
        var _this$_marginOptions;
        return null !== (_this$_marginOptions = this._marginOptions) && void 0 !== _this$_marginOptions ? _this$_marginOptions : {}
    },
    _calculateRangeInterval: function(interval) {
        var isDateTime = "datetime" === this._options.dataType;
        var minArgs = [];
        var addToArgs = function(value) {
            (0, _type.isDefined)(value) && minArgs.push(isDateTime ? _date.default.dateToMilliseconds(value) : value)
        };
        addToArgs(this._tickInterval);
        addToArgs(this._estimatedTickInterval);
        (0, _type.isDefined)(interval) && minArgs.push(interval);
        addToArgs(this._aggregationInterval);
        return this._calculateWorkWeekInterval(_min.apply(this, minArgs))
    },
    _calculateWorkWeekInterval: function(businessInterval) {
        var options = this._options;
        if ("datetime" === options.dataType && options.workdaysOnly && businessInterval) {
            var workWeek = options.workWeek.length * dateIntervals.day;
            var weekend = dateIntervals.week - workWeek;
            if (workWeek !== businessInterval && weekend < businessInterval) {
                var weekendsCount = Math.ceil(businessInterval / dateIntervals.week);
                businessInterval = weekend >= businessInterval ? dateIntervals.day : businessInterval - weekend * weekendsCount
            } else {
                if (weekend >= businessInterval && businessInterval > dateIntervals.day) {
                    businessInterval = dateIntervals.day
                }
            }
        }
        return businessInterval
    },
    _getConvertIntervalCoefficient: function(intervalInPx, screenDelta) {
        var ratioOfCanvasRange = this._translator.ratioOfCanvasRange();
        return ratioOfCanvasRange / (ratioOfCanvasRange * screenDelta / (intervalInPx + screenDelta))
    },
    _calculateValueMargins: function(ticks) {
        this._resetMargins();
        var that = this;
        var margins = that.getMarginOptions();
        var marginSize = (margins.size || 0) / 2;
        var options = that._options;
        var dataRange = that._getViewportRange();
        var viewPort = that.getViewport();
        var screenDelta = that._getScreenDelta();
        var isDiscrete = (options.type || "").indexOf(_axes_constants.default.discrete) !== -1;
        var valueMarginsEnabled = options.valueMarginsEnabled && !isDiscrete && !that.customPositionIsBoundaryOrthogonalAxis();
        var translator = that._translator;
        var minValueMargin = options.minValueMargin;
        var maxValueMargin = options.maxValueMargin;
        var minPadding = 0;
        var maxPadding = 0;
        var interval = 0;
        var rangeInterval;
        if (dataRange.stubData || !screenDelta) {
            return {
                startPadding: 0,
                endPadding: 0
            }
        }
        if (that.isArgumentAxis && margins.checkInterval) {
            rangeInterval = that._calculateRangeInterval(dataRange.interval);
            var pxInterval = translator.getInterval(rangeInterval);
            if (isFinite(pxInterval)) {
                interval = Math.ceil(pxInterval / (2 * that._getConvertIntervalCoefficient(pxInterval, screenDelta)))
            } else {
                rangeInterval = 0
            }
        }
        var minPercentPadding;
        var maxPercentPadding;
        var maxPaddingValue = screenDelta * MAX_MARGIN_VALUE / 2;
        if (valueMarginsEnabled) {
            if ((0, _type.isDefined)(minValueMargin)) {
                minPercentPadding = isFinite(minValueMargin) ? minValueMargin : 0
            } else {
                if (!that.isArgumentAxis && margins.checkInterval && (0, _utils.valueOf)(dataRange.minVisible) > 0 && (0, _utils.valueOf)(dataRange.minVisible) === (0, _utils.valueOf)(dataRange.min)) {
                    minPadding = MIN_BAR_MARGIN
                } else {
                    minPadding = Math.max(marginSize, interval);
                    minPadding = Math.min(maxPaddingValue, minPadding)
                }
            }
            if ((0, _type.isDefined)(maxValueMargin)) {
                maxPercentPadding = isFinite(maxValueMargin) ? maxValueMargin : 0
            } else {
                if (!that.isArgumentAxis && margins.checkInterval && (0, _utils.valueOf)(dataRange.maxVisible) < 0 && (0, _utils.valueOf)(dataRange.maxVisible) === (0, _utils.valueOf)(dataRange.max)) {
                    maxPadding = MIN_BAR_MARGIN
                } else {
                    maxPadding = Math.max(marginSize, interval);
                    maxPadding = Math.min(maxPaddingValue, maxPadding)
                }
            }
        }
        var percentStick = margins.percentStick && !this.isArgumentAxis;
        if (percentStick) {
            if (1 === _abs(dataRange.max)) {
                maxPadding = 0
            }
            if (1 === _abs(dataRange.min)) {
                minPadding = 0
            }
        }
        var canvasStartEnd = that._getCanvasStartEnd();
        var commonMargin = 1 + (minPercentPadding || 0) + (maxPercentPadding || 0);
        var screenDeltaWithMargins = (screenDelta - minPadding - maxPadding) / commonMargin || screenDelta;
        if (void 0 !== minPercentPadding || void 0 !== maxPercentPadding) {
            if (void 0 !== minPercentPadding) {
                minPadding = screenDeltaWithMargins * minPercentPadding
            }
            if (void 0 !== maxPercentPadding) {
                maxPadding = screenDeltaWithMargins * maxPercentPadding
            }
        }
        var minValue;
        var maxValue;
        if (options.type !== _axes_constants.default.discrete && ticks && ticks.length > 1 && !options.skipViewportExtending && !viewPort.action && false !== options.endOnTick) {
            var length = ticks.length;
            var firstTickPosition = translator.translate(ticks[0].value);
            var lastTickPosition = translator.translate(ticks[length - 1].value);
            var invertMultiplier = firstTickPosition > lastTickPosition ? -1 : 1;
            var minTickPadding = _max(invertMultiplier * (canvasStartEnd.start - firstTickPosition), 0);
            var maxTickPadding = _max(invertMultiplier * (lastTickPosition - canvasStartEnd.end), 0);
            if (minTickPadding > minPadding || maxTickPadding > maxPadding) {
                var commonPadding = maxTickPadding + minTickPadding;
                var coeff = that._getConvertIntervalCoefficient(commonPadding, screenDelta);
                if (minTickPadding >= minPadding) {
                    minValue = ticks[0].value
                }
                if (maxTickPadding >= maxPadding) {
                    maxValue = ticks[length - 1].value
                }
                minPadding = _max(minTickPadding, minPadding) / coeff;
                maxPadding = _max(maxTickPadding, maxPadding) / coeff
            }
        }
        minPercentPadding = void 0 === minPercentPadding ? minPadding / screenDeltaWithMargins : minPercentPadding;
        maxPercentPadding = void 0 === maxPercentPadding ? maxPadding / screenDeltaWithMargins : maxPercentPadding;
        if (!isDiscrete) {
            if (this._translator.isInverted()) {
                var _minValue, _maxValue;
                minValue = null !== (_minValue = minValue) && void 0 !== _minValue ? _minValue : translator.from(canvasStartEnd.start + screenDelta * minPercentPadding, -1);
                maxValue = null !== (_maxValue = maxValue) && void 0 !== _maxValue ? _maxValue : translator.from(canvasStartEnd.end - screenDelta * maxPercentPadding, 1)
            } else {
                var _minValue2, _maxValue2;
                minValue = null !== (_minValue2 = minValue) && void 0 !== _minValue2 ? _minValue2 : translator.from(canvasStartEnd.start - screenDelta * minPercentPadding, -1);
                maxValue = null !== (_maxValue2 = maxValue) && void 0 !== _maxValue2 ? _maxValue2 : translator.from(canvasStartEnd.end + screenDelta * maxPercentPadding, 1)
            }
        }
        var _that$getCorrectedVal = that.getCorrectedValuesToZero(minValue, maxValue),
            correctedMin = _that$getCorrectedVal.correctedMin,
            correctedMax = _that$getCorrectedVal.correctedMax,
            start = _that$getCorrectedVal.start,
            end = _that$getCorrectedVal.end;
        minPadding = null !== start && void 0 !== start ? start : minPadding;
        maxPadding = null !== end && void 0 !== end ? end : maxPadding;
        return {
            startPadding: translator.isInverted() ? maxPadding : minPadding,
            endPadding: translator.isInverted() ? minPadding : maxPadding,
            minValue: null !== correctedMin && void 0 !== correctedMin ? correctedMin : minValue,
            maxValue: null !== correctedMax && void 0 !== correctedMax ? correctedMax : maxValue,
            interval: rangeInterval,
            isSpacedMargin: minPadding === maxPadding && 0 !== minPadding
        }
    },
    getCorrectedValuesToZero: function(minValue, maxValue) {
        var that = this;
        var translator = that._translator;
        var canvasStartEnd = that._getCanvasStartEnd();
        var dataRange = that._getViewportRange();
        var screenDelta = that._getScreenDelta();
        var options = that._options;
        var start;
        var end;
        var correctedMin;
        var correctedMax;
        var correctZeroLevel = function(minPoint, maxPoint) {
            var minExpectedPadding = _abs(canvasStartEnd.start - minPoint);
            var maxExpectedPadding = _abs(canvasStartEnd.end - maxPoint);
            var coeff = that._getConvertIntervalCoefficient(minExpectedPadding + maxExpectedPadding, screenDelta);
            start = minExpectedPadding / coeff;
            end = maxExpectedPadding / coeff
        };
        if (!that.isArgumentAxis && "datetime" !== options.dataType) {
            if (minValue * dataRange.min <= 0 && minValue * dataRange.minVisible <= 0) {
                correctZeroLevel(translator.translate(0), translator.translate(maxValue));
                correctedMin = 0
            }
            if (maxValue * dataRange.max <= 0 && maxValue * dataRange.maxVisible <= 0) {
                correctZeroLevel(translator.translate(minValue), translator.translate(0));
                correctedMax = 0
            }
        }
        return {
            start: isFinite(start) ? start : null,
            end: isFinite(end) ? end : null,
            correctedMin: correctedMin,
            correctedMax: correctedMax
        }
    },
    applyMargins: function() {
        if (this._isSynchronized) {
            return
        }
        var margins = this._calculateValueMargins(this._majorTicks);
        var canvas = (0, _extend.extend)({}, this._canvas, {
            startPadding: margins.startPadding,
            endPadding: margins.endPadding
        });
        this._translator.updateCanvas(this._processCanvas(canvas));
        if (isFinite(margins.interval)) {
            var br = this._translator.getBusinessRange();
            br.addRange({
                interval: margins.interval
            });
            this._translator.updateBusinessRange(br)
        }
    },
    _resetMargins: function() {
        this._reinitTranslator(this._getViewportRange());
        if (this._canvas) {
            this._translator.updateCanvas(this._processCanvas(this._canvas))
        }
    },
    _createConstantLines: function() {
        var _this2 = this;
        var constantLines = (this._options.constantLines || []).map(function(o) {
            return (0, _constant_line.default)(_this2, o)
        });
        this._outsideConstantLines = constantLines.filter(function(l) {
            return "outside" === l.labelPosition
        });
        this._insideConstantLines = constantLines.filter(function(l) {
            return "inside" === l.labelPosition
        })
    },
    draw: function(canvas, borderOptions) {
        var that = this;
        var options = this._options;
        that.borderOptions = borderOptions || {
            visible: false
        };
        that._resetMargins();
        that.createTicks(canvas);
        that.applyMargins();
        that._clearAxisGroups();
        initTickCoords(that._majorTicks);
        initTickCoords(that._minorTicks);
        initTickCoords(that._boundaryTicks);
        that._axisGroup.append(that._axesContainerGroup);
        that._drawAxis();
        that._drawTitle();
        drawTickMarks(that._majorTicks, options.tick);
        drawTickMarks(that._minorTicks, options.minorTick);
        drawTickMarks(that._boundaryTicks, options.tick);
        var drawGridLine = that._getGridLineDrawer();
        drawGrids(that._majorTicks, drawGridLine);
        drawGrids(that._minorTicks, drawGridLine);
        callAction(that._majorTicks, "drawLabel", that._getViewportRange(), that._getTemplate());
        that._templatesRendered && that._templatesRendered.reject();
        that._templatesRendered = new _deferred.Deferred;
        _deferred.when.apply(this, that._majorTicks.map(function(tick) {
            return tick.getTemplateDeferred()
        })).done(function() {
            that._templatesRendered.resolve()
        });
        that._majorTicks.forEach(function(tick) {
            tick.labelRotationAngle = 0;
            tick.labelAlignment = void 0;
            tick.labelOffset = 0
        });
        callAction(that._outsideConstantLines.concat(that._insideConstantLines), "draw");
        callAction(that._strips, "draw");
        that._dateMarkers = that._drawDateMarkers() || [];
        that._labelAxesGroup && that._axisStripLabelGroup.append(that._labelAxesGroup);
        that._gridContainerGroup && that._axisGridGroup.append(that._gridContainerGroup);
        that._stripsGroup && that._axisStripGroup.append(that._stripsGroup);
        if (that._constantLinesGroup) {
            that._axisConstantLineGroups.above.inside.append(that._constantLinesGroup.above);
            that._axisConstantLineGroups.above.outside1.append(that._constantLinesGroup.above);
            that._axisConstantLineGroups.above.outside2.append(that._constantLinesGroup.above);
            that._axisConstantLineGroups.under.inside.append(that._constantLinesGroup.under);
            that._axisConstantLineGroups.under.outside1.append(that._constantLinesGroup.under);
            that._axisConstantLineGroups.under.outside2.append(that._constantLinesGroup.under)
        }
        that._measureTitle();
        measureLabels(that._majorTicks);
        !options.label.template && that._applyWordWrap();
        measureLabels(that._outsideConstantLines);
        measureLabels(that._insideConstantLines);
        measureLabels(that._strips);
        measureLabels(that._dateMarkers);
        that._adjustConstantLineLabels(that._insideConstantLines);
        that._adjustStripLabels();
        var offset = that._constantLabelOffset = that._adjustConstantLineLabels(that._outsideConstantLines);
        if (!that._translator.getBusinessRange().isEmpty()) {
            that._setLabelsPlacement();
            offset = that._adjustLabels(offset)
        }
        offset = that._adjustDateMarkers(offset);
        that._adjustTitle(offset)
    },
    getTemplatesDef: function() {
        return this._templatesRendered
    },
    setRenderedState: function(state) {
        this._drawn = state
    },
    isRendered: function() {
        return this._drawn
    },
    _applyWordWrap: function() {
        var that = this;
        var convertedTickInterval;
        var textWidth;
        var textHeight;
        var options = this._options;
        var tickInterval = that._tickInterval;
        if ((0, _type.isDefined)(tickInterval)) {
            convertedTickInterval = that.getTranslator().getInterval("datetime" === options.dataType ? _date.default.dateToMilliseconds(tickInterval) : tickInterval)
        }
        var displayMode = that._validateDisplayMode(options.label.displayMode);
        var overlappingMode = that._validateOverlappingMode(options.label.overlappingBehavior, displayMode);
        var wordWrapMode = options.label.wordWrap || "none";
        var overflowMode = options.label.textOverflow || "none";
        if (("none" !== wordWrapMode || "none" !== overflowMode) && displayMode !== ROTATE && overlappingMode !== ROTATE && "auto" !== overlappingMode) {
            var usefulSpace = (0, _type.isDefined)(options.placeholderSize) ? options.placeholderSize - options.label.indentFromAxis : void 0;
            if (that._isHorizontal) {
                textWidth = convertedTickInterval;
                textHeight = usefulSpace
            } else {
                textWidth = usefulSpace;
                textHeight = convertedTickInterval
            }
            var correctByWidth = false;
            var correctByHeight = false;
            if (textWidth) {
                if (that._majorTicks.some(function(tick) {
                        return tick.labelBBox.width > textWidth
                    })) {
                    correctByWidth = true
                }
            }
            if (textHeight) {
                if (that._majorTicks.some(function(tick) {
                        return tick.labelBBox.height > textHeight
                    })) {
                    correctByHeight = true
                }
            }
            if (correctByWidth || correctByHeight) {
                that._majorTicks.forEach(function(tick) {
                    tick.label && tick.label.setMaxSize(textWidth, textHeight, options.label)
                });
                measureLabels(that._majorTicks)
            }
        }
    },
    _measureTitle: _common.noop,
    animate: function() {
        callAction(this._majorTicks, "animateLabels")
    },
    updateSize: function(canvas, animate) {
        var updateTitle = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : true;
        var that = this;
        that.updateCanvas(canvas);
        if (updateTitle) {
            that._checkTitleOverflow();
            that._measureTitle();
            that._updateTitleCoords()
        }
        that._reinitTranslator(that._getViewportRange());
        that.applyMargins();
        var animationEnabled = !that._firstDrawing && animate;
        var options = this._options;
        initTickCoords(that._majorTicks);
        initTickCoords(that._minorTicks);
        initTickCoords(that._boundaryTicks);
        if (this._resetApplyingAnimation && !this._firstDrawing) {
            that._resetStartCoordinates()
        }
        cleanUpInvalidTicks(that._majorTicks);
        cleanUpInvalidTicks(that._minorTicks);
        cleanUpInvalidTicks(that._boundaryTicks);
        if (this._axisElement) {
            that._updateAxisElementPosition()
        }
        updateTicksPosition(that._majorTicks, options.tick, animationEnabled);
        updateTicksPosition(that._minorTicks, options.minorTick, animationEnabled);
        updateTicksPosition(that._boundaryTicks, options.tick);
        callAction(that._majorTicks, "updateLabelPosition", animationEnabled);
        that._outsideConstantLines.concat(that._insideConstantLines || []).forEach(function(l) {
            return l.updatePosition(animationEnabled)
        });
        callAction(that._strips, "updatePosition", animationEnabled);
        updateGridsPosition(that._majorTicks, animationEnabled);
        updateGridsPosition(that._minorTicks, animationEnabled);
        if (animationEnabled) {
            callAction(that._ticksToRemove || [], "fadeOutElements")
        }
        that.prepareAnimation();
        that._ticksToRemove = null;
        if (!that._translator.getBusinessRange().isEmpty()) {
            that._firstDrawing = false
        }
        this._resetApplyingAnimation = false
    },
    prepareAnimation: function() {
        var that = this;
        var action = "saveCoords";
        callAction(that._majorTicks, action);
        callAction(that._minorTicks, action);
        callAction(that._insideConstantLines, action);
        callAction(that._outsideConstantLines, action);
        callAction(that._strips, action)
    },
    _resetStartCoordinates: function() {
        var that = this;
        var action = "resetCoordinates";
        callAction(that._majorTicks, action);
        callAction(that._minorTicks, action);
        callAction(that._insideConstantLines, action);
        callAction(that._outsideConstantLines, action);
        callAction(that._strips, action)
    },
    applyClipRects: function(elementsClipID, canvasClipID) {
        this._axisGroup.attr({
            "clip-path": canvasClipID
        });
        this._axisStripGroup.attr({
            "clip-path": elementsClipID
        })
    },
    _validateVisualRange: function(optionValue) {
        var range = (0, _utils.getVizRangeObject)(optionValue);
        if (void 0 !== range.startValue) {
            range.startValue = this.validateUnit(range.startValue)
        }
        if (void 0 !== range.endValue) {
            range.endValue = this.validateUnit(range.endValue)
        }
        return (0, _utils.convertVisualRangeObject)(range, !_isArray(optionValue))
    },
    _validateOptions: function(options) {
        var that = this;
        options.wholeRange = that._validateVisualRange(options.wholeRange);
        options.visualRange = options._customVisualRange = that._validateVisualRange(options._customVisualRange);
        that._setVisualRange(options._customVisualRange);
    },
    beforeCleanGroups: function() {
        this._options.label.template && this._axisElementsGroup && this._axisElementsGroup.linkRemove()
    },
    afterCleanGroups: function() {
        this._options.label.template && this._axisElementsGroup && this._axisElementsGroup.linkAppend()
    },
    validate: function() {
        var that = this;
        var options = that._options;
        var dataType = that.isArgumentAxis ? options.argumentType : options.valueType;
        var parser = dataType ? (0, _parse_utils.getParser)(dataType) : function(unit) {
            return unit
        };
        that.parser = parser;
        options.dataType = dataType;
        that._validateOptions(options)
    },
    resetVisualRange: function(isSilent) {
        this._seriesData.minVisible = this._seriesData.min;
        this._seriesData.maxVisible = this._seriesData.max;
        this.handleZooming([null, null], {
            start: !!isSilent,
            end: !!isSilent
        })
    },
    _setVisualRange: function(visualRange, allowPartialUpdate) {
        var range = this.adjustRange((0, _utils.getVizRangeObject)(visualRange));
        if (allowPartialUpdate) {
            (0, _type.isDefined)(range.startValue) && (this._viewport.startValue = range.startValue);
            (0, _type.isDefined)(range.endValue) && (this._viewport.endValue = range.endValue)
        } else {
            this._viewport = range
        }
    },
    _applyZooming: function(visualRange, allowPartialUpdate) {
        var that = this;
        that._resetVisualRangeOption();
        that._setVisualRange(visualRange, allowPartialUpdate);
        var viewPort = that.getViewport();
        that._seriesData.userBreaks = that._getScaleBreaks(that._options, {
            minVisible: viewPort.startValue,
            maxVisible: viewPort.endValue
        }, that._series, that.isArgumentAxis);
        that._translator.updateBusinessRange(that._getViewportRange())
    },
    getZoomStartEventArg: function(event, actionType) {
        return {
            axis: this,
            range: this.visualRange(),
            cancel: false,
            event: event,
            actionType: actionType
        }
    },
    _getZoomEndEventArg: function(previousRange, event, actionType, zoomFactor, shift) {
        var newRange = this.visualRange();
        return {
            axis: this,
            previousRange: previousRange,
            range: newRange,
            cancel: false,
            event: event,
            actionType: actionType,
            zoomFactor: zoomFactor,
            shift: shift,
            rangeStart: newRange.startValue,
            rangeEnd: newRange.endValue
        }
    },
    getZoomBounds: function() {
        var wholeRange = (0, _utils.getVizRangeObject)(this._options.wholeRange);
        var range = this.getTranslator().getBusinessRange();
        var secondPriorityRange = {
            startValue: getZoomBoundValue(this._initRange.startValue, range.min),
            endValue: getZoomBoundValue(this._initRange.endValue, range.max)
        };
        return {
            startValue: getZoomBoundValue(wholeRange.startValue, secondPriorityRange.startValue),
            endValue: getZoomBoundValue(wholeRange.endValue, secondPriorityRange.endValue)
        }
    },
    setInitRange: function() {
        this._initRange = {};
        if (0 === Object.keys(this._options.wholeRange || {}).length) {
            this._initRange = this.getZoomBounds()
        }
    },
    _resetVisualRangeOption: function() {
        this._options._customVisualRange = {}
    },
    getTemplatesGroups: function() {
        var ticks = this._majorTicks;
        if (ticks) {
            return this._majorTicks.map(function(tick) {
                return tick.templateContainer
            }).filter(function(item) {
                return (0, _type.isDefined)(item)
            })
        } else {
            return []
        }
    },
    setCustomVisualRange: function(range) {
        this._options._customVisualRange = range
    },
    visualRange: function visualRange() {
        var that = this;
        var args = arguments;
        var visualRange;
        if (0 === args.length) {
            var adjustedRange = that._getAdjustedBusinessRange();
            var startValue = adjustedRange.minVisible;
            var endValue = adjustedRange.maxVisible;
            if (that._options.type === _axes_constants.default.discrete) {
                var _startValue, _endValue;
                startValue = null !== (_startValue = startValue) && void 0 !== _startValue ? _startValue : adjustedRange.categories[0];
                endValue = null !== (_endValue = endValue) && void 0 !== _endValue ? _endValue : adjustedRange.categories[adjustedRange.categories.length - 1];
                return {
                    startValue: startValue,
                    endValue: endValue,
                    categories: (0, _utils.getCategoriesInfo)(adjustedRange.categories, startValue, endValue).categories
                }
            }
            return {
                startValue: startValue,
                endValue: endValue
            }
        } else {
            if (_isArray(args[0])) {
                visualRange = args[0]
            } else {
                if ((0, _type.isPlainObject)(args[0])) {
                    visualRange = (0, _extend.extend)({}, args[0])
                } else {
                    visualRange = [args[0], args[1]]
                }
            }
        }
        var zoomResults = that.handleZooming(visualRange, args[1]);
        if (!zoomResults.isPrevented) {
            that._visualRange(that, zoomResults)
        }
    },
    handleZooming: function(visualRange, preventEvents, domEvent, action) {
        var that = this;
        preventEvents = preventEvents || {};
        if ((0, _type.isDefined)(visualRange)) {
            visualRange = that._validateVisualRange(visualRange);
            visualRange.action = action
        }
        var zoomStartEvent = that.getZoomStartEventArg(domEvent, action);
        var previousRange = zoomStartEvent.range;
        !preventEvents.start && that._eventTrigger("zoomStart", zoomStartEvent);
        var zoomResults = {
            isPrevented: zoomStartEvent.cancel,
            skipEventRising: preventEvents.skipEventRising,
            range: visualRange || zoomStartEvent.range
        };
        if (!zoomStartEvent.cancel) {
            (0, _type.isDefined)(visualRange) && that._applyZooming(visualRange, preventEvents.allowPartialUpdate);
            if (!(0, _type.isDefined)(that._storedZoomEndParams)) {
                that._storedZoomEndParams = {
                    startRange: previousRange,
                    type: this.getOptions().type
                }
            }
            that._storedZoomEndParams.event = domEvent;
            that._storedZoomEndParams.action = action;
            that._storedZoomEndParams.prevent = !!preventEvents.end
        }
        return zoomResults
    },
    handleZoomEnd: function() {
        var that = this;
        if ((0, _type.isDefined)(that._storedZoomEndParams) && !that._storedZoomEndParams.prevent) {
            var previousRange = that._storedZoomEndParams.startRange;
            var domEvent = that._storedZoomEndParams.event;
            var action = that._storedZoomEndParams.action;
            var previousBusinessRange = {
                minVisible: previousRange.startValue,
                maxVisible: previousRange.endValue,
                categories: previousRange.categories
            };
            var typeIsNotChanged = that.getOptions().type === that._storedZoomEndParams.type;
            var shift = typeIsNotChanged ? (0, _math2.adjust)(that.getVisualRangeCenter() - that.getVisualRangeCenter(previousBusinessRange)) : NaN;
            var zoomFactor = typeIsNotChanged ? +(Math.round(that.getVisualRangeLength(previousBusinessRange) / (that.getVisualRangeLength() || 1) + "e+2") + "e-2") : NaN;
            var zoomEndEvent = that._getZoomEndEventArg(previousRange, domEvent, action, zoomFactor, shift);
            zoomEndEvent.cancel = that.checkZoomingLowerLimitOvercome(1 === zoomFactor ? "pan" : "zoom", zoomFactor).stopInteraction;
            that._eventTrigger("zoomEnd", zoomEndEvent);
            if (zoomEndEvent.cancel) {
                that._restorePreviousVisualRange(previousRange)
            }
            that._storedZoomEndParams = null
        }
    },
    _restorePreviousVisualRange: function(previousRange) {
        var that = this;
        that._storedZoomEndParams = null;
        that._applyZooming(previousRange);
        that._visualRange(that, previousRange)
    },
    checkZoomingLowerLimitOvercome: function(actionType, zoomFactor, range) {
        var that = this;
        var options = that._options;
        var translator = that._translator;
        var minZoom = options.minVisualRangeLength;
        var correctedRange = range;
        var visualRange;
        var isOvercoming = "zoom" === actionType && zoomFactor >= 1;
        var businessRange = translator.getBusinessRange();
        if (range) {
            visualRange = that.adjustRange((0, _utils.getVizRangeObject)(range));
            visualRange = {
                minVisible: visualRange.startValue,
                maxVisible: visualRange.endValue,
                categories: businessRange.categories
            }
        }
        var beforeVisualRangeLength = that.getVisualRangeLength(businessRange);
        var afterVisualRangeLength = that.getVisualRangeLength(visualRange);
        if ((0, _type.isDefined)(minZoom) || "discrete" === options.type) {
            minZoom = translator.convert(minZoom);
            if (visualRange && minZoom < beforeVisualRangeLength && minZoom >= afterVisualRangeLength) {
                correctedRange = (0, _utils.getVizRangeObject)(translator.getRangeByMinZoomValue(minZoom, visualRange));
                isOvercoming = false
            } else {
                isOvercoming &= minZoom > afterVisualRangeLength
            }
        } else {
            var canvasLength = that._translator.canvasLength;
            var fullRange = {
                minVisible: businessRange.min,
                maxVisible: businessRange.max,
                categories: businessRange.categories
            };
            isOvercoming &= that.getVisualRangeLength(fullRange) / canvasLength >= afterVisualRangeLength
        }
        return {
            stopInteraction: !!isOvercoming,
            correctedRange: correctedRange
        }
    },
    dataVisualRangeIsReduced: function() {
        var minDataValue;
        var maxDataValue;
        var translator = this.getTranslator();
        if ("discrete" === this._options.type) {
            var categories = translator.getBusinessRange().categories;
            minDataValue = categories[0];
            maxDataValue = categories[categories.length - 1]
        } else {
            var seriesData = this._seriesData;
            minDataValue = seriesData.min;
            maxDataValue = seriesData.max
        }
        if (!(0, _type.isDefined)(minDataValue) || !(0, _type.isDefined)(maxDataValue)) {
            return false
        }
        var startPoint = translator.translate(minDataValue);
        var endPoint = translator.translate(maxDataValue);
        var edges = [Math.min(startPoint, endPoint), Math.max(startPoint, endPoint)];
        var visualRange = this.visualRange();
        var visualRangeStartPoint = translator.translate(visualRange.startValue);
        var visualRangeEndPoint = translator.translate(visualRange.endValue);
        return visualRangeStartPoint > edges[0] && visualRangeStartPoint < edges[1] || visualRangeEndPoint > edges[0] && visualRangeEndPoint < edges[1] || visualRangeStartPoint === visualRangeEndPoint && edges[0] !== edges[1]
    },
    isExtremePosition: function(isMax) {
        var extremeDataValue;
        var seriesData;
        if ("discrete" === this._options.type) {
            seriesData = this._translator.getBusinessRange();
            extremeDataValue = isMax ? seriesData.categories[seriesData.categories.length - 1] : seriesData.categories[0]
        } else {
            seriesData = this.getZoomBounds();
            extremeDataValue = isMax ? seriesData.endValue : seriesData.startValue
        }
        var translator = this.getTranslator();
        var extremePoint = translator.translate(extremeDataValue);
        var visualRange = this.visualRange();
        var visualRangePoint = isMax ? translator.translate(visualRange.endValue) : translator.translate(visualRange.startValue);
        return _abs(visualRangePoint - extremePoint) < SCROLL_THRESHOLD
    },
    getViewport: function() {
        return this._viewport
    },
    getFullTicks: function() {
        var majors = this._majorTicks || [];
        if (this._options.type === _axes_constants.default.discrete) {
            return convertTicksToValues(majors)
        } else {
            return convertTicksToValues(majors.concat(this._minorTicks, this._boundaryTicks)).sort(function(a, b) {
                return (0, _utils.valueOf)(a) - (0, _utils.valueOf)(b)
            })
        }
    },
    measureLabels: function(canvas, withIndents) {
        var that = this;
        var options = that._options;
        var widthAxis = options.visible ? options.width : 0;
        var ticks;
        var indent = withIndents ? options.label.indentFromAxis + .5 * options.tick.length : 0;
        var tickInterval;
        var viewportRange = that._getViewportRange();
        if (viewportRange.isEmpty() || !options.label.visible || !that._axisElementsGroup) {
            return {
                height: widthAxis,
                width: widthAxis,
                x: 0,
                y: 0
            }
        }
        if (that._majorTicks) {
            ticks = convertTicksToValues(that._majorTicks)
        } else {
            that.updateCanvas(canvas);
            ticks = that._createTicksAndLabelFormat(viewportRange, _common.noop);
            tickInterval = ticks.tickInterval;
            ticks = ticks.ticks
        }
        var maxText = ticks.reduce(function(prevLabel, tick, index) {
            var label = that.formatLabel(tick, options.label, viewportRange, void 0, tickInterval, ticks);
            if (prevLabel.length < label.length) {
                return label
            } else {
                return prevLabel
            }
        }, that.formatLabel(ticks[0], options.label, viewportRange, void 0, tickInterval, ticks));
        var text = that._renderer.text(maxText, 0, 0).css(that._textFontStyles).attr(that._textOptions).append(that._renderer.root);
        var box = text.getBBox();
        text.remove();
        return {
            x: box.x,
            y: box.y,
            width: box.width + indent,
            height: box.height + indent
        }
    },
    _setLabelsPlacement: function() {
        if (!this._options.label.visible) {
            return
        }
        var that = this;
        var labelOpt = that._options.label;
        var displayMode = that._validateDisplayMode(labelOpt.displayMode);
        var overlappingMode = that._validateOverlappingMode(labelOpt.overlappingBehavior, displayMode);
        var ignoreOverlapping = "none" === overlappingMode || "ignore" === overlappingMode;
        var behavior = {
            rotationAngle: labelOpt.rotationAngle,
            staggeringSpacing: labelOpt.staggeringSpacing
        };
        var notRecastStep;
        var boxes = that._majorTicks.map(function(tick) {
            return tick.labelBBox
        });
        var step = that._getStep(boxes);
        switch (displayMode) {
            case ROTATE:
                if (ignoreOverlapping) {
                    notRecastStep = true;
                    step = 1
                }
                that._applyLabelMode(displayMode, step, boxes, labelOpt, notRecastStep);
                break;
            case "stagger":
                if (ignoreOverlapping) {
                    step = 2
                }
                that._applyLabelMode(displayMode, _max(step, 2), boxes, labelOpt);
                break;
            default:
                that._applyLabelOverlapping(boxes, overlappingMode, step, behavior)
        }
    },
    _applyLabelOverlapping: function(boxes, mode, step, behavior) {
        var that = this;
        var labelOpt = that._options.label;
        var majorTicks = that._majorTicks;
        if ("none" === mode || "ignore" === mode) {
            return
        }
        var checkLabels = function(box, index, array) {
            if (0 === index) {
                return false
            }
            return _axes_constants.default.areLabelsOverlap(box, array[index - 1], labelOpt.minSpacing, labelOpt.alignment)
        };
        if (step > 1 && boxes.some(checkLabels)) {
            that._applyLabelMode(mode, step, boxes, behavior)
        }
        that._checkBoundedLabelsOverlapping(majorTicks, boxes, mode)
    },
    _applyLabelMode: function(mode, step, boxes, behavior, notRecastStep) {
        var that = this;
        var majorTicks = that._majorTicks;
        var labelOpt = that._options.label;
        var angle = behavior.rotationAngle;
        var labelHeight;
        var alignment;
        var func;
        switch (mode) {
            case ROTATE:
                if (!labelOpt.userAlignment) {
                    alignment = angle < 0 ? RIGHT : LEFT;
                    if (angle % 90 === 0) {
                        alignment = CENTER
                    }
                }
                step = notRecastStep ? step : that._getStep(boxes, angle);
                func = function(tick) {
                    var contentContainer = tick.getContentContainer();
                    if (!contentContainer) {
                        return
                    }
                    contentContainer.rotate(angle);
                    tick.labelRotationAngle = angle;
                    alignment && (tick.labelAlignment = alignment)
                };
                updateLabels(majorTicks, step, func);
                break;
            case "stagger":
                labelHeight = that._getMaxLabelHeight(boxes, behavior.staggeringSpacing);
                func = function(tick, index) {
                    if (index / (step - 1) % 2 !== 0) {
                        tick.labelOffset = labelHeight
                    }
                };
                updateLabels(majorTicks, step - 1, func);
                break;
            case "auto":
            case "_auto":
                if (2 === step) {
                    that._applyLabelMode("stagger", step, boxes, behavior)
                } else {
                    that._applyLabelMode(ROTATE, step, boxes, {
                        rotationAngle: getOptimalAngle(boxes, labelOpt)
                    })
                }
                break;
            default:
                updateLabels(majorTicks, step)
        }
    },
    getMarkerTrackers: _common.noop,
    _drawDateMarkers: _common.noop,
    _adjustDateMarkers: _common.noop,
    coordsIn: _common.noop,
    areCoordsOutsideAxis: _common.noop,
    _getSkippedCategory: _common.noop,
    _initAxisPositions: _common.noop,
    _drawTitle: _common.noop,
    _updateTitleCoords: _common.noop,
    _adjustConstantLineLabels: _common.noop,
    _createTranslator: function() {
        return new _translator2d.Translator2D({}, {}, {})
    },
    _updateTranslator: function() {
        var translator = this._translator;
        translator.update(translator.getBusinessRange(), this._canvas || {}, this._getTranslatorOptions())
    },
    _getTranslatorOptions: function() {
        var _options$workWeek2, _options$breakStyle$w, _options$breakStyle;
        var options = this._options;
        return {
            isHorizontal: this._isHorizontal,
            shiftZeroValue: !this.isArgumentAxis,
            interval: options.semiDiscreteInterval,
            firstDayOfWeek: null === (_options$workWeek2 = options.workWeek) || void 0 === _options$workWeek2 ? void 0 : _options$workWeek2[0],
            stick: this._getStick(),
            breaksSize: null !== (_options$breakStyle$w = null === (_options$breakStyle = options.breakStyle) || void 0 === _options$breakStyle ? void 0 : _options$breakStyle.width) && void 0 !== _options$breakStyle$w ? _options$breakStyle$w : 0
        }
    },
    getVisibleArea: function() {
        var canvas = this._getCanvasStartEnd();
        return [canvas.start, canvas.end].sort(function(a, b) {
            return a - b
        })
    },
    _getCanvasStartEnd: function() {
        var isHorizontal = this._isHorizontal;
        var canvas = this._canvas || {};
        var invert = this._translator.getBusinessRange().invert;
        var coords = isHorizontal ? [canvas.left, canvas.width - canvas.right] : [canvas.height - canvas.bottom, canvas.top];
        invert && coords.reverse();
        return {
            start: coords[0],
            end: coords[1]
        }
    },
    _getScreenDelta: function() {
        var that = this;
        var canvas = that._getCanvasStartEnd();
        var breaks = that._seriesData ? that._seriesData.breaks || [] : [];
        var breaksLength = breaks.length;
        var screenDelta = _abs(canvas.start - canvas.end);
        return screenDelta - (breaksLength ? breaks[breaksLength - 1].cumulativeWidth : 0)
    },
    _getScaleBreaks: function() {
        return []
    },
    _filterBreaks: function() {
        return []
    },
    _adjustTitle: _common.noop,
    _checkTitleOverflow: _common.noop,
    getSpiderTicks: _common.noop,
    setSpiderTicks: _common.noop,
    _checkBoundedLabelsOverlapping: _common.noop,
    drawScaleBreaks: _common.noop,
    _visualRange: _common.noop,
    _rotateConstantLine: _common.noop,
    applyVisualRangeSetter: function(visualRangeSetter) {
        this._visualRange = visualRangeSetter
    },
    getCategoriesSorter: function(argCategories) {
        var sort;
        if (this.isArgumentAxis) {
            sort = argCategories
        } else {
            var categoriesSortingMethod = this._options.categoriesSortingMethod;
            sort = null !== categoriesSortingMethod && void 0 !== categoriesSortingMethod ? categoriesSortingMethod : this._options.categories
        }
        return sort
    },
    _getAdjustedBusinessRange: function() {
        return this.adjustViewport(this._translator.getBusinessRange())
    }
};
