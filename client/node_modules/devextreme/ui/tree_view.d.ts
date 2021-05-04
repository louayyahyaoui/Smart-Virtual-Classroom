/**
* DevExtreme (ui/tree_view.d.ts)
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

import {
    CollectionWidgetItem
} from './collection/ui.collection_widget.base';

import HierarchicalCollectionWidget, {
    HierarchicalCollectionWidgetOptions
} from './hierarchical_collection/ui.hierarchical_collection_widget';

import {
    SearchBoxMixinOptions
} from './widget/ui.search_box_mixin';

/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export interface dxTreeViewOptions extends HierarchicalCollectionWidgetOptions<dxTreeView>, SearchBoxMixinOptions<dxTreeView> {
    /**
     * Specifies whether or not to animate item collapsing and expanding.
     */
    animationEnabled?: boolean;
    /**
     * Allows you to load nodes on demand.
     */
    createChildren?: ((parentNode: dxTreeViewNode) => Promise<any> | JQueryPromise<any> | Array<any>);
    /**
     * Binds the UI component to data.
     */
    dataSource?: string | Array<dxTreeViewItem> | DataSource | DataSourceOptions;
    /**
     * Notifies the UI component of the used data structure.
     */
    dataStructure?: 'plain' | 'tree';
    /**
     * Specifies whether or not a user can expand all tree view items by the '*' hot key.
     */
    expandAllEnabled?: boolean;
    /**
     * Specifies the event on which to expand/collapse a node.
     */
    expandEvent?: 'dblclick' | 'click';
    /**
     * Specifies whether or not all parent nodes of an initially expanded node are displayed expanded.
     */
    expandNodesRecursive?: boolean;
    /**
     * Specifies which data source field specifies whether an item is expanded.
     */
    expandedExpr?: string | Function;
    /**
     * Specifies the name of the data source item field whose value defines whether or not the corresponding node includes child nodes.
     */
    hasItemsExpr?: string | Function;
    /**
     * An array of items displayed by the UI component.
     */
    items?: Array<dxTreeViewItem>;
    /**
     * A function that is executed when a collection item is clicked or tapped.
     */
    onItemClick?: ((e: { component?: dxTreeView, element?: dxElement, model?: any, itemData?: any, itemElement?: dxElement, itemIndex?: number | any, event?: event, node?: dxTreeViewNode }) => any);
    /**
     * A function that is executed when a tree view item is collapsed.
     */
    onItemCollapsed?: ((e: { component?: dxTreeView, element?: dxElement, model?: any, itemData?: any, itemElement?: dxElement, itemIndex?: number, event?: event, node?: dxTreeViewNode }) => any);
    /**
     * A function that is executed when a collection item is right-clicked or pressed.
     */
    onItemContextMenu?: ((e: { component?: dxTreeView, element?: dxElement, model?: any, itemData?: any, itemElement?: dxElement, itemIndex?: number | any, event?: event, node?: dxTreeViewNode }) => any);
    /**
     * A function that is executed when a tree view item is expanded.
     */
    onItemExpanded?: ((e: { component?: dxTreeView, element?: dxElement, model?: any, itemData?: any, itemElement?: dxElement, itemIndex?: number, event?: event, node?: dxTreeViewNode }) => any);
    /**
     * A function that is executed when a collection item has been held for a specified period.
     */
    onItemHold?: ((e: { component?: dxTreeView, element?: dxElement, model?: any, itemData?: any, itemElement?: dxElement, itemIndex?: number, event?: event, node?: dxTreeViewNode }) => any);
    /**
     * A function that is executed after a collection item is rendered.
     */
    onItemRendered?: ((e: { component?: dxTreeView, element?: dxElement, model?: any, itemData?: any, itemElement?: dxElement, itemIndex?: number, node?: dxTreeViewNode }) => any);
    /**
     * A function that is executed when a single TreeView item is selected or selection is canceled.
     */
    onItemSelectionChanged?: ((e: { component?: dxTreeView, element?: dxElement, model?: any, node?: dxTreeViewNode, itemElement?: dxElement }) => any);
    /**
     * A function that is executed when the 'Select All' check box value is changed. Applies only if showCheckBoxesMode is 'selectAll' and selectionMode is 'multiple'.
     */
    onSelectAllValueChanged?: ((e: { component?: dxTreeView, element?: dxElement, model?: any, value?: boolean }) => any);
    /**
     * A function that is executed when a TreeView item is selected or selection is canceled.
     */
    onSelectionChanged?: ((e: { component?: dxTreeView, element?: dxElement, model?: any }) => any);
    /**
     * Specifies the name of the data source item field for holding the parent key of the corresponding node.
     */
    parentIdExpr?: string | Function;
    /**
     * Specifies the parent ID value of the root item.
     */
    rootValue?: any;
    /**
     * A string value specifying available scrolling directions.
     */
    scrollDirection?: 'both' | 'horizontal' | 'vertical';
    /**
     * Specifies the text displayed at the 'Select All' check box.
     */
    selectAllText?: string;
    /**
     * Specifies whether an item becomes selected if a user clicks it.
     */
    selectByClick?: boolean;
    /**
     * Specifies whether all child nodes should be selected when their parent node is selected. Applies only if the selectionMode is 'multiple'.
     */
    selectNodesRecursive?: boolean;
    /**
     * Specifies item selection mode. Applies only if selection is enabled.
     */
    selectionMode?: 'multiple' | 'single';
    /**
     * Specifies the checkbox display mode.
     */
    showCheckBoxesMode?: 'none' | 'normal' | 'selectAll';
    /**
     * Enables the virtual mode in which nodes are loaded on demand. Use it to enhance the performance on large datasets.
     */
    virtualModeEnabled?: boolean;
}
/**
 * The TreeView UI component is a tree-like representation of textual data.
 */
export default class dxTreeView extends HierarchicalCollectionWidget {
    constructor(element: Element, options?: dxTreeViewOptions)
    constructor(element: JQuery, options?: dxTreeViewOptions)
    /**
     * Collapses all items.
     */
    collapseAll(): void;
    /**
     * Collapses an item with a specific key.
     */
    collapseItem(itemData: any): Promise<void> & JQueryPromise<void>;
    /**
     * Collapses an item found using its DOM node.
     */
    collapseItem(itemElement: Element): Promise<void> & JQueryPromise<void>;
    /**
     * Collapses an item with a specific key.
     */
    collapseItem(key: any): Promise<void> & JQueryPromise<void>;
    /**
     * Expands all items. If you load items on demand, this method expands only the loaded items.
     */
    expandAll(): void;
    /**
     * Expands an item found using its data object.
     */
    expandItem(itemData: any): Promise<void> & JQueryPromise<void>;
    /**
     * Expands an item found using its DOM node.
     */
    expandItem(itemElement: Element): Promise<void> & JQueryPromise<void>;
    /**
     * Expands an item with a specific key.
     */
    expandItem(key: any): Promise<void> & JQueryPromise<void>;
    /**
     * Gets all nodes.
     */
    getNodes(): Array<dxTreeViewNode>;
    /**
     * Gets selected nodes.
     */
    getSelectedNodes(): Array<dxTreeViewNode>;
    /**
     * Gets the keys of selected nodes.
     */
    getSelectedNodeKeys(): Array<any>;
    /**
     * Selects all nodes.
     */
    selectAll(): void;
    /**
     * Selects a node found using its data object.
     */
    selectItem(itemData: any): boolean;
    /**
     * Selects a TreeView node found using its DOM node.
     */
    selectItem(itemElement: Element): boolean;
    /**
     * Selects a node with a specific key.
     */
    selectItem(key: any): boolean;
    /**
     * Cancels the selection of all nodes.
     */
    unselectAll(): void;
    /**
     * Cancels the selection of a node found using its data object.
     */
    unselectItem(itemData: any): boolean;
    /**
     * Cancels the selection of a TreeView node found using its DOM node.
     */
    unselectItem(itemElement: Element): boolean;
    /**
     * Cancels the selection of a node with a specific key.
     */
    unselectItem(key: any): boolean;
    /**
     * Updates the tree view scrollbars according to the current size of the UI component content.
     */
    updateDimensions(): Promise<void> & JQueryPromise<void>;
    /**
     * Scrolls the content to an item found using its data.
     */
    scrollToItem(itemData: any): Promise<void> & JQueryPromise<void>;
    /**
     * Scrolls the content to an item found using its DOM node.
     */
    scrollToItem(itemElement: Element): Promise<void> & JQueryPromise<void>;
    /**
     * Scrolls the content to an item found using its key.
     */
    scrollToItem(key: any): Promise<void> & JQueryPromise<void>;
}

/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export interface dxTreeViewItem extends CollectionWidgetItem {
    /**
     * Specifies whether or not the tree view item is displayed expanded.
     */
    expanded?: boolean;
    /**
     * Specifies whether or not the tree view item has children.
     */
    hasItems?: boolean;
    /**
     * Specifies the tree view item's icon.
     */
    icon?: string;
    /**
     * Specifies nested tree view items.
     */
    items?: Array<dxTreeViewItem>;
    /**
     * Holds the key of the parent item.
     */
    parentId?: number | string;
    /**
     * Specifies whether the TreeView item should be displayed as selected.
     */
    selected?: boolean;
}

/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export interface dxTreeViewNode {
    /**
     * Contains all the child nodes of the current node.
     */
    children?: Array<dxTreeViewNode>;
    /**
     * Equals to true if the node is disabled; otherwise false.
     */
    disabled?: boolean;
    /**
     * Equals true if the node is expanded; false if collapsed.
     */
    expanded?: boolean;
    /**
     * Contains the data source object corresponding to the node.
     */
    itemData?: any;
    /**
     * Contains the key value of the node.
     */
    key?: any;
    /**
     * Refers to the parent node of the current node.
     */
    parent?: dxTreeViewNode;
    /**
     * Equals to true if the node is selected; false if not.
     */
    selected?: boolean;
    /**
     * Contains the text displayed by the node.
     */
    text?: string;
}

declare global {
interface JQuery {
    dxTreeView(): JQuery;
    dxTreeView(options: "instance"): dxTreeView;
    dxTreeView(options: string): any;
    dxTreeView(options: string, ...params: any[]): any;
    dxTreeView(options: dxTreeViewOptions): JQuery;
}
}
/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export type Options = dxTreeViewOptions;

/** @deprecated use Options instead */
/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export type IOptions = dxTreeViewOptions;
