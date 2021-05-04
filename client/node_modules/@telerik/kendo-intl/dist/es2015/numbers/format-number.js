import { localeInfo } from '../cldr';
import { DECIMAL, DEFAULT_LOCALE, NUMBER_PLACEHOLDER, EMPTY } from '../common/constants';
import standardNumberFormat from './standard-number-format';
import customNumberFormat from './custom-number-format';
import formatOptions from './format-options';

export default function formatNumber(number, format = NUMBER_PLACEHOLDER, locale = DEFAULT_LOCALE) {
    if (number === undefined || number === null) {
        return EMPTY;
    }

    if (!isFinite(number)) {
        return String(number);
    }

    const info = localeInfo(locale);
    const options = formatOptions(format);

    let result;
    if (options) {
        const style = options.style || DECIMAL;
        result = standardNumberFormat(number, Object.assign({}, info.numbers[style], options), info);
    } else {
        result = customNumberFormat(number, format, info);
    }

    return result;
}
