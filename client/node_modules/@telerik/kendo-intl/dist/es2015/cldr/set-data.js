import { cldr } from './info';

export default function setData(data) {
    const locale = data.name;
    const info = cldr[locale] = cldr[locale] || {};
    const supplemental = cldr.supplemental = cldr.supplemental || {};

    if (data.likelySubtags) {
        supplemental.likelySubtags = Object.assign(supplemental.likelySubtags || {}, data.likelySubtags);
    }

    if (data.currencyData) {
        supplemental.currencyData = supplemental.currencyData || {};
        supplemental.currencyData.fractions = Object.assign(supplemental.currencyData.fractions || {}, data.currencyData);
    }

    const numbers = info.numbers;

    Object.assign(info, data);

    if (numbers && data.numbers) {
        info.numbers = Object.assign({}, numbers, data.numbers);
    }
}