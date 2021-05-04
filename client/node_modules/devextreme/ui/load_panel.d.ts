/**
* DevExtreme (ui/load_panel.d.ts)
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

import dxOverlay, {
    dxOverlayAnimation,
    dxOverlayOptions
} from './overlay';

/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export interface dxLoadPanelOptions extends dxOverlayOptions<dxLoadPanel> {
    /**
     * Configures UI component visibility animations. This object contains two fields: show and hide.
     */
    animation?: dxLoadPanelAnimation;
    /**
     * Specifies the UI component's container.
     */
    container?: string | Element | JQuery;
    /**
     * The delay in milliseconds after which the load panel is displayed.
     */
    delay?: number;
    /**
     * Specifies whether or not the UI component can be focused.
     */
    focusStateEnabled?: boolean;
    /**
     * Specifies the UI component's height in pixels.
     */
    height?: number | string | (() => number | string);
    /**
     * A URL pointing to an image to be used as a load indicator.
     */
    indicatorSrc?: string;
    /**
     * Specifies the maximum height the UI component can reach while resizing.
     */
    maxHeight?: number | string | (() => number | string);
    /**
     * Specifies the maximum width the UI component can reach while resizing.
     */
    maxWidth?: number | string | (() => number | string);
    /**
     * Specifies the text displayed in the load panel. Ignored in the Material Design theme.
     */
    message?: string;
    /**
     * Positions the UI component.
     */
    position?: 'bottom' | 'center' | 'left' | 'left bottom' | 'left top' | 'right' | 'right bottom' | 'right top' | 'top' | positionConfig | Function;
    /**
     * Specifies the shading color. Applies only if shading is enabled.
     */
    shadingColor?: string;
    /**
     * A Boolean value specifying whether or not to show a load indicator.
     */
    showIndicator?: boolean;
    /**
     * A Boolean value specifying whether or not to show the pane behind the load indicator.
     */
    showPane?: boolean;
    /**
     * Specifies the UI component's width in pixels.
     */
    width?: number | string | (() => number | string);
}
/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export interface dxLoadPanelAnimation extends dxOverlayAnimation {
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
 * The LoadPanel is an overlay UI component notifying the viewer that loading is in progress.
 */
export default class dxLoadPanel extends dxOverlay {
    constructor(element: Element, options?: dxLoadPanelOptions)
    constructor(element: JQuery, options?: dxLoadPanelOptions)
}

declare global {
interface JQuery {
    dxLoadPanel(): JQuery;
    dxLoadPanel(options: "instance"): dxLoadPanel;
    dxLoadPanel(options: string): any;
    dxLoadPanel(options: string, ...params: any[]): any;
    dxLoadPanel(options: dxLoadPanelOptions): JQuery;
}
}
/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export type Options = dxLoadPanelOptions;

/** @deprecated use Options instead */
/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export type IOptions = dxLoadPanelOptions;