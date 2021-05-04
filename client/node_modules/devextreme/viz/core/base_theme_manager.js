/**
 * DevExtreme (viz/core/base_theme_manager.js)
 * Version: 20.2.6
 * Build date: Tue Mar 16 2021
 *
 * Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
exports.BaseThemeManager = void 0;
var _class = _interopRequireDefault(require("../../core/class"));
var _extend2 = require("../../core/utils/extend");
var _type = require("../../core/utils/type");
var _iterator = require("../../core/utils/iterator");
var _palette = require("../palette");
var _utils = require("./utils");
var _themes = require("../themes");
require("./themes/generic.light");
require("./themes/generic.dark");
require("./themes/generic.contrast");
require("./themes/generic.carmine");
require("./themes/generic.darkmoon");
require("./themes/generic.softblue");
require("./themes/generic.darkviolet");
require("./themes/generic.greenmist");
require("./themes/material");

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        "default": obj
    }
}
var _getTheme = _themes.getTheme;
var _addCacheItem = _themes.addCacheItem;
var _removeCacheItem = _themes.removeCacheItem;
var _extend = _extend2.extend;
var _each = _iterator.each;

function getThemePart(theme, path) {
    var _theme = theme;
    path && _each(path.split("."), function(_, pathItem) {
        return _theme = _theme[pathItem]
    });
    return _theme
}
var BaseThemeManager = _class.default.inherit({
    ctor: function(options) {
        this._themeSection = options.themeSection;
        this._fontFields = options.fontFields || [];
        _addCacheItem(this)
    },
    dispose: function() {
        var that = this;
        _removeCacheItem(that);
        that._callback = that._theme = that._font = null;
        return that
    },
    setCallback: function(callback) {
        this._callback = callback;
        return this
    },
    setTheme: function(theme, rtl) {
        this._current = theme;
        this._rtl = rtl;
        return this.refresh()
    },
    refresh: function() {
        var that = this;
        var current = that._current || {};
        var theme = _getTheme(current.name || current);
        that._themeName = theme.name;
        that._defaultPalette = theme.defaultPalette;
        that._font = _extend({}, theme.font, current.font);
        that._themeSection && _each(that._themeSection.split("."), function(_, path) {
            theme = _extend(true, {}, theme[path])
        });
        that._theme = _extend(true, {}, theme, (0, _type.isString)(current) ? {} : current);
        that._initializeTheme();
        if ((0, _utils.parseScalar)(that._rtl, that._theme.rtlEnabled)) {
            _extend(true, that._theme, that._theme._rtl)
        }
        that._callback();
        return that
    },
    theme: function(path) {
        return getThemePart(this._theme, path)
    },
    themeName: function() {
        return this._themeName
    },
    createPalette: function(palette, options) {
        return (0, _palette.createPalette)(palette, options, this._defaultPalette)
    },
    createDiscretePalette: function(palette, count) {
        return (0, _palette.getDiscretePalette)(palette, count, this._defaultPalette)
    },
    createGradientPalette: function(palette) {
        return (0, _palette.getGradientPalette)(palette, this._defaultPalette)
    },
    getAccentColor: function(palette) {
        return (0, _palette.getAccentColor)(palette, this._defaultPalette)
    },
    _initializeTheme: function() {
        var that = this;
        _each(that._fontFields || [], function(_, path) {
            that._initializeFont(getThemePart(that._theme, path))
        })
    },
    _initializeFont: function(font) {
        _extend(font, this._font, _extend({}, font))
    }
});
exports.BaseThemeManager = BaseThemeManager;
