/**
* DevExtreme (ui/drop_down_box.d.ts)
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

import DataSource, {
    DataSourceOptions
} from '../data/data_source';

import dxDropDownEditor, {
    dxDropDownEditorOptions
} from './drop_down_editor/ui.drop_down_editor';

import {
    DataExpressionMixinOptions
} from './editor/ui.data_expression';

import {
    dxPopupOptions
} from './popup';

/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export interface dxDropDownBoxOptions extends DataExpressionMixinOptions<dxDropDownBox>, dxDropDownEditorOptions<dxDropDownBox> {
    /**
     * Specifies whether the UI component allows a user to enter a custom value.
     */
    acceptCustomValue?: boolean;
    /**
     * Specifies a custom template for the drop-down content.
     */
    contentTemplate?: template | ((templateData: { component?: dxDropDownBox, value?: any }, contentElement: dxElement) => string | Element | JQuery);
    /**
     * Binds the UI component to data.
     */
    dataSource?: string | Array<any> | DataSource | DataSourceOptions;
    /**
     * Customizes text before it is displayed in the input field.
     */
    displayValueFormatter?: ((value: string | Array<any>) => string);
    /**
     * Specifies a custom template for the text field. Must contain the TextBox UI component.
     */
    fieldTemplate?: template | ((value: any, fieldElement: dxElement) => string | Element | JQuery);
    /**
     * An array of items used to synchronize the DropDownBox with an embedded UI component.
     */
    items?: Array<any>; 
    /**
     * Specifies whether a user can open the drop-down list by clicking a text field.
     */
    openOnFieldClick?: boolean;
    /**
     * Specifies the DOM events after which the UI component's value should be updated.
     */
    valueChangeEvent?: string;
}
/**
 * The DropDownBox UI component consists of a text field, which displays the current value, and a drop-down field, which can contain any UI element.
 */
export default class dxDropDownBox extends dxDropDownEditor {
    constructor(element: Element, options?: dxDropDownBoxOptions)
    constructor(element: JQuery, options?: dxDropDownBoxOptions)
    getDataSource(): DataSource;
}

declare global {
interface JQuery {
    dxDropDownBox(): JQuery;
    dxDropDownBox(options: "instance"): dxDropDownBox;
    dxDropDownBox(options: string): any;
    dxDropDownBox(options: string, ...params: any[]): any;
    dxDropDownBox(options: dxDropDownBoxOptions): JQuery;
}
}
/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export type Options = dxDropDownBoxOptions;

/** @deprecated use Options instead */
/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export type IOptions = dxDropDownBoxOptions;