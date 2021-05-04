/**
* DevExtreme (ui/context_menu.d.ts)
* Version: 20.2.6
* Build date: Tue Mar 16 2021
*
* Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import {
    positionConfig
} from '../animation/position';

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

import dxMenuBase, {
    dxMenuBaseOptions
} from './context_menu/ui.menu_base';

import {
    dxMenuBaseItem
} from './menu';

/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export interface dxContextMenuOptions extends dxMenuBaseOptions<dxContextMenu> {
    /**
     * Specifies whether to close the ContextMenu if a user clicks outside it.
     */
    closeOnOutsideClick?: boolean | ((event: event) => boolean);
    /**
     * Binds the UI component to data.
     */
    dataSource?: string | Array<dxContextMenuItem> | DataSource | DataSourceOptions;
    /**
     * Holds an array of menu items.
     */
    items?: Array<dxContextMenuItem>;
    /**
     * A function that is executed after the ContextMenu is hidden.
     */
    onHidden?: ((e: { component?: dxContextMenu, element?: dxElement, model?: any }) => any);
    /**
     * A function that is executed before the ContextMenu is hidden.
     */
    onHiding?: ((e: { component?: dxContextMenu, element?: dxElement, model?: any, cancel?: boolean }) => any);
    /**
     * A function that is executed before the ContextMenu is positioned.
     */
    onPositioning?: ((e: { component?: dxContextMenu, element?: dxElement, model?: any, event?: event, position?: positionConfig }) => any);
    /**
     * A function that is executed before the ContextMenu is shown.
     */
    onShowing?: ((e: { component?: dxContextMenu, element?: dxElement, model?: any, cancel?: boolean }) => any);
    /**
     * A function that is executed after the ContextMenu is shown.
     */
    onShown?: ((e: { component?: dxContextMenu, element?: dxElement, model?: any }) => any);
    /**
     * An object defining UI component positioning properties.
     */
    position?: positionConfig;
    /**
     * Specifies properties for displaying the UI component.
     */
    showEvent?: { delay?: number, name?: string } | string;
    /**
     * Specifies the direction at which submenus are displayed.
     */
    submenuDirection?: 'auto' | 'left' | 'right';
    /**
     * The target element associated with the context menu.
     */
    target?: string | Element | JQuery;
    /**
     * A Boolean value specifying whether or not the UI component is visible.
     */
    visible?: boolean;
}
/**
 * The ContextMenu UI component displays a single- or multi-level context menu. An end user invokes this menu by a right click or a long press.
 */
export default class dxContextMenu extends dxMenuBase {
    constructor(element: Element, options?: dxContextMenuOptions)
    constructor(element: JQuery, options?: dxContextMenuOptions)
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
export interface dxContextMenuItem extends dxMenuBaseItem {
    /**
     * Specifies nested menu items.
     */
    items?: Array<dxContextMenuItem>;
}

declare global {
interface JQuery {
    dxContextMenu(): JQuery;
    dxContextMenu(options: "instance"): dxContextMenu;
    dxContextMenu(options: string): any;
    dxContextMenu(options: string, ...params: any[]): any;
    dxContextMenu(options: dxContextMenuOptions): JQuery;
}
}
/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export type Options = dxContextMenuOptions;

/** @deprecated use Options instead */
/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export type IOptions = dxContextMenuOptions;
