/**
* DevExtreme (ui/text_area.d.ts)
* Version: 20.2.6
* Build date: Tue Mar 16 2021
*
* Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import dxTextBox, {
    dxTextBoxOptions
} from './text_box';

/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export interface dxTextAreaOptions extends dxTextBoxOptions<dxTextArea> {
    /**
     * A Boolean value specifying whether or not the auto resizing mode is enabled.
     */
    autoResizeEnabled?: boolean;
    /**
     * Specifies the maximum height of the UI component.
     */
    maxHeight?: number | string;
    /**
     * Specifies the minimum height of the UI component.
     */
    minHeight?: number | string;
    /**
     * Specifies whether or not the UI component checks the inner text for spelling mistakes.
     */
    spellcheck?: boolean;
}
/**
 * The TextArea is a UI component that enables a user to enter and edit a multi-line text.
 */
export default class dxTextArea extends dxTextBox {
    constructor(element: Element, options?: dxTextAreaOptions)
    constructor(element: JQuery, options?: dxTextAreaOptions)
}

declare global {
interface JQuery {
    dxTextArea(): JQuery;
    dxTextArea(options: "instance"): dxTextArea;
    dxTextArea(options: string): any;
    dxTextArea(options: string, ...params: any[]): any;
    dxTextArea(options: dxTextAreaOptions): JQuery;
}
}
/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export type Options = dxTextAreaOptions;

/** @deprecated use Options instead */
/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export type IOptions = dxTextAreaOptions;