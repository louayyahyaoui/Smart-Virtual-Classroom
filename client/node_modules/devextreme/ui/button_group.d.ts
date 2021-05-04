/**
* DevExtreme (ui/button_group.d.ts)
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

import {
    event
} from '../events/index';

import {
    CollectionWidgetItem
} from './collection/ui.collection_widget.base';

import Widget, {
    WidgetOptions
} from './widget/ui.widget';

/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export interface dxButtonGroupOptions extends WidgetOptions<dxButtonGroup> {
    /**
     * Specifies a template for all the buttons in the group.
     */
    buttonTemplate?: template | ((buttonData: any, buttonContent: dxElement) => string | Element | JQuery);
    /**
     * Specifies whether the UI component can be focused using keyboard navigation.
     */
    focusStateEnabled?: boolean;
    /**
     * Specifies whether the UI component changes its state when a user pauses on it.
     */
    hoverStateEnabled?: boolean;
    /**
     * Configures buttons in the group.
     */
    items?: Array<dxButtonGroupItem>;
    /**
     * Specifies which data field provides keys used to distinguish between the selected buttons.
     */
    keyExpr?: string | Function;
    /**
     * A function that is executed when a button is clicked or tapped.
     */
    onItemClick?: ((e: { component?: dxButtonGroup, element?: dxElement, model?: any, itemData?: any, itemElement?: dxElement, itemIndex?: number, event?: event }) => any);
    /**
     * A function that is executed when a button is selected or selection is canceled.
     */
    onSelectionChanged?: ((e: { component?: dxButtonGroup, element?: dxElement, model?: any, addedItems?: Array<any>, removedItems?: Array<any> }) => any);
    /**
     * Contains the keys of the selected buttons and allows selecting buttons initially.
     */
    selectedItemKeys?: Array<any>;
    /**
     * Contains the data objects that correspond to the selected buttons. The data objects are taken from the items array.
     */
    selectedItems?: Array<any>;
    /**
     * Specifies whether a single or multiple buttons can be in the selected state simultaneously.
     */
    selectionMode?: 'multiple' | 'single';
    /**
     * Specifies how buttons in the group are styled.
     */
    stylingMode?: 'text' | 'outlined' | 'contained';
}
/**
 * The ButtonGroup is a UI component that contains a set of toggle buttons and can be used as a mode switcher.
 */
export default class dxButtonGroup extends Widget {
    constructor(element: Element, options?: dxButtonGroupOptions)
    constructor(element: JQuery, options?: dxButtonGroupOptions)
}

/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export interface dxButtonGroupItem extends CollectionWidgetItem {
    /**
     * Specifies a text for the hint that appears when the button is hovered over or long-pressed.
     */
    hint?: string;
    /**
     * Specifies the icon to be displayed on the button.
     */
    icon?: string;
    /**
     * Specifies the button type.
     */
    type?: 'back' | 'danger' | 'default' | 'normal' | 'success';
}

declare global {
interface JQuery {
    dxButtonGroup(): JQuery;
    dxButtonGroup(options: "instance"): dxButtonGroup;
    dxButtonGroup(options: string): any;
    dxButtonGroup(options: string, ...params: any[]): any;
    dxButtonGroup(options: dxButtonGroupOptions): JQuery;
}
}
/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export type Options = dxButtonGroupOptions;

/** @deprecated use Options instead */
/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export type IOptions = dxButtonGroupOptions;