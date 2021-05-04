/**
 * Settings for the dateFormatNames function.
 */
export interface DateFormatNameOptions {
    /**
     * Specifies the type of the names.
     */
    type: 'dayPeriods' | 'days' | 'months' | 'quarters' | 'eras';

    /**
     * Specifies the form of the names.
     */
    nameType: 'abbreviated' | 'narrow' | 'short' | 'wide';

    /**
     * Specifies whether the returned names should be converted to lower case.
     */
    lower?: boolean;

    /**
     * Specifies whether the standalone names should be returned.
     */
    standAlone?: boolean;
}

/**
 * Returns the names from the specified locale based on the options.
 *
 * @param locale - The locale `id` which defines the locale from which the names should be retrieved.
 * @param options - The options that determine the returned names.
 * @returns - The date format names.
 */
export function dateFormatNames(locale: string, options: DateFormatNameOptions): any;

/**
 * Settings for the `dateFieldName` function.
 */
export interface DateFieldNameOptions {
    /**
     * Specifies the type of names.
     */
    type: 'era'         |
          'year'        |
          'quarter'     |
          'month'       |
          'week'        |
          'day'         |
          'weekday'     |
          'dayperiod'   |
          'hour'        |
          'minute'      |
          'second'      |
          'millisecond' |
          'zone';

    /**
     * Specifies the names form.
     */
    nameType?: 'wide' | 'narrow' | 'short';
}

/**
 * Returns a localized date-field name based on a specific format specifier.
 *
 * The available `type` values are:
 * - `era`
 * - `year`
 * - `quarter`
 * - `month`
 * - `week`
 * - `day`
 * - `dayperiod`
 * - `hour`
 * - `minute`
 * - `second`
 * - `zone`
 *
 * The available `nameType` values are:
 * - `wide`
 * - `narrow`
 * - `short`
 *
 * @param options - Detailed configuration for the desired date-field name.
 * @param locale - The optional locale `id`. If not specified, the `id` of the `"en"` locale is used.
 * @returns - The localized date-field name from the current locale based on the option.
 *
 *
 * @example
 * ```
 * dateFieldName({ type: 'day' });                      //returns 'day';
 * dateFieldName({ type: 'day', nameType: 'wide' });    //returns 'day';
 * dateFieldName({ type: 'month', nameType: 'short' }); //returns 'mo.';
 * dateFieldName({ type: 'month', nameType: 'wide' });  //returns 'month';
 * ```
 */
export function dateFieldName(options: DateFieldNameOptions, locale?: string): string;

/**
 * Returns the first-day index starting from Sunday and based on the specified locale.
 *
 * @param locale - The locale `id`.
 * @returns - The first-day index.
 */
export function firstDay(locale: string): number;

/**
 * The weekend start and end days.
 */
export interface DayRange {
    start: number;
    end: number;
}

/**
 * Returns the weekend start and end days.
 *
 * @param locale - The locale `id`.
 * @returns - The weekend range.
 */
export function weekendRange(locale: string): DayRange;

/**
 * Loads CLDR data.
 *
 * @param data - The CLDR data to be loaded. Accepts multiple parameters.
 */
export function load(...data: any[]): void;

/**
 * Returns the number symbols from the specified locale.
 *
 * @param locale - The locale `id` that defines the locale for which the number symbols should be returned.
 * @returns - The number symbols.
 */
export function numberSymbols(locale: string): any;

/**
 * @hidden
 */
export function setData(data: any): void;

/**
 * @hidden
 */
export interface CurrencyDisplayOptions {
    currency: string;
    currencyDisplay?: string;
    value?: number;
}

/**
 * @hidden
 */
export function currencyDisplay(locale: string, options: CurrencyDisplayOptions): any;

/**
 * @hidden
 */
export function currencyDisplays(locale: string, currency: string): any;

/**
 * @hidden
 */
export function currencyFractionOptions(locale: string): any;

/**
 * @hidden
 */
export function localeCurrency(locale: string): any;

/**
 * @hidden
 */
export function localeInfo(locale: string): any;

/**
 * @hidden
 */
export function territoryCurrencyCode(territory: string): any;
