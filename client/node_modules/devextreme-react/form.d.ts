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
import dxForm, { IOptions } from "devextreme/ui/form";
import { Component as BaseComponent, IHtmlOptions } from "./core/component";
import NestedOption from "./core/nested-option";
interface IFormOptions extends IOptions, IHtmlOptions {
    defaultFormData?: any;
    onFormDataChange?: (value: any) => void;
}
declare class Form extends BaseComponent<IFormOptions> {
    get instance(): dxForm;
    protected _WidgetClass: typeof dxForm;
    protected subscribableOptions: string[];
    protected independentEvents: string[];
    protected _defaults: {
        defaultFormData: string;
    };
    protected _expectedChildren: {
        ButtonItem: {
            optionName: string;
            isCollectionItem: boolean;
        };
        colCountByScreen: {
            optionName: string;
            isCollectionItem: boolean;
        };
        EmptyItem: {
            optionName: string;
            isCollectionItem: boolean;
        };
        GroupItem: {
            optionName: string;
            isCollectionItem: boolean;
        };
        item: {
            optionName: string;
            isCollectionItem: boolean;
        };
        SimpleItem: {
            optionName: string;
            isCollectionItem: boolean;
        };
        TabbedItem: {
            optionName: string;
            isCollectionItem: boolean;
        };
    };
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
interface IButtonItemProps {
    buttonOptions?: any;
    colSpan?: any;
    cssClass?: any;
    horizontalAlignment?: any;
    itemType?: any;
    name?: any;
    verticalAlignment?: any;
    visible?: any;
    visibleIndex?: any;
}
declare class ButtonItem extends NestedOption<IButtonItemProps> {
    static OptionName: string;
    static IsCollectionItem: boolean;
    static ExpectedChildren: {
        buttonOptions: {
            optionName: string;
            isCollectionItem: boolean;
        };
    };
    static PredefinedProps: {
        itemType: string;
    };
}
interface IButtonOptionsProps {
    accessKey?: any;
    activeStateEnabled?: any;
    bindingOptions?: any;
    disabled?: any;
    elementAttr?: any;
    focusStateEnabled?: any;
    height?: any;
    hint?: any;
    hoverStateEnabled?: any;
    icon?: any;
    onClick?: any;
    onContentReady?: any;
    onDisposing?: any;
    onFocusIn?: any;
    onFocusOut?: any;
    onInitialized?: any;
    onOptionChanged?: any;
    rtlEnabled?: any;
    stylingMode?: any;
    tabIndex?: any;
    template?: any;
    text?: any;
    type?: any;
    useSubmitBehavior?: any;
    validationGroup?: any;
    visible?: any;
    width?: any;
    render?: (...params: any) => React.ReactNode;
    component?: React.ComponentType<any>;
    keyFn?: (data: any) => string;
}
declare class ButtonOptions extends NestedOption<IButtonOptionsProps> {
    static OptionName: string;
    static TemplateProps: {
        tmplOption: string;
        render: string;
        component: string;
        keyFn: string;
    }[];
}
interface IColCountByScreenProps {
    lg?: any;
    md?: any;
    sm?: any;
    xs?: any;
}
declare class ColCountByScreen extends NestedOption<IColCountByScreenProps> {
    static OptionName: string;
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
interface IEmptyItemProps {
    colSpan?: any;
    cssClass?: any;
    itemType?: any;
    name?: any;
    visible?: any;
    visibleIndex?: any;
}
declare class EmptyItem extends NestedOption<IEmptyItemProps> {
    static OptionName: string;
    static IsCollectionItem: boolean;
    static PredefinedProps: {
        itemType: string;
    };
}
interface IGroupItemProps {
    alignItemLabels?: any;
    caption?: any;
    colCount?: any;
    colCountByScreen?: {
        lg?: any;
        md?: any;
        sm?: any;
        xs?: any;
    };
    colSpan?: any;
    cssClass?: any;
    items?: any;
    itemType?: any;
    name?: any;
    template?: any;
    visible?: any;
    visibleIndex?: any;
    render?: (...params: any) => React.ReactNode;
    component?: React.ComponentType<any>;
    keyFn?: (data: any) => string;
}
declare class GroupItem extends NestedOption<IGroupItemProps> {
    static OptionName: string;
    static IsCollectionItem: boolean;
    static ExpectedChildren: {
        colCountByScreen: {
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
    static PredefinedProps: {
        itemType: string;
    };
}
interface IItemProps {
    badge?: any;
    disabled?: any;
    html?: any;
    icon?: any;
    tabTemplate?: any;
    template?: any;
    text?: any;
    title?: any;
    visible?: any;
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
    validationRules?: any;
    visibleIndex?: any;
    alignItemLabels?: any;
    caption?: any;
    colCount?: any;
    colCountByScreen?: {
        lg?: any;
        md?: any;
        sm?: any;
        xs?: any;
    };
    items?: any;
    tabPanelOptions?: any;
    tabs?: {
        alignItemLabels?: any;
        badge?: any;
        colCount?: any;
        colCountByScreen?: {
            lg?: any;
            md?: any;
            sm?: any;
            xs?: any;
        };
        disabled?: any;
        icon?: any;
        items?: any;
        tabTemplate?: any;
        template?: any;
        title?: any;
    }[];
    buttonOptions?: any;
    horizontalAlignment?: any;
    verticalAlignment?: any;
    tabRender?: (...params: any) => React.ReactNode;
    tabComponent?: React.ComponentType<any>;
    tabKeyFn?: (data: any) => string;
    render?: (...params: any) => React.ReactNode;
    component?: React.ComponentType<any>;
    keyFn?: (data: any) => string;
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
interface ISimpleItemProps {
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
declare class SimpleItem extends NestedOption<ISimpleItemProps> {
    static OptionName: string;
    static IsCollectionItem: boolean;
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
    static PredefinedProps: {
        itemType: string;
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
interface ITabProps {
    alignItemLabels?: any;
    badge?: any;
    colCount?: any;
    colCountByScreen?: {
        lg?: any;
        md?: any;
        sm?: any;
        xs?: any;
    };
    disabled?: any;
    icon?: any;
    items?: any;
    tabTemplate?: any;
    template?: any;
    title?: any;
    tabRender?: (...params: any) => React.ReactNode;
    tabComponent?: React.ComponentType<any>;
    tabKeyFn?: (data: any) => string;
    render?: (...params: any) => React.ReactNode;
    component?: React.ComponentType<any>;
    keyFn?: (data: any) => string;
}
declare class Tab extends NestedOption<ITabProps> {
    static OptionName: string;
    static IsCollectionItem: boolean;
    static ExpectedChildren: {
        colCountByScreen: {
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
interface ITabbedItemProps {
    colSpan?: any;
    cssClass?: any;
    itemType?: any;
    name?: any;
    tabPanelOptions?: any;
    tabs?: {
        alignItemLabels?: any;
        badge?: any;
        colCount?: any;
        colCountByScreen?: {
            lg?: any;
            md?: any;
            sm?: any;
            xs?: any;
        };
        disabled?: any;
        icon?: any;
        items?: any;
        tabTemplate?: any;
        template?: any;
        title?: any;
    }[];
    visible?: any;
    visibleIndex?: any;
}
declare class TabbedItem extends NestedOption<ITabbedItemProps> {
    static OptionName: string;
    static IsCollectionItem: boolean;
    static ExpectedChildren: {
        tab: {
            optionName: string;
            isCollectionItem: boolean;
        };
        tabPanelOptions: {
            optionName: string;
            isCollectionItem: boolean;
        };
    };
    static PredefinedProps: {
        itemType: string;
    };
}
interface ITabPanelOptionsProps {
    accessKey?: any;
    activeStateEnabled?: any;
    animationEnabled?: any;
    bindingOptions?: any;
    dataSource?: any;
    deferRendering?: any;
    disabled?: any;
    elementAttr?: any;
    focusedElement?: any;
    focusStateEnabled?: any;
    height?: any;
    hint?: any;
    hoverStateEnabled?: any;
    itemHoldTimeout?: any;
    items?: any;
    itemTemplate?: any;
    itemTitleTemplate?: any;
    keyExpr?: any;
    loop?: any;
    loopItemFocus?: any;
    noDataText?: any;
    onContentReady?: any;
    onDisposing?: any;
    onFocusIn?: any;
    onFocusOut?: any;
    onInitialized?: any;
    onItemClick?: any;
    onItemContextMenu?: any;
    onItemDeleted?: any;
    onItemDeleting?: any;
    onItemHold?: any;
    onItemRendered?: any;
    onItemReordered?: any;
    onOptionChanged?: any;
    onSelectionChanged?: any;
    onTitleClick?: any;
    onTitleHold?: any;
    onTitleRendered?: any;
    repaintChangesOnly?: any;
    rtlEnabled?: any;
    scrollByContent?: any;
    scrollingEnabled?: any;
    selectedIndex?: any;
    selectedItem?: any;
    selectedItemKeys?: any;
    selectedItems?: any;
    selectionByClick?: any;
    selectionMode?: any;
    selectionRequired?: any;
    selectOnFocus?: any;
    showNavButtons?: any;
    swipeEnabled?: any;
    tabIndex?: any;
    visible?: any;
    width?: any;
    defaultItems?: any;
    onItemsChange?: (value: any) => void;
    defaultSelectedIndex?: any;
    onSelectedIndexChange?: (value: any) => void;
    defaultSelectedItem?: any;
    onSelectedItemChange?: (value: any) => void;
    defaultSelectedItemKeys?: any;
    onSelectedItemKeysChange?: (value: any) => void;
    defaultSelectedItems?: any;
    onSelectedItemsChange?: (value: any) => void;
    itemRender?: (...params: any) => React.ReactNode;
    itemComponent?: React.ComponentType<any>;
    itemKeyFn?: (data: any) => string;
    itemTitleRender?: (...params: any) => React.ReactNode;
    itemTitleComponent?: React.ComponentType<any>;
    itemTitleKeyFn?: (data: any) => string;
}
declare class TabPanelOptions extends NestedOption<ITabPanelOptionsProps> {
    static OptionName: string;
    static DefaultsProps: {
        defaultItems: string;
        defaultSelectedIndex: string;
        defaultSelectedItem: string;
        defaultSelectedItemKeys: string;
        defaultSelectedItems: string;
    };
    static ExpectedChildren: {
        item: {
            optionName: string;
            isCollectionItem: boolean;
        };
        tabPanelOptionsItem: {
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
interface ITabPanelOptionsItemProps {
    badge?: any;
    disabled?: any;
    html?: any;
    icon?: any;
    tabTemplate?: any;
    template?: any;
    text?: any;
    title?: any;
    visible?: any;
    tabRender?: (...params: any) => React.ReactNode;
    tabComponent?: React.ComponentType<any>;
    tabKeyFn?: (data: any) => string;
    render?: (...params: any) => React.ReactNode;
    component?: React.ComponentType<any>;
    keyFn?: (data: any) => string;
}
declare class TabPanelOptionsItem extends NestedOption<ITabPanelOptionsItemProps> {
    static OptionName: string;
    static IsCollectionItem: boolean;
    static TemplateProps: {
        tmplOption: string;
        render: string;
        component: string;
        keyFn: string;
    }[];
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
export default Form;
export { Form, IFormOptions, AsyncRule, IAsyncRuleProps, ButtonItem, IButtonItemProps, ButtonOptions, IButtonOptionsProps, ColCountByScreen, IColCountByScreenProps, CompareRule, ICompareRuleProps, CustomRule, ICustomRuleProps, EmailRule, IEmailRuleProps, EmptyItem, IEmptyItemProps, GroupItem, IGroupItemProps, Item, IItemProps, Label, ILabelProps, NumericRule, INumericRuleProps, PatternRule, IPatternRuleProps, RangeRule, IRangeRuleProps, RequiredRule, IRequiredRuleProps, SimpleItem, ISimpleItemProps, StringLengthRule, IStringLengthRuleProps, Tab, ITabProps, TabbedItem, ITabbedItemProps, TabPanelOptions, ITabPanelOptionsProps, TabPanelOptionsItem, ITabPanelOptionsItemProps, ValidationRule, IValidationRuleProps };
