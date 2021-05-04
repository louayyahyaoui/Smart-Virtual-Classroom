/**
* DevExtreme (ui/pivot_grid/data_source.d.ts)
* Version: 20.2.6
* Build date: Tue Mar 16 2021
*
* Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import '../../jquery_augmentation';

import Store, {
    StoreOptions
} from '../../data/abstract_store';

import DataSource from '../../data/data_source';

import {
    dxPivotGridSummaryCell
} from '../pivot_grid';

import {
    format
} from '../widget/ui.widget';

import XmlaStore, {
    XmlaStoreOptions
} from './xmla_store';

/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export interface PivotGridDataSourceOptions {
    /**
     * Configures pivot grid fields.
     */
    fields?: Array<PivotGridDataSourceField>;
    /**
     * Specifies data filtering conditions. Cannot be used with an XmlaStore.
     */
    filter?: string | Array<any> | Function;
    /**
     * A function that is executed after data is successfully loaded.
     */
    onChanged?: Function;
    /**
     * A function that is executed when all fields are loaded from the store and they are ready to be displayed in the PivotGrid.
     */
    onFieldsPrepared?: ((fields: Array<PivotGridDataSourceField>) => any);
    /**
     * A function that is executed when data loading fails.
     */
    onLoadError?: ((error: any) => any);
    /**
     * A function that is executed when the data loading status changes.
     */
    onLoadingChanged?: ((isLoading: boolean) => any);
    /**
     * Specifies whether the PivotGridDataSource should load data in portions. Can be used only with an XmlaStore.
     */
    paginate?: boolean;
    /**
     * Specifies whether the data processing operations (filtering, grouping, summary calculation) should be performed on the server.
     */
    remoteOperations?: boolean;
    /**
     * 
     */
    retrieveFields?: boolean;
    /**
     * Configures the DataSource's underlying store.
     */
    store?: Store | StoreOptions | XmlaStore | XmlaStoreOptions | Array<{ type?: 'array' | 'local' | 'odata' | 'xmla' }> | { type?: 'array' | 'local' | 'odata' | 'xmla' };
}
/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export interface PivotGridDataSourceField {
    /**
     * Specifies whether to take neighboring groups' summary values into account when calculating a running total and absolute or percent variation.
     */
    allowCrossGroupCalculation?: boolean;
    /**
     * Specifies whether a user can expand/collapse all items within the same column or row header level using the context menu.
     */
    allowExpandAll?: boolean;
    /**
     * Specifies whether a user can filter the field's values.
     */
    allowFiltering?: boolean;
    /**
     * Specifies whether a user can change the field's sorting.
     */
    allowSorting?: boolean;
    /**
     * Specifies whether a user can sort the pivot grid by summary values instead of field values.
     */
    allowSortingBySummary?: boolean;
    /**
     * Specifies the field's area.
     */
    area?: 'column' | 'data' | 'filter' | 'row' | undefined;
    /**
     * Specifies the field's order among the other fields in the same area. Corresponds to the field's order in the fields array by default.
     */
    areaIndex?: number;
    /**
     * Specifies a custom aggregate function. Applies only if the summaryType is 'custom' and the remoteOperations is false. Cannot be used with an XmlaStore.
     */
    calculateCustomSummary?: ((options: { summaryProcess?: string, value?: any, totalValue?: any }) => any);
    /**
     * Specifies a custom post-processing function for summary values.
     */
    calculateSummaryValue?: ((e: dxPivotGridSummaryCell) => number);
    /**
     * Specifies the field's caption to be displayed in the field chooser and on the field panel.
     */
    caption?: string;
    /**
     * Customizes the text displayed in summary cells.
     */
    customizeText?: ((cellInfo: { value?: string | number | Date, valueText?: string }) => string);
    /**
     * Specifies which data source field provides data for the pivot grid field.
     */
    dataField?: string;
    /**
     * Casts field values to a specific data type.
     */
    dataType?: 'date' | 'number' | 'string';
    /**
     * Specifies the name of the folder in which the field is located when displayed in the field chooser.
     */
    displayFolder?: string;
    /**
     * Specifies whether to expand all items within the field's header level.
     */
    expanded?: boolean;
    /**
     * Specifies whether a user changes the current filter by including (selecting) or excluding (clearing the selection of) values.
     */
    filterType?: 'exclude' | 'include';
    /**
     * Specifies the values by which the field is filtered.
     */
    filterValues?: Array<any>;
    /**
     * Formats field values before they are displayed.
     */
    format?: format;
    /**
     * Specifies the field's index within its group.
     */
    groupIndex?: number;
    /**
     * Specifies how the field's values are combined into groups for the headers. Cannot be used with an XmlaStore.
     */
    groupInterval?: 'day' | 'dayOfWeek' | 'month' | 'quarter' | 'year' | number;
    /**
     * Specifies the name of the field's group.
     */
    groupName?: string;
    /**
     * Configures the field's header filter.
     */
    headerFilter?: { allowSearch?: boolean, height?: number, width?: number };
    /**
     * Specifies whether the field should be treated as a measure (a field providing data for calculation).
     */
    isMeasure?: boolean;
    /**
     * Specifies the field's identifier.
     */
    name?: string;
    /**
     * Specifies whether to calculate the running total by rows or by columns.
     */
    runningTotal?: 'column' | 'row';
    /**
     * Specifies a function that combines the field's values into groups for the headers. Cannot be used with an XmlaStore or remote operations.
     */
    selector?: Function;
    /**
     * Specifies whether to display the field's grand totals. Applies only if the field is in the data area.
     */
    showGrandTotals?: boolean;
    /**
     * Specifies whether to display the field's totals.
     */
    showTotals?: boolean;
    /**
     * Specifies whether to display the field's summary values. Applies only if the field is in the data area. Inherits the showTotals' value by default.
     */
    showValues?: boolean;
    /**
     * Specifies how the field's values in the headers should be sorted.
     */
    sortBy?: 'displayText' | 'value' | 'none';
    /**
     * Sorts the field's values in the headers by the specified measure's summary values. Accepts the measure's name, caption, dataField, or index in the fields array.
     */
    sortBySummaryField?: string;
    /**
     * Specifies a path to the column or row whose summary values should be used to sort the field's values in the headers.
     */
    sortBySummaryPath?: Array<number | string>;
    /**
     * Specifies the field values' sorting order.
     */
    sortOrder?: 'asc' | 'desc';
    /**
     * Specifies a custom comparison function that sorts the field's values in the headers.
     */
    sortingMethod?: ((a: { value?: string | number, children?: Array<any> }, b: { value?: string | number, children?: Array<any> }) => number);
    /**
     * Specifies a predefined post-processing function. Does not apply when the calculateSummaryValue property is set.
     */
    summaryDisplayMode?: 'absoluteVariation' | 'percentOfColumnGrandTotal' | 'percentOfColumnTotal' | 'percentOfGrandTotal' | 'percentOfRowGrandTotal' | 'percentOfRowTotal' | 'percentVariation';
    /**
     * Specifies how to aggregate the field's data. Cannot be used with an XmlaStore.
     */
    summaryType?: 'avg' | 'count' | 'custom' | 'max' | 'min' | 'sum' | string;
    /**
     * Specifies whether the field is visible in the pivot grid and field chooser.
     */
    visible?: boolean;
    /**
     * Specifies the field's width in pixels when the field is displayed in the pivot grid.
     */
    width?: number;
    /**
     * Specifies whether text that does not fit into a header item should be wrapped.
     */
    wordWrapEnabled?: boolean;
}
/**
 * The PivotGridDataSource is an object that provides an API for processing data from an underlying store. This object is used in the PivotGrid UI component.
 */
export default class PivotGridDataSource {
    constructor(options?: PivotGridDataSourceOptions)
    /**
     * Collapses all header items of a field with the specified identifier.
     */
    collapseAll(id: number | string): void;
    /**
     * Collapses a specific header item.
     */
    collapseHeaderItem(area: string, path: Array<string | number | Date>): void;
    /**
     * Provides access to the facts that were used to calculate a specific summary value.
     */
    createDrillDownDataSource(options: { columnPath?: Array<string | number | Date>, rowPath?: Array<string | number | Date>, dataIndex?: number, maxRowCount?: number, customColumns?: Array<string> }): DataSource;
    /**
     * Disposes of all the resources allocated to the PivotGridDataSource instance.
     */
    dispose(): void;
    /**
     * Expands all the header items of a field with the specified identifier.
     */
    expandAll(id: number | string): void;
    /**
     * Expands a specific header item.
     */
    expandHeaderItem(area: string, path: Array<any>): void;
    /**
     * Gets all the properties of a field with the specified identifier.
     */
    field(id: number | string): any;
    /**
     * Updates field options' values.
     */
    field(id: number | string, options: any): void;
    /**
     * Gets all the fields including those generated automatically.
     */
    fields(): Array<PivotGridDataSourceField>;
    /**
     * Specifies a new fields collection.
     */
    fields(fields: Array<PivotGridDataSourceField>): void;
    /**
     * Gets the filter property's value. Does not affect an XmlaStore.
     */
    filter(): any;
    /**
     * Sets the filter property's value. Does not affect an XmlaStore.
     */
    filter(filterExpr: any): void;
    /**
     * Gets all the fields within an area.
     */
    getAreaFields(area: string, collectGroups: boolean): Array<PivotGridDataSourceField>;
    /**
     * Gets the loaded data. Another data portion is loaded every time a header item is expanded.
     */
    getData(): any;
    /**
     * Checks whether the PivotGridDataSource is loading data.
     */
    isLoading(): boolean;
    /**
     * Starts loading data.
     */
    load(): Promise<any> & JQueryPromise<any>;
    /**
     * 
     */
    off(eventName: string): this;
    /**
     * 
     */
    off(eventName: string, eventHandler: Function): this;
    /**
     * 
     */
    on(eventName: string, eventHandler: Function): this;
    /**
     * 
     */
    on(events: any): this;
    /**
     * Clears the loaded PivotGridDataSource data and calls the load() method.
     */
    reload(): Promise<any> & JQueryPromise<any>;
    /**
     * Gets the current PivotGridDataSource state. Part of the PivotGrid UI component's state storing feature.
     */
    state(): any;
    /**
     * Sets the PivotGridDataSource state. Part of the PivotGrid UI component's state storing feature.
     */
    state(state: any): void;
}
