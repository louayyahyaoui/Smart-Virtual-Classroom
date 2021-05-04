/**
* DevExtreme (ui/accordion.d.ts)
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

import DataSource, {
    DataSourceOptions
} from '../data/data_source';

import {
    event
} from '../events/index';

import CollectionWidget, {
    CollectionWidgetItem,
    CollectionWidgetOptions
} from './collection/ui.collection_widget.base';

/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export interface dxAccordionOptions extends CollectionWidgetOptions<dxAccordion> {
    /**
     * A number specifying the time in milliseconds spent on the animation of the expanding or collapsing of a panel.
     */
    animationDuration?: number;
    /**
     * Specifies whether all items can be collapsed or whether at least one item must always be expanded.
     */
    collapsible?: boolean;
    /**
     * Binds the UI component to data.
     */
    dataSource?: string | Array<string | dxAccordionItem | any> | DataSource | DataSourceOptions;
    /**
     * Specifies whether to render the panel's content when it is displayed. If false, the content is rendered immediately.
     */
    deferRendering?: boolean;
    /**
     * Specifies whether the UI component can be focused using keyboard navigation.
     */
    focusStateEnabled?: boolean;
    /**
     * Specifies the UI component's height.
     */
    height?: number | string | (() => number | string);
    /**
     * Specifies whether the UI component changes its state when a user pauses on it.
     */
    hoverStateEnabled?: boolean;
    /**
     * Specifies a custom template for items.
     */
    itemTemplate?: template | ((itemData: any, itemIndex: number, itemElement: dxElement) => string | Element | JQuery);
    /**
     * Specifies a custom template for item titles.
     */
    itemTitleTemplate?: template | ((itemData: any, itemIndex: number, itemElement: dxElement) => string | Element | JQuery);
    /**
     * An array of items displayed by the UI component.
     */
    items?: Array<string | dxAccordionItem | any>;
    /**
     * Specifies whether the UI component can expand several items or only a single item at once.
     */
    multiple?: boolean;
    /**
     * A function that is executed when an accordion item's title is clicked or tapped.
     */
    onItemTitleClick?: ((e: { component?: dxAccordion, element?: dxElement, model?: any, itemData?: any, itemElement?: dxElement, itemIndex?: number, event?: event }) => any) | string;
    /**
     * Specifies whether to repaint only those elements whose data changed.
     */
    repaintChangesOnly?: boolean;
    /**
     * The index number of the currently selected item.
     */
    selectedIndex?: number;
}
/**
 * The Accordion UI component contains several panels displayed one under another. These panels can be collapsed or expanded by an end user, which makes this UI component very useful for presenting information in a limited amount of space.
 */
export default class dxAccordion extends CollectionWidget {
    constructor(element: Element, options?: dxAccordionOptions)
    constructor(element: JQuery, options?: dxAccordionOptions)
    /**
     * Collapses an item with a specific index.
     */
    collapseItem(index: number): Promise<void> & JQueryPromise<void>;
    /**
     * Expands an item with a specific index.
     */
    expandItem(index: number): Promise<void> & JQueryPromise<void>;
    /**
     * Updates the dimensions of the UI component contents.
     */
    updateDimensions(): Promise<void> & JQueryPromise<void>;
}

/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export interface dxAccordionItem extends CollectionWidgetItem {
    /**
     * Specifies the icon to be displayed in the panel's title.
     */
    icon?: string;
    /**
     * Specifies text displayed for the UI component item title.
     */
    title?: string;
}

declare global {
interface JQuery {
    dxAccordion(): JQuery;
    dxAccordion(options: "instance"): dxAccordion;
    dxAccordion(options: string): any;
    dxAccordion(options: string, ...params: any[]): any;
    dxAccordion(options: dxAccordionOptions): JQuery;
}
}
/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export type Options = dxAccordionOptions;

/** @deprecated use Options instead */
/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export type IOptions = dxAccordionOptions;