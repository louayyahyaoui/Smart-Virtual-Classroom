import { getLocaleInfo } from './info';

export default function numberSymbols(locale) {
    const info = getLocaleInfo(locale);

    return info.numbers.symbols;
}