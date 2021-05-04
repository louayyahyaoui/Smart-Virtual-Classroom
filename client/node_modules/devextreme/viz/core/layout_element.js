/**
 * DevExtreme (viz/core/layout_element.js)
 * Version: 20.2.6
 * Build date: Tue Mar 16 2021
 *
 * Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
exports.LayoutElement = LayoutElement;
exports.WrapperLayoutElement = WrapperLayoutElement;
var _common = require("../../core/utils/common");
var _object = require("../../core/utils/object");
var _round = Math.round;
var defaultOffset = {
    horizontal: 0,
    vertical: 0
};
var alignFactors = {
    center: .5,
    right: 1,
    bottom: 1,
    left: 0,
    top: 0
};

function LayoutElement(options) {
    this._options = options
}
LayoutElement.prototype = {
    constructor: LayoutElement,
    position: function(options) {
        var that = this;
        var ofBBox = options.of.getLayoutOptions();
        var myBBox = that.getLayoutOptions();
        var at = options.at;
        var my = options.my;
        var offset = options.offset || defaultOffset;
        var shiftX = -alignFactors[my.horizontal] * myBBox.width + ofBBox.x + alignFactors[at.horizontal] * ofBBox.width + parseInt(offset.horizontal);
        var shiftY = -alignFactors[my.vertical] * myBBox.height + ofBBox.y + alignFactors[at.vertical] * ofBBox.height + parseInt(offset.vertical);
        that.shift(_round(shiftX), _round(shiftY))
    },
    getLayoutOptions: _common.noop
};

function WrapperLayoutElement(renderElement, bBox) {
    this._renderElement = renderElement;
    this._cacheBBox = bBox
}
var wrapperLayoutElementPrototype = WrapperLayoutElement.prototype = (0, _object.clone)(LayoutElement.prototype);
wrapperLayoutElementPrototype.constructor = WrapperLayoutElement;
wrapperLayoutElementPrototype.getLayoutOptions = function() {
    return this._cacheBBox || this._renderElement.getBBox()
};
wrapperLayoutElementPrototype.shift = function(shiftX, shiftY) {
    var bBox = this.getLayoutOptions();
    this._renderElement.move(_round(shiftX - bBox.x), _round(shiftY - bBox.y))
};
