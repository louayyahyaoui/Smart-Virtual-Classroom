import { cldr } from './info';
import loadNumbersInfo from './load-numbers';
import loadCalendarInfo from './load-dates';
import localeTerritory from './territory';

function loadLocale(locale, info) {
    for (let field in info) {
        if (field === "numbers") {
            loadNumbersInfo(locale, info[field]);
        } else if (field === "dates") {
            loadCalendarInfo(locale, info[field]);
        }
    }
}

export default function load() {
    const length = arguments.length;
    for (let idx = 0; idx < length; idx++) {
        let entry = arguments[idx];
        if (entry.main) {
            let locale = Object.keys(entry.main)[0];
            let info = entry.main[locale];
            let localeInfo = cldr[locale] = cldr[locale] || {};

            localeInfo.name = localeInfo.name || locale;
            localeInfo.identity = localeInfo.identity || info.identity;

            localeTerritory(localeInfo);
            loadLocale(locale, info);
        } else if (entry.supplemental) {
            if (entry.supplemental.weekData) {
                cldr.supplemental.weekData = {
                    firstDay: entry.supplemental.weekData.firstDay,
                    weekendStart: entry.supplemental.weekData.weekendStart,
                    weekendEnd: entry.supplemental.weekData.weekendEnd
                };
            } else if (entry.supplemental.likelySubtags) {
                cldr.supplemental.likelySubtags = Object.assign(cldr.supplemental.likelySubtags, entry.supplemental.likelySubtags);
            } else if (entry.supplemental.currencyData) {
                const currencyData = cldr.supplemental.currencyData;
                currencyData.region = Object.assign(currencyData.region || {}, entry.supplemental.currencyData.region);
                currencyData.fractions = Object.assign(currencyData.fractions || {}, entry.supplemental.currencyData.fractions);
            }
        }
    }
}
