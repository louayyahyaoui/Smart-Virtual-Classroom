/**
* DevExtreme (ui/slide_out.d.ts)
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

import CollectionWidget, {
    CollectionWidgetItem,
    CollectionWidgetOptions
} from './collection/ui.collection_widget.base';

/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export interface dxSlideOutOptions extends CollectionWidgetOptions<dxSlideOut> {
    /**
     * A Boolean value specifying whether or not the UI component changes its state when interacting with a user.
     */
    activeStateEnabled?: boolean;
    /**
     * Specifies a custom template for the UI component content. Rendered only once - when the UI component is created.
     */
    contentTemplate?: template | ((container: dxElement) => string | Element | JQuery);
    /**
     * Binds the UI component to data.
     */
    dataSource?: string | Array<string | dxSlideOutItem | any> | DataSource | DataSourceOptions;
    /**
     * An array of items displayed by the UI component.
     */
    items?: Array<string | dxSlideOutItem | any>;
    /**
     * Specifies a custom template for group captions.
     */
    menuGroupTemplate?: template | ((groupData: any, groupIndex: number, groupElement: any) => string | Element | JQuery);
    /**
     * A Boolean value specifying whether or not to display a grouped menu.
     */
    menuGrouped?: boolean;
    /**
     * Specifies a custom template for menu items.
     */
    menuItemTemplate?: template | ((itemData: any, itemIndex: number, itemElement: dxElement) => string | Element | JQuery);
    /**
     * Specifies the current menu position.
     */
    menuPosition?: 'inverted' | 'normal';
    /**
     * Specifies whether or not the slide-out menu is displayed.
     */
    menuVisible?: boolean;
    /**
     * A function that is executed when a group menu item is rendered.
     */
    onMenuGroupRendered?: ((e: { component?: dxSlideOut, element?: dxElement, model?: any }) => any);
    /**
     * A function that is executed when a regular menu item is rendered.
     */
    onMenuItemRendered?: ((e: { component?: dxSlideOut, element?: dxElement, model?: any }) => any);
    /**
     * The index number of the currently selected item.
     */
    selectedIndex?: number;
    /**
     * Indicates whether the menu can be shown/hidden by swiping the UI component's main panel.
     */
    swipeEnabled?: boolean;
}
/**
 * The SlideOut UI component is a classic slide-out menu paired with a view. An end user opens the menu by swiping away the view.
 */
export default class dxSlideOut extends CollectionWidget {
    constructor(element: Element, options?: dxSlideOutOptions)
    constructor(element: JQuery, options?: dxSlideOutOptions)
    /**
     * Hides the UI component's slide-out menu.
     */
    hideMenu(): Promise<void> & JQueryPromise<void>;
    /**
     * Displays the UI component's slide-out menu.
     */
    showMenu(): Promise<void> & JQueryPromise<void>;
    /**
     * Shows or hides the slide-out menu depending on the argument.
     */
    toggleMenuVisibility(showing: boolean): Promise<void> & JQueryPromise<void>;
}

/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export interface dxSlideOutItem extends CollectionWidgetItem {
    /**
     * Specifies a template that should be used to render a menu item.
     */
    menuTemplate?: template | (() => string | Element | JQuery);
}

declare global {
interface JQuery {
    dxSlideOut(): JQuery;
    dxSlideOut(options: "instance"): dxSlideOut;
    dxSlideOut(options: string): any;
    dxSlideOut(options: string, ...params: any[]): any;
    dxSlideOut(options: dxSlideOutOptions): JQuery;
}
}
/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export type Options = dxSlideOutOptions;

/** @deprecated use Options instead */
/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export type IOptions = dxSlideOutOptions;