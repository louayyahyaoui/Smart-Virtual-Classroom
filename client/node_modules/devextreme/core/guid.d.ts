/**
* DevExtreme (core/guid.d.ts)
* Version: 20.2.6
* Build date: Tue Mar 16 2021
*
* Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
/**
 * The Guid is an object used to generate and contain a GUID.
 */
export default class Guid {
    constructor();
    constructor(value: string);
    /**
     * Gets the GUID. Works identically to the valueOf() method.
     */
    toString(): string;
    /**
     * Gets the GUID. Works identically to the toString() method.
     */
    valueOf(): string;
}
