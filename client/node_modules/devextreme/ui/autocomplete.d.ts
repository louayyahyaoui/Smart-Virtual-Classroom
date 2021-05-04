/**
* DevExtreme (ui/autocomplete.d.ts)
* Version: 20.2.6
* Build date: Tue Mar 16 2021
*
* Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import dxDropDownList, {
    dxDropDownListOptions
} from './drop_down_editor/ui.drop_down_list';

/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export interface dxAutocompleteOptions extends dxDropDownListOptions<dxAutocomplete> {
    /**
     * Specifies the maximum count of items displayed by the UI component.
     */
    maxItemCount?: number;
    /**
     * The minimum number of characters that must be entered into the text box to begin a search.
     */
    minSearchLength?: number;
    /**
     * Specifies whether the drop-down button is visible.
     */
    showDropDownButton?: boolean;
    /**
     * Specifies the current value displayed by the UI component.
     */
    value?: string;
}
/**
 * The Autocomplete UI component is a textbox that provides suggestions while a user types into it.
 */
export default class dxAutocomplete extends dxDropDownList {
    constructor(element: Element, options?: dxAutocompleteOptions)
    constructor(element: JQuery, options?: dxAutocompleteOptions)
}

declare global {
interface JQuery {
    dxAutocomplete(): JQuery;
    dxAutocomplete(options: "instance"): dxAutocomplete;
    dxAutocomplete(options: string): any;
    dxAutocomplete(options: string, ...params: any[]): any;
    dxAutocomplete(options: dxAutocompleteOptions): JQuery;
}
}
/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export type Options = dxAutocompleteOptions;

/** @deprecated use Options instead */
/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export type IOptions = dxAutocompleteOptions;