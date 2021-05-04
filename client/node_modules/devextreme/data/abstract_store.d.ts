/**
* DevExtreme (data/abstract_store.d.ts)
* Version: 20.2.6
* Build date: Tue Mar 16 2021
*
* Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import '../jquery_augmentation';

import {
    LoadOptions
} from './load_options';

/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export interface StoreOptions<T = Store> {
    /**
     * Specifies the function that is executed when the store throws an error.
     */
    errorHandler?: Function;
    /**
     * Specifies the key property (or properties) that provide(s) key values to access data items. Each key value must be unique.
     */
    key?: string | Array<string>;
    /**
     * A function that is executed after a data item is added to the store.
     */
    onInserted?: ((values: any, key: any | string | number) => any);
    /**
     * A function that is executed before a data item is added to the store.
     */
    onInserting?: ((values: any) => any);
    /**
     * A function that is executed after data is loaded to the store.
     */
    onLoaded?: ((result: Array<any>) => any);
    /**
     * A function that is executed before data is loaded to the store.
     */
    onLoading?: ((loadOptions: LoadOptions) => any);
    /**
     * A function that is executed after a data item is added, updated, or removed from the store.
     */
    onModified?: Function;
    /**
     * A function that is executed before a data item is added, updated, or removed from the store.
     */
    onModifying?: Function;
    /**
     * The function executed before changes are pushed to the store.
     */
    onPush?: ((changes: Array<any>) => any);
    /**
     * A function that is executed after a data item is removed from the store.
     */
    onRemoved?: ((key: any | string | number) => any);
    /**
     * A function that is executed before a data item is removed from the store.
     */
    onRemoving?: ((key: any | string | number) => any);
    /**
     * A function that is executed after a data item is updated in the store.
     */
    onUpdated?: ((key: any | string | number, values: any) => any);
    /**
     * A function that is executed before a data item is updated in the store.
     */
    onUpdating?: ((key: any | string | number, values: any) => any);
}
/**
 * The base class for all Stores.
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export default class Store {
    constructor(options?: StoreOptions)
    /**
     * Gets a data item with a specific key.
     */
    byKey(key: any | string | number): Promise<any> & JQueryPromise<any>;
    /**
     * Adds a data item to the store.
     */
    insert(values: any): Promise<any> & JQueryPromise<any>;
    /**
     * Gets the key property (or properties) as specified in the key property.
     */
    key(): any;
    /**
     * Gets a data item's key value.
     */
    keyOf(obj: any): any;
    /**
     * Starts loading data.
     */
    load(): Promise<any> & JQueryPromise<any>;
    /**
     * Starts loading data.
     */
    load(options: LoadOptions): Promise<any> & JQueryPromise<any>;
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
     * Pushes data changes to the store and notifies the DataSource.
     */
    push(changes: Array<any>): void;
    /**
     * Removes a data item with a specific key from the store.
     */
    remove(key: any | string | number): Promise<void> & JQueryPromise<void>;
    /**
     * Gets the total count of items the load() function returns.
     */
    totalCount(obj: { filter?: any, group?: any }): Promise<number> & JQueryPromise<number>;
    /**
     * Updates a data item with a specific key.
     */
    update(key: any | string | number, values: any): Promise<any> & JQueryPromise<any>;
}
