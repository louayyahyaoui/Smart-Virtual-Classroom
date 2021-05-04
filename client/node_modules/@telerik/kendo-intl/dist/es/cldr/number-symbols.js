import { getLocaleInfo } from './info';

export default function numberSymbols(locale) {
    var info = getLocaleInfo(locale);

    return info.numbers.symbols;
}