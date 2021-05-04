/**
 * DevExtreme (viz/translators/category_translator.js)
 * Version: 20.2.6
 * Build date: Tue Mar 16 2021
 *
 * Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
exports.default = void 0;
var _type = require("../../core/utils/type");
var _math = require("../../core/utils/math");
var round = Math.round;

function getValue(value) {
    return value
}
var _default = {
    translate: function(category, directionOffset) {
        var that = this;
        var canvasOptions = that._canvasOptions;
        var categoryIndex = that._categoriesToPoints[category.valueOf()];
        var specialValue = that.translateSpecialCase(category);
        var startPointIndex = canvasOptions.startPointIndex || 0;
        var stickInterval = that._options.stick ? 0 : .5;
        if ((0, _type.isDefined)(specialValue)) {
            return round(specialValue)
        }
        if (!categoryIndex && 0 !== categoryIndex) {
            return null
        }
        directionOffset = directionOffset || 0;
        var stickDelta = categoryIndex + stickInterval - startPointIndex + .5 * directionOffset;
        return round(that._calculateProjection(canvasOptions.interval * stickDelta))
    },
    getInterval: function() {
        return this._canvasOptions.interval
    },
    getEventScale: function(zoomEvent) {
        var scale = zoomEvent.deltaScale || 1;
        return 1 - (1 - scale) / (.75 + this.visibleCategories.length / this._categories.length)
    },
    zoom: function(translate, scale) {
        var that = this;
        var categories = that._categories;
        var canvasOptions = that._canvasOptions;
        var stick = that._options.stick;
        var invert = canvasOptions.invert;
        var interval = canvasOptions.interval * scale;
        var translateCategories = translate / interval;
        var visibleCount = (that.visibleCategories || []).length;
        var startCategoryIndex = parseInt((canvasOptions.startPointIndex || 0) + translateCategories + .5);
        var categoriesLength = parseInt((0, _math.adjust)(canvasOptions.canvasLength / interval) + (stick ? 1 : 0)) || 1;
        var endCategoryIndex;
        if (invert) {
            startCategoryIndex = parseInt((canvasOptions.startPointIndex || 0) + visibleCount - translateCategories + .5) - categoriesLength
        }
        if (startCategoryIndex < 0) {
            startCategoryIndex = 0
        }
        endCategoryIndex = startCategoryIndex + categoriesLength;
        if (endCategoryIndex > categories.length) {
            endCategoryIndex = categories.length;
            startCategoryIndex = endCategoryIndex - categoriesLength;
            if (startCategoryIndex < 0) {
                startCategoryIndex = 0
            }
        }
        var newVisibleCategories = categories.slice(parseInt(startCategoryIndex), parseInt(endCategoryIndex));
        var newInterval = that._getDiscreteInterval(newVisibleCategories.length, canvasOptions);
        scale = newInterval / canvasOptions.interval;
        translate = that.translate(!invert ? newVisibleCategories[0] : newVisibleCategories[newVisibleCategories.length - 1]) * scale - (canvasOptions.startPoint + (stick ? 0 : newInterval / 2));
        return {
            min: newVisibleCategories[0],
            max: newVisibleCategories[newVisibleCategories.length - 1],
            translate: translate,
            scale: scale
        }
    },
    getMinScale: function(zoom) {
        var that = this;
        var canvasOptions = that._canvasOptions;
        var categoriesLength = (that.visibleCategories || that._categories).length;
        categoriesLength += (parseInt(.1 * categoriesLength) || 1) * (zoom ? -2 : 2);
        return canvasOptions.canvasLength / (Math.max(categoriesLength, 1) * canvasOptions.interval)
    },
    getScale: function(min, max) {
        var that = this;
        var canvasOptions = that._canvasOptions;
        var visibleArea = that.getCanvasVisibleArea();
        var stickOffset = !that._options.stick && 1;
        var minPoint = (0, _type.isDefined)(min) ? that.translate(min, -stickOffset) : null;
        var maxPoint = (0, _type.isDefined)(max) ? that.translate(max, +stickOffset) : null;
        if (null === minPoint) {
            minPoint = canvasOptions.invert ? visibleArea.max : visibleArea.min
        }
        if (null === maxPoint) {
            maxPoint = canvasOptions.invert ? visibleArea.min : visibleArea.max
        }
        return that.canvasLength / Math.abs(maxPoint - minPoint)
    },
    isValid: function(value) {
        return (0, _type.isDefined)(value) ? this._categoriesToPoints[value.valueOf()] >= 0 : false
    },
    getCorrectValue: getValue,
    to: function(value, direction) {
        var canvasOptions = this._canvasOptions;
        var categoryIndex = this._categoriesToPoints[value.valueOf()];
        var startPointIndex = canvasOptions.startPointIndex || 0;
        var stickDelta = categoryIndex + (this._options.stick ? 0 : .5) - startPointIndex + (this._businessRange.invert ? -1 : 1) * direction * .5;
        return round(this._calculateProjection(canvasOptions.interval * stickDelta))
    },
    from: function(position) {
        var direction = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0;
        var canvasOptions = this._canvasOptions;
        var startPoint = canvasOptions.startPoint;
        var categories = this.visibleCategories || this._categories;
        var categoriesLength = categories.length;
        var stickInterval = this._options.stick ? .5 : 0;
        var result = round((position - startPoint) / canvasOptions.interval + stickInterval - .5 - .5 * direction);
        if (result >= categoriesLength) {
            result = categoriesLength - 1
        }
        if (result < 0) {
            result = 0
        }
        if (canvasOptions.invert) {
            result = categoriesLength - result - 1
        }
        return categories[result]
    },
    _add: function() {
        return NaN
    },
    _toValue: getValue,
    isValueProlonged: true,
    getRangeByMinZoomValue: function(minZoom, visualRange) {
        var categories = this._categories;
        var minVisibleIndex = categories.indexOf(visualRange.minVisible);
        var maxVisibleIndex = categories.indexOf(visualRange.maxVisible);
        var startIndex = minVisibleIndex + minZoom - 1;
        var endIndex = maxVisibleIndex - minZoom + 1;
        if (categories[startIndex]) {
            return [visualRange.minVisible, categories[startIndex]]
        } else {
            return [categories[endIndex], visualRange.maxVisible]
        }
    }
};
exports.default = _default;
module.exports = exports.default;
