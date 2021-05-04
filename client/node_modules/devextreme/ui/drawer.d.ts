/**
* DevExtreme (ui/drawer.d.ts)
* Version: 20.2.6
* Build date: Tue Mar 16 2021
*
* Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
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
export interface dxDrawerOptions extends WidgetOptions<dxDrawer> {
    /**
     * Specifies the duration of the drawer's opening and closing animation (in milliseconds). Applies only if animationEnabled is true.
     */
    animationDuration?: number;
    /**
     * Specifies whether to use an opening and closing animation.
     */
    animationEnabled?: boolean;
    /**
     * Specifies whether to close the drawer if a user clicks or taps the view area.
     */
    closeOnOutsideClick?: boolean | ((event: event) => boolean);
    /**
     * Specifies the drawer's width or height (depending on the drawer's position) in the opened state.
     */
    maxSize?: number;
    /**
     * Specifies the drawer's width or height (depending on the drawer's position) in the closed state.
     */
    minSize?: number;
    /**
     * Specifies whether the drawer is opened.
     */
    opened?: boolean;
    /**
     * Specifies how the drawer interacts with the view in the opened state.
     */
    openedStateMode?: 'overlap' | 'shrink' | 'push';
    /**
     * Specifies the drawer's position in relation to the view.
     */
    position?: 'left' | 'right' | 'top' | 'bottom' | 'before' | 'after';
    /**
     * Specifies the drawer's reveal mode.
     */
    revealMode?: 'slide' | 'expand';
    /**
     * Specifies whether to shade the view when the drawer is opened.
     */
    shading?: boolean;
    /**
     * Specifies a CSS selector for the element in which the drawer should be rendered. Applies only when the openedStateMode is 'overlap'.
     * @deprecated 
     */
    target?: string | Element | JQuery;
    /**
     * Specifies the drawer's content.
     */
    template?: template | ((Element: dxElement) => any);
}
/**
 * The Drawer is a dismissible or permanently visible panel used for navigation in responsive web application layouts.
 */
export default class dxDrawer extends Widget {
    constructor(element: Element, options?: dxDrawerOptions)
    constructor(element: JQuery, options?: dxDrawerOptions)
    /**
     * Gets the drawer's content.
     */
    content(): dxElement;
    /**
     * Closes the drawer.
     */
    hide(): Promise<void> & JQueryPromise<void>;
    /**
     * Opens the drawer.
     */
    show(): Promise<void> & JQueryPromise<void>;
    /**
     * Opens or closes the drawer, reversing the current state.
     */
    toggle(): Promise<void> & JQueryPromise<void>;
}

declare global {
interface JQuery {
    dxDrawer(): JQuery;
    dxDrawer(options: "instance"): dxDrawer;
    dxDrawer(options: string): any;
    dxDrawer(options: string, ...params: any[]): any;
    dxDrawer(options: dxDrawerOptions): JQuery;
}
}
/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export type Options = dxDrawerOptions;

/** @deprecated use Options instead */
/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export type IOptions = dxDrawerOptions;