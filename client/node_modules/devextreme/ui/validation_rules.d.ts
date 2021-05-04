/**
* DevExtreme (ui/validation_rules.d.ts)
* Version: 20.2.6
* Build date: Tue Mar 16 2021
*
* Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export interface AsyncRule {
    /**
     * If true, the validationCallback is not executed for null, undefined, false, and empty strings.
     */
    ignoreEmptyValue?: boolean;
    /**
     * Specifies the message that is shown if the rule is broken.
     */
    message?: string;
    /**
     * Indicates whether the rule should always be checked for the target value or only when the value changes.
     */
    reevaluate?: boolean;
    /**
     * Specifies the rule type. Set it to 'async' to use the AsyncRule.
     */
    type?: 'required' | 'numeric' | 'range' | 'stringLength' | 'custom' | 'compare' | 'pattern' | 'email' | 'async';
    /**
     * A function that validates the target value.
     */
    validationCallback?: ((options: { value?: string | number, rule?: any, validator?: any, data?: any, column?: any, formItem?: any }) => Promise<any> | JQueryPromise<any>);
}

/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export interface CompareRule {
    /**
     * Specifies the function whose return value is used for comparison with the validated value.
     */
    comparisonTarget?: (() => any);
    /**
     * Specifies the operator to be used for comparing the validated value with the target.
     */
    comparisonType?: '!=' | '!==' | '<' | '<=' | '==' | '===' | '>' | '>=';
    /**
     * If set to true, empty values are valid.
     */
    ignoreEmptyValue?: boolean;
    /**
     * Specifies the message that is shown if the rule is broken.
     */
    message?: string;
    /**
     * Indicates whether or not the rule should be always checked for the target value or only when the target value changes.
     */
    reevaluate?: boolean;
    /**
     * Specifies the rule type. Set it to 'compare' to use the CompareRule.
     */
    type?: 'required' | 'numeric' | 'range' | 'stringLength' | 'custom' | 'compare' | 'pattern' | 'email' | 'async';
}

/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export interface CustomRule {
    /**
     * If true, the validationCallback is not executed for null, undefined, false, and empty strings.
     */
    ignoreEmptyValue?: boolean;
    /**
     * Specifies the message that is shown if the rule is broken.
     */
    message?: string;
    /**
     * Indicates whether the rule should be always checked for the target value or only when the target value changes.
     */
    reevaluate?: boolean;
    /**
     * Specifies the rule type. Set it to 'custom' to use the CustomRule.
     */
    type?: 'required' | 'numeric' | 'range' | 'stringLength' | 'custom' | 'compare' | 'pattern' | 'email' | 'async';
    /**
     * A function that validates the target value.
     */
    validationCallback?: ((options: { value?: string | number, rule?: any, validator?: any, data?: any, column?: any, formItem?: any }) => boolean);
}

/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export interface EmailRule {
    /**
     * If set to true, empty values are valid.
     */
    ignoreEmptyValue?: boolean;
    /**
     * Specifies the message that is shown if the rule is broken.
     */
    message?: string;
    /**
     * Specifies the rule type. Set it to 'email' to use the EmailRule.
     */
    type?: 'required' | 'numeric' | 'range' | 'stringLength' | 'custom' | 'compare' | 'pattern' | 'email' | 'async';
}

/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export interface NumericRule {
    /**
     * If set to true, empty values are valid.
     */
    ignoreEmptyValue?: boolean;
    /**
     * Specifies the message that is shown if the rule is broken.
     */
    message?: string;
    /**
     * Specifies the rule type. Set it to 'numeric' to use the NumericRule.
     */
    type?: 'required' | 'numeric' | 'range' | 'stringLength' | 'custom' | 'compare' | 'pattern' | 'email' | 'async';
}

/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export interface PatternRule {
    /**
     * If set to true, empty values are valid.
     */
    ignoreEmptyValue?: boolean;
    /**
     * Specifies the message that is shown if the rule is broken.
     */
    message?: string;
    /**
     * Specifies the regular expression that the validated value must match.
     */
    pattern?: RegExp | string;
    /**
     * Specifies the rule type. Set it to 'pattern' to use the PatternRule.
     */
    type?: 'required' | 'numeric' | 'range' | 'stringLength' | 'custom' | 'compare' | 'pattern' | 'email' | 'async';
}

/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export interface RangeRule {
    /**
     * If set to true, empty values are valid.
     */
    ignoreEmptyValue?: boolean;
    /**
     * Specifies the maximum value allowed for the validated value.
     */
    max?: Date | number;
    /**
     * Specifies the message that is shown if the rule is broken.
     */
    message?: string;
    /**
     * Specifies the minimum value allowed for the validated value.
     */
    min?: Date | number;
    /**
     * Indicates whether the rule should be always checked for the target value or only when the target value changes.
     */
    reevaluate?: boolean;
    /**
     * Specifies the rule type. Set it to 'range' to use the RangeRule.
     */
    type?: 'required' | 'numeric' | 'range' | 'stringLength' | 'custom' | 'compare' | 'pattern' | 'email' | 'async';
}

/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export interface RequiredRule {
    /**
     * Specifies the message that is shown if the rule is broken.
     */
    message?: string;
    /**
     * Indicates whether to remove the Space characters from the validated value.
     */
    trim?: boolean;
    /**
     * Specifies the rule type. Set it to 'required' to use the RequiredRule.
     */
    type?: 'required' | 'numeric' | 'range' | 'stringLength' | 'custom' | 'compare' | 'pattern' | 'email' | 'async';
}

/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export interface StringLengthRule {
    /**
     * If set to true, empty values are valid.
     */
    ignoreEmptyValue?: boolean;
    /**
     * Specifies the maximum length allowed for the validated value.
     */
    max?: number;
    /**
     * Specifies the message that is shown if the rule is broken.
     */
    message?: string;
    /**
     * Specifies the minimum length allowed for the validated value.
     */
    min?: number;
    /**
     * Indicates whether or not to remove the Space characters from the validated value.
     */
    trim?: boolean;
    /**
     * Specifies the rule type. Set it to 'stringLength' to use the StringLengthRule.
     */
    type?: 'required' | 'numeric' | 'range' | 'stringLength' | 'custom' | 'compare' | 'pattern' | 'email' | 'async';
}
