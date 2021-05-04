import { cldr, getLocaleInfo } from './info';
import { errors } from '../errors';
import localeTerritory from './territory';
import parseRangeDate from './parse-range-date';

/* eslint-disable consistent-return */

const {
    NoCurrency,
    NoCurrencyDisplay,
    NoSupplementalCurrency,
    NoCurrencyRegion,
    NoValidCurrency
} = errors;

const DEFAULT_CURRENCY_FRACTIONS = 2;
const SYMBOL = "symbol";
const INVALID_CURRENCY_CODE = 'XXX';

const GLOBAL_CURRENCIES = {
    '001': 'USD', // 001 refers to world. not sure if it is correct to assume USD but seems better than throw an error
    '150': 'EUR' // 150 territory for Europe

};

function getCurrencyInfo(locale, currency, throwIfNoValid) {
    const info = getLocaleInfo(locale);
    const currencies = info.numbers.currencies;
    if (!currencies) {
        if (throwIfNoValid) {
            throw NoCurrency.error();
        }

        return;
    }

    const currencyDisplayInfo = currencies[currency];

    if (!currencyDisplayInfo) {
        if (throwIfNoValid) {
            throw NoCurrencyDisplay.error();
        }

        return;
    }

    return currencyDisplayInfo;
}

function lengthComparer(a, b) {
    return b.length - a.length;
}

function regionCurrency(regionCurrencies) {
    let latestValidUntil, latestValidUntilRange;
    let latestStillValid, latestStillValidDate;

    for (let idx = 0; idx < regionCurrencies.length; idx++) {
        const currency = regionCurrencies[idx];
        const code = Object.keys(currency)[0];
        const info = currency[code];
        if (code !== INVALID_CURRENCY_CODE && info._tender !== 'false' && info._from) {
            if (!info._to) {
                const stillValidDate = parseRangeDate(info._from);
                if (!latestStillValidDate || latestStillValidDate < stillValidDate) {
                    latestStillValid = code;
                    latestStillValidDate = stillValidDate;
                }
            } else if (!latestStillValid) {
                const validFrom = parseRangeDate(info._from);
                const validTo = parseRangeDate(info._to);
                if (!latestValidUntilRange || latestValidUntilRange.to < validTo || latestValidUntilRange.from < validFrom) {
                    latestValidUntil = code;
                    latestValidUntilRange = {
                        from: validFrom,
                        to: validTo
                    };
                }
            }
        }
    }

    return latestStillValid || latestValidUntil;
}

export function currencyDisplays(locale, currency, throwIfNoValid = true) {
    const currencyInfo = getCurrencyInfo(locale, currency, throwIfNoValid);
    if (!currencyInfo) {
        return;
    }

    if (!currencyInfo.displays) {
        const displays = [ currency ];
        for (let field in currencyInfo) {
            displays.push(currencyInfo[field]);
        }
        displays.sort(lengthComparer);
        currencyInfo.displays = displays;
    }

    return currencyInfo.displays;
}

export function currencyDisplay(locale, options) {
    const { value, currency, currencyDisplay = SYMBOL } = options;

    if (currencyDisplay === "code") {
        return currency;
    }

    const currencyInfo = getCurrencyInfo(locale, currency, true);
    let result;

    if (currencyDisplay === SYMBOL) {
        result = currencyInfo["symbol-alt-narrow"] || currencyInfo[SYMBOL];
    } else {
        if (typeof value === undefined || value !== 1) {
            result = currencyInfo["displayName-count-other"];
        } else {
            result = currencyInfo["displayName-count-one"];
        }
    }

    return result;
}

export function currencyFractionOptions(code) {
    let minimumFractionDigits = DEFAULT_CURRENCY_FRACTIONS;
    let maximumFractionDigits = DEFAULT_CURRENCY_FRACTIONS;

    const fractions = ((cldr.supplemental.currencyData || {}).fractions || {})[code];

    if (fractions && fractions._digits) {
        maximumFractionDigits = minimumFractionDigits = parseInt(fractions._digits, 10);
    }

    return {
        minimumFractionDigits: minimumFractionDigits,
        maximumFractionDigits: maximumFractionDigits
    };
}

export function territoryCurrencyCode(territory, throwIfNoValid = true) {
    if (GLOBAL_CURRENCIES[territory]) {
        return GLOBAL_CURRENCIES[territory];
    }

    const currencyData = cldr.supplemental.currencyData;
    if (!currencyData) {
        if (throwIfNoValid) {
            throw NoSupplementalCurrency.error();
        }

        return;
    }

    const regionCurrencies = currencyData.region[territory];

    if (!regionCurrencies) {
        if (throwIfNoValid) {
            throw NoCurrencyRegion.error(territory);
        }

        return;
    }

    const currencyCode = regionCurrency(regionCurrencies);

    return currencyCode;
}

export function localeCurrency(locale, throwIfNoValid) {
    const info = getLocaleInfo(locale);
    const numbers = info.numbers;

    if (!numbers.localeCurrency) {
        const currency = territoryCurrencyCode(localeTerritory(info), throwIfNoValid);

        if (!currency && throwIfNoValid) {
            throw NoValidCurrency.error(info.name);
        }

        numbers.localeCurrency = currency;
    }

    return numbers.localeCurrency;
}
