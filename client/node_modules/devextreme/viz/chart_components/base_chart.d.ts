/**
* DevExtreme (viz/chart_components/base_chart.d.ts)
* Version: 20.2.6
* Build date: Tue Mar 16 2021
*
* Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import '../../jquery_augmentation';

import {
    dxElement
} from '../../core/element';

import {
    PaletteType,
    PaletteExtensionModeType
} from '../palette';

import {
    template
} from '../../core/templates/template';

import DataSource, {
    DataSourceOptions
} from '../../data/data_source';

import {
    event
} from '../../events/index';

import {
    format
} from '../../ui/widget/ui.widget';

import {
    basePointObject,
    baseSeriesObject,
    chartSeriesObject,
    dxChartAnnotationConfig,
    dxChartSeriesTypesCommonSeriesLabel,
    dxChartSeriesTypesCommonSeriesPoint
} from '../chart';

import {
    BaseLegend,
    BaseLegendItem,
} from '../common';

import BaseWidget, {
    BaseWidgetOptions,
    BaseWidgetTooltip,
    BaseWidgetAnnotationConfig
} from '../core/base_widget';

/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export interface BaseChartOptions<T = BaseChart> extends BaseWidgetOptions<T> {
    /**
     * Specifies adaptive layout properties.
     */
    adaptiveLayout?: BaseChartAdaptiveLayout;
    /**
     * Specifies animation properties.
     */
    animation?: { duration?: number, easing?: 'easeOutCubic' | 'linear', enabled?: boolean, maxPointCountSupported?: number } | boolean;
    /**
     * Customizes the appearance of an individual point label.
     */
    customizeLabel?: ((pointInfo: any) => dxChartSeriesTypesCommonSeriesLabel);
    /**
     * Customizes the appearance of an individual series point.
     */
    customizePoint?: ((pointInfo: any) => dxChartSeriesTypesCommonSeriesPoint);
    /**
     * Binds the UI component to data.
     */
    dataSource?: Array<any> | DataSource | DataSourceOptions | string;
    /**
     * Specifies properties of the legend.
     */
    legend?: BaseChartLegend;
    /**
     * A function that is executed when all series are ready.
     */
    onDone?: ((e: { component?: T, element?: dxElement, model?: any }) => any);
    /**
     * A function that is executed when a series point is clicked or tapped.
     */
    onPointClick?: ((e: { component?: T, element?: dxElement, model?: any, event?: event, target?: basePointObject }) => any) | string;
    /**
     * A function that is executed after the pointer enters or leaves a series point.
     */
    onPointHoverChanged?: ((e: { component?: any, element?: any, target?: basePointObject }) => any);
    /**
     * A function that is executed when a series point is selected or selection is canceled.
     */
    onPointSelectionChanged?: ((e: { component?: any, element?: any, target?: basePointObject }) => any);
    /**
     * A function that is executed when a tooltip becomes hidden.
     */
    onTooltipHidden?: ((e: { component?: T, element?: dxElement, model?: any, target?: basePointObject | dxChartAnnotationConfig | any }) => any);
    /**
     * A function that is executed when a tooltip appears.
     */
    onTooltipShown?: ((e: { component?: T, element?: dxElement, model?: any, target?: basePointObject | dxChartAnnotationConfig | any }) => any);
    /**
     * Sets the palette to be used for colorizing series and their elements.
     */
    palette?: Array<string> | PaletteType;
    /**
     * Specifies what to do with colors in the palette when their number is less than the number of series (in the Chart UI component) or points in a series (in the PieChart UI component).
     */
    paletteExtensionMode?: PaletteExtensionModeType;
    /**
     * Specifies whether a single point or multiple points can be selected in the chart.
     */
    pointSelectionMode?: 'multiple' | 'single';
    /**
     * Specifies properties for series.
     */
    series?: any | Array<any>;
    /**
     * Configures tooltips.
     */
    tooltip?: BaseChartTooltip;
}
/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export interface BaseChartAdaptiveLayout {
    /**
     * Specifies the minimum container height at which the layout begins to adapt.
     */
    height?: number;
    /**
     * Specifies whether point labels should be kept when the UI component adapts the layout.
     */
    keepLabels?: boolean;
    /**
     * Specifies the minimum container width at which the layout begins to adapt.
     */
    width?: number;
}
/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export interface BaseChartLegend extends BaseLegend {
    /**
     * Allows you to change the order, text, and visibility of legend items.
     */
    customizeItems?: ((items: Array<BaseChartLegendItem>) => Array<BaseChartLegendItem>);
    /**
     * Specifies an SVG element that serves as a custom legend item marker.
     */
    markerTemplate?: template | ((legendItem: BaseChartLegendItem, element: SVGGElement) => string | SVGElement | JQuery);
}
/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export interface BaseChartTooltip extends BaseWidgetTooltip {
    /**
     * Formats the point argument before it is displayed in the tooltip. To format the point value, use the format property.
     */
    argumentFormat?: format;
    /**
     * Specifies a custom template for a tooltip.
     */
    contentTemplate?: template | ((pointInfo: any, element: dxElement) => string | Element | JQuery);
    /**
     * Allows you to change tooltip appearance.
     */
    customizeTooltip?: ((pointInfo: any) => any);
    /**
     * Specifies whether the tooltip is shared across all series points with the same argument.
     */
    shared?: boolean;
    /**
     * Allows users to interact with the tooltip content.
     */
    interactive?: boolean;
}
/**
 * A base class for all chart UI components included in the ChartJS library.
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export class BaseChart extends BaseWidget {
    constructor(element: Element, options?: BaseChartOptions)
    constructor(element: JQuery, options?: BaseChartOptions)
    /**
     * Deselects the chart's selected series. The series is displayed in an initial style.
     */
    clearSelection(): void;
    /**
     * Gets all the series.
     */
    getAllSeries(): Array<baseSeriesObject>;
    getDataSource(): DataSource;
    /**
     * Gets a series with a specific name.
     */
    getSeriesByName(seriesName: any): chartSeriesObject;
    /**
     * Gets a series with a specific index.
     */
    getSeriesByPos(seriesIndex: number): chartSeriesObject;
    /**
     * Hides all UI component tooltips.
     */
    hideTooltip(): void;
    /**
     * Reloads data and repaints the UI component.
     */
    refresh(): void;
    render(): void;
    /**
     * Redraws the UI component.
     */
    render(renderOptions: any): void;
}

/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export interface BaseChartLegendItem extends BaseLegendItem {
    /**
     * The series that the item represents on the legend.
     */
    series?: baseSeriesObject;
}

/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export interface BaseChartAnnotationConfig extends BaseWidgetAnnotationConfig {
    /**
     * Positions the annotation relative to a specific argument.
     */
    argument?: number | Date | string;
    /**
     * Anchors the annotation to a series point. Accepts the name of the point's series.
     */
    series?: string;
    /**
     * Positions the annotation relative to a value on the specified value axis.
     */
    value?: number | Date | string;
}
