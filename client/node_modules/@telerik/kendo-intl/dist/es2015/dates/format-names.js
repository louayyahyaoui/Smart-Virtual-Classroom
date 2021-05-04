import dateFormatNames from '../cldr/date-format-names';
import dateNameType from './date-name-type';

export default function formatNames(locale, type, formatLength, standAlone, lower) {
    return dateFormatNames(locale, {
        type: type,
        nameType: dateNameType(formatLength),
        standAlone: standAlone,
        lower: lower
    });
}