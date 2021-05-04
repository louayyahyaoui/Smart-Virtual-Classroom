import { CURRENCY, ACCOUNTING, DECIMAL, PERCENT, SCIENTIFIC } from '../common/constants';
import isString from '../common/is-string';

const standardFormatRegExp = /^(n|c|p|e|a)(\d*)$/i;

function standardFormatOptions(format) {
    const formatAndPrecision = standardFormatRegExp.exec(format);

    if (formatAndPrecision) {
        const options = {
            style: DECIMAL
        };

        let style = formatAndPrecision[1].toLowerCase();

        if (style === "c") {
            options.style = CURRENCY;
        } else if (style === "a") {
            options.style = ACCOUNTING;
        } else if (style === "p") {
            options.style = PERCENT;
        } else if (style === "e") {
            options.style = SCIENTIFIC;
        }

        if (formatAndPrecision[2]) {
            options.minimumFractionDigits = options.maximumFractionDigits = parseInt(formatAndPrecision[2], 10);
        }

        return options;
    }
}

export default function formatOptions(format) {
    let options;
    if (isString(format)) {
        options = standardFormatOptions(format);
    } else {
        options = format;
    }

    return options;
}