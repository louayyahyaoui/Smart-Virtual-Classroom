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

/// <reference types="react" />
import dxFilterBuilder, { IOptions } from "devextreme/ui/filter_builder";
import { Component as BaseComponent, IHtmlOptions } from "./core/component";
import NestedOption from "./core/nested-option";
interface IFilterBuilderOptions extends IOptions, IHtmlOptions {
    defaultValue?: any;
    onValueChange?: (value: any) => void;
}
declare class FilterBuilder extends BaseComponent<IFilterBuilderOptions> {
    get instance(): dxFilterBuilder;
    protected _WidgetClass: typeof dxFilterBuilder;
    protected subscribableOptions: string[];
    protected independentEvents: string[];
    protected _defaults: {
        defaultValue: string;
    };
    protected _expectedChildren: {
        customOperation: {
            optionName: string;
            isCollectionItem: boolean;
        };
        field: {
            optionName: string;
            isCollectionItem: boolean;
        };
        filterOperationDescriptions: {
            optionName: string;
            isCollectionItem: boolean;
        };
        groupOperationDescriptions: {
            optionName: string;
            isCollectionItem: boolean;
        };
    };
}
interface ICustomOperationProps {
    calculateFilterExpression?: any;
    caption?: any;
    customizeText?: any;
    dataTypes?: any;
    editorTemplate?: any;
    hasValue?: any;
    icon?: any;
    name?: any;
    editorRender?: (...params: any) => React.ReactNode;
    editorComponent?: React.ComponentType<any>;
    editorKeyFn?: (data: any) => string;
}
declare class CustomOperation extends NestedOption<ICustomOperationProps> {
    static OptionName: string;
    static IsCollectionItem: boolean;
    static TemplateProps: {
        tmplOption: string;
        render: string;
        component: string;
        keyFn: string;
    }[];
}
interface IFieldProps {
    calculateFilterExpression?: any;
    caption?: any;
    customizeText?: any;
    dataField?: any;
    dataType?: any;
    defaultFilterOperation?: any;
    editorOptions?: any;
    editorTemplate?: any;
    falseText?: any;
    filterOperations?: any;
    format?: any;
    lookup?: {
        allowClearing?: any;
        dataSource?: any;
        displayExpr?: any;
        valueExpr?: any;
    };
    name?: any;
    trueText?: any;
    editorRender?: (...params: any) => React.ReactNode;
    editorComponent?: React.ComponentType<any>;
    editorKeyFn?: (data: any) => string;
}
declare class Field extends NestedOption<IFieldProps> {
    static OptionName: string;
    static IsCollectionItem: boolean;
    static ExpectedChildren: {
        format: {
            optionName: string;
            isCollectionItem: boolean;
        };
        lookup: {
            optionName: string;
            isCollectionItem: boolean;
        };
    };
    static TemplateProps: {
        tmplOption: string;
        render: string;
        component: string;
        keyFn: string;
    }[];
}
interface IFilterOperationDescriptionsProps {
    between?: any;
    contains?: any;
    endsWith?: any;
    equal?: any;
    greaterThan?: any;
    greaterThanOrEqual?: any;
    isBlank?: any;
    isNotBlank?: any;
    lessThan?: any;
    lessThanOrEqual?: any;
    notContains?: any;
    notEqual?: any;
    startsWith?: any;
}
declare class FilterOperationDescriptions extends NestedOption<IFilterOperationDescriptionsProps> {
    static OptionName: string;
}
interface IFormatProps {
    currency?: any;
    formatter?: any;
    parser?: any;
    precision?: any;
    type?: any;
}
declare class Format extends NestedOption<IFormatProps> {
    static OptionName: string;
}
interface IGroupOperationDescriptionsProps {
    and?: any;
    notAnd?: any;
    notOr?: any;
    or?: any;
}
declare class GroupOperationDescriptions extends NestedOption<IGroupOperationDescriptionsProps> {
    static OptionName: string;
}
interface ILookupProps {
    allowClearing?: any;
    dataSource?: any;
    displayExpr?: any;
    valueExpr?: any;
}
declare class Lookup extends NestedOption<ILookupProps> {
    static OptionName: string;
}
export default FilterBuilder;
export { FilterBuilder, IFilterBuilderOptions, CustomOperation, ICustomOperationProps, Field, IFieldProps, FilterOperationDescriptions, IFilterOperationDescriptionsProps, Format, IFormatProps, GroupOperationDescriptions, IGroupOperationDescriptionsProps, Lookup, ILookupProps };
