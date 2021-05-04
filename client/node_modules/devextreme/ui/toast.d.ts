/**
* DevExtreme (ui/toast.d.ts)
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

import {
    event
} from '../events/index';

import dxOverlay, {
    dxOverlayAnimation,
    dxOverlayOptions
} from './overlay';

/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export interface dxToastOptions extends dxOverlayOptions<dxToast> {
    /**
     * Configures UI component visibility animations. This object contains two fields: show and hide.
     */
    animation?: dxToastAnimation;
    /**
     * A Boolean value specifying whether or not the toast is closed if a user clicks it.
     */
    closeOnClick?: boolean;
    /**
     * Specifies whether to close the UI component if a user clicks outside it.
     */
    closeOnOutsideClick?: boolean | ((event: event) => boolean);
    /**
     * A Boolean value specifying whether or not the toast is closed if a user swipes it out of the screen boundaries.
     */
    closeOnSwipe?: boolean;
    /**
     * The time span in milliseconds during which the Toast UI component is visible.
     */
    displayTime?: number;
    /**
     * Specifies the UI component's height in pixels.
     */
    height?: number | string | (() => number | string);
    /**
     * Specifies the maximum width the UI component can reach while resizing.
     */
    maxWidth?: number | string | (() => number | string);
    /**
     * The Toast message text.
     */
    message?: string;
    /**
     * Specifies the minimum width the UI component can reach while resizing.
     */
    minWidth?: number | string | (() => number | string);
    /**
     * Positions the UI component.
     */
    position?: positionConfig | string;
    /**
     * Specifies whether to shade the background when the UI component is active.
     */
    shading?: boolean;
    /**
     * Specifies the Toast UI component type.
     */
    type?: 'custom' | 'error' | 'info' | 'success' | 'warning';
    /**
     * Specifies the UI component's width in pixels.
     */
    width?: number | string | (() => number | string);
}
/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export interface dxToastAnimation extends dxOverlayAnimation {
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
 * The Toast is a UI component that provides pop-up notifications.
 */
export default class dxToast extends dxOverlay {
    constructor(element: Element, options?: dxToastOptions)
    constructor(element: JQuery, options?: dxToastOptions)
}

declare global {
interface JQuery {
    dxToast(): JQuery;
    dxToast(options: "instance"): dxToast;
    dxToast(options: string): any;
    dxToast(options: string, ...params: any[]): any;
    dxToast(options: dxToastOptions): JQuery;
}
}
/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export type Options = dxToastOptions;

/** @deprecated use Options instead */
/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export type IOptions = dxToastOptions;