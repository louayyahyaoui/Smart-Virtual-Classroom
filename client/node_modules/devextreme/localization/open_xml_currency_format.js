/**
 * DevExtreme (localization/open_xml_currency_format.js)
 * Version: 20.2.6
 * Build date: Tue Mar 16 2021
 *
 * Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
exports.default = void 0;
var _default = function(currencySymbol, accountingFormat) {
    if (!accountingFormat) {
        return
    }
    var encodedCurrencySymbol = currencySymbol;
    if ("string" === typeof currencySymbol) {
        encodedCurrencySymbol = "";
        for (var i = 0; i < currencySymbol.length; i++) {
            if ("$" !== currencySymbol[i]) {
                encodedCurrencySymbol += "\\"
            }
            encodedCurrencySymbol += currencySymbol[i]
        }
    }
    var encodeSymbols = {
        ".00": "{0}",
        "'": "\\'",
        "\\(": "\\(",
        "\\)": "\\)",
        " ": "\\ ",
        '"': "&quot;",
        "\\\xa4": encodedCurrencySymbol
    };
    var result = accountingFormat.split(";");
    for (var _i = 0; _i < result.length; _i++) {
        for (var symbol in encodeSymbols) {
            if (Object.prototype.hasOwnProperty.call(encodeSymbols, symbol)) {
                result[_i] = result[_i].replace(new RegExp(symbol, "g"), encodeSymbols[symbol])
            }
        }
    }
    return 2 === result.length ? result[0] + "_);" + result[1] : result[0]
};
exports.default = _default;
module.exports = exports.default;
