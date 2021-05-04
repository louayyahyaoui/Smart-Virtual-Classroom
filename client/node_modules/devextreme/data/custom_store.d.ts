/**
* DevExtreme (data/custom_store.d.ts)
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
    LoadOptions
} from './load_options';

/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export interface CustomStoreOptions extends StoreOptions<CustomStore> {
    /**
     * Specifies a custom implementation of the byKey(key) method.
     */
    byKey?: ((key: any | string | number) => Promise<any> | JQueryPromise<any>);
    /**
     * Specifies whether raw data should be saved in the cache. Applies only if loadMode is 'raw'.
     */
    cacheRawData?: boolean;
    /**
     * Specifies a custom implementation of the insert(values) method.
     */
    insert?: ((values: any) => Promise<any> | JQueryPromise<any>);
    /**
     * Specifies a custom implementation of the load(options) method.
     */
    load?: ((options: LoadOptions) => Promise<any> | JQueryPromise<any> | Array<any>);
    /**
     * Specifies how data returned by the load function is treated.
     */
    loadMode?: 'processed' | 'raw';
    /**
     * Specifies a custom implementation of the remove(key) method.
     */
    remove?: ((key: any | string | number) => Promise<void> | JQueryPromise<void>);
    /**
     * Specifies a custom implementation of the totalCount(options) method.
     */
    totalCount?: ((loadOptions: { filter?: any, group?: any }) => Promise<number> | JQueryPromise<number>);
    /**
     * Specifies a custom implementation of the update(key, values) method.
     */
    update?: ((key: any | string | number, values: any) => Promise<any> | JQueryPromise<any>);
    /**
     * Specifies whether the store combines the search and filter expressions. Defaults to true if the loadMode is 'raw' and false if it is 'processed'.
     */
    useDefaultSearch?: boolean;
}
/**
 * The CustomStore enables you to implement custom data access logic for consuming data from any source.
 */
export default class CustomStore extends Store {
    constructor(options?: CustomStoreOptions)
    /**
     * Deletes data from the cache. Takes effect only if the cacheRawData property is true.
     */
    clearRawDataCache(): void;
}
