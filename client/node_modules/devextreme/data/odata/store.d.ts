/**
* DevExtreme (data/odata/store.d.ts)
* Version: 20.2.6
* Build date: Tue Mar 16 2021
*
* Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import '../../jquery_augmentation';

import Store, {
    StoreOptions
} from '../abstract_store';

import {
    LoadOptions
} from '../load_options';

/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export interface ODataStoreOptions extends StoreOptions<ODataStore> {
    /**
     * Specifies a function that customizes the request before it is sent to the server.
     */
    beforeSend?: ((options: { url?: string, async?: boolean, method?: string, timeout?: number, params?: any, payload?: any, headers?: any }) => any);
    /**
     * Specifies whether the store serializes/parses date-time values.
     */
    deserializeDates?: boolean;
    /**
     * Specifies a function that is executed when the ODataStore throws an error.
     */
    errorHandler?: ((e: { httpStatus?: number, errorDetails?: any, requestOptions?: any }) => any);
    /**
     * Specifies the data field types. Accepts the following types: 'String', 'Int32', 'Int64', 'Boolean', 'Single', 'Decimal' and 'Guid'.
     */
    fieldTypes?: any;
    /**
     * Specifies whether to convert string values to lowercase in filter and search requests. Applies to the following operations: 'startswith', 'endswith', 'contains', and 'notcontains'.
     */
    filterToLower?: boolean;
    /**
     * Specifies whether data should be sent using JSONP.
     */
    jsonp?: boolean;
    /**
     * Specifies the type of the key property or properties.
     */
    keyType?: 'String' | 'Int32' | 'Int64' | 'Guid' | 'Boolean' | 'Single' | 'Decimal' | any;
    /**
     * A function that is executed before data is loaded to the store.
     */
    onLoading?: ((loadOptions: LoadOptions) => any);
    /**
     * Specifies the URL of an OData entity collection.
     */
    url?: string;
    /**
     * Specifies the OData version.
     */
    version?: number;
    /**
     * Specifies whether to send cookies, authorization headers, and client certificates in a cross-origin request.
     */
    withCredentials?: boolean;
}
/**
 * The ODataStore is a store that provides an interface for loading and editing data from an individual OData entity collection and handling related events.
 */
export default class ODataStore extends Store {
    constructor(options?: ODataStoreOptions)
    byKey(key: any | string | number): Promise<any> & JQueryPromise<any>;
    /**
     * Gets an entity with a specific key.
     */
    byKey(key: any | string | number, extraOptions: { expand?: string | Array<string>, select?: string | Array<string> }): Promise<any> & JQueryPromise<any>;
    /**
     * Creates a Query for the OData endpoint.
     */
    createQuery(loadOptions: any): any;
}
