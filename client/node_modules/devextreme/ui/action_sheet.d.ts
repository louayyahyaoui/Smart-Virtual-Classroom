/**
* DevExtreme (ui/action_sheet.d.ts)
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

import DataSource, {
    DataSourceOptions
} from '../data/data_source';

import {
    event
} from '../events/index';

import CollectionWidget, {
    CollectionWidgetItem,
    CollectionWidgetOptions
} from './collection/ui.collection_widget.base';

/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export interface dxActionSheetOptions extends CollectionWidgetOptions<dxActionSheet> {
    /**
     * The text displayed in the button that closes the action sheet.
     */
    cancelText?: string;
    /**
     * Binds the UI component to data.
     */
    dataSource?: string | Array<string | dxActionSheetItem | any> | DataSource | DataSourceOptions;
    /**
     * An array of items displayed by the UI component.
     */
    items?: Array<string | dxActionSheetItem | any>;
    /**
     * A function that is executed when the Cancel button is clicked or tapped.
     */
    onCancelClick?: ((e: { component?: dxActionSheet, element?: dxElement, model?: any, cancel?: boolean }) => any) | string;
    /**
     * Specifies whether or not to display the Cancel button in action sheet.
     */
    showCancelButton?: boolean;
    /**
     * A Boolean value specifying whether or not the title of the action sheet is visible.
     */
    showTitle?: boolean;
    /**
     * Specifies the element the action sheet popover points at. Applies only if usePopover is true.
     */
    target?: string | Element | JQuery;
    /**
     * The title of the action sheet.
     */
    title?: string;
    /**
     * Specifies whether or not to show the action sheet within a Popover UI component.
     */
    usePopover?: boolean;
    /**
     * A Boolean value specifying whether or not the ActionSheet UI component is visible.
     */
    visible?: boolean;
}
/**
 * The ActionSheet UI component is a sheet containing a set of buttons located one under the other. These buttons usually represent several choices relating to a single task.
 */
export default class dxActionSheet extends CollectionWidget {
    constructor(element: Element, options?: dxActionSheetOptions)
    constructor(element: JQuery, options?: dxActionSheetOptions)
    /**
     * Hides the UI component.
     */
    hide(): Promise<void> & JQueryPromise<void>;
    /**
     * Shows the UI component.
     */
    show(): Promise<void> & JQueryPromise<void>;
    /**
     * Shows or hides the UI component depending on the argument.
     */
    toggle(showing: boolean): Promise<void> & JQueryPromise<void>;
}

/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export interface dxActionSheetItem extends CollectionWidgetItem {
    /**
     * Specifies the icon to be displayed on the action sheet button.
     */
    icon?: string;
    /**
     * A handler for the click event raised for the button representing the given action sheet button.
     */
    onClick?: ((e: { component?: dxActionSheet, element?: dxElement, model?: any, event?: event }) => any) | string;
    /**
     * Specifies the type of the button that represents an action sheet item.
     */
    type?: 'back' | 'danger' | 'default' | 'normal' | 'success';
}

declare global {
interface JQuery {
    dxActionSheet(): JQuery;
    dxActionSheet(options: "instance"): dxActionSheet;
    dxActionSheet(options: string): any;
    dxActionSheet(options: string, ...params: any[]): any;
    dxActionSheet(options: dxActionSheetOptions): JQuery;
}
}
/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export type Options = dxActionSheetOptions;

/** @deprecated use Options instead */
/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export type IOptions = dxActionSheetOptions;
