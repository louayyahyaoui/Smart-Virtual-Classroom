import defaultData from './default-data';
import isString from '../common/is-string';
import { errors } from '../errors';

function availableLocaleInfo(fullName, suffixes) {
    const parts = fullName.split("-");
    const language = parts[0];
    const script = parts[1];
    const territory = parts[2];

    return cldr[fullName] || (suffixes.indexOf(territory) !== -1 && cldr[language + "-" + territory]) || (suffixes.indexOf(script) !== -1 && cldr[language + "-" + script]) || cldr[language];
}

function localeFullName(language, suffixes) {
    const likelySubtags = cldr.supplemental.likelySubtags;

    for (let idx = 0; idx < suffixes.length; idx++) {
        let name = likelySubtags[language + "-" + suffixes[idx ]];
        if (name) {
            return name;
        }
    }

    if (likelySubtags[language]) {
        return likelySubtags[language];
    }
}

export const cldr = defaultData;

export function getLocaleInfo(locale) {
    let info;
    if (isString(locale)) {
        info = localeInfo(locale);
    } else {
        info = locale;
    }
    return info;
}

export function localeInfo(locale) {
    if (cldr[locale]) {
        return cldr[locale];
    }

    const likelySubtags = cldr.supplemental.likelySubtags;
    if (likelySubtags) {
        const parts = locale.split("-");
        const language = parts[0];
        const suffixes = parts.slice(1);
        const fullName = localeFullName(language, suffixes);
        const info = fullName ? availableLocaleInfo(fullName, suffixes) : null;
        if (info) {
            return info;
        }
    }

    throw errors.NoLocale.error(locale);
}
