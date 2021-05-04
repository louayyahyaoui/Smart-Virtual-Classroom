import { localeInfo } from './info';
import { errors } from '../errors';
import { DEFAULT_LOCALE } from '../common/constants';

export default function dateFieldName(options, locale) {
    if ( locale === void 0 ) locale = DEFAULT_LOCALE;

    var info = localeInfo(locale);
    var dateFields = info.calendar.dateFields;
    if (!dateFields) {
        throw errors.NoDateFieldNames.error();
    }

    var fieldNameInfo = dateFields[options.type] || {};

    return fieldNameInfo[options.nameType] || fieldNameInfo['wide'];
}
