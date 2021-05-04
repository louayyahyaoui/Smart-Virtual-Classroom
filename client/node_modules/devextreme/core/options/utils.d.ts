/**
* DevExtreme (core/options/utils.d.ts)
* Version: 20.2.6
* Build date: Tue Mar 16 2021
*
* Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import {
    Device
} from '../devices';

/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export declare type Rule<T> = {
    device: () => boolean | Device | Device[];
    options: Partial<T>;
};

/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export declare function convertRulesToOptions<T>(rules: Rule<T>[]): T;

/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export declare function normalizeOptions(options: string | object, value): { [name: string]: string };

/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export declare function deviceMatch(device: Device, filter): boolean;

/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export declare function getFieldName(fullName: string): string;

/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export declare function getParentName(fullName: string): string;

/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export function createDefaultOptionRules<T>(options?: Rule<T>[]): Rule<T>[];
