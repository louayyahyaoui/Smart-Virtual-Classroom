/**
* DevExtreme (ui/widget/ui.widget.d.ts)
* Version: 20.2.6
* Build date: Tue Mar 16 2021
*
* Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import DOMComponent, {
    DOMComponentOptions
} from '../../core/dom_component';

import {
    dxElement
} from '../../core/element';

/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export interface WidgetOptions<T = Widget> extends DOMComponentOptions<T> {
    /**
     * Specifies the shortcut key that sets focus on the UI component.
     */
    accessKey?: string;
    /**
     * Specifies whether or not the UI component changes its state when interacting with a user.
     */
    activeStateEnabled?: boolean;
    /**
     * Specifies whether the UI component responds to user interaction.
     */
    disabled?: boolean;
    /**
     * Specifies whether the UI component can be focused using keyboard navigation.
     */
    focusStateEnabled?: boolean;
    /**
     * Specifies text for a hint that appears when a user pauses on the UI component.
     */
    hint?: string;
    /**
     * Specifies whether the UI component changes its state when a user pauses on it.
     */
    hoverStateEnabled?: boolean;
    /**
     * A function that is executed when the UI component's content is ready and each time the content is changed.
     */
    onContentReady?: ((e: { component?: T, element?: dxElement, model?: any }) => any);
    /**
     * Specifies the number of the element when the Tab key is used for navigating.
     */
    tabIndex?: number;
    /**
     * Specifies whether the UI component is visible.
     */
    visible?: boolean;
}
/**
 * The base class for UI components.
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export default class Widget extends DOMComponent {
    constructor(element: Element, options?: WidgetOptions)
    constructor(element: JQuery, options?: WidgetOptions)
    /**
     * Sets focus on the UI component.
     */
    focus(): void;
    /**
     * Registers a handler to be executed when a user presses a specific key.
     */
    registerKeyHandler(key: string, handler: Function): void;
    /**
     * Repaints the UI component without reloading data. Call it to update the UI component's markup.
     */
    repaint(): void;
}

/**
 * Specifies markup for a UI component item.
 */
export var dxItem: any;

/**
 * Formats values.
 */
export type format = 'billions' | 'currency' | 'day' | 'decimal' | 'exponential' | 'fixedPoint' | 'largeNumber' | 'longDate' | 'longTime' | 'millions' | 'millisecond' | 'month' | 'monthAndDay' | 'monthAndYear' | 'percent' | 'quarter' | 'quarterAndYear' | 'shortDate' | 'shortTime' | 'thousands' | 'trillions' | 'year' | 'dayOfWeek' | 'hour' | 'longDateLongTime' | 'minute' | 'second' | 'shortDateShortTime' | string | ((value: number | Date) => string) | { currency?: string, formatter?: ((value: number | Date) => string), parser?: ((value: string) => number | Date), precision?: number, type?: 'billions' | 'currency' | 'day' | 'decimal' | 'exponential' | 'fixedPoint' | 'largeNumber' | 'longDate' | 'longTime' | 'millions' | 'millisecond' | 'month' | 'monthAndDay' | 'monthAndYear' | 'percent' | 'quarter' | 'quarterAndYear' | 'shortDate' | 'shortTime' | 'thousands' | 'trillions' | 'year' | 'dayOfWeek' | 'hour' | 'longDateLongTime' | 'minute' | 'second' | 'shortDateShortTime' };
