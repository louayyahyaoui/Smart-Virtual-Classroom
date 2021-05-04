/**
* DevExtreme (ui/widget/ui.search_box_mixin.d.ts)
* Version: 20.2.6
* Build date: Tue Mar 16 2021
*
* Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import {
    dxTextBoxOptions
} from '../text_box';

/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export interface SearchBoxMixinOptions<T = SearchBoxMixin> {
    /**
     * 
     */
    searchEditorOptions?: dxTextBoxOptions;
    /**
     * Specifies whether the search panel is visible.
     */
    searchEnabled?: boolean;
    /**
     * Specifies a data object's field name or an expression whose value is compared to the search string.
     */
    searchExpr?: string | Function | Array<string | Function>;
    /**
     * Specifies a comparison operation used to search UI component items.
     */
    searchMode?: 'contains' | 'startswith' | 'equals';
    /**
     * Specifies a delay in milliseconds between when a user finishes typing, and the search is executed.
     */
    searchTimeout?: number;
    /**
     * Specifies the current search string.
     */
    searchValue?: string;
}
/**
 * 
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export default class SearchBoxMixin {
    constructor(options?: SearchBoxMixinOptions)
}
