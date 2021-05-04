/**
* DevExtreme (ui/number_box.d.ts)
* Version: 20.2.6
* Build date: Tue Mar 16 2021
*
* Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import dxTextEditor, {
    dxTextEditorButton,
    dxTextEditorOptions
} from './text_box/ui.text_editor.base';

import {
    format
} from './widget/ui.widget';

/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export interface dxNumberBoxOptions extends dxTextEditorOptions<dxNumberBox> {
    /**
     * Allows you to add custom buttons to the input text field.
     */
    buttons?: Array<'clear' | 'spins' | dxTextEditorButton>;
    /**
     * Specifies the value's display format and controls user input accordingly.
     */
    format?: format;
    /**
     * Specifies the text of the message displayed if the specified value is not a number.
     */
    invalidValueMessage?: string;
    /**
     * The maximum value accepted by the number box.
     */
    max?: number;
    /**
     * The minimum value accepted by the number box.
     */
    min?: number;
    /**
     * Specifies the value to be passed to the type attribute of the underlying `` element.
     */
    mode?: 'number' | 'text' | 'tel';
    /**
     * Specifies whether to show the buttons that change the value by a step.
     */
    showSpinButtons?: boolean;
    /**
     * Specifies how much the UI component's value changes when using the spin buttons, Up/Down arrow keys, or mouse wheel.
     */
    step?: number;
    /**
     * Specifies whether to use touch friendly spin buttons. Applies only if showSpinButtons is true.
     */
    useLargeSpinButtons?: boolean;
    /**
     * The current number box value.
     */
    value?: number;
}
/**
 * The NumberBox is a UI component that displays a numeric value and allows a user to modify it by typing in a value, and incrementing or decrementing it using the keyboard or mouse.
 */
export default class dxNumberBox extends dxTextEditor {
    constructor(element: Element, options?: dxNumberBoxOptions)
    constructor(element: JQuery, options?: dxNumberBoxOptions)
}

declare global {
interface JQuery {
    dxNumberBox(): JQuery;
    dxNumberBox(options: "instance"): dxNumberBox;
    dxNumberBox(options: string): any;
    dxNumberBox(options: string, ...params: any[]): any;
    dxNumberBox(options: dxNumberBoxOptions): JQuery;
}
}
/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export type Options = dxNumberBoxOptions;

/** @deprecated use Options instead */
/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export type IOptions = dxNumberBoxOptions;