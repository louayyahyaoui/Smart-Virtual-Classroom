/**
* DevExtreme (data/data_source.d.ts)
* Version: 20.2.6
* Build date: Tue Mar 16 2021
*
* Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import '../jquery_augmentation';

import Store, {
    StoreOptions
} from './abstract_store';

import {
    CustomStoreOptions
} from './custom_store';

/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export interface DataSourceOptions {
    /**
     * Custom parameters that should be passed to an OData service with the load query. Available only for the ODataStore.
     */
    customQueryParams?: any;
    /**
     * Specifies the navigation properties to be loaded with the OData entity. Available only for the ODataStore.
     */
    expand?: Array<string> | string;
    /**
     * Specifies data filtering conditions.
     */
    filter?: string | Array<any> | Function;
    /**
     * Specifies data grouping properties.
     */
    group?: string | Array<any> | Function;
    /**
     * Specifies an item mapping function.
     */
    map?: ((dataItem: any) => any);
    /**
     * A function that is executed after data is loaded.
     */
    onChanged?: ((e: { changes?: Array<any> }) => any);
    /**
     * A function that is executed when data loading fails.
     */
    onLoadError?: ((error: { message?: string }) => any);
    /**
     * A function that is executed when the data loading status changes.
     */
    onLoadingChanged?: ((isLoading: boolean) => any);
    /**
     * Specifies the maximum number of data items per page. Applies only if paginate is true.
     */
    pageSize?: number;
    /**
     * Specifies whether the DataSource loads data items by pages or all at once. Defaults to false if group is set; otherwise, true.
     */
    paginate?: boolean;
    /**
     * Specifies a post processing function.
     */
    postProcess?: ((data: Array<any>) => Array<any>);
    /**
     * Specifies the period (in milliseconds) when changes are aggregated before pushing them to the DataSource.
     */
    pushAggregationTimeout?: number;
    /**
     * Specifies whether the DataSource requests the total count of data items in the storage.
     */
    requireTotalCount?: boolean;
    /**
     * Specifies whether to reapply sorting, filtering, grouping, and other data processing operations after receiving a push.
     */
    reshapeOnPush?: boolean;
    /**
     * Specifies the fields to search.
     */
    searchExpr?: string | Function | Array<string | Function>;
    /**
     * Specifies the comparison operation used in searching. The following values are accepted: '=', '<>', '>', '>=', '<', '<=', 'startswith', 'endswith', 'contains', 'notcontains'.
     */
    searchOperation?: string;
    /**
     * Specifies the value to which the search expression is compared.
     */
    searchValue?: any;
    /**
     * Specifies the fields to select from data objects.
     */
    select?: string | Array<any> | Function;
    /**
     * Specifies data sorting properties.
     */
    sort?: string | Array<any> | Function;
    /**
     * Configures the store underlying the DataSource.
     */
    store?: Store | StoreOptions | Array<any> | any;
}
/**
 * The DataSource is an object that provides an API for processing data from an underlying store.
 */
export default class DataSource {
    constructor(data: Array<any>);
    constructor(options: CustomStoreOptions | DataSourceOptions);
    constructor(store: Store);
    constructor(url: string);
    /**
     * Cancels the load operation with a specific identifier.
     */
    cancel(): boolean;
    /**
     * Disposes of all the resources allocated to the DataSource instance.
     */
    dispose(): void;
    /**
     * Gets the filter property's value.
     */
    filter(): any;
    /**
     * Sets the filter property's value.
     */
    filter(filterExpr: any): void;
    /**
     * Gets the group property's value.
     */
    group(): any;
    /**
     * Sets the group property's value.
     */
    group(groupExpr: any): void;
    /**
     * Checks whether the count of items on the current page is less than the pageSize. Takes effect only with enabled paging.
     */
    isLastPage(): boolean;
    /**
     * Checks whether data is loaded in the DataSource.
     */
    isLoaded(): boolean;
    /**
     * Checks whether data is being loaded in the DataSource.
     */
    isLoading(): boolean;
    /**
     * Gets an array of data items on the current page.
     */
    items(): Array<any>;
    /**
     * Gets the value of the underlying store's key property.
     */
    key(): any & string & number;
    /**
     * Starts loading data.
     */
    load(): Promise<any> & JQueryPromise<any>;
    /**
     * Gets an object with current data processing settings.
     */
    loadOptions(): any;
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
     * Gets the current page index.
     */
    pageIndex(): number;
    /**
     * Sets the index of the page that should be loaded on the next load() method call.
     */
    pageIndex(newIndex: number): void;
    /**
     * Gets the page size.
     */
    pageSize(): number;
    /**
     * Sets the page size.
     */
    pageSize(value: number): void;
    /**
     * Gets the paginate property's value.
     */
    paginate(): boolean;
    /**
     * Sets the paginate property's value.
     */
    paginate(value: boolean): void;
    /**
     * Clears currently loaded DataSource items and calls the load() method.
     */
    reload(): Promise<any> & JQueryPromise<any>;
    /**
     * Gets the requireTotalCount property's value.
     */
    requireTotalCount(): boolean;
    /**
     * Sets the requireTotalCount property's value.
     */
    requireTotalCount(value: boolean): void;
    /**
     * Gets the searchExpr property's value.
     */
    searchExpr(): string & Function & Array<string | Function>;
    /**
     * Sets the searchExpr property's value.
     */
    searchExpr(expr: string | Function | Array<string | Function>): void;
    /**
     * Gets the searchOperation property's value.
     */
    searchOperation(): string;
    /**
     * Sets the searchOperation property's value.
     */
    searchOperation(op: string): void;
    /**
     * Gets the searchValue property's value.
     */
    searchValue(): any;
    /**
     * Sets the searchValue property's value.
     */
    searchValue(value: any): void;
    /**
     * Gets the select property's value.
     */
    select(): any;
    /**
     * Sets the select property's value.
     */
    select(expr: any): void;
    /**
     * Gets the sort property's value.
     */
    sort(): any;
    /**
     * Sets the sort property's value.
     */
    sort(sortExpr: any): void;
    /**
     * Gets the instance of the store underlying the DataSource.
     */
    store(): any;
    /**
     * Gets the number of data items in the store after the last load() operation without paging. Takes effect only if requireTotalCount is true
     */
    totalCount(): number;
}
