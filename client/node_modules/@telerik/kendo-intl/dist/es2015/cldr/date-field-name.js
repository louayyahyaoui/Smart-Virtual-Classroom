import { localeInfo } from './info';
import { errors } from '../errors';
import { DEFAULT_LOCALE } from '../common/constants';

export default function dateFieldName(options, locale = DEFAULT_LOCALE) {
    const info = localeInfo(locale);
    const dateFields = info.calendar.dateFields;
    if (!dateFields) {
        throw errors.NoDateFieldNames.error();
    }

    const fieldNameInfo = dateFields[options.type] || {};

    return fieldNameInfo[options.nameType] || fieldNameInfo['wide'];
}
