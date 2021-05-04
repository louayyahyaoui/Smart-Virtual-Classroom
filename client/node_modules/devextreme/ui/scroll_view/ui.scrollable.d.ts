/**
* DevExtreme (ui/scroll_view/ui.scrollable.d.ts)
* Version: 20.2.6
* Build date: Tue Mar 16 2021
*
* Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import '../../jquery_augmentation';

import DOMComponent, {
    DOMComponentOptions
} from '../../core/dom_component';

import {
    dxElement
} from '../../core/element';

import {
    event
} from '../../events/index';

/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export interface dxScrollableOptions<T = dxScrollable> extends DOMComponentOptions<T> {
    /**
     * A Boolean value specifying whether to enable or disable the bounce-back effect.
     */
    bounceEnabled?: boolean;
    /**
     * A string value specifying the available scrolling directions.
     */
    direction?: 'both' | 'horizontal' | 'vertical';
    /**
     * Specifies whether the UI component responds to user interaction.
     */
    disabled?: boolean;
    /**
     * A function that is executed on each scroll gesture.
     */
    onScroll?: ((e: { component?: T, element?: dxElement, model?: any, event?: event, scrollOffset?: any, reachedLeft?: boolean, reachedRight?: boolean, reachedTop?: boolean, reachedBottom?: boolean }) => any);
    /**
     * A function that is executed each time the UI component is updated.
     */
    onUpdated?: ((e: { component?: T, element?: dxElement, model?: any, event?: event, scrollOffset?: any, reachedLeft?: boolean, reachedRight?: boolean, reachedTop?: boolean, reachedBottom?: boolean }) => any);
    /**
     * A Boolean value specifying whether or not an end-user can scroll the UI component content swiping it up or down. Applies only if useNative is false
     */
    scrollByContent?: boolean;
    /**
     * A Boolean value specifying whether or not an end-user can scroll the UI component content using the scrollbar.
     */
    scrollByThumb?: boolean;
    /**
     * Specifies when the UI component shows the scrollbar.
     */
    showScrollbar?: 'onScroll' | 'onHover' | 'always' | 'never';
    /**
     * Indicates whether to use native or simulated scrolling.
     */
    useNative?: boolean;
}
/**
 * A UI component used to display scrollable content.
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export default class dxScrollable extends DOMComponent {
    constructor(element: Element, options?: dxScrollableOptions)
    constructor(element: JQuery, options?: dxScrollableOptions)
    /**
     * Gets the UI component's height.
     */
    clientHeight(): number;
    /**
     * Gets the UI component's width.
     */
    clientWidth(): number;
    /**
     * Gets the UI component's content.
     */
    content(): dxElement;
    /**
     * Scrolls the content by a specific distance.
     */
    scrollBy(distance: number): void;
    /**
     * Scrolls the content by a specific distance in horizontal and vertical directions.
     */
    scrollBy(distanceObject: any): void;
    /**
     * Gets the scrollable content's height in pixels.
     */
    scrollHeight(): number;
    /**
     * Gets the left scroll offset.
     */
    scrollLeft(): number;
    /**
     * Gets the scroll offset.
     */
    scrollOffset(): any;
    /**
     * Scrolls the content to a specific position.
     */
    scrollTo(targetLocation: number): void;
    /**
     * Scrolls the content to a specific position.
     */
    scrollTo(targetLocation: any): void;
    /**
     * Scrolls the content to an element.
     */
    scrollToElement(element: Element | JQuery): void;
    /**
     * Gets the top scroll offset.
     */
    scrollTop(): number;
    /**
     * Gets the scrollable content's width in pixels.
     */
    scrollWidth(): number;
    /**
     * Updates the scrollable contents' dimensions.
     */
    update(): Promise<void> & JQueryPromise<void>;
}
