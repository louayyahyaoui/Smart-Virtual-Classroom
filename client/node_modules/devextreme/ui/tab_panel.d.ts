/**
* DevExtreme (ui/tab_panel.d.ts)
* Version: 20.2.6
* Build date: Tue Mar 16 2021
*
* Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import {
    dxElement
} from '../core/element';

import {
    template
} from '../core/templates/template';

import DataSource, {
    DataSourceOptions
} from '../data/data_source';

import {
    event
} from '../events/index';

import dxMultiView, {
    dxMultiViewItem,
    dxMultiViewOptions
} from './multi_view';

/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export interface dxTabPanelOptions extends dxMultiViewOptions<dxTabPanel> {
    /**
     * Specifies whether or not to animate the displayed item change.
     */
    animationEnabled?: boolean;
    /**
     * Binds the UI component to data.
     */
    dataSource?: string | Array<string | dxTabPanelItem | any> | DataSource | DataSourceOptions;
    /**
     * Specifies whether the UI component changes its state when a user pauses on it.
     */
    hoverStateEnabled?: boolean;
    /**
     * Specifies a custom template for item titles.
     */
    itemTitleTemplate?: template | ((itemData: any, itemIndex: number, itemElement: dxElement) => string | Element | JQuery);
    /**
     * An array of items displayed by the UI component.
     */
    items?: Array<string | dxTabPanelItem | any>;
    /**
     * A function that is executed when a tab is clicked or tapped.
     */
    onTitleClick?: ((e: { component?: dxTabPanel, element?: dxElement, model?: any, itemData?: any, itemElement?: dxElement, event?: event }) => any) | string;
    /**
     * A function that is executed when a tab has been held for a specified period.
     */
    onTitleHold?: ((e: { component?: dxTabPanel, element?: dxElement, model?: any, itemData?: any, itemElement?: dxElement, event?: event }) => any);
    /**
     * A function that is executed after a tab is rendered.
     */
    onTitleRendered?: ((e: { component?: dxTabPanel, element?: dxElement, model?: any, itemData?: any, itemElement?: dxElement }) => any);
    /**
     * Specifies whether to repaint only those elements whose data changed.
     */
    repaintChangesOnly?: boolean;
    /**
     * A Boolean value specifying if tabs in the title are scrolled by content.
     */
    scrollByContent?: boolean;
    /**
     * A Boolean indicating whether or not to add scrolling support for tabs in the title.
     */
    scrollingEnabled?: boolean;
    /**
     * Specifies whether navigation buttons should be available when tabs exceed the UI component's width.
     */
    showNavButtons?: boolean;
    /**
     * A Boolean value specifying whether or not to allow users to change the selected index by swiping.
     */
    swipeEnabled?: boolean;
}
/**
 * The TabPanel is a UI component consisting of the Tabs and MultiView UI components. It automatically synchronizes the selected tab with the currently displayed view and vice versa.
 */
export default class dxTabPanel extends dxMultiView {
    constructor(element: Element, options?: dxTabPanelOptions)
    constructor(element: JQuery, options?: dxTabPanelOptions)
}

/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export interface dxTabPanelItem extends dxMultiViewItem {
    /**
     * Specifies a badge text for the tab.
     */
    badge?: string;
    /**
     * Specifies the icon to be displayed in the tab's title.
     */
    icon?: string;
    /**
     * Specifies a template that should be used to render the tab for this item only.
     */
    tabTemplate?: template | (() => string | Element | JQuery);
    /**
     * Specifies the item title text displayed on a corresponding tab.
     */
    title?: string;
}

declare global {
interface JQuery {
    dxTabPanel(): JQuery;
    dxTabPanel(options: "instance"): dxTabPanel;
    dxTabPanel(options: string): any;
    dxTabPanel(options: string, ...params: any[]): any;
    dxTabPanel(options: dxTabPanelOptions): JQuery;
}
}
/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export type Options = dxTabPanelOptions;

/** @deprecated use Options instead */
/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export type IOptions = dxTabPanelOptions;