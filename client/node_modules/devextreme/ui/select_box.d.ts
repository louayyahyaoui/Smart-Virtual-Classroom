/**
* DevExtreme (ui/select_box.d.ts)
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
    template
} from '../core/templates/template';

import dxDropDownList, {
    dxDropDownListOptions
} from './drop_down_editor/ui.drop_down_list';

/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export interface dxSelectBoxOptions<T = dxSelectBox> extends dxDropDownListOptions<T> {
    /**
     * Specifies whether the UI component allows a user to enter a custom value. Requires the onCustomItemCreating handler implementation.
     */
    acceptCustomValue?: boolean;
    /**
     * Specifies a custom template for the text field. Must contain the TextBox UI component.
     */
    fieldTemplate?: template | ((selectedItem: any, fieldElement: dxElement) => string | Element | JQuery);
    /**
     * A function that is executed when a user adds a custom item. Requires acceptCustomValue to be set to true.
     */
    onCustomItemCreating?: ((e: { component?: T, element?: dxElement, model?: any, text?: string, customItem?: string | any | Promise<any> | JQueryPromise<any> }) => any);
    /**
     * Specifies whether a user can open the drop-down list by clicking a text field.
     */
    openOnFieldClick?: boolean;
    /**
     * The text that is provided as a hint in the select box editor.
     */
    placeholder?: string;
    /**
     * Specifies whether the drop-down button is visible.
     */
    showDropDownButton?: boolean;
    /**
     * Specifies whether or not to display selection controls.
     */
    showSelectionControls?: boolean;
    /**
     * Specifies the DOM events after which the UI component's value should be updated. Applies only if acceptCustomValue is set to true.
     */
    valueChangeEvent?: string;
}
/**
 * The SelectBox UI component is an editor that allows an end user to select an item from a drop-down list.
 */
export default class dxSelectBox extends dxDropDownList {
    constructor(element: Element, options?: dxSelectBoxOptions)
    constructor(element: JQuery, options?: dxSelectBoxOptions)
}

declare global {
interface JQuery {
    dxSelectBox(): JQuery;
    dxSelectBox(options: "instance"): dxSelectBox;
    dxSelectBox(options: string): any;
    dxSelectBox(options: string, ...params: any[]): any;
    dxSelectBox(options: dxSelectBoxOptions): JQuery;
}
}
/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export type Options = dxSelectBoxOptions;

/** @deprecated use Options instead */
/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export type IOptions = dxSelectBoxOptions;