/**
* DevExtreme (ui/responsive_box.d.ts)
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
export interface dxResponsiveBoxOptions extends CollectionWidgetOptions<dxResponsiveBox> {
    /**
     * Specifies the collection of columns for the grid used to position layout elements.
     */
    cols?: Array<{ baseSize?: number | 'auto', ratio?: number, screen?: string, shrink?: number }>;
    /**
     * Binds the UI component to data.
     */
    dataSource?: string | Array<string | dxResponsiveBoxItem | any> | DataSource | DataSourceOptions;
    /**
     * Specifies the UI component's height.
     */
    height?: number | string | (() => number | string);
    /**
     * An array of items displayed by the UI component.
     */
    items?: Array<string | dxResponsiveBoxItem | any>;
    /**
     * Specifies the collection of rows for the grid used to position layout elements.
     */
    rows?: Array<{ baseSize?: number | 'auto', ratio?: number, screen?: string, shrink?: number }>;
    /**
     * Specifies the function returning the size qualifier depending on the screen's width.
     */
    screenByWidth?: Function;
    /**
     * Specifies on which screens all layout elements should be arranged in a single column. Accepts a single or several size qualifiers separated by a space.
     */
    singleColumnScreen?: string;
    /**
     * Specifies the UI component's width.
     */
    width?: number | string | (() => number | string);
}
/**
 * The ResponsiveBox UI component allows you to create an application or a website with a layout adapted to different screen sizes.
 */
export default class dxResponsiveBox extends CollectionWidget {
    constructor(element: Element, options?: dxResponsiveBoxOptions)
    constructor(element: JQuery, options?: dxResponsiveBoxOptions)
}

/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export interface dxResponsiveBoxItem extends CollectionWidgetItem {
    /**
     * Specifies the item location and size against the UI component grid.
     */
    location?: { col?: number, colspan?: number, row?: number, rowspan?: number, screen?: string } | Array<{ col?: number, colspan?: number, row?: number, rowspan?: number, screen?: string }>;
}

declare global {
interface JQuery {
    dxResponsiveBox(): JQuery;
    dxResponsiveBox(options: "instance"): dxResponsiveBox;
    dxResponsiveBox(options: string): any;
    dxResponsiveBox(options: string, ...params: any[]): any;
    dxResponsiveBox(options: dxResponsiveBoxOptions): JQuery;
}
}
/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export type Options = dxResponsiveBoxOptions;

/** @deprecated use Options instead */
/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export type IOptions = dxResponsiveBoxOptions;