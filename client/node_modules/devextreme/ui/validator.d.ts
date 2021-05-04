/**
* DevExtreme (ui/validator.d.ts)
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
export interface dxValidatorOptions extends DOMComponentOptions<dxValidator> {
    /**
     * An object that specifies what and when to validate, and how to apply the validation result.
     */
    adapter?: { applyValidationResults?: Function, bypass?: Function, focus?: Function, getValue?: Function, reset?: Function, validationRequestsCallbacks?: Array<Function> };
    /**
     * Specifies the editor name to be used in the validation default messages.
     */
    name?: string;
    /**
     * A function that is executed after a value is validated.
     */
    onValidated?: ((validatedInfo: { name?: string, isValid?: boolean, value?: any, validationRules?: Array<RequiredRule | NumericRule | RangeRule | StringLengthRule | CustomRule | CompareRule | PatternRule | EmailRule | AsyncRule>, brokenRule?: RequiredRule | NumericRule | RangeRule | StringLengthRule | CustomRule | CompareRule | PatternRule | EmailRule | AsyncRule, brokenRules?: Array<RequiredRule | NumericRule | RangeRule | StringLengthRule | CustomRule | CompareRule | PatternRule | EmailRule | AsyncRule>, status?: 'valid' | 'invalid' | 'pending' }) => any);
    /**
     * Specifies the validation group the editor will be related to.
     */
    validationGroup?: string;
    /**
     * An array of validation rules to be checked for the editor with which the dxValidator object is associated.
     */
    validationRules?: Array<RequiredRule | NumericRule | RangeRule | StringLengthRule | CustomRule | CompareRule | PatternRule | EmailRule | AsyncRule>;
}
/**
 * A UI component that is used to validate the associated DevExtreme editors against the defined validation rules.
 */
export default class dxValidator extends DOMComponent {
    constructor(element: Element, options?: dxValidatorOptions)
    constructor(element: JQuery, options?: dxValidatorOptions)
    /**
     * Sets focus to the editor associated with the current Validator object.
     */
    focus(): void;
    /**
     * Resets the value and validation result of the editor associated with the current Validator object.
     */
    reset(): void;
    /**
     * Validates the value of the editor that is controlled by the current Validator object against the list of the specified validation rules.
     */
    validate(): dxValidatorResult;
}

/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export interface dxValidatorResult {
    /**
     * A rule that failed to pass the check. Contains the first item from the brokenRules array.
     */
    brokenRule?: RequiredRule | NumericRule | RangeRule | StringLengthRule | CustomRule | CompareRule | PatternRule | EmailRule | AsyncRule;
    /**
     * An array of the validationRules that failed to pass the check.
     */
    brokenRules?: Array<RequiredRule | NumericRule | RangeRule | StringLengthRule | CustomRule | CompareRule | PatternRule | EmailRule | AsyncRule>;
    /**
     * A promise that is fulfilled when all async rules are validated.
     */
    complete?: Promise<dxValidatorResult> & JQueryPromise<dxValidatorResult>;
    /**
     * Indicates whether all the checked rules are satisfied.
     */
    isValid?: boolean;
    /**
     * An array of async rules whose promises are not fulfilled or rejected. Contains items only when the status is 'pending'.
     */
    pendingRules?: Array<AsyncRule>;
    /**
     * Indicates the validation status.
     */
    status?: 'valid' | 'invalid' | 'pending';
    /**
     * Validation rules specified for the Validator.
     */
    validationRules?: Array<RequiredRule | NumericRule | RangeRule | StringLengthRule | CustomRule | CompareRule | PatternRule | EmailRule | AsyncRule>;
    /**
     * The value being validated.
     */
    value?: any;
}

declare global {
interface JQuery {
    dxValidator(): JQuery;
    dxValidator(options: "instance"): dxValidator;
    dxValidator(options: string): any;
    dxValidator(options: string, ...params: any[]): any;
    dxValidator(options: dxValidatorOptions): JQuery;
}
}
/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export type Options = dxValidatorOptions;

/** @deprecated use Options instead */
/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export type IOptions = dxValidatorOptions;
