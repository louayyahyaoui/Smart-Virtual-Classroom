/**
* DevExtreme (ui/text_box.d.ts)
* Version: 20.2.6
* Build date: Tue Mar 16 2021
*
* Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import dxTextEditor, {
    dxTextEditorOptions
} from './text_box/ui.text_editor.base';

/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export interface dxTextBoxOptions<T = dxTextBox> extends dxTextEditorOptions<T> {
    /**
     * Specifies the maximum number of characters you can enter into the textbox.
     */
    maxLength?: string | number;
    /**
     * The 'mode' attribute value of the actual HTML input element representing the text box.
     */
    mode?: 'email' | 'password' | 'search' | 'tel' | 'text' | 'url';
    /**
     * Specifies a value the UI component displays.
     */
    value?: string;
}
/**
 * The TextBox is a UI component that enables a user to enter and edit a single line of text.
 */
export default class dxTextBox extends dxTextEditor {
    constructor(element: Element, options?: dxTextBoxOptions)
    constructor(element: JQuery, options?: dxTextBoxOptions)
}

declare global {
interface JQuery {
    dxTextBox(): JQuery;
    dxTextBox(options: "instance"): dxTextBox;
    dxTextBox(options: string): any;
    dxTextBox(options: string, ...params: any[]): any;
    dxTextBox(options: dxTextBoxOptions): JQuery;
}
}
/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export type Options = dxTextBoxOptions;

/** @deprecated use Options instead */
/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export type IOptions = dxTextBoxOptions;