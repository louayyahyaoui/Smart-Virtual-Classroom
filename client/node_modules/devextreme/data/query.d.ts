/**
* DevExtreme (data/query.d.ts)
* Version: 20.2.6
* Build date: Tue Mar 16 2021
*
* Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import '../jquery_augmentation';

/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export interface Query {
    /**
     * Calculates a custom summary for all data items.
     */
    aggregate(seed: any, step: Function, finalize: Function): Promise<any> & JQueryPromise<any>;
    /**
     * Calculates a custom summary for all data items.
     */
    aggregate(step: Function): Promise<any> & JQueryPromise<any>;
    /**
     * Calculates the average of all values. Applies only to numeric arrays.
     */
    avg(): Promise<number> & JQueryPromise<number>;
    /**
     * Calculates the average of all values found using a getter.
     */
    avg(getter: any): Promise<number> & JQueryPromise<number>;
    /**
     * Calculates the number of data items.
     */
    count(): Promise<number> & JQueryPromise<number>;
    /**
     * Executes the Query. This is an asynchronous alternative to the toArray() method.
     */
    enumerate(): Promise<any> & JQueryPromise<any>;
    /**
     * Filters data items using a filter expression.
     */
    filter(criteria: Array<any>): Query;
    /**
     * Filters data items using a custom function.
     */
    filter(predicate: Function): Query;
    /**
     * Groups data items by the specified getter.
     */
    groupBy(getter: any): Query;
    /**
     * Calculates the maximum value. Applies only to numeric arrays.
     */
    max(): Promise<number | Date> & JQueryPromise<number | Date>;
    /**
     * Calculates the maximum of all values found using a getter.
     */
    max(getter: any): Promise<number | Date> & JQueryPromise<number | Date>;
    /**
     * Calculates the minimum value. Applies only to numeric arrays.
     */
    min(): Promise<number | Date> & JQueryPromise<number | Date>;
    /**
     * Calculates the minumum of all values found using a getter.
     */
    min(getter: any): Promise<number | Date> & JQueryPromise<number | Date>;
    /**
     * Selects individual fields from data objects.
     */
    select(getter: any): Query;
    /**
     * Gets a specified number of data items starting from a given index.
     */
    slice(skip: number, take?: number): Query;
    /**
     * Sorts data items by the specified getter in ascending order.
     */
    sortBy(getter: any): Query;
    /**
     * Sorts data items by the specified getter in the specified sorting order.
     */
    sortBy(getter: any, desc: boolean): Query;
    /**
     * Calculates the sum of all values.
     */
    sum(): Promise<number> & JQueryPromise<number>;
    /**
     * Calculates the sum of all values found using a getter.
     */
    sum(getter: any): Promise<number> & JQueryPromise<number>;
    /**
     * Sorts data items by one more getter in ascending order.
     */
    thenBy(getter: any): Query;
    /**
     * Sorts data items by one more getter in the specified sorting order.
     */
    thenBy(getter: any, desc: boolean): Query;
    /**
     * Gets data items associated with the Query. This is a synchronous alternative to the enumerate() method.
     */
    toArray(): Array<any>;
}

/**
 * Creates a Query instance.
 */
declare function query(array: Array<any>): Query;

/**
 * Creates a Query instance that accesses a remote data service using its URL.
 */
declare function query(url: string, queryOptions: any): Query;


/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export default query;
