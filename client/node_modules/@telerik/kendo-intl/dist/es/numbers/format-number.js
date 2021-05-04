import { localeInfo } from '../cldr';
import { DECIMAL, DEFAULT_LOCALE, NUMBER_PLACEHOLDER, EMPTY } from '../common/constants';
import standardNumberFormat from './standard-number-format';
import customNumberFormat from './custom-number-format';
import formatOptions from './format-options';

export default function formatNumber(number, format, locale) {
    if ( format === void 0 ) format = NUMBER_PLACEHOLDER;
    if ( locale === void 0 ) locale = DEFAULT_LOCALE;

    if (number === undefined || number === null) {
        return EMPTY;
    }

    if (!isFinite(number)) {
        return String(number);
    }

    var info = localeInfo(locale);
    var options = formatOptions(format);

    var result;
    if (options) {
        var style = options.style || DECIMAL;
        result = standardNumberFormat(number, Object.assign({}, info.numbers[style], options), info);
    } else {
        result = customNumberFormat(number, format, info);
    }

    return result;
}
