/**
* DevExtreme (ui/load_indicator.d.ts)
* Version: 20.2.6
* Build date: Tue Mar 16 2021
*
* Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import Widget, {
    WidgetOptions
} from './widget/ui.widget';

/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export interface dxLoadIndicatorOptions extends WidgetOptions<dxLoadIndicator> {
    /**
     * Specifies the path to an image used as the indicator.
     */
    indicatorSrc?: string;
}
/**
 * The LoadIndicator is a UI element notifying the viewer that a process is in progress.
 */
export default class dxLoadIndicator extends Widget {
    constructor(element: Element, options?: dxLoadIndicatorOptions)
    constructor(element: JQuery, options?: dxLoadIndicatorOptions)
}

declare global {
interface JQuery {
    dxLoadIndicator(): JQuery;
    dxLoadIndicator(options: "instance"): dxLoadIndicator;
    dxLoadIndicator(options: string): any;
    dxLoadIndicator(options: string, ...params: any[]): any;
    dxLoadIndicator(options: dxLoadIndicatorOptions): JQuery;
}
}
/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export type Options = dxLoadIndicatorOptions;

/** @deprecated use Options instead */
/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export type IOptions = dxLoadIndicatorOptions;