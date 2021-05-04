/**
* DevExtreme (ui/pivot_grid.d.ts)
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
    event
} from '../events/index';

import PivotGridDataSource, {
    PivotGridDataSourceField,
    PivotGridDataSourceOptions
} from './pivot_grid/data_source';

import dxPopup from './popup';

import Widget, {
    WidgetOptions
} from './widget/ui.widget';

/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export interface dxPivotGridOptions extends WidgetOptions<dxPivotGrid> {
    /**
     * Allows an end-user to expand/collapse all header items within a header level.
     */
    allowExpandAll?: boolean;
    /**
     * Allows a user to filter fields by selecting or deselecting values in the popup menu.
     */
    allowFiltering?: boolean;
    /**
     * Allows an end-user to change sorting properties.
     */
    allowSorting?: boolean;
    /**
     * Allows an end-user to sort columns by summary values.
     */
    allowSortingBySummary?: boolean;
    /**
     * Specifies the area to which data field headers must belong.
     */
    dataFieldArea?: 'column' | 'row';
    /**
     * Binds the UI component to data.
     */
    dataSource?: Array<any> | PivotGridDataSource | PivotGridDataSourceOptions;
    /**
     * Configures client-side exporting.
     */
    export?: { enabled?: boolean, fileName?: string, ignoreExcelErrors?: boolean, proxyUrl?: string };
    /**
     * The Field Chooser configuration properties.
     */
    fieldChooser?: { allowSearch?: boolean, applyChangesMode?: 'instantly' | 'onDemand', enabled?: boolean, height?: number, layout?: 0 | 1 | 2, searchTimeout?: number, texts?: { allFields?: string, columnFields?: string, dataFields?: string, filterFields?: string, rowFields?: string }, title?: string, width?: number };
    /**
     * Configures the field panel.
     */
    fieldPanel?: { allowFieldDragging?: boolean, showColumnFields?: boolean, showDataFields?: boolean, showFilterFields?: boolean, showRowFields?: boolean, texts?: { columnFieldArea?: string, dataFieldArea?: string, filterFieldArea?: string, rowFieldArea?: string }, visible?: boolean };
    /**
     * Configures the header filter feature.
     */
    headerFilter?: { allowSearch?: boolean, height?: number, searchTimeout?: number, showRelevantValues?: boolean, texts?: { cancel?: string, emptyValue?: string, ok?: string }, width?: number };
    /**
     * Specifies whether or not to hide rows and columns with no data.
     */
    hideEmptySummaryCells?: boolean;
    /**
     * Specifies properties configuring the load panel.
     */
    loadPanel?: { enabled?: boolean, height?: number, indicatorSrc?: string, showIndicator?: boolean, showPane?: boolean, text?: string, width?: number };
    /**
     * A function that is executed when a pivot grid cell is clicked or tapped.
     */
    onCellClick?: ((e: { component?: dxPivotGrid, element?: dxElement, model?: any, area?: string, cellElement?: dxElement, cell?: dxPivotGridPivotGridCell, rowIndex?: number, columnIndex?: number, columnFields?: Array<PivotGridDataSourceField>, rowFields?: Array<PivotGridDataSourceField>, dataFields?: Array<PivotGridDataSourceField>, event?: event, cancel?: boolean }) => any);
    /**
     * A function that is executed after a pivot grid cell is created.
     */
    onCellPrepared?: ((e: { component?: dxPivotGrid, element?: dxElement, model?: any, area?: string, cellElement?: dxElement, cell?: dxPivotGridPivotGridCell, rowIndex?: number, columnIndex?: number }) => any);
    /**
     * A function that is executed before the context menu is rendered.
     */
    onContextMenuPreparing?: ((e: { component?: dxPivotGrid, element?: dxElement, model?: any, items?: Array<any>, area?: string, cell?: dxPivotGridPivotGridCell, cellElement?: dxElement, columnIndex?: number, rowIndex?: number, dataFields?: Array<PivotGridDataSourceField>, rowFields?: Array<PivotGridDataSourceField>, columnFields?: Array<PivotGridDataSourceField>, field?: PivotGridDataSourceField }) => any);
    /**
     * A function that is executed after data is exported.
     * @deprecated Since v20.2, we recommend ExcelJS-based export which does not use this property.
     */
    onExported?: ((e: { component?: dxPivotGrid, element?: dxElement, model?: any }) => any);
    /**
     * A function that is executed before data is exported.
     */
    onExporting?: ((e: { component?: dxPivotGrid, element?: dxElement, model?: any, fileName?: string, cancel?: boolean }) => any);
    /**
     * A function that is executed before a file with exported data is saved to the user's local storage.
     * @deprecated Since v20.2, we recommend ExcelJS-based export which does not use this property.
     */
    onFileSaving?: ((e: { component?: dxPivotGrid, element?: dxElement, fileName?: string, format?: string, data?: Blob, cancel?: boolean }) => any);
    /**
     * Specifies the layout of items in the row header.
     */
    rowHeaderLayout?: 'standard' | 'tree';
    /**
     * A configuration object specifying scrolling properties.
     */
    scrolling?: { mode?: 'standard' | 'virtual', useNative?: boolean | 'auto' };
    /**
     * Specifies whether the outer borders of the grid are visible or not.
     */
    showBorders?: boolean;
    /**
     * Specifies whether to display the Grand Total column.
     */
    showColumnGrandTotals?: boolean;
    /**
     * Specifies whether to display the Total columns.
     */
    showColumnTotals?: boolean;
    /**
     * Specifies whether to display the Grand Total row.
     */
    showRowGrandTotals?: boolean;
    /**
     * Specifies whether to display the Total rows. Applies only if rowHeaderLayout is 'standard'.
     */
    showRowTotals?: boolean;
    /**
     * Specifies where to show the total rows or columns. Applies only if rowHeaderLayout is 'standard'.
     */
    showTotalsPrior?: 'both' | 'columns' | 'none' | 'rows';
    /**
     * A configuration object specifying properties related to state storing.
     */
    stateStoring?: { customLoad?: (() => Promise<any> | JQueryPromise<any>), customSave?: ((state: any) => any), enabled?: boolean, savingTimeout?: number, storageKey?: string, type?: 'custom' | 'localStorage' | 'sessionStorage' };
    /**
     * Strings that can be changed or localized in the PivotGrid UI component.
     */
    texts?: { collapseAll?: string, dataNotAvailable?: string, expandAll?: string, exportToExcel?: string, grandTotal?: string, noData?: string, removeAllSorting?: string, showFieldChooser?: string, sortColumnBySummary?: string, sortRowBySummary?: string, total?: string };
    /**
     * Specifies whether long text in header items should be wrapped.
     */
    wordWrapEnabled?: boolean;
}
/**
 * The PivotGrid is a UI component that allows you to display and analyze multi-dimensional data from a local storage or an OLAP cube.
 */
export default class dxPivotGrid extends Widget {
    constructor(element: Element, options?: dxPivotGridOptions)
    constructor(element: JQuery, options?: dxPivotGridOptions)
    /**
     * Binds a Chart to the PivotGrid.
     */
    bindChart(chart: string | JQuery | any, integrationOptions: { inverted?: boolean, dataFieldsDisplayMode?: string, putDataFieldsInto?: string, alternateDataFields?: boolean, processCell?: Function, customizeChart?: Function, customizeSeries?: Function }): Function & null;
    /**
     * Exports pivot grid data to the Excel file.
     * @deprecated Use exportPivotGrid instead.
     */
    exportToExcel(): void;
    /**
     * Gets the PivotGridDataSource instance.
     */
    getDataSource(): PivotGridDataSource;
    /**
     * Gets the Popup instance of the field chooser window.
     */
    getFieldChooserPopup(): dxPopup;
    /**
     * Updates the UI component to the size of its content.
     */
    updateDimensions(): void;
}

/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export interface dxPivotGridPivotGridCell {
    /**
     * The cell's column path. Available for data area cells only.
     */
    columnPath?: Array<string | number | Date>;
    /**
     * The type of the column to which the cell belongs. Available for data area cells only.
     */
    columnType?: 'D' | 'T' | 'GT';
    /**
     * The data field's index. Available for data area cells only.
     */
    dataIndex?: number;
    /**
     * Indicates whether the cell is expanded. Available for row or column area cells only.
     */
    expanded?: boolean;
    /**
     * The path to the row/column cell. Available for row or column area cells only.
     */
    path?: Array<string | number | Date>;
    /**
     * The cell's row path. Available for data area cells only.
     */
    rowPath?: Array<string | number | Date>;
    /**
     * The type of the row to which the cell belongs. Available for data area cells only.
     */
    rowType?: 'D' | 'T' | 'GT';
    /**
     * The text displayed in the cell.
     */
    text?: string;
    /**
     * The cell's type. Available for row or column area cells only.
     */
    type?: 'D' | 'T' | 'GT';
    /**
     * The cell's value.
     */
    value?: any;
}

/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export interface dxPivotGridSummaryCell {
    /**
     * Gets the child cell in a specified direction.
     */
    child(direction: string, fieldValue: number | string): dxPivotGridSummaryCell;
    /**
     * Gets all child cells in a specified direction.
     */
    children(direction: string): Array<dxPivotGridSummaryCell>;
    /**
     * Gets a pivot grid field that corresponds to the summary cell.
     */
    field(area: string): PivotGridDataSourceField;
    /**
     * Gets the Grand Total of the entire pivot grid.
     */
    grandTotal(): dxPivotGridSummaryCell;
    /**
     * Gets a partial Grand Total cell of a row or column.
     */
    grandTotal(direction: string): dxPivotGridSummaryCell;
    /**
     * Indicates whether the summaryDisplayMode or calculateSummaryValue post-processed the summary value.
     */
    isPostProcessed(field: PivotGridDataSourceField | string): boolean;
    /**
     * Gets the cell next to the current one in a specified direction.
     */
    next(direction: string): dxPivotGridSummaryCell;
    /**
     * Gets the cell next to current in a specified direction.
     */
    next(direction: string, allowCrossGroup: boolean): dxPivotGridSummaryCell;
    /**
     * Gets the parent cell in a specified direction.
     */
    parent(direction: string): dxPivotGridSummaryCell;
    /**
     * Gets the cell prior to the current one in a specified direction.
     */
    prev(direction: string): dxPivotGridSummaryCell;
    /**
     * Gets the cell previous to current in a specified direction.
     */
    prev(direction: string, allowCrossGroup: boolean): dxPivotGridSummaryCell;
    /**
     * Gets the cell located by the path of the source cell with one field value changed.
     */
    slice(field: PivotGridDataSourceField, value: number | string): dxPivotGridSummaryCell;
    /**
     * Gets the summary cell value.
     */
    value(): any;
    /**
     * Gets the value of any field associated with the summary cell.
     */
    value(field: PivotGridDataSourceField | string): any;
    /**
     * Gets the value of any field associated with the summary cell.
     */
    value(field: PivotGridDataSourceField | string, postProcessed: boolean): any;
    /**
     * Gets the summary cell value.
     */
    value(postProcessed: boolean): any;
}

declare global {
interface JQuery {
    dxPivotGrid(): JQuery;
    dxPivotGrid(options: "instance"): dxPivotGrid;
    dxPivotGrid(options: string): any;
    dxPivotGrid(options: string, ...params: any[]): any;
    dxPivotGrid(options: dxPivotGridOptions): JQuery;
}
}
/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export type Options = dxPivotGridOptions;

/** @deprecated use Options instead */
/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export type IOptions = dxPivotGridOptions;
