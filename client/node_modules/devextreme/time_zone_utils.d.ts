/**
* DevExtreme (time_zone_utils.d.ts)
* Version: 20.2.6
* Build date: Tue Mar 16 2021
*
* Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
/**
 * A time zone object.
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export interface dxSchedulerTimeZone {
    /**
     * A time zone text string from the IANA database.
     * Warning! This type is used for internal purposes. Do not import it directly.
     */
    id: string;
    /**
     * A GMT offset.
     * Warning! This type is used for internal purposes. Do not import it directly.
     */
    offset: number;
    /**
     * A time zone in the following format: `(GMT ±[hh]:[mm]) [id]`.
     * Warning! This type is used for internal purposes. Do not import it directly.
     */
    title: string;
}

/**
 * Gets the list of IANA time zone objects.
 */
export function getTimeZones(date?: Date): Array<dxSchedulerTimeZone>;