import { getLocaleInfo } from './info';
import { EMPTY } from '../common/constants';

function lowerArray(arr) {
    const result = [];
    for (let idx = 0; idx < arr.length; idx++) {
        result.push(arr[idx].toLowerCase());
    }
    return result;
}

function lowerObject(obj) {
    const result = {};
    for (let field in obj) {
        result[field] = obj[field].toLowerCase();
    }
    return result;
}

function cloneLower(obj) {
    let result = Array.isArray(obj) ? lowerArray(obj) : lowerObject(obj);
    return result;
}

export default function dateFormatNames(locale, options) {
    const { type, nameType, standAlone, lower } = options;
    const info = getLocaleInfo(locale);
    const formatType = standAlone ? "stand-alone" : "format";
    const lowerNameType = (lower ? "lower-" : EMPTY) + nameType;
    const formatNames = info.calendar[type][formatType];
    let result = formatNames[lowerNameType];
    if (!result && lower) {
        result = formatNames[lowerNameType] = cloneLower(formatNames[nameType]);
    }
    return result;
}