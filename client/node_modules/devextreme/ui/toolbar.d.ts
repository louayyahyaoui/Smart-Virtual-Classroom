/**
* DevExtreme (ui/toolbar.d.ts)
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

import DataSource, {
    DataSourceOptions
} from '../data/data_source';

import CollectionWidget, {
    CollectionWidgetItem,
    CollectionWidgetOptions
} from './collection/ui.collection_widget.base';

/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export interface dxToolbarOptions extends CollectionWidgetOptions<dxToolbar> {
    /**
     * Binds the UI component to data.
     */
    dataSource?: string | Array<string | dxToolbarItem | any> | DataSource | DataSourceOptions;
    /**
     * An array of items displayed by the UI component.
     */
    items?: Array<string | dxToolbarItem | any>;
    /**
     * Specifies a custom template for menu items.
     */
    menuItemTemplate?: template | ((itemData: any, itemIndex: number, itemElement: dxElement) => string | Element | JQuery);
    /**
     * Specifies the UI component's height in pixels.
     * @deprecated 
     */
    height?: number | string | (() => number | string);
}
/**
 * The Toolbar is a UI component containing items that usually manage screen content. Those items can be plain text or UI components.
 */
export default class dxToolbar extends CollectionWidget {
    constructor(element: Element, options?: dxToolbarOptions)
    constructor(element: JQuery, options?: dxToolbarOptions)
}

/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export interface dxToolbarItem extends CollectionWidgetItem {
    /**
     * Specifies a CSS class to be applied to the item.
     */
    cssClass?: string;
    /**
     * Specifies when to display an item in the toolbar's overflow menu.
     */
    locateInMenu?: 'always' | 'auto' | 'never';
    /**
     * Specifies a location for the item on the toolbar.
     */
    location?: 'after' | 'before' | 'center';
    /**
     * Specifies a template that should be used to render a menu item.
     */
    menuItemTemplate?: template | (() => string | Element | JQuery);
    /**
     * Configures the DevExtreme UI component used as a toolbar item.
     */
    options?: any;
    /**
     * Specifies when to display the text for the UI component item.
     */
    showText?: 'always' | 'inMenu';
    /**
     * A UI component that presents a toolbar item. To configure it, use the options object.
     */
    widget?: 'dxAutocomplete' | 'dxButton' | 'dxCheckBox' | 'dxDateBox' | 'dxMenu' | 'dxSelectBox' | 'dxTabs' | 'dxTextBox' | 'dxButtonGroup' | 'dxDropDownButton';
}

declare global {
interface JQuery {
    dxToolbar(): JQuery;
    dxToolbar(options: "instance"): dxToolbar;
    dxToolbar(options: string): any;
    dxToolbar(options: string, ...params: any[]): any;
    dxToolbar(options: dxToolbarOptions): JQuery;
}
}
/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export type Options = dxToolbarOptions;

/** @deprecated use Options instead */
/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export type IOptions = dxToolbarOptions;
