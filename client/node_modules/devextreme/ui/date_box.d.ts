/**
* DevExtreme (ui/date_box.d.ts)
* Version: 20.2.6
* Build date: Tue Mar 16 2021
*
* Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import {
    dxCalendarOptions
} from './calendar';

import dxDropDownEditor, {
    dxDropDownEditorOptions
} from './drop_down_editor/ui.drop_down_editor';

import {
    format
} from './widget/ui.widget';

/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export interface dxDateBoxOptions extends dxDropDownEditorOptions<dxDateBox> {
    /**
     * Specifies whether or not adaptive UI component rendering is enabled on a small screen.
     */
    adaptivityEnabled?: boolean;
    /**
     * The text displayed on the Apply button.
     */
    applyButtonText?: string;
    /**
     * 
     */
    calendarOptions?: dxCalendarOptions;
    /**
     * The text displayed on the Cancel button.
     */
    cancelButtonText?: string;
    /**
     * Specifies the message displayed if the specified date is later than the max value or earlier than the min value.
     */
    dateOutOfRangeMessage?: string;
    /**
     * Specifies the date-time value serialization format. Use it only if you do not specify the value at design time.
     */
    dateSerializationFormat?: string;
    /**
     * Specifies dates that users cannot select. Applies only if pickerType is 'calendar'.
     */
    disabledDates?: Array<Date> | ((data: { component?: dxDateBox, date?: Date, view?: string }) => boolean);
    /**
     * Specifies the date display format. Ignored if the pickerType property is 'native'
     */
    displayFormat?: format;
    /**
     * Specifies the interval between neighboring values in the popup list in minutes.
     */
    interval?: number;
    /**
     * Specifies the message displayed if the typed value is not a valid date or time.
     */
    invalidDateMessage?: string;
    /**
     * The last date that can be selected within the UI component.
     */
    max?: Date | number | string;
    /**
     * The minimum date that can be selected within the UI component.
     */
    min?: Date | number | string;
    /**
     * Specifies the type of the date/time picker.
     */
    pickerType?: 'calendar' | 'list' | 'native' | 'rollers';
    /**
     * Specifies a placeholder for the input field.
     */
    placeholder?: string;
    /**
     * Specifies whether to show the analog clock in the value picker. Applies only if type is 'datetime' and pickerType is 'calendar'.
     */
    showAnalogClock?: boolean;
    /**
     * A format used to display date/time information.
     */
    type?: 'date' | 'datetime' | 'time';
    /**
     * Specifies whether to control user input using a mask created based on the displayFormat.
     */
    useMaskBehavior?: boolean;
    /**
     * An object or a value specifying the date and time currently selected using the date box.
     */
    value?: Date | number | string;
}
/**
 * The DateBox is a UI component that displays date and time in a specified format, and enables a user to pick or type in the required date/time value.
 */
export default class dxDateBox extends dxDropDownEditor {
    constructor(element: Element, options?: dxDateBoxOptions)
    constructor(element: JQuery, options?: dxDateBoxOptions)
    /**
     * Closes the drop-down editor.
     */
    close(): void;
    /**
     * Opens the drop-down editor.
     */
    open(): void;
}

declare global {
interface JQuery {
    dxDateBox(): JQuery;
    dxDateBox(options: "instance"): dxDateBox;
    dxDateBox(options: string): any;
    dxDateBox(options: string, ...params: any[]): any;
    dxDateBox(options: dxDateBoxOptions): JQuery;
}
}
/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export type Options = dxDateBoxOptions;

/** @deprecated use Options instead */
/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export type IOptions = dxDateBoxOptions;