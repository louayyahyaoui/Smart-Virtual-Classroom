/**
 * DevExtreme (viz/range_selector/sliders_controller.js)
 * Version: 20.2.6
 * Build date: Tue Mar 16 2021
 *
 * Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
exports.SlidersController = SlidersController;
var _common = require("../../core/utils/common");
var _common2 = require("./common");
var _slider = _interopRequireDefault(require("./slider"));
var _utils = require("../core/utils");
var _type = require("../../core/utils/type");
var _math = require("../../core/utils/math");

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        "default": obj
    }
}
var animationSettings = _common2.utils.animationSettings;
var emptySliderMarkerText = _common2.consts.emptySliderMarkerText;

function buildRectPoints(left, top, right, bottom) {
    return [left, top, right, top, right, bottom, left, bottom]
}

function isLess(a, b) {
    return a < b
}

function isGreater(a, b) {
    return a > b
}

function selectClosestValue(target, values) {
    var start = 0;
    var end = values ? values.length - 1 : 0;
    var middle;
    var val = target;
    while (end - start > 1) {
        middle = start + end >> 1;
        val = values[middle];
        if (val === target) {
            return target
        } else {
            if (target < val) {
                end = middle
            } else {
                start = middle
            }
        }
    }
    if (values) {
        val = values[target - values[start] <= values[end] - target ? start : end]
    }
    return val
}

function dummyProcessSelectionChanged() {
    this._lastSelectedRange = this.getSelectedRange();
    delete this._processSelectionChanged
}

function suppressSetSelectedRange(controller) {
    controller.setSelectedRange = _common.noop;
    if (controller._processSelectionChanged === dummyProcessSelectionChanged) {
        controller._processSelectionChanged()
    }
}

function restoreSetSelectedRange(controller) {
    delete controller.setSelectedRange
}

function SlidersController(params) {
    var that = this;
    var sliderParams = {
        renderer: params.renderer,
        root: params.root,
        trackersGroup: params.trackersGroup,
        translator: params.translator
    };
    that._params = params;
    that._areaTracker = params.renderer.path(null, "area").attr({
        "class": "area-tracker",
        fill: "#000000",
        opacity: 1e-4
    }).append(params.trackersGroup);
    that._selectedAreaTracker = params.renderer.path(null, "area").attr({
        "class": "selected-area-tracker",
        fill: "#000000",
        opacity: 1e-4
    }).append(params.trackersGroup);
    that._shutter = params.renderer.path(null, "area").append(params.root);
    that._sliders = [new _slider.default(sliderParams, 0), new _slider.default(sliderParams, 1)];
    that._processSelectionChanged = dummyProcessSelectionChanged
}
SlidersController.prototype = {
    constructor: SlidersController,
    dispose: function() {
        this._sliders[0].dispose();
        this._sliders[1].dispose()
    },
    getTrackerTargets: function() {
        return {
            area: this._areaTracker,
            selectedArea: this._selectedAreaTracker,
            sliders: this._sliders
        }
    },
    _processSelectionChanged: function(e) {
        var that = this;
        var selectedRange = that.getSelectedRange();
        if (!(0, _utils.rangesAreEqual)(selectedRange, that._lastSelectedRange)) {
            that._params.updateSelectedRange(selectedRange, that._lastSelectedRange, e);
            that._lastSelectedRange = selectedRange
        }
    },
    update: function(verticalRange, behavior, isCompactMode, sliderHandleOptions, sliderMarkerOptions, shutterOptions, rangeBounds, fullTicks, selectedRangeColor) {
        var that = this;
        var screenRange = that._params.translator.getScreenRange();
        that._verticalRange = verticalRange;
        that._minRange = rangeBounds.minRange;
        that._maxRange = rangeBounds.maxRange;
        that._animationEnabled = behavior.animationEnabled && that._params.renderer.animationEnabled();
        that._allowSlidersSwap = behavior.allowSlidersSwap;
        that._sliders[0].update(verticalRange, sliderHandleOptions, sliderMarkerOptions);
        that._sliders[1].update(verticalRange, sliderHandleOptions, sliderMarkerOptions);
        that._sliders[0]._position = that._sliders[1]._position = screenRange[0];
        that._values = !that._params.translator.isValueProlonged && behavior.snapToTicks ? fullTicks : null;
        that._areaTracker.attr({
            points: buildRectPoints(screenRange[0], verticalRange[0], screenRange[1], verticalRange[1])
        });
        that._isCompactMode = isCompactMode;
        that._shutterOffset = sliderHandleOptions.width / 2;
        that._updateSelectedView(shutterOptions, selectedRangeColor);
        that._isOnMoving = "onmoving" === (0, _utils.normalizeEnum)(behavior.callValueChanged);
        that._updateSelectedRange();
        that._applyTotalPosition(false)
    },
    _updateSelectedView: function(shutterOptions, selectedRangeColor) {
        var settings = {
            fill: null,
            "fill-opacity": null,
            stroke: null,
            "stroke-width": null
        };
        if (this._isCompactMode) {
            settings.stroke = selectedRangeColor;
            settings["stroke-width"] = 3;
            settings.sharp = "v"
        } else {
            settings.fill = shutterOptions.color;
            settings["fill-opacity"] = shutterOptions.opacity
        }
        this._shutter.attr(settings)
    },
    _updateSelectedRange: function() {
        var that = this;
        var sliders = that._sliders;
        sliders[0].cancelAnimation();
        sliders[1].cancelAnimation();
        that._shutter.stopAnimation();
        if (that._params.translator.getBusinessRange().isEmpty()) {
            sliders[0]._setText(emptySliderMarkerText);
            sliders[1]._setText(emptySliderMarkerText);
            sliders[0]._value = sliders[1]._value = void 0;
            sliders[0]._position = that._params.translator.getScreenRange()[0];
            sliders[1]._position = that._params.translator.getScreenRange()[1];
            that._applyTotalPosition(false);
            suppressSetSelectedRange(that)
        } else {
            restoreSetSelectedRange(that)
        }
    },
    _applyTotalPosition: function(isAnimated) {
        var sliders = this._sliders;
        isAnimated = this._animationEnabled && isAnimated;
        sliders[0].applyPosition(isAnimated);
        sliders[1].applyPosition(isAnimated);
        var areOverlapped = sliders[0].getCloudBorder() > sliders[1].getCloudBorder();
        sliders[0].setOverlapped(areOverlapped);
        sliders[1].setOverlapped(areOverlapped);
        this._applyAreaTrackersPosition();
        this._applySelectedRangePosition(isAnimated)
    },
    _applyAreaTrackersPosition: function() {
        var that = this;
        var position1 = that._sliders[0].getPosition();
        var position2 = that._sliders[1].getPosition();
        that._selectedAreaTracker.attr({
            points: buildRectPoints(position1, that._verticalRange[0], position2, that._verticalRange[1])
        }).css({
            cursor: Math.abs(that._params.translator.getScreenRange()[1] - that._params.translator.getScreenRange()[0] - position2 + position1) < .001 ? "default" : "pointer"
        })
    },
    _applySelectedRangePosition: function(isAnimated) {
        var that = this;
        var verticalRange = that._verticalRange;
        var pos1 = that._sliders[0].getPosition();
        var pos2 = that._sliders[1].getPosition();
        var screenRange;
        var points;
        if (that._isCompactMode) {
            points = [pos1 + Math.ceil(that._shutterOffset), (verticalRange[0] + verticalRange[1]) / 2, pos2 - Math.floor(that._shutterOffset), (verticalRange[0] + verticalRange[1]) / 2]
        } else {
            screenRange = that._params.axis.getVisibleArea();
            points = [buildRectPoints(screenRange[0], verticalRange[0], Math.max(pos1 - Math.floor(that._shutterOffset), screenRange[0]), verticalRange[1]), buildRectPoints(screenRange[1], verticalRange[0], Math.min(pos2 + Math.ceil(that._shutterOffset), screenRange[1]), verticalRange[1])]
        }
        if (isAnimated) {
            that._shutter.animate({
                points: points
            }, animationSettings)
        } else {
            that._shutter.attr({
                points: points
            })
        }
    },
    getSelectedRange: function() {
        return {
            startValue: this._sliders[0].getValue(),
            endValue: this._sliders[1].getValue()
        }
    },
    setSelectedRange: function(visualRange, e) {
        visualRange = visualRange || {};
        var that = this;
        var translator = that._params.translator;
        var businessRange = translator.getBusinessRange();
        var compare = "discrete" === businessRange.axisType ? function(a, b) {
            return a < b
        } : function(a, b) {
            return a <= b
        };
        var _adjustVisualRange = (0, _utils.adjustVisualRange)({
                dataType: businessRange.dataType,
                axisType: businessRange.axisType,
                base: businessRange.base
            }, {
                startValue: translator.isValid(visualRange.startValue) ? translator.getCorrectValue(visualRange.startValue, 1) : void 0,
                endValue: translator.isValid(visualRange.endValue) ? translator.getCorrectValue(visualRange.endValue, -1) : void 0,
                length: visualRange.length
            }, {
                min: businessRange.minVisible,
                max: businessRange.maxVisible,
                categories: businessRange.categories
            }),
            startValue = _adjustVisualRange.startValue,
            endValue = _adjustVisualRange.endValue;
        startValue = (0, _type.isNumeric)(startValue) ? (0, _math.adjust)(startValue) : startValue;
        endValue = (0, _type.isNumeric)(endValue) ? (0, _math.adjust)(endValue) : endValue;
        var values = compare(translator.to(startValue, -1), translator.to(endValue, 1)) ? [startValue, endValue] : [endValue, startValue];
        that._sliders[0].setDisplayValue(values[0]);
        that._sliders[1].setDisplayValue(values[1]);
        that._sliders[0]._position = translator.to(values[0], -1);
        that._sliders[1]._position = translator.to(values[1], 1);
        that._applyTotalPosition(true);
        that._processSelectionChanged(e)
    },
    beginSelectedAreaMoving: function(initialPosition) {
        var that = this;
        var sliders = that._sliders;
        var offset = (sliders[0].getPosition() + sliders[1].getPosition()) / 2 - initialPosition;
        var currentPosition = initialPosition;
        move.complete = function(e) {
            that._dockSelectedArea(e)
        };
        return move;

        function move(position, e) {
            if (position !== currentPosition && position > currentPosition === position > (sliders[0].getPosition() + sliders[1].getPosition()) / 2 - offset) {
                that._moveSelectedArea(position + offset, false, e)
            }
            currentPosition = position
        }
    },
    _dockSelectedArea: function(e) {
        var translator = this._params.translator;
        var sliders = this._sliders;
        sliders[0]._position = translator.to(sliders[0].getValue(), -1);
        sliders[1]._position = translator.to(sliders[1].getValue(), 1);
        this._applyTotalPosition(true);
        this._processSelectionChanged(e)
    },
    moveSelectedArea: function(screenPosition, e) {
        this._moveSelectedArea(screenPosition, true, e);
        this._dockSelectedArea(e)
    },
    _moveSelectedArea: function(screenPosition, isAnimated, e) {
        var that = this;
        var translator = that._params.translator;
        var sliders = that._sliders;
        var interval = sliders[1].getPosition() - sliders[0].getPosition();
        var startPosition = screenPosition - interval / 2;
        var endPosition = screenPosition + interval / 2;
        if (startPosition < translator.getScreenRange()[0]) {
            startPosition = translator.getScreenRange()[0];
            endPosition = startPosition + interval
        }
        if (endPosition > translator.getScreenRange()[1]) {
            endPosition = translator.getScreenRange()[1];
            startPosition = endPosition - interval
        }
        var startValue = selectClosestValue(translator.from(startPosition, -1), that._values);
        sliders[0].setDisplayValue(startValue);
        sliders[1].setDisplayValue(selectClosestValue(translator.from(translator.to(startValue, -1) + interval, 1), that._values));
        sliders[0]._position = startPosition;
        sliders[1]._position = endPosition;
        that._applyTotalPosition(isAnimated);
        if (that._isOnMoving) {
            that._processSelectionChanged(e)
        }
    },
    placeSliderAndBeginMoving: function(firstPosition, secondPosition, e) {
        var that = this;
        var translator = that._params.translator;
        var sliders = that._sliders;
        var index = firstPosition < secondPosition ? 0 : 1;
        var dir = index > 0 ? 1 : -1;
        var compare = index > 0 ? isGreater : isLess;
        var antiCompare = index > 0 ? isLess : isGreater;
        var thresholdPosition;
        var positions = [];
        var values = [];
        values[index] = translator.from(firstPosition, dir);
        values[1 - index] = translator.from(secondPosition, -dir);
        positions[1 - index] = secondPosition;
        if (translator.isValueProlonged) {
            if (compare(firstPosition, translator.to(values[index], dir))) {
                values[index] = translator.from(firstPosition, -dir)
            }
            if (compare(secondPosition, translator.to(values[index], -dir))) {
                values[1 - index] = values[index]
            }
        }
        if (that._minRange) {
            thresholdPosition = translator.to(translator.add(selectClosestValue(values[index], that._values), that._minRange, -dir), -dir);
            if (compare(secondPosition, thresholdPosition)) {
                values[1 - index] = translator.add(values[index], that._minRange, -dir)
            }
            thresholdPosition = translator.to(translator.add(translator.getRange()[1 - index], that._minRange, dir), -dir);
            if (antiCompare(firstPosition, thresholdPosition)) {
                values[1 - index] = translator.getRange()[1 - index];
                values[index] = translator.add(values[1 - index], that._minRange, dir);
                positions[1 - index] = firstPosition
            }
        }
        values[0] = selectClosestValue(values[0], that._values);
        values[1] = selectClosestValue(values[1], that._values);
        positions[index] = translator.to(values[index], dir);
        sliders[0].setDisplayValue(values[0]);
        sliders[1].setDisplayValue(values[1]);
        sliders[0]._position = positions[0];
        sliders[1]._position = positions[1];
        that._applyTotalPosition(true);
        if (that._isOnMoving) {
            that._processSelectionChanged(e)
        }
        var handler = that.beginSliderMoving(1 - index, secondPosition);
        sliders[1 - index]._sliderGroup.stopAnimation();
        that._shutter.stopAnimation();
        handler(secondPosition);
        return handler
    },
    beginSliderMoving: function(initialIndex, initialPosition) {
        var that = this;
        var translator = that._params.translator;
        var sliders = that._sliders;
        var minPosition = translator.getScreenRange()[0];
        var maxPosition = translator.getScreenRange()[1];
        var index = initialIndex;
        var staticPosition = sliders[1 - index].getPosition();
        var currentPosition = initialPosition;
        var dir = index > 0 ? 1 : -1;
        var compareMin = index > 0 ? isLess : isGreater;
        var compareMax = index > 0 ? isGreater : isLess;
        var moveOffset = sliders[index].getPosition() - initialPosition;
        var swapOffset = compareMin(sliders[index].getPosition(), initialPosition) ? -moveOffset : moveOffset;
        move.complete = function(e) {
            sliders[index]._setValid(true);
            that._dockSelectedArea(e)
        };
        return move;

        function move(position, e) {
            var isValid;
            var temp;
            var pos;
            var slider;
            var value;
            if (position !== currentPosition) {
                if (compareMin(position + swapOffset, staticPosition)) {
                    isValid = that._allowSlidersSwap;
                    if (isValid && !translator.isValueProlonged && that._minRange) {
                        isValid = translator.isValid(translator.add(sliders[1 - index].getValue(), that._minRange, -dir))
                    }
                    if (isValid) {
                        that._changeMovingSlider(index);
                        index = 1 - index;
                        dir = -dir;
                        temp = compareMin;
                        compareMin = compareMax;
                        compareMax = temp;
                        moveOffset = -dir * Math.abs(moveOffset);
                        swapOffset = -moveOffset
                    }
                }
                if (compareMax(position + moveOffset, staticPosition)) {
                    isValid = true;
                    slider = sliders[index];
                    value = sliders[1 - index].getValue();
                    pos = Math.max(Math.min(position + moveOffset, maxPosition), minPosition);
                    if (isValid && translator.isValueProlonged) {
                        isValid = !compareMin(pos, translator.to(value, dir))
                    }
                    var invalidStateValue;
                    if (isValid && that._minRange) {
                        isValid = !compareMin(pos, translator.to(translator.add(value, that._minRange, dir), dir));
                        if (!isValid) {
                            invalidStateValue = translator.add(value, that._minRange, dir)
                        }
                    }
                    if (isValid && that._maxRange) {
                        isValid = !compareMax(pos, translator.to(translator.add(value, that._maxRange, dir), dir));
                        if (!isValid) {
                            invalidStateValue = translator.add(value, that._maxRange, dir)
                        }
                    }
                    slider._setValid(isValid);
                    slider.setDisplayValue(isValid ? selectClosestValue(translator.from(pos, dir), that._values) : (0, _type.isDefined)(invalidStateValue) ? invalidStateValue : slider.getValue());
                    slider._position = pos;
                    that._applyTotalPosition(false);
                    slider.toForeground();
                    if (that._isOnMoving) {
                        that._processSelectionChanged(e)
                    }
                }
            }
            currentPosition = position
        }
    },
    _changeMovingSlider: function(index) {
        var that = this;
        var translator = that._params.translator;
        var sliders = that._sliders;
        var position = sliders[1 - index].getPosition();
        var dir = index > 0 ? 1 : -1;
        var newValue;
        sliders[index].setDisplayValue(selectClosestValue(translator.from(position, dir), that._values));
        newValue = translator.from(position, -dir);
        if (translator.isValueProlonged) {
            newValue = translator.from(position, dir)
        } else {
            if (that._minRange) {
                newValue = translator.add(newValue, that._minRange, -dir)
            }
        }
        sliders[1 - index].setDisplayValue(selectClosestValue(newValue, that._values));
        sliders[index]._setValid(true);
        sliders[index]._marker._update();
        sliders[0]._position = sliders[1]._position = position
    },
    foregroundSlider: function(index) {
        this._sliders[index].toForeground()
    }
};
