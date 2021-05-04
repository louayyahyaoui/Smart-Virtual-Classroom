/**
* DevExtreme (ui/editor/editor.d.ts)
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
    event
} from '../../events/index';

import Widget, {
    WidgetOptions
} from '../widget/ui.widget';

/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export interface EditorOptions<T = Editor> extends WidgetOptions<T> {
    /**
     * Specifies or indicates whether the editor's value is valid.
     */
    isValid?: boolean;
    /**
     * A function that is executed after the UI component's value is changed.
     */
    onValueChanged?: ((e: { component?: T, element?: dxElement, model?: any, value?: any, previousValue?: any, event?: event }) => any);
    /**
     * Specifies whether the editor is read-only.
     */
    readOnly?: boolean;
    /**
     * Information on the broken validation rule. Contains the first item from the validationErrors array.
     */
    validationError?: any;
    /**
     * An array of the validation rules that failed.
     */
    validationErrors?: Array<any>;
    /**
     * Specifies how the message about the validation rules that are not satisfied by this editor's value is displayed.
     */
    validationMessageMode?: 'always' | 'auto';
    /**
     * Indicates or specifies the current validation status.
     */
    validationStatus?: 'valid' | 'invalid' | 'pending';
    /**
     * Specifies the UI component's value.
     */
    value?: any;
}
/**
 * A base class for editors.
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export default class Editor extends Widget {
    constructor(element: Element, options?: EditorOptions)
    constructor(element: JQuery, options?: EditorOptions)
    /**
     * Resets the value property to the default value.
     */
    reset(): void;
}
