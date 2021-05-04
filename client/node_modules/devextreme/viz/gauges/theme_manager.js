/**
 * DevExtreme (viz/gauges/theme_manager.js)
 * Version: 20.2.6
 * Build date: Tue Mar 16 2021
 *
 * Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
exports.default = void 0;
var _extend2 = require("../../core/utils/extend");
var _base_theme_manager = require("../core/base_theme_manager");
var _extend = _extend2.extend;
var ThemeManager = _base_theme_manager.BaseThemeManager.inherit({
    ctor: function(options) {
        this.callBase.apply(this, arguments);
        this._subTheme = options.subTheme
    },
    _initializeTheme: function() {
        var that = this;
        var subTheme;
        if (that._subTheme) {
            subTheme = _extend(true, {}, that._theme[that._subTheme], that._theme);
            _extend(true, that._theme, subTheme)
        }
        that.callBase.apply(that, arguments)
    }
});
var _default = {
    ThemeManager: ThemeManager
};
exports.default = _default;
module.exports = exports.default;
