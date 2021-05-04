/**
* DevExtreme (ui/popover.d.ts)
* Version: 20.2.6
* Build date: Tue Mar 16 2021
*
* Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import {
    animationConfig
} from '../animation/fx';

import {
    positionConfig
} from '../animation/position';

import '../jquery_augmentation';

import {
    event
} from '../events/index';

import dxPopup, {
    dxPopupAnimation,
    dxPopupOptions
} from './popup';

/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export interface dxPopoverOptions<T = dxPopover> extends dxPopupOptions<T> {
    /**
     * Configures UI component visibility animations. This object contains two fields: show and hide.
     */
    animation?: dxPopoverAnimation;
    /**
     * A Boolean value specifying whether or not the UI component is closed if a user clicks outside of the popover window and outside the target element.
     */
    closeOnOutsideClick?: boolean | ((event: event) => boolean);
    /**
     * Specifies the UI component's height.
     */
    height?: number | string | (() => number | string);
    /**
     * Specifies properties of popover hiding.
     */
    hideEvent?: { delay?: number, name?: string } | string;
    /**
     * An object defining UI component positioning properties.
     */
    position?: 'bottom' | 'left' | 'right' | 'top' | positionConfig;
    /**
     * Specifies whether to shade the background when the UI component is active.
     */
    shading?: boolean;
    /**
     * Specifies properties for displaying the UI component.
     */
    showEvent?: { delay?: number, name?: string } | string;
    /**
     * A Boolean value specifying whether or not to display the title in the overlay window.
     */
    showTitle?: boolean;
    /**
     * The target element associated with the widget.
     */
    target?: string | Element | JQuery;
    /**
     * Specifies the UI component's width.
     */
    width?: number | string | (() => number | string);
}
/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export interface dxPopoverAnimation extends dxPopupAnimation {
    /**
     * An object that defines the animation properties used when the UI component is being hidden.
     */
    hide?: animationConfig;
    /**
     * An object that defines the animation properties used when the UI component is being shown.
     */
    show?: animationConfig;
}
/**
 * The Popover is a UI component that shows notifications within a box with an arrow pointing to a specified UI element.
 */
export default class dxPopover extends dxPopup {
    constructor(element: Element, options?: dxPopoverOptions)
    constructor(element: JQuery, options?: dxPopoverOptions)
    show(): Promise<boolean> & JQueryPromise<boolean>;
    /**
     * Shows the UI component for a target element.
     */
    show(target: string | Element | JQuery): Promise<boolean> & JQueryPromise<boolean>;
}

declare global {
interface JQuery {
    dxPopover(): JQuery;
    dxPopover(options: "instance"): dxPopover;
    dxPopover(options: string): any;
    dxPopover(options: string, ...params: any[]): any;
    dxPopover(options: dxPopoverOptions): JQuery;
}
}
/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export type Options = dxPopoverOptions;

/** @deprecated use Options instead */
/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export type IOptions = dxPopoverOptions;