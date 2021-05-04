/**
* DevExtreme (ui/sortable.d.ts)
* Version: 20.2.6
* Build date: Tue Mar 16 2021
*
* Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import DOMComponent from '../core/dom_component';

import {
    dxElement
} from '../core/element';

import {
    template
} from '../core/templates/template';

import {
    event
} from '../events/index';

import dxDraggable, {
    DraggableBase,
    DraggableBaseOptions
} from './draggable';

/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export interface dxSortableOptions extends DraggableBaseOptions<dxSortable> {
    /**
     * Allows a user to drop an item inside another item.
     */
    allowDropInsideItem?: boolean;
    /**
     * Allows a user to reorder sortable items.
     */
    allowReordering?: boolean;
    /**
     * Specifies custom markup to be shown instead of the item being dragged.
     */
    dragTemplate?: template | ((dragInfo: { itemData?: any, itemElement?: dxElement, fromIndex?: number }, containerElement: dxElement) => string | Element | JQuery);
    /**
     * Specifies how to highlight the item's drop position.
     */
    dropFeedbackMode?: 'push' | 'indicate';
    /**
     * Specifies a CSS selector for the items that can be dragged.
     */
    filter?: string;
    /**
     * Notifies the UI component of the items' orientation.
     */
    itemOrientation?: 'horizontal' | 'vertical';
    /**
     * Moves an element in the HTML markup when it is dropped.
     */
    moveItemOnDrop?: boolean;
    /**
     * A function that is called when a new item is added.
     */
    onAdd?: ((e: { component?: dxSortable, element?: dxElement, model?: any, event?: event, itemData?: any, itemElement?: dxElement, fromIndex?: number, toIndex?: number, fromComponent?: dxSortable | dxDraggable, toComponent?: dxSortable | dxDraggable, fromData?: any, toData?: any, dropInsideItem?: boolean }) => any);
    /**
     * A function that is called when the dragged item's position in the list is changed.
     */
    onDragChange?: ((e: { component?: dxSortable, element?: dxElement, model?: any, event?: event, cancel?: boolean, itemData?: any, itemElement?: dxElement, fromIndex?: number, toIndex?: number, fromComponent?: dxSortable | dxDraggable, toComponent?: dxSortable | dxDraggable, fromData?: any, toData?: any, dropInsideItem?: boolean }) => any);
    /**
     * A function that is called when the drag gesture is finished.
     */
    onDragEnd?: ((e: { component?: dxSortable, element?: dxElement, model?: any, event?: event, cancel?: boolean, itemData?: any, itemElement?: dxElement, fromIndex?: number, toIndex?: number, fromComponent?: dxSortable | dxDraggable, toComponent?: dxSortable | dxDraggable, fromData?: any, toData?: any, dropInsideItem?: boolean }) => any);
    /**
     * A function that is called every time a draggable item is moved.
     */
    onDragMove?: ((e: { component?: dxSortable, element?: dxElement, model?: any, event?: event, cancel?: boolean, itemData?: any, itemElement?: dxElement, fromIndex?: number, toIndex?: number, fromComponent?: dxSortable | dxDraggable, toComponent?: dxSortable | dxDraggable, fromData?: any, toData?: any, dropInsideItem?: boolean }) => any);
    /**
     * A function that is called when drag gesture is initialized.
     */
    onDragStart?: ((e: { component?: dxSortable, element?: dxElement, model?: any, event?: event, cancel?: boolean, itemData?: any, itemElement?: dxElement, fromIndex?: number, fromData?: any }) => any);
    /**
     * A function that is called when a draggable item is removed.
     */
    onRemove?: ((e: { component?: dxSortable, element?: dxElement, model?: any, event?: event, itemData?: any, itemElement?: dxElement, fromIndex?: number, toIndex?: number, fromComponent?: dxSortable | dxDraggable, toComponent?: dxSortable | dxDraggable, fromData?: any, toData?: any }) => any);
    /**
     * A function that is called when the draggable items are reordered.
     */
    onReorder?: ((e: { component?: dxSortable, element?: dxElement, model?: any, event?: event, itemData?: any, itemElement?: dxElement, fromIndex?: number, toIndex?: number, fromComponent?: dxSortable | dxDraggable, toComponent?: dxSortable | dxDraggable, fromData?: any, toData?: any, dropInsideItem?: boolean, promise?: Promise<void> | JQueryPromise<void> }) => any);
}
/**
 * Sortable is a user interface utility that allows a UI component's items to be reordered via drag and drop gestures.
 */
export default class dxSortable extends DOMComponent implements DraggableBase {
    constructor(element: Element, options?: dxSortableOptions)
    constructor(element: JQuery, options?: dxSortableOptions)
    /**
     * Updates Sortable's dimensions. Call this method after items are added or their dimensions are changed during dragging.
     */
    update(): void;
}

declare global {
interface JQuery {
    dxSortable(): JQuery;
    dxSortable(options: "instance"): dxSortable;
    dxSortable(options: string): any;
    dxSortable(options: string, ...params: any[]): any;
    dxSortable(options: dxSortableOptions): JQuery;
}
}
/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export type Options = dxSortableOptions;

/** @deprecated use Options instead */
/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export type IOptions = dxSortableOptions;
