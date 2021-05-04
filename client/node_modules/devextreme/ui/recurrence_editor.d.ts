/**
* DevExtreme (ui/recurrence_editor.d.ts)
* Version: 20.2.6
* Build date: Tue Mar 16 2021
*
* Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import Editor, {
    EditorOptions
} from './editor/editor';

/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export interface dxRecurrenceEditorOptions extends EditorOptions<dxRecurrenceEditor> {
    /**
     * Specifies the UI component's value.
     */
    value?: string;
}
/**
 * A base class for editors.
 */
export default class dxRecurrenceEditor extends Editor {
    constructor(element: Element, options?: dxRecurrenceEditorOptions)
    constructor(element: JQuery, options?: dxRecurrenceEditorOptions)
}

declare global {
interface JQuery {
    dxRecurrenceEditor(): JQuery;
    dxRecurrenceEditor(options: "instance"): dxRecurrenceEditor;
    dxRecurrenceEditor(options: string): any;
    dxRecurrenceEditor(options: string, ...params: any[]): any;
    dxRecurrenceEditor(options: dxRecurrenceEditorOptions): JQuery;
}
}
/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export type Options = dxRecurrenceEditorOptions;

/** @deprecated use Options instead */
/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export type IOptions = dxRecurrenceEditorOptions;