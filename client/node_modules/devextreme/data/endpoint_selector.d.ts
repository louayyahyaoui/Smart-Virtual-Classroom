/**
* DevExtreme (data/endpoint_selector.d.ts)
* Version: 20.2.6
* Build date: Tue Mar 16 2021
*
* Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
/**
 * The EndpointSelector is an object for managing OData endpoints in your application.
 */
export default class EndpointSelector {
    constructor(options: any);
    /**
     * Gets an endpoint with a specific key.
     */
    urlFor(key: string): string;
}
