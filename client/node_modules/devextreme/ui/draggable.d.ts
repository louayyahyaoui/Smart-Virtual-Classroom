/**
* DevExtreme (ui/draggable.d.ts)
* Version: 20.2.6
* Build date: Tue Mar 16 2021
*
* Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import DOMComponent, {
    DOMComponentOptions
} from '../core/dom_component';

import {
    dxElement
} from '../core/element';

import {
    template
} from '../core/templates/template';

import {
    event
} from '../events/index';

import dxSortable from './sortable';

/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export interface DraggableBaseOptions<T = DraggableBase & DOMComponent> extends DOMComponentOptions<T> {
    /**
     * Enables automatic scrolling while dragging an item beyond the viewport.
     */
    autoScroll?: boolean;
    /**
     * Specifies a DOM element that limits the dragging area.
     */
    boundary?: string | Element | JQuery;
    /**
     * Specifies a custom container in which the draggable item should be rendered.
     */
    container?: string | Element | JQuery;
    /**
     * Specifies the cursor offset from the dragged item.
     */
    cursorOffset?: string | { x?: number, y?: number };
    /**
     * A container for custom data.
     */
    data?: any;
    /**
     * Specifies the directions in which an item can be dragged.
     */
    dragDirection?: 'both' | 'horizontal' | 'vertical';
    /**
     * Allows you to group several UI components, so that users can drag and drop items between them.
     */
    group?: string;
    /**
     * Specifies a CSS selector (ID or class) that should act as the drag handle(s) for the item(s).
     */
    handle?: string;
    /**
     * Specifies the distance in pixels from the edge of viewport at which scrolling should start. Applies only if autoScroll is true.
     */
    scrollSensitivity?: number;
    /**
     * Specifies the scrolling speed when dragging an item beyond the viewport. Applies only if autoScroll is true.
     */
    scrollSpeed?: number;
}
/**
 * 
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export interface DraggableBase { }

/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export interface dxDraggableOptions extends DraggableBaseOptions<dxDraggable> {
    /**
     * Allows a user to drag clones of items instead of actual items.
     */
    clone?: boolean;
    /**
     * Specifies custom markup to be shown instead of the item being dragged.
     */
    dragTemplate?: template | ((dragInfo: { itemData?: any, itemElement?: dxElement }, containerElement: dxElement) => string | Element | JQuery);
    /**
     * A function that is called when drag gesture is finished.
     */
    onDragEnd?: ((e: { component?: dxDraggable, element?: dxElement, model?: any, event?: event, cancel?: boolean, itemData?: any, itemElement?: dxElement, fromComponent?: dxSortable | dxDraggable, toComponent?: dxSortable | dxDraggable, fromData?: any, toData?: any }) => any);
    /**
     * A function that is called every time a draggable item is moved.
     */
    onDragMove?: ((e: { component?: dxDraggable, element?: dxElement, model?: any, event?: event, cancel?: boolean, itemData?: any, itemElement?: dxElement, fromComponent?: dxSortable | dxDraggable, toComponent?: dxSortable | dxDraggable, fromData?: any, toData?: any }) => any);
    /**
     * A function that is called when the drag gesture is initialized.
     */
    onDragStart?: ((e: { component?: dxDraggable, element?: dxElement, model?: any, event?: event, cancel?: boolean, itemData?: any, itemElement?: dxElement, fromData?: any }) => any);
}
/**
 * Draggable is a user interface utility that allows UI component elements to be dragged and dropped.
 */
export default class dxDraggable extends DOMComponent implements DraggableBase {
    constructor(element: Element, options?: dxDraggableOptions)
    constructor(element: JQuery, options?: dxDraggableOptions)
}

declare global {
interface JQuery {
    dxDraggable(): JQuery;
    dxDraggable(options: "instance"): dxDraggable;
    dxDraggable(options: string): any;
    dxDraggable(options: string, ...params: any[]): any;
    dxDraggable(options: dxDraggableOptions): JQuery;
}
}
/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export type Options = dxDraggableOptions;

/** @deprecated use Options instead */
/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export type IOptions = dxDraggableOptions;