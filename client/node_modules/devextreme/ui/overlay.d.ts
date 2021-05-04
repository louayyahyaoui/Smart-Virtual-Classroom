/**
* DevExtreme (ui/overlay.d.ts)
* Version: 20.2.6
* Build date: Tue Mar 16 2021
*
* Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import {
    animationConfig
} from '../animation/fx';

import '../jquery_augmentation';

import {
    dxElement
} from '../core/element';

import {
    template
} from '../core/templates/template';

import {
    event
} from '../events/index';

import Widget, {
    WidgetOptions
} from './widget/ui.widget';

/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export interface dxOverlayOptions<T = dxOverlay> extends WidgetOptions<T> {
    /**
     * Configures UI component visibility animations. This object contains two fields: show and hide.
     */
    animation?: dxOverlayAnimation;
    /**
     * Specifies whether to close the UI component if a user clicks outside it.
     */
    closeOnOutsideClick?: boolean | ((event: event) => boolean);
    /**
     * Specifies a custom template for the UI component content.
     */
    contentTemplate?: template | ((contentElement: dxElement) => string | Element | JQuery);
    /**
     * Specifies whether to render the UI component's content when it is displayed. If false, the content is rendered immediately.
     */
    deferRendering?: boolean;
    /**
     * Specifies whether or not an end-user can drag the UI component.
     */
    dragEnabled?: boolean;
    /**
     * Specifies the UI component's height in pixels.
     */
    height?: number | string | (() => number | string);
    /**
     * Specifies the maximum height the UI component can reach while resizing.
     */
    maxHeight?: number | string | (() => number | string);
    /**
     * Specifies the maximum width the UI component can reach while resizing.
     */
    maxWidth?: number | string | (() => number | string);
    /**
     * Specifies the minimum height the UI component can reach while resizing.
     */
    minHeight?: number | string | (() => number | string);
    /**
     * Specifies the minimum width the UI component can reach while resizing.
     */
    minWidth?: number | string | (() => number | string);
    /**
     * A function that is executed after the UI component is hidden.
     */
    onHidden?: ((e: { component?: T, element?: dxElement, model?: any }) => any);
    /**
     * A function that is executed before the UI component is hidden.
     */
    onHiding?: ((e: { component?: T, element?: dxElement, model?: any, cancel?: boolean }) => any);
    /**
     * A function that is executed before the UI component is displayed.
     */
    onShowing?: ((e: { component?: T, element?: dxElement, model?: any }) => any);
    /**
     * A function that is executed after the UI component is displayed.
     */
    onShown?: ((e: { component?: T, element?: dxElement, model?: any }) => any);
    /**
     * Positions the UI component.
     */
    position?: any;
    /**
     * Specifies whether to shade the background when the UI component is active.
     */
    shading?: boolean;
    /**
     * Specifies the shading color. Applies only if shading is enabled.
     */
    shadingColor?: string;
    /**
     * A Boolean value specifying whether or not the UI component is visible.
     */
    visible?: boolean;
    /**
     * Specifies the UI component's width in pixels.
     */
    width?: number | string | (() => number | string);
}
/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export interface dxOverlayAnimation {
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
 * The Overlay UI component represents a window overlaying the current view. It displays data located within the HTML element representing the UI component.
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export default class dxOverlay extends Widget {
    constructor(element: Element, options?: dxOverlayOptions)
    constructor(element: JQuery, options?: dxOverlayOptions)
    /**
     * Gets the UI component's content.
     */
    content(): dxElement;
    /**
     * Hides the UI component.
     */
    hide(): Promise<boolean> & JQueryPromise<boolean>;
    /**
     * Recalculates the UI component's size and position without rerendering.
     */
    repaint(): void;
    /**
     * Shows the UI component.
     */
    show(): Promise<boolean> & JQueryPromise<boolean>;
    /**
     * Shows or hides the UI component depending on the argument.
     */
    toggle(showing: boolean): Promise<boolean> & JQueryPromise<boolean>;
}

/**
 * Specifies the base z-index for all overlay UI components.
 */
export function baseZIndex(zIndex: number): void;

/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export type Options = dxOverlayOptions;

/** @deprecated use Options instead */
/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export type IOptions = dxOverlayOptions;