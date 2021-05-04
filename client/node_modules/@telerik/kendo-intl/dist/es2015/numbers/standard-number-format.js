import { PERCENT, SCIENTIFIC, NUMBER_PLACEHOLDER, CURRENCY_PLACEHOLDER, PERCENT_PLACEHOLDER, EMPTY, POINT } from '../common/constants';
import isNegativeZero from '../common/is-negative-zero';
import formatCurrencySymbol from './format-currency-symbol';
import groupInteger from './group-integer';
import isCurrencyStyle from './is-currency-style';
import pad from '../common/pad';
import round from '../common/round';
import { currencyFractionOptions } from '../cldr';

const DEFAULT_DECIMAL_ROUNDING = 3;
const DEFAULT_PERCENT_ROUNDING = 0;

const trailingZeroRegex = /0+$/;

function fractionOptions(options) {
    let { minimumFractionDigits, maximumFractionDigits, style } = options;
    const isCurrency = isCurrencyStyle(style);
    let currencyFractions;
    if (isCurrency) {
        currencyFractions = currencyFractionOptions(options.currency);
    }

    if (minimumFractionDigits === undefined) {
        minimumFractionDigits = isCurrency ? currencyFractions.minimumFractionDigits : 0;
    }

    if (maximumFractionDigits === undefined) {
        if (style === PERCENT) {
            maximumFractionDigits = Math.max(minimumFractionDigits, DEFAULT_PERCENT_ROUNDING);
        } else if (isCurrency) {
            maximumFractionDigits = Math.max(minimumFractionDigits, currencyFractions.maximumFractionDigits);
        } else {
            maximumFractionDigits = Math.max(minimumFractionDigits, DEFAULT_DECIMAL_ROUNDING);
        }
    }

    return {
        minimumFractionDigits: minimumFractionDigits,
        maximumFractionDigits: maximumFractionDigits
    };
}

function applyPattern(value, pattern, symbol) {
    let result = EMPTY;
    for (let idx = 0, length = pattern.length; idx < length; idx++) {
        let ch = pattern.charAt(idx);

        if (ch === NUMBER_PLACEHOLDER) {
            result += value;
        } else if (ch === CURRENCY_PLACEHOLDER || ch === PERCENT_PLACEHOLDER) {
            result += symbol;
        } else {
            result += ch;
        }
    }
    return result;
}

function currencyUnitPattern(info, value) {
    const currencyInfo = info.numbers.currency;
    let pattern = value !== 1 ? currencyInfo["unitPattern-count-other"] : currencyInfo["unitPattern-count-one"];
    if (value < 0) {
        pattern = pattern.replace(NUMBER_PLACEHOLDER, `-${ NUMBER_PLACEHOLDER }`);
    }

    return pattern;
}


export default function standardNumberFormat(number, options, info) {
    const symbols = info.numbers.symbols;
    const { style } = options;
    const isCurrency = isCurrencyStyle(style);

    //return number in exponential format
    if (style === SCIENTIFIC) {
        let exponential = options.minimumFractionDigits !== undefined ? number.toExponential(options.minimumFractionDigits) : number.toExponential();
        return exponential.replace(POINT, symbols.decimal);
    }

    let value = number;
    let symbol;

    if (isCurrency) {
        options.value = value;
        symbol = formatCurrencySymbol(info, options);
    }

    if (style === PERCENT) {
        value *= 100;
        symbol = symbols.percentSign;
    }

    const { minimumFractionDigits, maximumFractionDigits } = fractionOptions(options);

    value = round(value, maximumFractionDigits);

    const negative = value < 0;
    const negativeZero = isNegativeZero(number);

    const parts = value.split(POINT);

    let integer = parts[0];
    let fraction = pad(parts[1] ? parts[1].replace(trailingZeroRegex, EMPTY) : EMPTY, minimumFractionDigits, true);

    //exclude "-" if number is negative.
    if (negative) {
        integer = integer.substring(1);
    }

    if (options.minimumIntegerDigits) {
        integer = pad(integer, options.minimumIntegerDigits);
    }

    let formattedValue = options.useGrouping !== false ? groupInteger(integer, 0, integer.length, options, info) : integer;

    if (fraction) {
        formattedValue += symbols.decimal + fraction;
    }

    let pattern;

    if (isCurrency && options.currencyDisplay === "name") {
        pattern = currencyUnitPattern(info, number);
    } else {
        const patterns = options.patterns;
        pattern = (negative || negativeZero) ? patterns[1] || ("-" + patterns[0]) : patterns[0];
    }

    if (pattern === NUMBER_PLACEHOLDER && !negative) {
        return formattedValue;
    }

    const result = applyPattern(formattedValue, pattern, symbol);

    return result;
}