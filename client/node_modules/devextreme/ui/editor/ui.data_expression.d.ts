/**
* DevExtreme (ui/editor/ui.data_expression.d.ts)
* Version: 20.2.6
* Build date: Tue Mar 16 2021
*
* Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import {
    dxElement
} from '../../core/element';

import {
    template
} from '../../core/templates/template';

import DataSource, {
    DataSourceOptions
} from '../../data/data_source';

import {
    CollectionWidgetItem
} from '../collection/ui.collection_widget.base';

/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export interface DataExpressionMixinOptions<T = DataExpressionMixin> {
    /**
     * Binds the UI component to data.
     */
    dataSource?: string | Array<CollectionWidgetItem | any> | DataSource | DataSourceOptions;
    /**
     * Specifies the data field whose values should be displayed.
     */
    displayExpr?: string | ((item: any) => string);
    /**
     * Specifies a custom template for items.
     */
    itemTemplate?: template | ((itemData: any, itemIndex: number, itemElement: dxElement) => string | Element | JQuery);
    /**
     * An array of items displayed by the UI component.
     */
    items?: Array<CollectionWidgetItem | any>;
    /**
     * Specifies the currently selected value. May be an object if dataSource contains objects and valueExpr is not set.
     */
    value?: any;
    /**
     * Specifies which data field provides unique values to the UI component's value.
     */
    valueExpr?: string | ((item: any) => string | number | boolean);
}
/**
 * 
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export default class DataExpressionMixin {
    constructor(options?: DataExpressionMixinOptions)
    getDataSource(): DataSource;
}
