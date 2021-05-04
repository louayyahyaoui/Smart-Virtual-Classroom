/**
* DevExtreme (ui/pivot_grid/xmla_store.d.ts)
* Version: 20.2.6
* Build date: Tue Mar 16 2021
*
* Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export interface XmlaStoreOptions {
    /**
     * Specifies a function that customizes the request before it is sent to the server.
     */
    beforeSend?: ((options: { url?: string, method?: string, headers?: any, xhrFields?: any, data?: string, dataType?: string }) => any);
    /**
     * Specifies the database (or initial catalog) that contains the OLAP cube to use.
     */
    catalog?: string;
    /**
     * Specifies the name of the OLAP cube to use from the catalog.
     */
    cube?: string;
    /**
     * Specifies the OLAP server's URL.
     */
    url?: string;
}
/**
 * The XmlaStore is a store that provides an interface for accessing an OLAP cube according to the XMLA standard.
 */
export default class XmlaStore {
    constructor(options?: XmlaStoreOptions)
}
