import { PERCENT_PLACEHOLDER, CURRENCY_PLACEHOLDER, CURRENCY, PERCENT, EMPTY } from '../common/constants';
import formatCurrencySymbol from './format-currency-symbol';

const literalRegExp = /(\\.)|(['][^']*[']?)|(["][^"]*["]?)/g;
const PLACEHOLDER = "__??__";

export function setStyleOptions(formatOptions, info) {
    const format = formatOptions.format;

    //multiply number if the format has percent
    if (format.indexOf(PERCENT_PLACEHOLDER) !== -1) {
        formatOptions.style = PERCENT;
        formatOptions.symbol = info.numbers.symbols.percentSign;
        formatOptions.number *= 100;
    }

    if (format.indexOf(CURRENCY_PLACEHOLDER) !== -1) {
        formatOptions.style = CURRENCY;
        formatOptions.symbol = formatCurrencySymbol(info);
    }
}

export function setFormatLiterals(formatOptions) {
    let format = formatOptions.format;
    if (format.indexOf("'") > -1 || format.indexOf("\"") > -1 || format.indexOf("\\") > -1) {
        const literals = formatOptions.literals = [];
        formatOptions.format = format.replace(literalRegExp, function(match) {
            const quoteChar = match.charAt(0).replace("\\", EMPTY);
            const literal = match.slice(1).replace(quoteChar, EMPTY);

            literals.push(literal);

            return PLACEHOLDER;
        });
    }
}

export function replaceLiterals(number, literals) {
    let result = number;
    if (literals) {
        const length = literals.length;
        for (let idx = 0; idx < length; idx++) {
            result = result.replace(PLACEHOLDER, literals[idx]);
        }
    }
    return result;
}