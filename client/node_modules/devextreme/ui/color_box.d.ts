/**
* DevExtreme (ui/color_box.d.ts)
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

import dxDropDownEditor, {
    dxDropDownEditorOptions
} from './drop_down_editor/ui.drop_down_editor';

/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export interface dxColorBoxOptions extends dxDropDownEditorOptions<dxColorBox> {
    /**
     * Specifies the text displayed on the button that applies changes and closes the drop-down editor.
     */
    applyButtonText?: string;
    /**
     * Specifies the way an end-user applies the selected value.
     */
    applyValueMode?: 'instantly' | 'useButtons';
    /**
     * Specifies the text displayed on the button that cancels changes and closes the drop-down editor.
     */
    cancelButtonText?: string;
    /**
     * Specifies whether or not the UI component value includes the alpha channel component.
     */
    editAlphaChannel?: boolean;
    /**
     * Specifies a custom template for the input field. Must contain the TextBox UI component.
     */
    fieldTemplate?: template | ((value: string, fieldElement: dxElement) => string | Element | JQuery);
    /**
     * Specifies the size of a step by which a handle is moved using a keyboard shortcut.
     */
    keyStep?: number;
    /**
     * Specifies the currently selected value.
     */
    value?: string;
}
/**
 * The ColorBox is a UI component that allows an end user to enter a color or pick it out from the drop-down editor.
 */
export default class dxColorBox extends dxDropDownEditor {
    constructor(element: Element, options?: dxColorBoxOptions)
    constructor(element: JQuery, options?: dxColorBoxOptions)
}

declare global {
interface JQuery {
    dxColorBox(): JQuery;
    dxColorBox(options: "instance"): dxColorBox;
    dxColorBox(options: string): any;
    dxColorBox(options: string, ...params: any[]): any;
    dxColorBox(options: dxColorBoxOptions): JQuery;
}
}
/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export type Options = dxColorBoxOptions;

/** @deprecated use Options instead */
/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export type IOptions = dxColorBoxOptions;