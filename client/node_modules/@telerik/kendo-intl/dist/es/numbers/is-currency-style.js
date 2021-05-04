import { CURRENCY, ACCOUNTING } from '../common/constants';

export default function isCurrencyStyle(style) {
    return style === CURRENCY || style === ACCOUNTING;
}