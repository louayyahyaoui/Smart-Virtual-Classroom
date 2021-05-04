/**
* DevExtreme (ui/box.d.ts)
* Version: 20.2.6
* Build date: Tue Mar 16 2021
*
* Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import DataSource, {
    DataSourceOptions
} from '../data/data_source';

import CollectionWidget, {
    CollectionWidgetItem,
    CollectionWidgetOptions
} from './collection/ui.collection_widget.base';

/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export interface dxBoxOptions extends CollectionWidgetOptions<dxBox> {
    /**
     * Specifies how UI component items are aligned along the main direction.
     */
    align?: 'center' | 'end' | 'space-around' | 'space-between' | 'start';
    /**
     * Specifies how UI component items are aligned cross-wise.
     */
    crossAlign?: 'center' | 'end' | 'start' | 'stretch';
    /**
     * Binds the UI component to data.
     */
    dataSource?: string | Array<string | dxBoxItem | any> | DataSource | DataSourceOptions;
    /**
     * Specifies the direction of item positioning in the UI component.
     */
    direction?: 'col' | 'row';
    /**
     * An array of items displayed by the UI component.
     */
    items?: Array<string | dxBoxItem | any>;
}
/**
 * The Box UI component allows you to arrange various elements within it. Separate and adaptive, the Box UI component acts as a building block for the layout.
 */
export default class dxBox extends CollectionWidget {
    constructor(element: Element, options?: dxBoxOptions)
    constructor(element: JQuery, options?: dxBoxOptions)
}

/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export interface dxBoxItem extends CollectionWidgetItem {
    /**
     * Specifies the base size of an item element along the main direction.
     */
    baseSize?: number | 'auto';
    /**
     * Holds a Box configuration object for the item.
     */
    box?: dxBoxOptions;
    /**
     * Specifies the ratio value used to count the item element size along the main direction.
     */
    ratio?: number;
    /**
     * A factor that defines how much an item shrinks relative to the rest of the items in the container.
     */
    shrink?: number;
}

declare global {
interface JQuery {
    dxBox(): JQuery;
    dxBox(options: "instance"): dxBox;
    dxBox(options: string): any;
    dxBox(options: string, ...params: any[]): any;
    dxBox(options: dxBoxOptions): JQuery;
}
}
/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export type Options = dxBoxOptions;

/** @deprecated use Options instead */
/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export type IOptions = dxBoxOptions;