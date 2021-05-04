/**
* DevExtreme (viz/bar_gauge.d.ts)
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
    PaletteType,
    PaletteExtensionModeType
} from './palette';

import {
    template
} from '../core/templates/template';

import {
    format
} from '../ui/widget/ui.widget';

import {
    BaseLegend,
    BaseLegendItem
} from './common';

import BaseWidget, {
    BaseWidgetLoadingIndicator,
    BaseWidgetOptions,
    BaseWidgetTooltip,
    Font
} from './core/base_widget';

/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export interface BarGaugeBarInfo {
    /**
     * The bar's hexadecimal color code.
     */
    color?: string;
    /**
     * The bar's zero-based index. Bars closest to the gauge's center have higher indexes.
     */
    index?: number;
    /**
     * The bar's value.
     */
    value?: number;
}

/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export interface BarGaugeLegendItem extends BaseLegendItem {
    /**
     * The bar that the legend item represents.
     */
    item?: BarGaugeBarInfo;
}

/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export interface dxBarGaugeOptions extends BaseWidgetOptions<dxBarGauge> {
    /**
     * Specifies animation properties.
     */
    animation?: any;
    /**
     * Specifies a color for the remaining segment of the bar's track.
     */
    backgroundColor?: string;
    /**
     * Specifies a distance between bars in pixels.
     */
    barSpacing?: number;
    /**
     * Specifies a base value for bars.
     */
    baseValue?: number;
    /**
     * Specifies an end value for the gauge's invisible scale.
     */
    endValue?: number;
    /**
     * Defines the shape of the gauge's arc.
     */
    geometry?: { endAngle?: number, startAngle?: number };
    /**
     * Specifies the properties of the labels that accompany gauge bars.
     */
    label?: { connectorColor?: string, connectorWidth?: number, customizeText?: ((barValue: { value?: number, valueText?: string }) => string), font?: Font, format?: format, indent?: number, visible?: boolean };
    /**
     * Configures the legend.
     */
    legend?: dxBarGaugeLegend;
    /**
     * Configures the loading indicator.
     */
    loadingIndicator?: dxBarGaugeLoadingIndicator;
    /**
     * A function that is executed when a tooltip becomes hidden.
     */
    onTooltipHidden?: ((e: { component?: dxBarGauge, element?: dxElement, model?: any, target?: any }) => any);
    /**
     * A function that is executed when a tooltip appears.
     */
    onTooltipShown?: ((e: { component?: dxBarGauge, element?: dxElement, model?: any, target?: any }) => any);
    /**
     * Sets the palette to be used for colorizing bars in the gauge.
     */
    palette?: Array<string> | PaletteType;
    /**
     * Specifies what to do with colors in the palette when their number is less than the number of bars in the gauge.
     */
    paletteExtensionMode?: PaletteExtensionModeType;
    /**
     * Defines the radius of the bar that is closest to the center relatively to the radius of the topmost bar.
     */
    relativeInnerRadius?: number;
    /**
     * Specifies how the UI component should behave when bar labels overlap: hide certain labels or leave them overlapped.
     */
    resolveLabelOverlapping?: 'hide' | 'none';
    /**
     * Specifies a start value for the gauge's invisible scale.
     */
    startValue?: number;
    /**
     * Configures tooltips.
     */
    tooltip?: dxBarGaugeTooltip;
    /**
     * Specifies the array of values to be indicated on a bar gauge.
     */
    values?: Array<number>;
}
/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export interface dxBarGaugeLegend extends BaseLegend {
    /**
     * Specifies the hint that appears when a user hovers the mouse pointer over a legend item.
     */
    customizeHint?: ((arg: { item?: BarGaugeBarInfo, text?: string }) => string);
    /**
     * Allows you to change the order, text, and visibility of legend items.
     */
    customizeItems?: ((items: Array<BarGaugeLegendItem>) => Array<BarGaugeLegendItem>);
    /**
     * Customizes the text displayed by legend items.
     */
    customizeText?: ((arg: { item?: BarGaugeBarInfo, text?: string }) => string);
    /**
     * Formats the item text before it is displayed. Accepts only numeric formats. When unspecified, it inherits the label's format.
     */
    itemTextFormat?: format;
    /**
     * Specifies an SVG element that serves as a custom legend item marker.
     */
    markerTemplate?: template | ((legendItem: BarGaugeLegendItem, element: SVGGElement) => string | SVGElement | JQuery);
    /**
     * Specifies the legend's visibility.
     */
    visible?: boolean;
}
/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export interface dxBarGaugeLoadingIndicator extends BaseWidgetLoadingIndicator {
}
/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export interface dxBarGaugeTooltip extends BaseWidgetTooltip {
    /**
     * Specifies a custom template for a tooltip.
     */
    contentTemplate?: template | ((scaleValue: { value?: number, valueText?: string, index?: number }, element: dxElement) => string | Element | JQuery);
    /**
     * Allows you to change tooltip appearance.
     */
    customizeTooltip?: ((scaleValue: { value?: number, valueText?: string, index?: number }) => any);
    /**
     * 
     */
    interactive?: boolean;
}
/**
 * The BarGauge UI component contains several circular bars that each indicates a single value.
 */
export default class dxBarGauge extends BaseWidget {
    constructor(element: Element, options?: dxBarGaugeOptions)
    constructor(element: JQuery, options?: dxBarGaugeOptions)
    /**
     * 
     */
    values(): Array<number>;
    /**
     * 
     */
    values(values: Array<number>): void;
}

declare global {
interface JQuery {
    dxBarGauge(): JQuery;
    dxBarGauge(options: "instance"): dxBarGauge;
    dxBarGauge(options: string): any;
    dxBarGauge(options: string, ...params: any[]): any;
    dxBarGauge(options: dxBarGaugeOptions): JQuery;
}
}
/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export type Options = dxBarGaugeOptions;

/** @deprecated use Options instead */
/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export type IOptions = dxBarGaugeOptions;