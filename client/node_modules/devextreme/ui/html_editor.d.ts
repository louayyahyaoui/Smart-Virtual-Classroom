/**
* DevExtreme (ui/html_editor.d.ts)
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

import {
    event
} from '../events/index';

import Editor, {
    EditorOptions
} from './editor/editor';

import {
    dxToolbarItem
} from './toolbar';

/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export interface dxHtmlEditorOptions extends EditorOptions<dxHtmlEditor> {
    /**
     * Allows you to customize the DevExtreme Quill and 3rd-party modules.
     */
    customizeModules?: ((config: any) => any);
    /**
     * Specifies whether the UI component can be focused using keyboard navigation.
     */
    focusStateEnabled?: boolean;
    /**
     * Configures media resizing.
     */
    mediaResizing?: dxHtmlEditorMediaResizing;
    /**
     * Configures mentions.
     */
    mentions?: Array<dxHtmlEditorMention>;
    /**
     * The value to be assigned to the `name` attribute of the underlying HTML element.
     */
    name?: string;
    /**
     * A function that is executed when the UI component gets focus.
     */
    onFocusIn?: ((e: { component?: dxHtmlEditor, element?: dxElement, model?: any, event?: event }) => any);
    /**
     * A function that is executed when the UI component loses focus.
     */
    onFocusOut?: ((e: { component?: dxHtmlEditor, element?: dxElement, model?: any, event?: event }) => any);
    /**
     * Specifies the text displayed when the input field is empty.
     */
    placeholder?: string;
    /**
     * Configures the UI component's toolbar.
     */
    toolbar?: dxHtmlEditorToolbar;
    /**
     * Specifies in which markup language the value is stored.
     */
    valueType?: 'html' | 'markdown';
    /**
     * Configures variables, which are placeholders to be replaced with actual values when processing text.
     */
    variables?: dxHtmlEditorVariables;
}
/**
 * [tags] ctp HtmlEditor is a WYSIWYG editor that allows you to format textual and visual content and to output it in HTML or Markdown. HtmlEditor is built on top of and requires the DevExtreme Quill. #include common-ctp-note with { component: 'HtmlEditor' }
 */
export default class dxHtmlEditor extends Editor {
    constructor(element: Element, options?: dxHtmlEditorOptions)
    constructor(element: JQuery, options?: dxHtmlEditorOptions)
    /**
     * Clears the history of changes.
     */
    clearHistory(): void;
    /**
     * Deletes content from the given range.
     */
    delete(index: number, length: number): void;
    /**
     * Applies a format to the selected content. Cannot be used with embedded formats.
     */
    format(formatName: 'background' | 'bold' | 'color' | 'font' | 'italic' | 'link' | 'size' | 'strike' | 'script' | 'underline' | 'blockquote' | 'header' | 'indent' | 'list' | 'align' | 'code-block' | string, formatValue: any): void;
    /**
     * Applies a single block format to all lines in the given range.
     */
    formatLine(index: number, length: number, formatName: 'background' | 'bold' | 'color' | 'font' | 'italic' | 'link' | 'size' | 'strike' | 'script' | 'underline' | 'blockquote' | 'header' | 'indent' | 'list' | 'align' | 'code-block' | string, formatValue: any): void;
    /**
     * Applies several block formats to all lines in the given range.
     */
    formatLine(index: number, length: number, formats: any): void;
    /**
     * Applies a single text format to all characters in the given range.
     */
    formatText(index: number, length: number, formatName: 'background' | 'bold' | 'color' | 'font' | 'italic' | 'link' | 'size' | 'strike' | 'script' | 'underline' | 'blockquote' | 'header' | 'indent' | 'list' | 'align' | 'code-block' | string, formatValue: any): void;
    /**
     * Applies several text formats to all characters in the given range.
     */
    formatText(index: number, length: number, formats: any): void;
    /**
     * Gets a format, module, or Parchment.
     */
    get(componentPath: string): any;
    /**
     * Gets formats applied to the content in the specified range.
     */
    getFormat(index: number, length: number): any;
    /**
     * Gets the entire content's length.
     */
    getLength(): number;
    /**
     * Gets the instance of a module.
     */
    getModule(moduleName: string): any;
    /**
     * Gets the DevExtreme Quill's instance.
     */
    getQuillInstance(): any;
    /**
     * Gets the selected content's position and length.
     */
    getSelection(): any;
    /**
     * Inserts an embedded content at the specified position.
     */
    insertEmbed(index: number, type: string, config: any): void;
    /**
     * Inserts formatted text at the specified position. Used with all formats except embedded.
     */
    insertText(index: number, text: string, formats: any): void;
    /**
     * Reapplies the most recent undone change. Repeated calls reapply preceding undone changes.
     */
    redo(): void;
    /**
     * Registers custom formats and modules.
     */
    register(modules: any): void;
    /**
     * Removes all formatting and embedded content from the specified range.
     */
    removeFormat(index: number, length: number): void;
    /**
     * Selects and highlights content in the specified range.
     */
    setSelection(index: number, length: number): void;
    /**
     * Reverses the most recent change. Repeated calls reverse preceding changes.
     */
    undo(): void;
}

/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export interface dxHtmlEditorMediaResizing {
    /**
     * Specifies media types that can be resized. Currently, only images are supported.
     */
    allowedTargets?: Array<string>;
    /**
     * Enables media resizing.
     */
    enabled?: boolean;
}

/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export interface dxHtmlEditorMention {
    /**
     * Provides data for the suggestion list.
     */
    dataSource?: Array<string> | DataSource | DataSourceOptions;
    /**
     * Specifies the data field whose values should be displayed in the suggestion list.
     */
    displayExpr?: string | ((item: any) => string);
    /**
     * Specifies a custom template for suggestion list items.
     */
    itemTemplate?: template | ((itemData: any, itemIndex: number, itemElement: dxElement) => string | Element | JQuery);
    /**
     * Specifies the prefix that a user enters to activate mentions. You can use different prefixes with different dataSources.
     */
    marker?: string;
    /**
     * Specifies the minimum number of characters that a user should type to trigger the search.
     */
    minSearchLength?: number;
    /**
     * Specifies one or several data fields to search.
     */
    searchExpr?: string | Function | Array<string | Function>;
    /**
     * Specifies the delay between when a user stops typing and when the search is executed.
     */
    searchTimeout?: number;
    /**
     * Specifies a custom template for mentions.
     */
    template?: template | ((mentionData: { marker?: string, id?: string | number, value?: any }, contentElement: dxElement) => string | Element | JQuery);
    /**
     * Specifies which data field provides unique values to the template's `id` parameter.
     */
    valueExpr?: string | Function;
}

/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export interface dxHtmlEditorToolbar {
    /**
     * Specifies the container in which to place the toolbar.
     */
    container?: string | Element | JQuery;
    /**
     * Configures toolbar items. These items allow users to format text and execute commands.
     */
    items?: Array<dxHtmlEditorToolbarItem | 'background' | 'bold' | 'color' | 'font' | 'italic' | 'link' | 'image' | 'size' | 'strike' | 'subscript' | 'superscript' | 'underline' | 'blockquote' | 'header' | 'increaseIndent' | 'decreaseIndent' | 'orderedList' | 'bulletList' | 'alignLeft' | 'alignCenter' | 'alignRight' | 'alignJustify' | 'codeBlock' | 'variable' | 'separator' | 'undo' | 'redo' | 'clear' | 'insertTable' | 'insertRowAbove' | 'insertRowBelow' | 'insertColumnLeft' | 'insertColumnRight' | 'deleteColumn' | 'deleteRow' | 'deleteTable'>;
    /**
     * Specifies whether or not items are arranged into multiple lines when their combined width exceeds the toolbar width.
     */
    multiline?: boolean;
}

/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export interface dxHtmlEditorToolbarItem extends dxToolbarItem {
    /**
     * Specifies the predefined item that this object customizes or a format with multiple choices.
     */
    formatName?: 'background' | 'bold' | 'color' | 'font' | 'italic' | 'link' | 'image' | 'size' | 'strike' | 'subscript' | 'superscript' | 'underline' | 'blockquote' | 'header' | 'increaseIndent' | 'decreaseIndent' | 'orderedList' | 'bulletList' | 'alignLeft' | 'alignCenter' | 'alignRight' | 'alignJustify' | 'codeBlock' | 'variable' | 'separator' | 'undo' | 'redo' | 'clear' | 'insertTable' | 'insertRowAbove' | 'insertRowBelow' | 'insertColumnLeft' | 'insertColumnRight' | 'deleteColumn' | 'deleteRow' | 'deleteTable' | string;
    /**
     * Specifies values for a format with multiple choices. Should be used with the formatName.
     */
    formatValues?: Array<string | number | boolean>;
    /**
     * Specifies a location for the item on the toolbar.
     */
    location?: 'after' | 'before' | 'center';
}

/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export interface dxHtmlEditorVariables {
    /**
     * Specifies a collection of variables available for a user.
     */
    dataSource?: string | Array<string> | DataSource | DataSourceOptions;
    /**
     * Specifies the special character(s) that should surround the variables.
     */
    escapeChar?: string | Array<string>;
}

declare global {
interface JQuery {
    dxHtmlEditor(): JQuery;
    dxHtmlEditor(options: "instance"): dxHtmlEditor;
    dxHtmlEditor(options: string): any;
    dxHtmlEditor(options: string, ...params: any[]): any;
    dxHtmlEditor(options: dxHtmlEditorOptions): JQuery;
}
}
/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export type Options = dxHtmlEditorOptions;

/** @deprecated use Options instead */
/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export type IOptions = dxHtmlEditorOptions;