/**
* DevExtreme (data/local_store.d.ts)
* Version: 20.2.6
* Build date: Tue Mar 16 2021
*
* Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import ArrayStore, {
    ArrayStoreOptions
} from './array_store';

/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export interface LocalStoreOptions extends ArrayStoreOptions<LocalStore> {
    /**
     * Specifies a delay in milliseconds between when data changes and the moment these changes are saved in the local storage. Applies only if immediate is false.
     */
    flushInterval?: number;
    /**
     * Specifies whether the LocalStore saves changes in the local storage immediately.
     */
    immediate?: boolean;
    /**
     * Specifies the name under which data should be saved in the local storage. The `dx-data-localStore-` prefix will be added to the name.
     */
    name?: string;
}
/**
 * The LocalStore is a store that provides an interface for loading and editing data from HTML Web Storage (also known as window.localStorage) and handling related events.
 */
export default class LocalStore extends ArrayStore {
    constructor(options?: LocalStoreOptions)
    /**
     * Removes data from the local storage.
     */
    clear(): void;
}
