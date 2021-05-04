/**
* DevExtreme (ui/range_slider.d.ts)
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
    dxSliderBaseOptions
} from './slider';

import dxTrackBar from './track_bar';
/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export interface dxRangeSliderOptions extends dxSliderBaseOptions<dxRangeSlider> {
    /**
     * The right edge of the interval currently selected using the range slider.
     */
    end?: number;
    /**
     * The value to be assigned to the name attribute of the underlying `` element.
     */
    endName?: string;
    /**
     * A function that is executed after the UI component's value is changed.
     */
    onValueChanged?: ((e: { component?: dxRangeSlider, element?: dxElement, model?: any, start?: number, end?: number, value?: Array<number> }) => any);
    /**
     * The left edge of the interval currently selected using the range slider.
     */
    start?: number;
    /**
     * The value to be assigned to the name attribute of the underlying `` element.
     */
    startName?: string;
    /**
     * Specifies the UI component's value.
     */
    value?: Array<number>;
}
/**
 * The RangeSlider is a UI component that allows an end user to choose a range of numeric values.
 */
export default class dxRangeSlider extends dxTrackBar {
    constructor(element: Element, options?: dxRangeSliderOptions)
    constructor(element: JQuery, options?: dxRangeSliderOptions)
}

declare global {
interface JQuery {
    dxRangeSlider(): JQuery;
    dxRangeSlider(options: "instance"): dxRangeSlider;
    dxRangeSlider(options: string): any;
    dxRangeSlider(options: string, ...params: any[]): any;
    dxRangeSlider(options: dxRangeSliderOptions): JQuery;
}
}
/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export type Options = dxRangeSliderOptions;

/** @deprecated use Options instead */
/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export type IOptions = dxRangeSliderOptions;