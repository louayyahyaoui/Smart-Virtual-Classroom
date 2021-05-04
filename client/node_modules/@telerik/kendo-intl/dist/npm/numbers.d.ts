/**
 * Settings for the `formatNumber` and `parseNumber` functions.
 * {% platform_content angular %}
 * For a runnable example, refer to the article on
 * [date and number formatting and parsing]({% slug parsingandformatting_intl %}#toc-number-formatting).
 * {% endplatform_content %}
 */
export interface NumberFormatOptions {

    /**
     * Specifies the format style.
     */
    style?: 'decimal' | 'currency' | 'percent' | 'scientific' | 'accounting';

    /**
     * Defines the currency code of the currency that is used in the formatting.
     * If not specified, the default currency for the locale is used.
     */
    currency?: string;

    /**
     * Specifies how to display the currency.
     */
    currencyDisplay?: 'symbol' | 'code' | 'name';

    /**
     * Specifies whether to use grouping separators.
     */
    useGrouping?: boolean;

    /**
     * Defines the minimum number of integer digits that will be used in the formatting.
     */
    minimumIntegerDigits?: number;

    /**
     * Defines the minimum number of fraction digits that will be used.
     * The default value of the decimal and percent formatting is `0` (zero).
     * The default value of the currency formatting is the number of digits for the currency from the supplemental `currencyData`.
     * If no information about the currency is provided, the default value of the currency formatting is `2`.
     */
    minimumFractionDigits?: number;

    /**
     * Defines the maximum number of fraction digits that will be used.
     * The default value of the decimal formatting is the greater one between `minimumFractionDigits` and `3`.
     * The default value of the currency formatting is the greater one between `minimumFractionDigits` and the number of digits for the currency from the supplemental `currencyData`.
     * If no information about the currency is provided, the default value of the currency formatting is the greater one between `minimumFractionDigits` and `2`.
     * The default value of the percent formatting is the greater one between `minimumFractionDigits` and `0` (zero).
     */
    maximumFractionDigits?: number;
}

/**
 * Converts a string into a `Number` based on the specified locale.
 * {% platform_content angular %}
 * For a runnable example, refer to the article on
 * [date and number formatting and parsing]({% slug parsingandformatting_intl %}#toc-number-parsing).
 * {% endplatform_content %}
 *
 * @param value - The string that will be parsed.
 * @param locale - The locale `id` that defines the locale whose information should be used to parse the string.
 * @param format - The format that is used to parse the string. Useful when non-default currencies are parsed.
 * @returns - The parsed number.
 */
export function parseNumber(value: string, locale?: string, format?: string|NumberFormatOptions): number;

/**
 * Converts a `Number` into a string based on the specified format and locale.
 * {% platform_content angular %}
 * For a runnable example, refer to the article on
 * [date and number formatting and parsing]({% slug parsingandformatting_intl %}#toc-number-formatting).
 * {% endplatform_content %}
 *
 * @param value - The number that will be formatted.
 * @param format - The format that will be applied.
 * @param locale - The locale `id` that defines the locale whose information should be used for the formatting.
 * @returns - The formatted number.
 */
export function formatNumber(value: number, format: string|NumberFormatOptions, locale?: string): string;
