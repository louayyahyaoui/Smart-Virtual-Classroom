/**
* DevExtreme (viz/pie_chart.d.ts)
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

import {
    format
} from '../ui/widget/ui.widget';

import {
    basePointObject
} from './chart';

import {
    PaletteType
} from './palette';

import {
    BaseChart,
    BaseChartAdaptiveLayout,
    BaseChartLegend,
    BaseChartOptions
} from './chart_components/base_chart';

import {
    BaseLegendItem,
    DashStyleType,
    HatchingDirectionType
} from './common';

import {
    Font,
    WordWrapType,
    VizTextOverflowType,
    BaseWidgetAnnotationConfig
} from './core/base_widget';

/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export type PieSeriesType = 'donut' | 'doughnut' | 'pie';
/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export type SegmentsDirectionType = 'anticlockwise' | 'clockwise';

/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export interface PieChartLegendItem extends BaseLegendItem {
    /**
     * The argument of the point(s) that the legend item represents.
     */
    argument?: string | Date | number;
    /**
     * The zero-based index of the legend item used to identify the item among other legend items with the same argument.
     */
    argumentIndex?: number;
    /**
     * An array of points that the legend item represents. Can contain more than one point only in a multi-series PieChart.
     */
    points?: Array<piePointObject>;
    /**
     * The text that the legend item displays.
     */
    text?: any;
}

/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export interface PieChartSeries extends dxPieChartSeriesTypesCommonPieChartSeries {
    /**
     * Specifies the name that identifies the series.
     */
    name?: string;
    /**
     * Specifies data about a series.
     */
    tag?: any;
}
/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export interface dxPieChartOptions extends BaseChartOptions<dxPieChart> {
    /**
     * Specifies adaptive layout properties.
     */
    adaptiveLayout?: dxPieChartAdaptiveLayout;
    /**
     * Specifies a custom template for content in the pie's center.
     */
    centerTemplate?: template | ((component: dxPieChart, element: SVGGElement) => string | SVGElement | JQuery);
    /**
     * An object defining the configuration properties that are common for all series of the PieChart UI component.
     */
    commonSeriesSettings?: any;
    /**
     * Specifies the diameter of the pie.
     */
    diameter?: number;
    /**
     * Specifies the fraction of the inner radius relative to the total radius in the series of the 'doughnut' type. The value should be between 0 and 1.
     */
    innerRadius?: number;
    /**
     * Specifies PieChart legend properties.
     */
    legend?: dxPieChartLegend;
    /**
     * Specifies the minimum diameter of the pie.
     */
    minDiameter?: number;
    /**
     * A function that is executed when a legend item is clicked or tapped.
     */
    onLegendClick?: ((e: { component?: dxPieChart, element?: dxElement, model?: any, event?: event, target?: string | number, points?: Array<piePointObject> }) => any) | string;
    /**
     * Sets the palette to be used to colorize series and their elements.
     */
    palette?: Array<string> | PaletteType;
    /**
     * Specifies how a chart must behave when point labels overlap.
     */
    resolveLabelOverlapping?: 'hide' | 'none' | 'shift';
    /**
     * Specifies the direction that the pie chart segments will occupy.
     */
    segmentsDirection?: SegmentsDirectionType;
    /**
     * Specifies properties for the series of the PieChart UI component.
     */
    series?: PieChartSeries | Array<PieChartSeries>;
    /**
     * Defines properties for the series template.
     */
    seriesTemplate?: { customizeSeries?: ((seriesName: any) => PieChartSeries), nameField?: string };
    /**
     * Allows you to display several adjoining pies in the same size.
     */
    sizeGroup?: string;
    /**
     * Specifies the angle in arc degrees from which the first segment of a pie chart should start.
     */
    startAngle?: number;
    /**
     * Specifies the type of the pie chart series.
     */
    type?: PieSeriesType;
    /**
     * Specifies the annotation collection.
     */
    annotations?: Array<dxPieChartAnnotationConfig | any>;
    /**
     * Specifies settings common for all annotations in the PieChart.
     */
    commonAnnotationSettings?: dxPieChartCommonAnnotationConfig;
    /**
     * 
     */
    customizeAnnotation?: ((annotation: dxPieChartAnnotationConfig | any) => dxPieChartAnnotationConfig);
}
/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export interface dxPieChartAnnotationConfig extends dxPieChartCommonAnnotationConfig {
    /**
     * Specifies the annotation's name.
     */
    name?: string;
}

/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export interface dxPieChartCommonAnnotationConfig extends BaseWidgetAnnotationConfig {
    /**
     * Specifies an annotation's position on the surface of a specific argument.
     */
    location?: 'center' | 'edge';
    /**
     * Positions the annotation relative to a specific argument.
     */
    argument?: number | Date | string;
    /**
     * Anchors the annotation to a series point. Accepts the name of the point's series.
     */
    series?: string;
    /**
     * 
     */
    customizeTooltip?: ((annotation: dxPieChartAnnotationConfig | any) => any);
    /**
     * 
     */
    template?: template | ((annotation: dxPieChartAnnotationConfig | any, element: SVGGElement) => string | SVGElement | JQuery);
    /**
     * 
     */
    tooltipTemplate?: template | ((annotation: dxPieChartAnnotationConfig | any, element: dxElement) => string | Element | JQuery);
}
/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export interface dxPieChartAdaptiveLayout extends BaseChartAdaptiveLayout {
    /**
     * Specifies whether point labels should be kept when the UI component adapts the layout.
     */
    keepLabels?: boolean;
}
/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export interface dxPieChartLegend extends BaseChartLegend {
    /**
     * Specifies the text for a hint that appears when a user hovers the mouse pointer over a legend item.
     */
    customizeHint?: ((pointInfo: { pointName?: any, pointIndex?: number, pointColor?: string }) => string);
    /**
     * Allows you to change the order, text, and visibility of legend items.
     */
    customizeItems?: ((items: Array<PieChartLegendItem>) => Array<PieChartLegendItem>);
    /**
     * Specifies a callback function that returns the text to be displayed by a legend item.
     */
    customizeText?: ((pointInfo: { pointName?: any, pointIndex?: number, pointColor?: string }) => string);
    /**
     * Specifies what chart elements to highlight when a corresponding item in the legend is hovered over.
     */
    hoverMode?: 'none' | 'allArgumentPoints';
    /**
     * Specifies an SVG element that serves as a custom legend item marker.
     */
    markerTemplate?: template | ((legendItem: PieChartLegendItem, element: SVGGElement) => string | SVGElement | JQuery);
}
/**
 * The PieChart is a UI component that visualizes data as a circle divided into sectors that each represents a portion of the whole.
 */
export default class dxPieChart extends BaseChart {
    constructor(element: Element, options?: dxPieChartOptions)
    constructor(element: JQuery, options?: dxPieChartOptions)
    /**
     * Gets the radius of the doughnut hole in pixels. Applies only when the type is 'doughnut' or 'donut'.
     */
    getInnerRadius(): number;
}

/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export interface dxPieChartSeriesTypes {
    /**
     * An object that defines configuration properties for chart series.
     * Warning! This type is used for internal purposes. Do not import it directly.
     */
    CommonPieChartSeries?: dxPieChartSeriesTypesCommonPieChartSeries;
    /**
     * An object defining a series of the doughnut type.
     */
    DoughnutSeries?: any;
    /**
     * An object defining a series of the pie type.
     */
    PieSeries?: any;
}
/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export interface dxPieChartSeriesTypesCommonPieChartSeries {
    /**
     * Specifies the data source field that provides arguments for series points.
     */
    argumentField?: string;
    /**
     * Specifies the required type for series arguments.
     */
    argumentType?: 'datetime' | 'numeric' | 'string';
    /**
     * An object defining the series border configuration properties.
     */
    border?: { color?: string, dashStyle?: DashStyleType, visible?: boolean, width?: number };
    /**
     * Specifies a series color.
     */
    color?: string;
    /**
     * Specifies the chart elements to highlight when a series is hovered over.
     */
    hoverMode?: 'none' | 'onlyPoint';
    /**
     * An object defining configuration properties for a hovered series.
     */
    hoverStyle?: { border?: { color?: string, dashStyle?: DashStyleType, visible?: boolean, width?: number }, color?: string, hatching?: { direction?: HatchingDirectionType, opacity?: number, step?: number, width?: number } };
    /**
     * An object defining the label configuration properties.
     */
    label?: { argumentFormat?: format, backgroundColor?: string, border?: { color?: string, dashStyle?: DashStyleType, visible?: boolean, width?: number }, connector?: { color?: string, visible?: boolean, width?: number }, customizeText?: ((pointInfo: any) => string), font?: Font, format?: format, position?: 'columns' | 'inside' | 'outside', radialOffset?: number, rotationAngle?: number, textOverflow?: VizTextOverflowType, visible?: boolean, wordWrap?: WordWrapType };
    /**
     * Specifies how many points are acceptable to be in a series to display all labels for these points. Otherwise, the labels will not be displayed.
     */
    maxLabelCount?: number;
    /**
     * Specifies a minimal size of a displayed pie segment.
     */
    minSegmentSize?: number;
    /**
     * Specifies the chart elements to highlight when the series is selected.
     */
    selectionMode?: 'none' | 'onlyPoint';
    /**
     * An object defining configuration properties for the series when it is selected.
     */
    selectionStyle?: { border?: { color?: string, dashStyle?: DashStyleType, visible?: boolean, width?: number }, color?: string, hatching?: { direction?: HatchingDirectionType, opacity?: number, step?: number, width?: number } };
    /**
     * Specifies chart segment grouping properties.
     */
    smallValuesGrouping?: { groupName?: string, mode?: 'none' | 'smallValueThreshold' | 'topN', threshold?: number, topCount?: number };
    /**
     * Specifies the name of the data source field that provides data about a point.
     */
    tagField?: string;
    /**
     * Specifies the data source field that provides values for series points.
     */
    valueField?: string;
}

/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export interface piePointObject extends basePointObject {
    /**
     * Hides a specific point.
     */
    hide(): void;
    /**
     * Provides information about the visibility state of a point.
     */
    isVisible(): boolean;
    /**
     * Gets the percentage value of the specific point.
     */
    percent?: string | number | Date;
    /**
     * Makes a specific point visible.
     */
    show(): void;
}

declare global {
interface JQuery {
    dxPieChart(): JQuery;
    dxPieChart(options: "instance"): dxPieChart;
    dxPieChart(options: string): any;
    dxPieChart(options: string, ...params: any[]): any;
    dxPieChart(options: dxPieChartOptions): JQuery;
}
}
/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export type Options = dxPieChartOptions;

/** @deprecated use Options instead */
/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export type IOptions = dxPieChartOptions;
