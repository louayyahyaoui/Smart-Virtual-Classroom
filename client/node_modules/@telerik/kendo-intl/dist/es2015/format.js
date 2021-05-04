import { formatDate } from './dates';
import { formatNumber } from './numbers';
import { EMPTY } from './common/constants';
import isDate from './common/is-date';
import isNumber from './common/is-number';

const formatRegExp = /\{(\d+)(:[^\}]+)?\}/g;

export function toString(value, format, locale) {
    if (format) {
        if (isDate(value)) {
            return formatDate(value, format, locale);
        } else if (isNumber(value)) {
            return formatNumber(value, format, locale);
        }
    }

    return value !== undefined && value !== null ? value : EMPTY;
}

export function format(format, values, locale) {
    return format.replace(formatRegExp, function(match, index, placeholderFormat) {
        let value = values[parseInt(index, 10)];

        return toString(value, placeholderFormat ? placeholderFormat.substring(1) : EMPTY, locale);
    });
}
