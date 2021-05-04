import { cldr, getLocaleInfo } from './info';
import localeTerritory from './territory';

import { DAYS_OF_WEEK, DEFAULT_TERRITORY } from './constants';
import { errors } from '../errors';

const { NoWeekData } = errors;

export default function weekendRange(locale) {
    const info = getLocaleInfo(locale);

    if (info.weekendRange) {
        return info.weekendRange;
    }

    const weekData = cldr.supplemental.weekData;
    if (!weekData) {
        throw NoWeekData.error();
    }

    const territory = localeTerritory(info);
    const start = weekData.weekendStart[territory] || weekData.weekendStart[DEFAULT_TERRITORY];
    const end = weekData.weekendEnd[territory] || weekData.weekendEnd[DEFAULT_TERRITORY];

    info.weekendRange = {
        start: DAYS_OF_WEEK.indexOf(start),
        end: DAYS_OF_WEEK.indexOf(end)
    };

    return info.weekendRange;
}
