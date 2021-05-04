/**
* DevExtreme (ui/popup.d.ts)
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
    dxElement
} from '../core/element';

import {
    template
} from '../core/templates/template';

import dxOverlay, {
    dxOverlayAnimation,
    dxOverlayOptions
} from './overlay';

/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export interface dxPopupOptions<T = dxPopup> extends dxOverlayOptions<T> {
    /**
     * Configures UI component visibility animations. This object contains two fields: show and hide.
     */
    animation?: dxPopupAnimation;
    /**
     * Specifies the container in which to render the UI component.
     */
    container?: string | Element | JQuery;
    /**
     * Specifies whether or not to allow a user to drag the popup window.
     */
    dragEnabled?: boolean;
    /**
     * Specifies whether the UI component can be focused using keyboard navigation.
     */
    focusStateEnabled?: boolean;
    /**
     * Specifies whether to display the Popup in full-screen mode.
     */
    fullScreen?: boolean;
    /**
     * Specifies the UI component's height in pixels.
     */
    height?: number | string | (() => number | string);
    /**
     * A function that is executed each time the UI component is resized by one pixel.
     */
    onResize?: ((e: { component?: T, element?: dxElement, model?: any }) => any);
    /**
     * A function that is executed when resizing ends.
     */
    onResizeEnd?: ((e: { component?: T, element?: dxElement, model?: any }) => any);
    /**
     * A function that is executed when resizing starts.
     */
    onResizeStart?: ((e: { component?: T, element?: dxElement, model?: any }) => any);
    /**
     * A function that is executed when the UI component's title is rendered.
     */
    onTitleRendered?: ((e: { component?: T, element?: dxElement, model?: any, titleElement?: dxElement }) => any);
    /**
     * Positions the UI component.
     */
    position?: 'bottom' | 'center' | 'left' | 'left bottom' | 'left top' | 'right' | 'right bottom' | 'right top' | 'top' | positionConfig | Function;
    /**
     * Specifies whether or not an end user can resize the UI component.
     */
    resizeEnabled?: boolean;
    /**
     * Specifies whether or not the UI component displays the Close button.
     */
    showCloseButton?: boolean;
    /**
     * A Boolean value specifying whether or not to display the title in the popup window.
     */
    showTitle?: boolean;
    /**
     * The title in the overlay window.
     */
    title?: string;
    /**
     * Specifies a custom template for the UI component title. Does not apply if the title is defined.
     */
    titleTemplate?: template | ((titleElement: dxElement) => string | Element | JQuery);
    /**
     * Configures toolbar items.
     */
    toolbarItems?: Array<dxPopupToolbarItem>;
    /**
     * Specifies the UI component's width in pixels.
     */
    width?: number | string | (() => number | string);
}
/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export interface dxPopupAnimation extends dxOverlayAnimation {
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
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export interface dxPopupToolbarItem {
    /**
     * Specifies whether the toolbar item responds to user interaction.
     */
    disabled?: boolean;
    /**
     * Specifies html code inserted into the toolbar item element.
     */
    html?: string;
    /**
     * Specifies a location for the item on the toolbar.
     */
    location?: 'after' | 'before' | 'center';
    /**
     * Configures the DevExtreme UI component used as a toolbar item.
     */
    options?: any;
    /**
     * Specifies a template that should be used to render this item only.
     */
    template?: template;
    /**
     * Specifies text displayed for the toolbar item.
     */
    text?: string;
    /**
     * Specifies whether the item is displayed on a top or bottom toolbar.
     */
    toolbar?: 'bottom' | 'top';
    /**
     * Specifies whether or not a UI component item must be displayed.
     */
    visible?: boolean;
    /**
     * A UI component that presents a toolbar item.
     */
    widget?: 'dxAutocomplete' | 'dxButton' | 'dxCheckBox' | 'dxDateBox' | 'dxMenu' | 'dxSelectBox' | 'dxTabs' | 'dxTextBox' | 'dxButtonGroup' | 'dxDropDownButton';
}
/**
 * The Popup UI component is a pop-up window overlaying the current view.
 */
export default class dxPopup extends dxOverlay {
    constructor(element: Element, options?: dxPopupOptions)
    constructor(element: JQuery, options?: dxPopupOptions)
}

declare global {
interface JQuery {
    dxPopup(): JQuery;
    dxPopup(options: "instance"): dxPopup;
    dxPopup(options: string): any;
    dxPopup(options: string, ...params: any[]): any;
    dxPopup(options: dxPopupOptions): JQuery;
}
}
/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export type Options = dxPopupOptions;

/** @deprecated use Options instead */
/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export type IOptions = dxPopupOptions;
/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export type ToolbarItem = dxPopupToolbarItem;