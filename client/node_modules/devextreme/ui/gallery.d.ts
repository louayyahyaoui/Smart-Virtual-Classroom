/**
* DevExtreme (ui/gallery.d.ts)
* Version: 20.2.6
* Build date: Tue Mar 16 2021
*
* Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import '../jquery_augmentation';

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
export interface dxGalleryOptions extends CollectionWidgetOptions<dxGallery> {
    /**
     * The time, in milliseconds, spent on slide animation.
     */
    animationDuration?: number;
    /**
     * Specifies whether or not to animate the displayed item change.
     */
    animationEnabled?: boolean;
    /**
     * Binds the UI component to data.
     */
    dataSource?: string | Array<string | dxGalleryItem | any> | DataSource | DataSourceOptions;
    /**
     * Specifies whether the UI component can be focused using keyboard navigation.
     */
    focusStateEnabled?: boolean;
    /**
     * A Boolean value specifying whether or not to allow users to switch between items by clicking an indicator.
     */
    indicatorEnabled?: boolean;
    /**
     * Specifies the width of an area used to display a single image.
     */
    initialItemWidth?: number;
    /**
     * An array of items displayed by the UI component.
     */
    items?: Array<string | dxGalleryItem | any>;
    /**
     * A Boolean value specifying whether or not to scroll back to the first item after the last item is swiped.
     */
    loop?: boolean;
    /**
     * The text or HTML markup displayed by the UI component if the item collection is empty.
     */
    noDataText?: string;
    /**
     * The index of the currently active gallery item.
     */
    selectedIndex?: number;
    /**
     * A Boolean value specifying whether or not to display an indicator that points to the selected gallery item.
     */
    showIndicator?: boolean;
    /**
     * A Boolean value that specifies the availability of the 'Forward' and 'Back' navigation buttons.
     */
    showNavButtons?: boolean;
    /**
     * The time interval in milliseconds, after which the gallery switches to the next item.
     */
    slideshowDelay?: number;
    /**
     * Specifies if the UI component stretches images to fit the total gallery width.
     */
    stretchImages?: boolean;
    /**
     * A Boolean value specifying whether or not to allow users to switch between items by swiping.
     */
    swipeEnabled?: boolean;
    /**
     * Specifies whether or not to display parts of previous and next images along the sides of the current image.
     */
    wrapAround?: boolean;
}
/**
 * The Gallery is a UI component that displays a collection of images in a carousel. The UI component is supplied with various navigation controls that allow a user to switch between images.
 */
export default class dxGallery extends CollectionWidget {
    constructor(element: Element, options?: dxGalleryOptions)
    constructor(element: JQuery, options?: dxGalleryOptions)
    /**
     * Shows a specific image.
     */
    goToItem(itemIndex: number, animation: boolean): Promise<void> & JQueryPromise<void>;
    /**
     * Shows the next image.
     */
    nextItem(animation: boolean): Promise<void> & JQueryPromise<void>;
    /**
     * Shows the previous image.
     */
    prevItem(animation: boolean): Promise<void> & JQueryPromise<void>;
}

/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export interface dxGalleryItem extends CollectionWidgetItem {
    /**
     * Specifies the text passed to the alt attribute of the image markup element.
     */
    imageAlt?: string;
    /**
     * Specifies the URL of the image displayed by the item.
     */
    imageSrc?: string;
}

declare global {
interface JQuery {
    dxGallery(): JQuery;
    dxGallery(options: "instance"): dxGallery;
    dxGallery(options: string): any;
    dxGallery(options: string, ...params: any[]): any;
    dxGallery(options: dxGalleryOptions): JQuery;
}
}
/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export type Options = dxGalleryOptions;

/** @deprecated use Options instead */
/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export type IOptions = dxGalleryOptions;