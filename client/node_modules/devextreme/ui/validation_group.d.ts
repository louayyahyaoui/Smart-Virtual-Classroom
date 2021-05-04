/**
* DevExtreme (ui/validation_group.d.ts)
* Version: 20.2.6
* Build date: Tue Mar 16 2021
*
* Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import '../jquery_augmentation';

import DOMComponent, {
    DOMComponentOptions
} from '../core/dom_component';

import {
    AsyncRule,
    CompareRule,
    CustomRule,
    EmailRule,
    NumericRule,
    PatternRule,
    RangeRule,
    RequiredRule,
    StringLengthRule
} from './validation_rules';

/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export interface dxValidationGroupOptions extends DOMComponentOptions<dxValidationGroup> {
}
/**
 * The ValidationGroup is a UI component that allows you to validate several editors simultaneously.
 */
export default class dxValidationGroup extends DOMComponent {
    constructor(element: Element, options?: dxValidationGroupOptions)
    constructor(element: JQuery, options?: dxValidationGroupOptions)
    /**
     * Resets the value and validation result of the editors that are included to the current validation group.
     */
    reset(): void;
    /**
     * Validates rules of the validators that belong to the current validation group.
     */
    validate(): dxValidationGroupResult;
}

/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export interface dxValidationGroupResult {
    /**
     * An array of the validation rules that failed.
     */
    brokenRules?: Array<RequiredRule | NumericRule | RangeRule | StringLengthRule | CustomRule | CompareRule | PatternRule | EmailRule | AsyncRule>;
    /**
     * A promise that is fulfilled when all async rules are validated.
     */
    complete?: Promise<dxValidationGroupResult> & JQueryPromise<dxValidationGroupResult>;
    /**
     * Indicates whether all the rules checked for the group are satisfied.
     */
    isValid?: boolean;
    /**
     * Indicates the validation status.
     */
    status?: 'valid' | 'invalid' | 'pending';
    /**
     * Validator UI components included in the validated group.
     */
    validators?: Array<any>;
}

declare global {
interface JQuery {
    dxValidationGroup(): JQuery;
    dxValidationGroup(options: "instance"): dxValidationGroup;
    dxValidationGroup(options: string): any;
    dxValidationGroup(options: string, ...params: any[]): any;
    dxValidationGroup(options: dxValidationGroupOptions): JQuery;
}
}
/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export type Options = dxValidationGroupOptions;

/** @deprecated use Options instead */
/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export type IOptions = dxValidationGroupOptions;