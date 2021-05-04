/**
* DevExtreme (ui/slider.d.ts)
* Version: 20.2.6
* Build date: Tue Mar 16 2021
*
* Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import dxTrackBar, {
    dxTrackBarOptions
} from './track_bar';

import {
    format
} from './widget/ui.widget';

/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export interface dxSliderOptions extends dxSliderBaseOptions<dxSlider> {
    /**
     * The current slider value.
     */
    value?: number;
}
/**
 * The Slider is a UI component that allows an end user to set a numeric value on a continuous range of possible values.
 */
export default class dxSlider extends dxTrackBar {
    constructor(element: Element, options?: dxSliderOptions)
    constructor(element: JQuery, options?: dxSliderOptions)
}

/**
 * 
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export interface dxSliderBaseOptions<T> extends dxTrackBarOptions<T> {
    /**
     * Specifies whether or not the UI component changes its state when interacting with a user.
     */
    activeStateEnabled?: boolean;
    /**
     * Specifies whether the UI component can be focused using keyboard navigation.
     */
    focusStateEnabled?: boolean;
    /**
     * Specifies whether the UI component changes its state when a user pauses on it.
     */
    hoverStateEnabled?: boolean;
    /**
     * Specifies the step by which a handle moves when a user presses Page Up or Page Down.
     */
    keyStep?: number;
    /**
     * Configures the labels displayed at the min and max values.
     */
    label?: { format?: format, position?: 'bottom' | 'top', visible?: boolean };
    /**
     * The value to be assigned to the `name` attribute of the underlying HTML element.
     */
    name?: string;
    /**
     * Specifies whether to highlight the selected range.
     */
    showRange?: boolean;
    /**
     * Specifies the step by which the UI component's value changes when a user drags a handler.
     */
    step?: number;
    /**
     * Configures a tooltip.
     */
    tooltip?: { enabled?: boolean, format?: format, position?: 'bottom' | 'top', showMode?: 'always' | 'onHover' };
}

declare global {
interface JQuery {
    dxSlider(): JQuery;
    dxSlider(options: "instance"): dxSlider;
    dxSlider(options: string): any;
    dxSlider(options: string, ...params: any[]): any;
    dxSlider(options: dxSliderOptions): JQuery;
}
}
/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export type Options = dxSliderOptions;

/** @deprecated use Options instead */
/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export type IOptions = dxSliderOptions;