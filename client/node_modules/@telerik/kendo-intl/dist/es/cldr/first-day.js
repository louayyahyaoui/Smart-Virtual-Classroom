import { cldr, getLocaleInfo } from './info';
import localeTerritory from './territory';

import { DAYS_OF_WEEK, DEFAULT_TERRITORY } from './constants';
import { errors } from '../errors';

var NoWeekData = errors.NoWeekData;
var NoFirstDay = errors.NoFirstDay;

export default function firstDay(locale) {
    var info = getLocaleInfo(locale);

    if (!isNaN(info.firstDay)) {
        return info.firstDay;
    }

    var weekData = cldr.supplemental.weekData;
    if (!weekData) {
        throw NoWeekData.error();
    }

    var firstDay = weekData.firstDay[localeTerritory(info)] || weekData.firstDay[DEFAULT_TERRITORY];

    if (!firstDay) {
        throw NoFirstDay.error();
    }

    info.firstDay = DAYS_OF_WEEK.indexOf(firstDay);

    return info.firstDay;
}
