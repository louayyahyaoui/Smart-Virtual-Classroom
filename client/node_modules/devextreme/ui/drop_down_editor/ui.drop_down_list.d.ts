/**
* DevExtreme (ui/drop_down_editor/ui.drop_down_list.d.ts)
* Version: 20.2.6
* Build date: Tue Mar 16 2021
*
* Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import '../../jquery_augmentation';

import {
    dxElement
} from '../../core/element';

import {
    template
} from '../../core/templates/template';

import DataSource from '../../data/data_source';

import {
    event
} from '../../events/index';

import {
    DataExpressionMixinOptions
} from '../editor/ui.data_expression';

import dxDropDownEditor, {
    dxDropDownEditorOptions
} from './ui.drop_down_editor';

/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export interface dxDropDownListOptions<T = dxDropDownList> extends DataExpressionMixinOptions<T>, dxDropDownEditorOptions<T> {
    /**
     * Returns the value currently displayed by the UI component.
     */
    displayValue?: string;
    /**
     * Specifies a custom template for group captions.
     */
    groupTemplate?: template | ((itemData: any, itemIndex: number, itemElement: dxElement) => string | Element | JQuery);
    /**
     * Specifies whether data items should be grouped.
     */
    grouped?: boolean;
    /**
     * The minimum number of characters that must be entered into the text box to begin a search. Applies only if searchEnabled is true.
     */
    minSearchLength?: number;
    /**
     * The text or HTML markup displayed by the UI component if the item collection is empty.
     */
    noDataText?: string;
    /**
     * A function that is executed when a list item is clicked or tapped.
     */
    onItemClick?: ((e: { component?: T, element?: dxElement, model?: any, itemData?: any, itemElement?: any, itemIndex?: number | any, event?: event }) => any);
    /**
     * A function that is executed when a list item is selected or selection is canceled.
     */
    onSelectionChanged?: ((e: { component?: T, element?: dxElement, model?: any, selectedItem?: any }) => any);
    /**
     * A function that is executed after the UI component's value is changed.
     */
    onValueChanged?: ((e: { component?: T, element?: dxElement, model?: any, value?: any, previousValue?: any, event?: event }) => any);
    /**
     * Specifies whether to allow searching.
     */
    searchEnabled?: boolean;
    /**
     * Specifies the name of a data source item field or an expression whose value is compared to the search criterion.
     */
    searchExpr?: string | Function | Array<string | Function>;
    /**
     * Specifies a comparison operation used to search UI component items.
     */
    searchMode?: 'contains' | 'startswith';
    /**
     * Specifies the time delay, in milliseconds, after the last character has been typed in, before a search is executed.
     */
    searchTimeout?: number;
    /**
     * Gets the currently selected item.
     */
    selectedItem?: any;
    /**
     * Specifies whether or not the UI component displays unfiltered values until a user types a number of characters exceeding the minSearchLength property value.
     */
    showDataBeforeSearch?: boolean;
    /**
     * Specifies the currently selected value. May be an object if dataSource contains objects and valueExpr is not set.
     */
    value?: any;
    /**
     * Specifies the DOM events after which the UI component's value should be updated.
     */
    valueChangeEvent?: string;
    /**
     * Specifies whether text that exceeds the drop-down list width should be wrapped.
     */
    wrapItemText?: boolean;
}
/**
 * A base class for drop-down list UI components.
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export default class dxDropDownList extends dxDropDownEditor {
    constructor(element: Element, options?: dxDropDownListOptions)
    constructor(element: JQuery, options?: dxDropDownListOptions)
    getDataSource(): DataSource;
}
