/**
 * DevExtreme (viz/axes/strip.js)
 * Version: 20.2.6
 * Build date: Tue Mar 16 2021
 *
 * Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
exports.default = createStrip;
var _type = require("../../core/utils/type");
var _utils = require("../core/utils");
var _extend = require("../../core/utils/extend");

function createStrip(axis, options) {
    var storedCoord;
    var lastStoredCoordinates;
    var labelOptions = options.label || {};
    return {
        options: options,
        label: null,
        rect: null,
        _getCoord: function() {
            var canvas = axis._getCanvasStartEnd();
            var range = axis._translator.getBusinessRange();
            return axis._getStripPos(options.startValue, options.endValue, canvas.start, canvas.end, range)
        },
        _drawLabel: function(coords) {
            return axis._renderer.text(labelOptions.text, coords.x, coords.y).css((0, _utils.patchFontOptions)((0, _extend.extend)({}, axis.getOptions().label.font, labelOptions.font))).attr({
                align: "center",
                "class": labelOptions.cssClass
            }).append(axis._axisStripLabelGroup)
        },
        draw: function() {
            if (axis._translator.getBusinessRange().isEmpty()) {
                return
            }
            if (((0, _type.isDefined)(options.startValue) || (0, _type.isDefined)(options.endValue)) && (0, _type.isDefined)(options.color)) {
                var stripPos = this._getCoord();
                this.labelCoords = labelOptions.text ? axis._getStripLabelCoords(stripPos.from, stripPos.to, labelOptions) : null;
                if (stripPos.outOfCanvas || !(0, _type.isDefined)(stripPos.to) || !(0, _type.isDefined)(stripPos.from)) {
                    return
                }
                this.rect = axis._createStrip(axis._getStripGraphicAttributes(stripPos.from, stripPos.to)).attr({
                    fill: options.color
                }).append(axis._axisStripGroup);
                this.label = labelOptions.text ? this._drawLabel(this.labelCoords) : null
            }
        },
        getContentContainer: function() {
            return this.label
        },
        removeLabel: function() {},
        updatePosition: function(animate) {
            var stripPos = this._getCoord();
            if (animate && storedCoord) {
                this.label && this.label.attr(axis._getStripLabelCoords(storedCoord.from, storedCoord.to, options.label));
                this.rect && this.rect.attr(axis._getStripGraphicAttributes(storedCoord.from, storedCoord.to));
                this.label && this.label.animate(axis._getStripLabelCoords(stripPos.from, stripPos.to, options.label));
                this.rect && this.rect.animate(axis._getStripGraphicAttributes(stripPos.from, stripPos.to))
            } else {
                this.label && this.label.attr(axis._getStripLabelCoords(stripPos.from, stripPos.to, options.label));
                this.rect && this.rect.attr(axis._getStripGraphicAttributes(stripPos.from, stripPos.to))
            }
        },
        saveCoords: function() {
            lastStoredCoordinates = storedCoord;
            storedCoord = this._getCoord()
        },
        resetCoordinates: function() {
            storedCoord = lastStoredCoordinates
        }
    }
}
module.exports = exports.default;
