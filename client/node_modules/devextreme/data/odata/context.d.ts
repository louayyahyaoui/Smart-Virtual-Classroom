/**
* DevExtreme (data/odata/context.d.ts)
* Version: 20.2.6
* Build date: Tue Mar 16 2021
*
* Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import '../../jquery_augmentation';

/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export interface ODataContextOptions {
    /**
     * Specifies a function that customizes the request before it is sent to the server.
     */
    beforeSend?: ((options: { url?: string, async?: boolean, method?: string, timeout?: number, params?: any, payload?: any, headers?: any }) => any);
    /**
     * Specifies whether stores in the ODataContext serialize/parse date-time values.
     */
    deserializeDates?: boolean;
    /**
     * Specifies entity collections to be accessed.
     */
    entities?: any;
    /**
     * Specifies a function that is executed when the ODataContext throws an error.
     */
    errorHandler?: ((e: { httpStatus?: number, errorDetails?: any, requestOptions?: any }) => any);
    /**
     * Specifies whether to convert string values to lowercase in filter and search requests. Applies to the following operations: 'startswith', 'endswith', 'contains', and 'notcontains'.
     */
    filterToLower?: boolean;
    /**
     * Specifies whether data should be sent using JSONP.
     */
    jsonp?: boolean;
    /**
     * Specifies the URL of an OData service.
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
 * The ODataContent is an object that provides access to an entire OData service.
 */
export default class ODataContext {
    constructor(options?: ODataContextOptions)
    /**
     * Invokes an OData operation that returns a value.
     */
    get(operationName: string, params: any): Promise<any> & JQueryPromise<any>;
    /**
     * Invokes an OData operation that returns nothing.
     */
    invoke(operationName: string, params: any, httpMethod: any): Promise<void> & JQueryPromise<void>;
    /**
     * Gets a link to an entity with a specific key.
     */
    objectLink(entityAlias: string, key: any | string | number): any;
}
