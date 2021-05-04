/**
* DevExtreme (ui/filter_builder.d.ts)
* Version: 20.2.6
* Build date: Tue Mar 16 2021
*
* Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import {
    dxElement
} from '../core/element';

import {
    template
} from '../core/templates/template';

import Store from '../data/abstract_store';

import {
    DataSourceOptions
} from '../data/data_source';

import Widget, {
    format,
    WidgetOptions
} from './widget/ui.widget';

/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export interface dxFilterBuilderOptions extends WidgetOptions<dxFilterBuilder> {
    /**
     * 
     */
    allowHierarchicalFields?: boolean;
    /**
     * Configures custom filter operations.
     */
    customOperations?: Array<dxFilterBuilderCustomOperation>;
    /**
     * Configures fields.
     */
    fields?: Array<dxFilterBuilderField>;
    /**
     * Specifies filter operation descriptions.
     */
    filterOperationDescriptions?: { between?: string, contains?: string, endsWith?: string, equal?: string, greaterThan?: string, greaterThanOrEqual?: string, isBlank?: string, isNotBlank?: string, lessThan?: string, lessThanOrEqual?: string, notContains?: string, notEqual?: string, startsWith?: string };
    /**
     * Specifies group operation descriptions.
     */
    groupOperationDescriptions?: { and?: string, notAnd?: string, notOr?: string, or?: string };
    /**
     * Specifies a set of available group operations.
     */
    groupOperations?: Array<'and' | 'or' | 'notAnd' | 'notOr'>;
    /**
     * Specifies groups' maximum nesting level.
     */
    maxGroupLevel?: number;
    /**
     * A function that is executed after an editor is created.
     */
    onEditorPrepared?: ((e: { component?: dxFilterBuilder, element?: dxElement, model?: any, value?: any, setValue?: any, editorElement?: dxElement, editorName?: string, dataField?: string, filterOperation?: string, updateValueTimeout?: number, width?: number, readOnly?: boolean, disabled?: boolean, rtlEnabled?: boolean }) => any);
    /**
     * A function that is executed before an editor is created.
     */
    onEditorPreparing?: ((e: { component?: dxFilterBuilder, element?: dxElement, model?: any, value?: any, setValue?: any, cancel?: boolean, editorElement?: dxElement, editorName?: string, editorOptions?: any, dataField?: string, filterOperation?: string, updateValueTimeout?: number, width?: number, readOnly?: boolean, disabled?: boolean, rtlEnabled?: boolean }) => any);
    /**
     * A function that is executed after the UI component's value is changed.
     */
    onValueChanged?: ((e: { component?: dxFilterBuilder, element?: dxElement, model?: any, value?: any, previousValue?: any }) => any);
    /**
     * Allows you to specify a filter.
     */
    value?: string | Array<any> | Function;
}
/**
 * The FilterBuilder UI component allows a user to build complex filter expressions with an unlimited number of filter conditions, combined by logical operations using the UI.
 */
export default class dxFilterBuilder extends Widget {
    constructor(element: Element, options?: dxFilterBuilderOptions)
    constructor(element: JQuery, options?: dxFilterBuilderOptions)
    /**
     * Gets a filter expression that contains only operations supported by the DataSource.
     */
    getFilterExpression(): string | Array<any> | Function;
}

/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export interface dxFilterBuilderCustomOperation {
    /**
     * Specifies a function that returns a filter expression for this custom operation.
     */
    calculateFilterExpression?: ((filterValue: any, field: dxFilterBuilderField) => string | Array<any> | Function);
    /**
     * Specifies the operation's caption.
     */
    caption?: string;
    /**
     * Customizes the field value's text representation.
     */
    customizeText?: ((fieldInfo: { value?: string | number | Date, valueText?: string, field?: dxFilterBuilderField }) => string);
    /**
     * Specifies for which data types the operation is available by default.
     */
    dataTypes?: Array<'string' | 'number' | 'date' | 'boolean' | 'object' | 'datetime'>;
    /**
     * Specifies a custom template for the UI component used to edit the field value.
     */
    editorTemplate?: template | ((conditionInfo: { value?: string | number | Date, field?: dxFilterBuilderField, setValue?: Function }, container: dxElement) => string | Element | JQuery);
    /**
     * Specifies whether the operation can have a value. If it can, the editor is displayed.
     */
    hasValue?: boolean;
    /**
     * Specifies the icon that should represent the filter operation.
     */
    icon?: string;
    /**
     * Specifies the operation's identifier.
     */
    name?: string;
}

/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export interface dxFilterBuilderField {
    /**
     * Specifies the field's custom filtering rules.
     */
    calculateFilterExpression?: ((filterValue: any, selectedFilterOperation: string) => string | Array<any> | Function);
    /**
     * Specifies the data field's caption.
     */
    caption?: string;
    /**
     * Customizes the input value's display text.
     */
    customizeText?: ((fieldInfo: { value?: string | number | Date, valueText?: string }) => string);
    /**
     * Specifies the name of a field to be filtered.
     */
    dataField?: string;
    /**
     * Casts field values to a specific data type.
     */
    dataType?: 'string' | 'number' | 'date' | 'boolean' | 'object' | 'datetime';
    /**
     * 
     */
    editorOptions?: any;
    /**
     * Specifies the editor's custom template.
     */
    editorTemplate?: template | ((conditionInfo: { value?: string | number | Date, filterOperation?: string, field?: dxFilterBuilderField, setValue?: Function }, container: dxElement) => string | Element | JQuery);
    /**
     * Specifies the false value text. Applies only if dataType is 'boolean'.
     */
    falseText?: string;
    /**
     * Specifies a set of available filter operations.
     */
    filterOperations?: Array<'=' | '<>' | '<' | '<=' | '>' | '>=' | 'contains' | 'endswith' | 'isblank' | 'isnotblank' | 'notcontains' | 'startswith' | 'between' | string>;
    /**
     * Formats a value before it is displayed.
     */
    format?: format;
    /**
     * Configures the lookup field.
     */
    lookup?: { allowClearing?: boolean, dataSource?: Array<any> | DataSourceOptions | Store, displayExpr?: string | ((data: any) => string), valueExpr?: string | ((data: any) => string | number | boolean) };
    /**
     * Specifies the field's name. Use it to distinguish the field from other fields when they have identical dataField values.
     */
    name?: string;
    /**
     * Specifies the true value text. Applies only if dataType is 'boolean'.
     */
    trueText?: string;
}

declare global {
interface JQuery {
    dxFilterBuilder(): JQuery;
    dxFilterBuilder(options: "instance"): dxFilterBuilder;
    dxFilterBuilder(options: string): any;
    dxFilterBuilder(options: string, ...params: any[]): any;
    dxFilterBuilder(options: dxFilterBuilderOptions): JQuery;
}
}
/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export type Options = dxFilterBuilderOptions;

/** @deprecated use Options instead */
/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export type IOptions = dxFilterBuilderOptions;