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
import dxGantt, { IOptions } from "devextreme/ui/gantt";
import { Component as BaseComponent, IHtmlOptions } from "./core/component";
import NestedOption from "./core/nested-option";
interface IGanttOptions extends IOptions, IHtmlOptions {
    taskTooltipContentRender?: (...params: any) => React.ReactNode;
    taskTooltipContentComponent?: React.ComponentType<any>;
    taskTooltipContentKeyFn?: (data: any) => string;
}
declare class Gantt extends BaseComponent<IGanttOptions> {
    get instance(): dxGantt;
    protected _WidgetClass: typeof dxGantt;
    protected independentEvents: string[];
    protected _expectedChildren: {
        column: {
            optionName: string;
            isCollectionItem: boolean;
        };
        contextMenu: {
            optionName: string;
            isCollectionItem: boolean;
        };
        dependencies: {
            optionName: string;
            isCollectionItem: boolean;
        };
        editing: {
            optionName: string;
            isCollectionItem: boolean;
        };
        resourceAssignments: {
            optionName: string;
            isCollectionItem: boolean;
        };
        resources: {
            optionName: string;
            isCollectionItem: boolean;
        };
        stripLine: {
            optionName: string;
            isCollectionItem: boolean;
        };
        tasks: {
            optionName: string;
            isCollectionItem: boolean;
        };
        toolbar: {
            optionName: string;
            isCollectionItem: boolean;
        };
        validation: {
            optionName: string;
            isCollectionItem: boolean;
        };
    };
    protected _templateProps: {
        tmplOption: string;
        render: string;
        component: string;
        keyFn: string;
    }[];
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
interface IButtonProps {
    cssClass?: any;
    hint?: any;
    icon?: any;
    name?: any;
    onClick?: any;
    template?: any;
    text?: any;
    visible?: any;
    render?: (...params: any) => React.ReactNode;
    component?: React.ComponentType<any>;
    keyFn?: (data: any) => string;
}
declare class Button extends NestedOption<IButtonProps> {
    static OptionName: string;
    static IsCollectionItem: boolean;
    static TemplateProps: {
        tmplOption: string;
        render: string;
        component: string;
        keyFn: string;
    }[];
}
interface IColumnProps {
    alignment?: any;
    allowEditing?: any;
    allowFiltering?: any;
    allowFixing?: any;
    allowHeaderFiltering?: any;
    allowHiding?: any;
    allowReordering?: any;
    allowResizing?: any;
    allowSearch?: any;
    allowSorting?: any;
    buttons?: any;
    calculateCellValue?: any;
    calculateDisplayValue?: any;
    calculateFilterExpression?: any;
    calculateSortValue?: any;
    caption?: any;
    cellTemplate?: any;
    columns?: any;
    cssClass?: any;
    customizeText?: any;
    dataField?: any;
    dataType?: any;
    editCellTemplate?: any;
    editorOptions?: any;
    encodeHtml?: any;
    falseText?: any;
    filterOperations?: any;
    filterType?: any;
    filterValue?: any;
    filterValues?: any;
    fixed?: any;
    fixedPosition?: any;
    format?: any;
    formItem?: any;
    headerCellTemplate?: any;
    headerFilter?: {
        allowSearch?: any;
        dataSource?: any;
        groupInterval?: any;
        height?: any;
        searchMode?: any;
        width?: any;
    };
    hidingPriority?: any;
    isBand?: any;
    lookup?: {
        allowClearing?: any;
        dataSource?: any;
        displayExpr?: any;
        valueExpr?: any;
    };
    minWidth?: any;
    name?: any;
    ownerBand?: any;
    renderAsync?: any;
    selectedFilterOperation?: any;
    setCellValue?: any;
    showEditorAlways?: any;
    showInColumnChooser?: any;
    sortIndex?: any;
    sortingMethod?: any;
    sortOrder?: any;
    trueText?: any;
    type?: any;
    validationRules?: any;
    visible?: any;
    visibleIndex?: any;
    width?: any;
    defaultFilterValue?: any;
    onFilterValueChange?: (value: any) => void;
    defaultFilterValues?: any;
    onFilterValuesChange?: (value: any) => void;
    defaultSelectedFilterOperation?: any;
    onSelectedFilterOperationChange?: (value: any) => void;
    defaultSortIndex?: any;
    onSortIndexChange?: (value: any) => void;
    defaultSortOrder?: any;
    onSortOrderChange?: (value: any) => void;
    defaultVisible?: any;
    onVisibleChange?: (value: any) => void;
    defaultVisibleIndex?: any;
    onVisibleIndexChange?: (value: any) => void;
    cellRender?: (...params: any) => React.ReactNode;
    cellComponent?: React.ComponentType<any>;
    cellKeyFn?: (data: any) => string;
    editCellRender?: (...params: any) => React.ReactNode;
    editCellComponent?: React.ComponentType<any>;
    editCellKeyFn?: (data: any) => string;
    headerCellRender?: (...params: any) => React.ReactNode;
    headerCellComponent?: React.ComponentType<any>;
    headerCellKeyFn?: (data: any) => string;
}
declare class Column extends NestedOption<IColumnProps> {
    static OptionName: string;
    static IsCollectionItem: boolean;
    static DefaultsProps: {
        defaultFilterValue: string;
        defaultFilterValues: string;
        defaultSelectedFilterOperation: string;
        defaultSortIndex: string;
        defaultSortOrder: string;
        defaultVisible: string;
        defaultVisibleIndex: string;
    };
    static ExpectedChildren: {
        AsyncRule: {
            optionName: string;
            isCollectionItem: boolean;
        };
        button: {
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
        format: {
            optionName: string;
            isCollectionItem: boolean;
        };
        formItem: {
            optionName: string;
            isCollectionItem: boolean;
        };
        headerFilter: {
            optionName: string;
            isCollectionItem: boolean;
        };
        lookup: {
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
    static TemplateProps: {
        tmplOption: string;
        render: string;
        component: string;
        keyFn: string;
    }[];
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
interface IContextMenuProps {
    enabled?: any;
    items?: any;
}
declare class ContextMenu extends NestedOption<IContextMenuProps> {
    static OptionName: string;
    static ExpectedChildren: {
        contextMenuItem: {
            optionName: string;
            isCollectionItem: boolean;
        };
        item: {
            optionName: string;
            isCollectionItem: boolean;
        };
    };
}
interface IContextMenuItemProps {
    beginGroup?: any;
    closeMenuOnClick?: any;
    disabled?: any;
    html?: any;
    icon?: any;
    items?: any;
    name?: any;
    selectable?: any;
    selected?: any;
    template?: any;
    text?: any;
    visible?: any;
    render?: (...params: any) => React.ReactNode;
    component?: React.ComponentType<any>;
    keyFn?: (data: any) => string;
}
declare class ContextMenuItem extends NestedOption<IContextMenuItemProps> {
    static OptionName: string;
    static IsCollectionItem: boolean;
    static TemplateProps: {
        tmplOption: string;
        render: string;
        component: string;
        keyFn: string;
    }[];
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
interface IDependenciesProps {
    dataSource?: any;
    keyExpr?: any;
    predecessorIdExpr?: any;
    successorIdExpr?: any;
    typeExpr?: any;
}
declare class Dependencies extends NestedOption<IDependenciesProps> {
    static OptionName: string;
}
interface IEditingProps {
    allowDependencyAdding?: any;
    allowDependencyDeleting?: any;
    allowResourceAdding?: any;
    allowResourceDeleting?: any;
    allowResourceUpdating?: any;
    allowTaskAdding?: any;
    allowTaskDeleting?: any;
    allowTaskResourceUpdating?: any;
    allowTaskUpdating?: any;
    enabled?: any;
}
declare class Editing extends NestedOption<IEditingProps> {
    static OptionName: string;
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
interface IFormItemProps {
    colSpan?: any;
    cssClass?: any;
    dataField?: any;
    editorOptions?: any;
    editorType?: any;
    helpText?: any;
    isRequired?: any;
    itemType?: any;
    label?: {
        alignment?: any;
        location?: any;
        showColon?: any;
        text?: any;
        visible?: any;
    };
    name?: any;
    template?: any;
    validationRules?: any;
    visible?: any;
    visibleIndex?: any;
    render?: (...params: any) => React.ReactNode;
    component?: React.ComponentType<any>;
    keyFn?: (data: any) => string;
}
declare class FormItem extends NestedOption<IFormItemProps> {
    static OptionName: string;
    static ExpectedChildren: {
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
        label: {
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
    static TemplateProps: {
        tmplOption: string;
        render: string;
        component: string;
        keyFn: string;
    }[];
}
interface IHeaderFilterProps {
    allowSearch?: any;
    dataSource?: any;
    groupInterval?: any;
    height?: any;
    searchMode?: any;
    width?: any;
}
declare class HeaderFilter extends NestedOption<IHeaderFilterProps> {
    static OptionName: string;
}
interface IItemProps {
    beginGroup?: any;
    closeMenuOnClick?: any;
    disabled?: any;
    html?: any;
    icon?: any;
    items?: any;
    name?: any;
    selectable?: any;
    selected?: any;
    template?: any;
    text?: any;
    visible?: any;
    cssClass?: any;
    locateInMenu?: any;
    location?: any;
    menuItemTemplate?: any;
    options?: any;
    showText?: any;
    widget?: any;
    render?: (...params: any) => React.ReactNode;
    component?: React.ComponentType<any>;
    keyFn?: (data: any) => string;
    menuItemRender?: (...params: any) => React.ReactNode;
    menuItemComponent?: React.ComponentType<any>;
    menuItemKeyFn?: (data: any) => string;
}
declare class Item extends NestedOption<IItemProps> {
    static OptionName: string;
    static IsCollectionItem: boolean;
    static TemplateProps: {
        tmplOption: string;
        render: string;
        component: string;
        keyFn: string;
    }[];
}
interface ILabelProps {
    alignment?: any;
    location?: any;
    showColon?: any;
    text?: any;
    visible?: any;
}
declare class Label extends NestedOption<ILabelProps> {
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
interface IResourceAssignmentsProps {
    dataSource?: any;
    keyExpr?: any;
    resourceIdExpr?: any;
    taskIdExpr?: any;
}
declare class ResourceAssignments extends NestedOption<IResourceAssignmentsProps> {
    static OptionName: string;
}
interface IResourcesProps {
    colorExpr?: any;
    dataSource?: any;
    keyExpr?: any;
    textExpr?: any;
}
declare class Resources extends NestedOption<IResourcesProps> {
    static OptionName: string;
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
interface IStripLineProps {
    cssClass?: any;
    end?: any;
    start?: any;
    title?: any;
}
declare class StripLine extends NestedOption<IStripLineProps> {
    static OptionName: string;
    static IsCollectionItem: boolean;
}
interface ITasksProps {
    colorExpr?: any;
    dataSource?: any;
    endExpr?: any;
    keyExpr?: any;
    parentIdExpr?: any;
    progressExpr?: any;
    startExpr?: any;
    titleExpr?: any;
}
declare class Tasks extends NestedOption<ITasksProps> {
    static OptionName: string;
}
interface IToolbarProps {
    items?: any;
}
declare class Toolbar extends NestedOption<IToolbarProps> {
    static OptionName: string;
    static ExpectedChildren: {
        item: {
            optionName: string;
            isCollectionItem: boolean;
        };
        toolbarItem: {
            optionName: string;
            isCollectionItem: boolean;
        };
    };
}
interface IToolbarItemProps {
    cssClass?: any;
    disabled?: any;
    html?: any;
    locateInMenu?: any;
    location?: any;
    menuItemTemplate?: any;
    name?: any;
    options?: any;
    showText?: any;
    template?: any;
    text?: any;
    visible?: any;
    widget?: any;
    menuItemRender?: (...params: any) => React.ReactNode;
    menuItemComponent?: React.ComponentType<any>;
    menuItemKeyFn?: (data: any) => string;
    render?: (...params: any) => React.ReactNode;
    component?: React.ComponentType<any>;
    keyFn?: (data: any) => string;
}
declare class ToolbarItem extends NestedOption<IToolbarItemProps> {
    static OptionName: string;
    static IsCollectionItem: boolean;
    static TemplateProps: {
        tmplOption: string;
        render: string;
        component: string;
        keyFn: string;
    }[];
}
interface IValidationProps {
    autoUpdateParentTasks?: any;
    validateDependencies?: any;
}
declare class Validation extends NestedOption<IValidationProps> {
    static OptionName: string;
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
export default Gantt;
export { Gantt, IGanttOptions, AsyncRule, IAsyncRuleProps, Button, IButtonProps, Column, IColumnProps, CompareRule, ICompareRuleProps, ContextMenu, IContextMenuProps, ContextMenuItem, IContextMenuItemProps, CustomRule, ICustomRuleProps, Dependencies, IDependenciesProps, Editing, IEditingProps, EmailRule, IEmailRuleProps, Format, IFormatProps, FormItem, IFormItemProps, HeaderFilter, IHeaderFilterProps, Item, IItemProps, Label, ILabelProps, Lookup, ILookupProps, NumericRule, INumericRuleProps, PatternRule, IPatternRuleProps, RangeRule, IRangeRuleProps, RequiredRule, IRequiredRuleProps, ResourceAssignments, IResourceAssignmentsProps, Resources, IResourcesProps, StringLengthRule, IStringLengthRuleProps, StripLine, IStripLineProps, Tasks, ITasksProps, Toolbar, IToolbarProps, ToolbarItem, IToolbarItemProps, Validation, IValidationProps, ValidationRule, IValidationRuleProps };
