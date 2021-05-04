/**
* DevExtreme (ui/menu.d.ts)
* Version: 20.2.6
* Build date: Tue Mar 16 2021
*
* Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import {
    dxElement
} from '../core/element';

import DataSource, {
    DataSourceOptions
} from '../data/data_source';

import {
    CollectionWidgetItem
} from './collection/ui.collection_widget.base';

import dxMenuBase, {
    dxMenuBaseOptions
} from './context_menu/ui.menu_base';

/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export interface dxMenuOptions extends dxMenuBaseOptions<dxMenu> {
    /**
     * Specifies whether adaptive UI component rendering is enabled on small screens. Applies only if the orientation is 'horizontal'.
     */
    adaptivityEnabled?: boolean;
    /**
     * Binds the UI component to data.
     */
    dataSource?: string | Array<dxMenuItem> | DataSource | DataSourceOptions;
    /**
     * Specifies whether or not the submenu is hidden when the mouse pointer leaves it.
     */
    hideSubmenuOnMouseLeave?: boolean;
    /**
     * Holds an array of menu items.
     */
    items?: Array<dxMenuItem>;
    /**
     * A function that is executed after a submenu is hidden.
     */
    onSubmenuHidden?: ((e: { component?: dxMenu, element?: dxElement, model?: any, rootItem?: dxElement }) => any);
    /**
     * A function that is executed before a submenu is hidden.
     */
    onSubmenuHiding?: ((e: { component?: dxMenu, element?: dxElement, model?: any, rootItem?: dxElement, cancel?: boolean }) => any);
    /**
     * A function that is executed before a submenu is displayed.
     */
    onSubmenuShowing?: ((e: { component?: dxMenu, element?: dxElement, model?: any, rootItem?: dxElement }) => any);
    /**
     * A function that is executed after a submenu is displayed.
     */
    onSubmenuShown?: ((e: { component?: dxMenu, element?: dxElement, model?: any, rootItem?: dxElement }) => any);
    /**
     * Specifies whether the menu has horizontal or vertical orientation.
     */
    orientation?: 'horizontal' | 'vertical';
    /**
     * Specifies properties for showing and hiding the first level submenu.
     */
    showFirstSubmenuMode?: { delay?: { hide?: number, show?: number } | number, name?: 'onClick' | 'onHover' } | 'onClick' | 'onHover';
    /**
     * Specifies the direction at which the submenus are displayed.
     */
    submenuDirection?: 'auto' | 'leftOrTop' | 'rightOrBottom';
}
/**
 * The Menu UI component is a panel with clickable items. A click on an item opens a drop-down menu, which can contain several submenus.
 */
export default class dxMenu extends dxMenuBase {
    constructor(element: Element, options?: dxMenuOptions)
    constructor(element: JQuery, options?: dxMenuOptions)
}

/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export interface dxMenuBaseItem extends CollectionWidgetItem {
    /**
     * Specifies whether a group separator is displayed over the item.
     */
    beginGroup?: boolean;
    /**
     * Specifies if a menu is closed when a user clicks the item.
     */
    closeMenuOnClick?: boolean;
    /**
     * Specifies whether the menu item responds to user interaction.
     */
    disabled?: boolean;
    /**
     * Specifies the menu item's icon.
     */
    icon?: string;
    /**
     * Specifies nested menu items.
     */
    items?: Array<dxMenuBaseItem>;
    /**
     * Specifies whether or not a user can select a menu item.
     */
    selectable?: boolean;
    /**
     * Specifies whether or not the item is selected.
     */
    selected?: boolean;
    /**
     * Specifies the text inserted into the item element.
     */
    text?: string;
    /**
     * Specifies whether or not the menu item is visible.
     */
    visible?: boolean;
}

/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export interface dxMenuItem extends dxMenuBaseItem {
    /**
     * Specifies nested menu items.
     */
    items?: Array<dxMenuItem>;
}

declare global {
interface JQuery {
    dxMenu(): JQuery;
    dxMenu(options: "instance"): dxMenu;
    dxMenu(options: string): any;
    dxMenu(options: string, ...params: any[]): any;
    dxMenu(options: dxMenuOptions): JQuery;
}
}
/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export type Options = dxMenuOptions;

/** @deprecated use Options instead */
/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export type IOptions = dxMenuOptions;