/**
* DevExtreme (ui/list.d.ts)
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

import CollectionWidget, {
    CollectionWidgetItem,
    CollectionWidgetOptions
} from './collection/ui.collection_widget.base';

import {
    dxSortableOptions
} from './sortable';

import {
    SearchBoxMixinOptions
} from './widget/ui.search_box_mixin';

/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export interface dxListOptions extends CollectionWidgetOptions<dxList>, SearchBoxMixinOptions<dxList> {
    /**
     * Specifies whether or not the UI component changes its state when interacting with a user.
     */
    activeStateEnabled?: boolean;
    /**
     * Specifies whether or not an end user can delete list items.
     */
    allowItemDeleting?: boolean;
    /**
     * A Boolean value specifying whether to enable or disable the bounce-back effect.
     */
    bounceEnabled?: boolean;
    /**
     * Specifies whether or not an end-user can collapse groups.
     */
    collapsibleGroups?: boolean;
    /**
     * Binds the UI component to data.
     */
    dataSource?: string | Array<string | dxListItem | any> | DataSource | DataSourceOptions;
    /**
     * Specifies the data field whose values should be displayed. Defaults to 'text' when the data source contains objects.
     */
    displayExpr?: string | ((item: any) => string);
    /**
     * Specifies whether the UI component can be focused using keyboard navigation.
     */
    focusStateEnabled?: boolean;
    /**
     * Specifies a custom template for group captions.
     */
    groupTemplate?: template | ((groupData: any, groupIndex: number, groupElement: dxElement) => string | Element | JQuery);
    /**
     * Specifies whether data items should be grouped.
     */
    grouped?: boolean;
    /**
     * Specifies whether the UI component changes its state when a user pauses on it.
     */
    hoverStateEnabled?: boolean;
    /**
     * Specifies whether or not to show the loading panel when the DataSource bound to the UI component is loading data.
     */
    indicateLoading?: boolean;
    /**
     * Specifies the way a user can delete items from the list.
     */
    itemDeleteMode?: 'context' | 'slideButton' | 'slideItem' | 'static' | 'swipe' | 'toggle';
    /**
     * Configures item reordering using drag and drop gestures.
     */
    itemDragging?: dxSortableOptions;
    /**
     * An array of items displayed by the UI component.
     */
    items?: Array<string | dxListItem | any>;
    /**
     * Specifies the array of items for a context menu called for a list item.
     */
    menuItems?: Array<{ action?: ((itemElement: dxElement, itemData: any) => any), text?: string }>;
    /**
     * Specifies whether an item context menu is shown when a user holds or swipes an item.
     */
    menuMode?: 'context' | 'slide';
    /**
     * The text displayed on the button used to load the next page from the data source.
     */
    nextButtonText?: string;
    /**
     * A function that is executed when a group element is rendered.
     */
    onGroupRendered?: ((e: { component?: dxList, element?: dxElement, model?: any, groupData?: any, groupElement?: dxElement, groupIndex?: number }) => any);
    /**
     * A function that is executed when a collection item is clicked or tapped.
     */
    onItemClick?: ((e: { component?: dxList, element?: dxElement, model?: any, itemData?: any, itemElement?: dxElement, itemIndex?: number | any, event?: event }) => any) | string;
    /**
     * A function that is executed when a collection item is right-clicked or pressed.
     */
    onItemContextMenu?: ((e: { component?: dxList, element?: dxElement, model?: any, itemData?: any, itemElement?: dxElement, itemIndex?: number | any, event?: event }) => any);
    /**
     * A function that is executed after a list item is deleted from the data source.
     */
    onItemDeleted?: ((e: { component?: dxList, element?: dxElement, model?: any, itemData?: any, itemElement?: dxElement, itemIndex?: number | any }) => any);
    /**
     * A function that is executed before a collection item is deleted from the data source.
     */
    onItemDeleting?: ((e: { component?: dxList, element?: dxElement, model?: any, itemData?: any, itemElement?: dxElement, itemIndex?: number | any, cancel?: boolean | Promise<void> | JQueryPromise<void> }) => any);
    /**
     * A function that is executed when a collection item has been held for a specified period.
     */
    onItemHold?: ((e: { component?: dxList, element?: dxElement, model?: any, itemData?: any, itemElement?: dxElement, itemIndex?: number | any, event?: event }) => any);
    /**
     * A function that is executed after a list item is moved to another position.
     */
    onItemReordered?: ((e: { component?: dxList, element?: dxElement, model?: any, itemData?: any, itemElement?: dxElement, itemIndex?: number | any, fromIndex?: number, toIndex?: number }) => any);
    /**
     * A function that is executed when a list item is swiped.
     */
    onItemSwipe?: ((e: { component?: dxList, element?: dxElement, model?: any, event?: event, itemData?: any, itemElement?: dxElement, itemIndex?: number | any, direction?: string }) => any);
    /**
     * A function that is executed before the next page is loaded.
     */
    onPageLoading?: ((e: { component?: dxList, element?: dxElement, model?: any }) => any);
    /**
     * A function that is executed when the 'pull to refresh' gesture is performed. Supported in mobile themes only.
     */
    onPullRefresh?: ((e: { component?: dxList, element?: dxElement, model?: any }) => any);
    /**
     * A function that is executed on each scroll gesture.
     */
    onScroll?: ((e: { component?: dxList, element?: dxElement, model?: any, event?: event, scrollOffset?: any, reachedLeft?: boolean, reachedRight?: boolean, reachedTop?: boolean, reachedBottom?: boolean }) => any);
    /**
     * A function that is executed when the 'Select All' check box value is changed. Applies only if the selectionMode is 'all'.
     */
    onSelectAllValueChanged?: ((e: { component?: dxList, element?: dxElement, model?: any, value?: boolean }) => any);
    /**
     * Specifies whether the next page is loaded when a user scrolls the UI component to the bottom or when the 'next' button is clicked.
     */
    pageLoadMode?: 'nextButton' | 'scrollBottom';
    /**
     * Specifies the text shown in the pullDown panel, which is displayed when the list is scrolled to the bottom.
     */
    pageLoadingText?: string;
    /**
     * A Boolean value specifying whether or not the UI component supports the 'pull down to refresh' gesture.
     */
    pullRefreshEnabled?: boolean;
    /**
     * Specifies the text displayed in the pullDown panel when the list is pulled below the refresh threshold.
     */
    pulledDownText?: string;
    /**
     * Specifies the text shown in the pullDown panel while the list is being pulled down to the refresh threshold.
     */
    pullingDownText?: string;
    /**
     * Specifies the text displayed in the pullDown panel while the list is being refreshed.
     */
    refreshingText?: string;
    /**
     * Specifies whether to repaint only those elements whose data changed.
     */
    repaintChangesOnly?: boolean;
    /**
     * A Boolean value specifying if the list is scrolled by content.
     */
    scrollByContent?: boolean;
    /**
     * A Boolean value specifying if the list is scrolled using the scrollbar.
     */
    scrollByThumb?: boolean;
    /**
     * A Boolean value specifying whether to enable or disable list scrolling.
     */
    scrollingEnabled?: boolean;
    /**
     * Specifies the mode in which all items are selected.
     */
    selectAllMode?: 'allPages' | 'page';
    /**
     * Specifies item selection mode.
     */
    selectionMode?: 'all' | 'multiple' | 'none' | 'single';
    /**
     * Specifies when the UI component shows the scrollbar.
     */
    showScrollbar?: 'always' | 'never' | 'onHover' | 'onScroll';
    /**
     * Specifies whether or not to display controls used to select list items.
     */
    showSelectionControls?: boolean;
    /**
     * Specifies whether or not the UI component uses native scrolling.
     */
    useNativeScrolling?: boolean;
}
/**
 * The List is a UI component that represents a collection of items in a scrollable list.
 */
export default class dxList extends CollectionWidget {
    constructor(element: Element, options?: dxListOptions)
    constructor(element: JQuery, options?: dxListOptions)
    /**
     * Gets the UI component's height in pixels.
     */
    clientHeight(): number;
    /**
     * Collapses a group with a specific index.
     */
    collapseGroup(groupIndex: number): Promise<void> & JQueryPromise<void>;
    /**
     * Removes an item found using its DOM node.
     */
    deleteItem(itemElement: Element): Promise<void> & JQueryPromise<void>;
    /**
     * Removes an item with a specific index.
     */
    deleteItem(itemIndex: number | any): Promise<void> & JQueryPromise<void>;
    /**
     * Expands a group with a specific index.
     */
    expandGroup(groupIndex: number): Promise<void> & JQueryPromise<void>;
    /**
     * Checks whether an item found using its DOM node is selected.
     */
    isItemSelected(itemElement: Element): boolean;
    /**
     * Checks whether an item with a specific index is selected.
     */
    isItemSelected(itemIndex: number | any): boolean;
    /**
     * Reloads list data.
     */
    reload(): void;
    /**
     * Reorders items found using their DOM nodes.
     */
    reorderItem(itemElement: Element, toItemElement: Element): Promise<void> & JQueryPromise<void>;
    /**
     * Reorders items with specific indexes.
     */
    reorderItem(itemIndex: number | any, toItemIndex: number | any): Promise<void> & JQueryPromise<void>;
    /**
     * Scrolls the content by a specified distance.
     */
    scrollBy(distance: number): void;
    /**
     * Gets the content's height in pixels.
     */
    scrollHeight(): number;
    /**
     * Scrolls the content to a specific position.
     */
    scrollTo(location: number): void;
    /**
     * Scrolls the content to an item found using its DOM node.
     */
    scrollToItem(itemElement: Element): void;
    /**
     * Scrolls the content to an item with a specific index.
     */
    scrollToItem(itemIndex: number | any): void;
    /**
     * Gets the top scroll offset.
     */
    scrollTop(): number;
    /**
     * Selects all items.
     */
    selectAll(): void;
    /**
     * Selects an item found using its DOM node.
     */
    selectItem(itemElement: Element): void;
    /**
     * Selects an item with a specific index.
     */
    selectItem(itemIndex: number | any): void;
    /**
     * Cancels the selection of all items.
     */
    unselectAll(): void;
    /**
     * Cancels the selection of an item found using its DOM node.
     */
    unselectItem(itemElement: Element): void;
    /**
     * Cancels the selection of an item with a specific index.
     */
    unselectItem(itemIndex: number | any): void;
    /**
     * Updates the UI component scrollbar according to UI component content size.
     */
    updateDimensions(): Promise<void> & JQueryPromise<void>;
}

/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export interface dxListItem extends CollectionWidgetItem {
    /**
     * Specifies the text of a badge displayed for the list item.
     */
    badge?: string;
    /**
     * Specifies the list item's icon.
     */
    icon?: string;
    /**
     * Specifies the name of the list items group in a grouped list.
     */
    key?: string;
    /**
     * Specifies whether or not to display a chevron for the list item.
     */
    showChevron?: boolean;
}

declare global {
interface JQuery {
    dxList(): JQuery;
    dxList(options: "instance"): dxList;
    dxList(options: string): any;
    dxList(options: string, ...params: any[]): any;
    dxList(options: dxListOptions): JQuery;
}
}
/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export type Options = dxListOptions;

/** @deprecated use Options instead */
/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export type IOptions = dxListOptions;
