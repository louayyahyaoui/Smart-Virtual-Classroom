/**
 * DevExtreme (localization/globalize/currency.js)
 * Version: 20.2.6
 * Build date: Tue Mar 16 2021
 *
 * Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
var _open_xml_currency_format = _interopRequireDefault(require("../open_xml_currency_format"));
require("./core");
require("./number");
require("../currency");
require("globalize/currency");
var _globalize = _interopRequireDefault(require("globalize"));
var _config = _interopRequireDefault(require("../../core/config"));
var _number2 = _interopRequireDefault(require("../number"));

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        "default": obj
    }
}

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
var enCurrencyUSD = {
    main: {
        en: {
            identity: {
                version: {
                    _cldrVersion: "28",
                    _number: "$Revision: 11972 $"
                },
                language: "en"
            },
            numbers: {
                currencies: {
                    USD: {
                        displayName: "US Dollar",
                        "displayName-count-one": "US dollar",
                        "displayName-count-other": "US dollars",
                        symbol: "$",
                        "symbol-alt-narrow": "$"
                    }
                }
            }
        }
    }
};
var currencyData = {
    supplemental: {
        version: {
            _cldrVersion: "28",
            _unicodeVersion: "8.0.0",
            _number: "$Revision: 11969 $"
        },
        currencyData: {
            fractions: {
                DEFAULT: {
                    _rounding: "0",
                    _digits: "2"
                }
            }
        }
    }
};
if (_globalize.default && _globalize.default.formatCurrency) {
    if ("en" === _globalize.default.locale().locale) {
        _globalize.default.load(enCurrencyUSD, currencyData);
        _globalize.default.locale("en")
    }
    var formattersCache = {};
    var getFormatter = function(currency, format) {
        var formatter;
        var formatCacheKey;
        if ("object" === _typeof(format)) {
            formatCacheKey = _globalize.default.locale().locale + ":" + currency + ":" + JSON.stringify(format)
        } else {
            formatCacheKey = _globalize.default.locale().locale + ":" + currency + ":" + format
        }
        formatter = formattersCache[formatCacheKey];
        if (!formatter) {
            formatter = formattersCache[formatCacheKey] = _globalize.default.currencyFormatter(currency, format)
        }
        return formatter
    };
    var globalizeCurrencyLocalization = {
        _formatNumberCore: function(value, format, formatConfig) {
            if ("currency" === format) {
                var currency = formatConfig && formatConfig.currency || (0, _config.default)().defaultCurrency;
                return getFormatter(currency, this._normalizeFormatConfig(format, formatConfig, value))(value)
            }
            return this.callBase.apply(this, arguments)
        },
        _normalizeFormatConfig: function(format, formatConfig, value) {
            var config = this.callBase(format, formatConfig, value);
            if ("currency" === format) {
                config.style = "accounting"
            }
            return config
        },
        format: function(value, _format) {
            if ("number" !== typeof value) {
                return value
            }
            _format = this._normalizeFormat(_format);
            if (_format) {
                if ("default" === _format.currency) {
                    _format.currency = (0, _config.default)().defaultCurrency
                }
                if ("currency" === _format.type) {
                    return this._formatNumber(value, this._parseNumberFormatString("currency"), _format)
                } else {
                    if (!_format.type && _format.currency) {
                        return getFormatter(_format.currency, _format)(value)
                    }
                }
            }
            return this.callBase.apply(this, arguments)
        },
        getCurrencySymbol: function(currency) {
            if (!currency) {
                currency = (0, _config.default)().defaultCurrency
            }
            return _globalize.default.cldr.main("numbers/currencies/" + currency)
        },
        getOpenXmlCurrencyFormat: function(currency) {
            var currencySymbol = this.getCurrencySymbol(currency).symbol;
            var accountingFormat = _globalize.default.cldr.main("numbers/currencyFormats-numberSystem-latn").accounting;
            return (0, _open_xml_currency_format.default)(currencySymbol, accountingFormat)
        }
    };
    _number2.default.inject(globalizeCurrencyLocalization)
}
