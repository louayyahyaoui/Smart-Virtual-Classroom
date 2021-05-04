/**
* DevExtreme (ui/drop_down_editor/ui.drop_down_editor.d.ts)
* Version: 20.2.6
* Build date: Tue Mar 16 2021
*
* Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import {
    dxElement
} from '../../core/element';

import {
    template
} from '../../core/templates/template';

import dxTextBox, {
    dxTextBoxOptions
} from '../text_box';

import {
    dxTextEditorButton
} from '../text_box/ui.text_editor.base';

import {
    dxPopupOptions
} from '../popup';

/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export interface dxDropDownEditorOptions<T = dxDropDownEditor> extends dxTextBoxOptions<T> {
    /**
     * Specifies whether or not the UI component allows an end-user to enter a custom value.
     */
    acceptCustomValue?: boolean;
    /**
     * Specifies whether or not the UI component changes its state when interacting with a user.
     */
    activeStateEnabled?: boolean;
    /**
     * Specifies the way an end-user applies the selected value.
     */
    applyValueMode?: 'instantly' | 'useButtons';
    /**
     * 
     */
    dropDownOptions?: dxPopupOptions;
    /**
     * Allows you to add custom buttons to the input text field.
     */
    buttons?: Array<'clear' | 'dropDown' | dxTextEditorButton>;
    /**
     * Specifies whether to render the drop-down field's content when it is displayed. If false, the content is rendered immediately.
     */
    deferRendering?: boolean;
    /**
     * Specifies a custom template for the drop-down button.
     */
    dropDownButtonTemplate?: template | ((buttonData: { text?: string, icon?: string }, contentElement: dxElement) => string | Element | JQuery);
    /**
     * A function that is executed once the drop-down editor is closed.
     */
    onClosed?: ((e: { component?: T, element?: dxElement, model?: any }) => any);
    /**
     * A function that is executed once the drop-down editor is opened.
     */
    onOpened?: ((e: { component?: T, element?: dxElement, model?: any }) => any);
    /**
     * Specifies whether a user can open the drop-down list by clicking a text field.
     */
    openOnFieldClick?: boolean;
    /**
     * Specifies whether or not the drop-down editor is displayed.
     */
    opened?: boolean;
    /**
     * Specifies whether the drop-down button is visible.
     */
    showDropDownButton?: boolean;
    /**
     * Specifies the currently selected value.
     */
    value?: any;
}
/**
 * A drop-down editor UI component.
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export default class dxDropDownEditor extends dxTextBox {
    constructor(element: Element, options?: dxDropDownEditorOptions)
    constructor(element: JQuery, options?: dxDropDownEditorOptions)
    /**
     * Closes the drop-down editor.
     */
    close(): void;
    /**
     * Gets the popup window's content.
     */
    content(): dxElement;
    /**
     * Gets the UI component's `` element.
     */
    field(): dxElement;
    /**
     * Opens the drop-down editor.
     */
    open(): void;
}

/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export type Options = dxDropDownEditorOptions;

/** @deprecated use Options instead */
/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export type IOptions = dxDropDownEditorOptions;