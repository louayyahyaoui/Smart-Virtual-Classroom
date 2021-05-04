/**
* DevExtreme (ui/nav_bar.d.ts)
* Version: 20.2.6
* Build date: Tue Mar 16 2021
*
* Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import dxTabs, {
    dxTabsItem,
    dxTabsOptions
} from './tabs';

/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export interface dxNavBarOptions extends dxTabsOptions<dxNavBar> {
    /**
     * Specifies whether or not an end-user can scroll tabs by swiping.
     */
    scrollByContent?: boolean;
}
/**
 * The NavBar is a UI component that navigates the application views.
 */
export default class dxNavBar extends dxTabs {
    constructor(element: Element, options?: dxNavBarOptions)
    constructor(element: JQuery, options?: dxNavBarOptions)
}

/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export interface dxNavBarItem extends dxTabsItem {
    /**
     * Specifies a badge text for the navbar item.
     */
    badge?: string;
}

declare global {
interface JQuery {
    dxNavBar(): JQuery;
    dxNavBar(options: "instance"): dxNavBar;
    dxNavBar(options: string): any;
    dxNavBar(options: string, ...params: any[]): any;
    dxNavBar(options: dxNavBarOptions): JQuery;
}
}
/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export type Options = dxNavBarOptions;

/** @deprecated use Options instead */
/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export type IOptions = dxNavBarOptions;