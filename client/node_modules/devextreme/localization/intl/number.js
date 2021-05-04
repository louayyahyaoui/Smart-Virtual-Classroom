/**
 * DevExtreme (localization/intl/number.js)
 * Version: 20.2.6
 * Build date: Tue Mar 16 2021
 *
 * Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
exports.default = void 0;
var _config = _interopRequireDefault(require("../../core/config"));
var _core = _interopRequireDefault(require("../core"));
var _open_xml_currency_format = _interopRequireDefault(require("../open_xml_currency_format"));
var _accounting_formats = _interopRequireDefault(require("../cldr-data/accounting_formats"));

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        "default": obj
    }
}
var detectCurrencySymbolRegex = /([^\s0]+)?(\s*)0*[.,]*0*(\s*)([^\s0]+)?/;
var formattersCache = {};
var getFormatter = function(format) {
    var key = _core.default.locale() + "/" + JSON.stringify(format);
    if (!formattersCache[key]) {
        formattersCache[key] = new Intl.NumberFormat(_core.default.locale(), format).format
    }
    return formattersCache[key]
};
var getCurrencyFormatter = function(currency) {
    return new Intl.NumberFormat(_core.default.locale(), {
        style: "currency",
        currency: currency
    })
};
var _default = {
    engine: function() {
        return "intl"
    },
    _formatNumberCore: function(value, format, formatConfig) {
        if ("exponential" === format) {
            return this.callBase.apply(this, arguments)
        }
        return getFormatter(this._normalizeFormatConfig(format, formatConfig, value))(value)
    },
    _normalizeFormatConfig: function(format, formatConfig, value) {
        var config;
        if ("decimal" === format) {
            config = {
                minimumIntegerDigits: formatConfig.precision || void 0,
                useGrouping: false,
                maximumFractionDigits: String(value).length,
                round: value < 0 ? "ceil" : "floor"
            }
        } else {
            config = this._getPrecisionConfig(formatConfig.precision)
        }
        if ("percent" === format) {
            config.style = "percent"
        } else {
            if ("currency" === format) {
                config.style = "currency";
                config.currency = formatConfig.currency || (0, _config.default)().defaultCurrency
            }
        }
        return config
    },
    _getPrecisionConfig: function(precision) {
        var config;
        if (null === precision) {
            config = {
                minimumFractionDigits: 0,
                maximumFractionDigits: 20
            }
        } else {
            config = {
                minimumFractionDigits: precision || 0,
                maximumFractionDigits: precision || 0
            }
        }
        return config
    },
    format: function(value, _format) {
        if ("number" !== typeof value) {
            return value
        }
        _format = this._normalizeFormat(_format);
        if ("default" === _format.currency) {
            _format.currency = (0, _config.default)().defaultCurrency
        }
        if (!_format || "function" !== typeof _format && !_format.type && !_format.formatter) {
            return getFormatter(_format)(value)
        }
        return this.callBase.apply(this, arguments)
    },
    _getCurrencySymbolInfo: function(currency) {
        var formatter = getCurrencyFormatter(currency);
        return this._extractCurrencySymbolInfo(formatter.format(0))
    },
    _extractCurrencySymbolInfo: function(currencyValueString) {
        var match = detectCurrencySymbolRegex.exec(currencyValueString) || [];
        var position = match[1] ? "before" : "after";
        var symbol = match[1] || match[4] || "";
        var delimiter = match[2] || match[3] || "";
        return {
            position: position,
            symbol: symbol,
            delimiter: delimiter
        }
    },
    getCurrencySymbol: function(currency) {
        if (!currency) {
            currency = (0, _config.default)().defaultCurrency
        }
        var symbolInfo = this._getCurrencySymbolInfo(currency);
        return {
            symbol: symbolInfo.symbol
        }
    },
    getOpenXmlCurrencyFormat: function(currency) {
        var targetCurrency = currency || (0, _config.default)().defaultCurrency;
        var currencySymbol = this._getCurrencySymbolInfo(targetCurrency).symbol;
        var closestAccountingFormat = _core.default.getValueByClosestLocale(function(locale) {
            return _accounting_formats.default[locale]
        });
        return (0, _open_xml_currency_format.default)(currencySymbol, closestAccountingFormat)
    }
};
exports.default = _default;
module.exports = exports.default;
