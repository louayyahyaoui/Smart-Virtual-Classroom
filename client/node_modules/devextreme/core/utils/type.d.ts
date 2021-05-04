/**
* DevExtreme (core/utils/type.d.ts)
* Version: 20.2.6
* Build date: Tue Mar 16 2021
*
* Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
type GenericTypeChecker<T> = (object: T | {}) => object is T;

/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export declare const isBoolean: GenericTypeChecker<boolean>;

/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export declare const isDate: GenericTypeChecker<Date>;

/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export declare const isString: GenericTypeChecker<string>;

/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export declare const isNumeric: GenericTypeChecker<number>;

/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export declare function type(object: any): string;

/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export declare function isFunction(object: any): boolean;

/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export declare function isExponential(value: number): boolean;

/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export declare function isDefined(object: any): boolean;

/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export declare function isObject(object: any): boolean;

/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export declare function isEmptyObject(object: any): boolean;

/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export declare function isPlainObject(object: any): boolean;

/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export declare function isPrimitive(value: any): boolean;

/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export declare function isWindow(object: any): boolean;

/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export declare function isRenderer(object: any): boolean;

/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export declare function isPromise(object: any): boolean;

/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export declare function isDeferred(object: any): boolean;
