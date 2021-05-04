/**
* DevExtreme (ui/radio_group.d.ts)
* Version: 20.2.6
* Build date: Tue Mar 16 2021
*
* Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import DataSource from '../data/data_source';

import Editor, {
    EditorOptions
} from './editor/editor';

import {
    DataExpressionMixinOptions
} from './editor/ui.data_expression';

/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export interface dxRadioGroupOptions extends EditorOptions<dxRadioGroup>, DataExpressionMixinOptions<dxRadioGroup> {
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
     * Specifies the radio group layout.
     */
    layout?: 'horizontal' | 'vertical';
    /**
     * The value to be assigned to the `name` attribute of the underlying HTML element.
     */
    name?: string;
    /**
     * Specifies the UI component's value.
     */
    value?: any;
}
/**
 * The RadioGroup is a UI component that contains a set of radio buttons and allows an end user to make a single selection from the set.
 */
export default class dxRadioGroup extends Editor {
    constructor(element: Element, options?: dxRadioGroupOptions)
    constructor(element: JQuery, options?: dxRadioGroupOptions)
    getDataSource(): DataSource;
}

declare global {
interface JQuery {
    dxRadioGroup(): JQuery;
    dxRadioGroup(options: "instance"): dxRadioGroup;
    dxRadioGroup(options: string): any;
    dxRadioGroup(options: string, ...params: any[]): any;
    dxRadioGroup(options: dxRadioGroupOptions): JQuery;
}
}
/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export type Options = dxRadioGroupOptions;

/** @deprecated use Options instead */
/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export type IOptions = dxRadioGroupOptions;