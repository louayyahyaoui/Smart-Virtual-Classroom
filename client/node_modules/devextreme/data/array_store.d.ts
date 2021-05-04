/**
* DevExtreme (data/array_store.d.ts)
* Version: 20.2.6
* Build date: Tue Mar 16 2021
*
* Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import Store, {
    StoreOptions
} from './abstract_store';

/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export interface ArrayStoreOptions<T = ArrayStore> extends StoreOptions<T> {
    /**
     * Specifies the store's associated array.
     */
    data?: Array<any>;
}
/**
 * The ArrayStore is a store that provides an interface for loading and editing an in-memory array and handling related events.
 */
export default class ArrayStore extends Store {
    constructor(options?: ArrayStoreOptions)
    /**
     * Clears all the ArrayStore's associated data.
     */
    clear(): void;
    /**
     * Creates a Query for the underlying array.
     */
    createQuery(): any;
}
