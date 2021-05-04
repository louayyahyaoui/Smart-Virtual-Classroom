/**
* DevExtreme (ui/form.d.ts)
* Version: 20.2.6
* Build date: Tue Mar 16 2021
*
* Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import '../jquery_augmentation';

import {
    dxElement
} from '../core/element';

import {
    template
} from '../core/templates/template';

import dxButton, {
    dxButtonOptions
} from './button';

import Editor from './editor/editor';

import {
    dxTabPanelOptions
} from './tab_panel';

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

import {
    dxValidationGroupResult
} from './validation_group';

import Widget, {
    WidgetOptions
} from './widget/ui.widget';

/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export interface dxFormOptions extends WidgetOptions<dxForm> {
    /**
     * Specifies whether or not all root item labels are aligned.
     */
    alignItemLabels?: boolean;
    /**
     * Specifies whether or not item labels in all groups are aligned.
     */
    alignItemLabelsInAllGroups?: boolean;
    /**
     * The count of columns in the form layout.
     */
    colCount?: number | 'auto';
    /**
     * Specifies dependency between the screen factor and the count of columns in the form layout.
     */
    colCountByScreen?: any;
    /**
     * Specifies a function that customizes a form item after it has been created.
     */
    customizeItem?: ((item: dxFormSimpleItem | dxFormGroupItem | dxFormTabbedItem | dxFormEmptyItem | dxFormButtonItem) => any);
    /**
     * Provides the Form's data. Gets updated every time form fields change.
     */
    formData?: any;
    /**
     * Holds an array of form items.
     */
    items?: Array<dxFormSimpleItem | dxFormGroupItem | dxFormTabbedItem | dxFormEmptyItem | dxFormButtonItem>;
    /**
     * Specifies the location of a label against the editor.
     */
    labelLocation?: 'left' | 'right' | 'top';
    /**
     * The minimum column width used for calculating column count in the form layout.
     */
    minColWidth?: number;
    /**
     * A function that is executed when the Enter key has been pressed while an editor is focused.
     */
    onEditorEnterKey?: ((e: { component?: dxForm, element?: dxElement, model?: any, dataField?: string }) => any);
    /**
     * A function that is executed when the value of a formData object field is changed.
     */
    onFieldDataChanged?: ((e: { component?: dxForm, element?: dxElement, model?: any, dataField?: string, value?: any }) => any);
    /**
     * The text displayed for optional fields.
     */
    optionalMark?: string;
    /**
     * Specifies whether all editors on the form are read-only. Applies only to non-templated items.
     */
    readOnly?: boolean;
    /**
     * The text displayed for required fields.
     */
    requiredMark?: string;
    /**
     * Specifies the message that is shown for end-users if a required field value is not specified.
     */
    requiredMessage?: string;
    /**
     * Specifies a function that categorizes screens by their width.
     */
    screenByWidth?: Function;
    /**
     * A Boolean value specifying whether to enable or disable form scrolling.
     */
    scrollingEnabled?: boolean;
    /**
     * Specifies whether or not a colon is displayed at the end of form labels.
     */
    showColonAfterLabel?: boolean;
    /**
     * Specifies whether or not the optional mark is displayed for optional fields.
     */
    showOptionalMark?: boolean;
    /**
     * Specifies whether or not the required mark is displayed for required fields.
     */
    showRequiredMark?: boolean;
    /**
     * Specifies whether or not the total validation summary is displayed on the form.
     */
    showValidationSummary?: boolean;
    /**
     * Gives a name to the internal validation group.
     */
    validationGroup?: string;
}
/**
 * The Form UI component represents fields of a data object as a collection of label-editor pairs. These pairs can be arranged in several groups, tabs and columns.
 */
export default class dxForm extends Widget {
    constructor(element: Element, options?: dxFormOptions)
    constructor(element: JQuery, options?: dxFormOptions)
    /**
     * Gets a button's instance.
     */
    getButton(name: string): dxButton | undefined;
    /**
     * Gets an editor instance. Takes effect only if the form item is visible.
     */
    getEditor(dataField: string): Editor | undefined;
    /**
     * Gets a form item's configuration.
     */
    itemOption(id: string): any;
    /**
     * Updates the value of a single item property.
     */
    itemOption(id: string, option: string, value: any): void;
    /**
     * Updates the values of several item properties.
     */
    itemOption(id: string, options: any): void;
    /**
     * Resets the editor's value to undefined.
     */
    resetValues(): void;
    /**
     * Merges the passed `data` object with formData. Matching properties in formData are overwritten and new properties added.
     */
    updateData(data: any): void;
    /**
     * Updates a formData field and the corresponding editor.
     */
    updateData(dataField: string, value: any): void;
    /**
     * Updates the dimensions of the UI component contents.
     */
    updateDimensions(): Promise<void> & JQueryPromise<void>;
    /**
     * Validates the values of all editors on the form against the list of the validation rules specified for each form item.
     */
    validate(): dxValidationGroupResult;
}

/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export interface dxFormButtonItem {
    /**
     * 
     */
    buttonOptions?: dxButtonOptions;
    /**
     * Specifies how many columns the item spans.
     */
    colSpan?: number;
    /**
     * Specifies a CSS class to be applied to the item.
     */
    cssClass?: string;
    /**
     * Specifies the button's horizontal alignment.
     */
    horizontalAlignment?: 'center' | 'left' | 'right';
    /**
     * Specifies the item's type. Set it to 'button' to create a button item.
     */
    itemType?: 'empty' | 'group' | 'simple' | 'tabbed' | 'button';
    /**
     * Specifies the item's identifier.
     */
    name?: string;
    /**
     * Specifies the button's vertical alignment.
     */
    verticalAlignment?: 'bottom' | 'center' | 'top';
    /**
     * Specifies whether the item is visible.
     */
    visible?: boolean;
    /**
     * Specifies the item's position regarding other items in a group, tab, or the whole UI component.
     */
    visibleIndex?: number;
}

/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export interface dxFormEmptyItem {
    /**
     * Specifies the number of columns spanned by the item.
     */
    colSpan?: number;
    /**
     * Specifies a CSS class to be applied to the form item.
     */
    cssClass?: string;
    /**
     * Specifies the item's type. Set it to 'empty' to create an empty item.
     */
    itemType?: 'empty' | 'group' | 'simple' | 'tabbed' | 'button';
    /**
     * Specifies a name that identifies the form item.
     */
    name?: string;
    /**
     * Specifies whether or not the current form item is visible.
     */
    visible?: boolean;
    /**
     * Specifies the sequence number of the item in a form, group or tab.
     */
    visibleIndex?: number;
}

/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export interface dxFormGroupItem {
    /**
     * Specifies whether or not all group item labels are aligned.
     */
    alignItemLabels?: boolean;
    /**
     * Specifies the group caption.
     */
    caption?: string;
    /**
     * The count of columns in the group layout.
     */
    colCount?: number;
    /**
     * Specifies the relation between the screen size qualifier and the number of columns in the grouped layout.
     */
    colCountByScreen?: any;
    /**
     * Specifies the number of columns spanned by the item.
     */
    colSpan?: number;
    /**
     * Specifies a CSS class to be applied to the form item.
     */
    cssClass?: string;
    /**
     * Specifies the item's type. Set it to 'group' to create a group item.
     */
    itemType?: 'empty' | 'group' | 'simple' | 'tabbed' | 'button';
    /**
     * Holds an array of form items displayed within the group.
     */
    items?: Array<dxFormSimpleItem | dxFormGroupItem | dxFormTabbedItem | dxFormEmptyItem | dxFormButtonItem>;
    /**
     * Specifies a name that identifies the form item.
     */
    name?: string;
    /**
     * A template to be used for rendering a group item.
     */
    template?: template | ((data: { component?: dxForm, formData?: any }, itemElement: dxElement) => string | Element | JQuery);
    /**
     * Specifies whether or not the current form item is visible.
     */
    visible?: boolean;
    /**
     * Specifies the sequence number of the item in a form, group or tab.
     */
    visibleIndex?: number;
}

/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export interface dxFormSimpleItem {
    /**
     * Specifies the number of columns spanned by the item.
     */
    colSpan?: number;
    /**
     * Specifies a CSS class to be applied to the form item.
     */
    cssClass?: string;
    /**
     * Specifies the path to the formData object field bound to the current form item.
     */
    dataField?: string;
    /**
     * 
     */
    editorOptions?: any;
    /**
     * Specifies which editor UI component is used to display and edit the form item value.
     */
    editorType?: 'dxAutocomplete' | 'dxCalendar' | 'dxCheckBox' | 'dxColorBox' | 'dxDateBox' | 'dxDropDownBox' | 'dxHtmlEditor' | 'dxLookup' | 'dxNumberBox' | 'dxRadioGroup' | 'dxRangeSlider' | 'dxSelectBox' | 'dxSlider' | 'dxSwitch' | 'dxTagBox' | 'dxTextArea' | 'dxTextBox';
    /**
     * Specifies the help text displayed for the current form item.
     */
    helpText?: string;
    /**
     * Specifies whether the current form item is required.
     */
    isRequired?: boolean;
    /**
     * Specifies the item's type. Set it to 'simple' to create a simple item.
     */
    itemType?: 'empty' | 'group' | 'simple' | 'tabbed' | 'button';
    /**
     * Specifies properties for the form item label.
     */
    label?: { alignment?: 'center' | 'left' | 'right', location?: 'left' | 'right' | 'top', showColon?: boolean, text?: string, visible?: boolean };
    /**
     * Specifies a name that identifies the form item.
     */
    name?: string;
    /**
     * A template that can be used to replace the default editor with custom content.
     */
    template?: template | ((data: { component?: dxForm, dataField?: string, editorOptions?: any, editorType?: string, name?: string }, itemElement: dxElement) => string | Element | JQuery);
    /**
     * An array of validation rules to be checked for the form item editor.
     */
    validationRules?: Array<RequiredRule | NumericRule | RangeRule | StringLengthRule | CustomRule | CompareRule | PatternRule | EmailRule | AsyncRule>;
    /**
     * Specifies whether or not the current form item is visible.
     */
    visible?: boolean;
    /**
     * Specifies the sequence number of the item in a form, group or tab.
     */
    visibleIndex?: number;
}

/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export interface dxFormTabbedItem {
    /**
     * Specifies the number of columns spanned by the item.
     */
    colSpan?: number;
    /**
     * Specifies a CSS class to be applied to the form item.
     */
    cssClass?: string;
    /**
     * Specifies the item's type. Set it to 'tabbed' to create a tabbed item.
     */
    itemType?: 'empty' | 'group' | 'simple' | 'tabbed' | 'button';
    /**
     * Specifies a name that identifies the form item.
     */
    name?: string;
    /**
     * 
     */
    tabPanelOptions?: dxTabPanelOptions;
    /**
     * An array of tab configuration objects.
     */
    tabs?: Array<{ alignItemLabels?: boolean, badge?: string, colCount?: number, colCountByScreen?: any, disabled?: boolean, icon?: string, items?: Array<dxFormSimpleItem | dxFormGroupItem | dxFormTabbedItem | dxFormEmptyItem | dxFormButtonItem>, tabTemplate?: template | ((tabData: any, tabIndex: number, tabElement: dxElement) => any), template?: template | ((tabData: any, tabIndex: number, tabElement: dxElement) => any), title?: string }>;
    /**
     * Specifies whether or not the current form item is visible.
     */
    visible?: boolean;
    /**
     * Specifies the sequence number of the item in a form, group or tab.
     */
    visibleIndex?: number;
}

declare global {
interface JQuery {
    dxForm(): JQuery;
    dxForm(options: "instance"): dxForm;
    dxForm(options: string): any;
    dxForm(options: string, ...params: any[]): any;
    dxForm(options: dxFormOptions): JQuery;
}
}
/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export type Options = dxFormOptions;

/** @deprecated use Options instead */
/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export type IOptions = dxFormOptions;