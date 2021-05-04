/**
* DevExtreme (ui/collection/ui.collection_widget.base.d.ts)
* Version: 20.2.6
* Build date: Tue Mar 16 2021
*
* Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import '../../jquery_augmentation';

import {
    dxElement
} from '../../core/element';

import {
    template
} from '../../core/templates/template';

import DataSource, {
    DataSourceOptions
} from '../../data/data_source';

import {
    event
} from '../../events/index';

import Widget, {
    WidgetOptions
} from '../widget/ui.widget';

/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export interface CollectionWidgetOptions<T = CollectionWidget> extends WidgetOptions<T> {
    /**
     * Binds the UI component to data.
     */
    dataSource?: string | Array<string | CollectionWidgetItem> | DataSource | DataSourceOptions;
    /**
     * The time period in milliseconds before the onItemHold event is raised.
     */
    itemHoldTimeout?: number;
    /**
     * Specifies a custom template for items.
     */
    itemTemplate?: template | ((itemData: any, itemIndex: number, itemElement: dxElement) => string | Element | JQuery);
    /**
     * An array of items displayed by the UI component.
     */
    items?: Array<string | CollectionWidgetItem | any>;
    /**
     * Specifies the key property that provides key values to access data items. Each key value must be unique.
     */
    keyExpr?: string | Function;
    /**
     * The text or HTML markup displayed by the UI component if the item collection is empty.
     */
    noDataText?: string;
    /**
     * A function that is executed when a collection item is clicked or tapped.
     */
    onItemClick?: ((e: { component?: T, element?: dxElement, model?: any, itemData?: any, itemElement?: dxElement, itemIndex?: number, event?: event }) => any) | string;
    /**
     * A function that is executed when a collection item is right-clicked or pressed.
     */
    onItemContextMenu?: ((e: { component?: T, element?: dxElement, model?: any, itemData?: any, itemElement?: dxElement, itemIndex?: number, event?: event }) => any);
    /**
     * A function that is executed when a collection item has been held for a specified period.
     */
    onItemHold?: ((e: { component?: T, element?: dxElement, model?: any, itemData?: any, itemElement?: dxElement, itemIndex?: number, event?: event }) => any);
    /**
     * A function that is executed after a collection item is rendered.
     */
    onItemRendered?: ((e: { component?: T, element?: dxElement, model?: any, itemData?: any, itemElement?: dxElement, itemIndex?: number }) => any);
    /**
     * A function that is executed when a collection item is selected or selection is canceled.
     */
    onSelectionChanged?: ((e: { component?: T, element?: dxElement, model?: any, addedItems?: Array<any>, removedItems?: Array<any> }) => any);
    /**
     * The index of the currently selected UI component item.
     */
    selectedIndex?: number;
    /**
     * The selected item object.
     */
    selectedItem?: any;
    /**
     * Specifies an array of currently selected item keys.
     */
    selectedItemKeys?: Array<any>;
    /**
     * An array of currently selected item objects.
     */
    selectedItems?: Array<any>;
}
/**
 * The base class for UI components containing an item collection.
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export default class CollectionWidget extends Widget {
    constructor(element: Element, options?: CollectionWidgetOptions)
    constructor(element: JQuery, options?: CollectionWidgetOptions)
    getDataSource(): DataSource;
}

/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export interface CollectionWidgetItem {
    /**
     * Specifies whether the UI component item responds to user interaction.
     */
    disabled?: boolean;
    /**
     * Specifies html code inserted into the UI component item element.
     */
    html?: string;
    /**
     * Specifies a template that should be used to render this item only.
     */
    template?: template | (() => string | Element | JQuery);
    /**
     * Specifies text displayed for the UI component item.
     */
    text?: string;
    /**
     * Specifies whether or not a UI component item must be displayed.
     */
    visible?: boolean;
}
