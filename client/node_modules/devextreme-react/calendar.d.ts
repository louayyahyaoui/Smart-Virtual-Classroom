/*!
 * devextreme-react
 * Version: 20.2.6
 * Build date: Tue Mar 16 2021
 *
 * Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
 *
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file in the root of the project for details.
 *
 * https://github.com/DevExpress/devextreme-react
 */

/// <reference types="react" />
import dxCalendar, { IOptions } from "devextreme/ui/calendar";
import { Component as BaseComponent, IHtmlOptions } from "./core/component";
interface ICalendarOptions extends IOptions, IHtmlOptions {
    cellRender?: (...params: any) => React.ReactNode;
    cellComponent?: React.ComponentType<any>;
    cellKeyFn?: (data: any) => string;
    defaultValue?: any;
    defaultZoomLevel?: any;
    onValueChange?: (value: any) => void;
    onZoomLevelChange?: (value: any) => void;
}
declare class Calendar extends BaseComponent<ICalendarOptions> {
    get instance(): dxCalendar;
    protected _WidgetClass: typeof dxCalendar;
    protected subscribableOptions: string[];
    protected independentEvents: string[];
    protected _defaults: {
        defaultValue: string;
        defaultZoomLevel: string;
    };
    protected _templateProps: {
        tmplOption: string;
        render: string;
        component: string;
        keyFn: string;
    }[];
}
export default Calendar;
export { Calendar, ICalendarOptions };
