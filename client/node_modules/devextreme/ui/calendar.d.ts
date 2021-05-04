/**
* DevExtreme (ui/calendar.d.ts)
* Version: 20.2.6
* Build date: Tue Mar 16 2021
*
* Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import {
    dxElement
} from '../core/element';

import {
    template
} from '../core/templates/template';

import Editor, {
    EditorOptions
} from './editor/editor';

/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export interface dxCalendarOptions extends EditorOptions<dxCalendar> {
    /**
     * Specifies whether or not the UI component changes its state when interacting with a user.
     */
    activeStateEnabled?: boolean;
    /**
     * Specifies a custom template for calendar cells.
     */
    cellTemplate?: template | ((itemData: { date?: Date, view?: string, text?: string }, itemIndex: number, itemElement: dxElement) => string | Element | JQuery);
    /**
     * Specifies the date-time value serialization format. Use it only if you do not specify the value at design time.
     */
    dateSerializationFormat?: string;
    /**
     * Specifies dates that users cannot select.
     */
    disabledDates?: Array<Date> | ((data: { component?: any, date?: Date, view?: string }) => boolean);
    /**
     * Specifies the first day of a week.
     */
    firstDayOfWeek?: 0 | 1 | 2 | 3 | 4 | 5 | 6;
    /**
     * Specifies whether the UI component can be focused using keyboard navigation.
     */
    focusStateEnabled?: boolean;
    /**
     * Specifies whether the UI component changes its state when a user pauses on it.
     */
    hoverStateEnabled?: boolean;
    /**
     * The latest date the UI component allows to select.
     */
    max?: Date | number | string;
    /**
     * Specifies the maximum zoom level of the calendar.
     */
    maxZoomLevel?: 'century' | 'decade' | 'month' | 'year';
    /**
     * The earliest date the UI component allows to select.
     */
    min?: Date | number | string;
    /**
     * Specifies the minimum zoom level of the calendar.
     */
    minZoomLevel?: 'century' | 'decade' | 'month' | 'year';
    /**
     * The value to be assigned to the `name` attribute of the underlying HTML element.
     */
    name?: string;
    /**
     * Specifies whether or not the UI component displays a button that selects the current date.
     */
    showTodayButton?: boolean;
    /**
     * An object or a value specifying the date and time currently selected in the calendar.
     */
    value?: Date | number | string;
    /**
     * Specifies the current calendar zoom level.
     */
    zoomLevel?: 'century' | 'decade' | 'month' | 'year';
}
/**
 * The Calendar is a UI component that displays a calendar and allows an end user to select the required date within a specified date range.
 */
export default class dxCalendar extends Editor {
    constructor(element: Element, options?: dxCalendarOptions)
    constructor(element: JQuery, options?: dxCalendarOptions)
}

declare global {
interface JQuery {
    dxCalendar(): JQuery;
    dxCalendar(options: "instance"): dxCalendar;
    dxCalendar(options: string): any;
    dxCalendar(options: string, ...params: any[]): any;
    dxCalendar(options: dxCalendarOptions): JQuery;
}
}
/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export type Options = dxCalendarOptions;

/** @deprecated use Options instead */
/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export type IOptions = dxCalendarOptions;