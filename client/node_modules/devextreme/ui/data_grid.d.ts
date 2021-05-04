/**
* DevExtreme (ui/data_grid.d.ts)
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

import Store from '../data/abstract_store';

import DataSource, {
    DataSourceOptions
} from '../data/data_source';

import {
    event
} from '../events/index';

import {
    ExcelDataGridCell
} from '../excel_exporter';

import {
    ExcelFont
} from '../exporter/excel/excel.doc_comments';

import dxDraggable from './draggable';

import {
    dxFilterBuilderOptions
} from './filter_builder';

import {
    dxFormOptions,
    dxFormSimpleItem
} from './form';

import {
    dxPopupOptions
} from './popup';

import dxScrollable from './scroll_view/ui.scrollable';

import dxSortable from './sortable';

import {
    dxToolbarOptions
} from './toolbar';

import {
    AsyncRule,
    CompareRule,
    CustomRule,
    EmailRule,
    NumericRule,
    PatternRule,
    RangeRule,
    RequiredRule,
    StringLengthRule
} from './validation_rules';

import Widget, {
    format,
    WidgetOptions
} from './widget/ui.widget';

/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export interface GridBaseOptions<T = GridBase> extends WidgetOptions<T> {
    /**
     * Specifies whether a user can reorder columns.
     */
    allowColumnReordering?: boolean;
    /**
     * Specifies whether a user can resize columns.
     */
    allowColumnResizing?: boolean;
    /**
     * Automatically scrolls to the focused row when the focusedRowKey is changed.
     */
    autoNavigateToFocusedRow?: boolean;
    /**
     * Specifies whether data should be cached.
     */
    cacheEnabled?: boolean;
    /**
     * Enables a hint that appears when a user hovers the mouse pointer over a cell with truncated content.
     */
    cellHintEnabled?: boolean;
    /**
     * Specifies whether columns should adjust their widths to the content.
     */
    columnAutoWidth?: boolean;
    /**
     * Configures the column chooser.
     */
    columnChooser?: { allowSearch?: boolean, emptyPanelText?: string, enabled?: boolean, height?: number, mode?: 'dragAndDrop' | 'select', searchTimeout?: number, title?: string, width?: number };
    /**
     * Configures column fixing.
     */
    columnFixing?: { enabled?: boolean, texts?: { fix?: string, leftPosition?: string, rightPosition?: string, unfix?: string } };
    /**
     * Specifies whether the UI component should hide columns to adapt to the screen or container size. Ignored if allowColumnResizing is true and columnResizingMode is 'widget'.
     */
    columnHidingEnabled?: boolean;
    /**
     * Specifies the minimum width of columns.
     */
    columnMinWidth?: number;
    /**
     * Specifies how the UI component resizes columns. Applies only if allowColumnResizing is true.
     */
    columnResizingMode?: 'nextColumn' | 'widget';
    /**
     * Specifies the width for all data columns. Has a lower priority than the column.width property.
     */
    columnWidth?: number;
    /**
     * Overridden.
     */
    columns?: Array<GridBaseColumn | string>;
    /**
     * Binds the UI component to data.
     */
    dataSource?: string | Array<any> | DataSource | DataSourceOptions;
    /**
     * Specifies the format in which date-time values should be sent to the server. Use it only if you do not specify the dataSource at design time.
     */
    dateSerializationFormat?: string;
    /**
     * Overriden.
     */
    editing?: GridBaseEditing;
    /**
     * Indicates whether to show the error row.
     */
    errorRowEnabled?: boolean;
    /**
     * Configures the integrated filter builder.
     */
    filterBuilder?: dxFilterBuilderOptions;
    /**
     * Configures the popup in which the integrated filter builder is shown.
     */
    filterBuilderPopup?: dxPopupOptions;
    /**
     * Configures the filter panel.
     */
    filterPanel?: { customizeText?: ((e: { component?: T, filterValue?: any, text?: string }) => string), filterEnabled?: boolean, texts?: { clearFilter?: string, createFilter?: string, filterEnabledHint?: string }, visible?: boolean };
    /**
     * Configures the filter row.
     */
    filterRow?: { applyFilter?: 'auto' | 'onClick', applyFilterText?: string, betweenEndText?: string, betweenStartText?: string, operationDescriptions?: { between?: string, contains?: string, endsWith?: string, equal?: string, greaterThan?: string, greaterThanOrEqual?: string, lessThan?: string, lessThanOrEqual?: string, notContains?: string, notEqual?: string, startsWith?: string }, resetOperationText?: string, showAllText?: string, showOperationChooser?: boolean, visible?: boolean };
    /**
     * Specifies whether to synchronize the filter row, header filter, and filter builder. The synchronized filter expression is stored in the filterValue property.
     */
    filterSyncEnabled?: boolean | 'auto';
    /**
     * Specifies a filter expression.
     */
    filterValue?: string | Array<any> | Function;
    /**
     * The index of the column that contains the focused data cell. This index is taken from the columns array.
     */
    focusedColumnIndex?: number;
    /**
     * Specifies whether the focused row feature is enabled.
     */
    focusedRowEnabled?: boolean;
    /**
     * Specifies or indicates the focused data row's index. Use this property when focusedRowEnabled is true.
     */
    focusedRowIndex?: number;
    /**
     * Specifies initially or currently focused grid row's key. Use it when focusedRowEnabled is true.
     */
    focusedRowKey?: any;
    /**
     * Configures the header filter feature.
     */
    headerFilter?: { allowSearch?: boolean, height?: number, searchTimeout?: number, texts?: { cancel?: string, emptyValue?: string, ok?: string }, visible?: boolean, width?: number };
    /**
     * Specifies whether to highlight rows and cells with edited data. repaintChangesOnly should be true.
     */
    highlightChanges?: boolean;
    /**
     * Configures keyboard navigation.
     */
    keyboardNavigation?: { editOnKeyPress?: boolean, enabled?: boolean, enterKeyAction?: 'startEdit' | 'moveFocus', enterKeyDirection?: 'none' | 'column' | 'row' };
    /**
     * Configures the load panel.
     */
    loadPanel?: { enabled?: boolean | 'auto', height?: number, indicatorSrc?: string, shading?: boolean, shadingColor?: string, showIndicator?: boolean, showPane?: boolean, text?: string, width?: number };
    /**
     * Specifies text shown when the UI component does not display any data.
     */
    noDataText?: string;
    /**
     * A function that is executed before an adaptive detail row is rendered.
     */
    onAdaptiveDetailRowPreparing?: ((e: { component?: T, element?: dxElement, model?: any, formOptions?: any }) => any);
    /**
     * A function that is executed when an error occurs in the data source.
     */
    onDataErrorOccurred?: ((e: { component?: T, element?: dxElement, model?: any, error?: Error }) => any);
    /**
     * A function that is executed after row changes are discarded.
     */
    onEditCanceled?: ((e: { component?: T, element?: dxElement, model?: any, changes?: Array<any> }) => any);
    /**
     * A function that is executed when the edit operation is canceled, but row changes are not yet discarded.
     */
    onEditCanceling?: ((e: { component?: T, element?: dxElement, model?: any, changes?: Array<any>, cancel?: boolean }) => any);
    /**
     * A function that is executed before a new row is added to the UI component.
     */
    onInitNewRow?: ((e: { component?: T, element?: dxElement, model?: any, data?: any, promise?: Promise<void> | JQueryPromise<void> }) => any);
    /**
     * A function that is executed when the UI component is in focus and a key has been pressed down.
     */
    onKeyDown?: ((e: { component?: T, element?: dxElement, model?: any, event?: event, handled?: boolean }) => any);
    /**
     * A function that is executed after a row is collapsed.
     */
    onRowCollapsed?: ((e: { component?: T, element?: dxElement, model?: any, key?: any }) => any);
    /**
     * A function that is executed before a row is collapsed.
     */
    onRowCollapsing?: ((e: { component?: T, element?: dxElement, model?: any, key?: any, cancel?: boolean }) => any);
    /**
     * A function that is executed after a row is expanded.
     */
    onRowExpanded?: ((e: { component?: T, element?: dxElement, model?: any, key?: any }) => any);
    /**
     * A function that is executed before a row is expanded.
     */
    onRowExpanding?: ((e: { component?: T, element?: dxElement, model?: any, key?: any, cancel?: boolean }) => any);
    /**
     * A function that is executed after a new row has been inserted into the data source.
     */
    onRowInserted?: ((e: { component?: T, element?: dxElement, model?: any, data?: any, key?: any, error?: Error }) => any);
    /**
     * A function that is executed before a new row is inserted into the data source.
     */
    onRowInserting?: ((e: { component?: T, element?: dxElement, model?: any, data?: any, cancel?: boolean | Promise<void> | JQueryPromise<void> }) => any);
    /**
     * A function that is executed after a row has been removed from the data source.
     */
    onRowRemoved?: ((e: { component?: T, element?: dxElement, model?: any, data?: any, key?: any, error?: Error }) => any);
    /**
     * A function that is executed before a row is removed from the data source.
     */
    onRowRemoving?: ((e: { component?: T, element?: dxElement, model?: any, data?: any, key?: any, cancel?: boolean | Promise<void> | JQueryPromise<void> }) => any);
    /**
     * A function that is executed after a row has been updated in the data source.
     */
    onRowUpdated?: ((e: { component?: T, element?: dxElement, model?: any, data?: any, key?: any, error?: Error }) => any);
    /**
     * A function that is executed before a row is updated in the data source.
     */
    onRowUpdating?: ((e: { component?: T, element?: dxElement, model?: any, oldData?: any, newData?: any, key?: any, cancel?: boolean | Promise<void> | JQueryPromise<void> }) => any);
    /**
     * A function that is executed after cells in a row are validated against validation rules.
     */
    onRowValidating?: ((e: { component?: T, element?: dxElement, model?: any, brokenRules?: Array<RequiredRule | NumericRule | RangeRule | StringLengthRule | CustomRule | CompareRule | PatternRule | EmailRule | AsyncRule>, isValid?: boolean, key?: any, newData?: any, oldData?: any, errorText?: string, promise?: Promise<void> | JQueryPromise<void> }) => any);
    /**
     * A function that is executed after row changes are saved.
     */
    onSaved?: ((e: { component?: T, element?: dxElement, model?: any, changes?: Array<any> }) => any);
    /**
     * A function that is executed before pending row changes are saved.
     */
    onSaving?: ((e: { component?: T, element?: dxElement, model?: any, changes?: Array<any>, promise?: Promise<void> | JQueryPromise<void>, cancel?: boolean }) => any);
    /**
     * A function that is executed after selecting a row or clearing its selection.
     */
    onSelectionChanged?: ((e: { component?: T, element?: dxElement, model?: any, currentSelectedRowKeys?: Array<any>, currentDeselectedRowKeys?: Array<any>, selectedRowKeys?: Array<any>, selectedRowsData?: Array<any> }) => any);
    /**
     * A function that is executed before the toolbar is created.
     */
    onToolbarPreparing?: ((e: { component?: T, element?: dxElement, model?: any, toolbarOptions?: dxToolbarOptions }) => any);
    /**
     * Configures the pager.
     */
    pager?: { allowedPageSizes?: Array<(number | 'all')> | 'auto', displayMode: 'adaptive' | 'compact' | 'full', infoText?: string, showInfo?: boolean, showNavigationButtons?: boolean, showPageSizeSelector?: boolean, visible?: boolean | 'auto' };
    /**
     * Configures paging.
     */
    paging?: GridBasePaging;
    /**
     * Specifies whether to render the filter row, command columns, and columns with showEditorAlways set to true after other elements.
     */
    renderAsync?: boolean;
    /**
     * Specifies whether to repaint only those cells whose data changed.
     */
    repaintChangesOnly?: boolean;
    /**
     * Specifies whether rows should be shaded differently.
     */
    rowAlternationEnabled?: boolean;
    /**
     * Configures row reordering using drag and drop gestures.
     */
    rowDragging?: { allowDropInsideItem?: boolean, allowReordering?: boolean, autoScroll?: boolean, boundary?: string | Element | JQuery, container?: string | Element | JQuery, cursorOffset?: string | { x?: number, y?: number }, data?: any, dragDirection?: 'both' | 'horizontal' | 'vertical', dragTemplate?: template | ((dragInfo: { itemData?: any, itemElement?: dxElement }, containerElement: dxElement) => string | Element | JQuery), dropFeedbackMode?: 'push' | 'indicate', filter?: string, group?: string, handle?: string, onAdd?: ((e: { component?: T, event?: event, itemData?: any, itemElement?: dxElement, fromIndex?: number, toIndex?: number, fromComponent?: dxSortable | dxDraggable, toComponent?: dxSortable | dxDraggable, fromData?: any, toData?: any, dropInsideItem?: boolean }) => any), onDragChange?: ((e: { component?: T, event?: event, cancel?: boolean, itemData?: any, itemElement?: dxElement, fromIndex?: number, toIndex?: number, fromComponent?: dxSortable | dxDraggable, toComponent?: dxSortable | dxDraggable, fromData?: any, toData?: any, dropInsideItem?: boolean }) => any), onDragEnd?: ((e: { component?: T, event?: event, cancel?: boolean, itemData?: any, itemElement?: dxElement, fromIndex?: number, toIndex?: number, fromComponent?: dxSortable | dxDraggable, toComponent?: dxSortable | dxDraggable, fromData?: any, toData?: any, dropInsideItem?: boolean }) => any), onDragMove?: ((e: { component?: T, event?: event, cancel?: boolean, itemData?: any, itemElement?: dxElement, fromIndex?: number, toIndex?: number, fromComponent?: dxSortable | dxDraggable, toComponent?: dxSortable | dxDraggable, fromData?: any, toData?: any, dropInsideItem?: boolean }) => any), onDragStart?: ((e: { component?: T, event?: event, cancel?: boolean, itemData?: any, itemElement?: dxElement, fromIndex?: number, fromData?: any }) => any), onRemove?: ((e: { component?: T, event?: event, itemData?: any, itemElement?: dxElement, fromIndex?: number, toIndex?: number, fromComponent?: dxSortable | dxDraggable, toComponent?: dxSortable | dxDraggable, fromData?: any, toData?: any }) => any), onReorder?: ((e: { component?: T, event?: event, itemData?: any, itemElement?: dxElement, fromIndex?: number, toIndex?: number, fromComponent?: dxSortable | dxDraggable, toComponent?: dxSortable | dxDraggable, fromData?: any, toData?: any, dropInsideItem?: boolean, promise?: Promise<void> | JQueryPromise<void> }) => any), scrollSensitivity?: number, scrollSpeed?: number, showDragIcons?: boolean };
    /**
     * Overridden. A configuration object specifying scrolling properties.
     */
    scrolling?: GridBaseScrolling;
    /**
     * Configures the search panel.
     */
    searchPanel?: { highlightCaseSensitive?: boolean, highlightSearchText?: boolean, placeholder?: string, searchVisibleColumnsOnly?: boolean, text?: string, visible?: boolean, width?: number };
    /**
     * Allows you to select rows or determine which rows are selected.
     */
    selectedRowKeys?: Array<any>;
    /**
     * Overridden.
     */
    selection?: GridBaseSelection;
    /**
     * Specifies whether the outer borders of the UI component are visible.
     */
    showBorders?: boolean;
    /**
     * Specifies whether column headers are visible.
     */
    showColumnHeaders?: boolean;
    /**
     * Specifies whether vertical lines that separate one column from another are visible.
     */
    showColumnLines?: boolean;
    /**
     * Specifies whether horizontal lines that separate one row from another are visible.
     */
    showRowLines?: boolean;
    /**
     * Configures runtime sorting.
     */
    sorting?: { ascendingText?: string, clearText?: string, descendingText?: string, mode?: 'multiple' | 'none' | 'single', showSortIndexes?: boolean };
    /**
     * Configures state storing.
     */
    stateStoring?: { customLoad?: (() => Promise<any> | JQueryPromise<any>), customSave?: ((gridState: any) => any), enabled?: boolean, savingTimeout?: number, storageKey?: string, type?: 'custom' | 'localStorage' | 'sessionStorage' };
    /**
     * Specifies whether to enable two-way data binding.
     */
    twoWayBindingEnabled?: boolean;
    /**
     * Specifies whether text that does not fit into a column should be wrapped.
     */
    wordWrapEnabled?: boolean;
}
/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export interface GridBaseEditing {
    /**
     * Specifies if confirmation is required when a user deletes a row.
     */
    confirmDelete?: boolean;
    /**
     * [tags] ctp Pending row changes.
     */
    changes?: Array<any>;
    /**
     * The name of a column being edited. Applies only if editing.mode is 'cell' or 'batch'.
     */
    editColumnName?: string;
    /**
     * The key(s) of a row being edited.
     */
    editRowKey?: any;
    /**
     * Configures the form. Used only if editing.mode is 'form' or 'popup'.
     */
    form?: dxFormOptions;
    /**
     * Specifies how a user edits data.
     */
    mode?: 'batch' | 'cell' | 'row' | 'form' | 'popup';
    /**
     * Configures the popup. Used only if editing.mode is 'popup'.
     */
    popup?: dxPopupOptions;
    /**
     * Specifies operations that are performed after saving changes.
     */
    refreshMode?: 'full' | 'reshape' | 'repaint';
    /**
     * Specifies whether to select text in a cell when a user starts editing.
     */
    selectTextOnEditStart?: boolean;
    /**
     * Specifies whether a single or double click should switch a cell to the editing state. Applies if editing.mode is 'cell' or 'batch'.
     */
    startEditAction?: 'click' | 'dblClick';
    /**
     * Contains properties that specify texts for editing-related UI elements.
     */
    texts?: GridBaseEditingTexts;
    /**
     * Specifies whether the edit column uses icons instead of links.
     */
    useIcons?: boolean;
}
/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export interface GridBaseEditingTexts {
    /**
     * Specifies text for a hint that appears when a user pauses on the global 'Add' button. Applies only if editing.allowAdding is true.
     */
    addRow?: string;
    /**
     * Specifies text for a hint that appears when a user pauses on the 'Discard' button. Applies only if editing.mode is 'batch'.
     */
    cancelAllChanges?: string;
    /**
     * Specifies text for a button that cancels changes in a row. Applies only if editing.allowUpdating is true and editing.mode is 'row'.
     */
    cancelRowChanges?: string;
    /**
     * Specifies a message that prompts a user to confirm deletion.
     */
    confirmDeleteMessage?: string;
    /**
     * Specifies a title for the window that asks a user to confirm deletion.
     */
    confirmDeleteTitle?: string;
    /**
     * Specifies text for buttons that delete rows. Applies only if allowDeleting is true.
     */
    deleteRow?: string;
    /**
     * Specifies text for buttons that switch rows into the editing state. Applies only if allowUpdating is true.
     */
    editRow?: string;
    /**
     * Specifies text for a hint that appears when a user pauses on the global 'Save' button. Applies only if editing.mode is 'batch'.
     */
    saveAllChanges?: string;
    /**
     * Specifies text for a button that saves changes made in a row. Applies only if allowUpdating is true.
     */
    saveRowChanges?: string;
    /**
     * Specifies text for buttons that recover deleted rows. Applies only if allowDeleting is true and editing.mode is 'batch'.
     */
    undeleteRow?: string;
    /**
     * Specifies text for a hint appearing when a user pauses on the button that cancels changes in a cell. Applies only if editing.mode is 'cell' and data validation is enabled.
     */
    validationCancelChanges?: string;
}
/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export interface GridBasePaging {
    /**
     * Enables paging.
     */
    enabled?: boolean;
    /**
     * Specifies the page to be displayed using a zero-based index.
     */
    pageIndex?: number;
    /**
     * Specifies the page size.
     */
    pageSize?: number;
}
/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export interface GridBaseScrolling {
    /**
     * Specifies the rendering mode for columns. Applies when columns are left outside the viewport. Requires the columnWidth, columnAutoWidth, or width (for all columns) property specified.
     */
    columnRenderingMode?: 'standard' | 'virtual';
    /**
     * Specifies whether the UI component should load adjacent pages. Applies only if scrolling.mode is 'virtual' or 'infinite'.
     */
    preloadEnabled?: boolean;
    /**
     * Specifies the rendering mode for loaded rows.
     */
    rowRenderingMode?: 'standard' | 'virtual';
    /**
     * Specifies whether a user can scroll the content with a swipe gesture. Applies only if useNative is false.
     */
    scrollByContent?: boolean;
    /**
     * Specifies whether a user can scroll the content with the scrollbar. Applies only if useNative is false.
     */
    scrollByThumb?: boolean;
    /**
     * Specifies when to show scrollbars. Applies only if useNative is false.
     */
    showScrollbar?: 'always' | 'never' | 'onHover' | 'onScroll';
    /**
     * Specifies whether the UI component should use native or simulated scrolling.
     */
    useNative?: boolean | 'auto';
}
/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export interface GridBaseSelection {
    /**
     * Specifies whether a user can select all rows at once.
     */
    allowSelectAll?: boolean;
    /**
     * Specifies the selection mode.
     */
    mode?: 'multiple' | 'none' | 'single';
}
/**
 * 
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export interface GridBase {
    /**
     * Shows the load panel.
     */
    beginCustomLoading(messageText: string): void;
    /**
     * Gets a data object with a specific key.
     */
    byKey(key: any | string | number): Promise<any> & JQueryPromise<any>;
    /**
     * Discards changes that a user made to data.
     */
    cancelEditData(): void;
    /**
     * Gets the value of a cell with a specific row index and a data field, column caption or name.
     */
    cellValue(rowIndex: number, dataField: string): any;
    /**
     * Sets a new value to a cell with a specific row index and a data field, column caption or name.
     */
    cellValue(rowIndex: number, dataField: string, value: any): void;
    /**
     * Gets the value of a cell with specific row and column indexes.
     */
    cellValue(rowIndex: number, visibleColumnIndex: number): any;
    /**
     * Sets a new value to a cell with specific row and column indexes.
     */
    cellValue(rowIndex: number, visibleColumnIndex: number, value: any): void;
    /**
     * Clears all filters applied to UI component rows.
     */
    clearFilter(): void;
    /**
     * Clears all row filters of a specific type.
     */
    clearFilter(filterName: string): void;
    /**
     * Clears selection of all rows on all pages.
     */
    clearSelection(): void;
    /**
     * Clears sorting settings of all columns at once.
     */
    clearSorting(): void;
    /**
     * Switches the cell being edited back to the normal state. Takes effect only if editing.mode is batch and showEditorAlways is false.
     */
    closeEditCell(): void;
    /**
     * Collapses the currently expanded adaptive detail row (if there is one).
     */
    collapseAdaptiveDetailRow(): void;
    /**
     * Gets the data column count. Includes visible and hidden columns, excludes command columns.
     */
    columnCount(): number;
    /**
     * Gets all properties of a column with a specific identifier.
     */
    columnOption(id: number | string): any;
    /**
     * Gets the value of a single column property.
     */
    columnOption(id: number | string, optionName: string): any;
    /**
     * Updates the value of a single column property.
     */
    columnOption(id: number | string, optionName: string, optionValue: any): void;
    /**
     * Updates the values of several column properties.
     */
    columnOption(id: number | string, options: any): void;
    /**
     * Removes a column.
     */
    deleteColumn(id: number | string): void;
    /**
     * Removes a row with a specific index.
     */
    deleteRow(rowIndex: number): void;
    /**
     * Clears the selection of all rows on all pages or the currently rendered page only.
     */
    deselectAll(): Promise<void> & JQueryPromise<void>;
    /**
     * Cancels the selection of rows with specific keys.
     */
    deselectRows(keys: Array<any>): Promise<any> & JQueryPromise<any>;
    /**
     * Switches a cell with a specific row index and a data field to the editing state. Takes effect only if the editing mode is 'batch' or 'cell'.
     */
    editCell(rowIndex: number, dataField: string): void;
    /**
     * Switches a cell with specific row and column indexes to the editing state. Takes effect only if the editing mode is 'batch' or 'cell'.
     */
    editCell(rowIndex: number, visibleColumnIndex: number): void;
    /**
     * Switches a row with a specific index to the editing state. Takes effect only if the editing mode is 'row', 'popup' or 'form'.
     */
    editRow(rowIndex: number): void;
    /**
     * Hides the load panel.
     */
    endCustomLoading(): void;
    /**
     * Expands an adaptive detail row.
     */
    expandAdaptiveDetailRow(key: any): void;
    /**
     * Gets a filter expression applied to the UI component's data source using the filter(filterExpr) method and the DataSource's filter property.
     */
    filter(): any;
    /**
     * Applies a filter to the UI component's data source.
     */
    filter(filterExpr: any): void;
    focus(): void;
    /**
     * Sets focus on a specific cell.
     */
    focus(element: Element | JQuery): void;
    /**
     * Gets a cell with a specific row index and a data field, column caption or name.
     */
    getCellElement(rowIndex: number, dataField: string): dxElement | undefined;
    /**
     * Gets a cell with specific row and column indexes.
     */
    getCellElement(rowIndex: number, visibleColumnIndex: number): dxElement | undefined;
    /**
     * Gets the total filter that combines all the filters applied.
     */
    getCombinedFilter(): any;
    /**
     * Gets the total filter that combines all the filters applied.
     */
    getCombinedFilter(returnDataField: boolean): any;
    getDataSource(): DataSource;
    /**
     * Gets the key of a row with a specific index.
     */
    getKeyByRowIndex(rowIndex: number): any;
    /**
     * Gets the container of a row with a specific index.
     */
    getRowElement(rowIndex: number): Array<Element> & JQuery | undefined;
    /**
     * Gets the index of a row with a specific key.
     */
    getRowIndexByKey(key: any | string | number): number;
    /**
     * Gets the instance of the UI component's scrollable part.
     */
    getScrollable(): dxScrollable;
    /**
     * Gets the index of a visible column.
     */
    getVisibleColumnIndex(id: number | string): number;
    /**
     * Checks whether the UI component has unsaved changes.
     */
    hasEditData(): boolean;
    /**
     * Hides the column chooser.
     */
    hideColumnChooser(): void;
    /**
     * Checks whether an adaptive detail row is expanded or collapsed.
     */
    isAdaptiveDetailRowExpanded(key: any): boolean;
    /**
     * Checks whether a row with a specific key is focused.
     */
    isRowFocused(key: any): boolean;
    /**
     * Checks whether a row with a specific key is selected.
     */
    isRowSelected(key: any): boolean;
    /**
     * Gets a data object's key.
     */
    keyOf(obj: any): any;
    /**
     * Navigates to a row with the specified key.
     */
    navigateToRow(key: any): void;
    /**
     * Gets the total page count.
     */
    pageCount(): number;
    /**
     * Gets the current page index.
     */
    pageIndex(): number;
    /**
     * Switches the UI component to a specific page using a zero-based index.
     */
    pageIndex(newIndex: number): Promise<void> & JQueryPromise<void>;
    /**
     * Gets the current page size.
     */
    pageSize(): number;
    /**
     * Sets the page size.
     */
    pageSize(value: number): void;
    /**
     * Reloads data and repaints the UI component.
     */
    refresh(): Promise<void> & JQueryPromise<void>;
    /**
     * Reloads data and repaints the UI component or elements whose data changed.
     */
    refresh(changesOnly: boolean): Promise<void> & JQueryPromise<void>;
    /**
     * Repaints specific rows.
     */
    repaintRows(rowIndexes: Array<number>): void;
    /**
     * Saves changes that a user made to data.
     */
    saveEditData(): Promise<void> & JQueryPromise<void>;
    /**
     * Seeks a search string in the columns whose allowSearch property is true.
     */
    searchByText(text: string): void;
    /**
     * Selects all rows.
     */
    selectAll(): Promise<void> & JQueryPromise<void>;
    /**
     * Selects rows with specific keys.
     */
    selectRows(keys: Array<any>, preserve: boolean): Promise<any> & JQueryPromise<any>;
    /**
     * Selects rows with specific indexes.
     */
    selectRowsByIndexes(indexes: Array<number>): Promise<any> & JQueryPromise<any>;
    /**
     * Shows the column chooser.
     */
    showColumnChooser(): void;
    /**
     * Gets the current UI component state.
     */
    state(): any;
    /**
     * Sets the UI component state.
     */
    state(state: any): void;
    /**
     * Recovers a row deleted in batch editing mode.
     */
    undeleteRow(rowIndex: number): void;
    /**
     * Updates the UI component's content after resizing.
     */
    updateDimensions(): void;
}

/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export interface GridBaseColumn {
    /**
     * Aligns the content of the column.
     */
    alignment?: 'center' | 'left' | 'right' | undefined;
    /**
     * Specifies whether a user can edit values in the column at runtime. By default, inherits the value of the editing.allowUpdating property.
     */
    allowEditing?: boolean;
    /**
     * Specifies whether data can be filtered by this column. Applies only if filterRow.visible is true.
     */
    allowFiltering?: boolean;
    /**
     * Specifies whether a user can fix the column at runtime. Applies only if columnFixing.enabled is true.
     */
    allowFixing?: boolean;
    /**
     * Specifies whether the header filter can be used to filter data by this column. Applies only if headerFilter.visible is true. By default, inherits the value of the allowFiltering property.
     */
    allowHeaderFiltering?: boolean;
    /**
     * Specifies whether a user can hide the column using the column chooser at runtime. Applies only if columnChooser.enabled is true.
     */
    allowHiding?: boolean;
    /**
     * Specifies whether this column can be used in column reordering at runtime. Applies only if allowColumnReordering is true.
     */
    allowReordering?: boolean;
    /**
     * Specifies whether a user can resize the column at runtime. Applies only if allowColumnResizing is true.
     */
    allowResizing?: boolean;
    /**
     * Specifies whether this column can be searched. Applies only if searchPanel.visible is true. Inherits the value of the allowFiltering property by default.
     */
    allowSearch?: boolean;
    /**
     * Specifies whether a user can sort rows by this column at runtime. Applies only if sorting.mode differs from 'none'.
     */
    allowSorting?: boolean;
    /**
     * Calculates custom cell values. Use this function to create an unbound data column.
     */
    calculateCellValue?: ((rowData: any) => any);
    /**
     * Calculates custom display values for column cells. Requires specifying the dataField or calculateCellValue property. Used in lookup optimization.
     */
    calculateDisplayValue?: string | ((rowData: any) => any);
    /**
     * Specifies the column's custom filtering rules.
     */
    calculateFilterExpression?: ((filterValue: any, selectedFilterOperation: string, target: string) => string | Array<any> | Function);
    /**
     * Calculates custom values used to sort this column.
     */
    calculateSortValue?: string | ((rowData: any) => any);
    /**
     * Specifies a caption for the column.
     */
    caption?: string;
    /**
     * Specifies a CSS class to be applied to the column.
     */
    cssClass?: string;
    /**
     * Customizes the text displayed in column cells.
     */
    customizeText?: ((cellInfo: { value?: string | number | Date, valueText?: string, target?: string, groupInterval?: string | number }) => string);
    /**
     * Binds the column to a field of the dataSource.
     */
    dataField?: string;
    /**
     * Casts column values to a specific data type.
     */
    dataType?: 'string' | 'number' | 'date' | 'boolean' | 'object' | 'datetime';
    /**
     * 
     */
    editorOptions?: any;
    /**
     * Specifies whether HTML tags are displayed as plain text or applied to the values of the column.
     */
    encodeHtml?: boolean;
    /**
     * In a boolean column, replaces all false items with a specified text. Applies only if showEditorAlways property is false.
     */
    falseText?: string;
    /**
     * Specifies the available filter operations. Applies if allowFiltering is true and the filterRow and/or filterPanel are visible.
     */
    filterOperations?: Array<'=' | '<>' | '<' | '<=' | '>' | '>=' | 'contains' | 'endswith' | 'isblank' | 'isnotblank' | 'notcontains' | 'startswith' | 'between' | 'anyof' | 'noneof'>;
    /**
     * Specifies whether a user changes the current filter by including (selecting) or excluding (clearing the selection of) values. Applies only if headerFilter.visible and allowHeaderFiltering are true.
     */
    filterType?: 'exclude' | 'include';
    /**
     * Specifies the column's filter value displayed in the filter row.
     */
    filterValue?: any;
    /**
     * Specifies values selected in the column's header filter.
     */
    filterValues?: Array<any>;
    /**
     * Fixes the column.
     */
    fixed?: boolean;
    /**
     * Specifies the UI component's edge to which the column is fixed. Applies only if columns[].fixed is true.
     */
    fixedPosition?: 'left' | 'right';
    /**
     * Configures the form item that the column produces in the editing state. Applies only if editing.mode is 'form' or 'popup'.
     */
    formItem?: dxFormSimpleItem;
    /**
     * Formats a value before it is displayed in a column cell.
     */
    format?: format;
    /**
     * Specifies data settings for the header filter.
     */
    headerFilter?: { allowSearch?: boolean, dataSource?: Array<any> | ((options: { component?: any, dataSource?: DataSourceOptions }) => any) | DataSourceOptions, groupInterval?: 'day' | 'hour' | 'minute' | 'month' | 'quarter' | 'second' | 'year' | number, height?: number, searchMode?: 'contains' | 'startswith' | 'equals', width?: number };
    /**
     * Specifies the order in which columns are hidden when the UI component adapts to the screen or container size. Ignored if allowColumnResizing is true and columnResizingMode is 'widget'.
     */
    hidingPriority?: number;
    /**
     * Specifies whether the column organizes other columns into bands.
     */
    isBand?: boolean;
    /**
     * Specifies properties of a lookup column.
     */
    lookup?: { allowClearing?: boolean, dataSource?: Array<any> | DataSourceOptions | Store | ((options: { data?: any, key?: any }) => Array<any> | DataSourceOptions | Store), displayExpr?: string | ((data: any) => string), valueExpr?: string };
    /**
     * Specifies the minimum width of the column.
     */
    minWidth?: number;
    /**
     * Specifies the column's unique identifier. If not set in code, this value is inherited from the dataField.
     */
    name?: string;
    /**
     * Specifies the band column that owns the current column. Accepts the index of the band column in the columns array.
     */
    ownerBand?: number;
    /**
     * Specifies whether to render the column after other columns and elements. Use if column cells have a complex template. Requires the width property specified.
     */
    renderAsync?: boolean;
    /**
     * Specifies the column's filter operation displayed in the filter row.
     */
    selectedFilterOperation?: '<' | '<=' | '<>' | '=' | '>' | '>=' | 'between' | 'contains' | 'endswith' | 'notcontains' | 'startswith';
    /**
     * Specifies a function to be invoked after the user has edited a cell value, but before it will be saved in the data source.
     */
    setCellValue?: ((newData: any, value: any, currentRowData: any) => void | Promise<void> | JQueryPromise<void>);
    /**
     * Specifies whether the column displays its values using editors.
     */
    showEditorAlways?: boolean;
    /**
     * Specifies whether the column chooser can contain the column header.
     */
    showInColumnChooser?: boolean;
    /**
     * Specifies the index according to which columns participate in sorting.
     */
    sortIndex?: number;
    /**
     * Specifies the sort order of column values.
     */
    sortOrder?: 'asc' | 'desc' | undefined;
    /**
     * Specifies a custom comparison function for sorting. Applies only when sorting is performed on the client.
     */
    sortingMethod?: ((value1: any, value2: any) => number);
    /**
     * In a boolean column, replaces all true items with a specified text. Applies only if showEditorAlways property is false.
     */
    trueText?: string;
    /**
     * Specifies validation rules to be checked when cell values are updated.
     */
    validationRules?: Array<RequiredRule | NumericRule | RangeRule | StringLengthRule | CustomRule | CompareRule | PatternRule | EmailRule | AsyncRule>;
    /**
     * Specifies whether the column is visible, that is, occupies space in the table.
     */
    visible?: boolean;
    /**
     * Specifies the position of the column regarding other columns in the resulting UI component.
     */
    visibleIndex?: number;
    /**
     * Specifies the column's width in pixels or as a percentage. Ignored if it is less than minWidth.
     */
    width?: number | string;
}

/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export interface GridBaseColumnButton {
    /**
     * Specifies a CSS class to be applied to the button.
     */
    cssClass?: string;
    /**
     * Specifies the text for the hint that appears when the button is hovered over or long-pressed.
     */
    hint?: string;
    /**
     * Specifies the button's icon.
     */
    icon?: string;
    /**
     * Specifies the button's text. Applies only if the button's icon is not specified.
     */
    text?: string;
}

/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export interface dxDataGridOptions extends GridBaseOptions<dxDataGrid> {
    /**
     * An array of grid columns.
     */
    columns?: Array<dxDataGridColumn | string>;
    /**
     * Customizes columns after they are created.
     */
    customizeColumns?: ((columns: Array<dxDataGridColumn>) => any);
    /**
     * Customizes data before export.
     * @deprecated Since v20.1, we recommend ExcelJS-based export which does not use this property.
     */
    customizeExportData?: ((columns: Array<dxDataGridColumn>, rows: Array<dxDataGridRowObject>) => any);
    /**
     * Configures editing.
     */
    editing?: dxDataGridEditing;
    /**
     * Configures client-side exporting.
     */
    export?: { allowExportSelectedData?: boolean, customizeExcelCell?: ((options: { component?: dxDataGrid, horizontalAlignment?: 'center' | 'centerContinuous' | 'distributed' | 'fill' | 'general' | 'justify' | 'left' | 'right', verticalAlignment?: 'bottom' | 'center' | 'distributed' | 'justify' | 'top', wrapTextEnabled?: boolean, backgroundColor?: string, fillPatternType?: 'darkDown' | 'darkGray' | 'darkGrid' | 'darkHorizontal' | 'darkTrellis' | 'darkUp' | 'darkVertical' | 'gray0625' | 'gray125' | 'lightDown' | 'lightGray' | 'lightGrid' | 'lightHorizontal' | 'lightTrellis' | 'lightUp' | 'lightVertical' | 'mediumGray' | 'none' | 'solid', fillPatternColor?: string, font?: ExcelFont, value?: string | number | Date, numberFormat?: string, gridCell?: ExcelDataGridCell }) => any), enabled?: boolean, excelFilterEnabled?: boolean, excelWrapTextEnabled?: boolean, fileName?: string, ignoreExcelErrors?: boolean, proxyUrl?: string, texts?: { exportAll?: string, exportSelectedRows?: string, exportTo?: string } };
    /**
     * Configures the group panel.
     */
    groupPanel?: { allowColumnDragging?: boolean, emptyPanelText?: string, visible?: boolean | 'auto' };
    /**
     * Configures grouping.
     */
    grouping?: { allowCollapsing?: boolean, autoExpandAll?: boolean, contextMenuEnabled?: boolean, expandMode?: 'buttonClick' | 'rowClick', texts?: { groupByThisColumn?: string, groupContinuedMessage?: string, groupContinuesMessage?: string, ungroup?: string, ungroupAll?: string } };
    /**
     * Specifies the key property (or properties) that provide(s) key values to access data items. Each key value must be unique. This property applies only if data is a simple array.
     */
    keyExpr?: string | Array<string>;
    /**
     * Allows you to build a master-detail interface in the grid.
     */
    masterDetail?: { autoExpandAll?: boolean, enabled?: boolean, template?: template | ((detailElement: dxElement, detailInfo: { key?: any, data?: any, watch?: Function }) => any) };
    /**
     * A function that is executed when a cell is clicked or tapped. Executed before onRowClick.
     */
    onCellClick?: ((e: { component?: dxDataGrid, element?: dxElement, model?: any, event?: event, data?: any, key?: any, value?: any, displayValue?: any, text?: string, columnIndex?: number, column?: any, rowIndex?: number, rowType?: string, cellElement?: dxElement, row?: dxDataGridRowObject }) => any) | string;
    /**
     * A function that is executed when a cell is double-clicked or double-tapped. Executed before onRowDblClick.
     */
    onCellDblClick?: ((e: { component?: dxDataGrid, element?: dxElement, model?: any, event?: event, data?: any, key?: any, value?: any, displayValue?: any, text?: string, columnIndex?: number, column?: dxDataGridColumn, rowIndex?: number, rowType?: string, cellElement?: dxElement, row?: dxDataGridRowObject }) => any);
    /**
     * A function that is executed after the pointer enters or leaves a cell.
     */
    onCellHoverChanged?: ((e: { component?: dxDataGrid, element?: dxElement, model?: any, eventType?: string, data?: any, key?: any, value?: any, text?: string, displayValue?: any, columnIndex?: number, rowIndex?: number, column?: dxDataGridColumn, rowType?: string, cellElement?: dxElement, row?: dxDataGridRowObject }) => any);
    /**
     * A function that is executed after a cell is created.
     */
    onCellPrepared?: ((e: { component?: dxDataGrid, element?: dxElement, model?: any, data?: any, key?: any, value?: any, displayValue?: any, text?: string, columnIndex?: number, column?: dxDataGridColumn, rowIndex?: number, rowType?: string, row?: dxDataGridRowObject, isSelected?: boolean, isExpanded?: boolean, isNewRow?: boolean, cellElement?: dxElement, watch?: Function, oldValue?: any }) => any);
    /**
     * A function that is executed before the context menu is rendered.
     */
    onContextMenuPreparing?: ((e: { component?: dxDataGrid, element?: dxElement, model?: any, items?: Array<any>, target?: string, targetElement?: dxElement, columnIndex?: number, column?: dxDataGridColumn, rowIndex?: number, row?: dxDataGridRowObject }) => any);
    /**
     * A function that is executed before a cell or row switches to the editing state.
     */
    onEditingStart?: ((e: { component?: dxDataGrid, element?: dxElement, model?: any, data?: any, key?: any, cancel?: boolean, column?: any }) => any);
    /**
     * A function that is executed after an editor is created. Not executed for cells with an editCellTemplate.
     */
    onEditorPrepared?: ((options: { component?: dxDataGrid, element?: dxElement, model?: any, parentType?: string, value?: any, setValue?: any, updateValueTimeout?: number, width?: number, disabled?: boolean, rtlEnabled?: boolean, editorElement?: dxElement, readOnly?: boolean, dataField?: string, row?: dxDataGridRowObject }) => any);
    /**
     * A function used to customize a cell's editor. Not executed for cells with an editCellTemplate.
     */
    onEditorPreparing?: ((e: { component?: dxDataGrid, element?: dxElement, model?: any, parentType?: string, value?: any, setValue?: any, updateValueTimeout?: number, width?: number, disabled?: boolean, rtlEnabled?: boolean, cancel?: boolean, editorElement?: dxElement, readOnly?: boolean, editorName?: string, editorOptions?: any, dataField?: string, row?: dxDataGridRowObject }) => any);
    /**
     * A function that is executed after data is exported.
     * @deprecated Since v20.1, we recommend ExcelJS-based export which does not use this property.
     */
    onExported?: ((e: { component?: dxDataGrid, element?: dxElement, model?: any }) => any);
    /**
     * A function that is executed before data is exported.
     */
    onExporting?: ((e: { component?: dxDataGrid, element?: dxElement, model?: any, fileName?: string, cancel?: boolean }) => any);
    /**
     * A function that is executed before a file with exported data is saved to the user's local storage.
     * @deprecated Since v20.1, we recommend ExcelJS-based export which does not use this property.
     */
    onFileSaving?: ((e: { component?: dxDataGrid, element?: dxElement, fileName?: string, format?: string, data?: Blob, cancel?: boolean }) => any);
    /**
     * A function that is executed after the focused cell changes. Applies only to cells in data or group rows.
     */
    onFocusedCellChanged?: ((e: { component?: dxDataGrid, element?: dxElement, model?: any, cellElement?: dxElement, columnIndex?: number, rowIndex?: number, row?: dxDataGridRowObject, column?: dxDataGridColumn }) => any);
    /**
     * A function that is executed before the focused cell changes. Applies only to cells in data or group rows.
     */
    onFocusedCellChanging?: ((e: { component?: dxDataGrid, element?: dxElement, model?: any, cellElement?: dxElement, prevColumnIndex?: number, prevRowIndex?: number, newColumnIndex?: number, newRowIndex?: number, event?: event, rows?: Array<dxDataGridRowObject>, columns?: Array<dxDataGridColumn>, cancel?: boolean, isHighlighted?: boolean }) => any);
    /**
     * A function that is executed after the focused row changes. Applies only to data or group rows. focusedRowEnabled should be true.
     */
    onFocusedRowChanged?: ((e: { component?: dxDataGrid, element?: dxElement, model?: any, rowElement?: dxElement, rowIndex?: number, row?: dxDataGridRowObject }) => any);
    /**
     * A function that is executed before the focused row changes. Applies only to data or group rows. focusedRowEnabled should be true.
     */
    onFocusedRowChanging?: ((e: { component?: dxDataGrid, element?: dxElement, model?: any, rowElement?: dxElement, prevRowIndex?: number, newRowIndex?: number, event?: event, rows?: Array<dxDataGridRowObject>, cancel?: boolean }) => any);
    /**
     * A function that is executed when a row is clicked or tapped.
     */
    onRowClick?: ((e: { component?: dxDataGrid, element?: dxElement, model?: any, event?: event, data?: any, key?: any, values?: Array<any>, columns?: Array<any>, rowIndex?: number, rowType?: string, isSelected?: boolean, isExpanded?: boolean, isNewRow?: boolean, groupIndex?: number, rowElement?: dxElement, handled?: boolean }) => any) | string;
    /**
     * A function that is executed when a row is double-clicked or double-tapped. Executed after onCellDblClick.
     */
    onRowDblClick?: ((e: { component?: dxDataGrid, element?: dxElement, model?: any, event?: event, data?: any, key?: any, values?: Array<any>, columns?: Array<dxDataGridColumn>, rowIndex?: number, rowType?: string, isSelected?: boolean, isExpanded?: boolean, isNewRow?: boolean, groupIndex?: number, rowElement?: dxElement }) => any);
    /**
     * A function that is executed after a row is created.
     */
    onRowPrepared?: ((e: { component?: dxDataGrid, element?: dxElement, model?: any, data?: any, key?: any, values?: Array<any>, columns?: Array<dxDataGridColumn>, rowIndex?: number, rowType?: string, groupIndex?: number, isSelected?: boolean, isExpanded?: boolean, isNewRow?: boolean, rowElement?: dxElement }) => any);
    /**
     * Notifies the DataGrid of the server's data processing operations.
     */
    remoteOperations?: boolean | { filtering?: boolean, groupPaging?: boolean, grouping?: boolean, paging?: boolean, sorting?: boolean, summary?: boolean } | 'auto';
    /**
     * Specifies a custom template for rows.
     */
    rowTemplate?: template | ((rowElement: dxElement, rowInfo: { key?: any, data?: any, component?: dxDataGrid, values?: Array<any>, rowIndex?: number, columns?: Array<dxDataGridColumn>, isSelected?: boolean, rowType?: string, groupIndex?: number, isExpanded?: boolean }) => any);
    /**
     * Configures scrolling.
     */
    scrolling?: dxDataGridScrolling;
    /**
     * Configures runtime selection.
     */
    selection?: dxDataGridSelection;
    /**
     * Specifies filters for the rows that must be selected initially. Applies only if selection.deferred is true.
     */
    selectionFilter?: string | Array<any> | Function;
    /**
     * Allows you to sort groups according to the values of group summary items.
     */
    sortByGroupSummaryInfo?: Array<{ groupColumn?: string, sortOrder?: 'asc' | 'desc', summaryItem?: string | number }>;
    /**
     * Specifies the properties of the grid summary.
     */
    summary?: { calculateCustomSummary?: ((options: { component?: dxDataGrid, name?: string, summaryProcess?: string, value?: any, totalValue?: any, groupIndex?: number }) => any), groupItems?: Array<{ alignByColumn?: boolean, column?: string, customizeText?: ((itemInfo: { value?: string | number | Date, valueText?: string }) => string), displayFormat?: string, name?: string, showInColumn?: string, showInGroupFooter?: boolean, skipEmptyValues?: boolean, summaryType?: 'avg' | 'count' | 'custom' | 'max' | 'min' | 'sum' | string, valueFormat?: format }>, recalculateWhileEditing?: boolean, skipEmptyValues?: boolean, texts?: { avg?: string, avgOtherColumn?: string, count?: string, max?: string, maxOtherColumn?: string, min?: string, minOtherColumn?: string, sum?: string, sumOtherColumn?: string }, totalItems?: Array<{ alignment?: 'center' | 'left' | 'right', column?: string, cssClass?: string, customizeText?: ((itemInfo: { value?: string | number | Date, valueText?: string }) => string), displayFormat?: string, name?: string, showInColumn?: string, skipEmptyValues?: boolean, summaryType?: 'avg' | 'count' | 'custom' | 'max' | 'min' | 'sum' | string, valueFormat?: format }> };
}
/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export interface dxDataGridEditing extends GridBaseEditing {
    /**
     * Specifies whether a user can add new rows.
     */
    allowAdding?: boolean;
    /**
     * Specifies whether a user can delete rows. It is called for each data row when defined as a function.
     */
    allowDeleting?: boolean | ((options: { component?: dxDataGrid, row?: dxDataGridRowObject }) => boolean);
    /**
     * Specifies whether a user can update rows. It is called for each data row when defined as a function.
     */
    allowUpdating?: boolean | ((options: { component?: dxDataGrid, row?: dxDataGridRowObject }) => boolean);
    /**
     * Contains properties that specify texts for editing-related UI elements.
     */
    texts?: any;
}
/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export interface dxDataGridScrolling extends GridBaseScrolling {
    /**
     * Specifies the scrolling mode.
     */
    mode?: 'infinite' | 'standard' | 'virtual';
}
/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export interface dxDataGridSelection extends GridBaseSelection {
    /**
     * Makes selection deferred.
     */
    deferred?: boolean;
    /**
     * Specifies the mode in which all the records are selected. Applies only if selection.allowSelectAll is true.
     */
    selectAllMode?: 'allPages' | 'page';
    /**
     * Specifies when to display the selection column and row selection checkboxes. Applies only if selection.mode is 'multiple'.
     */
    showCheckBoxesMode?: 'always' | 'none' | 'onClick' | 'onLongTap';
}
/**
 * The DataGrid is a UI component that represents data from a local or remote source in the form of a grid. This UI component offers such basic features as sorting, grouping, filtering, as well as more advanced capabilities, like state storing, client-side exporting, master-detail interface, and many others.
 */
declare class dxDataGrid extends Widget implements GridBase {
    constructor(element: Element, options?: dxDataGridOptions)
    constructor(element: JQuery, options?: dxDataGridOptions)
    /**
     * Adds a new column.
     */
    addColumn(columnOptions: any | string): void;
    /**
     * Adds an empty data row and switches it to the editing state.
     */
    addRow(): Promise<void> & JQueryPromise<void>;
    /**
     * Ungroups grid records.
     */
    clearGrouping(): void;
    /**
     * Collapses master rows or groups of a specific level.
     */
    collapseAll(groupIndex?: number): void;
    /**
     * Collapses a group or a master row with a specific key.
     */
    collapseRow(key: any): Promise<void> & JQueryPromise<void>;
    /**
     * Expands master rows or groups of a specific level. Does not apply if data is remote.
     */
    expandAll(groupIndex?: number): void;
    /**
     * Expands a group or a master row with a specific key.
     */
    expandRow(key: any): Promise<void> & JQueryPromise<void>;
    /**
     * Exports grid data to Excel.
     * @deprecated Use exportDataGrid instead.
     */
    exportToExcel(selectionOnly: boolean): void;
    /**
     * Gets the currently selected rows' keys.
     */
    getSelectedRowKeys(): Array<any> & Promise<any> & JQueryPromise<any>;
    /**
     * Gets the selected rows' data objects.
     */
    getSelectedRowsData(): Array<any> & Promise<any> & JQueryPromise<any>;
    /**
     * Gets the value of a total summary item.
     */
    getTotalSummaryValue(summaryItemName: string): any;
    /**
     * Gets all visible columns.
     */
    getVisibleColumns(): Array<dxDataGridColumn>;
    /**
     * Gets all visible columns at a specific hierarchical level of column headers. Use it to access banded columns.
     */
    getVisibleColumns(headerLevel: number): Array<dxDataGridColumn>;
    /**
     * Gets currently rendered rows.
     */
    getVisibleRows(): Array<dxDataGridRowObject>;
    /**
     * Checks whether a specific group or master row is expanded or collapsed.
     */
    isRowExpanded(key: any): boolean;
    /**
     * Checks whether a row found using its data object is selected. Takes effect only if selection.deferred is true.
     */
    isRowSelected(data: any): boolean;
    isRowSelected(key: any): boolean;
    /**
     * Gets the total row count.
     */
    totalCount(): number;

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
export interface dxDataGridColumn extends GridBaseColumn {
    /**
     * Specifies whether data from this column should be exported. Applies only if the column is visible.
     */
    allowExporting?: boolean;
    /**
     * Specifies whether the user can group data by values of this column. Applies only when grouping is enabled.
     */
    allowGrouping?: boolean;
    /**
     * Specifies whether groups appear expanded or not when records are grouped by a specific column. Setting this property makes sense only when grouping is allowed for this column.
     */
    autoExpandGroup?: boolean;
    /**
     * Allows you to customize buttons in the edit column or create a custom command column. Applies only if the column's type is 'buttons'.
     */
    buttons?: Array<'cancel' | 'delete' | 'edit' | 'save' | 'undelete' | dxDataGridColumnButton>;
    /**
     * Sets custom column values used to group grid records.
     */
    calculateGroupValue?: string | ((rowData: any) => any);
    /**
     * Specifies a custom template for data cells.
     */
    cellTemplate?: template | ((cellElement: dxElement, cellInfo: { data?: any, component?: dxDataGrid, value?: any, oldValue?: any, displayValue?: any, text?: string, columnIndex?: number, rowIndex?: number, column?: dxDataGridColumn, row?: dxDataGridRowObject, rowType?: string, watch?: Function }) => any);
    /**
     * An array of grid columns.
     */
    columns?: Array<dxDataGridColumn | string>;
    /**
     * Specifies a custom template for data cells in editing state.
     */
    editCellTemplate?: template | ((cellElement: dxElement, cellInfo: { setValue?: any, data?: any, component?: dxDataGrid, value?: any, displayValue?: any, text?: string, columnIndex?: number, rowIndex?: number, column?: dxDataGridColumn, row?: dxDataGridRowObject, rowType?: string, watch?: Function }) => any);
    /**
     * Specifies a custom template for group cells (group rows).
     */
    groupCellTemplate?: template | ((cellElement: dxElement, cellInfo: { data?: any, component?: dxDataGrid, value?: any, text?: string, displayValue?: any, columnIndex?: number, rowIndex?: number, column?: dxDataGridColumn, row?: dxDataGridRowObject, summaryItems?: Array<any>, groupContinuesMessage?: string, groupContinuedMessage?: string }) => any);
    /**
     * Specifies the index of a column when grid records are grouped by the values of this column.
     */
    groupIndex?: number;
    /**
     * Specifies a custom template for column headers.
     */
    headerCellTemplate?: template | ((columnHeader: dxElement, headerInfo: { component?: dxDataGrid, columnIndex?: number, column?: dxDataGridColumn }) => any);
    /**
     * Specifies whether or not to display the column when grid records are grouped by it.
     */
    showWhenGrouped?: boolean;
    /**
     * Specifies the command column that this object customizes.
     */
    type?: 'adaptive' | 'buttons' | 'detailExpand' | 'groupExpand' | 'selection';
}

/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export interface dxDataGridColumnButton extends GridBaseColumnButton {
    /**
     * The name used to identify a built-in button.
     */
    name?: 'cancel' | 'delete' | 'edit' | 'save' | 'undelete' | string;
    /**
     * A function that is executed when the button is clicked or tapped. Not executed if a template is used.
     */
    onClick?: ((e: { component?: dxDataGrid, element?: dxElement, model?: any, event?: event, row?: dxDataGridRowObject, column?: dxDataGridColumn }) => any) | string;
    /**
     * Specifies a custom button template.
     */
    template?: template | ((cellElement: dxElement, cellInfo: { component?: dxDataGrid, data?: any, key?: any, columnIndex?: number, column?: dxDataGridColumn, rowIndex?: number, rowType?: string, row?: dxDataGridRowObject }) => string | Element | JQuery);
    /**
     * Specifies the button's visibility.
     */
    visible?: boolean | ((options: { component?: dxDataGrid, row?: dxDataGridRowObject, column?: dxDataGridColumn }) => boolean);
}

/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export interface dxDataGridRowObject {
    /**
     * The data object represented by the row.
     */
    data?: any;
    /**
     * The group index of the row. Available when the rowType is 'group'.
     */
    groupIndex?: number;
    /**
     * Indicates whether the row is in the editing state.
     */
    isEditing?: boolean;
    /**
     * Indicates whether the row is expanded or collapsed. Available if rowType is 'data', 'detail' or 'group'.
     */
    isExpanded?: boolean;
    /**
     * Indicates that the row is added, but not yet saved. Available if rowType is 'data'.
     */
    isNewRow?: boolean;
    /**
     * Indicates whether the row is selected. Available if rowType is 'data'.
     */
    isSelected?: boolean;
    /**
     * The key of the data object represented by the row.
     */
    key?: any;
    /**
     * The visible index of the row.
     */
    rowIndex?: number;
    /**
     * The row's type.
     */
    rowType?: string;
    /**
     * Values of the row as they exist in the data source.
     */
    values?: Array<any>;
}

declare global {
interface JQuery {
    dxDataGrid(): JQuery;
    dxDataGrid(options: "instance"): dxDataGrid;
    dxDataGrid(options: string): any;
    dxDataGrid(options: string, ...params: any[]): any;
    dxDataGrid(options: dxDataGridOptions): JQuery;
}
}
/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export type Options = dxDataGridOptions;

/** @deprecated use Options instead */
/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export type IOptions = dxDataGridOptions;
/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export type Column = dxDataGridColumn;

/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export default dxDataGrid;
