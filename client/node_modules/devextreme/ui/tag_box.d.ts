/**
* DevExtreme (ui/tag_box.d.ts)
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

import dxSelectBox, {
    dxSelectBoxOptions
} from './select_box';

/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export interface dxTagBoxOptions extends dxSelectBoxOptions<dxTagBox> {
    /**
     * Specifies how the UI component applies values.
     */
    applyValueMode?: 'instantly' | 'useButtons';
    /**
     * A Boolean value specifying whether or not to hide selected items.
     */
    hideSelectedItems?: boolean;
    /**
     * Specifies the limit on displayed tags. On exceeding it, the UI component replaces all tags with a single multi-tag that displays the number of selected items.
     */
    maxDisplayedTags?: number;
    /**
     * A Boolean value specifying whether or not the UI component is multiline.
     */
    multiline?: boolean;
    /**
     * A function that is executed before the multi-tag is rendered.
     */
    onMultiTagPreparing?: ((e: { component?: dxTagBox, element?: dxElement, model?: any, multiTagElement?: dxElement, selectedItems?: Array<string | number | any>, text?: string, cancel?: boolean }) => any);
    /**
     * A function that is executed when the 'Select All' check box value is changed. Applies only if showSelectionControls is true.
     */
    onSelectAllValueChanged?: ((e: { component?: dxTagBox, element?: dxElement, model?: any, value?: boolean }) => any);
    /**
     * A function that is executed when a list item is selected or selection is canceled.
     */
    onSelectionChanged?: ((e: { component?: dxTagBox, element?: dxElement, model?: any, addedItems?: Array<string | number | any>, removedItems?: Array<string | number | any> }) => any);
    /**
     * Specifies the mode in which all items are selected.
     */
    selectAllMode?: 'allPages' | 'page';
    /**
     * Gets the currently selected items.
     */
    selectedItems?: Array<string | number | any>;
    /**
     * Specifies whether the drop-down button is visible.
     */
    showDropDownButton?: boolean;
    /**
     * Specifies whether the multi-tag is shown without ordinary tags.
     */
    showMultiTagOnly?: boolean;
    /**
     * Specifies a custom template for tags.
     */
    tagTemplate?: template | ((itemData: any, itemElement: dxElement) => string | Element | JQuery);
    /**
     * Specifies the selected items.
     */
    value?: Array<string | number | any>;
}
/**
 * The TagBox UI component is an editor that allows an end user to select multiple items from a drop-down list.
 */
export default class dxTagBox extends dxSelectBox {
    constructor(element: Element, options?: dxTagBoxOptions)
    constructor(element: JQuery, options?: dxTagBoxOptions)
}

declare global {
interface JQuery {
    dxTagBox(): JQuery;
    dxTagBox(options: "instance"): dxTagBox;
    dxTagBox(options: string): any;
    dxTagBox(options: string, ...params: any[]): any;
    dxTagBox(options: dxTagBoxOptions): JQuery;
}
}
/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export type Options = dxTagBoxOptions;

/** @deprecated use Options instead */
/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export type IOptions = dxTagBoxOptions;