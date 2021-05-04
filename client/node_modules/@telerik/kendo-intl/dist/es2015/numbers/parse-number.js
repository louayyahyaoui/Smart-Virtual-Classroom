import { localeInfo, localeCurrency, currencyDisplays } from '../cldr';
import { PERCENT, NUMBER_PLACEHOLDER, CURRENCY_PLACEHOLDER, DEFAULT_LOCALE, EMPTY, POINT } from '../common/constants';
import { setStyleOptions, setFormatLiterals } from './utils';
import isNumber from '../common/is-number';
import isCurrencyStyle from './is-currency-style';
import formatOptions from './format-options';
import isString from '../common/is-string';

const exponentRegExp = /[eE][\-+]?[0-9]+/;
const nonBreakingSpaceRegExp = /\u00A0/g;

function cleanNegativePattern(number, patterns) {
    if (patterns.length > 1) {
        const parts = (patterns[1] || EMPTY).replace(CURRENCY_PLACEHOLDER, EMPTY).split(NUMBER_PLACEHOLDER);
        if (number.indexOf(parts[0]) > -1 && number.indexOf(parts[1]) > -1) {
            return number.replace(parts[0], EMPTY).replace(parts[1], EMPTY);
        }
    }
}

function cleanCurrencyNumber(value, info, format) {
    const options = formatOptions(format) || {};
    let isCurrency = isCurrencyStyle(options.style);
    let number = value;
    let negative;

    const currency = options.currency || localeCurrency(info, isCurrency);

    if (currency) {
        const displays = currencyDisplays(info, currency, isCurrency);
        if (displays) {
            for (let idx = 0; idx < displays.length; idx++) {
                let display = displays[idx];
                if (number.includes(display)) {
                    number = number.replace(display, EMPTY);
                    isCurrency = true;
                    break;
                }
            }
        }

        if (isCurrency) {
            const cleanNumber = cleanNegativePattern(number, info.numbers.currency.patterns) ||
                cleanNegativePattern(number, info.numbers.accounting.patterns);

            if (cleanNumber) {
                negative = true;
                number = cleanNumber;
            }

        }
    }

    return {
        number: number,
        negative: negative
    };
}

function cleanLiterals(number, formatOptions) {
    const literals = formatOptions.literals;
    let result = number;

    if (literals) {
        for (let idx = 0; idx < literals.length; idx++) {
            result = result.replace(literals[idx], EMPTY);
        }
    }

    return result;
}

export default function parseNumber(value, locale = DEFAULT_LOCALE, format = {}) {
    if (!value && value !== 0) {
        return null;
    }

    if (isNumber(value)) {
        return value;
    }

    const info = localeInfo(locale);
    const symbols = info.numbers.symbols;

    let number = value.toString();
    let formatOptions = format || {};
    let isPercent;

    if (isString(format)) {
        formatOptions = { format: format };
        setFormatLiterals(formatOptions);
        number = cleanLiterals(number, formatOptions);

        setStyleOptions(formatOptions, info);
    }

    if (formatOptions.style === PERCENT || number.indexOf(symbols.percentSign) > -1) {
        number = number.replace(symbols.percentSign, EMPTY);
        isPercent = true;
    }

    if (exponentRegExp.test(number)) {
        number = parseFloat(number.replace(symbols.decimal, POINT));
        return isNaN(number) ? null : number;
    }

    const { negative: negativeCurrency, number: currencyNumber } = cleanCurrencyNumber(number, info, formatOptions);
    number = String(currencyNumber).trim();

    const negativeSignIndex = number.indexOf("-");
    if (negativeSignIndex > 0) {
        return null;
    }

    let isNegative = negativeSignIndex > -1;

    isNegative = negativeCurrency !== undefined ? negativeCurrency : isNegative;

    number = number.replace("-", EMPTY)
          .replace(nonBreakingSpaceRegExp, " ")
          .split(symbols.group.replace(nonBreakingSpaceRegExp, " ")).join(EMPTY)
          .replace(symbols.decimal, POINT);

    number = parseFloat(number);

    if (isNaN(number)) {
        number = null;
    } else if (isNegative) {
        number *= -1;
    }

    if (number && isPercent) {
        number /= 100;
    }

    return number;
}
