/**
* DevExtreme (viz/funnel.d.ts)
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
    PaletteType,
    PaletteExtensionModeType
} from './palette';

import {
    template
} from '../core/templates/template';

import DataSource, {
    DataSourceOptions
} from '../data/data_source';

import {
    event
} from '../events/index';

import {
    format
} from '../ui/widget/ui.widget';

import {
    BaseLegend,
    BaseLegendItem,
    DashStyleType,
    HatchingDirectionType
} from './common';

import BaseWidget, {
    BaseWidgetOptions,
    BaseWidgetTooltip,
    Font,
    WordWrapType,
    VizTextOverflowType
} from './core/base_widget';

/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export interface FunnelLegendItem extends BaseLegendItem {
    /**
     * The funnel item that the legend item represents.
     */
    item?: dxFunnelItem;
}

/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export interface dxFunnelOptions extends BaseWidgetOptions<dxFunnel> {
    /**
     * Specifies adaptive layout properties.
     */
    adaptiveLayout?: { height?: number, keepLabels?: boolean, width?: number };
    /**
     * Specifies the algorithm for building the funnel.
     */
    algorithm?: 'dynamicHeight' | 'dynamicSlope';
    /**
     * Specifies which data source field provides arguments for funnel items. The argument identifies a funnel item and represents it on the legend.
     */
    argumentField?: string;
    /**
     * Specifies which data source field provides colors for funnel items. If this field is absent, the palette provides the colors.
     */
    colorField?: string;
    /**
     * Binds the UI component to data.
     */
    dataSource?: Array<any> | DataSource | DataSourceOptions | string;
    /**
     * Specifies whether funnel items change their style when a user pauses on them.
     */
    hoverEnabled?: boolean;
    /**
     * Turns the funnel upside down.
     */
    inverted?: boolean;
    /**
     * Configures funnel items' appearance.
     */
    item?: { border?: { color?: string, visible?: boolean, width?: number }, hoverStyle?: { border?: { color?: string, visible?: boolean, width?: number }, hatching?: { direction?: HatchingDirectionType, opacity?: number, step?: number, width?: number } }, selectionStyle?: { border?: { color?: string, visible?: boolean, width?: number }, hatching?: { direction?: HatchingDirectionType, opacity?: number, step?: number, width?: number } } };
    /**
     * Configures funnel item labels.
     */
    label?: { backgroundColor?: string, border?: { color?: string, dashStyle?: DashStyleType, visible?: boolean, width?: number }, connector?: { color?: string, opacity?: number, visible?: boolean, width?: number }, customizeText?: ((itemInfo: { item?: dxFunnelItem, value?: number, valueText?: string, percent?: number, percentText?: string }) => string), font?: Font, format?: format, horizontalAlignment?: 'left' | 'right', horizontalOffset?: number, position?: 'columns' | 'inside' | 'outside', showForZeroValues?: boolean, textOverflow?: VizTextOverflowType, visible?: boolean, wordWrap?: WordWrapType };
    /**
     * Configures the legend.
     */
    legend?: dxFunnelLegend;
    /**
     * Specifies the ratio between the height of the neck and that of the whole funnel. Accepts values from 0 to 1. Applies only if the algorithm is 'dynamicHeight'.
     */
    neckHeight?: number;
    /**
     * Specifies the ratio between the width of the neck and that of the whole funnel. Accepts values from 0 to 1. Applies only if the algorithm is 'dynamicHeight'.
     */
    neckWidth?: number;
    /**
     * A function that is executed after the pointer enters or leaves a funnel item.
     */
    onHoverChanged?: ((e: { component?: dxFunnel, element?: dxElement, model?: any, item?: dxFunnelItem }) => any);
    /**
     * A function that is executed when a funnel item is clicked or tapped.
     */
    onItemClick?: ((e: { component?: dxFunnel, element?: dxElement, model?: any, event?: event, item?: dxFunnelItem }) => any) | string;
    /**
     * A function that is executed when a legend item is clicked or tapped.
     */
    onLegendClick?: ((e: { component?: dxFunnel, element?: dxElement, model?: any, event?: event, item?: dxFunnelItem }) => any) | string;
    /**
     * A function that is executed when a funnel item is selected or selection is canceled.
     */
    onSelectionChanged?: ((e: { component?: dxFunnel, element?: dxElement, model?: any, item?: dxFunnelItem }) => any);
    /**
     * Sets the palette to be used to colorize funnel items.
     */
    palette?: Array<string> | PaletteType;
    /**
     * Specifies what to do with colors in the palette when their number is less than the number of funnel items.
     */
    paletteExtensionMode?: PaletteExtensionModeType;
    /**
     * Specifies how item labels should behave when they overlap.
     */
    resolveLabelOverlapping?: 'hide' | 'none' | 'shift';
    /**
     * Specifies whether a single or multiple funnel items can be in the selected state at a time. Assigning 'none' disables the selection feature.
     */
    selectionMode?: 'multiple' | 'none' | 'single';
    /**
     * Specifies whether to sort funnel items.
     */
    sortData?: boolean;
    /**
     * Configures tooltips - small pop-up rectangles that display information about a data-visualizing UI component element being pressed or hovered over with the mouse pointer.
     */
    tooltip?: dxFunnelTooltip;
    /**
     * Specifies which data source field provides values for funnel items. The value defines a funnel item's area.
     */
    valueField?: string;
}
/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export interface dxFunnelLegend extends BaseLegend {
    /**
     * Specifies the hint that appears when a user hovers the mouse pointer over a legend item.
     */
    customizeHint?: ((itemInfo: { item?: dxFunnelItem, text?: string }) => string);
    /**
     * Allows you to change the order, text, and visibility of legend items.
     */
    customizeItems?: ((items: Array<FunnelLegendItem>) => Array<FunnelLegendItem>);
    /**
     * Customizes the text displayed by legend items.
     */
    customizeText?: ((itemInfo: { item?: dxFunnelItem, text?: string }) => string);
    /**
     * Specifies an SVG element that serves as a custom legend item marker.
     */
    markerTemplate?: template | ((legendItem: FunnelLegendItem, element: SVGGElement) => string | SVGElement | JQuery);
    /**
     * Specifies the legend's visibility.
     */
    visible?: boolean;
}
/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export interface dxFunnelTooltip extends BaseWidgetTooltip {
    /**
     * Specifies a custom template for a tooltip.
     */
    contentTemplate?: template | ((info: { item?: dxFunnelItem, value?: number, valueText?: string, percent?: number, percentText?: string }, element: dxElement) => string | Element | JQuery);
    /**
     * Customizes a specific tooltip's appearance.
     */
    customizeTooltip?: ((info: { item?: dxFunnelItem, value?: number, valueText?: string, percent?: number, percentText?: string }) => any);
}
/**
 * The Funnel is a UI component that visualizes a value at different stages. It helps assess value changes throughout these stages and identify potential issues. The Funnel UI component conveys information using different interactive elements (tooltips, labels, legend) and enables you to create not only a funnel, but also a pyramid chart.
 */
export default class dxFunnel extends BaseWidget {
    constructor(element: Element, options?: dxFunnelOptions)
    constructor(element: JQuery, options?: dxFunnelOptions)
    /**
     * Cancels the selection of all funnel items.
     */
    clearSelection(): void;
    /**
     * Provides access to all funnel items.
     */
    getAllItems(): Array<dxFunnelItem>;
    getDataSource(): DataSource;
    /**
     * Hides all UI component tooltips.
     */
    hideTooltip(): void;
}

/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export interface dxFunnelItem {
    /**
     * The item's argument.
     */
    argument?: string | Date | number;
    /**
     * The item's original data object.
     */
    data?: any;
    /**
     * Gets the funnel item's color specified in the data source or palette.
     */
    getColor(): string;
    /**
     * Changes the funnel item's hover state.
     */
    hover(state: boolean): void;
    /**
     * Indicates whether the funnel item is in the hover state.
     */
    isHovered(): boolean;
    /**
     * Indicates whether the funnel item is selected.
     */
    isSelected(): boolean;
    /**
     * The item's calculated percentage value.
     */
    percent?: number;
    /**
     * Selects or cancels the funnel item's selection.
     */
    select(state: boolean): void;
    /**
     * Shows the funnel item's tooltip.
     */
    showTooltip(): void;
    /**
     * The item's value.
     */
    value?: number;
}

declare global {
interface JQuery {
    dxFunnel(): JQuery;
    dxFunnel(options: "instance"): dxFunnel;
    dxFunnel(options: string): any;
    dxFunnel(options: string, ...params: any[]): any;
    dxFunnel(options: dxFunnelOptions): JQuery;
}
}
/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export type Options = dxFunnelOptions;

/** @deprecated use Options instead */
/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export type IOptions = dxFunnelOptions;
