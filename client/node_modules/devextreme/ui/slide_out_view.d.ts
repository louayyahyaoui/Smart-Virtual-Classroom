/**
* DevExtreme (ui/slide_out_view.d.ts)
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

import Widget, {
    WidgetOptions
} from './widget/ui.widget';

/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export interface dxSlideOutViewOptions extends WidgetOptions<dxSlideOutView> {
    /**
     * Specifies a custom template for the UI component content.
     */
    contentTemplate?: template | ((contentElement: dxElement) => any);
    /**
     * Specifies the current menu position.
     */
    menuPosition?: 'inverted' | 'normal';
    /**
     * Specifies a custom template for the menu content.
     */
    menuTemplate?: template | ((menuElement: dxElement) => any);
    /**
     * Specifies whether or not the menu panel is visible.
     */
    menuVisible?: boolean;
    /**
     * Specifies whether or not the menu is shown when a user swipes the UI component content.
     */
    swipeEnabled?: boolean;
}
/**
 * The SlideOutView UI component is a classic slide-out menu paired with a view. This UI component is very similar to the SlideOut with only one difference - the SlideOut always contains the List in the slide-out menu, while the SlideOutView can hold any collection there.
 */
export default class dxSlideOutView extends Widget {
    constructor(element: Element, options?: dxSlideOutViewOptions)
    constructor(element: JQuery, options?: dxSlideOutViewOptions)
    /**
     * Gets the UI component's content.
     */
    content(): dxElement;
    /**
     * Hides the UI component's slide-out menu.
     */
    hideMenu(): Promise<void> & JQueryPromise<void>;
    /**
     * Gets the slide-out menu's content.
     */
    menuContent(): dxElement;
    /**
     * Shows the slide-out menu.
     */
    showMenu(): Promise<void> & JQueryPromise<void>;
    /**
     * Shows or hides the slide-out menu depending on the argument.
     */
    toggleMenuVisibility(): Promise<void> & JQueryPromise<void>;
}

declare global {
interface JQuery {
    dxSlideOutView(): JQuery;
    dxSlideOutView(options: "instance"): dxSlideOutView;
    dxSlideOutView(options: string): any;
    dxSlideOutView(options: string, ...params: any[]): any;
    dxSlideOutView(options: dxSlideOutViewOptions): JQuery;
}
}
/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export type Options = dxSlideOutViewOptions;

/** @deprecated use Options instead */
/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export type IOptions = dxSlideOutViewOptions;