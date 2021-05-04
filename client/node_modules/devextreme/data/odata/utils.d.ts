/**
* DevExtreme (data/odata/utils.d.ts)
* Version: 20.2.6
* Build date: Tue Mar 16 2021
*
* Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
/**
 * The EdmLiteral is an object for working with primitive data types from the OData's Abstract Type System that are not supported in JavaScript.
 */
export class EdmLiteral {
    constructor(value: string);
    /**
     * Gets the EdmLiteral's value converted to a string.
     */
    valueOf(): string;
}

/**
 * Contains built-in OData type converters (for String, Int32, Int64, Boolean, Single, Decimal, and Guid) and allows you to register a custom type converter.
 */
export var keyConverters: any;
