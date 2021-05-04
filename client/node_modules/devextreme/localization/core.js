/**
 * DevExtreme (localization/core.js)
 * Version: 20.2.6
 * Build date: Tue Mar 16 2021
 *
 * Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
exports.default = void 0;
var _dependency_injector = _interopRequireDefault(require("../core/utils/dependency_injector"));
var _parent_locales = _interopRequireDefault(require("./cldr-data/parent_locales"));
var _parentLocale = _interopRequireDefault(require("./parentLocale"));

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        "default": obj
    }
}
var DEFAULT_LOCALE = "en";
var _default = (0, _dependency_injector.default)({
    locale: function() {
        var currentLocale = DEFAULT_LOCALE;
        return function(locale) {
            if (!locale) {
                return currentLocale
            }
            currentLocale = locale
        }
    }(),
    getValueByClosestLocale: function(getter) {
        var locale = this.locale();
        var value = getter(locale);
        var isRootLocale;
        while (!value && !isRootLocale) {
            locale = (0, _parentLocale.default)(_parent_locales.default, locale);
            if (locale) {
                value = getter(locale)
            } else {
                isRootLocale = true
            }
        }
        if (void 0 === value && locale !== DEFAULT_LOCALE) {
            return getter(DEFAULT_LOCALE)
        }
        return value
    }
});
exports.default = _default;
module.exports = exports.default;
