/**
* DevExtreme (ui/tile_view.d.ts)
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
export interface dxTileViewOptions extends CollectionWidgetOptions<dxTileView> {
    /**
     * A Boolean value specifying whether or not the UI component changes its state when interacting with a user.
     */
    activeStateEnabled?: boolean;
    /**
     * Specifies the height of the base tile view item.
     */
    baseItemHeight?: number;
    /**
     * Specifies the width of the base tile view item.
     */
    baseItemWidth?: number;
    /**
     * Binds the UI component to data.
     */
    dataSource?: string | Array<string | dxTileViewItem | any> | DataSource | DataSourceOptions;
    /**
     * Specifies whether the UI component is oriented horizontally or vertically.
     */
    direction?: 'horizontal' | 'vertical';
    /**
     * Specifies whether the UI component can be focused using keyboard navigation.
     */
    focusStateEnabled?: boolean;
    /**
     * Specifies the UI component's height.
     */
    height?: number | string | (() => number | string);
    /**
     * Specifies whether the UI component changes its state when a user pauses on it.
     */
    hoverStateEnabled?: boolean;
    /**
     * Specifies the distance in pixels between adjacent tiles.
     */
    itemMargin?: number;
    /**
     * An array of items displayed by the UI component.
     */
    items?: Array<string | dxTileViewItem | any>;
    /**
     * A Boolean value specifying whether or not to display a scrollbar.
     */
    showScrollbar?: boolean;
}
/**
 * The TileView UI component contains a collection of tiles. Tiles can store much more information than ordinary buttons, that is why they are very popular in apps designed for touch devices.
 */
export default class dxTileView extends CollectionWidget {
    constructor(element: Element, options?: dxTileViewOptions)
    constructor(element: JQuery, options?: dxTileViewOptions)
    /**
     * 
     */
    scrollPosition(): number;
}

/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export interface dxTileViewItem extends CollectionWidgetItem {
    /**
     * Specifies a multiplier for the baseItemHeight property value (for the purpose of obtaining the actual item height).
     */
    heightRatio?: number;
    /**
     * Specifies a multiplier for the baseItemWidth property value (for the purpose of obtaining the actual item width).
     */
    widthRatio?: number;
}

declare global {
interface JQuery {
    dxTileView(): JQuery;
    dxTileView(options: "instance"): dxTileView;
    dxTileView(options: string): any;
    dxTileView(options: string, ...params: any[]): any;
    dxTileView(options: dxTileViewOptions): JQuery;
}
}
/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export type Options = dxTileViewOptions;

/** @deprecated use Options instead */
/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export type IOptions = dxTileViewOptions;