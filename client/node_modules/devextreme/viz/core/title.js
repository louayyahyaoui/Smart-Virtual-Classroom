/**
 * DevExtreme (viz/core/title.js)
 * Version: 20.2.6
 * Build date: Tue Mar 16 2021
 *
 * Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
exports.plugin = exports.Title = void 0;
var _type = require("../../core/utils/type");
var _extend = require("../../core/utils/extend");
var _utils = require("./utils");
var _layout_element = require("./layout_element");
var _Number = Number;
var parseHorizontalAlignment = (0, _utils.enumParser)(["left", "center", "right"]);
var parseVerticalAlignment = (0, _utils.enumParser)(["top", "bottom"]);
var DEFAULT_MARGIN = 10;

function hasText(text) {
    return !!(text && String(text).length > 0)
}

function processTitleLength(elem, text, width, options, placeholderSize) {
    if (elem.attr({
            text: text
        }).setMaxSize(width, placeholderSize, options).textChanged) {
        elem.setTitle(text)
    }
}

function pickMarginValue(value) {
    return value >= 0 ? _Number(value) : DEFAULT_MARGIN
}

function validateMargin(margin) {
    var result;
    if (margin >= 0) {
        result = {
            left: _Number(margin),
            top: _Number(margin),
            right: _Number(margin),
            bottom: _Number(margin)
        }
    } else {
        margin = margin || {};
        result = {
            left: pickMarginValue(margin.left),
            top: pickMarginValue(margin.top),
            right: pickMarginValue(margin.right),
            bottom: pickMarginValue(margin.bottom)
        }
    }
    return result
}

function checkRect(rect, boundingRect) {
    return rect[2] - rect[0] < boundingRect.width || rect[3] - rect[1] < boundingRect.height
}
var Title = function(params) {
    this._params = params;
    this._group = params.renderer.g().attr({
        "class": params.cssClass
    }).linkOn(params.root || params.renderer.root, "title");
    this._hasText = false
};
exports.Title = Title;
(0, _extend.extend)(Title.prototype, _layout_element.LayoutElement.prototype, {
    dispose: function() {
        var that = this;
        that._group.linkRemove();
        that._group.linkOff();
        if (that._titleElement) {
            that._clipRect.dispose();
            that._titleElement = that._subtitleElement = that._clipRect = null
        }
        that._params = that._group = that._options = null
    },
    _updateOptions: function(options) {
        this._options = options;
        this._options.horizontalAlignment = parseHorizontalAlignment(options.horizontalAlignment, "center");
        this._options.verticalAlignment = parseVerticalAlignment(options.verticalAlignment, "top");
        this._options.margin = validateMargin(options.margin)
    },
    _updateStructure: function() {
        var that = this;
        var renderer = that._params.renderer;
        var group = that._group;
        var options = that._options;
        var align = options.horizontalAlignment;
        if (!that._titleElement) {
            that._titleElement = renderer.text().append(group);
            that._subtitleElement = renderer.text();
            that._clipRect = renderer.clipRect();
            group.attr({
                "clip-path": that._clipRect.id
            })
        }
        that._titleElement.attr({
            align: align,
            "class": options.cssClass
        });
        that._subtitleElement.attr({
            align: align,
            "class": options.subtitle.cssClass
        });
        group.linkAppend();
        hasText(options.subtitle.text) ? that._subtitleElement.append(group) : that._subtitleElement.remove()
    },
    _updateTexts: function() {
        var that = this;
        var options = that._options;
        var subtitleOptions = options.subtitle;
        var titleElement = that._titleElement;
        var subtitleElement = that._subtitleElement;
        var testText = "A";
        var titleBox;
        titleElement.attr({
            text: testText,
            y: 0
        }).css((0, _utils.patchFontOptions)(options.font));
        titleBox = titleElement.getBBox();
        that._baseLineCorrection = titleBox.height + titleBox.y;
        titleElement.attr({
            text: options.text
        });
        titleBox = titleElement.getBBox();
        var y = -titleBox.y;
        titleElement.attr({
            y: y
        });
        if (hasText(subtitleOptions.text)) {
            subtitleElement.attr({
                text: subtitleOptions.text,
                y: 0
            }).css((0, _utils.patchFontOptions)(subtitleOptions.font))
        }
    },
    _shiftSubtitle: function() {
        var that = this;
        var titleBox = that._titleElement.getBBox();
        var element = that._subtitleElement;
        var offset = that._options.subtitle.offset;
        element.move(0, titleBox.y + titleBox.height - element.getBBox().y - offset)
    },
    _updateBoundingRectAlignment: function() {
        var boundingRect = this._boundingRect;
        var options = this._options;
        boundingRect.verticalAlignment = options.verticalAlignment;
        boundingRect.horizontalAlignment = options.horizontalAlignment;
        boundingRect.cutLayoutSide = options.verticalAlignment;
        boundingRect.cutSide = "vertical";
        boundingRect.position = {
            horizontal: options.horizontalAlignment,
            vertical: options.verticalAlignment
        }
    },
    hasText: function() {
        return this._hasText
    },
    update: function(themeOptions, userOptions) {
        var that = this;
        var options = (0, _extend.extend)(true, {}, themeOptions, processTitleOptions(userOptions));
        var _hasText = hasText(options.text);
        var isLayoutChanged = _hasText || _hasText !== that._hasText;
        that._baseLineCorrection = 0;
        that._updateOptions(options);
        that._boundingRect = {};
        if (_hasText) {
            that._updateStructure();
            that._updateTexts()
        } else {
            that._group.linkRemove()
        }
        that._updateBoundingRect();
        that._updateBoundingRectAlignment();
        that._hasText = _hasText;
        return isLayoutChanged
    },
    draw: function(width, height) {
        var that = this;
        if (that._hasText) {
            that._group.linkAppend();
            that._correctTitleLength(width);
            if (that._group.getBBox().height > height) {
                this.freeSpace()
            }
        }
        return that
    },
    _correctTitleLength: function(width) {
        var that = this;
        var options = that._options;
        var margin = options.margin;
        var maxWidth = width - margin.left - margin.right;
        var placeholderSize = options.placeholderSize;
        processTitleLength(that._titleElement, options.text, maxWidth, options, placeholderSize);
        if (that._subtitleElement) {
            if (_Number(placeholderSize) > 0) {
                placeholderSize -= that._titleElement.getBBox().height
            }
            processTitleLength(that._subtitleElement, options.subtitle.text, maxWidth, options.subtitle, placeholderSize);
            that._shiftSubtitle()
        }
        that._updateBoundingRect();
        var _this$getCorrectedLay = this.getCorrectedLayoutOptions(),
            x = _this$getCorrectedLay.x,
            y = _this$getCorrectedLay.y,
            height = _this$getCorrectedLay.height;
        this._clipRect.attr({
            x: x,
            y: y,
            width: width,
            height: height
        })
    },
    getLayoutOptions: function() {
        return this._boundingRect || null
    },
    shift: function(x, y) {
        var that = this;
        var box = that.getLayoutOptions();
        that._group.move(x - box.x, y - box.y);
        return that
    },
    _updateBoundingRect: function() {
        var that = this;
        var options = that._options;
        var margin = options.margin;
        var boundingRect = that._boundingRect;
        var box = that._hasText ? that._group.getBBox() : {
            width: 0,
            height: 0,
            x: 0,
            y: 0,
            isEmpty: true
        };
        if (!box.isEmpty) {
            box.height += margin.top + margin.bottom - that._baseLineCorrection;
            box.width += margin.left + margin.right;
            box.x -= margin.left;
            box.y += that._baseLineCorrection - margin.top
        }
        if (options.placeholderSize > 0) {
            box.height = options.placeholderSize
        }
        boundingRect.height = box.height;
        boundingRect.width = box.width;
        boundingRect.x = box.x;
        boundingRect.y = box.y
    },
    getCorrectedLayoutOptions: function() {
        var srcBox = this.getLayoutOptions();
        var correction = this._baseLineCorrection;
        return (0, _extend.extend)({}, srcBox, {
            y: srcBox.y - correction,
            height: srcBox.height + correction
        })
    },
    layoutOptions: function() {
        if (!this._hasText) {
            return null
        }
        return {
            horizontalAlignment: this._boundingRect.horizontalAlignment,
            verticalAlignment: this._boundingRect.verticalAlignment,
            priority: 0
        }
    },
    measure: function(size) {
        this.draw(size[0], size[1]);
        return [this._boundingRect.width, this._boundingRect.height]
    },
    move: function(rect, fitRect) {
        var boundingRect = this._boundingRect;
        if (checkRect(rect, boundingRect)) {
            this.shift(fitRect[0], fitRect[1])
        } else {
            this.shift(Math.round(rect[0]), Math.round(rect[1]))
        }
    },
    freeSpace: function() {
        var that = this;
        that._params.incidentOccurred("W2103");
        that._group.linkRemove();
        that._boundingRect.width = that._boundingRect.height = 0
    },
    getOptions: function() {
        return this._options
    },
    changeLink: function(root) {
        this._group.linkRemove();
        this._group.linkOn(root, "title")
    }
});

function processTitleOptions(options) {
    var newOptions = (0, _type.isString)(options) ? {
        text: options
    } : options || {};
    newOptions.subtitle = (0, _type.isString)(newOptions.subtitle) ? {
        text: newOptions.subtitle
    } : newOptions.subtitle || {};
    return newOptions
}
var plugin = {
    name: "title",
    init: function() {
        var that = this;
        that._title = new Title({
            renderer: that._renderer,
            cssClass: that._rootClassPrefix + "-title",
            incidentOccurred: that._incidentOccurred
        });
        that._layout.add(that._title)
    },
    dispose: function() {
        this._title.dispose();
        this._title = null
    },
    customize: function(constructor) {
        constructor.addChange({
            code: "TITLE",
            handler: function() {
                if (this._title.update(this._themeManager.theme("title"), this.option("title"))) {
                    this._change(["LAYOUT"])
                }
            },
            isThemeDependent: true,
            option: "title",
            isOptionChange: true
        })
    },
    fontFields: ["title.font", "title.subtitle.font"]
};
exports.plugin = plugin;
