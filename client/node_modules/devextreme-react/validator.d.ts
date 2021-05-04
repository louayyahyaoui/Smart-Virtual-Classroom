/*!
 * devextreme-react
 * Version: 20.2.6
 * Build date: Tue Mar 16 2021
 *
 * Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
 *
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file in the root of the project for details.
 *
 * https://github.com/DevExpress/devextreme-react
 */

import dxValidator, { IOptions as IValidatorOptions } from "devextreme/ui/validator";
import { ExtensionComponent as BaseComponent } from "./core/extension-component";
import NestedOption from "./core/nested-option";
declare class Validator extends BaseComponent<IValidatorOptions> {
    get instance(): dxValidator;
    protected _WidgetClass: typeof dxValidator;
    protected independentEvents: string[];
    protected _expectedChildren: {
        adapter: {
            optionName: string;
            isCollectionItem: boolean;
        };
        AsyncRule: {
            optionName: string;
            isCollectionItem: boolean;
        };
        CompareRule: {
            optionName: string;
            isCollectionItem: boolean;
        };
        CustomRule: {
            optionName: string;
            isCollectionItem: boolean;
        };
        EmailRule: {
            optionName: string;
            isCollectionItem: boolean;
        };
        NumericRule: {
            optionName: string;
            isCollectionItem: boolean;
        };
        PatternRule: {
            optionName: string;
            isCollectionItem: boolean;
        };
        RangeRule: {
            optionName: string;
            isCollectionItem: boolean;
        };
        RequiredRule: {
            optionName: string;
            isCollectionItem: boolean;
        };
        StringLengthRule: {
            optionName: string;
            isCollectionItem: boolean;
        };
        validationRule: {
            optionName: string;
            isCollectionItem: boolean;
        };
    };
}
interface IAdapterProps {
    applyValidationResults?: any;
    bypass?: any;
    focus?: any;
    getValue?: any;
    reset?: any;
    validationRequestsCallbacks?: any;
}
declare class Adapter extends NestedOption<IAdapterProps> {
    static OptionName: string;
}
interface IAsyncRuleProps {
    ignoreEmptyValue?: any;
    message?: any;
    reevaluate?: any;
    type?: any;
    validationCallback?: any;
}
declare class AsyncRule extends NestedOption<IAsyncRuleProps> {
    static OptionName: string;
    static IsCollectionItem: boolean;
    static PredefinedProps: {
        type: string;
    };
}
interface ICompareRuleProps {
    comparisonTarget?: any;
    comparisonType?: any;
    ignoreEmptyValue?: any;
    message?: any;
    reevaluate?: any;
    type?: any;
}
declare class CompareRule extends NestedOption<ICompareRuleProps> {
    static OptionName: string;
    static IsCollectionItem: boolean;
    static PredefinedProps: {
        type: string;
    };
}
interface ICustomRuleProps {
    ignoreEmptyValue?: any;
    message?: any;
    reevaluate?: any;
    type?: any;
    validationCallback?: any;
}
declare class CustomRule extends NestedOption<ICustomRuleProps> {
    static OptionName: string;
    static IsCollectionItem: boolean;
    static PredefinedProps: {
        type: string;
    };
}
interface IEmailRuleProps {
    ignoreEmptyValue?: any;
    message?: any;
    type?: any;
}
declare class EmailRule extends NestedOption<IEmailRuleProps> {
    static OptionName: string;
    static IsCollectionItem: boolean;
    static PredefinedProps: {
        type: string;
    };
}
interface INumericRuleProps {
    ignoreEmptyValue?: any;
    message?: any;
    type?: any;
}
declare class NumericRule extends NestedOption<INumericRuleProps> {
    static OptionName: string;
    static IsCollectionItem: boolean;
    static PredefinedProps: {
        type: string;
    };
}
interface IPatternRuleProps {
    ignoreEmptyValue?: any;
    message?: any;
    pattern?: any;
    type?: any;
}
declare class PatternRule extends NestedOption<IPatternRuleProps> {
    static OptionName: string;
    static IsCollectionItem: boolean;
    static PredefinedProps: {
        type: string;
    };
}
interface IRangeRuleProps {
    ignoreEmptyValue?: any;
    max?: any;
    message?: any;
    min?: any;
    reevaluate?: any;
    type?: any;
}
declare class RangeRule extends NestedOption<IRangeRuleProps> {
    static OptionName: string;
    static IsCollectionItem: boolean;
    static PredefinedProps: {
        type: string;
    };
}
interface IRequiredRuleProps {
    message?: any;
    trim?: any;
    type?: any;
}
declare class RequiredRule extends NestedOption<IRequiredRuleProps> {
    static OptionName: string;
    static IsCollectionItem: boolean;
    static PredefinedProps: {
        type: string;
    };
}
interface IStringLengthRuleProps {
    ignoreEmptyValue?: any;
    max?: any;
    message?: any;
    min?: any;
    trim?: any;
    type?: any;
}
declare class StringLengthRule extends NestedOption<IStringLengthRuleProps> {
    static OptionName: string;
    static IsCollectionItem: boolean;
    static PredefinedProps: {
        type: string;
    };
}
interface IValidationRuleProps {
    message?: any;
    trim?: any;
    type?: any;
    ignoreEmptyValue?: any;
    max?: any;
    min?: any;
    reevaluate?: any;
    validationCallback?: any;
    comparisonTarget?: any;
    comparisonType?: any;
    pattern?: any;
}
declare class ValidationRule extends NestedOption<IValidationRuleProps> {
    static OptionName: string;
    static IsCollectionItem: boolean;
    static PredefinedProps: {
        type: string;
    };
}
export default Validator;
export { Validator, IValidatorOptions, Adapter, IAdapterProps, AsyncRule, IAsyncRuleProps, CompareRule, ICompareRuleProps, CustomRule, ICustomRuleProps, EmailRule, IEmailRuleProps, NumericRule, INumericRuleProps, PatternRule, IPatternRuleProps, RangeRule, IRangeRuleProps, RequiredRule, IRequiredRuleProps, StringLengthRule, IStringLengthRuleProps, ValidationRule, IValidationRuleProps };
