/**
* DevExtreme (ui/resizable.d.ts)
* Version: 20.2.6
* Build date: Tue Mar 16 2021
*
* Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import '../jquery_augmentation';

import DOMComponent, {
    DOMComponentOptions
} from '../core/dom_component';

import {
    dxElement
} from '../core/element';

import {
    event
} from '../events/index';

/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export interface dxResizableOptions extends DOMComponentOptions<dxResizable> {
    /**
     * Specifies which borders of the UI component element are used as a handle.
     */
    handles?: 'bottom' | 'left' | 'right' | 'top' | 'all' | string;
    /**
     * Specifies the UI component's height.
     */
    height?: number | string | (() => number | string);
    /**
     * Specifies the upper height boundary for resizing.
     */
    maxHeight?: number;
    /**
     * Specifies the upper width boundary for resizing.
     */
    maxWidth?: number;
    /**
     * Specifies the lower height boundary for resizing.
     */
    minHeight?: number;
    /**
     * Specifies the lower width boundary for resizing.
     */
    minWidth?: number;
    /**
     * A function that is executed each time the UI component is resized by one pixel.
     */
    onResize?: ((e: { component?: dxResizable, element?: dxElement, model?: any, event?: event, width?: number, height?: number }) => any);
    /**
     * A function that is executed when resizing ends.
     */
    onResizeEnd?: ((e: { component?: dxResizable, element?: dxElement, model?: any, event?: event, width?: number, height?: number }) => any);
    /**
     * A function that is executed when resizing starts.
     */
    onResizeStart?: ((e: { component?: dxResizable, element?: dxElement, model?: any, event?: event, width?: number, height?: number }) => any);
    /**
     * Specifies the UI component's width.
     */
    width?: number | string | (() => number | string);
}
/**
 * The Resizable UI component enables its content to be resizable in the UI.
 */
export default class dxResizable extends DOMComponent {
    constructor(element: Element, options?: dxResizableOptions)
    constructor(element: JQuery, options?: dxResizableOptions)
}

declare global {
interface JQuery {
    dxResizable(): JQuery;
    dxResizable(options: "instance"): dxResizable;
    dxResizable(options: string): any;
    dxResizable(options: string, ...params: any[]): any;
    dxResizable(options: dxResizableOptions): JQuery;
}
}
/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export type Options = dxResizableOptions;

/** @deprecated use Options instead */
/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export type IOptions = dxResizableOptions;
