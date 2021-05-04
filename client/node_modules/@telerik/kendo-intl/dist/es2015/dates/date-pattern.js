import formatString from '../common/format-string';
import isString from '../common/is-string';
import { EMPTY } from '../common/constants';

const REMOVAL_PENALTY = 120;
const ADDITION_PENALTY = 20;
const LENGHT_DELTA = [ 2, 1, 5, 3, 4 ];
const LONG_LESS_PENALTY_DELTA = -2;
const SHORT_LESS_PENALTY_DELTA = -1;
const SHORT_MORE_PENALTY_DELTA = 1;
const LONG_MORE_PENALTY_DELTA = 2;

const PENALTIES = {
    [LONG_LESS_PENALTY_DELTA.toString()]: 8,
    [SHORT_LESS_PENALTY_DELTA.toString()]: 6,
    [LONG_MORE_PENALTY_DELTA.toString()]: 6,
    [SHORT_MORE_PENALTY_DELTA.toString()]: 3
};

const VALUE_FORMAT_LENGTH = {
    numeric: 1,
    "2-digit": 2,
    short: 3,
    long: 4,
    narrow: 5
};

const TIME_SPECIFIERS_REGEX = /[hHmsSzZoOvVxX]/;

function getHourSpecifier(options) {
    return options.hour12 ? "h" : "H";
}

const DATE_OPTIONS_MAP = [ {
    key: "era",
    specifier: "G"
}, {
    key: "year",
    specifier: "y"
}, {
    key: "month",
    specifier: "M"
}, {
    key: "day",
    specifier: "d"
}, {
    key: "weekday",
    specifier: "E"
}, {
    key: "hour",
    getSpecifier: getHourSpecifier
}, {
    key: "minute",
    specifier: "m"
}, {
    key: "second",
    specifier: "s"
}, {
    key: "timeZoneName",
    specifier: "z"
} ];

const STAND_ALONE_SPECIFIERS = {
    e: 'c',
    E: 'c',
    M: 'L',
    Q: 'q'
};

const specifiersRegex = {};
const resolvedFormats = {};

function getSpecifierRegex(specifier) {
    if (!specifiersRegex[specifier]) {
        specifiersRegex[specifier] = new RegExp(specifier + "+");
    }
    return specifiersRegex[specifier];
}

function skeletonSpecifiers(skeleton) {
    const result = [];
    let current = skeleton.charAt(0);
    let specifier = current;
    for (let idx = 1; idx < skeleton.length; idx++) {
        let character = skeleton.charAt(idx);
        if (character === specifier) {
            current += character;
        } else {
            result.push(current);
            current = specifier = character;
        }
    }

    result.push(current);

    return result;
}

function findBestMatch(specifiers, availableFormats) {
    const specifiersLength = specifiers.length;
    let maxScore = -Number.MAX_VALUE;
    let bestMatches, result;
    for (let format in availableFormats) {
        const matches = [];
        let currentFormat = format.replace("v", "z");
        let score = 0;
        for (let idx = 0; idx < specifiersLength; idx++) {
            const specifier = specifiers[idx];
            let specifierRegex = getSpecifierRegex(specifier[0]);
            let match = (specifierRegex.exec(currentFormat) || [])[0];

            if (!match) {
                score -= REMOVAL_PENALTY;
            } else {
                currentFormat = currentFormat.replace(match, EMPTY);
                if (match.length !== specifier.length) {
                    let delta = Math.max(Math.min(LENGHT_DELTA[match.length] - LENGHT_DELTA[specifier.length], 2), -2);
                    score -= PENALTIES[delta];
                }
            }

            matches.push(match);

            if (score < maxScore) {
                break;
            }
        }

        if (currentFormat.length) {
            score -= skeletonSpecifiers(currentFormat).length * ADDITION_PENALTY;
        }

        if (score > maxScore) {
            maxScore = score;
            bestMatches = matches;
            result = availableFormats[format];
        }
    }

    result = result.replace("v", "z");

    for (let idx = 0; idx < specifiersLength; idx++) {
        const bestMatch = bestMatches[idx];
        if (bestMatch && bestMatch !== specifiers[idx]) {
            const matchSpecifier = bestMatches[idx][0];
            result = result.replace(getSpecifierRegex(matchSpecifier), specifiers[idx]);
            if (STAND_ALONE_SPECIFIERS[matchSpecifier]) {
                result = result.replace(getSpecifierRegex(STAND_ALONE_SPECIFIERS[matchSpecifier]), specifiers[idx]);
            }
        }
    }

    return result;
}

function cacheFormat(skeleton, format, locale) {
    if (!resolvedFormats[locale]) {
        resolvedFormats[locale] = {};
    }
    resolvedFormats[locale][skeleton] = format;
}


function skeletonFormat(skeleton, info) {
    const availableFormats = info.calendar.dateTimeFormats.availableFormats;
    if (availableFormats[skeleton]) {
        return availableFormats[skeleton];
    }
    if (resolvedFormats[info.name] && resolvedFormats[info.name][skeleton]) {
        return resolvedFormats[info.name][skeleton];
    }
    const timeStartIndex = skeleton.search(TIME_SPECIFIERS_REGEX);
    let result;
    if (timeStartIndex > 0) {
        const dateSkeleton = skeleton.substr(0, timeStartIndex);
        const timeSkeleton = skeleton.substr(timeStartIndex);

        result = formatString(info.calendar.dateTimeFormats.short, //should be deterimed based on specifiers
            availableFormats[timeSkeleton] || findBestMatch(skeletonSpecifiers(timeSkeleton), availableFormats),
            availableFormats[dateSkeleton] || findBestMatch(skeletonSpecifiers(dateSkeleton), availableFormats));
    } else {
        result = findBestMatch(skeletonSpecifiers(skeleton), availableFormats);
    }

    cacheFormat(skeleton, result, info.name);
    return result;
}

function skeletonFromOptions(options) {
    let result = [];
    for (let idx = 0; idx < DATE_OPTIONS_MAP.length; idx++) {
        let option = DATE_OPTIONS_MAP[idx];
        let field = option.key;
        let value = options[field];
        if (value) {
            let spcifier = option.specifier || option.getSpecifier(options);
            result.push(spcifier.repeat(VALUE_FORMAT_LENGTH[value]));
        }
    }

    return result.join(EMPTY);
}

export default function datePattern(format, info) {
    const calendar = info.calendar;
    let result;
    if (isString(format)) {
        if (calendar.patterns[format]) {
            result = calendar.patterns[format];
        } else {
            result = format;
        }
    } else if (format) {
        if (format.pattern) {
            return format.pattern;
        }

        let skeleton = format.skeleton;
        if (!skeleton) {
            if (format.datetime) {
                result = formatString(calendar.dateTimeFormats[format.datetime], calendar.timeFormats[format.datetime], calendar.dateFormats[format.datetime]);
            } else if (format.date) {
                result = calendar.dateFormats[format.date];
            } else if (format.time) {
                result = calendar.timeFormats[format.time];
            } else {
                skeleton = skeletonFromOptions(format);
            }
        }

        if (skeleton) {
            result = skeletonFormat(skeleton, info);
        }
    }

    if (!result) {
        result = calendar.patterns.d;
    }

    return result;
}
