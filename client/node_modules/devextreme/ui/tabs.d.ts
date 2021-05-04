/**
* DevExtreme (ui/tabs.d.ts)
* Version: 20.2.6
* Build date: Tue Mar 16 2021
*
* Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
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
export interface dxTabsOptions<T = dxTabs> extends CollectionWidgetOptions<T> {
    /**
     * Binds the UI component to data.
     */
    dataSource?: string | Array<string | dxTabsItem | any> | DataSource | DataSourceOptions;
    /**
     * Specifies whether the UI component can be focused using keyboard navigation.
     */
    focusStateEnabled?: boolean;
    /**
     * Specifies whether the UI component changes its state when a user pauses on it.
     */
    hoverStateEnabled?: boolean;
    /**
     * An array of items displayed by the UI component.
     */
    items?: Array<string | dxTabsItem | any>;
    /**
     * Specifies whether to repaint only those elements whose data changed.
     */
    repaintChangesOnly?: boolean;
    /**
     * Specifies whether or not an end-user can scroll tabs by swiping.
     */
    scrollByContent?: boolean;
    /**
     * Specifies whether or not an end-user can scroll tabs.
     */
    scrollingEnabled?: boolean;
    /**
     * An array of currently selected item objects.
     */
    selectedItems?: Array<string | number | any>;
    /**
     * Specifies whether the UI component enables an end-user to select only a single item or multiple items.
     */
    selectionMode?: 'multiple' | 'single';
    /**
     * Specifies whether navigation buttons should be available when tabs exceed the UI component's width.
     */
    showNavButtons?: boolean;
}
/**
 * The Tabs is a tab strip used to switch between pages or views. This UI component is included in the TabPanel UI component, but you can use the Tabs separately as well.
 */
export default class dxTabs extends CollectionWidget {
    constructor(element: Element, options?: dxTabsOptions)
    constructor(element: JQuery, options?: dxTabsOptions)
}

/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export interface dxTabsItem extends CollectionWidgetItem {
    /**
     * Specifies a badge text for the tab.
     */
    badge?: string;
    /**
     * Specifies the icon to be displayed on the tab.
     */
    icon?: string;
}

declare global {
interface JQuery {
    dxTabs(): JQuery;
    dxTabs(options: "instance"): dxTabs;
    dxTabs(options: string): any;
    dxTabs(options: string, ...params: any[]): any;
    dxTabs(options: dxTabsOptions): JQuery;
}
}
/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export type Options = dxTabsOptions;

/** @deprecated use Options instead */
/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export type IOptions = dxTabsOptions;