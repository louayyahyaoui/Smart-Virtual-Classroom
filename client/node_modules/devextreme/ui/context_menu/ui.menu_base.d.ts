/**
* DevExtreme (ui/context_menu/ui.menu_base.d.ts)
* Version: 20.2.6
* Build date: Tue Mar 16 2021
*
* Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import {
    animationConfig
} from '../../animation/fx';

import DataSource, {
    DataSourceOptions
} from '../../data/data_source';

import HierarchicalCollectionWidget, {
    HierarchicalCollectionWidgetOptions
} from '../hierarchical_collection/ui.hierarchical_collection_widget';

import {
    dxMenuBaseItem
} from '../menu';

/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export interface dxMenuBaseOptions<T = dxMenuBase> extends HierarchicalCollectionWidgetOptions<T> {
    /**
     * A Boolean value specifying whether or not the UI component changes its state when interacting with a user.
     */
    activeStateEnabled?: boolean;
    /**
     * Configures UI component visibility animations. This object contains two fields: show and hide.
     */
    animation?: { hide?: animationConfig, show?: animationConfig };
    /**
     * Specifies the name of the CSS class to be applied to the root menu level and all submenus.
     */
    cssClass?: string;
    /**
     * Binds the UI component to data.
     */
    dataSource?: string | Array<dxMenuBaseItem> | DataSource | DataSourceOptions;
    /**
     * Holds an array of menu items.
     */
    items?: Array<dxMenuBaseItem>;
    /**
     * Specifies whether or not an item becomes selected if a user clicks it.
     */
    selectByClick?: boolean;
    /**
     * Specifies the selection mode supported by the menu.
     */
    selectionMode?: 'none' | 'single';
    /**
     * Specifies properties of submenu showing and hiding.
     */
    showSubmenuMode?: { delay?: { hide?: number, show?: number } | number, name?: 'onClick' | 'onHover' } | 'onClick' | 'onHover';
}
/**
 * 
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export default class dxMenuBase extends HierarchicalCollectionWidget {
    constructor(element: Element, options?: dxMenuBaseOptions)
    constructor(element: JQuery, options?: dxMenuBaseOptions)
    /**
     * Selects an item found using its DOM node.
     */
    selectItem(itemElement: Element): void;
    /**
     * Cancels the selection of an item found using its DOM node.
     */
    unselectItem(itemElement: Element): void;
}
