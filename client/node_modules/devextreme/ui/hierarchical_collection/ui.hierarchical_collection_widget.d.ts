/**
* DevExtreme (ui/hierarchical_collection/ui.hierarchical_collection_widget.d.ts)
* Version: 20.2.6
* Build date: Tue Mar 16 2021
*
* Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import CollectionWidget, {
    CollectionWidgetOptions
} from '../collection/ui.collection_widget.base';

/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export interface HierarchicalCollectionWidgetOptions<T = HierarchicalCollectionWidget> extends CollectionWidgetOptions<T> {
    /**
     * Specifies the name of the data source item field whose value defines whether or not the corresponding UI component item is disabled.
     */
    disabledExpr?: string | Function;
    /**
     * Specifies the data field whose values should be displayed.
     */
    displayExpr?: string | ((item: any) => string);
    /**
     * Specifies whether the UI component can be focused using keyboard navigation.
     */
    focusStateEnabled?: boolean;
    /**
     * Specifies whether the UI component changes its state when a user pauses on it.
     */
    hoverStateEnabled?: boolean;
    /**
     * Specifies which data field contains nested items.
     */
    itemsExpr?: string | Function;
    /**
     * Specifies which data field provides keys for TreeView items.
     */
    keyExpr?: string | Function;
    /**
     * Specifies the name of the data source item field whose value defines whether or not the corresponding UI component items is selected.
     */
    selectedExpr?: string | Function;
}
/**
 * 
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export default class HierarchicalCollectionWidget extends CollectionWidget {
    constructor(element: Element, options?: HierarchicalCollectionWidgetOptions)
    constructor(element: JQuery, options?: HierarchicalCollectionWidgetOptions)
}
