/**
* DevExtreme (ui/tree_list.d.ts)
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

import DataSource from '../data/data_source';

import {
    event
} from '../events/index';

import {
    GridBase,
    GridBaseColumn,
    GridBaseColumnButton,
    GridBaseEditing,
    GridBaseEditingTexts,
    GridBaseOptions,
    GridBasePaging,
    GridBaseScrolling,
    GridBaseSelection
} from './data_grid';

import dxScrollable from './scroll_view/ui.scrollable';

import Widget from './widget/ui.widget';
/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export interface dxTreeListOptions extends GridBaseOptions<dxTreeList> {
    /**
     * Specifies whether all rows are expanded initially.
     */
    autoExpandAll?: boolean;
    /**
     * Configures columns.
     */
    columns?: Array<dxTreeListColumn | string>;
    /**
     * Customizes columns after they are created.
     */
    customizeColumns?: ((columns: Array<dxTreeListColumn>) => any);
    /**
     * Notifies the UI component of the used data structure.
     */
    dataStructure?: 'plain' | 'tree';
    /**
     * Configures editing.
     */
    editing?: dxTreeListEditing;
    /**
     * Specifies whether nodes appear expanded or collapsed after filtering is applied.
     */
    expandNodesOnFiltering?: boolean;
    /**
     * Specifies keys of the initially expanded rows.
     */
    expandedRowKeys?: Array<any>;
    /**
     * Specifies whether filter and search results should include matching rows only, matching rows with ancestors, or matching rows with ancestors and descendants (full branch).
     */
    filterMode?: 'fullBranch' | 'withAncestors' | 'matchOnly';
    /**
     * Specifies which data field defines whether the node has children.
     */
    hasItemsExpr?: string | Function;
    /**
     * Specifies which data field contains nested items. Set this property when your data has a hierarchical structure.
     */
    itemsExpr?: string | Function;
    /**
     * Specifies the key property (or properties) that provide(s) key values to access data items. Each key value must be unique.
     */
    keyExpr?: string | Function;
    /**
     * A function that is executed when a cell is clicked or tapped. Executed before onRowClick.
     */
    onCellClick?: ((e: { component?: dxTreeList, element?: dxElement, model?: any, event?: event, data?: any, key?: any, value?: any, displayValue?: any, text?: string, columnIndex?: number, column?: any, rowIndex?: number, rowType?: string, cellElement?: dxElement, row?: dxTreeListRowObject }) => any) | string;
    /**
     * A function that is executed when a cell is double-clicked or double-tapped. Executed before onRowDblClick.
     */
    onCellDblClick?: ((e: { component?: dxTreeList, element?: dxElement, model?: any, event?: event, data?: any, key?: any, value?: any, displayValue?: any, text?: string, columnIndex?: number, column?: dxTreeListColumn, rowIndex?: number, rowType?: string, cellElement?: dxElement, row?: dxTreeListRowObject }) => any);
    /**
     * A function that is executed after the pointer enters or leaves a cell.
     */
    onCellHoverChanged?: ((e: { component?: dxTreeList, element?: dxElement, model?: any, eventType?: string, data?: any, key?: any, value?: any, text?: string, displayValue?: any, columnIndex?: number, rowIndex?: number, column?: dxTreeListColumn, rowType?: string, cellElement?: dxElement, row?: dxTreeListRowObject }) => any);
    /**
     * A function that is executed after a grid cell is created.
     */
    onCellPrepared?: ((e: { component?: dxTreeList, element?: dxElement, model?: any, data?: any, key?: any, value?: any, displayValue?: any, text?: string, columnIndex?: number, column?: dxTreeListColumn, rowIndex?: number, rowType?: string, row?: dxTreeListRowObject, isSelected?: boolean, isExpanded?: boolean, isNewRow?: boolean, cellElement?: dxElement, watch?: Function, oldValue?: any }) => any);
    /**
     * A function that is executed before the context menu is rendered.
     */
    onContextMenuPreparing?: ((e: { component?: dxTreeList, element?: dxElement, model?: any, items?: Array<any>, target?: string, targetElement?: dxElement, columnIndex?: number, column?: dxTreeListColumn, rowIndex?: number, row?: dxTreeListRowObject }) => any);
    /**
     * A function that is executed before a cell or row switches to the editing state.
     */
    onEditingStart?: ((e: { component?: dxTreeList, element?: dxElement, model?: any, data?: any, key?: any, cancel?: boolean, column?: any }) => any);
    /**
     * A function that is executed after an editor is created. Not executed for cells with an editCellTemplate.
     */
    onEditorPrepared?: ((options: { component?: dxTreeList, element?: dxElement, model?: any, parentType?: string, value?: any, setValue?: any, updateValueTimeout?: number, width?: number, disabled?: boolean, rtlEnabled?: boolean, editorElement?: dxElement, readOnly?: boolean, dataField?: string, row?: dxTreeListRowObject }) => any);
    /**
     * 
     */
    onEditorPreparing?: ((e: { component?: dxTreeList, element?: dxElement, model?: any, parentType?: string, value?: any, setValue?: any, updateValueTimeout?: number, width?: number, disabled?: boolean, rtlEnabled?: boolean, cancel?: boolean, editorElement?: dxElement, readOnly?: boolean, editorName?: string, editorOptions?: any, dataField?: string, row?: dxTreeListRowObject }) => any);
    /**
     * A function that is executed after the focused cell changes. Applies only to cells in data rows.
     */
    onFocusedCellChanged?: ((e: { component?: dxTreeList, element?: dxElement, model?: any, cellElement?: dxElement, columnIndex?: number, rowIndex?: number, row?: dxTreeListRowObject, column?: dxTreeListColumn }) => any);
    /**
     * A function that is executed before the focused cell changes. Applies only to cells in data rows.
     */
    onFocusedCellChanging?: ((e: { component?: dxTreeList, element?: dxElement, model?: any, cellElement?: dxElement, prevColumnIndex?: number, prevRowIndex?: number, newColumnIndex?: number, newRowIndex?: number, event?: event, rows?: Array<dxTreeListRowObject>, columns?: Array<dxTreeListColumn>, cancel?: boolean, isHighlighted?: boolean }) => any);
    /**
     * A function that executed when the focused row changes. Applies only to data rows. focusedRowEnabled should be true.
     */
    onFocusedRowChanged?: ((e: { component?: dxTreeList, element?: dxElement, model?: any, rowElement?: dxElement, rowIndex?: number, row?: dxTreeListRowObject }) => any);
    /**
     * A function that is executed before the focused row changes. Applies only to data rows. focusedRowEnabled should be true.
     */
    onFocusedRowChanging?: ((e: { component?: dxTreeList, element?: dxElement, model?: any, rowElement?: dxElement, prevRowIndex?: number, newRowIndex?: number, event?: event, rows?: Array<dxTreeListRowObject>, cancel?: boolean }) => any);
    /**
     * A function that is executed after the loaded nodes are initialized.
     */
    onNodesInitialized?: ((e: { component?: dxTreeList, element?: dxElement, model?: any, root?: dxTreeListNode }) => any);
    /**
     * A function that is executed when a grid row is clicked or tapped.
     */
    onRowClick?: ((e: { component?: dxTreeList, element?: dxElement, model?: any, event?: event, data?: any, key?: any, values?: Array<any>, columns?: Array<any>, rowIndex?: number, rowType?: string, isSelected?: boolean, isExpanded?: boolean, isNewRow?: boolean, rowElement?: dxElement, handled?: boolean, node?: dxTreeListNode, level?: number }) => any) | string;
    /**
     * A function that is executed when a row is double-clicked or double-tapped. Executed after onCellDblClick.
     */
    onRowDblClick?: ((e: { component?: dxTreeList, element?: dxElement, model?: any, event?: event, data?: any, key?: any, values?: Array<any>, columns?: Array<dxTreeListColumn>, rowIndex?: number, rowType?: string, isSelected?: boolean, isExpanded?: boolean, isNewRow?: boolean, rowElement?: dxElement }) => any);
    /**
     * A function that is executed after a row is created.
     */
    onRowPrepared?: ((e: { component?: dxTreeList, element?: dxElement, model?: any, data?: any, key?: any, values?: Array<any>, columns?: Array<dxTreeListColumn>, rowIndex?: number, rowType?: string, isSelected?: boolean, isExpanded?: boolean, isNewRow?: boolean, rowElement?: dxElement, node?: dxTreeListNode, level?: number }) => any);
    /**
     * Configures paging.
     */
    paging?: dxTreeListPaging;
    /**
     * Specifies which data field provides parent keys.
     */
    parentIdExpr?: string | Function;
    /**
     * Notifies the TreeList of the server's data processing operations. Applies only if data has a plain structure.
     */
    remoteOperations?: { filtering?: boolean, grouping?: boolean, sorting?: boolean } | 'auto';
    /**
     * Specifies the root node's identifier. Applies if dataStructure is 'plain'.
     */
    rootValue?: any;
    /**
     * Configures scrolling.
     */
    scrolling?: dxTreeListScrolling;
    /**
     * Configures runtime selection.
     */
    selection?: dxTreeListSelection;
}
/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export interface dxTreeListEditing extends GridBaseEditing {
    /**
     * Specifies whether a user can add new rows. It is called for each data row when defined as a function.
     */
    allowAdding?: boolean | ((options: { component?: dxTreeList, row?: dxTreeListRowObject }) => boolean);
    /**
     * Specifies whether a user can delete rows. It is called for each data row when defined as a function.
     */
    allowDeleting?: boolean | ((options: { component?: dxTreeList, row?: dxTreeListRowObject }) => boolean);
    /**
     * Specifies whether a user can update rows. It is called for each data row when defined as a function
     */
    allowUpdating?: boolean | ((options: { component?: dxTreeList, row?: dxTreeListRowObject }) => boolean);
    /**
     * Contains properties that specify texts for editing-related UI elements.
     */
    texts?: dxTreeListEditingTexts;
}
/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export interface dxTreeListEditingTexts extends GridBaseEditingTexts {
    /**
     * Specifies text for the button that adds a new nested row. Applies if the editing.mode is 'batch' or 'cell'.
     */
    addRowToNode?: string;
}
/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export interface dxTreeListPaging extends GridBasePaging {
    /**
     * Enables paging.
     */
    enabled?: boolean;
}
/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export interface dxTreeListScrolling extends GridBaseScrolling {
    /**
     * Specifies the scrolling mode.
     */
    mode?: 'standard' | 'virtual';
}
/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export interface dxTreeListSelection extends GridBaseSelection {
    /**
     * Specifies whether selection is recursive.
     */
    recursive?: boolean;
}
/**
 * The TreeList is a UI component that represents data from a local or remote source in the form of a multi-column tree view. This UI component offers such features as sorting, filtering, editing, selection, etc.
 */
export default class dxTreeList extends Widget implements GridBase {
    constructor(element: Element, options?: dxTreeListOptions)
    constructor(element: JQuery, options?: dxTreeListOptions)
    /**
     * Adds a new column.
     */
    addColumn(columnOptions: any | string): void;
    /**
     * Adds an empty data row to the highest hierarchical level and switches it to the editing state.
     */
    addRow(): Promise<void> & JQueryPromise<void>;
    /**
     * Adds an empty data row to a specified parent row.
     */
    addRow(parentId: any): Promise<void> & JQueryPromise<void>;
    /**
     * Collapses a row with a specific key.
     */
    collapseRow(key: any): Promise<void> & JQueryPromise<void>;
    /**
     * Expands a row with a specific key.
     */
    expandRow(key: any): Promise<void> & JQueryPromise<void>;
    /**
     * Performs a pre-order tree traversal, executing a function on each visited node. Starts traversing from the top level nodes.
     */
    forEachNode(callback: Function): void;
    /**
     * Performs a pre-order tree traversal, executing a function on each visited node. Starts traversing from the specified nodes.
     */
    forEachNode(nodes: Array<dxTreeListNode>, callback: Function): void;
    /**
     * Gets a node with a specific key.
     */
    getNodeByKey(key: any | string | number): dxTreeListNode;
    /**
     * Gets the root node.
     */
    getRootNode(): dxTreeListNode;
    /**
     * Gets the keys of the rows selected explicitly via the API or via a click or tap.
     */
    getSelectedRowKeys(): Array<any>;
    /**
     * Gets the selected rows' keys.
     */
    getSelectedRowKeys(mode: string): Array<any>;
    /**
     * Gets the data objects of the rows selected explicitly via the API or via a click or tap.
     */
    getSelectedRowsData(): Array<any>;
    /**
     * Gets the selected rows' data objects.
     */
    getSelectedRowsData(mode: string): Array<any>;
    /**
     * Gets all visible columns.
     */
    getVisibleColumns(): Array<dxTreeListColumn>;
    /**
     * Gets all visible columns at a specific hierarchical level of column headers. Use it to access banded columns.
     */
    getVisibleColumns(headerLevel: number): Array<dxTreeListColumn>;
    /**
     * Gets currently rendered rows.
     */
    getVisibleRows(): Array<dxTreeListRowObject>;
    /**
     * Checks whether a row is expanded or collapsed.
     */
    isRowExpanded(key: any): boolean;
    /**
     * Loads all root node descendants (all data items). Takes effect only if data has the plain structure and remoteOperations | filtering is true.
     */
    loadDescendants(): Promise<void> & JQueryPromise<void>;
    /**
     * Loads a specific node's descendants. Takes effect only if data has the plain structure and remoteOperations | filtering is true.
     */
    loadDescendants(keys: Array<any>): Promise<void> & JQueryPromise<void>;
    /**
     * Loads all or only direct descendants of specific nodes. Takes effect only if data has the plain structure and remoteOperations | filtering is true.
     */
    loadDescendants(keys: Array<any>, childrenOnly: boolean): Promise<void> & JQueryPromise<void>;

    beginCustomLoading(messageText: string): void;
    byKey(key: any | string | number): Promise<any> & JQueryPromise<any>;
    cancelEditData(): void;
    cellValue(rowIndex: number, dataField: string): any;
    cellValue(rowIndex: number, dataField: string, value: any): void;
    cellValue(rowIndex: number, visibleColumnIndex: number): any;
    cellValue(rowIndex: number, visibleColumnIndex: number, value: any): void;
    clearFilter(): void;
    clearFilter(filterName: string): void;
    clearSelection(): void;
    clearSorting(): void;
    closeEditCell(): void;
    collapseAdaptiveDetailRow(): void;
    columnCount(): number;
    columnOption(id: number | string): any;
    columnOption(id: number | string, optionName: string): any;
    columnOption(id: number | string, optionName: string, optionValue: any): void;
    columnOption(id: number | string, options: any): void;
    deleteColumn(id: number | string): void;
    deleteRow(rowIndex: number): void;
    deselectAll(): Promise<void> & JQueryPromise<void>;
    deselectRows(keys: Array<any>): Promise<any> & JQueryPromise<any>;
    editCell(rowIndex: number, dataField: string): void;
    editCell(rowIndex: number, visibleColumnIndex: number): void;
    editRow(rowIndex: number): void;
    endCustomLoading(): void;
    expandAdaptiveDetailRow(key: any): void;
    filter(): any;
    filter(filterExpr: any): void;
    focus(): void;
    focus(element: Element | JQuery): void;
    getCellElement(rowIndex: number, dataField: string): dxElement | undefined;
    getCellElement(rowIndex: number, visibleColumnIndex: number): dxElement | undefined;
    getCombinedFilter(): any;
    getCombinedFilter(returnDataField: boolean): any;
    getDataSource(): DataSource;
    getKeyByRowIndex(rowIndex: number): any;
    getRowElement(rowIndex: number): Array<Element> & JQuery | undefined;
    getRowIndexByKey(key: any | string | number): number;
    getScrollable(): dxScrollable;
    getVisibleColumnIndex(id: number | string): number;
    hasEditData(): boolean;
    hideColumnChooser(): void;
    isAdaptiveDetailRowExpanded(key: any): boolean;
    isRowFocused(key: any): boolean;
    isRowSelected(key: any): boolean;
    keyOf(obj: any): any;
    navigateToRow(key: any): void;
    pageCount(): number;
    pageIndex(): number;
    pageIndex(newIndex: number): Promise<void> & JQueryPromise<void>;
    pageSize(): number;
    pageSize(value: number): void;
    refresh(): Promise<void> & JQueryPromise<void>;
    refresh(changesOnly: boolean): Promise<void> & JQueryPromise<void>;
    repaintRows(rowIndexes: Array<number>): void;
    saveEditData(): Promise<void> & JQueryPromise<void>;
    searchByText(text: string): void;
    selectAll(): Promise<void> & JQueryPromise<void>;
    selectRows(keys: Array<any>, preserve: boolean): Promise<any> & JQueryPromise<any>;
    selectRowsByIndexes(indexes: Array<number>): Promise<any> & JQueryPromise<any>;
    showColumnChooser(): void;
    state(): any;
    state(state: any): void;
    undeleteRow(rowIndex: number): void;
    updateDimensions(): void;
}

/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export interface dxTreeListColumn extends GridBaseColumn {
    /**
     * Allows you to customize buttons in the edit column or create a custom command column. Applies only if the column's type is 'buttons'.
     */
    buttons?: Array<'add' | 'cancel' | 'delete' | 'edit' | 'save' | 'undelete' | dxTreeListColumnButton>;
    /**
     * Specifies a custom template for data cells.
     */
    cellTemplate?: template | ((cellElement: dxElement, cellInfo: { data?: any, component?: dxTreeList, value?: any, oldValue?: any, displayValue?: any, text?: string, columnIndex?: number, rowIndex?: number, column?: dxTreeListColumn, row?: dxTreeListRowObject, rowType?: string, watch?: Function }) => any);
    /**
     * Configures columns.
     */
    columns?: Array<dxTreeListColumn | string>;
    /**
     * Specifies a custom template for data cells in editing state.
     */
    editCellTemplate?: template | ((cellElement: dxElement, cellInfo: { setValue?: any, data?: any, component?: dxTreeList, value?: any, displayValue?: any, text?: string, columnIndex?: number, rowIndex?: number, column?: dxTreeListColumn, row?: dxTreeListRowObject, rowType?: string, watch?: Function }) => any);
    /**
     * Specifies a custom template for column headers.
     */
    headerCellTemplate?: template | ((columnHeader: dxElement, headerInfo: { component?: dxTreeList, columnIndex?: number, column?: dxTreeListColumn }) => any);
    /**
     * Specifies the command column that this object customizes.
     */
    type?: 'adaptive' | 'buttons';
}

/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export interface dxTreeListColumnButton extends GridBaseColumnButton {
    /**
     * 
     */
    name?: 'add' | 'cancel' | 'delete' | 'edit' | 'save' | 'undelete' | string;
    /**
     * A function that is executed when the button is clicked or tapped. Not executed if a template is used.
     */
    onClick?: ((e: { component?: dxTreeList, element?: dxElement, model?: any, event?: event, row?: dxTreeListRowObject, column?: dxTreeListColumn }) => any) | string;
    /**
     * Specifies a custom button template.
     */
    template?: template | ((cellElement: dxElement, cellInfo: { component?: dxTreeList, data?: any, key?: any, columnIndex?: number, column?: dxTreeListColumn, rowIndex?: number, rowType?: string, row?: dxTreeListRowObject }) => string | Element | JQuery);
    /**
     * 
     */
    visible?: boolean | ((options: { component?: dxTreeList, row?: dxTreeListRowObject, column?: dxTreeListColumn }) => boolean);
}

/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export interface dxTreeListNode {
    /**
     * Contains all child nodes.
     */
    children?: Array<dxTreeListNode>;
    /**
     * The node's data object.
     */
    data?: any;
    /**
     * Indicates whether the node has child nodes.
     */
    hasChildren?: boolean;
    /**
     * The node's key.
     */
    key?: any;
    /**
     * The node's hierarchical level.
     */
    level?: number;
    /**
     * The parent node.
     */
    parent?: dxTreeListNode;
    /**
     * Indicates whether the node is visualized as a row.
     */
    visible?: boolean;
}

/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export interface dxTreeListRowObject {
    /**
     * Indicates whether the row is in the editing state.
     */
    isEditing?: boolean;
    /**
     * Indicates whether the row is expanded or collapsed. Available if rowType is 'data' or 'detail'.
     */
    isExpanded?: boolean;
    /**
     * Indicates that the row is added, but not yet saved. Available if rowType is 'data'.
     */
    isNewRow?: boolean;
    /**
     * Indicates whether the row is selected. Available if rowType is 'data' or 'detail'.
     */
    isSelected?: boolean;
    /**
     * The row's key. Available if rowType is 'data', 'detail' or 'detailAdaptive'.
     */
    key?: any;
    /**
     * The row's hierarchical level. Available if rowType is 'data' or 'detail'.
     */
    level?: number;
    /**
     * The row's node. Available if rowType is 'data' or 'detail'.
     */
    node?: dxTreeListNode;
    /**
     * The row's visible index. This index is zero-based and available if rowType is 'data', 'detail' or 'detailAdaptive'.
     */
    rowIndex?: number;
    /**
     * The row's type.
     */
    rowType?: string;
    /**
     * Values displayed in the row's cells.
     */
    values?: Array<any>;
}

declare global {
interface JQuery {
    dxTreeList(): JQuery;
    dxTreeList(options: "instance"): dxTreeList;
    dxTreeList(options: string): any;
    dxTreeList(options: string, ...params: any[]): any;
    dxTreeList(options: dxTreeListOptions): JQuery;
}
}
/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export type Options = dxTreeListOptions;

/** @deprecated use Options instead */
/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export type IOptions = dxTreeListOptions;
