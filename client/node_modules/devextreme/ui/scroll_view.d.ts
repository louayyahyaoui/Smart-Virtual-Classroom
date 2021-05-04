/**
* DevExtreme (ui/scroll_view.d.ts)
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

import dxScrollable, {
    dxScrollableOptions
} from './scroll_view/ui.scrollable';

/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export interface dxScrollViewOptions extends dxScrollableOptions<dxScrollView> {
    /**
     * A function that is executed when the 'pull to refresh' gesture is performed. Supported in mobile themes only.
     */
    onPullDown?: ((e: { component?: dxScrollView, element?: dxElement, model?: any }) => any);
    /**
     * A function that is executed when the content is scrolled down to the bottom.
     */
    onReachBottom?: ((e: { component?: dxScrollView, element?: dxElement, model?: any }) => any);
    /**
     * Specifies the text shown in the pullDown panel when pulling the content down lowers the refresh threshold.
     */
    pulledDownText?: string;
    /**
     * Specifies the text shown in the pullDown panel while pulling the content down to the refresh threshold.
     */
    pullingDownText?: string;
    /**
     * Specifies the text shown in the pullDown panel displayed when content is scrolled to the bottom.
     */
    reachBottomText?: string;
    /**
     * Specifies the text shown in the pullDown panel displayed when the content is being refreshed.
     */
    refreshingText?: string;
}
/**
 * The ScrollView is a UI component that enables a user to scroll its content.
 */
export default class dxScrollView extends dxScrollable {
    constructor(element: Element, options?: dxScrollViewOptions)
    constructor(element: JQuery, options?: dxScrollViewOptions)
    /**
     * Locks the UI component until the release(preventScrollBottom) method is called and executes the function passed to the onPullDown property and the handler assigned to the pullDown event.
     */
    refresh(): void;
    /**
     * Notifies the ScrollView that data loading is finished.
     */
    release(preventScrollBottom: boolean): Promise<void> & JQueryPromise<void>;
}

declare global {
interface JQuery {
    dxScrollView(): JQuery;
    dxScrollView(options: "instance"): dxScrollView;
    dxScrollView(options: string): any;
    dxScrollView(options: string, ...params: any[]): any;
    dxScrollView(options: dxScrollViewOptions): JQuery;
}
}
/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export type Options = dxScrollViewOptions;

/** @deprecated use Options instead */
/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export type IOptions = dxScrollViewOptions;