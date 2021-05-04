import { cldr, getLocaleInfo } from './info';
import localeTerritory from './territory';

import { DAYS_OF_WEEK, DEFAULT_TERRITORY } from './constants';
import { errors } from '../errors';

var NoWeekData = errors.NoWeekData;

export default function weekendRange(locale) {
    var info = getLocaleInfo(locale);

    if (info.weekendRange) {
        return info.weekendRange;
    }

    var weekData = cldr.supplemental.weekData;
    if (!weekData) {
        throw NoWeekData.error();
    }

    var territory = localeTerritory(info);
    var start = weekData.weekendStart[territory] || weekData.weekendStart[DEFAULT_TERRITORY];
    var end = weekData.weekendEnd[territory] || weekData.weekendEnd[DEFAULT_TERRITORY];

    info.weekendRange = {
        start: DAYS_OF_WEEK.indexOf(start),
        end: DAYS_OF_WEEK.indexOf(end)
    };

    return info.weekendRange;
}
