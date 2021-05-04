/**
* DevExtreme (ui/progress_bar.d.ts)
* Version: 20.2.6
* Build date: Tue Mar 16 2021
*
* Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import '../jquery_augmentation';

import {
    dxElement
} from '../core/element';

import {
    event
} from '../events/index';

import dxTrackBar, {
    dxTrackBarOptions
} from './track_bar';

/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export interface dxProgressBarOptions extends dxTrackBarOptions<dxProgressBar> {
    /**
     * A function that is executed when the value reaches the maximum.
     */
    onComplete?: ((e: { component?: dxProgressBar, element?: dxElement, model?: any, event?: event }) => any);
    /**
     * Specifies whether or not the UI component displays a progress status.
     */
    showStatus?: boolean;
    /**
     * Specifies a format for the progress status.
     */
    statusFormat?: string | ((ratio: number, value: number) => string);
    /**
     * The current UI component value.
     */
    value?: number;
}
/**
 * The ProgressBar is a UI component that shows current progress.
 */
export default class dxProgressBar extends dxTrackBar {
    constructor(element: Element, options?: dxProgressBarOptions)
    constructor(element: JQuery, options?: dxProgressBarOptions)
}

declare global {
interface JQuery {
    dxProgressBar(): JQuery;
    dxProgressBar(options: "instance"): dxProgressBar;
    dxProgressBar(options: string): any;
    dxProgressBar(options: string, ...params: any[]): any;
    dxProgressBar(options: dxProgressBarOptions): JQuery;
}
}
/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export type Options = dxProgressBarOptions;

/** @deprecated use Options instead */
/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export type IOptions = dxProgressBarOptions;
