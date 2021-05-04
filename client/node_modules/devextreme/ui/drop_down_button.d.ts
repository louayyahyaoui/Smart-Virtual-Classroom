/**
* DevExtreme (ui/drop_down_button.d.ts)
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

import DataSource, {
    DataSourceOptions
} from '../data/data_source';

import {
    event
} from '../events/index';

import {
    dxListItem
} from './list';

import {
    dxPopupOptions
} from './popup';

import Widget, {
    WidgetOptions
} from './widget/ui.widget';

/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export interface dxDropDownButtonOptions extends WidgetOptions<dxDropDownButton> {
    /**
     * Provides data for the drop-down menu.
     */
    dataSource?: string | Array<dxDropDownButtonItem | any> | DataSource | DataSourceOptions;
    /**
     * Specifies whether to wait until the drop-down menu is opened the first time to render its content.
     */
    deferRendering?: boolean;
    /**
     * Specifies the data field whose values should be displayed in the drop-down menu.
     */
    displayExpr?: string | ((itemData: any) => string);
    /**
     * Specifies custom content for the drop-down field.
     */
    dropDownContentTemplate?: template | ((data: Array<string | number | any> | DataSource, contentElement: dxElement) => string | Element | JQuery);
    /**
     * 
     */
    dropDownOptions?: dxPopupOptions;
    /**
     * Specifies whether users can use keyboard to focus the UI component.
     */
    focusStateEnabled?: boolean;
    /**
     * Specifies whether the UI component changes its state when a user hovers the mouse pointer over it.
     */
    hoverStateEnabled?: boolean;
    /**
     * Specifies the button's icon.
     */
    icon?: string;
    /**
     * Specifies a custom template for drop-down menu items.
     */
    itemTemplate?: template | ((itemData: any, itemIndex: number, itemElement: dxElement) => string | Element | JQuery);
    /**
     * Provides drop-down menu items.
     */
    items?: Array<dxDropDownButtonItem | any>;
    /**
     * Specifies which data field provides keys used to distinguish between the selected drop-down menu items.
     */
    keyExpr?: string;
    /**
     * Specifies text or HTML markup displayed in the drop-down menu when it does not contain any items.
     */
    noDataText?: string;
    /**
     * A function that is executed when the button is clicked or tapped. If splitButton is true, this function is executed for the action button only.
     */
    onButtonClick?: ((e: { component?: dxDropDownButton, element?: dxElement, model?: any, event?: event, selectedItem?: any }) => any) | string;
    /**
     * A function that is executed when a drop-down menu item is clicked.
     */
    onItemClick?: ((e: { component?: dxDropDownButton, element?: dxElement, model?: any, event?: event, itemData?: any, itemElement?: dxElement }) => any) | string;
    /**
     * A function that is executed when an item is selected or selection is canceled. In effect when useSelectMode is true.
     */
    onSelectionChanged?: ((e: { component?: dxDropDownButton, element?: dxElement, model?: any, item?: any, previousItem?: any }) => any) | string;
    /**
     * Specifies whether the drop-down menu is opened.
     */
    opened?: boolean;
    /**
     * Contains the selected item's data. Available when useSelectMode is true.
     */
    selectedItem?: string | number | any;
    /**
     * Contains the selected item's key and allows you to specify the initially selected item. Applies when useSelectMode is true.
     */
    selectedItemKey?: string | number;
    /**
     * Specifies whether the arrow icon should be displayed.
     */
    showArrowIcon?: boolean;
    /**
     * Specifies whether to split the button in two: one executes an action, the other opens and closes the drop-down menu.
     */
    splitButton?: boolean;
    /**
     * Specifies how the button is styled.
     */
    stylingMode?: 'text' | 'outlined' | 'contained';
    /**
     * Specifies the button's text. Applies only if useSelectMode is false.
     */
    text?: string;
    /**
     * Specifies whether the UI component stores the selected drop-down menu item.
     */
    useSelectMode?: boolean;
    /**
     * Specifies whether text that exceeds the drop-down list width should be wrapped.
     */
    wrapItemText?: boolean;
}
/**
 * The DropDownButton is a button that opens a drop-down menu.
 */
export default class dxDropDownButton extends Widget {
    constructor(element: Element, options?: dxDropDownButtonOptions)
    constructor(element: JQuery, options?: dxDropDownButtonOptions)
    /**
     * Closes the drop-down menu.
     */
    close(): Promise<void> & JQueryPromise<void>;
    getDataSource(): DataSource;
    /**
     * Opens the drop-down menu.
     */
    open(): Promise<void> & JQueryPromise<void>;
    /**
     * Opens or closes the drop-down menu, reversing the current state.
     */
    toggle(): Promise<void> & JQueryPromise<void>;
    /**
     * Opens or closes the drop-down menu, depending on the argument.
     */
    toggle(visibility: boolean): Promise<void> & JQueryPromise<void>;
}

/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export interface dxDropDownButtonItem extends dxListItem {
    /**
     * A handler for the click event raised for a certain item in the drop-down field.
     */
    onClick?: ((e: { component?: dxDropDownButton, element?: dxElement, model?: any, event?: event }) => any) | string;
}

declare global {
interface JQuery {
    dxDropDownButton(): JQuery;
    dxDropDownButton(options: "instance"): dxDropDownButton;
    dxDropDownButton(options: string): any;
    dxDropDownButton(options: string, ...params: any[]): any;
    dxDropDownButton(options: dxDropDownButtonOptions): JQuery;
}
}
/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export type Options = dxDropDownButtonOptions;

/** @deprecated use Options instead */
/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export type IOptions = dxDropDownButtonOptions;